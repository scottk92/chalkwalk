// Library of images (Joanna, fill this out)
var imageLibrary = {
	easy:[
		{'answer':'Flower', 'file':'http://www.clker.com/cliparts/O/L/d/K/i/N/simple-flower-md.png'},
		{'answer':'Duck', 'file':'http://clipartist.info/www/COLOURINGBOOK.ORG/Letters/D/duck_line_art_pitr_ducky_icon_black_white_line_art_coloring_book_colouring-2555px.png'},
		{'answer':'Dog', 'file':'https://img1.etsystatic.com/000/0/5473154/il_fullxfull.189199927.jpg'}
	],
	medium:[
		{'answer':'Happy Flower', 'file':'http://media-cache-ak0.pinimg.com/originals/fc/d5/ab/fcd5ab45a97cfa1869ca8eeb2644468f.jpg'},
		{'answer':'Butterfly', 'file':'http://www.coloringpagebook.com/wp-content/uploads/butterfly-simple-shapes-coloring-pages-290x386.jpg'},
		{'answer':'Heart', 'file':'http://www.coloringpagebook.com/wp-content/uploads/heart-simple-shapes-coloring-pages-290x386.jpg'}
	],
	hard:[
		{'answer':'Frog', 'file':'http://media-cache-ak0.pinimg.com/236x/bd/ba/81/bdba81e472a74dd9784caa8f9db347f7.jpg'},
		{'answer':'Strawberry', 'file':'http://www.clipartbest.com/cliparts/Kcn/eb8/Kcneb8jMi.png'},
		{'answer':'Jellyfish', 'file':'http://openclipart.org/image/800px/svg_to_png/181732/Jellyfish_-_Coloring_book.png'}
	]
};

// Returns a random image object (answer and file url) from a library of images.
function getRandomImage(level) {
	var images = imageLibrary[level];
	if (imageLibrary[level] == undefined) images = imageLibrary['easy'];
	return images[Math.floor(Math.random()*images.length)];
}