import{r as x}from"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";var f={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y=x,E=Symbol.for("react.element"),v=Symbol.for("react.fragment"),F=Object.prototype.hasOwnProperty,O=y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,h={key:!0,ref:!0,__self:!0,__source:!0};function u(o,r,t){var e,s={},m=null,c=null;t!==void 0&&(m=""+t),r.key!==void 0&&(m=""+r.key),r.ref!==void 0&&(c=r.ref);for(e in r)F.call(r,e)&&!h.hasOwnProperty(e)&&(s[e]=r[e]);if(o&&o.defaultProps)for(e in r=o.defaultProps,r)s[e]===void 0&&(s[e]=r[e]);return{$$typeof:E,type:o,key:m,ref:c,props:s,_owner:O.current}}n.Fragment=v;n.jsx=u;n.jsxs=u;f.exports=n;var l=f.exports;const R="_form_1mguo_1",j={form:R},p=o=>{const{className:r,...t}=o;return l.jsx("div",{className:`${r} ${j.form}`,...t,children:l.jsx("h1",{children:"Form Title "})})};try{p.displayName="Form",p.__docgenInfo={description:"",displayName:"Form",props:{}}}catch{}const S={title:"Example/Form",component:p,tags:["autodocs"],parameters:{layout:"fullscreen"}},a={};var _,i,d;a.parameters={...a.parameters,docs:{...(_=a.parameters)==null?void 0:_.docs,source:{originalSource:"{}",...(d=(i=a.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};const k=["ExampleForm"];export{a as ExampleForm,k as __namedExportsOrder,S as default};
