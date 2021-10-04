 
function t142_checkSize(recid){
  var el=$("#rec"+recid).find(".t142__submit");
  if(el.length){
    var btnheight = el.height() + 5;
    var textheight = el[0].scrollHeight;
    if (btnheight < textheight) {
      var btntext = el.text();
      el.addClass("t142__submit-overflowed");
    }
  }
} 
function t270_scroll(hash, offset, speed) {
    if (hash.indexOf('#!/tproduct/') !== -1 || hash.indexOf('#!/tab/') !== -1) {
        return true;
    }

    var root = $('html, body');
    var target = "";

    if (speed === undefined) {
        speed = 400;
    }

    try {
        target = $(hash);
    } catch (event) {
        console.log("Exception t270: " + event.message);
        return true;
    }
    if (target.length === 0) {
        target = $('a[name="' + hash.substr(1) + '"]');
        if (target.length === 0) {
            return true;
        }
    }

    var isHistoryChangeAllowed = window.location.hash !== hash;
    var complete = function () {
        if (!isHistoryChangeAllowed) {
            return;
        }

        if (history.pushState) {
            history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }

        isHistoryChangeAllowed = false;
    }

    var dontChangeHistory = Boolean($('.t270').attr('data-history-disabled'));
    if (dontChangeHistory) {
        complete = function () {};
    }

    root.animate({
        scrollTop: target.offset().top - offset
    }, speed, complete);

    return true;
} 
function t393_appearMenu(recid) {
    var window_width=$(window).width();
    if(window_width>980){
         $(".t393").each(function() {
                var el=$(this);
                var appearoffset=el.attr("data-appearoffset");
                var hideoffset=el.attr("data-hideoffset");
                if(appearoffset!=""){
                        if(appearoffset.indexOf('vh') > -1){
                            appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                        }

                        appearoffset=parseInt(appearoffset, 10);

                        if ($(window).scrollTop() >= appearoffset) {
                          if(el.css('visibility') == 'hidden'){
                              el.finish();
                              el.css("visibility","visible");
                              el.animate({"opacity": "1"}, 300,function() {
                              });       
                          }
                        }else{
                          el.stop();
                          el.css("visibility","hidden");
                        }
                }

                if(hideoffset!=""){
                        if(hideoffset.indexOf('vh') > -1){
                            hideoffset = Math.floor((window.innerHeight * (parseInt(hideoffset) / 100)));
                        }

                        hideoffset=parseInt(hideoffset, 10);

                        if ($(window).scrollTop()+$(window).height() >= $(document).height() - hideoffset) {
                          if(el.css('visibility') != 'hidden'){
                              el.finish();
                              el.css("visibility","hidden");
                          }
                        }else{
                          if (appearoffset!="") {
                              if($(window).scrollTop() >= appearoffset){
                                el.stop();
                                el.css("visibility","visible");
                              }
                          }else{
                              el.stop();
                              el.css("visibility","visible");
                          }
                        }
                }
         });
    }
}

 

function t396_init(recid){var data='';var res=t396_detectResolution();var ab=$('#rec'+recid).find('.t396__artboard');window.tn_window_width=$(window).width();window.tn_scale_factor = Math.round((window.tn_window_width / res)*100)/100;t396_initTNobj();t396_switchResolution(res);t396_updateTNobj();t396_artboard_build(data,recid);$( window ).resize(function () {tn_console('>>>> t396: Window on Resize event >>>>');t396_waitForFinalEvent(function(){if($isMobile){var ww=$(window).width();if(ww!=window.tn_window_width){t396_doResize(recid);}}else{t396_doResize(recid);}}, 500, 'resizeruniqueid'+recid);});$(window).on("orientationchange",function(){tn_console('>>>> t396: Orient change event >>>>');t396_waitForFinalEvent(function(){t396_doResize(recid);}, 600, 'orientationuniqueid'+recid);});$( window ).on('load', function() {t396_allelems__renderView(ab);if (typeof t_lazyload_update === 'function' && ab.css('overflow') === 'auto') {ab.bind('scroll', t_throttle(function() {if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {t_onFuncLoad('t_lazyload_update', function () {t_lazyload_update();});}}, 500));}if (window.location.hash !== '' && ab.css('overflow') === 'visible') {ab.css('overflow', 'hidden');setTimeout( function() { ab.css('overflow', 'visible');}, 1);}});var rec = $('#rec' + recid);if (rec.attr('data-connect-with-tab') == 'yes') {rec.find('.t396').bind('displayChanged', function() {var ab = rec.find('.t396__artboard');t396_allelems__renderView(ab);});}/* fix for disappearing elements in safari */if (isSafari) rec.find('.t396').addClass('t396_safari');var isScaled = t396_ab__getFieldValue(ab, 'upscale') === 'window';var isTildaModeEdit = $('#allrecords').attr('data-tilda-mode') == 'edit';if (isScaled && !isTildaModeEdit) t396_scaleBlock(recid);}function t396_getRotateValue(matrix) {console.log(matrix);var values = matrix.split('(')[1].split(')')[0].split(',');var a = values[0];var b = values[1];var c = values[2];var d = values[3];var scale = Math.sqrt(a*a + b*b);var sin = b/scale;var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));return angle;}function t396_scaleBlock(recid) {var isFirefox = navigator.userAgent.search("Firefox") !== -1;var res = t396_detectResolution();var rec = $('#rec' + recid);var $ab = rec.find('.t396__artboard');var abWidth = $ab.width();var updatedBlockHeight = Math.floor($ab.height() * window.tn_scale_factor);var ab_height_vh = t396_ab__getFieldValue($ab,'height_vh');window.tn_scale_offset = (abWidth * window.tn_scale_factor - abWidth) / 2;if (ab_height_vh != '') {var ab_min_height = t396_ab__getFieldValue($ab,'height');var ab_max_height = t396_ab__getHeight($ab);var scaledMinHeight = ab_min_height * window.tn_scale_factor;updatedBlockHeight = (scaledMinHeight >= ab_max_height) ? scaledMinHeight : ab_max_height;}$ab.addClass('t396__artboard_scale');var scaleStr = isFirefox ? ('transform: scale(' + window.tn_scale_factor + ') !important;') : ('zoom: ' + window.tn_scale_factor + ';');var styleStr ='<style class="t396__scale-style">' +'#rec' + recid + ' { overflow: visible !important; }' +'#rec' + recid + ' .t396__carrier,' +'#rec' + recid + ' .t396__filter,' +'#rec' + recid + ' .t396__artboard {' +'height: ' + updatedBlockHeight + 'px !important;' +'width: 100vw !important;' +'max-width: 100%;' +'}' +'<style>';$ab.append(styleStr);rec.find('.t396__elem').each(function() {var $el = $(this);var containerProp = t396_elem__getFieldValue($el, 'container');if (containerProp === 'grid') {if (isFirefox) {var scaleProp = 'scale(' + window.tn_scale_factor + ')';var transformMatrix = $el.find('.tn-atom').css('transform');var rotatation = (transformMatrix && transformMatrix !== 'none') ? t396_getRotateValue(transformMatrix) : null;if (rotatation) {$el.find('.tn-atom').css('transform-origin', 'center');scaleProp = scaleProp + ' rotate(' + rotatation + 'deg)';}$el.find('.tn-atom').css('transform', scaleProp);} else {$el.css('zoom', window.tn_scale_factor);if ($el.attr('data-elem-type') === 'text' && res < 1200) $el.find('.tn-atom').css('-webkit-text-size-adjust', 'auto');$el.find('.tn-atom').css('transform-origin', 'center');}}});} function t396_doResize(recid){var isFirefox = navigator.userAgent.search("Firefox") !== -1;var ww;var rec = $('#rec'+recid);if($isMobile){ww=$(window).width();} else {ww=window.innerWidth;}var res=t396_detectResolution();rec.find('.t396__scale-style').remove();if (!isFirefox) {rec.find('.t396__elem').css('zoom', '');rec.find('.t396__elem .tn-atom').css('transform-origin', '');}var ab = rec.find('.t396__artboard');var abWidth = ab.width();window.tn_window_width=ww;window.tn_scale_factor = Math.round((window.tn_window_width / res)*100)/100;window.tn_scale_offset = (abWidth * window.tn_scale_factor - abWidth) / 2;t396_switchResolution(res);t396_updateTNobj();t396_ab__renderView(ab);t396_allelems__renderView(ab);var isTildaModeEdit = $('#allrecords').attr('data-tilda-mode') == 'edit';var isScaled = t396_ab__getFieldValue(ab, 'upscale') === 'window';if (isScaled && !isTildaModeEdit) t396_scaleBlock(recid);}function t396_detectResolution(){var ww;if($isMobile){ww=$(window).width();} else {ww=window.innerWidth;}var res;res=1200;if(ww<1200){res=960;}if(ww<960){res=640;}if(ww<640){res=480;}if(ww<480){res=320;}return(res);}function t396_initTNobj(){tn_console('func: initTNobj');window.tn={};window.tn.canvas_min_sizes = ["320","480","640","960","1200"];window.tn.canvas_max_sizes = ["480","640","960","1200",""];window.tn.ab_fields = ["height","width","bgcolor","bgimg","bgattachment","bgposition","filteropacity","filtercolor","filteropacity2","filtercolor2","height_vh","valign"];}function t396_updateTNobj(){tn_console('func: updateTNobj');if(typeof window.zero_window_width_hook!='undefined' && window.zero_window_width_hook=='allrecords' && $('#allrecords').length){window.tn.window_width = parseInt($('#allrecords').width());}else{window.tn.window_width = parseInt($(window).width());}/* window.tn.window_width = parseInt($(window).width()); */if($isMobile){window.tn.window_height = parseInt($(window).height());} else {window.tn.window_height = parseInt(window.innerHeight);}if(window.tn.curResolution==1200){window.tn.canvas_min_width = 1200;window.tn.canvas_max_width = window.tn.window_width;}if(window.tn.curResolution==960){window.tn.canvas_min_width = 960;window.tn.canvas_max_width = 1200;}if(window.tn.curResolution==640){window.tn.canvas_min_width = 640;window.tn.canvas_max_width = 960;}if(window.tn.curResolution==480){window.tn.canvas_min_width = 480;window.tn.canvas_max_width = 640;}if(window.tn.curResolution==320){window.tn.canvas_min_width = 320;window.tn.canvas_max_width = 480;}window.tn.grid_width = window.tn.canvas_min_width;window.tn.grid_offset_left = parseFloat( (window.tn.window_width-window.tn.grid_width)/2 );}var t396_waitForFinalEvent = (function () {var timers = {};return function (callback, ms, uniqueId) {if (!uniqueId) {uniqueId = "Don't call this twice without a uniqueId";}if (timers[uniqueId]) {clearTimeout (timers[uniqueId]);}timers[uniqueId] = setTimeout(callback, ms);};})();function t396_switchResolution(res,resmax){tn_console('func: switchResolution');if(typeof resmax=='undefined'){if(res==1200)resmax='';if(res==960)resmax=1200;if(res==640)resmax=960;if(res==480)resmax=640;if(res==320)resmax=480;}window.tn.curResolution=res;window.tn.curResolution_max=resmax;}function t396_artboard_build(data,recid){tn_console('func: t396_artboard_build. Recid:'+recid);tn_console(data);/* set style to artboard */var ab=$('#rec'+recid).find('.t396__artboard');t396_ab__renderView(ab);/* create elements */ab.find('.tn-elem').each(function() {var item=$(this);if(item.attr('data-elem-type')=='text'){t396_addText(ab,item);}if(item.attr('data-elem-type')=='image'){t396_addImage(ab,item);}if(item.attr('data-elem-type')=='shape'){t396_addShape(ab,item);}if(item.attr('data-elem-type')=='button'){t396_addButton(ab,item);}if(item.attr('data-elem-type')=='video'){t396_addVideo(ab,item);}if(item.attr('data-elem-type')=='html'){t396_addHtml(ab,item);}if(item.attr('data-elem-type')=='tooltip'){t396_addTooltip(ab,item);}if(item.attr('data-elem-type')=='form'){t396_addForm(ab,item);}if(item.attr('data-elem-type')=='gallery'){t396_addGallery(ab,item);}});$('#rec'+recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');if(ab.attr('data-artboard-ovrflw')=='visible'){$('#allrecords').css('overflow','hidden');}if($isMobile){$('#rec'+recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>');}}function t396_ab__renderView(ab){var fields = window.tn.ab_fields;for ( var i = 0; i < fields.length; i++ ) {t396_ab__renderViewOneField(ab,fields[i]);}var ab_min_height=t396_ab__getFieldValue(ab,'height');var ab_max_height=t396_ab__getHeight(ab);var isTildaModeEdit = $('#allrecords').attr('data-tilda-mode') == 'edit';var isScaled = t396_ab__getFieldValue(ab, 'upscale') === 'window';var ab_height_vh = t396_ab__getFieldValue(ab,'height_vh');if (isScaled && !isTildaModeEdit && ab_height_vh != '') var scaledMinHeight = parseInt(ab_min_height, 10) * window.tn_scale_factor;var offset_top=0;if(ab_min_height == ab_max_height || (scaledMinHeight && scaledMinHeight >= ab_max_height)) {offset_top=0;}else{var ab_valign=t396_ab__getFieldValue(ab,'valign');if(ab_valign=='top'){offset_top=0;}else if(ab_valign=='center'){if (scaledMinHeight) {offset_top=parseFloat( (ab_max_height-scaledMinHeight)/2 ).toFixed(1);} else {offset_top=parseFloat( (ab_max_height-ab_min_height)/2 ).toFixed(1);}}else if(ab_valign=='bottom'){if (scaledMinHeight) {offset_top=parseFloat( (ab_max_height-scaledMinHeight) ).toFixed(1);} else {offset_top=parseFloat( (ab_max_height-ab_min_height) ).toFixed(1);}}else if(ab_valign=='stretch'){offset_top=0;ab_min_height=ab_max_height;}else{offset_top=0;}}ab.attr('data-artboard-proxy-min-offset-top',offset_top);ab.attr('data-artboard-proxy-min-height',ab_min_height);ab.attr('data-artboard-proxy-max-height',ab_max_height);var filter = ab.find('.t396__filter');var carrier = ab.find('.t396__carrier');var abHeightVh = t396_ab__getFieldValue(ab,'height_vh');abHeightVh = parseFloat(abHeightVh);if (window.isMobile && abHeightVh) {var height = document.documentElement.clientHeight * parseFloat( abHeightVh/100 );ab.css('height', height);filter.css('height', height);carrier.css('height', height);}}function t396_addText(ab,el){tn_console('func: addText');/* add data atributes */var fields_str='top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addImage(ab,el){tn_console('func: addImage');/* add data atributes */var fields_str='img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);el.find('img').on("load", function() {t396_elem__renderViewOneField(el,'top');if(typeof $(this).attr('src')!='undefined' && $(this).attr('src')!=''){setTimeout( function() { t396_elem__renderViewOneField(el,'top');} , 2000);} }).each(function() {if(this.complete) $(this).trigger('load');}); el.find('img').on('tuwidget_done', function(e, file) { t396_elem__renderViewOneField(el,'top');});}function t396_addShape(ab,el){tn_console('func: addShape');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addButton(ab,el){tn_console('func: addButton');/* add data atributes */var fields_str='top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);return(el);}function t396_addVideo(ab,el){tn_console('func: addVideo');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);var viel=el.find('.tn-atom__videoiframe');var viatel=el.find('.tn-atom');viatel.css('background-color','#000');var vihascover=viatel.attr('data-atom-video-has-cover');if(typeof vihascover=='undefined'){vihascover='';}if(vihascover=='y'){viatel.click(function() {var viifel=viel.find('iframe');if(viifel.length){var foo=viifel.attr('data-original');viifel.attr('src',foo);}viatel.css('background-image','none');viatel.find('.tn-atom__video-play-link').css('display','none');});}var autoplay=t396_elem__getFieldValue(el,'autoplay');var showinfo=t396_elem__getFieldValue(el,'showinfo');var loop=t396_elem__getFieldValue(el,'loop');var mute=t396_elem__getFieldValue(el,'mute');var startsec=t396_elem__getFieldValue(el,'startsec');var endsec=t396_elem__getFieldValue(el,'endsec');var tmode=$('#allrecords').attr('data-tilda-mode');var url='';var viyid=viel.attr('data-youtubeid');if(typeof viyid!='undefined' && viyid!=''){ url='//www.youtube.com/embed/'; url+=viyid+'?rel=0&fmt=18&html5=1'; url+='&showinfo='+(showinfo=='y'?'1':'0'); if(loop=='y'){url+='&loop=1&playlist='+viyid;} if(startsec>0){url+='&start='+startsec;} if(endsec>0){url+='&end='+endsec;} if(mute=='y'){url+='&mute=1';} if(vihascover=='y'){ url+='&autoplay=1'; viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); }else{ if(typeof tmode!='undefined' && tmode=='edit'){}else{ if(autoplay=='y'){url+='&autoplay=1';} } if(window.lazy=='y'){ viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>'); el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});<\/script>'); }else{ viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); } }}var vivid=viel.attr('data-vimeoid');if(typeof vivid!='undefined' && vivid>0){url='//player.vimeo.com/video/';url+=vivid+'?color=ffffff&badge=0';if(showinfo=='y'){url+='&title=1&byline=1&portrait=1';}else{url+='&title=0&byline=0&portrait=0';}if(loop=='y'){url+='&loop=1';}if(mute=='y'){url+='&muted=1';}if(vihascover=='y'){url+='&autoplay=1';viel.html('<iframe data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}else{if(typeof tmode!='undefined' && tmode=='edit'){}else{if(autoplay=='y'){url+='&autoplay=1';}}if(window.lazy=='y'){viel.html('<iframe class="t-iframe" data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});<\/script>');}else{viel.html('<iframe src="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}}}}function t396_addHtml(ab,el){tn_console('func: addHtml');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addTooltip(ab, el) {tn_console('func: addTooltip');var fields_str = 'width,height,top,left,';fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';var fields = fields_str.split(',');el.attr('data-fields', fields_str);t396_elem__renderView(el);var pinEl = el.find('.tn-atom__pin');var tipEl = el.find('.tn-atom__tip');var tipopen = el.attr('data-field-tipopen-value');if (isMobile || (typeof tipopen!='undefined' && tipopen=='click')) {t396_setUpTooltip_mobile(el,pinEl,tipEl);} else {t396_setUpTooltip_desktop(el,pinEl,tipEl);}setTimeout(function() {$('.tn-atom__tip-img').each(function() {var foo = $(this).attr('data-tipimg-original');if (typeof foo != 'undefined' && foo != '') {$(this).attr('src', foo);}})}, 3000);}function t396_addForm(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,top,left,';fields_str+='inputs,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addGallery(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_elem__setFieldValue(el,prop,val,flag_render,flag_updateui,res){if(res=='')res=window.tn.curResolution;if(res<1200 && prop!='zindex'){el.attr('data-field-'+prop+'-res-'+res+'-value',val);}else{el.attr('data-field-'+prop+'-value',val);}if(flag_render=='render')elem__renderViewOneField(el,prop);if(flag_updateui=='updateui')panelSettings__updateUi(el,prop,val);}function t396_elem__getFieldValue(el,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}if(res==640){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}if(res==480){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}if(res==320){r=el.attr('data-field-'+prop+'-res-320-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}}}else{r=el.attr('data-field-'+prop+'-value');}return(r);}function t396_elem__renderView(el){tn_console('func: elem__renderView');var fields=el.attr('data-fields');if(! fields) {return false;}fields = fields.split(',');/* set to element value of every fieldvia css */for ( var i = 0; i < fields.length; i++ ) {t396_elem__renderViewOneField(el,fields[i]);}}function t396_elem__renderViewOneField(el,field){var value=t396_elem__getFieldValue(el,field);if(field=='left'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('left',parseFloat(value).toFixed(1)+'px');}if(field=='top'){var ab = el.parents('.t396__artboard');value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('top',parseFloat(value).toFixed(1)+'px');}if(field=='width'){value = t396_elem__getWidth(el,value);el.css('width',parseFloat(value).toFixed(1)+'px');var eltype=el.attr('data-elem-type');if(eltype=='tooltip'){var pinSvgIcon = el.find('.tn-atom__pin-icon');/*add width to svg nearest parent to fix InternerExplorer problem*/if (pinSvgIcon.length > 0) {var pinSize = parseFloat(value).toFixed(1) + 'px';pinSvgIcon.css({'width': pinSize, 'height': pinSize});}el.css('height',parseInt(value).toFixed(1)+'px');}if(eltype=='gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('width', parseFloat(value).toFixed(1)+'px');el.find('.t-slds__main').css('width', parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('width', parseFloat(value).toFixed(1)+'px');}}if(field=='height'){var eltype = el.attr('data-elem-type');if (eltype == 'tooltip') {return;}value=t396_elem__getHeight(el,value);el.css('height', parseFloat(value).toFixed(1)+'px');if (eltype === 'gallery') {var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');if (borderStyle=='none' || typeof borderStyle=='undefined' || typeof borderWidth=='undefined' || borderWidth=='') borderWidth=0;value = value*1 - borderWidth*2;el.css('height',parseFloat(value).toFixed(1)+'px');el.find('.tn-atom__slds-img').css('height', parseFloat(value).toFixed(1) + 'px');el.find('.t-slds__main').css('height', parseFloat(value).toFixed(1) + 'px');}}if(field=='container'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='width' || field=='height' || field=='fontsize' || field=='fontfamily' || field=='letterspacing' || field=='fontweight' || field=='img'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='inputs'){value=el.find('.tn-atom__inputs-textarea').val();try {t_zeroForms__renderForm(el,value);} catch (err) {}}}function t396_elem__convertPosition__Local__toAbsolute(el,field,value){var ab = el.parents('.t396__artboard');var blockVAlign = t396_ab__getFieldValue(ab, 'valign');var isScaled = t396_ab__getFieldValue(ab, 'upscale') === 'window';var isTildaModeEdit = $('#allrecords').attr('data-tilda-mode') == 'edit';var isFirefox = navigator.userAgent.search("Firefox") !== -1;var isScaledFirefox = !isTildaModeEdit && isScaled && isFirefox;var isScaledNotFirefox = !isTildaModeEdit && isScaled && !isFirefox;var el_axisy = t396_elem__getFieldValue(el,'axisy');value = parseInt(value);if(field=='left'){var el_container, offset_left, el_container_width, el_width;var container = t396_elem__getFieldValue(el, 'container');if (container === 'grid') {el_container = 'grid';offset_left = window.tn.grid_offset_left;el_container_width = window.tn.grid_width;} else {el_container = 'window';offset_left = 0;el_container_width = window.tn.window_width;}/* fluid or not*/var el_leftunits = t396_elem__getFieldValue(el,'leftunits');if (el_leftunits === '%') {value = t396_roundFloat(el_container_width * value / 100);}/*with scale logic*/if (!isTildaModeEdit && isScaled) {if (container === 'grid' && isFirefox) value = value * window.tn_scale_factor;} else {value = offset_left + value;}var el_axisx = t396_elem__getFieldValue(el, 'axisx');if (el_axisx === 'center') {el_width = t396_elem__getWidth(el);if (isScaledFirefox && el_container !== 'window') {el_container_width *= window.tn_scale_factor;el_width *= window.tn_scale_factor;}value = el_container_width/2 - el_width/2 + value;}if (el_axisx === 'right') {el_width = t396_elem__getWidth(el);if (isScaledFirefox && el_container !== 'window') {el_container_width *= window.tn_scale_factor;el_width *= window.tn_scale_factor;}value = el_container_width - el_width + value;}}if (field === 'top') {var el_container, offset_top, el_container_height, el_height;var ab = el.parent();var container = t396_elem__getFieldValue(el, 'container');if (container === 'grid') {el_container = 'grid';offset_top = parseFloat(ab.attr('data-artboard-proxy-min-offset-top'));el_container_height = parseFloat(ab.attr('data-artboard-proxy-min-height'));} else {el_container = 'window';offset_top = 0;el_container_height = parseFloat(ab.attr('data-artboard-proxy-max-height'));}/* fluid or not*/var el_topunits = t396_elem__getFieldValue(el, 'topunits');if (el_topunits === '%') {value = (el_container_height * (value/100));}if (isScaledFirefox && el_container !== 'window') {value *= window.tn_scale_factor;}if (isScaledNotFirefox && el_container !== 'window') {offset_top = blockVAlign === 'stretch' ? 0 : (offset_top / window.tn_scale_factor);}value = offset_top + value;var ab_height_vh = t396_ab__getFieldValue(ab,'height_vh');var ab_min_height = t396_ab__getFieldValue(ab,'height');var ab_max_height = t396_ab__getHeight(ab);if (isScaled && !isTildaModeEdit && ab_height_vh != '') {var scaledMinHeight = parseInt(ab_min_height, 10) * window.tn_scale_factor;}if (el_axisy === 'center') {el_height = t396_elem__getHeight(el);if (el.attr('data-elem-type') === 'image') {el_width = t396_elem__getWidth(el);var fileWidth = t396_elem__getFieldValue(el,'filewidth');var fileHeight = t396_elem__getFieldValue(el,'fileheight');if (fileWidth && fileHeight) {var ratio = parseInt(fileWidth) / parseInt(fileHeight);el_height = el_width / ratio;}}if (isScaledFirefox && el_container !== 'window') {if (blockVAlign !== 'stretch') {el_container_height = el_container_height * window.tn_scale_factor} else {if (scaledMinHeight) {el_container_height = scaledMinHeight > ab_max_height ? scaledMinHeight : ab_max_height;} else {el_container_height = ab.height();}}el_height *= window.tn_scale_factor;}if (!isTildaModeEdit && isScaled && !isFirefox && el_container !== 'window' && blockVAlign === 'stretch') {if (scaledMinHeight) {el_container_height = scaledMinHeight > ab_max_height ? scaledMinHeight : ab_max_height;} else {el_container_height = ab.height();}el_container_height = el_container_height / window.tn_scale_factor}value = el_container_height/2 - el_height/2 + value;}if (el_axisy === 'bottom') {el_height = t396_elem__getHeight(el);if (el.attr('data-elem-type') === 'image') {el_width = t396_elem__getWidth(el);var fileWidth = t396_elem__getFieldValue(el,'filewidth');var fileHeight = t396_elem__getFieldValue(el,'fileheight');if (fileWidth && fileHeight) {var ratio = parseInt(fileWidth) / parseInt(fileHeight);el_height = el_width / ratio;}}if (isScaledFirefox && el_container !== 'window') {if (blockVAlign !== 'stretch') {el_container_height = el_container_height * window.tn_scale_factor} else {if (scaledMinHeight) {el_container_height = scaledMinHeight > ab_max_height ? scaledMinHeight : ab_max_height;} else {el_container_height = ab.height();}}el_height *= window.tn_scale_factor;}if (!isTildaModeEdit && isScaled && !isFirefox && el_container !== 'window' && blockVAlign === 'stretch') {if (scaledMinHeight) {el_container_height = scaledMinHeight > ab_max_height ? scaledMinHeight : ab_max_height;} else {el_container_height = ab.height();}el_container_height = el_container_height / window.tn_scale_factor}value = el_container_height - el_height + value;} }return(value);}function t396_ab__setFieldValue(ab,prop,val,res){/* tn_console('func: ab__setFieldValue '+prop+'='+val);*/if(res=='')res=window.tn.curResolution;if(res<1200){ab.attr('data-artboard-'+prop+'-res-'+res,val);}else{ab.attr('data-artboard-'+prop,val);}}function t396_ab__getFieldValue(ab,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}if(res==640){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}if(res==480){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}if(res==320){r=ab.attr('data-artboard-'+prop+'-res-320');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}}}else{r=ab.attr('data-artboard-'+prop);}return(r);}function t396_ab__renderViewOneField(ab,field){var value=t396_ab__getFieldValue(ab,field);}function t396_allelems__renderView(ab){tn_console('func: allelems__renderView: abid:'+ab.attr('data-artboard-recid'));ab.find(".tn-elem").each(function() {t396_elem__renderView($(this));});}function t396_ab__filterUpdate(ab){var filter=ab.find('.t396__filter');var c1=filter.attr('data-filtercolor-rgb');var c2=filter.attr('data-filtercolor2-rgb');var o1=filter.attr('data-filteropacity');var o2=filter.attr('data-filteropacity2');if((typeof c2=='undefined' || c2=='') && (typeof c1!='undefined' && c1!='')){filter.css("background-color", "rgba("+c1+","+o1+")");}else if((typeof c1=='undefined' || c1=='') && (typeof c2!='undefined' && c2!='')){filter.css("background-color", "rgba("+c2+","+o2+")");}else if(typeof c1!='undefined' && typeof c2!='undefined' && c1!='' && c2!=''){filter.css({background: "-webkit-gradient(linear, left top, left bottom, from(rgba("+c1+","+o1+")), to(rgba("+c2+","+o2+")) )" });}else{filter.css("background-color", 'transparent');}}function t396_ab__getHeight(ab, ab_height){if(typeof ab_height=='undefined')ab_height=t396_ab__getFieldValue(ab,'height');ab_height=parseFloat(ab_height);/* get Artboard height (fluid or px) */var ab_height_vh=t396_ab__getFieldValue(ab,'height_vh');if(ab_height_vh!=''){ab_height_vh=parseFloat(ab_height_vh);if(isNaN(ab_height_vh)===false){var ab_height_vh_px=parseFloat( window.tn.window_height * parseFloat(ab_height_vh/100) );if( ab_height < ab_height_vh_px ){ab_height=ab_height_vh_px;}}} return(ab_height);} function t396_hex2rgb(hexStr){/*note: hexStr should be #rrggbb */var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b];}String.prototype.t396_replaceAll = function(search, replacement) {var target = this;return target.replace(new RegExp(search, 'g'), replacement);};function t396_elem__getWidth(el,value){if(typeof value=='undefined')value=parseFloat( t396_elem__getFieldValue(el,'width') );var el_widthunits=t396_elem__getFieldValue(el,'widthunits');if(el_widthunits=='%'){var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( window.tn.window_width * parseFloat( parseInt(value)/100 ) );}else{value=parseFloat( window.tn.grid_width * parseFloat( parseInt(value)/100 ) );}}return(value);}function t396_elem__getHeight(el,value){if(typeof value=='undefined')value=t396_elem__getFieldValue(el,'height');value=parseFloat(value);if(el.attr('data-elem-type')=='shape' || el.attr('data-elem-type')=='video' || el.attr('data-elem-type')=='html' || el.attr('data-elem-type')=='gallery'){var el_heightunits=t396_elem__getFieldValue(el,'heightunits');if(el_heightunits=='%'){var ab=el.parent();var ab_min_height=parseFloat( ab.attr('data-artboard-proxy-min-height') );var ab_max_height=parseFloat( ab.attr('data-artboard-proxy-max-height') );var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( ab_max_height * parseFloat( value/100 ) );}else{value=parseFloat( ab_min_height * parseFloat( value/100 ) );}}}else if(el.attr('data-elem-type')=='button'){value = value;}else{value =parseFloat(el.innerHeight());}return(value);}function t396_roundFloat(n){n = Math.round(n * 100) / 100;return(n);}function tn_console(str){if(window.tn_comments==1)console.log(str);}function t396_setUpTooltip_desktop(el, pinEl, tipEl) {var timer;pinEl.mouseover(function() {/*if any other tooltip is waiting its timeout to be hided — hide it*/$('.tn-atom__tip_visible').each(function(){var thisTipEl = $(this).parents('.t396__elem');if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {t396_hideTooltip(thisTipEl, $(this));}});clearTimeout(timer);if (tipEl.css('display') == 'block') {return;}t396_showTooltip(el, tipEl);});pinEl.mouseout(function() {timer = setTimeout(function() {t396_hideTooltip(el, tipEl);}, 300);})}function t396_setUpTooltip_mobile(el,pinEl,tipEl) {pinEl.on('click', function(e) {if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {t396_hideTooltip(el,tipEl);} else {t396_showTooltip(el,tipEl);}});var id = el.attr("data-elem-id");$(document).click(function(e) {var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);if (isInsideTooltip) {var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");if (clickedPinId == id) {return;}}t396_hideTooltip(el,tipEl);})}function t396_hideTooltip(el, tipEl) {tipEl.css('display', '');tipEl.css({"left": "","transform": "","right": ""});tipEl.removeClass('tn-atom__tip_visible');el.css('z-index', '');}function t396_showTooltip(el, tipEl) {var pos = el.attr("data-field-tipposition-value");if (typeof pos == 'undefined' || pos == '') {pos = 'top';};var elSize = el.height();var elTop = el.offset().top;var elBottom = elTop + elSize;var elLeft = el.offset().left;var elRight = el.offset().left + elSize;var winTop = $(window).scrollTop();var winWidth = $(window).width();var winBottom = winTop + $(window).height();var tipElHeight = tipEl.outerHeight();var tipElWidth = tipEl.outerWidth();var padd=15;if (pos == 'right' || pos == 'left') {var tipElRight = elRight + padd + tipElWidth;var tipElLeft = elLeft - padd - tipElWidth;if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {pos = 'top';}}if (pos == 'top' || pos == 'bottom') {var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);if (tipElRight > winWidth) {var rightOffset = -(winWidth - elRight - padd);tipEl.css({"left": "auto","transform": "none","right": rightOffset + "px"});}if (tipElLeft < 0) {var leftOffset = -(elLeft - padd);tipEl.css({"left": leftOffset + "px","transform": "none"});}}if (pos == 'top') {var tipElTop = elTop - padd - tipElHeight;var tipElBottom = elBottom + padd + tipElHeight;if (winBottom > tipElBottom && winTop > tipElTop) {pos = 'bottom';}}if (pos == 'bottom') {var tipElTop = elTop - padd - tipElHeight;var tipElBottom = elBottom + padd + tipElHeight;if (winBottom < tipElBottom && winTop < tipElTop) {pos = 'top';}}tipEl.attr('data-tip-pos', pos);tipEl.css('display', 'block');tipEl.addClass('tn-atom__tip_visible');el.css('z-index', '1000');}function t396_hex2rgba(hexStr, opacity){var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b, parseFloat(opacity)];} 
 
function t451_initMenu(recid) {
    var el = $('#rec' + recid);
    var obj = el.find('.t451__burger');

    obj.click(function (e) {
        t451_closeMenu();
        t451_showMenu(recid);
        t451_checkSize(recid);
        e.preventDefault();
    });

    el.find('.t451').bind('clickedAnchorInTooltipMenu', function () {
        t451_closeMenu();
    });

    if (window.isMobile) {
        $('#rec' + recid).find('.t-menu__link-item').each(function () {
            var $this = $(this);
            if ($this.hasClass('t451__link-item_submenu')) {
                $this.on('click', function () {
                    t451_checkSize(recid);
                    setTimeout(function () {
                        t451_checkSize(recid);
                    }, 1);
                });
            }
        });
    }
    
    $(window).on('resize', function() {
        t451_checkSize(recid);
    });

    var navLinks = el.find('.t451 a.t-menusub__link-item:not(.tooltipstered)[href*="#"]');
    if (navLinks.length > 0) {
        t451_catchScroll(navLinks);
    }

    t451_highlight();
}

function t451_showMenu(recid) {
    var el = $('#rec' + recid);
    $('body').addClass('t451__body_menushowed');
    el.find('.t451m').addClass('t451m__menu_show');
    el.find('.t451m__overlay').addClass('t451m__menu_show');
    el.find('.t451m__overlay, .t451m__close, a[href*="#"]').click(function () {
        if ($(this).is('.tooltipstered, .t794__tm-link, .t978__tm-link, .t966__tm-link')) { return; }
        t451_closeMenu();
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            $('body').removeClass('t451__body_menushowed');
            $('.t451m').removeClass('t451m__menu_show');
            $('.t451m__overlay').removeClass('t451m__menu_show');
        }
    });
    el.find('.t-menu__link-item').each(function() {
        var $this = $(this);

        /* me601a */
        if ($this.hasClass('t966__tm-link')) {
            $this.on('click', function () {
                setTimeout(function () {
                    t451_checkSize(recid);
                }, 305);
            });
        }
        
        /* me601b */
        if ($this.hasClass('t978__tm-link')) {
            $this.on('click', function () {
                el.find(".t978__menu-link").on('click', function() {
                    t451_checkSize(recid);
                });
            });
        }
    });
}

function t451_closeMenu() {
    $('body').removeClass('t451__body_menushowed');
    $('.t451m').removeClass('t451m__menu_show');
    $('.t451m__overlay').removeClass('t451m__menu_show');
}

function t451_checkSize(recid) {
    var el = $('#rec' + recid).find('.t451m');
    var windowheight = $(window).height() - 80;
    var contentheight = el.find('.t451m__top').height() + el.find('.t451m__rightside').height();
    if (contentheight > windowheight) {
        el.addClass('t451m__overflowed');
        el.find('.t451m__container').css('height', 'auto');
    } else {
        el.removeClass('t451m__overflowed');
        el.find('.t451m__container').css('height', '');
    }
}

function t451_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == '/') { url = url.slice(0, -1); }
    if (pathname.substr(pathname.length - 1) == '/') { pathname = pathname.slice(0, -1); }
    if (pathname.charAt(0) == '/') { pathname = pathname.slice(1); }
    if (pathname == '') { pathname = '/'; }
    $('.t451m__menu a[href="' + url + '"]').addClass('t-active');
    $('.t451m__menu a[href="' + url + '/"]').addClass('t-active');
    $('.t451m__menu a[href="' + pathname + '"]').addClass('t-active');
    $('.t451m__menu a[href="/' + pathname + '"]').addClass('t-active');
    $('.t451m__menu a[href="' + pathname + '/"]').addClass('t-active');
    $('.t451m__menu a[href="/' + pathname + '/"]').addClass('t-active');
}

function t451_changeBgOpacityMenu(recid) {
    var window_width = $(window).width();
    var record = $('#rec' + recid);
    record.find('.t451__container__bg').each(function () {
        var el = $(this);
        var bgcolor = el.attr('data-bgcolor-rgba');
        var bgcolor_afterscroll = el.attr('data-bgcolor-rgba-afterscroll');
        var bgopacity = el.attr('data-bgopacity');
        var bgopacity_afterscroll = el.attr('data-bgopacity2');
        var menu_shadow = el.attr('data-menu-shadow');
        if ($(window).scrollTop() > 20) {
            el.css('background-color', bgcolor_afterscroll);
            if (bgopacity_afterscroll != '0' && bgopacity_afterscroll != '0.0') {
                el.css('box-shadow', menu_shadow);
            } else {
                el.css('box-shadow', 'none');
            }
        } else {
            el.css('background-color', bgcolor);
            if (bgopacity != '0' && bgopacity != '0.0') {
                el.css('box-shadow', menu_shadow);
            } else {
                el.css('box-shadow', 'none');
            }
        }
    });
}

function t451_appearMenu(recid) {
    var window_width = $(window).width();
    var record = $('#rec' + recid);
    record.find('.t451__panel').each(function () {
        var el = $(this);
        var appearoffset = el.attr('data-appearoffset');
        if (appearoffset != '') {
            if (appearoffset.indexOf('vh') > -1) {
                appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
            }

            appearoffset = parseInt(appearoffset, 10);

            if ($(window).scrollTop() >= appearoffset) {
                if (el.hasClass('t451__beforeready')) {
                    el.removeClass('t451__beforeready');
                }
            } else {
                el.addClass('t451__beforeready');
            }
        }
    });

}

function t451_catchScroll(navLinks) {
    var clickedSectionId = null;
    var sections = new Array();
    var sectionIdTonavigationLink = [];
    var interval = 100;
    var lastCall;
    var timeoutId;

    navLinks = $(navLinks.get().reverse());
    navLinks.each(function () {
        var cursection = t451_getSectionByHref($(this));
        if (typeof cursection.attr('id') != 'undefined') {
            sections.push(cursection);
        }
        sectionIdTonavigationLink[cursection.attr('id')] = $(this);
    });
    $(window).bind('resize', t_throttle(function () {
        t451_updateSectionsOffsets(sections);
    }, 200));
    $('.t451').bind('displayChanged', function () {
        t451_updateSectionsOffsets(sections);
    });
    setInterval(function () {
        t451_updateSectionsOffsets(sections);
    }, 5000);
    setTimeout(function () {
        t451_updateSectionsOffsets(sections);
        t451_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId);
    }, 1000);
    navLinks.click(function () {
        if (!$(this).hasClass('tooltipstered')) {
            navLinks.removeClass('t-active');
            sectionIdTonavigationLink[t451_getSectionByHref($(this)).attr('id')].addClass('t-active');
            clickedSectionId = t451_getSectionByHref($(this)).attr('id');
        }
    });
    $(window).scroll(function () {
        var now = new Date().getTime();
        if (lastCall && now < (lastCall + interval)) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                lastCall = now;
                clickedSectionId = t451_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId);
            }, interval - (now - lastCall));
        } else {
            lastCall = now;
            clickedSectionId = t451_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId);
        }
    });
}

function t451_updateSectionsOffsets(sections) {
    $(sections).each(function () {
        var curSection = $(this);
        curSection.attr('data-offset-top', curSection.offset().top);
    });
}

function t451_getSectionByHref(curlink) {
    var curLinkValue = curlink.attr('href').replace(/\s+/g, '');
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + curLinkValue.substring(1) + "']");
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + curLinkValue.substring(1) + "']");
    }
}

function t451_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId) {
    var scrollPosition = $(window).scrollTop();
    var valueToReturn = clickedSectionId;

    if (sections.length != 0 && clickedSectionId == null && sections[sections.length - 1].attr('data-offset-top') > (scrollPosition + 300)) {
        navLinks.removeClass('t-active');
        return null;
    }

    $(sections).each(function () {
        var curSection = $(this);
        var sectionTop = curSection.attr('data-offset-top');
        var id = curSection.attr('id');
        var navLink = sectionIdTonavigationLink[id];

        if (((scrollPosition + 300) >= sectionTop) || (sections[0].attr('id') == id && scrollPosition >= $(document).height() - $(window).height())) {
            if (clickedSectionId == null && !navLink.hasClass('t-active')) {
                navLinks.removeClass('t-active');
                navLink.addClass('t-active');
                valueToReturn = null;
            } else {
                if (clickedSectionId != null && id == clickedSectionId) {
                    valueToReturn = null;
                }
            }
            return !1;
        }
    });
    return valueToReturn;
} 
function t456_setListMagin(recid, imglogo) {
    if ($(window).width() > 980) {
        var t456__menu = $('#rec' + recid + ' .t456');
        var t456__leftpart = t456__menu.find('.t456__leftwrapper');
        var t456__listpart = t456__menu.find('.t456__list');
        if (imglogo) {
            t456__listpart.css("margin-right", t456__leftpart.width());
        } else {
            t456__listpart.css("margin-right", t456__leftpart.width() + 30);
        }
    }
}

function t456_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1);
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1);
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1);
    }
    if (pathname == "") {
        pathname = "/";
    }
    $(".t456__list_item a[href='" + url + "']").addClass("t-active");
    $(".t456__list_item a[href='" + url + "/']").addClass("t-active");
    $(".t456__list_item a[href='" + pathname + "']").addClass("t-active");
    $(".t456__list_item a[href='/" + pathname + "']").addClass("t-active");
    $(".t456__list_item a[href='" + pathname + "/']").addClass("t-active");
    $(".t456__list_item a[href='/" + pathname + "/']").addClass("t-active");
}


function t456_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var t456_navLinks = $("#rec" + recid + " .t456__list_item a:not(.tooltipstered)[href*='#']");
        if (t456_navLinks.length > 0) {
            t456_catchScroll(t456_navLinks);
        }
    }
}

function t456_catchScroll(t456_navLinks) {
    var t456_clickedSectionId = null,
        t456_sections = new Array(),
        t456_sectionIdTonavigationLink = [],
        t456_interval = 100,
        t456_lastCall, t456_timeoutId;
    t456_navLinks = $(t456_navLinks.get().reverse());
    t456_navLinks.each(function () {
        var t456_cursection = t456_getSectionByHref($(this));
        if (typeof t456_cursection !== "undefined") {
            if (typeof t456_cursection.attr("id") != "undefined") {
                t456_sections.push(t456_cursection);
            }
            t456_sectionIdTonavigationLink[t456_cursection.attr("id")] = $(this);
        }
    });
    t456_updateSectionsOffsets(t456_sections);
    t456_sections.sort(function (a, b) {
        return b.attr("data-offset-top") - a.attr("data-offset-top");
    });
    $(window).bind('resize', t_throttle(function () {
        t456_updateSectionsOffsets(t456_sections);
    }, 200));
    $('.t456').bind('displayChanged', function () {
        t456_updateSectionsOffsets(t456_sections);
    });
    setInterval(function () {
        t456_updateSectionsOffsets(t456_sections);
    }, 5000);
    t456_highlightNavLinks(t456_navLinks, t456_sections, t456_sectionIdTonavigationLink, t456_clickedSectionId);

    t456_navLinks.click(function () {
        var t456_clickedSection = t456_getSectionByHref($(this));
        if (typeof t456_clickedSection !== "undefined" && !$(this).hasClass("tooltipstered") && typeof t456_clickedSection.attr("id") != "undefined") {
            t456_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t456_clickedSectionId = t456_getSectionByHref($(this)).attr("id");
        }
    });
    
    $(window).scroll(function () {
        var t456_now = new Date().getTime();
        if (t456_lastCall && t456_now < (t456_lastCall + t456_interval)) {
            clearTimeout(t456_timeoutId);
            t456_timeoutId = setTimeout(function () {
                t456_lastCall = t456_now;
                t456_clickedSectionId = t456_highlightNavLinks(t456_navLinks, t456_sections, t456_sectionIdTonavigationLink, t456_clickedSectionId);
            }, t456_interval - (t456_now - t456_lastCall));
        } else {
            t456_lastCall = t456_now;
            t456_clickedSectionId = t456_highlightNavLinks(t456_navLinks, t456_sections, t456_sectionIdTonavigationLink, t456_clickedSectionId);
        }
    });
}


function t456_updateSectionsOffsets(sections) {
    $(sections).each(function () {
        var t456_curSection = $(this);
        t456_curSection.attr("data-offset-top", t456_curSection.offset().top);
    });
}


function t456_getSectionByHref(curlink) {
    var hash = curlink.attr("href").replace(/\s+/g, '').replace(/.*#/, '');
    var block = $(".r[id='" + hash + "']");
    var anchor = $(".r[data-record-type='215']").has("a[name='" + hash + "']");
    
    if (curlink.is('[href*="#rec"]')) {
        return block;
    } else if (anchor.length === 1) {
        return anchor;
    } else {
        return undefined;
    }
}


function t456_highlightNavLinks(t456_navLinks, t456_sections, t456_sectionIdTonavigationLink, t456_clickedSectionId) {
    var t456_scrollPosition = $(window).scrollTop(),
        t456_valueToReturn = t456_clickedSectionId;
    /*if first section is not at the page top (under first blocks)*/
    if (t456_sections.length != 0 && t456_clickedSectionId == null && t456_sections[t456_sections.length - 1].attr("data-offset-top") > (t456_scrollPosition + 300)) {
        t456_navLinks.removeClass('t-active');
        return null;
    }

    $(t456_sections).each(function (e) {
        var t456_curSection = $(this),
            t456_sectionTop = t456_curSection.attr("data-offset-top"),
            t456_id = t456_curSection.attr('id'),
            t456_navLink = t456_sectionIdTonavigationLink[t456_id];
        if (((t456_scrollPosition + 300) >= t456_sectionTop) || (t456_sections[0].attr("id") == t456_id && t456_scrollPosition >= $(document).height() - $(window).height())) {
            if (t456_clickedSectionId == null && !t456_navLink.hasClass('t-active')) {
                t456_navLinks.removeClass('t-active');
                t456_navLink.addClass('t-active');
                t456_valueToReturn = null;
            } else {
                if (t456_clickedSectionId != null && t456_id == t456_clickedSectionId) {
                    t456_valueToReturn = null;
                }
            }
            return false;
        }
    });
    return t456_valueToReturn;
}

function t456_setPath() {}

function t456_setBg(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t456").each(function () {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color", bgcolor);
            }
        });
    } else {
        $(".t456").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color", bgcolor);
            el.attr("data-bgcolor-setbyscript", "yes");
        });
    }
}

function t456_appearMenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t456").each(function () {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset != "") {
                if (appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                }

                appearoffset = parseInt(appearoffset, 10);

                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top", "-50px");
                        el.css("visibility", "visible");
                        el.animate({
                            "opacity": "1",
                            "top": "0px"
                        }, 200, function () {});
                    }
                } else {
                    el.stop();
                    el.css("visibility", "hidden");
                }
            }
        });
    }

}

function t456_changebgopacitymenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t456").each(function () {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow;
            } else {
                var menushadowvalue = '0.' + menushadow;
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if (bgopacitytwo == '0' || menushadow == ' ') {
                    el.css("box-shadow", "none");
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")");
                }
            } else {
                el.css("background-color", bgcolor);
                if (bgopacityone == '0.0' || menushadow == ' ') {
                    el.css("box-shadow", "none");
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")");
                }
            }
        });
    }
}

function t456_createMobileMenu(recid) {
    var window_width = $(window).width(),
        el = $("#rec" + recid),
        menu = el.find(".t456"),
        burger = el.find(".t456__mobile");
    burger.click(function (e) {
        menu.fadeToggle(300);
        $(this).toggleClass("t456_opened")
    });
    $(window).bind('resize', t_throttle(function () {
        window_width = $(window).width();
        if (window_width > 980) {
            menu.fadeIn(0);
        }
    }, 200));
} 
function t675_init(recid) {  
  var el=$("#rec"+recid),
      textwrapper=el.find('.t675__textwrapper'),
      dots=el.find('.t-slds__bullet_wrapper');
  textwrapper.css('margin-bottom', dots.outerHeight()+7);
} 
function t690_onSuccess(t690_form){
	var t690_inputsWrapper = t690_form.find('.t-form__inputsbox');
    var t690_inputsHeight = t690_inputsWrapper.height();
    var t690_inputsOffset = t690_inputsWrapper.offset().top;
    var t690_inputsBottom = t690_inputsHeight + t690_inputsOffset;
	var t690_targetOffset = t690_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t690_target = t690_targetOffset - 200;
    }	else {
        var t690_target = t690_targetOffset - 100;
    }

    if (t690_targetOffset > $(window).scrollTop() || ($(document).height() - t690_inputsBottom) < ($(window).height()-100)) {
        t690_inputsWrapper.addClass('t690__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);                                                                                                                           
    } else {
        $('html, body').animate({ scrollTop: t690_target}, 400);
        setTimeout(function(){t690_inputsWrapper.addClass('t690__inputsbox_hidden');}, 400);
    }
                                                                                                                           
	var successurl = t690_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }
                                                                                                                           
} 
function t706_onSuccessCallback(t706_form) {
    $(".t706__cartwin-products").slideUp(10, function () {});
    $(".t706__cartwin-bottom").slideUp(10, function () {});
    $(".t706 .t-form__inputsbox").slideUp(700, function () {});
    try {
        /*fix IOS11 cursor bug + general IOS background scroll*/
        tcart__unlockScroll();
    } catch (e) {}
} 
function t744_init(recid) {
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid);
    });

    setTimeout(function () {
        t_onFuncLoad('t_prod__init', function () {
            t_prod__init(recid);
        });
        t744__hoverZoom_init(recid);
    }, 500);

    $('#rec' + recid).find('.t744').bind('displayChanged', function () {
        t744_updateSlider(recid);
    });
    $('body').trigger('twishlist_addbtn');
}

function t744__hoverZoom_init(recid) {
    if (window.isMobile) {
        return;
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function (url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function (script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function () {
                        t_hoverZoom_init(recid, '.t-slds__container');
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    }
}

function t744_updateSlider(recid) {
    var el = $('#rec' + recid);
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid);
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid);
    });

    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid);
    });
} 
function t764_init(recid){
    var el = $('#rec' + recid);
    
    t_onFuncLoad('t_sldsInit', function () {
        t_sldsInit(recid);
    });
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid);
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'), 10);
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });

    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid);
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid);
    });
    
    el.find('.t764').bind('displayChanged', function() {
        t_onFuncLoad('t_slds_updateSlider', function () {
            t_slds_updateSlider(recid);
        });
    });
}
 
function t778__init(recid) {
    t_onFuncLoad('t_prod__init', function () {
        t_prod__init(recid);
    });
    t778_initPopup(recid);
    t778__hoverZoom_init(recid);
    t778__updateLazyLoad(recid);
    t778__alignButtons_init(recid);
    t778__showMore(recid);
    if (typeof t_store_addProductQuantityEvents !== 'undefined') {
        t778_initProductQuantity(recid);
    }
    $('body').trigger('twishlist_addbtn');
}

function t778_initProductQuantity(recid) {
    var el = $('#rec' + recid);
    var productList = el.find(".t778__col, .t778__product-full");
    productList.each(function(i, product) {
        t_store_addProductQuantityEvents($(product));
    });
}

function t778__showMore(recid) {
    var el = $('#rec' + recid).find(".t778");
    var showmore = el.find('.t778__showmore');
    var cards_count = parseInt(el.attr('data-show-count'), 10);
    
    if (cards_count > 0) {
        if (showmore.text() === '') {
            showmore.find('td').text(t778__dict('loadmore'));
        }
        
        showmore.show();
        el.find('.t778__col').hide();
    
        var cards_size = el.find('.t778__col').size();
        var x = cards_count;
        var y = cards_count;
        
        t778__showSeparator(el, x);
    
        el.find('.t778__col:lt(' + x + ')').show();
    
        showmore.click(function () {
            x = (x + y <= cards_size) ? x + y : cards_size;
            el.find('.t778__col:lt(' + x + ')').show();
            el.trigger('displayChanged');
            if (x == cards_size) {
                showmore.hide();
            }
            t778__showSeparator(el, x);
            
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
        });
    }
}

function t778__dict(msg) {
    var dict = [];

    dict['loadmore'] = {
        EN: 'Load more',
        RU: 'Загрузить еще',
        FR: 'Charger plus',
        DE: 'Mehr laden',
        ES: 'Carga más',
        PT: 'Carregue mais',
        UK: 'Завантажити ще',
        JA: 'もっと読み込む',
        ZH: '裝載更多',
    };

    var lang = window.browserLang;

    if (typeof dict[msg] !== 'undefined') {
        if (typeof dict[msg][lang] !== 'undefined' && dict[msg][lang] != '') {
            return dict[msg][lang];
        } else {
            return dict[msg]['EN'];
        }
    }

    return 'Text not found "' + msg + '"';
}

function t778__showSeparator(el, x) {
    el.find('.t778__separator_number').addClass('t778__separator_hide');
    el.find('.t778__separator_hide').each(function() {
        if ($(this).attr('data-product-separator-number') <= x) {
            $(this).removeClass('t778__separator_hide');
        }
    });
}

function t778__hoverZoom_init(recid) {
    if (isMobile) {
        return;
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function (url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function (script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function () {
                        t_hoverZoom_init(recid, ".t-slds__container");
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    }
}

function t778__updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t778__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview") {
        scrollContainer.bind('scroll', t_throttle(function () {
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
        }));
    }
}

function t778__alignButtons_init(recid) {
    var el = $('#rec' + recid);
    if (el.find('[data-buttons-v-align]')[0]) {
        try {
            t778__alignButtons(recid);
            $(window).bind('resize', t_throttle(function () {
                if (
                    typeof window.noAdaptive !== 'undefined' &&
                    window.noAdaptive === true &&
                    $isMobile
                ) {
                    return;
                }
                t778__alignButtons(recid);
            }));

            el.find('.t778').bind('displayChanged', function () {
                t778__alignButtons(recid);
            });

            if ($isMobile) {
                $(window).on('orientationchange', function () {
                    t778__alignButtons(recid);
                });
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message);
        }
    }
}

function t778__alignButtons(recid) {
    var rec = $('#rec' + recid);
    var contents = rec.find('.t778__content');
    var maxHeight = 0;
    var maxHeightBtns = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;

    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow = $(window).width() <= 960 && rec.find('.t778__container_mobile-flex')[0] ? true : false;
    var mobileTwoItemsInRow = $(window).width() <= 480 && rec.find('.t778 .mobile-two-columns')[0] ? true : false;

    if (mobileView) {
        itemsInRow = 1;
    }

    if (tableView) {
        itemsInRow = 2;
    }

    if (mobileTwoItemsInRow) {
        itemsInRow = 2;
    }

    if (mobileOneRow) {
        itemsInRow = 999999;
    }

    var i = 1;
    var textWrappersInRow = [];
    var btnWrappersInRow = [];

    $.each(contents, function (key, content) {
        var textWrapper = $(content).find('.t778__textwrapper');
        if (textWrapper.length > 0) {
            textWrapper = textWrapper[0];
            textWrapper.style.height = 'auto';
            if (itemsInRow === 1) {
                textWrapper.style.height = 'auto';
            } else {
                textWrappersInRow.push(textWrapper);
                if (textWrapper.offsetHeight > maxHeight) {
                    maxHeight = textWrapper.offsetHeight;
                }
    
                $.each(textWrappersInRow, function (key, wrapper) {
                    wrapper.style.height = maxHeight + 'px';
                });
            }
        }

        var btnWrapper = $(content).find('.t778__btn-wrapper');
        if (btnWrapper.length > 0) {
            btnWrapper = btnWrapper[0];
            btnWrapper.style.marginTop = '';
            if (itemsInRow === 1) {
                btnWrapper.style.marginTop = '';
            } else {
                btnWrappersInRow.push(btnWrapper);
                if (btnWrapper.offsetHeight > maxHeightBtns) {
                    maxHeightBtns = btnWrapper.offsetHeight;
                }
    
                $.each(btnWrappersInRow, function (key, btn) {
                    if (maxHeightBtns > btn.offsetHeight) {
                        btn.style.marginTop = (maxHeightBtns - btn.offsetHeight) + 'px';
                    }
                });
            }
        }

        if (i === itemsInRow) {
            i = 0;
            maxHeight = 0;
            textWrappersInRow = [];
            maxHeightBtns = 0;
            btnWrappersInRow = [];
        }

        i++;
    });
}

function t778_initPopup(recid) {
    var rec = $('#rec' + recid);

    rec.find('[href^="#prodpopup"]').each(function (e) {
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        $(".r").find('a[href$="#!/tproduct/' + recid + '-' + lid_prod + '"]').click(function (e) {
            if (rec.find('[data-product-lid=' + lid_prod + ']').length) {
                rec.find('[data-product-lid=' + lid_prod + '] [href^="#prodpopup"]').triggerHandler('click');
            }
        });
    });

    rec.find('[href^="#prodpopup"]').one("click", function (e) {
        e.preventDefault();
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid + ' #t778__product-' + lid_prod + '');
        });
    });
    rec.find('[href^="#prodpopup"]').click(function (e) {
        e.preventDefault();
        if ($(e.target).hasClass('t1002__addBtn') || $(e.target).parents().hasClass('t1002__addBtn')) {
		  return;
	    }
        t778_showPopup(recid);
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        el_popup.find('.js-product').css('display', 'none');
        var el_fullprod = el_popup.find('.js-product[data-product-lid="' + lid_prod + '"]');
        el_fullprod.css('display', 'block');

        var analitics = el_popup.attr('data-track-popup');
        if (analitics > '') {
            var virtTitle = el_fullprod.find('.js-product-name').text();
            if (!virtTitle) {
                virtTitle = 'prod' + lid_prod;
            }
            Tilda.sendEventToStatistics(analitics, virtTitle);
        }

        var curUrl = window.location.href;
        if (curUrl.indexOf('#!/tproduct/') < 0 && curUrl.indexOf('%23!/tproduct/') < 0) {
            if (typeof history.replaceState != 'undefined') {
                window.history.replaceState('', '', window.location.href + '#!/tproduct/' + recid + '-' + lid_prod);
            }
        }
        t778_updateSlider(recid + ' #t778__product-' + lid_prod + '');
        setTimeout(function () {
            if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
                t_onFuncLoad('t_lazyload_update', function () {
                    t_lazyload_update();
                });
            }
        }, 500);
    });
    if ($('#record' + recid).length == 0) {
        t778_checkUrl(recid);
    }
    t778_copyTypography(recid);
}

function t778_checkUrl(recid) {
    var curUrl = window.location.href;
    var tprodIndex = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex < 0) {
        tprodIndex = curUrl.indexOf('%23!/tproduct/');
    }
    if (tprodIndex >= 0) {
        var curUrl = curUrl.substring(tprodIndex, curUrl.length);
        var curProdLid = curUrl.substring(curUrl.indexOf('-') + 1, curUrl.length);
        var rec = $('#rec' + recid);
        if (curUrl.indexOf(recid) >= 0 && rec.find('[data-product-lid=' + curProdLid + ']').length) {
            rec.find('[data-product-lid=' + curProdLid + '] [href^="#prodpopup"]').triggerHandler('click');
        }
    }
}

function t778_updateSlider(recid) {
    var el = $('#rec' + recid);
    t_onFuncLoad('t_slds_SliderWidth', function () {
        t_slds_SliderWidth(recid);
    });
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_onFuncLoad('t_slds_UpdateSliderHeight', function () {
        t_slds_UpdateSliderHeight(recid);
    });
    t_onFuncLoad('t_slds_UpdateSliderArrowsHeight', function () {
        t_slds_UpdateSliderArrowsHeight(recid);
    });
}

function t778_showPopup(recid) {
    var el = $('#rec' + recid);
    var popup = el.find('.t-popup');

    popup.css('display', 'block');
    setTimeout(function () {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function () {
                t_lazyload_update();
            });
        }
    }, 50);

    $('body').addClass('t-body_popupshowed');
    $('body').trigger('twishlist_addbtn');

    el.find('.t-popup').mousedown(function (e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return;
        }
        if (e.target == this) {
            t778_closePopup();
        }
    });

    el.find('.t-popup__close, .t778__close-text').click(function (e) {
        t778_closePopup();
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            t778_closePopup();
        }
    });
}

function t778_closePopup() {
    $('body').removeClass('t-body_popupshowed');
    $('body').trigger('twishlist_addbtn');
    $('.t-popup').removeClass('t-popup_show');
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = curUrl.indexOf('%23!/tproduct/');
    }
    curUrl = curUrl.substring(0, indexToRemove);
    setTimeout(function () {
        $(".t-popup").scrollTop(0);
        $('.t-popup').not('.t-popup_show').css('display', 'none');
        if (typeof history.replaceState != 'undefined') {
            window.history.replaceState('', '', curUrl);
        }
    }, 300);
}

function t778_removeSizeStyles(styleStr) {
    if (typeof styleStr != "undefined" && (styleStr.indexOf('font-size') >= 0 || styleStr.indexOf('padding-top') >= 0 || styleStr.indexOf('padding-bottom') >= 0)) {
        var styleStrSplitted = styleStr.split(';');
        styleStr = "";
        for (var i = 0; i < styleStrSplitted.length; i++) {
            if (styleStrSplitted[i].indexOf('font-size') >= 0 || styleStrSplitted[i].indexOf('padding-top') >= 0 || styleStrSplitted[i].indexOf('padding-bottom') >= 0) {
                styleStrSplitted.splice(i, 1);
                i--;
                continue;
            }
            if (styleStrSplitted[i] == "") {
                continue;
            }
            styleStr += styleStrSplitted[i] + ";";
        }
    }
    return styleStr;
}

function t778_copyTypography(recid) {
    var rec = $('#rec' + recid);
    var titleStyle = rec.find('.t778__title').attr('style');
    var descrStyle = rec.find('.t778__descr').attr('style');
    rec.find('.t-popup .t778__title').attr("style", t778_removeSizeStyles(titleStyle));
    rec.find('.t-popup .t778__descr, .t-popup .t778__text').attr("style", t778_removeSizeStyles(descrStyle));
}

/* compability */
function t778_unifyHeights(recid) {
    var t778_el = $('#rec' + recid),
        t778_blocksPerRow = t778_el.find(".t778__container").attr("data-blocks-per-row"),
        t778_cols = t778_el.find(".t778__textwrapper"),
        t778_mobScroll = t778_el.find(".t778__scroll-icon-wrapper").length;

    if ($(window).width() <= 480 && t778_mobScroll == 0) {
        t778_cols.css("height", "auto");
        return;
    }

    var t778_perRow = +t778_blocksPerRow;
    if ($(window).width() <= 960 && t778_mobScroll > 0) {
        var t778_perRow = t778_cols.length;
    } else {
        if ($(window).width() <= 960) {
            var t778_perRow = 2;
        }
    }

    for (var i = 0; i < t778_cols.length; i += t778_perRow) {
        var t778_maxHeight = 0,
            t778_row = t778_cols.slice(i, i + t778_perRow);
        t778_row.each(function () {
            var t778_curText = $(this).find(".t778__textwrapper"),
                t778_curBtns = $(this).find(".t778__btn-wrapper_absolute"),
                t778_itemHeight = t778_curText.outerHeight() + t778_curBtns.outerHeight();
            if (t778_itemHeight > t778_maxHeight) {
                t778_maxHeight = t778_itemHeight;
            }
        });
        t778_row.css("height", t778_maxHeight);
    }
} 
function t780_init(recid){
    if($("#rec"+recid+" .t-slds").length){
        t_onFuncLoad('t_sldsInit', function () {
            t_sldsInit(recid);
        });
    }    

  setTimeout(function(){
      t_onFuncLoad('t_prod__init', function () {
        t_prod__init(recid);
      });
      $('body').trigger('twishlist_addbtn');
  }, 500);
  
    $('#rec'+recid).find('.t780').bind('displayChanged',function(){
        t_onFuncLoad('t_slds_updateSlider', function () {
            t_slds_updateSlider(recid);
        });
  });  
} 
function t849_init(recid) {
    var el = $('#rec' + recid);
    var toggler = el.find('.t849__header');
    var accordion = el.find('.t849__accordion');
    if (accordion) {
        accordion = accordion.attr('data-accordion');
    } else {
        accordion = "false";
    }

    toggler.click(function () {
        if (accordion === "true") {
            toggler.not(this).removeClass("t849__opened").next().slideUp();
        }

        $(this).toggleClass('t849__opened');
        $(this).next().slideToggle();
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') {
            t_onFuncLoad('t_lazyload_update', function () {
                t_lazyload_update();
            });
        }
    });
} 
function t875_init(recid) {
    if (document.layers) {document.captureEvents(Event.MOUSEDOWN);}
    // document.onmousedown = t875_click;
    document.oncontextmenu = function(event) {
    //         var event = event || window.event;
    //         var sender = event.target || event.srcElement;
    //         if (sender.tagName.match(/INPUT|TEXTAREA/i)) {
    //             return;
    //         } else {
    //             return false;
    //         }
    // };
    // t875_preventSelection(document);
}


function t875_preventUserSelect() {
    $('body').css({'-ms-user-select': 'none', '-moz-user-select': 'none', '-webkit-user-select': 'none', 'user-select': 'none', '-webkit-touch-callout': 'none'});
}

function t875_click(event) {
    t875_returnPrevent(event);

    if (document.all) {
        if (event.button == 2) {
            return false;
        }
    }
    if (document.layers) {
        if (event.which == 3) {
            return false;
        }
    }
}


function t875_preventSelection(element) {
    var preventSelection = false;

    t875_addHandler(element, 'mousemove', function() {
        if (preventSelection) {
            t875_removeSelection();
        }
    });

    t875_addHandler(element, 'mousedown', function(event) {
        var event = event || window.event;
        var sender = event.target || event.srcElement;
        preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
    });

    t875_addHandler(element, 'mouseup', function() {
        if (preventSelection) {
            t875_removeSelection();
        }
        preventSelection = false;
    });

    t875_addHandler(element, 'keydown', t875_killCtrlA);
    t875_addHandler(element, 'keyup', t875_killCtrlA);
    t875_addHandler(element, 'keydown', t875_killCtrlU);
    t875_addHandler(element, 'keyup', t875_killCtrlU);
    t875_addHandler(element, 'keydown', t875_killAltCmdI);
    t875_addHandler(element, 'keyup', t875_killAltCmdI);
    t875_addHandler(element, 'keydown', t875_killCtrlShiftI);
    t875_addHandler(element, 'keyup', t875_killCtrlShiftI);
}


function t875_addHandler(element, event, handler) {
    if (element.attachEvent) {
        element.attachEvent('on' + event, handler);
    } else {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        }
    }
}


function t875_removeSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection && document.selection.clear) {
        document.selection.clear();
    }
}


function t875_killCtrlU(event) {
    t875_returnPrevent(event);

    var key = event.keyCode || event.which;
    if ((event.ctrlKey && key == 'U'.charCodeAt(0)) || (event.altKey && event.metaKey && (key == 'U'.charCodeAt(0) || key == 'u'.charCodeAt(0)))) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_killAltCmdI(event) {
    t875_returnPrevent(event);

    var key = event.keyCode || event.which;
    if (event.altKey && event.metaKey && (key == 'I'.charCodeAt(0) || key == 'i'.charCodeAt(0))) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_killCtrlShiftI(event) {
    t875_returnPrevent(event);

    var key = event.keyCode || event.which;
    if (event.shiftKey && event.ctrlKey && (key == 'I'.charCodeAt(0) || key == 'i'.charCodeAt(0))) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_killCtrlA(event) {
    var event = event || window.event;
    var sender = event.target || event.srcElement;
    if (sender.tagName.match(/INPUT|TEXTAREA|BUTTON/i)) {return;}

    var key = event.keyCode || event.which;
    if ((event.ctrlKey && key == 'A'.charCodeAt(0)) || (event.metaKey && key == 'A'.charCodeAt(0))) {
        t875_removeSelection();
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_returnPrevent(event) {
    var event = event || window.event;
    var sender = event.target || event.srcElement;
    if (sender.tagName.match(/INPUT|TEXTAREA/i)) {return;}
}
 
function t886_init(recid) {
    var el = $('#rec' + recid);
    var block = el.find('.t886');
    var closeBtn = el.find('.t886__btn');
    var storageItem = block.attr("data-storage-item");
    var lastOpen = localStorage.getItem(storageItem);

    if (lastOpen == null) {
        block.removeClass('t886_closed');
    }

    closeBtn.click(function (e) {
        block.addClass('t886_closed');
        localStorage.setItem(storageItem, Math.floor(Date.now() / 1000));
        e.preventDefault();
    });
}
 
function t905_init(recid) {
    var el = $('#rec' + recid);

    t905_unifyHeights(recid);

    $(window).on('resize', t_throttle(function () {
        t905_unifyHeights(recid)
    }));

    $(window).on('load', function () {
        t905_unifyHeights(recid);
    });

    el.find('.t905').on('displayChanged', function () {
        t905_unifyHeights(recid);
    });
}

function t905_unifyHeights(recid) {
    var el = $('#rec' + recid);
    var cards = el.find('.t905__card');

    cards.each(function(i, card) {
        var img = $(card).find('.t905__image');
        var imgHeight = $(img).outerHeight();
        var content = $(card).find('.t905__content');
        var contentHeight = $(content).outerHeight();

        if (contentHeight > imgHeight) {
            img.css('height', contentHeight + 'px');
            img.css('padding-bottom', 'initial');
        }
    });
}
