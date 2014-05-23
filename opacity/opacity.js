 $(function() {

    var selector    = '[opacrange]',
        $input      = $(selector);
	var image      	= document.getElementById("image");

    $input.rangeslider({
		// Deactivate the feature detection
        polyfill: false,

		// Callback function
        onInit: function() {},

        // Callback function
        onSlide: function(position, value) {
			image.style.opacity = value / 100.0;
		},

        // Callback function
        onSlideEnd: function(position) {
			image.style.opacity = value / 100.0;
		}
    });
	
});