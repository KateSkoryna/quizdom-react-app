import{r as n,j as e,u as ee,L as P,a as $,w as R,x as te,Q as se,C as re,y as oe,z as ne}from"./index-BiwfSnap.js";import{C as S}from"./Card-C5RQdl5v.js";import{b as ae,c as ce}from"./index-CxV3peLD.js";import{B as z,C as H}from"./Col-CLRlfTq3.js";import{M as f,A as ie}from"./AddQuizComponent-CDwyozRS.js";import{u as le}from"./store-CLxaMtUl.js";import{u as q,c as V}from"./divWithClassName-BcIW11IM.js";import{a as de,m as ue,b as he,u as me,B as xe}from"./Nav-IIAOjJMK.js";import{t as D}from"./truncateString-DL5WhCmR.js";import{F as W}from"./Form-D53LAkfT.js";import{L as fe}from"./Loader-B4Jtl-eR.js";import"./index-BE1UDgO2.js";import"./index.esm-BCBsu9yA.js";import"./addClassnameToText-eR8-lbPq.js";const Y=n.forwardRef(({bsPrefix:r,active:o,disabled:t,eventKey:s,className:a,variant:x,action:j,as:d,...c},h)=>{r=q(r,"list-group-item");const[i,l]=de({key:ue(s,c.href),active:o,...c}),b=he(_=>{if(t){_.preventDefault(),_.stopPropagation();return}i.onClick(_)});t&&c.tabIndex===void 0&&(c.tabIndex=-1,c["aria-disabled"]=!0);const B=d||(j?c.href?"a":"button":"div");return e.jsx(B,{ref:h,...c,...i,onClick:b,className:V(a,r,l.isActive&&"active",t&&"disabled",x&&`${r}-${x}`,j&&`${r}-action`)})});Y.displayName="ListGroupItem";const K=n.forwardRef((r,o)=>{const{className:t,bsPrefix:s,variant:a,horizontal:x,numbered:j,as:d="div",...c}=me(r,{activeKey:"onSelect"}),h=q(s,"list-group");let i;return x&&(i=x===!0?"horizontal":`horizontal-${x}`),e.jsx(xe,{ref:o,...c,as:d,className:V(t,h,a&&`${h}-${a}`,i&&`${h}-${i}`,j&&`${h}-numbered`)})});K.displayName="ListGroup";const U=Object.assign(K,{Item:Y}),je="_cardBody_h0hdy_1",pe="_favoriteIcon_h0hdy_6",ye="_itemSmalltext_h0hdy_13",ge="_buttonContainer_h0hdy_24",_e="_quizDescription_h0hdy_35",Ce="_checkbox_h0hdy_41",ve="_checkboxIconWrapper_h0hdy_53",Ne="_checkboxIcon_h0hdy_53",k={cardBody:je,favoriteIcon:pe,itemSmalltext:ye,buttonContainer:ge,quizDescription:_e,checkbox:Ce,checkboxIconWrapper:ve,checkboxIcon:Ne},Se="_isCorrect_399oe_1",be="_isFalse_399oe_5",ke="_questionTitle_399oe_9",ze="_resultBody_399oe_13",N={isCorrect:Se,isFalse:be,questionTitle:ke,resultBody:ze},Be="_text_tnxaf_1",Ie="_img_tnxaf_7",Le="_container_tnxaf_12",we="_textContainer_tnxaf_17",w={text:Be,img:Ie,container:Le,textContainer:we},Qe="/quizdom-react-app/assets/owl-BjTy1AKO.svg",X=({text:r})=>{const o=ee(),t=le(a=>a.setActive),s=a=>{t(a),o(a)};return e.jsxs("div",{className:w.container,children:[e.jsx("div",{className:w.textContainer,children:e.jsxs("p",{className:w.text,children:["Please"," ",e.jsx(P,{to:"/login",className:"text-primary",onClick:()=>s("login"),children:"log in"})," ","or"," ",e.jsx(P,{to:"/signup",className:"text-primary",onClick:()=>s("signup"),children:"sign up"})," ","to ",r,"."]})}),e.jsx(S.Img,{src:Qe,className:w.img})]})},Fe=({show:r,handleClose:o,questions:t})=>{const[s,a]=n.useState(0),[x,j]=n.useState(t[s]),[d,c]=n.useState(t[s].answers),[h,i]=n.useState(!1),[l,b]=n.useState(0),[B,_]=n.useState(!1),F=n.useRef(null),y=n.useRef(null),L=n.useRef(null),T=n.useRef(null),u=[F,y,L,T],I=(m,g)=>{h||(g?(m.currentTarget.classList.add(N.isCorrect),i(!0),b(p=>p+1)):(m.currentTarget.classList.add(N.isFalse),i(!0),d.forEach((p,C)=>{var v,A,E;(v=u[C])!=null&&v.current&&p.isCorrect&&((E=(A=u[C])==null?void 0:A.current)==null||E.classList.add(N.isCorrect))})))},O=()=>{if(h){if(s===t.length-1)return _(!0),0;a(m=>m+1),j(t[s+1]),c(t[s+1].answers),i(!1),d.forEach((m,g)=>{var p,C,v;(p=u[g])!=null&&p.current&&m.isCorrect&&((v=(C=u[g])==null?void 0:C.current)==null||v.classList.remove(N.isCorrect))})}},Z=()=>{a(m=>m-1),j(t[s-1]),c(t[s-1].answers),i(!1),d.forEach((m,g)=>{var p,C,v;(p=u[g])!=null&&p.current&&m.isCorrect&&((v=(C=u[g])==null?void 0:C.current)==null||v.classList.remove(N.isCorrect))})},J=()=>{a(0),j(t[0]),c(t[0].answers),i(!1),b(0),_(!1)},{currentUser:M}=$();return e.jsx(f,{show:r,onHide:o,fullscreen:"md-down",centered:!0,children:B?e.jsxs(e.Fragment,{children:[e.jsx(f.Header,{closeButton:!0,children:e.jsx(f.Title,{as:"h5",children:M?"Quiz Results":"Sorry! You havn't logged in yet"})}),e.jsx(f.Body,{className:N.resultBody,children:M?e.jsxs(e.Fragment,{children:[e.jsxs("h5",{children:["Your score is ",l," out of ",t.length]}),e.jsxs("h6",{children:["Correct answers:"," ",(l/t.length*100).toFixed(1),"%"]}),e.jsx("h5",{children:"Thank you for taking the quiz!"}),e.jsx(z,{onClick:J,className:N.button,children:"Reset Quiz"})]}):e.jsx(X,{text:"see your results"})})]}):e.jsxs(e.Fragment,{children:[e.jsx(f.Header,{closeButton:!0,children:e.jsxs(f.Title,{children:["Question ",s+1]})}),e.jsxs(f.Body,{children:[e.jsx("h5",{className:N.questionTitle,children:x.questionTitle}),e.jsx(U,{children:d.map((m,g)=>e.jsx(U.Item,{ref:u[g],as:"li",className:"d-flex justify-content-between align-items-start",onClick:p=>I(p,m.isCorrect),children:e.jsx("div",{className:"ms-2 me-auto",children:e.jsx("div",{className:"fw-bold",children:m.answer})})},m.answer))})]}),e.jsxs(f.Footer,{className:"d-flex justify-content-center",children:[e.jsx(z,{variant:"secondary",disabled:s===0,onClick:Z,children:"Previous Question"}),e.jsx(z,{onClick:O,variant:"primary",children:"Next Question"}),e.jsxs("h6",{children:["Total Questions: ",s+1," of ",t.length]})]})]})})},Te=({handleModal:r})=>{const o=()=>{r()};return e.jsx(S.Link,{onClick:o,as:z,children:"Start Quiz"})};function Oe({handleClose:r,show:o}){return e.jsxs(f,{show:o,onHide:r,centered:!0,children:[e.jsx(f.Header,{closeButton:!0,children:e.jsx(f.Title,{as:"h5",className:"text-center",children:"Sorry!"})}),e.jsx(f.Body,{children:e.jsx(X,{text:"add this quiz to your collection"})}),e.jsx(f.Footer,{children:e.jsx(z,{onClick:r,children:"Close"})})]})}const $e=({quiz:{title:r,complexity:o,description:t,id:s,authorName:a,publishedAt:x,questions:j}})=>{const[d,c]=n.useState(!1),[h,i]=n.useState(!1),[l,b]=n.useState(!1),B=()=>c(!1),_=()=>c(!0),F=()=>b(!1),{currentUser:y,setCurrentUser:L}=$(),T=async u=>{if(!y){b(!0);return}if(!u.target.checked){await R(u.target.id,y.id,"remove"),i(!1),L(I=>({...I??{},favorites:y.favorites.filter(O=>O!==u.target.id)}));return}await R(u.target.id,y.id,"add"),i(!0),L(I=>({...I??{},favorites:[...y.favorites,u.target.id]}))};return n.useEffect(()=>{y&&y.favorites.includes(s)&&i(!0)},[]),e.jsxs(S.Body,{className:k.cardBody,children:[e.jsx("div",{className:k.checkbox,children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:h,onChange:u=>T(u),id:s}),h?e.jsx(ae,{className:k.favoriteIcon,style:{fill:"#F7941D"}}):e.jsx(ce,{className:k.favoriteIcon,style:{fill:"gray"}})]})}),e.jsx(S.Title,{children:D(r,40)}),e.jsx(S.Subtitle,{className:"mb-2 text-muted",children:o}),e.jsx(S.Text,{className:k.quizDescription,children:D(t,80)}),e.jsxs("div",{className:k.buttonContainer,children:[e.jsx(Te,{handleModal:_}),e.jsx(S.Link,{as:z,children:"Share Quiz"})]}),e.jsxs("small",{className:k.itemSmalltext,children:["Published on: ",x.toLocaleDateString()," by ",a]}),d&&e.jsx(Fe,{show:d,handleClose:B,questions:j}),l&&e.jsx(Oe,{handleClose:F,show:l})]})},Me=({quizes:r})=>e.jsx(H,{style:{paddingBottom:"80px",marginTop:"20px"},children:r.map(o=>e.jsx(S,{style:{width:"100%",marginBottom:"10px"},children:e.jsx($e,{quiz:o})},o.id))}),Ae="_container_clstf_1",Ee="_form_clstf_7",Pe="_button_clstf_19",Re="_error_clstf_29",Q={container:Ae,form:Ee,button:Pe,error:Re},De="_selectCategory_13j12_1",Ue={selectCategory:De},G=({fields:r,fieldsName:o,handleChange:t})=>e.jsxs(W.Select,{className:Ue.selectCategory,onChange:s=>t(s.target.value),defaultValue:`Open ${o} menu`,children:[e.jsx("option",{children:`Open ${o} menu`}),r.map(s=>e.jsx("option",{value:s,children:s},s))]}),Ge=Object.values(se),He=Object.values(re),qe={category:"",complexity:""},Ve=()=>{const[r,o]=te(qe),[t,s]=n.useState(r.get("category")??""),[a,x]=n.useState(r.get("complexity")??""),[j,d]=n.useState(!1),c=l=>{if(l.preventDefault(),!t&&!a){d(!0);return}o({category:t,complexity:a})},h=l=>{if(console.log(l),l==="Open category menu"){s("");return}d(!1),s(l)},i=l=>{if(console.log(l),l==="Open complexity menu"){x("");return}d(!1),x(l)};return e.jsxs(H,{className:Q.container,children:[e.jsxs(W,{className:Q.form,onSubmit:c,children:[e.jsx(G,{fields:Ge,fieldsName:"category",handleChange:h}),e.jsx(G,{fields:He,fieldsName:"complexity",handleChange:i}),e.jsx(z,{className:Q.button,type:"submit",children:"Search"})]}),j&&e.jsx("p",{className:Q.error,children:"Please select search query"})]})},it=()=>{const r=oe(),o=ne(),{currentUser:t}=$();return e.jsxs(e.Fragment,{children:[e.jsx(Ve,{}),t&&e.jsx(ie,{}),r.state==="loading"?e.jsx(fe,{}):e.jsx(Me,{quizes:o})]})};export{it as default};
