//draw circle and add some options
function circa(ctx,x,y,radius){
    ctx.fillStyle="#FFFFFF";
    ctx.strokeStyle="#FFFFFF";
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
}
function playMusic(){
    var audio=document.getElementsByTagName("audio")[0];
    audio.currentTime=0;
    audio.play();
}

function drawDice(ctx,coords,side,value){
    var radius=0;
    var x=0;
    var y=0;
    ctx.fillStyle="#3F3F3F";
    ctx.strokeStyle="#3F3F3F";
    ctx.save();
    ctx.beginPath();
    ctx.rect(coords.x,coords.y,side,side);
    ctx.fill();
    ctx.stroke();
    ctx.save();
    switch(value){
        case 1:
            ctx.beginPath();
            radius=Math.round(side/4);
            //move to center and draw a circle
            x=coords.x+Math.round(side/2);
            y=coords.y+Math.round(side/2);
            circa(ctx,x,y,radius);
            break;
        case 2:
            ctx.beginPath();
            radius=Math.round(side/6);
            x=coords.x+2*radius;
            y=coords.y+2*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            x=x+2*radius;
            y=y+2*radius;
            circa(ctx,x,y,radius);
            break;
        case 3:
            ctx.beginPath();
            radius=Math.round(side/8);
            x=coords.x+2*radius;
            y=coords.y+2*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            x=x+2*radius;
            y=y+2*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            x=x+2*radius;
            y=y+2*radius;
            circa(ctx,x,y,radius);
            break;
        case 4:
            ctx.beginPath();
            radius=Math.round(side/8);
            x=coords.x+2*radius;
            y=coords.y+2*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            x=x+4*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            y=y+4*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            x=x-4*radius;
            circa(ctx,x,y,radius);
            break;
        case 5:
            ctx.beginPath();
            radius=Math.round(side/8);
            x=coords.x+2*radius;
            y=coords.y+2*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            x=x+4*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            y=y+4*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            x=x-4*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            x=x+2*radius;
            y=y-2*radius;
            circa(ctx,x,y,radius);
            break;
        case 6:
            ctx.beginPath();
            radius=Math.round(side/10);
            //first
            x=coords.x+2*radius;
            y=coords.y+2*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            //go right
            x=x+6*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            //first two was drawn from left to right
            //go down
            y=y+3*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            //go left
            x=x-6*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            //second two was drawn from right to left
            y=y+3*radius;
            circa(ctx,x,y,radius);
            ctx.save();
            ctx.beginPath();
            x=x+6*radius;
            circa(ctx,x,y,radius);
            //last two was drawn from left to right
            break;
    }
}