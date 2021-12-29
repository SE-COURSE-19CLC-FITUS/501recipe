'use strict';

const Handlebars = require('hbs');

module.exports = function () {
  // Expression helper
  Handlebars.registerHelper('incAmount', function (num, amount) {
    if (!isFinite(num)) return;

    return +num + +amount;
  });

  // Expression helper
  Handlebars.registerHelper('eq', function (op1, op2, ifClause, elseClause) {
    // Compare between 2 operands
    return op1 === op2 ? ifClause : elseClause;
  });

  // Expression helper
  Handlebars.registerHelper('lte', function (op1, op2, ifClause, elseClause) {
    // Compare between 2 operands
    return op1 <= op2 ? ifClause : elseClause;
  });

  // Expression helper
  Handlebars.registerHelper('default', function (val, defaultVal) {
    // Don't accept "nullish" values
    return val ?? defaultVal;
  });

  // Block helper (Advanced)
  Handlebars.registerHelper('loop', function (context, options) {
    // To use this helper, the context passed in MUST be an object (can use "this" keyword) or null

    // If we pass null to helper, we only have "index" property

    // options.hash is an Object, if no hash arguments options.hash = {}
    // Convert to number
    if (!isFinite(+options.hash.iter)) return;

    const iter = +options.hash.iter;
    let str = '';
    // Deep clone context, just it with wisely!
    let newContext = JSON.parse(JSON.stringify(context));
    for (let i = 0; i < iter; i++) {
      // If we pass a primitive value to helper, spread operator will discard it.
      newContext = {
        ...context,
        index: i,
      };
      str += options.fn(newContext);
    }
    return str;
  });
};
