var util = {
  getRegex: function(str) {
    return new RegExp(str);
  },
  getTestItem: function(item) {
    var testItem = {};
    if (typeof item === 'string') {
      testItem = {
        regex: util.getRegex(item),
        message: 'Path should not match ' + item
      };
    } else {
      if (item.match) {
        testItem.regex = util.getRegex(item.match);
      }
      testItem.contains = item.contains;

      // TODO: Refactor this
      if (item.message) {
        testItem.message = item.message;
      } else {
        if (testItem.regex && testItem.contains) {
          testItem.message = 'Path contains "' + testItem.contains + '" and/or matches ' + testItem.regex.toString();
        } else if (testItem.regex) {
          testItem.message = 'Path matches ' + testItem.regex.toString();
        } else if (testItem.contains) {
          testItem.message = 'Path contains ' + testItem.contains;
        }
      }

    }

    testItem.match = function(path) {
      if (this.regex && !path.match(this.regex)) return false;
      if (this.contains && path.indexOf(this.contains) === -1) return false;
      return true;
    };
    
    return testItem;
  },
  getImportDepth: function(path) {
    var regex = /^((\.\.\/)+).*$/;
    if (path.match) {
      var matches = path.match(regex);
      if (matches) {
        return matches[1].length / 3;
      }
    }
    return 0;
  },

  getOptionArray: function(option) {
    var matchItems = [];
    if (typeof option === 'string') {
      matchItems = [option];
    } else if (Array.isArray(option)) {
      matchItems = option;
    }
    return matchItems;
  },

  schemaMatchItems: [
    {
      anyOf: [
        {
          type: 'array',
          items: {
            anyOf: [
              { type: 'string' },
              {
                type: 'object',
                properties: {
                  match: { type: 'string' },
                  contains: { type: 'string' }
                }
              }
            ]
          }
        },
        { type: 'string' }
      ]
    }
  ]
};
module.exports = util;
