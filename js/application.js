// Storing SVG Sprite in localStorage
// http://osvaldas.info/caching-svg-sprite-in-localstorage
;( function( window, document ) {
    'use strict';

    var file     = 'img/icons/svg/svg.html',
    revision = 1;

    if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
        return true;

    var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
        request,
        data,
        insertIT = function()
        {
            document.body.insertAdjacentHTML( 'afterbegin', data );
        },
        insert = function()
        {
            if( document.body ) insertIT();
            else document.addEventListener( 'DOMContentLoaded', insertIT );
        };

        if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
        {
            data = localStorage.getItem( 'inlineSVGdata' );
            if( data )
            {
                insert();
                return true;
            }
        }

        try
        {
            request = new XMLHttpRequest();
            request.open( 'GET', file, true );
            request.onload = function()
            {
                if( request.status >= 200 && request.status < 400 )
                {
                    data = request.responseText;
                    insert();
                    if( isLocalStorage )
                    {
                        localStorage.setItem( 'inlineSVGdata',  data );
                        localStorage.setItem( 'inlineSVGrev',   revision );
                    }
                }
            }
            request.send();
        }
        catch( e ){}

}( window, document ) );





// Remove outlines for mouse users only
// https://github.com/lindsayevans/outline.js/blob/master/outline.js
(function(d){

    var style_element = d.createElement('STYLE'),
        dom_events = 'addEventListener' in d,
        add_event_listener = function(type, callback){
            // Basic cross-browser event handling
            if(dom_events){
                d.addEventListener(type, callback);
            }else{
                d.attachEvent('on' + type, callback);
            }
        },
        set_css = function(css_text){
            // Handle setting of <style> element contents in IE8
            !!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;
        }
    ;

    d.getElementsByTagName('HEAD')[0].appendChild(style_element);

    // Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
    add_event_listener('mousedown', function(){
        set_css(':focus{outline:0}::-moz-focus-inner{border:0;}');
    });

    add_event_listener('keydown', function(){
        set_css('');
    });

})(document);





// Smooth Scrolling To Internal Links
// http://www.paulund.co.uk/smooth-scroll-to-internal-links-with-jquery
$(function() {
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({'scrollTop': $target.offset().top}, 900, 'swing');
	});
});





// Keep The Rhythm
;(function ( $, window, document, undefined ) {

    var pluginName = "keepTheRhythm",
        defaults = {
            baseLine: 24,
            verticalAlignment: "center",
            spacing: "padding"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var obj = $(this.element);
            var rhythmPlugin = this;

            $(window).resize(function () {
                rhythmPlugin.fixRhythm(obj);
            }).trigger("resize");
        },

        fixRhythm: function (obj) {
            var h = obj.height();
            var r = this.options.baseLine - (h % this.options.baseLine);

            //if the element is in rhythm: do nothing.
            if (r == this.options.baseLine) {
                r = 0;
            }

            var top = 0;
            var bottom = r;

            if (this.options.verticalAlignment == "center") {
                //if verticalAlignment is set to center; spread the padding to both top and bottom
                top = r / 2;
                bottom = r - top;
            } else if (this.options.verticalAlignment == "bottom") {
                //if the alignment is bottom; set to padding to the top!
                top = r;
                bottom = 0;
            }

            if (this.options.spacing == "margin") {
                obj.css({
                    marginTop: top + "px",
                    marginBottom: bottom + "px"
                });
            } else {
                obj.css({
                    paddingTop: top + "px",
                    paddingBottom: bottom + "px"
                });
            }
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );





// Apply CSS height to every iframe in correct ratio to it's current width
// http://jaydenseric.com/blog/responsive-iframes
function resizeIframes() {
    // Loop over every iframe on the page
    $('iframe').each(function() {
        // Get the iframe's intended aspect ratio via it's inline dimensions
        var ratio = $(this).attr('height') / $(this).attr('width');
        // Apply a CSS height that is in correct ratio to it's current width
        $(this).css('height', $(this).width() * ratio);
    });
}

// Pop off an initial resize when the page loads
resizeIframes();

// Update iframes each time the window is resized
$(window).resize(function() {
    resizeIframes();
});





(function fn() {

    // Hide images.
    $(function() {
        $('img').hide();
    });

	fn.now = +new Date;

	$(window).load(function () {

		// Media query event handler
		if (matchMedia) {
			var mq = window.matchMedia("(min-width: 960px)");
			mq.addListener(WidthChange);
			WidthChange(mq);
		}

		// Media query change
		function WidthChange(mq) {
			if (mq.matches) {
				// window width is at least 960px
				$('img, figure').keepTheRhythm({
					baseLine: 30,
					verticalAlignment: "top"
				});
			}
			else {
				// window width is less than 960px
				$('img, figure').keepTheRhythm({
					baseLine: 24,
					verticalAlignment: "top"
				});
			}
		}

		// Show media.
		$('img').fadeIn('slow');

	});

})();





// Handle broken images.
$(window).bind('load', function() {
    $('img').each(function() {
        if((typeof this.naturalWidth != "undefined" && this.naturalWidth == 0 ) || this.readyState == 'uninitialized' ) {
            $(this).attr('id', 'js-img-broken');
        }
    });
});