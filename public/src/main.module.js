(function () {
  "use strict";

  // register a new angular module
  angular.module("main", []) // no dependencies required for now
    // register a constant for the backend service API path
    .constant("ApiPath", "http://saawg-web-services.herokuapp.com/saawg");
})();
