<<<<<<< HEAD
(()=>{var e={3018:(e,t,n)=>{"use strict";var r=n(397);e.exports=LRUCache;var i,o=n(7745),s=n(2599),a=n(5986),l=(i="function"==typeof Symbol&&"1"!==r.env._nodeLRUCacheForceNoSymbol?function(e){return Symbol(e)}:function(e){return"_"+e})("max"),u=i("length"),c=i("lengthCalculator"),h=i("allowStale"),p=i("maxAge"),f=i("dispose"),d=i("noDisposeOnSet"),y=i("lruList"),v=i("cache");function naiveLength(){return 1}function LRUCache(e){if(!(this instanceof LRUCache))return new LRUCache(e);"number"==typeof e&&(e={max:e}),e||(e={});var t=this[l]=e.max;(!t||"number"!=typeof t||t<=0)&&(this[l]=1/0);var n=e.length||naiveLength;"function"!=typeof n&&(n=naiveLength),this[c]=n,this[h]=e.stale||!1,this[p]=e.maxAge||0,this[f]=e.dispose,this[d]=e.noDisposeOnSet||!1,this.reset()}function forEachStep(e,t,n,r){var i=n.value;isStale(e,i)&&(del(e,n),e[h]||(i=void 0)),i&&t.call(r,i.value,i.key,e)}function get(e,t,n){var r=e[v].get(t);if(r){var i=r.value;isStale(e,i)?(del(e,r),e[h]||(i=void 0)):n&&e[y].unshiftNode(r),i&&(i=i.value)}return i}function isStale(e,t){if(!t||!t.maxAge&&!e[p])return!1;var n=Date.now()-t.now;return t.maxAge?n>t.maxAge:e[p]&&n>e[p]}function trim(e){if(e[u]>e[l])for(var t=e[y].tail;e[u]>e[l]&&null!==t;){var n=t.prev;del(e,t),t=n}}function del(e,t){if(t){var n=t.value;e[f]&&e[f](n.key,n.value),e[u]-=n.length,e[v].delete(n.key),e[y].removeNode(t)}}function Entry(e,t,n,r,i){this.key=e,this.value=t,this.length=n,this.now=r,this.maxAge=i||0}Object.defineProperty(LRUCache.prototype,"max",{set:function(e){(!e||"number"!=typeof e||e<=0)&&(e=1/0),this[l]=e,trim(this)},get:function(){return this[l]},enumerable:!0}),Object.defineProperty(LRUCache.prototype,"allowStale",{set:function(e){this[h]=!!e},get:function(){return this[h]},enumerable:!0}),Object.defineProperty(LRUCache.prototype,"maxAge",{set:function(e){(!e||"number"!=typeof e||e<0)&&(e=0),this[p]=e,trim(this)},get:function(){return this[p]},enumerable:!0}),Object.defineProperty(LRUCache.prototype,"lengthCalculator",{set:function(e){"function"!=typeof e&&(e=naiveLength),e!==this[c]&&(this[c]=e,this[u]=0,this[y].forEach((function(e){e.length=this[c](e.value,e.key),this[u]+=e.length}),this)),trim(this)},get:function(){return this[c]},enumerable:!0}),Object.defineProperty(LRUCache.prototype,"length",{get:function(){return this[u]},enumerable:!0}),Object.defineProperty(LRUCache.prototype,"itemCount",{get:function(){return this[y].length},enumerable:!0}),LRUCache.prototype.rforEach=function(e,t){t=t||this;for(var n=this[y].tail;null!==n;){var r=n.prev;forEachStep(this,e,n,t),n=r}},LRUCache.prototype.forEach=function(e,t){t=t||this;for(var n=this[y].head;null!==n;){var r=n.next;forEachStep(this,e,n,t),n=r}},LRUCache.prototype.keys=function(){return this[y].toArray().map((function(e){return e.key}),this)},LRUCache.prototype.values=function(){return this[y].toArray().map((function(e){return e.value}),this)},LRUCache.prototype.reset=function(){this[f]&&this[y]&&this[y].length&&this[y].forEach((function(e){this[f](e.key,e.value)}),this),this[v]=new o,this[y]=new a,this[u]=0},LRUCache.prototype.dump=function(){return this[y].map((function(e){if(!isStale(this,e))return{k:e.key,v:e.value,e:e.now+(e.maxAge||0)}}),this).toArray().filter((function(e){return e}))},LRUCache.prototype.dumpLru=function(){return this[y]},LRUCache.prototype.inspect=function(e,t){var n="LRUCache {",r=!1;this[h]&&(n+="\n  allowStale: true",r=!0);var i=this[l];i&&i!==1/0&&(r&&(n+=","),n+="\n  max: "+s.inspect(i,t),r=!0);var o=this[p];o&&(r&&(n+=","),n+="\n  maxAge: "+s.inspect(o,t),r=!0);var a=this[c];a&&a!==naiveLength&&(r&&(n+=","),n+="\n  length: "+s.inspect(this[u],t),r=!0);var f=!1;return this[y].forEach((function(e){f?n+=",\n  ":(r&&(n+=",\n"),f=!0,n+="\n  ");var i=s.inspect(e.key).split("\n").join("\n  "),l={value:e.value};e.maxAge!==o&&(l.maxAge=e.maxAge),a!==naiveLength&&(l.length=e.length),isStale(this,e)&&(l.stale=!0),l=s.inspect(l,t).split("\n").join("\n  "),n+=i+" => "+l})),(f||r)&&(n+="\n"),n+="}"},LRUCache.prototype.set=function(e,t,n){var r=(n=n||this[p])?Date.now():0,i=this[c](t,e);if(this[v].has(e)){if(i>this[l])return del(this,this[v].get(e)),!1;var o=this[v].get(e).value;return this[f]&&(this[d]||this[f](e,o.value)),o.now=r,o.maxAge=n,o.value=t,this[u]+=i-o.length,o.length=i,this.get(e),trim(this),!0}var s=new Entry(e,t,i,r,n);return s.length>this[l]?(this[f]&&this[f](e,t),!1):(this[u]+=s.length,this[y].unshift(s),this[v].set(e,this[y].head),trim(this),!0)},LRUCache.prototype.has=function(e){return!!this[v].has(e)&&!isStale(this,this[v].get(e).value)},LRUCache.prototype.get=function(e){return get(this,e,!0)},LRUCache.prototype.peek=function(e){return get(this,e,!1)},LRUCache.prototype.pop=function(){var e=this[y].tail;return e?(del(this,e),e.value):null},LRUCache.prototype.del=function(e){del(this,this[v].get(e))},LRUCache.prototype.load=function(e){this.reset();for(var t=Date.now(),n=e.length-1;n>=0;n--){var r=e[n],i=r.e||0;if(0===i)this.set(r.k,r.v);else{var o=i-t;o>0&&this.set(r.k,r.v,o)}}},LRUCache.prototype.prune=function(){var e=this;this[v].forEach((function(t,n){get(e,n,!1)}))}},397:e=>{var t,n,r=e.exports={};function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(e){if(t===setTimeout)return setTimeout(e,0);if((t===defaultSetTimout||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){t=defaultSetTimout}try{n="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){n=defaultClearTimeout}}();var i,o=[],s=!1,a=-1;function cleanUpNextTick(){s&&i&&(s=!1,i.length?o=i.concat(o):a=-1,o.length&&drainQueue())}function drainQueue(){if(!s){var e=runTimeout(cleanUpNextTick);s=!0;for(var t=o.length;t;){for(i=o,o=[];++a<t;)i&&i[a].run();a=-1,t=o.length}i=null,s=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===defaultClearTimeout||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{return n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];o.push(new Item(e,t)),1!==o.length||s||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=noop,r.addListener=noop,r.once=noop,r.off=noop,r.removeListener=noop,r.removeAllListeners=noop,r.emit=noop,r.prependListener=noop,r.prependOnceListener=noop,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},7745:(e,t,n)=>{var r=n(397);"pseudomap"===r.env.npm_package_name&&"test"===r.env.npm_lifecycle_script&&(r.env.TEST_PSEUDOMAP="true"),"function"!=typeof Map||r.env.TEST_PSEUDOMAP?e.exports=n(7503):e.exports=Map},7503:e=>{var t=Object.prototype.hasOwnProperty;function PseudoMap(e){if(!(this instanceof PseudoMap))throw new TypeError("Constructor PseudoMap requires 'new'");if(this.clear(),e)if(e instanceof PseudoMap||"function"==typeof Map&&e instanceof Map)e.forEach((function(e,t){this.set(t,e)}),this);else{if(!Array.isArray(e))throw new TypeError("invalid argument");e.forEach((function(e){this.set(e[0],e[1])}),this)}}function same(e,t){return e===t||e!=e&&t!=t}function Entry(e,t,n){this.key=e,this.value=t,this._index=n}function find(e,n){for(var r=0,i="_"+n,o=i;t.call(e,o);o=i+r++)if(same(e[o].key,n))return e[o]}e.exports=PseudoMap,PseudoMap.prototype.forEach=function(e,t){t=t||this,Object.keys(this._data).forEach((function(n){"size"!==n&&e.call(t,this._data[n].value,this._data[n].key)}),this)},PseudoMap.prototype.has=function(e){return!!find(this._data,e)},PseudoMap.prototype.get=function(e){var t=find(this._data,e);return t&&t.value},PseudoMap.prototype.set=function(e,n){!function(e,n,r){for(var i=0,o="_"+n,s=o;t.call(e,s);s=o+i++)if(same(e[s].key,n))return void(e[s].value=r);e.size++,e[s]=new Entry(n,r,s)}(this._data,e,n)},PseudoMap.prototype.delete=function(e){var t=find(this._data,e);t&&(delete this._data[t._index],this._data.size--)},PseudoMap.prototype.clear=function(){var e=Object.create(null);e.size=0,Object.defineProperty(this,"_data",{value:e,enumerable:!1,configurable:!0,writable:!1})},Object.defineProperty(PseudoMap.prototype,"size",{get:function(){return this._data.size},set:function(e){},enumerable:!0,configurable:!0}),PseudoMap.prototype.values=PseudoMap.prototype.keys=PseudoMap.prototype.entries=function(){throw new Error("iterators are not implemented in this version")}},7510:e=>{"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var TempCtor=function(){};TempCtor.prototype=t.prototype,e.prototype=new TempCtor,e.prototype.constructor=e}},1772:e=>{e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},2599:(e,t,n)=>{var r=n(397),i=/%[sdj%]/g;t.format=function(e){if(!isString(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(inspect(arguments[n]));return t.join(" ")}n=1;for(var r=arguments,o=r.length,s=String(e).replace(i,(function(e){if("%%"===e)return"%";if(n>=o)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return e}})),a=r[n];n<o;a=r[++n])isNull(a)||!isObject(a)?s+=" "+a:s+=" "+inspect(a);return s},t.deprecate=function(e,n){if(isUndefined(global.process))return function(){return t.deprecate(e,n).apply(this,arguments)};if(!0===r.noDeprecation)return e;var i=!1;return function(){if(!i){if(r.throwDeprecation)throw new Error(n);r.traceDeprecation?console.trace(n):console.error(n),i=!0}return e.apply(this,arguments)}};var o,s={};function inspect(e,n){var r={seen:[],stylize:stylizeNoColor};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),isBoolean(n)?r.showHidden=n:n&&t._extend(r,n),isUndefined(r.showHidden)&&(r.showHidden=!1),isUndefined(r.depth)&&(r.depth=2),isUndefined(r.colors)&&(r.colors=!1),isUndefined(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=stylizeWithColor),formatValue(r,e,r.depth)}function stylizeWithColor(e,t){var n=inspect.styles[t];return n?"["+inspect.colors[n][0]+"m"+e+"["+inspect.colors[n][1]+"m":e}function stylizeNoColor(e,t){return e}function formatValue(e,n,r){if(e.customInspect&&n&&isFunction(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var i=n.inspect(r,e);return isString(i)||(i=formatValue(e,i,r)),i}var o=function(e,t){if(isUndefined(t))return e.stylize("undefined","undefined");if(isString(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}if(isNumber(t))return e.stylize(""+t,"number");if(isBoolean(t))return e.stylize(""+t,"boolean");if(isNull(t))return e.stylize("null","null")}(e,n);if(o)return o;var s=Object.keys(n),a=function(e){var t={};return e.forEach((function(e,n){t[e]=!0})),t}(s);if(e.showHidden&&(s=Object.getOwnPropertyNames(n)),isError(n)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return formatError(n);if(0===s.length){if(isFunction(n)){var l=n.name?": "+n.name:"";return e.stylize("[Function"+l+"]","special")}if(isRegExp(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(isDate(n))return e.stylize(Date.prototype.toString.call(n),"date");if(isError(n))return formatError(n)}var u,c="",h=!1,p=["{","}"];(isArray(n)&&(h=!0,p=["[","]"]),isFunction(n))&&(c=" [Function"+(n.name?": "+n.name:"")+"]");return isRegExp(n)&&(c=" "+RegExp.prototype.toString.call(n)),isDate(n)&&(c=" "+Date.prototype.toUTCString.call(n)),isError(n)&&(c=" "+formatError(n)),0!==s.length||h&&0!=n.length?r<0?isRegExp(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special"):(e.seen.push(n),u=h?function(e,t,n,r,i){for(var o=[],s=0,a=t.length;s<a;++s)hasOwnProperty(t,String(s))?o.push(formatProperty(e,t,n,r,String(s),!0)):o.push("");return i.forEach((function(i){i.match(/^\d+$/)||o.push(formatProperty(e,t,n,r,i,!0))})),o}(e,n,r,a,s):s.map((function(t){return formatProperty(e,n,r,a,t,h)})),e.seen.pop(),function(e,t,n){var r=e.reduce((function(e,t){return t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1}),0);if(r>60)return n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1];return n[0]+t+" "+e.join(", ")+" "+n[1]}(u,c,p)):p[0]+c+p[1]}function formatError(e){return"["+Error.prototype.toString.call(e)+"]"}function formatProperty(e,t,n,r,i,o){var s,a,l;if((l=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]}).get?a=l.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):l.set&&(a=e.stylize("[Setter]","special")),hasOwnProperty(r,i)||(s="["+i+"]"),a||(e.seen.indexOf(l.value)<0?(a=isNull(n)?formatValue(e,l.value,null):formatValue(e,l.value,n-1)).indexOf("\n")>-1&&(a=o?a.split("\n").map((function(e){return"  "+e})).join("\n").substr(2):"\n"+a.split("\n").map((function(e){return"   "+e})).join("\n")):a=e.stylize("[Circular]","special")),isUndefined(s)){if(o&&i.match(/^\d+$/))return a;(s=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+a}function isArray(e){return Array.isArray(e)}function isBoolean(e){return"boolean"==typeof e}function isNull(e){return null===e}function isNumber(e){return"number"==typeof e}function isString(e){return"string"==typeof e}function isUndefined(e){return void 0===e}function isRegExp(e){return isObject(e)&&"[object RegExp]"===objectToString(e)}function isObject(e){return"object"==typeof e&&null!==e}function isDate(e){return isObject(e)&&"[object Date]"===objectToString(e)}function isError(e){return isObject(e)&&("[object Error]"===objectToString(e)||e instanceof Error)}function isFunction(e){return"function"==typeof e}function objectToString(e){return Object.prototype.toString.call(e)}function pad(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(e){if(isUndefined(o)&&(o=r.env.NODE_DEBUG||""),e=e.toUpperCase(),!s[e])if(new RegExp("\\b"+e+"\\b","i").test(o)){var n=r.pid;s[e]=function(){var r=t.format.apply(t,arguments);console.error("%s %d: %s",e,n,r)}}else s[e]=function(){};return s[e]},t.inspect=inspect,inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},inspect.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=isArray,t.isBoolean=isBoolean,t.isNull=isNull,t.isNullOrUndefined=function(e){return null==e},t.isNumber=isNumber,t.isString=isString,t.isSymbol=function(e){return"symbol"==typeof e},t.isUndefined=isUndefined,t.isRegExp=isRegExp,t.isObject=isObject,t.isDate=isDate,t.isError=isError,t.isFunction=isFunction,t.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},t.isBuffer=n(1772);var a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function hasOwnProperty(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){var e,n;console.log("%s - %s",(e=new Date,n=[pad(e.getHours()),pad(e.getMinutes()),pad(e.getSeconds())].join(":"),[e.getDate(),a[e.getMonth()],n].join(" ")),t.format.apply(t,arguments))},t.inherits=n(7510),t._extend=function(e,t){if(!t||!isObject(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e}},5986:e=>{function Yallist(e){var t=this;if(t instanceof Yallist||(t=new Yallist),t.tail=null,t.head=null,t.length=0,e&&"function"==typeof e.forEach)e.forEach((function(e){t.push(e)}));else if(arguments.length>0)for(var n=0,r=arguments.length;n<r;n++)t.push(arguments[n]);return t}function push(e,t){e.tail=new Node(t,e.tail,null,e),e.head||(e.head=e.tail),e.length++}function unshift(e,t){e.head=new Node(t,null,e.head,e),e.tail||(e.tail=e.head),e.length++}function Node(e,t,n,r){if(!(this instanceof Node))return new Node(e,t,n,r);this.list=r,this.value=e,t?(t.next=this,this.prev=t):this.prev=null,n?(n.prev=this,this.next=n):this.next=null}e.exports=Yallist,Yallist.Node=Node,Yallist.create=Yallist,Yallist.prototype.removeNode=function(e){if(e.list!==this)throw new Error("removing node which does not belong to this list");var t=e.next,n=e.prev;t&&(t.prev=n),n&&(n.next=t),e===this.head&&(this.head=t),e===this.tail&&(this.tail=n),e.list.length--,e.next=null,e.prev=null,e.list=null},Yallist.prototype.unshiftNode=function(e){if(e!==this.head){e.list&&e.list.removeNode(e);var t=this.head;e.list=this,e.next=t,t&&(t.prev=e),this.head=e,this.tail||(this.tail=e),this.length++}},Yallist.prototype.pushNode=function(e){if(e!==this.tail){e.list&&e.list.removeNode(e);var t=this.tail;e.list=this,e.prev=t,t&&(t.next=e),this.tail=e,this.head||(this.head=e),this.length++}},Yallist.prototype.push=function(){for(var e=0,t=arguments.length;e<t;e++)push(this,arguments[e]);return this.length},Yallist.prototype.unshift=function(){for(var e=0,t=arguments.length;e<t;e++)unshift(this,arguments[e]);return this.length},Yallist.prototype.pop=function(){if(this.tail){var e=this.tail.value;return this.tail=this.tail.prev,this.tail?this.tail.next=null:this.head=null,this.length--,e}},Yallist.prototype.shift=function(){if(this.head){var e=this.head.value;return this.head=this.head.next,this.head?this.head.prev=null:this.tail=null,this.length--,e}},Yallist.prototype.forEach=function(e,t){t=t||this;for(var n=this.head,r=0;null!==n;r++)e.call(t,n.value,r,this),n=n.next},Yallist.prototype.forEachReverse=function(e,t){t=t||this;for(var n=this.tail,r=this.length-1;null!==n;r--)e.call(t,n.value,r,this),n=n.prev},Yallist.prototype.get=function(e){for(var t=0,n=this.head;null!==n&&t<e;t++)n=n.next;if(t===e&&null!==n)return n.value},Yallist.prototype.getReverse=function(e){for(var t=0,n=this.tail;null!==n&&t<e;t++)n=n.prev;if(t===e&&null!==n)return n.value},Yallist.prototype.map=function(e,t){t=t||this;for(var n=new Yallist,r=this.head;null!==r;)n.push(e.call(t,r.value,this)),r=r.next;return n},Yallist.prototype.mapReverse=function(e,t){t=t||this;for(var n=new Yallist,r=this.tail;null!==r;)n.push(e.call(t,r.value,this)),r=r.prev;return n},Yallist.prototype.reduce=function(e,t){var n,r=this.head;if(arguments.length>1)n=t;else{if(!this.head)throw new TypeError("Reduce of empty list with no initial value");r=this.head.next,n=this.head.value}for(var i=0;null!==r;i++)n=e(n,r.value,i),r=r.next;return n},Yallist.prototype.reduceReverse=function(e,t){var n,r=this.tail;if(arguments.length>1)n=t;else{if(!this.tail)throw new TypeError("Reduce of empty list with no initial value");r=this.tail.prev,n=this.tail.value}for(var i=this.length-1;null!==r;i--)n=e(n,r.value,i),r=r.prev;return n},Yallist.prototype.toArray=function(){for(var e=new Array(this.length),t=0,n=this.head;null!==n;t++)e[t]=n.value,n=n.next;return e},Yallist.prototype.toArrayReverse=function(){for(var e=new Array(this.length),t=0,n=this.tail;null!==n;t++)e[t]=n.value,n=n.prev;return e},Yallist.prototype.slice=function(e,t){(t=t||this.length)<0&&(t+=this.length),(e=e||0)<0&&(e+=this.length);var n=new Yallist;if(t<e||t<0)return n;e<0&&(e=0),t>this.length&&(t=this.length);for(var r=0,i=this.head;null!==i&&r<e;r++)i=i.next;for(;null!==i&&r<t;r++,i=i.next)n.push(i.value);return n},Yallist.prototype.sliceReverse=function(e,t){(t=t||this.length)<0&&(t+=this.length),(e=e||0)<0&&(e+=this.length);var n=new Yallist;if(t<e||t<0)return n;e<0&&(e=0),t>this.length&&(t=this.length);for(var r=this.length,i=this.tail;null!==i&&r>t;r--)i=i.prev;for(;null!==i&&r>e;r--,i=i.prev)n.push(i.value);return n},Yallist.prototype.reverse=function(){for(var e=this.head,t=this.tail,n=e;null!==n;n=n.prev){var r=n.prev;n.prev=n.next,n.next=r}return this.head=t,this.tail=e,this}}},t={};function __webpack_require__(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,__webpack_require__),i.exports}__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var n in t)__webpack_require__.o(t,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const esm_compareVersions=(e,t)=>{const n=validateAndParse(e),r=validateAndParse(t),i=n.pop(),o=r.pop(),s=compareSegments(n,r);return 0!==s?s:i&&o?compareSegments(i.split("."),o.split(".")):i||o?i?-1:1:0},e=/^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,validateAndParse=t=>{if("string"!=typeof t)throw new TypeError("Invalid argument expected string");const n=t.match(e);if(!n)throw new Error(`Invalid argument not valid semver ('${t}' received)`);return n.shift(),n},isWildcard=e=>"*"===e||"x"===e||"X"===e,tryParse=e=>{const t=parseInt(e,10);return isNaN(t)?e:t},compareStrings=(e,t)=>{if(isWildcard(e)||isWildcard(t))return 0;const[n,r]=((e,t)=>typeof e!=typeof t?[String(e),String(t)]:[e,t])(tryParse(e),tryParse(t));return n>r?1:n<r?-1:0},compareSegments=(e,t)=>{for(let n=0;n<Math.max(e.length,t.length);n++){const r=compareStrings(e[n]||"0",t[n]||"0");if(0!==r)return r}return 0},t={">":[1],">=":[0,1],"=":[0],"<=":[-1,0],"<":[-1]};Object.keys(t);var n=__webpack_require__(3018),r=__webpack_require__.n(n);Symbol.for("react.element"),Symbol.for("react.transitional.element"),Symbol.for("react.portal"),Symbol.for("react.fragment"),Symbol.for("react.strict_mode"),Symbol.for("react.profiler"),Symbol.for("react.provider"),Symbol.for("react.consumer"),Symbol.for("react.context"),Symbol.for("react.forward_ref"),Symbol.for("react.suspense"),Symbol.for("react.suspense_list"),Symbol.for("react.memo"),Symbol.for("react.lazy"),Symbol.for("react.scope"),Symbol.for("react.offscreen"),Symbol.for("react.legacy_hidden"),Symbol.for("react.tracing_marker"),Symbol.for("react.memo_cache_sentinel"),Symbol.for("react.postpone"),Symbol.for("react.view_transition"),Symbol.iterator;Symbol.asyncIterator;const i="React::DevTools::recordChangeDescriptions",o="React::DevTools::recordTimeline",s="React::DevTools::reloadAndProfile";function sessionStorageRemoveItem(e){try{sessionStorage.removeItem(e)}catch(e){}}function sessionStorageSetItem(e,t){try{return sessionStorage.setItem(e,t)}catch(e){}}Array.isArray,Object.prototype.hasOwnProperty,new WeakMap,new(r())({max:1e3});function getIsReloadAndProfileSupported(){let e=!1;try{localStorage.getItem("test"),e=!0}catch(e){}return e&&!!(window.document&&window.document.featurePolicy&&window.document.featurePolicy.allowsFeature("sync-xhr"))}function getIfReloadedAndProfiling(){return"true"===function(e){try{return sessionStorage.getItem(e)}catch(e){return null}}(s)}function onReloadAndProfile(e,t){sessionStorageSetItem(s,"true"),sessionStorageSetItem(i,e?"true":"false"),sessionStorageSetItem(o,t?"true":"false")}Symbol("inspectable"),Symbol("inspected"),Symbol("name"),Symbol("preview_long"),Symbol("preview_short"),Symbol("readonly"),Symbol("size"),Symbol("type"),Symbol("unserializable");Array.isArray;const a="999.9.9";function hasAssignedBackend(e){return null!=e&&""!==e&&function(e="",t=""){return esm_compareVersions(e,t)>-1}(e,a)}const l="compact";let u=!1;const c=new Set;function registerRenderer(e,t){let n=e.reconcilerVersion||e.version;hasAssignedBackend(n)||(n=l),t.backends.has(n)||c.add(n)}function activateBackend(e,t){const n=t.backends.get(e);if(!n)throw new Error(`Could not find backend for version "${e}"`);const{Agent:r,Bridge:a,initBackend:l,setupNativeStyleEditor:u}=n,h=new a({listen(e){const listener=t=>{t.source===window&&t.data&&"react-devtools-content-script"===t.data.source&&t.data.payload&&e(t.data.payload)};return window.addEventListener("message",listener),()=>{window.removeEventListener("message",listener)}},send(e,t,n){window.postMessage({source:"react-devtools-bridge",payload:{event:e,payload:t}},"*",n)}}),p=new r(h,getIfReloadedAndProfiling(),onReloadAndProfile);sessionStorageRemoveItem(s),sessionStorageRemoveItem(i),sessionStorageRemoveItem(o),p.addListener("shutdown",(()=>{t.emit("shutdown"),delete window.__REACT_DEVTOOLS_BACKEND_MANAGER_INJECTED__})),l(t,p,window,getIsReloadAndProfileSupported()),"function"==typeof u&&t.resolveRNStyle&&u(h,p,t.resolveRNStyle,t.nativeStyleEditorValidAttributes),h.send("extensionBackendInitialized"),c.delete(e)}function updateRequiredBackends(){0!==c.size&&window.postMessage({source:"react-devtools-backend-manager",payload:{type:"require-backends",versions:Array.from(c)}},"*")}window.__REACT_DEVTOOLS_BACKEND_MANAGER_INJECTED__||(window.__REACT_DEVTOOLS_BACKEND_MANAGER_INJECTED__=!0,window.addEventListener("message",(function welcome(e){e.source===window&&"react-devtools-content-script"===e.data.source&&(u?console.warn('React DevTools detected duplicate welcome "message" events from the content script.'):(u=!0,window.removeEventListener("message",welcome),function(e){if(null==e)return;e.renderers.forEach((t=>{registerRenderer(t,e)})),e.backends.forEach(((t,n)=>{c.delete(n),activateBackend(n,e)})),updateRequiredBackends();const t=e.sub("renderer",(({renderer:t})=>{registerRenderer(t,e),updateRequiredBackends()})),n=e.sub("devtools-backend-installed",(t=>{activateBackend(t,e),updateRequiredBackends()})),r=e.sub("shutdown",(()=>{t(),n(),r()}))}(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)))})))})()})();
=======
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 120);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHROME_WEBSTORE_EXTENSION_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return INTERNAL_EXTENSION_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LOCAL_EXTENSION_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __DEBUG__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __PERFORMANCE_PROFILE__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return TREE_OPERATION_ADD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return TREE_OPERATION_REMOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return TREE_OPERATION_REORDER_CHILDREN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return TREE_OPERATION_UPDATE_TREE_BASE_DURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return TREE_OPERATION_UPDATE_ERRORS_OR_WARNINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return TREE_OPERATION_REMOVE_ROOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return TREE_OPERATION_SET_SUBTREE_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return PROFILING_FLAG_BASIC_SUPPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return PROFILING_FLAG_TIMELINE_SUPPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return LOCAL_STORAGE_DEFAULT_TAB_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return LOCAL_STORAGE_COMPONENT_FILTER_PREFERENCES_KEY; });
/* unused harmony export SESSION_STORAGE_LAST_SELECTION_KEY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return LOCAL_STORAGE_OPEN_IN_EDITOR_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return LOCAL_STORAGE_PARSE_HOOK_NAMES_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return SESSION_STORAGE_RECORD_CHANGE_DESCRIPTIONS_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return SESSION_STORAGE_RELOAD_AND_PROFILE_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return LOCAL_STORAGE_SHOULD_BREAK_ON_CONSOLE_ERRORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return LOCAL_STORAGE_BROWSER_THEME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return LOCAL_STORAGE_SHOULD_APPEND_COMPONENT_STACK_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return LOCAL_STORAGE_SHOW_INLINE_WARNINGS_AND_ERRORS_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return LOCAL_STORAGE_TRACE_UPDATES_ENABLED_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return LOCAL_STORAGE_HIDE_CONSOLE_LOGS_IN_STRICT_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return PROFILER_EXPORT_VERSION; });
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const CHROME_WEBSTORE_EXTENSION_ID = 'fmkadmapgofadopljbjfkapdkoienihi';
const INTERNAL_EXTENSION_ID = 'dnjnjgbfilfphmojnmhliehogmojhclc';
const LOCAL_EXTENSION_ID = 'ikiahnapldjmdmpkmfhjdjilojjhgcbf'; // Flip this flag to true to enable verbose console debug logging.

const __DEBUG__ = false; // Flip this flag to true to enable performance.mark() and performance.measure() timings.

const __PERFORMANCE_PROFILE__ = false;
const TREE_OPERATION_ADD = 1;
const TREE_OPERATION_REMOVE = 2;
const TREE_OPERATION_REORDER_CHILDREN = 3;
const TREE_OPERATION_UPDATE_TREE_BASE_DURATION = 4;
const TREE_OPERATION_UPDATE_ERRORS_OR_WARNINGS = 5;
const TREE_OPERATION_REMOVE_ROOT = 6;
const TREE_OPERATION_SET_SUBTREE_MODE = 7;
const PROFILING_FLAG_BASIC_SUPPORT = 0b01;
const PROFILING_FLAG_TIMELINE_SUPPORT = 0b10;
const LOCAL_STORAGE_DEFAULT_TAB_KEY = 'React::DevTools::defaultTab';
const LOCAL_STORAGE_COMPONENT_FILTER_PREFERENCES_KEY = 'React::DevTools::componentFilters';
const SESSION_STORAGE_LAST_SELECTION_KEY = 'React::DevTools::lastSelection';
const LOCAL_STORAGE_OPEN_IN_EDITOR_URL = 'React::DevTools::openInEditorUrl';
const LOCAL_STORAGE_PARSE_HOOK_NAMES_KEY = 'React::DevTools::parseHookNames';
const SESSION_STORAGE_RECORD_CHANGE_DESCRIPTIONS_KEY = 'React::DevTools::recordChangeDescriptions';
const SESSION_STORAGE_RELOAD_AND_PROFILE_KEY = 'React::DevTools::reloadAndProfile';
const LOCAL_STORAGE_SHOULD_BREAK_ON_CONSOLE_ERRORS = 'React::DevTools::breakOnConsoleErrors';
const LOCAL_STORAGE_BROWSER_THEME = 'React::DevTools::theme';
const LOCAL_STORAGE_SHOULD_APPEND_COMPONENT_STACK_KEY = 'React::DevTools::appendComponentStack';
const LOCAL_STORAGE_SHOW_INLINE_WARNINGS_AND_ERRORS_KEY = 'React::DevTools::showInlineWarningsAndErrors';
const LOCAL_STORAGE_TRACE_UPDATES_ENABLED_KEY = 'React::DevTools::traceUpdatesEnabled';
const LOCAL_STORAGE_HIDE_CONSOLE_LOGS_IN_STRICT_MODE = 'React::DevTools::hideConsoleLogsInStrictMode';
const PROFILER_EXPORT_VERSION = 5;

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return meta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dehydrate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fillInPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hydrate; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

const meta = {
  inspectable: Symbol('inspectable'),
  inspected: Symbol('inspected'),
  name: Symbol('name'),
  preview_long: Symbol('preview_long'),
  preview_short: Symbol('preview_short'),
  readonly: Symbol('readonly'),
  size: Symbol('size'),
  type: Symbol('type'),
  unserializable: Symbol('unserializable')
};
// This threshold determines the depth at which the bridge "dehydrates" nested data.
// Dehydration means that we don't serialize the data for e.g. postMessage or stringify,
// unless the frontend explicitly requests it (e.g. a user clicks to expand a props object).
//
// Reducing this threshold will improve the speed of initial component inspection,
// but may decrease the responsiveness of expanding objects/arrays to inspect further.
const LEVEL_THRESHOLD = 2;
/**
 * Generate the dehydrated metadata for complex object instances
 */

function createDehydrated(type, inspectable, data, cleaned, path) {
  cleaned.push(path);
  const dehydrated = {
    inspectable,
    type,
    preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
    preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
    name: !data.constructor || data.constructor.name === 'Object' ? '' : data.constructor.name
  };

  if (type === 'array' || type === 'typed_array') {
    dehydrated.size = data.length;
  } else if (type === 'object') {
    dehydrated.size = Object.keys(data).length;
  }

  if (type === 'iterator' || type === 'typed_array') {
    dehydrated.readonly = true;
  }

  return dehydrated;
}
/**
 * Strip out complex data (instances, functions, and data nested > LEVEL_THRESHOLD levels deep).
 * The paths of the stripped out objects are appended to the `cleaned` list.
 * On the other side of the barrier, the cleaned list is used to "re-hydrate" the cleaned representation into
 * an object with symbols as attributes, so that a sanitized object can be distinguished from a normal object.
 *
 * Input: {"some": {"attr": fn()}, "other": AnInstance}
 * Output: {
 *   "some": {
 *     "attr": {"name": the fn.name, type: "function"}
 *   },
 *   "other": {
 *     "name": "AnInstance",
 *     "type": "object",
 *   },
 * }
 * and cleaned = [["some", "attr"], ["other"]]
 */


function dehydrate(data, cleaned, unserializable, path, isPathAllowed, level = 0) {
  const type = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* getDataType */ "h"])(data);
  let isPathAllowedCheck;

  switch (type) {
    case 'html_element':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
        preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
        name: data.tagName,
        type
      };

    case 'function':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
        preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
        name: typeof data.name === 'function' || !data.name ? 'function' : data.name,
        type
      };

    case 'string':
      isPathAllowedCheck = isPathAllowed(path);

      if (isPathAllowedCheck) {
        return data;
      } else {
        return data.length <= 500 ? data : data.slice(0, 500) + '...';
      }

    case 'bigint':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
        preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
        name: data.toString(),
        type
      };

    case 'symbol':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
        preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
        name: data.toString(),
        type
      };
    // React Elements aren't very inspector-friendly,
    // and often contain private fields or circular references.

    case 'react_element':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
        preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
        name: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* getDisplayNameForReactElement */ "l"])(data) || 'Unknown',
        type
      };
    // ArrayBuffers error if you try to inspect them.

    case 'array_buffer':
    case 'data_view':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
        preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
        name: type === 'data_view' ? 'DataView' : 'ArrayBuffer',
        size: data.byteLength,
        type
      };

    case 'array':
      isPathAllowedCheck = isPathAllowed(path);

      if (level >= LEVEL_THRESHOLD && !isPathAllowedCheck) {
        return createDehydrated(type, true, data, cleaned, path);
      }

      return data.map((item, i) => dehydrate(item, cleaned, unserializable, path.concat([i]), isPathAllowed, isPathAllowedCheck ? 1 : level + 1));

    case 'html_all_collection':
    case 'typed_array':
    case 'iterator':
      isPathAllowedCheck = isPathAllowed(path);

      if (level >= LEVEL_THRESHOLD && !isPathAllowedCheck) {
        return createDehydrated(type, true, data, cleaned, path);
      } else {
        const unserializableValue = {
          unserializable: true,
          type: type,
          readonly: true,
          size: type === 'typed_array' ? data.length : undefined,
          preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
          preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
          name: !data.constructor || data.constructor.name === 'Object' ? '' : data.constructor.name
        }; // TRICKY
        // Don't use [...spread] syntax for this purpose.
        // This project uses @babel/plugin-transform-spread in "loose" mode which only works with Array values.
        // Other types (e.g. typed arrays, Sets) will not spread correctly.

        Array.from(data).forEach((item, i) => unserializableValue[i] = dehydrate(item, cleaned, unserializable, path.concat([i]), isPathAllowed, isPathAllowedCheck ? 1 : level + 1));
        unserializable.push(path);
        return unserializableValue;
      }

    case 'opaque_iterator':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
        preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
        name: data[Symbol.toStringTag],
        type
      };

    case 'date':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
        preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
        name: data.toString(),
        type
      };

    case 'regexp':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
        preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
        name: data.toString(),
        type
      };

    case 'object':
      isPathAllowedCheck = isPathAllowed(path);

      if (level >= LEVEL_THRESHOLD && !isPathAllowedCheck) {
        return createDehydrated(type, true, data, cleaned, path);
      } else {
        const object = {};
        Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* getAllEnumerableKeys */ "e"])(data).forEach(key => {
          const name = key.toString();
          object[name] = dehydrate(data[key], cleaned, unserializable, path.concat([name]), isPathAllowed, isPathAllowedCheck ? 1 : level + 1);
        });
        return object;
      }

    case 'class_instance':
      isPathAllowedCheck = isPathAllowed(path);

      if (level >= LEVEL_THRESHOLD && !isPathAllowedCheck) {
        return createDehydrated(type, true, data, cleaned, path);
      }

      const value = {
        unserializable: true,
        type,
        readonly: true,
        preview_short: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, false),
        preview_long: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatDataForPreview */ "d"])(data, true),
        name: data.constructor.name
      };
      Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* getAllEnumerableKeys */ "e"])(data).forEach(key => {
        const keyAsString = key.toString();
        value[keyAsString] = dehydrate(data[key], cleaned, unserializable, path.concat([keyAsString]), isPathAllowed, isPathAllowedCheck ? 1 : level + 1);
      });
      unserializable.push(path);
      return value;

    case 'infinity':
    case 'nan':
    case 'undefined':
      // Some values are lossy when sent through a WebSocket.
      // We dehydrate+rehydrate them to preserve their type.
      cleaned.push(path);
      return {
        type
      };

    default:
      return data;
  }
}
function fillInPath(object, data, path, value) {
  const target = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* getInObject */ "n"])(object, path);

  if (target != null) {
    if (!target[meta.unserializable]) {
      delete target[meta.inspectable];
      delete target[meta.inspected];
      delete target[meta.name];
      delete target[meta.preview_long];
      delete target[meta.preview_short];
      delete target[meta.readonly];
      delete target[meta.size];
      delete target[meta.type];
    }
  }

  if (value !== null && data.unserializable.length > 0) {
    const unserializablePath = data.unserializable[0];
    let isMatch = unserializablePath.length === path.length;

    for (let i = 0; i < path.length; i++) {
      if (path[i] !== unserializablePath[i]) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      upgradeUnserializable(value, value);
    }
  }

  Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* setInObject */ "v"])(object, path, value);
}
function hydrate(object, cleaned, unserializable) {
  cleaned.forEach(path => {
    const length = path.length;
    const last = path[length - 1];
    const parent = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* getInObject */ "n"])(object, path.slice(0, length - 1));

    if (!parent || !parent.hasOwnProperty(last)) {
      return;
    }

    const value = parent[last];

    if (!value) {
      return;
    } else if (value.type === 'infinity') {
      parent[last] = Infinity;
    } else if (value.type === 'nan') {
      parent[last] = NaN;
    } else if (value.type === 'undefined') {
      parent[last] = undefined;
    } else {
      // Replace the string keys with Symbols so they're non-enumerable.
      const replaced = {};
      replaced[meta.inspectable] = !!value.inspectable;
      replaced[meta.inspected] = false;
      replaced[meta.name] = value.name;
      replaced[meta.preview_long] = value.preview_long;
      replaced[meta.preview_short] = value.preview_short;
      replaced[meta.size] = value.size;
      replaced[meta.readonly] = !!value.readonly;
      replaced[meta.type] = value.type;
      parent[last] = replaced;
    }
  });
  unserializable.forEach(path => {
    const length = path.length;
    const last = path[length - 1];
    const parent = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* getInObject */ "n"])(object, path.slice(0, length - 1));

    if (!parent || !parent.hasOwnProperty(last)) {
      return;
    }

    const node = parent[last];
    const replacement = { ...node
    };
    upgradeUnserializable(replacement, node);
    parent[last] = replacement;
  });
  return object;
}

function upgradeUnserializable(destination, source) {
  Object.defineProperties(destination, {
    // $FlowFixMe[invalid-computed-prop]
    [meta.inspected]: {
      configurable: true,
      enumerable: false,
      value: !!source.inspected
    },
    // $FlowFixMe[invalid-computed-prop]
    [meta.name]: {
      configurable: true,
      enumerable: false,
      value: source.name
    },
    // $FlowFixMe[invalid-computed-prop]
    [meta.preview_long]: {
      configurable: true,
      enumerable: false,
      value: source.preview_long
    },
    // $FlowFixMe[invalid-computed-prop]
    [meta.preview_short]: {
      configurable: true,
      enumerable: false,
      value: source.preview_short
    },
    // $FlowFixMe[invalid-computed-prop]
    [meta.size]: {
      configurable: true,
      enumerable: false,
      value: source.size
    },
    // $FlowFixMe[invalid-computed-prop]
    [meta.readonly]: {
      configurable: true,
      enumerable: false,
      value: !!source.readonly
    },
    // $FlowFixMe[invalid-computed-prop]
    [meta.type]: {
      configurable: true,
      enumerable: false,
      value: source.type
    },
    // $FlowFixMe[invalid-computed-prop]
    [meta.unserializable]: {
      configurable: true,
      enumerable: false,
      value: !!source.unserializable
    }
  });
  delete destination.inspected;
  delete destination.name;
  delete destination.preview_long;
  delete destination.preview_short;
  delete destination.size;
  delete destination.readonly;
  delete destination.type;
  delete destination.unserializable;
}

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(63);
} else {}

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_devtools_shared_src_backend_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


let welcomeHasInitialized = false;

function welcome(event) {
  if (event.source !== window || event.data.source !== 'react-devtools-content-script') {
    return;
  } // In some circumstances, this method is called more than once for a single welcome message.
  // The exact circumstances of this are unclear, though it seems related to 3rd party event batching code.
  //
  // Regardless, call this method multiple times can cause DevTools to add duplicate elements to the Store
  // (and throw an error) or worse yet, choke up entirely and freeze the browser.
  //
  // The simplest solution is to ignore the duplicate events.
  // To be clear, this SHOULD NOT BE NECESSARY, since we remove the event handler below.
  //
  // See https://github.com/facebook/react/issues/24162


  if (welcomeHasInitialized) {
    console.warn('React DevTools detected duplicate welcome "message" events from the content script.');
    return;
  }

  welcomeHasInitialized = true;
  window.removeEventListener('message', welcome);
  setup(window.__REACT_DEVTOOLS_GLOBAL_HOOK__);
}

window.addEventListener('message', welcome);

function setup(hook) {
  // this should not happen, but Chrome can be weird sometimes
  if (hook == null) {
    return;
  } // register renderers that have already injected themselves.


  hook.renderers.forEach(renderer => {
    registerRenderer(renderer, hook);
  }); // Activate and remove from required all present backends, registered within the hook

  hook.backends.forEach((_, backendVersion) => {
    requiredBackends.delete(backendVersion);
    activateBackend(backendVersion, hook);
  });
  updateRequiredBackends(); // register renderers that inject themselves later.

  hook.sub('renderer', ({
    renderer
  }) => {
    registerRenderer(renderer, hook);
    updateRequiredBackends();
  }); // listen for backend installations.

  hook.sub('devtools-backend-installed', version => {
    activateBackend(version, hook);
    updateRequiredBackends();
  });
}

const requiredBackends = new Set();

function registerRenderer(renderer, hook) {
  let version = renderer.reconcilerVersion || renderer.version;

  if (!Object(react_devtools_shared_src_backend_utils__WEBPACK_IMPORTED_MODULE_0__[/* hasAssignedBackend */ "j"])(version)) {
    version = _utils__WEBPACK_IMPORTED_MODULE_1__[/* COMPACT_VERSION_NAME */ "a"];
  } // Check if required backend is already activated, no need to require again


  if (!hook.backends.has(version)) {
    requiredBackends.add(version);
  }
}

function activateBackend(version, hook) {
  const backend = hook.backends.get(version);

  if (!backend) {
    throw new Error(`Could not find backend for version "${version}"`);
  }

  const {
    Agent,
    Bridge,
    initBackend,
    setupNativeStyleEditor
  } = backend;
  const bridge = new Bridge({
    listen(fn) {
      const listener = event => {
        if (event.source !== window || !event.data || event.data.source !== 'react-devtools-content-script' || !event.data.payload) {
          return;
        }

        fn(event.data.payload);
      };

      window.addEventListener('message', listener);
      return () => {
        window.removeEventListener('message', listener);
      };
    },

    send(event, payload, transferable) {
      window.postMessage({
        source: 'react-devtools-bridge',
        payload: {
          event,
          payload
        }
      }, '*', transferable);
    }

  });
  const agent = new Agent(bridge);
  agent.addListener('shutdown', () => {
    // If we received 'shutdown' from `agent`, we assume the `bridge` is already shutting down,
    // and that caused the 'shutdown' event on the `agent`, so we don't need to call `bridge.shutdown()` here.
    hook.emit('shutdown');
  });
  initBackend(hook, agent, window); // Setup React Native style editor if a renderer like react-native-web has injected it.

  if (typeof setupNativeStyleEditor === 'function' && hook.resolveRNStyle) {
    setupNativeStyleEditor(bridge, agent, hook.resolveRNStyle, hook.nativeStyleEditorValidAttributes);
  } // Let the frontend know that the backend has attached listeners and is ready for messages.
  // This covers the case of syncing saved values after reloading/navigating while DevTools remain open.


  bridge.send('extensionBackendInitialized'); // this backend is activated

  requiredBackends.delete(version);
} // tell the service worker which versions of backends are needed for the current page


function updateRequiredBackends() {
  if (requiredBackends.size === 0) {
    return;
  }

  window.postMessage({
    source: 'react-devtools-backend-manager',
    payload: {
      type: 'react-devtools-required-backends',
      versions: Array.from(requiredBackends)
    }
  }, '*');
}

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return IS_EDGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return IS_FIREFOX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return IS_CHROME; });
/* unused harmony export getBrowserName */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getBrowserTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COMPACT_VERSION_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EXTENSION_CONTAINED_VERSIONS; });
/* global chrome */
const IS_EDGE = navigator.userAgent.indexOf('Edg') >= 0;
const IS_FIREFOX = navigator.userAgent.indexOf('Firefox') >= 0;
const IS_CHROME = IS_EDGE === false && IS_FIREFOX === false;
function getBrowserName() {
  if (IS_EDGE) {
    return 'Edge';
  }

  if (IS_FIREFOX) {
    return 'Firefox';
  }

  if (IS_CHROME) {
    return 'Chrome';
  }

  throw new Error('Expected browser name to be one of Chrome, Edge or Firefox.');
}
function getBrowserTheme() {
  if (IS_CHROME) {
    // chrome.devtools.panels added in Chrome 18.
    // chrome.devtools.panels.themeName added in Chrome 54.
    return chrome.devtools.panels.themeName === 'dark' ? 'dark' : 'light';
  } else {
    // chrome.devtools.panels.themeName added in Firefox 55.
    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.panels/themeName
    if (chrome.devtools && chrome.devtools.panels) {
      switch (chrome.devtools.panels.themeName) {
        case 'dark':
          return 'dark';

        default:
          return 'light';
      }
    }
  }
}
const COMPACT_VERSION_NAME = 'compact';
const EXTENSION_CONTAINED_VERSIONS = [COMPACT_VERSION_NAME];

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "j", function() { return /* binding */ hasAssignedBackend; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ cleanForBridge; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ copyWithDelete; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ copyWithRename; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ copyWithSet; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* binding */ getEffectDurations; });
__webpack_require__.d(__webpack_exports__, "k", function() { return /* binding */ serializeToString; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ formatWithStyles; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ format; });
__webpack_require__.d(__webpack_exports__, "h", function() { return /* binding */ gt; });
__webpack_require__.d(__webpack_exports__, "i", function() { return /* binding */ gte; });

// UNUSED EXPORTS: isSynchronousXHRSupported

// CONCATENATED MODULE: /Users/hoxy/repos/react/node_modules/compare-versions/lib/esm/index.js
/**
 * Compare [semver](https://semver.org/) version strings to find greater, equal or lesser.
 * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
 * @param v1 - First version to compare
 * @param v2 - Second version to compare
 * @returns Numeric value compatible with the [Array.sort(fn) interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters).
 */
const compareVersions = (v1, v2) => {
  // validate input and split into segments
  const n1 = validateAndParse(v1);
  const n2 = validateAndParse(v2); // pop off the patch

  const p1 = n1.pop();
  const p2 = n2.pop(); // validate numbers

  const r = compareSegments(n1, n2);
  if (r !== 0) return r; // validate pre-release

  if (p1 && p2) {
    return compareSegments(p1.split('.'), p2.split('.'));
  } else if (p1 || p2) {
    return p1 ? -1 : 1;
  }

  return 0;
};
/**
 * Validate [semver](https://semver.org/) version strings.
 *
 * @param version Version number to validate
 * @returns `true` if the version number is a valid semver version number, `false` otherwise.
 *
 * @example
 * ```
 * validate('1.0.0-rc.1'); // return true
 * validate('1.0-rc.1'); // return false
 * validate('foo'); // return false
 * ```
 */

const validate = version => typeof version === 'string' && /^[v\d]/.test(version) && semver.test(version);
/**
 * Compare [semver](https://semver.org/) version strings using the specified operator.
 *
 * @param v1 First version to compare
 * @param v2 Second version to compare
 * @param operator Allowed arithmetic operator to use
 * @returns `true` if the comparison between the firstVersion and the secondVersion satisfies the operator, `false` otherwise.
 *
 * @example
 * ```
 * compare('10.1.8', '10.0.4', '>'); // return true
 * compare('10.0.1', '10.0.1', '='); // return true
 * compare('10.1.1', '10.2.2', '<'); // return true
 * compare('10.1.1', '10.2.2', '<='); // return true
 * compare('10.1.1', '10.2.2', '>='); // return false
 * ```
 */

const compare = (v1, v2, operator) => {
  // validate input operator
  assertValidOperator(operator); // since result of compareVersions can only be -1 or 0 or 1
  // a simple map can be used to replace switch

  const res = compareVersions(v1, v2);
  return operatorResMap[operator].includes(res);
};
/**
 * Match [npm semver](https://docs.npmjs.com/cli/v6/using-npm/semver) version range.
 *
 * @param version Version number to match
 * @param range Range pattern for version
 * @returns `true` if the version number is within the range, `false` otherwise.
 *
 * @example
 * ```
 * satisfies('1.1.0', '^1.0.0'); // return true
 * satisfies('1.1.0', '~1.0.0'); // return false
 * ```
 */

const satisfies = (version, range) => {
  // if no range operator then "="
  const m = range.match(/^([<>=~^]+)/);
  const op = m ? m[1] : '='; // if gt/lt/eq then operator compare

  if (op !== '^' && op !== '~') return compare(version, range, op); // else range of either "~" or "^" is assumed

  const [v1, v2, v3,, vp] = validateAndParse(version);
  const [r1, r2, r3,, rp] = validateAndParse(range);
  const v = [v1, v2, v3];
  const r = [r1, r2 !== null && r2 !== void 0 ? r2 : 'x', r3 !== null && r3 !== void 0 ? r3 : 'x']; // validate pre-release

  if (rp) {
    if (!vp) return false;
    if (compareSegments(v, r) !== 0) return false;
    if (compareSegments(vp.split('.'), rp.split('.')) === -1) return false;
  } // first non-zero number


  const nonZero = r.findIndex(v => v !== '0') + 1; // pointer to where segments can be >=

  const i = op === '~' ? 2 : nonZero > 1 ? nonZero : 1; // before pointer must be equal

  if (compareSegments(v.slice(0, i), r.slice(0, i)) !== 0) return false; // after pointer must be >=

  if (compareSegments(v.slice(i), r.slice(i)) === -1) return false;
  return true;
};
const semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;

const validateAndParse = version => {
  if (typeof version !== 'string') {
    throw new TypeError('Invalid argument expected string');
  }

  const match = version.match(semver);

  if (!match) {
    throw new Error(`Invalid argument not valid semver ('${version}' received)`);
  }

  match.shift();
  return match;
};

const isWildcard = s => s === '*' || s === 'x' || s === 'X';

const tryParse = v => {
  const n = parseInt(v, 10);
  return isNaN(n) ? v : n;
};

const forceType = (a, b) => typeof a !== typeof b ? [String(a), String(b)] : [a, b];

const compareStrings = (a, b) => {
  if (isWildcard(a) || isWildcard(b)) return 0;
  const [ap, bp] = forceType(tryParse(a), tryParse(b));
  if (ap > bp) return 1;
  if (ap < bp) return -1;
  return 0;
};

const compareSegments = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const r = compareStrings(a[i] || '0', b[i] || '0');
    if (r !== 0) return r;
  }

  return 0;
};

const operatorResMap = {
  '>': [1],
  '>=': [0, 1],
  '=': [0],
  '<=': [-1, 0],
  '<': [-1]
};
const allowedOperators = Object.keys(operatorResMap);

const assertValidOperator = op => {
  if (typeof op !== 'string') {
    throw new TypeError(`Invalid operator type, expected string but got ${typeof op}`);
  }

  if (allowedOperators.indexOf(op) === -1) {
    throw new Error(`Invalid operator, expected one of ${allowedOperators.join('|')}`);
  }
};
// EXTERNAL MODULE: ../react-devtools-shared/src/hydration.js
var hydration = __webpack_require__(11);

// EXTERNAL MODULE: ../shared/isArray.js
var isArray = __webpack_require__(26);

// CONCATENATED MODULE: ../react-devtools-shared/src/backend/utils.js
/**
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



// TODO: update this to the first React version that has a corresponding DevTools backend
const FIRST_DEVTOOLS_BACKEND_LOCKSTEP_VER = '999.9.9';
function hasAssignedBackend(version) {
  if (version == null || version === '') {
    return false;
  }

  return gte(version, FIRST_DEVTOOLS_BACKEND_LOCKSTEP_VER);
}
function cleanForBridge(data, isPathAllowed, path = []) {
  if (data !== null) {
    const cleanedPaths = [];
    const unserializablePaths = [];
    const cleanedData = Object(hydration["a" /* dehydrate */])(data, cleanedPaths, unserializablePaths, path, isPathAllowed);
    return {
      data: cleanedData,
      cleaned: cleanedPaths,
      unserializable: unserializablePaths
    };
  } else {
    return null;
  }
}
function copyWithDelete(obj, path, index = 0) {
  const key = path[index];
  const updated = Object(isArray["a" /* default */])(obj) ? obj.slice() : { ...obj
  };

  if (index + 1 === path.length) {
    if (Object(isArray["a" /* default */])(updated)) {
      updated.splice(key, 1);
    } else {
      delete updated[key];
    }
  } else {
    // $FlowFixMe[incompatible-use] number or string is fine here
    updated[key] = copyWithDelete(obj[key], path, index + 1);
  }

  return updated;
} // This function expects paths to be the same except for the final value.
// e.g. ['path', 'to', 'foo'] and ['path', 'to', 'bar']

function copyWithRename(obj, oldPath, newPath, index = 0) {
  const oldKey = oldPath[index];
  const updated = Object(isArray["a" /* default */])(obj) ? obj.slice() : { ...obj
  };

  if (index + 1 === oldPath.length) {
    const newKey = newPath[index]; // $FlowFixMe[incompatible-use] number or string is fine here

    updated[newKey] = updated[oldKey];

    if (Object(isArray["a" /* default */])(updated)) {
      updated.splice(oldKey, 1);
    } else {
      delete updated[oldKey];
    }
  } else {
    // $FlowFixMe[incompatible-use] number or string is fine here
    updated[oldKey] = copyWithRename(obj[oldKey], oldPath, newPath, index + 1);
  }

  return updated;
}
function copyWithSet(obj, path, value, index = 0) {
  if (index >= path.length) {
    return value;
  }

  const key = path[index];
  const updated = Object(isArray["a" /* default */])(obj) ? obj.slice() : { ...obj
  }; // $FlowFixMe[incompatible-use] number or string is fine here

  updated[key] = copyWithSet(obj[key], path, value, index + 1);
  return updated;
}
function getEffectDurations(root) {
  // Profiling durations are only available for certain builds.
  // If available, they'll be stored on the HostRoot.
  let effectDuration = null;
  let passiveEffectDuration = null;
  const hostRoot = root.current;

  if (hostRoot != null) {
    const stateNode = hostRoot.stateNode;

    if (stateNode != null) {
      effectDuration = stateNode.effectDuration != null ? stateNode.effectDuration : null;
      passiveEffectDuration = stateNode.passiveEffectDuration != null ? stateNode.passiveEffectDuration : null;
    }
  }

  return {
    effectDuration,
    passiveEffectDuration
  };
}
function serializeToString(data) {
  if (data === undefined) {
    return 'undefined';
  }

  const cache = new Set(); // Use a custom replacer function to protect against circular references.

  return JSON.stringify(data, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return;
      }

      cache.add(value);
    }

    if (typeof value === 'bigint') {
      return value.toString() + 'n';
    }

    return value;
  }, 2);
} // Formats an array of args with a style for console methods, using
// the following algorithm:
//     1. The first param is a string that contains %c
//          - Bail out and return the args without modifying the styles.
//            We don't want to affect styles that the developer deliberately set.
//     2. The first param is a string that doesn't contain %c but contains
//        string formatting
//          - [`%c${args[0]}`, style, ...args.slice(1)]
//          - Note: we assume that the string formatting that the developer uses
//            is correct.
//     3. The first param is a string that doesn't contain string formatting
//        OR is not a string
//          - Create a formatting string where:
//                 boolean, string, symbol -> %s
//                 number -> %f OR %i depending on if it's an int or float
//                 default -> %o

function formatWithStyles(inputArgs, style) {
  if (inputArgs === undefined || inputArgs === null || inputArgs.length === 0 || // Matches any of %c but not %%c
  typeof inputArgs[0] === 'string' && inputArgs[0].match(/([^%]|^)(%c)/g) || style === undefined) {
    return inputArgs;
  } // Matches any of %(o|O|d|i|s|f), but not %%(o|O|d|i|s|f)


  const REGEXP = /([^%]|^)((%%)*)(%([oOdisf]))/g;

  if (typeof inputArgs[0] === 'string' && inputArgs[0].match(REGEXP)) {
    return [`%c${inputArgs[0]}`, style, ...inputArgs.slice(1)];
  } else {
    const firstArg = inputArgs.reduce((formatStr, elem, i) => {
      if (i > 0) {
        formatStr += ' ';
      }

      switch (typeof elem) {
        case 'string':
        case 'boolean':
        case 'symbol':
          return formatStr += '%s';

        case 'number':
          const formatting = Number.isInteger(elem) ? '%i' : '%f';
          return formatStr += formatting;

        default:
          return formatStr += '%o';
      }
    }, '%c');
    return [firstArg, style, ...inputArgs];
  }
} // based on https://github.com/tmpfs/format-util/blob/0e62d430efb0a1c51448709abd3e2406c14d8401/format.js#L1
// based on https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions
// Implements s, d, i and f placeholders
// NOTE: KEEP IN SYNC with src/hook.js

function format(maybeMessage, ...inputArgs) {
  const args = inputArgs.slice();
  let formatted = String(maybeMessage); // If the first argument is a string, check for substitutions.

  if (typeof maybeMessage === 'string') {
    if (args.length) {
      const REGEXP = /(%?)(%([jds]))/g;
      formatted = formatted.replace(REGEXP, (match, escaped, ptn, flag) => {
        let arg = args.shift();

        switch (flag) {
          case 's':
            arg += '';
            break;

          case 'd':
          case 'i':
            arg = parseInt(arg, 10).toString();
            break;

          case 'f':
            arg = parseFloat(arg).toString();
            break;
        }

        if (!escaped) {
          return arg;
        }

        args.unshift(arg);
        return match;
      });
    }
  } // Arguments that remain after formatting.


  if (args.length) {
    for (let i = 0; i < args.length; i++) {
      formatted += ' ' + String(args[i]);
    }
  } // Update escaped %% values.


  formatted = formatted.replace(/%{2,2}/g, '%');
  return String(formatted);
}
function isSynchronousXHRSupported() {
  return !!(window.document && window.document.featurePolicy && window.document.featurePolicy.allowsFeature('sync-xhr'));
}
function gt(a = '', b = '') {
  return compareVersions(a, b) === 1;
}
function gte(a = '', b = '') {
  return compareVersions(a, b) > -1;
}

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const isArray = Array.isArray;
/* harmony default export */ __webpack_exports__["a"] = (isArray);

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ getAllEnumerableKeys; });
__webpack_require__.d(__webpack_exports__, "s", function() { return /* binding */ getWrappedDisplayName; });
__webpack_require__.d(__webpack_exports__, "k", function() { return /* binding */ getDisplayName; });
__webpack_require__.d(__webpack_exports__, "r", function() { return /* binding */ getUID; });
__webpack_require__.d(__webpack_exports__, "y", function() { return /* binding */ utfDecodeString; });
__webpack_require__.d(__webpack_exports__, "z", function() { return /* binding */ utfEncodeString; });
__webpack_require__.d(__webpack_exports__, "i", function() { return /* binding */ getDefaultComponentFilters; });
__webpack_require__.d(__webpack_exports__, "p", function() { return /* binding */ getSavedComponentFilters; });
__webpack_require__.d(__webpack_exports__, "w", function() { return /* binding */ setSavedComponentFilters; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ castBool; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ castBrowserTheme; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ getAppendComponentStack; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* binding */ getBreakOnConsoleErrors; });
__webpack_require__.d(__webpack_exports__, "m", function() { return /* binding */ getHideConsoleLogsInStrictMode; });
__webpack_require__.d(__webpack_exports__, "q", function() { return /* binding */ getShowInlineWarningsAndErrors; });
__webpack_require__.d(__webpack_exports__, "j", function() { return /* binding */ getDefaultOpenInEditorURL; });
__webpack_require__.d(__webpack_exports__, "o", function() { return /* binding */ getOpenInEditorURL; });
__webpack_require__.d(__webpack_exports__, "u", function() { return /* binding */ separateDisplayNameAndHOCs; });
__webpack_require__.d(__webpack_exports__, "x", function() { return /* binding */ shallowDiffers; });
__webpack_require__.d(__webpack_exports__, "n", function() { return /* binding */ getInObject; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ deletePathInObject; });
__webpack_require__.d(__webpack_exports__, "t", function() { return /* binding */ renamePathInObject; });
__webpack_require__.d(__webpack_exports__, "v", function() { return /* binding */ setInObject; });
__webpack_require__.d(__webpack_exports__, "h", function() { return /* binding */ getDataType; });
__webpack_require__.d(__webpack_exports__, "l", function() { return /* binding */ getDisplayNameForReactElement; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ formatDataForPreview; });

// UNUSED EXPORTS: alphaSortKeys, printOperationsArray, isPlainObject

// EXTERNAL MODULE: /Users/hoxy/repos/react/node_modules/lru-cache/index.js
var lru_cache = __webpack_require__(41);
var lru_cache_default = /*#__PURE__*/__webpack_require__.n(lru_cache);

// EXTERNAL MODULE: /Users/hoxy/repos/react/build/oss-experimental/react-is/index.js
var react_is = __webpack_require__(12);

// CONCATENATED MODULE: ../shared/ReactSymbols.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
const REACT_ELEMENT_TYPE = Symbol.for('react.element');
const REACT_PORTAL_TYPE = Symbol.for('react.portal');
const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
const REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
const REACT_PROFILER_TYPE = Symbol.for('react.profiler');
const REACT_PROVIDER_TYPE = Symbol.for('react.provider');
const REACT_CONTEXT_TYPE = Symbol.for('react.context');
const REACT_SERVER_CONTEXT_TYPE = Symbol.for('react.server_context');
const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
const REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
const REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
const REACT_MEMO_TYPE = Symbol.for('react.memo');
const REACT_LAZY_TYPE = Symbol.for('react.lazy');
const REACT_SCOPE_TYPE = Symbol.for('react.scope');
const REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for('react.debug_trace_mode');
const REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
const REACT_LEGACY_HIDDEN_TYPE = Symbol.for('react.legacy_hidden');
const REACT_CACHE_TYPE = Symbol.for('react.cache');
const REACT_TRACING_MARKER_TYPE = Symbol.for('react.tracing_marker');
const REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for('react.default_value');
const REACT_MEMO_CACHE_SENTINEL = Symbol.for('react.memo_cache_sentinel');
const MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
const FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  const maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}
// EXTERNAL MODULE: ../react-devtools-shared/src/constants.js
var constants = __webpack_require__(1);

// EXTERNAL MODULE: ../react-devtools-shared/src/types.js
var types = __webpack_require__(3);

// EXTERNAL MODULE: ../react-devtools-shared/src/storage.js
var storage = __webpack_require__(8);

// EXTERNAL MODULE: ../react-devtools-shared/src/hydration.js
var hydration = __webpack_require__(11);

// EXTERNAL MODULE: ../react-devtools-shared/src/isArray.js
var isArray = __webpack_require__(19);

// CONCATENATED MODULE: ../react-devtools-shared/src/utils.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */









// $FlowFixMe[method-unbinding]
const utils_hasOwnProperty = Object.prototype.hasOwnProperty;
const cachedDisplayNames = new WeakMap(); // On large trees, encoding takes significant time.
// Try to reuse the already encoded strings.

const encodedStringCache = new lru_cache_default.a({
  max: 1000
});
function alphaSortKeys(a, b) {
  if (a.toString() > b.toString()) {
    return 1;
  } else if (b.toString() > a.toString()) {
    return -1;
  } else {
    return 0;
  }
}
function getAllEnumerableKeys(obj) {
  const keys = new Set();
  let current = obj;

  while (current != null) {
    const currentKeys = [...Object.keys(current), ...Object.getOwnPropertySymbols(current)];
    const descriptors = Object.getOwnPropertyDescriptors(current);
    currentKeys.forEach(key => {
      // $FlowFixMe[incompatible-type]: key can be a Symbol https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
      if (descriptors[key].enumerable) {
        keys.add(key);
      }
    });
    current = Object.getPrototypeOf(current);
  }

  return keys;
} // Mirror https://github.com/facebook/react/blob/7c21bf72ace77094fd1910cc350a548287ef8350/packages/shared/getComponentName.js#L27-L37

function getWrappedDisplayName(outerType, innerType, wrapperName, fallbackName) {
  const displayName = outerType.displayName;
  return displayName || `${wrapperName}(${getDisplayName(innerType, fallbackName)})`;
}
function getDisplayName(type, fallbackName = 'Anonymous') {
  const nameFromCache = cachedDisplayNames.get(type);

  if (nameFromCache != null) {
    return nameFromCache;
  }

  let displayName = fallbackName; // The displayName property is not guaranteed to be a string.
  // It's only safe to use for our purposes if it's a string.
  // github.com/facebook/react-devtools/issues/803

  if (typeof type.displayName === 'string') {
    displayName = type.displayName;
  } else if (typeof type.name === 'string' && type.name !== '') {
    displayName = type.name;
  }

  cachedDisplayNames.set(type, displayName);
  return displayName;
}
let uidCounter = 0;
function getUID() {
  return ++uidCounter;
}
function utfDecodeString(array) {
  // Avoid spreading the array (e.g. String.fromCodePoint(...array))
  // Functions arguments are first placed on the stack before the function is called
  // which throws a RangeError for large arrays.
  // See github.com/facebook/react/issues/22293
  let string = '';

  for (let i = 0; i < array.length; i++) {
    const char = array[i];
    string += String.fromCodePoint(char);
  }

  return string;
}

function surrogatePairToCodePoint(charCode1, charCode2) {
  return ((charCode1 & 0x3ff) << 10) + (charCode2 & 0x3ff) + 0x10000;
} // Credit for this encoding approach goes to Tim Down:
// https://stackoverflow.com/questions/4877326/how-can-i-tell-if-a-string-contains-multibyte-characters-in-javascript


function utfEncodeString(string) {
  const cached = encodedStringCache.get(string);

  if (cached !== undefined) {
    return cached;
  }

  const encoded = [];
  let i = 0;
  let charCode;

  while (i < string.length) {
    charCode = string.charCodeAt(i); // Handle multibyte unicode characters (like emoji).

    if ((charCode & 0xf800) === 0xd800) {
      encoded.push(surrogatePairToCodePoint(charCode, string.charCodeAt(++i)));
    } else {
      encoded.push(charCode);
    }

    ++i;
  }

  encodedStringCache.set(string, encoded);
  return encoded;
}
function printOperationsArray(operations) {
  // The first two values are always rendererID and rootID
  const rendererID = operations[0];
  const rootID = operations[1];
  const logs = [`operations for renderer:${rendererID} and root:${rootID}`];
  let i = 2; // Reassemble the string table.

  const stringTable = [null // ID = 0 corresponds to the null string.
  ];
  const stringTableSize = operations[i++];
  const stringTableEnd = i + stringTableSize;

  while (i < stringTableEnd) {
    const nextLength = operations[i++];
    const nextString = utfDecodeString(operations.slice(i, i + nextLength));
    stringTable.push(nextString);
    i += nextLength;
  }

  while (i < operations.length) {
    const operation = operations[i];

    switch (operation) {
      case constants["s" /* TREE_OPERATION_ADD */]:
        {
          const id = operations[i + 1];
          const type = operations[i + 2];
          i += 3;

          if (type === types["m" /* ElementTypeRoot */]) {
            logs.push(`Add new root node ${id}`);
            i++; // isStrictModeCompliant

            i++; // supportsProfiling

            i++; // supportsStrictMode

            i++; // hasOwnerMetadata
          } else {
            const parentID = operations[i];
            i++;
            i++; // ownerID

            const displayNameStringID = operations[i];
            const displayName = stringTable[displayNameStringID];
            i++;
            i++; // key

            logs.push(`Add node ${id} (${displayName || 'null'}) as child of ${parentID}`);
          }

          break;
        }

      case constants["t" /* TREE_OPERATION_REMOVE */]:
        {
          const removeLength = operations[i + 1];
          i += 2;

          for (let removeIndex = 0; removeIndex < removeLength; removeIndex++) {
            const id = operations[i];
            i += 1;
            logs.push(`Remove node ${id}`);
          }

          break;
        }

      case constants["u" /* TREE_OPERATION_REMOVE_ROOT */]:
        {
          i += 1;
          logs.push(`Remove root ${rootID}`);
          break;
        }

      case constants["w" /* TREE_OPERATION_SET_SUBTREE_MODE */]:
        {
          const id = operations[i + 1];
          const mode = operations[i + 1];
          i += 3;
          logs.push(`Mode ${mode} set for subtree with root ${id}`);
          break;
        }

      case constants["v" /* TREE_OPERATION_REORDER_CHILDREN */]:
        {
          const id = operations[i + 1];
          const numChildren = operations[i + 2];
          i += 3;
          const children = operations.slice(i, i + numChildren);
          i += numChildren;
          logs.push(`Re-order node ${id} children ${children.join(',')}`);
          break;
        }

      case constants["y" /* TREE_OPERATION_UPDATE_TREE_BASE_DURATION */]:
        // Base duration updates are only sent while profiling is in progress.
        // We can ignore them at this point.
        // The profiler UI uses them lazily in order to generate the tree.
        i += 3;
        break;

      case constants["x" /* TREE_OPERATION_UPDATE_ERRORS_OR_WARNINGS */]:
        const id = operations[i + 1];
        const numErrors = operations[i + 2];
        const numWarnings = operations[i + 3];
        i += 4;
        logs.push(`Node ${id} has ${numErrors} errors and ${numWarnings} warnings`);
        break;

      default:
        throw Error(`Unsupported Bridge operation "${operation}"`);
    }
  }

  console.log(logs.join('\n  '));
}
function getDefaultComponentFilters() {
  return [{
    type: types["b" /* ComponentFilterElementType */],
    value: types["i" /* ElementTypeHostComponent */],
    isEnabled: true
  }];
}
function getSavedComponentFilters() {
  try {
    const raw = Object(storage["a" /* localStorageGetItem */])(constants["e" /* LOCAL_STORAGE_COMPONENT_FILTER_PREFERENCES_KEY */]);

    if (raw != null) {
      return JSON.parse(raw);
    }
  } catch (error) {}

  return getDefaultComponentFilters();
}
function setSavedComponentFilters(componentFilters) {
  Object(storage["c" /* localStorageSetItem */])(constants["e" /* LOCAL_STORAGE_COMPONENT_FILTER_PREFERENCES_KEY */], JSON.stringify(componentFilters));
}

function parseBool(s) {
  if (s === 'true') {
    return true;
  }

  if (s === 'false') {
    return false;
  }
}

function castBool(v) {
  if (v === true || v === false) {
    return v;
  }
}
function castBrowserTheme(v) {
  if (v === 'light' || v === 'dark' || v === 'auto') {
    return v;
  }
}
function getAppendComponentStack() {
  var _parseBool;

  const raw = Object(storage["a" /* localStorageGetItem */])(constants["j" /* LOCAL_STORAGE_SHOULD_APPEND_COMPONENT_STACK_KEY */]);
  return (_parseBool = parseBool(raw)) !== null && _parseBool !== void 0 ? _parseBool : true;
}
function getBreakOnConsoleErrors() {
  var _parseBool2;

  const raw = Object(storage["a" /* localStorageGetItem */])(constants["k" /* LOCAL_STORAGE_SHOULD_BREAK_ON_CONSOLE_ERRORS */]);
  return (_parseBool2 = parseBool(raw)) !== null && _parseBool2 !== void 0 ? _parseBool2 : false;
}
function getHideConsoleLogsInStrictMode() {
  var _parseBool3;

  const raw = Object(storage["a" /* localStorageGetItem */])(constants["g" /* LOCAL_STORAGE_HIDE_CONSOLE_LOGS_IN_STRICT_MODE */]);
  return (_parseBool3 = parseBool(raw)) !== null && _parseBool3 !== void 0 ? _parseBool3 : false;
}
function getShowInlineWarningsAndErrors() {
  var _parseBool4;

  const raw = Object(storage["a" /* localStorageGetItem */])(constants["l" /* LOCAL_STORAGE_SHOW_INLINE_WARNINGS_AND_ERRORS_KEY */]);
  return (_parseBool4 = parseBool(raw)) !== null && _parseBool4 !== void 0 ? _parseBool4 : true;
}
function getDefaultOpenInEditorURL() {
  return typeof null === 'string' ? null : '';
}
function getOpenInEditorURL() {
  try {
    const raw = Object(storage["a" /* localStorageGetItem */])(constants["h" /* LOCAL_STORAGE_OPEN_IN_EDITOR_URL */]);

    if (raw != null) {
      return JSON.parse(raw);
    }
  } catch (error) {}

  return getDefaultOpenInEditorURL();
}
function separateDisplayNameAndHOCs(displayName, type) {
  if (displayName === null) {
    return [null, null];
  }

  let hocDisplayNames = null;

  switch (type) {
    case types["e" /* ElementTypeClass */]:
    case types["g" /* ElementTypeForwardRef */]:
    case types["h" /* ElementTypeFunction */]:
    case types["j" /* ElementTypeMemo */]:
      if (displayName.indexOf('(') >= 0) {
        const matches = displayName.match(/[^()]+/g);

        if (matches != null) {
          displayName = matches.pop();
          hocDisplayNames = matches;
        }
      }

      break;

    default:
      break;
  }

  return [displayName, hocDisplayNames];
} // Pulled from react-compat
// https://github.com/developit/preact-compat/blob/7c5de00e7c85e2ffd011bf3af02899b63f699d3a/src/index.js#L349

function shallowDiffers(prev, next) {
  for (const attribute in prev) {
    if (!(attribute in next)) {
      return true;
    }
  }

  for (const attribute in next) {
    if (prev[attribute] !== next[attribute]) {
      return true;
    }
  }

  return false;
}
function getInObject(object, path) {
  return path.reduce((reduced, attr) => {
    if (reduced) {
      if (utils_hasOwnProperty.call(reduced, attr)) {
        return reduced[attr];
      }

      if (typeof reduced[Symbol.iterator] === 'function') {
        // Convert iterable to array and return array[index]
        //
        // TRICKY
        // Don't use [...spread] syntax for this purpose.
        // This project uses @babel/plugin-transform-spread in "loose" mode which only works with Array values.
        // Other types (e.g. typed arrays, Sets) will not spread correctly.
        return Array.from(reduced)[attr];
      }
    }

    return null;
  }, object);
}
function deletePathInObject(object, path) {
  const length = path.length;
  const last = path[length - 1];

  if (object != null) {
    const parent = getInObject(object, path.slice(0, length - 1));

    if (parent) {
      if (Object(isArray["a" /* default */])(parent)) {
        parent.splice(last, 1);
      } else {
        delete parent[last];
      }
    }
  }
}
function renamePathInObject(object, oldPath, newPath) {
  const length = oldPath.length;

  if (object != null) {
    const parent = getInObject(object, oldPath.slice(0, length - 1));

    if (parent) {
      const lastOld = oldPath[length - 1];
      const lastNew = newPath[length - 1];
      parent[lastNew] = parent[lastOld];

      if (Object(isArray["a" /* default */])(parent)) {
        parent.splice(lastOld, 1);
      } else {
        delete parent[lastOld];
      }
    }
  }
}
function setInObject(object, path, value) {
  const length = path.length;
  const last = path[length - 1];

  if (object != null) {
    const parent = getInObject(object, path.slice(0, length - 1));

    if (parent) {
      parent[last] = value;
    }
  }
}

/**
 * Get a enhanced/artificial type string based on the object instance
 */
function getDataType(data) {
  if (data === null) {
    return 'null';
  } else if (data === undefined) {
    return 'undefined';
  }

  if (Object(react_is["isElement"])(data)) {
    return 'react_element';
  }

  if (typeof HTMLElement !== 'undefined' && data instanceof HTMLElement) {
    return 'html_element';
  }

  const type = typeof data;

  switch (type) {
    case 'bigint':
      return 'bigint';

    case 'boolean':
      return 'boolean';

    case 'function':
      return 'function';

    case 'number':
      if (Number.isNaN(data)) {
        return 'nan';
      } else if (!Number.isFinite(data)) {
        return 'infinity';
      } else {
        return 'number';
      }

    case 'object':
      if (Object(isArray["a" /* default */])(data)) {
        return 'array';
      } else if (ArrayBuffer.isView(data)) {
        return utils_hasOwnProperty.call(data.constructor, 'BYTES_PER_ELEMENT') ? 'typed_array' : 'data_view';
      } else if (data.constructor && data.constructor.name === 'ArrayBuffer') {
        // HACK This ArrayBuffer check is gross; is there a better way?
        // We could try to create a new DataView with the value.
        // If it doesn't error, we know it's an ArrayBuffer,
        // but this seems kind of awkward and expensive.
        return 'array_buffer';
      } else if (typeof data[Symbol.iterator] === 'function') {
        const iterator = data[Symbol.iterator]();

        if (!iterator) {// Proxies might break assumptoins about iterators.
          // See github.com/facebook/react/issues/21654
        } else {
          return iterator === data ? 'opaque_iterator' : 'iterator';
        }
      } else if (data.constructor && data.constructor.name === 'RegExp') {
        return 'regexp';
      } else {
        // $FlowFixMe[method-unbinding]
        const toStringValue = Object.prototype.toString.call(data);

        if (toStringValue === '[object Date]') {
          return 'date';
        } else if (toStringValue === '[object HTMLAllCollection]') {
          return 'html_all_collection';
        }
      }

      if (!isPlainObject(data)) {
        return 'class_instance';
      }

      return 'object';

    case 'string':
      return 'string';

    case 'symbol':
      return 'symbol';

    case 'undefined':
      if ( // $FlowFixMe[method-unbinding]
      Object.prototype.toString.call(data) === '[object HTMLAllCollection]') {
        return 'html_all_collection';
      }

      return 'undefined';

    default:
      return 'unknown';
  }
}
function getDisplayNameForReactElement(element) {
  const elementType = Object(react_is["typeOf"])(element);

  switch (elementType) {
    case react_is["ContextConsumer"]:
      return 'ContextConsumer';

    case react_is["ContextProvider"]:
      return 'ContextProvider';

    case react_is["ForwardRef"]:
      return 'ForwardRef';

    case react_is["Fragment"]:
      return 'Fragment';

    case react_is["Lazy"]:
      return 'Lazy';

    case react_is["Memo"]:
      return 'Memo';

    case react_is["Portal"]:
      return 'Portal';

    case react_is["Profiler"]:
      return 'Profiler';

    case react_is["StrictMode"]:
      return 'StrictMode';

    case react_is["Suspense"]:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

    case REACT_TRACING_MARKER_TYPE:
      return 'TracingMarker';

    default:
      const {
        type
      } = element;

      if (typeof type === 'string') {
        return type;
      } else if (typeof type === 'function') {
        return getDisplayName(type, 'Anonymous');
      } else if (type != null) {
        return 'NotImplementedInDevtools';
      } else {
        return 'Element';
      }

  }
}
const MAX_PREVIEW_STRING_LENGTH = 50;

function truncateForDisplay(string, length = MAX_PREVIEW_STRING_LENGTH) {
  if (string.length > length) {
    return string.slice(0, length) + '…';
  } else {
    return string;
  }
} // Attempts to mimic Chrome's inline preview for values.
// For example, the following value...
//   {
//      foo: 123,
//      bar: "abc",
//      baz: [true, false],
//      qux: { ab: 1, cd: 2 }
//   };
//
// Would show a preview of...
//   {foo: 123, bar: "abc", baz: Array(2), qux: {…}}
//
// And the following value...
//   [
//     123,
//     "abc",
//     [true, false],
//     { foo: 123, bar: "abc" }
//   ];
//
// Would show a preview of...
//   [123, "abc", Array(2), {…}]


function formatDataForPreview(data, showFormattedValue) {
  if (data != null && utils_hasOwnProperty.call(data, hydration["d" /* meta */].type)) {
    return showFormattedValue ? data[hydration["d" /* meta */].preview_long] : data[hydration["d" /* meta */].preview_short];
  }

  const type = getDataType(data);

  switch (type) {
    case 'html_element':
      return `<${truncateForDisplay(data.tagName.toLowerCase())} />`;

    case 'function':
      return truncateForDisplay(`ƒ ${typeof data.name === 'function' ? '' : data.name}() {}`);

    case 'string':
      return `"${data}"`;

    case 'bigint':
      return truncateForDisplay(data.toString() + 'n');

    case 'regexp':
      return truncateForDisplay(data.toString());

    case 'symbol':
      return truncateForDisplay(data.toString());

    case 'react_element':
      return `<${truncateForDisplay(getDisplayNameForReactElement(data) || 'Unknown')} />`;

    case 'array_buffer':
      return `ArrayBuffer(${data.byteLength})`;

    case 'data_view':
      return `DataView(${data.buffer.byteLength})`;

    case 'array':
      if (showFormattedValue) {
        let formatted = '';

        for (let i = 0; i < data.length; i++) {
          if (i > 0) {
            formatted += ', ';
          }

          formatted += formatDataForPreview(data[i], false);

          if (formatted.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return `[${truncateForDisplay(formatted)}]`;
      } else {
        const length = utils_hasOwnProperty.call(data, hydration["d" /* meta */].size) ? data[hydration["d" /* meta */].size] : data.length;
        return `Array(${length})`;
      }

    case 'typed_array':
      const shortName = `${data.constructor.name}(${data.length})`;

      if (showFormattedValue) {
        let formatted = '';

        for (let i = 0; i < data.length; i++) {
          if (i > 0) {
            formatted += ', ';
          }

          formatted += data[i];

          if (formatted.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return `${shortName} [${truncateForDisplay(formatted)}]`;
      } else {
        return shortName;
      }

    case 'iterator':
      const name = data.constructor.name;

      if (showFormattedValue) {
        // TRICKY
        // Don't use [...spread] syntax for this purpose.
        // This project uses @babel/plugin-transform-spread in "loose" mode which only works with Array values.
        // Other types (e.g. typed arrays, Sets) will not spread correctly.
        const array = Array.from(data);
        let formatted = '';

        for (let i = 0; i < array.length; i++) {
          const entryOrEntries = array[i];

          if (i > 0) {
            formatted += ', ';
          } // TRICKY
          // Browsers display Maps and Sets differently.
          // To mimic their behavior, detect if we've been given an entries tuple.
          //   Map(2) {"abc" => 123, "def" => 123}
          //   Set(2) {"abc", 123}


          if (Object(isArray["a" /* default */])(entryOrEntries)) {
            const key = formatDataForPreview(entryOrEntries[0], true);
            const value = formatDataForPreview(entryOrEntries[1], false);
            formatted += `${key} => ${value}`;
          } else {
            formatted += formatDataForPreview(entryOrEntries, false);
          }

          if (formatted.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return `${name}(${data.size}) {${truncateForDisplay(formatted)}}`;
      } else {
        return `${name}(${data.size})`;
      }

    case 'opaque_iterator':
      {
        return data[Symbol.toStringTag];
      }

    case 'date':
      return data.toString();

    case 'class_instance':
      return data.constructor.name;

    case 'object':
      if (showFormattedValue) {
        const keys = Array.from(getAllEnumerableKeys(data)).sort(alphaSortKeys);
        let formatted = '';

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];

          if (i > 0) {
            formatted += ', ';
          }

          formatted += `${key.toString()}: ${formatDataForPreview(data[key], false)}`;

          if (formatted.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return `{${truncateForDisplay(formatted)}}`;
      } else {
        return '{…}';
      }

    case 'boolean':
    case 'number':
    case 'infinity':
    case 'nan':
    case 'null':
    case 'undefined':
      return data;

    default:
      try {
        return truncateForDisplay(String(data));
      } catch (error) {
        return 'unserializable';
      }

  }
} // Basically checking that the object only has Object in its prototype chain

const isPlainObject = object => {
  const objectPrototype = Object.getPrototypeOf(object);
  if (!objectPrototype) return true;
  const objectParentPrototype = Object.getPrototypeOf(objectPrototype);
  return !objectParentPrototype;
};

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/* harmony default export */ __webpack_exports__["a"] = (isArray);

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ElementTypeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ElementTypeContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return ElementTypeFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ElementTypeForwardRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return ElementTypeHostComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return ElementTypeMemo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return ElementTypeOtherOrUnknown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return ElementTypeProfiler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return ElementTypeRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return ElementTypeSuspense; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return ElementTypeSuspenseList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return ElementTypeTracingMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ComponentFilterElementType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentFilterDisplayName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ComponentFilterLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ComponentFilterHOC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return StrictMode; });
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * WARNING:
 * This file contains types that are designed for React DevTools UI and how it interacts with the backend.
 * They might be used in different versions of DevTools backends.
 * Be mindful of backwards compatibility when making changes.
 */
// WARNING
// The values below are referenced by ComponentFilters (which are saved via localStorage).
// Do not change them or it will break previously saved user customizations.
// If new element types are added, use new numbers rather than re-ordering existing ones.
//
// Changing these types is also a backwards breaking change for the standalone shell,
// since the frontend and backend must share the same values-
// and the backend is embedded in certain environments (like React Native).
const ElementTypeClass = 1;
const ElementTypeContext = 2;
const ElementTypeFunction = 5;
const ElementTypeForwardRef = 6;
const ElementTypeHostComponent = 7;
const ElementTypeMemo = 8;
const ElementTypeOtherOrUnknown = 9;
const ElementTypeProfiler = 10;
const ElementTypeRoot = 11;
const ElementTypeSuspense = 12;
const ElementTypeSuspenseList = 13;
const ElementTypeTracingMarker = 14; // Different types of elements displayed in the Elements tree.
// These types may be used to visually distinguish types,
// or to enable/disable certain functionality.

// WARNING
// The values below are referenced by ComponentFilters (which are saved via localStorage).
// Do not change them or it will break previously saved user customizations.
// If new filter types are added, use new numbers rather than re-ordering existing ones.
const ComponentFilterElementType = 1;
const ComponentFilterDisplayName = 2;
const ComponentFilterLocation = 3;
const ComponentFilterHOC = 4;
const StrictMode = 1;

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

module.exports = LRUCache; // This will be a proper iterable 'Map' in engines that support it,
// or a fakey-fake PseudoMap in older versions.

var Map = __webpack_require__(58);

var util = __webpack_require__(49); // A linked list to keep track of recently-used-ness


var Yallist = __webpack_require__(62); // use symbols if possible, otherwise just _props


var hasSymbol = typeof Symbol === 'function' && process.env._nodeLRUCacheForceNoSymbol !== '1';
var makeSymbol;

if (hasSymbol) {
  makeSymbol = function (key) {
    return Symbol(key);
  };
} else {
  makeSymbol = function (key) {
    return '_' + key;
  };
}

var MAX = makeSymbol('max');
var LENGTH = makeSymbol('length');
var LENGTH_CALCULATOR = makeSymbol('lengthCalculator');
var ALLOW_STALE = makeSymbol('allowStale');
var MAX_AGE = makeSymbol('maxAge');
var DISPOSE = makeSymbol('dispose');
var NO_DISPOSE_ON_SET = makeSymbol('noDisposeOnSet');
var LRU_LIST = makeSymbol('lruList');
var CACHE = makeSymbol('cache');

function naiveLength() {
  return 1;
} // lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.


function LRUCache(options) {
  if (!(this instanceof LRUCache)) {
    return new LRUCache(options);
  }

  if (typeof options === 'number') {
    options = {
      max: options
    };
  }

  if (!options) {
    options = {};
  }

  var max = this[MAX] = options.max; // Kind of weird to have a default max of Infinity, but oh well.

  if (!max || !(typeof max === 'number') || max <= 0) {
    this[MAX] = Infinity;
  }

  var lc = options.length || naiveLength;

  if (typeof lc !== 'function') {
    lc = naiveLength;
  }

  this[LENGTH_CALCULATOR] = lc;
  this[ALLOW_STALE] = options.stale || false;
  this[MAX_AGE] = options.maxAge || 0;
  this[DISPOSE] = options.dispose;
  this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
  this.reset();
} // resize the cache when the max changes.


Object.defineProperty(LRUCache.prototype, 'max', {
  set: function (mL) {
    if (!mL || !(typeof mL === 'number') || mL <= 0) {
      mL = Infinity;
    }

    this[MAX] = mL;
    trim(this);
  },
  get: function () {
    return this[MAX];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'allowStale', {
  set: function (allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  },
  get: function () {
    return this[ALLOW_STALE];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'maxAge', {
  set: function (mA) {
    if (!mA || !(typeof mA === 'number') || mA < 0) {
      mA = 0;
    }

    this[MAX_AGE] = mA;
    trim(this);
  },
  get: function () {
    return this[MAX_AGE];
  },
  enumerable: true
}); // resize the cache when the lengthCalculator changes.

Object.defineProperty(LRUCache.prototype, 'lengthCalculator', {
  set: function (lC) {
    if (typeof lC !== 'function') {
      lC = naiveLength;
    }

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach(function (hit) {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      }, this);
    }

    trim(this);
  },
  get: function () {
    return this[LENGTH_CALCULATOR];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'length', {
  get: function () {
    return this[LENGTH];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'itemCount', {
  get: function () {
    return this[LRU_LIST].length;
  },
  enumerable: true
});

LRUCache.prototype.rforEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this[LRU_LIST].tail; walker !== null;) {
    var prev = walker.prev;
    forEachStep(this, fn, walker, thisp);
    walker = prev;
  }
};

function forEachStep(self, fn, node, thisp) {
  var hit = node.value;

  if (isStale(self, hit)) {
    del(self, node);

    if (!self[ALLOW_STALE]) {
      hit = undefined;
    }
  }

  if (hit) {
    fn.call(thisp, hit.value, hit.key, self);
  }
}

LRUCache.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this[LRU_LIST].head; walker !== null;) {
    var next = walker.next;
    forEachStep(this, fn, walker, thisp);
    walker = next;
  }
};

LRUCache.prototype.keys = function () {
  return this[LRU_LIST].toArray().map(function (k) {
    return k.key;
  }, this);
};

LRUCache.prototype.values = function () {
  return this[LRU_LIST].toArray().map(function (k) {
    return k.value;
  }, this);
};

LRUCache.prototype.reset = function () {
  if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
    this[LRU_LIST].forEach(function (hit) {
      this[DISPOSE](hit.key, hit.value);
    }, this);
  }

  this[CACHE] = new Map(); // hash of items by key

  this[LRU_LIST] = new Yallist(); // list of items in order of use recency

  this[LENGTH] = 0; // length of items in the list
};

LRUCache.prototype.dump = function () {
  return this[LRU_LIST].map(function (hit) {
    if (!isStale(this, hit)) {
      return {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      };
    }
  }, this).toArray().filter(function (h) {
    return h;
  });
};

LRUCache.prototype.dumpLru = function () {
  return this[LRU_LIST];
};
/* istanbul ignore next */


LRUCache.prototype.inspect = function (n, opts) {
  var str = 'LRUCache {';
  var extras = false;
  var as = this[ALLOW_STALE];

  if (as) {
    str += '\n  allowStale: true';
    extras = true;
  }

  var max = this[MAX];

  if (max && max !== Infinity) {
    if (extras) {
      str += ',';
    }

    str += '\n  max: ' + util.inspect(max, opts);
    extras = true;
  }

  var maxAge = this[MAX_AGE];

  if (maxAge) {
    if (extras) {
      str += ',';
    }

    str += '\n  maxAge: ' + util.inspect(maxAge, opts);
    extras = true;
  }

  var lc = this[LENGTH_CALCULATOR];

  if (lc && lc !== naiveLength) {
    if (extras) {
      str += ',';
    }

    str += '\n  length: ' + util.inspect(this[LENGTH], opts);
    extras = true;
  }

  var didFirst = false;
  this[LRU_LIST].forEach(function (item) {
    if (didFirst) {
      str += ',\n  ';
    } else {
      if (extras) {
        str += ',\n';
      }

      didFirst = true;
      str += '\n  ';
    }

    var key = util.inspect(item.key).split('\n').join('\n  ');
    var val = {
      value: item.value
    };

    if (item.maxAge !== maxAge) {
      val.maxAge = item.maxAge;
    }

    if (lc !== naiveLength) {
      val.length = item.length;
    }

    if (isStale(this, item)) {
      val.stale = true;
    }

    val = util.inspect(val, opts).split('\n').join('\n  ');
    str += key + ' => ' + val;
  });

  if (didFirst || extras) {
    str += '\n';
  }

  str += '}';
  return str;
};

LRUCache.prototype.set = function (key, value, maxAge) {
  maxAge = maxAge || this[MAX_AGE];
  var now = maxAge ? Date.now() : 0;
  var len = this[LENGTH_CALCULATOR](value, key);

  if (this[CACHE].has(key)) {
    if (len > this[MAX]) {
      del(this, this[CACHE].get(key));
      return false;
    }

    var node = this[CACHE].get(key);
    var item = node.value; // dispose of the old one before overwriting
    // split out into 2 ifs for better coverage tracking

    if (this[DISPOSE]) {
      if (!this[NO_DISPOSE_ON_SET]) {
        this[DISPOSE](key, item.value);
      }
    }

    item.now = now;
    item.maxAge = maxAge;
    item.value = value;
    this[LENGTH] += len - item.length;
    item.length = len;
    this.get(key);
    trim(this);
    return true;
  }

  var hit = new Entry(key, value, len, now, maxAge); // oversized objects fall out of cache automatically.

  if (hit.length > this[MAX]) {
    if (this[DISPOSE]) {
      this[DISPOSE](key, value);
    }

    return false;
  }

  this[LENGTH] += hit.length;
  this[LRU_LIST].unshift(hit);
  this[CACHE].set(key, this[LRU_LIST].head);
  trim(this);
  return true;
};

LRUCache.prototype.has = function (key) {
  if (!this[CACHE].has(key)) return false;
  var hit = this[CACHE].get(key).value;

  if (isStale(this, hit)) {
    return false;
  }

  return true;
};

LRUCache.prototype.get = function (key) {
  return get(this, key, true);
};

LRUCache.prototype.peek = function (key) {
  return get(this, key, false);
};

LRUCache.prototype.pop = function () {
  var node = this[LRU_LIST].tail;
  if (!node) return null;
  del(this, node);
  return node.value;
};

LRUCache.prototype.del = function (key) {
  del(this, this[CACHE].get(key));
};

LRUCache.prototype.load = function (arr) {
  // reset the cache
  this.reset();
  var now = Date.now(); // A previous serialized cache has the most recent items first

  for (var l = arr.length - 1; l >= 0; l--) {
    var hit = arr[l];
    var expiresAt = hit.e || 0;

    if (expiresAt === 0) {
      // the item was created without expiration in a non aged cache
      this.set(hit.k, hit.v);
    } else {
      var maxAge = expiresAt - now; // dont add already expired items

      if (maxAge > 0) {
        this.set(hit.k, hit.v, maxAge);
      }
    }
  }
};

LRUCache.prototype.prune = function () {
  var self = this;
  this[CACHE].forEach(function (value, key) {
    get(self, key, false);
  });
};

function get(self, key, doUse) {
  var node = self[CACHE].get(key);

  if (node) {
    var hit = node.value;

    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE]) hit = undefined;
    } else {
      if (doUse) {
        self[LRU_LIST].unshiftNode(node);
      }
    }

    if (hit) hit = hit.value;
  }

  return hit;
}

function isStale(self, hit) {
  if (!hit || !hit.maxAge && !self[MAX_AGE]) {
    return false;
  }

  var stale = false;
  var diff = Date.now() - hit.now;

  if (hit.maxAge) {
    stale = diff > hit.maxAge;
  } else {
    stale = self[MAX_AGE] && diff > self[MAX_AGE];
  }

  return stale;
}

function trim(self) {
  if (self[LENGTH] > self[MAX]) {
    for (var walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      var prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
}

function del(self, node) {
  if (node) {
    var hit = node.value;

    if (self[DISPOSE]) {
      self[DISPOSE](hit.key, hit.value);
    }

    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
} // classy, since V8 prefers predictable objects.


function Entry(key, value, length, now, maxAge) {
  this.key = key;
  this.value = value;
  this.length = length;
  this.now = now;
  this.maxAge = maxAge || 0;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(40)))

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(obj) {
  var keys = Object.keys(obj);
  var descriptors = {};

  for (var i = 0; i < keys.length; i++) {
    descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
  }

  return descriptors;
};

var formatRegExp = /%[sdj%]/g;

exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];

    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }

    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;

    switch (x) {
      case '%s':
        return String(args[i++]);

      case '%d':
        return Number(args[i++]);

      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }

      default:
        return x;
    }
  });

  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }

  return str;
}; // Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.


exports.deprecate = function (fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  } // Allow for deprecating things in the process of starting up.


  if (typeof process === 'undefined') {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }

      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;

exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();

  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;

      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }

  return debugs[set];
};
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */

/* legacy: obj, showHidden, depth, colors*/


function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  }; // legacy...

  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];

  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  } // set default options


  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

exports.inspect = inspect; // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
}; // Don't use 'blue' not visible on cmd.exe

inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};
  array.forEach(function (val, idx) {
    hash[val] = true;
  });
  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);

    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }

    return ret;
  } // Primitive types cannot have properties


  var primitive = formatPrimitive(ctx, value);

  if (primitive) {
    return primitive;
  } // Look up the keys of the object.


  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  } // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  } // Some type of object without properties can be shortcutted.


  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }

    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }

    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }

    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}']; // Make Array say that they are Array

  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  } // Make functions say that they are functions


  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  } // Make RegExps say that they are RegExps


  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  } // Make dates with properties first say the date


  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  } // Make error with message first say the error


  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);
  var output;

  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }

  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];

  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };

  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }

  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }

      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }

  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }

    name = JSON.stringify('' + key);

    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
} // NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.


function isArray(ar) {
  return Array.isArray(ar);
}

exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}

exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}

exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}

exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}

exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}

exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}

exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}

exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}

exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}

exports.isPrimitive = isPrimitive;
exports.isBuffer = __webpack_require__(60);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 26 Feb 16:19:34

function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
} // log is just a thin wrapper to console.log that prepends a timestamp


exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */


exports.inherits = __webpack_require__(61);

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;
  var keys = Object.keys(add);
  var i = keys.length;

  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }

  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function') throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];

    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }

    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn,
    enumerable: false,
    writable: false,
    configurable: true
  });
  return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
};

exports.promisify.custom = kCustomPromisifiedSymbol;

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }

  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  } // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.


  function callbackified() {
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();

    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }

    var self = this;

    var cb = function () {
      return maybeCb.apply(self, arguments);
    }; // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)


    original.apply(this, args).then(function (ret) {
      process.nextTick(cb, null, ret);
    }, function (rej) {
      process.nextTick(callbackifyOnRejected, rej, cb);
    });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
  return callbackified;
}

exports.callbackify = callbackify;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(40)))

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {if (process.env.npm_package_name === 'pseudomap' && process.env.npm_lifecycle_script === 'test') process.env.TEST_PSEUDOMAP = 'true';

if (typeof Map === 'function' && !process.env.TEST_PSEUDOMAP) {
  module.exports = Map;
} else {
  module.exports = __webpack_require__(59);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(40)))

/***/ }),

/***/ 59:
/***/ (function(module, exports) {

var hasOwnProperty = Object.prototype.hasOwnProperty;
module.exports = PseudoMap;

function PseudoMap(set) {
  if (!(this instanceof PseudoMap)) // whyyyyyyy
    throw new TypeError("Constructor PseudoMap requires 'new'");
  this.clear();

  if (set) {
    if (set instanceof PseudoMap || typeof Map === 'function' && set instanceof Map) set.forEach(function (value, key) {
      this.set(key, value);
    }, this);else if (Array.isArray(set)) set.forEach(function (kv) {
      this.set(kv[0], kv[1]);
    }, this);else throw new TypeError('invalid argument');
  }
}

PseudoMap.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  Object.keys(this._data).forEach(function (k) {
    if (k !== 'size') fn.call(thisp, this._data[k].value, this._data[k].key);
  }, this);
};

PseudoMap.prototype.has = function (k) {
  return !!find(this._data, k);
};

PseudoMap.prototype.get = function (k) {
  var res = find(this._data, k);
  return res && res.value;
};

PseudoMap.prototype.set = function (k, v) {
  set(this._data, k, v);
};

PseudoMap.prototype.delete = function (k) {
  var res = find(this._data, k);

  if (res) {
    delete this._data[res._index];
    this._data.size--;
  }
};

PseudoMap.prototype.clear = function () {
  var data = Object.create(null);
  data.size = 0;
  Object.defineProperty(this, '_data', {
    value: data,
    enumerable: false,
    configurable: true,
    writable: false
  });
};

Object.defineProperty(PseudoMap.prototype, 'size', {
  get: function () {
    return this._data.size;
  },
  set: function (n) {},
  enumerable: true,
  configurable: true
});

PseudoMap.prototype.values = PseudoMap.prototype.keys = PseudoMap.prototype.entries = function () {
  throw new Error('iterators are not implemented in this version');
}; // Either identical, or both NaN


function same(a, b) {
  return a === b || a !== a && b !== b;
}

function Entry(k, v, i) {
  this.key = k;
  this.value = v;
  this._index = i;
}

function find(data, k) {
  for (var i = 0, s = '_' + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
    if (same(data[key].key, k)) return data[key];
  }
}

function set(data, k, v) {
  for (var i = 0, s = '_' + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
    if (same(data[key].key, k)) {
      data[key].value = v;
      return;
    }
  }

  data.size++;
  data[key] = new Entry(k, v, key);
}

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};

/***/ }),

/***/ 61:
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function () {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

module.exports = Yallist;
Yallist.Node = Node;
Yallist.create = Yallist;

function Yallist(list) {
  var self = this;

  if (!(self instanceof Yallist)) {
    self = new Yallist();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self;
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list');
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }

  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
};

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;

  if (head) {
    head.prev = node;
  }

  this.head = node;

  if (!this.tail) {
    this.tail = node;
  }

  this.length++;
};

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;

  if (tail) {
    tail.next = node;
  }

  this.tail = node;

  if (!this.head) {
    this.head = node;
  }

  this.length++;
};

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }

  return this.length;
};

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }

  return this.length;
};

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined;
  }

  var res = this.tail.value;
  this.tail = this.tail.prev;

  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }

  this.length--;
  return res;
};

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined;
  }

  var res = this.head.value;
  this.head = this.head.next;

  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }

  this.length--;
  return res;
};

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();

  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }

  return res;
};

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();

  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }

  return res;
};

Yallist.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc;
};

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc;
};

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }

  return arr;
};

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }

  return arr;
};

Yallist.prototype.slice = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }

  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }

  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;

  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }

  this.head = tail;
  this.tail = head;
  return this;
};

function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);

  if (!self.head) {
    self.head = self.tail;
  }

  self.length++;
}

function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);

  if (!self.tail) {
    self.tail = self.head;
  }

  self.length++;
}

function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var b = Symbol.for("react.element"),
    c = Symbol.for("react.portal"),
    d = Symbol.for("react.fragment"),
    e = Symbol.for("react.strict_mode"),
    f = Symbol.for("react.profiler"),
    g = Symbol.for("react.provider"),
    h = Symbol.for("react.context"),
    k = Symbol.for("react.server_context"),
    l = Symbol.for("react.forward_ref"),
    m = Symbol.for("react.suspense"),
    n = Symbol.for("react.suspense_list"),
    p = Symbol.for("react.memo"),
    q = Symbol.for("react.lazy"),
    t = Symbol.for("react.offscreen"),
    u = Symbol.for("react.cache"),
    v = Symbol.for("react.client.reference");

function w(a) {
  if ("object" === typeof a && null !== a) {
    var r = a.$$typeof;

    switch (r) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case m:
          case n:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case h:
              case l:
              case q:
              case p:
              case g:
                return a;

              default:
                return r;
            }

        }

      case c:
        return r;
    }
  }
}

exports.ContextConsumer = h;
exports.ContextProvider = g;
exports.Element = b;
exports.ForwardRef = l;
exports.Fragment = d;
exports.Lazy = q;
exports.Memo = p;
exports.Portal = c;
exports.Profiler = f;
exports.StrictMode = e;
exports.Suspense = m;
exports.SuspenseList = n;

exports.isAsyncMode = function () {
  return !1;
};

exports.isConcurrentMode = function () {
  return !1;
};

exports.isContextConsumer = function (a) {
  return w(a) === h;
};

exports.isContextProvider = function (a) {
  return w(a) === g;
};

exports.isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === b;
};

exports.isForwardRef = function (a) {
  return w(a) === l;
};

exports.isFragment = function (a) {
  return w(a) === d;
};

exports.isLazy = function (a) {
  return w(a) === q;
};

exports.isMemo = function (a) {
  return w(a) === p;
};

exports.isPortal = function (a) {
  return w(a) === c;
};

exports.isProfiler = function (a) {
  return w(a) === f;
};

exports.isStrictMode = function (a) {
  return w(a) === e;
};

exports.isSuspense = function (a) {
  return w(a) === m;
};

exports.isSuspenseList = function (a) {
  return w(a) === n;
};

exports.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === d || a === f || a === e || a === m || a === n || a === t || a === u || "object" === typeof a && null !== a && (a.$$typeof === q || a.$$typeof === p || a.$$typeof === g || a.$$typeof === h || a.$$typeof === l || a.$$typeof === v || void 0 !== a.getModuleId) ? !0 : !1;
};

exports.typeOf = w;

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return localStorageGetItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return localStorageRemoveItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return localStorageSetItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return sessionStorageGetItem; });
/* unused harmony export sessionStorageRemoveItem */
/* unused harmony export sessionStorageSetItem */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function localStorageGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}
function localStorageRemoveItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {}
}
function localStorageSetItem(key, value) {
  try {
    return localStorage.setItem(key, value);
  } catch (error) {}
}
function sessionStorageGetItem(key) {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    return null;
  }
}
function sessionStorageRemoveItem(key) {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {}
}
function sessionStorageSetItem(key, value) {
  try {
    return sessionStorage.setItem(key, value);
  } catch (error) {}
}

/***/ })

/******/ });
>>>>>>> 664d11905d5f6e4124d22ac3027a695b887affd0
