import xhr from 'xhr';
import * as meetup from './meetup';

export function getNextMeetup(callback) {
  xhr({
      method: "get",
      uri: "https://d2qrtp8csnyzho.cloudfront.net/dev_nq/events?scroll=next_upcoming&photo-host=public&page=1",
  }, function (err, resp, body) {
    if(resp.statusCode == 200) {
      return callback(null, JSON.parse(body));
    }

    callback(err || body);
  });
}

export function getNextMeetupData(meetupData) {
  const nextMeetup = meetupData[0];

  const nextMeetupDate = new Date(nextMeetup.time);
  const dateOutputOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};

  return {
    name: nextMeetup.name,
    date: nextMeetupDate.toLocaleString("en-US", dateOutputOptions),
    location: ["name", "address_1", "city"].map(function(p) {
      return nextMeetup.venue[p]
    }).filter(function(addressPart) {
      return addressPart;
    }).join(", "),
    description: $(nextMeetup.description).filter("p:first").first().text(),
    link: nextMeetup.link,
  }
}

export function renderNextMeetup(meetupData) {
  const nextEvent = getNextMeetupData(meetupData);

  document.getElementById("event-title").innerHTML = nextEvent.name;
  document.getElementById("event-datetime").innerHTML = nextEvent.date;
  document.getElementById("event-location").innerHTML = nextEvent.location;
  document.getElementById("event-desc").innerHTML = nextEvent.description;
  document.getElementById("event-link").setAttribute('href', nextEvent.link);

  meetup.hideDefaultMeetup();
  document.getElementById("next-event").style.display = "block";
}

export function renderNoneMeetup() {
  meetup.hideDefaultMeetup();
  document.getElementById("next-event-none").style.display = "block";
}

export function hideDefaultMeetup() {
  document.getElementById("next-event-default").style.display = "none";
}

export function startMeetupWidget(callback) {
  meetup.getNextMeetup(function(err, result) {
    if(!err && Array.isArray(result) && result.length > 0) {
      meetup.renderNextMeetup(result);
      return callback();
    }

    meetup.renderNoneMeetup();
    return callback();
  });
};

window.addEventListener('load', function () {
  meetup.startMeetupWidget(function() {});
});
