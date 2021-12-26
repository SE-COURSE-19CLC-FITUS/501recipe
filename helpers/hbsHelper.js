'use strict';

const Handlebars = require('hbs');

module.exports = function () {
  Handlebars.registerHelper('incAmount', function (num, amount) {
    if (!isFinite(num)) return;

    return +num + +amount;
  });

  Handlebars.registerHelper('eq', function (arg1, arg2, ifClause, elseClause) {
    return arg1 === arg2 ? ifClause : elseClause;
  });
};
