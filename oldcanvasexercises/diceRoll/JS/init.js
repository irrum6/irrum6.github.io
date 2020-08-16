//create canvas element
var canvas=document.createElement("canvas");
var width=Math.round(window.innerWidth*0.80);
if(width%2!=0){width=width+1;}
var height=width/2;
canvas.setAttribute("width",width+"px");
canvas.setAttribute("height",height+"px");
canvas.setAttribute("id","canvas");
document.getElementsByTagName("div")[1].appendChild(canvas);

//recalculate dimensions to make room for elements
window.onresize=function() {
    width = Math.round(window.innerWidth * 0.80);
    if (width % 2 != 0) {
        width = width + 1;
        height = width / 2;
    }
    alert("Please,reload page to adjust changes");
};
var ctx=document.getElementById("canvas").getContext('2d');

document.getElementById("btn1").onclick=function(){
    var side=Math.round(height*0.8);
    var coords={x:Math.round((height-side)/2),y:Math.round((height-side)/2)};
    drawDice(ctx,coords,side,Math.round(Math.random()*5+1));
    coords={x:height,y:Math.round((height-side)/2)};
    drawDice(ctx,coords,side,Math.round(Math.random()*5+1));
    playMusic();
};