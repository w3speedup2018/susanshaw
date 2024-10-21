 //Check Scroll Event and hide the search form
 var searchFormWrapper = document.querySelector('.mobile-header.nav-search-bar');
 var previousScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
 
 function hideSearchFormOnScroll() {
   var currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
 
   if (currentScrollPosition >= 30) {
     // Scrolling down
     searchFormWrapper.style.display = 'none';
   } else {
     // Scrolling up
     searchFormWrapper.style.display = 'block';
   }    
   
 }

 window.addEventListener("scroll", (event) => {  
    //let scroll = this.scrollY;
     //console.log('==========scroll value:'+scroll);
     if(searchFormWrapper){
        hideSearchFormOnScroll(); 
     }
           
 });

 

window.addEventListener('load', function (event) {
  //console.log('========custom js:ready');
  //Search features
  $(".animate_search").click(function(){
    $(".custom_new_search").toggleClass("custom_anisearch");
    $(".search-submit").toggleClass("custom_anisearchicon");
    $(".animate_search").hide();
    $('.custom_searchfocus').focus();
  });

  $('.custom_searchfocus').on('click', function(){
    let $this = $(this);
    //console.log('======'+$this.val());
    if( $this.val() != ""){
      $this.val("");
    }
     
  });

  //Accordion, only one active 
  let mobileParentMenu = $('#mobile_menu .sublink > a');

  mobileParentMenu.click(function(e) {     
    e.preventDefault();    
    var currentIsActive = $(this).hasClass('is-active');
    $(this).parents('#mobile_menu').find('.submenu-wrapper').hide();
    $(this).parents('#mobile_menu').find('.sublink > *').removeClass('is-active');
    if(currentIsActive != 1) {
      $(this).addClass('is-active');
      $(this).next('.submenu-wrapper').addClass('is-active');
    }
  });

   //add Share button in PDP
   let cta_share = $('.cta-share');
   let share_wapper = $('.share-wrapper');
   cta_share.on('click', function(){
      share_wapper.toggleClass('active');
   })


});





