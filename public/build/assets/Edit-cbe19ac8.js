import{W as k,j as e}from"./app-0fba4069.js";import{S as c}from"./react-select.esm-387c8a10.js";import{D as w}from"./DashboardLayout-c20313ad.js";import{B as y}from"./Breadcrumb-27852163.js";import{F as n}from"./FieldGroup-fec5df59.js";import{T as m}from"./TextInput-4d213b32.js";import{P}from"./PrimaryButton-d9b0b559.js";import{c as u}from"./ReactSelectOption-49a86ad9.js";import{P as C}from"./plus-220ebc63.js";import{T as U}from"./trash-2-0ea735f2.js";import"./graduation-cap-d46c3d64.js";const E=({user:s,roles:d,bus:h,positions:b,pivots:f})=>{const v=[{link:route("dashboard"),text:"Dashboard"},{link:route("users.index"),text:"User"}],{data:l,setData:r,patch:x,errors:t,processing:j}=k({full_name:s.full_name,username:s.username,roles:u(s.has_role),email:s.email,no_hp:s.no_hp,no_nik:s.no_nik,password:"",pivot:f.map(a=>({bu:{value:a.bu.id,label:a.bu.name},position:u(a.positions)}))}),_=()=>{r("pivot",[...l.pivot,{bu:null,position:[]}])},N=a=>{const o=l.pivot.filter((p,i)=>i!==a);r("pivot",o)},g=a=>{a.preventDefault(),x(route("users.update",s))};return e.jsxs("form",{onSubmit:g,className:"w-full",children:[e.jsxs("div",{className:"content-box",children:[e.jsx(y,{title:"Edit User",pageName:"Edit",prevPage:v}),e.jsx(n,{label:"Full Name",name:"full_name",error:t.full_name,isPrimary:!0,children:e.jsx(m,{name:"full_name",className:"mt-1 block w-full",value:l.full_name,onChange:a=>r("full_name",a.target.value),required:!0,isFocused:!0,autoComplete:"full_name",placeholder:"Full Name..."})}),e.jsx(n,{label:"Username",name:"username",error:t.username,isPrimary:!0,children:e.jsx(m,{name:"username",className:"mt-1 block w-full",value:l.username,onChange:a=>r("username",a.target.value),required:!0,autoComplete:"username",placeholder:"Username..."})}),e.jsx(n,{label:"Roles",name:"role",error:t.role,isPrimary:!0,children:e.jsx(c,{isMulti:!0,options:u(d),value:l.roles,onChange:a=>r("roles",a)})}),e.jsx(n,{label:"User Email",name:"email",error:t.email,isPrimary:!0,children:e.jsx(m,{name:"email",type:"email",className:"mt-1 block w-full",value:l.email,onChange:a=>r("email",a.target.value),required:!0,autoComplete:"email",placeholder:"User Email..."})}),e.jsx(n,{label:"User Phone",name:"no_hp",error:t.no_hp,isPrimary:!0,children:e.jsx(m,{name:"no_hp",className:"mt-1 block w-full",value:l.no_hp,onChange:a=>r("no_hp",a.target.value),required:!0,autoComplete:"no_hp",placeholder:"Handphone Number..."})}),e.jsx(n,{label:"User NIK",name:"no_nik",error:t.no_nik,isPrimary:!0,children:e.jsx(m,{name:"no_nik",className:"mt-1 block w-full",value:l.no_nik,onChange:a=>r("no_nik",a.target.value),required:!0,autoComplete:"no_nik",placeholder:"NIK..."})}),e.jsx(n,{label:"Password",name:"password",error:t.password,children:e.jsx(m,{type:"password",name:"password",className:"mt-1 block w-full",value:l.password,onChange:a=>r("password",a.target.value),autoComplete:"password",placeholder:"Password..."})}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("button",{className:"btn btn--primary",type:"button",onClick:_,children:[e.jsx(C,{className:"inline-block mb-1"})," Add Bu Position"]}),e.jsx(P,{disabled:j,children:"Submit"})]})]}),e.jsx("div",{className:"content-box mt-2",children:l.pivot.map((a,o)=>e.jsxs("div",{className:"py-2 border-b border-gray-300",children:[e.jsx(n,{label:"Business Unit",name:`pivot.${o}.bu`,error:t[`pivot.${o}.bu`],children:e.jsxs("div",{className:"flex flex-row items-end gap-x-2",children:[e.jsx(c,{name:`pivot.${o}.bu`,placeholder:"Select Type...",options:u(h),value:a.bu,onChange:p=>{const i=[...l.pivot];i[o].bu=p,r("pivot",i)},className:"mt-1 block w-full"}),e.jsx("button",{className:"btn-sm btn--danger",type:"button",onClick:()=>N(o),children:e.jsx(U,{})})]})}),e.jsx(n,{label:"Position",name:`pivot.${o}.position`,error:t[`pivot.${o}.position`],children:e.jsx(c,{isMulti:!0,name:`pivot.${o}.position`,placeholder:"Select Type...",options:u(b),value:a.position,onChange:p=>{const i=[...l.pivot];i[o].position=p,r("pivot",i)},className:"mt-1 block w-full"})})]},o))})]})};E.layout=s=>e.jsx(w,{title:"User Edit",children:s});export{E as default};