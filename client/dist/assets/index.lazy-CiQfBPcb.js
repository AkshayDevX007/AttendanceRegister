import{u as y,a as C,_ as m,b as U,r as s,j as a,c as k,H as q,d as F}from"./index-XqEuWzft.js";async function P(e){const n=new FormData;n.append("name",e.name),n.append("email",e.email),n.append("phone",e.phone),n.append("unitName",e.unitName);const{data:t}=await U.put(`/api/v1/user/${e._id}`,n);return t}const R=()=>{const e=y();return C({mutationFn:n=>P(n),onSuccess:(n,t)=>{m.success("User updated successfully"),e.invalidateQueries({queryKey:["users"],exact:!0})},onError:n=>{console.log(n)}})};async function Q(e){const{data:n}=await U.delete(`/api/v1/user/${e}`);return n}const M=()=>{const e=y();return C({mutationFn:n=>Q(n),onSuccess:(n,t)=>{m.success("User deleted successfully"),e.invalidateQueries({queryKey:["users"],exact:!0})},onError:n=>{const t=n.response.data.message;m.error(t)}})},$=({user:e})=>{const[n,t]=s.useState(!1),[v,c]=s.useState(!1),[r,g]=s.useState((e==null?void 0:e.name)||""),[i,b]=s.useState((e==null?void 0:e.email)||""),[d,j]=s.useState((e==null?void 0:e.phone)||""),[h,u]=s.useState((e==null?void 0:e.unitName)||""),{mutate:f,isPending:x,isSuccess:N}=R(),{mutate:l,isPending:p,isSuccess:E}=M(),w=()=>{t(!0)},_=()=>{c(!0)},S=()=>{t(!1),c(!1)},D=()=>{f({name:r!=""?r:e==null?void 0:e.name,email:i!=""?i:e==null?void 0:e.email,phone:d!=""?d:e==null?void 0:e.phone,unitName:h!=""?h:e==null?void 0:e.unitName,_id:e==null?void 0:e._id})};s.useEffect(()=>{N&&(t(!1),g((e==null?void 0:e.name)||""),b((e==null?void 0:e.email)||""),j((e==null?void 0:e.phone)||""),u((e==null?void 0:e.unitName)||""))},[N]),s.useEffect(()=>{E&&c(!1)},[E]);const A=()=>{l(e==null?void 0:e._id)};return a.jsx("div",{className:"card w-96 bg-base-100 shadow-xl",children:a.jsxs("div",{className:"card-body",children:[a.jsx("h2",{className:"card-title",children:(e==null?void 0:e.name)||"jeffin"}),a.jsxs("p",{children:["Email: ",(e==null?void 0:e.email)||""]}),a.jsxs("p",{children:["Phone: ",(e==null?void 0:e.phone)||""]}),a.jsxs("p",{children:["Unit: ",(e==null?void 0:e.unitName)||""]}),n?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"form-control",children:[a.jsx("label",{className:"label",children:a.jsx("span",{className:"label-text",children:"Name:"})}),a.jsx("input",{type:"text",className:"input input-bordered",value:r,onChange:o=>g(o.target.value)})]}),a.jsxs("div",{className:"form-control",children:[a.jsx("label",{className:"label",children:a.jsx("span",{className:"label-text",children:"Email:"})}),a.jsx("input",{type:"text",className:"input input-bordered",value:i,onChange:o=>b(o.target.value)})]}),a.jsxs("div",{className:"form-control",children:[a.jsx("label",{className:"label",children:a.jsx("span",{className:"label-text",children:"Phone:"})}),a.jsx("input",{type:"text",className:"input input-bordered",value:d,onChange:o=>j(o.target.value)})]}),a.jsxs("div",{className:"form-control",children:[a.jsx("label",{className:"label",children:a.jsx("span",{className:"label-text",children:"Unit:"})}),a.jsx("input",{type:"text",className:"input input-bordered",value:h,onChange:o=>u(o.target.value)})]}),a.jsxs("div",{className:"card-actions justify-end mt-4",children:[a.jsx("button",{className:"btn btn-primary",onClick:D,disabled:x,children:x?a.jsx("span",{className:"loading loading-ring loading-md"}):"Save"}),a.jsx("button",{className:"btn btn-ghost",onClick:S,disabled:x,children:x?a.jsx("span",{className:"loading loading-ring loading-md"}):"Cancel"})]})]}):a.jsxs("div",{className:"card-actions justify-end",children:[a.jsx("button",{className:"btn btn-ghost btn-sm",onClick:w,children:"Edit"}),a.jsx("button",{className:"btn btn-error btn-sm",onClick:_,children:"Delete"})]}),v&&a.jsx("div",{className:"modal modal-open",children:a.jsxs("div",{className:"modal-box",children:[a.jsx("h3",{className:"font-bold text-lg",children:"Delete User"}),a.jsx("p",{className:"py-4",children:"Are you sure you want to delete this user?"}),a.jsxs("div",{className:"modal-actions",children:[a.jsx("button",{className:"btn btn-error",disabled:p,onClick:A,children:p?a.jsx("span",{className:"loading loading-ring loading-md"}):"Delete"}),a.jsx("button",{className:"btn btn-ghost",disabled:p,onClick:S,children:p?a.jsx("span",{className:"loading loading-ring loading-md"}):"Cancel"})]})]})})]})})};async function H(e){const n=new FormData;n.append("name",e.name),n.append("email",e.email),n.append("phone",e.phone),n.append("unitName",e.unitName);const{data:t}=await U.post("/api/v1/user",n);return t}const I=()=>{const e=y();return C({mutationFn:n=>H(n),onSuccess:(n,t)=>{m.success("User added successfully"),e.invalidateQueries({queryKey:["users"],exact:!0})},onError:n=>{const t=n.response.data.message;m.error(t)}})},K=()=>{const{mutate:e,isPending:n,isSuccess:t}=I(),[v,c]=s.useState(!1),[r,g]=s.useState(""),[i,b]=s.useState(""),[d,j]=s.useState(""),[h,u]=s.useState(""),f=l=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l),x=l=>/^[0-9]{10}$/.test(l),N=()=>{if(i&&!f(i)){m.error("Invalid email address");return}if(d&&!x(d)){m.error("Invalid phone number");return}e({name:r,email:i,phone:d,unitName:h})};return s.useEffect(()=>{t&&(c(!1),g(""),b(""),j(""),u(""))},[t]),a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"mb-6 flex justify-end",children:a.jsx("button",{className:"btn btn-primary",onClick:()=>c(!0),children:"Add User"})}),v&&a.jsx("div",{className:"modal modal-open",children:a.jsxs("div",{className:"modal-box",children:[a.jsx("h1",{className:"font-bold text-lg text-center mb-6",children:"Add User"}),a.jsxs("div",{className:"flex flex-col gap-4 mb-6",children:[a.jsx("input",{type:"text",placeholder:"Name",className:"input input-bordered",required:!0,value:r,onChange:l=>g(l.target.value)}),a.jsx("input",{type:"email",placeholder:"Email",className:"input input-bordered",value:i,onChange:l=>b(l.target.value)}),a.jsx("input",{type:"text",placeholder:"Phone",required:!0,className:"input input-bordered",value:d,onChange:l=>j(l.target.value)}),a.jsx("input",{type:"text",placeholder:"Unit",required:!0,className:"input input-bordered",value:h,onChange:l=>u(l.target.value)})]}),a.jsxs("div",{className:"modal-actions",children:[a.jsx("button",{className:"btn btn-error mr-2",disabled:n,onClick:N,children:n?a.jsx("span",{className:"loading loading-ring loading-md"}):"Add"}),a.jsx("button",{className:"btn btn-ghost",disabled:n,onClick:()=>c(!1),children:n?a.jsx("span",{className:"loading loading-ring loading-md"}):"Cancel"})]})]})})]})},z=()=>{const{data:e}=k();return a.jsxs(a.Fragment,{children:[a.jsx(q,{}),a.jsx("div",{className:"flex justify-center items-center  mt-8 mb-24",children:a.jsxs("div",{children:[a.jsx(K,{}),a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:e&&e.map(n=>a.jsx($,{user:n},n._id))})]})})]})},B=F("/")({component:G});function G(){return a.jsx(z,{})}export{B as Route};
