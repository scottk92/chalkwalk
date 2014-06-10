function navBarFix(classN) {
/* we need this only on touch devices */
if (Modernizr.touch) {
    /* cache dom references */ 
    var $body = jQuery('body'); 

    /* bind events */
    $(document)
    .on('focus', 'input', function(e) {
        $body.addClass(classN);
    })
    .on('blur', 'input', function(e) {
        $body.removeClass(classN);
    });
	alert("yo!");
} 
}