import{W as c,j as e}from"./app-72aaa421.js";import{D as p}from"./DashboardLayout-1db68d21.js";import{B as x}from"./Breadcrumb-d38887d1.js";import{F as m}from"./FieldGroup-b00c69af.js";import{T as l}from"./TextInput-e34af910.js";import{P as h}from"./PrimaryButton-3b2e16c9.js";import"./graduation-cap-c57be5ac.js";const b=({bu:a})=>{const i=[{link:route("dashboard"),text:"Dashboard"},{link:route("bus.index"),text:"BU"}],{data:r,setData:o,patch:n,errors:s,processing:d}=c({code:a.code,name:a.name}),u=t=>{t.preventDefault(),n(route("bus.update",a))};return e.jsxs("div",{className:"content-box",children:[e.jsx(x,{title:"Edit Business Unit",pageName:"Edit",prevPage:i}),e.jsxs("form",{onSubmit:u,className:"w-full",children:[e.jsx(m,{label:"BU Code",name:"code",error:s.code,isPrimary:!0,children:e.jsx(l,{name:"code",className:"mt-1 block w-full",value:r.code,onChange:t=>o("code",t.target.value),required:!0,isFocused:!0,autoComplete:"code",placeholder:"Code..."})}),e.jsx(m,{label:"BU Name",name:"name",error:s.name,isPrimary:!0,children:e.jsx(l,{name:"name",className:"mt-1 block w-full",value:r.name,onChange:t=>o("name",t.target.value),required:!0,autoComplete:"name",placeholder:"Name..."})}),e.jsx(h,{disabled:d,children:"Submit"})]})]})};b.layout=a=>e.jsx(p,{title:"BU Edit",children:a});export{b as default};