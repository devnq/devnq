import 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.min';

import './components/main.css';

import fontawesome from '@fortawesome/fontawesome';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook';
import faSlack from '@fortawesome/fontawesome-free-brands/faSlack';
import faMeetup from '@fortawesome/fontawesome-free-brands/faMeetup';
import faYoutube from '@fortawesome/fontawesome-free-brands/faYoutube';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import faCalendar from '@fortawesome/fontawesome-pro-light/faCalendar';
import faMapMarker from '@fortawesome/fontawesome-pro-light/faMapMarker';
import faBullhorn from '@fortawesome/fontawesome-pro-light/faBullhorn';


fontawesome.library.add(faEnvelope, faSpinner, faFacebook, faMeetup, faYoutube, faTwitter, faSlack, faCalendar, faMapMarker, faBullhorn, faUsers);

import * as meetup from './components/meetup';
