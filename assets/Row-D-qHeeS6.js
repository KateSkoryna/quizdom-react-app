import{u as x,e as B,f as d,c as R}from"./divWithClassName-Bhcbn9v1.js";import{r as $,j}from"./index-D67BVwrx.js";const w=$.forwardRef(({bsPrefix:c,className:i,as:n="div",...t},f)=>{const a=x(c,"row"),l=B(),p=d(),u=`${a}-cols`,r=[];return l.forEach(s=>{const e=t[s];delete t[s];let o;e!=null&&typeof e=="object"?{cols:o}=e:o=e;const m=s!==p?`-${s}`:"";o!=null&&r.push(`${u}${m}-${o}`)}),j.jsx(n,{ref:f,...t,className:R(i,a,...r)})});w.displayName="Row";export{w as R};