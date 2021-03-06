/**
 * Created by Пользователь on 21.01.2015.
 */

var scene = new Drawing(1000,500);

var sun = new CanvasObject({
    id          :'myFlowerAnimate',
    drawing     : scene,
    settings        : {
        shift: 0,
        step: 0.1,
        petalCount: 6
    }
});

sun.x = sun.y = 100;

sun.childrens.append(new Curve({
    id              : 'sheet_0',
    drawing         : scene,
    settings        : {step: 1,shift: 0,stroke: 'green'},
    points          : [
        [0,150],
        [50,60],
        [180,280],
        [50,40],
        [70,230],
        [0,150]
    ]
}));

sun.childrens.append(new Curve({
    id              : 'sheet_1',
    drawing         : scene,
    settings        : {step: 1,shift: 0,stroke: 'green'},
    points          : [
        [0,150],
        [-50,60],
        [-180,280],
        [-50,40],
        [-50,230],
        [0,150]
    ]
}));

sun.childrens
    .append(new Curve({
        id              : 'flowerStem',
        drawing         : scene,
        settings        : {step: 1,shift: 1,stroke: 'green'},
        points          : [
            [0,0],
            [40,100],
            [-40,200],
            [0,300]
        ]
    }))
    .operationContext
    .moveProperty('shift',100,3500)
    .operationContext
    .event(50,function(event,transform,canvasObject){
        //transform.pause();
        sun.childrens.list['sheet_0'].transform(new Transform({
            property:'shift',
            end     : 100,
            time    : 3500,
            recourse: false
        }))
            .operationContext
            .event(100,function(event,transform,canvasObject){
                //transform.reverse = true;
            });

        sun.childrens.list['sheet_1'].moveProperty('shift',100,3500);

        sun.animate = function(){};
    });

var beamsCluster = new Cluster(5,{
    radian  : Math.PI*2 / 6,
    x       : function(iteration,cluster){
        return formula.getPointOnCircle(
            (Math.PI*2/6) * (iteration + 1),
            70,
            -cluster.parent.now.x,
            -cluster.parent.now.y
        )[0] / iteration
    },
    y       : function(iteration,cluster){
        return formula.getPointOnCircle(
            (Math.PI*2/6) * (iteration + 1),
            70,
            -cluster.parent.now.x,
            -cluster.parent.now.y
        )[1] / iteration
    }
});

var center = sun.childrens.append(new Circle({
    id              :'sunCenter',
    drawing         : scene,
    settings        : {fill: '#FFB151',x:0,y:0},
    radius          : 15
}))
    .operationContext
    .moveProperty('radius',40,1000)
    .moveProperty('radian',3,1000)
    .moveProperty('fill','#ff5555',1000);

center.childrens
    .append(new Polygon({
        id              : 'beam_',
        settings        : {
            radius      : 5,
            radian      : (Math.PI*2/6),
            fill        : '#FFB151'
        },
        sidesCount      : 3,
        x               : formula.getPointOnCircle(
            (Math.PI*2/6),
            70,
            0,
            0
        )[0],
        y               : formula.getPointOnCircle(
            (Math.PI*2/6),
            70,
            0,
            0
        )[1]
    }))
    .operationContext
    .moveProperty('radius',30,1000)
    .childrens
    .append(beamsCluster);

console.log(beamsCluster);

sun.childrens.list.sunCenter.moveProperty('fill','#ff5555',1000);

sun.animate = function(context){
    if(center.radius >= 39){
        this.now.step = (this.now.step / 1.5) * 1.4;
    }
};
/**
 * Created by takovoy on 25.09.2016.
 */


var plane = new CanvasObject({
    id: 'plane',
    drawing: scene
});

var sky = new CanvasObject({
    id: 'sky',
    drawing: scene
});

var ground = new CanvasObject({
    id: 'ground',
    drawing: scene
});

ground.x = 0;
ground.y = 300;

plane
    .childrens
    .append(sky)
    .childrens
    .append(ground);

ground.childrens.append(new Curve({
    id: 'lastPlane',
    drawing: scene,
    settings        : {step: 1,shift: 100,fill: '#ffffff'},
    points          : [
        [0,0],
        [500,-100],
        [2000,100],
        [2000,400],
        [500,400],
        [0,400]
    ],
    x: -100,
    y: 20
}))
    .operationContext
    .moveProperty('x',0,300)
    .moveProperty('fill','#fce883',600);

ground.childrens.append(new Curve({
    id: 'middlePlane',
    drawing: scene,
    settings        : {step: 1,shift: 100,fill: '#ffffff'},
    points          : [
        [0,0],
        [500,-100],
        [2000,100],
        [2000,400],
        [500,400],
        [0,400]
    ],
    x: -200,
    y: 50
}))
    .operationContext
    .moveProperty('x',0,600)
    .moveProperty('fill','#ffe570',600);

ground.childrens.append(new Curve({
    id: 'firstPlane',
    drawing: scene,
    settings        : {step: 1,shift: 100,fill: '#ffffff'},
    points          : [
        [0,0],
        [500,-100],
        [2000,100],
        [2000,400],
        [500,400],
        [0,400]
    ],
    x: -300,
    y: 100
}))
    .operationContext
    .moveProperty('x',0,800)
    .moveProperty('fill','#fcdd76',600);

sky.childrens.append(new Curve({
    id: 'lastPlane',
    drawing: scene,
    settings        : {step: 1,shift: 100,fill: '#ffffff'},
    points          : [
        [0,0],
        [500,-100],
        [2000,-200],
        [2000,600],
        [500,400],
        [0,400]
    ],
    x: -100,
    y: 0
}))
    .operationContext
    .moveProperty('x',0,300)
    .moveProperty('fill','#e9eef5',900);

sky.childrens.append(new Curve({
    id: 'middlePlane',
    drawing: scene,
    settings        : {step: 1,shift: 100,fill: '#ffffff'},
    points          : [
        [0,0],
        [500,-100],
        [2000,-200],
        [2000,600],
        [500,400],
        [0,400]
    ],
    y: -130
}))
    .operationContext
    .move([0,-180],600)
    .moveProperty('fill','#e6e6fa',1200);

sky.childrens.append(new Curve({
    id: 'firstPlane',
    drawing: scene,
    settings        : {step: 1,shift: 100,fill: '#ffffff'},
    points          : [
        [0,0],
        [500,-100],
        [2000,-200],
        [2000,600],
        [500,400],
        [0,400]
    ],
    y: -180
}))
    .operationContext
    .move([0,-270],800)
    .moveProperty('fill','#d3deed',1800);

plane.start();
/**
 * Created by takovoy on 21.01.2015.
 */


var polygon = new Polygon({
    id          :'myLittlePolygon',
    drawing     : scene,
    settings    :{
        radius  : 30,
        fill    :   getRandomRGB(100,250)
    },
    sidesCount  : 5
});
polygon.x = polygon.y = 100;
/**
 * Created by yeIAmCrasyProgrammer on 28.10.2016.
 */

//var scene   = new Drawing(300,300);

var beamsCluster = new Cluster(8,{
    radian  : function (iterator,cluster) {
        return Math.PI*2 / (cluster.count + 1);
    },
    x       : function(iteration,cluster){
        return formula.getPointOnCircle(
                (Math.PI*2/(cluster.count + 1)) * (iteration + 1),
                70,
                -cluster.parent.now.x,
                -cluster.parent.now.y
            )[0] / iteration
    },
    y       : function(iteration,cluster){
        return formula.getPointOnCircle(
                (Math.PI*2/(cluster.count + 1)) * (iteration + 1),
                70,
                -cluster.parent.now.x,
                -cluster.parent.now.y
            )[1] / iteration
    }
});

var center  = new Circle({
    id              :'sunCenter',
    drawing         : scene,
    settings        : {fill: '#FFB151',x:150,y:150},
    radius          : 15
}).start();
//#054dca - синий цвет
center
    .moveProperty('radius',47,1500)
    .operationContext
    .event('callback', function (event, transform, canvasObject) {
        canvasObject
            .moveProperty('radius',45,1000)
            .operationContext
            .event(0,function (event, transform, canvasObject) {
                transform.reverse = false;
            })
            .event(100,function (event, transform, canvasObject) {
                transform.reverse = true;
            });
        canvasObject.childrens.list[1]
            .moveProperty('radius',40,1000)
            .operationContext
            .event(0,function (event, transform, canvasObject) {
                transform.reverse = false;
            })
            .event(100,function (event, transform, canvasObject) {
                transform.reverse = true;
            });
        canvasObject.childrens.list[2]
            .moveProperty('radius',30,800);
    });

//center
//    .moveProperty('radian',Math.PI*2,50000)
//    .operationContext
//    .options.recourse = true;

center
    .append(new Circle  ({
        id              : 1,
        settings        : {fill: '#ff8951'},
        radius          : 35
    }))
    .append(new Circle  ({
        id              : 2,
        settings        : {fill: '#ff5555'},
        radius          : 35
    }))
    .append(new Curve   ({
        id              : 'light',
        settings        : {
            fill        : '#FFB151',
            shift       : 100,
            step        : 1,
            radian      : 0
        },
        x               : formula.getPointOnCircle(
            (Math.PI*2/beamsCluster.count),
            70,
            0,
            0
        )[0],
        y               : formula.getPointOnCircle(
            (Math.PI*2/beamsCluster.count),
            70,
            0,
            0
        )[1],
        points          : [
            [0,0],
            [20,0],
            [45,50],
            [-50,10],
            [0,130],
            [50,10],
            [-45,50],
            [-20,0],
            [0,0]
        ]
    }))
    .operationContext
    .append(beamsCluster)
    .moveProperty('points',[
        [0,0],
        [20,0],
        [50,50],
        [-60,10],
        [0,150],
        [60,10],
        [-50,50],
        [-20,0],
        [0,0]
    ],400)
    .operationContext
    .options.recourse = true;

//scene.DOMObject.onmouseover = function () {
//    center
//        .moveProperty('fill','#054dca',1000)
//        .transform().list.radian.reverse = true;
//
//    center.childrens.list[1]
//        .moveProperty('fill','#054dca',1000);
//    center.childrens.list[2]
//        .moveProperty('fill','#054dca',1000);
//    center.childrens.list.light
//        .moveProperty('fill','#054dca',1000);
//};
//
//scene.DOMObject.onmouseout = function () {
//    center
//        .moveProperty('fill','#FFB151',1000)
//        .transform().list.radian.reverse = false;
//
//    center.childrens.list[1]
//        .moveProperty('fill','#ff8951',1000);
//    center.childrens.list[2]
//        .moveProperty('fill','#ff5555',1000);
//    center.childrens.list.light
//        .moveProperty('fill','#FFB151',1000);
//};