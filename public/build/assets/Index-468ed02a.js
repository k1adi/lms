import{j as e,a,y as l}from"./app-ec2c7869.js";import{D as d}from"./DashboardLayout-262cf4f2.js";import{B as c}from"./Breadcrumb-e48e009c.js";import{P as o}from"./pencil-9378f668.js";import{T as h}from"./trash-2-f60daaad.js";import"./graduation-cap-193139ba.js";const x=({tnas:s})=>{const n=[{link:route("dashboard"),text:"Dashboard"},{link:"#",text:"Analyze"}],i=t=>{confirm("Are you sure you want to delete this course?")&&l.delete(route("courses.destroy",t))};return e.jsxs("div",{className:"content-box",children:[e.jsx(c,{pageName:"TNA",prevPage:n}),e.jsx(a,{className:"btn btn--primary",href:route("tnas.create"),children:" Create "}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"table__column--number",children:"No."}),e.jsx("th",{children:"BU"}),e.jsx("th",{children:"Dept"}),e.jsx("th",{children:"Course"}),e.jsx("th",{children:"Goal"}),e.jsx("th",{children:"Start Time"}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:s.data.length!==0?s.data.map((t,r)=>e.jsxs("tr",{children:[e.jsx("td",{children:r+1}),e.jsx("td",{children:t.dept.bu.name}),e.jsx("td",{children:t.dept.name}),e.jsx("td",{children:t.course.name}),e.jsx("td",{children:t.objective}),e.jsx("td",{children:t.training_time}),e.jsxs("td",{children:[e.jsxs(a,{href:route("tnas.edit",t.id),className:"text-warning mr-2",children:[e.jsx(o,{className:"inline-block mb-1",size:14})," Edit"]}),e.jsxs("button",{className:"text-red-600",type:"button",onClick:()=>i(t.id),children:[e.jsx(h,{className:"inline-block mb-1",size:14})," Delete"]})]})]},r)):e.jsx("tr",{className:"text-center",children:e.jsx("td",{colSpan:7,children:"Empty data"})})})]})})]})};x.layout=s=>e.jsx(d,{title:"TNA",children:s});export{x as default};