import{W as Q,j as e}from"./app-8dff3fe4.js";import{S as b}from"./react-select.esm-4b228d2e.js";import{D as B}from"./DashboardLayout-0c01f98f.js";import{B as F}from"./Breadcrumb-487f2b40.js";import{F as m}from"./FieldGroup-e4545a49.js";import{T as p}from"./TextInput-d965cc41.js";import{I as R}from"./InputError-e46620ad.js";import{D as z}from"./DateTimePicker-8d2a7ddf.js";import{P as j}from"./PrimaryButton-cf40c5aa.js";import{c as G}from"./ReactSelectOption-49a86ad9.js";import{P as f}from"./plus-993bbe9e.js";import{T as w}from"./trash-2-7a055ad3.js";import"./graduation-cap-bbda4b7c.js";const K=({assignment:u,courses:y})=>{const v=[{link:route("dashboard"),text:"Dashboard"},{link:route("tests.index"),text:"Test"}],{course_id:g,course:h,access_time:N,minimum_score:C,type:c,questions:k}=u,{data:a,setData:n,patch:T,errors:l,processing:x}=Q({course_id:g,selectCourse:{value:h.id,label:h.name},access_time:N,minimum_score:C,type:c,selectType:{value:c,label:c.charAt(0).toUpperCase()+c.slice(1)},questions:c=="knowledge"?k.map(t=>({id:t.id,name:t.text,answers:t.answers.map(s=>({id:s.id,text:s.text,is_correct:!!Number(s.is_correct)}))})):[]}),_=t=>{n(s=>({...s,course_id:t.value,selectCourse:t}))},q=t=>{n(s=>({...s,type:t.value,selectType:t}))},S=t=>{const s=Math.max(0,Math.min(100,parseInt(t.target.value)));n("minimum_score",isNaN(s)?"":s)},$=()=>{n("questions",[...a.questions,{name:"",answers:[{text:"",is_correct:""}]}])},P=t=>{const s=a.questions.filter((o,r)=>r!==t);n("questions",s)},A=t=>{const s=[...a.questions];s[t].answers.push({text:"",is_correct:""}),n("questions",s)},D=(t,s)=>{const o=[...a.questions];o[t].answers=o[t].answers.filter((r,i)=>i!==s),n("questions",o)},E=t=>{t.preventDefault(),T(route("tests.update",u))};return e.jsxs("form",{onSubmit:E,className:"w-full",children:[e.jsxs("div",{className:"content-box",children:[e.jsx(F,{pageName:"Create Test",prevPage:v}),e.jsx(m,{label:"Course",name:"selectCourse",error:l.course,isPrimary:!0,children:e.jsx(b,{name:"selectCourse",placeholder:"Select Course...",options:G(y),value:a.selectCourse,onChange:_,className:"mt-1 block w-full",required:!0})}),e.jsx(m,{label:"Course Type",name:"type",error:l.type,isPrimary:!0,children:e.jsx(b,{name:"type",placeholder:"Select Type...",options:[{value:"knowledge",label:"Knowledge"},{value:"skill",label:"Skill"}],value:a.selectType,onChange:q,className:"mt-1 block w-full",required:!0})}),a.type=="knowledge"&&e.jsxs(e.Fragment,{children:[e.jsx(m,{label:"Minimum Score",name:"minimumScore",error:l.minimum_score,isPrimary:!0,children:e.jsx(p,{name:"minimumScore",type:"number",min:"0",max:"100",value:a.minimum_score,onChange:S,className:"mt-1 block w-full",placeholder:"Minimum score (0-100)...",required:!0})}),e.jsx(m,{label:"Access Time",name:"accessTime",error:l.access_time,children:e.jsx(z,{minDate:"today",withTime:!1,value:a.access_time,onChange:t=>n("access_time",t),className:"mt-1 block w-full",name:"accessTime",placeholder:"Select access time..."})})]}),a.type!=="knowledge"&&e.jsx(j,{disabled:x,children:"Submit"})]}),a.type=="knowledge"&&e.jsx("div",{className:"content-box mt-2",children:e.jsxs("div",{className:"flex flex-row items-center justify-between",children:[e.jsx("h2",{className:"text--sub-heading",children:"Question"}),e.jsx("button",{className:"btn btn--primary",type:"button",onClick:$,children:e.jsx(f,{})})]})}),a.type=="knowledge"&&a.questions.map((t,s)=>e.jsxs("div",{className:"content-box mt-2",children:[e.jsx(m,{label:`Question no. ${s+1}`,name:`questions.${s}.name`,error:l[`questions.${s}.name`],children:e.jsxs("div",{className:"flex flex-row items-end gap-x-2",children:[e.jsx(p,{name:`questions.${s}.name`,className:"flex-1 mt-1",value:t.name,onChange:o=>{const r=[...a.questions];r[s].name=o.target.value,n("questions",r)},placeholder:"Question Text..."}),e.jsx("button",{className:"btn btn--danger",type:"button",onClick:()=>P(s),children:e.jsx(w,{})})]})}),e.jsxs("div",{className:"flex flex-row items-center justify-between mt-5 mb-3",children:[e.jsx("h2",{className:"text--sub-heading",children:"Answer"}),e.jsx("button",{className:"btn-sm btn--primary",type:"button",onClick:()=>A(s),children:e.jsx(f,{size:18})})]}),t.answers.map((o,r)=>e.jsxs("div",{className:"flex flex-row items-start gap-2 mt-2",children:[e.jsx("button",{className:"btn btn--danger",type:"button",onClick:()=>D(s,r),children:e.jsx(w,{})}),e.jsxs("div",{className:"flex-1",children:[e.jsx(p,{name:`questions.${s}.answers.${r}.name`,className:"w-full",value:o.text,onChange:i=>{const d=[...a.questions];d[s].answers[r].text=i.target.value,n("questions",d)},placeholder:"Answer Text..."}),e.jsx(R,{message:l[`questions.${s}.answers.${r}.name`],className:"mt-2"})]}),e.jsx("div",{className:"flex-1",children:e.jsxs("label",{children:[e.jsx("input",{type:"radio",name:`questions.${s}.answers.${r}.isCorrect`,checked:o.is_correct,value:o.is_correct,onChange:()=>{const i=[...a.questions];i[s].answers.forEach((d,M)=>d.is_correct=M===r),n("questions",i)}}),"Correct"]})})]},r))]},s)),a.type=="knowledge"&&e.jsx("div",{className:"content-box mt-2 text-center",children:e.jsx(j,{className:"w-full justify-center",disabled:x,children:"Submit"})})]})};K.layout=u=>e.jsx(B,{title:"Tes Edit",children:u});export{K as default};