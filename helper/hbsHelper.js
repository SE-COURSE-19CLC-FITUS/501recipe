const Handlebars = require('handlebars');

module.exports = function () {
  Handlebars.registerHelper('index', function (index) {
    return index + 1;
  });

  Handlebars.registerHelper('isCurrent', function (index) {
    return index == 0;
  });

  Handlebars.registerHelper(
    'eq',
    function (operand1, operand2, trueClause, falseClause) {
      return operand1 === operand2 ? trueClause : falseClause;
    }
  );
};
