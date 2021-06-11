var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;

$(document).on('ready', onReady);
// $(document).ajaxStart(function() {
	// $(".modalPetNet").show();    
// });
// $(document).ajaxStop(function() {
	// $(".modalPetNet").hide();  
// });

$(document).bind('keypress', function(e){
  if(e.which === 13) { // return	
     $('#btnLogin').trigger('click');
  }
});

function onReady() {
	var loading_time = 500;
	$(".modalPetNet").show();
	setTimeout(function() {
		$(".modalPetNet").hide();
	},loading_time);
	$('#btnLogin').on('click', login);
	$('#btnForgot').on('click', forgot);
	$('#btnRegister').on('click', register);
    $("#errorLogin").hide();
	window.localStorage.clear();
	window.localStorage.setItem('active', 'false');
    DataMining(1, 1);
}

function forgot()
{
	var loading_time = 500;
	$(".modalPetNet").show();	
	setTimeout(function() {
				$(".modalPetNet").hide(); 
			},loading_time);	
	window.location.href = "remember_pass.html"		
}

function register()
{
	var loading_time = 500;
	$(".modalPetNet").show();	
	setTimeout(function() {
				$(".modalPetNet").hide(); 
			},loading_time);	
	window.location.href = "sign_in.html"		
}

function isValidEmail(pEmail) {
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (!filter.test(pEmail)) {
        return false;
    }

    return true;
}

function login() {
	var loading_time = 500;
	var loading_time2 = 3000;
	$(".modalPetNet").show();			
    var user = $("#txtusername").val();
	//VALIDATE Email	
	var validEmail = isValidEmail(user);	
	if(validEmail != true)
	{
		// bootbox.alert("Formato email no valido");
		$("#errorLogin").show();
		$("#errorLogin").empty();					
		$("#errorLogin").append('<img src="images/misc/base/Iconos/32x32/FondoOscuro/21_32x32_PetWarning.png"> Formato email no valido</img>');
		setTimeout(function() {
						$(".modalPetNet").hide(); 
					},loading_time);	
		return false;
	}
    var password = $("#txtpassword").val();
    if (user == '' || password == '') {		
        $("#errorLogin").show();
		$("#errorLogin").empty();					
		$("#errorLogin").append('<img src="images/misc/base/Iconos/32x32/FondoOscuro/21_32x32_PetWarning.png"> Usuario y clave son campos obligatorios</img>');
		setTimeout(function() {
				$(".modalPetNet").hide(); 
			},loading_time);	
        return false;
    }
    else { 		
		$.ajax({
            type: "GET",
            crossDomain: true,
            url: urlServices2 + 'ValidCredentials',
            data: 'token=' + token + '&Email=' + $('#txtusername').val() + '&Password=' + $("#txtpassword").val(),
            success: function (datos) {					
                if (datos.CodigoResultado == '0004') {
					setTimeout(function() {
						$(".modalPetNet").hide(); 
					},loading_time);	
                    $("#errorLogin").show();
					$("#errorLogin").empty();					
					$("#errorLogin").append('<img src="images/misc/base/Iconos/32x32/FondoOscuro/21_32x32_PetWarning.png"> Usuario o clave invalida!</img>');               
                } else {
					setTimeout(function() {
						$(".modalPetNet").hide(); 
					},loading_time2);	
					window.localStorage.setItem('active', 'true');                    
                    window.localStorage.setItem('IdUser', datos);
					localStorage.removeItem("IdMyPet");
					// $(".modalPetNet").hide();
                    window.location.href = "index2.html";
                }
            },
                error: function (msg, url, line) {
                    alert('Ups! Parece que nuestros servidores salieron un momento al parque. Reintenta en un momento.');
                    setTimeout(function() {
                        $(".modalPetNet").hide();
                    },loading_time2);
                }
        });
    }
}