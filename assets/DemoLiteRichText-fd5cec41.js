import{V as b}from"./_vmp_components-92698a7a.js";import{_ as v,o as r,c as h,F as g,i as j,j as R,k as _,q as C,h as e,s as L,w as D,z as y,A as T,t as u,n as k,r as A,v as f,x as E,p as t,y as B}from"./index-5c21d81c.js";const m='<p class="rich-text_p"><br/></p>',w={name:"LiteRichText",components:{},emits:["click","focus","blur","keyup","update:modelValue","contentLengthChange"],props:{id:{type:String,default:"richText"},modelValue:{type:String,default:""},placeholder:{type:String,default:"请输入"},disabled:{type:Boolean,default:!1},height:{type:String,default:"100%"},maxlength:{type:Number,default:null},toolbar:{type:Array,default(){return[]}},toolbarConfig:{type:Object,default(){return{}}},ignoreLengthOfElement:{type:Array,default(){return["rt-block"]}},showContentlength:{type:Boolean,default:!0}},data(){return{htmlContent:this.modelValue?`<p class="rich-text_p">${this.modelValue}</p>`:m,htmlConentHistory:[],lastRange:null,rangeNode:null,showPlaceholder:!this.modelValue,contentLength:0,isComposed:!1,composedText:""}},provide(){return{insertContent:this.insertContent}},computed:{toolbarSets(){const s=[],n={};for(let a=0;a<this.toolbar.length;a++){const i=this.toolbar[a];for(let c=0;c<i.length;c++){const l=i[c];typeof l=="string"?s.push(l):(s.push(l.component),n[l.component]=l)}}return{tools:s,toolMap:n}},isMaxlength(){return this.maxlength?this.contentLength>=this.maxlength:!1}},methods:{isEmpty(){return this.getTextContent()===`
`},getTextContent(){const s=document.getElementById(this.id);return s?s.innerText:`
`},calculateContentLength(){const s=document.getElementById(this.id),n=this.getTextContent().replaceAll(`
`,"");let a="";return this.ignoreLengthOfElement.length&&this.ignoreLengthOfElement.forEach(i=>{const c=s.getElementsByClassName(i);for(let l=0;l<c.length;l++)a+=c[l].innerText}),this.$emit("contentLengthChange",n.length-a.length),n.length-a.length},insertContent(s,n=!1){if(this.calculateContentLength()>=this.maxlength)return;const c=this.id,l=document.getElementById(c);this.lastRange&&this.restoreRange(),l.focus();const o=window.getSelection(),p=o.getRangeAt(0);p.deleteContents(),p.insertNode(s),this.$nextTick(()=>{this.$emit("update:modelValue",l.innerHTML)}),o.collapseToEnd(),this.saveRange(),this.showPlaceholder=!1,n&&(this.contentLength=this.calculateContentLength())},saveRange(){const s=window.getSelection();if(s.rangeCount>0){const a=s.getRangeAt(0).cloneRange();this.lastRange=a}},restoreRange(){const s=window.getSelection();s.removeAllRanges(),s.addRange(this.lastRange)},handleClick(s){this.saveRange(),this.$emit("click",s)},handleBeforeInput(s){const a=this.calculateContentLength()>=this.maxlength;if(s.inputType==="insertParagraph"){s.preventDefault();return}a&&(["deleteContentBackward","deleteContentForward"].includes(s.inputType)||s.preventDefault())},handleInput(s){if(this.isComposed)return;const n=this.calculateContentLength(),a=n>this.maxlength,i=s.target.innerHTML;if(i===""||this.isEmpty()?(this.showPlaceholder=!0,s.target.innerHTML=m,this.$emit("update:modelValue","")):(this.showPlaceholder=!1,a||(this.htmlConentHistory.push(i),this.$emit("update:modelValue",i))),a){const c=this.composedText&&this.composedText.length,l=s.inputType==="insertFromPaste";if(c||l){const o=window.getSelection(),p=n-this.maxlength;for(let x=0;x<p;x++)o.modify("extend","backward","character");o.deleteFromDocument();const d=s.target.innerHTML;this.htmlConentHistory.push(d),this.$emit("update:modelValue",d)}}this.$nextTick(()=>{this.saveRange(),a?this.contentLength=this.maxlength:this.contentLength=n})},handleKeyup(s){this.saveRange(),this.$emit("keyup",s)},handleFocus(){document.getElementById(this.id).focus()},handleBlur(){document.getElementById(this.id).blur()},handleStartCHN(s){this.isComposed=!0,this.composedText="",s.preventDefault()},handleEndCHN(s){this.isComposed=!1,this.composedText=s.data,this.handleInput(s)},clear(){this.$refs.richTextRef.innerHTML=m}},mounted(){this.contentLength=this.calculateContentLength()}},S={key:0,class:"rich-text_toolbar"},V=["id","contenteditable","innerHTML"];function F(s,n,a,i,c,l){return r(),h("div",{class:k(["rich-text",{"rich-text_toolbar-in-bottom":a.toolbarConfig.place==="bottom",disabled:a.disabled}])},[a.toolbar.length?(r(),h("div",S,[(r(!0),h(g,null,j(a.toolbar,(o,p)=>(r(),h("span",{key:p,class:"rich-text_toolbar-block"},[(r(!0),h(g,null,j(l.toolbarSets.tools,d=>(r(),h("span",{key:d,class:"rich-text_toolbar-item"},[(r(),R(_(`tool-${d}`),{config:l.toolbarSets.toolMap[d]},null,8,["config"]))]))),128))]))),128))])):C("",!0),e("div",{id:a.id,contenteditable:a.disabled?!1:"plaintext-only",innerHTML:c.htmlContent,class:"rich-text_content",style:L({height:a.height}),onClick:n[0]||(n[0]=(...o)=>l.handleClick&&l.handleClick(...o)),onBeforeinput:n[1]||(n[1]=(...o)=>l.handleBeforeInput&&l.handleBeforeInput(...o)),onInput:n[2]||(n[2]=(...o)=>l.handleInput&&l.handleInput(...o)),onCompositionstart:n[3]||(n[3]=(...o)=>l.handleStartCHN&&l.handleStartCHN(...o)),onCompositionend:n[4]||(n[4]=(...o)=>l.handleEndCHN&&l.handleEndCHN(...o)),onFocus:n[5]||(n[5]=o=>s.$emit("focus",o)),onBlur:n[6]||(n[6]=o=>s.$emit("blur",o)),onKeydown:n[7]||(n[7]=D(()=>{},["stop"])),onKeyup:n[8]||(n[8]=D((...o)=>l.handleKeyup&&l.handleKeyup(...o),["stop"])),ref:"richTextRef"},null,44,V),y(e("div",{class:"rich-text_placeholder",onClick:n[9]||(n[9]=(...o)=>l.handleFocus&&l.handleFocus(...o))},u(this.placeholder),513),[[T,c.showPlaceholder&&!c.isComposed]]),a.showContentlength?y((r(),h("div",{key:1,class:"rich-text_maxlength"},u(c.contentLength)+"/"+u(a.maxlength),513)),[[T,a.maxlength]]):C("",!0)],2)}const I=v(w,[["render",F]]);const H={__name:"DemoLiteRichText.md.DemoBlockIee749eee",setup(s){const n=A(""),a=A(),i=()=>{const c=document.createElement("span");c.innerText="这是插入内容",c.style.color="red",c.style.fontSize="30px",a.value.insertContent(c)};return(c,l)=>{const o=I;return r(),h(g,null,[f(o,{ref_key:"liteRichTextRef",ref:a,modelValue:n.value,"onUpdate:modelValue":l[0]||(l[0]=p=>n.value=p),placeholder:"请输入内容",height:"200px",maxlength:100},null,8,["modelValue"]),e("div",{class:"actions"},[e("span",{onClick:i}," 插入内容 ")])],64)}}},N=v(H,[["__scopeId","data-v-4736c9d0"]]),M={class:"markdown-body"},K="LiteRichText",O="轻量文本域",J="基于Vue2实现的基本文本域组件，（功能不断完善中）目前仅支持插入内容，统计字数等基本文本输入框能力。",q="Vue2,JavaScript",U="pc",Y={__name:"DemoLiteRichText",setup(s,{expose:n}){return n({frontmatter:{name:"LiteRichText",title:"轻量文本域",description:"基于Vue2实现的基本文本域组件，（功能不断完善中）目前仅支持插入内容，统计字数等基本文本输入框能力。",technologies:"Vue2,JavaScript",category:"pc"}}),(i,c)=>(r(),h("div",M,[f(B(b),{lang:"vue",meta:"preview",code:"%3Ctemplate%3E%0D%0A%20%20%3CLiteRichText%0D%0A%20%20%20%20ref%3D%22liteRichTextRef%22%0D%0A%20%20%20%20v-model%3D%22value%22%0D%0A%20%20%20%20placeholder%3D%22%E8%AF%B7%E8%BE%93%E5%85%A5%E5%86%85%E5%AE%B9%22%0D%0A%20%20%20%20height%3D%22200px%22%0D%0A%20%20%20%20%3Amaxlength%3D%22100%22%0D%0A%20%20%2F%3E%0D%0A%20%20%3Cdiv%20class%3D%22actions%22%3E%0D%0A%20%20%20%20%3Cspan%20%40click%3D%22insertContent%22%3E%0D%0A%20%20%20%20%20%20%E6%8F%92%E5%85%A5%E5%86%85%E5%AE%B9%0D%0A%20%20%20%20%3C%2Fspan%3E%0D%0A%20%20%3C%2Fdiv%3E%0D%0A%3C%2Ftemplate%3E%0D%0A%0D%0A%3Cscript%20setup%3E%0D%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%0D%0Aconst%20value%20%3D%20ref('')%0D%0Aconst%20liteRichTextRef%20%3D%20ref()%0D%0Aconst%20insertContent%20%3D%20()%20%3D%3E%20%7B%0D%0A%20%20const%20content%20%3D%20document.createElement('span')%0D%0A%20%20content.innerText%20%3D%20'%E8%BF%99%E6%98%AF%E6%8F%92%E5%85%A5%E5%86%85%E5%AE%B9'%0D%0A%20%20content.style.color%20%3D%20'red'%0D%0A%20%20content.style.fontSize%20%3D%20'30px'%0D%0A%20%20liteRichTextRef.value.insertContent(content)%0D%0A%7D%0D%0A%3C%2Fscript%3E%0D%0A%0D%0A%3Cstyle%20scoped%3E%0D%0A.actions%20%7B%0D%0A%20%20margin-top%3A%2020px%3B%0D%0A%7D%0D%0A.actions%20span%20%7B%0D%0A%20%20cursor%3A%20pointer%3B%0D%0A%20%20padding%3A%2010px%3B%0D%0A%20%20border%3A%201px%20solid%20%23ccc%3B%0D%0A%20%20border-radius%3A%205px%3B%0D%0A%7D%0D%0A%3C%2Fstyle%3E",component:"CodePreview"},{code:E(()=>c[0]||(c[0]=[e("pre",null,[e("code",{class:"hljs language-vue"},[e("span",{class:"language-xml"},[e("span",{class:"hljs-tag"},[t("<"),e("span",{class:"hljs-name"},"template"),t(">")]),t(`
  `),e("span",{class:"hljs-tag"},[t("<"),e("span",{class:"hljs-name"},"LiteRichText"),t(`
    `),e("span",{class:"hljs-attr"},"ref"),t("="),e("span",{class:"hljs-string"},'"liteRichTextRef"'),t(`
    `),e("span",{class:"hljs-attr"},"v-model"),t("="),e("span",{class:"hljs-string"},'"value"'),t(`
    `),e("span",{class:"hljs-attr"},"placeholder"),t("="),e("span",{class:"hljs-string"},'"请输入内容"'),t(`
    `),e("span",{class:"hljs-attr"},"height"),t("="),e("span",{class:"hljs-string"},'"200px"'),t(`
    `),e("span",{class:"hljs-attr"},":maxlength"),t("="),e("span",{class:"hljs-string"},'"100"'),t(`
  />`)]),t(`
  `),e("span",{class:"hljs-tag"},[t("<"),e("span",{class:"hljs-name"},"div"),t(),e("span",{class:"hljs-attr"},"class"),t("="),e("span",{class:"hljs-string"},'"actions"'),t(">")]),t(`
    `),e("span",{class:"hljs-tag"},[t("<"),e("span",{class:"hljs-name"},"span"),t(" @"),e("span",{class:"hljs-attr"},"click"),t("="),e("span",{class:"hljs-string"},'"insertContent"'),t(">")]),t(`
      插入内容
    `),e("span",{class:"hljs-tag"},[t("</"),e("span",{class:"hljs-name"},"span"),t(">")]),t(`
  `),e("span",{class:"hljs-tag"},[t("</"),e("span",{class:"hljs-name"},"div"),t(">")]),t(`
`),e("span",{class:"hljs-tag"},[t("</"),e("span",{class:"hljs-name"},"template"),t(">")]),t(`

`),e("span",{class:"hljs-tag"},[t("<"),e("span",{class:"hljs-name"},"script"),t(),e("span",{class:"hljs-attr"},"setup"),t(">")]),e("span",{class:"language-javascript"},[t(`
`),e("span",{class:"hljs-keyword"},"import"),t(" { ref } "),e("span",{class:"hljs-keyword"},"from"),t(),e("span",{class:"hljs-string"},"'vue'"),t(`
`),e("span",{class:"hljs-keyword"},"const"),t(" value = "),e("span",{class:"hljs-title function_"},"ref"),t("("),e("span",{class:"hljs-string"},"''"),t(`)
`),e("span",{class:"hljs-keyword"},"const"),t(" liteRichTextRef = "),e("span",{class:"hljs-title function_"},"ref"),t(`()
`),e("span",{class:"hljs-keyword"},"const"),t(),e("span",{class:"hljs-title function_"},"insertContent"),t(" = ("),e("span",{class:"hljs-params"}),t(`) => {
  `),e("span",{class:"hljs-keyword"},"const"),t(" content = "),e("span",{class:"hljs-variable language_"},"document"),t("."),e("span",{class:"hljs-title function_"},"createElement"),t("("),e("span",{class:"hljs-string"},"'span'"),t(`)
  content.`),e("span",{class:"hljs-property"},"innerText"),t(" = "),e("span",{class:"hljs-string"},"'这是插入内容'"),t(`
  content.`),e("span",{class:"hljs-property"},"style"),t("."),e("span",{class:"hljs-property"},"color"),t(" = "),e("span",{class:"hljs-string"},"'red'"),t(`
  content.`),e("span",{class:"hljs-property"},"style"),t("."),e("span",{class:"hljs-property"},"fontSize"),t(" = "),e("span",{class:"hljs-string"},"'30px'"),t(`
  liteRichTextRef.`),e("span",{class:"hljs-property"},"value"),t("."),e("span",{class:"hljs-title function_"},"insertContent"),t(`(content)
}
`)]),e("span",{class:"hljs-tag"},[t("</"),e("span",{class:"hljs-name"},"script"),t(">")]),t(`

`),e("span",{class:"hljs-tag"},[t("<"),e("span",{class:"hljs-name"},"style"),t(),e("span",{class:"hljs-attr"},"scoped"),t(">")])]),e("span",{class:"language-css"},[t(`
`),e("span",{class:"hljs-selector-class"},".actions"),t(` {
  `),e("span",{class:"hljs-attribute"},"margin-top"),t(": "),e("span",{class:"hljs-number"},"20px"),t(`;
}
`),e("span",{class:"hljs-selector-class"},".actions"),t(),e("span",{class:"hljs-selector-tag"},"span"),t(` {
  `),e("span",{class:"hljs-attribute"},"cursor"),t(`: pointer;
  `),e("span",{class:"hljs-attribute"},"padding"),t(": "),e("span",{class:"hljs-number"},"10px"),t(`;
  `),e("span",{class:"hljs-attribute"},"border"),t(": "),e("span",{class:"hljs-number"},"1px"),t(" solid "),e("span",{class:"hljs-number"},"#ccc"),t(`;
  `),e("span",{class:"hljs-attribute"},"border-radius"),t(": "),e("span",{class:"hljs-number"},"5px"),t(`;
}
`)]),e("span",{class:"language-xml"},[e("span",{class:"hljs-tag"},[t("</"),e("span",{class:"hljs-name"},"style"),t(">")]),t(`
`)])])],-1)])),default:E(()=>[f(N)]),_:1})]))}};export{U as category,Y as default,J as description,K as name,q as technologies,O as title};
