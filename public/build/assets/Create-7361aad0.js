import{W as l,j as e}from"./app-a9e82981.js";import{D as u}from"./DashboardLayout-a559b119.js";import{B as d}from"./Breadcrumb-60be14fc.js";import{F as p}from"./FieldGroup-8ca00edc.js";import{T as c}from"./TextInput-4165aca4.js";import{P as x}from"./PrimaryButton-324430ed.js";import"./graduation-cap-b5775cee.js";const b=()=>{const t=[{link:route("dashboard"),text:"Dashboard"},{link:route("positions.index"),text:"Position"}],{data:a,setData:o,post:s,errors:i,processing:m}=l({name:""}),n=r=>{r.preventDefault(),s(route("positions.store"))};return e.jsxs("div",{className:"content-box",children:[e.jsx(d,{title:"Create Position",pageName:"Create",prevPage:t}),e.jsxs("form",{onSubmit:n,className:"w-full",children:[e.jsx(p,{label:"Position Name",name:"name",error:i.name,isPrimary:!0,children:e.jsx(c,{name:"name",className:"mt-1 block w-full",value:a.name,onChange:r=>o("name",r.target.value),required:!0,isFocused:!0,autoComplete:"name",placeholder:"Name..."})}),e.jsx(x,{disabled:m,children:"Submit"})]})]})};b.layout=t=>e.jsx(u,{title:"Position Create",children:t});export{b as default};