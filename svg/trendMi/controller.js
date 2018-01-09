//get the points i.e coordinates
var polline=document.getElementById("polyline1");
var points=polline.points;

//define some constants.
var height=550;
//init
for(var i=0;i<points.length;i++){
    /*Both, svg and canvas have a nonordinary Y axis.
    The positive part of the Y axis is below the Zero Point (Point 0,0 the start).
    And negative part is upper the start. so 51 on their y axis is below 50 and -51 tops 51.
    We take that strangeness into account and correct our code accordingly.*/
    points[i].y=height-Math.round(Math.random()*height);
    }

//edit
setInterval(function(){
    for(var i=0;i<points.length-1;i++){
        //push array forward
        points[i].y=points[i+1].y
    }
    //initiate the last one
    points[points.length-1].y=height-Math.round(Math.random()*height);
    //set interval 3/5 second (600 miliseconds)
},600);