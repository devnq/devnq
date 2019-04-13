import * as meetup from './meetup.js';

describe('startMeetupWidget',  () => {
  test('renders a meetup when one exists', (done) => {
    const MOCK_RESULT = [
      {mock_result: true}
    ];

    jest.spyOn(meetup, 'getNextMeetup').mockImplementation((callback) => {return callback(null, MOCK_RESULT)});
    jest.spyOn(meetup, 'renderNextMeetup').mockImplementation(() => {return});
    jest.spyOn(meetup, 'renderNoneMeetup').mockImplementation(() => {return});

    meetup.startMeetupWidget((err) => {
      if(err) {
        done(err);
      }

      expect(meetup.getNextMeetup).toHaveBeenCalled();
      expect(meetup.renderNextMeetup).toHaveBeenCalledWith(MOCK_RESULT);
      expect(meetup.renderNoneMeetup).not.toHaveBeenCalled();
      done();
    });
  });
});