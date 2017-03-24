

// Carousel Auto-Cycle
  $(document).ready(function() {
    $('.carousel').carousel({
      interval: 6000
    });
  });

  $(document).ready(function () {
    $('#log').click(function () {
        console.log("clicked");
        $.post('/login', {
            username: $('#username').val(),
            password: $('#password').val()
        }, function (res) {
            //change if statements according to res
            console.log(res);
            data = JSON.parse(res);
            if(data.message == "success"){
                document.location = './profile/' + ('SELECT id FROM users WHERE id=?');
            }
            else {
                $("#errorlogin").text(data.message);
            }
        });
    });
});



$('#register').click(function(){
    $.post('/signup', {
        firstname: $('firstsignup').val(),
        lastname: $('lastsignup').val(),
        username: $('usernamesignup').val(),
        password: $('passwordsignup').val(),
        email: $('emailsignup').val(),
        birthday: $('birthdaysignup').val()
    }, function (res) {
        console.log(res);
        data = JSON.parse(res);
        if (data.message == "success") {
            document.location = './profile/' + data.id;
        }
    });
});