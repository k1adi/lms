import{j as e,a as i,y as l}from"./app-213b7f9d.js";import{D as c}from"./DashboardLayout-553715ec.js";import{B as o}from"./Breadcrumb-5d20bd0c.js";import{P as h,T as m}from"./trash-2-79a0355c.js";import"./graduation-cap-2330f257.js";function d(t,r){const n={weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"};if(r=="id")return new Date(t).toLocaleDateString("id-ID",n);if(r=="en")return new Date(t).toLocaleDateString("en-US",n)}const x=({schedules:t})=>{console.log(t);const r=[{link:route("dashboard"),text:"Dashboard"}],n=s=>{confirm("Are you sure you want to delete this schedule?")&&l.delete(route("schedules.destroy",s))};return e.jsxs("div",{className:"content-box",children:[e.jsx(o,{pageName:"Schedules",prevPage:r}),e.jsx(i,{className:"btn btn--primary",href:route("schedules.create"),children:" Create "}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"table--number",children:"No."}),e.jsx("th",{children:"Course"}),e.jsx("th",{children:"Description"}),e.jsx("th",{children:"Start Time"}),e.jsx("th",{children:"End Time"}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:t.data.length!==0?t.data.map((s,a)=>e.jsxs("tr",{className:"py-2",children:[e.jsx("td",{children:a+1}),e.jsx("td",{children:s.course.name}),e.jsx("td",{children:s.desc}),e.jsx("td",{children:d(s.start_time,"en")}),e.jsx("td",{children:d(s.end_time,"en")}),e.jsxs("td",{children:[e.jsxs(i,{href:route("schedules.edit",s.id),className:"text-warning mr-2",children:[e.jsx(h,{className:"inline-block mb-1",size:14})," Edit"]}),e.jsxs("button",{className:"text-red-600",type:"button",tabIndex:-1,onClick:()=>n(s.id),children:[e.jsx(m,{className:"inline-block mb-1",size:14})," Delete"]})]})]},a)):e.jsx("tr",{children:e.jsx("td",{colSpan:3,children:"Empty data"})})})]})})]})};x.layout=t=>e.jsx(c,{title:"Schedules",children:t});export{x as default};