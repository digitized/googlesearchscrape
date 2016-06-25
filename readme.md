# Google-Search-Scrape

Simple Web Scrape for Google Search, Images, News

### Version
0.1.0

### Installation
```sh
$ npm i --save google-search-scrape
```

### Usage
    var google-search-scrape = require('google-search-scrape');
    // Returns promise with array of Searches (Object)
    var query = 'cats'
    
    // Returns promise with website link (String)    
    google-search-scrape.getWebsite(query);
    // "link"

    // Returns promise with array of Searches (Object)
    google-search-scrape.getSearch(query);
    // [{ link: "link", description: "description" }, ...]
    
    // Returns promise with array of news (Object)
    google-search-scrape.getNews(query);
    // [{ link: "link", description: "description" }, ...]
    
    // Returns promise with all images in array (Array)
    google-search-scrape.getImages(query);
    // ["link","link", ...]
    

License
----
MIT
