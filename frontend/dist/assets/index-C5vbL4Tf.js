function Yg(s,a){for(var n=0;n<a.length;n++){const o=a[n];if(typeof o!="string"&&!Array.isArray(o)){for(const l in o)if(l!=="default"&&!(l in s)){const d=Object.getOwnPropertyDescriptor(o,l);d&&Object.defineProperty(s,l,d.get?d:{enumerable:!0,get:()=>o[l]})}}}return Object.freeze(Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const d of l)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(l){const d={};return l.integrity&&(d.integrity=l.integrity),l.referrerPolicy&&(d.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?d.credentials="include":l.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(l){if(l.ep)return;l.ep=!0;const d=n(l);fetch(l.href,d)}})();var Ki=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Hc(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var gc={exports:{}},ks={},xc={exports:{}},Ye={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Op;function Kg(){if(Op)return Ye;Op=1;var s=Symbol.for("react.element"),a=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),d=Symbol.for("react.provider"),u=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),b=Symbol.for("react.memo"),j=Symbol.for("react.lazy"),N=Symbol.iterator;function w(R){return R===null||typeof R!="object"?null:(R=N&&R[N]||R["@@iterator"],typeof R=="function"?R:null)}var _={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},v=Object.assign,x={};function g(R,P,W){this.props=R,this.context=P,this.refs=x,this.updater=W||_}g.prototype.isReactComponent={},g.prototype.setState=function(R,P){if(typeof R!="object"&&typeof R!="function"&&R!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,R,P,"setState")},g.prototype.forceUpdate=function(R){this.updater.enqueueForceUpdate(this,R,"forceUpdate")};function S(){}S.prototype=g.prototype;function z(R,P,W){this.props=R,this.context=P,this.refs=x,this.updater=W||_}var T=z.prototype=new S;T.constructor=z,v(T,g.prototype),T.isPureReactComponent=!0;var E=Array.isArray,A=Object.prototype.hasOwnProperty,D={current:null},B={key:!0,ref:!0,__self:!0,__source:!0};function V(R,P,W){var ee,te={},Ne=null,Te=null;if(P!=null)for(ee in P.ref!==void 0&&(Te=P.ref),P.key!==void 0&&(Ne=""+P.key),P)A.call(P,ee)&&!B.hasOwnProperty(ee)&&(te[ee]=P[ee]);var _e=arguments.length-2;if(_e===1)te.children=W;else if(1<_e){for(var ze=Array(_e),He=0;He<_e;He++)ze[He]=arguments[He+2];te.children=ze}if(R&&R.defaultProps)for(ee in _e=R.defaultProps,_e)te[ee]===void 0&&(te[ee]=_e[ee]);return{$$typeof:s,type:R,key:Ne,ref:Te,props:te,_owner:D.current}}function U(R,P){return{$$typeof:s,type:R.type,key:P,ref:R.ref,props:R.props,_owner:R._owner}}function G(R){return typeof R=="object"&&R!==null&&R.$$typeof===s}function fe(R){var P={"=":"=0",":":"=2"};return"$"+R.replace(/[=:]/g,function(W){return P[W]})}var L=/\/+/g;function H(R,P){return typeof R=="object"&&R!==null&&R.key!=null?fe(""+R.key):P.toString(36)}function k(R,P,W,ee,te){var Ne=typeof R;(Ne==="undefined"||Ne==="boolean")&&(R=null);var Te=!1;if(R===null)Te=!0;else switch(Ne){case"string":case"number":Te=!0;break;case"object":switch(R.$$typeof){case s:case a:Te=!0}}if(Te)return Te=R,te=te(Te),R=ee===""?"."+H(Te,0):ee,E(te)?(W="",R!=null&&(W=R.replace(L,"$&/")+"/"),k(te,P,W,"",function(He){return He})):te!=null&&(G(te)&&(te=U(te,W+(!te.key||Te&&Te.key===te.key?"":(""+te.key).replace(L,"$&/")+"/")+R)),P.push(te)),1;if(Te=0,ee=ee===""?".":ee+":",E(R))for(var _e=0;_e<R.length;_e++){Ne=R[_e];var ze=ee+H(Ne,_e);Te+=k(Ne,P,W,ze,te)}else if(ze=w(R),typeof ze=="function")for(R=ze.call(R),_e=0;!(Ne=R.next()).done;)Ne=Ne.value,ze=ee+H(Ne,_e++),Te+=k(Ne,P,W,ze,te);else if(Ne==="object")throw P=String(R),Error("Objects are not valid as a React child (found: "+(P==="[object Object]"?"object with keys {"+Object.keys(R).join(", ")+"}":P)+"). If you meant to render a collection of children, use an array instead.");return Te}function J(R,P,W){if(R==null)return R;var ee=[],te=0;return k(R,ee,"","",function(Ne){return P.call(W,Ne,te++)}),ee}function ve(R){if(R._status===-1){var P=R._result;P=P(),P.then(function(W){(R._status===0||R._status===-1)&&(R._status=1,R._result=W)},function(W){(R._status===0||R._status===-1)&&(R._status=2,R._result=W)}),R._status===-1&&(R._status=0,R._result=P)}if(R._status===1)return R._result.default;throw R._result}var se={current:null},oe={transition:null},Q={ReactCurrentDispatcher:se,ReactCurrentBatchConfig:oe,ReactCurrentOwner:D};function ce(){throw Error("act(...) is not supported in production builds of React.")}return Ye.Children={map:J,forEach:function(R,P,W){J(R,function(){P.apply(this,arguments)},W)},count:function(R){var P=0;return J(R,function(){P++}),P},toArray:function(R){return J(R,function(P){return P})||[]},only:function(R){if(!G(R))throw Error("React.Children.only expected to receive a single React element child.");return R}},Ye.Component=g,Ye.Fragment=n,Ye.Profiler=l,Ye.PureComponent=z,Ye.StrictMode=o,Ye.Suspense=h,Ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Q,Ye.act=ce,Ye.cloneElement=function(R,P,W){if(R==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+R+".");var ee=v({},R.props),te=R.key,Ne=R.ref,Te=R._owner;if(P!=null){if(P.ref!==void 0&&(Ne=P.ref,Te=D.current),P.key!==void 0&&(te=""+P.key),R.type&&R.type.defaultProps)var _e=R.type.defaultProps;for(ze in P)A.call(P,ze)&&!B.hasOwnProperty(ze)&&(ee[ze]=P[ze]===void 0&&_e!==void 0?_e[ze]:P[ze])}var ze=arguments.length-2;if(ze===1)ee.children=W;else if(1<ze){_e=Array(ze);for(var He=0;He<ze;He++)_e[He]=arguments[He+2];ee.children=_e}return{$$typeof:s,type:R.type,key:te,ref:Ne,props:ee,_owner:Te}},Ye.createContext=function(R){return R={$$typeof:u,_currentValue:R,_currentValue2:R,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},R.Provider={$$typeof:d,_context:R},R.Consumer=R},Ye.createElement=V,Ye.createFactory=function(R){var P=V.bind(null,R);return P.type=R,P},Ye.createRef=function(){return{current:null}},Ye.forwardRef=function(R){return{$$typeof:f,render:R}},Ye.isValidElement=G,Ye.lazy=function(R){return{$$typeof:j,_payload:{_status:-1,_result:R},_init:ve}},Ye.memo=function(R,P){return{$$typeof:b,type:R,compare:P===void 0?null:P}},Ye.startTransition=function(R){var P=oe.transition;oe.transition={};try{R()}finally{oe.transition=P}},Ye.unstable_act=ce,Ye.useCallback=function(R,P){return se.current.useCallback(R,P)},Ye.useContext=function(R){return se.current.useContext(R)},Ye.useDebugValue=function(){},Ye.useDeferredValue=function(R){return se.current.useDeferredValue(R)},Ye.useEffect=function(R,P){return se.current.useEffect(R,P)},Ye.useId=function(){return se.current.useId()},Ye.useImperativeHandle=function(R,P,W){return se.current.useImperativeHandle(R,P,W)},Ye.useInsertionEffect=function(R,P){return se.current.useInsertionEffect(R,P)},Ye.useLayoutEffect=function(R,P){return se.current.useLayoutEffect(R,P)},Ye.useMemo=function(R,P){return se.current.useMemo(R,P)},Ye.useReducer=function(R,P,W){return se.current.useReducer(R,P,W)},Ye.useRef=function(R){return se.current.useRef(R)},Ye.useState=function(R){return se.current.useState(R)},Ye.useSyncExternalStore=function(R,P,W){return se.current.useSyncExternalStore(R,P,W)},Ye.useTransition=function(){return se.current.useTransition()},Ye.version="18.3.1",Ye}var Fp;function qc(){return Fp||(Fp=1,xc.exports=Kg()),xc.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dp;function Xg(){if(Dp)return ks;Dp=1;var s=qc(),a=Symbol.for("react.element"),n=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,l=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function u(f,h,b){var j,N={},w=null,_=null;b!==void 0&&(w=""+b),h.key!==void 0&&(w=""+h.key),h.ref!==void 0&&(_=h.ref);for(j in h)o.call(h,j)&&!d.hasOwnProperty(j)&&(N[j]=h[j]);if(f&&f.defaultProps)for(j in h=f.defaultProps,h)N[j]===void 0&&(N[j]=h[j]);return{$$typeof:a,type:f,key:w,ref:_,props:N,_owner:l.current}}return ks.Fragment=n,ks.jsx=u,ks.jsxs=u,ks}var Mp;function Zg(){return Mp||(Mp=1,gc.exports=Xg()),gc.exports}var e=Zg(),F=qc();const Xe=Hc(F),Qg=Yg({__proto__:null,default:Xe},[F]);var Xi={},vc={exports:{}},Jt={},bc={exports:{}},yc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bp;function Jg(){return Bp||(Bp=1,(function(s){function a(oe,Q){var ce=oe.length;oe.push(Q);e:for(;0<ce;){var R=ce-1>>>1,P=oe[R];if(0<l(P,Q))oe[R]=Q,oe[ce]=P,ce=R;else break e}}function n(oe){return oe.length===0?null:oe[0]}function o(oe){if(oe.length===0)return null;var Q=oe[0],ce=oe.pop();if(ce!==Q){oe[0]=ce;e:for(var R=0,P=oe.length,W=P>>>1;R<W;){var ee=2*(R+1)-1,te=oe[ee],Ne=ee+1,Te=oe[Ne];if(0>l(te,ce))Ne<P&&0>l(Te,te)?(oe[R]=Te,oe[Ne]=ce,R=Ne):(oe[R]=te,oe[ee]=ce,R=ee);else if(Ne<P&&0>l(Te,ce))oe[R]=Te,oe[Ne]=ce,R=Ne;else break e}}return Q}function l(oe,Q){var ce=oe.sortIndex-Q.sortIndex;return ce!==0?ce:oe.id-Q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var d=performance;s.unstable_now=function(){return d.now()}}else{var u=Date,f=u.now();s.unstable_now=function(){return u.now()-f}}var h=[],b=[],j=1,N=null,w=3,_=!1,v=!1,x=!1,g=typeof setTimeout=="function"?setTimeout:null,S=typeof clearTimeout=="function"?clearTimeout:null,z=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function T(oe){for(var Q=n(b);Q!==null;){if(Q.callback===null)o(b);else if(Q.startTime<=oe)o(b),Q.sortIndex=Q.expirationTime,a(h,Q);else break;Q=n(b)}}function E(oe){if(x=!1,T(oe),!v)if(n(h)!==null)v=!0,ve(A);else{var Q=n(b);Q!==null&&se(E,Q.startTime-oe)}}function A(oe,Q){v=!1,x&&(x=!1,S(V),V=-1),_=!0;var ce=w;try{for(T(Q),N=n(h);N!==null&&(!(N.expirationTime>Q)||oe&&!fe());){var R=N.callback;if(typeof R=="function"){N.callback=null,w=N.priorityLevel;var P=R(N.expirationTime<=Q);Q=s.unstable_now(),typeof P=="function"?N.callback=P:N===n(h)&&o(h),T(Q)}else o(h);N=n(h)}if(N!==null)var W=!0;else{var ee=n(b);ee!==null&&se(E,ee.startTime-Q),W=!1}return W}finally{N=null,w=ce,_=!1}}var D=!1,B=null,V=-1,U=5,G=-1;function fe(){return!(s.unstable_now()-G<U)}function L(){if(B!==null){var oe=s.unstable_now();G=oe;var Q=!0;try{Q=B(!0,oe)}finally{Q?H():(D=!1,B=null)}}else D=!1}var H;if(typeof z=="function")H=function(){z(L)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,J=k.port2;k.port1.onmessage=L,H=function(){J.postMessage(null)}}else H=function(){g(L,0)};function ve(oe){B=oe,D||(D=!0,H())}function se(oe,Q){V=g(function(){oe(s.unstable_now())},Q)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(oe){oe.callback=null},s.unstable_continueExecution=function(){v||_||(v=!0,ve(A))},s.unstable_forceFrameRate=function(oe){0>oe||125<oe?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):U=0<oe?Math.floor(1e3/oe):5},s.unstable_getCurrentPriorityLevel=function(){return w},s.unstable_getFirstCallbackNode=function(){return n(h)},s.unstable_next=function(oe){switch(w){case 1:case 2:case 3:var Q=3;break;default:Q=w}var ce=w;w=Q;try{return oe()}finally{w=ce}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(oe,Q){switch(oe){case 1:case 2:case 3:case 4:case 5:break;default:oe=3}var ce=w;w=oe;try{return Q()}finally{w=ce}},s.unstable_scheduleCallback=function(oe,Q,ce){var R=s.unstable_now();switch(typeof ce=="object"&&ce!==null?(ce=ce.delay,ce=typeof ce=="number"&&0<ce?R+ce:R):ce=R,oe){case 1:var P=-1;break;case 2:P=250;break;case 5:P=1073741823;break;case 4:P=1e4;break;default:P=5e3}return P=ce+P,oe={id:j++,callback:Q,priorityLevel:oe,startTime:ce,expirationTime:P,sortIndex:-1},ce>R?(oe.sortIndex=ce,a(b,oe),n(h)===null&&oe===n(b)&&(x?(S(V),V=-1):x=!0,se(E,ce-R))):(oe.sortIndex=P,a(h,oe),v||_||(v=!0,ve(A))),oe},s.unstable_shouldYield=fe,s.unstable_wrapCallback=function(oe){var Q=w;return function(){var ce=w;w=Q;try{return oe.apply(this,arguments)}finally{w=ce}}}})(yc)),yc}var Wp;function ex(){return Wp||(Wp=1,bc.exports=Jg()),bc.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Up;function tx(){if(Up)return Jt;Up=1;var s=qc(),a=ex();function n(t){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+t,i=1;i<arguments.length;i++)r+="&args[]="+encodeURIComponent(arguments[i]);return"Minified React error #"+t+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var o=new Set,l={};function d(t,r){u(t,r),u(t+"Capture",r)}function u(t,r){for(l[t]=r,t=0;t<r.length;t++)o.add(r[t])}var f=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,b=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,j={},N={};function w(t){return h.call(N,t)?!0:h.call(j,t)?!1:b.test(t)?N[t]=!0:(j[t]=!0,!1)}function _(t,r,i,c){if(i!==null&&i.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return c?!1:i!==null?!i.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function v(t,r,i,c){if(r===null||typeof r>"u"||_(t,r,i,c))return!0;if(c)return!1;if(i!==null)switch(i.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function x(t,r,i,c,p,m,C){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=c,this.attributeNamespace=p,this.mustUseProperty=i,this.propertyName=t,this.type=r,this.sanitizeURL=m,this.removeEmptyString=C}var g={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){g[t]=new x(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var r=t[0];g[r]=new x(r,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){g[t]=new x(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){g[t]=new x(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){g[t]=new x(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){g[t]=new x(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){g[t]=new x(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){g[t]=new x(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){g[t]=new x(t,5,!1,t.toLowerCase(),null,!1,!1)});var S=/[\-:]([a-z])/g;function z(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var r=t.replace(S,z);g[r]=new x(r,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var r=t.replace(S,z);g[r]=new x(r,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var r=t.replace(S,z);g[r]=new x(r,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){g[t]=new x(t,1,!1,t.toLowerCase(),null,!1,!1)}),g.xlinkHref=new x("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){g[t]=new x(t,1,!1,t.toLowerCase(),null,!0,!0)});function T(t,r,i,c){var p=g.hasOwnProperty(r)?g[r]:null;(p!==null?p.type!==0:c||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(v(r,i,p,c)&&(i=null),c||p===null?w(r)&&(i===null?t.removeAttribute(r):t.setAttribute(r,""+i)):p.mustUseProperty?t[p.propertyName]=i===null?p.type===3?!1:"":i:(r=p.attributeName,c=p.attributeNamespace,i===null?t.removeAttribute(r):(p=p.type,i=p===3||p===4&&i===!0?"":""+i,c?t.setAttributeNS(c,r,i):t.setAttribute(r,i))))}var E=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,A=Symbol.for("react.element"),D=Symbol.for("react.portal"),B=Symbol.for("react.fragment"),V=Symbol.for("react.strict_mode"),U=Symbol.for("react.profiler"),G=Symbol.for("react.provider"),fe=Symbol.for("react.context"),L=Symbol.for("react.forward_ref"),H=Symbol.for("react.suspense"),k=Symbol.for("react.suspense_list"),J=Symbol.for("react.memo"),ve=Symbol.for("react.lazy"),se=Symbol.for("react.offscreen"),oe=Symbol.iterator;function Q(t){return t===null||typeof t!="object"?null:(t=oe&&t[oe]||t["@@iterator"],typeof t=="function"?t:null)}var ce=Object.assign,R;function P(t){if(R===void 0)try{throw Error()}catch(i){var r=i.stack.trim().match(/\n( *(at )?)/);R=r&&r[1]||""}return`
`+R+t}var W=!1;function ee(t,r){if(!t||W)return"";W=!0;var i=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(le){var c=le}Reflect.construct(t,[],r)}else{try{r.call()}catch(le){c=le}t.call(r.prototype)}else{try{throw Error()}catch(le){c=le}t()}}catch(le){if(le&&c&&typeof le.stack=="string"){for(var p=le.stack.split(`
`),m=c.stack.split(`
`),C=p.length-1,M=m.length-1;1<=C&&0<=M&&p[C]!==m[M];)M--;for(;1<=C&&0<=M;C--,M--)if(p[C]!==m[M]){if(C!==1||M!==1)do if(C--,M--,0>M||p[C]!==m[M]){var $=`
`+p[C].replace(" at new "," at ");return t.displayName&&$.includes("<anonymous>")&&($=$.replace("<anonymous>",t.displayName)),$}while(1<=C&&0<=M);break}}}finally{W=!1,Error.prepareStackTrace=i}return(t=t?t.displayName||t.name:"")?P(t):""}function te(t){switch(t.tag){case 5:return P(t.type);case 16:return P("Lazy");case 13:return P("Suspense");case 19:return P("SuspenseList");case 0:case 2:case 15:return t=ee(t.type,!1),t;case 11:return t=ee(t.type.render,!1),t;case 1:return t=ee(t.type,!0),t;default:return""}}function Ne(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case B:return"Fragment";case D:return"Portal";case U:return"Profiler";case V:return"StrictMode";case H:return"Suspense";case k:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case fe:return(t.displayName||"Context")+".Consumer";case G:return(t._context.displayName||"Context")+".Provider";case L:var r=t.render;return t=t.displayName,t||(t=r.displayName||r.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case J:return r=t.displayName||null,r!==null?r:Ne(t.type)||"Memo";case ve:r=t._payload,t=t._init;try{return Ne(t(r))}catch{}}return null}function Te(t){var r=t.type;switch(t.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=r.render,t=t.displayName||t.name||"",r.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ne(r);case 8:return r===V?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function _e(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ze(t){var r=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function He(t){var r=ze(t)?"checked":"value",i=Object.getOwnPropertyDescriptor(t.constructor.prototype,r),c=""+t[r];if(!t.hasOwnProperty(r)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var p=i.get,m=i.set;return Object.defineProperty(t,r,{configurable:!0,get:function(){return p.call(this)},set:function(C){c=""+C,m.call(this,C)}}),Object.defineProperty(t,r,{enumerable:i.enumerable}),{getValue:function(){return c},setValue:function(C){c=""+C},stopTracking:function(){t._valueTracker=null,delete t[r]}}}}function Qe(t){t._valueTracker||(t._valueTracker=He(t))}function xe(t){if(!t)return!1;var r=t._valueTracker;if(!r)return!0;var i=r.getValue(),c="";return t&&(c=ze(t)?t.checked?"true":"false":t.value),t=c,t!==i?(r.setValue(t),!0):!1}function Ae(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function y(t,r){var i=r.checked;return ce({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:i??t._wrapperState.initialChecked})}function he(t,r){var i=r.defaultValue==null?"":r.defaultValue,c=r.checked!=null?r.checked:r.defaultChecked;i=_e(r.value!=null?r.value:i),t._wrapperState={initialChecked:c,initialValue:i,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function re(t,r){r=r.checked,r!=null&&T(t,"checked",r,!1)}function I(t,r){re(t,r);var i=_e(r.value),c=r.type;if(i!=null)c==="number"?(i===0&&t.value===""||t.value!=i)&&(t.value=""+i):t.value!==""+i&&(t.value=""+i);else if(c==="submit"||c==="reset"){t.removeAttribute("value");return}r.hasOwnProperty("value")?Z(t,r.type,i):r.hasOwnProperty("defaultValue")&&Z(t,r.type,_e(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(t.defaultChecked=!!r.defaultChecked)}function O(t,r,i){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var c=r.type;if(!(c!=="submit"&&c!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+t._wrapperState.initialValue,i||r===t.value||(t.value=r),t.defaultValue=r}i=t.name,i!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,i!==""&&(t.name=i)}function Z(t,r,i){(r!=="number"||Ae(t.ownerDocument)!==t)&&(i==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+i&&(t.defaultValue=""+i))}var ge=Array.isArray;function pe(t,r,i,c){if(t=t.options,r){r={};for(var p=0;p<i.length;p++)r["$"+i[p]]=!0;for(i=0;i<t.length;i++)p=r.hasOwnProperty("$"+t[i].value),t[i].selected!==p&&(t[i].selected=p),p&&c&&(t[i].defaultSelected=!0)}else{for(i=""+_e(i),r=null,p=0;p<t.length;p++){if(t[p].value===i){t[p].selected=!0,c&&(t[p].defaultSelected=!0);return}r!==null||t[p].disabled||(r=t[p])}r!==null&&(r.selected=!0)}}function ae(t,r){if(r.dangerouslySetInnerHTML!=null)throw Error(n(91));return ce({},r,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function we(t,r){var i=r.value;if(i==null){if(i=r.children,r=r.defaultValue,i!=null){if(r!=null)throw Error(n(92));if(ge(i)){if(1<i.length)throw Error(n(93));i=i[0]}r=i}r==null&&(r=""),i=r}t._wrapperState={initialValue:_e(i)}}function Ce(t,r){var i=_e(r.value),c=_e(r.defaultValue);i!=null&&(i=""+i,i!==t.value&&(t.value=i),r.defaultValue==null&&t.defaultValue!==i&&(t.defaultValue=i)),c!=null&&(t.defaultValue=""+c)}function Y(t){var r=t.textContent;r===t._wrapperState.initialValue&&r!==""&&r!==null&&(t.value=r)}function ke(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function De(t,r){return t==null||t==="http://www.w3.org/1999/xhtml"?ke(r):t==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Fe,mt=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,i,c,p){MSApp.execUnsafeLocalFunction(function(){return t(r,i,c,p)})}:t})(function(t,r){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=r;else{for(Fe=Fe||document.createElement("div"),Fe.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=Fe.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;r.firstChild;)t.appendChild(r.firstChild)}});function nr(t,r){if(r){var i=t.firstChild;if(i&&i===t.lastChild&&i.nodeType===3){i.nodeValue=r;return}}t.textContent=r}var vt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Yr=["Webkit","ms","Moz","O"];Object.keys(vt).forEach(function(t){Yr.forEach(function(r){r=r+t.charAt(0).toUpperCase()+t.substring(1),vt[r]=vt[t]})});function at(t,r,i){return r==null||typeof r=="boolean"||r===""?"":i||typeof r!="number"||r===0||vt.hasOwnProperty(t)&&vt[t]?(""+r).trim():r+"px"}function Nr(t,r){t=t.style;for(var i in r)if(r.hasOwnProperty(i)){var c=i.indexOf("--")===0,p=at(i,r[i],c);i==="float"&&(i="cssFloat"),c?t.setProperty(i,p):t[i]=p}}var Kr=ce({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function kt(t,r){if(r){if(Kr[t]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(n(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(n(61))}if(r.style!=null&&typeof r.style!="object")throw Error(n(62))}}function Fr(t,r){if(t.indexOf("-")===-1)return typeof r.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Dr=null;function Mr(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var pn=null,pr=null,X=null;function Me(t){if(t=ls(t)){if(typeof pn!="function")throw Error(n(280));var r=t.stateNode;r&&(r=di(r),pn(t.stateNode,t.type,r))}}function Ge(t){pr?X?X.push(t):X=[t]:pr=t}function Ve(){if(pr){var t=pr,r=X;if(X=pr=null,Me(t),r)for(t=0;t<r.length;t++)Me(r[t])}}function Ze(t,r){return t(r)}function fr(){}var hr=!1;function Us(t,r,i){if(hr)return t(r,i);hr=!0;try{return Ze(t,r,i)}finally{hr=!1,(pr!==null||X!==null)&&(fr(),Ve())}}function $t(t,r){var i=t.stateNode;if(i===null)return null;var c=di(i);if(c===null)return null;i=c[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(t=t.type,c=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!c;break e;default:t=!1}if(t)return null;if(i&&typeof i!="function")throw Error(n(231,r,typeof i));return i}var Mn=!1;if(f)try{var mr={};Object.defineProperty(mr,"passive",{get:function(){Mn=!0}}),window.addEventListener("test",mr,mr),window.removeEventListener("test",mr,mr)}catch{Mn=!1}function $s(t,r,i,c,p,m,C,M,$){var le=Array.prototype.slice.call(arguments,3);try{r.apply(i,le)}catch(ye){this.onError(ye)}}var Xr=!1,fn=null,Bn=!1,hn=null,$a={onError:function(t){Xr=!0,fn=t}};function ia(t,r,i,c,p,m,C,M,$){Xr=!1,fn=null,$s.apply($a,arguments)}function oa(t,r,i,c,p,m,C,M,$){if(ia.apply(this,arguments),Xr){if(Xr){var le=fn;Xr=!1,fn=null}else throw Error(n(198));Bn||(Bn=!0,hn=le)}}function Zr(t){var r=t,i=t;if(t.alternate)for(;r.return;)r=r.return;else{t=r;do r=t,(r.flags&4098)!==0&&(i=r.return),t=r.return;while(t)}return r.tag===3?i:null}function it(t){if(t.tag===13){var r=t.memoizedState;if(r===null&&(t=t.alternate,t!==null&&(r=t.memoizedState)),r!==null)return r.dehydrated}return null}function ar(t){if(Zr(t)!==t)throw Error(n(188))}function la(t){var r=t.alternate;if(!r){if(r=Zr(t),r===null)throw Error(n(188));return r!==t?null:t}for(var i=t,c=r;;){var p=i.return;if(p===null)break;var m=p.alternate;if(m===null){if(c=p.return,c!==null){i=c;continue}break}if(p.child===m.child){for(m=p.child;m;){if(m===i)return ar(p),t;if(m===c)return ar(p),r;m=m.sibling}throw Error(n(188))}if(i.return!==c.return)i=p,c=m;else{for(var C=!1,M=p.child;M;){if(M===i){C=!0,i=p,c=m;break}if(M===c){C=!0,c=p,i=m;break}M=M.sibling}if(!C){for(M=m.child;M;){if(M===i){C=!0,i=m,c=p;break}if(M===c){C=!0,c=m,i=p;break}M=M.sibling}if(!C)throw Error(n(189))}}if(i.alternate!==c)throw Error(n(190))}if(i.tag!==3)throw Error(n(188));return i.stateNode.current===i?t:r}function ca(t){return t=la(t),t!==null?Io(t):null}function Io(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var r=Io(t);if(r!==null)return r;t=t.sibling}return null}var cd=a.unstable_scheduleCallback,dd=a.unstable_cancelCallback,sm=a.unstable_shouldYield,im=a.unstable_requestPaint,bt=a.unstable_now,om=a.unstable_getCurrentPriorityLevel,Oo=a.unstable_ImmediatePriority,ud=a.unstable_UserBlockingPriority,Vs=a.unstable_NormalPriority,lm=a.unstable_LowPriority,pd=a.unstable_IdlePriority,Hs=null,Br=null;function cm(t){if(Br&&typeof Br.onCommitFiberRoot=="function")try{Br.onCommitFiberRoot(Hs,t,void 0,(t.current.flags&128)===128)}catch{}}var Sr=Math.clz32?Math.clz32:pm,dm=Math.log,um=Math.LN2;function pm(t){return t>>>=0,t===0?32:31-(dm(t)/um|0)|0}var qs=64,Gs=4194304;function Va(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Ys(t,r){var i=t.pendingLanes;if(i===0)return 0;var c=0,p=t.suspendedLanes,m=t.pingedLanes,C=i&268435455;if(C!==0){var M=C&~p;M!==0?c=Va(M):(m&=C,m!==0&&(c=Va(m)))}else C=i&~p,C!==0?c=Va(C):m!==0&&(c=Va(m));if(c===0)return 0;if(r!==0&&r!==c&&(r&p)===0&&(p=c&-c,m=r&-r,p>=m||p===16&&(m&4194240)!==0))return r;if((c&4)!==0&&(c|=i&16),r=t.entangledLanes,r!==0)for(t=t.entanglements,r&=c;0<r;)i=31-Sr(r),p=1<<i,c|=t[i],r&=~p;return c}function fm(t,r){switch(t){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function hm(t,r){for(var i=t.suspendedLanes,c=t.pingedLanes,p=t.expirationTimes,m=t.pendingLanes;0<m;){var C=31-Sr(m),M=1<<C,$=p[C];$===-1?((M&i)===0||(M&c)!==0)&&(p[C]=fm(M,r)):$<=r&&(t.expiredLanes|=M),m&=~M}}function Fo(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function fd(){var t=qs;return qs<<=1,(qs&4194240)===0&&(qs=64),t}function Do(t){for(var r=[],i=0;31>i;i++)r.push(t);return r}function Ha(t,r,i){t.pendingLanes|=r,r!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,r=31-Sr(r),t[r]=i}function mm(t,r){var i=t.pendingLanes&~r;t.pendingLanes=r,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=r,t.mutableReadLanes&=r,t.entangledLanes&=r,r=t.entanglements;var c=t.eventTimes;for(t=t.expirationTimes;0<i;){var p=31-Sr(i),m=1<<p;r[p]=0,c[p]=-1,t[p]=-1,i&=~m}}function Mo(t,r){var i=t.entangledLanes|=r;for(t=t.entanglements;i;){var c=31-Sr(i),p=1<<c;p&r|t[c]&r&&(t[c]|=r),i&=~p}}var rt=0;function hd(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var md,Bo,gd,xd,vd,Wo=!1,Ks=[],mn=null,gn=null,xn=null,qa=new Map,Ga=new Map,vn=[],gm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function bd(t,r){switch(t){case"focusin":case"focusout":mn=null;break;case"dragenter":case"dragleave":gn=null;break;case"mouseover":case"mouseout":xn=null;break;case"pointerover":case"pointerout":qa.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ga.delete(r.pointerId)}}function Ya(t,r,i,c,p,m){return t===null||t.nativeEvent!==m?(t={blockedOn:r,domEventName:i,eventSystemFlags:c,nativeEvent:m,targetContainers:[p]},r!==null&&(r=ls(r),r!==null&&Bo(r)),t):(t.eventSystemFlags|=c,r=t.targetContainers,p!==null&&r.indexOf(p)===-1&&r.push(p),t)}function xm(t,r,i,c,p){switch(r){case"focusin":return mn=Ya(mn,t,r,i,c,p),!0;case"dragenter":return gn=Ya(gn,t,r,i,c,p),!0;case"mouseover":return xn=Ya(xn,t,r,i,c,p),!0;case"pointerover":var m=p.pointerId;return qa.set(m,Ya(qa.get(m)||null,t,r,i,c,p)),!0;case"gotpointercapture":return m=p.pointerId,Ga.set(m,Ya(Ga.get(m)||null,t,r,i,c,p)),!0}return!1}function yd(t){var r=Wn(t.target);if(r!==null){var i=Zr(r);if(i!==null){if(r=i.tag,r===13){if(r=it(i),r!==null){t.blockedOn=r,vd(t.priority,function(){gd(i)});return}}else if(r===3&&i.stateNode.current.memoizedState.isDehydrated){t.blockedOn=i.tag===3?i.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Xs(t){if(t.blockedOn!==null)return!1;for(var r=t.targetContainers;0<r.length;){var i=$o(t.domEventName,t.eventSystemFlags,r[0],t.nativeEvent);if(i===null){i=t.nativeEvent;var c=new i.constructor(i.type,i);Dr=c,i.target.dispatchEvent(c),Dr=null}else return r=ls(i),r!==null&&Bo(r),t.blockedOn=i,!1;r.shift()}return!0}function jd(t,r,i){Xs(t)&&i.delete(r)}function vm(){Wo=!1,mn!==null&&Xs(mn)&&(mn=null),gn!==null&&Xs(gn)&&(gn=null),xn!==null&&Xs(xn)&&(xn=null),qa.forEach(jd),Ga.forEach(jd)}function Ka(t,r){t.blockedOn===r&&(t.blockedOn=null,Wo||(Wo=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,vm)))}function Xa(t){function r(p){return Ka(p,t)}if(0<Ks.length){Ka(Ks[0],t);for(var i=1;i<Ks.length;i++){var c=Ks[i];c.blockedOn===t&&(c.blockedOn=null)}}for(mn!==null&&Ka(mn,t),gn!==null&&Ka(gn,t),xn!==null&&Ka(xn,t),qa.forEach(r),Ga.forEach(r),i=0;i<vn.length;i++)c=vn[i],c.blockedOn===t&&(c.blockedOn=null);for(;0<vn.length&&(i=vn[0],i.blockedOn===null);)yd(i),i.blockedOn===null&&vn.shift()}var da=E.ReactCurrentBatchConfig,Zs=!0;function bm(t,r,i,c){var p=rt,m=da.transition;da.transition=null;try{rt=1,Uo(t,r,i,c)}finally{rt=p,da.transition=m}}function ym(t,r,i,c){var p=rt,m=da.transition;da.transition=null;try{rt=4,Uo(t,r,i,c)}finally{rt=p,da.transition=m}}function Uo(t,r,i,c){if(Zs){var p=$o(t,r,i,c);if(p===null)il(t,r,c,Qs,i),bd(t,c);else if(xm(p,t,r,i,c))c.stopPropagation();else if(bd(t,c),r&4&&-1<gm.indexOf(t)){for(;p!==null;){var m=ls(p);if(m!==null&&md(m),m=$o(t,r,i,c),m===null&&il(t,r,c,Qs,i),m===p)break;p=m}p!==null&&c.stopPropagation()}else il(t,r,c,null,i)}}var Qs=null;function $o(t,r,i,c){if(Qs=null,t=Mr(c),t=Wn(t),t!==null)if(r=Zr(t),r===null)t=null;else if(i=r.tag,i===13){if(t=it(r),t!==null)return t;t=null}else if(i===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;t=null}else r!==t&&(t=null);return Qs=t,null}function wd(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(om()){case Oo:return 1;case ud:return 4;case Vs:case lm:return 16;case pd:return 536870912;default:return 16}default:return 16}}var bn=null,Vo=null,Js=null;function kd(){if(Js)return Js;var t,r=Vo,i=r.length,c,p="value"in bn?bn.value:bn.textContent,m=p.length;for(t=0;t<i&&r[t]===p[t];t++);var C=i-t;for(c=1;c<=C&&r[i-c]===p[m-c];c++);return Js=p.slice(t,1<c?1-c:void 0)}function ei(t){var r=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&r===13&&(t=13)):t=r,t===10&&(t=13),32<=t||t===13?t:0}function ti(){return!0}function Nd(){return!1}function sr(t){function r(i,c,p,m,C){this._reactName=i,this._targetInst=p,this.type=c,this.nativeEvent=m,this.target=C,this.currentTarget=null;for(var M in t)t.hasOwnProperty(M)&&(i=t[M],this[M]=i?i(m):m[M]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?ti:Nd,this.isPropagationStopped=Nd,this}return ce(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var i=this.nativeEvent;i&&(i.preventDefault?i.preventDefault():typeof i.returnValue!="unknown"&&(i.returnValue=!1),this.isDefaultPrevented=ti)},stopPropagation:function(){var i=this.nativeEvent;i&&(i.stopPropagation?i.stopPropagation():typeof i.cancelBubble!="unknown"&&(i.cancelBubble=!0),this.isPropagationStopped=ti)},persist:function(){},isPersistent:ti}),r}var ua={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ho=sr(ua),Za=ce({},ua,{view:0,detail:0}),jm=sr(Za),qo,Go,Qa,ri=ce({},Za,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ko,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Qa&&(Qa&&t.type==="mousemove"?(qo=t.screenX-Qa.screenX,Go=t.screenY-Qa.screenY):Go=qo=0,Qa=t),qo)},movementY:function(t){return"movementY"in t?t.movementY:Go}}),Sd=sr(ri),wm=ce({},ri,{dataTransfer:0}),km=sr(wm),Nm=ce({},Za,{relatedTarget:0}),Yo=sr(Nm),Sm=ce({},ua,{animationName:0,elapsedTime:0,pseudoElement:0}),_m=sr(Sm),Cm=ce({},ua,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Em=sr(Cm),zm=ce({},ua,{data:0}),_d=sr(zm),Pm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Rm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Tm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Am(t){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(t):(t=Tm[t])?!!r[t]:!1}function Ko(){return Am}var Lm=ce({},Za,{key:function(t){if(t.key){var r=Pm[t.key]||t.key;if(r!=="Unidentified")return r}return t.type==="keypress"?(t=ei(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Rm[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ko,charCode:function(t){return t.type==="keypress"?ei(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ei(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Im=sr(Lm),Om=ce({},ri,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Cd=sr(Om),Fm=ce({},Za,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ko}),Dm=sr(Fm),Mm=ce({},ua,{propertyName:0,elapsedTime:0,pseudoElement:0}),Bm=sr(Mm),Wm=ce({},ri,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Um=sr(Wm),$m=[9,13,27,32],Xo=f&&"CompositionEvent"in window,Ja=null;f&&"documentMode"in document&&(Ja=document.documentMode);var Vm=f&&"TextEvent"in window&&!Ja,Ed=f&&(!Xo||Ja&&8<Ja&&11>=Ja),zd=" ",Pd=!1;function Rd(t,r){switch(t){case"keyup":return $m.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Td(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var pa=!1;function Hm(t,r){switch(t){case"compositionend":return Td(r);case"keypress":return r.which!==32?null:(Pd=!0,zd);case"textInput":return t=r.data,t===zd&&Pd?null:t;default:return null}}function qm(t,r){if(pa)return t==="compositionend"||!Xo&&Rd(t,r)?(t=kd(),Js=Vo=bn=null,pa=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return Ed&&r.locale!=="ko"?null:r.data;default:return null}}var Gm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ad(t){var r=t&&t.nodeName&&t.nodeName.toLowerCase();return r==="input"?!!Gm[t.type]:r==="textarea"}function Ld(t,r,i,c){Ge(c),r=oi(r,"onChange"),0<r.length&&(i=new Ho("onChange","change",null,i,c),t.push({event:i,listeners:r}))}var es=null,ts=null;function Ym(t){Qd(t,0)}function ni(t){var r=xa(t);if(xe(r))return t}function Km(t,r){if(t==="change")return r}var Id=!1;if(f){var Zo;if(f){var Qo="oninput"in document;if(!Qo){var Od=document.createElement("div");Od.setAttribute("oninput","return;"),Qo=typeof Od.oninput=="function"}Zo=Qo}else Zo=!1;Id=Zo&&(!document.documentMode||9<document.documentMode)}function Fd(){es&&(es.detachEvent("onpropertychange",Dd),ts=es=null)}function Dd(t){if(t.propertyName==="value"&&ni(ts)){var r=[];Ld(r,ts,t,Mr(t)),Us(Ym,r)}}function Xm(t,r,i){t==="focusin"?(Fd(),es=r,ts=i,es.attachEvent("onpropertychange",Dd)):t==="focusout"&&Fd()}function Zm(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ni(ts)}function Qm(t,r){if(t==="click")return ni(r)}function Jm(t,r){if(t==="input"||t==="change")return ni(r)}function eg(t,r){return t===r&&(t!==0||1/t===1/r)||t!==t&&r!==r}var _r=typeof Object.is=="function"?Object.is:eg;function rs(t,r){if(_r(t,r))return!0;if(typeof t!="object"||t===null||typeof r!="object"||r===null)return!1;var i=Object.keys(t),c=Object.keys(r);if(i.length!==c.length)return!1;for(c=0;c<i.length;c++){var p=i[c];if(!h.call(r,p)||!_r(t[p],r[p]))return!1}return!0}function Md(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Bd(t,r){var i=Md(t);t=0;for(var c;i;){if(i.nodeType===3){if(c=t+i.textContent.length,t<=r&&c>=r)return{node:i,offset:r-t};t=c}e:{for(;i;){if(i.nextSibling){i=i.nextSibling;break e}i=i.parentNode}i=void 0}i=Md(i)}}function Wd(t,r){return t&&r?t===r?!0:t&&t.nodeType===3?!1:r&&r.nodeType===3?Wd(t,r.parentNode):"contains"in t?t.contains(r):t.compareDocumentPosition?!!(t.compareDocumentPosition(r)&16):!1:!1}function Ud(){for(var t=window,r=Ae();r instanceof t.HTMLIFrameElement;){try{var i=typeof r.contentWindow.location.href=="string"}catch{i=!1}if(i)t=r.contentWindow;else break;r=Ae(t.document)}return r}function Jo(t){var r=t&&t.nodeName&&t.nodeName.toLowerCase();return r&&(r==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||r==="textarea"||t.contentEditable==="true")}function tg(t){var r=Ud(),i=t.focusedElem,c=t.selectionRange;if(r!==i&&i&&i.ownerDocument&&Wd(i.ownerDocument.documentElement,i)){if(c!==null&&Jo(i)){if(r=c.start,t=c.end,t===void 0&&(t=r),"selectionStart"in i)i.selectionStart=r,i.selectionEnd=Math.min(t,i.value.length);else if(t=(r=i.ownerDocument||document)&&r.defaultView||window,t.getSelection){t=t.getSelection();var p=i.textContent.length,m=Math.min(c.start,p);c=c.end===void 0?m:Math.min(c.end,p),!t.extend&&m>c&&(p=c,c=m,m=p),p=Bd(i,m);var C=Bd(i,c);p&&C&&(t.rangeCount!==1||t.anchorNode!==p.node||t.anchorOffset!==p.offset||t.focusNode!==C.node||t.focusOffset!==C.offset)&&(r=r.createRange(),r.setStart(p.node,p.offset),t.removeAllRanges(),m>c?(t.addRange(r),t.extend(C.node,C.offset)):(r.setEnd(C.node,C.offset),t.addRange(r)))}}for(r=[],t=i;t=t.parentNode;)t.nodeType===1&&r.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof i.focus=="function"&&i.focus(),i=0;i<r.length;i++)t=r[i],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var rg=f&&"documentMode"in document&&11>=document.documentMode,fa=null,el=null,ns=null,tl=!1;function $d(t,r,i){var c=i.window===i?i.document:i.nodeType===9?i:i.ownerDocument;tl||fa==null||fa!==Ae(c)||(c=fa,"selectionStart"in c&&Jo(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),ns&&rs(ns,c)||(ns=c,c=oi(el,"onSelect"),0<c.length&&(r=new Ho("onSelect","select",null,r,i),t.push({event:r,listeners:c}),r.target=fa)))}function ai(t,r){var i={};return i[t.toLowerCase()]=r.toLowerCase(),i["Webkit"+t]="webkit"+r,i["Moz"+t]="moz"+r,i}var ha={animationend:ai("Animation","AnimationEnd"),animationiteration:ai("Animation","AnimationIteration"),animationstart:ai("Animation","AnimationStart"),transitionend:ai("Transition","TransitionEnd")},rl={},Vd={};f&&(Vd=document.createElement("div").style,"AnimationEvent"in window||(delete ha.animationend.animation,delete ha.animationiteration.animation,delete ha.animationstart.animation),"TransitionEvent"in window||delete ha.transitionend.transition);function si(t){if(rl[t])return rl[t];if(!ha[t])return t;var r=ha[t],i;for(i in r)if(r.hasOwnProperty(i)&&i in Vd)return rl[t]=r[i];return t}var Hd=si("animationend"),qd=si("animationiteration"),Gd=si("animationstart"),Yd=si("transitionend"),Kd=new Map,Xd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yn(t,r){Kd.set(t,r),d(r,[t])}for(var nl=0;nl<Xd.length;nl++){var al=Xd[nl],ng=al.toLowerCase(),ag=al[0].toUpperCase()+al.slice(1);yn(ng,"on"+ag)}yn(Hd,"onAnimationEnd"),yn(qd,"onAnimationIteration"),yn(Gd,"onAnimationStart"),yn("dblclick","onDoubleClick"),yn("focusin","onFocus"),yn("focusout","onBlur"),yn(Yd,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),d("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),d("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),d("onBeforeInput",["compositionend","keypress","textInput","paste"]),d("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),d("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),d("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var as="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),sg=new Set("cancel close invalid load scroll toggle".split(" ").concat(as));function Zd(t,r,i){var c=t.type||"unknown-event";t.currentTarget=i,oa(c,r,void 0,t),t.currentTarget=null}function Qd(t,r){r=(r&4)!==0;for(var i=0;i<t.length;i++){var c=t[i],p=c.event;c=c.listeners;e:{var m=void 0;if(r)for(var C=c.length-1;0<=C;C--){var M=c[C],$=M.instance,le=M.currentTarget;if(M=M.listener,$!==m&&p.isPropagationStopped())break e;Zd(p,M,le),m=$}else for(C=0;C<c.length;C++){if(M=c[C],$=M.instance,le=M.currentTarget,M=M.listener,$!==m&&p.isPropagationStopped())break e;Zd(p,M,le),m=$}}}if(Bn)throw t=hn,Bn=!1,hn=null,t}function ot(t,r){var i=r[pl];i===void 0&&(i=r[pl]=new Set);var c=t+"__bubble";i.has(c)||(Jd(r,t,2,!1),i.add(c))}function sl(t,r,i){var c=0;r&&(c|=4),Jd(i,t,c,r)}var ii="_reactListening"+Math.random().toString(36).slice(2);function ss(t){if(!t[ii]){t[ii]=!0,o.forEach(function(i){i!=="selectionchange"&&(sg.has(i)||sl(i,!1,t),sl(i,!0,t))});var r=t.nodeType===9?t:t.ownerDocument;r===null||r[ii]||(r[ii]=!0,sl("selectionchange",!1,r))}}function Jd(t,r,i,c){switch(wd(r)){case 1:var p=bm;break;case 4:p=ym;break;default:p=Uo}i=p.bind(null,r,i,t),p=void 0,!Mn||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(p=!0),c?p!==void 0?t.addEventListener(r,i,{capture:!0,passive:p}):t.addEventListener(r,i,!0):p!==void 0?t.addEventListener(r,i,{passive:p}):t.addEventListener(r,i,!1)}function il(t,r,i,c,p){var m=c;if((r&1)===0&&(r&2)===0&&c!==null)e:for(;;){if(c===null)return;var C=c.tag;if(C===3||C===4){var M=c.stateNode.containerInfo;if(M===p||M.nodeType===8&&M.parentNode===p)break;if(C===4)for(C=c.return;C!==null;){var $=C.tag;if(($===3||$===4)&&($=C.stateNode.containerInfo,$===p||$.nodeType===8&&$.parentNode===p))return;C=C.return}for(;M!==null;){if(C=Wn(M),C===null)return;if($=C.tag,$===5||$===6){c=m=C;continue e}M=M.parentNode}}c=c.return}Us(function(){var le=m,ye=Mr(i),je=[];e:{var be=Kd.get(t);if(be!==void 0){var Ee=Ho,Re=t;switch(t){case"keypress":if(ei(i)===0)break e;case"keydown":case"keyup":Ee=Im;break;case"focusin":Re="focus",Ee=Yo;break;case"focusout":Re="blur",Ee=Yo;break;case"beforeblur":case"afterblur":Ee=Yo;break;case"click":if(i.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Ee=Sd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Ee=km;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Ee=Dm;break;case Hd:case qd:case Gd:Ee=_m;break;case Yd:Ee=Bm;break;case"scroll":Ee=jm;break;case"wheel":Ee=Um;break;case"copy":case"cut":case"paste":Ee=Em;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Ee=Cd}var Le=(r&4)!==0,yt=!Le&&t==="scroll",ne=Le?be!==null?be+"Capture":null:be;Le=[];for(var K=le,ie;K!==null;){ie=K;var Se=ie.stateNode;if(ie.tag===5&&Se!==null&&(ie=Se,ne!==null&&(Se=$t(K,ne),Se!=null&&Le.push(is(K,Se,ie)))),yt)break;K=K.return}0<Le.length&&(be=new Ee(be,Re,null,i,ye),je.push({event:be,listeners:Le}))}}if((r&7)===0){e:{if(be=t==="mouseover"||t==="pointerover",Ee=t==="mouseout"||t==="pointerout",be&&i!==Dr&&(Re=i.relatedTarget||i.fromElement)&&(Wn(Re)||Re[Qr]))break e;if((Ee||be)&&(be=ye.window===ye?ye:(be=ye.ownerDocument)?be.defaultView||be.parentWindow:window,Ee?(Re=i.relatedTarget||i.toElement,Ee=le,Re=Re?Wn(Re):null,Re!==null&&(yt=Zr(Re),Re!==yt||Re.tag!==5&&Re.tag!==6)&&(Re=null)):(Ee=null,Re=le),Ee!==Re)){if(Le=Sd,Se="onMouseLeave",ne="onMouseEnter",K="mouse",(t==="pointerout"||t==="pointerover")&&(Le=Cd,Se="onPointerLeave",ne="onPointerEnter",K="pointer"),yt=Ee==null?be:xa(Ee),ie=Re==null?be:xa(Re),be=new Le(Se,K+"leave",Ee,i,ye),be.target=yt,be.relatedTarget=ie,Se=null,Wn(ye)===le&&(Le=new Le(ne,K+"enter",Re,i,ye),Le.target=ie,Le.relatedTarget=yt,Se=Le),yt=Se,Ee&&Re)t:{for(Le=Ee,ne=Re,K=0,ie=Le;ie;ie=ma(ie))K++;for(ie=0,Se=ne;Se;Se=ma(Se))ie++;for(;0<K-ie;)Le=ma(Le),K--;for(;0<ie-K;)ne=ma(ne),ie--;for(;K--;){if(Le===ne||ne!==null&&Le===ne.alternate)break t;Le=ma(Le),ne=ma(ne)}Le=null}else Le=null;Ee!==null&&eu(je,be,Ee,Le,!1),Re!==null&&yt!==null&&eu(je,yt,Re,Le,!0)}}e:{if(be=le?xa(le):window,Ee=be.nodeName&&be.nodeName.toLowerCase(),Ee==="select"||Ee==="input"&&be.type==="file")var Ie=Km;else if(Ad(be))if(Id)Ie=Jm;else{Ie=Zm;var Be=Xm}else(Ee=be.nodeName)&&Ee.toLowerCase()==="input"&&(be.type==="checkbox"||be.type==="radio")&&(Ie=Qm);if(Ie&&(Ie=Ie(t,le))){Ld(je,Ie,i,ye);break e}Be&&Be(t,be,le),t==="focusout"&&(Be=be._wrapperState)&&Be.controlled&&be.type==="number"&&Z(be,"number",be.value)}switch(Be=le?xa(le):window,t){case"focusin":(Ad(Be)||Be.contentEditable==="true")&&(fa=Be,el=le,ns=null);break;case"focusout":ns=el=fa=null;break;case"mousedown":tl=!0;break;case"contextmenu":case"mouseup":case"dragend":tl=!1,$d(je,i,ye);break;case"selectionchange":if(rg)break;case"keydown":case"keyup":$d(je,i,ye)}var We;if(Xo)e:{switch(t){case"compositionstart":var $e="onCompositionStart";break e;case"compositionend":$e="onCompositionEnd";break e;case"compositionupdate":$e="onCompositionUpdate";break e}$e=void 0}else pa?Rd(t,i)&&($e="onCompositionEnd"):t==="keydown"&&i.keyCode===229&&($e="onCompositionStart");$e&&(Ed&&i.locale!=="ko"&&(pa||$e!=="onCompositionStart"?$e==="onCompositionEnd"&&pa&&(We=kd()):(bn=ye,Vo="value"in bn?bn.value:bn.textContent,pa=!0)),Be=oi(le,$e),0<Be.length&&($e=new _d($e,t,null,i,ye),je.push({event:$e,listeners:Be}),We?$e.data=We:(We=Td(i),We!==null&&($e.data=We)))),(We=Vm?Hm(t,i):qm(t,i))&&(le=oi(le,"onBeforeInput"),0<le.length&&(ye=new _d("onBeforeInput","beforeinput",null,i,ye),je.push({event:ye,listeners:le}),ye.data=We))}Qd(je,r)})}function is(t,r,i){return{instance:t,listener:r,currentTarget:i}}function oi(t,r){for(var i=r+"Capture",c=[];t!==null;){var p=t,m=p.stateNode;p.tag===5&&m!==null&&(p=m,m=$t(t,i),m!=null&&c.unshift(is(t,m,p)),m=$t(t,r),m!=null&&c.push(is(t,m,p))),t=t.return}return c}function ma(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function eu(t,r,i,c,p){for(var m=r._reactName,C=[];i!==null&&i!==c;){var M=i,$=M.alternate,le=M.stateNode;if($!==null&&$===c)break;M.tag===5&&le!==null&&(M=le,p?($=$t(i,m),$!=null&&C.unshift(is(i,$,M))):p||($=$t(i,m),$!=null&&C.push(is(i,$,M)))),i=i.return}C.length!==0&&t.push({event:r,listeners:C})}var ig=/\r\n?/g,og=/\u0000|\uFFFD/g;function tu(t){return(typeof t=="string"?t:""+t).replace(ig,`
`).replace(og,"")}function li(t,r,i){if(r=tu(r),tu(t)!==r&&i)throw Error(n(425))}function ci(){}var ol=null,ll=null;function cl(t,r){return t==="textarea"||t==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var dl=typeof setTimeout=="function"?setTimeout:void 0,lg=typeof clearTimeout=="function"?clearTimeout:void 0,ru=typeof Promise=="function"?Promise:void 0,cg=typeof queueMicrotask=="function"?queueMicrotask:typeof ru<"u"?function(t){return ru.resolve(null).then(t).catch(dg)}:dl;function dg(t){setTimeout(function(){throw t})}function ul(t,r){var i=r,c=0;do{var p=i.nextSibling;if(t.removeChild(i),p&&p.nodeType===8)if(i=p.data,i==="/$"){if(c===0){t.removeChild(p),Xa(r);return}c--}else i!=="$"&&i!=="$?"&&i!=="$!"||c++;i=p}while(i);Xa(r)}function jn(t){for(;t!=null;t=t.nextSibling){var r=t.nodeType;if(r===1||r===3)break;if(r===8){if(r=t.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return t}function nu(t){t=t.previousSibling;for(var r=0;t;){if(t.nodeType===8){var i=t.data;if(i==="$"||i==="$!"||i==="$?"){if(r===0)return t;r--}else i==="/$"&&r++}t=t.previousSibling}return null}var ga=Math.random().toString(36).slice(2),Wr="__reactFiber$"+ga,os="__reactProps$"+ga,Qr="__reactContainer$"+ga,pl="__reactEvents$"+ga,ug="__reactListeners$"+ga,pg="__reactHandles$"+ga;function Wn(t){var r=t[Wr];if(r)return r;for(var i=t.parentNode;i;){if(r=i[Qr]||i[Wr]){if(i=r.alternate,r.child!==null||i!==null&&i.child!==null)for(t=nu(t);t!==null;){if(i=t[Wr])return i;t=nu(t)}return r}t=i,i=t.parentNode}return null}function ls(t){return t=t[Wr]||t[Qr],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function xa(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function di(t){return t[os]||null}var fl=[],va=-1;function wn(t){return{current:t}}function lt(t){0>va||(t.current=fl[va],fl[va]=null,va--)}function st(t,r){va++,fl[va]=t.current,t.current=r}var kn={},Ot=wn(kn),Yt=wn(!1),Un=kn;function ba(t,r){var i=t.type.contextTypes;if(!i)return kn;var c=t.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===r)return c.__reactInternalMemoizedMaskedChildContext;var p={},m;for(m in i)p[m]=r[m];return c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=p),p}function Kt(t){return t=t.childContextTypes,t!=null}function ui(){lt(Yt),lt(Ot)}function au(t,r,i){if(Ot.current!==kn)throw Error(n(168));st(Ot,r),st(Yt,i)}function su(t,r,i){var c=t.stateNode;if(r=r.childContextTypes,typeof c.getChildContext!="function")return i;c=c.getChildContext();for(var p in c)if(!(p in r))throw Error(n(108,Te(t)||"Unknown",p));return ce({},i,c)}function pi(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||kn,Un=Ot.current,st(Ot,t),st(Yt,Yt.current),!0}function iu(t,r,i){var c=t.stateNode;if(!c)throw Error(n(169));i?(t=su(t,r,Un),c.__reactInternalMemoizedMergedChildContext=t,lt(Yt),lt(Ot),st(Ot,t)):lt(Yt),st(Yt,i)}var Jr=null,fi=!1,hl=!1;function ou(t){Jr===null?Jr=[t]:Jr.push(t)}function fg(t){fi=!0,ou(t)}function Nn(){if(!hl&&Jr!==null){hl=!0;var t=0,r=rt;try{var i=Jr;for(rt=1;t<i.length;t++){var c=i[t];do c=c(!0);while(c!==null)}Jr=null,fi=!1}catch(p){throw Jr!==null&&(Jr=Jr.slice(t+1)),cd(Oo,Nn),p}finally{rt=r,hl=!1}}return null}var ya=[],ja=0,hi=null,mi=0,gr=[],xr=0,$n=null,en=1,tn="";function Vn(t,r){ya[ja++]=mi,ya[ja++]=hi,hi=t,mi=r}function lu(t,r,i){gr[xr++]=en,gr[xr++]=tn,gr[xr++]=$n,$n=t;var c=en;t=tn;var p=32-Sr(c)-1;c&=~(1<<p),i+=1;var m=32-Sr(r)+p;if(30<m){var C=p-p%5;m=(c&(1<<C)-1).toString(32),c>>=C,p-=C,en=1<<32-Sr(r)+p|i<<p|c,tn=m+t}else en=1<<m|i<<p|c,tn=t}function ml(t){t.return!==null&&(Vn(t,1),lu(t,1,0))}function gl(t){for(;t===hi;)hi=ya[--ja],ya[ja]=null,mi=ya[--ja],ya[ja]=null;for(;t===$n;)$n=gr[--xr],gr[xr]=null,tn=gr[--xr],gr[xr]=null,en=gr[--xr],gr[xr]=null}var ir=null,or=null,dt=!1,Cr=null;function cu(t,r){var i=jr(5,null,null,0);i.elementType="DELETED",i.stateNode=r,i.return=t,r=t.deletions,r===null?(t.deletions=[i],t.flags|=16):r.push(i)}function du(t,r){switch(t.tag){case 5:var i=t.type;return r=r.nodeType!==1||i.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(t.stateNode=r,ir=t,or=jn(r.firstChild),!0):!1;case 6:return r=t.pendingProps===""||r.nodeType!==3?null:r,r!==null?(t.stateNode=r,ir=t,or=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(i=$n!==null?{id:en,overflow:tn}:null,t.memoizedState={dehydrated:r,treeContext:i,retryLane:1073741824},i=jr(18,null,null,0),i.stateNode=r,i.return=t,t.child=i,ir=t,or=null,!0):!1;default:return!1}}function xl(t){return(t.mode&1)!==0&&(t.flags&128)===0}function vl(t){if(dt){var r=or;if(r){var i=r;if(!du(t,r)){if(xl(t))throw Error(n(418));r=jn(i.nextSibling);var c=ir;r&&du(t,r)?cu(c,i):(t.flags=t.flags&-4097|2,dt=!1,ir=t)}}else{if(xl(t))throw Error(n(418));t.flags=t.flags&-4097|2,dt=!1,ir=t}}}function uu(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;ir=t}function gi(t){if(t!==ir)return!1;if(!dt)return uu(t),dt=!0,!1;var r;if((r=t.tag!==3)&&!(r=t.tag!==5)&&(r=t.type,r=r!=="head"&&r!=="body"&&!cl(t.type,t.memoizedProps)),r&&(r=or)){if(xl(t))throw pu(),Error(n(418));for(;r;)cu(t,r),r=jn(r.nextSibling)}if(uu(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,r=0;t;){if(t.nodeType===8){var i=t.data;if(i==="/$"){if(r===0){or=jn(t.nextSibling);break e}r--}else i!=="$"&&i!=="$!"&&i!=="$?"||r++}t=t.nextSibling}or=null}}else or=ir?jn(t.stateNode.nextSibling):null;return!0}function pu(){for(var t=or;t;)t=jn(t.nextSibling)}function wa(){or=ir=null,dt=!1}function bl(t){Cr===null?Cr=[t]:Cr.push(t)}var hg=E.ReactCurrentBatchConfig;function cs(t,r,i){if(t=i.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(i._owner){if(i=i._owner,i){if(i.tag!==1)throw Error(n(309));var c=i.stateNode}if(!c)throw Error(n(147,t));var p=c,m=""+t;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===m?r.ref:(r=function(C){var M=p.refs;C===null?delete M[m]:M[m]=C},r._stringRef=m,r)}if(typeof t!="string")throw Error(n(284));if(!i._owner)throw Error(n(290,t))}return t}function xi(t,r){throw t=Object.prototype.toString.call(r),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":t))}function fu(t){var r=t._init;return r(t._payload)}function hu(t){function r(ne,K){if(t){var ie=ne.deletions;ie===null?(ne.deletions=[K],ne.flags|=16):ie.push(K)}}function i(ne,K){if(!t)return null;for(;K!==null;)r(ne,K),K=K.sibling;return null}function c(ne,K){for(ne=new Map;K!==null;)K.key!==null?ne.set(K.key,K):ne.set(K.index,K),K=K.sibling;return ne}function p(ne,K){return ne=Tn(ne,K),ne.index=0,ne.sibling=null,ne}function m(ne,K,ie){return ne.index=ie,t?(ie=ne.alternate,ie!==null?(ie=ie.index,ie<K?(ne.flags|=2,K):ie):(ne.flags|=2,K)):(ne.flags|=1048576,K)}function C(ne){return t&&ne.alternate===null&&(ne.flags|=2),ne}function M(ne,K,ie,Se){return K===null||K.tag!==6?(K=dc(ie,ne.mode,Se),K.return=ne,K):(K=p(K,ie),K.return=ne,K)}function $(ne,K,ie,Se){var Ie=ie.type;return Ie===B?ye(ne,K,ie.props.children,Se,ie.key):K!==null&&(K.elementType===Ie||typeof Ie=="object"&&Ie!==null&&Ie.$$typeof===ve&&fu(Ie)===K.type)?(Se=p(K,ie.props),Se.ref=cs(ne,K,ie),Se.return=ne,Se):(Se=Wi(ie.type,ie.key,ie.props,null,ne.mode,Se),Se.ref=cs(ne,K,ie),Se.return=ne,Se)}function le(ne,K,ie,Se){return K===null||K.tag!==4||K.stateNode.containerInfo!==ie.containerInfo||K.stateNode.implementation!==ie.implementation?(K=uc(ie,ne.mode,Se),K.return=ne,K):(K=p(K,ie.children||[]),K.return=ne,K)}function ye(ne,K,ie,Se,Ie){return K===null||K.tag!==7?(K=Qn(ie,ne.mode,Se,Ie),K.return=ne,K):(K=p(K,ie),K.return=ne,K)}function je(ne,K,ie){if(typeof K=="string"&&K!==""||typeof K=="number")return K=dc(""+K,ne.mode,ie),K.return=ne,K;if(typeof K=="object"&&K!==null){switch(K.$$typeof){case A:return ie=Wi(K.type,K.key,K.props,null,ne.mode,ie),ie.ref=cs(ne,null,K),ie.return=ne,ie;case D:return K=uc(K,ne.mode,ie),K.return=ne,K;case ve:var Se=K._init;return je(ne,Se(K._payload),ie)}if(ge(K)||Q(K))return K=Qn(K,ne.mode,ie,null),K.return=ne,K;xi(ne,K)}return null}function be(ne,K,ie,Se){var Ie=K!==null?K.key:null;if(typeof ie=="string"&&ie!==""||typeof ie=="number")return Ie!==null?null:M(ne,K,""+ie,Se);if(typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case A:return ie.key===Ie?$(ne,K,ie,Se):null;case D:return ie.key===Ie?le(ne,K,ie,Se):null;case ve:return Ie=ie._init,be(ne,K,Ie(ie._payload),Se)}if(ge(ie)||Q(ie))return Ie!==null?null:ye(ne,K,ie,Se,null);xi(ne,ie)}return null}function Ee(ne,K,ie,Se,Ie){if(typeof Se=="string"&&Se!==""||typeof Se=="number")return ne=ne.get(ie)||null,M(K,ne,""+Se,Ie);if(typeof Se=="object"&&Se!==null){switch(Se.$$typeof){case A:return ne=ne.get(Se.key===null?ie:Se.key)||null,$(K,ne,Se,Ie);case D:return ne=ne.get(Se.key===null?ie:Se.key)||null,le(K,ne,Se,Ie);case ve:var Be=Se._init;return Ee(ne,K,ie,Be(Se._payload),Ie)}if(ge(Se)||Q(Se))return ne=ne.get(ie)||null,ye(K,ne,Se,Ie,null);xi(K,Se)}return null}function Re(ne,K,ie,Se){for(var Ie=null,Be=null,We=K,$e=K=0,Rt=null;We!==null&&$e<ie.length;$e++){We.index>$e?(Rt=We,We=null):Rt=We.sibling;var et=be(ne,We,ie[$e],Se);if(et===null){We===null&&(We=Rt);break}t&&We&&et.alternate===null&&r(ne,We),K=m(et,K,$e),Be===null?Ie=et:Be.sibling=et,Be=et,We=Rt}if($e===ie.length)return i(ne,We),dt&&Vn(ne,$e),Ie;if(We===null){for(;$e<ie.length;$e++)We=je(ne,ie[$e],Se),We!==null&&(K=m(We,K,$e),Be===null?Ie=We:Be.sibling=We,Be=We);return dt&&Vn(ne,$e),Ie}for(We=c(ne,We);$e<ie.length;$e++)Rt=Ee(We,ne,$e,ie[$e],Se),Rt!==null&&(t&&Rt.alternate!==null&&We.delete(Rt.key===null?$e:Rt.key),K=m(Rt,K,$e),Be===null?Ie=Rt:Be.sibling=Rt,Be=Rt);return t&&We.forEach(function(An){return r(ne,An)}),dt&&Vn(ne,$e),Ie}function Le(ne,K,ie,Se){var Ie=Q(ie);if(typeof Ie!="function")throw Error(n(150));if(ie=Ie.call(ie),ie==null)throw Error(n(151));for(var Be=Ie=null,We=K,$e=K=0,Rt=null,et=ie.next();We!==null&&!et.done;$e++,et=ie.next()){We.index>$e?(Rt=We,We=null):Rt=We.sibling;var An=be(ne,We,et.value,Se);if(An===null){We===null&&(We=Rt);break}t&&We&&An.alternate===null&&r(ne,We),K=m(An,K,$e),Be===null?Ie=An:Be.sibling=An,Be=An,We=Rt}if(et.done)return i(ne,We),dt&&Vn(ne,$e),Ie;if(We===null){for(;!et.done;$e++,et=ie.next())et=je(ne,et.value,Se),et!==null&&(K=m(et,K,$e),Be===null?Ie=et:Be.sibling=et,Be=et);return dt&&Vn(ne,$e),Ie}for(We=c(ne,We);!et.done;$e++,et=ie.next())et=Ee(We,ne,$e,et.value,Se),et!==null&&(t&&et.alternate!==null&&We.delete(et.key===null?$e:et.key),K=m(et,K,$e),Be===null?Ie=et:Be.sibling=et,Be=et);return t&&We.forEach(function(Gg){return r(ne,Gg)}),dt&&Vn(ne,$e),Ie}function yt(ne,K,ie,Se){if(typeof ie=="object"&&ie!==null&&ie.type===B&&ie.key===null&&(ie=ie.props.children),typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case A:e:{for(var Ie=ie.key,Be=K;Be!==null;){if(Be.key===Ie){if(Ie=ie.type,Ie===B){if(Be.tag===7){i(ne,Be.sibling),K=p(Be,ie.props.children),K.return=ne,ne=K;break e}}else if(Be.elementType===Ie||typeof Ie=="object"&&Ie!==null&&Ie.$$typeof===ve&&fu(Ie)===Be.type){i(ne,Be.sibling),K=p(Be,ie.props),K.ref=cs(ne,Be,ie),K.return=ne,ne=K;break e}i(ne,Be);break}else r(ne,Be);Be=Be.sibling}ie.type===B?(K=Qn(ie.props.children,ne.mode,Se,ie.key),K.return=ne,ne=K):(Se=Wi(ie.type,ie.key,ie.props,null,ne.mode,Se),Se.ref=cs(ne,K,ie),Se.return=ne,ne=Se)}return C(ne);case D:e:{for(Be=ie.key;K!==null;){if(K.key===Be)if(K.tag===4&&K.stateNode.containerInfo===ie.containerInfo&&K.stateNode.implementation===ie.implementation){i(ne,K.sibling),K=p(K,ie.children||[]),K.return=ne,ne=K;break e}else{i(ne,K);break}else r(ne,K);K=K.sibling}K=uc(ie,ne.mode,Se),K.return=ne,ne=K}return C(ne);case ve:return Be=ie._init,yt(ne,K,Be(ie._payload),Se)}if(ge(ie))return Re(ne,K,ie,Se);if(Q(ie))return Le(ne,K,ie,Se);xi(ne,ie)}return typeof ie=="string"&&ie!==""||typeof ie=="number"?(ie=""+ie,K!==null&&K.tag===6?(i(ne,K.sibling),K=p(K,ie),K.return=ne,ne=K):(i(ne,K),K=dc(ie,ne.mode,Se),K.return=ne,ne=K),C(ne)):i(ne,K)}return yt}var ka=hu(!0),mu=hu(!1),vi=wn(null),bi=null,Na=null,yl=null;function jl(){yl=Na=bi=null}function wl(t){var r=vi.current;lt(vi),t._currentValue=r}function kl(t,r,i){for(;t!==null;){var c=t.alternate;if((t.childLanes&r)!==r?(t.childLanes|=r,c!==null&&(c.childLanes|=r)):c!==null&&(c.childLanes&r)!==r&&(c.childLanes|=r),t===i)break;t=t.return}}function Sa(t,r){bi=t,yl=Na=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&r)!==0&&(Xt=!0),t.firstContext=null)}function vr(t){var r=t._currentValue;if(yl!==t)if(t={context:t,memoizedValue:r,next:null},Na===null){if(bi===null)throw Error(n(308));Na=t,bi.dependencies={lanes:0,firstContext:t}}else Na=Na.next=t;return r}var Hn=null;function Nl(t){Hn===null?Hn=[t]:Hn.push(t)}function gu(t,r,i,c){var p=r.interleaved;return p===null?(i.next=i,Nl(r)):(i.next=p.next,p.next=i),r.interleaved=i,rn(t,c)}function rn(t,r){t.lanes|=r;var i=t.alternate;for(i!==null&&(i.lanes|=r),i=t,t=t.return;t!==null;)t.childLanes|=r,i=t.alternate,i!==null&&(i.childLanes|=r),i=t,t=t.return;return i.tag===3?i.stateNode:null}var Sn=!1;function Sl(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function xu(t,r){t=t.updateQueue,r.updateQueue===t&&(r.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function nn(t,r){return{eventTime:t,lane:r,tag:0,payload:null,callback:null,next:null}}function _n(t,r,i){var c=t.updateQueue;if(c===null)return null;if(c=c.shared,(Je&2)!==0){var p=c.pending;return p===null?r.next=r:(r.next=p.next,p.next=r),c.pending=r,rn(t,i)}return p=c.interleaved,p===null?(r.next=r,Nl(c)):(r.next=p.next,p.next=r),c.interleaved=r,rn(t,i)}function yi(t,r,i){if(r=r.updateQueue,r!==null&&(r=r.shared,(i&4194240)!==0)){var c=r.lanes;c&=t.pendingLanes,i|=c,r.lanes=i,Mo(t,i)}}function vu(t,r){var i=t.updateQueue,c=t.alternate;if(c!==null&&(c=c.updateQueue,i===c)){var p=null,m=null;if(i=i.firstBaseUpdate,i!==null){do{var C={eventTime:i.eventTime,lane:i.lane,tag:i.tag,payload:i.payload,callback:i.callback,next:null};m===null?p=m=C:m=m.next=C,i=i.next}while(i!==null);m===null?p=m=r:m=m.next=r}else p=m=r;i={baseState:c.baseState,firstBaseUpdate:p,lastBaseUpdate:m,shared:c.shared,effects:c.effects},t.updateQueue=i;return}t=i.lastBaseUpdate,t===null?i.firstBaseUpdate=r:t.next=r,i.lastBaseUpdate=r}function ji(t,r,i,c){var p=t.updateQueue;Sn=!1;var m=p.firstBaseUpdate,C=p.lastBaseUpdate,M=p.shared.pending;if(M!==null){p.shared.pending=null;var $=M,le=$.next;$.next=null,C===null?m=le:C.next=le,C=$;var ye=t.alternate;ye!==null&&(ye=ye.updateQueue,M=ye.lastBaseUpdate,M!==C&&(M===null?ye.firstBaseUpdate=le:M.next=le,ye.lastBaseUpdate=$))}if(m!==null){var je=p.baseState;C=0,ye=le=$=null,M=m;do{var be=M.lane,Ee=M.eventTime;if((c&be)===be){ye!==null&&(ye=ye.next={eventTime:Ee,lane:0,tag:M.tag,payload:M.payload,callback:M.callback,next:null});e:{var Re=t,Le=M;switch(be=r,Ee=i,Le.tag){case 1:if(Re=Le.payload,typeof Re=="function"){je=Re.call(Ee,je,be);break e}je=Re;break e;case 3:Re.flags=Re.flags&-65537|128;case 0:if(Re=Le.payload,be=typeof Re=="function"?Re.call(Ee,je,be):Re,be==null)break e;je=ce({},je,be);break e;case 2:Sn=!0}}M.callback!==null&&M.lane!==0&&(t.flags|=64,be=p.effects,be===null?p.effects=[M]:be.push(M))}else Ee={eventTime:Ee,lane:be,tag:M.tag,payload:M.payload,callback:M.callback,next:null},ye===null?(le=ye=Ee,$=je):ye=ye.next=Ee,C|=be;if(M=M.next,M===null){if(M=p.shared.pending,M===null)break;be=M,M=be.next,be.next=null,p.lastBaseUpdate=be,p.shared.pending=null}}while(!0);if(ye===null&&($=je),p.baseState=$,p.firstBaseUpdate=le,p.lastBaseUpdate=ye,r=p.shared.interleaved,r!==null){p=r;do C|=p.lane,p=p.next;while(p!==r)}else m===null&&(p.shared.lanes=0);Yn|=C,t.lanes=C,t.memoizedState=je}}function bu(t,r,i){if(t=r.effects,r.effects=null,t!==null)for(r=0;r<t.length;r++){var c=t[r],p=c.callback;if(p!==null){if(c.callback=null,c=i,typeof p!="function")throw Error(n(191,p));p.call(c)}}}var ds={},Ur=wn(ds),us=wn(ds),ps=wn(ds);function qn(t){if(t===ds)throw Error(n(174));return t}function _l(t,r){switch(st(ps,r),st(us,t),st(Ur,ds),t=r.nodeType,t){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:De(null,"");break;default:t=t===8?r.parentNode:r,r=t.namespaceURI||null,t=t.tagName,r=De(r,t)}lt(Ur),st(Ur,r)}function _a(){lt(Ur),lt(us),lt(ps)}function yu(t){qn(ps.current);var r=qn(Ur.current),i=De(r,t.type);r!==i&&(st(us,t),st(Ur,i))}function Cl(t){us.current===t&&(lt(Ur),lt(us))}var ut=wn(0);function wi(t){for(var r=t;r!==null;){if(r.tag===13){var i=r.memoizedState;if(i!==null&&(i=i.dehydrated,i===null||i.data==="$?"||i.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if((r.flags&128)!==0)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var El=[];function zl(){for(var t=0;t<El.length;t++)El[t]._workInProgressVersionPrimary=null;El.length=0}var ki=E.ReactCurrentDispatcher,Pl=E.ReactCurrentBatchConfig,Gn=0,pt=null,_t=null,zt=null,Ni=!1,fs=!1,hs=0,mg=0;function Ft(){throw Error(n(321))}function Rl(t,r){if(r===null)return!1;for(var i=0;i<r.length&&i<t.length;i++)if(!_r(t[i],r[i]))return!1;return!0}function Tl(t,r,i,c,p,m){if(Gn=m,pt=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,ki.current=t===null||t.memoizedState===null?bg:yg,t=i(c,p),fs){m=0;do{if(fs=!1,hs=0,25<=m)throw Error(n(301));m+=1,zt=_t=null,r.updateQueue=null,ki.current=jg,t=i(c,p)}while(fs)}if(ki.current=Ci,r=_t!==null&&_t.next!==null,Gn=0,zt=_t=pt=null,Ni=!1,r)throw Error(n(300));return t}function Al(){var t=hs!==0;return hs=0,t}function $r(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return zt===null?pt.memoizedState=zt=t:zt=zt.next=t,zt}function br(){if(_t===null){var t=pt.alternate;t=t!==null?t.memoizedState:null}else t=_t.next;var r=zt===null?pt.memoizedState:zt.next;if(r!==null)zt=r,_t=t;else{if(t===null)throw Error(n(310));_t=t,t={memoizedState:_t.memoizedState,baseState:_t.baseState,baseQueue:_t.baseQueue,queue:_t.queue,next:null},zt===null?pt.memoizedState=zt=t:zt=zt.next=t}return zt}function ms(t,r){return typeof r=="function"?r(t):r}function Ll(t){var r=br(),i=r.queue;if(i===null)throw Error(n(311));i.lastRenderedReducer=t;var c=_t,p=c.baseQueue,m=i.pending;if(m!==null){if(p!==null){var C=p.next;p.next=m.next,m.next=C}c.baseQueue=p=m,i.pending=null}if(p!==null){m=p.next,c=c.baseState;var M=C=null,$=null,le=m;do{var ye=le.lane;if((Gn&ye)===ye)$!==null&&($=$.next={lane:0,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null}),c=le.hasEagerState?le.eagerState:t(c,le.action);else{var je={lane:ye,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null};$===null?(M=$=je,C=c):$=$.next=je,pt.lanes|=ye,Yn|=ye}le=le.next}while(le!==null&&le!==m);$===null?C=c:$.next=M,_r(c,r.memoizedState)||(Xt=!0),r.memoizedState=c,r.baseState=C,r.baseQueue=$,i.lastRenderedState=c}if(t=i.interleaved,t!==null){p=t;do m=p.lane,pt.lanes|=m,Yn|=m,p=p.next;while(p!==t)}else p===null&&(i.lanes=0);return[r.memoizedState,i.dispatch]}function Il(t){var r=br(),i=r.queue;if(i===null)throw Error(n(311));i.lastRenderedReducer=t;var c=i.dispatch,p=i.pending,m=r.memoizedState;if(p!==null){i.pending=null;var C=p=p.next;do m=t(m,C.action),C=C.next;while(C!==p);_r(m,r.memoizedState)||(Xt=!0),r.memoizedState=m,r.baseQueue===null&&(r.baseState=m),i.lastRenderedState=m}return[m,c]}function ju(){}function wu(t,r){var i=pt,c=br(),p=r(),m=!_r(c.memoizedState,p);if(m&&(c.memoizedState=p,Xt=!0),c=c.queue,Ol(Su.bind(null,i,c,t),[t]),c.getSnapshot!==r||m||zt!==null&&zt.memoizedState.tag&1){if(i.flags|=2048,gs(9,Nu.bind(null,i,c,p,r),void 0,null),Pt===null)throw Error(n(349));(Gn&30)!==0||ku(i,r,p)}return p}function ku(t,r,i){t.flags|=16384,t={getSnapshot:r,value:i},r=pt.updateQueue,r===null?(r={lastEffect:null,stores:null},pt.updateQueue=r,r.stores=[t]):(i=r.stores,i===null?r.stores=[t]:i.push(t))}function Nu(t,r,i,c){r.value=i,r.getSnapshot=c,_u(r)&&Cu(t)}function Su(t,r,i){return i(function(){_u(r)&&Cu(t)})}function _u(t){var r=t.getSnapshot;t=t.value;try{var i=r();return!_r(t,i)}catch{return!0}}function Cu(t){var r=rn(t,1);r!==null&&Rr(r,t,1,-1)}function Eu(t){var r=$r();return typeof t=="function"&&(t=t()),r.memoizedState=r.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:t},r.queue=t,t=t.dispatch=vg.bind(null,pt,t),[r.memoizedState,t]}function gs(t,r,i,c){return t={tag:t,create:r,destroy:i,deps:c,next:null},r=pt.updateQueue,r===null?(r={lastEffect:null,stores:null},pt.updateQueue=r,r.lastEffect=t.next=t):(i=r.lastEffect,i===null?r.lastEffect=t.next=t:(c=i.next,i.next=t,t.next=c,r.lastEffect=t)),t}function zu(){return br().memoizedState}function Si(t,r,i,c){var p=$r();pt.flags|=t,p.memoizedState=gs(1|r,i,void 0,c===void 0?null:c)}function _i(t,r,i,c){var p=br();c=c===void 0?null:c;var m=void 0;if(_t!==null){var C=_t.memoizedState;if(m=C.destroy,c!==null&&Rl(c,C.deps)){p.memoizedState=gs(r,i,m,c);return}}pt.flags|=t,p.memoizedState=gs(1|r,i,m,c)}function Pu(t,r){return Si(8390656,8,t,r)}function Ol(t,r){return _i(2048,8,t,r)}function Ru(t,r){return _i(4,2,t,r)}function Tu(t,r){return _i(4,4,t,r)}function Au(t,r){if(typeof r=="function")return t=t(),r(t),function(){r(null)};if(r!=null)return t=t(),r.current=t,function(){r.current=null}}function Lu(t,r,i){return i=i!=null?i.concat([t]):null,_i(4,4,Au.bind(null,r,t),i)}function Fl(){}function Iu(t,r){var i=br();r=r===void 0?null:r;var c=i.memoizedState;return c!==null&&r!==null&&Rl(r,c[1])?c[0]:(i.memoizedState=[t,r],t)}function Ou(t,r){var i=br();r=r===void 0?null:r;var c=i.memoizedState;return c!==null&&r!==null&&Rl(r,c[1])?c[0]:(t=t(),i.memoizedState=[t,r],t)}function Fu(t,r,i){return(Gn&21)===0?(t.baseState&&(t.baseState=!1,Xt=!0),t.memoizedState=i):(_r(i,r)||(i=fd(),pt.lanes|=i,Yn|=i,t.baseState=!0),r)}function gg(t,r){var i=rt;rt=i!==0&&4>i?i:4,t(!0);var c=Pl.transition;Pl.transition={};try{t(!1),r()}finally{rt=i,Pl.transition=c}}function Du(){return br().memoizedState}function xg(t,r,i){var c=Pn(t);if(i={lane:c,action:i,hasEagerState:!1,eagerState:null,next:null},Mu(t))Bu(r,i);else if(i=gu(t,r,i,c),i!==null){var p=Ht();Rr(i,t,c,p),Wu(i,r,c)}}function vg(t,r,i){var c=Pn(t),p={lane:c,action:i,hasEagerState:!1,eagerState:null,next:null};if(Mu(t))Bu(r,p);else{var m=t.alternate;if(t.lanes===0&&(m===null||m.lanes===0)&&(m=r.lastRenderedReducer,m!==null))try{var C=r.lastRenderedState,M=m(C,i);if(p.hasEagerState=!0,p.eagerState=M,_r(M,C)){var $=r.interleaved;$===null?(p.next=p,Nl(r)):(p.next=$.next,$.next=p),r.interleaved=p;return}}catch{}finally{}i=gu(t,r,p,c),i!==null&&(p=Ht(),Rr(i,t,c,p),Wu(i,r,c))}}function Mu(t){var r=t.alternate;return t===pt||r!==null&&r===pt}function Bu(t,r){fs=Ni=!0;var i=t.pending;i===null?r.next=r:(r.next=i.next,i.next=r),t.pending=r}function Wu(t,r,i){if((i&4194240)!==0){var c=r.lanes;c&=t.pendingLanes,i|=c,r.lanes=i,Mo(t,i)}}var Ci={readContext:vr,useCallback:Ft,useContext:Ft,useEffect:Ft,useImperativeHandle:Ft,useInsertionEffect:Ft,useLayoutEffect:Ft,useMemo:Ft,useReducer:Ft,useRef:Ft,useState:Ft,useDebugValue:Ft,useDeferredValue:Ft,useTransition:Ft,useMutableSource:Ft,useSyncExternalStore:Ft,useId:Ft,unstable_isNewReconciler:!1},bg={readContext:vr,useCallback:function(t,r){return $r().memoizedState=[t,r===void 0?null:r],t},useContext:vr,useEffect:Pu,useImperativeHandle:function(t,r,i){return i=i!=null?i.concat([t]):null,Si(4194308,4,Au.bind(null,r,t),i)},useLayoutEffect:function(t,r){return Si(4194308,4,t,r)},useInsertionEffect:function(t,r){return Si(4,2,t,r)},useMemo:function(t,r){var i=$r();return r=r===void 0?null:r,t=t(),i.memoizedState=[t,r],t},useReducer:function(t,r,i){var c=$r();return r=i!==void 0?i(r):r,c.memoizedState=c.baseState=r,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:r},c.queue=t,t=t.dispatch=xg.bind(null,pt,t),[c.memoizedState,t]},useRef:function(t){var r=$r();return t={current:t},r.memoizedState=t},useState:Eu,useDebugValue:Fl,useDeferredValue:function(t){return $r().memoizedState=t},useTransition:function(){var t=Eu(!1),r=t[0];return t=gg.bind(null,t[1]),$r().memoizedState=t,[r,t]},useMutableSource:function(){},useSyncExternalStore:function(t,r,i){var c=pt,p=$r();if(dt){if(i===void 0)throw Error(n(407));i=i()}else{if(i=r(),Pt===null)throw Error(n(349));(Gn&30)!==0||ku(c,r,i)}p.memoizedState=i;var m={value:i,getSnapshot:r};return p.queue=m,Pu(Su.bind(null,c,m,t),[t]),c.flags|=2048,gs(9,Nu.bind(null,c,m,i,r),void 0,null),i},useId:function(){var t=$r(),r=Pt.identifierPrefix;if(dt){var i=tn,c=en;i=(c&~(1<<32-Sr(c)-1)).toString(32)+i,r=":"+r+"R"+i,i=hs++,0<i&&(r+="H"+i.toString(32)),r+=":"}else i=mg++,r=":"+r+"r"+i.toString(32)+":";return t.memoizedState=r},unstable_isNewReconciler:!1},yg={readContext:vr,useCallback:Iu,useContext:vr,useEffect:Ol,useImperativeHandle:Lu,useInsertionEffect:Ru,useLayoutEffect:Tu,useMemo:Ou,useReducer:Ll,useRef:zu,useState:function(){return Ll(ms)},useDebugValue:Fl,useDeferredValue:function(t){var r=br();return Fu(r,_t.memoizedState,t)},useTransition:function(){var t=Ll(ms)[0],r=br().memoizedState;return[t,r]},useMutableSource:ju,useSyncExternalStore:wu,useId:Du,unstable_isNewReconciler:!1},jg={readContext:vr,useCallback:Iu,useContext:vr,useEffect:Ol,useImperativeHandle:Lu,useInsertionEffect:Ru,useLayoutEffect:Tu,useMemo:Ou,useReducer:Il,useRef:zu,useState:function(){return Il(ms)},useDebugValue:Fl,useDeferredValue:function(t){var r=br();return _t===null?r.memoizedState=t:Fu(r,_t.memoizedState,t)},useTransition:function(){var t=Il(ms)[0],r=br().memoizedState;return[t,r]},useMutableSource:ju,useSyncExternalStore:wu,useId:Du,unstable_isNewReconciler:!1};function Er(t,r){if(t&&t.defaultProps){r=ce({},r),t=t.defaultProps;for(var i in t)r[i]===void 0&&(r[i]=t[i]);return r}return r}function Dl(t,r,i,c){r=t.memoizedState,i=i(c,r),i=i==null?r:ce({},r,i),t.memoizedState=i,t.lanes===0&&(t.updateQueue.baseState=i)}var Ei={isMounted:function(t){return(t=t._reactInternals)?Zr(t)===t:!1},enqueueSetState:function(t,r,i){t=t._reactInternals;var c=Ht(),p=Pn(t),m=nn(c,p);m.payload=r,i!=null&&(m.callback=i),r=_n(t,m,p),r!==null&&(Rr(r,t,p,c),yi(r,t,p))},enqueueReplaceState:function(t,r,i){t=t._reactInternals;var c=Ht(),p=Pn(t),m=nn(c,p);m.tag=1,m.payload=r,i!=null&&(m.callback=i),r=_n(t,m,p),r!==null&&(Rr(r,t,p,c),yi(r,t,p))},enqueueForceUpdate:function(t,r){t=t._reactInternals;var i=Ht(),c=Pn(t),p=nn(i,c);p.tag=2,r!=null&&(p.callback=r),r=_n(t,p,c),r!==null&&(Rr(r,t,c,i),yi(r,t,c))}};function Uu(t,r,i,c,p,m,C){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(c,m,C):r.prototype&&r.prototype.isPureReactComponent?!rs(i,c)||!rs(p,m):!0}function $u(t,r,i){var c=!1,p=kn,m=r.contextType;return typeof m=="object"&&m!==null?m=vr(m):(p=Kt(r)?Un:Ot.current,c=r.contextTypes,m=(c=c!=null)?ba(t,p):kn),r=new r(i,m),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=Ei,t.stateNode=r,r._reactInternals=t,c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=p,t.__reactInternalMemoizedMaskedChildContext=m),r}function Vu(t,r,i,c){t=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(i,c),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(i,c),r.state!==t&&Ei.enqueueReplaceState(r,r.state,null)}function Ml(t,r,i,c){var p=t.stateNode;p.props=i,p.state=t.memoizedState,p.refs={},Sl(t);var m=r.contextType;typeof m=="object"&&m!==null?p.context=vr(m):(m=Kt(r)?Un:Ot.current,p.context=ba(t,m)),p.state=t.memoizedState,m=r.getDerivedStateFromProps,typeof m=="function"&&(Dl(t,r,m,i),p.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(r=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),r!==p.state&&Ei.enqueueReplaceState(p,p.state,null),ji(t,i,p,c),p.state=t.memoizedState),typeof p.componentDidMount=="function"&&(t.flags|=4194308)}function Ca(t,r){try{var i="",c=r;do i+=te(c),c=c.return;while(c);var p=i}catch(m){p=`
Error generating stack: `+m.message+`
`+m.stack}return{value:t,source:r,stack:p,digest:null}}function Bl(t,r,i){return{value:t,source:null,stack:i??null,digest:r??null}}function Wl(t,r){try{console.error(r.value)}catch(i){setTimeout(function(){throw i})}}var wg=typeof WeakMap=="function"?WeakMap:Map;function Hu(t,r,i){i=nn(-1,i),i.tag=3,i.payload={element:null};var c=r.value;return i.callback=function(){Ii||(Ii=!0,rc=c),Wl(t,r)},i}function qu(t,r,i){i=nn(-1,i),i.tag=3;var c=t.type.getDerivedStateFromError;if(typeof c=="function"){var p=r.value;i.payload=function(){return c(p)},i.callback=function(){Wl(t,r)}}var m=t.stateNode;return m!==null&&typeof m.componentDidCatch=="function"&&(i.callback=function(){Wl(t,r),typeof c!="function"&&(En===null?En=new Set([this]):En.add(this));var C=r.stack;this.componentDidCatch(r.value,{componentStack:C!==null?C:""})}),i}function Gu(t,r,i){var c=t.pingCache;if(c===null){c=t.pingCache=new wg;var p=new Set;c.set(r,p)}else p=c.get(r),p===void 0&&(p=new Set,c.set(r,p));p.has(i)||(p.add(i),t=Og.bind(null,t,r,i),r.then(t,t))}function Yu(t){do{var r;if((r=t.tag===13)&&(r=t.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return t;t=t.return}while(t!==null);return null}function Ku(t,r,i,c,p){return(t.mode&1)===0?(t===r?t.flags|=65536:(t.flags|=128,i.flags|=131072,i.flags&=-52805,i.tag===1&&(i.alternate===null?i.tag=17:(r=nn(-1,1),r.tag=2,_n(i,r,1))),i.lanes|=1),t):(t.flags|=65536,t.lanes=p,t)}var kg=E.ReactCurrentOwner,Xt=!1;function Vt(t,r,i,c){r.child=t===null?mu(r,null,i,c):ka(r,t.child,i,c)}function Xu(t,r,i,c,p){i=i.render;var m=r.ref;return Sa(r,p),c=Tl(t,r,i,c,m,p),i=Al(),t!==null&&!Xt?(r.updateQueue=t.updateQueue,r.flags&=-2053,t.lanes&=~p,an(t,r,p)):(dt&&i&&ml(r),r.flags|=1,Vt(t,r,c,p),r.child)}function Zu(t,r,i,c,p){if(t===null){var m=i.type;return typeof m=="function"&&!cc(m)&&m.defaultProps===void 0&&i.compare===null&&i.defaultProps===void 0?(r.tag=15,r.type=m,Qu(t,r,m,c,p)):(t=Wi(i.type,null,c,r,r.mode,p),t.ref=r.ref,t.return=r,r.child=t)}if(m=t.child,(t.lanes&p)===0){var C=m.memoizedProps;if(i=i.compare,i=i!==null?i:rs,i(C,c)&&t.ref===r.ref)return an(t,r,p)}return r.flags|=1,t=Tn(m,c),t.ref=r.ref,t.return=r,r.child=t}function Qu(t,r,i,c,p){if(t!==null){var m=t.memoizedProps;if(rs(m,c)&&t.ref===r.ref)if(Xt=!1,r.pendingProps=c=m,(t.lanes&p)!==0)(t.flags&131072)!==0&&(Xt=!0);else return r.lanes=t.lanes,an(t,r,p)}return Ul(t,r,i,c,p)}function Ju(t,r,i){var c=r.pendingProps,p=c.children,m=t!==null?t.memoizedState:null;if(c.mode==="hidden")if((r.mode&1)===0)r.memoizedState={baseLanes:0,cachePool:null,transitions:null},st(za,lr),lr|=i;else{if((i&1073741824)===0)return t=m!==null?m.baseLanes|i:i,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:t,cachePool:null,transitions:null},r.updateQueue=null,st(za,lr),lr|=t,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=m!==null?m.baseLanes:i,st(za,lr),lr|=c}else m!==null?(c=m.baseLanes|i,r.memoizedState=null):c=i,st(za,lr),lr|=c;return Vt(t,r,p,i),r.child}function ep(t,r){var i=r.ref;(t===null&&i!==null||t!==null&&t.ref!==i)&&(r.flags|=512,r.flags|=2097152)}function Ul(t,r,i,c,p){var m=Kt(i)?Un:Ot.current;return m=ba(r,m),Sa(r,p),i=Tl(t,r,i,c,m,p),c=Al(),t!==null&&!Xt?(r.updateQueue=t.updateQueue,r.flags&=-2053,t.lanes&=~p,an(t,r,p)):(dt&&c&&ml(r),r.flags|=1,Vt(t,r,i,p),r.child)}function tp(t,r,i,c,p){if(Kt(i)){var m=!0;pi(r)}else m=!1;if(Sa(r,p),r.stateNode===null)Pi(t,r),$u(r,i,c),Ml(r,i,c,p),c=!0;else if(t===null){var C=r.stateNode,M=r.memoizedProps;C.props=M;var $=C.context,le=i.contextType;typeof le=="object"&&le!==null?le=vr(le):(le=Kt(i)?Un:Ot.current,le=ba(r,le));var ye=i.getDerivedStateFromProps,je=typeof ye=="function"||typeof C.getSnapshotBeforeUpdate=="function";je||typeof C.UNSAFE_componentWillReceiveProps!="function"&&typeof C.componentWillReceiveProps!="function"||(M!==c||$!==le)&&Vu(r,C,c,le),Sn=!1;var be=r.memoizedState;C.state=be,ji(r,c,C,p),$=r.memoizedState,M!==c||be!==$||Yt.current||Sn?(typeof ye=="function"&&(Dl(r,i,ye,c),$=r.memoizedState),(M=Sn||Uu(r,i,M,c,be,$,le))?(je||typeof C.UNSAFE_componentWillMount!="function"&&typeof C.componentWillMount!="function"||(typeof C.componentWillMount=="function"&&C.componentWillMount(),typeof C.UNSAFE_componentWillMount=="function"&&C.UNSAFE_componentWillMount()),typeof C.componentDidMount=="function"&&(r.flags|=4194308)):(typeof C.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=c,r.memoizedState=$),C.props=c,C.state=$,C.context=le,c=M):(typeof C.componentDidMount=="function"&&(r.flags|=4194308),c=!1)}else{C=r.stateNode,xu(t,r),M=r.memoizedProps,le=r.type===r.elementType?M:Er(r.type,M),C.props=le,je=r.pendingProps,be=C.context,$=i.contextType,typeof $=="object"&&$!==null?$=vr($):($=Kt(i)?Un:Ot.current,$=ba(r,$));var Ee=i.getDerivedStateFromProps;(ye=typeof Ee=="function"||typeof C.getSnapshotBeforeUpdate=="function")||typeof C.UNSAFE_componentWillReceiveProps!="function"&&typeof C.componentWillReceiveProps!="function"||(M!==je||be!==$)&&Vu(r,C,c,$),Sn=!1,be=r.memoizedState,C.state=be,ji(r,c,C,p);var Re=r.memoizedState;M!==je||be!==Re||Yt.current||Sn?(typeof Ee=="function"&&(Dl(r,i,Ee,c),Re=r.memoizedState),(le=Sn||Uu(r,i,le,c,be,Re,$)||!1)?(ye||typeof C.UNSAFE_componentWillUpdate!="function"&&typeof C.componentWillUpdate!="function"||(typeof C.componentWillUpdate=="function"&&C.componentWillUpdate(c,Re,$),typeof C.UNSAFE_componentWillUpdate=="function"&&C.UNSAFE_componentWillUpdate(c,Re,$)),typeof C.componentDidUpdate=="function"&&(r.flags|=4),typeof C.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof C.componentDidUpdate!="function"||M===t.memoizedProps&&be===t.memoizedState||(r.flags|=4),typeof C.getSnapshotBeforeUpdate!="function"||M===t.memoizedProps&&be===t.memoizedState||(r.flags|=1024),r.memoizedProps=c,r.memoizedState=Re),C.props=c,C.state=Re,C.context=$,c=le):(typeof C.componentDidUpdate!="function"||M===t.memoizedProps&&be===t.memoizedState||(r.flags|=4),typeof C.getSnapshotBeforeUpdate!="function"||M===t.memoizedProps&&be===t.memoizedState||(r.flags|=1024),c=!1)}return $l(t,r,i,c,m,p)}function $l(t,r,i,c,p,m){ep(t,r);var C=(r.flags&128)!==0;if(!c&&!C)return p&&iu(r,i,!1),an(t,r,m);c=r.stateNode,kg.current=r;var M=C&&typeof i.getDerivedStateFromError!="function"?null:c.render();return r.flags|=1,t!==null&&C?(r.child=ka(r,t.child,null,m),r.child=ka(r,null,M,m)):Vt(t,r,M,m),r.memoizedState=c.state,p&&iu(r,i,!0),r.child}function rp(t){var r=t.stateNode;r.pendingContext?au(t,r.pendingContext,r.pendingContext!==r.context):r.context&&au(t,r.context,!1),_l(t,r.containerInfo)}function np(t,r,i,c,p){return wa(),bl(p),r.flags|=256,Vt(t,r,i,c),r.child}var Vl={dehydrated:null,treeContext:null,retryLane:0};function Hl(t){return{baseLanes:t,cachePool:null,transitions:null}}function ap(t,r,i){var c=r.pendingProps,p=ut.current,m=!1,C=(r.flags&128)!==0,M;if((M=C)||(M=t!==null&&t.memoizedState===null?!1:(p&2)!==0),M?(m=!0,r.flags&=-129):(t===null||t.memoizedState!==null)&&(p|=1),st(ut,p&1),t===null)return vl(r),t=r.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((r.mode&1)===0?r.lanes=1:t.data==="$!"?r.lanes=8:r.lanes=1073741824,null):(C=c.children,t=c.fallback,m?(c=r.mode,m=r.child,C={mode:"hidden",children:C},(c&1)===0&&m!==null?(m.childLanes=0,m.pendingProps=C):m=Ui(C,c,0,null),t=Qn(t,c,i,null),m.return=r,t.return=r,m.sibling=t,r.child=m,r.child.memoizedState=Hl(i),r.memoizedState=Vl,t):ql(r,C));if(p=t.memoizedState,p!==null&&(M=p.dehydrated,M!==null))return Ng(t,r,C,c,M,p,i);if(m){m=c.fallback,C=r.mode,p=t.child,M=p.sibling;var $={mode:"hidden",children:c.children};return(C&1)===0&&r.child!==p?(c=r.child,c.childLanes=0,c.pendingProps=$,r.deletions=null):(c=Tn(p,$),c.subtreeFlags=p.subtreeFlags&14680064),M!==null?m=Tn(M,m):(m=Qn(m,C,i,null),m.flags|=2),m.return=r,c.return=r,c.sibling=m,r.child=c,c=m,m=r.child,C=t.child.memoizedState,C=C===null?Hl(i):{baseLanes:C.baseLanes|i,cachePool:null,transitions:C.transitions},m.memoizedState=C,m.childLanes=t.childLanes&~i,r.memoizedState=Vl,c}return m=t.child,t=m.sibling,c=Tn(m,{mode:"visible",children:c.children}),(r.mode&1)===0&&(c.lanes=i),c.return=r,c.sibling=null,t!==null&&(i=r.deletions,i===null?(r.deletions=[t],r.flags|=16):i.push(t)),r.child=c,r.memoizedState=null,c}function ql(t,r){return r=Ui({mode:"visible",children:r},t.mode,0,null),r.return=t,t.child=r}function zi(t,r,i,c){return c!==null&&bl(c),ka(r,t.child,null,i),t=ql(r,r.pendingProps.children),t.flags|=2,r.memoizedState=null,t}function Ng(t,r,i,c,p,m,C){if(i)return r.flags&256?(r.flags&=-257,c=Bl(Error(n(422))),zi(t,r,C,c)):r.memoizedState!==null?(r.child=t.child,r.flags|=128,null):(m=c.fallback,p=r.mode,c=Ui({mode:"visible",children:c.children},p,0,null),m=Qn(m,p,C,null),m.flags|=2,c.return=r,m.return=r,c.sibling=m,r.child=c,(r.mode&1)!==0&&ka(r,t.child,null,C),r.child.memoizedState=Hl(C),r.memoizedState=Vl,m);if((r.mode&1)===0)return zi(t,r,C,null);if(p.data==="$!"){if(c=p.nextSibling&&p.nextSibling.dataset,c)var M=c.dgst;return c=M,m=Error(n(419)),c=Bl(m,c,void 0),zi(t,r,C,c)}if(M=(C&t.childLanes)!==0,Xt||M){if(c=Pt,c!==null){switch(C&-C){case 4:p=2;break;case 16:p=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:p=32;break;case 536870912:p=268435456;break;default:p=0}p=(p&(c.suspendedLanes|C))!==0?0:p,p!==0&&p!==m.retryLane&&(m.retryLane=p,rn(t,p),Rr(c,t,p,-1))}return lc(),c=Bl(Error(n(421))),zi(t,r,C,c)}return p.data==="$?"?(r.flags|=128,r.child=t.child,r=Fg.bind(null,t),p._reactRetry=r,null):(t=m.treeContext,or=jn(p.nextSibling),ir=r,dt=!0,Cr=null,t!==null&&(gr[xr++]=en,gr[xr++]=tn,gr[xr++]=$n,en=t.id,tn=t.overflow,$n=r),r=ql(r,c.children),r.flags|=4096,r)}function sp(t,r,i){t.lanes|=r;var c=t.alternate;c!==null&&(c.lanes|=r),kl(t.return,r,i)}function Gl(t,r,i,c,p){var m=t.memoizedState;m===null?t.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:c,tail:i,tailMode:p}:(m.isBackwards=r,m.rendering=null,m.renderingStartTime=0,m.last=c,m.tail=i,m.tailMode=p)}function ip(t,r,i){var c=r.pendingProps,p=c.revealOrder,m=c.tail;if(Vt(t,r,c.children,i),c=ut.current,(c&2)!==0)c=c&1|2,r.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=r.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&sp(t,i,r);else if(t.tag===19)sp(t,i,r);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===r)break e;for(;t.sibling===null;){if(t.return===null||t.return===r)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}c&=1}if(st(ut,c),(r.mode&1)===0)r.memoizedState=null;else switch(p){case"forwards":for(i=r.child,p=null;i!==null;)t=i.alternate,t!==null&&wi(t)===null&&(p=i),i=i.sibling;i=p,i===null?(p=r.child,r.child=null):(p=i.sibling,i.sibling=null),Gl(r,!1,p,i,m);break;case"backwards":for(i=null,p=r.child,r.child=null;p!==null;){if(t=p.alternate,t!==null&&wi(t)===null){r.child=p;break}t=p.sibling,p.sibling=i,i=p,p=t}Gl(r,!0,i,null,m);break;case"together":Gl(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function Pi(t,r){(r.mode&1)===0&&t!==null&&(t.alternate=null,r.alternate=null,r.flags|=2)}function an(t,r,i){if(t!==null&&(r.dependencies=t.dependencies),Yn|=r.lanes,(i&r.childLanes)===0)return null;if(t!==null&&r.child!==t.child)throw Error(n(153));if(r.child!==null){for(t=r.child,i=Tn(t,t.pendingProps),r.child=i,i.return=r;t.sibling!==null;)t=t.sibling,i=i.sibling=Tn(t,t.pendingProps),i.return=r;i.sibling=null}return r.child}function Sg(t,r,i){switch(r.tag){case 3:rp(r),wa();break;case 5:yu(r);break;case 1:Kt(r.type)&&pi(r);break;case 4:_l(r,r.stateNode.containerInfo);break;case 10:var c=r.type._context,p=r.memoizedProps.value;st(vi,c._currentValue),c._currentValue=p;break;case 13:if(c=r.memoizedState,c!==null)return c.dehydrated!==null?(st(ut,ut.current&1),r.flags|=128,null):(i&r.child.childLanes)!==0?ap(t,r,i):(st(ut,ut.current&1),t=an(t,r,i),t!==null?t.sibling:null);st(ut,ut.current&1);break;case 19:if(c=(i&r.childLanes)!==0,(t.flags&128)!==0){if(c)return ip(t,r,i);r.flags|=128}if(p=r.memoizedState,p!==null&&(p.rendering=null,p.tail=null,p.lastEffect=null),st(ut,ut.current),c)break;return null;case 22:case 23:return r.lanes=0,Ju(t,r,i)}return an(t,r,i)}var op,Yl,lp,cp;op=function(t,r){for(var i=r.child;i!==null;){if(i.tag===5||i.tag===6)t.appendChild(i.stateNode);else if(i.tag!==4&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===r)break;for(;i.sibling===null;){if(i.return===null||i.return===r)return;i=i.return}i.sibling.return=i.return,i=i.sibling}},Yl=function(){},lp=function(t,r,i,c){var p=t.memoizedProps;if(p!==c){t=r.stateNode,qn(Ur.current);var m=null;switch(i){case"input":p=y(t,p),c=y(t,c),m=[];break;case"select":p=ce({},p,{value:void 0}),c=ce({},c,{value:void 0}),m=[];break;case"textarea":p=ae(t,p),c=ae(t,c),m=[];break;default:typeof p.onClick!="function"&&typeof c.onClick=="function"&&(t.onclick=ci)}kt(i,c);var C;i=null;for(le in p)if(!c.hasOwnProperty(le)&&p.hasOwnProperty(le)&&p[le]!=null)if(le==="style"){var M=p[le];for(C in M)M.hasOwnProperty(C)&&(i||(i={}),i[C]="")}else le!=="dangerouslySetInnerHTML"&&le!=="children"&&le!=="suppressContentEditableWarning"&&le!=="suppressHydrationWarning"&&le!=="autoFocus"&&(l.hasOwnProperty(le)?m||(m=[]):(m=m||[]).push(le,null));for(le in c){var $=c[le];if(M=p!=null?p[le]:void 0,c.hasOwnProperty(le)&&$!==M&&($!=null||M!=null))if(le==="style")if(M){for(C in M)!M.hasOwnProperty(C)||$&&$.hasOwnProperty(C)||(i||(i={}),i[C]="");for(C in $)$.hasOwnProperty(C)&&M[C]!==$[C]&&(i||(i={}),i[C]=$[C])}else i||(m||(m=[]),m.push(le,i)),i=$;else le==="dangerouslySetInnerHTML"?($=$?$.__html:void 0,M=M?M.__html:void 0,$!=null&&M!==$&&(m=m||[]).push(le,$)):le==="children"?typeof $!="string"&&typeof $!="number"||(m=m||[]).push(le,""+$):le!=="suppressContentEditableWarning"&&le!=="suppressHydrationWarning"&&(l.hasOwnProperty(le)?($!=null&&le==="onScroll"&&ot("scroll",t),m||M===$||(m=[])):(m=m||[]).push(le,$))}i&&(m=m||[]).push("style",i);var le=m;(r.updateQueue=le)&&(r.flags|=4)}},cp=function(t,r,i,c){i!==c&&(r.flags|=4)};function xs(t,r){if(!dt)switch(t.tailMode){case"hidden":r=t.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?t.tail=null:i.sibling=null;break;case"collapsed":i=t.tail;for(var c=null;i!==null;)i.alternate!==null&&(c=i),i=i.sibling;c===null?r||t.tail===null?t.tail=null:t.tail.sibling=null:c.sibling=null}}function Dt(t){var r=t.alternate!==null&&t.alternate.child===t.child,i=0,c=0;if(r)for(var p=t.child;p!==null;)i|=p.lanes|p.childLanes,c|=p.subtreeFlags&14680064,c|=p.flags&14680064,p.return=t,p=p.sibling;else for(p=t.child;p!==null;)i|=p.lanes|p.childLanes,c|=p.subtreeFlags,c|=p.flags,p.return=t,p=p.sibling;return t.subtreeFlags|=c,t.childLanes=i,r}function _g(t,r,i){var c=r.pendingProps;switch(gl(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Dt(r),null;case 1:return Kt(r.type)&&ui(),Dt(r),null;case 3:return c=r.stateNode,_a(),lt(Yt),lt(Ot),zl(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(t===null||t.child===null)&&(gi(r)?r.flags|=4:t===null||t.memoizedState.isDehydrated&&(r.flags&256)===0||(r.flags|=1024,Cr!==null&&(sc(Cr),Cr=null))),Yl(t,r),Dt(r),null;case 5:Cl(r);var p=qn(ps.current);if(i=r.type,t!==null&&r.stateNode!=null)lp(t,r,i,c,p),t.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!c){if(r.stateNode===null)throw Error(n(166));return Dt(r),null}if(t=qn(Ur.current),gi(r)){c=r.stateNode,i=r.type;var m=r.memoizedProps;switch(c[Wr]=r,c[os]=m,t=(r.mode&1)!==0,i){case"dialog":ot("cancel",c),ot("close",c);break;case"iframe":case"object":case"embed":ot("load",c);break;case"video":case"audio":for(p=0;p<as.length;p++)ot(as[p],c);break;case"source":ot("error",c);break;case"img":case"image":case"link":ot("error",c),ot("load",c);break;case"details":ot("toggle",c);break;case"input":he(c,m),ot("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!m.multiple},ot("invalid",c);break;case"textarea":we(c,m),ot("invalid",c)}kt(i,m),p=null;for(var C in m)if(m.hasOwnProperty(C)){var M=m[C];C==="children"?typeof M=="string"?c.textContent!==M&&(m.suppressHydrationWarning!==!0&&li(c.textContent,M,t),p=["children",M]):typeof M=="number"&&c.textContent!==""+M&&(m.suppressHydrationWarning!==!0&&li(c.textContent,M,t),p=["children",""+M]):l.hasOwnProperty(C)&&M!=null&&C==="onScroll"&&ot("scroll",c)}switch(i){case"input":Qe(c),O(c,m,!0);break;case"textarea":Qe(c),Y(c);break;case"select":case"option":break;default:typeof m.onClick=="function"&&(c.onclick=ci)}c=p,r.updateQueue=c,c!==null&&(r.flags|=4)}else{C=p.nodeType===9?p:p.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=ke(i)),t==="http://www.w3.org/1999/xhtml"?i==="script"?(t=C.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof c.is=="string"?t=C.createElement(i,{is:c.is}):(t=C.createElement(i),i==="select"&&(C=t,c.multiple?C.multiple=!0:c.size&&(C.size=c.size))):t=C.createElementNS(t,i),t[Wr]=r,t[os]=c,op(t,r,!1,!1),r.stateNode=t;e:{switch(C=Fr(i,c),i){case"dialog":ot("cancel",t),ot("close",t),p=c;break;case"iframe":case"object":case"embed":ot("load",t),p=c;break;case"video":case"audio":for(p=0;p<as.length;p++)ot(as[p],t);p=c;break;case"source":ot("error",t),p=c;break;case"img":case"image":case"link":ot("error",t),ot("load",t),p=c;break;case"details":ot("toggle",t),p=c;break;case"input":he(t,c),p=y(t,c),ot("invalid",t);break;case"option":p=c;break;case"select":t._wrapperState={wasMultiple:!!c.multiple},p=ce({},c,{value:void 0}),ot("invalid",t);break;case"textarea":we(t,c),p=ae(t,c),ot("invalid",t);break;default:p=c}kt(i,p),M=p;for(m in M)if(M.hasOwnProperty(m)){var $=M[m];m==="style"?Nr(t,$):m==="dangerouslySetInnerHTML"?($=$?$.__html:void 0,$!=null&&mt(t,$)):m==="children"?typeof $=="string"?(i!=="textarea"||$!=="")&&nr(t,$):typeof $=="number"&&nr(t,""+$):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(l.hasOwnProperty(m)?$!=null&&m==="onScroll"&&ot("scroll",t):$!=null&&T(t,m,$,C))}switch(i){case"input":Qe(t),O(t,c,!1);break;case"textarea":Qe(t),Y(t);break;case"option":c.value!=null&&t.setAttribute("value",""+_e(c.value));break;case"select":t.multiple=!!c.multiple,m=c.value,m!=null?pe(t,!!c.multiple,m,!1):c.defaultValue!=null&&pe(t,!!c.multiple,c.defaultValue,!0);break;default:typeof p.onClick=="function"&&(t.onclick=ci)}switch(i){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return Dt(r),null;case 6:if(t&&r.stateNode!=null)cp(t,r,t.memoizedProps,c);else{if(typeof c!="string"&&r.stateNode===null)throw Error(n(166));if(i=qn(ps.current),qn(Ur.current),gi(r)){if(c=r.stateNode,i=r.memoizedProps,c[Wr]=r,(m=c.nodeValue!==i)&&(t=ir,t!==null))switch(t.tag){case 3:li(c.nodeValue,i,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&li(c.nodeValue,i,(t.mode&1)!==0)}m&&(r.flags|=4)}else c=(i.nodeType===9?i:i.ownerDocument).createTextNode(c),c[Wr]=r,r.stateNode=c}return Dt(r),null;case 13:if(lt(ut),c=r.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(dt&&or!==null&&(r.mode&1)!==0&&(r.flags&128)===0)pu(),wa(),r.flags|=98560,m=!1;else if(m=gi(r),c!==null&&c.dehydrated!==null){if(t===null){if(!m)throw Error(n(318));if(m=r.memoizedState,m=m!==null?m.dehydrated:null,!m)throw Error(n(317));m[Wr]=r}else wa(),(r.flags&128)===0&&(r.memoizedState=null),r.flags|=4;Dt(r),m=!1}else Cr!==null&&(sc(Cr),Cr=null),m=!0;if(!m)return r.flags&65536?r:null}return(r.flags&128)!==0?(r.lanes=i,r):(c=c!==null,c!==(t!==null&&t.memoizedState!==null)&&c&&(r.child.flags|=8192,(r.mode&1)!==0&&(t===null||(ut.current&1)!==0?Ct===0&&(Ct=3):lc())),r.updateQueue!==null&&(r.flags|=4),Dt(r),null);case 4:return _a(),Yl(t,r),t===null&&ss(r.stateNode.containerInfo),Dt(r),null;case 10:return wl(r.type._context),Dt(r),null;case 17:return Kt(r.type)&&ui(),Dt(r),null;case 19:if(lt(ut),m=r.memoizedState,m===null)return Dt(r),null;if(c=(r.flags&128)!==0,C=m.rendering,C===null)if(c)xs(m,!1);else{if(Ct!==0||t!==null&&(t.flags&128)!==0)for(t=r.child;t!==null;){if(C=wi(t),C!==null){for(r.flags|=128,xs(m,!1),c=C.updateQueue,c!==null&&(r.updateQueue=c,r.flags|=4),r.subtreeFlags=0,c=i,i=r.child;i!==null;)m=i,t=c,m.flags&=14680066,C=m.alternate,C===null?(m.childLanes=0,m.lanes=t,m.child=null,m.subtreeFlags=0,m.memoizedProps=null,m.memoizedState=null,m.updateQueue=null,m.dependencies=null,m.stateNode=null):(m.childLanes=C.childLanes,m.lanes=C.lanes,m.child=C.child,m.subtreeFlags=0,m.deletions=null,m.memoizedProps=C.memoizedProps,m.memoizedState=C.memoizedState,m.updateQueue=C.updateQueue,m.type=C.type,t=C.dependencies,m.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),i=i.sibling;return st(ut,ut.current&1|2),r.child}t=t.sibling}m.tail!==null&&bt()>Pa&&(r.flags|=128,c=!0,xs(m,!1),r.lanes=4194304)}else{if(!c)if(t=wi(C),t!==null){if(r.flags|=128,c=!0,i=t.updateQueue,i!==null&&(r.updateQueue=i,r.flags|=4),xs(m,!0),m.tail===null&&m.tailMode==="hidden"&&!C.alternate&&!dt)return Dt(r),null}else 2*bt()-m.renderingStartTime>Pa&&i!==1073741824&&(r.flags|=128,c=!0,xs(m,!1),r.lanes=4194304);m.isBackwards?(C.sibling=r.child,r.child=C):(i=m.last,i!==null?i.sibling=C:r.child=C,m.last=C)}return m.tail!==null?(r=m.tail,m.rendering=r,m.tail=r.sibling,m.renderingStartTime=bt(),r.sibling=null,i=ut.current,st(ut,c?i&1|2:i&1),r):(Dt(r),null);case 22:case 23:return oc(),c=r.memoizedState!==null,t!==null&&t.memoizedState!==null!==c&&(r.flags|=8192),c&&(r.mode&1)!==0?(lr&1073741824)!==0&&(Dt(r),r.subtreeFlags&6&&(r.flags|=8192)):Dt(r),null;case 24:return null;case 25:return null}throw Error(n(156,r.tag))}function Cg(t,r){switch(gl(r),r.tag){case 1:return Kt(r.type)&&ui(),t=r.flags,t&65536?(r.flags=t&-65537|128,r):null;case 3:return _a(),lt(Yt),lt(Ot),zl(),t=r.flags,(t&65536)!==0&&(t&128)===0?(r.flags=t&-65537|128,r):null;case 5:return Cl(r),null;case 13:if(lt(ut),t=r.memoizedState,t!==null&&t.dehydrated!==null){if(r.alternate===null)throw Error(n(340));wa()}return t=r.flags,t&65536?(r.flags=t&-65537|128,r):null;case 19:return lt(ut),null;case 4:return _a(),null;case 10:return wl(r.type._context),null;case 22:case 23:return oc(),null;case 24:return null;default:return null}}var Ri=!1,Mt=!1,Eg=typeof WeakSet=="function"?WeakSet:Set,Pe=null;function Ea(t,r){var i=t.ref;if(i!==null)if(typeof i=="function")try{i(null)}catch(c){gt(t,r,c)}else i.current=null}function Kl(t,r,i){try{i()}catch(c){gt(t,r,c)}}var dp=!1;function zg(t,r){if(ol=Zs,t=Ud(),Jo(t)){if("selectionStart"in t)var i={start:t.selectionStart,end:t.selectionEnd};else e:{i=(i=t.ownerDocument)&&i.defaultView||window;var c=i.getSelection&&i.getSelection();if(c&&c.rangeCount!==0){i=c.anchorNode;var p=c.anchorOffset,m=c.focusNode;c=c.focusOffset;try{i.nodeType,m.nodeType}catch{i=null;break e}var C=0,M=-1,$=-1,le=0,ye=0,je=t,be=null;t:for(;;){for(var Ee;je!==i||p!==0&&je.nodeType!==3||(M=C+p),je!==m||c!==0&&je.nodeType!==3||($=C+c),je.nodeType===3&&(C+=je.nodeValue.length),(Ee=je.firstChild)!==null;)be=je,je=Ee;for(;;){if(je===t)break t;if(be===i&&++le===p&&(M=C),be===m&&++ye===c&&($=C),(Ee=je.nextSibling)!==null)break;je=be,be=je.parentNode}je=Ee}i=M===-1||$===-1?null:{start:M,end:$}}else i=null}i=i||{start:0,end:0}}else i=null;for(ll={focusedElem:t,selectionRange:i},Zs=!1,Pe=r;Pe!==null;)if(r=Pe,t=r.child,(r.subtreeFlags&1028)!==0&&t!==null)t.return=r,Pe=t;else for(;Pe!==null;){r=Pe;try{var Re=r.alternate;if((r.flags&1024)!==0)switch(r.tag){case 0:case 11:case 15:break;case 1:if(Re!==null){var Le=Re.memoizedProps,yt=Re.memoizedState,ne=r.stateNode,K=ne.getSnapshotBeforeUpdate(r.elementType===r.type?Le:Er(r.type,Le),yt);ne.__reactInternalSnapshotBeforeUpdate=K}break;case 3:var ie=r.stateNode.containerInfo;ie.nodeType===1?ie.textContent="":ie.nodeType===9&&ie.documentElement&&ie.removeChild(ie.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(Se){gt(r,r.return,Se)}if(t=r.sibling,t!==null){t.return=r.return,Pe=t;break}Pe=r.return}return Re=dp,dp=!1,Re}function vs(t,r,i){var c=r.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var p=c=c.next;do{if((p.tag&t)===t){var m=p.destroy;p.destroy=void 0,m!==void 0&&Kl(r,i,m)}p=p.next}while(p!==c)}}function Ti(t,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var c=i.create;i.destroy=c()}i=i.next}while(i!==r)}}function Xl(t){var r=t.ref;if(r!==null){var i=t.stateNode;switch(t.tag){case 5:t=i;break;default:t=i}typeof r=="function"?r(t):r.current=t}}function up(t){var r=t.alternate;r!==null&&(t.alternate=null,up(r)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(r=t.stateNode,r!==null&&(delete r[Wr],delete r[os],delete r[pl],delete r[ug],delete r[pg])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function pp(t){return t.tag===5||t.tag===3||t.tag===4}function fp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||pp(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Zl(t,r,i){var c=t.tag;if(c===5||c===6)t=t.stateNode,r?i.nodeType===8?i.parentNode.insertBefore(t,r):i.insertBefore(t,r):(i.nodeType===8?(r=i.parentNode,r.insertBefore(t,i)):(r=i,r.appendChild(t)),i=i._reactRootContainer,i!=null||r.onclick!==null||(r.onclick=ci));else if(c!==4&&(t=t.child,t!==null))for(Zl(t,r,i),t=t.sibling;t!==null;)Zl(t,r,i),t=t.sibling}function Ql(t,r,i){var c=t.tag;if(c===5||c===6)t=t.stateNode,r?i.insertBefore(t,r):i.appendChild(t);else if(c!==4&&(t=t.child,t!==null))for(Ql(t,r,i),t=t.sibling;t!==null;)Ql(t,r,i),t=t.sibling}var Lt=null,zr=!1;function Cn(t,r,i){for(i=i.child;i!==null;)hp(t,r,i),i=i.sibling}function hp(t,r,i){if(Br&&typeof Br.onCommitFiberUnmount=="function")try{Br.onCommitFiberUnmount(Hs,i)}catch{}switch(i.tag){case 5:Mt||Ea(i,r);case 6:var c=Lt,p=zr;Lt=null,Cn(t,r,i),Lt=c,zr=p,Lt!==null&&(zr?(t=Lt,i=i.stateNode,t.nodeType===8?t.parentNode.removeChild(i):t.removeChild(i)):Lt.removeChild(i.stateNode));break;case 18:Lt!==null&&(zr?(t=Lt,i=i.stateNode,t.nodeType===8?ul(t.parentNode,i):t.nodeType===1&&ul(t,i),Xa(t)):ul(Lt,i.stateNode));break;case 4:c=Lt,p=zr,Lt=i.stateNode.containerInfo,zr=!0,Cn(t,r,i),Lt=c,zr=p;break;case 0:case 11:case 14:case 15:if(!Mt&&(c=i.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){p=c=c.next;do{var m=p,C=m.destroy;m=m.tag,C!==void 0&&((m&2)!==0||(m&4)!==0)&&Kl(i,r,C),p=p.next}while(p!==c)}Cn(t,r,i);break;case 1:if(!Mt&&(Ea(i,r),c=i.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=i.memoizedProps,c.state=i.memoizedState,c.componentWillUnmount()}catch(M){gt(i,r,M)}Cn(t,r,i);break;case 21:Cn(t,r,i);break;case 22:i.mode&1?(Mt=(c=Mt)||i.memoizedState!==null,Cn(t,r,i),Mt=c):Cn(t,r,i);break;default:Cn(t,r,i)}}function mp(t){var r=t.updateQueue;if(r!==null){t.updateQueue=null;var i=t.stateNode;i===null&&(i=t.stateNode=new Eg),r.forEach(function(c){var p=Dg.bind(null,t,c);i.has(c)||(i.add(c),c.then(p,p))})}}function Pr(t,r){var i=r.deletions;if(i!==null)for(var c=0;c<i.length;c++){var p=i[c];try{var m=t,C=r,M=C;e:for(;M!==null;){switch(M.tag){case 5:Lt=M.stateNode,zr=!1;break e;case 3:Lt=M.stateNode.containerInfo,zr=!0;break e;case 4:Lt=M.stateNode.containerInfo,zr=!0;break e}M=M.return}if(Lt===null)throw Error(n(160));hp(m,C,p),Lt=null,zr=!1;var $=p.alternate;$!==null&&($.return=null),p.return=null}catch(le){gt(p,r,le)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)gp(r,t),r=r.sibling}function gp(t,r){var i=t.alternate,c=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Pr(r,t),Vr(t),c&4){try{vs(3,t,t.return),Ti(3,t)}catch(Le){gt(t,t.return,Le)}try{vs(5,t,t.return)}catch(Le){gt(t,t.return,Le)}}break;case 1:Pr(r,t),Vr(t),c&512&&i!==null&&Ea(i,i.return);break;case 5:if(Pr(r,t),Vr(t),c&512&&i!==null&&Ea(i,i.return),t.flags&32){var p=t.stateNode;try{nr(p,"")}catch(Le){gt(t,t.return,Le)}}if(c&4&&(p=t.stateNode,p!=null)){var m=t.memoizedProps,C=i!==null?i.memoizedProps:m,M=t.type,$=t.updateQueue;if(t.updateQueue=null,$!==null)try{M==="input"&&m.type==="radio"&&m.name!=null&&re(p,m),Fr(M,C);var le=Fr(M,m);for(C=0;C<$.length;C+=2){var ye=$[C],je=$[C+1];ye==="style"?Nr(p,je):ye==="dangerouslySetInnerHTML"?mt(p,je):ye==="children"?nr(p,je):T(p,ye,je,le)}switch(M){case"input":I(p,m);break;case"textarea":Ce(p,m);break;case"select":var be=p._wrapperState.wasMultiple;p._wrapperState.wasMultiple=!!m.multiple;var Ee=m.value;Ee!=null?pe(p,!!m.multiple,Ee,!1):be!==!!m.multiple&&(m.defaultValue!=null?pe(p,!!m.multiple,m.defaultValue,!0):pe(p,!!m.multiple,m.multiple?[]:"",!1))}p[os]=m}catch(Le){gt(t,t.return,Le)}}break;case 6:if(Pr(r,t),Vr(t),c&4){if(t.stateNode===null)throw Error(n(162));p=t.stateNode,m=t.memoizedProps;try{p.nodeValue=m}catch(Le){gt(t,t.return,Le)}}break;case 3:if(Pr(r,t),Vr(t),c&4&&i!==null&&i.memoizedState.isDehydrated)try{Xa(r.containerInfo)}catch(Le){gt(t,t.return,Le)}break;case 4:Pr(r,t),Vr(t);break;case 13:Pr(r,t),Vr(t),p=t.child,p.flags&8192&&(m=p.memoizedState!==null,p.stateNode.isHidden=m,!m||p.alternate!==null&&p.alternate.memoizedState!==null||(tc=bt())),c&4&&mp(t);break;case 22:if(ye=i!==null&&i.memoizedState!==null,t.mode&1?(Mt=(le=Mt)||ye,Pr(r,t),Mt=le):Pr(r,t),Vr(t),c&8192){if(le=t.memoizedState!==null,(t.stateNode.isHidden=le)&&!ye&&(t.mode&1)!==0)for(Pe=t,ye=t.child;ye!==null;){for(je=Pe=ye;Pe!==null;){switch(be=Pe,Ee=be.child,be.tag){case 0:case 11:case 14:case 15:vs(4,be,be.return);break;case 1:Ea(be,be.return);var Re=be.stateNode;if(typeof Re.componentWillUnmount=="function"){c=be,i=be.return;try{r=c,Re.props=r.memoizedProps,Re.state=r.memoizedState,Re.componentWillUnmount()}catch(Le){gt(c,i,Le)}}break;case 5:Ea(be,be.return);break;case 22:if(be.memoizedState!==null){bp(je);continue}}Ee!==null?(Ee.return=be,Pe=Ee):bp(je)}ye=ye.sibling}e:for(ye=null,je=t;;){if(je.tag===5){if(ye===null){ye=je;try{p=je.stateNode,le?(m=p.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none"):(M=je.stateNode,$=je.memoizedProps.style,C=$!=null&&$.hasOwnProperty("display")?$.display:null,M.style.display=at("display",C))}catch(Le){gt(t,t.return,Le)}}}else if(je.tag===6){if(ye===null)try{je.stateNode.nodeValue=le?"":je.memoizedProps}catch(Le){gt(t,t.return,Le)}}else if((je.tag!==22&&je.tag!==23||je.memoizedState===null||je===t)&&je.child!==null){je.child.return=je,je=je.child;continue}if(je===t)break e;for(;je.sibling===null;){if(je.return===null||je.return===t)break e;ye===je&&(ye=null),je=je.return}ye===je&&(ye=null),je.sibling.return=je.return,je=je.sibling}}break;case 19:Pr(r,t),Vr(t),c&4&&mp(t);break;case 21:break;default:Pr(r,t),Vr(t)}}function Vr(t){var r=t.flags;if(r&2){try{e:{for(var i=t.return;i!==null;){if(pp(i)){var c=i;break e}i=i.return}throw Error(n(160))}switch(c.tag){case 5:var p=c.stateNode;c.flags&32&&(nr(p,""),c.flags&=-33);var m=fp(t);Ql(t,m,p);break;case 3:case 4:var C=c.stateNode.containerInfo,M=fp(t);Zl(t,M,C);break;default:throw Error(n(161))}}catch($){gt(t,t.return,$)}t.flags&=-3}r&4096&&(t.flags&=-4097)}function Pg(t,r,i){Pe=t,xp(t)}function xp(t,r,i){for(var c=(t.mode&1)!==0;Pe!==null;){var p=Pe,m=p.child;if(p.tag===22&&c){var C=p.memoizedState!==null||Ri;if(!C){var M=p.alternate,$=M!==null&&M.memoizedState!==null||Mt;M=Ri;var le=Mt;if(Ri=C,(Mt=$)&&!le)for(Pe=p;Pe!==null;)C=Pe,$=C.child,C.tag===22&&C.memoizedState!==null?yp(p):$!==null?($.return=C,Pe=$):yp(p);for(;m!==null;)Pe=m,xp(m),m=m.sibling;Pe=p,Ri=M,Mt=le}vp(t)}else(p.subtreeFlags&8772)!==0&&m!==null?(m.return=p,Pe=m):vp(t)}}function vp(t){for(;Pe!==null;){var r=Pe;if((r.flags&8772)!==0){var i=r.alternate;try{if((r.flags&8772)!==0)switch(r.tag){case 0:case 11:case 15:Mt||Ti(5,r);break;case 1:var c=r.stateNode;if(r.flags&4&&!Mt)if(i===null)c.componentDidMount();else{var p=r.elementType===r.type?i.memoizedProps:Er(r.type,i.memoizedProps);c.componentDidUpdate(p,i.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var m=r.updateQueue;m!==null&&bu(r,m,c);break;case 3:var C=r.updateQueue;if(C!==null){if(i=null,r.child!==null)switch(r.child.tag){case 5:i=r.child.stateNode;break;case 1:i=r.child.stateNode}bu(r,C,i)}break;case 5:var M=r.stateNode;if(i===null&&r.flags&4){i=M;var $=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":$.autoFocus&&i.focus();break;case"img":$.src&&(i.src=$.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var le=r.alternate;if(le!==null){var ye=le.memoizedState;if(ye!==null){var je=ye.dehydrated;je!==null&&Xa(je)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}Mt||r.flags&512&&Xl(r)}catch(be){gt(r,r.return,be)}}if(r===t){Pe=null;break}if(i=r.sibling,i!==null){i.return=r.return,Pe=i;break}Pe=r.return}}function bp(t){for(;Pe!==null;){var r=Pe;if(r===t){Pe=null;break}var i=r.sibling;if(i!==null){i.return=r.return,Pe=i;break}Pe=r.return}}function yp(t){for(;Pe!==null;){var r=Pe;try{switch(r.tag){case 0:case 11:case 15:var i=r.return;try{Ti(4,r)}catch($){gt(r,i,$)}break;case 1:var c=r.stateNode;if(typeof c.componentDidMount=="function"){var p=r.return;try{c.componentDidMount()}catch($){gt(r,p,$)}}var m=r.return;try{Xl(r)}catch($){gt(r,m,$)}break;case 5:var C=r.return;try{Xl(r)}catch($){gt(r,C,$)}}}catch($){gt(r,r.return,$)}if(r===t){Pe=null;break}var M=r.sibling;if(M!==null){M.return=r.return,Pe=M;break}Pe=r.return}}var Rg=Math.ceil,Ai=E.ReactCurrentDispatcher,Jl=E.ReactCurrentOwner,yr=E.ReactCurrentBatchConfig,Je=0,Pt=null,Nt=null,It=0,lr=0,za=wn(0),Ct=0,bs=null,Yn=0,Li=0,ec=0,ys=null,Zt=null,tc=0,Pa=1/0,sn=null,Ii=!1,rc=null,En=null,Oi=!1,zn=null,Fi=0,js=0,nc=null,Di=-1,Mi=0;function Ht(){return(Je&6)!==0?bt():Di!==-1?Di:Di=bt()}function Pn(t){return(t.mode&1)===0?1:(Je&2)!==0&&It!==0?It&-It:hg.transition!==null?(Mi===0&&(Mi=fd()),Mi):(t=rt,t!==0||(t=window.event,t=t===void 0?16:wd(t.type)),t)}function Rr(t,r,i,c){if(50<js)throw js=0,nc=null,Error(n(185));Ha(t,i,c),((Je&2)===0||t!==Pt)&&(t===Pt&&((Je&2)===0&&(Li|=i),Ct===4&&Rn(t,It)),Qt(t,c),i===1&&Je===0&&(r.mode&1)===0&&(Pa=bt()+500,fi&&Nn()))}function Qt(t,r){var i=t.callbackNode;hm(t,r);var c=Ys(t,t===Pt?It:0);if(c===0)i!==null&&dd(i),t.callbackNode=null,t.callbackPriority=0;else if(r=c&-c,t.callbackPriority!==r){if(i!=null&&dd(i),r===1)t.tag===0?fg(wp.bind(null,t)):ou(wp.bind(null,t)),cg(function(){(Je&6)===0&&Nn()}),i=null;else{switch(hd(c)){case 1:i=Oo;break;case 4:i=ud;break;case 16:i=Vs;break;case 536870912:i=pd;break;default:i=Vs}i=Pp(i,jp.bind(null,t))}t.callbackPriority=r,t.callbackNode=i}}function jp(t,r){if(Di=-1,Mi=0,(Je&6)!==0)throw Error(n(327));var i=t.callbackNode;if(Ra()&&t.callbackNode!==i)return null;var c=Ys(t,t===Pt?It:0);if(c===0)return null;if((c&30)!==0||(c&t.expiredLanes)!==0||r)r=Bi(t,c);else{r=c;var p=Je;Je|=2;var m=Np();(Pt!==t||It!==r)&&(sn=null,Pa=bt()+500,Xn(t,r));do try{Lg();break}catch(M){kp(t,M)}while(!0);jl(),Ai.current=m,Je=p,Nt!==null?r=0:(Pt=null,It=0,r=Ct)}if(r!==0){if(r===2&&(p=Fo(t),p!==0&&(c=p,r=ac(t,p))),r===1)throw i=bs,Xn(t,0),Rn(t,c),Qt(t,bt()),i;if(r===6)Rn(t,c);else{if(p=t.current.alternate,(c&30)===0&&!Tg(p)&&(r=Bi(t,c),r===2&&(m=Fo(t),m!==0&&(c=m,r=ac(t,m))),r===1))throw i=bs,Xn(t,0),Rn(t,c),Qt(t,bt()),i;switch(t.finishedWork=p,t.finishedLanes=c,r){case 0:case 1:throw Error(n(345));case 2:Zn(t,Zt,sn);break;case 3:if(Rn(t,c),(c&130023424)===c&&(r=tc+500-bt(),10<r)){if(Ys(t,0)!==0)break;if(p=t.suspendedLanes,(p&c)!==c){Ht(),t.pingedLanes|=t.suspendedLanes&p;break}t.timeoutHandle=dl(Zn.bind(null,t,Zt,sn),r);break}Zn(t,Zt,sn);break;case 4:if(Rn(t,c),(c&4194240)===c)break;for(r=t.eventTimes,p=-1;0<c;){var C=31-Sr(c);m=1<<C,C=r[C],C>p&&(p=C),c&=~m}if(c=p,c=bt()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*Rg(c/1960))-c,10<c){t.timeoutHandle=dl(Zn.bind(null,t,Zt,sn),c);break}Zn(t,Zt,sn);break;case 5:Zn(t,Zt,sn);break;default:throw Error(n(329))}}}return Qt(t,bt()),t.callbackNode===i?jp.bind(null,t):null}function ac(t,r){var i=ys;return t.current.memoizedState.isDehydrated&&(Xn(t,r).flags|=256),t=Bi(t,r),t!==2&&(r=Zt,Zt=i,r!==null&&sc(r)),t}function sc(t){Zt===null?Zt=t:Zt.push.apply(Zt,t)}function Tg(t){for(var r=t;;){if(r.flags&16384){var i=r.updateQueue;if(i!==null&&(i=i.stores,i!==null))for(var c=0;c<i.length;c++){var p=i[c],m=p.getSnapshot;p=p.value;try{if(!_r(m(),p))return!1}catch{return!1}}}if(i=r.child,r.subtreeFlags&16384&&i!==null)i.return=r,r=i;else{if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function Rn(t,r){for(r&=~ec,r&=~Li,t.suspendedLanes|=r,t.pingedLanes&=~r,t=t.expirationTimes;0<r;){var i=31-Sr(r),c=1<<i;t[i]=-1,r&=~c}}function wp(t){if((Je&6)!==0)throw Error(n(327));Ra();var r=Ys(t,0);if((r&1)===0)return Qt(t,bt()),null;var i=Bi(t,r);if(t.tag!==0&&i===2){var c=Fo(t);c!==0&&(r=c,i=ac(t,c))}if(i===1)throw i=bs,Xn(t,0),Rn(t,r),Qt(t,bt()),i;if(i===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=r,Zn(t,Zt,sn),Qt(t,bt()),null}function ic(t,r){var i=Je;Je|=1;try{return t(r)}finally{Je=i,Je===0&&(Pa=bt()+500,fi&&Nn())}}function Kn(t){zn!==null&&zn.tag===0&&(Je&6)===0&&Ra();var r=Je;Je|=1;var i=yr.transition,c=rt;try{if(yr.transition=null,rt=1,t)return t()}finally{rt=c,yr.transition=i,Je=r,(Je&6)===0&&Nn()}}function oc(){lr=za.current,lt(za)}function Xn(t,r){t.finishedWork=null,t.finishedLanes=0;var i=t.timeoutHandle;if(i!==-1&&(t.timeoutHandle=-1,lg(i)),Nt!==null)for(i=Nt.return;i!==null;){var c=i;switch(gl(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&ui();break;case 3:_a(),lt(Yt),lt(Ot),zl();break;case 5:Cl(c);break;case 4:_a();break;case 13:lt(ut);break;case 19:lt(ut);break;case 10:wl(c.type._context);break;case 22:case 23:oc()}i=i.return}if(Pt=t,Nt=t=Tn(t.current,null),It=lr=r,Ct=0,bs=null,ec=Li=Yn=0,Zt=ys=null,Hn!==null){for(r=0;r<Hn.length;r++)if(i=Hn[r],c=i.interleaved,c!==null){i.interleaved=null;var p=c.next,m=i.pending;if(m!==null){var C=m.next;m.next=p,c.next=C}i.pending=c}Hn=null}return t}function kp(t,r){do{var i=Nt;try{if(jl(),ki.current=Ci,Ni){for(var c=pt.memoizedState;c!==null;){var p=c.queue;p!==null&&(p.pending=null),c=c.next}Ni=!1}if(Gn=0,zt=_t=pt=null,fs=!1,hs=0,Jl.current=null,i===null||i.return===null){Ct=1,bs=r,Nt=null;break}e:{var m=t,C=i.return,M=i,$=r;if(r=It,M.flags|=32768,$!==null&&typeof $=="object"&&typeof $.then=="function"){var le=$,ye=M,je=ye.tag;if((ye.mode&1)===0&&(je===0||je===11||je===15)){var be=ye.alternate;be?(ye.updateQueue=be.updateQueue,ye.memoizedState=be.memoizedState,ye.lanes=be.lanes):(ye.updateQueue=null,ye.memoizedState=null)}var Ee=Yu(C);if(Ee!==null){Ee.flags&=-257,Ku(Ee,C,M,m,r),Ee.mode&1&&Gu(m,le,r),r=Ee,$=le;var Re=r.updateQueue;if(Re===null){var Le=new Set;Le.add($),r.updateQueue=Le}else Re.add($);break e}else{if((r&1)===0){Gu(m,le,r),lc();break e}$=Error(n(426))}}else if(dt&&M.mode&1){var yt=Yu(C);if(yt!==null){(yt.flags&65536)===0&&(yt.flags|=256),Ku(yt,C,M,m,r),bl(Ca($,M));break e}}m=$=Ca($,M),Ct!==4&&(Ct=2),ys===null?ys=[m]:ys.push(m),m=C;do{switch(m.tag){case 3:m.flags|=65536,r&=-r,m.lanes|=r;var ne=Hu(m,$,r);vu(m,ne);break e;case 1:M=$;var K=m.type,ie=m.stateNode;if((m.flags&128)===0&&(typeof K.getDerivedStateFromError=="function"||ie!==null&&typeof ie.componentDidCatch=="function"&&(En===null||!En.has(ie)))){m.flags|=65536,r&=-r,m.lanes|=r;var Se=qu(m,M,r);vu(m,Se);break e}}m=m.return}while(m!==null)}_p(i)}catch(Ie){r=Ie,Nt===i&&i!==null&&(Nt=i=i.return);continue}break}while(!0)}function Np(){var t=Ai.current;return Ai.current=Ci,t===null?Ci:t}function lc(){(Ct===0||Ct===3||Ct===2)&&(Ct=4),Pt===null||(Yn&268435455)===0&&(Li&268435455)===0||Rn(Pt,It)}function Bi(t,r){var i=Je;Je|=2;var c=Np();(Pt!==t||It!==r)&&(sn=null,Xn(t,r));do try{Ag();break}catch(p){kp(t,p)}while(!0);if(jl(),Je=i,Ai.current=c,Nt!==null)throw Error(n(261));return Pt=null,It=0,Ct}function Ag(){for(;Nt!==null;)Sp(Nt)}function Lg(){for(;Nt!==null&&!sm();)Sp(Nt)}function Sp(t){var r=zp(t.alternate,t,lr);t.memoizedProps=t.pendingProps,r===null?_p(t):Nt=r,Jl.current=null}function _p(t){var r=t;do{var i=r.alternate;if(t=r.return,(r.flags&32768)===0){if(i=_g(i,r,lr),i!==null){Nt=i;return}}else{if(i=Cg(i,r),i!==null){i.flags&=32767,Nt=i;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ct=6,Nt=null;return}}if(r=r.sibling,r!==null){Nt=r;return}Nt=r=t}while(r!==null);Ct===0&&(Ct=5)}function Zn(t,r,i){var c=rt,p=yr.transition;try{yr.transition=null,rt=1,Ig(t,r,i,c)}finally{yr.transition=p,rt=c}return null}function Ig(t,r,i,c){do Ra();while(zn!==null);if((Je&6)!==0)throw Error(n(327));i=t.finishedWork;var p=t.finishedLanes;if(i===null)return null;if(t.finishedWork=null,t.finishedLanes=0,i===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var m=i.lanes|i.childLanes;if(mm(t,m),t===Pt&&(Nt=Pt=null,It=0),(i.subtreeFlags&2064)===0&&(i.flags&2064)===0||Oi||(Oi=!0,Pp(Vs,function(){return Ra(),null})),m=(i.flags&15990)!==0,(i.subtreeFlags&15990)!==0||m){m=yr.transition,yr.transition=null;var C=rt;rt=1;var M=Je;Je|=4,Jl.current=null,zg(t,i),gp(i,t),tg(ll),Zs=!!ol,ll=ol=null,t.current=i,Pg(i),im(),Je=M,rt=C,yr.transition=m}else t.current=i;if(Oi&&(Oi=!1,zn=t,Fi=p),m=t.pendingLanes,m===0&&(En=null),cm(i.stateNode),Qt(t,bt()),r!==null)for(c=t.onRecoverableError,i=0;i<r.length;i++)p=r[i],c(p.value,{componentStack:p.stack,digest:p.digest});if(Ii)throw Ii=!1,t=rc,rc=null,t;return(Fi&1)!==0&&t.tag!==0&&Ra(),m=t.pendingLanes,(m&1)!==0?t===nc?js++:(js=0,nc=t):js=0,Nn(),null}function Ra(){if(zn!==null){var t=hd(Fi),r=yr.transition,i=rt;try{if(yr.transition=null,rt=16>t?16:t,zn===null)var c=!1;else{if(t=zn,zn=null,Fi=0,(Je&6)!==0)throw Error(n(331));var p=Je;for(Je|=4,Pe=t.current;Pe!==null;){var m=Pe,C=m.child;if((Pe.flags&16)!==0){var M=m.deletions;if(M!==null){for(var $=0;$<M.length;$++){var le=M[$];for(Pe=le;Pe!==null;){var ye=Pe;switch(ye.tag){case 0:case 11:case 15:vs(8,ye,m)}var je=ye.child;if(je!==null)je.return=ye,Pe=je;else for(;Pe!==null;){ye=Pe;var be=ye.sibling,Ee=ye.return;if(up(ye),ye===le){Pe=null;break}if(be!==null){be.return=Ee,Pe=be;break}Pe=Ee}}}var Re=m.alternate;if(Re!==null){var Le=Re.child;if(Le!==null){Re.child=null;do{var yt=Le.sibling;Le.sibling=null,Le=yt}while(Le!==null)}}Pe=m}}if((m.subtreeFlags&2064)!==0&&C!==null)C.return=m,Pe=C;else e:for(;Pe!==null;){if(m=Pe,(m.flags&2048)!==0)switch(m.tag){case 0:case 11:case 15:vs(9,m,m.return)}var ne=m.sibling;if(ne!==null){ne.return=m.return,Pe=ne;break e}Pe=m.return}}var K=t.current;for(Pe=K;Pe!==null;){C=Pe;var ie=C.child;if((C.subtreeFlags&2064)!==0&&ie!==null)ie.return=C,Pe=ie;else e:for(C=K;Pe!==null;){if(M=Pe,(M.flags&2048)!==0)try{switch(M.tag){case 0:case 11:case 15:Ti(9,M)}}catch(Ie){gt(M,M.return,Ie)}if(M===C){Pe=null;break e}var Se=M.sibling;if(Se!==null){Se.return=M.return,Pe=Se;break e}Pe=M.return}}if(Je=p,Nn(),Br&&typeof Br.onPostCommitFiberRoot=="function")try{Br.onPostCommitFiberRoot(Hs,t)}catch{}c=!0}return c}finally{rt=i,yr.transition=r}}return!1}function Cp(t,r,i){r=Ca(i,r),r=Hu(t,r,1),t=_n(t,r,1),r=Ht(),t!==null&&(Ha(t,1,r),Qt(t,r))}function gt(t,r,i){if(t.tag===3)Cp(t,t,i);else for(;r!==null;){if(r.tag===3){Cp(r,t,i);break}else if(r.tag===1){var c=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(En===null||!En.has(c))){t=Ca(i,t),t=qu(r,t,1),r=_n(r,t,1),t=Ht(),r!==null&&(Ha(r,1,t),Qt(r,t));break}}r=r.return}}function Og(t,r,i){var c=t.pingCache;c!==null&&c.delete(r),r=Ht(),t.pingedLanes|=t.suspendedLanes&i,Pt===t&&(It&i)===i&&(Ct===4||Ct===3&&(It&130023424)===It&&500>bt()-tc?Xn(t,0):ec|=i),Qt(t,r)}function Ep(t,r){r===0&&((t.mode&1)===0?r=1:(r=Gs,Gs<<=1,(Gs&130023424)===0&&(Gs=4194304)));var i=Ht();t=rn(t,r),t!==null&&(Ha(t,r,i),Qt(t,i))}function Fg(t){var r=t.memoizedState,i=0;r!==null&&(i=r.retryLane),Ep(t,i)}function Dg(t,r){var i=0;switch(t.tag){case 13:var c=t.stateNode,p=t.memoizedState;p!==null&&(i=p.retryLane);break;case 19:c=t.stateNode;break;default:throw Error(n(314))}c!==null&&c.delete(r),Ep(t,i)}var zp;zp=function(t,r,i){if(t!==null)if(t.memoizedProps!==r.pendingProps||Yt.current)Xt=!0;else{if((t.lanes&i)===0&&(r.flags&128)===0)return Xt=!1,Sg(t,r,i);Xt=(t.flags&131072)!==0}else Xt=!1,dt&&(r.flags&1048576)!==0&&lu(r,mi,r.index);switch(r.lanes=0,r.tag){case 2:var c=r.type;Pi(t,r),t=r.pendingProps;var p=ba(r,Ot.current);Sa(r,i),p=Tl(null,r,c,t,p,i);var m=Al();return r.flags|=1,typeof p=="object"&&p!==null&&typeof p.render=="function"&&p.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,Kt(c)?(m=!0,pi(r)):m=!1,r.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,Sl(r),p.updater=Ei,r.stateNode=p,p._reactInternals=r,Ml(r,c,t,i),r=$l(null,r,c,!0,m,i)):(r.tag=0,dt&&m&&ml(r),Vt(null,r,p,i),r=r.child),r;case 16:c=r.elementType;e:{switch(Pi(t,r),t=r.pendingProps,p=c._init,c=p(c._payload),r.type=c,p=r.tag=Bg(c),t=Er(c,t),p){case 0:r=Ul(null,r,c,t,i);break e;case 1:r=tp(null,r,c,t,i);break e;case 11:r=Xu(null,r,c,t,i);break e;case 14:r=Zu(null,r,c,Er(c.type,t),i);break e}throw Error(n(306,c,""))}return r;case 0:return c=r.type,p=r.pendingProps,p=r.elementType===c?p:Er(c,p),Ul(t,r,c,p,i);case 1:return c=r.type,p=r.pendingProps,p=r.elementType===c?p:Er(c,p),tp(t,r,c,p,i);case 3:e:{if(rp(r),t===null)throw Error(n(387));c=r.pendingProps,m=r.memoizedState,p=m.element,xu(t,r),ji(r,c,null,i);var C=r.memoizedState;if(c=C.element,m.isDehydrated)if(m={element:c,isDehydrated:!1,cache:C.cache,pendingSuspenseBoundaries:C.pendingSuspenseBoundaries,transitions:C.transitions},r.updateQueue.baseState=m,r.memoizedState=m,r.flags&256){p=Ca(Error(n(423)),r),r=np(t,r,c,i,p);break e}else if(c!==p){p=Ca(Error(n(424)),r),r=np(t,r,c,i,p);break e}else for(or=jn(r.stateNode.containerInfo.firstChild),ir=r,dt=!0,Cr=null,i=mu(r,null,c,i),r.child=i;i;)i.flags=i.flags&-3|4096,i=i.sibling;else{if(wa(),c===p){r=an(t,r,i);break e}Vt(t,r,c,i)}r=r.child}return r;case 5:return yu(r),t===null&&vl(r),c=r.type,p=r.pendingProps,m=t!==null?t.memoizedProps:null,C=p.children,cl(c,p)?C=null:m!==null&&cl(c,m)&&(r.flags|=32),ep(t,r),Vt(t,r,C,i),r.child;case 6:return t===null&&vl(r),null;case 13:return ap(t,r,i);case 4:return _l(r,r.stateNode.containerInfo),c=r.pendingProps,t===null?r.child=ka(r,null,c,i):Vt(t,r,c,i),r.child;case 11:return c=r.type,p=r.pendingProps,p=r.elementType===c?p:Er(c,p),Xu(t,r,c,p,i);case 7:return Vt(t,r,r.pendingProps,i),r.child;case 8:return Vt(t,r,r.pendingProps.children,i),r.child;case 12:return Vt(t,r,r.pendingProps.children,i),r.child;case 10:e:{if(c=r.type._context,p=r.pendingProps,m=r.memoizedProps,C=p.value,st(vi,c._currentValue),c._currentValue=C,m!==null)if(_r(m.value,C)){if(m.children===p.children&&!Yt.current){r=an(t,r,i);break e}}else for(m=r.child,m!==null&&(m.return=r);m!==null;){var M=m.dependencies;if(M!==null){C=m.child;for(var $=M.firstContext;$!==null;){if($.context===c){if(m.tag===1){$=nn(-1,i&-i),$.tag=2;var le=m.updateQueue;if(le!==null){le=le.shared;var ye=le.pending;ye===null?$.next=$:($.next=ye.next,ye.next=$),le.pending=$}}m.lanes|=i,$=m.alternate,$!==null&&($.lanes|=i),kl(m.return,i,r),M.lanes|=i;break}$=$.next}}else if(m.tag===10)C=m.type===r.type?null:m.child;else if(m.tag===18){if(C=m.return,C===null)throw Error(n(341));C.lanes|=i,M=C.alternate,M!==null&&(M.lanes|=i),kl(C,i,r),C=m.sibling}else C=m.child;if(C!==null)C.return=m;else for(C=m;C!==null;){if(C===r){C=null;break}if(m=C.sibling,m!==null){m.return=C.return,C=m;break}C=C.return}m=C}Vt(t,r,p.children,i),r=r.child}return r;case 9:return p=r.type,c=r.pendingProps.children,Sa(r,i),p=vr(p),c=c(p),r.flags|=1,Vt(t,r,c,i),r.child;case 14:return c=r.type,p=Er(c,r.pendingProps),p=Er(c.type,p),Zu(t,r,c,p,i);case 15:return Qu(t,r,r.type,r.pendingProps,i);case 17:return c=r.type,p=r.pendingProps,p=r.elementType===c?p:Er(c,p),Pi(t,r),r.tag=1,Kt(c)?(t=!0,pi(r)):t=!1,Sa(r,i),$u(r,c,p),Ml(r,c,p,i),$l(null,r,c,!0,t,i);case 19:return ip(t,r,i);case 22:return Ju(t,r,i)}throw Error(n(156,r.tag))};function Pp(t,r){return cd(t,r)}function Mg(t,r,i,c){this.tag=t,this.key=i,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function jr(t,r,i,c){return new Mg(t,r,i,c)}function cc(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Bg(t){if(typeof t=="function")return cc(t)?1:0;if(t!=null){if(t=t.$$typeof,t===L)return 11;if(t===J)return 14}return 2}function Tn(t,r){var i=t.alternate;return i===null?(i=jr(t.tag,r,t.key,t.mode),i.elementType=t.elementType,i.type=t.type,i.stateNode=t.stateNode,i.alternate=t,t.alternate=i):(i.pendingProps=r,i.type=t.type,i.flags=0,i.subtreeFlags=0,i.deletions=null),i.flags=t.flags&14680064,i.childLanes=t.childLanes,i.lanes=t.lanes,i.child=t.child,i.memoizedProps=t.memoizedProps,i.memoizedState=t.memoizedState,i.updateQueue=t.updateQueue,r=t.dependencies,i.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},i.sibling=t.sibling,i.index=t.index,i.ref=t.ref,i}function Wi(t,r,i,c,p,m){var C=2;if(c=t,typeof t=="function")cc(t)&&(C=1);else if(typeof t=="string")C=5;else e:switch(t){case B:return Qn(i.children,p,m,r);case V:C=8,p|=8;break;case U:return t=jr(12,i,r,p|2),t.elementType=U,t.lanes=m,t;case H:return t=jr(13,i,r,p),t.elementType=H,t.lanes=m,t;case k:return t=jr(19,i,r,p),t.elementType=k,t.lanes=m,t;case se:return Ui(i,p,m,r);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case G:C=10;break e;case fe:C=9;break e;case L:C=11;break e;case J:C=14;break e;case ve:C=16,c=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return r=jr(C,i,r,p),r.elementType=t,r.type=c,r.lanes=m,r}function Qn(t,r,i,c){return t=jr(7,t,c,r),t.lanes=i,t}function Ui(t,r,i,c){return t=jr(22,t,c,r),t.elementType=se,t.lanes=i,t.stateNode={isHidden:!1},t}function dc(t,r,i){return t=jr(6,t,null,r),t.lanes=i,t}function uc(t,r,i){return r=jr(4,t.children!==null?t.children:[],t.key,r),r.lanes=i,r.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},r}function Wg(t,r,i,c,p){this.tag=r,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Do(0),this.expirationTimes=Do(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Do(0),this.identifierPrefix=c,this.onRecoverableError=p,this.mutableSourceEagerHydrationData=null}function pc(t,r,i,c,p,m,C,M,$){return t=new Wg(t,r,i,M,$),r===1?(r=1,m===!0&&(r|=8)):r=0,m=jr(3,null,null,r),t.current=m,m.stateNode=t,m.memoizedState={element:c,isDehydrated:i,cache:null,transitions:null,pendingSuspenseBoundaries:null},Sl(m),t}function Ug(t,r,i){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:D,key:c==null?null:""+c,children:t,containerInfo:r,implementation:i}}function Rp(t){if(!t)return kn;t=t._reactInternals;e:{if(Zr(t)!==t||t.tag!==1)throw Error(n(170));var r=t;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(Kt(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(n(171))}if(t.tag===1){var i=t.type;if(Kt(i))return su(t,i,r)}return r}function Tp(t,r,i,c,p,m,C,M,$){return t=pc(i,c,!0,t,p,m,C,M,$),t.context=Rp(null),i=t.current,c=Ht(),p=Pn(i),m=nn(c,p),m.callback=r??null,_n(i,m,p),t.current.lanes=p,Ha(t,p,c),Qt(t,c),t}function $i(t,r,i,c){var p=r.current,m=Ht(),C=Pn(p);return i=Rp(i),r.context===null?r.context=i:r.pendingContext=i,r=nn(m,C),r.payload={element:t},c=c===void 0?null:c,c!==null&&(r.callback=c),t=_n(p,r,C),t!==null&&(Rr(t,p,C,m),yi(t,p,C)),C}function Vi(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Ap(t,r){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var i=t.retryLane;t.retryLane=i!==0&&i<r?i:r}}function fc(t,r){Ap(t,r),(t=t.alternate)&&Ap(t,r)}function $g(){return null}var Lp=typeof reportError=="function"?reportError:function(t){console.error(t)};function hc(t){this._internalRoot=t}Hi.prototype.render=hc.prototype.render=function(t){var r=this._internalRoot;if(r===null)throw Error(n(409));$i(t,r,null,null)},Hi.prototype.unmount=hc.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var r=t.containerInfo;Kn(function(){$i(null,t,null,null)}),r[Qr]=null}};function Hi(t){this._internalRoot=t}Hi.prototype.unstable_scheduleHydration=function(t){if(t){var r=xd();t={blockedOn:null,target:t,priority:r};for(var i=0;i<vn.length&&r!==0&&r<vn[i].priority;i++);vn.splice(i,0,t),i===0&&yd(t)}};function mc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function qi(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Ip(){}function Vg(t,r,i,c,p){if(p){if(typeof c=="function"){var m=c;c=function(){var le=Vi(C);m.call(le)}}var C=Tp(r,c,t,0,null,!1,!1,"",Ip);return t._reactRootContainer=C,t[Qr]=C.current,ss(t.nodeType===8?t.parentNode:t),Kn(),C}for(;p=t.lastChild;)t.removeChild(p);if(typeof c=="function"){var M=c;c=function(){var le=Vi($);M.call(le)}}var $=pc(t,0,!1,null,null,!1,!1,"",Ip);return t._reactRootContainer=$,t[Qr]=$.current,ss(t.nodeType===8?t.parentNode:t),Kn(function(){$i(r,$,i,c)}),$}function Gi(t,r,i,c,p){var m=i._reactRootContainer;if(m){var C=m;if(typeof p=="function"){var M=p;p=function(){var $=Vi(C);M.call($)}}$i(r,C,t,p)}else C=Vg(i,r,t,p,c);return Vi(C)}md=function(t){switch(t.tag){case 3:var r=t.stateNode;if(r.current.memoizedState.isDehydrated){var i=Va(r.pendingLanes);i!==0&&(Mo(r,i|1),Qt(r,bt()),(Je&6)===0&&(Pa=bt()+500,Nn()))}break;case 13:Kn(function(){var c=rn(t,1);if(c!==null){var p=Ht();Rr(c,t,1,p)}}),fc(t,1)}},Bo=function(t){if(t.tag===13){var r=rn(t,134217728);if(r!==null){var i=Ht();Rr(r,t,134217728,i)}fc(t,134217728)}},gd=function(t){if(t.tag===13){var r=Pn(t),i=rn(t,r);if(i!==null){var c=Ht();Rr(i,t,r,c)}fc(t,r)}},xd=function(){return rt},vd=function(t,r){var i=rt;try{return rt=t,r()}finally{rt=i}},pn=function(t,r,i){switch(r){case"input":if(I(t,i),r=i.name,i.type==="radio"&&r!=null){for(i=t;i.parentNode;)i=i.parentNode;for(i=i.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<i.length;r++){var c=i[r];if(c!==t&&c.form===t.form){var p=di(c);if(!p)throw Error(n(90));xe(c),I(c,p)}}}break;case"textarea":Ce(t,i);break;case"select":r=i.value,r!=null&&pe(t,!!i.multiple,r,!1)}},Ze=ic,fr=Kn;var Hg={usingClientEntryPoint:!1,Events:[ls,xa,di,Ge,Ve,ic]},ws={findFiberByHostInstance:Wn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},qg={bundleType:ws.bundleType,version:ws.version,rendererPackageName:ws.rendererPackageName,rendererConfig:ws.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:E.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=ca(t),t===null?null:t.stateNode},findFiberByHostInstance:ws.findFiberByHostInstance||$g,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Yi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Yi.isDisabled&&Yi.supportsFiber)try{Hs=Yi.inject(qg),Br=Yi}catch{}}return Jt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hg,Jt.createPortal=function(t,r){var i=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!mc(r))throw Error(n(200));return Ug(t,r,null,i)},Jt.createRoot=function(t,r){if(!mc(t))throw Error(n(299));var i=!1,c="",p=Lp;return r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onRecoverableError!==void 0&&(p=r.onRecoverableError)),r=pc(t,1,!1,null,null,i,!1,c,p),t[Qr]=r.current,ss(t.nodeType===8?t.parentNode:t),new hc(r)},Jt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var r=t._reactInternals;if(r===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=ca(r),t=t===null?null:t.stateNode,t},Jt.flushSync=function(t){return Kn(t)},Jt.hydrate=function(t,r,i){if(!qi(r))throw Error(n(200));return Gi(null,t,r,!0,i)},Jt.hydrateRoot=function(t,r,i){if(!mc(t))throw Error(n(405));var c=i!=null&&i.hydratedSources||null,p=!1,m="",C=Lp;if(i!=null&&(i.unstable_strictMode===!0&&(p=!0),i.identifierPrefix!==void 0&&(m=i.identifierPrefix),i.onRecoverableError!==void 0&&(C=i.onRecoverableError)),r=Tp(r,null,t,1,i??null,p,!1,m,C),t[Qr]=r.current,ss(t),c)for(t=0;t<c.length;t++)i=c[t],p=i._getVersion,p=p(i._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[i,p]:r.mutableSourceEagerHydrationData.push(i,p);return new Hi(r)},Jt.render=function(t,r,i){if(!qi(r))throw Error(n(200));return Gi(null,t,r,!1,i)},Jt.unmountComponentAtNode=function(t){if(!qi(t))throw Error(n(40));return t._reactRootContainer?(Kn(function(){Gi(null,null,t,!1,function(){t._reactRootContainer=null,t[Qr]=null})}),!0):!1},Jt.unstable_batchedUpdates=ic,Jt.unstable_renderSubtreeIntoContainer=function(t,r,i,c){if(!qi(i))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return Gi(t,r,i,!1,c)},Jt.version="18.3.1-next-f1338f8080-20240426",Jt}var $p;function Hf(){if($p)return vc.exports;$p=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(a){console.error(a)}}return s(),vc.exports=tx(),vc.exports}var Vp;function rx(){if(Vp)return Xi;Vp=1;var s=Hf();return Xi.createRoot=s.createRoot,Xi.hydrateRoot=s.hydrateRoot,Xi}var nx=rx();const ax=Hc(nx);Hf();/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function zs(){return zs=Object.assign?Object.assign.bind():function(s){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(s[o]=n[o])}return s},zs.apply(this,arguments)}var On;(function(s){s.Pop="POP",s.Push="PUSH",s.Replace="REPLACE"})(On||(On={}));const Hp="popstate";function sx(s){s===void 0&&(s={});function a(o,l){let{pathname:d,search:u,hash:f}=o.location;return Tc("",{pathname:d,search:u,hash:f},l.state&&l.state.usr||null,l.state&&l.state.key||"default")}function n(o,l){return typeof l=="string"?l:ho(l)}return ox(a,n,null,s)}function ft(s,a){if(s===!1||s===null||typeof s>"u")throw new Error(a)}function Gc(s,a){if(!s){typeof console<"u"&&console.warn(a);try{throw new Error(a)}catch{}}}function ix(){return Math.random().toString(36).substr(2,8)}function qp(s,a){return{usr:s.state,key:s.key,idx:a}}function Tc(s,a,n,o){return n===void 0&&(n=null),zs({pathname:typeof s=="string"?s:s.pathname,search:"",hash:""},typeof a=="string"?Ba(a):a,{state:n,key:a&&a.key||o||ix()})}function ho(s){let{pathname:a="/",search:n="",hash:o=""}=s;return n&&n!=="?"&&(a+=n.charAt(0)==="?"?n:"?"+n),o&&o!=="#"&&(a+=o.charAt(0)==="#"?o:"#"+o),a}function Ba(s){let a={};if(s){let n=s.indexOf("#");n>=0&&(a.hash=s.substr(n),s=s.substr(0,n));let o=s.indexOf("?");o>=0&&(a.search=s.substr(o),s=s.substr(0,o)),s&&(a.pathname=s)}return a}function ox(s,a,n,o){o===void 0&&(o={});let{window:l=document.defaultView,v5Compat:d=!1}=o,u=l.history,f=On.Pop,h=null,b=j();b==null&&(b=0,u.replaceState(zs({},u.state,{idx:b}),""));function j(){return(u.state||{idx:null}).idx}function N(){f=On.Pop;let g=j(),S=g==null?null:g-b;b=g,h&&h({action:f,location:x.location,delta:S})}function w(g,S){f=On.Push;let z=Tc(x.location,g,S);b=j()+1;let T=qp(z,b),E=x.createHref(z);try{u.pushState(T,"",E)}catch(A){if(A instanceof DOMException&&A.name==="DataCloneError")throw A;l.location.assign(E)}d&&h&&h({action:f,location:x.location,delta:1})}function _(g,S){f=On.Replace;let z=Tc(x.location,g,S);b=j();let T=qp(z,b),E=x.createHref(z);u.replaceState(T,"",E),d&&h&&h({action:f,location:x.location,delta:0})}function v(g){let S=l.location.origin!=="null"?l.location.origin:l.location.href,z=typeof g=="string"?g:ho(g);return z=z.replace(/ $/,"%20"),ft(S,"No window.location.(origin|href) available to create URL for href: "+z),new URL(z,S)}let x={get action(){return f},get location(){return s(l,u)},listen(g){if(h)throw new Error("A history only accepts one active listener");return l.addEventListener(Hp,N),h=g,()=>{l.removeEventListener(Hp,N),h=null}},createHref(g){return a(l,g)},createURL:v,encodeLocation(g){let S=v(g);return{pathname:S.pathname,search:S.search,hash:S.hash}},push:w,replace:_,go(g){return u.go(g)}};return x}var Gp;(function(s){s.data="data",s.deferred="deferred",s.redirect="redirect",s.error="error"})(Gp||(Gp={}));function lx(s,a,n){return n===void 0&&(n="/"),cx(s,a,n)}function cx(s,a,n,o){let l=typeof a=="string"?Ba(a):a,d=Aa(l.pathname||"/",n);if(d==null)return null;let u=qf(s);dx(u);let f=null;for(let h=0;f==null&&h<u.length;++h){let b=jx(d);f=bx(u[h],b)}return f}function qf(s,a,n,o){a===void 0&&(a=[]),n===void 0&&(n=[]),o===void 0&&(o="");let l=(d,u,f)=>{let h={relativePath:f===void 0?d.path||"":f,caseSensitive:d.caseSensitive===!0,childrenIndex:u,route:d};h.relativePath.startsWith("/")&&(ft(h.relativePath.startsWith(o),'Absolute route path "'+h.relativePath+'" nested under path '+('"'+o+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),h.relativePath=h.relativePath.slice(o.length));let b=Dn([o,h.relativePath]),j=n.concat(h);d.children&&d.children.length>0&&(ft(d.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+b+'".')),qf(d.children,a,j,b)),!(d.path==null&&!d.index)&&a.push({path:b,score:xx(b,d.index),routesMeta:j})};return s.forEach((d,u)=>{var f;if(d.path===""||!((f=d.path)!=null&&f.includes("?")))l(d,u);else for(let h of Gf(d.path))l(d,u,h)}),a}function Gf(s){let a=s.split("/");if(a.length===0)return[];let[n,...o]=a,l=n.endsWith("?"),d=n.replace(/\?$/,"");if(o.length===0)return l?[d,""]:[d];let u=Gf(o.join("/")),f=[];return f.push(...u.map(h=>h===""?d:[d,h].join("/"))),l&&f.push(...u),f.map(h=>s.startsWith("/")&&h===""?"/":h)}function dx(s){s.sort((a,n)=>a.score!==n.score?n.score-a.score:vx(a.routesMeta.map(o=>o.childrenIndex),n.routesMeta.map(o=>o.childrenIndex)))}const ux=/^:[\w-]+$/,px=3,fx=2,hx=1,mx=10,gx=-2,Yp=s=>s==="*";function xx(s,a){let n=s.split("/"),o=n.length;return n.some(Yp)&&(o+=gx),a&&(o+=fx),n.filter(l=>!Yp(l)).reduce((l,d)=>l+(ux.test(d)?px:d===""?hx:mx),o)}function vx(s,a){return s.length===a.length&&s.slice(0,-1).every((o,l)=>o===a[l])?s[s.length-1]-a[a.length-1]:0}function bx(s,a,n){let{routesMeta:o}=s,l={},d="/",u=[];for(let f=0;f<o.length;++f){let h=o[f],b=f===o.length-1,j=d==="/"?a:a.slice(d.length)||"/",N=Ac({path:h.relativePath,caseSensitive:h.caseSensitive,end:b},j),w=h.route;if(!N)return null;Object.assign(l,N.params),u.push({params:l,pathname:Dn([d,N.pathname]),pathnameBase:_x(Dn([d,N.pathnameBase])),route:w}),N.pathnameBase!=="/"&&(d=Dn([d,N.pathnameBase]))}return u}function Ac(s,a){typeof s=="string"&&(s={path:s,caseSensitive:!1,end:!0});let[n,o]=yx(s.path,s.caseSensitive,s.end),l=a.match(n);if(!l)return null;let d=l[0],u=d.replace(/(.)\/+$/,"$1"),f=l.slice(1);return{params:o.reduce((b,j,N)=>{let{paramName:w,isOptional:_}=j;if(w==="*"){let x=f[N]||"";u=d.slice(0,d.length-x.length).replace(/(.)\/+$/,"$1")}const v=f[N];return _&&!v?b[w]=void 0:b[w]=(v||"").replace(/%2F/g,"/"),b},{}),pathname:d,pathnameBase:u,pattern:s}}function yx(s,a,n){a===void 0&&(a=!1),n===void 0&&(n=!0),Gc(s==="*"||!s.endsWith("*")||s.endsWith("/*"),'Route path "'+s+'" will be treated as if it were '+('"'+s.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+s.replace(/\*$/,"/*")+'".'));let o=[],l="^"+s.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(u,f,h)=>(o.push({paramName:f,isOptional:h!=null}),h?"/?([^\\/]+)?":"/([^\\/]+)"));return s.endsWith("*")?(o.push({paramName:"*"}),l+=s==="*"||s==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?l+="\\/*$":s!==""&&s!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,a?void 0:"i"),o]}function jx(s){try{return s.split("/").map(a=>decodeURIComponent(a).replace(/\//g,"%2F")).join("/")}catch(a){return Gc(!1,'The URL path "'+s+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+a+").")),s}}function Aa(s,a){if(a==="/")return s;if(!s.toLowerCase().startsWith(a.toLowerCase()))return null;let n=a.endsWith("/")?a.length-1:a.length,o=s.charAt(n);return o&&o!=="/"?null:s.slice(n)||"/"}const wx=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,kx=s=>wx.test(s);function Nx(s,a){a===void 0&&(a="/");let{pathname:n,search:o="",hash:l=""}=typeof s=="string"?Ba(s):s,d;if(n)if(kx(n))d=n;else{if(n.includes("//")){let u=n;n=n.replace(/\/\/+/g,"/"),Gc(!1,"Pathnames cannot have embedded double slashes - normalizing "+(u+" -> "+n))}n.startsWith("/")?d=Kp(n.substring(1),"/"):d=Kp(n,a)}else d=a;return{pathname:d,search:Cx(o),hash:Ex(l)}}function Kp(s,a){let n=a.replace(/\/+$/,"").split("/");return s.split("/").forEach(l=>{l===".."?n.length>1&&n.pop():l!=="."&&n.push(l)}),n.length>1?n.join("/"):"/"}function jc(s,a,n,o){return"Cannot include a '"+s+"' character in a manually specified "+("`to."+a+"` field ["+JSON.stringify(o)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Sx(s){return s.filter((a,n)=>n===0||a.route.path&&a.route.path.length>0)}function Yc(s,a){let n=Sx(s);return a?n.map((o,l)=>l===n.length-1?o.pathname:o.pathnameBase):n.map(o=>o.pathnameBase)}function Kc(s,a,n,o){o===void 0&&(o=!1);let l;typeof s=="string"?l=Ba(s):(l=zs({},s),ft(!l.pathname||!l.pathname.includes("?"),jc("?","pathname","search",l)),ft(!l.pathname||!l.pathname.includes("#"),jc("#","pathname","hash",l)),ft(!l.search||!l.search.includes("#"),jc("#","search","hash",l)));let d=s===""||l.pathname==="",u=d?"/":l.pathname,f;if(u==null)f=n;else{let N=a.length-1;if(!o&&u.startsWith("..")){let w=u.split("/");for(;w[0]==="..";)w.shift(),N-=1;l.pathname=w.join("/")}f=N>=0?a[N]:"/"}let h=Nx(l,f),b=u&&u!=="/"&&u.endsWith("/"),j=(d||u===".")&&n.endsWith("/");return!h.pathname.endsWith("/")&&(b||j)&&(h.pathname+="/"),h}const Dn=s=>s.join("/").replace(/\/\/+/g,"/"),_x=s=>s.replace(/\/+$/,"").replace(/^\/*/,"/"),Cx=s=>!s||s==="?"?"":s.startsWith("?")?s:"?"+s,Ex=s=>!s||s==="#"?"":s.startsWith("#")?s:"#"+s;function zx(s){return s!=null&&typeof s.status=="number"&&typeof s.statusText=="string"&&typeof s.internal=="boolean"&&"data"in s}const Yf=["post","put","patch","delete"];new Set(Yf);const Px=["get",...Yf];new Set(Px);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ps(){return Ps=Object.assign?Object.assign.bind():function(s){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(s[o]=n[o])}return s},Ps.apply(this,arguments)}const jo=F.createContext(null),Kf=F.createContext(null),cn=F.createContext(null),wo=F.createContext(null),dn=F.createContext({outlet:null,matches:[],isDataRoute:!1}),Xf=F.createContext(null);function Rx(s,a){let{relative:n}=a===void 0?{}:a;Wa()||ft(!1);let{basename:o,navigator:l}=F.useContext(cn),{hash:d,pathname:u,search:f}=ko(s,{relative:n}),h=u;return o!=="/"&&(h=u==="/"?o:Dn([o,u])),l.createHref({pathname:h,search:f,hash:d})}function Wa(){return F.useContext(wo)!=null}function Ir(){return Wa()||ft(!1),F.useContext(wo).location}function Zf(s){F.useContext(cn).static||F.useLayoutEffect(s)}function Ut(){let{isDataRoute:s}=F.useContext(dn);return s?Vx():Tx()}function Tx(){Wa()||ft(!1);let s=F.useContext(jo),{basename:a,future:n,navigator:o}=F.useContext(cn),{matches:l}=F.useContext(dn),{pathname:d}=Ir(),u=JSON.stringify(Yc(l,n.v7_relativeSplatPath)),f=F.useRef(!1);return Zf(()=>{f.current=!0}),F.useCallback(function(b,j){if(j===void 0&&(j={}),!f.current)return;if(typeof b=="number"){o.go(b);return}let N=Kc(b,JSON.parse(u),d,j.relative==="path");s==null&&a!=="/"&&(N.pathname=N.pathname==="/"?a:Dn([a,N.pathname])),(j.replace?o.replace:o.push)(N,j.state,j)},[a,o,u,d,s])}function Qf(){let{matches:s}=F.useContext(dn),a=s[s.length-1];return a?a.params:{}}function ko(s,a){let{relative:n}=a===void 0?{}:a,{future:o}=F.useContext(cn),{matches:l}=F.useContext(dn),{pathname:d}=Ir(),u=JSON.stringify(Yc(l,o.v7_relativeSplatPath));return F.useMemo(()=>Kc(s,JSON.parse(u),d,n==="path"),[s,u,d,n])}function Ax(s,a){return Lx(s,a)}function Lx(s,a,n,o){Wa()||ft(!1);let{navigator:l}=F.useContext(cn),{matches:d}=F.useContext(dn),u=d[d.length-1],f=u?u.params:{};u&&u.pathname;let h=u?u.pathnameBase:"/";u&&u.route;let b=Ir(),j;if(a){var N;let g=typeof a=="string"?Ba(a):a;h==="/"||(N=g.pathname)!=null&&N.startsWith(h)||ft(!1),j=g}else j=b;let w=j.pathname||"/",_=w;if(h!=="/"){let g=h.replace(/^\//,"").split("/");_="/"+w.replace(/^\//,"").split("/").slice(g.length).join("/")}let v=lx(s,{pathname:_}),x=Mx(v&&v.map(g=>Object.assign({},g,{params:Object.assign({},f,g.params),pathname:Dn([h,l.encodeLocation?l.encodeLocation(g.pathname).pathname:g.pathname]),pathnameBase:g.pathnameBase==="/"?h:Dn([h,l.encodeLocation?l.encodeLocation(g.pathnameBase).pathname:g.pathnameBase])})),d,n,o);return a&&x?F.createElement(wo.Provider,{value:{location:Ps({pathname:"/",search:"",hash:"",state:null,key:"default"},j),navigationType:On.Pop}},x):x}function Ix(){let s=$x(),a=zx(s)?s.status+" "+s.statusText:s instanceof Error?s.message:JSON.stringify(s),n=s instanceof Error?s.stack:null,l={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return F.createElement(F.Fragment,null,F.createElement("h2",null,"Unexpected Application Error!"),F.createElement("h3",{style:{fontStyle:"italic"}},a),n?F.createElement("pre",{style:l},n):null,null)}const Ox=F.createElement(Ix,null);class Fx extends F.Component{constructor(a){super(a),this.state={location:a.location,revalidation:a.revalidation,error:a.error}}static getDerivedStateFromError(a){return{error:a}}static getDerivedStateFromProps(a,n){return n.location!==a.location||n.revalidation!=="idle"&&a.revalidation==="idle"?{error:a.error,location:a.location,revalidation:a.revalidation}:{error:a.error!==void 0?a.error:n.error,location:n.location,revalidation:a.revalidation||n.revalidation}}componentDidCatch(a,n){console.error("React Router caught the following error during render",a,n)}render(){return this.state.error!==void 0?F.createElement(dn.Provider,{value:this.props.routeContext},F.createElement(Xf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Dx(s){let{routeContext:a,match:n,children:o}=s,l=F.useContext(jo);return l&&l.static&&l.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(l.staticContext._deepestRenderedBoundaryId=n.route.id),F.createElement(dn.Provider,{value:a},o)}function Mx(s,a,n,o){var l;if(a===void 0&&(a=[]),n===void 0&&(n=null),o===void 0&&(o=null),s==null){var d;if(!n)return null;if(n.errors)s=n.matches;else if((d=o)!=null&&d.v7_partialHydration&&a.length===0&&!n.initialized&&n.matches.length>0)s=n.matches;else return null}let u=s,f=(l=n)==null?void 0:l.errors;if(f!=null){let j=u.findIndex(N=>N.route.id&&(f==null?void 0:f[N.route.id])!==void 0);j>=0||ft(!1),u=u.slice(0,Math.min(u.length,j+1))}let h=!1,b=-1;if(n&&o&&o.v7_partialHydration)for(let j=0;j<u.length;j++){let N=u[j];if((N.route.HydrateFallback||N.route.hydrateFallbackElement)&&(b=j),N.route.id){let{loaderData:w,errors:_}=n,v=N.route.loader&&w[N.route.id]===void 0&&(!_||_[N.route.id]===void 0);if(N.route.lazy||v){h=!0,b>=0?u=u.slice(0,b+1):u=[u[0]];break}}}return u.reduceRight((j,N,w)=>{let _,v=!1,x=null,g=null;n&&(_=f&&N.route.id?f[N.route.id]:void 0,x=N.route.errorElement||Ox,h&&(b<0&&w===0?(Hx("route-fallback"),v=!0,g=null):b===w&&(v=!0,g=N.route.hydrateFallbackElement||null)));let S=a.concat(u.slice(0,w+1)),z=()=>{let T;return _?T=x:v?T=g:N.route.Component?T=F.createElement(N.route.Component,null):N.route.element?T=N.route.element:T=j,F.createElement(Dx,{match:N,routeContext:{outlet:j,matches:S,isDataRoute:n!=null},children:T})};return n&&(N.route.ErrorBoundary||N.route.errorElement||w===0)?F.createElement(Fx,{location:n.location,revalidation:n.revalidation,component:x,error:_,children:z(),routeContext:{outlet:null,matches:S,isDataRoute:!0}}):z()},null)}var Jf=(function(s){return s.UseBlocker="useBlocker",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s})(Jf||{}),eh=(function(s){return s.UseBlocker="useBlocker",s.UseLoaderData="useLoaderData",s.UseActionData="useActionData",s.UseRouteError="useRouteError",s.UseNavigation="useNavigation",s.UseRouteLoaderData="useRouteLoaderData",s.UseMatches="useMatches",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s.UseRouteId="useRouteId",s})(eh||{});function Bx(s){let a=F.useContext(jo);return a||ft(!1),a}function Wx(s){let a=F.useContext(Kf);return a||ft(!1),a}function Ux(s){let a=F.useContext(dn);return a||ft(!1),a}function th(s){let a=Ux(),n=a.matches[a.matches.length-1];return n.route.id||ft(!1),n.route.id}function $x(){var s;let a=F.useContext(Xf),n=Wx(),o=th();return a!==void 0?a:(s=n.errors)==null?void 0:s[o]}function Vx(){let{router:s}=Bx(Jf.UseNavigateStable),a=th(eh.UseNavigateStable),n=F.useRef(!1);return Zf(()=>{n.current=!0}),F.useCallback(function(l,d){d===void 0&&(d={}),n.current&&(typeof l=="number"?s.navigate(l):s.navigate(l,Ps({fromRouteId:a},d)))},[s,a])}const Xp={};function Hx(s,a,n){Xp[s]||(Xp[s]=!0)}function qx(s,a){s==null||s.v7_startTransition,s==null||s.v7_relativeSplatPath}function Lc(s){let{to:a,replace:n,state:o,relative:l}=s;Wa()||ft(!1);let{future:d,static:u}=F.useContext(cn),{matches:f}=F.useContext(dn),{pathname:h}=Ir(),b=Ut(),j=Kc(a,Yc(f,d.v7_relativeSplatPath),h,l==="path"),N=JSON.stringify(j);return F.useEffect(()=>b(JSON.parse(N),{replace:n,state:o,relative:l}),[b,N,l,n,o]),null}function jt(s){ft(!1)}function Gx(s){let{basename:a="/",children:n=null,location:o,navigationType:l=On.Pop,navigator:d,static:u=!1,future:f}=s;Wa()&&ft(!1);let h=a.replace(/^\/*/,"/"),b=F.useMemo(()=>({basename:h,navigator:d,static:u,future:Ps({v7_relativeSplatPath:!1},f)}),[h,f,d,u]);typeof o=="string"&&(o=Ba(o));let{pathname:j="/",search:N="",hash:w="",state:_=null,key:v="default"}=o,x=F.useMemo(()=>{let g=Aa(j,h);return g==null?null:{location:{pathname:g,search:N,hash:w,state:_,key:v},navigationType:l}},[h,j,N,w,_,v,l]);return x==null?null:F.createElement(cn.Provider,{value:b},F.createElement(wo.Provider,{children:n,value:x}))}function Zp(s){let{children:a,location:n}=s;return Ax(Ic(a),n)}new Promise(()=>{});function Ic(s,a){a===void 0&&(a=[]);let n=[];return F.Children.forEach(s,(o,l)=>{if(!F.isValidElement(o))return;let d=[...a,l];if(o.type===F.Fragment){n.push.apply(n,Ic(o.props.children,d));return}o.type!==jt&&ft(!1),!o.props.index||!o.props.children||ft(!1);let u={id:o.props.id||d.join("-"),caseSensitive:o.props.caseSensitive,element:o.props.element,Component:o.props.Component,index:o.props.index,path:o.props.path,loader:o.props.loader,action:o.props.action,errorElement:o.props.errorElement,ErrorBoundary:o.props.ErrorBoundary,hasErrorBoundary:o.props.ErrorBoundary!=null||o.props.errorElement!=null,shouldRevalidate:o.props.shouldRevalidate,handle:o.props.handle,lazy:o.props.lazy};o.props.children&&(u.children=Ic(o.props.children,d)),n.push(u)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function mo(){return mo=Object.assign?Object.assign.bind():function(s){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(s[o]=n[o])}return s},mo.apply(this,arguments)}function rh(s,a){if(s==null)return{};var n={},o=Object.keys(s),l,d;for(d=0;d<o.length;d++)l=o[d],!(a.indexOf(l)>=0)&&(n[l]=s[l]);return n}function Yx(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}function Kx(s,a){return s.button===0&&(!a||a==="_self")&&!Yx(s)}function Oc(s){return s===void 0&&(s=""),new URLSearchParams(typeof s=="string"||Array.isArray(s)||s instanceof URLSearchParams?s:Object.keys(s).reduce((a,n)=>{let o=s[n];return a.concat(Array.isArray(o)?o.map(l=>[n,l]):[[n,o]])},[]))}function Xx(s,a){let n=Oc(s);return a&&a.forEach((o,l)=>{n.has(l)||a.getAll(l).forEach(d=>{n.append(l,d)})}),n}const Zx=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Qx=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],Jx="6";try{window.__reactRouterVersion=Jx}catch{}const e0=F.createContext({isTransitioning:!1}),t0="startTransition",Qp=Qg[t0];function r0(s){let{basename:a,children:n,future:o,window:l}=s,d=F.useRef();d.current==null&&(d.current=sx({window:l,v5Compat:!0}));let u=d.current,[f,h]=F.useState({action:u.action,location:u.location}),{v7_startTransition:b}=o||{},j=F.useCallback(N=>{b&&Qp?Qp(()=>h(N)):h(N)},[h,b]);return F.useLayoutEffect(()=>u.listen(j),[u,j]),F.useEffect(()=>qx(o),[o]),F.createElement(Gx,{basename:a,children:n,location:f.location,navigationType:f.action,navigator:u,future:o})}const n0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",a0=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,tt=F.forwardRef(function(a,n){let{onClick:o,relative:l,reloadDocument:d,replace:u,state:f,target:h,to:b,preventScrollReset:j,viewTransition:N}=a,w=rh(a,Zx),{basename:_}=F.useContext(cn),v,x=!1;if(typeof b=="string"&&a0.test(b)&&(v=b,n0))try{let T=new URL(window.location.href),E=b.startsWith("//")?new URL(T.protocol+b):new URL(b),A=Aa(E.pathname,_);E.origin===T.origin&&A!=null?b=A+E.search+E.hash:x=!0}catch{}let g=Rx(b,{relative:l}),S=i0(b,{replace:u,state:f,target:h,preventScrollReset:j,relative:l,viewTransition:N});function z(T){o&&o(T),T.defaultPrevented||S(T)}return F.createElement("a",mo({},w,{href:v||g,onClick:x||d?o:z,ref:n,target:h}))}),Zi=F.forwardRef(function(a,n){let{"aria-current":o="page",caseSensitive:l=!1,className:d="",end:u=!1,style:f,to:h,viewTransition:b,children:j}=a,N=rh(a,Qx),w=ko(h,{relative:N.relative}),_=Ir(),v=F.useContext(Kf),{navigator:x,basename:g}=F.useContext(cn),S=v!=null&&l0(w)&&b===!0,z=x.encodeLocation?x.encodeLocation(w).pathname:w.pathname,T=_.pathname,E=v&&v.navigation&&v.navigation.location?v.navigation.location.pathname:null;l||(T=T.toLowerCase(),E=E?E.toLowerCase():null,z=z.toLowerCase()),E&&g&&(E=Aa(E,g)||E);const A=z!=="/"&&z.endsWith("/")?z.length-1:z.length;let D=T===z||!u&&T.startsWith(z)&&T.charAt(A)==="/",B=E!=null&&(E===z||!u&&E.startsWith(z)&&E.charAt(z.length)==="/"),V={isActive:D,isPending:B,isTransitioning:S},U=D?o:void 0,G;typeof d=="function"?G=d(V):G=[d,D?"active":null,B?"pending":null,S?"transitioning":null].filter(Boolean).join(" ");let fe=typeof f=="function"?f(V):f;return F.createElement(tt,mo({},N,{"aria-current":U,className:G,ref:n,style:fe,to:h,viewTransition:b}),typeof j=="function"?j(V):j)});var Fc;(function(s){s.UseScrollRestoration="useScrollRestoration",s.UseSubmit="useSubmit",s.UseSubmitFetcher="useSubmitFetcher",s.UseFetcher="useFetcher",s.useViewTransitionState="useViewTransitionState"})(Fc||(Fc={}));var Jp;(function(s){s.UseFetcher="useFetcher",s.UseFetchers="useFetchers",s.UseScrollRestoration="useScrollRestoration"})(Jp||(Jp={}));function s0(s){let a=F.useContext(jo);return a||ft(!1),a}function i0(s,a){let{target:n,replace:o,state:l,preventScrollReset:d,relative:u,viewTransition:f}=a===void 0?{}:a,h=Ut(),b=Ir(),j=ko(s,{relative:u});return F.useCallback(N=>{if(Kx(N,n)){N.preventDefault();let w=o!==void 0?o:ho(b)===ho(j);h(s,{replace:w,state:l,preventScrollReset:d,relative:u,viewTransition:f})}},[b,h,j,o,l,n,s,d,u,f])}function o0(s){let a=F.useRef(Oc(s)),n=F.useRef(!1),o=Ir(),l=F.useMemo(()=>Xx(o.search,n.current?null:a.current),[o.search]),d=Ut(),u=F.useCallback((f,h)=>{const b=Oc(typeof f=="function"?f(l):f);n.current=!0,d("?"+b,h)},[d,l]);return[l,u]}function l0(s,a){a===void 0&&(a={});let n=F.useContext(e0);n==null&&ft(!1);let{basename:o}=s0(Fc.useViewTransitionState),l=ko(s,{relative:a.relative});if(!n.isTransitioning)return!1;let d=Aa(n.currentLocation.pathname,o)||n.currentLocation.pathname,u=Aa(n.nextLocation.pathname,o)||n.nextLocation.pathname;return Ac(l.pathname,u)!=null||Ac(l.pathname,d)!=null}function nh(s,a){return function(){return s.apply(a,arguments)}}const{toString:c0}=Object.prototype,{getPrototypeOf:Xc}=Object,{iterator:No,toStringTag:ah}=Symbol,So=(s=>a=>{const n=c0.call(a);return s[n]||(s[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),Or=s=>(s=s.toLowerCase(),a=>So(a)===s),_o=s=>a=>typeof a===s,{isArray:Ua}=Array,La=_o("undefined");function Fs(s){return s!==null&&!La(s)&&s.constructor!==null&&!La(s.constructor)&&tr(s.constructor.isBuffer)&&s.constructor.isBuffer(s)}const sh=Or("ArrayBuffer");function d0(s){let a;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?a=ArrayBuffer.isView(s):a=s&&s.buffer&&sh(s.buffer),a}const u0=_o("string"),tr=_o("function"),ih=_o("number"),Ds=s=>s!==null&&typeof s=="object",p0=s=>s===!0||s===!1,so=s=>{if(So(s)!=="object")return!1;const a=Xc(s);return(a===null||a===Object.prototype||Object.getPrototypeOf(a)===null)&&!(ah in s)&&!(No in s)},f0=s=>{if(!Ds(s)||Fs(s))return!1;try{return Object.keys(s).length===0&&Object.getPrototypeOf(s)===Object.prototype}catch{return!1}},h0=Or("Date"),m0=Or("File"),g0=Or("Blob"),x0=Or("FileList"),v0=s=>Ds(s)&&tr(s.pipe),b0=s=>{let a;return s&&(typeof FormData=="function"&&s instanceof FormData||tr(s.append)&&((a=So(s))==="formdata"||a==="object"&&tr(s.toString)&&s.toString()==="[object FormData]"))},y0=Or("URLSearchParams"),[j0,w0,k0,N0]=["ReadableStream","Request","Response","Headers"].map(Or),S0=s=>s.trim?s.trim():s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ms(s,a,{allOwnKeys:n=!1}={}){if(s===null||typeof s>"u")return;let o,l;if(typeof s!="object"&&(s=[s]),Ua(s))for(o=0,l=s.length;o<l;o++)a.call(null,s[o],o,s);else{if(Fs(s))return;const d=n?Object.getOwnPropertyNames(s):Object.keys(s),u=d.length;let f;for(o=0;o<u;o++)f=d[o],a.call(null,s[f],f,s)}}function oh(s,a){if(Fs(s))return null;a=a.toLowerCase();const n=Object.keys(s);let o=n.length,l;for(;o-- >0;)if(l=n[o],a===l.toLowerCase())return l;return null}const Jn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,lh=s=>!La(s)&&s!==Jn;function Dc(){const{caseless:s,skipUndefined:a}=lh(this)&&this||{},n={},o=(l,d)=>{if(d==="__proto__"||d==="constructor"||d==="prototype")return;const u=s&&oh(n,d)||d;so(n[u])&&so(l)?n[u]=Dc(n[u],l):so(l)?n[u]=Dc({},l):Ua(l)?n[u]=l.slice():(!a||!La(l))&&(n[u]=l)};for(let l=0,d=arguments.length;l<d;l++)arguments[l]&&Ms(arguments[l],o);return n}const _0=(s,a,n,{allOwnKeys:o}={})=>(Ms(a,(l,d)=>{n&&tr(l)?Object.defineProperty(s,d,{value:nh(l,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(s,d,{value:l,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:o}),s),C0=s=>(s.charCodeAt(0)===65279&&(s=s.slice(1)),s),E0=(s,a,n,o)=>{s.prototype=Object.create(a.prototype,o),Object.defineProperty(s.prototype,"constructor",{value:s,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(s,"super",{value:a.prototype}),n&&Object.assign(s.prototype,n)},z0=(s,a,n,o)=>{let l,d,u;const f={};if(a=a||{},s==null)return a;do{for(l=Object.getOwnPropertyNames(s),d=l.length;d-- >0;)u=l[d],(!o||o(u,s,a))&&!f[u]&&(a[u]=s[u],f[u]=!0);s=n!==!1&&Xc(s)}while(s&&(!n||n(s,a))&&s!==Object.prototype);return a},P0=(s,a,n)=>{s=String(s),(n===void 0||n>s.length)&&(n=s.length),n-=a.length;const o=s.indexOf(a,n);return o!==-1&&o===n},R0=s=>{if(!s)return null;if(Ua(s))return s;let a=s.length;if(!ih(a))return null;const n=new Array(a);for(;a-- >0;)n[a]=s[a];return n},T0=(s=>a=>s&&a instanceof s)(typeof Uint8Array<"u"&&Xc(Uint8Array)),A0=(s,a)=>{const o=(s&&s[No]).call(s);let l;for(;(l=o.next())&&!l.done;){const d=l.value;a.call(s,d[0],d[1])}},L0=(s,a)=>{let n;const o=[];for(;(n=s.exec(a))!==null;)o.push(n);return o},I0=Or("HTMLFormElement"),O0=s=>s.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,o,l){return o.toUpperCase()+l}),ef=(({hasOwnProperty:s})=>(a,n)=>s.call(a,n))(Object.prototype),F0=Or("RegExp"),ch=(s,a)=>{const n=Object.getOwnPropertyDescriptors(s),o={};Ms(n,(l,d)=>{let u;(u=a(l,d,s))!==!1&&(o[d]=u||l)}),Object.defineProperties(s,o)},D0=s=>{ch(s,(a,n)=>{if(tr(s)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const o=s[n];if(tr(o)){if(a.enumerable=!1,"writable"in a){a.writable=!1;return}a.set||(a.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},M0=(s,a)=>{const n={},o=l=>{l.forEach(d=>{n[d]=!0})};return Ua(s)?o(s):o(String(s).split(a)),n},B0=()=>{},W0=(s,a)=>s!=null&&Number.isFinite(s=+s)?s:a;function U0(s){return!!(s&&tr(s.append)&&s[ah]==="FormData"&&s[No])}const $0=s=>{const a=new Array(10),n=(o,l)=>{if(Ds(o)){if(a.indexOf(o)>=0)return;if(Fs(o))return o;if(!("toJSON"in o)){a[l]=o;const d=Ua(o)?[]:{};return Ms(o,(u,f)=>{const h=n(u,l+1);!La(h)&&(d[f]=h)}),a[l]=void 0,d}}return o};return n(s,0)},V0=Or("AsyncFunction"),H0=s=>s&&(Ds(s)||tr(s))&&tr(s.then)&&tr(s.catch),dh=((s,a)=>s?setImmediate:a?((n,o)=>(Jn.addEventListener("message",({source:l,data:d})=>{l===Jn&&d===n&&o.length&&o.shift()()},!1),l=>{o.push(l),Jn.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",tr(Jn.postMessage)),q0=typeof queueMicrotask<"u"?queueMicrotask.bind(Jn):typeof process<"u"&&process.nextTick||dh,G0=s=>s!=null&&tr(s[No]),de={isArray:Ua,isArrayBuffer:sh,isBuffer:Fs,isFormData:b0,isArrayBufferView:d0,isString:u0,isNumber:ih,isBoolean:p0,isObject:Ds,isPlainObject:so,isEmptyObject:f0,isReadableStream:j0,isRequest:w0,isResponse:k0,isHeaders:N0,isUndefined:La,isDate:h0,isFile:m0,isBlob:g0,isRegExp:F0,isFunction:tr,isStream:v0,isURLSearchParams:y0,isTypedArray:T0,isFileList:x0,forEach:Ms,merge:Dc,extend:_0,trim:S0,stripBOM:C0,inherits:E0,toFlatObject:z0,kindOf:So,kindOfTest:Or,endsWith:P0,toArray:R0,forEachEntry:A0,matchAll:L0,isHTMLForm:I0,hasOwnProperty:ef,hasOwnProp:ef,reduceDescriptors:ch,freezeMethods:D0,toObjectSet:M0,toCamelCase:O0,noop:B0,toFiniteNumber:W0,findKey:oh,global:Jn,isContextDefined:lh,isSpecCompliantForm:U0,toJSONObject:$0,isAsyncFn:V0,isThenable:H0,setImmediate:dh,asap:q0,isIterable:G0};let Ue=class uh extends Error{static from(a,n,o,l,d,u){const f=new uh(a.message,n||a.code,o,l,d);return f.cause=a,f.name=a.name,u&&Object.assign(f,u),f}constructor(a,n,o,l,d){super(a),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),o&&(this.config=o),l&&(this.request=l),d&&(this.response=d,this.status=d.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:de.toJSONObject(this.config),code:this.code,status:this.status}}};Ue.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";Ue.ERR_BAD_OPTION="ERR_BAD_OPTION";Ue.ECONNABORTED="ECONNABORTED";Ue.ETIMEDOUT="ETIMEDOUT";Ue.ERR_NETWORK="ERR_NETWORK";Ue.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";Ue.ERR_DEPRECATED="ERR_DEPRECATED";Ue.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";Ue.ERR_BAD_REQUEST="ERR_BAD_REQUEST";Ue.ERR_CANCELED="ERR_CANCELED";Ue.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";Ue.ERR_INVALID_URL="ERR_INVALID_URL";const Y0=null;function Mc(s){return de.isPlainObject(s)||de.isArray(s)}function ph(s){return de.endsWith(s,"[]")?s.slice(0,-2):s}function tf(s,a,n){return s?s.concat(a).map(function(l,d){return l=ph(l),!n&&d?"["+l+"]":l}).join(n?".":""):a}function K0(s){return de.isArray(s)&&!s.some(Mc)}const X0=de.toFlatObject(de,{},null,function(a){return/^is[A-Z]/.test(a)});function Co(s,a,n){if(!de.isObject(s))throw new TypeError("target must be an object");a=a||new FormData,n=de.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(x,g){return!de.isUndefined(g[x])});const o=n.metaTokens,l=n.visitor||j,d=n.dots,u=n.indexes,h=(n.Blob||typeof Blob<"u"&&Blob)&&de.isSpecCompliantForm(a);if(!de.isFunction(l))throw new TypeError("visitor must be a function");function b(v){if(v===null)return"";if(de.isDate(v))return v.toISOString();if(de.isBoolean(v))return v.toString();if(!h&&de.isBlob(v))throw new Ue("Blob is not supported. Use a Buffer instead.");return de.isArrayBuffer(v)||de.isTypedArray(v)?h&&typeof Blob=="function"?new Blob([v]):Buffer.from(v):v}function j(v,x,g){let S=v;if(v&&!g&&typeof v=="object"){if(de.endsWith(x,"{}"))x=o?x:x.slice(0,-2),v=JSON.stringify(v);else if(de.isArray(v)&&K0(v)||(de.isFileList(v)||de.endsWith(x,"[]"))&&(S=de.toArray(v)))return x=ph(x),S.forEach(function(T,E){!(de.isUndefined(T)||T===null)&&a.append(u===!0?tf([x],E,d):u===null?x:x+"[]",b(T))}),!1}return Mc(v)?!0:(a.append(tf(g,x,d),b(v)),!1)}const N=[],w=Object.assign(X0,{defaultVisitor:j,convertValue:b,isVisitable:Mc});function _(v,x){if(!de.isUndefined(v)){if(N.indexOf(v)!==-1)throw Error("Circular reference detected in "+x.join("."));N.push(v),de.forEach(v,function(S,z){(!(de.isUndefined(S)||S===null)&&l.call(a,S,de.isString(z)?z.trim():z,x,w))===!0&&_(S,x?x.concat(z):[z])}),N.pop()}}if(!de.isObject(s))throw new TypeError("data must be an object");return _(s),a}function rf(s){const a={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(s).replace(/[!'()~]|%20|%00/g,function(o){return a[o]})}function Zc(s,a){this._pairs=[],s&&Co(s,this,a)}const fh=Zc.prototype;fh.append=function(a,n){this._pairs.push([a,n])};fh.toString=function(a){const n=a?function(o){return a.call(this,o,rf)}:rf;return this._pairs.map(function(l){return n(l[0])+"="+n(l[1])},"").join("&")};function Z0(s){return encodeURIComponent(s).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function hh(s,a,n){if(!a)return s;const o=n&&n.encode||Z0,l=de.isFunction(n)?{serialize:n}:n,d=l&&l.serialize;let u;if(d?u=d(a,l):u=de.isURLSearchParams(a)?a.toString():new Zc(a,l).toString(o),u){const f=s.indexOf("#");f!==-1&&(s=s.slice(0,f)),s+=(s.indexOf("?")===-1?"?":"&")+u}return s}class nf{constructor(){this.handlers=[]}use(a,n,o){return this.handlers.push({fulfilled:a,rejected:n,synchronous:o?o.synchronous:!1,runWhen:o?o.runWhen:null}),this.handlers.length-1}eject(a){this.handlers[a]&&(this.handlers[a]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(a){de.forEach(this.handlers,function(o){o!==null&&a(o)})}}const Qc={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Q0=typeof URLSearchParams<"u"?URLSearchParams:Zc,J0=typeof FormData<"u"?FormData:null,ev=typeof Blob<"u"?Blob:null,tv={isBrowser:!0,classes:{URLSearchParams:Q0,FormData:J0,Blob:ev},protocols:["http","https","file","blob","url","data"]},Jc=typeof window<"u"&&typeof document<"u",Bc=typeof navigator=="object"&&navigator||void 0,rv=Jc&&(!Bc||["ReactNative","NativeScript","NS"].indexOf(Bc.product)<0),nv=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",av=Jc&&window.location.href||"http://localhost",sv=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Jc,hasStandardBrowserEnv:rv,hasStandardBrowserWebWorkerEnv:nv,navigator:Bc,origin:av},Symbol.toStringTag,{value:"Module"})),Wt={...sv,...tv};function iv(s,a){return Co(s,new Wt.classes.URLSearchParams,{visitor:function(n,o,l,d){return Wt.isNode&&de.isBuffer(n)?(this.append(o,n.toString("base64")),!1):d.defaultVisitor.apply(this,arguments)},...a})}function ov(s){return de.matchAll(/\w+|\[(\w*)]/g,s).map(a=>a[0]==="[]"?"":a[1]||a[0])}function lv(s){const a={},n=Object.keys(s);let o;const l=n.length;let d;for(o=0;o<l;o++)d=n[o],a[d]=s[d];return a}function mh(s){function a(n,o,l,d){let u=n[d++];if(u==="__proto__")return!0;const f=Number.isFinite(+u),h=d>=n.length;return u=!u&&de.isArray(l)?l.length:u,h?(de.hasOwnProp(l,u)?l[u]=[l[u],o]:l[u]=o,!f):((!l[u]||!de.isObject(l[u]))&&(l[u]=[]),a(n,o,l[u],d)&&de.isArray(l[u])&&(l[u]=lv(l[u])),!f)}if(de.isFormData(s)&&de.isFunction(s.entries)){const n={};return de.forEachEntry(s,(o,l)=>{a(ov(o),l,n,0)}),n}return null}function cv(s,a,n){if(de.isString(s))try{return(a||JSON.parse)(s),de.trim(s)}catch(o){if(o.name!=="SyntaxError")throw o}return(n||JSON.stringify)(s)}const Bs={transitional:Qc,adapter:["xhr","http","fetch"],transformRequest:[function(a,n){const o=n.getContentType()||"",l=o.indexOf("application/json")>-1,d=de.isObject(a);if(d&&de.isHTMLForm(a)&&(a=new FormData(a)),de.isFormData(a))return l?JSON.stringify(mh(a)):a;if(de.isArrayBuffer(a)||de.isBuffer(a)||de.isStream(a)||de.isFile(a)||de.isBlob(a)||de.isReadableStream(a))return a;if(de.isArrayBufferView(a))return a.buffer;if(de.isURLSearchParams(a))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),a.toString();let f;if(d){if(o.indexOf("application/x-www-form-urlencoded")>-1)return iv(a,this.formSerializer).toString();if((f=de.isFileList(a))||o.indexOf("multipart/form-data")>-1){const h=this.env&&this.env.FormData;return Co(f?{"files[]":a}:a,h&&new h,this.formSerializer)}}return d||l?(n.setContentType("application/json",!1),cv(a)):a}],transformResponse:[function(a){const n=this.transitional||Bs.transitional,o=n&&n.forcedJSONParsing,l=this.responseType==="json";if(de.isResponse(a)||de.isReadableStream(a))return a;if(a&&de.isString(a)&&(o&&!this.responseType||l)){const u=!(n&&n.silentJSONParsing)&&l;try{return JSON.parse(a,this.parseReviver)}catch(f){if(u)throw f.name==="SyntaxError"?Ue.from(f,Ue.ERR_BAD_RESPONSE,this,null,this.response):f}}return a}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Wt.classes.FormData,Blob:Wt.classes.Blob},validateStatus:function(a){return a>=200&&a<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};de.forEach(["delete","get","head","post","put","patch"],s=>{Bs.headers[s]={}});const dv=de.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),uv=s=>{const a={};let n,o,l;return s&&s.split(`
`).forEach(function(u){l=u.indexOf(":"),n=u.substring(0,l).trim().toLowerCase(),o=u.substring(l+1).trim(),!(!n||a[n]&&dv[n])&&(n==="set-cookie"?a[n]?a[n].push(o):a[n]=[o]:a[n]=a[n]?a[n]+", "+o:o)}),a},af=Symbol("internals");function Ns(s){return s&&String(s).trim().toLowerCase()}function io(s){return s===!1||s==null?s:de.isArray(s)?s.map(io):String(s)}function pv(s){const a=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let o;for(;o=n.exec(s);)a[o[1]]=o[2];return a}const fv=s=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(s.trim());function wc(s,a,n,o,l){if(de.isFunction(o))return o.call(this,a,n);if(l&&(a=n),!!de.isString(a)){if(de.isString(o))return a.indexOf(o)!==-1;if(de.isRegExp(o))return o.test(a)}}function hv(s){return s.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(a,n,o)=>n.toUpperCase()+o)}function mv(s,a){const n=de.toCamelCase(" "+a);["get","set","has"].forEach(o=>{Object.defineProperty(s,o+n,{value:function(l,d,u){return this[o].call(this,a,l,d,u)},configurable:!0})})}let rr=class{constructor(a){a&&this.set(a)}set(a,n,o){const l=this;function d(f,h,b){const j=Ns(h);if(!j)throw new Error("header name must be a non-empty string");const N=de.findKey(l,j);(!N||l[N]===void 0||b===!0||b===void 0&&l[N]!==!1)&&(l[N||h]=io(f))}const u=(f,h)=>de.forEach(f,(b,j)=>d(b,j,h));if(de.isPlainObject(a)||a instanceof this.constructor)u(a,n);else if(de.isString(a)&&(a=a.trim())&&!fv(a))u(uv(a),n);else if(de.isObject(a)&&de.isIterable(a)){let f={},h,b;for(const j of a){if(!de.isArray(j))throw TypeError("Object iterator must return a key-value pair");f[b=j[0]]=(h=f[b])?de.isArray(h)?[...h,j[1]]:[h,j[1]]:j[1]}u(f,n)}else a!=null&&d(n,a,o);return this}get(a,n){if(a=Ns(a),a){const o=de.findKey(this,a);if(o){const l=this[o];if(!n)return l;if(n===!0)return pv(l);if(de.isFunction(n))return n.call(this,l,o);if(de.isRegExp(n))return n.exec(l);throw new TypeError("parser must be boolean|regexp|function")}}}has(a,n){if(a=Ns(a),a){const o=de.findKey(this,a);return!!(o&&this[o]!==void 0&&(!n||wc(this,this[o],o,n)))}return!1}delete(a,n){const o=this;let l=!1;function d(u){if(u=Ns(u),u){const f=de.findKey(o,u);f&&(!n||wc(o,o[f],f,n))&&(delete o[f],l=!0)}}return de.isArray(a)?a.forEach(d):d(a),l}clear(a){const n=Object.keys(this);let o=n.length,l=!1;for(;o--;){const d=n[o];(!a||wc(this,this[d],d,a,!0))&&(delete this[d],l=!0)}return l}normalize(a){const n=this,o={};return de.forEach(this,(l,d)=>{const u=de.findKey(o,d);if(u){n[u]=io(l),delete n[d];return}const f=a?hv(d):String(d).trim();f!==d&&delete n[d],n[f]=io(l),o[f]=!0}),this}concat(...a){return this.constructor.concat(this,...a)}toJSON(a){const n=Object.create(null);return de.forEach(this,(o,l)=>{o!=null&&o!==!1&&(n[l]=a&&de.isArray(o)?o.join(", "):o)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([a,n])=>a+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(a){return a instanceof this?a:new this(a)}static concat(a,...n){const o=new this(a);return n.forEach(l=>o.set(l)),o}static accessor(a){const o=(this[af]=this[af]={accessors:{}}).accessors,l=this.prototype;function d(u){const f=Ns(u);o[f]||(mv(l,u),o[f]=!0)}return de.isArray(a)?a.forEach(d):d(a),this}};rr.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);de.reduceDescriptors(rr.prototype,({value:s},a)=>{let n=a[0].toUpperCase()+a.slice(1);return{get:()=>s,set(o){this[n]=o}}});de.freezeMethods(rr);function kc(s,a){const n=this||Bs,o=a||n,l=rr.from(o.headers);let d=o.data;return de.forEach(s,function(f){d=f.call(n,d,l.normalize(),a?a.status:void 0)}),l.normalize(),d}function gh(s){return!!(s&&s.__CANCEL__)}let Ws=class extends Ue{constructor(a,n,o){super(a??"canceled",Ue.ERR_CANCELED,n,o),this.name="CanceledError",this.__CANCEL__=!0}};function xh(s,a,n){const o=n.config.validateStatus;!n.status||!o||o(n.status)?s(n):a(new Ue("Request failed with status code "+n.status,[Ue.ERR_BAD_REQUEST,Ue.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function gv(s){const a=/^([-+\w]{1,25})(:?\/\/|:)/.exec(s);return a&&a[1]||""}function xv(s,a){s=s||10;const n=new Array(s),o=new Array(s);let l=0,d=0,u;return a=a!==void 0?a:1e3,function(h){const b=Date.now(),j=o[d];u||(u=b),n[l]=h,o[l]=b;let N=d,w=0;for(;N!==l;)w+=n[N++],N=N%s;if(l=(l+1)%s,l===d&&(d=(d+1)%s),b-u<a)return;const _=j&&b-j;return _?Math.round(w*1e3/_):void 0}}function vv(s,a){let n=0,o=1e3/a,l,d;const u=(b,j=Date.now())=>{n=j,l=null,d&&(clearTimeout(d),d=null),s(...b)};return[(...b)=>{const j=Date.now(),N=j-n;N>=o?u(b,j):(l=b,d||(d=setTimeout(()=>{d=null,u(l)},o-N)))},()=>l&&u(l)]}const go=(s,a,n=3)=>{let o=0;const l=xv(50,250);return vv(d=>{const u=d.loaded,f=d.lengthComputable?d.total:void 0,h=u-o,b=l(h),j=u<=f;o=u;const N={loaded:u,total:f,progress:f?u/f:void 0,bytes:h,rate:b||void 0,estimated:b&&f&&j?(f-u)/b:void 0,event:d,lengthComputable:f!=null,[a?"download":"upload"]:!0};s(N)},n)},sf=(s,a)=>{const n=s!=null;return[o=>a[0]({lengthComputable:n,total:s,loaded:o}),a[1]]},of=s=>(...a)=>de.asap(()=>s(...a)),bv=Wt.hasStandardBrowserEnv?((s,a)=>n=>(n=new URL(n,Wt.origin),s.protocol===n.protocol&&s.host===n.host&&(a||s.port===n.port)))(new URL(Wt.origin),Wt.navigator&&/(msie|trident)/i.test(Wt.navigator.userAgent)):()=>!0,yv=Wt.hasStandardBrowserEnv?{write(s,a,n,o,l,d,u){if(typeof document>"u")return;const f=[`${s}=${encodeURIComponent(a)}`];de.isNumber(n)&&f.push(`expires=${new Date(n).toUTCString()}`),de.isString(o)&&f.push(`path=${o}`),de.isString(l)&&f.push(`domain=${l}`),d===!0&&f.push("secure"),de.isString(u)&&f.push(`SameSite=${u}`),document.cookie=f.join("; ")},read(s){if(typeof document>"u")return null;const a=document.cookie.match(new RegExp("(?:^|; )"+s+"=([^;]*)"));return a?decodeURIComponent(a[1]):null},remove(s){this.write(s,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function jv(s){return typeof s!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(s)}function wv(s,a){return a?s.replace(/\/?\/$/,"")+"/"+a.replace(/^\/+/,""):s}function vh(s,a,n){let o=!jv(a);return s&&(o||n==!1)?wv(s,a):a}const lf=s=>s instanceof rr?{...s}:s;function ra(s,a){a=a||{};const n={};function o(b,j,N,w){return de.isPlainObject(b)&&de.isPlainObject(j)?de.merge.call({caseless:w},b,j):de.isPlainObject(j)?de.merge({},j):de.isArray(j)?j.slice():j}function l(b,j,N,w){if(de.isUndefined(j)){if(!de.isUndefined(b))return o(void 0,b,N,w)}else return o(b,j,N,w)}function d(b,j){if(!de.isUndefined(j))return o(void 0,j)}function u(b,j){if(de.isUndefined(j)){if(!de.isUndefined(b))return o(void 0,b)}else return o(void 0,j)}function f(b,j,N){if(N in a)return o(b,j);if(N in s)return o(void 0,b)}const h={url:d,method:d,data:d,baseURL:u,transformRequest:u,transformResponse:u,paramsSerializer:u,timeout:u,timeoutMessage:u,withCredentials:u,withXSRFToken:u,adapter:u,responseType:u,xsrfCookieName:u,xsrfHeaderName:u,onUploadProgress:u,onDownloadProgress:u,decompress:u,maxContentLength:u,maxBodyLength:u,beforeRedirect:u,transport:u,httpAgent:u,httpsAgent:u,cancelToken:u,socketPath:u,responseEncoding:u,validateStatus:f,headers:(b,j,N)=>l(lf(b),lf(j),N,!0)};return de.forEach(Object.keys({...s,...a}),function(j){if(j==="__proto__"||j==="constructor"||j==="prototype")return;const N=de.hasOwnProp(h,j)?h[j]:l,w=N(s[j],a[j],j);de.isUndefined(w)&&N!==f||(n[j]=w)}),n}const bh=s=>{const a=ra({},s);let{data:n,withXSRFToken:o,xsrfHeaderName:l,xsrfCookieName:d,headers:u,auth:f}=a;if(a.headers=u=rr.from(u),a.url=hh(vh(a.baseURL,a.url,a.allowAbsoluteUrls),s.params,s.paramsSerializer),f&&u.set("Authorization","Basic "+btoa((f.username||"")+":"+(f.password?unescape(encodeURIComponent(f.password)):""))),de.isFormData(n)){if(Wt.hasStandardBrowserEnv||Wt.hasStandardBrowserWebWorkerEnv)u.setContentType(void 0);else if(de.isFunction(n.getHeaders)){const h=n.getHeaders(),b=["content-type","content-length"];Object.entries(h).forEach(([j,N])=>{b.includes(j.toLowerCase())&&u.set(j,N)})}}if(Wt.hasStandardBrowserEnv&&(o&&de.isFunction(o)&&(o=o(a)),o||o!==!1&&bv(a.url))){const h=l&&d&&yv.read(d);h&&u.set(l,h)}return a},kv=typeof XMLHttpRequest<"u",Nv=kv&&function(s){return new Promise(function(n,o){const l=bh(s);let d=l.data;const u=rr.from(l.headers).normalize();let{responseType:f,onUploadProgress:h,onDownloadProgress:b}=l,j,N,w,_,v;function x(){_&&_(),v&&v(),l.cancelToken&&l.cancelToken.unsubscribe(j),l.signal&&l.signal.removeEventListener("abort",j)}let g=new XMLHttpRequest;g.open(l.method.toUpperCase(),l.url,!0),g.timeout=l.timeout;function S(){if(!g)return;const T=rr.from("getAllResponseHeaders"in g&&g.getAllResponseHeaders()),A={data:!f||f==="text"||f==="json"?g.responseText:g.response,status:g.status,statusText:g.statusText,headers:T,config:s,request:g};xh(function(B){n(B),x()},function(B){o(B),x()},A),g=null}"onloadend"in g?g.onloadend=S:g.onreadystatechange=function(){!g||g.readyState!==4||g.status===0&&!(g.responseURL&&g.responseURL.indexOf("file:")===0)||setTimeout(S)},g.onabort=function(){g&&(o(new Ue("Request aborted",Ue.ECONNABORTED,s,g)),g=null)},g.onerror=function(E){const A=E&&E.message?E.message:"Network Error",D=new Ue(A,Ue.ERR_NETWORK,s,g);D.event=E||null,o(D),g=null},g.ontimeout=function(){let E=l.timeout?"timeout of "+l.timeout+"ms exceeded":"timeout exceeded";const A=l.transitional||Qc;l.timeoutErrorMessage&&(E=l.timeoutErrorMessage),o(new Ue(E,A.clarifyTimeoutError?Ue.ETIMEDOUT:Ue.ECONNABORTED,s,g)),g=null},d===void 0&&u.setContentType(null),"setRequestHeader"in g&&de.forEach(u.toJSON(),function(E,A){g.setRequestHeader(A,E)}),de.isUndefined(l.withCredentials)||(g.withCredentials=!!l.withCredentials),f&&f!=="json"&&(g.responseType=l.responseType),b&&([w,v]=go(b,!0),g.addEventListener("progress",w)),h&&g.upload&&([N,_]=go(h),g.upload.addEventListener("progress",N),g.upload.addEventListener("loadend",_)),(l.cancelToken||l.signal)&&(j=T=>{g&&(o(!T||T.type?new Ws(null,s,g):T),g.abort(),g=null)},l.cancelToken&&l.cancelToken.subscribe(j),l.signal&&(l.signal.aborted?j():l.signal.addEventListener("abort",j)));const z=gv(l.url);if(z&&Wt.protocols.indexOf(z)===-1){o(new Ue("Unsupported protocol "+z+":",Ue.ERR_BAD_REQUEST,s));return}g.send(d||null)})},Sv=(s,a)=>{const{length:n}=s=s?s.filter(Boolean):[];if(a||n){let o=new AbortController,l;const d=function(b){if(!l){l=!0,f();const j=b instanceof Error?b:this.reason;o.abort(j instanceof Ue?j:new Ws(j instanceof Error?j.message:j))}};let u=a&&setTimeout(()=>{u=null,d(new Ue(`timeout of ${a}ms exceeded`,Ue.ETIMEDOUT))},a);const f=()=>{s&&(u&&clearTimeout(u),u=null,s.forEach(b=>{b.unsubscribe?b.unsubscribe(d):b.removeEventListener("abort",d)}),s=null)};s.forEach(b=>b.addEventListener("abort",d));const{signal:h}=o;return h.unsubscribe=()=>de.asap(f),h}},_v=function*(s,a){let n=s.byteLength;if(n<a){yield s;return}let o=0,l;for(;o<n;)l=o+a,yield s.slice(o,l),o=l},Cv=async function*(s,a){for await(const n of Ev(s))yield*_v(n,a)},Ev=async function*(s){if(s[Symbol.asyncIterator]){yield*s;return}const a=s.getReader();try{for(;;){const{done:n,value:o}=await a.read();if(n)break;yield o}}finally{await a.cancel()}},cf=(s,a,n,o)=>{const l=Cv(s,a);let d=0,u,f=h=>{u||(u=!0,o&&o(h))};return new ReadableStream({async pull(h){try{const{done:b,value:j}=await l.next();if(b){f(),h.close();return}let N=j.byteLength;if(n){let w=d+=N;n(w)}h.enqueue(new Uint8Array(j))}catch(b){throw f(b),b}},cancel(h){return f(h),l.return()}},{highWaterMark:2})},df=64*1024,{isFunction:Qi}=de,zv=(({Request:s,Response:a})=>({Request:s,Response:a}))(de.global),{ReadableStream:uf,TextEncoder:pf}=de.global,ff=(s,...a)=>{try{return!!s(...a)}catch{return!1}},Pv=s=>{s=de.merge.call({skipUndefined:!0},zv,s);const{fetch:a,Request:n,Response:o}=s,l=a?Qi(a):typeof fetch=="function",d=Qi(n),u=Qi(o);if(!l)return!1;const f=l&&Qi(uf),h=l&&(typeof pf=="function"?(v=>x=>v.encode(x))(new pf):async v=>new Uint8Array(await new n(v).arrayBuffer())),b=d&&f&&ff(()=>{let v=!1;const x=new n(Wt.origin,{body:new uf,method:"POST",get duplex(){return v=!0,"half"}}).headers.has("Content-Type");return v&&!x}),j=u&&f&&ff(()=>de.isReadableStream(new o("").body)),N={stream:j&&(v=>v.body)};l&&["text","arrayBuffer","blob","formData","stream"].forEach(v=>{!N[v]&&(N[v]=(x,g)=>{let S=x&&x[v];if(S)return S.call(x);throw new Ue(`Response type '${v}' is not supported`,Ue.ERR_NOT_SUPPORT,g)})});const w=async v=>{if(v==null)return 0;if(de.isBlob(v))return v.size;if(de.isSpecCompliantForm(v))return(await new n(Wt.origin,{method:"POST",body:v}).arrayBuffer()).byteLength;if(de.isArrayBufferView(v)||de.isArrayBuffer(v))return v.byteLength;if(de.isURLSearchParams(v)&&(v=v+""),de.isString(v))return(await h(v)).byteLength},_=async(v,x)=>{const g=de.toFiniteNumber(v.getContentLength());return g??w(x)};return async v=>{let{url:x,method:g,data:S,signal:z,cancelToken:T,timeout:E,onDownloadProgress:A,onUploadProgress:D,responseType:B,headers:V,withCredentials:U="same-origin",fetchOptions:G}=bh(v),fe=a||fetch;B=B?(B+"").toLowerCase():"text";let L=Sv([z,T&&T.toAbortSignal()],E),H=null;const k=L&&L.unsubscribe&&(()=>{L.unsubscribe()});let J;try{if(D&&b&&g!=="get"&&g!=="head"&&(J=await _(V,S))!==0){let R=new n(x,{method:"POST",body:S,duplex:"half"}),P;if(de.isFormData(S)&&(P=R.headers.get("content-type"))&&V.setContentType(P),R.body){const[W,ee]=sf(J,go(of(D)));S=cf(R.body,df,W,ee)}}de.isString(U)||(U=U?"include":"omit");const ve=d&&"credentials"in n.prototype,se={...G,signal:L,method:g.toUpperCase(),headers:V.normalize().toJSON(),body:S,duplex:"half",credentials:ve?U:void 0};H=d&&new n(x,se);let oe=await(d?fe(H,G):fe(x,se));const Q=j&&(B==="stream"||B==="response");if(j&&(A||Q&&k)){const R={};["status","statusText","headers"].forEach(te=>{R[te]=oe[te]});const P=de.toFiniteNumber(oe.headers.get("content-length")),[W,ee]=A&&sf(P,go(of(A),!0))||[];oe=new o(cf(oe.body,df,W,()=>{ee&&ee(),k&&k()}),R)}B=B||"text";let ce=await N[de.findKey(N,B)||"text"](oe,v);return!Q&&k&&k(),await new Promise((R,P)=>{xh(R,P,{data:ce,headers:rr.from(oe.headers),status:oe.status,statusText:oe.statusText,config:v,request:H})})}catch(ve){throw k&&k(),ve&&ve.name==="TypeError"&&/Load failed|fetch/i.test(ve.message)?Object.assign(new Ue("Network Error",Ue.ERR_NETWORK,v,H,ve&&ve.response),{cause:ve.cause||ve}):Ue.from(ve,ve&&ve.code,v,H,ve&&ve.response)}}},Rv=new Map,yh=s=>{let a=s&&s.env||{};const{fetch:n,Request:o,Response:l}=a,d=[o,l,n];let u=d.length,f=u,h,b,j=Rv;for(;f--;)h=d[f],b=j.get(h),b===void 0&&j.set(h,b=f?new Map:Pv(a)),j=b;return b};yh();const ed={http:Y0,xhr:Nv,fetch:{get:yh}};de.forEach(ed,(s,a)=>{if(s){try{Object.defineProperty(s,"name",{value:a})}catch{}Object.defineProperty(s,"adapterName",{value:a})}});const hf=s=>`- ${s}`,Tv=s=>de.isFunction(s)||s===null||s===!1;function Av(s,a){s=de.isArray(s)?s:[s];const{length:n}=s;let o,l;const d={};for(let u=0;u<n;u++){o=s[u];let f;if(l=o,!Tv(o)&&(l=ed[(f=String(o)).toLowerCase()],l===void 0))throw new Ue(`Unknown adapter '${f}'`);if(l&&(de.isFunction(l)||(l=l.get(a))))break;d[f||"#"+u]=l}if(!l){const u=Object.entries(d).map(([h,b])=>`adapter ${h} `+(b===!1?"is not supported by the environment":"is not available in the build"));let f=n?u.length>1?`since :
`+u.map(hf).join(`
`):" "+hf(u[0]):"as no adapter specified";throw new Ue("There is no suitable adapter to dispatch the request "+f,"ERR_NOT_SUPPORT")}return l}const jh={getAdapter:Av,adapters:ed};function Nc(s){if(s.cancelToken&&s.cancelToken.throwIfRequested(),s.signal&&s.signal.aborted)throw new Ws(null,s)}function mf(s){return Nc(s),s.headers=rr.from(s.headers),s.data=kc.call(s,s.transformRequest),["post","put","patch"].indexOf(s.method)!==-1&&s.headers.setContentType("application/x-www-form-urlencoded",!1),jh.getAdapter(s.adapter||Bs.adapter,s)(s).then(function(o){return Nc(s),o.data=kc.call(s,s.transformResponse,o),o.headers=rr.from(o.headers),o},function(o){return gh(o)||(Nc(s),o&&o.response&&(o.response.data=kc.call(s,s.transformResponse,o.response),o.response.headers=rr.from(o.response.headers))),Promise.reject(o)})}const wh="1.13.5",Eo={};["object","boolean","number","function","string","symbol"].forEach((s,a)=>{Eo[s]=function(o){return typeof o===s||"a"+(a<1?"n ":" ")+s}});const gf={};Eo.transitional=function(a,n,o){function l(d,u){return"[Axios v"+wh+"] Transitional option '"+d+"'"+u+(o?". "+o:"")}return(d,u,f)=>{if(a===!1)throw new Ue(l(u," has been removed"+(n?" in "+n:"")),Ue.ERR_DEPRECATED);return n&&!gf[u]&&(gf[u]=!0,console.warn(l(u," has been deprecated since v"+n+" and will be removed in the near future"))),a?a(d,u,f):!0}};Eo.spelling=function(a){return(n,o)=>(console.warn(`${o} is likely a misspelling of ${a}`),!0)};function Lv(s,a,n){if(typeof s!="object")throw new Ue("options must be an object",Ue.ERR_BAD_OPTION_VALUE);const o=Object.keys(s);let l=o.length;for(;l-- >0;){const d=o[l],u=a[d];if(u){const f=s[d],h=f===void 0||u(f,d,s);if(h!==!0)throw new Ue("option "+d+" must be "+h,Ue.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new Ue("Unknown option "+d,Ue.ERR_BAD_OPTION)}}const oo={assertOptions:Lv,validators:Eo},wr=oo.validators;let ea=class{constructor(a){this.defaults=a||{},this.interceptors={request:new nf,response:new nf}}async request(a,n){try{return await this._request(a,n)}catch(o){if(o instanceof Error){let l={};Error.captureStackTrace?Error.captureStackTrace(l):l=new Error;const d=l.stack?l.stack.replace(/^.+\n/,""):"";try{o.stack?d&&!String(o.stack).endsWith(d.replace(/^.+\n.+\n/,""))&&(o.stack+=`
`+d):o.stack=d}catch{}}throw o}}_request(a,n){typeof a=="string"?(n=n||{},n.url=a):n=a||{},n=ra(this.defaults,n);const{transitional:o,paramsSerializer:l,headers:d}=n;o!==void 0&&oo.assertOptions(o,{silentJSONParsing:wr.transitional(wr.boolean),forcedJSONParsing:wr.transitional(wr.boolean),clarifyTimeoutError:wr.transitional(wr.boolean),legacyInterceptorReqResOrdering:wr.transitional(wr.boolean)},!1),l!=null&&(de.isFunction(l)?n.paramsSerializer={serialize:l}:oo.assertOptions(l,{encode:wr.function,serialize:wr.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),oo.assertOptions(n,{baseUrl:wr.spelling("baseURL"),withXsrfToken:wr.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let u=d&&de.merge(d.common,d[n.method]);d&&de.forEach(["delete","get","head","post","put","patch","common"],v=>{delete d[v]}),n.headers=rr.concat(u,d);const f=[];let h=!0;this.interceptors.request.forEach(function(x){if(typeof x.runWhen=="function"&&x.runWhen(n)===!1)return;h=h&&x.synchronous;const g=n.transitional||Qc;g&&g.legacyInterceptorReqResOrdering?f.unshift(x.fulfilled,x.rejected):f.push(x.fulfilled,x.rejected)});const b=[];this.interceptors.response.forEach(function(x){b.push(x.fulfilled,x.rejected)});let j,N=0,w;if(!h){const v=[mf.bind(this),void 0];for(v.unshift(...f),v.push(...b),w=v.length,j=Promise.resolve(n);N<w;)j=j.then(v[N++],v[N++]);return j}w=f.length;let _=n;for(;N<w;){const v=f[N++],x=f[N++];try{_=v(_)}catch(g){x.call(this,g);break}}try{j=mf.call(this,_)}catch(v){return Promise.reject(v)}for(N=0,w=b.length;N<w;)j=j.then(b[N++],b[N++]);return j}getUri(a){a=ra(this.defaults,a);const n=vh(a.baseURL,a.url,a.allowAbsoluteUrls);return hh(n,a.params,a.paramsSerializer)}};de.forEach(["delete","get","head","options"],function(a){ea.prototype[a]=function(n,o){return this.request(ra(o||{},{method:a,url:n,data:(o||{}).data}))}});de.forEach(["post","put","patch"],function(a){function n(o){return function(d,u,f){return this.request(ra(f||{},{method:a,headers:o?{"Content-Type":"multipart/form-data"}:{},url:d,data:u}))}}ea.prototype[a]=n(),ea.prototype[a+"Form"]=n(!0)});let Iv=class kh{constructor(a){if(typeof a!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(d){n=d});const o=this;this.promise.then(l=>{if(!o._listeners)return;let d=o._listeners.length;for(;d-- >0;)o._listeners[d](l);o._listeners=null}),this.promise.then=l=>{let d;const u=new Promise(f=>{o.subscribe(f),d=f}).then(l);return u.cancel=function(){o.unsubscribe(d)},u},a(function(d,u,f){o.reason||(o.reason=new Ws(d,u,f),n(o.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(a){if(this.reason){a(this.reason);return}this._listeners?this._listeners.push(a):this._listeners=[a]}unsubscribe(a){if(!this._listeners)return;const n=this._listeners.indexOf(a);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const a=new AbortController,n=o=>{a.abort(o)};return this.subscribe(n),a.signal.unsubscribe=()=>this.unsubscribe(n),a.signal}static source(){let a;return{token:new kh(function(l){a=l}),cancel:a}}};function Ov(s){return function(n){return s.apply(null,n)}}function Fv(s){return de.isObject(s)&&s.isAxiosError===!0}const Wc={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Wc).forEach(([s,a])=>{Wc[a]=s});function Nh(s){const a=new ea(s),n=nh(ea.prototype.request,a);return de.extend(n,ea.prototype,a,{allOwnKeys:!0}),de.extend(n,a,null,{allOwnKeys:!0}),n.create=function(l){return Nh(ra(s,l))},n}const ht=Nh(Bs);ht.Axios=ea;ht.CanceledError=Ws;ht.CancelToken=Iv;ht.isCancel=gh;ht.VERSION=wh;ht.toFormData=Co;ht.AxiosError=Ue;ht.Cancel=ht.CanceledError;ht.all=function(a){return Promise.all(a)};ht.spread=Ov;ht.isAxiosError=Fv;ht.mergeConfig=ra;ht.AxiosHeaders=rr;ht.formToJSON=s=>mh(de.isHTMLForm(s)?new FormData(s):s);ht.getAdapter=jh.getAdapter;ht.HttpStatusCode=Wc;ht.default=ht;const{Axios:G1,AxiosError:Y1,CanceledError:K1,isCancel:X1,CancelToken:Z1,VERSION:Q1,all:J1,Cancel:e2,isAxiosError:t2,spread:r2,toFormData:n2,AxiosHeaders:a2,HttpStatusCode:s2,formToJSON:i2,getAdapter:o2,mergeConfig:l2}=ht,Et="http://localhost/gs-Job/backend/api",qe=ht.create({baseURL:Et});qe.interceptors.request.use(s=>{const a=localStorage.getItem("gs_admin_token");return a&&(s.headers.Authorization=`Bearer ${a}`),s});const Dv=s=>qe.post("/auth.php?action=login",s),xf=s=>qe.post("/auth.php?action=identify",s),Mv=s=>qe.post("/auth.php?action=send-recovery",s),Sh=s=>qe.get(`/auth.php?action=verify-reset-token&token=${s}`),_h=s=>qe.post("/auth.php?action=reset-password-with-token",s),Bv=()=>qe.get("/auth.php?action=verify"),un=()=>qe.get("/companies.php?action=list"),Wv=s=>qe.post("/companies.php?action=create",s,{headers:{"Content-Type":"multipart/form-data"}}),Uv=s=>qe.post("/companies.php?action=update",s,{headers:{"Content-Type":"multipart/form-data"}}),$v=s=>qe.post("/companies.php?action=delete",s),Ch=()=>qe.get("/locations.php?action=list"),Vv=s=>qe.post("/locations.php?action=create",s),Hv=s=>qe.post("/locations.php?action=update",s),qv=s=>qe.post("/locations.php?action=delete",s),Eh=(s={})=>{const a=new URLSearchParams(s).toString();return qe.get(`/vacancies.php?action=list&${a}`)},zh=s=>qe.get(`/vacancies.php?action=get&id=${s}`),zo=(s={})=>{const a=new URLSearchParams(s).toString();return qe.get(`/vacancies.php?action=all&${a}`)},Gv=s=>qe.post("/vacancies.php?action=create",s),Yv=s=>qe.post("/vacancies.php?action=update",s),Kv=s=>qe.post("/vacancies.php?action=delete",s),Xv=s=>qe.post("/vacancies.php?action=assign_candidate",s),Zv=s=>qe.post("/applications.php?action=apply",s,{headers:{"Content-Type":"multipart/form-data"}}),Ph=(s={})=>{const a=new URLSearchParams(s).toString();return qe.get(`/applications.php?action=list&${a}`)},vf=s=>qe.post("/applications.php?action=update_status",s),Qv=s=>qe.post("/applications.php?action=send_interview",s),Jv=s=>{const a=new FormData;return Object.entries(s).forEach(([n,o])=>a.append(n,o)),qe.post("/applications.php",a,{params:{action:"delete"}})},eb=s=>{const a=new FormData;return s.ids&&Array.isArray(s.ids)&&s.ids.forEach(n=>a.append("ids[]",n)),qe.post("/applications.php",a,{params:{action:"bulk_delete"}})},tb=(s={})=>{const a=new URLSearchParams(s).toString();return qe.get(`/applications.php?action=get_suggestions&${a}`)},rb=(s={})=>{const a=new URLSearchParams(s).toString();return qe.get(`/applications.php?action=get_candidate_count&${a}`)},nb=(s={})=>{const a=new URLSearchParams(s).toString();return qe.get(`/applications.php?action=get_matching_candidates&${a}`)},ab=(s={})=>{const a=new URLSearchParams(s).toString();return qe.get(`/applications.php?action=get_talent_pool&${a}`)},bf=s=>{const a=new FormData;return Object.entries(s).forEach(([n,o])=>a.append(n,o)),qe.post("/applications.php",a,{params:{action:"update_candidate_tags"}})},sb=(s={})=>{const a=new URLSearchParams(s).toString();return qe.get(`/applications.php?action=export&${a}`,{responseType:"blob"})},ib=s=>{const a=new FormData;return Object.entries(s).forEach(([n,o])=>a.append(n,o)),qe.post("/applications.php",a,{params:{action:"block_candidate"}})},ob=s=>{const a=new FormData;return Object.entries(s).forEach(([n,o])=>a.append(n,o)),qe.post("/applications.php",a,{params:{action:"unblock_candidate"}})},Rh=()=>qe.get("/applications.php?action=stats"),lb=()=>qe.get("/admins.php?action=list"),cb=s=>qe.post("/admins.php?action=create",s),db=s=>qe.post("/admins.php?action=update",s),ub=s=>qe.post("/admins.php?action=delete",s),pb=s=>qe.post("/admins.php?action=reset-password",s),Th=["O/L","A/L","Diploma","Bachelors Degree","Masters Degree","PhD","Professional Certification"],fb=["Full-Time","Part-Time","Contract","Internship"],on=s=>s?new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"",yf=s=>s?new Date(s).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}):"",Hr=s=>{const a=new Date(s)-new Date;return Math.max(0,Math.ceil(a/(1e3*60*60*24)))};var Ah={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},jf=Xe.createContext&&Xe.createContext(Ah),hb=["attr","size","title"];function mb(s,a){if(s==null)return{};var n=gb(s,a),o,l;if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(s);for(l=0;l<d.length;l++)o=d[l],!(a.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(s,o)&&(n[o]=s[o])}return n}function gb(s,a){if(s==null)return{};var n={};for(var o in s)if(Object.prototype.hasOwnProperty.call(s,o)){if(a.indexOf(o)>=0)continue;n[o]=s[o]}return n}function xo(){return xo=Object.assign?Object.assign.bind():function(s){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(s[o]=n[o])}return s},xo.apply(this,arguments)}function wf(s,a){var n=Object.keys(s);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(s);a&&(o=o.filter(function(l){return Object.getOwnPropertyDescriptor(s,l).enumerable})),n.push.apply(n,o)}return n}function vo(s){for(var a=1;a<arguments.length;a++){var n=arguments[a]!=null?arguments[a]:{};a%2?wf(Object(n),!0).forEach(function(o){xb(s,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(n)):wf(Object(n)).forEach(function(o){Object.defineProperty(s,o,Object.getOwnPropertyDescriptor(n,o))})}return s}function xb(s,a,n){return a=vb(a),a in s?Object.defineProperty(s,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):s[a]=n,s}function vb(s){var a=bb(s,"string");return typeof a=="symbol"?a:a+""}function bb(s,a){if(typeof s!="object"||!s)return s;var n=s[Symbol.toPrimitive];if(n!==void 0){var o=n.call(s,a);if(typeof o!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(a==="string"?String:Number)(s)}function Lh(s){return s&&s.map((a,n)=>Xe.createElement(a.tag,vo({key:n},a.attr),Lh(a.child)))}function Oe(s){return a=>Xe.createElement(yb,xo({attr:vo({},s.attr)},a),Lh(s.child))}function yb(s){var a=n=>{var{attr:o,size:l,title:d}=s,u=mb(s,hb),f=l||n.size||"1em",h;return n.className&&(h=n.className),s.className&&(h=(h?h+" ":"")+s.className),Xe.createElement("svg",xo({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,o,u,{className:h,style:vo(vo({color:s.color||n.color},n.style),s.style),height:f,width:f,xmlns:"http://www.w3.org/2000/svg"}),d&&Xe.createElement("title",null,d),s.children)};return jf!==void 0?Xe.createElement(jf.Consumer,null,n=>a(n)):a(Ah)}function Po(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"22 12 18 12 15 21 9 3 6 12 2 12"},child:[]}]})(s)}function Lr(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"12",y1:"8",x2:"12",y2:"12"},child:[]},{tag:"line",attr:{x1:"12",y1:"16",x2:"12.01",y2:"16"},child:[]}]})(s)}function Gr(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"19",y1:"12",x2:"5",y2:"12"},child:[]},{tag:"polyline",attr:{points:"12 19 5 12 12 5"},child:[]}]})(s)}function na(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"},child:[]},{tag:"polyline",attr:{points:"12 5 19 12 12 19"},child:[]}]})(s)}function td(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"8",r:"7"},child:[]},{tag:"polyline",attr:{points:"8.21 13.89 7 23 12 20 17 23 15.79 13.88"},child:[]}]})(s)}function Ih(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"20",x2:"18",y2:"10"},child:[]},{tag:"line",attr:{x1:"12",y1:"20",x2:"12",y2:"4"},child:[]},{tag:"line",attr:{x1:"6",y1:"20",x2:"6",y2:"14"},child:[]}]})(s)}function jb(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"20",x2:"12",y2:"10"},child:[]},{tag:"line",attr:{x1:"18",y1:"20",x2:"18",y2:"4"},child:[]},{tag:"line",attr:{x1:"6",y1:"20",x2:"6",y2:"16"},child:[]}]})(s)}function Oh(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"},child:[]},{tag:"path",attr:{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"},child:[]}]})(s)}function At(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"2",y:"7",width:"20",height:"14",rx:"2",ry:"2"},child:[]},{tag:"path",attr:{d:"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"},child:[]}]})(s)}function qt(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"},child:[]},{tag:"line",attr:{x1:"16",y1:"2",x2:"16",y2:"6"},child:[]},{tag:"line",attr:{x1:"8",y1:"2",x2:"8",y2:"6"},child:[]},{tag:"line",attr:{x1:"3",y1:"10",x2:"21",y2:"10"},child:[]}]})(s)}function Tt(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"},child:[]},{tag:"polyline",attr:{points:"22 4 12 14.01 9 11.01"},child:[]}]})(s)}function lo(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"20 6 9 17 4 12"},child:[]}]})(s)}function Ro(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"15 18 9 12 15 6"},child:[]}]})(s)}function Tr(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"9 18 15 12 9 6"},child:[]}]})(s)}function ln(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"polyline",attr:{points:"12 6 12 12 16 14"},child:[]}]})(s)}function wb(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"},child:[]},{tag:"path",attr:{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"},child:[]}]})(s)}function kb(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"1",x2:"12",y2:"23"},child:[]},{tag:"path",attr:{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"},child:[]}]})(s)}function Cs(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"},child:[]},{tag:"polyline",attr:{points:"7 10 12 15 17 10"},child:[]},{tag:"line",attr:{x1:"12",y1:"15",x2:"12",y2:"3"},child:[]}]})(s)}function Rs(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"},child:[]}]})(s)}function Ia(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"},child:[]},{tag:"polyline",attr:{points:"15 3 21 3 21 9"},child:[]},{tag:"line",attr:{x1:"10",y1:"14",x2:"21",y2:"3"},child:[]}]})(s)}function kf(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"},child:[]},{tag:"circle",attr:{cx:"12",cy:"12",r:"3"},child:[]}]})(s)}function rd(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"},child:[]}]})(s)}function qr(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"},child:[]},{tag:"polyline",attr:{points:"14 2 14 8 20 8"},child:[]},{tag:"line",attr:{x1:"16",y1:"13",x2:"8",y2:"13"},child:[]},{tag:"line",attr:{x1:"16",y1:"17",x2:"8",y2:"17"},child:[]},{tag:"polyline",attr:{points:"10 9 9 9 8 9"},child:[]}]})(s)}function nd(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"},child:[]}]})(s)}function Ts(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"2",y1:"12",x2:"22",y2:"12"},child:[]},{tag:"path",attr:{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"},child:[]}]})(s)}function Nb(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"3",width:"7",height:"7"},child:[]},{tag:"rect",attr:{x:"14",y:"3",width:"7",height:"7"},child:[]},{tag:"rect",attr:{x:"14",y:"14",width:"7",height:"7"},child:[]},{tag:"rect",attr:{x:"3",y:"14",width:"7",height:"7"},child:[]}]})(s)}function Fh(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"4",y1:"9",x2:"20",y2:"9"},child:[]},{tag:"line",attr:{x1:"4",y1:"15",x2:"20",y2:"15"},child:[]},{tag:"line",attr:{x1:"10",y1:"3",x2:"8",y2:"21"},child:[]},{tag:"line",attr:{x1:"16",y1:"3",x2:"14",y2:"21"},child:[]}]})(s)}function As(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"},child:[]},{tag:"polyline",attr:{points:"9 22 9 12 15 12 15 22"},child:[]}]})(s)}function Oa(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"12",y1:"16",x2:"12",y2:"12"},child:[]},{tag:"line",attr:{x1:"12",y1:"8",x2:"12.01",y2:"8"},child:[]}]})(s)}function Nf(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"},child:[]}]})(s)}function Sb(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"12 2 2 7 12 12 22 7 12 2"},child:[]},{tag:"polyline",attr:{points:"2 17 12 22 22 17"},child:[]},{tag:"polyline",attr:{points:"2 12 12 17 22 12"},child:[]}]})(s)}function ad(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"},child:[]},{tag:"rect",attr:{x:"2",y:"9",width:"4",height:"12"},child:[]},{tag:"circle",attr:{cx:"4",cy:"4",r:"2"},child:[]}]})(s)}function Fa(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"},child:[]},{tag:"path",attr:{d:"M7 11V7a5 5 0 0 1 10 0v4"},child:[]}]})(s)}function _b(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"},child:[]},{tag:"polyline",attr:{points:"16 17 21 12 16 7"},child:[]},{tag:"line",attr:{x1:"21",y1:"12",x2:"9",y2:"12"},child:[]}]})(s)}function cr(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"},child:[]},{tag:"polyline",attr:{points:"22,6 12,13 2,6"},child:[]}]})(s)}function xt(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"},child:[]},{tag:"circle",attr:{cx:"12",cy:"10",r:"3"},child:[]}]})(s)}function Ls(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"3",y1:"12",x2:"21",y2:"12"},child:[]},{tag:"line",attr:{x1:"3",y1:"6",x2:"21",y2:"6"},child:[]},{tag:"line",attr:{x1:"3",y1:"18",x2:"21",y2:"18"},child:[]}]})(s)}function Cb(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"19",y1:"5",x2:"5",y2:"19"},child:[]},{tag:"circle",attr:{cx:"6.5",cy:"6.5",r:"2.5"},child:[]},{tag:"circle",attr:{cx:"17.5",cy:"17.5",r:"2.5"},child:[]}]})(s)}function sd(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"},child:[]}]})(s)}function Da(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"5",x2:"12",y2:"19"},child:[]},{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"},child:[]}]})(s)}function Eb(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"},child:[]},{tag:"polyline",attr:{points:"17 21 17 13 7 13 7 21"},child:[]},{tag:"polyline",attr:{points:"7 3 7 8 15 8"},child:[]}]})(s)}function Ar(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"11",cy:"11",r:"8"},child:[]},{tag:"line",attr:{x1:"21",y1:"21",x2:"16.65",y2:"16.65"},child:[]}]})(s)}function Sc(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"22",y1:"2",x2:"11",y2:"13"},child:[]},{tag:"polygon",attr:{points:"22 2 15 22 11 13 2 9 22 2"},child:[]}]})(s)}function Bt(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"},child:[]}]})(s)}function Ln(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"4.93",y1:"4.93",x2:"19.07",y2:"19.07"},child:[]}]})(s)}function Dh(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"},child:[]},{tag:"line",attr:{x1:"7",y1:"7",x2:"7.01",y2:"7"},child:[]}]})(s)}function Ma(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"circle",attr:{cx:"12",cy:"12",r:"6"},child:[]},{tag:"circle",attr:{cx:"12",cy:"12",r:"2"},child:[]}]})(s)}function aa(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"3 6 5 6 21 6"},child:[]},{tag:"path",attr:{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"},child:[]},{tag:"line",attr:{x1:"10",y1:"11",x2:"10",y2:"17"},child:[]},{tag:"line",attr:{x1:"14",y1:"11",x2:"14",y2:"17"},child:[]}]})(s)}function zb(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"3 6 5 6 21 6"},child:[]},{tag:"path",attr:{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"},child:[]}]})(s)}function To(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"23 6 13.5 15.5 8.5 10.5 1 18"},child:[]},{tag:"polyline",attr:{points:"17 6 23 6 23 12"},child:[]}]})(s)}function Pb(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"16 16 12 12 8 16"},child:[]},{tag:"line",attr:{x1:"12",y1:"12",x2:"12",y2:"21"},child:[]},{tag:"path",attr:{d:"M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"},child:[]},{tag:"polyline",attr:{points:"16 16 12 12 8 16"},child:[]}]})(s)}function Rb(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"},child:[]},{tag:"polyline",attr:{points:"17 8 12 3 7 8"},child:[]},{tag:"line",attr:{x1:"12",y1:"3",x2:"12",y2:"15"},child:[]}]})(s)}function co(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"8.5",cy:"7",r:"4"},child:[]},{tag:"polyline",attr:{points:"17 11 19 13 23 9"},child:[]}]})(s)}function Tb(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"8.5",cy:"7",r:"4"},child:[]},{tag:"line",attr:{x1:"20",y1:"8",x2:"20",y2:"14"},child:[]},{tag:"line",attr:{x1:"23",y1:"11",x2:"17",y2:"11"},child:[]}]})(s)}function kr(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"12",cy:"7",r:"4"},child:[]}]})(s)}function er(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"9",cy:"7",r:"4"},child:[]},{tag:"path",attr:{d:"M23 21v-2a4 4 0 0 0-3-3.87"},child:[]},{tag:"path",attr:{d:"M16 3.13a4 4 0 0 1 0 7.75"},child:[]}]})(s)}function Ab(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"23 7 16 12 23 17 23 7"},child:[]},{tag:"rect",attr:{x:"1",y:"5",width:"15",height:"14",rx:"2",ry:"2"},child:[]}]})(s)}function Mh(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"15",y1:"9",x2:"9",y2:"15"},child:[]},{tag:"line",attr:{x1:"9",y1:"9",x2:"15",y2:"15"},child:[]}]})(s)}function ct(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"6",x2:"6",y2:"18"},child:[]},{tag:"line",attr:{x1:"6",y1:"6",x2:"18",y2:"18"},child:[]}]})(s)}function Lb(s){return Oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"},child:[]}]})(s)}const Sf=Et.replace("/api","");function Ib(){const[s,a]=F.useState([]),[n,o]=F.useState([]),[l,d]=F.useState(!0),[u,f]=F.useState(!1);Ut(),F.useEffect(()=>{(async()=>{var N,w;try{const[_,v]=await Promise.all([Eh({limit:3}),un()]);a(((N=_==null?void 0:_.data)==null?void 0:N.data)||[]),o(((w=v==null?void 0:v.data)==null?void 0:w.data)||[])}catch(_){console.error(_)}finally{d(!1)}})();const j=new IntersectionObserver(N=>{N.forEach(w=>{w.isIntersecting&&w.target.classList.add("visible")})},{threshold:.1});return document.querySelectorAll(".animate-on-scroll").forEach(N=>j.observe(N)),()=>j.disconnect()},[]);const h=()=>f(!1);return e.jsxs("div",{className:"public-page home-landing",children:[e.jsxs("nav",{className:"navbar",children:[e.jsxs(tt,{to:"/",className:"navbar-brand",children:[e.jsx("img",{src:"/gs-logo.png",alt:"George Steuart & Co",className:"navbar-logo"}),e.jsxs("div",{children:[e.jsx("div",{className:"navbar-title",children:"George Steuart"}),e.jsx("div",{className:"navbar-subtitle",children:"Careers"})]})]}),e.jsxs("div",{className:`navbar-links ${u?"open":""}`,children:[e.jsx(tt,{to:"/",className:"navbar-link active",onClick:h,children:"Home"}),e.jsx(tt,{to:"/vacancies",className:"navbar-link",onClick:h,children:"Vacancies"}),e.jsx(tt,{to:"/admin/login",className:"navbar-link btn-primary",onClick:h,children:"Admin Portal"})]}),e.jsx("button",{className:"mobile-menu-btn",onClick:()=>f(b=>!b),children:u?e.jsx(ct,{}):e.jsx(Ls,{})})]}),e.jsxs("section",{className:"hero",children:[e.jsx("div",{className:"hero-bg-accent pulse"}),e.jsx("div",{className:"hero-bg-accent-2"}),e.jsxs("div",{className:"hero-inner",children:[e.jsxs("div",{className:"hero-left",children:[e.jsxs("div",{className:"hero-badge animate-fade-in",children:[e.jsx(td,{className:"badge-icon"}),e.jsx("span",{children:"ESTD. 1835 — 190 Years of Trust"})]}),e.jsxs("h1",{className:"hero-title animate-slide-up",children:["Build Your Legacy ",e.jsx("br",{}),e.jsx("span",{className:"title-accent",children:"With George Steuart"})]}),e.jsx("p",{className:"hero-subtitle animate-slide-up",children:"Join Sri Lanka's oldest mercantile firm and be part of a 185-year heritage of excellence. We don't just offer jobs; we offer the chance to shape history."}),e.jsxs("div",{className:"hero-actions animate-slide-up",children:[e.jsxs(tt,{to:"/vacancies",className:"btn btn-gold btn-lg",children:["View Open Vacancies ",e.jsx(na,{})]}),e.jsx("a",{href:"#heritage",className:"btn btn-outline btn-lg",children:"Our Story"})]})]}),e.jsx("div",{className:"hero-right",children:e.jsxs("div",{className:"hero-image-wrapper",children:[e.jsx("div",{className:"image-frame-decoration"}),e.jsx("img",{src:"/hero-bg.jpg",alt:"George Steuart Heritage & Team",className:"hero-team-image"}),e.jsxs("div",{className:"hero-floating-card animate-float",children:[e.jsx(er,{}),e.jsxs("div",{children:[e.jsx("strong",{children:"1,500+"}),e.jsx("span",{children:"Global Team"})]})]})]})})]}),e.jsxs("div",{className:"hero-stats-bar",children:[e.jsxs("div",{className:"hero-stat",children:[e.jsxs("div",{className:"hero-stat-number",children:[s.length,"+"]}),e.jsx("div",{className:"hero-stat-label",children:"OPEN POSITIONS"})]}),e.jsx("div",{className:"hero-stat-divider"}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("div",{className:"hero-stat-number",children:n.length}),e.jsx("div",{className:"hero-stat-label",children:"SUBSIDIARIES"})]}),e.jsx("div",{className:"hero-stat-divider"}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("div",{className:"hero-stat-number",children:"185+"}),e.jsx("div",{className:"hero-stat-label",children:"YEARS OF TRUST"})]})]})]}),e.jsx("section",{className:"brand-marquee-section",children:e.jsx("div",{className:"marquee-wrapper",children:e.jsxs("div",{className:"marquee-content",children:[n.map((b,j)=>e.jsxs("div",{className:"brand-item",children:[e.jsx("img",{src:b.logo?`${Sf}/uploads/logos/${b.logo}`:"/gs-logo.png",alt:b.name,onError:N=>N.target.src="/gs-logo.png",style:{height:"40px",width:"auto",objectFit:"contain",filter:"grayscale(1)",opacity:.6,transition:"all 0.3s"}}),e.jsx("span",{children:b.name})]},`comp-1-${j}`)),n.map((b,j)=>e.jsxs("div",{className:"brand-item",children:[e.jsx("img",{src:b.logo?`${Sf}/uploads/logos/${b.logo}`:"/gs-logo.png",alt:b.name,onError:N=>N.target.src="/gs-logo.png",style:{height:"40px",width:"auto",objectFit:"contain",filter:"grayscale(1)",opacity:.6,transition:"all 0.3s"}}),e.jsx("span",{children:b.name})]},`comp-2-${j}`))]})})}),e.jsx("section",{className:"heritage-section",id:"heritage",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"heritage-grid",children:[e.jsxs("div",{className:"heritage-content",children:[e.jsx("span",{className:"section-badge",children:"Our Legacy"}),e.jsx("h2",{className:"section-title-creative",children:"Established In 1835"}),e.jsx("p",{className:"section-desc",children:"From 1835 to the present day, George Steuart & Company has stood as a beacon of stability and growth in Sri Lanka. Our diverse portfolio spans Tea, Pharmaceuticals, Leisure, Travel, Real Estate, and Financial Services."}),e.jsxs("div",{className:"heritage-features",children:[e.jsxs("div",{className:"h-feature",children:[e.jsx("div",{className:"h-icon",children:e.jsx(Ts,{})}),e.jsxs("div",{children:[e.jsx("h4",{children:"Global Presence"}),e.jsx("p",{children:"Exporting excellence to over 50 countries worldwide."})]})]}),e.jsxs("div",{className:"h-feature",children:[e.jsx("div",{className:"h-icon",children:e.jsx(er,{})}),e.jsxs("div",{children:[e.jsx("h4",{children:"Diverse Team"}),e.jsx("p",{children:"Over 1,000 professionals working across multiple sectors."})]})]})]})]}),e.jsx("div",{className:"heritage-visual",children:e.jsxs("div",{className:"heritage-card-wrapper",children:[e.jsx("img",{src:"/heritage-believe.png",alt:"George Steuart Heritage - Believe",className:"heritage-believe-img"}),e.jsx("div",{className:"heritage-floating-text",children:'"Believe in Excellence"'})]})})]})})}),e.jsx("section",{className:"values-section",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"values-grid",children:[e.jsxs("div",{className:"value-item",children:[e.jsx("div",{className:"value-icon",children:"I"}),e.jsx("h3",{children:"Integrity"}),e.jsx("p",{children:"We maintain the highest standards of professional ethics and transparent conduct."})]}),e.jsxs("div",{className:"value-item",children:[e.jsx("div",{className:"value-icon",children:"E"}),e.jsx("h3",{children:"Excellence"}),e.jsx("p",{children:"Delivering world-class quality in every sector we operate in, every single day."})]}),e.jsxs("div",{className:"value-item",children:[e.jsx("div",{className:"value-icon",children:"H"}),e.jsx("h3",{children:"Heritage"}),e.jsx("p",{children:"Continuing a 190-year journey of mercantile leadership in Sri Lanka."})]})]})})}),e.jsx("section",{className:"cta-section",children:e.jsx("div",{className:"container",children:e.jsx("div",{className:"cta-card",children:e.jsxs("div",{className:"cta-content",children:[e.jsx("h2",{children:"Be Part of Sri Lanka's Heritage"}),e.jsx("p",{children:"We are always looking for talented individuals who believe in excellence and integrity."}),e.jsx(tt,{to:"/vacancies",className:"btn btn-warm btn-lg",children:"Explore Openings"})]})})})}),e.jsx("footer",{className:"footer-premium",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"footer-top-grid",children:[e.jsxs("div",{className:"footer-col brand-col",children:[e.jsx("img",{src:"/gs-logo.png",alt:"George Steuart & Co",className:"footer-logo-premium"}),e.jsxs("h3",{className:"footer-brand-name",children:["George Steuart ",e.jsx("br",{}),e.jsx("span",{children:"& Company Ltd"})]}),e.jsx("p",{className:"footer-about-text",children:"Established in 1835, George Steuart & Company is Sri Lanka's oldest mercantile firm, fostering excellence for nearly two centuries."}),e.jsxs("div",{className:"footer-socials",children:[e.jsx("a",{href:"https://www.facebook.com/GeorgeSteuarts",target:"_blank",rel:"noopener noreferrer",className:"social-link",title:"Facebook",children:e.jsx(rd,{})}),e.jsx("a",{href:"https://www.linkedin.com/company/george-steuart-&-company-limited",target:"_blank",rel:"noopener noreferrer",className:"social-link",title:"LinkedIn",children:e.jsx(ad,{})})]})]}),e.jsxs("div",{className:"footer-col links-col",children:[e.jsx("h4",{className:"footer-col-title",children:"Quick Links"}),e.jsxs("ul",{className:"footer-links-list",children:[e.jsx("li",{children:e.jsx(tt,{to:"/",children:"Home"})}),e.jsx("li",{children:e.jsx(tt,{to:"/vacancies",children:"All Vacancies"})}),e.jsx("li",{children:e.jsx("a",{href:"#heritage",children:"Our Heritage"})}),e.jsx("li",{children:e.jsx(tt,{to:"/admin/login",children:"Admin Portal"})})]})]}),e.jsxs("div",{className:"footer-col contact-col",children:[e.jsx("h4",{className:"footer-col-title",children:"Get In Touch"}),e.jsxs("div",{className:"footer-contact-info",children:[e.jsxs("p",{children:[e.jsx(xt,{className:"c-icon"})," No. 439, Galle Road, Colombo 03, Sri Lanka."]}),e.jsxs("p",{children:[e.jsx(Ts,{className:"c-icon"})," www.georgesteuart.lk"]}),e.jsxs("div",{className:"contact-numbers",children:[e.jsxs("p",{children:[e.jsx("span",{children:"T:"})," +94 117 792 400"]}),e.jsxs("p",{children:[e.jsx("span",{children:"E:"})," info@georgesteuart.lk"]})]})]})]})]}),e.jsxs("div",{className:"footer-bottom-bar",children:[e.jsxs("div",{className:"copyright-area",children:["© ",new Date().getFullYear()," George Steuart & Company Ltd. All Rights Reserved."]}),e.jsxs("div",{className:"developer-credit",children:["Developed by ",e.jsx("span",{children:"GS Optimize pvt ltd"})]})]})]})})]})}const Ob=Et.replace("/api","");function Fb(){const[s,a]=F.useState([]),[n,o]=F.useState([]),[l,d]=F.useState(!0),[u,f]=F.useState(""),[h,b]=F.useState(""),[j,N]=F.useState(!1),w=Ut(),_=async()=>{var E,A;try{d(!0);const D={};h&&(D.company_id=h),u&&(D.search=u);const[B,V]=await Promise.all([Eh(D),un()]);a(((E=B==null?void 0:B.data)==null?void 0:E.data)||[]),o(((A=V==null?void 0:V.data)==null?void 0:A.data)||[])}catch(D){console.error(D)}finally{d(!1)}};F.useEffect(()=>{_()},[h]);const v=E=>{E.preventDefault(),_()},[x,g]=F.useState(""),S=F.useMemo(()=>{const E=s.map(A=>A.location).filter(Boolean);return[...new Set(E)]},[s]),z=F.useMemo(()=>{const E=u.trim().toLowerCase();return s.filter(A=>{const D=(A.title||"").toLowerCase(),B=(A.designation||"").toLowerCase(),V=(A.company_name||"").toLowerCase();(A.location||"").toLowerCase();const U=!E||D.includes(E)||B.includes(E)||V.includes(E),G=!h||String(A.company_id)===String(h),fe=!x||A.location===x;return U&&G&&fe})},[s,u,h,x]),T=()=>N(!1);return e.jsxs("div",{className:"public-page vacancy-listing-page",children:[e.jsxs("nav",{className:"navbar",children:[e.jsxs(tt,{to:"/",className:"navbar-brand",children:[e.jsx("img",{src:"/gs-logo.png",alt:"George Steuart & Co",className:"navbar-logo"}),e.jsxs("div",{children:[e.jsx("div",{className:"navbar-title",children:"George Steuart"}),e.jsx("div",{className:"navbar-subtitle",children:"Careers"})]})]}),e.jsxs("div",{className:`navbar-links ${j?"open":""}`,children:[e.jsx(tt,{to:"/",className:"navbar-link",onClick:T,children:"Home"}),e.jsx(tt,{to:"/vacancies",className:"navbar-link active",onClick:T,children:"Vacancies"}),e.jsx(tt,{to:"/admin/login",className:"navbar-link btn-primary",onClick:T,children:"Admin Portal"})]}),e.jsx("button",{className:"mobile-menu-btn",onClick:()=>N(E=>!E),children:j?e.jsx(ct,{}):e.jsx(Ls,{})})]}),e.jsxs("header",{className:"vacancies-hero-v2",children:[e.jsx("div",{className:"container",children:e.jsx("div",{className:"v2-hero-layout",children:e.jsxs("div",{className:"v2-hero-info",children:[e.jsx("div",{className:"v2-badge animate-fade-in",children:"Join Our Legacy"}),e.jsxs("h1",{className:"v2-hero-title animate-slide-up",children:["Shape Your Future ",e.jsx("br",{}),e.jsx("span",{children:"With George Steuart"})]}),e.jsx("p",{className:"v2-hero-subtitle animate-slide-up delay-1",children:"Partner with the oldest mercantile firm in Sri Lanka. We offer more than just a job; we offer a platform to build a career rooted in 190 years of excellence."}),e.jsx("div",{className:"v2-hero-actions animate-slide-up delay-2",children:e.jsxs(tt,{to:"#current-openings",className:"v2-btn-scroll",onClick:E=>{E.preventDefault(),document.getElementById("current-openings").scrollIntoView({behavior:"smooth"})},children:["View Openings ",e.jsx(na,{})]})})]})})}),e.jsx("div",{className:"v2-hero-overlay"})]}),e.jsx("div",{className:"v2-filter-section",children:e.jsx("div",{className:"container",children:e.jsx("div",{className:"v2-filter-card-wrapper shadow-premium animate-slide-up",children:e.jsxs("form",{className:"v2-filter-card",onSubmit:v,children:[e.jsxs("div",{className:"v2-search-input",children:[e.jsx(Ar,{className:"v2-icon"}),e.jsx("input",{type:"text",placeholder:"Search by role or keyword...",value:u,onChange:E=>f(E.target.value)})]}),e.jsxs("div",{className:"v2-select-group",children:[e.jsxs("div",{className:"v2-select-wrapper",children:[e.jsx(At,{className:"v2-icon-small"}),e.jsxs("select",{value:h,onChange:E=>b(E.target.value),children:[e.jsx("option",{value:"",children:"All Companies"}),n.map(E=>e.jsx("option",{value:E.id,children:E.name},E.id))]})]}),e.jsxs("div",{className:"v2-select-wrapper",children:[e.jsx(xt,{className:"v2-icon-small"}),e.jsxs("select",{value:x,onChange:E=>g(E.target.value),children:[e.jsx("option",{value:"",children:"All Locations"}),S.map(E=>e.jsx("option",{value:E,children:E},E))]})]})]}),e.jsxs("button",{type:"submit",className:"v2-btn-find",children:[e.jsx(Ar,{})," ",e.jsx("span",{children:"Find Opportunities"})]})]})})})}),e.jsx("main",{className:"v2-listing-section",id:"current-openings",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"v2-section-header",children:[e.jsxs("div",{className:"v2-header-title",children:[e.jsx("h2",{children:"Current Openings"}),e.jsxs("p",{children:["Showing ",e.jsx("strong",{children:z.length})," active positions across our group"]})]}),e.jsx("div",{className:"v2-view-options",children:e.jsx("span",{className:"v2-active-filter",children:"Sort by: Latest First"})})]}),l?e.jsx("div",{className:"loading-container",children:[1,2,3,4,5,6].map(E=>e.jsx("div",{className:"skeleton-card"},E))}):z.length===0?e.jsxs("div",{className:"v2-empty-state",children:[e.jsx("div",{className:"v2-empty-illustration",children:"🔍"}),e.jsx("h3",{children:"No matches found"}),e.jsx("p",{children:"Try adjusting your search or filters to find what you're looking for."}),e.jsx("button",{onClick:()=>{f(""),b(""),g("")},className:"v2-btn-reset",children:"Clear All Filters"})]}):e.jsx("div",{className:"v2-vacancy-grid",children:z.map((E,A)=>{const D=Hr(E.created_at)<7;return e.jsxs("div",{className:"v2-job-card animate-slide-up",style:{animationDelay:`${A*.08}s`},onClick:()=>w(`/apply/${E.id}`),children:[e.jsx("div",{className:"v2-card-logo",children:e.jsx("img",{src:E.company_logo?`${Ob}/uploads/logos/${E.company_logo}`:"/gs-logo.png",alt:E.company_name,onError:B=>B.target.src="/gs-logo.png"})}),e.jsxs("div",{className:"v2-card-body",children:[e.jsxs("div",{className:"v2-card-tags",children:[D&&e.jsx("span",{className:"v2-tag-new",children:"New Opening"}),e.jsx("span",{className:"v2-tag-type",children:E.employment_type||"Full Time"})]}),e.jsx("h3",{className:"v2-job-title",style:{marginBottom:"2px"},children:E.title}),e.jsxs("div",{style:{fontSize:"0.7rem",color:"var(--text-muted)",fontWeight:"bold",marginBottom:"8px",letterSpacing:"0.5px"},children:["REF: ",E.reference_number||"N/A"]}),e.jsx("span",{className:"v2-company-name",children:E.company_name}),E.description&&e.jsx("div",{className:"v2-job-card-description",children:E.description}),e.jsxs("div",{className:"v2-job-details",children:[e.jsxs("div",{className:"v2-detail-item",children:[e.jsx(xt,{className:"v2-icon-inline"}),e.jsx("span",{children:E.location||"Colombo, LK"})]}),e.jsxs("div",{className:"v2-detail-item",children:[e.jsx(qt,{className:"v2-icon-inline"}),e.jsxs("span",{children:["Closes: ",on(E.expire_date)]})]}),e.jsxs("div",{className:"v2-detail-item",children:[e.jsx(At,{className:"v2-icon-inline"}),e.jsx("span",{children:E.designation||"Executive"})]})]}),e.jsxs("div",{className:"v2-card-footer",children:[e.jsxs("div",{className:"v2-job-status-badge",children:[e.jsx("span",{className:"v2-status-dot"}),"Actively Hiring"]}),e.jsxs(tt,{to:`/apply/${E.id}`,className:"v2-btn-apply",onClick:B=>B.stopPropagation(),children:["View Position ",e.jsx(na,{})]})]})]})]},E.id)})})]})}),e.jsx("section",{className:"v5-why-join",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"v5-layout",children:[e.jsxs("div",{className:"v5-visual",children:[e.jsx("div",{className:"v5-badge",children:"The GS Advantage"}),e.jsx("h2",{className:"v5-main-title",children:"Why Your Career Starts Here"}),e.jsx("p",{className:"v5-main-desc",children:"Join a legacy of over 190 years. We don't just offer jobs; we provide a platform for you to build a lasting legacy within Sri Lanka's most prestigious mercantile home."}),e.jsxs("div",{className:"v5-stats-cluster",children:[e.jsxs("div",{className:"v5-stat-card",children:[e.jsx("span",{className:"num",children:"190+"}),e.jsx("span",{className:"lbl",children:"Years"})]}),e.jsxs("div",{className:"v5-stat-card gold",children:[e.jsx("span",{className:"num",children:"10+"}),e.jsx("span",{className:"lbl",children:"Sectors"})]}),e.jsxs("div",{className:"v5-stat-card",children:[e.jsx("span",{className:"num",children:"5K+"}),e.jsx("span",{className:"lbl",children:"Family"})]})]})]}),e.jsxs("div",{className:"v5-pillars",children:[e.jsxs("div",{className:"v5-pillar-item",children:[e.jsx("div",{className:"v5-pillar-icon",children:e.jsx(td,{})}),e.jsxs("div",{className:"v5-pillar-info",children:[e.jsx("h4",{children:"Historic Resilience"}),e.jsx("p",{children:"Experience the stability of a firm that has led the Sri Lankan economy since 1835."})]})]}),e.jsxs("div",{className:"v5-pillar-item",children:[e.jsx("div",{className:"v5-pillar-icon",children:e.jsx(Ts,{})}),e.jsxs("div",{className:"v5-pillar-info",children:[e.jsx("h4",{children:"Cross-Industry Exposure"}),e.jsx("p",{children:"Pivot your career across Tea, Healthcare, Finance, and Travel without leaving the group."})]})]}),e.jsxs("div",{className:"v5-pillar-item featured",children:[e.jsx("div",{className:"v5-pillar-icon",children:e.jsx(er,{})}),e.jsxs("div",{className:"v5-pillar-info",children:[e.jsx("h4",{children:"Inclusive Leadership"}),e.jsx("p",{children:"Our meritocratic culture ensures that talent and integrity are the only paths to the top."})]})]}),e.jsxs("div",{className:"v5-pillar-item",children:[e.jsx("div",{className:"v5-pillar-icon",children:e.jsx(At,{})}),e.jsxs("div",{className:"v5-pillar-info",children:[e.jsx("h4",{children:"Strategic Mentorship"}),e.jsx("p",{children:"Access structured growth programs led by industry stalwarts and visionary directors."})]})]})]})]})})}),e.jsx("footer",{className:"footer-premium",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"footer-top-grid",children:[e.jsxs("div",{className:"footer-col brand-col",children:[e.jsx("img",{src:"/gs-logo.png",alt:"George Steuart & Co",className:"footer-logo-premium"}),e.jsxs("h3",{className:"footer-brand-name",children:["George Steuart ",e.jsx("br",{}),e.jsx("span",{children:"& Company Ltd"})]}),e.jsx("p",{className:"footer-about-text",children:"Established in 1835, George Steuart & Company is Sri Lanka's oldest mercantile firm, fostering excellence for nearly two centuries."}),e.jsxs("div",{className:"footer-socials",children:[e.jsx("a",{href:"https://www.facebook.com/GeorgeSteuarts",target:"_blank",rel:"noopener noreferrer",className:"social-link",title:"Facebook",children:e.jsx(rd,{})}),e.jsx("a",{href:"https://www.linkedin.com/company/george-steorge-steuart-&-company-limited",target:"_blank",rel:"noopener noreferrer",className:"social-link",title:"LinkedIn",children:e.jsx(ad,{})})]})]}),e.jsxs("div",{className:"footer-col links-col",children:[e.jsx("h4",{className:"footer-col-title",children:"Quick Links"}),e.jsxs("ul",{className:"footer-links-list",children:[e.jsx("li",{children:e.jsx(tt,{to:"/",children:"Home"})}),e.jsx("li",{children:e.jsx(tt,{to:"/vacancies",children:"All Vacancies"})}),e.jsx("li",{children:e.jsx("a",{href:"/#heritage",children:"Our Heritage"})}),e.jsx("li",{children:e.jsx(tt,{to:"/admin/login",children:"Admin Portal"})})]})]}),e.jsxs("div",{className:"footer-col contact-col",children:[e.jsx("h4",{className:"footer-col-title",children:"Get In Touch"}),e.jsxs("div",{className:"footer-contact-info",children:[e.jsxs("p",{children:[e.jsx(xt,{className:"c-icon"})," No. 439, Galle Road, Colombo 03, Sri Lanka."]}),e.jsxs("p",{children:[e.jsx(Ts,{className:"c-icon"})," www.georgesteuart.lk"]}),e.jsxs("div",{className:"contact-numbers",children:[e.jsxs("p",{children:[e.jsx("span",{children:"T:"})," +94 117 792 400"]}),e.jsxs("p",{children:[e.jsx("span",{children:"E:"})," info@georgesteuart.lk"]})]})]})]})]}),e.jsxs("div",{className:"footer-bottom-bar",children:[e.jsxs("div",{className:"copyright-area",children:["© ",new Date().getFullYear()," George Steuart & Company Ltd. All Rights Reserved."]}),e.jsxs("div",{className:"developer-credit",children:["Developed by ",e.jsx("span",{children:"GS Optimize pvt ltd"})]})]})]})})]})}function Bh(s){var a,n,o="";if(typeof s=="string"||typeof s=="number")o+=s;else if(typeof s=="object")if(Array.isArray(s)){var l=s.length;for(a=0;a<l;a++)s[a]&&(n=Bh(s[a]))&&(o&&(o+=" "),o+=n)}else for(n in s)s[n]&&(o&&(o+=" "),o+=n);return o}function Fn(){for(var s,a,n=0,o="",l=arguments.length;n<l;n++)(s=arguments[n])&&(a=Bh(s))&&(o&&(o+=" "),o+=a);return o}const Is=s=>typeof s=="number"&&!isNaN(s),ta=s=>typeof s=="string",dr=s=>typeof s=="function",uo=s=>ta(s)||dr(s)?s:null,Uc=s=>F.isValidElement(s)||ta(s)||dr(s)||Is(s);function Db(s,a,n){n===void 0&&(n=300);const{scrollHeight:o,style:l}=s;requestAnimationFrame(()=>{l.minHeight="initial",l.height=o+"px",l.transition=`all ${n}ms`,requestAnimationFrame(()=>{l.height="0",l.padding="0",l.margin="0",setTimeout(a,n)})})}function Ao(s){let{enter:a,exit:n,appendPosition:o=!1,collapse:l=!0,collapseDuration:d=300}=s;return function(u){let{children:f,position:h,preventExitTransition:b,done:j,nodeRef:N,isIn:w,playToast:_}=u;const v=o?`${a}--${h}`:a,x=o?`${n}--${h}`:n,g=F.useRef(0);return F.useLayoutEffect(()=>{const S=N.current,z=v.split(" "),T=E=>{E.target===N.current&&(_(),S.removeEventListener("animationend",T),S.removeEventListener("animationcancel",T),g.current===0&&E.type!=="animationcancel"&&S.classList.remove(...z))};S.classList.add(...z),S.addEventListener("animationend",T),S.addEventListener("animationcancel",T)},[]),F.useEffect(()=>{const S=N.current,z=()=>{S.removeEventListener("animationend",z),l?Db(S,j,d):j()};w||(b?z():(g.current=1,S.className+=` ${x}`,S.addEventListener("animationend",z)))},[w]),Xe.createElement(Xe.Fragment,null,f)}}function _f(s,a){return s!=null?{content:s.content,containerId:s.props.containerId,id:s.props.toastId,theme:s.props.theme,type:s.props.type,data:s.props.data||{},isLoading:s.props.isLoading,icon:s.props.icon,status:a}:{}}const Gt=new Map;let Os=[];const $c=new Set,Mb=s=>$c.forEach(a=>a(s)),Wh=()=>Gt.size>0;function Uh(s,a){var n;if(a)return!((n=Gt.get(a))==null||!n.isToastActive(s));let o=!1;return Gt.forEach(l=>{l.isToastActive(s)&&(o=!0)}),o}function $h(s,a){Uc(s)&&(Wh()||Os.push({content:s,options:a}),Gt.forEach(n=>{n.buildToast(s,a)}))}function Cf(s,a){Gt.forEach(n=>{a!=null&&a!=null&&a.containerId?(a==null?void 0:a.containerId)===n.id&&n.toggle(s,a==null?void 0:a.id):n.toggle(s,a==null?void 0:a.id)})}function Bb(s){const{subscribe:a,getSnapshot:n,setProps:o}=F.useRef((function(d){const u=d.containerId||1;return{subscribe(f){const h=(function(j,N,w){let _=1,v=0,x=[],g=[],S=[],z=N;const T=new Map,E=new Set,A=()=>{S=Array.from(T.values()),E.forEach(V=>V())},D=V=>{g=V==null?[]:g.filter(U=>U!==V),A()},B=V=>{const{toastId:U,onOpen:G,updateId:fe,children:L}=V.props,H=fe==null;V.staleId&&T.delete(V.staleId),T.set(U,V),g=[...g,V.props.toastId].filter(k=>k!==V.staleId),A(),w(_f(V,H?"added":"updated")),H&&dr(G)&&G(F.isValidElement(L)&&L.props)};return{id:j,props:z,observe:V=>(E.add(V),()=>E.delete(V)),toggle:(V,U)=>{T.forEach(G=>{U!=null&&U!==G.props.toastId||dr(G.toggle)&&G.toggle(V)})},removeToast:D,toasts:T,clearQueue:()=>{v-=x.length,x=[]},buildToast:(V,U)=>{if((P=>{let{containerId:W,toastId:ee,updateId:te}=P;const Ne=W?W!==j:j!==1,Te=T.has(ee)&&te==null;return Ne||Te})(U))return;const{toastId:G,updateId:fe,data:L,staleId:H,delay:k}=U,J=()=>{D(G)},ve=fe==null;ve&&v++;const se={...z,style:z.toastStyle,key:_++,...Object.fromEntries(Object.entries(U).filter(P=>{let[W,ee]=P;return ee!=null})),toastId:G,updateId:fe,data:L,closeToast:J,isIn:!1,className:uo(U.className||z.toastClassName),bodyClassName:uo(U.bodyClassName||z.bodyClassName),progressClassName:uo(U.progressClassName||z.progressClassName),autoClose:!U.isLoading&&(oe=U.autoClose,Q=z.autoClose,oe===!1||Is(oe)&&oe>0?oe:Q),deleteToast(){const P=T.get(G),{onClose:W,children:ee}=P.props;dr(W)&&W(F.isValidElement(ee)&&ee.props),w(_f(P,"removed")),T.delete(G),v--,v<0&&(v=0),x.length>0?B(x.shift()):A()}};var oe,Q;se.closeButton=z.closeButton,U.closeButton===!1||Uc(U.closeButton)?se.closeButton=U.closeButton:U.closeButton===!0&&(se.closeButton=!Uc(z.closeButton)||z.closeButton);let ce=V;F.isValidElement(V)&&!ta(V.type)?ce=F.cloneElement(V,{closeToast:J,toastProps:se,data:L}):dr(V)&&(ce=V({closeToast:J,toastProps:se,data:L}));const R={content:ce,props:se,staleId:H};z.limit&&z.limit>0&&v>z.limit&&ve?x.push(R):Is(k)?setTimeout(()=>{B(R)},k):B(R)},setProps(V){z=V},setToggle:(V,U)=>{T.get(V).toggle=U},isToastActive:V=>g.some(U=>U===V),getSnapshot:()=>S}})(u,d,Mb);Gt.set(u,h);const b=h.observe(f);return Os.forEach(j=>$h(j.content,j.options)),Os=[],()=>{b(),Gt.delete(u)}},setProps(f){var h;(h=Gt.get(u))==null||h.setProps(f)},getSnapshot(){var f;return(f=Gt.get(u))==null?void 0:f.getSnapshot()}}})(s)).current;o(s);const l=F.useSyncExternalStore(a,n,n);return{getToastToRender:function(d){if(!l)return[];const u=new Map;return s.newestOnTop&&l.reverse(),l.forEach(f=>{const{position:h}=f.props;u.has(h)||u.set(h,[]),u.get(h).push(f)}),Array.from(u,f=>d(f[0],f[1]))},isToastActive:Uh,count:l==null?void 0:l.length}}function Wb(s){const[a,n]=F.useState(!1),[o,l]=F.useState(!1),d=F.useRef(null),u=F.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:f,pauseOnHover:h,closeToast:b,onClick:j,closeOnClick:N}=s;var w,_;function v(){n(!0)}function x(){n(!1)}function g(T){const E=d.current;u.canDrag&&E&&(u.didMove=!0,a&&x(),u.delta=s.draggableDirection==="x"?T.clientX-u.start:T.clientY-u.start,u.start!==T.clientX&&(u.canCloseOnClick=!1),E.style.transform=`translate3d(${s.draggableDirection==="x"?`${u.delta}px, var(--y)`:`0, calc(${u.delta}px + var(--y))`},0)`,E.style.opacity=""+(1-Math.abs(u.delta/u.removalDistance)))}function S(){document.removeEventListener("pointermove",g),document.removeEventListener("pointerup",S);const T=d.current;if(u.canDrag&&u.didMove&&T){if(u.canDrag=!1,Math.abs(u.delta)>u.removalDistance)return l(!0),s.closeToast(),void s.collapseAll();T.style.transition="transform 0.2s, opacity 0.2s",T.style.removeProperty("transform"),T.style.removeProperty("opacity")}}(_=Gt.get((w={id:s.toastId,containerId:s.containerId,fn:n}).containerId||1))==null||_.setToggle(w.id,w.fn),F.useEffect(()=>{if(s.pauseOnFocusLoss)return document.hasFocus()||x(),window.addEventListener("focus",v),window.addEventListener("blur",x),()=>{window.removeEventListener("focus",v),window.removeEventListener("blur",x)}},[s.pauseOnFocusLoss]);const z={onPointerDown:function(T){if(s.draggable===!0||s.draggable===T.pointerType){u.didMove=!1,document.addEventListener("pointermove",g),document.addEventListener("pointerup",S);const E=d.current;u.canCloseOnClick=!0,u.canDrag=!0,E.style.transition="none",s.draggableDirection==="x"?(u.start=T.clientX,u.removalDistance=E.offsetWidth*(s.draggablePercent/100)):(u.start=T.clientY,u.removalDistance=E.offsetHeight*(s.draggablePercent===80?1.5*s.draggablePercent:s.draggablePercent)/100)}},onPointerUp:function(T){const{top:E,bottom:A,left:D,right:B}=d.current.getBoundingClientRect();T.nativeEvent.type!=="touchend"&&s.pauseOnHover&&T.clientX>=D&&T.clientX<=B&&T.clientY>=E&&T.clientY<=A?x():v()}};return f&&h&&(z.onMouseEnter=x,s.stacked||(z.onMouseLeave=v)),N&&(z.onClick=T=>{j&&j(T),u.canCloseOnClick&&b()}),{playToast:v,pauseToast:x,isRunning:a,preventExitTransition:o,toastRef:d,eventHandlers:z}}function Ub(s){let{delay:a,isRunning:n,closeToast:o,type:l="default",hide:d,className:u,style:f,controlledProgress:h,progress:b,rtl:j,isIn:N,theme:w}=s;const _=d||h&&b===0,v={...f,animationDuration:`${a}ms`,animationPlayState:n?"running":"paused"};h&&(v.transform=`scaleX(${b})`);const x=Fn("Toastify__progress-bar",h?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${w}`,`Toastify__progress-bar--${l}`,{"Toastify__progress-bar--rtl":j}),g=dr(u)?u({rtl:j,type:l,defaultClassName:x}):Fn(x,u),S={[h&&b>=1?"onTransitionEnd":"onAnimationEnd"]:h&&b<1?null:()=>{N&&o()}};return Xe.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":_},Xe.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${w} Toastify__progress-bar--${l}`}),Xe.createElement("div",{role:"progressbar","aria-hidden":_?"true":"false","aria-label":"notification timer",className:g,style:v,...S}))}let $b=1;const Vh=()=>""+$b++;function Vb(s){return s&&(ta(s.toastId)||Is(s.toastId))?s.toastId:Vh()}function Es(s,a){return $h(s,a),a.toastId}function bo(s,a){return{...a,type:a&&a.type||s,toastId:Vb(a)}}function Ji(s){return(a,n)=>Es(a,bo(s,n))}function me(s,a){return Es(s,bo("default",a))}me.loading=(s,a)=>Es(s,bo("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...a})),me.promise=function(s,a,n){let o,{pending:l,error:d,success:u}=a;l&&(o=ta(l)?me.loading(l,n):me.loading(l.render,{...n,...l}));const f={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},h=(j,N,w)=>{if(N==null)return void me.dismiss(o);const _={type:j,...f,...n,data:w},v=ta(N)?{render:N}:N;return o?me.update(o,{..._,...v}):me(v.render,{..._,...v}),w},b=dr(s)?s():s;return b.then(j=>h("success",u,j)).catch(j=>h("error",d,j)),b},me.success=Ji("success"),me.info=Ji("info"),me.error=Ji("error"),me.warning=Ji("warning"),me.warn=me.warning,me.dark=(s,a)=>Es(s,bo("default",{theme:"dark",...a})),me.dismiss=function(s){(function(a){var n;if(Wh()){if(a==null||ta(n=a)||Is(n))Gt.forEach(o=>{o.removeToast(a)});else if(a&&("containerId"in a||"id"in a)){const o=Gt.get(a.containerId);o?o.removeToast(a.id):Gt.forEach(l=>{l.removeToast(a.id)})}}else Os=Os.filter(o=>a!=null&&o.options.toastId!==a)})(s)},me.clearWaitingQueue=function(s){s===void 0&&(s={}),Gt.forEach(a=>{!a.props.limit||s.containerId&&a.id!==s.containerId||a.clearQueue()})},me.isActive=Uh,me.update=function(s,a){a===void 0&&(a={});const n=((o,l)=>{var d;let{containerId:u}=l;return(d=Gt.get(u||1))==null?void 0:d.toasts.get(o)})(s,a);if(n){const{props:o,content:l}=n,d={delay:100,...o,...a,toastId:a.toastId||s,updateId:Vh()};d.toastId!==s&&(d.staleId=s);const u=d.render||l;delete d.render,Es(u,d)}},me.done=s=>{me.update(s,{progress:1})},me.onChange=function(s){return $c.add(s),()=>{$c.delete(s)}},me.play=s=>Cf(!0,s),me.pause=s=>Cf(!1,s);const Hb=typeof window<"u"?F.useLayoutEffect:F.useEffect,eo=s=>{let{theme:a,type:n,isLoading:o,...l}=s;return Xe.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:a==="colored"?"currentColor":`var(--toastify-icon-color-${n})`,...l})},_c={info:function(s){return Xe.createElement(eo,{...s},Xe.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(s){return Xe.createElement(eo,{...s},Xe.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(s){return Xe.createElement(eo,{...s},Xe.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(s){return Xe.createElement(eo,{...s},Xe.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return Xe.createElement("div",{className:"Toastify__spinner"})}},qb=s=>{const{isRunning:a,preventExitTransition:n,toastRef:o,eventHandlers:l,playToast:d}=Wb(s),{closeButton:u,children:f,autoClose:h,onClick:b,type:j,hideProgressBar:N,closeToast:w,transition:_,position:v,className:x,style:g,bodyClassName:S,bodyStyle:z,progressClassName:T,progressStyle:E,updateId:A,role:D,progress:B,rtl:V,toastId:U,deleteToast:G,isIn:fe,isLoading:L,closeOnClick:H,theme:k}=s,J=Fn("Toastify__toast",`Toastify__toast-theme--${k}`,`Toastify__toast--${j}`,{"Toastify__toast--rtl":V},{"Toastify__toast--close-on-click":H}),ve=dr(x)?x({rtl:V,position:v,type:j,defaultClassName:J}):Fn(J,x),se=(function(R){let{theme:P,type:W,isLoading:ee,icon:te}=R,Ne=null;const Te={theme:P,type:W};return te===!1||(dr(te)?Ne=te({...Te,isLoading:ee}):F.isValidElement(te)?Ne=F.cloneElement(te,Te):ee?Ne=_c.spinner():(_e=>_e in _c)(W)&&(Ne=_c[W](Te))),Ne})(s),oe=!!B||!h,Q={closeToast:w,type:j,theme:k};let ce=null;return u===!1||(ce=dr(u)?u(Q):F.isValidElement(u)?F.cloneElement(u,Q):(function(R){let{closeToast:P,theme:W,ariaLabel:ee="close"}=R;return Xe.createElement("button",{className:`Toastify__close-button Toastify__close-button--${W}`,type:"button",onClick:te=>{te.stopPropagation(),P(te)},"aria-label":ee},Xe.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},Xe.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))})(Q)),Xe.createElement(_,{isIn:fe,done:G,position:v,preventExitTransition:n,nodeRef:o,playToast:d},Xe.createElement("div",{id:U,onClick:b,"data-in":fe,className:ve,...l,style:g,ref:o},Xe.createElement("div",{...fe&&{role:D},className:dr(S)?S({type:j}):Fn("Toastify__toast-body",S),style:z},se!=null&&Xe.createElement("div",{className:Fn("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!L})},se),Xe.createElement("div",null,f)),ce,Xe.createElement(Ub,{...A&&!oe?{key:`pb-${A}`}:{},rtl:V,theme:k,delay:h,isRunning:a,isIn:fe,closeToast:w,hide:N,type:j,style:E,className:T,controlledProgress:oe,progress:B||0})))},Lo=function(s,a){return a===void 0&&(a=!1),{enter:`Toastify--animate Toastify__${s}-enter`,exit:`Toastify--animate Toastify__${s}-exit`,appendPosition:a}},Gb=Ao(Lo("bounce",!0));Ao(Lo("slide",!0));Ao(Lo("zoom"));Ao(Lo("flip"));const Yb={position:"top-right",transition:Gb,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};function Kb(s){let a={...Yb,...s};const n=s.stacked,[o,l]=F.useState(!0),d=F.useRef(null),{getToastToRender:u,isToastActive:f,count:h}=Bb(a),{className:b,style:j,rtl:N,containerId:w}=a;function _(x){const g=Fn("Toastify__toast-container",`Toastify__toast-container--${x}`,{"Toastify__toast-container--rtl":N});return dr(b)?b({position:x,rtl:N,defaultClassName:g}):Fn(g,uo(b))}function v(){n&&(l(!0),me.play())}return Hb(()=>{if(n){var x;const g=d.current.querySelectorAll('[data-in="true"]'),S=12,z=(x=a.position)==null?void 0:x.includes("top");let T=0,E=0;Array.from(g).reverse().forEach((A,D)=>{const B=A;B.classList.add("Toastify__toast--stacked"),D>0&&(B.dataset.collapsed=`${o}`),B.dataset.pos||(B.dataset.pos=z?"top":"bot");const V=T*(o?.2:1)+(o?0:S*D);B.style.setProperty("--y",`${z?V:-1*V}px`),B.style.setProperty("--g",`${S}`),B.style.setProperty("--s",""+(1-(o?E:0))),T+=B.offsetHeight,E+=.025})}},[o,h,n]),Xe.createElement("div",{ref:d,className:"Toastify",id:w,onMouseEnter:()=>{n&&(l(!1),me.pause())},onMouseLeave:v},u((x,g)=>{const S=g.length?{...j}:{...j,pointerEvents:"none"};return Xe.createElement("div",{className:_(x),style:S,key:`container-${x}`},g.map(z=>{let{content:T,props:E}=z;return Xe.createElement(qb,{...E,stacked:n,collapseAll:v,isIn:f(E.toastId,E.containerId),style:E.style,key:`toast-${E.key}`},T)}))}))}const Xb=Et.replace("/api",""),Zb=["O/L","A/L","Diploma","Bachelors Degree","Masters Degree","PhD","Professional Certification"];function Qb(){var U;const{id:s}=Qf(),a=Ut(),[n,o]=F.useState(null),[l,d]=F.useState(!0),[u,f]=F.useState(!1),[h,b]=F.useState(!1),[j,N]=F.useState(1),[w,_]=F.useState(!1),[v,x]=F.useState({first_name:"",last_name:"",email:"",contact_number:"",overall_experience:"",relevant_experience:"",qualification:"",salary_expectation:"",cv:null,future_consent:null});F.useEffect(()=>{(async()=>{var fe;try{const L=await zh(s),H=((fe=L.data)==null?void 0:fe.data)||L.data;H?o(H):(me.error("Vacancy not found."),a("/vacancies"))}catch{me.error("Failed to load vacancy."),a("/vacancies")}finally{d(!1)}})()},[s,a]);const g=G=>x({...v,[G.target.name]:G.target.value}),[S,z]=F.useState(!1);F.useEffect(()=>{console.log("Steuart AI PDFJS Integration Status:",!!window.pdfjsLib)},[]);const T=async G=>new Promise((fe,L)=>{const H=new FileReader;H.onload=async k=>{try{const J=new Uint8Array(k.target.result),ve=window.pdfjsLib;if(!ve){L(new Error("PDFJS library not loaded yet. Please wait."));return}const se=await ve.getDocument({data:J}).promise;let oe="";for(let Q=1;Q<=se.numPages;Q++){const P=(await(await se.getPage(Q)).getTextContent()).items.map(W=>W.str).join(" ");oe+=P+`
`}fe(oe)}catch(J){L(J)}},H.onerror=k=>L(k),H.readAsArrayBuffer(G)}),E=async G=>{var L,H,k,J,ve;z(!0);const fe=me.info("✨ Steuart AI is analyzing your CV...",{autoClose:!1});try{const se=await T(G);if(!se||se.trim().length===0)throw new Error("Unable to extract text content from PDF resume.");const Q=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyC06D6PK0tgP9_LfvANEndQIBTDx6xkn4s",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:`You are an expert resume parser for George Steuart & Company Ltd. 
Parse the following candidate resume text and extract the details strictly matching the requested JSON schema.
Ensure phone numbers are extracted correctly (usually starting with +94 or 07), first/last names are clean and correctly separated, and qualifications & experience are mapped EXACTLY to the allowed enum options.

Resume Text:
${se}`}]}],generationConfig:{responseMimeType:"application/json",responseSchema:{type:"OBJECT",properties:{first_name:{type:"STRING"},last_name:{type:"STRING"},email:{type:"STRING"},contact_number:{type:"STRING"},qualification:{type:"STRING",enum:["O/L","A/L","Diploma","Bachelors Degree","Masters Degree","PhD","Professional Certification"]},overall_experience:{type:"STRING",enum:["0 years","0-1 years","1-2 years","3-4 years","5-7 years","8-10 years","10+ years"]},relevant_experience:{type:"STRING",enum:["0 years","0-1 years","1-2 years","3-4 years","5-7 years","8-10 years","10+ years"]},salary_expectation:{type:"STRING"}},required:["first_name","last_name","email","contact_number","qualification","overall_experience","relevant_experience"]}}})});if(!Q.ok)throw new Error(`API returned status ${Q.status}`);const R=(ve=(J=(k=(H=(L=(await Q.json()).candidates)==null?void 0:L[0])==null?void 0:H.content)==null?void 0:k.parts)==null?void 0:J[0])==null?void 0:ve.text;if(!R)throw new Error("No structured text response from AI.");const P=JSON.parse(R);x(W=>({...W,first_name:P.first_name||W.first_name||"",last_name:P.last_name||W.last_name||"",email:P.email||W.email||"",contact_number:P.contact_number||W.contact_number||"",qualification:P.qualification||W.qualification||"",overall_experience:P.overall_experience||W.overall_experience||"",relevant_experience:P.relevant_experience||W.relevant_experience||"",salary_expectation:P.salary_expectation||W.salary_expectation||""})),me.update(fe,{render:"🎉 Steuart AI successfully parsed your CV and auto-filled the form!",type:"success",autoClose:4e3,isLoading:!1})}catch(se){console.error("CV parsing error:",se),me.update(fe,{render:`⚠️ AI auto-fill failed: ${se.message||"Please enter details manually."}`,type:"warning",autoClose:7e3,isLoading:!1})}finally{z(!1)}},A=async G=>{const fe=G.target.files[0];if(fe){if(fe.size>5*1024*1024){me.error("File too large (max 5MB).");return}x(L=>({...L,cv:fe})),fe.type==="application/pdf"?await E(fe):me.info("AI auto-fill is optimized for PDF resumes. Forms can still be filled manually.")}},D=G=>{var H;if(G.preventDefault(),!v.cv){me.error("Please upload your CV.");return}const fe=(H=v.salary_expectation)==null?void 0:H.toString().trim();if(!fe){me.error("Salary Expectation (LKR) is required.");return}const L=fe.replace(/,/g,"");if(!/^\d+(\.\d+)?$/.test(L)||parseFloat(L)<=0){me.error("Salary Expectation must be a valid positive numeric amount (digits only, e.g. 150000 or 150,000).");return}if(!w){me.error("You must agree to the Privacy Policy to proceed.");return}N(2),window.scrollTo({top:0,behavior:"smooth"})},B=async()=>{var G,fe;f(!0);try{const L=new FormData;Object.keys(v).forEach(H=>{H==="future_consent"?L.append(H,v[H]===!0?"true":"false"):L.append(H,v[H])}),L.append("vacancy_id",s),await Zv(L),me.success("Application submitted!"),a("/success",{state:{vacancy:n}})}catch(L){me.error(((fe=(G=L.response)==null?void 0:G.data)==null?void 0:fe.message)||"Failed to submit.")}finally{f(!1)}},V=G=>{if(!G)return"N/A";const fe=new Date(G);return isNaN(fe)?"N/A":fe.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})};return l?e.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{className:"spinner"})}):e.jsxs("div",{className:"apb-page",children:[e.jsxs("nav",{className:"navbar",children:[e.jsxs(tt,{to:"/",className:"navbar-brand",children:[e.jsx("img",{src:"/gs-logo.png",alt:"George Steuart",className:"navbar-logo"}),e.jsxs("div",{children:[e.jsx("div",{className:"navbar-title",children:"George Steuart"}),e.jsx("div",{className:"navbar-subtitle",children:"Careers"})]})]}),e.jsxs("div",{className:`navbar-links ${h?"open":""}`,children:[e.jsx(tt,{to:"/",className:"navbar-link",onClick:()=>b(!1),children:"Home"}),e.jsx(tt,{to:"/vacancies",className:"navbar-link",onClick:()=>b(!1),children:"Vacancies"}),e.jsx(tt,{to:"/admin/login",className:"navbar-link btn-primary",onClick:()=>b(!1),children:"Admin Portal"})]}),e.jsx("button",{className:"mobile-menu-btn",onClick:()=>b(G=>!G),children:h?e.jsx(ct,{}):e.jsx(Ls,{})})]}),e.jsxs("div",{className:"apb-banner",children:[e.jsx("div",{className:"apb-banner-img",children:e.jsx("img",{src:"/apply.png",alt:"Apply"})}),e.jsx("div",{className:"apb-banner-overlay"}),e.jsxs("div",{className:"apb-banner-content container",children:[e.jsxs(tt,{to:"/vacancies",className:"apb-back",children:[e.jsx(Gr,{})," Back to Vacancies"]}),e.jsxs("div",{className:"apb-banner-company",children:[e.jsx("div",{className:"apb-banner-logo",children:e.jsx("img",{src:n!=null&&n.company_logo?`${Xb}/uploads/logos/${n.company_logo}`:"/gs-logo.png",alt:(n==null?void 0:n.company_name)||"George Steuart",onError:G=>G.target.src="/gs-logo.png"})}),e.jsx("span",{children:(n==null?void 0:n.company_name)||"George Steuart & Company"})]}),e.jsx("h1",{className:"apb-banner-title",children:(n==null?void 0:n.title)||"Open Position"}),e.jsxs("div",{className:"apb-banner-tags",children:[(n==null?void 0:n.reference_number)&&e.jsxs("span",{className:"apb-tag apb-tag-gold",children:[e.jsx(Fh,{}),n.reference_number]}),(n==null?void 0:n.employment_type)&&e.jsxs("span",{className:"apb-tag",children:[e.jsx(At,{}),n.employment_type]}),(n==null?void 0:n.location)&&e.jsxs("span",{className:"apb-tag",children:[e.jsx(xt,{}),n.location]}),e.jsxs("span",{className:"apb-tag apb-tag-deadline",children:[e.jsx(qt,{}),"Closes ",V(n==null?void 0:n.expire_date)]})]})]})]}),e.jsx("main",{className:"apb-main",children:e.jsxs("div",{className:"container apb-container",children:[e.jsx("aside",{className:"apb-sidebar",children:e.jsxs("div",{className:"apb-info-card",children:[e.jsx("h3",{className:"apb-info-title",children:"Position Details"}),(n==null?void 0:n.description)&&e.jsxs("div",{className:"apb-info-block",children:[e.jsx("h4",{children:"About This Role"}),e.jsx("p",{children:n.description})]}),(n==null?void 0:n.requirements)&&e.jsxs("div",{className:"apb-info-block",children:[e.jsx("h4",{children:"Requirements"}),e.jsx("p",{children:n.requirements})]}),e.jsxs("div",{className:"apb-info-meta",children:[(n==null?void 0:n.location)&&e.jsxs("div",{className:"apb-meta-row",children:[e.jsx(xt,{}),e.jsx("span",{children:n.location})]}),(n==null?void 0:n.employment_type)&&e.jsxs("div",{className:"apb-meta-row",children:[e.jsx(At,{}),e.jsx("span",{children:n.employment_type})]}),e.jsxs("div",{className:"apb-meta-row",children:[e.jsx(qt,{}),e.jsxs("span",{children:["Closes ",V(n==null?void 0:n.expire_date)]})]})]})]})}),e.jsxs("div",{className:"apb-form-area",children:[e.jsxs("div",{className:"apb-steps",children:[e.jsxs("div",{className:`apb-step ${j>=1?"active":""} ${j>1?"done":""}`,children:[e.jsx("div",{className:"apb-step-dot",children:j>1?e.jsx(lo,{}):"1"}),e.jsx("span",{children:"Your Details"})]}),e.jsx("div",{className:"apb-step-line"}),e.jsxs("div",{className:`apb-step ${j===2?"active":""}`,children:[e.jsx("div",{className:"apb-step-dot",children:"2"}),e.jsx("span",{children:"Review & Submit"})]})]}),j===1&&e.jsxs("div",{className:"apb-card",children:[e.jsx("h2",{className:"apb-card-title",children:"Your Application"}),e.jsxs("form",{onSubmit:D,children:[e.jsx("style",{children:`
                                        .spinner-small {
                                            width: 22px;
                                            height: 22px;
                                            border: 2px solid rgba(200, 169, 81, 0.15);
                                            border-top-color: var(--gold-accent, #c8a951);
                                            border-radius: 50%;
                                            animation: spin-cv 0.8s linear infinite;
                                        }
                                        @keyframes spin-cv {
                                            to { transform: rotate(360deg); }
                                        }
                                    `}),e.jsxs("div",{className:"apb-fieldset-label",style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"},children:[e.jsx("span",{children:"Quick Apply: Upload Your CV"}),e.jsxs("span",{style:{fontSize:"0.75rem",color:"var(--gold-accent)",fontWeight:"bold",background:"rgba(200, 169, 81, 0.08)",padding:"3px 10px",borderRadius:"100px",border:"1px solid rgba(200,169,81,0.15)",display:"inline-flex",alignItems:"center",gap:"5px"},children:[e.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:"#10b981",display:"inline-block"}}),"✨ Gemini AI Auto-Fill Enabled"]})]}),e.jsxs("div",{className:"apb-upload",style:{position:"relative",border:S?"2px dashed var(--gold-accent)":"2px dashed var(--border-light)",cursor:S?"not-allowed":"pointer"},onClick:()=>!S&&document.getElementById("cv-file").click(),children:[e.jsx("input",{id:"cv-file",type:"file",accept:".pdf",style:{display:"none"},onChange:A,disabled:S}),S?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px",width:"100%",padding:"4px 0"},children:[e.jsx("div",{className:"spinner-small",style:{flexShrink:0}}),e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{className:"apb-upload-text",style:{color:"var(--gold-accent)",fontWeight:800},children:"Steuart AI is parsing your resume..."}),e.jsx("div",{className:"apb-upload-hint",children:"Extracting contact details, qualifications, and experience. Please wait."})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`apb-upload-icon ${v.cv?"has-file":""}`,children:v.cv?e.jsx(lo,{size:22}):e.jsx(Rb,{size:22})}),e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{className:"apb-upload-text",children:v.cv?v.cv.name:"Click here to upload your PDF CV"}),e.jsx("div",{className:"apb-upload-hint",children:"Upload a PDF resume to instantly pre-fill all form details in a single click!"})]})]})]}),e.jsx("div",{className:"apb-fieldset-label",children:"Personal Information"}),e.jsxs("div",{className:"apb-grid2",children:[e.jsxs("div",{className:"apb-field",children:[e.jsxs("label",{children:["First Name ",e.jsx("span",{className:"req",children:"*"})]}),e.jsxs("div",{className:"apb-iw",children:[e.jsx(kr,{className:"apb-ico"}),e.jsx("input",{type:"text",name:"first_name",className:"apb-input",value:v.first_name,onChange:g,placeholder:"First name",required:!0})]})]}),e.jsxs("div",{className:"apb-field",children:[e.jsxs("label",{children:["Last Name ",e.jsx("span",{className:"req",children:"*"})]}),e.jsxs("div",{className:"apb-iw",children:[e.jsx(kr,{className:"apb-ico"}),e.jsx("input",{type:"text",name:"last_name",className:"apb-input",value:v.last_name,onChange:g,placeholder:"Last name",required:!0})]})]}),e.jsxs("div",{className:"apb-field",children:[e.jsxs("label",{children:["Email ",e.jsx("span",{className:"req",children:"*"})]}),e.jsxs("div",{className:"apb-iw",children:[e.jsx(cr,{className:"apb-ico"}),e.jsx("input",{type:"email",name:"email",className:"apb-input",value:v.email,onChange:g,placeholder:"you@example.com",required:!0})]})]}),e.jsxs("div",{className:"apb-field",children:[e.jsxs("label",{children:["Contact Number ",e.jsx("span",{className:"req",children:"*"})]}),e.jsxs("div",{className:"apb-iw",children:[e.jsx(sd,{className:"apb-ico"}),e.jsx("input",{type:"tel",name:"contact_number",className:"apb-input",value:v.contact_number,onChange:g,placeholder:"+94 77 123 4567",required:!0})]})]})]}),e.jsx("div",{className:"apb-fieldset-label",children:"Professional Profile"}),e.jsxs("div",{className:"apb-grid2",children:[e.jsxs("div",{className:"apb-field",children:[e.jsxs("label",{children:["Highest Qualification ",e.jsx("span",{className:"req",children:"*"})]}),e.jsxs("div",{className:"apb-iw",children:[e.jsx(Oh,{className:"apb-ico"}),e.jsxs("select",{name:"qualification",className:"apb-input apb-sel",value:v.qualification,onChange:g,required:!0,children:[e.jsx("option",{value:"",children:"Select"}),Zb.map(G=>e.jsx("option",{value:G,children:G},G))]})]})]}),e.jsxs("div",{className:"apb-field",children:[e.jsxs("label",{children:["Salary Expectation (LKR) ",e.jsx("span",{className:"req",children:"*"})]}),e.jsxs("div",{className:"apb-iw",children:[e.jsx(kb,{className:"apb-ico"}),e.jsx("input",{type:"text",name:"salary_expectation",className:"apb-input",value:v.salary_expectation,onChange:g,placeholder:"e.g. 150,000",required:!0})]})]}),e.jsxs("div",{className:"apb-field",children:[e.jsxs("label",{children:["Total Experience ",e.jsx("span",{className:"req",children:"*"})]}),e.jsxs("div",{className:"apb-iw",children:[e.jsx(ln,{className:"apb-ico"}),e.jsxs("select",{name:"overall_experience",className:"apb-input apb-sel",value:v.overall_experience,onChange:g,required:!0,children:[e.jsx("option",{value:"",children:"Select"}),e.jsx("option",{value:"0 years",children:"0 years (Fresher)"}),e.jsx("option",{value:"0-1 years",children:"0–1 years"}),e.jsx("option",{value:"1-2 years",children:"1–2 years"}),e.jsx("option",{value:"3-4 years",children:"3–4 years"}),e.jsx("option",{value:"5-7 years",children:"5–7 years"}),e.jsx("option",{value:"8-10 years",children:"8–10 years"}),e.jsx("option",{value:"10+ years",children:"10+ years"})]})]})]}),e.jsxs("div",{className:"apb-field",children:[e.jsxs("label",{children:["Relevant Experience ",e.jsx("span",{className:"req",children:"*"})]}),e.jsxs("div",{className:"apb-iw",children:[e.jsx(ln,{className:"apb-ico"}),e.jsxs("select",{name:"relevant_experience",className:"apb-input apb-sel",value:v.relevant_experience,onChange:g,required:!0,children:[e.jsx("option",{value:"",children:"Select"}),e.jsx("option",{value:"0 years",children:"0 years (Fresher)"}),e.jsx("option",{value:"0-1 years",children:"0–1 years"}),e.jsx("option",{value:"1-2 years",children:"1–2 years"}),e.jsx("option",{value:"3-4 years",children:"3–4 years"}),e.jsx("option",{value:"5-7 years",children:"5–7 years"}),e.jsx("option",{value:"8-10 years",children:"8–10 years"}),e.jsx("option",{value:"10+ years",children:"10+ years"})]})]})]})]}),e.jsxs("div",{className:"apb-consent",children:[e.jsx("input",{type:"checkbox",id:"priv",checked:w,onChange:G=>_(G.target.checked),required:!0}),e.jsxs("label",{htmlFor:"priv",children:["I agree my personal information may be processed for recruitment purposes per the ",e.jsx("a",{href:"#",children:"Privacy Policy"}),"."]})]}),e.jsxs("div",{className:"apb-talent-pool",children:[e.jsxs("div",{className:"apb-tp-header",children:[e.jsx("span",{className:"apb-tp-emoji",children:"📂"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Keep my CV for future opportunities?"}),e.jsx("p",{children:"HR can reach out for future roles — no need to apply again."})]})]}),e.jsxs("div",{className:"apb-tp-btns",children:[e.jsx("button",{type:"button",className:`apb-tp-btn yes ${v.future_consent===!0?"sel":""}`,onClick:()=>x({...v,future_consent:!0}),children:"✅ Yes, keep my CV"}),e.jsx("button",{type:"button",className:`apb-tp-btn no ${v.future_consent===!1&&v.future_consent!==null?"sel":""}`,onClick:()=>x({...v,future_consent:!1}),children:"🚫 This role only"})]}),v.future_consent===!0&&e.jsx("div",{className:"apb-tp-note yes",children:"🎉 Your CV will be kept in our Talent Pool."}),v.future_consent===!1&&e.jsx("div",{className:"apb-tp-note no",children:"Only used for this application."})]}),e.jsxs("button",{type:"submit",className:"apb-submit",disabled:!w,style:{opacity:w?1:.6,cursor:w?"pointer":"not-allowed"},children:["Review Application ",e.jsx(Tr,{})]})]})]}),j===2&&e.jsxs("div",{className:"apb-card",children:[e.jsx("h2",{className:"apb-card-title",children:"Review Your Application"}),e.jsxs("div",{className:"apb-review-block",children:[e.jsx("div",{className:"apb-rev-section",children:"Personal Information"}),e.jsx("div",{className:"apb-grid2",children:[["First Name",v.first_name],["Last Name",v.last_name],["Email",v.email],["Phone",v.contact_number]].map(([G,fe])=>e.jsxs("div",{className:"apb-rv-item",children:[e.jsx("span",{className:"apb-rv-lbl",children:G}),e.jsx("span",{className:"apb-rv-val",children:fe})]},G))})]}),e.jsxs("div",{className:"apb-review-block",children:[e.jsx("div",{className:"apb-rev-section",children:"Professional Profile"}),e.jsx("div",{className:"apb-grid2",children:[["Qualification",v.qualification],["Salary",v.salary_expectation||"—"],["Total Exp.",v.overall_experience],["Relevant Exp.",v.relevant_experience]].map(([G,fe])=>e.jsxs("div",{className:"apb-rv-item",children:[e.jsx("span",{className:"apb-rv-lbl",children:G}),e.jsx("span",{className:"apb-rv-val",children:fe})]},G))})]}),e.jsxs("div",{className:"apb-review-block",children:[e.jsx("div",{className:"apb-rev-section",children:"Documents & Preferences"}),e.jsxs("div",{className:"apb-rv-doc",children:[e.jsx(qr,{}),e.jsx("span",{children:(U=v.cv)==null?void 0:U.name})]}),e.jsxs("div",{className:"apb-rv-item",style:{marginTop:12},children:[e.jsx("span",{className:"apb-rv-lbl",children:"Future Opportunities"}),e.jsx("span",{className:"apb-rv-val",style:{color:v.future_consent?"var(--success)":"var(--text-muted)"},children:v.future_consent?"Yes — keep my CV on file":"No — this role only"})]})]}),e.jsxs("div",{className:"apb-disclosure",style:{fontWeight:700,color:"#b8860b",background:"rgba(184,134,11,0.08)",border:"1px solid rgba(184,134,11,0.3)",borderRadius:"8px",padding:"10px 14px"},children:[e.jsx(Lr,{size:14,style:{marginRight:6,verticalAlign:"middle",color:"#b8860b"}}),e.jsx("strong",{children:"By submitting, you confirm all information is accurate and complete. "})]}),e.jsxs("div",{className:"apb-review-actions",children:[e.jsxs("button",{className:"apb-edit-btn",onClick:()=>N(1),disabled:u,children:[e.jsx(Gr,{})," Edit"]}),e.jsx("button",{className:"apb-submit apb-submit-final",onClick:B,disabled:u,children:u?"Submitting…":e.jsxs(e.Fragment,{children:[e.jsx(lo,{})," Confirm & Submit"]})})]})]})]})]})}),e.jsx("footer",{className:"footer-premium",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"footer-top-grid",children:[e.jsxs("div",{className:"footer-col brand-col",children:[e.jsx("img",{src:"/gs-logo.png",alt:"George Steuart",className:"footer-logo-premium"}),e.jsxs("h3",{className:"footer-brand-name",children:["George Steuart ",e.jsx("br",{}),e.jsx("span",{children:"& Company Ltd"})]}),e.jsx("p",{className:"footer-about-text",children:"Established in 1835, Sri Lanka's oldest mercantile firm."}),e.jsxs("div",{className:"footer-socials",children:[e.jsx("a",{href:"https://www.facebook.com/GeorgeSteuarts",target:"_blank",rel:"noopener noreferrer",className:"social-link",children:e.jsx(rd,{})}),e.jsx("a",{href:"https://www.linkedin.com/company/george-steuart-&-company-limited",target:"_blank",rel:"noopener noreferrer",className:"social-link",children:e.jsx(ad,{})})]})]}),e.jsxs("div",{className:"footer-col links-col",children:[e.jsx("h4",{className:"footer-col-title",children:"Quick Links"}),e.jsxs("ul",{className:"footer-links-list",children:[e.jsx("li",{children:e.jsx(tt,{to:"/",children:"Home"})}),e.jsx("li",{children:e.jsx(tt,{to:"/vacancies",children:"All Vacancies"})}),e.jsx("li",{children:e.jsx(tt,{to:"/admin/login",children:"Admin Portal"})})]})]}),e.jsxs("div",{className:"footer-col contact-col",children:[e.jsx("h4",{className:"footer-col-title",children:"Get In Touch"}),e.jsxs("div",{className:"footer-contact-info",children:[e.jsxs("p",{children:[e.jsx(xt,{className:"c-icon"})," No. 439, Galle Road, Colombo 03."]}),e.jsxs("p",{children:[e.jsx(Ts,{className:"c-icon"})," www.georgesteuart.lk"]}),e.jsxs("div",{className:"contact-numbers",children:[e.jsxs("p",{children:[e.jsx("span",{children:"T:"})," +94 117 792 400"]}),e.jsxs("p",{children:[e.jsx("span",{children:"E:"})," info@georgesteuart.lk"]})]})]})]}),e.jsx("div",{className:"footer-bottom-bar",children:e.jsxs("div",{className:"copyright-area",children:["© ",new Date().getFullYear()," George Steuart & Company Ltd. All Rights Reserved."]})})]})})})]})}const Jb=Et.replace("/api","");function ey(){var n;const a=(n=Ir().state)==null?void 0:n.vacancy;return e.jsxs("div",{className:"success-page-v2",children:[e.jsx("div",{className:"success-v2-bg"}),e.jsx("nav",{className:"navbar",style:{background:"transparent",border:"none",position:"absolute",top:0,width:"100%",zIndex:20},children:e.jsxs(tt,{to:"/",className:"navbar-brand",children:[e.jsx("img",{src:"/gs-logo.png",alt:"George Steuart & Co",className:"navbar-logo",style:{filter:"brightness(0) invert(1)"}}),e.jsxs("div",{children:[e.jsx("div",{className:"navbar-title",style:{color:"#fff"},children:"George Steuart"}),e.jsx("div",{className:"navbar-subtitle",style:{color:"rgba(255,255,255,0.7)"},children:"Careers"})]})]})}),e.jsx("div",{className:"success-v2-container",children:e.jsxs("div",{className:"success-v2-card",children:[e.jsx("div",{className:"success-v2-company-logo animate-fade-in",style:{marginBottom:"24px",display:"flex",justifyContent:"center"},children:e.jsx("div",{style:{width:"80px",height:"80px",background:"#fff",borderRadius:"16px",padding:"12px",boxShadow:"0 10px 30px rgba(0,0,0,0.08)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("img",{src:a!=null&&a.company_logo?`${Jb}/uploads/logos/${a.company_logo}`:"/gs-logo.png",alt:(a==null?void 0:a.company_name)||"George Steuart",onError:o=>o.target.src="/gs-logo.png",style:{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}})})}),e.jsx("div",{className:"success-v2-stamp",children:e.jsx(lo,{strokeWidth:3})}),e.jsx("div",{className:"success-v2-badge",children:"Application Successful"}),e.jsx("h1",{className:"success-v2-title",children:"Legacy Awaits"}),e.jsx("div",{className:"success-v2-message",children:a?e.jsxs("p",{children:["Thank you for your interest in joining ",e.jsx("strong",{children:a.company_name}),". Your application for ",e.jsx("strong",{children:a.title})," has been safely received."]}):e.jsx("p",{children:"Thank you for your interest in joining George Steuart & Company. Your application has been successfully submitted."})}),e.jsxs("div",{className:"v2-next-steps",children:[e.jsxs("div",{className:"next-step-item",children:[e.jsx("div",{className:"next-step-icon",children:e.jsx(cr,{})}),e.jsxs("div",{className:"next-step-content",children:[e.jsx("h5",{children:"Review Process"}),e.jsx("p",{children:"Our team will carefully review your credentials against our heritage of excellence."})]})]}),e.jsxs("div",{className:"next-step-item",children:[e.jsx("div",{className:"next-step-icon",children:e.jsx(qt,{})}),e.jsxs("div",{className:"next-step-content",children:[e.jsx("h5",{children:"Timeline"}),e.jsx("p",{children:"Expect to hear back from us within the coming weeks for potential interviews."})]})]}),e.jsxs("div",{className:"next-step-item",children:[e.jsx("div",{className:"next-step-icon",children:e.jsx(xt,{})}),e.jsxs("div",{className:"next-step-content",children:[e.jsx("h5",{children:"Stay Connected"}),e.jsx("p",{children:"Follow our LinkedIn for more updates on career opportunities and firm news."})]})]})]}),e.jsx("div",{className:"success-v2-actions",children:e.jsxs(tt,{to:"/vacancies",className:"btn-v2-outline",children:[e.jsx(Gr,{})," Return to Vacancies"]})})]})}),e.jsxs("div",{style:{padding:"30px",textAlign:"center",color:"rgba(0,0,0,0.4)",fontSize:"0.85rem",position:"relative",zIndex:10},children:["© ",new Date().getFullYear()," George Steuart & Company Ltd. All rights reserved."]})]})}function ty(){const s=Ut(),[a,n]=F.useState({username:"",password:""}),[o,l]=F.useState(!1),d=async u=>{var f,h;if(u.preventDefault(),!a.username||!a.password){me.error("Please fill in all fields");return}l(!0);try{const b=await Dv(a);localStorage.setItem("gs_admin_token",b.data.data.token),localStorage.setItem("gs_admin_data",JSON.stringify(b.data.data.admin)),me.success("Access Granted. Orchestrating Console..."),s("/admin")}catch(b){me.error(((h=(f=b.response)==null?void 0:f.data)==null?void 0:h.message)||"Authentication failed")}finally{l(!1)}};return e.jsxs("div",{className:"login-split-page",children:[e.jsxs("div",{className:"login-branding-panel",children:[e.jsx("div",{className:"branding-overlay"}),e.jsx("img",{src:"/admin-branding.png",alt:"Branding",className:"branding-bg"}),e.jsxs("div",{className:"branding-content",children:[e.jsx("img",{src:"/gs-logo.png",alt:"GS Logo",className:"branding-logo"}),e.jsxs("div",{className:"branding-text",children:[e.jsx("span",{className:"est-badge",children:"ESTD 1835"}),e.jsxs("h1",{className:"serif-title",children:["Heritage. ",e.jsx("br",{}),"Trust. ",e.jsx("br",{}),"Excellence."]}),e.jsx("p",{children:"Recruitment Orchestration Console v4.0"})]}),e.jsx("div",{className:"branding-footer",children:e.jsxs("div",{className:"secure-badge",children:[e.jsx(Bt,{})," SECURED END-TO-END"]})})]})]}),e.jsxs("div",{className:"login-form-panel",children:[e.jsxs("button",{className:"back-home-minimal",onClick:()=>s("/"),children:[e.jsx(Gr,{})," Return to Portals"]}),e.jsxs("div",{className:"login-glass-container animated-fade-in",children:[e.jsxs("div",{className:"login-header-p",children:[e.jsx("div",{className:"access-icon",children:e.jsx(Fa,{})}),e.jsx("h2",{children:"System Access"}),e.jsx("p",{children:"Please provide your administrative credentials to continue."})]}),e.jsxs("form",{className:"premium-login-form",onSubmit:d,children:[e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"username",children:[e.jsx(kr,{})," USERNAME"]}),e.jsx("input",{id:"username",name:"username",type:"text",placeholder:"Enter operational handle",autoComplete:"username",value:a.username,onChange:u=>n({...a,username:u.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"password",children:[e.jsx(Fa,{})," SECURITY PASSWORD"]}),e.jsx("input",{id:"password",name:"password",type:"password",placeholder:"••••••••",autoComplete:"current-password",value:a.password,onChange:u=>n({...a,password:u.target.value}),required:!0})]}),e.jsxs("div",{className:"auth-actions",children:[e.jsxs("label",{className:"remember-me",children:[e.jsx("input",{type:"checkbox"})," Keep me signed in"]}),e.jsx("button",{type:"button",onClick:()=>{if(!a.username){me.warning("Please enter your username first");return}s(`/admin/forgot-password?username=${encodeURIComponent(a.username)}`)},className:"forgot-pass-btn",style:{background:"none",border:"none",color:"var(--crimson)",fontWeight:700,cursor:"pointer",padding:0},children:"Forgot?"})]}),e.jsx("button",{type:"submit",className:"login-btn-premium",disabled:o,children:o?e.jsx("div",{className:"spinner-small"}):e.jsxs(e.Fragment,{children:["AUTHORIZE SESSION ",e.jsx(Tt,{style:{marginLeft:8}})]})})]}),e.jsxs("div",{className:"signup-redirect",children:["Don't have a tactical account? ",e.jsx(tt,{to:"/admin/signup",children:"Register Super Admin"})]})]}),e.jsx("div",{className:"login-footer-p",children:"© 2026 George Steuart & Company Limited. All Rights Reserved."})]}),e.jsx("style",{jsx:"true",children:`
                .login-split-page {
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    min-height: 100vh;
                    background: #fcfcfd;
                    overflow: hidden;
                }

                @media (max-width: 992px) {
                    .login-split-page { grid-template-columns: 1fr; }
                    .login-branding-panel { display: none; }
                }

                /* Branding Panel */
                .login-branding-panel {
                    position: relative;
                    height: 100vh;
                    overflow: hidden;
                    background: #2a050b;
                }

                .branding-bg {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.6;
                    filter: saturate(0.8) contrast(1.1);
                }

                .branding-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to right, #2a050b 0%, transparent 60%, rgba(0,0,0,0.6) 100%);
                    z-index: 1;
                }

                .branding-content {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    padding: 60px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .branding-logo { width: 140px; filter: brightness(0) invert(1); }

                .est-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    background: rgba(200, 169, 81, 0.2);
                    border: 1px solid rgba(200, 169, 81, 0.3);
                    color: var(--gold-accent);
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    border-radius: 4px;
                    margin-bottom: 24px;
                }

                .serif-title {
                    font-family: var(--font-heading);
                    font-size: 3.5rem;
                    color: #fff;
                    line-height: 0.95;
                    margin: 0;
                    letter-spacing: -2px;
                }

                .branding-text p {
                    color: rgba(255,255,255,0.6);
                    font-size: 1.1rem;
                    margin-top: 24px;
                    letter-spacing: 0.5px;
                }

                .secure-badge {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: rgba(255,255,255,0.4);
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 1px;
                }

                /* Form Panel */
                .login-form-panel {
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    background: radial-gradient(circle at 10% 20%, #f1f5f9 0%, #ffffff 100%);
                }

                .back-home-minimal {
                    position: absolute;
                    top: 40px;
                    right: 40px;
                    background: none;
                    border: none;
                    color: #94a3b8;
                    font-size: 0.9rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .back-home-minimal:hover { color: var(--crimson); transform: translateX(-5px); }

                .login-glass-container {
                    width: 100%;
                    max-width: 440px;
                }

                .login-header-p { text-align: center; margin-bottom: 40px; }
                .access-icon {
                    width: 64px; height: 64px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    display: flex;
                    align-items: center; justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 1.6rem;
                    color: var(--crimson);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.02);
                }

                .login-header-p h2 { font-family: var(--font-heading); font-size: 1.8rem; margin: 0; color: #1e293b; }
                .login-header-p p { color: #64748b; margin-top: 8px; font-size: 0.9rem; }

                .form-group-p { margin-bottom: 24px; }
                .form-group-p label {
                    display: block;
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #94a3b8;
                    margin-bottom: 10px;
                    letter-spacing: 1.5px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .form-group-p input {
                    width: 100%;
                    padding: 16px 20px;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    font-size: 1rem;
                    color: #1e293b;
                    transition: all 0.2s;
                    box-shadow: var(--shadow-sm);
                }

                .form-group-p input:focus {
                    border-color: var(--gold-accent);
                    box-shadow: 0 0 0 4px rgba(200, 169, 81, 0.1);
                    transform: translateY(-2px);
                    outline: none;
                }

                .auth-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                    font-size: 0.85rem;
                }

                .remember-me { color: #64748b; display: flex; align-items: center; gap: 8px; cursor: pointer; }
                .forgot-pass { color: var(--crimson); font-weight: 700; cursor: pointer; }

                .login-btn-premium {
                    width: 100%;
                    padding: 18px;
                    background: #2a050b;
                    color: #fff;
                    border: none;
                    border-radius: 18px;
                    font-weight: 800;
                    font-size: 1rem;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 15px 30px rgba(42, 5, 11, 0.2);
                }

                .login-btn-premium:hover {
                    background: #4a0914;
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(42, 5, 11, 0.3);
                }

                .signup-redirect {
                    text-align: center;
                    margin-top: 32px;
                    font-size: 0.9rem;
                    color: #64748b;
                }

                .signup-redirect a { color: var(--gold-accent); font-weight: 700; text-decoration: none; }
                .signup-redirect a:hover { text-decoration: underline; }

                .login-footer-p {
                    position: absolute;
                    bottom: 40px;
                    font-size: 0.75rem;
                    color: #94a3b8;
                    letter-spacing: 0.5px;
                }

                .animated-fade-in { animation: fadeIn 0.6s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                /* Mobile Optimization */
                @media (max-width: 992px) {
                    .login-split-page { grid-template-columns: 1fr; }
                    .login-branding-panel { display: none; }
                }

                @media (max-width: 768px) {
                    .login-form-panel { padding: 40px 24px; }
                    .back-home-minimal { top: 20px; right: 24px; font-size: 0.8rem; }
                    .login-header-p h2 { font-size: 1.8rem; }
                    .serif-title { font-size: 3.5rem; }
                }

                .spinner-small {
                    width: 20px; height: 20px;
                    border: 2px solid rgba(255,255,255,0.2);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `})]})}function ry(){const s=Ut(),[a,n]=F.useState({full_name:"",username:"",email:"",password:""}),[o,l]=F.useState(!1),d=async u=>{var f,h;if(u.preventDefault(),!a.full_name||!a.username||!a.email||!a.password){me.error("All fields are required");return}if(a.password.length<6){me.error("Password must be at least 6 characters");return}l(!0);try{await qe.post("/auth.php?action=register_superadmin",a),me.success("Credential established. Redirecting to access panel..."),setTimeout(()=>s("/admin/login"),1500)}catch(b){me.error(((h=(f=b.response)==null?void 0:f.data)==null?void 0:h.message)||"Registration failed"),l(!1)}};return e.jsxs("div",{className:"login-split-page",children:[e.jsxs("div",{className:"login-branding-panel",children:[e.jsx("div",{className:"branding-overlay"}),e.jsx("img",{src:"/admin-branding.png",alt:"Branding",className:"branding-bg"}),e.jsxs("div",{className:"branding-content",children:[e.jsx("img",{src:"/gs-logo.png",alt:"GS Logo",className:"branding-logo"}),e.jsxs("div",{className:"branding-text",children:[e.jsx("span",{className:"est-badge",children:"STRATEGIC ENROLLMENT"}),e.jsxs("h1",{className:"serif-title",children:["Elevate. ",e.jsx("br",{}),"Empower. ",e.jsx("br",{}),"Execute."]}),e.jsx("p",{children:"George Steuart Recruitment System | Master Account Setup"})]}),e.jsx("div",{className:"branding-footer",children:e.jsxs("div",{className:"secure-badge",children:[e.jsx(Bt,{})," ROOT AUTHORITY PROVISIONING"]})})]})]}),e.jsxs("div",{className:"login-form-panel",children:[e.jsxs("button",{className:"back-home-minimal",onClick:()=>s("/"),children:[e.jsx(Gr,{})," Return to Portals"]}),e.jsxs("div",{className:"login-glass-container animated-fade-in",children:[e.jsxs("div",{className:"login-header-p",children:[e.jsx("div",{className:"access-icon",children:e.jsx(Bt,{})}),e.jsx("h2",{children:"Master Provisioning"}),e.jsx("p",{children:"Establish a high-authority Super Administrator account."})]}),e.jsxs("form",{className:"premium-login-form",onSubmit:d,children:[e.jsxs("div",{className:"form-grid-signup",children:[e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"full_name",children:[e.jsx(kr,{})," FULL NAME"]}),e.jsx("input",{id:"full_name",name:"full_name",type:"text",placeholder:"e.g. Alexander Steuart",autoComplete:"name",value:a.full_name,onChange:u=>n({...a,full_name:u.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"username",children:[e.jsx(kr,{})," USERNAME (ID)"]}),e.jsx("input",{id:"username",name:"username",type:"text",placeholder:"operational_handle",autoComplete:"username",value:a.username,onChange:u=>n({...a,username:u.target.value}),required:!0})]})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"email",children:[e.jsx(cr,{})," OFFICIAL EMAIL"]}),e.jsx("input",{id:"email",name:"email",type:"email",placeholder:"name@georgesteuart.com",autoComplete:"email",value:a.email,onChange:u=>n({...a,email:u.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"password",children:[e.jsx(Fa,{})," SECURE PASSPHRASE"]}),e.jsx("input",{id:"password",name:"password",type:"password",autoComplete:"new-password",placeholder:"Min. 6 high-entropy characters",value:a.password,onChange:u=>n({...a,password:u.target.value}),required:!0})]}),e.jsx("button",{type:"submit",className:"login-btn-premium",disabled:o,children:o?e.jsx("div",{className:"spinner-small"}):e.jsxs(e.Fragment,{children:["PROVISION MASTER ACCOUNT ",e.jsx(Tt,{style:{marginLeft:8}})]})})]}),e.jsxs("div",{className:"signup-redirect",children:["Already have an established profile? ",e.jsx(tt,{to:"/admin/login",children:"Authorize Access"})]})]}),e.jsx("div",{className:"login-footer-p",children:"© 2026 George Steuart & Company Limited. Global Identity System."})]}),e.jsx("style",{jsx:"true",children:`
                /* REUSING THE CORE LOGIN STYLES FOR CONSISTENCY */
                .login-split-page {
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    min-height: 100vh;
                    background: #fcfcfd;
                    overflow: hidden;
                }

                @media (max-width: 992px) {
                    .login-split-page { grid-template-columns: 1fr; }
                    .login-branding-panel { display: none; }
                }

                .login-branding-panel {
                    position: relative;
                    height: 100vh;
                    overflow: hidden;
                    background: #2a050b;
                }

                .branding-bg {
                    width: 100%; height: 100%; object-fit: cover; opacity: 0.6;
                    filter: saturate(0.8) contrast(1.1);
                }

                .branding-overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(to right, #2a050b 0%, transparent 60%, rgba(0,0,0,0.6) 100%);
                    z-index: 1;
                }

                .branding-content {
                    position: absolute; inset: 0; z-index: 2; padding: 40px;
                    display: flex; flex-direction: column; justify-content: space-between;
                }

                .branding-logo { width: 140px; filter: brightness(0) invert(1); }

                .est-badge {
                    display: inline-block; padding: 4px 12px;
                    background: rgba(200, 169, 81, 0.2); border: 1px solid rgba(200, 169, 81, 0.3);
                    color: var(--gold-accent); font-size: 0.7rem; font-weight: 800;
                    letter-spacing: 2px; border-radius: 4px; margin-bottom: 24px;
                }

                .serif-title {
                    font-family: var(--font-heading); font-size: 3.5rem; color: #fff;
                    line-height: 0.95; margin: 0; letter-spacing: -2px;
                }

                .branding-text p {
                    color: rgba(255,255,255,0.6); font-size: 1.1rem; margin-top: 24px;
                    letter-spacing: 0.5px;
                }

                .secure-badge {
                    display: flex; align-items: center; gap: 10px;
                    color: rgba(255,255,255,0.4); font-size: 0.75rem; font-weight: 700;
                    letter-spacing: 1px;
                }

                .login-form-panel {
                    padding: 40px; display: flex; flex-direction: column;
                    justify-content: center; align-items: center; position: relative;
                    background: radial-gradient(circle at 10% 20%, #f1f5f9 0%, #ffffff 100%);
                }

                .back-home-minimal {
                    position: absolute; top: 40px; right: 40px; background: none; border: none;
                    color: #94a3b8; font-size: 0.9rem; font-weight: 600; display: flex;
                    align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s;
                }
                .back-home-minimal:hover { color: var(--crimson); transform: translateX(-5px); }

                .login-glass-container { width: 100%; max-width: 440px; }

                .login-header-p { text-align: center; margin-bottom: 40px; }
                .access-icon {
                    width: 64px; height: 64px; background: #f8fafc; border: 1px solid #e2e8f0;
                    border-radius: 20px; display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 20px; font-size: 1.6rem; color: var(--crimson);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.02);
                }

                .login-header-p h2 { font-family: var(--font-heading); font-size: 1.8rem; margin: 0; color: #1e293b; }
                .login-header-p p { color: #64748b; margin-top: 8px; font-size: 0.9rem; }

                .form-grid-signup { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }

                .form-group-p { margin-bottom: 20px; }
                .form-group-p label {
                    display: flex; align-items: center; gap: 6px; font-size: 0.65rem;
                    font-weight: 800; color: #94a3b8; margin-bottom: 10px;
                    letter-spacing: 1.5px;
                }

                .form-group-p input {
                    width: 100%; padding: 14px 18px; background: #fff; border: 1px solid #e2e8f0;
                    border-radius: 14px; font-size: 1rem; color: #1e293b; transition: all 0.2s;
                    box-shadow: var(--shadow-sm);
                }
                .form-group-p input:focus {
                    border-color: var(--gold-accent); box-shadow: 0 0 0 4px rgba(200, 169, 81, 0.1);
                    transform: translateY(-2px); outline: none;
                }

                .login-btn-premium {
                    width: 100%; padding: 18px; background: #2a050b; color: #fff; border: none;
                    border-radius: 18px; font-weight: 800; font-size: 1rem; letter-spacing: 1px;
                    cursor: pointer; transition: all 0.3s; display: flex; align-items: center;
                    justify-content: center; box-shadow: 0 15px 30px rgba(42, 5, 11, 0.2);
                    margin-top: 10px;
                }
                .login-btn-premium:hover {
                    background: #4a0914; transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(42, 5, 11, 0.3);
                }

                .signup-redirect { text-align: center; margin-top: 32px; font-size: 0.9rem; color: #64748b; }
                .signup-redirect a { color: var(--gold-accent); font-weight: 700; text-decoration: none; }
                .signup-redirect a:hover { text-decoration: underline; }

                .login-footer-p {
                    position: absolute; bottom: 40px; font-size: 0.75rem; color: #94a3b8;
                    letter-spacing: 0.5px;
                }

                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                /* Mobile Optimization */
                @media (max-width: 992px) {
                    .login-split-page { grid-template-columns: 1fr; }
                    .login-branding-panel { display: none; }
                }

                @media (max-width: 768px) {
                    .login-form-panel { padding: 40px 24px; }
                    .back-home-minimal { top: 20px; right: 24px; font-size: 0.8rem; }
                    .login-header-p h2 { font-size: 1.8rem; }
                    .form-grid-signup { grid-template-columns: 1fr; gap: 0; }
                    .serif-title { font-size: 3.5rem; }
                }

                .spinner-small {
                    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.2);
                    border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `})]})}const Ef=Et.replace("/api","");function ny({admin:s,children:a}){var _;const n=Ut(),o=Ir(),[l,d]=F.useState(!1),[u,f]=F.useState(!1),[h,b]=F.useState(o.pathname.startsWith("/admin/vacancies")||o.pathname.startsWith("/admin/companies")),j=()=>{localStorage.removeItem("gs_admin_token"),localStorage.removeItem("gs_admin_data"),n("/admin/login")},N=(s.full_name||"Admin").split(" ").filter(Boolean).map(v=>v[0]).join("").substring(0,2).toUpperCase(),w=[{to:"/admin",icon:e.jsx(Nb,{}),label:"Dashboard",end:!0,badge:null},{to:"/admin/vacancies",icon:e.jsx(At,{}),label:"Vacancies",badge:null},{to:"/admin/applicants",icon:e.jsx(er,{}),label:"Applicants",badge:null},{to:"/admin/talent-pool",icon:e.jsx(Ma,{}),label:"Talent Pool",badge:null}];return s.role==="super_admin"&&w.push({to:"/admin/admins",icon:e.jsx(Tb,{}),label:"Manage Admins",badge:null}),(_=w.find(v=>v.end?o.pathname==="/admin":o.pathname.startsWith(v.to)))!=null&&_.label,e.jsxs("div",{className:`admin-layout ${u?"sidebar-collapsed":""}`,children:[e.jsxs("div",{className:"admin-mobile-header",children:[e.jsx("button",{className:"hamburger-btn",onClick:()=>d(!l),"aria-label":"Toggle Sidebar",children:l?e.jsx(ct,{size:24}):e.jsx(Ls,{size:24})}),e.jsxs("div",{className:"mobile-brand",style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("img",{src:s.role==="sub_admin"&&s.company_logo?`${Ef}/uploads/logos/${s.company_logo}`:"/gs-logo.png",alt:"George Steuart & Co",className:"sidebar-logo",onError:v=>v.target.src="/gs-logo.png",style:{height:32,width:"auto",objectFit:"contain",background:s.role==="sub_admin"&&s.company_logo?"#fff":"transparent",padding:s.role==="sub_admin"&&s.company_logo?"2px":"0",borderRadius:"4px"}}),e.jsx("span",{style:{fontWeight:800,fontSize:"0.85rem",letterSpacing:"1px",textTransform:"uppercase",color:"var(--crimson)"},children:"Admin"})]}),e.jsx("div",{style:{width:44}})]}),l&&e.jsx("div",{className:"sidebar-overlay",onClick:()=>d(!1)}),e.jsxs("aside",{className:`admin-sidebar enhanced-sidebar ${l?"open":""}`,children:[e.jsx("div",{className:"sidebar-top-accent"}),e.jsxs("div",{className:"sidebar-header",style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"8px"},children:[e.jsxs("div",{className:"sidebar-brand",style:{display:"flex",alignItems:"center",gap:"12px",flex:1,minWidth:0},children:[e.jsx("div",{className:"sidebar-logo-wrapper",children:e.jsx("img",{src:s.role==="sub_admin"&&s.company_logo?`${Ef}/uploads/logos/${s.company_logo}`:"/gs-logo.png",alt:"George Steuart & Co",className:"sidebar-logo",onError:v=>v.target.src="/gs-logo.png",style:{background:s.role==="sub_admin"&&s.company_logo?"#fff":"transparent",padding:s.role==="sub_admin"&&s.company_logo?"4px":"0",borderRadius:"8px",objectFit:"contain"}})}),e.jsxs("div",{className:"sidebar-brand-text",style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"sidebar-title",style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:s.role==="sub_admin"&&s.company_name?s.company_name:"George Steuart"}),e.jsxs("div",{className:"sidebar-role",children:[e.jsx("span",{className:"role-dot"}),s.role==="super_admin"?"Super Admin":"Sub Admin"]})]})]}),e.jsx("button",{className:"sidebar-collapse-toggle",onClick:()=>{window.innerWidth<=1024?d(!1):f(!u)},"aria-label":"Toggle Sidebar",style:{background:"none",border:"none",color:"var(--crimson)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",borderRadius:"8px",transition:"all 0.2s",flexShrink:0},onMouseEnter:v=>v.currentTarget.style.backgroundColor="rgba(139, 26, 43, 0.05)",onMouseLeave:v=>v.currentTarget.style.backgroundColor="transparent",children:e.jsx(Ls,{size:20})})]}),e.jsx("div",{className:"sidebar-nav-label",children:"NAVIGATION"}),e.jsx("nav",{className:"sidebar-nav",children:w.map(v=>{if(v.label==="Vacancies"){const x=o.pathname.startsWith("/admin/vacancies")||o.pathname.startsWith("/admin/companies");return e.jsxs("div",{className:"sidebar-dropdown-container",children:[e.jsxs("div",{className:`sidebar-link ${x?"active":""}`,onClick:()=>{b(!h),n("/admin/vacancies")},style:{cursor:"pointer"},children:[e.jsx("span",{className:"sidebar-link-icon",children:v.icon}),e.jsx("span",{className:"sidebar-link-text",children:v.label}),e.jsx(Tr,{className:"sidebar-link-arrow",size:14,style:{transform:h?"rotate(90deg)":"translateX(-4px)",opacity:1,transition:"transform 0.2s ease"}})]}),h&&e.jsxs("div",{className:"sidebar-submenu animate-slide-down",children:[e.jsxs(Zi,{to:"/admin/vacancies",end:!0,className:({isActive:g})=>`sidebar-sublink ${g?"active":""}`,onClick:()=>d(!1),children:[e.jsx("span",{className:"sidebar-sublink-bullet"}),e.jsx("span",{children:"Add Vacancies"})]}),s.role==="super_admin"&&e.jsxs(e.Fragment,{children:[e.jsxs(Zi,{to:"/admin/vacancies/reports",className:({isActive:g})=>`sidebar-sublink ${g?"active":""}`,onClick:()=>d(!1),children:[e.jsx("span",{className:"sidebar-sublink-bullet"}),e.jsx("span",{children:"Manage Vacancies"})]}),e.jsxs(Zi,{to:"/admin/companies",className:({isActive:g})=>`sidebar-sublink ${g?"active":""}`,onClick:()=>d(!1),children:[e.jsx("span",{className:"sidebar-sublink-bullet"}),e.jsx("span",{children:"Manage Company"})]})]})]})]},v.to)}return e.jsxs(Zi,{to:v.to,end:v.end,className:({isActive:x})=>`sidebar-link ${x?"active":""}`,onClick:()=>d(!1),children:[e.jsx("span",{className:"sidebar-link-icon",children:v.icon}),e.jsx("span",{className:"sidebar-link-text",children:v.label}),v.badge&&e.jsx("span",{className:"sidebar-badge",children:v.badge}),e.jsx(Tr,{className:"sidebar-link-arrow",size:14})]},v.to)})}),e.jsxs("div",{className:"sidebar-footer",children:[e.jsxs("div",{className:"sidebar-user-card",children:[e.jsxs("div",{className:"sidebar-avatar-enhanced",children:[e.jsx("span",{children:N}),e.jsx("div",{className:"avatar-online-dot"})]}),e.jsxs("div",{className:"sidebar-user-info",children:[e.jsx("div",{className:"sidebar-user-name",children:s.full_name}),e.jsx("div",{className:"sidebar-user-role",children:s.role==="super_admin"?"Super Administrator":s.company_name||"Sub Admin"})]})]}),e.jsxs("button",{className:"sidebar-logout-btn",onClick:j,children:[e.jsx(_b,{size:15}),e.jsx("span",{children:"Sign Out"})]})]})]}),e.jsx("main",{className:"admin-content",children:a}),e.jsx("style",{jsx:"true",children:`
                /* ── ENHANCED SIDEBAR STYLES ── */
                .enhanced-sidebar {
                    background: #fff;
                    border-right: 1px solid rgba(0,0,0,0.05);
                    box-shadow: 4px 0 24px rgba(139, 26, 43, 0.06);
                }

                .sidebar-top-accent {
                    height: 3px;
                    background: linear-gradient(90deg, var(--crimson), var(--gold-accent, #C8A951), var(--crimson));
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                }

                .sidebar-logo-wrapper {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid rgba(0,0,0,0.06);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fafafa;
                    flex-shrink: 0;
                }

                .sidebar-role {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .role-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #10b981;
                    box-shadow: 0 0 6px rgba(16,185,129,0.5);
                    animation: pulsate 2s infinite;
                }

                @keyframes pulsate {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(0.85); }
                }

                .sidebar-nav-label {
                    font-size: 0.6rem;
                    font-weight: 800;
                    color: #cbd5e1;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    padding: 16px 20px 6px;
                }

                .sidebar-link {
                    position: relative;
                    overflow: hidden;
                }

                .sidebar-link-icon {
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                    width: 20px;
                }

                .sidebar-link-text {
                    flex: 1;
                    font-weight: 600;
                    font-size: 0.88rem;
                    transition: all 0.3s ease;
                }

                .sidebar-link-arrow {
                    opacity: 0;
                    transform: translateX(-4px);
                    transition: all 0.3s ease;
                    color: var(--gold-accent, #C8A951);
                }

                .sidebar-link:hover .sidebar-link-arrow,
                .sidebar-link.active .sidebar-link-arrow {
                    opacity: 1;
                    transform: translateX(0);
                }

                .sidebar-badge {
                    background: var(--crimson);
                    color: #fff;
                    font-size: 0.65rem;
                    font-weight: 800;
                    padding: 2px 7px;
                    border-radius: 100px;
                    min-width: 20px;
                    text-align: center;
                }

                .sidebar-link.active {
                    background: linear-gradient(135deg, rgba(139, 26, 43, 0.08), rgba(139, 26, 43, 0.04));
                    color: var(--crimson);
                    border-right: 3px solid var(--crimson);
                    font-weight: 700;
                }

                .sidebar-link.active .sidebar-link-icon {
                    color: var(--crimson);
                    transform: scale(1.1);
                }

                .sidebar-link:hover:not(.active) {
                    background: rgba(0,0,0,0.025);
                    padding-left: 26px;
                }

                /* Submenu / Dropdown Styles */
                .sidebar-submenu {
                    padding-left: 24px;
                    margin-top: 4px;
                    margin-bottom: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .sidebar-sublink {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 16px;
                    color: #64748b;
                    font-size: 0.82rem;
                    font-weight: 600;
                    text-decoration: none;
                    border-radius: 10px;
                    transition: all 0.25s ease;
                }

                .sidebar-sublink-bullet {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #cbd5e1;
                    transition: all 0.25s ease;
                }

                .sidebar-sublink:hover {
                    color: var(--crimson);
                    background: rgba(139, 26, 43, 0.03);
                    padding-left: 20px;
                }

                .sidebar-sublink:hover .sidebar-sublink-bullet {
                    background: var(--crimson);
                    transform: scale(1.3);
                }

                .sidebar-sublink.active {
                    color: var(--crimson);
                    background: linear-gradient(135deg, rgba(139, 26, 43, 0.05), rgba(139, 26, 43, 0.02));
                    font-weight: 700;
                }

                .sidebar-sublink.active .sidebar-sublink-bullet {
                    background: var(--crimson);
                    transform: scale(1.4);
                    box-shadow: 0 0 6px rgba(139, 26, 43, 0.4);
                }

                .animate-slide-down {
                    animation: slideDown 0.25s ease-out;
                }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* User Card */
                .sidebar-user-card {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    background: linear-gradient(135deg, #fafafa, #f1f5f9);
                    border-radius: 14px;
                    border: 1px solid #f1f5f9;
                    margin-bottom: 12px;
                    cursor: default;
                }

                .sidebar-avatar-enhanced {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, var(--crimson), #6B1420);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: #fff;
                    flex-shrink: 0;
                    position: relative;
                    box-shadow: 0 4px 12px rgba(139, 26, 43, 0.25);
                }

                .avatar-online-dot {
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 10px;
                    height: 10px;
                    background: #10b981;
                    border: 2px solid #fff;
                    border-radius: 50%;
                }

                .sidebar-user-info {
                    flex: 1;
                    min-width: 0;
                }

                .sidebar-user-name {
                    font-size: 0.82rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .sidebar-user-role {
                    font-size: 0.7rem;
                    color: var(--text-muted);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .sidebar-logout-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    width: 100%;
                    padding: 10px 14px;
                    background: rgba(220, 38, 38, 0.06);
                    border: 1px solid rgba(220, 38, 38, 0.1);
                    color: #dc2626;
                    border-radius: 12px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: var(--font-body);
                    justify-content: center;
                }

                .sidebar-logout-btn:hover {
                    background: rgba(220, 38, 38, 0.1);
                    border-color: rgba(220, 38, 38, 0.2);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
                }

                /* ── COLLAPSED STATE STYLES ── */
                @media (min-width: 1025px) {
                    .admin-layout.sidebar-collapsed .enhanced-sidebar {
                        width: 76px;
                    }
                    
                    .admin-layout.sidebar-collapsed .admin-content {
                        margin-left: 76px;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-brand-text,
                    .admin-layout.sidebar-collapsed .sidebar-link-text,
                    .admin-layout.sidebar-collapsed .sidebar-link-arrow,
                    .admin-layout.sidebar-collapsed .sidebar-nav-label,
                    .admin-layout.sidebar-collapsed .sidebar-user-info,
                    .admin-layout.sidebar-collapsed .sidebar-logout-btn span,
                    .admin-layout.sidebar-collapsed .sidebar-submenu {
                        display: none !important;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-logo-wrapper {
                        width: 36px;
                        height: 36px;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-brand {
                        justify-content: center;
                        gap: 0;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-header {
                        padding: 0 10px 20px;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-link {
                        justify-content: center;
                        padding: 12px;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-link-icon {
                        margin: 0;
                        width: auto;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-user-card {
                        padding: 6px;
                        justify-content: center;
                        background: none;
                        border: none;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-avatar-enhanced {
                        margin: 0;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-logout-btn {
                        padding: 10px;
                        background: none;
                        border: none;
                        color: #dc2626;
                    }
                    
                    .admin-layout.sidebar-collapsed .sidebar-logout-btn:hover {
                        background: rgba(220, 38, 38, 0.08);
                        box-shadow: none;
                    }
                }
            `})]})}const ay=Et.replace("/api","");function to(s,a=1200,n=!0){const[o,l]=F.useState(0);return F.useEffect(()=>{if(!n||!s){l(s||0);return}let d=null;const u=f=>{d||(d=f);const h=Math.min((f-d)/a,1),b=1-Math.pow(1-h,3);l(Math.floor(b*s)),h<1&&requestAnimationFrame(u)};requestAnimationFrame(u)},[s,n]),o}function sy({admin:s}){var T,E,A;const[a,n]=F.useState(null),[o,l]=F.useState([]),[d,u]=F.useState(!0),[f,h]=F.useState(!1),b=Ut();F.useEffect(()=>{j()},[]);const j=async()=>{var D,B;try{const[V,U]=await Promise.all([Rh(),zo()]);n(((D=V==null?void 0:V.data)==null?void 0:D.data)||null),l((((B=U==null?void 0:U.data)==null?void 0:B.data)||[]).slice(0,5))}catch(V){console.error(V)}finally{u(!1),setTimeout(()=>h(!0),100)}},N=to((a==null?void 0:a.total_vacancies)||0,1e3,f),w=to((a==null?void 0:a.active_vacancies)||0,1e3,f),_=to((a==null?void 0:a.total_applications)||0,1200,f),v=to((a==null?void 0:a.talent_pool_count)||0,1e3,f);if(d)return e.jsx("div",{className:"dashboard-loading-screen",children:e.jsx("div",{className:"loading-orb"})});const x=((s==null?void 0:s.full_name)||(s==null?void 0:s.username)||"Admin").split(" ")[0],g=new Date().getHours(),S=g<12?"Good morning":g<17?"Good afternoon":"Good evening",z=(a==null?void 0:a.total_vacancies)>0?Math.round((a==null?void 0:a.active_vacancies)/(a==null?void 0:a.total_vacancies)*100):0;return e.jsxs("div",{className:"premium-dashboard-container",children:[e.jsxs("div",{className:"dashboard-hero-premium",children:[e.jsxs("div",{className:"hero-content-p",children:[e.jsxs("div",{className:"hero-badge-p",children:[e.jsx(Po,{})," System Executive Suite"]}),e.jsxs("h1",{className:"hero-title-p",children:[S,", ",x]}),e.jsx("p",{className:"hero-subtitle-p",children:"George Steuart Recruitment Orchestration Console · Established 1835"})]}),e.jsxs("div",{className:"hero-actions-p",children:[e.jsxs("button",{className:"btn-hero-p primary",onClick:()=>b("/admin/vacancies/create"),children:[e.jsx(Da,{})," New Vacancy"]}),e.jsxs("button",{className:"btn-hero-p secondary",onClick:()=>b("/admin/applicants"),children:[e.jsx(er,{})," Review Pipeline"]})]}),e.jsx("div",{className:"hero-bg-accent"}),e.jsx("div",{className:"hero-grid-pattern"})]}),e.jsxs("div",{className:"stats-mosaic-grid admin-grid-4",children:[e.jsxs("div",{className:"stat-glass-card gold",style:{animationDelay:"0.1s"},children:[e.jsx("div",{className:"s-icon",children:e.jsx(At,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Total Listings"}),e.jsx("span",{className:"s-value",children:N})]}),e.jsx("div",{className:"s-progress-bar",children:e.jsx("div",{className:"s-progress-fill gold-fill",style:{width:"100%"}})}),e.jsxs("div",{className:"s-trend",children:[e.jsx(To,{})," Global Overview"]})]}),e.jsxs("div",{className:"stat-glass-card green",style:{animationDelay:"0.2s"},children:[e.jsx("div",{className:"s-icon",children:e.jsx(Tt,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Live Channels"}),e.jsx("span",{className:"s-value",children:w})]}),e.jsx("div",{className:"s-progress-bar",children:e.jsx("div",{className:"s-progress-fill green-fill",style:{width:`${z}%`}})}),e.jsxs("div",{className:"s-trend positive",children:[e.jsx(Ih,{})," ",z,"% Active Rate"]})]}),e.jsxs("div",{className:"stat-glass-card blue",style:{animationDelay:"0.3s"},children:[e.jsx("div",{className:"s-icon",children:e.jsx(er,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Engagement"}),e.jsx("span",{className:"s-value",children:_})]}),e.jsx("div",{className:"s-progress-bar",children:e.jsx("div",{className:"s-progress-fill blue-fill",style:{width:"75%"}})}),e.jsx("div",{className:"s-trend",children:"Total Submissions"})]}),e.jsxs("div",{className:"stat-glass-card purple",style:{animationDelay:"0.4s"},children:[e.jsx("div",{className:"s-icon",children:e.jsx(Ma,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Talent Reserve"}),e.jsx("span",{className:"s-value",children:v})]}),e.jsx("div",{className:"s-progress-bar",children:e.jsx("div",{className:"s-progress-fill purple-fill",style:{width:"60%"}})}),e.jsx("div",{className:"s-trend",children:"Future Insights"})]})]}),e.jsxs("div",{className:"dashboard-main-flow",children:[e.jsxs("div",{className:"main-activity-content",children:[e.jsxs("div",{className:"activity-card-p",children:[e.jsxs("div",{className:"card-header-p",children:[e.jsxs("div",{className:"ch-title",children:[e.jsx(Sb,{}),e.jsx("h3",{children:"Active Recruitment Channels"})]}),e.jsxs("button",{className:"ch-link",onClick:()=>b("/admin/vacancies"),children:["All Channels ",e.jsx(na,{})]})]}),e.jsx("div",{className:"activity-list-p",children:o.length===0?e.jsx("div",{className:"empty-state-p",children:"No active channels found."}):o.map((D,B)=>e.jsxs("div",{className:"vacancy-item-mini",style:{animationDelay:`${B*.08}s`},onClick:()=>b("/admin/applicants?vacancy_id="+D.id),children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",flex:1},children:[e.jsx("img",{src:D.company_logo?`${ay}/uploads/logos/${D.company_logo}`:"/gs-logo.png",alt:D.company_name,onError:V=>V.target.src="/gs-logo.png",style:{width:"36px",height:"36px",objectFit:"contain",borderRadius:"8px",background:"#fff",border:"1px solid #e2e8f0",padding:"3px"}}),e.jsxs("div",{className:"v-info",children:[e.jsx("strong",{children:D.title}),e.jsx("span",{children:D.company_name})]})]}),e.jsxs("div",{className:"v-metric",children:[e.jsx("span",{className:"count",children:D.application_count||0}),e.jsx("span",{className:"lbl",children:"Applicants"})]}),e.jsx("div",{className:"v-status",children:e.jsx("span",{className:`pill ${Hr(D.expire_date)>0?"live":"ending"}`,children:Hr(D.expire_date)>0?"● LIVE":"○ ENDED"})})]},D.id))})]}),e.jsxs("div",{className:"activity-card-p",children:[e.jsxs("div",{className:"card-header-p",children:[e.jsxs("div",{className:"ch-title",children:[e.jsx(Lb,{}),e.jsx("h3",{children:"Latest Applicant Pulse"})]}),e.jsxs("button",{className:"ch-link",onClick:()=>b("/admin/applicants"),children:["View Pipeline ",e.jsx(na,{})]})]}),e.jsx("div",{className:"applicant-pulse-list",children:((T=a==null?void 0:a.recent_applications)==null?void 0:T.length)>0?a.recent_applications.map((D,B)=>e.jsxs("div",{className:"pulse-item",style:{animationDelay:`${B*.07}s`},children:[e.jsxs("div",{className:"p-avatar",style:{background:`hsl(${(B*47+20)%360}, 60%, 92%)`,color:`hsl(${(B*47+20)%360}, 60%, 30%)`},children:[D.first_name[0],D.last_name[0]]}),e.jsxs("div",{className:"p-text",children:[e.jsxs("p",{children:[e.jsxs("strong",{children:[D.first_name," ",D.last_name]})," applied for ",e.jsx("span",{children:D.vacancy_title})]}),e.jsxs("span",{className:"p-time",children:[e.jsx(ln,{})," ",on(D.applied_at)]})]}),e.jsx("div",{className:"pulse-dot"})]},B)):e.jsx("div",{className:"empty-state-p",children:"No recent pulses detected."})})]})]}),e.jsxs("div",{className:"command-sidebar-p",children:[e.jsxs("div",{className:"upcoming-interviews-card",children:[e.jsxs("div",{className:"ui-header",children:[e.jsx(qt,{}),e.jsx("h3",{children:"Upcoming Interviews"}),((E=a==null?void 0:a.upcoming_interviews)==null?void 0:E.length)>0&&e.jsx("span",{className:"ui-count-badge",children:a.upcoming_interviews.length})]}),e.jsx("div",{className:"ui-list",children:((A=a==null?void 0:a.upcoming_interviews)==null?void 0:A.length)>0?a.upcoming_interviews.map((D,B)=>e.jsxs("div",{className:"ui-item",onClick:()=>b("/admin/applicants?search="+encodeURIComponent(D.first_name+" "+D.last_name)),children:[e.jsxs("div",{className:"ui-date-box",children:[e.jsx("span",{className:"ui-day",children:new Date(D.interview_date).getDate()}),e.jsx("span",{className:"ui-month",children:new Date(D.interview_date).toLocaleString("default",{month:"short"})})]}),e.jsxs("div",{className:"ui-details",children:[e.jsxs("strong",{children:[D.first_name," ",D.last_name]}),e.jsx("span",{children:D.vacancy_title}),e.jsxs("div",{className:"ui-meta",children:[e.jsx(ln,{size:10})," ",D.interview_time," · ",D.interview_type]})]})]},D.id||B)):e.jsx("div",{className:"empty-state-p",style:{padding:"0px",textAlign:"left",background:"transparent",border:"none"},children:"No upcoming interviews scheduled."})})]}),e.jsxs("div",{className:"shortcut-mosaic-card",children:[e.jsx("label",{children:"Command Shortcuts"}),e.jsxs("div",{className:"shortcut-grid-p admin-grid-2",children:[e.jsxs("div",{className:"shortcut-tile",onClick:()=>b("/admin/applicants"),children:[e.jsx("div",{className:"shortcut-icon blue",children:e.jsx(er,{})}),e.jsx("span",{children:"Applicants"})]}),e.jsxs("div",{className:"shortcut-tile",onClick:()=>b("/admin/talent-pool"),children:[e.jsx("div",{className:"shortcut-icon purple",children:e.jsx(Ma,{})}),e.jsx("span",{children:"Pool"})]}),e.jsxs("div",{className:"shortcut-tile",onClick:()=>b("/admin/vacancies"),children:[e.jsx("div",{className:"shortcut-icon gold",children:e.jsx(qr,{})}),e.jsx("span",{children:"Posts"})]}),e.jsxs("div",{className:"shortcut-tile",onClick:()=>b("/admin/vacancies/create"),children:[e.jsx("div",{className:"shortcut-icon green",children:e.jsx(Da,{})}),e.jsx("span",{children:"Post Job"})]})]})]}),e.jsxs("div",{className:"status-console-card",children:[e.jsxs("div",{className:"console-header",children:[e.jsx("div",{className:"live-dot pulse"}),e.jsx("span",{children:"System Status: Healthy"})]}),e.jsxs("div",{className:"status-metrics",children:[e.jsxs("div",{className:"status-metric",children:[e.jsx("span",{children:"Uptime"}),e.jsx("div",{className:"metric-bar",children:e.jsx("div",{className:"metric-fill",style:{width:"99%"}})}),e.jsx("span",{className:"metric-val",children:"99%"})]}),e.jsxs("div",{className:"status-metric",children:[e.jsx("span",{children:"Database"}),e.jsx("div",{className:"metric-bar",children:e.jsx("div",{className:"metric-fill",style:{width:"95%"}})}),e.jsx("span",{className:"metric-val",children:"Sync"})]})]}),e.jsx("p",{children:"All recruitment services are operational. GS legacy cloud is synchronized."}),e.jsx("div",{className:"console-footer",children:e.jsx("span",{children:"V 2.5.0 · Premium Edition"})})]}),e.jsxs("div",{className:"heritage-footer-p",children:[e.jsx("img",{src:"/gs-logo.png",alt:"GS"}),e.jsxs("p",{children:["George Steuart & Company",e.jsx("br",{}),"Trusted since 1835"]})]})]})]}),e.jsx("style",{jsx:"true",children:`
                .premium-dashboard-container {
                    padding: 0;
                    animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* LOADING */
                .dashboard-loading-screen {
                    min-height: 60vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .loading-orb {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: 3px solid rgba(139,26,43,0.1);
                    border-top-color: var(--crimson);
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* HERO */
                .dashboard-hero-premium {
                    background: linear-gradient(135deg, #1a0208 0%, #2a050b 40%, #3d0813 100%);
                    border-radius: 24px;
                    padding: 36px 40px;
                    margin-bottom: 24px;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid rgba(255,255,255,0.05);
                    box-shadow: 0 24px 60px rgba(139, 26, 43, 0.25);
                }

                .hero-grid-pattern {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
                    background-size: 28px 28px;
                    pointer-events: none;
                }

                .hero-bg-accent {
                    position: absolute;
                    top: -80px;
                    right: -80px;
                    width: 380px;
                    height: 380px;
                    background: radial-gradient(circle, rgba(200, 169, 81, 0.2) 0%, transparent 65%);
                    pointer-events: none;
                    z-index: 1;
                }

                .hero-content-p { position: relative; z-index: 2; }

                .hero-badge-p {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(200, 169, 81, 0.15);
                    border: 1px solid rgba(200, 169, 81, 0.25);
                    color: #C8A951;
                    padding: 5px 14px;
                    border-radius: 100px;
                    font-size: 0.68rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 14px;
                }

                .hero-title-p {
                    font-family: var(--font-heading);
                    font-size: 2rem;
                    color: #fff;
                    margin: 0 0 8px 0;
                    letter-spacing: -0.5px;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.3);
                }

                .hero-subtitle-p {
                    color: rgba(255,255,255,0.55);
                    font-size: 0.85rem;
                    max-width: 500px;
                }

                .hero-actions-p {
                    display: flex;
                    gap: 12px;
                    z-index: 2;
                    position: relative;
                }

                .btn-hero-p {
                    padding: 11px 22px;
                    border-radius: 14px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: none;
                    font-size: 0.88rem;
                    font-family: var(--font-body);
                }
                .btn-hero-p.primary { background: #C8A951; color: #1a1a2e; box-shadow: 0 8px 24px rgba(200,169,81,0.3); }
                .btn-hero-p.primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 14px 30px rgba(200,169,81,0.4); }
                .btn-hero-p.secondary { background: rgba(255,255,255,0.08); color: #fff; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); }
                .btn-hero-p.secondary:hover { background: rgba(255,255,255,0.14); transform: translateY(-3px); }

                /* STAT MOSAIC */
                .stats-mosaic-grid { display: grid; gap: 20px; margin-bottom: 24px; }

                .stat-glass-card {
                    background: #fff;
                    padding: 22px;
                    border-radius: 20px;
                    border: 1px solid rgba(0,0,0,0.05);
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    animation: slideUpFade 0.5s both;
                    box-shadow: 0 2px 16px rgba(0,0,0,0.04);
                }

                @keyframes slideUpFade {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .stat-glass-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                    border-color: rgba(200,169,81,0.2);
                }

                .stat-glass-card .s-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }

                .stat-glass-card.gold .s-icon { background: rgba(200, 169, 81, 0.12); color: #C8A951; }
                .stat-glass-card.green .s-icon { background: rgba(16, 185, 129, 0.1); color: #10b981; }
                .stat-glass-card.blue .s-icon { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
                .stat-glass-card.purple .s-icon { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }

                .s-info { display: flex; flex-direction: column; }
                .s-label { font-size: 0.65rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
                .s-value { font-size: 2rem; font-weight: 800; color: #1e293b; margin-top: 2px; line-height: 1; font-variant-numeric: tabular-nums; }
                .s-trend { font-size: 0.7rem; font-weight: 700; color: #94a3b8; display: flex; align-items: center; gap: 6px; }
                .s-trend.positive { color: #10b981; }

                .s-progress-bar {
                    height: 3px;
                    background: #f1f5f9;
                    border-radius: 100px;
                    overflow: hidden;
                }
                .s-progress-fill {
                    height: 100%;
                    border-radius: 100px;
                    transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .gold-fill { background: linear-gradient(90deg, #C8A951, #E5C366); }
                .green-fill { background: linear-gradient(90deg, #10b981, #34d399); }
                .blue-fill { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
                .purple-fill { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }

                /* MAIN FLOW */
                .dashboard-main-flow {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 24px;
                }

                .activity-card-p {
                    background: #fff;
                    border-radius: 20px;
                    border: 1px solid rgba(0,0,0,0.05);
                    padding: 22px;
                    margin-bottom: 24px;
                    box-shadow: 0 2px 16px rgba(0,0,0,0.03);
                }

                .card-header-p {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 18px;
                    padding-bottom: 14px;
                    border-bottom: 1px solid #f1f5f9;
                }

                .ch-title { display: flex; align-items: center; gap: 10px; color: var(--crimson); }
                .ch-title h3 { font-size: 1rem; font-weight: 800; margin: 0; color: #1e293b; }
                .ch-link { background: none; border: none; color: #C8A951; font-weight: 700; font-size: 0.82rem; display: flex; align-items: center; gap: 6px; cursor: pointer; transition: gap 0.2s; }
                .ch-link:hover { gap: 10px; }

                /* VACANCY LIST */
                .activity-list-p { display: flex; flex-direction: column; gap: 10px; }
                .vacancy-item-mini {
                    padding: 14px 18px;
                    border-radius: 16px;
                    border: 1px solid transparent;
                    background: #f8fafc;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    transition: all 0.25s;
                    animation: slideUpFade 0.4s both;
                }
                .vacancy-item-mini:hover { border-color: rgba(0,0,0,0.06); background: #fff; transform: translateX(6px); box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
                .v-info { display: flex; flex-direction: column; flex: 1; }
                .v-info strong { font-size: 0.9rem; color: #1e293b; font-weight: 700; }
                .v-info span { font-size: 0.78rem; color: #94a3b8; margin-top: 2px; }
                .v-metric { text-align: center; padding: 0 20px; }
                .v-metric .count { display: block; font-size: 1.1rem; font-weight: 800; color: var(--crimson); }
                .v-metric .lbl { font-size: 0.62rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
                .pill { padding: 4px 12px; border-radius: 100px; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.5px; }
                .pill.live { background: rgba(16, 185, 129, 0.1); color: #10b981; }
                .pill.ending { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

                /* APPLICANT PULSE */
                .applicant-pulse-list { display: flex; flex-direction: column; gap: 16px; }
                .pulse-item {
                    display: flex;
                    gap: 14px;
                    align-items: center;
                    animation: slideUpFade 0.4s both;
                    position: relative;
                }
                .p-avatar { width: 42px; height: 42px; border-radius: 12px; font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .p-text p { margin: 0; font-size: 0.88rem; color: #1e293b; line-height: 1.4; }
                .p-text p span { color: var(--crimson); font-weight: 700; }
                .p-time { font-size: 0.73rem; color: #94a3b8; display: flex; align-items: center; gap: 4px; margin-top: 3px; }
                .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; flex-shrink: 0; box-shadow: 0 0 6px rgba(16,185,129,0.5); margin-left: auto; }

                /* COMMAND SIDEBAR */
                .command-sidebar-p { display: flex; flex-direction: column; gap: 20px; }

                .upcoming-interviews-card {
                    background: #fff;
                    border-radius: 20px;
                    border: 1px solid rgba(0,0,0,0.05);
                    padding: 20px;
                    box-shadow: 0 2px 16px rgba(0,0,0,0.03);
                }
                .ui-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
                .ui-header svg { color: var(--crimson); font-size: 1.1rem; }
                .ui-header h3 { font-size: 1rem; font-weight: 800; margin: 0; color: #1e293b; flex: 1; }
                .ui-count-badge { background: var(--crimson); color: #fff; font-size: 0.65rem; font-weight: 800; padding: 2px 8px; border-radius: 100px; }
                .ui-list { display: flex; flex-direction: column; gap: 10px; }
                .ui-item {
                    display: flex;
                    gap: 14px;
                    padding: 14px;
                    background: #f8fafc;
                    border-radius: 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }
                .ui-item:hover { background: #fff; border-color: rgba(200,169,81,0.2); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.05); }
                .ui-date-box { 
                    background: linear-gradient(135deg, #fff1f2, #fff);
                    border: 1px solid #fee2e2; 
                    border-radius: 10px; 
                    min-width: 50px; height: 50px; 
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center; 
                    color: var(--crimson); flex-shrink: 0;
                }
                .ui-day { font-size: 1.1rem; font-weight: 800; line-height: 1.1; }
                .ui-month { font-size: 0.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
                .ui-details { display: flex; flex-direction: column; justify-content: center; flex: 1; }
                .ui-details strong { font-size: 0.88rem; color: #1e293b; font-weight: 800; margin-bottom: 2px; }
                .ui-details span { font-size: 0.75rem; color: #64748b; margin-bottom: 4px; }
                .ui-meta { font-size: 0.7rem; color: #C8A951; font-weight: 700; display: flex; align-items: center; gap: 4px; }

                /* SHORTCUT */
                .shortcut-mosaic-card { background: #fff; border-radius: 20px; border: 1px solid rgba(0,0,0,0.05); padding: 20px; box-shadow: 0 2px 16px rgba(0,0,0,0.03); }
                .shortcut-mosaic-card label { display: block; font-size: 0.65rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; }
                .shortcut-grid-p { display: grid; gap: 12px; }
                .shortcut-tile {
                    background: #f8fafc;
                    padding: 16px 12px;
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: 1px solid transparent;
                }
                .shortcut-tile:hover { background: #fff; border-color: rgba(0,0,0,0.06); transform: translateY(-4px) scale(1.03); box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
                .shortcut-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
                .shortcut-icon.blue { background: rgba(59,130,246,0.1); color: #3b82f6; }
                .shortcut-icon.purple { background: rgba(139,92,246,0.1); color: #8b5cf6; }
                .shortcut-icon.gold { background: rgba(200,169,81,0.1); color: #C8A951; }
                .shortcut-icon.green { background: rgba(16,185,129,0.1); color: #10b981; }
                .shortcut-tile span { font-size: 0.82rem; font-weight: 700; color: #475569; }

                /* STATUS */
                .status-console-card {
                    background: linear-gradient(135deg, #1a0208, #2a050b);
                    border-radius: 20px;
                    padding: 20px;
                    color: rgba(255,255,255,0.75);
                    border: 1px solid rgba(200,169,81,0.12);
                }
                .console-header { display: flex; align-items: center; gap: 10px; color: #fff; font-weight: 700; font-size: 0.88rem; margin-bottom: 14px; }
                .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; flex-shrink: 0; }
                .pulse { animation: pulseAnim 2s infinite; }
                @keyframes pulseAnim { 0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.7); } 70% { box-shadow: 0 0 0 8px rgba(16,185,129,0); } 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); } }

                .status-metrics { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }
                .status-metric { display: flex; align-items: center; gap: 10px; font-size: 0.72rem; }
                .status-metric > span:first-child { flex: 0 0 56px; color: rgba(255,255,255,0.5); font-weight: 600; }
                .metric-bar { flex: 1; height: 3px; background: rgba(255,255,255,0.1); border-radius: 100px; overflow: hidden; }
                .metric-fill { height: 100%; background: linear-gradient(90deg, #10b981, #34d399); border-radius: 100px; }
                .metric-val { flex: 0 0 32px; text-align: right; color: rgba(255,255,255,0.6); font-size: 0.68rem; font-weight: 700; }

                .status-console-card p { font-size: 0.78rem; line-height: 1.55; margin-bottom: 14px; }
                .console-footer { font-size: 0.62rem; opacity: 0.4; text-transform: uppercase; letter-spacing: 1.5px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px; }

                .heritage-footer-p { text-align: center; padding: 16px 0; }
                .heritage-footer-p img { width: 36px; filter: grayscale(1); opacity: 0.25; margin-bottom: 8px; }
                .heritage-footer-p p { font-size: 0.7rem; color: #94a3b8; font-weight: 600; line-height: 1.6; }

                /* EMPTY */
                .empty-state-p {
                    text-align: center;
                    padding: 32px;
                    color: #94a3b8;
                    font-size: 0.88rem;
                    background: #fafafa;
                    border-radius: 12px;
                    border: 1px dashed #e2e8f0;
                }

                /* RESPONSIVENESS */
                @media (max-width: 1200px) {
                    .dashboard-main-flow { display: flex; flex-direction: column; gap: 24px; }
                    .command-sidebar-p { display: contents; }
                    .upcoming-interviews-card { order: 1; }
                    .main-activity-content { order: 2; }
                    .shortcut-mosaic-card { order: 3; }
                    .status-console-card { order: 4; }
                    .heritage-footer-p { order: 5; }
                }

                @media (max-width: 1024px) {
                    .dashboard-hero-premium { flex-direction: column; align-items: flex-start; gap: 24px; }
                    .hero-title-p { font-size: 1.7rem; }
                }

                @media (max-width: 768px) {
                    .dashboard-hero-premium { padding: 28px 24px; border-radius: 20px; }
                    .hero-actions-p { flex-direction: column; width: 100%; }
                    .btn-hero-p { width: 100%; justify-content: center; }
                }

                @media (max-width: 480px) {
                    .stats-mosaic-grid { grid-template-columns: 1fr; }
                    .shortcut-grid-p { grid-template-columns: 1fr; }
                }
            `})]})}const zf=Et.replace("/api",""),Pf=s=>{if(!s)return null;const a=s.split(`
`),n=[];let o=[];return a.forEach((l,d)=>{const u=l.trim();if(u.startsWith("•")||u.startsWith("-")||u.startsWith("*")||/^\d+\./.test(u)){const h=u.replace(/^[•\-*\d.]+\s*/,"").trim();h&&o.push(e.jsx("li",{children:h},`li-${d}`))}else if(o.length>0&&(n.push(e.jsx("ul",{className:"formatted-list",children:o},`ul-${d}`)),o=[]),u){const h=u.length<40&&(u===u.toUpperCase()||u.endsWith(":"));n.push(e.jsx("p",{className:h?"formatted-heading":"formatted-paragraph",children:u},`p-${d}`))}else n.push(e.jsx("div",{className:"formatted-spacer"},`br-${d}`))}),o.length>0&&n.push(e.jsx("ul",{className:"formatted-list",children:o},"ul-final")),n};function iy({admin:s}){const a=Ut(),[n,o]=F.useState([]),[l,d]=F.useState([]),[u,f]=F.useState({total_vacancies:0,active_vacancies:0,total_applications:0}),[h,b]=F.useState(!0),[j,N]=F.useState(null),[w,_]=F.useState(""),[v,x]=F.useState(""),[g,S]=F.useState(null),[z,T]=F.useState(1),E=8,[A,D]=F.useState(!1),[B,V]=F.useState([]),[U,G]=F.useState(!1),[fe,L]=F.useState(""),[H,k]=F.useState(null),J=async()=>{try{G(!0),D(!0),L(""),k((g==null?void 0:g.selected_application_id)||(g==null?void 0:g.hired_application_id)||null);const W=await Ph({status:"shortlisted"});V(W.data.data||[])}catch(W){console.error(W),me.error("Failed to load shortlisted candidates")}finally{G(!1)}},ve=async()=>{var W,ee;try{const te={vacancy_id:g.id,application_id:H};if(await Xv(te),me.success(H?"Candidate assigned successfully!":"Assignment cleared successfully!"),await se(),H){const Ne=B.find(Te=>Te.id===H);Ne&&S(Te=>({...Te,hired_application_id:Ne.id,selected_application_id:Ne.id,selected_first_name:Ne.first_name,selected_last_name:Ne.last_name,selected_email:Ne.email,selected_contact_number:Ne.contact_number}))}else S(Ne=>({...Ne,hired_application_id:null,selected_application_id:null,selected_first_name:null,selected_last_name:null,selected_email:null,selected_contact_number:null}));D(!1)}catch(te){console.error(te),me.error(((ee=(W=te.response)==null?void 0:W.data)==null?void 0:ee.message)||"Failed to assign candidate")}};F.useEffect(()=>{se()},[w]);const se=async()=>{try{b(!0);const W={};w&&(W.company_id=w);const[ee,te,Ne]=await Promise.all([zo(W),un(),Rh()]);o(ee.data.data||[]),d(te.data.data||[]),f(Ne.data.data||{total_vacancies:0,active_vacancies:0,total_applications:0})}catch(W){console.error(W),me.error("Failed to load dashboard data")}finally{b(!1)}},oe=async W=>{var ee,te;try{await Kv({id:W}),me.success("Vacancy deleted successfully"),N(null),se()}catch(Ne){me.error(((te=(ee=Ne.response)==null?void 0:ee.data)==null?void 0:te.message)||"Delete failed")}},Q=n.filter(W=>W.title.toLowerCase().includes(v.toLowerCase())||W.reference_number&&W.reference_number.toLowerCase().includes(v.toLowerCase())||W.company_name.toLowerCase().includes(v.toLowerCase())||W.designation.toLowerCase().includes(v.toLowerCase())),ce=Math.ceil(Q.length/E),R=(z-1)*E,P=Q.slice(R,R+E);return F.useEffect(()=>{T(1)},[v,w]),e.jsxs("div",{className:"manage-vacancies-console",children:[e.jsxs("div",{className:"vacancies-orchestration-header",children:[e.jsx("div",{className:"hero-bg-accent"}),e.jsxs("div",{className:"header-content-p",children:[e.jsxs("div",{className:"console-badge",children:[e.jsx("span",{className:"live-dot pulse"}),"RECRUITMENT ORCHESTRATION CONSOLE"]}),e.jsx("h1",{className:"serif-title-p",children:"Manage Vacancies"}),e.jsx("p",{className:"hero-subline",children:"Track and publish job opportunities across George Steuart & Company establishments."})]}),e.jsxs("button",{className:"btn-establish-p",onClick:()=>a("/admin/vacancies/create"),children:[e.jsx(Da,{})," ",e.jsx("span",{children:"Establish New Vacancy"})]})]}),e.jsxs("div",{className:"stats-mosaic-p",children:[e.jsxs("div",{className:"mosaic-card-p glass-card-p",children:[e.jsx("div",{className:"m-icon blue",children:e.jsx(At,{})}),e.jsxs("div",{className:"m-info",children:[e.jsx("span",{className:"m-label",children:"Total Listings"}),e.jsx("span",{className:"m-value",children:u.total_vacancies})]}),e.jsx("div",{className:"m-footer",children:"Global Overview"})]}),e.jsxs("div",{className:"mosaic-card-p glass-card-p",children:[e.jsx("div",{className:"m-icon green",children:e.jsx(Tt,{})}),e.jsxs("div",{className:"m-info",children:[e.jsx("span",{className:"m-label",children:"Live Channels"}),e.jsx("span",{className:"m-value",children:u.active_vacancies})]}),e.jsx("div",{className:"m-footer active",children:"Active & Viral"})]}),e.jsxs("div",{className:"mosaic-card-p glass-card-p",children:[e.jsx("div",{className:"m-icon gold",children:e.jsx(er,{})}),e.jsxs("div",{className:"m-info",children:[e.jsx("span",{className:"m-label",children:"Engagement"}),e.jsx("span",{className:"m-value",children:u.total_applications})]}),e.jsx("div",{className:"m-footer",children:"Total Submissions"})]}),e.jsxs("div",{className:"mosaic-card-p glass-card-p",children:[e.jsx("div",{className:"m-icon crimson",children:e.jsx(Lr,{})}),e.jsxs("div",{className:"m-info",children:[e.jsx("span",{className:"m-label",children:"Expiring Soon"}),e.jsx("span",{className:"m-value",children:n.filter(W=>Hr(W.expire_date)>0&&Hr(W.expire_date)<=7).length})]}),e.jsx("div",{className:"m-footer urgent",children:"Urgent Action"})]})]}),e.jsxs("div",{className:"console-toolbar-p",children:[e.jsxs("div",{className:"toolbar-search-row",children:[e.jsxs("div",{className:"search-orchestrator",children:[e.jsx(Ar,{className:"s-icon"}),e.jsx("input",{id:"vacancy_search",name:"vacancy_search",type:"text",placeholder:"Search position, reference or establishment...",value:v,onChange:W=>x(W.target.value)})]}),e.jsxs("button",{className:"btn-reset-p",onClick:()=>{x(""),_("")},children:[e.jsx(ct,{})," ",e.jsx("span",{children:"Reset Console"})]})]}),e.jsx("div",{className:"toolbar-filters-row",children:s.role==="super_admin"&&e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Establishment"}),e.jsxs("div",{className:"select-orchestrator",children:[e.jsx(nd,{className:"f-icon"}),e.jsxs("select",{id:"company_filter",name:"company_id",value:w,onChange:W=>_(W.target.value),className:"select-lg",children:[e.jsx("option",{value:"",children:"All GS Entities"}),l.map(W=>e.jsx("option",{value:W.id,children:W.name},W.id))]})]})]})})]}),e.jsx("div",{className:"orchestration-table-wrapper card-p",children:h?e.jsxs("div",{className:"loading-state-p",children:[e.jsx("div",{className:"spinner-p"}),e.jsx("p",{children:"Synchronizing vacancy data..."})]}):Q.length===0?e.jsxs("div",{className:"empty-state-p",children:[e.jsx("div",{className:"empty-icon",children:e.jsx(At,{})}),e.jsx("h3",{children:"No matches found"}),e.jsx("p",{children:"We couldn't find any vacancies matching your current filters."}),e.jsx("button",{className:"btn btn-outline",onClick:()=>{x(""),_("")},children:"Reset Console"})]}):e.jsxs("div",{className:"premium-table-container",children:[e.jsxs("table",{className:"premium-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Position & Establishment"}),e.jsx("th",{children:"Classification"}),e.jsx("th",{style:{width:"100px"},children:"Engagement Pulse"}),e.jsxs("th",{style:{textAlign:"center",width:"180px"},children:[e.jsx("div",{style:{fontSize:"0.65rem",textTransform:"uppercase",marginBottom:"6px",letterSpacing:"0.5px",color:"#94a3b8",fontWeight:800},children:"Stages"}),e.jsxs("div",{style:{display:"flex",gap:"22px",justifyContent:"center",alignItems:"center"},children:[e.jsx("span",{title:"Pending (Orange)",style:{display:"flex"},children:e.jsx(ln,{size:13,style:{color:"#d97706"}})}),e.jsx("span",{title:"Under Review (Blue)",style:{display:"flex"},children:e.jsx(kf,{size:13,style:{color:"#2563eb"}})}),e.jsx("span",{title:"Rejected (Red)",style:{display:"flex"},children:e.jsx(Mh,{size:13,style:{color:"#dc2626"}})}),e.jsx("span",{title:"Shortlisted (Green)",style:{display:"flex"},children:e.jsx(Tt,{size:13,style:{color:"#16a34a"}})})]})]}),e.jsx("th",{children:"Registry Timeline"}),e.jsx("th",{children:"Status"}),e.jsx("th",{style:{textAlign:"right"},children:"Operations"})]})}),e.jsx("tbody",{children:P.map(W=>{const ee=W.is_active&&Hr(W.expire_date)>0;return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("div",{className:"pos-entity-cell",children:[W.reference_number&&e.jsxs("span",{className:"ref-badge-inline",children:["#",W.reference_number]}),e.jsx("span",{className:"pos-name",children:W.title}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"4px"},children:[e.jsx("img",{src:W.company_logo?`${zf}/uploads/logos/${W.company_logo}`:"/gs-logo.png",alt:W.company_name,onError:te=>te.target.src="/gs-logo.png",style:{width:"22px",height:"22px",objectFit:"contain",borderRadius:"4px",background:"#f8fafc",border:"1px solid #e2e8f0",padding:"2px",flexShrink:0}}),e.jsx("span",{className:"entity-name",style:{margin:0},children:W.company_name})]}),W.selected_first_name&&e.jsxs("div",{className:"table-emp-badge",title:`Assigned: ${W.selected_first_name} ${W.selected_last_name} (${W.selected_email})`,children:[e.jsx("span",{className:"te-dot"}),e.jsxs("span",{className:"te-text",children:[W.selected_first_name," ",W.selected_last_name]})]})]})}),e.jsx("td",{children:e.jsxs("div",{className:"classification-cell",children:[e.jsx("span",{className:"class-badge",children:W.employment_type}),W.designation&&W.designation.toLowerCase()!==W.title.toLowerCase()&&e.jsx("span",{className:"designation-sub",children:W.designation})]})}),e.jsx("td",{children:e.jsxs("div",{className:"pulse-cell",style:{maxWidth:"80px"},children:[e.jsx("div",{className:"pulse-info",children:e.jsx("strong",{style:{fontSize:"1.1rem"},children:W.application_count||0})}),e.jsx("div",{className:"mini-bar",style:{marginTop:"4px"},children:e.jsx("div",{className:"bar-fill",style:{width:`${Math.min((W.application_count||0)*5,100)}%`}})})]})}),e.jsx("td",{children:e.jsxs("div",{style:{display:"flex",gap:"22px",justifyContent:"center",alignItems:"center",padding:"4px 0"},children:[e.jsx("span",{style:{fontSize:"0.9rem",fontWeight:800,color:W.pending_count>0?"#b8860b":"#cbd5e1",minWidth:"12px",textAlign:"center"},children:W.pending_count||0}),e.jsx("span",{style:{fontSize:"0.9rem",fontWeight:800,color:W.review_count>0?"#1e40af":"#cbd5e1",minWidth:"12px",textAlign:"center"},children:W.review_count||0}),e.jsx("span",{style:{fontSize:"0.9rem",fontWeight:800,color:W.rejected_count>0?"#991b1b":"#cbd5e1",minWidth:"12px",textAlign:"center"},children:W.rejected_count||0}),e.jsx("span",{style:{fontSize:"0.9rem",fontWeight:800,color:W.shortlisted_count>0?"#15803d":"#cbd5e1",minWidth:"12px",textAlign:"center"},children:W.shortlisted_count||0})]})}),e.jsx("td",{children:e.jsxs("div",{className:"timeline-cell",children:[e.jsxs("span",{children:[e.jsx(qt,{size:12})," ",on(W.publish_date)]}),e.jsxs("span",{className:`${Hr(W.expire_date)<=7?"critical":""}`,children:[e.jsx(ln,{size:12})," Exp: ",on(W.expire_date)]})]})}),e.jsx("td",{children:e.jsxs("div",{className:`status-orb-p ${ee?"live":"expired"}`,children:[e.jsx("span",{className:"orb"}),e.jsx("span",{className:"orb-text",children:ee?"Live":"Ended"})]})}),e.jsx("td",{children:e.jsxs("div",{className:"orchestration-actions",children:[e.jsx("button",{className:"o-btn view",onClick:()=>S(W),title:"View Job Description",children:e.jsx(kf,{})}),e.jsx("button",{className:"o-btn edit",onClick:()=>a(`/admin/vacancies/edit/${W.id}`),title:"Edit Configuration",children:e.jsx(Rs,{})}),e.jsx("button",{className:"o-btn applicants",onClick:()=>a(`/admin/applicants?vacancy_id=${W.id}`),title:"View Pipeline",children:e.jsx(na,{})}),e.jsx("button",{className:"o-btn delete",onClick:()=>N(W.id),title:"Decommission",children:e.jsx(aa,{})})]})})]},W.id)})})]}),e.jsxs("div",{className:"pagination-footer",children:[e.jsxs("div",{className:"page-info",children:["Showing ",e.jsxs("strong",{children:[R+1,"-",Math.min(R+E,Q.length)]})," of ",e.jsx("strong",{children:Q.length})," vacancies"]}),e.jsxs("div",{className:"pagination-controls",children:[e.jsxs("button",{className:"page-btn",onClick:()=>T(W=>Math.max(W-1,1)),disabled:z===1,title:"Previous Page",children:[e.jsx(Ro,{})," Previous"]}),e.jsxs("button",{className:"page-btn",onClick:()=>T(W=>Math.min(W+1,ce)),disabled:z===ce||ce===0,title:"Next Page",children:["Next ",e.jsx(Tr,{})]})]})]})]})}),j&&e.jsx("div",{className:"confirm-overlay",onClick:()=>N(null),children:e.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:W=>W.stopPropagation(),children:[e.jsx("div",{className:"warning-visual",children:e.jsx(Lr,{})}),e.jsx("h3",{children:"Decommission Position?"}),e.jsx("p",{children:"This action will permanently remove this vacancy and all associated records from the orchestration console. This cannot be undone."}),e.jsxs("div",{className:"modal-actions-p",children:[e.jsx("button",{className:"btn-secondary-p",onClick:()=>N(null),children:"Abort"}),e.jsx("button",{className:"btn-danger-p",onClick:()=>oe(j),children:"Confirm Decommission"})]})]})}),g&&e.jsx("div",{className:"vd-overlay",onClick:()=>S(null),children:e.jsxs("div",{className:"vd-modal",onClick:W=>W.stopPropagation(),children:[e.jsxs("div",{className:"vd-header",children:[e.jsx("div",{className:"vd-header-glow"}),e.jsxs("div",{className:"vd-header-top",children:[e.jsxs("div",{className:"vd-status-badge",children:[e.jsx("span",{className:`vd-status-dot ${g.is_active&&Hr(g.expire_date)>0?"live":"ended"}`}),g.is_active&&Hr(g.expire_date)>0?"LIVE POSTING":"ENDED"]}),e.jsx("button",{className:"vd-close-btn",onClick:()=>S(null),title:"Close",children:e.jsx(ct,{})})]}),e.jsx("h2",{className:"vd-title",children:g.title}),e.jsxs("div",{className:"vd-company-row",children:[e.jsx("img",{src:g.company_logo?`${zf}/uploads/logos/${g.company_logo}`:"/gs-logo.png",alt:g.company_name,onError:W=>W.target.src="/gs-logo.png",className:"vd-company-logo"}),e.jsx("span",{className:"vd-company-name",children:g.company_name})]}),e.jsxs("div",{className:"vd-pills",children:[g.reference_number&&e.jsx("span",{className:"vd-pill ref",children:g.reference_number}),e.jsxs("span",{className:"vd-pill",children:[e.jsx(At,{size:11})," ",g.employment_type]}),g.location&&e.jsxs("span",{className:"vd-pill",children:[e.jsx(xt,{size:11})," ",g.location]}),e.jsxs("span",{className:"vd-pill",children:[e.jsx(er,{size:11})," ",g.application_count||0," Applicants"]})]})]}),e.jsxs("div",{className:"vd-body",children:[e.jsx("div",{className:"vd-selected-employee-section",children:g.selected_first_name?e.jsxs("div",{className:"vd-employee-card active",children:[e.jsxs("div",{className:"vd-employee-info",children:[e.jsx("div",{className:"vd-employee-badge",children:"SELECTED EMPLOYEE"}),e.jsxs("div",{className:"vd-emp-name",children:[g.selected_first_name," ",g.selected_last_name]}),e.jsxs("div",{className:"vd-emp-meta",children:[e.jsx("span",{children:g.selected_email}),g.selected_contact_number&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"vd-divider",children:"|"}),e.jsx("span",{children:g.selected_contact_number})]})]})]}),e.jsx("button",{className:"vd-emp-btn change",onClick:J,children:"Change Employee"})]}):e.jsxs("div",{className:"vd-employee-card empty",children:[e.jsxs("div",{className:"vd-employee-info",children:[e.jsx("div",{className:"vd-emp-name-empty",children:"No Employee Assigned Yet"}),e.jsx("p",{className:"vd-emp-subline",children:"Select a shortlisted candidate to assign to this vacancy."})]}),e.jsx("button",{className:"vd-emp-btn assign",onClick:J,children:"Select Employee"})]})}),e.jsxs("div",{className:"vd-meta-grid",children:[e.jsxs("div",{className:"vd-meta-item",children:[e.jsx("span",{className:"vd-meta-label",children:"Designation"}),e.jsx("p",{className:"vd-meta-value",children:g.designation})]}),e.jsxs("div",{className:"vd-meta-item",children:[e.jsx("span",{className:"vd-meta-label",children:"Min. Experience"}),e.jsx("p",{className:"vd-meta-value",children:g.min_experience||"Not specified"})]}),e.jsxs("div",{className:"vd-meta-item",children:[e.jsx("span",{className:"vd-meta-label",children:"Published"}),e.jsxs("p",{className:"vd-meta-value",children:[e.jsx(qt,{size:13})," ",on(g.publish_date)]})]}),e.jsxs("div",{className:"vd-meta-item",children:[e.jsx("span",{className:"vd-meta-label",children:"Expires"}),e.jsxs("p",{className:`vd-meta-value ${Hr(g.expire_date)<=7?"urgent":""}`,children:[e.jsx(ln,{size:13})," ",on(g.expire_date)]})]})]}),e.jsxs("div",{className:"vd-section",children:[e.jsxs("h3",{className:"vd-section-title",children:[e.jsx(Oa,{})," Job Description"]}),e.jsx("div",{className:"vd-section-body-enhanced",children:g.description?Pf(g.description):e.jsx("em",{className:"vd-empty-note",children:"No description provided."})})]}),g.requirements&&e.jsxs("div",{className:"vd-section",children:[e.jsxs("h3",{className:"vd-section-title gold",children:[e.jsx(Tt,{})," Requirements & Qualifications"]}),e.jsx("div",{className:"vd-section-body-enhanced green",children:Pf(g.requirements)})]})]}),e.jsxs("div",{className:"vd-footer",children:[e.jsx("button",{className:"vd-btn cancel",onClick:()=>S(null),children:"Close"}),e.jsxs("button",{className:"vd-btn primary",onClick:()=>{S(null),a(`/admin/applicants?vacancy_id=${g.id}`)},children:[e.jsx(er,{size:14})," View Applicants"]}),e.jsxs("button",{className:"vd-btn gold",onClick:()=>{S(null),a(`/admin/vacancies/edit/${g.id}`)},children:[e.jsx(Rs,{size:14})," Edit Vacancy"]})]})]})}),A&&e.jsx("div",{className:"sam-overlay",onClick:()=>D(!1),children:e.jsxs("div",{className:"sam-modal",onClick:W=>W.stopPropagation(),children:[e.jsxs("div",{className:"sam-header",children:[e.jsxs("div",{className:"sam-title-row",children:[e.jsx("h3",{children:"Select Employee"}),e.jsx("button",{className:"sam-close-btn",onClick:()=>D(!1),children:e.jsx(ct,{})})]}),e.jsxs("p",{className:"sam-subtitle",children:["Assign a shortlisted candidate for ",e.jsx("strong",{children:g.title})]}),e.jsxs("div",{className:"sam-search-bar",children:[e.jsx(Ar,{className:"sam-search-icon"}),e.jsx("input",{type:"text",placeholder:"Search by name, email or contact number...",value:fe,onChange:W=>L(W.target.value)})]})]}),e.jsx("div",{className:"sam-body",children:U?e.jsxs("div",{className:"sam-loading",children:[e.jsx("div",{className:"spinner-p"}),e.jsx("p",{children:"Retrieving shortlisted candidates..."})]}):B.length===0?e.jsxs("div",{className:"sam-empty",children:[e.jsx(er,{size:32,style:{color:"#cbd5e1",marginBottom:"12px"}}),e.jsx("p",{className:"sam-empty-title",children:"No Shortlisted Candidates"}),e.jsx("p",{className:"sam-empty-text",children:"No applicants have been shortlisted yet."})]}):(()=>{const W=B.filter(ee=>`${ee.first_name} ${ee.last_name}`.toLowerCase().includes(fe.toLowerCase())||ee.email.toLowerCase().includes(fe.toLowerCase())||ee.contact_number&&ee.contact_number.includes(fe));return W.length===0?e.jsxs("div",{className:"sam-empty",children:[e.jsx(Ar,{size:28,style:{color:"#cbd5e1",marginBottom:"12px"}}),e.jsx("p",{className:"sam-empty-title",children:"No search matches"}),e.jsx("p",{className:"sam-empty-text",children:"Try searching with a different keyword."})]}):e.jsx("div",{className:"sam-candidates-list",children:W.map(ee=>{const te=H===ee.id;return e.jsxs("div",{className:`sam-candidate-item ${te?"selected":""}`,onClick:()=>k(ee.id),children:[e.jsx("div",{className:"sam-item-selection",children:e.jsx("input",{type:"radio",name:"assigning_candidate",checked:te,onChange:()=>k(ee.id)})}),e.jsxs("div",{className:"sam-item-details",children:[e.jsxs("div",{className:"sam-item-name",children:[ee.first_name," ",ee.last_name]}),e.jsxs("div",{className:"sam-item-meta",children:[e.jsx("span",{children:ee.email}),e.jsx("span",{className:"sam-meta-divider",children:"•"}),e.jsx("span",{children:ee.contact_number}),ee.vacancy_title&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"sam-meta-divider",children:"•"}),e.jsx("span",{className:"sam-vacancy-badge",title:`Shortlisted vacancy: ${ee.vacancy_title}`,children:ee.vacancy_title})]})]})]}),te&&e.jsx("div",{className:"sam-check-icon",children:e.jsx(Tt,{})})]},ee.id)})})})()}),e.jsxs("div",{className:"sam-footer",children:[(g.hired_application_id||g.selected_application_id)&&e.jsx("button",{className:"sam-btn danger",onClick:()=>k(null),style:{marginRight:"auto"},title:"Unassign current employee",children:"Clear Assignment"}),e.jsx("button",{className:"sam-btn secondary",onClick:()=>D(!1),children:"Cancel"}),e.jsx("button",{className:"sam-btn primary",onClick:ve,disabled:U||H===(g.selected_application_id||g.hired_application_id)&&(g.selected_application_id||g.hired_application_id)!==null,children:"Confirm Selection"})]})]})}),e.jsx("style",{jsx:"true",children:`
                .vd-selected-employee-section {
                    margin-bottom: 28px;
                    animation: fadeIn 0.4s ease-out;
                }
                .vd-employee-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 18px 24px;
                    border-radius: 20px;
                    background: #f8fafc;
                    border: 1.5px dashed #cbd5e1;
                    gap: 16px;
                    flex-wrap: wrap;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .vd-employee-card.active {
                    background: rgba(16, 185, 129, 0.03);
                    border: 1.5px solid rgba(16, 185, 129, 0.2);
                    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.05);
                }
                .vd-employee-badge {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    font-size: 0.65rem;
                    font-weight: 800;
                    padding: 4px 10px;
                    border-radius: 100px;
                    letter-spacing: 1px;
                    width: fit-content;
                    margin-bottom: 8px;
                }
                .vd-employee-info {
                    flex: 1;
                }
                .vd-emp-name {
                    font-size: 1.15rem;
                    font-weight: 800;
                    color: #1e293b;
                    margin-bottom: 4px;
                }
                .vd-emp-meta {
                    display: flex;
                    gap: 12px;
                    font-size: 0.85rem;
                    color: #64748b;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .vd-emp-name-empty {
                    font-size: 1.05rem;
                    font-weight: 800;
                    color: #475569;
                    margin-bottom: 4px;
                }
                .vd-emp-subline {
                    font-size: 0.85rem;
                    color: #94a3b8;
                    margin: 0;
                }
                .vd-emp-btn {
                    border: none;
                    padding: 10px 20px;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
                    font-family: var(--font-body);
                }
                .vd-emp-btn.assign {
                    background: #10b981;
                    color: #fff;
                    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);
                }
                .vd-emp-btn.assign:hover {
                    background: #059669;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
                }
                .vd-emp-btn.change {
                    background: #10b981;
                    color: #fff;
                    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.15);
                }
                .vd-emp-btn.change:hover {
                    background: #059669;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
                }
                .table-emp-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(16, 185, 129, 0.06);
                    border: 1px solid rgba(16, 185, 129, 0.15);
                    padding: 3px 8px;
                    border-radius: 6px;
                    font-size: 0.72rem;
                    color: #10b981;
                    font-weight: 700;
                    margin-top: 6px;
                    width: fit-content;
                }
                .te-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #10b981;
                }
                
                /* Selection Modal */
                .sam-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1100;
                    padding: 20px;
                    animation: fadeIn 0.25s ease-out;
                }
                .sam-modal {
                    background: #fff;
                    border-radius: 24px;
                    width: 100%;
                    max-width: 580px;
                    max-height: 85vh;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 30px 70px rgba(0,0,0,0.15);
                    animation: zoomInSpring 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: 1px solid rgba(0,0,0,0.04);
                }
                .sam-header {
                    padding: 24px 28px 18px;
                    border-bottom: 1px solid #f1f5f9;
                }
                .sam-title-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 6px;
                }
                .sam-title-row h3 {
                    font-family: var(--font-heading);
                    font-size: 1.35rem;
                    font-weight: 800;
                    color: #1e293b;
                    margin: 0;
                }
                .sam-close-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 10px;
                    background: #f1f5f9;
                    border: none;
                    color: #64748b;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                }
                .sam-close-btn:hover {
                    background: #e2e8f0;
                    color: #1e293b;
                }
                .sam-subtitle {
                    font-size: 0.85rem;
                    color: #64748b;
                    margin: 0 0 16px 0;
                }
                .sam-search-bar {
                    position: relative;
                    width: 100%;
                }
                .sam-search-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    font-size: 1rem;
                }
                .sam-search-bar input {
                    width: 100%;
                    padding: 10px 16px 10px 40px;
                    border-radius: 12px;
                    border: 1.5px solid #f1f5f9;
                    background: #f8fafc;
                    font-size: 0.85rem;
                    transition: all 0.2s;
                }
                .sam-search-bar input:focus {
                    outline: none;
                    background: #fff;
                    border-color: #10b981;
                    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.08);
                }
                .sam-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px 28px;
                }
                .sam-loading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 0;
                    gap: 12px;
                    color: #64748b;
                    font-size: 0.88rem;
                }
                .sam-empty {
                    text-align: center;
                    padding: 40px 0;
                }
                .sam-empty-title {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: #475569;
                    margin: 0 0 4px 0;
                }
                .sam-empty-text {
                    font-size: 0.85rem;
                    color: #94a3b8;
                    margin: 0;
                }
                .sam-candidates-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .sam-candidate-item {
                    display: flex;
                    align-items: center;
                    padding: 14px 18px;
                    border-radius: 16px;
                    border: 1.5px solid #f1f5f9;
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                    gap: 14px;
                }
                .sam-candidate-item:hover {
                    border-color: rgba(16, 185, 129, 0.25);
                    background: rgba(16, 185, 129, 0.01);
                }
                .sam-candidate-item.selected {
                    border-color: #10b981;
                    background: rgba(16, 185, 129, 0.04);
                }
                .sam-item-selection input {
                    cursor: pointer;
                    accent-color: #10b981;
                    width: 16px;
                    height: 16px;
                }
                .sam-item-details {
                    flex: 1;
                }
                .sam-item-name {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 2px;
                }
                .sam-item-meta {
                    display: flex;
                    gap: 8px;
                    font-size: 0.78rem;
                    color: #64748b;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .sam-meta-divider {
                    color: #cbd5e1;
                }
                .sam-vacancy-badge {
                    background: #f1f5f9;
                    color: #475569;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    max-width: 120px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .sam-check-icon {
                    color: #10b981;
                    font-size: 1.25rem;
                    display: flex;
                }
                .sam-footer {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 12px;
                    padding: 18px 28px;
                    border-top: 1px solid #f1f5f9;
                    background: #fcfcfd;
                }
                .sam-btn {
                    padding: 9px 18px;
                    border-radius: 10px;
                    font-weight: 700;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: var(--font-body);
                    border: none;
                }
                .sam-btn.secondary {
                    background: transparent;
                    border: 1.5px solid #e2e8f0;
                    color: #64748b;
                }
                .sam-btn.secondary:hover {
                    background: #f8fafc;
                }
                .sam-btn.primary {
                    background: #10b981;
                    color: #fff;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
                }
                .sam-btn.primary:hover:not(:disabled) {
                    background: #059669;
                    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
                }
                .sam-btn.primary:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    box-shadow: none;
                }
                .sam-btn.danger {
                    background: #fee2e2;
                    color: #dc2626;
                    border: 1.5px solid #fecaca;
                }
                .sam-btn.danger:hover {
                    background: #fecaca;
                }

                .manage-vacancies-console {
                    padding: 8px 0;
                    animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* ORCHESTRATION HEADER */
                .vacancies-orchestration-header {
                    background: linear-gradient(135deg, #2a050b 0%, var(--crimson-dark) 100%);
                    border-radius: 20px;
                    padding: 24px;
                    margin-bottom: 24px;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 24px;
                    border: 1px solid rgba(255,255,255,0.05);
                    box-shadow: 0 10px 30px rgba(139, 26, 43, 0.15);
                }

                .vacancies-orchestration-header::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 30px 30px;
                    pointer-events: none;
                }

                .hero-bg-accent {
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    width: 300px;
                    height: 300px;
                    background: var(--gold-accent);
                    filter: blur(150px);
                    opacity: 0.15;
                    border-radius: 50%;
                }

                .console-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.05);
                    padding: 5px 12px;
                    border-radius: 100px;
                    font-size: 0.60rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                    color: rgba(255,255,255,0.8);
                    border: 1px solid rgba(255,255,255,0.1);
                    margin-bottom: 12px;
                }

                .serif-title-p {
                    font-family: var(--font-heading);
                    font-size: 1.8rem;
                    color: #fff;
                    font-weight: 800;
                    letter-spacing: -0.5px;
                    margin-bottom: 8px;
                    line-height: 1.1;
                }

                .hero-subline {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.9rem;
                    max-width: 500px;
                }

                .btn-establish-p {
                    background: var(--gold-accent);
                    color: #fff;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 10px 20px rgba(200, 169, 81, 0.2);
                    z-index: 10;
                    font-size: 0.9rem;
                }

                .btn-establish-p:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(200, 169, 81, 0.4);
                    background: #d4b86a;
                }

                /* STATS MOSAIC */
                .stats-mosaic-p {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 16px;
                    margin-bottom: 24px;
                }

                .mosaic-card-p {
                    padding: 20px;
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    transition: all 0.3s;
                    background: #fff;
                    border: 1px solid var(--border-light);
                }

                .mosaic-card-p:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.03);
                }

                .m-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }

                .m-icon.blue { background: #eff6ff; color: #3b82f6; }
                .m-icon.green { background: #ecfdf5; color: #10b981; }
                .m-icon.gold { background: #fffbeb; color: var(--gold-accent); }
                .m-icon.crimson { background: #fff1f2; color: var(--crimson); }

                .m-info { display: flex; flex-direction: column; }
                .m-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
                .m-value { font-size: 1.6rem; font-weight: 800; color: var(--text-primary); }
                .m-footer { font-size: 0.65rem; font-weight: 700; color: var(--text-muted); opacity: 0.6; }
                .m-footer.active { color: #10b981; opacity: 1; }
                .m-footer.urgent { color: var(--crimson); opacity: 1; }

                /* REFINED TOOLBAR */
                .console-toolbar-p {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-bottom: 24px;
                    background: #fff;
                    padding: 20px;
                    border-radius: 20px;
                    border: 1px solid var(--border-light);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                }

                .toolbar-search-row {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .search-orchestrator {
                    position: relative;
                    flex: 1;
                }

                .s-icon {
                    position: absolute;
                    left: 18px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    font-size: 1.1rem;
                    z-index: 10;
                }

                .search-orchestrator input {
                    width: 100%;
                    padding: 12px 20px 12px 48px;
                    border-radius: 12px;
                    border: 1.5px solid #f1f5f9;
                    background: #f8fafc;
                    font-size: 0.9rem;
                    transition: all 0.3s;
                }

                .search-orchestrator input:focus {
                    outline: none;
                    background: #fff;
                    border-color: var(--crimson);
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .btn-reset-p {
                    background: #fff;
                    color: var(--text-muted);
                    border: 1.5px solid #f1f5f9;
                    padding: 0 20px;
                    height: 48px;
                    border-radius: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.85rem;
                    flex-shrink: 0;
                }

                .btn-reset-p:hover {
                    background: #fef2f2;
                    color: var(--crimson);
                    border-color: #fee2e2;
                }

                .toolbar-filters-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    padding-top: 16px;
                    border-top: 1px solid #f1f5f9;
                }

                .filter-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .filter-group label {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    padding-left: 4px;
                }

                .select-orchestrator {
                    position: relative;
                }

                .f-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--crimson);
                    pointer-events: none;
                    z-index: 10;
                }

                .select-orchestrator select {
                    padding: 0 40px 0 38px;
                    height: 46px;
                    border-radius: 12px;
                    border: 1.5px solid #f1f5f9;
                    background: #f8fafc;
                    font-size: 0.85rem;
                    font-weight: 700;
                    appearance: none;
                    cursor: pointer;
                    color: var(--text-primary);
                    transition: all 0.2s;
                }

                .select-orchestrator select:focus {
                    outline: none;
                    border-color: var(--crimson);
                    background: #fff;
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .select-lg { min-width: 200px; }

                /* ── CONFIRM / DELETE MODAL ── */
                .confirm-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.45);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                    animation: fadeIn 0.25s ease-out;
                }

                .confirm-modal {
                    background: #fff;
                    padding: 40px 36px;
                    border-radius: 28px;
                    width: 100%;
                    max-width: 450px;
                    text-align: center;
                    box-shadow: 0 32px 80px rgba(0,0,0,0.12);
                    animation: zoomInSpring 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: 1px solid rgba(0,0,0,0.04);
                }

                @keyframes zoomInSpring {
                    from { opacity: 0; transform: scale(0.88); }
                    to   { opacity: 1; transform: scale(1); }
                }

                .warning-visual {
                    width: 76px;
                    height: 76px;
                    background: rgba(139,26,43,0.07);
                    color: var(--crimson);
                    border-radius: 22px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.2rem;
                    margin: 0 auto 28px;
                    border: 1px solid rgba(139,26,43,0.1);
                }

                .confirm-modal h3 {
                    font-family: var(--font-heading);
                    font-size: 1.7rem;
                    margin-bottom: 12px;
                    font-weight: 800;
                    color: #1e293b;
                }
                .confirm-modal p {
                    color: #94a3b8;
                    line-height: 1.65;
                    margin-bottom: 36px;
                    font-size: 0.9rem;
                }

                .modal-actions-p { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
                .btn-secondary-p {
                    padding: 14px;
                    border-radius: 14px;
                    border: 1.5px solid #e2e8f0;
                    background: #fff;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: var(--font-body);
                    color: #475569;
                    font-size: 0.9rem;
                }
                .btn-secondary-p:hover { background: #f8fafc; border-color: #94a3b8; }
                .btn-danger-p {
                    padding: 14px;
                    border-radius: 14px;
                    border: none;
                    background: var(--crimson);
                    color: #fff;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: var(--font-body);
                    font-size: 0.9rem;
                }
                .btn-danger-p:hover { background: #6B1420; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(139,26,43,0.3); }

                /* ── VACANCY DETAIL MODAL ── */
                .vd-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.5);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                    animation: fadeIn 0.25s ease-out;
                }

                .vd-modal {
                    background: #fff;
                    border-radius: 28px;
                    width: 95%;
                    max-width: 860px;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.18);
                    animation: zoomInSpring 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: 1px solid rgba(0,0,0,0.04);
                }

                /* HEADER */
                .vd-header {
                    background: linear-gradient(135deg, #1a0208 0%, #2a050b 45%, #3d0813 100%);
                    padding: 28px 32px 24px;
                    position: relative;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .vd-header-glow {
                    position: absolute;
                    top: -60px;
                    right: -60px;
                    width: 260px;
                    height: 260px;
                    background: radial-gradient(circle, rgba(200,169,81,0.25) 0%, transparent 70%);
                    pointer-events: none;
                }

                .vd-header-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 14px;
                    position: relative;
                    z-index: 2;
                }

                .vd-status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.08);
                    border: 1px solid rgba(255,255,255,0.14);
                    padding: 5px 14px;
                    border-radius: 100px;
                    font-size: 0.62rem;
                    font-weight: 800;
                    color: rgba(255,255,255,0.8);
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                }

                .vd-status-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }
                .vd-status-dot.live  { background: #10b981; box-shadow: 0 0 8px rgba(16,185,129,0.6); animation: orbPulse 2s infinite; }
                .vd-status-dot.ended { background: #94a3b8; }

                .vd-close-btn {
                    width: 38px;
                    height: 38px;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.18);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 1.05rem;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }
                .vd-close-btn:hover { background: rgba(255,255,255,0.18); transform: scale(1.05); }

                .vd-title {
                    font-family: var(--font-heading);
                    font-size: 1.9rem;
                    font-weight: 800;
                    color: #fff;
                    margin: 0 0 12px 0;
                    letter-spacing: -0.5px;
                    line-height: 1.15;
                    position: relative;
                    z-index: 2;
                }

                .vd-company-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                    position: relative;
                    z-index: 2;
                }

                .vd-company-logo {
                    width: 36px;
                    height: 36px;
                    object-fit: contain;
                    border-radius: 8px;
                    background: #fff;
                    border: 2px solid rgba(255,255,255,0.2);
                    padding: 3px;
                    flex-shrink: 0;
                }

                .vd-company-name {
                    color: rgba(255,255,255,0.7);
                    font-size: 0.88rem;
                    font-weight: 600;
                }

                .vd-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    position: relative;
                    z-index: 2;
                }

                .vd-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(255,255,255,0.08);
                    color: rgba(255,255,255,0.82);
                    padding: 5px 13px;
                    border-radius: 100px;
                    font-size: 0.72rem;
                    font-weight: 700;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .vd-pill.ref {
                    background: rgba(200,169,81,0.15);
                    color: #C8A951;
                    border-color: rgba(200,169,81,0.3);
                    font-family: 'JetBrains Mono', monospace;
                    letter-spacing: 0.5px;
                }

                /* BODY */
                .vd-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 28px 32px;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(0,0,0,0.1) transparent;
                }

                .vd-meta-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 14px;
                    margin-bottom: 28px;
                }

                .vd-meta-item {
                    background: #f8fafc;
                    border: 1px solid #f1f5f9;
                    border-radius: 16px;
                    padding: 16px 18px;
                    transition: all 0.2s;
                }
                .vd-meta-item:hover {
                    background: #fff;
                    border-color: #e2e8f0;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.04);
                }

                .vd-meta-label {
                    display: block;
                    font-size: 0.62rem;
                    font-weight: 800;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1.2px;
                    margin-bottom: 7px;
                }

                .vd-meta-value {
                    margin: 0;
                    font-weight: 700;
                    color: #1e293b;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .vd-meta-value.urgent { color: var(--crimson); }

                .vd-section { margin-bottom: 24px; }

                .vd-section-title {
                    font-family: var(--font-heading);
                    font-size: 1.05rem;
                    font-weight: 800;
                    color: #1e293b;
                    margin: 0 0 14px 0;
                    display: flex;
                    align-items: center;
                    gap: 9px;
                }
                .vd-section-title svg { color: var(--crimson); }
                .vd-section-title.gold svg { color: var(--gold-accent, #C8A951); }

                .vd-section-body-enhanced {
                    background: #fff;
                    border: 1px solid #e9eef5;
                    border-radius: 20px;
                    padding: 24px 28px;
                    line-height: 1.8;
                    color: #475569;
                    font-size: 0.92rem;
                    transition: all 0.2s;
                }
                .vd-section-body-enhanced:hover {
                    border-color: #d1d9e6;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.02);
                }
                .vd-section-body-enhanced.green {
                    background: rgba(16, 185, 129, 0.01);
                }

                .formatted-list {
                    margin: 14px 0;
                    padding-left: 0;
                    list-style: none;
                }
                .formatted-list li {
                    position: relative;
                    margin-bottom: 10px;
                    padding-left: 24px;
                    line-height: 1.6;
                }
                .formatted-list li::before {
                    content: "•";
                    position: absolute;
                    left: 4px;
                    color: var(--crimson);
                    font-weight: 800;
                    font-size: 1.2rem;
                    line-height: 1;
                }
                .vd-section-body-enhanced.green .formatted-list li::before {
                    color: #10b981;
                }

                .formatted-heading {
                    font-weight: 800;
                    color: #1e293b;
                    margin: 20px 0 10px 0;
                    font-size: 0.95rem;
                    letter-spacing: -0.2px;
                    text-transform: uppercase;
                }
                .formatted-paragraph {
                    margin-bottom: 14px;
                }
                .formatted-spacer {
                    height: 14px;
                }

                .vd-empty-note {
                    color: #94a3b8;
                    font-style: italic;
                    font-size: 0.88rem;
                }

                /* FOOTER */
                .vd-footer {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 12px;
                    padding: 18px 28px;
                    border-top: 1px solid #f1f5f9;
                    background: #fcfcfd;
                    flex-shrink: 0;
                }

                .vd-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 22px;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 0.88rem;
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
                    font-family: var(--font-body);
                    border: none;
                }
                .vd-btn:hover { transform: translateY(-2px); }

                .vd-btn.cancel {
                    background: transparent;
                    border: 1.5px solid #e2e8f0;
                    color: #64748b;
                }
                .vd-btn.cancel:hover { background: #f8fafc; border-color: #94a3b8; transform: none; }

                .vd-btn.primary {
                    background: var(--crimson);
                    color: #fff;
                    box-shadow: 0 4px 16px rgba(139,26,43,0.25);
                }
                .vd-btn.primary:hover { background: #6B1420; box-shadow: 0 8px 24px rgba(139,26,43,0.35); }

                .vd-btn.gold {
                    background: linear-gradient(135deg, #C8A951, #d4b86a);
                    color: #1a1a2e;
                    box-shadow: 0 4px 16px rgba(200,169,81,0.3);
                }
                .vd-btn.gold:hover { box-shadow: 0 8px 24px rgba(200,169,81,0.4); }

                @media (max-width: 640px) {
                    .vd-meta-grid { grid-template-columns: repeat(2, 1fr); }
                    .vd-title { font-size: 1.5rem; }
                    .vd-header { padding: 24px 20px 20px; }
                    .vd-body { padding: 20px; }
                    .vd-footer { flex-direction: column; align-items: stretch; }
                    .vd-btn { justify-content: center; }
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                /* RESPONSIVENESS */
                @media (max-width: 1024px) {
                    .vacancies-orchestration-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 20px;
                        padding: 24px;
                        border-radius: 16px;
                    }
                    
                    .serif-title-p { font-size: 2rem; }
                    
                    .stats-mosaic-p {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .console-toolbar-p {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }
                    
                    .search-orchestrator {
                        max-width: 100%;
                        width: 100%;
                    }
                    
                    .toolbar-actions-p {
                        width: 100%;
                    }
                    
                    .select-orchestrator select {
                        width: 100%;
                    }
                }

                @media (max-width: 768px) {
                    .orchestrated-table thead { display: none; }
                    
                    .orchestrated-table tr {
                        display: block;
                        padding: 20px;
                        border-bottom: 8px solid #f8fafc;
                    }
                    
                    .orchestrated-table td {
                        display: block;
                        padding: 12px 0;
                        border: none;
                        width: 100%;
                    }
                    
                    .orchestrated-table td::before {
                        content: attr(data-label);
                        display: block;
                        font-size: 0.7rem;
                        font-weight: 800;
                        color: #94a3b8;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 6px;
                    }
                    
                    .orchestration-actions {
                        justify-content: flex-start;
                    }
                }

                @media (max-width: 480px) {
                    .stats-mosaic-p {
                        grid-template-columns: 1fr;
                    }
                    
                    .serif-title-p { font-size: 1.8rem; }
                }
            `})]})}const oy=Et.replace("/api","");function Rf({admin:s}){var fe;const a=Ut(),{id:n}=Qf(),o=!!n,[l,d]=F.useState(!1),[u,f]=F.useState(o),[h,b]=F.useState([]),[j,N]=F.useState(0),[w,_]=F.useState([]),[v,x]=F.useState(!1),[g,S]=F.useState(!1),[z,T]=F.useState(!1),[E,A]=F.useState({company_id:s.role==="sub_admin"?s.company_id:"",reference_number:"",title:"",designation:"",description:"",requirements:"",location:"",employment_type:"Full-Time",min_experience:"0 years",min_relevant_experience:"0 years",publish_date:new Date().toISOString().split("T")[0],expire_date:"",is_active:1});F.useEffect(()=>{V()},[n]),F.useEffect(()=>{if(E.designation||E.title||E.company_id){const L=setTimeout(()=>{D()},500);return()=>clearTimeout(L)}},[E.designation,E.title,E.company_id]);const D=async()=>{var L,H;try{S(!0);const k=await rb({designation:E.designation,title:E.title,company_id:E.company_id});N(((H=(L=k.data)==null?void 0:L.data)==null?void 0:H.count)||0)}catch(k){console.error("Match count error:",k)}finally{S(!1)}},B=async()=>{var L;try{T(!0),x(!0);const H=await nb({designation:E.designation,title:E.title,company_id:E.company_id});_(((L=H.data)==null?void 0:L.data)||[])}catch{me.error("Failed to load matching candidates"),x(!1)}finally{T(!1)}},V=async()=>{try{d(!0);const H=(await un()).data.data||[];if(b(H),o){const J=(await zh(n)).data.data;J&&A({company_id:J.company_id,reference_number:J.reference_number||"",title:J.title,designation:J.designation,description:J.description||"",requirements:J.requirements||"",location:J.location||"",employment_type:J.employment_type,min_experience:J.min_experience||"0 years",min_relevant_experience:J.min_relevant_experience||"0 years",publish_date:J.publish_date,expire_date:J.expire_date,is_active:J.is_active})}else{const k=s.role==="sub_admin"?s.company_id:"";if(k){const J=H.find(ve=>ve.id==k);J&&J.location&&A(ve=>({...ve,location:J.location}))}}}catch(L){console.error(L),me.error("Failed to load dependency data")}finally{d(!1),f(!1)}},U=L=>{const{name:H,value:k}=L.target;if(H==="company_id"){const J=h.find(ve=>ve.id==k);A(ve=>({...ve,company_id:k,location:J&&J.location?J.location:""}))}else A(J=>({...J,[H]:k}))},G=async L=>{var H,k;if(L.preventDefault(),!E.company_id||!E.title||!E.designation||!E.description||!E.publish_date||!E.expire_date){me.error("Please fill in all required fields");return}try{d(!0),o?(await Yv({...E,id:n}),me.success("Vacancy updated successfully")):(await Gv(E),me.success("Vacancy created successfully")),a("/admin/vacancies")}catch(J){me.error(((k=(H=J.response)==null?void 0:H.data)==null?void 0:k.message)||"Operation failed")}finally{d(!1)}};return u?e.jsx("div",{className:"loading-spinner",children:e.jsx("div",{className:"spinner"})}):e.jsxs("div",{className:"create-vacancy-page",children:[e.jsxs("div",{className:"vacancies-orchestration-header",children:[e.jsxs("div",{className:"header-content-p",children:[e.jsxs("div",{className:"badge-p",children:[e.jsx("span",{className:"dot pulse"}),o?"REVISION CONSOLE":"POSTING ORCHESTRATOR"]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("button",{className:"back-btn-minimal",onClick:()=>a("/admin/vacancies"),children:e.jsx(Gr,{})}),e.jsx("h1",{className:"hero-title-p",children:o?"Edit Vacancy":"Create New Vacancy"})]}),e.jsx("p",{className:"hero-subtitle-p",children:"Provide details for the job opening to attract the best talent."})]}),j>0&&e.jsxs("div",{className:"hero-stats-glass animate-bounce-in",onClick:B,children:[e.jsxs("div",{className:"h-stat-item",children:[e.jsx("span",{className:"h-label",children:"AUTO-MATCH"}),e.jsx("span",{className:"h-value",children:j})]}),e.jsx(Ia,{className:"h-stat-icon"})]})]}),e.jsxs("form",{onSubmit:G,className:"premium-form-layout",children:[e.jsxs("div",{className:"form-sections-container",children:[e.jsxs("section",{className:"form-section-card",children:[e.jsxs("div",{className:"section-header",style:{marginBottom:"16px",paddingBottom:"12px"},children:[e.jsx("div",{className:"section-icon",style:{width:"40px",height:"40px",fontSize:"1.2rem"},children:e.jsx(At,{})}),e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1.1rem"},children:"Basic Information"}),e.jsx("p",{style:{fontSize:"0.8rem"},children:"Essential details about the job role."})]})]}),e.jsxs("div",{className:"admin-grid-2",children:[e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"company_id",children:["Company ",e.jsx("span",{className:"required",children:"*"})]}),e.jsxs("div",{className:"input-with-preview",style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("div",{className:"input-wrapper",style:{flex:1},children:e.jsxs("select",{id:"company_id",name:"company_id",value:E.company_id,onChange:U,disabled:s.role==="sub_admin",className:"premium-input",children:[e.jsx("option",{value:"",children:"Select company"}),h.map(L=>e.jsx("option",{value:L.id,children:L.name},L.id))]})}),E.company_id&&e.jsx("div",{className:"company-logo-preview animate-fade-in",style:{width:"50px",height:"50px",borderRadius:"12px",background:"#fff",border:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px",flexShrink:0,boxShadow:"0 4px 12px rgba(0,0,0,0.05)"},children:e.jsx("img",{src:(fe=h.find(L=>L.id==E.company_id))!=null&&fe.logo?`${oy}/uploads/logos/${h.find(L=>L.id==E.company_id).logo}`:"/gs-logo.png",alt:"Preview",onError:L=>L.target.src="/gs-logo.png",style:{width:"100%",height:"100%",objectFit:"contain"}})})]})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"reference_number",children:"Reference Number"}),e.jsx("div",{className:"input-wrapper",children:e.jsx("input",{id:"reference_number",type:"text",name:"reference_number",value:E.reference_number,onChange:U,placeholder:"e.g. GS/ENG/2026/001",className:"premium-input"})})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"employment_type",children:"Employment Type"}),e.jsx("div",{className:"input-wrapper",children:e.jsx("select",{id:"employment_type",name:"employment_type",value:E.employment_type,onChange:U,className:"premium-input",children:fb.map(L=>e.jsx("option",{value:L,children:L},L))})})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"min_experience",children:"Min. Overall Experience"}),e.jsx("div",{className:"input-wrapper",children:e.jsxs("select",{id:"min_experience",name:"min_experience",value:E.min_experience,onChange:U,className:"premium-input",children:[e.jsx("option",{value:"0 years",children:"0 years (Freshers)"}),e.jsx("option",{value:"0-1 years",children:"0–1 years"}),e.jsx("option",{value:"1-2 years",children:"1–2 years"}),e.jsx("option",{value:"3-4 years",children:"3–4 years"}),e.jsx("option",{value:"5-7 years",children:"5–7 years"}),e.jsx("option",{value:"8-10 years",children:"8–10 years"}),e.jsx("option",{value:"10+ years",children:"10+ years"})]})})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"min_relevant_experience",children:"Min. Relevant Experience"}),e.jsx("div",{className:"input-wrapper",children:e.jsxs("select",{id:"min_relevant_experience",name:"min_relevant_experience",value:E.min_relevant_experience,onChange:U,className:"premium-input",children:[e.jsx("option",{value:"0 years",children:"0 years (Freshers)"}),e.jsx("option",{value:"0-1 years",children:"0–1 years"}),e.jsx("option",{value:"1-2 years",children:"1–2 years"}),e.jsx("option",{value:"3-4 years",children:"3–4 years"}),e.jsx("option",{value:"5-7 years",children:"5–7 years"}),e.jsx("option",{value:"8-10 years",children:"8–10 years"}),e.jsx("option",{value:"10+ years",children:"10+ years"})]})})]}),e.jsxs("div",{className:"form-group-p full-width",children:[e.jsxs("label",{htmlFor:"title",children:["Job Title ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("div",{className:"input-wrapper",children:e.jsx("input",{id:"title",type:"text",name:"title",value:E.title,onChange:U,placeholder:"e.g. Senior Software Engineer",className:"premium-input"})})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"designation",children:["Designation ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("div",{className:"input-wrapper",children:e.jsx("input",{id:"designation",type:"text",name:"designation",value:E.designation,onChange:U,placeholder:"e.g. Engineering",className:"premium-input"})})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"location",children:"Location"}),e.jsxs("div",{className:"input-wrapper",children:[e.jsx(xt,{className:"input-icon"}),e.jsx("input",{id:"location",type:"text",name:"location",value:E.location,onChange:U,placeholder:"e.g. Colombo, Sri Lanka",className:"premium-input with-icon"})]})]})]})]}),e.jsxs("section",{className:"form-section-card",children:[e.jsxs("div",{className:"section-header",style:{marginBottom:"16px",paddingBottom:"12px"},children:[e.jsx("div",{className:"section-icon",style:{width:"40px",height:"40px",fontSize:"1.2rem"},children:e.jsx(qt,{})}),e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1.1rem"},children:"Dates & Visibility"}),e.jsx("p",{style:{fontSize:"0.8rem"},children:"Control when the vacancy is visible to applicants."})]})]}),e.jsxs("div",{className:"admin-grid-3",children:[e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"publish_date",children:["Publish Date ",e.jsx("span",{className:"required",children:"*"})]}),e.jsxs("div",{className:"input-wrapper",children:[e.jsx(ln,{className:"input-icon"}),e.jsx("input",{id:"publish_date",type:"date",name:"publish_date",value:E.publish_date,onChange:U,className:"premium-input with-icon"})]})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"expire_date",children:["Expiration Date ",e.jsx("span",{className:"required",children:"*"})]}),e.jsxs("div",{className:"input-wrapper",children:[e.jsx(ln,{className:"input-icon"}),e.jsx("input",{id:"expire_date",type:"date",name:"expire_date",value:E.expire_date,onChange:U,className:"premium-input with-icon"})]})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"is_active",children:"Status"}),e.jsx("div",{className:"input-wrapper",children:e.jsxs("select",{id:"is_active",name:"is_active",value:E.is_active,onChange:L=>A(H=>({...H,is_active:parseInt(L.target.value)})),className:"premium-input",children:[e.jsx("option",{value:1,children:"Active"}),e.jsx("option",{value:0,children:"Inactive"})]})})]})]})]}),e.jsxs("section",{className:"form-section-card",children:[e.jsxs("div",{className:"section-header",style:{marginBottom:"16px",paddingBottom:"12px"},children:[e.jsx("div",{className:"section-icon",style:{width:"40px",height:"40px",fontSize:"1.2rem"},children:e.jsx(Oa,{})}),e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1.1rem"},children:"Job Description & Requirements"}),e.jsx("p",{style:{fontSize:"0.8rem"},children:"Provide a detailed overview of the role and what's expected."})]})]}),e.jsxs("div",{className:"form-vertical",children:[e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"description",children:["Job Description ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("div",{className:"input-wrapper",children:e.jsx("textarea",{id:"description",name:"description",value:E.description,onChange:U,rows:"8",placeholder:"Describe the role, responsibilities, and day-to-day activities...",className:"premium-textarea"})})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"requirements",children:"Requirements & Qualifications"}),e.jsx("div",{className:"input-wrapper",children:e.jsx("textarea",{id:"requirements",name:"requirements",value:E.requirements,onChange:U,rows:"6",placeholder:"List the required skills, experience, and academic qualifications...",className:"premium-textarea"})})]})]})]})]}),e.jsx("div",{className:"form-sidebar-container",children:e.jsxs("div",{className:"sticky-sidebar",children:[e.jsxs("div",{className:"status-preview-card",style:{padding:"20px"},children:[e.jsx("h4",{style:{fontSize:"1rem",marginBottom:"16px"},children:"Post Summary"}),e.jsxs("div",{className:"preview-stat",style:{marginBottom:"10px"},children:[e.jsx("span",{className:"label",children:"Title:"}),e.jsx("span",{className:"value",style:{fontSize:"0.9rem"},children:E.title||"Untitled Role"})]}),e.jsxs("div",{className:"preview-stat",style:{marginBottom:"10px"},children:[e.jsx("span",{className:"label",children:"Ref. No:"}),e.jsx("span",{className:"value",style:{fontSize:"0.9rem"},children:E.reference_number||"N/A"})]}),e.jsxs("div",{className:"preview-stat",style:{marginBottom:"10px"},children:[e.jsx("span",{className:"label",children:"Type:"}),e.jsx("span",{className:"value",style:{fontSize:"0.9rem"},children:E.employment_type})]}),e.jsxs("div",{className:"preview-stat",style:{marginBottom:"10px"},children:[e.jsx("span",{className:"label",children:"Status:"}),e.jsx("span",{className:`status-badge ${E.is_active?"active":"inactive"}`,style:{padding:"4px 10px",fontSize:"0.7rem"},children:E.is_active?"Active":"Draft"})]}),e.jsxs("div",{className:"preview-stat",style:{marginBottom:"16px"},children:[e.jsx("span",{className:"label",children:"Exp:"}),e.jsx("span",{className:"value",style:{fontSize:"0.9rem"},children:E.min_experience})]}),j>0&&e.jsxs("div",{className:"auto-match-alert animate-bounce-in",style:{padding:"12px",marginTop:"16px"},children:[e.jsx("div",{className:"alert-badge",style:{fontSize:"0.65rem",padding:"2px 8px"},children:"🔥 Auto-Match"}),e.jsxs("p",{style:{fontSize:"0.8rem",margin:"8px 0"},children:[e.jsx("strong",{children:j})," candidates already available!"]}),e.jsxs("button",{type:"button",className:"view-matches-btn",onClick:B,style:{padding:"6px 12px",fontSize:"0.75rem"},children:[e.jsx(Ia,{})," View Candidates"]})]}),e.jsx("hr",{style:{margin:"20px 0"}}),e.jsxs("div",{className:"form-actions-p",style:{gap:"10px"},children:[e.jsx("button",{type:"submit",className:"btn btn-gold full-width",disabled:l,style:{padding:"12px 20px",fontSize:"0.9rem"},children:l?e.jsx("div",{className:"spinner-small"}):e.jsxs(e.Fragment,{children:[e.jsx(Eb,{})," ",o?"Update Vacancy":"Create Vacancy"]})}),e.jsx("button",{type:"button",className:"btn btn-outline full-width",onClick:()=>a("/admin/vacancies"),style:{padding:"12px 20px",fontSize:"0.9rem"},children:"Cancel"})]})]}),e.jsxs("div",{className:"tips-card",style:{padding:"20px"},children:[e.jsxs("div",{className:"tips-header",style:{marginBottom:"12px"},children:[e.jsx(Ma,{}),e.jsx("h5",{style:{fontSize:"0.9rem"},children:"Pro-Tips"})]}),e.jsxs("ul",{style:{fontSize:"0.8rem"},children:[e.jsx("li",{style:{marginBottom:"8px"},children:"Use a clear, descriptive job title."}),e.jsx("li",{style:{marginBottom:"8px"},children:"Be specific about the location."}),e.jsx("li",{style:{marginBottom:"8px"},children:"Highlight the most important requirements in the first few lines."}),e.jsx("li",{children:"Ensure the expiration date gives enough time for applications."})]})]})]})})]}),v&&e.jsx("div",{className:"modal-overlay-p",onClick:()=>x(!1),children:e.jsxs("div",{className:"match-modal-p",onClick:L=>L.stopPropagation(),children:[e.jsxs("div",{className:"modal-header-p",children:[e.jsxs("div",{className:"header-info-p",children:[e.jsx(er,{className:"modal-icon"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Matching Candidates"}),e.jsxs("p",{children:['Showing candidates matching "',E.designation,'" or company requirements.']})]})]}),e.jsx("button",{className:"close-btn-p",onClick:()=>x(!1),children:e.jsx(ct,{})})]}),e.jsx("div",{className:"modal-body-p",children:z?e.jsxs("div",{className:"loading-state",children:[e.jsx("div",{className:"spinner-p"}),e.jsx("p",{children:"Searching talent pool..."})]}):w.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx(er,{size:48}),e.jsx("p",{children:"No candidates found matching these criteria."})]}):e.jsx("div",{className:"match-list",children:w.map((L,H)=>e.jsxs("div",{className:"match-item-card",children:[e.jsxs("div",{className:"cand-main-info",children:[e.jsx("div",{className:"cand-avatar",children:e.jsx(kr,{})}),e.jsxs("div",{className:"cand-details-p",children:[e.jsxs("h3",{children:[L.first_name," ",L.last_name]}),e.jsxs("p",{className:"last-applied",children:["Last applied for: ",e.jsx("strong",{children:L.last_applied_vacancy})," (",e.jsx("i",{children:L.last_applied_company}),")"]}),e.jsxs("div",{className:"cand-tags",children:[e.jsxs("span",{className:"tag-p",children:[L.overall_experience," Exp"]}),e.jsx("span",{className:"tag-p",children:L.qualification})]})]})]}),e.jsxs("div",{className:"cand-actions-p",children:[e.jsxs("a",{href:`${Et}/applications.php?action=view_cv&file=${encodeURIComponent(L.cv_path)}`,target:"_blank",rel:"noreferrer",className:"btn btn-gold btn-sm",children:[e.jsx(qr,{})," View CV"]}),e.jsxs("a",{href:`mailto:${L.email}?subject=Exciting Opportunity: ${E.title} at George Steuart`,className:"btn btn-outline btn-sm",children:[e.jsx(cr,{})," Contact"]})]})]},H))})})]})}),e.jsx("style",{jsx:"true",children:`
                .create-vacancy-page {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .back-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: none;
                    border: none;
                    color: var(--crimson);
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    padding: 0;
                    margin-bottom: 12px;
                    transition: var(--transition-fast);
                }

                .back-btn:hover {
                    transform: translateX(-5px);
                }

                /* NORMAL SIZING HEADER */
                .vacancies-orchestration-header {
                    position: relative;
                    padding: 24px;
                    border-radius: 24px;
                    overflow: hidden;
                    margin-bottom: 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    background: linear-gradient(135deg, #2a050b 0%, var(--crimson-dark) 100%);
                    box-shadow: 0 10px 30px rgba(139, 26, 43, 0.15);
                }

                .vacancies-orchestration-header::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 20px 20px;
                    pointer-events: none;
                }

                .header-content-p { position: relative; z-index: 2; }

                .badge-p {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(200, 169, 81, 0.15);
                    color: var(--gold-accent);
                    padding: 5px 12px;
                    border-radius: 100px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 12px;
                }

                .dot { width: 6px; height: 6px; border-radius: 50%; }
                .dot.pulse { background: #10b981; animation: pulse 2s infinite; }

                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }

                .hero-title-p {
                    font-family: var(--font-heading);
                    font-size: 1.8rem;
                    color: #fff;
                    margin: 0;
                }

                .hero-subtitle-p {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.9rem;
                    margin-top: 6px;
                }

                .back-btn-minimal {
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .back-btn-minimal:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateX(-3px);
                }

                .hero-stats-glass {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 12px 20px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    cursor: pointer;
                    transition: all 0.3s;
                    z-index: 2;
                }

                .hero-stats-glass:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-3px);
                    border-color: var(--gold-accent);
                }

                .h-stat-item {
                    display: flex;
                    flex-direction: column;
                }

                .h-label {
                    font-size: 0.6rem;
                    font-weight: 800;
                    color: rgba(255,255,255,0.5);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .h-value {
                    font-size: 1.2rem;
                    font-weight: 800;
                    color: var(--gold-accent);
                }

                .h-stat-icon {
                    color: #fff;
                    font-size: 1.2rem;
                    opacity: 0.3;
                }

                .premium-form-layout {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 24px;
                    align-items: start;
                    margin-top: 2rem;
                }

                @media (max-width: 992px) {
                    .premium-form-layout {
                        grid-template-columns: 1fr;
                    }
                }

                /* Modal Styles */
                .modal-overlay-p {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                }

                .match-modal-p {
                    background: #fff;
                    width: 100%;
                    max-width: 700px;
                    max-height: 90vh;
                    border-radius: var(--radius-lg);
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
                    animation: slideUp 0.3s ease-out;
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .modal-header-p {
                    padding: 20px 24px;
                    border-bottom: 1px solid var(--border-light);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .header-info-p {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .modal-icon {
                    font-size: 1.8rem;
                    color: var(--gold-accent);
                }

                .modal-header-p h2 {
                    margin: 0;
                    font-family: var(--font-heading);
                    font-size: 1.5rem;
                    color: #333;
                }

                .modal-header-p p {
                    margin: 2px 0 0;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }

                .close-btn-p {
                    background: #f1f5f9;
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: var(--text-secondary);
                    transition: all 0.2s;
                }

                .close-btn-p:hover { background: #e2e8f0; color: var(--text-primary); }

                .modal-body-p {
                    padding: 24px;
                    overflow-y: auto;
                    flex: 1;
                }

                .loading-state, .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--text-muted);
                }

                .spinner-p {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(200, 169, 81, 0.1);
                    border-top-color: var(--gold-accent);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 15px;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .match-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .match-item-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: var(--radius-md);
                    transition: all 0.2s;
                }

                .match-item-card:hover {
                    border-color: var(--gold-accent);
                    background: #fff;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .cand-main-info {
                    display: flex;
                    gap: 15px;
                    align-items: flex-start;
                }

                .cand-avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--gold-accent);
                    font-size: 1.2rem;
                }

                .cand-details-p h3 {
                    margin: 0;
                    font-size: 1rem;
                    color: var(--text-primary);
                }

                .last-applied {
                    margin: 4px 0 8px;
                    font-size: 0.8rem;
                    color: var(--text-muted);
                }

                .cand-tags {
                    display: flex;
                    gap: 8px;
                }

                .tag-p {
                    font-size: 0.7rem;
                    padding: 2px 8px;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                    font-weight: 600;
                    color: var(--text-secondary);
                }

                .cand-actions-p {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .btn-sm {
                   padding: 6px 14px;
                   font-size: 0.75rem;
                }

                .form-sections-container {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .form-section-card {
                    background: #fff;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-light);
                    padding: 24px;
                    box-shadow: var(--shadow-sm);
                }

                .section-header {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 24px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid var(--border-light);
                }

                .section-icon {
                    width: 48px;
                    height: 48px;
                    background: rgba(139, 26, 43, 0.05);
                    color: var(--crimson);
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.4rem;
                }

                .section-header h3 {
                    font-size: 1.15rem;
                    font-weight: 700;
                    margin-bottom: 2px;
                    color: var(--text-primary);
                }

                .section-header p {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }

                .form-grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }

                .form-grid-3 {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 20px;
                }

                .full-width {
                    grid-column: 1 / -1;
                }

                .form-group-p {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-group-p label {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                }

                .required {
                    color: var(--danger);
                }

                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-icon {
                    position: absolute;
                    left: 14px;
                    color: var(--text-muted);
                    font-size: 1rem;
                }

                .premium-input {
                    width: 100%;
                    padding: 12px 16px;
                    background: #fff;
                    border: 1px solid #eef0f2;
                    border-radius: var(--radius-md);
                    font-size: 0.95rem;
                    transition: all 0.2s ease;
                    color: var(--text-primary);
                }

                .premium-input:focus {
                    outline: none;
                    border-color: var(--crimson);
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .premium-input.with-icon {
                    padding-left: 42px;
                }

                .premium-textarea {
                    width: 100%;
                    padding: 14px 16px;
                    background: #fff;
                    border: 1px solid #eef0f2;
                    border-radius: var(--radius-md);
                    font-size: 0.95rem;
                    resize: vertical;
                    min-height: 120px;
                    font-family: inherit;
                    transition: all 0.2s ease;
                }

                .premium-textarea:focus {
                    outline: none;
                    border-color: var(--crimson);
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .sticky-sidebar {
                    position: sticky;
                    top: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .status-preview-card {
                    background: #fff;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-light);
                    padding: 24px;
                    box-shadow: var(--shadow-sm);
                }

                .status-preview-card h4 {
                    font-size: 1rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    color: var(--text-primary);
                }

                .preview-stat {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;
                    font-size: 0.9rem;
                }

                .preview-stat .label {
                    color: var(--text-muted);
                }

                .preview-stat .value {
                    font-weight: 600;
                    color: var(--text-primary);
                    text-align: right;
                    max-width: 160px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .status-badge {
                    padding: 4px 10px;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .status-badge.active {
                    background: rgba(22, 163, 74, 0.1);
                    color: var(--success);
                }

                .status-badge.inactive {
                    background: #f0f2f5;
                    color: var(--text-muted);
                }

                .form-actions-p {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-top: 20px;
                }

                .full-width {
                    width: 100%;
                    justify-content: center;
                }

                .tips-card {
                    background: #1f1f2e;
                    color: #fff;
                    border-radius: var(--radius-lg);
                    padding: 24px;
                    box-shadow: var(--shadow-md);
                }

                .tips-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 16px;
                    color: var(--gold-accent);
                }

                .tips-header h5 {
                    margin: 0;
                    font-size: 0.95rem;
                    font-weight: 700;
                }

                .tips-card ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .tips-card li {
                    font-size: 0.85rem;
                    margin-bottom: 12px;
                    color: rgba(255, 255, 255, 0.7);
                    position: relative;
                    padding-left: 18px;
                }

                .tips-card li::before {
                    content: '•';
                    position: absolute;
                    left: 0;
                    color: var(--gold-accent);
                    font-weight: bold;
                }

                .spinner-small {
                    width: 18px;
                    height: 18px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.6s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                hr {
                    border: none;
                    border-top: 1px solid var(--border-light);
                    margin: 20px 0;
                }

                .auto-match-alert {
                    margin-top: 20px;
                    padding: 16px;
                    background: rgba(200, 169, 81, 0.08);
                    border: 1px solid rgba(200, 169, 81, 0.2);
                    border-radius: var(--radius-md);
                    text-align: center;
                }

                .alert-badge {
                    display: inline-block;
                    padding: 3px 10px;
                    background: var(--gold-accent);
                    color: #fff;
                    font-size: 0.7rem;
                    font-weight: 800;
                    border-radius: 100px;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .auto-match-alert p {
                    margin: 0;
                    font-size: 0.85rem;
                    color: var(--text-primary);
                }

                .view-matches-btn {
                    margin-top: 10px;
                    background: transparent;
                    border: 1px solid var(--gold-accent);
                    color: var(--gold-accent);
                    padding: 6px 12px;
                    border-radius: var(--radius-sm);
                    font-size: 0.8rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.2s;
                }

                .view-matches-btn:hover {
                    background: var(--gold-accent);
                    color: #fff;
                }

                /* Modal Styles */
                .modal-overlay-p {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                }

                .match-modal-p {
                    background: #fff;
                    width: 100%;
                    max-width: 700px;
                    max-height: 90vh;
                    border-radius: var(--radius-lg);
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
                    animation: slideUp 0.3s ease-out;
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .modal-header-p {
                    padding: 20px 24px;
                    border-bottom: 1px solid var(--border-light);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .header-info-p {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .modal-icon {
                    font-size: 1.8rem;
                    color: var(--gold-accent);
                }

                .modal-header-p h2 {
                    margin: 0;
                    font-family: var(--font-heading);
                    font-size: 1.5rem;
                }

                .modal-header-p p {
                    margin: 2px 0 0;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }

                .close-btn-p {
                    background: #f1f5f9;
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: var(--text-secondary);
                    transition: all 0.2s;
                }

                .close-btn-p:hover { background: #e2e8f0; color: var(--text-primary); }

                .modal-body-p {
                    padding: 24px;
                    overflow-y: auto;
                    flex: 1;
                }

                .loading-state, .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--text-muted);
                }

                .spinner-p {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(200, 169, 81, 0.1);
                    border-top-color: var(--gold-accent);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 15px;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .match-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .match-item-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: var(--radius-md);
                    transition: all 0.2s;
                }

                .match-item-card:hover {
                    border-color: var(--gold-accent);
                    background: #fff;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .cand-main-info {
                    display: flex;
                    gap: 15px;
                    align-items: flex-start;
                }

                .cand-avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--gold-accent);
                    font-size: 1.2rem;
                }

                .cand-details-p h3 {
                    margin: 0;
                    font-size: 1rem;
                    color: var(--text-primary);
                }

                .last-applied {
                    margin: 4px 0 8px;
                    font-size: 0.8rem;
                    color: var(--text-muted);
                }

                .cand-tags {
                    display: flex;
                    gap: 8px;
                }

                .tag-p {
                    font-size: 0.7rem;
                    padding: 2px 8px;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                    font-weight: 600;
                    color: var(--text-secondary);
                }

                .cand-actions-p {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .btn-sm {
                   padding: 6px 14px;
                   font-size: 0.75rem;
                }

                .animate-bounce-in {
                    animation: bounceIn 0.5s ease-out;
                }

                @keyframes bounceIn {
                    0% { transform: scale(0.8); opacity: 0; }
                    70% { transform: scale(1.05); }
                    100% { transform: scale(1); opacity: 1; }
                }

                /* RESPONSIVENESS */
                @media (max-width: 1024px) {
                    .create-vacancy-page {
                        padding: 20px;
                    }
                    
                    .vacancies-orchestration-header {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 32px 24px;
                    }
                    
                    .hero-title-p { font-size: 1.8rem; }
                }

                @media (max-width: 992px) {
                    .premium-form-layout {
                        grid-template-columns: 1fr;
                    }
                    
                    .sticky-sidebar {
                        position: static;
                        margin-top: 24px;
                    }
                }

                @media (max-width: 768px) {
                    /* Grid stacking handled by global utilities */
                    
                    .form-section-card {
                        padding: 24px;
                    }
                    
                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .match-item-card {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }
                    
                    .cand-actions-p {
                        flex-direction: row;
                        width: 100%;
                    }
                    
                    .cand-actions-p .btn {
                        flex: 1;
                        justify-content: center;
                    }
                    
                    .modal-header-p {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 16px;
                    }
                    
                    .header-info-p {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }

                @media (max-width: 480px) {
                    .hero-title-p { font-size: 1.6rem; }
                    
                    .cand-actions-p {
                        flex-direction: column;
                    }
                    
                    .match-modal-p {
                        height: 100%;
                        max-height: 100%;
                        border-radius: 0;
                    }
                }
            `})]})}function ro(s){throw new Error('Could not dynamically require "'+s+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Cc={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/var Tf;function ly(){return Tf||(Tf=1,(function(s,a){(function(n){s.exports=n()})(function(){return(function n(o,l,d){function u(b,j){if(!l[b]){if(!o[b]){var N=typeof ro=="function"&&ro;if(!j&&N)return N(b,!0);if(f)return f(b,!0);var w=new Error("Cannot find module '"+b+"'");throw w.code="MODULE_NOT_FOUND",w}var _=l[b]={exports:{}};o[b][0].call(_.exports,function(v){var x=o[b][1][v];return u(x||v)},_,_.exports,n,o,l,d)}return l[b].exports}for(var f=typeof ro=="function"&&ro,h=0;h<d.length;h++)u(d[h]);return u})({1:[function(n,o,l){var d=n("./utils"),u=n("./support"),f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";l.encode=function(h){for(var b,j,N,w,_,v,x,g=[],S=0,z=h.length,T=z,E=d.getTypeOf(h)!=="string";S<h.length;)T=z-S,N=E?(b=h[S++],j=S<z?h[S++]:0,S<z?h[S++]:0):(b=h.charCodeAt(S++),j=S<z?h.charCodeAt(S++):0,S<z?h.charCodeAt(S++):0),w=b>>2,_=(3&b)<<4|j>>4,v=1<T?(15&j)<<2|N>>6:64,x=2<T?63&N:64,g.push(f.charAt(w)+f.charAt(_)+f.charAt(v)+f.charAt(x));return g.join("")},l.decode=function(h){var b,j,N,w,_,v,x=0,g=0,S="data:";if(h.substr(0,S.length)===S)throw new Error("Invalid base64 input, it looks like a data url.");var z,T=3*(h=h.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(h.charAt(h.length-1)===f.charAt(64)&&T--,h.charAt(h.length-2)===f.charAt(64)&&T--,T%1!=0)throw new Error("Invalid base64 input, bad content length.");for(z=u.uint8array?new Uint8Array(0|T):new Array(0|T);x<h.length;)b=f.indexOf(h.charAt(x++))<<2|(w=f.indexOf(h.charAt(x++)))>>4,j=(15&w)<<4|(_=f.indexOf(h.charAt(x++)))>>2,N=(3&_)<<6|(v=f.indexOf(h.charAt(x++))),z[g++]=b,_!==64&&(z[g++]=j),v!==64&&(z[g++]=N);return z}},{"./support":30,"./utils":32}],2:[function(n,o,l){var d=n("./external"),u=n("./stream/DataWorker"),f=n("./stream/Crc32Probe"),h=n("./stream/DataLengthProbe");function b(j,N,w,_,v){this.compressedSize=j,this.uncompressedSize=N,this.crc32=w,this.compression=_,this.compressedContent=v}b.prototype={getContentWorker:function(){var j=new u(d.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new h("data_length")),N=this;return j.on("end",function(){if(this.streamInfo.data_length!==N.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),j},getCompressedWorker:function(){return new u(d.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},b.createWorkerFrom=function(j,N,w){return j.pipe(new f).pipe(new h("uncompressedSize")).pipe(N.compressWorker(w)).pipe(new h("compressedSize")).withStreamInfo("compression",N)},o.exports=b},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(n,o,l){var d=n("./stream/GenericWorker");l.STORE={magic:"\0\0",compressWorker:function(){return new d("STORE compression")},uncompressWorker:function(){return new d("STORE decompression")}},l.DEFLATE=n("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(n,o,l){var d=n("./utils"),u=(function(){for(var f,h=[],b=0;b<256;b++){f=b;for(var j=0;j<8;j++)f=1&f?3988292384^f>>>1:f>>>1;h[b]=f}return h})();o.exports=function(f,h){return f!==void 0&&f.length?d.getTypeOf(f)!=="string"?(function(b,j,N,w){var _=u,v=w+N;b^=-1;for(var x=w;x<v;x++)b=b>>>8^_[255&(b^j[x])];return-1^b})(0|h,f,f.length,0):(function(b,j,N,w){var _=u,v=w+N;b^=-1;for(var x=w;x<v;x++)b=b>>>8^_[255&(b^j.charCodeAt(x))];return-1^b})(0|h,f,f.length,0):0}},{"./utils":32}],5:[function(n,o,l){l.base64=!1,l.binary=!1,l.dir=!1,l.createFolders=!0,l.date=null,l.compression=null,l.compressionOptions=null,l.comment=null,l.unixPermissions=null,l.dosPermissions=null},{}],6:[function(n,o,l){var d=null;d=typeof Promise<"u"?Promise:n("lie"),o.exports={Promise:d}},{lie:37}],7:[function(n,o,l){var d=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",u=n("pako"),f=n("./utils"),h=n("./stream/GenericWorker"),b=d?"uint8array":"array";function j(N,w){h.call(this,"FlateWorker/"+N),this._pako=null,this._pakoAction=N,this._pakoOptions=w,this.meta={}}l.magic="\b\0",f.inherits(j,h),j.prototype.processChunk=function(N){this.meta=N.meta,this._pako===null&&this._createPako(),this._pako.push(f.transformTo(b,N.data),!1)},j.prototype.flush=function(){h.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},j.prototype.cleanUp=function(){h.prototype.cleanUp.call(this),this._pako=null},j.prototype._createPako=function(){this._pako=new u[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var N=this;this._pako.onData=function(w){N.push({data:w,meta:N.meta})}},l.compressWorker=function(N){return new j("Deflate",N)},l.uncompressWorker=function(){return new j("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(n,o,l){function d(_,v){var x,g="";for(x=0;x<v;x++)g+=String.fromCharCode(255&_),_>>>=8;return g}function u(_,v,x,g,S,z){var T,E,A=_.file,D=_.compression,B=z!==b.utf8encode,V=f.transformTo("string",z(A.name)),U=f.transformTo("string",b.utf8encode(A.name)),G=A.comment,fe=f.transformTo("string",z(G)),L=f.transformTo("string",b.utf8encode(G)),H=U.length!==A.name.length,k=L.length!==G.length,J="",ve="",se="",oe=A.dir,Q=A.date,ce={crc32:0,compressedSize:0,uncompressedSize:0};v&&!x||(ce.crc32=_.crc32,ce.compressedSize=_.compressedSize,ce.uncompressedSize=_.uncompressedSize);var R=0;v&&(R|=8),B||!H&&!k||(R|=2048);var P=0,W=0;oe&&(P|=16),S==="UNIX"?(W=798,P|=(function(te,Ne){var Te=te;return te||(Te=Ne?16893:33204),(65535&Te)<<16})(A.unixPermissions,oe)):(W=20,P|=(function(te){return 63&(te||0)})(A.dosPermissions)),T=Q.getUTCHours(),T<<=6,T|=Q.getUTCMinutes(),T<<=5,T|=Q.getUTCSeconds()/2,E=Q.getUTCFullYear()-1980,E<<=4,E|=Q.getUTCMonth()+1,E<<=5,E|=Q.getUTCDate(),H&&(ve=d(1,1)+d(j(V),4)+U,J+="up"+d(ve.length,2)+ve),k&&(se=d(1,1)+d(j(fe),4)+L,J+="uc"+d(se.length,2)+se);var ee="";return ee+=`
\0`,ee+=d(R,2),ee+=D.magic,ee+=d(T,2),ee+=d(E,2),ee+=d(ce.crc32,4),ee+=d(ce.compressedSize,4),ee+=d(ce.uncompressedSize,4),ee+=d(V.length,2),ee+=d(J.length,2),{fileRecord:N.LOCAL_FILE_HEADER+ee+V+J,dirRecord:N.CENTRAL_FILE_HEADER+d(W,2)+ee+d(fe.length,2)+"\0\0\0\0"+d(P,4)+d(g,4)+V+J+fe}}var f=n("../utils"),h=n("../stream/GenericWorker"),b=n("../utf8"),j=n("../crc32"),N=n("../signature");function w(_,v,x,g){h.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=v,this.zipPlatform=x,this.encodeFileName=g,this.streamFiles=_,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}f.inherits(w,h),w.prototype.push=function(_){var v=_.meta.percent||0,x=this.entriesCount,g=this._sources.length;this.accumulate?this.contentBuffer.push(_):(this.bytesWritten+=_.data.length,h.prototype.push.call(this,{data:_.data,meta:{currentFile:this.currentFile,percent:x?(v+100*(x-g-1))/x:100}}))},w.prototype.openedSource=function(_){this.currentSourceOffset=this.bytesWritten,this.currentFile=_.file.name;var v=this.streamFiles&&!_.file.dir;if(v){var x=u(_,v,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:x.fileRecord,meta:{percent:0}})}else this.accumulate=!0},w.prototype.closedSource=function(_){this.accumulate=!1;var v=this.streamFiles&&!_.file.dir,x=u(_,v,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(x.dirRecord),v)this.push({data:(function(g){return N.DATA_DESCRIPTOR+d(g.crc32,4)+d(g.compressedSize,4)+d(g.uncompressedSize,4)})(_),meta:{percent:100}});else for(this.push({data:x.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},w.prototype.flush=function(){for(var _=this.bytesWritten,v=0;v<this.dirRecords.length;v++)this.push({data:this.dirRecords[v],meta:{percent:100}});var x=this.bytesWritten-_,g=(function(S,z,T,E,A){var D=f.transformTo("string",A(E));return N.CENTRAL_DIRECTORY_END+"\0\0\0\0"+d(S,2)+d(S,2)+d(z,4)+d(T,4)+d(D.length,2)+D})(this.dirRecords.length,x,_,this.zipComment,this.encodeFileName);this.push({data:g,meta:{percent:100}})},w.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},w.prototype.registerPrevious=function(_){this._sources.push(_);var v=this;return _.on("data",function(x){v.processChunk(x)}),_.on("end",function(){v.closedSource(v.previous.streamInfo),v._sources.length?v.prepareNextSource():v.end()}),_.on("error",function(x){v.error(x)}),this},w.prototype.resume=function(){return!!h.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},w.prototype.error=function(_){var v=this._sources;if(!h.prototype.error.call(this,_))return!1;for(var x=0;x<v.length;x++)try{v[x].error(_)}catch{}return!0},w.prototype.lock=function(){h.prototype.lock.call(this);for(var _=this._sources,v=0;v<_.length;v++)_[v].lock()},o.exports=w},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(n,o,l){var d=n("../compressions"),u=n("./ZipFileWorker");l.generateWorker=function(f,h,b){var j=new u(h.streamFiles,b,h.platform,h.encodeFileName),N=0;try{f.forEach(function(w,_){N++;var v=(function(z,T){var E=z||T,A=d[E];if(!A)throw new Error(E+" is not a valid compression method !");return A})(_.options.compression,h.compression),x=_.options.compressionOptions||h.compressionOptions||{},g=_.dir,S=_.date;_._compressWorker(v,x).withStreamInfo("file",{name:w,dir:g,date:S,comment:_.comment||"",unixPermissions:_.unixPermissions,dosPermissions:_.dosPermissions}).pipe(j)}),j.entriesCount=N}catch(w){j.error(w)}return j}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(n,o,l){function d(){if(!(this instanceof d))return new d;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var u=new d;for(var f in this)typeof this[f]!="function"&&(u[f]=this[f]);return u}}(d.prototype=n("./object")).loadAsync=n("./load"),d.support=n("./support"),d.defaults=n("./defaults"),d.version="3.10.1",d.loadAsync=function(u,f){return new d().loadAsync(u,f)},d.external=n("./external"),o.exports=d},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(n,o,l){var d=n("./utils"),u=n("./external"),f=n("./utf8"),h=n("./zipEntries"),b=n("./stream/Crc32Probe"),j=n("./nodejsUtils");function N(w){return new u.Promise(function(_,v){var x=w.decompressed.getContentWorker().pipe(new b);x.on("error",function(g){v(g)}).on("end",function(){x.streamInfo.crc32!==w.decompressed.crc32?v(new Error("Corrupted zip : CRC32 mismatch")):_()}).resume()})}o.exports=function(w,_){var v=this;return _=d.extend(_||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:f.utf8decode}),j.isNode&&j.isStream(w)?u.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):d.prepareContent("the loaded zip file",w,!0,_.optimizedBinaryString,_.base64).then(function(x){var g=new h(_);return g.load(x),g}).then(function(x){var g=[u.Promise.resolve(x)],S=x.files;if(_.checkCRC32)for(var z=0;z<S.length;z++)g.push(N(S[z]));return u.Promise.all(g)}).then(function(x){for(var g=x.shift(),S=g.files,z=0;z<S.length;z++){var T=S[z],E=T.fileNameStr,A=d.resolve(T.fileNameStr);v.file(A,T.decompressed,{binary:!0,optimizedBinaryString:!0,date:T.date,dir:T.dir,comment:T.fileCommentStr.length?T.fileCommentStr:null,unixPermissions:T.unixPermissions,dosPermissions:T.dosPermissions,createFolders:_.createFolders}),T.dir||(v.file(A).unsafeOriginalName=E)}return g.zipComment.length&&(v.comment=g.zipComment),v})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(n,o,l){var d=n("../utils"),u=n("../stream/GenericWorker");function f(h,b){u.call(this,"Nodejs stream input adapter for "+h),this._upstreamEnded=!1,this._bindStream(b)}d.inherits(f,u),f.prototype._bindStream=function(h){var b=this;(this._stream=h).pause(),h.on("data",function(j){b.push({data:j,meta:{percent:0}})}).on("error",function(j){b.isPaused?this.generatedError=j:b.error(j)}).on("end",function(){b.isPaused?b._upstreamEnded=!0:b.end()})},f.prototype.pause=function(){return!!u.prototype.pause.call(this)&&(this._stream.pause(),!0)},f.prototype.resume=function(){return!!u.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},o.exports=f},{"../stream/GenericWorker":28,"../utils":32}],13:[function(n,o,l){var d=n("readable-stream").Readable;function u(f,h,b){d.call(this,h),this._helper=f;var j=this;f.on("data",function(N,w){j.push(N)||j._helper.pause(),b&&b(w)}).on("error",function(N){j.emit("error",N)}).on("end",function(){j.push(null)})}n("../utils").inherits(u,d),u.prototype._read=function(){this._helper.resume()},o.exports=u},{"../utils":32,"readable-stream":16}],14:[function(n,o,l){o.exports={isNode:typeof Buffer<"u",newBufferFrom:function(d,u){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(d,u);if(typeof d=="number")throw new Error('The "data" argument must not be a number');return new Buffer(d,u)},allocBuffer:function(d){if(Buffer.alloc)return Buffer.alloc(d);var u=new Buffer(d);return u.fill(0),u},isBuffer:function(d){return Buffer.isBuffer(d)},isStream:function(d){return d&&typeof d.on=="function"&&typeof d.pause=="function"&&typeof d.resume=="function"}}},{}],15:[function(n,o,l){function d(A,D,B){var V,U=f.getTypeOf(D),G=f.extend(B||{},j);G.date=G.date||new Date,G.compression!==null&&(G.compression=G.compression.toUpperCase()),typeof G.unixPermissions=="string"&&(G.unixPermissions=parseInt(G.unixPermissions,8)),G.unixPermissions&&16384&G.unixPermissions&&(G.dir=!0),G.dosPermissions&&16&G.dosPermissions&&(G.dir=!0),G.dir&&(A=S(A)),G.createFolders&&(V=g(A))&&z.call(this,V,!0);var fe=U==="string"&&G.binary===!1&&G.base64===!1;B&&B.binary!==void 0||(G.binary=!fe),(D instanceof N&&D.uncompressedSize===0||G.dir||!D||D.length===0)&&(G.base64=!1,G.binary=!0,D="",G.compression="STORE",U="string");var L=null;L=D instanceof N||D instanceof h?D:v.isNode&&v.isStream(D)?new x(A,D):f.prepareContent(A,D,G.binary,G.optimizedBinaryString,G.base64);var H=new w(A,L,G);this.files[A]=H}var u=n("./utf8"),f=n("./utils"),h=n("./stream/GenericWorker"),b=n("./stream/StreamHelper"),j=n("./defaults"),N=n("./compressedObject"),w=n("./zipObject"),_=n("./generate"),v=n("./nodejsUtils"),x=n("./nodejs/NodejsStreamInputAdapter"),g=function(A){A.slice(-1)==="/"&&(A=A.substring(0,A.length-1));var D=A.lastIndexOf("/");return 0<D?A.substring(0,D):""},S=function(A){return A.slice(-1)!=="/"&&(A+="/"),A},z=function(A,D){return D=D!==void 0?D:j.createFolders,A=S(A),this.files[A]||d.call(this,A,null,{dir:!0,createFolders:D}),this.files[A]};function T(A){return Object.prototype.toString.call(A)==="[object RegExp]"}var E={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(A){var D,B,V;for(D in this.files)V=this.files[D],(B=D.slice(this.root.length,D.length))&&D.slice(0,this.root.length)===this.root&&A(B,V)},filter:function(A){var D=[];return this.forEach(function(B,V){A(B,V)&&D.push(V)}),D},file:function(A,D,B){if(arguments.length!==1)return A=this.root+A,d.call(this,A,D,B),this;if(T(A)){var V=A;return this.filter(function(G,fe){return!fe.dir&&V.test(G)})}var U=this.files[this.root+A];return U&&!U.dir?U:null},folder:function(A){if(!A)return this;if(T(A))return this.filter(function(U,G){return G.dir&&A.test(U)});var D=this.root+A,B=z.call(this,D),V=this.clone();return V.root=B.name,V},remove:function(A){A=this.root+A;var D=this.files[A];if(D||(A.slice(-1)!=="/"&&(A+="/"),D=this.files[A]),D&&!D.dir)delete this.files[A];else for(var B=this.filter(function(U,G){return G.name.slice(0,A.length)===A}),V=0;V<B.length;V++)delete this.files[B[V].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(A){var D,B={};try{if((B=f.extend(A||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:u.utf8encode})).type=B.type.toLowerCase(),B.compression=B.compression.toUpperCase(),B.type==="binarystring"&&(B.type="string"),!B.type)throw new Error("No output type specified.");f.checkSupport(B.type),B.platform!=="darwin"&&B.platform!=="freebsd"&&B.platform!=="linux"&&B.platform!=="sunos"||(B.platform="UNIX"),B.platform==="win32"&&(B.platform="DOS");var V=B.comment||this.comment||"";D=_.generateWorker(this,B,V)}catch(U){(D=new h("error")).error(U)}return new b(D,B.type||"string",B.mimeType)},generateAsync:function(A,D){return this.generateInternalStream(A).accumulate(D)},generateNodeStream:function(A,D){return(A=A||{}).type||(A.type="nodebuffer"),this.generateInternalStream(A).toNodejsStream(D)}};o.exports=E},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(n,o,l){o.exports=n("stream")},{stream:void 0}],17:[function(n,o,l){var d=n("./DataReader");function u(f){d.call(this,f);for(var h=0;h<this.data.length;h++)f[h]=255&f[h]}n("../utils").inherits(u,d),u.prototype.byteAt=function(f){return this.data[this.zero+f]},u.prototype.lastIndexOfSignature=function(f){for(var h=f.charCodeAt(0),b=f.charCodeAt(1),j=f.charCodeAt(2),N=f.charCodeAt(3),w=this.length-4;0<=w;--w)if(this.data[w]===h&&this.data[w+1]===b&&this.data[w+2]===j&&this.data[w+3]===N)return w-this.zero;return-1},u.prototype.readAndCheckSignature=function(f){var h=f.charCodeAt(0),b=f.charCodeAt(1),j=f.charCodeAt(2),N=f.charCodeAt(3),w=this.readData(4);return h===w[0]&&b===w[1]&&j===w[2]&&N===w[3]},u.prototype.readData=function(f){if(this.checkOffset(f),f===0)return[];var h=this.data.slice(this.zero+this.index,this.zero+this.index+f);return this.index+=f,h},o.exports=u},{"../utils":32,"./DataReader":18}],18:[function(n,o,l){var d=n("../utils");function u(f){this.data=f,this.length=f.length,this.index=0,this.zero=0}u.prototype={checkOffset:function(f){this.checkIndex(this.index+f)},checkIndex:function(f){if(this.length<this.zero+f||f<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+f+"). Corrupted zip ?")},setIndex:function(f){this.checkIndex(f),this.index=f},skip:function(f){this.setIndex(this.index+f)},byteAt:function(){},readInt:function(f){var h,b=0;for(this.checkOffset(f),h=this.index+f-1;h>=this.index;h--)b=(b<<8)+this.byteAt(h);return this.index+=f,b},readString:function(f){return d.transformTo("string",this.readData(f))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var f=this.readInt(4);return new Date(Date.UTC(1980+(f>>25&127),(f>>21&15)-1,f>>16&31,f>>11&31,f>>5&63,(31&f)<<1))}},o.exports=u},{"../utils":32}],19:[function(n,o,l){var d=n("./Uint8ArrayReader");function u(f){d.call(this,f)}n("../utils").inherits(u,d),u.prototype.readData=function(f){this.checkOffset(f);var h=this.data.slice(this.zero+this.index,this.zero+this.index+f);return this.index+=f,h},o.exports=u},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(n,o,l){var d=n("./DataReader");function u(f){d.call(this,f)}n("../utils").inherits(u,d),u.prototype.byteAt=function(f){return this.data.charCodeAt(this.zero+f)},u.prototype.lastIndexOfSignature=function(f){return this.data.lastIndexOf(f)-this.zero},u.prototype.readAndCheckSignature=function(f){return f===this.readData(4)},u.prototype.readData=function(f){this.checkOffset(f);var h=this.data.slice(this.zero+this.index,this.zero+this.index+f);return this.index+=f,h},o.exports=u},{"../utils":32,"./DataReader":18}],21:[function(n,o,l){var d=n("./ArrayReader");function u(f){d.call(this,f)}n("../utils").inherits(u,d),u.prototype.readData=function(f){if(this.checkOffset(f),f===0)return new Uint8Array(0);var h=this.data.subarray(this.zero+this.index,this.zero+this.index+f);return this.index+=f,h},o.exports=u},{"../utils":32,"./ArrayReader":17}],22:[function(n,o,l){var d=n("../utils"),u=n("../support"),f=n("./ArrayReader"),h=n("./StringReader"),b=n("./NodeBufferReader"),j=n("./Uint8ArrayReader");o.exports=function(N){var w=d.getTypeOf(N);return d.checkSupport(w),w!=="string"||u.uint8array?w==="nodebuffer"?new b(N):u.uint8array?new j(d.transformTo("uint8array",N)):new f(d.transformTo("array",N)):new h(N)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(n,o,l){l.LOCAL_FILE_HEADER="PK",l.CENTRAL_FILE_HEADER="PK",l.CENTRAL_DIRECTORY_END="PK",l.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",l.ZIP64_CENTRAL_DIRECTORY_END="PK",l.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(n,o,l){var d=n("./GenericWorker"),u=n("../utils");function f(h){d.call(this,"ConvertWorker to "+h),this.destType=h}u.inherits(f,d),f.prototype.processChunk=function(h){this.push({data:u.transformTo(this.destType,h.data),meta:h.meta})},o.exports=f},{"../utils":32,"./GenericWorker":28}],25:[function(n,o,l){var d=n("./GenericWorker"),u=n("../crc32");function f(){d.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}n("../utils").inherits(f,d),f.prototype.processChunk=function(h){this.streamInfo.crc32=u(h.data,this.streamInfo.crc32||0),this.push(h)},o.exports=f},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(n,o,l){var d=n("../utils"),u=n("./GenericWorker");function f(h){u.call(this,"DataLengthProbe for "+h),this.propName=h,this.withStreamInfo(h,0)}d.inherits(f,u),f.prototype.processChunk=function(h){if(h){var b=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=b+h.data.length}u.prototype.processChunk.call(this,h)},o.exports=f},{"../utils":32,"./GenericWorker":28}],27:[function(n,o,l){var d=n("../utils"),u=n("./GenericWorker");function f(h){u.call(this,"DataWorker");var b=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,h.then(function(j){b.dataIsReady=!0,b.data=j,b.max=j&&j.length||0,b.type=d.getTypeOf(j),b.isPaused||b._tickAndRepeat()},function(j){b.error(j)})}d.inherits(f,u),f.prototype.cleanUp=function(){u.prototype.cleanUp.call(this),this.data=null},f.prototype.resume=function(){return!!u.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,d.delay(this._tickAndRepeat,[],this)),!0)},f.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(d.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},f.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var h=null,b=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":h=this.data.substring(this.index,b);break;case"uint8array":h=this.data.subarray(this.index,b);break;case"array":case"nodebuffer":h=this.data.slice(this.index,b)}return this.index=b,this.push({data:h,meta:{percent:this.max?this.index/this.max*100:0}})},o.exports=f},{"../utils":32,"./GenericWorker":28}],28:[function(n,o,l){function d(u){this.name=u||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}d.prototype={push:function(u){this.emit("data",u)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(u){this.emit("error",u)}return!0},error:function(u){return!this.isFinished&&(this.isPaused?this.generatedError=u:(this.isFinished=!0,this.emit("error",u),this.previous&&this.previous.error(u),this.cleanUp()),!0)},on:function(u,f){return this._listeners[u].push(f),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(u,f){if(this._listeners[u])for(var h=0;h<this._listeners[u].length;h++)this._listeners[u][h].call(this,f)},pipe:function(u){return u.registerPrevious(this)},registerPrevious:function(u){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=u.streamInfo,this.mergeStreamInfo(),this.previous=u;var f=this;return u.on("data",function(h){f.processChunk(h)}),u.on("end",function(){f.end()}),u.on("error",function(h){f.error(h)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var u=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),u=!0),this.previous&&this.previous.resume(),!u},flush:function(){},processChunk:function(u){this.push(u)},withStreamInfo:function(u,f){return this.extraStreamInfo[u]=f,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var u in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,u)&&(this.streamInfo[u]=this.extraStreamInfo[u])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var u="Worker "+this.name;return this.previous?this.previous+" -> "+u:u}},o.exports=d},{}],29:[function(n,o,l){var d=n("../utils"),u=n("./ConvertWorker"),f=n("./GenericWorker"),h=n("../base64"),b=n("../support"),j=n("../external"),N=null;if(b.nodestream)try{N=n("../nodejs/NodejsStreamOutputAdapter")}catch{}function w(v,x){return new j.Promise(function(g,S){var z=[],T=v._internalType,E=v._outputType,A=v._mimeType;v.on("data",function(D,B){z.push(D),x&&x(B)}).on("error",function(D){z=[],S(D)}).on("end",function(){try{var D=(function(B,V,U){switch(B){case"blob":return d.newBlob(d.transformTo("arraybuffer",V),U);case"base64":return h.encode(V);default:return d.transformTo(B,V)}})(E,(function(B,V){var U,G=0,fe=null,L=0;for(U=0;U<V.length;U++)L+=V[U].length;switch(B){case"string":return V.join("");case"array":return Array.prototype.concat.apply([],V);case"uint8array":for(fe=new Uint8Array(L),U=0;U<V.length;U++)fe.set(V[U],G),G+=V[U].length;return fe;case"nodebuffer":return Buffer.concat(V);default:throw new Error("concat : unsupported type '"+B+"'")}})(T,z),A);g(D)}catch(B){S(B)}z=[]}).resume()})}function _(v,x,g){var S=x;switch(x){case"blob":case"arraybuffer":S="uint8array";break;case"base64":S="string"}try{this._internalType=S,this._outputType=x,this._mimeType=g,d.checkSupport(S),this._worker=v.pipe(new u(S)),v.lock()}catch(z){this._worker=new f("error"),this._worker.error(z)}}_.prototype={accumulate:function(v){return w(this,v)},on:function(v,x){var g=this;return v==="data"?this._worker.on(v,function(S){x.call(g,S.data,S.meta)}):this._worker.on(v,function(){d.delay(x,arguments,g)}),this},resume:function(){return d.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(v){if(d.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new N(this,{objectMode:this._outputType!=="nodebuffer"},v)}},o.exports=_},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(n,o,l){if(l.base64=!0,l.array=!0,l.string=!0,l.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",l.nodebuffer=typeof Buffer<"u",l.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")l.blob=!1;else{var d=new ArrayBuffer(0);try{l.blob=new Blob([d],{type:"application/zip"}).size===0}catch{try{var u=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);u.append(d),l.blob=u.getBlob("application/zip").size===0}catch{l.blob=!1}}}try{l.nodestream=!!n("readable-stream").Readable}catch{l.nodestream=!1}},{"readable-stream":16}],31:[function(n,o,l){for(var d=n("./utils"),u=n("./support"),f=n("./nodejsUtils"),h=n("./stream/GenericWorker"),b=new Array(256),j=0;j<256;j++)b[j]=252<=j?6:248<=j?5:240<=j?4:224<=j?3:192<=j?2:1;b[254]=b[254]=1;function N(){h.call(this,"utf-8 decode"),this.leftOver=null}function w(){h.call(this,"utf-8 encode")}l.utf8encode=function(_){return u.nodebuffer?f.newBufferFrom(_,"utf-8"):(function(v){var x,g,S,z,T,E=v.length,A=0;for(z=0;z<E;z++)(64512&(g=v.charCodeAt(z)))==55296&&z+1<E&&(64512&(S=v.charCodeAt(z+1)))==56320&&(g=65536+(g-55296<<10)+(S-56320),z++),A+=g<128?1:g<2048?2:g<65536?3:4;for(x=u.uint8array?new Uint8Array(A):new Array(A),z=T=0;T<A;z++)(64512&(g=v.charCodeAt(z)))==55296&&z+1<E&&(64512&(S=v.charCodeAt(z+1)))==56320&&(g=65536+(g-55296<<10)+(S-56320),z++),g<128?x[T++]=g:(g<2048?x[T++]=192|g>>>6:(g<65536?x[T++]=224|g>>>12:(x[T++]=240|g>>>18,x[T++]=128|g>>>12&63),x[T++]=128|g>>>6&63),x[T++]=128|63&g);return x})(_)},l.utf8decode=function(_){return u.nodebuffer?d.transformTo("nodebuffer",_).toString("utf-8"):(function(v){var x,g,S,z,T=v.length,E=new Array(2*T);for(x=g=0;x<T;)if((S=v[x++])<128)E[g++]=S;else if(4<(z=b[S]))E[g++]=65533,x+=z-1;else{for(S&=z===2?31:z===3?15:7;1<z&&x<T;)S=S<<6|63&v[x++],z--;1<z?E[g++]=65533:S<65536?E[g++]=S:(S-=65536,E[g++]=55296|S>>10&1023,E[g++]=56320|1023&S)}return E.length!==g&&(E.subarray?E=E.subarray(0,g):E.length=g),d.applyFromCharCode(E)})(_=d.transformTo(u.uint8array?"uint8array":"array",_))},d.inherits(N,h),N.prototype.processChunk=function(_){var v=d.transformTo(u.uint8array?"uint8array":"array",_.data);if(this.leftOver&&this.leftOver.length){if(u.uint8array){var x=v;(v=new Uint8Array(x.length+this.leftOver.length)).set(this.leftOver,0),v.set(x,this.leftOver.length)}else v=this.leftOver.concat(v);this.leftOver=null}var g=(function(z,T){var E;for((T=T||z.length)>z.length&&(T=z.length),E=T-1;0<=E&&(192&z[E])==128;)E--;return E<0||E===0?T:E+b[z[E]]>T?E:T})(v),S=v;g!==v.length&&(u.uint8array?(S=v.subarray(0,g),this.leftOver=v.subarray(g,v.length)):(S=v.slice(0,g),this.leftOver=v.slice(g,v.length))),this.push({data:l.utf8decode(S),meta:_.meta})},N.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:l.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},l.Utf8DecodeWorker=N,d.inherits(w,h),w.prototype.processChunk=function(_){this.push({data:l.utf8encode(_.data),meta:_.meta})},l.Utf8EncodeWorker=w},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(n,o,l){var d=n("./support"),u=n("./base64"),f=n("./nodejsUtils"),h=n("./external");function b(x){return x}function j(x,g){for(var S=0;S<x.length;++S)g[S]=255&x.charCodeAt(S);return g}n("setimmediate"),l.newBlob=function(x,g){l.checkSupport("blob");try{return new Blob([x],{type:g})}catch{try{var S=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return S.append(x),S.getBlob(g)}catch{throw new Error("Bug : can't construct the Blob.")}}};var N={stringifyByChunk:function(x,g,S){var z=[],T=0,E=x.length;if(E<=S)return String.fromCharCode.apply(null,x);for(;T<E;)g==="array"||g==="nodebuffer"?z.push(String.fromCharCode.apply(null,x.slice(T,Math.min(T+S,E)))):z.push(String.fromCharCode.apply(null,x.subarray(T,Math.min(T+S,E)))),T+=S;return z.join("")},stringifyByChar:function(x){for(var g="",S=0;S<x.length;S++)g+=String.fromCharCode(x[S]);return g},applyCanBeUsed:{uint8array:(function(){try{return d.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}})(),nodebuffer:(function(){try{return d.nodebuffer&&String.fromCharCode.apply(null,f.allocBuffer(1)).length===1}catch{return!1}})()}};function w(x){var g=65536,S=l.getTypeOf(x),z=!0;if(S==="uint8array"?z=N.applyCanBeUsed.uint8array:S==="nodebuffer"&&(z=N.applyCanBeUsed.nodebuffer),z)for(;1<g;)try{return N.stringifyByChunk(x,S,g)}catch{g=Math.floor(g/2)}return N.stringifyByChar(x)}function _(x,g){for(var S=0;S<x.length;S++)g[S]=x[S];return g}l.applyFromCharCode=w;var v={};v.string={string:b,array:function(x){return j(x,new Array(x.length))},arraybuffer:function(x){return v.string.uint8array(x).buffer},uint8array:function(x){return j(x,new Uint8Array(x.length))},nodebuffer:function(x){return j(x,f.allocBuffer(x.length))}},v.array={string:w,array:b,arraybuffer:function(x){return new Uint8Array(x).buffer},uint8array:function(x){return new Uint8Array(x)},nodebuffer:function(x){return f.newBufferFrom(x)}},v.arraybuffer={string:function(x){return w(new Uint8Array(x))},array:function(x){return _(new Uint8Array(x),new Array(x.byteLength))},arraybuffer:b,uint8array:function(x){return new Uint8Array(x)},nodebuffer:function(x){return f.newBufferFrom(new Uint8Array(x))}},v.uint8array={string:w,array:function(x){return _(x,new Array(x.length))},arraybuffer:function(x){return x.buffer},uint8array:b,nodebuffer:function(x){return f.newBufferFrom(x)}},v.nodebuffer={string:w,array:function(x){return _(x,new Array(x.length))},arraybuffer:function(x){return v.nodebuffer.uint8array(x).buffer},uint8array:function(x){return _(x,new Uint8Array(x.length))},nodebuffer:b},l.transformTo=function(x,g){if(g=g||"",!x)return g;l.checkSupport(x);var S=l.getTypeOf(g);return v[S][x](g)},l.resolve=function(x){for(var g=x.split("/"),S=[],z=0;z<g.length;z++){var T=g[z];T==="."||T===""&&z!==0&&z!==g.length-1||(T===".."?S.pop():S.push(T))}return S.join("/")},l.getTypeOf=function(x){return typeof x=="string"?"string":Object.prototype.toString.call(x)==="[object Array]"?"array":d.nodebuffer&&f.isBuffer(x)?"nodebuffer":d.uint8array&&x instanceof Uint8Array?"uint8array":d.arraybuffer&&x instanceof ArrayBuffer?"arraybuffer":void 0},l.checkSupport=function(x){if(!d[x.toLowerCase()])throw new Error(x+" is not supported by this platform")},l.MAX_VALUE_16BITS=65535,l.MAX_VALUE_32BITS=-1,l.pretty=function(x){var g,S,z="";for(S=0;S<(x||"").length;S++)z+="\\x"+((g=x.charCodeAt(S))<16?"0":"")+g.toString(16).toUpperCase();return z},l.delay=function(x,g,S){setImmediate(function(){x.apply(S||null,g||[])})},l.inherits=function(x,g){function S(){}S.prototype=g.prototype,x.prototype=new S},l.extend=function(){var x,g,S={};for(x=0;x<arguments.length;x++)for(g in arguments[x])Object.prototype.hasOwnProperty.call(arguments[x],g)&&S[g]===void 0&&(S[g]=arguments[x][g]);return S},l.prepareContent=function(x,g,S,z,T){return h.Promise.resolve(g).then(function(E){return d.blob&&(E instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(E))!==-1)&&typeof FileReader<"u"?new h.Promise(function(A,D){var B=new FileReader;B.onload=function(V){A(V.target.result)},B.onerror=function(V){D(V.target.error)},B.readAsArrayBuffer(E)}):E}).then(function(E){var A=l.getTypeOf(E);return A?(A==="arraybuffer"?E=l.transformTo("uint8array",E):A==="string"&&(T?E=u.decode(E):S&&z!==!0&&(E=(function(D){return j(D,d.uint8array?new Uint8Array(D.length):new Array(D.length))})(E))),E):h.Promise.reject(new Error("Can't read the data of '"+x+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(n,o,l){var d=n("./reader/readerFor"),u=n("./utils"),f=n("./signature"),h=n("./zipEntry"),b=n("./support");function j(N){this.files=[],this.loadOptions=N}j.prototype={checkSignature:function(N){if(!this.reader.readAndCheckSignature(N)){this.reader.index-=4;var w=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+u.pretty(w)+", expected "+u.pretty(N)+")")}},isSignature:function(N,w){var _=this.reader.index;this.reader.setIndex(N);var v=this.reader.readString(4)===w;return this.reader.setIndex(_),v},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var N=this.reader.readData(this.zipCommentLength),w=b.uint8array?"uint8array":"array",_=u.transformTo(w,N);this.zipComment=this.loadOptions.decodeFileName(_)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var N,w,_,v=this.zip64EndOfCentralSize-44;0<v;)N=this.reader.readInt(2),w=this.reader.readInt(4),_=this.reader.readData(w),this.zip64ExtensibleData[N]={id:N,length:w,value:_}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var N,w;for(N=0;N<this.files.length;N++)w=this.files[N],this.reader.setIndex(w.localHeaderOffset),this.checkSignature(f.LOCAL_FILE_HEADER),w.readLocalPart(this.reader),w.handleUTF8(),w.processAttributes()},readCentralDir:function(){var N;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(f.CENTRAL_FILE_HEADER);)(N=new h({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(N);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var N=this.reader.lastIndexOfSignature(f.CENTRAL_DIRECTORY_END);if(N<0)throw this.isSignature(0,f.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(N);var w=N;if(this.checkSignature(f.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===u.MAX_VALUE_16BITS||this.diskWithCentralDirStart===u.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===u.MAX_VALUE_16BITS||this.centralDirRecords===u.MAX_VALUE_16BITS||this.centralDirSize===u.MAX_VALUE_32BITS||this.centralDirOffset===u.MAX_VALUE_32BITS){if(this.zip64=!0,(N=this.reader.lastIndexOfSignature(f.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(N),this.checkSignature(f.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,f.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(f.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(f.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var _=this.centralDirOffset+this.centralDirSize;this.zip64&&(_+=20,_+=12+this.zip64EndOfCentralSize);var v=w-_;if(0<v)this.isSignature(w,f.CENTRAL_FILE_HEADER)||(this.reader.zero=v);else if(v<0)throw new Error("Corrupted zip: missing "+Math.abs(v)+" bytes.")},prepareReader:function(N){this.reader=d(N)},load:function(N){this.prepareReader(N),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},o.exports=j},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(n,o,l){var d=n("./reader/readerFor"),u=n("./utils"),f=n("./compressedObject"),h=n("./crc32"),b=n("./utf8"),j=n("./compressions"),N=n("./support");function w(_,v){this.options=_,this.loadOptions=v}w.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(_){var v,x;if(_.skip(22),this.fileNameLength=_.readInt(2),x=_.readInt(2),this.fileName=_.readData(this.fileNameLength),_.skip(x),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((v=(function(g){for(var S in j)if(Object.prototype.hasOwnProperty.call(j,S)&&j[S].magic===g)return j[S];return null})(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+u.pretty(this.compressionMethod)+" unknown (inner file : "+u.transformTo("string",this.fileName)+")");this.decompressed=new f(this.compressedSize,this.uncompressedSize,this.crc32,v,_.readData(this.compressedSize))},readCentralPart:function(_){this.versionMadeBy=_.readInt(2),_.skip(2),this.bitFlag=_.readInt(2),this.compressionMethod=_.readString(2),this.date=_.readDate(),this.crc32=_.readInt(4),this.compressedSize=_.readInt(4),this.uncompressedSize=_.readInt(4);var v=_.readInt(2);if(this.extraFieldsLength=_.readInt(2),this.fileCommentLength=_.readInt(2),this.diskNumberStart=_.readInt(2),this.internalFileAttributes=_.readInt(2),this.externalFileAttributes=_.readInt(4),this.localHeaderOffset=_.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");_.skip(v),this.readExtraFields(_),this.parseZIP64ExtraField(_),this.fileComment=_.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var _=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),_==0&&(this.dosPermissions=63&this.externalFileAttributes),_==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var _=d(this.extraFields[1].value);this.uncompressedSize===u.MAX_VALUE_32BITS&&(this.uncompressedSize=_.readInt(8)),this.compressedSize===u.MAX_VALUE_32BITS&&(this.compressedSize=_.readInt(8)),this.localHeaderOffset===u.MAX_VALUE_32BITS&&(this.localHeaderOffset=_.readInt(8)),this.diskNumberStart===u.MAX_VALUE_32BITS&&(this.diskNumberStart=_.readInt(4))}},readExtraFields:function(_){var v,x,g,S=_.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});_.index+4<S;)v=_.readInt(2),x=_.readInt(2),g=_.readData(x),this.extraFields[v]={id:v,length:x,value:g};_.setIndex(S)},handleUTF8:function(){var _=N.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=b.utf8decode(this.fileName),this.fileCommentStr=b.utf8decode(this.fileComment);else{var v=this.findExtraFieldUnicodePath();if(v!==null)this.fileNameStr=v;else{var x=u.transformTo(_,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(x)}var g=this.findExtraFieldUnicodeComment();if(g!==null)this.fileCommentStr=g;else{var S=u.transformTo(_,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(S)}}},findExtraFieldUnicodePath:function(){var _=this.extraFields[28789];if(_){var v=d(_.value);return v.readInt(1)!==1||h(this.fileName)!==v.readInt(4)?null:b.utf8decode(v.readData(_.length-5))}return null},findExtraFieldUnicodeComment:function(){var _=this.extraFields[25461];if(_){var v=d(_.value);return v.readInt(1)!==1||h(this.fileComment)!==v.readInt(4)?null:b.utf8decode(v.readData(_.length-5))}return null}},o.exports=w},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(n,o,l){function d(v,x,g){this.name=v,this.dir=g.dir,this.date=g.date,this.comment=g.comment,this.unixPermissions=g.unixPermissions,this.dosPermissions=g.dosPermissions,this._data=x,this._dataBinary=g.binary,this.options={compression:g.compression,compressionOptions:g.compressionOptions}}var u=n("./stream/StreamHelper"),f=n("./stream/DataWorker"),h=n("./utf8"),b=n("./compressedObject"),j=n("./stream/GenericWorker");d.prototype={internalStream:function(v){var x=null,g="string";try{if(!v)throw new Error("No output type specified.");var S=(g=v.toLowerCase())==="string"||g==="text";g!=="binarystring"&&g!=="text"||(g="string"),x=this._decompressWorker();var z=!this._dataBinary;z&&!S&&(x=x.pipe(new h.Utf8EncodeWorker)),!z&&S&&(x=x.pipe(new h.Utf8DecodeWorker))}catch(T){(x=new j("error")).error(T)}return new u(x,g,"")},async:function(v,x){return this.internalStream(v).accumulate(x)},nodeStream:function(v,x){return this.internalStream(v||"nodebuffer").toNodejsStream(x)},_compressWorker:function(v,x){if(this._data instanceof b&&this._data.compression.magic===v.magic)return this._data.getCompressedWorker();var g=this._decompressWorker();return this._dataBinary||(g=g.pipe(new h.Utf8EncodeWorker)),b.createWorkerFrom(g,v,x)},_decompressWorker:function(){return this._data instanceof b?this._data.getContentWorker():this._data instanceof j?this._data:new f(this._data)}};for(var N=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],w=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},_=0;_<N.length;_++)d.prototype[N[_]]=w;o.exports=d},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(n,o,l){(function(d){var u,f,h=d.MutationObserver||d.WebKitMutationObserver;if(h){var b=0,j=new h(v),N=d.document.createTextNode("");j.observe(N,{characterData:!0}),u=function(){N.data=b=++b%2}}else if(d.setImmediate||d.MessageChannel===void 0)u="document"in d&&"onreadystatechange"in d.document.createElement("script")?function(){var x=d.document.createElement("script");x.onreadystatechange=function(){v(),x.onreadystatechange=null,x.parentNode.removeChild(x),x=null},d.document.documentElement.appendChild(x)}:function(){setTimeout(v,0)};else{var w=new d.MessageChannel;w.port1.onmessage=v,u=function(){w.port2.postMessage(0)}}var _=[];function v(){var x,g;f=!0;for(var S=_.length;S;){for(g=_,_=[],x=-1;++x<S;)g[x]();S=_.length}f=!1}o.exports=function(x){_.push(x)!==1||f||u()}}).call(this,typeof Ki<"u"?Ki:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(n,o,l){var d=n("immediate");function u(){}var f={},h=["REJECTED"],b=["FULFILLED"],j=["PENDING"];function N(S){if(typeof S!="function")throw new TypeError("resolver must be a function");this.state=j,this.queue=[],this.outcome=void 0,S!==u&&x(this,S)}function w(S,z,T){this.promise=S,typeof z=="function"&&(this.onFulfilled=z,this.callFulfilled=this.otherCallFulfilled),typeof T=="function"&&(this.onRejected=T,this.callRejected=this.otherCallRejected)}function _(S,z,T){d(function(){var E;try{E=z(T)}catch(A){return f.reject(S,A)}E===S?f.reject(S,new TypeError("Cannot resolve promise with itself")):f.resolve(S,E)})}function v(S){var z=S&&S.then;if(S&&(typeof S=="object"||typeof S=="function")&&typeof z=="function")return function(){z.apply(S,arguments)}}function x(S,z){var T=!1;function E(B){T||(T=!0,f.reject(S,B))}function A(B){T||(T=!0,f.resolve(S,B))}var D=g(function(){z(A,E)});D.status==="error"&&E(D.value)}function g(S,z){var T={};try{T.value=S(z),T.status="success"}catch(E){T.status="error",T.value=E}return T}(o.exports=N).prototype.finally=function(S){if(typeof S!="function")return this;var z=this.constructor;return this.then(function(T){return z.resolve(S()).then(function(){return T})},function(T){return z.resolve(S()).then(function(){throw T})})},N.prototype.catch=function(S){return this.then(null,S)},N.prototype.then=function(S,z){if(typeof S!="function"&&this.state===b||typeof z!="function"&&this.state===h)return this;var T=new this.constructor(u);return this.state!==j?_(T,this.state===b?S:z,this.outcome):this.queue.push(new w(T,S,z)),T},w.prototype.callFulfilled=function(S){f.resolve(this.promise,S)},w.prototype.otherCallFulfilled=function(S){_(this.promise,this.onFulfilled,S)},w.prototype.callRejected=function(S){f.reject(this.promise,S)},w.prototype.otherCallRejected=function(S){_(this.promise,this.onRejected,S)},f.resolve=function(S,z){var T=g(v,z);if(T.status==="error")return f.reject(S,T.value);var E=T.value;if(E)x(S,E);else{S.state=b,S.outcome=z;for(var A=-1,D=S.queue.length;++A<D;)S.queue[A].callFulfilled(z)}return S},f.reject=function(S,z){S.state=h,S.outcome=z;for(var T=-1,E=S.queue.length;++T<E;)S.queue[T].callRejected(z);return S},N.resolve=function(S){return S instanceof this?S:f.resolve(new this(u),S)},N.reject=function(S){var z=new this(u);return f.reject(z,S)},N.all=function(S){var z=this;if(Object.prototype.toString.call(S)!=="[object Array]")return this.reject(new TypeError("must be an array"));var T=S.length,E=!1;if(!T)return this.resolve([]);for(var A=new Array(T),D=0,B=-1,V=new this(u);++B<T;)U(S[B],B);return V;function U(G,fe){z.resolve(G).then(function(L){A[fe]=L,++D!==T||E||(E=!0,f.resolve(V,A))},function(L){E||(E=!0,f.reject(V,L))})}},N.race=function(S){var z=this;if(Object.prototype.toString.call(S)!=="[object Array]")return this.reject(new TypeError("must be an array"));var T=S.length,E=!1;if(!T)return this.resolve([]);for(var A=-1,D=new this(u);++A<T;)B=S[A],z.resolve(B).then(function(V){E||(E=!0,f.resolve(D,V))},function(V){E||(E=!0,f.reject(D,V))});var B;return D}},{immediate:36}],38:[function(n,o,l){var d={};(0,n("./lib/utils/common").assign)(d,n("./lib/deflate"),n("./lib/inflate"),n("./lib/zlib/constants")),o.exports=d},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(n,o,l){var d=n("./zlib/deflate"),u=n("./utils/common"),f=n("./utils/strings"),h=n("./zlib/messages"),b=n("./zlib/zstream"),j=Object.prototype.toString,N=0,w=-1,_=0,v=8;function x(S){if(!(this instanceof x))return new x(S);this.options=u.assign({level:w,method:v,chunkSize:16384,windowBits:15,memLevel:8,strategy:_,to:""},S||{});var z=this.options;z.raw&&0<z.windowBits?z.windowBits=-z.windowBits:z.gzip&&0<z.windowBits&&z.windowBits<16&&(z.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new b,this.strm.avail_out=0;var T=d.deflateInit2(this.strm,z.level,z.method,z.windowBits,z.memLevel,z.strategy);if(T!==N)throw new Error(h[T]);if(z.header&&d.deflateSetHeader(this.strm,z.header),z.dictionary){var E;if(E=typeof z.dictionary=="string"?f.string2buf(z.dictionary):j.call(z.dictionary)==="[object ArrayBuffer]"?new Uint8Array(z.dictionary):z.dictionary,(T=d.deflateSetDictionary(this.strm,E))!==N)throw new Error(h[T]);this._dict_set=!0}}function g(S,z){var T=new x(z);if(T.push(S,!0),T.err)throw T.msg||h[T.err];return T.result}x.prototype.push=function(S,z){var T,E,A=this.strm,D=this.options.chunkSize;if(this.ended)return!1;E=z===~~z?z:z===!0?4:0,typeof S=="string"?A.input=f.string2buf(S):j.call(S)==="[object ArrayBuffer]"?A.input=new Uint8Array(S):A.input=S,A.next_in=0,A.avail_in=A.input.length;do{if(A.avail_out===0&&(A.output=new u.Buf8(D),A.next_out=0,A.avail_out=D),(T=d.deflate(A,E))!==1&&T!==N)return this.onEnd(T),!(this.ended=!0);A.avail_out!==0&&(A.avail_in!==0||E!==4&&E!==2)||(this.options.to==="string"?this.onData(f.buf2binstring(u.shrinkBuf(A.output,A.next_out))):this.onData(u.shrinkBuf(A.output,A.next_out)))}while((0<A.avail_in||A.avail_out===0)&&T!==1);return E===4?(T=d.deflateEnd(this.strm),this.onEnd(T),this.ended=!0,T===N):E!==2||(this.onEnd(N),!(A.avail_out=0))},x.prototype.onData=function(S){this.chunks.push(S)},x.prototype.onEnd=function(S){S===N&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=u.flattenChunks(this.chunks)),this.chunks=[],this.err=S,this.msg=this.strm.msg},l.Deflate=x,l.deflate=g,l.deflateRaw=function(S,z){return(z=z||{}).raw=!0,g(S,z)},l.gzip=function(S,z){return(z=z||{}).gzip=!0,g(S,z)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(n,o,l){var d=n("./zlib/inflate"),u=n("./utils/common"),f=n("./utils/strings"),h=n("./zlib/constants"),b=n("./zlib/messages"),j=n("./zlib/zstream"),N=n("./zlib/gzheader"),w=Object.prototype.toString;function _(x){if(!(this instanceof _))return new _(x);this.options=u.assign({chunkSize:16384,windowBits:0,to:""},x||{});var g=this.options;g.raw&&0<=g.windowBits&&g.windowBits<16&&(g.windowBits=-g.windowBits,g.windowBits===0&&(g.windowBits=-15)),!(0<=g.windowBits&&g.windowBits<16)||x&&x.windowBits||(g.windowBits+=32),15<g.windowBits&&g.windowBits<48&&(15&g.windowBits)==0&&(g.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new j,this.strm.avail_out=0;var S=d.inflateInit2(this.strm,g.windowBits);if(S!==h.Z_OK)throw new Error(b[S]);this.header=new N,d.inflateGetHeader(this.strm,this.header)}function v(x,g){var S=new _(g);if(S.push(x,!0),S.err)throw S.msg||b[S.err];return S.result}_.prototype.push=function(x,g){var S,z,T,E,A,D,B=this.strm,V=this.options.chunkSize,U=this.options.dictionary,G=!1;if(this.ended)return!1;z=g===~~g?g:g===!0?h.Z_FINISH:h.Z_NO_FLUSH,typeof x=="string"?B.input=f.binstring2buf(x):w.call(x)==="[object ArrayBuffer]"?B.input=new Uint8Array(x):B.input=x,B.next_in=0,B.avail_in=B.input.length;do{if(B.avail_out===0&&(B.output=new u.Buf8(V),B.next_out=0,B.avail_out=V),(S=d.inflate(B,h.Z_NO_FLUSH))===h.Z_NEED_DICT&&U&&(D=typeof U=="string"?f.string2buf(U):w.call(U)==="[object ArrayBuffer]"?new Uint8Array(U):U,S=d.inflateSetDictionary(this.strm,D)),S===h.Z_BUF_ERROR&&G===!0&&(S=h.Z_OK,G=!1),S!==h.Z_STREAM_END&&S!==h.Z_OK)return this.onEnd(S),!(this.ended=!0);B.next_out&&(B.avail_out!==0&&S!==h.Z_STREAM_END&&(B.avail_in!==0||z!==h.Z_FINISH&&z!==h.Z_SYNC_FLUSH)||(this.options.to==="string"?(T=f.utf8border(B.output,B.next_out),E=B.next_out-T,A=f.buf2string(B.output,T),B.next_out=E,B.avail_out=V-E,E&&u.arraySet(B.output,B.output,T,E,0),this.onData(A)):this.onData(u.shrinkBuf(B.output,B.next_out)))),B.avail_in===0&&B.avail_out===0&&(G=!0)}while((0<B.avail_in||B.avail_out===0)&&S!==h.Z_STREAM_END);return S===h.Z_STREAM_END&&(z=h.Z_FINISH),z===h.Z_FINISH?(S=d.inflateEnd(this.strm),this.onEnd(S),this.ended=!0,S===h.Z_OK):z!==h.Z_SYNC_FLUSH||(this.onEnd(h.Z_OK),!(B.avail_out=0))},_.prototype.onData=function(x){this.chunks.push(x)},_.prototype.onEnd=function(x){x===h.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=u.flattenChunks(this.chunks)),this.chunks=[],this.err=x,this.msg=this.strm.msg},l.Inflate=_,l.inflate=v,l.inflateRaw=function(x,g){return(g=g||{}).raw=!0,v(x,g)},l.ungzip=v},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(n,o,l){var d=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";l.assign=function(h){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var j=b.shift();if(j){if(typeof j!="object")throw new TypeError(j+"must be non-object");for(var N in j)j.hasOwnProperty(N)&&(h[N]=j[N])}}return h},l.shrinkBuf=function(h,b){return h.length===b?h:h.subarray?h.subarray(0,b):(h.length=b,h)};var u={arraySet:function(h,b,j,N,w){if(b.subarray&&h.subarray)h.set(b.subarray(j,j+N),w);else for(var _=0;_<N;_++)h[w+_]=b[j+_]},flattenChunks:function(h){var b,j,N,w,_,v;for(b=N=0,j=h.length;b<j;b++)N+=h[b].length;for(v=new Uint8Array(N),b=w=0,j=h.length;b<j;b++)_=h[b],v.set(_,w),w+=_.length;return v}},f={arraySet:function(h,b,j,N,w){for(var _=0;_<N;_++)h[w+_]=b[j+_]},flattenChunks:function(h){return[].concat.apply([],h)}};l.setTyped=function(h){h?(l.Buf8=Uint8Array,l.Buf16=Uint16Array,l.Buf32=Int32Array,l.assign(l,u)):(l.Buf8=Array,l.Buf16=Array,l.Buf32=Array,l.assign(l,f))},l.setTyped(d)},{}],42:[function(n,o,l){var d=n("./common"),u=!0,f=!0;try{String.fromCharCode.apply(null,[0])}catch{u=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{f=!1}for(var h=new d.Buf8(256),b=0;b<256;b++)h[b]=252<=b?6:248<=b?5:240<=b?4:224<=b?3:192<=b?2:1;function j(N,w){if(w<65537&&(N.subarray&&f||!N.subarray&&u))return String.fromCharCode.apply(null,d.shrinkBuf(N,w));for(var _="",v=0;v<w;v++)_+=String.fromCharCode(N[v]);return _}h[254]=h[254]=1,l.string2buf=function(N){var w,_,v,x,g,S=N.length,z=0;for(x=0;x<S;x++)(64512&(_=N.charCodeAt(x)))==55296&&x+1<S&&(64512&(v=N.charCodeAt(x+1)))==56320&&(_=65536+(_-55296<<10)+(v-56320),x++),z+=_<128?1:_<2048?2:_<65536?3:4;for(w=new d.Buf8(z),x=g=0;g<z;x++)(64512&(_=N.charCodeAt(x)))==55296&&x+1<S&&(64512&(v=N.charCodeAt(x+1)))==56320&&(_=65536+(_-55296<<10)+(v-56320),x++),_<128?w[g++]=_:(_<2048?w[g++]=192|_>>>6:(_<65536?w[g++]=224|_>>>12:(w[g++]=240|_>>>18,w[g++]=128|_>>>12&63),w[g++]=128|_>>>6&63),w[g++]=128|63&_);return w},l.buf2binstring=function(N){return j(N,N.length)},l.binstring2buf=function(N){for(var w=new d.Buf8(N.length),_=0,v=w.length;_<v;_++)w[_]=N.charCodeAt(_);return w},l.buf2string=function(N,w){var _,v,x,g,S=w||N.length,z=new Array(2*S);for(_=v=0;_<S;)if((x=N[_++])<128)z[v++]=x;else if(4<(g=h[x]))z[v++]=65533,_+=g-1;else{for(x&=g===2?31:g===3?15:7;1<g&&_<S;)x=x<<6|63&N[_++],g--;1<g?z[v++]=65533:x<65536?z[v++]=x:(x-=65536,z[v++]=55296|x>>10&1023,z[v++]=56320|1023&x)}return j(z,v)},l.utf8border=function(N,w){var _;for((w=w||N.length)>N.length&&(w=N.length),_=w-1;0<=_&&(192&N[_])==128;)_--;return _<0||_===0?w:_+h[N[_]]>w?_:w}},{"./common":41}],43:[function(n,o,l){o.exports=function(d,u,f,h){for(var b=65535&d|0,j=d>>>16&65535|0,N=0;f!==0;){for(f-=N=2e3<f?2e3:f;j=j+(b=b+u[h++]|0)|0,--N;);b%=65521,j%=65521}return b|j<<16|0}},{}],44:[function(n,o,l){o.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(n,o,l){var d=(function(){for(var u,f=[],h=0;h<256;h++){u=h;for(var b=0;b<8;b++)u=1&u?3988292384^u>>>1:u>>>1;f[h]=u}return f})();o.exports=function(u,f,h,b){var j=d,N=b+h;u^=-1;for(var w=b;w<N;w++)u=u>>>8^j[255&(u^f[w])];return-1^u}},{}],46:[function(n,o,l){var d,u=n("../utils/common"),f=n("./trees"),h=n("./adler32"),b=n("./crc32"),j=n("./messages"),N=0,w=4,_=0,v=-2,x=-1,g=4,S=2,z=8,T=9,E=286,A=30,D=19,B=2*E+1,V=15,U=3,G=258,fe=G+U+1,L=42,H=113,k=1,J=2,ve=3,se=4;function oe(y,he){return y.msg=j[he],he}function Q(y){return(y<<1)-(4<y?9:0)}function ce(y){for(var he=y.length;0<=--he;)y[he]=0}function R(y){var he=y.state,re=he.pending;re>y.avail_out&&(re=y.avail_out),re!==0&&(u.arraySet(y.output,he.pending_buf,he.pending_out,re,y.next_out),y.next_out+=re,he.pending_out+=re,y.total_out+=re,y.avail_out-=re,he.pending-=re,he.pending===0&&(he.pending_out=0))}function P(y,he){f._tr_flush_block(y,0<=y.block_start?y.block_start:-1,y.strstart-y.block_start,he),y.block_start=y.strstart,R(y.strm)}function W(y,he){y.pending_buf[y.pending++]=he}function ee(y,he){y.pending_buf[y.pending++]=he>>>8&255,y.pending_buf[y.pending++]=255&he}function te(y,he){var re,I,O=y.max_chain_length,Z=y.strstart,ge=y.prev_length,pe=y.nice_match,ae=y.strstart>y.w_size-fe?y.strstart-(y.w_size-fe):0,we=y.window,Ce=y.w_mask,Y=y.prev,ke=y.strstart+G,De=we[Z+ge-1],Fe=we[Z+ge];y.prev_length>=y.good_match&&(O>>=2),pe>y.lookahead&&(pe=y.lookahead);do if(we[(re=he)+ge]===Fe&&we[re+ge-1]===De&&we[re]===we[Z]&&we[++re]===we[Z+1]){Z+=2,re++;do;while(we[++Z]===we[++re]&&we[++Z]===we[++re]&&we[++Z]===we[++re]&&we[++Z]===we[++re]&&we[++Z]===we[++re]&&we[++Z]===we[++re]&&we[++Z]===we[++re]&&we[++Z]===we[++re]&&Z<ke);if(I=G-(ke-Z),Z=ke-G,ge<I){if(y.match_start=he,pe<=(ge=I))break;De=we[Z+ge-1],Fe=we[Z+ge]}}while((he=Y[he&Ce])>ae&&--O!=0);return ge<=y.lookahead?ge:y.lookahead}function Ne(y){var he,re,I,O,Z,ge,pe,ae,we,Ce,Y=y.w_size;do{if(O=y.window_size-y.lookahead-y.strstart,y.strstart>=Y+(Y-fe)){for(u.arraySet(y.window,y.window,Y,Y,0),y.match_start-=Y,y.strstart-=Y,y.block_start-=Y,he=re=y.hash_size;I=y.head[--he],y.head[he]=Y<=I?I-Y:0,--re;);for(he=re=Y;I=y.prev[--he],y.prev[he]=Y<=I?I-Y:0,--re;);O+=Y}if(y.strm.avail_in===0)break;if(ge=y.strm,pe=y.window,ae=y.strstart+y.lookahead,we=O,Ce=void 0,Ce=ge.avail_in,we<Ce&&(Ce=we),re=Ce===0?0:(ge.avail_in-=Ce,u.arraySet(pe,ge.input,ge.next_in,Ce,ae),ge.state.wrap===1?ge.adler=h(ge.adler,pe,Ce,ae):ge.state.wrap===2&&(ge.adler=b(ge.adler,pe,Ce,ae)),ge.next_in+=Ce,ge.total_in+=Ce,Ce),y.lookahead+=re,y.lookahead+y.insert>=U)for(Z=y.strstart-y.insert,y.ins_h=y.window[Z],y.ins_h=(y.ins_h<<y.hash_shift^y.window[Z+1])&y.hash_mask;y.insert&&(y.ins_h=(y.ins_h<<y.hash_shift^y.window[Z+U-1])&y.hash_mask,y.prev[Z&y.w_mask]=y.head[y.ins_h],y.head[y.ins_h]=Z,Z++,y.insert--,!(y.lookahead+y.insert<U)););}while(y.lookahead<fe&&y.strm.avail_in!==0)}function Te(y,he){for(var re,I;;){if(y.lookahead<fe){if(Ne(y),y.lookahead<fe&&he===N)return k;if(y.lookahead===0)break}if(re=0,y.lookahead>=U&&(y.ins_h=(y.ins_h<<y.hash_shift^y.window[y.strstart+U-1])&y.hash_mask,re=y.prev[y.strstart&y.w_mask]=y.head[y.ins_h],y.head[y.ins_h]=y.strstart),re!==0&&y.strstart-re<=y.w_size-fe&&(y.match_length=te(y,re)),y.match_length>=U)if(I=f._tr_tally(y,y.strstart-y.match_start,y.match_length-U),y.lookahead-=y.match_length,y.match_length<=y.max_lazy_match&&y.lookahead>=U){for(y.match_length--;y.strstart++,y.ins_h=(y.ins_h<<y.hash_shift^y.window[y.strstart+U-1])&y.hash_mask,re=y.prev[y.strstart&y.w_mask]=y.head[y.ins_h],y.head[y.ins_h]=y.strstart,--y.match_length!=0;);y.strstart++}else y.strstart+=y.match_length,y.match_length=0,y.ins_h=y.window[y.strstart],y.ins_h=(y.ins_h<<y.hash_shift^y.window[y.strstart+1])&y.hash_mask;else I=f._tr_tally(y,0,y.window[y.strstart]),y.lookahead--,y.strstart++;if(I&&(P(y,!1),y.strm.avail_out===0))return k}return y.insert=y.strstart<U-1?y.strstart:U-1,he===w?(P(y,!0),y.strm.avail_out===0?ve:se):y.last_lit&&(P(y,!1),y.strm.avail_out===0)?k:J}function _e(y,he){for(var re,I,O;;){if(y.lookahead<fe){if(Ne(y),y.lookahead<fe&&he===N)return k;if(y.lookahead===0)break}if(re=0,y.lookahead>=U&&(y.ins_h=(y.ins_h<<y.hash_shift^y.window[y.strstart+U-1])&y.hash_mask,re=y.prev[y.strstart&y.w_mask]=y.head[y.ins_h],y.head[y.ins_h]=y.strstart),y.prev_length=y.match_length,y.prev_match=y.match_start,y.match_length=U-1,re!==0&&y.prev_length<y.max_lazy_match&&y.strstart-re<=y.w_size-fe&&(y.match_length=te(y,re),y.match_length<=5&&(y.strategy===1||y.match_length===U&&4096<y.strstart-y.match_start)&&(y.match_length=U-1)),y.prev_length>=U&&y.match_length<=y.prev_length){for(O=y.strstart+y.lookahead-U,I=f._tr_tally(y,y.strstart-1-y.prev_match,y.prev_length-U),y.lookahead-=y.prev_length-1,y.prev_length-=2;++y.strstart<=O&&(y.ins_h=(y.ins_h<<y.hash_shift^y.window[y.strstart+U-1])&y.hash_mask,re=y.prev[y.strstart&y.w_mask]=y.head[y.ins_h],y.head[y.ins_h]=y.strstart),--y.prev_length!=0;);if(y.match_available=0,y.match_length=U-1,y.strstart++,I&&(P(y,!1),y.strm.avail_out===0))return k}else if(y.match_available){if((I=f._tr_tally(y,0,y.window[y.strstart-1]))&&P(y,!1),y.strstart++,y.lookahead--,y.strm.avail_out===0)return k}else y.match_available=1,y.strstart++,y.lookahead--}return y.match_available&&(I=f._tr_tally(y,0,y.window[y.strstart-1]),y.match_available=0),y.insert=y.strstart<U-1?y.strstart:U-1,he===w?(P(y,!0),y.strm.avail_out===0?ve:se):y.last_lit&&(P(y,!1),y.strm.avail_out===0)?k:J}function ze(y,he,re,I,O){this.good_length=y,this.max_lazy=he,this.nice_length=re,this.max_chain=I,this.func=O}function He(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=z,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new u.Buf16(2*B),this.dyn_dtree=new u.Buf16(2*(2*A+1)),this.bl_tree=new u.Buf16(2*(2*D+1)),ce(this.dyn_ltree),ce(this.dyn_dtree),ce(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new u.Buf16(V+1),this.heap=new u.Buf16(2*E+1),ce(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new u.Buf16(2*E+1),ce(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function Qe(y){var he;return y&&y.state?(y.total_in=y.total_out=0,y.data_type=S,(he=y.state).pending=0,he.pending_out=0,he.wrap<0&&(he.wrap=-he.wrap),he.status=he.wrap?L:H,y.adler=he.wrap===2?0:1,he.last_flush=N,f._tr_init(he),_):oe(y,v)}function xe(y){var he=Qe(y);return he===_&&(function(re){re.window_size=2*re.w_size,ce(re.head),re.max_lazy_match=d[re.level].max_lazy,re.good_match=d[re.level].good_length,re.nice_match=d[re.level].nice_length,re.max_chain_length=d[re.level].max_chain,re.strstart=0,re.block_start=0,re.lookahead=0,re.insert=0,re.match_length=re.prev_length=U-1,re.match_available=0,re.ins_h=0})(y.state),he}function Ae(y,he,re,I,O,Z){if(!y)return v;var ge=1;if(he===x&&(he=6),I<0?(ge=0,I=-I):15<I&&(ge=2,I-=16),O<1||T<O||re!==z||I<8||15<I||he<0||9<he||Z<0||g<Z)return oe(y,v);I===8&&(I=9);var pe=new He;return(y.state=pe).strm=y,pe.wrap=ge,pe.gzhead=null,pe.w_bits=I,pe.w_size=1<<pe.w_bits,pe.w_mask=pe.w_size-1,pe.hash_bits=O+7,pe.hash_size=1<<pe.hash_bits,pe.hash_mask=pe.hash_size-1,pe.hash_shift=~~((pe.hash_bits+U-1)/U),pe.window=new u.Buf8(2*pe.w_size),pe.head=new u.Buf16(pe.hash_size),pe.prev=new u.Buf16(pe.w_size),pe.lit_bufsize=1<<O+6,pe.pending_buf_size=4*pe.lit_bufsize,pe.pending_buf=new u.Buf8(pe.pending_buf_size),pe.d_buf=1*pe.lit_bufsize,pe.l_buf=3*pe.lit_bufsize,pe.level=he,pe.strategy=Z,pe.method=re,xe(y)}d=[new ze(0,0,0,0,function(y,he){var re=65535;for(re>y.pending_buf_size-5&&(re=y.pending_buf_size-5);;){if(y.lookahead<=1){if(Ne(y),y.lookahead===0&&he===N)return k;if(y.lookahead===0)break}y.strstart+=y.lookahead,y.lookahead=0;var I=y.block_start+re;if((y.strstart===0||y.strstart>=I)&&(y.lookahead=y.strstart-I,y.strstart=I,P(y,!1),y.strm.avail_out===0)||y.strstart-y.block_start>=y.w_size-fe&&(P(y,!1),y.strm.avail_out===0))return k}return y.insert=0,he===w?(P(y,!0),y.strm.avail_out===0?ve:se):(y.strstart>y.block_start&&(P(y,!1),y.strm.avail_out),k)}),new ze(4,4,8,4,Te),new ze(4,5,16,8,Te),new ze(4,6,32,32,Te),new ze(4,4,16,16,_e),new ze(8,16,32,32,_e),new ze(8,16,128,128,_e),new ze(8,32,128,256,_e),new ze(32,128,258,1024,_e),new ze(32,258,258,4096,_e)],l.deflateInit=function(y,he){return Ae(y,he,z,15,8,0)},l.deflateInit2=Ae,l.deflateReset=xe,l.deflateResetKeep=Qe,l.deflateSetHeader=function(y,he){return y&&y.state?y.state.wrap!==2?v:(y.state.gzhead=he,_):v},l.deflate=function(y,he){var re,I,O,Z;if(!y||!y.state||5<he||he<0)return y?oe(y,v):v;if(I=y.state,!y.output||!y.input&&y.avail_in!==0||I.status===666&&he!==w)return oe(y,y.avail_out===0?-5:v);if(I.strm=y,re=I.last_flush,I.last_flush=he,I.status===L)if(I.wrap===2)y.adler=0,W(I,31),W(I,139),W(I,8),I.gzhead?(W(I,(I.gzhead.text?1:0)+(I.gzhead.hcrc?2:0)+(I.gzhead.extra?4:0)+(I.gzhead.name?8:0)+(I.gzhead.comment?16:0)),W(I,255&I.gzhead.time),W(I,I.gzhead.time>>8&255),W(I,I.gzhead.time>>16&255),W(I,I.gzhead.time>>24&255),W(I,I.level===9?2:2<=I.strategy||I.level<2?4:0),W(I,255&I.gzhead.os),I.gzhead.extra&&I.gzhead.extra.length&&(W(I,255&I.gzhead.extra.length),W(I,I.gzhead.extra.length>>8&255)),I.gzhead.hcrc&&(y.adler=b(y.adler,I.pending_buf,I.pending,0)),I.gzindex=0,I.status=69):(W(I,0),W(I,0),W(I,0),W(I,0),W(I,0),W(I,I.level===9?2:2<=I.strategy||I.level<2?4:0),W(I,3),I.status=H);else{var ge=z+(I.w_bits-8<<4)<<8;ge|=(2<=I.strategy||I.level<2?0:I.level<6?1:I.level===6?2:3)<<6,I.strstart!==0&&(ge|=32),ge+=31-ge%31,I.status=H,ee(I,ge),I.strstart!==0&&(ee(I,y.adler>>>16),ee(I,65535&y.adler)),y.adler=1}if(I.status===69)if(I.gzhead.extra){for(O=I.pending;I.gzindex<(65535&I.gzhead.extra.length)&&(I.pending!==I.pending_buf_size||(I.gzhead.hcrc&&I.pending>O&&(y.adler=b(y.adler,I.pending_buf,I.pending-O,O)),R(y),O=I.pending,I.pending!==I.pending_buf_size));)W(I,255&I.gzhead.extra[I.gzindex]),I.gzindex++;I.gzhead.hcrc&&I.pending>O&&(y.adler=b(y.adler,I.pending_buf,I.pending-O,O)),I.gzindex===I.gzhead.extra.length&&(I.gzindex=0,I.status=73)}else I.status=73;if(I.status===73)if(I.gzhead.name){O=I.pending;do{if(I.pending===I.pending_buf_size&&(I.gzhead.hcrc&&I.pending>O&&(y.adler=b(y.adler,I.pending_buf,I.pending-O,O)),R(y),O=I.pending,I.pending===I.pending_buf_size)){Z=1;break}Z=I.gzindex<I.gzhead.name.length?255&I.gzhead.name.charCodeAt(I.gzindex++):0,W(I,Z)}while(Z!==0);I.gzhead.hcrc&&I.pending>O&&(y.adler=b(y.adler,I.pending_buf,I.pending-O,O)),Z===0&&(I.gzindex=0,I.status=91)}else I.status=91;if(I.status===91)if(I.gzhead.comment){O=I.pending;do{if(I.pending===I.pending_buf_size&&(I.gzhead.hcrc&&I.pending>O&&(y.adler=b(y.adler,I.pending_buf,I.pending-O,O)),R(y),O=I.pending,I.pending===I.pending_buf_size)){Z=1;break}Z=I.gzindex<I.gzhead.comment.length?255&I.gzhead.comment.charCodeAt(I.gzindex++):0,W(I,Z)}while(Z!==0);I.gzhead.hcrc&&I.pending>O&&(y.adler=b(y.adler,I.pending_buf,I.pending-O,O)),Z===0&&(I.status=103)}else I.status=103;if(I.status===103&&(I.gzhead.hcrc?(I.pending+2>I.pending_buf_size&&R(y),I.pending+2<=I.pending_buf_size&&(W(I,255&y.adler),W(I,y.adler>>8&255),y.adler=0,I.status=H)):I.status=H),I.pending!==0){if(R(y),y.avail_out===0)return I.last_flush=-1,_}else if(y.avail_in===0&&Q(he)<=Q(re)&&he!==w)return oe(y,-5);if(I.status===666&&y.avail_in!==0)return oe(y,-5);if(y.avail_in!==0||I.lookahead!==0||he!==N&&I.status!==666){var pe=I.strategy===2?(function(ae,we){for(var Ce;;){if(ae.lookahead===0&&(Ne(ae),ae.lookahead===0)){if(we===N)return k;break}if(ae.match_length=0,Ce=f._tr_tally(ae,0,ae.window[ae.strstart]),ae.lookahead--,ae.strstart++,Ce&&(P(ae,!1),ae.strm.avail_out===0))return k}return ae.insert=0,we===w?(P(ae,!0),ae.strm.avail_out===0?ve:se):ae.last_lit&&(P(ae,!1),ae.strm.avail_out===0)?k:J})(I,he):I.strategy===3?(function(ae,we){for(var Ce,Y,ke,De,Fe=ae.window;;){if(ae.lookahead<=G){if(Ne(ae),ae.lookahead<=G&&we===N)return k;if(ae.lookahead===0)break}if(ae.match_length=0,ae.lookahead>=U&&0<ae.strstart&&(Y=Fe[ke=ae.strstart-1])===Fe[++ke]&&Y===Fe[++ke]&&Y===Fe[++ke]){De=ae.strstart+G;do;while(Y===Fe[++ke]&&Y===Fe[++ke]&&Y===Fe[++ke]&&Y===Fe[++ke]&&Y===Fe[++ke]&&Y===Fe[++ke]&&Y===Fe[++ke]&&Y===Fe[++ke]&&ke<De);ae.match_length=G-(De-ke),ae.match_length>ae.lookahead&&(ae.match_length=ae.lookahead)}if(ae.match_length>=U?(Ce=f._tr_tally(ae,1,ae.match_length-U),ae.lookahead-=ae.match_length,ae.strstart+=ae.match_length,ae.match_length=0):(Ce=f._tr_tally(ae,0,ae.window[ae.strstart]),ae.lookahead--,ae.strstart++),Ce&&(P(ae,!1),ae.strm.avail_out===0))return k}return ae.insert=0,we===w?(P(ae,!0),ae.strm.avail_out===0?ve:se):ae.last_lit&&(P(ae,!1),ae.strm.avail_out===0)?k:J})(I,he):d[I.level].func(I,he);if(pe!==ve&&pe!==se||(I.status=666),pe===k||pe===ve)return y.avail_out===0&&(I.last_flush=-1),_;if(pe===J&&(he===1?f._tr_align(I):he!==5&&(f._tr_stored_block(I,0,0,!1),he===3&&(ce(I.head),I.lookahead===0&&(I.strstart=0,I.block_start=0,I.insert=0))),R(y),y.avail_out===0))return I.last_flush=-1,_}return he!==w?_:I.wrap<=0?1:(I.wrap===2?(W(I,255&y.adler),W(I,y.adler>>8&255),W(I,y.adler>>16&255),W(I,y.adler>>24&255),W(I,255&y.total_in),W(I,y.total_in>>8&255),W(I,y.total_in>>16&255),W(I,y.total_in>>24&255)):(ee(I,y.adler>>>16),ee(I,65535&y.adler)),R(y),0<I.wrap&&(I.wrap=-I.wrap),I.pending!==0?_:1)},l.deflateEnd=function(y){var he;return y&&y.state?(he=y.state.status)!==L&&he!==69&&he!==73&&he!==91&&he!==103&&he!==H&&he!==666?oe(y,v):(y.state=null,he===H?oe(y,-3):_):v},l.deflateSetDictionary=function(y,he){var re,I,O,Z,ge,pe,ae,we,Ce=he.length;if(!y||!y.state||(Z=(re=y.state).wrap)===2||Z===1&&re.status!==L||re.lookahead)return v;for(Z===1&&(y.adler=h(y.adler,he,Ce,0)),re.wrap=0,Ce>=re.w_size&&(Z===0&&(ce(re.head),re.strstart=0,re.block_start=0,re.insert=0),we=new u.Buf8(re.w_size),u.arraySet(we,he,Ce-re.w_size,re.w_size,0),he=we,Ce=re.w_size),ge=y.avail_in,pe=y.next_in,ae=y.input,y.avail_in=Ce,y.next_in=0,y.input=he,Ne(re);re.lookahead>=U;){for(I=re.strstart,O=re.lookahead-(U-1);re.ins_h=(re.ins_h<<re.hash_shift^re.window[I+U-1])&re.hash_mask,re.prev[I&re.w_mask]=re.head[re.ins_h],re.head[re.ins_h]=I,I++,--O;);re.strstart=I,re.lookahead=U-1,Ne(re)}return re.strstart+=re.lookahead,re.block_start=re.strstart,re.insert=re.lookahead,re.lookahead=0,re.match_length=re.prev_length=U-1,re.match_available=0,y.next_in=pe,y.input=ae,y.avail_in=ge,re.wrap=Z,_},l.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(n,o,l){o.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(n,o,l){o.exports=function(d,u){var f,h,b,j,N,w,_,v,x,g,S,z,T,E,A,D,B,V,U,G,fe,L,H,k,J;f=d.state,h=d.next_in,k=d.input,b=h+(d.avail_in-5),j=d.next_out,J=d.output,N=j-(u-d.avail_out),w=j+(d.avail_out-257),_=f.dmax,v=f.wsize,x=f.whave,g=f.wnext,S=f.window,z=f.hold,T=f.bits,E=f.lencode,A=f.distcode,D=(1<<f.lenbits)-1,B=(1<<f.distbits)-1;e:do{T<15&&(z+=k[h++]<<T,T+=8,z+=k[h++]<<T,T+=8),V=E[z&D];t:for(;;){if(z>>>=U=V>>>24,T-=U,(U=V>>>16&255)===0)J[j++]=65535&V;else{if(!(16&U)){if((64&U)==0){V=E[(65535&V)+(z&(1<<U)-1)];continue t}if(32&U){f.mode=12;break e}d.msg="invalid literal/length code",f.mode=30;break e}G=65535&V,(U&=15)&&(T<U&&(z+=k[h++]<<T,T+=8),G+=z&(1<<U)-1,z>>>=U,T-=U),T<15&&(z+=k[h++]<<T,T+=8,z+=k[h++]<<T,T+=8),V=A[z&B];r:for(;;){if(z>>>=U=V>>>24,T-=U,!(16&(U=V>>>16&255))){if((64&U)==0){V=A[(65535&V)+(z&(1<<U)-1)];continue r}d.msg="invalid distance code",f.mode=30;break e}if(fe=65535&V,T<(U&=15)&&(z+=k[h++]<<T,(T+=8)<U&&(z+=k[h++]<<T,T+=8)),_<(fe+=z&(1<<U)-1)){d.msg="invalid distance too far back",f.mode=30;break e}if(z>>>=U,T-=U,(U=j-N)<fe){if(x<(U=fe-U)&&f.sane){d.msg="invalid distance too far back",f.mode=30;break e}if(H=S,(L=0)===g){if(L+=v-U,U<G){for(G-=U;J[j++]=S[L++],--U;);L=j-fe,H=J}}else if(g<U){if(L+=v+g-U,(U-=g)<G){for(G-=U;J[j++]=S[L++],--U;);if(L=0,g<G){for(G-=U=g;J[j++]=S[L++],--U;);L=j-fe,H=J}}}else if(L+=g-U,U<G){for(G-=U;J[j++]=S[L++],--U;);L=j-fe,H=J}for(;2<G;)J[j++]=H[L++],J[j++]=H[L++],J[j++]=H[L++],G-=3;G&&(J[j++]=H[L++],1<G&&(J[j++]=H[L++]))}else{for(L=j-fe;J[j++]=J[L++],J[j++]=J[L++],J[j++]=J[L++],2<(G-=3););G&&(J[j++]=J[L++],1<G&&(J[j++]=J[L++]))}break}}break}}while(h<b&&j<w);h-=G=T>>3,z&=(1<<(T-=G<<3))-1,d.next_in=h,d.next_out=j,d.avail_in=h<b?b-h+5:5-(h-b),d.avail_out=j<w?w-j+257:257-(j-w),f.hold=z,f.bits=T}},{}],49:[function(n,o,l){var d=n("../utils/common"),u=n("./adler32"),f=n("./crc32"),h=n("./inffast"),b=n("./inftrees"),j=1,N=2,w=0,_=-2,v=1,x=852,g=592;function S(L){return(L>>>24&255)+(L>>>8&65280)+((65280&L)<<8)+((255&L)<<24)}function z(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new d.Buf16(320),this.work=new d.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function T(L){var H;return L&&L.state?(H=L.state,L.total_in=L.total_out=H.total=0,L.msg="",H.wrap&&(L.adler=1&H.wrap),H.mode=v,H.last=0,H.havedict=0,H.dmax=32768,H.head=null,H.hold=0,H.bits=0,H.lencode=H.lendyn=new d.Buf32(x),H.distcode=H.distdyn=new d.Buf32(g),H.sane=1,H.back=-1,w):_}function E(L){var H;return L&&L.state?((H=L.state).wsize=0,H.whave=0,H.wnext=0,T(L)):_}function A(L,H){var k,J;return L&&L.state?(J=L.state,H<0?(k=0,H=-H):(k=1+(H>>4),H<48&&(H&=15)),H&&(H<8||15<H)?_:(J.window!==null&&J.wbits!==H&&(J.window=null),J.wrap=k,J.wbits=H,E(L))):_}function D(L,H){var k,J;return L?(J=new z,(L.state=J).window=null,(k=A(L,H))!==w&&(L.state=null),k):_}var B,V,U=!0;function G(L){if(U){var H;for(B=new d.Buf32(512),V=new d.Buf32(32),H=0;H<144;)L.lens[H++]=8;for(;H<256;)L.lens[H++]=9;for(;H<280;)L.lens[H++]=7;for(;H<288;)L.lens[H++]=8;for(b(j,L.lens,0,288,B,0,L.work,{bits:9}),H=0;H<32;)L.lens[H++]=5;b(N,L.lens,0,32,V,0,L.work,{bits:5}),U=!1}L.lencode=B,L.lenbits=9,L.distcode=V,L.distbits=5}function fe(L,H,k,J){var ve,se=L.state;return se.window===null&&(se.wsize=1<<se.wbits,se.wnext=0,se.whave=0,se.window=new d.Buf8(se.wsize)),J>=se.wsize?(d.arraySet(se.window,H,k-se.wsize,se.wsize,0),se.wnext=0,se.whave=se.wsize):(J<(ve=se.wsize-se.wnext)&&(ve=J),d.arraySet(se.window,H,k-J,ve,se.wnext),(J-=ve)?(d.arraySet(se.window,H,k-J,J,0),se.wnext=J,se.whave=se.wsize):(se.wnext+=ve,se.wnext===se.wsize&&(se.wnext=0),se.whave<se.wsize&&(se.whave+=ve))),0}l.inflateReset=E,l.inflateReset2=A,l.inflateResetKeep=T,l.inflateInit=function(L){return D(L,15)},l.inflateInit2=D,l.inflate=function(L,H){var k,J,ve,se,oe,Q,ce,R,P,W,ee,te,Ne,Te,_e,ze,He,Qe,xe,Ae,y,he,re,I,O=0,Z=new d.Buf8(4),ge=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!L||!L.state||!L.output||!L.input&&L.avail_in!==0)return _;(k=L.state).mode===12&&(k.mode=13),oe=L.next_out,ve=L.output,ce=L.avail_out,se=L.next_in,J=L.input,Q=L.avail_in,R=k.hold,P=k.bits,W=Q,ee=ce,he=w;e:for(;;)switch(k.mode){case v:if(k.wrap===0){k.mode=13;break}for(;P<16;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}if(2&k.wrap&&R===35615){Z[k.check=0]=255&R,Z[1]=R>>>8&255,k.check=f(k.check,Z,2,0),P=R=0,k.mode=2;break}if(k.flags=0,k.head&&(k.head.done=!1),!(1&k.wrap)||(((255&R)<<8)+(R>>8))%31){L.msg="incorrect header check",k.mode=30;break}if((15&R)!=8){L.msg="unknown compression method",k.mode=30;break}if(P-=4,y=8+(15&(R>>>=4)),k.wbits===0)k.wbits=y;else if(y>k.wbits){L.msg="invalid window size",k.mode=30;break}k.dmax=1<<y,L.adler=k.check=1,k.mode=512&R?10:12,P=R=0;break;case 2:for(;P<16;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}if(k.flags=R,(255&k.flags)!=8){L.msg="unknown compression method",k.mode=30;break}if(57344&k.flags){L.msg="unknown header flags set",k.mode=30;break}k.head&&(k.head.text=R>>8&1),512&k.flags&&(Z[0]=255&R,Z[1]=R>>>8&255,k.check=f(k.check,Z,2,0)),P=R=0,k.mode=3;case 3:for(;P<32;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}k.head&&(k.head.time=R),512&k.flags&&(Z[0]=255&R,Z[1]=R>>>8&255,Z[2]=R>>>16&255,Z[3]=R>>>24&255,k.check=f(k.check,Z,4,0)),P=R=0,k.mode=4;case 4:for(;P<16;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}k.head&&(k.head.xflags=255&R,k.head.os=R>>8),512&k.flags&&(Z[0]=255&R,Z[1]=R>>>8&255,k.check=f(k.check,Z,2,0)),P=R=0,k.mode=5;case 5:if(1024&k.flags){for(;P<16;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}k.length=R,k.head&&(k.head.extra_len=R),512&k.flags&&(Z[0]=255&R,Z[1]=R>>>8&255,k.check=f(k.check,Z,2,0)),P=R=0}else k.head&&(k.head.extra=null);k.mode=6;case 6:if(1024&k.flags&&(Q<(te=k.length)&&(te=Q),te&&(k.head&&(y=k.head.extra_len-k.length,k.head.extra||(k.head.extra=new Array(k.head.extra_len)),d.arraySet(k.head.extra,J,se,te,y)),512&k.flags&&(k.check=f(k.check,J,te,se)),Q-=te,se+=te,k.length-=te),k.length))break e;k.length=0,k.mode=7;case 7:if(2048&k.flags){if(Q===0)break e;for(te=0;y=J[se+te++],k.head&&y&&k.length<65536&&(k.head.name+=String.fromCharCode(y)),y&&te<Q;);if(512&k.flags&&(k.check=f(k.check,J,te,se)),Q-=te,se+=te,y)break e}else k.head&&(k.head.name=null);k.length=0,k.mode=8;case 8:if(4096&k.flags){if(Q===0)break e;for(te=0;y=J[se+te++],k.head&&y&&k.length<65536&&(k.head.comment+=String.fromCharCode(y)),y&&te<Q;);if(512&k.flags&&(k.check=f(k.check,J,te,se)),Q-=te,se+=te,y)break e}else k.head&&(k.head.comment=null);k.mode=9;case 9:if(512&k.flags){for(;P<16;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}if(R!==(65535&k.check)){L.msg="header crc mismatch",k.mode=30;break}P=R=0}k.head&&(k.head.hcrc=k.flags>>9&1,k.head.done=!0),L.adler=k.check=0,k.mode=12;break;case 10:for(;P<32;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}L.adler=k.check=S(R),P=R=0,k.mode=11;case 11:if(k.havedict===0)return L.next_out=oe,L.avail_out=ce,L.next_in=se,L.avail_in=Q,k.hold=R,k.bits=P,2;L.adler=k.check=1,k.mode=12;case 12:if(H===5||H===6)break e;case 13:if(k.last){R>>>=7&P,P-=7&P,k.mode=27;break}for(;P<3;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}switch(k.last=1&R,P-=1,3&(R>>>=1)){case 0:k.mode=14;break;case 1:if(G(k),k.mode=20,H!==6)break;R>>>=2,P-=2;break e;case 2:k.mode=17;break;case 3:L.msg="invalid block type",k.mode=30}R>>>=2,P-=2;break;case 14:for(R>>>=7&P,P-=7&P;P<32;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}if((65535&R)!=(R>>>16^65535)){L.msg="invalid stored block lengths",k.mode=30;break}if(k.length=65535&R,P=R=0,k.mode=15,H===6)break e;case 15:k.mode=16;case 16:if(te=k.length){if(Q<te&&(te=Q),ce<te&&(te=ce),te===0)break e;d.arraySet(ve,J,se,te,oe),Q-=te,se+=te,ce-=te,oe+=te,k.length-=te;break}k.mode=12;break;case 17:for(;P<14;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}if(k.nlen=257+(31&R),R>>>=5,P-=5,k.ndist=1+(31&R),R>>>=5,P-=5,k.ncode=4+(15&R),R>>>=4,P-=4,286<k.nlen||30<k.ndist){L.msg="too many length or distance symbols",k.mode=30;break}k.have=0,k.mode=18;case 18:for(;k.have<k.ncode;){for(;P<3;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}k.lens[ge[k.have++]]=7&R,R>>>=3,P-=3}for(;k.have<19;)k.lens[ge[k.have++]]=0;if(k.lencode=k.lendyn,k.lenbits=7,re={bits:k.lenbits},he=b(0,k.lens,0,19,k.lencode,0,k.work,re),k.lenbits=re.bits,he){L.msg="invalid code lengths set",k.mode=30;break}k.have=0,k.mode=19;case 19:for(;k.have<k.nlen+k.ndist;){for(;ze=(O=k.lencode[R&(1<<k.lenbits)-1])>>>16&255,He=65535&O,!((_e=O>>>24)<=P);){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}if(He<16)R>>>=_e,P-=_e,k.lens[k.have++]=He;else{if(He===16){for(I=_e+2;P<I;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}if(R>>>=_e,P-=_e,k.have===0){L.msg="invalid bit length repeat",k.mode=30;break}y=k.lens[k.have-1],te=3+(3&R),R>>>=2,P-=2}else if(He===17){for(I=_e+3;P<I;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}P-=_e,y=0,te=3+(7&(R>>>=_e)),R>>>=3,P-=3}else{for(I=_e+7;P<I;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}P-=_e,y=0,te=11+(127&(R>>>=_e)),R>>>=7,P-=7}if(k.have+te>k.nlen+k.ndist){L.msg="invalid bit length repeat",k.mode=30;break}for(;te--;)k.lens[k.have++]=y}}if(k.mode===30)break;if(k.lens[256]===0){L.msg="invalid code -- missing end-of-block",k.mode=30;break}if(k.lenbits=9,re={bits:k.lenbits},he=b(j,k.lens,0,k.nlen,k.lencode,0,k.work,re),k.lenbits=re.bits,he){L.msg="invalid literal/lengths set",k.mode=30;break}if(k.distbits=6,k.distcode=k.distdyn,re={bits:k.distbits},he=b(N,k.lens,k.nlen,k.ndist,k.distcode,0,k.work,re),k.distbits=re.bits,he){L.msg="invalid distances set",k.mode=30;break}if(k.mode=20,H===6)break e;case 20:k.mode=21;case 21:if(6<=Q&&258<=ce){L.next_out=oe,L.avail_out=ce,L.next_in=se,L.avail_in=Q,k.hold=R,k.bits=P,h(L,ee),oe=L.next_out,ve=L.output,ce=L.avail_out,se=L.next_in,J=L.input,Q=L.avail_in,R=k.hold,P=k.bits,k.mode===12&&(k.back=-1);break}for(k.back=0;ze=(O=k.lencode[R&(1<<k.lenbits)-1])>>>16&255,He=65535&O,!((_e=O>>>24)<=P);){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}if(ze&&(240&ze)==0){for(Qe=_e,xe=ze,Ae=He;ze=(O=k.lencode[Ae+((R&(1<<Qe+xe)-1)>>Qe)])>>>16&255,He=65535&O,!(Qe+(_e=O>>>24)<=P);){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}R>>>=Qe,P-=Qe,k.back+=Qe}if(R>>>=_e,P-=_e,k.back+=_e,k.length=He,ze===0){k.mode=26;break}if(32&ze){k.back=-1,k.mode=12;break}if(64&ze){L.msg="invalid literal/length code",k.mode=30;break}k.extra=15&ze,k.mode=22;case 22:if(k.extra){for(I=k.extra;P<I;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}k.length+=R&(1<<k.extra)-1,R>>>=k.extra,P-=k.extra,k.back+=k.extra}k.was=k.length,k.mode=23;case 23:for(;ze=(O=k.distcode[R&(1<<k.distbits)-1])>>>16&255,He=65535&O,!((_e=O>>>24)<=P);){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}if((240&ze)==0){for(Qe=_e,xe=ze,Ae=He;ze=(O=k.distcode[Ae+((R&(1<<Qe+xe)-1)>>Qe)])>>>16&255,He=65535&O,!(Qe+(_e=O>>>24)<=P);){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}R>>>=Qe,P-=Qe,k.back+=Qe}if(R>>>=_e,P-=_e,k.back+=_e,64&ze){L.msg="invalid distance code",k.mode=30;break}k.offset=He,k.extra=15&ze,k.mode=24;case 24:if(k.extra){for(I=k.extra;P<I;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}k.offset+=R&(1<<k.extra)-1,R>>>=k.extra,P-=k.extra,k.back+=k.extra}if(k.offset>k.dmax){L.msg="invalid distance too far back",k.mode=30;break}k.mode=25;case 25:if(ce===0)break e;if(te=ee-ce,k.offset>te){if((te=k.offset-te)>k.whave&&k.sane){L.msg="invalid distance too far back",k.mode=30;break}Ne=te>k.wnext?(te-=k.wnext,k.wsize-te):k.wnext-te,te>k.length&&(te=k.length),Te=k.window}else Te=ve,Ne=oe-k.offset,te=k.length;for(ce<te&&(te=ce),ce-=te,k.length-=te;ve[oe++]=Te[Ne++],--te;);k.length===0&&(k.mode=21);break;case 26:if(ce===0)break e;ve[oe++]=k.length,ce--,k.mode=21;break;case 27:if(k.wrap){for(;P<32;){if(Q===0)break e;Q--,R|=J[se++]<<P,P+=8}if(ee-=ce,L.total_out+=ee,k.total+=ee,ee&&(L.adler=k.check=k.flags?f(k.check,ve,ee,oe-ee):u(k.check,ve,ee,oe-ee)),ee=ce,(k.flags?R:S(R))!==k.check){L.msg="incorrect data check",k.mode=30;break}P=R=0}k.mode=28;case 28:if(k.wrap&&k.flags){for(;P<32;){if(Q===0)break e;Q--,R+=J[se++]<<P,P+=8}if(R!==(4294967295&k.total)){L.msg="incorrect length check",k.mode=30;break}P=R=0}k.mode=29;case 29:he=1;break e;case 30:he=-3;break e;case 31:return-4;case 32:default:return _}return L.next_out=oe,L.avail_out=ce,L.next_in=se,L.avail_in=Q,k.hold=R,k.bits=P,(k.wsize||ee!==L.avail_out&&k.mode<30&&(k.mode<27||H!==4))&&fe(L,L.output,L.next_out,ee-L.avail_out)?(k.mode=31,-4):(W-=L.avail_in,ee-=L.avail_out,L.total_in+=W,L.total_out+=ee,k.total+=ee,k.wrap&&ee&&(L.adler=k.check=k.flags?f(k.check,ve,ee,L.next_out-ee):u(k.check,ve,ee,L.next_out-ee)),L.data_type=k.bits+(k.last?64:0)+(k.mode===12?128:0)+(k.mode===20||k.mode===15?256:0),(W==0&&ee===0||H===4)&&he===w&&(he=-5),he)},l.inflateEnd=function(L){if(!L||!L.state)return _;var H=L.state;return H.window&&(H.window=null),L.state=null,w},l.inflateGetHeader=function(L,H){var k;return L&&L.state?(2&(k=L.state).wrap)==0?_:((k.head=H).done=!1,w):_},l.inflateSetDictionary=function(L,H){var k,J=H.length;return L&&L.state?(k=L.state).wrap!==0&&k.mode!==11?_:k.mode===11&&u(1,H,J,0)!==k.check?-3:fe(L,H,J,J)?(k.mode=31,-4):(k.havedict=1,w):_},l.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(n,o,l){var d=n("../utils/common"),u=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],f=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],h=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],b=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];o.exports=function(j,N,w,_,v,x,g,S){var z,T,E,A,D,B,V,U,G,fe=S.bits,L=0,H=0,k=0,J=0,ve=0,se=0,oe=0,Q=0,ce=0,R=0,P=null,W=0,ee=new d.Buf16(16),te=new d.Buf16(16),Ne=null,Te=0;for(L=0;L<=15;L++)ee[L]=0;for(H=0;H<_;H++)ee[N[w+H]]++;for(ve=fe,J=15;1<=J&&ee[J]===0;J--);if(J<ve&&(ve=J),J===0)return v[x++]=20971520,v[x++]=20971520,S.bits=1,0;for(k=1;k<J&&ee[k]===0;k++);for(ve<k&&(ve=k),L=Q=1;L<=15;L++)if(Q<<=1,(Q-=ee[L])<0)return-1;if(0<Q&&(j===0||J!==1))return-1;for(te[1]=0,L=1;L<15;L++)te[L+1]=te[L]+ee[L];for(H=0;H<_;H++)N[w+H]!==0&&(g[te[N[w+H]]++]=H);if(B=j===0?(P=Ne=g,19):j===1?(P=u,W-=257,Ne=f,Te-=257,256):(P=h,Ne=b,-1),L=k,D=x,oe=H=R=0,E=-1,A=(ce=1<<(se=ve))-1,j===1&&852<ce||j===2&&592<ce)return 1;for(;;){for(V=L-oe,G=g[H]<B?(U=0,g[H]):g[H]>B?(U=Ne[Te+g[H]],P[W+g[H]]):(U=96,0),z=1<<L-oe,k=T=1<<se;v[D+(R>>oe)+(T-=z)]=V<<24|U<<16|G|0,T!==0;);for(z=1<<L-1;R&z;)z>>=1;if(z!==0?(R&=z-1,R+=z):R=0,H++,--ee[L]==0){if(L===J)break;L=N[w+g[H]]}if(ve<L&&(R&A)!==E){for(oe===0&&(oe=ve),D+=k,Q=1<<(se=L-oe);se+oe<J&&!((Q-=ee[se+oe])<=0);)se++,Q<<=1;if(ce+=1<<se,j===1&&852<ce||j===2&&592<ce)return 1;v[E=R&A]=ve<<24|se<<16|D-x|0}}return R!==0&&(v[D+R]=L-oe<<24|64<<16|0),S.bits=ve,0}},{"../utils/common":41}],51:[function(n,o,l){o.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(n,o,l){var d=n("../utils/common"),u=0,f=1;function h(O){for(var Z=O.length;0<=--Z;)O[Z]=0}var b=0,j=29,N=256,w=N+1+j,_=30,v=19,x=2*w+1,g=15,S=16,z=7,T=256,E=16,A=17,D=18,B=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],V=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],U=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],G=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],fe=new Array(2*(w+2));h(fe);var L=new Array(2*_);h(L);var H=new Array(512);h(H);var k=new Array(256);h(k);var J=new Array(j);h(J);var ve,se,oe,Q=new Array(_);function ce(O,Z,ge,pe,ae){this.static_tree=O,this.extra_bits=Z,this.extra_base=ge,this.elems=pe,this.max_length=ae,this.has_stree=O&&O.length}function R(O,Z){this.dyn_tree=O,this.max_code=0,this.stat_desc=Z}function P(O){return O<256?H[O]:H[256+(O>>>7)]}function W(O,Z){O.pending_buf[O.pending++]=255&Z,O.pending_buf[O.pending++]=Z>>>8&255}function ee(O,Z,ge){O.bi_valid>S-ge?(O.bi_buf|=Z<<O.bi_valid&65535,W(O,O.bi_buf),O.bi_buf=Z>>S-O.bi_valid,O.bi_valid+=ge-S):(O.bi_buf|=Z<<O.bi_valid&65535,O.bi_valid+=ge)}function te(O,Z,ge){ee(O,ge[2*Z],ge[2*Z+1])}function Ne(O,Z){for(var ge=0;ge|=1&O,O>>>=1,ge<<=1,0<--Z;);return ge>>>1}function Te(O,Z,ge){var pe,ae,we=new Array(g+1),Ce=0;for(pe=1;pe<=g;pe++)we[pe]=Ce=Ce+ge[pe-1]<<1;for(ae=0;ae<=Z;ae++){var Y=O[2*ae+1];Y!==0&&(O[2*ae]=Ne(we[Y]++,Y))}}function _e(O){var Z;for(Z=0;Z<w;Z++)O.dyn_ltree[2*Z]=0;for(Z=0;Z<_;Z++)O.dyn_dtree[2*Z]=0;for(Z=0;Z<v;Z++)O.bl_tree[2*Z]=0;O.dyn_ltree[2*T]=1,O.opt_len=O.static_len=0,O.last_lit=O.matches=0}function ze(O){8<O.bi_valid?W(O,O.bi_buf):0<O.bi_valid&&(O.pending_buf[O.pending++]=O.bi_buf),O.bi_buf=0,O.bi_valid=0}function He(O,Z,ge,pe){var ae=2*Z,we=2*ge;return O[ae]<O[we]||O[ae]===O[we]&&pe[Z]<=pe[ge]}function Qe(O,Z,ge){for(var pe=O.heap[ge],ae=ge<<1;ae<=O.heap_len&&(ae<O.heap_len&&He(Z,O.heap[ae+1],O.heap[ae],O.depth)&&ae++,!He(Z,pe,O.heap[ae],O.depth));)O.heap[ge]=O.heap[ae],ge=ae,ae<<=1;O.heap[ge]=pe}function xe(O,Z,ge){var pe,ae,we,Ce,Y=0;if(O.last_lit!==0)for(;pe=O.pending_buf[O.d_buf+2*Y]<<8|O.pending_buf[O.d_buf+2*Y+1],ae=O.pending_buf[O.l_buf+Y],Y++,pe===0?te(O,ae,Z):(te(O,(we=k[ae])+N+1,Z),(Ce=B[we])!==0&&ee(O,ae-=J[we],Ce),te(O,we=P(--pe),ge),(Ce=V[we])!==0&&ee(O,pe-=Q[we],Ce)),Y<O.last_lit;);te(O,T,Z)}function Ae(O,Z){var ge,pe,ae,we=Z.dyn_tree,Ce=Z.stat_desc.static_tree,Y=Z.stat_desc.has_stree,ke=Z.stat_desc.elems,De=-1;for(O.heap_len=0,O.heap_max=x,ge=0;ge<ke;ge++)we[2*ge]!==0?(O.heap[++O.heap_len]=De=ge,O.depth[ge]=0):we[2*ge+1]=0;for(;O.heap_len<2;)we[2*(ae=O.heap[++O.heap_len]=De<2?++De:0)]=1,O.depth[ae]=0,O.opt_len--,Y&&(O.static_len-=Ce[2*ae+1]);for(Z.max_code=De,ge=O.heap_len>>1;1<=ge;ge--)Qe(O,we,ge);for(ae=ke;ge=O.heap[1],O.heap[1]=O.heap[O.heap_len--],Qe(O,we,1),pe=O.heap[1],O.heap[--O.heap_max]=ge,O.heap[--O.heap_max]=pe,we[2*ae]=we[2*ge]+we[2*pe],O.depth[ae]=(O.depth[ge]>=O.depth[pe]?O.depth[ge]:O.depth[pe])+1,we[2*ge+1]=we[2*pe+1]=ae,O.heap[1]=ae++,Qe(O,we,1),2<=O.heap_len;);O.heap[--O.heap_max]=O.heap[1],(function(Fe,mt){var nr,vt,Yr,at,Nr,Kr,kt=mt.dyn_tree,Fr=mt.max_code,Dr=mt.stat_desc.static_tree,Mr=mt.stat_desc.has_stree,pn=mt.stat_desc.extra_bits,pr=mt.stat_desc.extra_base,X=mt.stat_desc.max_length,Me=0;for(at=0;at<=g;at++)Fe.bl_count[at]=0;for(kt[2*Fe.heap[Fe.heap_max]+1]=0,nr=Fe.heap_max+1;nr<x;nr++)X<(at=kt[2*kt[2*(vt=Fe.heap[nr])+1]+1]+1)&&(at=X,Me++),kt[2*vt+1]=at,Fr<vt||(Fe.bl_count[at]++,Nr=0,pr<=vt&&(Nr=pn[vt-pr]),Kr=kt[2*vt],Fe.opt_len+=Kr*(at+Nr),Mr&&(Fe.static_len+=Kr*(Dr[2*vt+1]+Nr)));if(Me!==0){do{for(at=X-1;Fe.bl_count[at]===0;)at--;Fe.bl_count[at]--,Fe.bl_count[at+1]+=2,Fe.bl_count[X]--,Me-=2}while(0<Me);for(at=X;at!==0;at--)for(vt=Fe.bl_count[at];vt!==0;)Fr<(Yr=Fe.heap[--nr])||(kt[2*Yr+1]!==at&&(Fe.opt_len+=(at-kt[2*Yr+1])*kt[2*Yr],kt[2*Yr+1]=at),vt--)}})(O,Z),Te(we,De,O.bl_count)}function y(O,Z,ge){var pe,ae,we=-1,Ce=Z[1],Y=0,ke=7,De=4;for(Ce===0&&(ke=138,De=3),Z[2*(ge+1)+1]=65535,pe=0;pe<=ge;pe++)ae=Ce,Ce=Z[2*(pe+1)+1],++Y<ke&&ae===Ce||(Y<De?O.bl_tree[2*ae]+=Y:ae!==0?(ae!==we&&O.bl_tree[2*ae]++,O.bl_tree[2*E]++):Y<=10?O.bl_tree[2*A]++:O.bl_tree[2*D]++,we=ae,De=(Y=0)===Ce?(ke=138,3):ae===Ce?(ke=6,3):(ke=7,4))}function he(O,Z,ge){var pe,ae,we=-1,Ce=Z[1],Y=0,ke=7,De=4;for(Ce===0&&(ke=138,De=3),pe=0;pe<=ge;pe++)if(ae=Ce,Ce=Z[2*(pe+1)+1],!(++Y<ke&&ae===Ce)){if(Y<De)for(;te(O,ae,O.bl_tree),--Y!=0;);else ae!==0?(ae!==we&&(te(O,ae,O.bl_tree),Y--),te(O,E,O.bl_tree),ee(O,Y-3,2)):Y<=10?(te(O,A,O.bl_tree),ee(O,Y-3,3)):(te(O,D,O.bl_tree),ee(O,Y-11,7));we=ae,De=(Y=0)===Ce?(ke=138,3):ae===Ce?(ke=6,3):(ke=7,4)}}h(Q);var re=!1;function I(O,Z,ge,pe){ee(O,(b<<1)+(pe?1:0),3),(function(ae,we,Ce,Y){ze(ae),W(ae,Ce),W(ae,~Ce),d.arraySet(ae.pending_buf,ae.window,we,Ce,ae.pending),ae.pending+=Ce})(O,Z,ge)}l._tr_init=function(O){re||((function(){var Z,ge,pe,ae,we,Ce=new Array(g+1);for(ae=pe=0;ae<j-1;ae++)for(J[ae]=pe,Z=0;Z<1<<B[ae];Z++)k[pe++]=ae;for(k[pe-1]=ae,ae=we=0;ae<16;ae++)for(Q[ae]=we,Z=0;Z<1<<V[ae];Z++)H[we++]=ae;for(we>>=7;ae<_;ae++)for(Q[ae]=we<<7,Z=0;Z<1<<V[ae]-7;Z++)H[256+we++]=ae;for(ge=0;ge<=g;ge++)Ce[ge]=0;for(Z=0;Z<=143;)fe[2*Z+1]=8,Z++,Ce[8]++;for(;Z<=255;)fe[2*Z+1]=9,Z++,Ce[9]++;for(;Z<=279;)fe[2*Z+1]=7,Z++,Ce[7]++;for(;Z<=287;)fe[2*Z+1]=8,Z++,Ce[8]++;for(Te(fe,w+1,Ce),Z=0;Z<_;Z++)L[2*Z+1]=5,L[2*Z]=Ne(Z,5);ve=new ce(fe,B,N+1,w,g),se=new ce(L,V,0,_,g),oe=new ce(new Array(0),U,0,v,z)})(),re=!0),O.l_desc=new R(O.dyn_ltree,ve),O.d_desc=new R(O.dyn_dtree,se),O.bl_desc=new R(O.bl_tree,oe),O.bi_buf=0,O.bi_valid=0,_e(O)},l._tr_stored_block=I,l._tr_flush_block=function(O,Z,ge,pe){var ae,we,Ce=0;0<O.level?(O.strm.data_type===2&&(O.strm.data_type=(function(Y){var ke,De=4093624447;for(ke=0;ke<=31;ke++,De>>>=1)if(1&De&&Y.dyn_ltree[2*ke]!==0)return u;if(Y.dyn_ltree[18]!==0||Y.dyn_ltree[20]!==0||Y.dyn_ltree[26]!==0)return f;for(ke=32;ke<N;ke++)if(Y.dyn_ltree[2*ke]!==0)return f;return u})(O)),Ae(O,O.l_desc),Ae(O,O.d_desc),Ce=(function(Y){var ke;for(y(Y,Y.dyn_ltree,Y.l_desc.max_code),y(Y,Y.dyn_dtree,Y.d_desc.max_code),Ae(Y,Y.bl_desc),ke=v-1;3<=ke&&Y.bl_tree[2*G[ke]+1]===0;ke--);return Y.opt_len+=3*(ke+1)+5+5+4,ke})(O),ae=O.opt_len+3+7>>>3,(we=O.static_len+3+7>>>3)<=ae&&(ae=we)):ae=we=ge+5,ge+4<=ae&&Z!==-1?I(O,Z,ge,pe):O.strategy===4||we===ae?(ee(O,2+(pe?1:0),3),xe(O,fe,L)):(ee(O,4+(pe?1:0),3),(function(Y,ke,De,Fe){var mt;for(ee(Y,ke-257,5),ee(Y,De-1,5),ee(Y,Fe-4,4),mt=0;mt<Fe;mt++)ee(Y,Y.bl_tree[2*G[mt]+1],3);he(Y,Y.dyn_ltree,ke-1),he(Y,Y.dyn_dtree,De-1)})(O,O.l_desc.max_code+1,O.d_desc.max_code+1,Ce+1),xe(O,O.dyn_ltree,O.dyn_dtree)),_e(O),pe&&ze(O)},l._tr_tally=function(O,Z,ge){return O.pending_buf[O.d_buf+2*O.last_lit]=Z>>>8&255,O.pending_buf[O.d_buf+2*O.last_lit+1]=255&Z,O.pending_buf[O.l_buf+O.last_lit]=255&ge,O.last_lit++,Z===0?O.dyn_ltree[2*ge]++:(O.matches++,Z--,O.dyn_ltree[2*(k[ge]+N+1)]++,O.dyn_dtree[2*P(Z)]++),O.last_lit===O.lit_bufsize-1},l._tr_align=function(O){ee(O,2,3),te(O,T,fe),(function(Z){Z.bi_valid===16?(W(Z,Z.bi_buf),Z.bi_buf=0,Z.bi_valid=0):8<=Z.bi_valid&&(Z.pending_buf[Z.pending++]=255&Z.bi_buf,Z.bi_buf>>=8,Z.bi_valid-=8)})(O)}},{"../utils/common":41}],53:[function(n,o,l){o.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(n,o,l){(function(d){(function(u,f){if(!u.setImmediate){var h,b,j,N,w=1,_={},v=!1,x=u.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(u);g=g&&g.setTimeout?g:u,h={}.toString.call(u.process)==="[object process]"?function(E){process.nextTick(function(){z(E)})}:(function(){if(u.postMessage&&!u.importScripts){var E=!0,A=u.onmessage;return u.onmessage=function(){E=!1},u.postMessage("","*"),u.onmessage=A,E}})()?(N="setImmediate$"+Math.random()+"$",u.addEventListener?u.addEventListener("message",T,!1):u.attachEvent("onmessage",T),function(E){u.postMessage(N+E,"*")}):u.MessageChannel?((j=new MessageChannel).port1.onmessage=function(E){z(E.data)},function(E){j.port2.postMessage(E)}):x&&"onreadystatechange"in x.createElement("script")?(b=x.documentElement,function(E){var A=x.createElement("script");A.onreadystatechange=function(){z(E),A.onreadystatechange=null,b.removeChild(A),A=null},b.appendChild(A)}):function(E){setTimeout(z,0,E)},g.setImmediate=function(E){typeof E!="function"&&(E=new Function(""+E));for(var A=new Array(arguments.length-1),D=0;D<A.length;D++)A[D]=arguments[D+1];var B={callback:E,args:A};return _[w]=B,h(w),w++},g.clearImmediate=S}function S(E){delete _[E]}function z(E){if(v)setTimeout(z,0,E);else{var A=_[E];if(A){v=!0;try{(function(D){var B=D.callback,V=D.args;switch(V.length){case 0:B();break;case 1:B(V[0]);break;case 2:B(V[0],V[1]);break;case 3:B(V[0],V[1],V[2]);break;default:B.apply(f,V)}})(A)}finally{S(E),v=!1}}}}function T(E){E.source===u&&typeof E.data=="string"&&E.data.indexOf(N)===0&&z(+E.data.slice(N.length))}})(typeof self>"u"?d===void 0?this:d:self)}).call(this,typeof Ki<"u"?Ki:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(Cc)),Cc.exports}var cy=ly();const dy=Hc(cy);/*
 * @license
 * docx-preview <https://github.com/VolodymyrBaydalka/docxjs>
 * Released under Apache License 2.0  <https://github.com/VolodymyrBaydalka/docxjs/blob/master/LICENSE>
 * Copyright Volodymyr Baydalka
 */var wt;(function(s){s.OfficeDocument="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",s.FontTable="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable",s.Image="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",s.Numbering="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering",s.Styles="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",s.StylesWithEffects="http://schemas.microsoft.com/office/2007/relationships/stylesWithEffects",s.Theme="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",s.Settings="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings",s.WebSettings="http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings",s.Hyperlink="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",s.Footnotes="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes",s.Endnotes="http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes",s.Footer="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer",s.Header="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header",s.ExtendedProperties="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",s.CoreProperties="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",s.CustomProperties="http://schemas.openxmlformats.org/package/2006/relationships/metadata/custom-properties",s.Comments="http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",s.CommentsExtended="http://schemas.microsoft.com/office/2011/relationships/commentsExtended",s.AltChunk="http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk"})(wt||(wt={}));function uy(s,a){return a.elements(s).map(n=>({id:a.attr(n,"Id"),type:a.attr(n,"Type"),target:a.attr(n,"Target"),targetMode:a.attr(n,"TargetMode")}))}function py(s){return s==null?void 0:s.replace(/[ .]+/g,"-").replace(/[&]+/g,"and").toLowerCase()}function Vc(s){return/^[^"'].*\s.*[^"']$/.test(s)?`'${s}'`:s}function po(s){let a=s.lastIndexOf("/")+1,n=a==0?"":s.substring(0,a),o=a==0?s:s.substring(a);return[n,o]}function Ec(s,a){try{const n="http://docx/";return new URL(s,n+a).toString().substring(n.length)}catch{return`${a}${s}`}}function In(s,a){return s.reduce((n,o)=>(n[a(o)]=o,n),{})}function fy(s){return new Promise((a,n)=>{const o=new FileReader;o.onloadend=()=>a(o.result),o.onerror=()=>n(),o.readAsDataURL(s)})}function zc(s){return s&&typeof s=="object"&&!Array.isArray(s)}function hy(s){return typeof s=="string"||s instanceof String}function yo(s,...a){if(!a.length)return s;const n=a.shift();if(zc(s)&&zc(n))for(const o in n)if(zc(n[o])){const l=s[o]??(s[o]={});yo(l,n[o])}else s[o]=n[o];return yo(s,...a)}function Ss(s){return Array.isArray(s)?s:[s]}function my(s,a,n){return a>s?a:n<s?n:s}const Hh={wordml:"http://schemas.openxmlformats.org/wordprocessingml/2006/main"},St={Dxa:{mul:.05,unit:"pt"},Emu:{mul:1/12700,unit:"pt"},FontSize:{mul:.5,unit:"pt"},Border:{mul:.125,unit:"pt",min:.25,max:12},Point:{mul:1,unit:"pt"},Percent:{mul:.02,unit:"%"}};function qh(s,a=St.Dxa){if(s==null||/.+(p[xt]|[%])$/.test(s))return s;var n=parseInt(s)*a.mul;return a.min&&a.max&&(n=my(n,a.min,a.max)),`${n.toFixed(2)}${a.unit}`}function gy(s,a=!1){switch(s){case"1":return!0;case"0":return!1;case"on":return!0;case"off":return!1;case"true":return!0;case"false":return!1;default:return a}}function Gh(s,a,n){if(s.namespaceURI!=Hh.wordml)return!1;switch(s.localName){case"color":a.color=n.attr(s,"val");break;case"sz":a.fontSize=n.lengthAttr(s,"val",St.FontSize);break;default:return!1}return!0}function xy(s,a=!1){a&&(s=s.replace(/<[?].*[?]>/,"")),s=by(s);const n=new DOMParser().parseFromString(s,"application/xml"),o=vy(n);if(o)throw new Error(o);return n}function vy(s){var a;return(a=s.getElementsByTagName("parsererror")[0])==null?void 0:a.textContent}function by(s){return s.charCodeAt(0)===65279?s.substring(1):s}function yy(s){return new XMLSerializer().serializeToString(s)}class Yh{elements(a,n=null){const o=[];for(let l=0,d=a.childNodes.length;l<d;l++){let u=a.childNodes.item(l);u.nodeType==Node.ELEMENT_NODE&&(n==null||u.localName==n)&&o.push(u)}return o}element(a,n){for(let o=0,l=a.childNodes.length;o<l;o++){let d=a.childNodes.item(o);if(d.nodeType==1&&d.localName==n)return d}return null}elementAttr(a,n,o){var l=this.element(a,n);return l?this.attr(l,o):void 0}attrs(a){return Array.from(a.attributes)}attr(a,n){for(let o=0,l=a.attributes.length;o<l;o++){let d=a.attributes.item(o);if(d.localName==n)return d.value}return null}intAttr(a,n,o=null){var l=this.attr(a,n);return l?parseInt(l):o}hexAttr(a,n,o=null){var l=this.attr(a,n);return l?parseInt(l,16):o}floatAttr(a,n,o=null){var l=this.attr(a,n);return l?parseFloat(l):o}boolAttr(a,n,o=null){return gy(this.attr(a,n),o)}lengthAttr(a,n,o=St.Dxa){return qh(this.attr(a,n),o)}}const q=new Yh;class ur{constructor(a,n){this._package=a,this.path=n}async load(){this.rels=await this._package.loadRelationships(this.path);const a=await this._package.load(this.path),n=this._package.parseXmlDocument(a);this._package.options.keepOrigin&&(this._xmlDocument=n),this.parseXml(n.firstElementChild)}save(){this._package.update(this.path,yy(this._xmlDocument))}parseXml(a){}}const jy={embedRegular:"regular",embedBold:"bold",embedItalic:"italic",embedBoldItalic:"boldItalic"};function wy(s,a){return a.elements(s).map(n=>ky(n,a))}function ky(s,a){let n={name:a.attr(s,"name"),embedFontRefs:[]};for(let o of a.elements(s))switch(o.localName){case"family":n.family=a.attr(o,"val");break;case"altName":n.altName=a.attr(o,"val");break;case"embedRegular":case"embedBold":case"embedItalic":case"embedBoldItalic":n.embedFontRefs.push(Ny(o,a));break}return n}function Ny(s,a){return{id:a.attr(s,"id"),key:a.attr(s,"fontKey"),type:jy[s.localName]}}class Sy extends ur{parseXml(a){this.fonts=wy(a,this._package.xmlParser)}}class id{constructor(a,n){this._zip=a,this.options=n,this.xmlParser=new Yh}get(a){const n=_y(a);return this._zip.files[n]??this._zip.files[n.replace(/\//g,"\\")]}update(a,n){this._zip.file(a,n)}static async load(a,n){const o=await dy.loadAsync(a);return new id(o,n)}save(a="blob"){return this._zip.generateAsync({type:a})}load(a,n="string"){var o;return((o=this.get(a))==null?void 0:o.async(n))??Promise.resolve(null)}async loadRelationships(a=null){let n="_rels/.rels";if(a!=null){const[l,d]=po(a);n=`${l}_rels/${d}.rels`}const o=await this.load(n);return o?uy(this.parseXmlDocument(o).firstElementChild,this.xmlParser):null}parseXmlDocument(a){return xy(a,this.options.trimXmlDeclaration)}}function _y(s){return s.startsWith("/")?s.substr(1):s}class Cy extends ur{constructor(a,n,o){super(a,n),this._documentParser=o}parseXml(a){this.body=this._documentParser.parseDocumentFile(a)}}function no(s,a){return{type:a.attr(s,"val"),color:a.attr(s,"color"),size:a.lengthAttr(s,"sz",St.Border),offset:a.lengthAttr(s,"space",St.Point),frame:a.boolAttr(s,"frame"),shadow:a.boolAttr(s,"shadow")}}function Ey(s,a){var n={};for(let o of a.elements(s))switch(o.localName){case"left":n.left=no(o,a);break;case"top":n.top=no(o,a);break;case"right":n.right=no(o,a);break;case"bottom":n.bottom=no(o,a);break}return n}var Af;(function(s){s.Continuous="continuous",s.NextPage="nextPage",s.NextColumn="nextColumn",s.EvenPage="evenPage",s.OddPage="oddPage"})(Af||(Af={}));function Kh(s,a=q){var n={};for(let o of a.elements(s))switch(o.localName){case"pgSz":n.pageSize={width:a.lengthAttr(o,"w"),height:a.lengthAttr(o,"h"),orientation:a.attr(o,"orient")};break;case"type":n.type=a.attr(o,"val");break;case"pgMar":n.pageMargins={left:a.lengthAttr(o,"left"),right:a.lengthAttr(o,"right"),top:a.lengthAttr(o,"top"),bottom:a.lengthAttr(o,"bottom"),header:a.lengthAttr(o,"header"),footer:a.lengthAttr(o,"footer"),gutter:a.lengthAttr(o,"gutter")};break;case"cols":n.columns=zy(o,a);break;case"headerReference":(n.headerRefs??(n.headerRefs=[])).push(Lf(o,a));break;case"footerReference":(n.footerRefs??(n.footerRefs=[])).push(Lf(o,a));break;case"titlePg":n.titlePage=a.boolAttr(o,"val",!0);break;case"pgBorders":n.pageBorders=Ey(o,a);break;case"pgNumType":n.pageNumber=Py(o,a);break}return n}function zy(s,a){return{numberOfColumns:a.intAttr(s,"num"),space:a.lengthAttr(s,"space"),separator:a.boolAttr(s,"sep"),equalWidth:a.boolAttr(s,"equalWidth",!0),columns:a.elements(s,"col").map(n=>({width:a.lengthAttr(n,"w"),space:a.lengthAttr(n,"space")}))}}function Py(s,a){return{chapSep:a.attr(s,"chapSep"),chapStyle:a.attr(s,"chapStyle"),format:a.attr(s,"fmt"),start:a.intAttr(s,"start")}}function Lf(s,a){return{id:a.attr(s,"id"),type:a.attr(s,"type")}}function Ry(s,a){return{before:a.lengthAttr(s,"before"),after:a.lengthAttr(s,"after"),line:a.intAttr(s,"line"),lineRule:a.attr(s,"lineRule")}}function od(s,a){let n={};for(let o of a.elements(s))Ty(o,n,a);return n}function Ty(s,a,n){return!!Gh(s,a,n)}function Xh(s,a){let n={};for(let o of a.elements(s))Zh(o,n,a);return n}function Zh(s,a,n){if(s.namespaceURI!=Hh.wordml)return!1;if(Gh(s,a,n))return!0;switch(s.localName){case"tabs":a.tabs=Ay(s,n);break;case"sectPr":a.sectionProps=Kh(s,n);break;case"numPr":a.numbering=Ly(s,n);break;case"spacing":return a.lineSpacing=Ry(s,n),!1;case"textAlignment":return a.textAlignment=n.attr(s,"val"),!1;case"keepLines":a.keepLines=n.boolAttr(s,"val",!0);break;case"keepNext":a.keepNext=n.boolAttr(s,"val",!0);break;case"pageBreakBefore":a.pageBreakBefore=n.boolAttr(s,"val",!0);break;case"outlineLvl":a.outlineLevel=n.intAttr(s,"val");break;case"pStyle":a.styleName=n.attr(s,"val");break;case"rPr":a.runProps=od(s,n);break;default:return!1}return!0}function Ay(s,a){return a.elements(s,"tab").map(n=>({position:a.lengthAttr(n,"pos"),leader:a.attr(n,"leader"),style:a.attr(n,"val")}))}function Ly(s,a){var n={};for(let o of a.elements(s))switch(o.localName){case"numId":n.id=a.attr(o,"val");break;case"ilvl":n.level=a.intAttr(o,"val");break}return n}function Iy(s,a){let n={numberings:[],abstractNumberings:[],bulletPictures:[]};for(let o of a.elements(s))switch(o.localName){case"num":n.numberings.push(Oy(o,a));break;case"abstractNum":n.abstractNumberings.push(Fy(o,a));break;case"numPicBullet":n.bulletPictures.push(My(o,a));break}return n}function Oy(s,a){let n={id:a.attr(s,"numId"),overrides:[]};for(let o of a.elements(s))switch(o.localName){case"abstractNumId":n.abstractId=a.attr(o,"val");break;case"lvlOverride":n.overrides.push(Dy(o,a));break}return n}function Fy(s,a){let n={id:a.attr(s,"abstractNumId"),levels:[]};for(let o of a.elements(s))switch(o.localName){case"name":n.name=a.attr(o,"val");break;case"multiLevelType":n.multiLevelType=a.attr(o,"val");break;case"numStyleLink":n.numberingStyleLink=a.attr(o,"val");break;case"styleLink":n.styleLink=a.attr(o,"val");break;case"lvl":n.levels.push(Qh(o,a));break}return n}function Qh(s,a){let n={level:a.intAttr(s,"ilvl")};for(let o of a.elements(s))switch(o.localName){case"start":n.start=a.attr(o,"val");break;case"lvlRestart":n.restart=a.intAttr(o,"val");break;case"numFmt":n.format=a.attr(o,"val");break;case"lvlText":n.text=a.attr(o,"val");break;case"lvlJc":n.justification=a.attr(o,"val");break;case"lvlPicBulletId":n.bulletPictureId=a.attr(o,"val");break;case"pStyle":n.paragraphStyle=a.attr(o,"val");break;case"pPr":n.paragraphProps=Xh(o,a);break;case"rPr":n.runProps=od(o,a);break}return n}function Dy(s,a){let n={level:a.intAttr(s,"ilvl")};for(let o of a.elements(s))switch(o.localName){case"startOverride":n.start=a.intAttr(o,"val");break;case"lvl":n.numberingLevel=Qh(o,a);break}return n}function My(s,a){var n=a.element(s,"pict"),o=n&&a.element(n,"shape"),l=o&&a.element(o,"imagedata");return l?{id:a.attr(s,"numPicBulletId"),referenceId:a.attr(l,"id"),style:a.attr(o,"style")}:null}class By extends ur{constructor(a,n,o){super(a,n),this._documentParser=o}parseXml(a){Object.assign(this,Iy(a,this._package.xmlParser)),this.domNumberings=this._documentParser.parseNumberingFile(a)}}class Wy extends ur{constructor(a,n,o){super(a,n),this._documentParser=o}parseXml(a){this.styles=this._documentParser.parseStylesFile(a)}}var ue;(function(s){s.Document="document",s.Paragraph="paragraph",s.Run="run",s.Break="break",s.NoBreakHyphen="noBreakHyphen",s.Table="table",s.Row="row",s.Cell="cell",s.Hyperlink="hyperlink",s.SmartTag="smartTag",s.Drawing="drawing",s.Image="image",s.Text="text",s.Tab="tab",s.Symbol="symbol",s.BookmarkStart="bookmarkStart",s.BookmarkEnd="bookmarkEnd",s.Footer="footer",s.Header="header",s.FootnoteReference="footnoteReference",s.EndnoteReference="endnoteReference",s.Footnote="footnote",s.Endnote="endnote",s.SimpleField="simpleField",s.ComplexField="complexField",s.Instruction="instruction",s.VmlPicture="vmlPicture",s.MmlMath="mmlMath",s.MmlMathParagraph="mmlMathParagraph",s.MmlFraction="mmlFraction",s.MmlFunction="mmlFunction",s.MmlFunctionName="mmlFunctionName",s.MmlNumerator="mmlNumerator",s.MmlDenominator="mmlDenominator",s.MmlRadical="mmlRadical",s.MmlBase="mmlBase",s.MmlDegree="mmlDegree",s.MmlSuperscript="mmlSuperscript",s.MmlSubscript="mmlSubscript",s.MmlPreSubSuper="mmlPreSubSuper",s.MmlSubArgument="mmlSubArgument",s.MmlSuperArgument="mmlSuperArgument",s.MmlNary="mmlNary",s.MmlDelimiter="mmlDelimiter",s.MmlRun="mmlRun",s.MmlEquationArray="mmlEquationArray",s.MmlLimit="mmlLimit",s.MmlLimitLower="mmlLimitLower",s.MmlMatrix="mmlMatrix",s.MmlMatrixRow="mmlMatrixRow",s.MmlBox="mmlBox",s.MmlBar="mmlBar",s.MmlGroupChar="mmlGroupChar",s.VmlElement="vmlElement",s.Inserted="inserted",s.Deleted="deleted",s.DeletedText="deletedText",s.Comment="comment",s.CommentReference="commentReference",s.CommentRangeStart="commentRangeStart",s.CommentRangeEnd="commentRangeEnd",s.AltChunk="altChunk"})(ue||(ue={}));class sa{constructor(){this.children=[],this.cssStyle={}}}class Uy extends sa{constructor(){super(...arguments),this.type=ue.Header}}class $y extends sa{constructor(){super(...arguments),this.type=ue.Footer}}class Jh extends ur{constructor(a,n,o){super(a,n),this._documentParser=o}parseXml(a){this.rootElement=this.createRootElement(),this.rootElement.children=this._documentParser.parseBodyElements(a)}}class Vy extends Jh{createRootElement(){return new Uy}}class Hy extends Jh{createRootElement(){return new $y}}function qy(s,a){const n={};for(let o of a.elements(s))switch(o.localName){case"Template":n.template=o.textContent;break;case"Pages":n.pages=_s(o.textContent);break;case"Words":n.words=_s(o.textContent);break;case"Characters":n.characters=_s(o.textContent);break;case"Application":n.application=o.textContent;break;case"Lines":n.lines=_s(o.textContent);break;case"Paragraphs":n.paragraphs=_s(o.textContent);break;case"Company":n.company=o.textContent;break;case"AppVersion":n.appVersion=o.textContent;break}return n}function _s(s){if(!(typeof s>"u"))return parseInt(s)}class Gy extends ur{parseXml(a){this.props=qy(a,this._package.xmlParser)}}function Yy(s,a){const n={};for(let o of a.elements(s))switch(o.localName){case"title":n.title=o.textContent;break;case"description":n.description=o.textContent;break;case"subject":n.subject=o.textContent;break;case"creator":n.creator=o.textContent;break;case"keywords":n.keywords=o.textContent;break;case"language":n.language=o.textContent;break;case"lastModifiedBy":n.lastModifiedBy=o.textContent;break;case"revision":o.textContent&&(n.revision=parseInt(o.textContent));break}return n}class Ky extends ur{parseXml(a){this.props=Yy(a,this._package.xmlParser)}}class Xy{}function Zy(s,a){var n=new Xy,o=a.element(s,"themeElements");for(let l of a.elements(o))switch(l.localName){case"clrScheme":n.colorScheme=Qy(l,a);break;case"fontScheme":n.fontScheme=Jy(l,a);break}return n}function Qy(s,a){var n={name:a.attr(s,"name"),colors:{}};for(let d of a.elements(s)){var o=a.element(d,"srgbClr"),l=a.element(d,"sysClr");o?n.colors[d.localName]=a.attr(o,"val"):l&&(n.colors[d.localName]=a.attr(l,"lastClr"))}return n}function Jy(s,a){var n={name:a.attr(s,"name")};for(let o of a.elements(s))switch(o.localName){case"majorFont":n.majorFont=If(o,a);break;case"minorFont":n.minorFont=If(o,a);break}return n}function If(s,a){return{latinTypeface:a.elementAttr(s,"latin","typeface"),eaTypeface:a.elementAttr(s,"ea","typeface"),csTypeface:a.elementAttr(s,"cs","typeface")}}class e1 extends ur{constructor(a,n){super(a,n)}parseXml(a){this.theme=Zy(a,this._package.xmlParser)}}class em{}class t1 extends em{constructor(){super(...arguments),this.type=ue.Footnote}}class r1 extends em{constructor(){super(...arguments),this.type=ue.Endnote}}class tm extends ur{constructor(a,n,o){super(a,n),this._documentParser=o}}class n1 extends tm{constructor(a,n,o){super(a,n,o)}parseXml(a){this.notes=this._documentParser.parseNotes(a,"footnote",t1)}}class a1 extends tm{constructor(a,n,o){super(a,n,o)}parseXml(a){this.notes=this._documentParser.parseNotes(a,"endnote",r1)}}function s1(s,a){var n={};for(let o of a.elements(s))switch(o.localName){case"defaultTabStop":n.defaultTabStop=a.lengthAttr(o,"val");break;case"footnotePr":n.footnoteProps=Of(o,a);break;case"endnotePr":n.endnoteProps=Of(o,a);break;case"autoHyphenation":n.autoHyphenation=a.boolAttr(o,"val");break}return n}function Of(s,a){var n={defaultNoteIds:[]};for(let o of a.elements(s))switch(o.localName){case"numFmt":n.nummeringFormat=a.attr(o,"val");break;case"footnote":case"endnote":n.defaultNoteIds.push(a.attr(o,"id"));break}return n}class i1 extends ur{constructor(a,n){super(a,n)}parseXml(a){this.settings=s1(a,this._package.xmlParser)}}function o1(s,a){return a.elements(s,"property").map(n=>{const o=n.firstChild;return{formatId:a.attr(n,"fmtid"),name:a.attr(n,"name"),type:o.nodeName,value:o.textContent}})}class l1 extends ur{parseXml(a){this.props=o1(a,this._package.xmlParser)}}class c1 extends ur{constructor(a,n,o){super(a,n),this._documentParser=o}parseXml(a){this.comments=this._documentParser.parseComments(a),this.commentMap=In(this.comments,n=>n.id)}}class d1 extends ur{constructor(a,n){super(a,n),this.comments=[]}parseXml(a){const n=this._package.xmlParser;for(let o of n.elements(a,"commentEx"))this.comments.push({paraId:n.attr(o,"paraId"),paraIdParent:n.attr(o,"paraIdParent"),done:n.boolAttr(o,"done")});this.commentMap=In(this.comments,o=>o.paraId)}}const u1=[{type:wt.OfficeDocument,target:"word/document.xml"},{type:wt.ExtendedProperties,target:"docProps/app.xml"},{type:wt.CoreProperties,target:"docProps/core.xml"},{type:wt.CustomProperties,target:"docProps/custom.xml"}];class ld{constructor(){this.parts=[],this.partsMap={}}static async load(a,n,o){var l=new ld;return l._options=o,l._parser=n,l._package=await id.load(a,o),l.rels=await l._package.loadRelationships(),await Promise.all(u1.map(d=>{const u=l.rels.find(f=>f.type===d.type)??d;return l.loadRelationshipPart(u.target,u.type)})),l}save(a="blob"){return this._package.save(a)}async loadRelationshipPart(a,n){var l;if(this.partsMap[a])return this.partsMap[a];if(!this._package.get(a))return null;let o=null;switch(n){case wt.OfficeDocument:this.documentPart=o=new Cy(this._package,a,this._parser);break;case wt.FontTable:this.fontTablePart=o=new Sy(this._package,a);break;case wt.Numbering:this.numberingPart=o=new By(this._package,a,this._parser);break;case wt.Styles:this.stylesPart=o=new Wy(this._package,a,this._parser);break;case wt.Theme:this.themePart=o=new e1(this._package,a);break;case wt.Footnotes:this.footnotesPart=o=new n1(this._package,a,this._parser);break;case wt.Endnotes:this.endnotesPart=o=new a1(this._package,a,this._parser);break;case wt.Footer:o=new Hy(this._package,a,this._parser);break;case wt.Header:o=new Vy(this._package,a,this._parser);break;case wt.CoreProperties:this.corePropsPart=o=new Ky(this._package,a);break;case wt.ExtendedProperties:this.extendedPropsPart=o=new Gy(this._package,a);break;case wt.CustomProperties:o=new l1(this._package,a);break;case wt.Settings:this.settingsPart=o=new i1(this._package,a);break;case wt.Comments:this.commentsPart=o=new c1(this._package,a,this._parser);break;case wt.CommentsExtended:this.commentsExtendedPart=o=new d1(this._package,a);break}if(o==null)return Promise.resolve(null);if(this.partsMap[a]=o,this.parts.push(o),await o.load(),((l=o.rels)==null?void 0:l.length)>0){const[d]=po(o.path);await Promise.all(o.rels.map(u=>this.loadRelationshipPart(Ec(u.target,d),u.type)))}return o}async loadDocumentImage(a,n){const o=await this.loadResource(n??this.documentPart,a,"blob");return this.blobToURL(o)}async loadNumberingImage(a){const n=await this.loadResource(this.numberingPart,a,"blob");return this.blobToURL(n)}async loadFont(a,n){const o=await this.loadResource(this.fontTablePart,a,"uint8array");return o&&this.blobToURL(new Blob([p1(o,n)]))}async loadAltChunk(a,n){return await this.loadResource(n??this.documentPart,a,"string")}blobToURL(a){return a?this._options.useBase64URL?fy(a):URL.createObjectURL(a):null}findPartByRelId(a,n=null){var o=(n.rels??this.rels).find(d=>d.id==a);const l=n?po(n.path)[0]:"";return o?this.partsMap[Ec(o.target,l)]:null}getPathById(a,n){const o=a.rels.find(d=>d.id==n),[l]=po(a.path);return o?Ec(o.target,l):null}loadResource(a,n,o){const l=this.getPathById(a,n);return l?this._package.load(l,o):Promise.resolve(null)}}function p1(s,a){const o=a.replace(/{|}|-/g,""),l=new Array(16);for(let d=0;d<16;d++)l[16-d-1]=parseInt(o.substring(d*2,d*2+2),16);for(let d=0;d<32;d++)s[d]=s[d]^l[d%16];return s}function f1(s,a){return{type:ue.BookmarkStart,id:a.attr(s,"id"),name:a.attr(s,"name"),colFirst:a.intAttr(s,"colFirst"),colLast:a.intAttr(s,"colLast")}}function h1(s,a){return{type:ue.BookmarkEnd,id:a.attr(s,"id")}}class m1 extends sa{constructor(){super(...arguments),this.type=ue.VmlElement,this.attrs={}}}function rm(s,a){var n=new m1;switch(s.localName){case"rect":n.tagName="rect",Object.assign(n.attrs,{width:"100%",height:"100%"});break;case"oval":n.tagName="ellipse",Object.assign(n.attrs,{cx:"50%",cy:"50%",rx:"50%",ry:"50%"});break;case"line":n.tagName="line";break;case"shape":n.tagName="g";break;case"textbox":n.tagName="foreignObject",Object.assign(n.attrs,{width:"100%",height:"100%"});break;default:return null}for(const o of q.attrs(s))switch(o.localName){case"style":n.cssStyleText=o.value;break;case"fillcolor":n.attrs.fill=o.value;break;case"from":const[l,d]=Ff(o.value);Object.assign(n.attrs,{x1:l,y1:d});break;case"to":const[u,f]=Ff(o.value);Object.assign(n.attrs,{x2:u,y2:f});break}for(const o of q.elements(s))switch(o.localName){case"stroke":Object.assign(n.attrs,g1(o));break;case"fill":Object.assign(n.attrs,x1());break;case"imagedata":n.tagName="image",Object.assign(n.attrs,{width:"100%",height:"100%"}),n.imageHref={id:q.attr(o,"id"),title:q.attr(o,"title")};break;case"txbxContent":n.children.push(...a.parseBodyElements(o));break;default:const l=rm(o,a);l&&n.children.push(l);break}return n}function g1(s){return{stroke:q.attr(s,"color"),"stroke-width":q.lengthAttr(s,"weight",St.Emu)??"1px"}}function x1(s){return{}}function Ff(s){return s.split(",")}class v1 extends sa{constructor(){super(...arguments),this.type=ue.Comment}}class b1 extends sa{constructor(a){super(),this.id=a,this.type=ue.CommentReference}}class y1 extends sa{constructor(a){super(),this.id=a,this.type=ue.CommentRangeStart}}class j1 extends sa{constructor(a){super(),this.id=a,this.type=ue.CommentRangeEnd}}var fo={shd:"inherit",color:"black",borderColor:"black",highlight:"transparent"};const w1=[],Df={oMath:ue.MmlMath,oMathPara:ue.MmlMathParagraph,f:ue.MmlFraction,func:ue.MmlFunction,fName:ue.MmlFunctionName,num:ue.MmlNumerator,den:ue.MmlDenominator,rad:ue.MmlRadical,deg:ue.MmlDegree,e:ue.MmlBase,sSup:ue.MmlSuperscript,sSub:ue.MmlSubscript,sPre:ue.MmlPreSubSuper,sup:ue.MmlSuperArgument,sub:ue.MmlSubArgument,d:ue.MmlDelimiter,nary:ue.MmlNary,eqArr:ue.MmlEquationArray,lim:ue.MmlLimit,limLow:ue.MmlLimitLower,m:ue.MmlMatrix,mr:ue.MmlMatrixRow,box:ue.MmlBox,bar:ue.MmlBar,groupChr:ue.MmlGroupChar};class k1{constructor(a){this.options={ignoreWidth:!1,debug:!1,...a}}parseNotes(a,n,o){var l=[];for(let d of q.elements(a,n)){const u=new o;u.id=q.attr(d,"id"),u.noteType=q.attr(d,"type"),u.children=this.parseBodyElements(d),l.push(u)}return l}parseComments(a){var n=[];for(let o of q.elements(a,"comment")){const l=new v1;l.id=q.attr(o,"id"),l.author=q.attr(o,"author"),l.initials=q.attr(o,"initials"),l.date=q.attr(o,"date"),l.children=this.parseBodyElements(o),n.push(l)}return n}parseDocumentFile(a){var n=q.element(a,"body"),o=q.element(a,"background"),l=q.element(n,"sectPr");return{type:ue.Document,children:this.parseBodyElements(n),props:l?Kh(l,q):{},cssStyle:o?this.parseBackground(o):{}}}parseBackground(a){var n={},o=Ta.colorAttr(a,"color");return o&&(n["background-color"]=o),n}parseBodyElements(a){var n=[];for(const o of q.elements(a))switch(o.localName){case"p":n.push(this.parseParagraph(o));break;case"altChunk":n.push(this.parseAltChunk(o));break;case"tbl":n.push(this.parseTable(o));break;case"sdt":n.push(...this.parseSdt(o,l=>this.parseBodyElements(l)));break}return n}parseStylesFile(a){var n=[];for(const o of q.elements(a))switch(o.localName){case"style":n.push(this.parseStyle(o));break;case"docDefaults":n.push(this.parseDefaultStyles(o));break}return n}parseDefaultStyles(a){var n={id:null,name:null,target:null,basedOn:null,styles:[]};for(const d of q.elements(a))switch(d.localName){case"rPrDefault":var o=q.element(d,"rPr");o&&n.styles.push({target:"span",values:this.parseDefaultProperties(o,{})});break;case"pPrDefault":var l=q.element(d,"pPr");l&&n.styles.push({target:"p",values:this.parseDefaultProperties(l,{})});break}return n}parseStyle(a){var n={id:q.attr(a,"styleId"),isDefault:q.boolAttr(a,"default"),name:null,target:null,basedOn:null,styles:[],linked:null};switch(q.attr(a,"type")){case"paragraph":n.target="p";break;case"table":n.target="table";break;case"character":n.target="span";break}for(const o of q.elements(a))switch(o.localName){case"basedOn":n.basedOn=q.attr(o,"val");break;case"name":n.name=q.attr(o,"val");break;case"link":n.linked=q.attr(o,"val");break;case"next":n.next=q.attr(o,"val");break;case"aliases":n.aliases=q.attr(o,"val").split(",");break;case"pPr":n.styles.push({target:"p",values:this.parseDefaultProperties(o,{})}),n.paragraphProps=Xh(o,q);break;case"rPr":n.styles.push({target:"span",values:this.parseDefaultProperties(o,{})}),n.runProps=od(o,q);break;case"tblPr":case"tcPr":n.styles.push({target:"td",values:this.parseDefaultProperties(o,{})});break;case"tblStylePr":for(let l of this.parseTableStyle(o))n.styles.push(l);break;case"rsid":case"qFormat":case"hidden":case"semiHidden":case"unhideWhenUsed":case"autoRedefine":case"uiPriority":break;default:this.options.debug&&console.warn(`DOCX: Unknown style element: ${o.localName}`)}return n}parseTableStyle(a){var n=[],o=q.attr(a,"type"),l="",d="";switch(o){case"firstRow":d=".first-row",l="tr.first-row td";break;case"lastRow":d=".last-row",l="tr.last-row td";break;case"firstCol":d=".first-col",l="td.first-col";break;case"lastCol":d=".last-col",l="td.last-col";break;case"band1Vert":d=":not(.no-vband)",l="td.odd-col";break;case"band2Vert":d=":not(.no-vband)",l="td.even-col";break;case"band1Horz":d=":not(.no-hband)",l="tr.odd-row";break;case"band2Horz":d=":not(.no-hband)",l="tr.even-row";break;default:return[]}for(const u of q.elements(a))switch(u.localName){case"pPr":n.push({target:`${l} p`,mod:d,values:this.parseDefaultProperties(u,{})});break;case"rPr":n.push({target:`${l} span`,mod:d,values:this.parseDefaultProperties(u,{})});break;case"tblPr":case"tcPr":n.push({target:l,mod:d,values:this.parseDefaultProperties(u,{})});break}return n}parseNumberingFile(a){var n=[],o={},l=[];for(const f of q.elements(a))switch(f.localName){case"abstractNum":this.parseAbstractNumbering(f,l).forEach(h=>n.push(h));break;case"numPicBullet":l.push(this.parseNumberingPicBullet(f));break;case"num":var d=q.attr(f,"numId"),u=q.elementAttr(f,"abstractNumId","val");o[u]=d;break}return n.forEach(f=>f.id=o[f.id]),n}parseNumberingPicBullet(a){var n=q.element(a,"pict"),o=n&&q.element(n,"shape"),l=o&&q.element(o,"imagedata");return l?{id:q.intAttr(a,"numPicBulletId"),src:q.attr(l,"id"),style:q.attr(o,"style")}:null}parseAbstractNumbering(a,n){var o=[],l=q.attr(a,"abstractNumId");for(const d of q.elements(a))switch(d.localName){case"lvl":o.push(this.parseNumberingLevel(l,d,n));break}return o}parseNumberingLevel(a,n,o){var l={id:a,level:q.intAttr(n,"ilvl"),start:1,pStyleName:void 0,pStyle:{},rStyle:{},suff:"tab"};for(const u of q.elements(n))switch(u.localName){case"start":l.start=q.intAttr(u,"val");break;case"pPr":this.parseDefaultProperties(u,l.pStyle);break;case"rPr":this.parseDefaultProperties(u,l.rStyle);break;case"lvlPicBulletId":var d=q.intAttr(u,"val");l.bullet=o.find(f=>(f==null?void 0:f.id)==d);break;case"lvlText":l.levelText=q.attr(u,"val");break;case"pStyle":l.pStyleName=q.attr(u,"val");break;case"numFmt":l.format=q.attr(u,"val");break;case"suff":l.suff=q.attr(u,"val");break}return l}parseSdt(a,n){const o=q.element(a,"sdtContent");return o?n(o):[]}parseInserted(a,n){var o;return{type:ue.Inserted,children:((o=n(a))==null?void 0:o.children)??[]}}parseDeleted(a,n){var o;return{type:ue.Deleted,children:((o=n(a))==null?void 0:o.children)??[]}}parseAltChunk(a){return{type:ue.AltChunk,children:[],id:q.attr(a,"id")}}parseParagraph(a){var n={type:ue.Paragraph,children:[]};for(let o of q.elements(a))switch(o.localName){case"pPr":this.parseParagraphProperties(o,n);break;case"r":n.children.push(this.parseRun(o,n));break;case"hyperlink":n.children.push(this.parseHyperlink(o,n));break;case"smartTag":n.children.push(this.parseSmartTag(o,n));break;case"bookmarkStart":n.children.push(f1(o,q));break;case"bookmarkEnd":n.children.push(h1(o,q));break;case"commentRangeStart":n.children.push(new y1(q.attr(o,"id")));break;case"commentRangeEnd":n.children.push(new j1(q.attr(o,"id")));break;case"oMath":case"oMathPara":n.children.push(this.parseMathElement(o));break;case"sdt":n.children.push(...this.parseSdt(o,l=>this.parseParagraph(l).children));break;case"ins":n.children.push(this.parseInserted(o,l=>this.parseParagraph(l)));break;case"del":n.children.push(this.parseDeleted(o,l=>this.parseParagraph(l)));break}return n}parseParagraphProperties(a,n){this.parseDefaultProperties(a,n.cssStyle={},null,o=>{if(Zh(o,n,q))return!0;switch(o.localName){case"pStyle":n.styleName=q.attr(o,"val");break;case"cnfStyle":n.className=nt.classNameOfCnfStyle(o);break;case"framePr":this.parseFrame(o,n);break;case"rPr":break;default:return!1}return!0})}parseFrame(a,n){var o=q.attr(a,"dropCap");o=="drop"&&(n.cssStyle.float="left")}parseHyperlink(a,n){var o={type:ue.Hyperlink,parent:n,children:[]};o.anchor=q.attr(a,"anchor"),o.id=q.attr(a,"id");for(const l of q.elements(a))switch(l.localName){case"r":o.children.push(this.parseRun(l,o));break}return o}parseSmartTag(a,n){var o={type:ue.SmartTag,parent:n,children:[]},l=q.attr(a,"uri"),d=q.attr(a,"element");l&&(o.uri=l),d&&(o.element=d);for(const u of q.elements(a))switch(u.localName){case"r":o.children.push(this.parseRun(u,o));break}return o}parseRun(a,n){var o={type:ue.Run,parent:n,children:[]};for(let l of q.elements(a))switch(l=this.checkAlternateContent(l),l.localName){case"t":o.children.push({type:ue.Text,text:l.textContent});break;case"delText":o.children.push({type:ue.DeletedText,text:l.textContent});break;case"commentReference":o.children.push(new b1(q.attr(l,"id")));break;case"fldSimple":o.children.push({type:ue.SimpleField,instruction:q.attr(l,"instr"),lock:q.boolAttr(l,"lock",!1),dirty:q.boolAttr(l,"dirty",!1)});break;case"instrText":o.fieldRun=!0,o.children.push({type:ue.Instruction,text:l.textContent});break;case"fldChar":o.fieldRun=!0,o.children.push({type:ue.ComplexField,charType:q.attr(l,"fldCharType"),lock:q.boolAttr(l,"lock",!1),dirty:q.boolAttr(l,"dirty",!1)});break;case"noBreakHyphen":o.children.push({type:ue.NoBreakHyphen});break;case"br":o.children.push({type:ue.Break,break:q.attr(l,"type")||"textWrapping"});break;case"lastRenderedPageBreak":o.children.push({type:ue.Break,break:"lastRenderedPageBreak"});break;case"sym":o.children.push({type:ue.Symbol,font:Vc(q.attr(l,"font")),char:q.attr(l,"char")});break;case"tab":o.children.push({type:ue.Tab});break;case"footnoteReference":o.children.push({type:ue.FootnoteReference,id:q.attr(l,"id")});break;case"endnoteReference":o.children.push({type:ue.EndnoteReference,id:q.attr(l,"id")});break;case"drawing":let d=this.parseDrawing(l);d&&(o.children=[d]);break;case"pict":o.children.push(this.parseVmlPicture(l));break;case"rPr":this.parseRunProperties(l,o);break}return o}parseMathElement(a){const n=`${a.localName}Pr`,o={type:Df[a.localName],children:[]};for(const d of q.elements(a))if(Df[d.localName])o.children.push(this.parseMathElement(d));else if(d.localName=="r"){var l=this.parseRun(d);l.type=ue.MmlRun,o.children.push(l)}else d.localName==n&&(o.props=this.parseMathProperies(d));return o}parseMathProperies(a){const n={};for(const o of q.elements(a))switch(o.localName){case"chr":n.char=q.attr(o,"val");break;case"vertJc":n.verticalJustification=q.attr(o,"val");break;case"pos":n.position=q.attr(o,"val");break;case"degHide":n.hideDegree=q.boolAttr(o,"val");break;case"begChr":n.beginChar=q.attr(o,"val");break;case"endChr":n.endChar=q.attr(o,"val");break}return n}parseRunProperties(a,n){this.parseDefaultProperties(a,n.cssStyle={},null,o=>{switch(o.localName){case"rStyle":n.styleName=q.attr(o,"val");break;case"vertAlign":n.verticalAlign=nt.valueOfVertAlign(o,!0);break;default:return!1}return!0})}parseVmlPicture(a){const n={type:ue.VmlPicture,children:[]};for(const o of q.elements(a)){const l=rm(o,this);l&&n.children.push(l)}return n}checkAlternateContent(a){var d;if(a.localName!="AlternateContent")return a;var n=q.element(a,"Choice");if(n){var o=q.attr(n,"Requires"),l=a.lookupNamespaceURI(o);if(w1.includes(l))return n.firstElementChild}return(d=q.element(a,"Fallback"))==null?void 0:d.firstElementChild}parseDrawing(a){for(var n of q.elements(a))switch(n.localName){case"inline":case"anchor":return this.parseDrawingWrapper(n)}}parseDrawingWrapper(a){var n={type:ue.Drawing,children:[],cssStyle:{}},o=a.localName=="anchor";let l=null,d=q.boolAttr(a,"simplePos");q.boolAttr(a,"behindDoc");let u={relative:"page",align:"left",offset:"0"},f={relative:"page",align:"top",offset:"0"};for(var h of q.elements(a))switch(h.localName){case"simplePos":d&&(u.offset=q.lengthAttr(h,"x",St.Emu),f.offset=q.lengthAttr(h,"y",St.Emu));break;case"extent":n.cssStyle.width=q.lengthAttr(h,"cx",St.Emu),n.cssStyle.height=q.lengthAttr(h,"cy",St.Emu);break;case"positionH":case"positionV":if(!d){let w=h.localName=="positionH"?u:f;var b=q.element(h,"align"),j=q.element(h,"posOffset");w.relative=q.attr(h,"relativeFrom")??w.relative,b&&(w.align=b.textContent),j&&(w.offset=qh(j.textContent,St.Emu))}break;case"wrapTopAndBottom":l="wrapTopAndBottom";break;case"wrapNone":l="wrapNone";break;case"graphic":var N=this.parseGraphic(h);N&&n.children.push(N);break}return l=="wrapTopAndBottom"?(n.cssStyle.display="block",u.align&&(n.cssStyle["text-align"]=u.align,n.cssStyle.width="100%")):l=="wrapNone"?(n.cssStyle.display="block",n.cssStyle.position="relative",n.cssStyle.width="0px",n.cssStyle.height="0px",u.offset&&(n.cssStyle.left=u.offset),f.offset&&(n.cssStyle.top=f.offset)):o&&(u.align=="left"||u.align=="right")&&(n.cssStyle.float=u.align),n}parseGraphic(a){var n=q.element(a,"graphicData");for(let o of q.elements(n))switch(o.localName){case"pic":return this.parsePicture(o)}return null}parsePicture(a){var n={type:ue.Image,src:"",cssStyle:{}},o=q.element(a,"blipFill"),l=q.element(o,"blip"),d=q.element(o,"srcRect");n.src=q.attr(l,"embed"),d&&(n.srcRect=[q.intAttr(d,"l",0)/1e5,q.intAttr(d,"t",0)/1e5,q.intAttr(d,"r",0)/1e5,q.intAttr(d,"b",0)/1e5]);var u=q.element(a,"spPr"),f=q.element(u,"xfrm");if(n.cssStyle.position="relative",f){n.rotation=q.intAttr(f,"rot",0)/6e4;for(var h of q.elements(f))switch(h.localName){case"ext":n.cssStyle.width=q.lengthAttr(h,"cx",St.Emu),n.cssStyle.height=q.lengthAttr(h,"cy",St.Emu);break;case"off":n.cssStyle.left=q.lengthAttr(h,"x",St.Emu),n.cssStyle.top=q.lengthAttr(h,"y",St.Emu);break}}return n}parseTable(a){var n={type:ue.Table,children:[]};for(const o of q.elements(a))switch(o.localName){case"tr":n.children.push(this.parseTableRow(o));break;case"tblGrid":n.columns=this.parseTableColumns(o);break;case"tblPr":this.parseTableProperties(o,n);break}return n}parseTableColumns(a){var n=[];for(const o of q.elements(a))switch(o.localName){case"gridCol":n.push({width:q.lengthAttr(o,"w")});break}return n}parseTableProperties(a,n){switch(n.cssStyle={},n.cellStyle={},this.parseDefaultProperties(a,n.cssStyle,n.cellStyle,o=>{switch(o.localName){case"tblStyle":n.styleName=q.attr(o,"val");break;case"tblLook":n.className=nt.classNameOftblLook(o);break;case"tblpPr":this.parseTablePosition(o,n);break;case"tblStyleColBandSize":n.colBandSize=q.intAttr(o,"val");break;case"tblStyleRowBandSize":n.rowBandSize=q.intAttr(o,"val");break;case"hidden":n.cssStyle.display="none";break;default:return!1}return!0}),n.cssStyle["text-align"]){case"center":delete n.cssStyle["text-align"],n.cssStyle["margin-left"]="auto",n.cssStyle["margin-right"]="auto";break;case"right":delete n.cssStyle["text-align"],n.cssStyle["margin-left"]="auto";break}}parseTablePosition(a,n){var o=q.lengthAttr(a,"topFromText"),l=q.lengthAttr(a,"bottomFromText"),d=q.lengthAttr(a,"rightFromText"),u=q.lengthAttr(a,"leftFromText");n.cssStyle.float="left",n.cssStyle["margin-bottom"]=nt.addSize(n.cssStyle["margin-bottom"],l),n.cssStyle["margin-left"]=nt.addSize(n.cssStyle["margin-left"],u),n.cssStyle["margin-right"]=nt.addSize(n.cssStyle["margin-right"],d),n.cssStyle["margin-top"]=nt.addSize(n.cssStyle["margin-top"],o)}parseTableRow(a){var n={type:ue.Row,children:[]};for(const o of q.elements(a))switch(o.localName){case"tc":n.children.push(this.parseTableCell(o));break;case"trPr":case"tblPrEx":this.parseTableRowProperties(o,n);break}return n}parseTableRowProperties(a,n){n.cssStyle=this.parseDefaultProperties(a,{},null,o=>{switch(o.localName){case"cnfStyle":n.className=nt.classNameOfCnfStyle(o);break;case"tblHeader":n.isHeader=q.boolAttr(o,"val");break;case"gridBefore":n.gridBefore=q.intAttr(o,"val");break;case"gridAfter":n.gridAfter=q.intAttr(o,"val");break;default:return!1}return!0})}parseTableCell(a){var n={type:ue.Cell,children:[]};for(const o of q.elements(a))switch(o.localName){case"tbl":n.children.push(this.parseTable(o));break;case"p":n.children.push(this.parseParagraph(o));break;case"tcPr":this.parseTableCellProperties(o,n);break}return n}parseTableCellProperties(a,n){n.cssStyle=this.parseDefaultProperties(a,{},null,o=>{switch(o.localName){case"gridSpan":n.span=q.intAttr(o,"val",null);break;case"vMerge":n.verticalMerge=q.attr(o,"val")??"continue";break;case"cnfStyle":n.className=nt.classNameOfCnfStyle(o);break;default:return!1}return!0}),this.parseTableCellVerticalText(a,n)}parseTableCellVerticalText(a,n){const o={btLr:{writingMode:"vertical-rl",transform:"rotate(180deg)"},lrTb:{writingMode:"vertical-lr",transform:"none"},tbRl:{writingMode:"vertical-rl",transform:"none"}};for(const l of q.elements(a))if(l.localName==="textDirection"){const d=q.attr(l,"val"),u=o[d]||{writingMode:"horizontal-tb"};n.cssStyle["writing-mode"]=u.writingMode,n.cssStyle.transform=u.transform}}parseDefaultProperties(a,n=null,o=null,l=null){n=n||{};for(const d of q.elements(a))if(!(l!=null&&l(d)))switch(d.localName){case"jc":n["text-align"]=nt.valueOfJc(d);break;case"textAlignment":n["vertical-align"]=nt.valueOfTextAlignment(d);break;case"color":n.color=Ta.colorAttr(d,"val",null,fo.color);break;case"sz":n["font-size"]=n["min-height"]=q.lengthAttr(d,"val",St.FontSize);break;case"shd":n["background-color"]=Ta.colorAttr(d,"fill",null,fo.shd);break;case"highlight":n["background-color"]=Ta.colorAttr(d,"val",null,fo.highlight);break;case"vertAlign":break;case"position":n.verticalAlign=q.lengthAttr(d,"val",St.FontSize);break;case"tcW":if(this.options.ignoreWidth)break;case"tblW":n.width=nt.valueOfSize(d,"w");break;case"trHeight":this.parseTrHeight(d,n);break;case"strike":n["text-decoration"]=q.boolAttr(d,"val",!0)?"line-through":"none";break;case"b":n["font-weight"]=q.boolAttr(d,"val",!0)?"bold":"normal";break;case"i":n["font-style"]=q.boolAttr(d,"val",!0)?"italic":"normal";break;case"caps":n["text-transform"]=q.boolAttr(d,"val",!0)?"uppercase":"none";break;case"smallCaps":n["font-variant"]=q.boolAttr(d,"val",!0)?"small-caps":"none";break;case"u":this.parseUnderline(d,n);break;case"ind":case"tblInd":this.parseIndentation(d,n);break;case"rFonts":this.parseFont(d,n);break;case"tblBorders":this.parseBorderProperties(d,o||n);break;case"tblCellSpacing":n["border-spacing"]=nt.valueOfMargin(d),n["border-collapse"]="separate";break;case"pBdr":this.parseBorderProperties(d,n);break;case"bdr":n.border=nt.valueOfBorder(d);break;case"tcBorders":this.parseBorderProperties(d,n);break;case"vanish":q.boolAttr(d,"val",!0)&&(n.display="none");break;case"kern":break;case"noWrap":break;case"tblCellMar":case"tcMar":this.parseMarginProperties(d,o||n);break;case"tblLayout":n["table-layout"]=nt.valueOfTblLayout(d);break;case"vAlign":n["vertical-align"]=nt.valueOfTextAlignment(d);break;case"spacing":a.localName=="pPr"&&this.parseSpacing(d,n);break;case"wordWrap":q.boolAttr(d,"val")&&(n["overflow-wrap"]="break-word");break;case"suppressAutoHyphens":n.hyphens=q.boolAttr(d,"val",!0)?"none":"auto";break;case"lang":n.$lang=q.attr(d,"val");break;case"rtl":case"bidi":q.boolAttr(d,"val",!0)&&(n.direction="rtl");break;case"bCs":case"iCs":case"szCs":case"tabs":case"outlineLvl":case"contextualSpacing":case"tblStyleColBandSize":case"tblStyleRowBandSize":case"webHidden":case"pageBreakBefore":case"suppressLineNumbers":case"keepLines":case"keepNext":case"widowControl":case"bidi":case"rtl":case"noProof":break;default:this.options.debug&&console.warn(`DOCX: Unknown document element: ${a.localName}.${d.localName}`);break}return n}parseUnderline(a,n){var o=q.attr(a,"val");if(o!=null){switch(o){case"dash":case"dashDotDotHeavy":case"dashDotHeavy":case"dashedHeavy":case"dashLong":case"dashLongHeavy":case"dotDash":case"dotDotDash":n["text-decoration"]="underline dashed";break;case"dotted":case"dottedHeavy":n["text-decoration"]="underline dotted";break;case"double":n["text-decoration"]="underline double";break;case"single":case"thick":n["text-decoration"]="underline";break;case"wave":case"wavyDouble":case"wavyHeavy":n["text-decoration"]="underline wavy";break;case"words":n["text-decoration"]="underline";break;case"none":n["text-decoration"]="none";break}var l=Ta.colorAttr(a,"color");l&&(n["text-decoration-color"]=l)}}parseFont(a,n){var o=q.attr(a,"ascii"),l=nt.themeValue(a,"asciiTheme"),d=q.attr(a,"eastAsia"),u=[o,l,d].filter(f=>f).map(f=>Vc(f));u.length>0&&(n["font-family"]=[...new Set(u)].join(", "))}parseIndentation(a,n){var o=q.lengthAttr(a,"firstLine"),l=q.lengthAttr(a,"hanging"),d=q.lengthAttr(a,"left"),u=q.lengthAttr(a,"start"),f=q.lengthAttr(a,"right"),h=q.lengthAttr(a,"end");o&&(n["text-indent"]=o),l&&(n["text-indent"]=`-${l}`),(d||u)&&(n["margin-inline-start"]=d||u),(f||h)&&(n["margin-inline-end"]=f||h)}parseSpacing(a,n){var o=q.lengthAttr(a,"before"),l=q.lengthAttr(a,"after"),d=q.intAttr(a,"line",null),u=q.attr(a,"lineRule");if(o&&(n["margin-top"]=o),l&&(n["margin-bottom"]=l),d!==null)switch(u){case"auto":n["line-height"]=`${(d/240).toFixed(2)}`;break;case"atLeast":n["line-height"]=`calc(100% + ${d/20}pt)`;break;default:n["line-height"]=n["min-height"]=`${d/20}pt`;break}}parseMarginProperties(a,n){for(const o of q.elements(a))switch(o.localName){case"left":n["padding-left"]=nt.valueOfMargin(o);break;case"right":n["padding-right"]=nt.valueOfMargin(o);break;case"top":n["padding-top"]=nt.valueOfMargin(o);break;case"bottom":n["padding-bottom"]=nt.valueOfMargin(o);break}}parseTrHeight(a,n){switch(q.attr(a,"hRule")){case"exact":n.height=q.lengthAttr(a,"val");break;case"atLeast":default:n.height=q.lengthAttr(a,"val");break}}parseBorderProperties(a,n){for(const o of q.elements(a))switch(o.localName){case"start":case"left":n["border-left"]=nt.valueOfBorder(o);break;case"end":case"right":n["border-right"]=nt.valueOfBorder(o);break;case"top":n["border-top"]=nt.valueOfBorder(o);break;case"bottom":n["border-bottom"]=nt.valueOfBorder(o);break}}}const N1=["black","blue","cyan","darkBlue","darkCyan","darkGray","darkGreen","darkMagenta","darkRed","darkYellow","green","lightGray","magenta","none","red","white","yellow"];class Ta{static colorAttr(a,n,o=null,l="black"){var d=q.attr(a,n);if(d)return d=="auto"?l:N1.includes(d)?d:`#${d}`;var u=q.attr(a,"themeColor");return u?`var(--docx-${u}-color)`:o}}class nt{static themeValue(a,n){var o=q.attr(a,n);return o?`var(--docx-${o}-font)`:null}static valueOfSize(a,n){var o=St.Dxa;switch(q.attr(a,"type")){case"dxa":break;case"pct":o=St.Percent;break;case"auto":return"auto"}return q.lengthAttr(a,n,o)}static valueOfMargin(a){return q.lengthAttr(a,"w")}static valueOfBorder(a){var n=nt.parseBorderType(q.attr(a,"val"));if(n=="none")return"none";var o=Ta.colorAttr(a,"color"),l=q.lengthAttr(a,"sz",St.Border);return`${l} ${n} ${o=="auto"?fo.borderColor:o}`}static parseBorderType(a){switch(a){case"single":return"solid";case"dashDotStroked":return"solid";case"dashed":return"dashed";case"dashSmallGap":return"dashed";case"dotDash":return"dotted";case"dotDotDash":return"dotted";case"dotted":return"dotted";case"double":return"double";case"doubleWave":return"double";case"inset":return"inset";case"nil":return"none";case"none":return"none";case"outset":return"outset";case"thick":return"solid";case"thickThinLargeGap":return"solid";case"thickThinMediumGap":return"solid";case"thickThinSmallGap":return"solid";case"thinThickLargeGap":return"solid";case"thinThickMediumGap":return"solid";case"thinThickSmallGap":return"solid";case"thinThickThinLargeGap":return"solid";case"thinThickThinMediumGap":return"solid";case"thinThickThinSmallGap":return"solid";case"threeDEmboss":return"solid";case"threeDEngrave":return"solid";case"triple":return"double";case"wave":return"solid"}return"solid"}static valueOfTblLayout(a){var n=q.attr(a,"val");return n=="fixed"?"fixed":"auto"}static classNameOfCnfStyle(a){const n=q.attr(a,"val");return["first-row","last-row","first-col","last-col","odd-col","even-col","odd-row","even-row","ne-cell","nw-cell","se-cell","sw-cell"].filter((l,d)=>n[d]=="1").join(" ")}static valueOfJc(a){var n=q.attr(a,"val");switch(n){case"start":case"left":return"left";case"center":return"center";case"end":case"right":return"right";case"both":return"justify"}return n}static valueOfVertAlign(a,n=!1){var o=q.attr(a,"val");switch(o){case"subscript":return"sub";case"superscript":return n?"sup":"super"}return n?null:o}static valueOfTextAlignment(a){var n=q.attr(a,"val");switch(n){case"auto":case"baseline":return"baseline";case"top":return"top";case"center":return"middle";case"bottom":return"bottom"}return n}static addSize(a,n){return a==null?n:n==null?a:`calc(${a} + ${n})`}static classNameOftblLook(a){const n=q.hexAttr(a,"val",0);let o="";return(q.boolAttr(a,"firstRow")||n&32)&&(o+=" first-row"),(q.boolAttr(a,"lastRow")||n&64)&&(o+=" last-row"),(q.boolAttr(a,"firstColumn")||n&128)&&(o+=" first-col"),(q.boolAttr(a,"lastColumn")||n&256)&&(o+=" last-col"),(q.boolAttr(a,"noHBand")||n&512)&&(o+=" no-hband"),(q.boolAttr(a,"noVBand")||n&1024)&&(o+=" no-vband"),o.trim()}}const Mf={pos:0,leader:"none",style:"left"},S1=50;function _1(s=document.body){const a=document.createElement("div");a.style.width="100pt",s.appendChild(a);const n=100/a.offsetWidth;return s.removeChild(a),n}function C1(s,a,n,o=72/96){const l=s.closest("p"),d=s.getBoundingClientRect(),u=l.getBoundingClientRect(),f=getComputedStyle(l),h=(a==null?void 0:a.length)>0?a.map(z=>({pos:Bf(z.position),leader:z.leader,style:z.style})).sort((z,T)=>z.pos-T.pos):[Mf],b=h[h.length-1],j=u.width*o,N=Bf(n);let w=b.pos+N;if(w<j)for(;w<j&&h.length<S1;w+=N)h.push({...Mf,pos:w});const _=parseFloat(f.marginLeft),v=u.left+_,x=(d.left-v)*o,g=h.find(z=>z.style!="clear"&&z.pos>x);if(g==null)return;let S=1;if(g.style=="right"||g.style=="center"){const z=Array.from(l.querySelectorAll(`.${s.className}`)),T=z.indexOf(s)+1,E=document.createRange();E.setStart(s,1),T<z.length?E.setEndBefore(z[T]):E.setEndAfter(l);const A=g.style=="center"?.5:1,D=E.getBoundingClientRect(),B=D.left+A*D.width-(u.left-_);S=g.pos-B*o}else S=g.pos-x;switch(s.innerHTML="&nbsp;",s.style.textDecoration="inherit",s.style.wordSpacing=`${S.toFixed(0)}pt`,g.leader){case"dot":case"middleDot":s.style.textDecoration="underline",s.style.textDecorationStyle="dotted";break;case"hyphen":case"heavy":case"underscore":s.style.textDecoration="underline";break}}function Bf(s){return parseFloat(s)}const Ke={svg:"http://www.w3.org/2000/svg",mathML:"http://www.w3.org/1998/Math/MathML"};class E1{constructor(a){this.htmlDocument=a,this.className="docx",this.styleMap={},this.currentPart=null,this.tableVerticalMerges=[],this.currentVerticalMerge=null,this.tableCellPositions=[],this.currentCellPosition=null,this.footnoteMap={},this.endnoteMap={},this.currentEndnoteIds=[],this.usedHederFooterParts=[],this.currentTabs=[],this.commentMap={},this.tasks=[],this.postRenderTasks=[]}async render(a,n,o=null,l){var u;this.document=a,this.options=l,this.className=l.className,this.rootSelector=l.inWrapper?`.${this.className}-wrapper`:":root",this.styleMap=null,this.tasks=[],this.options.renderComments&&globalThis.Highlight&&(this.commentHighlight=new Highlight),o=o||n,Wf(o),Wf(n),o.appendChild(this.createComment("docxjs library predefined styles")),o.appendChild(this.renderDefaultStyle()),a.themePart&&(o.appendChild(this.createComment("docxjs document theme values")),this.renderTheme(a.themePart,o)),a.stylesPart!=null&&(this.styleMap=this.processStyles(a.stylesPart.styles),o.appendChild(this.createComment("docxjs document styles")),o.appendChild(this.renderStyles(a.stylesPart.styles))),a.numberingPart&&(this.prodessNumberings(a.numberingPart.domNumberings),o.appendChild(this.createComment("docxjs document numbering styles")),o.appendChild(this.renderNumbering(a.numberingPart.domNumberings,o))),a.footnotesPart&&(this.footnoteMap=In(a.footnotesPart.notes,f=>f.id)),a.endnotesPart&&(this.endnoteMap=In(a.endnotesPart.notes,f=>f.id)),a.settingsPart&&(this.defaultTabSize=(u=a.settingsPart.settings)==null?void 0:u.defaultTabStop),!l.ignoreFonts&&a.fontTablePart&&this.renderFontTable(a.fontTablePart,o);var d=this.renderSections(a.documentPart.body);this.options.inWrapper?n.appendChild(this.renderWrapper(d)):Pc(n,d),this.commentHighlight&&l.renderComments&&CSS.highlights.set(`${this.className}-comments`,this.commentHighlight),this.postRenderTasks.forEach(f=>f()),await Promise.allSettled(this.tasks),this.refreshTabStops()}renderTheme(a,n){var f,h;const o={},l=(f=a.theme)==null?void 0:f.fontScheme;l&&(l.majorFont&&(o["--docx-majorHAnsi-font"]=l.majorFont.latinTypeface),l.minorFont&&(o["--docx-minorHAnsi-font"]=l.minorFont.latinTypeface));const d=(h=a.theme)==null?void 0:h.colorScheme;if(d)for(let[b,j]of Object.entries(d.colors))o[`--docx-${b}-color`]=`#${j}`;const u=this.styleToString(`.${this.className}`,o);n.appendChild(this.createStyleElement(u))}renderFontTable(a,n){for(let o of a.fonts)for(let l of o.embedFontRefs)this.tasks.push(this.document.loadFont(l.id,l.key).then(d=>{const u={"font-family":Vc(o.name),src:`url(${d})`};(l.type=="bold"||l.type=="boldItalic")&&(u["font-weight"]="bold"),(l.type=="italic"||l.type=="boldItalic")&&(u["font-style"]="italic");const f=this.styleToString("@font-face",u);n.appendChild(this.createComment(`docxjs ${o.name} font`)),n.appendChild(this.createStyleElement(f))}))}processStyleName(a){return a?`${this.className}_${py(a)}`:this.className}processStyles(a){const n=In(a.filter(l=>l.id!=null),l=>l.id);for(const l of a.filter(d=>d.basedOn)){var o=n[l.basedOn];if(o){l.paragraphProps=yo(l.paragraphProps,o.paragraphProps),l.runProps=yo(l.runProps,o.runProps);for(const d of o.styles){const u=l.styles.find(f=>f.target==d.target);u?this.copyStyleProperties(d.values,u.values):l.styles.push({...d,values:{...d.values}})}}else this.options.debug&&console.warn(`Can't find base style ${l.basedOn}`)}for(let l of a)l.cssName=this.processStyleName(l.id);return n}prodessNumberings(a){var n;for(let o of a.filter(l=>l.pStyleName)){const l=this.findStyle(o.pStyleName);(n=l==null?void 0:l.paragraphProps)!=null&&n.numbering&&(l.paragraphProps.numbering.level=o.level)}}processElement(a){if(a.children)for(var n of a.children)n.parent=a,n.type==ue.Table?this.processTable(n):this.processElement(n)}processTable(a){for(var n of a.children)for(var o of n.children)o.cssStyle=this.copyStyleProperties(a.cellStyle,o.cssStyle,["border-left","border-right","border-top","border-bottom","padding-left","padding-right","padding-top","padding-bottom"]),this.processElement(o)}copyStyleProperties(a,n,o=null){if(!a)return n;n==null&&(n={}),o==null&&(o=Object.getOwnPropertyNames(a));for(var l of o)a.hasOwnProperty(l)&&!n.hasOwnProperty(l)&&(n[l]=a[l]);return n}createPageElement(a,n){var o=this.createElement("section",{className:a});return n&&(n.pageMargins&&(o.style.paddingLeft=n.pageMargins.left,o.style.paddingRight=n.pageMargins.right,o.style.paddingTop=n.pageMargins.top,o.style.paddingBottom=n.pageMargins.bottom),n.pageSize&&(this.options.ignoreWidth||(o.style.width=n.pageSize.width),this.options.ignoreHeight||(o.style.minHeight=n.pageSize.height))),o}createSectionContent(a){var n=this.createElement("article");return a.columns&&a.columns.numberOfColumns&&(n.style.columnCount=`${a.columns.numberOfColumns}`,n.style.columnGap=a.columns.space,a.columns.separator&&(n.style.columnRule="1px solid black")),n}renderSections(a){const n=[];this.processElement(a);const o=this.splitBySection(a.children,a.props),l=this.groupByPageBreaks(o);let d=null;for(let f=0,h=l.length;f<h;f++){this.currentFootnoteIds=[];let j=l[f][0].sectProps;const N=this.createPageElement(this.className,j);this.renderStyleValues(a.cssStyle,N),this.options.renderHeaders&&this.renderHeaderFooter(j.headerRefs,j,n.length,d!=j,N);for(const w of l[f]){var u=this.createSectionContent(w.sectProps);this.renderElements(w.elements,u),N.appendChild(u),j=w.sectProps}this.options.renderFootnotes&&this.renderNotes(this.currentFootnoteIds,this.footnoteMap,N),this.options.renderEndnotes&&f==h-1&&this.renderNotes(this.currentEndnoteIds,this.endnoteMap,N),this.options.renderFooters&&this.renderHeaderFooter(j.footerRefs,j,n.length,d!=j,N),n.push(N),d=j}return n}renderHeaderFooter(a,n,o,l,d){if(a){var u=(n.titlePage&&l?a.find(h=>h.type=="first"):null)??(o%2==1?a.find(h=>h.type=="even"):null)??a.find(h=>h.type=="default"),f=u&&this.document.findPartByRelId(u.id,this.document.documentPart);if(f){this.currentPart=f,this.usedHederFooterParts.includes(f.path)||(this.processElement(f.rootElement),this.usedHederFooterParts.push(f.path));const[h]=this.renderElements([f.rootElement],d);n!=null&&n.pageMargins&&(f.rootElement.type===ue.Header?(h.style.marginTop=`calc(${n.pageMargins.header} - ${n.pageMargins.top})`,h.style.minHeight=`calc(${n.pageMargins.top} - ${n.pageMargins.header})`):f.rootElement.type===ue.Footer&&(h.style.marginBottom=`calc(${n.pageMargins.footer} - ${n.pageMargins.bottom})`,h.style.minHeight=`calc(${n.pageMargins.bottom} - ${n.pageMargins.footer})`)),this.currentPart=null}}}isPageBreakElement(a){return a.type!=ue.Break?!1:a.break=="lastRenderedPageBreak"?!this.options.ignoreLastRenderedPageBreak:a.break=="page"}isPageBreakSection(a,n){var o,l,d,u,f,h;return!a||!n?!1:((o=a.pageSize)==null?void 0:o.orientation)!=((l=n.pageSize)==null?void 0:l.orientation)||((d=a.pageSize)==null?void 0:d.width)!=((u=n.pageSize)==null?void 0:u.width)||((f=a.pageSize)==null?void 0:f.height)!=((h=n.pageSize)==null?void 0:h.height)}splitBySection(a,n){var N;var o={sectProps:null,elements:[],pageBreak:!1},l=[o];for(let w of a){if(w.type==ue.Paragraph){const _=this.findStyle(w.styleName);(N=_==null?void 0:_.paragraphProps)!=null&&N.pageBreakBefore&&(o.sectProps=d,o.pageBreak=!0,o={sectProps:null,elements:[],pageBreak:!1},l.push(o))}if(o.elements.push(w),w.type==ue.Paragraph){const _=w;var d=_.sectionProps,u=-1,f=-1;if(this.options.breakPages&&_.children&&(u=_.children.findIndex(v=>{var x;return f=((x=v.children)==null?void 0:x.findIndex(this.isPageBreakElement.bind(this)))??-1,f!=-1})),(d||u!=-1)&&(o.sectProps=d,o.pageBreak=u!=-1,o={sectProps:null,elements:[],pageBreak:!1},l.push(o)),u!=-1){let v=_.children[u],x=f<v.children.length-1;if(u<_.children.length-1||x){var h=w.children,b={...w,children:h.slice(u)};if(w.children=h.slice(0,u),o.elements.push(b),x){let g=v.children,S={...v,children:g.slice(0,f)};w.children.push(S),v.children=g.slice(f)}}}}}let j=null;for(let w=l.length-1;w>=0;w--)l[w].sectProps==null?l[w].sectProps=j??n:j=l[w].sectProps;return l}groupByPageBreaks(a){let n=[],o;const l=[n];for(let d of a)n.push(d),(this.options.ignoreLastRenderedPageBreak||d.pageBreak||this.isPageBreakSection(o,d.sectProps))&&l.push(n=[]),o=d.sectProps;return l.filter(d=>d.length>0)}renderWrapper(a){return this.createElement("div",{className:`${this.className}-wrapper`},a)}renderDefaultStyle(){var a=this.className,n=`
.${a}-wrapper { background: gray; padding: 30px; padding-bottom: 0px; display: flex; flex-flow: column; align-items: center; } 
.${a}-wrapper>section.${a} { background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); margin-bottom: 30px; }`;this.options.hideWrapperOnPrint&&(n=`@media not print { ${n} }`);var o=`${n}
.${a} { color: black; hyphens: auto; text-underline-position: from-font; }
section.${a} { box-sizing: border-box; display: flex; flex-flow: column nowrap; position: relative; overflow: hidden; }
section.${a}>article { margin-bottom: auto; z-index: 1; }
section.${a}>footer { z-index: 1; }
.${a} table { border-collapse: collapse; }
.${a} table td, .${a} table th { vertical-align: top; }
.${a} p { margin: 0pt; min-height: 1em; }
.${a} span { white-space: pre-wrap; overflow-wrap: break-word; }
.${a} a { color: inherit; text-decoration: inherit; }
.${a} svg { fill: transparent; }
`;return this.options.renderComments&&(o+=`
.${a}-comment-ref { cursor: default; }
.${a}-comment-popover { display: none; z-index: 1000; padding: 0.5rem; background: white; position: absolute; box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.25); width: 30ch; }
.${a}-comment-ref:hover~.${a}-comment-popover { display: block; }
.${a}-comment-author,.${a}-comment-date { font-size: 0.875rem; color: #888; }
`),this.createStyleElement(o)}renderNumbering(a,n){var o="",l=[];for(var d of a){var u=`p.${this.numberingClass(d.id,d.level)}`,f="none";if(d.bullet){let h=`--${this.className}-${d.bullet.src}`.toLowerCase();o+=this.styleToString(`${u}:before`,{content:"' '",display:"inline-block",background:`var(${h})`},d.bullet.style),this.tasks.push(this.document.loadNumberingImage(d.bullet.src).then(b=>{var j=`${this.rootSelector} { ${h}: url(${b}) }`;n.appendChild(this.createStyleElement(j))}))}else if(d.levelText){let h=this.numberingCounter(d.id,d.level);const b=h+" "+(d.start-1);d.level>0&&(o+=this.styleToString(`p.${this.numberingClass(d.id,d.level-1)}`,{"counter-set":b})),l.push(b),o+=this.styleToString(`${u}:before`,{content:this.levelTextToContent(d.levelText,d.suff,d.id,this.numFormatToCssValue(d.format)),"counter-increment":h,...d.rStyle})}else f=this.numFormatToCssValue(d.format);o+=this.styleToString(u,{display:"list-item","list-style-position":"inside","list-style-type":f,...d.pStyle})}return l.length>0&&(o+=this.styleToString(this.rootSelector,{"counter-reset":l.join(" ")})),this.createStyleElement(o)}renderStyles(a){var n="";const o=this.styleMap,l=In(a.filter(h=>h.isDefault),h=>h.target);for(const h of a){var d=h.styles;if(h.linked){var u=h.linked&&o[h.linked];u?d=d.concat(u.styles):this.options.debug&&console.warn(`Can't find linked style ${h.linked}`)}for(const b of d){var f=`${h.target??""}.${h.cssName}`;h.target!=b.target&&(f+=` ${b.target}`),l[h.target]==h&&(f=`.${this.className} ${h.target}, `+f),n+=this.styleToString(f,b.values)}}return this.createStyleElement(n)}renderNotes(a,n,o){var l=a.map(u=>n[u]).filter(u=>u);if(l.length>0){var d=this.createElement("ol",null,this.renderElements(l));o.appendChild(d)}}renderElement(a){switch(a.type){case ue.Paragraph:return this.renderParagraph(a);case ue.BookmarkStart:return this.renderBookmarkStart(a);case ue.BookmarkEnd:return null;case ue.Run:return this.renderRun(a);case ue.Table:return this.renderTable(a);case ue.Row:return this.renderTableRow(a);case ue.Cell:return this.renderTableCell(a);case ue.Hyperlink:return this.renderHyperlink(a);case ue.SmartTag:return this.renderSmartTag(a);case ue.Drawing:return this.renderDrawing(a);case ue.Image:return this.renderImage(a);case ue.Text:return this.renderText(a);case ue.Text:return this.renderText(a);case ue.DeletedText:return this.renderDeletedText(a);case ue.Tab:return this.renderTab(a);case ue.Symbol:return this.renderSymbol(a);case ue.Break:return this.renderBreak(a);case ue.Footer:return this.renderContainer(a,"footer");case ue.Header:return this.renderContainer(a,"header");case ue.Footnote:case ue.Endnote:return this.renderContainer(a,"li");case ue.FootnoteReference:return this.renderFootnoteReference(a);case ue.EndnoteReference:return this.renderEndnoteReference(a);case ue.NoBreakHyphen:return this.createElement("wbr");case ue.VmlPicture:return this.renderVmlPicture(a);case ue.VmlElement:return this.renderVmlElement(a);case ue.MmlMath:return this.renderContainerNS(a,Ke.mathML,"math",{xmlns:Ke.mathML});case ue.MmlMathParagraph:return this.renderContainer(a,"span");case ue.MmlFraction:return this.renderContainerNS(a,Ke.mathML,"mfrac");case ue.MmlBase:return this.renderContainerNS(a,Ke.mathML,a.parent.type==ue.MmlMatrixRow?"mtd":"mrow");case ue.MmlNumerator:case ue.MmlDenominator:case ue.MmlFunction:case ue.MmlLimit:case ue.MmlBox:return this.renderContainerNS(a,Ke.mathML,"mrow");case ue.MmlGroupChar:return this.renderMmlGroupChar(a);case ue.MmlLimitLower:return this.renderContainerNS(a,Ke.mathML,"munder");case ue.MmlMatrix:return this.renderContainerNS(a,Ke.mathML,"mtable");case ue.MmlMatrixRow:return this.renderContainerNS(a,Ke.mathML,"mtr");case ue.MmlRadical:return this.renderMmlRadical(a);case ue.MmlSuperscript:return this.renderContainerNS(a,Ke.mathML,"msup");case ue.MmlSubscript:return this.renderContainerNS(a,Ke.mathML,"msub");case ue.MmlDegree:case ue.MmlSuperArgument:case ue.MmlSubArgument:return this.renderContainerNS(a,Ke.mathML,"mn");case ue.MmlFunctionName:return this.renderContainerNS(a,Ke.mathML,"ms");case ue.MmlDelimiter:return this.renderMmlDelimiter(a);case ue.MmlRun:return this.renderMmlRun(a);case ue.MmlNary:return this.renderMmlNary(a);case ue.MmlPreSubSuper:return this.renderMmlPreSubSuper(a);case ue.MmlBar:return this.renderMmlBar(a);case ue.MmlEquationArray:return this.renderMllList(a);case ue.Inserted:return this.renderInserted(a);case ue.Deleted:return this.renderDeleted(a);case ue.CommentRangeStart:return this.renderCommentRangeStart(a);case ue.CommentRangeEnd:return this.renderCommentRangeEnd(a);case ue.CommentReference:return this.renderCommentReference(a);case ue.AltChunk:return this.renderAltChunk(a)}return null}renderElements(a,n){if(a==null)return null;var o=a.flatMap(l=>this.renderElement(l)).filter(l=>l!=null);return n&&Pc(n,o),o}renderContainer(a,n,o){return this.createElement(n,o,this.renderElements(a.children))}renderContainerNS(a,n,o,l){return this.createElementNS(n,o,l,this.renderElements(a.children))}renderParagraph(a){var d,u;var n=this.renderContainer(a,"p");const o=this.findStyle(a.styleName);a.tabs??(a.tabs=(d=o==null?void 0:o.paragraphProps)==null?void 0:d.tabs),this.renderClass(a,n),this.renderStyleValues(a.cssStyle,n),this.renderCommonProperties(n.style,a);const l=a.numbering??((u=o==null?void 0:o.paragraphProps)==null?void 0:u.numbering);return l&&n.classList.add(this.numberingClass(l.id,l.level)),n}renderRunProperties(a,n){this.renderCommonProperties(a,n)}renderCommonProperties(a,n){n!=null&&(n.color&&(a.color=n.color),n.fontSize&&(a["font-size"]=n.fontSize))}renderHyperlink(a){var n=this.renderContainer(a,"a");this.renderStyleValues(a.cssStyle,n);let o="";if(a.id){const l=this.document.documentPart.rels.find(d=>d.id==a.id&&d.targetMode==="External");o=(l==null?void 0:l.target)??o}return a.anchor&&(o+=`#${a.anchor}`),n.href=o,n}renderSmartTag(a){return this.renderContainer(a,"span")}renderCommentRangeStart(a){var l;if(!this.options.renderComments)return null;const n=new Range;(l=this.commentHighlight)==null||l.add(n);const o=this.createComment(`start of comment #${a.id}`);return this.later(()=>n.setStart(o,0)),this.commentMap[a.id]=n,o}renderCommentRangeEnd(a){if(!this.options.renderComments)return null;const n=this.commentMap[a.id],o=this.createComment(`end of comment #${a.id}`);return this.later(()=>n==null?void 0:n.setEnd(o,0)),o}renderCommentReference(a){var u;if(!this.options.renderComments)return null;var n=(u=this.document.commentsPart)==null?void 0:u.commentMap[a.id];if(!n)return null;const o=new DocumentFragment,l=this.createElement("span",{className:`${this.className}-comment-ref`},["💬"]),d=this.createElement("div",{className:`${this.className}-comment-popover`});return this.renderCommentContent(n,d),o.appendChild(this.createComment(`comment #${n.id} by ${n.author} on ${n.date}`)),o.appendChild(l),o.appendChild(d),o}renderAltChunk(a){if(!this.options.renderAltChunks)return null;var n=this.createElement("iframe");return this.tasks.push(this.document.loadAltChunk(a.id,this.currentPart).then(o=>{n.srcdoc=o})),n}renderCommentContent(a,n){n.appendChild(this.createElement("div",{className:`${this.className}-comment-author`},[a.author])),n.appendChild(this.createElement("div",{className:`${this.className}-comment-date`},[new Date(a.date).toLocaleString()])),this.renderElements(a.children,n)}renderDrawing(a){var n=this.renderContainer(a,"div");return n.style.display="inline-block",n.style.position="relative",n.style.textIndent="0px",this.renderStyleValues(a.cssStyle,n),n}renderImage(a){var h;let n=this.createElement("img"),o=(h=a.cssStyle)==null?void 0:h.transform;if(this.renderStyleValues(a.cssStyle,n),a.srcRect&&a.srcRect.some(b=>b!=0)){var[l,d,u,f]=a.srcRect;o=`scale(${1/(1-l-u)}, ${1/(1-d-f)})`,n.style["clip-path"]=`rect(${(100*d).toFixed(2)}% ${(100*(1-u)).toFixed(2)}% ${(100*(1-f)).toFixed(2)}% ${(100*l).toFixed(2)}%)`}return a.rotation&&(o=`rotate(${a.rotation}deg) ${o??""}`),n.style.transform=o==null?void 0:o.trim(),this.document&&this.tasks.push(this.document.loadDocumentImage(a.src,this.currentPart).then(b=>{n.src=b})),n}renderText(a){return this.htmlDocument.createTextNode(a.text)}renderDeletedText(a){return this.options.renderChanges?this.renderText(a):null}renderBreak(a){return a.break=="textWrapping"?this.createElement("br"):null}renderInserted(a){return this.options.renderChanges?this.renderContainer(a,"ins"):this.renderElements(a.children)}renderDeleted(a){return this.options.renderChanges?this.renderContainer(a,"del"):null}renderSymbol(a){var n=this.createElement("span");return n.style.fontFamily=a.font,n.innerHTML=`&#x${a.char};`,n}renderFootnoteReference(a){var n=this.createElement("sup");return this.currentFootnoteIds.push(a.id),n.textContent=`${this.currentFootnoteIds.length}`,n}renderEndnoteReference(a){var n=this.createElement("sup");return this.currentEndnoteIds.push(a.id),n.textContent=`${this.currentEndnoteIds.length}`,n}renderTab(a){var l;var n=this.createElement("span");if(n.innerHTML="&emsp;",this.options.experimental){n.className=this.tabStopClass();var o=(l=z1(a,ue.Paragraph))==null?void 0:l.tabs;this.currentTabs.push({stops:o,span:n})}return n}renderBookmarkStart(a){return this.createElement("span",{id:a.name})}renderRun(a){if(a.fieldRun)return null;const n=this.createElement("span");if(a.id&&(n.id=a.id),this.renderClass(a,n),this.renderStyleValues(a.cssStyle,n),a.verticalAlign){const o=this.createElement(a.verticalAlign);this.renderElements(a.children,o),n.appendChild(o)}else this.renderElements(a.children,n);return n}renderTable(a){let n=this.createElement("table");return this.tableCellPositions.push(this.currentCellPosition),this.tableVerticalMerges.push(this.currentVerticalMerge),this.currentVerticalMerge={},this.currentCellPosition={col:0,row:0},a.columns&&n.appendChild(this.renderTableColumns(a.columns)),this.renderClass(a,n),this.renderElements(a.children,n),this.renderStyleValues(a.cssStyle,n),this.currentVerticalMerge=this.tableVerticalMerges.pop(),this.currentCellPosition=this.tableCellPositions.pop(),n}renderTableColumns(a){let n=this.createElement("colgroup");for(let o of a){let l=this.createElement("col");o.width&&(l.style.width=o.width),n.appendChild(l)}return n}renderTableRow(a){let n=this.createElement("tr");return this.currentCellPosition.col=0,a.gridBefore&&n.appendChild(this.renderTableCellPlaceholder(a.gridBefore)),this.renderClass(a,n),this.renderElements(a.children,n),this.renderStyleValues(a.cssStyle,n),a.gridAfter&&n.appendChild(this.renderTableCellPlaceholder(a.gridAfter)),this.currentCellPosition.row++,n}renderTableCellPlaceholder(a){const n=this.createElement("td",{colSpan:a});return n.style.border="none",n}renderTableCell(a){let n=this.renderContainer(a,"td");const o=this.currentCellPosition.col;return a.verticalMerge?a.verticalMerge=="restart"?(this.currentVerticalMerge[o]=n,n.rowSpan=1):this.currentVerticalMerge[o]&&(this.currentVerticalMerge[o].rowSpan+=1,n.style.display="none"):this.currentVerticalMerge[o]=null,this.renderClass(a,n),this.renderStyleValues(a.cssStyle,n),a.span&&(n.colSpan=a.span),this.currentCellPosition.col+=n.colSpan,n}renderVmlPicture(a){return this.renderContainer(a,"div")}renderVmlElement(a){var l,d;var n=this.createSvgElement("svg");n.setAttribute("style",a.cssStyleText);const o=this.renderVmlChildElement(a);return(l=a.imageHref)!=null&&l.id&&this.tasks.push((d=this.document)==null?void 0:d.loadDocumentImage(a.imageHref.id,this.currentPart).then(u=>o.setAttribute("href",u))),n.appendChild(o),requestAnimationFrame(()=>{const u=n.firstElementChild.getBBox();n.setAttribute("width",`${Math.ceil(u.x+u.width)}`),n.setAttribute("height",`${Math.ceil(u.y+u.height)}`)}),n}renderVmlChildElement(a){const n=this.createSvgElement(a.tagName);Object.entries(a.attrs).forEach(([o,l])=>n.setAttribute(o,l));for(let o of a.children)o.type==ue.VmlElement?n.appendChild(this.renderVmlChildElement(o)):n.appendChild(...Ss(this.renderElement(o)));return n}renderMmlRadical(a){var l;const n=a.children.find(d=>d.type==ue.MmlBase);if((l=a.props)!=null&&l.hideDegree)return this.createElementNS(Ke.mathML,"msqrt",null,this.renderElements([n]));const o=a.children.find(d=>d.type==ue.MmlDegree);return this.createElementNS(Ke.mathML,"mroot",null,this.renderElements([n,o]))}renderMmlDelimiter(a){const n=[];return n.push(this.createElementNS(Ke.mathML,"mo",null,[a.props.beginChar??"("])),n.push(...this.renderElements(a.children)),n.push(this.createElementNS(Ke.mathML,"mo",null,[a.props.endChar??")"])),this.createElementNS(Ke.mathML,"mrow",null,n)}renderMmlNary(a){var b;const n=[],o=In(a.children,j=>j.type),l=o[ue.MmlSuperArgument],d=o[ue.MmlSubArgument],u=l?this.createElementNS(Ke.mathML,"mo",null,Ss(this.renderElement(l))):null,f=d?this.createElementNS(Ke.mathML,"mo",null,Ss(this.renderElement(d))):null,h=this.createElementNS(Ke.mathML,"mo",null,[((b=a.props)==null?void 0:b.char)??"∫"]);return u||f?n.push(this.createElementNS(Ke.mathML,"munderover",null,[h,f,u])):u?n.push(this.createElementNS(Ke.mathML,"mover",null,[h,u])):f?n.push(this.createElementNS(Ke.mathML,"munder",null,[h,f])):n.push(h),n.push(...this.renderElements(o[ue.MmlBase].children)),this.createElementNS(Ke.mathML,"mrow",null,n)}renderMmlPreSubSuper(a){const n=[],o=In(a.children,b=>b.type),l=o[ue.MmlSuperArgument],d=o[ue.MmlSubArgument],u=l?this.createElementNS(Ke.mathML,"mo",null,Ss(this.renderElement(l))):null,f=d?this.createElementNS(Ke.mathML,"mo",null,Ss(this.renderElement(d))):null,h=this.createElementNS(Ke.mathML,"mo",null);return n.push(this.createElementNS(Ke.mathML,"msubsup",null,[h,f,u])),n.push(...this.renderElements(o[ue.MmlBase].children)),this.createElementNS(Ke.mathML,"mrow",null,n)}renderMmlGroupChar(a){const n=a.props.verticalJustification==="bot"?"mover":"munder",o=this.renderContainerNS(a,Ke.mathML,n);return a.props.char&&o.appendChild(this.createElementNS(Ke.mathML,"mo",null,[a.props.char])),o}renderMmlBar(a){const n=this.renderContainerNS(a,Ke.mathML,"mrow");switch(a.props.position){case"top":n.style.textDecoration="overline";break;case"bottom":n.style.textDecoration="underline";break}return n}renderMmlRun(a){const n=this.createElementNS(Ke.mathML,"ms",null,this.renderElements(a.children));return this.renderClass(a,n),this.renderStyleValues(a.cssStyle,n),n}renderMllList(a){const n=this.createElementNS(Ke.mathML,"mtable");this.renderClass(a,n),this.renderStyleValues(a.cssStyle,n);for(let o of this.renderElements(a.children))n.appendChild(this.createElementNS(Ke.mathML,"mtr",null,[this.createElementNS(Ke.mathML,"mtd",null,[o])]));return n}renderStyleValues(a,n){for(let o in a)o.startsWith("$")?n.setAttribute(o.slice(1),a[o]):n.style[o]=a[o]}renderClass(a,n){a.className&&(n.className=a.className),a.styleName&&n.classList.add(this.processStyleName(a.styleName))}findStyle(a){var n;return a&&((n=this.styleMap)==null?void 0:n[a])}numberingClass(a,n){return`${this.className}-num-${a}-${n}`}tabStopClass(){return`${this.className}-tab-stop`}styleToString(a,n,o=null){let l=`${a} {\r
`;for(const d in n)d.startsWith("$")||(l+=`  ${d}: ${n[d]};\r
`);return o&&(l+=o),l+`}\r
`}numberingCounter(a,n){return`${this.className}-num-${a}-${n}`}levelTextToContent(a,n,o,l){const d={tab:"\\9",space:"\\a0"};var u=a.replace(/%\d*/g,f=>{let h=parseInt(f.substring(1),10)-1;return`"counter(${this.numberingCounter(o,h)}, ${l})"`});return`"${u}${d[n]??""}"`}numFormatToCssValue(a){var n={none:"none",bullet:"disc",decimal:"decimal",lowerLetter:"lower-alpha",upperLetter:"upper-alpha",lowerRoman:"lower-roman",upperRoman:"upper-roman",decimalZero:"decimal-leading-zero",aiueo:"katakana",aiueoFullWidth:"katakana",chineseCounting:"simp-chinese-informal",chineseCountingThousand:"simp-chinese-informal",chineseLegalSimplified:"simp-chinese-formal",chosung:"hangul-consonant",ideographDigital:"cjk-ideographic",ideographTraditional:"cjk-heavenly-stem",ideographLegalTraditional:"trad-chinese-formal",ideographZodiac:"cjk-earthly-branch",iroha:"katakana-iroha",irohaFullWidth:"katakana-iroha",japaneseCounting:"japanese-informal",japaneseDigitalTenThousand:"cjk-decimal",japaneseLegal:"japanese-formal",thaiNumbers:"thai",koreanCounting:"korean-hangul-formal",koreanDigital:"korean-hangul-formal",koreanDigital2:"korean-hanja-informal",hebrew1:"hebrew",hebrew2:"hebrew",hindiNumbers:"devanagari",ganada:"hangul",taiwaneseCounting:"cjk-ideographic",taiwaneseCountingThousand:"cjk-ideographic",taiwaneseDigital:"cjk-decimal"};return n[a]??a}refreshTabStops(){this.options.experimental&&setTimeout(()=>{const a=_1();for(let n of this.currentTabs)C1(n.span,n.stops,this.defaultTabSize,a)},500)}createElementNS(a,n,o,l){var d=a?this.htmlDocument.createElementNS(a,n):this.htmlDocument.createElement(n);return Object.assign(d,o),l&&Pc(d,l),d}createElement(a,n,o){return this.createElementNS(void 0,a,n,o)}createSvgElement(a,n,o){return this.createElementNS(Ke.svg,a,n,o)}createStyleElement(a){return this.createElement("style",{innerHTML:a})}createComment(a){return this.htmlDocument.createComment(a)}later(a){this.postRenderTasks.push(a)}}function Wf(s){s.innerHTML=""}function Pc(s,a){a.forEach(n=>s.appendChild(hy(n)?document.createTextNode(n):n))}function z1(s,a){for(var n=s.parent;n!=null&&n.type!=a;)n=n.parent;return n}const nm={ignoreHeight:!1,ignoreWidth:!1,ignoreFonts:!1,breakPages:!0,debug:!1,experimental:!1,className:"docx",inWrapper:!0,hideWrapperOnPrint:!1,trimXmlDeclaration:!0,ignoreLastRenderedPageBreak:!0,renderHeaders:!0,renderFooters:!0,renderFootnotes:!0,renderEndnotes:!0,useBase64URL:!1,renderChanges:!1,renderComments:!1,renderAltChunks:!0};function P1(s,a){const n={...nm,...a};return ld.load(s,new k1(n),n)}async function R1(s,a,n,o){const l={...nm,...o};return await new E1(window.document).render(s,a,n,l)}async function am(s,a,n,o){const l=await P1(s,o);return await R1(l,a,n,o),l}const T1=Et.replace("/api",""),Uf=s=>{if(!s)return null;const a=s.split(`
`),n=[];let o=[];return a.forEach((l,d)=>{const u=l.trim();if(u.startsWith("•")||u.startsWith("-")||u.startsWith("*")||/^\d+\./.test(u)){const h=u.replace(/^[•\-*\d.]+\s*/,"").trim();h&&o.push(e.jsx("li",{children:h},`li-${d}`))}else if(o.length>0&&(n.push(e.jsx("ul",{className:"formatted-list",children:o},`ul-${d}`)),o=[]),u){const h=u.length<40&&(u===u.toUpperCase()||u.endsWith(":"));n.push(e.jsx("p",{className:h?"formatted-heading":"formatted-paragraph",children:u},`p-${d}`))}else n.push(e.jsx("div",{className:"formatted-spacer"},`br-${d}`))}),o.length>0&&n.push(e.jsx("ul",{className:"formatted-list",children:o},"ul-final")),n},ao={accounting:["accountant","audit","tax","ledger","invoice","payroll","finance","reconciliation","budget","tally","quickbooks","erp","casl","aat","cma","acca","cfo","treasury","billing"],it_software:["software","developer","engineer","react","javascript","node","php","mysql","python","java","aws","cloud","frontend","backend","fullstack","api","git","mobile","ios","android","laravel","c#","dot net","ui","ux","database","linux","devops","cybersecurity","networks","it"],sales_marketing:["sales","marketing","branding","advertising","digital marketing","seo","social media","leads","conversions","customer","retail","wholesale","negotiation","promotion","crm","market research","revenue","growth","client","representative","merchandiser","brand manager","distribution"],hr_admin:["hr","human resources","recruitment","hiring","training","development","administrative","office","receptionist","clerk","ops","operations","clerical","data entry","policy","employee relations","attendance","secretarial","compliance"],engineering:["mechanical","electrical","civil","production","quality","qa","qc","process","maintenance","structural","autocad","blueprints","manufacturing","technician","workshop","factory","project management"],healthcare:["medical","pharma","healthcare","nurse","doctor","clinic","hospital","rehab","medicine","laboratory","pharmaceutical","biotech","clinical"],hospitality:["travel","tourism","hotel","resort","front office","steward","chef","guest","reservation","ticketing","guides","airline"],logistics:["logistics","supply chain","warehouse","shipping","export","import","procurement","inventory","transport","delivery","fleet","stores","purchasing"]},A1=({url:s})=>{const a=F.useRef(null),[n,o]=F.useState(!0),[l,d]=F.useState(null);return F.useEffect(()=>{(async()=>{if(!(!s||!a.current))try{o(!0),d(null);const f=await ht.get(s,{responseType:"blob",headers:{Authorization:`Bearer ${localStorage.getItem("gs_admin_token")}`}});a.current.innerHTML="",await am(f.data,a.current,null,{className:"docx",inWrapper:!0,ignoreWidth:!1,ignoreHeight:!1,ignoreFonts:!1,breakPageToSections:!0,trimXmlDeclaration:!0})}catch(f){console.error("Docx render error:",f),d("Failed to render document. Please download to view.")}finally{o(!1)}})()},[s]),e.jsxs("div",{style:{width:"100%",height:"100%",overflow:"auto",background:"#fff",padding:"20px",display:"flex",flexDirection:"column",alignItems:"center"},children:[n&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"15px",padding:"50px"},children:[e.jsx("div",{className:"spinner-p"}),e.jsx("p",{style:{color:"var(--text-muted)",fontWeight:600},children:"Rendering Document..."})]}),l&&e.jsx("div",{style:{color:"var(--crimson)",padding:"20px"},children:l}),e.jsx("div",{ref:a,style:{width:"100%",maxWidth:"800px"}})]})};function L1({admin:s}){var pn,pr;const[a]=o0(),[n,o]=F.useState([]),[l,d]=F.useState([]),[u,f]=F.useState([]),[h,b]=F.useState([]),[j,N]=F.useState(!0),[w,_]=F.useState(null),[v,x]=F.useState(!1),[g,S]=F.useState(!1),[z,T]=F.useState(""),[E,A]=F.useState({interview_type:"Online",interview_date:"",interview_time:"",interview_location:""}),[D,B]=F.useState(!1),[V,U]=F.useState([]),[G,fe]=F.useState(!1),[L,H]=F.useState(!1),[k,J]=F.useState(null),[ve,se]=F.useState(1),oe=8,[Q,ce]=F.useState([]),[R,P]=F.useState(!1),[W,ee]=F.useState(!1),[te,Ne]=F.useState(!1),[Te,_e]=F.useState(!1),[ze,He]=F.useState(null),[Qe,xe]=F.useState(!1),[Ae,y]=F.useState({interview_type:"Online",interview_date:"",interview_time:"",interview_location:"",interview_location_link:""}),[he,re]=F.useState(""),[I,O]=F.useState({vacancy_id:a.get("vacancy_id")||"",company_id:"",overall_experience:"",relevant_experience:"",qualification:"",status:"",search:"",interview_date:"",sortBy:"highExperience"}),[Z,ge]=F.useState(!0),pe=l.find(X=>String(X.id)===String(I.vacancy_id))||{},ae=()=>{if(!pe.id){me.info("Please select a position first");return}O(X=>({...X,overall_experience:pe.min_experience||"",relevant_experience:pe.min_relevant_experience||"",sortBy:"matchScore"})),me.success(`Filters synced with ${pe.title} requirements`)};F.useEffect(()=>{Ce()},[]),F.useEffect(()=>{Y(),I.vacancy_id?(we(),H(!1)):(U([]),H(!1))},[I.vacancy_id,I.company_id,I.overall_experience,I.relevant_experience,I.qualification,I.status,I.interview_date]);const we=async()=>{try{fe(!0);const X=await tb({vacancy_id:I.vacancy_id});U(X.data.data||[])}catch(X){console.error(X)}finally{fe(!1)}},Ce=async()=>{try{const[X,Me,Ge]=await Promise.all([zo(),un(),Ch()]);d(X.data.data||[]),f(Me.data.data||[]),b(Ge.data.data||[])}catch(X){console.error(X)}},Y=async()=>{try{N(!0);const X={};Object.entries(I).forEach(([Ge,Ve])=>{Ve&&(X[Ge]=Ve)});const Me=await Ph(X);o(Me.data.data||[])}catch(X){console.error(X)}finally{N(!1)}},ke=async()=>{try{const X={};Object.entries(I).forEach(([fr,hr])=>{hr&&fr!=="search"&&(X[fr]=hr)});const Me=await sb(X),Ge=new Blob([Me.data],{type:"text/csv"}),Ve=window.URL.createObjectURL(Ge),Ze=document.createElement("a");Ze.href=Ve,Ze.download=`applicants_${new Date().toISOString().slice(0,10)}.csv`,document.body.appendChild(Ze),Ze.click(),document.body.removeChild(Ze),window.URL.revokeObjectURL(Ve),me.success("Excel/CSV downloaded successfully")}catch{me.error("Export failed")}},De=()=>{O({vacancy_id:"",company_id:"",overall_experience:"",relevant_experience:"",qualification:"",status:"",search:"",interview_date:"",sortBy:"highExperience"}),ce([])},Fe=X=>{X.target.checked?ce(Mr.map(Me=>Me.id)):ce([])},mt=X=>{ce(Me=>Me.includes(X)?Me.filter(Ge=>Ge!==X):[...Me,X])},nr=async()=>{try{ee(!0),await eb({ids:Q}),me.success(`${Q.length} applications deleted successfully`),ce([]),P(!1),Y()}catch{me.error("Failed to delete applications")}finally{ee(!1)}},vt=async(X,Me,Ge="",Ve={})=>{var Ze,fr;try{B(!0),await vf({id:X,status:Me,rejection_reason:Ge,...Ve}),me.success(`Application marked as ${Me}`),x(!1),S(!1),Ne(!1),T(""),A({interview_type:"Online",interview_date:"",interview_time:"",interview_location:""}),_(null),Y()}catch(hr){me.error(((fr=(Ze=hr.response)==null?void 0:Ze.data)==null?void 0:fr.message)||"Failed to update status")}finally{B(!1)}},Yr=async X=>{var Me,Ge;try{B(!0),await vf({id:X.id,status:"shortlisted"}),me.success(`${X.first_name} ${X.last_name} shortlisted successfully`),Ne(!1),_(null),Y()}catch(Ve){me.error(((Ge=(Me=Ve.response)==null?void 0:Me.data)==null?void 0:Ge.message)||"Failed to shortlist")}finally{B(!1)}},at=async()=>{var X,Me;if(ze)try{xe(!0),await Qv({id:ze.id,...Ae}),me.success(`Interview invitation sent to ${ze.first_name}!`),_e(!1),He(null),y({interview_type:"Online",interview_date:"",interview_time:"",interview_location:"",interview_location_link:""}),Y()}catch(Ge){me.error(((Me=(X=Ge.response)==null?void 0:X.data)==null?void 0:Me.message)||"Failed to send invitation")}finally{xe(!1)}},Nr=()=>{_e(!1),He(null),re(""),y({interview_type:"Online",interview_date:"",interview_time:"",interview_location:"",interview_location_link:""})},Kr=X=>{const Me={PhD:100,"Masters Degree":90,"Bachelors Degree":80,"Professional Certification":75,Diploma:65,"A/L":45,"O/L":25},Ge={"10+ years":100,"8-10 years":85,"5-7 years":70,"3-4 years":55,"1-2 years":35,"0-1 years":15,"0 years":5},Ve=l.find(it=>it.id==(I.vacancy_id||X.vacancy_id));let Ze={factors:{skills:0,experience:0,qualification:0,keyword:0},matchedKeywords:[],isQualified:!0};const fr=Ve?Ve.title.toLowerCase():"",hr=Ve?(Ve.requirements||"").toLowerCase():"",Us=Ve?(Ve.description||"").toLowerCase():"",$t=fr+" "+hr+" "+Us;let Mn=0,mr=[];Object.values(ao).flat().forEach(it=>{$t.includes(it)&&mr.push(it)}),mr=[...new Set(mr)];const $s=(X.qualification+" "+(X.applied_vacancy||"")+" "+(X.last_applied_vacancy||"")+" "+X.tags).toLowerCase();if(mr.length>0){const it=mr.filter(ar=>$s.includes(ar));Mn=it.length/mr.length*100,Ze.matchedKeywords=it.map(ar=>ar.charAt(0).toUpperCase()+ar.slice(1))}else Mn=70;Ze.factors.skills=Math.round(Mn);let Xr=0;const fn=Ge[X.overall_experience]||0,Bn=Ge[X.relevant_experience]||0;if(Ve){const it=Ge[Ve.min_experience]||15,ar=Ge[Ve.min_relevant_experience]||15,la=fn/it,ca=Bn/ar;Xr=Math.min(1.2,(la+ca)/2)*100,fn<it&&(Ze.isQualified=!1)}else Xr=(fn+Bn)/2;Ze.factors.experience=Math.round(Xr);let hn=0;const $a=Me[X.qualification]||0;if(Ve){let it=80;$t.includes("phd")||$t.includes("doctorate")?it=100:$t.includes("masters")||$t.includes("msc")||$t.includes("mba")?it=90:$t.includes("diploma")?it=65:$t.includes("a/l")&&(it=45),hn=$a/it*100,$a<it&&(hn*=.8)}else hn=$a;Ze.factors.qualification=Math.round(Math.min(100,hn));let ia=0,oa="";for(const[it,ar]of Object.entries(ao))if(ar.filter(ca=>$t.includes(ca)).length>2){oa=it;break}if(oa&&ao[oa]){const it=ao[oa],ar=it.filter(la=>$s.includes(la)).length;ia=Math.min(100,ar/Math.min(8,it.length)*100)}else ia=50;Ve&&X.vacancy_title&&X.vacancy_title.toLowerCase().includes(Ve.designation.toLowerCase())&&(ia+=20),Ze.factors.keyword=Math.round(Math.min(100,ia));const Zr=Ze.factors.skills*.4+Ze.factors.experience*.25+Ze.factors.qualification*.15+Ze.factors.keyword*.2;return{score:Math.min(100,Math.round(Zr)),details:Ze}},kt=n.filter(X=>{if(!I.search)return!0;const Me=I.search.toLowerCase();return(X.first_name+" "+X.last_name).toLowerCase().includes(Me)||X.email.toLowerCase().includes(Me)||X.contact_number.includes(Me)}).sort((X,Me)=>{if(I.sortBy==="newest")return new Date(Me.applied_at)-new Date(X.applied_at);if(I.sortBy==="oldest")return new Date(X.applied_at)-new Date(Me.applied_at);if(I.sortBy==="matchScore"){const Ge=Kr(X).score;return Kr(Me).score-Ge}if(I.sortBy==="highExperience"||I.sortBy==="lowExperience"){const Ge={"10+ years":7,"8-10 years":6,"5-7 years":5,"3-4 years":4,"1-2 years":3,"0-1 years":2,"0 years":1},Ve=Ge[X.overall_experience]||0,Ze=Ge[Me.overall_experience]||0;return I.sortBy==="highExperience"?Ze-Ve:Ve-Ze}return new Date(Me.applied_at)-new Date(X.applied_at)}),Fr=Math.ceil(kt.length/oe),Dr=(ve-1)*oe,Mr=kt.slice(Dr,Dr+oe);return F.useEffect(()=>{se(1)},[I]),e.jsxs("div",{className:"manage-vacancies-console",children:[e.jsxs("div",{className:"vacancies-orchestration-header",children:[e.jsx("div",{className:"hero-bg-accent"}),e.jsxs("div",{className:"header-content-p",children:[e.jsxs("div",{className:"console-badge",children:[e.jsx("span",{className:"live-dot pulse"}),"CANDIDATE ORCHESTRATION PIPELINE"]}),e.jsx("h1",{className:"serif-title-p",children:"Applications"}),e.jsx("p",{className:"hero-subline",children:"Review and manage candidates for all active roles across George Steuart & Company."})]}),e.jsxs("button",{className:"btn-establish-p",onClick:ke,children:[e.jsx(Cs,{})," ",e.jsx("span",{children:"Export to CSV"})]})]}),e.jsxs("div",{className:"console-toolbar-p",children:[e.jsxs("div",{className:"toolbar-search-row",children:[e.jsxs("div",{className:"search-orchestrator",children:[e.jsx(Ar,{className:"s-icon"}),e.jsx("label",{htmlFor:"applicant_search",className:"sr-only",children:"Search Applicants"}),e.jsx("input",{id:"applicant_search",name:"applicant_search",type:"text",placeholder:"Search by applicant name, email, or contact number...",value:I.search,onChange:X=>O({...I,search:X.target.value})})]}),e.jsxs("button",{className:"btn-reset-console",onClick:De,children:[e.jsx(ct,{size:14})," Reset Filters"]}),I.vacancy_id&&e.jsxs("button",{className:"btn-match-console animated-fade-in",onClick:ae,title:"Auto-filter candidates matching this role's requirements",children:[e.jsx(Tt,{size:14})," Match Reqs"]})]}),e.jsx("div",{className:"toolbar-divider"}),e.jsxs("div",{className:"toolbar-filters-row",children:[e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{htmlFor:"vacancy_filter",className:"filter-label",children:"Position"}),e.jsxs("div",{className:"select-orchestrator select-lg",children:[e.jsx(At,{className:"f-icon"}),e.jsxs("select",{id:"vacancy_filter",name:"vacancy_id",value:I.vacancy_id,onChange:X=>O({...I,vacancy_id:X.target.value}),children:[e.jsx("option",{value:"",children:"All Active Roles"}),l.map(X=>e.jsx("option",{value:X.id,children:X.title},X.id))]})]})]}),s.role==="super_admin"&&e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{htmlFor:"company_filter",className:"filter-label",children:"Establishment"}),e.jsxs("div",{className:"select-orchestrator select-lg",children:[e.jsx(As,{className:"f-icon"}),e.jsxs("select",{id:"company_filter",name:"company_id",value:I.company_id,onChange:X=>O({...I,company_id:X.target.value}),children:[e.jsx("option",{value:"",children:"All Entities"}),u.map(X=>e.jsx("option",{value:X.id,children:X.name},X.id))]})]})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{htmlFor:"experience_filter",className:"filter-label",children:"Min. Experience"}),e.jsxs("div",{className:"select-orchestrator",children:[e.jsx(Tt,{className:"f-icon"}),e.jsxs("select",{id:"experience_filter",name:"overall_experience",value:I.overall_experience,onChange:X=>O({...I,overall_experience:X.target.value}),children:[e.jsx("option",{value:"",children:"All Experience"}),e.jsx("option",{value:"0 years",children:"0 years (Freshers)"}),e.jsx("option",{value:"0-1 years",children:"0–1 years"}),e.jsx("option",{value:"1-2 years",children:"1–2 years"}),e.jsx("option",{value:"3-4 years",children:"3–4 years"}),e.jsx("option",{value:"5-7 years",children:"5–7 years"}),e.jsx("option",{value:"8-10 years",children:"8–10 years"}),e.jsx("option",{value:"10+ years",children:"10+ years"})]})]})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{htmlFor:"qualification_filter",className:"filter-label",children:"Credential"}),e.jsxs("div",{className:"select-orchestrator",children:[e.jsx(qr,{className:"f-icon"}),e.jsxs("select",{id:"qualification_filter",name:"qualification",value:I.qualification,onChange:X=>O({...I,qualification:X.target.value}),children:[e.jsx("option",{value:"",children:"Any Qual."}),Th.map(X=>e.jsx("option",{value:X,children:X},X))]})]})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{htmlFor:"status_filter",className:"filter-label",children:"Status"}),e.jsxs("div",{className:"select-orchestrator",children:[e.jsx(nd,{className:"f-icon"}),e.jsxs("select",{id:"status_filter",name:"status",value:I.status,onChange:X=>O({...I,status:X.target.value,interview_date:X.target.value==="shortlisted"?I.interview_date:""}),children:[e.jsx("option",{value:"",children:"All Statuses"}),e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"under_review",children:"Under Review"}),e.jsx("option",{value:"shortlisted",children:"Shortlisted"}),e.jsx("option",{value:"rejected",children:"Rejected"})]})]})]}),I.status==="shortlisted"&&e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{htmlFor:"interview_date_filter",className:"filter-label",children:"Date"}),e.jsxs("div",{className:"select-orchestrator",children:[e.jsx(qt,{className:"f-icon"}),e.jsx("input",{id:"interview_date_filter",name:"interview_date",type:"date",value:I.interview_date,onChange:X=>O({...I,interview_date:X.target.value}),className:"date-orchestrator-input"})]})]}),e.jsxs("div",{className:"filter-group filter-field-sort",children:[e.jsx("label",{htmlFor:"sort_by",className:"filter-label sort-label",children:"Sort"}),e.jsx("div",{className:"select-orchestrator",children:e.jsxs("select",{id:"sort_by",name:"sortBy",value:I.sortBy,onChange:X=>O({...I,sortBy:X.target.value}),className:"sort-select-crimson",children:[e.jsx("option",{value:"matchScore",children:"Best Match Score"}),e.jsx("option",{value:"highExperience",children:"High Experience"}),e.jsx("option",{value:"lowExperience",children:"Low Experience"}),e.jsx("option",{value:"newest",children:"Newest First"}),e.jsx("option",{value:"oldest",children:"Oldest First"})]})})]})]})]}),I.vacancy_id&&(pe.id?e.jsxs("div",{style:{margin:"0 0 24px 0",borderRadius:"16px",border:"1px solid rgba(200,169,81,0.25)",background:"linear-gradient(135deg, #fffdf5 0%, #fff8e8 100%)",boxShadow:"0 4px 20px rgba(184,134,11,0.08)",overflow:"hidden"},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #1a0305 0%, #3d0a10 100%)",padding:"14px 24px",display:"flex",alignItems:"center",gap:12},children:[e.jsx(At,{style:{color:"#c8a951",flexShrink:0},size:18}),e.jsxs("div",{style:{flex:1},children:[e.jsx("span",{style:{color:"#c8a951",fontWeight:700,fontSize:"1rem",letterSpacing:.3},children:pe.title}),pe.company_name&&e.jsxs("span",{style:{color:"rgba(255,255,255,0.5)",fontSize:"0.8rem",marginLeft:10},children:["— ",pe.company_name]})]}),e.jsxs("div",{onClick:()=>ge(!Z),style:{background:Z?"rgba(200,169,81,0.2)":"rgba(200,169,81,0.1)",border:"1px solid rgba(200,169,81,0.35)",color:"#c8a951",borderRadius:8,padding:"5px 12px",fontSize:"0.72rem",fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"flex",alignItems:"center",gap:8,cursor:"pointer",transition:"all 0.2s"},className:"job-details-toggle-btn",children:[Z?"Hide Details":"Job Details",e.jsx(Tr,{style:{transform:Z?"rotate(90deg)":"rotate(0deg)",transition:"transform 0.3s ease"},size:15})]})]}),Z&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:12,padding:"16px 24px",borderBottom:"1px solid rgba(200,169,81,0.15)",animation:"fadeInDown 0.3s ease-out"},children:[pe.reference_number&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,background:"#fff",border:"1px solid rgba(200,169,81,0.3)",borderRadius:10,padding:"7px 14px"},children:[e.jsx(Fh,{size:13,style:{color:"#b8860b"}}),e.jsx("span",{style:{fontSize:"0.75rem",color:"#888",fontWeight:600,textTransform:"uppercase",letterSpacing:.5},children:"Ref No."}),e.jsx("span",{style:{fontSize:"0.85rem",fontWeight:700,color:"#b8860b"},children:pe.reference_number})]}),pe.min_experience&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,background:"#fff",border:"1px solid rgba(99,179,237,0.3)",borderRadius:10,padding:"7px 14px"},children:[e.jsx(td,{size:13,style:{color:"#3182ce"}}),e.jsx("span",{style:{fontSize:"0.75rem",color:"#888",fontWeight:600,textTransform:"uppercase",letterSpacing:.5},children:"Min. Experience"}),e.jsx("span",{style:{fontSize:"0.85rem",fontWeight:700,color:"#3182ce"},children:pe.min_experience})]}),pe.min_relevant_experience&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,background:"#fff",border:"1px solid rgba(99,179,237,0.3)",borderRadius:10,padding:"7px 14px"},children:[e.jsx(Ma,{size:13,style:{color:"#2b6cb0"}}),e.jsx("span",{style:{fontSize:"0.75rem",color:"#888",fontWeight:600,textTransform:"uppercase",letterSpacing:.5},children:"Relevant Exp."}),e.jsx("span",{style:{fontSize:"0.85rem",fontWeight:700,color:"#2b6cb0"},children:pe.min_relevant_experience})]}),pe.min_qualification&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,background:"#fff",border:"1px solid rgba(72,187,120,0.35)",borderRadius:10,padding:"7px 14px"},children:[e.jsx(Tt,{size:13,style:{color:"#38a169"}}),e.jsx("span",{style:{fontSize:"0.75rem",color:"#888",fontWeight:600,textTransform:"uppercase",letterSpacing:.5},children:"Required Qual."}),e.jsx("span",{style:{fontSize:"0.85rem",fontWeight:700,color:"#38a169"},children:pe.min_qualification})]}),pe.employment_type&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,background:"#fff",border:"1px solid rgba(160,118,249,0.3)",borderRadius:10,padding:"7px 14px"},children:[e.jsx(Dh,{size:13,style:{color:"#805ad5"}}),e.jsx("span",{style:{fontSize:"0.75rem",color:"#888",fontWeight:600,textTransform:"uppercase",letterSpacing:.5},children:"Type"}),e.jsx("span",{style:{fontSize:"0.85rem",fontWeight:700,color:"#805ad5"},children:pe.employment_type})]}),pe.location&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,background:"#fff",border:"1px solid rgba(237,137,54,0.3)",borderRadius:10,padding:"7px 14px"},children:[e.jsx(xt,{size:13,style:{color:"#dd6b20"}}),e.jsx("span",{style:{fontSize:"0.75rem",color:"#888",fontWeight:600,textTransform:"uppercase",letterSpacing:.5},children:"Location"}),e.jsx("span",{style:{fontSize:"0.85rem",fontWeight:700,color:"#dd6b20"},children:pe.location})]}),pe.expire_date&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,background:"#fff",border:"1px solid rgba(252,129,74,0.3)",borderRadius:10,padding:"7px 14px"},children:[e.jsx(qt,{size:13,style:{color:"#e53e3e"}}),e.jsx("span",{style:{fontSize:"0.75rem",color:"#888",fontWeight:600,textTransform:"uppercase",letterSpacing:.5},children:"Deadline"}),e.jsx("span",{style:{fontSize:"0.85rem",fontWeight:700,color:"#e53e3e"},children:new Date(pe.expire_date).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})})]})]}),Z&&(pe.description||pe.requirements)&&e.jsxs("div",{className:"vacancy-details-grid animated-fade-in",style:{animationDuration:"0.4s"},children:[pe.description&&e.jsxs("div",{className:"vd-col description-col",children:[e.jsxs("div",{className:"vd-col-header",children:[e.jsx(Oa,{size:14}),e.jsx("span",{children:"Job Description"})]}),e.jsx("div",{className:"vd-content-box",children:Uf(pe.description)})]}),pe.requirements&&e.jsxs("div",{className:"vd-col requirements-col",children:[e.jsxs("div",{className:"vd-col-header green",children:[e.jsx(Lr,{size:14}),e.jsx("span",{children:"Requirements"})]}),e.jsx("div",{className:"vd-content-box",children:Uf(pe.requirements)})]})]})]}):null),I.vacancy_id&&V.length>0&&e.jsxs("div",{className:"stp-section",children:[e.jsxs("div",{className:"stp-header-banner stp-teaser",onClick:()=>H(X=>!X),children:[e.jsxs("div",{className:"stp-header-left",children:[e.jsx("div",{className:"stp-icon-wrap",children:"🔥"}),e.jsxs("div",{children:[e.jsxs("h2",{className:"stp-title",children:[V.length," candidate",V.length!==1?"s":""," already match this job!"]}),e.jsx("p",{className:"stp-subtitle",children:L?"Click to hide — these candidates opted in for future roles":"From your Talent Pool — click to view & invite them instantly"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[e.jsxs("div",{className:"stp-match-badge",children:[e.jsx("span",{className:"stp-count",children:V.length}),e.jsxs("span",{className:"stp-count-label",children:["Match",V.length!==1?"es":""]})]}),e.jsx("div",{className:"stp-chevron",style:{transform:L?"rotate(180deg)":"rotate(0deg)"},children:e.jsx(Tr,{size:22,style:{transform:"rotate(90deg)",color:"rgba(255,255,255,0.6)"}})})]})]}),L&&e.jsx("div",{className:"stp-cards-grid",children:V.map((X,Me)=>{var Ge,Ve;return e.jsx("div",{className:"stp-card",onClick:()=>_({...X,is_suggestion:!0}),children:e.jsxs("div",{className:"stp-card-inner",children:[e.jsxs("div",{className:"stp-avatar",children:[(Ge=X.first_name)==null?void 0:Ge[0],(Ve=X.last_name)==null?void 0:Ve[0]]}),e.jsxs("div",{className:"stp-info",children:[e.jsxs("div",{className:"stp-name-row",children:[e.jsxs("span",{className:"stp-name",children:[X.first_name," ",X.last_name]}),e.jsx("span",{className:"stp-consented-badge",children:"✓ Consented"})]}),e.jsxs("div",{className:"stp-prev",children:["Previously applied: ",e.jsx("strong",{children:X.last_applied_vacancy})]}),e.jsxs("div",{className:"stp-pills-row",children:[e.jsxs("span",{className:"stp-pill stp-pill-gold",children:[X.overall_experience," exp"]}),e.jsx("span",{className:"stp-pill stp-pill-light",children:X.qualification}),X.last_status==="shortlisted"&&e.jsx("span",{className:"stp-pill stp-pill-green",children:"Favored"})]})]}),e.jsxs("div",{className:"stp-action",children:[e.jsxs("a",{href:`mailto:${X.email}?subject=Exciting Opportunity at George Steuart`,className:"stp-invite-btn",onClick:Ze=>Ze.stopPropagation(),children:[e.jsx(cr,{size:14})," Invite"]}),e.jsxs("button",{className:"stp-view-btn",onClick:Ze=>{Ze.stopPropagation(),_({...X,is_suggestion:!0})},children:["View ",e.jsx(Tr,{size:13})]})]})]})},Me)})}),e.jsx("style",{children:`
                        .stp-section {
                            margin-bottom: 36px;
                            border-radius: 20px;
                            overflow: hidden;
                            border: 1px solid rgba(200,169,81,0.2);
                            box-shadow: 0 8px 30px rgba(0,0,0,0.06);
                        }
                        .stp-header-banner {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            background: linear-gradient(135deg, #2a050b 0%, var(--crimson-dark) 100%);
                            padding: 22px 28px;
                            gap: 20px;
                        }
                        .stp-teaser {
                            cursor: pointer;
                            user-select: none;
                            transition: opacity 0.15s;
                        }
                        .stp-teaser:hover { opacity: 0.92; }
                        .stp-chevron { transition: transform 0.3s ease; }
                        .stp-header-left {
                            display: flex;
                            align-items: center;
                            gap: 16px;
                        }
                        .stp-icon-wrap {
                            font-size: 1.8rem;
                            width: 52px;
                            height: 52px;
                            background: rgba(200,169,81,0.15);
                            border: 1px solid rgba(200,169,81,0.3);
                            border-radius: 14px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-shrink: 0;
                        }
                        .stp-title {
                            color: #fff;
                            font-family: var(--font-heading, serif);
                            font-size: 1.25rem;
                            margin: 0 0 4px 0;
                            font-weight: 700;
                        }
                        .stp-subtitle {
                            color: rgba(255,255,255,0.55);
                            font-size: 0.8rem;
                            margin: 0;
                        }
                        .stp-match-badge {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            background: rgba(200,169,81,0.12);
                            border: 1px solid rgba(200,169,81,0.35);
                            border-radius: 14px;
                            padding: 10px 20px;
                            flex-shrink: 0;
                        }
                        .stp-count {
                            font-size: 1.8rem;
                            font-weight: 800;
                            color: var(--gold-accent, #c8a951);
                            line-height: 1;
                        }
                        .stp-count-label {
                            font-size: 0.65rem;
                            color: rgba(200,169,81,0.7);
                            text-transform: uppercase;
                            letter-spacing: 0.8px;
                            font-weight: 600;
                        }
                        .stp-cards-grid {
                            background: #fafbfc;
                            display: flex;
                            flex-direction: column;
                        }
                        .stp-card {
                            cursor: pointer;
                            border-bottom: 1px solid #f0f1f5;
                            transition: background 0.2s;
                        }
                        .stp-card:last-child { border-bottom: none; }
                        .stp-card:hover { background: #fff; }
                        .stp-card-inner {
                            display: flex;
                            align-items: center;
                            gap: 18px;
                            padding: 18px 28px;
                        }
                        .stp-avatar {
                            width: 48px;
                            height: 48px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, var(--crimson-dark), var(--crimson));
                            color: #fff;
                            font-weight: 800;
                            font-size: 1rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-shrink: 0;
                            letter-spacing: 1px;
                        }
                        .stp-info { flex: 1; min-width: 0; }
                        .stp-name-row {
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            margin-bottom: 4px;
                        }
                        .stp-name {
                            font-weight: 700;
                            color: var(--text-primary, #1a1a2e);
                            font-size: 0.95rem;
                        }
                        .stp-consented-badge {
                            font-size: 0.6rem;
                            background: #ecfdf5;
                            color: #059669;
                            border: 1px solid #a7f3d0;
                            padding: 2px 7px;
                            border-radius: 100px;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }
                        .stp-prev {
                            font-size: 0.78rem;
                            color: var(--text-muted, #94a3b8);
                            margin-bottom: 8px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .stp-prev strong { color: #475569; }
                        .stp-pills-row { display: flex; gap: 6px; flex-wrap: wrap; }
                        .stp-pill {
                            font-size: 0.7rem;
                            font-weight: 700;
                            padding: 2px 9px;
                            border-radius: 100px;
                        }
                        .stp-pill-gold {
                            background: rgba(200,169,81,0.1);
                            color: var(--gold-accent, #c8a951);
                            border: 1px solid rgba(200,169,81,0.25);
                        }
                        .stp-pill-light { background: #f1f5f9; color: #475569; }
                        .stp-pill-green { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
                        .stp-action { display: flex; gap: 8px; flex-shrink: 0; align-items: center; }
                        .stp-invite-btn {
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            background: var(--gold-accent, #c8a951);
                            color: #fff;
                            font-size: 0.8rem;
                            font-weight: 700;
                            padding: 7px 14px;
                            border-radius: 8px;
                            text-decoration: none;
                            transition: opacity 0.2s, transform 0.2s;
                        }
                        .stp-invite-btn:hover { opacity: 0.88; transform: translateY(-1px); }
                        .stp-view-btn {
                            display: flex;
                            align-items: center;
                            gap: 4px;
                            background: none;
                            border: 1.5px solid #e2e8f0;
                            color: #475569;
                            font-size: 0.8rem;
                            font-weight: 600;
                            padding: 7px 12px;
                            border-radius: 8px;
                            cursor: pointer;
                            transition: all 0.2s;
                            font-family: inherit;
                        }
                        .stp-view-btn:hover { border-color: var(--crimson, #8b1a2b); color: var(--crimson, #8b1a2b); }
                        @media (max-width: 640px) {
                            .stp-card-inner { flex-wrap: wrap; }
                            .stp-action { width: 100%; justify-content: flex-end; }
                        }
                    `})]}),e.jsxs("div",{className:"orchestration-table-wrapper card-p",style:{marginBottom:"16px"},children:[e.jsxs("div",{style:{padding:"24px",borderBottom:"1px solid #f0f2f5",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[e.jsxs("span",{style:{fontSize:"0.85rem",color:"var(--text-muted)",fontWeight:"600",textTransform:"uppercase",letterSpacing:"1px"},children:["Showing ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:kt.length})," candidates"]}),Q.length>0&&e.jsxs("div",{className:"bulk-selection-badge animated-fade-in",children:[e.jsx("strong",{children:Q.length})," Selected"]})]}),Q.length>0&&e.jsxs("button",{className:"btn btn-danger-minimal",onClick:()=>P(!0),style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",borderRadius:"12px"},children:[e.jsx(Mh,{})," Bulk Delete"]})]}),j?e.jsxs("div",{className:"loading-state-p",children:[e.jsx("div",{className:"spinner-p"}),e.jsx("p",{children:"Synchronizing pipeline data..."})]}):kt.length===0?e.jsxs("div",{className:"empty-state-p",children:[e.jsx("div",{className:"empty-icon",children:e.jsx(kr,{})}),e.jsx("h3",{children:"No prospects found"}),e.jsx("p",{children:"We couldn't find any candidates matching your current filters."}),e.jsx("button",{className:"btn btn-outline",onClick:De,children:"Reset Console"})]}):e.jsxs("div",{className:"premium-table-container",children:[e.jsxs("table",{className:"premium-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:"40px"},children:e.jsx("input",{type:"checkbox",className:"premium-checkbox",onChange:Fe,checked:Mr.length>0&&Q.length===Mr.length})}),e.jsx("th",{children:"Candidate"}),e.jsx("th",{children:"Target Position"}),e.jsx("th",{children:"Credentials"}),e.jsx("th",{children:"Applied Timeline"}),e.jsx("th",{children:"Actions"})]})}),e.jsx("tbody",{children:Mr.map(X=>{var Me,Ge;return e.jsxs("tr",{className:Q.includes(X.id)?"row-selected":"",children:[e.jsx("td",{children:e.jsx("input",{type:"checkbox",className:"premium-checkbox",checked:Q.includes(X.id),onChange:()=>mt(X.id),onClick:Ve=>Ve.stopPropagation()})}),e.jsx("td",{children:e.jsxs("div",{className:"candidate-cell",children:[e.jsxs("div",{className:"candidate-avatar",children:[(Me=X.first_name)==null?void 0:Me[0],(Ge=X.last_name)==null?void 0:Ge[0]]}),e.jsxs("div",{className:"candidate-info",children:[e.jsxs("div",{className:"name",children:[X.first_name," ",X.last_name,e.jsx("span",{className:`status-pill status-${(X.status||"pending").replace("_","-")}`,children:(X.status||"pending").replace("_"," ")}),X.is_email_blocked==1&&e.jsxs("span",{title:"This email has been blocked in the Talent Pool",style:{background:"#fef2f2",color:"#dc2626",padding:"2px 7px",borderRadius:100,fontSize:"0.6rem",fontWeight:800,display:"inline-flex",alignItems:"center",gap:3,cursor:"help"},children:[e.jsx(Ln,{size:9})," Blocked"]})]}),e.jsxs("div",{className:"email",children:[e.jsx(cr,{size:12})," ",X.email]})]})]})}),e.jsx("td",{children:e.jsxs("div",{className:"position-cell",style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("img",{src:X.company_logo?`${T1}/uploads/logos/${X.company_logo}`:"/gs-logo.png",alt:X.company_name,onError:Ve=>Ve.target.src="/gs-logo.png",style:{width:"32px",height:"32px",objectFit:"contain",borderRadius:"6px",background:"#fff",border:"1px solid #e2e8f0",padding:"3px",flexShrink:0}}),e.jsxs("div",{children:[X.job_ref&&e.jsxs("span",{className:"ref-badge",children:["#",X.job_ref]}),e.jsx("h4",{className:"position-title",style:{margin:0},children:X.vacancy_title}),e.jsx("div",{className:"company-name",style:{margin:0},children:X.company_name})]})]})}),e.jsx("td",{children:e.jsxs("div",{className:"credentials-cell",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7},children:[e.jsx("span",{className:"exp-badge",children:X.overall_experience}),I.vacancy_id&&(Kr(X).details.isQualified?e.jsx("div",{className:"match-indicator qualified",title:"Meets/Exceeds Required Experience",children:e.jsx(Tt,{})}):e.jsx("div",{className:"match-indicator under",title:"Below Required Experience",children:e.jsx(Lr,{})}))]}),e.jsx("div",{className:"degree-txt",children:X.qualification})]})}),e.jsx("td",{children:e.jsxs("div",{className:"timeline-cell",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",color:"var(--text-primary)",fontWeight:600,whiteSpace:"nowrap"},children:[e.jsx(qt,{size:14,style:{color:"var(--gold-accent)"}}),yf(X.applied_at)]}),X.status==="shortlisted"&&X.interview_date&&e.jsxs("div",{className:"schedule-widget",children:[e.jsxs("div",{className:"schedule-header",children:[e.jsx(qt,{size:12})," Scheduled"]}),e.jsx("div",{className:"schedule-time",children:on(X.interview_date)}),e.jsx("div",{className:"schedule-time",style:{fontSize:"0.75rem",color:"var(--text-muted)"},children:X.interview_time})]})]})}),e.jsx("td",{children:e.jsxs("div",{className:"actions-cell",children:[X.status==="shortlisted"?X.interview_date?e.jsx("span",{title:"Interview already sent",style:{display:"flex",alignItems:"center",gap:5,fontSize:"0.75rem",fontWeight:700,color:"#38a169",background:"#f0fff4",border:"1px solid #c6f6d5",borderRadius:8,padding:"6px 10px"},children:"✅ Invited"}):e.jsx("button",{className:"action-btn success",title:"Send Interview Invite",style:{background:"#ebf8ff",color:"#2b6cb0",border:"1px solid #bee3f8"},onClick:Ve=>{Ve.stopPropagation(),He(X),_e(!0)},children:"📩"}):e.jsx("button",{className:"action-btn success",title:"Shortlist Candidate",onClick:Ve=>{Ve.stopPropagation(),_(X),Ne(!0)},children:e.jsx(Tt,{size:18})}),e.jsx("button",{className:"action-btn details",title:"View Details",onClick:()=>_(X),children:e.jsx(na,{size:18})})]})})]},X.id)})})]}),e.jsxs("div",{className:"pagination-footer",children:[e.jsxs("div",{className:"page-info",children:["Showing ",e.jsxs("strong",{children:[Dr+1,"-",Math.min(Dr+oe,kt.length)]})," of ",e.jsx("strong",{children:kt.length})," candidates"]}),e.jsxs("div",{className:"pagination-controls",children:[e.jsxs("button",{className:"page-btn",onClick:()=>se(X=>Math.max(X-1,1)),disabled:ve===1,title:"Previous Page",children:[e.jsx(Ro,{})," Previous"]}),e.jsxs("button",{className:"page-btn",onClick:()=>se(X=>Math.min(X+1,Fr)),disabled:ve===Fr||Fr===0,title:"Next Page",children:["Next ",e.jsx(Tr,{})]})]})]})]})]}),w&&e.jsx("div",{className:"confirm-overlay",onClick:()=>_(null),children:e.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:X=>X.stopPropagation(),style:{maxWidth:"1000px",width:"95%",textAlign:"left",overflow:"hidden"},children:[e.jsxs("div",{className:"modal-header-p",style:{background:"var(--bg-primary)",borderBottom:"1px solid #f1f5f9",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{className:"header-info-p",style:{display:"flex",alignItems:"center",gap:"24px"},children:[e.jsxs("div",{className:"modal-avatar",style:{width:"80px",height:"80px",borderRadius:"24px",background:"var(--ivory-dark)",color:"var(--crimson)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",border:"1px solid rgba(200, 169, 81, 0.3)"},children:[(pn=w.first_name)==null?void 0:pn[0],(pr=w.last_name)==null?void 0:pr[0]]}),e.jsxs("div",{children:[e.jsxs("h2",{style:{fontFamily:"var(--font-heading)",fontSize:"2.4rem",letterSpacing:"-1px",margin:0,color:"var(--text-primary)",display:"flex",alignItems:"center",gap:"16px"},children:[w.first_name," ",w.last_name,e.jsx("span",{className:`status-badge-p badge-${w.status||"pending"}`,children:(w.status||"pending").replace("_"," ")})]}),e.jsx("p",{style:{color:"var(--gold-accent)",fontWeight:700,textTransform:"uppercase",fontSize:"0.75rem",letterSpacing:"1px",margin:"4px 0 0 0"},children:w.is_suggestion?"Pool Candidate":`${w.vacancy_title} Prospect`})]})]}),e.jsx("button",{className:"o-btn delete",onClick:()=>_(null),children:e.jsx(ct,{})})]}),e.jsxs("div",{className:"modal-body-p",style:{overflowY:"auto",maxHeight:"70vh"},children:[w.is_suggestion&&e.jsx("div",{className:"detail-notice",style:{background:"#ecfdf5",padding:"16px 20px",borderRadius:"16px",border:"1px solid #a7f3d0",color:"#065f46",fontSize:"0.9rem",marginBottom:"32px"},children:e.jsxs("p",{style:{margin:0},children:['This prospect matched your criteria from the Talent Pool. They previously applied for "',w.last_applied_vacancy,'" and consented to being contacted for future roles.']})}),e.jsxs("div",{className:"detail-grid-p admin-grid-2",style:{gap:"24px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))"},children:[e.jsxs("div",{className:"detail-section-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Contact Protocols"}),e.jsxs("div",{className:"submission-box-p",style:{display:"flex",flexDirection:"column",gap:"24px",background:"#fcfcfd"},children:[e.jsxs("div",{className:"contact-item-p",style:{display:"flex",gap:"16px",alignItems:"flex-start"},children:[e.jsx(cr,{style:{marginTop:"4px",color:"var(--gold-accent)",fontSize:"1.2rem",flexShrink:0}}),e.jsxs("div",{children:[e.jsx("span",{style:{display:"block",fontSize:"0.7rem",color:"var(--text-muted)",fontWeight:700,textTransform:"uppercase",marginBottom:"2px"},children:"Email Dispatch"}),e.jsx("p",{style:{margin:0,fontWeight:700,color:"var(--text-primary)",fontSize:"1rem",lineHeight:"1.4"},children:w.email})]})]}),e.jsxs("div",{className:"contact-item-p",style:{display:"flex",gap:"16px",alignItems:"flex-start"},children:[e.jsx(sd,{style:{marginTop:"4px",color:"var(--gold-accent)",fontSize:"1.2rem",flexShrink:0}}),e.jsxs("div",{children:[e.jsx("span",{style:{display:"block",fontSize:"0.7rem",color:"var(--text-muted)",fontWeight:700,textTransform:"uppercase",marginBottom:"2px"},children:"Direct Line"}),e.jsx("p",{style:{margin:0,fontWeight:700,color:"var(--text-primary)",fontSize:"1rem",lineHeight:"1.4"},children:w.contact_number})]})]})]})]}),e.jsxs("div",{className:"detail-section-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Professional Profile"}),e.jsxs("div",{className:"submission-box-p",style:{gridTemplateColumns:"1fr 1fr 1fr",background:"#fcfcfd"},children:[e.jsxs("div",{className:"sm-item",children:[e.jsx("span",{children:"Overall Exp."}),e.jsx("p",{children:w.overall_experience})]}),e.jsxs("div",{className:"sm-item",children:[e.jsx("span",{children:"Relevant Exp."}),e.jsx("p",{children:w.relevant_experience})]}),e.jsxs("div",{className:"sm-item",children:[e.jsx("span",{children:"Qualification"}),e.jsx("p",{children:w.qualification})]})]})]}),e.jsxs("div",{className:"detail-section-p full-width",children:[e.jsx("label",{children:"Submission Details"}),e.jsxs("div",{className:"submission-box-p",style:{gridTemplateColumns:"1fr 0.8fr 2fr",background:"#fcfcfd",alignItems:"start",width:"100%",boxSizing:"border-box",gap:"16px"},children:[e.jsxs("div",{className:"sm-item",children:[e.jsx("span",{children:w.is_suggestion?"Previously Applied to":"Company"}),e.jsx("p",{children:w.is_suggestion?w.last_applied_vacancy:w.company_name})]}),e.jsxs("div",{className:"sm-item",children:[e.jsx("span",{style:{whiteSpace:"nowrap"},children:"Salary Expectation"}),e.jsx("p",{children:w.salary_expectation||"Not specified"})]}),e.jsxs("div",{className:"sm-item",children:[e.jsx("span",{children:"Applied Date"}),e.jsxs("p",{style:{whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:"8px",fontSize:"0.85rem"},children:[e.jsx(qt,{size:14,style:{color:"var(--gold-accent)"}}),yf(w.applied_at)]})]})]}),w.status==="rejected"&&w.rejection_reason&&e.jsxs("div",{className:"rejection-reason-box mt-3",children:[e.jsx("span",{children:"Rejection Reason"}),e.jsx("p",{children:w.rejection_reason})]}),!!(w.is_blocked==1||w.is_email_blocked)&&e.jsxs("div",{className:"rejection-reason-box mt-3",style:{border:"1px solid #fee2e2",background:"#fef2f2",color:"#991b1b"},children:[e.jsxs("span",{style:{color:"#dc2626",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx(Ln,{size:14})," BLOCK REASON (ADMIN ONLY)"]}),e.jsx("p",{style:{color:"#991b1b",fontWeight:600},children:w.block_reason||"No reason specified"})]}),w.status==="shortlisted"&&w.interview_date&&e.jsxs("div",{className:"detail-section-p full-width",style:{marginTop:"32px"},children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Confirmed Interview Schedule"}),e.jsxs("div",{className:"submission-box-p",style:{background:"#f8fafc",border:"1px solid #e2e8f0",gridTemplateColumns:"1fr 1.5fr 1.5fr",marginTop:"12px",alignItems:"start"},children:[e.jsxs("div",{className:"sm-item",children:[e.jsx("span",{children:"Medium / Type"}),e.jsxs("p",{style:{display:"flex",alignItems:"center",gap:"8px",color:"var(--text-primary)"},children:[e.jsx(Ab,{style:{color:"var(--gold-accent)"}})," ",w.interview_type]})]}),e.jsxs("div",{className:"sm-item",children:[e.jsx("span",{children:"Date & Duration"}),e.jsxs("p",{style:{display:"flex",alignItems:"center",gap:"8px",color:"var(--text-primary)"},children:[e.jsx(qt,{style:{color:"var(--gold-accent)"}})," ",on(w.interview_date)," at ",w.interview_time]})]}),e.jsxs("div",{className:"sm-item",children:[e.jsx("span",{children:"Location / Resource"}),e.jsxs("p",{style:{fontSize:"0.85rem",wordBreak:"break-all",display:"flex",alignItems:"flex-start",gap:"8px",color:"var(--text-primary)"},children:[e.jsx(xt,{style:{color:"var(--gold-accent)",marginTop:"4px"}})," ",w.interview_location]})]})]})]})]})]}),e.jsx("div",{className:"cv-preview-section-p",children:e.jsxs("div",{className:"cv-banner-p",children:[e.jsx("div",{className:"cb-icon",children:e.jsx(qr,{})}),e.jsxs("div",{className:"cb-text",children:[e.jsx("span",{children:"Curriculum Vitae"}),e.jsxs("p",{children:[w.first_name,"_CV_",w.is_suggestion?"Pool":(w.vacancy_title||"Document").replace(/\s+/g,"_"),".",(w.cv_path||"").split(".").pop()||"pdf"]})]}),e.jsxs("button",{className:"btn btn-gold",onClick:()=>J(w),children:[e.jsx(Ia,{})," View Document"]})]})})]}),e.jsx("div",{className:"modal-actions-footer-p",style:{display:"flex",justifyContent:"flex-end",gap:"12px"},children:w.status==="rejected"?e.jsx("button",{className:"btn btn-outline",style:{borderRadius:"12px",padding:"10px 24px",fontWeight:600},onClick:()=>_(null),children:"Close"}):w.status==="shortlisted"?e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-outline",style:{borderRadius:"12px",padding:"10px 24px",fontWeight:600},onClick:()=>_(null),children:"Close"}),!w.interview_date&&e.jsx("button",{className:"btn-status-action btn-status-shortlist",onClick:()=>{He(w),_(null),_e(!0)},children:"📩 Send Interview Invite"}),w.interview_date&&e.jsx("button",{className:"btn-status-action btn-status-shortlist",onClick:()=>{He(w),_(null),_e(!0)},children:"🔁 Re-send Invite"})]}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-outline",style:{borderRadius:"12px",padding:"10px 24px",fontWeight:600},onClick:()=>_(null),children:"Cancel"}),e.jsx("button",{className:"btn-status-action btn-status-pending",onClick:()=>vt(w.id,"pending"),disabled:D||w.status==="pending",children:"Mark Pending"}),e.jsx("button",{className:"btn-status-action btn-status-review",onClick:()=>vt(w.id,"under_review"),disabled:D||w.status==="under_review",children:"Under Review"}),e.jsx("button",{className:"btn-status-action btn-status-reject",onClick:()=>x(!0),disabled:D,children:"Reject Candidacy"}),e.jsx("button",{className:"btn-status-action btn-status-shortlist",onClick:()=>Ne(!0),disabled:D,children:"✓ Shortlist"})]})})]})}),v&&e.jsx("div",{className:"confirm-overlay",style:{zIndex:1100},onClick:()=>x(!1),children:e.jsxs("div",{className:"confirm-modal card-p animated-zoom",style:{maxWidth:"500px",width:"90%"},onClick:X=>X.stopPropagation(),children:[e.jsxs("div",{className:"modal-header-p",style:{borderBottom:"1px solid #f1f5f9"},children:[e.jsx("h2",{children:"Reject Application"}),e.jsx("button",{className:"close-btn-p",onClick:()=>{x(!1),T("")},children:e.jsx(ct,{})})]}),e.jsxs("div",{className:"modal-body-p",children:[e.jsxs("p",{style:{marginBottom:"16px",color:"var(--text-muted)"},children:["Please provide a reason for rejecting ",e.jsxs("strong",{children:[w==null?void 0:w.first_name," ",w==null?void 0:w.last_name]}),". This will be sent to the applicant via email."]}),e.jsx("textarea",{className:"styled-input",rows:"4",style:{width:"100%",padding:"12px",borderRadius:"8px",border:"1px solid #e2e8f0",resize:"none"},placeholder:"E.g., Does not meet the minimum experience requirements...",value:z,onChange:X=>T(X.target.value)}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px",borderTop:"1px solid #f1f5f9",paddingTop:"24px"},children:[e.jsx("button",{className:"btn btn-outline",style:{borderRadius:"12px",padding:"12px 24px",fontWeight:600},onClick:()=>x(!1),children:"Keep Candidate"}),e.jsx("button",{className:"btn-status-action btn-status-reject",onClick:()=>vt(w.id,"rejected",z),disabled:D||!z.trim(),children:D?"Rejecting...":"Confirm Rejection"})]})]})]})}),te&&w&&e.jsx("div",{className:"confirm-overlay",style:{zIndex:1100},onClick:()=>Ne(!1),children:e.jsxs("div",{className:"confirm-modal card-p animated-zoom",style:{maxWidth:"460px",width:"90%",textAlign:"center",padding:"40px"},onClick:X=>X.stopPropagation(),children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:"16px"},children:"✅"}),e.jsx("h2",{style:{fontSize:"1.4rem",marginBottom:"10px",color:"var(--text-primary)"},children:"Shortlist Candidate?"}),e.jsxs("p",{style:{color:"var(--text-muted)",marginBottom:"8px",lineHeight:1.6},children:["You are about to shortlist ",e.jsxs("strong",{style:{color:"var(--text-primary)"},children:[w.first_name," ",w.last_name]})," for ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:w.vacancy_title}),"."]}),e.jsxs("p",{style:{color:"#b8860b",fontSize:"0.85rem",background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"10px 14px",marginBottom:28},children:["📩 No email will be sent yet. Use ",e.jsx("strong",{children:'"Send Interview Invite"'})," as the next step."]}),e.jsxs("div",{style:{display:"flex",gap:12,justifyContent:"center"},children:[e.jsx("button",{className:"btn btn-outline",style:{borderRadius:12,padding:"12px 24px",fontWeight:600},onClick:()=>Ne(!1),children:"Cancel"}),e.jsx("button",{className:"btn-status-action btn-status-shortlist",onClick:()=>Yr(w),disabled:D,children:D?"Shortlisting…":"Confirm Shortlist"})]})]})}),Te&&ze&&e.jsx("div",{className:"confirm-overlay",style:{zIndex:1100},onClick:Nr,children:e.jsxs("div",{className:"confirm-modal card-p animated-zoom",style:{maxWidth:"550px",width:"90%"},onClick:X=>X.stopPropagation(),children:[e.jsxs("div",{className:"modal-header-p",style:{borderBottom:"1px solid #f1f5f9"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("div",{style:{background:"#ebf8ff",color:"#3182ce",padding:"8px",borderRadius:"8px",display:"flex"},children:e.jsx(cr,{size:20})}),e.jsxs("div",{children:[e.jsx("h2",{style:{margin:0},children:"Send Interview Invitation"}),e.jsxs("p",{style:{margin:"2px 0 0",fontSize:"0.8rem",color:"var(--text-muted)"},children:["To: ",e.jsxs("strong",{children:[ze.first_name," ",ze.last_name]})," — ",ze.vacancy_title]})]})]}),e.jsx("button",{className:"close-btn-p",onClick:Nr,children:e.jsx(ct,{})})]}),e.jsxs("div",{className:"modal-body-p",children:[e.jsxs("div",{style:{gap:"16px",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",fontWeight:700,marginBottom:"6px",color:"var(--text-secondary)"},children:"Interview Type"}),e.jsxs("select",{className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0"},value:Ae.interview_type,onChange:X=>{y({...Ae,interview_type:X.target.value,interview_location:"",interview_location_link:""}),re("")},children:[e.jsx("option",{value:"Online",children:"Online / Virtual"}),e.jsx("option",{value:"On-site",children:"On-site / Physical"})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",fontWeight:700,marginBottom:"6px",color:"var(--text-secondary)"},children:"Interview Date"}),e.jsx("input",{type:"date",className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0"},value:Ae.interview_date,onChange:X=>y({...Ae,interview_date:X.target.value})})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",fontWeight:700,marginBottom:"6px",color:"var(--text-secondary)"},children:"Interview Time"}),e.jsx("input",{type:"time",className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0"},value:Ae.interview_time,onChange:X=>y({...Ae,interview_time:X.target.value})})]})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",fontWeight:700,marginBottom:"6px",color:"var(--text-secondary)"},children:Ae.interview_type==="Online"?"Meeting Link (Zoom/Teams/Meet)":"Interview Location (Address)"}),Ae.interview_type==="Online"?e.jsx("input",{type:"text",className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0"},placeholder:"Zoom / Teams / Google Meet link…",value:Ae.interview_location,onChange:X=>y({...Ae,interview_location:X.target.value})}):e.jsxs(e.Fragment,{children:[e.jsxs("select",{className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0",marginBottom:he==="Other"?"10px":0},value:he,onChange:X=>{const Me=X.target.value;if(re(Me),Me&&Me!=="Other"){const Ge=parseInt(Me),Ve=h.find(Ze=>Ze.id===Ge);if(Ve){const Ze=u.find(hr=>hr.id===Ve.company_id),fr=Ze?Ze.location:"";y({...Ae,interview_location:`${Ve.company_name} — ${Ve.location}`,interview_location_link:fr||""})}}else y({...Ae,interview_location:"",interview_location_link:""})},children:[e.jsx("option",{value:"",children:"— Select a location —"}),u.map(X=>{const Me=h.filter(Ge=>Ge.company_id===X.id);return Me.length===0?null:e.jsx("optgroup",{label:X.name,children:Me.map(Ge=>e.jsx("option",{value:Ge.id,children:Ge.location},Ge.id))},X.id)}),e.jsx("option",{value:"Other",children:"✏️ Other (type manually)"})]}),he==="Other"&&e.jsx("input",{type:"text",className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #c8a951",outline:"none"},placeholder:"Enter full address or room name…",value:Ae.interview_location,onChange:X=>y({...Ae,interview_location:X.target.value}),autoFocus:!0}),e.jsxs("div",{style:{marginTop:"12px"},children:[e.jsx("label",{style:{display:"block",fontSize:"0.7rem",fontWeight:700,marginBottom:"4px",color:"var(--text-muted)",textTransform:"uppercase"},children:"Location Map Link (Optional)"}),e.jsx("input",{type:"text",className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0",fontSize:"0.85rem"},placeholder:"Paste Google Maps link here...",value:Ae.interview_location_link,onChange:X=>y({...Ae,interview_location_link:X.target.value})}),e.jsx("p",{style:{fontSize:"0.7rem",color:"#94a3b8",margin:"4px 0 0 4px"},children:"Provide a map link to help the candidate find the location easily."})]})]})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px",borderTop:"1px solid #f1f5f9",paddingTop:"24px"},children:[e.jsx("button",{className:"btn btn-outline",style:{borderRadius:"12px",padding:"12px 24px",fontWeight:600},onClick:Nr,children:"Cancel"}),e.jsx("button",{className:"btn-status-action btn-status-shortlist",onClick:at,disabled:Qe||!Ae.interview_date||!Ae.interview_time||!Ae.interview_location,children:Qe?"Sending…":"📩 Send Interview Email"})]})]})]})}),g&&e.jsx("div",{className:"confirm-overlay",style:{zIndex:1100},onClick:()=>S(!1),children:e.jsxs("div",{className:"confirm-modal card-p animated-zoom",style:{maxWidth:"550px",width:"90%"},onClick:X=>X.stopPropagation(),children:[e.jsxs("div",{className:"modal-header-p",style:{borderBottom:"1px solid #f1f5f9"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("div",{style:{background:"#ecfdf5",color:"#10b981",padding:"8px",borderRadius:"8px",display:"flex"},children:e.jsx(Tt,{size:20})}),e.jsx("h2",{children:"Shortlist Candidate"})]}),e.jsx("button",{className:"close-btn-p",onClick:()=>S(!1),children:e.jsx(ct,{})})]}),e.jsxs("div",{className:"modal-body-p",children:[e.jsxs("p",{style:{marginBottom:"24px",color:"var(--text-secondary)",fontSize:"0.95rem",lineHeight:"1.5"},children:["You are about to shortlist ",e.jsxs("strong",{style:{color:"var(--text-primary)"},children:[(w==null?void 0:w.first_name)||""," ",(w==null?void 0:w.last_name)||"this candidate"]}),". Please enter the interview details below to be included in the invitation email."]}),e.jsxs("div",{className:"admin-grid-1",style:{gap:"16px"},children:[e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",fontWeight:700,marginBottom:"6px",color:"var(--text-secondary)"},children:"Interview Type"}),e.jsxs("select",{className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0"},value:E.interview_type,onChange:X=>A({...E,interview_type:X.target.value}),children:[e.jsx("option",{value:"Online",children:"Online / Virtual"}),e.jsx("option",{value:"On-site",children:"On-site / Physical"})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",fontWeight:700,marginBottom:"6px",color:"var(--text-secondary)"},children:"Interview Date"}),e.jsx("input",{type:"date",className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0"},value:E.interview_date,onChange:X=>A({...E,interview_date:X.target.value})})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",fontWeight:700,marginBottom:"6px",color:"var(--text-secondary)"},children:"Interview Time"}),e.jsx("input",{type:"time",className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0"},value:E.interview_time,onChange:X=>A({...E,interview_time:X.target.value})})]})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",fontWeight:700,marginBottom:"6px",color:"var(--text-secondary)"},children:"Location / Meeting Link"}),e.jsx("input",{type:"text",className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0"},placeholder:E.interview_type==="Online"?"Zoom, Teams link, etc.":"Office address, Boardroom name, etc.",value:E.interview_location,onChange:X=>A({...E,interview_location:X.target.value})})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px",borderTop:"1px solid #f1f5f9",paddingTop:"24px"},children:[e.jsx("button",{className:"btn btn-outline",style:{borderRadius:"12px",padding:"12px 24px",fontWeight:600},onClick:()=>S(!1),children:"Cancel"}),e.jsx("button",{className:"btn-status-action btn-status-shortlist",onClick:()=>vt(w.id,"shortlisted","",E),disabled:D||!E.interview_date||!E.interview_time||!E.interview_location,children:D?"Sending...":"Confirm & Send Invitation"})]})]})]})}),R&&e.jsx("div",{className:"confirm-overlay animated-fade-in",style:{zIndex:1210},onClick:()=>P(!1),children:e.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:X=>X.stopPropagation(),style:{maxWidth:"450px",textAlign:"center",padding:"40px"},children:[e.jsx("div",{className:"warning-visual",children:e.jsx(aa,{})}),e.jsx("h2",{style:{fontSize:"1.5rem",marginBottom:"12px",color:"var(--text-primary)"},children:"Confirm Bulk Deletion"}),e.jsxs("p",{style:{color:"var(--text-secondary)",marginBottom:"32px",lineHeight:"1.6"},children:["You are about to permanently delete ",e.jsx("strong",{children:Q.length})," selected applications. This action cannot be undone. Are you sure you want to proceed?"]}),e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsx("button",{className:"btn btn-outline",onClick:()=>P(!1),style:{flex:1,padding:"14px",borderRadius:"12px",fontWeight:600},children:"Cancel"}),e.jsx("button",{className:"btn",onClick:nr,disabled:W,style:{flex:1,background:"var(--crimson)",color:"#fff",border:"none",padding:"14px",borderRadius:"12px",fontWeight:700},children:W?"Deleting...":"Confirm Delete"})]})]})}),e.jsx("style",{jsx:"true",children:`
                .manage-vacancies-console {
                    animation: fadeIn 0.4s ease-out;
                }

                /* HEREO / HEADER SECTION */
                .vacancies-orchestration-header {
                    position: relative;
                    padding: 24px;
                    border-radius: 24px;
                    overflow: hidden;
                    margin-bottom: 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    background: linear-gradient(135deg, #2a050b 0%, var(--crimson-dark) 100%);
                    box-shadow: 0 10px 30px rgba(139, 26, 43, 0.15);
                }

                .hero-bg-accent {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        radial-gradient(circle at 80% 20%, rgba(200, 169, 81, 0.15) 0%, transparent 40%),
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 100% 100%, 40px 40px, 40px 40px;
                    background-position: center;
                    opacity: 0.6;
                    pointer-events: none;
                }

                .header-content-p { position: relative; z-index: 2; }

                .console-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.2);
                    padding: 6px 14px;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #e2e8f0;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    margin-bottom: 16px;
                    backdrop-filter: blur(4px);
                }

                .live-dot {
                    width: 6px;
                    height: 6px;
                    background: #10b981;
                    border-radius: 50%;
                }

                .serif-title-p {
                    font-family: var(--font-heading);
                    font-size: 1.8rem;
                    color: #fff;
                    margin: 0 0 8px 0;
                    letter-spacing: -0.5px;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.2);
                }

                .hero-subline {
                    color: rgba(255,255,255,0.7);
                    font-size: 0.9rem;
                    margin: 0;
                    max-width: 600px;
                    line-height: 1.5;
                }

                .btn-establish-p {
                    background: linear-gradient(135deg, var(--gold-accent) 0%, #d4b86a 100%);
                    color: #1a1a2e;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 12px;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 10px 30px rgba(200, 169, 81, 0.3);
                    z-index: 10;
                    font-size: 0.95rem;
                }

                .btn-establish-p:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(200, 169, 81, 0.4);
                    background: #d4b86a;
                }

                /* TOOLBAR REFINEMENT */
                .console-toolbar-p {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                    margin-bottom: 24px;
                    background: #fff;
                    padding: 24px;
                    border-radius: 20px;
                    border: 1px solid #eef2f6;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                }

                .toolbar-search-row {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .search-orchestrator {
                    position: relative;
                    flex: 1;
                }

                .s-icon {
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    font-size: 1.1rem;
                    pointer-events: none;
                    z-index: 2;
                }

                .search-orchestrator input {
                    width: 100%;
                    padding: 14px 20px 14px 52px;
                    border-radius: 12px;
                    border: 1.5px solid #edf2f7;
                    background: #f8fafc;
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    color: var(--text-primary);
                    font-family: inherit;
                    box-sizing: border-box;
                }

                .search-orchestrator input:focus {
                    outline: none;
                    background: #fff;
                    border-color: var(--crimson);
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.04);
                }

                .btn-reset-console {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 20px;
                    border-radius: 12px;
                    border: 1.5px solid #edf2f7;
                    background: #f8fafc;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    white-space: nowrap;
                    font-family: inherit;
                }

                .btn-reset-console:hover {
                    background: #fff;
                    border-color: #cbd5e1;
                    color: var(--text-primary);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.04);
                }

                .toolbar-divider {
                    height: 1px;
                    background: #f1f5f9;
                    width: 100%;
                }

                .toolbar-filters-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                }

                .filter-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 1;
                    min-width: 120px;
                }

                .filter-label {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    padding-left: 2px;
                }

                .select-orchestrator {
                    position: relative;
                    width: 100%;
                }

                .select-lg {
                    min-width: 200px;
                }

                .select-orchestrator select {
                    width: 100%;
                    padding: 12px 36px 12px 40px;
                    border-radius: 10px;
                    border: 1.5px solid #edf2f7;
                    background: #f8fafc;
                    font-size: 0.85rem;
                    font-weight: 700;
                    appearance: none;
                    cursor: pointer;
                    color: var(--text-primary);
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23cbd5e1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    background-size: 14px;
                    transition: all 0.2s ease;
                    font-family: inherit;
                    box-sizing: border-box;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .select-orchestrator select:focus {
                    outline: none;
                    border-color: var(--crimson);
                    background-color: #fff;
                    box-shadow: 0 0 0 3px rgba(139, 26, 43, 0.05);
                }

                .select-orchestrator select:hover {
                    border-color: #cbd5e1;
                }

                .f-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--crimson);
                    font-size: 0.9rem;
                    pointer-events: none;
                    z-index: 2;
                }

                .sort-select-crimson {
                    color: var(--crimson) !important;
                }

                .filter-field-sort {
                    flex: 0 0 auto;
                    min-width: 160px;
                    padding-left: 16px;
                    border-left: 1.5px solid #f1f5f9;
                }

                .sort-label {
                    color: var(--crimson);
                    opacity: 0.8;
                }

                .date-orchestrator-input {
                    width: 100%;
                    padding: 12px 14px 12px 40px;
                    border-radius: 10px;
                    border: 1.5px solid #edf2f7;
                    background: #f8fafc;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    font-family: inherit;
                    transition: all 0.2s ease;
                    box-sizing: border-box;
                }

                .date-orchestrator-input:focus {
                    outline: none;
                    border-color: var(--crimson);
                }

                /* TABLE */
                .orchestration-table-wrapper {
                    background: #fff;
                    border-radius: 20px;
                    border: 1px solid var(--border-light);
                    overflow-x: auto;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                }

                .orchestrated-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 800px;
                }

                .orchestrated-table th {
                    background: #fcfcfd;
                    padding: 12px 16px;
                    text-align: left;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 1.2px;
                    border-bottom: 1px solid #f0f2f5;
                }

                .orchestrated-table td {
                    padding: 16px;
                    border-bottom: 1px solid #f8fafc;
                    vertical-align: middle;
                }

                .orchestrated-table tr {
                    transition: all 0.2s;
                    cursor: pointer;
                }

                .orchestrated-table tr:hover { background: #fcfcfd; }
                .orchestrated-table tr:hover td { background: #fcfcfd; }

                .ref-cell span {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    background: #f1f5f9;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-weight: 600;
                }

                .pos-entity-cell { display: flex; flex-direction: column; gap: 4px; }
                .pos-name { font-weight: 800; color: var(--text-primary); font-size: 0.95rem; }
                .entity-name { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }

                .classification-cell { display: flex; flex-direction: column; gap: 6px; }
                .class-badge {
                    background: #eff6ff;
                    color: #2563eb;
                    padding: 3px 12px;
                    border-radius: 100px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    width: fit-content;
                    text-transform: uppercase;
                }
                .designation-sub { font-size: 0.85rem; color: var(--text-secondary); }
                
                .timeline-cell { display: flex; flex-direction: column; gap: 4px; font-size: 0.85rem; color: var(--text-muted); }
                .timeline-cell svg { font-size: 0.9rem; margin-right: 4px; }

                .orchestration-actions { display: flex; gap: 8px; justify-content: flex-end; }
                .o-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    border: 1px solid #f1f5f9;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 1.1rem;
                }
                .o-btn:hover { transform: translateY(-3px); box-shadow: 0 6px 15px rgba(0,0,0,0.06); border-color: #e2e8f0; }
                .o-btn.applicants { color: var(--gold-accent); }
                .o-btn.delete { color: var(--crimson); }
                .o-btn.delete:hover { background: var(--crimson); color: #fff; }

                /* MODALS */
                .confirm-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                    animation: fadeIn 0.3s ease-out;
                }

                .confirm-modal {
                    background: #fff;
                    border-radius: 32px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
                }

                /* Applicant Modal specifics */
                .cv-banner-p {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    background: #1a1a2e;
                    padding: 20px;
                    border-radius: 20px;
                    color: #fff;
                    margin-top: 32px;
                }

                .cb-icon { 
                    width: 50px; height: 50px; 
                    background: rgba(255, 255, 255, 0.1); 
                    border-radius: 12px; display: flex; 
                    align-items: center; justify-content: center; 
                    font-size: 1.5rem; color: var(--gold-accent);
                }

                .cb-text { flex: 1; }
                .cb-text span { display: block; font-weight: 700; font-size: 1rem; margin-bottom: 4px;}
                .cb-text p { margin: 0; font-size: 0.8rem; color: rgba(255, 255, 255, 0.6); }

                .modal-actions-footer-p {
                    padding: 24px 48px;
                    border-top: 1px solid #e2e8f0;
                    background: #fcfcfd;
                }

                .submission-box-p {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    padding: 20px;
                    background: #fdfdfd;
                    border: 1px solid #f1f5f9;
                    border-radius: 16px;
                    gap: 24px;
                    align-items: start;
                }

                .sm-item span { 
                    display: block; 
                    font-size: 0.65rem; 
                    color: var(--text-muted); 
                    margin-bottom: 8px; 
                    text-transform: uppercase; 
                    font-weight: 800; 
                    letter-spacing: 0.5px;
                }
                .sm-item p { margin: 0; font-weight: 700; color: var(--text-primary); font-size: 0.95rem; }

                .close-btn-p {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    border: 1px solid #e2e8f0;
                    background: #fff;
                    color: #64748b;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    padding: 0;
                }
                .close-btn-p:hover {
                    background: #f8fafc;
                    color: var(--crimson);
                    border-color: #cbd5e1;
                    transform: rotate(90deg);
                }

                .rejection-reason-box {
                    margin-top: 20px; padding: 20px; background: #fef2f2; 
                    border-radius: 12px; border-left: 4px solid #ef4444;
                }
                .rejection-reason-box span { font-size: 0.75rem; font-weight: bold; color: #ef4444; text-transform: uppercase; }
                .rejection-reason-box p { margin: 8px 0 0; font-size: 0.95rem; color: #ef4444; font-weight: 600; line-height: 1.5; }

                .loading-state-p { padding: 100px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }
                .empty-state-p { padding: 80px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
                .empty-icon { font-size: 3rem; color: var(--text-muted); opacity: 0.5; margin-bottom: 8px; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
                .pulse { animation: pulse 2s infinite; }
                .spinner-p { width: 50px; height: 50px; border: 4px solid #f1f5f9; border-top-color: var(--crimson); border-radius: 50%; animation: spin 0.8s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* RESPONSIVENESS */
                @media (max-width: 1024px) {
                    .vacancies-orchestration-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 24px;
                        padding: 40px;
                        border-radius: 24px;
                    }
                    
                    .serif-title-p { font-size: 2.5rem; }
                    
                    .toolbar-top {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }
                    
                    .toolbar-actions-p {
                        flex-direction: column;
                    }
                    
                    .select-orchestrator {
                        width: 100%;
                        min-width: 100%;
                    }
                    
                    .select-orchestrator[style*="borderLeft"] {
                        border-left: none !important;
                        padding-left: 0 !important;
                        border-top: 1px solid #e2e8f0;
                        padding-top: 16px;
                    }
                }

                @media (max-width: 768px) {
                    .orchestrated-table thead { display: none; }
                    
                    .orchestrated-table tr {
                        display: block;
                        padding: 20px;
                        border-bottom: 8px solid #f8fafc;
                    }
                    
                    .orchestrated-table td {
                        display: block;
                        padding: 12px 0;
                        border: none;
                        width: 100%;
                    }
                    
                    .orchestrated-table td::before {
                        content: attr(data-label);
                        display: block;
                        font-size: 0.7rem;
                        font-weight: 800;
                        color: #94a3b8;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 6px;
                    }
                    
                    .orchestration-actions {
                        justify-content: flex-start;
                    }
                    
                    .serif-title-p { font-size: 2rem; }
                    
                    .submission-box-p {
                        grid-template-columns: 1fr;
                    }
                }
`}),k&&e.jsx("div",{className:"modal-overlay-p",style:{zIndex:9999,position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)"},children:e.jsxs("div",{className:"detail-modal-p",style:{width:"90%",height:"90vh",maxWidth:"1000px",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{className:"modal-header-p",style:{padding:"16px 24px",borderBottom:"1px solid #e2e8f0",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#f8fafc"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("div",{style:{background:"var(--crimson)",color:"white",padding:"8px",borderRadius:"8px",display:"flex"},children:e.jsx(qr,{size:20})}),e.jsxs("div",{children:[e.jsxs("h3",{style:{margin:0,fontSize:"1.1rem",color:"var(--text-primary)"},children:[k.first_name," ",k.last_name," - Curriculum Vitae"]}),e.jsx("p",{style:{margin:0,fontSize:"0.8rem",color:"var(--text-muted)"},children:k.cv_path})]})]}),e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsxs("a",{href:`${Et}/applications.php?action=view_cv&file=${encodeURIComponent(k.cv_path)}`,target:"_blank",rel:"noopener noreferrer",className:"btn btn-outline",style:{padding:"8px 16px",display:"flex",alignItems:"center",gap:"8px",color:"var(--crimson)"},children:[e.jsx(Ia,{})," Open in New Tab"]}),e.jsxs("a",{href:`${Et}/applications.php?action=view_cv&file=${encodeURIComponent(k.cv_path)}`,download:`${k.first_name}_CV`,className:"btn btn-outline",style:{padding:"8px 16px",display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(Cs,{})," Download File"]}),e.jsx("button",{className:"close-btn-p",onClick:()=>J(null),style:{background:"white",border:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(ct,{size:20})})]})]}),e.jsx("div",{className:"modal-body-p",style:{flex:1,padding:0,overflow:"hidden",background:"#e2e8f0",display:"flex",alignItems:"center",justifyContent:"center"},children:k.cv_path.toLowerCase().endsWith(".pdf")?e.jsx("iframe",{src:`${Et}/applications.php?action=view_cv&file=${encodeURIComponent(k.cv_path)}#toolbar=0`,style:{width:"100%",height:"100%",border:"none"},title:"CV Viewer"}):k.cv_path.toLowerCase().endsWith(".docx")||k.cv_path.toLowerCase().endsWith(".doc")?e.jsx(A1,{url:`${Et}/applications.php?action=view_cv&file=${encodeURIComponent(k.cv_path)}`}):e.jsxs("div",{style:{textAlign:"center",color:"#64748b"},children:[e.jsx(qr,{size:48,style:{marginBottom:"16px",color:"#cbd5e1"}}),e.jsx("h3",{children:"Document Viewer"}),e.jsxs("p",{style:{maxWidth:"400px",margin:"0 auto 20px auto"},children:["This document type (",k.cv_path.split(".").pop().toUpperCase(),") cannot be previewed directly in the browser. Please download it to view."]}),e.jsxs("a",{href:`${Et}/applications.php?action=view_cv&file=${encodeURIComponent(k.cv_path)}`,download:`${k.first_name}_CV`,className:"btn btn-gold",children:[e.jsx(Cs,{})," Download Document"]})]})})]})})]})}const I1=({url:s})=>{const a=F.useRef(null),[n,o]=F.useState(!0),[l,d]=F.useState(null);return F.useEffect(()=>{(async()=>{if(!(!s||!a.current))try{o(!0),d(null);const f=await ht.get(s,{responseType:"blob",headers:{Authorization:`Bearer ${localStorage.getItem("gs_admin_token")}`}});a.current.innerHTML="",await am(f.data,a.current,null,{className:"docx",inWrapper:!0,ignoreWidth:!1,ignoreHeight:!1,ignoreFonts:!1,breakPageToSections:!0,trimXmlDeclaration:!0})}catch(f){console.error("Docx render error:",f),d("Failed to render document. Please download to view.")}finally{o(!1)}})()},[s]),e.jsxs("div",{style:{width:"100%",height:"100%",overflow:"auto",background:"#fff",padding:"20px",display:"flex",flexDirection:"column",alignItems:"center"},children:[n&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"15px",padding:"50px"},children:[e.jsx("div",{className:"spinner-p"}),e.jsx("p",{style:{color:"var(--text-muted)",fontWeight:600},children:"Rendering Document..."})]}),l&&e.jsx("div",{style:{color:"var(--crimson)",padding:"20px"},children:l}),e.jsx("div",{ref:a,style:{width:"100%",maxWidth:"800px"}})]})};function O1({admin:s}){const[a,n]=F.useState([]),[o,l]=F.useState([]),[d,u]=F.useState(!0),[f,h]=F.useState(null),[b,j]=F.useState(""),[N,w]=F.useState(!1),[_,v]=F.useState(null),[x,g]=F.useState(1),S=8,[z,T]=F.useState(null),[E,A]=F.useState(!1),[D,B]=F.useState(0),[V,U]=F.useState(0),[G,fe]=F.useState({company_id:"",search:"",overall_experience:"",qualification:"",tag:"",status:"",show_blocked:""}),[L,H]=F.useState(null),[k,J]=F.useState(""),[ve,se]=F.useState(!1),[oe,Q]=F.useState(!1);F.useEffect(()=>{ce()},[]),F.useEffect(()=>{g(1),R()},[G.company_id,G.search,G.overall_experience,G.qualification,G.tag,G.status,G.show_blocked]);const ce=async()=>{try{const xe=await un();l(xe.data.data||[])}catch(xe){console.error(xe)}},R=async()=>{try{u(!0);const xe={};Object.entries(G).forEach(([he,re])=>{re&&(xe[he]=re)});const y=(await ab(xe)).data.data||{};n(y.candidates||[]),B(y.active_count||0),U(y.blocked_count||0)}catch(xe){console.error(xe),me.error("Failed to load talent pool")}finally{u(!1)}},P=async()=>{if(!(!b.trim()||!f))try{w(!0);const xe=f.tags?f.tags.split(",").map(re=>re.trim()):[],Ae=b.trim();if(xe.includes(Ae)){me.warning("Tag already exists");return}const y=[...xe,Ae].join(",");await bf({id:f.id,tags:y});const he={...f,tags:y};h(he),n(a.map(re=>re.id===f.id?he:re)),j(""),me.success("Tag added successfully")}catch{me.error("Failed to update tags")}finally{w(!1)}},W=async xe=>{try{w(!0);const y=f.tags.split(",").map(re=>re.trim()).filter(re=>re!==xe).join(",");await bf({id:f.id,tags:y});const he={...f,tags:y};h(he),n(a.map(re=>re.id===f.id?he:re)),me.success("Tag removed")}catch{me.error("Failed to remove tag")}finally{w(!1)}},ee=async()=>{if(z)try{A(!0),await Jv({id:z.id}),n(a.filter(xe=>xe.id!==z.id)),me.success("Candidate removed from talent pool"),T(null)}catch{me.error("Failed to delete candidate")}finally{A(!1)}},te=()=>{fe({company_id:"",search:"",overall_experience:"",qualification:"",tag:"",status:"",show_blocked:""})},Ne=async()=>{if(!(!L||!k.trim()))try{se(!0),await ib({email:L.email,block_reason:k.trim()}),me.success(`${L.first_name} ${L.last_name} has been blocked`),H(null),J(""),h(null),R()}catch{me.error("Failed to block candidate")}finally{se(!1)}},Te=async xe=>{try{Q(!0),await ob({email:xe.email}),me.success(`${xe.first_name} ${xe.last_name} has been unblocked`),h(null),R()}catch{me.error("Failed to unblock candidate")}finally{Q(!1)}},_e=[...new Set(a.flatMap(xe=>xe.tags?xe.tags.split(",").map(Ae=>Ae.trim()):[]))].sort(),ze=Math.ceil(a.length/S),He=(x-1)*S,Qe=a.slice(He,He+S);return e.jsxs("div",{className:"manage-vacancies-console",children:[e.jsxs("div",{className:"vacancies-orchestration-header",children:[e.jsxs("div",{className:"header-content-p",children:[e.jsxs("div",{className:"badge-p",children:[e.jsx("span",{className:"dot pulse"}),"TALENT POOL ORCHESTRATOR"]}),e.jsx("h1",{className:"hero-title-p",children:"Talent Pool"}),e.jsx("p",{className:"hero-subtitle-p",children:"Intelligent Candidate Management & Heritage Talent Acquisition"})]}),e.jsxs("div",{className:"hero-stats-glass",children:[e.jsxs("div",{className:"h-stat-item",children:[e.jsx("span",{className:"h-label",children:"TOTAL TALENT"}),e.jsx("span",{className:"h-value",children:D+V})]}),e.jsx("div",{className:"h-divider"}),e.jsxs("div",{className:"h-stat-item",children:[e.jsx("span",{className:"h-label",children:"HIGHLY QUALIFIED"}),e.jsx("span",{className:"h-value",children:a.filter(xe=>xe.qualification==="Masters Degree"||xe.qualification==="PhD").length})]})]})]}),e.jsxs("div",{className:"console-toolbar-p",children:[e.jsxs("div",{className:"toolbar-search-row",children:[e.jsxs("div",{className:"search-orchestrator",children:[e.jsx(Ar,{className:"s-icon"}),e.jsx("input",{id:"talent_search",name:"talent_search",type:"text",placeholder:"Discover by name, email, expertise or tags...",value:G.search,onChange:xe=>fe({...G,search:xe.target.value})})]}),e.jsxs("button",{className:"btn-reset-p",onClick:te,children:[e.jsx(ct,{})," ",e.jsx("span",{children:"Reset Discovery"})]})]}),e.jsxs("div",{style:{display:"flex",gap:0,borderRadius:12,overflow:"hidden",border:"1.5px solid #e2e8f0",alignSelf:"flex-start"},children:[e.jsxs("button",{onClick:()=>fe({...G,show_blocked:""}),style:{padding:"10px 20px",border:"none",cursor:"pointer",fontWeight:700,fontSize:"0.8rem",background:G.show_blocked!=="1"?"linear-gradient(135deg, #1a1a2e, #2a050b)":"#fff",color:G.show_blocked!=="1"?"#c8a951":"#94a3b8",transition:"all 0.2s",display:"flex",alignItems:"center",gap:8},children:[e.jsx(co,{size:14})," Active Pool (",D,")"]}),e.jsxs("button",{onClick:()=>fe({...G,show_blocked:"1"}),style:{padding:"10px 20px",border:"none",cursor:"pointer",fontWeight:700,fontSize:"0.8rem",borderLeft:"1.5px solid #e2e8f0",background:G.show_blocked==="1"?"#fef2f2":"#fff",color:G.show_blocked==="1"?"#dc2626":"#94a3b8",transition:"all 0.2s",display:"flex",alignItems:"center",gap:8},children:[e.jsx(Ln,{size:14})," Blocked (",V,")"]})]}),e.jsxs("div",{className:"toolbar-filters-row",children:[s.role==="super_admin"&&e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Business Unit"}),e.jsxs("div",{className:"select-orchestrator",children:[e.jsx(As,{className:"f-icon"}),e.jsxs("select",{id:"company_filter",name:"company_id",value:G.company_id,onChange:xe=>fe({...G,company_id:xe.target.value}),className:"select-lg",children:[e.jsx("option",{value:"",children:"All Business Units"}),o.map(xe=>e.jsx("option",{value:xe.id,children:xe.name},xe.id))]})]})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Min. Experience"}),e.jsxs("div",{className:"select-orchestrator",children:[e.jsx(At,{className:"f-icon"}),e.jsxs("select",{id:"experience_filter",name:"overall_experience",value:G.overall_experience,onChange:xe=>fe({...G,overall_experience:xe.target.value}),children:[e.jsx("option",{value:"",children:"All Experience"}),e.jsx("option",{value:"0 years",children:"0 years (Freshers)"}),e.jsx("option",{value:"0-1 years",children:"0–1 years"}),e.jsx("option",{value:"1-2 years",children:"1–2 years"}),e.jsx("option",{value:"3-4 years",children:"3–4 years"}),e.jsx("option",{value:"5-7 years",children:"5–7 years"}),e.jsx("option",{value:"8-10 years",children:"8–10 years"}),e.jsx("option",{value:"10+ years",children:"10+ years"})]})]})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Talent Tag"}),e.jsxs("div",{className:"select-orchestrator",children:[e.jsx(Dh,{className:"f-icon"}),e.jsxs("select",{id:"tag_filter",name:"tag",value:G.tag,onChange:xe=>fe({...G,tag:xe.target.value}),children:[e.jsx("option",{value:"",children:"Filter by Tag"}),_e.map(xe=>e.jsx("option",{value:xe,children:xe},xe))]})]})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Academic Status"}),e.jsxs("div",{className:"select-orchestrator",children:[e.jsx(qr,{className:"f-icon"}),e.jsxs("select",{id:"qualification_filter",name:"qualification",value:G.qualification,onChange:xe=>fe({...G,qualification:xe.target.value}),children:[e.jsx("option",{value:"",children:"Academic Status"}),Th.map(xe=>e.jsx("option",{value:xe,children:xe},xe))]})]})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Search Outcome"}),e.jsxs("div",{className:"select-orchestrator",children:[e.jsx(co,{className:"f-icon"}),e.jsxs("select",{id:"status_filter",name:"status",value:G.status,onChange:xe=>fe({...G,status:xe.target.value}),children:[e.jsx("option",{value:"",children:"All Outcomes"}),e.jsx("option",{value:"pending",children:"Pending Review"}),e.jsx("option",{value:"shortlisted",children:"Shortlisted"}),e.jsx("option",{value:"rejected",children:"Rejected"})]})]})]})]})]}),e.jsxs("div",{className:"premium-table-container",children:[e.jsxs("table",{className:"premium-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Candidate Identity"}),e.jsx("th",{children:"Credentials & Tags"}),e.jsx("th",{children:"Prior Submission"}),e.jsx("th",{children:"Timeline & Seniority"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsx("tbody",{children:d?e.jsx("tr",{children:e.jsx("td",{colSpan:"5",style:{padding:"40px",textAlign:"center"},children:e.jsxs("div",{className:"loading-state-p",children:[e.jsx("div",{className:"spinner-p"}),e.jsx("p",{style:{marginTop:"12px",color:"var(--text-muted)"},children:"Synchronizing talent pool..."})]})})}):a.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:"5",style:{padding:"60px",textAlign:"center"},children:e.jsxs("div",{className:"empty-state-p",children:[e.jsx("div",{className:"empty-icon",style:{fontSize:"3rem",color:"var(--border-light)",marginBottom:"16px"},children:e.jsx(co,{})}),e.jsx("h3",{style:{color:"var(--text-primary)",marginBottom:"8px"},children:"No Talent Found"}),e.jsx("p",{style:{color:"var(--text-muted)"},children:"Adjust your discovery filters to find candidates."})]})})}):Qe.map((xe,Ae)=>e.jsxs("tr",{onClick:()=>h(xe),style:{cursor:"pointer"},children:[e.jsx("td",{children:e.jsxs("div",{className:"candidate-cell",children:[e.jsx("div",{className:"avatar-p",children:e.jsx(kr,{})}),e.jsxs("div",{className:"info-p",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("span",{className:"name-p",children:[xe.first_name," ",xe.last_name]}),xe.last_status==="shortlisted"&&e.jsx("span",{className:"status-badge-p badge-shortlisted",children:"Favored"}),xe.last_status==="rejected"&&e.jsx("span",{className:"status-badge-p badge-rejected",children:"Refused"}),xe.is_blocked==1&&e.jsxs("span",{style:{background:"#fef2f2",color:"#dc2626",padding:"2px 8px",borderRadius:100,fontSize:"0.6rem",fontWeight:800,display:"inline-flex",alignItems:"center",gap:3},children:[e.jsx(Ln,{size:9})," Blocked"]})]}),e.jsxs("span",{className:"email-p",children:[e.jsx(cr,{size:11})," ",xe.email]})]})]})}),e.jsx("td",{children:e.jsxs("div",{className:"classification-cell",children:[e.jsx("span",{className:"class-badge",style:{background:"rgba(200, 169, 81, 0.1)",color:"var(--gold-accent)"},children:xe.qualification}),xe.is_blocked==1&&e.jsxs("span",{style:{background:"#fef2f2",color:"#dc2626",padding:"2px 8px",borderRadius:"4px",fontSize:"0.65rem",fontWeight:800,display:"flex",alignItems:"center",gap:4,width:"fit-content"},children:[e.jsx(Ln,{size:10})," BLOCKED"]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"6px"},children:xe.tags?xe.tags.split(",").slice(0,2).map((y,he)=>e.jsxs("span",{style:{background:"#f1f5f9",color:"#64748b",padding:"2px 8px",borderRadius:"4px",fontSize:"0.65rem",fontWeight:700},children:["#",y.trim()]},he)):null})]})}),e.jsx("td",{children:e.jsxs("div",{className:"pos-entity-cell",children:[e.jsx("span",{className:"pos-name",children:xe.last_applied_vacancy}),e.jsx("span",{className:"entity-name",children:xe.last_applied_company})]})}),e.jsx("td",{children:e.jsxs("div",{className:"timeline-cell",children:[e.jsx("span",{style:{fontWeight:800,color:"var(--text-primary)"},children:xe.overall_experience}),e.jsxs("span",{style:{color:"var(--text-muted)",display:"flex",alignItems:"center",gap:"4px",fontSize:"0.75rem",marginTop:"4px"},children:[e.jsx(qt,{size:12})," ",on(xe.applied_at)]})]})}),e.jsx("td",{children:e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px"},children:[e.jsx("button",{className:"action-btn-p danger",style:{background:"rgba(239, 68, 68, 0.1)",color:"#ef4444",border:"none",padding:"8px",borderRadius:"8px",display:"flex",cursor:"pointer"},onClick:y=>{y.stopPropagation(),T(xe)},title:"Remove from Pool",children:e.jsx(aa,{size:16})}),e.jsx("button",{className:"page-btn",style:{padding:"6px 12px",minWidth:"auto"},onClick:y=>{y.stopPropagation(),h(xe)},children:e.jsx(Tr,{})})]})})]},Ae))})]}),e.jsxs("div",{className:"pagination-footer",children:[e.jsxs("div",{className:"page-info",children:["Showing ",e.jsxs("strong",{children:[He+1,"-",Math.min(He+S,a.length)]})," of ",e.jsx("strong",{children:a.length})," candidates"]}),e.jsxs("div",{className:"pagination-controls",children:[e.jsxs("button",{className:"page-btn",onClick:xe=>{xe.stopPropagation(),g(Ae=>Math.max(Ae-1,1))},disabled:x===1,children:[e.jsx(Ro,{})," Previous"]}),e.jsxs("button",{className:"page-btn",onClick:xe=>{xe.stopPropagation(),g(Ae=>Math.min(Ae+1,ze))},disabled:x===ze||ze===0,children:["Next ",e.jsx(Tr,{})]})]})]})]}),f&&e.jsx("div",{className:"confirm-overlay",onClick:()=>h(null),children:e.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:xe=>xe.stopPropagation(),style:{maxWidth:"900px",width:"90%",textAlign:"left",overflow:"hidden"},children:[e.jsxs("div",{className:"modal-header-p",style:{background:"var(--bg-primary)",borderBottom:"1px solid #f1f5f9",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px",padding:"24px 32px"},children:[e.jsxs("div",{className:"header-info-p",style:{display:"flex",alignItems:"center",gap:"20px"},children:[e.jsx("div",{className:"modal-avatar",style:{width:"64px",height:"64px",borderRadius:"16px",background:"var(--ivory-dark)",color:"var(--crimson)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",border:"1px solid rgba(200, 169, 81, 0.3)",flexShrink:0},children:e.jsx(kr,{})}),e.jsxs("div",{children:[e.jsxs("h2",{style:{fontFamily:"var(--font-heading)",fontSize:"1.8rem",letterSpacing:"-0.5px",margin:0,color:"var(--text-primary)"},children:[f.first_name," ",f.last_name]}),e.jsx("p",{style:{color:"var(--gold-accent)",fontWeight:700,textTransform:"uppercase",fontSize:"0.7rem",letterSpacing:"1px",margin:"2px 0 0 0"},children:"Talent Pool candidate"})]})]}),e.jsx("button",{className:"o-btn delete",onClick:()=>h(null),children:e.jsx(ct,{})})]}),e.jsxs("div",{className:"modal-body-p",style:{overflowY:"auto",maxHeight:"70vh",padding:"32px"},children:[e.jsxs("div",{className:"detail-grid-p admin-grid-2",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"32px"},children:[e.jsxs("div",{className:"detail-section-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Contact Information"}),e.jsxs("div",{className:"contact-list-p",style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsxs("div",{className:"contact-item-p",style:{display:"flex",gap:"16px",alignItems:"flex-start"},children:[e.jsx(cr,{style:{marginTop:"4px",color:"var(--gold-accent)",fontSize:"1.2rem",flexShrink:0}}),e.jsxs("div",{children:[e.jsx("span",{style:{display:"block",fontSize:"0.7rem",color:"var(--text-muted)",fontWeight:700,textTransform:"uppercase",marginBottom:"2px"},children:"Email Dispatch"}),e.jsx("p",{style:{margin:0,fontWeight:600,color:"var(--text-primary)",fontSize:"1rem",lineHeight:"1.4"},children:f.email})]})]}),e.jsxs("div",{className:"contact-item-p",style:{display:"flex",gap:"16px",alignItems:"flex-start"},children:[e.jsx(sd,{style:{marginTop:"4px",color:"var(--gold-accent)",fontSize:"1.2rem",flexShrink:0}}),e.jsxs("div",{children:[e.jsx("span",{style:{display:"block",fontSize:"0.7rem",color:"var(--text-muted)",fontWeight:700,textTransform:"uppercase",marginBottom:"2px"},children:"Direct Line"}),e.jsx("p",{style:{margin:0,fontWeight:600,color:"var(--text-primary)",fontSize:"1rem",lineHeight:"1.4"},children:f.contact_number})]})]})]})]}),e.jsxs("div",{className:"detail-section-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Professional Profile"}),e.jsxs("div",{className:"professional-stats-grid",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:"12px"},children:[e.jsxs("div",{className:"stat-pill-item",style:{padding:"12px"},children:[e.jsx(At,{className:"stat-i"}),e.jsxs("div",{className:"stat-content",children:[e.jsx("span",{style:{fontSize:"0.65rem"},children:"Overall Experience"}),e.jsx("strong",{style:{fontSize:"0.9rem"},children:f.overall_experience})]})]}),e.jsxs("div",{className:"stat-pill-item",style:{padding:"12px"},children:[e.jsx(jb,{className:"stat-i"}),e.jsxs("div",{className:"stat-content",children:[e.jsx("span",{style:{fontSize:"0.65rem"},children:"Relevant Experience"}),e.jsx("strong",{style:{fontSize:"0.9rem"},children:f.relevant_experience||"Not Specified"})]})]}),e.jsxs("div",{className:"stat-pill-item full-w",style:{padding:"12px",gridColumn:"span 1"},children:[e.jsx(Oh,{className:"stat-i"}),e.jsxs("div",{className:"stat-content",children:[e.jsx("span",{style:{fontSize:"0.65rem"},children:"Highest Qualification"}),e.jsx("strong",{style:{fontSize:"0.9rem"},children:f.qualification})]})]})]})]}),e.jsxs("div",{className:"detail-section-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Candidate Talent Tags"}),e.jsxs("div",{style:{background:"#f8fafc",padding:"15px",borderRadius:"12px",border:"1px solid #e2e8f0",minHeight:"120px"},children:[e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"12px"},children:f.tags?f.tags.split(",").map((xe,Ae)=>e.jsxs("span",{style:{background:"#c8a951",color:"#fff",fontSize:"0.7rem",padding:"4px 10px",borderRadius:"100px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"bold"},children:[xe.trim(),e.jsx(ct,{onClick:()=>W(xe.trim()),style:{cursor:"pointer"}})]},Ae)):e.jsx("span",{style:{fontStyle:"italic",fontSize:"0.8rem",color:"#94a3b8"},children:"No tags yet."})}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("input",{type:"text",placeholder:"Add skill...",value:b,onChange:xe=>j(xe.target.value),onKeyPress:xe=>xe.key==="Enter"&&P(),style:{flex:1,padding:"8px 12px",fontSize:"0.8rem",border:"1px solid #e2e8f0",borderRadius:"8px",outline:"none"}}),e.jsx("button",{onClick:P,disabled:N,style:{background:"#1a1a2e",color:"#fff",border:"none",padding:"8px 12px",borderRadius:"8px",cursor:"pointer"},children:e.jsx(Da,{})})]})]})]}),e.jsxs("div",{className:"detail-section-p",children:[e.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Submission History"}),e.jsxs("div",{className:"submission-box-p",style:{gridTemplateColumns:"1fr",padding:"15px"},children:[e.jsxs("div",{className:"sm-item",style:{marginBottom:"10px"},children:[e.jsx("span",{children:"Previously Applied to"}),e.jsx("p",{style:{fontSize:"0.85rem"},children:f.last_applied_vacancy})]}),e.jsxs("div",{className:"sm-item",children:[e.jsx("span",{children:"Company"}),e.jsx("p",{style:{fontSize:"0.85rem"},children:f.last_applied_company})]}),f.last_status&&e.jsxs("div",{style:{marginTop:"10px",paddingTop:"10px",borderTop:"1px dashed #e2e8f0"},children:[e.jsx("span",{style:{fontSize:"0.7rem",color:"#94a3b8"},children:"Last Outcome"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",color:f.last_status==="shortlisted"?"#10b981":f.last_status==="under_review"?"#3b82f6":"#ef4444",fontWeight:"bold",fontSize:"0.8rem"},children:[e.jsx(Lr,{})," ",e.jsx("span",{style:{textTransform:"uppercase"},children:f.last_status.replace("_"," ")})]})]})]})]}),e.jsx("div",{className:"detail-section-p full-width",children:e.jsxs("div",{className:"cv-banner-p",children:[e.jsx("div",{className:"cb-icon",children:e.jsx(qr,{})}),e.jsxs("div",{className:"cb-text",children:[e.jsx("span",{children:"Curriculum Vitae"}),e.jsxs("p",{children:[f.first_name,"_CV_Pool.",(f.cv_path||"").split(".").pop()||"pdf"]})]}),e.jsxs("button",{className:"btn btn-gold",onClick:()=>v(f),children:[e.jsx(Ia,{})," View Document"]})]})})]}),e.jsx("div",{className:"modal-actions-footer-p",style:{borderTop:"1px solid #e2e8f0",background:"#fcfcfd"},children:f.is_blocked==1?e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-outline",onClick:()=>h(null),children:"Close Window"}),e.jsxs("div",{style:{background:"#fef2f2",padding:"10px 16px",borderRadius:12,border:"1px solid #fecaca",flex:1,display:"flex",alignItems:"center",gap:8,fontSize:"0.8rem",color:"#dc2626",fontWeight:600},children:[e.jsx(Ln,{size:14})," Blocked: ",f.block_reason]}),e.jsxs("button",{className:"btn btn-gold",style:{background:"#10b981",color:"#fff"},onClick:()=>Te(f),disabled:oe,children:[e.jsx(Bt,{})," ",oe?"Unblocking...":"Unblock Candidate"]})]}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-outline",onClick:()=>h(null),children:"Close Window"}),e.jsxs("button",{style:{background:"#fef2f2",color:"#dc2626",border:"1px solid #fecaca",padding:"10px 18px",borderRadius:12,cursor:"pointer",fontWeight:700,fontSize:"0.85rem",display:"flex",alignItems:"center",gap:8,fontFamily:"inherit"},onClick:()=>{H(f)},children:[e.jsx(Ln,{size:14})," Block Candidate"]}),e.jsxs("a",{href:`mailto:${f.email}?subject=Career Opportunity: George Steuart`,className:"btn btn-gold",style:{background:"var(--gold-accent)",color:"#fff",textDecoration:"none"},children:[e.jsx(cr,{})," Send Outreach Email"]})]})})]})]})}),_&&(()=>{const xe=`${Et}/applications.php?action=view_cv&file=${encodeURIComponent(_.cv_path)}`,Ae=(_.cv_path||"").split(".").pop().toLowerCase(),y=Ae==="pdf",he=Ae==="docx"||Ae==="doc";return e.jsx("div",{className:"confirm-overlay",style:{zIndex:1200},onClick:()=>v(null),children:e.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:re=>re.stopPropagation(),style:{maxWidth:"950px",width:"95%",height:"90vh",padding:0,textAlign:"left",borderRadius:"24px",overflow:"hidden",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #2a050b 0%, var(--crimson-dark) 100%)",padding:"20px 32px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"14px"},children:[e.jsx("div",{style:{width:"42px",height:"42px",borderRadius:"12px",background:"rgba(200,169,81,0.15)",border:"1px solid rgba(200,169,81,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gold-accent)",fontSize:"1.2rem"},children:e.jsx(qr,{})}),e.jsxs("div",{children:[e.jsxs("h3",{style:{margin:0,color:"#fff",fontSize:"1.1rem",fontWeight:700},children:[_.first_name," ",_.last_name," — CV"]}),e.jsxs("p",{style:{margin:"2px 0 0",color:"rgba(255,255,255,0.5)",fontSize:"0.75rem",textTransform:"uppercase",letterSpacing:"0.5px"},children:[Ae.toUpperCase()," Document"]})]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:[e.jsxs("a",{href:xe,download:!0,className:"btn",style:{background:"rgba(255,255,255,0.1)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",padding:"8px 16px",borderRadius:"10px",fontSize:"0.8rem",fontWeight:700,display:"flex",alignItems:"center",gap:"6px",textDecoration:"none"},onClick:re=>re.stopPropagation(),children:[e.jsx(Cs,{size:14})," Download"]}),e.jsx("button",{onClick:()=>v(null),style:{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",width:"36px",height:"36px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1.1rem"},children:e.jsx(ct,{})})]})]}),e.jsxs("div",{style:{flex:1,overflow:"hidden",background:"#f1f5f9"},children:[y&&e.jsx("iframe",{src:xe,style:{width:"100%",height:"100%",border:"none"},title:"CV Preview"}),he&&e.jsx(I1,{url:xe}),!y&&!he&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:"16px",color:"var(--text-muted)"},children:[e.jsx(Lr,{size:48}),e.jsxs("p",{style:{fontWeight:600},children:["Unsupported file format (.",Ae,")"]}),e.jsxs("a",{href:xe,download:!0,className:"btn btn-gold",style:{textDecoration:"none"},children:[e.jsx(Cs,{})," Download to View"]})]})]})]})})})(),z&&e.jsx("div",{className:"confirm-overlay animated-fade-in",style:{zIndex:1210},onClick:()=>T(null),children:e.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:xe=>xe.stopPropagation(),style:{maxWidth:"400px",textAlign:"center",padding:"40px"},children:[e.jsx("div",{className:"warning-visual",style:{color:"#ef4444",background:"rgba(239, 68, 68, 0.1)",width:"60px",height:"60px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px auto",fontSize:"1.5rem"},children:e.jsx(aa,{})}),e.jsx("h2",{style:{fontSize:"1.4rem",marginBottom:"10px",color:"var(--text-primary)"},children:"Remove Candidate?"}),e.jsxs("p",{style:{color:"var(--text-secondary)",marginBottom:"30px",fontSize:"0.9rem",lineHeight:"1.5"},children:["Are you sure you want to remove ",e.jsx("strong",{children:z.first_name})," from the talent pool? This action cannot be undone."]}),e.jsxs("div",{style:{display:"flex",gap:"12px"},children:[e.jsx("button",{className:"btn btn-outline",onClick:()=>T(null),style:{flex:1,padding:"12px"},children:"Cancel"}),e.jsx("button",{className:"btn",onClick:ee,disabled:E,style:{flex:1,background:"#ef4444",color:"#fff",border:"none",padding:"12px"},children:E?"Removing...":"Confirm Remove"})]})]})}),L&&e.jsx("div",{className:"confirm-overlay animated-fade-in",style:{zIndex:1210},onClick:()=>{H(null),J("")},children:e.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:xe=>xe.stopPropagation(),style:{maxWidth:"480px",textAlign:"center",padding:"40px"},children:[e.jsx("div",{style:{color:"#dc2626",background:"rgba(220, 38, 38, 0.1)",width:"64px",height:"64px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px auto",fontSize:"1.6rem"},children:e.jsx(Ln,{})}),e.jsx("h2",{style:{fontSize:"1.4rem",marginBottom:"10px",color:"var(--text-primary)"},children:"Block Candidate?"}),e.jsxs("p",{style:{color:"var(--text-muted)",marginBottom:"8px",lineHeight:1.6,fontSize:"0.9rem"},children:["You are about to block ",e.jsxs("strong",{style:{color:"var(--text-primary)"},children:[L.first_name," ",L.last_name]})," (",L.email,")."]}),e.jsxs("div",{style:{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"10px 14px",marginBottom:20,fontSize:"0.8rem",color:"#92400e",textAlign:"left"},children:["⚠️ This will remove them from:",e.jsx("br",{}),"• All future vacancy suggestions",e.jsx("br",{}),"• The Talent Pool active listing",e.jsx("br",{}),"• New applications will show a warning badge"]}),e.jsx("textarea",{placeholder:"Reason for blocking (required)... e.g. Provided false experience details",value:k,onChange:xe=>J(xe.target.value),rows:3,style:{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #e2e8f0",fontSize:"0.85rem",resize:"none",marginBottom:20,fontFamily:"inherit"}}),e.jsxs("div",{style:{display:"flex",gap:12},children:[e.jsx("button",{className:"btn btn-outline",onClick:()=>{H(null),J("")},style:{flex:1,padding:"12px"},children:"Cancel"}),e.jsx("button",{onClick:Ne,disabled:ve||!k.trim(),style:{flex:1,background:"#dc2626",color:"#fff",border:"none",padding:"12px",borderRadius:12,cursor:"pointer",fontWeight:700,fontSize:"0.9rem",fontFamily:"inherit",opacity:!k.trim()||ve?.5:1},children:ve?"Blocking...":"🚫 Confirm Block"})]})]})}),e.jsx("style",{jsx:"true",children:`
                .manage-vacancies-console {
                    animation: fadeIn 0.4s ease-out;
                }

                /* HEREO / HEADER SECTION */
                .vacancies-orchestration-header {
                    position: relative;
                    padding: 24px;
                    border-radius: 24px;
                    overflow: hidden;
                    margin-bottom: 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    background: linear-gradient(135deg, #2a050b 0%, var(--crimson-dark) 100%);
                    box-shadow: 0 10px 30px rgba(139, 26, 43, 0.15);
                }

                .vacancies-orchestration-header::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 20px 20px;
                    pointer-events: none;
                }

                .header-content-p { position: relative; z-index: 2; }

                .badge-p {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(200, 169, 81, 0.15);
                    color: var(--gold-accent);
                    padding: 5px 12px;
                    border-radius: 100px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 12px;
                }

                .dot { width: 6px; height: 6px; border-radius: 50%; }
                .dot.pulse { background: #10b981; animation: pulse 2s infinite; }

                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }

                .hero-title-p {
                    font-family: var(--font-heading);
                    font-size: 1.8rem;
                    color: #fff;
                    margin: 0;
                }

                .hero-subtitle-p {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.9rem;
                    margin-top: 6px;
                }

                .hero-stats-glass {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 12px 24px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    z-index: 2;
                }

                .h-stat-item {
                    display: flex;
                    flex-direction: column;
                }

                .h-label {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: rgba(255,255,255,0.5);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .h-value {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: var(--gold-accent);
                }

                .h-divider {
                    width: 1px;
                    height: 30px;
                    background: rgba(255,255,255,0.1);
                }

                .btn-establish-p {
                    background: linear-gradient(135deg, var(--gold-accent) 0%, #d4b86a 100%);
                    color: #1a1a2e;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 12px;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 10px 30px rgba(200, 169, 81, 0.3);
                    z-index: 10;
                    font-size: 0.95rem;
                }

                .btn-establish-p:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(200, 169, 81, 0.4);
                    background: #d4b86a;
                }

                /* REFINED TOOLBAR */
                .console-toolbar-p {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-bottom: 24px;
                    background: #fff;
                    padding: 24px;
                    border-radius: 24px;
                    border: 1px solid var(--border-light);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                }

                .toolbar-search-row {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .search-orchestrator {
                    position: relative;
                    flex: 1;
                }

                .s-icon {
                    position: absolute;
                    left: 18px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    font-size: 1.1rem;
                    z-index: 10;
                }

                .search-orchestrator input {
                    width: 100%;
                    padding: 12px 20px 12px 52px;
                    border-radius: 14px;
                    border: 1.5px solid #f1f5f9;
                    background: #f8fafc;
                    font-size: 0.95rem;
                    transition: all 0.3s;
                }

                .search-orchestrator input:focus {
                    outline: none;
                    background: #fff;
                    border-color: var(--crimson);
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .btn-reset-p {
                    background: #fff;
                    color: var(--text-muted);
                    border: 1.5px solid #f1f5f9;
                    padding: 0 20px;
                    height: 48px;
                    border-radius: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.85rem;
                    flex-shrink: 0;
                }

                .btn-reset-p:hover {
                    background: #fef2f2;
                    color: var(--crimson);
                    border-color: #fee2e2;
                }

                .toolbar-filters-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    padding-top: 16px;
                    border-top: 1px solid #f1f5f9;
                }

                .filter-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 1;
                    min-width: 160px;
                }

                .filter-group label {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    padding-left: 4px;
                }

                .select-orchestrator {
                    position: relative;
                }

                .f-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--crimson);
                    pointer-events: none;
                    z-index: 10;
                }

                .select-orchestrator select {
                    width: 100%;
                    padding: 0 32px 0 38px;
                    height: 46px;
                    border-radius: 12px;
                    border: 1.5px solid #f1f5f9;
                    background: #f8fafc;
                    font-size: 0.8rem;
                    font-weight: 700;
                    appearance: none;
                    cursor: pointer;
                    color: var(--text-primary);
                    transition: all 0.2s;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 10px center;
                    background-size: 14px;
                }

                .select-orchestrator select:focus {
                    outline: none;
                    border-color: var(--crimson);
                    background: #fff;
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .select-lg { min-width: 200px; }

                /* TABLE */
                .orchestration-table-wrapper {
                    background: #fff;
                    border-radius: 20px;
                    border: 1px solid var(--border-light);
                    overflow-x: auto;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                }

                .orchestrated-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 800px;
                }

                .orchestrated-table th {
                    background: #fcfcfd;
                    padding: 12px 16px;
                    text-align: left;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 1.2px;
                    border-bottom: 1px solid #f0f2f5;
                }

                .orchestrated-table td {
                    padding: 16px;
                    border-bottom: 1px solid #f8fafc;
                    vertical-align: middle;
                }

                .orchestrated-table tr {
                    transition: all 0.2s;
                    cursor: pointer;
                }

                .orchestrated-table tr:hover { background: #fcfcfd; }
                .orchestrated-table tr:hover td { background: #fcfcfd; }

                .ref-cell span {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    background: #f1f5f9;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-weight: 600;
                }

                .pos-entity-cell { display: flex; flex-direction: column; gap: 4px; }
                .pos-name { font-weight: 800; color: var(--text-primary); font-size: 0.95rem; }
                .entity-name { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }

                .classification-cell { display: flex; flex-direction: column; gap: 6px; }
                .class-badge {
                    background: #eff6ff;
                    color: #2563eb;
                    padding: 3px 12px;
                    border-radius: 100px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    width: fit-content;
                    text-transform: uppercase;
                }
                .designation-sub { font-size: 0.85rem; color: var(--text-secondary); }
                
                .timeline-cell { display: flex; flex-direction: column; gap: 4px; font-size: 0.85rem; color: var(--text-muted); }
                .timeline-cell svg { font-size: 0.9rem; margin-right: 4px; }

                .orchestration-actions { display: flex; gap: 8px; justify-content: flex-end; }
                .o-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    border: 1px solid #f1f5f9;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 1.1rem;
                }
                .o-btn:hover { transform: translateY(-3px); box-shadow: 0 6px 15px rgba(0,0,0,0.06); border-color: #e2e8f0; }
                .o-btn.applicants { color: var(--gold-accent); }
                .o-btn.delete { color: var(--crimson); }
                .o-btn.delete:hover { background: var(--crimson); color: #fff; }

                /* MODALS */
                .confirm-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                    animation: fadeIn 0.3s ease-out;
                }

                .confirm-modal {
                    background: #fff;
                    border-radius: 32px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
                }

                /* Candidate Specific Modal styling */
                .cv-banner-p {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    background: #1a1a2e;
                    padding: 20px;
                    border-radius: 20px;
                    color: #fff;
                    margin-top: 32px;
                }

                .cb-icon { 
                    width: 50px; height: 50px; 
                    background: rgba(255, 255, 255, 0.1); 
                    border-radius: 12px; display: flex; 
                    align-items: center; justify-content: center; 
                    font-size: 1.5rem; color: var(--gold-accent);
                }

                .cb-text { flex: 1; }
                .cb-text span { display: block; font-weight: 700; font-size: 1rem; margin-bottom: 4px;}
                .cb-text p { margin: 0; font-size: 0.8rem; color: rgba(255, 255, 255, 0.6); }

                .modal-actions-footer-p {
                    padding: 24px 48px;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: flex-end;
                    gap: 16px;
                    background: #fcfcfd;
                }

                .submission-box-p {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    padding: 16px;
                    background: #fdfdfd;
                    border: 1px solid #f1f5f9;
                    border-radius: 16px;
                    gap: 20px;
                }

                .sm-item span { display: block; font-size: 0.7rem; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; font-weight: 700; }
                .sm-item p { margin: 0; font-weight: 700; color: var(--text-primary); font-size: 0.95rem; }

                .rejection-reason-box {
                    margin-top: 20px; padding: 20px; background: #fef2f2; 
                    border-radius: 12px; border-left: 4px solid #ef4444;
                }
                .rejection-reason-box span { fontSize: 0.75rem; fontWeight: bold; color: #ef4444; textTransform: uppercase; }
                .rejection-reason-box p { margin: 8px 0 0; fontSize: 0.95rem; color: #ef4444; font-weight: 600; line-height: 1.5; }

                /* Professional Stats specific to Talent Pool */
                .professional-stats-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
                .stat-pill-item { 
                    background: var(--bg-primary); 
                    padding: 16px; 
                    border-radius: 16px; 
                    display: flex; 
                    gap: 16px; 
                    align-items: center;
                    border: 1px solid var(--border-light);
                }
                .stat-pill-item.full-w { grid-column: 1 / -1; }
                .stat-pill-item .stat-i { font-size: 1.2rem; color: var(--crimson-muted); flex-shrink: 0; }
                .stat-pill-item .stat-content span { display: block; font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }
                .stat-pill-item .stat-content strong { display: block; font-size: 0.95rem; color: var(--text-primary); font-weight: 800; }

                .loading-state-p { padding: 100px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }
                .empty-state-p { padding: 80px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
                .empty-icon { font-size: 3rem; color: var(--text-muted); opacity: 0.5; margin-bottom: 8px; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
                .pulse { animation: pulse 2s infinite; }
                .spinner-p { width: 50px; height: 50px; border: 4px solid #f1f5f9; border-top-color: var(--crimson); border-radius: 50%; animation: spin 0.8s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* RESPONSIVENESS */
                @media (max-width: 1024px) {
                    .vacancies-orchestration-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 32px;
                        padding: 40px;
                        border-radius: 24px;
                    }
                    
                    .header-actions-p {
                        width: 100%;
                    }
                    
                    .stats-mosaic-p {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .hero-title-p { font-size: 1.8rem; }
                    
                    .toolbar-top {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }
                    
                    .btn-establish-p {
                        width: 100%;
                        justify-content: center;
                    }
                    
                    .toolbar-filters {
                        flex-direction: column;
                    }
                    
                    .select-orchestrator {
                        width: 100%;
                        min-width: 100%;
                    }
                }

                @media (max-width: 768px) {
                    .orchestrated-table thead { display: none; }
                    
                    .orchestrated-table tr {
                        display: block;
                        padding: 20px;
                        border-bottom: 8px solid #f8fafc;
                    }
                    
                    .orchestrated-table td {
                        display: block;
                        padding: 12px 0;
                        border: none;
                        width: 100%;
                    }
                    
                    .orchestrated-table td::before {
                        content: attr(data-label);
                        display: block;
                        font-size: 0.7rem;
                        font-weight: 800;
                        color: #94a3b8;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 6px;
                    }
                    
                    .orchestration-actions {
                        justify-content: flex-start;
                    }
                    
                    .modal-header-p {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 20px;
                        padding: 32px 24px !important;
                    }
                    
                    .modal-avatar {
                        width: 60px !important;
                        height: 60px !important;
                        font-size: 1.5rem !important;
                    }
                    
                    .detail-modal-p h2 { font-size: 1.8rem !important; }
                    
                    .modal-body-p {
                        padding: 24px !important;
                    }
                    
                    .modal-actions-footer-p {
                        flex-direction: column;
                        padding: 24px !important;
                    }
                    
                    .modal-actions-footer-p .btn {
                        width: 100%;
                        justify-content: center;
                    }
                }

                @media (max-width: 480px) {
                    .stats-mosaic-p {
                        grid-template-columns: 1fr;
                    }
                    
                    .serif-title-p { font-size: 1.8rem; }
                }
            `})]})}function F1({admin:s}){const[a,n]=F.useState([]),[o,l]=F.useState([]),[d,u]=F.useState(!0),[f,h]=F.useState(!1),[b,j]=F.useState(null),[N,w]=F.useState(null),[_,v]=F.useState(null),[x,g]=F.useState(null),[S,z]=F.useState({username:"",email:"",full_name:"",role:"sub_admin",company_id:"",is_active:1}),[T,E]=F.useState(""),[A,D]=F.useState(""),[B,V]=F.useState(1),U=8;F.useEffect(()=>{G()},[]);const G=async()=>{try{u(!0);const[P,W]=await Promise.all([lb(),un()]);n(P.data.data||[]),l(W.data.data||[])}catch(P){console.error(P)}finally{u(!1)}},fe=()=>{z({username:"",email:"",full_name:"",role:"sub_admin",company_id:"",is_active:1}),j(null)},L=()=>{fe(),h(!0)},H=P=>{z({username:P.username,email:P.email,full_name:P.full_name,role:P.role,company_id:P.company_id||"",is_active:parseInt(P.is_active)}),j(P.id),h(!0)},k=async P=>{var W,ee;if(P.preventDefault(),!S.full_name||!S.email||!S.username){me.error("Please fill in all required fields");return}if(S.role==="sub_admin"&&!S.company_id){me.error("Company is required for sub admin");return}try{if(b){const te={...S,id:b};await db(te),me.success("Admin updated"),h(!1),fe()}else{const te=await cb(S);me.success("Admin created"),g(te.data.data.temp_password),h(!1),fe()}G()}catch(te){me.error(((ee=(W=te.response)==null?void 0:W.data)==null?void 0:ee.message)||"Operation failed")}},J=async P=>{var W,ee;try{await ub({id:P}),me.success("Admin deleted"),w(null),G()}catch(te){me.error(((ee=(W=te.response)==null?void 0:W.data)==null?void 0:ee.message)||"Delete failed")}},ve=async P=>{var W,ee;try{const te=await pb({id:P});me.success("Password reset successfully"),g(te.data.data.temp_password),v(null)}catch(te){me.error(((ee=(W=te.response)==null?void 0:W.data)==null?void 0:ee.message)||"Reset failed")}};F.useEffect(()=>{V(1)},[T,A]);const se=a.filter(P=>{var te,Ne,Te;const W=((te=P.full_name)==null?void 0:te.toLowerCase().includes(T.toLowerCase()))||((Ne=P.email)==null?void 0:Ne.toLowerCase().includes(T.toLowerCase()))||((Te=P.username)==null?void 0:Te.toLowerCase().includes(T.toLowerCase())),ee=!A||P.role===A;return W&&ee}),oe=Math.ceil(se.length/U),Q=(B-1)*U,ce=se.slice(Q,Q+U),R={total:a.length,super:a.filter(P=>P.role==="super_admin").length,sub:a.filter(P=>P.role==="sub_admin").length,active:a.filter(P=>P.is_active).length,companies:new Set(a.filter(P=>P.company_id).map(P=>P.company_id)).size};return e.jsxs("div",{className:"premium-admins-page",children:[e.jsxs("div",{className:"dashboard-hero-premium",children:[e.jsxs("div",{className:"hero-content-p",children:[e.jsxs("div",{className:"hero-badge-p",children:[e.jsx(Po,{})," System Executive Suite"]}),e.jsx("h1",{className:"hero-title-p",children:"Access Management"}),e.jsx("p",{className:"hero-subtitle-p",children:"George Steuart Recruitment Orchestration | Identity & Access Control"})]}),e.jsx("div",{className:"hero-actions-p",children:e.jsxs("button",{className:"btn-hero-p primary",onClick:L,children:[e.jsx(Da,{})," Establish New Admin"]})}),e.jsx("div",{className:"hero-bg-accent"})]}),e.jsxs("div",{className:"stats-mosaic-grid admin-grid-4",children:[e.jsxs("div",{className:"stat-glass-card gold",children:[e.jsx("div",{className:"s-icon",children:e.jsx(kr,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Total Administrators"}),e.jsx("span",{className:"s-value",children:R.total})]}),e.jsxs("div",{className:"s-trend",children:[e.jsx(To,{})," Global Registry"]})]}),e.jsxs("div",{className:"stat-glass-card green",children:[e.jsx("div",{className:"s-icon",children:e.jsx(Bt,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Strategic (Super)"}),e.jsx("span",{className:"s-value",children:R.super})]}),e.jsx("div",{className:"s-trend positive",children:"Root Authority"})]}),e.jsxs("div",{className:"stat-glass-card blue",children:[e.jsx("div",{className:"s-icon",children:e.jsx(co,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Operational (Sub)"}),e.jsx("span",{className:"s-value",children:R.sub})]}),e.jsx("div",{className:"s-trend",children:"Company Scoped"})]}),e.jsxs("div",{className:"stat-glass-card purple",children:[e.jsx("div",{className:"s-icon",children:e.jsx(Ma,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Active Organizations"}),e.jsx("span",{className:"s-value",children:R.companies})]}),e.jsx("div",{className:"s-trend",children:"Stakeholders"})]})]}),e.jsxs("div",{className:"console-toolbar-p",children:[e.jsxs("div",{className:"toolbar-search-row",children:[e.jsxs("div",{className:"search-orchestrator",children:[e.jsx(Ar,{className:"s-icon"}),e.jsx("input",{id:"admin_search",name:"admin_search",type:"text",placeholder:"Search by name, email, or @handle...",value:T,onChange:P=>E(P.target.value)})]}),e.jsxs("button",{className:"btn-reset-p",onClick:()=>{E(""),D("")},children:[e.jsx(ct,{})," ",e.jsx("span",{children:"Reset Registry"})]})]}),e.jsx("div",{className:"toolbar-filters-row",children:e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Authority Role"}),e.jsxs("div",{className:"select-orchestrator",children:[e.jsx(nd,{className:"f-icon"}),e.jsxs("select",{id:"role_filter",name:"role_filter",value:A,onChange:P=>D(P.target.value),className:"select-lg",children:[e.jsx("option",{value:"",children:"All Authority Roles"}),e.jsx("option",{value:"super_admin",children:"Super Admins Only"}),e.jsx("option",{value:"sub_admin",children:"Sub Admins Only"})]})]})]})})]}),e.jsxs("div",{className:"results-card-p orchestration-container",children:[e.jsxs("div",{className:"orchestration-header",style:{flexWrap:"wrap",gap:"20px",padding:"24px 32px"},children:[e.jsxs("div",{className:"h-left",children:[e.jsx("h3",{style:{fontSize:"1.4rem"},children:"Identity Audit Log"}),e.jsx("p",{style:{fontSize:"0.85rem"},children:"Authorized access points and administrative signatures."})]}),e.jsx("div",{className:"h-right",children:e.jsxs("span",{className:"count-badge",children:[se.length," Profiles Identified"]})})]}),e.jsx("div",{className:"table-wrapper-p",children:e.jsxs("table",{className:"premium-table orchestration-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"IDENTIFIER"}),e.jsx("th",{children:"AUTHORITY LEVEL"}),e.jsx("th",{children:"SCOPE OF ACCESS"}),e.jsx("th",{children:"SYSTEM STATUS"}),e.jsx("th",{style:{textAlign:"center"},children:"OPERATIONS"})]})}),e.jsx("tbody",{children:d?e.jsx("tr",{children:e.jsxs("td",{colSpan:"5",style:{padding:"60px",textAlign:"center"},children:[e.jsx("div",{className:"spinner-p"}),e.jsx("p",{style:{marginTop:"16px",color:"var(--text-muted)"},children:"Synchronizing administrator registry..."})]})}):ce.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:"5",className:"empty-cell",children:e.jsxs("div",{className:"no-results",style:{padding:"60px",textAlign:"center"},children:[e.jsx(kr,{size:48,style:{color:"var(--border-light)",marginBottom:"16px"}}),e.jsx("p",{style:{color:"var(--text-muted)"},children:"No administrative profiles match your current decryption criteria."})]})})}):ce.map(P=>e.jsxs("tr",{className:"orchestration-row",children:[e.jsx("td",{"data-label":"Identifier",children:e.jsxs("div",{className:"admin-identity-cell",children:[e.jsx("div",{className:"admin-avatar-p",children:P.full_name.split(" ").map(W=>W[0]).join("").substring(0,2).toUpperCase()}),e.jsxs("div",{className:"admin-info-p",children:[e.jsx("span",{className:"admin-name-p",children:P.full_name}),e.jsxs("span",{className:"admin-email-p",children:[e.jsx(cr,{size:11})," ",P.email]})]})]})}),e.jsx("td",{"data-label":"Authority Level",children:e.jsxs("div",{className:"role-cell",children:[e.jsx("span",{className:`role-badge-p ${P.role==="super_admin"?"role-super":"role-sub"}`,children:P.role==="super_admin"?"Super Admin":"Sub Admin"}),e.jsxs("div",{className:"admin-email-p",style:{marginTop:"4px"},children:["@",P.username]})]})}),e.jsx("td",{"data-label":"Scope of Access",children:e.jsx("div",{className:"company-cell",style:{fontSize:"0.9rem",color:"var(--text-secondary)"},children:P.company_name?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(As,{size:13,style:{color:"var(--gold-accent)"}})," ",P.company_name]}):e.jsx("span",{className:"all-access",style:{fontWeight:700,color:"var(--crimson)",fontSize:"0.75rem",textTransform:"uppercase",letterSpacing:"0.5px"},children:"System-wide Access"})})}),e.jsx("td",{"data-label":"System Status",children:e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:e.jsx("span",{className:`status-pill ${P.is_active?"active":"inactive"}`,style:{padding:"4px 12px",borderRadius:"100px",fontSize:"0.7rem",fontWeight:800,background:P.is_active?"#ecfdf5":"#fef2f2",color:P.is_active?"#10b981":"#ef4444"},children:P.is_active?"Active":"Decommissioned"})})}),e.jsx("td",{"data-label":"Operations",children:e.jsx("div",{className:"orchestration-actions",style:{display:"flex",justifyContent:"center",gap:"8px"},children:P.role!=="super_admin"?e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"o-btn edit",onClick:()=>H(P),title:"Update Credentials",children:e.jsx(Rs,{})}),e.jsx("button",{className:"o-btn reset",onClick:()=>v(P),title:"Reset Password",style:{color:"var(--gold-accent)"},children:e.jsx(Nf,{})}),e.jsx("button",{className:"o-btn delete",onClick:()=>w(P),title:"Decommission Profile",children:e.jsx(aa,{})})]}):e.jsxs("div",{className:"protected-label",style:{fontSize:"0.7rem",fontWeight:800,color:"var(--crimson)",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx(Bt,{})," CORE AUTHORITY"]})})})]},P.id))})]})}),e.jsxs("div",{className:"pagination-footer",children:[e.jsxs("div",{className:"page-info",children:["Showing ",e.jsxs("strong",{children:[Q+1,"-",Math.min(Q+U,se.length)]})," of ",e.jsx("strong",{children:se.length})," administrators"]}),e.jsxs("div",{className:"pagination-controls",style:{display:"flex",gap:"12px"},children:[e.jsxs("button",{className:"page-btn",onClick:()=>V(P=>Math.max(P-1,1)),disabled:B===1,title:"Previous Page",children:[e.jsx(Ro,{})," Previous"]}),e.jsxs("button",{className:"page-btn",onClick:()=>V(P=>Math.min(P+1,oe)),disabled:B===oe||oe===0,title:"Next Page",children:["Next ",e.jsx(Tr,{})]})]})]})]}),f&&e.jsx("div",{className:"modal-overlay-p",onClick:()=>h(!1),children:e.jsxs("div",{className:"admin-modal-p confirm-modal card-p animated-zoom",onClick:P=>P.stopPropagation(),style:{maxWidth:"800px",width:"90%",textAlign:"left",overflow:"hidden"},children:[e.jsxs("div",{className:"modal-header-p",style:{padding:"24px 32px",borderBottom:"1px solid #f1f5f9"},children:[e.jsx("h2",{style:{fontSize:"1.5rem",margin:0},children:b?"Update Credentials":"Create Administrator"}),e.jsx("button",{className:"close-btn-p",onClick:()=>h(!1),children:e.jsx(ct,{})})]}),e.jsxs("form",{onSubmit:k,children:[e.jsx("div",{className:"modal-body-p",style:{padding:"32px",overflowY:"auto",maxHeight:"70vh"},children:e.jsxs("div",{className:"form-grid-p",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"20px"},children:[e.jsxs("div",{className:"form-group-p full-width",style:{gridColumn:"1 / -1"},children:[e.jsx("label",{htmlFor:"full_name",children:"Full Name"}),e.jsxs("div",{className:"input-with-icon",children:[e.jsx(kr,{className:"i"}),e.jsx("input",{id:"full_name",name:"full_name",type:"text",value:S.full_name,onChange:P=>z({...S,full_name:P.target.value}),placeholder:"e.g. John Doe",required:!0})]})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"username",children:"Username"}),e.jsx("input",{id:"username",name:"username",type:"text",value:S.username,onChange:P=>z({...S,username:P.target.value}),placeholder:"username",disabled:!!b,required:!0})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"email",children:"Email Address"}),e.jsx("input",{id:"email",name:"email",type:"email",value:S.email,onChange:P=>z({...S,email:P.target.value}),placeholder:"name@georgesteuart.com",required:!0})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"role",children:"System Role"}),e.jsxs("select",{id:"role",name:"role",value:S.role,onChange:P=>z({...S,role:P.target.value}),children:[e.jsx("option",{value:"sub_admin",children:"Sub Admin"}),e.jsx("option",{value:"super_admin",children:"Super Admin"})]})]}),S.role==="sub_admin"&&e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"company_id",children:"Assign Company"}),e.jsxs("select",{id:"company_id",name:"company_id",value:S.company_id,onChange:P=>z({...S,company_id:P.target.value}),required:!0,children:[e.jsx("option",{value:"",children:"Select company"}),o.map(P=>e.jsx("option",{value:P.id,children:P.name},P.id))]})]}),b&&e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"is_active",children:"Account Status"}),e.jsxs("select",{id:"is_active",name:"is_active",value:S.is_active,onChange:P=>z({...S,is_active:parseInt(P.target.value)}),children:[e.jsx("option",{value:1,children:"Active"}),e.jsx("option",{value:0,children:"Inactive"})]})]})]})}),e.jsxs("div",{className:"modal-footer-p",children:[e.jsx("button",{type:"button",className:"btn-cancel-p",onClick:()=>h(!1),children:"Cancel"}),e.jsx("button",{type:"submit",className:"btn btn-gold",children:b?"Update Access":"Provision Account"})]})]})]})}),N&&e.jsx("div",{className:"modal-overlay-p",onClick:()=>w(null),children:e.jsxs("div",{className:"delete-modal-p",onClick:P=>P.stopPropagation(),children:[e.jsx("div",{className:"alert-vibe",children:e.jsx(Lr,{})}),e.jsx("h3",{children:"Revoke Access?"}),e.jsxs("p",{children:["You are about to delete ",e.jsx("strong",{children:N.full_name}),". This person will immediately lose all administrative access."]}),e.jsxs("div",{className:"delete-actions-p",children:[e.jsx("button",{className:"btn-cancel-p",onClick:()=>w(null),children:"No, Keep"}),e.jsx("button",{className:"btn btn-danger",onClick:()=>J(N.id),children:"Yes, Revoke Access"})]})]})}),_&&e.jsx("div",{className:"modal-overlay-p",onClick:()=>v(null),children:e.jsxs("div",{className:"delete-modal-p",onClick:P=>P.stopPropagation(),children:[e.jsx("div",{className:"alert-vibe",style:{background:"rgba(200, 169, 81, 0.1)",color:"var(--gold-accent)"},children:e.jsx(Nf,{})}),e.jsx("h3",{children:"Reset Password?"}),e.jsxs("p",{children:["You are about to generate a new temporary password for ",e.jsx("strong",{children:_.full_name}),". Their current password will stop working immediately."]}),e.jsxs("div",{className:"delete-actions-p",children:[e.jsx("button",{className:"btn-cancel-p",onClick:()=>v(null),children:"Cancel"}),e.jsx("button",{className:"btn btn-gold",onClick:()=>ve(_.id),children:"Generate New Password"})]})]})}),x&&e.jsx("div",{className:"modal-overlay-p",children:e.jsxs("div",{className:"success-modal-p",children:[e.jsx("div",{className:"success-vibe",children:e.jsx(Tt,{})}),e.jsx("h3",{children:"Account Provisioned"}),e.jsx("p",{children:"Access has been created. Use this temporary password for the first login:"}),e.jsxs("div",{className:"password-display-p",style:{position:"relative",cursor:"pointer"},onClick:()=>{navigator.clipboard.writeText(x),me.success("Password copied to tactical clipboard")},title:"Click to Copy",children:[x,e.jsx("div",{className:"copy-hint",style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"0.8rem",opacity:.5},children:e.jsx(wb,{})})]}),e.jsx("p",{className:"note-p",children:"This password will expire after one-time use."}),e.jsx("button",{className:"btn btn-gold full-btn",onClick:()=>g(null),children:"Done. I have copied it."})]})}),e.jsx("style",{jsx:"true",children:`
                .premium-admins-page {
                    animation: fadeIn 0.4s ease-out;
                    max-width: 1300px;
                    margin: 0 auto;
                }

                /* HERITAGE CINEMATIC HERO */
                .dashboard-hero-premium {
                    position: relative;
                    background: linear-gradient(135deg, #2a050b 0%, #1a1a2e 100%);
                    border-radius: 20px;
                    padding: 24px;
                    overflow: hidden;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-bottom: 24px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .hero-content-p { position: relative; z-index: 2; }
                .hero-badge-p {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(200, 169, 81, 0.1);
                    border: 1px solid rgba(200, 169, 81, 0.2);
                    padding: 6px 16px;
                    border-radius: 100px;
                    color: var(--gold-accent);
                    font-size: 0.75rem;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    margin-bottom: 20px;
                }

                .hero-title-p {
                    color: #fff;
                    font-family: var(--font-heading);
                    font-size: 1.8rem;
                    margin: 0;
                    letter-spacing: -0.5px;
                    line-height: 1.1;
                }

                .hero-subtitle-p {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.9rem;
                    margin-top: 8px;
                }

                .btn-hero-p {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 20px;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border: none;
                }

                .btn-hero-p.primary {
                    background: var(--gold-accent);
                    color: #2a050b;
                    box-shadow: 0 10px 30px rgba(200, 169, 81, 0.3);
                }

                .btn-hero-p:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.3); }

                .hero-bg-accent {
                    position: absolute;
                    top: -100px; right: -100px;
                    width: 500px; height: 500px;
                    background: radial-gradient(circle, rgba(200, 169, 81, 0.15) 0%, transparent 70%);
                    z-index: 1;
                    pointer-events: none;
                }

                /* STATS MOSAIC */
                .stats-mosaic-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 16px;
                    margin-bottom: 24px;
                }

                .stat-glass-card {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 20px;
                    border: 1px solid #fff;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
                    transition: transform 0.3s;
                }

                .stat-glass-card:hover { transform: translateY(-8px); }
                .stat-glass-card .s-icon {
                    width: 48px; height: 48px; border-radius: 14px;
                    display: flex; items: center; justify-content: center; font-size: 1.4rem;
                }

                .stat-glass-card.gold .s-icon { background: #fffbeb; color: #b45309; }
                .stat-glass-card.green .s-icon { background: #f0fdf4; color: #166534; }
                .stat-glass-card.blue .s-icon { background: #eff6ff; color: #1e40af; }
                .stat-glass-card.purple .s-icon { background: #faf5ff; color: #6b21a8; }

                .s-info .s-label { display: block; font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
                .s-info .s-value { display: block; font-size: 1.5rem; font-weight: 800; color: #1e293b; margin-top: 4px; }
                .s-trend { font-size: 0.75rem; color: #64748b; font-weight: 600; display: flex; align-items: center; gap: 6px; }

                /* REFINED CONSOLE TOOLBAR */
                .console-toolbar-p {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-bottom: 24px;
                    background: #fff;
                    padding: 20px;
                    border-radius: 20px;
                    border: 1px solid var(--border-light);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                }

                .toolbar-search-row {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .search-orchestrator {
                    position: relative;
                    flex: 1;
                }

                .s-icon {
                    position: absolute;
                    left: 18px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    font-size: 1.1rem;
                    z-index: 10;
                }

                .search-orchestrator input {
                    width: 100%;
                    padding: 12px 20px 12px 48px;
                    border-radius: 12px;
                    border: 1.5px solid #f1f5f9;
                    background: #f8fafc;
                    font-size: 0.9rem;
                    transition: all 0.3s;
                }

                .search-orchestrator input:focus {
                    outline: none;
                    background: #fff;
                    border-color: var(--crimson);
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .btn-reset-p {
                    background: #fff;
                    color: var(--text-muted);
                    border: 1.5px solid #f1f5f9;
                    padding: 0 20px;
                    height: 48px;
                    border-radius: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.85rem;
                    flex-shrink: 0;
                }

                .btn-reset-p:hover {
                    background: #fef2f2;
                    color: var(--crimson);
                    border-color: #fee2e2;
                }

                .toolbar-filters-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    padding-top: 16px;
                    border-top: 1px solid #f1f5f9;
                }

                .filter-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .filter-group label {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    padding-left: 4px;
                }

                .select-orchestrator {
                    position: relative;
                }

                .f-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--crimson);
                    pointer-events: none;
                    z-index: 10;
                }

                .select-orchestrator select {
                    padding: 0 40px 0 38px;
                    height: 46px;
                    border-radius: 12px;
                    border: 1.5px solid #f1f5f9;
                    background: #f8fafc;
                    font-size: 0.85rem;
                    font-weight: 700;
                    appearance: none;
                    cursor: pointer;
                    color: var(--text-primary);
                    transition: all 0.2s;
                }

                .select-orchestrator select:focus {
                    outline: none;
                    border-color: var(--crimson);
                    background: #fff;
                    box-shadow: 0 0 0 4px rgba(139, 26, 43, 0.05);
                }

                .select-lg { min-width: 200px; }

                /* ORCHESTRATION TABLE */
                .orchestration-container { 
                    border-radius: 20px; 
                    padding: 0 !important;
                    background: #fff;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.03);
                    border: 1px solid rgba(0,0,0,0.03);
                }

                .orchestration-header {
                    padding: 20px 24px; 
                    border-bottom: 1px solid #f1f5f9;
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center;
                    background: linear-gradient(to right, #fff, #fafafa);
                }

                .orchestration-header h3 { 
                    font-family: var(--font-heading); 
                    font-size: 1.2rem; 
                    margin: 0; 
                    color: #1e293b; 
                    letter-spacing: -0.5px;
                }

                .orchestration-header p { 
                    margin: 4px 0 0; 
                    color: #94a3b8; 
                    font-size: 0.85rem; 
                    font-weight: 500;
                }

                .count-badge { 
                    padding: 8px 18px; 
                    background: rgba(148, 163, 184, 0.1); 
                    border-radius: 100px; 
                    font-weight: 700; 
                    font-size: 0.8rem; 
                    color: #64748b; 
                    border: 1px solid rgba(148, 163, 184, 0.1);
                }

                .table-wrapper-p {
                    overflow-x: auto;
                    width: 100%;
                }

                .premium-table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    min-width: 800px;
                }
                .premium-table th { 
                    padding: 20px 32px; 
                    text-align: left; 
                    font-size: 0.75rem; 
                    font-weight: 800; 
                    color: #94a3b8; 
                    text-transform: uppercase; 
                    letter-spacing: 1.5px;
                    background: #fcfcfd;
                    border-bottom: 2px solid #f1f5f9;
                }

                .orchestration-row { 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border-bottom: 1px solid #f8fafc;
                }

                .orchestration-row:hover { 
                    background: rgba(139, 26, 43, 0.015);
                    transform: translateX(4px);
                    box-shadow: inset 4px 0 0 var(--crimson), 0 10px 30px rgba(0,0,0,0.02);
                }

                .orchestration-row td { 
                    padding: 12px 16px; 
                    vertical-align: middle;
                }

                /* Admin Identifier Cell */
                .admin-cell { display: flex; align-items: center; gap: 20px; }
                .avatar-p { 
                    width: 52px; height: 52px; border-radius: 18px; 
                    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                    display: flex; items: center; justify-content: center;
                    color: #64748b; font-size: 1.5rem;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .orchestration-row:hover .avatar-p {
                    background: var(--crimson);
                    color: #fff;
                    border-color: var(--crimson);
                    transform: rotate(-8deg) scale(1.1);
                    box-shadow: 0 10px 20px rgba(139, 26, 43, 0.2);
                }

                .info-p { display: flex; flex-direction: column; gap: 4px; }
                .name-p { font-weight: 800; color: #1e293b; font-size: 0.95rem; letter-spacing: -0.2px; }
                .email-p { font-size: 0.85rem; color: #94a3b8; font-weight: 500; display: flex; align-items: center; gap: 6px; }

                /* Authority Cell */
                .role-cell { display: flex; flex-direction: column; gap: 8px; }
                .role-pill {
                    display: inline-flex; items: center; gap: 8px;
                    padding: 6px 14px; border-radius: 10px;
                    font-size: 0.8rem; font-weight: 800; letter-spacing: 0.5px;
                    width: fit-content;
                }
                .role-pill.super { background: rgba(139, 26, 43, 0.08); color: var(--crimson); }
                .role-pill.sub { background: rgba(30, 64, 175, 0.08); color: #1e40af; }
                
                .username-p { font-size: 0.8rem; color: #64748b; font-weight: 600; opacity: 0.7; }

                /* Scope & Status */
                .company-cell { font-size: 0.95rem; color: #475569; font-weight: 600; display: flex; align-items: center; gap: 10px; }
                .all-access { color: var(--crimson); font-weight: 800; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }

                .status-pill {
                    padding: 6px 14px; border-radius: 100px; font-size: 0.75rem; font-weight: 800;
                    text-transform: uppercase; letter-spacing: 1px;
                    border: 1px solid transparent;
                }
                .status-pill.active { 
                    background: #f0fdf4; 
                    color: #166534; 
                    border-color: rgba(22, 101, 52, 0.1);
                }
                .status-pill.inactive { 
                    background: #fff1f2; 
                    color: #be123c; 
                    border-color: rgba(190, 18, 60, 0.1);
                }

                /* Operations */
                .orchestration-actions { display: flex; gap: 14px; justify-content: center; }
                .o-btn {
                    width: 42px; height: 42px; border-radius: 12px;
                    display: flex; items: center; justify-content: center;
                    border: none; background: #f8fafc; cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); 
                    font-size: 1.1rem;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.02);
                }

                .o-btn.edit { 
                    color: #6366f1; 
                    background: rgba(99, 102, 241, 0.08); 
                }
                .o-btn.edit:hover { 
                    background: #6366f1; 
                    color: #fff; 
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.25);
                }

                .o-btn.delete { 
                    color: #ef4444; 
                    background: rgba(239, 68, 68, 0.08); 
                }
                .o-btn.delete:hover { 
                    background: #ef4444; 
                    color: #fff; 
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.25);
                }

                .o-btn.reset { 
                    color: var(--gold-accent); 
                    background: rgba(200, 169, 81, 0.08); 
                }
                .o-btn.reset:hover { 
                    background: var(--gold-accent); 
                    color: #fff; 
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 8px 20px rgba(200, 169, 81, 0.25);
                }

                .protected-label {
                    font-size: 0.7rem; font-weight: 900; color: #94a3b8; 
                    background: #f8fafc; padding: 10px 18px; border-radius: 12px;
                    border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 8px;
                    letter-spacing: 1.5px;
                }

                .no-results { text-align: center; padding: 60px 0; color: #94a3b8; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                /* RESPONSIVENESS */
                @media (max-width: 1024px) {
                    .dashboard-hero-premium {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 30px;
                        padding: 40px;
                    }
                    
                    .hero-title-p { font-size: 2.5rem; }
                    
                    /* Removed redundant stats-mosaic-grid media query */
                }

                @media (max-width: 768px) {
                    .orchestration-toolbar {
                        grid-template-columns: 1fr 1fr;
                    }
                    
                    .filter-orchestrator { width: 100%; }
                    .f-group { width: 100%; justify-content: space-between; }
                    
                    .orchestration-header {
                        padding: 25px;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 15px;
                    }
                    
                    .premium-table thead { display: none; }
                    
                    .orchestration-row {
                        display: block;
                        padding: 20px;
                        border-bottom: 8px solid #f1f5f9;
                    }
                    
                    .orchestration-row td {
                        display: block;
                        padding: 10px 0;
                        border: none;
                        width: 100%;
                    }
                    
                    .orchestration-row td::before {
                        content: attr(data-label);
                        display: block;
                        font-size: 0.7rem;
                        font-weight: 800;
                        color: #94a3b8;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 5px;
                    }
                    
                    .orchestration-actions {
                        justify-content: flex-start;
                        margin-top: 10px;
                    }
                }

                @media (max-width: 480px) {
                    /* Moved to global utility classes */
                    
                    .hero-title-p { font-size: 2rem; }
                    
                    .form-grid-p { grid-template-columns: 1fr; }
                    .full-width { grid-column: span 1; }
                }

                /* Reuse existing modal styles... */


                /* Premium Modal */
                .modal-overlay-p {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                }

                .admin-modal-p {
                    background: #fff;
                    width: 100%;
                    max-width: 600px;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    animation: modalEntry 0.3s ease-out;
                }

                .modal-header-p {
                    padding: 24px 30px;
                    background: #f8fafc;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #e2e8f0;
                }

                .modal-header-p h2 { font-family: var(--font-heading); font-size: 1.5rem; margin: 0; color: var(--text-primary); }

                .modal-body-p { padding: 30px; }
                .form-grid-p { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .full-width { grid-column: span 2; }

                .form-group-p label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--text-secondary);
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .form-group-p input, .form-group-p select {
                    width: 100%;
                    padding: 12px 16px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    font-size: 0.95rem;
                    background: #f8fafc;
                }

                .input-with-icon { position: relative; }
                .input-with-icon .i { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
                .input-with-icon input { padding-left: 42px; }

                .modal-footer-p {
                    padding: 20px 30px;
                    background: #f8fafc;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                    border-top: 1px solid #e2e8f0;
                }

                .btn-cancel-p { 
                    background: transparent; border: none; 
                    font-weight: 700; color: var(--text-muted); 
                    padding: 10px 20px; cursor: pointer;
                }

                /* Delete Modal */
                .delete-modal-p {
                    background: #fff;
                    width: 100%;
                    max-width: 400px;
                    padding: 40px;
                    border-radius: 24px;
                    text-align: center;
                }
                .alert-vibe { 
                    width: 60px; height: 60px; 
                    background: #fef2f2; color: #ef4444; 
                    border-radius: 50%; display: flex; 
                    align-items: center; justify-content: center; 
                    font-size: 2rem; margin: 0 auto 20px;
                }
                .delete-actions-p { display: flex; gap: 12px; margin-top: 30px; }

                /* Success Modal */
                .success-modal-p {
                    background: #fff;
                    width: 100%;
                    max-width: 400px;
                    padding: 40px;
                    border-radius: 24px;
                    text-align: center;
                }
                .success-vibe {
                    width: 60px; height: 60px;
                    background: #dcfce7; color: #16a34a;
                    border-radius: 50%; display: flex;
                    align-items: center; justify-content: center;
                    font-size: 2rem; margin: 0 auto 20px;
                }
                .password-display-p {
                    background: #1a1a2e;
                    color: var(--gold-accent);
                    padding: 20px;
                    border-radius: 16px;
                    font-family: monospace;
                    font-size: 1.8rem;
                    font-weight: 700;
                    letter-spacing: 4px;
                    margin: 20px 0;
                    transition: all 0.2s;
                }
                .password-display-p:hover {
                    background: #252545;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                }
                .password-display-p:active {
                    transform: translateY(0);
                }
                .password-display-p:hover .copy-hint {
                    opacity: 1 !important;
                }
                .note-p { font-size: 0.8rem; color: var(--text-muted); }
                .full-btn { width: 100%; margin-top: 20px; }

                @keyframes modalEntry {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .spinner-p {
                    width: 30px; height: 30px;
                    border: 2px solid #f1f5f9;
                    border-top-color: var(--crimson);
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                    margin: 40px auto;
                }

                @keyframes spin { to { transform: rotate(360deg); } }
            `})]})}const Rc=Et.replace("/api","");function D1({admin:s}){const[a,n]=F.useState([]),[o,l]=F.useState([]),[d,u]=F.useState(!0),[f,h]=F.useState(!1),[b,j]=F.useState(null),[N,w]=F.useState(null),[_,v]=F.useState(null),[x,g]=F.useState(null),[S,z]=F.useState({name:"",location:"",description:""}),[T,E]=F.useState(""),[A,D]=F.useState(1),B=8,[V,U]=F.useState(!1),[G,fe]=F.useState(""),[L,H]=F.useState(""),[k,J]=F.useState(null),[ve,se]=F.useState(""),[oe,Q]=F.useState(null),[ce,R]=F.useState(""),[P,W]=F.useState(1),ee=8;F.useEffect(()=>{te()},[]);const te=async()=>{try{u(!0);try{const Y=await un();n(Y.data.data||[])}catch(Y){console.error("Failed to load companies:",Y),me.error("Failed to retrieve companies registry")}try{const Y=await Ch();l(Y.data.data||[])}catch(Y){console.error("Failed to load locations:",Y),me.error("Failed to retrieve locations registry")}}finally{u(!1)}},Ne=()=>{z({name:"",location:"",description:""}),j(null),v(null),g(null)},Te=()=>{Ne(),h(!0)},_e=Y=>{z({name:Y.name,location:Y.location||"",description:Y.description||""}),j(Y.id),v(Y.logo?`${Rc}/uploads/logos/${Y.logo}`:null),g(null),h(!0)},ze=Y=>{const ke=Y.target.files[0];if(ke){if(!["image/jpeg","image/png","image/gif","image/webp","image/svg+xml"].includes(ke.type)){me.error("Only JPG, PNG, GIF, WEBP, and SVG logo images are allowed");return}g(ke),v(URL.createObjectURL(ke))}},He=async Y=>{var De,Fe;if(Y.preventDefault(),!S.name||!S.location){me.error("Company Name and Location are required");return}const ke=new FormData;ke.append("name",S.name),ke.append("location",S.location),ke.append("description",S.description),b&&ke.append("id",b),x&&ke.append("logo",x);try{u(!0),b?(await Uv(ke),me.success("Company details updated successfully")):(await Wv(ke),me.success("New company registered successfully")),h(!1),Ne(),te()}catch(mt){me.error(((Fe=(De=mt.response)==null?void 0:De.data)==null?void 0:Fe.message)||"Operation failed")}finally{u(!1)}},Qe=async Y=>{var ke,De;try{u(!0),await $v({id:Y}),me.success("Company and cascade vacancies deleted successfully"),w(null),te()}catch(Fe){me.error(((De=(ke=Fe.response)==null?void 0:ke.data)==null?void 0:De.message)||"Delete operation failed")}finally{u(!1)}},xe=()=>{fe(""),H(""),U(!0)},Ae=async Y=>{var ke,De;if(Y.preventDefault(),!G){me.error("Please select a company entity first");return}if(!L.trim()){me.error("Location name cannot be empty");return}try{u(!0),await Vv({company_id:parseInt(G),location:L.trim()}),me.success("Company location added successfully"),H(""),te()}catch(Fe){me.error(((De=(ke=Fe.response)==null?void 0:ke.data)==null?void 0:De.message)||"Failed to add location")}finally{u(!1)}},y=async Y=>{var ke,De;if(Y.preventDefault(),!ve.trim()){me.error("Location name cannot be empty");return}try{u(!0),await Hv({id:k,location:ve.trim()}),me.success("Location updated successfully"),J(null),se(""),te()}catch(Fe){me.error(((De=(ke=Fe.response)==null?void 0:ke.data)==null?void 0:De.message)||"Failed to update location")}finally{u(!1)}},he=async Y=>{var ke,De;try{u(!0),await qv({id:Y}),me.success("Location deleted successfully"),Q(null),te()}catch(Fe){me.error(((De=(ke=Fe.response)==null?void 0:ke.data)==null?void 0:De.message)||"Failed to delete location")}finally{u(!1)}},re=a.filter(Y=>{var De,Fe,mt;return((De=Y.name)==null?void 0:De.toLowerCase().includes(T.toLowerCase()))||((Fe=Y.location)==null?void 0:Fe.toLowerCase().includes(T.toLowerCase()))||((mt=Y.description)==null?void 0:mt.toLowerCase().includes(T.toLowerCase()))}),I=Math.ceil(re.length/B),O=(A-1)*B,Z=re.slice(O,O+B),ge=o.filter(Y=>{var De,Fe;return((De=Y.company_name)==null?void 0:De.toLowerCase().includes(ce.toLowerCase()))||((Fe=Y.location)==null?void 0:Fe.toLowerCase().includes(ce.toLowerCase()))}),pe=Math.ceil(ge.length/ee),ae=(P-1)*ee,we=ge.slice(ae,ae+ee),Ce={total:a.length,insideLocations:o.length,recent:a.slice(-3).map(Y=>Y.name).join(", ")};return e.jsxs("div",{className:"premium-admins-page",children:[e.jsxs("div",{className:"dashboard-hero-premium",children:[e.jsxs("div",{className:"hero-content-p",children:[e.jsxs("div",{className:"hero-badge-p",children:[e.jsx(Po,{})," Enterprise Registry"]}),e.jsx("h1",{className:"hero-title-p",children:"Manage Corporate Entities"}),e.jsx("p",{className:"hero-subtitle-p",children:"George Steuart Group | Configure and govern subsidiaries and parent entities"})]}),s.role==="super_admin"&&e.jsxs("div",{className:"hero-actions-p",style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsxs("button",{className:"btn-hero-p primary",onClick:Te,children:[e.jsx(Da,{})," Register New Entity"]}),e.jsxs("button",{className:"btn-hero-p",style:{background:"var(--crimson)",color:"#fff",border:"1px solid rgba(255, 255, 255, 0.1)"},onClick:xe,children:[e.jsx(xt,{})," Manage Company Location"]})]}),e.jsx("div",{className:"hero-bg-accent"})]}),e.jsxs("div",{className:"stats-mosaic-grid admin-grid-3",children:[e.jsxs("div",{className:"stat-glass-card gold",children:[e.jsx("div",{className:"s-icon",children:e.jsx(As,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Registered Subsidiaries"}),e.jsx("span",{className:"s-value",children:Ce.total})]}),e.jsxs("div",{className:"s-trend",children:[e.jsx(To,{})," Global Entities"]})]}),e.jsxs("div",{className:"stat-glass-card green",children:[e.jsx("div",{className:"s-icon",children:e.jsx(xt,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Company Inside Locations"}),e.jsx("span",{className:"s-value",children:Ce.insideLocations})]}),e.jsx("div",{className:"s-trend positive",children:"Locations Registry"})]}),e.jsxs("div",{className:"stat-glass-card blue",children:[e.jsx("div",{className:"s-icon",children:e.jsx(Oa,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Lately Seeded Entities"}),e.jsx("span",{className:"s-value",style:{fontSize:"0.85rem",fontWeight:700,whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden",display:"block",marginTop:"12px"},children:Ce.recent||"None"})]}),e.jsx("div",{className:"s-trend",children:"New Sub-entities"})]})]}),e.jsx("div",{className:"console-toolbar-p",children:e.jsxs("div",{className:"toolbar-search-row",children:[e.jsxs("div",{className:"search-orchestrator",children:[e.jsx(Ar,{className:"s-icon"}),e.jsx("input",{id:"company_search",name:"company_search",type:"text",placeholder:"Search by company name, location, or description...",value:T,onChange:Y=>E(Y.target.value)})]}),e.jsxs("button",{className:"btn-reset-p",onClick:()=>E(""),children:[e.jsx(ct,{})," ",e.jsx("span",{children:"Clear Filters"})]})]})}),e.jsxs("div",{className:"results-card-p orchestration-container",children:[e.jsxs("div",{className:"orchestration-header",style:{flexWrap:"wrap",gap:"20px",padding:"24px 32px"},children:[e.jsxs("div",{className:"h-left",children:[e.jsx("h3",{style:{fontSize:"1.4rem"},children:"Strategic Corporate Directory"}),e.jsx("p",{style:{fontSize:"0.85rem"},children:"View, modify, and manage information relating to corporate divisions."})]}),e.jsx("div",{className:"h-right",children:e.jsxs("span",{className:"count-badge",children:[re.length," Entities Registered"]})})]}),e.jsx("div",{className:"table-wrapper-p",children:e.jsxs("table",{className:"premium-table orchestration-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"COMPANY ENTITY"}),e.jsx("th",{children:"OPERATIONAL HEADQUARTERS"}),e.jsx("th",{children:"TOTAL LOCATIONS"}),e.jsx("th",{children:"CORPORATE PROFILE"}),s.role==="super_admin"&&e.jsx("th",{style:{textAlign:"center"},children:"OPERATIONS"})]})}),e.jsx("tbody",{children:d?e.jsx("tr",{children:e.jsxs("td",{colSpan:s.role==="super_admin"?5:4,style:{padding:"60px",textAlign:"center"},children:[e.jsx("div",{className:"spinner-p"}),e.jsx("p",{style:{marginTop:"16px",color:"var(--text-muted)"},children:"Synchronizing strategic corporate logs..."})]})}):Z.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:s.role==="super_admin"?5:4,className:"empty-cell",children:e.jsxs("div",{className:"no-results",style:{padding:"60px",textAlign:"center"},children:[e.jsx(As,{size:48,style:{color:"var(--border-light)",marginBottom:"16px"}}),e.jsx("p",{style:{color:"var(--text-muted)"},children:"No strategic companies found matching your search term."})]})})}):Z.map(Y=>e.jsxs("tr",{className:"orchestration-row",children:[e.jsx("td",{"data-label":"Company Entity",children:e.jsxs("div",{className:"admin-identity-cell",children:[e.jsx("div",{className:"company-logo-circle",style:{width:"45px",height:"45px",borderRadius:"12px",border:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",background:"#fff",overflow:"hidden",padding:"4px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",flexShrink:0},children:e.jsx("img",{src:Y.logo?`${Rc}/uploads/logos/${Y.logo}`:"/gs-logo.png",alt:Y.name,onError:ke=>ke.target.src="/gs-logo.png",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{className:"admin-info-p",children:[e.jsx("span",{className:"admin-name-p",style:{fontWeight:700,fontSize:"0.95rem"},children:Y.name}),e.jsxs("span",{className:"admin-email-p",style:{fontSize:"0.75rem",color:"#94a3b8"},children:["ID: ",Y.id]})]})]})}),e.jsx("td",{"data-label":"Operational Headquarters",children:e.jsxs("div",{className:"location-cell",style:{display:"flex",alignItems:"center",gap:"8px",color:"#1a1a2e",fontWeight:600},children:[e.jsx(xt,{style:{color:"var(--gold-accent)"}}),e.jsx("span",{children:Y.location||"Not Specified"})]})}),e.jsx("td",{"data-label":"Total Locations",children:e.jsxs("div",{className:"tooltip-trigger",style:{display:"inline-flex",alignItems:"center",gap:"6px",background:"rgba(200, 169, 81, 0.1)",color:"var(--gold-accent)",padding:"4px 12px",borderRadius:"100px",fontSize:"0.8rem",fontWeight:700},children:[e.jsx("span",{children:Y.total_locations||0}),Y.total_locations>0&&e.jsx("div",{className:"tooltip-content",children:Y.locations_list})]})}),e.jsx("td",{"data-label":"Corporate Profile",children:e.jsx("p",{style:{maxWidth:"300px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontSize:"0.82rem",color:"#64748b",margin:0},children:Y.description||"No corporate description added."})}),s.role==="super_admin"&&e.jsx("td",{"data-label":"Operations",children:e.jsxs("div",{className:"orchestration-actions",style:{display:"flex",justifyContent:"center",gap:"8px"},children:[e.jsx("button",{className:"o-btn edit",onClick:()=>_e(Y),title:"Update Company Info",children:e.jsx(Rs,{})}),e.jsx("button",{className:"o-btn delete",onClick:()=>w(Y),title:"Delete Corporate Division",children:e.jsx(aa,{})})]})})]},Y.id))})]})}),e.jsxs("div",{className:"pagination-footer",children:[e.jsxs("div",{className:"page-info",children:["Showing ",e.jsxs("strong",{children:[O+1,"-",Math.min(O+B,re.length)]})," of ",e.jsx("strong",{children:re.length})," divisions"]}),e.jsxs("div",{className:"pagination-controls",style:{display:"flex",gap:"12px"},children:[e.jsx("button",{className:"page-btn",onClick:()=>D(Y=>Math.max(Y-1,1)),disabled:A===1,children:"Previous"}),e.jsx("button",{className:"page-btn",onClick:()=>D(Y=>Math.min(Y+1,I)),disabled:A===I||I===0,children:"Next"})]})]})]}),e.jsxs("div",{className:"results-card-p orchestration-container",style:{marginTop:"32px"},children:[e.jsxs("div",{className:"orchestration-header",style:{flexWrap:"wrap",gap:"20px",padding:"24px 32px"},children:[e.jsxs("div",{className:"h-left",children:[e.jsx("h3",{style:{fontSize:"1.4rem"},children:"Locations Registry"}),e.jsx("p",{style:{fontSize:"0.85rem"},children:"View, search, edit and remove locations registered under subsidiaries."})]}),e.jsxs("div",{className:"h-right",style:{display:"flex",alignItems:"center",gap:"16px",flexWrap:"wrap"},children:[e.jsxs("div",{className:"search-orchestrator",style:{width:"280px",position:"relative"},children:[e.jsx(Ar,{className:"s-icon",style:{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",color:"#94a3b8"}}),e.jsx("input",{type:"text",placeholder:"Search locations...",value:ce,onChange:Y=>R(Y.target.value),style:{padding:"8px 16px 8px 40px",borderRadius:"10px",border:"1.5px solid #e2e8f0",background:"#f8fafc",fontSize:"0.85rem",width:"100%"}})]}),e.jsxs("span",{className:"count-badge",children:[ge.length," Locations Active"]})]})]}),e.jsx("div",{className:"table-wrapper-p",children:e.jsxs("table",{className:"premium-table orchestration-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"COMPANY ENTITY"}),e.jsx("th",{children:"OPERATIONAL LOCATION"}),s.role==="super_admin"&&e.jsx("th",{style:{textAlign:"center"},children:"OPERATIONS"})]})}),e.jsx("tbody",{children:d?e.jsx("tr",{children:e.jsxs("td",{colSpan:s.role==="super_admin"?3:2,style:{padding:"60px",textAlign:"center"},children:[e.jsx("div",{className:"spinner-p"}),e.jsx("p",{style:{marginTop:"16px",color:"var(--text-muted)"},children:"Synchronizing location registers..."})]})}):we.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:s.role==="super_admin"?3:2,className:"empty-cell",children:e.jsxs("div",{className:"no-results",style:{padding:"60px",textAlign:"center"},children:[e.jsx(xt,{size:48,style:{color:"var(--border-light)",marginBottom:"16px"}}),e.jsx("p",{style:{color:"var(--text-muted)"},children:ce?"No location records found matching your search term.":"No locations registered yet."})]})})}):we.map(Y=>e.jsxs("tr",{className:"orchestration-row",children:[e.jsx("td",{"data-label":"Company Entity",children:e.jsxs("div",{className:"admin-identity-cell",children:[e.jsx("div",{className:"company-logo-circle",style:{width:"36px",height:"36px",borderRadius:"10px",border:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",background:"#fff",overflow:"hidden",padding:"3px",flexShrink:0},children:e.jsx("img",{src:Y.company_logo?`${Rc}/uploads/logos/${Y.company_logo}`:"/gs-logo.png",alt:Y.company_name,onError:ke=>ke.target.src="/gs-logo.png",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsx("div",{className:"admin-info-p",children:e.jsx("span",{className:"admin-name-p",style:{fontWeight:700,fontSize:"0.9rem"},children:Y.company_name})})]})}),e.jsx("td",{"data-label":"Operational Location",children:k===Y.id?e.jsxs("form",{onSubmit:y,style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("input",{type:"text",value:ve,onChange:ke=>se(ke.target.value),required:!0,style:{padding:"6px 12px",borderRadius:"8px",border:"1.5px solid var(--crimson)",fontSize:"0.85rem",background:"#fff"}}),e.jsx("button",{type:"submit",className:"btn btn-gold",style:{padding:"6px 12px",fontSize:"0.75rem",borderRadius:"8px"},children:"Save"}),e.jsx("button",{type:"button",className:"btn-cancel-p",onClick:()=>J(null),style:{padding:"6px 12px",fontSize:"0.75rem",borderRadius:"8px"},children:"Cancel"})]}):e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",color:"#1a1a2e",fontWeight:600},children:[e.jsx(xt,{style:{color:"var(--crimson)"}}),e.jsx("span",{children:Y.location})]})}),s.role==="super_admin"&&e.jsx("td",{"data-label":"Operations",children:e.jsxs("div",{className:"orchestration-actions",style:{display:"flex",justifyContent:"center",gap:"8px"},children:[e.jsx("button",{className:"o-btn edit",onClick:()=>{J(Y.id),se(Y.location)},title:"Update Location",children:e.jsx(Rs,{})}),e.jsx("button",{className:"o-btn delete",onClick:()=>Q(Y),title:"Delete Location",children:e.jsx(aa,{})})]})})]},Y.id))})]})}),e.jsxs("div",{className:"pagination-footer",children:[e.jsxs("div",{className:"page-info",children:["Showing ",e.jsxs("strong",{children:[ae+1,"-",Math.min(ae+ee,ge.length)]})," of ",e.jsx("strong",{children:ge.length})," locations"]}),e.jsxs("div",{className:"pagination-controls",style:{display:"flex",gap:"12px"},children:[e.jsx("button",{className:"page-btn",onClick:()=>W(Y=>Math.max(Y-1,1)),disabled:P===1,children:"Previous"}),e.jsx("button",{className:"page-btn",onClick:()=>W(Y=>Math.min(Y+1,pe)),disabled:P===pe||pe===0,children:"Next"})]})]})]}),f&&e.jsx("div",{className:"modal-overlay-p",onClick:()=>h(!1),children:e.jsxs("div",{className:"admin-modal-p confirm-modal card-p animated-zoom",onClick:Y=>Y.stopPropagation(),style:{maxWidth:"750px",width:"90%",textAlign:"left",overflow:"hidden"},children:[e.jsxs("div",{className:"modal-header-p",style:{padding:"24px 32px",borderBottom:"1px solid #f1f5f9"},children:[e.jsx("h2",{style:{fontSize:"1.5rem",margin:0},children:b?"Modify Entity Credentials":"Register Corporate Entity"}),e.jsx("button",{className:"close-btn-p",onClick:()=>h(!1),children:e.jsx(ct,{})})]}),e.jsxs("form",{onSubmit:He,children:[e.jsx("div",{className:"modal-body-p",style:{padding:"32px",overflowY:"auto",maxHeight:"70vh"},children:e.jsxs("div",{className:"form-grid-p",style:{display:"grid",gridTemplateColumns:"1fr",gap:"20px"},children:[e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"company_name",children:["Company Name ",e.jsx("span",{style:{color:"var(--crimson)"},children:"*"})]}),e.jsx("input",{id:"company_name",name:"company_name",type:"text",value:S.name,onChange:Y=>z({...S,name:Y.target.value}),placeholder:"e.g. George Steuart & Company Ltd",required:!0})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"company_location",children:["Operational Location / Headquarters ",e.jsx("span",{style:{color:"var(--crimson)"},children:"*"})]}),e.jsxs("div",{className:"input-with-icon",style:{position:"relative"},children:[e.jsx(xt,{style:{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",color:"#94a3b8"}}),e.jsx("input",{id:"company_location",name:"company_location",type:"text",value:S.location,onChange:Y=>z({...S,location:Y.target.value}),placeholder:"e.g. Colombo 03, Sri Lanka",style:{paddingLeft:"44px"},required:!0})]})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"company_description",children:"Corporate Description"}),e.jsx("textarea",{id:"company_description",name:"company_description",value:S.description,onChange:Y=>z({...S,description:Y.target.value}),placeholder:"Provide a brief strategic summary of this corporate division...",rows:"4",style:{width:"100%",padding:"14px",borderRadius:"12px",border:"1.5px solid #f1f5f9",background:"#f8fafc",fontStyle:"normal"}})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{children:"Corporate Logo Image"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap"},children:[e.jsxs("div",{className:"logo-upload-zone",style:{border:"2px dashed #cbd5e1",borderRadius:"16px",padding:"24px",display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",cursor:"pointer",flex:1,minWidth:"240px",background:"#f8fafc",transition:"border-color 0.2s",textAlign:"center"},onClick:()=>document.getElementById("logo-file-input").click(),children:[e.jsx(Pb,{size:28,style:{color:"var(--crimson)"}}),e.jsx("span",{style:{fontSize:"0.85rem",fontWeight:700,color:"#475569"},children:"Click to Upload Corporate Logo"}),e.jsx("span",{style:{fontSize:"0.7rem",color:"#94a3b8"},children:"PNG, JPG, SVG, WebP (Max: 2MB)"}),e.jsx("input",{id:"logo-file-input",type:"file",accept:"image/*",onChange:ze,style:{display:"none"}})]}),_&&e.jsxs("div",{className:"logo-preview-box",style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",flexShrink:0},children:[e.jsx("div",{style:{width:"100px",height:"100px",borderRadius:"16px",border:"1px solid #e2e8f0",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",overflow:"hidden",boxShadow:"0 4px 12px rgba(0,0,0,0.05)"},children:e.jsx("img",{src:_,alt:"Logo Preview",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("button",{type:"button",className:"btn btn-outline",style:{padding:"4px 8px",fontSize:"0.7rem",color:"#dc2626",borderColor:"transparent"},onClick:()=>{v(null),g(null)},children:[e.jsx(zb,{})," Remove Logo"]})]})]})]})]})}),e.jsxs("div",{className:"modal-footer-p",style:{padding:"20px 32px",borderTop:"1px solid #f1f5f9",background:"#f8fafc",display:"flex",justifyContent:"flex-end",gap:"12px"},children:[e.jsx("button",{type:"button",className:"btn-cancel-p",onClick:()=>h(!1),children:"Cancel"}),e.jsx("button",{type:"submit",className:"btn btn-gold",disabled:d,children:d?"Processing...":b?"Save Changes":"Establish Division"})]})]})]})}),N&&e.jsx("div",{className:"modal-overlay-p",onClick:()=>w(null),children:e.jsxs("div",{className:"delete-modal-p",onClick:Y=>Y.stopPropagation(),style:{maxWidth:"480px",width:"90%"},children:[e.jsx("div",{className:"alert-vibe",style:{background:"#fef2f2",color:"#ef4444"},children:e.jsx(Lr,{})}),e.jsx("h3",{style:{fontSize:"1.3rem",margin:"16px 0 8px",color:"#1e293b"},children:"Decommission Corporate Division?"}),e.jsxs("p",{style:{color:"#64748b",fontSize:"0.88rem",lineHeight:1.5},children:["You are about to delete ",e.jsx("strong",{children:N.name}),"."]}),e.jsxs("div",{className:"cascade-warning",style:{background:"#fffbeb",border:"1px solid #fef3c7",borderRadius:"12px",padding:"12px 16px",display:"flex",gap:"12px",alignItems:"flex-start",margin:"16px 0",textAlign:"left"},children:[e.jsx(Oa,{size:18,style:{color:"#d97706",marginTop:"2px",flexShrink:0}}),e.jsxs("div",{children:[e.jsx("h4",{style:{margin:0,fontSize:"0.8rem",fontWeight:800,color:"#b45309"},children:"CASCADE DELETE WARNING"}),e.jsx("p",{style:{margin:"4px 0 0",fontSize:"0.75rem",color:"#b45309",lineHeight:1.4},children:"Deleting this entity will automatically purge **all associated vacancies and candidate job applications** registered under it. This action is irreversible."})]})]}),e.jsxs("div",{className:"delete-actions-p",style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{className:"btn-cancel-p",onClick:()=>w(null),children:"Cancel"}),e.jsx("button",{className:"btn btn-danger",onClick:()=>Qe(N.id),children:"Confirm Deletion"})]})]})}),V&&e.jsx("div",{className:"modal-overlay-p",onClick:()=>U(!1),children:e.jsxs("div",{className:"admin-modal-p confirm-modal card-p animated-zoom",onClick:Y=>Y.stopPropagation(),style:{maxWidth:"650px",width:"90%",textAlign:"left",overflow:"hidden"},children:[e.jsxs("div",{className:"modal-header-p",style:{padding:"24px 32px",borderBottom:"1px solid #f1f5f9",background:"var(--crimson)",color:"#fff"},children:[e.jsxs("h2",{style:{fontSize:"1.5rem",margin:0,color:"#fff",display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(xt,{})," Manage Company Locations"]}),e.jsx("button",{className:"close-btn-p",onClick:()=>U(!1),style:{color:"#fff"},children:e.jsx(ct,{})})]}),e.jsxs("form",{onSubmit:Ae,children:[e.jsx("div",{className:"modal-body-p",style:{padding:"32px",overflowY:"auto",maxHeight:"70vh"},children:e.jsxs("div",{className:"form-grid-p",style:{display:"grid",gridTemplateColumns:"1fr",gap:"20px"},children:[e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"loc_company_select",children:["Select Company Entity ",e.jsx("span",{style:{color:"var(--crimson)"},children:"*"})]}),e.jsxs("select",{id:"loc_company_select",value:G,onChange:Y=>fe(Y.target.value),required:!0,style:{padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #cbd5e1",background:"#f8fafc"},children:[e.jsx("option",{value:"",children:"-- Choose Corporate Entity --"}),a.map(Y=>e.jsx("option",{value:Y.id,children:Y.name},Y.id))]})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"new_location_name",children:["Add New Location Name ",e.jsx("span",{style:{color:"var(--crimson)"},children:"*"})]}),e.jsxs("div",{className:"input-with-icon",style:{display:"flex",gap:"10px",alignItems:"center"},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx(xt,{style:{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",color:"#94a3b8"}}),e.jsx("input",{id:"new_location_name",type:"text",value:L,onChange:Y=>H(Y.target.value),placeholder:"e.g. Galle, Sri Lanka",style:{paddingLeft:"44px"}})]}),e.jsx("button",{type:"submit",className:"btn btn-gold",style:{whiteSpace:"nowrap",height:"100%",padding:"12px 24px",borderRadius:"12px",border:"none",cursor:"pointer",fontWeight:700},disabled:d,children:"Add Location"})]})]}),G&&e.jsxs("div",{style:{marginTop:"20px",borderTop:"1px solid #f1f5f9",paddingTop:"20px"},children:[e.jsx("h4",{style:{fontSize:"0.85rem",fontWeight:800,color:"#475569",marginBottom:"12px",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Registered Locations for Selected Entity"}),o.filter(Y=>Y.company_id===parseInt(G)).length===0?e.jsx("p",{style:{fontSize:"0.82rem",color:"#94a3b8",fontStyle:"italic",margin:0},children:"No locations registered for this entity yet."}):e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:o.filter(Y=>Y.company_id===parseInt(G)).map(Y=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",background:"#f1f5f9",padding:"6px 12px",borderRadius:"8px",fontSize:"0.8rem",fontWeight:600,color:"#334155"},children:[e.jsx(xt,{size:12,style:{color:"var(--crimson)"}}),e.jsx("span",{children:Y.location}),e.jsx("button",{type:"button",onClick:()=>Q(Y),style:{background:"none",border:"none",color:"#dc2626",cursor:"pointer",display:"inline-flex",padding:"2px",borderRadius:"4px",marginLeft:"4px",transition:"background-color 0.2s"},title:"Delete Location",onMouseEnter:ke=>ke.currentTarget.style.backgroundColor="rgba(220, 38, 38, 0.1)",onMouseLeave:ke=>ke.currentTarget.style.backgroundColor="transparent",children:e.jsx(ct,{size:12})})]},Y.id))})]})]})}),e.jsx("div",{className:"modal-footer-p",style:{padding:"20px 32px",borderTop:"1px solid #f1f5f9",background:"#f8fafc",display:"flex",justifyContent:"flex-end"},children:e.jsx("button",{type:"button",className:"btn-cancel-p",onClick:()=>U(!1),children:"Close Registry"})})]})]})}),oe&&e.jsx("div",{className:"modal-overlay-p",onClick:()=>Q(null),children:e.jsxs("div",{className:"delete-modal-p",onClick:Y=>Y.stopPropagation(),style:{maxWidth:"480px",width:"90%"},children:[e.jsx("div",{className:"alert-vibe",style:{background:"#fef2f2",color:"#ef4444"},children:e.jsx(Lr,{})}),e.jsx("h3",{style:{fontSize:"1.3rem",margin:"16px 0 8px",color:"#1e293b"},children:"Remove Location?"}),e.jsxs("p",{style:{color:"#64748b",fontSize:"0.88rem",lineHeight:1.5},children:["You are about to delete location ",e.jsx("strong",{children:oe.location})," registered under ",e.jsx("strong",{children:oe.company_name}),"."]}),e.jsxs("div",{className:"delete-actions-p",style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{className:"btn-cancel-p",onClick:()=>Q(null),children:"Cancel"}),e.jsx("button",{className:"btn btn-danger",onClick:()=>he(oe.id),children:"Confirm Deletion"})]})]})})]})}const $f=Et.replace("/api","");function M1({admin:s}){const a=Ut(),[n,o]=F.useState(!0),[l,d]=F.useState([]),[u,f]=F.useState([]),[h,b]=F.useState(""),[j,N]=F.useState(null);F.useEffect(()=>{w()},[]);const w=async()=>{try{o(!0);const[A,D]=await Promise.all([un(),zo()]);d(A.data.data||[]),f(D.data.data||[])}catch(A){console.error("Failed to load reports data:",A)}finally{o(!1)}},_=l.map(A=>{const D=u.filter(fe=>fe.company_id===A.id),B=D.length,V=D.filter(fe=>{const L=(new Date(fe.expire_date)-new Date)/864e5;return fe.is_active&&L>0}).length,U=D.reduce((fe,L)=>fe+(L.application_count||0),0),G=B>0?(U/B).toFixed(1):"0.0";return{...A,totalVacancies:B,activeVacancies:V,totalApplications:U,avgApplicationsPerJob:G,vacanciesList:D}}).sort((A,D)=>D.totalApplications-A.totalApplications),v=_.filter(A=>{var D,B;return((D=A.name)==null?void 0:D.toLowerCase().includes(h.toLowerCase()))||((B=A.location)==null?void 0:B.toLowerCase().includes(h.toLowerCase()))}),x=_.reduce((A,D)=>A+D.totalApplications,0),g=_.reduce((A,D)=>A+D.totalVacancies,0),S=_.reduce((A,D)=>A+D.activeVacancies,0),z=_.filter(A=>A.totalVacancies>0).length,T=[..._].sort((A,D)=>parseFloat(D.avgApplicationsPerJob)-parseFloat(A.avgApplicationsPerJob))[0],E=_.find(A=>A.id===j);return e.jsxs("div",{className:"premium-admins-page",children:[e.jsxs("div",{className:"dashboard-hero-premium",children:[e.jsxs("div",{className:"hero-content-p",children:[e.jsxs("div",{className:"hero-badge-p",children:[e.jsx(Po,{})," Divisional Recruitment Intelligence"]}),e.jsx("h1",{className:"hero-title-p",children:"Company-Wise Application Analytics"}),e.jsx("p",{className:"hero-subtitle-p",children:"George Steuart Group | Group-wide summary of job postings, applicant pipelines, and subsidiary engagement volume."})]}),e.jsx("div",{className:"hero-actions-p",children:e.jsxs("button",{className:"btn-hero-p primary",onClick:()=>a("/admin"),children:[e.jsx(Gr,{})," Back to Suite"]})}),e.jsx("div",{className:"hero-bg-accent"})]}),e.jsxs("div",{className:"stats-mosaic-grid admin-grid-4",children:[e.jsxs("div",{className:"stat-glass-card gold",children:[e.jsx("div",{className:"s-icon",children:e.jsx(er,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Total Submissions Received"}),e.jsx("span",{className:"s-value",children:x})]}),e.jsxs("div",{className:"s-trend",children:[e.jsx(To,{})," Group-wide Engagement"]})]}),e.jsxs("div",{className:"stat-glass-card green",children:[e.jsx("div",{className:"s-icon",children:e.jsx(At,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Active Vacancy Channels"}),e.jsxs("span",{className:"s-value",children:[S," ",e.jsxs("span",{style:{fontSize:"1rem",color:"var(--text-muted)"},children:["/ ",g," total"]})]})]}),e.jsx("div",{className:"s-trend positive",children:"Recruitment Pipelines Open"})]}),e.jsxs("div",{className:"stat-glass-card blue",children:[e.jsx("div",{className:"s-icon",children:e.jsx(Cb,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Highest Engagement Rate"}),e.jsx("span",{className:"s-value",style:{fontSize:"1.25rem",fontWeight:800,marginTop:"8px"},children:T&&T.totalVacancies>0?`${T.avgApplicationsPerJob} apps/job`:"N/A"}),e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"var(--crimson)",marginTop:"4px"},children:T?T.name:""})]}),e.jsx("div",{className:"s-trend",children:"Top Performer"})]}),e.jsxs("div",{className:"stat-glass-card purple",children:[e.jsx("div",{className:"s-icon",children:e.jsx(Ih,{})}),e.jsxs("div",{className:"s-info",children:[e.jsx("span",{className:"s-label",children:"Active Corporate Divisions"}),e.jsxs("span",{className:"s-value",children:[z," ",e.jsxs("span",{style:{fontSize:"1rem",color:"var(--text-muted)"},children:["/ ",l.length]})]})]}),e.jsx("div",{className:"s-trend",children:"Group Subsidiaries List"})]})]}),e.jsx("div",{className:"console-toolbar-p",children:e.jsx("div",{className:"toolbar-search-row",children:e.jsxs("div",{className:"search-orchestrator",children:[e.jsx(Ar,{className:"s-icon"}),e.jsx("input",{id:"report_search",name:"report_search",type:"text",placeholder:"Filter reports by subsidiary division name or headquarters...",value:h,onChange:A=>b(A.target.value)})]})})}),e.jsxs("div",{className:"analytics-layout-split",style:{display:"grid",gridTemplateColumns:j?"1fr 400px":"1fr",gap:"24px",alignItems:"start",transition:"all 0.3s ease"},children:[e.jsxs("div",{className:"results-card-p orchestration-container",children:[e.jsxs("div",{className:"orchestration-header",style:{flexWrap:"wrap",gap:"20px",padding:"24px 32px"},children:[e.jsxs("div",{className:"h-left",children:[e.jsx("h3",{style:{fontSize:"1.4rem"},children:"Strategic Corporate Directory"}),e.jsx("p",{style:{fontSize:"0.85rem"},children:"Comparative matrix of candidates and pipeline volumes across child establishments."})]}),e.jsx("div",{className:"h-right",children:e.jsxs("span",{className:"count-badge",children:[v.length," Entities Compiled"]})})]}),e.jsx("div",{className:"table-wrapper-p",children:e.jsxs("table",{className:"premium-table orchestration-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"SUBSIDIARY COMPANY"}),e.jsx("th",{children:"HEADQUARTERS"}),e.jsx("th",{style:{textAlign:"center"},children:"JOB LISTINGS"}),e.jsx("th",{style:{textAlign:"center"},children:"APPLICATIONS"}),e.jsx("th",{children:"SHARE OF PIPELINE"}),e.jsx("th",{style:{textAlign:"center"},children:"ENGAGEMENT"}),e.jsx("th",{style:{textAlign:"center"},children:"ANALYSIS"})]})}),e.jsx("tbody",{children:n?e.jsx("tr",{children:e.jsxs("td",{colSpan:"7",style:{padding:"60px",textAlign:"center"},children:[e.jsx("div",{className:"spinner-p"}),e.jsx("p",{style:{marginTop:"16px",color:"var(--text-muted)"},children:"Aggregating divisional telemetry..."})]})}):v.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:"7",className:"empty-cell",children:e.jsxs("div",{className:"no-results",style:{padding:"60px",textAlign:"center"},children:[e.jsx(At,{size:48,style:{color:"var(--border-light)",marginBottom:"16px"}}),e.jsx("p",{style:{color:"var(--text-muted)"},children:"No group companies match your search criteria."})]})})}):v.map((A,D)=>{const B=x>0?Math.round(A.totalApplications/x*100):0,V=j===A.id;return e.jsxs("tr",{className:`orchestration-row ${V?"selected-row-active":""}`,style:{cursor:"pointer",background:V?"rgba(139,26,43,0.02)":"transparent"},onClick:()=>N(V?null:A.id),children:[e.jsx("td",{"data-label":"Subsidiary Company",children:e.jsxs("div",{className:"admin-identity-cell",children:[e.jsx("div",{className:"company-logo-circle",style:{width:"42px",height:"42px",borderRadius:"12px",border:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",background:"#fff",overflow:"hidden",padding:"4px",boxShadow:"0 2px 8px rgba(0,0,0,0.03)",flexShrink:0},children:e.jsx("img",{src:A.logo?`${$f}/uploads/logos/${A.logo}`:"/gs-logo.png",alt:A.name,onError:U=>U.target.src="/gs-logo.png",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{className:"admin-info-p",children:[e.jsx("span",{className:"admin-name-p",style:{fontWeight:800,fontSize:"0.92rem"},children:A.name}),e.jsxs("span",{className:"admin-email-p",style:{fontSize:"0.72rem",color:"#94a3b8"},children:["ID: ",A.id]})]})]})}),e.jsx("td",{"data-label":"Headquarters",children:e.jsxs("div",{className:"location-cell",style:{display:"flex",alignItems:"center",gap:"8px",color:"#475569",fontWeight:600,fontSize:"0.85rem"},children:[e.jsx(xt,{style:{color:"var(--gold-accent)"}}),e.jsx("span",{children:A.location||"Not Specified"})]})}),e.jsx("td",{"data-label":"Job Listings",style:{textAlign:"center"},children:e.jsxs("span",{className:"count-badge-p",style:{background:"#f8fafc",border:"1px solid #e2e8f0",padding:"4px 10px",borderRadius:"8px",fontWeight:700,color:"#334155",fontSize:"0.85rem"},children:[A.totalVacancies," ",e.jsxs("span",{style:{fontSize:"0.75rem",fontWeight:500,color:"#94a3b8"},children:["(",A.activeVacancies," Live)"]})]})}),e.jsx("td",{"data-label":"Applications",style:{textAlign:"center"},children:e.jsx("span",{style:{fontSize:"1rem",fontWeight:800,color:A.totalApplications>0?"var(--crimson)":"#64748b"},children:A.totalApplications})}),e.jsx("td",{"data-label":"Share of Pipeline",children:e.jsxs("div",{className:"share-metric-container",style:{display:"flex",alignItems:"center",gap:"10px",minWidth:"120px"},children:[e.jsx("div",{className:"progress-bar-p",style:{flex:1,height:"6px",background:"#f1f5f9",borderRadius:"10px",overflow:"hidden"},children:e.jsx("div",{className:"progress-fill-p animate-width",style:{width:`${B}%`,height:"100%",background:"linear-gradient(90deg, var(--crimson), #C8A951)",borderRadius:"10px"}})}),e.jsxs("span",{style:{fontSize:"0.8rem",fontWeight:700,color:"#475569",minWidth:"32px"},children:[B,"%"]})]})}),e.jsx("td",{"data-label":"Engagement",style:{textAlign:"center"},children:e.jsxs("span",{className:"count-badge-p",style:{background:parseFloat(A.avgApplicationsPerJob)>5?"rgba(16,185,129,0.08)":"#f8fafc",color:parseFloat(A.avgApplicationsPerJob)>5?"#10b981":"#64748b",border:"1px solid transparent",padding:"4px 8px",borderRadius:"8px",fontWeight:800,fontSize:"0.8rem"},children:[A.avgApplicationsPerJob," avg"]})}),e.jsx("td",{"data-label":"Analysis",style:{textAlign:"center"},children:e.jsx("button",{className:"o-btn view",title:"Expand Recruitment Breakdown",style:{border:"none",background:V?"var(--crimson)":"rgba(139,26,43,0.05)",color:V?"#fff":"var(--crimson)",transition:"all 0.2s",margin:"0 auto"},children:e.jsx(Ia,{})})})]},A.id)})})]})})]}),j&&E&&e.jsxs("div",{className:"results-card-p animate-slide-left",style:{border:"1px solid rgba(200, 169, 81, 0.2)",boxShadow:"0 12px 36px rgba(0,0,0,0.06)"},children:[e.jsxs("div",{className:"orchestration-header",style:{padding:"24px",borderBottom:"1px solid #f1f5f9",background:"linear-gradient(to right, #fff, #fafafa)",position:"relative"},children:[e.jsx("button",{className:"close-btn-p",style:{position:"absolute",right:"16px",top:"16px",border:"none",background:"#f1f5f9",borderRadius:"50%",width:"28px",height:"28px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#64748b"},onClick:A=>{A.stopPropagation(),N(null)},children:e.jsx(ct,{size:14})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginTop:"12px"},children:[e.jsx("div",{style:{width:"48px",height:"48px",borderRadius:"12px",border:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",background:"#fff",overflow:"hidden",padding:"4px"},children:e.jsx("img",{src:E.logo?`${$f}/uploads/logos/${E.logo}`:"/gs-logo.png",alt:E.name,onError:A=>A.target.src="/gs-logo.png",style:{width:"100%",height:"100%",objectFit:"contain"}})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("h3",{style:{fontSize:"1.1rem",margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",color:"#1e293b"},children:E.name}),e.jsx("span",{style:{fontSize:"0.75rem",color:"#94a3b8",fontWeight:600},children:E.location||"Colombo, Sri Lanka"})]})]})]}),e.jsxs("div",{style:{padding:"24px"},children:[e.jsxs("h4",{style:{fontSize:"0.72rem",fontWeight:800,color:"var(--crimson)",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"16px"},children:["Active Pipelines (",E.totalVacancies,")"]}),E.vacanciesList.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"40px 20px",background:"#f8fafc",borderRadius:"16px",border:"1px dashed #e2e8f0"},children:[e.jsx(At,{size:28,style:{color:"#cbd5e1",marginBottom:"8px"}}),e.jsx("p",{style:{margin:0,fontSize:"0.8rem",color:"#94a3b8"},children:"No vacancies registered under this subsidiary."})]}):e.jsx("div",{className:"pipeline-drilldown-list",style:{display:"flex",flexDirection:"column",gap:"12px",maxHeight:"450px",overflowY:"auto",paddingRight:"4px"},children:E.vacanciesList.map(A=>{const D=new Date(A.expire_date)>new Date&&A.is_active;return e.jsxs("div",{className:"drilldown-card",style:{padding:"14px",background:"#f8fafc",borderRadius:"12px",border:"1px solid #f1f5f9",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",transition:"all 0.2s"},onClick:()=>a(`/admin/applicants?vacancy_id=${A.id}`),children:[e.jsxs("div",{style:{minWidth:0,flex:1,paddingRight:"12px"},children:[e.jsx("strong",{style:{display:"block",fontSize:"0.85rem",color:"#1e293b",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:A.title}),e.jsxs("span",{style:{fontSize:"0.7rem",color:"#94a3b8",display:"block",marginTop:"2px"},children:["Ref: ",A.reference_number||`ID: ${A.id}`]}),e.jsxs("span",{className:`drilldown-status-dot ${D?"active":"expired"}`,style:{display:"inline-flex",alignItems:"center",gap:"4px",fontSize:"0.65rem",fontWeight:800,textTransform:"uppercase",color:D?"#10b981":"#94a3b8",marginTop:"6px"},children:[e.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",background:D?"#10b981":"#94a3b8"}}),D?"Live":"Ended"]})]}),e.jsxs("div",{style:{textAlign:"right",flexShrink:0},children:[e.jsx("span",{style:{display:"block",fontSize:"1.2rem",fontWeight:800,color:"var(--crimson)"},children:A.application_count||0}),e.jsx("span",{style:{display:"block",fontSize:"0.6rem",color:"#94a3b8",textTransform:"uppercase",fontWeight:700},children:"Applicants"})]})]},A.id)})})]})]})]}),e.jsx("style",{jsx:"true",children:`
                .selected-row-active td {
                    border-top: 1px solid rgba(139,26,43,0.15) !important;
                    border-bottom: 1px solid rgba(139,26,43,0.15) !important;
                }
                .selected-row-active td:first-child {
                    border-left: 3px solid var(--crimson) !important;
                }
                
                .drilldown-card:hover {
                    background: #fff !important;
                    border-color: rgba(200, 169, 81, 0.3) !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.04);
                }

                .pipeline-drilldown-list::-webkit-scrollbar {
                    width: 4px;
                }
                .pipeline-drilldown-list::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 10px;
                }
                .pipeline-drilldown-list::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
            `})]})}function B1(){const s=Ut(),[a,n]=F.useState({current_password:"",new_password:"",confirm_password:""}),[o,l]=F.useState(!1),d=async u=>{var f,h;if(u.preventDefault(),!a.current_password||!a.new_password||!a.confirm_password){me.error("All fields are required");return}if(a.new_password!==a.confirm_password){me.error("New passwords do not match");return}if(a.new_password.length<6){me.error("Password must be at least 6 characters long");return}l(!0);try{await qe.post("/auth.php?action=change-password",{current_password:a.current_password,new_password:a.new_password}),me.success("Security Profile Updated. Re-Authorizing..."),localStorage.removeItem("gs_admin_token"),localStorage.removeItem("gs_admin_data"),setTimeout(()=>{s("/admin/login")},1500)}catch(b){me.error(((h=(f=b.response)==null?void 0:f.data)==null?void 0:h.message)||"Failed to change password"),l(!1)}};return e.jsxs("div",{className:"login-split-page",children:[e.jsxs("div",{className:"login-branding-panel",children:[e.jsx("div",{className:"branding-overlay"}),e.jsx("img",{src:"/admin-branding.png",alt:"Branding",className:"branding-bg"}),e.jsxs("div",{className:"branding-content",children:[e.jsx("img",{src:"/gs-logo.png",alt:"GS Logo",className:"branding-logo"}),e.jsxs("div",{className:"branding-text",children:[e.jsx("span",{className:"est-badge",children:"SECURITY PROTOCOL"}),e.jsxs("h1",{className:"serif-title",children:["Protect. ",e.jsx("br",{}),"Validate. ",e.jsx("br",{}),"Secure."]}),e.jsx("p",{children:"Credentials Update | George Steuart Recruitment Orchestration"})]}),e.jsx("div",{className:"branding-footer",children:e.jsxs("div",{className:"secure-badge",children:[e.jsx(Bt,{})," ADVANCED ENCRYPTION ACTIVE"]})})]})]}),e.jsxs("div",{className:"login-form-panel",children:[e.jsxs("button",{className:"back-home-minimal",onClick:()=>s("/admin/login"),children:[e.jsx(Gr,{})," Return to Login"]}),e.jsxs("div",{className:"login-glass-container animated-fade-in",children:[e.jsxs("div",{className:"login-header-p",children:[e.jsx("div",{className:"access-icon",children:e.jsx(Fa,{})}),e.jsx("h2",{children:"Update Credentials"}),e.jsx("p",{children:"You are using a temporary password. Please establish a permanent secure passphrase."})]}),e.jsxs("form",{className:"premium-login-form",onSubmit:d,children:[e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"current_password",children:[e.jsx(Fa,{})," TEMPORARY PASSWORD"]}),e.jsx("input",{id:"current_password",name:"current_password",type:"password",autoComplete:"current-password",placeholder:"Enter current/temp password",value:a.current_password,onChange:u=>n({...a,current_password:u.target.value}),required:!0})]}),e.jsx("div",{style:{padding:"10px 0",borderBottom:"1px solid #f1f5f9",marginBottom:"20px"}}),e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"new_password",children:[e.jsx(Bt,{})," NEW SECURE PASSWORD"]}),e.jsx("input",{id:"new_password",name:"new_password",type:"password",autoComplete:"new-password",placeholder:"Min 6 characters",value:a.new_password,onChange:u=>n({...a,new_password:u.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"confirm_password",children:[e.jsx(Bt,{})," CONFIRM PASSWORD"]}),e.jsx("input",{id:"confirm_password",name:"confirm_password",type:"password",autoComplete:"new-password",placeholder:"Repeat new password",value:a.confirm_password,onChange:u=>n({...a,confirm_password:u.target.value}),required:!0})]}),e.jsx("button",{type:"submit",className:"login-btn-premium",disabled:o,children:o?e.jsx("div",{className:"spinner-small"}):e.jsxs(e.Fragment,{children:["ACTIVATE NEW CREDENTIALS ",e.jsx(Tt,{style:{marginLeft:8}})]})})]})]}),e.jsx("div",{className:"login-footer-p",children:"© 2026 George Steuart & Company Limited. Security Governance."})]}),e.jsx("style",{jsx:"true",children:`
                /* REUSING THE CORE LOGIN STYLES FOR CONSISTENCY */
                .login-split-page {
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    min-height: 100vh;
                    background: #fcfcfd;
                    overflow: hidden;
                }

                @media (max-width: 992px) {
                    .login-split-page { grid-template-columns: 1fr; }
                    .login-branding-panel { display: none; }
                }

                .login-branding-panel {
                    position: relative;
                    height: 100vh;
                    overflow: hidden;
                    background: #2a050b;
                }

                .branding-bg {
                    width: 100%; height: 100%; object-fit: cover; opacity: 0.6;
                    filter: saturate(0.8) contrast(1.1);
                }

                .branding-overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(to right, #2a050b 0%, transparent 60%, rgba(0,0,0,0.6) 100%);
                    z-index: 1;
                }

                .branding-content {
                    position: absolute; inset: 0; z-index: 2; padding: 40px;
                    display: flex; flex-direction: column; justify-content: space-between;
                }

                .branding-logo { width: 140px; filter: brightness(0) invert(1); }

                .est-badge {
                    display: inline-block; padding: 4px 12px;
                    background: rgba(200, 169, 81, 0.2); border: 1px solid rgba(200, 169, 81, 0.3);
                    color: var(--gold-accent); font-size: 0.7rem; font-weight: 800;
                    letter-spacing: 2px; border-radius: 4px; margin-bottom: 24px;
                }

                .serif-title {
                    font-family: var(--font-heading); font-size: 3.5rem; color: #fff;
                    line-height: 0.95; margin: 0; letter-spacing: -2px;
                }

                .branding-text p {
                    color: rgba(255,255,255,0.6); font-size: 1.1rem; margin-top: 24px;
                    letter-spacing: 0.5px;
                }

                .secure-badge {
                    display: flex; align-items: center; gap: 10px;
                    color: rgba(255,255,255,0.4); font-size: 0.75rem; font-weight: 700;
                    letter-spacing: 1px;
                }

                .login-form-panel {
                    padding: 40px; display: flex; flex-direction: column;
                    justify-content: center; align-items: center; position: relative;
                    background: radial-gradient(circle at 10% 20%, #f1f5f9 0%, #ffffff 100%);
                }

                .back-home-minimal {
                    position: absolute; top: 40px; right: 40px; background: none; border: none;
                    color: #94a3b8; font-size: 0.9rem; font-weight: 600; display: flex;
                    align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s;
                }
                .back-home-minimal:hover { color: var(--crimson); transform: translateX(-5px); }

                .login-glass-container { width: 100%; max-width: 440px; }

                .login-header-p { text-align: center; margin-bottom: 40px; }
                .access-icon {
                    width: 64px; height: 64px; background: #f8fafc; border: 1px solid #e2e8f0;
                    border-radius: 20px; display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 20px; font-size: 1.6rem; color: var(--crimson);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.02);
                }

                .login-header-p h2 { font-family: var(--font-heading); font-size: 1.8rem; margin: 0; color: #1e293b; }
                .login-header-p p { color: #64748b; margin-top: 8px; font-size: 0.9rem; }

                .form-group-p { margin-bottom: 20px; }
                .form-group-p label {
                    display: flex; align-items: center; gap: 6px; font-size: 0.65rem;
                    font-weight: 800; color: #94a3b8; margin-bottom: 10px;
                    letter-spacing: 1.5px;
                }

                .form-group-p input {
                    width: 100%; padding: 14px 18px; background: #fff; border: 1px solid #e2e8f0;
                    border-radius: 14px; font-size: 1rem; color: #1e293b; transition: all 0.2s;
                    box-shadow: var(--shadow-sm);
                }
                .form-group-p input:focus {
                    border-color: var(--gold-accent); box-shadow: 0 0 0 4px rgba(200, 169, 81, 0.1);
                    transform: translateY(-2px); outline: none;
                }

                .login-btn-premium {
                    width: 100%; padding: 18px; background: #2a050b; color: #fff; border: none;
                    border-radius: 18px; font-weight: 800; font-size: 1rem; letter-spacing: 1px;
                    cursor: pointer; transition: all 0.3s; display: flex; align-items: center;
                    justify-content: center; box-shadow: 0 15px 30px rgba(42, 5, 11, 0.2);
                    margin-top: 10px;
                }
                .login-btn-premium:hover {
                    background: #4a0914; transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(42, 5, 11, 0.3);
                }

                .login-footer-p {
                    position: absolute; bottom: 40px; font-size: 0.75rem; color: #94a3b8;
                    letter-spacing: 0.5px;
                }

                .animated-fade-in { animation: fadeIn 0.6s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .spinner-small {
                    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.2);
                    border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `})]})}function W1(){const s=Ut(),a=Ir(),[n,o]=F.useState(""),[l,d]=F.useState(1),[u,f]=F.useState(!1),[h,b]=F.useState(null),[j,N]=F.useState(!1),[w,_]=F.useState(""),[v,x]=F.useState({password:"",confirm:""});F.useEffect(()=>{const D=new URLSearchParams(a.search).get("username");D&&l===1&&g(D)},[a]);const g=async A=>{var D,B;N(!0),f(!0);try{const V=await xf({username:A});o(V.data.data.email),d(2)}catch(V){me.error(((B=(D=V.response)==null?void 0:D.data)==null?void 0:B.message)||"Identity verification failed")}finally{f(!1),N(!1)}},S=async A=>{if(A.preventDefault(),!n){me.error("Please enter your administrative email");return}f(!0);try{await xf({username:n.split("@")[0]}),d(2)}catch{me.error("Identity verification failed. Please check the email.")}finally{f(!1)}},z=async A=>{var D,B;b(A),f(!0);try{await Mv({email:n,type:A}),d(A==="code"?4:3),me.success(`Recovery ${A==="link"?"link":"code"} dispatched.`)}catch(V){me.error(((B=(D=V.response)==null?void 0:D.data)==null?void 0:B.message)||"Failed to dispatch recovery info")}finally{f(!1)}},T=async A=>{var D,B;if(A.preventDefault(),w.length!==6){me.error("Please enter the 6-digit code");return}f(!0);try{await Sh(w),d(5)}catch(V){me.error(((B=(D=V.response)==null?void 0:D.data)==null?void 0:B.message)||"Invalid or expired code")}finally{f(!1)}},E=async A=>{var D,B;if(A.preventDefault(),v.password!==v.confirm){me.error("Passwords do not match");return}if(v.password.length<6){me.error("Password must be at least 6 characters");return}f(!0);try{await _h({code:w,password:v.password}),d(6),me.success("System credentials synchronized. Access restored.")}catch(V){me.error(((B=(D=V.response)==null?void 0:D.data)==null?void 0:B.message)||"Failed to update credentials")}finally{f(!1)}};return e.jsxs("div",{className:"login-split-page",children:[e.jsxs("div",{className:"login-branding-panel",children:[e.jsx("div",{className:"branding-overlay"}),e.jsx("img",{src:"/admin-branding.png",alt:"Branding",className:"branding-bg"}),e.jsxs("div",{className:"branding-content",children:[e.jsx("img",{src:"/gs-logo.png",alt:"GS Logo",className:"branding-logo"}),e.jsxs("div",{className:"branding-text",children:[e.jsx("span",{className:"est-badge",children:"ESTD 1835"}),e.jsxs("h1",{className:"serif-title",children:["Heritage. ",e.jsx("br",{}),"Trust. ",e.jsx("br",{}),"Excellence."]}),e.jsx("p",{children:"Recruitment Platform v4.0"})]}),e.jsx("div",{className:"branding-footer",children:e.jsxs("div",{className:"secure-badge",children:[e.jsx(Bt,{})," SECURED END-TO-END"]})})]})]}),e.jsxs("div",{className:"login-form-panel",children:[e.jsxs("button",{className:"back-home-minimal",onClick:()=>s("/admin/login"),children:[e.jsx(Gr,{})," Back to Login"]}),e.jsxs("div",{className:"login-glass-container animated-fade-in",children:[e.jsxs("div",{className:"recovery-stepper",children:[e.jsxs("div",{className:`step ${l>=1?"active":""} ${l>1?"completed":""}`,children:[e.jsx("div",{className:"step-number",children:"1"}),e.jsx("span",{className:"step-label",children:"Identify"})]}),e.jsx("div",{className:"step-line"}),e.jsxs("div",{className:`step ${l>=2?"active":""} ${l>2?"completed":""}`,children:[e.jsx("div",{className:"step-number",children:"2"}),e.jsx("span",{className:"step-label",children:"Method"})]}),e.jsx("div",{className:"step-line"}),e.jsxs("div",{className:`step ${l>=3?"active":""}`,children:[e.jsx("div",{className:"step-number",children:"3"}),e.jsx("span",{className:"step-label",children:"Finish"})]})]}),l===1&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"login-header-p",children:[e.jsx("div",{className:"access-icon",children:j?e.jsx("div",{className:"spinner-small",style:{borderTopColor:"var(--crimson)"}}):e.jsx(Oa,{})}),e.jsx("h2",{children:j?"Orchestrating Identity":"Reset Password"}),e.jsx("p",{children:j?"Verifying your administrative handle and locating recovery channels...":"Enter your email address and we'll help you get back into your account."})]}),!j&&e.jsxs("form",{className:"premium-login-form",onSubmit:S,children:[e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"recovery_email",children:[e.jsx(cr,{})," ADMINISTRATIVE EMAIL"]}),e.jsx("input",{id:"recovery_email",name:"recovery_email",type:"email",placeholder:"name@georgesteuart.com",autoComplete:"email",value:n,onChange:A=>o(A.target.value),required:!0})]}),e.jsxs("div",{className:"recovery-note-p",children:[e.jsx(Bt,{size:14}),e.jsx("span",{children:"For security, all password reset requests are monitored by system administrators."})]}),e.jsx("button",{type:"submit",className:"login-btn-premium",disabled:u,children:u?e.jsx("div",{className:"spinner-small"}):e.jsxs(e.Fragment,{children:["CONTINUE TO OPTIONS ",e.jsx(Sc,{style:{marginLeft:8}})]})})]})]}),l===2&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"login-header-p",children:[e.jsx("div",{className:"access-icon",children:e.jsx(Bt,{})}),e.jsx("h2",{children:"Choose a Method"}),e.jsx("p",{children:"How would you like to receive your password reset information?"})]}),e.jsxs("div",{className:"recovery-methods-grid",children:[e.jsxs("div",{className:"method-card-p",onClick:()=>z("link"),children:[e.jsx("div",{className:"m-icon",children:e.jsx(Sc,{})}),e.jsxs("div",{className:"m-info",children:[e.jsx("h3",{children:"Send Email Link"}),e.jsx("p",{children:"We'll send a secure button to your inbox that you can click to reset instantly."})]}),e.jsx("div",{className:"m-arrow",children:"→"})]}),e.jsxs("div",{className:"method-card-p",onClick:()=>z("code"),children:[e.jsx("div",{className:"m-icon",children:e.jsx(Bt,{})}),e.jsxs("div",{className:"m-info",children:[e.jsx("h3",{children:"Get Reset Code"}),e.jsx("p",{children:"We'll send a 6-digit security code that you can enter manually to verify."})]}),e.jsx("div",{className:"m-arrow",children:"→"})]})]}),e.jsx("button",{className:"btn-text-only",onClick:()=>d(1),children:"← Use a different email address"})]}),l===3&&e.jsxs("div",{className:"success-state-p",children:[e.jsx("div",{className:"success-icon-p",children:e.jsx(Sc,{})}),e.jsx("h2",{children:"Check Your Email"}),e.jsxs("p",{children:["We've sent a ",e.jsx("strong",{children:"Reset Link"})," to your email. Please check your inbox (and spam folder) and follow the instructions to reset your password."]}),e.jsx("button",{className:"login-btn-premium",onClick:()=>s("/admin/login"),children:"RETURN TO LOGIN"})]}),l===4&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"login-header-p",children:[e.jsx("div",{className:"access-icon",children:e.jsx(Bt,{})}),e.jsx("h2",{children:"Verify Identity"}),e.jsxs("p",{children:["Enter the 6-digit security code sent to ",e.jsx("strong",{children:n})]})]}),e.jsxs("form",{className:"premium-login-form",onSubmit:T,children:[e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"recovery_code",children:"SECURITY CODE"}),e.jsx("input",{id:"recovery_code",name:"recovery_code",type:"text",placeholder:"0 0 0 0 0 0",maxLength:"6",className:"code-input-p",autoComplete:"one-time-code",value:w,onChange:A=>_(A.target.value.replace(/\D/g,"")),required:!0})]}),e.jsx("button",{type:"submit",className:"login-btn-premium",disabled:u,children:u?e.jsx("div",{className:"spinner-small"}):"VERIFY CODE"}),e.jsxs("div",{className:"resend-container-p",children:[e.jsx("p",{children:"Didn't receive a code?"}),e.jsx("button",{type:"button",className:"btn-text-only",onClick:()=>z("code"),disabled:u,children:"Resend Code"})]})]})]}),l===5&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"login-header-p",children:[e.jsx("div",{className:"access-icon",children:e.jsx(Bt,{})}),e.jsx("h2",{children:"New Credentials"}),e.jsx("p",{children:"Create a strong password for your administrative account."})]}),e.jsxs("form",{className:"premium-login-form",onSubmit:E,children:[e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"new_password",children:"NEW PASSWORD"}),e.jsx("input",{id:"new_password",name:"new_password",type:"password",autoComplete:"new-password",placeholder:"Min. 6 characters",value:v.password,onChange:A=>x({...v,password:A.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsx("label",{htmlFor:"confirm_password",children:"CONFIRM PASSWORD"}),e.jsx("input",{id:"confirm_password",name:"confirm_password",type:"password",autoComplete:"new-password",placeholder:"Repeat your password",value:v.confirm,onChange:A=>x({...v,confirm:A.target.value}),required:!0})]}),e.jsx("button",{type:"submit",className:"login-btn-premium",disabled:u,children:u?e.jsx("div",{className:"spinner-small"}):"SYNCHRONIZE CREDENTIALS"})]})]}),l===6&&e.jsxs("div",{className:"success-state-p",children:[e.jsx("div",{className:"success-icon-p",style:{background:"#f0fdf4",color:"#16a34a"},children:e.jsx(Tt,{})}),e.jsx("h2",{children:"Success!"}),e.jsx("p",{children:"Your password has been updated and synchronized across all George Steuart security nodes. Use your new credentials to access the console."}),e.jsx("button",{className:"login-btn-premium",onClick:()=>s("/admin/login"),children:"RETURN TO LOGIN"})]}),e.jsxs("div",{className:"signup-redirect",children:["Need immediate assistance? ",e.jsx("a",{href:"mailto:admin-support@georgesteuart.com",children:"Contact Strategic Support"})]})]}),e.jsx("div",{className:"login-footer-p",children:"© 2026 George Steuart & Company Limited. All Rights Reserved."})]}),e.jsx("style",{jsx:"true",children:`
                /* Reuse Login Styles */
                .login-split-page {
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    min-height: 100vh;
                    background: #fcfcfd;
                    overflow: hidden;
                }

                @media (max-width: 992px) {
                    .login-split-page { grid-template-columns: 1fr; }
                    .login-branding-panel { display: none; }
                }

                .login-branding-panel {
                    position: relative;
                    height: 100vh;
                    overflow: hidden;
                    background: #2a050b;
                }

                .branding-bg {
                    width: 100%; height: 100%; object-fit: cover; opacity: 0.6; filter: saturate(0.8) contrast(1.1);
                }

                .branding-overlay {
                    position: absolute; inset: 0; background: linear-gradient(to right, #2a050b 0%, transparent 60%, rgba(0,0,0,0.6) 100%); z-index: 1;
                }

                .branding-content {
                    position: absolute; inset: 0; z-index: 2; padding: 40px; display: flex; flex-direction: column; justify-content: space-between;
                }

                .branding-logo { width: 140px; filter: brightness(0) invert(1); }

                .est-badge {
                    display: inline-block; padding: 4px 12px; background: rgba(200, 169, 81, 0.2); border: 1px solid rgba(200, 169, 81, 0.3); color: var(--gold-accent); font-size: 0.7rem; font-weight: 800; letter-spacing: 2px; border-radius: 4px; margin-bottom: 24px;
                }

                .serif-title {
                    font-family: var(--font-heading); font-size: 3.5rem; color: #fff; line-height: 0.95; margin: 0; letter-spacing: -2px;
                }

                .branding-text p { color: rgba(255,255,255,0.6); font-size: 1.1rem; margin-top: 24px; letter-spacing: 0.5px; }

                .secure-badge { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.4); font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; }

                .login-form-panel {
                    padding: 40px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; background: radial-gradient(circle at 10% 20%, #f1f5f9 0%, #ffffff 100%);
                }

                .back-home-minimal {
                    position: absolute; top: 40px; right: 40px; background: none; border: none; color: #94a3b8; font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s;
                }
                .back-home-minimal:hover { color: var(--crimson); transform: translateX(-5px); }

                .login-glass-container { width: 100%; max-width: 440px; }

                .recovery-stepper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 40px;
                }

                .step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    position: relative;
                    z-index: 2;
                }

                .step-number {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #f1f5f9;
                    border: 2px solid #e2e8f0;
                    color: #94a3b8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.85rem;
                    font-weight: 800;
                    transition: all 0.3s;
                }

                .step-label {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #94a3b8;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }

                .step.active .step-number {
                    background: #fff;
                    border-color: var(--gold-accent);
                    color: var(--gold-accent);
                    box-shadow: 0 0 0 4px rgba(200, 169, 81, 0.1);
                }

                .step.active .step-label {
                    color: #1e293b;
                }

                .step.completed .step-number {
                    background: var(--gold-accent);
                    border-color: var(--gold-accent);
                    color: #fff;
                }

                .step-line {
                    width: 30px;
                    height: 2px;
                    background: #e2e8f0;
                    margin-bottom: 24px; /* Align with step number center */
                }

                .login-header-p { text-align: center; margin-bottom: 40px; }
                .access-icon {
                    width: 64px; height: 64px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 1.6rem; color: var(--crimson); box-shadow: 0 10px 20px rgba(0,0,0,0.02);
                }

                .login-header-p h2 { font-family: var(--font-heading); font-size: 1.8rem; margin: 0; color: #1e293b; }
                .login-header-p p { color: #64748b; margin-top: 8px; font-size: 0.9rem; }

                .form-group-p { margin-bottom: 24px; }
                .form-group-p label {
                    display: block; font-size: 0.65rem; font-weight: 800; color: #94a3b8; margin-bottom: 10px; letter-spacing: 1.5px; display: flex; align-items: center; gap: 6px;
                }

                .form-group-p input {
                    width: 100%; padding: 16px 20px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; font-size: 1rem; color: #1e293b; transition: all 0.2s; box-shadow: var(--shadow-sm);
                }
                .form-group-p input:focus {
                    border-color: var(--gold-accent); box-shadow: 0 0 0 4px rgba(200, 169, 81, 0.1); transform: translateY(-2px); outline: none;
                }

                .recovery-note-p {
                    display: flex; gap: 10px; padding: 16px; background: rgba(148, 163, 184, 0.05); border-radius: 12px; margin-bottom: 32px; color: #64748b; font-size: 0.8rem; line-height: 1.4;
                }

                .recovery-methods-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    width: 100%;
                    margin-bottom: 24px;
                }

                .method-card-p {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 20px;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
                    text-align: left;
                }

                .method-card-p:hover {
                    border-color: var(--gold-accent);
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.05);
                }

                .method-card-p .m-icon {
                    width: 48px;
                    height: 48px;
                    background: #f8fafc;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.4rem;
                    color: var(--crimson);
                    transition: all 0.3s;
                }

                .method-card-p:hover .m-icon {
                    background: var(--crimson);
                    color: #fff;
                }

                .method-card-p .m-info {
                    flex: 1;
                }

                .method-card-p .m-info h3 {
                    font-size: 1rem;
                    font-weight: 800;
                    color: #1e293b;
                    margin: 0;
                }

                .method-card-p .m-info p {
                    font-size: 0.8rem;
                    color: #64748b;
                    margin: 4px 0 0;
                    line-height: 1.4;
                }

                .method-card-p .m-arrow {
                    font-size: 1.2rem;
                    color: #cbd5e1;
                    transition: transform 0.3s;
                }

                .method-card-p:hover .m-arrow {
                    transform: translateX(5px);
                    color: var(--gold-accent);
                }

                .btn-text-only {
                    background: none;
                    border: none;
                    color: #94a3b8;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 10px;
                    transition: color 0.2s;
                }

                .btn-text-only:hover {
                    color: var(--crimson);
                    text-decoration: underline;
                }

                .login-btn-premium {
                    width: 100%; padding: 18px; background: #2a050b; color: #fff; border: none; border-radius: 18px; font-weight: 800; font-size: 1rem; letter-spacing: 1px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; box-shadow: 0 15px 30px rgba(42, 5, 11, 0.2);
                }

                .login-btn-premium:hover { background: #4a0914; transform: translateY(-4px); box-shadow: 0 20px 40px rgba(42, 5, 11, 0.3); }

                .signup-redirect { text-align: center; margin-top: 32px; font-size: 0.9rem; color: #64748b; }
                .signup-redirect a { color: var(--gold-accent); font-weight: 700; text-decoration: none; }

                .login-footer-p { position: absolute; bottom: 40px; font-size: 0.75rem; color: #94a3b8; letter-spacing: 0.5px; }

                .success-state-p { text-align: center; }
                .success-icon-p {
                    width: 80px; height: 80px; background: #f0fdf4; color: #166534; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 2rem;
                }
                .success-state-p h2 { font-family: var(--font-heading); font-size: 2rem; color: #1e293b; margin-bottom: 16px; }
                .success-state-p p { color: #64748b; line-height: 1.6; margin-bottom: 32px; }

                .code-input-p {
                    text-align: center;
                    font-size: 2.5rem !important;
                    font-weight: 800;
                    letter-spacing: 12px !important;
                    font-family: monospace;
                    padding: 20px !important;
                    background: #f8fafc !important;
                    border-color: var(--gold-accent) !important;
                    border-radius: 20px;
                    width: 100%;
                    box-shadow: 0 10px 20px rgba(200, 169, 81, 0.1) !important;
                }

                .resend-container-p {
                    margin-top: 32px;
                    text-align: center;
                    padding: 16px;
                    background: #f8fafc;
                    border-radius: 12px;
                }
                .resend-container-p p {
                    font-size: 0.85rem;
                    color: #64748b;
                    margin-bottom: 4px;
                }

                .animated-fade-in { animation: fadeIn 0.6s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                /* Mobile Optimization */
                @media (max-width: 768px) {
                    .login-form-panel { padding: 40px 20px; }
                    .back-home-minimal { top: 20px; right: 20px; font-size: 0.8rem; }
                    .login-header-p h2 { font-size: 1.8rem; }
                    .serif-title { font-size: 3rem; }
                    .login-glass-container { padding: 40px 24px; }
                }

                @media (max-width: 480px) {
                    .serif-title { font-size: 2.2rem; }
                    .code-input-p {
                        font-size: 1.5rem !important;
                        letter-spacing: 3px !important;
                        padding: 12px 4px !important;
                    }
                    .method-card-p { padding: 14px; }
                    .login-header-p h2 { font-size: 1.4rem; }
                    .login-glass-container { padding: 32px 20px; }
                }

                .spinner-small {
                    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `})]})}function U1(){const s=Ut(),a=Ir(),[n,o]=F.useState(""),[l,d]=F.useState(""),[u,f]=F.useState({password:"",confirmPassword:""}),[h,b]=F.useState("verifying"),[j,N]=F.useState(!1);F.useEffect(()=>{const x=new URLSearchParams(a.search).get("token");if(!x){b("error");return}o(x),w(x)},[a]);const w=async v=>{var x,g;try{const S=await Sh(v);d(S.data.data.email),b("form")}catch(S){b("error"),me.error(((g=(x=S.response)==null?void 0:x.data)==null?void 0:g.message)||"Invalid or expired reset link")}},_=async v=>{var x,g;if(v.preventDefault(),u.password!==u.confirmPassword){me.error("Passwords do not match");return}if(u.password.length<6){me.error("Password must be at least 6 characters");return}N(!0);try{await _h({token:n,password:u.password}),b("success"),me.success("System credentials synchronized. Access restored.")}catch(S){me.error(((g=(x=S.response)==null?void 0:x.data)==null?void 0:g.message)||"Failed to update credentials")}finally{N(!1)}};return e.jsxs("div",{className:"login-split-page",children:[e.jsxs("div",{className:"login-branding-panel",children:[e.jsx("div",{className:"branding-overlay"}),e.jsx("img",{src:"/admin-branding.png",alt:"Branding",className:"branding-bg"}),e.jsxs("div",{className:"branding-content",children:[e.jsx("img",{src:"/gs-logo.png",alt:"GS Logo",className:"branding-logo"}),e.jsxs("div",{className:"branding-text",children:[e.jsx("span",{className:"est-badge",children:"SECURITY PROTOCOL"}),e.jsxs("h1",{className:"serif-title",children:["Credential ",e.jsx("br",{}),"Renewal ",e.jsx("br",{}),"Gateway."]}),e.jsx("p",{children:"Recruitment Orchestration Console v4.0"})]})]})]}),e.jsx("div",{className:"login-form-panel",children:e.jsxs("div",{className:"login-glass-container animated-fade-in",children:[h==="verifying"&&e.jsxs("div",{className:"recovery-centering",children:[e.jsx("div",{className:"spinner-large"}),e.jsx("h2",{style:{marginTop:"32px",fontFamily:"var(--font-heading)"},children:"Authenticating Token"}),e.jsx("p",{style:{color:"#64748b"},children:"Verifying secure handshake with heritage servers..."})]}),h==="error"&&e.jsxs("div",{className:"recovery-centering",children:[e.jsx("div",{className:"access-icon",style:{borderColor:"var(--crimson)"},children:e.jsx(Lr,{})}),e.jsx("h2",{style:{fontFamily:"var(--font-heading)"},children:"Link Expired"}),e.jsx("p",{style:{color:"#64748b",marginBottom:"32px"},children:"This reset link is no longer valid or has already been used."}),e.jsxs(tt,{to:"/admin/forgot-password",style:{color:"var(--gold-accent)",fontWeight:700,textDecoration:"none"},children:[e.jsx(Gr,{})," Request a new link"]})]}),h==="form"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"login-header-p",children:[e.jsx("div",{className:"access-icon",children:e.jsx(Bt,{})}),e.jsx("h2",{children:"New Credentials"}),e.jsxs("p",{children:["Securing account access for ",e.jsx("strong",{children:l})]})]}),e.jsxs("form",{className:"premium-login-form",onSubmit:_,children:[e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"password",children:[e.jsx(Fa,{})," NEW SECURITY PASSWORD"]}),e.jsx("input",{id:"password",name:"password",type:"password",autoComplete:"new-password",placeholder:"Min. 6 characters",value:u.password,onChange:v=>f({...u,password:v.target.value}),required:!0})]}),e.jsxs("div",{className:"form-group-p",children:[e.jsxs("label",{htmlFor:"confirmPassword",children:[e.jsx(Tt,{})," CONFIRM PASSWORD"]}),e.jsx("input",{id:"confirmPassword",name:"confirmPassword",type:"password",autoComplete:"new-password",placeholder:"Repeat your password",value:u.confirmPassword,onChange:v=>f({...u,confirmPassword:v.target.value}),required:!0})]}),e.jsx("button",{type:"submit",className:"login-btn-premium",disabled:j,children:j?e.jsx("div",{className:"spinner-small"}):"SYNCHRONIZE CREDENTIALS"})]})]}),h==="success"&&e.jsxs("div",{className:"success-state-p",children:[e.jsx("div",{className:"success-icon-p",style:{background:"#f0fdf4",color:"#16a34a"},children:e.jsx(Tt,{})}),e.jsx("h2",{children:"Success!"}),e.jsx("p",{children:"Your password has been updated. You can now use your new credentials to access the Recruitment Console."}),e.jsx("button",{className:"login-btn-premium",onClick:()=>s("/admin/login"),children:"RETURN TO LOGIN"})]})]})}),e.jsx("style",{jsx:"true",children:`
                .login-split-page { display: grid; grid-template-columns: 1.1fr 0.9fr; min-height: 100vh; background: #fcfcfd; }
                .login-branding-panel { position: relative; height: 100vh; background: #2a050b; }
                .branding-bg { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
                .branding-overlay { position: absolute; inset: 0; background: linear-gradient(to right, #2a050b 0%, transparent 60%); }
                .branding-content { position: absolute; inset: 0; padding: 60px; display: flex; flex-direction: column; justify-content: space-between; color: #fff; z-index: 2; }
                .branding-logo { width: 140px; filter: brightness(0) invert(1); }
                .est-badge { display: inline-block; padding: 4px 12px; background: rgba(200,169,81,0.2); color: var(--gold-accent); font-size: 0.7rem; font-weight: 800; border-radius: 4px; margin-bottom: 24px; letter-spacing: 2px; }
                .serif-title { font-family: var(--font-heading); font-size: 3.5rem; line-height: 0.95; margin: 0; }
                .login-form-panel { padding: 40px; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 10% 20%, #f1f5f9 0%, #ffffff 100%); }
                .login-glass-container { width: 100%; max-width: 440px; text-align: center; }
                .access-icon { width: 64px; height: 64px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 1.6rem; color: var(--crimson); }
                .form-group-p { margin-bottom: 24px; text-align: left; }
                .form-group-p label { display: flex; align-items: center; gap: 6px; font-size: 0.65rem; font-weight: 800; color: #94a3b8; margin-bottom: 10px; letter-spacing: 1.5px; }
                .form-group-p input { width: 100%; padding: 16px 20px; border: 1px solid #e2e8f0; border-radius: 16px; font-size: 1rem; }
                .login-btn-premium { width: 100%; padding: 18px; background: #2a050b; color: #fff; border: none; border-radius: 18px; font-weight: 800; cursor: pointer; transition: all 0.3s; }
                .login-btn-premium:hover { transform: translateY(-4px); box-shadow: 0 15px 30px rgba(42,5,11,0.2); }
                .recovery-centering { display: flex; flex-direction: column; align-items: center; }
                .spinner-large { width: 48px; height: 48px; border: 3px solid #e2e8f0; border-top-color: var(--gold-accent); border-radius: 50%; animation: spin 1s linear infinite; }
                .spinner-small { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }
                .animated-fade-in { animation: fadeIn 0.6s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @media (max-width: 992px) { .login-branding-panel { display: none; } .login-split-page { grid-template-columns: 1fr; } }
                @media (max-width: 768px) {
                    .login-form-panel { padding: 40px 20px; }
                    .serif-title { font-size: 2.8rem; }
                    .login-glass-container { padding: 40px 24px; }
                    .branding-content { padding: 30px; }
                }
                @media (max-width: 480px) {
                    .serif-title { font-size: 2.2rem; }
                    .login-header-p h2 { font-size: 1.5rem; }
                    .form-group-p input { padding: 12px 16px; }
                }
            `})]})}function Vf({children:s}){const[a,n]=F.useState(null),[o,l]=F.useState(!0);return F.useEffect(()=>{if(!localStorage.getItem("gs_admin_token")){l(!1);return}Bv().then(u=>{n(u.data.data.admin),l(!1)}).catch(()=>{localStorage.removeItem("gs_admin_token"),localStorage.removeItem("gs_admin_data"),l(!1)})},[]),o?e.jsx("div",{className:"loading-spinner",children:e.jsx("div",{className:"spinner"})}):a?a.require_password_change&&window.location.pathname!=="/admin/setup-password"?e.jsx(Lc,{to:"/admin/setup-password",replace:!0}):s(a):e.jsx(Lc,{to:"/admin/login"})}function $1(){return e.jsxs(Zp,{children:[e.jsx(jt,{path:"/",element:e.jsx(Ib,{})}),e.jsx(jt,{path:"/vacancies",element:e.jsx(Fb,{})}),e.jsx(jt,{path:"/apply/:id",element:e.jsx(Qb,{})}),e.jsx(jt,{path:"/success",element:e.jsx(ey,{})}),e.jsx(jt,{path:"/admin/login",element:e.jsx(ty,{})}),e.jsx(jt,{path:"/admin/signup",element:e.jsx(ry,{})}),e.jsx(jt,{path:"/admin/forgot-password",element:e.jsx(W1,{})}),e.jsx(jt,{path:"/admin/reset-password",element:e.jsx(U1,{})}),e.jsx(jt,{path:"/admin/setup-password",element:e.jsx(Vf,{children:()=>e.jsx(B1,{})})}),e.jsx(jt,{path:"/admin/*",element:e.jsx(Vf,{children:s=>e.jsx(ny,{admin:s,children:e.jsxs(Zp,{children:[e.jsx(jt,{path:"/",element:e.jsx(sy,{admin:s})}),e.jsx(jt,{path:"/vacancies",element:e.jsx(iy,{admin:s})}),e.jsx(jt,{path:"/vacancies/create",element:e.jsx(Rf,{admin:s})}),e.jsx(jt,{path:"/vacancies/edit/:id",element:e.jsx(Rf,{admin:s})}),e.jsx(jt,{path:"/applicants",element:e.jsx(L1,{admin:s})}),e.jsx(jt,{path:"/talent-pool",element:e.jsx(O1,{admin:s})}),s.role==="super_admin"&&e.jsxs(e.Fragment,{children:[e.jsx(jt,{path:"/vacancies/reports",element:e.jsx(M1,{admin:s})}),e.jsx(jt,{path:"/companies",element:e.jsx(D1,{admin:s})}),e.jsx(jt,{path:"/admins",element:e.jsx(F1,{admin:s})})]}),e.jsx(jt,{path:"*",element:e.jsx(Lc,{to:"/admin"})})]})})})})]})}ax.createRoot(document.getElementById("root")).render(e.jsx(Xe.StrictMode,{children:e.jsxs(r0,{children:[e.jsx($1,{}),e.jsx(Kb,{position:"top-right",autoClose:4e3,hideProgressBar:!1,theme:"dark"})]})}));
