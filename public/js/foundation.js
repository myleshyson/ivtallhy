<<<<<<< HEAD
'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}!function($){"use strict";var FOUNDATION_VERSION='6.2.0';// Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify
var Foundation={version:FOUNDATION_VERSION,/**
   * Stores initialized plugins.
   */_plugins:{},/**
   * Stores generated unique ids for plugin instances
   */_uuids:[],/**
   * Returns a boolean for RTL support
   */rtl:function rtl(){return $('html').attr('dir')==='rtl';},/**
   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
   * @param {Object} plugin - The constructor of the plugin.
   */plugin:function plugin(_plugin,name){// Object key to use when adding to global Foundation object
// Examples: Foundation.Reveal, Foundation.OffCanvas
var className=name||functionName(_plugin);// Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
// Examples: data-reveal, data-off-canvas
var attrName=hyphenate(className);// Add to the Foundation object and the plugins list (for reflowing)
this._plugins[attrName]=this[className]=_plugin;},/**
   * @function
   * Populates the _uuids array with pointers to each individual plugin instance.
   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
   * Also fires the initialization event for each plugin, consolidating repeditive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @param {String} name - the name of the plugin, passed as a camelCased string.
   * @fires Plugin#init
   */registerPlugin:function registerPlugin(plugin,name){var pluginName=name?hyphenate(name):functionName(plugin.constructor).toLowerCase();plugin.uuid=this.GetYoDigits(6,pluginName);if(!plugin.$element.attr('data-'+pluginName)){plugin.$element.attr('data-'+pluginName,plugin.uuid);}if(!plugin.$element.data('zfPlugin')){plugin.$element.data('zfPlugin',plugin);}/**
           * Fires when the plugin has initialized.
           * @event Plugin#init
           */plugin.$element.trigger('init.zf.'+pluginName);this._uuids.push(plugin.uuid);return;},/**
   * @function
   * Removes the plugins uuid from the _uuids array.
   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
   * Also fires the destroyed event for the plugin, consolidating repeditive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @fires Plugin#destroyed
   */unregisterPlugin:function unregisterPlugin(plugin){var pluginName=hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));this._uuids.splice(this._uuids.indexOf(plugin.uuid),1);plugin.$element.removeAttr('data-'+pluginName).removeData('zfPlugin')/**
           * Fires when the plugin has been destroyed.
           * @event Plugin#destroyed
           */.trigger('destroyed.zf.'+pluginName);for(var prop in plugin){plugin[prop]=null;//clean up script to prep for garbage collection.
}return;},/**
   * @function
   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
   * @default If no argument is passed, reflow all currently active plugins.
   */reInit:function reInit(plugins){var isJQ=plugins instanceof $;try{if(isJQ){plugins.each(function(){$(this).data('zfPlugin')._init();});}else{var type=typeof plugins==='undefined'?'undefined':_typeof(plugins),_this=this,fns={'object':function object(plgs){plgs.forEach(function(p){p=hyphenate(p);$('[data-'+p+']').foundation('_init');});},'string':function string(){plugins=hyphenate(plugins);$('[data-'+plugins+']').foundation('_init');},'undefined':function undefined(){this['object'](Object.keys(_this._plugins));}};fns[type](plugins);}}catch(err){console.error(err);}finally{return plugins;}},/**
   * returns a random base-36 uid with namespacing
   * @function
   * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
   * @param {String} namespace - name of plugin to be incorporated in uid, optional.
   * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
   * @returns {String} - unique id
   */GetYoDigits:function GetYoDigits(length,namespace){length=length||6;return Math.round(Math.pow(36,length+1)-Math.random()*Math.pow(36,length)).toString(36).slice(1)+(namespace?'-'+namespace:'');},/**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */reflow:function reflow(elem,plugins){// If plugins is undefined, just grab everything
if(typeof plugins==='undefined'){plugins=Object.keys(this._plugins);}// If plugins is a string, convert it to an array with one item
else if(typeof plugins==='string'){plugins=[plugins];}var _this=this;// Iterate through each plugin
$.each(plugins,function(i,name){// Get the current plugin
var plugin=_this._plugins[name];// Localize the search to all elements inside elem, as well as elem itself, unless elem === document
var $elem=$(elem).find('[data-'+name+']').addBack('[data-'+name+']');// For each plugin found, initialize it
$elem.each(function(){var $el=$(this),opts={};// Don't double-dip on plugins
if($el.data('zfPlugin')){console.warn("Tried to initialize "+name+" on an element that already has a Foundation plugin.");return;}if($el.attr('data-options')){var thing=$el.attr('data-options').split(';').forEach(function(e,i){var opt=e.split(':').map(function(el){return el.trim();});if(opt[0])opts[opt[0]]=parseValue(opt[1]);});}try{$el.data('zfPlugin',new plugin($(this),opts));}catch(er){console.error(er);}finally{return;}});});},getFnName:functionName,transitionend:function transitionend($elem){var transitions={'transition':'transitionend','WebkitTransition':'webkitTransitionEnd','MozTransition':'transitionend','OTransition':'otransitionend'};var elem=document.createElement('div'),end;for(var t in transitions){if(typeof elem.style[t]!=='undefined'){end=transitions[t];}}if(end){return end;}else{end=setTimeout(function(){$elem.triggerHandler('transitionend',[$elem]);},1);return'transitionend';}}};Foundation.util={/**
   * Function for applying a debounce effect to a function call.
   * @function
   * @param {Function} func - Function to be called at end of timeout.
   * @param {Number} delay - Time in ms to delay the call of `func`.
   * @returns function
   */throttle:function throttle(func,delay){var timer=null;return function(){var context=this,args=arguments;if(timer===null){timer=setTimeout(function(){func.apply(context,args);timer=null;},delay);}};}};// TODO: consider not making this a jQuery function
// TODO: need way to reflow vs. re-initialize
/**
 * The Foundation jQuery method.
 * @param {String|Array} method - An action to perform on the current jQuery object.
 */var foundation=function foundation(method){var type=typeof method==='undefined'?'undefined':_typeof(method),$meta=$('meta.foundation-mq'),$noJS=$('.no-js');if(!$meta.length){$('<meta class="foundation-mq">').appendTo(document.head);}if($noJS.length){$noJS.removeClass('no-js');}if(type==='undefined'){//needs to initialize the Foundation object, or an individual plugin.
Foundation.MediaQuery._init();Foundation.reflow(this);}else if(type==='string'){//an individual method to invoke on a plugin or group of plugins
var args=Array.prototype.slice.call(arguments,1);//collect all the arguments, if necessary
var plugClass=this.data('zfPlugin');//determine the class of plugin
if(plugClass!==undefined&&plugClass[method]!==undefined){//make sure both the class and method exist
if(this.length===1){//if there's only one, call it directly.
plugClass[method].apply(plugClass,args);}else{this.each(function(i,el){//otherwise loop through the jQuery collection and invoke the method on each
plugClass[method].apply($(el).data('zfPlugin'),args);});}}else{//error for no class or no method
throw new ReferenceError("We're sorry, '"+method+"' is not an available method for "+(plugClass?functionName(plugClass):'this element')+'.');}}else{//error for invalid argument type
throw new TypeError('We\'re sorry, '+type+' is not a valid parameter. You must use a string representing the method you wish to invoke.');}return this;};window.Foundation=Foundation;$.fn.foundation=foundation;// Polyfill for requestAnimationFrame
(function(){if(!Date.now||!window.Date.now)window.Date.now=Date.now=function(){return new Date().getTime();};var vendors=['webkit','moz'];for(var i=0;i<vendors.length&&!window.requestAnimationFrame;++i){var vp=vendors[i];window.requestAnimationFrame=window[vp+'RequestAnimationFrame'];window.cancelAnimationFrame=window[vp+'CancelAnimationFrame']||window[vp+'CancelRequestAnimationFrame'];}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var lastTime=0;window.requestAnimationFrame=function(callback){var now=Date.now();var nextTime=Math.max(lastTime+16,now);return setTimeout(function(){callback(lastTime=nextTime);},nextTime-now);};window.cancelAnimationFrame=clearTimeout;}/**
   * Polyfill for performance.now, required by rAF
   */if(!window.performance||!window.performance.now){window.performance={start:Date.now(),now:function now(){return Date.now()-this.start;}};}})();if(!Function.prototype.bind){Function.prototype.bind=function(oThis){if(typeof this!=='function'){// closest thing possible to the ECMAScript 5
// internal IsCallable function
throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');}var aArgs=Array.prototype.slice.call(arguments,1),fToBind=this,fNOP=function fNOP(){},fBound=function fBound(){return fToBind.apply(this instanceof fNOP?this:oThis,aArgs.concat(Array.prototype.slice.call(arguments)));};if(this.prototype){// native functions don't have a prototype
fNOP.prototype=this.prototype;}fBound.prototype=new fNOP();return fBound;};}// Polyfill to get the name of a function in IE9
function functionName(fn){if(Function.prototype.name===undefined){var funcNameRegex=/function\s([^(]{1,})\(/;var results=funcNameRegex.exec(fn.toString());return results&&results.length>1?results[1].trim():"";}else if(fn.prototype===undefined){return fn.constructor.name;}else{return fn.prototype.constructor.name;}}function parseValue(str){if(/true/.test(str))return true;else if(/false/.test(str))return false;else if(!isNaN(str*1))return parseFloat(str);return str;}// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str){return str.replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase();}}(jQuery);'use strict';!function($){Foundation.Box={ImNotTouchingYou:ImNotTouchingYou,GetDimensions:GetDimensions,GetOffsets:GetOffsets};/**
 * Compares the dimensions of an element to a container and determines collision events with container.
 * @function
 * @param {jQuery} element - jQuery object to test for collisions.
 * @param {jQuery} parent - jQuery object to use as bounding container.
 * @param {Boolean} lrOnly - set to true to check left and right values only.
 * @param {Boolean} tbOnly - set to true to check top and bottom values only.
 * @default if no parent object passed, detects collisions with `window`.
 * @returns {Boolean} - true if collision free, false if a collision in any direction.
 */function ImNotTouchingYou(element,parent,lrOnly,tbOnly){var eleDims=GetDimensions(element),top,bottom,left,right;if(parent){var parDims=GetDimensions(parent);bottom=eleDims.offset.top+eleDims.height<=parDims.height+parDims.offset.top;top=eleDims.offset.top>=parDims.offset.top;left=eleDims.offset.left>=parDims.offset.left;right=eleDims.offset.left+eleDims.width<=parDims.width;}else{bottom=eleDims.offset.top+eleDims.height<=eleDims.windowDims.height+eleDims.windowDims.offset.top;top=eleDims.offset.top>=eleDims.windowDims.offset.top;left=eleDims.offset.left>=eleDims.windowDims.offset.left;right=eleDims.offset.left+eleDims.width<=eleDims.windowDims.width;}var allDirs=[bottom,top,left,right];if(lrOnly){return left===right===true;}if(tbOnly){return top===bottom===true;}return allDirs.indexOf(false)===-1;};/**
 * Uses native methods to return an object of dimension values.
 * @function
 * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
 * @returns {Object} - nested object of integer pixel values
 * TODO - if element is window, return only those values.
 */function GetDimensions(elem,test){elem=elem.length?elem[0]:elem;if(elem===window||elem===document){throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");}var rect=elem.getBoundingClientRect(),parRect=elem.parentNode.getBoundingClientRect(),winRect=document.body.getBoundingClientRect(),winY=window.pageYOffset,winX=window.pageXOffset;return{width:rect.width,height:rect.height,offset:{top:rect.top+winY,left:rect.left+winX},parentDims:{width:parRect.width,height:parRect.height,offset:{top:parRect.top+winY,left:parRect.left+winX}},windowDims:{width:winRect.width,height:winRect.height,offset:{top:winY,left:winX}}};}/**
 * Returns an object of top and left integer pixel values for dynamically rendered elements,
 * such as: Tooltip, Reveal, and Dropdown
 * @function
 * @param {jQuery} element - jQuery object for the element being positioned.
 * @param {jQuery} anchor - jQuery object for the element's anchor point.
 * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
 * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
 * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
 * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
 * TODO alter/rewrite to work with `em` values as well/instead of pixels
 */function GetOffsets(element,anchor,position,vOffset,hOffset,isOverflow){var $eleDims=GetDimensions(element),$anchorDims=anchor?GetDimensions(anchor):null;switch(position){case'top':return{left:Foundation.rtl()?$anchorDims.offset.left-$eleDims.width+$anchorDims.width:$anchorDims.offset.left,top:$anchorDims.offset.top-($eleDims.height+vOffset)};break;case'left':return{left:$anchorDims.offset.left-($eleDims.width+hOffset),top:$anchorDims.offset.top};break;case'right':return{left:$anchorDims.offset.left+$anchorDims.width+hOffset,top:$anchorDims.offset.top};break;case'center top':return{left:$anchorDims.offset.left+$anchorDims.width/2-$eleDims.width/2,top:$anchorDims.offset.top-($eleDims.height+vOffset)};break;case'center bottom':return{left:isOverflow?hOffset:$anchorDims.offset.left+$anchorDims.width/2-$eleDims.width/2,top:$anchorDims.offset.top+$anchorDims.height+vOffset};break;case'center left':return{left:$anchorDims.offset.left-($eleDims.width+hOffset),top:$anchorDims.offset.top+$anchorDims.height/2-$eleDims.height/2};break;case'center right':return{left:$anchorDims.offset.left+$anchorDims.width+hOffset+1,top:$anchorDims.offset.top+$anchorDims.height/2-$eleDims.height/2};break;case'center':return{left:$eleDims.windowDims.offset.left+$eleDims.windowDims.width/2-$eleDims.width/2,top:$eleDims.windowDims.offset.top+$eleDims.windowDims.height/2-$eleDims.height/2};break;case'reveal':return{left:($eleDims.windowDims.width-$eleDims.width)/2,top:$eleDims.windowDims.offset.top+vOffset};case'reveal full':return{left:$eleDims.windowDims.offset.left,top:$eleDims.windowDims.offset.top};break;default:return{left:Foundation.rtl()?$anchorDims.offset.left-$eleDims.width+$anchorDims.width:$anchorDims.offset.left,top:$anchorDims.offset.top+$anchorDims.height+vOffset};}}}(jQuery);/*******************************************
 *                                         *
 * This util was created by Marius Olbertz *
 * Please thank Marius on GitHub /owlbertz *
 * or the web http://www.mariusolbertz.de/ *
 *                                         *
 ******************************************/'use strict';!function($){var keyCodes={9:'TAB',13:'ENTER',27:'ESCAPE',32:'SPACE',37:'ARROW_LEFT',38:'ARROW_UP',39:'ARROW_RIGHT',40:'ARROW_DOWN'};var commands={};var Keyboard={keys:getKeyCodes(keyCodes),/**
   * Parses the (keyboard) event and returns a String that represents its key
   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
   * @param {Event} event - the event generated by the event handler
   * @return String key - String that represents the key pressed
   */parseKey:function parseKey(event){var key=keyCodes[event.which||event.keyCode]||String.fromCharCode(event.which).toUpperCase();if(event.shiftKey)key='SHIFT_'+key;if(event.ctrlKey)key='CTRL_'+key;if(event.altKey)key='ALT_'+key;return key;},/**
   * Handles the given (keyboard) event
   * @param {Event} event - the event generated by the event handler
   * @param {String} component - Foundation component's name, e.g. Slider or Reveal
   * @param {Objects} functions - collection of functions that are to be executed
   */handleKey:function handleKey(event,component,functions){var commandList=commands[component],keyCode=this.parseKey(event),cmds,command,fn;if(!commandList)return console.warn('Component not defined!');if(typeof commandList.ltr==='undefined'){// this component does not differentiate between ltr and rtl
cmds=commandList;// use plain list
}else{// merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
if(Foundation.rtl())cmds=$.extend({},commandList.ltr,commandList.rtl);else cmds=$.extend({},commandList.rtl,commandList.ltr);}command=cmds[keyCode];fn=functions[command];if(fn&&typeof fn==='function'){// execute function  if exists
fn.apply();if(functions.handled||typeof functions.handled==='function'){// execute function when event was handled
functions.handled.apply();}}else{if(functions.unhandled||typeof functions.unhandled==='function'){// execute function when event was not handled
functions.unhandled.apply();}}},/**
   * Finds all focusable elements within the given `$element`
   * @param {jQuery} $element - jQuery object to search within
   * @return {jQuery} $focusable - all focusable elements within `$element`
   */findFocusable:function findFocusable($element){return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function(){if(!$(this).is(':visible')||$(this).attr('tabindex')<0){return false;}//only have visible elements and those that have a tabindex greater or equal 0
return true;});},/**
   * Returns the component name name
   * @param {Object} component - Foundation component, e.g. Slider or Reveal
   * @return String componentName
   */register:function register(componentName,cmds){commands[componentName]=cmds;}};/*
 * Constants for easier comparing.
 * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
 */function getKeyCodes(kcs){var k={};for(var kc in kcs){k[kcs[kc]]=kcs[kc];}return k;}Foundation.Keyboard=Keyboard;}(jQuery);'use strict';!function($){// Default set of media queries
var defaultQueries={'default':'only screen',landscape:'only screen and (orientation: landscape)',portrait:'only screen and (orientation: portrait)',retina:'only screen and (-webkit-min-device-pixel-ratio: 2),'+'only screen and (min--moz-device-pixel-ratio: 2),'+'only screen and (-o-min-device-pixel-ratio: 2/1),'+'only screen and (min-device-pixel-ratio: 2),'+'only screen and (min-resolution: 192dpi),'+'only screen and (min-resolution: 2dppx)'};var MediaQuery={queries:[],current:'',/**
   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
   * @function
   * @private
   */_init:function _init(){var self=this;var extractedStyles=$('.foundation-mq').css('font-family');var namedQueries;namedQueries=parseStyleToObject(extractedStyles);for(var key in namedQueries){self.queries.push({name:key,value:'only screen and (min-width: '+namedQueries[key]+')'});}this.current=this._getCurrentSize();this._watcher();},/**
   * Checks if the screen is at least as wide as a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
   */atLeast:function atLeast(size){var query=this.get(size);if(query){return window.matchMedia(query).matches;}return false;},/**
   * Gets the media query of a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to get.
   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
   */get:function get(size){for(var i in this.queries){var query=this.queries[i];if(size===query.name)return query.value;}return null;},/**
   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
   * @function
   * @private
   * @returns {String} Name of the current breakpoint.
   */_getCurrentSize:function _getCurrentSize(){var matched;for(var i in this.queries){var query=this.queries[i];if(window.matchMedia(query.value).matches){matched=query;}}if((typeof matched==='undefined'?'undefined':_typeof(matched))==='object'){return matched.name;}else{return matched;}},/**
   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
   * @function
   * @private
   */_watcher:function _watcher(){var _this2=this;$(window).on('resize.zf.mediaquery',function(){var newSize=_this2._getCurrentSize();if(newSize!==_this2.current){// Broadcast the media query change on the window
$(window).trigger('changed.zf.mediaquery',[newSize,_this2.current]);// Change the current media query
_this2.current=newSize;}});}};Foundation.MediaQuery=MediaQuery;// matchMedia() polyfill - Test a CSS media type/query in JS.
// Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
window.matchMedia||(window.matchMedia=function(){'use strict';// For browsers that support matchMedium api such as IE 9 and webkit
var styleMedia=window.styleMedia||window.media;// For those that don't support matchMedium
if(!styleMedia){var style=document.createElement('style'),script=document.getElementsByTagName('script')[0],info=null;style.type='text/css';style.id='matchmediajs-test';script.parentNode.insertBefore(style,script);// 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
info='getComputedStyle'in window&&window.getComputedStyle(style,null)||style.currentStyle;styleMedia={matchMedium:function matchMedium(media){var text='@media '+media+'{ #matchmediajs-test { width: 1px; } }';// 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
if(style.styleSheet){style.styleSheet.cssText=text;}else{style.textContent=text;}// Test if media query is true or false
return info.width==='1px';}};}return function(media){return{matches:styleMedia.matchMedium(media||'all'),media:media||'all'};};}());// Thank you: https://github.com/sindresorhus/query-string
function parseStyleToObject(str){var styleObject={};if(typeof str!=='string'){return styleObject;}str=str.trim().slice(1,-1);// browsers re-quote string style values
if(!str){return styleObject;}styleObject=str.split('&').reduce(function(ret,param){var parts=param.replace(/\+/g,' ').split('=');var key=parts[0];var val=parts[1];key=decodeURIComponent(key);// missing `=` should be `null`:
// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
val=val===undefined?null:decodeURIComponent(val);if(!ret.hasOwnProperty(key)){ret[key]=val;}else if(Array.isArray(ret[key])){ret[key].push(val);}else{ret[key]=[ret[key],val];}return ret;},{});return styleObject;}Foundation.MediaQuery=MediaQuery;}(jQuery);'use strict';!function($){/**
 * Motion module.
 * @module foundation.motion
 */var initClasses=['mui-enter','mui-leave'];var activeClasses=['mui-enter-active','mui-leave-active'];var Motion={animateIn:function animateIn(element,animation,cb){animate(true,element,animation,cb);},animateOut:function animateOut(element,animation,cb){animate(false,element,animation,cb);}};function Move(duration,elem,fn){var anim,prog,start=null;// console.log('called');
function move(ts){if(!start)start=window.performance.now();// console.log(start, ts);
prog=ts-start;fn.apply(elem);if(prog<duration){anim=window.requestAnimationFrame(move,elem);}else{window.cancelAnimationFrame(anim);elem.trigger('finished.zf.animate',[elem]).triggerHandler('finished.zf.animate',[elem]);}}anim=window.requestAnimationFrame(move);}/**
 * Animates an element in or out using a CSS transition class.
 * @function
 * @private
 * @param {Boolean} isIn - Defines if the animation is in or out.
 * @param {Object} element - jQuery or HTML object to animate.
 * @param {String} animation - CSS class to use.
 * @param {Function} cb - Callback to run when animation is finished.
 */function animate(isIn,element,animation,cb){element=$(element).eq(0);if(!element.length)return;var initClass=isIn?initClasses[0]:initClasses[1];var activeClass=isIn?activeClasses[0]:activeClasses[1];// Set up the animation
reset();element.addClass(animation).css('transition','none');requestAnimationFrame(function(){element.addClass(initClass);if(isIn)element.show();});// Start the animation
requestAnimationFrame(function(){element[0].offsetWidth;element.css('transition','').addClass(activeClass);});// Clean up the animation when it finishes
element.one(Foundation.transitionend(element),finish);// Hides the element (for out animations), resets the element, and runs a callback
function finish(){if(!isIn)element.hide();reset();if(cb)cb.apply(element);}// Resets transitions and removes motion-specific classes
function reset(){element[0].style.transitionDuration=0;element.removeClass(initClass+' '+activeClass+' '+animation);}}Foundation.Move=Move;Foundation.Motion=Motion;}(jQuery);'use strict';!function($){var Nest={Feather:function Feather(menu){var type=arguments.length<=1||arguments[1]===undefined?'zf':arguments[1];menu.attr('role','menubar');var items=menu.find('li').attr({'role':'menuitem'}),subMenuClass='is-'+type+'-submenu',subItemClass=subMenuClass+'-item',hasSubClass='is-'+type+'-submenu-parent';menu.find('a:first').attr('tabindex',0);items.each(function(){var $item=$(this),$sub=$item.children('ul');if($sub.length){$item.addClass(hasSubClass).attr({'aria-haspopup':true,'aria-expanded':false,'aria-label':$item.children('a:first').text()});$sub.addClass('submenu '+subMenuClass).attr({'data-submenu':'','aria-hidden':true,'role':'menu'});}if($item.parent('[data-submenu]').length){$item.addClass('is-submenu-item '+subItemClass);}});return;},Burn:function Burn(menu,type){var items=menu.find('li').removeAttr('tabindex'),subMenuClass='is-'+type+'-submenu',subItemClass=subMenuClass+'-item',hasSubClass='is-'+type+'-submenu-parent';menu.find('*').removeClass(subMenuClass+' '+subItemClass+' '+hasSubClass+' is-submenu-item submenu is-active').removeAttr('data-submenu').css('display','');// console.log(      menu.find('.' + subMenuClass + ', .' + subItemClass + ', .has-submenu, .is-submenu-item, .submenu, [data-submenu]')
//           .removeClass(subMenuClass + ' ' + subItemClass + ' has-submenu is-submenu-item submenu')
//           .removeAttr('data-submenu'));
// items.each(function(){
//   var $item = $(this),
//       $sub = $item.children('ul');
//   if($item.parent('[data-submenu]').length){
//     $item.removeClass('is-submenu-item ' + subItemClass);
//   }
//   if($sub.length){
//     $item.removeClass('has-submenu');
//     $sub.removeClass('submenu ' + subMenuClass).removeAttr('data-submenu');
//   }
// });
}};Foundation.Nest=Nest;}(jQuery);'use strict';!function($){function Timer(elem,options,cb){var _this=this,duration=options.duration,//options is an object for easily adding features later.
nameSpace=Object.keys(elem.data())[0]||'timer',remain=-1,start,timer;this.isPaused=false;this.restart=function(){remain=-1;clearTimeout(timer);this.start();};this.start=function(){this.isPaused=false;// if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
clearTimeout(timer);remain=remain<=0?duration:remain;elem.data('paused',false);start=Date.now();timer=setTimeout(function(){if(options.infinite){_this.restart();//rerun the timer.
}cb();},remain);elem.trigger('timerstart.zf.'+nameSpace);};this.pause=function(){this.isPaused=true;//if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
clearTimeout(timer);elem.data('paused',true);var end=Date.now();remain=remain-(end-start);elem.trigger('timerpaused.zf.'+nameSpace);};}/**
 * Runs a callback function when images are fully loaded.
 * @param {Object} images - Image(s) to check if loaded.
 * @param {Func} callback - Function to execute when image is fully loaded.
 */function onImagesLoaded(images,callback){var self=this,unloaded=images.length;if(unloaded===0){callback();}images.each(function(){if(this.complete){singleImageLoaded();}else if(typeof this.naturalWidth!=='undefined'&&this.naturalWidth>0){singleImageLoaded();}else{$(this).one('load',function(){singleImageLoaded();});}});function singleImageLoaded(){unloaded--;if(unloaded===0){callback();}}}Foundation.Timer=Timer;Foundation.onImagesLoaded=onImagesLoaded;}(jQuery);//**************************************************
//**Work inspired by multiple jquery swipe plugins**
//**Done by Yohai Ararat ***************************
//**************************************************
(function($){$.spotSwipe={version:'1.0.0',enabled:'ontouchstart'in document.documentElement,preventDefault:false,moveThreshold:75,timeThreshold:200};var startPosX,startPosY,startTime,elapsedTime,isMoving=false;function onTouchEnd(){//  alert(this);
this.removeEventListener('touchmove',onTouchMove);this.removeEventListener('touchend',onTouchEnd);isMoving=false;}function onTouchMove(e){if($.spotSwipe.preventDefault){e.preventDefault();}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startPosX-x;var dy=startPosY-y;var dir;elapsedTime=new Date().getTime()-startTime;if(Math.abs(dx)>=$.spotSwipe.moveThreshold&&elapsedTime<=$.spotSwipe.timeThreshold){dir=dx>0?'left':'right';}// else if(Math.abs(dy) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
//   dir = dy > 0 ? 'down' : 'up';
// }
if(dir){e.preventDefault();onTouchEnd.call(this);$(this).trigger('swipe',dir).trigger('swipe'+dir);}}}function onTouchStart(e){if(e.touches.length==1){startPosX=e.touches[0].pageX;startPosY=e.touches[0].pageY;isMoving=true;startTime=new Date().getTime();this.addEventListener('touchmove',onTouchMove,false);this.addEventListener('touchend',onTouchEnd,false);}}function init(){this.addEventListener&&this.addEventListener('touchstart',onTouchStart,false);}function teardown(){this.removeEventListener('touchstart',onTouchStart);}$.event.special.swipe={setup:init};$.each(['left','up','down','right'],function(){$.event.special['swipe'+this]={setup:function setup(){$(this).on('swipe',$.noop);}};});})(jQuery);/****************************************************
 * Method for adding psuedo drag events to elements *
 ***************************************************/!function($){$.fn.addTouch=function(){this.each(function(i,el){$(el).bind('touchstart touchmove touchend touchcancel',function(){//we pass the original event object because the jQuery event
//object is normalized to w3c specs and does not provide the TouchList
handleTouch(event);});});var handleTouch=function handleTouch(event){var touches=event.changedTouches,first=touches[0],eventTypes={touchstart:'mousedown',touchmove:'mousemove',touchend:'mouseup'},type=eventTypes[event.type],simulatedEvent;if('MouseEvent'in window&&typeof window.MouseEvent==='function'){simulatedEvent=window.MouseEvent(type,{'bubbles':true,'cancelable':true,'screenX':first.screenX,'screenY':first.screenY,'clientX':first.clientX,'clientY':first.clientY});}else{simulatedEvent=document.createEvent('MouseEvent');simulatedEvent.initMouseEvent(type,true,true,window,1,first.screenX,first.screenY,first.clientX,first.clientY,false,false,false,false,0/*left*/,null);}first.target.dispatchEvent(simulatedEvent);};};}(jQuery);//**********************************
//**From the jQuery Mobile Library**
//**need to recreate functionality**
//**and try to improve if possible**
//**********************************
/* Removing the jQuery function ****
************************************

(function( $, window, undefined ) {

	var $document = $( document ),
		// supportTouch = $.mobile.support.touch,
		touchStartEvent = 'touchstart'//supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = 'touchend'//supportTouch ? "touchend" : "mouseup",
		touchMoveEvent = 'touchmove'//supportTouch ? "touchmove" : "mousemove";

	// setup new event shortcuts
	$.each( ( "touchstart touchmove touchend " +
		"swipe swipeleft swiperight" ).split( " " ), function( i, name ) {

		$.fn[ name ] = function( fn ) {
			return fn ? this.bind( name, fn ) : this.trigger( name );
		};

		// jQuery < 1.8
		if ( $.attrFn ) {
			$.attrFn[ name ] = true;
		}
	});

	function triggerCustomEvent( obj, eventType, event, bubble ) {
		var originalType = event.type;
		event.type = eventType;
		if ( bubble ) {
			$.event.trigger( event, undefined, obj );
		} else {
			$.event.dispatch.call( obj, event );
		}
		event.type = originalType;
	}

	// also handles taphold

	// Also handles swipeleft, swiperight
	$.event.special.swipe = {

		// More than this horizontal displacement, and we will suppress scrolling.
		scrollSupressionThreshold: 30,

		// More time than this, and it isn't a swipe.
		durationThreshold: 1000,

		// Swipe horizontal displacement must be more than this.
		horizontalDistanceThreshold: window.devicePixelRatio >= 2 ? 15 : 30,

		// Swipe vertical displacement must be less than this.
		verticalDistanceThreshold: window.devicePixelRatio >= 2 ? 15 : 30,

		getLocation: function ( event ) {
			var winPageX = window.pageXOffset,
				winPageY = window.pageYOffset,
				x = event.clientX,
				y = event.clientY;

			if ( event.pageY === 0 && Math.floor( y ) > Math.floor( event.pageY ) ||
				event.pageX === 0 && Math.floor( x ) > Math.floor( event.pageX ) ) {

				// iOS4 clientX/clientY have the value that should have been
				// in pageX/pageY. While pageX/page/ have the value 0
				x = x - winPageX;
				y = y - winPageY;
			} else if ( y < ( event.pageY - winPageY) || x < ( event.pageX - winPageX ) ) {

				// Some Android browsers have totally bogus values for clientX/Y
				// when scrolling/zooming a page. Detectable since clientX/clientY
				// should never be smaller than pageX/pageY minus page scroll
				x = event.pageX - winPageX;
				y = event.pageY - winPageY;
			}

			return {
				x: x,
				y: y
			};
		},

		start: function( event ) {
			var data = event.originalEvent.touches ?
					event.originalEvent.touches[ 0 ] : event,
				location = $.event.special.swipe.getLocation( data );
			return {
						time: ( new Date() ).getTime(),
						coords: [ location.x, location.y ],
						origin: $( event.target )
					};
		},

		stop: function( event ) {
			var data = event.originalEvent.touches ?
					event.originalEvent.touches[ 0 ] : event,
				location = $.event.special.swipe.getLocation( data );
			return {
						time: ( new Date() ).getTime(),
						coords: [ location.x, location.y ]
					};
		},

		handleSwipe: function( start, stop, thisObject, origTarget ) {
			if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
				Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
				Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {
				var direction = start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight";

				triggerCustomEvent( thisObject, "swipe", $.Event( "swipe", { target: origTarget, swipestart: start, swipestop: stop }), true );
				triggerCustomEvent( thisObject, direction,$.Event( direction, { target: origTarget, swipestart: start, swipestop: stop } ), true );
				return true;
			}
			return false;

		},

		// This serves as a flag to ensure that at most one swipe event event is
		// in work at any given time
		eventInProgress: false,

		setup: function() {
			var events,
				thisObject = this,
				$this = $( thisObject ),
				context = {};

			// Retrieve the events data for this element and add the swipe context
			events = $.data( this, "mobile-events" );
			if ( !events ) {
				events = { length: 0 };
				$.data( this, "mobile-events", events );
			}
			events.length++;
			events.swipe = context;

			context.start = function( event ) {

				// Bail if we're already working on a swipe event
				if ( $.event.special.swipe.eventInProgress ) {
					return;
				}
				$.event.special.swipe.eventInProgress = true;

				var stop,
					start = $.event.special.swipe.start( event ),
					origTarget = event.target,
					emitted = false;

				context.move = function( event ) {
					if ( !start || event.isDefaultPrevented() ) {
						return;
					}

					stop = $.event.special.swipe.stop( event );
					if ( !emitted ) {
						emitted = $.event.special.swipe.handleSwipe( start, stop, thisObject, origTarget );
						if ( emitted ) {

							// Reset the context to make way for the next swipe event
							$.event.special.swipe.eventInProgress = false;
						}
					}
					// prevent scrolling
					if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold ) {
						event.preventDefault();
					}
				};

				context.stop = function() {
						emitted = true;

						// Reset the context to make way for the next swipe event
						$.event.special.swipe.eventInProgress = false;
						$document.off( touchMoveEvent, context.move );
						context.move = null;
				};

				$document.on( touchMoveEvent, context.move )
					.one( touchStopEvent, context.stop );
			};
			$this.on( touchStartEvent, context.start );
		},

		teardown: function() {
			var events, context;

			events = $.data( this, "mobile-events" );
			if ( events ) {
				context = events.swipe;
				delete events.swipe;
				events.length--;
				if ( events.length === 0 ) {
					$.removeData( this, "mobile-events" );
				}
			}

			if ( context ) {
				if ( context.start ) {
					$( this ).off( touchStartEvent, context.start );
				}
				if ( context.move ) {
					$document.off( touchMoveEvent, context.move );
				}
				if ( context.stop ) {
					$document.off( touchStopEvent, context.stop );
				}
			}
		}
	};
	$.each({
		swipeleft: "swipe.left",
		swiperight: "swipe.right"
	}, function( event, sourceEvent ) {

		$.event.special[ event ] = {
			setup: function() {
				$( this ).bind( sourceEvent, $.noop );
			},
			teardown: function() {
				$( this ).unbind( sourceEvent );
			}
		};
	});
})( jQuery, this );
*/'use strict';!function($){var MutationObserver=function(){var prefixes=['WebKit','Moz','O','Ms',''];for(var i=0;i<prefixes.length;i++){if(prefixes[i]+'MutationObserver'in window){return window[prefixes[i]+'MutationObserver'];}}return false;}();var triggers=function triggers(el,type){el.data(type).split(' ').forEach(function(id){$('#'+id)[type==='close'?'trigger':'triggerHandler'](type+'.zf.trigger',[el]);});};// Elements with [data-open] will reveal a plugin that supports it when clicked.
$(document).on('click.zf.trigger','[data-open]',function(){triggers($(this),'open');});// Elements with [data-close] will close a plugin that supports it when clicked.
// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
$(document).on('click.zf.trigger','[data-close]',function(){var id=$(this).data('close');if(id){triggers($(this),'close');}else{$(this).trigger('close.zf.trigger');}});// Elements with [data-toggle] will toggle a plugin that supports it when clicked.
$(document).on('click.zf.trigger','[data-toggle]',function(){triggers($(this),'toggle');});// Elements with [data-closable] will respond to close.zf.trigger events.
$(document).on('close.zf.trigger','[data-closable]',function(e){e.stopPropagation();var animation=$(this).data('closable');if(animation!==''){Foundation.Motion.animateOut($(this),animation,function(){$(this).trigger('closed.zf');});}else{$(this).fadeOut().trigger('closed.zf');}});$(document).on('focus.zf.trigger blur.zf.trigger','[data-toggle-focus]',function(){var id=$(this).data('toggle-focus');$('#'+id).triggerHandler('toggle.zf.trigger',[$(this)]);});/**
* Fires once after all other scripts have loaded
* @function
* @private
*/$(window).load(function(){checkListeners();});function checkListeners(){eventsListener();resizeListener();scrollListener();closemeListener();}//******** only fires this function once on load, if there's something to watch ********
function closemeListener(pluginName){var yetiBoxes=$('[data-yeti-box]'),plugNames=['dropdown','tooltip','reveal'];if(pluginName){if(typeof pluginName==='string'){plugNames.push(pluginName);}else if((typeof pluginName==='undefined'?'undefined':_typeof(pluginName))==='object'&&typeof pluginName[0]==='string'){plugNames.concat(pluginName);}else{console.error('Plugin names must be strings');}}if(yetiBoxes.length){var listeners=plugNames.map(function(name){return'closeme.zf.'+name;}).join(' ');$(window).off(listeners).on(listeners,function(e,pluginId){var plugin=e.namespace.split('.')[0];var plugins=$('[data-'+plugin+']').not('[data-yeti-box="'+pluginId+'"]');plugins.each(function(){var _this=$(this);_this.triggerHandler('close.zf.trigger',[_this]);});});}}function resizeListener(debounce){var timer=void 0,$nodes=$('[data-resize]');if($nodes.length){$(window).off('resize.zf.trigger').on('resize.zf.trigger',function(e){if(timer){clearTimeout(timer);}timer=setTimeout(function(){if(!MutationObserver){//fallback for IE 9
$nodes.each(function(){$(this).triggerHandler('resizeme.zf.trigger');});}//trigger all listening elements and signal a resize event
$nodes.attr('data-events',"resize");},debounce||10);//default time to emit resize event
});}}function scrollListener(debounce){var timer=void 0,$nodes=$('[data-scroll]');if($nodes.length){$(window).off('scroll.zf.trigger').on('scroll.zf.trigger',function(e){if(timer){clearTimeout(timer);}timer=setTimeout(function(){if(!MutationObserver){//fallback for IE 9
$nodes.each(function(){$(this).triggerHandler('scrollme.zf.trigger');});}//trigger all listening elements and signal a scroll event
$nodes.attr('data-events',"scroll");},debounce||10);//default time to emit scroll event
});}}function eventsListener(){if(!MutationObserver){return false;}var nodes=document.querySelectorAll('[data-resize], [data-scroll], [data-mutate]');//element callback
var listeningElementsMutation=function listeningElementsMutation(mutationRecordsList){var $target=$(mutationRecordsList[0].target);//trigger the event handler for the element depending on type
switch($target.attr("data-events")){case"resize":$target.triggerHandler('resizeme.zf.trigger',[$target]);break;case"scroll":$target.triggerHandler('scrollme.zf.trigger',[$target,window.pageYOffset]);break;// case "mutate" :
// console.log('mutate', $target);
// $target.triggerHandler('mutate.zf.trigger');
//
// //make sure we don't get stuck in an infinite loop from sloppy codeing
// if ($target.index('[data-mutate]') == $("[data-mutate]").length-1) {
//   domMutationObserver();
// }
// break;
default:return false;//nothing
}};if(nodes.length){//for each element that needs to listen for resizing, scrolling, (or coming soon mutation) add a single observer
for(var i=0;i<=nodes.length-1;i++){var elementObserver=new MutationObserver(listeningElementsMutation);elementObserver.observe(nodes[i],{attributes:true,childList:false,characterData:false,subtree:false,attributeFilter:["data-events"]});}}}// ------------------------------------
// [PH]
// Foundation.CheckWatchers = checkWatchers;
Foundation.IHearYou=checkListeners;// Foundation.ISeeYou = scrollListener;
// Foundation.IFeelYou = closemeListener;
}(jQuery);// function domMutationObserver(debounce) {
//   // !!! This is coming soon and needs more work; not active  !!! //
//   var timer,
//   nodes = document.querySelectorAll('[data-mutate]');
//   //
//   if (nodes.length) {
//     // var MutationObserver = (function () {
//     //   var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
//     //   for (var i=0; i < prefixes.length; i++) {
//     //     if (prefixes[i] + 'MutationObserver' in window) {
//     //       return window[prefixes[i] + 'MutationObserver'];
//     //     }
//     //   }
//     //   return false;
//     // }());
//
//
//     //for the body, we need to listen for all changes effecting the style and class attributes
//     var bodyObserver = new MutationObserver(bodyMutation);
//     bodyObserver.observe(document.body, { attributes: true, childList: true, characterData: false, subtree:true, attributeFilter:["style", "class"]});
//
//
//     //body callback
//     function bodyMutation(mutate) {
//       //trigger all listening elements and signal a mutation event
//       if (timer) { clearTimeout(timer); }
//
//       timer = setTimeout(function() {
//         bodyObserver.disconnect();
//         $('[data-mutate]').attr('data-events',"mutate");
//       }, debounce || 150);
//     }
//   }
// }
'use strict';!function($){/**
 * Abide module.
 * @module foundation.abide
 */var Abide=function(){/**
   * Creates a new instance of Abide.
   * @class
   * @fires Abide#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */function Abide(element){var options=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];_classCallCheck(this,Abide);this.$element=element;this.options=$.extend({},Abide.defaults,this.$element.data(),options);this._init();Foundation.registerPlugin(this,'Abide');}/**
   * Initializes the Abide plugin and calls functions to get Abide functioning on load.
   * @private
   */_createClass(Abide,[{key:'_init',value:function _init(){this.$inputs=this.$element.find('input, textarea, select').not('[data-abide-ignore]');this._events();}/**
   * Initializes events for Abide.
   * @private
   */},{key:'_events',value:function _events(){var _this3=this;this.$element.off('.abide').on('reset.zf.abide',function(){_this3.resetForm();}).on('submit.zf.abide',function(){return _this3.validateForm();});if(this.options.validateOn==='fieldChange'){this.$inputs.off('change.zf.abide').on('change.zf.abide',function(e){_this3.validateInput($(e.target));});}if(this.options.liveValidate){this.$inputs.off('input.zf.abide').on('input.zf.abide',function(e){_this3.validateInput($(e.target));});}}/**
   * Calls necessary functions to update Abide upon DOM change
   * @private
   */},{key:'_reflow',value:function _reflow(){this._init();}/**
   * Checks whether or not a form element has the required attribute and if it's checked or not
   * @param {Object} element - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */},{key:'requiredCheck',value:function requiredCheck($el){if(!$el.attr('required'))return true;var isGood=true;switch($el[0].type){case'checkbox':case'radio':isGood=$el[0].checked;break;case'select':case'select-one':case'select-multiple':var opt=$el.find('option:selected');if(!opt.length||!opt.val())isGood=false;break;default:if(!$el.val()||!$el.val().length)isGood=false;}return isGood;}/**
   * Based on $el, get the first element with selector in this order:
   * 1. The element's direct sibling('s).
   * 3. The element's parent's children.
   *
   * This allows for multiple form errors per input, though if none are found, no form errors will be shown.
   *
   * @param {Object} $el - jQuery object to use as reference to find the form error selector.
   * @returns {Object} jQuery object with the selector.
   */},{key:'findFormError',value:function findFormError($el){var $error=$el.siblings(this.options.formErrorSelector);if(!$error.length){$error=$el.parent().find(this.options.formErrorSelector);}return $error;}/**
   * Get the first element in this order:
   * 2. The <label> with the attribute `[for="someInputId"]`
   * 3. The `.closest()` <label>
   *
   * @param {Object} $el - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */},{key:'findLabel',value:function findLabel($el){var id=$el[0].id;var $label=this.$element.find('label[for="'+id+'"]');if(!$label.length){return $el.closest('label');}return $label;}/**
   * Adds the CSS error class as specified by the Abide settings to the label, input, and the form
   * @param {Object} $el - jQuery object to add the class to
   */},{key:'addErrorClasses',value:function addErrorClasses($el){var $label=this.findLabel($el);var $formError=this.findFormError($el);if($label.length){$label.addClass(this.options.labelErrorClass);}if($formError.length){$formError.addClass(this.options.formErrorClass);}$el.addClass(this.options.inputErrorClass).attr('data-invalid','');}/**
   * Removes CSS error class as specified by the Abide settings from the label, input, and the form
   * @param {Object} $el - jQuery object to remove the class from
   */},{key:'removeErrorClasses',value:function removeErrorClasses($el){var $label=this.findLabel($el);var $formError=this.findFormError($el);if($label.length){$label.removeClass(this.options.labelErrorClass);}if($formError.length){$formError.removeClass(this.options.formErrorClass);}$el.removeClass(this.options.inputErrorClass).removeAttr('data-invalid');}/**
   * Goes through a form to find inputs and proceeds to validate them in ways specific to their type
   * @fires Abide#invalid
   * @fires Abide#valid
   * @param {Object} element - jQuery object to validate, should be an HTML input
   * @returns {Boolean} goodToGo - If the input is valid or not.
   */},{key:'validateInput',value:function validateInput($el){var clearRequire=this.requiredCheck($el),validated=false,customValidator=true,validator=$el.attr('data-validator'),equalTo=true;switch($el[0].type){case'radio':validated=this.validateRadio($el.attr('name'));break;case'checkbox':validated=clearRequire;break;case'select':case'select-one':case'select-multiple':validated=clearRequire;break;default:validated=this.validateText($el);}if(validator){customValidator=this.matchValidation($el,validator,$el.attr('required'));}if($el.attr('data-equalto')){equalTo=this.options.validators.equalTo($el);}var goodToGo=[clearRequire,validated,customValidator,equalTo].indexOf(false)===-1;var message=(goodToGo?'valid':'invalid')+'.zf.abide';this[goodToGo?'removeErrorClasses':'addErrorClasses']($el);/**
     * Fires when the input is done checking for validation. Event trigger is either `valid.zf.abide` or `invalid.zf.abide`
     * Trigger includes the DOM element of the input.
     * @event Abide#valid
     * @event Abide#invalid
     */$el.trigger(message,[$el]);return goodToGo;}/**
   * Goes through a form and if there are any invalid inputs, it will display the form error element
   * @returns {Boolean} noError - true if no errors were detected...
   * @fires Abide#formvalid
   * @fires Abide#forminvalid
   */},{key:'validateForm',value:function validateForm(){var acc=[];var _this=this;this.$inputs.each(function(){acc.push(_this.validateInput($(this)));});var noError=acc.indexOf(false)===-1;this.$element.find('[data-abide-error]').css('display',noError?'none':'block');/**
     * Fires when the form is finished validating. Event trigger is either `formvalid.zf.abide` or `forminvalid.zf.abide`.
     * Trigger includes the element of the form.
     * @event Abide#formvalid
     * @event Abide#forminvalid
     */this.$element.trigger((noError?'formvalid':'forminvalid')+'.zf.abide',[this.$element]);return noError;}/**
   * Determines whether or a not a text input is valid based on the pattern specified in the attribute. If no matching pattern is found, returns true.
   * @param {Object} $el - jQuery object to validate, should be a text input HTML element
   * @param {String} pattern - string value of one of the RegEx patterns in Abide.options.patterns
   * @returns {Boolean} Boolean value depends on whether or not the input value matches the pattern specified
   */},{key:'validateText',value:function validateText($el,pattern){// pattern = pattern ? pattern : $el.attr('pattern') ? $el.attr('pattern') : $el.attr('type');
pattern=pattern||$el.attr('pattern')||$el.attr('type');var inputText=$el.val();// if text, check if the pattern exists, if so, test it, if no text or no pattern, return true.
return inputText.length?this.options.patterns.hasOwnProperty(pattern)?this.options.patterns[pattern].test(inputText):pattern&&pattern!==$el.attr('type')?new RegExp(pattern).test(inputText):true:true;}/**
   * Determines whether or a not a radio input is valid based on whether or not it is required and selected
   * @param {String} groupName - A string that specifies the name of a radio button group
   * @returns {Boolean} Boolean value depends on whether or not at least one radio input has been selected (if it's required)
   */},{key:'validateRadio',value:function validateRadio(groupName){var $group=this.$element.find(':radio[name="'+groupName+'"]'),counter=[],_this=this;$group.each(function(){var rdio=$(this),clear=_this.requiredCheck(rdio);counter.push(clear);if(clear)_this.removeErrorClasses(rdio);});return counter.indexOf(false)===-1;}/**
   * Determines if a selected input passes a custom validation function. Multiple validations can be used, if passed to the element with `data-validator="foo bar baz"` in a space separated listed.
   * @param {Object} $el - jQuery input element.
   * @param {String} validators - a string of function names matching functions in the Abide.options.validators object.
   * @param {Boolean} required - self explanatory?
   * @returns {Boolean} - true if validations passed.
   */},{key:'matchValidation',value:function matchValidation($el,validators,required){var _this4=this;required=required?true:false;var clear=validators.split(' ').map(function(v){return _this4.options.validators[v]($el,required,$el.parent());});return clear.indexOf(false)===-1;}/**
   * Resets form inputs and styles
   * @fires Abide#formreset
   */},{key:'resetForm',value:function resetForm(){var $form=this.$element,opts=this.options;$('.'+opts.labelErrorClass,$form).not('small').removeClass(opts.labelErrorClass);$('.'+opts.inputErrorClass,$form).not('small').removeClass(opts.inputErrorClass);$(opts.formErrorSelector+'.'+opts.formErrorClass).removeClass(opts.formErrorClass);$form.find('[data-abide-error]').css('display','none');$(':input',$form).not(':button, :submit, :reset, :hidden, [data-abide-ignore]').val('').removeAttr('data-invalid');/**
     * Fires when the form has been reset.
     * @event Abide#formreset
     */$form.trigger('formreset.zf.abide',[$form]);}/**
   * Destroys an instance of Abide.
   * Removes error styles and classes from elements, without resetting their values.
   */},{key:'destroy',value:function destroy(){var _this=this;this.$element.off('.abide').find('[data-abide-error]').css('display','none');this.$inputs.off('.abide').each(function(){_this.removeErrorClasses($(this));});Foundation.unregisterPlugin(this);}}]);return Abide;}();/**
 * Default settings for plugin
 */Abide.defaults={/**
   * The default event to validate inputs. Checkboxes and radios validate immediately.
   * Remove or change this value for manual validation.
   * @option
   * @example 'fieldChange'
   */validateOn:'fieldChange',/**
   * Class to be applied to input labels on failed validation.
   * @option
   * @example 'is-invalid-label'
   */labelErrorClass:'is-invalid-label',/**
   * Class to be applied to inputs on failed validation.
   * @option
   * @example 'is-invalid-input'
   */inputErrorClass:'is-invalid-input',/**
   * Class selector to use to target Form Errors for show/hide.
   * @option
   * @example '.form-error'
   */formErrorSelector:'.form-error',/**
   * Class added to Form Errors on failed validation.
   * @option
   * @example 'is-visible'
   */formErrorClass:'is-visible',/**
   * Set to true to validate text inputs on any value change.
   * @option
   * @example false
   */liveValidate:false,patterns:{alpha:/^[a-zA-Z]+$/,alpha_numeric:/^[a-zA-Z0-9]+$/,integer:/^[-+]?\d+$/,number:/^[-+]?\d*(?:[\.\,]\d+)?$/,// amex, visa, diners
card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,// http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,url:/^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,// abc.de
domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,datetime:/^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,// YYYY-MM-DD
date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,// HH:MM:SS
time:/^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,dateISO:/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,// MM/DD/YYYY
month_day_year:/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,// DD/MM/YYYY
day_month_year:/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,// #FFF or #FFFFFF
color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/},/**
   * Optional validation functions to be used. `equalTo` being the only default included function.
   * Functions should return only a boolean if the input is valid or not. Functions are given the following arguments:
   * el : The jQuery element to validate.
   * required : Boolean value of the required attribute be present or not.
   * parent : The direct parent of the input.
   * @option
   */validators:{equalTo:function equalTo(el,required,parent){return $('#'+el.attr('data-equalto')).val()===el.val();}}};// Window exports
Foundation.plugin(Abide,'Abide');}(jQuery);'use strict';!function($){/**
 * Accordion module.
 * @module foundation.accordion
 * @requires foundation.util.keyboard
 * @requires foundation.util.motion
 */var Accordion=function(){/**
   * Creates a new instance of an accordion.
   * @class
   * @fires Accordion#init
   * @param {jQuery} element - jQuery object to make into an accordion.
   * @param {Object} options - a plain object with settings to override the default options.
   */function Accordion(element,options){_classCallCheck(this,Accordion);this.$element=element;this.options=$.extend({},Accordion.defaults,this.$element.data(),options);this._init();Foundation.registerPlugin(this,'Accordion');Foundation.Keyboard.register('Accordion',{'ENTER':'toggle','SPACE':'toggle','ARROW_DOWN':'next','ARROW_UP':'previous'});}/**
   * Initializes the accordion by animating the preset active pane(s).
   * @private
   */_createClass(Accordion,[{key:'_init',value:function _init(){this.$element.attr('role','tablist');this.$tabs=this.$element.children('li');if(this.$tabs.length===0){this.$tabs=this.$element.children('[data-accordion-item]');}this.$tabs.each(function(idx,el){var $el=$(el),$content=$el.find('[data-tab-content]'),id=$content[0].id||Foundation.GetYoDigits(6,'accordion'),linkId=el.id||id+'-label';$el.find('a:first').attr({'aria-controls':id,'role':'tab','id':linkId,'aria-expanded':false,'aria-selected':false});$content.attr({'role':'tabpanel','aria-labelledby':linkId,'aria-hidden':true,'id':id});});var $initActive=this.$element.find('.is-active').children('[data-tab-content]');if($initActive.length){this.down($initActive,true);}this._events();}/**
   * Adds event handlers for items within the accordion.
   * @private
   */},{key:'_events',value:function _events(){var _this=this;this.$tabs.each(function(){var $elem=$(this);var $tabContent=$elem.children('[data-tab-content]');if($tabContent.length){$elem.children('a').off('click.zf.accordion keydown.zf.accordion').on('click.zf.accordion',function(e){// $(this).children('a').on('click.zf.accordion', function(e) {
e.preventDefault();if($elem.hasClass('is-active')){if(_this.options.allowAllClosed||$elem.siblings().hasClass('is-active')){_this.up($tabContent);}}else{_this.down($tabContent);}}).on('keydown.zf.accordion',function(e){Foundation.Keyboard.handleKey(e,'Accordion',{toggle:function toggle(){_this.toggle($tabContent);},next:function next(){$elem.next().find('a').focus().trigger('click.zf.accordion');},previous:function previous(){$elem.prev().find('a').focus().trigger('click.zf.accordion');},handled:function handled(){e.preventDefault();e.stopPropagation();}});});}});}/**
   * Toggles the selected content pane's open/close state.
   * @param {jQuery} $target - jQuery object of the pane to toggle.
   * @function
   */},{key:'toggle',value:function toggle($target){if($target.parent().hasClass('is-active')){if(this.options.allowAllClosed||$target.parent().siblings().hasClass('is-active')){this.up($target);}else{return;}}else{this.down($target);}}/**
   * Opens the accordion tab defined by `$target`.
   * @param {jQuery} $target - Accordion pane to open.
   * @param {Boolean} firstTime - flag to determine if reflow should happen.
   * @fires Accordion#down
   * @function
   */},{key:'down',value:function down($target,firstTime){var _this=this;if(!this.options.multiExpand&&!firstTime){var $currentActive=this.$element.find('.is-active').children('[data-tab-content]');if($currentActive.length){this.up($currentActive);}}$target.attr('aria-hidden',false).parent('[data-tab-content]').addBack().parent().addClass('is-active');// Foundation.Move(_this.options.slideSpeed, $target, function(){
$target.slideDown(_this.options.slideSpeed,function(){/**
         * Fires when the tab is done opening.
         * @event Accordion#down
         */_this.$element.trigger('down.zf.accordion',[$target]);});// });
// if(!firstTime){
//   Foundation._reflow(this.$element.attr('data-accordion'));
// }
$('#'+$target.attr('aria-labelledby')).attr({'aria-expanded':true,'aria-selected':true});}/**
   * Closes the tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to close.
   * @fires Accordion#up
   * @function
   */},{key:'up',value:function up($target){var $aunts=$target.parent().siblings(),_this=this;var canClose=this.options.multiExpand?$aunts.hasClass('is-active'):$target.parent().hasClass('is-active');if(!this.options.allowAllClosed&&!canClose){return;}// Foundation.Move(this.options.slideSpeed, $target, function(){
$target.slideUp(_this.options.slideSpeed,function(){/**
         * Fires when the tab is done collapsing up.
         * @event Accordion#up
         */_this.$element.trigger('up.zf.accordion',[$target]);});// });
$target.attr('aria-hidden',true).parent().removeClass('is-active');$('#'+$target.attr('aria-labelledby')).attr({'aria-expanded':false,'aria-selected':false});}/**
   * Destroys an instance of an accordion.
   * @fires Accordion#destroyed
   * @function
   */},{key:'destroy',value:function destroy(){this.$element.find('[data-tab-content]').slideUp(0).css('display','');this.$element.find('a').off('.zf.accordion');Foundation.unregisterPlugin(this);}}]);return Accordion;}();Accordion.defaults={/**
   * Amount of time to animate the opening of an accordion pane.
   * @option
   * @example 250
   */slideSpeed:250,/**
   * Allow the accordion to have multiple open panes.
   * @option
   * @example false
   */multiExpand:false,/**
   * Allow the accordion to close all panes.
   * @option
   * @example false
   */allowAllClosed:false};// Window exports
Foundation.plugin(Accordion,'Accordion');}(jQuery);'use strict';!function($){/**
 * AccordionMenu module.
 * @module foundation.accordionMenu
 * @requires foundation.util.keyboard
 * @requires foundation.util.motion
 * @requires foundation.util.nest
 */var AccordionMenu=function(){/**
   * Creates a new instance of an accordion menu.
   * @class
   * @fires AccordionMenu#init
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */function AccordionMenu(element,options){_classCallCheck(this,AccordionMenu);this.$element=element;this.options=$.extend({},AccordionMenu.defaults,this.$element.data(),options);Foundation.Nest.Feather(this.$element,'accordion');this._init();Foundation.registerPlugin(this,'AccordionMenu');Foundation.Keyboard.register('AccordionMenu',{'ENTER':'toggle','SPACE':'toggle','ARROW_RIGHT':'open','ARROW_UP':'up','ARROW_DOWN':'down','ARROW_LEFT':'close','ESCAPE':'closeAll','TAB':'down','SHIFT_TAB':'up'});}/**
   * Initializes the accordion menu by hiding all nested menus.
   * @private
   */_createClass(AccordionMenu,[{key:'_init',value:function _init(){this.$element.find('[data-submenu]').not('.is-active').slideUp(0);//.find('a').css('padding-left', '1rem');
this.$element.attr({'role':'tablist','aria-multiselectable':this.options.multiOpen});this.$menuLinks=this.$element.find('.is-accordion-submenu-parent');this.$menuLinks.each(function(){var linkId=this.id||Foundation.GetYoDigits(6,'acc-menu-link'),$elem=$(this),$sub=$elem.children('[data-submenu]'),subId=$sub[0].id||Foundation.GetYoDigits(6,'acc-menu'),isActive=$sub.hasClass('is-active');$elem.attr({'aria-controls':subId,'aria-expanded':isActive,'role':'tab','id':linkId});$sub.attr({'aria-labelledby':linkId,'aria-hidden':!isActive,'role':'tabpanel','id':subId});});var initPanes=this.$element.find('.is-active');if(initPanes.length){var _this=this;initPanes.each(function(){_this.down($(this));});}this._events();}/**
   * Adds event handlers for items within the menu.
   * @private
   */},{key:'_events',value:function _events(){var _this=this;this.$element.find('li').each(function(){var $submenu=$(this).children('[data-submenu]');if($submenu.length){$(this).children('a').off('click.zf.accordionMenu').on('click.zf.accordionMenu',function(e){e.preventDefault();_this.toggle($submenu);});}}).on('keydown.zf.accordionmenu',function(e){var $element=$(this),$elements=$element.parent('ul').children('li'),$prevElement,$nextElement,$target=$element.children('[data-submenu]');$elements.each(function(i){if($(this).is($element)){$prevElement=$elements.eq(Math.max(0,i-1));$nextElement=$elements.eq(Math.min(i+1,$elements.length-1));if($(this).children('[data-submenu]:visible').length){// has open sub menu
$nextElement=$element.find('li:first-child');}if($(this).is(':first-child')){// is first element of sub menu
$prevElement=$element.parents('li').first();}else if($prevElement.children('[data-submenu]:visible').length){// if previous element has open sub menu
$prevElement=$prevElement.find('li:last-child');}if($(this).is(':last-child')){// is last element of sub menu
$nextElement=$element.parents('li').first().next('li');}return;}});Foundation.Keyboard.handleKey(e,'AccordionMenu',{open:function open(){if($target.is(':hidden')){_this.down($target);$target.find('li').first().focus();}},close:function close(){if($target.length&&!$target.is(':hidden')){// close active sub of this item
_this.up($target);}else if($element.parent('[data-submenu]').length){// close currently open sub
_this.up($element.parent('[data-submenu]'));$element.parents('li').first().focus();}},up:function up(){$prevElement.focus();},down:function down(){$nextElement.focus();},toggle:function toggle(){if($element.children('[data-submenu]').length){_this.toggle($element.children('[data-submenu]'));}},closeAll:function closeAll(){_this.hideAll();},handled:function handled(){e.preventDefault();e.stopImmediatePropagation();}});});//.attr('tabindex', 0);
}/**
   * Closes all panes of the menu.
   * @function
   */},{key:'hideAll',value:function hideAll(){this.$element.find('[data-submenu]').slideUp(this.options.slideSpeed);}/**
   * Toggles the open/close state of a submenu.
   * @function
   * @param {jQuery} $target - the submenu to toggle
   */},{key:'toggle',value:function toggle($target){if(!$target.is(':animated')){if(!$target.is(':hidden')){this.up($target);}else{this.down($target);}}}/**
   * Opens the sub-menu defined by `$target`.
   * @param {jQuery} $target - Sub-menu to open.
   * @fires AccordionMenu#down
   */},{key:'down',value:function down($target){var _this=this;if(!this.options.multiOpen){this.up(this.$element.find('.is-active').not($target.parentsUntil(this.$element).add($target)));}$target.addClass('is-active').attr({'aria-hidden':false}).parent('.is-accordion-submenu-parent').attr({'aria-expanded':true});Foundation.Move(this.options.slideSpeed,$target,function(){$target.slideDown(_this.options.slideSpeed,function(){/**
           * Fires when the menu is done opening.
           * @event AccordionMenu#down
           */_this.$element.trigger('down.zf.accordionMenu',[$target]);});});}/**
   * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
   * @param {jQuery} $target - Sub-menu to close.
   * @fires AccordionMenu#up
   */},{key:'up',value:function up($target){var _this=this;Foundation.Move(this.options.slideSpeed,$target,function(){$target.slideUp(_this.options.slideSpeed,function(){/**
         * Fires when the menu is done collapsing up.
         * @event AccordionMenu#up
         */_this.$element.trigger('up.zf.accordionMenu',[$target]);});});var $menus=$target.find('[data-submenu]').slideUp(0).addBack().attr('aria-hidden',true);$menus.parent('.is-accordion-submenu-parent').attr('aria-expanded',false);}/**
   * Destroys an instance of accordion menu.
   * @fires AccordionMenu#destroyed
   */},{key:'destroy',value:function destroy(){this.$element.find('[data-submenu]').slideDown(0).css('display','');this.$element.find('a').off('click.zf.accordionMenu');Foundation.Nest.Burn(this.$element,'accordion');Foundation.unregisterPlugin(this);}}]);return AccordionMenu;}();AccordionMenu.defaults={/**
   * Amount of time to animate the opening of a submenu in ms.
   * @option
   * @example 250
   */slideSpeed:250,/**
   * Allow the menu to have multiple open panes.
   * @option
   * @example true
   */multiOpen:true};// Window exports
Foundation.plugin(AccordionMenu,'AccordionMenu');}(jQuery);'use strict';!function($){/**
 * Drilldown module.
 * @module foundation.drilldown
 * @requires foundation.util.keyboard
 * @requires foundation.util.motion
 * @requires foundation.util.nest
 */var Drilldown=function(){/**
   * Creates a new instance of a drilldown menu.
   * @class
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */function Drilldown(element,options){_classCallCheck(this,Drilldown);this.$element=element;this.options=$.extend({},Drilldown.defaults,this.$element.data(),options);Foundation.Nest.Feather(this.$element,'drilldown');this._init();Foundation.registerPlugin(this,'Drilldown');Foundation.Keyboard.register('Drilldown',{'ENTER':'open','SPACE':'open','ARROW_RIGHT':'next','ARROW_UP':'up','ARROW_DOWN':'down','ARROW_LEFT':'previous','ESCAPE':'close','TAB':'down','SHIFT_TAB':'up'});}/**
   * Initializes the drilldown by creating jQuery collections of elements
   * @private
   */_createClass(Drilldown,[{key:'_init',value:function _init(){this.$submenuAnchors=this.$element.find('li.is-drilldown-submenu-parent');this.$submenus=this.$submenuAnchors.children('[data-submenu]');this.$menuItems=this.$element.find('li').not('.js-drilldown-back').attr('role','menuitem');this._prepareMenu();this._keyboardEvents();}/**
   * prepares drilldown menu by setting attributes to links and elements
   * sets a min height to prevent content jumping
   * wraps the element if not already wrapped
   * @private
   * @function
   */},{key:'_prepareMenu',value:function _prepareMenu(){var _this=this;// if(!this.options.holdOpen){
//   this._menuLinkEvents();
// }
this.$submenuAnchors.each(function(){var $sub=$(this);var $link=$sub.find('a:first');if(_this.options.parentLink){$link.clone().prependTo($sub.children('[data-submenu]')).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menu-item"></li>');}$link.data('savedHref',$link.attr('href')).removeAttr('href');$sub.children('[data-submenu]').attr({'aria-hidden':true,'tabindex':0,'role':'menu'});_this._events($sub);});this.$submenus.each(function(){var $menu=$(this),$back=$menu.find('.js-drilldown-back');if(!$back.length){$menu.prepend(_this.options.backButton);}_this._back($menu);});if(!this.$element.parent().hasClass('is-drilldown')){this.$wrapper=$(this.options.wrapper).addClass('is-drilldown').css(this._getMaxDims());this.$element.wrap(this.$wrapper);}}/**
   * Adds event handlers to elements in the menu.
   * @function
   * @private
   * @param {jQuery} $elem - the current menu item to add handlers to.
   */},{key:'_events',value:function _events($elem){var _this=this;$elem.off('click.zf.drilldown').on('click.zf.drilldown',function(e){if($(e.target).parentsUntil('ul','li').hasClass('is-drilldown-submenu-parent')){e.stopImmediatePropagation();e.preventDefault();}// if(e.target !== e.currentTarget.firstElementChild){
//   return false;
// }
_this._show($elem);if(_this.options.closeOnClick){var $body=$('body').not(_this.$wrapper);$body.off('.zf.drilldown').on('click.zf.drilldown',function(e){e.preventDefault();_this._hideAll();$body.off('.zf.drilldown');});}});}/**
   * Adds keydown event listener to `li`'s in the menu.
   * @private
   */},{key:'_keyboardEvents',value:function _keyboardEvents(){var _this=this;this.$menuItems.add(this.$element.find('.js-drilldown-back')).on('keydown.zf.drilldown',function(e){var $element=$(this),$elements=$element.parent('ul').children('li'),$prevElement,$nextElement;$elements.each(function(i){if($(this).is($element)){$prevElement=$elements.eq(Math.max(0,i-1));$nextElement=$elements.eq(Math.min(i+1,$elements.length-1));return;}});Foundation.Keyboard.handleKey(e,'Drilldown',{next:function next(){if($element.is(_this.$submenuAnchors)){_this._show($element);$element.on(Foundation.transitionend($element),function(){$element.find('ul li').filter(_this.$menuItems).first().focus();});}},previous:function previous(){_this._hide($element.parent('ul'));$element.parent('ul').on(Foundation.transitionend($element),function(){setTimeout(function(){$element.parent('ul').parent('li').focus();},1);});},up:function up(){$prevElement.focus();},down:function down(){$nextElement.focus();},close:function close(){_this._back();//_this.$menuItems.first().focus(); // focus to first element
},open:function open(){if(!$element.is(_this.$menuItems)){// not menu item means back button
_this._hide($element.parent('ul'));setTimeout(function(){$element.parent('ul').parent('li').focus();},1);}else if($element.is(_this.$submenuAnchors)){_this._show($element);setTimeout(function(){$element.find('ul li').filter(_this.$menuItems).first().focus();},1);}},handled:function handled(){e.preventDefault();e.stopImmediatePropagation();}});});// end keyboardAccess
}/**
   * Closes all open elements, and returns to root menu.
   * @function
   * @fires Drilldown#closed
   */},{key:'_hideAll',value:function _hideAll(){var $elem=this.$element.find('.is-drilldown-submenu.is-active').addClass('is-closing');$elem.one(Foundation.transitionend($elem),function(e){$elem.removeClass('is-active is-closing');});/**
         * Fires when the menu is fully closed.
         * @event Drilldown#closed
         */this.$element.trigger('closed.zf.drilldown');}/**
   * Adds event listener for each `back` button, and closes open menus.
   * @function
   * @fires Drilldown#back
   * @param {jQuery} $elem - the current sub-menu to add `back` event.
   */},{key:'_back',value:function _back($elem){var _this=this;$elem.off('click.zf.drilldown');$elem.children('.js-drilldown-back').on('click.zf.drilldown',function(e){e.stopImmediatePropagation();// console.log('mouseup on back');
_this._hide($elem);});}/**
   * Adds event listener to menu items w/o submenus to close open menus on click.
   * @function
   * @private
   */},{key:'_menuLinkEvents',value:function _menuLinkEvents(){var _this=this;this.$menuItems.not('.is-drilldown-submenu-parent').off('click.zf.drilldown').on('click.zf.drilldown',function(e){// e.stopImmediatePropagation();
setTimeout(function(){_this._hideAll();},0);});}/**
   * Opens a submenu.
   * @function
   * @fires Drilldown#open
   * @param {jQuery} $elem - the current element with a submenu to open.
   */},{key:'_show',value:function _show($elem){$elem.children('[data-submenu]').addClass('is-active');this.$element.trigger('open.zf.drilldown',[$elem]);}},{key:'_hide',/**
   * Hides a submenu
   * @function
   * @fires Drilldown#hide
   * @param {jQuery} $elem - the current sub-menu to hide.
   */value:function _hide($elem){var _this=this;$elem.addClass('is-closing').one(Foundation.transitionend($elem),function(){$elem.removeClass('is-active is-closing');$elem.blur();});/**
     * Fires when the submenu is has closed.
     * @event Drilldown#hide
     */$elem.trigger('hide.zf.drilldown',[$elem]);}/**
   * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
   * Prevents content jumping.
   * @function
   * @private
   */},{key:'_getMaxDims',value:function _getMaxDims(){var max=0,result={};this.$submenus.add(this.$element).each(function(){var numOfElems=$(this).children('li').length;max=numOfElems>max?numOfElems:max;});result['min-height']=max*this.$menuItems[0].getBoundingClientRect().height+'px';result['max-width']=this.$element[0].getBoundingClientRect().width+'px';return result;}/**
   * Destroys the Drilldown Menu
   * @function
   */},{key:'destroy',value:function destroy(){this._hideAll();Foundation.Nest.Burn(this.$element,'drilldown');this.$element.unwrap().find('.js-drilldown-back, .is-submenu-parent-item').remove().end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu').end().find('[data-submenu]').removeAttr('aria-hidden tabindex role').off('.zf.drilldown').end().off('zf.drilldown');this.$element.find('a').each(function(){var $link=$(this);if($link.data('savedHref')){$link.attr('href',$link.data('savedHref')).removeData('savedHref');}else{return;}});Foundation.unregisterPlugin(this);}}]);return Drilldown;}();Drilldown.defaults={/**
   * Markup used for JS generated back button. Prepended to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @example '<\li><\a>Back<\/a><\/li>'
   */backButton:'<li class="js-drilldown-back"><a>Back</a></li>',/**
   * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @example '<\div class="is-drilldown"><\/div>'
   */wrapper:'<div></div>',/**
   * Adds the parent link to the submenu.
   * @option
   * @example false
   */parentLink:false,/**
   * Allow the menu to return to root list on body click.
   * @option
   * @example false
   */closeOnClick:false// holdOpen: false
};// Window exports
Foundation.plugin(Drilldown,'Drilldown');}(jQuery);'use strict';!function($){/**
 * Equalizer module.
 * @module foundation.equalizer
 */var Equalizer=function(){/**
   * Creates a new instance of Equalizer.
   * @class
   * @fires Equalizer#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */function Equalizer(element,options){_classCallCheck(this,Equalizer);this.$element=element;this.options=$.extend({},Equalizer.defaults,this.$element.data(),options);this._init();Foundation.registerPlugin(this,'Equalizer');}/**
   * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
   * @private
   */_createClass(Equalizer,[{key:'_init',value:function _init(){var eqId=this.$element.attr('data-equalizer')||'';var $watched=this.$element.find('[data-equalizer-watch="'+eqId+'"]');this.$watched=$watched.length?$watched:this.$element.find('[data-equalizer-watch]');this.$element.attr('data-resize',eqId||Foundation.GetYoDigits(6,'eq'));this.hasNested=this.$element.find('[data-equalizer]').length>0;this.isNested=this.$element.parentsUntil(document.body,'[data-equalizer]').length>0;this.isOn=false;var imgs=this.$element.find('img');var tooSmall;if(this.options.equalizeOn){tooSmall=this._checkMQ();$(window).on('changed.zf.mediaquery',this._checkMQ.bind(this));}else{this._events();}if(tooSmall!==undefined&&tooSmall===false||tooSmall===undefined){if(imgs.length){Foundation.onImagesLoaded(imgs,this._reflow.bind(this));}else{this._reflow();}}}/**
   * Removes event listeners if the breakpoint is too small.
   * @private
   */},{key:'_pauseEvents',value:function _pauseEvents(){this.isOn=false;this.$element.off('.zf.equalizer resizeme.zf.trigger');}/**
   * Initializes events for Equalizer.
   * @private
   */},{key:'_events',value:function _events(){var _this=this;this._pauseEvents();if(this.hasNested){this.$element.on('postequalized.zf.equalizer',function(e){if(e.target!==_this.$element[0]){_this._reflow();}});}else{this.$element.on('resizeme.zf.trigger',this._reflow.bind(this));}this.isOn=true;}/**
   * Checks the current breakpoint to the minimum required size.
   * @private
   */},{key:'_checkMQ',value:function _checkMQ(){var tooSmall=!Foundation.MediaQuery.atLeast(this.options.equalizeOn);if(tooSmall){if(this.isOn){this._pauseEvents();this.$watched.css('height','auto');}}else{if(!this.isOn){this._events();}}return tooSmall;}/**
   * A noop version for the plugin
   * @private
   */},{key:'_killswitch',value:function _killswitch(){return;}/**
   * Calls necessary functions to update Equalizer upon DOM change
   * @private
   */},{key:'_reflow',value:function _reflow(){if(!this.options.equalizeOnStack){if(this._isStacked()){this.$watched.css('height','auto');return false;}}if(this.options.equalizeByRow){this.getHeightsByRow(this.applyHeightByRow.bind(this));}else{this.getHeights(this.applyHeight.bind(this));}}/**
   * Manually determines if the first 2 elements are *NOT* stacked.
   * @private
   */},{key:'_isStacked',value:function _isStacked(){return this.$watched[0].offsetTop!==this.$watched[1].offsetTop;}/**
   * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
   * @param {Function} cb - A non-optional callback to return the heights array to.
   * @returns {Array} heights - An array of heights of children within Equalizer container
   */},{key:'getHeights',value:function getHeights(cb){var heights=[];for(var i=0,len=this.$watched.length;i<len;i++){this.$watched[i].style.height='auto';heights.push(this.$watched[i].offsetHeight);}cb(heights);}/**
   * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
   * @param {Function} cb - A non-optional callback to return the heights array to.
   * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
   */},{key:'getHeightsByRow',value:function getHeightsByRow(cb){var lastElTopOffset=this.$watched.first().offset().top,groups=[],group=0;//group by Row
groups[group]=[];for(var i=0,len=this.$watched.length;i<len;i++){this.$watched[i].style.height='auto';//maybe could use this.$watched[i].offsetTop
var elOffsetTop=$(this.$watched[i]).offset().top;if(elOffsetTop!=lastElTopOffset){group++;groups[group]=[];lastElTopOffset=elOffsetTop;}groups[group].push([this.$watched[i],this.$watched[i].offsetHeight]);}for(var j=0,ln=groups.length;j<ln;j++){var heights=$(groups[j]).map(function(){return this[1];}).get();var max=Math.max.apply(null,heights);groups[j].push(max);}cb(groups);}/**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest
   * @param {array} heights - An array of heights of children within Equalizer container
   * @fires Equalizer#preequalized
   * @fires Equalizer#postequalized
   */},{key:'applyHeight',value:function applyHeight(heights){var max=Math.max.apply(null,heights);/**
     * Fires before the heights are applied
     * @event Equalizer#preequalized
     */this.$element.trigger('preequalized.zf.equalizer');this.$watched.css('height',max);/**
     * Fires when the heights have been applied
     * @event Equalizer#postequalized
     */this.$element.trigger('postequalized.zf.equalizer');}/**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
   * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
   * @fires Equalizer#preequalized
   * @fires Equalizer#preequalizedRow
   * @fires Equalizer#postequalizedRow
   * @fires Equalizer#postequalized
   */},{key:'applyHeightByRow',value:function applyHeightByRow(groups){/**
     * Fires before the heights are applied
     */this.$element.trigger('preequalized.zf.equalizer');for(var i=0,len=groups.length;i<len;i++){var groupsILength=groups[i].length,max=groups[i][groupsILength-1];if(groupsILength<=2){$(groups[i][0][0]).css({'height':'auto'});continue;}/**
        * Fires before the heights per row are applied
        * @event Equalizer#preequalizedRow
        */this.$element.trigger('preequalizedrow.zf.equalizer');for(var j=0,lenJ=groupsILength-1;j<lenJ;j++){$(groups[i][j][0]).css({'height':max});}/**
        * Fires when the heights per row have been applied
        * @event Equalizer#postequalizedRow
        */this.$element.trigger('postequalizedrow.zf.equalizer');}/**
     * Fires when the heights have been applied
     */this.$element.trigger('postequalized.zf.equalizer');}/**
   * Destroys an instance of Equalizer.
   * @function
   */},{key:'destroy',value:function destroy(){this._pauseEvents();this.$watched.css('height','auto');Foundation.unregisterPlugin(this);}}]);return Equalizer;}();/**
 * Default settings for plugin
 */Equalizer.defaults={/**
   * Enable height equalization when stacked on smaller screens.
   * @option
   * @example true
   */equalizeOnStack:true,/**
   * Enable height equalization row by row.
   * @option
   * @example false
   */equalizeByRow:false,/**
   * String representing the minimum breakpoint size the plugin should equalize heights on.
   * @option
   * @example 'medium'
   */equalizeOn:''};// Window exports
Foundation.plugin(Equalizer,'Equalizer');}(jQuery);'use strict';!function($){/**
 * Interchange module.
 * @module foundation.interchange
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.timerAndImageLoader
 */var Interchange=function(){/**
   * Creates a new instance of Interchange.
   * @class
   * @fires Interchange#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */function Interchange(element,options){_classCallCheck(this,Interchange);this.$element=element;this.options=$.extend({},Interchange.defaults,options);this.rules=[];this.currentPath='';this._init();this._events();Foundation.registerPlugin(this,'Interchange');}/**
   * Initializes the Interchange plugin and calls functions to get interchange functioning on load.
   * @function
   * @private
   */_createClass(Interchange,[{key:'_init',value:function _init(){this._addBreakpoints();this._generateRules();this._reflow();}/**
   * Initializes events for Interchange.
   * @function
   * @private
   */},{key:'_events',value:function _events(){$(window).on('resize.zf.interchange',Foundation.util.throttle(this._reflow.bind(this),50));}/**
   * Calls necessary functions to update Interchange upon DOM change
   * @function
   * @private
   */},{key:'_reflow',value:function _reflow(){var match;// Iterate through each rule, but only save the last match
for(var i in this.rules){var rule=this.rules[i];if(window.matchMedia(rule.query).matches){match=rule;}}if(match){this.replace(match.path);}}/**
   * Gets the Foundation breakpoints and adds them to the Interchange.SPECIAL_QUERIES object.
   * @function
   * @private
   */},{key:'_addBreakpoints',value:function _addBreakpoints(){for(var i in Foundation.MediaQuery.queries){var query=Foundation.MediaQuery.queries[i];Interchange.SPECIAL_QUERIES[query.name]=query.value;}}/**
   * Checks the Interchange element for the provided media query + content pairings
   * @function
   * @private
   * @param {Object} element - jQuery object that is an Interchange instance
   * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys
   */},{key:'_generateRules',value:function _generateRules(element){var rulesList=[];var rules;if(this.options.rules){rules=this.options.rules;}else{rules=this.$element.data('interchange').match(/\[.*?\]/g);}for(var i in rules){var rule=rules[i].slice(1,-1).split(', ');var path=rule.slice(0,-1).join('');var query=rule[rule.length-1];if(Interchange.SPECIAL_QUERIES[query]){query=Interchange.SPECIAL_QUERIES[query];}rulesList.push({path:path,query:query});}this.rules=rulesList;}/**
   * Update the `src` property of an image, or change the HTML of a container, to the specified path.
   * @function
   * @param {String} path - Path to the image or HTML partial.
   * @fires Interchange#replaced
   */},{key:'replace',value:function replace(path){if(this.currentPath===path)return;var _this=this,trigger='replaced.zf.interchange';// Replacing images
if(this.$element[0].nodeName==='IMG'){this.$element.attr('src',path).load(function(){_this.currentPath=path;}).trigger(trigger);}// Replacing background images
else if(path.match(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i)){this.$element.css({'background-image':'url('+path+')'}).trigger(trigger);}// Replacing HTML
else{$.get(path,function(response){_this.$element.html(response).trigger(trigger);$(response).foundation();_this.currentPath=path;});}/**
     * Fires when content in an Interchange element is done being loaded.
     * @event Interchange#replaced
     */// this.$element.trigger('replaced.zf.interchange');
}/**
   * Destroys an instance of interchange.
   * @function
   */},{key:'destroy',value:function destroy(){//TODO this.
}}]);return Interchange;}();/**
 * Default settings for plugin
 */Interchange.defaults={/**
   * Rules to be applied to Interchange elements. Set with the `data-interchange` array notation.
   * @option
   */rules:null};Interchange.SPECIAL_QUERIES={'landscape':'screen and (orientation: landscape)','portrait':'screen and (orientation: portrait)','retina':'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)'};// Window exports
Foundation.plugin(Interchange,'Interchange');}(jQuery);'use strict';!function($){/**
 * Magellan module.
 * @module foundation.magellan
 */var Magellan=function(){/**
   * Creates a new instance of Magellan.
   * @class
   * @fires Magellan#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */function Magellan(element,options){_classCallCheck(this,Magellan);this.$element=element;this.options=$.extend({},Magellan.defaults,this.$element.data(),options);this._init();Foundation.registerPlugin(this,'Magellan');}/**
   * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
   * @private
   */_createClass(Magellan,[{key:'_init',value:function _init(){var id=this.$element[0].id||Foundation.GetYoDigits(6,'magellan');var _this=this;this.$targets=$('[data-magellan-target]');this.$links=this.$element.find('a');this.$element.attr({'data-resize':id,'data-scroll':id,'id':id});this.$active=$();this.scrollPos=parseInt(window.pageYOffset,10);this._events();}/**
   * Calculates an array of pixel values that are the demarcation lines between locations on the page.
   * Can be invoked if new elements are added or the size of a location changes.
   * @function
   */},{key:'calcPoints',value:function calcPoints(){var _this=this,body=document.body,html=document.documentElement;this.points=[];this.winHeight=Math.round(Math.max(window.innerHeight,html.clientHeight));this.docHeight=Math.round(Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight));this.$targets.each(function(){var $tar=$(this),pt=Math.round($tar.offset().top-_this.options.threshold);$tar.targetPoint=pt;_this.points.push(pt);});}/**
   * Initializes events for Magellan.
   * @private
   */},{key:'_events',value:function _events(){var _this=this,$body=$('html, body'),opts={duration:_this.options.animationDuration,easing:_this.options.animationEasing};$(window).one('load',function(){if(_this.options.deepLinking){if(location.hash){_this.scrollToLoc(location.hash);}}_this.calcPoints();_this._updateActive();});this.$element.on({'resizeme.zf.trigger':this.reflow.bind(this),'scrollme.zf.trigger':this._updateActive.bind(this)}).on('click.zf.magellan','a[href^="#"]',function(e){e.preventDefault();var arrival=this.getAttribute('href');_this.scrollToLoc(arrival);});}/**
   * Function to scroll to a given location on the page.
   * @param {String} loc - a properly formatted jQuery id selector. Example: '#foo'
   * @function
   */},{key:'scrollToLoc',value:function scrollToLoc(loc){var scrollPos=Math.round($(loc).offset().top-this.options.threshold/2-this.options.barOffset);$('html, body').stop(true).animate({scrollTop:scrollPos},this.options.animationDuration,this.options.animationEasing);}/**
   * Calls necessary functions to update Magellan upon DOM change
   * @function
   */},{key:'reflow',value:function reflow(){this.calcPoints();this._updateActive();}/**
   * Updates the visibility of an active location link, and updates the url hash for the page, if deepLinking enabled.
   * @private
   * @function
   * @fires Magellan#update
   */},{key:'_updateActive',value:function _updateActive()/*evt, elem, scrollPos*/{var winPos=/*scrollPos ||*/parseInt(window.pageYOffset,10),curIdx;if(winPos+this.winHeight===this.docHeight){curIdx=this.points.length-1;}else if(winPos<this.points[0]){curIdx=0;}else{var isDown=this.scrollPos<winPos,_this=this,curVisible=this.points.filter(function(p,i){return isDown?p<=winPos:p-_this.options.threshold<=winPos;//&& winPos >= _this.points[i -1] - _this.options.threshold;
});curIdx=curVisible.length?curVisible.length-1:0;}this.$active.removeClass(this.options.activeClass);this.$active=this.$links.eq(curIdx).addClass(this.options.activeClass);if(this.options.deepLinking){var hash=this.$active[0].getAttribute('href');if(window.history.pushState){window.history.pushState(null,null,hash);}else{window.location.hash=hash;}}this.scrollPos=winPos;/**
     * Fires when magellan is finished updating to the new active element.
     * @event Magellan#update
     */this.$element.trigger('update.zf.magellan',[this.$active]);}/**
   * Destroys an instance of Magellan and resets the url of the window.
   * @function
   */},{key:'destroy',value:function destroy(){this.$element.off('.zf.trigger .zf.magellan').find('.'+this.options.activeClass).removeClass(this.options.activeClass);if(this.options.deepLinking){var hash=this.$active[0].getAttribute('href');window.location.hash.replace(hash,'');}Foundation.unregisterPlugin(this);}}]);return Magellan;}();/**
 * Default settings for plugin
 */Magellan.defaults={/**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @example 500
   */animationDuration:500,/**
   * Animation style to use when scrolling between locations.
   * @option
   * @example 'ease-in-out'
   */animationEasing:'linear',/**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @example 50
   */threshold:50,/**
   * Class applied to the active locations link on the magellan container.
   * @option
   * @example 'active'
   */activeClass:'active',/**
   * Allows the script to manipulate the url of the current page, and if supported, alter the history.
   * @option
   * @example true
   */deepLinking:false,/**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @example 25
   */barOffset:0};// Window exports
Foundation.plugin(Magellan,'Magellan');}(jQuery);'use strict';!function($){/**
 * OffCanvas module.
 * @module foundation.offcanvas
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.triggers
 * @requires foundation.util.motion
 */var OffCanvas=function(){/**
   * Creates a new instance of an off-canvas wrapper.
   * @class
   * @fires OffCanvas#init
   * @param {Object} element - jQuery object to initialize.
   * @param {Object} options - Overrides to the default plugin settings.
   */function OffCanvas(element,options){_classCallCheck(this,OffCanvas);this.$element=element;this.options=$.extend({},OffCanvas.defaults,this.$element.data(),options);this.$lastTrigger=$();this._init();this._events();Foundation.registerPlugin(this,'OffCanvas');}/**
   * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
   * @function
   * @private
   */_createClass(OffCanvas,[{key:'_init',value:function _init(){var id=this.$element.attr('id');this.$element.attr('aria-hidden','true');// Find triggers that affect this element and add aria-expanded to them
$(document).find('[data-open="'+id+'"], [data-close="'+id+'"], [data-toggle="'+id+'"]').attr('aria-expanded','false').attr('aria-controls',id);// Add a close trigger over the body if necessary
if(this.options.closeOnClick){if($('.js-off-canvas-exit').length){this.$exiter=$('.js-off-canvas-exit');}else{var exiter=document.createElement('div');exiter.setAttribute('class','js-off-canvas-exit');$('[data-off-canvas-content]').append(exiter);this.$exiter=$(exiter);}}this.options.isRevealed=this.options.isRevealed||new RegExp(this.options.revealClass,'g').test(this.$element[0].className);if(this.options.isRevealed){this.options.revealOn=this.options.revealOn||this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split('-')[2];this._setMQChecker();}if(!this.options.transitionTime){this.options.transitionTime=parseFloat(window.getComputedStyle($('[data-off-canvas-wrapper]')[0]).transitionDuration)*1000;}}/**
   * Adds event handlers to the off-canvas wrapper and the exit overlay.
   * @function
   * @private
   */},{key:'_events',value:function _events(){this.$element.off('.zf.trigger .zf.offcanvas').on({'open.zf.trigger':this.open.bind(this),'close.zf.trigger':this.close.bind(this),'toggle.zf.trigger':this.toggle.bind(this),'keydown.zf.offcanvas':this._handleKeyboard.bind(this)});if(this.options.closeOnClick&&this.$exiter.length){this.$exiter.on({'click.zf.offcanvas':this.close.bind(this)});}}/**
   * Applies event listener for elements that will reveal at certain breakpoints.
   * @private
   */},{key:'_setMQChecker',value:function _setMQChecker(){var _this=this;$(window).on('changed.zf.mediaquery',function(){if(Foundation.MediaQuery.atLeast(_this.options.revealOn)){_this.reveal(true);}else{_this.reveal(false);}}).one('load.zf.offcanvas',function(){if(Foundation.MediaQuery.atLeast(_this.options.revealOn)){_this.reveal(true);}});}/**
   * Handles the revealing/hiding the off-canvas at breakpoints, not the same as open.
   * @param {Boolean} isRevealed - true if element should be revealed.
   * @function
   */},{key:'reveal',value:function reveal(isRevealed){var $closer=this.$element.find('[data-close]');if(isRevealed){this.close();this.isRevealed=true;// if (!this.options.forceTop) {
//   var scrollPos = parseInt(window.pageYOffset);
//   this.$element[0].style.transform = 'translate(0,' + scrollPos + 'px)';
// }
// if (this.options.isSticky) { this._stick(); }
this.$element.off('open.zf.trigger toggle.zf.trigger');if($closer.length){$closer.hide();}}else{this.isRevealed=false;// if (this.options.isSticky || !this.options.forceTop) {
//   this.$element[0].style.transform = '';
//   $(window).off('scroll.zf.offcanvas');
// }
this.$element.on({'open.zf.trigger':this.open.bind(this),'toggle.zf.trigger':this.toggle.bind(this)});if($closer.length){$closer.show();}}}/**
   * Opens the off-canvas menu.
   * @function
   * @param {Object} event - Event object passed from listener.
   * @param {jQuery} trigger - element that triggered the off-canvas to open.
   * @fires OffCanvas#opened
   */},{key:'open',value:function open(event,trigger){if(this.$element.hasClass('is-open')||this.isRevealed){return;}var _this=this,$body=$(document.body);if(this.options.forceTop){$('body').scrollTop(0);}// window.pageYOffset = 0;
// if (!this.options.forceTop) {
//   var scrollPos = parseInt(window.pageYOffset);
//   this.$element[0].style.transform = 'translate(0,' + scrollPos + 'px)';
//   if (this.$exiter.length) {
//     this.$exiter[0].style.transform = 'translate(0,' + scrollPos + 'px)';
//   }
// }
/**
     * Fires when the off-canvas menu opens.
     * @event OffCanvas#opened
     */Foundation.Move(this.options.transitionTime,this.$element,function(){$('[data-off-canvas-wrapper]').addClass('is-off-canvas-open is-open-'+_this.options.position);_this.$element.addClass('is-open');// if (_this.options.isSticky) {
//   _this._stick();
// }
});this.$element.attr('aria-hidden','false').trigger('opened.zf.offcanvas');if(this.options.closeOnClick){this.$exiter.addClass('is-visible');}if(trigger){this.$lastTrigger=trigger.attr('aria-expanded','true');}if(this.options.autoFocus){this.$element.one(Foundation.transitionend(this.$element),function(){_this.$element.find('a, button').eq(0).focus();});}if(this.options.trapFocus){$('[data-off-canvas-content]').attr('tabindex','-1');this._trapFocus();}}/**
   * Traps focus within the offcanvas on open.
   * @private
   */},{key:'_trapFocus',value:function _trapFocus(){var focusable=Foundation.Keyboard.findFocusable(this.$element),first=focusable.eq(0),last=focusable.eq(-1);focusable.off('.zf.offcanvas').on('keydown.zf.offcanvas',function(e){if(e.which===9||e.keycode===9){if(e.target===last[0]&&!e.shiftKey){e.preventDefault();first.focus();}if(e.target===first[0]&&e.shiftKey){e.preventDefault();last.focus();}}});}/**
   * Allows the offcanvas to appear sticky utilizing translate properties.
   * @private
   */// OffCanvas.prototype._stick = function() {
//   var elStyle = this.$element[0].style;
//
//   if (this.options.closeOnClick) {
//     var exitStyle = this.$exiter[0].style;
//   }
//
//   $(window).on('scroll.zf.offcanvas', function(e) {
//     console.log(e);
//     var pageY = window.pageYOffset;
//     elStyle.transform = 'translate(0,' + pageY + 'px)';
//     if (exitStyle !== undefined) { exitStyle.transform = 'translate(0,' + pageY + 'px)'; }
//   });
//   // this.$element.trigger('stuck.zf.offcanvas');
// };
/**
   * Closes the off-canvas menu.
   * @function
   * @param {Function} cb - optional cb to fire after closure.
   * @fires OffCanvas#closed
   */},{key:'close',value:function close(cb){if(!this.$element.hasClass('is-open')||this.isRevealed){return;}var _this=this;//  Foundation.Move(this.options.transitionTime, this.$element, function() {
$('[data-off-canvas-wrapper]').removeClass('is-off-canvas-open is-open-'+_this.options.position);_this.$element.removeClass('is-open');// Foundation._reflow();
// });
this.$element.attr('aria-hidden','true')/**
       * Fires when the off-canvas menu opens.
       * @event OffCanvas#closed
       */.trigger('closed.zf.offcanvas');// if (_this.options.isSticky || !_this.options.forceTop) {
//   setTimeout(function() {
//     _this.$element[0].style.transform = '';
//     $(window).off('scroll.zf.offcanvas');
//   }, this.options.transitionTime);
// }
if(this.options.closeOnClick){this.$exiter.removeClass('is-visible');}this.$lastTrigger.attr('aria-expanded','false');if(this.options.trapFocus){$('[data-off-canvas-content]').removeAttr('tabindex');}}/**
   * Toggles the off-canvas menu open or closed.
   * @function
   * @param {Object} event - Event object passed from listener.
   * @param {jQuery} trigger - element that triggered the off-canvas to open.
   */},{key:'toggle',value:function toggle(event,trigger){if(this.$element.hasClass('is-open')){this.close(event,trigger);}else{this.open(event,trigger);}}/**
   * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
   * @function
   * @private
   */},{key:'_handleKeyboard',value:function _handleKeyboard(event){if(event.which!==27)return;event.stopPropagation();event.preventDefault();this.close();this.$lastTrigger.focus();}/**
   * Destroys the offcanvas plugin.
   * @function
   */},{key:'destroy',value:function destroy(){this.close();this.$element.off('.zf.trigger .zf.offcanvas');this.$exiter.off('.zf.offcanvas');Foundation.unregisterPlugin(this);}}]);return OffCanvas;}();OffCanvas.defaults={/**
   * Allow the user to click outside of the menu to close it.
   * @option
   * @example true
   */closeOnClick:true,/**
   * Amount of time in ms the open and close transition requires. If none selected, pulls from body style.
   * @option
   * @example 500
   */transitionTime:0,/**
   * Direction the offcanvas opens from. Determines class applied to body.
   * @option
   * @example left
   */position:'left',/**
   * Force the page to scroll to top on open.
   * @option
   * @example true
   */forceTop:true,/**
   * Allow the offcanvas to remain open for certain breakpoints.
   * @option
   * @example false
   */isRevealed:false,/**
   * Breakpoint at which to reveal. JS will use a RegExp to target standard classes, if changing classnames, pass your class with the `revealClass` option.
   * @option
   * @example reveal-for-large
   */revealOn:null,/**
   * Force focus to the offcanvas on open. If true, will focus the opening trigger on close.
   * @option
   * @example true
   */autoFocus:true,/**
   * Class used to force an offcanvas to remain open. Foundation defaults for this are `reveal-for-large` & `reveal-for-medium`.
   * @option
   * TODO improve the regex testing for this.
   * @example reveal-for-large
   */revealClass:'reveal-for-',/**
   * Triggers optional focus trapping when opening an offcanvas. Sets tabindex of [data-off-canvas-content] to -1 for accessibility purposes.
   * @option
   * @example true
   */trapFocus:false};// Window exports
Foundation.plugin(OffCanvas,'OffCanvas');}(jQuery);'use strict';!function($){/**
 * Orbit module.
 * @module foundation.orbit
 * @requires foundation.util.keyboard
 * @requires foundation.util.motion
 * @requires foundation.util.timerAndImageLoader
 * @requires foundation.util.touch
 */var Orbit=function(){/**
  * Creates a new instance of an orbit carousel.
  * @class
  * @param {jQuery} element - jQuery object to make into an Orbit Carousel.
  * @param {Object} options - Overrides to the default plugin settings.
  */function Orbit(element,options){_classCallCheck(this,Orbit);this.$element=element;this.options=$.extend({},Orbit.defaults,this.$element.data(),options);this._init();Foundation.registerPlugin(this,'Orbit');Foundation.Keyboard.register('Orbit',{'ltr':{'ARROW_RIGHT':'next','ARROW_LEFT':'previous'},'rtl':{'ARROW_LEFT':'next','ARROW_RIGHT':'previous'}});}/**
  * Initializes the plugin by creating jQuery collections, setting attributes, and starting the animation.
  * @function
  * @private
  */_createClass(Orbit,[{key:'_init',value:function _init(){this.$wrapper=this.$element.find('.'+this.options.containerClass);this.$slides=this.$element.find('.'+this.options.slideClass);var $images=this.$element.find('img'),initActive=this.$slides.filter('.is-active');if(!initActive.length){this.$slides.eq(0).addClass('is-active');}if(!this.options.useMUI){this.$slides.addClass('no-motionui');}if($images.length){Foundation.onImagesLoaded($images,this._prepareForOrbit.bind(this));}else{this._prepareForOrbit();//hehe
}if(this.options.bullets){this._loadBullets();}this._events();if(this.options.autoPlay&&this.$slides.length>1){this.geoSync();}if(this.options.accessible){// allow wrapper to be focusable to enable arrow navigation
this.$wrapper.attr('tabindex',0);}}/**
  * Creates a jQuery collection of bullets, if they are being used.
  * @function
  * @private
  */},{key:'_loadBullets',value:function _loadBullets(){this.$bullets=this.$element.find('.'+this.options.boxOfBullets).find('button');}/**
  * Sets a `timer` object on the orbit, and starts the counter for the next slide.
  * @function
  */},{key:'geoSync',value:function geoSync(){var _this=this;this.timer=new Foundation.Timer(this.$element,{duration:this.options.timerDelay,infinite:false},function(){_this.changeSlide(true);});this.timer.start();}/**
  * Sets wrapper and slide heights for the orbit.
  * @function
  * @private
  */},{key:'_prepareForOrbit',value:function _prepareForOrbit(){var _this=this;this._setWrapperHeight(function(max){_this._setSlideHeight(max);});}/**
  * Calulates the height of each slide in the collection, and uses the tallest one for the wrapper height.
  * @function
  * @private
  * @param {Function} cb - a callback function to fire when complete.
  */},{key:'_setWrapperHeight',value:function _setWrapperHeight(cb){//rewrite this to `for` loop
var max=0,temp,counter=0;this.$slides.each(function(){temp=this.getBoundingClientRect().height;$(this).attr('data-slide',counter);if(counter){//if not the first slide, set css position and display property
$(this).css({'position':'relative','display':'none'});}max=temp>max?temp:max;counter++;});if(counter===this.$slides.length){this.$wrapper.css({'height':max});//only change the wrapper height property once.
cb(max);//fire callback with max height dimension.
}}/**
  * Sets the max-height of each slide.
  * @function
  * @private
  */},{key:'_setSlideHeight',value:function _setSlideHeight(height){this.$slides.each(function(){$(this).css('max-height',height);});}/**
  * Adds event listeners to basically everything within the element.
  * @function
  * @private
  */},{key:'_events',value:function _events(){var _this=this;//***************************************
//**Now using custom event - thanks to:**
//**      Yohai Ararat of Toronto      **
//***************************************
if(this.$slides.length>1){if(this.options.swipe){this.$slides.off('swipeleft.zf.orbit swiperight.zf.orbit').on('swipeleft.zf.orbit',function(e){e.preventDefault();_this.changeSlide(true);}).on('swiperight.zf.orbit',function(e){e.preventDefault();_this.changeSlide(false);});}//***************************************
if(this.options.autoPlay){this.$slides.on('click.zf.orbit',function(){_this.$element.data('clickedOn',_this.$element.data('clickedOn')?false:true);_this.timer[_this.$element.data('clickedOn')?'pause':'start']();});if(this.options.pauseOnHover){this.$element.on('mouseenter.zf.orbit',function(){_this.timer.pause();}).on('mouseleave.zf.orbit',function(){if(!_this.$element.data('clickedOn')){_this.timer.start();}});}}if(this.options.navButtons){var $controls=this.$element.find('.'+this.options.nextClass+', .'+this.options.prevClass);$controls.attr('tabindex',0)//also need to handle enter/return and spacebar key presses
.on('click.zf.orbit touchend.zf.orbit',function(){_this.changeSlide($(this).hasClass(_this.options.nextClass));});}if(this.options.bullets){this.$bullets.on('click.zf.orbit touchend.zf.orbit',function(){if(/is-active/g.test(this.className)){return false;}//if this is active, kick out of function.
var idx=$(this).data('slide'),ltr=idx>_this.$slides.filter('.is-active').data('slide'),$slide=_this.$slides.eq(idx);_this.changeSlide(ltr,$slide,idx);});}this.$wrapper.add(this.$bullets).on('keydown.zf.orbit',function(e){// handle keyboard event with keyboard util
Foundation.Keyboard.handleKey(e,'Orbit',{next:function next(){_this.changeSlide(true);},previous:function previous(){_this.changeSlide(false);},handled:function handled(){// if bullet is focused, make sure focus moves
if($(e.target).is(_this.$bullets)){_this.$bullets.filter('.is-active').focus();}}});});}}/**
  * Changes the current slide to a new one.
  * @function
  * @param {Boolean} isLTR - flag if the slide should move left to right.
  * @param {jQuery} chosenSlide - the jQuery element of the slide to show next, if one is selected.
  * @param {Number} idx - the index of the new slide in its collection, if one chosen.
  * @fires Orbit#slidechange
  */},{key:'changeSlide',value:function changeSlide(isLTR,chosenSlide,idx){var $curSlide=this.$slides.filter('.is-active').eq(0);if(/mui/g.test($curSlide[0].className)){return false;}//if the slide is currently animating, kick out of the function
var $firstSlide=this.$slides.first(),$lastSlide=this.$slides.last(),dirIn=isLTR?'Right':'Left',dirOut=isLTR?'Left':'Right',_this=this,$newSlide;if(!chosenSlide){//most of the time, this will be auto played or clicked from the navButtons.
$newSlide=isLTR?//if wrapping enabled, check to see if there is a `next` or `prev` sibling, if not, select the first or last slide to fill in. if wrapping not enabled, attempt to select `next` or `prev`, if there's nothing there, the function will kick out on next step. CRAZY NESTED TERNARIES!!!!!
this.options.infiniteWrap?$curSlide.next('.'+this.options.slideClass).length?$curSlide.next('.'+this.options.slideClass):$firstSlide:$curSlide.next('.'+this.options.slideClass)://pick next slide if moving left to right
this.options.infiniteWrap?$curSlide.prev('.'+this.options.slideClass).length?$curSlide.prev('.'+this.options.slideClass):$lastSlide:$curSlide.prev('.'+this.options.slideClass);//pick prev slide if moving right to left
}else{$newSlide=chosenSlide;}if($newSlide.length){if(this.options.bullets){idx=idx||this.$slides.index($newSlide);//grab index to update bullets
this._updateBullets(idx);}if(this.options.useMUI){Foundation.Motion.animateIn($newSlide.addClass('is-active').css({'position':'absolute','top':0}),this.options['animInFrom'+dirIn],function(){$newSlide.css({'position':'relative','display':'block'}).attr('aria-live','polite');});Foundation.Motion.animateOut($curSlide.removeClass('is-active'),this.options['animOutTo'+dirOut],function(){$curSlide.removeAttr('aria-live');if(_this.options.autoPlay&&!_this.timer.isPaused){_this.timer.restart();}//do stuff?
});}else{$curSlide.removeClass('is-active is-in').removeAttr('aria-live').hide();$newSlide.addClass('is-active is-in').attr('aria-live','polite').show();if(this.options.autoPlay&&!this.timer.isPaused){this.timer.restart();}}/**
    * Triggers when the slide has finished animating in.
    * @event Orbit#slidechange
    */this.$element.trigger('slidechange.zf.orbit',[$newSlide]);}}/**
  * Updates the active state of the bullets, if displayed.
  * @function
  * @private
  * @param {Number} idx - the index of the current slide.
  */},{key:'_updateBullets',value:function _updateBullets(idx){var $oldBullet=this.$element.find('.'+this.options.boxOfBullets).find('.is-active').removeClass('is-active').blur(),span=$oldBullet.find('span:last').detach(),$newBullet=this.$bullets.eq(idx).addClass('is-active').append(span);}/**
  * Destroys the carousel and hides the element.
  * @function
  */},{key:'destroy',value:function destroy(){this.$element.off('.zf.orbit').find('*').off('.zf.orbit').end().hide();Foundation.unregisterPlugin(this);}}]);return Orbit;}();Orbit.defaults={/**
  * Tells the JS to look for and loadBullets.
  * @option
  * @example true
  */bullets:true,/**
  * Tells the JS to apply event listeners to nav buttons
  * @option
  * @example true
  */navButtons:true,/**
  * motion-ui animation class to apply
  * @option
  * @example 'slide-in-right'
  */animInFromRight:'slide-in-right',/**
  * motion-ui animation class to apply
  * @option
  * @example 'slide-out-right'
  */animOutToRight:'slide-out-right',/**
  * motion-ui animation class to apply
  * @option
  * @example 'slide-in-left'
  *
  */animInFromLeft:'slide-in-left',/**
  * motion-ui animation class to apply
  * @option
  * @example 'slide-out-left'
  */animOutToLeft:'slide-out-left',/**
  * Allows Orbit to automatically animate on page load.
  * @option
  * @example true
  */autoPlay:true,/**
  * Amount of time, in ms, between slide transitions
  * @option
  * @example 5000
  */timerDelay:5000,/**
  * Allows Orbit to infinitely loop through the slides
  * @option
  * @example true
  */infiniteWrap:true,/**
  * Allows the Orbit slides to bind to swipe events for mobile, requires an additional util library
  * @option
  * @example true
  */swipe:true,/**
  * Allows the timing function to pause animation on hover.
  * @option
  * @example true
  */pauseOnHover:true,/**
  * Allows Orbit to bind keyboard events to the slider, to animate frames with arrow keys
  * @option
  * @example true
  */accessible:true,/**
  * Class applied to the container of Orbit
  * @option
  * @example 'orbit-container'
  */containerClass:'orbit-container',/**
  * Class applied to individual slides.
  * @option
  * @example 'orbit-slide'
  */slideClass:'orbit-slide',/**
  * Class applied to the bullet container. You're welcome.
  * @option
  * @example 'orbit-bullets'
  */boxOfBullets:'orbit-bullets',/**
  * Class applied to the `next` navigation button.
  * @option
  * @example 'orbit-next'
  */nextClass:'orbit-next',/**
  * Class applied to the `previous` navigation button.
  * @option
  * @example 'orbit-previous'
  */prevClass:'orbit-previous',/**
  * Boolean to flag the js to use motion ui classes or not. Default to true for backwards compatability.
  * @option
  * @example true
  */useMUI:true};// Window exports
Foundation.plugin(Orbit,'Orbit');}(jQuery);'use strict';!function($){/**
 * ResponsiveMenu module.
 * @module foundation.responsiveMenu
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.accordionMenu
 * @requires foundation.util.drilldown
 * @requires foundation.util.dropdown-menu
 */var ResponsiveMenu=function(){/**
   * Creates a new instance of a responsive menu.
   * @class
   * @fires ResponsiveMenu#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */function ResponsiveMenu(element,options){_classCallCheck(this,ResponsiveMenu);this.$element=$(element);this.rules=this.$element.data('responsive-menu');this.currentMq=null;this.currentPlugin=null;this._init();this._events();Foundation.registerPlugin(this,'ResponsiveMenu');}/**
   * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.
   * @function
   * @private
   */_createClass(ResponsiveMenu,[{key:'_init',value:function _init(){var rulesTree={};// Parse rules from "classes" in data attribute
var rules=this.rules.split(' ');// Iterate through every rule found
for(var i=0;i<rules.length;i++){var rule=rules[i].split('-');var ruleSize=rule.length>1?rule[0]:'small';var rulePlugin=rule.length>1?rule[1]:rule[0];if(MenuPlugins[rulePlugin]!==null){rulesTree[ruleSize]=MenuPlugins[rulePlugin];}}this.rules=rulesTree;if(!$.isEmptyObject(rulesTree)){this._checkMediaQueries();}}/**
   * Initializes events for the Menu.
   * @function
   * @private
   */},{key:'_events',value:function _events(){var _this=this;$(window).on('changed.zf.mediaquery',function(){_this._checkMediaQueries();});// $(window).on('resize.zf.ResponsiveMenu', function() {
//   _this._checkMediaQueries();
// });
}/**
   * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
   * @function
   * @private
   */},{key:'_checkMediaQueries',value:function _checkMediaQueries(){var matchedMq,_this=this;// Iterate through each rule and find the last matching rule
$.each(this.rules,function(key){if(Foundation.MediaQuery.atLeast(key)){matchedMq=key;}});// No match? No dice
if(!matchedMq)return;// Plugin already initialized? We good
if(this.currentPlugin instanceof this.rules[matchedMq].plugin)return;// Remove existing plugin-specific CSS classes
$.each(MenuPlugins,function(key,value){_this.$element.removeClass(value.cssClass);});// Add the CSS class for the new plugin
this.$element.addClass(this.rules[matchedMq].cssClass);// Create an instance of the new plugin
if(this.currentPlugin)this.currentPlugin.destroy();this.currentPlugin=new this.rules[matchedMq].plugin(this.$element,{});}/**
   * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
   * @function
   */},{key:'destroy',value:function destroy(){this.currentPlugin.destroy();$(window).off('.zf.ResponsiveMenu');Foundation.unregisterPlugin(this);}}]);return ResponsiveMenu;}();ResponsiveMenu.defaults={};// The plugin matches the plugin classes with these plugin instances.
var MenuPlugins={dropdown:{cssClass:'dropdown',plugin:Foundation._plugins['dropdown-menu']||null},drilldown:{cssClass:'drilldown',plugin:Foundation._plugins['drilldown']||null},accordion:{cssClass:'accordion-menu',plugin:Foundation._plugins['accordion-menu']||null}};// Window exports
Foundation.plugin(ResponsiveMenu,'ResponsiveMenu');}(jQuery);'use strict';!function($){/**
 * ResponsiveToggle module.
 * @module foundation.responsiveToggle
 * @requires foundation.util.mediaQuery
 */var ResponsiveToggle=function(){/**
   * Creates a new instance of Tab Bar.
   * @class
   * @fires ResponsiveToggle#init
   * @param {jQuery} element - jQuery object to attach tab bar functionality to.
   * @param {Object} options - Overrides to the default plugin settings.
   */function ResponsiveToggle(element,options){_classCallCheck(this,ResponsiveToggle);this.$element=$(element);this.options=$.extend({},ResponsiveToggle.defaults,this.$element.data(),options);this._init();this._events();Foundation.registerPlugin(this,'ResponsiveToggle');}/**
   * Initializes the tab bar by finding the target element, toggling element, and running update().
   * @function
   * @private
   */_createClass(ResponsiveToggle,[{key:'_init',value:function _init(){var targetID=this.$element.data('responsive-toggle');if(!targetID){console.error('Your tab bar needs an ID of a Menu as the value of data-tab-bar.');}this.$targetMenu=$('#'+targetID);this.$toggler=this.$element.find('[data-toggle]');this._update();}/**
   * Adds necessary event handlers for the tab bar to work.
   * @function
   * @private
   */},{key:'_events',value:function _events(){var _this=this;$(window).on('changed.zf.mediaquery',this._update.bind(this));this.$toggler.on('click.zf.responsiveToggle',this.toggleMenu.bind(this));}/**
   * Checks the current media query to determine if the tab bar should be visible or hidden.
   * @function
   * @private
   */},{key:'_update',value:function _update(){// Mobile
if(!Foundation.MediaQuery.atLeast(this.options.hideFor)){this.$element.show();this.$targetMenu.hide();}// Desktop
else{this.$element.hide();this.$targetMenu.show();}}/**
   * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.
   * @function
   * @fires ResponsiveToggle#toggled
   */},{key:'toggleMenu',value:function toggleMenu(){if(!Foundation.MediaQuery.atLeast(this.options.hideFor)){this.$targetMenu.toggle(0);/**
       * Fires when the element attached to the tab bar toggles.
       * @event ResponsiveToggle#toggled
       */this.$element.trigger('toggled.zf.responsiveToggle');}}},{key:'destroy',value:function destroy(){//TODO this...
}}]);return ResponsiveToggle;}();ResponsiveToggle.defaults={/**
   * The breakpoint after which the menu is always shown, and the tab bar is hidden.
   * @option
   * @example 'medium'
   */hideFor:'medium'};// Window exports
Foundation.plugin(ResponsiveToggle,'ResponsiveToggle');}(jQuery);'use strict';!function($){/**
 * Reveal module.
 * @module foundation.reveal
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion if using animations
 */var Reveal=function(){/**
   * Creates a new instance of Reveal.
   * @class
   * @param {jQuery} element - jQuery object to use for the modal.
   * @param {Object} options - optional parameters.
   */function Reveal(element,options){_classCallCheck(this,Reveal);this.$element=element;this.options=$.extend({},Reveal.defaults,this.$element.data(),options);this._init();Foundation.registerPlugin(this,'Reveal');Foundation.Keyboard.register('Reveal',{'ENTER':'open','SPACE':'open','ESCAPE':'close','TAB':'tab_forward','SHIFT_TAB':'tab_backward'});}/**
   * Initializes the modal by adding the overlay and close buttons, (if selected).
   * @private
   */_createClass(Reveal,[{key:'_init',value:function _init(){this.id=this.$element.attr('id');this.isActive=false;this.cached={mq:Foundation.MediaQuery.current};this.isiOS=iPhoneSniff();if(this.isiOS){this.$element.addClass('is-ios');}this.$anchor=$('[data-open="'+this.id+'"]').length?$('[data-open="'+this.id+'"]'):$('[data-toggle="'+this.id+'"]');if(this.$anchor.length){var anchorId=this.$anchor[0].id||Foundation.GetYoDigits(6,'reveal');this.$anchor.attr({'aria-controls':this.id,'id':anchorId,'aria-haspopup':true,'tabindex':0});this.$element.attr({'aria-labelledby':anchorId});}if(this.options.fullScreen||this.$element.hasClass('full')){this.options.fullScreen=true;this.options.overlay=false;}if(this.options.overlay&&!this.$overlay){this.$overlay=this._makeOverlay(this.id);}this.$element.attr({'role':'dialog','aria-hidden':true,'data-yeti-box':this.id,'data-resize':this.id});if(this.$overlay){this.$element.detach().appendTo(this.$overlay);}else{this.$element.detach().appendTo($('body'));this.$element.addClass('without-overlay');}this._events();if(this.options.deepLink&&window.location.hash==='#'+this.id){$(window).one('load.zf.reveal',this.open.bind(this));}}/**
   * Creates an overlay div to display behind the modal.
   * @private
   */},{key:'_makeOverlay',value:function _makeOverlay(id){var $overlay=$('<div></div>').addClass('reveal-overlay').attr({'tabindex':-1,'aria-hidden':true}).appendTo('body');return $overlay;}/**
   * Updates position of modal
   * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
   * @private
   */},{key:'_updatePosition',value:function _updatePosition(){var width=this.$element.outerWidth();var outerWidth=$(window).width();var height=this.$element.outerHeight();var outerHeight=$(window).height();var left=parseInt((outerWidth-width)/2,10);var top;if(height>outerHeight){top=parseInt(Math.min(100,outerHeight/10),10);}else{top=parseInt((outerHeight-height)/4,10);}this.$element.css({top:top+'px'});// only worry about left if we don't have an overlay, otherwise we're perfectly in the middle
if(!this.$overlay){this.$element.css({left:left+'px'});}}/**
   * Adds event handlers for the modal.
   * @private
   */},{key:'_events',value:function _events(){var _this=this;this.$element.on({'open.zf.trigger':this.open.bind(this),'close.zf.trigger':this.close.bind(this),'toggle.zf.trigger':this.toggle.bind(this),'resizeme.zf.trigger':function resizemeZfTrigger(){_this._updatePosition();}});if(this.$anchor.length){this.$anchor.on('keydown.zf.reveal',function(e){if(e.which===13||e.which===32){e.stopPropagation();e.preventDefault();_this.open();}});}if(this.options.closeOnClick&&this.options.overlay){this.$overlay.off('.zf.reveal').on('click.zf.reveal',function(e){if(e.target===_this.$element[0]||$.contains(_this.$element[0],e.target)){return;}_this.close();});}if(this.options.deepLink){$(window).on('popstate.zf.reveal:'+this.id,this._handleState.bind(this));}}/**
   * Handles modal methods on back/forward button clicks or any other event that triggers popstate.
   * @private
   */},{key:'_handleState',value:function _handleState(e){if(window.location.hash==='#'+this.id&&!this.isActive){this.open();}else{this.close();}}/**
   * Opens the modal controlled by `this.$anchor`, and closes all others by default.
   * @function
   * @fires Reveal#closeme
   * @fires Reveal#open
   */},{key:'open',value:function open(){var _this5=this;if(this.options.deepLink){var hash='#'+this.id;if(window.history.pushState){window.history.pushState(null,null,hash);}else{window.location.hash=hash;}}this.isActive=true;// Make elements invisible, but remove display: none so we can get size and positioning
this.$element.css({'visibility':'hidden'}).show().scrollTop(0);if(this.options.overlay){this.$overlay.css({'visibility':'hidden'}).show();}this._updatePosition();this.$element.hide().css({'visibility':''});if(this.$overlay){this.$overlay.css({'visibility':''}).hide();}if(!this.options.multipleOpened){/**
       * Fires immediately before the modal opens.
       * Closes any other modals that are currently open
       * @event Reveal#closeme
       */this.$element.trigger('closeme.zf.reveal',this.id);}// Motion UI method of reveal
if(this.options.animationIn){if(this.options.overlay){Foundation.Motion.animateIn(this.$overlay,'fade-in');}Foundation.Motion.animateIn(this.$element,this.options.animationIn,function(){this.focusableElements=Foundation.Keyboard.findFocusable(this.$element);});}// jQuery method of reveal
else{if(this.options.overlay){this.$overlay.show(0);}this.$element.show(this.options.showDelay);}// handle accessibility
this.$element.attr({'aria-hidden':false,'tabindex':-1}).focus();/**
     * Fires when the modal has successfully opened.
     * @event Reveal#open
     */this.$element.trigger('open.zf.reveal');if(this.isiOS){var scrollPos=window.pageYOffset;$('html, body').addClass('is-reveal-open').scrollTop(scrollPos);}else{$('body').addClass('is-reveal-open');}$('body').addClass('is-reveal-open').attr('aria-hidden',this.options.overlay||this.options.fullScreen?true:false);setTimeout(function(){_this5._extraHandlers();},0);}/**
   * Adds extra event handlers for the body and window if necessary.
   * @private
   */},{key:'_extraHandlers',value:function _extraHandlers(){var _this=this;this.focusableElements=Foundation.Keyboard.findFocusable(this.$element);if(!this.options.overlay&&this.options.closeOnClick&&!this.options.fullScreen){$('body').on('click.zf.reveal',function(e){if(e.target===_this.$element[0]||$.contains(_this.$element[0],e.target)){return;}_this.close();});}if(this.options.closeOnEsc){$(window).on('keydown.zf.reveal',function(e){Foundation.Keyboard.handleKey(e,'Reveal',{close:function close(){if(_this.options.closeOnEsc){_this.close();_this.$anchor.focus();}}});if(_this.focusableElements.length===0){// no focusable elements inside the modal at all, prevent tabbing in general
e.preventDefault();}});}// lock focus within modal while tabbing
this.$element.on('keydown.zf.reveal',function(e){var $target=$(this);// handle keyboard event with keyboard util
Foundation.Keyboard.handleKey(e,'Reveal',{tab_forward:function tab_forward(){if(_this.$element.find(':focus').is(_this.focusableElements.eq(-1))){// left modal downwards, setting focus to first element
_this.focusableElements.eq(0).focus();e.preventDefault();}},tab_backward:function tab_backward(){if(_this.$element.find(':focus').is(_this.focusableElements.eq(0))||_this.$element.is(':focus')){// left modal upwards, setting focus to last element
_this.focusableElements.eq(-1).focus();e.preventDefault();}},open:function open(){if(_this.$element.find(':focus').is(_this.$element.find('[data-close]'))){setTimeout(function(){// set focus back to anchor if close button has been activated
_this.$anchor.focus();},1);}else if($target.is(_this.focusableElements)){// dont't trigger if acual element has focus (i.e. inputs, links, ...)
_this.open();}},close:function close(){if(_this.options.closeOnEsc){_this.close();_this.$anchor.focus();}}});});}/**
   * Closes the modal.
   * @function
   * @fires Reveal#closed
   */},{key:'close',value:function close(){if(!this.isActive||!this.$element.is(':visible')){return false;}var _this=this;// Motion UI method of hiding
if(this.options.animationOut){if(this.options.overlay){Foundation.Motion.animateOut(this.$overlay,'fade-out',finishUp);}else{finishUp();}Foundation.Motion.animateOut(this.$element,this.options.animationOut);}// jQuery method of hiding
else{if(this.options.overlay){this.$overlay.hide(0,finishUp);}else{finishUp();}this.$element.hide(this.options.hideDelay);}// Conditionals to remove extra event listeners added on open
if(this.options.closeOnEsc){$(window).off('keydown.zf.reveal');}if(!this.options.overlay&&this.options.closeOnClick){$('body').off('click.zf.reveal');}this.$element.off('keydown.zf.reveal');function finishUp(){if(_this.isiOS){$('html, body').removeClass('is-reveal-open');}else{$('body').removeClass('is-reveal-open');}$('body').attr({'aria-hidden':false,'tabindex':''});_this.$element.attr('aria-hidden',true);/**
      * Fires when the modal is done closing.
      * @event Reveal#closed
      */_this.$element.trigger('closed.zf.reveal');}/**
    * Resets the modal content
    * This prevents a running video to keep going in the background
    */if(this.options.resetOnClose){this.$element.html(this.$element.html());}this.isActive=false;if(_this.options.deepLink){if(window.history.replaceState){window.history.replaceState("",document.title,window.location.pathname);}else{window.location.hash='';}}}/**
   * Toggles the open/closed state of a modal.
   * @function
   */},{key:'toggle',value:function toggle(){if(this.isActive){this.close();}else{this.open();}}},{key:'destroy',/**
   * Destroys an instance of a modal.
   * @function
   */value:function destroy(){if(this.options.overlay){this.$overlay.hide().off().remove();}this.$element.hide().off();this.$anchor.off('.zf');$(window).off('.zf.reveal:'+this.id);Foundation.unregisterPlugin(this);}}]);return Reveal;}();Reveal.defaults={/**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @example 'slide-in-left'
   */animationIn:'',/**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @example 'slide-out-right'
   */animationOut:'',/**
   * Time, in ms, to delay the opening of a modal after a click if no animation used.
   * @option
   * @example 10
   */showDelay:0,/**
   * Time, in ms, to delay the closing of a modal after a click if no animation used.
   * @option
   * @example 10
   */hideDelay:0,/**
   * Allows a click on the body/overlay to close the modal.
   * @option
   * @example true
   */closeOnClick:true,/**
   * Allows the modal to close if the user presses the `ESCAPE` key.
   * @option
   * @example true
   */closeOnEsc:true,/**
   * If true, allows multiple modals to be displayed at once.
   * @option
   * @example false
   */multipleOpened:false,/**
   * Distance, in pixels, the modal should push down from the top of the screen.
   * @option
   * @example 100
   */vOffset:100,/**
   * Distance, in pixels, the modal should push in from the side of the screen.
   * @option
   * @example 0
   */hOffset:0,/**
   * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.
   * @option
   * @example false
   */fullScreen:false,/**
   * Percentage of screen height the modal should push up from the bottom of the view.
   * @option
   * @example 10
   */btmOffsetPct:10,/**
   * Allows the modal to generate an overlay div, which will cover the view when modal opens.
   * @option
   * @example true
   */overlay:true,/**
   * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.
   * @option
   * @example false
   */resetOnClose:false,/**
   * Allows the modal to alter the url on open/close, and allows the use of the `back` button to close modals. ALSO, allows a modal to auto-maniacally open on page load IF the hash === the modal's user-set id.
   * @option
   * @example false
   */deepLink:false};// Window exports
Foundation.plugin(Reveal,'Reveal');function iPhoneSniff(){return /iP(ad|hone|od).*OS/.test(window.navigator.userAgent);}}(jQuery);'use strict';!function($){/**
 * Slider module.
 * @module foundation.slider
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 * @requires foundation.util.keyboard
 * @requires foundation.util.touch
 */var Slider=function(){/**
   * Creates a new instance of a drilldown menu.
   * @class
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */function Slider(element,options){_classCallCheck(this,Slider);this.$element=element;this.options=$.extend({},Slider.defaults,this.$element.data(),options);this._init();Foundation.registerPlugin(this,'Slider');Foundation.Keyboard.register('Slider',{'ltr':{'ARROW_RIGHT':'increase','ARROW_UP':'increase','ARROW_DOWN':'decrease','ARROW_LEFT':'decrease','SHIFT_ARROW_RIGHT':'increase_fast','SHIFT_ARROW_UP':'increase_fast','SHIFT_ARROW_DOWN':'decrease_fast','SHIFT_ARROW_LEFT':'decrease_fast'},'rtl':{'ARROW_LEFT':'increase','ARROW_RIGHT':'decrease','SHIFT_ARROW_LEFT':'increase_fast','SHIFT_ARROW_RIGHT':'decrease_fast'}});}/**
   * Initilizes the plugin by reading/setting attributes, creating collections and setting the initial position of the handle(s).
   * @function
   * @private
   */_createClass(Slider,[{key:'_init',value:function _init(){this.inputs=this.$element.find('input');this.handles=this.$element.find('[data-slider-handle]');this.$handle=this.handles.eq(0);this.$input=this.inputs.length?this.inputs.eq(0):$('#'+this.$handle.attr('aria-controls'));this.$fill=this.$element.find('[data-slider-fill]').css(this.options.vertical?'height':'width',0);var isDbl=false,_this=this;if(this.options.disabled||this.$element.hasClass(this.options.disabledClass)){this.options.disabled=true;this.$element.addClass(this.options.disabledClass);}if(!this.inputs.length){this.inputs=$().add(this.$input);this.options.binding=true;}this._setInitAttr(0);this._events(this.$handle);if(this.handles[1]){this.options.doubleSided=true;this.$handle2=this.handles.eq(1);this.$input2=this.inputs.length>1?this.inputs.eq(1):$('#'+this.$handle2.attr('aria-controls'));if(!this.inputs[1]){this.inputs=this.inputs.add(this.$input2);}isDbl=true;this._setHandlePos(this.$handle,this.options.initialStart,true,function(){_this._setHandlePos(_this.$handle2,_this.options.initialEnd,true);});// this.$handle.triggerHandler('click.zf.slider');
this._setInitAttr(1);this._events(this.$handle2);}if(!isDbl){this._setHandlePos(this.$handle,this.options.initialStart,true);}}/**
   * Sets the position of the selected handle and fill bar.
   * @function
   * @private
   * @param {jQuery} $hndl - the selected handle to move.
   * @param {Number} location - floating point between the start and end values of the slider bar.
   * @param {Function} cb - callback function to fire on completion.
   * @fires Slider#moved
   */},{key:'_setHandlePos',value:function _setHandlePos($hndl,location,noInvert,cb){//might need to alter that slightly for bars that will have odd number selections.
location=parseFloat(location);//on input change events, convert string to number...grumble.
// prevent slider from running out of bounds, if value exceeds the limits set through options, override the value to min/max
if(location<this.options.start){location=this.options.start;}else if(location>this.options.end){location=this.options.end;}var isDbl=this.options.doubleSided;if(isDbl){//this block is to prevent 2 handles from crossing eachother. Could/should be improved.
if(this.handles.index($hndl)===0){var h2Val=parseFloat(this.$handle2.attr('aria-valuenow'));location=location>=h2Val?h2Val-this.options.step:location;}else{var h1Val=parseFloat(this.$handle.attr('aria-valuenow'));location=location<=h1Val?h1Val+this.options.step:location;}}//this is for single-handled vertical sliders, it adjusts the value to account for the slider being "upside-down"
//for click and drag events, it's weird due to the scale(-1, 1) css property
if(this.options.vertical&&!noInvert){location=this.options.end-location;}var _this=this,vert=this.options.vertical,hOrW=vert?'height':'width',lOrT=vert?'top':'left',handleDim=$hndl[0].getBoundingClientRect()[hOrW],elemDim=this.$element[0].getBoundingClientRect()[hOrW],//percentage of bar min/max value based on click or drag point
pctOfBar=percent(location,this.options.end).toFixed(2),//number of actual pixels to shift the handle, based on the percentage obtained above
pxToMove=(elemDim-handleDim)*pctOfBar,//percentage of bar to shift the handle
movement=(percent(pxToMove,elemDim)*100).toFixed(this.options.decimal);//fixing the decimal value for the location number, is passed to other methods as a fixed floating-point value
location=parseFloat(location.toFixed(this.options.decimal));// declare empty object for css adjustments, only used with 2 handled-sliders
var css={};this._setValues($hndl,location);// TODO update to calculate based on values set to respective inputs??
if(isDbl){var isLeftHndl=this.handles.index($hndl)===0,//empty variable, will be used for min-height/width for fill bar
dim,//percentage w/h of the handle compared to the slider bar
handlePct=~~(percent(handleDim,elemDim)*100);//if left handle, the math is slightly different than if it's the right handle, and the left/top property needs to be changed for the fill bar
if(isLeftHndl){//left or top percentage value to apply to the fill bar.
css[lOrT]=movement+'%';//calculate the new min-height/width for the fill bar.
dim=parseFloat(this.$handle2[0].style[lOrT])-movement+handlePct;//this callback is necessary to prevent errors and allow the proper placement and initialization of a 2-handled slider
//plus, it means we don't care if 'dim' isNaN on init, it won't be in the future.
if(cb&&typeof cb==='function'){cb();}//this is only needed for the initialization of 2 handled sliders
}else{//just caching the value of the left/bottom handle's left/top property
var handlePos=parseFloat(this.$handle[0].style[lOrT]);//calculate the new min-height/width for the fill bar. Use isNaN to prevent false positives for numbers <= 0
//based on the percentage of movement of the handle being manipulated, less the opposing handle's left/top position, plus the percentage w/h of the handle itself
dim=movement-(isNaN(handlePos)?this.options.initialStart/((this.options.end-this.options.start)/100):handlePos)+handlePct;}// assign the min-height/width to our css object
css['min-'+hOrW]=dim+'%';}this.$element.one('finished.zf.animate',function(){/**
                     * Fires when the handle is done moving.
                     * @event Slider#moved
                     */_this.$element.trigger('moved.zf.slider',[$hndl]);});//because we don't know exactly how the handle will be moved, check the amount of time it should take to move.
var moveTime=this.$element.data('dragging')?1000/60:this.options.moveTime;Foundation.Move(moveTime,$hndl,function(){//adjusting the left/top property of the handle, based on the percentage calculated above
$hndl.css(lOrT,movement+'%');if(!_this.options.doubleSided){//if single-handled, a simple method to expand the fill bar
_this.$fill.css(hOrW,pctOfBar*100+'%');}else{//otherwise, use the css object we created above
_this.$fill.css(css);}});}/**
   * Sets the initial attribute for the slider element.
   * @function
   * @private
   * @param {Number} idx - index of the current handle/input to use.
   */},{key:'_setInitAttr',value:function _setInitAttr(idx){var id=this.inputs.eq(idx).attr('id')||Foundation.GetYoDigits(6,'slider');this.inputs.eq(idx).attr({'id':id,'max':this.options.end,'min':this.options.start,'step':this.options.step});this.handles.eq(idx).attr({'role':'slider','aria-controls':id,'aria-valuemax':this.options.end,'aria-valuemin':this.options.start,'aria-valuenow':idx===0?this.options.initialStart:this.options.initialEnd,'aria-orientation':this.options.vertical?'vertical':'horizontal','tabindex':0});}/**
   * Sets the input and `aria-valuenow` values for the slider element.
   * @function
   * @private
   * @param {jQuery} $handle - the currently selected handle.
   * @param {Number} val - floating point of the new value.
   */},{key:'_setValues',value:function _setValues($handle,val){var idx=this.options.doubleSided?this.handles.index($handle):0;this.inputs.eq(idx).val(val);$handle.attr('aria-valuenow',val);}/**
   * Handles events on the slider element.
   * Calculates the new location of the current handle.
   * If there are two handles and the bar was clicked, it determines which handle to move.
   * @function
   * @private
   * @param {Object} e - the `event` object passed from the listener.
   * @param {jQuery} $handle - the current handle to calculate for, if selected.
   * @param {Number} val - floating point number for the new value of the slider.
   * TODO clean this up, there's a lot of repeated code between this and the _setHandlePos fn.
   */},{key:'_handleEvent',value:function _handleEvent(e,$handle,val){var value,hasVal;if(!val){//click or drag events
e.preventDefault();var _this=this,vertical=this.options.vertical,param=vertical?'height':'width',direction=vertical?'top':'left',pageXY=vertical?e.pageY:e.pageX,halfOfHandle=this.$handle[0].getBoundingClientRect()[param]/2,barDim=this.$element[0].getBoundingClientRect()[param],barOffset=this.$element.offset()[direction]-pageXY,//if the cursor position is less than or greater than the elements bounding coordinates, set coordinates within those bounds
barXY=barOffset>0?-halfOfHandle:barOffset-halfOfHandle<-barDim?barDim:Math.abs(barOffset),offsetPct=percent(barXY,barDim);value=(this.options.end-this.options.start)*offsetPct;// turn everything around for RTL, yay math!
if(Foundation.rtl()&&!this.options.vertical){value=this.options.end-value;}value=_this._adjustValue(null,value);//boolean flag for the setHandlePos fn, specifically for vertical sliders
hasVal=false;if(!$handle){//figure out which handle it is, pass it to the next function.
var firstHndlPos=absPosition(this.$handle,direction,barXY,param),secndHndlPos=absPosition(this.$handle2,direction,barXY,param);$handle=firstHndlPos<=secndHndlPos?this.$handle:this.$handle2;}}else{//change event on input
value=this._adjustValue(null,val);hasVal=true;}this._setHandlePos($handle,value,hasVal);}/**
   * Adjustes value for handle in regard to step value. returns adjusted value
   * @function
   * @private
   * @param {jQuery} $handle - the selected handle.
   * @param {Number} value - value to adjust. used if $handle is falsy
   */},{key:'_adjustValue',value:function _adjustValue($handle,value){var val,step=this.options.step,div=parseFloat(step/2),left,prev_val,next_val;if(!!$handle){val=parseFloat($handle.attr('aria-valuenow'));}else{val=value;}left=val%step;prev_val=val-left;next_val=prev_val+step;if(left===0){return val;}val=val>=prev_val+div?next_val:prev_val;return val;}/**
   * Adds event listeners to the slider elements.
   * @function
   * @private
   * @param {jQuery} $handle - the current handle to apply listeners to.
   */},{key:'_events',value:function _events($handle){if(this.options.disabled){return false;}var _this=this,curHandle,timer;this.inputs.off('change.zf.slider').on('change.zf.slider',function(e){var idx=_this.inputs.index($(this));_this._handleEvent(e,_this.handles.eq(idx),$(this).val());});if(this.options.clickSelect){this.$element.off('click.zf.slider').on('click.zf.slider',function(e){if(_this.$element.data('dragging')){return false;}if(!$(e.target).is('[data-slider-handle]')){if(_this.options.doubleSided){_this._handleEvent(e);}else{_this._handleEvent(e,_this.$handle);}}});}if(this.options.draggable){this.handles.addTouch();var $body=$('body');$handle.off('mousedown.zf.slider').on('mousedown.zf.slider',function(e){$handle.addClass('is-dragging');_this.$fill.addClass('is-dragging');//
_this.$element.data('dragging',true);curHandle=$(e.currentTarget);$body.on('mousemove.zf.slider',function(e){e.preventDefault();_this._handleEvent(e,curHandle);}).on('mouseup.zf.slider',function(e){_this._handleEvent(e,curHandle);$handle.removeClass('is-dragging');_this.$fill.removeClass('is-dragging');_this.$element.data('dragging',false);$body.off('mousemove.zf.slider mouseup.zf.slider');});});}$handle.off('keydown.zf.slider').on('keydown.zf.slider',function(e){var _$handle=$(this),idx=_this.options.doubleSided?_this.handles.index(_$handle):0,oldValue=parseFloat(_this.inputs.eq(idx).val()),newValue;// handle keyboard event with keyboard util
Foundation.Keyboard.handleKey(e,'Slider',{decrease:function decrease(){newValue=oldValue-_this.options.step;},increase:function increase(){newValue=oldValue+_this.options.step;},decrease_fast:function decrease_fast(){newValue=oldValue-_this.options.step*10;},increase_fast:function increase_fast(){newValue=oldValue+_this.options.step*10;},handled:function handled(){// only set handle pos when event was handled specially
e.preventDefault();_this._setHandlePos(_$handle,newValue,true);}});/*if (newValue) { // if pressed key has special function, update value
        e.preventDefault();
        _this._setHandlePos(_$handle, newValue);
      }*/});}/**
   * Destroys the slider plugin.
   */},{key:'destroy',value:function destroy(){this.handles.off('.zf.slider');this.inputs.off('.zf.slider');this.$element.off('.zf.slider');Foundation.unregisterPlugin(this);}}]);return Slider;}();Slider.defaults={/**
   * Minimum value for the slider scale.
   * @option
   * @example 0
   */start:0,/**
   * Maximum value for the slider scale.
   * @option
   * @example 100
   */end:100,/**
   * Minimum value change per change event.
   * @option
   * @example 1
   */step:1,/**
   * Value at which the handle/input *(left handle/first input)* should be set to on initialization.
   * @option
   * @example 0
   */initialStart:0,/**
   * Value at which the right handle/second input should be set to on initialization.
   * @option
   * @example 100
   */initialEnd:100,/**
   * Allows the input to be located outside the container and visible. Set to by the JS
   * @option
   * @example false
   */binding:false,/**
   * Allows the user to click/tap on the slider bar to select a value.
   * @option
   * @example true
   */clickSelect:true,/**
   * Set to true and use the `vertical` class to change alignment to vertical.
   * @option
   * @example false
   */vertical:false,/**
   * Allows the user to drag the slider handle(s) to select a value.
   * @option
   * @example true
   */draggable:true,/**
   * Disables the slider and prevents event listeners from being applied. Double checked by JS with `disabledClass`.
   * @option
   * @example false
   */disabled:false,/**
   * Allows the use of two handles. Double checked by the JS. Changes some logic handling.
   * @option
   * @example false
   */doubleSided:false,/**
   * Potential future feature.
   */// steps: 100,
/**
   * Number of decimal places the plugin should go to for floating point precision.
   * @option
   * @example 2
   */decimal:2,/**
   * Time delay for dragged elements.
   */// dragDelay: 0,
/**
   * Time, in ms, to animate the movement of a slider handle if user clicks/taps on the bar. Needs to be manually set if updating the transition time in the Sass settings.
   * @option
   * @example 200
   */moveTime:200,//update this if changing the transition time in the sass
/**
   * Class applied to disabled sliders.
   * @option
   * @example 'disabled'
   */disabledClass:'disabled',/**
   * Will invert the default layout for a vertical<span data-tooltip title="who would do this???"> </span>slider.
   * @option
   * @example false
   */invertVertical:false};function percent(frac,num){return frac/num;}function absPosition($handle,dir,clickPos,param){return Math.abs($handle.position()[dir]+$handle[param]()/2-clickPos);}// Window exports
Foundation.plugin(Slider,'Slider');}(jQuery);//*********this is in case we go to static, absolute positions instead of dynamic positioning********
// this.setSteps(function() {
//   _this._events();
//   var initStart = _this.options.positions[_this.options.initialStart - 1] || null;
//   var initEnd = _this.options.initialEnd ? _this.options.position[_this.options.initialEnd - 1] : null;
//   if (initStart || initEnd) {
//     _this._handleEvent(initStart, initEnd);
//   }
// });
//***********the other part of absolute positions*************
// Slider.prototype.setSteps = function(cb) {
//   var posChange = this.$element.outerWidth() / this.options.steps;
//   var counter = 0
//   while(counter < this.options.steps) {
//     if (counter) {
//       this.options.positions.push(this.options.positions[counter - 1] + posChange);
//     } else {
//       this.options.positions.push(posChange);
//     }
//     counter++;
//   }
//   cb();
// };
'use strict';!function($){/**
 * Sticky module.
 * @module foundation.sticky
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */var Sticky=function(){/**
   * Creates a new instance of a sticky thing.
   * @class
   * @param {jQuery} element - jQuery object to make sticky.
   * @param {Object} options - options object passed when creating the element programmatically.
   */function Sticky(element,options){_classCallCheck(this,Sticky);this.$element=element;this.options=$.extend({},Sticky.defaults,this.$element.data(),options);this._init();Foundation.registerPlugin(this,'Sticky');}/**
   * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
   * @function
   * @private
   */_createClass(Sticky,[{key:'_init',value:function _init(){var $parent=this.$element.parent('[data-sticky-container]'),id=this.$element[0].id||Foundation.GetYoDigits(6,'sticky'),_this=this;if(!$parent.length){this.wasWrapped=true;}this.$container=$parent.length?$parent:$(this.options.container).wrapInner(this.$element);this.$container.addClass(this.options.containerClass);this.$element.addClass(this.options.stickyClass).attr({'data-resize':id});this.scrollCount=this.options.checkEvery;this.isStuck=false;$(window).one('load.zf.sticky',function(){if(_this.options.anchor!==''){_this.$anchor=$('#'+_this.options.anchor);}else{_this._parsePoints();}_this._setSizes(function(){_this._calc(false);});_this._events(id.split('-').reverse().join('-'));});}/**
   * If using multiple elements as anchors, calculates the top and bottom pixel values the sticky thing should stick and unstick on.
   * @function
   * @private
   */},{key:'_parsePoints',value:function _parsePoints(){var top=this.options.topAnchor,btm=this.options.btmAnchor,pts=[top,btm],breaks={};if(top&&btm){for(var i=0,len=pts.length;i<len&&pts[i];i++){var pt;if(typeof pts[i]==='number'){pt=pts[i];}else{var place=pts[i].split(':'),anchor=$('#'+place[0]);pt=anchor.offset().top;if(place[1]&&place[1].toLowerCase()==='bottom'){pt+=anchor[0].getBoundingClientRect().height;}}breaks[i]=pt;}}else{breaks={0:1,1:document.documentElement.scrollHeight};}this.points=breaks;return;}/**
   * Adds event handlers for the scrolling element.
   * @private
   * @param {String} id - psuedo-random id for unique scroll event listener.
   */},{key:'_events',value:function _events(id){var _this=this,scrollListener=this.scrollListener='scroll.zf.'+id;if(this.isOn){return;}if(this.canStick){this.isOn=true;$(window).off(scrollListener).on(scrollListener,function(e){if(_this.scrollCount===0){_this.scrollCount=_this.options.checkEvery;_this._setSizes(function(){_this._calc(false,window.pageYOffset);});}else{_this.scrollCount--;_this._calc(false,window.pageYOffset);}});}this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger',function(e,el){_this._setSizes(function(){_this._calc(false);if(_this.canStick){if(!_this.isOn){_this._events(id);}}else if(_this.isOn){_this._pauseListeners(scrollListener);}});});}/**
   * Removes event handlers for scroll and change events on anchor.
   * @fires Sticky#pause
   * @param {String} scrollListener - unique, namespaced scroll listener attached to `window`
   */},{key:'_pauseListeners',value:function _pauseListeners(scrollListener){this.isOn=false;$(window).off(scrollListener);/**
     * Fires when the plugin is paused due to resize event shrinking the view.
     * @event Sticky#pause
     * @private
     */this.$element.trigger('pause.zf.sticky');}/**
   * Called on every `scroll` event and on `_init`
   * fires functions based on booleans and cached values
   * @param {Boolean} checkSizes - true if plugin should recalculate sizes and breakpoints.
   * @param {Number} scroll - current scroll position passed from scroll event cb function. If not passed, defaults to `window.pageYOffset`.
   */},{key:'_calc',value:function _calc(checkSizes,scroll){if(checkSizes){this._setSizes();}if(!this.canStick){if(this.isStuck){this._removeSticky(true);}return false;}if(!scroll){scroll=window.pageYOffset;}if(scroll>=this.topPoint){if(scroll<=this.bottomPoint){if(!this.isStuck){this._setSticky();}}else{if(this.isStuck){this._removeSticky(false);}}}else{if(this.isStuck){this._removeSticky(true);}}}/**
   * Causes the $element to become stuck.
   * Adds `position: fixed;`, and helper classes.
   * @fires Sticky#stuckto
   * @function
   * @private
   */},{key:'_setSticky',value:function _setSticky(){var stickTo=this.options.stickTo,mrgn=stickTo==='top'?'marginTop':'marginBottom',notStuckTo=stickTo==='top'?'bottom':'top',css={};css[mrgn]=this.options[mrgn]+'em';css[stickTo]=0;css[notStuckTo]='auto';css['left']=this.$container.offset().left+parseInt(window.getComputedStyle(this.$container[0])["padding-left"],10);this.isStuck=true;this.$element.removeClass('is-anchored is-at-'+notStuckTo).addClass('is-stuck is-at-'+stickTo).css(css)/**
                  * Fires when the $element has become `position: fixed;`
                  * Namespaced to `top` or `bottom`, e.g. `sticky.zf.stuckto:top`
                  * @event Sticky#stuckto
                  */.trigger('sticky.zf.stuckto:'+stickTo);}/**
   * Causes the $element to become unstuck.
   * Removes `position: fixed;`, and helper classes.
   * Adds other helper classes.
   * @param {Boolean} isTop - tells the function if the $element should anchor to the top or bottom of its $anchor element.
   * @fires Sticky#unstuckfrom
   * @private
   */},{key:'_removeSticky',value:function _removeSticky(isTop){var stickTo=this.options.stickTo,stickToTop=stickTo==='top',css={},anchorPt=(this.points?this.points[1]-this.points[0]:this.anchorHeight)-this.elemHeight,mrgn=stickToTop?'marginTop':'marginBottom',notStuckTo=stickToTop?'bottom':'top',topOrBottom=isTop?'top':'bottom';css[mrgn]=0;if(isTop&&!stickToTop||stickToTop&&!isTop){css[stickTo]=anchorPt;css[notStuckTo]=0;}else{css[stickTo]=0;css[notStuckTo]=anchorPt;}css['left']='';this.isStuck=false;this.$element.removeClass('is-stuck is-at-'+stickTo).addClass('is-anchored is-at-'+topOrBottom).css(css)/**
                  * Fires when the $element has become anchored.
                  * Namespaced to `top` or `bottom`, e.g. `sticky.zf.unstuckfrom:bottom`
                  * @event Sticky#unstuckfrom
                  */.trigger('sticky.zf.unstuckfrom:'+topOrBottom);}/**
   * Sets the $element and $container sizes for plugin.
   * Calls `_setBreakPoints`.
   * @param {Function} cb - optional callback function to fire on completion of `_setBreakPoints`.
   * @private
   */},{key:'_setSizes',value:function _setSizes(cb){this.canStick=Foundation.MediaQuery.atLeast(this.options.stickyOn);if(!this.canStick){cb();}var _this=this,newElemWidth=this.$container[0].getBoundingClientRect().width,comp=window.getComputedStyle(this.$container[0]),pdng=parseInt(comp['padding-right'],10);if(this.$anchor&&this.$anchor.length){this.anchorHeight=this.$anchor[0].getBoundingClientRect().height;}else{this._parsePoints();}this.$element.css({'max-width':newElemWidth-pdng+'px'});var newContainerHeight=this.$element[0].getBoundingClientRect().height||this.containerHeight;this.containerHeight=newContainerHeight;this.$container.css({height:newContainerHeight});this.elemHeight=newContainerHeight;if(this.isStuck){this.$element.css({"left":this.$container.offset().left+parseInt(comp['padding-left'],10)});}this._setBreakPoints(newContainerHeight,function(){if(cb){cb();}});}/**
   * Sets the upper and lower breakpoints for the element to become sticky/unsticky.
   * @param {Number} elemHeight - px value for sticky.$element height, calculated by `_setSizes`.
   * @param {Function} cb - optional callback function to be called on completion.
   * @private
   */},{key:'_setBreakPoints',value:function _setBreakPoints(elemHeight,cb){if(!this.canStick){if(cb){cb();}else{return false;}}var mTop=emCalc(this.options.marginTop),mBtm=emCalc(this.options.marginBottom),topPoint=this.points?this.points[0]:this.$anchor.offset().top,bottomPoint=this.points?this.points[1]:topPoint+this.anchorHeight,// topPoint = this.$anchor.offset().top || this.points[0],
// bottomPoint = topPoint + this.anchorHeight || this.points[1],
winHeight=window.innerHeight;if(this.options.stickTo==='top'){topPoint-=mTop;bottomPoint-=elemHeight+mTop;}else if(this.options.stickTo==='bottom'){topPoint-=winHeight-(elemHeight+mBtm);bottomPoint-=winHeight-mBtm;}else{//this would be the stickTo: both option... tricky
}this.topPoint=topPoint;this.bottomPoint=bottomPoint;if(cb){cb();}}/**
   * Destroys the current sticky element.
   * Resets the element to the top position first.
   * Removes event listeners, JS-added css properties and classes, and unwraps the $element if the JS added the $container.
   * @function
   */},{key:'destroy',value:function destroy(){this._removeSticky(true);this.$element.removeClass(this.options.stickyClass+' is-anchored is-at-top').css({height:'',top:'',bottom:'','max-width':''}).off('resizeme.zf.trigger');this.$anchor.off('change.zf.sticky');$(window).off(this.scrollListener);if(this.wasWrapped){this.$element.unwrap();}else{this.$container.removeClass(this.options.containerClass).css({height:''});}Foundation.unregisterPlugin(this);}}]);return Sticky;}();Sticky.defaults={/**
   * Customizable container template. Add your own classes for styling and sizing.
   * @option
   * @example '&lt;div data-sticky-container class="small-6 columns"&gt;&lt;/div&gt;'
   */container:'<div data-sticky-container></div>',/**
   * Location in the view the element sticks to.
   * @option
   * @example 'top'
   */stickTo:'top',/**
   * If anchored to a single element, the id of that element.
   * @option
   * @example 'exampleId'
   */anchor:'',/**
   * If using more than one element as anchor points, the id of the top anchor.
   * @option
   * @example 'exampleId:top'
   */topAnchor:'',/**
   * If using more than one element as anchor points, the id of the bottom anchor.
   * @option
   * @example 'exampleId:bottom'
   */btmAnchor:'',/**
   * Margin, in `em`'s to apply to the top of the element when it becomes sticky.
   * @option
   * @example 1
   */marginTop:1,/**
   * Margin, in `em`'s to apply to the bottom of the element when it becomes sticky.
   * @option
   * @example 1
   */marginBottom:1,/**
   * Breakpoint string that is the minimum screen size an element should become sticky.
   * @option
   * @example 'medium'
   */stickyOn:'medium',/**
   * Class applied to sticky element, and removed on destruction. Foundation defaults to `sticky`.
   * @option
   * @example 'sticky'
   */stickyClass:'sticky',/**
   * Class applied to sticky container. Foundation defaults to `sticky-container`.
   * @option
   * @example 'sticky-container'
   */containerClass:'sticky-container',/**
   * Number of scroll events between the plugin's recalculating sticky points. Setting it to `0` will cause it to recalc every scroll event, setting it to `-1` will prevent recalc on scroll.
   * @option
   * @example 50
   */checkEvery:-1};/**
 * Helper function to calculate em values
 * @param Number {em} - number of em's to calculate into pixels
 */function emCalc(em){return parseInt(window.getComputedStyle(document.body,null).fontSize,10)*em;}// Window exports
Foundation.plugin(Sticky,'Sticky');}(jQuery);'use strict';!function($){/**
 * Tabs module.
 * @module foundation.tabs
 * @requires foundation.util.keyboard
 * @requires foundation.util.timerAndImageLoader if tabs contain images
 */var Tabs=function(){/**
   * Creates a new instance of tabs.
   * @class
   * @fires Tabs#init
   * @param {jQuery} element - jQuery object to make into tabs.
   * @param {Object} options - Overrides to the default plugin settings.
   */function Tabs(element,options){_classCallCheck(this,Tabs);this.$element=element;this.options=$.extend({},Tabs.defaults,this.$element.data(),options);this._init();Foundation.registerPlugin(this,'Tabs');Foundation.Keyboard.register('Tabs',{'ENTER':'open','SPACE':'open','ARROW_RIGHT':'next','ARROW_UP':'previous','ARROW_DOWN':'next','ARROW_LEFT':'previous'// 'TAB': 'next',
// 'SHIFT_TAB': 'previous'
});}/**
   * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
   * @private
   */_createClass(Tabs,[{key:'_init',value:function _init(){var _this=this;this.$tabTitles=this.$element.find('.'+this.options.linkClass);this.$tabContent=$('[data-tabs-content="'+this.$element[0].id+'"]');this.$tabTitles.each(function(){var $elem=$(this),$link=$elem.find('a'),isActive=$elem.hasClass('is-active'),hash=$link[0].hash.slice(1),linkId=$link[0].id?$link[0].id:hash+'-label',$tabContent=$('#'+hash);$elem.attr({'role':'presentation'});$link.attr({'role':'tab','aria-controls':hash,'aria-selected':isActive,'id':linkId});$tabContent.attr({'role':'tabpanel','aria-hidden':!isActive,'aria-labelledby':linkId});if(isActive&&_this.options.autoFocus){$link.focus();}});if(this.options.matchHeight){var $images=this.$tabContent.find('img');if($images.length){Foundation.onImagesLoaded($images,this._setHeight.bind(this));}else{this._setHeight();}}this._events();}/**
   * Adds event handlers for items within the tabs.
   * @private
   */},{key:'_events',value:function _events(){this._addKeyHandler();this._addClickHandler();if(this.options.matchHeight){$(window).on('changed.zf.mediaquery',this._setHeight.bind(this));}}/**
   * Adds click handlers for items within the tabs.
   * @private
   */},{key:'_addClickHandler',value:function _addClickHandler(){var _this=this;this.$element.off('click.zf.tabs').on('click.zf.tabs','.'+this.options.linkClass,function(e){e.preventDefault();e.stopPropagation();if($(this).hasClass('is-active')){return;}_this._handleTabChange($(this));});}/**
   * Adds keyboard event handlers for items within the tabs.
   * @private
   */},{key:'_addKeyHandler',value:function _addKeyHandler(){var _this=this;var $firstTab=_this.$element.find('li:first-of-type');var $lastTab=_this.$element.find('li:last-of-type');this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs',function(e){if(e.which===9)return;e.stopPropagation();e.preventDefault();var $element=$(this),$elements=$element.parent('ul').children('li'),$prevElement,$nextElement;$elements.each(function(i){if($(this).is($element)){if(_this.options.wrapOnKeys){$prevElement=i===0?$elements.last():$elements.eq(i-1);$nextElement=i===$elements.length-1?$elements.first():$elements.eq(i+1);}else{$prevElement=$elements.eq(Math.max(0,i-1));$nextElement=$elements.eq(Math.min(i+1,$elements.length-1));}return;}});// handle keyboard event with keyboard util
Foundation.Keyboard.handleKey(e,'Tabs',{open:function open(){$element.find('[role="tab"]').focus();_this._handleTabChange($element);},previous:function previous(){$prevElement.find('[role="tab"]').focus();_this._handleTabChange($prevElement);},next:function next(){$nextElement.find('[role="tab"]').focus();_this._handleTabChange($nextElement);}});});}/**
   * Opens the tab `$targetContent` defined by `$target`.
   * @param {jQuery} $target - Tab to open.
   * @fires Tabs#change
   * @function
   */},{key:'_handleTabChange',value:function _handleTabChange($target){var $tabLink=$target.find('[role="tab"]'),hash=$tabLink[0].hash,$targetContent=this.$tabContent.find(hash),$oldTab=this.$element.find('.'+this.options.linkClass+'.is-active').removeClass('is-active').find('[role="tab"]').attr({'aria-selected':'false'});$('#'+$oldTab.attr('aria-controls')).removeClass('is-active').attr({'aria-hidden':'true'});$target.addClass('is-active');$tabLink.attr({'aria-selected':'true'});$targetContent.addClass('is-active').attr({'aria-hidden':'false'});/**
     * Fires when the plugin has successfully changed tabs.
     * @event Tabs#change
     */this.$element.trigger('change.zf.tabs',[$target]);}/**
   * Public method for selecting a content pane to display.
   * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.
   * @function
   */},{key:'selectTab',value:function selectTab(elem){var idStr;if((typeof elem==='undefined'?'undefined':_typeof(elem))==='object'){idStr=elem[0].id;}else{idStr=elem;}if(idStr.indexOf('#')<0){idStr='#'+idStr;}var $target=this.$tabTitles.find('[href="'+idStr+'"]').parent('.'+this.options.linkClass);this._handleTabChange($target);}},{key:'_setHeight',/**
   * Sets the height of each panel to the height of the tallest panel.
   * If enabled in options, gets called on media query change.
   * If loading content via external source, can be called directly or with _reflow.
   * @function
   * @private
   */value:function _setHeight(){var max=0;this.$tabContent.find('.'+this.options.panelClass).css('height','').each(function(){var panel=$(this),isActive=panel.hasClass('is-active');if(!isActive){panel.css({'visibility':'hidden','display':'block'});}var temp=this.getBoundingClientRect().height;if(!isActive){panel.css({'visibility':'','display':''});}max=temp>max?temp:max;}).css('height',max+'px');}/**
   * Destroys an instance of an tabs.
   * @fires Tabs#destroyed
   */},{key:'destroy',value:function destroy(){this.$element.find('.'+this.options.linkClass).off('.zf.tabs').hide().end().find('.'+this.options.panelClass).hide();if(this.options.matchHeight){$(window).off('changed.zf.mediaquery');}Foundation.unregisterPlugin(this);}}]);return Tabs;}();Tabs.defaults={/**
   * Allows the window to scroll to content of active pane on load if set to true.
   * @option
   * @example false
   */autoFocus:false,/**
   * Allows keyboard input to 'wrap' around the tab links.
   * @option
   * @example true
   */wrapOnKeys:true,/**
   * Allows the tab content panes to match heights if set to true.
   * @option
   * @example false
   */matchHeight:false,/**
   * Class applied to `li`'s in tab link list.
   * @option
   * @example 'tabs-title'
   */linkClass:'tabs-title',/**
   * Class applied to the content containers.
   * @option
   * @example 'tabs-panel'
   */panelClass:'tabs-panel'};function checkClass($elem){return $elem.hasClass('is-active');}// Window exports
Foundation.plugin(Tabs,'Tabs');}(jQuery);'use strict';!function($){/**
 * Toggler module.
 * @module foundation.toggler
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 */var Toggler=function(){/**
   * Creates a new instance of Toggler.
   * @class
   * @fires Toggler#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */function Toggler(element,options){_classCallCheck(this,Toggler);this.$element=element;this.options=$.extend({},Toggler.defaults,element.data(),options);this.className='';this._init();this._events();Foundation.registerPlugin(this,'Toggler');}/**
   * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
   * @function
   * @private
   */_createClass(Toggler,[{key:'_init',value:function _init(){var input;// Parse animation classes if they were set
if(this.options.animate){input=this.options.animate.split(' ');this.animationIn=input[0];this.animationOut=input[1]||null;}// Otherwise, parse toggle class
else{input=this.$element.data('toggler');// Allow for a . at the beginning of the string
this.className=input[0]==='.'?input.slice(1):input;}// Add ARIA attributes to triggers
var id=this.$element[0].id;$('[data-open="'+id+'"], [data-close="'+id+'"], [data-toggle="'+id+'"]').attr('aria-controls',id);// If the target is hidden, add aria-hidden
this.$element.attr('aria-expanded',this.$element.is(':hidden')?false:true);}/**
   * Initializes events for the toggle trigger.
   * @function
   * @private
   */},{key:'_events',value:function _events(){this.$element.off('toggle.zf.trigger').on('toggle.zf.trigger',this.toggle.bind(this));}/**
   * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
   * @function
   * @fires Toggler#on
   * @fires Toggler#off
   */},{key:'toggle',value:function toggle(){this[this.options.animate?'_toggleAnimate':'_toggleClass']();}},{key:'_toggleClass',value:function _toggleClass(){this.$element.toggleClass(this.className);var isOn=this.$element.hasClass(this.className);if(isOn){/**
       * Fires if the target element has the class after a toggle.
       * @event Toggler#on
       */this.$element.trigger('on.zf.toggler');}else{/**
       * Fires if the target element does not have the class after a toggle.
       * @event Toggler#off
       */this.$element.trigger('off.zf.toggler');}this._updateARIA(isOn);}},{key:'_toggleAnimate',value:function _toggleAnimate(){var _this=this;if(this.$element.is(':hidden')){Foundation.Motion.animateIn(this.$element,this.animationIn,function(){this.trigger('on.zf.toggler');_this._updateARIA(true);});}else{Foundation.Motion.animateOut(this.$element,this.animationOut,function(){this.trigger('off.zf.toggler');_this._updateARIA(false);});}}},{key:'_updateARIA',value:function _updateARIA(isOn){this.$element.attr('aria-expanded',isOn?true:false);}/**
   * Destroys the instance of Toggler on the element.
   * @function
   */},{key:'destroy',value:function destroy(){this.$element.off('.zf.toggler');Foundation.unregisterPlugin(this);}}]);return Toggler;}();Toggler.defaults={/**
   * Tells the plugin if the element should animated when toggled.
   * @option
   * @example false
   */animate:false};// Window exports
Foundation.plugin(Toggler,'Toggler');}(jQuery);'use strict';!function($){/**
 * Tooltip module.
 * @module foundation.tooltip
 * @requires foundation.util.box
 * @requires foundation.util.triggers
 */var Tooltip=function(){/**
   * Creates a new instance of a Tooltip.
   * @class
   * @fires Tooltip#init
   * @param {jQuery} element - jQuery object to attach a tooltip to.
   * @param {Object} options - object to extend the default configuration.
   */function Tooltip(element,options){_classCallCheck(this,Tooltip);this.$element=element;this.options=$.extend({},Tooltip.defaults,this.$element.data(),options);this.isActive=false;this.isClick=false;this._init();Foundation.registerPlugin(this,'Tooltip');}/**
   * Initializes the tooltip by setting the creating the tip element, adding it's text, setting private variables and setting attributes on the anchor.
   * @private
   */_createClass(Tooltip,[{key:'_init',value:function _init(){var elemId=this.$element.attr('aria-describedby')||Foundation.GetYoDigits(6,'tooltip');this.options.positionClass=this._getPositionClass(this.$element);this.options.tipText=this.options.tipText||this.$element.attr('title');this.template=this.options.template?$(this.options.template):this._buildTemplate(elemId);this.template.appendTo(document.body).text(this.options.tipText).hide();this.$element.attr({'title':'','aria-describedby':elemId,'data-yeti-box':elemId,'data-toggle':elemId,'data-resize':elemId}).addClass(this.triggerClass);//helper variables to track movement on collisions
this.usedPositions=[];this.counter=4;this.classChanged=false;this._events();}/**
   * Grabs the current positioning class, if present, and returns the value or an empty string.
   * @private
   */},{key:'_getPositionClass',value:function _getPositionClass(element){if(!element){return'';}// var position = element.attr('class').match(/top|left|right/g);
var position=element[0].className.match(/\b(top|left|right)\b/g);position=position?position[0]:'';return position;}},{key:'_buildTemplate',/**
   * builds the tooltip element, adds attributes, and returns the template.
   * @private
   */value:function _buildTemplate(id){var templateClasses=(this.options.tooltipClass+' '+this.options.positionClass+' '+this.options.templateClasses).trim();var $template=$('<div></div>').addClass(templateClasses).attr({'role':'tooltip','aria-hidden':true,'data-is-active':false,'data-is-focus':false,'id':id});return $template;}/**
   * Function that gets called if a collision event is detected.
   * @param {String} position - positioning class to try
   * @private
   */},{key:'_reposition',value:function _reposition(position){this.usedPositions.push(position?position:'bottom');//default, try switching to opposite side
if(!position&&this.usedPositions.indexOf('top')<0){this.template.addClass('top');}else if(position==='top'&&this.usedPositions.indexOf('bottom')<0){this.template.removeClass(position);}else if(position==='left'&&this.usedPositions.indexOf('right')<0){this.template.removeClass(position).addClass('right');}else if(position==='right'&&this.usedPositions.indexOf('left')<0){this.template.removeClass(position).addClass('left');}//if default change didn't work, try bottom or left first
else if(!position&&this.usedPositions.indexOf('top')>-1&&this.usedPositions.indexOf('left')<0){this.template.addClass('left');}else if(position==='top'&&this.usedPositions.indexOf('bottom')>-1&&this.usedPositions.indexOf('left')<0){this.template.removeClass(position).addClass('left');}else if(position==='left'&&this.usedPositions.indexOf('right')>-1&&this.usedPositions.indexOf('bottom')<0){this.template.removeClass(position);}else if(position==='right'&&this.usedPositions.indexOf('left')>-1&&this.usedPositions.indexOf('bottom')<0){this.template.removeClass(position);}//if nothing cleared, set to bottom
else{this.template.removeClass(position);}this.classChanged=true;this.counter--;}/**
   * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.
   * if the tooltip is larger than the screen width, default to full width - any user selected margin
   * @private
   */},{key:'_setPosition',value:function _setPosition(){var position=this._getPositionClass(this.template),$tipDims=Foundation.Box.GetDimensions(this.template),$anchorDims=Foundation.Box.GetDimensions(this.$element),direction=position==='left'?'left':position==='right'?'left':'top',param=direction==='top'?'height':'width',offset=param==='height'?this.options.vOffset:this.options.hOffset,_this=this;if($tipDims.width>=$tipDims.windowDims.width||!this.counter&&!Foundation.Box.ImNotTouchingYou(this.template)){this.template.offset(Foundation.Box.GetOffsets(this.template,this.$element,'center bottom',this.options.vOffset,this.options.hOffset,true)).css({// this.$element.offset(Foundation.GetOffsets(this.template, this.$element, 'center bottom', this.options.vOffset, this.options.hOffset, true)).css({
'width':$anchorDims.windowDims.width-this.options.hOffset*2,'height':'auto'});return false;}this.template.offset(Foundation.Box.GetOffsets(this.template,this.$element,'center '+(position||'bottom'),this.options.vOffset,this.options.hOffset));while(!Foundation.Box.ImNotTouchingYou(this.template)&&this.counter){this._reposition(position);this._setPosition();}}/**
   * reveals the tooltip, and fires an event to close any other open tooltips on the page
   * @fires Tooltip#closeme
   * @fires Tooltip#show
   * @function
   */},{key:'show',value:function show(){if(this.options.showOn!=='all'&&!Foundation.MediaQuery.atLeast(this.options.showOn)){// console.error('The screen is too small to display this tooltip');
return false;}var _this=this;this.template.css('visibility','hidden').show();this._setPosition();/**
     * Fires to close all other open tooltips on the page
     * @event Closeme#tooltip
     */this.$element.trigger('closeme.zf.tooltip',this.template.attr('id'));this.template.attr({'data-is-active':true,'aria-hidden':false});_this.isActive=true;// console.log(this.template);
this.template.stop().hide().css('visibility','').fadeIn(this.options.fadeInDuration,function(){//maybe do stuff?
});/**
     * Fires when the tooltip is shown
     * @event Tooltip#show
     */this.$element.trigger('show.zf.tooltip');}/**
   * Hides the current tooltip, and resets the positioning class if it was changed due to collision
   * @fires Tooltip#hide
   * @function
   */},{key:'hide',value:function hide(){// console.log('hiding', this.$element.data('yeti-box'));
var _this=this;this.template.stop().attr({'aria-hidden':true,'data-is-active':false}).fadeOut(this.options.fadeOutDuration,function(){_this.isActive=false;_this.isClick=false;if(_this.classChanged){_this.template.removeClass(_this._getPositionClass(_this.template)).addClass(_this.options.positionClass);_this.usedPositions=[];_this.counter=4;_this.classChanged=false;}});/**
     * fires when the tooltip is hidden
     * @event Tooltip#hide
     */this.$element.trigger('hide.zf.tooltip');}/**
   * adds event listeners for the tooltip and its anchor
   * TODO combine some of the listeners like focus and mouseenter, etc.
   * @private
   */},{key:'_events',value:function _events(){var _this=this;var $template=this.template;var isFocus=false;if(!this.options.disableHover){this.$element.on('mouseenter.zf.tooltip',function(e){if(!_this.isActive){_this.timeout=setTimeout(function(){_this.show();},_this.options.hoverDelay);}}).on('mouseleave.zf.tooltip',function(e){clearTimeout(_this.timeout);if(!isFocus||!_this.isClick&&_this.options.clickOpen){_this.hide();}});}if(this.options.clickOpen){this.$element.on('mousedown.zf.tooltip',function(e){e.stopImmediatePropagation();if(_this.isClick){_this.hide();// _this.isClick = false;
}else{_this.isClick=true;if((_this.options.disableHover||!_this.$element.attr('tabindex'))&&!_this.isActive){_this.show();}}});}if(!this.options.disableForTouch){this.$element.on('tap.zf.tooltip touchend.zf.tooltip',function(e){_this.isActive?_this.hide():_this.show();});}this.$element.on({// 'toggle.zf.trigger': this.toggle.bind(this),
// 'close.zf.trigger': this.hide.bind(this)
'close.zf.trigger':this.hide.bind(this)});this.$element.on('focus.zf.tooltip',function(e){isFocus=true;// console.log(_this.isClick);
if(_this.isClick){return false;}else{// $(window)
_this.show();}}).on('focusout.zf.tooltip',function(e){isFocus=false;_this.isClick=false;_this.hide();}).on('resizeme.zf.trigger',function(){if(_this.isActive){_this._setPosition();}});}/**
   * adds a toggle method, in addition to the static show() & hide() functions
   * @function
   */},{key:'toggle',value:function toggle(){if(this.isActive){this.hide();}else{this.show();}}/**
   * Destroys an instance of tooltip, removes template element from the view.
   * @function
   */},{key:'destroy',value:function destroy(){this.$element.attr('title',this.template.text()).off('.zf.trigger .zf.tootip')//  .removeClass('has-tip')
.removeAttr('aria-describedby').removeAttr('data-yeti-box').removeAttr('data-toggle').removeAttr('data-resize');this.template.remove();Foundation.unregisterPlugin(this);}}]);return Tooltip;}();Tooltip.defaults={disableForTouch:false,/**
   * Time, in ms, before a tooltip should open on hover.
   * @option
   * @example 200
   */hoverDelay:200,/**
   * Time, in ms, a tooltip should take to fade into view.
   * @option
   * @example 150
   */fadeInDuration:150,/**
   * Time, in ms, a tooltip should take to fade out of view.
   * @option
   * @example 150
   */fadeOutDuration:150,/**
   * Disables hover events from opening the tooltip if set to true
   * @option
   * @example false
   */disableHover:false,/**
   * Optional addtional classes to apply to the tooltip template on init.
   * @option
   * @example 'my-cool-tip-class'
   */templateClasses:'',/**
   * Non-optional class added to tooltip templates. Foundation default is 'tooltip'.
   * @option
   * @example 'tooltip'
   */tooltipClass:'tooltip',/**
   * Class applied to the tooltip anchor element.
   * @option
   * @example 'has-tip'
   */triggerClass:'has-tip',/**
   * Minimum breakpoint size at which to open the tooltip.
   * @option
   * @example 'small'
   */showOn:'small',/**
   * Custom template to be used to generate markup for tooltip.
   * @option
   * @example '&lt;div class="tooltip"&gt;&lt;/div&gt;'
   */template:'',/**
   * Text displayed in the tooltip template on open.
   * @option
   * @example 'Some cool space fact here.'
   */tipText:'',touchCloseText:'Tap to close.',/**
   * Allows the tooltip to remain open if triggered with a click or touch event.
   * @option
   * @example true
   */clickOpen:true,/**
   * Additional positioning classes, set by the JS
   * @option
   * @example 'top'
   */positionClass:'',/**
   * Distance, in pixels, the template should push away from the anchor on the Y axis.
   * @option
   * @example 10
   */vOffset:10,/**
   * Distance, in pixels, the template should push away from the anchor on the X axis, if aligned to a side.
   * @option
   * @example 12
   */hOffset:12};/**
 * TODO utilize resize event trigger
 */// Window exports
Foundation.plugin(Tooltip,'Tooltip');}(jQuery);
//# sourceMappingURL=foundation.js.map
=======
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};!function(t){function e(t){if(void 0===Function.prototype.name){var e=/function\s([^(]{1,})\(/,i=e.exec(t.toString());return i&&i.length>1?i[1].trim():""}return void 0===t.prototype?t.constructor.name:t.prototype.constructor.name}function i(t){return!!/true/.test(t)||!/false/.test(t)&&(isNaN(1*t)?t:parseFloat(t))}function n(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}var s="6.2.0",o={version:s,_plugins:{},_uuids:[],rtl:function(){return"rtl"===t("html").attr("dir")},plugin:function(t,i){var s=i||e(t),o=n(s);this._plugins[o]=this[s]=t},registerPlugin:function(t,i){var s=i?n(i):e(t.constructor).toLowerCase();t.uuid=this.GetYoDigits(6,s),t.$element.attr("data-"+s)||t.$element.attr("data-"+s,t.uuid),t.$element.data("zfPlugin")||t.$element.data("zfPlugin",t),t.$element.trigger("init.zf."+s),this._uuids.push(t.uuid)},unregisterPlugin:function(t){var i=n(e(t.$element.data("zfPlugin").constructor));this._uuids.splice(this._uuids.indexOf(t.uuid),1),t.$element.removeAttr("data-"+i).removeData("zfPlugin").trigger("destroyed.zf."+i);for(var s in t)t[s]=null},reInit:function(e){var i=e instanceof t;try{if(i)e.each(function(){t(this).data("zfPlugin")._init()});else{var s="undefined"==typeof e?"undefined":_typeof(e),o=this,a={object:function(e){e.forEach(function(e){e=n(e),t("[data-"+e+"]").foundation("_init")})},string:function(){e=n(e),t("[data-"+e+"]").foundation("_init")},undefined:function(){this.object(Object.keys(o._plugins))}};a[s](e)}}catch(r){}finally{return e}},GetYoDigits:function(t,e){return t=t||6,Math.round(Math.pow(36,t+1)-Math.random()*Math.pow(36,t)).toString(36).slice(1)+(e?"-"+e:"")},reflow:function(e,n){"undefined"==typeof n?n=Object.keys(this._plugins):"string"==typeof n&&(n=[n]);var s=this;t.each(n,function(n,o){var a=s._plugins[o],r=t(e).find("[data-"+o+"]").addBack("[data-"+o+"]");r.each(function(){var e=t(this),n={};if(!e.data("zfPlugin")){if(e.attr("data-options")){e.attr("data-options").split(";").forEach(function(t,e){var s=t.split(":").map(function(t){return t.trim()});s[0]&&(n[s[0]]=i(s[1]))})}try{e.data("zfPlugin",new a(t(this),n))}catch(s){}finally{return}}})})},getFnName:e,transitionend:function(t){var e,i={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend"},n=document.createElement("div");for(var s in i)"undefined"!=typeof n.style[s]&&(e=i[s]);return e?e:(e=setTimeout(function(){t.triggerHandler("transitionend",[t])},1),"transitionend")}};o.util={throttle:function(t,e){var i=null;return function(){var n=this,s=arguments;null===i&&(i=setTimeout(function(){t.apply(n,s),i=null},e))}}};var a=function(i){var n="undefined"==typeof i?"undefined":_typeof(i),s=t("meta.foundation-mq"),a=t(".no-js");if(s.length||t('<meta class="foundation-mq">').appendTo(document.head),a.length&&a.removeClass("no-js"),"undefined"===n)o.MediaQuery._init(),o.reflow(this);else{if("string"!==n)throw new TypeError("We're sorry, "+n+" is not a valid parameter. You must use a string representing the method you wish to invoke.");var r=Array.prototype.slice.call(arguments,1),l=this.data("zfPlugin");if(void 0===l||void 0===l[i])throw new ReferenceError("We're sorry, '"+i+"' is not an available method for "+(l?e(l):"this element")+".");1===this.length?l[i].apply(l,r):this.each(function(e,n){l[i].apply(t(n).data("zfPlugin"),r)})}return this};window.Foundation=o,t.fn.foundation=a,function(){Date.now&&window.Date.now||(window.Date.now=Date.now=function(){return(new Date).getTime()});for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e){var i=t[e];window.requestAnimationFrame=window[i+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i+"CancelAnimationFrame"]||window[i+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var n=0;window.requestAnimationFrame=function(t){var e=Date.now(),i=Math.max(n+16,e);return setTimeout(function(){t(n=i)},i-e)},window.cancelAnimationFrame=clearTimeout}window.performance&&window.performance.now||(window.performance={start:Date.now(),now:function(){return Date.now()-this.start}})}(),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),i=this,n=function(){},s=function(){return i.apply(this instanceof n?this:t,e.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(n.prototype=this.prototype),s.prototype=new n,s})}(jQuery),!function(t){function e(t,e,n,s){var o,a,r,l,d=i(t);if(e){var h=i(e);a=d.offset.top+d.height<=h.height+h.offset.top,o=d.offset.top>=h.offset.top,r=d.offset.left>=h.offset.left,l=d.offset.left+d.width<=h.width}else a=d.offset.top+d.height<=d.windowDims.height+d.windowDims.offset.top,o=d.offset.top>=d.windowDims.offset.top,r=d.offset.left>=d.windowDims.offset.left,l=d.offset.left+d.width<=d.windowDims.width;var u=[a,o,r,l];return n?r===l==!0:s?o===a==!0:u.indexOf(!1)===-1}function i(t,e){if(t=t.length?t[0]:t,t===window||t===document)throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");var i=t.getBoundingClientRect(),n=t.parentNode.getBoundingClientRect(),s=document.body.getBoundingClientRect(),o=window.pageYOffset,a=window.pageXOffset;return{width:i.width,height:i.height,offset:{top:i.top+o,left:i.left+a},parentDims:{width:n.width,height:n.height,offset:{top:n.top+o,left:n.left+a}},windowDims:{width:s.width,height:s.height,offset:{top:o,left:a}}}}function n(t,e,n,s,o,a){var r=i(t),l=e?i(e):null;switch(n){case"top":return{left:Foundation.rtl()?l.offset.left-r.width+l.width:l.offset.left,top:l.offset.top-(r.height+s)};case"left":return{left:l.offset.left-(r.width+o),top:l.offset.top};case"right":return{left:l.offset.left+l.width+o,top:l.offset.top};case"center top":return{left:l.offset.left+l.width/2-r.width/2,top:l.offset.top-(r.height+s)};case"center bottom":return{left:a?o:l.offset.left+l.width/2-r.width/2,top:l.offset.top+l.height+s};case"center left":return{left:l.offset.left-(r.width+o),top:l.offset.top+l.height/2-r.height/2};case"center right":return{left:l.offset.left+l.width+o+1,top:l.offset.top+l.height/2-r.height/2};case"center":return{left:r.windowDims.offset.left+r.windowDims.width/2-r.width/2,top:r.windowDims.offset.top+r.windowDims.height/2-r.height/2};case"reveal":return{left:(r.windowDims.width-r.width)/2,top:r.windowDims.offset.top+s};case"reveal full":return{left:r.windowDims.offset.left,top:r.windowDims.offset.top};default:return{left:Foundation.rtl()?l.offset.left-r.width+l.width:l.offset.left,top:l.offset.top+l.height+s}}}Foundation.Box={ImNotTouchingYou:e,GetDimensions:i,GetOffsets:n}}(jQuery),!function(t){function e(t){var e={};for(var i in t)e[t[i]]=t[i];return e}var i={9:"TAB",13:"ENTER",27:"ESCAPE",32:"SPACE",37:"ARROW_LEFT",38:"ARROW_UP",39:"ARROW_RIGHT",40:"ARROW_DOWN"},n={},s={keys:e(i),parseKey:function(t){var e=i[t.which||t.keyCode]||String.fromCharCode(t.which).toUpperCase();return t.shiftKey&&(e="SHIFT_"+e),t.ctrlKey&&(e="CTRL_"+e),t.altKey&&(e="ALT_"+e),e},handleKey:function(e,i,s){var o,a,r,l=n[i],d=this.parseKey(e);l&&(o="undefined"==typeof l.ltr?l:Foundation.rtl()?t.extend({},l.ltr,l.rtl):t.extend({},l.rtl,l.ltr),a=o[d],r=s[a],r&&"function"==typeof r?(r.apply(),(s.handled||"function"==typeof s.handled)&&s.handled.apply()):(s.unhandled||"function"==typeof s.unhandled)&&s.unhandled.apply())},findFocusable:function(e){return e.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function(){return!(!t(this).is(":visible")||t(this).attr("tabindex")<0)})},register:function(t,e){n[t]=e}};Foundation.Keyboard=s}(jQuery),!function(t){function e(t){var e={};return"string"!=typeof t?e:(t=t.trim().slice(1,-1))?e=t.split("&").reduce(function(t,e){var i=e.replace(/\+/g," ").split("="),n=i[0],s=i[1];return n=decodeURIComponent(n),s=void 0===s?null:decodeURIComponent(s),t.hasOwnProperty(n)?Array.isArray(t[n])?t[n].push(s):t[n]=[t[n],s]:t[n]=s,t},{}):e}var i={queries:[],current:"",_init:function(){var i,n=this,s=t(".foundation-mq").css("font-family");i=e(s);for(var o in i)n.queries.push({name:o,value:"only screen and (min-width: "+i[o]+")"});this.current=this._getCurrentSize(),this._watcher()},atLeast:function(t){var e=this.get(t);return!!e&&window.matchMedia(e).matches},get:function(t){for(var e in this.queries){var i=this.queries[e];if(t===i.name)return i.value}return null},_getCurrentSize:function(){var t;for(var e in this.queries){var i=this.queries[e];window.matchMedia(i.value).matches&&(t=i)}return"object"===("undefined"==typeof t?"undefined":_typeof(t))?t.name:t},_watcher:function(){var e=this;t(window).on("resize.zf.mediaquery",function(){var i=e._getCurrentSize();i!==e.current&&(t(window).trigger("changed.zf.mediaquery",[i,e.current]),e.current=i)})}};Foundation.MediaQuery=i,window.matchMedia||(window.matchMedia=function(){var t=window.styleMedia||window.media;if(!t){var e=document.createElement("style"),i=document.getElementsByTagName("script")[0],n=null;e.type="text/css",e.id="matchmediajs-test",i.parentNode.insertBefore(e,i),n="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle,t={matchMedium:function(t){var i="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=i:e.textContent=i,"1px"===n.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}()),Foundation.MediaQuery=i}(jQuery),!function(t){function e(t,e,i){function n(r){a||(a=window.performance.now()),o=r-a,i.apply(e),o<t?s=window.requestAnimationFrame(n,e):(window.cancelAnimationFrame(s),e.trigger("finished.zf.animate",[e]).triggerHandler("finished.zf.animate",[e]))}var s,o,a=null;s=window.requestAnimationFrame(n)}function i(e,i,o,a){function r(){e||i.hide(),l(),a&&a.apply(i)}function l(){i[0].style.transitionDuration=0,i.removeClass(d+" "+h+" "+o)}if(i=t(i).eq(0),i.length){var d=e?n[0]:n[1],h=e?s[0]:s[1];l(),i.addClass(o).css("transition","none"),requestAnimationFrame(function(){i.addClass(d),e&&i.show()}),requestAnimationFrame(function(){i[0].offsetWidth,i.css("transition","").addClass(h)}),i.one(Foundation.transitionend(i),r)}}var n=["mui-enter","mui-leave"],s=["mui-enter-active","mui-leave-active"],o={animateIn:function(t,e,n){i(!0,t,e,n)},animateOut:function(t,e,n){i(!1,t,e,n)}};Foundation.Move=e,Foundation.Motion=o}(jQuery),!function(t){var e={Feather:function(e){var i=arguments.length<=1||void 0===arguments[1]?"zf":arguments[1];e.attr("role","menubar");var n=e.find("li").attr({role:"menuitem"}),s="is-"+i+"-submenu",o=s+"-item",a="is-"+i+"-submenu-parent";e.find("a:first").attr("tabindex",0),n.each(function(){var e=t(this),i=e.children("ul");i.length&&(e.addClass(a).attr({"aria-haspopup":!0,"aria-expanded":!1,"aria-label":e.children("a:first").text()}),i.addClass("submenu "+s).attr({"data-submenu":"","aria-hidden":!0,role:"menu"})),e.parent("[data-submenu]").length&&e.addClass("is-submenu-item "+o)})},Burn:function(t,e){var i=(t.find("li").removeAttr("tabindex"),"is-"+e+"-submenu"),n=i+"-item",s="is-"+e+"-submenu-parent";t.find("*").removeClass(i+" "+n+" "+s+" is-submenu-item submenu is-active").removeAttr("data-submenu").css("display","")}};Foundation.Nest=e}(jQuery),!function(t){function e(t,e,i){var n,s,o=this,a=e.duration,r=Object.keys(t.data())[0]||"timer",l=-1;this.isPaused=!1,this.restart=function(){l=-1,clearTimeout(s),this.start()},this.start=function(){this.isPaused=!1,clearTimeout(s),l=l<=0?a:l,t.data("paused",!1),n=Date.now(),s=setTimeout(function(){e.infinite&&o.restart(),i()},l),t.trigger("timerstart.zf."+r)},this.pause=function(){this.isPaused=!0,clearTimeout(s),t.data("paused",!0);var e=Date.now();l-=e-n,t.trigger("timerpaused.zf."+r)}}function i(e,i){function n(){s--,0===s&&i()}var s=e.length;0===s&&i(),e.each(function(){this.complete?n():"undefined"!=typeof this.naturalWidth&&this.naturalWidth>0?n():t(this).one("load",function(){n()})})}Foundation.Timer=e,Foundation.onImagesLoaded=i}(jQuery),function(t){function e(){this.removeEventListener("touchmove",i),this.removeEventListener("touchend",e),d=!1}function i(i){if(t.spotSwipe.preventDefault&&i.preventDefault(),d){var n,s=i.touches[0].pageX,a=(i.touches[0].pageY,o-s);l=(new Date).getTime()-r,Math.abs(a)>=t.spotSwipe.moveThreshold&&l<=t.spotSwipe.timeThreshold&&(n=a>0?"left":"right"),n&&(i.preventDefault(),e.call(this),t(this).trigger("swipe",n).trigger("swipe"+n))}}function n(t){1==t.touches.length&&(o=t.touches[0].pageX,a=t.touches[0].pageY,d=!0,r=(new Date).getTime(),this.addEventListener("touchmove",i,!1),this.addEventListener("touchend",e,!1))}function s(){this.addEventListener&&this.addEventListener("touchstart",n,!1)}t.spotSwipe={version:"1.0.0",enabled:"ontouchstart"in document.documentElement,preventDefault:!1,moveThreshold:75,timeThreshold:200};var o,a,r,l,d=!1;t.event.special.swipe={setup:s},t.each(["left","up","down","right"],function(){t.event.special["swipe"+this]={setup:function(){t(this).on("swipe",t.noop)}}})}(jQuery),!function(t){t.fn.addTouch=function(){this.each(function(i,n){t(n).bind("touchstart touchmove touchend touchcancel",function(){e(event)})});var e=function(t){var e,i=t.changedTouches,n=i[0],s={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup"},o=s[t.type];"MouseEvent"in window&&"function"==typeof window.MouseEvent?e=window.MouseEvent(o,{bubbles:!0,cancelable:!0,screenX:n.screenX,screenY:n.screenY,clientX:n.clientX,clientY:n.clientY}):(e=document.createEvent("MouseEvent"),e.initMouseEvent(o,!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null)),n.target.dispatchEvent(e)}}}(jQuery),!function(t){function e(){o(),n(),s(),i()}function i(e){var i=t("[data-yeti-box]"),n=["dropdown","tooltip","reveal"];if(e&&("string"==typeof e?n.push(e):"object"===("undefined"==typeof e?"undefined":_typeof(e))&&"string"==typeof e[0]&&n.concat(e)),i.length){var s=n.map(function(t){return"closeme.zf."+t}).join(" ");t(window).off(s).on(s,function(e,i){var n=e.namespace.split(".")[0],s=t("[data-"+n+"]").not('[data-yeti-box="'+i+'"]');s.each(function(){var e=t(this);e.triggerHandler("close.zf.trigger",[e])})})}}function n(e){var i=void 0,n=t("[data-resize]");n.length&&t(window).off("resize.zf.trigger").on("resize.zf.trigger",function(s){i&&clearTimeout(i),i=setTimeout(function(){a||n.each(function(){t(this).triggerHandler("resizeme.zf.trigger")}),n.attr("data-events","resize")},e||10)})}function s(e){var i=void 0,n=t("[data-scroll]");n.length&&t(window).off("scroll.zf.trigger").on("scroll.zf.trigger",function(s){i&&clearTimeout(i),i=setTimeout(function(){a||n.each(function(){t(this).triggerHandler("scrollme.zf.trigger")}),n.attr("data-events","scroll")},e||10)})}function o(){if(!a)return!1;var e=document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]"),i=function(e){var i=t(e[0].target);switch(i.attr("data-events")){case"resize":i.triggerHandler("resizeme.zf.trigger",[i]);break;case"scroll":i.triggerHandler("scrollme.zf.trigger",[i,window.pageYOffset]);break;default:return!1}};if(e.length)for(var n=0;n<=e.length-1;n++){var s=new a(i);s.observe(e[n],{attributes:!0,childList:!1,characterData:!1,subtree:!1,attributeFilter:["data-events"]})}}var a=function(){for(var t=["WebKit","Moz","O","Ms",""],e=0;e<t.length;e++)if(t[e]+"MutationObserver"in window)return window[t[e]+"MutationObserver"];return!1}(),r=function(e,i){e.data(i).split(" ").forEach(function(n){t("#"+n)["close"===i?"trigger":"triggerHandler"](i+".zf.trigger",[e])})};t(document).on("click.zf.trigger","[data-open]",function(){r(t(this),"open")}),t(document).on("click.zf.trigger","[data-close]",function(){var e=t(this).data("close");e?r(t(this),"close"):t(this).trigger("close.zf.trigger")}),t(document).on("click.zf.trigger","[data-toggle]",function(){r(t(this),"toggle")}),t(document).on("close.zf.trigger","[data-closable]",function(e){e.stopPropagation();var i=t(this).data("closable");""!==i?Foundation.Motion.animateOut(t(this),i,function(){t(this).trigger("closed.zf")}):t(this).fadeOut().trigger("closed.zf")}),t(document).on("focus.zf.trigger blur.zf.trigger","[data-toggle-focus]",function(){var e=t(this).data("toggle-focus");t("#"+e).triggerHandler("toggle.zf.trigger",[t(this)])}),t(window).load(function(){e()}),Foundation.IHearYou=e}(jQuery),!function(t){var e=function(){function e(i){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];_classCallCheck(this,e),this.$element=i,this.options=t.extend({},e.defaults,this.$element.data(),n),this._init(),Foundation.registerPlugin(this,"Abide")}return _createClass(e,[{key:"_init",value:function(){this.$inputs=this.$element.find("input, textarea, select").not("[data-abide-ignore]"),this._events()}},{key:"_events",value:function(){var e=this;this.$element.off(".abide").on("reset.zf.abide",function(){e.resetForm()}).on("submit.zf.abide",function(){return e.validateForm()}),"fieldChange"===this.options.validateOn&&this.$inputs.off("change.zf.abide").on("change.zf.abide",function(i){e.validateInput(t(i.target))}),this.options.liveValidate&&this.$inputs.off("input.zf.abide").on("input.zf.abide",function(i){e.validateInput(t(i.target))})}},{key:"_reflow",value:function(){this._init()}},{key:"requiredCheck",value:function(t){if(!t.attr("required"))return!0;var e=!0;switch(t[0].type){case"checkbox":case"radio":e=t[0].checked;break;case"select":case"select-one":case"select-multiple":var i=t.find("option:selected");i.length&&i.val()||(e=!1);break;default:t.val()&&t.val().length||(e=!1)}return e}},{key:"findFormError",value:function(t){var e=t.siblings(this.options.formErrorSelector);return e.length||(e=t.parent().find(this.options.formErrorSelector)),e}},{key:"findLabel",value:function(t){var e=t[0].id,i=this.$element.find('label[for="'+e+'"]');return i.length?i:t.closest("label")}},{key:"addErrorClasses",value:function(t){var e=this.findLabel(t),i=this.findFormError(t);e.length&&e.addClass(this.options.labelErrorClass),i.length&&i.addClass(this.options.formErrorClass),t.addClass(this.options.inputErrorClass).attr("data-invalid","")}},{key:"removeErrorClasses",value:function(t){var e=this.findLabel(t),i=this.findFormError(t);e.length&&e.removeClass(this.options.labelErrorClass),i.length&&i.removeClass(this.options.formErrorClass),t.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")}},{key:"validateInput",value:function(t){var e=this.requiredCheck(t),i=!1,n=!0,s=t.attr("data-validator"),o=!0;switch(t[0].type){case"radio":i=this.validateRadio(t.attr("name"));break;case"checkbox":i=e;break;case"select":case"select-one":case"select-multiple":i=e;break;default:i=this.validateText(t)}s&&(n=this.matchValidation(t,s,t.attr("required"))),t.attr("data-equalto")&&(o=this.options.validators.equalTo(t));var a=[e,i,n,o].indexOf(!1)===-1,r=(a?"valid":"invalid")+".zf.abide";return this[a?"removeErrorClasses":"addErrorClasses"](t),t.trigger(r,[t]),a}},{key:"validateForm",value:function(){var e=[],i=this;this.$inputs.each(function(){e.push(i.validateInput(t(this)))});var n=e.indexOf(!1)===-1;return this.$element.find("[data-abide-error]").css("display",n?"none":"block"),this.$element.trigger((n?"formvalid":"forminvalid")+".zf.abide",[this.$element]),n}},{key:"validateText",value:function(t,e){e=e||t.attr("pattern")||t.attr("type");var i=t.val();return!i.length||(this.options.patterns.hasOwnProperty(e)?this.options.patterns[e].test(i):!e||e===t.attr("type")||new RegExp(e).test(i))}},{key:"validateRadio",value:function(e){var i=this.$element.find(':radio[name="'+e+'"]'),n=[],s=this;return i.each(function(){var e=t(this),i=s.requiredCheck(e);n.push(i),i&&s.removeErrorClasses(e)}),n.indexOf(!1)===-1}},{key:"matchValidation",value:function(t,e,i){var n=this;i=!!i;var s=e.split(" ").map(function(e){return n.options.validators[e](t,i,t.parent())});return s.indexOf(!1)===-1}},{key:"resetForm",value:function(){var e=this.$element,i=this.options;t("."+i.labelErrorClass,e).not("small").removeClass(i.labelErrorClass),t("."+i.inputErrorClass,e).not("small").removeClass(i.inputErrorClass),t(i.formErrorSelector+"."+i.formErrorClass).removeClass(i.formErrorClass),e.find("[data-abide-error]").css("display","none"),t(":input",e).not(":button, :submit, :reset, :hidden, [data-abide-ignore]").val("").removeAttr("data-invalid"),e.trigger("formreset.zf.abide",[e])}},{key:"destroy",value:function(){var e=this;this.$element.off(".abide").find("[data-abide-error]").css("display","none"),this.$inputs.off(".abide").each(function(){e.removeErrorClasses(t(this))}),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={validateOn:"fieldChange",labelErrorClass:"is-invalid-label",inputErrorClass:"is-invalid-input",formErrorSelector:".form-error",formErrorClass:"is-visible",liveValidate:!1,patterns:{alpha:/^[a-zA-Z]+$/,alpha_numeric:/^[a-zA-Z0-9]+$/,integer:/^[-+]?\d+$/,number:/^[-+]?\d*(?:[\.\,]\d+)?$/,card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,url:/^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,datetime:/^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,time:/^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,dateISO:/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,month_day_year:/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,day_month_year:/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/},validators:{equalTo:function(e,i,n){return t("#"+e.attr("data-equalto")).val()===e.val()}}},Foundation.plugin(e,"Abide")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=i,this.options=t.extend({},e.defaults,this.$element.data(),n),this._init(),Foundation.registerPlugin(this,"Accordion"),Foundation.Keyboard.register("Accordion",{ENTER:"toggle",SPACE:"toggle",ARROW_DOWN:"next",ARROW_UP:"previous"})}return _createClass(e,[{key:"_init",value:function(){this.$element.attr("role","tablist"),this.$tabs=this.$element.children("li"),0===this.$tabs.length&&(this.$tabs=this.$element.children("[data-accordion-item]")),this.$tabs.each(function(e,i){var n=t(i),s=n.find("[data-tab-content]"),o=s[0].id||Foundation.GetYoDigits(6,"accordion"),a=i.id||o+"-label";n.find("a:first").attr({"aria-controls":o,role:"tab",id:a,"aria-expanded":!1,"aria-selected":!1}),s.attr({role:"tabpanel","aria-labelledby":a,"aria-hidden":!0,id:o})});var e=this.$element.find(".is-active").children("[data-tab-content]");e.length&&this.down(e,!0),this._events()}},{key:"_events",value:function(){var e=this;this.$tabs.each(function(){var i=t(this),n=i.children("[data-tab-content]");n.length&&i.children("a").off("click.zf.accordion keydown.zf.accordion").on("click.zf.accordion",function(t){t.preventDefault(),i.hasClass("is-active")?(e.options.allowAllClosed||i.siblings().hasClass("is-active"))&&e.up(n):e.down(n)}).on("keydown.zf.accordion",function(t){Foundation.Keyboard.handleKey(t,"Accordion",{toggle:function(){e.toggle(n)},next:function(){i.next().find("a").focus().trigger("click.zf.accordion")},previous:function(){i.prev().find("a").focus().trigger("click.zf.accordion")},handled:function(){t.preventDefault(),t.stopPropagation()}})})})}},{key:"toggle",value:function(t){if(t.parent().hasClass("is-active")){if(!this.options.allowAllClosed&&!t.parent().siblings().hasClass("is-active"))return;this.up(t)}else this.down(t)}},{key:"down",value:function(e,i){var n=this;if(!this.options.multiExpand&&!i){var s=this.$element.find(".is-active").children("[data-tab-content]");s.length&&this.up(s)}e.attr("aria-hidden",!1).parent("[data-tab-content]").addBack().parent().addClass("is-active"),e.slideDown(n.options.slideSpeed,function(){n.$element.trigger("down.zf.accordion",[e])}),t("#"+e.attr("aria-labelledby")).attr({"aria-expanded":!0,"aria-selected":!0})}},{key:"up",value:function(e){var i=e.parent().siblings(),n=this,s=this.options.multiExpand?i.hasClass("is-active"):e.parent().hasClass("is-active");(this.options.allowAllClosed||s)&&(e.slideUp(n.options.slideSpeed,function(){n.$element.trigger("up.zf.accordion",[e])}),e.attr("aria-hidden",!0).parent().removeClass("is-active"),t("#"+e.attr("aria-labelledby")).attr({"aria-expanded":!1,"aria-selected":!1}))}},{key:"destroy",value:function(){this.$element.find("[data-tab-content]").slideUp(0).css("display",""),this.$element.find("a").off(".zf.accordion"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={slideSpeed:250,multiExpand:!1,allowAllClosed:!1},Foundation.plugin(e,"Accordion")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=i,this.options=t.extend({},e.defaults,this.$element.data(),n),Foundation.Nest.Feather(this.$element,"accordion"),this._init(),Foundation.registerPlugin(this,"AccordionMenu"),Foundation.Keyboard.register("AccordionMenu",{ENTER:"toggle",SPACE:"toggle",ARROW_RIGHT:"open",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"close",ESCAPE:"closeAll",TAB:"down",SHIFT_TAB:"up"})}return _createClass(e,[{key:"_init",value:function(){this.$element.find("[data-submenu]").not(".is-active").slideUp(0),this.$element.attr({role:"tablist","aria-multiselectable":this.options.multiOpen}),this.$menuLinks=this.$element.find(".is-accordion-submenu-parent"),this.$menuLinks.each(function(){var e=this.id||Foundation.GetYoDigits(6,"acc-menu-link"),i=t(this),n=i.children("[data-submenu]"),s=n[0].id||Foundation.GetYoDigits(6,"acc-menu"),o=n.hasClass("is-active");i.attr({"aria-controls":s,"aria-expanded":o,role:"tab",id:e}),n.attr({"aria-labelledby":e,"aria-hidden":!o,role:"tabpanel",id:s})});var e=this.$element.find(".is-active");if(e.length){var i=this;e.each(function(){i.down(t(this))})}this._events()}},{key:"_events",value:function(){var e=this;this.$element.find("li").each(function(){var i=t(this).children("[data-submenu]");i.length&&t(this).children("a").off("click.zf.accordionMenu").on("click.zf.accordionMenu",function(t){t.preventDefault(),e.toggle(i)})}).on("keydown.zf.accordionmenu",function(i){var n,s,o=t(this),a=o.parent("ul").children("li"),r=o.children("[data-submenu]");a.each(function(e){if(t(this).is(o))return n=a.eq(Math.max(0,e-1)),s=a.eq(Math.min(e+1,a.length-1)),t(this).children("[data-submenu]:visible").length&&(s=o.find("li:first-child")),t(this).is(":first-child")?n=o.parents("li").first():n.children("[data-submenu]:visible").length&&(n=n.find("li:last-child")),void(t(this).is(":last-child")&&(s=o.parents("li").first().next("li")))}),Foundation.Keyboard.handleKey(i,"AccordionMenu",{open:function(){r.is(":hidden")&&(e.down(r),r.find("li").first().focus())},close:function(){r.length&&!r.is(":hidden")?e.up(r):o.parent("[data-submenu]").length&&(e.up(o.parent("[data-submenu]")),o.parents("li").first().focus())},up:function(){n.focus()},down:function(){s.focus()},toggle:function(){o.children("[data-submenu]").length&&e.toggle(o.children("[data-submenu]"))},closeAll:function(){e.hideAll()},handled:function(){i.preventDefault(),i.stopImmediatePropagation()}})})}},{key:"hideAll",value:function(){this.$element.find("[data-submenu]").slideUp(this.options.slideSpeed)}},{key:"toggle",value:function(t){t.is(":animated")||(t.is(":hidden")?this.down(t):this.up(t))}},{key:"down",value:function(t){var e=this;this.options.multiOpen||this.up(this.$element.find(".is-active").not(t.parentsUntil(this.$element).add(t))),t.addClass("is-active").attr({"aria-hidden":!1}).parent(".is-accordion-submenu-parent").attr({"aria-expanded":!0}),Foundation.Move(this.options.slideSpeed,t,function(){t.slideDown(e.options.slideSpeed,function(){e.$element.trigger("down.zf.accordionMenu",[t])})})}},{key:"up",value:function(t){var e=this;Foundation.Move(this.options.slideSpeed,t,function(){t.slideUp(e.options.slideSpeed,function(){e.$element.trigger("up.zf.accordionMenu",[t])})});var i=t.find("[data-submenu]").slideUp(0).addBack().attr("aria-hidden",!0);i.parent(".is-accordion-submenu-parent").attr("aria-expanded",!1)}},{key:"destroy",value:function(){this.$element.find("[data-submenu]").slideDown(0).css("display",""),this.$element.find("a").off("click.zf.accordionMenu"),Foundation.Nest.Burn(this.$element,"accordion"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={slideSpeed:250,multiOpen:!0},Foundation.plugin(e,"AccordionMenu")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=i,this.options=t.extend({},e.defaults,this.$element.data(),n),Foundation.Nest.Feather(this.$element,"drilldown"),this._init(),Foundation.registerPlugin(this,"Drilldown"),Foundation.Keyboard.register("Drilldown",{ENTER:"open",SPACE:"open",ARROW_RIGHT:"next",ARROW_UP:"up",ARROW_DOWN:"down",ARROW_LEFT:"previous",ESCAPE:"close",TAB:"down",SHIFT_TAB:"up"})}return _createClass(e,[{key:"_init",value:function(){this.$submenuAnchors=this.$element.find("li.is-drilldown-submenu-parent"),this.$submenus=this.$submenuAnchors.children("[data-submenu]"),this.$menuItems=this.$element.find("li").not(".js-drilldown-back").attr("role","menuitem"),this._prepareMenu(),this._keyboardEvents()}},{key:"_prepareMenu",value:function(){var e=this;this.$submenuAnchors.each(function(){var i=t(this),n=i.find("a:first");e.options.parentLink&&n.clone().prependTo(i.children("[data-submenu]")).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menu-item"></li>'),n.data("savedHref",n.attr("href")).removeAttr("href"),i.children("[data-submenu]").attr({"aria-hidden":!0,tabindex:0,role:"menu"}),e._events(i)}),this.$submenus.each(function(){var i=t(this),n=i.find(".js-drilldown-back");n.length||i.prepend(e.options.backButton),e._back(i)}),this.$element.parent().hasClass("is-drilldown")||(this.$wrapper=t(this.options.wrapper).addClass("is-drilldown").css(this._getMaxDims()),
this.$element.wrap(this.$wrapper))}},{key:"_events",value:function(e){var i=this;e.off("click.zf.drilldown").on("click.zf.drilldown",function(n){if(t(n.target).parentsUntil("ul","li").hasClass("is-drilldown-submenu-parent")&&(n.stopImmediatePropagation(),n.preventDefault()),i._show(e),i.options.closeOnClick){var s=t("body").not(i.$wrapper);s.off(".zf.drilldown").on("click.zf.drilldown",function(t){t.preventDefault(),i._hideAll(),s.off(".zf.drilldown")})}})}},{key:"_keyboardEvents",value:function(){var e=this;this.$menuItems.add(this.$element.find(".js-drilldown-back")).on("keydown.zf.drilldown",function(i){var n,s,o=t(this),a=o.parent("ul").children("li");a.each(function(e){if(t(this).is(o))return n=a.eq(Math.max(0,e-1)),void(s=a.eq(Math.min(e+1,a.length-1)))}),Foundation.Keyboard.handleKey(i,"Drilldown",{next:function(){o.is(e.$submenuAnchors)&&(e._show(o),o.on(Foundation.transitionend(o),function(){o.find("ul li").filter(e.$menuItems).first().focus()}))},previous:function(){e._hide(o.parent("ul")),o.parent("ul").on(Foundation.transitionend(o),function(){setTimeout(function(){o.parent("ul").parent("li").focus()},1)})},up:function(){n.focus()},down:function(){s.focus()},close:function(){e._back()},open:function(){o.is(e.$menuItems)?o.is(e.$submenuAnchors)&&(e._show(o),setTimeout(function(){o.find("ul li").filter(e.$menuItems).first().focus()},1)):(e._hide(o.parent("ul")),setTimeout(function(){o.parent("ul").parent("li").focus()},1))},handled:function(){i.preventDefault(),i.stopImmediatePropagation()}})})}},{key:"_hideAll",value:function(){var t=this.$element.find(".is-drilldown-submenu.is-active").addClass("is-closing");t.one(Foundation.transitionend(t),function(e){t.removeClass("is-active is-closing")}),this.$element.trigger("closed.zf.drilldown")}},{key:"_back",value:function(t){var e=this;t.off("click.zf.drilldown"),t.children(".js-drilldown-back").on("click.zf.drilldown",function(i){i.stopImmediatePropagation(),e._hide(t)})}},{key:"_menuLinkEvents",value:function(){var t=this;this.$menuItems.not(".is-drilldown-submenu-parent").off("click.zf.drilldown").on("click.zf.drilldown",function(e){setTimeout(function(){t._hideAll()},0)})}},{key:"_show",value:function(t){t.children("[data-submenu]").addClass("is-active"),this.$element.trigger("open.zf.drilldown",[t])}},{key:"_hide",value:function(t){t.addClass("is-closing").one(Foundation.transitionend(t),function(){t.removeClass("is-active is-closing"),t.blur()}),t.trigger("hide.zf.drilldown",[t])}},{key:"_getMaxDims",value:function(){var e=0,i={};return this.$submenus.add(this.$element).each(function(){var i=t(this).children("li").length;e=i>e?i:e}),i["min-height"]=e*this.$menuItems[0].getBoundingClientRect().height+"px",i["max-width"]=this.$element[0].getBoundingClientRect().width+"px",i}},{key:"destroy",value:function(){this._hideAll(),Foundation.Nest.Burn(this.$element,"drilldown"),this.$element.unwrap().find(".js-drilldown-back, .is-submenu-parent-item").remove().end().find(".is-active, .is-closing, .is-drilldown-submenu").removeClass("is-active is-closing is-drilldown-submenu").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role").off(".zf.drilldown").end().off("zf.drilldown"),this.$element.find("a").each(function(){var e=t(this);e.data("savedHref")&&e.attr("href",e.data("savedHref")).removeData("savedHref")}),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={backButton:'<li class="js-drilldown-back"><a>Back</a></li>',wrapper:"<div></div>",parentLink:!1,closeOnClick:!1},Foundation.plugin(e,"Drilldown")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=i,this.options=t.extend({},e.defaults,this.$element.data(),n),this._init(),Foundation.registerPlugin(this,"Equalizer")}return _createClass(e,[{key:"_init",value:function(){var e=this.$element.attr("data-equalizer")||"",i=this.$element.find('[data-equalizer-watch="'+e+'"]');this.$watched=i.length?i:this.$element.find("[data-equalizer-watch]"),this.$element.attr("data-resize",e||Foundation.GetYoDigits(6,"eq")),this.hasNested=this.$element.find("[data-equalizer]").length>0,this.isNested=this.$element.parentsUntil(document.body,"[data-equalizer]").length>0,this.isOn=!1;var n,s=this.$element.find("img");this.options.equalizeOn?(n=this._checkMQ(),t(window).on("changed.zf.mediaquery",this._checkMQ.bind(this))):this._events(),(void 0!==n&&n===!1||void 0===n)&&(s.length?Foundation.onImagesLoaded(s,this._reflow.bind(this)):this._reflow())}},{key:"_pauseEvents",value:function(){this.isOn=!1,this.$element.off(".zf.equalizer resizeme.zf.trigger")}},{key:"_events",value:function(){var t=this;this._pauseEvents(),this.hasNested?this.$element.on("postequalized.zf.equalizer",function(e){e.target!==t.$element[0]&&t._reflow()}):this.$element.on("resizeme.zf.trigger",this._reflow.bind(this)),this.isOn=!0}},{key:"_checkMQ",value:function(){var t=!Foundation.MediaQuery.atLeast(this.options.equalizeOn);return t?this.isOn&&(this._pauseEvents(),this.$watched.css("height","auto")):this.isOn||this._events(),t}},{key:"_killswitch",value:function(){}},{key:"_reflow",value:function(){return!this.options.equalizeOnStack&&this._isStacked()?(this.$watched.css("height","auto"),!1):void(this.options.equalizeByRow?this.getHeightsByRow(this.applyHeightByRow.bind(this)):this.getHeights(this.applyHeight.bind(this)))}},{key:"_isStacked",value:function(){return this.$watched[0].offsetTop!==this.$watched[1].offsetTop}},{key:"getHeights",value:function(t){for(var e=[],i=0,n=this.$watched.length;i<n;i++)this.$watched[i].style.height="auto",e.push(this.$watched[i].offsetHeight);t(e)}},{key:"getHeightsByRow",value:function(e){var i=this.$watched.first().offset().top,n=[],s=0;n[s]=[];for(var o=0,a=this.$watched.length;o<a;o++){this.$watched[o].style.height="auto";var r=t(this.$watched[o]).offset().top;r!=i&&(s++,n[s]=[],i=r),n[s].push([this.$watched[o],this.$watched[o].offsetHeight])}for(var l=0,d=n.length;l<d;l++){var h=t(n[l]).map(function(){return this[1]}).get(),u=Math.max.apply(null,h);n[l].push(u)}e(n)}},{key:"applyHeight",value:function(t){var e=Math.max.apply(null,t);this.$element.trigger("preequalized.zf.equalizer"),this.$watched.css("height",e),this.$element.trigger("postequalized.zf.equalizer")}},{key:"applyHeightByRow",value:function(e){this.$element.trigger("preequalized.zf.equalizer");for(var i=0,n=e.length;i<n;i++){var s=e[i].length,o=e[i][s-1];if(s<=2)t(e[i][0][0]).css({height:"auto"});else{this.$element.trigger("preequalizedrow.zf.equalizer");for(var a=0,r=s-1;a<r;a++)t(e[i][a][0]).css({height:o});this.$element.trigger("postequalizedrow.zf.equalizer")}}this.$element.trigger("postequalized.zf.equalizer")}},{key:"destroy",value:function(){this._pauseEvents(),this.$watched.css("height","auto"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={equalizeOnStack:!0,equalizeByRow:!1,equalizeOn:""},Foundation.plugin(e,"Equalizer")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=i,this.options=t.extend({},e.defaults,n),this.rules=[],this.currentPath="",this._init(),this._events(),Foundation.registerPlugin(this,"Interchange")}return _createClass(e,[{key:"_init",value:function(){this._addBreakpoints(),this._generateRules(),this._reflow()}},{key:"_events",value:function(){t(window).on("resize.zf.interchange",Foundation.util.throttle(this._reflow.bind(this),50))}},{key:"_reflow",value:function(){var t;for(var e in this.rules){var i=this.rules[e];window.matchMedia(i.query).matches&&(t=i)}t&&this.replace(t.path)}},{key:"_addBreakpoints",value:function(){for(var t in Foundation.MediaQuery.queries){var i=Foundation.MediaQuery.queries[t];e.SPECIAL_QUERIES[i.name]=i.value}}},{key:"_generateRules",value:function(t){var i,n=[];i=this.options.rules?this.options.rules:this.$element.data("interchange").match(/\[.*?\]/g);for(var s in i){var o=i[s].slice(1,-1).split(", "),a=o.slice(0,-1).join(""),r=o[o.length-1];e.SPECIAL_QUERIES[r]&&(r=e.SPECIAL_QUERIES[r]),n.push({path:a,query:r})}this.rules=n}},{key:"replace",value:function(e){if(this.currentPath!==e){var i=this,n="replaced.zf.interchange";"IMG"===this.$element[0].nodeName?this.$element.attr("src",e).load(function(){i.currentPath=e}).trigger(n):e.match(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i)?this.$element.css({"background-image":"url("+e+")"}).trigger(n):t.get(e,function(s){i.$element.html(s).trigger(n),t(s).foundation(),i.currentPath=e})}}},{key:"destroy",value:function(){}}]),e}();e.defaults={rules:null},e.SPECIAL_QUERIES={landscape:"screen and (orientation: landscape)",portrait:"screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)"},Foundation.plugin(e,"Interchange")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=i,this.options=t.extend({},e.defaults,this.$element.data(),n),this._init(),Foundation.registerPlugin(this,"Magellan")}return _createClass(e,[{key:"_init",value:function(){var e=this.$element[0].id||Foundation.GetYoDigits(6,"magellan");this.$targets=t("[data-magellan-target]"),this.$links=this.$element.find("a"),this.$element.attr({"data-resize":e,"data-scroll":e,id:e}),this.$active=t(),this.scrollPos=parseInt(window.pageYOffset,10),this._events()}},{key:"calcPoints",value:function(){var e=this,i=document.body,n=document.documentElement;this.points=[],this.winHeight=Math.round(Math.max(window.innerHeight,n.clientHeight)),this.docHeight=Math.round(Math.max(i.scrollHeight,i.offsetHeight,n.clientHeight,n.scrollHeight,n.offsetHeight)),this.$targets.each(function(){var i=t(this),n=Math.round(i.offset().top-e.options.threshold);i.targetPoint=n,e.points.push(n)})}},{key:"_events",value:function(){var e=this;t("html, body"),{duration:e.options.animationDuration,easing:e.options.animationEasing};t(window).one("load",function(){e.options.deepLinking&&location.hash&&e.scrollToLoc(location.hash),e.calcPoints(),e._updateActive()}),this.$element.on({"resizeme.zf.trigger":this.reflow.bind(this),"scrollme.zf.trigger":this._updateActive.bind(this)}).on("click.zf.magellan",'a[href^="#"]',function(t){t.preventDefault();var i=this.getAttribute("href");e.scrollToLoc(i)})}},{key:"scrollToLoc",value:function(e){var i=Math.round(t(e).offset().top-this.options.threshold/2-this.options.barOffset);t("html, body").stop(!0).animate({scrollTop:i},this.options.animationDuration,this.options.animationEasing)}},{key:"reflow",value:function(){this.calcPoints(),this._updateActive()}},{key:"_updateActive",value:function(){var t,e=parseInt(window.pageYOffset,10);if(e+this.winHeight===this.docHeight)t=this.points.length-1;else if(e<this.points[0])t=0;else{var i=this.scrollPos<e,n=this,s=this.points.filter(function(t,s){return i?t<=e:t-n.options.threshold<=e});t=s.length?s.length-1:0}if(this.$active.removeClass(this.options.activeClass),this.$active=this.$links.eq(t).addClass(this.options.activeClass),this.options.deepLinking){var o=this.$active[0].getAttribute("href");window.history.pushState?window.history.pushState(null,null,o):window.location.hash=o}this.scrollPos=e,this.$element.trigger("update.zf.magellan",[this.$active])}},{key:"destroy",value:function(){if(this.$element.off(".zf.trigger .zf.magellan").find("."+this.options.activeClass).removeClass(this.options.activeClass),this.options.deepLinking){var t=this.$active[0].getAttribute("href");window.location.hash.replace(t,"")}Foundation.unregisterPlugin(this)}}]),e}();e.defaults={animationDuration:500,animationEasing:"linear",threshold:50,activeClass:"active",deepLinking:!1,barOffset:0},Foundation.plugin(e,"Magellan")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=i,this.options=t.extend({},e.defaults,this.$element.data(),n),this.$lastTrigger=t(),this._init(),this._events(),Foundation.registerPlugin(this,"OffCanvas")}return _createClass(e,[{key:"_init",value:function(){var e=this.$element.attr("id");if(this.$element.attr("aria-hidden","true"),t(document).find('[data-open="'+e+'"], [data-close="'+e+'"], [data-toggle="'+e+'"]').attr("aria-expanded","false").attr("aria-controls",e),this.options.closeOnClick)if(t(".js-off-canvas-exit").length)this.$exiter=t(".js-off-canvas-exit");else{var i=document.createElement("div");i.setAttribute("class","js-off-canvas-exit"),t("[data-off-canvas-content]").append(i),this.$exiter=t(i)}this.options.isRevealed=this.options.isRevealed||new RegExp(this.options.revealClass,"g").test(this.$element[0].className),this.options.isRevealed&&(this.options.revealOn=this.options.revealOn||this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split("-")[2],this._setMQChecker()),this.options.transitionTime||(this.options.transitionTime=1e3*parseFloat(window.getComputedStyle(t("[data-off-canvas-wrapper]")[0]).transitionDuration))}},{key:"_events",value:function(){this.$element.off(".zf.trigger .zf.offcanvas").on({"open.zf.trigger":this.open.bind(this),"close.zf.trigger":this.close.bind(this),"toggle.zf.trigger":this.toggle.bind(this),"keydown.zf.offcanvas":this._handleKeyboard.bind(this)}),this.options.closeOnClick&&this.$exiter.length&&this.$exiter.on({"click.zf.offcanvas":this.close.bind(this)})}},{key:"_setMQChecker",value:function(){var e=this;t(window).on("changed.zf.mediaquery",function(){Foundation.MediaQuery.atLeast(e.options.revealOn)?e.reveal(!0):e.reveal(!1)}).one("load.zf.offcanvas",function(){Foundation.MediaQuery.atLeast(e.options.revealOn)&&e.reveal(!0)})}},{key:"reveal",value:function(t){var e=this.$element.find("[data-close]");t?(this.close(),this.isRevealed=!0,this.$element.off("open.zf.trigger toggle.zf.trigger"),e.length&&e.hide()):(this.isRevealed=!1,this.$element.on({"open.zf.trigger":this.open.bind(this),"toggle.zf.trigger":this.toggle.bind(this)}),e.length&&e.show())}},{key:"open",value:function(e,i){if(!this.$element.hasClass("is-open")&&!this.isRevealed){var n=this;t(document.body);this.options.forceTop&&t("body").scrollTop(0),Foundation.Move(this.options.transitionTime,this.$element,function(){t("[data-off-canvas-wrapper]").addClass("is-off-canvas-open is-open-"+n.options.position),n.$element.addClass("is-open")}),this.$element.attr("aria-hidden","false").trigger("opened.zf.offcanvas"),this.options.closeOnClick&&this.$exiter.addClass("is-visible"),i&&(this.$lastTrigger=i.attr("aria-expanded","true")),this.options.autoFocus&&this.$element.one(Foundation.transitionend(this.$element),function(){n.$element.find("a, button").eq(0).focus()}),this.options.trapFocus&&(t("[data-off-canvas-content]").attr("tabindex","-1"),this._trapFocus())}}},{key:"_trapFocus",value:function(){var t=Foundation.Keyboard.findFocusable(this.$element),e=t.eq(0),i=t.eq(-1);t.off(".zf.offcanvas").on("keydown.zf.offcanvas",function(t){9!==t.which&&9!==t.keycode||(t.target!==i[0]||t.shiftKey||(t.preventDefault(),e.focus()),t.target===e[0]&&t.shiftKey&&(t.preventDefault(),i.focus()))})}},{key:"close",value:function(e){if(this.$element.hasClass("is-open")&&!this.isRevealed){var i=this;t("[data-off-canvas-wrapper]").removeClass("is-off-canvas-open is-open-"+i.options.position),i.$element.removeClass("is-open"),this.$element.attr("aria-hidden","true").trigger("closed.zf.offcanvas"),this.options.closeOnClick&&this.$exiter.removeClass("is-visible"),this.$lastTrigger.attr("aria-expanded","false"),this.options.trapFocus&&t("[data-off-canvas-content]").removeAttr("tabindex")}}},{key:"toggle",value:function(t,e){this.$element.hasClass("is-open")?this.close(t,e):this.open(t,e)}},{key:"_handleKeyboard",value:function(t){27===t.which&&(t.stopPropagation(),t.preventDefault(),this.close(),this.$lastTrigger.focus())}},{key:"destroy",value:function(){this.close(),this.$element.off(".zf.trigger .zf.offcanvas"),this.$exiter.off(".zf.offcanvas"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={closeOnClick:!0,transitionTime:0,position:"left",forceTop:!0,isRevealed:!1,revealOn:null,autoFocus:!0,revealClass:"reveal-for-",trapFocus:!1},Foundation.plugin(e,"OffCanvas")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=i,this.options=t.extend({},e.defaults,this.$element.data(),n),this._init(),Foundation.registerPlugin(this,"Orbit"),Foundation.Keyboard.register("Orbit",{ltr:{ARROW_RIGHT:"next",ARROW_LEFT:"previous"},rtl:{ARROW_LEFT:"next",ARROW_RIGHT:"previous"}})}return _createClass(e,[{key:"_init",value:function(){this.$wrapper=this.$element.find("."+this.options.containerClass),this.$slides=this.$element.find("."+this.options.slideClass);var t=this.$element.find("img"),e=this.$slides.filter(".is-active");e.length||this.$slides.eq(0).addClass("is-active"),this.options.useMUI||this.$slides.addClass("no-motionui"),t.length?Foundation.onImagesLoaded(t,this._prepareForOrbit.bind(this)):this._prepareForOrbit(),this.options.bullets&&this._loadBullets(),this._events(),this.options.autoPlay&&this.$slides.length>1&&this.geoSync(),this.options.accessible&&this.$wrapper.attr("tabindex",0)}},{key:"_loadBullets",value:function(){this.$bullets=this.$element.find("."+this.options.boxOfBullets).find("button")}},{key:"geoSync",value:function(){var t=this;this.timer=new Foundation.Timer(this.$element,{duration:this.options.timerDelay,infinite:!1},function(){t.changeSlide(!0)}),this.timer.start()}},{key:"_prepareForOrbit",value:function(){var t=this;this._setWrapperHeight(function(e){t._setSlideHeight(e)})}},{key:"_setWrapperHeight",value:function(e){var i,n=0,s=0;this.$slides.each(function(){i=this.getBoundingClientRect().height,t(this).attr("data-slide",s),s&&t(this).css({position:"relative",display:"none"}),n=i>n?i:n,s++}),s===this.$slides.length&&(this.$wrapper.css({height:n}),e(n))}},{key:"_setSlideHeight",value:function(e){this.$slides.each(function(){t(this).css("max-height",e)})}},{key:"_events",value:function(){var e=this;if(this.$slides.length>1){if(this.options.swipe&&this.$slides.off("swipeleft.zf.orbit swiperight.zf.orbit").on("swipeleft.zf.orbit",function(t){t.preventDefault(),e.changeSlide(!0)}).on("swiperight.zf.orbit",function(t){t.preventDefault(),e.changeSlide(!1)}),this.options.autoPlay&&(this.$slides.on("click.zf.orbit",function(){e.$element.data("clickedOn",!e.$element.data("clickedOn")),e.timer[e.$element.data("clickedOn")?"pause":"start"]()}),this.options.pauseOnHover&&this.$element.on("mouseenter.zf.orbit",function(){e.timer.pause()}).on("mouseleave.zf.orbit",function(){e.$element.data("clickedOn")||e.timer.start()})),this.options.navButtons){var i=this.$element.find("."+this.options.nextClass+", ."+this.options.prevClass);i.attr("tabindex",0).on("click.zf.orbit touchend.zf.orbit",function(){e.changeSlide(t(this).hasClass(e.options.nextClass))})}this.options.bullets&&this.$bullets.on("click.zf.orbit touchend.zf.orbit",function(){if(/is-active/g.test(this.className))return!1;var i=t(this).data("slide"),n=i>e.$slides.filter(".is-active").data("slide"),s=e.$slides.eq(i);e.changeSlide(n,s,i)}),this.$wrapper.add(this.$bullets).on("keydown.zf.orbit",function(i){Foundation.Keyboard.handleKey(i,"Orbit",{next:function(){e.changeSlide(!0)},previous:function(){e.changeSlide(!1)},handled:function(){t(i.target).is(e.$bullets)&&e.$bullets.filter(".is-active").focus()}})})}}},{key:"changeSlide",value:function(t,e,i){var n=this.$slides.filter(".is-active").eq(0);if(/mui/g.test(n[0].className))return!1;var s,o=this.$slides.first(),a=this.$slides.last(),r=t?"Right":"Left",l=t?"Left":"Right",d=this;s=e?e:t?this.options.infiniteWrap?n.next("."+this.options.slideClass).length?n.next("."+this.options.slideClass):o:n.next("."+this.options.slideClass):this.options.infiniteWrap?n.prev("."+this.options.slideClass).length?n.prev("."+this.options.slideClass):a:n.prev("."+this.options.slideClass),s.length&&(this.options.bullets&&(i=i||this.$slides.index(s),this._updateBullets(i)),this.options.useMUI?(Foundation.Motion.animateIn(s.addClass("is-active").css({position:"absolute",top:0}),this.options["animInFrom"+r],function(){s.css({position:"relative",display:"block"}).attr("aria-live","polite")}),Foundation.Motion.animateOut(n.removeClass("is-active"),this.options["animOutTo"+l],function(){n.removeAttr("aria-live"),d.options.autoPlay&&!d.timer.isPaused&&d.timer.restart()})):(n.removeClass("is-active is-in").removeAttr("aria-live").hide(),s.addClass("is-active is-in").attr("aria-live","polite").show(),this.options.autoPlay&&!this.timer.isPaused&&this.timer.restart()),this.$element.trigger("slidechange.zf.orbit",[s]))}},{key:"_updateBullets",value:function(t){var e=this.$element.find("."+this.options.boxOfBullets).find(".is-active").removeClass("is-active").blur(),i=e.find("span:last").detach();this.$bullets.eq(t).addClass("is-active").append(i)}},{key:"destroy",value:function(){this.$element.off(".zf.orbit").find("*").off(".zf.orbit").end().hide(),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={bullets:!0,navButtons:!0,animInFromRight:"slide-in-right",animOutToRight:"slide-out-right",animInFromLeft:"slide-in-left",animOutToLeft:"slide-out-left",autoPlay:!0,timerDelay:5e3,infiniteWrap:!0,swipe:!0,pauseOnHover:!0,accessible:!0,containerClass:"orbit-container",slideClass:"orbit-slide",boxOfBullets:"orbit-bullets",nextClass:"orbit-next",prevClass:"orbit-previous",useMUI:!0},Foundation.plugin(e,"Orbit")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=t(i),this.rules=this.$element.data("responsive-menu"),this.currentMq=null,this.currentPlugin=null,this._init(),this._events(),Foundation.registerPlugin(this,"ResponsiveMenu")}return _createClass(e,[{key:"_init",value:function(){for(var e={},n=this.rules.split(" "),s=0;s<n.length;s++){var o=n[s].split("-"),a=o.length>1?o[0]:"small",r=o.length>1?o[1]:o[0];null!==i[r]&&(e[a]=i[r])}this.rules=e,t.isEmptyObject(e)||this._checkMediaQueries()}},{key:"_events",value:function(){var e=this;t(window).on("changed.zf.mediaquery",function(){e._checkMediaQueries()})}},{key:"_checkMediaQueries",value:function(){var e,n=this;t.each(this.rules,function(t){Foundation.MediaQuery.atLeast(t)&&(e=t)}),e&&(this.currentPlugin instanceof this.rules[e].plugin||(t.each(i,function(t,e){n.$element.removeClass(e.cssClass)}),this.$element.addClass(this.rules[e].cssClass),this.currentPlugin&&this.currentPlugin.destroy(),this.currentPlugin=new this.rules[e].plugin(this.$element,{})))}},{key:"destroy",value:function(){this.currentPlugin.destroy(),t(window).off(".zf.ResponsiveMenu"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={};var i={dropdown:{cssClass:"dropdown",plugin:Foundation._plugins["dropdown-menu"]||null},drilldown:{cssClass:"drilldown",plugin:Foundation._plugins.drilldown||null},accordion:{cssClass:"accordion-menu",plugin:Foundation._plugins["accordion-menu"]||null}};Foundation.plugin(e,"ResponsiveMenu")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=t(i),this.options=t.extend({},e.defaults,this.$element.data(),n),this._init(),this._events(),Foundation.registerPlugin(this,"ResponsiveToggle")}return _createClass(e,[{key:"_init",value:function(){var e=this.$element.data("responsive-toggle");this.$targetMenu=t("#"+e),this.$toggler=this.$element.find("[data-toggle]"),this._update()}},{key:"_events",value:function(){t(window).on("changed.zf.mediaquery",this._update.bind(this)),this.$toggler.on("click.zf.responsiveToggle",this.toggleMenu.bind(this))}},{key:"_update",value:function(){Foundation.MediaQuery.atLeast(this.options.hideFor)?(this.$element.hide(),this.$targetMenu.show()):(this.$element.show(),this.$targetMenu.hide())}},{key:"toggleMenu",value:function(){Foundation.MediaQuery.atLeast(this.options.hideFor)||(this.$targetMenu.toggle(0),this.$element.trigger("toggled.zf.responsiveToggle"))}},{key:"destroy",value:function(){}}]),e}();e.defaults={hideFor:"medium"},Foundation.plugin(e,"ResponsiveToggle")}(jQuery),!function(t){function e(){return/iP(ad|hone|od).*OS/.test(window.navigator.userAgent)}var i=function(){function i(e,n){_classCallCheck(this,i),this.$element=e,this.options=t.extend({},i.defaults,this.$element.data(),n),this._init(),Foundation.registerPlugin(this,"Reveal"),Foundation.Keyboard.register("Reveal",{ENTER:"open",SPACE:"open",ESCAPE:"close",TAB:"tab_forward",SHIFT_TAB:"tab_backward"})}return _createClass(i,[{key:"_init",value:function(){if(this.id=this.$element.attr("id"),this.isActive=!1,this.cached={mq:Foundation.MediaQuery.current},this.isiOS=e(),this.isiOS&&this.$element.addClass("is-ios"),this.$anchor=t(t('[data-open="'+this.id+'"]').length?'[data-open="'+this.id+'"]':'[data-toggle="'+this.id+'"]'),this.$anchor.length){var i=this.$anchor[0].id||Foundation.GetYoDigits(6,"reveal");this.$anchor.attr({"aria-controls":this.id,id:i,"aria-haspopup":!0,tabindex:0}),this.$element.attr({"aria-labelledby":i})}(this.options.fullScreen||this.$element.hasClass("full"))&&(this.options.fullScreen=!0,this.options.overlay=!1),this.options.overlay&&!this.$overlay&&(this.$overlay=this._makeOverlay(this.id)),this.$element.attr({role:"dialog","aria-hidden":!0,"data-yeti-box":this.id,"data-resize":this.id}),this.$overlay?this.$element.detach().appendTo(this.$overlay):(this.$element.detach().appendTo(t("body")),this.$element.addClass("without-overlay")),this._events(),this.options.deepLink&&window.location.hash==="#"+this.id&&t(window).one("load.zf.reveal",this.open.bind(this))}},{key:"_makeOverlay",value:function(e){var i=t("<div></div>").addClass("reveal-overlay").attr({tabindex:-1,"aria-hidden":!0}).appendTo("body");return i}},{key:"_updatePosition",value:function(){var e,i=this.$element.outerWidth(),n=t(window).width(),s=this.$element.outerHeight(),o=t(window).height(),a=parseInt((n-i)/2,10);e=s>o?parseInt(Math.min(100,o/10),10):parseInt((o-s)/4,10),this.$element.css({top:e+"px"}),this.$overlay||this.$element.css({left:a+"px"})}},{key:"_events",value:function(){var e=this;this.$element.on({"open.zf.trigger":this.open.bind(this),"close.zf.trigger":this.close.bind(this),"toggle.zf.trigger":this.toggle.bind(this),"resizeme.zf.trigger":function(){e._updatePosition()}}),this.$anchor.length&&this.$anchor.on("keydown.zf.reveal",function(t){13!==t.which&&32!==t.which||(t.stopPropagation(),t.preventDefault(),e.open())}),this.options.closeOnClick&&this.options.overlay&&this.$overlay.off(".zf.reveal").on("click.zf.reveal",function(i){i.target===e.$element[0]||t.contains(e.$element[0],i.target)||e.close()}),this.options.deepLink&&t(window).on("popstate.zf.reveal:"+this.id,this._handleState.bind(this))}},{key:"_handleState",value:function(t){window.location.hash!=="#"+this.id||this.isActive?this.close():this.open()}},{key:"open",value:function(){var e=this;if(this.options.deepLink){var i="#"+this.id;window.history.pushState?window.history.pushState(null,null,i):window.location.hash=i}if(this.isActive=!0,this.$element.css({visibility:"hidden"}).show().scrollTop(0),this.options.overlay&&this.$overlay.css({visibility:"hidden"}).show(),this._updatePosition(),this.$element.hide().css({visibility:""}),this.$overlay&&this.$overlay.css({visibility:""}).hide(),this.options.multipleOpened||this.$element.trigger("closeme.zf.reveal",this.id),this.options.animationIn?(this.options.overlay&&Foundation.Motion.animateIn(this.$overlay,"fade-in"),Foundation.Motion.animateIn(this.$element,this.options.animationIn,function(){this.focusableElements=Foundation.Keyboard.findFocusable(this.$element)})):(this.options.overlay&&this.$overlay.show(0),this.$element.show(this.options.showDelay)),this.$element.attr({"aria-hidden":!1,tabindex:-1}).focus(),this.$element.trigger("open.zf.reveal"),this.isiOS){var n=window.pageYOffset;t("html, body").addClass("is-reveal-open").scrollTop(n)}else t("body").addClass("is-reveal-open");t("body").addClass("is-reveal-open").attr("aria-hidden",!(!this.options.overlay&&!this.options.fullScreen)),setTimeout(function(){e._extraHandlers()},0)}},{key:"_extraHandlers",value:function(){var e=this;this.focusableElements=Foundation.Keyboard.findFocusable(this.$element),this.options.overlay||!this.options.closeOnClick||this.options.fullScreen||t("body").on("click.zf.reveal",function(i){i.target===e.$element[0]||t.contains(e.$element[0],i.target)||e.close()}),this.options.closeOnEsc&&t(window).on("keydown.zf.reveal",function(t){Foundation.Keyboard.handleKey(t,"Reveal",{close:function(){e.options.closeOnEsc&&(e.close(),e.$anchor.focus())}}),0===e.focusableElements.length&&t.preventDefault()}),this.$element.on("keydown.zf.reveal",function(i){var n=t(this);Foundation.Keyboard.handleKey(i,"Reveal",{tab_forward:function(){e.$element.find(":focus").is(e.focusableElements.eq(-1))&&(e.focusableElements.eq(0).focus(),i.preventDefault())},tab_backward:function(){(e.$element.find(":focus").is(e.focusableElements.eq(0))||e.$element.is(":focus"))&&(e.focusableElements.eq(-1).focus(),i.preventDefault())},open:function(){e.$element.find(":focus").is(e.$element.find("[data-close]"))?setTimeout(function(){e.$anchor.focus()},1):n.is(e.focusableElements)&&e.open()},close:function(){e.options.closeOnEsc&&(e.close(),e.$anchor.focus())}})})}},{key:"close",value:function(){function e(){i.isiOS?t("html, body").removeClass("is-reveal-open"):t("body").removeClass("is-reveal-open"),t("body").attr({"aria-hidden":!1,tabindex:""}),i.$element.attr("aria-hidden",!0),i.$element.trigger("closed.zf.reveal")}if(!this.isActive||!this.$element.is(":visible"))return!1;var i=this;this.options.animationOut?(this.options.overlay?Foundation.Motion.animateOut(this.$overlay,"fade-out",e):e(),Foundation.Motion.animateOut(this.$element,this.options.animationOut)):(this.options.overlay?this.$overlay.hide(0,e):e(),this.$element.hide(this.options.hideDelay)),this.options.closeOnEsc&&t(window).off("keydown.zf.reveal"),!this.options.overlay&&this.options.closeOnClick&&t("body").off("click.zf.reveal"),this.$element.off("keydown.zf.reveal"),this.options.resetOnClose&&this.$element.html(this.$element.html()),this.isActive=!1,i.options.deepLink&&(window.history.replaceState?window.history.replaceState("",document.title,window.location.pathname):window.location.hash="")}},{key:"toggle",value:function(){this.isActive?this.close():this.open()}},{key:"destroy",value:function(){this.options.overlay&&this.$overlay.hide().off().remove(),this.$element.hide().off(),this.$anchor.off(".zf"),t(window).off(".zf.reveal:"+this.id),Foundation.unregisterPlugin(this)}}]),i}();i.defaults={animationIn:"",animationOut:"",showDelay:0,hideDelay:0,closeOnClick:!0,closeOnEsc:!0,multipleOpened:!1,vOffset:100,hOffset:0,fullScreen:!1,btmOffsetPct:10,overlay:!0,resetOnClose:!1,deepLink:!1},Foundation.plugin(i,"Reveal")}(jQuery),!function(t){function e(t,e){return t/e}function i(t,e,i,n){return Math.abs(t.position()[e]+t[n]()/2-i)}var n=function(){function n(e,i){_classCallCheck(this,n),this.$element=e,this.options=t.extend({},n.defaults,this.$element.data(),i),this._init(),Foundation.registerPlugin(this,"Slider"),Foundation.Keyboard.register("Slider",{ltr:{ARROW_RIGHT:"increase",ARROW_UP:"increase",ARROW_DOWN:"decrease",ARROW_LEFT:"decrease",SHIFT_ARROW_RIGHT:"increase_fast",SHIFT_ARROW_UP:"increase_fast",SHIFT_ARROW_DOWN:"decrease_fast",SHIFT_ARROW_LEFT:"decrease_fast"},rtl:{ARROW_LEFT:"increase",ARROW_RIGHT:"decrease",SHIFT_ARROW_LEFT:"increase_fast",SHIFT_ARROW_RIGHT:"decrease_fast"}})}return _createClass(n,[{key:"_init",value:function(){this.inputs=this.$element.find("input"),this.handles=this.$element.find("[data-slider-handle]"),this.$handle=this.handles.eq(0),this.$input=this.inputs.length?this.inputs.eq(0):t("#"+this.$handle.attr("aria-controls")),this.$fill=this.$element.find("[data-slider-fill]").css(this.options.vertical?"height":"width",0);var e=!1,i=this;(this.options.disabled||this.$element.hasClass(this.options.disabledClass))&&(this.options.disabled=!0,this.$element.addClass(this.options.disabledClass)),this.inputs.length||(this.inputs=t().add(this.$input),
this.options.binding=!0),this._setInitAttr(0),this._events(this.$handle),this.handles[1]&&(this.options.doubleSided=!0,this.$handle2=this.handles.eq(1),this.$input2=this.inputs.length>1?this.inputs.eq(1):t("#"+this.$handle2.attr("aria-controls")),this.inputs[1]||(this.inputs=this.inputs.add(this.$input2)),e=!0,this._setHandlePos(this.$handle,this.options.initialStart,!0,function(){i._setHandlePos(i.$handle2,i.options.initialEnd,!0)}),this._setInitAttr(1),this._events(this.$handle2)),e||this._setHandlePos(this.$handle,this.options.initialStart,!0)}},{key:"_setHandlePos",value:function(t,i,n,s){i=parseFloat(i),i<this.options.start?i=this.options.start:i>this.options.end&&(i=this.options.end);var o=this.options.doubleSided;if(o)if(0===this.handles.index(t)){var a=parseFloat(this.$handle2.attr("aria-valuenow"));i=i>=a?a-this.options.step:i}else{var r=parseFloat(this.$handle.attr("aria-valuenow"));i=i<=r?r+this.options.step:i}this.options.vertical&&!n&&(i=this.options.end-i);var l=this,d=this.options.vertical,h=d?"height":"width",u=d?"top":"left",c=t[0].getBoundingClientRect()[h],f=this.$element[0].getBoundingClientRect()[h],p=e(i,this.options.end).toFixed(2),m=(f-c)*p,v=(100*e(m,f)).toFixed(this.options.decimal);i=parseFloat(i.toFixed(this.options.decimal));var g={};if(this._setValues(t,i),o){var y,w=0===this.handles.index(t),b=~~(100*e(c,f));if(w)g[u]=v+"%",y=parseFloat(this.$handle2[0].style[u])-v+b,s&&"function"==typeof s&&s();else{var $=parseFloat(this.$handle[0].style[u]);y=v-(isNaN($)?this.options.initialStart/((this.options.end-this.options.start)/100):$)+b}g["min-"+h]=y+"%"}this.$element.one("finished.zf.animate",function(){l.$element.trigger("moved.zf.slider",[t])});var k=this.$element.data("dragging")?1e3/60:this.options.moveTime;Foundation.Move(k,t,function(){t.css(u,v+"%"),l.options.doubleSided?l.$fill.css(g):l.$fill.css(h,100*p+"%")})}},{key:"_setInitAttr",value:function(t){var e=this.inputs.eq(t).attr("id")||Foundation.GetYoDigits(6,"slider");this.inputs.eq(t).attr({id:e,max:this.options.end,min:this.options.start,step:this.options.step}),this.handles.eq(t).attr({role:"slider","aria-controls":e,"aria-valuemax":this.options.end,"aria-valuemin":this.options.start,"aria-valuenow":0===t?this.options.initialStart:this.options.initialEnd,"aria-orientation":this.options.vertical?"vertical":"horizontal",tabindex:0})}},{key:"_setValues",value:function(t,e){var i=this.options.doubleSided?this.handles.index(t):0;this.inputs.eq(i).val(e),t.attr("aria-valuenow",e)}},{key:"_handleEvent",value:function(t,n,s){var o,a;if(s)o=this._adjustValue(null,s),a=!0;else{t.preventDefault();var r=this,l=this.options.vertical,d=l?"height":"width",h=l?"top":"left",u=l?t.pageY:t.pageX,c=this.$handle[0].getBoundingClientRect()[d]/2,f=this.$element[0].getBoundingClientRect()[d],p=this.$element.offset()[h]-u,m=p>0?-c:p-c<-f?f:Math.abs(p),v=e(m,f);if(o=(this.options.end-this.options.start)*v,Foundation.rtl()&&!this.options.vertical&&(o=this.options.end-o),o=r._adjustValue(null,o),a=!1,!n){var g=i(this.$handle,h,m,d),y=i(this.$handle2,h,m,d);n=g<=y?this.$handle:this.$handle2}}this._setHandlePos(n,o,a)}},{key:"_adjustValue",value:function(t,e){var i,n,s,o,a=this.options.step,r=parseFloat(a/2);return i=t?parseFloat(t.attr("aria-valuenow")):e,n=i%a,s=i-n,o=s+a,0===n?i:i=i>=s+r?o:s}},{key:"_events",value:function(e){if(this.options.disabled)return!1;var i,n=this;if(this.inputs.off("change.zf.slider").on("change.zf.slider",function(e){var i=n.inputs.index(t(this));n._handleEvent(e,n.handles.eq(i),t(this).val())}),this.options.clickSelect&&this.$element.off("click.zf.slider").on("click.zf.slider",function(e){return!n.$element.data("dragging")&&void(t(e.target).is("[data-slider-handle]")||(n.options.doubleSided?n._handleEvent(e):n._handleEvent(e,n.$handle)))}),this.options.draggable){this.handles.addTouch();var s=t("body");e.off("mousedown.zf.slider").on("mousedown.zf.slider",function(o){e.addClass("is-dragging"),n.$fill.addClass("is-dragging"),n.$element.data("dragging",!0),i=t(o.currentTarget),s.on("mousemove.zf.slider",function(t){t.preventDefault(),n._handleEvent(t,i)}).on("mouseup.zf.slider",function(t){n._handleEvent(t,i),e.removeClass("is-dragging"),n.$fill.removeClass("is-dragging"),n.$element.data("dragging",!1),s.off("mousemove.zf.slider mouseup.zf.slider")})})}e.off("keydown.zf.slider").on("keydown.zf.slider",function(e){var i,s=t(this),o=n.options.doubleSided?n.handles.index(s):0,a=parseFloat(n.inputs.eq(o).val());Foundation.Keyboard.handleKey(e,"Slider",{decrease:function(){i=a-n.options.step},increase:function(){i=a+n.options.step},decrease_fast:function(){i=a-10*n.options.step},increase_fast:function(){i=a+10*n.options.step},handled:function(){e.preventDefault(),n._setHandlePos(s,i,!0)}})})}},{key:"destroy",value:function(){this.handles.off(".zf.slider"),this.inputs.off(".zf.slider"),this.$element.off(".zf.slider"),Foundation.unregisterPlugin(this)}}]),n}();n.defaults={start:0,end:100,step:1,initialStart:0,initialEnd:100,binding:!1,clickSelect:!0,vertical:!1,draggable:!0,disabled:!1,doubleSided:!1,decimal:2,moveTime:200,disabledClass:"disabled",invertVertical:!1},Foundation.plugin(n,"Slider")}(jQuery),!function(t){function e(t){return parseInt(window.getComputedStyle(document.body,null).fontSize,10)*t}var i=function(){function i(e,n){_classCallCheck(this,i),this.$element=e,this.options=t.extend({},i.defaults,this.$element.data(),n),this._init(),Foundation.registerPlugin(this,"Sticky")}return _createClass(i,[{key:"_init",value:function(){var e=this.$element.parent("[data-sticky-container]"),i=this.$element[0].id||Foundation.GetYoDigits(6,"sticky"),n=this;e.length||(this.wasWrapped=!0),this.$container=e.length?e:t(this.options.container).wrapInner(this.$element),this.$container.addClass(this.options.containerClass),this.$element.addClass(this.options.stickyClass).attr({"data-resize":i}),this.scrollCount=this.options.checkEvery,this.isStuck=!1,t(window).one("load.zf.sticky",function(){""!==n.options.anchor?n.$anchor=t("#"+n.options.anchor):n._parsePoints(),n._setSizes(function(){n._calc(!1)}),n._events(i.split("-").reverse().join("-"))})}},{key:"_parsePoints",value:function(){var e=this.options.topAnchor,i=this.options.btmAnchor,n=[e,i],s={};if(e&&i)for(var o=0,a=n.length;o<a&&n[o];o++){var r;if("number"==typeof n[o])r=n[o];else{var l=n[o].split(":"),d=t("#"+l[0]);r=d.offset().top,l[1]&&"bottom"===l[1].toLowerCase()&&(r+=d[0].getBoundingClientRect().height)}s[o]=r}else s={0:1,1:document.documentElement.scrollHeight};this.points=s}},{key:"_events",value:function(e){var i=this,n=this.scrollListener="scroll.zf."+e;this.isOn||(this.canStick&&(this.isOn=!0,t(window).off(n).on(n,function(t){0===i.scrollCount?(i.scrollCount=i.options.checkEvery,i._setSizes(function(){i._calc(!1,window.pageYOffset)})):(i.scrollCount--,i._calc(!1,window.pageYOffset))})),this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger",function(t,s){i._setSizes(function(){i._calc(!1),i.canStick?i.isOn||i._events(e):i.isOn&&i._pauseListeners(n)})}))}},{key:"_pauseListeners",value:function(e){this.isOn=!1,t(window).off(e),this.$element.trigger("pause.zf.sticky")}},{key:"_calc",value:function(t,e){return t&&this._setSizes(),this.canStick?(e||(e=window.pageYOffset),void(e>=this.topPoint?e<=this.bottomPoint?this.isStuck||this._setSticky():this.isStuck&&this._removeSticky(!1):this.isStuck&&this._removeSticky(!0))):(this.isStuck&&this._removeSticky(!0),!1)}},{key:"_setSticky",value:function(){var t=this.options.stickTo,e="top"===t?"marginTop":"marginBottom",i="top"===t?"bottom":"top",n={};n[e]=this.options[e]+"em",n[t]=0,n[i]="auto",n.left=this.$container.offset().left+parseInt(window.getComputedStyle(this.$container[0])["padding-left"],10),this.isStuck=!0,this.$element.removeClass("is-anchored is-at-"+i).addClass("is-stuck is-at-"+t).css(n).trigger("sticky.zf.stuckto:"+t)}},{key:"_removeSticky",value:function(t){var e=this.options.stickTo,i="top"===e,n={},s=(this.points?this.points[1]-this.points[0]:this.anchorHeight)-this.elemHeight,o=i?"marginTop":"marginBottom",a=i?"bottom":"top",r=t?"top":"bottom";n[o]=0,t&&!i||i&&!t?(n[e]=s,n[a]=0):(n[e]=0,n[a]=s),n.left="",this.isStuck=!1,this.$element.removeClass("is-stuck is-at-"+e).addClass("is-anchored is-at-"+r).css(n).trigger("sticky.zf.unstuckfrom:"+r)}},{key:"_setSizes",value:function(t){this.canStick=Foundation.MediaQuery.atLeast(this.options.stickyOn),this.canStick||t();var e=this.$container[0].getBoundingClientRect().width,i=window.getComputedStyle(this.$container[0]),n=parseInt(i["padding-right"],10);this.$anchor&&this.$anchor.length?this.anchorHeight=this.$anchor[0].getBoundingClientRect().height:this._parsePoints(),this.$element.css({"max-width":e-n+"px"});var s=this.$element[0].getBoundingClientRect().height||this.containerHeight;this.containerHeight=s,this.$container.css({height:s}),this.elemHeight=s,this.isStuck&&this.$element.css({left:this.$container.offset().left+parseInt(i["padding-left"],10)}),this._setBreakPoints(s,function(){t&&t()})}},{key:"_setBreakPoints",value:function(t,i){if(!this.canStick){if(!i)return!1;i()}var n=e(this.options.marginTop),s=e(this.options.marginBottom),o=this.points?this.points[0]:this.$anchor.offset().top,a=this.points?this.points[1]:o+this.anchorHeight,r=window.innerHeight;"top"===this.options.stickTo?(o-=n,a-=t+n):"bottom"===this.options.stickTo&&(o-=r-(t+s),a-=r-s),this.topPoint=o,this.bottomPoint=a,i&&i()}},{key:"destroy",value:function(){this._removeSticky(!0),this.$element.removeClass(this.options.stickyClass+" is-anchored is-at-top").css({height:"",top:"",bottom:"","max-width":""}).off("resizeme.zf.trigger"),this.$anchor.off("change.zf.sticky"),t(window).off(this.scrollListener),this.wasWrapped?this.$element.unwrap():this.$container.removeClass(this.options.containerClass).css({height:""}),Foundation.unregisterPlugin(this)}}]),i}();i.defaults={container:"<div data-sticky-container></div>",stickTo:"top",anchor:"",topAnchor:"",btmAnchor:"",marginTop:1,marginBottom:1,stickyOn:"medium",stickyClass:"sticky",containerClass:"sticky-container",checkEvery:-1},Foundation.plugin(i,"Sticky")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=i,this.options=t.extend({},e.defaults,this.$element.data(),n),this._init(),Foundation.registerPlugin(this,"Tabs"),Foundation.Keyboard.register("Tabs",{ENTER:"open",SPACE:"open",ARROW_RIGHT:"next",ARROW_UP:"previous",ARROW_DOWN:"next",ARROW_LEFT:"previous"})}return _createClass(e,[{key:"_init",value:function(){var e=this;if(this.$tabTitles=this.$element.find("."+this.options.linkClass),this.$tabContent=t('[data-tabs-content="'+this.$element[0].id+'"]'),this.$tabTitles.each(function(){var i=t(this),n=i.find("a"),s=i.hasClass("is-active"),o=n[0].hash.slice(1),a=n[0].id?n[0].id:o+"-label",r=t("#"+o);i.attr({role:"presentation"}),n.attr({role:"tab","aria-controls":o,"aria-selected":s,id:a}),r.attr({role:"tabpanel","aria-hidden":!s,"aria-labelledby":a}),s&&e.options.autoFocus&&n.focus()}),this.options.matchHeight){var i=this.$tabContent.find("img");i.length?Foundation.onImagesLoaded(i,this._setHeight.bind(this)):this._setHeight()}this._events()}},{key:"_events",value:function(){this._addKeyHandler(),this._addClickHandler(),this.options.matchHeight&&t(window).on("changed.zf.mediaquery",this._setHeight.bind(this))}},{key:"_addClickHandler",value:function(){var e=this;this.$element.off("click.zf.tabs").on("click.zf.tabs","."+this.options.linkClass,function(i){i.preventDefault(),i.stopPropagation(),t(this).hasClass("is-active")||e._handleTabChange(t(this))})}},{key:"_addKeyHandler",value:function(){var e=this;e.$element.find("li:first-of-type"),e.$element.find("li:last-of-type");this.$tabTitles.off("keydown.zf.tabs").on("keydown.zf.tabs",function(i){if(9!==i.which){i.stopPropagation(),i.preventDefault();var n,s,o=t(this),a=o.parent("ul").children("li");a.each(function(i){if(t(this).is(o))return void(e.options.wrapOnKeys?(n=0===i?a.last():a.eq(i-1),s=i===a.length-1?a.first():a.eq(i+1)):(n=a.eq(Math.max(0,i-1)),s=a.eq(Math.min(i+1,a.length-1))))}),Foundation.Keyboard.handleKey(i,"Tabs",{open:function(){o.find('[role="tab"]').focus(),e._handleTabChange(o)},previous:function(){n.find('[role="tab"]').focus(),e._handleTabChange(n)},next:function(){s.find('[role="tab"]').focus(),e._handleTabChange(s)}})}})}},{key:"_handleTabChange",value:function(e){var i=e.find('[role="tab"]'),n=i[0].hash,s=this.$tabContent.find(n),o=this.$element.find("."+this.options.linkClass+".is-active").removeClass("is-active").find('[role="tab"]').attr({"aria-selected":"false"});t("#"+o.attr("aria-controls")).removeClass("is-active").attr({"aria-hidden":"true"}),e.addClass("is-active"),i.attr({"aria-selected":"true"}),s.addClass("is-active").attr({"aria-hidden":"false"}),this.$element.trigger("change.zf.tabs",[e])}},{key:"selectTab",value:function(t){var e;e="object"===("undefined"==typeof t?"undefined":_typeof(t))?t[0].id:t,e.indexOf("#")<0&&(e="#"+e);var i=this.$tabTitles.find('[href="'+e+'"]').parent("."+this.options.linkClass);this._handleTabChange(i)}},{key:"_setHeight",value:function(){var e=0;this.$tabContent.find("."+this.options.panelClass).css("height","").each(function(){var i=t(this),n=i.hasClass("is-active");n||i.css({visibility:"hidden",display:"block"});var s=this.getBoundingClientRect().height;n||i.css({visibility:"",display:""}),e=s>e?s:e}).css("height",e+"px")}},{key:"destroy",value:function(){this.$element.find("."+this.options.linkClass).off(".zf.tabs").hide().end().find("."+this.options.panelClass).hide(),this.options.matchHeight&&t(window).off("changed.zf.mediaquery"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={autoFocus:!1,wrapOnKeys:!0,matchHeight:!1,linkClass:"tabs-title",panelClass:"tabs-panel"},Foundation.plugin(e,"Tabs")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=i,this.options=t.extend({},e.defaults,i.data(),n),this.className="",this._init(),this._events(),Foundation.registerPlugin(this,"Toggler")}return _createClass(e,[{key:"_init",value:function(){var e;this.options.animate?(e=this.options.animate.split(" "),this.animationIn=e[0],this.animationOut=e[1]||null):(e=this.$element.data("toggler"),this.className="."===e[0]?e.slice(1):e);var i=this.$element[0].id;t('[data-open="'+i+'"], [data-close="'+i+'"], [data-toggle="'+i+'"]').attr("aria-controls",i),this.$element.attr("aria-expanded",!this.$element.is(":hidden"))}},{key:"_events",value:function(){this.$element.off("toggle.zf.trigger").on("toggle.zf.trigger",this.toggle.bind(this))}},{key:"toggle",value:function(){this[this.options.animate?"_toggleAnimate":"_toggleClass"]()}},{key:"_toggleClass",value:function(){this.$element.toggleClass(this.className);var t=this.$element.hasClass(this.className);t?this.$element.trigger("on.zf.toggler"):this.$element.trigger("off.zf.toggler"),this._updateARIA(t)}},{key:"_toggleAnimate",value:function(){var t=this;this.$element.is(":hidden")?Foundation.Motion.animateIn(this.$element,this.animationIn,function(){this.trigger("on.zf.toggler"),t._updateARIA(!0)}):Foundation.Motion.animateOut(this.$element,this.animationOut,function(){this.trigger("off.zf.toggler"),t._updateARIA(!1)})}},{key:"_updateARIA",value:function(t){this.$element.attr("aria-expanded",!!t)}},{key:"destroy",value:function(){this.$element.off(".zf.toggler"),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={animate:!1},Foundation.plugin(e,"Toggler")}(jQuery),!function(t){var e=function(){function e(i,n){_classCallCheck(this,e),this.$element=i,this.options=t.extend({},e.defaults,this.$element.data(),n),this.isActive=!1,this.isClick=!1,this._init(),Foundation.registerPlugin(this,"Tooltip")}return _createClass(e,[{key:"_init",value:function(){var e=this.$element.attr("aria-describedby")||Foundation.GetYoDigits(6,"tooltip");this.options.positionClass=this._getPositionClass(this.$element),this.options.tipText=this.options.tipText||this.$element.attr("title"),this.template=this.options.template?t(this.options.template):this._buildTemplate(e),this.template.appendTo(document.body).text(this.options.tipText).hide(),this.$element.attr({title:"","aria-describedby":e,"data-yeti-box":e,"data-toggle":e,"data-resize":e}).addClass(this.triggerClass),this.usedPositions=[],this.counter=4,this.classChanged=!1,this._events()}},{key:"_getPositionClass",value:function(t){if(!t)return"";var e=t[0].className.match(/\b(top|left|right)\b/g);return e=e?e[0]:""}},{key:"_buildTemplate",value:function(e){var i=(this.options.tooltipClass+" "+this.options.positionClass+" "+this.options.templateClasses).trim(),n=t("<div></div>").addClass(i).attr({role:"tooltip","aria-hidden":!0,"data-is-active":!1,"data-is-focus":!1,id:e});return n}},{key:"_reposition",value:function(t){this.usedPositions.push(t?t:"bottom"),!t&&this.usedPositions.indexOf("top")<0?this.template.addClass("top"):"top"===t&&this.usedPositions.indexOf("bottom")<0?this.template.removeClass(t):"left"===t&&this.usedPositions.indexOf("right")<0?this.template.removeClass(t).addClass("right"):"right"===t&&this.usedPositions.indexOf("left")<0?this.template.removeClass(t).addClass("left"):!t&&this.usedPositions.indexOf("top")>-1&&this.usedPositions.indexOf("left")<0?this.template.addClass("left"):"top"===t&&this.usedPositions.indexOf("bottom")>-1&&this.usedPositions.indexOf("left")<0?this.template.removeClass(t).addClass("left"):"left"===t&&this.usedPositions.indexOf("right")>-1&&this.usedPositions.indexOf("bottom")<0?this.template.removeClass(t):"right"===t&&this.usedPositions.indexOf("left")>-1&&this.usedPositions.indexOf("bottom")<0?this.template.removeClass(t):this.template.removeClass(t),this.classChanged=!0,this.counter--}},{key:"_setPosition",value:function(){var t=this._getPositionClass(this.template),e=Foundation.Box.GetDimensions(this.template),i=Foundation.Box.GetDimensions(this.$element),n="left"===t?"left":"right"===t?"left":"top",s="top"===n?"height":"width";"height"===s?this.options.vOffset:this.options.hOffset;if(e.width>=e.windowDims.width||!this.counter&&!Foundation.Box.ImNotTouchingYou(this.template))return this.template.offset(Foundation.Box.GetOffsets(this.template,this.$element,"center bottom",this.options.vOffset,this.options.hOffset,!0)).css({width:i.windowDims.width-2*this.options.hOffset,height:"auto"}),!1;for(this.template.offset(Foundation.Box.GetOffsets(this.template,this.$element,"center "+(t||"bottom"),this.options.vOffset,this.options.hOffset));!Foundation.Box.ImNotTouchingYou(this.template)&&this.counter;)this._reposition(t),this._setPosition()}},{key:"show",value:function(){if("all"!==this.options.showOn&&!Foundation.MediaQuery.atLeast(this.options.showOn))return!1;var t=this;this.template.css("visibility","hidden").show(),this._setPosition(),this.$element.trigger("closeme.zf.tooltip",this.template.attr("id")),this.template.attr({"data-is-active":!0,"aria-hidden":!1}),t.isActive=!0,this.template.stop().hide().css("visibility","").fadeIn(this.options.fadeInDuration,function(){}),this.$element.trigger("show.zf.tooltip")}},{key:"hide",value:function(){var t=this;this.template.stop().attr({"aria-hidden":!0,"data-is-active":!1}).fadeOut(this.options.fadeOutDuration,function(){t.isActive=!1,t.isClick=!1,t.classChanged&&(t.template.removeClass(t._getPositionClass(t.template)).addClass(t.options.positionClass),t.usedPositions=[],t.counter=4,t.classChanged=!1)}),this.$element.trigger("hide.zf.tooltip")}},{key:"_events",value:function(){var t=this,e=(this.template,!1);this.options.disableHover||this.$element.on("mouseenter.zf.tooltip",function(e){t.isActive||(t.timeout=setTimeout(function(){t.show()},t.options.hoverDelay))}).on("mouseleave.zf.tooltip",function(i){clearTimeout(t.timeout),(!e||!t.isClick&&t.options.clickOpen)&&t.hide()}),this.options.clickOpen&&this.$element.on("mousedown.zf.tooltip",function(e){e.stopImmediatePropagation(),t.isClick?t.hide():(t.isClick=!0,!t.options.disableHover&&t.$element.attr("tabindex")||t.isActive||t.show())}),this.options.disableForTouch||this.$element.on("tap.zf.tooltip touchend.zf.tooltip",function(e){t.isActive?t.hide():t.show()}),this.$element.on({"close.zf.trigger":this.hide.bind(this)}),this.$element.on("focus.zf.tooltip",function(i){return e=!0,!t.isClick&&void t.show()}).on("focusout.zf.tooltip",function(i){e=!1,t.isClick=!1,t.hide()}).on("resizeme.zf.trigger",function(){t.isActive&&t._setPosition()})}},{key:"toggle",value:function(){this.isActive?this.hide():this.show()}},{key:"destroy",value:function(){this.$element.attr("title",this.template.text()).off(".zf.trigger .zf.tootip").removeAttr("aria-describedby").removeAttr("data-yeti-box").removeAttr("data-toggle").removeAttr("data-resize"),this.template.remove(),Foundation.unregisterPlugin(this)}}]),e}();e.defaults={disableForTouch:!1,hoverDelay:200,fadeInDuration:150,fadeOutDuration:150,disableHover:!1,templateClasses:"",tooltipClass:"tooltip",triggerClass:"has-tip",showOn:"small",template:"",tipText:"",touchCloseText:"Tap to close.",clickOpen:!0,positionClass:"",vOffset:10,hOffset:12},Foundation.plugin(e,"Tooltip")}(jQuery);
>>>>>>> 5a69c8315e2c22b72aebfba30e120d8848ed21e3
