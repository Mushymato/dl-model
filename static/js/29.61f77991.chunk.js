(this["webpackJsonpdl-model"]=this["webpackJsonpdl-model"]||[]).push([[29],{126:function(e,t,n){},135:function(e,t,n){"use strict";var a=n(14),i=n(11),c=n(56),l=n(168),s=n(151),r=n(137),d=n.n(r),o=n(136),j=n.n(o);n(126);t.a=function(e){var t=e.children,n=e.openAtStart,r=void 0!==n&&n,o=e.title,u=e.titleButton,b=Object(c.a)(r),p=Object(a.a)(b,2),v=p[0],h=p[1];return Object(i.jsxs)("div",{className:"AdvancedSettingsGroup",children:[Object(i.jsxs)("div",{className:"AdvancedSettingsGroup-header",onClick:h,children:[Object(i.jsx)(s.a,{size:"small",children:v?Object(i.jsx)(j.a,{}):Object(i.jsx)(d.a,{})}),Object(i.jsx)("div",{className:"AdvancedSettingsGroup-title",children:o}),u&&Object(i.jsx)("div",{className:"AdvancedSettingsGroup-titleBtn",children:u})]}),Object(i.jsx)(l.a,{in:v,timeout:"auto",unmountOnExit:!0,children:t})]})}},396:function(e,t,n){"use strict";n.r(t);var a=n(11),i=n(1),c=n(98),l=n(460),s=n(208),r=n(135),d=n(20),o=(n(126),n(7)),j=Object(i.lazy)((function(){return Promise.all([n.e(2),n.e(39)]).then(n.bind(null,399))}));t.default=function(e){var t=e.openControl,n=Object(i.useContext)(d.b).model.materialType,u=Object(i.useContext)(d.a),b=o.h.map((function(e){return Object(a.jsx)(s.a,{value:e,children:e},e)})),p=Object(a.jsx)(c.a,{variant:"contained",onClick:function(e){e.stopPropagation();var t={type:"reset",key:"model",value:["materialType"]};u(t),t.key="materialParams",t.value="",u(t)},children:"Reset"});return Object(a.jsx)(r.a,{title:"Material",titleButton:p,children:Object(a.jsxs)("div",{className:"AdvancedSettingsGroup-options",children:[Object(a.jsx)("div",{className:"AdvancedSettingsGroup-optionName",children:"Type"}),Object(a.jsx)("div",{children:Object(a.jsx)(l.a,{fullWidth:!0,onChange:function(e){var t=e.target.value;u({type:"update",key:"model",value:{materialType:t}})},value:n,children:b})}),Object(a.jsx)(i.Suspense,{fallback:Object(a.jsx)("div",{children:"Loading"}),children:Object(a.jsx)(j,{materialType:n,openControl:t})})]})})}}}]);
//# sourceMappingURL=29.61f77991.chunk.js.map