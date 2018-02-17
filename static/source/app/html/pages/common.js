var lots_of_stuff_already_done = false;

$(document).ready(function () {
    var BODY = $('body');
    var WINDOW = $(window);
    WINDOW.trigger('scroll');

    setTimeout(function () {
        if (!BODY.hasClass('loaded')) {
            BODY.addClass('loaded');
        }
    }, 1000);

    //var os = 0;
    //if (navigator.userAgent.indexOf ('Windows') != -1) os = 1;
    //if (navigator.userAgent.indexOf ('Linux')!= -1) os = 2;
    //if (navigator.userAgent.indexOf ('Mac')!= -1) os = 3;
    //if (navigator.userAgent.indexOf ('FreeBSD')!= -1) os = 4;
    //// alert(navigator.userAgent);
    //switch (os) {
    //   case 2:
    //      BODY.addClass('linux');
    //      break;
    //   case 3:
    //      BODY.addClass('mac');
    //      break;
    //   case 4:
    //      BODY.addClass('free');
    //      break;
    //   default:
    //      break;
    //}

    WINDOW.scroll(function () {
        if (WINDOW.scrollTop() > 0) {
            $('.header').addClass('fixed');
        } else {
            $('.header').removeClass('fixed');
        }
    });

    $(document).on('click', '.js--page-scroll', function () {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + 50
        }, {
            duration: 500
        });
        return false;
    });

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $('.inp-phone').mask('+7 (999) 999-99-99', {
        completed: function () {
            $(this).closest('label').removeClass('error').addClass('success').find('.error').text('');
        }
    });

    // убираем подсветку при фокусе
    $('.inp').focus(function () {
        var inp = $(this);
        inp.closest('label').removeClass('error').find('.error').text('');
        ;
    });

    // проверка на корректно заполненное поле
    $('.inp.required').on('blur', function () {
        var inp = $(this);

        CheckInput(inp);


    });

    function CheckInput(input) {
        if (input.val() == '') {
            input.closest('label').removeClass('success').addClass('error').find('.error').text('Поле незаполнено');
        }
        else {
            if (input.hasClass('inp-mail')) {
                if (validateEmail(inp.val()) == false) {
                    input.closest('label').removeClass('success').addClass('error').find('.error').text('Неверный формат');
                }
                else {
                    input.closest('label').removeClass('error').addClass('success').find('.error').text('');
                }
            }
            else {
                if (input.hasClass('inp-phone')) {
                    if ((input.val().toString().indexOf('_') + 1)) {
                        input.closest('label').removeClass('success').addClass('error').find('.error').text('Неверный формат');
                    }
                }
                else {
                    input.closest('label').removeClass('error').addClass('success').find('.error').text('');
                }
            }
        }
    }

    $('form').submit(function(e){

        var $form = $(this);

        if (lots_of_stuff_already_done) {
            lots_of_stuff_already_done = false; // reset flag
            return; // let the event bubble away
        }

        e.preventDefault();

        // do lots of stuff

        $form.find('.required').each(function () {
            CheckInput($(this));
        });

        if (!($form.find('label.error').length)) {

        
            var data=$(this).serialize();
            $.ajax({type: $form.attr('method'), url: 'js/ajax/send.php', data: $form.serialize(),
                complete : function(){

                    lots_of_stuff_already_done = true; // set flag
                    $(this).submit();

                }
            }); 
          
        };
    });

    // Отправка почты
    // $('.js--form-submit').on('click', function () {
    //     var form = $(this).closest('form');
    //     var url = form.attr('action');
    //     var method = form.attr('method');
    //     var btn = $(this);
    //     var text = btn.text();
    //     btn.text('Отправляем');

    //     form.find('.required').each(function () {
    //         CheckInput($(this));
    //     });

    //     if (!(form.find('label.error').length)) {

    //         form.trigger('submit');
    //         //$.ajax({
    //         //    type: method,
    //         //    url: url,
    //         //    data: form.serialize(),
    //         //    success: function (data) {
    //         //        console.log('succes')
    //         //    },
    //         //    error: function (data) {
    //         //        text = btn.text('Ошибка при отправке');
    //         //
    //         //        setTimeout(function () {
    //         //            text = btn.text(text);
    //         //        }, 2000)
    //         //    }
    //         //});
    //     }

    //     return false;
    // });

    $('.js--shos-more').on('click', function () {
        $(this).fadeOut(0).prev('.hidden-content').fadeIn(0);
        return false;
    })
});