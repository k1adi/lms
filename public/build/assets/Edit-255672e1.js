import{W as d,j as s}from"./app-ec2c7869.js";import{S as x}from"./react-select.esm-a2c154ec.js";import{D as b}from"./DashboardLayout-262cf4f2.js";import{B as f}from"./Breadcrumb-e48e009c.js";import{F as o}from"./FieldGroup-76930f9e.js";import{T as h}from"./TextInput-b3ae1c10.js";import{P as j}from"./PrimaryButton-eeb6c46a.js";import{c as r}from"./ReactSelectOption-49a86ad9.js";import"./graduation-cap-193139ba.js";const g=({course:t,positions:a})=>{const i=[{link:route("dashboard"),text:"Dashboard"},{link:route("access.index"),text:"Access"},{link:"#",text:"Course"}],{data:n,setData:m,patch:l,errors:c,processing:u}=d({positions:r(t.assign_position)}),p=e=>{e.preventDefault(),l(route("course-access.update",t))};return s.jsxs("div",{className:"content-box",children:[s.jsx(f,{title:"Edit Course Access",pageName:"Edit",prevPage:i}),s.jsxs("form",{onSubmit:p,className:"w-full",children:[s.jsx(o,{label:"Course Name",children:s.jsx(h,{name:"course_name",className:"mt-1 block w-full",value:t.name,disabled:!0,placeholder:"Name..."})}),s.jsx(o,{label:"Positions",name:"positions",error:c.positions,isPrimary:!0,children:s.jsx(x,{isMulti:!0,options:r(a),value:n.positions,onChange:e=>m("positions",e)})}),s.jsx(j,{disabled:u,children:"Submit"})]})]})};g.layout=t=>s.jsx(b,{title:"Edit Course Access",children:t});export{g as default};