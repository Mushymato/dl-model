(this["webpackJsonpdl-model"]=this["webpackJsonpdl-model"]||[]).push([[7],{10:function(e,t,n){"use strict";n.d(t,"n",(function(){return d})),n.d(t,"m",(function(){return f})),n.d(t,"b",(function(){return m})),n.d(t,"l",(function(){return h})),n.d(t,"f",(function(){return v})),n.d(t,"g",(function(){return g})),n.d(t,"i",(function(){return O})),n.d(t,"h",(function(){return y})),n.d(t,"k",(function(){return x})),n.d(t,"c",(function(){return S})),n.d(t,"d",(function(){return I})),n.d(t,"a",(function(){return L})),n.d(t,"e",(function(){return T})),n.d(t,"j",(function(){return C}));var a=n(72),r=n(50),i=n(14),o=n(0),c=n(39),s=n(101),u=n(75),l=n(29),d=function(e){return e&&new Promise((function(t){(new u.a).load(e,t)}))},f=function(e){return"".concat(c.b,"/fbx/").concat(e,"/").concat(e,".fbx")},p=function(e){return"".concat(c.b,"/fbx/").concat(e,"/").concat(e,".png")},m=function(e){if(!e)return"";var t=e.endsWith("b"),n=e.substring(0,e.length-1);return{modelPath:f(n),texturePath:p(n),flipped:t,isSheath:Object(l.n)(n)}},h=function(e){if(e){var t=new Set,n=function(e){return e&&function(e){return!t.has(e.uuid)}(e)},a=function(e){n(e)&&function(e){t.add(e.uuid),e.dispose()}(e)};e.traverse((function(e){e.isMesh&&(Object(l.b)(e.material,(function(e){e.map&&a(e.map),e.backupMap&&a(e.backupMap),a(e)})),a(e.geometry))}))}},b=function(e,t){var n="Mesh".concat(e,"Material");return new o[n](t)},v=function(e){var t=e.target,n=e.materialType,a=void 0===n?"Basic":n,r=e.texturePath;t&&t.traverse((function(e){if(e.isMesh&&"outline"!==e.name){var t="isMesh".concat(a,"Material"),n=e.material;if(Array.isArray(n)){if(n.every((function(e){return e[t]}))&&!r)return;n.forEach((function(t,i){var c=r?(new o.TextureLoader).load(r):n[i].map;r&&(c.encoding=o.sRGBEncoding);var s=b(a,{map:c,skinning:!0});s.name=t.name,t.backupMap&&(s.backupMap=t.backupMap),r&&n[i].map&&n[i].map.dispose(),n[i].dispose(),e.material[i]=s}))}else{if(n[t]&&!r)return;var i=r?(new o.TextureLoader).load(r):n.map;r&&(i.encoding=o.sRGBEncoding);var c=b(a,{map:i,skinning:!0});c.name=n.name,n.backupMap&&(c.backupMap=n.backupMap),r&&n.map&&n.map.dispose(),n.dispose(),e.material=c}}}))},g=function(e,t){var n=e.material;Object(l.b)(n,(function(e){e.opacity=t}))},j=function(e,t){e.fog=!e.fog,e.needsUpdate=!0,e.onBeforeCompile=function(e){var n="\n                vec3 transformed = position + objectNormal*".concat(5e-4*t,";\n            ");e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",n)},setTimeout((function(){e.fog=!e.fog,e.needsUpdate=!0}),100)},O=function(e,t){var n=e.material;if(Array.isArray(n)){var a=new Set;n.forEach((function(e){a.has(e.uuid)||(j(e,t),a.add(e.uuid))}))}else j(n,t)},y=function(e,t){var n=e.material;if(Array.isArray(n)){var a=new Set;n.forEach((function(e){a.has(e.uuid)||(e.color=new o.Color(t),a.add(e.uuid))}))}else n.color=new o.Color(t)},x=function(e,t){if(e){var n=[];return e.traverse((function(e){if(e.isMesh){var a=e.clone();a.name="outline",a.visible=t.enable,n.push(a),!function(e,t){Object(l.b)(e.material,(function(e){e.map&&e.map.dispose(),e.dispose()})),Array.isArray(e.material)?e.material=new Array(e.material.length).fill(t):e.material=t}(a,function(e){var t=e.size,n=e.color,a=e.opacity,r=new o.MeshToonMaterial({color:n,opacity:a,side:o.BackSide,transparent:!0,skinning:!0});return r.onBeforeCompile=function(e){var n="\n            vec3 transformed = position + objectNormal*".concat(5e-4*t,";\n        ");e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",n)},r}(t)),e.isSkinnedMesh&&a.bind(e.skeleton,e.bindMatrix),e.parent.add(a)}})),n}},w=function(e){return function(t){var n=t.target,a=t.offset;n.traverse((function(t){if("mBodyAll"===t.name&&3===t.geometry.groups.length){var n=t.geometry.groups.find((function(n){return t.material[n.materialIndex].name==="mt".concat(e,"CH")}));if(n){for(var r=n.start,i=r+n.count,o=t.geometry.attributes.uv,c=r;c<i;c++){var s=o.getX(c)+.25*a.x,u=o.getY(c)+.25*a.y;o.setXY(c,s,u)}o.needsUpdate=!0}}}))}},k=w("Eye"),A=w("Mouth"),S=(w("BodyAll"),function(e){0===e.offset.x&&0===e.offset.y||(k(e),A(e))}),_=function(e){return function(t){var n=t.target,a=t.materialType,r=void 0===a?"Basic":a,i=t.textureId,c=p(i),s=(new o.TextureLoader).load(c);s.encoding=o.sRGBEncoding;var u=b(r,{map:s,skinning:!0});n.traverse((function(t){if("mBodyAll"===t.name&&3===t.geometry.groups.length){var n=t.geometry.groups.find((function(n){return t.material[n.materialIndex].name==="mt".concat(e,"CH")}));if(n){var a=n.materialIndex;u.name=t.material[a].name,t.material[a]=u}}}))}},M=_("Eye"),P=_("Mouth"),I=(_("BodyAll"),function(e){M(e),P(e)}),L=function(e){if(!e)return["",""];for(var t=e.split(">"),n=t.length,o=[],c=[],s=0;s<n;s++){var u,l=1,d=1,f=null,p=null,m=null,h=void 0,b=t[s].split("+");if(1===b.length)h=b[0];else{var v=Object(i.a)(b,2);m=v[0],h=v[1],f=o.length-1}if(m&&(f=o.length,o.push(m)),h.includes("&")){var g=h.split("&"),j=Object(r.a)(g),O=j[0],y=j.slice(1);p=O;var x,w=Object(a.a)(y);try{for(w.s();!(x=w.n()).done;){var k=x.value.split("="),A=Object(i.a)(k,2),S=A[0],_=A[1];"ts"===S&&(l=parseFloat(_)),"r"===S&&(d="inf"===_?1/0:parseInt(_))}}catch(M){w.e(M)}finally{w.f()}}else p=h;u={fileIdx:f,aniName:p,timeScale:l,repetitions:d},c.push(u)}return[o,c]},T=function(e,t){var n=L(e),a=Object(i.a)(n,2),r=a[0],o=a[1],c=o.length;return o.map((function(e,n){var a=e.fileIdx,i=e.aniName,o=e.timeScale,u=e.repetitions;return{name:t.concat(c>1?"#".concat(n+1):""),fileName:r[a],aniName:i,timeScale:o,repetitions:u,id:Object(s.a)()}}))},C=function(e){var t=new Uint8Array(e).map((function(t,n){return 256*n/e})),n=new o.DataTexture(t,e,1,o.LuminanceFormat);return n.minFilter=o.NearestFilter,n.magFilter=o.NearestFilter,n.generateMipmaps=!1,n}},20:function(e,t,n){"use strict";n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return f})),n.d(t,"d",(function(){return p})),n.d(t,"c",(function(){return m}));var a=n(14),r=n(8),i=n(11),o=n(1),c=n(9),s=n(7),u=function(e,t){var n=t.type,a=t.key,i=t.subkey,o=t.value;switch(n){case"toggle":var u;return i?(u=e[a][i][o],Object(r.a)(Object(r.a)({},e),{},Object(c.a)({},a,Object(r.a)(Object(r.a)({},e[a]),{},Object(c.a)({},i,Object(r.a)(Object(r.a)({},e[a][i]),{},Object(c.a)({},o,!u))))))):(u=e[a][o],Object(r.a)(Object(r.a)({},e),{},Object(c.a)({},a,Object(r.a)(Object(r.a)({},e[a]),{},Object(c.a)({},o,!u)))));case"reset":var l=i?s.p[a][i]:s.p[a];if(!o)return i?Object(r.a)(Object(r.a)({},e),{},Object(c.a)({},a,Object(r.a)(Object(r.a)({},e[a]),{},Object(c.a)({},i,Object(r.a)(Object(r.a)({},e[a][i]),l))))):Object(r.a)(Object(r.a)({},e),{},Object(c.a)({},a,Object(r.a)(Object(r.a)({},e[a]),l)));var d={};return o.forEach((function(e){d[e]=l[e]})),i?Object(r.a)(Object(r.a)({},e),{},Object(c.a)({},a,Object(r.a)(Object(r.a)({},e[a]),{},Object(c.a)({},i,Object(r.a)(Object(r.a)({},e[a][i]),d))))):Object(r.a)(Object(r.a)({},e),{},Object(c.a)({},a,Object(r.a)(Object(r.a)({},e[a]),d)));case"load":return;case"update":return i?Object(r.a)(Object(r.a)({},e),{},Object(c.a)({},a,Object(r.a)(Object(r.a)({},e[a]),{},Object(c.a)({},i,Object(r.a)(Object(r.a)({},e[a][i]),o))))):Object(r.a)(Object(r.a)({},e),{},Object(c.a)({},a,Object(r.a)(Object(r.a)({},e[a]),o)));default:return e}},l=n(10),d=Object(o.createContext)(),f=Object(o.createContext)(),p={chainMaker:{chain:Object(l.e)(s.p.animation.code,"init")}};function m(e){var t=Object(o.useReducer)(u,p),n=Object(a.a)(t,2),r=n[0],c=n[1];return Object(i.jsx)(d.Provider,{value:r,children:Object(i.jsx)(f.Provider,{value:c,children:e.children})})}Object.keys(s.p).forEach((function(e){return p[e]=Object(r.a)({},s.p[e])}))},29:function(e,t,n){"use strict";n.d(t,"m",(function(){return u})),n.d(t,"n",(function(){return l})),n.d(t,"b",(function(){return d})),n.d(t,"p",(function(){return f})),n.d(t,"e",(function(){return p})),n.d(t,"c",(function(){return m})),n.d(t,"o",(function(){return h})),n.d(t,"d",(function(){return b})),n.d(t,"a",(function(){return v})),n.d(t,"k",(function(){return g})),n.d(t,"l",(function(){return j})),n.d(t,"g",(function(){return O})),n.d(t,"j",(function(){return y})),n.d(t,"f",(function(){return x})),n.d(t,"h",(function(){return w})),n.d(t,"i",(function(){return k}));var a=n(50),r=n(11),i=n(97),o=n(20),c=n(7),s=n(10),u=function(e){return e.startsWith("w302")},l=function(e){return u(e)&&e.endsWith("02")},d=function(e,t){Array.isArray(e)?e.forEach((function(e){return t(e)})):t(e)},f=function(e){if(0!==e.length){var t=!1;e.forEach((function(e){if(e){var n=e.split("="),r=Object(a.a)(n),i=r[0],u=r.slice(1);if(u[0]){var l=1===u.length?u[0]:u.join("=");switch(i){case"ft":t=!0;break;case"cc":var d=Object(s.e)(l,"Animation");o.d.chainMaker.chain=d;break;case"bg":"transparent"!==l&&(l="#".concat(l));break;case"cam":l=l.split(",").map((function(e){return parseFloat(e)}))}var f=c.t[i],p=f.group,m=f.key,h="true"===l||"false"===l;o.d[p][m]=h?Boolean("true"===l):l}}})),o.d.model.texture=o.d.model.id,t||(o.d.model.faceTexture=o.d.model.id)}},p=function(e){var t={timeScale:1,repetitions:1},n={ts:"timeScale",r:"repetitions"},a=e.length,r="";return e.forEach((function(i,o){var c=i.fileName,s=i.aniName;c&&(r=(r=0===o?r.concat(c):r.concat(c!==e[o-1].fileName?c:"")).concat("+")),r=r.concat(s),Object.keys(n).forEach((function(e){var a=n[e];i[a]!==t[a]&&(r=r.concat("&".concat(e,"=").concat(i[a])))})),o<a-1&&(r=r.concat(">"))})),r},m=function(e){var t={};return Object.keys(e).forEach((function(n){var a=[];Object.keys(e[n]).forEach((function(t){e[n][t]&&a.push(t)})),t[n]=a})),t},h=function(e,t){var n=Object.keys(t);return e.filter((function(e){return n.every((function(n){return!t[n].length||t[n].includes(e[n])}))}))},b=function(e){var t=e.replace("#","0x");return"#".concat(("000000"+("0xffffff"^t).toString(16)).slice(-6))},v=function(e,t,n){if(!e)return null;var a={maxWidth:"13.5rem"};return Object.keys(e).map((function(o){return Object(r.jsx)(i.a,{variant:"contained","data-value":e[o],"data-name":"".concat(n?"".concat(n," "):"").concat(o),onClick:t,style:a,children:o},o)}))},g=function(e,t){return"LOB_".concat(c.i[e],"+").concat(c.i[e],"_ONT_").concat(c.g[t])},j=function(e){return"WIN_".concat(c.i[e],"+").concat(c.i[e],"_WIN_01>+").concat(c.i[e],"_WIN_02")},O=function(e){return"DAS+".concat(c.i[e],"_DAS_02")},y=function(e){return"ROL+".concat(c.i[e],"_ROL_01")},x=function(e){for(var t=c.b[e],n=c.i[e],a="CMB_".concat(n),r=1;r<=t;r++)a=a.concat("+".concat(n,"_CMB_0").concat(r,">"));return a=a.slice(0,-1)},w=function(e){for(var t=c.f[e],n=c.i[e],a="FS_".concat(n),r=1;r<=t;r++)a=a.concat("+".concat(n,"_CHR_0").concat(r,">"));return a=a.slice(0,-1)},k=function(e,t){var n=c.i[e];return"Male"===t?"LOB_".concat(n,"+").concat(n,"_ONT_05&ts=-0.5>+").concat(n,"_ONT_02>+").concat(n,"_ONT_07>+").concat(n,"_ONT_08>+").concat(n,"_ONT_21"):"LOB_".concat(n,"+").concat(n,"_ONT_06&ts=-0.5>+").concat(n,"_ONT_04>+").concat(n,"_ONT_09>+").concat(n,"_ONT_10>+").concat(n,"_ONT_23")}},39:function(e,t,n){"use strict";n.d(t,"b",(function(){return R}));var a=n(8),r=n(11),i=n(20),o=n(54),c=n(13),s=n(14),u=n(1),l=n(56),d=n(74),f=n.n(d),p=n(120),m=n(69),h=n(18),b=n.n(h),v=n(32),g=n(34),j=n(3),O=n(6),y=n(26),x=n(4),w=n(5),k=n(0),A=n(73),S=n(7),_=n(43),M=n(10),P=n(29),I=function(e){Object(x.a)(n,e);var t=Object(w.a)(n);function n(){var e;Object(j.a)(this,n);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).initScene=function(){var t,n;e.models={},e.modelInfo={main:e.props.model.id,weaponLeft:Object(M.b)(e.props.model.weaponLeft),weaponRight:Object(M.b)(e.props.model.weaponRight)},e.materials=[],e.outlines={},e.outlineParams=Object(a.a)({},e.props.outline),e.viewport=e.props.viewport||{width:window.innerWidth,height:window.innerHeight},e.mixers=[],e.clock=new k.Clock,e.scene=new k.Scene,e.scene.background="transparent"!==e.props.bgColor?new k.Color(e.props.bgColor):null;var r=new k.PlaneBufferGeometry(.1,.1);r.rotateX(Math.PI/2);var i=new k.MeshBasicMaterial;i.visible=!1,e.floor=new k.Mesh(r,i),e.scene.add(e.floor),e.camera=new k.PerspectiveCamera(S.a.angle,e.viewport.width/e.viewport.height,S.a.near,S.a.far),e.cameraPosition=e.props.cameraPosition||[2,0,10],(t=e.camera.position).set.apply(t,Object(g.a)(e.cameraPosition)),e.camera.updateProjectionMatrix(),e.controls=new A.a(e.camera,e.mount),e.controlsPosition=e.props.controlsPosition||[0,0,0],(n=e.controls.target).set.apply(n,Object(g.a)(e.controlsPosition)),e.controls.update();var o=new k.DirectionalLight(16777215);o.position.set(50,0,100),o.intensity=.8,e.scene.add(o),o=new k.AmbientLight(4473924),e.scene.add(o),e.rendererAA=new k.WebGLRenderer({antialias:!0,alpha:!0}),e.rendererAA.outputEncoding=k.sRGBEncoding,e.rendererNoAA=new k.WebGLRenderer({antialias:!1,alpha:!0}),e.rendererNoAA.outputEncoding=k.sRGBEncoding,e.renderer=e.props.antiAliasing?e.rendererAA:e.rendererNoAA,e.canvas=e.renderer.domElement,e.renderer.setSize(e.viewport.width,e.viewport.height),e.mount.appendChild(e.canvas),e.animate()},e.initLoad=function(){var t,n,a=e.modelInfo.main,r=Object(M.m)(a),i=Object(M.n)(r),o=null===(t=e.modelInfo.weaponRight)||void 0===t?void 0:t.modelPath,c=Object(M.n)(o),s=null===(n=e.modelInfo.weaponLeft)||void 0===n?void 0:n.modelPath,u=Object(M.n)(s);return Promise.all([i,c,u])},e.attachWeapon=function(t,n){var a="jWeapon".concat(n[0]);e.models.main.traverse((function(e){e.name===a&&0===e.children.length&&e.add(t)}))},e.detachWeapon=function(t){var n="jWeapon".concat(t[0]);e.models.main.traverse((function(a){1===a.children.length&&a.name===n&&"Group"===a.children[0].type&&a.remove(e.models["weapon".concat(t)])}))},e.saveMaterialReference=function(){e.materials=[],e.models.main.traverse((function(t){if(t.isMesh&&"outline"!==t.name){var n=t.material;Array.isArray(n)?e.materials=e.materials.concat(n):e.materials.push(n)}}))},e.playNextAni=function(){e.props.capture.enable&&e._aniIdx===e.nAni-1&&(e.mediaRecorder.stop(),e.props.toggleCapture());var t=(e._aniIdx+1)%e.nAni;e.aniIdx=t},e.addAnimationChain=function(){var t=Object(v.a)(b.a.mark((function t(n,a,r){var i,o,c,u,l,d,f;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return");case 2:return i=Object(M.a)(a),o=Object(s.a)(i,2),c=o[0],u=o[1],e.nAni=u.length,e.props.setIsLoading(!0),n.mixer=new k.AnimationMixer(n),e.mixers.push(n.mixer),e._aniIdx=0,n.mixer.timeScale=r,n.mixer.addEventListener("finished",e.playNextAni),e.aniSettings=u.map((function(e){return{timeScale:e.timeScale,repetitions:e.repetitions}})),l=c.map((function(e){var t="".concat(R,"/fbx/").concat(e,".fbx");return Object(M.n)(t)})),d=[],t.next=15,Promise.all(l);case 15:f=t.sent,u.forEach((function(e){var t=e.fileIdx,n=e.aniName,a=n?f[t].animations.find((function(e){return e.name===n})):f[t].animations[0];d.push(a)})),e.animations=d,e.aniIdx=0,e.props.setIsLoading(!1);case 20:case"end":return t.stop()}}),t)})));return function(e,n,a){return t.apply(this,arguments)}}(),e.updateViewport=function(t,n){var a=n.width,r=n.height;t.width===a&&t.height===r||(e.renderer.setSize(a,r),e.camera.aspect=a/r,e.camera.updateProjectionMatrix())},e.captureAnimation=function(){e.chunks=[],e.videoStream=e.canvas.captureStream(30),e.mediaRecorder||(e.mediaRecorder=new MediaRecorder(e.videoStream,{mimeType:e.props.capture.codec}),e.mediaRecorder.ondataavailable=function(t){return e.chunks.push(t.data)},e.mediaRecorder.onstop=function(){e.props.setIsLoading(!1);var t=new Blob(e.chunks,{type:"video/webm"}),n=URL.createObjectURL(t),a=document.createElement("a");document.body.appendChild(a),a.style="display: none",a.href=n,a.download="animation.webm",a.click(),window.URL.revokeObjectURL(n)}),e.props.setIsLoading(!0),e.aniIdx=0,e.mediaRecorder.start()},e.updateAA=function(){var t=new k.Vector2;e.renderer.getSize(t),e.renderer=e.props.antiAliasing?e.rendererAA:e.rendererNoAA,e.renderer.setSize(t.x,t.y),e.mount.removeChild(e.canvas),e.canvas=e.renderer.domElement,e.mount.appendChild(e.canvas)},e.updateMainModel=function(){var t=Object(v.a)(b.a.mark((function t(n,a){var r,i,o,c,s,u,l,d,f,p,m,h,v,g,j,O,y,x,w,k,A,P,I;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=a.texture,i=a.faceTexture,o=r!==i,c="face".concat(a.face),s=S.r[c],n.id===a.id){t.next=30;break}return e.props.setIsLoading(!0),u=Object(M.m)(a.id),t.next=9,Object(M.n)(u);case 9:l=t.sent,d=a.materialType,Object(M.f)({target:l,materialType:d}),e.outlines.main=Object(M.k)(l,e.outlineParams),["Right","Left"].forEach((function(t){var a="weapon".concat(t);n[a]&&e.detachWeapon(t)})),e.floor.remove(e.models.main),Object(M.l)(e.models.main),e.models.main=l,l.initPos=l.position.clone(),l.initRot=l.rotation.clone(),e.floor.add(l),o&&Object(M.d)({target:l,materialType:d,textureId:i}),0===s.x&&0===s.y||Object(M.c)({target:l,offset:s}),["Right","Left"].forEach((function(t){var n="weapon".concat(t),a=e.models[n];a&&(e.attachWeapon(a,t),e.outlines[n]||(e.outlines[n]=Object(M.k)(a,e.outlineParams)))})),f=e.props.animation,p=f.code,m=f.timeScale,e.addAnimationChain(l,p,m),e.saveMaterialReference(),e.applyMaterialParams(),e.props.setIsLoading(!1),t.next=33;break;case 30:h=n.faceTexture!==i,(n.face!==a.face||h)&&(v="face".concat(n.face),g="face".concat(a.face),j=S.r[v],O=S.r[g],y=O.x-j.x,x=O.y-j.y,w={x:0,y:0},h&&(k=a.materialType,Object(M.d)({target:e.models.main,materialType:k,textureId:i}),A=_.a[n.faceTexture]||{x:0,y:0},P=_.a[i]||{x:0,y:0},w={x:P.x-A.x,y:P.y-A.y},e.saveMaterialReference(),e.applyMaterialParams()),I={x:y+w.x,y:x+w.y},Object(M.c)({target:e.models.main,offset:I}));case 33:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),e.updateWeapons=function(){var t=Object(v.a)(b.a.mark((function t(n,a){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:["Right","Left"].forEach(function(){var t=Object(v.a)(b.a.mark((function t(r){var i,o,c,s,u,l;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i="weapon".concat(r),n[i]!==a[i]){t.next=3;break}return t.abrupt("return");case 3:if(e.detachWeapon(r),Object(M.l)(e.models[i]),a[i]){t.next=10;break}return e.models[i]=null,e.modelInfo[i]="",e.outlines[i]=null,t.abrupt("return");case 10:return e.props.setIsLoading(!0),e.modelInfo[i]=Object(M.b)(e.props.model[i]),o=e.modelInfo[i],c=o.modelPath,s=o.texturePath,t.next=15,Object(M.n)(c);case 15:u=t.sent,e.models[i]=u,l=a.materialType,Object(M.f)({target:e.models[i],materialType:l,texturePath:s}),e.modelInfo[i].flipped&&(e.models[i].rotation.y=Math.PI),e.outlines[i]=Object(M.k)(u,e.outlineParams),e.attachWeapon(u,r),e.saveMaterialReference(),e.applyMaterialParams(),e.props.setIsLoading(!1);case 25:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),e.updateModel=function(){var t=Object(v.a)(b.a.mark((function t(n,a){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(Object.keys(n).some((function(e){return n[e]!==a[e]}))){t.next=3;break}return t.abrupt("return");case 3:return t.next=5,e.updateMainModel(n,a);case 5:e.updateWeapons(n,a);case 6:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),e.updateAnimation=function(t,n){var a=n.code,r=n.timeScale;if(t.code!==a){var i=e.models.main;if(t.code){i.mixer.stopAllAction();var o=i.initPos,c=i.initRot;i.position.copy(o),i.rotation.copy(c),e.mixers=[],e.animations=[]}e.addAnimationChain(i,a,r)}else t.timeScale!==r&&e.mixers.forEach((function(e){return e.timeScale=r}))},e.updateOutline=function(t,n){e.outlineParams=Object(a.a)({},n);var r=Object.keys(n).filter((function(e){return t[e]!==n[e]}));if(0!==r.length){var i=n.enable,o=n.size,c=n.opacity,s=n.color;Object.keys(e.outlines).forEach((function(t){var n=e.outlines[t];n&&n.forEach((function(e){r.includes("enable")&&(e.visible=i),r.includes("size")&&Object(M.i)(e,o),r.includes("opacity")&&Object(M.g)(e,c),r.includes("color")&&Object(M.h)(e,s)}))}))}},e.applyMaterialParams=function(){var t=e.props.model.materialType,n=e.props.materialParams,a=Object(y.a)(e).materials,r=[].concat(Object(g.a)(S.w),Object(g.a)(S.x[t]));a.forEach((function(e){if(S.q.forEach((function(t){r.includes(t)&&(e[t]=n[t])})),S.u.forEach((function(t){if(r.includes(t)){var a=n[t],i=new k.Color(a);e[t]=i}})),n.useTexture||(e.map&&(e.backupMap=e.map),e.map=null),n.flatShading&&(e.flatShading=n.flatShading,e.needsUpdate=!0),"Toon"===t&&"none"!==n.gradientMap){var i,o=parseInt(n.gradientMap);i=Object(M.j)(o),a.forEach((function(e){e.gradientMap=i,e.needsUpdate=!0}))}}))},e.updateMaterialParams=function(t,n){var a=e.props.model.materialType,r=n.useTexture,i=n.flatShading,o=n.gradientMap,c=Object(y.a)(e).materials,s=[].concat(Object(g.a)(S.w),Object(g.a)(S.x[a]));if(S.q.forEach((function(e){s.includes(e)&&t[e]!==n[e]&&c.forEach((function(t){return t[e]=n[e]}))})),S.u.forEach((function(e){if(s.includes(e)&&t[e]!==n[e]){var a=n[e],r=new k.Color(a);c.forEach((function(t){return t[e]=r}))}})),t.useTexture!==r&&(r?c.forEach((function(e){e.map=e.backupMap,delete e.backupMap,e.needsUpdate=!0})):c.forEach((function(e){e.backupMap=e.map,e.map=null,e.needsUpdate=!0}))),t.flatShading!==i&&c.forEach((function(e){e.flatShading=i,e.needsUpdate=!0})),t.gradientMap!==o){var u=null;if("none"!==o){var l=parseInt(o);u=Object(M.j)(l)}c.forEach((function(e){e.gradientMap=u,e.needsUpdate=!0}))}},e.updateMaterial=function(t,n){if(t.model.materialType!==n.model.materialType){var a=n.model.materialType;return Object(M.f)({target:e.models.main,materialType:a}),e.saveMaterialReference(),void e.applyMaterialParams()}e.updateMaterialParams(t.materialParams,n.materialParams)},e.setBackground=function(t){e.scene.background="transparent"!==t?new k.Color(t):null},e.animate=function(){e.frameId=requestAnimationFrame(e.animate);var t=e.clock.getDelta();e.floor.rotateY(e.props.rotateSpeed*t*Math.PI/2),e.mixers.forEach((function(e){return e.update(t)})),e.renderer.render(e.scene,e.camera)},e}return Object(O.a)(n,[{key:"componentDidMount",value:function(){var e=Object(v.a)(b.a.mark((function e(){var t,n,a,r,i,o,c,u,l,d,f,p,m,h,v,g,j,O,y,x,w,k,A,I,L=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.initScene(),this.props.setIsLoading(!0),e.next=4,this.initLoad();case 4:if(t=e.sent,n=Object(s.a)(t,3),a=n[0],r=n[1],i=n[2],this.models={main:a,weaponRight:r,weaponLeft:i},this.outlines.main=Object(M.k)(a,this.outlineParams),a.initPos=a.position.clone(),a.initRot=a.rotation.clone(),o=this.props.model.materialType,Object(M.f)({target:a,materialType:o}),(c=this.props.model.id).startsWith("c")&&!c.endsWith("_h")&&!S.s.has(c)){e.next=21;break}return Object(P.m)(c)&&(u=Object(M.b)(c+"n"),l=u.texturePath,Object(M.f)({target:a,materialType:o,texturePath:l})),this.floor.add(a),this.props.setIsLoading(!1),e.abrupt("return");case 21:["Right","Left"].forEach((function(e){var t="weapon".concat(e);if(L.props.model[t]){var n=L.modelInfo[t],a=L.models[t],r=n.texturePath;Object(M.f)({target:a,materialType:o,texturePath:r}),a.rotation.y+=n.flipped?Math.PI:0,L.outlines[t]=Object(M.k)(a,L.outlineParams),L.attachWeapon(L.models["weapon".concat(e)],e)}})),d=this.props.model,f=d.texture,p=d.faceTexture,m=f!==p,h="face".concat(this.props.model.face),v=S.r[h],g=v.x,j=v.y,(0!==g||0!==j||m)&&(O={x:0,y:0},m&&(Object(M.d)({target:a,materialType:o,textureId:p}),y=_.a[f]||{x:0,y:0},x=_.a[p]||{x:0,y:0},O={x:x.x-y.x,y:x.y-y.y}),w={x:g+O.x,y:j+O.y},Object(M.c)({target:a,offset:w})),this.saveMaterialReference(),this.applyMaterialParams(),this.floor.add(a),this.props.setIsLoading(!1),k=this.props.animation,A=k.code,I=k.timeScale,this.addAnimationChain(a,A,I);case 33:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){var e=Object(v.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=this.props,this.updateViewport(t.viewport,n.viewport),this.updateModel(t.model,n.model),this.updateAnimation(t.animation,n.animation),this.updateOutline(t.outline,n.outline),this.updateMaterial(t,n),t.bgColor!==n.bgColor&&this.setBackground(n.bgColor),n.capture.enable&&!t.capture.enable&&this.captureAnimation(),t.antiAliasing!==n.antiAliasing&&this.updateAA();case 9:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){cancelAnimationFrame(this.frameId),Object(M.l)(this.scene),this.mixers=null,this.clock=null,this.camera=null,this.controls=null,this.scene=null,this.renderer=null,this.rendererAA.renderLists.dispose(),this.rendererAA.dispose(),this.rendererAA=null,this.rendererNoAA.renderLists.dispose(),this.rendererNoAA.dispose(),this.rendererNoAA=null}},{key:"render",value:function(){var e=this;return Object(r.jsx)("div",{ref:function(t){e.mount=t}})}},{key:"aniIdx",set:function(e){this._aniIdx=e;var t=this.animations[e],n=this.models.main.mixer;n.stopAllAction();var a=n.clipAction(t),r=this.aniSettings[e],i=r.timeScale,o=r.repetitions;a.setLoop(k.LoopRepeat,o),a.clampWhenFinished=!0,a.timeScale=i,a.time=0,a.play()}}]),n}(u.PureComponent),L=(n(92),Object(u.lazy)((function(){return Promise.all([n.e(1),n.e(22)]).then(n.bind(null,434))})));var T=function(e){var t=e.viewport,n=Object(u.useContext)(i.b),a=n.model.id,o=n.scene,c=o.rotateSpeed,s=o.background,l=o.initCameraPosition,d=n.app,f=d.showAniControl,p=d.antiAliasing,m=Object(u.useContext)(i.a),h=Object(u.useCallback)((function(){m({type:"toggle",key:"capture",value:"enable"})}),[m]),b=a[0],v=S.m[a]?S.m[a]:S.m[b],g=l?l.map((function(e,t){return isNaN(e)?v[t]:e})):v,j=S.o[a]?S.o[a]:S.o[b];return Object(r.jsxs)("div",{className:"Display",children:[f&&Object(r.jsx)("div",{className:"Display-AniControl",children:Object(r.jsx)(u.Suspense,{fallback:null,children:Object(r.jsx)(L,{value:n.animation.timeScale})})}),Object(r.jsx)(I,{setIsLoading:e.setIsLoading,capture:n.capture,toggleCapture:h,viewport:t,cameraPosition:g,controlsPosition:j,model:n.model,materialParams:n.materialParams,outline:n.outline,animation:n.animation,rotateSpeed:c,bgColor:s,antiAliasing:p})]})},C=Object(u.lazy)((function(){return Promise.all([n.e(3),n.e(12),n.e(11)]).then(n.bind(null,444))})),E=Object(u.lazy)((function(){return Promise.all([n.e(3),n.e(21),n.e(34)]).then(n.bind(null,452))}));var N=function(e){var t=e.location,n=Object(m.a)(),a=Object(u.useState)("model"),o=Object(s.a)(a,2),c=o[0],d=o[1],h=Object(l.a)(!0),b=Object(s.a)(h,2),v=b[0],g=b[1],j=Object(l.a)(!1),O=Object(s.a)(j,2),y=O[0],x=O[1],w=Object(u.useState)(!1),k=Object(s.a)(w,2),A=k[0],S=k[1],_=Object(u.useState)(!1),M=Object(s.a)(_,2),I=M[0],L=M[1],N=Object(u.useContext)(i.b).app.showSettings,R=Object(u.useRef)(),B=Object(u.useState)({width:window.innerWidth,height:window.innerHeight}),W=Object(s.a)(B,2),D=W[0],z=W[1];Object(u.useEffect)((function(){var e=t.pathname.split("/");return Object(P.p)(e),L(!0),window.addEventListener("resize",F),function(){window.removeEventListener("resize",F)}}),[t.pathname]);var F=function(){var e=R.current.clientHeight,t=R.current.clientWidth;z({width:t,height:e})};return Object(r.jsxs)(r.Fragment,{children:[A&&Object(r.jsx)("div",{className:n.loadingMsg,children:"Loading..."}),Object(r.jsxs)("div",{className:n.root,children:[Object(r.jsxs)(u.Suspense,{fallback:null,children:[Object(r.jsx)(p.a,{}),Object(r.jsx)(C,{mode:c,open:y,toggleControlOpen:x}),I&&N&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("button",{onClick:g,className:n.openSidebarButton,children:Object(r.jsx)(f.a,{})}),Object(r.jsx)(E,{toggleSidebarOpen:g,open:v,openControl:function(e){x(),d(e)}})]})]}),I&&Object(r.jsx)("main",{ref:R,className:n.content,children:Object(r.jsx)(T,{setIsLoading:S,viewport:D})})]})]})};n(94);var R="/dl-model";t.a=function(){return Object(r.jsx)(i.c,{children:Object(r.jsx)(o.b,{children:Object(r.jsx)(c.a,{render:function(e){return Object(r.jsx)(N,Object(a.a)({},e))}})})})}},43:function(e,t,n){"use strict";t.a={c110018_02:{x:.043,y:-.0625},c110370_01:{x:.043,y:-.0625},c100015_04:{x:.05,y:-.08},c110267_01:{x:.08,y:-.03},c110050_02:{x:.07,y:.13},c110291_01:{x:.07,y:.14},c110354_01:{x:.07,y:.01},c110345_01:{x:.08,y:-.13},c110266_01:{x:.01,y:.03},c110365_01:{x:.043,y:-.0625},c110346_01:{x:.07,y:.08},c110366_01:{x:.043,y:-.0625},c110299_02:{x:.07,y:.08},c110360_01:{x:.07,y:.14},c110307_01:{x:.08,y:-.03},c110322_01:{x:.043,y:.08},c110356_01:{x:.07,y:.08},c110300_01:{x:.07,y:-.1},c110344_01:{x:.07,y:-.02},c110053_03:{x:.043,y:-.0625},c110368_01:{x:.043,y:-.0625},c110367_01:{x:.043,y:-.0625},c110003_02:{x:.043,y:-.0625},c110270_02:{x:.043,y:-.0625},c110341_03:{x:.043,y:-.0625}}},56:function(e,t,n){"use strict";var a=n(14),r=n(1);t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=Object(r.useState)(e),n=Object(a.a)(t,2),i=n[0],o=n[1],c=Object(r.useCallback)((function(){o((function(e){return!e}))}),[o]);return[i,c]}},69:function(e,t,n){"use strict";var a=n(99),r=n(7),i=n(70),o=r.d,c=r.c,s=Object(a.a)((function(e){return{root:{display:"block",width:"100vw",height:"100vh"},drawer:{width:o,overflowY:"scroll"},drawerPaper:{alignItems:"center",backgroundColor:c,backgroundImage:"url(".concat(i.a,")"),backgroundSize:"cover",backgroundPosition:"center",width:o,"& button":{marginBottom:"0.2rem"}},content:{height:"100vh",width:"100vw",padding:0},openSidebarButton:{position:"absolute",top:0,left:0,margin:"2rem",opacity:"0.5",borderRadius:"0.25rem",transition:"0.5s all ease-in-out",cursor:"pointer","&:hover":{opacity:"1"}},loadingMsg:{position:"absolute",zIndex:"9999",width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontSize:"x-large",backgroundColor:"rgba(0,0,0,0.5)"}}}));t.a=s},7:function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"l",(function(){return o})),n.d(t,"v",(function(){return c})),n.d(t,"q",(function(){return s})),n.d(t,"u",(function(){return u})),n.d(t,"p",(function(){return d})),n.d(t,"t",(function(){return f})),n.d(t,"h",(function(){return p})),n.d(t,"w",(function(){return m})),n.d(t,"x",(function(){return h})),n.d(t,"i",(function(){return b})),n.d(t,"k",(function(){return v})),n.d(t,"g",(function(){return g})),n.d(t,"b",(function(){return j})),n.d(t,"f",(function(){return O})),n.d(t,"e",(function(){return y})),n.d(t,"j",(function(){return x})),n.d(t,"y",(function(){return w})),n.d(t,"s",(function(){return k})),n.d(t,"n",(function(){return A})),n.d(t,"a",(function(){return S})),n.d(t,"m",(function(){return _})),n.d(t,"o",(function(){return M})),n.d(t,"r",(function(){return P})),n.d(t,"z",(function(){return I}));var a=n(8),r="16rem",i="#330000",o="https://dgk3593.github.io/dl-model/#/",c={wireframe:{name:"Wireframe",type:"boolean",default:!1},useTexture:{name:"Texture",type:"boolean",default:!0},transparent:{name:"Transparent",type:"boolean",default:!1},flatShading:{name:"Flat Shading",type:"boolean",default:!1},color:{name:"Color",type:"color",default:"#ffffff"},emissive:{name:"Emissive",type:"color",default:"#000000"},opacity:{name:"Opacity",type:"percentage",default:1,min:0,max:1,step:.05},emissiveIntensity:{name:"Emissive Intensity",type:"percentage",default:1,min:0,max:1,step:.05},specular:{name:"Specular",type:"color",default:"#111111"},metalness:{name:"Metalness",type:"percentage",default:0,min:0,max:1,step:.05},roughness:{name:"Roughness",type:"percentage",default:1,min:0,max:1,step:.05},shininess:{name:"Shininess",type:"number",default:30,min:1,max:100,step:1},gradientMap:{name:"Gradient Map",type:"select",default:"none",options:["none","2 Tones","3 Tones","4 Tones","5 Tones"]}},s=["transparent","opacity","wireframe","emissiveIntensity","metalness","roughness","shininess"],u=["color","emissive","specular"],l={};Object.keys(c).forEach((function(e){l[e]=c[e].default}));var d={model:{materialType:"Basic",id:"c100001_01",texture:"c100001_01",faceTexture:"c100001_01",face:2,weaponRight:"",weaponLeft:""},materialParams:Object(a.a)({},l),scene:{rotateSpeed:0,background:"#cccccc",initCameraPosition:null},animation:{code:"MWM_CMN+CMN_MWM_03",timeScale:1},app:{sideContent:"settings",showSettings:!0,showAniControl:!0,antiAliasing:!1},outline:{enable:!0,size:5,color:"#000000",opacity:1},capture:{enable:!1,supportedCodecs:[],codec:""}},f={id:{group:"model",key:"id"},ft:{group:"model",key:"faceTexture"},f:{group:"model",key:"face"},wr:{group:"model",key:"weaponRight"},wl:{group:"model",key:"weaponLeft"},bg:{group:"scene",key:"background"},cam:{group:"scene",key:"initCameraPosition"},ts:{group:"animation",key:"timeScale"},showAC:{group:"app",key:"showAniControl"},showSettings:{group:"app",key:"showSettings"},showOutline:{group:"outline",key:"enable"},AA:{group:"app",key:"antiAliasing"},rot:{group:"scene",key:"rotateSpeed"},cc:{group:"animation",key:"code"}},p=["Basic","Toon","Lambert","Phong","Standard"],m=["transparent","opacity","wireframe","useTexture","color"],h={Basic:[],Toon:["emissive","emissiveIntensity","gradientMap"],Lambert:["emissive","emissiveIntensity"],Phong:["emissive","emissiveIntensity","specular","shininess","flatShading"],Standard:["emissive","emissiveIntensity","metalness","roughness","flatShading"]},b={Sword:"SWD",Blade:"KAT",Dagger:"DAG",Axe:"AXE",Lance:"LAN",Bow:"BOW",Wand:"ROD",Staff:"CAN",Manacaster:"GUN"},v=["Sword","Blade","Dagger","Axe","Lance","Bow","Wand","Staff","Manacaster"],g={Male:21,Female:23},j={Axe:5,Bow:6,Staff:5,Dagger:6,Blade:5,Lance:5,Wand:5,Sword:5},O={Axe:3,Bow:3,Staff:5,Dagger:3,Blade:3,Lance:4,Wand:3,Sword:3},y={rarity:["3","4","5"],element:["Flame","Water","Wind","Light","Shadow"],weapon:["Sword","Blade","Dagger","Axe","Lance","Bow","Wand","Staff","Manacaster"]},x={rarity:["1","2","3","4","5","6"],element:["Flame","Water","Wind","Light","Shadow","None"],weapon:["Sword","Blade","Dagger","Axe","Lance","Bow","Wand","Staff","Manacaster"]},w={c110300_01:"ec110300_01"},k=new Set(["c100007_01","c100007_05","c100007_09","c100034_01","c100036_01","c100037_01","c100041_01"]),A={green:"#00ff00",black:"#000000",grey:"#cccccc",white:"#ffffff"},S={angle:45,far:300,near:.01},_={c:[0,.5,1.5],d:[3,.5,6],w:[2,0,0],b:[1,.5,6],e:[1,1,4],h:[1,.5,3],o:[0,.5,8],r:[3,3,20],c100034_01:[0,.5,1.75],d210078_01:[3,3,20],d210114_01:[3,3,20],h0010001:[6,.5,8],h0010001_02:[2,0,0],h0040101:[1,.5,4],r0070401:[30,30,100],r0080401:[1,2,5],smith:[1,1,2]},M={c:[0,.5,0],d:[0,1,0],w:[0,0,0],b:[0,1,0],e:[0,.5,0],h:[0,1,0],o:[0,0,0],r:[0,3,0],d210078_01:[0,3,0],d210114_01:[0,3,0],h0010001_02:[0,3,0],r0070401:[0,20,0],r0080401:[0,2,0],smith:[0,.5,0]},P={face1:{x:2,y:1},face2:{x:0,y:0},face3:{x:1,y:0},face4:{x:2,y:0},face5:{x:3,y:0},face6:{x:0,y:-1},face7:{x:1,y:-1},face8:{x:2,y:-1},face9:{x:3,y:-1}},I=["video/webm;codecs=h264","video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"]},70:function(e,t,n){"use strict";t.a=n.p+"static/media/Rose-Petals.bc11ecc7.svg"},87:function(e,t,n){},92:function(e,t,n){},94:function(e,t,n){},96:function(e,t,n){"use strict";n.r(t);var a=n(11),r=n(35),i=n.n(r),o=(n(87),n(39)),c=n(54);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(a.jsx)(c.a,{children:Object(a.jsx)(o.a,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[96,8,10]]]);
//# sourceMappingURL=main.7614196f.chunk.js.map