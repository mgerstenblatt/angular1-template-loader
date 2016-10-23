var componentWithoutRelativePeriodSlash = `
  import { IComponentOptions } from 'angular';
  
  export class TestComponent implements IComponentOptions {
    controller = TestController;
    templateUrl = 'file.html';
  }
  class TestController { }
`;

module.exports = componentWithoutRelativePeriodSlash;
