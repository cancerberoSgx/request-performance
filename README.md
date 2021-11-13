# About

Uses curl to extract connection timings from given urls, stats, and comparison reports.

Use case: you need to compare the same project deployed in different server providers (stg vs prod, etc). So you can diagnose what part of the http connection could be causing problems. 


WIP

# Usage

```sh
npm i -g request-performance
request-performance --url a.com --url b.com timeAmount 5000 --uniqueParam test --report html --reportOutput report1.html
firefox report1.html
```

## CLI params

```
Usage: 
request-performance --url foo.com --url bar.com --timeAmount 5000 --uniqueParam test

Options: 

 --url          Required. Multiple times to compare each other
 --timeAmount   Optional. Default 1000. Test duration in ms. Make sure the amount of time makes sense for given amount of urls.
 --uniqueParam  Optional. If given it will add a url parameter with `uniqueParam` name and random number to avoid url caching
```

# API

TODO


# Reports

## json (default)

json with all request made and stats about each factor

## html

static html with embeds json results and display stats, requests, charts. Useful for sharing as a standalone html document.

## more to come

# DONE

 * store the real hit url (with uniqueParam) and cmd
