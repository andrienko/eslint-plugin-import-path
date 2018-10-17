var rule = require("../lib/rules/parent-depth");
var RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parser: "babel-eslint"
});

var ruleTester = new RuleTester();

ruleTester.run("parent-depth", rule, {
  valid: [
    "import whatever from '/whatever/test/map';",
    { code: "import whatever from '../../../whatever';", options: [-1] },
    { code: "import whatever from '../../../whatever';", options: [4] }
  ],
  invalid: [
    {
      code: "import whatever from '../../../../whatever';",
      options: [3],
      errors: [{}]
    },
    {
      code: "import whatever from '../whatever';",
      options: [0],
      errors: [{}]
    }
  ]
});
