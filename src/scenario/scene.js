/**
 * Created by takovoy on 01.03.2016.
 */

function Scene (width,height){
    Drawing.apply(this,arguments);

    this.wrap = document.createElement('div');
    parsir(scenarioTemplates,this.wrap,this);

    scenarioTemplates.drawing.dom.appendChild(this.DOMObject);
    this.wrap.className     = 'scenario-wrap';
    this.editorContext      = {
        modes: {
            pastObject  : function (event,scene) {
                scene.fps                           = 10;
                if(!scene.editorContext.checkedObject){
                    return
                }
                scene.editorContext.checkedObject.x = event.layerX;
                scene.editorContext.checkedObject.y = event.layerY;
                scene.editorContext.checkedObject.start();
            }
        }
    };

    this.editorContext.mode = this.editorContext.modes.pastObject;
    this.DOMObject.scene    = this;
    this.DOMObject.onclick  = function (event) {
        this.scene.editorContext.mode(event,this.scene);
    };
}

Scene.prototype = Object.create(Drawing.prototype);


PropertyListing.prototype.append = function (object) {
    this.list[object.id] = object;
    var result = this.up(this.parent,object);
    var list = scenarioTemplates.objectManager.childs.list.dom;
    list.innerHTML = '';
    list.appendChild(
        getSceneStructure(object.drawing)
    );
    return this.up(this.parent,object);
};
PropertyListing.prototype.remove = function (id) {
    delete this.list[id];
    this.rem(this.parent);
};