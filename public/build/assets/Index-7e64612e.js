import{j as e,a as r,y as l}from"./app-213b7f9d.js";import{D as o}from"./DashboardLayout-553715ec.js";import{B as d}from"./Breadcrumb-5d20bd0c.js";import{P as c,T as m}from"./trash-2-79a0355c.js";import"./graduation-cap-2330f257.js";const x=({permissions:t})=>{const i=[{link:route("dashboard"),text:"Dashboard"},{link:"#",text:"Setting"}],n=s=>{confirm("Are you sure you want to delete this permission?")&&l.delete(route("permissions.destroy",s))};return e.jsxs("div",{className:"content-box",children:[e.jsx(d,{pageName:"Permissions",prevPage:i}),e.jsx(r,{className:"btn btn--primary",href:route("permissions.create"),children:" Create "}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"table--number",children:"No."}),e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:t.data.length!==0?t.data.map((s,a)=>e.jsxs("tr",{className:"py-2",children:[e.jsx("td",{children:a+1}),e.jsx("td",{children:s.name}),e.jsxs("td",{children:[e.jsxs(r,{href:route("permissions.edit",s.id),className:"text-warning",children:[e.jsx(c,{className:"inline-block mb-1",size:14})," Edit"]}),e.jsxs("button",{className:"text-red-600 ml-2",type:"button",tabIndex:-1,onClick:()=>n(s.id),children:[e.jsx(m,{className:"inline-block mb-1",size:14})," Delete"]})]})]},a)):e.jsx("tr",{children:e.jsx("td",{colSpan:4,children:"Empty data"})})})]})})]})};x.layout=t=>e.jsx(o,{title:"Permissions",children:t});export{x as default};