import{W as p,j as e}from"./app-70c76b70.js";import{S as c,c as d}from"./ReactSelectOption-25688e42.js";import{D as x}from"./DashboardLayout-7352f75d.js";import{B as b}from"./Breadcrumb-0553f53b.js";import{F as i}from"./FieldGroup-81437039.js";import{T as f}from"./TextInput-0faa155a.js";import{P as h}from"./PrimaryButton-4491d755.js";import"./graduation-cap-6d67c87b.js";const j=({permissions:s})=>{const m=[{link:route("dashboard"),text:"Dashboard"},{link:route("roles.index"),text:"Role"}],{data:t,setData:a,post:n,errors:o,processing:l}=p({name:"",permissions:[]}),u=r=>{r.preventDefault(),n(route("roles.store"))};return e.jsxs("div",{className:"content-box",children:[e.jsx(b,{title:"Create Role",pageName:"Create",prevPage:m}),e.jsxs("form",{onSubmit:u,className:"w-full",children:[e.jsx(i,{label:"Role Name",name:"name",error:o.name,isPrimary:!0,children:e.jsx(f,{name:"name",className:"mt-1 block w-full",value:t.name,onChange:r=>a("name",r.target.value),required:!0,isFocused:!0,autoComplete:"name",placeholder:"Name..."})}),e.jsx(i,{label:"Permissions",name:"permissions",error:o.permissions,isPrimary:!0,children:e.jsx(c,{isMulti:!0,options:d(s),value:t.permissions,onChange:r=>a("permissions",r)})}),e.jsx(h,{disabled:l,children:"Submit"})]})]})};j.layout=s=>e.jsx(x,{title:"Create Role",children:s});export{j as default};