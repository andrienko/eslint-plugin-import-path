
module.exports.rules = {
  'parent-depth': require('./rules/parent-depth'),
  'forbidden': require('./rules/forbidden')
};

module.exports.configs = {
  recommended: {
    rules: {
      'import-path/parent-depth': [3],
      'import-path/forbidden': []
    },
  },
};
