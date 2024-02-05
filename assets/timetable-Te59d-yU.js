import{r as p}from"./index-4g5l5LRQ.js";import{v as f}from"./v4-yQnnJER4.js";var l={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m=p,u=Symbol.for("react.element"),d=Symbol.for("react.fragment"),_=Object.prototype.hasOwnProperty,v=m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,S={key:!0,ref:!0,__self:!0,__source:!0};function c(t,e,o){var r,n={},s=null,i=null;o!==void 0&&(s=""+o),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(i=e.ref);for(r in e)_.call(e,r)&&!S.hasOwnProperty(r)&&(n[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)n[r]===void 0&&(n[r]=e[r]);return{$$typeof:u,type:t,key:s,ref:i,props:n,_owner:v.current}}a.Fragment=d;a.jsx=c;a.jsxs=c;l.exports=a;var j=l.exports;const x=t=>Object.entries(t.stages).map(([e,o])=>({reference:f(),name:"",developmentPlan:"dorcester-new-local-plan",developmentPlanEvent:e,eventDate:o,notes:"",organisation:t.LPA,entryDate:new Date().toISOString(),startDate:new Date().toISOString()})),w=t=>{const e=Object.keys(t[0]).join(", ");return t.reduce((r,n)=>[...r,Object.values(n).join(", ")],[e]).join(`
`)},D=async t=>await fetch(t).then(e=>e.text()),R=t=>new Date(t).toLocaleDateString("en-uk",{day:"numeric",year:"numeric",month:"long"});export{w as a,R as d,x as f,j,D as l};
