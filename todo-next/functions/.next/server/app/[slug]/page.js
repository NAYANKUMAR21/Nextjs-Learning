(()=>{var e={};e.id=42,e.ids=[42],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},5200:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>c,pages:()=>u,routeModule:()=>x,tree:()=>d}),s(8251),s(2029),s(5866);var r=s(3191),a=s(8716),n=s(7922),i=s.n(n),o=s(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let d=["",{children:["[slug]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,8251)),"/Users/nayankumar/Desktop/Nextjs-Learning/todo-next/src/app/[slug]/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,2029)),"/Users/nayankumar/Desktop/Nextjs-Learning/todo-next/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,5866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["/Users/nayankumar/Desktop/Nextjs-Learning/todo-next/src/app/[slug]/page.tsx"],c="/[slug]/page",p={require:s,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/[slug]/page",pathname:"/[slug]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},2863:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,2994,23)),Promise.resolve().then(s.t.bind(s,6114,23)),Promise.resolve().then(s.t.bind(s,9727,23)),Promise.resolve().then(s.t.bind(s,9671,23)),Promise.resolve().then(s.t.bind(s,1868,23)),Promise.resolve().then(s.t.bind(s,4759,23))},6036:()=>{},497:(e,t,s)=>{Promise.resolve().then(s.bind(s,9612))},9612:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var r=s(326),a=s(4099),n=s(5047),i=s(7577);async function o(e){try{let t=await a.Z.get("/api/todos/"+e);return console.log(t.data.data),t.data.data}catch(e){throw Error(e.message)}}function l(){let[e,t]=(0,i.useState)(""),[s,l]=(0,i.useState)([]),[d,u]=(0,i.useState)({id:"",updateInput:!1}),c=(0,n.useParams)();console.log(c);let p=async t=>{let r=s[t]._id,n=[...s];n[t].isCompleted=!n[t].isCompleted;let i=s[t].isCompleted;l(n),await a.Z.patch("/api/todos/"+r,{todo:e,isCompleted:i})},x=async()=>{e&&(l([...s,{_id:`${s.length}`,todo:e,isCompleted:!1,update:!1}]),t(""),await a.Z.post("/api/todos/",{todo:e}),l(await o(c.slug)))},m=(e,r)=>{let a=s[e]._id;t(r),u({...d,id:a,updateInput:!0}),s[e].update=!s[e].update,l([...s])},g=async e=>{let t=s[e]._id,r=s.filter((t,s)=>s!==e);console.log("Is An Array",r),l([...r]),await a.Z.delete("/api/todos/"+t)},h=async()=>{let r=!1,n=s.map((t,s)=>t._id==d.id?(r=t.isCompleted,{...t,todo:e}):t);await a.Z.patch("/api/todos/"+d.id,{todo:e,isCompleted:r}),u({id:"",updateInput:!1}),l(n),t("")};return(0,r.jsxs)("div",{className:"text-black taubg-orange-600",children:[r.jsx("div",{className:"min-h-screen bg-gray-100 flex items-center justify-center",children:(0,r.jsxs)("div",{className:"bg-white shadow-md rounded-lg p-8 w-full max-w-md",children:[r.jsx("h1",{className:"text-2xl font-bold text-center mb-4",children:"Todo List"}),(0,r.jsxs)("div",{className:"flex mb-4",children:[r.jsx("input",{type:"text",value:e,onChange:e=>t(e.target.value),className:"flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Add a new todo..."}),d.updateInput?r.jsx("button",{onClick:h,className:"bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none",children:"Update"}):r.jsx("button",{onClick:x,className:"bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none",children:"Add"})]}),r.jsx("ul",{children:s.map(({_id:e,todo:t,isCompleted:s,update:a},n)=>(0,r.jsxs)("div",{className:"flex justify-between mt-5",children:[r.jsx("li",{className:"flex items-center justify-between bg-gray-50 p-3 rounded-md mb-2  overflow-scroll",onClick:()=>m(n,t),children:r.jsx("span",{className:s?"line-through text-gray-400":"",children:t})},n),(0,r.jsxs)("div",{className:"flex justify-between  w-16",children:[r.jsx("div",{children:r.jsx("button",{onClick:()=>p(n),className:`p-1 text-sm rounded-full focus:outline-none ${s?"bg-green-400 text-white":"bg-gray-200"}`,children:s?"✖️":"✔️"})}),r.jsx("div",{children:r.jsx("button",{onClick:()=>g(n),children:"\uD83D\uDDD1️"})})]})]},n))})]})}),c.slug]})}},8251:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>n,default:()=>o});var r=s(8570);let a=(0,r.createProxy)(String.raw`/Users/nayankumar/Desktop/Nextjs-Learning/todo-next/src/app/[slug]/page.tsx`),{__esModule:n,$$typeof:i}=a;a.default;let o=(0,r.createProxy)(String.raw`/Users/nayankumar/Desktop/Nextjs-Learning/todo-next/src/app/[slug]/page.tsx#default`)},2029:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>o,metadata:()=>i});var r=s(9510),a=s(5317),n=s.n(a);s(5023);let i={title:"Create Next App",description:"Generated by create next app"};function o({children:e}){return r.jsx("html",{lang:"en",children:r.jsx("body",{className:n().className,children:e})})}},3881:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var r=s(6621);let a=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,r.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},5023:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[948,347,621,555],()=>s(5200));module.exports=r})();