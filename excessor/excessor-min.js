function Cluster(t,i){this.parameters={list:{},iteration:!1},CanvasObject.apply(this,[{}]),this.correlation=i||{},this.count=t,this.iteration=1,this.constructor=Cluster}function Drawing(t,i){this.DOMObject=document.createElement("canvas"),this.DOMObject.width=t||0,this.DOMObject.height=i||0,this.context=this.DOMObject.getContext("2d"),this.stack=new PropertyListing,this._fps=0,this.core=!1}function Transform(t){this.options=t=t||{},this.id=t.property||""+Math.random(),this.options.rate=t.rate||1,this.options.factor=t.factor||1,this.options.endShift=t.endShift||100,this.options.startShift=+t.startShift||0,this.options.shift=t.shift||this.options.startShift,this.options.start=t.start||0,this.options.end=t.end,this.options.time=+t.time,this.events=new Listing,this.options.recourse=!!t.recourse,this.reverse=!1}function markControlPoints(t,i,n){n=n||{},i.moveTo(+n.x,+n.y),i.arc(+n.x,+n.y,2,0,2*Math.PI);for(var s=0;t[s];s++)"object"!=typeof t[s][0]?(i.moveTo(t[s][0]+ +n.x,t[s][1]+ +n.y),i.arc(t[s][0]+ +n.x,t[s][1]+ +n.y,2,0,2*Math.PI)):markControlPoints(t[s],i,n)}function isNotNegativeNumber(t){return"number"==typeof+t&&+t>=0}function isHEXColor(t){return 7===t.length&&0===t.search(/#[0-9a-fA-F]{6}/i)}function isRGB(t){return 0===t.search(/rgb\((\d{1,3},){2}\d{1,3}\)/i)}function isRGBA(t){return 0===t.search(/rgba\((\d{1,3},){3}(\d(\.\d+)?)\)/i)}function isColor(t){return isHEXColor(t)||isRGB(t)||isRGBA(t)}function random(t,i){return Math.floor(Math.random()*(i-t+1))+t}function getRandomRGB(t,i){return"rgb("+random(t,i)+","+random(t,i)+","+random(t,i)+")"}function toIdentifyTheLine(t,i,n,s){n=n||{},s&&i.moveTo(t[0][0]+ +n.x,t[0][1]+ +n.y);for(var o=0;t[o];o++)"object"!=typeof t[o][0]?i.lineTo(t[o][0]+ +n.x,t[o][1]+ +n.y):toIdentifyTheLine(t[o],i,n)}function toIdentifyTheCurve(t,n,s,o){s=s||{},o&&n.moveTo(t[0][0]+ +s.x,t[0][1]+ +s.y);for(var e=0;t[e];e++){var r=formula.getPointOnCurve(i,this.now.points);n.lineTo(r[0]+this.parent.x,r[1]+this.parent.y)}}function Point(t){}function Polyline(t){CanvasObject.apply(this,arguments),this.constructor=Polyline,this.now.points=t.points}function EventsListing(){this.list={}}function Listing(){this.list={},this.append=function(t,i){this.list[t]=i},this.remove=function(t){delete this.list[t]}}function PropertyListing(t,i,n){this.list={},this.up=t||function(){},this.rem=i||function(){},this.parent=n}var CanvasObject=function(t){t=t||{},this.id=t.id||""+Math.random(),this.now=t.settings||{},this.now.x=this.now.x||t.x||0,this.now.y=this.now.y||t.y||0,this.now.radian=this.now.radian||t.radian||0,this.services={},this._transform=new Listing,this.childrens=new PropertyListing(function(t,i){return i.parent=t,i.drawing=t.drawing,t.operationContext=i,t},function(t){},this),this.drawing=t.drawing||void 0};Object.defineProperties(CanvasObject.prototype,{x:{get:function(){return this.parent?this.now.x*Math.cos(this.parent.radian)-this.now.y*Math.sin(this.parent.radian)+this.parent.x:+this.now.x},set:function(t){this.now.x=+t}},y:{get:function(){return this.parent?this.now.x*Math.sin(this.parent.radian)+this.now.y*Math.cos(this.parent.radian)+this.parent.y:+this.now.y},set:function(t){this.now.y=+t}},radian:{get:function(){return this.parent?+this.parent.radian+ +this.now.radian:+this.now.radian},set:function(t){this.now.radian=+t}}}),CanvasObject.prototype.start=function(){return this.drawing.stack.append(this),this},CanvasObject.prototype.stop=function(){return this.drawing.stack.remove(this.id),this},CanvasObject.prototype.animate=function(){},CanvasObject.prototype.transform=function(t){return this._transform||(this._transform=new Listing),t?(this._transform.append(t.id,t),this.operationContext=t,this):this._transform},CanvasObject.prototype.move=function(t,i){return i?this.transform(new Transform({property:"trajectory",type:"line",points:[[this.x,this.y],t],time:i})):(this.x=t[0],void(this.y=t[1]))},CanvasObject.prototype.moveProperty=function(t,i,n){return n?this.transform(new Transform({property:t,start:this.now[t],end:i,time:n})):void(this.now[t]=i)},CanvasObject.prototype.append=function(t){return this.childrens.append(t)};var changeContext=function(t,i){for(var n in i)dataContextChanges[n]&&i[n]&&dataContextChanges[n](t,i[n])},dataContextChanges={fill:function(t,i){t.fillStyle=i,t.fill()},stroke:function(t,i){t.strokeStyle=i,t.stroke()},lineWidth:function(t,i){t.lineWidth=+i}};Cluster.prototype=Object.create(CanvasObject.prototype),Cluster.prototype.transform=function(){return this._transform||(this._transform=new Listing),this._transform},Cluster.prototype.animate=function(){return this.iteration>this.count?void(this.iteration=1):(this._animate=this.parent.animate,this._animate(this.drawing.context),this.iteration++,void this.animate())},Object.defineProperties(Cluster.prototype,{now:{get:function(){if(this.parameters.iteration!==this.iteration&&this.parent){for(var t in this.parent.now)if(this.correlation[t]){var i=+this.correlation[t];"function"==typeof this.correlation[t]&&(i=+this.correlation[t](this.iteration,this)),this.parameters.list[t]=this.parent.now[t]+i*this.iteration}else this.parameters.list[t]=this.parent.now[t];this.parameters.iteration=+this.iteration}return this.parameters.list},set:function(t){return this.parameters.list}},x:{get:function(){return this.parent.parent?this.now.x*Math.cos(this.parent.parent.radian)-this.now.y*Math.sin(this.parent.parent.radian)+this.parent.parent.x:+this.now.x},set:function(t){this.now.x=+t}},y:{get:function(){return this.parent.parent?this.now.x*Math.sin(this.parent.parent.radian)+this.now.y*Math.cos(this.parent.parent.radian)+this.parent.parent.y:+this.now.y},set:function(t){this.now.y=+t}},radian:{get:function(){return this.parent?+this.parent.parent.radian+ +this.now.radian:+this.now.radian},set:function(t){this.now.radian=+t}}});var formula={getPointOnCircle:function(t,i,n,s){n=+n||0,s=+s||0;var o=+i*Math.sin(+t),e=+i*Math.cos(+t);return[n+e,s+o]},getPointOnEllipse:function(t,i,n,s,o,e){s=s||0,s*=-1;var r=t*Math.cos(+n),a=i*Math.sin(+n),h=r*Math.cos(s)+a*Math.sin(s),p=-r*Math.sin(s)+a*Math.cos(s);return[h+o,p+e]},getPointsFromPolygon:function(t,i,n,s,o){var e=[];e.push(this.getPointOnCircle(i,n,s,o));for(var r=0;r<t;r++)e.push(this.getPointOnCircle(2*Math.PI/t*r+i,n,s,o));return e},getPointOnCurve:function(t,i){if(2==i.length)return this.getPointOnLine(t,i);for(var n=[],s=1;s<i.length;s++)n.push(this.getPointOnLine(t,[i[s-1],i[s]]));return this.getPointOnCurve(t,n)},getPointOnLine:function(t,i){var n=(i[1][0]-i[0][0])*(t/100)+i[0][0],s=(i[1][1]-i[0][1])*(t/100)+i[0][1];return[n,s]},getCenterToPointDistance:function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2))},HEXtoRGBA:function(t){var i=[];return i[0]=parseInt(t.substring(1,3),16),i[1]=parseInt(t.substring(3,5),16),i[2]=parseInt(t.substring(5),16),i[3]=1,i},RGBtoRGBA:function(t){var i=t.match(/\d{1,3}(\.\d+)?/g);return"0"===i[3]?i[3]=0:i[3]=+i[3]||1,i},changeColor:function(t,i,n){var s=[];isRGBA(t)||isRGB(t)?t=formula.RGBtoRGBA(t):isHEXColor(t)&&(t=formula.HEXtoRGBA(t)),isRGBA(i)||isRGB(i)?i=formula.RGBtoRGBA(i):isHEXColor(i)&&(i=formula.HEXtoRGBA(i));for(var o=0;o<3;o++)s[o]=Math.round(+t[o]+(+i[o]-+t[o])/100*n);var e=+(+t[3]+(+i[3]-+t[3])/100*n).toFixed(4);return"rgba("+s[0]+","+s[1]+","+s[2]+","+e+")"}},dynamic={move:function(t){var i=t.transform().list,n=t.drawing.fps,s=1e3/+n;for(var o in i){var e=i[o];options=e.options,e.event("start")&&e.events.list.start(e.event("start"),e,t),options.step||(options.step=(options.endShift-options.startShift)/(options.time/s)),e.reverse?options.shift-=+options.step*options.rate:options.shift+=+options.step*options.rate,this.data[o]?this.data[o].prepareData(t):t.now[o]=options.start+(options.end-options.start)/100*options.shift;for(var r in e.events.list)if(!isNaN(+r)){if(e.reverse){if(+r>options.shift||+r<options.shift-options.step)continue}else if(+r<options.shift||+r>options.shift+options.step)continue;e.events.list[r](e.event(r),e,t)}if(e.reverse){if(options.shift>options.startShift)continue}else if(options.shift<options.endShift)continue;t.transform().remove(o),e.options.recourse&&(e.reverse?e.options.shift=e.options.endShift:e.options.shift=e.options.startShift,t.transform(e)),e.event("callback")&&(e.event("callback")(e.event("callback"),e,t),e.events.remove("callback"))}},data:{trajectory:{type:"trajectory",prepareData:function(t){var i=this.type,n=t.transform().list[i],s=this.functions[n.options.type](n.options);t.x=s[0],t.y=s[1]},functions:{circle:function(t){var i=2*Math.PI/100*t.shift;return t.reverse&&(i=2*Math.PI-2*Math.PI/100*t.shift),formula.getPointOnCircle(i,t.radius,t.center[0],t.center[1])},polygon:function(t){},line:function(t){return formula.getPointOnLine(t.shift,t.points)},curve:function(t){return formula.getPointOnCurve(t.shift,t.points)}}},fill:{type:"fill",prepareData:function(t){var i=this.type,n=t.transform().list[i],s=n.options.start,o=n.options.end,e=n.options.shift;t.now.fill=formula.changeColor(s,o,e)}},stroke:{type:"stroke",prepareData:function(t){var i=this.type,n=t.transform().list[i],s=n.options.start,o=n.options.end,e=n.options.shift;t.now.stroke=formula.changeColor(s,o,e)}},points:{type:"points",prepareData:function(t){var i=this.type,n=t.transform().list[i],s=n.options.start,o=n.options.end,e=n.options.shift;t.now.points=this.functions.pointsRecourse(s,o,e)},functions:{pointsRecourse:function(t,i,n){for(var s=[],o=0;o<t.length||o<i.length;o++)if(typeof t[o]==typeof i[o]&&t[o]){if("object"!=typeof t[o]){s=formula.getPointOnLine(n,[t,i]);break}s[o]=this.pointsRecourse(t[o],i[o],n)}else s[o]=t[o];return s}}}}};Drawing.prototype.render=function(t,i){t.id=i,this.context.beginPath(),this.context.fillStyle="#000000",this.context.strokeStyle="#000000",this.context.closePath(),dynamic.move(t),t.animate(this.context);for(var n in t.childrens.list)this.render(t.childrens.list[n],n)},Drawing.prototype.pause=function(){var t=this.fps;this.fps=0,this._fps=t},Drawing.prototype.play=function(){this.fps=this.fps},Object.defineProperty(Drawing.prototype,"fps",{get:function(){return this._fps},set:function(t){var i=this;this.core&&clearInterval(this.core),0!=t&&(this.core=setInterval(function(){i.context.clearRect(0,0,i.DOMObject.width,i.DOMObject.height);for(var t in i.stack.list)i.render(i.stack.list[t],t)},1e3/+t)),this._fps=t}}),Transform.prototype.play=function(t){return this.options.rate=t||1,this},Transform.prototype.pause=function(){return this.options.rate=0,this},Transform.prototype.stop=function(){return this.options.rate=0,this.reverse?this.options.shift=this.options.endShift:this.options.shift=this.options.startShift,this},Transform.prototype.repeat=function(){this.reverse?this.options.shift=this.options.endShift:this.options.shift=this.options.startShift},Transform.prototype.event=function(t,i){return i?(this.events.append(t,i),this):this.events.list[t]};var Circle=function(t){CanvasObject.apply(this,arguments),this.constructor=Circle,this.now.radius=t.radius};Circle.prototype=Object.create(CanvasObject.prototype),Circle.prototype.animate=function(t){t.beginPath(),t.arc(this.x,this.y,this.now.radius,0,2*Math.PI),changeContext(t,this.now),t.closePath()};var Curve=function(t){CanvasObject.apply(this,arguments),this.constructor=Curve,this.now.points=this.now.points||t.points||[],this.services.points=[]};Curve.prototype=Object.create(CanvasObject.prototype),Object.defineProperties(CanvasObject.prototype,{points:{get:function(){if(this.radian!=this.services.radian){this.services.points||(this.services.points=[]);var t=this.radian-Math.PI/4;for(var i in this.now.points)this.services.points[i]=[this.now.points[i][0]*Math.cos(t)-this.now.points[i][1]*Math.sin(t),this.now.points[i][0]*Math.sin(t)+this.now.points[i][1]*Math.cos(t)];this.services.radian=this.radian}return this.services.points},set:function(t){this.now.points=t}}}),Curve.prototype.animate=function(t){if(!(this.now.points.length<2)){this.now.showBreakpoints&&(t.beginPath(),markControlPoints(this.points,t,this),t.fill(),t.closePath()),t.beginPath(),t.moveTo(this.points[0][0]+this.x,this.points[0][1]+this.y),this.now.shift>101&&(this.now.shift=101);for(var i=0;i<=this.now.shift;i+=this.now.step){var n=formula.getPointOnCurve(i,this.points);t.lineTo(n[0]+this.x,n[1]+this.y)}changeContext(t,this.now),t.closePath()}};var Ellipse=function(t,i,n){this.now=n||{},this.id=t||""+Math.random(),this.constructor=Ellipse,i&&(this.drawingObject=i),this.now.step=this.now.step||.1};Ellipse.prototype=Object.create(CanvasObject.prototype),Ellipse.prototype.animate=function(t){t.beginPath();var i=0,n=formula.getPointOnEllipse(this.now.semiAxisX,this.now.semiAxisY,i,this.now.radian,this.x,this.y);for(t.moveTo(n[0],n[1]);i<=2*Math.PI;i+=this.now.step){var s=formula.getPointOnEllipse(this.now.semiAxisX,this.now.semiAxisY,i,this.now.radian,this.x,this.y);t.lineTo(s[0],s[1])}t.lineTo(n[0],n[1]),changeContext(t,this.now),t.closePath()};var Line=function(t){CanvasObject.apply(this,arguments),this.constructor=Line,this.now.points=this.now.points||t.points||[],this.services.points=[]};Line.prototype=Object.create(CanvasObject.prototype),Line.prototype.animate=function(t){if(!(this.now.points.length<2)){t.beginPath(),t.moveTo(this.points[0][0]+this.x,this.points[0][1]+this.y),this.now.shift>101&&(this.now.shift=101);for(var i=0;i<=this.now.shift;i+=this.now.step){var n=formula.getPointOnLine(i,this.points);t.lineTo(n[0]+this.x,n[1]+this.y)}changeContext(t,this.now),t.closePath()}};var Polygon=function(t){CanvasObject.apply(this,arguments),this.constructor=Polygon,this.now.sidesCount=t.sidesCount,this.now.radian||(this.now.radian=Math.PI/180*270)};Polygon.prototype=Object.create(CanvasObject.prototype),Polygon.prototype.animate=function(t){if(this.now.sidesCount<3)return!1;t.beginPath(),t.moveTo(formula.getPointOnCircle(this.radian,this.now.radius,this.x,this.y)[0],formula.getPointOnCircle(this.radian,this.now.radius,this.x,this.y)[1]);for(var i=0;i<this.now.sidesCount;i++)t.lineTo(formula.getPointOnCircle(2*Math.PI/this.now.sidesCount*i+this.radian,this.now.radius,this.x,this.y)[0],formula.getPointOnCircle(2*Math.PI/this.now.sidesCount*i+this.radian,this.now.radius,this.x,this.y)[1]);t.lineTo(formula.getPointOnCircle(this.radian,this.now.radius,this.x,this.y)[0],formula.getPointOnCircle(this.radian,this.now.radius,this.x,this.y)[1]),changeContext(t,this.now),t.closePath()},Polyline.prototype=Object.create(CanvasObject.prototype),Polyline.prototype.animate=function(t){if(!(this.now.points.length<2)){this.now.showBreakpoints&&(t.beginPath(),markControlPoints(this.now.points,t,this),t.fill(),t.closePath()),t.beginPath(),t.moveTo(this.now.points[0][0]+this.x,this.now.points[0][1]+this.y),this.now.shift>101&&(this.now.shift=101);for(var i=0;i<=this.now.shift;i+=this.now.step){var n=formula.getPointOnCurve(i,this.now.points);t.lineTo(n[0]+this.parent.x,n[1]+this.parent.y)}changeContext(t,this.now),t.closePath()}},EventsListing.prototype.append=function(t,i,n){this.list[t]||(this.list[t]={}),this.list[t][i]||(this.list[t][i]=[]),this.list[t][i].push(n)},EventsListing.prototype.remove=function(t,i){return i?(delete this.list[t][i],void(0==Object.keys(this.list[t]).length&&delete this.list[t])):void delete this.list[t]},PropertyListing.prototype.append=function(t){return this.list[t.id]=t,this.up(this.parent,t)},PropertyListing.prototype.remove=function(t){delete this.list[t],this.rem(this.parent)},PropertyListing.prototype.getObject=function(t,i){if(i){for(var n in this.list){if(n==t)return this.list[n];var s=this.list[n].childrens.getObject(t,!0);if(s)return s}return!1}return this.list[t]},PropertyListing.prototype.getObjectsMap=function(){var t={};for(var i in this.list)t[i]=this.list[i].childrens.getObjectsMap();return t};