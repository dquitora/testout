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
    var payment_OrderId = $("#payment_OrderId").val();
    var payment_Date = $("#payment_Date").val();
    var payment_Ammount = $("#payment_Ammount").val();
   if (payment_OrderId == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#payment_OrderId").focus();
        return false;
    }
    else  if (payment_Date == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#payment_Date").focus();
        return false;
    }    
    else if (payment_Ammount == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#payment_Ammount").focus();
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
                url: urlServices2 + 'Payment',
                data: '{' +
                '"payment_OrderId":"' + payment_OrderId + '", ' +
                '"payment_Date":"' + payment_Date + '", ' +
                '"payment_Ammount": ' + payment_Ammount + '' +
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
                url: urlServices2 + 'Payment' + IdCustomer,
                data: '{' +
                '"payment_Id":' + IdCustomer + ', ' +
                '"payment_OrderId":"' + payment_OrderId + '", ' +
                '"payment_Date":"' + payment_Date + '", ' +
                '"payment_Ammount": ' + payment_Ammount + '' +
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
        url: urlServices2 + 'Payment',         
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
				 							  	<p class="petName"><strong style="color: #008c31;">' + customer.payment_OrderId + '</strong></p> \
                                                <p class="petCaption"><em><br>' + customer.payment_Date + '</em></p> \
                                                <p class="petCaption"><em><br>' + customer.payment_Ammount + ' Payment Day</p> \
                                                <br><a href="#" style="margin-bottom: 15px;" data-toggle="modal" data-target="#myModal" data-pet-id="' + customer.payment_Id + '" data-trans-id="E"><i class="fa2 fa-edit"></i></a>\
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
        url: urlServices2 + 'Payment/' + IdCustomer,
        data: + IdCustomer,
        success: function (datos) {
            //console.log(datos[0]);            
            $('#myModalLabel').append('Edit - ' + datos.payment_Id);
            $('#payment_OrderId').val(datos.payment_OrderId);           
            $('#payment_Date').val(datos.payment_Date);
            $('#payment_Ammount').val(datos.payment_Ammount); 
        },
        error: function (msg, url, line) {
            alert(msg);
        }
    });
}


function clearObj() {
    $("#payment_OrderId").val('');
    $("#payment_Date").val('');
    $("#payment_Date").val('');
    $("#payment_Ammount").val('');   
    $("#errorRemember").hide();    
}

function goBack() {
    window.history.back()
}

