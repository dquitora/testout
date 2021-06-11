var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;

jQuery(document).on('ready', onReady);
var dataCities = [];
function onReady() {
    jQuery('#btnRegister').on('click', register);
    jQuery("#errorRemember").hide();
    //********* LOAD CITIES************//
    var IdCountry = "1";
    var optionsCities = '<option value="-1">SELECCIONAR MASCOTA</option>';
    jQuery.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices2 + 'GetAllPetLocationsById',
        data: 'token=' + token + '&IdCountry=' + IdCountry,
        success: function (datos) {
            jQuery.each(datos, function (i, Cities) {
                optionsCities += '<option id="' + Cities.IdCity + '" value="' + Cities.Name + '">' + Cities.Name + '</option>';
                dataCities[i] = Cities.Name;
            });
            jQuery("#Cities").html(optionsCities);
            jQuery('input.typeahead').typeahead({
                name: 'accounts',
                local: dataCities
            });
        },
        error: function (msg, url, line) {
            alert('Ups! Parece que nuestros servidores salieron un momento al parque. Reintenta en un momento.');
        }
    });
    $("#txtnames").focus();
    DataMining(2, 1);
}

function isValidEmail(pEmail) {
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!filter.test(pEmail)) {
        return false;
    }
    return true;
}

function register() {
    var names = jQuery("#txtnames").val();
    var lastnames = jQuery("#txtlastNames").val();
    var email = jQuery("#txtemail").val();
    var txtpassword = jQuery("#txtpassword").val();
    var txtpasswordConfirm = jQuery("#txtpasswordConfirm").val();
    var txtcity = jQuery("#entity").val();
    var selGenre = jQuery("#selGenre option:selected").val();
    var EntitySender = $('#entity').val();
    var IdEntitySender = $("#Cities option[value='" + EntitySender + "']").attr('id');
    if (names == '') {
        bootbox.alert({
            message: "Nombres es campo obligatorio.",
            callback: function () {
                setTimeout(function () {
                    $('#txtnames').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (lastnames == '') {
        bootbox.alert({
            message: "Apellidos es campo obligatorio.",
            callback: function () {
                setTimeout(function () {
                    $('#txtlastNames').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (email == '') {
        bootbox.alert({
            message: "Email es campo obligatorio.",
            callback: function () {
                setTimeout(function () {
                    $('#txtemail').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (txtpassword == '') {
        bootbox.alert({
            message: "Contraseña es campo obligatorio.",
            callback: function () {
                setTimeout(function () {
                    $('#txtpassword').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (txtpasswordConfirm == '') {
        bootbox.alert({
            message: "Confirmar contraseña es campo obligatorio.",
            callback: function () {
                setTimeout(function () {
                    $('#txtpasswordConfirm').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (txtpassword != txtpasswordConfirm) {
        bootbox.alert({
            message: "Las contraseñas deben ser idénticas.",
            callback: function () {
                setTimeout(function () {
                    $('#txtpasswordConfirm').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (txtcity == '') {
        bootbox.alert({
            message: "Ciudad es campo obligatorio",
            callback: function () {
                setTimeout(function () {
                    $('#entity').focus();
                }, 150);
            }
        });
        return false;
    }
    else {
        //VALIDATE Email
        var validEmail = isValidEmail(email);
        if (validEmail != true) {
            bootbox.alert({
                message: "Formato email no valido",
                callback: function () {
                    setTimeout(function () {
                        $('#txtemail').focus();
                    }, 150);
                }
            });
            return false;
        }
        $(".modalPetNet").show();
        // alert(IdEntitySender);
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: urlServices2 + 'GetAllByEmail',
            data: 'token=' + token + '&Email=' + email,
            success: function (datos) {
                if (datos.CodigoResultado != '0003') {
                    bootbox.alert({
                        message: "Email ya se encuentra registrado!",
                        callback: function () {
                            setTimeout(function () {
                                $('#txtemail').focus();
                                $(".modalPetNet").hide();
                            }, 150);
                        }
                    });
                    return false;
                }
                else {
                    var txtMsg = 'Usuario: ' + email + '  registrado correctamente en PetNet, Tu registro fue exitoso! Bienvenido a PetNet, esperamos que tú y tus mascotas pasen mucho tiempo con nosotros.';
                    var str = 'string';
                    var strDate = '2017-05-11T22:01:25.489Z';
                    $.ajax({
                        type: "GET",
                        crossDomain: true,
                        url: urlServices + 'Email',
                        data: 'token=' + token + '&Msg=' + txtMsg + '&Email=' + email,
                        success: function (datosUser) {
                            $.ajax({
                                type: "POST",
                                crossDomain: true,
                                contentType: "application/json; charset=utf-8",
                                url: urlServices + 'Users',
                                data: '{' +
                                '"token":"' + token + '", ' +
                                '"IdUser": 0,' +
                                '"IdRol": 0,' +
                                '"NumIdentification":"' + str + '", ' +
                                '"FullName":"' + str + '", ' +
                                '"Name": "' + names + '", ' +
                                '"LastName": "' + lastnames + '",' +
                                '"Email": "' + email + '",' +
                                '"Phone": "' + str + '",' +
                                '"City": '+IdEntitySender+',' +
                                '"Password": "' + txtpasswordConfirm + '",' +
                                '"Gender": "' + selGenre + '",' +
                                '"DateCreate": "' + strDate + '",' +
                                '"DateModify": "' + strDate + '",' +
                                '"Active": true' +
                                '}',
                                // data: 'Name=' + names + '&LastName=' + lastnames + '&Email=' + email + '&City=' + IdEntitySender + '&Gender=' + selGenre + '&Password=' + $("#txtpasswordConfirm").val(),
                                success: function (datos) {
                                    window.localStorage.setItem('IdUser', datos);
                                    bootbox.alert({
                                        message: "Registro exitoso",
                                        callback: function () {
                                            setTimeout(function () {
                                                $(".modalPetNet").hide();
                                                myWindow = window.open('index2.html', '_parent');
                                            }, 150);
                                        }
                                    });
                                },
                                error: function (msg, url, line) {
                                    $(".modalPetNet").hide();
                                    alert(line);
                                }
                            });
                        },
                        error: function (msg, url, line) {
                            $(".modalPetNet").hide();
                            alert('Ups! Parece que nuestros servidores salieron un momento al parque. Reintenta en un momento.');
                        }
                    });
                }
            },
            error: function (msg, url, line) {
                $(".modalPetNet").hide();
                alert(line);
            }
        });
    }
}

function goBack() {
    window.history.back();
}