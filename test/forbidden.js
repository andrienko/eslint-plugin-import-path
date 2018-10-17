var rule = require("../lib/rules/forbidden");
var RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({ parser: "babel-eslint"});

var ruleTester = new RuleTester();

ruleTester.run("parent-depth", rule, {
  valid: [
    "import whatever from './something/index'"
  ],
  invalid: [
    {
      code: "import whatever from './something/index'",
      errors: [{}],
      options: ['/index$']
    },
    {
      code: "import whatever from '../../../index'",
      errors: [{}],
      options: [[{match: '^(\.\./){2,}', message: "More than two parent directories referenced"}]]
    }
  ]
});
