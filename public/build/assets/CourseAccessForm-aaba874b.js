import{j as s}from"./app-6affcc5d.js";import{S as t}from"./react-select.esm-4c4eb5b5.js";import{F as i}from"./FieldGroup-499f5368.js";import{c as n}from"./ReactSelectOption-49a86ad9.js";const x=({datas:c,access:m,data:r,setData:o,errors:a})=>s.jsxs(s.Fragment,{children:[s.jsx(i,{label:"Course",name:"course",error:a.datas,isPrimary:!0,children:s.jsx(t,{options:n(c),value:r.datas,onChange:e=>o("datas",e)})}),s.jsx(i,{label:"Posiitons",name:"position",error:a.access,isPrimary:!0,children:s.jsx(t,{isMulti:!0,options:n(m),value:r.access,onChange:e=>o("access",e)})})]});export{x as default};