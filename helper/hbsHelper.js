const Handlebars = require('hbs');

module.exports = function () {
  Handlebars.registerHelper('index', function (index) {
    return index + 1;
  });

  Handlebars.registerHelper('isCurrent', function (index) {
    return index == 0;
  });

  Handlebars.registerHelper('loud', function (aString) {
    return aString.toUpperCase();
  });
};
