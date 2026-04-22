import{L as Ku,_ as Qu,C as Wu,r as zi,a as Hu,F as Xu,b as Ot,g as Yu,c as Ju,d as Zu,i as qo,p as tl,u as el,e as nl,f as rl,h as ce,j as sl,k as il,S as ol}from"./firebase-auth-CdGnQTp9.js";var Gi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Kt,jo;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,m){function _(){}_.prototype=m.prototype,T.F=m.prototype,T.prototype=new _,T.prototype.constructor=T,T.D=function(E,y,A){for(var g=Array(arguments.length-2),Tt=2;Tt<arguments.length;Tt++)g[Tt-2]=arguments[Tt];return m.prototype[y].apply(E,g)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(n,e),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(T,m,_){_||(_=0);const E=Array(16);if(typeof m=="string")for(var y=0;y<16;++y)E[y]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(y=0;y<16;++y)E[y]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=T.g[0],_=T.g[1],y=T.g[2];let A=T.g[3],g;g=m+(A^_&(y^A))+E[0]+3614090360&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(y^m&(_^y))+E[1]+3905402710&4294967295,A=m+(g<<12&4294967295|g>>>20),g=y+(_^A&(m^_))+E[2]+606105819&4294967295,y=A+(g<<17&4294967295|g>>>15),g=_+(m^y&(A^m))+E[3]+3250441966&4294967295,_=y+(g<<22&4294967295|g>>>10),g=m+(A^_&(y^A))+E[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(y^m&(_^y))+E[5]+1200080426&4294967295,A=m+(g<<12&4294967295|g>>>20),g=y+(_^A&(m^_))+E[6]+2821735955&4294967295,y=A+(g<<17&4294967295|g>>>15),g=_+(m^y&(A^m))+E[7]+4249261313&4294967295,_=y+(g<<22&4294967295|g>>>10),g=m+(A^_&(y^A))+E[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(y^m&(_^y))+E[9]+2336552879&4294967295,A=m+(g<<12&4294967295|g>>>20),g=y+(_^A&(m^_))+E[10]+4294925233&4294967295,y=A+(g<<17&4294967295|g>>>15),g=_+(m^y&(A^m))+E[11]+2304563134&4294967295,_=y+(g<<22&4294967295|g>>>10),g=m+(A^_&(y^A))+E[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=A+(y^m&(_^y))+E[13]+4254626195&4294967295,A=m+(g<<12&4294967295|g>>>20),g=y+(_^A&(m^_))+E[14]+2792965006&4294967295,y=A+(g<<17&4294967295|g>>>15),g=_+(m^y&(A^m))+E[15]+1236535329&4294967295,_=y+(g<<22&4294967295|g>>>10),g=m+(y^A&(_^y))+E[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^y&(m^_))+E[6]+3225465664&4294967295,A=m+(g<<9&4294967295|g>>>23),g=y+(m^_&(A^m))+E[11]+643717713&4294967295,y=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(y^A))+E[0]+3921069994&4294967295,_=y+(g<<20&4294967295|g>>>12),g=m+(y^A&(_^y))+E[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^y&(m^_))+E[10]+38016083&4294967295,A=m+(g<<9&4294967295|g>>>23),g=y+(m^_&(A^m))+E[15]+3634488961&4294967295,y=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(y^A))+E[4]+3889429448&4294967295,_=y+(g<<20&4294967295|g>>>12),g=m+(y^A&(_^y))+E[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^y&(m^_))+E[14]+3275163606&4294967295,A=m+(g<<9&4294967295|g>>>23),g=y+(m^_&(A^m))+E[3]+4107603335&4294967295,y=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(y^A))+E[8]+1163531501&4294967295,_=y+(g<<20&4294967295|g>>>12),g=m+(y^A&(_^y))+E[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=A+(_^y&(m^_))+E[2]+4243563512&4294967295,A=m+(g<<9&4294967295|g>>>23),g=y+(m^_&(A^m))+E[7]+1735328473&4294967295,y=A+(g<<14&4294967295|g>>>18),g=_+(A^m&(y^A))+E[12]+2368359562&4294967295,_=y+(g<<20&4294967295|g>>>12),g=m+(_^y^A)+E[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^y)+E[8]+2272392833&4294967295,A=m+(g<<11&4294967295|g>>>21),g=y+(A^m^_)+E[11]+1839030562&4294967295,y=A+(g<<16&4294967295|g>>>16),g=_+(y^A^m)+E[14]+4259657740&4294967295,_=y+(g<<23&4294967295|g>>>9),g=m+(_^y^A)+E[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^y)+E[4]+1272893353&4294967295,A=m+(g<<11&4294967295|g>>>21),g=y+(A^m^_)+E[7]+4139469664&4294967295,y=A+(g<<16&4294967295|g>>>16),g=_+(y^A^m)+E[10]+3200236656&4294967295,_=y+(g<<23&4294967295|g>>>9),g=m+(_^y^A)+E[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^y)+E[0]+3936430074&4294967295,A=m+(g<<11&4294967295|g>>>21),g=y+(A^m^_)+E[3]+3572445317&4294967295,y=A+(g<<16&4294967295|g>>>16),g=_+(y^A^m)+E[6]+76029189&4294967295,_=y+(g<<23&4294967295|g>>>9),g=m+(_^y^A)+E[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=A+(m^_^y)+E[12]+3873151461&4294967295,A=m+(g<<11&4294967295|g>>>21),g=y+(A^m^_)+E[15]+530742520&4294967295,y=A+(g<<16&4294967295|g>>>16),g=_+(y^A^m)+E[2]+3299628645&4294967295,_=y+(g<<23&4294967295|g>>>9),g=m+(y^(_|~A))+E[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~y))+E[7]+1126891415&4294967295,A=m+(g<<10&4294967295|g>>>22),g=y+(m^(A|~_))+E[14]+2878612391&4294967295,y=A+(g<<15&4294967295|g>>>17),g=_+(A^(y|~m))+E[5]+4237533241&4294967295,_=y+(g<<21&4294967295|g>>>11),g=m+(y^(_|~A))+E[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~y))+E[3]+2399980690&4294967295,A=m+(g<<10&4294967295|g>>>22),g=y+(m^(A|~_))+E[10]+4293915773&4294967295,y=A+(g<<15&4294967295|g>>>17),g=_+(A^(y|~m))+E[1]+2240044497&4294967295,_=y+(g<<21&4294967295|g>>>11),g=m+(y^(_|~A))+E[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~y))+E[15]+4264355552&4294967295,A=m+(g<<10&4294967295|g>>>22),g=y+(m^(A|~_))+E[6]+2734768916&4294967295,y=A+(g<<15&4294967295|g>>>17),g=_+(A^(y|~m))+E[13]+1309151649&4294967295,_=y+(g<<21&4294967295|g>>>11),g=m+(y^(_|~A))+E[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=A+(_^(m|~y))+E[11]+3174756917&4294967295,A=m+(g<<10&4294967295|g>>>22),g=y+(m^(A|~_))+E[2]+718787259&4294967295,y=A+(g<<15&4294967295|g>>>17),g=_+(A^(y|~m))+E[9]+3951481745&4294967295,T.g[0]=T.g[0]+m&4294967295,T.g[1]=T.g[1]+(y+(g<<21&4294967295|g>>>11))&4294967295,T.g[2]=T.g[2]+y&4294967295,T.g[3]=T.g[3]+A&4294967295}n.prototype.v=function(T,m){m===void 0&&(m=T.length);const _=m-this.blockSize,E=this.C;let y=this.h,A=0;for(;A<m;){if(y==0)for(;A<=_;)i(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<m;)if(E[y++]=T.charCodeAt(A++),y==this.blockSize){i(this,E),y=0;break}}else for(;A<m;)if(E[y++]=T[A++],y==this.blockSize){i(this,E),y=0;break}}this.h=y,this.o+=m},n.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var m=1;m<T.length-8;++m)T[m]=0;m=this.o*8;for(var _=T.length-8;_<T.length;++_)T[_]=m&255,m/=256;for(this.v(T),T=Array(16),m=0,_=0;_<4;++_)for(let E=0;E<32;E+=8)T[m++]=this.g[_]>>>E&255;return T};function o(T,m){var _=c;return Object.prototype.hasOwnProperty.call(_,T)?_[T]:_[T]=m(T)}function u(T,m){this.h=m;const _=[];let E=!0;for(let y=T.length-1;y>=0;y--){const A=T[y]|0;E&&A==m||(_[y]=A,E=!1)}this.g=_}var c={};function f(T){return-128<=T&&T<128?o(T,function(m){return new u([m|0],m<0?-1:0)}):new u([T|0],T<0?-1:0)}function d(T){if(isNaN(T)||!isFinite(T))return I;if(T<0)return b(d(-T));const m=[];let _=1;for(let E=0;T>=_;E++)m[E]=T/_|0,_*=4294967296;return new u(m,0)}function p(T,m){if(T.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(T.charAt(0)=="-")return b(p(T.substring(1),m));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=d(Math.pow(m,8));let E=I;for(let A=0;A<T.length;A+=8){var y=Math.min(8,T.length-A);const g=parseInt(T.substring(A,A+y),m);y<8?(y=d(Math.pow(m,y)),E=E.j(y).add(d(g))):(E=E.j(_),E=E.add(d(g)))}return E}var I=f(0),V=f(1),S=f(16777216);r=u.prototype,r.m=function(){if(x(this))return-b(this).m();let T=0,m=1;for(let _=0;_<this.g.length;_++){const E=this.i(_);T+=(E>=0?E:4294967296+E)*m,m*=4294967296}return T},r.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(k(this))return"0";if(x(this))return"-"+b(this).toString(T);const m=d(Math.pow(T,6));var _=this;let E="";for(;;){const y=ft(_,m).g;_=K(_,y.j(m));let A=((_.g.length>0?_.g[0]:_.h)>>>0).toString(T);if(_=y,k(_))return A+E;for(;A.length<6;)A="0"+A;E=A+E}},r.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function k(T){if(T.h!=0)return!1;for(let m=0;m<T.g.length;m++)if(T.g[m]!=0)return!1;return!0}function x(T){return T.h==-1}r.l=function(T){return T=K(this,T),x(T)?-1:k(T)?0:1};function b(T){const m=T.g.length,_=[];for(let E=0;E<m;E++)_[E]=~T.g[E];return new u(_,~T.h).add(V)}r.abs=function(){return x(this)?b(this):this},r.add=function(T){const m=Math.max(this.g.length,T.g.length),_=[];let E=0;for(let y=0;y<=m;y++){let A=E+(this.i(y)&65535)+(T.i(y)&65535),g=(A>>>16)+(this.i(y)>>>16)+(T.i(y)>>>16);E=g>>>16,A&=65535,g&=65535,_[y]=g<<16|A}return new u(_,_[_.length-1]&-2147483648?-1:0)};function K(T,m){return T.add(b(m))}r.j=function(T){if(k(this)||k(T))return I;if(x(this))return x(T)?b(this).j(b(T)):b(b(this).j(T));if(x(T))return b(this.j(b(T)));if(this.l(S)<0&&T.l(S)<0)return d(this.m()*T.m());const m=this.g.length+T.g.length,_=[];for(var E=0;E<2*m;E++)_[E]=0;for(E=0;E<this.g.length;E++)for(let y=0;y<T.g.length;y++){const A=this.i(E)>>>16,g=this.i(E)&65535,Tt=T.i(y)>>>16,ne=T.i(y)&65535;_[2*E+2*y]+=g*ne,G(_,2*E+2*y),_[2*E+2*y+1]+=A*ne,G(_,2*E+2*y+1),_[2*E+2*y+1]+=g*Tt,G(_,2*E+2*y+1),_[2*E+2*y+2]+=A*Tt,G(_,2*E+2*y+2)}for(T=0;T<m;T++)_[T]=_[2*T+1]<<16|_[2*T];for(T=m;T<2*m;T++)_[T]=0;return new u(_,0)};function G(T,m){for(;(T[m]&65535)!=T[m];)T[m+1]+=T[m]>>>16,T[m]&=65535,m++}function Q(T,m){this.g=T,this.h=m}function ft(T,m){if(k(m))throw Error("division by zero");if(k(T))return new Q(I,I);if(x(T))return m=ft(b(T),m),new Q(b(m.g),b(m.h));if(x(m))return m=ft(T,b(m)),new Q(b(m.g),m.h);if(T.g.length>30){if(x(T)||x(m))throw Error("slowDivide_ only works with positive integers.");for(var _=V,E=m;E.l(T)<=0;)_=vt(_),E=vt(E);var y=nt(_,1),A=nt(E,1);for(E=nt(E,2),_=nt(_,2);!k(E);){var g=A.add(E);g.l(T)<=0&&(y=y.add(_),A=g),E=nt(E,1),_=nt(_,1)}return m=K(T,y.j(m)),new Q(y,m)}for(y=I;T.l(m)>=0;){for(_=Math.max(1,Math.floor(T.m()/m.m())),E=Math.ceil(Math.log(_)/Math.LN2),E=E<=48?1:Math.pow(2,E-48),A=d(_),g=A.j(m);x(g)||g.l(T)>0;)_-=E,A=d(_),g=A.j(m);k(A)&&(A=V),y=y.add(A),T=K(T,g)}return new Q(y,T)}r.B=function(T){return ft(this,T).h},r.and=function(T){const m=Math.max(this.g.length,T.g.length),_=[];for(let E=0;E<m;E++)_[E]=this.i(E)&T.i(E);return new u(_,this.h&T.h)},r.or=function(T){const m=Math.max(this.g.length,T.g.length),_=[];for(let E=0;E<m;E++)_[E]=this.i(E)|T.i(E);return new u(_,this.h|T.h)},r.xor=function(T){const m=Math.max(this.g.length,T.g.length),_=[];for(let E=0;E<m;E++)_[E]=this.i(E)^T.i(E);return new u(_,this.h^T.h)};function vt(T){const m=T.g.length+1,_=[];for(let E=0;E<m;E++)_[E]=T.i(E)<<1|T.i(E-1)>>>31;return new u(_,T.h)}function nt(T,m){const _=m>>5;m%=32;const E=T.g.length-_,y=[];for(let A=0;A<E;A++)y[A]=m>0?T.i(A+_)>>>m|T.i(A+_+1)<<32-m:T.i(A+_);return new u(y,T.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,jo=n,u.prototype.add=u.prototype.add,u.prototype.multiply=u.prototype.j,u.prototype.modulo=u.prototype.B,u.prototype.compare=u.prototype.l,u.prototype.toNumber=u.prototype.m,u.prototype.toString=u.prototype.toString,u.prototype.getBits=u.prototype.i,u.fromNumber=d,u.fromString=p,Kt=u}).apply(typeof Gi<"u"?Gi:typeof self<"u"?self:typeof window<"u"?window:{});var kn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bo,Xe,zo,Fn,Qr,Go,$o,Ko;(function(){var r,t=Object.defineProperty;function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof kn=="object"&&kn];for(var a=0;a<s.length;++a){var l=s[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var n=e(this);function i(s,a){if(a)t:{var l=n;s=s.split(".");for(var h=0;h<s.length-1;h++){var v=s[h];if(!(v in l))break t;l=l[v]}s=s[s.length-1],h=l[s],a=a(h),a!=h&&a!=null&&t(l,s,{configurable:!0,writable:!0,value:a})}}i("Symbol.dispose",function(s){return s||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(s){return s||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(s){return s||function(a){var l=[],h;for(h in a)Object.prototype.hasOwnProperty.call(a,h)&&l.push([h,a[h]]);return l}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},u=this||self;function c(s){var a=typeof s;return a=="object"&&s!=null||a=="function"}function f(s,a,l){return s.call.apply(s.bind,arguments)}function d(s,a,l){return d=f,d.apply(null,arguments)}function p(s,a){var l=Array.prototype.slice.call(arguments,1);return function(){var h=l.slice();return h.push.apply(h,arguments),s.apply(this,h)}}function I(s,a){function l(){}l.prototype=a.prototype,s.Z=a.prototype,s.prototype=new l,s.prototype.constructor=s,s.Ob=function(h,v,w){for(var C=Array(arguments.length-2),U=2;U<arguments.length;U++)C[U-2]=arguments[U];return a.prototype[v].apply(h,C)}}var V=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?s=>s&&AsyncContext.Snapshot.wrap(s):s=>s;function S(s){const a=s.length;if(a>0){const l=Array(a);for(let h=0;h<a;h++)l[h]=s[h];return l}return[]}function k(s,a){for(let h=1;h<arguments.length;h++){const v=arguments[h];var l=typeof v;if(l=l!="object"?l:v?Array.isArray(v)?"array":l:"null",l=="array"||l=="object"&&typeof v.length=="number"){l=s.length||0;const w=v.length||0;s.length=l+w;for(let C=0;C<w;C++)s[l+C]=v[C]}else s.push(v)}}class x{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return this.h>0?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function b(s){u.setTimeout(()=>{throw s},0)}function K(){var s=T;let a=null;return s.g&&(a=s.g,s.g=s.g.next,s.g||(s.h=null),a.next=null),a}class G{constructor(){this.h=this.g=null}add(a,l){const h=Q.get();h.set(a,l),this.h?this.h.next=h:this.g=h,this.h=h}}var Q=new x(()=>new ft,s=>s.reset());class ft{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let vt,nt=!1,T=new G,m=()=>{const s=Promise.resolve(void 0);vt=()=>{s.then(_)}};function _(){for(var s;s=K();){try{s.h.call(s.g)}catch(l){b(l)}var a=Q;a.j(s),a.h<100&&(a.h++,s.next=a.g,a.g=s)}nt=!1}function E(){this.u=this.u,this.C=this.C}E.prototype.u=!1,E.prototype.dispose=function(){this.u||(this.u=!0,this.N())},E.prototype[Symbol.dispose]=function(){this.dispose()},E.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function y(s,a){this.type=s,this.g=this.target=a,this.defaultPrevented=!1}y.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var s=!1,a=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const l=()=>{};u.addEventListener("test",l,a),u.removeEventListener("test",l,a)}catch{}return s}();function g(s){return/^[\s\xa0]*$/.test(s)}function Tt(s,a){y.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s&&this.init(s,a)}I(Tt,y),Tt.prototype.init=function(s,a){const l=this.type=s.type,h=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;this.target=s.target||s.srcElement,this.g=a,a=s.relatedTarget,a||(l=="mouseover"?a=s.fromElement:l=="mouseout"&&(a=s.toElement)),this.relatedTarget=a,h?(this.clientX=h.clientX!==void 0?h.clientX:h.pageX,this.clientY=h.clientY!==void 0?h.clientY:h.pageY,this.screenX=h.screenX||0,this.screenY=h.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=s.pointerType,this.state=s.state,this.i=s,s.defaultPrevented&&Tt.Z.h.call(this)},Tt.prototype.h=function(){Tt.Z.h.call(this);const s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var ne="closure_listenable_"+(Math.random()*1e6|0),mu=0;function gu(s,a,l,h,v){this.listener=s,this.proxy=null,this.src=a,this.type=l,this.capture=!!h,this.ha=v,this.key=++mu,this.da=this.fa=!1}function yn(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function Tn(s,a,l){for(const h in s)a.call(l,s[h],h,s)}function pu(s,a){for(const l in s)a.call(void 0,s[l],l,s)}function Bs(s){const a={};for(const l in s)a[l]=s[l];return a}const zs="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Gs(s,a){let l,h;for(let v=1;v<arguments.length;v++){h=arguments[v];for(l in h)s[l]=h[l];for(let w=0;w<zs.length;w++)l=zs[w],Object.prototype.hasOwnProperty.call(h,l)&&(s[l]=h[l])}}function En(s){this.src=s,this.g={},this.h=0}En.prototype.add=function(s,a,l,h,v){const w=s.toString();s=this.g[w],s||(s=this.g[w]=[],this.h++);const C=Tr(s,a,h,v);return C>-1?(a=s[C],l||(a.fa=!1)):(a=new gu(a,this.src,w,!!h,v),a.fa=l,s.push(a)),a};function yr(s,a){const l=a.type;if(l in s.g){var h=s.g[l],v=Array.prototype.indexOf.call(h,a,void 0),w;(w=v>=0)&&Array.prototype.splice.call(h,v,1),w&&(yn(a),s.g[l].length==0&&(delete s.g[l],s.h--))}}function Tr(s,a,l,h){for(let v=0;v<s.length;++v){const w=s[v];if(!w.da&&w.listener==a&&w.capture==!!l&&w.ha==h)return v}return-1}var Er="closure_lm_"+(Math.random()*1e6|0),Ir={};function $s(s,a,l,h,v){if(Array.isArray(a)){for(let w=0;w<a.length;w++)$s(s,a[w],l,h,v);return null}return l=Ws(l),s&&s[ne]?s.J(a,l,c(h)?!!h.capture:!1,v):_u(s,a,l,!1,h,v)}function _u(s,a,l,h,v,w){if(!a)throw Error("Invalid event type");const C=c(v)?!!v.capture:!!v;let U=Ar(s);if(U||(s[Er]=U=new En(s)),l=U.add(a,l,h,C,w),l.proxy)return l;if(h=yu(),l.proxy=h,h.src=s,h.listener=l,s.addEventListener)A||(v=C),v===void 0&&(v=!1),s.addEventListener(a.toString(),h,v);else if(s.attachEvent)s.attachEvent(Qs(a.toString()),h);else if(s.addListener&&s.removeListener)s.addListener(h);else throw Error("addEventListener and attachEvent are unavailable.");return l}function yu(){function s(l){return a.call(s.src,s.listener,l)}const a=Tu;return s}function Ks(s,a,l,h,v){if(Array.isArray(a))for(var w=0;w<a.length;w++)Ks(s,a[w],l,h,v);else h=c(h)?!!h.capture:!!h,l=Ws(l),s&&s[ne]?(s=s.i,w=String(a).toString(),w in s.g&&(a=s.g[w],l=Tr(a,l,h,v),l>-1&&(yn(a[l]),Array.prototype.splice.call(a,l,1),a.length==0&&(delete s.g[w],s.h--)))):s&&(s=Ar(s))&&(a=s.g[a.toString()],s=-1,a&&(s=Tr(a,l,h,v)),(l=s>-1?a[s]:null)&&vr(l))}function vr(s){if(typeof s!="number"&&s&&!s.da){var a=s.src;if(a&&a[ne])yr(a.i,s);else{var l=s.type,h=s.proxy;a.removeEventListener?a.removeEventListener(l,h,s.capture):a.detachEvent?a.detachEvent(Qs(l),h):a.addListener&&a.removeListener&&a.removeListener(h),(l=Ar(a))?(yr(l,s),l.h==0&&(l.src=null,a[Er]=null)):yn(s)}}}function Qs(s){return s in Ir?Ir[s]:Ir[s]="on"+s}function Tu(s,a){if(s.da)s=!0;else{a=new Tt(a,this);const l=s.listener,h=s.ha||s.src;s.fa&&vr(s),s=l.call(h,a)}return s}function Ar(s){return s=s[Er],s instanceof En?s:null}var wr="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ws(s){return typeof s=="function"?s:(s[wr]||(s[wr]=function(a){return s.handleEvent(a)}),s[wr])}function dt(){E.call(this),this.i=new En(this),this.M=this,this.G=null}I(dt,E),dt.prototype[ne]=!0,dt.prototype.removeEventListener=function(s,a,l,h){Ks(this,s,a,l,h)};function _t(s,a){var l,h=s.G;if(h)for(l=[];h;h=h.G)l.push(h);if(s=s.M,h=a.type||a,typeof a=="string")a=new y(a,s);else if(a instanceof y)a.target=a.target||s;else{var v=a;a=new y(h,s),Gs(a,v)}v=!0;let w,C;if(l)for(C=l.length-1;C>=0;C--)w=a.g=l[C],v=In(w,h,!0,a)&&v;if(w=a.g=s,v=In(w,h,!0,a)&&v,v=In(w,h,!1,a)&&v,l)for(C=0;C<l.length;C++)w=a.g=l[C],v=In(w,h,!1,a)&&v}dt.prototype.N=function(){if(dt.Z.N.call(this),this.i){var s=this.i;for(const a in s.g){const l=s.g[a];for(let h=0;h<l.length;h++)yn(l[h]);delete s.g[a],s.h--}}this.G=null},dt.prototype.J=function(s,a,l,h){return this.i.add(String(s),a,!1,l,h)},dt.prototype.K=function(s,a,l,h){return this.i.add(String(s),a,!0,l,h)};function In(s,a,l,h){if(a=s.i.g[String(a)],!a)return!0;a=a.concat();let v=!0;for(let w=0;w<a.length;++w){const C=a[w];if(C&&!C.da&&C.capture==l){const U=C.listener,rt=C.ha||C.src;C.fa&&yr(s.i,C),v=U.call(rt,h)!==!1&&v}}return v&&!h.defaultPrevented}function Eu(s,a){if(typeof s!="function")if(s&&typeof s.handleEvent=="function")s=d(s.handleEvent,s);else throw Error("Invalid listener argument");return Number(a)>2147483647?-1:u.setTimeout(s,a||0)}function Hs(s){s.g=Eu(()=>{s.g=null,s.i&&(s.i=!1,Hs(s))},s.l);const a=s.h;s.h=null,s.m.apply(null,a)}class Iu extends E{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:Hs(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function xe(s){E.call(this),this.h=s,this.g={}}I(xe,E);var Xs=[];function Ys(s){Tn(s.g,function(a,l){this.g.hasOwnProperty(l)&&vr(a)},s),s.g={}}xe.prototype.N=function(){xe.Z.N.call(this),Ys(this)},xe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Rr=u.JSON.stringify,vu=u.JSON.parse,Au=class{stringify(s){return u.JSON.stringify(s,void 0)}parse(s){return u.JSON.parse(s,void 0)}};function Js(){}function Zs(){}var Me={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Vr(){y.call(this,"d")}I(Vr,y);function Pr(){y.call(this,"c")}I(Pr,y);var re={},ti=null;function vn(){return ti=ti||new dt}re.Ia="serverreachability";function ei(s){y.call(this,re.Ia,s)}I(ei,y);function Oe(s){const a=vn();_t(a,new ei(a))}re.STAT_EVENT="statevent";function ni(s,a){y.call(this,re.STAT_EVENT,s),this.stat=a}I(ni,y);function yt(s){const a=vn();_t(a,new ni(a,s))}re.Ja="timingevent";function ri(s,a){y.call(this,re.Ja,s),this.size=a}I(ri,y);function Le(s,a){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){s()},a)}function Fe(){this.g=!0}Fe.prototype.ua=function(){this.g=!1};function wu(s,a,l,h,v,w){s.info(function(){if(s.g)if(w){var C="",U=w.split("&");for(let $=0;$<U.length;$++){var rt=U[$].split("=");if(rt.length>1){const at=rt[0];rt=rt[1];const Pt=at.split("_");C=Pt.length>=2&&Pt[1]=="type"?C+(at+"="+rt+"&"):C+(at+"=redacted&")}}}else C=null;else C=w;return"XMLHTTP REQ ("+h+") [attempt "+v+"]: "+a+`
`+l+`
`+C})}function Ru(s,a,l,h,v,w,C){s.info(function(){return"XMLHTTP RESP ("+h+") [ attempt "+v+"]: "+a+`
`+l+`
`+w+" "+C})}function pe(s,a,l,h){s.info(function(){return"XMLHTTP TEXT ("+a+"): "+Pu(s,l)+(h?" "+h:"")})}function Vu(s,a){s.info(function(){return"TIMEOUT: "+a})}Fe.prototype.info=function(){};function Pu(s,a){if(!s.g)return a;if(!a)return null;try{const w=JSON.parse(a);if(w){for(s=0;s<w.length;s++)if(Array.isArray(w[s])){var l=w[s];if(!(l.length<2)){var h=l[1];if(Array.isArray(h)&&!(h.length<1)){var v=h[0];if(v!="noop"&&v!="stop"&&v!="close")for(let C=1;C<h.length;C++)h[C]=""}}}}return Rr(w)}catch{return a}}var An={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},si={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},ii;function Sr(){}I(Sr,Js),Sr.prototype.g=function(){return new XMLHttpRequest},ii=new Sr;function Ue(s){return encodeURIComponent(String(s))}function Su(s){var a=1;s=s.split(":");const l=[];for(;a>0&&s.length;)l.push(s.shift()),a--;return s.length&&l.push(s.join(":")),l}function Ut(s,a,l,h){this.j=s,this.i=a,this.l=l,this.S=h||1,this.V=new xe(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new oi}function oi(){this.i=null,this.g="",this.h=!1}var ai={},Cr={};function br(s,a,l){s.M=1,s.A=Rn(Vt(a)),s.u=l,s.R=!0,ui(s,null)}function ui(s,a){s.F=Date.now(),wn(s),s.B=Vt(s.A);var l=s.B,h=s.S;Array.isArray(h)||(h=[String(h)]),Ii(l.i,"t",h),s.C=0,l=s.j.L,s.h=new oi,s.g=Ui(s.j,l?a:null,!s.u),s.P>0&&(s.O=new Iu(d(s.Y,s,s.g),s.P)),a=s.V,l=s.g,h=s.ba;var v="readystatechange";Array.isArray(v)||(v&&(Xs[0]=v.toString()),v=Xs);for(let w=0;w<v.length;w++){const C=$s(l,v[w],h||a.handleEvent,!1,a.h||a);if(!C)break;a.g[C.key]=C}a=s.J?Bs(s.J):{},s.u?(s.v||(s.v="POST"),a["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.B,s.v,s.u,a)):(s.v="GET",s.g.ea(s.B,s.v,null,a)),Oe(),wu(s.i,s.v,s.B,s.l,s.S,s.u)}Ut.prototype.ba=function(s){s=s.target;const a=this.O;a&&Bt(s)==3?a.j():this.Y(s)},Ut.prototype.Y=function(s){try{if(s==this.g)t:{const U=Bt(this.g),rt=this.g.ya(),$=this.g.ca();if(!(U<3)&&(U!=3||this.g&&(this.h.h||this.g.la()||Si(this.g)))){this.K||U!=4||rt==7||(rt==8||$<=0?Oe(3):Oe(2)),Dr(this);var a=this.g.ca();this.X=a;var l=Cu(this);if(this.o=a==200,Ru(this.i,this.v,this.B,this.l,this.S,U,a),this.o){if(this.U&&!this.L){e:{if(this.g){var h,v=this.g;if((h=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(h)){var w=h;break e}}w=null}if(s=w)pe(this.i,this.l,s,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Nr(this,s);else{this.o=!1,this.m=3,yt(12),se(this),qe(this);break t}}if(this.R){s=!0;let at;for(;!this.K&&this.C<l.length;)if(at=bu(this,l),at==Cr){U==4&&(this.m=4,yt(14),s=!1),pe(this.i,this.l,null,"[Incomplete Response]");break}else if(at==ai){this.m=4,yt(15),pe(this.i,this.l,l,"[Invalid Chunk]"),s=!1;break}else pe(this.i,this.l,at,null),Nr(this,at);if(li(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),U!=4||l.length!=0||this.h.h||(this.m=1,yt(16),s=!1),this.o=this.o&&s,!s)pe(this.i,this.l,l,"[Invalid Chunked Response]"),se(this),qe(this);else if(l.length>0&&!this.W){this.W=!0;var C=this.j;C.g==this&&C.aa&&!C.P&&(C.j.info("Great, no buffering proxy detected. Bytes received: "+l.length),qr(C),C.P=!0,yt(11))}}else pe(this.i,this.l,l,null),Nr(this,l);U==4&&se(this),this.o&&!this.K&&(U==4?Mi(this.j,this):(this.o=!1,wn(this)))}else Gu(this.g),a==400&&l.indexOf("Unknown SID")>0?(this.m=3,yt(12)):(this.m=0,yt(13)),se(this),qe(this)}}}catch{}finally{}};function Cu(s){if(!li(s))return s.g.la();const a=Si(s.g);if(a==="")return"";let l="";const h=a.length,v=Bt(s.g)==4;if(!s.h.i){if(typeof TextDecoder>"u")return se(s),qe(s),"";s.h.i=new u.TextDecoder}for(let w=0;w<h;w++)s.h.h=!0,l+=s.h.i.decode(a[w],{stream:!(v&&w==h-1)});return a.length=0,s.h.g+=l,s.C=0,s.h.g}function li(s){return s.g?s.v=="GET"&&s.M!=2&&s.j.Aa:!1}function bu(s,a){var l=s.C,h=a.indexOf(`
`,l);return h==-1?Cr:(l=Number(a.substring(l,h)),isNaN(l)?ai:(h+=1,h+l>a.length?Cr:(a=a.slice(h,h+l),s.C=h+l,a)))}Ut.prototype.cancel=function(){this.K=!0,se(this)};function wn(s){s.T=Date.now()+s.H,ci(s,s.H)}function ci(s,a){if(s.D!=null)throw Error("WatchDog timer not null");s.D=Le(d(s.aa,s),a)}function Dr(s){s.D&&(u.clearTimeout(s.D),s.D=null)}Ut.prototype.aa=function(){this.D=null;const s=Date.now();s-this.T>=0?(Vu(this.i,this.B),this.M!=2&&(Oe(),yt(17)),se(this),this.m=2,qe(this)):ci(this,this.T-s)};function qe(s){s.j.I==0||s.K||Mi(s.j,s)}function se(s){Dr(s);var a=s.O;a&&typeof a.dispose=="function"&&a.dispose(),s.O=null,Ys(s.V),s.g&&(a=s.g,s.g=null,a.abort(),a.dispose())}function Nr(s,a){try{var l=s.j;if(l.I!=0&&(l.g==s||kr(l.h,s))){if(!s.L&&kr(l.h,s)&&l.I==3){try{var h=l.Ba.g.parse(a)}catch{h=null}if(Array.isArray(h)&&h.length==3){var v=h;if(v[0]==0){t:if(!l.v){if(l.g)if(l.g.F+3e3<s.F)bn(l),Sn(l);else break t;Ur(l),yt(18)}}else l.xa=v[1],0<l.xa-l.K&&v[2]<37500&&l.F&&l.A==0&&!l.C&&(l.C=Le(d(l.Va,l),6e3));di(l.h)<=1&&l.ta&&(l.ta=void 0)}else oe(l,11)}else if((s.L||l.g==s)&&bn(l),!g(a))for(v=l.Ba.g.parse(a),a=0;a<v.length;a++){let $=v[a];const at=$[0];if(!(at<=l.K))if(l.K=at,$=$[1],l.I==2)if($[0]=="c"){l.M=$[1],l.ba=$[2];const Pt=$[3];Pt!=null&&(l.ka=Pt,l.j.info("VER="+l.ka));const ae=$[4];ae!=null&&(l.za=ae,l.j.info("SVER="+l.za));const zt=$[5];zt!=null&&typeof zt=="number"&&zt>0&&(h=1.5*zt,l.O=h,l.j.info("backChannelRequestTimeoutMs_="+h)),h=l;const Gt=s.g;if(Gt){const Nn=Gt.g?Gt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Nn){var w=h.h;w.g||Nn.indexOf("spdy")==-1&&Nn.indexOf("quic")==-1&&Nn.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(xr(w,w.h),w.h=null))}if(h.G){const jr=Gt.g?Gt.g.getResponseHeader("X-HTTP-Session-Id"):null;jr&&(h.wa=jr,W(h.J,h.G,jr))}}l.I=3,l.l&&l.l.ra(),l.aa&&(l.T=Date.now()-s.F,l.j.info("Handshake RTT: "+l.T+"ms")),h=l;var C=s;if(h.na=Fi(h,h.L?h.ba:null,h.W),C.L){mi(h.h,C);var U=C,rt=h.O;rt&&(U.H=rt),U.D&&(Dr(U),wn(U)),h.g=C}else ki(h);l.i.length>0&&Cn(l)}else $[0]!="stop"&&$[0]!="close"||oe(l,7);else l.I==3&&($[0]=="stop"||$[0]=="close"?$[0]=="stop"?oe(l,7):Fr(l):$[0]!="noop"&&l.l&&l.l.qa($),l.A=0)}}Oe(4)}catch{}}var Du=class{constructor(s,a){this.g=s,this.map=a}};function hi(s){this.l=s||10,u.PerformanceNavigationTiming?(s=u.performance.getEntriesByType("navigation"),s=s.length>0&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function fi(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function di(s){return s.h?1:s.g?s.g.size:0}function kr(s,a){return s.h?s.h==a:s.g?s.g.has(a):!1}function xr(s,a){s.g?s.g.add(a):s.h=a}function mi(s,a){s.h&&s.h==a?s.h=null:s.g&&s.g.has(a)&&s.g.delete(a)}hi.prototype.cancel=function(){if(this.i=gi(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function gi(s){if(s.h!=null)return s.i.concat(s.h.G);if(s.g!=null&&s.g.size!==0){let a=s.i;for(const l of s.g.values())a=a.concat(l.G);return a}return S(s.i)}var pi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Nu(s,a){if(s){s=s.split("&");for(let l=0;l<s.length;l++){const h=s[l].indexOf("=");let v,w=null;h>=0?(v=s[l].substring(0,h),w=s[l].substring(h+1)):v=s[l],a(v,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function qt(s){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let a;s instanceof qt?(this.l=s.l,je(this,s.j),this.o=s.o,this.g=s.g,Be(this,s.u),this.h=s.h,Mr(this,vi(s.i)),this.m=s.m):s&&(a=String(s).match(pi))?(this.l=!1,je(this,a[1]||"",!0),this.o=ze(a[2]||""),this.g=ze(a[3]||"",!0),Be(this,a[4]),this.h=ze(a[5]||"",!0),Mr(this,a[6]||"",!0),this.m=ze(a[7]||"")):(this.l=!1,this.i=new $e(null,this.l))}qt.prototype.toString=function(){const s=[];var a=this.j;a&&s.push(Ge(a,_i,!0),":");var l=this.g;return(l||a=="file")&&(s.push("//"),(a=this.o)&&s.push(Ge(a,_i,!0),"@"),s.push(Ue(l).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.u,l!=null&&s.push(":",String(l))),(l=this.h)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(Ge(l,l.charAt(0)=="/"?Mu:xu,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",Ge(l,Lu)),s.join("")},qt.prototype.resolve=function(s){const a=Vt(this);let l=!!s.j;l?je(a,s.j):l=!!s.o,l?a.o=s.o:l=!!s.g,l?a.g=s.g:l=s.u!=null;var h=s.h;if(l)Be(a,s.u);else if(l=!!s.h){if(h.charAt(0)!="/")if(this.g&&!this.h)h="/"+h;else{var v=a.h.lastIndexOf("/");v!=-1&&(h=a.h.slice(0,v+1)+h)}if(v=h,v==".."||v==".")h="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){h=v.lastIndexOf("/",0)==0,v=v.split("/");const w=[];for(let C=0;C<v.length;){const U=v[C++];U=="."?h&&C==v.length&&w.push(""):U==".."?((w.length>1||w.length==1&&w[0]!="")&&w.pop(),h&&C==v.length&&w.push("")):(w.push(U),h=!0)}h=w.join("/")}else h=v}return l?a.h=h:l=s.i.toString()!=="",l?Mr(a,vi(s.i)):l=!!s.m,l&&(a.m=s.m),a};function Vt(s){return new qt(s)}function je(s,a,l){s.j=l?ze(a,!0):a,s.j&&(s.j=s.j.replace(/:$/,""))}function Be(s,a){if(a){if(a=Number(a),isNaN(a)||a<0)throw Error("Bad port number "+a);s.u=a}else s.u=null}function Mr(s,a,l){a instanceof $e?(s.i=a,Fu(s.i,s.l)):(l||(a=Ge(a,Ou)),s.i=new $e(a,s.l))}function W(s,a,l){s.i.set(a,l)}function Rn(s){return W(s,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),s}function ze(s,a){return s?a?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Ge(s,a,l){return typeof s=="string"?(s=encodeURI(s).replace(a,ku),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function ku(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var _i=/[#\/\?@]/g,xu=/[#\?:]/g,Mu=/[#\?]/g,Ou=/[#\?@]/g,Lu=/#/g;function $e(s,a){this.h=this.g=null,this.i=s||null,this.j=!!a}function ie(s){s.g||(s.g=new Map,s.h=0,s.i&&Nu(s.i,function(a,l){s.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}r=$e.prototype,r.add=function(s,a){ie(this),this.i=null,s=_e(this,s);let l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(a),this.h+=1,this};function yi(s,a){ie(s),a=_e(s,a),s.g.has(a)&&(s.i=null,s.h-=s.g.get(a).length,s.g.delete(a))}function Ti(s,a){return ie(s),a=_e(s,a),s.g.has(a)}r.forEach=function(s,a){ie(this),this.g.forEach(function(l,h){l.forEach(function(v){s.call(a,v,h,this)},this)},this)};function Ei(s,a){ie(s);let l=[];if(typeof a=="string")Ti(s,a)&&(l=l.concat(s.g.get(_e(s,a))));else for(s=Array.from(s.g.values()),a=0;a<s.length;a++)l=l.concat(s[a]);return l}r.set=function(s,a){return ie(this),this.i=null,s=_e(this,s),Ti(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[a]),this.h+=1,this},r.get=function(s,a){return s?(s=Ei(this,s),s.length>0?String(s[0]):a):a};function Ii(s,a,l){yi(s,a),l.length>0&&(s.i=null,s.g.set(_e(s,a),S(l)),s.h+=l.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],a=Array.from(this.g.keys());for(let h=0;h<a.length;h++){var l=a[h];const v=Ue(l);l=Ei(this,l);for(let w=0;w<l.length;w++){let C=v;l[w]!==""&&(C+="="+Ue(l[w])),s.push(C)}}return this.i=s.join("&")};function vi(s){const a=new $e;return a.i=s.i,s.g&&(a.g=new Map(s.g),a.h=s.h),a}function _e(s,a){return a=String(a),s.j&&(a=a.toLowerCase()),a}function Fu(s,a){a&&!s.j&&(ie(s),s.i=null,s.g.forEach(function(l,h){const v=h.toLowerCase();h!=v&&(yi(this,h),Ii(this,v,l))},s)),s.j=a}function Uu(s,a){const l=new Fe;if(u.Image){const h=new Image;h.onload=p(jt,l,"TestLoadImage: loaded",!0,a,h),h.onerror=p(jt,l,"TestLoadImage: error",!1,a,h),h.onabort=p(jt,l,"TestLoadImage: abort",!1,a,h),h.ontimeout=p(jt,l,"TestLoadImage: timeout",!1,a,h),u.setTimeout(function(){h.ontimeout&&h.ontimeout()},1e4),h.src=s}else a(!1)}function qu(s,a){const l=new Fe,h=new AbortController,v=setTimeout(()=>{h.abort(),jt(l,"TestPingServer: timeout",!1,a)},1e4);fetch(s,{signal:h.signal}).then(w=>{clearTimeout(v),w.ok?jt(l,"TestPingServer: ok",!0,a):jt(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(v),jt(l,"TestPingServer: error",!1,a)})}function jt(s,a,l,h,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),h(l)}catch{}}function ju(){this.g=new Au}function Or(s){this.i=s.Sb||null,this.h=s.ab||!1}I(Or,Js),Or.prototype.g=function(){return new Vn(this.i,this.h)};function Vn(s,a){dt.call(this),this.H=s,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}I(Vn,dt),r=Vn.prototype,r.open=function(s,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=s,this.D=a,this.readyState=1,Qe(this)},r.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const a={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};s&&(a.body=s),(this.H||u).fetch(new Request(this.D,a)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ke(this)),this.readyState=0},r.Pa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Qe(this)),this.g&&(this.readyState=3,Qe(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ai(this)}else s.text().then(this.Oa.bind(this),this.ga.bind(this))};function Ai(s){s.j.read().then(s.Ma.bind(s)).catch(s.ga.bind(s))}r.Ma=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var a=s.value?s.value:new Uint8Array(0);(a=this.B.decode(a,{stream:!s.done}))&&(this.response=this.responseText+=a)}s.done?Ke(this):Qe(this),this.readyState==3&&Ai(this)}},r.Oa=function(s){this.g&&(this.response=this.responseText=s,Ke(this))},r.Na=function(s){this.g&&(this.response=s,Ke(this))},r.ga=function(){this.g&&Ke(this)};function Ke(s){s.readyState=4,s.l=null,s.j=null,s.B=null,Qe(s)}r.setRequestHeader=function(s,a){this.A.append(s,a)},r.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=a.next();return s.join(`\r
`)};function Qe(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Vn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function wi(s){let a="";return Tn(s,function(l,h){a+=h,a+=":",a+=l,a+=`\r
`}),a}function Lr(s,a,l){t:{for(h in l){var h=!1;break t}h=!0}h||(l=wi(l),typeof s=="string"?l!=null&&Ue(l):W(s,a,l))}function J(s){dt.call(this),this.headers=new Map,this.L=s||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}I(J,dt);var Bu=/^https?$/i,zu=["POST","PUT"];r=J.prototype,r.Fa=function(s){this.H=s},r.ea=function(s,a,l,h){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);a=a?a.toUpperCase():"GET",this.D=s,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ii.g(),this.g.onreadystatechange=V(d(this.Ca,this));try{this.B=!0,this.g.open(a,String(s),!0),this.B=!1}catch(w){Ri(this,w);return}if(s=l||"",l=new Map(this.headers),h)if(Object.getPrototypeOf(h)===Object.prototype)for(var v in h)l.set(v,h[v]);else if(typeof h.keys=="function"&&typeof h.get=="function")for(const w of h.keys())l.set(w,h.get(w));else throw Error("Unknown input type for opt_headers: "+String(h));h=Array.from(l.keys()).find(w=>w.toLowerCase()=="content-type"),v=u.FormData&&s instanceof u.FormData,!(Array.prototype.indexOf.call(zu,a,void 0)>=0)||h||v||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,C]of l)this.g.setRequestHeader(w,C);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(s),this.v=!1}catch(w){Ri(this,w)}};function Ri(s,a){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=a,s.o=5,Vi(s),Pn(s)}function Vi(s){s.A||(s.A=!0,_t(s,"complete"),_t(s,"error"))}r.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=s||7,_t(this,"complete"),_t(this,"abort"),Pn(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Pn(this,!0)),J.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Pi(this):this.Xa())},r.Xa=function(){Pi(this)};function Pi(s){if(s.h&&typeof o<"u"){if(s.v&&Bt(s)==4)setTimeout(s.Ca.bind(s),0);else if(_t(s,"readystatechange"),Bt(s)==4){s.h=!1;try{const w=s.ca();t:switch(w){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var l;if(!(l=a)){var h;if(h=w===0){let C=String(s.D).match(pi)[1]||null;!C&&u.self&&u.self.location&&(C=u.self.location.protocol.slice(0,-1)),h=!Bu.test(C?C.toLowerCase():"")}l=h}if(l)_t(s,"complete"),_t(s,"success");else{s.o=6;try{var v=Bt(s)>2?s.g.statusText:""}catch{v=""}s.l=v+" ["+s.ca()+"]",Vi(s)}}finally{Pn(s)}}}}function Pn(s,a){if(s.g){s.m&&(clearTimeout(s.m),s.m=null);const l=s.g;s.g=null,a||_t(s,"ready");try{l.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function Bt(s){return s.g?s.g.readyState:0}r.ca=function(){try{return Bt(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(s){if(this.g){var a=this.g.responseText;return s&&a.indexOf(s)==0&&(a=a.substring(s.length)),vu(a)}};function Si(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.F){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function Gu(s){const a={};s=(s.g&&Bt(s)>=2&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let h=0;h<s.length;h++){if(g(s[h]))continue;var l=Su(s[h]);const v=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const w=a[v]||[];a[v]=w,w.push(l)}pu(a,function(h){return h.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function We(s,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||a}function Ci(s){this.za=0,this.i=[],this.j=new Fe,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=We("failFast",!1,s),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=We("baseRetryDelayMs",5e3,s),this.Za=We("retryDelaySeedMs",1e4,s),this.Ta=We("forwardChannelMaxRetries",2,s),this.va=We("forwardChannelRequestTimeoutMs",2e4,s),this.ma=s&&s.xmlHttpFactory||void 0,this.Ua=s&&s.Rb||void 0,this.Aa=s&&s.useFetchStreams||!1,this.O=void 0,this.L=s&&s.supportsCrossDomainXhr||!1,this.M="",this.h=new hi(s&&s.concurrentRequestLimit),this.Ba=new ju,this.S=s&&s.fastHandshake||!1,this.R=s&&s.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=s&&s.Pb||!1,s&&s.ua&&this.j.ua(),s&&s.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&s&&s.detectBufferingProxy||!1,this.ia=void 0,s&&s.longPollingTimeout&&s.longPollingTimeout>0&&(this.ia=s.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Ci.prototype,r.ka=8,r.I=1,r.connect=function(s,a,l,h){yt(0),this.W=s,this.H=a||{},l&&h!==void 0&&(this.H.OSID=l,this.H.OAID=h),this.F=this.X,this.J=Fi(this,null,this.W),Cn(this)};function Fr(s){if(bi(s),s.I==3){var a=s.V++,l=Vt(s.J);if(W(l,"SID",s.M),W(l,"RID",a),W(l,"TYPE","terminate"),He(s,l),a=new Ut(s,s.j,a),a.M=2,a.A=Rn(Vt(l)),l=!1,u.navigator&&u.navigator.sendBeacon)try{l=u.navigator.sendBeacon(a.A.toString(),"")}catch{}!l&&u.Image&&(new Image().src=a.A,l=!0),l||(a.g=Ui(a.j,null),a.g.ea(a.A)),a.F=Date.now(),wn(a)}Li(s)}function Sn(s){s.g&&(qr(s),s.g.cancel(),s.g=null)}function bi(s){Sn(s),s.v&&(u.clearTimeout(s.v),s.v=null),bn(s),s.h.cancel(),s.m&&(typeof s.m=="number"&&u.clearTimeout(s.m),s.m=null)}function Cn(s){if(!fi(s.h)&&!s.m){s.m=!0;var a=s.Ea;vt||m(),nt||(vt(),nt=!0),T.add(a,s),s.D=0}}function $u(s,a){return di(s.h)>=s.h.j-(s.m?1:0)?!1:s.m?(s.i=a.G.concat(s.i),!0):s.I==1||s.I==2||s.D>=(s.Sa?0:s.Ta)?!1:(s.m=Le(d(s.Ea,s,a),Oi(s,s.D)),s.D++,!0)}r.Ea=function(s){if(this.m)if(this.m=null,this.I==1){if(!s){this.V=Math.floor(Math.random()*1e5),s=this.V++;const v=new Ut(this,this.j,s);let w=this.o;if(this.U&&(w?(w=Bs(w),Gs(w,this.U)):w=this.U),this.u!==null||this.R||(v.J=w,w=null),this.S)t:{for(var a=0,l=0;l<this.i.length;l++){e:{var h=this.i[l];if("__data__"in h.map&&(h=h.map.__data__,typeof h=="string")){h=h.length;break e}h=void 0}if(h===void 0)break;if(a+=h,a>4096){a=l;break t}if(a===4096||l===this.i.length-1){a=l+1;break t}}a=1e3}else a=1e3;a=Ni(this,v,a),l=Vt(this.J),W(l,"RID",s),W(l,"CVER",22),this.G&&W(l,"X-HTTP-Session-Id",this.G),He(this,l),w&&(this.R?a="headers="+Ue(wi(w))+"&"+a:this.u&&Lr(l,this.u,w)),xr(this.h,v),this.Ra&&W(l,"TYPE","init"),this.S?(W(l,"$req",a),W(l,"SID","null"),v.U=!0,br(v,l,null)):br(v,l,a),this.I=2}}else this.I==3&&(s?Di(this,s):this.i.length==0||fi(this.h)||Di(this))};function Di(s,a){var l;a?l=a.l:l=s.V++;const h=Vt(s.J);W(h,"SID",s.M),W(h,"RID",l),W(h,"AID",s.K),He(s,h),s.u&&s.o&&Lr(h,s.u,s.o),l=new Ut(s,s.j,l,s.D+1),s.u===null&&(l.J=s.o),a&&(s.i=a.G.concat(s.i)),a=Ni(s,l,1e3),l.H=Math.round(s.va*.5)+Math.round(s.va*.5*Math.random()),xr(s.h,l),br(l,h,a)}function He(s,a){s.H&&Tn(s.H,function(l,h){W(a,h,l)}),s.l&&Tn({},function(l,h){W(a,h,l)})}function Ni(s,a,l){l=Math.min(s.i.length,l);const h=s.l?d(s.l.Ka,s.l,s):null;t:{var v=s.i;let U=-1;for(;;){const rt=["count="+l];U==-1?l>0?(U=v[0].g,rt.push("ofs="+U)):U=0:rt.push("ofs="+U);let $=!0;for(let at=0;at<l;at++){var w=v[at].g;const Pt=v[at].map;if(w-=U,w<0)U=Math.max(0,v[at].g-100),$=!1;else try{w="req"+w+"_"||"";try{var C=Pt instanceof Map?Pt:Object.entries(Pt);for(const[ae,zt]of C){let Gt=zt;c(zt)&&(Gt=Rr(zt)),rt.push(w+ae+"="+encodeURIComponent(Gt))}}catch(ae){throw rt.push(w+"type="+encodeURIComponent("_badmap")),ae}}catch{h&&h(Pt)}}if($){C=rt.join("&");break t}}C=void 0}return s=s.i.splice(0,l),a.G=s,C}function ki(s){if(!s.g&&!s.v){s.Y=1;var a=s.Da;vt||m(),nt||(vt(),nt=!0),T.add(a,s),s.A=0}}function Ur(s){return s.g||s.v||s.A>=3?!1:(s.Y++,s.v=Le(d(s.Da,s),Oi(s,s.A)),s.A++,!0)}r.Da=function(){if(this.v=null,xi(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var s=4*this.T;this.j.info("BP detection timer enabled: "+s),this.B=Le(d(this.Wa,this),s)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,yt(10),Sn(this),xi(this))};function qr(s){s.B!=null&&(u.clearTimeout(s.B),s.B=null)}function xi(s){s.g=new Ut(s,s.j,"rpc",s.Y),s.u===null&&(s.g.J=s.o),s.g.P=0;var a=Vt(s.na);W(a,"RID","rpc"),W(a,"SID",s.M),W(a,"AID",s.K),W(a,"CI",s.F?"0":"1"),!s.F&&s.ia&&W(a,"TO",s.ia),W(a,"TYPE","xmlhttp"),He(s,a),s.u&&s.o&&Lr(a,s.u,s.o),s.O&&(s.g.H=s.O);var l=s.g;s=s.ba,l.M=1,l.A=Rn(Vt(a)),l.u=null,l.R=!0,ui(l,s)}r.Va=function(){this.C!=null&&(this.C=null,Sn(this),Ur(this),yt(19))};function bn(s){s.C!=null&&(u.clearTimeout(s.C),s.C=null)}function Mi(s,a){var l=null;if(s.g==a){bn(s),qr(s),s.g=null;var h=2}else if(kr(s.h,a))l=a.G,mi(s.h,a),h=1;else return;if(s.I!=0){if(a.o)if(h==1){l=a.u?a.u.length:0,a=Date.now()-a.F;var v=s.D;h=vn(),_t(h,new ri(h,l)),Cn(s)}else ki(s);else if(v=a.m,v==3||v==0&&a.X>0||!(h==1&&$u(s,a)||h==2&&Ur(s)))switch(l&&l.length>0&&(a=s.h,a.i=a.i.concat(l)),v){case 1:oe(s,5);break;case 4:oe(s,10);break;case 3:oe(s,6);break;default:oe(s,2)}}}function Oi(s,a){let l=s.Qa+Math.floor(Math.random()*s.Za);return s.isActive()||(l*=2),l*a}function oe(s,a){if(s.j.info("Error code "+a),a==2){var l=d(s.bb,s),h=s.Ua;const v=!h;h=new qt(h||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||je(h,"https"),Rn(h),v?Uu(h.toString(),l):qu(h.toString(),l)}else yt(2);s.I=0,s.l&&s.l.pa(a),Li(s),bi(s)}r.bb=function(s){s?(this.j.info("Successfully pinged google.com"),yt(2)):(this.j.info("Failed to ping google.com"),yt(1))};function Li(s){if(s.I=0,s.ja=[],s.l){const a=gi(s.h);(a.length!=0||s.i.length!=0)&&(k(s.ja,a),k(s.ja,s.i),s.h.i.length=0,S(s.i),s.i.length=0),s.l.oa()}}function Fi(s,a,l){var h=l instanceof qt?Vt(l):new qt(l);if(h.g!="")a&&(h.g=a+"."+h.g),Be(h,h.u);else{var v=u.location;h=v.protocol,a=a?a+"."+v.hostname:v.hostname,v=+v.port;const w=new qt(null);h&&je(w,h),a&&(w.g=a),v&&Be(w,v),l&&(w.h=l),h=w}return l=s.G,a=s.wa,l&&a&&W(h,l,a),W(h,"VER",s.ka),He(s,h),h}function Ui(s,a,l){if(a&&!s.L)throw Error("Can't create secondary domain capable XhrIo object.");return a=s.Aa&&!s.ma?new J(new Or({ab:l})):new J(s.ma),a.Fa(s.L),a}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function qi(){}r=qi.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Dn(){}Dn.prototype.g=function(s,a){return new At(s,a)};function At(s,a){dt.call(this),this.g=new Ci(a),this.l=s,this.h=a&&a.messageUrlParams||null,s=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(s?s["X-WebChannel-Content-Type"]=a.messageContentType:s={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.sa&&(s?s["X-WebChannel-Client-Profile"]=a.sa:s={"X-WebChannel-Client-Profile":a.sa}),this.g.U=s,(s=a&&a.Qb)&&!g(s)&&(this.g.u=s),this.A=a&&a.supportsCrossDomainXhr||!1,this.v=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!g(a)&&(this.g.G=a,s=this.h,s!==null&&a in s&&(s=this.h,a in s&&delete s[a])),this.j=new ye(this)}I(At,dt),At.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){Fr(this.g)},At.prototype.o=function(s){var a=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.v&&(l={},l.__data__=Rr(s),s=l);a.i.push(new Du(a.Ya++,s)),a.I==3&&Cn(a)},At.prototype.N=function(){this.g.l=null,delete this.j,Fr(this.g),delete this.g,At.Z.N.call(this)};function ji(s){Vr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var a=s.__sm__;if(a){t:{for(const l in a){s=l;break t}s=void 0}(this.i=s)&&(s=this.i,a=a!==null&&s in a?a[s]:void 0),this.data=a}else this.data=s}I(ji,Vr);function Bi(){Pr.call(this),this.status=1}I(Bi,Pr);function ye(s){this.g=s}I(ye,qi),ye.prototype.ra=function(){_t(this.g,"a")},ye.prototype.qa=function(s){_t(this.g,new ji(s))},ye.prototype.pa=function(s){_t(this.g,new Bi)},ye.prototype.oa=function(){_t(this.g,"b")},Dn.prototype.createWebChannel=Dn.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,Ko=function(){return new Dn},$o=function(){return vn()},Go=re,Qr={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},An.NO_ERROR=0,An.TIMEOUT=8,An.HTTP_ERROR=6,Fn=An,si.COMPLETE="complete",zo=si,Zs.EventType=Me,Me.OPEN="a",Me.CLOSE="b",Me.ERROR="c",Me.MESSAGE="d",dt.prototype.listen=dt.prototype.J,Xe=Zs,J.prototype.listenOnce=J.prototype.K,J.prototype.getLastError=J.prototype.Ha,J.prototype.getLastErrorCode=J.prototype.ya,J.prototype.getStatus=J.prototype.ca,J.prototype.getResponseJson=J.prototype.La,J.prototype.getResponseText=J.prototype.la,J.prototype.send=J.prototype.ea,J.prototype.setWithCredentials=J.prototype.Fa,Bo=J}).apply(typeof kn<"u"?kn:typeof self<"u"?self:typeof window<"u"?window:{});const $i="@firebase/firestore",Ki="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}gt.UNAUTHENTICATED=new gt(null),gt.GOOGLE_CREDENTIALS=new gt("google-credentials-uid"),gt.FIRST_PARTY=new gt("first-party-uid"),gt.MOCK_USER=new gt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let be="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const he=new Ku("@firebase/firestore");function Te(){return he.logLevel}function D(r,...t){if(he.logLevel<=Ot.DEBUG){const e=t.map(cs);he.debug(`Firestore (${be}): ${r}`,...e)}}function Lt(r,...t){if(he.logLevel<=Ot.ERROR){const e=t.map(cs);he.error(`Firestore (${be}): ${r}`,...e)}}function we(r,...t){if(he.logLevel<=Ot.WARN){const e=t.map(cs);he.warn(`Firestore (${be}): ${r}`,...e)}}function cs(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,Qo(r,n,e)}function Qo(r,t,e){let n=`FIRESTORE (${be}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw Lt(n),new Error(n)}function z(r,t,e,n){let i="Unexpected state";typeof e=="string"?i=e:n=e,r||Qo(t,i,n)}function F(r,t){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends Xu{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class al{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(gt.UNAUTHENTICATED))}shutdown(){}}class ul{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class ll{constructor(t){this.t=t,this.currentUser=gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){z(this.o===void 0,42304);let n=this.i;const i=f=>this.i!==n?(n=this.i,e(f)):Promise.resolve();let o=new Qt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Qt,t.enqueueRetryable(()=>i(this.currentUser))};const u=()=>{const f=o;t.enqueueRetryable(async()=>{await f.promise,await i(this.currentUser)})},c=f=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=f,this.o&&(this.auth.addAuthTokenListener(this.o),u())};this.t.onInit(f=>c(f)),setTimeout(()=>{if(!this.auth){const f=this.t.getImmediate({optional:!0});f?c(f):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Qt)}},0),u()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(z(typeof n.accessToken=="string",31837,{l:n}),new Wo(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return z(t===null||typeof t=="string",2055,{h:t}),new gt(t)}}class cl{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=gt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class hl{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new cl(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(gt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Qi{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class fl{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Hu(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){z(this.o===void 0,3512);const n=o=>{o.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const u=o.token!==this.m;return this.m=o.token,D("FirebaseAppCheckTokenProvider",`Received ${u?"new":"existing"} token.`),u?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>n(o))};const i=o=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?i(o):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Qi(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(z(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Qi(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dl(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const i=dl(40);for(let o=0;o<i.length;++o)n.length<20&&i[o]<e&&(n+=t.charAt(i[o]%62))}return n}}function q(r,t){return r<t?-1:r>t?1:0}function Wr(r,t){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++){const i=r.charAt(n),o=t.charAt(n);if(i!==o)return Br(i)===Br(o)?q(i,o):Br(i)?1:-1}return q(r.length,t.length)}const ml=55296,gl=57343;function Br(r){const t=r.charCodeAt(0);return t>=ml&&t<=gl}function Re(r,t,e){return r.length===t.length&&r.every((n,i)=>e(n,t[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wi="__name__";class St{constructor(t,e,n){e===void 0?e=0:e>t.length&&O(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&O(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return St.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof St?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const o=St.compareSegments(t.get(i),e.get(i));if(o!==0)return o}return q(t.length,e.length)}static compareSegments(t,e){const n=St.isNumericId(t),i=St.isNumericId(e);return n&&!i?-1:!n&&i?1:n&&i?St.extractNumericId(t).compare(St.extractNumericId(e)):Wr(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Kt.fromString(t.substring(4,t.length-2))}}class X extends St{construct(t,e,n){return new X(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new N(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(i=>i.length>0))}return new X(e)}static emptyPath(){return new X([])}}const pl=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ct extends St{construct(t,e,n){return new ct(t,e,n)}static isValidIdentifier(t){return pl.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ct.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Wi}static keyField(){return new ct([Wi])}static fromServerFormat(t){const e=[];let n="",i=0;const o=()=>{if(n.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let u=!1;for(;i<t.length;){const c=t[i];if(c==="\\"){if(i+1===t.length)throw new N(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const f=t[i+1];if(f!=="\\"&&f!=="."&&f!=="`")throw new N(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=f,i+=2}else c==="`"?(u=!u,i++):c!=="."||u?(n+=c,i++):(o(),i++)}if(o(),u)throw new N(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ct(e)}static emptyPath(){return new ct([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(X.fromString(t))}static fromName(t){return new M(X.fromString(t).popFirst(5))}static empty(){return new M(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&X.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return X.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new X(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _l(r,t,e){if(!e)throw new N(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function yl(r,t,e,n){if(t===!0&&n===!0)throw new N(P.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function Hi(r){if(!M.isDocumentKey(r))throw new N(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Ho(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function fs(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":O(12329,{type:typeof r})}function fe(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new N(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=fs(r);throw new N(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(r,t){const e={typeString:r};return t&&(e.value=t),e}function dn(r,t){if(!Ho(r))throw new N(P.INVALID_ARGUMENT,"JSON must be an object");let e;for(const n in t)if(t[n]){const i=t[n].typeString,o="value"in t[n]?{value:t[n].value}:void 0;if(!(n in r)){e=`JSON missing required field: '${n}'`;break}const u=r[n];if(i&&typeof u!==i){e=`JSON field '${n}' must be a ${i}.`;break}if(o!==void 0&&u!==o.value){e=`Expected '${n}' field to equal '${o.value}'`;break}}if(e)throw new N(P.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xi=-62135596800,Yi=1e6;class H{static now(){return H.fromMillis(Date.now())}static fromDate(t){return H.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Yi);return new H(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Xi)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Yi}_compareTo(t){return this.seconds===t.seconds?q(this.nanoseconds,t.nanoseconds):q(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:H._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(dn(t,H._jsonSchema))return new H(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Xi;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}H._jsonSchemaVersion="firestore/timestamp/1.0",H._jsonSchema={type:et("string",H._jsonSchemaVersion),seconds:et("number"),nanoseconds:et("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new H(0,0))}static max(){return new L(new H(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on=-1;function Tl(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=L.fromTimestamp(n===1e9?new H(e+1,0):new H(e,n));return new Wt(i,M.empty(),t)}function El(r){return new Wt(r.readTime,r.key,on)}class Wt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Wt(L.min(),M.empty(),on)}static max(){return new Wt(L.max(),M.empty(),on)}}function Il(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(r.documentKey,t.documentKey),e!==0?e:q(r.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vl="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Al{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function De(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==vl)throw r;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&O(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new R((n,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(n,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(n,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof R?e:R.resolve(e)}catch(e){return R.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):R.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):R.reject(e)}static resolve(t){return new R((e,n)=>{e(t)})}static reject(t){return new R((e,n)=>{n(t)})}static waitFor(t){return new R((e,n)=>{let i=0,o=0,u=!1;t.forEach(c=>{++i,c.next(()=>{++o,u&&o===i&&e()},f=>n(f))}),u=!0,o===i&&e()})}static or(t){let e=R.resolve(!1);for(const n of t)e=e.next(i=>i?R.resolve(i):n());return e}static forEach(t,e){const n=[];return t.forEach((i,o)=>{n.push(e.call(this,i,o))}),this.waitFor(n)}static mapArray(t,e){return new R((n,i)=>{const o=t.length,u=new Array(o);let c=0;for(let f=0;f<o;f++){const d=f;e(t[d]).next(p=>{u[d]=p,++c,c===o&&n(u)},p=>i(p))}})}static doWhile(t,e){return new R((n,i)=>{const o=()=>{t()===!0?e().next(()=>{o()},i):n()};o()})}}function wl(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Ne(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>e.writeSequenceNumber(n))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}nr.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ds=-1;function rr(r){return r==null}function Gn(r){return r===0&&1/r==-1/0}function Rl(r){return typeof r=="number"&&Number.isInteger(r)&&!Gn(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xo="";function Vl(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=Ji(t)),t=Pl(r.get(e),t);return Ji(t)}function Pl(r,t){let e=t;const n=r.length;for(let i=0;i<n;i++){const o=r.charAt(i);switch(o){case"\0":e+="";break;case Xo:e+="";break;default:e+=o}}return e}function Ji(r){return r+Xo+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zi(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function te(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function Yo(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(t,e){this.comparator=t,this.root=e||lt.EMPTY}insert(t,e){return new Y(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,lt.BLACK,null,null))}remove(t){return new Y(this.comparator,this.root.remove(t,this.comparator).copy(null,null,lt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(t,n.key);if(i===0)return e+n.left.size;i<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new xn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new xn(this.root,t,this.comparator,!1)}getReverseIterator(){return new xn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new xn(this.root,t,this.comparator,!0)}}class xn{constructor(t,e,n,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?n(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class lt{constructor(t,e,n,i,o){this.key=t,this.value=e,this.color=n??lt.RED,this.left=i??lt.EMPTY,this.right=o??lt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,i,o){return new lt(t??this.key,e??this.value,n??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let i=this;const o=n(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,n),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return lt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return lt.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,lt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,lt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw O(27949);return t+(this.isRed()?0:1)}}lt.EMPTY=null,lt.RED=!0,lt.BLACK=!1;lt.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(t,e,n,i,o){return this}insert(t,e,n){return new lt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(t){this.comparator=t,this.data=new Y(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new to(this.data.getIterator())}getIteratorFrom(t){return new to(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof ot)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new ot(this.comparator);return e.data=t,e}}class to{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.fields=t,t.sort(ct.comparator)}static empty(){return new wt([])}unionWith(t){let e=new ot(ct.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new wt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Re(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Jo("Invalid base64 string: "+o):o}}(t);return new ht(e)}static fromUint8Array(t){const e=function(i){let o="";for(let u=0;u<i.length;++u)o+=String.fromCharCode(i[u]);return o}(t);return new ht(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let i=0;i<e.length;i++)n[i]=e.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return q(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const Sl=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ht(r){if(z(!!r,39018),typeof r=="string"){let t=0;const e=Sl.exec(r);if(z(!!e,46558,{timestamp:r}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:Z(r.seconds),nanos:Z(r.nanos)}}function Z(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Xt(r){return typeof r=="string"?ht.fromBase64String(r):ht.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zo="server_timestamp",ta="__type__",ea="__previous_value__",na="__local_write_time__";function ms(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[ta])==null?void 0:n.stringValue)===Zo}function sr(r){const t=r.mapValue.fields[ea];return ms(t)?sr(t):t}function an(r){const t=Ht(r.mapValue.fields[na].timestampValue);return new H(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(t,e,n,i,o,u,c,f,d,p){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=i,this.ssl=o,this.forceLongPolling=u,this.autoDetectLongPolling=c,this.longPollingOptions=f,this.useFetchStreams=d,this.isUsingEmulator=p}}const $n="(default)";class un{constructor(t,e){this.projectId=t,this.database=e||$n}static empty(){return new un("","")}get isDefaultDatabase(){return this.database===$n}isEqual(t){return t instanceof un&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra="__type__",bl="__max__",Mn={mapValue:{}},sa="__vector__",Kn="value";function Yt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?ms(r)?4:Nl(r)?9007199254740991:Dl(r)?10:11:O(28295,{value:r})}function xt(r,t){if(r===t)return!0;const e=Yt(r);if(e!==Yt(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return an(r).isEqual(an(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const u=Ht(i.timestampValue),c=Ht(o.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(i,o){return Xt(i.bytesValue).isEqual(Xt(o.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(i,o){return Z(i.geoPointValue.latitude)===Z(o.geoPointValue.latitude)&&Z(i.geoPointValue.longitude)===Z(o.geoPointValue.longitude)}(r,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return Z(i.integerValue)===Z(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const u=Z(i.doubleValue),c=Z(o.doubleValue);return u===c?Gn(u)===Gn(c):isNaN(u)&&isNaN(c)}return!1}(r,t);case 9:return Re(r.arrayValue.values||[],t.arrayValue.values||[],xt);case 10:case 11:return function(i,o){const u=i.mapValue.fields||{},c=o.mapValue.fields||{};if(Zi(u)!==Zi(c))return!1;for(const f in u)if(u.hasOwnProperty(f)&&(c[f]===void 0||!xt(u[f],c[f])))return!1;return!0}(r,t);default:return O(52216,{left:r})}}function ln(r,t){return(r.values||[]).find(e=>xt(e,t))!==void 0}function Ve(r,t){if(r===t)return 0;const e=Yt(r),n=Yt(t);if(e!==n)return q(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return q(r.booleanValue,t.booleanValue);case 2:return function(o,u){const c=Z(o.integerValue||o.doubleValue),f=Z(u.integerValue||u.doubleValue);return c<f?-1:c>f?1:c===f?0:isNaN(c)?isNaN(f)?0:-1:1}(r,t);case 3:return eo(r.timestampValue,t.timestampValue);case 4:return eo(an(r),an(t));case 5:return Wr(r.stringValue,t.stringValue);case 6:return function(o,u){const c=Xt(o),f=Xt(u);return c.compareTo(f)}(r.bytesValue,t.bytesValue);case 7:return function(o,u){const c=o.split("/"),f=u.split("/");for(let d=0;d<c.length&&d<f.length;d++){const p=q(c[d],f[d]);if(p!==0)return p}return q(c.length,f.length)}(r.referenceValue,t.referenceValue);case 8:return function(o,u){const c=q(Z(o.latitude),Z(u.latitude));return c!==0?c:q(Z(o.longitude),Z(u.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return no(r.arrayValue,t.arrayValue);case 10:return function(o,u){var V,S,k,x;const c=o.fields||{},f=u.fields||{},d=(V=c[Kn])==null?void 0:V.arrayValue,p=(S=f[Kn])==null?void 0:S.arrayValue,I=q(((k=d==null?void 0:d.values)==null?void 0:k.length)||0,((x=p==null?void 0:p.values)==null?void 0:x.length)||0);return I!==0?I:no(d,p)}(r.mapValue,t.mapValue);case 11:return function(o,u){if(o===Mn.mapValue&&u===Mn.mapValue)return 0;if(o===Mn.mapValue)return 1;if(u===Mn.mapValue)return-1;const c=o.fields||{},f=Object.keys(c),d=u.fields||{},p=Object.keys(d);f.sort(),p.sort();for(let I=0;I<f.length&&I<p.length;++I){const V=Wr(f[I],p[I]);if(V!==0)return V;const S=Ve(c[f[I]],d[p[I]]);if(S!==0)return S}return q(f.length,p.length)}(r.mapValue,t.mapValue);default:throw O(23264,{he:e})}}function eo(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return q(r,t);const e=Ht(r),n=Ht(t),i=q(e.seconds,n.seconds);return i!==0?i:q(e.nanos,n.nanos)}function no(r,t){const e=r.values||[],n=t.values||[];for(let i=0;i<e.length&&i<n.length;++i){const o=Ve(e[i],n[i]);if(o)return o}return q(e.length,n.length)}function Pe(r){return Hr(r)}function Hr(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=Ht(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return Xt(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return M.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",i=!0;for(const o of e.values||[])i?i=!1:n+=",",n+=Hr(o);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const u of n)o?o=!1:i+=",",i+=`${u}:${Hr(e.fields[u])}`;return i+"}"}(r.mapValue):O(61005,{value:r})}function Un(r){switch(Yt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=sr(r);return t?16+Un(t):16;case 5:return 2*r.stringValue.length;case 6:return Xt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((i,o)=>i+Un(o),0)}(r.arrayValue);case 10:case 11:return function(n){let i=0;return te(n.fields,(o,u)=>{i+=o.length+Un(u)}),i}(r.mapValue);default:throw O(13486,{value:r})}}function Xr(r){return!!r&&"integerValue"in r}function gs(r){return!!r&&"arrayValue"in r}function ro(r){return!!r&&"nullValue"in r}function so(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function qn(r){return!!r&&"mapValue"in r}function Dl(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[ra])==null?void 0:n.stringValue)===sa}function tn(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const t={mapValue:{fields:{}}};return te(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=tn(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=tn(r.arrayValue.values[e]);return t}return{...r}}function Nl(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===bl}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(t){this.value=t}static empty(){return new It({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!qn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=tn(e)}setAll(t){let e=ct.emptyPath(),n={},i=[];t.forEach((u,c)=>{if(!e.isImmediateParentOf(c)){const f=this.getFieldsMap(e);this.applyChanges(f,n,i),n={},i=[],e=c.popLast()}u?n[c.lastSegment()]=tn(u):i.push(c.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,n,i)}delete(t){const e=this.field(t.popLast());qn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return xt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let i=e.mapValue.fields[t.get(n)];qn(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,n){te(e,(i,o)=>t[i]=o);for(const i of n)delete t[i]}clone(){return new It(tn(this.value))}}function ia(r){const t=[];return te(r.fields,(e,n)=>{const i=new ct([e]);if(qn(n)){const o=ia(n.mapValue).fields;if(o.length===0)t.push(i);else for(const u of o)t.push(i.child(u))}else t.push(i)}),new wt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(t,e,n,i,o,u,c){this.key=t,this.documentType=e,this.version=n,this.readTime=i,this.createTime=o,this.data=u,this.documentState=c}static newInvalidDocument(t){return new pt(t,0,L.min(),L.min(),L.min(),It.empty(),0)}static newFoundDocument(t,e,n,i){return new pt(t,1,e,L.min(),n,i,0)}static newNoDocument(t,e){return new pt(t,2,e,L.min(),L.min(),It.empty(),0)}static newUnknownDocument(t,e){return new pt(t,3,e,L.min(),L.min(),It.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=It.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=It.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof pt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new pt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(t,e){this.position=t,this.inclusive=e}}function io(r,t,e){let n=0;for(let i=0;i<r.position.length;i++){const o=t[i],u=r.position[i];if(o.field.isKeyField()?n=M.comparator(M.fromName(u.referenceValue),e.key):n=Ve(u,e.data.field(o.field)),o.dir==="desc"&&(n*=-1),n!==0)break}return n}function oo(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!xt(r.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(t,e="asc"){this.field=t,this.dir=e}}function kl(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{}class st extends oa{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Ml(t,e,n):e==="array-contains"?new Fl(t,n):e==="in"?new Ul(t,n):e==="not-in"?new ql(t,n):e==="array-contains-any"?new jl(t,n):new st(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new Ol(t,n):new Ll(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Ve(e,this.value)):e!==null&&Yt(this.value)===Yt(e)&&this.matchesComparison(Ve(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Mt extends oa{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Mt(t,e)}matches(t){return aa(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function aa(r){return r.op==="and"}function ua(r){return xl(r)&&aa(r)}function xl(r){for(const t of r.filters)if(t instanceof Mt)return!1;return!0}function Yr(r){if(r instanceof st)return r.field.canonicalString()+r.op.toString()+Pe(r.value);if(ua(r))return r.filters.map(t=>Yr(t)).join(",");{const t=r.filters.map(e=>Yr(e)).join(",");return`${r.op}(${t})`}}function la(r,t){return r instanceof st?function(n,i){return i instanceof st&&n.op===i.op&&n.field.isEqual(i.field)&&xt(n.value,i.value)}(r,t):r instanceof Mt?function(n,i){return i instanceof Mt&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((o,u,c)=>o&&la(u,i.filters[c]),!0):!1}(r,t):void O(19439)}function ca(r){return r instanceof st?function(e){return`${e.field.canonicalString()} ${e.op} ${Pe(e.value)}`}(r):r instanceof Mt?function(e){return e.op.toString()+" {"+e.getFilters().map(ca).join(" ,")+"}"}(r):"Filter"}class Ml extends st{constructor(t,e,n){super(t,e,n),this.key=M.fromName(n.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class Ol extends st{constructor(t,e){super(t,"in",e),this.keys=ha("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Ll extends st{constructor(t,e){super(t,"not-in",e),this.keys=ha("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function ha(r,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(n=>M.fromName(n.referenceValue))}class Fl extends st{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return gs(e)&&ln(e.arrayValue,this.value)}}class Ul extends st{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&ln(this.value.arrayValue,e)}}class ql extends st{constructor(t,e){super(t,"not-in",e)}matches(t){if(ln(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!ln(this.value.arrayValue,e)}}class jl extends st{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!gs(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>ln(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(t,e=null,n=[],i=[],o=null,u=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=i,this.limit=o,this.startAt=u,this.endAt=c,this.Te=null}}function ao(r,t=null,e=[],n=[],i=null,o=null,u=null){return new Bl(r,t,e,n,i,o,u)}function ps(r){const t=F(r);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>Yr(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(o){return o.field.canonicalString()+o.dir}(n)).join(","),rr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>Pe(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>Pe(n)).join(",")),t.Te=e}return t.Te}function _s(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!kl(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!la(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!oo(r.startAt,t.startAt)&&oo(r.endAt,t.endAt)}function Jr(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(t,e=null,n=[],i=[],o=null,u="F",c=null,f=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=i,this.limit=o,this.limitType=u,this.startAt=c,this.endAt=f,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function zl(r,t,e,n,i,o,u,c){return new ir(r,t,e,n,i,o,u,c)}function ys(r){return new ir(r)}function uo(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Gl(r){return r.collectionGroup!==null}function en(r){const t=F(r);if(t.Ie===null){t.Ie=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ie.push(o),e.add(o.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(u){let c=new ot(ct.comparator);return u.filters.forEach(f=>{f.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ie.push(new Wn(o,n))}),e.has(ct.keyField().canonicalString())||t.Ie.push(new Wn(ct.keyField(),n))}return t.Ie}function Ct(r){const t=F(r);return t.Ee||(t.Ee=$l(t,en(r))),t.Ee}function $l(r,t){if(r.limitType==="F")return ao(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new Wn(i.field,o)});const e=r.endAt?new Qn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Qn(r.startAt.position,r.startAt.inclusive):null;return ao(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function Zr(r,t,e){return new ir(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function or(r,t){return _s(Ct(r),Ct(t))&&r.limitType===t.limitType}function fa(r){return`${ps(Ct(r))}|lt:${r.limitType}`}function Ee(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(i=>ca(i)).join(", ")}]`),rr(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(i=>function(u){return`${u.field.canonicalString()} (${u.dir})`}(i)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(i=>Pe(i)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(i=>Pe(i)).join(",")),`Target(${n})`}(Ct(r))}; limitType=${r.limitType})`}function ar(r,t){return t.isFoundDocument()&&function(n,i){const o=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(o):M.isDocumentKey(n.path)?n.path.isEqual(o):n.path.isImmediateParentOf(o)}(r,t)&&function(n,i){for(const o of en(n))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(r,t)&&function(n,i){for(const o of n.filters)if(!o.matches(i))return!1;return!0}(r,t)&&function(n,i){return!(n.startAt&&!function(u,c,f){const d=io(u,c,f);return u.inclusive?d<=0:d<0}(n.startAt,en(n),i)||n.endAt&&!function(u,c,f){const d=io(u,c,f);return u.inclusive?d>=0:d>0}(n.endAt,en(n),i))}(r,t)}function Kl(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function da(r){return(t,e)=>{let n=!1;for(const i of en(r)){const o=Ql(i,t,e);if(o!==0)return o;n=n||i.field.isKeyField()}return 0}}function Ql(r,t,e){const n=r.field.isKeyField()?M.comparator(t.key,e.key):function(o,u,c){const f=u.data.field(o),d=c.data.field(o);return f!==null&&d!==null?Ve(f,d):O(42886)}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return O(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[i,o]of n)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),i=this.inner[n];if(i===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],t))return n.length===1?delete this.inner[e]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(t){te(this.inner,(e,n)=>{for(const[i,o]of n)t(i,o)})}isEmpty(){return Yo(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wl=new Y(M.comparator);function Ft(){return Wl}const ma=new Y(M.comparator);function Ye(...r){let t=ma;for(const e of r)t=t.insert(e.key,e);return t}function ga(r){let t=ma;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function ue(){return nn()}function pa(){return nn()}function nn(){return new me(r=>r.toString(),(r,t)=>r.isEqual(t))}const Hl=new Y(M.comparator),Xl=new ot(M.comparator);function j(...r){let t=Xl;for(const e of r)t=t.add(e);return t}const Yl=new ot(q);function Jl(){return Yl}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ts(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Gn(t)?"-0":t}}function _a(r){return{integerValue:""+r}}function Zl(r,t){return Rl(t)?_a(t):Ts(r,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(){this._=void 0}}function tc(r,t,e){return r instanceof Hn?function(i,o){const u={fields:{[ta]:{stringValue:Zo},[na]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&ms(o)&&(o=sr(o)),o&&(u.fields[ea]=o),{mapValue:u}}(e,t):r instanceof cn?Ta(r,t):r instanceof hn?Ea(r,t):function(i,o){const u=ya(i,o),c=lo(u)+lo(i.Ae);return Xr(u)&&Xr(i.Ae)?_a(c):Ts(i.serializer,c)}(r,t)}function ec(r,t,e){return r instanceof cn?Ta(r,t):r instanceof hn?Ea(r,t):e}function ya(r,t){return r instanceof Xn?function(n){return Xr(n)||function(o){return!!o&&"doubleValue"in o}(n)}(t)?t:{integerValue:0}:null}class Hn extends ur{}class cn extends ur{constructor(t){super(),this.elements=t}}function Ta(r,t){const e=Ia(t);for(const n of r.elements)e.some(i=>xt(i,n))||e.push(n);return{arrayValue:{values:e}}}class hn extends ur{constructor(t){super(),this.elements=t}}function Ea(r,t){let e=Ia(t);for(const n of r.elements)e=e.filter(i=>!xt(i,n));return{arrayValue:{values:e}}}class Xn extends ur{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function lo(r){return Z(r.integerValue||r.doubleValue)}function Ia(r){return gs(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}function nc(r,t){return r.field.isEqual(t.field)&&function(n,i){return n instanceof cn&&i instanceof cn||n instanceof hn&&i instanceof hn?Re(n.elements,i.elements,xt):n instanceof Xn&&i instanceof Xn?xt(n.Ae,i.Ae):n instanceof Hn&&i instanceof Hn}(r.transform,t.transform)}class rc{constructor(t,e){this.version=t,this.transformResults=e}}class bt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new bt}static exists(t){return new bt(void 0,t)}static updateTime(t){return new bt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function jn(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class lr{}function va(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new wa(r.key,bt.none()):new mn(r.key,r.data,bt.none());{const e=r.data,n=It.empty();let i=new ot(ct.comparator);for(let o of t.fields)if(!i.has(o)){let u=e.field(o);u===null&&o.length>1&&(o=o.popLast(),u=e.field(o)),u===null?n.delete(o):n.set(o,u),i=i.add(o)}return new ee(r.key,n,new wt(i.toArray()),bt.none())}}function sc(r,t,e){r instanceof mn?function(i,o,u){const c=i.value.clone(),f=ho(i.fieldTransforms,o,u.transformResults);c.setAll(f),o.convertToFoundDocument(u.version,c).setHasCommittedMutations()}(r,t,e):r instanceof ee?function(i,o,u){if(!jn(i.precondition,o))return void o.convertToUnknownDocument(u.version);const c=ho(i.fieldTransforms,o,u.transformResults),f=o.data;f.setAll(Aa(i)),f.setAll(c),o.convertToFoundDocument(u.version,f).setHasCommittedMutations()}(r,t,e):function(i,o,u){o.convertToNoDocument(u.version).setHasCommittedMutations()}(0,t,e)}function rn(r,t,e,n){return r instanceof mn?function(o,u,c,f){if(!jn(o.precondition,u))return c;const d=o.value.clone(),p=fo(o.fieldTransforms,f,u);return d.setAll(p),u.convertToFoundDocument(u.version,d).setHasLocalMutations(),null}(r,t,e,n):r instanceof ee?function(o,u,c,f){if(!jn(o.precondition,u))return c;const d=fo(o.fieldTransforms,f,u),p=u.data;return p.setAll(Aa(o)),p.setAll(d),u.convertToFoundDocument(u.version,p).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(I=>I.field))}(r,t,e,n):function(o,u,c){return jn(o.precondition,u)?(u.convertToNoDocument(u.version).setHasLocalMutations(),null):c}(r,t,e)}function ic(r,t){let e=null;for(const n of r.fieldTransforms){const i=t.data.field(n.field),o=ya(n.transform,i||null);o!=null&&(e===null&&(e=It.empty()),e.set(n.field,o))}return e||null}function co(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&Re(n,i,(o,u)=>nc(o,u))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class mn extends lr{constructor(t,e,n,i=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class ee extends lr{constructor(t,e,n,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Aa(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function ho(r,t,e){const n=new Map;z(r.length===e.length,32656,{Re:e.length,Ve:r.length});for(let i=0;i<e.length;i++){const o=r[i],u=o.transform,c=t.data.field(o.field);n.set(o.field,ec(u,c,e[i]))}return n}function fo(r,t,e){const n=new Map;for(const i of r){const o=i.transform,u=e.data.field(i.field);n.set(i.field,tc(o,u,t))}return n}class wa extends lr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class oc extends lr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(t,e,n,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&sc(o,t,n[i])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=rn(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=rn(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=pa();return this.mutations.forEach(i=>{const o=t.get(i.key),u=o.overlayedDocument;let c=this.applyToLocalView(u,o.mutatedFields);c=e.has(i.key)?null:c;const f=va(u,c);f!==null&&n.set(i.key,f),u.isValidDocument()||u.convertToNoDocument(L.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),j())}isEqual(t){return this.batchId===t.batchId&&Re(this.mutations,t.mutations,(e,n)=>co(e,n))&&Re(this.baseMutations,t.baseMutations,(e,n)=>co(e,n))}}class Es{constructor(t,e,n,i){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=i}static from(t,e,n){z(t.mutations.length===n.length,58842,{me:t.mutations.length,fe:n.length});let i=function(){return Hl}();const o=t.mutations;for(let u=0;u<o.length;u++)i=i.insert(o[u].key,n[u].version);return new Es(t,e,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tt,B;function cc(r){switch(r){case P.OK:return O(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return O(15467,{code:r})}}function Ra(r){if(r===void 0)return Lt("GRPC error has no .code"),P.UNKNOWN;switch(r){case tt.OK:return P.OK;case tt.CANCELLED:return P.CANCELLED;case tt.UNKNOWN:return P.UNKNOWN;case tt.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case tt.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case tt.INTERNAL:return P.INTERNAL;case tt.UNAVAILABLE:return P.UNAVAILABLE;case tt.UNAUTHENTICATED:return P.UNAUTHENTICATED;case tt.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case tt.NOT_FOUND:return P.NOT_FOUND;case tt.ALREADY_EXISTS:return P.ALREADY_EXISTS;case tt.PERMISSION_DENIED:return P.PERMISSION_DENIED;case tt.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case tt.ABORTED:return P.ABORTED;case tt.OUT_OF_RANGE:return P.OUT_OF_RANGE;case tt.UNIMPLEMENTED:return P.UNIMPLEMENTED;case tt.DATA_LOSS:return P.DATA_LOSS;default:return O(39323,{code:r})}}(B=tt||(tt={}))[B.OK=0]="OK",B[B.CANCELLED=1]="CANCELLED",B[B.UNKNOWN=2]="UNKNOWN",B[B.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",B[B.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",B[B.NOT_FOUND=5]="NOT_FOUND",B[B.ALREADY_EXISTS=6]="ALREADY_EXISTS",B[B.PERMISSION_DENIED=7]="PERMISSION_DENIED",B[B.UNAUTHENTICATED=16]="UNAUTHENTICATED",B[B.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",B[B.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",B[B.ABORTED=10]="ABORTED",B[B.OUT_OF_RANGE=11]="OUT_OF_RANGE",B[B.UNIMPLEMENTED=12]="UNIMPLEMENTED",B[B.INTERNAL=13]="INTERNAL",B[B.UNAVAILABLE=14]="UNAVAILABLE",B[B.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hc(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc=new Kt([4294967295,4294967295],0);function mo(r){const t=hc().encode(r),e=new jo;return e.update(t),new Uint8Array(e.digest())}function go(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Kt([e,n],0),new Kt([i,o],0)]}class Is{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new Je(`Invalid padding: ${e}`);if(n<0)throw new Je(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new Je(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new Je(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Kt.fromNumber(this.ge)}ye(t,e,n){let i=t.add(e.multiply(Kt.fromNumber(n)));return i.compare(fc)===1&&(i=new Kt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=mo(t),[n,i]=go(e);for(let o=0;o<this.hashCount;o++){const u=this.ye(n,i,o);if(!this.we(u))return!1}return!0}static create(t,e,n){const i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),u=new Is(o,i,e);return n.forEach(c=>u.insert(c)),u}insert(t){if(this.ge===0)return;const e=mo(t),[n,i]=go(e);for(let o=0;o<this.hashCount;o++){const u=this.ye(n,i,o);this.Se(u)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class Je extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(t,e,n,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const i=new Map;return i.set(t,gn.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new cr(L.min(),i,new Y(q),Ft(),j())}}class gn{constructor(t,e,n,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new gn(n,e,j(),j(),j())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(t,e,n,i){this.be=t,this.removedTargetIds=e,this.key=n,this.De=i}}class Va{constructor(t,e){this.targetId=t,this.Ce=e}}class Pa{constructor(t,e,n=ht.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=i}}class po{constructor(){this.ve=0,this.Fe=_o(),this.Me=ht.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=j(),e=j(),n=j();return this.Fe.forEach((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:n=n.add(i);break;default:O(38017,{changeType:o})}}),new gn(this.Me,this.xe,t,e,n)}qe(){this.Oe=!1,this.Fe=_o()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,z(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class dc{constructor(t){this.Ge=t,this.ze=new Map,this.je=Ft(),this.Je=On(),this.He=On(),this.Ye=new Y(q)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const n=this.nt(e);switch(t.state){case 0:this.rt(e)&&n.Le(t.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(t.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(n.We(),n.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),n.Le(t.resumeToken));break;default:O(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((n,i)=>{this.rt(i)&&e(i)})}st(t){const e=t.targetId,n=t.Ce.count,i=this.ot(e);if(i){const o=i.target;if(Jr(o))if(n===0){const u=new M(o.path);this.et(e,u,pt.newNoDocument(u,L.min()))}else z(n===1,20013,{expectedCount:n});else{const u=this._t(e);if(u!==n){const c=this.ut(t),f=c?this.ct(c,t,u):1;if(f!==0){this.it(e);const d=f===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,d)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:o=0}=e;let u,c;try{u=Xt(n).toUint8Array()}catch(f){if(f instanceof Jo)return we("Decoding the base64 bloom filter in existence filter failed ("+f.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw f}try{c=new Is(u,i,o)}catch(f){return we(f instanceof Je?"BloomFilter error: ":"Applying bloom filter failed: ",f),null}return c.ge===0?null:c}ct(t,e,n){return e.Ce.count===n-this.Pt(t,e.targetId)?0:2}Pt(t,e){const n=this.Ge.getRemoteKeysForTarget(e);let i=0;return n.forEach(o=>{const u=this.Ge.ht(),c=`projects/${u.projectId}/databases/${u.database}/documents/${o.path.canonicalString()}`;t.mightContain(c)||(this.et(e,o,null),i++)}),i}Tt(t){const e=new Map;this.ze.forEach((o,u)=>{const c=this.ot(u);if(c){if(o.current&&Jr(c.target)){const f=new M(c.target.path);this.It(f).has(u)||this.Et(u,f)||this.et(u,f,pt.newNoDocument(f,t))}o.Be&&(e.set(u,o.ke()),o.qe())}});let n=j();this.He.forEach((o,u)=>{let c=!0;u.forEachWhile(f=>{const d=this.ot(f);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(n=n.add(o))}),this.je.forEach((o,u)=>u.setReadTime(t));const i=new cr(t,e,this.Ye,this.je,n);return this.je=Ft(),this.Je=On(),this.He=On(),this.Ye=new Y(q),i}Xe(t,e){if(!this.rt(t))return;const n=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,n),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,n){if(!this.rt(t))return;const i=this.nt(t);this.Et(t,e)?i.Qe(e,1):i.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),n&&(this.je=this.je.insert(e,n))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new po,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new ot(q),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new ot(q),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||D("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new po),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function On(){return new Y(M.comparator)}function _o(){return new Y(M.comparator)}const mc={asc:"ASCENDING",desc:"DESCENDING"},gc={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},pc={and:"AND",or:"OR"};class _c{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function ts(r,t){return r.useProto3Json||rr(t)?t:{value:t}}function Yn(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Sa(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function yc(r,t){return Yn(r,t.toTimestamp())}function Dt(r){return z(!!r,49232),L.fromTimestamp(function(e){const n=Ht(e);return new H(n.seconds,n.nanos)}(r))}function vs(r,t){return es(r,t).canonicalString()}function es(r,t){const e=function(i){return new X(["projects",i.projectId,"databases",i.database])}(r).child("documents");return t===void 0?e:e.child(t)}function Ca(r){const t=X.fromString(r);return z(xa(t),10190,{key:t.toString()}),t}function ns(r,t){return vs(r.databaseId,t.path)}function zr(r,t){const e=Ca(t);if(e.get(1)!==r.databaseId.projectId)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new M(Da(e))}function ba(r,t){return vs(r.databaseId,t)}function Tc(r){const t=Ca(r);return t.length===4?X.emptyPath():Da(t)}function rs(r){return new X(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Da(r){return z(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function yo(r,t,e){return{name:ns(r,t),fields:e.value.mapValue.fields}}function Ec(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:O(39313,{state:d})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(d,p){return d.useProto3Json?(z(p===void 0||typeof p=="string",58123),ht.fromBase64String(p||"")):(z(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),ht.fromUint8Array(p||new Uint8Array))}(r,t.targetChange.resumeToken),u=t.targetChange.cause,c=u&&function(d){const p=d.code===void 0?P.UNKNOWN:Ra(d.code);return new N(p,d.message||"")}(u);e=new Pa(n,i,o,c||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const i=zr(r,n.document.name),o=Dt(n.document.updateTime),u=n.document.createTime?Dt(n.document.createTime):L.min(),c=new It({mapValue:{fields:n.document.fields}}),f=pt.newFoundDocument(i,o,u,c),d=n.targetIds||[],p=n.removedTargetIds||[];e=new Bn(d,p,f.key,f)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const i=zr(r,n.document),o=n.readTime?Dt(n.readTime):L.min(),u=pt.newNoDocument(i,o),c=n.removedTargetIds||[];e=new Bn([],c,u.key,u)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const i=zr(r,n.document),o=n.removedTargetIds||[];e=new Bn([],o,i,null)}else{if(!("filter"in t))return O(11601,{Rt:t});{t.filter;const n=t.filter;n.targetId;const{count:i=0,unchangedNames:o}=n,u=new lc(i,o),c=n.targetId;e=new Va(c,u)}}return e}function Ic(r,t){let e;if(t instanceof mn)e={update:yo(r,t.key,t.value)};else if(t instanceof wa)e={delete:ns(r,t.key)};else if(t instanceof ee)e={update:yo(r,t.key,t.data),updateMask:bc(t.fieldMask)};else{if(!(t instanceof oc))return O(16599,{Vt:t.type});e={verify:ns(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(o,u){const c=u.transform;if(c instanceof Hn)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof cn)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof hn)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Xn)return{fieldPath:u.field.canonicalString(),increment:c.Ae};throw O(20930,{transform:u.transform})}(0,n))),t.precondition.isNone||(e.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:yc(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:O(27497)}(r,t.precondition)),e}function vc(r,t){return r&&r.length>0?(z(t!==void 0,14353),r.map(e=>function(i,o){let u=i.updateTime?Dt(i.updateTime):Dt(o);return u.isEqual(L.min())&&(u=Dt(o)),new rc(u,i.transformResults||[])}(e,t))):[]}function Ac(r,t){return{documents:[ba(r,t.path)]}}function wc(r,t){const e={structuredQuery:{}},n=t.path;let i;t.collectionGroup!==null?(i=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=ba(r,i);const o=function(d){if(d.length!==0)return ka(Mt.create(d,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const u=function(d){if(d.length!==0)return d.map(p=>function(V){return{field:Ie(V.field),direction:Pc(V.dir)}}(p))}(t.orderBy);u&&(e.structuredQuery.orderBy=u);const c=ts(r,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{ft:e,parent:i}}function Rc(r){let t=Tc(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let i=null;if(n>0){z(n===1,65062);const p=e.from[0];p.allDescendants?i=p.collectionId:t=t.child(p.collectionId)}let o=[];e.where&&(o=function(I){const V=Na(I);return V instanceof Mt&&ua(V)?V.getFilters():[V]}(e.where));let u=[];e.orderBy&&(u=function(I){return I.map(V=>function(k){return new Wn(ve(k.field),function(b){switch(b){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(V))}(e.orderBy));let c=null;e.limit&&(c=function(I){let V;return V=typeof I=="object"?I.value:I,rr(V)?null:V}(e.limit));let f=null;e.startAt&&(f=function(I){const V=!!I.before,S=I.values||[];return new Qn(S,V)}(e.startAt));let d=null;return e.endAt&&(d=function(I){const V=!I.before,S=I.values||[];return new Qn(S,V)}(e.endAt)),zl(t,i,u,o,c,"F",f,d)}function Vc(r,t){const e=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O(28987,{purpose:i})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Na(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=ve(e.unaryFilter.field);return st.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=ve(e.unaryFilter.field);return st.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=ve(e.unaryFilter.field);return st.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const u=ve(e.unaryFilter.field);return st.create(u,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}}(r):r.fieldFilter!==void 0?function(e){return st.create(ve(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return Mt.create(e.compositeFilter.filters.map(n=>Na(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return O(1026)}}(e.compositeFilter.op))}(r):O(30097,{filter:r})}function Pc(r){return mc[r]}function Sc(r){return gc[r]}function Cc(r){return pc[r]}function Ie(r){return{fieldPath:r.canonicalString()}}function ve(r){return ct.fromServerFormat(r.fieldPath)}function ka(r){return r instanceof st?function(e){if(e.op==="=="){if(so(e.value))return{unaryFilter:{field:Ie(e.field),op:"IS_NAN"}};if(ro(e.value))return{unaryFilter:{field:Ie(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(so(e.value))return{unaryFilter:{field:Ie(e.field),op:"IS_NOT_NAN"}};if(ro(e.value))return{unaryFilter:{field:Ie(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ie(e.field),op:Sc(e.op),value:e.value}}}(r):r instanceof Mt?function(e){const n=e.getFilters().map(i=>ka(i));return n.length===1?n[0]:{compositeFilter:{op:Cc(e.op),filters:n}}}(r):O(54877,{filter:r})}function bc(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function xa(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(t,e,n,i,o=L.min(),u=L.min(),c=ht.EMPTY_BYTE_STRING,f=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=u,this.resumeToken=c,this.expectedCount=f}withSequenceNumber(t){return new $t(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new $t(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new $t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new $t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(t){this.yt=t}}function Nc(r){const t=Rc({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Zr(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc{constructor(){this.Cn=new xc}addToCollectionParentIndex(t,e){return this.Cn.add(e),R.resolve()}getCollectionParents(t,e){return R.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return R.resolve()}deleteFieldIndex(t,e){return R.resolve()}deleteAllFieldIndexes(t){return R.resolve()}createTargetIndexes(t,e){return R.resolve()}getDocumentsMatchingTarget(t,e){return R.resolve(null)}getIndexType(t,e){return R.resolve(0)}getFieldIndexes(t,e){return R.resolve([])}getNextCollectionGroupToUpdate(t){return R.resolve(null)}getMinOffset(t,e){return R.resolve(Wt.min())}getMinOffsetFromCollectionGroup(t,e){return R.resolve(Wt.min())}updateCollectionGroup(t,e,n){return R.resolve()}updateIndexEntries(t,e){return R.resolve()}}class xc{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e]||new ot(X.comparator),o=!i.has(n);return this.index[e]=i.add(n),o}has(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e];return i&&i.has(n)}getEntries(t){return(this.index[t]||new ot(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const To={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ma=41943040;class Et{static withCacheSize(t){return new Et(t,Et.DEFAULT_COLLECTION_PERCENTILE,Et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Et.DEFAULT_COLLECTION_PERCENTILE=10,Et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Et.DEFAULT=new Et(Ma,Et.DEFAULT_COLLECTION_PERCENTILE,Et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Et.DISABLED=new Et(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new Se(0)}static cr(){return new Se(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eo="LruGarbageCollector",Mc=1048576;function Io([r,t],[e,n]){const i=q(r,e);return i===0?q(t,n):i}class Oc{constructor(t){this.Ir=t,this.buffer=new ot(Io),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Io(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Lc{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){D(Eo,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Ne(e)?D(Eo,"Ignoring IndexedDB error during garbage collection: ",e):await De(e)}await this.Vr(3e5)})}}class Fc{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return R.resolve(nr.ce);const n=new Oc(e);return this.mr.forEachTarget(t,i=>n.Ar(i.sequenceNumber)).next(()=>this.mr.pr(t,i=>n.Ar(i))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.mr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(To)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),To):this.yr(t,e))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let n,i,o,u,c,f,d;const p=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(I=>(I>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${I}`),i=this.params.maximumSequenceNumbersToCollect):i=I,u=Date.now(),this.nthSequenceNumber(t,i))).next(I=>(n=I,c=Date.now(),this.removeTargets(t,n,e))).next(I=>(o=I,f=Date.now(),this.removeOrphanedDocuments(t,n))).next(I=>(d=Date.now(),Te()<=Ot.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${u-p}ms
	Determined least recently used ${i} in `+(c-u)+`ms
	Removed ${o} targets in `+(f-c)+`ms
	Removed ${I} documents in `+(d-f)+`ms
Total Duration: ${d-p}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:I})))}}function Uc(r,t){return new Fc(r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(){this.changes=new me(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,pt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?R.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{constructor(t,e,n,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=i}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(n=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(n!==null&&rn(n.mutation,i,wt.empty(),H.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,j()).next(()=>n))}getLocalViewOfDocuments(t,e,n=j()){const i=ue();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,n).next(o=>{let u=Ye();return o.forEach((c,f)=>{u=u.insert(c,f.overlayedDocument)}),u}))}getOverlayedDocuments(t,e){const n=ue();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,j()))}populateOverlays(t,e,n){const i=[];return n.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((u,c)=>{e.set(u,c)})})}computeViews(t,e,n,i){let o=Ft();const u=nn(),c=function(){return nn()}();return e.forEach((f,d)=>{const p=n.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof ee)?o=o.insert(d.key,d):p!==void 0?(u.set(d.key,p.mutation.getFieldMask()),rn(p.mutation,d,p.mutation.getFieldMask(),H.now())):u.set(d.key,wt.empty())}),this.recalculateAndSaveOverlays(t,o).next(f=>(f.forEach((d,p)=>u.set(d,p)),e.forEach((d,p)=>c.set(d,new jc(p,u.get(d)??null))),c))}recalculateAndSaveOverlays(t,e){const n=nn();let i=new Y((u,c)=>u-c),o=j();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(u=>{for(const c of u)c.keys().forEach(f=>{const d=e.get(f);if(d===null)return;let p=n.get(f)||wt.empty();p=c.applyToLocalView(d,p),n.set(f,p);const I=(i.get(c.batchId)||j()).add(f);i=i.insert(c.batchId,I)})}).next(()=>{const u=[],c=i.getReverseIterator();for(;c.hasNext();){const f=c.getNext(),d=f.key,p=f.value,I=pa();p.forEach(V=>{if(!o.has(V)){const S=va(e.get(V),n.get(V));S!==null&&I.set(V,S),o=o.add(V)}}),u.push(this.documentOverlayCache.saveOverlays(t,d,I))}return R.waitFor(u)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,i){return function(u){return M.isDocumentKey(u.path)&&u.collectionGroup===null&&u.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Gl(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,i):this.getDocumentsMatchingCollectionQuery(t,e,n,i)}getNextDocuments(t,e,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,i).next(o=>{const u=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,i-o.size):R.resolve(ue());let c=on,f=o;return u.next(d=>R.forEach(d,(p,I)=>(c<I.largestBatchId&&(c=I.largestBatchId),o.get(p)?R.resolve():this.remoteDocumentCache.getEntry(t,p).next(V=>{f=f.insert(p,V)}))).next(()=>this.populateOverlays(t,d,o)).next(()=>this.computeViews(t,f,d,j())).next(p=>({batchId:c,changes:ga(p)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next(n=>{let i=Ye();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,n,i){const o=e.collectionGroup;let u=Ye();return this.indexManager.getCollectionParents(t,o).next(c=>R.forEach(c,f=>{const d=function(I,V){return new ir(V,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)}(e,f.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,n,i).next(p=>{p.forEach((I,V)=>{u=u.insert(I,V)})})}).next(()=>u))}getDocumentsMatchingCollectionQuery(t,e,n,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(u=>(o=u,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,o,i))).next(u=>{o.forEach((f,d)=>{const p=d.getKey();u.get(p)===null&&(u=u.insert(p,pt.newInvalidDocument(p)))});let c=Ye();return u.forEach((f,d)=>{const p=o.get(f);p!==void 0&&rn(p.mutation,d,wt.empty(),H.now()),ar(e,d)&&(c=c.insert(f,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return R.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,function(i){return{id:i.id,version:i.version,createTime:Dt(i.createTime)}}(e)),R.resolve()}getNamedQuery(t,e){return R.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,function(i){return{name:i.name,query:Nc(i.bundledQuery),readTime:Dt(i.readTime)}}(e)),R.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{constructor(){this.overlays=new Y(M.comparator),this.qr=new Map}getOverlay(t,e){return R.resolve(this.overlays.get(e))}getOverlays(t,e){const n=ue();return R.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&n.set(i,o)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((i,o)=>{this.St(t,e,o)}),R.resolve()}removeOverlaysForBatchId(t,e,n){const i=this.qr.get(n);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.qr.delete(n)),R.resolve()}getOverlaysForCollection(t,e,n){const i=ue(),o=e.length+1,u=new M(e.child("")),c=this.overlays.getIteratorFrom(u);for(;c.hasNext();){const f=c.getNext().value,d=f.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&f.largestBatchId>n&&i.set(f.getKey(),f)}return R.resolve(i)}getOverlaysForCollectionGroup(t,e,n,i){let o=new Y((d,p)=>d-p);const u=this.overlays.getIterator();for(;u.hasNext();){const d=u.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>n){let p=o.get(d.largestBatchId);p===null&&(p=ue(),o=o.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const c=ue(),f=o.getIterator();for(;f.hasNext()&&(f.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=i)););return R.resolve(c)}St(t,e,n){const i=this.overlays.get(n.key);if(i!==null){const u=this.qr.get(i.largestBatchId).delete(n.key);this.qr.set(i.largestBatchId,u)}this.overlays=this.overlays.insert(n.key,new uc(e,n));let o=this.qr.get(e);o===void 0&&(o=j(),this.qr.set(e,o)),this.qr.set(e,o.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(t){return R.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,R.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(){this.Qr=new ot(ut.$r),this.Ur=new ot(ut.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const n=new ut(t,e);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.Gr(new ut(t,e))}zr(t,e){t.forEach(n=>this.removeReference(n,e))}jr(t){const e=new M(new X([])),n=new ut(e,t),i=new ut(e,t+1),o=[];return this.Ur.forEachInRange([n,i],u=>{this.Gr(u),o.push(u.key)}),o}Jr(){this.Qr.forEach(t=>this.Gr(t))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new M(new X([])),n=new ut(e,t),i=new ut(e,t+1);let o=j();return this.Ur.forEachInRange([n,i],u=>{o=o.add(u.key)}),o}containsKey(t){const e=new ut(t,0),n=this.Qr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class ut{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return M.comparator(t.key,e.key)||q(t.Yr,e.Yr)}static Kr(t,e){return q(t.Yr,e.Yr)||M.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new ot(ut.$r)}checkEmpty(t){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,i){const o=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const u=new ac(o,e,n,i);this.mutationQueue.push(u);for(const c of i)this.Zr=this.Zr.add(new ut(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return R.resolve(u)}lookupMutationBatch(t,e){return R.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,i=this.ei(n),o=i<0?0:i;return R.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?ds:this.tr-1)}getAllMutationBatches(t){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new ut(e,0),i=new ut(e,Number.POSITIVE_INFINITY),o=[];return this.Zr.forEachInRange([n,i],u=>{const c=this.Xr(u.Yr);o.push(c)}),R.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new ot(q);return e.forEach(i=>{const o=new ut(i,0),u=new ut(i,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([o,u],c=>{n=n.add(c.Yr)})}),R.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,i=n.length+1;let o=n;M.isDocumentKey(o)||(o=o.child(""));const u=new ut(new M(o),0);let c=new ot(q);return this.Zr.forEachWhile(f=>{const d=f.key.path;return!!n.isPrefixOf(d)&&(d.length===i&&(c=c.add(f.Yr)),!0)},u),R.resolve(this.ti(c))}ti(t){const e=[];return t.forEach(n=>{const i=this.Xr(n);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){z(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Zr;return R.forEach(e.mutations,i=>{const o=new ut(i.key,e.batchId);return n=n.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.Zr=n})}ir(t){}containsKey(t,e){const n=new ut(e,0),i=this.Zr.firstAfterOrEqual(n);return R.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,R.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(t){this.ri=t,this.docs=function(){return new Y(M.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,i=this.docs.get(n),o=i?i.size:0,u=this.ri(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:u}),this.size+=u-o,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return R.resolve(n?n.document.mutableCopy():pt.newInvalidDocument(e))}getEntries(t,e){let n=Ft();return e.forEach(i=>{const o=this.docs.get(i);n=n.insert(i,o?o.document.mutableCopy():pt.newInvalidDocument(i))}),R.resolve(n)}getDocumentsMatchingQuery(t,e,n,i){let o=Ft();const u=e.path,c=new M(u.child("__id-9223372036854775808__")),f=this.docs.getIteratorFrom(c);for(;f.hasNext();){const{key:d,value:{document:p}}=f.getNext();if(!u.isPrefixOf(d.path))break;d.path.length>u.length+1||Il(El(p),n)<=0||(i.has(p.key)||ar(e,p))&&(o=o.insert(p.key,p.mutableCopy()))}return R.resolve(o)}getAllFromCollectionGroup(t,e,n,i){O(9500)}ii(t,e){return R.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new Wc(this)}getSize(t){return R.resolve(this.size)}}class Wc extends qc{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?e.push(this.Nr.addEntry(t,i)):this.Nr.removeEntry(n)}),R.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(t){this.persistence=t,this.si=new me(e=>ps(e),_s),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.oi=0,this._i=new As,this.targetCount=0,this.ai=Se.ur()}forEachTarget(t,e){return this.si.forEach((n,i)=>e(i)),R.resolve()}getLastRemoteSnapshotVersion(t){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return R.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.oi&&(this.oi=e),R.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new Se(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,R.resolve()}updateTargetData(t,e){return this.Pr(e),R.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,R.resolve()}removeTargets(t,e,n){let i=0;const o=[];return this.si.forEach((u,c)=>{c.sequenceNumber<=e&&n.get(c.targetId)===null&&(this.si.delete(u),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),i++)}),R.waitFor(o).next(()=>i)}getTargetCount(t){return R.resolve(this.targetCount)}getTargetData(t,e){const n=this.si.get(e)||null;return R.resolve(n)}addMatchingKeys(t,e,n){return this._i.Wr(e,n),R.resolve()}removeMatchingKeys(t,e,n){this._i.zr(e,n);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(u=>{o.push(i.markPotentiallyOrphaned(t,u))}),R.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),R.resolve()}getMatchingKeysForTargetId(t,e){const n=this._i.Hr(e);return R.resolve(n)}containsKey(t,e){return R.resolve(this._i.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(t,e){this.ui={},this.overlays={},this.ci=new nr(0),this.li=!1,this.li=!0,this.hi=new $c,this.referenceDelegate=t(this),this.Pi=new Hc(this),this.indexManager=new kc,this.remoteDocumentCache=function(i){return new Qc(i)}(n=>this.referenceDelegate.Ti(n)),this.serializer=new Dc(e),this.Ii=new zc(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Gc,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ui[t.toKey()];return n||(n=new Kc(e,this.referenceDelegate),this.ui[t.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,n){D("MemoryPersistence","Starting transaction:",t);const i=new Xc(this.ci.next());return this.referenceDelegate.Ei(),n(i).next(o=>this.referenceDelegate.di(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Ai(t,e){return R.or(Object.values(this.ui).map(n=>()=>n.containsKey(t,e)))}}class Xc extends Al{constructor(t){super(),this.currentSequenceNumber=t}}class ws{constructor(t){this.persistence=t,this.Ri=new As,this.Vi=null}static mi(t){return new ws(t)}get fi(){if(this.Vi)return this.Vi;throw O(60996)}addReference(t,e,n){return this.Ri.addReference(n,e),this.fi.delete(n.toString()),R.resolve()}removeReference(t,e,n){return this.Ri.removeReference(n,e),this.fi.add(n.toString()),R.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),R.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach(i=>this.fi.add(i.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.fi.add(o.toString()))}).next(()=>n.removeTargetData(t,e))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.fi,n=>{const i=M.fromPath(n);return this.gi(t,i).next(o=>{o||e.removeEntry(i,L.min())})}).next(()=>(this.Vi=null,e.apply(t)))}updateLimboDocument(t,e){return this.gi(t,e).next(n=>{n?this.fi.delete(e.toString()):this.fi.add(e.toString())})}Ti(t){return 0}gi(t,e){return R.or([()=>R.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class Jn{constructor(t,e){this.persistence=t,this.pi=new me(n=>Vl(n.path),(n,i)=>n.isEqual(i)),this.garbageCollector=Uc(this,e)}static mi(t,e){return new Jn(t,e)}Ei(){}di(t){return R.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next(n=>e.next(i=>n+i))}wr(t){let e=0;return this.pr(t,n=>{e++}).next(()=>e)}pr(t,e){return R.forEach(this.pi,(n,i)=>this.br(t,n,i).next(o=>o?R.resolve():e(i)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ii(t,u=>this.br(t,u,e).next(c=>{c||(n++,o.removeEntry(u,L.min()))})).next(()=>o.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),R.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.pi.set(n,t.currentSequenceNumber),R.resolve()}removeReference(t,e,n){return this.pi.set(n,t.currentSequenceNumber),R.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),R.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Un(t.data.value)),e}br(t,e,n){return R.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const i=this.pi.get(e);return R.resolve(i!==void 0&&i>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(t,e,n,i){this.targetId=t,this.fromCache=e,this.Es=n,this.ds=i}static As(t,e){let n=j(),i=j();for(const o of e.docChanges)switch(o.type){case 0:n=n.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Rs(t,e.fromCache,n,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return sl()?8:wl(il())>0?6:4}()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,n,i){const o={result:null};return this.ys(t,e).next(u=>{o.result=u}).next(()=>{if(!o.result)return this.ws(t,e,i,n).next(u=>{o.result=u})}).next(()=>{if(o.result)return;const u=new Yc;return this.Ss(t,e,u).next(c=>{if(o.result=c,this.Vs)return this.bs(t,e,u,c.size)})}).next(()=>o.result)}bs(t,e,n,i){return n.documentReadCount<this.fs?(Te()<=Ot.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",Ee(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),R.resolve()):(Te()<=Ot.DEBUG&&D("QueryEngine","Query:",Ee(e),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.gs*i?(Te()<=Ot.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",Ee(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Ct(e))):R.resolve())}ys(t,e){if(uo(e))return R.resolve(null);let n=Ct(e);return this.indexManager.getIndexType(t,n).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=Zr(e,null,"F"),n=Ct(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(o=>{const u=j(...o);return this.ps.getDocuments(t,u).next(c=>this.indexManager.getMinOffset(t,n).next(f=>{const d=this.Ds(e,c);return this.Cs(e,d,u,f.readTime)?this.ys(t,Zr(e,null,"F")):this.vs(t,d,e,f)}))})))}ws(t,e,n,i){return uo(e)||i.isEqual(L.min())?R.resolve(null):this.ps.getDocuments(t,n).next(o=>{const u=this.Ds(e,o);return this.Cs(e,u,n,i)?R.resolve(null):(Te()<=Ot.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ee(e)),this.vs(t,u,e,Tl(i,on)).next(c=>c))})}Ds(t,e){let n=new ot(da(t));return e.forEach((i,o)=>{ar(t,o)&&(n=n.add(o))}),n}Cs(t,e,n,i){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}Ss(t,e,n){return Te()<=Ot.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",Ee(e)),this.ps.getDocumentsMatchingQuery(t,e,Wt.min(),n)}vs(t,e,n,i){return this.ps.getDocumentsMatchingQuery(t,n,i).next(o=>(e.forEach(u=>{o=o.insert(u.key,u)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vs="LocalStore",Zc=3e8;class th{constructor(t,e,n,i){this.persistence=t,this.Fs=e,this.serializer=i,this.Ms=new Y(q),this.xs=new me(o=>ps(o),_s),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(n)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Bc(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Ms))}}function eh(r,t,e,n){return new th(r,t,e,n)}async function La(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let i;return e.mutationQueue.getAllMutationBatches(n).next(o=>(i=o,e.Bs(t),e.mutationQueue.getAllMutationBatches(n))).next(o=>{const u=[],c=[];let f=j();for(const d of i){u.push(d.batchId);for(const p of d.mutations)f=f.add(p.key)}for(const d of o){c.push(d.batchId);for(const p of d.mutations)f=f.add(p.key)}return e.localDocuments.getDocuments(n,f).next(d=>({Ls:d,removedBatchIds:u,addedBatchIds:c}))})})}function nh(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const i=t.batch.keys(),o=e.Ns.newChangeBuffer({trackRemovals:!0});return function(c,f,d,p){const I=d.batch,V=I.keys();let S=R.resolve();return V.forEach(k=>{S=S.next(()=>p.getEntry(f,k)).next(x=>{const b=d.docVersions.get(k);z(b!==null,48541),x.version.compareTo(b)<0&&(I.applyToRemoteDocument(x,d),x.isValidDocument()&&(x.setReadTime(d.commitVersion),p.addEntry(x)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(f,I))}(e,n,t,o).next(()=>o.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,i,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(c){let f=j();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(f=f.add(c.batch.mutations[d].key));return f}(t))).next(()=>e.localDocuments.getDocuments(n,i))})}function Fa(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Pi.getLastRemoteSnapshotVersion(e))}function rh(r,t){const e=F(r),n=t.snapshotVersion;let i=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const u=e.Ns.newChangeBuffer({trackRemovals:!0});i=e.Ms;const c=[];t.targetChanges.forEach((p,I)=>{const V=i.get(I);if(!V)return;c.push(e.Pi.removeMatchingKeys(o,p.removedDocuments,I).next(()=>e.Pi.addMatchingKeys(o,p.addedDocuments,I)));let S=V.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(I)!==null?S=S.withResumeToken(ht.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,n)),i=i.insert(I,S),function(x,b,K){return x.resumeToken.approximateByteSize()===0||b.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=Zc?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0}(V,S,p)&&c.push(e.Pi.updateTargetData(o,S))});let f=Ft(),d=j();if(t.documentUpdates.forEach(p=>{t.resolvedLimboDocuments.has(p)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(o,p))}),c.push(sh(o,u,t.documentUpdates).next(p=>{f=p.ks,d=p.qs})),!n.isEqual(L.min())){const p=e.Pi.getLastRemoteSnapshotVersion(o).next(I=>e.Pi.setTargetsMetadata(o,o.currentSequenceNumber,n));c.push(p)}return R.waitFor(c).next(()=>u.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,f,d)).next(()=>f)}).then(o=>(e.Ms=i,o))}function sh(r,t,e){let n=j(),i=j();return e.forEach(o=>n=n.add(o)),t.getEntries(r,n).next(o=>{let u=Ft();return e.forEach((c,f)=>{const d=o.get(c);f.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),f.isNoDocument()&&f.version.isEqual(L.min())?(t.removeEntry(c,f.readTime),u=u.insert(c,f)):!d.isValidDocument()||f.version.compareTo(d.version)>0||f.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(f),u=u.insert(c,f)):D(Vs,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",f.version)}),{ks:u,qs:i}})}function ih(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=ds),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function oh(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return e.Pi.getTargetData(n,t).next(o=>o?(i=o,R.resolve(i)):e.Pi.allocateTargetId(n).next(u=>(i=new $t(t,u,"TargetPurposeListen",n.currentSequenceNumber),e.Pi.addTargetData(n,i).next(()=>i))))}).then(n=>{const i=e.Ms.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(n.targetId,n),e.xs.set(t,n.targetId)),n})}async function ss(r,t,e){const n=F(r),i=n.Ms.get(t),o=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",o,u=>n.persistence.referenceDelegate.removeTarget(u,i))}catch(u){if(!Ne(u))throw u;D(Vs,`Failed to update sequence numbers for target ${t}: ${u}`)}n.Ms=n.Ms.remove(t),n.xs.delete(i.target)}function vo(r,t,e){const n=F(r);let i=L.min(),o=j();return n.persistence.runTransaction("Execute query","readwrite",u=>function(f,d,p){const I=F(f),V=I.xs.get(p);return V!==void 0?R.resolve(I.Ms.get(V)):I.Pi.getTargetData(d,p)}(n,u,Ct(t)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,n.Pi.getMatchingKeysForTargetId(u,c.targetId).next(f=>{o=f})}).next(()=>n.Fs.getDocumentsMatchingQuery(u,t,e?i:L.min(),e?o:j())).next(c=>(ah(n,Kl(t),c),{documents:c,Qs:o})))}function ah(r,t,e){let n=r.Os.get(t)||L.min();e.forEach((i,o)=>{o.readTime.compareTo(n)>0&&(n=o.readTime)}),r.Os.set(t,n)}class Ao{constructor(){this.activeTargetIds=Jl()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class uh{constructor(){this.Mo=new Ao,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,n){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new Ao,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{Oo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wo="ConnectivityMonitor";class Ro{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){D(wo,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){D(wo,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ln=null;function is(){return Ln===null?Ln=function(){return 268435456+Math.round(2147483648*Math.random())}():Ln++,"0x"+Ln.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gr="RestConnection",ch={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class hh{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${n}/databases/${i}`,this.Wo=this.databaseId.database===$n?`project_id=${n}`:`project_id=${n}&database_id=${i}`}Go(t,e,n,i,o){const u=is(),c=this.zo(t,e.toUriEncodedString());D(Gr,`Sending RPC '${t}' ${u}:`,c,n);const f={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(f,i,o);const{host:d}=new URL(c),p=qo(d);return this.Jo(t,c,f,n,p).then(I=>(D(Gr,`Received RPC '${t}' ${u}: `,I),I),I=>{throw we(Gr,`RPC '${t}' ${u} failed with error: `,I,"url: ",c,"request:",n),I})}Ho(t,e,n,i,o,u){return this.Go(t,e,n,i,o)}jo(t,e,n){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+be}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((i,o)=>t[o]=i),n&&n.headers.forEach((i,o)=>t[o]=i)}zo(t,e){const n=ch[t];return`${this.Uo}/v1/${e}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt="WebChannelConnection";class dh extends hh{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,n,i,o){const u=is();return new Promise((c,f)=>{const d=new Bo;d.setWithCredentials(!0),d.listenOnce(zo.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Fn.NO_ERROR:const I=d.getResponseJson();D(mt,`XHR for RPC '${t}' ${u} received:`,JSON.stringify(I)),c(I);break;case Fn.TIMEOUT:D(mt,`RPC '${t}' ${u} timed out`),f(new N(P.DEADLINE_EXCEEDED,"Request time out"));break;case Fn.HTTP_ERROR:const V=d.getStatus();if(D(mt,`RPC '${t}' ${u} failed with status:`,V,"response text:",d.getResponseText()),V>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);const k=S==null?void 0:S.error;if(k&&k.status&&k.message){const x=function(K){const G=K.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(G)>=0?G:P.UNKNOWN}(k.status);f(new N(x,k.message))}else f(new N(P.UNKNOWN,"Server responded with status "+d.getStatus()))}else f(new N(P.UNAVAILABLE,"Connection failed."));break;default:O(9055,{l_:t,streamId:u,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{D(mt,`RPC '${t}' ${u} completed.`)}});const p=JSON.stringify(i);D(mt,`RPC '${t}' ${u} sending request:`,i),d.send(e,"POST",p,n,15)})}T_(t,e,n){const i=is(),o=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],u=Ko(),c=$o(),f={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(f.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(f.useFetchStreams=!0),this.jo(f.initMessageHeaders,e,n),f.encodeInitMessageHeaders=!0;const p=o.join("");D(mt,`Creating RPC '${t}' stream ${i}: ${p}`,f);const I=u.createWebChannel(p,f);this.I_(I);let V=!1,S=!1;const k=new fh({Yo:b=>{S?D(mt,`Not sending because RPC '${t}' stream ${i} is closed:`,b):(V||(D(mt,`Opening RPC '${t}' stream ${i} transport.`),I.open(),V=!0),D(mt,`RPC '${t}' stream ${i} sending:`,b),I.send(b))},Zo:()=>I.close()}),x=(b,K,G)=>{b.listen(K,Q=>{try{G(Q)}catch(ft){setTimeout(()=>{throw ft},0)}})};return x(I,Xe.EventType.OPEN,()=>{S||(D(mt,`RPC '${t}' stream ${i} transport opened.`),k.o_())}),x(I,Xe.EventType.CLOSE,()=>{S||(S=!0,D(mt,`RPC '${t}' stream ${i} transport closed`),k.a_(),this.E_(I))}),x(I,Xe.EventType.ERROR,b=>{S||(S=!0,we(mt,`RPC '${t}' stream ${i} transport errored. Name:`,b.name,"Message:",b.message),k.a_(new N(P.UNAVAILABLE,"The operation could not be completed")))}),x(I,Xe.EventType.MESSAGE,b=>{var K;if(!S){const G=b.data[0];z(!!G,16349);const Q=G,ft=(Q==null?void 0:Q.error)||((K=Q[0])==null?void 0:K.error);if(ft){D(mt,`RPC '${t}' stream ${i} received error:`,ft);const vt=ft.status;let nt=function(_){const E=tt[_];if(E!==void 0)return Ra(E)}(vt),T=ft.message;nt===void 0&&(nt=P.INTERNAL,T="Unknown error status: "+vt+" with message "+ft.message),S=!0,k.a_(new N(nt,T)),I.close()}else D(mt,`RPC '${t}' stream ${i} received:`,G),k.u_(G)}}),x(c,Go.STAT_EVENT,b=>{b.stat===Qr.PROXY?D(mt,`RPC '${t}' stream ${i} detected buffering proxy`):b.stat===Qr.NOPROXY&&D(mt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.__()},0),k}terminate(){this.c_.forEach(t=>t.close()),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter(e=>e===t)}}function $r(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hr(r){return new _c(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(t,e,n=1e3,i=1.5,o=6e4){this.Mi=t,this.timerId=e,this.d_=n,this.A_=i,this.R_=o,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),i=Math.max(0,e-n);i>0&&D("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,i,()=>(this.f_=Date.now(),t())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo="PersistentStream";class qa{constructor(t,e,n,i,o,u,c,f){this.Mi=t,this.S_=n,this.b_=i,this.connection=o,this.authCredentialsProvider=u,this.appCheckCredentialsProvider=c,this.listener=f,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Ua(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(Lt(e.toString()),Lt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.D_===e&&this.G_(n,i)},n=>{t(()=>{const i=new N(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(i)})})}G_(t,e){const n=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo(()=>{n(()=>this.listener.Xo())}),this.stream.t_(()=>{n(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(i=>{n(()=>this.z_(i))}),this.stream.onMessage(i=>{n(()=>++this.F_==1?this.J_(i):this.onNext(i))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(t){return D(Vo,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget(()=>this.D_===t?e():(D(Vo,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class mh extends qa{constructor(t,e,n,i,o,u){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,i,u),this.serializer=o}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=Ec(this.serializer,t),n=function(o){if(!("targetChange"in o))return L.min();const u=o.targetChange;return u.targetIds&&u.targetIds.length?L.min():u.readTime?Dt(u.readTime):L.min()}(t);return this.listener.H_(e,n)}Y_(t){const e={};e.database=rs(this.serializer),e.addTarget=function(o,u){let c;const f=u.target;if(c=Jr(f)?{documents:Ac(o,f)}:{query:wc(o,f).ft},c.targetId=u.targetId,u.resumeToken.approximateByteSize()>0){c.resumeToken=Sa(o,u.resumeToken);const d=ts(o,u.expectedCount);d!==null&&(c.expectedCount=d)}else if(u.snapshotVersion.compareTo(L.min())>0){c.readTime=Yn(o,u.snapshotVersion.toTimestamp());const d=ts(o,u.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,t);const n=Vc(this.serializer,t);n&&(e.labels=n),this.q_(e)}Z_(t){const e={};e.database=rs(this.serializer),e.removeTarget=t,this.q_(e)}}class gh extends qa{constructor(t,e,n,i,o,u){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,i,u),this.serializer=o}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return z(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,z(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){z(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=vc(t.writeResults,t.commitTime),n=Dt(t.commitTime);return this.listener.na(n,e)}ra(){const t={};t.database=rs(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>Ic(this.serializer,n))};this.q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph{}class _h extends ph{constructor(t,e,n,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,n,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.connection.Go(t,es(e,n),i,o,u)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(P.UNKNOWN,o.toString())})}Ho(t,e,n,i,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([u,c])=>this.connection.Ho(t,es(e,n),i,u,c,o)).catch(u=>{throw u.name==="FirebaseError"?(u.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new N(P.UNKNOWN,u.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class yh{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Lt(e),this.aa=!1):D("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de="RemoteStore";class Th{constructor(t,e,n,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=o,this.Aa.Oo(u=>{n.enqueueAndForget(async()=>{ge(this)&&(D(de,"Restarting streams for network reachability change."),await async function(f){const d=F(f);d.Ea.add(4),await pn(d),d.Ra.set("Unknown"),d.Ea.delete(4),await fr(d)}(this))})}),this.Ra=new yh(n,i)}}async function fr(r){if(ge(r))for(const t of r.da)await t(!0)}async function pn(r){for(const t of r.da)await t(!1)}function ja(r,t){const e=F(r);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),bs(e)?Cs(e):ke(e).O_()&&Ss(e,t))}function Ps(r,t){const e=F(r),n=ke(e);e.Ia.delete(t),n.O_()&&Ba(e,t),e.Ia.size===0&&(n.O_()?n.L_():ge(e)&&e.Ra.set("Unknown"))}function Ss(r,t){if(r.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}ke(r).Y_(t)}function Ba(r,t){r.Va.Ue(t),ke(r).Z_(t)}function Cs(r){r.Va=new dc({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),At:t=>r.Ia.get(t)||null,ht:()=>r.datastore.serializer.databaseId}),ke(r).start(),r.Ra.ua()}function bs(r){return ge(r)&&!ke(r).x_()&&r.Ia.size>0}function ge(r){return F(r).Ea.size===0}function za(r){r.Va=void 0}async function Eh(r){r.Ra.set("Online")}async function Ih(r){r.Ia.forEach((t,e)=>{Ss(r,t)})}async function vh(r,t){za(r),bs(r)?(r.Ra.ha(t),Cs(r)):r.Ra.set("Unknown")}async function Ah(r,t,e){if(r.Ra.set("Online"),t instanceof Pa&&t.state===2&&t.cause)try{await async function(i,o){const u=o.cause;for(const c of o.targetIds)i.Ia.has(c)&&(await i.remoteSyncer.rejectListen(c,u),i.Ia.delete(c),i.Va.removeTarget(c))}(r,t)}catch(n){D(de,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await Zn(r,n)}else if(t instanceof Bn?r.Va.Ze(t):t instanceof Va?r.Va.st(t):r.Va.tt(t),!e.isEqual(L.min()))try{const n=await Fa(r.localStore);e.compareTo(n)>=0&&await function(o,u){const c=o.Va.Tt(u);return c.targetChanges.forEach((f,d)=>{if(f.resumeToken.approximateByteSize()>0){const p=o.Ia.get(d);p&&o.Ia.set(d,p.withResumeToken(f.resumeToken,u))}}),c.targetMismatches.forEach((f,d)=>{const p=o.Ia.get(f);if(!p)return;o.Ia.set(f,p.withResumeToken(ht.EMPTY_BYTE_STRING,p.snapshotVersion)),Ba(o,f);const I=new $t(p.target,f,d,p.sequenceNumber);Ss(o,I)}),o.remoteSyncer.applyRemoteEvent(c)}(r,e)}catch(n){D(de,"Failed to raise snapshot:",n),await Zn(r,n)}}async function Zn(r,t,e){if(!Ne(t))throw t;r.Ea.add(1),await pn(r),r.Ra.set("Offline"),e||(e=()=>Fa(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{D(de,"Retrying IndexedDB access"),await e(),r.Ea.delete(1),await fr(r)})}function Ga(r,t){return t().catch(e=>Zn(r,e,t))}async function dr(r){const t=F(r),e=Jt(t);let n=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:ds;for(;wh(t);)try{const i=await ih(t.localStore,n);if(i===null){t.Ta.length===0&&e.L_();break}n=i.batchId,Rh(t,i)}catch(i){await Zn(t,i)}$a(t)&&Ka(t)}function wh(r){return ge(r)&&r.Ta.length<10}function Rh(r,t){r.Ta.push(t);const e=Jt(r);e.O_()&&e.X_&&e.ea(t.mutations)}function $a(r){return ge(r)&&!Jt(r).x_()&&r.Ta.length>0}function Ka(r){Jt(r).start()}async function Vh(r){Jt(r).ra()}async function Ph(r){const t=Jt(r);for(const e of r.Ta)t.ea(e.mutations)}async function Sh(r,t,e){const n=r.Ta.shift(),i=Es.from(n,t,e);await Ga(r,()=>r.remoteSyncer.applySuccessfulWrite(i)),await dr(r)}async function Ch(r,t){t&&Jt(r).X_&&await async function(n,i){if(function(u){return cc(u)&&u!==P.ABORTED}(i.code)){const o=n.Ta.shift();Jt(n).B_(),await Ga(n,()=>n.remoteSyncer.rejectFailedWrite(o.batchId,i)),await dr(n)}}(r,t),$a(r)&&Ka(r)}async function Po(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),D(de,"RemoteStore received new credentials");const n=ge(e);e.Ea.add(3),await pn(e),n&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await fr(e)}async function bh(r,t){const e=F(r);t?(e.Ea.delete(2),await fr(e)):t||(e.Ea.add(2),await pn(e),e.Ra.set("Unknown"))}function ke(r){return r.ma||(r.ma=function(e,n,i){const o=F(e);return o.sa(),new mh(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(r.datastore,r.asyncQueue,{Xo:Eh.bind(null,r),t_:Ih.bind(null,r),r_:vh.bind(null,r),H_:Ah.bind(null,r)}),r.da.push(async t=>{t?(r.ma.B_(),bs(r)?Cs(r):r.Ra.set("Unknown")):(await r.ma.stop(),za(r))})),r.ma}function Jt(r){return r.fa||(r.fa=function(e,n,i){const o=F(e);return o.sa(),new gh(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(r.datastore,r.asyncQueue,{Xo:()=>Promise.resolve(),t_:Vh.bind(null,r),r_:Ch.bind(null,r),ta:Ph.bind(null,r),na:Sh.bind(null,r)}),r.da.push(async t=>{t?(r.fa.B_(),await dr(r)):(await r.fa.stop(),r.Ta.length>0&&(D(de,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))})),r.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(t,e,n,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=i,this.removalCallback=o,this.deferred=new Qt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(u=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,i,o){const u=Date.now()+n,c=new Ds(t,e,u,i,o);return c.start(n),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ns(r,t){if(Lt("AsyncQueue",`${t}: ${r}`),Ne(r))return new N(P.UNAVAILABLE,`${t}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{static emptySet(t){return new Ae(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||M.comparator(e.key,n.key):(e,n)=>M.comparator(e.key,n.key),this.keyedMap=Ye(),this.sortedSet=new Y(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Ae)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new Ae;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(){this.ga=new Y(M.comparator)}track(t){const e=t.doc.key,n=this.ga.get(e);n?t.type!==0&&n.type===3?this.ga=this.ga.insert(e,t):t.type===3&&n.type!==1?this.ga=this.ga.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.ga=this.ga.remove(e):t.type===1&&n.type===2?this.ga=this.ga.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):O(63341,{Rt:t,pa:n}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal((e,n)=>{t.push(n)}),t}}class Ce{constructor(t,e,n,i,o,u,c,f,d){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=o,this.fromCache=u,this.syncStateChanged=c,this.excludesMetadataChanges=f,this.hasCachedResults=d}static fromInitialDocuments(t,e,n,i,o){const u=[];return e.forEach(c=>{u.push({type:0,doc:c})}),new Ce(t,e,Ae.emptySet(e),u,n,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&or(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==n[i].type||!e[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(t=>t.Da())}}class Nh{constructor(){this.queries=Co(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,n){const i=F(e),o=i.queries;i.queries=Co(),o.forEach((u,c)=>{for(const f of c.Sa)f.onError(n)})})(this,new N(P.ABORTED,"Firestore shutting down"))}}function Co(){return new me(r=>fa(r),or)}async function kh(r,t){const e=F(r);let n=3;const i=t.query;let o=e.queries.get(i);o?!o.ba()&&t.Da()&&(n=2):(o=new Dh,n=t.Da()?0:1);try{switch(n){case 0:o.wa=await e.onListen(i,!0);break;case 1:o.wa=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(u){const c=Ns(u,`Initialization of query '${Ee(t.query)}' failed`);return void t.onError(c)}e.queries.set(i,o),o.Sa.push(t),t.va(e.onlineState),o.wa&&t.Fa(o.wa)&&ks(e)}async function xh(r,t){const e=F(r),n=t.query;let i=3;const o=e.queries.get(n);if(o){const u=o.Sa.indexOf(t);u>=0&&(o.Sa.splice(u,1),o.Sa.length===0?i=t.Da()?0:1:!o.ba()&&t.Da()&&(i=2))}switch(i){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function Mh(r,t){const e=F(r);let n=!1;for(const i of t){const o=i.query,u=e.queries.get(o);if(u){for(const c of u.Sa)c.Fa(i)&&(n=!0);u.wa=i}}n&&ks(e)}function Oh(r,t,e){const n=F(r),i=n.queries.get(t);if(i)for(const o of i.Sa)o.onError(e);n.queries.delete(t)}function ks(r){r.Ca.forEach(t=>{t.next()})}var os,bo;(bo=os||(os={})).Ma="default",bo.Cache="cache";class Lh{constructor(t,e,n){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(t){if(!this.options.includeMetadataChanges){const n=[];for(const i of t.docChanges)i.type!==3&&n.push(i);t=new Ce(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const n=e!=="Offline";return(!this.options.qa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=Ce.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==os.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(t){this.key=t}}class Wa{constructor(t){this.key=t}}class Fh{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=j(),this.mutatedKeys=j(),this.eu=da(t),this.tu=new Ae(this.eu)}get nu(){return this.Ya}ru(t,e){const n=e?e.iu:new So,i=e?e.tu:this.tu;let o=e?e.mutatedKeys:this.mutatedKeys,u=i,c=!1;const f=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((p,I)=>{const V=i.get(p),S=ar(this.query,I)?I:null,k=!!V&&this.mutatedKeys.has(V.key),x=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let b=!1;V&&S?V.data.isEqual(S.data)?k!==x&&(n.track({type:3,doc:S}),b=!0):this.su(V,S)||(n.track({type:2,doc:S}),b=!0,(f&&this.eu(S,f)>0||d&&this.eu(S,d)<0)&&(c=!0)):!V&&S?(n.track({type:0,doc:S}),b=!0):V&&!S&&(n.track({type:1,doc:V}),b=!0,(f||d)&&(c=!0)),b&&(S?(u=u.add(S),o=x?o.add(p):o.delete(p)):(u=u.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;u.size>this.query.limit;){const p=this.query.limitType==="F"?u.last():u.first();u=u.delete(p.key),o=o.delete(p.key),n.track({type:1,doc:p})}return{tu:u,iu:n,Cs:c,mutatedKeys:o}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,i){const o=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const u=t.iu.ya();u.sort((p,I)=>function(S,k){const x=b=>{switch(b){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O(20277,{Rt:b})}};return x(S)-x(k)}(p.type,I.type)||this.eu(p.doc,I.doc)),this.ou(n),i=i??!1;const c=e&&!i?this._u():[],f=this.Xa.size===0&&this.current&&!i?1:0,d=f!==this.Za;return this.Za=f,u.length!==0||d?{snapshot:new Ce(this.query,t.tu,o,u,t.mutatedKeys,f===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new So,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=j(),this.tu.forEach(n=>{this.uu(n.key)&&(this.Xa=this.Xa.add(n.key))});const e=[];return t.forEach(n=>{this.Xa.has(n)||e.push(new Wa(n))}),this.Xa.forEach(n=>{t.has(n)||e.push(new Qa(n))}),e}cu(t){this.Ya=t.Qs,this.Xa=j();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return Ce.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const xs="SyncEngine";class Uh{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class qh{constructor(t){this.key=t,this.hu=!1}}class jh{constructor(t,e,n,i,o,u){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=u,this.Pu={},this.Tu=new me(c=>fa(c),or),this.Iu=new Map,this.Eu=new Set,this.du=new Y(M.comparator),this.Au=new Map,this.Ru=new As,this.Vu={},this.mu=new Map,this.fu=Se.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Bh(r,t,e=!0){const n=tu(r);let i;const o=n.Tu.get(t);return o?(n.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.lu()):i=await Ha(n,t,e,!0),i}async function zh(r,t){const e=tu(r);await Ha(e,t,!0,!1)}async function Ha(r,t,e,n){const i=await oh(r.localStore,Ct(t)),o=i.targetId,u=r.sharedClientState.addLocalQueryTarget(o,e);let c;return n&&(c=await Gh(r,t,o,u==="current",i.resumeToken)),r.isPrimaryClient&&e&&ja(r.remoteStore,i),c}async function Gh(r,t,e,n,i){r.pu=(I,V,S)=>async function(x,b,K,G){let Q=b.view.ru(K);Q.Cs&&(Q=await vo(x.localStore,b.query,!1).then(({documents:T})=>b.view.ru(T,Q)));const ft=G&&G.targetChanges.get(b.targetId),vt=G&&G.targetMismatches.get(b.targetId)!=null,nt=b.view.applyChanges(Q,x.isPrimaryClient,ft,vt);return No(x,b.targetId,nt.au),nt.snapshot}(r,I,V,S);const o=await vo(r.localStore,t,!0),u=new Fh(t,o.Qs),c=u.ru(o.documents),f=gn.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",i),d=u.applyChanges(c,r.isPrimaryClient,f);No(r,e,d.au);const p=new Uh(t,e,u);return r.Tu.set(t,p),r.Iu.has(e)?r.Iu.get(e).push(t):r.Iu.set(e,[t]),d.snapshot}async function $h(r,t,e){const n=F(r),i=n.Tu.get(t),o=n.Iu.get(i.targetId);if(o.length>1)return n.Iu.set(i.targetId,o.filter(u=>!or(u,t))),void n.Tu.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await ss(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),e&&Ps(n.remoteStore,i.targetId),as(n,i.targetId)}).catch(De)):(as(n,i.targetId),await ss(n.localStore,i.targetId,!0))}async function Kh(r,t){const e=F(r),n=e.Tu.get(t),i=e.Iu.get(n.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Ps(e.remoteStore,n.targetId))}async function Qh(r,t,e){const n=tf(r);try{const i=await function(u,c){const f=F(u),d=H.now(),p=c.reduce((S,k)=>S.add(k.key),j());let I,V;return f.persistence.runTransaction("Locally write mutations","readwrite",S=>{let k=Ft(),x=j();return f.Ns.getEntries(S,p).next(b=>{k=b,k.forEach((K,G)=>{G.isValidDocument()||(x=x.add(K))})}).next(()=>f.localDocuments.getOverlayedDocuments(S,k)).next(b=>{I=b;const K=[];for(const G of c){const Q=ic(G,I.get(G.key).overlayedDocument);Q!=null&&K.push(new ee(G.key,Q,ia(Q.value.mapValue),bt.exists(!0)))}return f.mutationQueue.addMutationBatch(S,d,K,c)}).next(b=>{V=b;const K=b.applyToLocalDocumentSet(I,x);return f.documentOverlayCache.saveOverlays(S,b.batchId,K)})}).then(()=>({batchId:V.batchId,changes:ga(I)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(i.batchId),function(u,c,f){let d=u.Vu[u.currentUser.toKey()];d||(d=new Y(q)),d=d.insert(c,f),u.Vu[u.currentUser.toKey()]=d}(n,i.batchId,e),await _n(n,i.changes),await dr(n.remoteStore)}catch(i){const o=Ns(i,"Failed to persist write");e.reject(o)}}async function Xa(r,t){const e=F(r);try{const n=await rh(e.localStore,t);t.targetChanges.forEach((i,o)=>{const u=e.Au.get(o);u&&(z(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?u.hu=!0:i.modifiedDocuments.size>0?z(u.hu,14607):i.removedDocuments.size>0&&(z(u.hu,42227),u.hu=!1))}),await _n(e,n,t)}catch(n){await De(n)}}function Do(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const i=[];n.Tu.forEach((o,u)=>{const c=u.view.va(t);c.snapshot&&i.push(c.snapshot)}),function(u,c){const f=F(u);f.onlineState=c;let d=!1;f.queries.forEach((p,I)=>{for(const V of I.Sa)V.va(c)&&(d=!0)}),d&&ks(f)}(n.eventManager,t),i.length&&n.Pu.H_(i),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function Wh(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const i=n.Au.get(t),o=i&&i.key;if(o){let u=new Y(M.comparator);u=u.insert(o,pt.newNoDocument(o,L.min()));const c=j().add(o),f=new cr(L.min(),new Map,new Y(q),u,c);await Xa(n,f),n.du=n.du.remove(o),n.Au.delete(t),Ms(n)}else await ss(n.localStore,t,!1).then(()=>as(n,t,e)).catch(De)}async function Hh(r,t){const e=F(r),n=t.batch.batchId;try{const i=await nh(e.localStore,t);Ja(e,n,null),Ya(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await _n(e,i)}catch(i){await De(i)}}async function Xh(r,t,e){const n=F(r);try{const i=await function(u,c){const f=F(u);return f.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return f.mutationQueue.lookupMutationBatch(d,c).next(I=>(z(I!==null,37113),p=I.keys(),f.mutationQueue.removeMutationBatch(d,I))).next(()=>f.mutationQueue.performConsistencyCheck(d)).next(()=>f.documentOverlayCache.removeOverlaysForBatchId(d,p,c)).next(()=>f.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>f.localDocuments.getDocuments(d,p))})}(n.localStore,t);Ja(n,t,e),Ya(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await _n(n,i)}catch(i){await De(i)}}function Ya(r,t){(r.mu.get(t)||[]).forEach(e=>{e.resolve()}),r.mu.delete(t)}function Ja(r,t,e){const n=F(r);let i=n.Vu[n.currentUser.toKey()];if(i){const o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),n.Vu[n.currentUser.toKey()]=i}}function as(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Iu.get(t))r.Tu.delete(n),e&&r.Pu.yu(n,e);r.Iu.delete(t),r.isPrimaryClient&&r.Ru.jr(t).forEach(n=>{r.Ru.containsKey(n)||Za(r,n)})}function Za(r,t){r.Eu.delete(t.path.canonicalString());const e=r.du.get(t);e!==null&&(Ps(r.remoteStore,e),r.du=r.du.remove(t),r.Au.delete(e),Ms(r))}function No(r,t,e){for(const n of e)n instanceof Qa?(r.Ru.addReference(n.key,t),Yh(r,n)):n instanceof Wa?(D(xs,"Document no longer in limbo: "+n.key),r.Ru.removeReference(n.key,t),r.Ru.containsKey(n.key)||Za(r,n.key)):O(19791,{wu:n})}function Yh(r,t){const e=t.key,n=e.path.canonicalString();r.du.get(e)||r.Eu.has(n)||(D(xs,"New document in limbo: "+e),r.Eu.add(n),Ms(r))}function Ms(r){for(;r.Eu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){const t=r.Eu.values().next().value;r.Eu.delete(t);const e=new M(X.fromString(t)),n=r.fu.next();r.Au.set(n,new qh(e)),r.du=r.du.insert(e,n),ja(r.remoteStore,new $t(Ct(ys(e.path)),n,"TargetPurposeLimboResolution",nr.ce))}}async function _n(r,t,e){const n=F(r),i=[],o=[],u=[];n.Tu.isEmpty()||(n.Tu.forEach((c,f)=>{u.push(n.pu(f,t,e).then(d=>{var p;if((d||e)&&n.isPrimaryClient){const I=d?!d.fromCache:(p=e==null?void 0:e.targetChanges.get(f.targetId))==null?void 0:p.current;n.sharedClientState.updateQueryState(f.targetId,I?"current":"not-current")}if(d){i.push(d);const I=Rs.As(f.targetId,d);o.push(I)}}))}),await Promise.all(u),n.Pu.H_(i),await async function(f,d){const p=F(f);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",I=>R.forEach(d,V=>R.forEach(V.Es,S=>p.persistence.referenceDelegate.addReference(I,V.targetId,S)).next(()=>R.forEach(V.ds,S=>p.persistence.referenceDelegate.removeReference(I,V.targetId,S)))))}catch(I){if(!Ne(I))throw I;D(Vs,"Failed to update sequence numbers: "+I)}for(const I of d){const V=I.targetId;if(!I.fromCache){const S=p.Ms.get(V),k=S.snapshotVersion,x=S.withLastLimboFreeSnapshotVersion(k);p.Ms=p.Ms.insert(V,x)}}}(n.localStore,o))}async function Jh(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){D(xs,"User change. New user:",t.toKey());const n=await La(e.localStore,t);e.currentUser=t,function(o,u){o.mu.forEach(c=>{c.forEach(f=>{f.reject(new N(P.CANCELLED,u))})}),o.mu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await _n(e,n.Ls)}}function Zh(r,t){const e=F(r),n=e.Au.get(t);if(n&&n.hu)return j().add(n.key);{let i=j();const o=e.Iu.get(t);if(!o)return i;for(const u of o){const c=e.Tu.get(u);i=i.unionWith(c.view.nu)}return i}}function tu(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=Xa.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Zh.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Wh.bind(null,t),t.Pu.H_=Mh.bind(null,t.eventManager),t.Pu.yu=Oh.bind(null,t.eventManager),t}function tf(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Hh.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Xh.bind(null,t),t}class tr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=hr(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return eh(this.persistence,new Jc,t.initialUser,this.serializer)}Cu(t){return new Oa(ws.mi,this.serializer)}Du(t){return new uh}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}tr.provider={build:()=>new tr};class ef extends tr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){z(this.persistence.referenceDelegate instanceof Jn,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Lc(n,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Et.withCacheSize(this.cacheSizeBytes):Et.DEFAULT;return new Oa(n=>Jn.mi(n,e),this.serializer)}}class us{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Do(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Jh.bind(null,this.syncEngine),await bh(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Nh}()}createDatastore(t){const e=hr(t.databaseInfo.databaseId),n=function(o){return new dh(o)}(t.databaseInfo);return function(o,u,c,f){return new _h(o,u,c,f)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,i,o,u,c){return new Th(n,i,o,u,c)}(this.localStore,this.datastore,t.asyncQueue,e=>Do(this.syncEngine,e,0),function(){return Ro.v()?new Ro:new lh}())}createSyncEngine(t,e){return function(i,o,u,c,f,d,p){const I=new jh(i,o,u,c,f,d);return p&&(I.gu=!0),I}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){const o=F(i);D(de,"RemoteStore shutting down."),o.Ea.add(5),await pn(o),o.Aa.shutdown(),o.Ra.set("Unknown")}(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}us.provider={build:()=>new us};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):Lt("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt="FirestoreClient";class rf{constructor(t,e,n,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=i,this.user=gt.UNAUTHENTICATED,this.clientId=hs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(n,async u=>{D(Zt,"Received user=",u.uid),await this.authCredentialListener(u),this.user=u}),this.appCheckCredentials.start(n,u=>(D(Zt,"Received new app check token=",u),this.appCheckCredentialListener(u,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Qt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Ns(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function Kr(r,t){r.asyncQueue.verifyOperationInProgress(),D(Zt,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async i=>{n.isEqual(i)||(await La(t.localStore,i),n=i)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function ko(r,t){r.asyncQueue.verifyOperationInProgress();const e=await sf(r);D(Zt,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>Po(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,i)=>Po(t.remoteStore,i)),r._onlineComponents=t}async function sf(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){D(Zt,"Using user provided OfflineComponentProvider");try{await Kr(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(e))throw e;we("Error using user provided cache. Falling back to memory cache: "+e),await Kr(r,new tr)}}else D(Zt,"Using default OfflineComponentProvider"),await Kr(r,new ef(void 0));return r._offlineComponents}async function eu(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(D(Zt,"Using user provided OnlineComponentProvider"),await ko(r,r._uninitializedComponentsProvider._online)):(D(Zt,"Using default OnlineComponentProvider"),await ko(r,new us))),r._onlineComponents}function of(r){return eu(r).then(t=>t.syncEngine)}async function af(r){const t=await eu(r),e=t.eventManager;return e.onListen=Bh.bind(null,t.syncEngine),e.onUnlisten=$h.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=zh.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Kh.bind(null,t.syncEngine),e}function uf(r,t,e={}){const n=new Qt;return r.asyncQueue.enqueueAndForget(async()=>function(o,u,c,f,d){const p=new nf({next:V=>{p.Nu(),u.enqueueAndForget(()=>xh(o,I));const S=V.docs.has(c);!S&&V.fromCache?d.reject(new N(P.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&V.fromCache&&f&&f.source==="server"?d.reject(new N(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(V)},error:V=>d.reject(V)}),I=new Lh(ys(c.path),p,{includeMetadataChanges:!0,qa:!0});return kh(o,I)}(await af(r),r.asyncQueue,t,e,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nu(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xo=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru="firestore.googleapis.com",Mo=!0;class Oo{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new N(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=ru,this.ssl=Mo}else this.host=t.host,this.ssl=t.ssl??Mo;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Ma;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Mc)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}yl("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=nu(t.experimentalLongPollingOptions??{}),function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Os{constructor(t,e,n,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Oo({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Oo(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new al;switch(n.type){case"firstParty":return new hl(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new N(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=xo.get(e);n&&(D("ComponentProvider","Removing Datastore"),xo.delete(e),n.terminate())}(this),Promise.resolve()}}function lf(r,t,e,n={}){var d;r=fe(r,Os);const i=qo(t),o=r._getSettings(),u={...o,emulatorOptions:r._getEmulatorOptions()},c=`${t}:${e}`;i&&(tl(`https://${c}`),el("Firestore",!0)),o.host!==ru&&o.host!==c&&we("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const f={...o,host:c,ssl:i,emulatorOptions:n};if(!nl(f,u)&&(r._setSettings(f),n.mockUserToken)){let p,I;if(typeof n.mockUserToken=="string")p=n.mockUserToken,I=gt.MOCK_USER;else{p=rl(n.mockUserToken,(d=r._app)==null?void 0:d.options.projectId);const V=n.mockUserToken.sub||n.mockUserToken.user_id;if(!V)throw new N(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");I=new gt(V)}r._authCredentials=new ul(new Wo(p,I))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Ls(this.firestore,t,this._query)}}class it{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new fn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new it(this.firestore,t,this._key)}toJSON(){return{type:it._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(dn(e,it._jsonSchema))return new it(t,n||null,new M(X.fromString(e.referencePath)))}}it._jsonSchemaVersion="firestore/documentReference/1.0",it._jsonSchema={type:et("string",it._jsonSchemaVersion),referencePath:et("string")};class fn extends Ls{constructor(t,e,n){super(t,e,ys(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new it(this.firestore,null,new M(t))}withConverter(t){return new fn(this.firestore,t,this._path)}}function Vf(r,t,...e){if(r=ce(r),arguments.length===1&&(t=hs.newId()),_l("doc","path",t),r instanceof Os){const n=X.fromString(t,...e);return Hi(n),new it(r,null,new M(n))}{if(!(r instanceof it||r instanceof fn))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(t,...e));return Hi(n),new it(r.firestore,r instanceof fn?r.converter:null,new M(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo="AsyncQueue";class Fo{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Ua(this,"async_queue_retry"),this._c=()=>{const n=$r();n&&D(Lo,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=t;const e=$r();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=$r();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise(()=>{});const e=new Qt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Xu.push(t),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!Ne(t))throw t;D(Lo,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(t){const e=this.ac.then(()=>(this.rc=!0,t().catch(n=>{throw this.nc=n,this.rc=!1,Lt("INTERNAL UNHANDLED ERROR: ",Uo(n)),n}).then(n=>(this.rc=!1,n))));return this.ac=e,e}enqueueAfterDelay(t,e,n){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const i=Ds.createAndSchedule(this,t,e,n,o=>this.hc(o));return this.tc.push(i),i}uc(){this.nc&&O(47125,{Pc:Uo(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then(()=>{this.tc.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()})}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function Uo(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),t}class mr extends Os{constructor(t,e,n,i){super(t,e,n,i),this.type="firestore",this._queue=new Fo,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Fo(t),this._firestoreClient=void 0,await t}}}function Pf(r,t){const e=typeof r=="object"?r:Yu(),n=typeof r=="string"?r:$n,i=Ju(e,"firestore").getImmediate({identifier:n});if(!i._initialized){const o=Zu("firestore");o&&lf(i,...o)}return i}function su(r){if(r._terminated)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||cf(r),r._firestoreClient}function cf(r){var n,i,o;const t=r._freezeSettings(),e=function(c,f,d,p){return new Cl(c,f,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,nu(p.experimentalLongPollingOptions),p.useFetchStreams,p.isUsingEmulator)}(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,t);r._componentsProvider||(i=t.localCache)!=null&&i._offlineComponentProvider&&((o=t.localCache)!=null&&o._onlineComponentProvider)&&(r._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),r._firestoreClient=new rf(r._authCredentials,r._appCheckCredentials,r._queue,e,r._componentsProvider&&function(c){const f=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(f),_online:f}}(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Rt(ht.fromBase64String(t))}catch(e){throw new N(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Rt(ht.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Rt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(dn(t,Rt._jsonSchema))return Rt.fromBase64String(t.bytes)}}Rt._jsonSchemaVersion="firestore/bytes/1.0",Rt._jsonSchema={type:et("string",Rt._jsonSchemaVersion),bytes:et("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new N(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ct(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new N(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new N(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return q(this._lat,t._lat)||q(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Nt._jsonSchemaVersion}}static fromJSON(t){if(dn(t,Nt._jsonSchema))return new Nt(t.latitude,t.longitude)}}Nt._jsonSchemaVersion="firestore/geoPoint/1.0",Nt._jsonSchema={type:et("string",Nt._jsonSchemaVersion),latitude:et("number"),longitude:et("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,i){if(n.length!==i.length)return!1;for(let o=0;o<n.length;++o)if(n[o]!==i[o])return!1;return!0}(this._values,t._values)}toJSON(){return{type:kt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(dn(t,kt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new kt(t.vectorValues);throw new N(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}kt._jsonSchemaVersion="firestore/vectorValue/1.0",kt._jsonSchema={type:et("string",kt._jsonSchemaVersion),vectorValues:et("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hf=/^__.*__$/;class ff{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new ee(t,this.data,this.fieldMask,e,this.fieldTransforms):new mn(t,this.data,e,this.fieldTransforms)}}class iu{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new ee(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function ou(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{Ac:r})}}class Us{constructor(t,e,n,i,o,u){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=i,o===void 0&&this.Rc(),this.fieldTransforms=o||[],this.fieldMask=u||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new Us({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){var i;const e=(i=this.path)==null?void 0:i.child(t),n=this.Vc({path:e,fc:!1});return n.gc(t),n}yc(t){var i;const e=(i=this.path)==null?void 0:i.child(t),n=this.Vc({path:e,fc:!1});return n.Rc(),n}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return er(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(ou(this.Ac)&&hf.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class df{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||hr(t)}Cc(t,e,n,i=!1){return new Us({Ac:t,methodName:e,Dc:n,path:ct.emptyPath(),fc:!1,bc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function au(r){const t=r._freezeSettings(),e=hr(r._databaseId);return new df(r._databaseId,!!t.ignoreUndefinedProperties,e)}function mf(r,t,e,n,i,o={}){const u=r.Cc(o.merge||o.mergeFields?2:0,t,e,i);qs("Data must be an object, but it was:",u,n);const c=uu(n,u);let f,d;if(o.merge)f=new wt(u.fieldMask),d=u.fieldTransforms;else if(o.mergeFields){const p=[];for(const I of o.mergeFields){const V=ls(t,I,e);if(!u.contains(V))throw new N(P.INVALID_ARGUMENT,`Field '${V}' is specified in your field mask but missing from your input data.`);cu(p,V)||p.push(V)}f=new wt(p),d=u.fieldTransforms.filter(I=>f.covers(I.field))}else f=null,d=u.fieldTransforms;return new ff(new It(c),f,d)}class pr extends Fs{_toFieldTransform(t){if(t.Ac!==2)throw t.Ac===1?t.Sc(`${this._methodName}() can only appear at the top level of your update data`):t.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof pr}}function gf(r,t,e,n){const i=r.Cc(1,t,e);qs("Data must be an object, but it was:",i,n);const o=[],u=It.empty();te(n,(f,d)=>{const p=js(t,f,e);d=ce(d);const I=i.yc(p);if(d instanceof pr)o.push(p);else{const V=_r(d,I);V!=null&&(o.push(p),u.set(p,V))}});const c=new wt(o);return new iu(u,c,i.fieldTransforms)}function pf(r,t,e,n,i,o){const u=r.Cc(1,t,e),c=[ls(t,n,e)],f=[i];if(o.length%2!=0)throw new N(P.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let V=0;V<o.length;V+=2)c.push(ls(t,o[V])),f.push(o[V+1]);const d=[],p=It.empty();for(let V=c.length-1;V>=0;--V)if(!cu(d,c[V])){const S=c[V];let k=f[V];k=ce(k);const x=u.yc(S);if(k instanceof pr)d.push(S);else{const b=_r(k,x);b!=null&&(d.push(S),p.set(S,b))}}const I=new wt(d);return new iu(p,I,u.fieldTransforms)}function _r(r,t){if(lu(r=ce(r)))return qs("Unsupported field value:",t,r),uu(r,t);if(r instanceof Fs)return function(n,i){if(!ou(i.Ac))throw i.Sc(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Sc(`${n._methodName}() is not currently supported inside arrays`);const o=n._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return function(n,i){const o=[];let u=0;for(const c of n){let f=_r(c,i.wc(u));f==null&&(f={nullValue:"NULL_VALUE"}),o.push(f),u++}return{arrayValue:{values:o}}}(r,t)}return function(n,i){if((n=ce(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Zl(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const o=H.fromDate(n);return{timestampValue:Yn(i.serializer,o)}}if(n instanceof H){const o=new H(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Yn(i.serializer,o)}}if(n instanceof Nt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Rt)return{bytesValue:Sa(i.serializer,n._byteString)};if(n instanceof it){const o=i.databaseId,u=n.firestore._databaseId;if(!u.isEqual(o))throw i.Sc(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:vs(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof kt)return function(u,c){return{mapValue:{fields:{[ra]:{stringValue:sa},[Kn]:{arrayValue:{values:u.toArray().map(d=>{if(typeof d!="number")throw c.Sc("VectorValues must only contain numeric values.");return Ts(c.serializer,d)})}}}}}}(n,i);throw i.Sc(`Unsupported field value: ${fs(n)}`)}(r,t)}function uu(r,t){const e={};return Yo(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):te(r,(n,i)=>{const o=_r(i,t.mc(n));o!=null&&(e[n]=o)}),{mapValue:{fields:e}}}function lu(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof H||r instanceof Nt||r instanceof Rt||r instanceof it||r instanceof Fs||r instanceof kt)}function qs(r,t,e){if(!lu(e)||!Ho(e)){const n=fs(e);throw n==="an object"?t.Sc(r+" a custom object"):t.Sc(r+" "+n)}}function ls(r,t,e){if((t=ce(t))instanceof gr)return t._internalPath;if(typeof t=="string")return js(r,t);throw er("Field path arguments must be of type string or ",r,!1,void 0,e)}const _f=new RegExp("[~\\*/\\[\\]]");function js(r,t,e){if(t.search(_f)>=0)throw er(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new gr(...t.split("."))._internalPath}catch{throw er(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function er(r,t,e,n,i){const o=n&&!n.isEmpty(),u=i!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let f="";return(o||u)&&(f+=" (found",o&&(f+=` in field ${n}`),u&&(f+=` in document ${i}`),f+=")"),new N(P.INVALID_ARGUMENT,c+r+f)}function cu(r,t){return r.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(t,e,n,i,o){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new it(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new yf(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(fu("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class yf extends hu{data(){return super.data()}}function fu(r,t){return typeof t=="string"?js(r,t):t instanceof gr?t._internalPath:t._delegate._internalPath}class Tf{convertValue(t,e="none"){switch(Yt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Z(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Xt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw O(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return te(t,(i,o)=>{n[i]=this.convertValue(o,e)}),n}convertVectorValue(t){var n,i,o;const e=(o=(i=(n=t.fields)==null?void 0:n[Kn].arrayValue)==null?void 0:i.values)==null?void 0:o.map(u=>Z(u.doubleValue));return new kt(e)}convertGeoPoint(t){return new Nt(Z(t.latitude),Z(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=sr(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(an(t));default:return null}}convertTimestamp(t){const e=Ht(t);return new H(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=X.fromString(t);z(xa(n),9688,{name:t});const i=new un(n.get(1),n.get(3)),o=new M(n.popFirst(5));return i.isEqual(e)||Lt(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ef(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}class Ze{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class le extends hu{constructor(t,e,n,i,o,u){super(t,e,n,i,u),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new zn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(fu("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=le._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}le._jsonSchemaVersion="firestore/documentSnapshot/1.0",le._jsonSchema={type:et("string",le._jsonSchemaVersion),bundleSource:et("string","DocumentSnapshot"),bundleName:et("string"),bundle:et("string")};class zn extends le{data(t={}){return super.data(t)}}class sn{constructor(t,e,n,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new Ze(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new zn(this._firestore,this._userDataWriter,n.key,n,new Ze(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new N(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let u=0;return i._snapshot.docChanges.map(c=>{const f=new zn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Ze(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:f,oldIndex:-1,newIndex:u++}})}{let u=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>o||c.type!==3).map(c=>{const f=new zn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Ze(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,p=-1;return c.type!==0&&(d=u.indexOf(c.doc.key),u=u.delete(c.doc.key)),c.type!==1&&(u=u.add(c.doc),p=u.indexOf(c.doc.key)),{type:If(c.type),doc:f,oldIndex:d,newIndex:p}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=sn._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=hs.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],n=[],i=[];return this.docs.forEach(o=>{o._document!==null&&(e.push(o._document),n.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function If(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O(61501,{type:r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sf(r){r=fe(r,it);const t=fe(r.firestore,mr);return uf(su(t),r._key).then(e=>Af(t,r,e))}sn._jsonSchemaVersion="firestore/querySnapshot/1.0",sn._jsonSchema={type:et("string",sn._jsonSchemaVersion),bundleSource:et("string","QuerySnapshot"),bundleName:et("string"),bundle:et("string")};class vf extends Tf{constructor(t){super(),this.firestore=t}convertBytes(t){return new Rt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new it(this.firestore,null,e)}}function Cf(r,t,e){r=fe(r,it);const n=fe(r.firestore,mr),i=Ef(r.converter,t,e);return du(n,[mf(au(n),"setDoc",r._key,i,r.converter!==null,e).toMutation(r._key,bt.none())])}function bf(r,t,e,...n){r=fe(r,it);const i=fe(r.firestore,mr),o=au(i);let u;return u=typeof(t=ce(t))=="string"||t instanceof gr?pf(o,"updateDoc",r._key,t,e,n):gf(o,"updateDoc",r._key,t),du(i,[u.toMutation(r._key,bt.exists(!0))])}function du(r,t){return function(n,i){const o=new Qt;return n.asyncQueue.enqueueAndForget(async()=>Qh(await of(n),i,o)),o.promise}(su(r),t)}function Af(r,t,e){const n=e.docs.get(t._key),i=new vf(r);return new le(r,i,t._key,n,new Ze(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){(function(i){be=i})(ol),Qu(new Wu("firestore",(n,{instanceIdentifier:i,options:o})=>{const u=n.getProvider("app").getImmediate(),c=new mr(new ll(n.getProvider("auth-internal")),new fl(u,n.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new N(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new un(d.options.projectId,p)}(u,i),u);return o={useFetchStreams:e,...o},c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),zi($i,Ki,t),zi($i,Ki,"esm2020")})();export{H as T,Sf as a,lf as c,Vf as d,Pf as g,Cf as s,bf as u};
