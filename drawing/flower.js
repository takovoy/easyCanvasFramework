﻿/**
 * Created by Пользователь on 21.01.2015.
 */

var sun = new CanvasObject('myFlowerAnimate',canvas,
    {
        shift: 0,
        step: 0.1,
        petalCount: 6
    }
);
sun.x = sun.y = 100;

sun.appendChild(new Curve(
    [
        [100,100],
        [140,200],
        [60,300],
        [100,400]
    ],
    'flowerStem',
    canvas,
    {step: 1,shift: 1,stroke: 'green'}
));

sun.appendChild(new Circle(15,'sunCenter',canvas,{fill: '#FFB151'}));
sun.animate = function(context){
    if(this.childrens['flowerStem'].now.shift <= 100){
        this.childrens['flowerStem'].now.shift++
    } else {
        return;
    }

    if(this.childrens['sunCenter'].radius < 40){
        this.childrens['sunCenter'].radius++;
    } else {
        this.now.step = (this.now.step / 1.5) * 1.4;
    }

    for(var i = 0;i < this.now.petalCount;i++){
        if(!this.childrens['beam_' + i]){
            this.appendChild(new Polygon(3,'beam_' + i,canvas,{radius: 5, fill: '#FFB151'}));
        }
        if(this.childrens['beam_' + i].now.radius < 30){
            this.childrens['beam_' + i].now.radius++;
        }
        this.childrens['beam_' + i].now.radian = (Math.PI*2/this.now.petalCount)*i + this.now.shift;
        this.childrens['beam_' + i].x = formula.getPointOnCircle((Math.PI*2/this.now.petalCount)*i + this.now.shift,70,0,0)[0];
        this.childrens['beam_' + i].y = formula.getPointOnCircle((Math.PI*2/this.now.petalCount)*i + this.now.shift,70,0,0)[1];
    }

    if(this.now.shift > Math.PI*2){
        this.now.shift = 0;
    }
    this.now.shift += this.now.step;
};

window.addEventListener('load',function(){
    sun.start();
});