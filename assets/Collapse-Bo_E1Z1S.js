import{c as D}from"./divWithClassName-DKmMyEm9.js";import{T as j,f as v,s as h,m as G,h as L,E as A,i as B,n as F}from"./store-C-hXBDCb.js";import{R as d,r as l,j as O}from"./index-D4l3LmLo.js";function i(...s){return s.filter(n=>n!=null).reduce((n,o)=>{if(typeof o!="function")throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");return n===null?o:function(...a){n.apply(this,a),o.apply(this,a)}},null)}const S={height:["marginTop","marginBottom"],width:["marginLeft","marginRight"]};function U(s,n){const o=`offset${s[0].toUpperCase()}${s.slice(1)}`,r=n[o],a=S[s];return r+parseInt(h(n,a[0]),10)+parseInt(h(n,a[1]),10)}const X={[G]:"collapse",[L]:"collapsing",[A]:"collapsing",[B]:"collapse show"},k=d.forwardRef(({onEnter:s,onEntering:n,onEntered:o,onExit:r,onExiting:a,className:g,children:c,dimension:u="height",in:f=!1,timeout:y=300,mountOnEnter:x=!1,unmountOnExit:R=!1,appear:w=!1,getDimensionValue:E=U,...m},I)=>{const t=typeof u=="function"?u():u,N=l.useMemo(()=>i(e=>{e.style[t]="0"},s),[t,s]),T=l.useMemo(()=>i(e=>{const p=`scroll${t[0].toUpperCase()}${t.slice(1)}`;e.style[t]=`${e[p]}px`},n),[t,n]),M=l.useMemo(()=>i(e=>{e.style[t]=null},o),[t,o]),$=l.useMemo(()=>i(e=>{e.style[t]=`${E(t,e)}px`,F(e)},r),[r,E,t]),C=l.useMemo(()=>i(e=>{e.style[t]=null},a),[t,a]);return O.jsx(j,{ref:I,addEndListener:v,...m,"aria-expanded":m.role?f:null,onEnter:N,onEntering:T,onEntered:M,onExit:$,onExiting:C,childRef:c.ref,in:f,timeout:y,mountOnEnter:x,unmountOnExit:R,appear:w,children:(e,p)=>d.cloneElement(c,{...p,className:D(g,c.props.className,X[e],t==="width"&&"collapse-horizontal")})})});export{k as C};