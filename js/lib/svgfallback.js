// Fallback for browsers that do not support SVG
;( function( window, document ) {
	if( document.createElementNS && document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect ) return true;
	var uses = document.getElementsByTagName( 'use' ), use;
	while( ( use = uses[ 0 ] ) )
	{
		var svg = use.parentNode, img = new Image();
		img.src = use.getAttribute( 'data-img' );
		svg.parentNode.replaceChild( img, svg );
	}
}( window, document ) );