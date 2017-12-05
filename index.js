// using: regex, capture groups, and capture group variables.
var templateUrlRegex = /templateUrl *:(.*)$/gm;
var stringRegex = /(['"])((?:[^\\]\\\1|.)*?)\1/g;

function replaceStringsWithRequires(string) {
  return string.replace(stringRegex, function (match, quote, url) {
    return "require('" + url + "')";
  });
}

module.exports = function(source, sourcemap) {
  // Not cacheable during unit tests;
  this.cacheable && this.cacheable();

  var newSource = source.replace(templateUrlRegex, function (match, url) {
                 if (match.indexOf('require(') !== -1) return match;

                 // replace: templateUrl: 'path/to/template.html'
                 // with: template: require('./path/to/template.html')
                 return "template:" + replaceStringsWithRequires(url);
               });

  // Support for tests
  if (this.callback) {
    this.callback(null, newSource, sourcemap)
  } else {
    return newSource;
  }
};
