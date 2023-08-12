$("#singup-btn").click(function () {
  $("#singup-btn").toggleClass("switch-active");
  $("#singin-btn").toggleClass("switch-active");
  $(".singin-form").toggleClass("disable");
  $(".singup-form").toggleClass("disable");
  textAnimation();
});

$("#singin-btn").click(function () {
  $("#singin-btn").toggleClass("switch-active");
  $("#singup-btn").toggleClass("switch-active");
  $(".singin-form").toggleClass("disable");
  $(".singup-form").toggleClass("disable");
  textAnimation();
});
const textAnimation = () => {
  $(".account-title").fadeOut(function () {
    $(".account-title")
      .text(
        $(".account-title").text() == "Welcome Back"
          ? "Create Account"
          : "Welcome Back"
      )
      .fadeIn();
  });
  $(".account-paragraph").fadeOut(function () {
    $(".account-paragraph")
      .text(
        $(".account-paragraph").text() ==
          "Welcome Back , Please enter Your details"
          ? "Please enter Your details for Creating Account "
          : "Welcome Back , Please enter Your details"
      )
      .fadeIn();
  });
};

$("#view-tc-btn").click(function () {
  $(".singup-form").toggleClass("disable");
  $(".tc-area").toggleClass("disable").fadeIn();
  $(".switch-details").toggleClass("disable");
  $(".account-title").fadeOut(function () {
    $(".account-title")
      .text(
        $(".account-title").text() == "Create Account"
          ? "Terms & Conditions"
          : "Create Account"
      )
      .fadeIn();
  });
  $(".account-paragraph").fadeOut(function () {
    $(".account-paragraph")
      .text(
        $(".account-paragraph").text() ==
          "Please enter Your details for Creating Account "
          ? "Read and accept tearms and condtions"
          : "Please enter Your details for Creating Account "
      )
      .fadeIn();
  });
  createAccount();
});

$("#tc-btn").click(function () {
  if ($("#tc-checkbox").is(":checked")) {
    $(".tc-area").toggleClass("disable");
    $(".account-title").toggleClass("disable");
    $(".account-paragraph").toggleClass("disable");
    $(".otp-area").toggleClass("no-display");

    otpFunction();
  } else {
  }
});

const otpFunction = () => {
  // OTP AREA
  const otp_inputs = document.querySelectorAll(".otp-input"),
    otp_button = document.querySelector(".otp-btn");
  // iterate over all inputs
  otp_inputs.forEach((input, index1) => {
    input.addEventListener("keyup", (e) => {
      // This code gets the current input element and stores it in the currentInput variable
      // This code gets the next sibling element of the current input element and stores it in the nextInput variable
      // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
      const currentInput = input,
        nextInput = input.nextElementSibling,
        prevInput = input.previousElementSibling;

      // if the value has more than one character then clear it
      if (currentInput.value.length > 1) {
        currentInput.value = "";
        return;
      }
      // if the next input is disabled and the current value is not empty
      //  enable the next input and focus on it
      if (
        nextInput &&
        nextInput.hasAttribute("disabled") &&
        currentInput.value !== ""
      ) {
        nextInput.removeAttribute("disabled");
        nextInput.focus();
      }

      // if the backspace key is pressed
      if (e.key === "Backspace") {
        // iterate over all inputs again
        otp_inputs.forEach((input, index2) => {
          // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
          // and the previous element exists, set the disabled attribute on the input and focus on the previous element
          if (index1 <= index2 && prevInput) {
            input.setAttribute("disabled", true);
            input.value = "";
            prevInput.focus();
          }
        });
      }
      //if the fourth input( which index number is 3) is not empty and has not disable attribute then
      //add active class if not then remove the active class.
      if (!otp_inputs[3].disabled && otp_inputs[3].value !== "") {
        otp_button.classList.add("active");
        return;
      }
      otp_button.classList.remove("active");
    });
  });

  //focus the first input which index is 0 on window load
  window.addEventListener("load", () => otp_inputs[0].focus());
  // OTP AREA END
};

const createAccount = () => {
  $("#butsave").attr("disabled", "disabled");
  var firstName = $("#singup-f-name").val();
  var lastName = $("#singup-l-name").val();
  var phone = $("#singup-phone").val();
  var email = $("#singup-email").val();
  var password = $("#password").val();
  if (
    firstName != "" &&
    lastName != "" &&
    email != "" &&
    phone != "" &&
    password != ""
  ) {
    $.ajax({
      url: "http://qnaanswer.com/learning-plus/save.php",
      type: "POST",
      data: {
        type: 1,
        firstName: firstName,
        email: email,
        phone: phone,
        lastName: lastName,
        password: password
      },
      cache: false,
      success: function (dataResult) {
        // var dataResult = JSON.parse(dataResult);
        // if (dataResult.statusCode == 200) {
        //   $("#butsave").removeAttr("disabled");
        //   $("#register_form").find("input:text").val("");
        //   $("#success").show();
        //   $("#success").html("Registration successful !");
        // } else if (dataResult.statusCode == 201) {
        //   $("#error").show();
        //   $("#error").html("Email ID already exists !");
        // }
      }
    });
  } else {
    alert("Please fill all the field !");
  }
};