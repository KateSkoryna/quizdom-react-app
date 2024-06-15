import{r as d,j as e,a as Be,A as Le,B as Oe,o as Ge}from"./index-DVMSeiYB.js";import{c as ne,A as Ue,u as We,r as P,M as He,B as Ve,F as ae,g as Ke,o as Xe,a as Ye,t as Ze,b as ee,d as te}from"./store-DowzcCVr.js";import{u as v,c as C,d as Je,a as Pe}from"./divWithClassName-CVTPLJfu.js";import{c as et,b as se,C as S}from"./types-uafdVdf3.js";import{F as l}from"./Form-BtD83T_P.js";import{b as A,C as tt,c as le,u as st,F as ot}from"./index.esm-BO_I6uzn.js";import{C as M,Q as rt}from"./const-DZnmuAue.js";import{d as nt}from"./index-BdiFdmlv.js";import{a as y}from"./addClassnameToText-C3_zTtqY.js";import{B as w,C as ce}from"./Col-CaX8Wqt1.js";function at(){return d.useState(null)}var I;function oe(t){if((!I&&I!==0||t)&&ne){var s=document.createElement("div");s.style.position="absolute",s.style.top="-9999px",s.style.width="50px",s.style.height="50px",s.style.overflow="scroll",document.body.appendChild(s),I=s.offsetWidth-s.clientWidth,document.body.removeChild(s)}return I}const ie=d.forwardRef(({className:t,bsPrefix:s,as:n="div",...o},a)=>(s=v(s,"modal-body"),e.jsx(n,{ref:a,className:C(t,s),...o})));ie.displayName="ModalBody";const Q=d.forwardRef(({bsPrefix:t,className:s,contentClassName:n,centered:o,size:a,fullscreen:u,children:j,scrollable:c,...i},h)=>{t=v(t,"modal");const m=`${t}-dialog`,p=typeof u=="string"?`${t}-fullscreen-${u}`:`${t}-fullscreen`;return e.jsx("div",{...i,ref:h,className:C(m,s,a&&`${t}-${a}`,o&&`${m}-centered`,c&&`${m}-scrollable`,u&&p),children:e.jsx("div",{className:C(`${t}-content`,n),children:j})})});Q.displayName="ModalDialog";const de=d.forwardRef(({className:t,bsPrefix:s,as:n="div",...o},a)=>(s=v(s,"modal-footer"),e.jsx(n,{ref:a,className:C(t,s),...o})));de.displayName="ModalFooter";const ue=d.forwardRef(({bsPrefix:t,className:s,closeLabel:n="Close",closeButton:o=!1,...a},u)=>(t=v(t,"modal-header"),e.jsx(Ue,{ref:u,...a,className:C(s,t),closeLabel:n,closeButton:o})));ue.displayName="ModalHeader";const lt=Je("h4"),me=d.forwardRef(({className:t,bsPrefix:s,as:n=lt,...o},a)=>(s=v(s,"modal-title"),e.jsx(n,{ref:a,className:C(t,s),...o})));me.displayName="ModalTitle";function ct(t){return e.jsx(ae,{...t,timeout:null})}function it(t){return e.jsx(ae,{...t,timeout:null})}const he=d.forwardRef(({bsPrefix:t,className:s,style:n,dialogClassName:o,contentClassName:a,children:u,dialogAs:j=Q,"data-bs-theme":c,"aria-labelledby":i,"aria-describedby":h,"aria-label":m,show:p=!1,animation:f=!0,backdrop:g=!0,keyboard:b=!0,onEscapeKeyDown:T,onShow:q,onHide:x,container:_,autoFocus:pe=!0,enforceFocus:xe=!0,restoreFocus:fe=!0,restoreFocusOptions:ge,onEntered:je,onExit:B,onExiting:ye,onEnter:L,onEntering:O,onExited:G,backdropClassName:U,manager:W,...Ce},be)=>{const[we,Ne]=d.useState({}),[Me,H]=d.useState(!1),E=d.useRef(!1),$=d.useRef(!1),k=d.useRef(null),[R,ve]=at(),Te=et(be,ve),V=se(x),ke=Pe();t=v(t,"modal");const Re=d.useMemo(()=>({onHide:V}),[V]);function K(){return W||Ke({isRTL:ke})}function X(r){if(!ne)return;const N=K().getScrollbarWidth()>0,J=r.scrollHeight>Xe(r).documentElement.clientHeight;Ne({paddingRight:N&&!J?oe():void 0,paddingLeft:!N&&J?oe():void 0})}const z=se(()=>{R&&X(R.dialog)});We(()=>{P(window,"resize",z),k.current==null||k.current()});const Se=()=>{E.current=!0},Ae=r=>{E.current&&R&&r.target===R.dialog&&($.current=!0),E.current=!1},Y=()=>{H(!0),k.current=Ze(R.dialog,()=>{H(!1)})},qe=r=>{r.target===r.currentTarget&&Y()},Ie=r=>{if(g==="static"){qe(r);return}if($.current||r.target!==r.currentTarget){$.current=!1;return}x==null||x()},Fe=r=>{b?T==null||T(r):(r.preventDefault(),g==="static"&&Y())},Ee=(r,N)=>{r&&X(r),L==null||L(r,N)},$e=r=>{k.current==null||k.current(),B==null||B(r)},ze=(r,N)=>{O==null||O(r,N),Ye(window,"resize",z)},De=r=>{r&&(r.style.display=""),G==null||G(r),P(window,"resize",z)},Qe=d.useCallback(r=>e.jsx("div",{...r,className:C(`${t}-backdrop`,U,!f&&"show")}),[f,U,t]),Z={...n,...we};Z.display="block";const _e=r=>e.jsx("div",{role:"dialog",...r,style:Z,className:C(s,t,Me&&`${t}-static`,!f&&"show"),onClick:g?Ie:void 0,onMouseUp:Ae,"data-bs-theme":c,"aria-label":m,"aria-labelledby":i,"aria-describedby":h,children:e.jsx(j,{...Ce,onMouseDown:Se,className:o,contentClassName:a,children:u})});return e.jsx(He.Provider,{value:Re,children:e.jsx(Ve,{show:p,ref:Te,backdrop:g,container:_,keyboard:!0,autoFocus:pe,enforceFocus:xe,restoreFocus:fe,restoreFocusOptions:ge,onEscapeKeyDown:Fe,onShow:q,onHide:x,onEnter:Ee,onEntering:ze,onEntered:je,onExit:$e,onExiting:ye,onExited:De,manager:K(),transition:f?ct:void 0,backdropTransition:f?it:void 0,renderBackdrop:Qe,renderDialog:_e})})});he.displayName="Modal";const F=Object.assign(he,{Body:ie,Header:ue,Title:me,Footer:de,Dialog:Q,TRANSITION_DURATION:300,BACKDROP_TRANSITION_DURATION:150}),dt=t=>{switch(t){case"1":return M[S.BEGINNER];case"2":return M[S.MEDIUM];case"3":return M[S.ADVANCED];case"4":return M[S.EXPERT];default:return M[S.BEGINNER]}},ut=({fieldName:t})=>{const{control:s}=A();return e.jsx(tt,{control:s,name:t,render:({field:{onChange:n,value:o}})=>e.jsxs(l.Group,{className:"mb-3",controlId:t,children:[e.jsxs(l.Label,{children:["Complexity level: ",dt(o)]}),e.jsx(l.Range,{onChange:a=>{n(a.target.value)},min:1,max:4,step:1,value:o})]})})},mt=Object.entries(rt),ht=({fieldName:t})=>{const{register:s}=A();return e.jsxs(l.Group,{className:"mb-2",controlId:"category",children:[e.jsx(l.Label,{children:"Category"}),e.jsxs(l.Select,{"aria-label":"Default select example",...s(t),children:[e.jsx("option",{children:"Choose a category"}),mt.map(([n,o])=>e.jsx("option",{value:o,children:o},n))]})]})},pt="_checkbox_ut4xm_1",xt="_checkboxIconWrapper_ut4xm_10",ft="_checkboxIcon_ut4xm_10",D={checkbox:pt,checkboxIconWrapper:xt,checkboxIcon:ft},gt=({label:t,nestIndex:s,index:n})=>{const{register:o}=A();return e.jsx("div",{className:D.checkbox,children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",...o(`questions[${s}].answers[${n}].isCorrect`)}),e.jsx("span",{className:D.checkboxIconWrapper,children:e.jsx(nt,{className:D.checkboxIcon})}),t]})})},jt="_errorText_1l6iq_1",yt={errorText:jt},Ct=({nestIndex:t})=>{const{control:s,register:n,formState:{errors:o}}=A(),{fields:a,remove:u,append:j}=le({control:s,name:`questions[${t}].answers`});return e.jsxs(l.Group,{className:"mb-3",controlId:"div-questions",children:[a.map((c,i)=>{var m,p,f,g,b;const h=(b=(g=(f=(p=(m=o==null?void 0:o.questions)==null?void 0:m[t])==null?void 0:p.answers)==null?void 0:f[i])==null?void 0:g.answer)==null?void 0:b.message;return e.jsxs(l.Group,{className:"mb-3",controlId:`answer-${i}-${c.id}`,children:[d.createElement(l.Control,{...n(`questions[${t}].answers[${i}].answer`,{required:"Answer is required",minLength:{value:3,message:"Answer must be at least 4 characters"}}),type:"text",placeholder:"Add answer ...",key:c.id}),h?y("text-danger",h):y(yt.errorText),e.jsxs(l.Group,{className:"d-flex justify-content-between",controlId:`isCorrect-${i}-${c.id}`,children:[e.jsx(gt,{label:"Choose correct answer",nestIndex:t,index:i}),e.jsx(w,{type:"button",onClick:()=>u(i),children:"Remove answer"})]})]},c.id)}),e.jsx(w,{type:"button",onClick:()=>j({answer:"",isCorrect:!1}),children:"Add Answer"})]})},bt="_errorText_1l6iq_1",wt={errorText:bt},Nt=()=>{const{control:t,register:s,formState:{errors:n}}=A(),{fields:o,append:a,remove:u}=le({control:t,name:"questions"});return e.jsxs(l.Group,{className:"mb-3",controlId:"div-questions",children:[o.map((j,c)=>{var h,m,p;const i=(p=(m=(h=n==null?void 0:n.questions)==null?void 0:h[c])==null?void 0:m.questionTitle)==null?void 0:p.message;return e.jsxs(l.Group,{className:"mb-3",controlId:`question-${c}`,children:[e.jsxs("div",{className:"d-flex justify-content-between mb-3",children:[e.jsxs(l.Label,{className:"mb-0 align-self-center",children:["Question ",c+1]}),c>0&&e.jsx(w,{onClick:()=>u(c),children:"Remove Question"})]}),e.jsx(l.Control,{...s(`questions[${c}].questionTitle`,{required:"Question title is required",minLength:{value:4,message:"Question title must be at least 4 characters"}}),type:"text",placeholder:"Add question ..."}),i?y("text-danger",i):y(wt.errorText),e.jsx(Ct,{nestIndex:c})]},j.id)}),e.jsx(l.Group,{className:"text-center",children:e.jsx(w,{onClick:()=>a({questionTitle:"",answers:[{answer:"",isCorrect:!1},{answer:"",isCorrect:!1}]}),children:"Add Question"})})]})},Mt="_errorText_1l6iq_1",re={errorText:Mt},vt=({handleClose:t})=>{var T,q;const s=ee(x=>x.newQuizData),n=ee(x=>x.setNewQuizData),{currentUser:o}=Be(),a=st({mode:"onChange",defaultValues:s}),{register:u,handleSubmit:j,setError:c,reset:i,formState:{errors:h,isDirty:m,isSubmitting:p}}=a,f=async x=>{try{await Le(Oe(Ge,"quizes"),{...x,authorId:o.id,authorName:o.name,publishedAt:new Date,complexity:M[x.complexity]}),n(x),i()}catch{c("root",{message:"Failed to create a quiz"})}},g=(T=h.title)==null?void 0:T.message,b=(q=h.description)==null?void 0:q.message;return e.jsx(ce,{children:e.jsx(ot,{...a,children:e.jsxs(l,{onSubmit:j(f),children:[e.jsxs(l.Group,{className:"mb-3",controlId:"div-title",children:[e.jsx(l.Label,{children:"Quiz Title"}),e.jsx(l.Control,{...u("title",{required:"Title is required",minLength:8}),type:"text",placeholder:"Best Quiz ever...",autoFocus:!0}),g?y("text-danger",g):y(re.errorText)]}),e.jsxs(l.Group,{className:"mb-3",controlId:"div-description",children:[e.jsx(l.Label,{children:"Quiz Description"}),e.jsx(l.Control,{...u("description",{required:"Description is required",minLength:8}),as:"textarea",rows:3}),b?y("text-danger",b):y(re.errorText)]}),e.jsx(ut,{fieldName:"complexity"}),e.jsx(ht,{fieldName:"category"}),e.jsx("h5",{className:"mx-auto mb-3 mt-3 text-center",children:"Add your questions"}),e.jsx(Nt,{}),e.jsxs("div",{className:"d-flex justify-content-center",children:[e.jsx(w,{className:"me-3",variant:"secondary",onClick:t,children:"Close Quiz"}),e.jsx(w,{type:"submit",disabled:!m||p,children:p?"Submitting...":"Save Quiz"})]})]})})})},Tt=({showModal:t,handleCloseModal:s})=>e.jsxs(F,{size:"lg",show:t,onHide:s,scrollable:!0,dialogClassName:"h-75",children:[e.jsx(F.Header,{closeButton:!0,children:e.jsx(F.Title,{as:"h2",children:"Create your own Quiz"})}),e.jsx(F.Body,{children:e.jsx(vt,{handleClose:s})})]}),Dt=()=>{const t=te(a=>a.show),s=te(a=>a.setShow),n=()=>{s(!1)},o=()=>{s(!0)};return e.jsxs(ce,{className:"text-end",children:[e.jsx(w,{onClick:o,children:"Add Quiz"}),e.jsx(Tt,{showModal:t,handleCloseModal:n})]})};export{Dt as A,F as M};