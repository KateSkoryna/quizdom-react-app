import{r as Ce,c as Me}from"./index-DyhLML9L.js";var Le={exports:{}};(()=>{var _e={296:(h,b,a)=>{var re=/^\s+|\s+$/g,A=/^[-+]0x[0-9a-f]+$/i,Z=/^0b[01]+$/i,m=/^0o[0-7]+$/i,V=parseInt,ee=typeof a.g=="object"&&a.g&&a.g.Object===Object&&a.g,ce=typeof self=="object"&&self&&self.Object===Object&&self,oe=ee||ce||Function("return this")(),ne=Object.prototype.toString,te=Math.max,ae=Math.min,G=function(){return oe.Date.now()};function Y(d){var P=typeof d;return!!d&&(P=="object"||P=="function")}function ie(d){if(typeof d=="number")return d;if(function(f){return typeof f=="symbol"||function(j){return!!j&&typeof j=="object"}(f)&&ne.call(f)=="[object Symbol]"}(d))return NaN;if(Y(d)){var P=typeof d.valueOf=="function"?d.valueOf():d;d=Y(P)?P+"":P}if(typeof d!="string")return d===0?d:+d;d=d.replace(re,"");var W=Z.test(d);return W||m.test(d)?V(d.slice(2),W?2:8):A.test(d)?NaN:+d}h.exports=function(d,P,W){var f,j,k,T,S,z,D=0,F=!1,$=!1,X=!0;if(typeof d!="function")throw new TypeError("Expected a function");function q(_){var I=f,M=j;return f=j=void 0,D=_,T=d.apply(M,I)}function J(_){var I=_-z;return z===void 0||I>=P||I<0||$&&_-D>=k}function x(){var _=G();if(J(_))return H(_);S=setTimeout(x,function(I){var M=P-(I-z);return $?ae(M,k-(I-D)):M}(_))}function H(_){return S=void 0,X&&f?q(_):(f=j=void 0,T)}function C(){var _=G(),I=J(_);if(f=arguments,j=this,z=_,I){if(S===void 0)return function(M){return D=M,S=setTimeout(x,P),F?q(M):T}(z);if($)return S=setTimeout(x,P),q(z)}return S===void 0&&(S=setTimeout(x,P)),T}return P=ie(P)||0,Y(W)&&(F=!!W.leading,k=($="maxWait"in W)?te(ie(W.maxWait)||0,P):k,X="trailing"in W?!!W.trailing:X),C.cancel=function(){S!==void 0&&clearTimeout(S),D=0,f=z=j=S=void 0},C.flush=function(){return S===void 0?T:H(G())},C}},96:(h,b,a)=>{var re="Expected a function",A=NaN,Z="[object Symbol]",m=/^\s+|\s+$/g,V=/^[-+]0x[0-9a-f]+$/i,ee=/^0b[01]+$/i,ce=/^0o[0-7]+$/i,oe=parseInt,ne=typeof a.g=="object"&&a.g&&a.g.Object===Object&&a.g,te=typeof self=="object"&&self&&self.Object===Object&&self,ae=ne||te||Function("return this")(),G=Object.prototype.toString,Y=Math.max,ie=Math.min,d=function(){return ae.Date.now()};function P(f){var j=typeof f;return!!f&&(j=="object"||j=="function")}function W(f){if(typeof f=="number")return f;if(function(T){return typeof T=="symbol"||function(S){return!!S&&typeof S=="object"}(T)&&G.call(T)==Z}(f))return A;if(P(f)){var j=typeof f.valueOf=="function"?f.valueOf():f;f=P(j)?j+"":j}if(typeof f!="string")return f===0?f:+f;f=f.replace(m,"");var k=ee.test(f);return k||ce.test(f)?oe(f.slice(2),k?2:8):V.test(f)?A:+f}h.exports=function(f,j,k){var T=!0,S=!0;if(typeof f!="function")throw new TypeError(re);return P(k)&&(T="leading"in k?!!k.leading:T,S="trailing"in k?!!k.trailing:S),function(z,D,F){var $,X,q,J,x,H,C=0,_=!1,I=!1,M=!0;if(typeof z!="function")throw new TypeError(re);function pe(N){var U=$,Q=X;return $=X=void 0,C=N,J=z.apply(Q,U)}function ye(N){var U=N-H;return H===void 0||U>=D||U<0||I&&N-C>=q}function K(){var N=d();if(ye(N))return be(N);x=setTimeout(K,function(U){var Q=D-(U-H);return I?ie(Q,q-(U-C)):Q}(N))}function be(N){return x=void 0,M&&$?pe(N):($=X=void 0,J)}function ue(){var N=d(),U=ye(N);if($=arguments,X=this,H=N,U){if(x===void 0)return function(Q){return C=Q,x=setTimeout(K,D),_?pe(Q):J}(H);if(I)return x=setTimeout(K,D),pe(H)}return x===void 0&&(x=setTimeout(K,D)),J}return D=W(D)||0,P(F)&&(_=!!F.leading,q=(I="maxWait"in F)?Y(W(F.maxWait)||0,D):q,M="trailing"in F?!!F.trailing:M),ue.cancel=function(){x!==void 0&&clearTimeout(x),C=0,$=H=X=x=void 0},ue.flush=function(){return x===void 0?J:be(d())},ue}(f,j,{leading:T,maxWait:j,trailing:S})}},703:(h,b,a)=>{var re=a(414);function A(){}function Z(){}Z.resetWarningCache=A,h.exports=function(){function m(ce,oe,ne,te,ae,G){if(G!==re){var Y=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw Y.name="Invariant Violation",Y}}function V(){return m}m.isRequired=m;var ee={array:m,bigint:m,bool:m,func:m,number:m,object:m,string:m,symbol:m,any:m,arrayOf:V,element:m,elementType:m,instanceOf:V,node:m,objectOf:V,oneOf:V,oneOfType:V,shape:V,exact:V,checkPropTypes:Z,resetWarningCache:A};return ee.PropTypes=ee,ee}},697:(h,b,a)=>{h.exports=a(703)()},414:h=>{h.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},we={};function L(h){var b=we[h];if(b!==void 0)return b.exports;var a=we[h]={exports:{}};return _e[h](a,a.exports,L),a.exports}L.n=h=>{var b=h&&h.__esModule?()=>h.default:()=>h;return L.d(b,{a:b}),b},L.d=(h,b)=>{for(var a in b)L.o(b,a)&&!L.o(h,a)&&Object.defineProperty(h,a,{enumerable:!0,get:b[a]})},L.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),L.o=(h,b)=>Object.prototype.hasOwnProperty.call(h,b),L.r=h=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(h,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(h,"__esModule",{value:!0})};var me={};(()=>{L.r(me),L.d(me,{LazyLoadComponent:()=>Pe,LazyLoadImage:()=>De,trackWindowScroll:()=>H});const h=Ce;var b=L.n(h),a=L(697);const re=Me;var A=L.n(re);function Z(){return typeof window<"u"&&"IntersectionObserver"in window&&"isIntersecting"in window.IntersectionObserverEntry.prototype}function m(n){return m=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(n)}function V(n,e){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(l){return Object.getOwnPropertyDescriptor(n,l).enumerable})),o.push.apply(o,i)}return o}function ee(n,e,o){return(e=oe(e))in n?Object.defineProperty(n,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[e]=o,n}function ce(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,oe(i.key),i)}}function oe(n){var e=function(o,i){if(m(o)!=="object"||o===null)return o;var l=o[Symbol.toPrimitive];if(l!==void 0){var p=l.call(o,"string");if(m(p)!=="object")return p;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(n);return m(e)==="symbol"?e:String(e)}function ne(n,e){return ne=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,i){return o.__proto__=i,o},ne(n,e)}function te(n){return te=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},te(n)}var ae=function(n){n.forEach(function(e){e.isIntersecting&&e.target.onVisible()})},G={},Y=function(n){(function(t,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),r&&ne(t,r)})(v,n);var e,o,i,l,p=(i=v,l=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,r=te(i);if(l){var c=te(this).constructor;t=Reflect.construct(r,arguments,c)}else t=r.apply(this,arguments);return function(s,u){if(u&&(m(u)==="object"||typeof u=="function"))return u;if(u!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return function(y){if(y===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return y}(s)}(this,t)});function v(t){var r;if(function(s,u){if(!(s instanceof u))throw new TypeError("Cannot call a class as a function")}(this,v),(r=p.call(this,t)).supportsObserver=!t.scrollPosition&&t.useIntersectionObserver&&Z(),r.supportsObserver){var c=t.threshold;r.observer=function(s){return G[s]=G[s]||new IntersectionObserver(ae,{rootMargin:s+"px"}),G[s]}(c)}return r}return e=v,o=[{key:"componentDidMount",value:function(){this.placeholder&&this.observer&&(this.placeholder.onVisible=this.props.onVisible,this.observer.observe(this.placeholder)),this.supportsObserver||this.updateVisibility()}},{key:"componentWillUnmount",value:function(){this.observer&&this.placeholder&&this.observer.unobserve(this.placeholder)}},{key:"componentDidUpdate",value:function(){this.supportsObserver||this.updateVisibility()}},{key:"getPlaceholderBoundingBox",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.props.scrollPosition,r=this.placeholder.getBoundingClientRect(),c=A().findDOMNode(this.placeholder).style,s=parseInt(c.getPropertyValue("margin-left"),10)||0,u=parseInt(c.getPropertyValue("margin-top"),10)||0;return{bottom:t.y+r.bottom+u,left:t.x+r.left+s,right:t.x+r.right+s,top:t.y+r.top+u}}},{key:"isPlaceholderInViewport",value:function(){if(typeof window>"u"||!this.placeholder)return!1;var t=this.props,r=t.scrollPosition,c=t.threshold,s=this.getPlaceholderBoundingBox(r),u=r.y+window.innerHeight,y=r.x,O=r.x+window.innerWidth,w=r.y;return w-c<=s.bottom&&u+c>=s.top&&y-c<=s.right&&O+c>=s.left}},{key:"updateVisibility",value:function(){this.isPlaceholderInViewport()&&this.props.onVisible()}},{key:"render",value:function(){var t=this,r=this.props,c=r.className,s=r.height,u=r.placeholder,y=r.style,O=r.width;if(u&&typeof u.type!="function")return b().cloneElement(u,{ref:function(g){return t.placeholder=g}});var w=function(g){for(var R=1;R<arguments.length;R++){var E=arguments[R]!=null?arguments[R]:{};R%2?V(Object(E),!0).forEach(function(B){ee(g,B,E[B])}):Object.getOwnPropertyDescriptors?Object.defineProperties(g,Object.getOwnPropertyDescriptors(E)):V(Object(E)).forEach(function(B){Object.defineProperty(g,B,Object.getOwnPropertyDescriptor(E,B))})}return g}({display:"inline-block"},y);return O!==void 0&&(w.width=O),s!==void 0&&(w.height=s),b().createElement("span",{className:c,ref:function(g){return t.placeholder=g},style:w},u)}}],o&&ce(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),v}(b().Component);Y.propTypes={onVisible:a.PropTypes.func.isRequired,className:a.PropTypes.string,height:a.PropTypes.oneOfType([a.PropTypes.number,a.PropTypes.string]),placeholder:a.PropTypes.element,threshold:a.PropTypes.number,useIntersectionObserver:a.PropTypes.bool,scrollPosition:a.PropTypes.shape({x:a.PropTypes.number.isRequired,y:a.PropTypes.number.isRequired}),width:a.PropTypes.oneOfType([a.PropTypes.number,a.PropTypes.string])},Y.defaultProps={className:"",placeholder:null,threshold:100,useIntersectionObserver:!0};const ie=Y;var d=L(296),P=L.n(d),W=L(96),f=L.n(W),j=function(n){var e=getComputedStyle(n,null);return e.getPropertyValue("overflow")+e.getPropertyValue("overflow-y")+e.getPropertyValue("overflow-x")};const k=function(n){if(!(n instanceof HTMLElement))return window;for(var e=n;e&&e instanceof HTMLElement;){if(/(scroll|auto)/.test(j(e)))return e;e=e.parentNode}return window};function T(n){return T=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},T(n)}var S=["delayMethod","delayTime"];function z(){return z=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(n[i]=o[i])}return n},z.apply(this,arguments)}function D(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,(l=function(p,v){if(T(p)!=="object"||p===null)return p;var t=p[Symbol.toPrimitive];if(t!==void 0){var r=t.call(p,"string");if(T(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),T(l)==="symbol"?l:String(l)),i)}var l}function F(n,e){return F=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,i){return o.__proto__=i,o},F(n,e)}function $(n,e){if(e&&(T(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return X(n)}function X(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function q(n){return q=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},q(n)}var J=function(){return typeof window>"u"?0:window.scrollX||window.pageXOffset},x=function(){return typeof window>"u"?0:window.scrollY||window.pageYOffset};const H=function(n){var e=function(o){(function(c,s){if(typeof s!="function"&&s!==null)throw new TypeError("Super expression must either be null or a function");c.prototype=Object.create(s&&s.prototype,{constructor:{value:c,writable:!0,configurable:!0}}),Object.defineProperty(c,"prototype",{writable:!1}),s&&F(c,s)})(r,o);var i,l,p,v,t=(p=r,v=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var c,s=q(p);if(v){var u=q(this).constructor;c=Reflect.construct(s,arguments,u)}else c=s.apply(this,arguments);return $(this,c)});function r(c){var s;if(function(y,O){if(!(y instanceof O))throw new TypeError("Cannot call a class as a function")}(this,r),(s=t.call(this,c)).useIntersectionObserver=c.useIntersectionObserver&&Z(),s.useIntersectionObserver)return $(s);var u=s.onChangeScroll.bind(X(s));return c.delayMethod==="debounce"?s.delayedScroll=P()(u,c.delayTime):c.delayMethod==="throttle"&&(s.delayedScroll=f()(u,c.delayTime)),s.state={scrollPosition:{x:J(),y:x()}},s.baseComponentRef=b().createRef(),s}return i=r,(l=[{key:"componentDidMount",value:function(){this.addListeners()}},{key:"componentWillUnmount",value:function(){this.removeListeners()}},{key:"componentDidUpdate",value:function(){typeof window>"u"||this.useIntersectionObserver||k(A().findDOMNode(this.baseComponentRef.current))!==this.scrollElement&&(this.removeListeners(),this.addListeners())}},{key:"addListeners",value:function(){typeof window>"u"||this.useIntersectionObserver||(this.scrollElement=k(A().findDOMNode(this.baseComponentRef.current)),this.scrollElement.addEventListener("scroll",this.delayedScroll,{passive:!0}),window.addEventListener("resize",this.delayedScroll,{passive:!0}),this.scrollElement!==window&&window.addEventListener("scroll",this.delayedScroll,{passive:!0}))}},{key:"removeListeners",value:function(){typeof window>"u"||this.useIntersectionObserver||(this.scrollElement.removeEventListener("scroll",this.delayedScroll),window.removeEventListener("resize",this.delayedScroll),this.scrollElement!==window&&window.removeEventListener("scroll",this.delayedScroll))}},{key:"onChangeScroll",value:function(){this.useIntersectionObserver||this.setState({scrollPosition:{x:J(),y:x()}})}},{key:"render",value:function(){var c=this.props,s=(c.delayMethod,c.delayTime,function(y,O){if(y==null)return{};var w,g,R=function(B,fe){if(B==null)return{};var se,ve,Ee={},xe=Object.keys(B);for(ve=0;ve<xe.length;ve++)se=xe[ve],fe.indexOf(se)>=0||(Ee[se]=B[se]);return Ee}(y,O);if(Object.getOwnPropertySymbols){var E=Object.getOwnPropertySymbols(y);for(g=0;g<E.length;g++)w=E[g],O.indexOf(w)>=0||Object.prototype.propertyIsEnumerable.call(y,w)&&(R[w]=y[w])}return R}(c,S)),u=this.useIntersectionObserver?null:this.state.scrollPosition;return b().createElement(n,z({forwardRef:this.baseComponentRef,scrollPosition:u},s))}}])&&D(i.prototype,l),Object.defineProperty(i,"prototype",{writable:!1}),r}(b().Component);return e.propTypes={delayMethod:a.PropTypes.oneOf(["debounce","throttle"]),delayTime:a.PropTypes.number,useIntersectionObserver:a.PropTypes.bool},e.defaultProps={delayMethod:"throttle",delayTime:300,useIntersectionObserver:!0},e};function C(n){return C=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(n)}function _(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,(l=function(p,v){if(C(p)!=="object"||p===null)return p;var t=p[Symbol.toPrimitive];if(t!==void 0){var r=t.call(p,"string");if(C(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),C(l)==="symbol"?l:String(l)),i)}var l}function I(n,e){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,i){return o.__proto__=i,o},I(n,e)}function M(n){return M=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},M(n)}var pe=function(n){(function(t,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),r&&I(t,r)})(v,n);var e,o,i,l,p=(i=v,l=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,r=M(i);if(l){var c=M(this).constructor;t=Reflect.construct(r,arguments,c)}else t=r.apply(this,arguments);return function(s,u){if(u&&(C(u)==="object"||typeof u=="function"))return u;if(u!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return function(y){if(y===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return y}(s)}(this,t)});function v(t){return function(r,c){if(!(r instanceof c))throw new TypeError("Cannot call a class as a function")}(this,v),p.call(this,t)}return e=v,(o=[{key:"render",value:function(){return b().createElement(ie,this.props)}}])&&_(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),v}(b().Component);const ye=H(pe);function K(n){return K=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},K(n)}function be(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,(l=function(p,v){if(K(p)!=="object"||p===null)return p;var t=p[Symbol.toPrimitive];if(t!==void 0){var r=t.call(p,"string");if(K(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),K(l)==="symbol"?l:String(l)),i)}var l}function ue(n,e){return ue=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,i){return o.__proto__=i,o},ue(n,e)}function N(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function U(n){return U=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},U(n)}var Q=function(n){(function(t,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),r&&ue(t,r)})(v,n);var e,o,i,l,p=(i=v,l=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,r=U(i);if(l){var c=U(this).constructor;t=Reflect.construct(r,arguments,c)}else t=r.apply(this,arguments);return function(s,u){if(u&&(K(u)==="object"||typeof u=="function"))return u;if(u!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return N(s)}(this,t)});function v(t){var r;(function(O,w){if(!(O instanceof w))throw new TypeError("Cannot call a class as a function")})(this,v),r=p.call(this,t);var c=t.afterLoad,s=t.beforeLoad,u=t.scrollPosition,y=t.visibleByDefault;return r.state={visible:y},y&&(s(),c()),r.onVisible=r.onVisible.bind(N(r)),r.isScrollTracked=!!(u&&Number.isFinite(u.x)&&u.x>=0&&Number.isFinite(u.y)&&u.y>=0),r}return e=v,(o=[{key:"componentDidUpdate",value:function(t,r){r.visible!==this.state.visible&&this.props.afterLoad()}},{key:"onVisible",value:function(){this.props.beforeLoad(),this.setState({visible:!0})}},{key:"render",value:function(){if(this.state.visible)return this.props.children;var t=this.props,r=t.className,c=t.delayMethod,s=t.delayTime,u=t.height,y=t.placeholder,O=t.scrollPosition,w=t.style,g=t.threshold,R=t.useIntersectionObserver,E=t.width;return this.isScrollTracked||R&&Z()?b().createElement(ie,{className:r,height:u,onVisible:this.onVisible,placeholder:y,scrollPosition:O,style:w,threshold:g,useIntersectionObserver:R,width:E}):b().createElement(ye,{className:r,delayMethod:c,delayTime:s,height:u,onVisible:this.onVisible,placeholder:y,style:w,threshold:g,width:E})}}])&&be(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),v}(b().Component);Q.propTypes={afterLoad:a.PropTypes.func,beforeLoad:a.PropTypes.func,useIntersectionObserver:a.PropTypes.bool,visibleByDefault:a.PropTypes.bool},Q.defaultProps={afterLoad:function(){return{}},beforeLoad:function(){return{}},useIntersectionObserver:!0,visibleByDefault:!1};const Pe=Q;function le(n){return le=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},le(n)}var Ie=["afterLoad","beforeLoad","delayMethod","delayTime","effect","placeholder","placeholderSrc","scrollPosition","threshold","useIntersectionObserver","visibleByDefault","wrapperClassName","wrapperProps"];function je(n,e){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(l){return Object.getOwnPropertyDescriptor(n,l).enumerable})),o.push.apply(o,i)}return o}function Te(n){for(var e=1;e<arguments.length;e++){var o=arguments[e]!=null?arguments[e]:{};e%2?je(Object(o),!0).forEach(function(i){Re(n,i,o[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):je(Object(o)).forEach(function(i){Object.defineProperty(n,i,Object.getOwnPropertyDescriptor(o,i))})}return n}function Re(n,e,o){return(e=Se(e))in n?Object.defineProperty(n,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[e]=o,n}function de(){return de=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(n[i]=o[i])}return n},de.apply(this,arguments)}function ke(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,Se(i.key),i)}}function Se(n){var e=function(o,i){if(le(o)!=="object"||o===null)return o;var l=o[Symbol.toPrimitive];if(l!==void 0){var p=l.call(o,"string");if(le(p)!=="object")return p;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(n);return le(e)==="symbol"?e:String(e)}function ge(n,e){return ge=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,i){return o.__proto__=i,o},ge(n,e)}function he(n){return he=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},he(n)}var Oe=function(n){(function(t,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),r&&ge(t,r)})(v,n);var e,o,i,l,p=(i=v,l=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}(),function(){var t,r=he(i);if(l){var c=he(this).constructor;t=Reflect.construct(r,arguments,c)}else t=r.apply(this,arguments);return function(s,u){if(u&&(le(u)==="object"||typeof u=="function"))return u;if(u!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return function(y){if(y===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return y}(s)}(this,t)});function v(t){var r;return function(c,s){if(!(c instanceof s))throw new TypeError("Cannot call a class as a function")}(this,v),(r=p.call(this,t)).state={loaded:!1},r}return e=v,(o=[{key:"onImageLoad",value:function(){var t=this;return this.state.loaded?null:function(r){t.props.onLoad(r),t.props.afterLoad(),t.setState({loaded:!0})}}},{key:"getImg",value:function(){var t=this.props,r=(t.afterLoad,t.beforeLoad,t.delayMethod,t.delayTime,t.effect,t.placeholder,t.placeholderSrc,t.scrollPosition,t.threshold,t.useIntersectionObserver,t.visibleByDefault,t.wrapperClassName,t.wrapperProps,function(c,s){if(c==null)return{};var u,y,O=function(g,R){if(g==null)return{};var E,B,fe={},se=Object.keys(g);for(B=0;B<se.length;B++)E=se[B],R.indexOf(E)>=0||(fe[E]=g[E]);return fe}(c,s);if(Object.getOwnPropertySymbols){var w=Object.getOwnPropertySymbols(c);for(y=0;y<w.length;y++)u=w[y],s.indexOf(u)>=0||Object.prototype.propertyIsEnumerable.call(c,u)&&(O[u]=c[u])}return O}(t,Ie));return b().createElement("img",de({},r,{onLoad:this.onImageLoad()}))}},{key:"getLazyLoadImage",value:function(){var t=this.props,r=t.beforeLoad,c=t.className,s=t.delayMethod,u=t.delayTime,y=t.height,O=t.placeholder,w=t.scrollPosition,g=t.style,R=t.threshold,E=t.useIntersectionObserver,B=t.visibleByDefault,fe=t.width;return b().createElement(Pe,{beforeLoad:r,className:c,delayMethod:s,delayTime:u,height:y,placeholder:O,scrollPosition:w,style:g,threshold:R,useIntersectionObserver:E,visibleByDefault:B,width:fe},this.getImg())}},{key:"getWrappedLazyLoadImage",value:function(t){var r=this.props,c=r.effect,s=r.height,u=r.placeholderSrc,y=r.width,O=r.wrapperClassName,w=r.wrapperProps,g=this.state.loaded,R=g?" lazy-load-image-loaded":"",E=g||!u?{}:{backgroundImage:"url(".concat(u,")"),backgroundSize:"100% 100%"};return b().createElement("span",de({className:O+" lazy-load-image-background "+c+R,style:Te(Te({},E),{},{color:"transparent",display:"inline-block",height:s,width:y})},w),t)}},{key:"render",value:function(){var t=this.props,r=t.effect,c=t.placeholderSrc,s=t.visibleByDefault,u=t.wrapperClassName,y=t.wrapperProps,O=this.getLazyLoadImage();return(r||c)&&!s||u||y?this.getWrappedLazyLoadImage(O):O}}])&&ke(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),v}(b().Component);Oe.propTypes={onLoad:a.PropTypes.func,afterLoad:a.PropTypes.func,beforeLoad:a.PropTypes.func,delayMethod:a.PropTypes.string,delayTime:a.PropTypes.number,effect:a.PropTypes.string,placeholderSrc:a.PropTypes.string,threshold:a.PropTypes.number,useIntersectionObserver:a.PropTypes.bool,visibleByDefault:a.PropTypes.bool,wrapperClassName:a.PropTypes.string,wrapperProps:a.PropTypes.object},Oe.defaultProps={onLoad:function(){},afterLoad:function(){return{}},beforeLoad:function(){return{}},delayMethod:"throttle",delayTime:300,effect:"",placeholderSrc:null,threshold:100,useIntersectionObserver:!0,visibleByDefault:!1,wrapperClassName:""};const De=Oe})(),Le.exports=me})();var Be=Le.exports;export{Be as b};
