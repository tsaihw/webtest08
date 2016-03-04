
FC.vars = {
    selectors: {
        NAV: '.nav, h1',
		
		//Cookie Prompt
		cprompt: ".cookie-prompt",
        header: "h2"

	},
    current: 0,    
    currentT: 0

}

$(function() {
	
	FC.setJS();
	
	 var __SEL = FC.vars.selectors, __$tmp;
    (function(arg) {
        for (var __i = 0, __j = arg.length, __o; __i < __j; __i++) {
            __o = arg[__i];
            (function() {
                __$tmp = $(__o.test);
                return __$tmp.length
            })() ? __o.func(__$tmp, __o.args || null) : null;
        }
    })([
		{ func: FC.nav, test: __SEL.NAV }
	]);
    FC.skiplinks();

	var _seen = FC.getCookie('cookieTextSeen');
	if (_seen != "user has seen the terms and conditions popup"){
		FC.cookiePrompt();
	}
})

FC.nav = function ($nav) {
    var $level2 = $nav.find('ul ul');
	
	function clickOn($link){
		if($link.hasClass('about')){$level2.show('slow');}
		$('.content:not('+$link.attr('href')+')').delay(150).fadeOut(700);
		$($link.attr('href')).fadeIn(700);
	}
	
	$nav.find('a').toggle(
      function () {
          clickOn($(this));
		  return false;
      },
      function () {
		  if($(this).hasClass('about')){
		  	$level2.hide('slow');
			$('.content:not(#home)').delay(150).fadeOut(700);
			$('#home').fadeIn(700);
			
		  } else {
			clickOn($(this));  
		  }
		  return false;
      }
	);
}

//FC Cookie prompt
FC.cookiePrompt = function (element) {
    var __SEL = FC.vars.selectors;
    var cookiesAccepted = FC.getCookie("cookiesAccepted");
    var cprompt = $(__SEL.cprompt);
    var closeTrigger = cprompt.find(".close");

    $(cprompt).show();

    // slide up the prompt
    $(cprompt).animate({
        bottom: 0
    }, 1500, function () {
        // Animation complete.
    });
    function getScrollPos() {
        return document.documentElement.scrollTop;
    }
    // set the cookie and close the box
    closeTrigger.bind("click keydown", function (e) {
        if (!e.keyCode || e.keyCode == 13) {
            $(cprompt).fadeOut('slow');
            //cprompt.trigger("remove");
            FC.setCookie("cookieTextSeen", "user has seen the terms and conditions popup", 365); // think about how long we want to store this - check if any requirements from cookie law
            e.preventDefault();
            return false;
        }
    });
    FC.setCookie("cookieTextSeen", "user has seen the terms and conditions popup", 365);
};
FC.setCookie = function (c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
};
FC.getCookie = function (c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
};


FC.skiplinks = function () {
    var is_webkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;
    if (is_webkit || is_opera) {
        var target = $('#skip-content');
        target.attr("href", "#skip-content");
        target.text("Start of main content")
        target.attr("tabindex", "-1");
        $("#cont-skip").bind("click", function () { target.focus(); });

        var target1 = $('#skip-nav');
        target1.attr("href", "#skip-nav");
        target1.text("Start of main navigation")
        target1.attr("tabindex", "-1");
        $("#nav-skip").bind("click", function () { target1.focus(); });
    }
}

