import{v as m}from"./v4-yQnnJER4.js";import{r as y}from"./index-4g5l5LRQ.js";var u={exports:{}},c={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f=y,P=Symbol.for("react.element"),D=Symbol.for("react.fragment"),N=Object.prototype.hasOwnProperty,k=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,E={key:!0,ref:!0,__self:!0,__source:!0};function _(a,t,o){var n,r={},l=null,i=null;o!==void 0&&(l=""+o),t.key!==void 0&&(l=""+t.key),t.ref!==void 0&&(i=t.ref);for(n in t)N.call(t,n)&&!E.hasOwnProperty(n)&&(r[n]=t[n]);if(a&&a.defaultProps)for(n in t=a.defaultProps,t)r[n]===void 0&&(r[n]=t[n]);return{$$typeof:P,type:a,key:l,ref:i,props:r,_owner:k.current}}c.Fragment=D;c.jsx=_;c.jsxs=_;u.exports=c;var e=u.exports;const T=a=>{const t=Object.keys(a[0]).join(",");return a.reduce((n,r)=>[...n,Object.values(r).join(",")],[t]).join(`
`)},$=async a=>await fetch(a).then(t=>t.text()),S=["Timetable published","Draft plan for public consultation published","Public consultation start","Public consultation end","Submit plan for examination","Examination hearing start","Planning inspectorate examination start","Planning inspectorate examination end","Planning inspectorate found sound","Examination hearing end","Inspector report published","Plan adopted"],s=new Date().toISOString().split("T")[0],R={reference:m(),name:"",description:"",developmentPlanType:"",periodStartDate:s,developmentPlanGeography:"",documentationUrl:"",adoptedDate:s,organisations:[],entryDate:s,startDate:s,timetableEvents:S.map(a=>({reference:m(),name:"",developmentPlan:"",developmentPlanEvent:a,eventDate:"",notes:"",organisation:"",entryDate:s,startDate:s,endDate:""}))},h=({plan:{name:a,description:t,adoptedDate:o,periodStartDate:n,periodEndDate:r,developmentPlanType:l,developmentPlanGeography:i,organisations:x,entryDate:v,startDate:j,endDate:b,documentationUrl:d,timetableEvents:g}})=>e.jsxs("div",{"data-testid":"plan-preview",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"govuk-heading-xl",children:a}),e.jsx("p",{className:"govuk-body-l",children:t})]}),e.jsxs("div",{className:"govuk-body",children:[e.jsx("p",{children:`Adopted: ${o}`}),e.jsx("p",{children:`Period Start: ${n}`}),e.jsx("p",{children:`Period End: ${r}`}),e.jsx("p",{children:`Plan Type: ${l}`}),e.jsx("p",{children:`Plan Geography: ${i}`}),e.jsx("p",{children:`Organisations: ${x}`}),e.jsx("p",{children:`Entry Date ${v}`}),e.jsx("p",{children:`Start Date: ${j}`}),e.jsx("p",{children:`End Date: ${b}`}),d&&e.jsx("a",{href:d,children:"Documentation"})]}),e.jsx("hr",{}),e.jsxs("table",{className:"govuk-table",children:[e.jsx("caption",{className:"govuk-table__caption govuk-table__caption--m",children:"Development Plan Timetable"}),e.jsx("thead",{className:"govuk-table__head",children:e.jsxs("tr",{className:"govuk-table__row",children:[e.jsx("th",{scope:"col",className:"govuk-table__header",children:"Event"}),e.jsx("th",{scope:"col",className:"govuk-table__header",children:"Date"})]})}),e.jsx("tbody",{className:"govuk-table__body",children:g.map(p=>e.jsxs("tr",{className:"govuk-table__row",children:[e.jsx("th",{scope:"row",className:"govuk-table__header",children:p.developmentPlanEvent}),e.jsx("td",{className:"govuk-table__cell",children:p.eventDate})]}))})]})]});try{h.displayName="PlanViewer",h.__docgenInfo={description:"",displayName:"PlanViewer",props:{plan:{defaultValue:null,description:"",name:"plan",required:!0,type:{name:"DevelopmentPlan"}}}}}catch{}export{R as D,h as P,e as j,$ as l,T as o};
