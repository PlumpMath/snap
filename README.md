# snap

Fetches web pages for you and optionally stores them by date. Your
personal Wayback Machine. (Kind-of, as it doesn't follow links, inlines
styles or does any such fancy things. It just stores the content and a
screenshot.)

## api

* GET `/fetch?url=<url>&mode=<mode>`: Fetches the page at `url` and return the result as `mode`.
* GET `/archive?url=<url>`: Archives the page at `url` and stores it as an image and as text along with the date.

Allowed modes are `png`, `pdf`, `txt` and `html`.

## running

    $ npm install
    $ node server.js

You can specify the directory to store pages in using the `STORE`
environment variable and the port to launch on using `PORT`.

## storage

Pages are stored in the `./store` directory (or the one in the `STORE`
environment variable). Pages are stored in a hierarchy as below:

    $STORE/<host>/<path>/<date>/{info.json,page.png,page.txt,page.html}
