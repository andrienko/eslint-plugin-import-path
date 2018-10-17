var getImportDepth = require('../util.js').getImportDepth;

var getOptions = function(options) {
  var max = 3;

  var optionsMax = +options[0];
  if (isNaN(optionsMax)) {
    optionsMax = 0;
  }
  if (optionsMax >= 0) {
    max = optionsMax;
  }
  return { max: max };
};

module.exports = {
  meta: {
    schema: [
      {
        type: 'number'
      }
    ]
  },
  create: function(context) {
    var options = getOptions(context.options);

    var check = function(node) {
      if (options.max < 0){
        return;
      }
      var num = getImportDepth(node.source.value);
      if (num > options.max) {
        var message = 'Too many parent references (' + num + ' while maximum of ' + options.max + ' allowed)';
        if (options.max === 0) {
          message = 'Referencing parent directories is not allowed';
        }
        context.report({
          node: node.source,
          message: message
        });
      }
    };

    return {
      ImportDeclaration: check,
      ExportDeclaration: check
    };
  }
};
