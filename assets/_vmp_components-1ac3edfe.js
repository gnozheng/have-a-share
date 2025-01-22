import{d as p,B as m,v as u,r as a,o as i,c as l,h as t,C as c,s as g,n as h}from"./index-39ee47a1.js";const v=p({name:"CodePreview",props:{code:{type:String,required:!0},lang:{type:String,required:!0},meta:{type:String,required:!0}},setup(e){const o=a(),n=a(0),d=a(!1);return{codeEl:o,height:n,copied:d,toggleCode:()=>{const r=o.value?o.value.offsetHeight:0;n.value=n.value===0?r:0},copyCode:()=>{if(!d.value){try{navigator.clipboard.writeText(e.code)}catch(r){console.log(r)}d.value=!0,setTimeout(()=>{d.value=!1},1e3)}}}}}),w=(e,o)=>{const n=e.__vccOpts||e;for(const[d,r]of o)n[d]=r;return n},C={class:"mdp-demo__preview"},f={class:"mdp-demo__toolbar"},k={key:0,xmlns:"http://www.w3.org/2000/svg",fill:"none",height:"20",width:"20",stroke:"currentColor","stroke-width":"2",viewBox:"0 0 24 24"},_=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4"},null,-1),y=[_],x={key:1,xmlns:"http://www.w3.org/2000/svg",fill:"none",height:"20",width:"20",stroke:"currentColor","stroke-width":"2",viewBox:"0 0 24 24"},M=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"},null,-1),S=[M],b=t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"ionicon",viewBox:"0 0 512 512"},[t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"46",d:"M160 368L32 256l128-112M352 368l128-112-128-112M304 96l-96 320"})],-1),B=[b],q={ref:"codeEl"};function V(e,o,n,d,r,H){return i(),l("div",{class:h(["mdp-demo",e.height>0&&"is-expanded"])},[t("div",C,[c(e.$slots,"default")]),t("div",f,[t("div",{class:"mdp-demo__btn mdp-demo__btn-copy",onClick:o[0]||(o[0]=(...s)=>e.copyCode&&e.copyCode(...s))},[e.copied?(i(),l("svg",k,y)):(i(),l("svg",x,S))]),t("div",{class:"mdp-demo__btn mdp-demo__btn-code",onClick:o[1]||(o[1]=(...s)=>e.toggleCode&&e.toggleCode(...s))},B)]),t("div",{class:"mdp-demo__code",style:g({height:e.height+"px",visibility:e.height>0?"visible":"hidden"})},[t("div",q,[c(e.$slots,"code")],512)],4)],2)}const E=w(v,[["render",V]]),P=p({name:"CodePreviewWrapper",props:{code:{type:String,required:!0},lang:{type:String,required:!0},meta:{type:String,default:""},component:{type:String,default:"CodePreview"}},setup(e,o){const n=m().appContext.app.component(e.component),d=n||E;return()=>u(d,{code:decodeURIComponent(e.code),lang:decodeURIComponent(e.lang),meta:decodeURIComponent(e.meta)},{default:o.slots.default,code:o.slots.code})}});export{P as V};
