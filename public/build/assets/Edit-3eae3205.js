import{W as u,j as e}from"./app-143c1042.js";import{D as d}from"./DashboardLayout-652c8066.js";import{B as p}from"./Breadcrumb-b638c607.js";import{F as c}from"./FieldGroup-6207962c.js";import{T as x}from"./TextInput-8d99e8d2.js";import{P as b}from"./PrimaryButton-56cf560b.js";import"./graduation-cap-30460fa7.js";const f=({permission:r})=>{const a=[{link:route("dashboard"),text:"Dashboard"},{link:route("permissions.index"),text:"Permission"}],{data:s,setData:o,patch:i,errors:m,processing:n}=u({name:r.name}),l=t=>{t.preventDefault(),i(route("permissions.update",r))};return e.jsxs("div",{className:"content-box",children:[e.jsx(p,{title:"Edit Permission",pageName:"Edit",prevPage:a}),e.jsxs("form",{onSubmit:l,className:"w-full",children:[e.jsx(c,{label:"Permission Name",name:"name",error:m.name,isPrimary:!0,children:e.jsx(x,{name:"name",className:"mt-1 block w-full",value:s.name,onChange:t=>o("name",t.target.value),required:!0,isFocused:!0,autoComplete:"name",placeholder:"Name..."})}),e.jsx(b,{disabled:n,children:"Submit"})]})]})};f.layout=r=>e.jsx(d,{title:"Edit Permission",children:r});export{f as default};