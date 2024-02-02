import{r as u}from"./index-4g5l5LRQ.js";import{v as j}from"./v4-yQnnJER4.js";import"./_commonjsHelpers-4gQjN7DL.js";var h={exports:{}},m={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var P=u,w=Symbol.for("react.element"),E=Symbol.for("react.fragment"),O=Object.prototype.hasOwnProperty,R=P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,C={key:!0,ref:!0,__self:!0,__source:!0};function S(t,e,s){var o,n={},i=null,l=null;s!==void 0&&(i=""+s),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(l=e.ref);for(o in e)O.call(e,o)&&!C.hasOwnProperty(o)&&(n[o]=e[o]);if(t&&t.defaultProps)for(o in e=t.defaultProps,e)n[o]===void 0&&(n[o]=e[o]);return{$$typeof:w,type:t,key:i,ref:l,props:n,_owner:R.current}}m.Fragment=E;m.jsx=S;m.jsxs=S;h.exports=m;var a=h.exports;const D="_form_i8080_1",F="_form-row_i8080_9",d={form:D,formRow:F},g=["Timetable published","Draft plan for public consultation published","Public consultation start","Public consultation end","Submit plan for examination","Examination hearing start","Planning inspectorate examination start","Planning inspectorate examination end","Planning inspectorate found sound","Examination hearing end","Inspector report published","Plan adopted"],T=t=>Object.entries(t.stages).map(([e,s])=>({reference:j(),name:"",developmentPlan:"dorcester-new-local-plan",developmentPlanEvent:e,eventDate:s,notes:"",organisation:t.LPA,entryDate:new Date().toISOString(),startDate:new Date().toISOString()})),L=t=>{const e=Object.keys(t[0]).join(", ");return t.reduce((o,n)=>[...o,Object.values(n).join(", ")],[e]).join(`
`)},I="",k=Object.fromEntries(g.map(t=>[t,I])),f=t=>{const{className:e,...s}=t,[o,n]=u.useState(""),[i,l]=u.useState(k),y=r=>{const p=T(r);return`data:text/csv;charset=urf-8, ${L(p)}`};return a.jsxs("div",{className:`${e} ${d.form}`,...s,children:[a.jsx("h1",{"data-testid":"form-title",children:"Timetable Form "}),a.jsxs("div",{className:d.formRow,children:["Local Planning Authority",a.jsx("input",{value:o,onChange:r=>n(r.target.value)})]}),g.map(r=>a.jsxs("div",{className:d.formRow,children:[r,a.jsx("input",{type:"month",value:i[r],"data-testid":`${r.replace(/ /gi,"-")}-input`,onChange:p=>l(_=>({..._,[r]:p.target.value}))})]},r)),a.jsx("a",{role:"button",type:"button","data-testid":"csv-download-button",href:y({LPA:o,stages:i}),download:"timetable.csv",children:a.jsx("button",{children:" Export Timetable CSV"})})]})};try{f.displayName="Form",f.__docgenInfo={description:"",displayName:"Form",props:{}}}catch{}const A={title:"Example/Form",component:f,tags:["autodocs"],parameters:{layout:"fullscreen"}},c={};var x,b,v;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:"{}",...(v=(b=c.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};const U=["ExampleForm"];export{c as ExampleForm,U as __namedExportsOrder,A as default};
