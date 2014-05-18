// Library of images (Joanna, fill this out)
var imageLibrary = [
	{'answer':'Flower', 'file':'http://www.clker.com/cliparts/O/L/d/K/i/N/simple-flower-md.png'},
	{'answer':'Duck', 'file':'http://clipartist.info/www/COLOURINGBOOK.ORG/Letters/D/duck_line_art_pitr_ducky_icon_black_white_line_art_coloring_book_colouring-2555px.png'},
	{'answer':'Dog', 'file':'https://img1.etsystatic.com/000/0/5473154/il_fullxfull.189199927.jpg'}
];

// Returns a random image object (name and url) from a library of images.
function getRandomImage() {
	return imageLibrary[Math.floor(Math.random()*imageLibrary.length)];
}