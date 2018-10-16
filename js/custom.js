/* COLLAPSE NAVIGATION ON MOBILE AFTER CLICKING ON LINK - ADDED ON V1.5*/

if (matchMedia('(max-width: 991px)').matches) {
    $('.main-navigation a').on('click', function() {
        $(".navbar-toggle").click();
    });
}


/*===================
FORM FIELDS VALIDATION
===================== */

$('input, textarea').blur(function() {
    var currentField = $(this);
    validateField(currentField);
});

function validateField(field) {

    var isValid;

    var validationMessage = '';

    if ($(field).attr('id') == 'email') {

        validationMessage = '.notValidEmail';

        if ($(field).val().length > 0) {

            if (isValidEmail($(field).val())) {
                console.log('Email is valid');
                isValid = defineFieldAsValid($(field), validationMessage);
            } else {
                console.log('Email is not valid');
                isValid = defineFieldAsNotValid($(field), validationMessage);
            }
        }
    }


    if ($(field).attr('id') == 'name') {

        validationMessage = '.notValidName';

        if ($(field).val().length < 1) {
            console.log('Name is not valid');
            isValid = defineFieldAsNotValid($(field), validationMessage);
        } else {
            console.log('Name is valid');
            isValid = defineFieldAsValid($(field), validationMessage);
        }
    }


    if ($(field).attr('id') == 'message') {

        validationMessage = '.notValidMessage';

        if ($(field).val().length < 1) {

            console.log('message is not valid');
            isValid = defineFieldAsNotValid($(field), validationMessage);
        } else {

            console.log('message is valid');
            isValid = defineFieldAsValid($(field), validationMessage);
        }
    }

    return isValid;
};

function defineFieldAsValid(field, validationMessage) {
    $(field).removeClass('notValidField');
    $(validationMessage).hide();

    return true;
}

function defineFieldAsNotValid(field, validationMessage) {
    $(validationMessage).show();
    $(field).addClass('notValidField');

    return false;
}

function isValidEmail(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

function validateFields(fieldsArray) {

    var isValid = true;

    $.each(fieldsArray, function(index, value) {
        if (!validateField(value)) {
            isValid = false;
        }
    });
    return isValid;
}


/* =================================
===  CONTACT FORM          ====
=================================== */
$("#contact").submit(function(e) {
    e.preventDefault();
    var name = $("#name");
    var email = $("#email");
    var subject = $("#subject");
    var message = $("#message");
    var dataString = 'name=' + name.val() + '&email=' + email.val() + '&subject=' + subject.val() + '&message=' + message.val();

    if (validateFields([email, message, name])) {
        $.ajax({
            type: "POST",
            url: "sendmail.php",
            data: dataString,
            success: function() {
                $('.success').fadeIn(1000);
                $('.error').fadeOut(500);
            },
            error: function(jqXHR, exception) {
                console.log(jqXHR.responseText);

                $('.sendingFail').show();
                $('.error').fadeIn(1000);
                $('.success').fadeOut(500);
            }
        });
    } else {
        console.log('not sent');

        $('.error').fadeIn(1000);
        $('.success').fadeOut(500);
    }

    return false;
});

/* =================================
===  Bootstrap Internet Explorer 10 in Windows 8 and Windows Phone 8 FIX
=================================== */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
        )
    )
    document.querySelector('head').appendChild(msViewportStyle)
}