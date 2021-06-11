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
    var Order_AccountId = $("#Order_AccountId").val();
    var Order_Number = $("#Order_Number").val();
    var Order_Date = $("#Order_Date").val();
    var Order_Ammount = $("#Order_Ammount").val();
   if (Order_AccountId == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#Order_AccountId").focus();
        return false;
    }
    else  if (Order_Number == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#Order_Number").focus();
        return false;
    }    
    else if (Order_Date == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#Order_Date").focus();
        return false;    
    }
     else if (Order_Ammount == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#Order_Ammount").focus();
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
                url: urlServices2 + '/Orders',
                data: '{' +
                '"Order_AccountId":' + Order_AccountId + ', ' +
                '"Order_Number":' + Order_Number + ', ' +
                '"Order_Date":"' + Order_Date + '", ' +
                '"Order_Ammount": ' + Order_Ammount + '' +                
                '}',                
                success: function (datos) {
                    $("#myModal").modal("hide");
                    bootbox.alert('Success!');                    
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
                '"Order_Id":' + IdCustomer + ', ' +
                '"Order_AccountId":' + Order_AccountId + ', ' +
                '"Order_Number":' + Order_Number + ', ' +
                '"Order_Date":"' + Order_Date + '", ' +
                '"Order_Ammount": ' + Order_Ammount + '' +                
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
        url: urlServices2 + 'Orders',         
        success: function (datos) {
            if (datos.CodigoResultado == '0003') {
                $("#content_mypets").append('<div style="text-align:center; color: #000000;"><a href="#" data-toggle="modal" data-target="#myModal" data-trans-id="A" style="text-align:center; color: #007a2c;">Registre mascotas para iniciar mundo en PetNet!</a></div></br>');
                return false;
            }
            $.each(datos, function (i, customer) {  //console.log(customer);              
                $("#content_mypets").append('<div class="col-md-12 col-sm-12 col-xs-12 borderBottom">\
                                              <div class="col-md-4 col-sm-4 col-xs-4" style="padding: 0!important;"> \
                                              </div>\
				 							  <div class="col-md-8 col-sm-8 col-xs-8 panelDesc"> \
				 							  	<p class="petName"><strong style="color: #008c31;">' + customer.order_AccountId + '</strong></p> \
                                                <p class="petCaption"><em><br>' + customer.order_Number + '</em></p> \
                                                <p class="petCaption"><em><br>' + customer.order_Date + '</em></p> \
                                                <p class="petCaption"><em><br>' + customer.order_Ammount + ' Payment Day</p> \
                                                <br><a href="#" style="margin-bottom: 15px;" data-toggle="modal" data-target="#myModal" data-pet-id="' + customer.order_Id + '" data-trans-id="E"><i class="fa2 fa-edit"></i></a>\
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
        url: urlServices2 + 'Orders/' + IdCustomer,
        data: + IdCustomer,
        success: function (datos) {
            //console.log(datos[0]);            
            $('#myModalLabel').append('Edit - ' + datos.Order_Id);
            $('#Order_AccountId').val(datos.order_AccountId);           
            $('#Order_Number').val(datos.order_Number);
            $('#Order_Date').val(datos.order_Date);
            $('#Order_Ammount').val(datos.order_Ammount);
        },
        error: function (msg, url, line) {
            alert(line);
        }
    });
}


function clearObj() {
    $("#Order_AccountId").val('');
    $("#Order_Number").val('');
    $("#Order_Date").val('');
    $("#Order_Ammount").val('');
    $("#errorRemember").hide();    
}

function goBack() {
    window.history.back()
}

