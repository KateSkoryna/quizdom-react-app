import{j as e,p as B,r as h,o as b,q as v,v as S}from"./index-BPU7orE-.js";import{B as x,C as _,a as w}from"./Col-CWrLX2gs.js";import{b as T}from"./index-CZFQwnhA.js";import{C as c}from"./Card-B2xE3kpQ.js";import{D as L,N as E}from"./const-D5FJm90l.js";import{R as I}from"./Row-c6mdeXMe.js";import{N as u}from"./Nav-DJ4EgKC0.js";import{F as g,a as F}from"./Form-BbMiW6v-.js";import{L as D}from"./Loader-gT5cWjw_.js";import"./divWithClassName-Cv2Mr4HC.js";import"./types-CjFR5xU4.js";const P="_newsContainer_1ghpc_1",R={newsContainer:P},k="_cardBody_1pu7h_1",q="_cardText_1pu7h_5",A="_cardBtn_1pu7h_9",M="_cardImg_1pu7h_27",m={cardBody:k,cardText:q,cardBtn:A,cardImg:M},p=(r,s)=>r.length>s?r.slice(0,s)+"...":r,$=({image:r,title:s,description:a,url:t})=>e.jsxs(c,{className:"h-100",children:[e.jsx(T.LazyLoadImage,{src:r,className:m.cardImg,alt:s}),e.jsxs(c.Body,{className:m.cardBody,children:[e.jsx(c.Title,{className:"mb-4",children:p(s,64)}),e.jsx(c.Text,{className:m.cardText,children:a})]}),e.jsx(c.Footer,{children:e.jsx(x,{href:t,target:"_blank",className:m.cardBtn,children:"Read More"})})]}),G=({news:r})=>e.jsx(_,{className:R.newsContainer,children:e.jsx(I,{className:"g-3",children:r.map(({id:s,title:a,image:t,description:o,url:l})=>e.jsx(w,{xs:12,sm:6,md:4,lg:3,children:e.jsx($,{image:t??L,title:a,description:o?p(o,90):"No description available",url:l})},s))})}),O="_formContainer_1gsui_1",z="_searchNavbar_1gsui_7",Q="_searchBtn_1gsui_16",U="_categoryBtn_1gsui_16",W="_error_1gsui_35",i={formContainer:O,searchNavbar:z,searchBtn:Q,categoryBtn:U,error:W},Y={query:"",category:""},H=({categories:r})=>{const[s,a]=B(Y),[t,o]=h.useState(s.get("query")??""),[l,f]=h.useState(s.get("category")??""),[j,d]=h.useState(!1);function N(n){if(n.preventDefault(),!t){o(""),d(!0);return}l?(d(!1),a({query:t,category:l})):(d(!1),a({query:t}))}function C(n){f(n),o(""),a({category:n})}const y=n=>{o(n.target.value)};return e.jsxs(_,{className:i.formContainer,children:[e.jsxs(g,{onSubmit:N,className:"mb-4",children:[e.jsxs("div",{className:"d-flex justify-content-center",children:[e.jsx(F,{type:"search",placeholder:"Search",className:"me-2 w-75","aria-label":"Search",value:t||"",onChange:y}),e.jsx(x,{className:i.searchBtn,type:"submit",children:"Search"})]}),j&&e.jsx(g.Text,{className:i.error,children:"Please enter a search term"})]}),e.jsx(u,{className:i.searchNavbar,children:r.map(n=>e.jsx(u.Item,{children:e.jsx(u.Link,{as:x,onClick:()=>C(n),className:i.categoryBtn,children:n})},n))})]})};function J(){const r=["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];let s=[];for(let a=0;a<36;a++)a===8||a===13||a===18||a===23?s[a]="-":s[a]=r[Math.ceil(Math.random()*r.length-1)];return s.join("")}var K=J;const V=b(K),le=()=>{const r=v(),a=S().map(o=>({...o,id:V()})),t=Object.values(E);return e.jsxs(e.Fragment,{children:[e.jsx(H,{categories:t}),r.state==="loading"?e.jsx(D,{}):e.jsx(G,{news:a})]})};export{le as default};
