// Library of images (Joanna, fill this out)
var imageLibrary = {
	easy:[
		{'answer':'Flower', 'file':'http://www.clker.com/cliparts/O/L/d/K/i/N/simple-flower-md.png'},
		{'answer':'Duck', 'file':'http://clipartist.info/www/COLOURINGBOOK.ORG/Letters/D/duck_line_art_pitr_ducky_icon_black_white_line_art_coloring_book_colouring-2555px.png'},
		{'answer':'Dog', 'file':'https://img1.etsystatic.com/000/0/5473154/il_fullxfull.189199927.jpg'},
		{'answer':'Apple', 'file':'../images/apple.GIF'},
		{'answer':'Eggplant', 'file':'../images/eggplant.png'},
		{'answer':'Banana', 'file':'../images/banana.gif'},
		{'answer':'Donut', 'file':'../images/donut.jpg'},
		{'answer':'Fish', 'file':'../images/fish.jpg'},
		{'answer':'Tulip', 'file':'../images/tulip.jpg'},
		{'answer':'Jellyfish', 'file':'../images/jellyfish.jpg'},
		{'answer':'Kite', 'file':'../images/kite.jpg'},
		{'answer':'Leaf', 'file':'../images/leaf.gif'},
		{'answer':'Pear', 'file':'../images/pear.jpg'},
		{'answer':'Popsicle', 'file':'../images/popsicle.png'},
		{'answer':'Rocket', 'file':'../images/rocket.jpg'},
		{'answer':'Strawberry', 'file':'../images/strawberry.png'},
		{'answer':'Sun', 'file':'../images/sun.png'},
		{'answer':'Watermelon', 'file':'../images/watermelon.png'}

	],
	medium:[
		{'answer':'Happy Flower', 'file':'http://media-cache-ak0.pinimg.com/originals/fc/d5/ab/fcd5ab45a97cfa1869ca8eeb2644468f.jpg'},
		{'answer':'Butterfly', 'file':'http://www.coloringpagebook.com/wp-content/uploads/butterfly-simple-shapes-coloring-pages-290x386.jpg'},
		{'answer':'Heart', 'file':'http://www.coloringpagebook.com/wp-content/uploads/heart-simple-shapes-coloring-pages-290x386.jpg'},
		{'answer':'Bell', 'file':'../images/bell.jpg'},
		{'answer':'Bat', 'file':'../images/bat.gif'},
		{'answer':'Bear', 'file':'../images/bear.png'},
		{'answer':'Bird', 'file':'../images/bird.jpg'},
		{'answer':'Cherry', 'file':'../images/cherry.gif'},
		{'answer':'Chick', 'file':'../images/chick.gif'},
		{'answer':'Guitar', 'file':'../images/guitar.gif'},
		{'answer':'Pizza', 'file':'../images/pizza.png'},
		{'answer':'Turtle', 'file':'../images/turtle.gif'},
		{'answer':'Whale', 'file':'../images/whale.jpg'}
	],
	hard:[
		{'answer':'Frog', 'file':'http://media-cache-ak0.pinimg.com/236x/bd/ba/81/bdba81e472a74dd9784caa8f9db347f7.jpg'},
		{'answer':'Strawberry', 'file':'http://www.clipartbest.com/cliparts/Kcn/eb8/Kcneb8jMi.png'},
		{'answer':'Jellyfish', 'file':'http://openclipart.org/image/800px/svg_to_png/181732/Jellyfish_-_Coloring_book.png'},
		{'answer':'Cheese', 'file':'../images/cheese.jpg'},
		{'answer':'Snail', 'file':'../images/snail.gif'},
		{'answer':'Airplane', 'file':'../images/airplane.jpg'},
		{'answer':'Dinosaur', 'file':'../images/dinosaur.gif'},
		{'answer':'Rabbit', 'file':'../images/rabbit.gif'},
		{'answer':'Duck', 'file':'../images/duck.gif'},
		{'answer':'Elephant', 'file':'../images/elephant.jpg'},
		{'answer':'Giraffe', 'file':'../images/giraffe.jpg'},
		{'answer':'Owl', 'file':'../images/owl.gif'},
		{'answer':'Squid', 'file':'../images/squid.png'}
	]
};

// Returns a random image object (answer and file url) from a library of images.
function getRandomImage(level) {
	var images = imageLibrary[level];
	if (imageLibrary[level] == undefined) images = imageLibrary['easy'];
	return images[Math.floor(Math.random()*images.length)];
}
