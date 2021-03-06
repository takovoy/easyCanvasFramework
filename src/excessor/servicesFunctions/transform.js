/**
 * Created by 1 on 11.11.2015.
 */

function Transform ( options ) {
    // yes, this row is right
    this.options = options = options || {};
    this.id                 = options.property || '' + Math.random();
    this.options.rate       = options.rate || 1;
    this.options.factor     = options.factor || 1;
    this.options.endShift   = options.endShift || 100;
    this.options.startShift = +options.startShift || 0;
    this.options.shift      = options.shift || this.options.startShift;
    this.options.start      = options.start || 0;
    this.options.end        = options.end;
    this.options.time       = +options.time;
    this.events             = new Listing();
    this.options.recourse   = !!options.recourse;
    this.reverse            = false;
}

Transform.prototype.play = function(rate){
    this.options.rate = rate || 1;
    return this;
};
Transform.prototype.pause = function(){
    this.options.rate = 0;
    return this
};
Transform.prototype.stop = function(){
    this.options.rate   = 0;
    if(!this.reverse){
        this.options.shift  = this.options.startShift;
    } else {
        this.options.shift  = this.options.endShift;
    }
    return this;
};
Transform.prototype.repeat= function(){
    if(!this.reverse){
        this.options.shift  = this.options.startShift;
    } else {
        this.options.shift  = this.options.endShift;
    }
};
Transform.prototype.event = function(shift,action){
    if(!action){
        return this.events.list[shift];
    }
    this.events.append(shift,action);
    return this;
};

Object.defineProperties(Transform.prototype,{
    shift : {
        get: function(){
            if(this.options.timingFunction){
                return this.options.shift * formula.getPointOnCurve(this.options.shift,this.timingFunction)[1];
            }

            return this.options.shift;
        },
        set: function(value){
            return this.shift;
        }
    },
    timingFunction : {
        get: function(){
            var array = [[0,0]];
            array = array.concat(this.options.timingFunction);
            array.push([1,1]);

            return array;
        },
        set: function(value){
            this.options.timingFunction = value;
        }
    }
});