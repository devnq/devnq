import 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.min';

import './components/main.css';

import fontawesome from '@fortawesome/fontawesome';
import MDItoFAIcon from 'fontawesome-svg-mdi';

import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook';
import faSlack from '@fortawesome/fontawesome-free-brands/faSlack';
import faMeetup from '@fortawesome/fontawesome-free-brands/faMeetup';
import faYoutube from '@fortawesome/fontawesome-free-brands/faYoutube';
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';

import { mdiDesktopClassic, mdiCalendar, mdiMapMarker, mdiMapMarkerOutline, mdiArrowRight } from '@mdi/js';

const mdiConverter = new MDItoFAIcon();
const faDesktopComputer = mdiConverter.convert(mdiDesktopClassic, 'desktop');
const faCalendar = mdiConverter.convert(mdiCalendar, 'calendar');
const faMapMarker = mdiConverter.convert(mdiMapMarker, 'map-marker');
const faMapMarkerOutline = mdiConverter.convert(mdiMapMarkerOutline, 'map-marker-outline');
const faArrowRight = mdiConverter.convert(mdiArrowRight, 'arrow-right');

fontawesome.library.add(faEnvelope, faSpinner, faFacebook, faMeetup, faYoutube, faLinkedin, faTwitter, faSlack, faCalendar, faMapMarker, faUsers, faDesktopComputer, faCalendar, faMapMarker, faMapMarkerOutline, faArrowRight);

import * as meetup from './components/meetup';
