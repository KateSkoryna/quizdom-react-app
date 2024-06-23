import{r as o,j as e,u as te,L as P,a as O,w as R,x as se,Q as re,C as ne,y as oe,z as ae}from"./index-D67BVwrx.js";import{C as b}from"./Card-CxsbtrBJ.js";import{b as ce,c as ie}from"./index-CtAWsjYZ.js";import{B as z,C as G}from"./Col-CqiWpbRJ.js";import{M as f,A as le}from"./AddQuizComponent-C15elg9Y.js";import{u as de}from"./store-Cka-TZOi.js";import{u as H,c as Y}from"./divWithClassName-Bhcbn9v1.js";import{a as ue,m as he,b as me,u as xe,B as fe}from"./Nav-BPWB2oVf.js";import{t as D}from"./truncateString-DL5WhCmR.js";import{F as V}from"./Form-D3OJ5HJM.js";import{L as je}from"./Loader-BI1PLYBQ.js";import"./index-Bo0GEc-O.js";import"./index.esm-lPE540Tm.js";import"./addClassnameToText-B6CJtSOF.js";const W=o.forwardRef(({bsPrefix:r,active:n,disabled:t,eventKey:s,className:a,variant:x,action:j,as:d,...c},h)=>{r=H(r,"list-group-item");const[i,l]=ue({key:he(s,c.href),active:n,...c}),S=me(C=>{if(t){C.preventDefault(),C.stopPropagation();return}i.onClick(C)});t&&c.tabIndex===void 0&&(c.tabIndex=-1,c["aria-disabled"]=!0);const B=d||(j?c.href?"a":"button":"div");return e.jsx(B,{ref:h,...c,...i,onClick:S,className:Y(a,r,l.isActive&&"active",t&&"disabled",x&&`${r}-${x}`,j&&`${r}-action`)})});W.displayName="ListGroupItem";const K=o.forwardRef((r,n)=>{const{className:t,bsPrefix:s,variant:a,horizontal:x,numbered:j,as:d="div",...c}=xe(r,{activeKey:"onSelect"}),h=H(s,"list-group");let i;return x&&(i=x===!0?"horizontal":`horizontal-${x}`),e.jsx(fe,{ref:n,...c,as:d,className:Y(t,h,a&&`${h}-${a}`,i&&`${h}-${i}`,j&&`${h}-numbered`)})});K.displayName="ListGroup";const U=Object.assign(K,{Item:W}),pe="_cardBody_h0hdy_1",ge="_favoriteIcon_h0hdy_6",ye="_itemSmalltext_h0hdy_13",_e="_buttonContainer_h0hdy_24",Ce="_quizDescription_h0hdy_35",ve="_checkbox_h0hdy_41",Ne="_checkboxIconWrapper_h0hdy_53",be="_checkboxIcon_h0hdy_53",k={cardBody:pe,favoriteIcon:ge,itemSmalltext:ye,buttonContainer:_e,quizDescription:Ce,checkbox:ve,checkboxIconWrapper:Ne,checkboxIcon:be},Se="_isCorrect_5ax60_1",ke="_isFalse_5ax60_5",ze="_questionTitle_5ax60_9",Be="_resultText_5ax60_13",Ie="_resultBody_5ax60_29",_={isCorrect:Se,isFalse:ke,questionTitle:ze,resultText:Be,resultBody:Ie},we="_text_1vgqp_1",Le="_container_1vgqp_9",Te="_textContainer_1vgqp_14",$={text:we,container:Le,textContainer:Te},Qe="/quizdom-react-app/assets/owl-BK7XFAYT.svg",Fe="_img_zx0y2_1",$e={img:Fe},X=()=>e.jsx(b.Img,{src:Qe,className:$e.img}),Z=({text:r})=>{const n=te(),t=de(a=>a.setActive),s=a=>{t(a),n(a)};return e.jsxs("div",{className:$.container,children:[e.jsx("div",{className:$.textContainer,children:e.jsxs("p",{className:$.text,children:["Please"," ",e.jsx(P,{to:"/login",className:"text-primary",onClick:()=>s("login"),children:"log in"})," ","or"," ",e.jsx(P,{to:"/signup",className:"text-primary",onClick:()=>s("signup"),children:"sign up"})," ","to ",r,"."]})}),e.jsx(X,{})]})},Oe=({show:r,handleClose:n,questions:t})=>{const[s,a]=o.useState(0),[x,j]=o.useState(t[s]),[d,c]=o.useState(t[s].answers),[h,i]=o.useState(!1),[l,S]=o.useState(0),[B,C]=o.useState(!1),T=o.useRef(null),g=o.useRef(null),w=o.useRef(null),Q=o.useRef(null),u=[T,g,w,Q],I=(m,y)=>{h||(y?(m.currentTarget.classList.add(_.isCorrect),i(!0),S(p=>p+1)):(m.currentTarget.classList.add(_.isFalse),i(!0),d.forEach((p,v)=>{var N,A,E;(N=u[v])!=null&&N.current&&p.isCorrect&&((E=(A=u[v])==null?void 0:A.current)==null||E.classList.add(_.isCorrect))})))},F=()=>{if(h){if(s===t.length-1)return C(!0),0;a(m=>m+1),j(t[s+1]),c(t[s+1].answers),i(!1),d.forEach((m,y)=>{var p,v,N;(p=u[y])!=null&&p.current&&m.isCorrect&&((N=(v=u[y])==null?void 0:v.current)==null||N.classList.remove(_.isCorrect))})}},J=()=>{a(m=>m-1),j(t[s-1]),c(t[s-1].answers),i(!1),d.forEach((m,y)=>{var p,v,N;(p=u[y])!=null&&p.current&&m.isCorrect&&((N=(v=u[y])==null?void 0:v.current)==null||N.classList.remove(_.isCorrect))})},ee=()=>{a(0),j(t[0]),c(t[0].answers),i(!1),S(0),C(!1)},{currentUser:M}=O();return e.jsx(f,{show:r,onHide:n,fullscreen:"md-down",centered:!0,children:B?e.jsxs(e.Fragment,{children:[e.jsx(f.Header,{closeButton:!0,children:e.jsx(f.Title,{as:"h5",children:M?"Quiz Results":"Sorry! You havn't logged in yet"})}),e.jsx(f.Body,{className:_.resultBody,children:M?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:_.resultText,children:[e.jsx("h5",{className:"text-center mb-1",children:"Thank you for taking the quiz!"}),e.jsxs("h5",{className:"mb-2",children:["Your score is ",l," out of ",t.length]}),e.jsxs("h6",{children:["Correct answers:"," ",(l/t.length*100).toFixed(1),"%"]})]}),e.jsx(X,{}),e.jsx(z,{onClick:ee,className:_.button,children:"Reset Quiz"})]}):e.jsx(Z,{text:"see your results"})})]}):e.jsxs(e.Fragment,{children:[e.jsx(f.Header,{closeButton:!0,children:e.jsxs(f.Title,{children:["Question ",s+1]})}),e.jsxs(f.Body,{children:[e.jsx("h5",{className:_.questionTitle,children:x.questionTitle}),e.jsx(U,{children:d.map((m,y)=>e.jsx(U.Item,{ref:u[y],as:"li",className:"d-flex justify-content-between align-items-start",onClick:p=>I(p,m.isCorrect),children:e.jsx("div",{className:"ms-2 me-auto",children:e.jsx("div",{className:"fw-bold",children:m.answer})})},m.answer))})]}),e.jsxs(f.Footer,{className:"d-flex justify-content-center",children:[e.jsx(z,{variant:"secondary",disabled:s===0,onClick:J,children:"Previous Question"}),e.jsx(z,{onClick:F,variant:"primary",children:"Next Question"}),e.jsxs("h6",{children:["Total Questions: ",s+1," of ",t.length]})]})]})})},Me=({handleModal:r})=>{const n=()=>{r()};return e.jsx(b.Link,{onClick:n,as:z,children:"Start Quiz"})};function Ae({handleClose:r,show:n}){return e.jsxs(f,{show:n,onHide:r,centered:!0,children:[e.jsx(f.Header,{closeButton:!0,children:e.jsx(f.Title,{as:"h5",className:"text-center",children:"Sorry!"})}),e.jsx(f.Body,{children:e.jsx(Z,{text:"add this quiz to your collection"})}),e.jsx(f.Footer,{children:e.jsx(z,{onClick:r,children:"Close"})})]})}const Ee=({quiz:{title:r,complexity:n,description:t,id:s,authorName:a,publishedAt:x,questions:j}})=>{const[d,c]=o.useState(!1),[h,i]=o.useState(!1),[l,S]=o.useState(!1),B=()=>c(!1),C=()=>c(!0),T=()=>S(!1),{currentUser:g,setCurrentUser:w}=O(),Q=async u=>{if(!g){S(!0);return}if(!u.target.checked){await R(u.target.id,g.id,"remove"),i(!1),w(I=>({...I??{},favorites:g.favorites.filter(F=>F!==u.target.id)}));return}await R(u.target.id,g.id,"add"),i(!0),w(I=>({...I??{},favorites:[...g.favorites,u.target.id]}))};return o.useEffect(()=>{g&&g.favorites.includes(s)&&i(!0)},[]),e.jsxs(b.Body,{className:k.cardBody,children:[e.jsx("div",{className:k.checkbox,children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:h,onChange:u=>Q(u),id:s}),h?e.jsx(ce,{className:k.favoriteIcon,style:{fill:"#F7941D"}}):e.jsx(ie,{className:k.favoriteIcon,style:{fill:"gray"}})]})}),e.jsx(b.Title,{children:D(r,40)}),e.jsx(b.Subtitle,{className:"mb-2 text-muted",children:n}),e.jsx(b.Text,{className:k.quizDescription,children:D(t,80)}),e.jsxs("div",{className:k.buttonContainer,children:[e.jsx(Me,{handleModal:C}),e.jsx(b.Link,{as:z,children:"Share Quiz"})]}),e.jsxs("small",{className:k.itemSmalltext,children:["Published on: ",x.toLocaleDateString()," by ",a]}),d&&e.jsx(Oe,{show:d,handleClose:B,questions:j}),l&&e.jsx(Ae,{handleClose:T,show:l})]})},Pe=({quizes:r})=>e.jsx(G,{style:{paddingBottom:"80px",marginTop:"20px"},children:r.map(n=>e.jsx(b,{style:{width:"100%",marginBottom:"10px"},children:e.jsx(Ee,{quiz:n})},n.id))}),Re="_container_clstf_1",De="_form_clstf_7",Ue="_button_clstf_19",qe="_error_clstf_29",L={container:Re,form:De,button:Ue,error:qe},Ge="_selectCategory_13j12_1",He={selectCategory:Ge},q=({fields:r,fieldsName:n,handleChange:t})=>e.jsxs(V.Select,{className:He.selectCategory,onChange:s=>t(s.target.value),defaultValue:`Open ${n} menu`,children:[e.jsx("option",{children:`Open ${n} menu`}),r.map(s=>e.jsx("option",{value:s,children:s},s))]}),Ye=Object.values(re),Ve=Object.values(ne),We={category:"",complexity:""},Ke=()=>{const[r,n]=se(We),[t,s]=o.useState(r.get("category")??""),[a,x]=o.useState(r.get("complexity")??""),[j,d]=o.useState(!1),c=l=>{if(l.preventDefault(),!t&&!a){d(!0);return}n({category:t,complexity:a})},h=l=>{if(console.log(l),l==="Open category menu"){s("");return}d(!1),s(l)},i=l=>{if(console.log(l),l==="Open complexity menu"){x("");return}d(!1),x(l)};return e.jsxs(G,{className:L.container,children:[e.jsxs(V,{className:L.form,onSubmit:c,children:[e.jsx(q,{fields:Ye,fieldsName:"category",handleChange:h}),e.jsx(q,{fields:Ve,fieldsName:"complexity",handleChange:i}),e.jsx(z,{className:L.button,type:"submit",children:"Search"})]}),j&&e.jsx("p",{className:L.error,children:"Please select search query"})]})},ut=()=>{const r=oe(),n=ae(),{currentUser:t}=O();return e.jsxs(e.Fragment,{children:[e.jsx(Ke,{}),t&&e.jsx(le,{}),r.state==="loading"?e.jsx(je,{}):e.jsx(Pe,{quizes:n})]})};export{ut as default};