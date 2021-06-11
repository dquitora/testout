// JavaScript Document

(function ($) {

$(window).load(function() { 
	$("#status").fadeOut(); // will first fade out the loading animation
	$("#preloader").delay(400).fadeOut("slow"); // will fade out the white DIV that covers the website.
});

$(document).ready(function() {
    
//   $('.snap-drawer').animate({
//        scrollTop: $(".scroll-to-this").offset().top
//    }, 500);
    
    
    if($('.sidebar-navigation li a').hasClass('scroll-to-this')) {
        $('.snap-drawer').animate({
            scrollTop: $(".scroll-to-this").offset().top
        }, 500);
    } 
    
    $('.deploy-submenu').click(function(){
        $(this).toggleClass('active-submenu');
        $(this).parent().find('.submenu').toggleClass('active-submenu-items');
        return false;
    });
    
    $('.show-share-bottom').click(function(){
       $('.share-bottom').toggleClass('active-share-bottom'); 
        return false;
    });    
    
    $('.close-share-bottom, #content, .open-menu').click(function(){
       $('.share-bottom').removeClass('active-share-bottom'); 
        return false;
    });
   
	//Submenu Deploy//
	
	$('.swipebox').click(function(){ 
		$('.gallery').hide(0);
		$('.portfolio-wide').hide(0);
	});

	$('.open-menu').click(function() {
		//$(this).toggleClass('remove-sidebar');
		if( snapper.state().state=="left" ){
			snapper.close();
		} else {
			snapper.open('left');
		}
		return false;
	});
	
	$('.sidebar-header .fa-times').click(function() {
		snapper.close();
	});	
	
	//Submenu Nav
	
	$('.submenu-nav-deploy').click(function() {
		$(this).toggleClass('submenu-nav-deploy-active');
		$(this).parent().find('.submenu-nav-items').slideToggle(200);
		return false;
	});	
	
	/////////////////////////////////////////////////////////////////////////////////////////////
	//Detect user agent for known mobile devices and show hide elements for each specific element
	/////////////////////////////////////////////////////////////////////////////////////////////
	
	var isiPhone = 		navigator.userAgent.toLowerCase().indexOf("iphone");
	var isiPad = 		navigator.userAgent.toLowerCase().indexOf("ipad");
	var isiPod = 		navigator.userAgent.toLowerCase().indexOf("ipod");
	var isiAndroid = 	navigator.userAgent.toLowerCase().indexOf("android");
	
	if(isiPhone > -1) 	 {		 $('.ipod-detected').hide();		 $('.ipad-detected').hide();		 $('.iphone-detected').show();		 $('.android-detected').hide();	 }
	if(isiPad > -1)	 {		 	 $('.ipod-detected').hide();		 $('.ipad-detected').show();		 $('.iphone-detected').hide();		 $('.android-detected').hide();	 }
	if(isiPod > -1)	 {		 	 $('.ipod-detected').show();		 $('.ipad-detected').hide();		 $('.iphone-detected').hide();		 $('.android-detected').hide();	 }   
	if(isiAndroid > -1) {		 $('.ipod-detected').hide();		 $('.ipad-detected').hide();		 $('.iphone-detected').hide();		 $('.android-detected').show();	 }  
});

}(jQuery));