import{W as u,j as e}from"./app-8dff3fe4.js";import{D as d}from"./DashboardLayout-0c01f98f.js";import{B as p}from"./Breadcrumb-487f2b40.js";import{F as c}from"./FieldGroup-e4545a49.js";import{T as x}from"./TextInput-d965cc41.js";import{P as b}from"./PrimaryButton-cf40c5aa.js";import"./graduation-cap-bbda4b7c.js";const f=({permission:r})=>{const a=[{link:route("dashboard"),text:"Dashboard"},{link:route("permissions.index"),text:"Permission"}],{data:s,setData:o,patch:i,errors:m,processing:n}=u({name:r.name}),l=t=>{t.preventDefault(),i(route("permissions.update",r))};return e.jsxs("div",{className:"content-box",children:[e.jsx(p,{title:"Edit Permission",pageName:"Edit",prevPage:a}),e.jsxs("form",{onSubmit:l,className:"w-full",children:[e.jsx(c,{label:"Permission Name",name:"name",error:m.name,isPrimary:!0,children:e.jsx(x,{name:"name",className:"mt-1 block w-full",value:s.name,onChange:t=>o("name",t.target.value),required:!0,isFocused:!0,autoComplete:"name",placeholder:"Name..."})}),e.jsx(b,{disabled:n,children:"Submit"})]})]})};f.layout=r=>e.jsx(d,{title:"Edit Permission",children:r});export{f as default};