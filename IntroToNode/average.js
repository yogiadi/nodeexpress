function average(scores){
	var total=0;
	scores.forEach(function(score){
		total += score;
	});
	var avg=total/scores.length;
	return avg;
}
var scores = [ 20, 40,60,100];
console.log(average(scores));
