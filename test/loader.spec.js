var should = require("should");
var loader = require("../index.js");

var fixtures = require("./fixtures");

describe("loader", function() {
  it("Should convert html file strings to require()", function(){

    loader.call({}, fixtures.simpleAngular1TestComponentFileStringSimple)
      .should
      .be
      .eql(`
  import { IComponentOptions } from 'angular';
  
  export class TestComponent implements IComponentOptions {
    controller = TestController;
    templateUrl = require('./some/path/to/file.html');
  }
  class TestController { }
`
      )

  });

  it("Should convert html file strings to require() regardless of inner quotes", function(){

    loader.call({}, fixtures.componentWithQuoteInUrls)
      .should
      .be
      .eql(String.raw`
  import { IComponentOptions } from 'angular';
  
  export class TestComponent implements IComponentOptions {
    controller = TestController;
    templateUrl = require('./some/path/to/file\'.html');
  }
  class TestController { }
`
      )

  });

  it("Should return original source if there are no matches", function() {
    loader.call({}, 'foo')
      .should
      .be
      .eql('foo');
  });

  it("Should convert partial string match requires", function() {
    loader.call({}, `templateUrl = './index/app.html'`)
      .should
      .be
      .eql(`templateUrl = require('./index/app.html')`);
  });

  it("Should handle the absense of proper relative path notation", function() {
    loader.call({}, fixtures.componentWithoutRelPeriodSlash)
      .should
      .be
      .eql(`
  import { IComponentOptions } from 'angular';
  
  export class TestComponent implements IComponentOptions {
    controller = TestController;
    templateUrl = require('./file.html');
  }
  class TestController { }
`
      );
  });

  it("Should convert html file strings to require() regardless of spacing", function(){

    loader.call({}, fixtures.componentWithNoSpacing)
      .should
      .be
      .eql(`
  import { IComponentOptions } from 'angular';
  
  export class TestComponent implements IComponentOptions {
    controller = TestController;
    templateUrl =require('./some/path/to/file.html');
  }
  class TestController { }
`
      )

  });


  it("Should return original source if url already required", function(){

    loader.call({}, fixtures.componentWithRequiredUrl)
      .should
      .be
      .eql(fixtures.componentWithRequiredUrl)

  });

});
