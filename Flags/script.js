let line1 = document.createElement('div');
line1.id="line1";
line1.classList.add('red','line');

document.body.appendChild(line1);

let line2=document.createElement('div');
line2.id="line2";
line2.classList.add('red','line');

window.setTimeout(function(){
document.body.appendChild(line2);
},3000);

let topLeftHLine= document.createElement('div');
topLeftHLine.id="topLeftHorizontal";
topLeftHLine.classList.add('red','line','hline');

window.setTimeout(function(){
document.body.appendChild(topLeftHLine);
},6000);

let topLeftVLine= document.createElement('div');
topLeftVLine.id="topLeftVertical";
topLeftVLine.classList.add('red','line','vline');

window.setTimeout(function(){
document.body.appendChild(topLeftVLine);
},9000);

let topRightHLine= document.createElement('div');
topRightHLine.id="topRightHorizontal";
topRightHLine.classList.add('red','line','hline');

window.setTimeout(function(){
document.body.appendChild(topRightHLine);
},12000);

let topRightVLine= document.createElement('div');
topRightVLine.id="topRightVertical";
topRightVLine.classList.add('red','line','vline');

window.setTimeout(function(){
document.body.appendChild(topRightVLine);
},15000);

let bottomLeftHLine= document.createElement('div');
bottomLeftHLine.id="bottomLeftHorizontal";
bottomLeftHLine.classList.add('red','line','hline');

window.setTimeout(function(){
document.body.appendChild(bottomLeftHLine);
},18000);

let bottomLeftVLine= document.createElement('div');
bottomLeftVLine.id="bottomLeftVertical";
bottomLeftVLine.classList.add('red','line','vline');

window.setTimeout(function(){
document.body.appendChild(bottomLeftVLine);
},21000);

let bottomRightHLine= document.createElement('div');
bottomRightHLine.id="bottomRightHorizontal";
bottomRightHLine.classList.add('red','line','hline');

window.setTimeout(function(){
document.body.appendChild(bottomRightHLine);
},24000);

let bottomRightVLine= document.createElement('div');
bottomRightVLine.id="bottompRightVertical";
bottomRightVLine.classList.add('red','line','vline');

window.setTimeout(function(){
document.body.appendChild(bottomRightVLine);
},27000);
