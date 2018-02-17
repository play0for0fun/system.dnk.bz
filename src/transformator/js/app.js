/**
 * appName - http://chidi-frontend.esy.es/
 * @version v0.1.0
 * @author bev-olga@yandex.ru
 */
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

    // Отправка почты
    $('.js--form-submit').on('click', function () {
        console.log('click');
        var form = $(this).closest('form');
        var url = form.attr('action');
        var method = form.attr('method');
        var btn = $(this);
        var text = btn.text();
        btn.text('Отправляем');

        form.find('.required').each(function () {
            CheckInput($(this));
        });

        console.log(form.find('label.error').length)

        if (!(form.find('label.error').length)) {
            console.log('send')
            $.ajax({
                type: method,
                url: url,
                data: form.serialize(),
                success: function (data) {
                    form.find('.js--form-sended').trigger('click');
                    console.log('succes')
                },
                error: function (data) {
                    text = btn.text('Ошибка при отправке');

                    setTimeout(function () {
                        text = btn.text(text);
                    }, 2000)
                }
            });
        }

        return false;
    });

    $('.js--shos-more').on('click', function () {
        $(this).fadeOut(0).prev('.hidden-content').fadeIn(0);
        return false;
    })
});