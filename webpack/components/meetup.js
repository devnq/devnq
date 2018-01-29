import xhr from 'xhr';

function getNextMeetup(callback) {
  xhr({
      method: "get",
      uri: "https://d2qrtp8csnyzho.cloudfront.net/dev_nq/events?scroll=next_upcoming&photo-host=public&page=1&sig_id=204758206&sig=f08d518a43af7703b557e4d77dc2a85cd18a28b0",
  }, function (err, resp, body) {
    console.log(resp)
    if(resp.statusCode == 200) {
      return callback(null, JSON.parse(body));
    }

    callback(err || body);
  });
}

function renderNextMeetup(meetupData) {
  const nextMeetup = meetupData[0];
  const nextMeetupDate = new Date(nextMeetup.local_date+"T"+nextMeetup.local_time);
  document.getElementById("meetup-event-title").innerHTML = nextMeetup.name;
  document.getElementById("meetup-event-datetime").innerHTML = nextMeetupDate;
  document.getElementById("meetup-event-location").innerHTML = nextMeetup.venue.name+", "+nextMeetup.venue.address_1+", "+nextMeetup.venue.city;
  document.getElementById("meetup-event-title").attributes.href = nextMeetup.link;

  hideDefaultMeetup();
  document.getElementById("next-meetup-event").style.display = "block";
}

function renderNoneMeetup() {
  hideDefaultMeetup();
  document.getElementById("next-meetup-none").style.display = "block";
}

function hideDefaultMeetup() {
  document.getElementById("next-meetup-default").style.display = "none";
}

function startMeetupWidget() {
  getNextMeetup(function(err, result) {
    if(!err) {
      return renderNextMeetup(result);
    }

    renderNoneMeetup();
  });
};

startMeetupWidget();
