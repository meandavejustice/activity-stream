const kNotWordPattern = /[^a-z0-9 ]+/g;

function Tokenizer_EN_US() {
  this._urlStopwordSet = {
    "com": true,
    "net": true,
    "org": true,
    "int": true,
    "edu": true,
    "gov": true,
    "mil": true,
    "www": true,
    "www1": true,
    "www2": true,
    "www3": true,
    "www4": true,
    "www5": true,
    "www6": true,
    "www7": true,
    "www8": true,
    "www9": true,
    "http": true,
    "https": true,
    "ftp": true,
    "cgi": true,
    "index": true,
    "cfm": true,
    "shtml": true,
    "home": true,
    "htm": true,
    "welcome": true,
    "html": true,
    "js": true,
    "default": true,
    "asp": true,
    "pl": true,
    "wml": true,
    "php4": true,
    "php5": true,
    "php": true,
    "aspx": true,
    "css": true,
    "wap": true
  };
}

Tokenizer_EN_US.prototype = {
  tokenize: function(aUrl, aTitle) {
    aUrl = aUrl.toLowerCase().replace(kNotWordPattern, " ");

    let tokens = [];

    let urlTokens = aUrl.split(/\s+/);
    urlTokens.forEach(function(token) {
      if (!this._urlStopwordSet.hasOwnProperty(token) && token !== "" && isNaN(token)) {
        tokens.push(token);
      }
    }, this);

    aTitle = (aTitle) ? aTitle.toLowerCase().replace(kNotWordPattern, " ") : "";
    tokens = tokens.concat(aTitle.split(/\s+/));

    return tokens;
  }
};