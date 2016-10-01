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