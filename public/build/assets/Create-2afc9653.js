import{W as l,j as e}from"./app-213b7f9d.js";import{D as u}from"./DashboardLayout-553715ec.js";import{B as d}from"./Breadcrumb-5d20bd0c.js";import{F as p}from"./FieldGroup-3e6bee49.js";import{T as c}from"./TextInput-69aa03d5.js";import{P as x}from"./PrimaryButton-11fc1670.js";import"./graduation-cap-2330f257.js";const b=()=>{const r=[{link:route("dashboard"),text:"Dashboard"},{link:route("permissions.index"),text:"Permission"}],{data:a,setData:s,post:o,errors:m,processing:i}=l({name:""}),n=t=>{t.preventDefault(),o(route("permissions.store"))};return e.jsxs("div",{className:"content-box",children:[e.jsx(d,{title:"Create Permission",pageName:"Create",prevPage:r}),e.jsxs("form",{onSubmit:n,className:"w-full",children:[e.jsx(p,{label:"Permission Name",name:"name",error:m.name,isPrimary:!0,children:e.jsx(c,{name:"name",className:"mt-1 block w-full",value:a.name,onChange:t=>s("name",t.target.value),required:!0,isFocused:!0,autoComplete:"name",placeholder:"Name..."})}),e.jsx(x,{disabled:i,children:"Submit"})]})]})};b.layout=r=>e.jsx(u,{title:"",children:r});export{b as default};