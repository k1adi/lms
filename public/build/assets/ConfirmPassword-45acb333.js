import{W as d,r as p,j as s,Y as l}from"./app-c934f3ea.js";import{G as c}from"./GuestLayout-d5f5d210.js";import{I as u}from"./InputError-9d701ffc.js";import{I as f}from"./InputLabel-84383bcb.js";import{P as x}from"./PrimaryButton-c44c71bf.js";import{T as w}from"./TextInput-d73399b1.js";import"./graduation-cap-47f31973.js";import"./createLucideIcon-d518e929.js";function I(){const{data:e,setData:a,post:t,processing:o,errors:m,reset:i}=d({password:""});p.useEffect(()=>()=>{i("password")},[]);const n=r=>{r.preventDefault(),t(route("password.confirm"))};return s.jsxs(c,{children:[s.jsx(l,{title:"Confirm Password"}),s.jsx("div",{className:"mb-4 text-sm text-gray-600 dark:text-gray-400",children:"This is a secure area of the application. Please confirm your password before continuing."}),s.jsxs("form",{onSubmit:n,children:[s.jsxs("div",{className:"mt-4",children:[s.jsx(f,{htmlFor:"password",value:"Password"}),s.jsx(w,{id:"password",type:"password",name:"password",value:e.password,className:"mt-1 block w-full",isFocused:!0,onChange:r=>a("password",r.target.value)}),s.jsx(u,{message:m.password,className:"mt-2"})]}),s.jsx("div",{className:"flex items-center justify-end mt-4",children:s.jsx(x,{className:"ms-4",disabled:o,children:"Confirm"})})]})]})}export{I as default};