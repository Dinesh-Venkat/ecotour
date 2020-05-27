/* Global Variables */
var PageNavStack = [];










/* Global Site Functions */

// Main Menu
var resetMainMenu = function(){
	$('#main-menu').removeClass('active mobile-menu');
	$('#page-wrapper').removeClass('menu-active');
	$('#bg-overlay').removeClass('mobile-menu-active');
	console.log('test');
};



// Page Stack Logging 
var pushPageStack = function(pageName){
	PageNavStack.push(pageName);
};
var popPageStack = function(){
	return PageNavStack.pop();
};
var resetPageStack = function(){
	PageNavStack = [];
};
var isPageStackEmpty = function(){
	return PageNavStack.length==0;
};



// Page Popup
var showPage = function(htmlData='', pageName=''){
	var $pageWrapper = $('#page-wrapper');
	resetMainMenu();
	$('#bg-overlay').addClass('page-open');
	$('#main-header').addClass('page-open');
	$('#login-button').addClass('page-open');
	$pageWrapper.addClass('visible').data('pageName',pageName);
	if(htmlData!=='')
		$('#page', $pageWrapper).html(htmlData).addClass('loaded');
	else
		$pageWrapper.addClass('loading');
};
var resetPage = function(){
	var $pageWrapper = $('#page-wrapper');
	$pageWrapper.addClass('loading').data('pageName','');
	$('#page', $pageWrapper).removeClass('loaded');
	$('#page-back-btn', $pageWrapper).removeClass('visible');
};
var closePage = function(){
	var $pageWrapper = $('#page-wrapper');
	$('#bg-overlay').removeClass('page-open');
	$('#main-header').removeClass('page-open');
	$('#login-button').removeClass('page-open');
	$('#page', $pageWrapper).html('');
	$pageWrapper.removeClass('visible');
	resetPage();
};
var rewritePage = function(htmlData, pageName){
	var $pageWrapper = $('#page-wrapper');
	$('#page', $pageWrapper).html(htmlData).addClass('loaded');
	$pageWrapper.removeClass('loading').data('pageName',pageName);
};
var isPageOpen = function(){
	return $('#page-wrapper').hasClass('visible');
};
var getCurrentPageName = function(){
	return $('#page-wrapper').data('pageName');
};
var enableBackButton = function(){
	$('#page-back-btn').addClass('visible');
};
var disableBackButton = function(){
	$('#page-back-btn').removeClass('visible');
};



// Form validation
var renderErrorMessages = function(errors){
	for(var i=0,n=errors.length; i<n; i++){
		var $errElem = $(errors[i]['el']),
			$errMsg = $errElem.next('.error-message');
		if($errMsg.length==0)
			$errElem.after("<span class='error-message'>"+errors[i]['error']+"</span");
		else
			$errMsg.text(errors[i]['error']);
	}
};
var validateForm = function($valForm){
	var errors = [],
		conf = {
					onElementValidate : function(valid, $el, $form, errorMess) {
						if(!valid){
							errors.push({el: $el, error: errorMess});
						}
					},
					ignoreClass: 'invisible'
				},
		lang = {};
	$('.error-message',$valForm).text('');
	if(!$valForm.isValid(lang, conf, false)){
		renderErrorMessages(errors);
		return false;
	}
	else
		return true;
};



// AJAX Page rendering
var renderAjaxPage = function(pageName, formData='?', backNav=false){
	var previousPage = getCurrentPageName();

	// Pushing current page to Page Stack before loading new page
	if(typeof previousPage!=='undefined' && !backNav)
		pushPageStack(previousPage);

	// Enable or disable back button
	if(isPageOpen()){
		resetPage();
		if(isPageStackEmpty())
			disableBackButton();
		else
			enableBackButton();
	}
	else
		showPage();

	var ajaxUrl = pageName;
	$.ajax({
			type: "GET",
			url: ajaxUrl,
			data: formData,
			success: function(htmlData){
				if(htmlData!=='')
					rewritePage(htmlData, pageName);

				// Binding loading event for 
				$('.ajax-loader', '#page').click(function(e){
					var $this = $(this),
						pageName = $this.data('page');
					if($this.hasClass('disabled')){}
					else if($this.hasClass('validate-submit')){
						var $valForm = $this.parents('form');
						if($valForm.length>0)
							if(validateForm($valForm))
								renderAjaxPage(pageName, $valForm.serialize());
					}
					else
						renderAjaxPage(pageName);
					e.stopPropagation();
					e.preventDefault();
					return false;
				});
				$(".feather").featherlight();
			}
		});
};















/* Website Script */
$(function(){
	/* Elements */

	var PageNavStack = [],
		$bgOverlay = $('#bg-overlay'),
		$mainHead = $('#main-header'),
		$mainMenu = $('#main-menu',$mainHead),
		$menuListItem = $('>li',$mainMenu);


	/* Main Menu */

	// Detecting Sub-menu
	$menuListItem.each(function(){
		var $this = $(this);
		if($this.children('.submenu').length>0)
			$this.addClass('submenued');
	});



	/* Event Bindings */

	// Main Menu hover effect
	$mainMenu.hover(function(){
		if(!$mainMenu.hasClass('mobile-menu')){
			$bgOverlay.addClass('visible');
			$mainMenu.addClass('active');
			$('#page-wrapper').addClass('menu-active');
		}
	},function(){
		if(!$mainMenu.hasClass('mobile-menu')){
			$bgOverlay.removeClass('visible');
			$mainMenu.removeClass('active');
			$('#page-wrapper').removeClass('menu-active');
		}
	});
	$mainMenu.children('.submenued').hover(function(){
		$mainMenu.toggleClass('bordered');
	});

	// Mobile Menu Display
	$('#mobile-menu-button').click(function(e){
		if($mainMenu.hasClass('mobile-menu')){
			$mainMenu.removeClass('mobile-menu');
			$bgOverlay.removeClass('mobile-menu-active');
			$('#page-wrapper').removeClass('menu-active');
		}
		else{
			$mainMenu.addClass('mobile-menu');
			$bgOverlay.addClass('mobile-menu-active');
			$('#page-wrapper').addClass('menu-active');
		}
	});
	$('.submenued').click(function(e){
		$(this).toggleClass('expand');
	});
	$(window).resize(function(){
		resetMainMenu();
	});

	// Page Popup Close & Back
	$('#page-close-btn').click(function(e){
		resetPageStack();
		closePage();
		e.stopPropagation();
		e.preventDefault();
		return false;
	});
	$('#page-back-btn').click(function(e){
		renderAjaxPage(popPageStack(),'',true);
		e.stopPropagation();
		e.preventDefault();
		return false;
	});

	// Menu button click AJAX page loading
	$('.ajax-loader', $mainMenu).click(function(e){
		resetMainMenu();
		resetPageStack();
		renderAjaxPage($(this).data('page'));
		e.stopPropagation();
		e.preventDefault();
		return false;
	});

	// Login button
	$('#login-button').click(function(e){
		resetMainMenu();
		resetPageStack();
		renderAjaxPage($(this).data('page'));
		e.stopPropagation();
		e.preventDefault();
		return false;
	});

});