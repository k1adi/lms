import{j as e,a as c}from"./app-c934f3ea.js";import{D as i}from"./DashboardLayout-3bc5976a.js";import{B as o}from"./Breadcrumb-499b58e3.js";import{P as d}from"./pencil-4a1b02fe.js";import"./createLucideIcon-d518e929.js";import"./graduation-cap-47f31973.js";const m=({courses:s,schedules:h,auth:l})=>{const n=[{link:route("dashboard"),text:"Dashboard"},{link:"#",text:"Setting"}];return e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"content-box mb-3",children:e.jsx(o,{pageName:"Access",prevPage:n,className:"mb-0"})}),e.jsxs("section",{className:"content-box mb-3",children:[e.jsxs("div",{className:"flex flex-row items-center justify-between mb-3",children:[e.jsx("h1",{className:"text--title",children:"Course Access"}),l.permissions.includes("accessible_create")&&e.jsx(c,{className:"btn btn--primary",href:route("access.create",{page:"course"}),children:" Add Access "})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"table--number",children:"No."}),e.jsx("th",{children:"Course"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Position"}),e.jsx("th",{className:"table--action",children:"Action"})]})}),e.jsx("tbody",{children:s.data.length!==0?s.data.map((a,t)=>e.jsxs("tr",{className:"group py-2",children:[e.jsx("td",{className:"group-hover:text-sky-400",children:t+1}),e.jsx("td",{className:"group-hover:text-sky-400",children:a.name}),e.jsx("td",{className:"group-hover:text-sky-400",children:a.type}),e.jsx("td",{className:"break-word",children:a.assign_position.map(r=>e.jsxs("span",{className:"label label--secondary group-hover:bg-sky-100 group-hover:dark:bg-sky-400",children:[" ",r.name," "]},r.name))}),e.jsx("td",{className:"table--action",children:e.jsxs(c,{href:route("access.course.edit",a.id),className:"text-warning mr-2",children:[e.jsx(d,{className:"inline-block mb-1",size:14})," Edit"]})})]},t)):e.jsx("tr",{className:"text-center",children:e.jsx("td",{colSpan:5,children:"Empty data"})})})]})})]})]})};m.layout=s=>e.jsx(i,{title:"Business Unit",children:s});export{m as default};