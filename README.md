# Grapevine-Rss-Reader

# Building

two ENV variables need to be defined to build Grapevine Rss Reader for production:

GRAPEVINE_HOST : This is the url and port to the Grapevine Rss Aggregator instance

PUBLIC_PATH : This is the url to where Grapevine Rss Reader will be served from. This can be served from Apache, nginx, or other web server.

Example:

```bash
PUBLIC_PATH="http://grapevine.your-domain.com" GRAPEVINE_HOST="http://grapevine.your-domain.com:3000" yarn run build
```
