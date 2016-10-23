var componentWithNoSpacing = `
  import { IComponentOptions } from 'angular';
  
  export class TestComponent implements IComponentOptions {
    controller = TestController;
    templateUrl='./some/path/to/file.html';
  }
  class TestController { }
`;

module.exports = componentWithNoSpacing;
