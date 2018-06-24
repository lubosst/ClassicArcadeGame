
var HTMLgameDataStart = '<p>%data%</p>';

var display = function(message) {
	//console.log(message);
	var formattedGameData = HTMLgameDataStart.replace('%data%', message);
	$('.game-entry').empty();
	$('.game-entry').append(formattedGameData);
};

display("Your score is " + player.score);