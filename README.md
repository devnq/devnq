# DevNQ Website

This repository contains the source code for the DevNQ Website,
[devnq.org](http://devnq.org). If you're looking to find out more about DevNQ, North
Queensland's software developer community, head to [the website](http://devnq.org).

This repository is made available to allow for the submission of
contributions by members and the general public. We welcome new content,
bugfixes and updates. If you're interested in contributing see the
Contribution section below.

## Usage

### Setup

Three steps are required to setup the DevNQ website for development or
build.

** 1. Configure NPM Access to FontAwesome Pro Repositories**

```
npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" <FontAwesome Pro Token>
```

** 2. Install required Ruby dependencies **

```
bundle install
```

** 3. Install required Node.js dependencies **

```
npm install
```

### Local Development

This repository includes a local development server for testing changes
 on http://localhost:4000.

```
npm run serve
```

This development environment also includes the appropriate webpack
configuration to update the necessary CSS and Javascript bundles when
these are modified.

### Build

The project can be manually built and optimised, ready for deployment
 using the following command:

```
npm run build
```

### Deployment

The website is hosted with Github Pages inside the same respository as
this source is stored. Deployment is normally handled by Circle CI on
all new commits to the `master` branch. Alternatively, with appropriate
Github access the website can be manually deployed from any machine.

```
npm run deploy
```

## Contribution


