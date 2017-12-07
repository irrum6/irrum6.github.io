var block1= document.createElement('div');
block1.id="block1";
block1.className="xpander";

document.body.appendChild(block1);

var block2= document.createElement('div');
block2.id="block2";
block2.className="xpander";

window.setTimeout(function(){
document.body.appendChild(block2);
},4000);