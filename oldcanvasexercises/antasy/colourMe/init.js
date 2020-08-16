//create canvas element
var canvas=document.createElement("canvas");
var width=Math.floor(screen.width*0.90);
var height=width/2;
canvas.setAttribute("width",width+"px");
canvas.setAttribute("height",height+"px");
canvas.setAttribute("id","canvas");
document.getElementById("body").appendChild(canvas);

/*init some variables to draw
 */
//define line width
var lineWidth=Math.floor((width/1200)*10);
//define radius and angle increasing rate
var radius=height;
var angle=0.017;

//get canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//call the constructor
var colourMe=drawer(width,height,radius,lineWidth,angle,ctx);

setInterval(colourMe.draw,8);