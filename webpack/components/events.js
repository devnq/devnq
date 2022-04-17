import MeetupReader from './meetup';

const MEETUP_GROUP_URL_NAME = 'dev_nq';
const MEETUP_FEED_URL = `https://d2qrtp8csnyzho.cloudfront.net/${MEETUP_GROUP_URL_NAME}/events/rss`;

class EventWidget {
  constructor(rootElement, events) {
    this.rootElement = rootElement;
    this.eventLimit = parseInt(rootElement.getAttribute('meetup_widget_limit'), 10);

    if (Array.isArray(events) && events.length > 0) {
      this.renderEvents(events.slice(0, this.eventLimit));
      return;
    }

    this.renderNoEvents();
  }

  renderNoEvents() {
    this.hideDefault();
    this.rootElement.getElementsByClassName('meetup-none')[0].style.display = 'block';
  }

  hideDefault() {
    this.rootElement.getElementsByClassName('meetup-default')[0].style.display = 'none';
  }

  renderEvents(meetups) {
    const eventTemplateNode = this.rootElement.getElementsByClassName('meetup-event')[0];
    const eventListNode = this.rootElement.getElementsByClassName('meetup-events')[0];
    meetups.forEach((meetupEvent) => {
      const eventNode = eventTemplateNode.cloneNode(true);

      const titleNode = eventNode.getElementsByClassName('meetup-event-title')[0];
      const datetimeNode = eventNode.getElementsByClassName('meetup-event-datetime')[0];
      const descNode = eventNode.getElementsByClassName('meetup-event-desc')[0];
      const linkNode = eventNode.getElementsByClassName('meetup-event-link')[0];

      if (titleNode) {
        titleNode.innerHTML = meetupEvent.name;
      }
      if (datetimeNode) {
        datetimeNode.innerHTML = meetupEvent.date;
      }
      if (descNode) {
        descNode.innerHTML = meetupEvent.description;
      }
      if (linkNode) {
        linkNode.setAttribute('href', meetupEvent.link);
      }

      eventListNode.appendChild(eventNode);
    });

    eventTemplateNode.remove();
    this.hideDefault();
    this.rootElement.getElementsByClassName('meetup-events')[0].style.display = 'block';
  }
}

window.addEventListener('load', async () => {
  const widgets = document.getElementsByClassName('meetup-widget');
  if (widgets.length > 0) {
    const meetupReader = new MeetupReader(MEETUP_FEED_URL);
    const meetups = await meetupReader.get();

    Array.from(document.getElementsByClassName('meetup-widget'))
      .map((widgetRoot) => new EventWidget(widgetRoot, meetups));
  }
});
