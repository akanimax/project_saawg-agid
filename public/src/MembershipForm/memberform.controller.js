(function() {
  "use strict"; // to make sure nothing leaks to the console

  angular.module("main")
    // register the form controller here
    .controller("memberformController", memberformController);

  memberformController.$inject = ["ApiPath", "$http"];
  function memberformController(ApiPath, $http) {
    // $scope is required to specifically access the form

    var mC = this; // rename the this variable to the controller as
    // syntax alternative

    mC.member = {
      university: "",
      employment_status: "Not employed",
      employer: "",
      role: "",
      field_of_interests : []
    }; // initialize to empty object with empty array for field of interests

    mC.message = ""; // the message for displaying the status of the form

    mC.toggleSelection = function(interest_name) {
      var arr_presence_index = mC.member.field_of_interests.indexOf(interest_name);
      if(arr_presence_index == -1) {
        // value is not present already, so add it
        mC.member.field_of_interests.push(interest_name);
      } else {
        // value is already in the array, so remove it
        mC.member.field_of_interests.splice(arr_presence_index, 1);
      }

      // console.log(mC.member.field_of_interests);// log the current member object
    };

    mC.addMember = function () {

      if(mC.member.other != undefined) {
        var others = mC.member.other.split(",");
        mC.member.field_of_interests = mC.member.field_of_interests.concat(others);
        // remove the others property
        delete mC.member.other;
      }

      // if employer is not an empty String, set employment_status to employed
      if(mC.member.employer.length != 0) {
        mC.member.employment_status = "Employed";
      }

      // console.log(mC.member);

      // check getting all the members:
      $http({
        method: "POST",
        url: ApiPath + "/add-member",
        data: mC.member
      }).then(function(response) {
          // return the form to normal state
          clearScreen();
          // console.log(response.data);
          mC.message = "Your Information has been submitted and saved. " +
            "Please Note your Member id: " + response.data;
        },
        function(response) {
          // console.log(response);
          mC.message = "Your information couldn't be submitted! Please Try after some time again";
        }
      )

    };

    function clearScreen() {
      // console.log(mC.memberForm);
      // set the form untouched and pristine
      // console.log(mC.memberForm);
      mC.memberForm.$setUntouched();
      mC.memberForm.$setPristine();

      // clear the checkboxes also
      clearCheckBoxes();

      mC.member = {}; // this object stores all the form data
      // so, simply assign it a new empty object

    }

    function clearCheckBoxes() {
      var inputs = document.getElementsByTagName("input"); //or document.forms[0].elements;
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
          inputs[i].checked = false;
        }
      }
    }

  }

})();
