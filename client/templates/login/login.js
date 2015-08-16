Template.login.events({
  'focus #phone': function() {
    if ($("#phone").val() == "") {
      $("#phone").val("+");
    }
  },
  'click #phone': function() {
    if ($("#phone").prop('disabled')) { // Only if we sent a verification code already
      $("#phone").prop('disabled', false);
      $("#code").val();
      $("#name").show();
      $(".phone-container").addClass("entering-phone").removeClass("phone-entered");
    }
  },
  'submit .form-phone': function() {
    phone = $("#phone").val();

    Meteor.sendVerificationCode(phone, function(accountExists) {
      if (accountExists instanceof Meteor.Error) {
        $(".form-phone .message").show().text("Error sending verification text message");
      } else { 
        // If successful show the next step
        $(".form-phone .message").hide().text("");
        $("#phone").prop('disabled', true);
        $(".phone-container").addClass('phone-entered').removeClass('entering-phone');
        if (accountExists) {
          // Hide the name because there already is an account
          $("#name").hide();
          $("#code").focus();
        } else {
          $("#name").focus();
        }
      }
    });

    return false;
  },
  'submit .form-name': function() {
    Meteor.loginWithSms($("#phone").val(),
                        $("#code").val(),
                        $("#name").val(),
                        function(user) {
      Router.go('/');
    });

    return false;
  },
});

Template.login.rendered = function() {
  $('.ui.form-phone')
  .form({
    fields: {
      phone: {
        identifier  : 'phone',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your phone number'
          },
          {
            type   : 'regExp[/^\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$/]',
            prompt : 'Please enter a valid phone number in international format (+15554444)'
          }
        ]
      }
    }
  });
  $('.ui.form-name')
  .form({
    fields: {
      name: {
        identifier  : 'name',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your name'
          },
          {
            type   : 'length[3]',
            prompt : 'Your name must be at least 3 characters'
          }
        ]
      },
      code: {
        identifier  : 'code',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your verification code'
          },
        ]
      },
    }
  })
  ;
}
