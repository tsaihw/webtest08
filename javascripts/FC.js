/*
 * REMOVE BEFORE DEPLOYMENT
 * 
 * version 0.3.7 [04 March 2010]
 * - private
 * 		* added _isIFrame detection
 * - public
 * 		* added setCookie method
 * 		* added getCookie method
 * 		* added isInIFrame interface for private _isIFrame
 * 
 * version 0.3.6 [26 February 2010]
 * - public
 * 		* added setHTML5 method
 * 
 * REMOVE BEFORE DEPLOYMENT
 * 
 * version 0.3.5 [25 January 2010]
 * - public
 * 		* added testForEventType method
 * 
 * version 0.3.4 [02 December 2009]
 * - public
 * 		* corrected 'parent' detection' in pngFix as it was set to always use document.body
 * 
 * version 0.3.3 [30 November 2009]
 * - public
 * 		* edited pngFix to add a check for an 8bit png by way of matching '-8bit' within the file name 
 * 		  eg. filename-8bit.png will not have the pngFix applied
 * 		* edited pngFix to not set height and width on foreground images
 * 		* added setJQ
 * 
 * version 0.3.2 [27 November 2009]
 * - private
 * 		* added _clear to the FC Object for the use by pngFix method
 * - public
 * 		* amended pngFix method to store the passed-in clear.gif in FC._clear and to accept a parent 
 * 		  HTMLElement for Ajax usage
 * 
 * version 0.3.1 [25 November 2009]
 * - private
 * 		* added _xhr test to see if IE6 XP SP3 where the JScript engine has been
 * 		  updated to 5.7
 * 		* refactored _isLteIE6 to use _xhr and detect IE6 and JScript 5.7
 * 		* added _isIE7 detection
 * 		* added _isIE6 detection
 * 		* edited _isSafari2 test to remove _mac as version 412 was only released on Mac
 * - public
 * 		* added public hasIE7 interface for private _isIE7
 * 		* added public hasIE6 interface for private _isIE6
 * 		* added public hasSafari2 interface for private _isSafari2
 * 		* fixed pngFix for hasLteIE6
 * 
 * version 0.3.0 [01 June 2009]
 * - private
 * 		* added initializing and fnTest variables for the Class public method
 * - public
 * 		* added the adapted Class method
 * 
 * version 0.2.2 [19 May 2009]
 * - private
 * 		* added _isLteIE6 property
 * 		* moved flicker fix function and removed conditional compilation
 * - public
 * 		* added hasLteIE6 property
 * 		* fixed getStyle method problem with document.body.getElementById() error
 * 		* added resetForm method [untested]
 * 		* edited pngFix to reduce validations as it already knows that it is IE7 or lower
 * 		  because it uses this.hasLteIE7 to target IE only
 * 
 * version 0.2.1 [16 March 2009]
 * - public
 * 		* added beforeUnload method to alert before users leave a page
 * 		* added flickerFix method to remove flicker on IE7 or lower
 * 		* edited pngFix to accept a value to set the spacer.gif
 * */

(function(){
	/** @id _FC */
	var _FC = (function(){
		var initializing = 0, 
			fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
		// create private static attributes and methods here
		var _isIE = /*@cc_on!@*/ 0;
		var _xhr = window.XMLHttpRequest ? 1 : 0;
		
		var _isSelectorAble = (document.querySelectorAll) ? 1 : 0;
		var _isGetClassAble = (document.getElementsByClassName) ? 1 : 0;
		
		var _isLteIE6 = /*@cc_on @*/ /*@if (@_jscript_version <= 5.6) 1; /*@end @*/ 0;
		var _isIE6 = /*@cc_on @*/ /*@if (@_jscript_version == 5.6) 1; /*@end @*/ 0;
		var _isLteIE7 = /*@cc_on @*/ /*@if (@_jscript_version <= 5.7) 1; /*@end @*/ 0;
		var _isIE7 = (_isLteIE7 && window.XMLHttpRequest) ? 1 : 0;
		
			_isIE6 = (_isLteIE7 && !window.XMLHttpRequest) ? 1 : _isIE6;
			_isLteIE6 = (_isLteIE7 && !window.XMLHttpRequest) ? 1 : _isLteIE6;
		
		//safari 2 detection
		var _detect = navigator.userAgent.toLowerCase();
		var _safari_2_x = (_detect.indexOf("safari") >=0 && _detect.indexOf("412") >= 0) ? 1 : 0; 
		
		var _appName = navigator.appName.toLowerCase();

        var _isIFrame = (window.location != window.parent.location) ? 1 : 0;
		
		var _name = 'FC JavaScript Library.\n\nv. 0.3.7\n\n\u00A9 2010 Fortune Cookie UK';
			
		if (_isLteIE7) {// ie7 and below flicker fix
			try {document.execCommand('BackgroundImageCache', false, true);}catch(e){}	
		}
		
		return function(){
		// create private privileged properties and methods with 'this.'
		// create private private properties and methods with 'var' and 'function'
			/** @id hasQuerySelector */
			this.hasHasQuerySelector = (function(){return _isSelectorAble;})();
			/** @id hasIE */
			this.hasIE = (function(){return _isIE;})();
			/** @id hasLteIE6 */
			this.hasLteIE6 = (function(){return _isLteIE6})();
			/** @id hasIE6 */
			this.hasIE6 = (function(){return _isIE6})();
			/** @id hasLteIE7 */
			this.hasLteIE7 = (function(){return _isLteIE7})();
			/** @id hasIE7 */
			this.hasIE7 = (function(){return _isIE7})();
			/** @id hasSafari2 */
			this.hasSafari2 = (function(){return _safari_2_x})();
			/** @id FC */
			this.FC = (function(){return _name})();
			/** @id isInIFrame */
            this.isInIFrame = (function() {return _isIFrame})();
			
			/** @id getIdOrClass */
			this.getIdOrClass = function (el, win) {
				var win = win || window;
				var __id, __cls, __char = el.charAt(0), doc = win.document;
				
				if (__char === "#") __id = el
				else if (__char === ".")  __cls = el
				else return false;
				
				if(_isSelectorAble) return (__id)?doc.querySelector(__id):doc.querySelectorAll(__cls)
				else if(__cls)
					if(_isGetClassAble) return doc.getElementsByClassName(__cls) // remove dot
					else return this.getElementsByClassName(__cls) // remove dot
				else return doc.getElementById(__id) // remove hash
			}
			
			/** @id isInKnownIFrame */
			this.isInKnownIFrame = function (el) {
				if (_isIFrame) return this.getIdOrClass(el, window.parent)
				else return false
			}
			
			/** @id Class */
			// Nicked from John Resig and then refactored to namespace it
			this.Class = function(){};
			this.Class.subclass = function(prop){
				var _super = this.prototype;
				initializing = 1;
				var prototype = new this();
				initializing = 0;
	
				for (var name in prop) {
					prototype[name] = typeof prop[name] == "function" &&
					typeof _super[name] == "function" &&
					fnTest.test(prop[name]) ? (function(name, fn){
						return function(){
							var tmp = this._super;
							this._super = _super[name];
							var ret = fn.apply(this, arguments);
							this._super = tmp;
							
							return ret;
						};
					})(name, prop[name]) : prop[name];
				}
				
				function Class(){
					if (!initializing && this.init) 
						this.init.apply(this, arguments);
				}
				
				Class.prototype = prototype;
				Class.constructor = Class;
				Class.subclass = arguments.callee;
				
				return Class;
			};
			
			/** @id setCookie */
			this.setCookie = function (name, value, expires, path, domain, secure) {
				var today = new Date();
				today.setTime(today.getTime());
				
				/*
				if the expires variable is set, make the correct expires time, the current script below will set
				it for x number of days, to make it for hours, delete * 24, for minutes, delete * 60 * 24
				*/
				if (expires) {
					expires = expires * 1000 * 60 * 60 * 24;
				}
				var expires_date = new Date( today.getTime() + (expires) );
				
				document.cookie = name + "=" +escape(value) +
				((expires) ? ";expires=" + expires_date.toGMTString() : "") +
				((path) ? ";path=" + path : "") +
				((domain) ? ";domain=" + domain : "") +
				((secure) ? ";secure" : "");				
			};
			
			/** @id getCookie */
			this.getCookie = function (name) {
			    if (document.cookie.length > 0) {
			        c_start = document.cookie.indexOf(name + "=");
			        if (c_start != -1) {
			            c_start = c_start + name.length + 1;
			            c_end = document.cookie.indexOf(";", c_start);
			            if (c_end == -1) {
							c_end = document.cookie.length;
						}
			            return unescape(document.cookie.substring(c_start, c_end));
			        }
			    }
			    return "";
			};

			
			/** @id showChildren */
			this.showChildren = function (el) {
				var __str = "";
			
				for (var __j in el) {
					if (el.type || el.hasOwnProperty(__j)) {
						__str += __j + " = " + el[__j] + ", "
					}
				}
				
				alert(__str);
			};
			
			/** @id commonEventObject */
			this.commonEventObject = function (e) {
				var __t;
					
				if (e.target) {
					__t = e.target;
				} else if (e.srcElement) {
					 __t = e.srcElement;
				}
				
				if (__t.nodeType == 3) {// defeat Safari bug
					__t = __t.parentNode;
				}
				
				return __t;
			};		
			
			/** @id stopReturn */
			this.stopReturn = function (e) {
				if (!e) {
					e = window.event;
				}
				(e.stopPropagation) ? e.stopPropagation() : e.cancelBubble = true;
				(e.preventDefault) ? e.preventDefault() : e.returnValue = false;
				return false;
			};
			
			/** @id clearTextNodes */
			this.clearTextNodes = function (n) {
				var __j = Number(n.length);
				while (__j--) if (n[__j].nodeType == 3) {
					n.removeChild(n[__j]);
				}
				return n;
			};
			
			/** @id clearNodes */	
			this.clearNodes = function (n) {
				while (n.firstChild) {
					n.removeChild(n.firstChild)
				}
				return n;
			};
			
			/** @id toDecimalString */
			this.toDecimalString = function (val) {
				__val = Number(val);
				return ((__val * 100) % 100) ? __val.toString() : __val + ".00";
			};
			
			/** @id getStyle */
			this.getStyle = function(el,styleProp) {
				var x = document.getElementById(el), y;
				if (x.currentStyle)
					y = x.currentStyle[styleProp];
				else if (window.getComputedStyle)
					y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
				return y;
			};
			
			/** @id getElementsByClassName */
			this.getElementsByClassName = function(cl) {
				var retnode = [], myclass = new RegExp('\\b' + cl + '\\b'), elem = document.getElementsByTagName('*');
				var i = elem.length;
				while (i--) {
					if (myclass.test(elem[i].className)) retnode.push(elem[i]);
				}
				return (!retnode.length) ? null : retnode;
			};
			
			/** @id addEvent */	
			this.addEvent = function(obj, evt, fn){
				if (obj.addEventListener) 
					obj.addEventListener(evt, fn, false);
				else 
					if (obj.attachEvent) 
						obj.attachEvent('on' + evt, fn);
				
				if (obj.getAttribute) {
					if (obj.getAttribute('href')) {
						obj.onclick = function(){
							return false
						}
					} else if (obj.getAttribute('href') && !obj.getAttribute('onclick')) {
						var func = obj.onclick;
						obj.onclick = function(){
							func();
							return false;
						}
					}
				}	
			};
			
			/** @id removeEvent */
			this.removeEvent = function(obj, type, fn) {
				if (obj.removeEventListener)
					obj.removeEventListener(type,fn,false);
				else if (obj.detachEvent)
					obj.detachEvent('on'+type,fn);
			};
			
			/** @id testForEventType */
			this.testForEventType = function(e, el) {
				return 'on'+e in el || (function (){ // firefox workaround
					var __el = Object(el), __bool;
					__el.setAttribute(e, 'return;');
					__bool = typeof __el['on'+e] == 'function';
					__el = undefined;
					return __bool;
				})();
			}
			
			/** @id toggle */
			this.toggle = function(el) {
				el.style.display = (el.style.display == 'none') ? 'block' : 'none';
			};
			
			/** @id setHTML5 */
			this.setHTML5 = function () {
    			if (!/*@cc_on!@*/0) return;
    			var e = "abbr,article,aside,audio,bb,canvas,datagrid,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(','),
        		i = e.length;
			    while (i--) {
			        document.createElement(e[i])
			    }
			};
			
			/** @id setJS */
			this.setJS = function () {
				document.body.className = (document.body.className) ? document.body.className + " js" : "js";
			};
			
			/** @id setJQ */
			this.setJQ = function(){
				switch (_appName) {
					case 'playstation':
						break;
					default:
						document.body.className = (document.body.className) ? document.body.className + " jq" : "jq";
				}
			};
			
			/** @id checkChange */
			this.checkChange = function(str, o){ // receives a unique identifier (ie: an id) and an Object literal
				(o[str]) ? delete o[str] : o[str] = true;
				
				for (var __j in o) if (o.hasOwnProperty(__j)) {return true}
				
				return false;
			};
			
			/** @id beforeUnload */
			this.beforeUnload = function (str) {
				window.onbeforeunload = (str) ? function (e) {
					if (e) {
						e.returnValue = str; // required for FF
					}
					return str;
				} : null ;
			};
			
			/** @id resetForm */
			this.resetForm = function (form) {
				var __input = document.createElement('input');
				__input.setAttribute('type', 'reset');
				form.appendChild(__input);
				__input.click();
				form.removeChild(form.childNodes[form.childNodes.length]);
			};
			
			/** @id pngFix */
			this.pngFix = function(clear, parent){
				if (this.hasLteIE6) {
					/*@cc_on
						if(this._clear=clear||this._clear){parent=parent||document.body;var els=parent.getElementsByTagName("*");var ip=/\.png/i;var ip8=/-8bit/i;var i=els.length;while(i--){var el=els[i];var es=el.style;if(el.src&&el.src.match(ip)&&!es.filter){if(!el.src.match(ip8)){es.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+el.src+"',sizingMethod='crop')";el.src=clear}}else{var elb=el.currentStyle.backgroundImage;if(elb.match(ip)){if(!elb.match(ip8)){var path=elb.split('"');var rep=(el.currentStyle.backgroundRepeat=="no-repeat")?"crop":"scale";es.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+path[1]+"',sizingMethod='"+rep+"')";es.height=el.clientHeight+"px";es.backgroundImage="none";}}}}}
					@*/
				}
			};
			
		};
	})();
	
	window.FC = new _FC();
	
	// create public privileged static properties and methods with 
	/*  
		_FC.functionName = function (val) {
		}
	*/
	
//	_FC.vars = {}; // priviliged runtime properties with access to FC private content go here
//	_FC.functions = {}; // priviliged runtime methods with access to FC private content go here
	
	// create public non-privileged properties (like jQuery) and methods with 
	
	/*	
	 	FC.prototype = {
			functionName : function () {}
		}
	*/
})();
