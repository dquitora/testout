var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;

$(document).on('ready', onReady);
$(document).ajaxStart(function () {
    $('#preloader').show();
});

$(document).ajaxStop(function () {
    $('#preloader').hide();
});

var urlResults;
var IdMyPet;
var petId;
var IdCustomer;
var petIdEdit;
var transId;
var IdUser = (localStorage.getItem("IdUser"));


function onReady() {
     //alert(IdUser);
    $('#txtName').focus(function () {
        this.blur();
    }); 
    
    var loading_time = 2500;
    $(".modalPetNet").show();
    setTimeout(function () {
        $(".modalPetNet").hide();
    }, loading_time);
    $("#errorRemember").hide();
    $('#btnRegister').on('click', customerEdit);    
    loadCustomer();    
    
    //********* EVENT OPEN MODAL ************//
    $('#myModal').on('shown.bs.modal', function (e) {
        $('#preloader').show();
        // loadmyPetsMenu();
        $("#btnRegister").empty();
        var loading_time = 1000;
        $(".modalPetNet").show();
        setTimeout(function () {
            $(".modalPetNet").hide();
        }, loading_time);
        petId = $(e.relatedTarget).data('pet-id');
        petIdEdit = petId;
        IdCustomer = petId;
        window.localStorage.setItem('petId', petId);
        transId = $(e.relatedTarget).data('trans-id'); 
        
        $('#myModalLabel').empty();
        
        if (transId == 'E') {
            getCustomerInfo(petId);
            $("#myImage").show();
            $('#txtSessionPetId').val(petId);
            $("#btnRegister").append('Edit!');
            // alert(petId);
        }
        else {
            $('#myModalLabel').append('ADD');
            $("#myImage").show();
            // clearObj();
            $('#txtSessionPetId').val('');
            // alert(petId);
            // alert(transId);
            $("#btnRegister").append('Register!');
        }
        $('#preloader').hide();
        
    });
    //********* EVENT HIDE MODAL ************//
    $('#myModal').on('hidden.bs.modal', function (e) {
        // alert(petId);
        clearObj();
        //window.location = 'pet_mypets.html';
    });    
}

function customerEdit() {
    var customer_Name = $("#customer_Name").val();
    var customer_Address = $("#customer_Address").val();
    var customer_TotalAmmount = $("#customer_TotalAmmount").val();
    var customer_Account = $("#customer_Account").val();
    var customer_Bank = $("#customer_Bank").val();
    var customer_Phone = $("#customer_Phone").val();
    var customer_Email = $("#customer_Email").val();
    var customer_MonthlyPayment = $("#customer_MonthlyPayment").val();
    var customer_PaymentDay = $("#customer_PaymentDay").val();    
   if (customer_Name == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#customer_Name").focus();
        return false;
    }
    else  if (customer_Address == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#customer_Address").focus();
        return false;
    }    
    else if (customer_TotalAmmount == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#customer_TotalAmmount").focus();
        return false;    
    }
     else if (customer_Account == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#customer_Account").focus();
        return false;    
    }
     else if (customer_Bank == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#customer_Bank").focus();
        return false;    
    }
     else if (customer_Phone == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#customer_Phone").focus();
        return false;    
    }
     else if (customer_Email == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#customer_Email").focus();
        return false;    
    }
     else if (customer_MonthlyPayment == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#customer_MonthlyPayment").focus();
        return false;    
    }
     else if (customer_PaymentDay == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#customer_PaymentDay").focus();
        return false;    
    }
    else {       
        var str = 'string';
        var int = 0;
        var dt = '2017-03-27T18:40:18.975Z';
        if (transId == 'A') {
            //ADD
            $.ajax({
                type: "POST",
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                url: urlServices,
                data: '{' +
                '"customer_Name":"' + customer_Name + '", ' +
                '"customer_Address":"' + customer_Address + '", ' +
                '"customer_TotalAmmount": ' + customer_TotalAmmount + ',' +
                '"customer_Account":"' + customer_Account + '", ' +
                '"customer_Bank": "' + customer_Bank + '",' +
                '"customer_Phone": "' + customer_Phone + '",' +
                '"customer_Email": "' + customer_Email + '",' +
                '"customer_MonthlyPayment": ' + customer_MonthlyPayment + ',' +
                '"customer_PaymentDay": ' + customer_PaymentDay + '' +
                '}',                
                success: function (datos) {
                    $("#myModal").modal("hide");
                    bootbox.alert('Success!');
                    //myWindow = window.location = 'pet_mypets.html';
                },
                error: function (msg, url, line) {
                    alert(msg);
                }
            });
        }
        else {
        	var IdCustomer = (localStorage.getItem("customerId")); 
            $.ajax({
                type: "PUT",
                crossDomain: true,                
                contentType: "application/json; charset=utf-8",
                url: urlServices + IdCustomer,
                data: '{' +
                '"customer_Id":' + IdCustomer + ', ' +
                '"customer_Name":"' + customer_Name + '", ' +
                '"customer_Address":"' + customer_Address + '", ' +
                '"customer_TotalAmmount": ' + customer_TotalAmmount + ',' +
                '"customer_Account":"' + customer_Account + '", ' +
                '"customer_Bank": "' + customer_Bank + '",' +
                '"customer_Phone": "' + customer_Phone + '",' +
                '"customer_Email": "' + customer_Email + '",' +
                '"customer_MonthlyPayment": ' + customer_MonthlyPayment + ',' +
                '"customer_PaymentDay": ' + customer_PaymentDay + '' +
                '}',
                success: function (datos) {                    
                    $("#myModal").modal("hide");
                    bootbox.alert('Registro Exitoso');
                    //window.location = 'Customer.html';
                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                }
            });           
        }
    }
}

function loadCustomer() {
    var pag = 1;
    var pair;
    $("#cont").val(1);
    $("#content_mypets").empty();
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices,         
        success: function (datos) {
            if (datos.CodigoResultado == '0003') {
                $("#content_mypets").append('<div style="text-align:center; color: #000000;"><a href="#" data-toggle="modal" data-target="#myModal" data-trans-id="A" style="text-align:center; color: #007a2c;">Registre mascotas para iniciar mundo en PetNet!</a></div></br>');
                return false;
            }
            $.each(datos, function (i, customer) {                
                $("#content_mypets").append('<div class="col-md-12 col-sm-12 col-xs-12 borderBottom">\
                                              <div class="col-md-4 col-sm-4 col-xs-4" style="padding: 0!important;"> \
                                              </div>\
				 							  <div class="col-md-8 col-sm-8 col-xs-8 panelDesc"> \
				 							  	<p class="petName"><strong style="color: #008c31;">' + customer.customer_Name + '</strong></p> \
                                                <p class="petCaption"><em><br>' + customer.customer_Address + '</em></p> \
                                                <p class="petCaption"><em><br>' + customer.customer_TotalAmmount + '</em></p> \
                                                <p class="petCaption"><em><br>' + customer.customer_PaymentDay + ' Payment Day</p> \
                                                <br><a href="#" style="margin-bottom: 15px;" data-toggle="modal" data-target="#myModal" data-pet-id="' + customer.customer_Id + '" data-trans-id="E"><i class="fa2 fa-edit"></i></a>\
                                              </div>\
                                              </div>');
            });
        },
        error: function (msg, url, line) {
            alert('Error');
            //window.location = 'index.html';
        }
    });
}

function getCustomerInfo(IdCustomer) {
	window.localStorage.setItem('customerId', IdCustomer);
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices + IdCustomer,
        data: + IdCustomer,
        success: function (datos) {
            //console.log(datos[0]);            
            $('#myModalLabel').append('Edit - ' + datos.customer_Name);
            $('#customer_Name').val(datos.customer_Name);           
            $('#customer_Address').val(datos.customer_Address);
            $('#customer_TotalAmmount').val(datos.customer_TotalAmmount);
            $('#customer_Account').val(datos.customer_Account);
            $('#customer_Bank').val(datos.customer_Bank);
            $('#customer_Phone').val(datos.customer_Phone);
            $('#customer_Email').val(datos.customer_Email);
            $('#customer_MonthlyPayment').val(datos.customer_MonthlyPayment);
            $('#customer_PaymentDay').val(datos.customer_PaymentDay); 
        },
        error: function (msg, url, line) {
            alert(msg);
        }
    });
}


function clearObj() {
    $("#customer_Name").val('');
    $("#customer_Address").val('');
    $("#customer_PaymentDay").val('');
    $("#customer_Account").val('');
    $("#customer_Bank").val('');
    $("#customer_Phone").val('');
    $("#customer_Email").val('');
    $("#customer_MonthlyPayment").val('');    
    $("#errorRemember").hide();    
}

function goBack() {
    window.history.back()
}

