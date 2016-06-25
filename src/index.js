import cheerio from 'cheerio';
import fetch from 'isomorphic-fetch';
import promise from 'es6-promise';
promise.polyfill();

// Helper function to get URL body and load into cheerio
const getPage = url =>
  fetch(url)
    .then(response => response.text())
    .then(body => cheerio.load(body));

// Returns promise with array of Searches (Object)
// [{ link: "link", description: "description" }, ...]
const getSearch = query => {
  const url = `https://www.google.com/search?q=${query}`;
  const searchList = [];
  return getPage(url)
    .then($ => $('#ires').find('.g'))
    .then(searches => {
      for (let i = 0; i < searches.length; i++) {
        const searchInfo = searches[i].children;
        if (searchInfo.length >= 2) {
          const link = searchInfo[0].children[0].attribs.href
            .replace(/^\/url\?q=/, '')
            .replace(/(&sa.*)|(%3.*)/, '');

          let description = 'No description';
          if (searchInfo[1].children[1]) {
            const descriptionArr = searchInfo[1].children[1].children;
            description = descriptionArr.reduce((curr, part) => {
              const line = part.data ? part.data.replace(/\r?\n|\r/, ' ') : '';
              return curr + line;
            }, '');
          }
          searchList.push({ link, description });
        }
      }
      return searchList;
    });
};

// Returns promise with website link (String)
// "link"
const getWebsite = query =>
  getSearch(query)
    .then(searches => searches[0].link);

// Returns promise with array of news (Object)
// [{ link: "link", description: "description" }, ...]
const getNews = query => {
  const url = `https://www.google.com/search?hl=en&tbm=nws&q=${query}`;
  const newsList = [];
  return getPage(url)
    .then($ => $('#ires').find('.g .r'))
    .then(searches => {
      for (let i = 0; i < searches.length; i++) {
        const link = searches[i].children[0].attribs.href
          .replace(/^\/url\?q=/, '')
          .replace(/(&sa.*)|(%3.*)/, '');

        const descriptionArr = searches[i].next.next.children;
        const description = descriptionArr.reduce((curr, part) => {
          const line = part.data ? part.data.replace(/\r?\n|\r/, ' ') : '';
          return curr + line;
        }, '');
        newsList.push({ link, description });
      }
      return newsList;
    });
};

// Returns promise with all images in array (Array)
// ["link","link", ...]
const getImages = query => {
  const url = `https://www.google.com/search?tbm=isch&q=${query}`;
  const imageList = [];
  return getPage(url)
    .then($ => $('#ires').find('a img'))
    .then(images => images.each((index, image) => imageList.push(image.attribs.src)))
    .then(() => imageList);
};

export default { getSearch, getWebsite, getNews, getImages };
