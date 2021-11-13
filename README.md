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
```

# Options

Almost the same for CLI and API:

```
 --url          Required. Multiple times to compare each other
 --timeAmount   Optional. Default 1000. Test duration in ms. Make sure the amount of time makes sense for given amount of urls.
 --uniqueParam  Optional. If given it will add a url parameter with 'uniqueParam' name and random number to avoid url caching
 --report       (any of json, html). Default json
 --reportOutput file where to store the report. If not give it will print to stdout
 --reportInput  if given it won't run the test just build a --report from provided json file
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

# TODO

 * concurrency. Design model example: partition timeAmount for each url. use p-queue
 * cli
 * web client / html generation for reports
 * collect more info like status code, response body
 * enable url headers as input

## UX TODO: 

request-performance --url a.com --url b.com --report html --reportOutput run1.html

## html TODO: 

 * i want to see how many request each url has tested with
 * a playground where I can run tests indefinetly and stats and charts are updated periodically. 

## cli TODO: 

 --report  (any of json, html). Default json
 --reportOutput  file where to store the report. If not give it will print to stdout
 --reportInput   if given it won't run the test just build a --report from provided json file

# useful commands (internally)

```
# build and run js cli
clear && npx tsc && node bin/bin.js --url https://api.stg.findluca.com/version --url https://api.prod.cloud.findmotto.com/version --timeAmount 2000 --uniqueParam seba

# run cli with ts-node
ts-node src/cli/cliMain.ts --url https://api.stg.findluca.com/version --url https://api.prod.cloud.findmotto.com/version --timeAmount 1000 --uniqueParameter seba

```

<!-- 
# how

in its default form it will hit given url for given amount of time with given concurrency and then print a report

if you provide mor than one urls it will run the test for each in the following manner and then print a comparission report. For example, lets say I want to compare urlA and urlB with concurrency=5, it will:

TODO: explain multiple url algorithms

# curl notes

example: 

```
curl -o /dev/null \
  -H 'Cache-Control: no-cache' \
  -s \
  -w "Connect: %{time_connect} TTFB: %{time_starttransfer} Total time: %{time_total} \n" \
  https://api.stg.findluca.com/health
```

## curl doc:  

```
-w, --write-out <format>
              Make curl display information on stdout after a completed transfer. The format is a string that may contain plain text mixed with any number of variables. The format can be specified as a literal "string", or you can have curl read the for-
              mat from a file with "@filename" and to tell curl to read the format from stdin you write "@-".

              The variables present in the output format will be substituted by the value or text that curl thinks fit, as described below. All variables are specified as %{variable_name} and to output a normal % you just write them as %%. You can output
              a newline by using \n, a carriage return with \r and a tab space with \t.

              The output will be written to standard output, but this can be switched to standard error by using %{stderr}.

              NOTE: The %-symbol is a special symbol in the win32-environment, where all occurrences of % must be doubled when using this option.

              The variables available are:

              content_type   The Content-Type of the requested document, if there was any.

              filename_effective
                             The ultimate filename that curl writes out to. This is only meaningful if curl is told to write to a file with the -O, --remote-name or -o, --output option. It's most useful in combination with  the  -J,  --remote-header-name
                             option. (Added in 7.26.0)

              ftp_entry_path The initial path curl ended up in when logging on to the remote FTP server. (Added in 7.15.4)

              http_code      The numerical response code that was found in the last retrieved HTTP(S) or FTP(s) transfer. In 7.18.2 the alias response_code was added to show the same info.

              http_connect   The numerical code that was found in the last response (from a proxy) to a curl CONNECT request. (Added in 7.12.4)

              http_version   The http version that was effectively used. (Added in 7.50.0)

              local_ip       The IP address of the local end of the most recently done connection - can be either IPv4 or IPv6 (Added in 7.29.0)

              local_port     The local port number of the most recently done connection (Added in 7.29.0)

              num_connects   Number of new connects made in the recent transfer. (Added in 7.12.3)

              num_redirects  Number of redirects that were followed in the request. (Added in 7.12.3)

              proxy_ssl_verify_result
                             The result of the HTTPS proxy's SSL peer certificate verification that was requested. 0 means the verification was successful. (Added in 7.52.0)

              redirect_url   When an HTTP request was made without -L, --location to follow redirects (or when --max-redir is met), this variable will show the actual URL a redirect would have gone to. (Added in 7.18.2)

              remote_ip      The remote IP address of the most recently done connection - can be either IPv4 or IPv6 (Added in 7.29.0)

              remote_port    The remote port number of the most recently done connection (Added in 7.29.0)

              scheme         The URL scheme (sometimes called protocol) that was effectively used (Added in 7.52.0)

              size_download  The total amount of bytes that were downloaded.

              size_header    The total amount of bytes of the downloaded headers.

              size_request   The total amount of bytes that were sent in the HTTP request.

              size_upload    The total amount of bytes that were uploaded.

              speed_download The average download speed that curl measured for the complete download. Bytes per second.

              speed_upload   The average upload speed that curl measured for the complete upload. Bytes per second.

              ssl_verify_result
                             The result of the SSL peer certificate verification that was requested. 0 means the verification was successful. (Added in 7.19.0)

              stderr         From this point on, the -w, --write-out output will be written to standard error. (Added in 7.63.0)

              stdout         From this point on, the -w, --write-out output will be written to standard output.  This is the default, but can be used to switch back after switching to stderr.  (Added in 7.63.0)

              time_appconnect
                             The time, in seconds, it took from the start until the SSL/SSH/etc connect/handshake to the remote host was completed. (Added in 7.19.0)

              time_connect   The time, in seconds, it took from the start until the TCP connect to the remote host (or proxy) was completed.

              time_namelookup
                             The time, in seconds, it took from the start until the name resolving was completed.

              time_pretransfer
                             The time, in seconds, it took from the start until the file transfer was just about to begin. This includes all pre-transfer commands and negotiations that are specific to the particular protocol(s) involved.

              time_redirect  The  time, in seconds, it took for all redirection steps including name lookup, connect, pretransfer and transfer before the final transaction was started. time_redirect shows the complete execution time for multiple redirec-
                             tions. (Added in 7.12.3)

              time_starttransfer
                             The time, in seconds, it took from the start until the first byte was just about to be transferred. This includes time_pretransfer and also the time the server needed to calculate the result.

              time_total     The total time, in seconds, that the full operation lasted.



``` -->