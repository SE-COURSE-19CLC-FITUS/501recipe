'use strict';

const Handlebars = require('hbs');

module.exports = function () {
  Handlebars.registerHelper('incAmount', function (num, amount) {
    if (!isFinite(num)) return;

    return +num + +amount;
  });

  Handlebars.registerHelper('eq', function (op1, op2, ifClause, elseClause) {
    // Compare between 2 operands
    return op1 === op2 ? ifClause : elseClause;
  });

  Handlebars.registerHelper('default', function (val, defaultVal) {
    // Don't accept "nullish" values
    return val ?? defaultVal;
  });

  Handlebars.registerHelper('loop', function (context, options) {
    // options.hash is an Object, if no hash arguments options.hash = {}
    // Convert to number
    if (!isFinite(+options.hash.iter)) return;

    const iter = +options.hash.iter;
    let str = '';
    for (let i = 0; i < iter; i++) {
      str += options.fn(context);
    }
    return str;
  });
};
