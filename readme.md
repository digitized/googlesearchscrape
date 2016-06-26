# Google-Search-Scrape

Simple Web Scrape for Google Search, Images, News

### Version
0.2.0

### Installation
```sh
$ npm i --save google-search-scrape
```

### Usage
    var gss = require('google-search-scrape');
    // Returns promise with array of Searches (Object)
    var query = 'cats'
    
    // Returns promise with website link (String)    
    gss.getWebsite(query);
    // "link"

    // Returns promise with array of Searches (Object)
    gss.getSearch(query);
    // [{ link: "link", description: "description" }, ...]
    
    // Returns promise with array of news (Object)
    gss.getNews(query);
    // [{ link: "link", description: "description" }, ...]
    
    // Returns promise with all images in array (Array)
    gss.getImages(query);
    // ["link","link", ...]
    

License
----
MIT
