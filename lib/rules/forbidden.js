var util = require('../util');

var getOptions = function(options) {
  return util.getOptionArray(options[0]).map(util.getTestItem);
};

module.exports = {
  options: null,

  meta: {
    schema: util.schemaMatchItems
  },

  create: function(context) {
    var items = getOptions(context.options);

    var check = function(node) {
      if(!node || !node.source || !node.source.value){
        return;
      }
      var value = node.source.value;
      items.forEach(function(item) {
        if (item.match && item.match(value)) {
          context.report({
            node: node.source,
            message: item.message
          });
        }
      });
    };

    return {
      ImportDeclaration: check,
      ExportNamedDeclaration: check
    };
  }
};
