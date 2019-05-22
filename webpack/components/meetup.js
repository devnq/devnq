import xhr from 'xhr';
import * as meetup from './meetup';

export function getNextMeetup(callback) {
  xhr({
      method: "get",
      uri: "https://d2qrtp8csnyzho.cloudfront.net/dev_nq/events?scroll=next_upcoming&photo-host=public&page=1&sig_id=204758206&sig=f08d518a43af7703b557e4d77dc2a85cd18a28b0",
  }, function (err, resp, body) {
    if(resp.statusCode == 200) {
      return callback(null, JSON.parse(body));
    }

    callback(err || body);
  });
}

export function renderNextMeetup(meetupData) {
  const nextMeetup = meetupData[0];
  const nextMeetupDate = new Date(nextMeetup.time);
  const dateOutputOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  const dateOutput = nextMeetupDate.toLocaleString("en-US", dateOutputOptions);
  const location = ["name", "address_1", "city"].map(function(p) {
    return nextMeetup.venue[p]
  }).filter(function(addressPart) {
    return addressPart;
  }).join(", ");

  document.getElementById("meetup-event-title").innerHTML = nextMeetup.name;
  document.getElementById("meetup-event-datetime").innerHTML = dateOutput;
  document.getElementById("meetup-event-location").innerHTML = location;
  document.getElementById("meetup-event-link").setAttribute('href', nextMeetup.link);

  meetup.hideDefaultMeetup();
  document.getElementById("next-meetup-event").style.display = "block";
}

export function renderNoneMeetup() {
  meetup.hideDefaultMeetup();
  document.getElementById("next-meetup-none").style.display = "block";
}

export function hideDefaultMeetup() {
  document.getElementById("next-meetup-default").style.display = "none";
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
