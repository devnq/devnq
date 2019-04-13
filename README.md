# DevNQ Website

This repository contains the source code for the DevNQ Website,
[devnq.org](http://devnq.org). If you're looking to find out more about
DevNQ, North Queensland's software developer community, head to
[the website](http://devnq.org).

This repository is made available to allow for the submission of
contributions by members and the general public. We welcome new content,
bugfixes and updates. If you're interested in contributing see the
Contributing section below.

## Usage

### Setup

Three steps are required to setup the DevNQ website for development or
build.

#### Prerequisites

- Ruby 2.4.2
- Bundle 2.0.1
- Node.js 8.x or higher
- NPM 5.x or higher

#### 1. Configure NPM Access to FontAwesome Pro Repositories

```
npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" <FontAwesome Pro Token>
```

#### 2. Install required dependencies

```
npm install
```

NPM install will install all NPM dependencies followed by Ruby Gemfile
dependencies using the Bundle tool.

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

## Contributing

DevNQ welcomes contributions to our website. With our Jekyll-powered
 website you can make code contributions to this repository to modify or
 update the website's content or design. These will automatically be
 deployed to the live website after being reviewed by the project
 maintainers.

### How to contribute

If you'd like to contribute, start by searching through the
[https://github.com/tjdavey/devnq/issues](issues) and
[https://github.com/tjdavey/devnq/pulls](pull requests) to see whether
someone else has already made contributions to these areas. You may be
able to assist by reviewing their work, or addressing their issue.

If there isn't an existing issue or pull request with feedback from the
maintainers consider the scale and impact of your contribution:
- If your contribution is minor, such as a typo fix, open a pull
request.
- If your contribution is major, such as a new page or a large design
change, start by opening an issue and collecting feedback first. That
way, other people can weigh in on the discussion before you do any work.

To make a contribution to this repository we recommend using the
standard [https://gist.github.com/Chaser324/ce0505fbed06b947d962](Fork
and Pull Request Workflow) to submit a pull request which can be
 reviewed by our maintainers.

### Expectations

- Contributors to all DevNQ projects are expected to conform to the
[https://github.com/tjdavey/devnq/blob/master/CODE-OF-CONDUCT.md](DevNQ
Contributor Code of Conduct). All contributors should read and
understand these rules before making any commits, issues, comments,
pull requests
- Contributions must pass all validation and linting tests to be
accepted.
- Copyrighted content should only be included in DevNQ media with the
copyright holders permission. Contributions containing copyrighted
content should be accompanied with evidence of the copyright holder
 issuing DevNQ unlimited and perpetual rights to publish their content
 on our website.

### Current Maintainers

- [https://github.com/tjdavey](Tristan Davey)



