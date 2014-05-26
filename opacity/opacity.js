var changeOpacity = function(rangeid, elementid) {
    var selector    = '[' + rangeid + ']',
        $input      = $(selector);
	var image      	= document.getElementById(elementid);

    $input.rangeslider({
		// Deactivate the feature detection
        polyfill: false,

        // Callback function
        onSlide: function(position, value) {
			image.style.opacity = value / 100.0;
		},

        // Callback function
        onSlideEnd: function(position) {
			image.style.opacity = value / 100.0;
		}
    });
	
}
