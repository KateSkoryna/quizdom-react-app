import{r as c,j as e,a as P,w as $,x as q,y as K,z as X}from"./index-DVMSeiYB.js";import{C as v}from"./Card-0DUduEZc.js";import{b as Z,c as J}from"./index-DiyFhgLi.js";import{B as I,C as R}from"./Col-CaX8Wqt1.js";import{M as b,A as ee}from"./AddQuizComponent-cqXm1GuF.js";import{u as A,c as D}from"./divWithClassName-CVTPLJfu.js";import{a as te,m as se,b as re,u as ne,B as oe}from"./types-uafdVdf3.js";import{Q as ae,C as ce}from"./const-DZnmuAue.js";import{F as M}from"./Form-BtD83T_P.js";import{L as ie}from"./Loader-Kp7VbMMi.js";import"./index-BdiFdmlv.js";import"./store-DowzcCVr.js";import"./index.esm-BO_I6uzn.js";import"./addClassnameToText-C3_zTtqY.js";const G=c.forwardRef(({bsPrefix:r,active:o,disabled:t,eventKey:s,className:m,variant:h,action:x,as:l,...n},u)=>{r=A(r,"list-group-item");const[a,i]=te({key:se(s,n.href),active:o,...n}),z=re(j=>{if(t){j.preventDefault(),j.stopPropagation();return}a.onClick(j)});t&&n.tabIndex===void 0&&(n.tabIndex=-1,n["aria-disabled"]=!0);const p=l||(x?n.href?"a":"button":"div");return e.jsx(p,{ref:u,...n,...a,onClick:z,className:D(m,r,i.isActive&&"active",t&&"disabled",h&&`${r}-${h}`,x&&`${r}-action`)})});G.displayName="ListGroupItem";const U=c.forwardRef((r,o)=>{const{className:t,bsPrefix:s,variant:m,horizontal:h,numbered:x,as:l="div",...n}=ne(r,{activeKey:"onSelect"}),u=A(s,"list-group");let a;return h&&(a=h===!0?"horizontal":`horizontal-${h}`),e.jsx(oe,{ref:o,...n,as:l,className:D(t,u,m&&`${u}-${m}`,a&&`${u}-${a}`,x&&`${u}-numbered`)})});U.displayName="ListGroup";const O=Object.assign(U,{Item:G}),le="_cardBody_15txn_1",ue="_titleContainer_15txn_6",de="_favoriteIcon_15txn_12",me="_itemSmalltext_15txn_19",he="_buttonContainer_15txn_27",xe="_quizDescription_15txn_38",fe="_checkbox_15txn_44",pe="_checkboxIconWrapper_15txn_53",je="_checkboxIcon_15txn_53",S={cardBody:le,titleContainer:ue,favoriteIcon:de,itemSmalltext:me,buttonContainer:he,quizDescription:xe,checkbox:fe,checkboxIconWrapper:pe,checkboxIcon:je},Ce="_isCorrect_129mc_1",ye="_isFalse_129mc_5",_e="_questionTitle_129mc_9",ge="_resultBody_129mc_13",N={isCorrect:Ce,isFalse:ye,questionTitle:_e,resultBody:ge},be=({show:r,handleClose:o,questions:t})=>{const[s,m]=c.useState(0),[h,x]=c.useState(t[s]),[l,n]=c.useState(t[s].answers),[u,a]=c.useState(!1),[i,z]=c.useState(0),[p,j]=c.useState(!1),Q=c.useRef(null),C=c.useRef(null),B=c.useRef(null),w=c.useRef(null),k=[Q,C,B,w],V=(d,y)=>{u||(y?(d.currentTarget.classList.add(N.isCorrect),a(!0),z(f=>f+1)):(d.currentTarget.classList.add(N.isFalse),a(!0),l.forEach((f,_)=>{var g,F,T;(g=k[_])!=null&&g.current&&f.isCorrect&&((T=(F=k[_])==null?void 0:F.current)==null||T.classList.add(N.isCorrect))})))},H=()=>{if(u){if(s===t.length-1)return j(!0),0;m(d=>d+1),x(t[s+1]),n(t[s+1].answers),a(!1),l.forEach((d,y)=>{var f,_,g;(f=k[y])!=null&&f.current&&d.isCorrect&&((g=(_=k[y])==null?void 0:_.current)==null||g.classList.remove(N.isCorrect))})}},W=()=>{m(d=>d-1),x(t[s-1]),n(t[s-1].answers),a(!1),l.forEach((d,y)=>{var f,_,g;(f=k[y])!=null&&f.current&&d.isCorrect&&((g=(_=k[y])==null?void 0:_.current)==null||g.classList.remove(N.isCorrect))})},Y=()=>{m(0),x(t[0]),n(t[0].answers),a(!1),z(0),j(!1)};return e.jsx(b,{show:r,onHide:o,fullscreen:"md-down",centered:!0,children:p?e.jsxs(e.Fragment,{children:[e.jsx(b.Header,{closeButton:!0,children:e.jsx(b.Title,{children:"Quiz Result"})}),e.jsxs(b.Body,{className:N.resultBody,children:[e.jsxs("h5",{children:["Your score is ",i," out of ",t.length]}),e.jsxs("h6",{children:["Correct answers: ",i/t.length*100,"%"]}),e.jsx("h5",{children:"Thank you for taking the quiz!"}),e.jsx(I,{onClick:Y,className:N.button,children:"Reset Quiz"})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(b.Header,{closeButton:!0,children:e.jsxs(b.Title,{children:["Question ",s+1]})}),e.jsxs(b.Body,{children:[e.jsx("h5",{className:N.questionTitle,children:h.questionTitle}),e.jsx(O,{children:l.map((d,y)=>e.jsx(O.Item,{ref:k[y],as:"li",className:"d-flex justify-content-between align-items-start",onClick:f=>V(f,d.isCorrect),children:e.jsx("div",{className:"ms-2 me-auto",children:e.jsx("div",{className:"fw-bold",children:d.answer})})},d.answer))})]}),e.jsxs(b.Footer,{className:"d-flex justify-content-center",children:[e.jsx(I,{variant:"secondary",disabled:s===0,onClick:W,children:"Previous Question"}),e.jsx(I,{onClick:H,variant:"primary",children:"Next Question"}),e.jsxs("h6",{children:["Total Questions: ",s+1," of ",t.length]})]})]})})},Se=({quiz:{title:r,complexity:o,description:t,id:s,authorName:m,publishedAt:h,questions:x}})=>{const[l,n]=c.useState(!1),[u,a]=c.useState(!1),i=()=>n(!1),z=()=>n(!0),{currentUser:p,setCurrentUser:j}=P(),Q=async C=>{if(p){if(!C.target.checked){await $(C.target.id,p.id,"remove"),a(!1),j(B=>({...B??{},favorites:p.favorites.filter(w=>w!==C.target.id)}));return}await $(C.target.id,p.id,"add"),a(!0),j(B=>({...B??{},favorites:[...p.favorites,C.target.id]}))}};return e.jsxs(v.Body,{className:S.cardBody,children:[e.jsxs(v.Title,{className:S.titleContainer,children:[e.jsx("h5",{children:r}),e.jsx("div",{className:S.checkbox,children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:u,onChange:C=>Q(C),id:s}),u?e.jsx(Z,{className:S.favoriteIcon,style:{fill:"#F7941D"}}):e.jsx(J,{className:S.favoriteIcon,style:{fill:"gray"}})]})})]}),e.jsx(v.Subtitle,{className:"mb-2 text-muted",children:o}),e.jsx(v.Text,{className:S.quizDescription,children:t}),e.jsxs("div",{className:S.buttonContainer,children:[e.jsx(v.Link,{onClick:z,as:I,children:"Start Quiz"}),e.jsx(v.Link,{as:I,children:"Share Quiz"})]}),e.jsxs("small",{className:S.itemSmalltext,children:["Published on: ",h.toLocaleDateString()," by ",m]}),l&&e.jsx(be,{show:l,handleClose:i,questions:x})]})},Ne=({quizes:r})=>e.jsx(R,{style:{paddingBottom:"80px",marginTop:"20px"},children:r.map(o=>e.jsx(v,{style:{width:"100%",marginBottom:"10px"},children:e.jsx(Se,{quiz:o})},o.id))}),ke="_container_clstf_1",ve="_form_clstf_7",ze="_button_clstf_19",Ie="_error_clstf_29",L={container:ke,form:ve,button:ze,error:Ie},Be="_selectCategory_13j12_1",Le={selectCategory:Be},E=({fields:r,fieldsName:o,handleChange:t})=>e.jsxs(M.Select,{className:Le.selectCategory,onChange:s=>t(s.target.value),defaultValue:`Open ${o} menu`,children:[e.jsx("option",{children:`Open ${o} menu`}),r.map(s=>e.jsx("option",{value:s,children:s},s))]}),Qe=Object.values(ae),we=Object.values(ce),Fe={category:"",complexity:""},Te=()=>{const[r,o]=q(Fe),[t,s]=c.useState(r.get("category")??""),[m,h]=c.useState(r.get("complexity")??""),[x,l]=c.useState(!1),n=i=>{if(i.preventDefault(),!t&&!m){l(!0);return}o({category:t,complexity:m})},u=i=>{if(console.log(i),i==="Open category menu"){s("");return}l(!1),s(i)},a=i=>{if(console.log(i),i==="Open complexity menu"){h("");return}l(!1),h(i)};return e.jsxs(R,{className:L.container,children:[e.jsxs(M,{className:L.form,onSubmit:n,children:[e.jsx(E,{fields:Qe,fieldsName:"category",handleChange:u}),e.jsx(E,{fields:we,fieldsName:"complexity",handleChange:a}),e.jsx(I,{className:L.button,type:"submit",children:"Search"})]}),x&&e.jsx("p",{className:L.error,children:"Please select search query"})]})},qe=()=>{const r=K(),o=X(),{currentUser:t}=P();return e.jsxs(e.Fragment,{children:[e.jsx(Te,{}),t&&e.jsx(ee,{}),r.state==="loading"?e.jsx(ie,{}):e.jsx(Ne,{quizes:o})]})};export{qe as default};