import{W as p,j as r}from"./app-a9e82981.js";import{D as d}from"./DashboardLayout-a559b119.js";import{B as x}from"./Breadcrumb-60be14fc.js";import{P as f}from"./PrimaryButton-324430ed.js";import b from"./CourseAccessForm-540fe51f.js";import h from"./ScheduleAccessForm-0e003511.js";import"./graduation-cap-b5775cee.js";import"./react-select.esm-bdc24485.js";import"./FieldGroup-8ca00edc.js";import"./ReactSelectOption-49a86ad9.js";import"./TextInput-4165aca4.js";import"./LocalizationDate-89e7583f.js";const j=({page:t,datas:e,access:s})=>{const m=[{link:route("dashboard"),text:"Dashboard"},{link:route("access.index"),text:"Access"},{link:"#",text:t}],{data:o,setData:a,post:c,errors:i,processing:n}=p({page:t.toLowerCase(),datas:"",access:""}),l=u=>{u.preventDefault(),c(route("access.store"))};return r.jsxs("div",{className:"content-box",children:[r.jsx(x,{title:`Create ${t} Access`,pageName:"Create",prevPage:m}),r.jsxs("form",{onSubmit:l,className:"w-full",children:[t==="Course"&&r.jsx(b,{datas:e,access:s,data:o,setData:a,errors:i}),t==="Schedule"&&r.jsx(h,{datas:e,access:s,data:o,setData:a,errors:i}),r.jsx(f,{disabled:n,children:"Submit"})]})]})};j.layout=t=>r.jsx(d,{title:`Create ${t.props.page}  Access`,children:t});export{j as default};