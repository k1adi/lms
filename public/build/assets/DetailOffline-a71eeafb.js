import{j as e,a as o}from"./app-72aaa421.js";import{D as d}from"./DashboardLayout-1db68d21.js";import{B as c}from"./Breadcrumb-d38887d1.js";import"./graduation-cap-c57be5ac.js";const x=({course:a})=>{const r=[{link:route("dashboard"),text:"Dashboard"},{link:"#",text:"Training"},{link:route("training.offline.index"),text:"Offline"}],{name:s,code:i,trainer:l,description:m,url_attachment:n,assignment:t}=a.data;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"content-box mb-2",children:[e.jsx(c,{title:s,pageName:i,prevPage:r,className:"mb-0"}),e.jsxs("span",{children:["Trainer: ",l]}),e.jsx("p",{className:"mt-8 mb-4",children:m}),e.jsxs("div",{className:"flex flex-wrap items-end justify-between",children:[n&&e.jsxs("div",{children:[e.jsx("p",{className:"font-bold mb-1",children:"Lampiran Pendukung"}),e.jsx("a",{href:n,target:"_blank",className:"btn btn--primary",children:"Lihat lampiran"})]}),t.length!==0&&e.jsx(o,{href:route("training.test",t==null?void 0:t.code),className:"btn btn--danger",children:"Mulai Ujian"})]})]})})};x.layout=a=>e.jsx(d,{title:a.props.name,children:a});export{x as default};