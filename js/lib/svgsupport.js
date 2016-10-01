// A part of the fallback for browsers that do not support SVG

if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
{
	document.createElement( 'svg' );
	document.createElement( 'use' );
}