import nock from 'nock';
import fs from 'fs';

import MeetupReader from '../components/meetup';

describe('MeetupReader', () => {
  const MOCK_URL = 'https://testmeetup.com/feedpath';
  const MOCK_LIMIT = 1;

  describe('constructor', () => {
    test('should create a MeetupReader object with the given instance properties', () => {
      const testMeetupReader = new MeetupReader(MOCK_URL, MOCK_LIMIT);
      expect(testMeetupReader.feed_url).toEqual(MOCK_URL);
      expect(testMeetupReader.limit).toEqual(MOCK_LIMIT);
    });
  });

  describe('get()', () => {
    const testMeetupReader = new MeetupReader(MOCK_URL, MOCK_LIMIT);
    const MOCK_FEED = fs.readFileSync('./webpack/test/assets/meetup_rss_mock.xml', 'utf8');

    beforeAll(() => {
      nock.disableNetConnect();
    });

    beforeEach(() => {
      jest.spyOn(MeetupReader, '_parseMeetups');
    });

    afterEach(() => {
      MeetupReader._parseMeetups.mockRestore();
      nock.cleanAll();
    });

    afterAll(() => {
      nock.enableNetConnect();
    });

    test('should read and parse from the RSS feed', async () => {
      const mockMeetups = [
        { name: 'Meetup 1' },
        { name: 'Meetup 2' }
      ];

      nock('https://testmeetup.com')
        .get('/feedpath')
        .reply(
          200,
          MOCK_FEED,
          { 'Content-Type': 'application/rss+xml' }
        );

      MeetupReader._parseMeetups.mockReturnValue(mockMeetups);

      const mockFeedDom = new window.DOMParser().parseFromString(MOCK_FEED, 'text/xml');

      const results = await testMeetupReader.get();

      expect(MeetupReader._parseMeetups).toHaveBeenCalled();
      expect(MeetupReader._parseMeetups.mock.calls[0][0].documentElement.innerHTML)
        .toEqual(mockFeedDom.documentElement.innerHTML);

      expect(results).toEqual([mockMeetups[0]]);
    });

    test('should raise an error if theres an issue with the RSS feed', async () => {
      const mockMeetups = [
        { name: 'Meetup 1' },
        { name: 'Meetup 2' }
      ];

      nock('https://testmeetup.com')
        .get('/feedpath')
        .reply(
          404
        );

      MeetupReader._parseMeetups.mockReturnValue(mockMeetups);

      await expect(testMeetupReader.get())
        .rejects
        .toThrow('Unexpected RSS Error. Response code: 404');
    });
  });
});
