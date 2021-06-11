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
    //$('#Efecty_FullName').focus(function () {
    //    this.blur();
    //}); 
    
    var loading_time = 2500;
    $(".modalPetNet").show();
    setTimeout(function () {
        $(".modalPetNet").hide();
    }, loading_time);
    $("#errorRemember").hide();
    $('#btnRegister').on('click', customerEdit);    
    loadEfecty();    

    $(".datepicker").datepicker({
        format: "mm-yyyy",
        startView: "months",
        minViewMode: "months"
    });
    
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
    var Efecty_FullName = $("#Efecty_FullName").val();
    var Efecty_DocType = $('#Efecty_DocType option:selected').val();
    var Efecty_BirthDate = $("#Efecty_BirthDate").val();
    var Efecty_Gain = $("#Efecty_Gain").val();
    var Efecty_MaritalStatus = $("#Efecty_MaritalStatus").val();
    var Efecty_MaritalStatus = 'Casado';
    if (Efecty_FullName == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#Efecty_FullName").focus();
        return false;
    }
    else if (Efecty_DocType == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#Efecty_DocType").focus();
        return false;
    }    
    else if (Efecty_BirthDate == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#Efecty_BirthDate").focus();
        return false;    
    }
    else if (Efecty_Gain == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#Efecty_Gain").focus();
        return false;    
    }
    else if (Efecty_MaritalStatus == '') {
        $("#errorRemember").show();
        $("#errorRemember").empty();        
        $("#Efecty_MaritalStatus").focus();
        return false;    
    }     
    else {       
        var str = 'string';
        var int = 0;
        var dt = '2017-03-27T18:40:18.975Z';
        //ADD
        $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            url: urlServices2 + 'Efecty',
            data: '{' +
                '"Efecty_FullName": "' + Efecty_FullName + '", ' +
                '"Efecty_DocType": "' + Efecty_DocType + '", ' +
                '"Efecty_BirthDate": "' + Efecty_BirthDate + '",' +
                '"Efecty_Gain": "' + Efecty_Gain + '",' +
                '"Efecty_MaritalStatus":"' + Efecty_MaritalStatus + '"' +
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
}

function loadEfecty() {
    var pag = 1;
    var pair;
    $("#cont").val(1);
    $("#content_mypets").empty(); console.log(urlServices2);
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices2 + 'Efecty',         
        success: function (datos) {
            if (datos.CodigoResultado == '0003') {
                $("#content_mypets").append('<div style="text-align:center; color: #000000;"><a href="#" data-toggle="modal" data-target="#myModal" data-trans-id="A" style="text-align:center; color: #007a2c;">No hay conexion!</a></div></br>');
                return false;
            }
            $.each(datos, function (i, efecty) {
                console.log(efecty)       
                $("#content_mypets").append('<div class="col-md-12 col-sm-12 col-xs-12 borderBottom">\
                                              <div class="col-md-4 col-sm-4 col-xs-4" style="padding: 0!important;"> \
                                              </div>\
				 							  <div class="col-md-8 col-sm-8 col-xs-8 panelDesc"> \
				 							  	<p class="petName"><strong style="color: #008c31;">' + efecty.efecty_FullName + '</strong></p> \
                                                <p class="petCaption"><em><br>' + efecty.efecty_DocType + '</em></p> \
                                                <p class="petCaption"><em><br>' + efecty.efecty_BirthDate + '</em></p> \
                                                <p class="petCaption"><em><br>' + efecty.efecty_Gain + ' Ganancia</p> \
                                                <p class="petCaption"><em><br>' + efecty.efecty_MaritalStatus + ' Estado civil</p> \
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
        url: urlServices2 + 'Efecty/' + IdCustomer,
        data: + IdCustomer,
        success: function (datos) {
            //console.log(datos[0]);            
            $('#myModalLabel').append('Edit - ' + datos.account_Id);
            $('#Account_CustID').val(datos.account_CustID);           
            $('#Account_Number').val(datos.account_Number);
            $('#Account_CurrencyID').val(datos.account_CurrencyID);
            $('#Account_CreatedDate').val(datos.account_CreatedDate);
        },
        error: function (msg, url, line) {
            alert(msg);
        }
    });
}


function clearObj() {
    $("#Account_CustID").val('');
    $("#Account_Number").val('');
    $("#Account_CurrencyID").val('');
    $("#Account_CreatedDate").val('');
    $("#errorRemember").hide();    
}

function goBack() {
    window.history.back()
}

