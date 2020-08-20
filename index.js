var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var input = document.getElementById('eqn');
var scale = document.getElementById('scale');
var width = canvas.width;
var height = canvas.height;

function draw() {
	var axes={};
	axes.x = 0.5 + 0.5*canvas.width;  
	axes.y = 0.5 + 0.5*canvas.height;                  
	axes.neg = true;
    showAxes(c, axes);
}

//Drawing the axes and the quadrants
function showAxes(c, axes) {
    var x = axes.x, 
        w = c.canvas.width;
    var y = axes.y, 
        h = c.canvas.height;
    var xmin = axes.neg ? 0 : x0;
    c.beginPath();
    c.strokeStyle = 'white'; 
    c.moveTo(xmin, y);
    c.lineTo(w, y);  
    c.moveTo(x, 0);
    c.lineTo(x, h);  
    c.stroke();
    c.font = '15px Times New Roman';
    c.fillText('I', 3*w/4, h/4);
    c.strokeText('I', 3*w/4, h/4);
    c.fillText('II', w/4, h/4);
    c.strokeText('II', w/4, h/4);
    c.fillText('III', w/4, 3*h/4);
    c.strokeText('III', w/4, 3*h/4);
    c.fillText('IV', 3*w/4, 3*h/4);
    c.strokeText('IV', 3*w/4, 3*h/4);
}

//Plotting the graph
function plot() {
    c.clearRect(0, 0, width, height);
	draw();
	c.save();
	c.translate((width/2), (height/2));

	let scope = {
	    x: -width/2
	}
	const node = math.parse(input.value, scope);
	const code = node.compile();	
	code.evaluate(scope);

	c.beginPath();

	var firstClick = true;

	for(var i = -width/2; i <= width/2; i=i+0.06) {
		scope.x = i;
        if(firstClick == true) {
			firstClick = false;
			c.moveTo(i*scale.value, scale.value*-1*code.evaluate(scope));
		}
		else {
			c.lineTo(scale.value*i, -1*scale.value*code.evaluate(scope));
			c.strokeStyle = "aqua";
			c.lineWidth = 0.1;
			c.stroke();
		}
    }
    c.restore();
}

//Responding to ENTER
input.addEventListener("keyup", function(event){

	if(event.keyCode == 13) {
		plot();
	}

});

scale.addEventListener("keyup", function(event){

	if(event.keyCode == 13) { 
		plot();
	}

});

draw();
plot();