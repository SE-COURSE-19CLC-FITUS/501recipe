'use strict';

const Handlebars = require('hbs');

module.exports = function () {
  // Expression helper
  Handlebars.registerHelper('concat', function (...str) {
    return str.filter(item => typeof item === 'string').join('');
  });

  // Expression helper
  Handlebars.registerHelper('incAmount', function (num, amount) {
    if (!isFinite(num) && !isFinite(amount)) return;

    return +num + +amount;
  });

  // Expression helper
  Handlebars.registerHelper('decAmount', function (num, amount) {
    if (!isFinite(num) && !isFinite(amount)) return;

    return +num - +amount;
  });

  // Expression helper
  Handlebars.registerHelper('mulAmount', function (num, amount) {
    if (!isFinite(num) && !isFinite(amount)) return;

    return +num * +amount;
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

  // Block helper
  Handlebars.registerHelper('lte_b', function (context, options) {
    // Compare between 2 operands
    const { op1, op2 } = options.hash;
    if (op1 <= op2) {
      return options.fn(context);
    } else {
      return options.inverse(context);
    }
  });

  // Block helper
  Handlebars.registerHelper('gte_b', function (context, options) {
    // Compare between 2 operands
    const { op1, op2 } = options.hash;
    if (op1 >= op2) {
      return options.fn(context);
    } else {
      return options.inverse(context);
    }
  });

  // Expression helper
  Handlebars.registerHelper('default', function (val, defaultVal) {
    // Don't accept "nullish" values
    return val ?? defaultVal;
  });
  //index=0 of image
  Handlebars.registerHelper('getImageAtIndex', function (image, index) {
    if (image.length > 0) {
      return image[index];
    } else {
      return image;
    }
  });

  // Block helper (Advanced)
  Handlebars.registerHelper('loop_b', function (context, options) {
    // To use this helper, the context passed in MUST be an object (can use "this" keyword) or null

    // If we pass null to helper, we only have "index" property

    // options.hash is an Object, if no hash arguments options.hash = {}
    // Convert to number
    if (!isFinite(+options.hash.iter)) return;

    const iter = +options.hash.iter;
    let str = '';
    // Deep clone context, just it wisely!
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
