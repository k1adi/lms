import{j as e,a,y as n}from"./app-70c76b70.js";import{D as c}from"./DashboardLayout-7352f75d.js";import{B as o}from"./Breadcrumb-0553f53b.js";import{L as i}from"./LocalizationDate-89e7583f.js";import{P as h}from"./pencil-9b57b2f1.js";import{T as m}from"./trash-2-b9e77d1c.js";import"./graduation-cap-6d67c87b.js";const x=({schedules:t})=>{console.log(t);const l=[{link:route("dashboard"),text:"Dashboard"}],d=s=>{confirm("Are you sure you want to delete this schedule?")&&n.delete(route("schedules.destroy",s))};return e.jsxs("div",{className:"content-box",children:[e.jsx(o,{pageName:"Schedules",prevPage:l}),e.jsx(a,{className:"btn btn--primary",href:route("schedules.create"),children:" Create "}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"table--number",children:"No."}),e.jsx("th",{children:"Course"}),e.jsx("th",{children:"Description"}),e.jsx("th",{children:"Start Time"}),e.jsx("th",{children:"End Time"}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:t.data.length!==0?t.data.map((s,r)=>e.jsxs("tr",{className:"py-2",children:[e.jsx("td",{children:r+1}),e.jsx("td",{children:s.course.name}),e.jsx("td",{children:s.desc}),e.jsx("td",{children:i(s.start_time,"en")}),e.jsx("td",{children:i(s.end_time,"en")}),e.jsxs("td",{children:[e.jsxs(a,{href:route("schedules.edit",s.id),className:"text-warning mr-2",children:[e.jsx(h,{className:"inline-block mb-1",size:14})," Edit"]}),e.jsxs("button",{className:"text-red-600",type:"button",tabIndex:-1,onClick:()=>d(s.id),children:[e.jsx(m,{className:"inline-block mb-1",size:14})," Delete"]})]})]},r)):e.jsx("tr",{children:e.jsx("td",{colSpan:3,children:"Empty data"})})})]})})]})};x.layout=t=>e.jsx(c,{title:"Schedules",children:t});export{x as default};