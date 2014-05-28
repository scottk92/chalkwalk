function Transform(outerDiv, innerDiv) {
	this.touchArea = document.getElementById(outerDiv);
	this.elemImage = document.getElementById(innerDiv);
	
	this.posX=0;
	this.posY=0; 
    this.lastPosX=0;
	this.lastPosY=0; 
    this.bufferX=0; 
	this.bufferY=0; 
    this.scale=1; 
	this.last_scale;  
    this.rotation=1; 
	this.last_rotation;
	this.dragReady=0;
	
	this.options = {
		transform_always_block: true,
		preventDefault: true,
		transform_min_scale: 1,
		drag_block_horizontal: true,
		drag_block_vertical: true,
		drag_min_distance: 0
	}
	
	this.hammertime;
}

Transform.prototype.manageMultiTouch = function(event) {
    switch(event.type) {
	case "touch":
	     this.last_scale = this.scale;
	     this.last_rotation = this.rotation;
	     break;

	case "transform":
	    this.rotation = this.last_rotation + event.gesture.rotation;
	    this.scale = event.gesture.scale * this.last_scale;
	    break;

	case "transformend":
	    event.gesture.stopDetect();
	    break;

	case "drag":
        this.posX = event.gesture.deltaX + this.lastPosX;
        this.posY = event.gesture.deltaY + this.lastPosY;

        break;

	case "dragend":
	    this.lastPosX = this.posX;
	    this.lastPosY = this.posY;
	    break;
    }

    var transform = 
	"translate3d(" + this.posX + "px, " + this.posY + "px, 0)" +
	"scale3d(" + this.scale + ", " + this.scale + ", 0)" +
	"rotate(" + this.rotation + "deg)";

    this.elemImage.style.transform = transform;
    this.elemImage.style.oTransform = transform;
    this.elemImage.style.msTransform = transform;
    this.elemImage.style.mozTransform = transform;
    this.elemImage.style.webkitTransform = transform;
}

Transform.prototype.createHammer = function() {
	var obj = this;
	this.hammertime = Hammer(this.touchArea, this.options).on("touch drag dragend transform transformend", function(event) {
		obj.manageMultiTouch(event);
	});	
}
