function Drawing(t,i){this.DOMObject=document.createElement("canvas"),this.DOMObject.width=t||0,this.DOMObject.height=i||0,this.context=this.DOMObject.getContext("2d"),this.stack=new PropertyListing,this._fps=0,this.core=!1}function EventsListing(){this.list={}}function Listing(){this.list={},this.append=function(t,i){this.list[t]=i},this.remove=function(t){delete this.list[t]}}function PropertyListing(t,i,n){this.list={},this.up=t||function(){},this.rem=i||function(){},this.parent=n}function CanvasObject(t){t=t||{},this.id=t.id||""+Math.random(),this.now=t.settings||{},this.now.x=this.now.x||t.x||0,this.now.y=this.now.y||t.y||0,this.now.radian=this.now.radian||t.radian||0,this.services={},this._transform=new Listing,this.childrens=new PropertyListing(function(t,i){return i.parent=t,i.drawing=t.drawing,t.operationContext=i,t},function(t){},this),this.drawing=t.drawing||void 0}function Circle(t){CanvasObject.apply(this,arguments),this.constructor=Circle,this.now.radius=this.now.radius||t.radius||0,this.now.shift=this.now.shift||t.shift||100}function Cluster(t,i){this.parameters={list:{},iteration:!1},CanvasObject.apply(this,[{}]),this.correlation=i||{},this.count=t||0,this.iteration=1,this.constructor=Cluster}function Curve(t){CanvasObject.apply(this,arguments),this.constructor=Curve,this.now.step=+this.now.step||+t.step||1,this.now.points=this.now.points||t.points||[],this.services.points=[]}function Ellipse(t){CanvasObject.apply(this,arguments),this.constructor=Ellipse,this.now.step=this.now.step||.1}function Line(t){CanvasObject.apply(this,arguments),this.constructor=Line,this.now.points=this.now.points||t.points||[],this.services.points=[]}function Polygon(t){CanvasObject.apply(this,arguments),this.constructor=Polygon,this.now.sidesCount=this.now.sidesCount||t.sidesCount||3,this.now.radius=this.now.radius||t.radius||0}function Polyline(t){CanvasObject.apply(this,arguments),this.constructor=Polyline,this.now.points=t.points}function markControlPoints(t,i,n){n=n||{},i.moveTo(+n.x,+n.y),i.arc(+n.x,+n.y,2,0,2*Math.PI);for(var s=0;t[s];s++)"object"!=typeof t[s][0]?(i.moveTo(t[s][0]+ +n.x,t[s][1]+ +n.y),i.arc(t[s][0]+ +n.x,t[s][1]+ +n.y,2,0,2*Math.PI)):markControlPoints(t[s],i,n)}function changeContext(t,i){for(var n in i)dataContextChanges[n]&&i[n]&&dataContextChanges[n](t,i[n])}function isNotNegativeNumber(t){return"number"==typeof+t&&+t>=0}function isHEXColor(t){return 7===t.length&&0===t.search(/#[0-9a-f]{6}/i)}function isRGB(t){return 0===t.search(/rgb\((\d{1,3},){2}\d{1,3}\)/i)}function isRGBA(t){return 0===t.search(/rgba\((\d{1,3},){3}(\d(\.\d+)?)\)/i)}function isColor(t){return isHEXColor(t)||isRGB(t)||isRGBA(t)}function random(t,i){return Math.floor(Math.random()*(i-t+1))+t}function getRandomRGB(t,i){return"rgb("+random(t,i)+","+random(t,i)+","+random(t,i)+")"}function toIdentifyTheLine(t,i,n,s){n=n||{},s&&i.moveTo(t[0][0]+ +n.x,t[0][1]+ +n.y);for(var e=0;t[e];e++)"object"!=typeof t[e][0]?i.lineTo(t[e][0]+ +n.x,t[e][1]+ +n.y):toIdentifyTheLine(t[e],i,n)}function toIdentifyTheCurve(t,n,s,e){s=s||{},e&&n.moveTo(t[0][0]+ +s.x,t[0][1]+ +s.y);for(var o=0;t[o];o++){var r=formula.getPointOnCurve(i,this.now.points);n.lineTo(r[0]+this.parent.x,r[1]+this.parent.y)}}function Transform(t){this.options=t=t||{},this.id=t.property||""+Math.random(),this.options.rate=t.rate||1,this.options.factor=t.factor||1,this.options.endShift=t.endShift||100,this.options.startShift=+t.startShift||0,this.options.shift=t.shift||this.options.startShift,this.options.start=t.start||0,this.options.end=t.end,this.options.time=+t.time,this.events=new Listing,this.options.recourse=!!t.recourse,this.reverse=!1}Drawing.prototype.render=function(t,i){t.id=i,this.context.beginPath(),this.context.fillStyle="#000000",this.context.strokeStyle="#000000",this.context.closePath(),dynamic.move(t),t.animate(this.context);for(var n in t.childrens.list)this.render(t.childrens.list[n],n)},Drawing.prototype.pause=function(){var t=this.fps;this.fps=0,this._fps=t},Drawing.prototype.play=function(t){this.fps=+t||this.fps},Object.defineProperty(Drawing.prototype,"fps",{get:function(){return this._fps},set:function(t){var i=this;this.core&&clearInterval(this.core),0!=t&&(this.core=setInterval(function(){i.context.clearRect(0,0,i.DOMObject.width,i.DOMObject.height);for(var t in i.stack.list)i.render(i.stack.list[t],t)},1e3/+t)),this._fps=t}}),EventsListing.prototype.append=function(t,i,n){this.list[t]||(this.list[t]={}),this.list[t][i]||(this.list[t][i]=[]),this.list[t][i].push(n)},EventsListing.prototype.remove=function(t,i){if(!i)return void delete this.list[t];delete this.list[t][i],0==Object.keys(this.list[t]).length&&delete this.list[t]},PropertyListing.prototype.append=function(t){return this.list[t.id]=t,this.up(this.parent,t)},PropertyListing.prototype.remove=function(t){delete this.list[t],this.rem(this.parent)},PropertyListing.prototype.getObject=function(t,i){if(i){for(var n in this.list){if(n==t)return this.list[n];var s=this.list[n].childrens.getObject(t,!0);if(s)return s}return!1}return this.list[t]},PropertyListing.prototype.getObjectsMap=function(){var t={};for(var i in this.list)t[i]=this.list[i].childrens.getObjectsMap();return t},Object.defineProperties(CanvasObject.prototype,{x:{get:function(){return this.parent?this.now.x*Math.cos(this.parent.radian)-this.now.y*Math.sin(this.parent.radian)+this.parent.x:+this.now.x},set:function(t){this.now.x=+t}},y:{get:function(){return this.parent?this.now.x*Math.sin(this.parent.radian)+this.now.y*Math.cos(this.parent.radian)+this.parent.y:+this.now.y},set:function(t){this.now.y=+t}},radian:{get:function(){return this.parent?+this.parent.radian+ +this.now.radian:+this.now.radian},set:function(t){this.now.radian=+t}}}),CanvasObject.prototype.start=function(){return this.drawing.stack.append(this),this},CanvasObject.prototype.stop=function(){return this.drawing.stack.remove(this.id),this},CanvasObject.prototype.animate=function(){},CanvasObject.prototype.transform=function(t){return this._transform||(this._transform=new Listing),t?(this._transform.append(t.id,t),this.operationContext=t,this):this._transform},CanvasObject.prototype.move=function(t,i){return i?this.transform(new Transform({property:"trajectory",type:"line",points:[[this.x,this.y],t],time:i})):(this.x=t[0],void(this.y=t[1]))},CanvasObject.prototype.moveProperty=function(t,i,n){return n?this.transform(new Transform({property:t,start:this.now[t],end:i,time:n})):void(this.now[t]=i)},CanvasObject.prototype.append=function(t){return this.childrens.append(t)},Circle.prototype=Object.create(CanvasObject.prototype),Circle.prototype.animate=function(t){t.beginPath();var i=this.radian;t.arc(this.x,this.y,this.now.radius,i,2*Math.PI/100*this.now.shift+i),changeContext(t,this.now),t.closePath()},Cluster.prototype=Object.create(CanvasObject.prototype),Cluster.prototype.transform=function(){return this._transform||(this._transform=new Listing),this._transform},Cluster.prototype.animate=function(){if(this.iteration>this.count)return void(this.iteration=1);this._animate=this.parent.animate,this._animate(this.drawing.context),this.iteration++,this.animate()},Object.defineProperties(Cluster.prototype,{now:{get:function(){if(this.parameters.iteration!==this.iteration&&this.parent){for(var t in this.parent.now)if(this.correlation[t]){var i=+this.correlation[t];"function"==typeof this.correlation[t]&&(i=+this.correlation[t](this.iteration,this)),this.parameters.list[t]=this.parent.now[t]+i*this.iteration}else this.parameters.list[t]=this.parent.now[t];this.parameters.iteration=+this.iteration}return this.parameters.list},set:function(t){return this.parameters.list}},x:{get:function(){return this.parent.parent?this.now.x*Math.cos(this.parent.parent.radian)-this.now.y*Math.sin(this.parent.parent.radian)+this.parent.parent.x:+this.now.x},set:function(t){return+this.now.x}},y:{get:function(){return this.parent.parent?this.now.x*Math.sin(this.parent.parent.radian)+this.now.y*Math.cos(this.parent.parent.radian)+this.parent.parent.y:+this.now.y},set:function(t){return+this.now.y}},radian:{get:function(){return this.parent.parent?+this.parent.parent.radian+ +this.now.radian:+this.now.radian},set:function(t){return+this.now.radian}}}),Curve.prototype=Object.create(CanvasObject.prototype),Object.defineProperties(CanvasObject.prototype,{points:{get:function(){this.services.points||(this.services.points=[]);var t=this.radian-Math.PI/4,i=Math.sin(t),n=Math.cos(t);for(var s in this.now.points){var e=this.now.points[s];this.services.points[s]=[e[0]*n-e[1]*i,e[0]*i+e[1]*n]}return this.services.points},set:function(t){this.services.map=formula.getMapOfSpline(t,this.now.step),this.now.points=t}}}),Curve.prototype.animate=function(t){if(!(this.now.points.length<2)){this.now.showBreakpoints&&(t.beginPath(),markControlPoints(this.points,t,this),t.fill(),t.closePath()),t.beginPath(),t.moveTo(this.points[0][0]+this.x,this.points[0][1]+this.y),this.now.shift>101&&(this.now.shift=101);for(var i=0;i<=this.now.shift;i+=this.now.step){var n=formula.getPointOnCurve(i,this.points);t.lineTo(n[0]+this.x,n[1]+this.y)}changeContext(t,this.now),t.closePath()}},Ellipse.prototype=Object.create(CanvasObject.prototype),Ellipse.prototype.animate=function(t){t.beginPath();var i=0,n=formula.getPointOnEllipse(this.now.semiAxisX,this.now.semiAxisY,i,this.now.radian,this.x,this.y);for(t.moveTo(n[0],n[1]);i<=2*Math.PI;i+=this.now.step){var s=formula.getPointOnEllipse(this.now.semiAxisX,this.now.semiAxisY,i,this.now.radian,this.x,this.y);t.lineTo(s[0],s[1])}t.lineTo(n[0],n[1]),changeContext(t,this.now),t.closePath()},Line.prototype=Object.create(CanvasObject.prototype),Line.prototype.animate=function(t){if(!(this.now.points.length<2)){t.beginPath(),t.moveTo(this.points[0][0]+this.x,this.points[0][1]+this.y),this.now.shift>101&&(this.now.shift=101);for(var i=0;i<=this.now.shift;i+=this.now.step){var n=formula.getPointOnLine(i,this.points);t.lineTo(n[0]+this.x,n[1]+this.y)}changeContext(t,this.now),t.closePath()}},Polygon.prototype=Object.create(CanvasObject.prototype),Polygon.prototype.animate=function(t){if(this.now.sidesCount<3)return!1;var i=formula.getPointOnCircle(this.radian,this.now.radius,this.x,this.y);t.beginPath(),t.moveTo(i[0],i[1]);for(var n=0;n<this.now.sidesCount;n++){var s=formula.getPointOnCircle(2*Math.PI/this.now.sidesCount*n+this.radian,this.now.radius,this.x,this.y);t.lineTo(s[0],s[1])}t.lineTo(i[0],i[1]),changeContext(t,this.now),t.closePath()},Polyline.prototype=Object.create(CanvasObject.prototype),Polyline.prototype.animate=function(t){if(!(this.now.points.length<2)){this.now.showBreakpoints&&(t.beginPath(),markControlPoints(this.now.points,t,this),t.fill(),t.closePath()),t.beginPath(),t.moveTo(this.now.points[0][0]+this.x,this.now.points[0][1]+this.y),this.now.shift>101&&(this.now.shift=101);for(var i=0;i<=this.now.shift;i+=this.now.step){var n=formula.getPointOnCurve(i,this.now.points);t.lineTo(n[0]+this.parent.x,n[1]+this.parent.y)}changeContext(t,this.now),t.closePath()}};var dataContextChanges={fill:function(t,i){t.fillStyle=i,t.fill()},stroke:function(t,i){t.strokeStyle=i,t.stroke()},lineWidth:function(t,i){t.lineWidth=+i}},dynamic={move:function(t){var i=t.transform().list,n=1e3/+t.drawing.fps;for(var s in i){var e=i[s],o=e.options,r=e.event("start");r&&(r(r,e,t),e.events.remove("start")),o.step||(o.step=(o.endShift-o.startShift)/(o.time/n)),e.reverse?o.shift-=+o.step*o.rate:o.shift+=+o.step*o.rate,this.data[s]?this.data[s].prepareData(t):t.now[s]=o.start+(o.end-o.start)/100*o.shift;for(var a in e.events.list)if(!isNaN(+a)){if(e.reverse){if(+a>o.shift||+a<o.shift-o.step)continue}else if(+a<o.shift||+a>o.shift+o.step)continue;e.events.list[a](e.event(a),e,t)}if(e.reverse){if(o.shift>o.startShift)continue}else if(o.shift<o.endShift)continue;t.transform().remove(s),e.options.recourse&&(e.reverse?e.options.shift=e.options.endShift:e.options.shift=e.options.startShift,t.transform(e)),e.event("callback")&&(e.event("callback")(e.event("callback"),e,t),e.events.remove("callback"))}},data:{trajectory:{type:"trajectory",prepareData:function(t){var i=this.type,n=t.transform().list[i],s=this.functions[n.options.type](n.options);t.x=s[0],t.y=s[1]},functions:{circle:function(t){var i=2*Math.PI/100*t.shift;return t.reverse&&(i=2*Math.PI-2*Math.PI/100*t.shift),formula.getPointOnCircle(i,t.radius,t.center[0],t.center[1])},polygon:function(t){},line:function(t){return formula.getPointOnLine(t.shift,t.points)},curve:function(t){return formula.getPointOnCurve(t.shift,t.points)}}},fill:{type:"fill",prepareData:function(t){var i=this.type,n=t.transform().list[i],s=n.options.start,e=n.options.end,o=n.options.shift;t.now.fill=formula.changeColor(s,e,o)}},stroke:{type:"stroke",prepareData:function(t){var i=this.type,n=t.transform().list[i],s=n.options.start,e=n.options.end,o=n.options.shift;t.now.stroke=formula.changeColor(s,e,o)}},points:{type:"points",prepareData:function(t){var i=this.type,n=t.transform().list[i],s=n.options.start,e=n.options.end,o=n.options.shift;t.now.points=this.functions.pointsRecourse(s,e,o)},functions:{pointsRecourse:function(t,i,n){for(var s=[],e=0;e<t.length||e<i.length;e++)if(typeof t[e]==typeof i[e]&&t[e]){if("object"!=typeof t[e]){s=formula.getPointOnLine(n,[t,i]);break}s[e]=this.pointsRecourse(t[e],i[e],n)}else s[e]=t[e];return s}}}}},formula={getPointOnCircle:function(t,i,n,s){n=+n||0,s=+s||0;var e=+i*Math.sin(+t);return[n+ +i*Math.cos(+t),s+e]},getPointOnEllipse:function(t,i,n,s,e,o){s=s||0,s*=-1;var r=t*Math.cos(+n),a=i*Math.sin(+n);return[r*Math.cos(s)+a*Math.sin(s)+e,-r*Math.sin(s)+a*Math.cos(s)+o]},getPointsFromPolygon:function(t,i,n,s,e){var o=[];o.push(this.getPointOnCircle(i,n,s,e));for(var r=0;r<t;r++)o.push(this.getPointOnCircle(2*Math.PI/t*r+i,n,s,e));return o},getPointOnCurve:function(t,i){if(2==i.length)return this.getPointOnLine(t,i);for(var n=[],s=1;s<i.length;s++)n.push(this.getPointOnLine(t,[i[s-1],i[s]]));return this.getPointOnCurve(t,n)},getPointOnLine:function(t,i){return[(i[1][0]-i[0][0])*(t/100)+i[0][0],(i[1][1]-i[0][1])*(t/100)+i[0][1]]},getCenterToPointDistance:function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2))},HEXtoRGBA:function(t){var i=[];return i[0]=parseInt(t.substring(1,3),16),i[1]=parseInt(t.substring(3,5),16),i[2]=parseInt(t.substring(5),16),i[3]=1,i},RGBtoRGBA:function(t){var i=t.match(/\d{1,3}(\.\d+)?/g);return"0"===i[3]?i[3]=0:i[3]=+i[3]||1,i},changeColor:function(t,i,n){var s=[];isRGBA(t)||isRGB(t)?t=formula.RGBtoRGBA(t):isHEXColor(t)&&(t=formula.HEXtoRGBA(t)),isRGBA(i)||isRGB(i)?i=formula.RGBtoRGBA(i):isHEXColor(i)&&(i=formula.HEXtoRGBA(i));for(var e=0;e<3;e++)s[e]=Math.round(+t[e]+(+i[e]-+t[e])/100*n);var o=+(+t[3]+(+i[3]-+t[3])/100*n).toFixed(4);return"rgba("+s[0]+","+s[1]+","+s[2]+","+o+")"}};formula.getLengthOfCurve=function(t,i){for(var n=0,s=t[0],e=0;e<=100;e+=i){var o=formula.getPointOnCurve(e,t);n+=formula.getCenterToPointDistance([o[0]-s[0],o[1]-s[1]]),s=o}return n},formula.getMapOfSpline=function(t,i){for(var n=[[]],s=0,e=0;t[e];e++){var o=n[s].length;n[s][+o]=t[e],t[e][2]&&e!=t.length-1&&(n[s]=formula.getLengthOfCurve(n[s],i),n[++s]=[t[e]])}return n[s]=formula.getLengthOfCurve(n[s],i),n},Transform.prototype.shift=function(t){},Transform.prototype.play=function(t){return this.options.rate=t||1,this},Transform.prototype.pause=function(){return this.options.rate=0,this},Transform.prototype.stop=function(){return this.options.rate=0,this.reverse?this.options.shift=this.options.endShift:this.options.shift=this.options.startShift,this},Transform.prototype.repeat=function(){this.reverse?this.options.shift=this.options.endShift:this.options.shift=this.options.startShift},Transform.prototype.event=function(t,i){return i?(this.events.append(t,i),this):this.events.list[t]};