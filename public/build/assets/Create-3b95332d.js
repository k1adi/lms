import{W as c,j as e}from"./app-ec2c7869.js";import{S as p}from"./react-select.esm-a2c154ec.js";import{D as x}from"./DashboardLayout-262cf4f2.js";import{B as b}from"./Breadcrumb-e48e009c.js";import{F as i}from"./FieldGroup-76930f9e.js";import{T as n}from"./TextInput-b3ae1c10.js";import{P as h}from"./PrimaryButton-eeb6c46a.js";import{c as f}from"./ReactSelectOption-49a86ad9.js";import"./graduation-cap-193139ba.js";const j=({positions:t})=>{const m=[{link:route("dashboard"),text:"Dashboard"},{link:route("bus.index"),text:"BU"}],{data:o,setData:a,post:l,errors:s,processing:u}=c({code:"",name:"",positions:[]}),d=r=>{r.preventDefault(),l(route("bus.store"))};return e.jsxs("div",{className:"content-box",children:[e.jsx(b,{title:"Create Business Unit",pageName:"Create",prevPage:m}),e.jsxs("form",{onSubmit:d,className:"w-full",children:[e.jsx(i,{label:"BU Code",name:"code",error:s.code,isPrimary:!0,children:e.jsx(n,{name:"code",className:"mt-1 block w-full",value:o.code,onChange:r=>a("code",r.target.value),required:!0,isFocused:!0,autoComplete:"code",placeholder:"Code..."})}),e.jsx(i,{label:"BU Name",name:"name",error:s.name,isPrimary:!0,children:e.jsx(n,{name:"name",className:"mt-1 block w-full",value:o.name,onChange:r=>a("name",r.target.value),required:!0,autoComplete:"name",placeholder:"Name..."})}),e.jsx(i,{label:"Positions",name:"positions",error:s.positions,isPrimary:!0,children:e.jsx(p,{isMulti:!0,options:f(t),value:o.positions,onChange:r=>a("positions",r)})}),e.jsx(h,{disabled:u,children:"Submit"})]})]})};j.layout=t=>e.jsx(x,{title:"BU Create",children:t});export{j as default};