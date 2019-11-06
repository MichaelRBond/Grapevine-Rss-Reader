# Grapevine-Rss-Reader

Grapevine RSS Reader is a Web Front End Application for the Grapevine RSS Aggregator, providing an interface for mangaing RSS feeds and reading new items. 

This minimal interface has been my daily driver for using Grapevine Rss Aggegator since October 2018. 

## Getting Started

Clone this repo:

```bash
git clone https://github.com/MichaelRBond/Grapevine-Rss-Reader.git
```

Install dependencies:

if you don't have yarn installed, visit the yarn website for instructions: https://yarnpkg.com/en/docs/install


```bash
cd Grapevine-Rss-Reader
yarn install
```

## Building

two ENV variables need to be defined to build Grapevine Rss Reader for production:

GRAPEVINE_HOST : This is the url and port to the Grapevine Rss Aggregator instance

PUBLIC_PATH : This is the url to where Grapevine Rss Reader will be served from. This can be served from Apache, nginx, or other web server.

Example:

```bash
PUBLIC_PATH="http://grapevine.your-domain.com" GRAPEVINE_HOST="http://grapevine.your-domain.com:3000" yarn run build
```

This will build Grapevine Rss Reader into the `dist` directory. 

## Deploying

the simplest way to deploy is to copy all of the files that are in the dist directory to a directory on your web server. 
