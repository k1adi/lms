import{W as b,j as e}from"./app-a9e82981.js";import{S as f}from"./react-select.esm-bdc24485.js";import{D as h}from"./DashboardLayout-a559b119.js";import{B as j}from"./Breadcrumb-60be14fc.js";import{F as a}from"./FieldGroup-8ca00edc.js";import{T as r}from"./TextInput-4165aca4.js";import{P as S}from"./PrimaryButton-324430ed.js";import{c as l}from"./ReactSelectOption-49a86ad9.js";import{L as o}from"./LocalizationDate-89e7583f.js";import"./graduation-cap-b5775cee.js";const v=({schedule:s,users:i})=>{const m=[{link:route("dashboard"),text:"Dashboard"},{link:route("access.index"),text:"Access"},{link:"#",text:"Schedule"}],{data:c,setData:n,patch:u,errors:d,processing:p}=b({users:l(s.assign_user,"full_name")}),x=t=>{t.preventDefault(),u(route("schedule-access.update",s))};return e.jsxs("div",{className:"content-box",children:[e.jsx(j,{title:"Edit Schedule Access",pageName:"Edit",prevPage:m}),e.jsxs("form",{onSubmit:x,className:"w-full",children:[e.jsx(a,{label:"Course Name",children:e.jsx(r,{name:"course_name",className:"mt-1 block w-full",value:s.course.name,disabled:!0,placeholder:"Name..."})}),e.jsx(a,{label:"Schdule Time",children:e.jsx(r,{name:"course_time",className:"mt-1 block w-full",value:o(s.start_time,"id")+" - "+o(s.end_time,"id"),disabled:!0,placeholder:"Time..."})}),e.jsx(a,{label:"Desription",children:e.jsx(r,{name:"desc",className:"mt-1 block w-full",value:s.desc,disabled:!0,placeholder:"Description..."})}),e.jsx(a,{label:"Users",name:"users",error:d.users,isPrimary:!0,children:e.jsx(f,{isMulti:!0,options:l(i,"full_name"),value:c.users,onChange:t=>n("users",t)})}),e.jsx(S,{disabled:p,children:"Submit"})]})]})};v.layout=s=>e.jsx(h,{title:"Edit Schedule Access",children:s});export{v as default};