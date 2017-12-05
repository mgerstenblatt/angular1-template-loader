var should = require("should");
var loader = require("../index.js");

var fixtures = require("./fixtures");

describe("loader", function() {
  it("Should convert html file strings to require()", function(){

    loader.call({}, fixtures.simpleAngular1TestComponentFileStringSimple)
      .should
      .be
      .eql(`
  angular.module('someModule', [])
    .component('someComponent', {
      template: require('some/path/to/a/file.html')
  });
`
      )

  });

  it("Should return original source if there are no matches", function() {
    loader.call({}, 'foo')
      .should
      .be
      .eql('foo');
  });
});
