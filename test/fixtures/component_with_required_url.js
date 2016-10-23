var test = String.raw`
  import { IComponentOptions } from 'angular';
  
  export class TestComponent implements IComponentOptions {
    controller = TestController;
    templateUrl = require('./some/path/to/file.html');
  }
  class TestController { }
`;

module.exports = test;
