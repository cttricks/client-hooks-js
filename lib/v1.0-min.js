const e={};function t(t){const r=e[t].value;document.querySelectorAll(`[client-hook="${t}"]`).forEach((e=>{if(["INPUT","TEXTAREA"].includes(e.tagName))switch(e.type){case"checkbox":case"radio":e.checked=Boolean(r);break;default:e.value=r}else e.innerHTML=r})),e[t].callbacks.forEach((e=>{e(r)}))}export function useState(r="",n=null){try{if("string"!=typeof r)throw new Error(`Invalid state name: Expected a string but received a ${typeof r}.`);if(void 0!==window[r])throw new Error(`'${r}' is already defined on your code, Kindly use another name.`);e[r]={value:n,callbacks:[]},Object.defineProperty(window,r,{get:function(){return n},set:function(o){n=o,e[r].value=n,t(r)}}),null!==n&&t(r)}catch(e){console.error("Error in useState:",e.message)}}export function useEffect(t,r={}){try{if("function"!=typeof t)throw new Error(`Invalid argument: Expected a function but received a ${typeof t}.`);if(Object.keys(r).length<1)return t();Object.entries(r).forEach((([r,n])=>{if(!e[r])throw new Error(`'${r}' is not defined in useState.`);e[r].callbacks.push(t),t(n)}))}catch(e){console.error("Error in useEffect:",e.message)}}