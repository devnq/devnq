import * as meetup from './meetup.js';

describe('startMeetupWidget',  () => {

  beforeEach(() => {
    jest.spyOn(meetup, 'getNextMeetup');
    jest.spyOn(meetup, 'renderNextMeetup');
    jest.spyOn(meetup, 'renderNoneMeetup');
  });

  afterEach(() => {
    meetup.getMeetups.mockRestore();
    meetup.renderNextMeetup.mockRestore();
    meetup.renderNoneMeetup.mockRestore();
  });

  test('renders a meetup when one exists', (done) => {
    const MOCK_RESULT = [
      {mock_result: true}
    ];

    meetup.getMeetups.mockImplementation((callback) => {return callback(null, MOCK_RESULT)});
    meetup.renderNextMeetup.mockImplementation(() => {});
    meetup.renderNoneMeetup.mockImplementation(() => {});

    meetup.startMeetupWidget((err) => {
      if(err) {
        done(err);
      }

      expect(meetup.getMeetups).toHaveBeenCalled();
      expect(meetup.renderNextMeetup).toHaveBeenCalledWith(MOCK_RESULT);
      expect(meetup.renderNoneMeetup).not.toHaveBeenCalled();
      done();
    });
  });

  test('renders a placeholder when an error occurs', (done) => {
    meetup.getMeetups.mockImplementation((callback) => {return callback(new Error('Test Error'))});
    meetup.renderNextMeetup.mockImplementation(() => {});
    meetup.renderNoneMeetup.mockImplementation(() => {});

    meetup.startMeetupWidget((err) => {
      if(err) {
        done(err);
      }

      expect(meetup.getMeetups).toHaveBeenCalled();
      expect(meetup.renderNextMeetup).not.toHaveBeenCalled();
      expect(meetup.renderNoneMeetup).toHaveBeenCalled();
      done();
    });
  });

  test('renders a placeholder when no meetups exist', (done) => {
    const MOCK_RESULT = [];

    meetup.getMeetups.mockImplementation((callback) => {return callback(null, MOCK_RESULT)});
    meetup.renderNextMeetup.mockImplementation(() => {});
    meetup.renderNoneMeetup.mockImplementation(() => {});

    meetup.startMeetupWidget((err) => {
      if(err) {
        done(err);
      }

      expect(meetup.getMeetups).toHaveBeenCalled();
      expect(meetup.renderNextMeetup).not.toHaveBeenCalled();
      expect(meetup.renderNoneMeetup).toHaveBeenCalled();
      done();
    });
  });
});