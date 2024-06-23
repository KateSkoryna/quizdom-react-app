import{j as t,L as x,r as d,u as p,O as j}from"./index-D67BVwrx.js";import{N as k,a as C}from"./NavbarComponent-9LbiOwqA.js";import{C as v}from"./Card-CxsbtrBJ.js";import{N as c}from"./Nav-YmEJBAdK.js";import{C as b,a as f}from"./Col-CqiWpbRJ.js";import{F as g,a as N,b as y}from"./index-Bo0GEc-O.js";import{M as L}from"./index-CtAWsjYZ.js";import{L as E}from"./Loader-BI1PLYBQ.js";import"./divWithClassName-Bhcbn9v1.js";import"./Nav-BPWB2oVf.js";import"./Collapse-LHBwlP4g.js";import"./store-Cka-TZOi.js";import"./Row-D-qHeeS6.js";const _="_footerContainer_jt50v_1",B="_footerNavbar_jt50v_12",F="_footerContactNavbar_jt50v_25",S="_footerLink_jt50v_37",w="_footerContactLink_jt50v_52",I="_footerIcon_jt50v_63",n={footerContainer:_,footerNavbar:B,footerContactNavbar:F,footerLink:S,footerContactLink:w,footerIcon:I},A=()=>t.jsx(k,{expand:"lg","data-bs-theme":"dark",fixed:"bottom",className:n.footerNavbar,children:t.jsxs(b,{className:n.footerContainer,children:[t.jsx(c.Link,{as:x,to:"/",className:n.footerLink,children:"About us"}),t.jsxs(c,{className:n.footerContactNavbar,children:[t.jsx(f,{xs:3,sm:3,md:3,children:t.jsx(c.Link,{href:"https://www.linkedin.com/in/kateskoryna/",target:"_blank",className:n.footerContactLink,children:t.jsx(g,{className:n.footerIcon})})}),t.jsx(f,{xs:3,sm:3,md:3,children:t.jsx(c.Link,{href:"https://github.com/kateskoryna",target:"_blank",className:n.footerContactLink,children:t.jsx(N,{className:n.footerIcon})})}),t.jsx(f,{xs:3,sm:3,md:3,children:t.jsx(c.Link,{href:"tel:+4916099814255",target:"_blank",className:n.footerContactLink,children:t.jsx(y,{className:n.footerIcon})})}),t.jsx(f,{xs:3,sm:3,md:3,children:t.jsx(c.Link,{href:"mailto:k.skoryna@gmail.com",target:"_blank",className:n.footerContactLink,children:t.jsx(L,{className:n.footerIcon})})})]}),t.jsx(v.Text,{children:"Copyright © 2024 by Kate Skoryna."})]})}),K=d.createContext(null),h={didCatch:!1,error:null};class D extends d.Component{constructor(r){super(r),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=h}static getDerivedStateFromError(r){return{didCatch:!0,error:r}}resetErrorBoundary(){const{error:r}=this.state;if(r!==null){for(var o,e,a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];(o=(e=this.props).onReset)===null||o===void 0||o.call(e,{args:i,reason:"imperative-api"}),this.setState(h)}}componentDidCatch(r,o){var e,a;(e=(a=this.props).onError)===null||e===void 0||e.call(a,r,o)}componentDidUpdate(r,o){const{didCatch:e}=this.state,{resetKeys:a}=this.props;if(e&&o.error!==null&&O(r.resetKeys,a)){var i,s;(i=(s=this.props).onReset)===null||i===void 0||i.call(s,{next:a,prev:r.resetKeys,reason:"keys"}),this.setState(h)}}render(){const{children:r,fallbackRender:o,FallbackComponent:e,fallback:a}=this.props,{didCatch:i,error:s}=this.state;let m=r;if(i){const u={error:s,resetErrorBoundary:this.resetErrorBoundary};if(typeof o=="function")m=o(u);else if(e)m=d.createElement(e,u);else if(a===null||d.isValidElement(a))m=a;else throw s}return d.createElement(K.Provider,{value:{didCatch:i,error:s,resetErrorBoundary:this.resetErrorBoundary}},m)}}function O(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return l.length!==r.length||l.some((o,e)=>!Object.is(o,r[e]))}const T=({error:l,resetErrorBoundary:r})=>t.jsxs("div",{role:"alert",children:[t.jsx("p",{children:"Something went wrong:"}),t.jsx("pre",{children:l.message}),t.jsx("button",{onClick:r,children:"Try again"})]});function Y(){const l=p();return t.jsx(D,{FallbackComponent:T,onReset:()=>l("/"),children:t.jsxs(d.Suspense,{fallback:t.jsx(E,{}),children:[t.jsx(C,{}),t.jsx(j,{}),t.jsx(A,{})]})})}export{Y as default};