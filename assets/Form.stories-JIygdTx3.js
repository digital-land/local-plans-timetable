import{r as p}from"./index-4g5l5LRQ.js";import{v as S}from"./v4-yQnnJER4.js";import"./_commonjsHelpers-4gQjN7DL.js";var b={exports:{}},d={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $=p,E=Symbol.for("react.element"),P=Symbol.for("react.fragment"),C=Object.prototype.hasOwnProperty,w=$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,I={key:!0,ref:!0,__self:!0,__source:!0};function j(t,a,r){var n,o={},s=null,l=null;r!==void 0&&(s=""+r),a.key!==void 0&&(s=""+a.key),a.ref!==void 0&&(l=a.ref);for(n in a)C.call(a,n)&&!I.hasOwnProperty(n)&&(o[n]=a[n]);if(t&&t.defaultProps)for(n in a=t.defaultProps,a)o[n]===void 0&&(o[n]=a[n]);return{$$typeof:E,type:t,key:s,ref:l,props:o,_owner:w.current}}d.Fragment=P;d.jsx=j;d.jsxs=j;b.exports=d;var e=b.exports;const m=({label:t,onChange:a,value:r})=>e.jsx("div",{className:"govuk-form-group",children:e.jsxs("label",{className:"govuk-label",children:[t,e.jsx("input",{className:"govuk-input",type:"text",value:r,onChange:n=>a(n.target.value)})]})});try{m.displayName="TextInput",m.__docgenInfo={description:"",displayName:"TextInput",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(value: string) => void"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}}}}}catch{}const g=({value:t,label:a,name:r,onChange:n})=>{const[o="",s=""]=t.split("-");return e.jsx("div",{className:"govuk-form-group",children:e.jsxs("fieldset",{className:"govuk-fieldset",role:"group","aria-describedby":`${r}-hint`,children:[e.jsx("legend",{className:"govuk-fieldset__legend",children:a}),e.jsx("div",{id:`${r}-hint`,className:"govuk-hint",children:"For example, 3 2007"}),e.jsxs("div",{className:"govuk-date-input",children:[e.jsx("div",{className:"govuk-date-input__item",children:e.jsxs("div",{className:"govuk-form-group",children:[e.jsx("label",{className:"govuk-label govuk-date-input__label",htmlFor:`${r}-month`,children:"Month"}),e.jsx("input",{id:`${r}-month`,"data-testid":`${r}-month`,className:"govuk-input govuk-date-input__input govuk-input--width-2",type:"text",inputMode:"numeric",value:o,onChange:l=>n(`${l.target.value}-${s}`),maxLength:2})]})}),e.jsx("div",{className:"govuk-date-input__item",children:e.jsxs("div",{className:"govuk-form-group",children:[e.jsx("label",{className:"govuk-label govuk-date-input__label",htmlFor:`${r}-year`,children:"Year"}),e.jsx("input",{id:`${r}-year`,"data-testid":`${r}-year`,className:"govuk-input govuk-date-input__inpaut govuk-input--width-4",type:"text",inputMode:"numeric",value:s,onChange:l=>n(`${o}-${l.target.value}`),maxLength:4})]})})]})]})})};try{g.displayName="DateInput",g.__docgenInfo={description:"",displayName:"DateInput",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(value: string) => void"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}}}}}catch{}const O=t=>Object.entries(t.stages).map(([a,r])=>({reference:S(),name:"",developmentPlan:"dorcester-new-local-plan",developmentPlanEvent:a,eventDate:r,notes:"",organisation:t.LPA,entryDate:new Date().toISOString(),startDate:new Date().toISOString()})),D=t=>{const a=Object.keys(t[0]).join(", ");return t.reduce((n,o)=>[...n,Object.values(o).join(", ")],[a]).join(`
`)},k=["Timetable published","Draft plan for public consultation published","Public consultation start","Public consultation end","Submit plan for examination","Examination hearing start","Planning inspectorate examination start","Planning inspectorate examination end","Planning inspectorate found sound","Examination hearing end","Inspector report published","Plan adopted"],V="_form_1mguo_1",h={form:V},F="",T=Object.fromEntries(k.map(t=>[t,F])),v=t=>{const{className:a,...r}=t,[n,o]=p.useState(""),[s,l]=p.useState(T),N=i=>{const c=O(i);return`data:text/csv;charset=urf-8, ${D(c)}`};return e.jsxs("div",{className:`${a} ${h.form}`,...r,children:[e.jsx("h1",{className:"govuk-heading-xl","data-testid":"form-title",children:"Timetable Form"}),e.jsx("div",{className:h.formRow,children:e.jsx(m,{label:"Local planning authority",onChange:o,value:n})}),k.map(i=>e.jsx("div",{children:e.jsx(g,{value:s[i],label:i,name:`${i.split(" ").join("-")}-date`,onChange:c=>l(_=>({..._,[i]:c}))})},i)),e.jsx("a",{role:"button",type:"button","data-testid":"csv-download-button",href:N({LPA:n,stages:s}),download:"timetable.csv",children:e.jsx("button",{children:" Export Timetable CSV"})})]})};try{v.displayName="Form",v.__docgenInfo={description:"",displayName:"Form",props:{}}}catch{}const A={title:"Example/Form",component:v,tags:["autodocs"],parameters:{layout:"fullscreen"}},u={};var x,f,y;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:"{}",...(y=(f=u.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};const M=["ExampleForm"];export{u as ExampleForm,M as __namedExportsOrder,A as default};