import * as meetup from './meetup';

const MEETUP_GROUP_URL_NAME = 'dev_nq'
const MEETUP_FEED_URL = `https://d2qrtp8csnyzho.cloudfront.net/${MEETUP_GROUP_URL_NAME}/events/rss`

const MEETUP_DATE_REGEX = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (January|February|March|April|May|June|July|August|September|October|November|December) ([0-9]{1,2}) at ([1]?[0-9])(:[0-5][0-9]) (AM|PM)$/

export async function getMeetups(limit) {
  const feedResponse = await fetch(MEETUP_FEED_URL);
  const feedBody = await feedResponse.text();

  const feed = new window.DOMParser().parseFromString(feedBody, 'text/xml');

  return parseMeetups(feed).slice(0, limit);
}

export function parseMeetups(meetupFeed) {
  return Array.from(meetupFeed.getElementsByTagName("item")).map(parseMeetup);
}

export function parseMeetup(meetupItem) {
  const descParsed = parseDescription(meetupItem.getElementsByTagName("description").item(0).innerHTML);

  return {
    name: readCdata(meetupItem.getElementsByTagName("title").item(0).innerHTML),
    link: readCdata(meetupItem.getElementsByTagName("guid").item(0).innerHTML),
    description: readDesc(descParsed),
    date: readDate(descParsed),
  }
}

export function parseDescription(description_string) {
  const rawCdata = readCdata(description_string);
  return new window.DOMParser().parseFromString(rawCdata, 'text/html');
}

export function readDate(descParsed) {
  const pArr = Array.from(descParsed.getElementsByTagName('p'));
  const dateElement = pArr.find((e) => e.textContent.match(MEETUP_DATE_REGEX));
  return dateElement.textContent;
}

export function readDesc(descParsed) {
  const pArr = Array.from(descParsed.getElementsByTagName('p'));
  const pArrTrimmed = pArr.slice(1, -4) //Remove the clutter Meetup adds to find the real description
  const descElement = pArrTrimmed.find((e) => e.innerHTML.length != 0); //Look for the first paragraph with content
  return descElement.textContent;
}

export function readCdata(cdata_string) {
  return new window.DOMParser().parseFromString(`<div xmlns="http://www.w3.org/1999/xhtml">${cdata_string}</div>`, 'text/xml').firstChild.firstChild.data
}

export function renderMeetups(widgetRoot, meetups) {
  const eventTemplateNode = widgetRoot.getElementsByClassName("meetup-event")[0];
  const eventListNode = widgetRoot.getElementsByClassName("meetup-events")[0];
  meetups.forEach((meetupEvent) => {
    const eventNode = eventTemplateNode.cloneNode(true)

    const titleNode = eventNode.getElementsByClassName("meetup-event-title")[0]
    const datetimeNode = eventNode.getElementsByClassName("meetup-event-datetime")[0]
    const descNode = eventNode.getElementsByClassName("meetup-event-desc")[0]
    const linkNode = eventNode.getElementsByClassName("meetup-event-link")[0]

    if (titleNode) {
      titleNode.innerHTML = meetupEvent.name;
    }
    if(datetimeNode) {
      datetimeNode.innerHTML = meetupEvent.date;
    }
    if (descNode) {
      descNode.innerHTML = meetupEvent.description;
    }
    if (linkNode) {
      linkNode.setAttribute('href', meetupEvent.link);
    }

    eventListNode.appendChild(eventNode)
  })

  eventTemplateNode.remove();
  meetup.hideDefaultMeetup(widgetRoot);
  widgetRoot.getElementsByClassName("meetup-events")[0].style.display = "block";
}

export function renderNoneMeetup(widgetRoot) {
  meetup.hideDefaultMeetup(widgetRoot);
  widgetRoot.getElementsByClassName("meetup-none")[0].style.display = "block";
}

export function hideDefaultMeetup(widgetRoot) {
  widgetRoot.getElementsByClassName("meetup-default")[0].style.display = "none";
}

export async function startMeetupWidget(widgetRoot) {
  const widgetLimit = parseInt(widgetRoot.getAttribute('meetup_widget_limit'))
  const meetups = await meetup.getMeetups(widgetLimit)

  if(Array.isArray(meetups) && meetups.length > 0) {
    meetup.renderMeetups(widgetRoot, meetups);
    return
  }

  meetup.renderNoneMeetup(widgetRoot);
};

window.addEventListener('load', function () {
  Array.from(document.getElementsByClassName("meetup-widget")).forEach((widgetRoot) => {
    meetup.startMeetupWidget(widgetRoot);
  });
});
