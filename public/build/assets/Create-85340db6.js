import{W as S,j as e}from"./app-143c1042.js";import{S as h,c as k}from"./ReactSelectOption-9b90ff86.js";import{D as $}from"./DashboardLayout-652c8066.js";import{B as q}from"./Breadcrumb-b638c607.js";import{F as i}from"./FieldGroup-6207962c.js";import{T as c}from"./TextInput-8d99e8d2.js";import{I as b}from"./InputError-789c0bda.js";import{T}from"./TextArea-b0de7669.js";import{P}from"./PrimaryButton-56cf560b.js";import{P as d}from"./plus-5355f8fd.js";import{T as x}from"./trash-2-40682509.js";import"./graduation-cap-30460fa7.js";const _=({courses:p})=>{const j=[{link:route("dashboard"),text:"Dashboard"},{link:route("courses.index"),text:"Courses"}],{data:a,setData:n,post:f,errors:l,processing:v}=S({name:"",type:{},trainer:"",thumbnail:"",url_attachment:"",prerequisite:{},description:"",sections:[{name:"",subsections:[{name:"",url:""}]}]}),N=()=>{n("sections",[...a.sections,{name:"",subsections:[{name:"",url:""}]}])},g=t=>{const s=a.sections.filter((o,r)=>r!==t);n("sections",s)},C=t=>{const s=[...a.sections];s[t].subsections.push({name:"",url:""}),n("sections",s)},y=(t,s)=>{const o=[...a.sections];o[t].subsections=o[t].subsections.filter((r,m)=>m!==s),n("sections",o)},w=t=>{t.preventDefault(),f(route("courses.store"))};return e.jsxs("form",{onSubmit:w,className:"w-full",children:[e.jsxs("div",{className:"content-box",children:[e.jsx(q,{pageName:"Create Course",prevPage:j}),e.jsx(i,{label:"Course Name",name:"name",error:l.name,isPrimary:!0,children:e.jsx(c,{name:"name",className:"mt-1 block w-full",value:a.name,onChange:t=>n("name",t.target.value),required:!0,isFocused:!0,autoComplete:"name",placeholder:"Name..."})}),e.jsx(i,{label:"Course Type",name:"type",error:l.type,isPrimary:!0,children:e.jsx(h,{name:"type",placeholder:"Select Type...",options:[{value:"offline",label:"Offline"},{value:"online",label:"Online"}],value:a.type,onChange:t=>n("type",t),className:"mt-1 block w-full",required:!0})}),e.jsx(i,{label:"Trainer Name",name:"trainer",error:l.trainer,isPrimary:!0,children:e.jsx(c,{name:"trainer",className:"mt-1 block w-full",value:a.trainer,required:!0,onChange:t=>n("trainer",t.target.value),autoComplete:"trainer",placeholder:"Trainer..."})}),e.jsx(i,{label:"Course Intro",name:"thumbnail",error:l.thumbnail,children:e.jsx(c,{type:"url",name:"thumbnail",className:"mt-1 block w-full",value:a.thumbnail,onChange:t=>n("thumbnail",t.target.value),autoComplete:"thumbnail",placeholder:"URL Video..."})}),e.jsx(i,{label:"Attachment",name:"url_attachment",error:l.url_attachment,children:e.jsx(c,{type:"url",name:"url_atachment",className:"mt-1 block w-full",value:a.url_atachment,onChange:t=>n("url_atachment",t.target.value),autoComplete:"url_atachment",placeholder:"URL Attachment..."})}),e.jsx(i,{label:"Course Requirement",name:"prerequisite",error:l.prerequisite,children:e.jsx(h,{name:"prerequisite",placeholder:"Select Prerequisite",options:k(p),value:a.prerequisite,onChange:t=>n("prerequisite",t),className:"mt-1 block w-full"})}),e.jsx(i,{label:"Description",name:"description",error:l.description,children:e.jsx(T,{id:"description",className:"mt-1 block w-full",value:a.description,onChange:t=>n("description",t.target.value),autoComplete:"description",placeholder:"Description",rows:3})})]}),a.type.value=="online"&&e.jsx("div",{className:"content-box mt-2",children:e.jsxs("div",{className:"flex flex-row items-center justify-between",children:[e.jsx("h2",{className:"text--sub-heading",children:"Section"}),e.jsx("button",{className:"btn btn--primary",type:"button",onClick:N,children:e.jsx(d,{})})]})}),a.type.value=="online"&&a.sections.map((t,s)=>e.jsxs("div",{className:"content-box mt-2",children:[e.jsx(i,{label:"Section Name",name:`sections.${s}.name`,error:l[`sections.${s}.name`],children:e.jsxs("div",{className:"flex flex-row items-end gap-x-2",children:[e.jsx(c,{name:`sections.${s}.name`,className:"flex-1 mt-1",value:t.name,onChange:o=>{const r=[...a.sections];r[s].name=o.target.value,n("sections",r)},placeholder:"Section Name..."}),e.jsx("button",{className:"btn btn--danger",type:"button",onClick:()=>g(s),children:e.jsx(x,{})})]})}),e.jsxs("div",{className:"flex flex-row items-center justify-between mt-5 mb-3",children:[e.jsx("h2",{className:"text--sub-heading",children:"Sub Section"}),e.jsx("button",{className:"btn-sm btn--primary",type:"button",onClick:()=>C(s),children:e.jsx(d,{size:18})})]}),t.subsections.map((o,r)=>e.jsxs("div",{className:"flex flex-row items-start gap-2 mt-2",children:[e.jsx("button",{className:"btn btn--danger",type:"button",onClick:()=>y(s,r),children:e.jsx(x,{})}),e.jsxs("div",{className:"flex-1",children:[e.jsx(c,{name:`sections.${s}.subsections.${r}.name`,className:"w-full",value:o.name,onChange:m=>{const u=[...a.sections];u[s].subsections[r].name=m.target.value,n("sections",u)},placeholder:"Name..."}),e.jsx(b,{message:l[`sections.${s}.subsections.${r}.name`],className:"mt-2"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx(c,{name:`sections.${s}.subsections.${r}.url`,className:"w-full",value:o.url,onChange:m=>{const u=[...a.sections];u[s].subsections[r].url=m.target.value,n("sections",u)},placeholder:"url..."}),e.jsx(b,{message:l[`sections.${s}.subsections.${r}.url`],className:"mt-2"})]})]},r))]},s)),e.jsx("div",{className:"content-box mt-2 text-center",children:e.jsx(P,{className:"w-full justify-center",disabled:v,children:"Submit"})})]})};_.layout=p=>e.jsx($,{title:"Course Create",children:p});export{_ as default};