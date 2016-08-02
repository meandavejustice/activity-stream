/* globals importScripts, Tokenizer_EN_US */

importScripts("tokenizers/en-US.js");

let gTokenizer = new Tokenizer_EN_US();
let URLS_TO_KEYWORDS = {};
let KEYWORDS_TO_URLS = {};

function processHistoryBatch(aMessageData) {
  generateKeywordURLMappings(aMessageData.links);
}

function generateKeywordURLMappings(historyBatch) {
  for (let visit of historyBatch) {
    let keywords = gTokenizer.tokenize(visit.url, visit.title);
    mapKeywordsToURL(keywords, visit.url);

    if (!URLS_TO_KEYWORDS.hasOwnProperty(visit.url)) {
      URLS_TO_KEYWORDS[visit.url] = [];
    }
    URLS_TO_KEYWORDS[visit.url] = URLS_TO_KEYWORDS[visit.url].concat(keywords);
  }
}

function mapKeywordsToURL(keywords, url) {
  for (let keyword of keywords) {
    if (!KEYWORDS_TO_URLS.hasOwnProperty(keyword)) {
      KEYWORDS_TO_URLS[keyword] = new Set();
    }
    KEYWORDS_TO_URLS[keyword].add(url);
  }
}

self.onmessage = function({data}) {
  self[data.command](data.payload);
};
