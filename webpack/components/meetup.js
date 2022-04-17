const MEETUP_DATE_REGEX = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (January|February|March|April|May|June|July|August|September|October|November|December) ([0-9]{1,2}) at ([1]?[0-9])(:[0-5][0-9]) (AM|PM)$/;

class MeetupReader {
  constructor(url) {
    this.feed_url = url;
  }

  async get() {
    const feedResponse = await fetch(this.feed_url);
    if (feedResponse.ok === false) {
      throw new Error(`Unexpected RSS Error. Response code: ${feedResponse.status}`);
    }

    const feedBody = await feedResponse.text();
    const feed = new window.DOMParser().parseFromString(feedBody, 'text/xml');

    return MeetupReader._parseMeetups(feed);
  }
}

MeetupReader._parseMeetups = function _parseMeetups(meetupFeed) {
  return Array.from(meetupFeed.getElementsByTagName('item')).map(MeetupReader._parseMeetup);
};

MeetupReader._parseMeetup = function _parseMeetup(meetupItem) {
  const descParsed = this._parseDescription(meetupItem.getElementsByTagName('description').item(0).innerHTML);

  return {
    name: MeetupReader._readCdata(meetupItem.getElementsByTagName('title').item(0).innerHTML),
    link: MeetupReader._readCdata(meetupItem.getElementsByTagName('guid').item(0).innerHTML),
    description: MeetupReader._readDesc(descParsed),
    date: MeetupReader._readDate(descParsed)
  };
};

MeetupReader._parseDescription = function _parseDescription(descriptionString) {
  const rawCdata = MeetupReader._readCdata(descriptionString);
  return new window.DOMParser().parseFromString(rawCdata, 'text/html');
};

MeetupReader._readDate = function _readDate(descParsed) {
  const pArr = Array.from(descParsed.getElementsByTagName('p'));
  const dateElement = pArr.find((e) => e.textContent.match(MEETUP_DATE_REGEX));
  return dateElement.textContent;
};

MeetupReader._readDesc = function _readDesc(descParsed) {
  const pArr = Array.from(descParsed.getElementsByTagName('p'));
  // Remove the clutter Meetup adds to find the real description
  const pArrTrimmed = pArr.slice(1, -4);
  // Look for the first paragraph with content
  const descElement = pArrTrimmed.find((e) => e.innerHTML.length !== 0);
  return descElement.textContent;
};

MeetupReader._readCdata = function _readCdata(cdataString) {
  return new window.DOMParser().parseFromString(`<div xmlns="http://www.w3.org/1999/xhtml">${cdataString}</div>`, 'text/xml').firstChild.firstChild.data;
};

export default MeetupReader;
