function Ag(s,a){for(var n=0;n<a.length;n++){const o=a[n];if(typeof o!="string"&&!Array.isArray(o)){for(const l in o)if(l!=="default"&&!(l in s)){const d=Object.getOwnPropertyDescriptor(o,l);d&&Object.defineProperty(s,l,d.get?d:{enumerable:!0,get:()=>o[l]})}}}return Object.freeze(Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const d of l)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(l){const d={};return l.integrity&&(d.integrity=l.integrity),l.referrerPolicy&&(d.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?d.credentials="include":l.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(l){if(l.ep)return;l.ep=!0;const d=n(l);fetch(l.href,d)}})();var Ei=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function jc(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var ql={exports:{}},ts={},Gl={exports:{}},De={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Np;function Lg(){if(Np)return De;Np=1;var s=Symbol.for("react.element"),a=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),d=Symbol.for("react.provider"),u=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),b=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),j=Symbol.iterator;function S(R){return R===null||typeof R!="object"?null:(R=j&&R[j]||R["@@iterator"],typeof R=="function"?R:null)}var _={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,x={};function v(R,z,J){this.props=R,this.context=z,this.refs=x,this.updater=J||_}v.prototype.isReactComponent={},v.prototype.setState=function(R,z){if(typeof R!="object"&&typeof R!="function"&&R!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,R,z,"setState")},v.prototype.forceUpdate=function(R){this.updater.enqueueForceUpdate(this,R,"forceUpdate")};function N(){}N.prototype=v.prototype;function P(R,z,J){this.props=R,this.context=z,this.refs=x,this.updater=J||_}var T=P.prototype=new N;T.constructor=P,w(T,v.prototype),T.isPureReactComponent=!0;var C=Array.isArray,L=Object.prototype.hasOwnProperty,F={current:null},M={key:!0,ref:!0,__self:!0,__source:!0};function G(R,z,J){var ie,oe={},_e=null,Te=null;if(z!=null)for(ie in z.ref!==void 0&&(Te=z.ref),z.key!==void 0&&(_e=""+z.key),z)L.call(z,ie)&&!M.hasOwnProperty(ie)&&(oe[ie]=z[ie]);var Ne=arguments.length-2;if(Ne===1)oe.children=J;else if(1<Ne){for(var Re=Array(Ne),We=0;We<Ne;We++)Re[We]=arguments[We+2];oe.children=Re}if(R&&R.defaultProps)for(ie in Ne=R.defaultProps,Ne)oe[ie]===void 0&&(oe[ie]=Ne[ie]);return{$$typeof:s,type:R,key:_e,ref:Te,props:oe,_owner:F.current}}function H(R,z){return{$$typeof:s,type:R.type,key:z,ref:R.ref,props:R.props,_owner:R._owner}}function pe(R){return typeof R=="object"&&R!==null&&R.$$typeof===s}function te(R){var z={"=":"=0",":":"=2"};return"$"+R.replace(/[=:]/g,function(J){return z[J]})}var A=/\/+/g;function K(R,z){return typeof R=="object"&&R!==null&&R.key!=null?te(""+R.key):z.toString(36)}function k(R,z,J,ie,oe){var _e=typeof R;(_e==="undefined"||_e==="boolean")&&(R=null);var Te=!1;if(R===null)Te=!0;else switch(_e){case"string":case"number":Te=!0;break;case"object":switch(R.$$typeof){case s:case a:Te=!0}}if(Te)return Te=R,oe=oe(Te),R=ie===""?"."+K(Te,0):ie,C(oe)?(J="",R!=null&&(J=R.replace(A,"$&/")+"/"),k(oe,z,J,"",function(We){return We})):oe!=null&&(pe(oe)&&(oe=H(oe,J+(!oe.key||Te&&Te.key===oe.key?"":(""+oe.key).replace(A,"$&/")+"/")+R)),z.push(oe)),1;if(Te=0,ie=ie===""?".":ie+":",C(R))for(var Ne=0;Ne<R.length;Ne++){_e=R[Ne];var Re=ie+K(_e,Ne);Te+=k(_e,z,J,Re,oe)}else if(Re=S(R),typeof Re=="function")for(R=Re.call(R),Ne=0;!(_e=R.next()).done;)_e=_e.value,Re=ie+K(_e,Ne++),Te+=k(_e,z,J,Re,oe);else if(_e==="object")throw z=String(R),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(R).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.");return Te}function se(R,z,J){if(R==null)return R;var ie=[],oe=0;return k(R,ie,"","",function(_e){return z.call(J,_e,oe++)}),ie}function ye(R){if(R._status===-1){var z=R._result;z=z(),z.then(function(J){(R._status===0||R._status===-1)&&(R._status=1,R._result=J)},function(J){(R._status===0||R._status===-1)&&(R._status=2,R._result=J)}),R._status===-1&&(R._status=0,R._result=z)}if(R._status===1)return R._result.default;throw R._result}var re={current:null},W={transition:null},X={ReactCurrentDispatcher:re,ReactCurrentBatchConfig:W,ReactCurrentOwner:F};function ne(){throw Error("act(...) is not supported in production builds of React.")}return De.Children={map:se,forEach:function(R,z,J){se(R,function(){z.apply(this,arguments)},J)},count:function(R){var z=0;return se(R,function(){z++}),z},toArray:function(R){return se(R,function(z){return z})||[]},only:function(R){if(!pe(R))throw Error("React.Children.only expected to receive a single React element child.");return R}},De.Component=v,De.Fragment=n,De.Profiler=l,De.PureComponent=P,De.StrictMode=o,De.Suspense=h,De.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=X,De.act=ne,De.cloneElement=function(R,z,J){if(R==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+R+".");var ie=w({},R.props),oe=R.key,_e=R.ref,Te=R._owner;if(z!=null){if(z.ref!==void 0&&(_e=z.ref,Te=F.current),z.key!==void 0&&(oe=""+z.key),R.type&&R.type.defaultProps)var Ne=R.type.defaultProps;for(Re in z)L.call(z,Re)&&!M.hasOwnProperty(Re)&&(ie[Re]=z[Re]===void 0&&Ne!==void 0?Ne[Re]:z[Re])}var Re=arguments.length-2;if(Re===1)ie.children=J;else if(1<Re){Ne=Array(Re);for(var We=0;We<Re;We++)Ne[We]=arguments[We+2];ie.children=Ne}return{$$typeof:s,type:R.type,key:oe,ref:_e,props:ie,_owner:Te}},De.createContext=function(R){return R={$$typeof:u,_currentValue:R,_currentValue2:R,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},R.Provider={$$typeof:d,_context:R},R.Consumer=R},De.createElement=G,De.createFactory=function(R){var z=G.bind(null,R);return z.type=R,z},De.createRef=function(){return{current:null}},De.forwardRef=function(R){return{$$typeof:f,render:R}},De.isValidElement=pe,De.lazy=function(R){return{$$typeof:g,_payload:{_status:-1,_result:R},_init:ye}},De.memo=function(R,z){return{$$typeof:b,type:R,compare:z===void 0?null:z}},De.startTransition=function(R){var z=W.transition;W.transition={};try{R()}finally{W.transition=z}},De.unstable_act=ne,De.useCallback=function(R,z){return re.current.useCallback(R,z)},De.useContext=function(R){return re.current.useContext(R)},De.useDebugValue=function(){},De.useDeferredValue=function(R){return re.current.useDeferredValue(R)},De.useEffect=function(R,z){return re.current.useEffect(R,z)},De.useId=function(){return re.current.useId()},De.useImperativeHandle=function(R,z,J){return re.current.useImperativeHandle(R,z,J)},De.useInsertionEffect=function(R,z){return re.current.useInsertionEffect(R,z)},De.useLayoutEffect=function(R,z){return re.current.useLayoutEffect(R,z)},De.useMemo=function(R,z){return re.current.useMemo(R,z)},De.useReducer=function(R,z,J){return re.current.useReducer(R,z,J)},De.useRef=function(R){return re.current.useRef(R)},De.useState=function(R){return re.current.useState(R)},De.useSyncExternalStore=function(R,z,J){return re.current.useSyncExternalStore(R,z,J)},De.useTransition=function(){return re.current.useTransition()},De.version="18.3.1",De}var _p;function kc(){return _p||(_p=1,Gl.exports=Lg()),Gl.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sp;function Og(){if(Sp)return ts;Sp=1;var s=kc(),a=Symbol.for("react.element"),n=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,l=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function u(f,h,b){var g,j={},S=null,_=null;b!==void 0&&(S=""+b),h.key!==void 0&&(S=""+h.key),h.ref!==void 0&&(_=h.ref);for(g in h)o.call(h,g)&&!d.hasOwnProperty(g)&&(j[g]=h[g]);if(f&&f.defaultProps)for(g in h=f.defaultProps,h)j[g]===void 0&&(j[g]=h[g]);return{$$typeof:a,type:f,key:S,ref:_,props:j,_owner:l.current}}return ts.Fragment=n,ts.jsx=u,ts.jsxs=u,ts}var Cp;function Ig(){return Cp||(Cp=1,ql.exports=Og()),ql.exports}var t=Ig(),U=kc();const Ue=jc(U),Fg=Ag({__proto__:null,default:Ue},[U]);var Pi={},Yl={exports:{}},Ut={},Xl={exports:{}},Kl={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ep;function Bg(){return Ep||(Ep=1,(function(s){function a(W,X){var ne=W.length;W.push(X);e:for(;0<ne;){var R=ne-1>>>1,z=W[R];if(0<l(z,X))W[R]=X,W[ne]=z,ne=R;else break e}}function n(W){return W.length===0?null:W[0]}function o(W){if(W.length===0)return null;var X=W[0],ne=W.pop();if(ne!==X){W[0]=ne;e:for(var R=0,z=W.length,J=z>>>1;R<J;){var ie=2*(R+1)-1,oe=W[ie],_e=ie+1,Te=W[_e];if(0>l(oe,ne))_e<z&&0>l(Te,oe)?(W[R]=Te,W[_e]=ne,R=_e):(W[R]=oe,W[ie]=ne,R=ie);else if(_e<z&&0>l(Te,ne))W[R]=Te,W[_e]=ne,R=_e;else break e}}return X}function l(W,X){var ne=W.sortIndex-X.sortIndex;return ne!==0?ne:W.id-X.id}if(typeof performance=="object"&&typeof performance.now=="function"){var d=performance;s.unstable_now=function(){return d.now()}}else{var u=Date,f=u.now();s.unstable_now=function(){return u.now()-f}}var h=[],b=[],g=1,j=null,S=3,_=!1,w=!1,x=!1,v=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function T(W){for(var X=n(b);X!==null;){if(X.callback===null)o(b);else if(X.startTime<=W)o(b),X.sortIndex=X.expirationTime,a(h,X);else break;X=n(b)}}function C(W){if(x=!1,T(W),!w)if(n(h)!==null)w=!0,ye(L);else{var X=n(b);X!==null&&re(C,X.startTime-W)}}function L(W,X){w=!1,x&&(x=!1,N(G),G=-1),_=!0;var ne=S;try{for(T(X),j=n(h);j!==null&&(!(j.expirationTime>X)||W&&!te());){var R=j.callback;if(typeof R=="function"){j.callback=null,S=j.priorityLevel;var z=R(j.expirationTime<=X);X=s.unstable_now(),typeof z=="function"?j.callback=z:j===n(h)&&o(h),T(X)}else o(h);j=n(h)}if(j!==null)var J=!0;else{var ie=n(b);ie!==null&&re(C,ie.startTime-X),J=!1}return J}finally{j=null,S=ne,_=!1}}var F=!1,M=null,G=-1,H=5,pe=-1;function te(){return!(s.unstable_now()-pe<H)}function A(){if(M!==null){var W=s.unstable_now();pe=W;var X=!0;try{X=M(!0,W)}finally{X?K():(F=!1,M=null)}}else F=!1}var K;if(typeof P=="function")K=function(){P(A)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,se=k.port2;k.port1.onmessage=A,K=function(){se.postMessage(null)}}else K=function(){v(A,0)};function ye(W){M=W,F||(F=!0,K())}function re(W,X){G=v(function(){W(s.unstable_now())},X)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(W){W.callback=null},s.unstable_continueExecution=function(){w||_||(w=!0,ye(L))},s.unstable_forceFrameRate=function(W){0>W||125<W?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<W?Math.floor(1e3/W):5},s.unstable_getCurrentPriorityLevel=function(){return S},s.unstable_getFirstCallbackNode=function(){return n(h)},s.unstable_next=function(W){switch(S){case 1:case 2:case 3:var X=3;break;default:X=S}var ne=S;S=X;try{return W()}finally{S=ne}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(W,X){switch(W){case 1:case 2:case 3:case 4:case 5:break;default:W=3}var ne=S;S=W;try{return X()}finally{S=ne}},s.unstable_scheduleCallback=function(W,X,ne){var R=s.unstable_now();switch(typeof ne=="object"&&ne!==null?(ne=ne.delay,ne=typeof ne=="number"&&0<ne?R+ne:R):ne=R,W){case 1:var z=-1;break;case 2:z=250;break;case 5:z=1073741823;break;case 4:z=1e4;break;default:z=5e3}return z=ne+z,W={id:g++,callback:X,priorityLevel:W,startTime:ne,expirationTime:z,sortIndex:-1},ne>R?(W.sortIndex=ne,a(b,W),n(h)===null&&W===n(b)&&(x?(N(G),G=-1):x=!0,re(C,ne-R))):(W.sortIndex=z,a(h,W),w||_||(w=!0,ye(L))),W},s.unstable_shouldYield=te,s.unstable_wrapCallback=function(W){var X=S;return function(){var ne=S;S=X;try{return W.apply(this,arguments)}finally{S=ne}}}})(Kl)),Kl}var Pp;function Dg(){return Pp||(Pp=1,Xl.exports=Bg()),Xl.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zp;function Mg(){if(zp)return Ut;zp=1;var s=kc(),a=Dg();function n(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,i=1;i<arguments.length;i++)r+="&args[]="+encodeURIComponent(arguments[i]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var o=new Set,l={};function d(e,r){u(e,r),u(e+"Capture",r)}function u(e,r){for(l[e]=r,e=0;e<r.length;e++)o.add(r[e])}var f=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,b=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,g={},j={};function S(e){return h.call(j,e)?!0:h.call(g,e)?!1:b.test(e)?j[e]=!0:(g[e]=!0,!1)}function _(e,r,i,c){if(i!==null&&i.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return c?!1:i!==null?!i.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function w(e,r,i,c){if(r===null||typeof r>"u"||_(e,r,i,c))return!0;if(c)return!1;if(i!==null)switch(i.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function x(e,r,i,c,p,m,E){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=c,this.attributeNamespace=p,this.mustUseProperty=i,this.propertyName=e,this.type=r,this.sanitizeURL=m,this.removeEmptyString=E}var v={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){v[e]=new x(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var r=e[0];v[r]=new x(r,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){v[e]=new x(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){v[e]=new x(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){v[e]=new x(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){v[e]=new x(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){v[e]=new x(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){v[e]=new x(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){v[e]=new x(e,5,!1,e.toLowerCase(),null,!1,!1)});var N=/[\-:]([a-z])/g;function P(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var r=e.replace(N,P);v[r]=new x(r,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var r=e.replace(N,P);v[r]=new x(r,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var r=e.replace(N,P);v[r]=new x(r,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){v[e]=new x(e,1,!1,e.toLowerCase(),null,!1,!1)}),v.xlinkHref=new x("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){v[e]=new x(e,1,!1,e.toLowerCase(),null,!0,!0)});function T(e,r,i,c){var p=v.hasOwnProperty(r)?v[r]:null;(p!==null?p.type!==0:c||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(w(r,i,p,c)&&(i=null),c||p===null?S(r)&&(i===null?e.removeAttribute(r):e.setAttribute(r,""+i)):p.mustUseProperty?e[p.propertyName]=i===null?p.type===3?!1:"":i:(r=p.attributeName,c=p.attributeNamespace,i===null?e.removeAttribute(r):(p=p.type,i=p===3||p===4&&i===!0?"":""+i,c?e.setAttributeNS(c,r,i):e.setAttribute(r,i))))}var C=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,L=Symbol.for("react.element"),F=Symbol.for("react.portal"),M=Symbol.for("react.fragment"),G=Symbol.for("react.strict_mode"),H=Symbol.for("react.profiler"),pe=Symbol.for("react.provider"),te=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),K=Symbol.for("react.suspense"),k=Symbol.for("react.suspense_list"),se=Symbol.for("react.memo"),ye=Symbol.for("react.lazy"),re=Symbol.for("react.offscreen"),W=Symbol.iterator;function X(e){return e===null||typeof e!="object"?null:(e=W&&e[W]||e["@@iterator"],typeof e=="function"?e:null)}var ne=Object.assign,R;function z(e){if(R===void 0)try{throw Error()}catch(i){var r=i.stack.trim().match(/\n( *(at )?)/);R=r&&r[1]||""}return`
`+R+e}var J=!1;function ie(e,r){if(!e||J)return"";J=!0;var i=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(ae){var c=ae}Reflect.construct(e,[],r)}else{try{r.call()}catch(ae){c=ae}e.call(r.prototype)}else{try{throw Error()}catch(ae){c=ae}e()}}catch(ae){if(ae&&c&&typeof ae.stack=="string"){for(var p=ae.stack.split(`
`),m=c.stack.split(`
`),E=p.length-1,B=m.length-1;1<=E&&0<=B&&p[E]!==m[B];)B--;for(;1<=E&&0<=B;E--,B--)if(p[E]!==m[B]){if(E!==1||B!==1)do if(E--,B--,0>B||p[E]!==m[B]){var $=`
`+p[E].replace(" at new "," at ");return e.displayName&&$.includes("<anonymous>")&&($=$.replace("<anonymous>",e.displayName)),$}while(1<=E&&0<=B);break}}}finally{J=!1,Error.prepareStackTrace=i}return(e=e?e.displayName||e.name:"")?z(e):""}function oe(e){switch(e.tag){case 5:return z(e.type);case 16:return z("Lazy");case 13:return z("Suspense");case 19:return z("SuspenseList");case 0:case 2:case 15:return e=ie(e.type,!1),e;case 11:return e=ie(e.type.render,!1),e;case 1:return e=ie(e.type,!0),e;default:return""}}function _e(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case M:return"Fragment";case F:return"Portal";case H:return"Profiler";case G:return"StrictMode";case K:return"Suspense";case k:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case te:return(e.displayName||"Context")+".Consumer";case pe:return(e._context.displayName||"Context")+".Provider";case A:var r=e.render;return e=e.displayName,e||(e=r.displayName||r.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case se:return r=e.displayName||null,r!==null?r:_e(e.type)||"Memo";case ye:r=e._payload,e=e._init;try{return _e(e(r))}catch{}}return null}function Te(e){var r=e.type;switch(e.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=r.render,e=e.displayName||e.name||"",r.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return _e(r);case 8:return r===G?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function Ne(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Re(e){var r=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function We(e){var r=Re(e)?"checked":"value",i=Object.getOwnPropertyDescriptor(e.constructor.prototype,r),c=""+e[r];if(!e.hasOwnProperty(r)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var p=i.get,m=i.set;return Object.defineProperty(e,r,{configurable:!0,get:function(){return p.call(this)},set:function(E){c=""+E,m.call(this,E)}}),Object.defineProperty(e,r,{enumerable:i.enumerable}),{getValue:function(){return c},setValue:function(E){c=""+E},stopTracking:function(){e._valueTracker=null,delete e[r]}}}}function Xe(e){e._valueTracker||(e._valueTracker=We(e))}function Pt(e){if(!e)return!1;var r=e._valueTracker;if(!r)return!0;var i=r.getValue(),c="";return e&&(c=Re(e)?e.checked?"true":"false":e.value),e=c,e!==i?(r.setValue(e),!0):!1}function ot(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function y(e,r){var i=r.checked;return ne({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:i??e._wrapperState.initialChecked})}function fe(e,r){var i=r.defaultValue==null?"":r.defaultValue,c=r.checked!=null?r.checked:r.defaultChecked;i=Ne(r.value!=null?r.value:i),e._wrapperState={initialChecked:c,initialValue:i,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function ce(e,r){r=r.checked,r!=null&&T(e,"checked",r,!1)}function I(e,r){ce(e,r);var i=Ne(r.value),c=r.type;if(i!=null)c==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+i):e.value!==""+i&&(e.value=""+i);else if(c==="submit"||c==="reset"){e.removeAttribute("value");return}r.hasOwnProperty("value")?Y(e,r.type,i):r.hasOwnProperty("defaultValue")&&Y(e,r.type,Ne(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(e.defaultChecked=!!r.defaultChecked)}function O(e,r,i){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var c=r.type;if(!(c!=="submit"&&c!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+e._wrapperState.initialValue,i||r===e.value||(e.value=r),e.defaultValue=r}i=e.name,i!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,i!==""&&(e.name=i)}function Y(e,r,i){(r!=="number"||ot(e.ownerDocument)!==e)&&(i==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+i&&(e.defaultValue=""+i))}var D=Array.isArray;function ue(e,r,i,c){if(e=e.options,r){r={};for(var p=0;p<i.length;p++)r["$"+i[p]]=!0;for(i=0;i<e.length;i++)p=r.hasOwnProperty("$"+e[i].value),e[i].selected!==p&&(e[i].selected=p),p&&c&&(e[i].defaultSelected=!0)}else{for(i=""+Ne(i),r=null,p=0;p<e.length;p++){if(e[p].value===i){e[p].selected=!0,c&&(e[p].defaultSelected=!0);return}r!==null||e[p].disabled||(r=e[p])}r!==null&&(r.selected=!0)}}function Z(e,r){if(r.dangerouslySetInnerHTML!=null)throw Error(n(91));return ne({},r,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function he(e,r){var i=r.value;if(i==null){if(i=r.children,r=r.defaultValue,i!=null){if(r!=null)throw Error(n(92));if(D(i)){if(1<i.length)throw Error(n(93));i=i[0]}r=i}r==null&&(r=""),i=r}e._wrapperState={initialValue:Ne(i)}}function je(e,r){var i=Ne(r.value),c=Ne(r.defaultValue);i!=null&&(i=""+i,i!==e.value&&(e.value=i),r.defaultValue==null&&e.defaultValue!==i&&(e.defaultValue=i)),c!=null&&(e.defaultValue=""+c)}function be(e){var r=e.textContent;r===e._wrapperState.initialValue&&r!==""&&r!==null&&(e.value=r)}function Pe(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ge(e,r){return e==null||e==="http://www.w3.org/1999/xhtml"?Pe(r):e==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Be,zt=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,i,c,p){MSApp.execUnsafeLocalFunction(function(){return e(r,i,c,p)})}:e})(function(e,r){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=r;else{for(Be=Be||document.createElement("div"),Be.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=Be.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;r.firstChild;)e.appendChild(r.firstChild)}});function ur(e,r){if(r){var i=e.firstChild;if(i&&i===e.lastChild&&i.nodeType===3){i.nodeValue=r;return}}e.textContent=r}var kt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},hn=["Webkit","ms","Moz","O"];Object.keys(kt).forEach(function(e){hn.forEach(function(r){r=r+e.charAt(0).toUpperCase()+e.substring(1),kt[r]=kt[e]})});function et(e,r,i){return r==null||typeof r=="boolean"||r===""?"":i||typeof r!="number"||r===0||kt.hasOwnProperty(e)&&kt[e]?(""+r).trim():r+"px"}function mn(e,r){e=e.style;for(var i in r)if(r.hasOwnProperty(i)){var c=i.indexOf("--")===0,p=et(i,r[i],c);i==="float"&&(i="cssFloat"),c?e.setProperty(i,p):e[i]=p}}var ma=ne({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Vt(e,r){if(r){if(ma[e]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(n(137,e));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(n(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(n(61))}if(r.style!=null&&typeof r.style!="object")throw Error(n(62))}}function Bn(e,r){if(e.indexOf("-")===-1)return typeof r.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ga=null;function xa(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var va=null,zr=null,Jt=null;function gn(e){if(e=Ma(e)){if(typeof va!="function")throw Error(n(280));var r=e.stateNode;r&&(r=$s(r),va(e.stateNode,e.type,r))}}function Wc(e){zr?Jt?Jt.push(e):Jt=[e]:zr=e}function $c(){if(zr){var e=zr,r=Jt;if(Jt=zr=null,gn(e),r)for(e=0;e<r.length;e++)gn(r[e])}}function Hc(e,r){return e(r)}function Vc(){}var lo=!1;function qc(e,r,i){if(lo)return e(r,i);lo=!0;try{return Hc(e,r,i)}finally{lo=!1,(zr!==null||Jt!==null)&&(Vc(),$c())}}function ba(e,r){var i=e.stateNode;if(i===null)return null;var c=$s(i);if(c===null)return null;i=c[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(e=e.type,c=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!c;break e;default:e=!1}if(e)return null;if(i&&typeof i!="function")throw Error(n(231,r,typeof i));return i}var co=!1;if(f)try{var ya={};Object.defineProperty(ya,"passive",{get:function(){co=!0}}),window.addEventListener("test",ya,ya),window.removeEventListener("test",ya,ya)}catch{co=!1}function Dh(e,r,i,c,p,m,E,B,$){var ae=Array.prototype.slice.call(arguments,3);try{r.apply(i,ae)}catch(ge){this.onError(ge)}}var wa=!1,ws=null,js=!1,uo=null,Mh={onError:function(e){wa=!0,ws=e}};function Uh(e,r,i,c,p,m,E,B,$){wa=!1,ws=null,Dh.apply(Mh,arguments)}function Wh(e,r,i,c,p,m,E,B,$){if(Uh.apply(this,arguments),wa){if(wa){var ae=ws;wa=!1,ws=null}else throw Error(n(198));js||(js=!0,uo=ae)}}function xn(e){var r=e,i=e;if(e.alternate)for(;r.return;)r=r.return;else{e=r;do r=e,(r.flags&4098)!==0&&(i=r.return),e=r.return;while(e)}return r.tag===3?i:null}function Gc(e){if(e.tag===13){var r=e.memoizedState;if(r===null&&(e=e.alternate,e!==null&&(r=e.memoizedState)),r!==null)return r.dehydrated}return null}function Yc(e){if(xn(e)!==e)throw Error(n(188))}function $h(e){var r=e.alternate;if(!r){if(r=xn(e),r===null)throw Error(n(188));return r!==e?null:e}for(var i=e,c=r;;){var p=i.return;if(p===null)break;var m=p.alternate;if(m===null){if(c=p.return,c!==null){i=c;continue}break}if(p.child===m.child){for(m=p.child;m;){if(m===i)return Yc(p),e;if(m===c)return Yc(p),r;m=m.sibling}throw Error(n(188))}if(i.return!==c.return)i=p,c=m;else{for(var E=!1,B=p.child;B;){if(B===i){E=!0,i=p,c=m;break}if(B===c){E=!0,c=p,i=m;break}B=B.sibling}if(!E){for(B=m.child;B;){if(B===i){E=!0,i=m,c=p;break}if(B===c){E=!0,c=m,i=p;break}B=B.sibling}if(!E)throw Error(n(189))}}if(i.alternate!==c)throw Error(n(190))}if(i.tag!==3)throw Error(n(188));return i.stateNode.current===i?e:r}function Xc(e){return e=$h(e),e!==null?Kc(e):null}function Kc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var r=Kc(e);if(r!==null)return r;e=e.sibling}return null}var Zc=a.unstable_scheduleCallback,Qc=a.unstable_cancelCallback,Hh=a.unstable_shouldYield,Vh=a.unstable_requestPaint,lt=a.unstable_now,qh=a.unstable_getCurrentPriorityLevel,po=a.unstable_ImmediatePriority,Jc=a.unstable_UserBlockingPriority,ks=a.unstable_NormalPriority,Gh=a.unstable_LowPriority,ed=a.unstable_IdlePriority,Ns=null,Nr=null;function Yh(e){if(Nr&&typeof Nr.onCommitFiberRoot=="function")try{Nr.onCommitFiberRoot(Ns,e,void 0,(e.current.flags&128)===128)}catch{}}var pr=Math.clz32?Math.clz32:Zh,Xh=Math.log,Kh=Math.LN2;function Zh(e){return e>>>=0,e===0?32:31-(Xh(e)/Kh|0)|0}var _s=64,Ss=4194304;function ja(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Cs(e,r){var i=e.pendingLanes;if(i===0)return 0;var c=0,p=e.suspendedLanes,m=e.pingedLanes,E=i&268435455;if(E!==0){var B=E&~p;B!==0?c=ja(B):(m&=E,m!==0&&(c=ja(m)))}else E=i&~p,E!==0?c=ja(E):m!==0&&(c=ja(m));if(c===0)return 0;if(r!==0&&r!==c&&(r&p)===0&&(p=c&-c,m=r&-r,p>=m||p===16&&(m&4194240)!==0))return r;if((c&4)!==0&&(c|=i&16),r=e.entangledLanes,r!==0)for(e=e.entanglements,r&=c;0<r;)i=31-pr(r),p=1<<i,c|=e[i],r&=~p;return c}function Qh(e,r){switch(e){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Jh(e,r){for(var i=e.suspendedLanes,c=e.pingedLanes,p=e.expirationTimes,m=e.pendingLanes;0<m;){var E=31-pr(m),B=1<<E,$=p[E];$===-1?((B&i)===0||(B&c)!==0)&&(p[E]=Qh(B,r)):$<=r&&(e.expiredLanes|=B),m&=~B}}function fo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function td(){var e=_s;return _s<<=1,(_s&4194240)===0&&(_s=64),e}function ho(e){for(var r=[],i=0;31>i;i++)r.push(e);return r}function ka(e,r,i){e.pendingLanes|=r,r!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,r=31-pr(r),e[r]=i}function em(e,r){var i=e.pendingLanes&~r;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=r,e.mutableReadLanes&=r,e.entangledLanes&=r,r=e.entanglements;var c=e.eventTimes;for(e=e.expirationTimes;0<i;){var p=31-pr(i),m=1<<p;r[p]=0,c[p]=-1,e[p]=-1,i&=~m}}function mo(e,r){var i=e.entangledLanes|=r;for(e=e.entanglements;i;){var c=31-pr(i),p=1<<c;p&r|e[c]&r&&(e[c]|=r),i&=~p}}var Ye=0;function rd(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var nd,go,ad,sd,id,xo=!1,Es=[],$r=null,Hr=null,Vr=null,Na=new Map,_a=new Map,qr=[],tm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function od(e,r){switch(e){case"focusin":case"focusout":$r=null;break;case"dragenter":case"dragleave":Hr=null;break;case"mouseover":case"mouseout":Vr=null;break;case"pointerover":case"pointerout":Na.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":_a.delete(r.pointerId)}}function Sa(e,r,i,c,p,m){return e===null||e.nativeEvent!==m?(e={blockedOn:r,domEventName:i,eventSystemFlags:c,nativeEvent:m,targetContainers:[p]},r!==null&&(r=Ma(r),r!==null&&go(r)),e):(e.eventSystemFlags|=c,r=e.targetContainers,p!==null&&r.indexOf(p)===-1&&r.push(p),e)}function rm(e,r,i,c,p){switch(r){case"focusin":return $r=Sa($r,e,r,i,c,p),!0;case"dragenter":return Hr=Sa(Hr,e,r,i,c,p),!0;case"mouseover":return Vr=Sa(Vr,e,r,i,c,p),!0;case"pointerover":var m=p.pointerId;return Na.set(m,Sa(Na.get(m)||null,e,r,i,c,p)),!0;case"gotpointercapture":return m=p.pointerId,_a.set(m,Sa(_a.get(m)||null,e,r,i,c,p)),!0}return!1}function ld(e){var r=vn(e.target);if(r!==null){var i=xn(r);if(i!==null){if(r=i.tag,r===13){if(r=Gc(i),r!==null){e.blockedOn=r,id(e.priority,function(){ad(i)});return}}else if(r===3&&i.stateNode.current.memoizedState.isDehydrated){e.blockedOn=i.tag===3?i.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ps(e){if(e.blockedOn!==null)return!1;for(var r=e.targetContainers;0<r.length;){var i=bo(e.domEventName,e.eventSystemFlags,r[0],e.nativeEvent);if(i===null){i=e.nativeEvent;var c=new i.constructor(i.type,i);ga=c,i.target.dispatchEvent(c),ga=null}else return r=Ma(i),r!==null&&go(r),e.blockedOn=i,!1;r.shift()}return!0}function cd(e,r,i){Ps(e)&&i.delete(r)}function nm(){xo=!1,$r!==null&&Ps($r)&&($r=null),Hr!==null&&Ps(Hr)&&(Hr=null),Vr!==null&&Ps(Vr)&&(Vr=null),Na.forEach(cd),_a.forEach(cd)}function Ca(e,r){e.blockedOn===r&&(e.blockedOn=null,xo||(xo=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,nm)))}function Ea(e){function r(p){return Ca(p,e)}if(0<Es.length){Ca(Es[0],e);for(var i=1;i<Es.length;i++){var c=Es[i];c.blockedOn===e&&(c.blockedOn=null)}}for($r!==null&&Ca($r,e),Hr!==null&&Ca(Hr,e),Vr!==null&&Ca(Vr,e),Na.forEach(r),_a.forEach(r),i=0;i<qr.length;i++)c=qr[i],c.blockedOn===e&&(c.blockedOn=null);for(;0<qr.length&&(i=qr[0],i.blockedOn===null);)ld(i),i.blockedOn===null&&qr.shift()}var Dn=C.ReactCurrentBatchConfig,zs=!0;function am(e,r,i,c){var p=Ye,m=Dn.transition;Dn.transition=null;try{Ye=1,vo(e,r,i,c)}finally{Ye=p,Dn.transition=m}}function sm(e,r,i,c){var p=Ye,m=Dn.transition;Dn.transition=null;try{Ye=4,vo(e,r,i,c)}finally{Ye=p,Dn.transition=m}}function vo(e,r,i,c){if(zs){var p=bo(e,r,i,c);if(p===null)Io(e,r,c,Rs,i),od(e,c);else if(rm(p,e,r,i,c))c.stopPropagation();else if(od(e,c),r&4&&-1<tm.indexOf(e)){for(;p!==null;){var m=Ma(p);if(m!==null&&nd(m),m=bo(e,r,i,c),m===null&&Io(e,r,c,Rs,i),m===p)break;p=m}p!==null&&c.stopPropagation()}else Io(e,r,c,null,i)}}var Rs=null;function bo(e,r,i,c){if(Rs=null,e=xa(c),e=vn(e),e!==null)if(r=xn(e),r===null)e=null;else if(i=r.tag,i===13){if(e=Gc(r),e!==null)return e;e=null}else if(i===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;e=null}else r!==e&&(e=null);return Rs=e,null}function dd(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(qh()){case po:return 1;case Jc:return 4;case ks:case Gh:return 16;case ed:return 536870912;default:return 16}default:return 16}}var Gr=null,yo=null,Ts=null;function ud(){if(Ts)return Ts;var e,r=yo,i=r.length,c,p="value"in Gr?Gr.value:Gr.textContent,m=p.length;for(e=0;e<i&&r[e]===p[e];e++);var E=i-e;for(c=1;c<=E&&r[i-c]===p[m-c];c++);return Ts=p.slice(e,1<c?1-c:void 0)}function As(e){var r=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&r===13&&(e=13)):e=r,e===10&&(e=13),32<=e||e===13?e:0}function Ls(){return!0}function pd(){return!1}function qt(e){function r(i,c,p,m,E){this._reactName=i,this._targetInst=p,this.type=c,this.nativeEvent=m,this.target=E,this.currentTarget=null;for(var B in e)e.hasOwnProperty(B)&&(i=e[B],this[B]=i?i(m):m[B]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?Ls:pd,this.isPropagationStopped=pd,this}return ne(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var i=this.nativeEvent;i&&(i.preventDefault?i.preventDefault():typeof i.returnValue!="unknown"&&(i.returnValue=!1),this.isDefaultPrevented=Ls)},stopPropagation:function(){var i=this.nativeEvent;i&&(i.stopPropagation?i.stopPropagation():typeof i.cancelBubble!="unknown"&&(i.cancelBubble=!0),this.isPropagationStopped=Ls)},persist:function(){},isPersistent:Ls}),r}var Mn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},wo=qt(Mn),Pa=ne({},Mn,{view:0,detail:0}),im=qt(Pa),jo,ko,za,Os=ne({},Pa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_o,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==za&&(za&&e.type==="mousemove"?(jo=e.screenX-za.screenX,ko=e.screenY-za.screenY):ko=jo=0,za=e),jo)},movementY:function(e){return"movementY"in e?e.movementY:ko}}),fd=qt(Os),om=ne({},Os,{dataTransfer:0}),lm=qt(om),cm=ne({},Pa,{relatedTarget:0}),No=qt(cm),dm=ne({},Mn,{animationName:0,elapsedTime:0,pseudoElement:0}),um=qt(dm),pm=ne({},Mn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),fm=qt(pm),hm=ne({},Mn,{data:0}),hd=qt(hm),mm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},xm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function vm(e){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(e):(e=xm[e])?!!r[e]:!1}function _o(){return vm}var bm=ne({},Pa,{key:function(e){if(e.key){var r=mm[e.key]||e.key;if(r!=="Unidentified")return r}return e.type==="keypress"?(e=As(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?gm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_o,charCode:function(e){return e.type==="keypress"?As(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?As(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),ym=qt(bm),wm=ne({},Os,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),md=qt(wm),jm=ne({},Pa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_o}),km=qt(jm),Nm=ne({},Mn,{propertyName:0,elapsedTime:0,pseudoElement:0}),_m=qt(Nm),Sm=ne({},Os,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Cm=qt(Sm),Em=[9,13,27,32],So=f&&"CompositionEvent"in window,Ra=null;f&&"documentMode"in document&&(Ra=document.documentMode);var Pm=f&&"TextEvent"in window&&!Ra,gd=f&&(!So||Ra&&8<Ra&&11>=Ra),xd=" ",vd=!1;function bd(e,r){switch(e){case"keyup":return Em.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function yd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Un=!1;function zm(e,r){switch(e){case"compositionend":return yd(r);case"keypress":return r.which!==32?null:(vd=!0,xd);case"textInput":return e=r.data,e===xd&&vd?null:e;default:return null}}function Rm(e,r){if(Un)return e==="compositionend"||!So&&bd(e,r)?(e=ud(),Ts=yo=Gr=null,Un=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return gd&&r.locale!=="ko"?null:r.data;default:return null}}var Tm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wd(e){var r=e&&e.nodeName&&e.nodeName.toLowerCase();return r==="input"?!!Tm[e.type]:r==="textarea"}function jd(e,r,i,c){Wc(c),r=Ms(r,"onChange"),0<r.length&&(i=new wo("onChange","change",null,i,c),e.push({event:i,listeners:r}))}var Ta=null,Aa=null;function Am(e){Md(e,0)}function Is(e){var r=qn(e);if(Pt(r))return e}function Lm(e,r){if(e==="change")return r}var kd=!1;if(f){var Co;if(f){var Eo="oninput"in document;if(!Eo){var Nd=document.createElement("div");Nd.setAttribute("oninput","return;"),Eo=typeof Nd.oninput=="function"}Co=Eo}else Co=!1;kd=Co&&(!document.documentMode||9<document.documentMode)}function _d(){Ta&&(Ta.detachEvent("onpropertychange",Sd),Aa=Ta=null)}function Sd(e){if(e.propertyName==="value"&&Is(Aa)){var r=[];jd(r,Aa,e,xa(e)),qc(Am,r)}}function Om(e,r,i){e==="focusin"?(_d(),Ta=r,Aa=i,Ta.attachEvent("onpropertychange",Sd)):e==="focusout"&&_d()}function Im(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Is(Aa)}function Fm(e,r){if(e==="click")return Is(r)}function Bm(e,r){if(e==="input"||e==="change")return Is(r)}function Dm(e,r){return e===r&&(e!==0||1/e===1/r)||e!==e&&r!==r}var fr=typeof Object.is=="function"?Object.is:Dm;function La(e,r){if(fr(e,r))return!0;if(typeof e!="object"||e===null||typeof r!="object"||r===null)return!1;var i=Object.keys(e),c=Object.keys(r);if(i.length!==c.length)return!1;for(c=0;c<i.length;c++){var p=i[c];if(!h.call(r,p)||!fr(e[p],r[p]))return!1}return!0}function Cd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ed(e,r){var i=Cd(e);e=0;for(var c;i;){if(i.nodeType===3){if(c=e+i.textContent.length,e<=r&&c>=r)return{node:i,offset:r-e};e=c}e:{for(;i;){if(i.nextSibling){i=i.nextSibling;break e}i=i.parentNode}i=void 0}i=Cd(i)}}function Pd(e,r){return e&&r?e===r?!0:e&&e.nodeType===3?!1:r&&r.nodeType===3?Pd(e,r.parentNode):"contains"in e?e.contains(r):e.compareDocumentPosition?!!(e.compareDocumentPosition(r)&16):!1:!1}function zd(){for(var e=window,r=ot();r instanceof e.HTMLIFrameElement;){try{var i=typeof r.contentWindow.location.href=="string"}catch{i=!1}if(i)e=r.contentWindow;else break;r=ot(e.document)}return r}function Po(e){var r=e&&e.nodeName&&e.nodeName.toLowerCase();return r&&(r==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||r==="textarea"||e.contentEditable==="true")}function Mm(e){var r=zd(),i=e.focusedElem,c=e.selectionRange;if(r!==i&&i&&i.ownerDocument&&Pd(i.ownerDocument.documentElement,i)){if(c!==null&&Po(i)){if(r=c.start,e=c.end,e===void 0&&(e=r),"selectionStart"in i)i.selectionStart=r,i.selectionEnd=Math.min(e,i.value.length);else if(e=(r=i.ownerDocument||document)&&r.defaultView||window,e.getSelection){e=e.getSelection();var p=i.textContent.length,m=Math.min(c.start,p);c=c.end===void 0?m:Math.min(c.end,p),!e.extend&&m>c&&(p=c,c=m,m=p),p=Ed(i,m);var E=Ed(i,c);p&&E&&(e.rangeCount!==1||e.anchorNode!==p.node||e.anchorOffset!==p.offset||e.focusNode!==E.node||e.focusOffset!==E.offset)&&(r=r.createRange(),r.setStart(p.node,p.offset),e.removeAllRanges(),m>c?(e.addRange(r),e.extend(E.node,E.offset)):(r.setEnd(E.node,E.offset),e.addRange(r)))}}for(r=[],e=i;e=e.parentNode;)e.nodeType===1&&r.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof i.focus=="function"&&i.focus(),i=0;i<r.length;i++)e=r[i],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Um=f&&"documentMode"in document&&11>=document.documentMode,Wn=null,zo=null,Oa=null,Ro=!1;function Rd(e,r,i){var c=i.window===i?i.document:i.nodeType===9?i:i.ownerDocument;Ro||Wn==null||Wn!==ot(c)||(c=Wn,"selectionStart"in c&&Po(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),Oa&&La(Oa,c)||(Oa=c,c=Ms(zo,"onSelect"),0<c.length&&(r=new wo("onSelect","select",null,r,i),e.push({event:r,listeners:c}),r.target=Wn)))}function Fs(e,r){var i={};return i[e.toLowerCase()]=r.toLowerCase(),i["Webkit"+e]="webkit"+r,i["Moz"+e]="moz"+r,i}var $n={animationend:Fs("Animation","AnimationEnd"),animationiteration:Fs("Animation","AnimationIteration"),animationstart:Fs("Animation","AnimationStart"),transitionend:Fs("Transition","TransitionEnd")},To={},Td={};f&&(Td=document.createElement("div").style,"AnimationEvent"in window||(delete $n.animationend.animation,delete $n.animationiteration.animation,delete $n.animationstart.animation),"TransitionEvent"in window||delete $n.transitionend.transition);function Bs(e){if(To[e])return To[e];if(!$n[e])return e;var r=$n[e],i;for(i in r)if(r.hasOwnProperty(i)&&i in Td)return To[e]=r[i];return e}var Ad=Bs("animationend"),Ld=Bs("animationiteration"),Od=Bs("animationstart"),Id=Bs("transitionend"),Fd=new Map,Bd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Yr(e,r){Fd.set(e,r),d(r,[e])}for(var Ao=0;Ao<Bd.length;Ao++){var Lo=Bd[Ao],Wm=Lo.toLowerCase(),$m=Lo[0].toUpperCase()+Lo.slice(1);Yr(Wm,"on"+$m)}Yr(Ad,"onAnimationEnd"),Yr(Ld,"onAnimationIteration"),Yr(Od,"onAnimationStart"),Yr("dblclick","onDoubleClick"),Yr("focusin","onFocus"),Yr("focusout","onBlur"),Yr(Id,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),d("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),d("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),d("onBeforeInput",["compositionend","keypress","textInput","paste"]),d("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),d("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),d("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ia="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Hm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ia));function Dd(e,r,i){var c=e.type||"unknown-event";e.currentTarget=i,Wh(c,r,void 0,e),e.currentTarget=null}function Md(e,r){r=(r&4)!==0;for(var i=0;i<e.length;i++){var c=e[i],p=c.event;c=c.listeners;e:{var m=void 0;if(r)for(var E=c.length-1;0<=E;E--){var B=c[E],$=B.instance,ae=B.currentTarget;if(B=B.listener,$!==m&&p.isPropagationStopped())break e;Dd(p,B,ae),m=$}else for(E=0;E<c.length;E++){if(B=c[E],$=B.instance,ae=B.currentTarget,B=B.listener,$!==m&&p.isPropagationStopped())break e;Dd(p,B,ae),m=$}}}if(js)throw e=uo,js=!1,uo=null,e}function Qe(e,r){var i=r[Wo];i===void 0&&(i=r[Wo]=new Set);var c=e+"__bubble";i.has(c)||(Ud(r,e,2,!1),i.add(c))}function Oo(e,r,i){var c=0;r&&(c|=4),Ud(i,e,c,r)}var Ds="_reactListening"+Math.random().toString(36).slice(2);function Fa(e){if(!e[Ds]){e[Ds]=!0,o.forEach(function(i){i!=="selectionchange"&&(Hm.has(i)||Oo(i,!1,e),Oo(i,!0,e))});var r=e.nodeType===9?e:e.ownerDocument;r===null||r[Ds]||(r[Ds]=!0,Oo("selectionchange",!1,r))}}function Ud(e,r,i,c){switch(dd(r)){case 1:var p=am;break;case 4:p=sm;break;default:p=vo}i=p.bind(null,r,i,e),p=void 0,!co||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(p=!0),c?p!==void 0?e.addEventListener(r,i,{capture:!0,passive:p}):e.addEventListener(r,i,!0):p!==void 0?e.addEventListener(r,i,{passive:p}):e.addEventListener(r,i,!1)}function Io(e,r,i,c,p){var m=c;if((r&1)===0&&(r&2)===0&&c!==null)e:for(;;){if(c===null)return;var E=c.tag;if(E===3||E===4){var B=c.stateNode.containerInfo;if(B===p||B.nodeType===8&&B.parentNode===p)break;if(E===4)for(E=c.return;E!==null;){var $=E.tag;if(($===3||$===4)&&($=E.stateNode.containerInfo,$===p||$.nodeType===8&&$.parentNode===p))return;E=E.return}for(;B!==null;){if(E=vn(B),E===null)return;if($=E.tag,$===5||$===6){c=m=E;continue e}B=B.parentNode}}c=c.return}qc(function(){var ae=m,ge=xa(i),xe=[];e:{var me=Fd.get(e);if(me!==void 0){var ke=wo,Ce=e;switch(e){case"keypress":if(As(i)===0)break e;case"keydown":case"keyup":ke=ym;break;case"focusin":Ce="focus",ke=No;break;case"focusout":Ce="blur",ke=No;break;case"beforeblur":case"afterblur":ke=No;break;case"click":if(i.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ke=fd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ke=lm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ke=km;break;case Ad:case Ld:case Od:ke=um;break;case Id:ke=_m;break;case"scroll":ke=im;break;case"wheel":ke=Cm;break;case"copy":case"cut":case"paste":ke=fm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ke=md}var Ee=(r&4)!==0,ct=!Ee&&e==="scroll",Q=Ee?me!==null?me+"Capture":null:me;Ee=[];for(var q=ae,ee;q!==null;){ee=q;var we=ee.stateNode;if(ee.tag===5&&we!==null&&(ee=we,Q!==null&&(we=ba(q,Q),we!=null&&Ee.push(Ba(q,we,ee)))),ct)break;q=q.return}0<Ee.length&&(me=new ke(me,Ce,null,i,ge),xe.push({event:me,listeners:Ee}))}}if((r&7)===0){e:{if(me=e==="mouseover"||e==="pointerover",ke=e==="mouseout"||e==="pointerout",me&&i!==ga&&(Ce=i.relatedTarget||i.fromElement)&&(vn(Ce)||Ce[Rr]))break e;if((ke||me)&&(me=ge.window===ge?ge:(me=ge.ownerDocument)?me.defaultView||me.parentWindow:window,ke?(Ce=i.relatedTarget||i.toElement,ke=ae,Ce=Ce?vn(Ce):null,Ce!==null&&(ct=xn(Ce),Ce!==ct||Ce.tag!==5&&Ce.tag!==6)&&(Ce=null)):(ke=null,Ce=ae),ke!==Ce)){if(Ee=fd,we="onMouseLeave",Q="onMouseEnter",q="mouse",(e==="pointerout"||e==="pointerover")&&(Ee=md,we="onPointerLeave",Q="onPointerEnter",q="pointer"),ct=ke==null?me:qn(ke),ee=Ce==null?me:qn(Ce),me=new Ee(we,q+"leave",ke,i,ge),me.target=ct,me.relatedTarget=ee,we=null,vn(ge)===ae&&(Ee=new Ee(Q,q+"enter",Ce,i,ge),Ee.target=ee,Ee.relatedTarget=ct,we=Ee),ct=we,ke&&Ce)t:{for(Ee=ke,Q=Ce,q=0,ee=Ee;ee;ee=Hn(ee))q++;for(ee=0,we=Q;we;we=Hn(we))ee++;for(;0<q-ee;)Ee=Hn(Ee),q--;for(;0<ee-q;)Q=Hn(Q),ee--;for(;q--;){if(Ee===Q||Q!==null&&Ee===Q.alternate)break t;Ee=Hn(Ee),Q=Hn(Q)}Ee=null}else Ee=null;ke!==null&&Wd(xe,me,ke,Ee,!1),Ce!==null&&ct!==null&&Wd(xe,ct,Ce,Ee,!0)}}e:{if(me=ae?qn(ae):window,ke=me.nodeName&&me.nodeName.toLowerCase(),ke==="select"||ke==="input"&&me.type==="file")var ze=Lm;else if(wd(me))if(kd)ze=Bm;else{ze=Im;var Le=Om}else(ke=me.nodeName)&&ke.toLowerCase()==="input"&&(me.type==="checkbox"||me.type==="radio")&&(ze=Fm);if(ze&&(ze=ze(e,ae))){jd(xe,ze,i,ge);break e}Le&&Le(e,me,ae),e==="focusout"&&(Le=me._wrapperState)&&Le.controlled&&me.type==="number"&&Y(me,"number",me.value)}switch(Le=ae?qn(ae):window,e){case"focusin":(wd(Le)||Le.contentEditable==="true")&&(Wn=Le,zo=ae,Oa=null);break;case"focusout":Oa=zo=Wn=null;break;case"mousedown":Ro=!0;break;case"contextmenu":case"mouseup":case"dragend":Ro=!1,Rd(xe,i,ge);break;case"selectionchange":if(Um)break;case"keydown":case"keyup":Rd(xe,i,ge)}var Oe;if(So)e:{switch(e){case"compositionstart":var Fe="onCompositionStart";break e;case"compositionend":Fe="onCompositionEnd";break e;case"compositionupdate":Fe="onCompositionUpdate";break e}Fe=void 0}else Un?bd(e,i)&&(Fe="onCompositionEnd"):e==="keydown"&&i.keyCode===229&&(Fe="onCompositionStart");Fe&&(gd&&i.locale!=="ko"&&(Un||Fe!=="onCompositionStart"?Fe==="onCompositionEnd"&&Un&&(Oe=ud()):(Gr=ge,yo="value"in Gr?Gr.value:Gr.textContent,Un=!0)),Le=Ms(ae,Fe),0<Le.length&&(Fe=new hd(Fe,e,null,i,ge),xe.push({event:Fe,listeners:Le}),Oe?Fe.data=Oe:(Oe=yd(i),Oe!==null&&(Fe.data=Oe)))),(Oe=Pm?zm(e,i):Rm(e,i))&&(ae=Ms(ae,"onBeforeInput"),0<ae.length&&(ge=new hd("onBeforeInput","beforeinput",null,i,ge),xe.push({event:ge,listeners:ae}),ge.data=Oe))}Md(xe,r)})}function Ba(e,r,i){return{instance:e,listener:r,currentTarget:i}}function Ms(e,r){for(var i=r+"Capture",c=[];e!==null;){var p=e,m=p.stateNode;p.tag===5&&m!==null&&(p=m,m=ba(e,i),m!=null&&c.unshift(Ba(e,m,p)),m=ba(e,r),m!=null&&c.push(Ba(e,m,p))),e=e.return}return c}function Hn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Wd(e,r,i,c,p){for(var m=r._reactName,E=[];i!==null&&i!==c;){var B=i,$=B.alternate,ae=B.stateNode;if($!==null&&$===c)break;B.tag===5&&ae!==null&&(B=ae,p?($=ba(i,m),$!=null&&E.unshift(Ba(i,$,B))):p||($=ba(i,m),$!=null&&E.push(Ba(i,$,B)))),i=i.return}E.length!==0&&e.push({event:r,listeners:E})}var Vm=/\r\n?/g,qm=/\u0000|\uFFFD/g;function $d(e){return(typeof e=="string"?e:""+e).replace(Vm,`
`).replace(qm,"")}function Us(e,r,i){if(r=$d(r),$d(e)!==r&&i)throw Error(n(425))}function Ws(){}var Fo=null,Bo=null;function Do(e,r){return e==="textarea"||e==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var Mo=typeof setTimeout=="function"?setTimeout:void 0,Gm=typeof clearTimeout=="function"?clearTimeout:void 0,Hd=typeof Promise=="function"?Promise:void 0,Ym=typeof queueMicrotask=="function"?queueMicrotask:typeof Hd<"u"?function(e){return Hd.resolve(null).then(e).catch(Xm)}:Mo;function Xm(e){setTimeout(function(){throw e})}function Uo(e,r){var i=r,c=0;do{var p=i.nextSibling;if(e.removeChild(i),p&&p.nodeType===8)if(i=p.data,i==="/$"){if(c===0){e.removeChild(p),Ea(r);return}c--}else i!=="$"&&i!=="$?"&&i!=="$!"||c++;i=p}while(i);Ea(r)}function Xr(e){for(;e!=null;e=e.nextSibling){var r=e.nodeType;if(r===1||r===3)break;if(r===8){if(r=e.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return e}function Vd(e){e=e.previousSibling;for(var r=0;e;){if(e.nodeType===8){var i=e.data;if(i==="$"||i==="$!"||i==="$?"){if(r===0)return e;r--}else i==="/$"&&r++}e=e.previousSibling}return null}var Vn=Math.random().toString(36).slice(2),_r="__reactFiber$"+Vn,Da="__reactProps$"+Vn,Rr="__reactContainer$"+Vn,Wo="__reactEvents$"+Vn,Km="__reactListeners$"+Vn,Zm="__reactHandles$"+Vn;function vn(e){var r=e[_r];if(r)return r;for(var i=e.parentNode;i;){if(r=i[Rr]||i[_r]){if(i=r.alternate,r.child!==null||i!==null&&i.child!==null)for(e=Vd(e);e!==null;){if(i=e[_r])return i;e=Vd(e)}return r}e=i,i=e.parentNode}return null}function Ma(e){return e=e[_r]||e[Rr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function qn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(n(33))}function $s(e){return e[Da]||null}var $o=[],Gn=-1;function Kr(e){return{current:e}}function Je(e){0>Gn||(e.current=$o[Gn],$o[Gn]=null,Gn--)}function Ze(e,r){Gn++,$o[Gn]=e.current,e.current=r}var Zr={},Nt=Kr(Zr),It=Kr(!1),bn=Zr;function Yn(e,r){var i=e.type.contextTypes;if(!i)return Zr;var c=e.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===r)return c.__reactInternalMemoizedMaskedChildContext;var p={},m;for(m in i)p[m]=r[m];return c&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=p),p}function Ft(e){return e=e.childContextTypes,e!=null}function Hs(){Je(It),Je(Nt)}function qd(e,r,i){if(Nt.current!==Zr)throw Error(n(168));Ze(Nt,r),Ze(It,i)}function Gd(e,r,i){var c=e.stateNode;if(r=r.childContextTypes,typeof c.getChildContext!="function")return i;c=c.getChildContext();for(var p in c)if(!(p in r))throw Error(n(108,Te(e)||"Unknown",p));return ne({},i,c)}function Vs(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Zr,bn=Nt.current,Ze(Nt,e),Ze(It,It.current),!0}function Yd(e,r,i){var c=e.stateNode;if(!c)throw Error(n(169));i?(e=Gd(e,r,bn),c.__reactInternalMemoizedMergedChildContext=e,Je(It),Je(Nt),Ze(Nt,e)):Je(It),Ze(It,i)}var Tr=null,qs=!1,Ho=!1;function Xd(e){Tr===null?Tr=[e]:Tr.push(e)}function Qm(e){qs=!0,Xd(e)}function Qr(){if(!Ho&&Tr!==null){Ho=!0;var e=0,r=Ye;try{var i=Tr;for(Ye=1;e<i.length;e++){var c=i[e];do c=c(!0);while(c!==null)}Tr=null,qs=!1}catch(p){throw Tr!==null&&(Tr=Tr.slice(e+1)),Zc(po,Qr),p}finally{Ye=r,Ho=!1}}return null}var Xn=[],Kn=0,Gs=null,Ys=0,er=[],tr=0,yn=null,Ar=1,Lr="";function wn(e,r){Xn[Kn++]=Ys,Xn[Kn++]=Gs,Gs=e,Ys=r}function Kd(e,r,i){er[tr++]=Ar,er[tr++]=Lr,er[tr++]=yn,yn=e;var c=Ar;e=Lr;var p=32-pr(c)-1;c&=~(1<<p),i+=1;var m=32-pr(r)+p;if(30<m){var E=p-p%5;m=(c&(1<<E)-1).toString(32),c>>=E,p-=E,Ar=1<<32-pr(r)+p|i<<p|c,Lr=m+e}else Ar=1<<m|i<<p|c,Lr=e}function Vo(e){e.return!==null&&(wn(e,1),Kd(e,1,0))}function qo(e){for(;e===Gs;)Gs=Xn[--Kn],Xn[Kn]=null,Ys=Xn[--Kn],Xn[Kn]=null;for(;e===yn;)yn=er[--tr],er[tr]=null,Lr=er[--tr],er[tr]=null,Ar=er[--tr],er[tr]=null}var Gt=null,Yt=null,tt=!1,hr=null;function Zd(e,r){var i=sr(5,null,null,0);i.elementType="DELETED",i.stateNode=r,i.return=e,r=e.deletions,r===null?(e.deletions=[i],e.flags|=16):r.push(i)}function Qd(e,r){switch(e.tag){case 5:var i=e.type;return r=r.nodeType!==1||i.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(e.stateNode=r,Gt=e,Yt=Xr(r.firstChild),!0):!1;case 6:return r=e.pendingProps===""||r.nodeType!==3?null:r,r!==null?(e.stateNode=r,Gt=e,Yt=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(i=yn!==null?{id:Ar,overflow:Lr}:null,e.memoizedState={dehydrated:r,treeContext:i,retryLane:1073741824},i=sr(18,null,null,0),i.stateNode=r,i.return=e,e.child=i,Gt=e,Yt=null,!0):!1;default:return!1}}function Go(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Yo(e){if(tt){var r=Yt;if(r){var i=r;if(!Qd(e,r)){if(Go(e))throw Error(n(418));r=Xr(i.nextSibling);var c=Gt;r&&Qd(e,r)?Zd(c,i):(e.flags=e.flags&-4097|2,tt=!1,Gt=e)}}else{if(Go(e))throw Error(n(418));e.flags=e.flags&-4097|2,tt=!1,Gt=e}}}function Jd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Gt=e}function Xs(e){if(e!==Gt)return!1;if(!tt)return Jd(e),tt=!0,!1;var r;if((r=e.tag!==3)&&!(r=e.tag!==5)&&(r=e.type,r=r!=="head"&&r!=="body"&&!Do(e.type,e.memoizedProps)),r&&(r=Yt)){if(Go(e))throw eu(),Error(n(418));for(;r;)Zd(e,r),r=Xr(r.nextSibling)}if(Jd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(n(317));e:{for(e=e.nextSibling,r=0;e;){if(e.nodeType===8){var i=e.data;if(i==="/$"){if(r===0){Yt=Xr(e.nextSibling);break e}r--}else i!=="$"&&i!=="$!"&&i!=="$?"||r++}e=e.nextSibling}Yt=null}}else Yt=Gt?Xr(e.stateNode.nextSibling):null;return!0}function eu(){for(var e=Yt;e;)e=Xr(e.nextSibling)}function Zn(){Yt=Gt=null,tt=!1}function Xo(e){hr===null?hr=[e]:hr.push(e)}var Jm=C.ReactCurrentBatchConfig;function Ua(e,r,i){if(e=i.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(i._owner){if(i=i._owner,i){if(i.tag!==1)throw Error(n(309));var c=i.stateNode}if(!c)throw Error(n(147,e));var p=c,m=""+e;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===m?r.ref:(r=function(E){var B=p.refs;E===null?delete B[m]:B[m]=E},r._stringRef=m,r)}if(typeof e!="string")throw Error(n(284));if(!i._owner)throw Error(n(290,e))}return e}function Ks(e,r){throw e=Object.prototype.toString.call(r),Error(n(31,e==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":e))}function tu(e){var r=e._init;return r(e._payload)}function ru(e){function r(Q,q){if(e){var ee=Q.deletions;ee===null?(Q.deletions=[q],Q.flags|=16):ee.push(q)}}function i(Q,q){if(!e)return null;for(;q!==null;)r(Q,q),q=q.sibling;return null}function c(Q,q){for(Q=new Map;q!==null;)q.key!==null?Q.set(q.key,q):Q.set(q.index,q),q=q.sibling;return Q}function p(Q,q){return Q=on(Q,q),Q.index=0,Q.sibling=null,Q}function m(Q,q,ee){return Q.index=ee,e?(ee=Q.alternate,ee!==null?(ee=ee.index,ee<q?(Q.flags|=2,q):ee):(Q.flags|=2,q)):(Q.flags|=1048576,q)}function E(Q){return e&&Q.alternate===null&&(Q.flags|=2),Q}function B(Q,q,ee,we){return q===null||q.tag!==6?(q=Ml(ee,Q.mode,we),q.return=Q,q):(q=p(q,ee),q.return=Q,q)}function $(Q,q,ee,we){var ze=ee.type;return ze===M?ge(Q,q,ee.props.children,we,ee.key):q!==null&&(q.elementType===ze||typeof ze=="object"&&ze!==null&&ze.$$typeof===ye&&tu(ze)===q.type)?(we=p(q,ee.props),we.ref=Ua(Q,q,ee),we.return=Q,we):(we=yi(ee.type,ee.key,ee.props,null,Q.mode,we),we.ref=Ua(Q,q,ee),we.return=Q,we)}function ae(Q,q,ee,we){return q===null||q.tag!==4||q.stateNode.containerInfo!==ee.containerInfo||q.stateNode.implementation!==ee.implementation?(q=Ul(ee,Q.mode,we),q.return=Q,q):(q=p(q,ee.children||[]),q.return=Q,q)}function ge(Q,q,ee,we,ze){return q===null||q.tag!==7?(q=Pn(ee,Q.mode,we,ze),q.return=Q,q):(q=p(q,ee),q.return=Q,q)}function xe(Q,q,ee){if(typeof q=="string"&&q!==""||typeof q=="number")return q=Ml(""+q,Q.mode,ee),q.return=Q,q;if(typeof q=="object"&&q!==null){switch(q.$$typeof){case L:return ee=yi(q.type,q.key,q.props,null,Q.mode,ee),ee.ref=Ua(Q,null,q),ee.return=Q,ee;case F:return q=Ul(q,Q.mode,ee),q.return=Q,q;case ye:var we=q._init;return xe(Q,we(q._payload),ee)}if(D(q)||X(q))return q=Pn(q,Q.mode,ee,null),q.return=Q,q;Ks(Q,q)}return null}function me(Q,q,ee,we){var ze=q!==null?q.key:null;if(typeof ee=="string"&&ee!==""||typeof ee=="number")return ze!==null?null:B(Q,q,""+ee,we);if(typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case L:return ee.key===ze?$(Q,q,ee,we):null;case F:return ee.key===ze?ae(Q,q,ee,we):null;case ye:return ze=ee._init,me(Q,q,ze(ee._payload),we)}if(D(ee)||X(ee))return ze!==null?null:ge(Q,q,ee,we,null);Ks(Q,ee)}return null}function ke(Q,q,ee,we,ze){if(typeof we=="string"&&we!==""||typeof we=="number")return Q=Q.get(ee)||null,B(q,Q,""+we,ze);if(typeof we=="object"&&we!==null){switch(we.$$typeof){case L:return Q=Q.get(we.key===null?ee:we.key)||null,$(q,Q,we,ze);case F:return Q=Q.get(we.key===null?ee:we.key)||null,ae(q,Q,we,ze);case ye:var Le=we._init;return ke(Q,q,ee,Le(we._payload),ze)}if(D(we)||X(we))return Q=Q.get(ee)||null,ge(q,Q,we,ze,null);Ks(q,we)}return null}function Ce(Q,q,ee,we){for(var ze=null,Le=null,Oe=q,Fe=q=0,vt=null;Oe!==null&&Fe<ee.length;Fe++){Oe.index>Fe?(vt=Oe,Oe=null):vt=Oe.sibling;var Ve=me(Q,Oe,ee[Fe],we);if(Ve===null){Oe===null&&(Oe=vt);break}e&&Oe&&Ve.alternate===null&&r(Q,Oe),q=m(Ve,q,Fe),Le===null?ze=Ve:Le.sibling=Ve,Le=Ve,Oe=vt}if(Fe===ee.length)return i(Q,Oe),tt&&wn(Q,Fe),ze;if(Oe===null){for(;Fe<ee.length;Fe++)Oe=xe(Q,ee[Fe],we),Oe!==null&&(q=m(Oe,q,Fe),Le===null?ze=Oe:Le.sibling=Oe,Le=Oe);return tt&&wn(Q,Fe),ze}for(Oe=c(Q,Oe);Fe<ee.length;Fe++)vt=ke(Oe,Q,Fe,ee[Fe],we),vt!==null&&(e&&vt.alternate!==null&&Oe.delete(vt.key===null?Fe:vt.key),q=m(vt,q,Fe),Le===null?ze=vt:Le.sibling=vt,Le=vt);return e&&Oe.forEach(function(ln){return r(Q,ln)}),tt&&wn(Q,Fe),ze}function Ee(Q,q,ee,we){var ze=X(ee);if(typeof ze!="function")throw Error(n(150));if(ee=ze.call(ee),ee==null)throw Error(n(151));for(var Le=ze=null,Oe=q,Fe=q=0,vt=null,Ve=ee.next();Oe!==null&&!Ve.done;Fe++,Ve=ee.next()){Oe.index>Fe?(vt=Oe,Oe=null):vt=Oe.sibling;var ln=me(Q,Oe,Ve.value,we);if(ln===null){Oe===null&&(Oe=vt);break}e&&Oe&&ln.alternate===null&&r(Q,Oe),q=m(ln,q,Fe),Le===null?ze=ln:Le.sibling=ln,Le=ln,Oe=vt}if(Ve.done)return i(Q,Oe),tt&&wn(Q,Fe),ze;if(Oe===null){for(;!Ve.done;Fe++,Ve=ee.next())Ve=xe(Q,Ve.value,we),Ve!==null&&(q=m(Ve,q,Fe),Le===null?ze=Ve:Le.sibling=Ve,Le=Ve);return tt&&wn(Q,Fe),ze}for(Oe=c(Q,Oe);!Ve.done;Fe++,Ve=ee.next())Ve=ke(Oe,Q,Fe,Ve.value,we),Ve!==null&&(e&&Ve.alternate!==null&&Oe.delete(Ve.key===null?Fe:Ve.key),q=m(Ve,q,Fe),Le===null?ze=Ve:Le.sibling=Ve,Le=Ve);return e&&Oe.forEach(function(Tg){return r(Q,Tg)}),tt&&wn(Q,Fe),ze}function ct(Q,q,ee,we){if(typeof ee=="object"&&ee!==null&&ee.type===M&&ee.key===null&&(ee=ee.props.children),typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case L:e:{for(var ze=ee.key,Le=q;Le!==null;){if(Le.key===ze){if(ze=ee.type,ze===M){if(Le.tag===7){i(Q,Le.sibling),q=p(Le,ee.props.children),q.return=Q,Q=q;break e}}else if(Le.elementType===ze||typeof ze=="object"&&ze!==null&&ze.$$typeof===ye&&tu(ze)===Le.type){i(Q,Le.sibling),q=p(Le,ee.props),q.ref=Ua(Q,Le,ee),q.return=Q,Q=q;break e}i(Q,Le);break}else r(Q,Le);Le=Le.sibling}ee.type===M?(q=Pn(ee.props.children,Q.mode,we,ee.key),q.return=Q,Q=q):(we=yi(ee.type,ee.key,ee.props,null,Q.mode,we),we.ref=Ua(Q,q,ee),we.return=Q,Q=we)}return E(Q);case F:e:{for(Le=ee.key;q!==null;){if(q.key===Le)if(q.tag===4&&q.stateNode.containerInfo===ee.containerInfo&&q.stateNode.implementation===ee.implementation){i(Q,q.sibling),q=p(q,ee.children||[]),q.return=Q,Q=q;break e}else{i(Q,q);break}else r(Q,q);q=q.sibling}q=Ul(ee,Q.mode,we),q.return=Q,Q=q}return E(Q);case ye:return Le=ee._init,ct(Q,q,Le(ee._payload),we)}if(D(ee))return Ce(Q,q,ee,we);if(X(ee))return Ee(Q,q,ee,we);Ks(Q,ee)}return typeof ee=="string"&&ee!==""||typeof ee=="number"?(ee=""+ee,q!==null&&q.tag===6?(i(Q,q.sibling),q=p(q,ee),q.return=Q,Q=q):(i(Q,q),q=Ml(ee,Q.mode,we),q.return=Q,Q=q),E(Q)):i(Q,q)}return ct}var Qn=ru(!0),nu=ru(!1),Zs=Kr(null),Qs=null,Jn=null,Ko=null;function Zo(){Ko=Jn=Qs=null}function Qo(e){var r=Zs.current;Je(Zs),e._currentValue=r}function Jo(e,r,i){for(;e!==null;){var c=e.alternate;if((e.childLanes&r)!==r?(e.childLanes|=r,c!==null&&(c.childLanes|=r)):c!==null&&(c.childLanes&r)!==r&&(c.childLanes|=r),e===i)break;e=e.return}}function ea(e,r){Qs=e,Ko=Jn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&r)!==0&&(Bt=!0),e.firstContext=null)}function rr(e){var r=e._currentValue;if(Ko!==e)if(e={context:e,memoizedValue:r,next:null},Jn===null){if(Qs===null)throw Error(n(308));Jn=e,Qs.dependencies={lanes:0,firstContext:e}}else Jn=Jn.next=e;return r}var jn=null;function el(e){jn===null?jn=[e]:jn.push(e)}function au(e,r,i,c){var p=r.interleaved;return p===null?(i.next=i,el(r)):(i.next=p.next,p.next=i),r.interleaved=i,Or(e,c)}function Or(e,r){e.lanes|=r;var i=e.alternate;for(i!==null&&(i.lanes|=r),i=e,e=e.return;e!==null;)e.childLanes|=r,i=e.alternate,i!==null&&(i.childLanes|=r),i=e,e=e.return;return i.tag===3?i.stateNode:null}var Jr=!1;function tl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function su(e,r){e=e.updateQueue,r.updateQueue===e&&(r.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ir(e,r){return{eventTime:e,lane:r,tag:0,payload:null,callback:null,next:null}}function en(e,r,i){var c=e.updateQueue;if(c===null)return null;if(c=c.shared,($e&2)!==0){var p=c.pending;return p===null?r.next=r:(r.next=p.next,p.next=r),c.pending=r,Or(e,i)}return p=c.interleaved,p===null?(r.next=r,el(c)):(r.next=p.next,p.next=r),c.interleaved=r,Or(e,i)}function Js(e,r,i){if(r=r.updateQueue,r!==null&&(r=r.shared,(i&4194240)!==0)){var c=r.lanes;c&=e.pendingLanes,i|=c,r.lanes=i,mo(e,i)}}function iu(e,r){var i=e.updateQueue,c=e.alternate;if(c!==null&&(c=c.updateQueue,i===c)){var p=null,m=null;if(i=i.firstBaseUpdate,i!==null){do{var E={eventTime:i.eventTime,lane:i.lane,tag:i.tag,payload:i.payload,callback:i.callback,next:null};m===null?p=m=E:m=m.next=E,i=i.next}while(i!==null);m===null?p=m=r:m=m.next=r}else p=m=r;i={baseState:c.baseState,firstBaseUpdate:p,lastBaseUpdate:m,shared:c.shared,effects:c.effects},e.updateQueue=i;return}e=i.lastBaseUpdate,e===null?i.firstBaseUpdate=r:e.next=r,i.lastBaseUpdate=r}function ei(e,r,i,c){var p=e.updateQueue;Jr=!1;var m=p.firstBaseUpdate,E=p.lastBaseUpdate,B=p.shared.pending;if(B!==null){p.shared.pending=null;var $=B,ae=$.next;$.next=null,E===null?m=ae:E.next=ae,E=$;var ge=e.alternate;ge!==null&&(ge=ge.updateQueue,B=ge.lastBaseUpdate,B!==E&&(B===null?ge.firstBaseUpdate=ae:B.next=ae,ge.lastBaseUpdate=$))}if(m!==null){var xe=p.baseState;E=0,ge=ae=$=null,B=m;do{var me=B.lane,ke=B.eventTime;if((c&me)===me){ge!==null&&(ge=ge.next={eventTime:ke,lane:0,tag:B.tag,payload:B.payload,callback:B.callback,next:null});e:{var Ce=e,Ee=B;switch(me=r,ke=i,Ee.tag){case 1:if(Ce=Ee.payload,typeof Ce=="function"){xe=Ce.call(ke,xe,me);break e}xe=Ce;break e;case 3:Ce.flags=Ce.flags&-65537|128;case 0:if(Ce=Ee.payload,me=typeof Ce=="function"?Ce.call(ke,xe,me):Ce,me==null)break e;xe=ne({},xe,me);break e;case 2:Jr=!0}}B.callback!==null&&B.lane!==0&&(e.flags|=64,me=p.effects,me===null?p.effects=[B]:me.push(B))}else ke={eventTime:ke,lane:me,tag:B.tag,payload:B.payload,callback:B.callback,next:null},ge===null?(ae=ge=ke,$=xe):ge=ge.next=ke,E|=me;if(B=B.next,B===null){if(B=p.shared.pending,B===null)break;me=B,B=me.next,me.next=null,p.lastBaseUpdate=me,p.shared.pending=null}}while(!0);if(ge===null&&($=xe),p.baseState=$,p.firstBaseUpdate=ae,p.lastBaseUpdate=ge,r=p.shared.interleaved,r!==null){p=r;do E|=p.lane,p=p.next;while(p!==r)}else m===null&&(p.shared.lanes=0);_n|=E,e.lanes=E,e.memoizedState=xe}}function ou(e,r,i){if(e=r.effects,r.effects=null,e!==null)for(r=0;r<e.length;r++){var c=e[r],p=c.callback;if(p!==null){if(c.callback=null,c=i,typeof p!="function")throw Error(n(191,p));p.call(c)}}}var Wa={},Sr=Kr(Wa),$a=Kr(Wa),Ha=Kr(Wa);function kn(e){if(e===Wa)throw Error(n(174));return e}function rl(e,r){switch(Ze(Ha,r),Ze($a,e),Ze(Sr,Wa),e=r.nodeType,e){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:Ge(null,"");break;default:e=e===8?r.parentNode:r,r=e.namespaceURI||null,e=e.tagName,r=Ge(r,e)}Je(Sr),Ze(Sr,r)}function ta(){Je(Sr),Je($a),Je(Ha)}function lu(e){kn(Ha.current);var r=kn(Sr.current),i=Ge(r,e.type);r!==i&&(Ze($a,e),Ze(Sr,i))}function nl(e){$a.current===e&&(Je(Sr),Je($a))}var rt=Kr(0);function ti(e){for(var r=e;r!==null;){if(r.tag===13){var i=r.memoizedState;if(i!==null&&(i=i.dehydrated,i===null||i.data==="$?"||i.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if((r.flags&128)!==0)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break;for(;r.sibling===null;){if(r.return===null||r.return===e)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var al=[];function sl(){for(var e=0;e<al.length;e++)al[e]._workInProgressVersionPrimary=null;al.length=0}var ri=C.ReactCurrentDispatcher,il=C.ReactCurrentBatchConfig,Nn=0,nt=null,ft=null,gt=null,ni=!1,Va=!1,qa=0,eg=0;function _t(){throw Error(n(321))}function ol(e,r){if(r===null)return!1;for(var i=0;i<r.length&&i<e.length;i++)if(!fr(e[i],r[i]))return!1;return!0}function ll(e,r,i,c,p,m){if(Nn=m,nt=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,ri.current=e===null||e.memoizedState===null?ag:sg,e=i(c,p),Va){m=0;do{if(Va=!1,qa=0,25<=m)throw Error(n(301));m+=1,gt=ft=null,r.updateQueue=null,ri.current=ig,e=i(c,p)}while(Va)}if(ri.current=ii,r=ft!==null&&ft.next!==null,Nn=0,gt=ft=nt=null,ni=!1,r)throw Error(n(300));return e}function cl(){var e=qa!==0;return qa=0,e}function Cr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return gt===null?nt.memoizedState=gt=e:gt=gt.next=e,gt}function nr(){if(ft===null){var e=nt.alternate;e=e!==null?e.memoizedState:null}else e=ft.next;var r=gt===null?nt.memoizedState:gt.next;if(r!==null)gt=r,ft=e;else{if(e===null)throw Error(n(310));ft=e,e={memoizedState:ft.memoizedState,baseState:ft.baseState,baseQueue:ft.baseQueue,queue:ft.queue,next:null},gt===null?nt.memoizedState=gt=e:gt=gt.next=e}return gt}function Ga(e,r){return typeof r=="function"?r(e):r}function dl(e){var r=nr(),i=r.queue;if(i===null)throw Error(n(311));i.lastRenderedReducer=e;var c=ft,p=c.baseQueue,m=i.pending;if(m!==null){if(p!==null){var E=p.next;p.next=m.next,m.next=E}c.baseQueue=p=m,i.pending=null}if(p!==null){m=p.next,c=c.baseState;var B=E=null,$=null,ae=m;do{var ge=ae.lane;if((Nn&ge)===ge)$!==null&&($=$.next={lane:0,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null}),c=ae.hasEagerState?ae.eagerState:e(c,ae.action);else{var xe={lane:ge,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null};$===null?(B=$=xe,E=c):$=$.next=xe,nt.lanes|=ge,_n|=ge}ae=ae.next}while(ae!==null&&ae!==m);$===null?E=c:$.next=B,fr(c,r.memoizedState)||(Bt=!0),r.memoizedState=c,r.baseState=E,r.baseQueue=$,i.lastRenderedState=c}if(e=i.interleaved,e!==null){p=e;do m=p.lane,nt.lanes|=m,_n|=m,p=p.next;while(p!==e)}else p===null&&(i.lanes=0);return[r.memoizedState,i.dispatch]}function ul(e){var r=nr(),i=r.queue;if(i===null)throw Error(n(311));i.lastRenderedReducer=e;var c=i.dispatch,p=i.pending,m=r.memoizedState;if(p!==null){i.pending=null;var E=p=p.next;do m=e(m,E.action),E=E.next;while(E!==p);fr(m,r.memoizedState)||(Bt=!0),r.memoizedState=m,r.baseQueue===null&&(r.baseState=m),i.lastRenderedState=m}return[m,c]}function cu(){}function du(e,r){var i=nt,c=nr(),p=r(),m=!fr(c.memoizedState,p);if(m&&(c.memoizedState=p,Bt=!0),c=c.queue,pl(fu.bind(null,i,c,e),[e]),c.getSnapshot!==r||m||gt!==null&&gt.memoizedState.tag&1){if(i.flags|=2048,Ya(9,pu.bind(null,i,c,p,r),void 0,null),xt===null)throw Error(n(349));(Nn&30)!==0||uu(i,r,p)}return p}function uu(e,r,i){e.flags|=16384,e={getSnapshot:r,value:i},r=nt.updateQueue,r===null?(r={lastEffect:null,stores:null},nt.updateQueue=r,r.stores=[e]):(i=r.stores,i===null?r.stores=[e]:i.push(e))}function pu(e,r,i,c){r.value=i,r.getSnapshot=c,hu(r)&&mu(e)}function fu(e,r,i){return i(function(){hu(r)&&mu(e)})}function hu(e){var r=e.getSnapshot;e=e.value;try{var i=r();return!fr(e,i)}catch{return!0}}function mu(e){var r=Or(e,1);r!==null&&vr(r,e,1,-1)}function gu(e){var r=Cr();return typeof e=="function"&&(e=e()),r.memoizedState=r.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ga,lastRenderedState:e},r.queue=e,e=e.dispatch=ng.bind(null,nt,e),[r.memoizedState,e]}function Ya(e,r,i,c){return e={tag:e,create:r,destroy:i,deps:c,next:null},r=nt.updateQueue,r===null?(r={lastEffect:null,stores:null},nt.updateQueue=r,r.lastEffect=e.next=e):(i=r.lastEffect,i===null?r.lastEffect=e.next=e:(c=i.next,i.next=e,e.next=c,r.lastEffect=e)),e}function xu(){return nr().memoizedState}function ai(e,r,i,c){var p=Cr();nt.flags|=e,p.memoizedState=Ya(1|r,i,void 0,c===void 0?null:c)}function si(e,r,i,c){var p=nr();c=c===void 0?null:c;var m=void 0;if(ft!==null){var E=ft.memoizedState;if(m=E.destroy,c!==null&&ol(c,E.deps)){p.memoizedState=Ya(r,i,m,c);return}}nt.flags|=e,p.memoizedState=Ya(1|r,i,m,c)}function vu(e,r){return ai(8390656,8,e,r)}function pl(e,r){return si(2048,8,e,r)}function bu(e,r){return si(4,2,e,r)}function yu(e,r){return si(4,4,e,r)}function wu(e,r){if(typeof r=="function")return e=e(),r(e),function(){r(null)};if(r!=null)return e=e(),r.current=e,function(){r.current=null}}function ju(e,r,i){return i=i!=null?i.concat([e]):null,si(4,4,wu.bind(null,r,e),i)}function fl(){}function ku(e,r){var i=nr();r=r===void 0?null:r;var c=i.memoizedState;return c!==null&&r!==null&&ol(r,c[1])?c[0]:(i.memoizedState=[e,r],e)}function Nu(e,r){var i=nr();r=r===void 0?null:r;var c=i.memoizedState;return c!==null&&r!==null&&ol(r,c[1])?c[0]:(e=e(),i.memoizedState=[e,r],e)}function _u(e,r,i){return(Nn&21)===0?(e.baseState&&(e.baseState=!1,Bt=!0),e.memoizedState=i):(fr(i,r)||(i=td(),nt.lanes|=i,_n|=i,e.baseState=!0),r)}function tg(e,r){var i=Ye;Ye=i!==0&&4>i?i:4,e(!0);var c=il.transition;il.transition={};try{e(!1),r()}finally{Ye=i,il.transition=c}}function Su(){return nr().memoizedState}function rg(e,r,i){var c=an(e);if(i={lane:c,action:i,hasEagerState:!1,eagerState:null,next:null},Cu(e))Eu(r,i);else if(i=au(e,r,i,c),i!==null){var p=Tt();vr(i,e,c,p),Pu(i,r,c)}}function ng(e,r,i){var c=an(e),p={lane:c,action:i,hasEagerState:!1,eagerState:null,next:null};if(Cu(e))Eu(r,p);else{var m=e.alternate;if(e.lanes===0&&(m===null||m.lanes===0)&&(m=r.lastRenderedReducer,m!==null))try{var E=r.lastRenderedState,B=m(E,i);if(p.hasEagerState=!0,p.eagerState=B,fr(B,E)){var $=r.interleaved;$===null?(p.next=p,el(r)):(p.next=$.next,$.next=p),r.interleaved=p;return}}catch{}finally{}i=au(e,r,p,c),i!==null&&(p=Tt(),vr(i,e,c,p),Pu(i,r,c))}}function Cu(e){var r=e.alternate;return e===nt||r!==null&&r===nt}function Eu(e,r){Va=ni=!0;var i=e.pending;i===null?r.next=r:(r.next=i.next,i.next=r),e.pending=r}function Pu(e,r,i){if((i&4194240)!==0){var c=r.lanes;c&=e.pendingLanes,i|=c,r.lanes=i,mo(e,i)}}var ii={readContext:rr,useCallback:_t,useContext:_t,useEffect:_t,useImperativeHandle:_t,useInsertionEffect:_t,useLayoutEffect:_t,useMemo:_t,useReducer:_t,useRef:_t,useState:_t,useDebugValue:_t,useDeferredValue:_t,useTransition:_t,useMutableSource:_t,useSyncExternalStore:_t,useId:_t,unstable_isNewReconciler:!1},ag={readContext:rr,useCallback:function(e,r){return Cr().memoizedState=[e,r===void 0?null:r],e},useContext:rr,useEffect:vu,useImperativeHandle:function(e,r,i){return i=i!=null?i.concat([e]):null,ai(4194308,4,wu.bind(null,r,e),i)},useLayoutEffect:function(e,r){return ai(4194308,4,e,r)},useInsertionEffect:function(e,r){return ai(4,2,e,r)},useMemo:function(e,r){var i=Cr();return r=r===void 0?null:r,e=e(),i.memoizedState=[e,r],e},useReducer:function(e,r,i){var c=Cr();return r=i!==void 0?i(r):r,c.memoizedState=c.baseState=r,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r},c.queue=e,e=e.dispatch=rg.bind(null,nt,e),[c.memoizedState,e]},useRef:function(e){var r=Cr();return e={current:e},r.memoizedState=e},useState:gu,useDebugValue:fl,useDeferredValue:function(e){return Cr().memoizedState=e},useTransition:function(){var e=gu(!1),r=e[0];return e=tg.bind(null,e[1]),Cr().memoizedState=e,[r,e]},useMutableSource:function(){},useSyncExternalStore:function(e,r,i){var c=nt,p=Cr();if(tt){if(i===void 0)throw Error(n(407));i=i()}else{if(i=r(),xt===null)throw Error(n(349));(Nn&30)!==0||uu(c,r,i)}p.memoizedState=i;var m={value:i,getSnapshot:r};return p.queue=m,vu(fu.bind(null,c,m,e),[e]),c.flags|=2048,Ya(9,pu.bind(null,c,m,i,r),void 0,null),i},useId:function(){var e=Cr(),r=xt.identifierPrefix;if(tt){var i=Lr,c=Ar;i=(c&~(1<<32-pr(c)-1)).toString(32)+i,r=":"+r+"R"+i,i=qa++,0<i&&(r+="H"+i.toString(32)),r+=":"}else i=eg++,r=":"+r+"r"+i.toString(32)+":";return e.memoizedState=r},unstable_isNewReconciler:!1},sg={readContext:rr,useCallback:ku,useContext:rr,useEffect:pl,useImperativeHandle:ju,useInsertionEffect:bu,useLayoutEffect:yu,useMemo:Nu,useReducer:dl,useRef:xu,useState:function(){return dl(Ga)},useDebugValue:fl,useDeferredValue:function(e){var r=nr();return _u(r,ft.memoizedState,e)},useTransition:function(){var e=dl(Ga)[0],r=nr().memoizedState;return[e,r]},useMutableSource:cu,useSyncExternalStore:du,useId:Su,unstable_isNewReconciler:!1},ig={readContext:rr,useCallback:ku,useContext:rr,useEffect:pl,useImperativeHandle:ju,useInsertionEffect:bu,useLayoutEffect:yu,useMemo:Nu,useReducer:ul,useRef:xu,useState:function(){return ul(Ga)},useDebugValue:fl,useDeferredValue:function(e){var r=nr();return ft===null?r.memoizedState=e:_u(r,ft.memoizedState,e)},useTransition:function(){var e=ul(Ga)[0],r=nr().memoizedState;return[e,r]},useMutableSource:cu,useSyncExternalStore:du,useId:Su,unstable_isNewReconciler:!1};function mr(e,r){if(e&&e.defaultProps){r=ne({},r),e=e.defaultProps;for(var i in e)r[i]===void 0&&(r[i]=e[i]);return r}return r}function hl(e,r,i,c){r=e.memoizedState,i=i(c,r),i=i==null?r:ne({},r,i),e.memoizedState=i,e.lanes===0&&(e.updateQueue.baseState=i)}var oi={isMounted:function(e){return(e=e._reactInternals)?xn(e)===e:!1},enqueueSetState:function(e,r,i){e=e._reactInternals;var c=Tt(),p=an(e),m=Ir(c,p);m.payload=r,i!=null&&(m.callback=i),r=en(e,m,p),r!==null&&(vr(r,e,p,c),Js(r,e,p))},enqueueReplaceState:function(e,r,i){e=e._reactInternals;var c=Tt(),p=an(e),m=Ir(c,p);m.tag=1,m.payload=r,i!=null&&(m.callback=i),r=en(e,m,p),r!==null&&(vr(r,e,p,c),Js(r,e,p))},enqueueForceUpdate:function(e,r){e=e._reactInternals;var i=Tt(),c=an(e),p=Ir(i,c);p.tag=2,r!=null&&(p.callback=r),r=en(e,p,c),r!==null&&(vr(r,e,c,i),Js(r,e,c))}};function zu(e,r,i,c,p,m,E){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(c,m,E):r.prototype&&r.prototype.isPureReactComponent?!La(i,c)||!La(p,m):!0}function Ru(e,r,i){var c=!1,p=Zr,m=r.contextType;return typeof m=="object"&&m!==null?m=rr(m):(p=Ft(r)?bn:Nt.current,c=r.contextTypes,m=(c=c!=null)?Yn(e,p):Zr),r=new r(i,m),e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=oi,e.stateNode=r,r._reactInternals=e,c&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=p,e.__reactInternalMemoizedMaskedChildContext=m),r}function Tu(e,r,i,c){e=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(i,c),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(i,c),r.state!==e&&oi.enqueueReplaceState(r,r.state,null)}function ml(e,r,i,c){var p=e.stateNode;p.props=i,p.state=e.memoizedState,p.refs={},tl(e);var m=r.contextType;typeof m=="object"&&m!==null?p.context=rr(m):(m=Ft(r)?bn:Nt.current,p.context=Yn(e,m)),p.state=e.memoizedState,m=r.getDerivedStateFromProps,typeof m=="function"&&(hl(e,r,m,i),p.state=e.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(r=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),r!==p.state&&oi.enqueueReplaceState(p,p.state,null),ei(e,i,p,c),p.state=e.memoizedState),typeof p.componentDidMount=="function"&&(e.flags|=4194308)}function ra(e,r){try{var i="",c=r;do i+=oe(c),c=c.return;while(c);var p=i}catch(m){p=`
Error generating stack: `+m.message+`
`+m.stack}return{value:e,source:r,stack:p,digest:null}}function gl(e,r,i){return{value:e,source:null,stack:i??null,digest:r??null}}function xl(e,r){try{console.error(r.value)}catch(i){setTimeout(function(){throw i})}}var og=typeof WeakMap=="function"?WeakMap:Map;function Au(e,r,i){i=Ir(-1,i),i.tag=3,i.payload={element:null};var c=r.value;return i.callback=function(){hi||(hi=!0,Tl=c),xl(e,r)},i}function Lu(e,r,i){i=Ir(-1,i),i.tag=3;var c=e.type.getDerivedStateFromError;if(typeof c=="function"){var p=r.value;i.payload=function(){return c(p)},i.callback=function(){xl(e,r)}}var m=e.stateNode;return m!==null&&typeof m.componentDidCatch=="function"&&(i.callback=function(){xl(e,r),typeof c!="function"&&(rn===null?rn=new Set([this]):rn.add(this));var E=r.stack;this.componentDidCatch(r.value,{componentStack:E!==null?E:""})}),i}function Ou(e,r,i){var c=e.pingCache;if(c===null){c=e.pingCache=new og;var p=new Set;c.set(r,p)}else p=c.get(r),p===void 0&&(p=new Set,c.set(r,p));p.has(i)||(p.add(i),e=wg.bind(null,e,r,i),r.then(e,e))}function Iu(e){do{var r;if((r=e.tag===13)&&(r=e.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return e;e=e.return}while(e!==null);return null}function Fu(e,r,i,c,p){return(e.mode&1)===0?(e===r?e.flags|=65536:(e.flags|=128,i.flags|=131072,i.flags&=-52805,i.tag===1&&(i.alternate===null?i.tag=17:(r=Ir(-1,1),r.tag=2,en(i,r,1))),i.lanes|=1),e):(e.flags|=65536,e.lanes=p,e)}var lg=C.ReactCurrentOwner,Bt=!1;function Rt(e,r,i,c){r.child=e===null?nu(r,null,i,c):Qn(r,e.child,i,c)}function Bu(e,r,i,c,p){i=i.render;var m=r.ref;return ea(r,p),c=ll(e,r,i,c,m,p),i=cl(),e!==null&&!Bt?(r.updateQueue=e.updateQueue,r.flags&=-2053,e.lanes&=~p,Fr(e,r,p)):(tt&&i&&Vo(r),r.flags|=1,Rt(e,r,c,p),r.child)}function Du(e,r,i,c,p){if(e===null){var m=i.type;return typeof m=="function"&&!Dl(m)&&m.defaultProps===void 0&&i.compare===null&&i.defaultProps===void 0?(r.tag=15,r.type=m,Mu(e,r,m,c,p)):(e=yi(i.type,null,c,r,r.mode,p),e.ref=r.ref,e.return=r,r.child=e)}if(m=e.child,(e.lanes&p)===0){var E=m.memoizedProps;if(i=i.compare,i=i!==null?i:La,i(E,c)&&e.ref===r.ref)return Fr(e,r,p)}return r.flags|=1,e=on(m,c),e.ref=r.ref,e.return=r,r.child=e}function Mu(e,r,i,c,p){if(e!==null){var m=e.memoizedProps;if(La(m,c)&&e.ref===r.ref)if(Bt=!1,r.pendingProps=c=m,(e.lanes&p)!==0)(e.flags&131072)!==0&&(Bt=!0);else return r.lanes=e.lanes,Fr(e,r,p)}return vl(e,r,i,c,p)}function Uu(e,r,i){var c=r.pendingProps,p=c.children,m=e!==null?e.memoizedState:null;if(c.mode==="hidden")if((r.mode&1)===0)r.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ze(aa,Xt),Xt|=i;else{if((i&1073741824)===0)return e=m!==null?m.baseLanes|i:i,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:e,cachePool:null,transitions:null},r.updateQueue=null,Ze(aa,Xt),Xt|=e,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=m!==null?m.baseLanes:i,Ze(aa,Xt),Xt|=c}else m!==null?(c=m.baseLanes|i,r.memoizedState=null):c=i,Ze(aa,Xt),Xt|=c;return Rt(e,r,p,i),r.child}function Wu(e,r){var i=r.ref;(e===null&&i!==null||e!==null&&e.ref!==i)&&(r.flags|=512,r.flags|=2097152)}function vl(e,r,i,c,p){var m=Ft(i)?bn:Nt.current;return m=Yn(r,m),ea(r,p),i=ll(e,r,i,c,m,p),c=cl(),e!==null&&!Bt?(r.updateQueue=e.updateQueue,r.flags&=-2053,e.lanes&=~p,Fr(e,r,p)):(tt&&c&&Vo(r),r.flags|=1,Rt(e,r,i,p),r.child)}function $u(e,r,i,c,p){if(Ft(i)){var m=!0;Vs(r)}else m=!1;if(ea(r,p),r.stateNode===null)ci(e,r),Ru(r,i,c),ml(r,i,c,p),c=!0;else if(e===null){var E=r.stateNode,B=r.memoizedProps;E.props=B;var $=E.context,ae=i.contextType;typeof ae=="object"&&ae!==null?ae=rr(ae):(ae=Ft(i)?bn:Nt.current,ae=Yn(r,ae));var ge=i.getDerivedStateFromProps,xe=typeof ge=="function"||typeof E.getSnapshotBeforeUpdate=="function";xe||typeof E.UNSAFE_componentWillReceiveProps!="function"&&typeof E.componentWillReceiveProps!="function"||(B!==c||$!==ae)&&Tu(r,E,c,ae),Jr=!1;var me=r.memoizedState;E.state=me,ei(r,c,E,p),$=r.memoizedState,B!==c||me!==$||It.current||Jr?(typeof ge=="function"&&(hl(r,i,ge,c),$=r.memoizedState),(B=Jr||zu(r,i,B,c,me,$,ae))?(xe||typeof E.UNSAFE_componentWillMount!="function"&&typeof E.componentWillMount!="function"||(typeof E.componentWillMount=="function"&&E.componentWillMount(),typeof E.UNSAFE_componentWillMount=="function"&&E.UNSAFE_componentWillMount()),typeof E.componentDidMount=="function"&&(r.flags|=4194308)):(typeof E.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=c,r.memoizedState=$),E.props=c,E.state=$,E.context=ae,c=B):(typeof E.componentDidMount=="function"&&(r.flags|=4194308),c=!1)}else{E=r.stateNode,su(e,r),B=r.memoizedProps,ae=r.type===r.elementType?B:mr(r.type,B),E.props=ae,xe=r.pendingProps,me=E.context,$=i.contextType,typeof $=="object"&&$!==null?$=rr($):($=Ft(i)?bn:Nt.current,$=Yn(r,$));var ke=i.getDerivedStateFromProps;(ge=typeof ke=="function"||typeof E.getSnapshotBeforeUpdate=="function")||typeof E.UNSAFE_componentWillReceiveProps!="function"&&typeof E.componentWillReceiveProps!="function"||(B!==xe||me!==$)&&Tu(r,E,c,$),Jr=!1,me=r.memoizedState,E.state=me,ei(r,c,E,p);var Ce=r.memoizedState;B!==xe||me!==Ce||It.current||Jr?(typeof ke=="function"&&(hl(r,i,ke,c),Ce=r.memoizedState),(ae=Jr||zu(r,i,ae,c,me,Ce,$)||!1)?(ge||typeof E.UNSAFE_componentWillUpdate!="function"&&typeof E.componentWillUpdate!="function"||(typeof E.componentWillUpdate=="function"&&E.componentWillUpdate(c,Ce,$),typeof E.UNSAFE_componentWillUpdate=="function"&&E.UNSAFE_componentWillUpdate(c,Ce,$)),typeof E.componentDidUpdate=="function"&&(r.flags|=4),typeof E.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof E.componentDidUpdate!="function"||B===e.memoizedProps&&me===e.memoizedState||(r.flags|=4),typeof E.getSnapshotBeforeUpdate!="function"||B===e.memoizedProps&&me===e.memoizedState||(r.flags|=1024),r.memoizedProps=c,r.memoizedState=Ce),E.props=c,E.state=Ce,E.context=$,c=ae):(typeof E.componentDidUpdate!="function"||B===e.memoizedProps&&me===e.memoizedState||(r.flags|=4),typeof E.getSnapshotBeforeUpdate!="function"||B===e.memoizedProps&&me===e.memoizedState||(r.flags|=1024),c=!1)}return bl(e,r,i,c,m,p)}function bl(e,r,i,c,p,m){Wu(e,r);var E=(r.flags&128)!==0;if(!c&&!E)return p&&Yd(r,i,!1),Fr(e,r,m);c=r.stateNode,lg.current=r;var B=E&&typeof i.getDerivedStateFromError!="function"?null:c.render();return r.flags|=1,e!==null&&E?(r.child=Qn(r,e.child,null,m),r.child=Qn(r,null,B,m)):Rt(e,r,B,m),r.memoizedState=c.state,p&&Yd(r,i,!0),r.child}function Hu(e){var r=e.stateNode;r.pendingContext?qd(e,r.pendingContext,r.pendingContext!==r.context):r.context&&qd(e,r.context,!1),rl(e,r.containerInfo)}function Vu(e,r,i,c,p){return Zn(),Xo(p),r.flags|=256,Rt(e,r,i,c),r.child}var yl={dehydrated:null,treeContext:null,retryLane:0};function wl(e){return{baseLanes:e,cachePool:null,transitions:null}}function qu(e,r,i){var c=r.pendingProps,p=rt.current,m=!1,E=(r.flags&128)!==0,B;if((B=E)||(B=e!==null&&e.memoizedState===null?!1:(p&2)!==0),B?(m=!0,r.flags&=-129):(e===null||e.memoizedState!==null)&&(p|=1),Ze(rt,p&1),e===null)return Yo(r),e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((r.mode&1)===0?r.lanes=1:e.data==="$!"?r.lanes=8:r.lanes=1073741824,null):(E=c.children,e=c.fallback,m?(c=r.mode,m=r.child,E={mode:"hidden",children:E},(c&1)===0&&m!==null?(m.childLanes=0,m.pendingProps=E):m=wi(E,c,0,null),e=Pn(e,c,i,null),m.return=r,e.return=r,m.sibling=e,r.child=m,r.child.memoizedState=wl(i),r.memoizedState=yl,e):jl(r,E));if(p=e.memoizedState,p!==null&&(B=p.dehydrated,B!==null))return cg(e,r,E,c,B,p,i);if(m){m=c.fallback,E=r.mode,p=e.child,B=p.sibling;var $={mode:"hidden",children:c.children};return(E&1)===0&&r.child!==p?(c=r.child,c.childLanes=0,c.pendingProps=$,r.deletions=null):(c=on(p,$),c.subtreeFlags=p.subtreeFlags&14680064),B!==null?m=on(B,m):(m=Pn(m,E,i,null),m.flags|=2),m.return=r,c.return=r,c.sibling=m,r.child=c,c=m,m=r.child,E=e.child.memoizedState,E=E===null?wl(i):{baseLanes:E.baseLanes|i,cachePool:null,transitions:E.transitions},m.memoizedState=E,m.childLanes=e.childLanes&~i,r.memoizedState=yl,c}return m=e.child,e=m.sibling,c=on(m,{mode:"visible",children:c.children}),(r.mode&1)===0&&(c.lanes=i),c.return=r,c.sibling=null,e!==null&&(i=r.deletions,i===null?(r.deletions=[e],r.flags|=16):i.push(e)),r.child=c,r.memoizedState=null,c}function jl(e,r){return r=wi({mode:"visible",children:r},e.mode,0,null),r.return=e,e.child=r}function li(e,r,i,c){return c!==null&&Xo(c),Qn(r,e.child,null,i),e=jl(r,r.pendingProps.children),e.flags|=2,r.memoizedState=null,e}function cg(e,r,i,c,p,m,E){if(i)return r.flags&256?(r.flags&=-257,c=gl(Error(n(422))),li(e,r,E,c)):r.memoizedState!==null?(r.child=e.child,r.flags|=128,null):(m=c.fallback,p=r.mode,c=wi({mode:"visible",children:c.children},p,0,null),m=Pn(m,p,E,null),m.flags|=2,c.return=r,m.return=r,c.sibling=m,r.child=c,(r.mode&1)!==0&&Qn(r,e.child,null,E),r.child.memoizedState=wl(E),r.memoizedState=yl,m);if((r.mode&1)===0)return li(e,r,E,null);if(p.data==="$!"){if(c=p.nextSibling&&p.nextSibling.dataset,c)var B=c.dgst;return c=B,m=Error(n(419)),c=gl(m,c,void 0),li(e,r,E,c)}if(B=(E&e.childLanes)!==0,Bt||B){if(c=xt,c!==null){switch(E&-E){case 4:p=2;break;case 16:p=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:p=32;break;case 536870912:p=268435456;break;default:p=0}p=(p&(c.suspendedLanes|E))!==0?0:p,p!==0&&p!==m.retryLane&&(m.retryLane=p,Or(e,p),vr(c,e,p,-1))}return Bl(),c=gl(Error(n(421))),li(e,r,E,c)}return p.data==="$?"?(r.flags|=128,r.child=e.child,r=jg.bind(null,e),p._reactRetry=r,null):(e=m.treeContext,Yt=Xr(p.nextSibling),Gt=r,tt=!0,hr=null,e!==null&&(er[tr++]=Ar,er[tr++]=Lr,er[tr++]=yn,Ar=e.id,Lr=e.overflow,yn=r),r=jl(r,c.children),r.flags|=4096,r)}function Gu(e,r,i){e.lanes|=r;var c=e.alternate;c!==null&&(c.lanes|=r),Jo(e.return,r,i)}function kl(e,r,i,c,p){var m=e.memoizedState;m===null?e.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:c,tail:i,tailMode:p}:(m.isBackwards=r,m.rendering=null,m.renderingStartTime=0,m.last=c,m.tail=i,m.tailMode=p)}function Yu(e,r,i){var c=r.pendingProps,p=c.revealOrder,m=c.tail;if(Rt(e,r,c.children,i),c=rt.current,(c&2)!==0)c=c&1|2,r.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=r.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Gu(e,i,r);else if(e.tag===19)Gu(e,i,r);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===r)break e;for(;e.sibling===null;){if(e.return===null||e.return===r)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}c&=1}if(Ze(rt,c),(r.mode&1)===0)r.memoizedState=null;else switch(p){case"forwards":for(i=r.child,p=null;i!==null;)e=i.alternate,e!==null&&ti(e)===null&&(p=i),i=i.sibling;i=p,i===null?(p=r.child,r.child=null):(p=i.sibling,i.sibling=null),kl(r,!1,p,i,m);break;case"backwards":for(i=null,p=r.child,r.child=null;p!==null;){if(e=p.alternate,e!==null&&ti(e)===null){r.child=p;break}e=p.sibling,p.sibling=i,i=p,p=e}kl(r,!0,i,null,m);break;case"together":kl(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function ci(e,r){(r.mode&1)===0&&e!==null&&(e.alternate=null,r.alternate=null,r.flags|=2)}function Fr(e,r,i){if(e!==null&&(r.dependencies=e.dependencies),_n|=r.lanes,(i&r.childLanes)===0)return null;if(e!==null&&r.child!==e.child)throw Error(n(153));if(r.child!==null){for(e=r.child,i=on(e,e.pendingProps),r.child=i,i.return=r;e.sibling!==null;)e=e.sibling,i=i.sibling=on(e,e.pendingProps),i.return=r;i.sibling=null}return r.child}function dg(e,r,i){switch(r.tag){case 3:Hu(r),Zn();break;case 5:lu(r);break;case 1:Ft(r.type)&&Vs(r);break;case 4:rl(r,r.stateNode.containerInfo);break;case 10:var c=r.type._context,p=r.memoizedProps.value;Ze(Zs,c._currentValue),c._currentValue=p;break;case 13:if(c=r.memoizedState,c!==null)return c.dehydrated!==null?(Ze(rt,rt.current&1),r.flags|=128,null):(i&r.child.childLanes)!==0?qu(e,r,i):(Ze(rt,rt.current&1),e=Fr(e,r,i),e!==null?e.sibling:null);Ze(rt,rt.current&1);break;case 19:if(c=(i&r.childLanes)!==0,(e.flags&128)!==0){if(c)return Yu(e,r,i);r.flags|=128}if(p=r.memoizedState,p!==null&&(p.rendering=null,p.tail=null,p.lastEffect=null),Ze(rt,rt.current),c)break;return null;case 22:case 23:return r.lanes=0,Uu(e,r,i)}return Fr(e,r,i)}var Xu,Nl,Ku,Zu;Xu=function(e,r){for(var i=r.child;i!==null;){if(i.tag===5||i.tag===6)e.appendChild(i.stateNode);else if(i.tag!==4&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===r)break;for(;i.sibling===null;){if(i.return===null||i.return===r)return;i=i.return}i.sibling.return=i.return,i=i.sibling}},Nl=function(){},Ku=function(e,r,i,c){var p=e.memoizedProps;if(p!==c){e=r.stateNode,kn(Sr.current);var m=null;switch(i){case"input":p=y(e,p),c=y(e,c),m=[];break;case"select":p=ne({},p,{value:void 0}),c=ne({},c,{value:void 0}),m=[];break;case"textarea":p=Z(e,p),c=Z(e,c),m=[];break;default:typeof p.onClick!="function"&&typeof c.onClick=="function"&&(e.onclick=Ws)}Vt(i,c);var E;i=null;for(ae in p)if(!c.hasOwnProperty(ae)&&p.hasOwnProperty(ae)&&p[ae]!=null)if(ae==="style"){var B=p[ae];for(E in B)B.hasOwnProperty(E)&&(i||(i={}),i[E]="")}else ae!=="dangerouslySetInnerHTML"&&ae!=="children"&&ae!=="suppressContentEditableWarning"&&ae!=="suppressHydrationWarning"&&ae!=="autoFocus"&&(l.hasOwnProperty(ae)?m||(m=[]):(m=m||[]).push(ae,null));for(ae in c){var $=c[ae];if(B=p!=null?p[ae]:void 0,c.hasOwnProperty(ae)&&$!==B&&($!=null||B!=null))if(ae==="style")if(B){for(E in B)!B.hasOwnProperty(E)||$&&$.hasOwnProperty(E)||(i||(i={}),i[E]="");for(E in $)$.hasOwnProperty(E)&&B[E]!==$[E]&&(i||(i={}),i[E]=$[E])}else i||(m||(m=[]),m.push(ae,i)),i=$;else ae==="dangerouslySetInnerHTML"?($=$?$.__html:void 0,B=B?B.__html:void 0,$!=null&&B!==$&&(m=m||[]).push(ae,$)):ae==="children"?typeof $!="string"&&typeof $!="number"||(m=m||[]).push(ae,""+$):ae!=="suppressContentEditableWarning"&&ae!=="suppressHydrationWarning"&&(l.hasOwnProperty(ae)?($!=null&&ae==="onScroll"&&Qe("scroll",e),m||B===$||(m=[])):(m=m||[]).push(ae,$))}i&&(m=m||[]).push("style",i);var ae=m;(r.updateQueue=ae)&&(r.flags|=4)}},Zu=function(e,r,i,c){i!==c&&(r.flags|=4)};function Xa(e,r){if(!tt)switch(e.tailMode){case"hidden":r=e.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?e.tail=null:i.sibling=null;break;case"collapsed":i=e.tail;for(var c=null;i!==null;)i.alternate!==null&&(c=i),i=i.sibling;c===null?r||e.tail===null?e.tail=null:e.tail.sibling=null:c.sibling=null}}function St(e){var r=e.alternate!==null&&e.alternate.child===e.child,i=0,c=0;if(r)for(var p=e.child;p!==null;)i|=p.lanes|p.childLanes,c|=p.subtreeFlags&14680064,c|=p.flags&14680064,p.return=e,p=p.sibling;else for(p=e.child;p!==null;)i|=p.lanes|p.childLanes,c|=p.subtreeFlags,c|=p.flags,p.return=e,p=p.sibling;return e.subtreeFlags|=c,e.childLanes=i,r}function ug(e,r,i){var c=r.pendingProps;switch(qo(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return St(r),null;case 1:return Ft(r.type)&&Hs(),St(r),null;case 3:return c=r.stateNode,ta(),Je(It),Je(Nt),sl(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(e===null||e.child===null)&&(Xs(r)?r.flags|=4:e===null||e.memoizedState.isDehydrated&&(r.flags&256)===0||(r.flags|=1024,hr!==null&&(Ol(hr),hr=null))),Nl(e,r),St(r),null;case 5:nl(r);var p=kn(Ha.current);if(i=r.type,e!==null&&r.stateNode!=null)Ku(e,r,i,c,p),e.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!c){if(r.stateNode===null)throw Error(n(166));return St(r),null}if(e=kn(Sr.current),Xs(r)){c=r.stateNode,i=r.type;var m=r.memoizedProps;switch(c[_r]=r,c[Da]=m,e=(r.mode&1)!==0,i){case"dialog":Qe("cancel",c),Qe("close",c);break;case"iframe":case"object":case"embed":Qe("load",c);break;case"video":case"audio":for(p=0;p<Ia.length;p++)Qe(Ia[p],c);break;case"source":Qe("error",c);break;case"img":case"image":case"link":Qe("error",c),Qe("load",c);break;case"details":Qe("toggle",c);break;case"input":fe(c,m),Qe("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!m.multiple},Qe("invalid",c);break;case"textarea":he(c,m),Qe("invalid",c)}Vt(i,m),p=null;for(var E in m)if(m.hasOwnProperty(E)){var B=m[E];E==="children"?typeof B=="string"?c.textContent!==B&&(m.suppressHydrationWarning!==!0&&Us(c.textContent,B,e),p=["children",B]):typeof B=="number"&&c.textContent!==""+B&&(m.suppressHydrationWarning!==!0&&Us(c.textContent,B,e),p=["children",""+B]):l.hasOwnProperty(E)&&B!=null&&E==="onScroll"&&Qe("scroll",c)}switch(i){case"input":Xe(c),O(c,m,!0);break;case"textarea":Xe(c),be(c);break;case"select":case"option":break;default:typeof m.onClick=="function"&&(c.onclick=Ws)}c=p,r.updateQueue=c,c!==null&&(r.flags|=4)}else{E=p.nodeType===9?p:p.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Pe(i)),e==="http://www.w3.org/1999/xhtml"?i==="script"?(e=E.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof c.is=="string"?e=E.createElement(i,{is:c.is}):(e=E.createElement(i),i==="select"&&(E=e,c.multiple?E.multiple=!0:c.size&&(E.size=c.size))):e=E.createElementNS(e,i),e[_r]=r,e[Da]=c,Xu(e,r,!1,!1),r.stateNode=e;e:{switch(E=Bn(i,c),i){case"dialog":Qe("cancel",e),Qe("close",e),p=c;break;case"iframe":case"object":case"embed":Qe("load",e),p=c;break;case"video":case"audio":for(p=0;p<Ia.length;p++)Qe(Ia[p],e);p=c;break;case"source":Qe("error",e),p=c;break;case"img":case"image":case"link":Qe("error",e),Qe("load",e),p=c;break;case"details":Qe("toggle",e),p=c;break;case"input":fe(e,c),p=y(e,c),Qe("invalid",e);break;case"option":p=c;break;case"select":e._wrapperState={wasMultiple:!!c.multiple},p=ne({},c,{value:void 0}),Qe("invalid",e);break;case"textarea":he(e,c),p=Z(e,c),Qe("invalid",e);break;default:p=c}Vt(i,p),B=p;for(m in B)if(B.hasOwnProperty(m)){var $=B[m];m==="style"?mn(e,$):m==="dangerouslySetInnerHTML"?($=$?$.__html:void 0,$!=null&&zt(e,$)):m==="children"?typeof $=="string"?(i!=="textarea"||$!=="")&&ur(e,$):typeof $=="number"&&ur(e,""+$):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(l.hasOwnProperty(m)?$!=null&&m==="onScroll"&&Qe("scroll",e):$!=null&&T(e,m,$,E))}switch(i){case"input":Xe(e),O(e,c,!1);break;case"textarea":Xe(e),be(e);break;case"option":c.value!=null&&e.setAttribute("value",""+Ne(c.value));break;case"select":e.multiple=!!c.multiple,m=c.value,m!=null?ue(e,!!c.multiple,m,!1):c.defaultValue!=null&&ue(e,!!c.multiple,c.defaultValue,!0);break;default:typeof p.onClick=="function"&&(e.onclick=Ws)}switch(i){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return St(r),null;case 6:if(e&&r.stateNode!=null)Zu(e,r,e.memoizedProps,c);else{if(typeof c!="string"&&r.stateNode===null)throw Error(n(166));if(i=kn(Ha.current),kn(Sr.current),Xs(r)){if(c=r.stateNode,i=r.memoizedProps,c[_r]=r,(m=c.nodeValue!==i)&&(e=Gt,e!==null))switch(e.tag){case 3:Us(c.nodeValue,i,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Us(c.nodeValue,i,(e.mode&1)!==0)}m&&(r.flags|=4)}else c=(i.nodeType===9?i:i.ownerDocument).createTextNode(c),c[_r]=r,r.stateNode=c}return St(r),null;case 13:if(Je(rt),c=r.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(tt&&Yt!==null&&(r.mode&1)!==0&&(r.flags&128)===0)eu(),Zn(),r.flags|=98560,m=!1;else if(m=Xs(r),c!==null&&c.dehydrated!==null){if(e===null){if(!m)throw Error(n(318));if(m=r.memoizedState,m=m!==null?m.dehydrated:null,!m)throw Error(n(317));m[_r]=r}else Zn(),(r.flags&128)===0&&(r.memoizedState=null),r.flags|=4;St(r),m=!1}else hr!==null&&(Ol(hr),hr=null),m=!0;if(!m)return r.flags&65536?r:null}return(r.flags&128)!==0?(r.lanes=i,r):(c=c!==null,c!==(e!==null&&e.memoizedState!==null)&&c&&(r.child.flags|=8192,(r.mode&1)!==0&&(e===null||(rt.current&1)!==0?ht===0&&(ht=3):Bl())),r.updateQueue!==null&&(r.flags|=4),St(r),null);case 4:return ta(),Nl(e,r),e===null&&Fa(r.stateNode.containerInfo),St(r),null;case 10:return Qo(r.type._context),St(r),null;case 17:return Ft(r.type)&&Hs(),St(r),null;case 19:if(Je(rt),m=r.memoizedState,m===null)return St(r),null;if(c=(r.flags&128)!==0,E=m.rendering,E===null)if(c)Xa(m,!1);else{if(ht!==0||e!==null&&(e.flags&128)!==0)for(e=r.child;e!==null;){if(E=ti(e),E!==null){for(r.flags|=128,Xa(m,!1),c=E.updateQueue,c!==null&&(r.updateQueue=c,r.flags|=4),r.subtreeFlags=0,c=i,i=r.child;i!==null;)m=i,e=c,m.flags&=14680066,E=m.alternate,E===null?(m.childLanes=0,m.lanes=e,m.child=null,m.subtreeFlags=0,m.memoizedProps=null,m.memoizedState=null,m.updateQueue=null,m.dependencies=null,m.stateNode=null):(m.childLanes=E.childLanes,m.lanes=E.lanes,m.child=E.child,m.subtreeFlags=0,m.deletions=null,m.memoizedProps=E.memoizedProps,m.memoizedState=E.memoizedState,m.updateQueue=E.updateQueue,m.type=E.type,e=E.dependencies,m.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),i=i.sibling;return Ze(rt,rt.current&1|2),r.child}e=e.sibling}m.tail!==null&&lt()>sa&&(r.flags|=128,c=!0,Xa(m,!1),r.lanes=4194304)}else{if(!c)if(e=ti(E),e!==null){if(r.flags|=128,c=!0,i=e.updateQueue,i!==null&&(r.updateQueue=i,r.flags|=4),Xa(m,!0),m.tail===null&&m.tailMode==="hidden"&&!E.alternate&&!tt)return St(r),null}else 2*lt()-m.renderingStartTime>sa&&i!==1073741824&&(r.flags|=128,c=!0,Xa(m,!1),r.lanes=4194304);m.isBackwards?(E.sibling=r.child,r.child=E):(i=m.last,i!==null?i.sibling=E:r.child=E,m.last=E)}return m.tail!==null?(r=m.tail,m.rendering=r,m.tail=r.sibling,m.renderingStartTime=lt(),r.sibling=null,i=rt.current,Ze(rt,c?i&1|2:i&1),r):(St(r),null);case 22:case 23:return Fl(),c=r.memoizedState!==null,e!==null&&e.memoizedState!==null!==c&&(r.flags|=8192),c&&(r.mode&1)!==0?(Xt&1073741824)!==0&&(St(r),r.subtreeFlags&6&&(r.flags|=8192)):St(r),null;case 24:return null;case 25:return null}throw Error(n(156,r.tag))}function pg(e,r){switch(qo(r),r.tag){case 1:return Ft(r.type)&&Hs(),e=r.flags,e&65536?(r.flags=e&-65537|128,r):null;case 3:return ta(),Je(It),Je(Nt),sl(),e=r.flags,(e&65536)!==0&&(e&128)===0?(r.flags=e&-65537|128,r):null;case 5:return nl(r),null;case 13:if(Je(rt),e=r.memoizedState,e!==null&&e.dehydrated!==null){if(r.alternate===null)throw Error(n(340));Zn()}return e=r.flags,e&65536?(r.flags=e&-65537|128,r):null;case 19:return Je(rt),null;case 4:return ta(),null;case 10:return Qo(r.type._context),null;case 22:case 23:return Fl(),null;case 24:return null;default:return null}}var di=!1,Ct=!1,fg=typeof WeakSet=="function"?WeakSet:Set,Se=null;function na(e,r){var i=e.ref;if(i!==null)if(typeof i=="function")try{i(null)}catch(c){it(e,r,c)}else i.current=null}function _l(e,r,i){try{i()}catch(c){it(e,r,c)}}var Qu=!1;function hg(e,r){if(Fo=zs,e=zd(),Po(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else e:{i=(i=e.ownerDocument)&&i.defaultView||window;var c=i.getSelection&&i.getSelection();if(c&&c.rangeCount!==0){i=c.anchorNode;var p=c.anchorOffset,m=c.focusNode;c=c.focusOffset;try{i.nodeType,m.nodeType}catch{i=null;break e}var E=0,B=-1,$=-1,ae=0,ge=0,xe=e,me=null;t:for(;;){for(var ke;xe!==i||p!==0&&xe.nodeType!==3||(B=E+p),xe!==m||c!==0&&xe.nodeType!==3||($=E+c),xe.nodeType===3&&(E+=xe.nodeValue.length),(ke=xe.firstChild)!==null;)me=xe,xe=ke;for(;;){if(xe===e)break t;if(me===i&&++ae===p&&(B=E),me===m&&++ge===c&&($=E),(ke=xe.nextSibling)!==null)break;xe=me,me=xe.parentNode}xe=ke}i=B===-1||$===-1?null:{start:B,end:$}}else i=null}i=i||{start:0,end:0}}else i=null;for(Bo={focusedElem:e,selectionRange:i},zs=!1,Se=r;Se!==null;)if(r=Se,e=r.child,(r.subtreeFlags&1028)!==0&&e!==null)e.return=r,Se=e;else for(;Se!==null;){r=Se;try{var Ce=r.alternate;if((r.flags&1024)!==0)switch(r.tag){case 0:case 11:case 15:break;case 1:if(Ce!==null){var Ee=Ce.memoizedProps,ct=Ce.memoizedState,Q=r.stateNode,q=Q.getSnapshotBeforeUpdate(r.elementType===r.type?Ee:mr(r.type,Ee),ct);Q.__reactInternalSnapshotBeforeUpdate=q}break;case 3:var ee=r.stateNode.containerInfo;ee.nodeType===1?ee.textContent="":ee.nodeType===9&&ee.documentElement&&ee.removeChild(ee.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(we){it(r,r.return,we)}if(e=r.sibling,e!==null){e.return=r.return,Se=e;break}Se=r.return}return Ce=Qu,Qu=!1,Ce}function Ka(e,r,i){var c=r.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var p=c=c.next;do{if((p.tag&e)===e){var m=p.destroy;p.destroy=void 0,m!==void 0&&_l(r,i,m)}p=p.next}while(p!==c)}}function ui(e,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var c=i.create;i.destroy=c()}i=i.next}while(i!==r)}}function Sl(e){var r=e.ref;if(r!==null){var i=e.stateNode;switch(e.tag){case 5:e=i;break;default:e=i}typeof r=="function"?r(e):r.current=e}}function Ju(e){var r=e.alternate;r!==null&&(e.alternate=null,Ju(r)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(r=e.stateNode,r!==null&&(delete r[_r],delete r[Da],delete r[Wo],delete r[Km],delete r[Zm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function ep(e){return e.tag===5||e.tag===3||e.tag===4}function tp(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||ep(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Cl(e,r,i){var c=e.tag;if(c===5||c===6)e=e.stateNode,r?i.nodeType===8?i.parentNode.insertBefore(e,r):i.insertBefore(e,r):(i.nodeType===8?(r=i.parentNode,r.insertBefore(e,i)):(r=i,r.appendChild(e)),i=i._reactRootContainer,i!=null||r.onclick!==null||(r.onclick=Ws));else if(c!==4&&(e=e.child,e!==null))for(Cl(e,r,i),e=e.sibling;e!==null;)Cl(e,r,i),e=e.sibling}function El(e,r,i){var c=e.tag;if(c===5||c===6)e=e.stateNode,r?i.insertBefore(e,r):i.appendChild(e);else if(c!==4&&(e=e.child,e!==null))for(El(e,r,i),e=e.sibling;e!==null;)El(e,r,i),e=e.sibling}var yt=null,gr=!1;function tn(e,r,i){for(i=i.child;i!==null;)rp(e,r,i),i=i.sibling}function rp(e,r,i){if(Nr&&typeof Nr.onCommitFiberUnmount=="function")try{Nr.onCommitFiberUnmount(Ns,i)}catch{}switch(i.tag){case 5:Ct||na(i,r);case 6:var c=yt,p=gr;yt=null,tn(e,r,i),yt=c,gr=p,yt!==null&&(gr?(e=yt,i=i.stateNode,e.nodeType===8?e.parentNode.removeChild(i):e.removeChild(i)):yt.removeChild(i.stateNode));break;case 18:yt!==null&&(gr?(e=yt,i=i.stateNode,e.nodeType===8?Uo(e.parentNode,i):e.nodeType===1&&Uo(e,i),Ea(e)):Uo(yt,i.stateNode));break;case 4:c=yt,p=gr,yt=i.stateNode.containerInfo,gr=!0,tn(e,r,i),yt=c,gr=p;break;case 0:case 11:case 14:case 15:if(!Ct&&(c=i.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){p=c=c.next;do{var m=p,E=m.destroy;m=m.tag,E!==void 0&&((m&2)!==0||(m&4)!==0)&&_l(i,r,E),p=p.next}while(p!==c)}tn(e,r,i);break;case 1:if(!Ct&&(na(i,r),c=i.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=i.memoizedProps,c.state=i.memoizedState,c.componentWillUnmount()}catch(B){it(i,r,B)}tn(e,r,i);break;case 21:tn(e,r,i);break;case 22:i.mode&1?(Ct=(c=Ct)||i.memoizedState!==null,tn(e,r,i),Ct=c):tn(e,r,i);break;default:tn(e,r,i)}}function np(e){var r=e.updateQueue;if(r!==null){e.updateQueue=null;var i=e.stateNode;i===null&&(i=e.stateNode=new fg),r.forEach(function(c){var p=kg.bind(null,e,c);i.has(c)||(i.add(c),c.then(p,p))})}}function xr(e,r){var i=r.deletions;if(i!==null)for(var c=0;c<i.length;c++){var p=i[c];try{var m=e,E=r,B=E;e:for(;B!==null;){switch(B.tag){case 5:yt=B.stateNode,gr=!1;break e;case 3:yt=B.stateNode.containerInfo,gr=!0;break e;case 4:yt=B.stateNode.containerInfo,gr=!0;break e}B=B.return}if(yt===null)throw Error(n(160));rp(m,E,p),yt=null,gr=!1;var $=p.alternate;$!==null&&($.return=null),p.return=null}catch(ae){it(p,r,ae)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)ap(r,e),r=r.sibling}function ap(e,r){var i=e.alternate,c=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(xr(r,e),Er(e),c&4){try{Ka(3,e,e.return),ui(3,e)}catch(Ee){it(e,e.return,Ee)}try{Ka(5,e,e.return)}catch(Ee){it(e,e.return,Ee)}}break;case 1:xr(r,e),Er(e),c&512&&i!==null&&na(i,i.return);break;case 5:if(xr(r,e),Er(e),c&512&&i!==null&&na(i,i.return),e.flags&32){var p=e.stateNode;try{ur(p,"")}catch(Ee){it(e,e.return,Ee)}}if(c&4&&(p=e.stateNode,p!=null)){var m=e.memoizedProps,E=i!==null?i.memoizedProps:m,B=e.type,$=e.updateQueue;if(e.updateQueue=null,$!==null)try{B==="input"&&m.type==="radio"&&m.name!=null&&ce(p,m),Bn(B,E);var ae=Bn(B,m);for(E=0;E<$.length;E+=2){var ge=$[E],xe=$[E+1];ge==="style"?mn(p,xe):ge==="dangerouslySetInnerHTML"?zt(p,xe):ge==="children"?ur(p,xe):T(p,ge,xe,ae)}switch(B){case"input":I(p,m);break;case"textarea":je(p,m);break;case"select":var me=p._wrapperState.wasMultiple;p._wrapperState.wasMultiple=!!m.multiple;var ke=m.value;ke!=null?ue(p,!!m.multiple,ke,!1):me!==!!m.multiple&&(m.defaultValue!=null?ue(p,!!m.multiple,m.defaultValue,!0):ue(p,!!m.multiple,m.multiple?[]:"",!1))}p[Da]=m}catch(Ee){it(e,e.return,Ee)}}break;case 6:if(xr(r,e),Er(e),c&4){if(e.stateNode===null)throw Error(n(162));p=e.stateNode,m=e.memoizedProps;try{p.nodeValue=m}catch(Ee){it(e,e.return,Ee)}}break;case 3:if(xr(r,e),Er(e),c&4&&i!==null&&i.memoizedState.isDehydrated)try{Ea(r.containerInfo)}catch(Ee){it(e,e.return,Ee)}break;case 4:xr(r,e),Er(e);break;case 13:xr(r,e),Er(e),p=e.child,p.flags&8192&&(m=p.memoizedState!==null,p.stateNode.isHidden=m,!m||p.alternate!==null&&p.alternate.memoizedState!==null||(Rl=lt())),c&4&&np(e);break;case 22:if(ge=i!==null&&i.memoizedState!==null,e.mode&1?(Ct=(ae=Ct)||ge,xr(r,e),Ct=ae):xr(r,e),Er(e),c&8192){if(ae=e.memoizedState!==null,(e.stateNode.isHidden=ae)&&!ge&&(e.mode&1)!==0)for(Se=e,ge=e.child;ge!==null;){for(xe=Se=ge;Se!==null;){switch(me=Se,ke=me.child,me.tag){case 0:case 11:case 14:case 15:Ka(4,me,me.return);break;case 1:na(me,me.return);var Ce=me.stateNode;if(typeof Ce.componentWillUnmount=="function"){c=me,i=me.return;try{r=c,Ce.props=r.memoizedProps,Ce.state=r.memoizedState,Ce.componentWillUnmount()}catch(Ee){it(c,i,Ee)}}break;case 5:na(me,me.return);break;case 22:if(me.memoizedState!==null){op(xe);continue}}ke!==null?(ke.return=me,Se=ke):op(xe)}ge=ge.sibling}e:for(ge=null,xe=e;;){if(xe.tag===5){if(ge===null){ge=xe;try{p=xe.stateNode,ae?(m=p.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none"):(B=xe.stateNode,$=xe.memoizedProps.style,E=$!=null&&$.hasOwnProperty("display")?$.display:null,B.style.display=et("display",E))}catch(Ee){it(e,e.return,Ee)}}}else if(xe.tag===6){if(ge===null)try{xe.stateNode.nodeValue=ae?"":xe.memoizedProps}catch(Ee){it(e,e.return,Ee)}}else if((xe.tag!==22&&xe.tag!==23||xe.memoizedState===null||xe===e)&&xe.child!==null){xe.child.return=xe,xe=xe.child;continue}if(xe===e)break e;for(;xe.sibling===null;){if(xe.return===null||xe.return===e)break e;ge===xe&&(ge=null),xe=xe.return}ge===xe&&(ge=null),xe.sibling.return=xe.return,xe=xe.sibling}}break;case 19:xr(r,e),Er(e),c&4&&np(e);break;case 21:break;default:xr(r,e),Er(e)}}function Er(e){var r=e.flags;if(r&2){try{e:{for(var i=e.return;i!==null;){if(ep(i)){var c=i;break e}i=i.return}throw Error(n(160))}switch(c.tag){case 5:var p=c.stateNode;c.flags&32&&(ur(p,""),c.flags&=-33);var m=tp(e);El(e,m,p);break;case 3:case 4:var E=c.stateNode.containerInfo,B=tp(e);Cl(e,B,E);break;default:throw Error(n(161))}}catch($){it(e,e.return,$)}e.flags&=-3}r&4096&&(e.flags&=-4097)}function mg(e,r,i){Se=e,sp(e)}function sp(e,r,i){for(var c=(e.mode&1)!==0;Se!==null;){var p=Se,m=p.child;if(p.tag===22&&c){var E=p.memoizedState!==null||di;if(!E){var B=p.alternate,$=B!==null&&B.memoizedState!==null||Ct;B=di;var ae=Ct;if(di=E,(Ct=$)&&!ae)for(Se=p;Se!==null;)E=Se,$=E.child,E.tag===22&&E.memoizedState!==null?lp(p):$!==null?($.return=E,Se=$):lp(p);for(;m!==null;)Se=m,sp(m),m=m.sibling;Se=p,di=B,Ct=ae}ip(e)}else(p.subtreeFlags&8772)!==0&&m!==null?(m.return=p,Se=m):ip(e)}}function ip(e){for(;Se!==null;){var r=Se;if((r.flags&8772)!==0){var i=r.alternate;try{if((r.flags&8772)!==0)switch(r.tag){case 0:case 11:case 15:Ct||ui(5,r);break;case 1:var c=r.stateNode;if(r.flags&4&&!Ct)if(i===null)c.componentDidMount();else{var p=r.elementType===r.type?i.memoizedProps:mr(r.type,i.memoizedProps);c.componentDidUpdate(p,i.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var m=r.updateQueue;m!==null&&ou(r,m,c);break;case 3:var E=r.updateQueue;if(E!==null){if(i=null,r.child!==null)switch(r.child.tag){case 5:i=r.child.stateNode;break;case 1:i=r.child.stateNode}ou(r,E,i)}break;case 5:var B=r.stateNode;if(i===null&&r.flags&4){i=B;var $=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":$.autoFocus&&i.focus();break;case"img":$.src&&(i.src=$.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var ae=r.alternate;if(ae!==null){var ge=ae.memoizedState;if(ge!==null){var xe=ge.dehydrated;xe!==null&&Ea(xe)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}Ct||r.flags&512&&Sl(r)}catch(me){it(r,r.return,me)}}if(r===e){Se=null;break}if(i=r.sibling,i!==null){i.return=r.return,Se=i;break}Se=r.return}}function op(e){for(;Se!==null;){var r=Se;if(r===e){Se=null;break}var i=r.sibling;if(i!==null){i.return=r.return,Se=i;break}Se=r.return}}function lp(e){for(;Se!==null;){var r=Se;try{switch(r.tag){case 0:case 11:case 15:var i=r.return;try{ui(4,r)}catch($){it(r,i,$)}break;case 1:var c=r.stateNode;if(typeof c.componentDidMount=="function"){var p=r.return;try{c.componentDidMount()}catch($){it(r,p,$)}}var m=r.return;try{Sl(r)}catch($){it(r,m,$)}break;case 5:var E=r.return;try{Sl(r)}catch($){it(r,E,$)}}}catch($){it(r,r.return,$)}if(r===e){Se=null;break}var B=r.sibling;if(B!==null){B.return=r.return,Se=B;break}Se=r.return}}var gg=Math.ceil,pi=C.ReactCurrentDispatcher,Pl=C.ReactCurrentOwner,ar=C.ReactCurrentBatchConfig,$e=0,xt=null,ut=null,wt=0,Xt=0,aa=Kr(0),ht=0,Za=null,_n=0,fi=0,zl=0,Qa=null,Dt=null,Rl=0,sa=1/0,Br=null,hi=!1,Tl=null,rn=null,mi=!1,nn=null,gi=0,Ja=0,Al=null,xi=-1,vi=0;function Tt(){return($e&6)!==0?lt():xi!==-1?xi:xi=lt()}function an(e){return(e.mode&1)===0?1:($e&2)!==0&&wt!==0?wt&-wt:Jm.transition!==null?(vi===0&&(vi=td()),vi):(e=Ye,e!==0||(e=window.event,e=e===void 0?16:dd(e.type)),e)}function vr(e,r,i,c){if(50<Ja)throw Ja=0,Al=null,Error(n(185));ka(e,i,c),(($e&2)===0||e!==xt)&&(e===xt&&(($e&2)===0&&(fi|=i),ht===4&&sn(e,wt)),Mt(e,c),i===1&&$e===0&&(r.mode&1)===0&&(sa=lt()+500,qs&&Qr()))}function Mt(e,r){var i=e.callbackNode;Jh(e,r);var c=Cs(e,e===xt?wt:0);if(c===0)i!==null&&Qc(i),e.callbackNode=null,e.callbackPriority=0;else if(r=c&-c,e.callbackPriority!==r){if(i!=null&&Qc(i),r===1)e.tag===0?Qm(dp.bind(null,e)):Xd(dp.bind(null,e)),Ym(function(){($e&6)===0&&Qr()}),i=null;else{switch(rd(c)){case 1:i=po;break;case 4:i=Jc;break;case 16:i=ks;break;case 536870912:i=ed;break;default:i=ks}i=vp(i,cp.bind(null,e))}e.callbackPriority=r,e.callbackNode=i}}function cp(e,r){if(xi=-1,vi=0,($e&6)!==0)throw Error(n(327));var i=e.callbackNode;if(ia()&&e.callbackNode!==i)return null;var c=Cs(e,e===xt?wt:0);if(c===0)return null;if((c&30)!==0||(c&e.expiredLanes)!==0||r)r=bi(e,c);else{r=c;var p=$e;$e|=2;var m=pp();(xt!==e||wt!==r)&&(Br=null,sa=lt()+500,Cn(e,r));do try{bg();break}catch(B){up(e,B)}while(!0);Zo(),pi.current=m,$e=p,ut!==null?r=0:(xt=null,wt=0,r=ht)}if(r!==0){if(r===2&&(p=fo(e),p!==0&&(c=p,r=Ll(e,p))),r===1)throw i=Za,Cn(e,0),sn(e,c),Mt(e,lt()),i;if(r===6)sn(e,c);else{if(p=e.current.alternate,(c&30)===0&&!xg(p)&&(r=bi(e,c),r===2&&(m=fo(e),m!==0&&(c=m,r=Ll(e,m))),r===1))throw i=Za,Cn(e,0),sn(e,c),Mt(e,lt()),i;switch(e.finishedWork=p,e.finishedLanes=c,r){case 0:case 1:throw Error(n(345));case 2:En(e,Dt,Br);break;case 3:if(sn(e,c),(c&130023424)===c&&(r=Rl+500-lt(),10<r)){if(Cs(e,0)!==0)break;if(p=e.suspendedLanes,(p&c)!==c){Tt(),e.pingedLanes|=e.suspendedLanes&p;break}e.timeoutHandle=Mo(En.bind(null,e,Dt,Br),r);break}En(e,Dt,Br);break;case 4:if(sn(e,c),(c&4194240)===c)break;for(r=e.eventTimes,p=-1;0<c;){var E=31-pr(c);m=1<<E,E=r[E],E>p&&(p=E),c&=~m}if(c=p,c=lt()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*gg(c/1960))-c,10<c){e.timeoutHandle=Mo(En.bind(null,e,Dt,Br),c);break}En(e,Dt,Br);break;case 5:En(e,Dt,Br);break;default:throw Error(n(329))}}}return Mt(e,lt()),e.callbackNode===i?cp.bind(null,e):null}function Ll(e,r){var i=Qa;return e.current.memoizedState.isDehydrated&&(Cn(e,r).flags|=256),e=bi(e,r),e!==2&&(r=Dt,Dt=i,r!==null&&Ol(r)),e}function Ol(e){Dt===null?Dt=e:Dt.push.apply(Dt,e)}function xg(e){for(var r=e;;){if(r.flags&16384){var i=r.updateQueue;if(i!==null&&(i=i.stores,i!==null))for(var c=0;c<i.length;c++){var p=i[c],m=p.getSnapshot;p=p.value;try{if(!fr(m(),p))return!1}catch{return!1}}}if(i=r.child,r.subtreeFlags&16384&&i!==null)i.return=r,r=i;else{if(r===e)break;for(;r.sibling===null;){if(r.return===null||r.return===e)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function sn(e,r){for(r&=~zl,r&=~fi,e.suspendedLanes|=r,e.pingedLanes&=~r,e=e.expirationTimes;0<r;){var i=31-pr(r),c=1<<i;e[i]=-1,r&=~c}}function dp(e){if(($e&6)!==0)throw Error(n(327));ia();var r=Cs(e,0);if((r&1)===0)return Mt(e,lt()),null;var i=bi(e,r);if(e.tag!==0&&i===2){var c=fo(e);c!==0&&(r=c,i=Ll(e,c))}if(i===1)throw i=Za,Cn(e,0),sn(e,r),Mt(e,lt()),i;if(i===6)throw Error(n(345));return e.finishedWork=e.current.alternate,e.finishedLanes=r,En(e,Dt,Br),Mt(e,lt()),null}function Il(e,r){var i=$e;$e|=1;try{return e(r)}finally{$e=i,$e===0&&(sa=lt()+500,qs&&Qr())}}function Sn(e){nn!==null&&nn.tag===0&&($e&6)===0&&ia();var r=$e;$e|=1;var i=ar.transition,c=Ye;try{if(ar.transition=null,Ye=1,e)return e()}finally{Ye=c,ar.transition=i,$e=r,($e&6)===0&&Qr()}}function Fl(){Xt=aa.current,Je(aa)}function Cn(e,r){e.finishedWork=null,e.finishedLanes=0;var i=e.timeoutHandle;if(i!==-1&&(e.timeoutHandle=-1,Gm(i)),ut!==null)for(i=ut.return;i!==null;){var c=i;switch(qo(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Hs();break;case 3:ta(),Je(It),Je(Nt),sl();break;case 5:nl(c);break;case 4:ta();break;case 13:Je(rt);break;case 19:Je(rt);break;case 10:Qo(c.type._context);break;case 22:case 23:Fl()}i=i.return}if(xt=e,ut=e=on(e.current,null),wt=Xt=r,ht=0,Za=null,zl=fi=_n=0,Dt=Qa=null,jn!==null){for(r=0;r<jn.length;r++)if(i=jn[r],c=i.interleaved,c!==null){i.interleaved=null;var p=c.next,m=i.pending;if(m!==null){var E=m.next;m.next=p,c.next=E}i.pending=c}jn=null}return e}function up(e,r){do{var i=ut;try{if(Zo(),ri.current=ii,ni){for(var c=nt.memoizedState;c!==null;){var p=c.queue;p!==null&&(p.pending=null),c=c.next}ni=!1}if(Nn=0,gt=ft=nt=null,Va=!1,qa=0,Pl.current=null,i===null||i.return===null){ht=1,Za=r,ut=null;break}e:{var m=e,E=i.return,B=i,$=r;if(r=wt,B.flags|=32768,$!==null&&typeof $=="object"&&typeof $.then=="function"){var ae=$,ge=B,xe=ge.tag;if((ge.mode&1)===0&&(xe===0||xe===11||xe===15)){var me=ge.alternate;me?(ge.updateQueue=me.updateQueue,ge.memoizedState=me.memoizedState,ge.lanes=me.lanes):(ge.updateQueue=null,ge.memoizedState=null)}var ke=Iu(E);if(ke!==null){ke.flags&=-257,Fu(ke,E,B,m,r),ke.mode&1&&Ou(m,ae,r),r=ke,$=ae;var Ce=r.updateQueue;if(Ce===null){var Ee=new Set;Ee.add($),r.updateQueue=Ee}else Ce.add($);break e}else{if((r&1)===0){Ou(m,ae,r),Bl();break e}$=Error(n(426))}}else if(tt&&B.mode&1){var ct=Iu(E);if(ct!==null){(ct.flags&65536)===0&&(ct.flags|=256),Fu(ct,E,B,m,r),Xo(ra($,B));break e}}m=$=ra($,B),ht!==4&&(ht=2),Qa===null?Qa=[m]:Qa.push(m),m=E;do{switch(m.tag){case 3:m.flags|=65536,r&=-r,m.lanes|=r;var Q=Au(m,$,r);iu(m,Q);break e;case 1:B=$;var q=m.type,ee=m.stateNode;if((m.flags&128)===0&&(typeof q.getDerivedStateFromError=="function"||ee!==null&&typeof ee.componentDidCatch=="function"&&(rn===null||!rn.has(ee)))){m.flags|=65536,r&=-r,m.lanes|=r;var we=Lu(m,B,r);iu(m,we);break e}}m=m.return}while(m!==null)}hp(i)}catch(ze){r=ze,ut===i&&i!==null&&(ut=i=i.return);continue}break}while(!0)}function pp(){var e=pi.current;return pi.current=ii,e===null?ii:e}function Bl(){(ht===0||ht===3||ht===2)&&(ht=4),xt===null||(_n&268435455)===0&&(fi&268435455)===0||sn(xt,wt)}function bi(e,r){var i=$e;$e|=2;var c=pp();(xt!==e||wt!==r)&&(Br=null,Cn(e,r));do try{vg();break}catch(p){up(e,p)}while(!0);if(Zo(),$e=i,pi.current=c,ut!==null)throw Error(n(261));return xt=null,wt=0,ht}function vg(){for(;ut!==null;)fp(ut)}function bg(){for(;ut!==null&&!Hh();)fp(ut)}function fp(e){var r=xp(e.alternate,e,Xt);e.memoizedProps=e.pendingProps,r===null?hp(e):ut=r,Pl.current=null}function hp(e){var r=e;do{var i=r.alternate;if(e=r.return,(r.flags&32768)===0){if(i=ug(i,r,Xt),i!==null){ut=i;return}}else{if(i=pg(i,r),i!==null){i.flags&=32767,ut=i;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ht=6,ut=null;return}}if(r=r.sibling,r!==null){ut=r;return}ut=r=e}while(r!==null);ht===0&&(ht=5)}function En(e,r,i){var c=Ye,p=ar.transition;try{ar.transition=null,Ye=1,yg(e,r,i,c)}finally{ar.transition=p,Ye=c}return null}function yg(e,r,i,c){do ia();while(nn!==null);if(($e&6)!==0)throw Error(n(327));i=e.finishedWork;var p=e.finishedLanes;if(i===null)return null;if(e.finishedWork=null,e.finishedLanes=0,i===e.current)throw Error(n(177));e.callbackNode=null,e.callbackPriority=0;var m=i.lanes|i.childLanes;if(em(e,m),e===xt&&(ut=xt=null,wt=0),(i.subtreeFlags&2064)===0&&(i.flags&2064)===0||mi||(mi=!0,vp(ks,function(){return ia(),null})),m=(i.flags&15990)!==0,(i.subtreeFlags&15990)!==0||m){m=ar.transition,ar.transition=null;var E=Ye;Ye=1;var B=$e;$e|=4,Pl.current=null,hg(e,i),ap(i,e),Mm(Bo),zs=!!Fo,Bo=Fo=null,e.current=i,mg(i),Vh(),$e=B,Ye=E,ar.transition=m}else e.current=i;if(mi&&(mi=!1,nn=e,gi=p),m=e.pendingLanes,m===0&&(rn=null),Yh(i.stateNode),Mt(e,lt()),r!==null)for(c=e.onRecoverableError,i=0;i<r.length;i++)p=r[i],c(p.value,{componentStack:p.stack,digest:p.digest});if(hi)throw hi=!1,e=Tl,Tl=null,e;return(gi&1)!==0&&e.tag!==0&&ia(),m=e.pendingLanes,(m&1)!==0?e===Al?Ja++:(Ja=0,Al=e):Ja=0,Qr(),null}function ia(){if(nn!==null){var e=rd(gi),r=ar.transition,i=Ye;try{if(ar.transition=null,Ye=16>e?16:e,nn===null)var c=!1;else{if(e=nn,nn=null,gi=0,($e&6)!==0)throw Error(n(331));var p=$e;for($e|=4,Se=e.current;Se!==null;){var m=Se,E=m.child;if((Se.flags&16)!==0){var B=m.deletions;if(B!==null){for(var $=0;$<B.length;$++){var ae=B[$];for(Se=ae;Se!==null;){var ge=Se;switch(ge.tag){case 0:case 11:case 15:Ka(8,ge,m)}var xe=ge.child;if(xe!==null)xe.return=ge,Se=xe;else for(;Se!==null;){ge=Se;var me=ge.sibling,ke=ge.return;if(Ju(ge),ge===ae){Se=null;break}if(me!==null){me.return=ke,Se=me;break}Se=ke}}}var Ce=m.alternate;if(Ce!==null){var Ee=Ce.child;if(Ee!==null){Ce.child=null;do{var ct=Ee.sibling;Ee.sibling=null,Ee=ct}while(Ee!==null)}}Se=m}}if((m.subtreeFlags&2064)!==0&&E!==null)E.return=m,Se=E;else e:for(;Se!==null;){if(m=Se,(m.flags&2048)!==0)switch(m.tag){case 0:case 11:case 15:Ka(9,m,m.return)}var Q=m.sibling;if(Q!==null){Q.return=m.return,Se=Q;break e}Se=m.return}}var q=e.current;for(Se=q;Se!==null;){E=Se;var ee=E.child;if((E.subtreeFlags&2064)!==0&&ee!==null)ee.return=E,Se=ee;else e:for(E=q;Se!==null;){if(B=Se,(B.flags&2048)!==0)try{switch(B.tag){case 0:case 11:case 15:ui(9,B)}}catch(ze){it(B,B.return,ze)}if(B===E){Se=null;break e}var we=B.sibling;if(we!==null){we.return=B.return,Se=we;break e}Se=B.return}}if($e=p,Qr(),Nr&&typeof Nr.onPostCommitFiberRoot=="function")try{Nr.onPostCommitFiberRoot(Ns,e)}catch{}c=!0}return c}finally{Ye=i,ar.transition=r}}return!1}function mp(e,r,i){r=ra(i,r),r=Au(e,r,1),e=en(e,r,1),r=Tt(),e!==null&&(ka(e,1,r),Mt(e,r))}function it(e,r,i){if(e.tag===3)mp(e,e,i);else for(;r!==null;){if(r.tag===3){mp(r,e,i);break}else if(r.tag===1){var c=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(rn===null||!rn.has(c))){e=ra(i,e),e=Lu(r,e,1),r=en(r,e,1),e=Tt(),r!==null&&(ka(r,1,e),Mt(r,e));break}}r=r.return}}function wg(e,r,i){var c=e.pingCache;c!==null&&c.delete(r),r=Tt(),e.pingedLanes|=e.suspendedLanes&i,xt===e&&(wt&i)===i&&(ht===4||ht===3&&(wt&130023424)===wt&&500>lt()-Rl?Cn(e,0):zl|=i),Mt(e,r)}function gp(e,r){r===0&&((e.mode&1)===0?r=1:(r=Ss,Ss<<=1,(Ss&130023424)===0&&(Ss=4194304)));var i=Tt();e=Or(e,r),e!==null&&(ka(e,r,i),Mt(e,i))}function jg(e){var r=e.memoizedState,i=0;r!==null&&(i=r.retryLane),gp(e,i)}function kg(e,r){var i=0;switch(e.tag){case 13:var c=e.stateNode,p=e.memoizedState;p!==null&&(i=p.retryLane);break;case 19:c=e.stateNode;break;default:throw Error(n(314))}c!==null&&c.delete(r),gp(e,i)}var xp;xp=function(e,r,i){if(e!==null)if(e.memoizedProps!==r.pendingProps||It.current)Bt=!0;else{if((e.lanes&i)===0&&(r.flags&128)===0)return Bt=!1,dg(e,r,i);Bt=(e.flags&131072)!==0}else Bt=!1,tt&&(r.flags&1048576)!==0&&Kd(r,Ys,r.index);switch(r.lanes=0,r.tag){case 2:var c=r.type;ci(e,r),e=r.pendingProps;var p=Yn(r,Nt.current);ea(r,i),p=ll(null,r,c,e,p,i);var m=cl();return r.flags|=1,typeof p=="object"&&p!==null&&typeof p.render=="function"&&p.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,Ft(c)?(m=!0,Vs(r)):m=!1,r.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,tl(r),p.updater=oi,r.stateNode=p,p._reactInternals=r,ml(r,c,e,i),r=bl(null,r,c,!0,m,i)):(r.tag=0,tt&&m&&Vo(r),Rt(null,r,p,i),r=r.child),r;case 16:c=r.elementType;e:{switch(ci(e,r),e=r.pendingProps,p=c._init,c=p(c._payload),r.type=c,p=r.tag=_g(c),e=mr(c,e),p){case 0:r=vl(null,r,c,e,i);break e;case 1:r=$u(null,r,c,e,i);break e;case 11:r=Bu(null,r,c,e,i);break e;case 14:r=Du(null,r,c,mr(c.type,e),i);break e}throw Error(n(306,c,""))}return r;case 0:return c=r.type,p=r.pendingProps,p=r.elementType===c?p:mr(c,p),vl(e,r,c,p,i);case 1:return c=r.type,p=r.pendingProps,p=r.elementType===c?p:mr(c,p),$u(e,r,c,p,i);case 3:e:{if(Hu(r),e===null)throw Error(n(387));c=r.pendingProps,m=r.memoizedState,p=m.element,su(e,r),ei(r,c,null,i);var E=r.memoizedState;if(c=E.element,m.isDehydrated)if(m={element:c,isDehydrated:!1,cache:E.cache,pendingSuspenseBoundaries:E.pendingSuspenseBoundaries,transitions:E.transitions},r.updateQueue.baseState=m,r.memoizedState=m,r.flags&256){p=ra(Error(n(423)),r),r=Vu(e,r,c,i,p);break e}else if(c!==p){p=ra(Error(n(424)),r),r=Vu(e,r,c,i,p);break e}else for(Yt=Xr(r.stateNode.containerInfo.firstChild),Gt=r,tt=!0,hr=null,i=nu(r,null,c,i),r.child=i;i;)i.flags=i.flags&-3|4096,i=i.sibling;else{if(Zn(),c===p){r=Fr(e,r,i);break e}Rt(e,r,c,i)}r=r.child}return r;case 5:return lu(r),e===null&&Yo(r),c=r.type,p=r.pendingProps,m=e!==null?e.memoizedProps:null,E=p.children,Do(c,p)?E=null:m!==null&&Do(c,m)&&(r.flags|=32),Wu(e,r),Rt(e,r,E,i),r.child;case 6:return e===null&&Yo(r),null;case 13:return qu(e,r,i);case 4:return rl(r,r.stateNode.containerInfo),c=r.pendingProps,e===null?r.child=Qn(r,null,c,i):Rt(e,r,c,i),r.child;case 11:return c=r.type,p=r.pendingProps,p=r.elementType===c?p:mr(c,p),Bu(e,r,c,p,i);case 7:return Rt(e,r,r.pendingProps,i),r.child;case 8:return Rt(e,r,r.pendingProps.children,i),r.child;case 12:return Rt(e,r,r.pendingProps.children,i),r.child;case 10:e:{if(c=r.type._context,p=r.pendingProps,m=r.memoizedProps,E=p.value,Ze(Zs,c._currentValue),c._currentValue=E,m!==null)if(fr(m.value,E)){if(m.children===p.children&&!It.current){r=Fr(e,r,i);break e}}else for(m=r.child,m!==null&&(m.return=r);m!==null;){var B=m.dependencies;if(B!==null){E=m.child;for(var $=B.firstContext;$!==null;){if($.context===c){if(m.tag===1){$=Ir(-1,i&-i),$.tag=2;var ae=m.updateQueue;if(ae!==null){ae=ae.shared;var ge=ae.pending;ge===null?$.next=$:($.next=ge.next,ge.next=$),ae.pending=$}}m.lanes|=i,$=m.alternate,$!==null&&($.lanes|=i),Jo(m.return,i,r),B.lanes|=i;break}$=$.next}}else if(m.tag===10)E=m.type===r.type?null:m.child;else if(m.tag===18){if(E=m.return,E===null)throw Error(n(341));E.lanes|=i,B=E.alternate,B!==null&&(B.lanes|=i),Jo(E,i,r),E=m.sibling}else E=m.child;if(E!==null)E.return=m;else for(E=m;E!==null;){if(E===r){E=null;break}if(m=E.sibling,m!==null){m.return=E.return,E=m;break}E=E.return}m=E}Rt(e,r,p.children,i),r=r.child}return r;case 9:return p=r.type,c=r.pendingProps.children,ea(r,i),p=rr(p),c=c(p),r.flags|=1,Rt(e,r,c,i),r.child;case 14:return c=r.type,p=mr(c,r.pendingProps),p=mr(c.type,p),Du(e,r,c,p,i);case 15:return Mu(e,r,r.type,r.pendingProps,i);case 17:return c=r.type,p=r.pendingProps,p=r.elementType===c?p:mr(c,p),ci(e,r),r.tag=1,Ft(c)?(e=!0,Vs(r)):e=!1,ea(r,i),Ru(r,c,p),ml(r,c,p,i),bl(null,r,c,!0,e,i);case 19:return Yu(e,r,i);case 22:return Uu(e,r,i)}throw Error(n(156,r.tag))};function vp(e,r){return Zc(e,r)}function Ng(e,r,i,c){this.tag=e,this.key=i,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function sr(e,r,i,c){return new Ng(e,r,i,c)}function Dl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function _g(e){if(typeof e=="function")return Dl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===A)return 11;if(e===se)return 14}return 2}function on(e,r){var i=e.alternate;return i===null?(i=sr(e.tag,r,e.key,e.mode),i.elementType=e.elementType,i.type=e.type,i.stateNode=e.stateNode,i.alternate=e,e.alternate=i):(i.pendingProps=r,i.type=e.type,i.flags=0,i.subtreeFlags=0,i.deletions=null),i.flags=e.flags&14680064,i.childLanes=e.childLanes,i.lanes=e.lanes,i.child=e.child,i.memoizedProps=e.memoizedProps,i.memoizedState=e.memoizedState,i.updateQueue=e.updateQueue,r=e.dependencies,i.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},i.sibling=e.sibling,i.index=e.index,i.ref=e.ref,i}function yi(e,r,i,c,p,m){var E=2;if(c=e,typeof e=="function")Dl(e)&&(E=1);else if(typeof e=="string")E=5;else e:switch(e){case M:return Pn(i.children,p,m,r);case G:E=8,p|=8;break;case H:return e=sr(12,i,r,p|2),e.elementType=H,e.lanes=m,e;case K:return e=sr(13,i,r,p),e.elementType=K,e.lanes=m,e;case k:return e=sr(19,i,r,p),e.elementType=k,e.lanes=m,e;case re:return wi(i,p,m,r);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case pe:E=10;break e;case te:E=9;break e;case A:E=11;break e;case se:E=14;break e;case ye:E=16,c=null;break e}throw Error(n(130,e==null?e:typeof e,""))}return r=sr(E,i,r,p),r.elementType=e,r.type=c,r.lanes=m,r}function Pn(e,r,i,c){return e=sr(7,e,c,r),e.lanes=i,e}function wi(e,r,i,c){return e=sr(22,e,c,r),e.elementType=re,e.lanes=i,e.stateNode={isHidden:!1},e}function Ml(e,r,i){return e=sr(6,e,null,r),e.lanes=i,e}function Ul(e,r,i){return r=sr(4,e.children!==null?e.children:[],e.key,r),r.lanes=i,r.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},r}function Sg(e,r,i,c,p){this.tag=r,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ho(0),this.expirationTimes=ho(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ho(0),this.identifierPrefix=c,this.onRecoverableError=p,this.mutableSourceEagerHydrationData=null}function Wl(e,r,i,c,p,m,E,B,$){return e=new Sg(e,r,i,B,$),r===1?(r=1,m===!0&&(r|=8)):r=0,m=sr(3,null,null,r),e.current=m,m.stateNode=e,m.memoizedState={element:c,isDehydrated:i,cache:null,transitions:null,pendingSuspenseBoundaries:null},tl(m),e}function Cg(e,r,i){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:F,key:c==null?null:""+c,children:e,containerInfo:r,implementation:i}}function bp(e){if(!e)return Zr;e=e._reactInternals;e:{if(xn(e)!==e||e.tag!==1)throw Error(n(170));var r=e;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(Ft(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(n(171))}if(e.tag===1){var i=e.type;if(Ft(i))return Gd(e,i,r)}return r}function yp(e,r,i,c,p,m,E,B,$){return e=Wl(i,c,!0,e,p,m,E,B,$),e.context=bp(null),i=e.current,c=Tt(),p=an(i),m=Ir(c,p),m.callback=r??null,en(i,m,p),e.current.lanes=p,ka(e,p,c),Mt(e,c),e}function ji(e,r,i,c){var p=r.current,m=Tt(),E=an(p);return i=bp(i),r.context===null?r.context=i:r.pendingContext=i,r=Ir(m,E),r.payload={element:e},c=c===void 0?null:c,c!==null&&(r.callback=c),e=en(p,r,E),e!==null&&(vr(e,p,E,m),Js(e,p,E)),E}function ki(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function wp(e,r){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var i=e.retryLane;e.retryLane=i!==0&&i<r?i:r}}function $l(e,r){wp(e,r),(e=e.alternate)&&wp(e,r)}function Eg(){return null}var jp=typeof reportError=="function"?reportError:function(e){console.error(e)};function Hl(e){this._internalRoot=e}Ni.prototype.render=Hl.prototype.render=function(e){var r=this._internalRoot;if(r===null)throw Error(n(409));ji(e,r,null,null)},Ni.prototype.unmount=Hl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var r=e.containerInfo;Sn(function(){ji(null,e,null,null)}),r[Rr]=null}};function Ni(e){this._internalRoot=e}Ni.prototype.unstable_scheduleHydration=function(e){if(e){var r=sd();e={blockedOn:null,target:e,priority:r};for(var i=0;i<qr.length&&r!==0&&r<qr[i].priority;i++);qr.splice(i,0,e),i===0&&ld(e)}};function Vl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function _i(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function kp(){}function Pg(e,r,i,c,p){if(p){if(typeof c=="function"){var m=c;c=function(){var ae=ki(E);m.call(ae)}}var E=yp(r,c,e,0,null,!1,!1,"",kp);return e._reactRootContainer=E,e[Rr]=E.current,Fa(e.nodeType===8?e.parentNode:e),Sn(),E}for(;p=e.lastChild;)e.removeChild(p);if(typeof c=="function"){var B=c;c=function(){var ae=ki($);B.call(ae)}}var $=Wl(e,0,!1,null,null,!1,!1,"",kp);return e._reactRootContainer=$,e[Rr]=$.current,Fa(e.nodeType===8?e.parentNode:e),Sn(function(){ji(r,$,i,c)}),$}function Si(e,r,i,c,p){var m=i._reactRootContainer;if(m){var E=m;if(typeof p=="function"){var B=p;p=function(){var $=ki(E);B.call($)}}ji(r,E,e,p)}else E=Pg(i,r,e,p,c);return ki(E)}nd=function(e){switch(e.tag){case 3:var r=e.stateNode;if(r.current.memoizedState.isDehydrated){var i=ja(r.pendingLanes);i!==0&&(mo(r,i|1),Mt(r,lt()),($e&6)===0&&(sa=lt()+500,Qr()))}break;case 13:Sn(function(){var c=Or(e,1);if(c!==null){var p=Tt();vr(c,e,1,p)}}),$l(e,1)}},go=function(e){if(e.tag===13){var r=Or(e,134217728);if(r!==null){var i=Tt();vr(r,e,134217728,i)}$l(e,134217728)}},ad=function(e){if(e.tag===13){var r=an(e),i=Or(e,r);if(i!==null){var c=Tt();vr(i,e,r,c)}$l(e,r)}},sd=function(){return Ye},id=function(e,r){var i=Ye;try{return Ye=e,r()}finally{Ye=i}},va=function(e,r,i){switch(r){case"input":if(I(e,i),r=i.name,i.type==="radio"&&r!=null){for(i=e;i.parentNode;)i=i.parentNode;for(i=i.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<i.length;r++){var c=i[r];if(c!==e&&c.form===e.form){var p=$s(c);if(!p)throw Error(n(90));Pt(c),I(c,p)}}}break;case"textarea":je(e,i);break;case"select":r=i.value,r!=null&&ue(e,!!i.multiple,r,!1)}},Hc=Il,Vc=Sn;var zg={usingClientEntryPoint:!1,Events:[Ma,qn,$s,Wc,$c,Il]},es={findFiberByHostInstance:vn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Rg={bundleType:es.bundleType,version:es.version,rendererPackageName:es.rendererPackageName,rendererConfig:es.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:C.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Xc(e),e===null?null:e.stateNode},findFiberByHostInstance:es.findFiberByHostInstance||Eg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ci=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ci.isDisabled&&Ci.supportsFiber)try{Ns=Ci.inject(Rg),Nr=Ci}catch{}}return Ut.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=zg,Ut.createPortal=function(e,r){var i=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Vl(r))throw Error(n(200));return Cg(e,r,null,i)},Ut.createRoot=function(e,r){if(!Vl(e))throw Error(n(299));var i=!1,c="",p=jp;return r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onRecoverableError!==void 0&&(p=r.onRecoverableError)),r=Wl(e,1,!1,null,null,i,!1,c,p),e[Rr]=r.current,Fa(e.nodeType===8?e.parentNode:e),new Hl(r)},Ut.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var r=e._reactInternals;if(r===void 0)throw typeof e.render=="function"?Error(n(188)):(e=Object.keys(e).join(","),Error(n(268,e)));return e=Xc(r),e=e===null?null:e.stateNode,e},Ut.flushSync=function(e){return Sn(e)},Ut.hydrate=function(e,r,i){if(!_i(r))throw Error(n(200));return Si(null,e,r,!0,i)},Ut.hydrateRoot=function(e,r,i){if(!Vl(e))throw Error(n(405));var c=i!=null&&i.hydratedSources||null,p=!1,m="",E=jp;if(i!=null&&(i.unstable_strictMode===!0&&(p=!0),i.identifierPrefix!==void 0&&(m=i.identifierPrefix),i.onRecoverableError!==void 0&&(E=i.onRecoverableError)),r=yp(r,null,e,1,i??null,p,!1,m,E),e[Rr]=r.current,Fa(e),c)for(e=0;e<c.length;e++)i=c[e],p=i._getVersion,p=p(i._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[i,p]:r.mutableSourceEagerHydrationData.push(i,p);return new Ni(r)},Ut.render=function(e,r,i){if(!_i(r))throw Error(n(200));return Si(null,e,r,!1,i)},Ut.unmountComponentAtNode=function(e){if(!_i(e))throw Error(n(40));return e._reactRootContainer?(Sn(function(){Si(null,null,e,!1,function(){e._reactRootContainer=null,e[Rr]=null})}),!0):!1},Ut.unstable_batchedUpdates=Il,Ut.unstable_renderSubtreeIntoContainer=function(e,r,i,c){if(!_i(i))throw Error(n(200));if(e==null||e._reactInternals===void 0)throw Error(n(38));return Si(e,r,i,!1,c)},Ut.version="18.3.1-next-f1338f8080-20240426",Ut}var Rp;function Cf(){if(Rp)return Yl.exports;Rp=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(a){console.error(a)}}return s(),Yl.exports=Mg(),Yl.exports}var Tp;function Ug(){if(Tp)return Pi;Tp=1;var s=Cf();return Pi.createRoot=s.createRoot,Pi.hydrateRoot=s.hydrateRoot,Pi}var Wg=Ug();const $g=jc(Wg);Cf();/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function os(){return os=Object.assign?Object.assign.bind():function(s){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(s[o]=n[o])}return s},os.apply(this,arguments)}var dn;(function(s){s.Pop="POP",s.Push="PUSH",s.Replace="REPLACE"})(dn||(dn={}));const Ap="popstate";function Hg(s){s===void 0&&(s={});function a(o,l){let{pathname:d,search:u,hash:f}=o.location;return oc("",{pathname:d,search:u,hash:f},l.state&&l.state.usr||null,l.state&&l.state.key||"default")}function n(o,l){return typeof l=="string"?l:$i(l)}return qg(a,n,null,s)}function at(s,a){if(s===!1||s===null||typeof s>"u")throw new Error(a)}function Nc(s,a){if(!s){typeof console<"u"&&console.warn(a);try{throw new Error(a)}catch{}}}function Vg(){return Math.random().toString(36).substr(2,8)}function Lp(s,a){return{usr:s.state,key:s.key,idx:a}}function oc(s,a,n,o){return n===void 0&&(n=null),os({pathname:typeof s=="string"?s:s.pathname,search:"",hash:""},typeof a=="string"?pa(a):a,{state:n,key:a&&a.key||o||Vg()})}function $i(s){let{pathname:a="/",search:n="",hash:o=""}=s;return n&&n!=="?"&&(a+=n.charAt(0)==="?"?n:"?"+n),o&&o!=="#"&&(a+=o.charAt(0)==="#"?o:"#"+o),a}function pa(s){let a={};if(s){let n=s.indexOf("#");n>=0&&(a.hash=s.substr(n),s=s.substr(0,n));let o=s.indexOf("?");o>=0&&(a.search=s.substr(o),s=s.substr(0,o)),s&&(a.pathname=s)}return a}function qg(s,a,n,o){o===void 0&&(o={});let{window:l=document.defaultView,v5Compat:d=!1}=o,u=l.history,f=dn.Pop,h=null,b=g();b==null&&(b=0,u.replaceState(os({},u.state,{idx:b}),""));function g(){return(u.state||{idx:null}).idx}function j(){f=dn.Pop;let v=g(),N=v==null?null:v-b;b=v,h&&h({action:f,location:x.location,delta:N})}function S(v,N){f=dn.Push;let P=oc(x.location,v,N);b=g()+1;let T=Lp(P,b),C=x.createHref(P);try{u.pushState(T,"",C)}catch(L){if(L instanceof DOMException&&L.name==="DataCloneError")throw L;l.location.assign(C)}d&&h&&h({action:f,location:x.location,delta:1})}function _(v,N){f=dn.Replace;let P=oc(x.location,v,N);b=g();let T=Lp(P,b),C=x.createHref(P);u.replaceState(T,"",C),d&&h&&h({action:f,location:x.location,delta:0})}function w(v){let N=l.location.origin!=="null"?l.location.origin:l.location.href,P=typeof v=="string"?v:$i(v);return P=P.replace(/ $/,"%20"),at(N,"No window.location.(origin|href) available to create URL for href: "+P),new URL(P,N)}let x={get action(){return f},get location(){return s(l,u)},listen(v){if(h)throw new Error("A history only accepts one active listener");return l.addEventListener(Ap,j),h=v,()=>{l.removeEventListener(Ap,j),h=null}},createHref(v){return a(l,v)},createURL:w,encodeLocation(v){let N=w(v);return{pathname:N.pathname,search:N.search,hash:N.hash}},push:S,replace:_,go(v){return u.go(v)}};return x}var Op;(function(s){s.data="data",s.deferred="deferred",s.redirect="redirect",s.error="error"})(Op||(Op={}));function Gg(s,a,n){return n===void 0&&(n="/"),Yg(s,a,n)}function Yg(s,a,n,o){let l=typeof a=="string"?pa(a):a,d=la(l.pathname||"/",n);if(d==null)return null;let u=Ef(s);Xg(u);let f=null;for(let h=0;f==null&&h<u.length;++h){let b=ix(d);f=ax(u[h],b)}return f}function Ef(s,a,n,o){a===void 0&&(a=[]),n===void 0&&(n=[]),o===void 0&&(o="");let l=(d,u,f)=>{let h={relativePath:f===void 0?d.path||"":f,caseSensitive:d.caseSensitive===!0,childrenIndex:u,route:d};h.relativePath.startsWith("/")&&(at(h.relativePath.startsWith(o),'Absolute route path "'+h.relativePath+'" nested under path '+('"'+o+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),h.relativePath=h.relativePath.slice(o.length));let b=pn([o,h.relativePath]),g=n.concat(h);d.children&&d.children.length>0&&(at(d.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+b+'".')),Ef(d.children,a,g,b)),!(d.path==null&&!d.index)&&a.push({path:b,score:rx(b,d.index),routesMeta:g})};return s.forEach((d,u)=>{var f;if(d.path===""||!((f=d.path)!=null&&f.includes("?")))l(d,u);else for(let h of Pf(d.path))l(d,u,h)}),a}function Pf(s){let a=s.split("/");if(a.length===0)return[];let[n,...o]=a,l=n.endsWith("?"),d=n.replace(/\?$/,"");if(o.length===0)return l?[d,""]:[d];let u=Pf(o.join("/")),f=[];return f.push(...u.map(h=>h===""?d:[d,h].join("/"))),l&&f.push(...u),f.map(h=>s.startsWith("/")&&h===""?"/":h)}function Xg(s){s.sort((a,n)=>a.score!==n.score?n.score-a.score:nx(a.routesMeta.map(o=>o.childrenIndex),n.routesMeta.map(o=>o.childrenIndex)))}const Kg=/^:[\w-]+$/,Zg=3,Qg=2,Jg=1,ex=10,tx=-2,Ip=s=>s==="*";function rx(s,a){let n=s.split("/"),o=n.length;return n.some(Ip)&&(o+=tx),a&&(o+=Qg),n.filter(l=>!Ip(l)).reduce((l,d)=>l+(Kg.test(d)?Zg:d===""?Jg:ex),o)}function nx(s,a){return s.length===a.length&&s.slice(0,-1).every((o,l)=>o===a[l])?s[s.length-1]-a[a.length-1]:0}function ax(s,a,n){let{routesMeta:o}=s,l={},d="/",u=[];for(let f=0;f<o.length;++f){let h=o[f],b=f===o.length-1,g=d==="/"?a:a.slice(d.length)||"/",j=lc({path:h.relativePath,caseSensitive:h.caseSensitive,end:b},g),S=h.route;if(!j)return null;Object.assign(l,j.params),u.push({params:l,pathname:pn([d,j.pathname]),pathnameBase:ux(pn([d,j.pathnameBase])),route:S}),j.pathnameBase!=="/"&&(d=pn([d,j.pathnameBase]))}return u}function lc(s,a){typeof s=="string"&&(s={path:s,caseSensitive:!1,end:!0});let[n,o]=sx(s.path,s.caseSensitive,s.end),l=a.match(n);if(!l)return null;let d=l[0],u=d.replace(/(.)\/+$/,"$1"),f=l.slice(1);return{params:o.reduce((b,g,j)=>{let{paramName:S,isOptional:_}=g;if(S==="*"){let x=f[j]||"";u=d.slice(0,d.length-x.length).replace(/(.)\/+$/,"$1")}const w=f[j];return _&&!w?b[S]=void 0:b[S]=(w||"").replace(/%2F/g,"/"),b},{}),pathname:d,pathnameBase:u,pattern:s}}function sx(s,a,n){a===void 0&&(a=!1),n===void 0&&(n=!0),Nc(s==="*"||!s.endsWith("*")||s.endsWith("/*"),'Route path "'+s+'" will be treated as if it were '+('"'+s.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+s.replace(/\*$/,"/*")+'".'));let o=[],l="^"+s.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(u,f,h)=>(o.push({paramName:f,isOptional:h!=null}),h?"/?([^\\/]+)?":"/([^\\/]+)"));return s.endsWith("*")?(o.push({paramName:"*"}),l+=s==="*"||s==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?l+="\\/*$":s!==""&&s!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,a?void 0:"i"),o]}function ix(s){try{return s.split("/").map(a=>decodeURIComponent(a).replace(/\//g,"%2F")).join("/")}catch(a){return Nc(!1,'The URL path "'+s+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+a+").")),s}}function la(s,a){if(a==="/")return s;if(!s.toLowerCase().startsWith(a.toLowerCase()))return null;let n=a.endsWith("/")?a.length-1:a.length,o=s.charAt(n);return o&&o!=="/"?null:s.slice(n)||"/"}const ox=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,lx=s=>ox.test(s);function cx(s,a){a===void 0&&(a="/");let{pathname:n,search:o="",hash:l=""}=typeof s=="string"?pa(s):s,d;if(n)if(lx(n))d=n;else{if(n.includes("//")){let u=n;n=n.replace(/\/\/+/g,"/"),Nc(!1,"Pathnames cannot have embedded double slashes - normalizing "+(u+" -> "+n))}n.startsWith("/")?d=Fp(n.substring(1),"/"):d=Fp(n,a)}else d=a;return{pathname:d,search:px(o),hash:fx(l)}}function Fp(s,a){let n=a.replace(/\/+$/,"").split("/");return s.split("/").forEach(l=>{l===".."?n.length>1&&n.pop():l!=="."&&n.push(l)}),n.length>1?n.join("/"):"/"}function Zl(s,a,n,o){return"Cannot include a '"+s+"' character in a manually specified "+("`to."+a+"` field ["+JSON.stringify(o)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function dx(s){return s.filter((a,n)=>n===0||a.route.path&&a.route.path.length>0)}function _c(s,a){let n=dx(s);return a?n.map((o,l)=>l===n.length-1?o.pathname:o.pathnameBase):n.map(o=>o.pathnameBase)}function Sc(s,a,n,o){o===void 0&&(o=!1);let l;typeof s=="string"?l=pa(s):(l=os({},s),at(!l.pathname||!l.pathname.includes("?"),Zl("?","pathname","search",l)),at(!l.pathname||!l.pathname.includes("#"),Zl("#","pathname","hash",l)),at(!l.search||!l.search.includes("#"),Zl("#","search","hash",l)));let d=s===""||l.pathname==="",u=d?"/":l.pathname,f;if(u==null)f=n;else{let j=a.length-1;if(!o&&u.startsWith("..")){let S=u.split("/");for(;S[0]==="..";)S.shift(),j-=1;l.pathname=S.join("/")}f=j>=0?a[j]:"/"}let h=cx(l,f),b=u&&u!=="/"&&u.endsWith("/"),g=(d||u===".")&&n.endsWith("/");return!h.pathname.endsWith("/")&&(b||g)&&(h.pathname+="/"),h}const pn=s=>s.join("/").replace(/\/\/+/g,"/"),ux=s=>s.replace(/\/+$/,"").replace(/^\/*/,"/"),px=s=>!s||s==="?"?"":s.startsWith("?")?s:"?"+s,fx=s=>!s||s==="#"?"":s.startsWith("#")?s:"#"+s;function hx(s){return s!=null&&typeof s.status=="number"&&typeof s.statusText=="string"&&typeof s.internal=="boolean"&&"data"in s}const zf=["post","put","patch","delete"];new Set(zf);const mx=["get",...zf];new Set(mx);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ls(){return ls=Object.assign?Object.assign.bind():function(s){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(s[o]=n[o])}return s},ls.apply(this,arguments)}const Ki=U.createContext(null),Rf=U.createContext(null),Ur=U.createContext(null),Zi=U.createContext(null),Wr=U.createContext({outlet:null,matches:[],isDataRoute:!1}),Tf=U.createContext(null);function gx(s,a){let{relative:n}=a===void 0?{}:a;fa()||at(!1);let{basename:o,navigator:l}=U.useContext(Ur),{hash:d,pathname:u,search:f}=Qi(s,{relative:n}),h=u;return o!=="/"&&(h=u==="/"?o:pn([o,u])),l.createHref({pathname:h,search:f,hash:d})}function fa(){return U.useContext(Zi)!=null}function jr(){return fa()||at(!1),U.useContext(Zi).location}function Af(s){U.useContext(Ur).static||U.useLayoutEffect(s)}function Ot(){let{isDataRoute:s}=U.useContext(Wr);return s?Px():xx()}function xx(){fa()||at(!1);let s=U.useContext(Ki),{basename:a,future:n,navigator:o}=U.useContext(Ur),{matches:l}=U.useContext(Wr),{pathname:d}=jr(),u=JSON.stringify(_c(l,n.v7_relativeSplatPath)),f=U.useRef(!1);return Af(()=>{f.current=!0}),U.useCallback(function(b,g){if(g===void 0&&(g={}),!f.current)return;if(typeof b=="number"){o.go(b);return}let j=Sc(b,JSON.parse(u),d,g.relative==="path");s==null&&a!=="/"&&(j.pathname=j.pathname==="/"?a:pn([a,j.pathname])),(g.replace?o.replace:o.push)(j,g.state,g)},[a,o,u,d,s])}function Lf(){let{matches:s}=U.useContext(Wr),a=s[s.length-1];return a?a.params:{}}function Qi(s,a){let{relative:n}=a===void 0?{}:a,{future:o}=U.useContext(Ur),{matches:l}=U.useContext(Wr),{pathname:d}=jr(),u=JSON.stringify(_c(l,o.v7_relativeSplatPath));return U.useMemo(()=>Sc(s,JSON.parse(u),d,n==="path"),[s,u,d,n])}function vx(s,a){return bx(s,a)}function bx(s,a,n,o){fa()||at(!1);let{navigator:l}=U.useContext(Ur),{matches:d}=U.useContext(Wr),u=d[d.length-1],f=u?u.params:{};u&&u.pathname;let h=u?u.pathnameBase:"/";u&&u.route;let b=jr(),g;if(a){var j;let v=typeof a=="string"?pa(a):a;h==="/"||(j=v.pathname)!=null&&j.startsWith(h)||at(!1),g=v}else g=b;let S=g.pathname||"/",_=S;if(h!=="/"){let v=h.replace(/^\//,"").split("/");_="/"+S.replace(/^\//,"").split("/").slice(v.length).join("/")}let w=Gg(s,{pathname:_}),x=Nx(w&&w.map(v=>Object.assign({},v,{params:Object.assign({},f,v.params),pathname:pn([h,l.encodeLocation?l.encodeLocation(v.pathname).pathname:v.pathname]),pathnameBase:v.pathnameBase==="/"?h:pn([h,l.encodeLocation?l.encodeLocation(v.pathnameBase).pathname:v.pathnameBase])})),d,n,o);return a&&x?U.createElement(Zi.Provider,{value:{location:ls({pathname:"/",search:"",hash:"",state:null,key:"default"},g),navigationType:dn.Pop}},x):x}function yx(){let s=Ex(),a=hx(s)?s.status+" "+s.statusText:s instanceof Error?s.message:JSON.stringify(s),n=s instanceof Error?s.stack:null,l={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return U.createElement(U.Fragment,null,U.createElement("h2",null,"Unexpected Application Error!"),U.createElement("h3",{style:{fontStyle:"italic"}},a),n?U.createElement("pre",{style:l},n):null,null)}const wx=U.createElement(yx,null);class jx extends U.Component{constructor(a){super(a),this.state={location:a.location,revalidation:a.revalidation,error:a.error}}static getDerivedStateFromError(a){return{error:a}}static getDerivedStateFromProps(a,n){return n.location!==a.location||n.revalidation!=="idle"&&a.revalidation==="idle"?{error:a.error,location:a.location,revalidation:a.revalidation}:{error:a.error!==void 0?a.error:n.error,location:n.location,revalidation:a.revalidation||n.revalidation}}componentDidCatch(a,n){console.error("React Router caught the following error during render",a,n)}render(){return this.state.error!==void 0?U.createElement(Wr.Provider,{value:this.props.routeContext},U.createElement(Tf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function kx(s){let{routeContext:a,match:n,children:o}=s,l=U.useContext(Ki);return l&&l.static&&l.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(l.staticContext._deepestRenderedBoundaryId=n.route.id),U.createElement(Wr.Provider,{value:a},o)}function Nx(s,a,n,o){var l;if(a===void 0&&(a=[]),n===void 0&&(n=null),o===void 0&&(o=null),s==null){var d;if(!n)return null;if(n.errors)s=n.matches;else if((d=o)!=null&&d.v7_partialHydration&&a.length===0&&!n.initialized&&n.matches.length>0)s=n.matches;else return null}let u=s,f=(l=n)==null?void 0:l.errors;if(f!=null){let g=u.findIndex(j=>j.route.id&&(f==null?void 0:f[j.route.id])!==void 0);g>=0||at(!1),u=u.slice(0,Math.min(u.length,g+1))}let h=!1,b=-1;if(n&&o&&o.v7_partialHydration)for(let g=0;g<u.length;g++){let j=u[g];if((j.route.HydrateFallback||j.route.hydrateFallbackElement)&&(b=g),j.route.id){let{loaderData:S,errors:_}=n,w=j.route.loader&&S[j.route.id]===void 0&&(!_||_[j.route.id]===void 0);if(j.route.lazy||w){h=!0,b>=0?u=u.slice(0,b+1):u=[u[0]];break}}}return u.reduceRight((g,j,S)=>{let _,w=!1,x=null,v=null;n&&(_=f&&j.route.id?f[j.route.id]:void 0,x=j.route.errorElement||wx,h&&(b<0&&S===0?(zx("route-fallback"),w=!0,v=null):b===S&&(w=!0,v=j.route.hydrateFallbackElement||null)));let N=a.concat(u.slice(0,S+1)),P=()=>{let T;return _?T=x:w?T=v:j.route.Component?T=U.createElement(j.route.Component,null):j.route.element?T=j.route.element:T=g,U.createElement(kx,{match:j,routeContext:{outlet:g,matches:N,isDataRoute:n!=null},children:T})};return n&&(j.route.ErrorBoundary||j.route.errorElement||S===0)?U.createElement(jx,{location:n.location,revalidation:n.revalidation,component:x,error:_,children:P(),routeContext:{outlet:null,matches:N,isDataRoute:!0}}):P()},null)}var Of=(function(s){return s.UseBlocker="useBlocker",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s})(Of||{}),If=(function(s){return s.UseBlocker="useBlocker",s.UseLoaderData="useLoaderData",s.UseActionData="useActionData",s.UseRouteError="useRouteError",s.UseNavigation="useNavigation",s.UseRouteLoaderData="useRouteLoaderData",s.UseMatches="useMatches",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s.UseRouteId="useRouteId",s})(If||{});function _x(s){let a=U.useContext(Ki);return a||at(!1),a}function Sx(s){let a=U.useContext(Rf);return a||at(!1),a}function Cx(s){let a=U.useContext(Wr);return a||at(!1),a}function Ff(s){let a=Cx(),n=a.matches[a.matches.length-1];return n.route.id||at(!1),n.route.id}function Ex(){var s;let a=U.useContext(Tf),n=Sx(),o=Ff();return a!==void 0?a:(s=n.errors)==null?void 0:s[o]}function Px(){let{router:s}=_x(Of.UseNavigateStable),a=Ff(If.UseNavigateStable),n=U.useRef(!1);return Af(()=>{n.current=!0}),U.useCallback(function(l,d){d===void 0&&(d={}),n.current&&(typeof l=="number"?s.navigate(l):s.navigate(l,ls({fromRouteId:a},d)))},[s,a])}const Bp={};function zx(s,a,n){Bp[s]||(Bp[s]=!0)}function Rx(s,a){s==null||s.v7_startTransition,s==null||s.v7_relativeSplatPath}function cc(s){let{to:a,replace:n,state:o,relative:l}=s;fa()||at(!1);let{future:d,static:u}=U.useContext(Ur),{matches:f}=U.useContext(Wr),{pathname:h}=jr(),b=Ot(),g=Sc(a,_c(f,d.v7_relativeSplatPath),h,l==="path"),j=JSON.stringify(g);return U.useEffect(()=>b(JSON.parse(j),{replace:n,state:o,relative:l}),[b,j,l,n,o]),null}function mt(s){at(!1)}function Tx(s){let{basename:a="/",children:n=null,location:o,navigationType:l=dn.Pop,navigator:d,static:u=!1,future:f}=s;fa()&&at(!1);let h=a.replace(/^\/*/,"/"),b=U.useMemo(()=>({basename:h,navigator:d,static:u,future:ls({v7_relativeSplatPath:!1},f)}),[h,f,d,u]);typeof o=="string"&&(o=pa(o));let{pathname:g="/",search:j="",hash:S="",state:_=null,key:w="default"}=o,x=U.useMemo(()=>{let v=la(g,h);return v==null?null:{location:{pathname:v,search:j,hash:S,state:_,key:w},navigationType:l}},[h,g,j,S,_,w,l]);return x==null?null:U.createElement(Ur.Provider,{value:b},U.createElement(Zi.Provider,{children:n,value:x}))}function Dp(s){let{children:a,location:n}=s;return vx(dc(a),n)}new Promise(()=>{});function dc(s,a){a===void 0&&(a=[]);let n=[];return U.Children.forEach(s,(o,l)=>{if(!U.isValidElement(o))return;let d=[...a,l];if(o.type===U.Fragment){n.push.apply(n,dc(o.props.children,d));return}o.type!==mt&&at(!1),!o.props.index||!o.props.children||at(!1);let u={id:o.props.id||d.join("-"),caseSensitive:o.props.caseSensitive,element:o.props.element,Component:o.props.Component,index:o.props.index,path:o.props.path,loader:o.props.loader,action:o.props.action,errorElement:o.props.errorElement,ErrorBoundary:o.props.ErrorBoundary,hasErrorBoundary:o.props.ErrorBoundary!=null||o.props.errorElement!=null,shouldRevalidate:o.props.shouldRevalidate,handle:o.props.handle,lazy:o.props.lazy};o.props.children&&(u.children=dc(o.props.children,d)),n.push(u)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Hi(){return Hi=Object.assign?Object.assign.bind():function(s){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(s[o]=n[o])}return s},Hi.apply(this,arguments)}function Bf(s,a){if(s==null)return{};var n={},o=Object.keys(s),l,d;for(d=0;d<o.length;d++)l=o[d],!(a.indexOf(l)>=0)&&(n[l]=s[l]);return n}function Ax(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}function Lx(s,a){return s.button===0&&(!a||a==="_self")&&!Ax(s)}function uc(s){return s===void 0&&(s=""),new URLSearchParams(typeof s=="string"||Array.isArray(s)||s instanceof URLSearchParams?s:Object.keys(s).reduce((a,n)=>{let o=s[n];return a.concat(Array.isArray(o)?o.map(l=>[n,l]):[[n,o]])},[]))}function Ox(s,a){let n=uc(s);return a&&a.forEach((o,l)=>{n.has(l)||a.getAll(l).forEach(d=>{n.append(l,d)})}),n}const Ix=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Fx=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],Bx="6";try{window.__reactRouterVersion=Bx}catch{}const Dx=U.createContext({isTransitioning:!1}),Mx="startTransition",Mp=Fg[Mx];function Ux(s){let{basename:a,children:n,future:o,window:l}=s,d=U.useRef();d.current==null&&(d.current=Hg({window:l,v5Compat:!0}));let u=d.current,[f,h]=U.useState({action:u.action,location:u.location}),{v7_startTransition:b}=o||{},g=U.useCallback(j=>{b&&Mp?Mp(()=>h(j)):h(j)},[h,b]);return U.useLayoutEffect(()=>u.listen(g),[u,g]),U.useEffect(()=>Rx(o),[o]),U.createElement(Tx,{basename:a,children:n,location:f.location,navigationType:f.action,navigator:u,future:o})}const Wx=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",$x=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,qe=U.forwardRef(function(a,n){let{onClick:o,relative:l,reloadDocument:d,replace:u,state:f,target:h,to:b,preventScrollReset:g,viewTransition:j}=a,S=Bf(a,Ix),{basename:_}=U.useContext(Ur),w,x=!1;if(typeof b=="string"&&$x.test(b)&&(w=b,Wx))try{let T=new URL(window.location.href),C=b.startsWith("//")?new URL(T.protocol+b):new URL(b),L=la(C.pathname,_);C.origin===T.origin&&L!=null?b=L+C.search+C.hash:x=!0}catch{}let v=gx(b,{relative:l}),N=qx(b,{replace:u,state:f,target:h,preventScrollReset:g,relative:l,viewTransition:j});function P(T){o&&o(T),T.defaultPrevented||N(T)}return U.createElement("a",Hi({},S,{href:w||v,onClick:x||d?o:P,ref:n,target:h}))}),Hx=U.forwardRef(function(a,n){let{"aria-current":o="page",caseSensitive:l=!1,className:d="",end:u=!1,style:f,to:h,viewTransition:b,children:g}=a,j=Bf(a,Fx),S=Qi(h,{relative:j.relative}),_=jr(),w=U.useContext(Rf),{navigator:x,basename:v}=U.useContext(Ur),N=w!=null&&Yx(S)&&b===!0,P=x.encodeLocation?x.encodeLocation(S).pathname:S.pathname,T=_.pathname,C=w&&w.navigation&&w.navigation.location?w.navigation.location.pathname:null;l||(T=T.toLowerCase(),C=C?C.toLowerCase():null,P=P.toLowerCase()),C&&v&&(C=la(C,v)||C);const L=P!=="/"&&P.endsWith("/")?P.length-1:P.length;let F=T===P||!u&&T.startsWith(P)&&T.charAt(L)==="/",M=C!=null&&(C===P||!u&&C.startsWith(P)&&C.charAt(P.length)==="/"),G={isActive:F,isPending:M,isTransitioning:N},H=F?o:void 0,pe;typeof d=="function"?pe=d(G):pe=[d,F?"active":null,M?"pending":null,N?"transitioning":null].filter(Boolean).join(" ");let te=typeof f=="function"?f(G):f;return U.createElement(qe,Hi({},j,{"aria-current":H,className:pe,ref:n,style:te,to:h,viewTransition:b}),typeof g=="function"?g(G):g)});var pc;(function(s){s.UseScrollRestoration="useScrollRestoration",s.UseSubmit="useSubmit",s.UseSubmitFetcher="useSubmitFetcher",s.UseFetcher="useFetcher",s.useViewTransitionState="useViewTransitionState"})(pc||(pc={}));var Up;(function(s){s.UseFetcher="useFetcher",s.UseFetchers="useFetchers",s.UseScrollRestoration="useScrollRestoration"})(Up||(Up={}));function Vx(s){let a=U.useContext(Ki);return a||at(!1),a}function qx(s,a){let{target:n,replace:o,state:l,preventScrollReset:d,relative:u,viewTransition:f}=a===void 0?{}:a,h=Ot(),b=jr(),g=Qi(s,{relative:u});return U.useCallback(j=>{if(Lx(j,n)){j.preventDefault();let S=o!==void 0?o:$i(b)===$i(g);h(s,{replace:S,state:l,preventScrollReset:d,relative:u,viewTransition:f})}},[b,h,g,o,l,n,s,d,u,f])}function Gx(s){let a=U.useRef(uc(s)),n=U.useRef(!1),o=jr(),l=U.useMemo(()=>Ox(o.search,n.current?null:a.current),[o.search]),d=Ot(),u=U.useCallback((f,h)=>{const b=uc(typeof f=="function"?f(l):f);n.current=!0,d("?"+b,h)},[d,l]);return[l,u]}function Yx(s,a){a===void 0&&(a={});let n=U.useContext(Dx);n==null&&at(!1);let{basename:o}=Vx(pc.useViewTransitionState),l=Qi(s,{relative:a.relative});if(!n.isTransitioning)return!1;let d=la(n.currentLocation.pathname,o)||n.currentLocation.pathname,u=la(n.nextLocation.pathname,o)||n.nextLocation.pathname;return lc(l.pathname,u)!=null||lc(l.pathname,d)!=null}function Df(s,a){return function(){return s.apply(a,arguments)}}const{toString:Xx}=Object.prototype,{getPrototypeOf:Cc}=Object,{iterator:Ji,toStringTag:Mf}=Symbol,eo=(s=>a=>{const n=Xx.call(a);return s[n]||(s[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),kr=s=>(s=s.toLowerCase(),a=>eo(a)===s),to=s=>a=>typeof a===s,{isArray:ha}=Array,ca=to("undefined");function gs(s){return s!==null&&!ca(s)&&s.constructor!==null&&!ca(s.constructor)&&Wt(s.constructor.isBuffer)&&s.constructor.isBuffer(s)}const Uf=kr("ArrayBuffer");function Kx(s){let a;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?a=ArrayBuffer.isView(s):a=s&&s.buffer&&Uf(s.buffer),a}const Zx=to("string"),Wt=to("function"),Wf=to("number"),xs=s=>s!==null&&typeof s=="object",Qx=s=>s===!0||s===!1,Ii=s=>{if(eo(s)!=="object")return!1;const a=Cc(s);return(a===null||a===Object.prototype||Object.getPrototypeOf(a)===null)&&!(Mf in s)&&!(Ji in s)},Jx=s=>{if(!xs(s)||gs(s))return!1;try{return Object.keys(s).length===0&&Object.getPrototypeOf(s)===Object.prototype}catch{return!1}},e0=kr("Date"),t0=kr("File"),r0=kr("Blob"),n0=kr("FileList"),a0=s=>xs(s)&&Wt(s.pipe),s0=s=>{let a;return s&&(typeof FormData=="function"&&s instanceof FormData||Wt(s.append)&&((a=eo(s))==="formdata"||a==="object"&&Wt(s.toString)&&s.toString()==="[object FormData]"))},i0=kr("URLSearchParams"),[o0,l0,c0,d0]=["ReadableStream","Request","Response","Headers"].map(kr),u0=s=>s.trim?s.trim():s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function vs(s,a,{allOwnKeys:n=!1}={}){if(s===null||typeof s>"u")return;let o,l;if(typeof s!="object"&&(s=[s]),ha(s))for(o=0,l=s.length;o<l;o++)a.call(null,s[o],o,s);else{if(gs(s))return;const d=n?Object.getOwnPropertyNames(s):Object.keys(s),u=d.length;let f;for(o=0;o<u;o++)f=d[o],a.call(null,s[f],f,s)}}function $f(s,a){if(gs(s))return null;a=a.toLowerCase();const n=Object.keys(s);let o=n.length,l;for(;o-- >0;)if(l=n[o],a===l.toLowerCase())return l;return null}const zn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Hf=s=>!ca(s)&&s!==zn;function fc(){const{caseless:s,skipUndefined:a}=Hf(this)&&this||{},n={},o=(l,d)=>{if(d==="__proto__"||d==="constructor"||d==="prototype")return;const u=s&&$f(n,d)||d;Ii(n[u])&&Ii(l)?n[u]=fc(n[u],l):Ii(l)?n[u]=fc({},l):ha(l)?n[u]=l.slice():(!a||!ca(l))&&(n[u]=l)};for(let l=0,d=arguments.length;l<d;l++)arguments[l]&&vs(arguments[l],o);return n}const p0=(s,a,n,{allOwnKeys:o}={})=>(vs(a,(l,d)=>{n&&Wt(l)?Object.defineProperty(s,d,{value:Df(l,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(s,d,{value:l,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:o}),s),f0=s=>(s.charCodeAt(0)===65279&&(s=s.slice(1)),s),h0=(s,a,n,o)=>{s.prototype=Object.create(a.prototype,o),Object.defineProperty(s.prototype,"constructor",{value:s,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(s,"super",{value:a.prototype}),n&&Object.assign(s.prototype,n)},m0=(s,a,n,o)=>{let l,d,u;const f={};if(a=a||{},s==null)return a;do{for(l=Object.getOwnPropertyNames(s),d=l.length;d-- >0;)u=l[d],(!o||o(u,s,a))&&!f[u]&&(a[u]=s[u],f[u]=!0);s=n!==!1&&Cc(s)}while(s&&(!n||n(s,a))&&s!==Object.prototype);return a},g0=(s,a,n)=>{s=String(s),(n===void 0||n>s.length)&&(n=s.length),n-=a.length;const o=s.indexOf(a,n);return o!==-1&&o===n},x0=s=>{if(!s)return null;if(ha(s))return s;let a=s.length;if(!Wf(a))return null;const n=new Array(a);for(;a-- >0;)n[a]=s[a];return n},v0=(s=>a=>s&&a instanceof s)(typeof Uint8Array<"u"&&Cc(Uint8Array)),b0=(s,a)=>{const o=(s&&s[Ji]).call(s);let l;for(;(l=o.next())&&!l.done;){const d=l.value;a.call(s,d[0],d[1])}},y0=(s,a)=>{let n;const o=[];for(;(n=s.exec(a))!==null;)o.push(n);return o},w0=kr("HTMLFormElement"),j0=s=>s.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,o,l){return o.toUpperCase()+l}),Wp=(({hasOwnProperty:s})=>(a,n)=>s.call(a,n))(Object.prototype),k0=kr("RegExp"),Vf=(s,a)=>{const n=Object.getOwnPropertyDescriptors(s),o={};vs(n,(l,d)=>{let u;(u=a(l,d,s))!==!1&&(o[d]=u||l)}),Object.defineProperties(s,o)},N0=s=>{Vf(s,(a,n)=>{if(Wt(s)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const o=s[n];if(Wt(o)){if(a.enumerable=!1,"writable"in a){a.writable=!1;return}a.set||(a.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},_0=(s,a)=>{const n={},o=l=>{l.forEach(d=>{n[d]=!0})};return ha(s)?o(s):o(String(s).split(a)),n},S0=()=>{},C0=(s,a)=>s!=null&&Number.isFinite(s=+s)?s:a;function E0(s){return!!(s&&Wt(s.append)&&s[Mf]==="FormData"&&s[Ji])}const P0=s=>{const a=new Array(10),n=(o,l)=>{if(xs(o)){if(a.indexOf(o)>=0)return;if(gs(o))return o;if(!("toJSON"in o)){a[l]=o;const d=ha(o)?[]:{};return vs(o,(u,f)=>{const h=n(u,l+1);!ca(h)&&(d[f]=h)}),a[l]=void 0,d}}return o};return n(s,0)},z0=kr("AsyncFunction"),R0=s=>s&&(xs(s)||Wt(s))&&Wt(s.then)&&Wt(s.catch),qf=((s,a)=>s?setImmediate:a?((n,o)=>(zn.addEventListener("message",({source:l,data:d})=>{l===zn&&d===n&&o.length&&o.shift()()},!1),l=>{o.push(l),zn.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Wt(zn.postMessage)),T0=typeof queueMicrotask<"u"?queueMicrotask.bind(zn):typeof process<"u"&&process.nextTick||qf,A0=s=>s!=null&&Wt(s[Ji]),le={isArray:ha,isArrayBuffer:Uf,isBuffer:gs,isFormData:s0,isArrayBufferView:Kx,isString:Zx,isNumber:Wf,isBoolean:Qx,isObject:xs,isPlainObject:Ii,isEmptyObject:Jx,isReadableStream:o0,isRequest:l0,isResponse:c0,isHeaders:d0,isUndefined:ca,isDate:e0,isFile:t0,isBlob:r0,isRegExp:k0,isFunction:Wt,isStream:a0,isURLSearchParams:i0,isTypedArray:v0,isFileList:n0,forEach:vs,merge:fc,extend:p0,trim:u0,stripBOM:f0,inherits:h0,toFlatObject:m0,kindOf:eo,kindOfTest:kr,endsWith:g0,toArray:x0,forEachEntry:b0,matchAll:y0,isHTMLForm:w0,hasOwnProperty:Wp,hasOwnProp:Wp,reduceDescriptors:Vf,freezeMethods:N0,toObjectSet:_0,toCamelCase:j0,noop:S0,toFiniteNumber:C0,findKey:$f,global:zn,isContextDefined:Hf,isSpecCompliantForm:E0,toJSONObject:P0,isAsyncFn:z0,isThenable:R0,setImmediate:qf,asap:T0,isIterable:A0};let Ie=class Gf extends Error{static from(a,n,o,l,d,u){const f=new Gf(a.message,n||a.code,o,l,d);return f.cause=a,f.name=a.name,u&&Object.assign(f,u),f}constructor(a,n,o,l,d){super(a),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),o&&(this.config=o),l&&(this.request=l),d&&(this.response=d,this.status=d.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:le.toJSONObject(this.config),code:this.code,status:this.status}}};Ie.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";Ie.ERR_BAD_OPTION="ERR_BAD_OPTION";Ie.ECONNABORTED="ECONNABORTED";Ie.ETIMEDOUT="ETIMEDOUT";Ie.ERR_NETWORK="ERR_NETWORK";Ie.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";Ie.ERR_DEPRECATED="ERR_DEPRECATED";Ie.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";Ie.ERR_BAD_REQUEST="ERR_BAD_REQUEST";Ie.ERR_CANCELED="ERR_CANCELED";Ie.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";Ie.ERR_INVALID_URL="ERR_INVALID_URL";const L0=null;function hc(s){return le.isPlainObject(s)||le.isArray(s)}function Yf(s){return le.endsWith(s,"[]")?s.slice(0,-2):s}function $p(s,a,n){return s?s.concat(a).map(function(l,d){return l=Yf(l),!n&&d?"["+l+"]":l}).join(n?".":""):a}function O0(s){return le.isArray(s)&&!s.some(hc)}const I0=le.toFlatObject(le,{},null,function(a){return/^is[A-Z]/.test(a)});function ro(s,a,n){if(!le.isObject(s))throw new TypeError("target must be an object");a=a||new FormData,n=le.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(x,v){return!le.isUndefined(v[x])});const o=n.metaTokens,l=n.visitor||g,d=n.dots,u=n.indexes,h=(n.Blob||typeof Blob<"u"&&Blob)&&le.isSpecCompliantForm(a);if(!le.isFunction(l))throw new TypeError("visitor must be a function");function b(w){if(w===null)return"";if(le.isDate(w))return w.toISOString();if(le.isBoolean(w))return w.toString();if(!h&&le.isBlob(w))throw new Ie("Blob is not supported. Use a Buffer instead.");return le.isArrayBuffer(w)||le.isTypedArray(w)?h&&typeof Blob=="function"?new Blob([w]):Buffer.from(w):w}function g(w,x,v){let N=w;if(w&&!v&&typeof w=="object"){if(le.endsWith(x,"{}"))x=o?x:x.slice(0,-2),w=JSON.stringify(w);else if(le.isArray(w)&&O0(w)||(le.isFileList(w)||le.endsWith(x,"[]"))&&(N=le.toArray(w)))return x=Yf(x),N.forEach(function(T,C){!(le.isUndefined(T)||T===null)&&a.append(u===!0?$p([x],C,d):u===null?x:x+"[]",b(T))}),!1}return hc(w)?!0:(a.append($p(v,x,d),b(w)),!1)}const j=[],S=Object.assign(I0,{defaultVisitor:g,convertValue:b,isVisitable:hc});function _(w,x){if(!le.isUndefined(w)){if(j.indexOf(w)!==-1)throw Error("Circular reference detected in "+x.join("."));j.push(w),le.forEach(w,function(N,P){(!(le.isUndefined(N)||N===null)&&l.call(a,N,le.isString(P)?P.trim():P,x,S))===!0&&_(N,x?x.concat(P):[P])}),j.pop()}}if(!le.isObject(s))throw new TypeError("data must be an object");return _(s),a}function Hp(s){const a={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(s).replace(/[!'()~]|%20|%00/g,function(o){return a[o]})}function Ec(s,a){this._pairs=[],s&&ro(s,this,a)}const Xf=Ec.prototype;Xf.append=function(a,n){this._pairs.push([a,n])};Xf.toString=function(a){const n=a?function(o){return a.call(this,o,Hp)}:Hp;return this._pairs.map(function(l){return n(l[0])+"="+n(l[1])},"").join("&")};function F0(s){return encodeURIComponent(s).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Kf(s,a,n){if(!a)return s;const o=n&&n.encode||F0,l=le.isFunction(n)?{serialize:n}:n,d=l&&l.serialize;let u;if(d?u=d(a,l):u=le.isURLSearchParams(a)?a.toString():new Ec(a,l).toString(o),u){const f=s.indexOf("#");f!==-1&&(s=s.slice(0,f)),s+=(s.indexOf("?")===-1?"?":"&")+u}return s}class Vp{constructor(){this.handlers=[]}use(a,n,o){return this.handlers.push({fulfilled:a,rejected:n,synchronous:o?o.synchronous:!1,runWhen:o?o.runWhen:null}),this.handlers.length-1}eject(a){this.handlers[a]&&(this.handlers[a]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(a){le.forEach(this.handlers,function(o){o!==null&&a(o)})}}const Pc={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},B0=typeof URLSearchParams<"u"?URLSearchParams:Ec,D0=typeof FormData<"u"?FormData:null,M0=typeof Blob<"u"?Blob:null,U0={isBrowser:!0,classes:{URLSearchParams:B0,FormData:D0,Blob:M0},protocols:["http","https","file","blob","url","data"]},zc=typeof window<"u"&&typeof document<"u",mc=typeof navigator=="object"&&navigator||void 0,W0=zc&&(!mc||["ReactNative","NativeScript","NS"].indexOf(mc.product)<0),$0=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",H0=zc&&window.location.href||"http://localhost",V0=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:zc,hasStandardBrowserEnv:W0,hasStandardBrowserWebWorkerEnv:$0,navigator:mc,origin:H0},Symbol.toStringTag,{value:"Module"})),Et={...V0,...U0};function q0(s,a){return ro(s,new Et.classes.URLSearchParams,{visitor:function(n,o,l,d){return Et.isNode&&le.isBuffer(n)?(this.append(o,n.toString("base64")),!1):d.defaultVisitor.apply(this,arguments)},...a})}function G0(s){return le.matchAll(/\w+|\[(\w*)]/g,s).map(a=>a[0]==="[]"?"":a[1]||a[0])}function Y0(s){const a={},n=Object.keys(s);let o;const l=n.length;let d;for(o=0;o<l;o++)d=n[o],a[d]=s[d];return a}function Zf(s){function a(n,o,l,d){let u=n[d++];if(u==="__proto__")return!0;const f=Number.isFinite(+u),h=d>=n.length;return u=!u&&le.isArray(l)?l.length:u,h?(le.hasOwnProp(l,u)?l[u]=[l[u],o]:l[u]=o,!f):((!l[u]||!le.isObject(l[u]))&&(l[u]=[]),a(n,o,l[u],d)&&le.isArray(l[u])&&(l[u]=Y0(l[u])),!f)}if(le.isFormData(s)&&le.isFunction(s.entries)){const n={};return le.forEachEntry(s,(o,l)=>{a(G0(o),l,n,0)}),n}return null}function X0(s,a,n){if(le.isString(s))try{return(a||JSON.parse)(s),le.trim(s)}catch(o){if(o.name!=="SyntaxError")throw o}return(n||JSON.stringify)(s)}const bs={transitional:Pc,adapter:["xhr","http","fetch"],transformRequest:[function(a,n){const o=n.getContentType()||"",l=o.indexOf("application/json")>-1,d=le.isObject(a);if(d&&le.isHTMLForm(a)&&(a=new FormData(a)),le.isFormData(a))return l?JSON.stringify(Zf(a)):a;if(le.isArrayBuffer(a)||le.isBuffer(a)||le.isStream(a)||le.isFile(a)||le.isBlob(a)||le.isReadableStream(a))return a;if(le.isArrayBufferView(a))return a.buffer;if(le.isURLSearchParams(a))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),a.toString();let f;if(d){if(o.indexOf("application/x-www-form-urlencoded")>-1)return q0(a,this.formSerializer).toString();if((f=le.isFileList(a))||o.indexOf("multipart/form-data")>-1){const h=this.env&&this.env.FormData;return ro(f?{"files[]":a}:a,h&&new h,this.formSerializer)}}return d||l?(n.setContentType("application/json",!1),X0(a)):a}],transformResponse:[function(a){const n=this.transitional||bs.transitional,o=n&&n.forcedJSONParsing,l=this.responseType==="json";if(le.isResponse(a)||le.isReadableStream(a))return a;if(a&&le.isString(a)&&(o&&!this.responseType||l)){const u=!(n&&n.silentJSONParsing)&&l;try{return JSON.parse(a,this.parseReviver)}catch(f){if(u)throw f.name==="SyntaxError"?Ie.from(f,Ie.ERR_BAD_RESPONSE,this,null,this.response):f}}return a}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Et.classes.FormData,Blob:Et.classes.Blob},validateStatus:function(a){return a>=200&&a<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};le.forEach(["delete","get","head","post","put","patch"],s=>{bs.headers[s]={}});const K0=le.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Z0=s=>{const a={};let n,o,l;return s&&s.split(`
`).forEach(function(u){l=u.indexOf(":"),n=u.substring(0,l).trim().toLowerCase(),o=u.substring(l+1).trim(),!(!n||a[n]&&K0[n])&&(n==="set-cookie"?a[n]?a[n].push(o):a[n]=[o]:a[n]=a[n]?a[n]+", "+o:o)}),a},qp=Symbol("internals");function rs(s){return s&&String(s).trim().toLowerCase()}function Fi(s){return s===!1||s==null?s:le.isArray(s)?s.map(Fi):String(s)}function Q0(s){const a=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let o;for(;o=n.exec(s);)a[o[1]]=o[2];return a}const J0=s=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(s.trim());function Ql(s,a,n,o,l){if(le.isFunction(o))return o.call(this,a,n);if(l&&(a=n),!!le.isString(a)){if(le.isString(o))return a.indexOf(o)!==-1;if(le.isRegExp(o))return o.test(a)}}function ev(s){return s.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(a,n,o)=>n.toUpperCase()+o)}function tv(s,a){const n=le.toCamelCase(" "+a);["get","set","has"].forEach(o=>{Object.defineProperty(s,o+n,{value:function(l,d,u){return this[o].call(this,a,l,d,u)},configurable:!0})})}let $t=class{constructor(a){a&&this.set(a)}set(a,n,o){const l=this;function d(f,h,b){const g=rs(h);if(!g)throw new Error("header name must be a non-empty string");const j=le.findKey(l,g);(!j||l[j]===void 0||b===!0||b===void 0&&l[j]!==!1)&&(l[j||h]=Fi(f))}const u=(f,h)=>le.forEach(f,(b,g)=>d(b,g,h));if(le.isPlainObject(a)||a instanceof this.constructor)u(a,n);else if(le.isString(a)&&(a=a.trim())&&!J0(a))u(Z0(a),n);else if(le.isObject(a)&&le.isIterable(a)){let f={},h,b;for(const g of a){if(!le.isArray(g))throw TypeError("Object iterator must return a key-value pair");f[b=g[0]]=(h=f[b])?le.isArray(h)?[...h,g[1]]:[h,g[1]]:g[1]}u(f,n)}else a!=null&&d(n,a,o);return this}get(a,n){if(a=rs(a),a){const o=le.findKey(this,a);if(o){const l=this[o];if(!n)return l;if(n===!0)return Q0(l);if(le.isFunction(n))return n.call(this,l,o);if(le.isRegExp(n))return n.exec(l);throw new TypeError("parser must be boolean|regexp|function")}}}has(a,n){if(a=rs(a),a){const o=le.findKey(this,a);return!!(o&&this[o]!==void 0&&(!n||Ql(this,this[o],o,n)))}return!1}delete(a,n){const o=this;let l=!1;function d(u){if(u=rs(u),u){const f=le.findKey(o,u);f&&(!n||Ql(o,o[f],f,n))&&(delete o[f],l=!0)}}return le.isArray(a)?a.forEach(d):d(a),l}clear(a){const n=Object.keys(this);let o=n.length,l=!1;for(;o--;){const d=n[o];(!a||Ql(this,this[d],d,a,!0))&&(delete this[d],l=!0)}return l}normalize(a){const n=this,o={};return le.forEach(this,(l,d)=>{const u=le.findKey(o,d);if(u){n[u]=Fi(l),delete n[d];return}const f=a?ev(d):String(d).trim();f!==d&&delete n[d],n[f]=Fi(l),o[f]=!0}),this}concat(...a){return this.constructor.concat(this,...a)}toJSON(a){const n=Object.create(null);return le.forEach(this,(o,l)=>{o!=null&&o!==!1&&(n[l]=a&&le.isArray(o)?o.join(", "):o)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([a,n])=>a+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(a){return a instanceof this?a:new this(a)}static concat(a,...n){const o=new this(a);return n.forEach(l=>o.set(l)),o}static accessor(a){const o=(this[qp]=this[qp]={accessors:{}}).accessors,l=this.prototype;function d(u){const f=rs(u);o[f]||(tv(l,u),o[f]=!0)}return le.isArray(a)?a.forEach(d):d(a),this}};$t.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);le.reduceDescriptors($t.prototype,({value:s},a)=>{let n=a[0].toUpperCase()+a.slice(1);return{get:()=>s,set(o){this[n]=o}}});le.freezeMethods($t);function Jl(s,a){const n=this||bs,o=a||n,l=$t.from(o.headers);let d=o.data;return le.forEach(s,function(f){d=f.call(n,d,l.normalize(),a?a.status:void 0)}),l.normalize(),d}function Qf(s){return!!(s&&s.__CANCEL__)}let ys=class extends Ie{constructor(a,n,o){super(a??"canceled",Ie.ERR_CANCELED,n,o),this.name="CanceledError",this.__CANCEL__=!0}};function Jf(s,a,n){const o=n.config.validateStatus;!n.status||!o||o(n.status)?s(n):a(new Ie("Request failed with status code "+n.status,[Ie.ERR_BAD_REQUEST,Ie.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function rv(s){const a=/^([-+\w]{1,25})(:?\/\/|:)/.exec(s);return a&&a[1]||""}function nv(s,a){s=s||10;const n=new Array(s),o=new Array(s);let l=0,d=0,u;return a=a!==void 0?a:1e3,function(h){const b=Date.now(),g=o[d];u||(u=b),n[l]=h,o[l]=b;let j=d,S=0;for(;j!==l;)S+=n[j++],j=j%s;if(l=(l+1)%s,l===d&&(d=(d+1)%s),b-u<a)return;const _=g&&b-g;return _?Math.round(S*1e3/_):void 0}}function av(s,a){let n=0,o=1e3/a,l,d;const u=(b,g=Date.now())=>{n=g,l=null,d&&(clearTimeout(d),d=null),s(...b)};return[(...b)=>{const g=Date.now(),j=g-n;j>=o?u(b,g):(l=b,d||(d=setTimeout(()=>{d=null,u(l)},o-j)))},()=>l&&u(l)]}const Vi=(s,a,n=3)=>{let o=0;const l=nv(50,250);return av(d=>{const u=d.loaded,f=d.lengthComputable?d.total:void 0,h=u-o,b=l(h),g=u<=f;o=u;const j={loaded:u,total:f,progress:f?u/f:void 0,bytes:h,rate:b||void 0,estimated:b&&f&&g?(f-u)/b:void 0,event:d,lengthComputable:f!=null,[a?"download":"upload"]:!0};s(j)},n)},Gp=(s,a)=>{const n=s!=null;return[o=>a[0]({lengthComputable:n,total:s,loaded:o}),a[1]]},Yp=s=>(...a)=>le.asap(()=>s(...a)),sv=Et.hasStandardBrowserEnv?((s,a)=>n=>(n=new URL(n,Et.origin),s.protocol===n.protocol&&s.host===n.host&&(a||s.port===n.port)))(new URL(Et.origin),Et.navigator&&/(msie|trident)/i.test(Et.navigator.userAgent)):()=>!0,iv=Et.hasStandardBrowserEnv?{write(s,a,n,o,l,d,u){if(typeof document>"u")return;const f=[`${s}=${encodeURIComponent(a)}`];le.isNumber(n)&&f.push(`expires=${new Date(n).toUTCString()}`),le.isString(o)&&f.push(`path=${o}`),le.isString(l)&&f.push(`domain=${l}`),d===!0&&f.push("secure"),le.isString(u)&&f.push(`SameSite=${u}`),document.cookie=f.join("; ")},read(s){if(typeof document>"u")return null;const a=document.cookie.match(new RegExp("(?:^|; )"+s+"=([^;]*)"));return a?decodeURIComponent(a[1]):null},remove(s){this.write(s,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function ov(s){return typeof s!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(s)}function lv(s,a){return a?s.replace(/\/?\/$/,"")+"/"+a.replace(/^\/+/,""):s}function eh(s,a,n){let o=!ov(a);return s&&(o||n==!1)?lv(s,a):a}const Xp=s=>s instanceof $t?{...s}:s;function An(s,a){a=a||{};const n={};function o(b,g,j,S){return le.isPlainObject(b)&&le.isPlainObject(g)?le.merge.call({caseless:S},b,g):le.isPlainObject(g)?le.merge({},g):le.isArray(g)?g.slice():g}function l(b,g,j,S){if(le.isUndefined(g)){if(!le.isUndefined(b))return o(void 0,b,j,S)}else return o(b,g,j,S)}function d(b,g){if(!le.isUndefined(g))return o(void 0,g)}function u(b,g){if(le.isUndefined(g)){if(!le.isUndefined(b))return o(void 0,b)}else return o(void 0,g)}function f(b,g,j){if(j in a)return o(b,g);if(j in s)return o(void 0,b)}const h={url:d,method:d,data:d,baseURL:u,transformRequest:u,transformResponse:u,paramsSerializer:u,timeout:u,timeoutMessage:u,withCredentials:u,withXSRFToken:u,adapter:u,responseType:u,xsrfCookieName:u,xsrfHeaderName:u,onUploadProgress:u,onDownloadProgress:u,decompress:u,maxContentLength:u,maxBodyLength:u,beforeRedirect:u,transport:u,httpAgent:u,httpsAgent:u,cancelToken:u,socketPath:u,responseEncoding:u,validateStatus:f,headers:(b,g,j)=>l(Xp(b),Xp(g),j,!0)};return le.forEach(Object.keys({...s,...a}),function(g){if(g==="__proto__"||g==="constructor"||g==="prototype")return;const j=le.hasOwnProp(h,g)?h[g]:l,S=j(s[g],a[g],g);le.isUndefined(S)&&j!==f||(n[g]=S)}),n}const th=s=>{const a=An({},s);let{data:n,withXSRFToken:o,xsrfHeaderName:l,xsrfCookieName:d,headers:u,auth:f}=a;if(a.headers=u=$t.from(u),a.url=Kf(eh(a.baseURL,a.url,a.allowAbsoluteUrls),s.params,s.paramsSerializer),f&&u.set("Authorization","Basic "+btoa((f.username||"")+":"+(f.password?unescape(encodeURIComponent(f.password)):""))),le.isFormData(n)){if(Et.hasStandardBrowserEnv||Et.hasStandardBrowserWebWorkerEnv)u.setContentType(void 0);else if(le.isFunction(n.getHeaders)){const h=n.getHeaders(),b=["content-type","content-length"];Object.entries(h).forEach(([g,j])=>{b.includes(g.toLowerCase())&&u.set(g,j)})}}if(Et.hasStandardBrowserEnv&&(o&&le.isFunction(o)&&(o=o(a)),o||o!==!1&&sv(a.url))){const h=l&&d&&iv.read(d);h&&u.set(l,h)}return a},cv=typeof XMLHttpRequest<"u",dv=cv&&function(s){return new Promise(function(n,o){const l=th(s);let d=l.data;const u=$t.from(l.headers).normalize();let{responseType:f,onUploadProgress:h,onDownloadProgress:b}=l,g,j,S,_,w;function x(){_&&_(),w&&w(),l.cancelToken&&l.cancelToken.unsubscribe(g),l.signal&&l.signal.removeEventListener("abort",g)}let v=new XMLHttpRequest;v.open(l.method.toUpperCase(),l.url,!0),v.timeout=l.timeout;function N(){if(!v)return;const T=$t.from("getAllResponseHeaders"in v&&v.getAllResponseHeaders()),L={data:!f||f==="text"||f==="json"?v.responseText:v.response,status:v.status,statusText:v.statusText,headers:T,config:s,request:v};Jf(function(M){n(M),x()},function(M){o(M),x()},L),v=null}"onloadend"in v?v.onloadend=N:v.onreadystatechange=function(){!v||v.readyState!==4||v.status===0&&!(v.responseURL&&v.responseURL.indexOf("file:")===0)||setTimeout(N)},v.onabort=function(){v&&(o(new Ie("Request aborted",Ie.ECONNABORTED,s,v)),v=null)},v.onerror=function(C){const L=C&&C.message?C.message:"Network Error",F=new Ie(L,Ie.ERR_NETWORK,s,v);F.event=C||null,o(F),v=null},v.ontimeout=function(){let C=l.timeout?"timeout of "+l.timeout+"ms exceeded":"timeout exceeded";const L=l.transitional||Pc;l.timeoutErrorMessage&&(C=l.timeoutErrorMessage),o(new Ie(C,L.clarifyTimeoutError?Ie.ETIMEDOUT:Ie.ECONNABORTED,s,v)),v=null},d===void 0&&u.setContentType(null),"setRequestHeader"in v&&le.forEach(u.toJSON(),function(C,L){v.setRequestHeader(L,C)}),le.isUndefined(l.withCredentials)||(v.withCredentials=!!l.withCredentials),f&&f!=="json"&&(v.responseType=l.responseType),b&&([S,w]=Vi(b,!0),v.addEventListener("progress",S)),h&&v.upload&&([j,_]=Vi(h),v.upload.addEventListener("progress",j),v.upload.addEventListener("loadend",_)),(l.cancelToken||l.signal)&&(g=T=>{v&&(o(!T||T.type?new ys(null,s,v):T),v.abort(),v=null)},l.cancelToken&&l.cancelToken.subscribe(g),l.signal&&(l.signal.aborted?g():l.signal.addEventListener("abort",g)));const P=rv(l.url);if(P&&Et.protocols.indexOf(P)===-1){o(new Ie("Unsupported protocol "+P+":",Ie.ERR_BAD_REQUEST,s));return}v.send(d||null)})},uv=(s,a)=>{const{length:n}=s=s?s.filter(Boolean):[];if(a||n){let o=new AbortController,l;const d=function(b){if(!l){l=!0,f();const g=b instanceof Error?b:this.reason;o.abort(g instanceof Ie?g:new ys(g instanceof Error?g.message:g))}};let u=a&&setTimeout(()=>{u=null,d(new Ie(`timeout of ${a}ms exceeded`,Ie.ETIMEDOUT))},a);const f=()=>{s&&(u&&clearTimeout(u),u=null,s.forEach(b=>{b.unsubscribe?b.unsubscribe(d):b.removeEventListener("abort",d)}),s=null)};s.forEach(b=>b.addEventListener("abort",d));const{signal:h}=o;return h.unsubscribe=()=>le.asap(f),h}},pv=function*(s,a){let n=s.byteLength;if(n<a){yield s;return}let o=0,l;for(;o<n;)l=o+a,yield s.slice(o,l),o=l},fv=async function*(s,a){for await(const n of hv(s))yield*pv(n,a)},hv=async function*(s){if(s[Symbol.asyncIterator]){yield*s;return}const a=s.getReader();try{for(;;){const{done:n,value:o}=await a.read();if(n)break;yield o}}finally{await a.cancel()}},Kp=(s,a,n,o)=>{const l=fv(s,a);let d=0,u,f=h=>{u||(u=!0,o&&o(h))};return new ReadableStream({async pull(h){try{const{done:b,value:g}=await l.next();if(b){f(),h.close();return}let j=g.byteLength;if(n){let S=d+=j;n(S)}h.enqueue(new Uint8Array(g))}catch(b){throw f(b),b}},cancel(h){return f(h),l.return()}},{highWaterMark:2})},Zp=64*1024,{isFunction:zi}=le,mv=(({Request:s,Response:a})=>({Request:s,Response:a}))(le.global),{ReadableStream:Qp,TextEncoder:Jp}=le.global,ef=(s,...a)=>{try{return!!s(...a)}catch{return!1}},gv=s=>{s=le.merge.call({skipUndefined:!0},mv,s);const{fetch:a,Request:n,Response:o}=s,l=a?zi(a):typeof fetch=="function",d=zi(n),u=zi(o);if(!l)return!1;const f=l&&zi(Qp),h=l&&(typeof Jp=="function"?(w=>x=>w.encode(x))(new Jp):async w=>new Uint8Array(await new n(w).arrayBuffer())),b=d&&f&&ef(()=>{let w=!1;const x=new n(Et.origin,{body:new Qp,method:"POST",get duplex(){return w=!0,"half"}}).headers.has("Content-Type");return w&&!x}),g=u&&f&&ef(()=>le.isReadableStream(new o("").body)),j={stream:g&&(w=>w.body)};l&&["text","arrayBuffer","blob","formData","stream"].forEach(w=>{!j[w]&&(j[w]=(x,v)=>{let N=x&&x[w];if(N)return N.call(x);throw new Ie(`Response type '${w}' is not supported`,Ie.ERR_NOT_SUPPORT,v)})});const S=async w=>{if(w==null)return 0;if(le.isBlob(w))return w.size;if(le.isSpecCompliantForm(w))return(await new n(Et.origin,{method:"POST",body:w}).arrayBuffer()).byteLength;if(le.isArrayBufferView(w)||le.isArrayBuffer(w))return w.byteLength;if(le.isURLSearchParams(w)&&(w=w+""),le.isString(w))return(await h(w)).byteLength},_=async(w,x)=>{const v=le.toFiniteNumber(w.getContentLength());return v??S(x)};return async w=>{let{url:x,method:v,data:N,signal:P,cancelToken:T,timeout:C,onDownloadProgress:L,onUploadProgress:F,responseType:M,headers:G,withCredentials:H="same-origin",fetchOptions:pe}=th(w),te=a||fetch;M=M?(M+"").toLowerCase():"text";let A=uv([P,T&&T.toAbortSignal()],C),K=null;const k=A&&A.unsubscribe&&(()=>{A.unsubscribe()});let se;try{if(F&&b&&v!=="get"&&v!=="head"&&(se=await _(G,N))!==0){let R=new n(x,{method:"POST",body:N,duplex:"half"}),z;if(le.isFormData(N)&&(z=R.headers.get("content-type"))&&G.setContentType(z),R.body){const[J,ie]=Gp(se,Vi(Yp(F)));N=Kp(R.body,Zp,J,ie)}}le.isString(H)||(H=H?"include":"omit");const ye=d&&"credentials"in n.prototype,re={...pe,signal:A,method:v.toUpperCase(),headers:G.normalize().toJSON(),body:N,duplex:"half",credentials:ye?H:void 0};K=d&&new n(x,re);let W=await(d?te(K,pe):te(x,re));const X=g&&(M==="stream"||M==="response");if(g&&(L||X&&k)){const R={};["status","statusText","headers"].forEach(oe=>{R[oe]=W[oe]});const z=le.toFiniteNumber(W.headers.get("content-length")),[J,ie]=L&&Gp(z,Vi(Yp(L),!0))||[];W=new o(Kp(W.body,Zp,J,()=>{ie&&ie(),k&&k()}),R)}M=M||"text";let ne=await j[le.findKey(j,M)||"text"](W,w);return!X&&k&&k(),await new Promise((R,z)=>{Jf(R,z,{data:ne,headers:$t.from(W.headers),status:W.status,statusText:W.statusText,config:w,request:K})})}catch(ye){throw k&&k(),ye&&ye.name==="TypeError"&&/Load failed|fetch/i.test(ye.message)?Object.assign(new Ie("Network Error",Ie.ERR_NETWORK,w,K,ye&&ye.response),{cause:ye.cause||ye}):Ie.from(ye,ye&&ye.code,w,K,ye&&ye.response)}}},xv=new Map,rh=s=>{let a=s&&s.env||{};const{fetch:n,Request:o,Response:l}=a,d=[o,l,n];let u=d.length,f=u,h,b,g=xv;for(;f--;)h=d[f],b=g.get(h),b===void 0&&g.set(h,b=f?new Map:gv(a)),g=b;return b};rh();const Rc={http:L0,xhr:dv,fetch:{get:rh}};le.forEach(Rc,(s,a)=>{if(s){try{Object.defineProperty(s,"name",{value:a})}catch{}Object.defineProperty(s,"adapterName",{value:a})}});const tf=s=>`- ${s}`,vv=s=>le.isFunction(s)||s===null||s===!1;function bv(s,a){s=le.isArray(s)?s:[s];const{length:n}=s;let o,l;const d={};for(let u=0;u<n;u++){o=s[u];let f;if(l=o,!vv(o)&&(l=Rc[(f=String(o)).toLowerCase()],l===void 0))throw new Ie(`Unknown adapter '${f}'`);if(l&&(le.isFunction(l)||(l=l.get(a))))break;d[f||"#"+u]=l}if(!l){const u=Object.entries(d).map(([h,b])=>`adapter ${h} `+(b===!1?"is not supported by the environment":"is not available in the build"));let f=n?u.length>1?`since :
`+u.map(tf).join(`
`):" "+tf(u[0]):"as no adapter specified";throw new Ie("There is no suitable adapter to dispatch the request "+f,"ERR_NOT_SUPPORT")}return l}const nh={getAdapter:bv,adapters:Rc};function ec(s){if(s.cancelToken&&s.cancelToken.throwIfRequested(),s.signal&&s.signal.aborted)throw new ys(null,s)}function rf(s){return ec(s),s.headers=$t.from(s.headers),s.data=Jl.call(s,s.transformRequest),["post","put","patch"].indexOf(s.method)!==-1&&s.headers.setContentType("application/x-www-form-urlencoded",!1),nh.getAdapter(s.adapter||bs.adapter,s)(s).then(function(o){return ec(s),o.data=Jl.call(s,s.transformResponse,o),o.headers=$t.from(o.headers),o},function(o){return Qf(o)||(ec(s),o&&o.response&&(o.response.data=Jl.call(s,s.transformResponse,o.response),o.response.headers=$t.from(o.response.headers))),Promise.reject(o)})}const ah="1.13.5",no={};["object","boolean","number","function","string","symbol"].forEach((s,a)=>{no[s]=function(o){return typeof o===s||"a"+(a<1?"n ":" ")+s}});const nf={};no.transitional=function(a,n,o){function l(d,u){return"[Axios v"+ah+"] Transitional option '"+d+"'"+u+(o?". "+o:"")}return(d,u,f)=>{if(a===!1)throw new Ie(l(u," has been removed"+(n?" in "+n:"")),Ie.ERR_DEPRECATED);return n&&!nf[u]&&(nf[u]=!0,console.warn(l(u," has been deprecated since v"+n+" and will be removed in the near future"))),a?a(d,u,f):!0}};no.spelling=function(a){return(n,o)=>(console.warn(`${o} is likely a misspelling of ${a}`),!0)};function yv(s,a,n){if(typeof s!="object")throw new Ie("options must be an object",Ie.ERR_BAD_OPTION_VALUE);const o=Object.keys(s);let l=o.length;for(;l-- >0;){const d=o[l],u=a[d];if(u){const f=s[d],h=f===void 0||u(f,d,s);if(h!==!0)throw new Ie("option "+d+" must be "+h,Ie.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new Ie("Unknown option "+d,Ie.ERR_BAD_OPTION)}}const Bi={assertOptions:yv,validators:no},ir=Bi.validators;let Rn=class{constructor(a){this.defaults=a||{},this.interceptors={request:new Vp,response:new Vp}}async request(a,n){try{return await this._request(a,n)}catch(o){if(o instanceof Error){let l={};Error.captureStackTrace?Error.captureStackTrace(l):l=new Error;const d=l.stack?l.stack.replace(/^.+\n/,""):"";try{o.stack?d&&!String(o.stack).endsWith(d.replace(/^.+\n.+\n/,""))&&(o.stack+=`
`+d):o.stack=d}catch{}}throw o}}_request(a,n){typeof a=="string"?(n=n||{},n.url=a):n=a||{},n=An(this.defaults,n);const{transitional:o,paramsSerializer:l,headers:d}=n;o!==void 0&&Bi.assertOptions(o,{silentJSONParsing:ir.transitional(ir.boolean),forcedJSONParsing:ir.transitional(ir.boolean),clarifyTimeoutError:ir.transitional(ir.boolean),legacyInterceptorReqResOrdering:ir.transitional(ir.boolean)},!1),l!=null&&(le.isFunction(l)?n.paramsSerializer={serialize:l}:Bi.assertOptions(l,{encode:ir.function,serialize:ir.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),Bi.assertOptions(n,{baseUrl:ir.spelling("baseURL"),withXsrfToken:ir.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let u=d&&le.merge(d.common,d[n.method]);d&&le.forEach(["delete","get","head","post","put","patch","common"],w=>{delete d[w]}),n.headers=$t.concat(u,d);const f=[];let h=!0;this.interceptors.request.forEach(function(x){if(typeof x.runWhen=="function"&&x.runWhen(n)===!1)return;h=h&&x.synchronous;const v=n.transitional||Pc;v&&v.legacyInterceptorReqResOrdering?f.unshift(x.fulfilled,x.rejected):f.push(x.fulfilled,x.rejected)});const b=[];this.interceptors.response.forEach(function(x){b.push(x.fulfilled,x.rejected)});let g,j=0,S;if(!h){const w=[rf.bind(this),void 0];for(w.unshift(...f),w.push(...b),S=w.length,g=Promise.resolve(n);j<S;)g=g.then(w[j++],w[j++]);return g}S=f.length;let _=n;for(;j<S;){const w=f[j++],x=f[j++];try{_=w(_)}catch(v){x.call(this,v);break}}try{g=rf.call(this,_)}catch(w){return Promise.reject(w)}for(j=0,S=b.length;j<S;)g=g.then(b[j++],b[j++]);return g}getUri(a){a=An(this.defaults,a);const n=eh(a.baseURL,a.url,a.allowAbsoluteUrls);return Kf(n,a.params,a.paramsSerializer)}};le.forEach(["delete","get","head","options"],function(a){Rn.prototype[a]=function(n,o){return this.request(An(o||{},{method:a,url:n,data:(o||{}).data}))}});le.forEach(["post","put","patch"],function(a){function n(o){return function(d,u,f){return this.request(An(f||{},{method:a,headers:o?{"Content-Type":"multipart/form-data"}:{},url:d,data:u}))}}Rn.prototype[a]=n(),Rn.prototype[a+"Form"]=n(!0)});let wv=class sh{constructor(a){if(typeof a!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(d){n=d});const o=this;this.promise.then(l=>{if(!o._listeners)return;let d=o._listeners.length;for(;d-- >0;)o._listeners[d](l);o._listeners=null}),this.promise.then=l=>{let d;const u=new Promise(f=>{o.subscribe(f),d=f}).then(l);return u.cancel=function(){o.unsubscribe(d)},u},a(function(d,u,f){o.reason||(o.reason=new ys(d,u,f),n(o.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(a){if(this.reason){a(this.reason);return}this._listeners?this._listeners.push(a):this._listeners=[a]}unsubscribe(a){if(!this._listeners)return;const n=this._listeners.indexOf(a);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const a=new AbortController,n=o=>{a.abort(o)};return this.subscribe(n),a.signal.unsubscribe=()=>this.unsubscribe(n),a.signal}static source(){let a;return{token:new sh(function(l){a=l}),cancel:a}}};function jv(s){return function(n){return s.apply(null,n)}}function kv(s){return le.isObject(s)&&s.isAxiosError===!0}const gc={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(gc).forEach(([s,a])=>{gc[a]=s});function ih(s){const a=new Rn(s),n=Df(Rn.prototype.request,a);return le.extend(n,Rn.prototype,a,{allOwnKeys:!0}),le.extend(n,a,null,{allOwnKeys:!0}),n.create=function(l){return ih(An(s,l))},n}const st=ih(bs);st.Axios=Rn;st.CanceledError=ys;st.CancelToken=wv;st.isCancel=Qf;st.VERSION=ah;st.toFormData=ro;st.AxiosError=Ie;st.Cancel=st.CanceledError;st.all=function(a){return Promise.all(a)};st.spread=jv;st.isAxiosError=kv;st.mergeConfig=An;st.AxiosHeaders=$t;st.formToJSON=s=>Zf(le.isHTMLForm(s)?new FormData(s):s);st.getAdapter=nh.getAdapter;st.HttpStatusCode=gc;st.default=st;const{Axios:E1,AxiosError:P1,CanceledError:z1,isCancel:R1,CancelToken:T1,VERSION:A1,all:L1,Cancel:O1,isAxiosError:I1,spread:F1,toFormData:B1,AxiosHeaders:D1,HttpStatusCode:M1,formToJSON:U1,getAdapter:W1,mergeConfig:$1}=st,jt="http://localhost/gs-Job/backend/api",He=st.create({baseURL:jt});He.interceptors.request.use(s=>{const a=localStorage.getItem("gs_admin_token");return a&&(s.headers.Authorization=`Bearer ${a}`),s});const Nv=s=>He.post("/auth.php?action=login",s),af=s=>He.post("/auth.php?action=identify",s),_v=s=>He.post("/auth.php?action=send-recovery",s),oh=s=>He.get(`/auth.php?action=verify-reset-token&token=${s}`),lh=s=>He.post("/auth.php?action=reset-password-with-token",s),Sv=()=>He.get("/auth.php?action=verify"),In=()=>He.get("/companies.php?action=list"),ch=(s={})=>{const a=new URLSearchParams(s).toString();return He.get(`/vacancies.php?action=list&${a}`)},dh=s=>He.get(`/vacancies.php?action=get&id=${s}`),Tc=(s={})=>{const a=new URLSearchParams(s).toString();return He.get(`/vacancies.php?action=all&${a}`)},Cv=s=>He.post("/vacancies.php?action=create",s),Ev=s=>He.post("/vacancies.php?action=update",s),Pv=s=>He.post("/vacancies.php?action=delete",s),zv=s=>He.post("/applications.php?action=apply",s,{headers:{"Content-Type":"multipart/form-data"}}),Rv=(s={})=>{const a=new URLSearchParams(s).toString();return He.get(`/applications.php?action=list&${a}`)},Tv=s=>He.post("/applications.php?action=update_status",s),Av=s=>{const a=new FormData;return Object.entries(s).forEach(([n,o])=>a.append(n,o)),He.post("/applications.php",a,{params:{action:"delete"}})},Lv=s=>{const a=new FormData;return s.ids&&Array.isArray(s.ids)&&s.ids.forEach(n=>a.append("ids[]",n)),He.post("/applications.php",a,{params:{action:"bulk_delete"}})},Ov=(s={})=>{const a=new URLSearchParams(s).toString();return He.get(`/applications.php?action=get_suggestions&${a}`)},Iv=(s={})=>{const a=new URLSearchParams(s).toString();return He.get(`/applications.php?action=get_candidate_count&${a}`)},Fv=(s={})=>{const a=new URLSearchParams(s).toString();return He.get(`/applications.php?action=get_matching_candidates&${a}`)},Bv=(s={})=>{const a=new URLSearchParams(s).toString();return He.get(`/applications.php?action=get_talent_pool&${a}`)},sf=s=>{const a=new FormData;return Object.entries(s).forEach(([n,o])=>a.append(n,o)),He.post("/applications.php",a,{params:{action:"update_candidate_tags"}})},Dv=(s={})=>{const a=new URLSearchParams(s).toString();return He.get(`/applications.php?action=export&${a}`,{responseType:"blob"})},uh=()=>He.get("/applications.php?action=stats"),Mv=()=>He.get("/admins.php?action=list"),Uv=s=>He.post("/admins.php?action=create",s),Wv=s=>He.post("/admins.php?action=update",s),$v=s=>He.post("/admins.php?action=delete",s),Hv=s=>He.post("/admins.php?action=reset-password",s),Ac=["0-1 years","1-3 years","3-5 years","5-10 years","10+ years"],Vv=["0-1 years","1-3 years","3-5 years","5-10 years","10+ years"],ph=["O/L","A/L","Diploma","Bachelors Degree","Masters Degree","PhD","Professional Certification"],qv=["Full-Time","Part-Time","Contract","Internship"],br=s=>s?new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"",Pr=s=>{const a=new Date(s)-new Date;return Math.max(0,Math.ceil(a/(1e3*60*60*24)))};var fh={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},of=Ue.createContext&&Ue.createContext(fh),Gv=["attr","size","title"];function Yv(s,a){if(s==null)return{};var n=Xv(s,a),o,l;if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(s);for(l=0;l<d.length;l++)o=d[l],!(a.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(s,o)&&(n[o]=s[o])}return n}function Xv(s,a){if(s==null)return{};var n={};for(var o in s)if(Object.prototype.hasOwnProperty.call(s,o)){if(a.indexOf(o)>=0)continue;n[o]=s[o]}return n}function qi(){return qi=Object.assign?Object.assign.bind():function(s){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(s[o]=n[o])}return s},qi.apply(this,arguments)}function lf(s,a){var n=Object.keys(s);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(s);a&&(o=o.filter(function(l){return Object.getOwnPropertyDescriptor(s,l).enumerable})),n.push.apply(n,o)}return n}function Gi(s){for(var a=1;a<arguments.length;a++){var n=arguments[a]!=null?arguments[a]:{};a%2?lf(Object(n),!0).forEach(function(o){Kv(s,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(n)):lf(Object(n)).forEach(function(o){Object.defineProperty(s,o,Object.getOwnPropertyDescriptor(n,o))})}return s}function Kv(s,a,n){return a=Zv(a),a in s?Object.defineProperty(s,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):s[a]=n,s}function Zv(s){var a=Qv(s,"string");return typeof a=="symbol"?a:a+""}function Qv(s,a){if(typeof s!="object"||!s)return s;var n=s[Symbol.toPrimitive];if(n!==void 0){var o=n.call(s,a);if(typeof o!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(a==="string"?String:Number)(s)}function hh(s){return s&&s.map((a,n)=>Ue.createElement(a.tag,Gi({key:n},a.attr),hh(a.child)))}function Ae(s){return a=>Ue.createElement(Jv,qi({attr:Gi({},s.attr)},a),hh(s.child))}function Jv(s){var a=n=>{var{attr:o,size:l,title:d}=s,u=Yv(s,Gv),f=l||n.size||"1em",h;return n.className&&(h=n.className),s.className&&(h=(h?h+" ":"")+s.className),Ue.createElement("svg",qi({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,o,u,{className:h,style:Gi(Gi({color:s.color||n.color},n.style),s.style),height:f,width:f,xmlns:"http://www.w3.org/2000/svg"}),d&&Ue.createElement("title",null,d),s.children)};return of!==void 0?Ue.createElement(of.Consumer,null,n=>a(n)):a(fh)}function mh(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"22 12 18 12 15 21 9 3 6 12 2 12"},child:[]}]})(s)}function Ln(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"12",y1:"8",x2:"12",y2:"12"},child:[]},{tag:"line",attr:{x1:"12",y1:"16",x2:"12.01",y2:"16"},child:[]}]})(s)}function Mr(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"19",y1:"12",x2:"5",y2:"12"},child:[]},{tag:"polyline",attr:{points:"12 19 5 12 12 5"},child:[]}]})(s)}function On(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"},child:[]},{tag:"polyline",attr:{points:"12 5 19 12 12 19"},child:[]}]})(s)}function gh(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"8",r:"7"},child:[]},{tag:"polyline",attr:{points:"8.21 13.89 7 23 12 20 17 23 15.79 13.88"},child:[]}]})(s)}function eb(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"20",x2:"18",y2:"10"},child:[]},{tag:"line",attr:{x1:"12",y1:"20",x2:"12",y2:"4"},child:[]},{tag:"line",attr:{x1:"6",y1:"20",x2:"6",y2:"14"},child:[]}]})(s)}function tb(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"20",x2:"12",y2:"10"},child:[]},{tag:"line",attr:{x1:"18",y1:"20",x2:"18",y2:"4"},child:[]},{tag:"line",attr:{x1:"6",y1:"20",x2:"6",y2:"16"},child:[]}]})(s)}function xh(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"},child:[]},{tag:"path",attr:{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"},child:[]}]})(s)}function Ht(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"2",y:"7",width:"20",height:"14",rx:"2",ry:"2"},child:[]},{tag:"path",attr:{d:"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"},child:[]}]})(s)}function or(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"},child:[]},{tag:"line",attr:{x1:"16",y1:"2",x2:"16",y2:"6"},child:[]},{tag:"line",attr:{x1:"8",y1:"2",x2:"8",y2:"6"},child:[]},{tag:"line",attr:{x1:"3",y1:"10",x2:"21",y2:"10"},child:[]}]})(s)}function Zt(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"},child:[]},{tag:"polyline",attr:{points:"22 4 12 14.01 9 11.01"},child:[]}]})(s)}function Di(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"20 6 9 17 4 12"},child:[]}]})(s)}function ao(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"15 18 9 12 15 6"},child:[]}]})(s)}function Dr(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"9 18 15 12 9 6"},child:[]}]})(s)}function fn(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"polyline",attr:{points:"12 6 12 12 16 14"},child:[]}]})(s)}function rb(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"},child:[]},{tag:"path",attr:{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"},child:[]}]})(s)}function nb(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"1",x2:"12",y2:"23"},child:[]},{tag:"path",attr:{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"},child:[]}]})(s)}function ss(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"},child:[]},{tag:"polyline",attr:{points:"7 10 12 15 17 10"},child:[]},{tag:"line",attr:{x1:"12",y1:"15",x2:"12",y2:"3"},child:[]}]})(s)}function xc(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"},child:[]}]})(s)}function cs(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"},child:[]},{tag:"polyline",attr:{points:"15 3 21 3 21 9"},child:[]},{tag:"line",attr:{x1:"10",y1:"14",x2:"21",y2:"3"},child:[]}]})(s)}function ab(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"},child:[]},{tag:"circle",attr:{cx:"12",cy:"12",r:"3"},child:[]}]})(s)}function Lc(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"},child:[]}]})(s)}function yr(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"},child:[]},{tag:"polyline",attr:{points:"14 2 14 8 20 8"},child:[]},{tag:"line",attr:{x1:"16",y1:"13",x2:"8",y2:"13"},child:[]},{tag:"line",attr:{x1:"16",y1:"17",x2:"8",y2:"17"},child:[]},{tag:"polyline",attr:{points:"10 9 9 9 8 9"},child:[]}]})(s)}function Oc(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"},child:[]}]})(s)}function ds(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"2",y1:"12",x2:"22",y2:"12"},child:[]},{tag:"path",attr:{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"},child:[]}]})(s)}function sb(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"3",width:"7",height:"7"},child:[]},{tag:"rect",attr:{x:"14",y:"3",width:"7",height:"7"},child:[]},{tag:"rect",attr:{x:"14",y:"14",width:"7",height:"7"},child:[]},{tag:"rect",attr:{x:"3",y:"14",width:"7",height:"7"},child:[]}]})(s)}function ib(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"4",y1:"9",x2:"20",y2:"9"},child:[]},{tag:"line",attr:{x1:"4",y1:"15",x2:"20",y2:"15"},child:[]},{tag:"line",attr:{x1:"10",y1:"3",x2:"8",y2:"21"},child:[]},{tag:"line",attr:{x1:"16",y1:"3",x2:"14",y2:"21"},child:[]}]})(s)}function Ic(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"},child:[]},{tag:"polyline",attr:{points:"9 22 9 12 15 12 15 22"},child:[]}]})(s)}function vh(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"12",y1:"16",x2:"12",y2:"12"},child:[]},{tag:"line",attr:{x1:"12",y1:"8",x2:"12.01",y2:"8"},child:[]}]})(s)}function cf(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"},child:[]}]})(s)}function ob(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"12 2 2 7 12 12 22 7 12 2"},child:[]},{tag:"polyline",attr:{points:"2 17 12 22 22 17"},child:[]},{tag:"polyline",attr:{points:"2 12 12 17 22 12"},child:[]}]})(s)}function Fc(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"},child:[]},{tag:"rect",attr:{x:"2",y:"9",width:"4",height:"12"},child:[]},{tag:"circle",attr:{cx:"4",cy:"4",r:"2"},child:[]}]})(s)}function da(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"},child:[]},{tag:"path",attr:{d:"M7 11V7a5 5 0 0 1 10 0v4"},child:[]}]})(s)}function lb(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"},child:[]},{tag:"polyline",attr:{points:"16 17 21 12 16 7"},child:[]},{tag:"line",attr:{x1:"21",y1:"12",x2:"9",y2:"12"},child:[]}]})(s)}function lr(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"},child:[]},{tag:"polyline",attr:{points:"22,6 12,13 2,6"},child:[]}]})(s)}function wr(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"},child:[]},{tag:"circle",attr:{cx:"12",cy:"10",r:"3"},child:[]}]})(s)}function so(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"3",y1:"12",x2:"21",y2:"12"},child:[]},{tag:"line",attr:{x1:"3",y1:"6",x2:"21",y2:"6"},child:[]},{tag:"line",attr:{x1:"3",y1:"18",x2:"21",y2:"18"},child:[]}]})(s)}function Bc(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"},child:[]}]})(s)}function us(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"5",x2:"12",y2:"19"},child:[]},{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"},child:[]}]})(s)}function cb(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"},child:[]},{tag:"polyline",attr:{points:"17 21 17 13 7 13 7 21"},child:[]},{tag:"polyline",attr:{points:"7 3 7 8 15 8"},child:[]}]})(s)}function ua(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"11",cy:"11",r:"8"},child:[]},{tag:"line",attr:{x1:"21",y1:"21",x2:"16.65",y2:"16.65"},child:[]}]})(s)}function tc(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"22",y1:"2",x2:"11",y2:"13"},child:[]},{tag:"polygon",attr:{points:"22 2 15 22 11 13 2 9 22 2"},child:[]}]})(s)}function At(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"},child:[]}]})(s)}function db(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"},child:[]},{tag:"line",attr:{x1:"7",y1:"7",x2:"7.01",y2:"7"},child:[]}]})(s)}function ps(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"circle",attr:{cx:"12",cy:"12",r:"6"},child:[]},{tag:"circle",attr:{cx:"12",cy:"12",r:"2"},child:[]}]})(s)}function fs(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"3 6 5 6 21 6"},child:[]},{tag:"path",attr:{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"},child:[]},{tag:"line",attr:{x1:"10",y1:"11",x2:"10",y2:"17"},child:[]},{tag:"line",attr:{x1:"14",y1:"11",x2:"14",y2:"17"},child:[]}]})(s)}function bh(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"23 6 13.5 15.5 8.5 10.5 1 18"},child:[]},{tag:"polyline",attr:{points:"17 6 23 6 23 12"},child:[]}]})(s)}function ub(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"},child:[]},{tag:"polyline",attr:{points:"17 8 12 3 7 8"},child:[]},{tag:"line",attr:{x1:"12",y1:"3",x2:"12",y2:"15"},child:[]}]})(s)}function vc(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"8.5",cy:"7",r:"4"},child:[]},{tag:"polyline",attr:{points:"17 11 19 13 23 9"},child:[]}]})(s)}function pb(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"8.5",cy:"7",r:"4"},child:[]},{tag:"line",attr:{x1:"20",y1:"8",x2:"20",y2:"14"},child:[]},{tag:"line",attr:{x1:"23",y1:"11",x2:"17",y2:"11"},child:[]}]})(s)}function cr(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"12",cy:"7",r:"4"},child:[]}]})(s)}function dr(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"9",cy:"7",r:"4"},child:[]},{tag:"path",attr:{d:"M23 21v-2a4 4 0 0 0-3-3.87"},child:[]},{tag:"path",attr:{d:"M16 3.13a4 4 0 0 1 0 7.75"},child:[]}]})(s)}function fb(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"23 7 16 12 23 17 23 7"},child:[]},{tag:"rect",attr:{x:"1",y:"5",width:"15",height:"14",rx:"2",ry:"2"},child:[]}]})(s)}function hb(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"15",y1:"9",x2:"9",y2:"15"},child:[]},{tag:"line",attr:{x1:"9",y1:"9",x2:"15",y2:"15"},child:[]}]})(s)}function bt(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"6",x2:"6",y2:"18"},child:[]},{tag:"line",attr:{x1:"6",y1:"6",x2:"18",y2:"18"},child:[]}]})(s)}function mb(s){return Ae({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"},child:[]}]})(s)}const df=jt.replace("/api","");function gb(){const[s,a]=U.useState([]),[n,o]=U.useState([]),[l,d]=U.useState(!0),[u,f]=U.useState(!1);Ot(),U.useEffect(()=>{(async()=>{var j,S;try{const[_,w]=await Promise.all([ch({limit:3}),In()]);a(((j=_==null?void 0:_.data)==null?void 0:j.data)||[]),o(((S=w==null?void 0:w.data)==null?void 0:S.data)||[])}catch(_){console.error(_)}finally{d(!1)}})();const g=new IntersectionObserver(j=>{j.forEach(S=>{S.isIntersecting&&S.target.classList.add("visible")})},{threshold:.1});return document.querySelectorAll(".animate-on-scroll").forEach(j=>g.observe(j)),()=>g.disconnect()},[]);const h=()=>f(!1);return t.jsxs("div",{className:"public-page home-landing",children:[t.jsxs("nav",{className:"navbar",children:[t.jsxs(qe,{to:"/",className:"navbar-brand",children:[t.jsx("img",{src:"/gs-logo.png",alt:"George Steuart & Co",className:"navbar-logo"}),t.jsxs("div",{children:[t.jsx("div",{className:"navbar-title",children:"George Steuart"}),t.jsx("div",{className:"navbar-subtitle",children:"Careers"})]})]}),t.jsxs("div",{className:`navbar-links ${u?"open":""}`,children:[t.jsx(qe,{to:"/",className:"navbar-link active",onClick:h,children:"Home"}),t.jsx(qe,{to:"/vacancies",className:"navbar-link",onClick:h,children:"Vacancies"}),t.jsx(qe,{to:"/admin/login",className:"navbar-link btn-primary",onClick:h,children:"Admin Portal"})]}),t.jsx("button",{className:"mobile-menu-btn",onClick:()=>f(b=>!b),children:u?t.jsx(bt,{}):t.jsx(so,{})})]}),t.jsxs("section",{className:"hero",children:[t.jsx("div",{className:"hero-bg-accent pulse"}),t.jsx("div",{className:"hero-bg-accent-2"}),t.jsxs("div",{className:"hero-inner",children:[t.jsxs("div",{className:"hero-left",children:[t.jsxs("div",{className:"hero-badge animate-fade-in",children:[t.jsx(gh,{className:"badge-icon"}),t.jsx("span",{children:"ESTD. 1835 — 190 Years of Trust"})]}),t.jsxs("h1",{className:"hero-title animate-slide-up",children:["Build Your Legacy ",t.jsx("br",{}),t.jsx("span",{className:"title-accent",children:"With George Steuart"})]}),t.jsx("p",{className:"hero-subtitle animate-slide-up",children:"Join Sri Lanka's oldest mercantile firm and be part of a 185-year heritage of excellence. We don't just offer jobs; we offer the chance to shape history."}),t.jsxs("div",{className:"hero-actions animate-slide-up",children:[t.jsxs(qe,{to:"/vacancies",className:"btn btn-gold btn-lg",children:["View Open Vacancies ",t.jsx(On,{})]}),t.jsx("a",{href:"#heritage",className:"btn btn-outline btn-lg",children:"Our Story"})]})]}),t.jsx("div",{className:"hero-right",children:t.jsxs("div",{className:"hero-image-wrapper",children:[t.jsx("div",{className:"image-frame-decoration"}),t.jsx("img",{src:"/hero-bg.jpg",alt:"George Steuart Heritage & Team",className:"hero-team-image"}),t.jsxs("div",{className:"hero-floating-card animate-float",children:[t.jsx(dr,{}),t.jsxs("div",{children:[t.jsx("strong",{children:"1,500+"}),t.jsx("span",{children:"Global Team"})]})]})]})})]}),t.jsxs("div",{className:"hero-stats-bar",children:[t.jsxs("div",{className:"hero-stat",children:[t.jsxs("div",{className:"hero-stat-number",children:[s.length,"+"]}),t.jsx("div",{className:"hero-stat-label",children:"OPEN POSITIONS"})]}),t.jsx("div",{className:"hero-stat-divider"}),t.jsxs("div",{className:"hero-stat",children:[t.jsx("div",{className:"hero-stat-number",children:n.length}),t.jsx("div",{className:"hero-stat-label",children:"SUBSIDIARIES"})]}),t.jsx("div",{className:"hero-stat-divider"}),t.jsxs("div",{className:"hero-stat",children:[t.jsx("div",{className:"hero-stat-number",children:"185+"}),t.jsx("div",{className:"hero-stat-label",children:"YEARS OF TRUST"})]})]})]}),t.jsx("section",{className:"brand-marquee-section",children:t.jsx("div",{className:"marquee-wrapper",children:t.jsxs("div",{className:"marquee-content",children:[n.map((b,g)=>t.jsxs("div",{className:"brand-item",children:[t.jsx("img",{src:b.logo?`${df}/uploads/logos/${b.logo}`:"/gs-logo.png",alt:b.name,onError:j=>j.target.src="/gs-logo.png",style:{height:"40px",width:"auto",objectFit:"contain",filter:"grayscale(1)",opacity:.6,transition:"all 0.3s"}}),t.jsx("span",{children:b.name})]},`comp-1-${g}`)),n.map((b,g)=>t.jsxs("div",{className:"brand-item",children:[t.jsx("img",{src:b.logo?`${df}/uploads/logos/${b.logo}`:"/gs-logo.png",alt:b.name,onError:j=>j.target.src="/gs-logo.png",style:{height:"40px",width:"auto",objectFit:"contain",filter:"grayscale(1)",opacity:.6,transition:"all 0.3s"}}),t.jsx("span",{children:b.name})]},`comp-2-${g}`))]})})}),t.jsx("section",{className:"heritage-section",id:"heritage",children:t.jsx("div",{className:"container",children:t.jsxs("div",{className:"heritage-grid",children:[t.jsxs("div",{className:"heritage-content",children:[t.jsx("span",{className:"section-badge",children:"Our Legacy"}),t.jsx("h2",{className:"section-title-creative",children:"Established In 1835"}),t.jsx("p",{className:"section-desc",children:"From 1835 to the present day, George Steuart & Company has stood as a beacon of stability and growth in Sri Lanka. Our diverse portfolio spans Tea, Pharmaceuticals, Leisure, Travel, Real Estate, and Financial Services."}),t.jsxs("div",{className:"heritage-features",children:[t.jsxs("div",{className:"h-feature",children:[t.jsx("div",{className:"h-icon",children:t.jsx(ds,{})}),t.jsxs("div",{children:[t.jsx("h4",{children:"Global Presence"}),t.jsx("p",{children:"Exporting excellence to over 50 countries worldwide."})]})]}),t.jsxs("div",{className:"h-feature",children:[t.jsx("div",{className:"h-icon",children:t.jsx(dr,{})}),t.jsxs("div",{children:[t.jsx("h4",{children:"Diverse Team"}),t.jsx("p",{children:"Over 1,000 professionals working across multiple sectors."})]})]})]})]}),t.jsx("div",{className:"heritage-visual",children:t.jsxs("div",{className:"heritage-card-wrapper",children:[t.jsx("img",{src:"/heritage-believe.png",alt:"George Steuart Heritage - Believe",className:"heritage-believe-img"}),t.jsx("div",{className:"heritage-floating-text",children:'"Believe in Excellence"'})]})})]})})}),t.jsx("section",{className:"values-section",children:t.jsx("div",{className:"container",children:t.jsxs("div",{className:"values-grid",children:[t.jsxs("div",{className:"value-item",children:[t.jsx("div",{className:"value-icon",children:"I"}),t.jsx("h3",{children:"Integrity"}),t.jsx("p",{children:"We maintain the highest standards of professional ethics and transparent conduct."})]}),t.jsxs("div",{className:"value-item",children:[t.jsx("div",{className:"value-icon",children:"E"}),t.jsx("h3",{children:"Excellence"}),t.jsx("p",{children:"Delivering world-class quality in every sector we operate in, every single day."})]}),t.jsxs("div",{className:"value-item",children:[t.jsx("div",{className:"value-icon",children:"H"}),t.jsx("h3",{children:"Heritage"}),t.jsx("p",{children:"Continuing a 190-year journey of mercantile leadership in Sri Lanka."})]})]})})}),t.jsx("section",{className:"cta-section",children:t.jsx("div",{className:"container",children:t.jsx("div",{className:"cta-card",children:t.jsxs("div",{className:"cta-content",children:[t.jsx("h2",{children:"Be Part of Sri Lanka's Heritage"}),t.jsx("p",{children:"We are always looking for talented individuals who believe in excellence and integrity."}),t.jsx(qe,{to:"/vacancies",className:"btn btn-warm btn-lg",children:"Explore Openings"})]})})})}),t.jsx("footer",{className:"footer-premium",children:t.jsxs("div",{className:"container",children:[t.jsxs("div",{className:"footer-top-grid",children:[t.jsxs("div",{className:"footer-col brand-col",children:[t.jsx("img",{src:"/gs-logo.png",alt:"George Steuart & Co",className:"footer-logo-premium"}),t.jsxs("h3",{className:"footer-brand-name",children:["George Steuart ",t.jsx("br",{}),t.jsx("span",{children:"& Company Ltd"})]}),t.jsx("p",{className:"footer-about-text",children:"Established in 1835, George Steuart & Company is Sri Lanka's oldest mercantile firm, fostering excellence for nearly two centuries."}),t.jsxs("div",{className:"footer-socials",children:[t.jsx("a",{href:"https://www.facebook.com/GeorgeSteuarts",target:"_blank",rel:"noopener noreferrer",className:"social-link",title:"Facebook",children:t.jsx(Lc,{})}),t.jsx("a",{href:"https://www.linkedin.com/company/george-steuart-&-company-limited",target:"_blank",rel:"noopener noreferrer",className:"social-link",title:"LinkedIn",children:t.jsx(Fc,{})})]})]}),t.jsxs("div",{className:"footer-col links-col",children:[t.jsx("h4",{className:"footer-col-title",children:"Quick Links"}),t.jsxs("ul",{className:"footer-links-list",children:[t.jsx("li",{children:t.jsx(qe,{to:"/",children:"Home"})}),t.jsx("li",{children:t.jsx(qe,{to:"/vacancies",children:"All Vacancies"})}),t.jsx("li",{children:t.jsx("a",{href:"#heritage",children:"Our Heritage"})}),t.jsx("li",{children:t.jsx(qe,{to:"/admin/login",children:"Admin Portal"})})]})]}),t.jsxs("div",{className:"footer-col contact-col",children:[t.jsx("h4",{className:"footer-col-title",children:"Get In Touch"}),t.jsxs("div",{className:"footer-contact-info",children:[t.jsxs("p",{children:[t.jsx(wr,{className:"c-icon"})," No. 439, Galle Road, Colombo 03, Sri Lanka."]}),t.jsxs("p",{children:[t.jsx(ds,{className:"c-icon"})," www.georgesteuart.lk"]}),t.jsxs("div",{className:"contact-numbers",children:[t.jsxs("p",{children:[t.jsx("span",{children:"T:"})," +94 117 792 400"]}),t.jsxs("p",{children:[t.jsx("span",{children:"E:"})," info@georgesteuart.lk"]})]})]})]})]}),t.jsxs("div",{className:"footer-bottom-bar",children:[t.jsxs("div",{className:"copyright-area",children:["© ",new Date().getFullYear()," George Steuart & Company Ltd. All Rights Reserved."]}),t.jsxs("div",{className:"developer-credit",children:["Developed by ",t.jsx("span",{children:"GS Optimize pvt ltd"})]})]})]})})]})}const xb=jt.replace("/api","");function vb(){const[s,a]=U.useState([]),[n,o]=U.useState([]),[l,d]=U.useState(!0),[u,f]=U.useState(""),[h,b]=U.useState(""),[g,j]=U.useState(!1),S=Ot(),_=async()=>{var C,L;try{d(!0);const F={};h&&(F.company_id=h),u&&(F.search=u);const[M,G]=await Promise.all([ch(F),In()]);a(((C=M==null?void 0:M.data)==null?void 0:C.data)||[]),o(((L=G==null?void 0:G.data)==null?void 0:L.data)||[])}catch(F){console.error(F)}finally{d(!1)}};U.useEffect(()=>{_()},[h]);const w=C=>{C.preventDefault(),_()},[x,v]=U.useState(""),N=U.useMemo(()=>{const C=s.map(L=>L.location).filter(Boolean);return[...new Set(C)]},[s]),P=U.useMemo(()=>{const C=u.trim().toLowerCase();return s.filter(L=>{const F=(L.title||"").toLowerCase(),M=(L.designation||"").toLowerCase(),G=(L.company_name||"").toLowerCase();(L.location||"").toLowerCase();const H=!C||F.includes(C)||M.includes(C)||G.includes(C),pe=!h||String(L.company_id)===String(h),te=!x||L.location===x;return H&&pe&&te})},[s,u,h,x]),T=()=>j(!1);return t.jsxs("div",{className:"public-page vacancy-listing-page",children:[t.jsxs("nav",{className:"navbar",children:[t.jsxs(qe,{to:"/",className:"navbar-brand",children:[t.jsx("img",{src:"/gs-logo.png",alt:"George Steuart & Co",className:"navbar-logo"}),t.jsxs("div",{children:[t.jsx("div",{className:"navbar-title",children:"George Steuart"}),t.jsx("div",{className:"navbar-subtitle",children:"Careers"})]})]}),t.jsxs("div",{className:`navbar-links ${g?"open":""}`,children:[t.jsx(qe,{to:"/",className:"navbar-link",onClick:T,children:"Home"}),t.jsx(qe,{to:"/vacancies",className:"navbar-link active",onClick:T,children:"Vacancies"}),t.jsx(qe,{to:"/admin/login",className:"navbar-link btn-primary",onClick:T,children:"Admin Portal"})]}),t.jsx("button",{className:"mobile-menu-btn",onClick:()=>j(C=>!C),children:g?t.jsx(bt,{}):t.jsx(so,{})})]}),t.jsxs("header",{className:"vacancies-hero-v2",children:[t.jsx("div",{className:"container",children:t.jsx("div",{className:"v2-hero-layout",children:t.jsxs("div",{className:"v2-hero-info",children:[t.jsx("div",{className:"v2-badge animate-fade-in",children:"Join Our Legacy"}),t.jsxs("h1",{className:"v2-hero-title animate-slide-up",children:["Shape Your Future ",t.jsx("br",{}),t.jsx("span",{children:"With George Steuart"})]}),t.jsx("p",{className:"v2-hero-subtitle animate-slide-up delay-1",children:"Partner with the oldest mercantile firm in Sri Lanka. We offer more than just a job; we offer a platform to build a career rooted in 190 years of excellence."}),t.jsx("div",{className:"v2-hero-actions animate-slide-up delay-2",children:t.jsxs(qe,{to:"#current-openings",className:"v2-btn-scroll",onClick:C=>{C.preventDefault(),document.getElementById("current-openings").scrollIntoView({behavior:"smooth"})},children:["View Openings ",t.jsx(On,{})]})})]})})}),t.jsx("div",{className:"v2-hero-overlay"})]}),t.jsx("div",{className:"v2-filter-section",children:t.jsx("div",{className:"container",children:t.jsx("div",{className:"v2-filter-card-wrapper shadow-premium animate-slide-up",children:t.jsxs("form",{className:"v2-filter-card",onSubmit:w,children:[t.jsxs("div",{className:"v2-search-input",children:[t.jsx(ua,{className:"v2-icon"}),t.jsx("input",{type:"text",placeholder:"Search by role or keyword...",value:u,onChange:C=>f(C.target.value)})]}),t.jsxs("div",{className:"v2-select-group",children:[t.jsxs("div",{className:"v2-select-wrapper",children:[t.jsx(Ht,{className:"v2-icon-small"}),t.jsxs("select",{value:h,onChange:C=>b(C.target.value),children:[t.jsx("option",{value:"",children:"All Companies"}),n.map(C=>t.jsx("option",{value:C.id,children:C.name},C.id))]})]}),t.jsxs("div",{className:"v2-select-wrapper",children:[t.jsx(wr,{className:"v2-icon-small"}),t.jsxs("select",{value:x,onChange:C=>v(C.target.value),children:[t.jsx("option",{value:"",children:"All Locations"}),N.map(C=>t.jsx("option",{value:C,children:C},C))]})]})]}),t.jsxs("button",{type:"submit",className:"v2-btn-find",children:[t.jsx(ua,{})," ",t.jsx("span",{children:"Find Opportunities"})]})]})})})}),t.jsx("main",{className:"v2-listing-section",id:"current-openings",children:t.jsxs("div",{className:"container",children:[t.jsxs("div",{className:"v2-section-header",children:[t.jsxs("div",{className:"v2-header-title",children:[t.jsx("h2",{children:"Current Openings"}),t.jsxs("p",{children:["Showing ",t.jsx("strong",{children:P.length})," active positions across our group"]})]}),t.jsx("div",{className:"v2-view-options",children:t.jsx("span",{className:"v2-active-filter",children:"Sort by: Latest First"})})]}),l?t.jsx("div",{className:"loading-container",children:[1,2,3,4,5,6].map(C=>t.jsx("div",{className:"skeleton-card"},C))}):P.length===0?t.jsxs("div",{className:"v2-empty-state",children:[t.jsx("div",{className:"v2-empty-illustration",children:"🔍"}),t.jsx("h3",{children:"No matches found"}),t.jsx("p",{children:"Try adjusting your search or filters to find what you're looking for."}),t.jsx("button",{onClick:()=>{f(""),b(""),v("")},className:"v2-btn-reset",children:"Clear All Filters"})]}):t.jsx("div",{className:"v2-vacancy-grid",children:P.map((C,L)=>{const F=Pr(C.created_at)<7;return t.jsxs("div",{className:"v2-job-card animate-slide-up",style:{animationDelay:`${L*.08}s`},onClick:()=>S(`/apply/${C.id}`),children:[t.jsx("div",{className:"v2-card-logo",children:t.jsx("img",{src:C.company_logo?`${xb}/uploads/logos/${C.company_logo}`:"/gs-logo.png",alt:C.company_name,onError:M=>M.target.src="/gs-logo.png"})}),t.jsxs("div",{className:"v2-card-body",children:[t.jsxs("div",{className:"v2-card-tags",children:[F&&t.jsx("span",{className:"v2-tag-new",children:"New Opening"}),t.jsx("span",{className:"v2-tag-type",children:C.employment_type||"Full Time"})]}),t.jsx("h3",{className:"v2-job-title",style:{marginBottom:"2px"},children:C.title}),t.jsxs("div",{style:{fontSize:"0.7rem",color:"var(--text-muted)",fontWeight:"bold",marginBottom:"8px",letterSpacing:"0.5px"},children:["REF: ",C.reference_number||"N/A"]}),t.jsx("span",{className:"v2-company-name",children:C.company_name}),C.description&&t.jsx("div",{className:"v2-job-card-description",children:C.description}),t.jsxs("div",{className:"v2-job-details",children:[t.jsxs("div",{className:"v2-detail-item",children:[t.jsx(wr,{className:"v2-icon-inline"}),t.jsx("span",{children:C.location||"Colombo, LK"})]}),t.jsxs("div",{className:"v2-detail-item",children:[t.jsx(or,{className:"v2-icon-inline"}),t.jsxs("span",{children:["Closes: ",br(C.expire_date)]})]}),t.jsxs("div",{className:"v2-detail-item",children:[t.jsx(Ht,{className:"v2-icon-inline"}),t.jsx("span",{children:C.designation||"Executive"})]})]}),t.jsxs("div",{className:"v2-card-footer",children:[t.jsxs("div",{className:"v2-job-status-badge",children:[t.jsx("span",{className:"v2-status-dot"}),"Actively Hiring"]}),t.jsxs(qe,{to:`/apply/${C.id}`,className:"v2-btn-apply",onClick:M=>M.stopPropagation(),children:["View Position ",t.jsx(On,{})]})]})]})]},C.id)})})]})}),t.jsx("section",{className:"v5-why-join",children:t.jsx("div",{className:"container",children:t.jsxs("div",{className:"v5-layout",children:[t.jsxs("div",{className:"v5-visual",children:[t.jsx("div",{className:"v5-badge",children:"The GS Advantage"}),t.jsx("h2",{className:"v5-main-title",children:"Why Your Career Starts Here"}),t.jsx("p",{className:"v5-main-desc",children:"Join a legacy of over 190 years. We don't just offer jobs; we provide a platform for you to build a lasting legacy within Sri Lanka's most prestigious mercantile home."}),t.jsxs("div",{className:"v5-stats-cluster",children:[t.jsxs("div",{className:"v5-stat-card",children:[t.jsx("span",{className:"num",children:"190+"}),t.jsx("span",{className:"lbl",children:"Years"})]}),t.jsxs("div",{className:"v5-stat-card gold",children:[t.jsx("span",{className:"num",children:"10+"}),t.jsx("span",{className:"lbl",children:"Sectors"})]}),t.jsxs("div",{className:"v5-stat-card",children:[t.jsx("span",{className:"num",children:"5K+"}),t.jsx("span",{className:"lbl",children:"Family"})]})]})]}),t.jsxs("div",{className:"v5-pillars",children:[t.jsxs("div",{className:"v5-pillar-item",children:[t.jsx("div",{className:"v5-pillar-icon",children:t.jsx(gh,{})}),t.jsxs("div",{className:"v5-pillar-info",children:[t.jsx("h4",{children:"Historic Resilience"}),t.jsx("p",{children:"Experience the stability of a firm that has led the Sri Lankan economy since 1835."})]})]}),t.jsxs("div",{className:"v5-pillar-item",children:[t.jsx("div",{className:"v5-pillar-icon",children:t.jsx(ds,{})}),t.jsxs("div",{className:"v5-pillar-info",children:[t.jsx("h4",{children:"Cross-Industry Exposure"}),t.jsx("p",{children:"Pivot your career across Tea, Healthcare, Finance, and Travel without leaving the group."})]})]}),t.jsxs("div",{className:"v5-pillar-item featured",children:[t.jsx("div",{className:"v5-pillar-icon",children:t.jsx(dr,{})}),t.jsxs("div",{className:"v5-pillar-info",children:[t.jsx("h4",{children:"Inclusive Leadership"}),t.jsx("p",{children:"Our meritocratic culture ensures that talent and integrity are the only paths to the top."})]})]}),t.jsxs("div",{className:"v5-pillar-item",children:[t.jsx("div",{className:"v5-pillar-icon",children:t.jsx(Ht,{})}),t.jsxs("div",{className:"v5-pillar-info",children:[t.jsx("h4",{children:"Strategic Mentorship"}),t.jsx("p",{children:"Access structured growth programs led by industry stalwarts and visionary directors."})]})]})]})]})})}),t.jsx("footer",{className:"footer-premium",children:t.jsxs("div",{className:"container",children:[t.jsxs("div",{className:"footer-top-grid",children:[t.jsxs("div",{className:"footer-col brand-col",children:[t.jsx("img",{src:"/gs-logo.png",alt:"George Steuart & Co",className:"footer-logo-premium"}),t.jsxs("h3",{className:"footer-brand-name",children:["George Steuart ",t.jsx("br",{}),t.jsx("span",{children:"& Company Ltd"})]}),t.jsx("p",{className:"footer-about-text",children:"Established in 1835, George Steuart & Company is Sri Lanka's oldest mercantile firm, fostering excellence for nearly two centuries."}),t.jsxs("div",{className:"footer-socials",children:[t.jsx("a",{href:"https://www.facebook.com/GeorgeSteuarts",target:"_blank",rel:"noopener noreferrer",className:"social-link",title:"Facebook",children:t.jsx(Lc,{})}),t.jsx("a",{href:"https://www.linkedin.com/company/george-steorge-steuart-&-company-limited",target:"_blank",rel:"noopener noreferrer",className:"social-link",title:"LinkedIn",children:t.jsx(Fc,{})})]})]}),t.jsxs("div",{className:"footer-col links-col",children:[t.jsx("h4",{className:"footer-col-title",children:"Quick Links"}),t.jsxs("ul",{className:"footer-links-list",children:[t.jsx("li",{children:t.jsx(qe,{to:"/",children:"Home"})}),t.jsx("li",{children:t.jsx(qe,{to:"/vacancies",children:"All Vacancies"})}),t.jsx("li",{children:t.jsx("a",{href:"/#heritage",children:"Our Heritage"})}),t.jsx("li",{children:t.jsx(qe,{to:"/admin/login",children:"Admin Portal"})})]})]}),t.jsxs("div",{className:"footer-col contact-col",children:[t.jsx("h4",{className:"footer-col-title",children:"Get In Touch"}),t.jsxs("div",{className:"footer-contact-info",children:[t.jsxs("p",{children:[t.jsx(wr,{className:"c-icon"})," No. 439, Galle Road, Colombo 03, Sri Lanka."]}),t.jsxs("p",{children:[t.jsx(ds,{className:"c-icon"})," www.georgesteuart.lk"]}),t.jsxs("div",{className:"contact-numbers",children:[t.jsxs("p",{children:[t.jsx("span",{children:"T:"})," +94 117 792 400"]}),t.jsxs("p",{children:[t.jsx("span",{children:"E:"})," info@georgesteuart.lk"]})]})]})]})]}),t.jsxs("div",{className:"footer-bottom-bar",children:[t.jsxs("div",{className:"copyright-area",children:["© ",new Date().getFullYear()," George Steuart & Company Ltd. All Rights Reserved."]}),t.jsxs("div",{className:"developer-credit",children:["Developed by ",t.jsx("span",{children:"GS Optimize pvt ltd"})]})]})]})})]})}function yh(s){var a,n,o="";if(typeof s=="string"||typeof s=="number")o+=s;else if(typeof s=="object")if(Array.isArray(s)){var l=s.length;for(a=0;a<l;a++)s[a]&&(n=yh(s[a]))&&(o&&(o+=" "),o+=n)}else for(n in s)s[n]&&(o&&(o+=" "),o+=n);return o}function un(){for(var s,a,n=0,o="",l=arguments.length;n<l;n++)(s=arguments[n])&&(a=yh(s))&&(o&&(o+=" "),o+=a);return o}const hs=s=>typeof s=="number"&&!isNaN(s),Tn=s=>typeof s=="string",Kt=s=>typeof s=="function",Mi=s=>Tn(s)||Kt(s)?s:null,bc=s=>U.isValidElement(s)||Tn(s)||Kt(s)||hs(s);function bb(s,a,n){n===void 0&&(n=300);const{scrollHeight:o,style:l}=s;requestAnimationFrame(()=>{l.minHeight="initial",l.height=o+"px",l.transition=`all ${n}ms`,requestAnimationFrame(()=>{l.height="0",l.padding="0",l.margin="0",setTimeout(a,n)})})}function io(s){let{enter:a,exit:n,appendPosition:o=!1,collapse:l=!0,collapseDuration:d=300}=s;return function(u){let{children:f,position:h,preventExitTransition:b,done:g,nodeRef:j,isIn:S,playToast:_}=u;const w=o?`${a}--${h}`:a,x=o?`${n}--${h}`:n,v=U.useRef(0);return U.useLayoutEffect(()=>{const N=j.current,P=w.split(" "),T=C=>{C.target===j.current&&(_(),N.removeEventListener("animationend",T),N.removeEventListener("animationcancel",T),v.current===0&&C.type!=="animationcancel"&&N.classList.remove(...P))};N.classList.add(...P),N.addEventListener("animationend",T),N.addEventListener("animationcancel",T)},[]),U.useEffect(()=>{const N=j.current,P=()=>{N.removeEventListener("animationend",P),l?bb(N,g,d):g()};S||(b?P():(v.current=1,N.className+=` ${x}`,N.addEventListener("animationend",P)))},[S]),Ue.createElement(Ue.Fragment,null,f)}}function uf(s,a){return s!=null?{content:s.content,containerId:s.props.containerId,id:s.props.toastId,theme:s.props.theme,type:s.props.type,data:s.props.data||{},isLoading:s.props.isLoading,icon:s.props.icon,status:a}:{}}const Lt=new Map;let ms=[];const yc=new Set,yb=s=>yc.forEach(a=>a(s)),wh=()=>Lt.size>0;function jh(s,a){var n;if(a)return!((n=Lt.get(a))==null||!n.isToastActive(s));let o=!1;return Lt.forEach(l=>{l.isToastActive(s)&&(o=!0)}),o}function kh(s,a){bc(s)&&(wh()||ms.push({content:s,options:a}),Lt.forEach(n=>{n.buildToast(s,a)}))}function pf(s,a){Lt.forEach(n=>{a!=null&&a!=null&&a.containerId?(a==null?void 0:a.containerId)===n.id&&n.toggle(s,a==null?void 0:a.id):n.toggle(s,a==null?void 0:a.id)})}function wb(s){const{subscribe:a,getSnapshot:n,setProps:o}=U.useRef((function(d){const u=d.containerId||1;return{subscribe(f){const h=(function(g,j,S){let _=1,w=0,x=[],v=[],N=[],P=j;const T=new Map,C=new Set,L=()=>{N=Array.from(T.values()),C.forEach(G=>G())},F=G=>{v=G==null?[]:v.filter(H=>H!==G),L()},M=G=>{const{toastId:H,onOpen:pe,updateId:te,children:A}=G.props,K=te==null;G.staleId&&T.delete(G.staleId),T.set(H,G),v=[...v,G.props.toastId].filter(k=>k!==G.staleId),L(),S(uf(G,K?"added":"updated")),K&&Kt(pe)&&pe(U.isValidElement(A)&&A.props)};return{id:g,props:P,observe:G=>(C.add(G),()=>C.delete(G)),toggle:(G,H)=>{T.forEach(pe=>{H!=null&&H!==pe.props.toastId||Kt(pe.toggle)&&pe.toggle(G)})},removeToast:F,toasts:T,clearQueue:()=>{w-=x.length,x=[]},buildToast:(G,H)=>{if((z=>{let{containerId:J,toastId:ie,updateId:oe}=z;const _e=J?J!==g:g!==1,Te=T.has(ie)&&oe==null;return _e||Te})(H))return;const{toastId:pe,updateId:te,data:A,staleId:K,delay:k}=H,se=()=>{F(pe)},ye=te==null;ye&&w++;const re={...P,style:P.toastStyle,key:_++,...Object.fromEntries(Object.entries(H).filter(z=>{let[J,ie]=z;return ie!=null})),toastId:pe,updateId:te,data:A,closeToast:se,isIn:!1,className:Mi(H.className||P.toastClassName),bodyClassName:Mi(H.bodyClassName||P.bodyClassName),progressClassName:Mi(H.progressClassName||P.progressClassName),autoClose:!H.isLoading&&(W=H.autoClose,X=P.autoClose,W===!1||hs(W)&&W>0?W:X),deleteToast(){const z=T.get(pe),{onClose:J,children:ie}=z.props;Kt(J)&&J(U.isValidElement(ie)&&ie.props),S(uf(z,"removed")),T.delete(pe),w--,w<0&&(w=0),x.length>0?M(x.shift()):L()}};var W,X;re.closeButton=P.closeButton,H.closeButton===!1||bc(H.closeButton)?re.closeButton=H.closeButton:H.closeButton===!0&&(re.closeButton=!bc(P.closeButton)||P.closeButton);let ne=G;U.isValidElement(G)&&!Tn(G.type)?ne=U.cloneElement(G,{closeToast:se,toastProps:re,data:A}):Kt(G)&&(ne=G({closeToast:se,toastProps:re,data:A}));const R={content:ne,props:re,staleId:K};P.limit&&P.limit>0&&w>P.limit&&ye?x.push(R):hs(k)?setTimeout(()=>{M(R)},k):M(R)},setProps(G){P=G},setToggle:(G,H)=>{T.get(G).toggle=H},isToastActive:G=>v.some(H=>H===G),getSnapshot:()=>N}})(u,d,yb);Lt.set(u,h);const b=h.observe(f);return ms.forEach(g=>kh(g.content,g.options)),ms=[],()=>{b(),Lt.delete(u)}},setProps(f){var h;(h=Lt.get(u))==null||h.setProps(f)},getSnapshot(){var f;return(f=Lt.get(u))==null?void 0:f.getSnapshot()}}})(s)).current;o(s);const l=U.useSyncExternalStore(a,n,n);return{getToastToRender:function(d){if(!l)return[];const u=new Map;return s.newestOnTop&&l.reverse(),l.forEach(f=>{const{position:h}=f.props;u.has(h)||u.set(h,[]),u.get(h).push(f)}),Array.from(u,f=>d(f[0],f[1]))},isToastActive:jh,count:l==null?void 0:l.length}}function jb(s){const[a,n]=U.useState(!1),[o,l]=U.useState(!1),d=U.useRef(null),u=U.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:f,pauseOnHover:h,closeToast:b,onClick:g,closeOnClick:j}=s;var S,_;function w(){n(!0)}function x(){n(!1)}function v(T){const C=d.current;u.canDrag&&C&&(u.didMove=!0,a&&x(),u.delta=s.draggableDirection==="x"?T.clientX-u.start:T.clientY-u.start,u.start!==T.clientX&&(u.canCloseOnClick=!1),C.style.transform=`translate3d(${s.draggableDirection==="x"?`${u.delta}px, var(--y)`:`0, calc(${u.delta}px + var(--y))`},0)`,C.style.opacity=""+(1-Math.abs(u.delta/u.removalDistance)))}function N(){document.removeEventListener("pointermove",v),document.removeEventListener("pointerup",N);const T=d.current;if(u.canDrag&&u.didMove&&T){if(u.canDrag=!1,Math.abs(u.delta)>u.removalDistance)return l(!0),s.closeToast(),void s.collapseAll();T.style.transition="transform 0.2s, opacity 0.2s",T.style.removeProperty("transform"),T.style.removeProperty("opacity")}}(_=Lt.get((S={id:s.toastId,containerId:s.containerId,fn:n}).containerId||1))==null||_.setToggle(S.id,S.fn),U.useEffect(()=>{if(s.pauseOnFocusLoss)return document.hasFocus()||x(),window.addEventListener("focus",w),window.addEventListener("blur",x),()=>{window.removeEventListener("focus",w),window.removeEventListener("blur",x)}},[s.pauseOnFocusLoss]);const P={onPointerDown:function(T){if(s.draggable===!0||s.draggable===T.pointerType){u.didMove=!1,document.addEventListener("pointermove",v),document.addEventListener("pointerup",N);const C=d.current;u.canCloseOnClick=!0,u.canDrag=!0,C.style.transition="none",s.draggableDirection==="x"?(u.start=T.clientX,u.removalDistance=C.offsetWidth*(s.draggablePercent/100)):(u.start=T.clientY,u.removalDistance=C.offsetHeight*(s.draggablePercent===80?1.5*s.draggablePercent:s.draggablePercent)/100)}},onPointerUp:function(T){const{top:C,bottom:L,left:F,right:M}=d.current.getBoundingClientRect();T.nativeEvent.type!=="touchend"&&s.pauseOnHover&&T.clientX>=F&&T.clientX<=M&&T.clientY>=C&&T.clientY<=L?x():w()}};return f&&h&&(P.onMouseEnter=x,s.stacked||(P.onMouseLeave=w)),j&&(P.onClick=T=>{g&&g(T),u.canCloseOnClick&&b()}),{playToast:w,pauseToast:x,isRunning:a,preventExitTransition:o,toastRef:d,eventHandlers:P}}function kb(s){let{delay:a,isRunning:n,closeToast:o,type:l="default",hide:d,className:u,style:f,controlledProgress:h,progress:b,rtl:g,isIn:j,theme:S}=s;const _=d||h&&b===0,w={...f,animationDuration:`${a}ms`,animationPlayState:n?"running":"paused"};h&&(w.transform=`scaleX(${b})`);const x=un("Toastify__progress-bar",h?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${S}`,`Toastify__progress-bar--${l}`,{"Toastify__progress-bar--rtl":g}),v=Kt(u)?u({rtl:g,type:l,defaultClassName:x}):un(x,u),N={[h&&b>=1?"onTransitionEnd":"onAnimationEnd"]:h&&b<1?null:()=>{j&&o()}};return Ue.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":_},Ue.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${S} Toastify__progress-bar--${l}`}),Ue.createElement("div",{role:"progressbar","aria-hidden":_?"true":"false","aria-label":"notification timer",className:v,style:w,...N}))}let Nb=1;const Nh=()=>""+Nb++;function _b(s){return s&&(Tn(s.toastId)||hs(s.toastId))?s.toastId:Nh()}function is(s,a){return kh(s,a),a.toastId}function Yi(s,a){return{...a,type:a&&a.type||s,toastId:_b(a)}}function Ri(s){return(a,n)=>is(a,Yi(s,n))}function ve(s,a){return is(s,Yi("default",a))}ve.loading=(s,a)=>is(s,Yi("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...a})),ve.promise=function(s,a,n){let o,{pending:l,error:d,success:u}=a;l&&(o=Tn(l)?ve.loading(l,n):ve.loading(l.render,{...n,...l}));const f={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},h=(g,j,S)=>{if(j==null)return void ve.dismiss(o);const _={type:g,...f,...n,data:S},w=Tn(j)?{render:j}:j;return o?ve.update(o,{..._,...w}):ve(w.render,{..._,...w}),S},b=Kt(s)?s():s;return b.then(g=>h("success",u,g)).catch(g=>h("error",d,g)),b},ve.success=Ri("success"),ve.info=Ri("info"),ve.error=Ri("error"),ve.warning=Ri("warning"),ve.warn=ve.warning,ve.dark=(s,a)=>is(s,Yi("default",{theme:"dark",...a})),ve.dismiss=function(s){(function(a){var n;if(wh()){if(a==null||Tn(n=a)||hs(n))Lt.forEach(o=>{o.removeToast(a)});else if(a&&("containerId"in a||"id"in a)){const o=Lt.get(a.containerId);o?o.removeToast(a.id):Lt.forEach(l=>{l.removeToast(a.id)})}}else ms=ms.filter(o=>a!=null&&o.options.toastId!==a)})(s)},ve.clearWaitingQueue=function(s){s===void 0&&(s={}),Lt.forEach(a=>{!a.props.limit||s.containerId&&a.id!==s.containerId||a.clearQueue()})},ve.isActive=jh,ve.update=function(s,a){a===void 0&&(a={});const n=((o,l)=>{var d;let{containerId:u}=l;return(d=Lt.get(u||1))==null?void 0:d.toasts.get(o)})(s,a);if(n){const{props:o,content:l}=n,d={delay:100,...o,...a,toastId:a.toastId||s,updateId:Nh()};d.toastId!==s&&(d.staleId=s);const u=d.render||l;delete d.render,is(u,d)}},ve.done=s=>{ve.update(s,{progress:1})},ve.onChange=function(s){return yc.add(s),()=>{yc.delete(s)}},ve.play=s=>pf(!0,s),ve.pause=s=>pf(!1,s);const Sb=typeof window<"u"?U.useLayoutEffect:U.useEffect,Ti=s=>{let{theme:a,type:n,isLoading:o,...l}=s;return Ue.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:a==="colored"?"currentColor":`var(--toastify-icon-color-${n})`,...l})},rc={info:function(s){return Ue.createElement(Ti,{...s},Ue.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(s){return Ue.createElement(Ti,{...s},Ue.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(s){return Ue.createElement(Ti,{...s},Ue.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(s){return Ue.createElement(Ti,{...s},Ue.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return Ue.createElement("div",{className:"Toastify__spinner"})}},Cb=s=>{const{isRunning:a,preventExitTransition:n,toastRef:o,eventHandlers:l,playToast:d}=jb(s),{closeButton:u,children:f,autoClose:h,onClick:b,type:g,hideProgressBar:j,closeToast:S,transition:_,position:w,className:x,style:v,bodyClassName:N,bodyStyle:P,progressClassName:T,progressStyle:C,updateId:L,role:F,progress:M,rtl:G,toastId:H,deleteToast:pe,isIn:te,isLoading:A,closeOnClick:K,theme:k}=s,se=un("Toastify__toast",`Toastify__toast-theme--${k}`,`Toastify__toast--${g}`,{"Toastify__toast--rtl":G},{"Toastify__toast--close-on-click":K}),ye=Kt(x)?x({rtl:G,position:w,type:g,defaultClassName:se}):un(se,x),re=(function(R){let{theme:z,type:J,isLoading:ie,icon:oe}=R,_e=null;const Te={theme:z,type:J};return oe===!1||(Kt(oe)?_e=oe({...Te,isLoading:ie}):U.isValidElement(oe)?_e=U.cloneElement(oe,Te):ie?_e=rc.spinner():(Ne=>Ne in rc)(J)&&(_e=rc[J](Te))),_e})(s),W=!!M||!h,X={closeToast:S,type:g,theme:k};let ne=null;return u===!1||(ne=Kt(u)?u(X):U.isValidElement(u)?U.cloneElement(u,X):(function(R){let{closeToast:z,theme:J,ariaLabel:ie="close"}=R;return Ue.createElement("button",{className:`Toastify__close-button Toastify__close-button--${J}`,type:"button",onClick:oe=>{oe.stopPropagation(),z(oe)},"aria-label":ie},Ue.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},Ue.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))})(X)),Ue.createElement(_,{isIn:te,done:pe,position:w,preventExitTransition:n,nodeRef:o,playToast:d},Ue.createElement("div",{id:H,onClick:b,"data-in":te,className:ye,...l,style:v,ref:o},Ue.createElement("div",{...te&&{role:F},className:Kt(N)?N({type:g}):un("Toastify__toast-body",N),style:P},re!=null&&Ue.createElement("div",{className:un("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!A})},re),Ue.createElement("div",null,f)),ne,Ue.createElement(kb,{...L&&!W?{key:`pb-${L}`}:{},rtl:G,theme:k,delay:h,isRunning:a,isIn:te,closeToast:S,hide:j,type:g,style:C,className:T,controlledProgress:W,progress:M||0})))},oo=function(s,a){return a===void 0&&(a=!1),{enter:`Toastify--animate Toastify__${s}-enter`,exit:`Toastify--animate Toastify__${s}-exit`,appendPosition:a}},Eb=io(oo("bounce",!0));io(oo("slide",!0));io(oo("zoom"));io(oo("flip"));const Pb={position:"top-right",transition:Eb,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};function zb(s){let a={...Pb,...s};const n=s.stacked,[o,l]=U.useState(!0),d=U.useRef(null),{getToastToRender:u,isToastActive:f,count:h}=wb(a),{className:b,style:g,rtl:j,containerId:S}=a;function _(x){const v=un("Toastify__toast-container",`Toastify__toast-container--${x}`,{"Toastify__toast-container--rtl":j});return Kt(b)?b({position:x,rtl:j,defaultClassName:v}):un(v,Mi(b))}function w(){n&&(l(!0),ve.play())}return Sb(()=>{if(n){var x;const v=d.current.querySelectorAll('[data-in="true"]'),N=12,P=(x=a.position)==null?void 0:x.includes("top");let T=0,C=0;Array.from(v).reverse().forEach((L,F)=>{const M=L;M.classList.add("Toastify__toast--stacked"),F>0&&(M.dataset.collapsed=`${o}`),M.dataset.pos||(M.dataset.pos=P?"top":"bot");const G=T*(o?.2:1)+(o?0:N*F);M.style.setProperty("--y",`${P?G:-1*G}px`),M.style.setProperty("--g",`${N}`),M.style.setProperty("--s",""+(1-(o?C:0))),T+=M.offsetHeight,C+=.025})}},[o,h,n]),Ue.createElement("div",{ref:d,className:"Toastify",id:S,onMouseEnter:()=>{n&&(l(!1),ve.pause())},onMouseLeave:w},u((x,v)=>{const N=v.length?{...g}:{...g,pointerEvents:"none"};return Ue.createElement("div",{className:_(x),style:N,key:`container-${x}`},v.map(P=>{let{content:T,props:C}=P;return Ue.createElement(Cb,{...C,stacked:n,collapseAll:w,isIn:f(C.toastId,C.containerId),style:C.style,key:`toast-${C.key}`},T)}))}))}const Rb=jt.replace("/api",""),Tb=["0-1 years","1-3 years","3-5 years","5-10 years","10+ years"],Ab=["0-1 years","1-3 years","3-5 years","5-10 years","10+ years"],Lb=["O/L","A/L","Diploma","Bachelors Degree","Masters Degree","PhD","Professional Certification"];function Ob(){var T;const{id:s}=Lf(),a=Ot(),[n,o]=U.useState(null),[l,d]=U.useState(!0),[u,f]=U.useState(!1),[h,b]=U.useState(!1),[g,j]=U.useState(1),[S,_]=U.useState({first_name:"",last_name:"",email:"",contact_number:"",overall_experience:"",relevant_experience:"",qualification:"",salary_expectation:"",cv:null,future_consent:null});U.useEffect(()=>{(async()=>{var L;try{const F=await dh(s),M=((L=F.data)==null?void 0:L.data)||F.data;M?o(M):(ve.error("Vacancy not found."),a("/vacancies"))}catch{ve.error("Failed to load vacancy."),a("/vacancies")}finally{d(!1)}})()},[s,a]);const w=C=>_({...S,[C.target.name]:C.target.value}),x=C=>{const L=C.target.files[0];if(L&&L.size>5*1024*1024){ve.error("File too large (max 5MB).");return}_({...S,cv:L})},v=C=>{if(C.preventDefault(),!S.cv){ve.error("Please upload your CV.");return}j(2),window.scrollTo({top:0,behavior:"smooth"})},N=async()=>{var C,L;f(!0);try{const F=new FormData;Object.keys(S).forEach(M=>{M==="future_consent"?F.append(M,S[M]===!0?"true":"false"):F.append(M,S[M])}),F.append("vacancy_id",s),await zv(F),ve.success("Application submitted!"),a("/success",{state:{vacancy:n}})}catch(F){ve.error(((L=(C=F.response)==null?void 0:C.data)==null?void 0:L.message)||"Failed to submit.")}finally{f(!1)}},P=C=>{if(!C)return"N/A";const L=new Date(C);return isNaN(L)?"N/A":L.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})};return l?t.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx("div",{className:"spinner"})}):t.jsxs("div",{className:"apb-page",children:[t.jsxs("nav",{className:"navbar",children:[t.jsxs(qe,{to:"/",className:"navbar-brand",children:[t.jsx("img",{src:"/gs-logo.png",alt:"George Steuart",className:"navbar-logo"}),t.jsxs("div",{children:[t.jsx("div",{className:"navbar-title",children:"George Steuart"}),t.jsx("div",{className:"navbar-subtitle",children:"Careers"})]})]}),t.jsxs("div",{className:`navbar-links ${h?"open":""}`,children:[t.jsx(qe,{to:"/",className:"navbar-link",onClick:()=>b(!1),children:"Home"}),t.jsx(qe,{to:"/vacancies",className:"navbar-link",onClick:()=>b(!1),children:"Vacancies"}),t.jsx(qe,{to:"/admin/login",className:"navbar-link btn-primary",onClick:()=>b(!1),children:"Admin Portal"})]}),t.jsx("button",{className:"mobile-menu-btn",onClick:()=>b(C=>!C),children:h?t.jsx(bt,{}):t.jsx(so,{})})]}),t.jsxs("div",{className:"apb-banner",children:[t.jsx("div",{className:"apb-banner-img",children:t.jsx("img",{src:"/apply.png",alt:"Apply"})}),t.jsx("div",{className:"apb-banner-overlay"}),t.jsxs("div",{className:"apb-banner-content container",children:[t.jsxs(qe,{to:"/vacancies",className:"apb-back",children:[t.jsx(Mr,{})," Back to Vacancies"]}),t.jsxs("div",{className:"apb-banner-company",children:[t.jsx("div",{className:"apb-banner-logo",children:t.jsx("img",{src:n!=null&&n.company_logo?`${Rb}/uploads/logos/${n.company_logo}`:"/gs-logo.png",alt:(n==null?void 0:n.company_name)||"George Steuart",onError:C=>C.target.src="/gs-logo.png"})}),t.jsx("span",{children:(n==null?void 0:n.company_name)||"George Steuart & Company"})]}),t.jsx("h1",{className:"apb-banner-title",children:(n==null?void 0:n.title)||"Open Position"}),t.jsxs("div",{className:"apb-banner-tags",children:[(n==null?void 0:n.reference_number)&&t.jsxs("span",{className:"apb-tag apb-tag-gold",children:[t.jsx(ib,{}),n.reference_number]}),(n==null?void 0:n.employment_type)&&t.jsxs("span",{className:"apb-tag",children:[t.jsx(Ht,{}),n.employment_type]}),(n==null?void 0:n.location)&&t.jsxs("span",{className:"apb-tag",children:[t.jsx(wr,{}),n.location]}),t.jsxs("span",{className:"apb-tag apb-tag-deadline",children:[t.jsx(or,{}),"Closes ",P(n==null?void 0:n.expire_date)]})]})]})]}),t.jsx("main",{className:"apb-main",children:t.jsxs("div",{className:"container apb-container",children:[t.jsx("aside",{className:"apb-sidebar",children:t.jsxs("div",{className:"apb-info-card",children:[t.jsx("h3",{className:"apb-info-title",children:"Position Details"}),(n==null?void 0:n.description)&&t.jsxs("div",{className:"apb-info-block",children:[t.jsx("h4",{children:"About This Role"}),t.jsx("p",{children:n.description})]}),(n==null?void 0:n.requirements)&&t.jsxs("div",{className:"apb-info-block",children:[t.jsx("h4",{children:"Requirements"}),t.jsx("p",{children:n.requirements})]}),t.jsxs("div",{className:"apb-info-meta",children:[(n==null?void 0:n.location)&&t.jsxs("div",{className:"apb-meta-row",children:[t.jsx(wr,{}),t.jsx("span",{children:n.location})]}),(n==null?void 0:n.employment_type)&&t.jsxs("div",{className:"apb-meta-row",children:[t.jsx(Ht,{}),t.jsx("span",{children:n.employment_type})]}),t.jsxs("div",{className:"apb-meta-row",children:[t.jsx(or,{}),t.jsxs("span",{children:["Closes ",P(n==null?void 0:n.expire_date)]})]})]})]})}),t.jsxs("div",{className:"apb-form-area",children:[t.jsxs("div",{className:"apb-steps",children:[t.jsxs("div",{className:`apb-step ${g>=1?"active":""} ${g>1?"done":""}`,children:[t.jsx("div",{className:"apb-step-dot",children:g>1?t.jsx(Di,{}):"1"}),t.jsx("span",{children:"Your Details"})]}),t.jsx("div",{className:"apb-step-line"}),t.jsxs("div",{className:`apb-step ${g===2?"active":""}`,children:[t.jsx("div",{className:"apb-step-dot",children:"2"}),t.jsx("span",{children:"Review & Submit"})]})]}),g===1&&t.jsxs("div",{className:"apb-card",children:[t.jsx("h2",{className:"apb-card-title",children:"Your Application"}),t.jsxs("form",{onSubmit:v,children:[t.jsx("div",{className:"apb-fieldset-label",children:"Personal Information"}),t.jsxs("div",{className:"apb-grid2",children:[t.jsxs("div",{className:"apb-field",children:[t.jsxs("label",{children:["First Name ",t.jsx("span",{className:"req",children:"*"})]}),t.jsxs("div",{className:"apb-iw",children:[t.jsx(cr,{className:"apb-ico"}),t.jsx("input",{type:"text",name:"first_name",className:"apb-input",value:S.first_name,onChange:w,placeholder:"First name",required:!0})]})]}),t.jsxs("div",{className:"apb-field",children:[t.jsxs("label",{children:["Last Name ",t.jsx("span",{className:"req",children:"*"})]}),t.jsxs("div",{className:"apb-iw",children:[t.jsx(cr,{className:"apb-ico"}),t.jsx("input",{type:"text",name:"last_name",className:"apb-input",value:S.last_name,onChange:w,placeholder:"Last name",required:!0})]})]}),t.jsxs("div",{className:"apb-field",children:[t.jsxs("label",{children:["Email ",t.jsx("span",{className:"req",children:"*"})]}),t.jsxs("div",{className:"apb-iw",children:[t.jsx(lr,{className:"apb-ico"}),t.jsx("input",{type:"email",name:"email",className:"apb-input",value:S.email,onChange:w,placeholder:"you@example.com",required:!0})]})]}),t.jsxs("div",{className:"apb-field",children:[t.jsxs("label",{children:["Contact Number ",t.jsx("span",{className:"req",children:"*"})]}),t.jsxs("div",{className:"apb-iw",children:[t.jsx(Bc,{className:"apb-ico"}),t.jsx("input",{type:"tel",name:"contact_number",className:"apb-input",value:S.contact_number,onChange:w,placeholder:"+94 77 123 4567",required:!0})]})]})]}),t.jsx("div",{className:"apb-fieldset-label",children:"Professional Profile"}),t.jsxs("div",{className:"apb-grid2",children:[t.jsxs("div",{className:"apb-field",children:[t.jsxs("label",{children:["Highest Qualification ",t.jsx("span",{className:"req",children:"*"})]}),t.jsxs("div",{className:"apb-iw",children:[t.jsx(xh,{className:"apb-ico"}),t.jsxs("select",{name:"qualification",className:"apb-input apb-sel",value:S.qualification,onChange:w,required:!0,children:[t.jsx("option",{value:"",children:"Select"}),Lb.map(C=>t.jsx("option",{value:C,children:C},C))]})]})]}),t.jsxs("div",{className:"apb-field",children:[t.jsx("label",{children:"Salary Expectation (LKR)"}),t.jsxs("div",{className:"apb-iw",children:[t.jsx(nb,{className:"apb-ico"}),t.jsx("input",{type:"text",name:"salary_expectation",className:"apb-input",value:S.salary_expectation,onChange:w,placeholder:"e.g. 150,000"})]})]}),t.jsxs("div",{className:"apb-field",children:[t.jsxs("label",{children:["Total Experience ",t.jsx("span",{className:"req",children:"*"})]}),t.jsxs("div",{className:"apb-iw",children:[t.jsx(fn,{className:"apb-ico"}),t.jsxs("select",{name:"overall_experience",className:"apb-input apb-sel",value:S.overall_experience,onChange:w,required:!0,children:[t.jsx("option",{value:"",children:"Select"}),Tb.map(C=>t.jsx("option",{value:C,children:C},C))]})]})]}),t.jsxs("div",{className:"apb-field",children:[t.jsxs("label",{children:["Relevant Experience ",t.jsx("span",{className:"req",children:"*"})]}),t.jsxs("div",{className:"apb-iw",children:[t.jsx(fn,{className:"apb-ico"}),t.jsxs("select",{name:"relevant_experience",className:"apb-input apb-sel",value:S.relevant_experience,onChange:w,required:!0,children:[t.jsx("option",{value:"",children:"Select"}),Ab.map(C=>t.jsx("option",{value:C,children:C},C))]})]})]})]}),t.jsx("div",{className:"apb-fieldset-label",children:"Upload Your CV"}),t.jsxs("div",{className:"apb-upload",onClick:()=>document.getElementById("cv-file").click(),children:[t.jsx("input",{id:"cv-file",type:"file",accept:".pdf,.doc,.docx",style:{display:"none"},onChange:x}),t.jsx("div",{className:`apb-upload-icon ${S.cv?"has-file":""}`,children:S.cv?t.jsx(Di,{size:22}):t.jsx(ub,{size:22})}),t.jsxs("div",{children:[t.jsx("div",{className:"apb-upload-text",children:S.cv?S.cv.name:"Click to upload your CV"}),t.jsx("div",{className:"apb-upload-hint",children:"PDF, DOC, DOCX · Max 5MB"})]})]}),t.jsxs("div",{className:"apb-consent",children:[t.jsx("input",{type:"checkbox",id:"priv",required:!0}),t.jsxs("label",{htmlFor:"priv",children:["I agree my personal information may be processed for recruitment purposes per the ",t.jsx("a",{href:"#",children:"Privacy Policy"}),"."]})]}),t.jsxs("div",{className:"apb-talent-pool",children:[t.jsxs("div",{className:"apb-tp-header",children:[t.jsx("span",{className:"apb-tp-emoji",children:"📂"}),t.jsxs("div",{children:[t.jsx("strong",{children:"Keep my CV for future opportunities?"}),t.jsx("p",{children:"HR can reach out for future roles — no need to apply again."})]})]}),t.jsxs("div",{className:"apb-tp-btns",children:[t.jsx("button",{type:"button",className:`apb-tp-btn yes ${S.future_consent===!0?"sel":""}`,onClick:()=>_({...S,future_consent:!0}),children:"✅ Yes, keep my CV"}),t.jsx("button",{type:"button",className:`apb-tp-btn no ${S.future_consent===!1&&S.future_consent!==null?"sel":""}`,onClick:()=>_({...S,future_consent:!1}),children:"🚫 This role only"})]}),S.future_consent===!0&&t.jsx("div",{className:"apb-tp-note yes",children:"🎉 Your CV will be kept in our Talent Pool."}),S.future_consent===!1&&t.jsx("div",{className:"apb-tp-note no",children:"Only used for this application."})]}),t.jsxs("button",{type:"submit",className:"apb-submit",children:["Review Application ",t.jsx(Dr,{})]})]})]}),g===2&&t.jsxs("div",{className:"apb-card",children:[t.jsx("h2",{className:"apb-card-title",children:"Review Your Application"}),t.jsxs("div",{className:"apb-review-block",children:[t.jsx("div",{className:"apb-rev-section",children:"Personal Information"}),t.jsx("div",{className:"apb-grid2",children:[["First Name",S.first_name],["Last Name",S.last_name],["Email",S.email],["Phone",S.contact_number]].map(([C,L])=>t.jsxs("div",{className:"apb-rv-item",children:[t.jsx("span",{className:"apb-rv-lbl",children:C}),t.jsx("span",{className:"apb-rv-val",children:L})]},C))})]}),t.jsxs("div",{className:"apb-review-block",children:[t.jsx("div",{className:"apb-rev-section",children:"Professional Profile"}),t.jsx("div",{className:"apb-grid2",children:[["Qualification",S.qualification],["Salary",S.salary_expectation||"—"],["Total Exp.",S.overall_experience],["Relevant Exp.",S.relevant_experience]].map(([C,L])=>t.jsxs("div",{className:"apb-rv-item",children:[t.jsx("span",{className:"apb-rv-lbl",children:C}),t.jsx("span",{className:"apb-rv-val",children:L})]},C))})]}),t.jsxs("div",{className:"apb-review-block",children:[t.jsx("div",{className:"apb-rev-section",children:"Documents & Preferences"}),t.jsxs("div",{className:"apb-rv-doc",children:[t.jsx(yr,{}),t.jsx("span",{children:(T=S.cv)==null?void 0:T.name})]}),t.jsxs("div",{className:"apb-rv-item",style:{marginTop:12},children:[t.jsx("span",{className:"apb-rv-lbl",children:"Future Opportunities"}),t.jsx("span",{className:"apb-rv-val",style:{color:S.future_consent?"var(--success)":"var(--text-muted)"},children:S.future_consent?"Yes — keep my CV on file":"No — this role only"})]})]}),t.jsxs("div",{className:"apb-disclosure",children:[t.jsx(Ln,{size:14})," By submitting, you confirm all information is accurate and complete."]}),t.jsxs("div",{className:"apb-review-actions",children:[t.jsxs("button",{className:"apb-edit-btn",onClick:()=>j(1),disabled:u,children:[t.jsx(Mr,{})," Edit"]}),t.jsx("button",{className:"apb-submit apb-submit-final",onClick:N,disabled:u,children:u?"Submitting…":t.jsxs(t.Fragment,{children:[t.jsx(Di,{})," Confirm & Submit"]})})]})]})]})]})}),t.jsx("footer",{className:"footer-premium",children:t.jsx("div",{className:"container",children:t.jsxs("div",{className:"footer-top-grid",children:[t.jsxs("div",{className:"footer-col brand-col",children:[t.jsx("img",{src:"/gs-logo.png",alt:"George Steuart",className:"footer-logo-premium"}),t.jsxs("h3",{className:"footer-brand-name",children:["George Steuart ",t.jsx("br",{}),t.jsx("span",{children:"& Company Ltd"})]}),t.jsx("p",{className:"footer-about-text",children:"Established in 1835, Sri Lanka's oldest mercantile firm."}),t.jsxs("div",{className:"footer-socials",children:[t.jsx("a",{href:"https://www.facebook.com/GeorgeSteuarts",target:"_blank",rel:"noopener noreferrer",className:"social-link",children:t.jsx(Lc,{})}),t.jsx("a",{href:"https://www.linkedin.com/company/george-steuart-&-company-limited",target:"_blank",rel:"noopener noreferrer",className:"social-link",children:t.jsx(Fc,{})})]})]}),t.jsxs("div",{className:"footer-col links-col",children:[t.jsx("h4",{className:"footer-col-title",children:"Quick Links"}),t.jsxs("ul",{className:"footer-links-list",children:[t.jsx("li",{children:t.jsx(qe,{to:"/",children:"Home"})}),t.jsx("li",{children:t.jsx(qe,{to:"/vacancies",children:"All Vacancies"})}),t.jsx("li",{children:t.jsx(qe,{to:"/admin/login",children:"Admin Portal"})})]})]}),t.jsxs("div",{className:"footer-col contact-col",children:[t.jsx("h4",{className:"footer-col-title",children:"Get In Touch"}),t.jsxs("div",{className:"footer-contact-info",children:[t.jsxs("p",{children:[t.jsx(wr,{className:"c-icon"})," No. 439, Galle Road, Colombo 03."]}),t.jsxs("p",{children:[t.jsx(ds,{className:"c-icon"})," www.georgesteuart.lk"]}),t.jsxs("div",{className:"contact-numbers",children:[t.jsxs("p",{children:[t.jsx("span",{children:"T:"})," +94 117 792 400"]}),t.jsxs("p",{children:[t.jsx("span",{children:"E:"})," info@georgesteuart.lk"]})]})]})]}),t.jsx("div",{className:"footer-bottom-bar",children:t.jsxs("div",{className:"copyright-area",children:["© ",new Date().getFullYear()," George Steuart & Company Ltd. All Rights Reserved."]})})]})})})]})}const Ib=jt.replace("/api","");function Fb(){var n;const a=(n=jr().state)==null?void 0:n.vacancy;return t.jsxs("div",{className:"success-page-v2",children:[t.jsx("div",{className:"success-v2-bg"}),t.jsx("nav",{className:"navbar",style:{background:"transparent",border:"none",position:"absolute",top:0,width:"100%",zIndex:20},children:t.jsxs(qe,{to:"/",className:"navbar-brand",children:[t.jsx("img",{src:"/gs-logo.png",alt:"George Steuart & Co",className:"navbar-logo",style:{filter:"brightness(0) invert(1)"}}),t.jsxs("div",{children:[t.jsx("div",{className:"navbar-title",style:{color:"#fff"},children:"George Steuart"}),t.jsx("div",{className:"navbar-subtitle",style:{color:"rgba(255,255,255,0.7)"},children:"Careers"})]})]})}),t.jsx("div",{className:"success-v2-container",children:t.jsxs("div",{className:"success-v2-card",children:[t.jsx("div",{className:"success-v2-company-logo animate-fade-in",style:{marginBottom:"24px",display:"flex",justifyContent:"center"},children:t.jsx("div",{style:{width:"80px",height:"80px",background:"#fff",borderRadius:"16px",padding:"12px",boxShadow:"0 10px 30px rgba(0,0,0,0.08)",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx("img",{src:a!=null&&a.company_logo?`${Ib}/uploads/logos/${a.company_logo}`:"/gs-logo.png",alt:(a==null?void 0:a.company_name)||"George Steuart",onError:o=>o.target.src="/gs-logo.png",style:{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}})})}),t.jsx("div",{className:"success-v2-stamp",children:t.jsx(Di,{strokeWidth:3})}),t.jsx("div",{className:"success-v2-badge",children:"Application Successful"}),t.jsx("h1",{className:"success-v2-title",children:"Legacy Awaits"}),t.jsx("div",{className:"success-v2-message",children:a?t.jsxs("p",{children:["Thank you for your interest in joining ",t.jsx("strong",{children:a.company_name}),". Your application for ",t.jsx("strong",{children:a.title})," has been safely received."]}):t.jsx("p",{children:"Thank you for your interest in joining George Steuart & Company. Your application has been successfully submitted."})}),t.jsxs("div",{className:"v2-next-steps",children:[t.jsxs("div",{className:"next-step-item",children:[t.jsx("div",{className:"next-step-icon",children:t.jsx(lr,{})}),t.jsxs("div",{className:"next-step-content",children:[t.jsx("h5",{children:"Review Process"}),t.jsx("p",{children:"Our team will carefully review your credentials against our heritage of excellence."})]})]}),t.jsxs("div",{className:"next-step-item",children:[t.jsx("div",{className:"next-step-icon",children:t.jsx(or,{})}),t.jsxs("div",{className:"next-step-content",children:[t.jsx("h5",{children:"Timeline"}),t.jsx("p",{children:"Expect to hear back from us within the coming weeks for potential interviews."})]})]}),t.jsxs("div",{className:"next-step-item",children:[t.jsx("div",{className:"next-step-icon",children:t.jsx(wr,{})}),t.jsxs("div",{className:"next-step-content",children:[t.jsx("h5",{children:"Stay Connected"}),t.jsx("p",{children:"Follow our LinkedIn for more updates on career opportunities and firm news."})]})]})]}),t.jsx("div",{className:"success-v2-actions",children:t.jsxs(qe,{to:"/vacancies",className:"btn-v2-outline",children:[t.jsx(Mr,{})," Return to Vacancies"]})})]})}),t.jsxs("div",{style:{padding:"30px",textAlign:"center",color:"rgba(0,0,0,0.4)",fontSize:"0.85rem",position:"relative",zIndex:10},children:["© ",new Date().getFullYear()," George Steuart & Company Ltd. All rights reserved."]})]})}function Bb(){const s=Ot(),[a,n]=U.useState({username:"",password:""}),[o,l]=U.useState(!1),d=async u=>{var f,h;if(u.preventDefault(),!a.username||!a.password){ve.error("Please fill in all fields");return}l(!0);try{const b=await Nv(a);localStorage.setItem("gs_admin_token",b.data.data.token),localStorage.setItem("gs_admin_data",JSON.stringify(b.data.data.admin)),ve.success("Access Granted. Orchestrating Console..."),s("/admin")}catch(b){ve.error(((h=(f=b.response)==null?void 0:f.data)==null?void 0:h.message)||"Authentication failed")}finally{l(!1)}};return t.jsxs("div",{className:"login-split-page",children:[t.jsxs("div",{className:"login-branding-panel",children:[t.jsx("div",{className:"branding-overlay"}),t.jsx("img",{src:"/admin-branding.png",alt:"Branding",className:"branding-bg"}),t.jsxs("div",{className:"branding-content",children:[t.jsx("img",{src:"/gs-logo.png",alt:"GS Logo",className:"branding-logo"}),t.jsxs("div",{className:"branding-text",children:[t.jsx("span",{className:"est-badge",children:"ESTD 1835"}),t.jsxs("h1",{className:"serif-title",children:["Heritage. ",t.jsx("br",{}),"Trust. ",t.jsx("br",{}),"Excellence."]}),t.jsx("p",{children:"Recruitment Orchestration Console v4.0"})]}),t.jsx("div",{className:"branding-footer",children:t.jsxs("div",{className:"secure-badge",children:[t.jsx(At,{})," SECURED END-TO-END"]})})]})]}),t.jsxs("div",{className:"login-form-panel",children:[t.jsxs("button",{className:"back-home-minimal",onClick:()=>s("/"),children:[t.jsx(Mr,{})," Return to Portals"]}),t.jsxs("div",{className:"login-glass-container animated-fade-in",children:[t.jsxs("div",{className:"login-header-p",children:[t.jsx("div",{className:"access-icon",children:t.jsx(da,{})}),t.jsx("h2",{children:"System Access"}),t.jsx("p",{children:"Please provide your administrative credentials to continue."})]}),t.jsxs("form",{className:"premium-login-form",onSubmit:d,children:[t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"username",children:[t.jsx(cr,{})," USERNAME"]}),t.jsx("input",{id:"username",name:"username",type:"text",placeholder:"Enter operational handle",autoComplete:"username",value:a.username,onChange:u=>n({...a,username:u.target.value}),required:!0})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"password",children:[t.jsx(da,{})," SECURITY PASSWORD"]}),t.jsx("input",{id:"password",name:"password",type:"password",placeholder:"••••••••",autoComplete:"current-password",value:a.password,onChange:u=>n({...a,password:u.target.value}),required:!0})]}),t.jsxs("div",{className:"auth-actions",children:[t.jsxs("label",{className:"remember-me",children:[t.jsx("input",{type:"checkbox"})," Keep me signed in"]}),t.jsx("button",{type:"button",onClick:()=>{if(!a.username){ve.warning("Please enter your username first");return}s(`/admin/forgot-password?username=${encodeURIComponent(a.username)}`)},className:"forgot-pass-btn",style:{background:"none",border:"none",color:"var(--crimson)",fontWeight:700,cursor:"pointer",padding:0},children:"Forgot?"})]}),t.jsx("button",{type:"submit",className:"login-btn-premium",disabled:o,children:o?t.jsx("div",{className:"spinner-small"}):t.jsxs(t.Fragment,{children:["AUTHORIZE SESSION ",t.jsx(Zt,{style:{marginLeft:8}})]})})]}),t.jsxs("div",{className:"signup-redirect",children:["Don't have a tactical account? ",t.jsx(qe,{to:"/admin/signup",children:"Register Super Admin"})]})]}),t.jsx("div",{className:"login-footer-p",children:"© 2026 George Steuart & Company Limited. All Rights Reserved."})]}),t.jsx("style",{jsx:"true",children:`
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
            `})]})}function Db(){const s=Ot(),[a,n]=U.useState({full_name:"",username:"",email:"",password:""}),[o,l]=U.useState(!1),d=async u=>{var f,h;if(u.preventDefault(),!a.full_name||!a.username||!a.email||!a.password){ve.error("All fields are required");return}if(a.password.length<6){ve.error("Password must be at least 6 characters");return}l(!0);try{await He.post("/auth.php?action=register_superadmin",a),ve.success("Credential established. Redirecting to access panel..."),setTimeout(()=>s("/admin/login"),1500)}catch(b){ve.error(((h=(f=b.response)==null?void 0:f.data)==null?void 0:h.message)||"Registration failed"),l(!1)}};return t.jsxs("div",{className:"login-split-page",children:[t.jsxs("div",{className:"login-branding-panel",children:[t.jsx("div",{className:"branding-overlay"}),t.jsx("img",{src:"/admin-branding.png",alt:"Branding",className:"branding-bg"}),t.jsxs("div",{className:"branding-content",children:[t.jsx("img",{src:"/gs-logo.png",alt:"GS Logo",className:"branding-logo"}),t.jsxs("div",{className:"branding-text",children:[t.jsx("span",{className:"est-badge",children:"STRATEGIC ENROLLMENT"}),t.jsxs("h1",{className:"serif-title",children:["Elevate. ",t.jsx("br",{}),"Empower. ",t.jsx("br",{}),"Execute."]}),t.jsx("p",{children:"George Steuart Recruitment System | Master Account Setup"})]}),t.jsx("div",{className:"branding-footer",children:t.jsxs("div",{className:"secure-badge",children:[t.jsx(At,{})," ROOT AUTHORITY PROVISIONING"]})})]})]}),t.jsxs("div",{className:"login-form-panel",children:[t.jsxs("button",{className:"back-home-minimal",onClick:()=>s("/"),children:[t.jsx(Mr,{})," Return to Portals"]}),t.jsxs("div",{className:"login-glass-container animated-fade-in",children:[t.jsxs("div",{className:"login-header-p",children:[t.jsx("div",{className:"access-icon",children:t.jsx(At,{})}),t.jsx("h2",{children:"Master Provisioning"}),t.jsx("p",{children:"Establish a high-authority Super Administrator account."})]}),t.jsxs("form",{className:"premium-login-form",onSubmit:d,children:[t.jsxs("div",{className:"form-grid-signup",children:[t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"full_name",children:[t.jsx(cr,{})," FULL NAME"]}),t.jsx("input",{id:"full_name",name:"full_name",type:"text",placeholder:"e.g. Alexander Steuart",autoComplete:"name",value:a.full_name,onChange:u=>n({...a,full_name:u.target.value}),required:!0})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"username",children:[t.jsx(cr,{})," USERNAME (ID)"]}),t.jsx("input",{id:"username",name:"username",type:"text",placeholder:"operational_handle",autoComplete:"username",value:a.username,onChange:u=>n({...a,username:u.target.value}),required:!0})]})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"email",children:[t.jsx(lr,{})," OFFICIAL EMAIL"]}),t.jsx("input",{id:"email",name:"email",type:"email",placeholder:"name@georgesteuart.com",autoComplete:"email",value:a.email,onChange:u=>n({...a,email:u.target.value}),required:!0})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"password",children:[t.jsx(da,{})," SECURE PASSPHRASE"]}),t.jsx("input",{id:"password",name:"password",type:"password",autoComplete:"new-password",placeholder:"Min. 6 high-entropy characters",value:a.password,onChange:u=>n({...a,password:u.target.value}),required:!0})]}),t.jsx("button",{type:"submit",className:"login-btn-premium",disabled:o,children:o?t.jsx("div",{className:"spinner-small"}):t.jsxs(t.Fragment,{children:["PROVISION MASTER ACCOUNT ",t.jsx(Zt,{style:{marginLeft:8}})]})})]}),t.jsxs("div",{className:"signup-redirect",children:["Already have an established profile? ",t.jsx(qe,{to:"/admin/login",children:"Authorize Access"})]})]}),t.jsx("div",{className:"login-footer-p",children:"© 2026 George Steuart & Company Limited. Global Identity System."})]}),t.jsx("style",{jsx:"true",children:`
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
            `})]})}const ff=jt.replace("/api","");function Mb({admin:s,children:a}){var b;const n=Ot(),o=jr(),[l,d]=U.useState(!1),u=()=>{localStorage.removeItem("gs_admin_token"),localStorage.removeItem("gs_admin_data"),n("/admin/login")},f=(s.full_name||"Admin").split(" ").filter(Boolean).map(g=>g[0]).join("").substring(0,2).toUpperCase(),h=[{to:"/admin",icon:t.jsx(sb,{}),label:"Dashboard",end:!0,badge:null},{to:"/admin/vacancies",icon:t.jsx(Ht,{}),label:"Vacancies",badge:null},{to:"/admin/applicants",icon:t.jsx(dr,{}),label:"Applicants",badge:null},{to:"/admin/talent-pool",icon:t.jsx(ps,{}),label:"Talent Pool",badge:null}];return s.role==="super_admin"&&h.push({to:"/admin/admins",icon:t.jsx(pb,{}),label:"Manage Admins",badge:null}),(b=h.find(g=>g.end?o.pathname==="/admin":o.pathname.startsWith(g.to)))!=null&&b.label,t.jsxs("div",{className:"admin-layout",children:[t.jsxs("div",{className:"admin-mobile-header",children:[t.jsx("button",{className:"hamburger-btn",onClick:()=>d(!l),"aria-label":"Toggle Sidebar",children:l?t.jsx(bt,{size:24}):t.jsx(so,{size:24})}),t.jsxs("div",{className:"mobile-brand",style:{display:"flex",alignItems:"center",gap:10},children:[t.jsx("img",{src:s.role==="sub_admin"&&s.company_logo?`${ff}/uploads/logos/${s.company_logo}`:"/gs-logo.png",alt:"George Steuart & Co",className:"sidebar-logo",onError:g=>g.target.src="/gs-logo.png",style:{height:32,width:"auto",objectFit:"contain",background:s.role==="sub_admin"&&s.company_logo?"#fff":"transparent",padding:s.role==="sub_admin"&&s.company_logo?"2px":"0",borderRadius:"4px"}}),t.jsx("span",{style:{fontWeight:800,fontSize:"0.85rem",letterSpacing:"1px",textTransform:"uppercase",color:"var(--crimson)"},children:"Admin"})]}),t.jsx("div",{style:{width:44}})]}),l&&t.jsx("div",{className:"sidebar-overlay",onClick:()=>d(!1)}),t.jsxs("aside",{className:`admin-sidebar enhanced-sidebar ${l?"open":""}`,children:[t.jsx("div",{className:"sidebar-top-accent"}),t.jsx("div",{className:"sidebar-header",children:t.jsxs("div",{className:"sidebar-brand",children:[t.jsx("div",{className:"sidebar-logo-wrapper",children:t.jsx("img",{src:s.role==="sub_admin"&&s.company_logo?`${ff}/uploads/logos/${s.company_logo}`:"/gs-logo.png",alt:"George Steuart & Co",className:"sidebar-logo",onError:g=>g.target.src="/gs-logo.png",style:{background:s.role==="sub_admin"&&s.company_logo?"#fff":"transparent",padding:s.role==="sub_admin"&&s.company_logo?"4px":"0",borderRadius:"8px",objectFit:"contain"}})}),t.jsxs("div",{children:[t.jsx("div",{className:"sidebar-title",children:s.role==="sub_admin"&&s.company_name?s.company_name:"George Steuart"}),t.jsxs("div",{className:"sidebar-role",children:[t.jsx("span",{className:"role-dot"}),s.role==="super_admin"?"Super Admin":"Sub Admin"]})]})]})}),t.jsx("div",{className:"sidebar-nav-label",children:"NAVIGATION"}),t.jsx("nav",{className:"sidebar-nav",children:h.map(g=>t.jsxs(Hx,{to:g.to,end:g.end,className:({isActive:j})=>`sidebar-link ${j?"active":""}`,onClick:()=>d(!1),children:[t.jsx("span",{className:"sidebar-link-icon",children:g.icon}),t.jsx("span",{className:"sidebar-link-text",children:g.label}),g.badge&&t.jsx("span",{className:"sidebar-badge",children:g.badge}),t.jsx(Dr,{className:"sidebar-link-arrow",size:14})]},g.to))}),t.jsxs("div",{className:"sidebar-footer",children:[t.jsxs("div",{className:"sidebar-user-card",children:[t.jsxs("div",{className:"sidebar-avatar-enhanced",children:[t.jsx("span",{children:f}),t.jsx("div",{className:"avatar-online-dot"})]}),t.jsxs("div",{className:"sidebar-user-info",children:[t.jsx("div",{className:"sidebar-user-name",children:s.full_name}),t.jsx("div",{className:"sidebar-user-role",children:s.role==="super_admin"?"Super Administrator":s.company_name||"Sub Admin"})]})]}),t.jsxs("button",{className:"sidebar-logout-btn",onClick:u,children:[t.jsx(lb,{size:15}),t.jsx("span",{children:"Sign Out"})]})]})]}),t.jsx("main",{className:"admin-content",children:a}),t.jsx("style",{jsx:"true",children:`
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
            `})]})}const Ub=jt.replace("/api","");function Ai(s,a=1200,n=!0){const[o,l]=U.useState(0);return U.useEffect(()=>{if(!n||!s){l(s||0);return}let d=null;const u=f=>{d||(d=f);const h=Math.min((f-d)/a,1),b=1-Math.pow(1-h,3);l(Math.floor(b*s)),h<1&&requestAnimationFrame(u)};requestAnimationFrame(u)},[s,n]),o}function Wb({admin:s}){var T,C,L;const[a,n]=U.useState(null),[o,l]=U.useState([]),[d,u]=U.useState(!0),[f,h]=U.useState(!1),b=Ot();U.useEffect(()=>{g()},[]);const g=async()=>{var F,M;try{const[G,H]=await Promise.all([uh(),Tc()]);n(((F=G==null?void 0:G.data)==null?void 0:F.data)||null),l((((M=H==null?void 0:H.data)==null?void 0:M.data)||[]).slice(0,5))}catch(G){console.error(G)}finally{u(!1),setTimeout(()=>h(!0),100)}},j=Ai((a==null?void 0:a.total_vacancies)||0,1e3,f),S=Ai((a==null?void 0:a.active_vacancies)||0,1e3,f),_=Ai((a==null?void 0:a.total_applications)||0,1200,f),w=Ai((a==null?void 0:a.talent_pool_count)||0,1e3,f);if(d)return t.jsx("div",{className:"dashboard-loading-screen",children:t.jsx("div",{className:"loading-orb"})});const x=((s==null?void 0:s.full_name)||(s==null?void 0:s.username)||"Admin").split(" ")[0],v=new Date().getHours(),N=v<12?"Good morning":v<17?"Good afternoon":"Good evening",P=(a==null?void 0:a.total_vacancies)>0?Math.round((a==null?void 0:a.active_vacancies)/(a==null?void 0:a.total_vacancies)*100):0;return t.jsxs("div",{className:"premium-dashboard-container",children:[t.jsxs("div",{className:"dashboard-hero-premium",children:[t.jsxs("div",{className:"hero-content-p",children:[t.jsxs("div",{className:"hero-badge-p",children:[t.jsx(mh,{})," System Executive Suite"]}),t.jsxs("h1",{className:"hero-title-p",children:[N,", ",x]}),t.jsx("p",{className:"hero-subtitle-p",children:"George Steuart Recruitment Orchestration Console · Established 1835"})]}),t.jsxs("div",{className:"hero-actions-p",children:[t.jsxs("button",{className:"btn-hero-p primary",onClick:()=>b("/admin/vacancies/create"),children:[t.jsx(us,{})," New Vacancy"]}),t.jsxs("button",{className:"btn-hero-p secondary",onClick:()=>b("/admin/applicants"),children:[t.jsx(dr,{})," Review Pipeline"]})]}),t.jsx("div",{className:"hero-bg-accent"}),t.jsx("div",{className:"hero-grid-pattern"})]}),t.jsxs("div",{className:"stats-mosaic-grid admin-grid-4",children:[t.jsxs("div",{className:"stat-glass-card gold",style:{animationDelay:"0.1s"},children:[t.jsx("div",{className:"s-icon",children:t.jsx(Ht,{})}),t.jsxs("div",{className:"s-info",children:[t.jsx("span",{className:"s-label",children:"Total Listings"}),t.jsx("span",{className:"s-value",children:j})]}),t.jsx("div",{className:"s-progress-bar",children:t.jsx("div",{className:"s-progress-fill gold-fill",style:{width:"100%"}})}),t.jsxs("div",{className:"s-trend",children:[t.jsx(bh,{})," Global Overview"]})]}),t.jsxs("div",{className:"stat-glass-card green",style:{animationDelay:"0.2s"},children:[t.jsx("div",{className:"s-icon",children:t.jsx(Zt,{})}),t.jsxs("div",{className:"s-info",children:[t.jsx("span",{className:"s-label",children:"Live Channels"}),t.jsx("span",{className:"s-value",children:S})]}),t.jsx("div",{className:"s-progress-bar",children:t.jsx("div",{className:"s-progress-fill green-fill",style:{width:`${P}%`}})}),t.jsxs("div",{className:"s-trend positive",children:[t.jsx(eb,{})," ",P,"% Active Rate"]})]}),t.jsxs("div",{className:"stat-glass-card blue",style:{animationDelay:"0.3s"},children:[t.jsx("div",{className:"s-icon",children:t.jsx(dr,{})}),t.jsxs("div",{className:"s-info",children:[t.jsx("span",{className:"s-label",children:"Engagement"}),t.jsx("span",{className:"s-value",children:_})]}),t.jsx("div",{className:"s-progress-bar",children:t.jsx("div",{className:"s-progress-fill blue-fill",style:{width:"75%"}})}),t.jsx("div",{className:"s-trend",children:"Total Submissions"})]}),t.jsxs("div",{className:"stat-glass-card purple",style:{animationDelay:"0.4s"},children:[t.jsx("div",{className:"s-icon",children:t.jsx(ps,{})}),t.jsxs("div",{className:"s-info",children:[t.jsx("span",{className:"s-label",children:"Talent Reserve"}),t.jsx("span",{className:"s-value",children:w})]}),t.jsx("div",{className:"s-progress-bar",children:t.jsx("div",{className:"s-progress-fill purple-fill",style:{width:"60%"}})}),t.jsx("div",{className:"s-trend",children:"Future Insights"})]})]}),t.jsxs("div",{className:"dashboard-main-flow",children:[t.jsxs("div",{className:"main-activity-content",children:[t.jsxs("div",{className:"activity-card-p",children:[t.jsxs("div",{className:"card-header-p",children:[t.jsxs("div",{className:"ch-title",children:[t.jsx(ob,{}),t.jsx("h3",{children:"Active Recruitment Channels"})]}),t.jsxs("button",{className:"ch-link",onClick:()=>b("/admin/vacancies"),children:["All Channels ",t.jsx(On,{})]})]}),t.jsx("div",{className:"activity-list-p",children:o.length===0?t.jsx("div",{className:"empty-state-p",children:"No active channels found."}):o.map((F,M)=>t.jsxs("div",{className:"vacancy-item-mini",style:{animationDelay:`${M*.08}s`},onClick:()=>b("/admin/applicants?vacancy_id="+F.id),children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",flex:1},children:[t.jsx("img",{src:F.company_logo?`${Ub}/uploads/logos/${F.company_logo}`:"/gs-logo.png",alt:F.company_name,onError:G=>G.target.src="/gs-logo.png",style:{width:"36px",height:"36px",objectFit:"contain",borderRadius:"8px",background:"#fff",border:"1px solid #e2e8f0",padding:"3px"}}),t.jsxs("div",{className:"v-info",children:[t.jsx("strong",{children:F.title}),t.jsx("span",{children:F.company_name})]})]}),t.jsxs("div",{className:"v-metric",children:[t.jsx("span",{className:"count",children:F.application_count||0}),t.jsx("span",{className:"lbl",children:"Applicants"})]}),t.jsx("div",{className:"v-status",children:t.jsx("span",{className:`pill ${Pr(F.expire_date)>0?"live":"ending"}`,children:Pr(F.expire_date)>0?"● LIVE":"○ ENDED"})})]},F.id))})]}),t.jsxs("div",{className:"activity-card-p",children:[t.jsxs("div",{className:"card-header-p",children:[t.jsxs("div",{className:"ch-title",children:[t.jsx(mb,{}),t.jsx("h3",{children:"Latest Applicant Pulse"})]}),t.jsxs("button",{className:"ch-link",onClick:()=>b("/admin/applicants"),children:["View Pipeline ",t.jsx(On,{})]})]}),t.jsx("div",{className:"applicant-pulse-list",children:((T=a==null?void 0:a.recent_applications)==null?void 0:T.length)>0?a.recent_applications.map((F,M)=>t.jsxs("div",{className:"pulse-item",style:{animationDelay:`${M*.07}s`},children:[t.jsxs("div",{className:"p-avatar",style:{background:`hsl(${(M*47+20)%360}, 60%, 92%)`,color:`hsl(${(M*47+20)%360}, 60%, 30%)`},children:[F.first_name[0],F.last_name[0]]}),t.jsxs("div",{className:"p-text",children:[t.jsxs("p",{children:[t.jsxs("strong",{children:[F.first_name," ",F.last_name]})," applied for ",t.jsx("span",{children:F.vacancy_title})]}),t.jsxs("span",{className:"p-time",children:[t.jsx(fn,{})," ",br(F.applied_at)]})]}),t.jsx("div",{className:"pulse-dot"})]},M)):t.jsx("div",{className:"empty-state-p",children:"No recent pulses detected."})})]})]}),t.jsxs("div",{className:"command-sidebar-p",children:[t.jsxs("div",{className:"upcoming-interviews-card",children:[t.jsxs("div",{className:"ui-header",children:[t.jsx(or,{}),t.jsx("h3",{children:"Upcoming Interviews"}),((C=a==null?void 0:a.upcoming_interviews)==null?void 0:C.length)>0&&t.jsx("span",{className:"ui-count-badge",children:a.upcoming_interviews.length})]}),t.jsx("div",{className:"ui-list",children:((L=a==null?void 0:a.upcoming_interviews)==null?void 0:L.length)>0?a.upcoming_interviews.map((F,M)=>t.jsxs("div",{className:"ui-item",onClick:()=>b("/admin/applicants?search="+encodeURIComponent(F.first_name+" "+F.last_name)),children:[t.jsxs("div",{className:"ui-date-box",children:[t.jsx("span",{className:"ui-day",children:new Date(F.interview_date).getDate()}),t.jsx("span",{className:"ui-month",children:new Date(F.interview_date).toLocaleString("default",{month:"short"})})]}),t.jsxs("div",{className:"ui-details",children:[t.jsxs("strong",{children:[F.first_name," ",F.last_name]}),t.jsx("span",{children:F.vacancy_title}),t.jsxs("div",{className:"ui-meta",children:[t.jsx(fn,{size:10})," ",F.interview_time," · ",F.interview_type]})]})]},F.id||M)):t.jsx("div",{className:"empty-state-p",style:{padding:"0px",textAlign:"left",background:"transparent",border:"none"},children:"No upcoming interviews scheduled."})})]}),t.jsxs("div",{className:"shortcut-mosaic-card",children:[t.jsx("label",{children:"Command Shortcuts"}),t.jsxs("div",{className:"shortcut-grid-p admin-grid-2",children:[t.jsxs("div",{className:"shortcut-tile",onClick:()=>b("/admin/applicants"),children:[t.jsx("div",{className:"shortcut-icon blue",children:t.jsx(dr,{})}),t.jsx("span",{children:"Applicants"})]}),t.jsxs("div",{className:"shortcut-tile",onClick:()=>b("/admin/talent-pool"),children:[t.jsx("div",{className:"shortcut-icon purple",children:t.jsx(ps,{})}),t.jsx("span",{children:"Pool"})]}),t.jsxs("div",{className:"shortcut-tile",onClick:()=>b("/admin/vacancies"),children:[t.jsx("div",{className:"shortcut-icon gold",children:t.jsx(yr,{})}),t.jsx("span",{children:"Posts"})]}),t.jsxs("div",{className:"shortcut-tile",onClick:()=>b("/admin/vacancies/create"),children:[t.jsx("div",{className:"shortcut-icon green",children:t.jsx(us,{})}),t.jsx("span",{children:"Post Job"})]})]})]}),t.jsxs("div",{className:"status-console-card",children:[t.jsxs("div",{className:"console-header",children:[t.jsx("div",{className:"live-dot pulse"}),t.jsx("span",{children:"System Status: Healthy"})]}),t.jsxs("div",{className:"status-metrics",children:[t.jsxs("div",{className:"status-metric",children:[t.jsx("span",{children:"Uptime"}),t.jsx("div",{className:"metric-bar",children:t.jsx("div",{className:"metric-fill",style:{width:"99%"}})}),t.jsx("span",{className:"metric-val",children:"99%"})]}),t.jsxs("div",{className:"status-metric",children:[t.jsx("span",{children:"Database"}),t.jsx("div",{className:"metric-bar",children:t.jsx("div",{className:"metric-fill",style:{width:"95%"}})}),t.jsx("span",{className:"metric-val",children:"Sync"})]})]}),t.jsx("p",{children:"All recruitment services are operational. GS legacy cloud is synchronized."}),t.jsx("div",{className:"console-footer",children:t.jsx("span",{children:"V 2.5.0 · Premium Edition"})})]}),t.jsxs("div",{className:"heritage-footer-p",children:[t.jsx("img",{src:"/gs-logo.png",alt:"GS"}),t.jsxs("p",{children:["George Steuart & Company",t.jsx("br",{}),"Trusted since 1835"]})]})]})]}),t.jsx("style",{jsx:"true",children:`
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
            `})]})}const hf=jt.replace("/api","");function $b({admin:s}){const a=Ot(),[n,o]=U.useState([]),[l,d]=U.useState([]),[u,f]=U.useState({total_vacancies:0,active_vacancies:0,total_applications:0}),[h,b]=U.useState(!0),[g,j]=U.useState(null),[S,_]=U.useState(""),[w,x]=U.useState(""),[v,N]=U.useState(null),[P,T]=U.useState(1),C=8;U.useEffect(()=>{L()},[S]);const L=async()=>{try{b(!0);const te={};S&&(te.company_id=S);const[A,K,k]=await Promise.all([Tc(te),In(),uh()]);o(A.data.data||[]),d(K.data.data||[]),f(k.data.data||{total_vacancies:0,active_vacancies:0,total_applications:0})}catch(te){console.error(te),ve.error("Failed to load dashboard data")}finally{b(!1)}},F=async te=>{var A,K;try{await Pv({id:te}),ve.success("Vacancy deleted successfully"),j(null),L()}catch(k){ve.error(((K=(A=k.response)==null?void 0:A.data)==null?void 0:K.message)||"Delete failed")}},M=n.filter(te=>te.title.toLowerCase().includes(w.toLowerCase())||te.reference_number&&te.reference_number.toLowerCase().includes(w.toLowerCase())||te.company_name.toLowerCase().includes(w.toLowerCase())||te.designation.toLowerCase().includes(w.toLowerCase())),G=Math.ceil(M.length/C),H=(P-1)*C,pe=M.slice(H,H+C);return U.useEffect(()=>{T(1)},[w,S]),t.jsxs("div",{className:"manage-vacancies-console",children:[t.jsxs("div",{className:"vacancies-orchestration-header",children:[t.jsx("div",{className:"hero-bg-accent"}),t.jsxs("div",{className:"header-content-p",children:[t.jsxs("div",{className:"console-badge",children:[t.jsx("span",{className:"live-dot pulse"}),"RECRUITMENT ORCHESTRATION CONSOLE"]}),t.jsx("h1",{className:"serif-title-p",children:"Manage Vacancies"}),t.jsx("p",{className:"hero-subline",children:"Track and publish job opportunities across George Steuart & Company establishments."})]}),t.jsxs("button",{className:"btn-establish-p",onClick:()=>a("/admin/vacancies/create"),children:[t.jsx(us,{})," ",t.jsx("span",{children:"Establish New Vacancy"})]})]}),t.jsxs("div",{className:"stats-mosaic-p",children:[t.jsxs("div",{className:"mosaic-card-p glass-card-p",children:[t.jsx("div",{className:"m-icon blue",children:t.jsx(Ht,{})}),t.jsxs("div",{className:"m-info",children:[t.jsx("span",{className:"m-label",children:"Total Listings"}),t.jsx("span",{className:"m-value",children:u.total_vacancies})]}),t.jsx("div",{className:"m-footer",children:"Global Overview"})]}),t.jsxs("div",{className:"mosaic-card-p glass-card-p",children:[t.jsx("div",{className:"m-icon green",children:t.jsx(Zt,{})}),t.jsxs("div",{className:"m-info",children:[t.jsx("span",{className:"m-label",children:"Live Channels"}),t.jsx("span",{className:"m-value",children:u.active_vacancies})]}),t.jsx("div",{className:"m-footer active",children:"Active & Viral"})]}),t.jsxs("div",{className:"mosaic-card-p glass-card-p",children:[t.jsx("div",{className:"m-icon gold",children:t.jsx(dr,{})}),t.jsxs("div",{className:"m-info",children:[t.jsx("span",{className:"m-label",children:"Engagement"}),t.jsx("span",{className:"m-value",children:u.total_applications})]}),t.jsx("div",{className:"m-footer",children:"Total Submissions"})]}),t.jsxs("div",{className:"mosaic-card-p glass-card-p",children:[t.jsx("div",{className:"m-icon crimson",children:t.jsx(Ln,{})}),t.jsxs("div",{className:"m-info",children:[t.jsx("span",{className:"m-label",children:"Expiring Soon"}),t.jsx("span",{className:"m-value",children:n.filter(te=>Pr(te.expire_date)>0&&Pr(te.expire_date)<=7).length})]}),t.jsx("div",{className:"m-footer urgent",children:"Urgent Action"})]})]}),t.jsxs("div",{className:"console-toolbar-p",children:[t.jsxs("div",{className:"toolbar-search-row",children:[t.jsxs("div",{className:"search-orchestrator",children:[t.jsx(ua,{className:"s-icon"}),t.jsx("input",{id:"vacancy_search",name:"vacancy_search",type:"text",placeholder:"Search position, reference or establishment...",value:w,onChange:te=>x(te.target.value)})]}),t.jsxs("button",{className:"btn-reset-p",onClick:()=>{x(""),_("")},children:[t.jsx(bt,{})," ",t.jsx("span",{children:"Reset Console"})]})]}),t.jsx("div",{className:"toolbar-filters-row",children:s.role==="super_admin"&&t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{children:"Establishment"}),t.jsxs("div",{className:"select-orchestrator",children:[t.jsx(Oc,{className:"f-icon"}),t.jsxs("select",{id:"company_filter",name:"company_id",value:S,onChange:te=>_(te.target.value),className:"select-lg",children:[t.jsx("option",{value:"",children:"All GS Entities"}),l.map(te=>t.jsx("option",{value:te.id,children:te.name},te.id))]})]})]})})]}),t.jsx("div",{className:"orchestration-table-wrapper card-p",children:h?t.jsxs("div",{className:"loading-state-p",children:[t.jsx("div",{className:"spinner-p"}),t.jsx("p",{children:"Synchronizing vacancy data..."})]}):M.length===0?t.jsxs("div",{className:"empty-state-p",children:[t.jsx("div",{className:"empty-icon",children:t.jsx(Ht,{})}),t.jsx("h3",{children:"No matches found"}),t.jsx("p",{children:"We couldn't find any vacancies matching your current filters."}),t.jsx("button",{className:"btn btn-outline",onClick:()=>{x(""),_("")},children:"Reset Console"})]}):t.jsxs("div",{className:"premium-table-container",children:[t.jsxs("table",{className:"premium-table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Position & Establishment"}),t.jsx("th",{children:"Classification"}),t.jsx("th",{children:"Engagement Pulse"}),t.jsx("th",{children:"Registry Timeline"}),t.jsx("th",{children:"Status"}),t.jsx("th",{style:{textAlign:"right"},children:"Operations"})]})}),t.jsx("tbody",{children:pe.map(te=>{const A=te.is_active&&Pr(te.expire_date)>0;return t.jsxs("tr",{children:[t.jsx("td",{children:t.jsxs("div",{className:"pos-entity-cell",children:[te.reference_number&&t.jsxs("span",{className:"ref-badge-inline",children:["#",te.reference_number]}),t.jsx("span",{className:"pos-name",children:te.title}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"4px"},children:[t.jsx("img",{src:te.company_logo?`${hf}/uploads/logos/${te.company_logo}`:"/gs-logo.png",alt:te.company_name,onError:K=>K.target.src="/gs-logo.png",style:{width:"22px",height:"22px",objectFit:"contain",borderRadius:"4px",background:"#f8fafc",border:"1px solid #e2e8f0",padding:"2px",flexShrink:0}}),t.jsx("span",{className:"entity-name",style:{margin:0},children:te.company_name})]})]})}),t.jsx("td",{children:t.jsxs("div",{className:"classification-cell",children:[t.jsx("span",{className:"class-badge",children:te.employment_type}),te.designation&&te.designation.toLowerCase()!==te.title.toLowerCase()&&t.jsx("span",{className:"designation-sub",children:te.designation})]})}),t.jsx("td",{children:t.jsxs("div",{className:"pulse-cell",children:[t.jsxs("div",{className:"pulse-info",children:[t.jsx("strong",{children:te.application_count||0}),t.jsx("span",{children:"Applicants"})]}),t.jsx("div",{className:"mini-bar",children:t.jsx("div",{className:"bar-fill",style:{width:`${Math.min((te.application_count||0)*5,100)}%`}})})]})}),t.jsx("td",{children:t.jsxs("div",{className:"timeline-cell",children:[t.jsxs("span",{children:[t.jsx(or,{size:12})," ",br(te.publish_date)]}),t.jsxs("span",{className:`${Pr(te.expire_date)<=7?"critical":""}`,children:[t.jsx(fn,{size:12})," Exp: ",br(te.expire_date)]})]})}),t.jsx("td",{children:t.jsxs("div",{className:`status-orb-p ${A?"live":"expired"}`,children:[t.jsx("span",{className:"orb"}),t.jsx("span",{className:"orb-text",children:A?"Live":"Ended"})]})}),t.jsx("td",{children:t.jsxs("div",{className:"orchestration-actions",children:[t.jsx("button",{className:"o-btn view",onClick:()=>N(te),title:"View Job Description",children:t.jsx(ab,{})}),t.jsx("button",{className:"o-btn edit",onClick:()=>a(`/admin/vacancies/edit/${te.id}`),title:"Edit Configuration",children:t.jsx(xc,{})}),t.jsx("button",{className:"o-btn applicants",onClick:()=>a(`/admin/applicants?vacancy_id=${te.id}`),title:"View Pipeline",children:t.jsx(On,{})}),t.jsx("button",{className:"o-btn delete",onClick:()=>j(te.id),title:"Decommission",children:t.jsx(fs,{})})]})})]},te.id)})})]}),t.jsxs("div",{className:"pagination-footer",children:[t.jsxs("div",{className:"page-info",children:["Showing ",t.jsxs("strong",{children:[H+1,"-",Math.min(H+C,M.length)]})," of ",t.jsx("strong",{children:M.length})," vacancies"]}),t.jsxs("div",{className:"pagination-controls",children:[t.jsxs("button",{className:"page-btn",onClick:()=>T(te=>Math.max(te-1,1)),disabled:P===1,title:"Previous Page",children:[t.jsx(ao,{})," Previous"]}),t.jsxs("button",{className:"page-btn",onClick:()=>T(te=>Math.min(te+1,G)),disabled:P===G||G===0,title:"Next Page",children:["Next ",t.jsx(Dr,{})]})]})]})]})}),g&&t.jsx("div",{className:"confirm-overlay",onClick:()=>j(null),children:t.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:te=>te.stopPropagation(),children:[t.jsx("div",{className:"warning-visual",children:t.jsx(Ln,{})}),t.jsx("h3",{children:"Decommission Position?"}),t.jsx("p",{children:"This action will permanently remove this vacancy and all associated records from the orchestration console. This cannot be undone."}),t.jsxs("div",{className:"modal-actions-p",children:[t.jsx("button",{className:"btn-secondary-p",onClick:()=>j(null),children:"Abort"}),t.jsx("button",{className:"btn-danger-p",onClick:()=>F(g),children:"Confirm Decommission"})]})]})}),v&&t.jsx("div",{className:"confirm-overlay",onClick:()=>N(null),children:t.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:te=>te.stopPropagation(),style:{maxWidth:"850px",width:"95%",maxHeight:"90vh",textAlign:"left",overflow:"hidden",display:"flex",flexDirection:"column"},children:[t.jsxs("div",{className:"modal-header-p",style:{background:"linear-gradient(135deg, #2a050b 0%, var(--crimson-dark) 100%)",flexShrink:0,position:"relative",overflow:"hidden"},children:[t.jsx("div",{style:{position:"absolute",top:"-40px",right:"-40px",width:"200px",height:"200px",background:"var(--gold-accent)",filter:"blur(120px)",opacity:.15,borderRadius:"50%"}}),t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative",zIndex:2},children:[t.jsxs("div",{children:[t.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",padding:"4px 14px",borderRadius:"100px",fontSize:"0.65rem",fontWeight:800,color:"rgba(255,255,255,0.8)",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"14px"},children:[t.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:v.is_active&&Pr(v.expire_date)>0?"#10b981":"#94a3b8"}}),v.is_active&&Pr(v.expire_date)>0?"LIVE POSTING":"ENDED"]}),t.jsx("h2",{style:{margin:0,color:"#fff",fontFamily:"var(--font-heading)",fontSize:"2rem",letterSpacing:"-0.5px",lineHeight:1.2},children:v.title}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",margin:"10px 0 0"},children:[t.jsx("img",{src:v.company_logo?`${hf}/uploads/logos/${v.company_logo}`:"/gs-logo.png",alt:v.company_name,onError:te=>te.target.src="/gs-logo.png",style:{width:"36px",height:"36px",objectFit:"contain",borderRadius:"8px",background:"#fff",border:"2px solid rgba(255,255,255,0.2)",padding:"3px",flexShrink:0}}),t.jsx("p",{style:{margin:0,color:"rgba(255,255,255,0.7)",fontSize:"0.9rem",fontWeight:600},children:v.company_name})]})]}),t.jsx("button",{onClick:()=>N(null),style:{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",width:"38px",height:"38px",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1.1rem",flexShrink:0},children:t.jsx(bt,{})})]}),t.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"10px",marginTop:"20px",position:"relative",zIndex:2},children:[v.reference_number&&t.jsx("span",{style:{background:"rgba(200,169,81,0.15)",color:"var(--gold-accent)",padding:"6px 14px",borderRadius:"10px",fontSize:"0.75rem",fontWeight:700,border:"1px solid rgba(200,169,81,0.25)",fontFamily:'"JetBrains Mono", monospace'},children:v.reference_number}),t.jsxs("span",{style:{background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.8)",padding:"6px 14px",borderRadius:"10px",fontSize:"0.75rem",fontWeight:700,display:"flex",alignItems:"center",gap:"6px"},children:[t.jsx(Ht,{size:12})," ",v.employment_type]}),v.location&&t.jsxs("span",{style:{background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.8)",padding:"6px 14px",borderRadius:"10px",fontSize:"0.75rem",fontWeight:700,display:"flex",alignItems:"center",gap:"6px"},children:[t.jsx(wr,{size:12})," ",v.location]}),t.jsxs("span",{style:{background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.8)",padding:"6px 14px",borderRadius:"10px",fontSize:"0.75rem",fontWeight:700,display:"flex",alignItems:"center",gap:"6px"},children:[t.jsx(dr,{size:12})," ",v.application_count||0," Applicants"]})]})]}),t.jsxs("div",{className:"modal-body-p",style:{flex:1,overflowY:"auto"},children:[t.jsxs("div",{className:"admin-grid-4",style:{gap:"16px",marginBottom:"32px"},children:[t.jsxs("div",{style:{background:"#f8fafc",padding:"16px 20px",borderRadius:"16px",border:"1px solid #f1f5f9"},children:[t.jsx("span",{style:{display:"block",fontSize:"0.65rem",fontWeight:800,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"6px"},children:"Designation"}),t.jsx("p",{style:{margin:0,fontWeight:700,color:"var(--text-primary)",fontSize:"0.95rem"},children:v.designation})]}),t.jsxs("div",{style:{background:"#f8fafc",padding:"16px 20px",borderRadius:"16px",border:"1px solid #f1f5f9"},children:[t.jsx("span",{style:{display:"block",fontSize:"0.65rem",fontWeight:800,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"6px"},children:"Min. Experience"}),t.jsx("p",{style:{margin:0,fontWeight:700,color:"var(--text-primary)",fontSize:"0.95rem"},children:v.min_experience||"Not specified"})]}),t.jsxs("div",{style:{background:"#f8fafc",padding:"16px 20px",borderRadius:"16px",border:"1px solid #f1f5f9"},children:[t.jsx("span",{style:{display:"block",fontSize:"0.65rem",fontWeight:800,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"6px"},children:"Published"}),t.jsxs("p",{style:{margin:0,fontWeight:700,color:"var(--text-primary)",fontSize:"0.95rem",display:"flex",alignItems:"center",gap:"6px"},children:[t.jsx(or,{size:13}),br(v.publish_date)]})]}),t.jsxs("div",{style:{background:"#f8fafc",padding:"16px 20px",borderRadius:"16px",border:"1px solid #f1f5f9"},children:[t.jsx("span",{style:{display:"block",fontSize:"0.65rem",fontWeight:800,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"6px"},children:"Expires"}),t.jsxs("p",{style:{margin:0,fontWeight:700,color:Pr(v.expire_date)<=7?"var(--crimson)":"var(--text-primary)",fontSize:"0.95rem",display:"flex",alignItems:"center",gap:"6px"},children:[t.jsx(fn,{size:13}),br(v.expire_date)]})]})]}),t.jsxs("div",{style:{marginBottom:"28px"},children:[t.jsxs("h3",{style:{fontFamily:"var(--font-heading)",fontSize:"1.2rem",color:"var(--text-primary)",margin:"0 0 14px 0",display:"flex",alignItems:"center",gap:"10px"},children:[t.jsx(yr,{style:{color:"var(--crimson)"}})," Job Description"]}),t.jsx("div",{style:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:"16px",padding:"24px",lineHeight:1.8,color:"var(--text-secondary)",fontSize:"0.92rem",whiteSpace:"pre-wrap"},children:v.description||t.jsx("span",{style:{color:"var(--text-muted)",fontStyle:"italic"},children:"No description provided."})})]}),v.requirements&&t.jsxs("div",{style:{marginBottom:"28px"},children:[t.jsxs("h3",{style:{fontFamily:"var(--font-heading)",fontSize:"1.2rem",color:"var(--text-primary)",margin:"0 0 14px 0",display:"flex",alignItems:"center",gap:"10px"},children:[t.jsx(Zt,{style:{color:"var(--gold-accent)"}})," Requirements & Qualifications"]}),t.jsx("div",{style:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:"16px",padding:"24px",lineHeight:1.8,color:"var(--text-secondary)",fontSize:"0.92rem",whiteSpace:"pre-wrap"},children:v.requirements})]})]}),t.jsxs("div",{className:"modal-actions-footer-p",style:{borderTop:"1px solid #f1f5f9",background:"#fcfcfd",flexShrink:0},children:[t.jsx("button",{onClick:()=>N(null),className:"btn btn-outline",children:"Close"}),t.jsxs("button",{onClick:()=>{N(null),a(`/admin/applicants?vacancy_id=${v.id}`)},className:"btn",style:{background:"var(--crimson)",color:"#fff",border:"none"},children:[t.jsx(dr,{size:14})," View Applicants"]}),t.jsxs("button",{onClick:()=>{N(null),a(`/admin/vacancies/edit/${v.id}`)},className:"btn btn-gold",children:[t.jsx(xc,{size:14})," Edit Vacancy"]})]})]})}),t.jsx("style",{jsx:"true",children:`
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

                /* MODAL */
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
                    padding: 32px;
                    border-radius: 24px;
                    width: 100%;
                    max-width: 450px;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }

                .warning-visual {
                    width: 80px;
                    height: 80px;
                    background: #fff1f2;
                    color: var(--crimson);
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    margin: 0 auto 32px;
                }

                .confirm-modal h3 { font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 16px; font-weight: 800; }
                .confirm-modal p { color: var(--text-muted); line-height: 1.6; margin-bottom: 40px; }

                .modal-actions-p { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .btn-secondary-p { padding: 16px; border-radius: 16px; border: 1px solid #e2e8f0; background: #fff; font-weight: 700; cursor: pointer; transition: all 0.2s; }
                .btn-danger-p { padding: 16px; border-radius: 16px; border: none; background: var(--crimson); color: #fff; font-weight: 700; cursor: pointer; transition: all 0.2s; }
                .btn-danger-p:hover { background: var(--crimson-dark); transform: scale(1.02); }

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
            `})]})}const Hb=jt.replace("/api","");function mf({admin:s}){var te;const a=Ot(),{id:n}=Lf(),o=!!n,[l,d]=U.useState(!1),[u,f]=U.useState(o),[h,b]=U.useState([]),[g,j]=U.useState(0),[S,_]=U.useState([]),[w,x]=U.useState(!1),[v,N]=U.useState(!1),[P,T]=U.useState(!1),[C,L]=U.useState({company_id:s.role==="sub_admin"?s.company_id:"",reference_number:"",title:"",designation:"",description:"",requirements:"",location:"",employment_type:"Full-Time",min_experience:"0-1 years",min_relevant_experience:"0-1 years",publish_date:new Date().toISOString().split("T")[0],expire_date:"",is_active:1});U.useEffect(()=>{G()},[n]),U.useEffect(()=>{if(C.designation||C.title||C.company_id){const A=setTimeout(()=>{F()},500);return()=>clearTimeout(A)}},[C.designation,C.title,C.company_id]);const F=async()=>{var A,K;try{N(!0);const k=await Iv({designation:C.designation,title:C.title,company_id:C.company_id});j(((K=(A=k.data)==null?void 0:A.data)==null?void 0:K.count)||0)}catch(k){console.error("Match count error:",k)}finally{N(!1)}},M=async()=>{var A;try{T(!0),x(!0);const K=await Fv({designation:C.designation,title:C.title,company_id:C.company_id});_(((A=K.data)==null?void 0:A.data)||[])}catch{ve.error("Failed to load matching candidates"),x(!1)}finally{T(!1)}},G=async()=>{try{d(!0);const A=await In();if(b(A.data.data||[]),o){const k=(await dh(n)).data.data;k&&L({company_id:k.company_id,reference_number:k.reference_number||"",title:k.title,designation:k.designation,description:k.description||"",requirements:k.requirements||"",location:k.location||"",employment_type:k.employment_type,min_experience:k.min_experience||"0-1 years",min_relevant_experience:k.min_relevant_experience||"0-1 years",publish_date:k.publish_date,expire_date:k.expire_date,is_active:k.is_active})}}catch(A){console.error(A),ve.error("Failed to load dependency data")}finally{d(!1),f(!1)}},H=A=>{const{name:K,value:k}=A.target;L(se=>({...se,[K]:k}))},pe=async A=>{var K,k;if(A.preventDefault(),!C.company_id||!C.title||!C.designation||!C.description||!C.publish_date||!C.expire_date){ve.error("Please fill in all required fields");return}try{d(!0),o?(await Ev({...C,id:n}),ve.success("Vacancy updated successfully")):(await Cv(C),ve.success("Vacancy created successfully")),a("/admin/vacancies")}catch(se){ve.error(((k=(K=se.response)==null?void 0:K.data)==null?void 0:k.message)||"Operation failed")}finally{d(!1)}};return u?t.jsx("div",{className:"loading-spinner",children:t.jsx("div",{className:"spinner"})}):t.jsxs("div",{className:"create-vacancy-page",children:[t.jsxs("div",{className:"vacancies-orchestration-header",children:[t.jsxs("div",{className:"header-content-p",children:[t.jsxs("div",{className:"badge-p",children:[t.jsx("span",{className:"dot pulse"}),o?"REVISION CONSOLE":"POSTING ORCHESTRATOR"]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx("button",{className:"back-btn-minimal",onClick:()=>a("/admin/vacancies"),children:t.jsx(Mr,{})}),t.jsx("h1",{className:"hero-title-p",children:o?"Edit Vacancy":"Create New Vacancy"})]}),t.jsx("p",{className:"hero-subtitle-p",children:"Provide details for the job opening to attract the best talent."})]}),g>0&&t.jsxs("div",{className:"hero-stats-glass animate-bounce-in",onClick:M,children:[t.jsxs("div",{className:"h-stat-item",children:[t.jsx("span",{className:"h-label",children:"AUTO-MATCH"}),t.jsx("span",{className:"h-value",children:g})]}),t.jsx(cs,{className:"h-stat-icon"})]})]}),t.jsxs("form",{onSubmit:pe,className:"premium-form-layout",children:[t.jsxs("div",{className:"form-sections-container",children:[t.jsxs("section",{className:"form-section-card",children:[t.jsxs("div",{className:"section-header",style:{marginBottom:"16px",paddingBottom:"12px"},children:[t.jsx("div",{className:"section-icon",style:{width:"40px",height:"40px",fontSize:"1.2rem"},children:t.jsx(Ht,{})}),t.jsxs("div",{children:[t.jsx("h3",{style:{fontSize:"1.1rem"},children:"Basic Information"}),t.jsx("p",{style:{fontSize:"0.8rem"},children:"Essential details about the job role."})]})]}),t.jsxs("div",{className:"admin-grid-2",children:[t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"company_id",children:["Company ",t.jsx("span",{className:"required",children:"*"})]}),t.jsxs("div",{className:"input-with-preview",style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx("div",{className:"input-wrapper",style:{flex:1},children:t.jsxs("select",{id:"company_id",name:"company_id",value:C.company_id,onChange:H,disabled:s.role==="sub_admin",className:"premium-input",children:[t.jsx("option",{value:"",children:"Select company"}),h.map(A=>t.jsx("option",{value:A.id,children:A.name},A.id))]})}),C.company_id&&t.jsx("div",{className:"company-logo-preview animate-fade-in",style:{width:"50px",height:"50px",borderRadius:"12px",background:"#fff",border:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px",flexShrink:0,boxShadow:"0 4px 12px rgba(0,0,0,0.05)"},children:t.jsx("img",{src:(te=h.find(A=>A.id==C.company_id))!=null&&te.logo?`${Hb}/uploads/logos/${h.find(A=>A.id==C.company_id).logo}`:"/gs-logo.png",alt:"Preview",onError:A=>A.target.src="/gs-logo.png",style:{width:"100%",height:"100%",objectFit:"contain"}})})]})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"reference_number",children:"Reference Number"}),t.jsx("div",{className:"input-wrapper",children:t.jsx("input",{id:"reference_number",type:"text",name:"reference_number",value:C.reference_number,onChange:H,placeholder:"e.g. GS/ENG/2026/001",className:"premium-input"})})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"employment_type",children:"Employment Type"}),t.jsx("div",{className:"input-wrapper",children:t.jsx("select",{id:"employment_type",name:"employment_type",value:C.employment_type,onChange:H,className:"premium-input",children:qv.map(A=>t.jsx("option",{value:A,children:A},A))})})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"min_experience",children:"Min. Overall Experience"}),t.jsx("div",{className:"input-wrapper",children:t.jsx("select",{id:"min_experience",name:"min_experience",value:C.min_experience,onChange:H,className:"premium-input",children:Ac.map(A=>t.jsx("option",{value:A,children:A},A))})})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"min_relevant_experience",children:"Min. Relevant Experience"}),t.jsx("div",{className:"input-wrapper",children:t.jsx("select",{id:"min_relevant_experience",name:"min_relevant_experience",value:C.min_relevant_experience,onChange:H,className:"premium-input",children:Vv.map(A=>t.jsx("option",{value:A,children:A},A))})})]}),t.jsxs("div",{className:"form-group-p full-width",children:[t.jsxs("label",{htmlFor:"title",children:["Job Title ",t.jsx("span",{className:"required",children:"*"})]}),t.jsx("div",{className:"input-wrapper",children:t.jsx("input",{id:"title",type:"text",name:"title",value:C.title,onChange:H,placeholder:"e.g. Senior Software Engineer",className:"premium-input"})})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"designation",children:["Designation ",t.jsx("span",{className:"required",children:"*"})]}),t.jsx("div",{className:"input-wrapper",children:t.jsx("input",{id:"designation",type:"text",name:"designation",value:C.designation,onChange:H,placeholder:"e.g. Engineering",className:"premium-input"})})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"location",children:"Location"}),t.jsxs("div",{className:"input-wrapper",children:[t.jsx(wr,{className:"input-icon"}),t.jsx("input",{id:"location",type:"text",name:"location",value:C.location,onChange:H,placeholder:"e.g. Colombo, Sri Lanka",className:"premium-input with-icon"})]})]})]})]}),t.jsxs("section",{className:"form-section-card",children:[t.jsxs("div",{className:"section-header",style:{marginBottom:"16px",paddingBottom:"12px"},children:[t.jsx("div",{className:"section-icon",style:{width:"40px",height:"40px",fontSize:"1.2rem"},children:t.jsx(or,{})}),t.jsxs("div",{children:[t.jsx("h3",{style:{fontSize:"1.1rem"},children:"Dates & Visibility"}),t.jsx("p",{style:{fontSize:"0.8rem"},children:"Control when the vacancy is visible to applicants."})]})]}),t.jsxs("div",{className:"admin-grid-3",children:[t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"publish_date",children:["Publish Date ",t.jsx("span",{className:"required",children:"*"})]}),t.jsxs("div",{className:"input-wrapper",children:[t.jsx(fn,{className:"input-icon"}),t.jsx("input",{id:"publish_date",type:"date",name:"publish_date",value:C.publish_date,onChange:H,className:"premium-input with-icon"})]})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"expire_date",children:["Expiration Date ",t.jsx("span",{className:"required",children:"*"})]}),t.jsxs("div",{className:"input-wrapper",children:[t.jsx(fn,{className:"input-icon"}),t.jsx("input",{id:"expire_date",type:"date",name:"expire_date",value:C.expire_date,onChange:H,className:"premium-input with-icon"})]})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"is_active",children:"Status"}),t.jsx("div",{className:"input-wrapper",children:t.jsxs("select",{id:"is_active",name:"is_active",value:C.is_active,onChange:A=>L(K=>({...K,is_active:parseInt(A.target.value)})),className:"premium-input",children:[t.jsx("option",{value:1,children:"Active"}),t.jsx("option",{value:0,children:"Inactive"})]})})]})]})]}),t.jsxs("section",{className:"form-section-card",children:[t.jsxs("div",{className:"section-header",style:{marginBottom:"16px",paddingBottom:"12px"},children:[t.jsx("div",{className:"section-icon",style:{width:"40px",height:"40px",fontSize:"1.2rem"},children:t.jsx(vh,{})}),t.jsxs("div",{children:[t.jsx("h3",{style:{fontSize:"1.1rem"},children:"Job Description & Requirements"}),t.jsx("p",{style:{fontSize:"0.8rem"},children:"Provide a detailed overview of the role and what's expected."})]})]}),t.jsxs("div",{className:"form-vertical",children:[t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"description",children:["Job Description ",t.jsx("span",{className:"required",children:"*"})]}),t.jsx("div",{className:"input-wrapper",children:t.jsx("textarea",{id:"description",name:"description",value:C.description,onChange:H,rows:"8",placeholder:"Describe the role, responsibilities, and day-to-day activities...",className:"premium-textarea"})})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"requirements",children:"Requirements & Qualifications"}),t.jsx("div",{className:"input-wrapper",children:t.jsx("textarea",{id:"requirements",name:"requirements",value:C.requirements,onChange:H,rows:"6",placeholder:"List the required skills, experience, and academic qualifications...",className:"premium-textarea"})})]})]})]})]}),t.jsx("div",{className:"form-sidebar-container",children:t.jsxs("div",{className:"sticky-sidebar",children:[t.jsxs("div",{className:"status-preview-card",style:{padding:"20px"},children:[t.jsx("h4",{style:{fontSize:"1rem",marginBottom:"16px"},children:"Post Summary"}),t.jsxs("div",{className:"preview-stat",style:{marginBottom:"10px"},children:[t.jsx("span",{className:"label",children:"Title:"}),t.jsx("span",{className:"value",style:{fontSize:"0.9rem"},children:C.title||"Untitled Role"})]}),t.jsxs("div",{className:"preview-stat",style:{marginBottom:"10px"},children:[t.jsx("span",{className:"label",children:"Ref. No:"}),t.jsx("span",{className:"value",style:{fontSize:"0.9rem"},children:C.reference_number||"N/A"})]}),t.jsxs("div",{className:"preview-stat",style:{marginBottom:"10px"},children:[t.jsx("span",{className:"label",children:"Type:"}),t.jsx("span",{className:"value",style:{fontSize:"0.9rem"},children:C.employment_type})]}),t.jsxs("div",{className:"preview-stat",style:{marginBottom:"10px"},children:[t.jsx("span",{className:"label",children:"Status:"}),t.jsx("span",{className:`status-badge ${C.is_active?"active":"inactive"}`,style:{padding:"4px 10px",fontSize:"0.7rem"},children:C.is_active?"Active":"Draft"})]}),t.jsxs("div",{className:"preview-stat",style:{marginBottom:"16px"},children:[t.jsx("span",{className:"label",children:"Exp:"}),t.jsx("span",{className:"value",style:{fontSize:"0.9rem"},children:C.min_experience})]}),g>0&&t.jsxs("div",{className:"auto-match-alert animate-bounce-in",style:{padding:"12px",marginTop:"16px"},children:[t.jsx("div",{className:"alert-badge",style:{fontSize:"0.65rem",padding:"2px 8px"},children:"🔥 Auto-Match"}),t.jsxs("p",{style:{fontSize:"0.8rem",margin:"8px 0"},children:[t.jsx("strong",{children:g})," candidates already available!"]}),t.jsxs("button",{type:"button",className:"view-matches-btn",onClick:M,style:{padding:"6px 12px",fontSize:"0.75rem"},children:[t.jsx(cs,{})," View Candidates"]})]}),t.jsx("hr",{style:{margin:"20px 0"}}),t.jsxs("div",{className:"form-actions-p",style:{gap:"10px"},children:[t.jsx("button",{type:"submit",className:"btn btn-gold full-width",disabled:l,style:{padding:"12px 20px",fontSize:"0.9rem"},children:l?t.jsx("div",{className:"spinner-small"}):t.jsxs(t.Fragment,{children:[t.jsx(cb,{})," ",o?"Update Vacancy":"Create Vacancy"]})}),t.jsx("button",{type:"button",className:"btn btn-outline full-width",onClick:()=>a("/admin/vacancies"),style:{padding:"12px 20px",fontSize:"0.9rem"},children:"Cancel"})]})]}),t.jsxs("div",{className:"tips-card",style:{padding:"20px"},children:[t.jsxs("div",{className:"tips-header",style:{marginBottom:"12px"},children:[t.jsx(ps,{}),t.jsx("h5",{style:{fontSize:"0.9rem"},children:"Pro-Tips"})]}),t.jsxs("ul",{style:{fontSize:"0.8rem"},children:[t.jsx("li",{style:{marginBottom:"8px"},children:"Use a clear, descriptive job title."}),t.jsx("li",{style:{marginBottom:"8px"},children:"Be specific about the location."}),t.jsx("li",{style:{marginBottom:"8px"},children:"Highlight the most important requirements in the first few lines."}),t.jsx("li",{children:"Ensure the expiration date gives enough time for applications."})]})]})]})})]}),w&&t.jsx("div",{className:"modal-overlay-p",onClick:()=>x(!1),children:t.jsxs("div",{className:"match-modal-p",onClick:A=>A.stopPropagation(),children:[t.jsxs("div",{className:"modal-header-p",children:[t.jsxs("div",{className:"header-info-p",children:[t.jsx(dr,{className:"modal-icon"}),t.jsxs("div",{children:[t.jsx("h2",{children:"Matching Candidates"}),t.jsxs("p",{children:['Showing candidates matching "',C.designation,'" or company requirements.']})]})]}),t.jsx("button",{className:"close-btn-p",onClick:()=>x(!1),children:t.jsx(bt,{})})]}),t.jsx("div",{className:"modal-body-p",children:P?t.jsxs("div",{className:"loading-state",children:[t.jsx("div",{className:"spinner-p"}),t.jsx("p",{children:"Searching talent pool..."})]}):S.length===0?t.jsxs("div",{className:"empty-state",children:[t.jsx(dr,{size:48}),t.jsx("p",{children:"No candidates found matching these criteria."})]}):t.jsx("div",{className:"match-list",children:S.map((A,K)=>t.jsxs("div",{className:"match-item-card",children:[t.jsxs("div",{className:"cand-main-info",children:[t.jsx("div",{className:"cand-avatar",children:t.jsx(cr,{})}),t.jsxs("div",{className:"cand-details-p",children:[t.jsxs("h3",{children:[A.first_name," ",A.last_name]}),t.jsxs("p",{className:"last-applied",children:["Last applied for: ",t.jsx("strong",{children:A.last_applied_vacancy})," (",t.jsx("i",{children:A.last_applied_company}),")"]}),t.jsxs("div",{className:"cand-tags",children:[t.jsxs("span",{className:"tag-p",children:[A.overall_experience," Exp"]}),t.jsx("span",{className:"tag-p",children:A.qualification})]})]})]}),t.jsxs("div",{className:"cand-actions-p",children:[t.jsxs("a",{href:`${jt}/applications.php?action=view_cv&file=${encodeURIComponent(A.cv_path)}`,target:"_blank",rel:"noreferrer",className:"btn btn-gold btn-sm",children:[t.jsx(yr,{})," View CV"]}),t.jsxs("a",{href:`mailto:${A.email}?subject=Exciting Opportunity: ${C.title} at George Steuart`,className:"btn btn-outline btn-sm",children:[t.jsx(lr,{})," Contact"]})]})]},K))})})]})}),t.jsx("style",{jsx:"true",children:`
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
            `})]})}function Li(s){throw new Error('Could not dynamically require "'+s+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var nc={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/var gf;function Vb(){return gf||(gf=1,(function(s,a){(function(n){s.exports=n()})(function(){return(function n(o,l,d){function u(b,g){if(!l[b]){if(!o[b]){var j=typeof Li=="function"&&Li;if(!g&&j)return j(b,!0);if(f)return f(b,!0);var S=new Error("Cannot find module '"+b+"'");throw S.code="MODULE_NOT_FOUND",S}var _=l[b]={exports:{}};o[b][0].call(_.exports,function(w){var x=o[b][1][w];return u(x||w)},_,_.exports,n,o,l,d)}return l[b].exports}for(var f=typeof Li=="function"&&Li,h=0;h<d.length;h++)u(d[h]);return u})({1:[function(n,o,l){var d=n("./utils"),u=n("./support"),f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";l.encode=function(h){for(var b,g,j,S,_,w,x,v=[],N=0,P=h.length,T=P,C=d.getTypeOf(h)!=="string";N<h.length;)T=P-N,j=C?(b=h[N++],g=N<P?h[N++]:0,N<P?h[N++]:0):(b=h.charCodeAt(N++),g=N<P?h.charCodeAt(N++):0,N<P?h.charCodeAt(N++):0),S=b>>2,_=(3&b)<<4|g>>4,w=1<T?(15&g)<<2|j>>6:64,x=2<T?63&j:64,v.push(f.charAt(S)+f.charAt(_)+f.charAt(w)+f.charAt(x));return v.join("")},l.decode=function(h){var b,g,j,S,_,w,x=0,v=0,N="data:";if(h.substr(0,N.length)===N)throw new Error("Invalid base64 input, it looks like a data url.");var P,T=3*(h=h.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(h.charAt(h.length-1)===f.charAt(64)&&T--,h.charAt(h.length-2)===f.charAt(64)&&T--,T%1!=0)throw new Error("Invalid base64 input, bad content length.");for(P=u.uint8array?new Uint8Array(0|T):new Array(0|T);x<h.length;)b=f.indexOf(h.charAt(x++))<<2|(S=f.indexOf(h.charAt(x++)))>>4,g=(15&S)<<4|(_=f.indexOf(h.charAt(x++)))>>2,j=(3&_)<<6|(w=f.indexOf(h.charAt(x++))),P[v++]=b,_!==64&&(P[v++]=g),w!==64&&(P[v++]=j);return P}},{"./support":30,"./utils":32}],2:[function(n,o,l){var d=n("./external"),u=n("./stream/DataWorker"),f=n("./stream/Crc32Probe"),h=n("./stream/DataLengthProbe");function b(g,j,S,_,w){this.compressedSize=g,this.uncompressedSize=j,this.crc32=S,this.compression=_,this.compressedContent=w}b.prototype={getContentWorker:function(){var g=new u(d.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new h("data_length")),j=this;return g.on("end",function(){if(this.streamInfo.data_length!==j.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),g},getCompressedWorker:function(){return new u(d.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},b.createWorkerFrom=function(g,j,S){return g.pipe(new f).pipe(new h("uncompressedSize")).pipe(j.compressWorker(S)).pipe(new h("compressedSize")).withStreamInfo("compression",j)},o.exports=b},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(n,o,l){var d=n("./stream/GenericWorker");l.STORE={magic:"\0\0",compressWorker:function(){return new d("STORE compression")},uncompressWorker:function(){return new d("STORE decompression")}},l.DEFLATE=n("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(n,o,l){var d=n("./utils"),u=(function(){for(var f,h=[],b=0;b<256;b++){f=b;for(var g=0;g<8;g++)f=1&f?3988292384^f>>>1:f>>>1;h[b]=f}return h})();o.exports=function(f,h){return f!==void 0&&f.length?d.getTypeOf(f)!=="string"?(function(b,g,j,S){var _=u,w=S+j;b^=-1;for(var x=S;x<w;x++)b=b>>>8^_[255&(b^g[x])];return-1^b})(0|h,f,f.length,0):(function(b,g,j,S){var _=u,w=S+j;b^=-1;for(var x=S;x<w;x++)b=b>>>8^_[255&(b^g.charCodeAt(x))];return-1^b})(0|h,f,f.length,0):0}},{"./utils":32}],5:[function(n,o,l){l.base64=!1,l.binary=!1,l.dir=!1,l.createFolders=!0,l.date=null,l.compression=null,l.compressionOptions=null,l.comment=null,l.unixPermissions=null,l.dosPermissions=null},{}],6:[function(n,o,l){var d=null;d=typeof Promise<"u"?Promise:n("lie"),o.exports={Promise:d}},{lie:37}],7:[function(n,o,l){var d=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",u=n("pako"),f=n("./utils"),h=n("./stream/GenericWorker"),b=d?"uint8array":"array";function g(j,S){h.call(this,"FlateWorker/"+j),this._pako=null,this._pakoAction=j,this._pakoOptions=S,this.meta={}}l.magic="\b\0",f.inherits(g,h),g.prototype.processChunk=function(j){this.meta=j.meta,this._pako===null&&this._createPako(),this._pako.push(f.transformTo(b,j.data),!1)},g.prototype.flush=function(){h.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},g.prototype.cleanUp=function(){h.prototype.cleanUp.call(this),this._pako=null},g.prototype._createPako=function(){this._pako=new u[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var j=this;this._pako.onData=function(S){j.push({data:S,meta:j.meta})}},l.compressWorker=function(j){return new g("Deflate",j)},l.uncompressWorker=function(){return new g("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(n,o,l){function d(_,w){var x,v="";for(x=0;x<w;x++)v+=String.fromCharCode(255&_),_>>>=8;return v}function u(_,w,x,v,N,P){var T,C,L=_.file,F=_.compression,M=P!==b.utf8encode,G=f.transformTo("string",P(L.name)),H=f.transformTo("string",b.utf8encode(L.name)),pe=L.comment,te=f.transformTo("string",P(pe)),A=f.transformTo("string",b.utf8encode(pe)),K=H.length!==L.name.length,k=A.length!==pe.length,se="",ye="",re="",W=L.dir,X=L.date,ne={crc32:0,compressedSize:0,uncompressedSize:0};w&&!x||(ne.crc32=_.crc32,ne.compressedSize=_.compressedSize,ne.uncompressedSize=_.uncompressedSize);var R=0;w&&(R|=8),M||!K&&!k||(R|=2048);var z=0,J=0;W&&(z|=16),N==="UNIX"?(J=798,z|=(function(oe,_e){var Te=oe;return oe||(Te=_e?16893:33204),(65535&Te)<<16})(L.unixPermissions,W)):(J=20,z|=(function(oe){return 63&(oe||0)})(L.dosPermissions)),T=X.getUTCHours(),T<<=6,T|=X.getUTCMinutes(),T<<=5,T|=X.getUTCSeconds()/2,C=X.getUTCFullYear()-1980,C<<=4,C|=X.getUTCMonth()+1,C<<=5,C|=X.getUTCDate(),K&&(ye=d(1,1)+d(g(G),4)+H,se+="up"+d(ye.length,2)+ye),k&&(re=d(1,1)+d(g(te),4)+A,se+="uc"+d(re.length,2)+re);var ie="";return ie+=`
\0`,ie+=d(R,2),ie+=F.magic,ie+=d(T,2),ie+=d(C,2),ie+=d(ne.crc32,4),ie+=d(ne.compressedSize,4),ie+=d(ne.uncompressedSize,4),ie+=d(G.length,2),ie+=d(se.length,2),{fileRecord:j.LOCAL_FILE_HEADER+ie+G+se,dirRecord:j.CENTRAL_FILE_HEADER+d(J,2)+ie+d(te.length,2)+"\0\0\0\0"+d(z,4)+d(v,4)+G+se+te}}var f=n("../utils"),h=n("../stream/GenericWorker"),b=n("../utf8"),g=n("../crc32"),j=n("../signature");function S(_,w,x,v){h.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=w,this.zipPlatform=x,this.encodeFileName=v,this.streamFiles=_,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}f.inherits(S,h),S.prototype.push=function(_){var w=_.meta.percent||0,x=this.entriesCount,v=this._sources.length;this.accumulate?this.contentBuffer.push(_):(this.bytesWritten+=_.data.length,h.prototype.push.call(this,{data:_.data,meta:{currentFile:this.currentFile,percent:x?(w+100*(x-v-1))/x:100}}))},S.prototype.openedSource=function(_){this.currentSourceOffset=this.bytesWritten,this.currentFile=_.file.name;var w=this.streamFiles&&!_.file.dir;if(w){var x=u(_,w,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:x.fileRecord,meta:{percent:0}})}else this.accumulate=!0},S.prototype.closedSource=function(_){this.accumulate=!1;var w=this.streamFiles&&!_.file.dir,x=u(_,w,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(x.dirRecord),w)this.push({data:(function(v){return j.DATA_DESCRIPTOR+d(v.crc32,4)+d(v.compressedSize,4)+d(v.uncompressedSize,4)})(_),meta:{percent:100}});else for(this.push({data:x.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},S.prototype.flush=function(){for(var _=this.bytesWritten,w=0;w<this.dirRecords.length;w++)this.push({data:this.dirRecords[w],meta:{percent:100}});var x=this.bytesWritten-_,v=(function(N,P,T,C,L){var F=f.transformTo("string",L(C));return j.CENTRAL_DIRECTORY_END+"\0\0\0\0"+d(N,2)+d(N,2)+d(P,4)+d(T,4)+d(F.length,2)+F})(this.dirRecords.length,x,_,this.zipComment,this.encodeFileName);this.push({data:v,meta:{percent:100}})},S.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},S.prototype.registerPrevious=function(_){this._sources.push(_);var w=this;return _.on("data",function(x){w.processChunk(x)}),_.on("end",function(){w.closedSource(w.previous.streamInfo),w._sources.length?w.prepareNextSource():w.end()}),_.on("error",function(x){w.error(x)}),this},S.prototype.resume=function(){return!!h.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},S.prototype.error=function(_){var w=this._sources;if(!h.prototype.error.call(this,_))return!1;for(var x=0;x<w.length;x++)try{w[x].error(_)}catch{}return!0},S.prototype.lock=function(){h.prototype.lock.call(this);for(var _=this._sources,w=0;w<_.length;w++)_[w].lock()},o.exports=S},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(n,o,l){var d=n("../compressions"),u=n("./ZipFileWorker");l.generateWorker=function(f,h,b){var g=new u(h.streamFiles,b,h.platform,h.encodeFileName),j=0;try{f.forEach(function(S,_){j++;var w=(function(P,T){var C=P||T,L=d[C];if(!L)throw new Error(C+" is not a valid compression method !");return L})(_.options.compression,h.compression),x=_.options.compressionOptions||h.compressionOptions||{},v=_.dir,N=_.date;_._compressWorker(w,x).withStreamInfo("file",{name:S,dir:v,date:N,comment:_.comment||"",unixPermissions:_.unixPermissions,dosPermissions:_.dosPermissions}).pipe(g)}),g.entriesCount=j}catch(S){g.error(S)}return g}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(n,o,l){function d(){if(!(this instanceof d))return new d;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var u=new d;for(var f in this)typeof this[f]!="function"&&(u[f]=this[f]);return u}}(d.prototype=n("./object")).loadAsync=n("./load"),d.support=n("./support"),d.defaults=n("./defaults"),d.version="3.10.1",d.loadAsync=function(u,f){return new d().loadAsync(u,f)},d.external=n("./external"),o.exports=d},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(n,o,l){var d=n("./utils"),u=n("./external"),f=n("./utf8"),h=n("./zipEntries"),b=n("./stream/Crc32Probe"),g=n("./nodejsUtils");function j(S){return new u.Promise(function(_,w){var x=S.decompressed.getContentWorker().pipe(new b);x.on("error",function(v){w(v)}).on("end",function(){x.streamInfo.crc32!==S.decompressed.crc32?w(new Error("Corrupted zip : CRC32 mismatch")):_()}).resume()})}o.exports=function(S,_){var w=this;return _=d.extend(_||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:f.utf8decode}),g.isNode&&g.isStream(S)?u.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):d.prepareContent("the loaded zip file",S,!0,_.optimizedBinaryString,_.base64).then(function(x){var v=new h(_);return v.load(x),v}).then(function(x){var v=[u.Promise.resolve(x)],N=x.files;if(_.checkCRC32)for(var P=0;P<N.length;P++)v.push(j(N[P]));return u.Promise.all(v)}).then(function(x){for(var v=x.shift(),N=v.files,P=0;P<N.length;P++){var T=N[P],C=T.fileNameStr,L=d.resolve(T.fileNameStr);w.file(L,T.decompressed,{binary:!0,optimizedBinaryString:!0,date:T.date,dir:T.dir,comment:T.fileCommentStr.length?T.fileCommentStr:null,unixPermissions:T.unixPermissions,dosPermissions:T.dosPermissions,createFolders:_.createFolders}),T.dir||(w.file(L).unsafeOriginalName=C)}return v.zipComment.length&&(w.comment=v.zipComment),w})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(n,o,l){var d=n("../utils"),u=n("../stream/GenericWorker");function f(h,b){u.call(this,"Nodejs stream input adapter for "+h),this._upstreamEnded=!1,this._bindStream(b)}d.inherits(f,u),f.prototype._bindStream=function(h){var b=this;(this._stream=h).pause(),h.on("data",function(g){b.push({data:g,meta:{percent:0}})}).on("error",function(g){b.isPaused?this.generatedError=g:b.error(g)}).on("end",function(){b.isPaused?b._upstreamEnded=!0:b.end()})},f.prototype.pause=function(){return!!u.prototype.pause.call(this)&&(this._stream.pause(),!0)},f.prototype.resume=function(){return!!u.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},o.exports=f},{"../stream/GenericWorker":28,"../utils":32}],13:[function(n,o,l){var d=n("readable-stream").Readable;function u(f,h,b){d.call(this,h),this._helper=f;var g=this;f.on("data",function(j,S){g.push(j)||g._helper.pause(),b&&b(S)}).on("error",function(j){g.emit("error",j)}).on("end",function(){g.push(null)})}n("../utils").inherits(u,d),u.prototype._read=function(){this._helper.resume()},o.exports=u},{"../utils":32,"readable-stream":16}],14:[function(n,o,l){o.exports={isNode:typeof Buffer<"u",newBufferFrom:function(d,u){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(d,u);if(typeof d=="number")throw new Error('The "data" argument must not be a number');return new Buffer(d,u)},allocBuffer:function(d){if(Buffer.alloc)return Buffer.alloc(d);var u=new Buffer(d);return u.fill(0),u},isBuffer:function(d){return Buffer.isBuffer(d)},isStream:function(d){return d&&typeof d.on=="function"&&typeof d.pause=="function"&&typeof d.resume=="function"}}},{}],15:[function(n,o,l){function d(L,F,M){var G,H=f.getTypeOf(F),pe=f.extend(M||{},g);pe.date=pe.date||new Date,pe.compression!==null&&(pe.compression=pe.compression.toUpperCase()),typeof pe.unixPermissions=="string"&&(pe.unixPermissions=parseInt(pe.unixPermissions,8)),pe.unixPermissions&&16384&pe.unixPermissions&&(pe.dir=!0),pe.dosPermissions&&16&pe.dosPermissions&&(pe.dir=!0),pe.dir&&(L=N(L)),pe.createFolders&&(G=v(L))&&P.call(this,G,!0);var te=H==="string"&&pe.binary===!1&&pe.base64===!1;M&&M.binary!==void 0||(pe.binary=!te),(F instanceof j&&F.uncompressedSize===0||pe.dir||!F||F.length===0)&&(pe.base64=!1,pe.binary=!0,F="",pe.compression="STORE",H="string");var A=null;A=F instanceof j||F instanceof h?F:w.isNode&&w.isStream(F)?new x(L,F):f.prepareContent(L,F,pe.binary,pe.optimizedBinaryString,pe.base64);var K=new S(L,A,pe);this.files[L]=K}var u=n("./utf8"),f=n("./utils"),h=n("./stream/GenericWorker"),b=n("./stream/StreamHelper"),g=n("./defaults"),j=n("./compressedObject"),S=n("./zipObject"),_=n("./generate"),w=n("./nodejsUtils"),x=n("./nodejs/NodejsStreamInputAdapter"),v=function(L){L.slice(-1)==="/"&&(L=L.substring(0,L.length-1));var F=L.lastIndexOf("/");return 0<F?L.substring(0,F):""},N=function(L){return L.slice(-1)!=="/"&&(L+="/"),L},P=function(L,F){return F=F!==void 0?F:g.createFolders,L=N(L),this.files[L]||d.call(this,L,null,{dir:!0,createFolders:F}),this.files[L]};function T(L){return Object.prototype.toString.call(L)==="[object RegExp]"}var C={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(L){var F,M,G;for(F in this.files)G=this.files[F],(M=F.slice(this.root.length,F.length))&&F.slice(0,this.root.length)===this.root&&L(M,G)},filter:function(L){var F=[];return this.forEach(function(M,G){L(M,G)&&F.push(G)}),F},file:function(L,F,M){if(arguments.length!==1)return L=this.root+L,d.call(this,L,F,M),this;if(T(L)){var G=L;return this.filter(function(pe,te){return!te.dir&&G.test(pe)})}var H=this.files[this.root+L];return H&&!H.dir?H:null},folder:function(L){if(!L)return this;if(T(L))return this.filter(function(H,pe){return pe.dir&&L.test(H)});var F=this.root+L,M=P.call(this,F),G=this.clone();return G.root=M.name,G},remove:function(L){L=this.root+L;var F=this.files[L];if(F||(L.slice(-1)!=="/"&&(L+="/"),F=this.files[L]),F&&!F.dir)delete this.files[L];else for(var M=this.filter(function(H,pe){return pe.name.slice(0,L.length)===L}),G=0;G<M.length;G++)delete this.files[M[G].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(L){var F,M={};try{if((M=f.extend(L||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:u.utf8encode})).type=M.type.toLowerCase(),M.compression=M.compression.toUpperCase(),M.type==="binarystring"&&(M.type="string"),!M.type)throw new Error("No output type specified.");f.checkSupport(M.type),M.platform!=="darwin"&&M.platform!=="freebsd"&&M.platform!=="linux"&&M.platform!=="sunos"||(M.platform="UNIX"),M.platform==="win32"&&(M.platform="DOS");var G=M.comment||this.comment||"";F=_.generateWorker(this,M,G)}catch(H){(F=new h("error")).error(H)}return new b(F,M.type||"string",M.mimeType)},generateAsync:function(L,F){return this.generateInternalStream(L).accumulate(F)},generateNodeStream:function(L,F){return(L=L||{}).type||(L.type="nodebuffer"),this.generateInternalStream(L).toNodejsStream(F)}};o.exports=C},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(n,o,l){o.exports=n("stream")},{stream:void 0}],17:[function(n,o,l){var d=n("./DataReader");function u(f){d.call(this,f);for(var h=0;h<this.data.length;h++)f[h]=255&f[h]}n("../utils").inherits(u,d),u.prototype.byteAt=function(f){return this.data[this.zero+f]},u.prototype.lastIndexOfSignature=function(f){for(var h=f.charCodeAt(0),b=f.charCodeAt(1),g=f.charCodeAt(2),j=f.charCodeAt(3),S=this.length-4;0<=S;--S)if(this.data[S]===h&&this.data[S+1]===b&&this.data[S+2]===g&&this.data[S+3]===j)return S-this.zero;return-1},u.prototype.readAndCheckSignature=function(f){var h=f.charCodeAt(0),b=f.charCodeAt(1),g=f.charCodeAt(2),j=f.charCodeAt(3),S=this.readData(4);return h===S[0]&&b===S[1]&&g===S[2]&&j===S[3]},u.prototype.readData=function(f){if(this.checkOffset(f),f===0)return[];var h=this.data.slice(this.zero+this.index,this.zero+this.index+f);return this.index+=f,h},o.exports=u},{"../utils":32,"./DataReader":18}],18:[function(n,o,l){var d=n("../utils");function u(f){this.data=f,this.length=f.length,this.index=0,this.zero=0}u.prototype={checkOffset:function(f){this.checkIndex(this.index+f)},checkIndex:function(f){if(this.length<this.zero+f||f<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+f+"). Corrupted zip ?")},setIndex:function(f){this.checkIndex(f),this.index=f},skip:function(f){this.setIndex(this.index+f)},byteAt:function(){},readInt:function(f){var h,b=0;for(this.checkOffset(f),h=this.index+f-1;h>=this.index;h--)b=(b<<8)+this.byteAt(h);return this.index+=f,b},readString:function(f){return d.transformTo("string",this.readData(f))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var f=this.readInt(4);return new Date(Date.UTC(1980+(f>>25&127),(f>>21&15)-1,f>>16&31,f>>11&31,f>>5&63,(31&f)<<1))}},o.exports=u},{"../utils":32}],19:[function(n,o,l){var d=n("./Uint8ArrayReader");function u(f){d.call(this,f)}n("../utils").inherits(u,d),u.prototype.readData=function(f){this.checkOffset(f);var h=this.data.slice(this.zero+this.index,this.zero+this.index+f);return this.index+=f,h},o.exports=u},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(n,o,l){var d=n("./DataReader");function u(f){d.call(this,f)}n("../utils").inherits(u,d),u.prototype.byteAt=function(f){return this.data.charCodeAt(this.zero+f)},u.prototype.lastIndexOfSignature=function(f){return this.data.lastIndexOf(f)-this.zero},u.prototype.readAndCheckSignature=function(f){return f===this.readData(4)},u.prototype.readData=function(f){this.checkOffset(f);var h=this.data.slice(this.zero+this.index,this.zero+this.index+f);return this.index+=f,h},o.exports=u},{"../utils":32,"./DataReader":18}],21:[function(n,o,l){var d=n("./ArrayReader");function u(f){d.call(this,f)}n("../utils").inherits(u,d),u.prototype.readData=function(f){if(this.checkOffset(f),f===0)return new Uint8Array(0);var h=this.data.subarray(this.zero+this.index,this.zero+this.index+f);return this.index+=f,h},o.exports=u},{"../utils":32,"./ArrayReader":17}],22:[function(n,o,l){var d=n("../utils"),u=n("../support"),f=n("./ArrayReader"),h=n("./StringReader"),b=n("./NodeBufferReader"),g=n("./Uint8ArrayReader");o.exports=function(j){var S=d.getTypeOf(j);return d.checkSupport(S),S!=="string"||u.uint8array?S==="nodebuffer"?new b(j):u.uint8array?new g(d.transformTo("uint8array",j)):new f(d.transformTo("array",j)):new h(j)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(n,o,l){l.LOCAL_FILE_HEADER="PK",l.CENTRAL_FILE_HEADER="PK",l.CENTRAL_DIRECTORY_END="PK",l.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",l.ZIP64_CENTRAL_DIRECTORY_END="PK",l.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(n,o,l){var d=n("./GenericWorker"),u=n("../utils");function f(h){d.call(this,"ConvertWorker to "+h),this.destType=h}u.inherits(f,d),f.prototype.processChunk=function(h){this.push({data:u.transformTo(this.destType,h.data),meta:h.meta})},o.exports=f},{"../utils":32,"./GenericWorker":28}],25:[function(n,o,l){var d=n("./GenericWorker"),u=n("../crc32");function f(){d.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}n("../utils").inherits(f,d),f.prototype.processChunk=function(h){this.streamInfo.crc32=u(h.data,this.streamInfo.crc32||0),this.push(h)},o.exports=f},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(n,o,l){var d=n("../utils"),u=n("./GenericWorker");function f(h){u.call(this,"DataLengthProbe for "+h),this.propName=h,this.withStreamInfo(h,0)}d.inherits(f,u),f.prototype.processChunk=function(h){if(h){var b=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=b+h.data.length}u.prototype.processChunk.call(this,h)},o.exports=f},{"../utils":32,"./GenericWorker":28}],27:[function(n,o,l){var d=n("../utils"),u=n("./GenericWorker");function f(h){u.call(this,"DataWorker");var b=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,h.then(function(g){b.dataIsReady=!0,b.data=g,b.max=g&&g.length||0,b.type=d.getTypeOf(g),b.isPaused||b._tickAndRepeat()},function(g){b.error(g)})}d.inherits(f,u),f.prototype.cleanUp=function(){u.prototype.cleanUp.call(this),this.data=null},f.prototype.resume=function(){return!!u.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,d.delay(this._tickAndRepeat,[],this)),!0)},f.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(d.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},f.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var h=null,b=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":h=this.data.substring(this.index,b);break;case"uint8array":h=this.data.subarray(this.index,b);break;case"array":case"nodebuffer":h=this.data.slice(this.index,b)}return this.index=b,this.push({data:h,meta:{percent:this.max?this.index/this.max*100:0}})},o.exports=f},{"../utils":32,"./GenericWorker":28}],28:[function(n,o,l){function d(u){this.name=u||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}d.prototype={push:function(u){this.emit("data",u)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(u){this.emit("error",u)}return!0},error:function(u){return!this.isFinished&&(this.isPaused?this.generatedError=u:(this.isFinished=!0,this.emit("error",u),this.previous&&this.previous.error(u),this.cleanUp()),!0)},on:function(u,f){return this._listeners[u].push(f),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(u,f){if(this._listeners[u])for(var h=0;h<this._listeners[u].length;h++)this._listeners[u][h].call(this,f)},pipe:function(u){return u.registerPrevious(this)},registerPrevious:function(u){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=u.streamInfo,this.mergeStreamInfo(),this.previous=u;var f=this;return u.on("data",function(h){f.processChunk(h)}),u.on("end",function(){f.end()}),u.on("error",function(h){f.error(h)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var u=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),u=!0),this.previous&&this.previous.resume(),!u},flush:function(){},processChunk:function(u){this.push(u)},withStreamInfo:function(u,f){return this.extraStreamInfo[u]=f,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var u in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,u)&&(this.streamInfo[u]=this.extraStreamInfo[u])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var u="Worker "+this.name;return this.previous?this.previous+" -> "+u:u}},o.exports=d},{}],29:[function(n,o,l){var d=n("../utils"),u=n("./ConvertWorker"),f=n("./GenericWorker"),h=n("../base64"),b=n("../support"),g=n("../external"),j=null;if(b.nodestream)try{j=n("../nodejs/NodejsStreamOutputAdapter")}catch{}function S(w,x){return new g.Promise(function(v,N){var P=[],T=w._internalType,C=w._outputType,L=w._mimeType;w.on("data",function(F,M){P.push(F),x&&x(M)}).on("error",function(F){P=[],N(F)}).on("end",function(){try{var F=(function(M,G,H){switch(M){case"blob":return d.newBlob(d.transformTo("arraybuffer",G),H);case"base64":return h.encode(G);default:return d.transformTo(M,G)}})(C,(function(M,G){var H,pe=0,te=null,A=0;for(H=0;H<G.length;H++)A+=G[H].length;switch(M){case"string":return G.join("");case"array":return Array.prototype.concat.apply([],G);case"uint8array":for(te=new Uint8Array(A),H=0;H<G.length;H++)te.set(G[H],pe),pe+=G[H].length;return te;case"nodebuffer":return Buffer.concat(G);default:throw new Error("concat : unsupported type '"+M+"'")}})(T,P),L);v(F)}catch(M){N(M)}P=[]}).resume()})}function _(w,x,v){var N=x;switch(x){case"blob":case"arraybuffer":N="uint8array";break;case"base64":N="string"}try{this._internalType=N,this._outputType=x,this._mimeType=v,d.checkSupport(N),this._worker=w.pipe(new u(N)),w.lock()}catch(P){this._worker=new f("error"),this._worker.error(P)}}_.prototype={accumulate:function(w){return S(this,w)},on:function(w,x){var v=this;return w==="data"?this._worker.on(w,function(N){x.call(v,N.data,N.meta)}):this._worker.on(w,function(){d.delay(x,arguments,v)}),this},resume:function(){return d.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(w){if(d.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new j(this,{objectMode:this._outputType!=="nodebuffer"},w)}},o.exports=_},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(n,o,l){if(l.base64=!0,l.array=!0,l.string=!0,l.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",l.nodebuffer=typeof Buffer<"u",l.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")l.blob=!1;else{var d=new ArrayBuffer(0);try{l.blob=new Blob([d],{type:"application/zip"}).size===0}catch{try{var u=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);u.append(d),l.blob=u.getBlob("application/zip").size===0}catch{l.blob=!1}}}try{l.nodestream=!!n("readable-stream").Readable}catch{l.nodestream=!1}},{"readable-stream":16}],31:[function(n,o,l){for(var d=n("./utils"),u=n("./support"),f=n("./nodejsUtils"),h=n("./stream/GenericWorker"),b=new Array(256),g=0;g<256;g++)b[g]=252<=g?6:248<=g?5:240<=g?4:224<=g?3:192<=g?2:1;b[254]=b[254]=1;function j(){h.call(this,"utf-8 decode"),this.leftOver=null}function S(){h.call(this,"utf-8 encode")}l.utf8encode=function(_){return u.nodebuffer?f.newBufferFrom(_,"utf-8"):(function(w){var x,v,N,P,T,C=w.length,L=0;for(P=0;P<C;P++)(64512&(v=w.charCodeAt(P)))==55296&&P+1<C&&(64512&(N=w.charCodeAt(P+1)))==56320&&(v=65536+(v-55296<<10)+(N-56320),P++),L+=v<128?1:v<2048?2:v<65536?3:4;for(x=u.uint8array?new Uint8Array(L):new Array(L),P=T=0;T<L;P++)(64512&(v=w.charCodeAt(P)))==55296&&P+1<C&&(64512&(N=w.charCodeAt(P+1)))==56320&&(v=65536+(v-55296<<10)+(N-56320),P++),v<128?x[T++]=v:(v<2048?x[T++]=192|v>>>6:(v<65536?x[T++]=224|v>>>12:(x[T++]=240|v>>>18,x[T++]=128|v>>>12&63),x[T++]=128|v>>>6&63),x[T++]=128|63&v);return x})(_)},l.utf8decode=function(_){return u.nodebuffer?d.transformTo("nodebuffer",_).toString("utf-8"):(function(w){var x,v,N,P,T=w.length,C=new Array(2*T);for(x=v=0;x<T;)if((N=w[x++])<128)C[v++]=N;else if(4<(P=b[N]))C[v++]=65533,x+=P-1;else{for(N&=P===2?31:P===3?15:7;1<P&&x<T;)N=N<<6|63&w[x++],P--;1<P?C[v++]=65533:N<65536?C[v++]=N:(N-=65536,C[v++]=55296|N>>10&1023,C[v++]=56320|1023&N)}return C.length!==v&&(C.subarray?C=C.subarray(0,v):C.length=v),d.applyFromCharCode(C)})(_=d.transformTo(u.uint8array?"uint8array":"array",_))},d.inherits(j,h),j.prototype.processChunk=function(_){var w=d.transformTo(u.uint8array?"uint8array":"array",_.data);if(this.leftOver&&this.leftOver.length){if(u.uint8array){var x=w;(w=new Uint8Array(x.length+this.leftOver.length)).set(this.leftOver,0),w.set(x,this.leftOver.length)}else w=this.leftOver.concat(w);this.leftOver=null}var v=(function(P,T){var C;for((T=T||P.length)>P.length&&(T=P.length),C=T-1;0<=C&&(192&P[C])==128;)C--;return C<0||C===0?T:C+b[P[C]]>T?C:T})(w),N=w;v!==w.length&&(u.uint8array?(N=w.subarray(0,v),this.leftOver=w.subarray(v,w.length)):(N=w.slice(0,v),this.leftOver=w.slice(v,w.length))),this.push({data:l.utf8decode(N),meta:_.meta})},j.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:l.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},l.Utf8DecodeWorker=j,d.inherits(S,h),S.prototype.processChunk=function(_){this.push({data:l.utf8encode(_.data),meta:_.meta})},l.Utf8EncodeWorker=S},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(n,o,l){var d=n("./support"),u=n("./base64"),f=n("./nodejsUtils"),h=n("./external");function b(x){return x}function g(x,v){for(var N=0;N<x.length;++N)v[N]=255&x.charCodeAt(N);return v}n("setimmediate"),l.newBlob=function(x,v){l.checkSupport("blob");try{return new Blob([x],{type:v})}catch{try{var N=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return N.append(x),N.getBlob(v)}catch{throw new Error("Bug : can't construct the Blob.")}}};var j={stringifyByChunk:function(x,v,N){var P=[],T=0,C=x.length;if(C<=N)return String.fromCharCode.apply(null,x);for(;T<C;)v==="array"||v==="nodebuffer"?P.push(String.fromCharCode.apply(null,x.slice(T,Math.min(T+N,C)))):P.push(String.fromCharCode.apply(null,x.subarray(T,Math.min(T+N,C)))),T+=N;return P.join("")},stringifyByChar:function(x){for(var v="",N=0;N<x.length;N++)v+=String.fromCharCode(x[N]);return v},applyCanBeUsed:{uint8array:(function(){try{return d.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}})(),nodebuffer:(function(){try{return d.nodebuffer&&String.fromCharCode.apply(null,f.allocBuffer(1)).length===1}catch{return!1}})()}};function S(x){var v=65536,N=l.getTypeOf(x),P=!0;if(N==="uint8array"?P=j.applyCanBeUsed.uint8array:N==="nodebuffer"&&(P=j.applyCanBeUsed.nodebuffer),P)for(;1<v;)try{return j.stringifyByChunk(x,N,v)}catch{v=Math.floor(v/2)}return j.stringifyByChar(x)}function _(x,v){for(var N=0;N<x.length;N++)v[N]=x[N];return v}l.applyFromCharCode=S;var w={};w.string={string:b,array:function(x){return g(x,new Array(x.length))},arraybuffer:function(x){return w.string.uint8array(x).buffer},uint8array:function(x){return g(x,new Uint8Array(x.length))},nodebuffer:function(x){return g(x,f.allocBuffer(x.length))}},w.array={string:S,array:b,arraybuffer:function(x){return new Uint8Array(x).buffer},uint8array:function(x){return new Uint8Array(x)},nodebuffer:function(x){return f.newBufferFrom(x)}},w.arraybuffer={string:function(x){return S(new Uint8Array(x))},array:function(x){return _(new Uint8Array(x),new Array(x.byteLength))},arraybuffer:b,uint8array:function(x){return new Uint8Array(x)},nodebuffer:function(x){return f.newBufferFrom(new Uint8Array(x))}},w.uint8array={string:S,array:function(x){return _(x,new Array(x.length))},arraybuffer:function(x){return x.buffer},uint8array:b,nodebuffer:function(x){return f.newBufferFrom(x)}},w.nodebuffer={string:S,array:function(x){return _(x,new Array(x.length))},arraybuffer:function(x){return w.nodebuffer.uint8array(x).buffer},uint8array:function(x){return _(x,new Uint8Array(x.length))},nodebuffer:b},l.transformTo=function(x,v){if(v=v||"",!x)return v;l.checkSupport(x);var N=l.getTypeOf(v);return w[N][x](v)},l.resolve=function(x){for(var v=x.split("/"),N=[],P=0;P<v.length;P++){var T=v[P];T==="."||T===""&&P!==0&&P!==v.length-1||(T===".."?N.pop():N.push(T))}return N.join("/")},l.getTypeOf=function(x){return typeof x=="string"?"string":Object.prototype.toString.call(x)==="[object Array]"?"array":d.nodebuffer&&f.isBuffer(x)?"nodebuffer":d.uint8array&&x instanceof Uint8Array?"uint8array":d.arraybuffer&&x instanceof ArrayBuffer?"arraybuffer":void 0},l.checkSupport=function(x){if(!d[x.toLowerCase()])throw new Error(x+" is not supported by this platform")},l.MAX_VALUE_16BITS=65535,l.MAX_VALUE_32BITS=-1,l.pretty=function(x){var v,N,P="";for(N=0;N<(x||"").length;N++)P+="\\x"+((v=x.charCodeAt(N))<16?"0":"")+v.toString(16).toUpperCase();return P},l.delay=function(x,v,N){setImmediate(function(){x.apply(N||null,v||[])})},l.inherits=function(x,v){function N(){}N.prototype=v.prototype,x.prototype=new N},l.extend=function(){var x,v,N={};for(x=0;x<arguments.length;x++)for(v in arguments[x])Object.prototype.hasOwnProperty.call(arguments[x],v)&&N[v]===void 0&&(N[v]=arguments[x][v]);return N},l.prepareContent=function(x,v,N,P,T){return h.Promise.resolve(v).then(function(C){return d.blob&&(C instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(C))!==-1)&&typeof FileReader<"u"?new h.Promise(function(L,F){var M=new FileReader;M.onload=function(G){L(G.target.result)},M.onerror=function(G){F(G.target.error)},M.readAsArrayBuffer(C)}):C}).then(function(C){var L=l.getTypeOf(C);return L?(L==="arraybuffer"?C=l.transformTo("uint8array",C):L==="string"&&(T?C=u.decode(C):N&&P!==!0&&(C=(function(F){return g(F,d.uint8array?new Uint8Array(F.length):new Array(F.length))})(C))),C):h.Promise.reject(new Error("Can't read the data of '"+x+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(n,o,l){var d=n("./reader/readerFor"),u=n("./utils"),f=n("./signature"),h=n("./zipEntry"),b=n("./support");function g(j){this.files=[],this.loadOptions=j}g.prototype={checkSignature:function(j){if(!this.reader.readAndCheckSignature(j)){this.reader.index-=4;var S=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+u.pretty(S)+", expected "+u.pretty(j)+")")}},isSignature:function(j,S){var _=this.reader.index;this.reader.setIndex(j);var w=this.reader.readString(4)===S;return this.reader.setIndex(_),w},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var j=this.reader.readData(this.zipCommentLength),S=b.uint8array?"uint8array":"array",_=u.transformTo(S,j);this.zipComment=this.loadOptions.decodeFileName(_)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var j,S,_,w=this.zip64EndOfCentralSize-44;0<w;)j=this.reader.readInt(2),S=this.reader.readInt(4),_=this.reader.readData(S),this.zip64ExtensibleData[j]={id:j,length:S,value:_}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var j,S;for(j=0;j<this.files.length;j++)S=this.files[j],this.reader.setIndex(S.localHeaderOffset),this.checkSignature(f.LOCAL_FILE_HEADER),S.readLocalPart(this.reader),S.handleUTF8(),S.processAttributes()},readCentralDir:function(){var j;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(f.CENTRAL_FILE_HEADER);)(j=new h({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(j);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var j=this.reader.lastIndexOfSignature(f.CENTRAL_DIRECTORY_END);if(j<0)throw this.isSignature(0,f.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(j);var S=j;if(this.checkSignature(f.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===u.MAX_VALUE_16BITS||this.diskWithCentralDirStart===u.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===u.MAX_VALUE_16BITS||this.centralDirRecords===u.MAX_VALUE_16BITS||this.centralDirSize===u.MAX_VALUE_32BITS||this.centralDirOffset===u.MAX_VALUE_32BITS){if(this.zip64=!0,(j=this.reader.lastIndexOfSignature(f.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(j),this.checkSignature(f.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,f.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(f.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(f.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var _=this.centralDirOffset+this.centralDirSize;this.zip64&&(_+=20,_+=12+this.zip64EndOfCentralSize);var w=S-_;if(0<w)this.isSignature(S,f.CENTRAL_FILE_HEADER)||(this.reader.zero=w);else if(w<0)throw new Error("Corrupted zip: missing "+Math.abs(w)+" bytes.")},prepareReader:function(j){this.reader=d(j)},load:function(j){this.prepareReader(j),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},o.exports=g},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(n,o,l){var d=n("./reader/readerFor"),u=n("./utils"),f=n("./compressedObject"),h=n("./crc32"),b=n("./utf8"),g=n("./compressions"),j=n("./support");function S(_,w){this.options=_,this.loadOptions=w}S.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(_){var w,x;if(_.skip(22),this.fileNameLength=_.readInt(2),x=_.readInt(2),this.fileName=_.readData(this.fileNameLength),_.skip(x),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((w=(function(v){for(var N in g)if(Object.prototype.hasOwnProperty.call(g,N)&&g[N].magic===v)return g[N];return null})(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+u.pretty(this.compressionMethod)+" unknown (inner file : "+u.transformTo("string",this.fileName)+")");this.decompressed=new f(this.compressedSize,this.uncompressedSize,this.crc32,w,_.readData(this.compressedSize))},readCentralPart:function(_){this.versionMadeBy=_.readInt(2),_.skip(2),this.bitFlag=_.readInt(2),this.compressionMethod=_.readString(2),this.date=_.readDate(),this.crc32=_.readInt(4),this.compressedSize=_.readInt(4),this.uncompressedSize=_.readInt(4);var w=_.readInt(2);if(this.extraFieldsLength=_.readInt(2),this.fileCommentLength=_.readInt(2),this.diskNumberStart=_.readInt(2),this.internalFileAttributes=_.readInt(2),this.externalFileAttributes=_.readInt(4),this.localHeaderOffset=_.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");_.skip(w),this.readExtraFields(_),this.parseZIP64ExtraField(_),this.fileComment=_.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var _=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),_==0&&(this.dosPermissions=63&this.externalFileAttributes),_==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var _=d(this.extraFields[1].value);this.uncompressedSize===u.MAX_VALUE_32BITS&&(this.uncompressedSize=_.readInt(8)),this.compressedSize===u.MAX_VALUE_32BITS&&(this.compressedSize=_.readInt(8)),this.localHeaderOffset===u.MAX_VALUE_32BITS&&(this.localHeaderOffset=_.readInt(8)),this.diskNumberStart===u.MAX_VALUE_32BITS&&(this.diskNumberStart=_.readInt(4))}},readExtraFields:function(_){var w,x,v,N=_.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});_.index+4<N;)w=_.readInt(2),x=_.readInt(2),v=_.readData(x),this.extraFields[w]={id:w,length:x,value:v};_.setIndex(N)},handleUTF8:function(){var _=j.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=b.utf8decode(this.fileName),this.fileCommentStr=b.utf8decode(this.fileComment);else{var w=this.findExtraFieldUnicodePath();if(w!==null)this.fileNameStr=w;else{var x=u.transformTo(_,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(x)}var v=this.findExtraFieldUnicodeComment();if(v!==null)this.fileCommentStr=v;else{var N=u.transformTo(_,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(N)}}},findExtraFieldUnicodePath:function(){var _=this.extraFields[28789];if(_){var w=d(_.value);return w.readInt(1)!==1||h(this.fileName)!==w.readInt(4)?null:b.utf8decode(w.readData(_.length-5))}return null},findExtraFieldUnicodeComment:function(){var _=this.extraFields[25461];if(_){var w=d(_.value);return w.readInt(1)!==1||h(this.fileComment)!==w.readInt(4)?null:b.utf8decode(w.readData(_.length-5))}return null}},o.exports=S},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(n,o,l){function d(w,x,v){this.name=w,this.dir=v.dir,this.date=v.date,this.comment=v.comment,this.unixPermissions=v.unixPermissions,this.dosPermissions=v.dosPermissions,this._data=x,this._dataBinary=v.binary,this.options={compression:v.compression,compressionOptions:v.compressionOptions}}var u=n("./stream/StreamHelper"),f=n("./stream/DataWorker"),h=n("./utf8"),b=n("./compressedObject"),g=n("./stream/GenericWorker");d.prototype={internalStream:function(w){var x=null,v="string";try{if(!w)throw new Error("No output type specified.");var N=(v=w.toLowerCase())==="string"||v==="text";v!=="binarystring"&&v!=="text"||(v="string"),x=this._decompressWorker();var P=!this._dataBinary;P&&!N&&(x=x.pipe(new h.Utf8EncodeWorker)),!P&&N&&(x=x.pipe(new h.Utf8DecodeWorker))}catch(T){(x=new g("error")).error(T)}return new u(x,v,"")},async:function(w,x){return this.internalStream(w).accumulate(x)},nodeStream:function(w,x){return this.internalStream(w||"nodebuffer").toNodejsStream(x)},_compressWorker:function(w,x){if(this._data instanceof b&&this._data.compression.magic===w.magic)return this._data.getCompressedWorker();var v=this._decompressWorker();return this._dataBinary||(v=v.pipe(new h.Utf8EncodeWorker)),b.createWorkerFrom(v,w,x)},_decompressWorker:function(){return this._data instanceof b?this._data.getContentWorker():this._data instanceof g?this._data:new f(this._data)}};for(var j=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],S=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},_=0;_<j.length;_++)d.prototype[j[_]]=S;o.exports=d},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(n,o,l){(function(d){var u,f,h=d.MutationObserver||d.WebKitMutationObserver;if(h){var b=0,g=new h(w),j=d.document.createTextNode("");g.observe(j,{characterData:!0}),u=function(){j.data=b=++b%2}}else if(d.setImmediate||d.MessageChannel===void 0)u="document"in d&&"onreadystatechange"in d.document.createElement("script")?function(){var x=d.document.createElement("script");x.onreadystatechange=function(){w(),x.onreadystatechange=null,x.parentNode.removeChild(x),x=null},d.document.documentElement.appendChild(x)}:function(){setTimeout(w,0)};else{var S=new d.MessageChannel;S.port1.onmessage=w,u=function(){S.port2.postMessage(0)}}var _=[];function w(){var x,v;f=!0;for(var N=_.length;N;){for(v=_,_=[],x=-1;++x<N;)v[x]();N=_.length}f=!1}o.exports=function(x){_.push(x)!==1||f||u()}}).call(this,typeof Ei<"u"?Ei:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(n,o,l){var d=n("immediate");function u(){}var f={},h=["REJECTED"],b=["FULFILLED"],g=["PENDING"];function j(N){if(typeof N!="function")throw new TypeError("resolver must be a function");this.state=g,this.queue=[],this.outcome=void 0,N!==u&&x(this,N)}function S(N,P,T){this.promise=N,typeof P=="function"&&(this.onFulfilled=P,this.callFulfilled=this.otherCallFulfilled),typeof T=="function"&&(this.onRejected=T,this.callRejected=this.otherCallRejected)}function _(N,P,T){d(function(){var C;try{C=P(T)}catch(L){return f.reject(N,L)}C===N?f.reject(N,new TypeError("Cannot resolve promise with itself")):f.resolve(N,C)})}function w(N){var P=N&&N.then;if(N&&(typeof N=="object"||typeof N=="function")&&typeof P=="function")return function(){P.apply(N,arguments)}}function x(N,P){var T=!1;function C(M){T||(T=!0,f.reject(N,M))}function L(M){T||(T=!0,f.resolve(N,M))}var F=v(function(){P(L,C)});F.status==="error"&&C(F.value)}function v(N,P){var T={};try{T.value=N(P),T.status="success"}catch(C){T.status="error",T.value=C}return T}(o.exports=j).prototype.finally=function(N){if(typeof N!="function")return this;var P=this.constructor;return this.then(function(T){return P.resolve(N()).then(function(){return T})},function(T){return P.resolve(N()).then(function(){throw T})})},j.prototype.catch=function(N){return this.then(null,N)},j.prototype.then=function(N,P){if(typeof N!="function"&&this.state===b||typeof P!="function"&&this.state===h)return this;var T=new this.constructor(u);return this.state!==g?_(T,this.state===b?N:P,this.outcome):this.queue.push(new S(T,N,P)),T},S.prototype.callFulfilled=function(N){f.resolve(this.promise,N)},S.prototype.otherCallFulfilled=function(N){_(this.promise,this.onFulfilled,N)},S.prototype.callRejected=function(N){f.reject(this.promise,N)},S.prototype.otherCallRejected=function(N){_(this.promise,this.onRejected,N)},f.resolve=function(N,P){var T=v(w,P);if(T.status==="error")return f.reject(N,T.value);var C=T.value;if(C)x(N,C);else{N.state=b,N.outcome=P;for(var L=-1,F=N.queue.length;++L<F;)N.queue[L].callFulfilled(P)}return N},f.reject=function(N,P){N.state=h,N.outcome=P;for(var T=-1,C=N.queue.length;++T<C;)N.queue[T].callRejected(P);return N},j.resolve=function(N){return N instanceof this?N:f.resolve(new this(u),N)},j.reject=function(N){var P=new this(u);return f.reject(P,N)},j.all=function(N){var P=this;if(Object.prototype.toString.call(N)!=="[object Array]")return this.reject(new TypeError("must be an array"));var T=N.length,C=!1;if(!T)return this.resolve([]);for(var L=new Array(T),F=0,M=-1,G=new this(u);++M<T;)H(N[M],M);return G;function H(pe,te){P.resolve(pe).then(function(A){L[te]=A,++F!==T||C||(C=!0,f.resolve(G,L))},function(A){C||(C=!0,f.reject(G,A))})}},j.race=function(N){var P=this;if(Object.prototype.toString.call(N)!=="[object Array]")return this.reject(new TypeError("must be an array"));var T=N.length,C=!1;if(!T)return this.resolve([]);for(var L=-1,F=new this(u);++L<T;)M=N[L],P.resolve(M).then(function(G){C||(C=!0,f.resolve(F,G))},function(G){C||(C=!0,f.reject(F,G))});var M;return F}},{immediate:36}],38:[function(n,o,l){var d={};(0,n("./lib/utils/common").assign)(d,n("./lib/deflate"),n("./lib/inflate"),n("./lib/zlib/constants")),o.exports=d},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(n,o,l){var d=n("./zlib/deflate"),u=n("./utils/common"),f=n("./utils/strings"),h=n("./zlib/messages"),b=n("./zlib/zstream"),g=Object.prototype.toString,j=0,S=-1,_=0,w=8;function x(N){if(!(this instanceof x))return new x(N);this.options=u.assign({level:S,method:w,chunkSize:16384,windowBits:15,memLevel:8,strategy:_,to:""},N||{});var P=this.options;P.raw&&0<P.windowBits?P.windowBits=-P.windowBits:P.gzip&&0<P.windowBits&&P.windowBits<16&&(P.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new b,this.strm.avail_out=0;var T=d.deflateInit2(this.strm,P.level,P.method,P.windowBits,P.memLevel,P.strategy);if(T!==j)throw new Error(h[T]);if(P.header&&d.deflateSetHeader(this.strm,P.header),P.dictionary){var C;if(C=typeof P.dictionary=="string"?f.string2buf(P.dictionary):g.call(P.dictionary)==="[object ArrayBuffer]"?new Uint8Array(P.dictionary):P.dictionary,(T=d.deflateSetDictionary(this.strm,C))!==j)throw new Error(h[T]);this._dict_set=!0}}function v(N,P){var T=new x(P);if(T.push(N,!0),T.err)throw T.msg||h[T.err];return T.result}x.prototype.push=function(N,P){var T,C,L=this.strm,F=this.options.chunkSize;if(this.ended)return!1;C=P===~~P?P:P===!0?4:0,typeof N=="string"?L.input=f.string2buf(N):g.call(N)==="[object ArrayBuffer]"?L.input=new Uint8Array(N):L.input=N,L.next_in=0,L.avail_in=L.input.length;do{if(L.avail_out===0&&(L.output=new u.Buf8(F),L.next_out=0,L.avail_out=F),(T=d.deflate(L,C))!==1&&T!==j)return this.onEnd(T),!(this.ended=!0);L.avail_out!==0&&(L.avail_in!==0||C!==4&&C!==2)||(this.options.to==="string"?this.onData(f.buf2binstring(u.shrinkBuf(L.output,L.next_out))):this.onData(u.shrinkBuf(L.output,L.next_out)))}while((0<L.avail_in||L.avail_out===0)&&T!==1);return C===4?(T=d.deflateEnd(this.strm),this.onEnd(T),this.ended=!0,T===j):C!==2||(this.onEnd(j),!(L.avail_out=0))},x.prototype.onData=function(N){this.chunks.push(N)},x.prototype.onEnd=function(N){N===j&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=u.flattenChunks(this.chunks)),this.chunks=[],this.err=N,this.msg=this.strm.msg},l.Deflate=x,l.deflate=v,l.deflateRaw=function(N,P){return(P=P||{}).raw=!0,v(N,P)},l.gzip=function(N,P){return(P=P||{}).gzip=!0,v(N,P)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(n,o,l){var d=n("./zlib/inflate"),u=n("./utils/common"),f=n("./utils/strings"),h=n("./zlib/constants"),b=n("./zlib/messages"),g=n("./zlib/zstream"),j=n("./zlib/gzheader"),S=Object.prototype.toString;function _(x){if(!(this instanceof _))return new _(x);this.options=u.assign({chunkSize:16384,windowBits:0,to:""},x||{});var v=this.options;v.raw&&0<=v.windowBits&&v.windowBits<16&&(v.windowBits=-v.windowBits,v.windowBits===0&&(v.windowBits=-15)),!(0<=v.windowBits&&v.windowBits<16)||x&&x.windowBits||(v.windowBits+=32),15<v.windowBits&&v.windowBits<48&&(15&v.windowBits)==0&&(v.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new g,this.strm.avail_out=0;var N=d.inflateInit2(this.strm,v.windowBits);if(N!==h.Z_OK)throw new Error(b[N]);this.header=new j,d.inflateGetHeader(this.strm,this.header)}function w(x,v){var N=new _(v);if(N.push(x,!0),N.err)throw N.msg||b[N.err];return N.result}_.prototype.push=function(x,v){var N,P,T,C,L,F,M=this.strm,G=this.options.chunkSize,H=this.options.dictionary,pe=!1;if(this.ended)return!1;P=v===~~v?v:v===!0?h.Z_FINISH:h.Z_NO_FLUSH,typeof x=="string"?M.input=f.binstring2buf(x):S.call(x)==="[object ArrayBuffer]"?M.input=new Uint8Array(x):M.input=x,M.next_in=0,M.avail_in=M.input.length;do{if(M.avail_out===0&&(M.output=new u.Buf8(G),M.next_out=0,M.avail_out=G),(N=d.inflate(M,h.Z_NO_FLUSH))===h.Z_NEED_DICT&&H&&(F=typeof H=="string"?f.string2buf(H):S.call(H)==="[object ArrayBuffer]"?new Uint8Array(H):H,N=d.inflateSetDictionary(this.strm,F)),N===h.Z_BUF_ERROR&&pe===!0&&(N=h.Z_OK,pe=!1),N!==h.Z_STREAM_END&&N!==h.Z_OK)return this.onEnd(N),!(this.ended=!0);M.next_out&&(M.avail_out!==0&&N!==h.Z_STREAM_END&&(M.avail_in!==0||P!==h.Z_FINISH&&P!==h.Z_SYNC_FLUSH)||(this.options.to==="string"?(T=f.utf8border(M.output,M.next_out),C=M.next_out-T,L=f.buf2string(M.output,T),M.next_out=C,M.avail_out=G-C,C&&u.arraySet(M.output,M.output,T,C,0),this.onData(L)):this.onData(u.shrinkBuf(M.output,M.next_out)))),M.avail_in===0&&M.avail_out===0&&(pe=!0)}while((0<M.avail_in||M.avail_out===0)&&N!==h.Z_STREAM_END);return N===h.Z_STREAM_END&&(P=h.Z_FINISH),P===h.Z_FINISH?(N=d.inflateEnd(this.strm),this.onEnd(N),this.ended=!0,N===h.Z_OK):P!==h.Z_SYNC_FLUSH||(this.onEnd(h.Z_OK),!(M.avail_out=0))},_.prototype.onData=function(x){this.chunks.push(x)},_.prototype.onEnd=function(x){x===h.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=u.flattenChunks(this.chunks)),this.chunks=[],this.err=x,this.msg=this.strm.msg},l.Inflate=_,l.inflate=w,l.inflateRaw=function(x,v){return(v=v||{}).raw=!0,w(x,v)},l.ungzip=w},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(n,o,l){var d=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";l.assign=function(h){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var g=b.shift();if(g){if(typeof g!="object")throw new TypeError(g+"must be non-object");for(var j in g)g.hasOwnProperty(j)&&(h[j]=g[j])}}return h},l.shrinkBuf=function(h,b){return h.length===b?h:h.subarray?h.subarray(0,b):(h.length=b,h)};var u={arraySet:function(h,b,g,j,S){if(b.subarray&&h.subarray)h.set(b.subarray(g,g+j),S);else for(var _=0;_<j;_++)h[S+_]=b[g+_]},flattenChunks:function(h){var b,g,j,S,_,w;for(b=j=0,g=h.length;b<g;b++)j+=h[b].length;for(w=new Uint8Array(j),b=S=0,g=h.length;b<g;b++)_=h[b],w.set(_,S),S+=_.length;return w}},f={arraySet:function(h,b,g,j,S){for(var _=0;_<j;_++)h[S+_]=b[g+_]},flattenChunks:function(h){return[].concat.apply([],h)}};l.setTyped=function(h){h?(l.Buf8=Uint8Array,l.Buf16=Uint16Array,l.Buf32=Int32Array,l.assign(l,u)):(l.Buf8=Array,l.Buf16=Array,l.Buf32=Array,l.assign(l,f))},l.setTyped(d)},{}],42:[function(n,o,l){var d=n("./common"),u=!0,f=!0;try{String.fromCharCode.apply(null,[0])}catch{u=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{f=!1}for(var h=new d.Buf8(256),b=0;b<256;b++)h[b]=252<=b?6:248<=b?5:240<=b?4:224<=b?3:192<=b?2:1;function g(j,S){if(S<65537&&(j.subarray&&f||!j.subarray&&u))return String.fromCharCode.apply(null,d.shrinkBuf(j,S));for(var _="",w=0;w<S;w++)_+=String.fromCharCode(j[w]);return _}h[254]=h[254]=1,l.string2buf=function(j){var S,_,w,x,v,N=j.length,P=0;for(x=0;x<N;x++)(64512&(_=j.charCodeAt(x)))==55296&&x+1<N&&(64512&(w=j.charCodeAt(x+1)))==56320&&(_=65536+(_-55296<<10)+(w-56320),x++),P+=_<128?1:_<2048?2:_<65536?3:4;for(S=new d.Buf8(P),x=v=0;v<P;x++)(64512&(_=j.charCodeAt(x)))==55296&&x+1<N&&(64512&(w=j.charCodeAt(x+1)))==56320&&(_=65536+(_-55296<<10)+(w-56320),x++),_<128?S[v++]=_:(_<2048?S[v++]=192|_>>>6:(_<65536?S[v++]=224|_>>>12:(S[v++]=240|_>>>18,S[v++]=128|_>>>12&63),S[v++]=128|_>>>6&63),S[v++]=128|63&_);return S},l.buf2binstring=function(j){return g(j,j.length)},l.binstring2buf=function(j){for(var S=new d.Buf8(j.length),_=0,w=S.length;_<w;_++)S[_]=j.charCodeAt(_);return S},l.buf2string=function(j,S){var _,w,x,v,N=S||j.length,P=new Array(2*N);for(_=w=0;_<N;)if((x=j[_++])<128)P[w++]=x;else if(4<(v=h[x]))P[w++]=65533,_+=v-1;else{for(x&=v===2?31:v===3?15:7;1<v&&_<N;)x=x<<6|63&j[_++],v--;1<v?P[w++]=65533:x<65536?P[w++]=x:(x-=65536,P[w++]=55296|x>>10&1023,P[w++]=56320|1023&x)}return g(P,w)},l.utf8border=function(j,S){var _;for((S=S||j.length)>j.length&&(S=j.length),_=S-1;0<=_&&(192&j[_])==128;)_--;return _<0||_===0?S:_+h[j[_]]>S?_:S}},{"./common":41}],43:[function(n,o,l){o.exports=function(d,u,f,h){for(var b=65535&d|0,g=d>>>16&65535|0,j=0;f!==0;){for(f-=j=2e3<f?2e3:f;g=g+(b=b+u[h++]|0)|0,--j;);b%=65521,g%=65521}return b|g<<16|0}},{}],44:[function(n,o,l){o.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(n,o,l){var d=(function(){for(var u,f=[],h=0;h<256;h++){u=h;for(var b=0;b<8;b++)u=1&u?3988292384^u>>>1:u>>>1;f[h]=u}return f})();o.exports=function(u,f,h,b){var g=d,j=b+h;u^=-1;for(var S=b;S<j;S++)u=u>>>8^g[255&(u^f[S])];return-1^u}},{}],46:[function(n,o,l){var d,u=n("../utils/common"),f=n("./trees"),h=n("./adler32"),b=n("./crc32"),g=n("./messages"),j=0,S=4,_=0,w=-2,x=-1,v=4,N=2,P=8,T=9,C=286,L=30,F=19,M=2*C+1,G=15,H=3,pe=258,te=pe+H+1,A=42,K=113,k=1,se=2,ye=3,re=4;function W(y,fe){return y.msg=g[fe],fe}function X(y){return(y<<1)-(4<y?9:0)}function ne(y){for(var fe=y.length;0<=--fe;)y[fe]=0}function R(y){var fe=y.state,ce=fe.pending;ce>y.avail_out&&(ce=y.avail_out),ce!==0&&(u.arraySet(y.output,fe.pending_buf,fe.pending_out,ce,y.next_out),y.next_out+=ce,fe.pending_out+=ce,y.total_out+=ce,y.avail_out-=ce,fe.pending-=ce,fe.pending===0&&(fe.pending_out=0))}function z(y,fe){f._tr_flush_block(y,0<=y.block_start?y.block_start:-1,y.strstart-y.block_start,fe),y.block_start=y.strstart,R(y.strm)}function J(y,fe){y.pending_buf[y.pending++]=fe}function ie(y,fe){y.pending_buf[y.pending++]=fe>>>8&255,y.pending_buf[y.pending++]=255&fe}function oe(y,fe){var ce,I,O=y.max_chain_length,Y=y.strstart,D=y.prev_length,ue=y.nice_match,Z=y.strstart>y.w_size-te?y.strstart-(y.w_size-te):0,he=y.window,je=y.w_mask,be=y.prev,Pe=y.strstart+pe,Ge=he[Y+D-1],Be=he[Y+D];y.prev_length>=y.good_match&&(O>>=2),ue>y.lookahead&&(ue=y.lookahead);do if(he[(ce=fe)+D]===Be&&he[ce+D-1]===Ge&&he[ce]===he[Y]&&he[++ce]===he[Y+1]){Y+=2,ce++;do;while(he[++Y]===he[++ce]&&he[++Y]===he[++ce]&&he[++Y]===he[++ce]&&he[++Y]===he[++ce]&&he[++Y]===he[++ce]&&he[++Y]===he[++ce]&&he[++Y]===he[++ce]&&he[++Y]===he[++ce]&&Y<Pe);if(I=pe-(Pe-Y),Y=Pe-pe,D<I){if(y.match_start=fe,ue<=(D=I))break;Ge=he[Y+D-1],Be=he[Y+D]}}while((fe=be[fe&je])>Z&&--O!=0);return D<=y.lookahead?D:y.lookahead}function _e(y){var fe,ce,I,O,Y,D,ue,Z,he,je,be=y.w_size;do{if(O=y.window_size-y.lookahead-y.strstart,y.strstart>=be+(be-te)){for(u.arraySet(y.window,y.window,be,be,0),y.match_start-=be,y.strstart-=be,y.block_start-=be,fe=ce=y.hash_size;I=y.head[--fe],y.head[fe]=be<=I?I-be:0,--ce;);for(fe=ce=be;I=y.prev[--fe],y.prev[fe]=be<=I?I-be:0,--ce;);O+=be}if(y.strm.avail_in===0)break;if(D=y.strm,ue=y.window,Z=y.strstart+y.lookahead,he=O,je=void 0,je=D.avail_in,he<je&&(je=he),ce=je===0?0:(D.avail_in-=je,u.arraySet(ue,D.input,D.next_in,je,Z),D.state.wrap===1?D.adler=h(D.adler,ue,je,Z):D.state.wrap===2&&(D.adler=b(D.adler,ue,je,Z)),D.next_in+=je,D.total_in+=je,je),y.lookahead+=ce,y.lookahead+y.insert>=H)for(Y=y.strstart-y.insert,y.ins_h=y.window[Y],y.ins_h=(y.ins_h<<y.hash_shift^y.window[Y+1])&y.hash_mask;y.insert&&(y.ins_h=(y.ins_h<<y.hash_shift^y.window[Y+H-1])&y.hash_mask,y.prev[Y&y.w_mask]=y.head[y.ins_h],y.head[y.ins_h]=Y,Y++,y.insert--,!(y.lookahead+y.insert<H)););}while(y.lookahead<te&&y.strm.avail_in!==0)}function Te(y,fe){for(var ce,I;;){if(y.lookahead<te){if(_e(y),y.lookahead<te&&fe===j)return k;if(y.lookahead===0)break}if(ce=0,y.lookahead>=H&&(y.ins_h=(y.ins_h<<y.hash_shift^y.window[y.strstart+H-1])&y.hash_mask,ce=y.prev[y.strstart&y.w_mask]=y.head[y.ins_h],y.head[y.ins_h]=y.strstart),ce!==0&&y.strstart-ce<=y.w_size-te&&(y.match_length=oe(y,ce)),y.match_length>=H)if(I=f._tr_tally(y,y.strstart-y.match_start,y.match_length-H),y.lookahead-=y.match_length,y.match_length<=y.max_lazy_match&&y.lookahead>=H){for(y.match_length--;y.strstart++,y.ins_h=(y.ins_h<<y.hash_shift^y.window[y.strstart+H-1])&y.hash_mask,ce=y.prev[y.strstart&y.w_mask]=y.head[y.ins_h],y.head[y.ins_h]=y.strstart,--y.match_length!=0;);y.strstart++}else y.strstart+=y.match_length,y.match_length=0,y.ins_h=y.window[y.strstart],y.ins_h=(y.ins_h<<y.hash_shift^y.window[y.strstart+1])&y.hash_mask;else I=f._tr_tally(y,0,y.window[y.strstart]),y.lookahead--,y.strstart++;if(I&&(z(y,!1),y.strm.avail_out===0))return k}return y.insert=y.strstart<H-1?y.strstart:H-1,fe===S?(z(y,!0),y.strm.avail_out===0?ye:re):y.last_lit&&(z(y,!1),y.strm.avail_out===0)?k:se}function Ne(y,fe){for(var ce,I,O;;){if(y.lookahead<te){if(_e(y),y.lookahead<te&&fe===j)return k;if(y.lookahead===0)break}if(ce=0,y.lookahead>=H&&(y.ins_h=(y.ins_h<<y.hash_shift^y.window[y.strstart+H-1])&y.hash_mask,ce=y.prev[y.strstart&y.w_mask]=y.head[y.ins_h],y.head[y.ins_h]=y.strstart),y.prev_length=y.match_length,y.prev_match=y.match_start,y.match_length=H-1,ce!==0&&y.prev_length<y.max_lazy_match&&y.strstart-ce<=y.w_size-te&&(y.match_length=oe(y,ce),y.match_length<=5&&(y.strategy===1||y.match_length===H&&4096<y.strstart-y.match_start)&&(y.match_length=H-1)),y.prev_length>=H&&y.match_length<=y.prev_length){for(O=y.strstart+y.lookahead-H,I=f._tr_tally(y,y.strstart-1-y.prev_match,y.prev_length-H),y.lookahead-=y.prev_length-1,y.prev_length-=2;++y.strstart<=O&&(y.ins_h=(y.ins_h<<y.hash_shift^y.window[y.strstart+H-1])&y.hash_mask,ce=y.prev[y.strstart&y.w_mask]=y.head[y.ins_h],y.head[y.ins_h]=y.strstart),--y.prev_length!=0;);if(y.match_available=0,y.match_length=H-1,y.strstart++,I&&(z(y,!1),y.strm.avail_out===0))return k}else if(y.match_available){if((I=f._tr_tally(y,0,y.window[y.strstart-1]))&&z(y,!1),y.strstart++,y.lookahead--,y.strm.avail_out===0)return k}else y.match_available=1,y.strstart++,y.lookahead--}return y.match_available&&(I=f._tr_tally(y,0,y.window[y.strstart-1]),y.match_available=0),y.insert=y.strstart<H-1?y.strstart:H-1,fe===S?(z(y,!0),y.strm.avail_out===0?ye:re):y.last_lit&&(z(y,!1),y.strm.avail_out===0)?k:se}function Re(y,fe,ce,I,O){this.good_length=y,this.max_lazy=fe,this.nice_length=ce,this.max_chain=I,this.func=O}function We(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=P,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new u.Buf16(2*M),this.dyn_dtree=new u.Buf16(2*(2*L+1)),this.bl_tree=new u.Buf16(2*(2*F+1)),ne(this.dyn_ltree),ne(this.dyn_dtree),ne(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new u.Buf16(G+1),this.heap=new u.Buf16(2*C+1),ne(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new u.Buf16(2*C+1),ne(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function Xe(y){var fe;return y&&y.state?(y.total_in=y.total_out=0,y.data_type=N,(fe=y.state).pending=0,fe.pending_out=0,fe.wrap<0&&(fe.wrap=-fe.wrap),fe.status=fe.wrap?A:K,y.adler=fe.wrap===2?0:1,fe.last_flush=j,f._tr_init(fe),_):W(y,w)}function Pt(y){var fe=Xe(y);return fe===_&&(function(ce){ce.window_size=2*ce.w_size,ne(ce.head),ce.max_lazy_match=d[ce.level].max_lazy,ce.good_match=d[ce.level].good_length,ce.nice_match=d[ce.level].nice_length,ce.max_chain_length=d[ce.level].max_chain,ce.strstart=0,ce.block_start=0,ce.lookahead=0,ce.insert=0,ce.match_length=ce.prev_length=H-1,ce.match_available=0,ce.ins_h=0})(y.state),fe}function ot(y,fe,ce,I,O,Y){if(!y)return w;var D=1;if(fe===x&&(fe=6),I<0?(D=0,I=-I):15<I&&(D=2,I-=16),O<1||T<O||ce!==P||I<8||15<I||fe<0||9<fe||Y<0||v<Y)return W(y,w);I===8&&(I=9);var ue=new We;return(y.state=ue).strm=y,ue.wrap=D,ue.gzhead=null,ue.w_bits=I,ue.w_size=1<<ue.w_bits,ue.w_mask=ue.w_size-1,ue.hash_bits=O+7,ue.hash_size=1<<ue.hash_bits,ue.hash_mask=ue.hash_size-1,ue.hash_shift=~~((ue.hash_bits+H-1)/H),ue.window=new u.Buf8(2*ue.w_size),ue.head=new u.Buf16(ue.hash_size),ue.prev=new u.Buf16(ue.w_size),ue.lit_bufsize=1<<O+6,ue.pending_buf_size=4*ue.lit_bufsize,ue.pending_buf=new u.Buf8(ue.pending_buf_size),ue.d_buf=1*ue.lit_bufsize,ue.l_buf=3*ue.lit_bufsize,ue.level=fe,ue.strategy=Y,ue.method=ce,Pt(y)}d=[new Re(0,0,0,0,function(y,fe){var ce=65535;for(ce>y.pending_buf_size-5&&(ce=y.pending_buf_size-5);;){if(y.lookahead<=1){if(_e(y),y.lookahead===0&&fe===j)return k;if(y.lookahead===0)break}y.strstart+=y.lookahead,y.lookahead=0;var I=y.block_start+ce;if((y.strstart===0||y.strstart>=I)&&(y.lookahead=y.strstart-I,y.strstart=I,z(y,!1),y.strm.avail_out===0)||y.strstart-y.block_start>=y.w_size-te&&(z(y,!1),y.strm.avail_out===0))return k}return y.insert=0,fe===S?(z(y,!0),y.strm.avail_out===0?ye:re):(y.strstart>y.block_start&&(z(y,!1),y.strm.avail_out),k)}),new Re(4,4,8,4,Te),new Re(4,5,16,8,Te),new Re(4,6,32,32,Te),new Re(4,4,16,16,Ne),new Re(8,16,32,32,Ne),new Re(8,16,128,128,Ne),new Re(8,32,128,256,Ne),new Re(32,128,258,1024,Ne),new Re(32,258,258,4096,Ne)],l.deflateInit=function(y,fe){return ot(y,fe,P,15,8,0)},l.deflateInit2=ot,l.deflateReset=Pt,l.deflateResetKeep=Xe,l.deflateSetHeader=function(y,fe){return y&&y.state?y.state.wrap!==2?w:(y.state.gzhead=fe,_):w},l.deflate=function(y,fe){var ce,I,O,Y;if(!y||!y.state||5<fe||fe<0)return y?W(y,w):w;if(I=y.state,!y.output||!y.input&&y.avail_in!==0||I.status===666&&fe!==S)return W(y,y.avail_out===0?-5:w);if(I.strm=y,ce=I.last_flush,I.last_flush=fe,I.status===A)if(I.wrap===2)y.adler=0,J(I,31),J(I,139),J(I,8),I.gzhead?(J(I,(I.gzhead.text?1:0)+(I.gzhead.hcrc?2:0)+(I.gzhead.extra?4:0)+(I.gzhead.name?8:0)+(I.gzhead.comment?16:0)),J(I,255&I.gzhead.time),J(I,I.gzhead.time>>8&255),J(I,I.gzhead.time>>16&255),J(I,I.gzhead.time>>24&255),J(I,I.level===9?2:2<=I.strategy||I.level<2?4:0),J(I,255&I.gzhead.os),I.gzhead.extra&&I.gzhead.extra.length&&(J(I,255&I.gzhead.extra.length),J(I,I.gzhead.extra.length>>8&255)),I.gzhead.hcrc&&(y.adler=b(y.adler,I.pending_buf,I.pending,0)),I.gzindex=0,I.status=69):(J(I,0),J(I,0),J(I,0),J(I,0),J(I,0),J(I,I.level===9?2:2<=I.strategy||I.level<2?4:0),J(I,3),I.status=K);else{var D=P+(I.w_bits-8<<4)<<8;D|=(2<=I.strategy||I.level<2?0:I.level<6?1:I.level===6?2:3)<<6,I.strstart!==0&&(D|=32),D+=31-D%31,I.status=K,ie(I,D),I.strstart!==0&&(ie(I,y.adler>>>16),ie(I,65535&y.adler)),y.adler=1}if(I.status===69)if(I.gzhead.extra){for(O=I.pending;I.gzindex<(65535&I.gzhead.extra.length)&&(I.pending!==I.pending_buf_size||(I.gzhead.hcrc&&I.pending>O&&(y.adler=b(y.adler,I.pending_buf,I.pending-O,O)),R(y),O=I.pending,I.pending!==I.pending_buf_size));)J(I,255&I.gzhead.extra[I.gzindex]),I.gzindex++;I.gzhead.hcrc&&I.pending>O&&(y.adler=b(y.adler,I.pending_buf,I.pending-O,O)),I.gzindex===I.gzhead.extra.length&&(I.gzindex=0,I.status=73)}else I.status=73;if(I.status===73)if(I.gzhead.name){O=I.pending;do{if(I.pending===I.pending_buf_size&&(I.gzhead.hcrc&&I.pending>O&&(y.adler=b(y.adler,I.pending_buf,I.pending-O,O)),R(y),O=I.pending,I.pending===I.pending_buf_size)){Y=1;break}Y=I.gzindex<I.gzhead.name.length?255&I.gzhead.name.charCodeAt(I.gzindex++):0,J(I,Y)}while(Y!==0);I.gzhead.hcrc&&I.pending>O&&(y.adler=b(y.adler,I.pending_buf,I.pending-O,O)),Y===0&&(I.gzindex=0,I.status=91)}else I.status=91;if(I.status===91)if(I.gzhead.comment){O=I.pending;do{if(I.pending===I.pending_buf_size&&(I.gzhead.hcrc&&I.pending>O&&(y.adler=b(y.adler,I.pending_buf,I.pending-O,O)),R(y),O=I.pending,I.pending===I.pending_buf_size)){Y=1;break}Y=I.gzindex<I.gzhead.comment.length?255&I.gzhead.comment.charCodeAt(I.gzindex++):0,J(I,Y)}while(Y!==0);I.gzhead.hcrc&&I.pending>O&&(y.adler=b(y.adler,I.pending_buf,I.pending-O,O)),Y===0&&(I.status=103)}else I.status=103;if(I.status===103&&(I.gzhead.hcrc?(I.pending+2>I.pending_buf_size&&R(y),I.pending+2<=I.pending_buf_size&&(J(I,255&y.adler),J(I,y.adler>>8&255),y.adler=0,I.status=K)):I.status=K),I.pending!==0){if(R(y),y.avail_out===0)return I.last_flush=-1,_}else if(y.avail_in===0&&X(fe)<=X(ce)&&fe!==S)return W(y,-5);if(I.status===666&&y.avail_in!==0)return W(y,-5);if(y.avail_in!==0||I.lookahead!==0||fe!==j&&I.status!==666){var ue=I.strategy===2?(function(Z,he){for(var je;;){if(Z.lookahead===0&&(_e(Z),Z.lookahead===0)){if(he===j)return k;break}if(Z.match_length=0,je=f._tr_tally(Z,0,Z.window[Z.strstart]),Z.lookahead--,Z.strstart++,je&&(z(Z,!1),Z.strm.avail_out===0))return k}return Z.insert=0,he===S?(z(Z,!0),Z.strm.avail_out===0?ye:re):Z.last_lit&&(z(Z,!1),Z.strm.avail_out===0)?k:se})(I,fe):I.strategy===3?(function(Z,he){for(var je,be,Pe,Ge,Be=Z.window;;){if(Z.lookahead<=pe){if(_e(Z),Z.lookahead<=pe&&he===j)return k;if(Z.lookahead===0)break}if(Z.match_length=0,Z.lookahead>=H&&0<Z.strstart&&(be=Be[Pe=Z.strstart-1])===Be[++Pe]&&be===Be[++Pe]&&be===Be[++Pe]){Ge=Z.strstart+pe;do;while(be===Be[++Pe]&&be===Be[++Pe]&&be===Be[++Pe]&&be===Be[++Pe]&&be===Be[++Pe]&&be===Be[++Pe]&&be===Be[++Pe]&&be===Be[++Pe]&&Pe<Ge);Z.match_length=pe-(Ge-Pe),Z.match_length>Z.lookahead&&(Z.match_length=Z.lookahead)}if(Z.match_length>=H?(je=f._tr_tally(Z,1,Z.match_length-H),Z.lookahead-=Z.match_length,Z.strstart+=Z.match_length,Z.match_length=0):(je=f._tr_tally(Z,0,Z.window[Z.strstart]),Z.lookahead--,Z.strstart++),je&&(z(Z,!1),Z.strm.avail_out===0))return k}return Z.insert=0,he===S?(z(Z,!0),Z.strm.avail_out===0?ye:re):Z.last_lit&&(z(Z,!1),Z.strm.avail_out===0)?k:se})(I,fe):d[I.level].func(I,fe);if(ue!==ye&&ue!==re||(I.status=666),ue===k||ue===ye)return y.avail_out===0&&(I.last_flush=-1),_;if(ue===se&&(fe===1?f._tr_align(I):fe!==5&&(f._tr_stored_block(I,0,0,!1),fe===3&&(ne(I.head),I.lookahead===0&&(I.strstart=0,I.block_start=0,I.insert=0))),R(y),y.avail_out===0))return I.last_flush=-1,_}return fe!==S?_:I.wrap<=0?1:(I.wrap===2?(J(I,255&y.adler),J(I,y.adler>>8&255),J(I,y.adler>>16&255),J(I,y.adler>>24&255),J(I,255&y.total_in),J(I,y.total_in>>8&255),J(I,y.total_in>>16&255),J(I,y.total_in>>24&255)):(ie(I,y.adler>>>16),ie(I,65535&y.adler)),R(y),0<I.wrap&&(I.wrap=-I.wrap),I.pending!==0?_:1)},l.deflateEnd=function(y){var fe;return y&&y.state?(fe=y.state.status)!==A&&fe!==69&&fe!==73&&fe!==91&&fe!==103&&fe!==K&&fe!==666?W(y,w):(y.state=null,fe===K?W(y,-3):_):w},l.deflateSetDictionary=function(y,fe){var ce,I,O,Y,D,ue,Z,he,je=fe.length;if(!y||!y.state||(Y=(ce=y.state).wrap)===2||Y===1&&ce.status!==A||ce.lookahead)return w;for(Y===1&&(y.adler=h(y.adler,fe,je,0)),ce.wrap=0,je>=ce.w_size&&(Y===0&&(ne(ce.head),ce.strstart=0,ce.block_start=0,ce.insert=0),he=new u.Buf8(ce.w_size),u.arraySet(he,fe,je-ce.w_size,ce.w_size,0),fe=he,je=ce.w_size),D=y.avail_in,ue=y.next_in,Z=y.input,y.avail_in=je,y.next_in=0,y.input=fe,_e(ce);ce.lookahead>=H;){for(I=ce.strstart,O=ce.lookahead-(H-1);ce.ins_h=(ce.ins_h<<ce.hash_shift^ce.window[I+H-1])&ce.hash_mask,ce.prev[I&ce.w_mask]=ce.head[ce.ins_h],ce.head[ce.ins_h]=I,I++,--O;);ce.strstart=I,ce.lookahead=H-1,_e(ce)}return ce.strstart+=ce.lookahead,ce.block_start=ce.strstart,ce.insert=ce.lookahead,ce.lookahead=0,ce.match_length=ce.prev_length=H-1,ce.match_available=0,y.next_in=ue,y.input=Z,y.avail_in=D,ce.wrap=Y,_},l.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(n,o,l){o.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(n,o,l){o.exports=function(d,u){var f,h,b,g,j,S,_,w,x,v,N,P,T,C,L,F,M,G,H,pe,te,A,K,k,se;f=d.state,h=d.next_in,k=d.input,b=h+(d.avail_in-5),g=d.next_out,se=d.output,j=g-(u-d.avail_out),S=g+(d.avail_out-257),_=f.dmax,w=f.wsize,x=f.whave,v=f.wnext,N=f.window,P=f.hold,T=f.bits,C=f.lencode,L=f.distcode,F=(1<<f.lenbits)-1,M=(1<<f.distbits)-1;e:do{T<15&&(P+=k[h++]<<T,T+=8,P+=k[h++]<<T,T+=8),G=C[P&F];t:for(;;){if(P>>>=H=G>>>24,T-=H,(H=G>>>16&255)===0)se[g++]=65535&G;else{if(!(16&H)){if((64&H)==0){G=C[(65535&G)+(P&(1<<H)-1)];continue t}if(32&H){f.mode=12;break e}d.msg="invalid literal/length code",f.mode=30;break e}pe=65535&G,(H&=15)&&(T<H&&(P+=k[h++]<<T,T+=8),pe+=P&(1<<H)-1,P>>>=H,T-=H),T<15&&(P+=k[h++]<<T,T+=8,P+=k[h++]<<T,T+=8),G=L[P&M];r:for(;;){if(P>>>=H=G>>>24,T-=H,!(16&(H=G>>>16&255))){if((64&H)==0){G=L[(65535&G)+(P&(1<<H)-1)];continue r}d.msg="invalid distance code",f.mode=30;break e}if(te=65535&G,T<(H&=15)&&(P+=k[h++]<<T,(T+=8)<H&&(P+=k[h++]<<T,T+=8)),_<(te+=P&(1<<H)-1)){d.msg="invalid distance too far back",f.mode=30;break e}if(P>>>=H,T-=H,(H=g-j)<te){if(x<(H=te-H)&&f.sane){d.msg="invalid distance too far back",f.mode=30;break e}if(K=N,(A=0)===v){if(A+=w-H,H<pe){for(pe-=H;se[g++]=N[A++],--H;);A=g-te,K=se}}else if(v<H){if(A+=w+v-H,(H-=v)<pe){for(pe-=H;se[g++]=N[A++],--H;);if(A=0,v<pe){for(pe-=H=v;se[g++]=N[A++],--H;);A=g-te,K=se}}}else if(A+=v-H,H<pe){for(pe-=H;se[g++]=N[A++],--H;);A=g-te,K=se}for(;2<pe;)se[g++]=K[A++],se[g++]=K[A++],se[g++]=K[A++],pe-=3;pe&&(se[g++]=K[A++],1<pe&&(se[g++]=K[A++]))}else{for(A=g-te;se[g++]=se[A++],se[g++]=se[A++],se[g++]=se[A++],2<(pe-=3););pe&&(se[g++]=se[A++],1<pe&&(se[g++]=se[A++]))}break}}break}}while(h<b&&g<S);h-=pe=T>>3,P&=(1<<(T-=pe<<3))-1,d.next_in=h,d.next_out=g,d.avail_in=h<b?b-h+5:5-(h-b),d.avail_out=g<S?S-g+257:257-(g-S),f.hold=P,f.bits=T}},{}],49:[function(n,o,l){var d=n("../utils/common"),u=n("./adler32"),f=n("./crc32"),h=n("./inffast"),b=n("./inftrees"),g=1,j=2,S=0,_=-2,w=1,x=852,v=592;function N(A){return(A>>>24&255)+(A>>>8&65280)+((65280&A)<<8)+((255&A)<<24)}function P(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new d.Buf16(320),this.work=new d.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function T(A){var K;return A&&A.state?(K=A.state,A.total_in=A.total_out=K.total=0,A.msg="",K.wrap&&(A.adler=1&K.wrap),K.mode=w,K.last=0,K.havedict=0,K.dmax=32768,K.head=null,K.hold=0,K.bits=0,K.lencode=K.lendyn=new d.Buf32(x),K.distcode=K.distdyn=new d.Buf32(v),K.sane=1,K.back=-1,S):_}function C(A){var K;return A&&A.state?((K=A.state).wsize=0,K.whave=0,K.wnext=0,T(A)):_}function L(A,K){var k,se;return A&&A.state?(se=A.state,K<0?(k=0,K=-K):(k=1+(K>>4),K<48&&(K&=15)),K&&(K<8||15<K)?_:(se.window!==null&&se.wbits!==K&&(se.window=null),se.wrap=k,se.wbits=K,C(A))):_}function F(A,K){var k,se;return A?(se=new P,(A.state=se).window=null,(k=L(A,K))!==S&&(A.state=null),k):_}var M,G,H=!0;function pe(A){if(H){var K;for(M=new d.Buf32(512),G=new d.Buf32(32),K=0;K<144;)A.lens[K++]=8;for(;K<256;)A.lens[K++]=9;for(;K<280;)A.lens[K++]=7;for(;K<288;)A.lens[K++]=8;for(b(g,A.lens,0,288,M,0,A.work,{bits:9}),K=0;K<32;)A.lens[K++]=5;b(j,A.lens,0,32,G,0,A.work,{bits:5}),H=!1}A.lencode=M,A.lenbits=9,A.distcode=G,A.distbits=5}function te(A,K,k,se){var ye,re=A.state;return re.window===null&&(re.wsize=1<<re.wbits,re.wnext=0,re.whave=0,re.window=new d.Buf8(re.wsize)),se>=re.wsize?(d.arraySet(re.window,K,k-re.wsize,re.wsize,0),re.wnext=0,re.whave=re.wsize):(se<(ye=re.wsize-re.wnext)&&(ye=se),d.arraySet(re.window,K,k-se,ye,re.wnext),(se-=ye)?(d.arraySet(re.window,K,k-se,se,0),re.wnext=se,re.whave=re.wsize):(re.wnext+=ye,re.wnext===re.wsize&&(re.wnext=0),re.whave<re.wsize&&(re.whave+=ye))),0}l.inflateReset=C,l.inflateReset2=L,l.inflateResetKeep=T,l.inflateInit=function(A){return F(A,15)},l.inflateInit2=F,l.inflate=function(A,K){var k,se,ye,re,W,X,ne,R,z,J,ie,oe,_e,Te,Ne,Re,We,Xe,Pt,ot,y,fe,ce,I,O=0,Y=new d.Buf8(4),D=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!A||!A.state||!A.output||!A.input&&A.avail_in!==0)return _;(k=A.state).mode===12&&(k.mode=13),W=A.next_out,ye=A.output,ne=A.avail_out,re=A.next_in,se=A.input,X=A.avail_in,R=k.hold,z=k.bits,J=X,ie=ne,fe=S;e:for(;;)switch(k.mode){case w:if(k.wrap===0){k.mode=13;break}for(;z<16;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}if(2&k.wrap&&R===35615){Y[k.check=0]=255&R,Y[1]=R>>>8&255,k.check=f(k.check,Y,2,0),z=R=0,k.mode=2;break}if(k.flags=0,k.head&&(k.head.done=!1),!(1&k.wrap)||(((255&R)<<8)+(R>>8))%31){A.msg="incorrect header check",k.mode=30;break}if((15&R)!=8){A.msg="unknown compression method",k.mode=30;break}if(z-=4,y=8+(15&(R>>>=4)),k.wbits===0)k.wbits=y;else if(y>k.wbits){A.msg="invalid window size",k.mode=30;break}k.dmax=1<<y,A.adler=k.check=1,k.mode=512&R?10:12,z=R=0;break;case 2:for(;z<16;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}if(k.flags=R,(255&k.flags)!=8){A.msg="unknown compression method",k.mode=30;break}if(57344&k.flags){A.msg="unknown header flags set",k.mode=30;break}k.head&&(k.head.text=R>>8&1),512&k.flags&&(Y[0]=255&R,Y[1]=R>>>8&255,k.check=f(k.check,Y,2,0)),z=R=0,k.mode=3;case 3:for(;z<32;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}k.head&&(k.head.time=R),512&k.flags&&(Y[0]=255&R,Y[1]=R>>>8&255,Y[2]=R>>>16&255,Y[3]=R>>>24&255,k.check=f(k.check,Y,4,0)),z=R=0,k.mode=4;case 4:for(;z<16;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}k.head&&(k.head.xflags=255&R,k.head.os=R>>8),512&k.flags&&(Y[0]=255&R,Y[1]=R>>>8&255,k.check=f(k.check,Y,2,0)),z=R=0,k.mode=5;case 5:if(1024&k.flags){for(;z<16;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}k.length=R,k.head&&(k.head.extra_len=R),512&k.flags&&(Y[0]=255&R,Y[1]=R>>>8&255,k.check=f(k.check,Y,2,0)),z=R=0}else k.head&&(k.head.extra=null);k.mode=6;case 6:if(1024&k.flags&&(X<(oe=k.length)&&(oe=X),oe&&(k.head&&(y=k.head.extra_len-k.length,k.head.extra||(k.head.extra=new Array(k.head.extra_len)),d.arraySet(k.head.extra,se,re,oe,y)),512&k.flags&&(k.check=f(k.check,se,oe,re)),X-=oe,re+=oe,k.length-=oe),k.length))break e;k.length=0,k.mode=7;case 7:if(2048&k.flags){if(X===0)break e;for(oe=0;y=se[re+oe++],k.head&&y&&k.length<65536&&(k.head.name+=String.fromCharCode(y)),y&&oe<X;);if(512&k.flags&&(k.check=f(k.check,se,oe,re)),X-=oe,re+=oe,y)break e}else k.head&&(k.head.name=null);k.length=0,k.mode=8;case 8:if(4096&k.flags){if(X===0)break e;for(oe=0;y=se[re+oe++],k.head&&y&&k.length<65536&&(k.head.comment+=String.fromCharCode(y)),y&&oe<X;);if(512&k.flags&&(k.check=f(k.check,se,oe,re)),X-=oe,re+=oe,y)break e}else k.head&&(k.head.comment=null);k.mode=9;case 9:if(512&k.flags){for(;z<16;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}if(R!==(65535&k.check)){A.msg="header crc mismatch",k.mode=30;break}z=R=0}k.head&&(k.head.hcrc=k.flags>>9&1,k.head.done=!0),A.adler=k.check=0,k.mode=12;break;case 10:for(;z<32;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}A.adler=k.check=N(R),z=R=0,k.mode=11;case 11:if(k.havedict===0)return A.next_out=W,A.avail_out=ne,A.next_in=re,A.avail_in=X,k.hold=R,k.bits=z,2;A.adler=k.check=1,k.mode=12;case 12:if(K===5||K===6)break e;case 13:if(k.last){R>>>=7&z,z-=7&z,k.mode=27;break}for(;z<3;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}switch(k.last=1&R,z-=1,3&(R>>>=1)){case 0:k.mode=14;break;case 1:if(pe(k),k.mode=20,K!==6)break;R>>>=2,z-=2;break e;case 2:k.mode=17;break;case 3:A.msg="invalid block type",k.mode=30}R>>>=2,z-=2;break;case 14:for(R>>>=7&z,z-=7&z;z<32;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}if((65535&R)!=(R>>>16^65535)){A.msg="invalid stored block lengths",k.mode=30;break}if(k.length=65535&R,z=R=0,k.mode=15,K===6)break e;case 15:k.mode=16;case 16:if(oe=k.length){if(X<oe&&(oe=X),ne<oe&&(oe=ne),oe===0)break e;d.arraySet(ye,se,re,oe,W),X-=oe,re+=oe,ne-=oe,W+=oe,k.length-=oe;break}k.mode=12;break;case 17:for(;z<14;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}if(k.nlen=257+(31&R),R>>>=5,z-=5,k.ndist=1+(31&R),R>>>=5,z-=5,k.ncode=4+(15&R),R>>>=4,z-=4,286<k.nlen||30<k.ndist){A.msg="too many length or distance symbols",k.mode=30;break}k.have=0,k.mode=18;case 18:for(;k.have<k.ncode;){for(;z<3;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}k.lens[D[k.have++]]=7&R,R>>>=3,z-=3}for(;k.have<19;)k.lens[D[k.have++]]=0;if(k.lencode=k.lendyn,k.lenbits=7,ce={bits:k.lenbits},fe=b(0,k.lens,0,19,k.lencode,0,k.work,ce),k.lenbits=ce.bits,fe){A.msg="invalid code lengths set",k.mode=30;break}k.have=0,k.mode=19;case 19:for(;k.have<k.nlen+k.ndist;){for(;Re=(O=k.lencode[R&(1<<k.lenbits)-1])>>>16&255,We=65535&O,!((Ne=O>>>24)<=z);){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}if(We<16)R>>>=Ne,z-=Ne,k.lens[k.have++]=We;else{if(We===16){for(I=Ne+2;z<I;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}if(R>>>=Ne,z-=Ne,k.have===0){A.msg="invalid bit length repeat",k.mode=30;break}y=k.lens[k.have-1],oe=3+(3&R),R>>>=2,z-=2}else if(We===17){for(I=Ne+3;z<I;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}z-=Ne,y=0,oe=3+(7&(R>>>=Ne)),R>>>=3,z-=3}else{for(I=Ne+7;z<I;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}z-=Ne,y=0,oe=11+(127&(R>>>=Ne)),R>>>=7,z-=7}if(k.have+oe>k.nlen+k.ndist){A.msg="invalid bit length repeat",k.mode=30;break}for(;oe--;)k.lens[k.have++]=y}}if(k.mode===30)break;if(k.lens[256]===0){A.msg="invalid code -- missing end-of-block",k.mode=30;break}if(k.lenbits=9,ce={bits:k.lenbits},fe=b(g,k.lens,0,k.nlen,k.lencode,0,k.work,ce),k.lenbits=ce.bits,fe){A.msg="invalid literal/lengths set",k.mode=30;break}if(k.distbits=6,k.distcode=k.distdyn,ce={bits:k.distbits},fe=b(j,k.lens,k.nlen,k.ndist,k.distcode,0,k.work,ce),k.distbits=ce.bits,fe){A.msg="invalid distances set",k.mode=30;break}if(k.mode=20,K===6)break e;case 20:k.mode=21;case 21:if(6<=X&&258<=ne){A.next_out=W,A.avail_out=ne,A.next_in=re,A.avail_in=X,k.hold=R,k.bits=z,h(A,ie),W=A.next_out,ye=A.output,ne=A.avail_out,re=A.next_in,se=A.input,X=A.avail_in,R=k.hold,z=k.bits,k.mode===12&&(k.back=-1);break}for(k.back=0;Re=(O=k.lencode[R&(1<<k.lenbits)-1])>>>16&255,We=65535&O,!((Ne=O>>>24)<=z);){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}if(Re&&(240&Re)==0){for(Xe=Ne,Pt=Re,ot=We;Re=(O=k.lencode[ot+((R&(1<<Xe+Pt)-1)>>Xe)])>>>16&255,We=65535&O,!(Xe+(Ne=O>>>24)<=z);){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}R>>>=Xe,z-=Xe,k.back+=Xe}if(R>>>=Ne,z-=Ne,k.back+=Ne,k.length=We,Re===0){k.mode=26;break}if(32&Re){k.back=-1,k.mode=12;break}if(64&Re){A.msg="invalid literal/length code",k.mode=30;break}k.extra=15&Re,k.mode=22;case 22:if(k.extra){for(I=k.extra;z<I;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}k.length+=R&(1<<k.extra)-1,R>>>=k.extra,z-=k.extra,k.back+=k.extra}k.was=k.length,k.mode=23;case 23:for(;Re=(O=k.distcode[R&(1<<k.distbits)-1])>>>16&255,We=65535&O,!((Ne=O>>>24)<=z);){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}if((240&Re)==0){for(Xe=Ne,Pt=Re,ot=We;Re=(O=k.distcode[ot+((R&(1<<Xe+Pt)-1)>>Xe)])>>>16&255,We=65535&O,!(Xe+(Ne=O>>>24)<=z);){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}R>>>=Xe,z-=Xe,k.back+=Xe}if(R>>>=Ne,z-=Ne,k.back+=Ne,64&Re){A.msg="invalid distance code",k.mode=30;break}k.offset=We,k.extra=15&Re,k.mode=24;case 24:if(k.extra){for(I=k.extra;z<I;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}k.offset+=R&(1<<k.extra)-1,R>>>=k.extra,z-=k.extra,k.back+=k.extra}if(k.offset>k.dmax){A.msg="invalid distance too far back",k.mode=30;break}k.mode=25;case 25:if(ne===0)break e;if(oe=ie-ne,k.offset>oe){if((oe=k.offset-oe)>k.whave&&k.sane){A.msg="invalid distance too far back",k.mode=30;break}_e=oe>k.wnext?(oe-=k.wnext,k.wsize-oe):k.wnext-oe,oe>k.length&&(oe=k.length),Te=k.window}else Te=ye,_e=W-k.offset,oe=k.length;for(ne<oe&&(oe=ne),ne-=oe,k.length-=oe;ye[W++]=Te[_e++],--oe;);k.length===0&&(k.mode=21);break;case 26:if(ne===0)break e;ye[W++]=k.length,ne--,k.mode=21;break;case 27:if(k.wrap){for(;z<32;){if(X===0)break e;X--,R|=se[re++]<<z,z+=8}if(ie-=ne,A.total_out+=ie,k.total+=ie,ie&&(A.adler=k.check=k.flags?f(k.check,ye,ie,W-ie):u(k.check,ye,ie,W-ie)),ie=ne,(k.flags?R:N(R))!==k.check){A.msg="incorrect data check",k.mode=30;break}z=R=0}k.mode=28;case 28:if(k.wrap&&k.flags){for(;z<32;){if(X===0)break e;X--,R+=se[re++]<<z,z+=8}if(R!==(4294967295&k.total)){A.msg="incorrect length check",k.mode=30;break}z=R=0}k.mode=29;case 29:fe=1;break e;case 30:fe=-3;break e;case 31:return-4;case 32:default:return _}return A.next_out=W,A.avail_out=ne,A.next_in=re,A.avail_in=X,k.hold=R,k.bits=z,(k.wsize||ie!==A.avail_out&&k.mode<30&&(k.mode<27||K!==4))&&te(A,A.output,A.next_out,ie-A.avail_out)?(k.mode=31,-4):(J-=A.avail_in,ie-=A.avail_out,A.total_in+=J,A.total_out+=ie,k.total+=ie,k.wrap&&ie&&(A.adler=k.check=k.flags?f(k.check,ye,ie,A.next_out-ie):u(k.check,ye,ie,A.next_out-ie)),A.data_type=k.bits+(k.last?64:0)+(k.mode===12?128:0)+(k.mode===20||k.mode===15?256:0),(J==0&&ie===0||K===4)&&fe===S&&(fe=-5),fe)},l.inflateEnd=function(A){if(!A||!A.state)return _;var K=A.state;return K.window&&(K.window=null),A.state=null,S},l.inflateGetHeader=function(A,K){var k;return A&&A.state?(2&(k=A.state).wrap)==0?_:((k.head=K).done=!1,S):_},l.inflateSetDictionary=function(A,K){var k,se=K.length;return A&&A.state?(k=A.state).wrap!==0&&k.mode!==11?_:k.mode===11&&u(1,K,se,0)!==k.check?-3:te(A,K,se,se)?(k.mode=31,-4):(k.havedict=1,S):_},l.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(n,o,l){var d=n("../utils/common"),u=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],f=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],h=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],b=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];o.exports=function(g,j,S,_,w,x,v,N){var P,T,C,L,F,M,G,H,pe,te=N.bits,A=0,K=0,k=0,se=0,ye=0,re=0,W=0,X=0,ne=0,R=0,z=null,J=0,ie=new d.Buf16(16),oe=new d.Buf16(16),_e=null,Te=0;for(A=0;A<=15;A++)ie[A]=0;for(K=0;K<_;K++)ie[j[S+K]]++;for(ye=te,se=15;1<=se&&ie[se]===0;se--);if(se<ye&&(ye=se),se===0)return w[x++]=20971520,w[x++]=20971520,N.bits=1,0;for(k=1;k<se&&ie[k]===0;k++);for(ye<k&&(ye=k),A=X=1;A<=15;A++)if(X<<=1,(X-=ie[A])<0)return-1;if(0<X&&(g===0||se!==1))return-1;for(oe[1]=0,A=1;A<15;A++)oe[A+1]=oe[A]+ie[A];for(K=0;K<_;K++)j[S+K]!==0&&(v[oe[j[S+K]]++]=K);if(M=g===0?(z=_e=v,19):g===1?(z=u,J-=257,_e=f,Te-=257,256):(z=h,_e=b,-1),A=k,F=x,W=K=R=0,C=-1,L=(ne=1<<(re=ye))-1,g===1&&852<ne||g===2&&592<ne)return 1;for(;;){for(G=A-W,pe=v[K]<M?(H=0,v[K]):v[K]>M?(H=_e[Te+v[K]],z[J+v[K]]):(H=96,0),P=1<<A-W,k=T=1<<re;w[F+(R>>W)+(T-=P)]=G<<24|H<<16|pe|0,T!==0;);for(P=1<<A-1;R&P;)P>>=1;if(P!==0?(R&=P-1,R+=P):R=0,K++,--ie[A]==0){if(A===se)break;A=j[S+v[K]]}if(ye<A&&(R&L)!==C){for(W===0&&(W=ye),F+=k,X=1<<(re=A-W);re+W<se&&!((X-=ie[re+W])<=0);)re++,X<<=1;if(ne+=1<<re,g===1&&852<ne||g===2&&592<ne)return 1;w[C=R&L]=ye<<24|re<<16|F-x|0}}return R!==0&&(w[F+R]=A-W<<24|64<<16|0),N.bits=ye,0}},{"../utils/common":41}],51:[function(n,o,l){o.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(n,o,l){var d=n("../utils/common"),u=0,f=1;function h(O){for(var Y=O.length;0<=--Y;)O[Y]=0}var b=0,g=29,j=256,S=j+1+g,_=30,w=19,x=2*S+1,v=15,N=16,P=7,T=256,C=16,L=17,F=18,M=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],G=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],H=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],pe=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],te=new Array(2*(S+2));h(te);var A=new Array(2*_);h(A);var K=new Array(512);h(K);var k=new Array(256);h(k);var se=new Array(g);h(se);var ye,re,W,X=new Array(_);function ne(O,Y,D,ue,Z){this.static_tree=O,this.extra_bits=Y,this.extra_base=D,this.elems=ue,this.max_length=Z,this.has_stree=O&&O.length}function R(O,Y){this.dyn_tree=O,this.max_code=0,this.stat_desc=Y}function z(O){return O<256?K[O]:K[256+(O>>>7)]}function J(O,Y){O.pending_buf[O.pending++]=255&Y,O.pending_buf[O.pending++]=Y>>>8&255}function ie(O,Y,D){O.bi_valid>N-D?(O.bi_buf|=Y<<O.bi_valid&65535,J(O,O.bi_buf),O.bi_buf=Y>>N-O.bi_valid,O.bi_valid+=D-N):(O.bi_buf|=Y<<O.bi_valid&65535,O.bi_valid+=D)}function oe(O,Y,D){ie(O,D[2*Y],D[2*Y+1])}function _e(O,Y){for(var D=0;D|=1&O,O>>>=1,D<<=1,0<--Y;);return D>>>1}function Te(O,Y,D){var ue,Z,he=new Array(v+1),je=0;for(ue=1;ue<=v;ue++)he[ue]=je=je+D[ue-1]<<1;for(Z=0;Z<=Y;Z++){var be=O[2*Z+1];be!==0&&(O[2*Z]=_e(he[be]++,be))}}function Ne(O){var Y;for(Y=0;Y<S;Y++)O.dyn_ltree[2*Y]=0;for(Y=0;Y<_;Y++)O.dyn_dtree[2*Y]=0;for(Y=0;Y<w;Y++)O.bl_tree[2*Y]=0;O.dyn_ltree[2*T]=1,O.opt_len=O.static_len=0,O.last_lit=O.matches=0}function Re(O){8<O.bi_valid?J(O,O.bi_buf):0<O.bi_valid&&(O.pending_buf[O.pending++]=O.bi_buf),O.bi_buf=0,O.bi_valid=0}function We(O,Y,D,ue){var Z=2*Y,he=2*D;return O[Z]<O[he]||O[Z]===O[he]&&ue[Y]<=ue[D]}function Xe(O,Y,D){for(var ue=O.heap[D],Z=D<<1;Z<=O.heap_len&&(Z<O.heap_len&&We(Y,O.heap[Z+1],O.heap[Z],O.depth)&&Z++,!We(Y,ue,O.heap[Z],O.depth));)O.heap[D]=O.heap[Z],D=Z,Z<<=1;O.heap[D]=ue}function Pt(O,Y,D){var ue,Z,he,je,be=0;if(O.last_lit!==0)for(;ue=O.pending_buf[O.d_buf+2*be]<<8|O.pending_buf[O.d_buf+2*be+1],Z=O.pending_buf[O.l_buf+be],be++,ue===0?oe(O,Z,Y):(oe(O,(he=k[Z])+j+1,Y),(je=M[he])!==0&&ie(O,Z-=se[he],je),oe(O,he=z(--ue),D),(je=G[he])!==0&&ie(O,ue-=X[he],je)),be<O.last_lit;);oe(O,T,Y)}function ot(O,Y){var D,ue,Z,he=Y.dyn_tree,je=Y.stat_desc.static_tree,be=Y.stat_desc.has_stree,Pe=Y.stat_desc.elems,Ge=-1;for(O.heap_len=0,O.heap_max=x,D=0;D<Pe;D++)he[2*D]!==0?(O.heap[++O.heap_len]=Ge=D,O.depth[D]=0):he[2*D+1]=0;for(;O.heap_len<2;)he[2*(Z=O.heap[++O.heap_len]=Ge<2?++Ge:0)]=1,O.depth[Z]=0,O.opt_len--,be&&(O.static_len-=je[2*Z+1]);for(Y.max_code=Ge,D=O.heap_len>>1;1<=D;D--)Xe(O,he,D);for(Z=Pe;D=O.heap[1],O.heap[1]=O.heap[O.heap_len--],Xe(O,he,1),ue=O.heap[1],O.heap[--O.heap_max]=D,O.heap[--O.heap_max]=ue,he[2*Z]=he[2*D]+he[2*ue],O.depth[Z]=(O.depth[D]>=O.depth[ue]?O.depth[D]:O.depth[ue])+1,he[2*D+1]=he[2*ue+1]=Z,O.heap[1]=Z++,Xe(O,he,1),2<=O.heap_len;);O.heap[--O.heap_max]=O.heap[1],(function(Be,zt){var ur,kt,hn,et,mn,ma,Vt=zt.dyn_tree,Bn=zt.max_code,ga=zt.stat_desc.static_tree,xa=zt.stat_desc.has_stree,va=zt.stat_desc.extra_bits,zr=zt.stat_desc.extra_base,Jt=zt.stat_desc.max_length,gn=0;for(et=0;et<=v;et++)Be.bl_count[et]=0;for(Vt[2*Be.heap[Be.heap_max]+1]=0,ur=Be.heap_max+1;ur<x;ur++)Jt<(et=Vt[2*Vt[2*(kt=Be.heap[ur])+1]+1]+1)&&(et=Jt,gn++),Vt[2*kt+1]=et,Bn<kt||(Be.bl_count[et]++,mn=0,zr<=kt&&(mn=va[kt-zr]),ma=Vt[2*kt],Be.opt_len+=ma*(et+mn),xa&&(Be.static_len+=ma*(ga[2*kt+1]+mn)));if(gn!==0){do{for(et=Jt-1;Be.bl_count[et]===0;)et--;Be.bl_count[et]--,Be.bl_count[et+1]+=2,Be.bl_count[Jt]--,gn-=2}while(0<gn);for(et=Jt;et!==0;et--)for(kt=Be.bl_count[et];kt!==0;)Bn<(hn=Be.heap[--ur])||(Vt[2*hn+1]!==et&&(Be.opt_len+=(et-Vt[2*hn+1])*Vt[2*hn],Vt[2*hn+1]=et),kt--)}})(O,Y),Te(he,Ge,O.bl_count)}function y(O,Y,D){var ue,Z,he=-1,je=Y[1],be=0,Pe=7,Ge=4;for(je===0&&(Pe=138,Ge=3),Y[2*(D+1)+1]=65535,ue=0;ue<=D;ue++)Z=je,je=Y[2*(ue+1)+1],++be<Pe&&Z===je||(be<Ge?O.bl_tree[2*Z]+=be:Z!==0?(Z!==he&&O.bl_tree[2*Z]++,O.bl_tree[2*C]++):be<=10?O.bl_tree[2*L]++:O.bl_tree[2*F]++,he=Z,Ge=(be=0)===je?(Pe=138,3):Z===je?(Pe=6,3):(Pe=7,4))}function fe(O,Y,D){var ue,Z,he=-1,je=Y[1],be=0,Pe=7,Ge=4;for(je===0&&(Pe=138,Ge=3),ue=0;ue<=D;ue++)if(Z=je,je=Y[2*(ue+1)+1],!(++be<Pe&&Z===je)){if(be<Ge)for(;oe(O,Z,O.bl_tree),--be!=0;);else Z!==0?(Z!==he&&(oe(O,Z,O.bl_tree),be--),oe(O,C,O.bl_tree),ie(O,be-3,2)):be<=10?(oe(O,L,O.bl_tree),ie(O,be-3,3)):(oe(O,F,O.bl_tree),ie(O,be-11,7));he=Z,Ge=(be=0)===je?(Pe=138,3):Z===je?(Pe=6,3):(Pe=7,4)}}h(X);var ce=!1;function I(O,Y,D,ue){ie(O,(b<<1)+(ue?1:0),3),(function(Z,he,je,be){Re(Z),J(Z,je),J(Z,~je),d.arraySet(Z.pending_buf,Z.window,he,je,Z.pending),Z.pending+=je})(O,Y,D)}l._tr_init=function(O){ce||((function(){var Y,D,ue,Z,he,je=new Array(v+1);for(Z=ue=0;Z<g-1;Z++)for(se[Z]=ue,Y=0;Y<1<<M[Z];Y++)k[ue++]=Z;for(k[ue-1]=Z,Z=he=0;Z<16;Z++)for(X[Z]=he,Y=0;Y<1<<G[Z];Y++)K[he++]=Z;for(he>>=7;Z<_;Z++)for(X[Z]=he<<7,Y=0;Y<1<<G[Z]-7;Y++)K[256+he++]=Z;for(D=0;D<=v;D++)je[D]=0;for(Y=0;Y<=143;)te[2*Y+1]=8,Y++,je[8]++;for(;Y<=255;)te[2*Y+1]=9,Y++,je[9]++;for(;Y<=279;)te[2*Y+1]=7,Y++,je[7]++;for(;Y<=287;)te[2*Y+1]=8,Y++,je[8]++;for(Te(te,S+1,je),Y=0;Y<_;Y++)A[2*Y+1]=5,A[2*Y]=_e(Y,5);ye=new ne(te,M,j+1,S,v),re=new ne(A,G,0,_,v),W=new ne(new Array(0),H,0,w,P)})(),ce=!0),O.l_desc=new R(O.dyn_ltree,ye),O.d_desc=new R(O.dyn_dtree,re),O.bl_desc=new R(O.bl_tree,W),O.bi_buf=0,O.bi_valid=0,Ne(O)},l._tr_stored_block=I,l._tr_flush_block=function(O,Y,D,ue){var Z,he,je=0;0<O.level?(O.strm.data_type===2&&(O.strm.data_type=(function(be){var Pe,Ge=4093624447;for(Pe=0;Pe<=31;Pe++,Ge>>>=1)if(1&Ge&&be.dyn_ltree[2*Pe]!==0)return u;if(be.dyn_ltree[18]!==0||be.dyn_ltree[20]!==0||be.dyn_ltree[26]!==0)return f;for(Pe=32;Pe<j;Pe++)if(be.dyn_ltree[2*Pe]!==0)return f;return u})(O)),ot(O,O.l_desc),ot(O,O.d_desc),je=(function(be){var Pe;for(y(be,be.dyn_ltree,be.l_desc.max_code),y(be,be.dyn_dtree,be.d_desc.max_code),ot(be,be.bl_desc),Pe=w-1;3<=Pe&&be.bl_tree[2*pe[Pe]+1]===0;Pe--);return be.opt_len+=3*(Pe+1)+5+5+4,Pe})(O),Z=O.opt_len+3+7>>>3,(he=O.static_len+3+7>>>3)<=Z&&(Z=he)):Z=he=D+5,D+4<=Z&&Y!==-1?I(O,Y,D,ue):O.strategy===4||he===Z?(ie(O,2+(ue?1:0),3),Pt(O,te,A)):(ie(O,4+(ue?1:0),3),(function(be,Pe,Ge,Be){var zt;for(ie(be,Pe-257,5),ie(be,Ge-1,5),ie(be,Be-4,4),zt=0;zt<Be;zt++)ie(be,be.bl_tree[2*pe[zt]+1],3);fe(be,be.dyn_ltree,Pe-1),fe(be,be.dyn_dtree,Ge-1)})(O,O.l_desc.max_code+1,O.d_desc.max_code+1,je+1),Pt(O,O.dyn_ltree,O.dyn_dtree)),Ne(O),ue&&Re(O)},l._tr_tally=function(O,Y,D){return O.pending_buf[O.d_buf+2*O.last_lit]=Y>>>8&255,O.pending_buf[O.d_buf+2*O.last_lit+1]=255&Y,O.pending_buf[O.l_buf+O.last_lit]=255&D,O.last_lit++,Y===0?O.dyn_ltree[2*D]++:(O.matches++,Y--,O.dyn_ltree[2*(k[D]+j+1)]++,O.dyn_dtree[2*z(Y)]++),O.last_lit===O.lit_bufsize-1},l._tr_align=function(O){ie(O,2,3),oe(O,T,te),(function(Y){Y.bi_valid===16?(J(Y,Y.bi_buf),Y.bi_buf=0,Y.bi_valid=0):8<=Y.bi_valid&&(Y.pending_buf[Y.pending++]=255&Y.bi_buf,Y.bi_buf>>=8,Y.bi_valid-=8)})(O)}},{"../utils/common":41}],53:[function(n,o,l){o.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(n,o,l){(function(d){(function(u,f){if(!u.setImmediate){var h,b,g,j,S=1,_={},w=!1,x=u.document,v=Object.getPrototypeOf&&Object.getPrototypeOf(u);v=v&&v.setTimeout?v:u,h={}.toString.call(u.process)==="[object process]"?function(C){process.nextTick(function(){P(C)})}:(function(){if(u.postMessage&&!u.importScripts){var C=!0,L=u.onmessage;return u.onmessage=function(){C=!1},u.postMessage("","*"),u.onmessage=L,C}})()?(j="setImmediate$"+Math.random()+"$",u.addEventListener?u.addEventListener("message",T,!1):u.attachEvent("onmessage",T),function(C){u.postMessage(j+C,"*")}):u.MessageChannel?((g=new MessageChannel).port1.onmessage=function(C){P(C.data)},function(C){g.port2.postMessage(C)}):x&&"onreadystatechange"in x.createElement("script")?(b=x.documentElement,function(C){var L=x.createElement("script");L.onreadystatechange=function(){P(C),L.onreadystatechange=null,b.removeChild(L),L=null},b.appendChild(L)}):function(C){setTimeout(P,0,C)},v.setImmediate=function(C){typeof C!="function"&&(C=new Function(""+C));for(var L=new Array(arguments.length-1),F=0;F<L.length;F++)L[F]=arguments[F+1];var M={callback:C,args:L};return _[S]=M,h(S),S++},v.clearImmediate=N}function N(C){delete _[C]}function P(C){if(w)setTimeout(P,0,C);else{var L=_[C];if(L){w=!0;try{(function(F){var M=F.callback,G=F.args;switch(G.length){case 0:M();break;case 1:M(G[0]);break;case 2:M(G[0],G[1]);break;case 3:M(G[0],G[1],G[2]);break;default:M.apply(f,G)}})(L)}finally{N(C),w=!1}}}}function T(C){C.source===u&&typeof C.data=="string"&&C.data.indexOf(j)===0&&P(+C.data.slice(j.length))}})(typeof self>"u"?d===void 0?this:d:self)}).call(this,typeof Ei<"u"?Ei:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(nc)),nc.exports}var qb=Vb();const Gb=jc(qb);/*
 * @license
 * docx-preview <https://github.com/VolodymyrBaydalka/docxjs>
 * Released under Apache License 2.0  <https://github.com/VolodymyrBaydalka/docxjs/blob/master/LICENSE>
 * Copyright Volodymyr Baydalka
 */var dt;(function(s){s.OfficeDocument="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",s.FontTable="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable",s.Image="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",s.Numbering="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering",s.Styles="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",s.StylesWithEffects="http://schemas.microsoft.com/office/2007/relationships/stylesWithEffects",s.Theme="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",s.Settings="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings",s.WebSettings="http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings",s.Hyperlink="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",s.Footnotes="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes",s.Endnotes="http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes",s.Footer="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer",s.Header="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header",s.ExtendedProperties="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",s.CoreProperties="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",s.CustomProperties="http://schemas.openxmlformats.org/package/2006/relationships/metadata/custom-properties",s.Comments="http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",s.CommentsExtended="http://schemas.microsoft.com/office/2011/relationships/commentsExtended",s.AltChunk="http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk"})(dt||(dt={}));function Yb(s,a){return a.elements(s).map(n=>({id:a.attr(n,"Id"),type:a.attr(n,"Type"),target:a.attr(n,"Target"),targetMode:a.attr(n,"TargetMode")}))}function Xb(s){return s==null?void 0:s.replace(/[ .]+/g,"-").replace(/[&]+/g,"and").toLowerCase()}function wc(s){return/^[^"'].*\s.*[^"']$/.test(s)?`'${s}'`:s}function Ui(s){let a=s.lastIndexOf("/")+1,n=a==0?"":s.substring(0,a),o=a==0?s:s.substring(a);return[n,o]}function ac(s,a){try{const n="http://docx/";return new URL(s,n+a).toString().substring(n.length)}catch{return`${a}${s}`}}function cn(s,a){return s.reduce((n,o)=>(n[a(o)]=o,n),{})}function Kb(s){return new Promise((a,n)=>{const o=new FileReader;o.onloadend=()=>a(o.result),o.onerror=()=>n(),o.readAsDataURL(s)})}function sc(s){return s&&typeof s=="object"&&!Array.isArray(s)}function Zb(s){return typeof s=="string"||s instanceof String}function Xi(s,...a){if(!a.length)return s;const n=a.shift();if(sc(s)&&sc(n))for(const o in n)if(sc(n[o])){const l=s[o]??(s[o]={});Xi(l,n[o])}else s[o]=n[o];return Xi(s,...a)}function ns(s){return Array.isArray(s)?s:[s]}function Qb(s,a,n){return a>s?a:n<s?n:s}const _h={wordml:"http://schemas.openxmlformats.org/wordprocessingml/2006/main"},pt={Dxa:{mul:.05,unit:"pt"},Emu:{mul:1/12700,unit:"pt"},FontSize:{mul:.5,unit:"pt"},Border:{mul:.125,unit:"pt",min:.25,max:12},Point:{mul:1,unit:"pt"},Percent:{mul:.02,unit:"%"}};function Sh(s,a=pt.Dxa){if(s==null||/.+(p[xt]|[%])$/.test(s))return s;var n=parseInt(s)*a.mul;return a.min&&a.max&&(n=Qb(n,a.min,a.max)),`${n.toFixed(2)}${a.unit}`}function Jb(s,a=!1){switch(s){case"1":return!0;case"0":return!1;case"on":return!0;case"off":return!1;case"true":return!0;case"false":return!1;default:return a}}function Ch(s,a,n){if(s.namespaceURI!=_h.wordml)return!1;switch(s.localName){case"color":a.color=n.attr(s,"val");break;case"sz":a.fontSize=n.lengthAttr(s,"val",pt.FontSize);break;default:return!1}return!0}function ey(s,a=!1){a&&(s=s.replace(/<[?].*[?]>/,"")),s=ry(s);const n=new DOMParser().parseFromString(s,"application/xml"),o=ty(n);if(o)throw new Error(o);return n}function ty(s){var a;return(a=s.getElementsByTagName("parsererror")[0])==null?void 0:a.textContent}function ry(s){return s.charCodeAt(0)===65279?s.substring(1):s}function ny(s){return new XMLSerializer().serializeToString(s)}class Eh{elements(a,n=null){const o=[];for(let l=0,d=a.childNodes.length;l<d;l++){let u=a.childNodes.item(l);u.nodeType==Node.ELEMENT_NODE&&(n==null||u.localName==n)&&o.push(u)}return o}element(a,n){for(let o=0,l=a.childNodes.length;o<l;o++){let d=a.childNodes.item(o);if(d.nodeType==1&&d.localName==n)return d}return null}elementAttr(a,n,o){var l=this.element(a,n);return l?this.attr(l,o):void 0}attrs(a){return Array.from(a.attributes)}attr(a,n){for(let o=0,l=a.attributes.length;o<l;o++){let d=a.attributes.item(o);if(d.localName==n)return d.value}return null}intAttr(a,n,o=null){var l=this.attr(a,n);return l?parseInt(l):o}hexAttr(a,n,o=null){var l=this.attr(a,n);return l?parseInt(l,16):o}floatAttr(a,n,o=null){var l=this.attr(a,n);return l?parseFloat(l):o}boolAttr(a,n,o=null){return Jb(this.attr(a,n),o)}lengthAttr(a,n,o=pt.Dxa){return Sh(this.attr(a,n),o)}}const V=new Eh;class Qt{constructor(a,n){this._package=a,this.path=n}async load(){this.rels=await this._package.loadRelationships(this.path);const a=await this._package.load(this.path),n=this._package.parseXmlDocument(a);this._package.options.keepOrigin&&(this._xmlDocument=n),this.parseXml(n.firstElementChild)}save(){this._package.update(this.path,ny(this._xmlDocument))}parseXml(a){}}const ay={embedRegular:"regular",embedBold:"bold",embedItalic:"italic",embedBoldItalic:"boldItalic"};function sy(s,a){return a.elements(s).map(n=>iy(n,a))}function iy(s,a){let n={name:a.attr(s,"name"),embedFontRefs:[]};for(let o of a.elements(s))switch(o.localName){case"family":n.family=a.attr(o,"val");break;case"altName":n.altName=a.attr(o,"val");break;case"embedRegular":case"embedBold":case"embedItalic":case"embedBoldItalic":n.embedFontRefs.push(oy(o,a));break}return n}function oy(s,a){return{id:a.attr(s,"id"),key:a.attr(s,"fontKey"),type:ay[s.localName]}}class ly extends Qt{parseXml(a){this.fonts=sy(a,this._package.xmlParser)}}class Dc{constructor(a,n){this._zip=a,this.options=n,this.xmlParser=new Eh}get(a){const n=cy(a);return this._zip.files[n]??this._zip.files[n.replace(/\//g,"\\")]}update(a,n){this._zip.file(a,n)}static async load(a,n){const o=await Gb.loadAsync(a);return new Dc(o,n)}save(a="blob"){return this._zip.generateAsync({type:a})}load(a,n="string"){var o;return((o=this.get(a))==null?void 0:o.async(n))??Promise.resolve(null)}async loadRelationships(a=null){let n="_rels/.rels";if(a!=null){const[l,d]=Ui(a);n=`${l}_rels/${d}.rels`}const o=await this.load(n);return o?Yb(this.parseXmlDocument(o).firstElementChild,this.xmlParser):null}parseXmlDocument(a){return ey(a,this.options.trimXmlDeclaration)}}function cy(s){return s.startsWith("/")?s.substr(1):s}class dy extends Qt{constructor(a,n,o){super(a,n),this._documentParser=o}parseXml(a){this.body=this._documentParser.parseDocumentFile(a)}}function Oi(s,a){return{type:a.attr(s,"val"),color:a.attr(s,"color"),size:a.lengthAttr(s,"sz",pt.Border),offset:a.lengthAttr(s,"space",pt.Point),frame:a.boolAttr(s,"frame"),shadow:a.boolAttr(s,"shadow")}}function uy(s,a){var n={};for(let o of a.elements(s))switch(o.localName){case"left":n.left=Oi(o,a);break;case"top":n.top=Oi(o,a);break;case"right":n.right=Oi(o,a);break;case"bottom":n.bottom=Oi(o,a);break}return n}var xf;(function(s){s.Continuous="continuous",s.NextPage="nextPage",s.NextColumn="nextColumn",s.EvenPage="evenPage",s.OddPage="oddPage"})(xf||(xf={}));function Ph(s,a=V){var n={};for(let o of a.elements(s))switch(o.localName){case"pgSz":n.pageSize={width:a.lengthAttr(o,"w"),height:a.lengthAttr(o,"h"),orientation:a.attr(o,"orient")};break;case"type":n.type=a.attr(o,"val");break;case"pgMar":n.pageMargins={left:a.lengthAttr(o,"left"),right:a.lengthAttr(o,"right"),top:a.lengthAttr(o,"top"),bottom:a.lengthAttr(o,"bottom"),header:a.lengthAttr(o,"header"),footer:a.lengthAttr(o,"footer"),gutter:a.lengthAttr(o,"gutter")};break;case"cols":n.columns=py(o,a);break;case"headerReference":(n.headerRefs??(n.headerRefs=[])).push(vf(o,a));break;case"footerReference":(n.footerRefs??(n.footerRefs=[])).push(vf(o,a));break;case"titlePg":n.titlePage=a.boolAttr(o,"val",!0);break;case"pgBorders":n.pageBorders=uy(o,a);break;case"pgNumType":n.pageNumber=fy(o,a);break}return n}function py(s,a){return{numberOfColumns:a.intAttr(s,"num"),space:a.lengthAttr(s,"space"),separator:a.boolAttr(s,"sep"),equalWidth:a.boolAttr(s,"equalWidth",!0),columns:a.elements(s,"col").map(n=>({width:a.lengthAttr(n,"w"),space:a.lengthAttr(n,"space")}))}}function fy(s,a){return{chapSep:a.attr(s,"chapSep"),chapStyle:a.attr(s,"chapStyle"),format:a.attr(s,"fmt"),start:a.intAttr(s,"start")}}function vf(s,a){return{id:a.attr(s,"id"),type:a.attr(s,"type")}}function hy(s,a){return{before:a.lengthAttr(s,"before"),after:a.lengthAttr(s,"after"),line:a.intAttr(s,"line"),lineRule:a.attr(s,"lineRule")}}function Mc(s,a){let n={};for(let o of a.elements(s))my(o,n,a);return n}function my(s,a,n){return!!Ch(s,a,n)}function zh(s,a){let n={};for(let o of a.elements(s))Rh(o,n,a);return n}function Rh(s,a,n){if(s.namespaceURI!=_h.wordml)return!1;if(Ch(s,a,n))return!0;switch(s.localName){case"tabs":a.tabs=gy(s,n);break;case"sectPr":a.sectionProps=Ph(s,n);break;case"numPr":a.numbering=xy(s,n);break;case"spacing":return a.lineSpacing=hy(s,n),!1;case"textAlignment":return a.textAlignment=n.attr(s,"val"),!1;case"keepLines":a.keepLines=n.boolAttr(s,"val",!0);break;case"keepNext":a.keepNext=n.boolAttr(s,"val",!0);break;case"pageBreakBefore":a.pageBreakBefore=n.boolAttr(s,"val",!0);break;case"outlineLvl":a.outlineLevel=n.intAttr(s,"val");break;case"pStyle":a.styleName=n.attr(s,"val");break;case"rPr":a.runProps=Mc(s,n);break;default:return!1}return!0}function gy(s,a){return a.elements(s,"tab").map(n=>({position:a.lengthAttr(n,"pos"),leader:a.attr(n,"leader"),style:a.attr(n,"val")}))}function xy(s,a){var n={};for(let o of a.elements(s))switch(o.localName){case"numId":n.id=a.attr(o,"val");break;case"ilvl":n.level=a.intAttr(o,"val");break}return n}function vy(s,a){let n={numberings:[],abstractNumberings:[],bulletPictures:[]};for(let o of a.elements(s))switch(o.localName){case"num":n.numberings.push(by(o,a));break;case"abstractNum":n.abstractNumberings.push(yy(o,a));break;case"numPicBullet":n.bulletPictures.push(jy(o,a));break}return n}function by(s,a){let n={id:a.attr(s,"numId"),overrides:[]};for(let o of a.elements(s))switch(o.localName){case"abstractNumId":n.abstractId=a.attr(o,"val");break;case"lvlOverride":n.overrides.push(wy(o,a));break}return n}function yy(s,a){let n={id:a.attr(s,"abstractNumId"),levels:[]};for(let o of a.elements(s))switch(o.localName){case"name":n.name=a.attr(o,"val");break;case"multiLevelType":n.multiLevelType=a.attr(o,"val");break;case"numStyleLink":n.numberingStyleLink=a.attr(o,"val");break;case"styleLink":n.styleLink=a.attr(o,"val");break;case"lvl":n.levels.push(Th(o,a));break}return n}function Th(s,a){let n={level:a.intAttr(s,"ilvl")};for(let o of a.elements(s))switch(o.localName){case"start":n.start=a.attr(o,"val");break;case"lvlRestart":n.restart=a.intAttr(o,"val");break;case"numFmt":n.format=a.attr(o,"val");break;case"lvlText":n.text=a.attr(o,"val");break;case"lvlJc":n.justification=a.attr(o,"val");break;case"lvlPicBulletId":n.bulletPictureId=a.attr(o,"val");break;case"pStyle":n.paragraphStyle=a.attr(o,"val");break;case"pPr":n.paragraphProps=zh(o,a);break;case"rPr":n.runProps=Mc(o,a);break}return n}function wy(s,a){let n={level:a.intAttr(s,"ilvl")};for(let o of a.elements(s))switch(o.localName){case"startOverride":n.start=a.intAttr(o,"val");break;case"lvl":n.numberingLevel=Th(o,a);break}return n}function jy(s,a){var n=a.element(s,"pict"),o=n&&a.element(n,"shape"),l=o&&a.element(o,"imagedata");return l?{id:a.attr(s,"numPicBulletId"),referenceId:a.attr(l,"id"),style:a.attr(o,"style")}:null}class ky extends Qt{constructor(a,n,o){super(a,n),this._documentParser=o}parseXml(a){Object.assign(this,vy(a,this._package.xmlParser)),this.domNumberings=this._documentParser.parseNumberingFile(a)}}class Ny extends Qt{constructor(a,n,o){super(a,n),this._documentParser=o}parseXml(a){this.styles=this._documentParser.parseStylesFile(a)}}var de;(function(s){s.Document="document",s.Paragraph="paragraph",s.Run="run",s.Break="break",s.NoBreakHyphen="noBreakHyphen",s.Table="table",s.Row="row",s.Cell="cell",s.Hyperlink="hyperlink",s.SmartTag="smartTag",s.Drawing="drawing",s.Image="image",s.Text="text",s.Tab="tab",s.Symbol="symbol",s.BookmarkStart="bookmarkStart",s.BookmarkEnd="bookmarkEnd",s.Footer="footer",s.Header="header",s.FootnoteReference="footnoteReference",s.EndnoteReference="endnoteReference",s.Footnote="footnote",s.Endnote="endnote",s.SimpleField="simpleField",s.ComplexField="complexField",s.Instruction="instruction",s.VmlPicture="vmlPicture",s.MmlMath="mmlMath",s.MmlMathParagraph="mmlMathParagraph",s.MmlFraction="mmlFraction",s.MmlFunction="mmlFunction",s.MmlFunctionName="mmlFunctionName",s.MmlNumerator="mmlNumerator",s.MmlDenominator="mmlDenominator",s.MmlRadical="mmlRadical",s.MmlBase="mmlBase",s.MmlDegree="mmlDegree",s.MmlSuperscript="mmlSuperscript",s.MmlSubscript="mmlSubscript",s.MmlPreSubSuper="mmlPreSubSuper",s.MmlSubArgument="mmlSubArgument",s.MmlSuperArgument="mmlSuperArgument",s.MmlNary="mmlNary",s.MmlDelimiter="mmlDelimiter",s.MmlRun="mmlRun",s.MmlEquationArray="mmlEquationArray",s.MmlLimit="mmlLimit",s.MmlLimitLower="mmlLimitLower",s.MmlMatrix="mmlMatrix",s.MmlMatrixRow="mmlMatrixRow",s.MmlBox="mmlBox",s.MmlBar="mmlBar",s.MmlGroupChar="mmlGroupChar",s.VmlElement="vmlElement",s.Inserted="inserted",s.Deleted="deleted",s.DeletedText="deletedText",s.Comment="comment",s.CommentReference="commentReference",s.CommentRangeStart="commentRangeStart",s.CommentRangeEnd="commentRangeEnd",s.AltChunk="altChunk"})(de||(de={}));class Fn{constructor(){this.children=[],this.cssStyle={}}}class _y extends Fn{constructor(){super(...arguments),this.type=de.Header}}class Sy extends Fn{constructor(){super(...arguments),this.type=de.Footer}}class Ah extends Qt{constructor(a,n,o){super(a,n),this._documentParser=o}parseXml(a){this.rootElement=this.createRootElement(),this.rootElement.children=this._documentParser.parseBodyElements(a)}}class Cy extends Ah{createRootElement(){return new _y}}class Ey extends Ah{createRootElement(){return new Sy}}function Py(s,a){const n={};for(let o of a.elements(s))switch(o.localName){case"Template":n.template=o.textContent;break;case"Pages":n.pages=as(o.textContent);break;case"Words":n.words=as(o.textContent);break;case"Characters":n.characters=as(o.textContent);break;case"Application":n.application=o.textContent;break;case"Lines":n.lines=as(o.textContent);break;case"Paragraphs":n.paragraphs=as(o.textContent);break;case"Company":n.company=o.textContent;break;case"AppVersion":n.appVersion=o.textContent;break}return n}function as(s){if(!(typeof s>"u"))return parseInt(s)}class zy extends Qt{parseXml(a){this.props=Py(a,this._package.xmlParser)}}function Ry(s,a){const n={};for(let o of a.elements(s))switch(o.localName){case"title":n.title=o.textContent;break;case"description":n.description=o.textContent;break;case"subject":n.subject=o.textContent;break;case"creator":n.creator=o.textContent;break;case"keywords":n.keywords=o.textContent;break;case"language":n.language=o.textContent;break;case"lastModifiedBy":n.lastModifiedBy=o.textContent;break;case"revision":o.textContent&&(n.revision=parseInt(o.textContent));break}return n}class Ty extends Qt{parseXml(a){this.props=Ry(a,this._package.xmlParser)}}class Ay{}function Ly(s,a){var n=new Ay,o=a.element(s,"themeElements");for(let l of a.elements(o))switch(l.localName){case"clrScheme":n.colorScheme=Oy(l,a);break;case"fontScheme":n.fontScheme=Iy(l,a);break}return n}function Oy(s,a){var n={name:a.attr(s,"name"),colors:{}};for(let d of a.elements(s)){var o=a.element(d,"srgbClr"),l=a.element(d,"sysClr");o?n.colors[d.localName]=a.attr(o,"val"):l&&(n.colors[d.localName]=a.attr(l,"lastClr"))}return n}function Iy(s,a){var n={name:a.attr(s,"name")};for(let o of a.elements(s))switch(o.localName){case"majorFont":n.majorFont=bf(o,a);break;case"minorFont":n.minorFont=bf(o,a);break}return n}function bf(s,a){return{latinTypeface:a.elementAttr(s,"latin","typeface"),eaTypeface:a.elementAttr(s,"ea","typeface"),csTypeface:a.elementAttr(s,"cs","typeface")}}class Fy extends Qt{constructor(a,n){super(a,n)}parseXml(a){this.theme=Ly(a,this._package.xmlParser)}}class Lh{}class By extends Lh{constructor(){super(...arguments),this.type=de.Footnote}}class Dy extends Lh{constructor(){super(...arguments),this.type=de.Endnote}}class Oh extends Qt{constructor(a,n,o){super(a,n),this._documentParser=o}}class My extends Oh{constructor(a,n,o){super(a,n,o)}parseXml(a){this.notes=this._documentParser.parseNotes(a,"footnote",By)}}class Uy extends Oh{constructor(a,n,o){super(a,n,o)}parseXml(a){this.notes=this._documentParser.parseNotes(a,"endnote",Dy)}}function Wy(s,a){var n={};for(let o of a.elements(s))switch(o.localName){case"defaultTabStop":n.defaultTabStop=a.lengthAttr(o,"val");break;case"footnotePr":n.footnoteProps=yf(o,a);break;case"endnotePr":n.endnoteProps=yf(o,a);break;case"autoHyphenation":n.autoHyphenation=a.boolAttr(o,"val");break}return n}function yf(s,a){var n={defaultNoteIds:[]};for(let o of a.elements(s))switch(o.localName){case"numFmt":n.nummeringFormat=a.attr(o,"val");break;case"footnote":case"endnote":n.defaultNoteIds.push(a.attr(o,"id"));break}return n}class $y extends Qt{constructor(a,n){super(a,n)}parseXml(a){this.settings=Wy(a,this._package.xmlParser)}}function Hy(s,a){return a.elements(s,"property").map(n=>{const o=n.firstChild;return{formatId:a.attr(n,"fmtid"),name:a.attr(n,"name"),type:o.nodeName,value:o.textContent}})}class Vy extends Qt{parseXml(a){this.props=Hy(a,this._package.xmlParser)}}class qy extends Qt{constructor(a,n,o){super(a,n),this._documentParser=o}parseXml(a){this.comments=this._documentParser.parseComments(a),this.commentMap=cn(this.comments,n=>n.id)}}class Gy extends Qt{constructor(a,n){super(a,n),this.comments=[]}parseXml(a){const n=this._package.xmlParser;for(let o of n.elements(a,"commentEx"))this.comments.push({paraId:n.attr(o,"paraId"),paraIdParent:n.attr(o,"paraIdParent"),done:n.boolAttr(o,"done")});this.commentMap=cn(this.comments,o=>o.paraId)}}const Yy=[{type:dt.OfficeDocument,target:"word/document.xml"},{type:dt.ExtendedProperties,target:"docProps/app.xml"},{type:dt.CoreProperties,target:"docProps/core.xml"},{type:dt.CustomProperties,target:"docProps/custom.xml"}];class Uc{constructor(){this.parts=[],this.partsMap={}}static async load(a,n,o){var l=new Uc;return l._options=o,l._parser=n,l._package=await Dc.load(a,o),l.rels=await l._package.loadRelationships(),await Promise.all(Yy.map(d=>{const u=l.rels.find(f=>f.type===d.type)??d;return l.loadRelationshipPart(u.target,u.type)})),l}save(a="blob"){return this._package.save(a)}async loadRelationshipPart(a,n){var l;if(this.partsMap[a])return this.partsMap[a];if(!this._package.get(a))return null;let o=null;switch(n){case dt.OfficeDocument:this.documentPart=o=new dy(this._package,a,this._parser);break;case dt.FontTable:this.fontTablePart=o=new ly(this._package,a);break;case dt.Numbering:this.numberingPart=o=new ky(this._package,a,this._parser);break;case dt.Styles:this.stylesPart=o=new Ny(this._package,a,this._parser);break;case dt.Theme:this.themePart=o=new Fy(this._package,a);break;case dt.Footnotes:this.footnotesPart=o=new My(this._package,a,this._parser);break;case dt.Endnotes:this.endnotesPart=o=new Uy(this._package,a,this._parser);break;case dt.Footer:o=new Ey(this._package,a,this._parser);break;case dt.Header:o=new Cy(this._package,a,this._parser);break;case dt.CoreProperties:this.corePropsPart=o=new Ty(this._package,a);break;case dt.ExtendedProperties:this.extendedPropsPart=o=new zy(this._package,a);break;case dt.CustomProperties:o=new Vy(this._package,a);break;case dt.Settings:this.settingsPart=o=new $y(this._package,a);break;case dt.Comments:this.commentsPart=o=new qy(this._package,a,this._parser);break;case dt.CommentsExtended:this.commentsExtendedPart=o=new Gy(this._package,a);break}if(o==null)return Promise.resolve(null);if(this.partsMap[a]=o,this.parts.push(o),await o.load(),((l=o.rels)==null?void 0:l.length)>0){const[d]=Ui(o.path);await Promise.all(o.rels.map(u=>this.loadRelationshipPart(ac(u.target,d),u.type)))}return o}async loadDocumentImage(a,n){const o=await this.loadResource(n??this.documentPart,a,"blob");return this.blobToURL(o)}async loadNumberingImage(a){const n=await this.loadResource(this.numberingPart,a,"blob");return this.blobToURL(n)}async loadFont(a,n){const o=await this.loadResource(this.fontTablePart,a,"uint8array");return o&&this.blobToURL(new Blob([Xy(o,n)]))}async loadAltChunk(a,n){return await this.loadResource(n??this.documentPart,a,"string")}blobToURL(a){return a?this._options.useBase64URL?Kb(a):URL.createObjectURL(a):null}findPartByRelId(a,n=null){var o=(n.rels??this.rels).find(d=>d.id==a);const l=n?Ui(n.path)[0]:"";return o?this.partsMap[ac(o.target,l)]:null}getPathById(a,n){const o=a.rels.find(d=>d.id==n),[l]=Ui(a.path);return o?ac(o.target,l):null}loadResource(a,n,o){const l=this.getPathById(a,n);return l?this._package.load(l,o):Promise.resolve(null)}}function Xy(s,a){const o=a.replace(/{|}|-/g,""),l=new Array(16);for(let d=0;d<16;d++)l[16-d-1]=parseInt(o.substring(d*2,d*2+2),16);for(let d=0;d<32;d++)s[d]=s[d]^l[d%16];return s}function Ky(s,a){return{type:de.BookmarkStart,id:a.attr(s,"id"),name:a.attr(s,"name"),colFirst:a.intAttr(s,"colFirst"),colLast:a.intAttr(s,"colLast")}}function Zy(s,a){return{type:de.BookmarkEnd,id:a.attr(s,"id")}}class Qy extends Fn{constructor(){super(...arguments),this.type=de.VmlElement,this.attrs={}}}function Ih(s,a){var n=new Qy;switch(s.localName){case"rect":n.tagName="rect",Object.assign(n.attrs,{width:"100%",height:"100%"});break;case"oval":n.tagName="ellipse",Object.assign(n.attrs,{cx:"50%",cy:"50%",rx:"50%",ry:"50%"});break;case"line":n.tagName="line";break;case"shape":n.tagName="g";break;case"textbox":n.tagName="foreignObject",Object.assign(n.attrs,{width:"100%",height:"100%"});break;default:return null}for(const o of V.attrs(s))switch(o.localName){case"style":n.cssStyleText=o.value;break;case"fillcolor":n.attrs.fill=o.value;break;case"from":const[l,d]=wf(o.value);Object.assign(n.attrs,{x1:l,y1:d});break;case"to":const[u,f]=wf(o.value);Object.assign(n.attrs,{x2:u,y2:f});break}for(const o of V.elements(s))switch(o.localName){case"stroke":Object.assign(n.attrs,Jy(o));break;case"fill":Object.assign(n.attrs,e1());break;case"imagedata":n.tagName="image",Object.assign(n.attrs,{width:"100%",height:"100%"}),n.imageHref={id:V.attr(o,"id"),title:V.attr(o,"title")};break;case"txbxContent":n.children.push(...a.parseBodyElements(o));break;default:const l=Ih(o,a);l&&n.children.push(l);break}return n}function Jy(s){return{stroke:V.attr(s,"color"),"stroke-width":V.lengthAttr(s,"weight",pt.Emu)??"1px"}}function e1(s){return{}}function wf(s){return s.split(",")}class t1 extends Fn{constructor(){super(...arguments),this.type=de.Comment}}class r1 extends Fn{constructor(a){super(),this.id=a,this.type=de.CommentReference}}class n1 extends Fn{constructor(a){super(),this.id=a,this.type=de.CommentRangeStart}}class a1 extends Fn{constructor(a){super(),this.id=a,this.type=de.CommentRangeEnd}}var Wi={shd:"inherit",color:"black",borderColor:"black",highlight:"transparent"};const s1=[],jf={oMath:de.MmlMath,oMathPara:de.MmlMathParagraph,f:de.MmlFraction,func:de.MmlFunction,fName:de.MmlFunctionName,num:de.MmlNumerator,den:de.MmlDenominator,rad:de.MmlRadical,deg:de.MmlDegree,e:de.MmlBase,sSup:de.MmlSuperscript,sSub:de.MmlSubscript,sPre:de.MmlPreSubSuper,sup:de.MmlSuperArgument,sub:de.MmlSubArgument,d:de.MmlDelimiter,nary:de.MmlNary,eqArr:de.MmlEquationArray,lim:de.MmlLimit,limLow:de.MmlLimitLower,m:de.MmlMatrix,mr:de.MmlMatrixRow,box:de.MmlBox,bar:de.MmlBar,groupChr:de.MmlGroupChar};class i1{constructor(a){this.options={ignoreWidth:!1,debug:!1,...a}}parseNotes(a,n,o){var l=[];for(let d of V.elements(a,n)){const u=new o;u.id=V.attr(d,"id"),u.noteType=V.attr(d,"type"),u.children=this.parseBodyElements(d),l.push(u)}return l}parseComments(a){var n=[];for(let o of V.elements(a,"comment")){const l=new t1;l.id=V.attr(o,"id"),l.author=V.attr(o,"author"),l.initials=V.attr(o,"initials"),l.date=V.attr(o,"date"),l.children=this.parseBodyElements(o),n.push(l)}return n}parseDocumentFile(a){var n=V.element(a,"body"),o=V.element(a,"background"),l=V.element(n,"sectPr");return{type:de.Document,children:this.parseBodyElements(n),props:l?Ph(l,V):{},cssStyle:o?this.parseBackground(o):{}}}parseBackground(a){var n={},o=oa.colorAttr(a,"color");return o&&(n["background-color"]=o),n}parseBodyElements(a){var n=[];for(const o of V.elements(a))switch(o.localName){case"p":n.push(this.parseParagraph(o));break;case"altChunk":n.push(this.parseAltChunk(o));break;case"tbl":n.push(this.parseTable(o));break;case"sdt":n.push(...this.parseSdt(o,l=>this.parseBodyElements(l)));break}return n}parseStylesFile(a){var n=[];for(const o of V.elements(a))switch(o.localName){case"style":n.push(this.parseStyle(o));break;case"docDefaults":n.push(this.parseDefaultStyles(o));break}return n}parseDefaultStyles(a){var n={id:null,name:null,target:null,basedOn:null,styles:[]};for(const d of V.elements(a))switch(d.localName){case"rPrDefault":var o=V.element(d,"rPr");o&&n.styles.push({target:"span",values:this.parseDefaultProperties(o,{})});break;case"pPrDefault":var l=V.element(d,"pPr");l&&n.styles.push({target:"p",values:this.parseDefaultProperties(l,{})});break}return n}parseStyle(a){var n={id:V.attr(a,"styleId"),isDefault:V.boolAttr(a,"default"),name:null,target:null,basedOn:null,styles:[],linked:null};switch(V.attr(a,"type")){case"paragraph":n.target="p";break;case"table":n.target="table";break;case"character":n.target="span";break}for(const o of V.elements(a))switch(o.localName){case"basedOn":n.basedOn=V.attr(o,"val");break;case"name":n.name=V.attr(o,"val");break;case"link":n.linked=V.attr(o,"val");break;case"next":n.next=V.attr(o,"val");break;case"aliases":n.aliases=V.attr(o,"val").split(",");break;case"pPr":n.styles.push({target:"p",values:this.parseDefaultProperties(o,{})}),n.paragraphProps=zh(o,V);break;case"rPr":n.styles.push({target:"span",values:this.parseDefaultProperties(o,{})}),n.runProps=Mc(o,V);break;case"tblPr":case"tcPr":n.styles.push({target:"td",values:this.parseDefaultProperties(o,{})});break;case"tblStylePr":for(let l of this.parseTableStyle(o))n.styles.push(l);break;case"rsid":case"qFormat":case"hidden":case"semiHidden":case"unhideWhenUsed":case"autoRedefine":case"uiPriority":break;default:this.options.debug&&console.warn(`DOCX: Unknown style element: ${o.localName}`)}return n}parseTableStyle(a){var n=[],o=V.attr(a,"type"),l="",d="";switch(o){case"firstRow":d=".first-row",l="tr.first-row td";break;case"lastRow":d=".last-row",l="tr.last-row td";break;case"firstCol":d=".first-col",l="td.first-col";break;case"lastCol":d=".last-col",l="td.last-col";break;case"band1Vert":d=":not(.no-vband)",l="td.odd-col";break;case"band2Vert":d=":not(.no-vband)",l="td.even-col";break;case"band1Horz":d=":not(.no-hband)",l="tr.odd-row";break;case"band2Horz":d=":not(.no-hband)",l="tr.even-row";break;default:return[]}for(const u of V.elements(a))switch(u.localName){case"pPr":n.push({target:`${l} p`,mod:d,values:this.parseDefaultProperties(u,{})});break;case"rPr":n.push({target:`${l} span`,mod:d,values:this.parseDefaultProperties(u,{})});break;case"tblPr":case"tcPr":n.push({target:l,mod:d,values:this.parseDefaultProperties(u,{})});break}return n}parseNumberingFile(a){var n=[],o={},l=[];for(const f of V.elements(a))switch(f.localName){case"abstractNum":this.parseAbstractNumbering(f,l).forEach(h=>n.push(h));break;case"numPicBullet":l.push(this.parseNumberingPicBullet(f));break;case"num":var d=V.attr(f,"numId"),u=V.elementAttr(f,"abstractNumId","val");o[u]=d;break}return n.forEach(f=>f.id=o[f.id]),n}parseNumberingPicBullet(a){var n=V.element(a,"pict"),o=n&&V.element(n,"shape"),l=o&&V.element(o,"imagedata");return l?{id:V.intAttr(a,"numPicBulletId"),src:V.attr(l,"id"),style:V.attr(o,"style")}:null}parseAbstractNumbering(a,n){var o=[],l=V.attr(a,"abstractNumId");for(const d of V.elements(a))switch(d.localName){case"lvl":o.push(this.parseNumberingLevel(l,d,n));break}return o}parseNumberingLevel(a,n,o){var l={id:a,level:V.intAttr(n,"ilvl"),start:1,pStyleName:void 0,pStyle:{},rStyle:{},suff:"tab"};for(const u of V.elements(n))switch(u.localName){case"start":l.start=V.intAttr(u,"val");break;case"pPr":this.parseDefaultProperties(u,l.pStyle);break;case"rPr":this.parseDefaultProperties(u,l.rStyle);break;case"lvlPicBulletId":var d=V.intAttr(u,"val");l.bullet=o.find(f=>(f==null?void 0:f.id)==d);break;case"lvlText":l.levelText=V.attr(u,"val");break;case"pStyle":l.pStyleName=V.attr(u,"val");break;case"numFmt":l.format=V.attr(u,"val");break;case"suff":l.suff=V.attr(u,"val");break}return l}parseSdt(a,n){const o=V.element(a,"sdtContent");return o?n(o):[]}parseInserted(a,n){var o;return{type:de.Inserted,children:((o=n(a))==null?void 0:o.children)??[]}}parseDeleted(a,n){var o;return{type:de.Deleted,children:((o=n(a))==null?void 0:o.children)??[]}}parseAltChunk(a){return{type:de.AltChunk,children:[],id:V.attr(a,"id")}}parseParagraph(a){var n={type:de.Paragraph,children:[]};for(let o of V.elements(a))switch(o.localName){case"pPr":this.parseParagraphProperties(o,n);break;case"r":n.children.push(this.parseRun(o,n));break;case"hyperlink":n.children.push(this.parseHyperlink(o,n));break;case"smartTag":n.children.push(this.parseSmartTag(o,n));break;case"bookmarkStart":n.children.push(Ky(o,V));break;case"bookmarkEnd":n.children.push(Zy(o,V));break;case"commentRangeStart":n.children.push(new n1(V.attr(o,"id")));break;case"commentRangeEnd":n.children.push(new a1(V.attr(o,"id")));break;case"oMath":case"oMathPara":n.children.push(this.parseMathElement(o));break;case"sdt":n.children.push(...this.parseSdt(o,l=>this.parseParagraph(l).children));break;case"ins":n.children.push(this.parseInserted(o,l=>this.parseParagraph(l)));break;case"del":n.children.push(this.parseDeleted(o,l=>this.parseParagraph(l)));break}return n}parseParagraphProperties(a,n){this.parseDefaultProperties(a,n.cssStyle={},null,o=>{if(Rh(o,n,V))return!0;switch(o.localName){case"pStyle":n.styleName=V.attr(o,"val");break;case"cnfStyle":n.className=Ke.classNameOfCnfStyle(o);break;case"framePr":this.parseFrame(o,n);break;case"rPr":break;default:return!1}return!0})}parseFrame(a,n){var o=V.attr(a,"dropCap");o=="drop"&&(n.cssStyle.float="left")}parseHyperlink(a,n){var o={type:de.Hyperlink,parent:n,children:[]};o.anchor=V.attr(a,"anchor"),o.id=V.attr(a,"id");for(const l of V.elements(a))switch(l.localName){case"r":o.children.push(this.parseRun(l,o));break}return o}parseSmartTag(a,n){var o={type:de.SmartTag,parent:n,children:[]},l=V.attr(a,"uri"),d=V.attr(a,"element");l&&(o.uri=l),d&&(o.element=d);for(const u of V.elements(a))switch(u.localName){case"r":o.children.push(this.parseRun(u,o));break}return o}parseRun(a,n){var o={type:de.Run,parent:n,children:[]};for(let l of V.elements(a))switch(l=this.checkAlternateContent(l),l.localName){case"t":o.children.push({type:de.Text,text:l.textContent});break;case"delText":o.children.push({type:de.DeletedText,text:l.textContent});break;case"commentReference":o.children.push(new r1(V.attr(l,"id")));break;case"fldSimple":o.children.push({type:de.SimpleField,instruction:V.attr(l,"instr"),lock:V.boolAttr(l,"lock",!1),dirty:V.boolAttr(l,"dirty",!1)});break;case"instrText":o.fieldRun=!0,o.children.push({type:de.Instruction,text:l.textContent});break;case"fldChar":o.fieldRun=!0,o.children.push({type:de.ComplexField,charType:V.attr(l,"fldCharType"),lock:V.boolAttr(l,"lock",!1),dirty:V.boolAttr(l,"dirty",!1)});break;case"noBreakHyphen":o.children.push({type:de.NoBreakHyphen});break;case"br":o.children.push({type:de.Break,break:V.attr(l,"type")||"textWrapping"});break;case"lastRenderedPageBreak":o.children.push({type:de.Break,break:"lastRenderedPageBreak"});break;case"sym":o.children.push({type:de.Symbol,font:wc(V.attr(l,"font")),char:V.attr(l,"char")});break;case"tab":o.children.push({type:de.Tab});break;case"footnoteReference":o.children.push({type:de.FootnoteReference,id:V.attr(l,"id")});break;case"endnoteReference":o.children.push({type:de.EndnoteReference,id:V.attr(l,"id")});break;case"drawing":let d=this.parseDrawing(l);d&&(o.children=[d]);break;case"pict":o.children.push(this.parseVmlPicture(l));break;case"rPr":this.parseRunProperties(l,o);break}return o}parseMathElement(a){const n=`${a.localName}Pr`,o={type:jf[a.localName],children:[]};for(const d of V.elements(a))if(jf[d.localName])o.children.push(this.parseMathElement(d));else if(d.localName=="r"){var l=this.parseRun(d);l.type=de.MmlRun,o.children.push(l)}else d.localName==n&&(o.props=this.parseMathProperies(d));return o}parseMathProperies(a){const n={};for(const o of V.elements(a))switch(o.localName){case"chr":n.char=V.attr(o,"val");break;case"vertJc":n.verticalJustification=V.attr(o,"val");break;case"pos":n.position=V.attr(o,"val");break;case"degHide":n.hideDegree=V.boolAttr(o,"val");break;case"begChr":n.beginChar=V.attr(o,"val");break;case"endChr":n.endChar=V.attr(o,"val");break}return n}parseRunProperties(a,n){this.parseDefaultProperties(a,n.cssStyle={},null,o=>{switch(o.localName){case"rStyle":n.styleName=V.attr(o,"val");break;case"vertAlign":n.verticalAlign=Ke.valueOfVertAlign(o,!0);break;default:return!1}return!0})}parseVmlPicture(a){const n={type:de.VmlPicture,children:[]};for(const o of V.elements(a)){const l=Ih(o,this);l&&n.children.push(l)}return n}checkAlternateContent(a){var d;if(a.localName!="AlternateContent")return a;var n=V.element(a,"Choice");if(n){var o=V.attr(n,"Requires"),l=a.lookupNamespaceURI(o);if(s1.includes(l))return n.firstElementChild}return(d=V.element(a,"Fallback"))==null?void 0:d.firstElementChild}parseDrawing(a){for(var n of V.elements(a))switch(n.localName){case"inline":case"anchor":return this.parseDrawingWrapper(n)}}parseDrawingWrapper(a){var n={type:de.Drawing,children:[],cssStyle:{}},o=a.localName=="anchor";let l=null,d=V.boolAttr(a,"simplePos");V.boolAttr(a,"behindDoc");let u={relative:"page",align:"left",offset:"0"},f={relative:"page",align:"top",offset:"0"};for(var h of V.elements(a))switch(h.localName){case"simplePos":d&&(u.offset=V.lengthAttr(h,"x",pt.Emu),f.offset=V.lengthAttr(h,"y",pt.Emu));break;case"extent":n.cssStyle.width=V.lengthAttr(h,"cx",pt.Emu),n.cssStyle.height=V.lengthAttr(h,"cy",pt.Emu);break;case"positionH":case"positionV":if(!d){let S=h.localName=="positionH"?u:f;var b=V.element(h,"align"),g=V.element(h,"posOffset");S.relative=V.attr(h,"relativeFrom")??S.relative,b&&(S.align=b.textContent),g&&(S.offset=Sh(g.textContent,pt.Emu))}break;case"wrapTopAndBottom":l="wrapTopAndBottom";break;case"wrapNone":l="wrapNone";break;case"graphic":var j=this.parseGraphic(h);j&&n.children.push(j);break}return l=="wrapTopAndBottom"?(n.cssStyle.display="block",u.align&&(n.cssStyle["text-align"]=u.align,n.cssStyle.width="100%")):l=="wrapNone"?(n.cssStyle.display="block",n.cssStyle.position="relative",n.cssStyle.width="0px",n.cssStyle.height="0px",u.offset&&(n.cssStyle.left=u.offset),f.offset&&(n.cssStyle.top=f.offset)):o&&(u.align=="left"||u.align=="right")&&(n.cssStyle.float=u.align),n}parseGraphic(a){var n=V.element(a,"graphicData");for(let o of V.elements(n))switch(o.localName){case"pic":return this.parsePicture(o)}return null}parsePicture(a){var n={type:de.Image,src:"",cssStyle:{}},o=V.element(a,"blipFill"),l=V.element(o,"blip"),d=V.element(o,"srcRect");n.src=V.attr(l,"embed"),d&&(n.srcRect=[V.intAttr(d,"l",0)/1e5,V.intAttr(d,"t",0)/1e5,V.intAttr(d,"r",0)/1e5,V.intAttr(d,"b",0)/1e5]);var u=V.element(a,"spPr"),f=V.element(u,"xfrm");if(n.cssStyle.position="relative",f){n.rotation=V.intAttr(f,"rot",0)/6e4;for(var h of V.elements(f))switch(h.localName){case"ext":n.cssStyle.width=V.lengthAttr(h,"cx",pt.Emu),n.cssStyle.height=V.lengthAttr(h,"cy",pt.Emu);break;case"off":n.cssStyle.left=V.lengthAttr(h,"x",pt.Emu),n.cssStyle.top=V.lengthAttr(h,"y",pt.Emu);break}}return n}parseTable(a){var n={type:de.Table,children:[]};for(const o of V.elements(a))switch(o.localName){case"tr":n.children.push(this.parseTableRow(o));break;case"tblGrid":n.columns=this.parseTableColumns(o);break;case"tblPr":this.parseTableProperties(o,n);break}return n}parseTableColumns(a){var n=[];for(const o of V.elements(a))switch(o.localName){case"gridCol":n.push({width:V.lengthAttr(o,"w")});break}return n}parseTableProperties(a,n){switch(n.cssStyle={},n.cellStyle={},this.parseDefaultProperties(a,n.cssStyle,n.cellStyle,o=>{switch(o.localName){case"tblStyle":n.styleName=V.attr(o,"val");break;case"tblLook":n.className=Ke.classNameOftblLook(o);break;case"tblpPr":this.parseTablePosition(o,n);break;case"tblStyleColBandSize":n.colBandSize=V.intAttr(o,"val");break;case"tblStyleRowBandSize":n.rowBandSize=V.intAttr(o,"val");break;case"hidden":n.cssStyle.display="none";break;default:return!1}return!0}),n.cssStyle["text-align"]){case"center":delete n.cssStyle["text-align"],n.cssStyle["margin-left"]="auto",n.cssStyle["margin-right"]="auto";break;case"right":delete n.cssStyle["text-align"],n.cssStyle["margin-left"]="auto";break}}parseTablePosition(a,n){var o=V.lengthAttr(a,"topFromText"),l=V.lengthAttr(a,"bottomFromText"),d=V.lengthAttr(a,"rightFromText"),u=V.lengthAttr(a,"leftFromText");n.cssStyle.float="left",n.cssStyle["margin-bottom"]=Ke.addSize(n.cssStyle["margin-bottom"],l),n.cssStyle["margin-left"]=Ke.addSize(n.cssStyle["margin-left"],u),n.cssStyle["margin-right"]=Ke.addSize(n.cssStyle["margin-right"],d),n.cssStyle["margin-top"]=Ke.addSize(n.cssStyle["margin-top"],o)}parseTableRow(a){var n={type:de.Row,children:[]};for(const o of V.elements(a))switch(o.localName){case"tc":n.children.push(this.parseTableCell(o));break;case"trPr":case"tblPrEx":this.parseTableRowProperties(o,n);break}return n}parseTableRowProperties(a,n){n.cssStyle=this.parseDefaultProperties(a,{},null,o=>{switch(o.localName){case"cnfStyle":n.className=Ke.classNameOfCnfStyle(o);break;case"tblHeader":n.isHeader=V.boolAttr(o,"val");break;case"gridBefore":n.gridBefore=V.intAttr(o,"val");break;case"gridAfter":n.gridAfter=V.intAttr(o,"val");break;default:return!1}return!0})}parseTableCell(a){var n={type:de.Cell,children:[]};for(const o of V.elements(a))switch(o.localName){case"tbl":n.children.push(this.parseTable(o));break;case"p":n.children.push(this.parseParagraph(o));break;case"tcPr":this.parseTableCellProperties(o,n);break}return n}parseTableCellProperties(a,n){n.cssStyle=this.parseDefaultProperties(a,{},null,o=>{switch(o.localName){case"gridSpan":n.span=V.intAttr(o,"val",null);break;case"vMerge":n.verticalMerge=V.attr(o,"val")??"continue";break;case"cnfStyle":n.className=Ke.classNameOfCnfStyle(o);break;default:return!1}return!0}),this.parseTableCellVerticalText(a,n)}parseTableCellVerticalText(a,n){const o={btLr:{writingMode:"vertical-rl",transform:"rotate(180deg)"},lrTb:{writingMode:"vertical-lr",transform:"none"},tbRl:{writingMode:"vertical-rl",transform:"none"}};for(const l of V.elements(a))if(l.localName==="textDirection"){const d=V.attr(l,"val"),u=o[d]||{writingMode:"horizontal-tb"};n.cssStyle["writing-mode"]=u.writingMode,n.cssStyle.transform=u.transform}}parseDefaultProperties(a,n=null,o=null,l=null){n=n||{};for(const d of V.elements(a))if(!(l!=null&&l(d)))switch(d.localName){case"jc":n["text-align"]=Ke.valueOfJc(d);break;case"textAlignment":n["vertical-align"]=Ke.valueOfTextAlignment(d);break;case"color":n.color=oa.colorAttr(d,"val",null,Wi.color);break;case"sz":n["font-size"]=n["min-height"]=V.lengthAttr(d,"val",pt.FontSize);break;case"shd":n["background-color"]=oa.colorAttr(d,"fill",null,Wi.shd);break;case"highlight":n["background-color"]=oa.colorAttr(d,"val",null,Wi.highlight);break;case"vertAlign":break;case"position":n.verticalAlign=V.lengthAttr(d,"val",pt.FontSize);break;case"tcW":if(this.options.ignoreWidth)break;case"tblW":n.width=Ke.valueOfSize(d,"w");break;case"trHeight":this.parseTrHeight(d,n);break;case"strike":n["text-decoration"]=V.boolAttr(d,"val",!0)?"line-through":"none";break;case"b":n["font-weight"]=V.boolAttr(d,"val",!0)?"bold":"normal";break;case"i":n["font-style"]=V.boolAttr(d,"val",!0)?"italic":"normal";break;case"caps":n["text-transform"]=V.boolAttr(d,"val",!0)?"uppercase":"none";break;case"smallCaps":n["font-variant"]=V.boolAttr(d,"val",!0)?"small-caps":"none";break;case"u":this.parseUnderline(d,n);break;case"ind":case"tblInd":this.parseIndentation(d,n);break;case"rFonts":this.parseFont(d,n);break;case"tblBorders":this.parseBorderProperties(d,o||n);break;case"tblCellSpacing":n["border-spacing"]=Ke.valueOfMargin(d),n["border-collapse"]="separate";break;case"pBdr":this.parseBorderProperties(d,n);break;case"bdr":n.border=Ke.valueOfBorder(d);break;case"tcBorders":this.parseBorderProperties(d,n);break;case"vanish":V.boolAttr(d,"val",!0)&&(n.display="none");break;case"kern":break;case"noWrap":break;case"tblCellMar":case"tcMar":this.parseMarginProperties(d,o||n);break;case"tblLayout":n["table-layout"]=Ke.valueOfTblLayout(d);break;case"vAlign":n["vertical-align"]=Ke.valueOfTextAlignment(d);break;case"spacing":a.localName=="pPr"&&this.parseSpacing(d,n);break;case"wordWrap":V.boolAttr(d,"val")&&(n["overflow-wrap"]="break-word");break;case"suppressAutoHyphens":n.hyphens=V.boolAttr(d,"val",!0)?"none":"auto";break;case"lang":n.$lang=V.attr(d,"val");break;case"rtl":case"bidi":V.boolAttr(d,"val",!0)&&(n.direction="rtl");break;case"bCs":case"iCs":case"szCs":case"tabs":case"outlineLvl":case"contextualSpacing":case"tblStyleColBandSize":case"tblStyleRowBandSize":case"webHidden":case"pageBreakBefore":case"suppressLineNumbers":case"keepLines":case"keepNext":case"widowControl":case"bidi":case"rtl":case"noProof":break;default:this.options.debug&&console.warn(`DOCX: Unknown document element: ${a.localName}.${d.localName}`);break}return n}parseUnderline(a,n){var o=V.attr(a,"val");if(o!=null){switch(o){case"dash":case"dashDotDotHeavy":case"dashDotHeavy":case"dashedHeavy":case"dashLong":case"dashLongHeavy":case"dotDash":case"dotDotDash":n["text-decoration"]="underline dashed";break;case"dotted":case"dottedHeavy":n["text-decoration"]="underline dotted";break;case"double":n["text-decoration"]="underline double";break;case"single":case"thick":n["text-decoration"]="underline";break;case"wave":case"wavyDouble":case"wavyHeavy":n["text-decoration"]="underline wavy";break;case"words":n["text-decoration"]="underline";break;case"none":n["text-decoration"]="none";break}var l=oa.colorAttr(a,"color");l&&(n["text-decoration-color"]=l)}}parseFont(a,n){var o=V.attr(a,"ascii"),l=Ke.themeValue(a,"asciiTheme"),d=V.attr(a,"eastAsia"),u=[o,l,d].filter(f=>f).map(f=>wc(f));u.length>0&&(n["font-family"]=[...new Set(u)].join(", "))}parseIndentation(a,n){var o=V.lengthAttr(a,"firstLine"),l=V.lengthAttr(a,"hanging"),d=V.lengthAttr(a,"left"),u=V.lengthAttr(a,"start"),f=V.lengthAttr(a,"right"),h=V.lengthAttr(a,"end");o&&(n["text-indent"]=o),l&&(n["text-indent"]=`-${l}`),(d||u)&&(n["margin-inline-start"]=d||u),(f||h)&&(n["margin-inline-end"]=f||h)}parseSpacing(a,n){var o=V.lengthAttr(a,"before"),l=V.lengthAttr(a,"after"),d=V.intAttr(a,"line",null),u=V.attr(a,"lineRule");if(o&&(n["margin-top"]=o),l&&(n["margin-bottom"]=l),d!==null)switch(u){case"auto":n["line-height"]=`${(d/240).toFixed(2)}`;break;case"atLeast":n["line-height"]=`calc(100% + ${d/20}pt)`;break;default:n["line-height"]=n["min-height"]=`${d/20}pt`;break}}parseMarginProperties(a,n){for(const o of V.elements(a))switch(o.localName){case"left":n["padding-left"]=Ke.valueOfMargin(o);break;case"right":n["padding-right"]=Ke.valueOfMargin(o);break;case"top":n["padding-top"]=Ke.valueOfMargin(o);break;case"bottom":n["padding-bottom"]=Ke.valueOfMargin(o);break}}parseTrHeight(a,n){switch(V.attr(a,"hRule")){case"exact":n.height=V.lengthAttr(a,"val");break;case"atLeast":default:n.height=V.lengthAttr(a,"val");break}}parseBorderProperties(a,n){for(const o of V.elements(a))switch(o.localName){case"start":case"left":n["border-left"]=Ke.valueOfBorder(o);break;case"end":case"right":n["border-right"]=Ke.valueOfBorder(o);break;case"top":n["border-top"]=Ke.valueOfBorder(o);break;case"bottom":n["border-bottom"]=Ke.valueOfBorder(o);break}}}const o1=["black","blue","cyan","darkBlue","darkCyan","darkGray","darkGreen","darkMagenta","darkRed","darkYellow","green","lightGray","magenta","none","red","white","yellow"];class oa{static colorAttr(a,n,o=null,l="black"){var d=V.attr(a,n);if(d)return d=="auto"?l:o1.includes(d)?d:`#${d}`;var u=V.attr(a,"themeColor");return u?`var(--docx-${u}-color)`:o}}class Ke{static themeValue(a,n){var o=V.attr(a,n);return o?`var(--docx-${o}-font)`:null}static valueOfSize(a,n){var o=pt.Dxa;switch(V.attr(a,"type")){case"dxa":break;case"pct":o=pt.Percent;break;case"auto":return"auto"}return V.lengthAttr(a,n,o)}static valueOfMargin(a){return V.lengthAttr(a,"w")}static valueOfBorder(a){var n=Ke.parseBorderType(V.attr(a,"val"));if(n=="none")return"none";var o=oa.colorAttr(a,"color"),l=V.lengthAttr(a,"sz",pt.Border);return`${l} ${n} ${o=="auto"?Wi.borderColor:o}`}static parseBorderType(a){switch(a){case"single":return"solid";case"dashDotStroked":return"solid";case"dashed":return"dashed";case"dashSmallGap":return"dashed";case"dotDash":return"dotted";case"dotDotDash":return"dotted";case"dotted":return"dotted";case"double":return"double";case"doubleWave":return"double";case"inset":return"inset";case"nil":return"none";case"none":return"none";case"outset":return"outset";case"thick":return"solid";case"thickThinLargeGap":return"solid";case"thickThinMediumGap":return"solid";case"thickThinSmallGap":return"solid";case"thinThickLargeGap":return"solid";case"thinThickMediumGap":return"solid";case"thinThickSmallGap":return"solid";case"thinThickThinLargeGap":return"solid";case"thinThickThinMediumGap":return"solid";case"thinThickThinSmallGap":return"solid";case"threeDEmboss":return"solid";case"threeDEngrave":return"solid";case"triple":return"double";case"wave":return"solid"}return"solid"}static valueOfTblLayout(a){var n=V.attr(a,"val");return n=="fixed"?"fixed":"auto"}static classNameOfCnfStyle(a){const n=V.attr(a,"val");return["first-row","last-row","first-col","last-col","odd-col","even-col","odd-row","even-row","ne-cell","nw-cell","se-cell","sw-cell"].filter((l,d)=>n[d]=="1").join(" ")}static valueOfJc(a){var n=V.attr(a,"val");switch(n){case"start":case"left":return"left";case"center":return"center";case"end":case"right":return"right";case"both":return"justify"}return n}static valueOfVertAlign(a,n=!1){var o=V.attr(a,"val");switch(o){case"subscript":return"sub";case"superscript":return n?"sup":"super"}return n?null:o}static valueOfTextAlignment(a){var n=V.attr(a,"val");switch(n){case"auto":case"baseline":return"baseline";case"top":return"top";case"center":return"middle";case"bottom":return"bottom"}return n}static addSize(a,n){return a==null?n:n==null?a:`calc(${a} + ${n})`}static classNameOftblLook(a){const n=V.hexAttr(a,"val",0);let o="";return(V.boolAttr(a,"firstRow")||n&32)&&(o+=" first-row"),(V.boolAttr(a,"lastRow")||n&64)&&(o+=" last-row"),(V.boolAttr(a,"firstColumn")||n&128)&&(o+=" first-col"),(V.boolAttr(a,"lastColumn")||n&256)&&(o+=" last-col"),(V.boolAttr(a,"noHBand")||n&512)&&(o+=" no-hband"),(V.boolAttr(a,"noVBand")||n&1024)&&(o+=" no-vband"),o.trim()}}const kf={pos:0,leader:"none",style:"left"},l1=50;function c1(s=document.body){const a=document.createElement("div");a.style.width="100pt",s.appendChild(a);const n=100/a.offsetWidth;return s.removeChild(a),n}function d1(s,a,n,o=72/96){const l=s.closest("p"),d=s.getBoundingClientRect(),u=l.getBoundingClientRect(),f=getComputedStyle(l),h=(a==null?void 0:a.length)>0?a.map(P=>({pos:Nf(P.position),leader:P.leader,style:P.style})).sort((P,T)=>P.pos-T.pos):[kf],b=h[h.length-1],g=u.width*o,j=Nf(n);let S=b.pos+j;if(S<g)for(;S<g&&h.length<l1;S+=j)h.push({...kf,pos:S});const _=parseFloat(f.marginLeft),w=u.left+_,x=(d.left-w)*o,v=h.find(P=>P.style!="clear"&&P.pos>x);if(v==null)return;let N=1;if(v.style=="right"||v.style=="center"){const P=Array.from(l.querySelectorAll(`.${s.className}`)),T=P.indexOf(s)+1,C=document.createRange();C.setStart(s,1),T<P.length?C.setEndBefore(P[T]):C.setEndAfter(l);const L=v.style=="center"?.5:1,F=C.getBoundingClientRect(),M=F.left+L*F.width-(u.left-_);N=v.pos-M*o}else N=v.pos-x;switch(s.innerHTML="&nbsp;",s.style.textDecoration="inherit",s.style.wordSpacing=`${N.toFixed(0)}pt`,v.leader){case"dot":case"middleDot":s.style.textDecoration="underline",s.style.textDecorationStyle="dotted";break;case"hyphen":case"heavy":case"underscore":s.style.textDecoration="underline";break}}function Nf(s){return parseFloat(s)}const Me={svg:"http://www.w3.org/2000/svg",mathML:"http://www.w3.org/1998/Math/MathML"};class u1{constructor(a){this.htmlDocument=a,this.className="docx",this.styleMap={},this.currentPart=null,this.tableVerticalMerges=[],this.currentVerticalMerge=null,this.tableCellPositions=[],this.currentCellPosition=null,this.footnoteMap={},this.endnoteMap={},this.currentEndnoteIds=[],this.usedHederFooterParts=[],this.currentTabs=[],this.commentMap={},this.tasks=[],this.postRenderTasks=[]}async render(a,n,o=null,l){var u;this.document=a,this.options=l,this.className=l.className,this.rootSelector=l.inWrapper?`.${this.className}-wrapper`:":root",this.styleMap=null,this.tasks=[],this.options.renderComments&&globalThis.Highlight&&(this.commentHighlight=new Highlight),o=o||n,_f(o),_f(n),o.appendChild(this.createComment("docxjs library predefined styles")),o.appendChild(this.renderDefaultStyle()),a.themePart&&(o.appendChild(this.createComment("docxjs document theme values")),this.renderTheme(a.themePart,o)),a.stylesPart!=null&&(this.styleMap=this.processStyles(a.stylesPart.styles),o.appendChild(this.createComment("docxjs document styles")),o.appendChild(this.renderStyles(a.stylesPart.styles))),a.numberingPart&&(this.prodessNumberings(a.numberingPart.domNumberings),o.appendChild(this.createComment("docxjs document numbering styles")),o.appendChild(this.renderNumbering(a.numberingPart.domNumberings,o))),a.footnotesPart&&(this.footnoteMap=cn(a.footnotesPart.notes,f=>f.id)),a.endnotesPart&&(this.endnoteMap=cn(a.endnotesPart.notes,f=>f.id)),a.settingsPart&&(this.defaultTabSize=(u=a.settingsPart.settings)==null?void 0:u.defaultTabStop),!l.ignoreFonts&&a.fontTablePart&&this.renderFontTable(a.fontTablePart,o);var d=this.renderSections(a.documentPart.body);this.options.inWrapper?n.appendChild(this.renderWrapper(d)):ic(n,d),this.commentHighlight&&l.renderComments&&CSS.highlights.set(`${this.className}-comments`,this.commentHighlight),this.postRenderTasks.forEach(f=>f()),await Promise.allSettled(this.tasks),this.refreshTabStops()}renderTheme(a,n){var f,h;const o={},l=(f=a.theme)==null?void 0:f.fontScheme;l&&(l.majorFont&&(o["--docx-majorHAnsi-font"]=l.majorFont.latinTypeface),l.minorFont&&(o["--docx-minorHAnsi-font"]=l.minorFont.latinTypeface));const d=(h=a.theme)==null?void 0:h.colorScheme;if(d)for(let[b,g]of Object.entries(d.colors))o[`--docx-${b}-color`]=`#${g}`;const u=this.styleToString(`.${this.className}`,o);n.appendChild(this.createStyleElement(u))}renderFontTable(a,n){for(let o of a.fonts)for(let l of o.embedFontRefs)this.tasks.push(this.document.loadFont(l.id,l.key).then(d=>{const u={"font-family":wc(o.name),src:`url(${d})`};(l.type=="bold"||l.type=="boldItalic")&&(u["font-weight"]="bold"),(l.type=="italic"||l.type=="boldItalic")&&(u["font-style"]="italic");const f=this.styleToString("@font-face",u);n.appendChild(this.createComment(`docxjs ${o.name} font`)),n.appendChild(this.createStyleElement(f))}))}processStyleName(a){return a?`${this.className}_${Xb(a)}`:this.className}processStyles(a){const n=cn(a.filter(l=>l.id!=null),l=>l.id);for(const l of a.filter(d=>d.basedOn)){var o=n[l.basedOn];if(o){l.paragraphProps=Xi(l.paragraphProps,o.paragraphProps),l.runProps=Xi(l.runProps,o.runProps);for(const d of o.styles){const u=l.styles.find(f=>f.target==d.target);u?this.copyStyleProperties(d.values,u.values):l.styles.push({...d,values:{...d.values}})}}else this.options.debug&&console.warn(`Can't find base style ${l.basedOn}`)}for(let l of a)l.cssName=this.processStyleName(l.id);return n}prodessNumberings(a){var n;for(let o of a.filter(l=>l.pStyleName)){const l=this.findStyle(o.pStyleName);(n=l==null?void 0:l.paragraphProps)!=null&&n.numbering&&(l.paragraphProps.numbering.level=o.level)}}processElement(a){if(a.children)for(var n of a.children)n.parent=a,n.type==de.Table?this.processTable(n):this.processElement(n)}processTable(a){for(var n of a.children)for(var o of n.children)o.cssStyle=this.copyStyleProperties(a.cellStyle,o.cssStyle,["border-left","border-right","border-top","border-bottom","padding-left","padding-right","padding-top","padding-bottom"]),this.processElement(o)}copyStyleProperties(a,n,o=null){if(!a)return n;n==null&&(n={}),o==null&&(o=Object.getOwnPropertyNames(a));for(var l of o)a.hasOwnProperty(l)&&!n.hasOwnProperty(l)&&(n[l]=a[l]);return n}createPageElement(a,n){var o=this.createElement("section",{className:a});return n&&(n.pageMargins&&(o.style.paddingLeft=n.pageMargins.left,o.style.paddingRight=n.pageMargins.right,o.style.paddingTop=n.pageMargins.top,o.style.paddingBottom=n.pageMargins.bottom),n.pageSize&&(this.options.ignoreWidth||(o.style.width=n.pageSize.width),this.options.ignoreHeight||(o.style.minHeight=n.pageSize.height))),o}createSectionContent(a){var n=this.createElement("article");return a.columns&&a.columns.numberOfColumns&&(n.style.columnCount=`${a.columns.numberOfColumns}`,n.style.columnGap=a.columns.space,a.columns.separator&&(n.style.columnRule="1px solid black")),n}renderSections(a){const n=[];this.processElement(a);const o=this.splitBySection(a.children,a.props),l=this.groupByPageBreaks(o);let d=null;for(let f=0,h=l.length;f<h;f++){this.currentFootnoteIds=[];let g=l[f][0].sectProps;const j=this.createPageElement(this.className,g);this.renderStyleValues(a.cssStyle,j),this.options.renderHeaders&&this.renderHeaderFooter(g.headerRefs,g,n.length,d!=g,j);for(const S of l[f]){var u=this.createSectionContent(S.sectProps);this.renderElements(S.elements,u),j.appendChild(u),g=S.sectProps}this.options.renderFootnotes&&this.renderNotes(this.currentFootnoteIds,this.footnoteMap,j),this.options.renderEndnotes&&f==h-1&&this.renderNotes(this.currentEndnoteIds,this.endnoteMap,j),this.options.renderFooters&&this.renderHeaderFooter(g.footerRefs,g,n.length,d!=g,j),n.push(j),d=g}return n}renderHeaderFooter(a,n,o,l,d){if(a){var u=(n.titlePage&&l?a.find(h=>h.type=="first"):null)??(o%2==1?a.find(h=>h.type=="even"):null)??a.find(h=>h.type=="default"),f=u&&this.document.findPartByRelId(u.id,this.document.documentPart);if(f){this.currentPart=f,this.usedHederFooterParts.includes(f.path)||(this.processElement(f.rootElement),this.usedHederFooterParts.push(f.path));const[h]=this.renderElements([f.rootElement],d);n!=null&&n.pageMargins&&(f.rootElement.type===de.Header?(h.style.marginTop=`calc(${n.pageMargins.header} - ${n.pageMargins.top})`,h.style.minHeight=`calc(${n.pageMargins.top} - ${n.pageMargins.header})`):f.rootElement.type===de.Footer&&(h.style.marginBottom=`calc(${n.pageMargins.footer} - ${n.pageMargins.bottom})`,h.style.minHeight=`calc(${n.pageMargins.bottom} - ${n.pageMargins.footer})`)),this.currentPart=null}}}isPageBreakElement(a){return a.type!=de.Break?!1:a.break=="lastRenderedPageBreak"?!this.options.ignoreLastRenderedPageBreak:a.break=="page"}isPageBreakSection(a,n){var o,l,d,u,f,h;return!a||!n?!1:((o=a.pageSize)==null?void 0:o.orientation)!=((l=n.pageSize)==null?void 0:l.orientation)||((d=a.pageSize)==null?void 0:d.width)!=((u=n.pageSize)==null?void 0:u.width)||((f=a.pageSize)==null?void 0:f.height)!=((h=n.pageSize)==null?void 0:h.height)}splitBySection(a,n){var j;var o={sectProps:null,elements:[],pageBreak:!1},l=[o];for(let S of a){if(S.type==de.Paragraph){const _=this.findStyle(S.styleName);(j=_==null?void 0:_.paragraphProps)!=null&&j.pageBreakBefore&&(o.sectProps=d,o.pageBreak=!0,o={sectProps:null,elements:[],pageBreak:!1},l.push(o))}if(o.elements.push(S),S.type==de.Paragraph){const _=S;var d=_.sectionProps,u=-1,f=-1;if(this.options.breakPages&&_.children&&(u=_.children.findIndex(w=>{var x;return f=((x=w.children)==null?void 0:x.findIndex(this.isPageBreakElement.bind(this)))??-1,f!=-1})),(d||u!=-1)&&(o.sectProps=d,o.pageBreak=u!=-1,o={sectProps:null,elements:[],pageBreak:!1},l.push(o)),u!=-1){let w=_.children[u],x=f<w.children.length-1;if(u<_.children.length-1||x){var h=S.children,b={...S,children:h.slice(u)};if(S.children=h.slice(0,u),o.elements.push(b),x){let v=w.children,N={...w,children:v.slice(0,f)};S.children.push(N),w.children=v.slice(f)}}}}}let g=null;for(let S=l.length-1;S>=0;S--)l[S].sectProps==null?l[S].sectProps=g??n:g=l[S].sectProps;return l}groupByPageBreaks(a){let n=[],o;const l=[n];for(let d of a)n.push(d),(this.options.ignoreLastRenderedPageBreak||d.pageBreak||this.isPageBreakSection(o,d.sectProps))&&l.push(n=[]),o=d.sectProps;return l.filter(d=>d.length>0)}renderWrapper(a){return this.createElement("div",{className:`${this.className}-wrapper`},a)}renderDefaultStyle(){var a=this.className,n=`
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
`),this.createStyleElement(o)}renderNumbering(a,n){var o="",l=[];for(var d of a){var u=`p.${this.numberingClass(d.id,d.level)}`,f="none";if(d.bullet){let h=`--${this.className}-${d.bullet.src}`.toLowerCase();o+=this.styleToString(`${u}:before`,{content:"' '",display:"inline-block",background:`var(${h})`},d.bullet.style),this.tasks.push(this.document.loadNumberingImage(d.bullet.src).then(b=>{var g=`${this.rootSelector} { ${h}: url(${b}) }`;n.appendChild(this.createStyleElement(g))}))}else if(d.levelText){let h=this.numberingCounter(d.id,d.level);const b=h+" "+(d.start-1);d.level>0&&(o+=this.styleToString(`p.${this.numberingClass(d.id,d.level-1)}`,{"counter-set":b})),l.push(b),o+=this.styleToString(`${u}:before`,{content:this.levelTextToContent(d.levelText,d.suff,d.id,this.numFormatToCssValue(d.format)),"counter-increment":h,...d.rStyle})}else f=this.numFormatToCssValue(d.format);o+=this.styleToString(u,{display:"list-item","list-style-position":"inside","list-style-type":f,...d.pStyle})}return l.length>0&&(o+=this.styleToString(this.rootSelector,{"counter-reset":l.join(" ")})),this.createStyleElement(o)}renderStyles(a){var n="";const o=this.styleMap,l=cn(a.filter(h=>h.isDefault),h=>h.target);for(const h of a){var d=h.styles;if(h.linked){var u=h.linked&&o[h.linked];u?d=d.concat(u.styles):this.options.debug&&console.warn(`Can't find linked style ${h.linked}`)}for(const b of d){var f=`${h.target??""}.${h.cssName}`;h.target!=b.target&&(f+=` ${b.target}`),l[h.target]==h&&(f=`.${this.className} ${h.target}, `+f),n+=this.styleToString(f,b.values)}}return this.createStyleElement(n)}renderNotes(a,n,o){var l=a.map(u=>n[u]).filter(u=>u);if(l.length>0){var d=this.createElement("ol",null,this.renderElements(l));o.appendChild(d)}}renderElement(a){switch(a.type){case de.Paragraph:return this.renderParagraph(a);case de.BookmarkStart:return this.renderBookmarkStart(a);case de.BookmarkEnd:return null;case de.Run:return this.renderRun(a);case de.Table:return this.renderTable(a);case de.Row:return this.renderTableRow(a);case de.Cell:return this.renderTableCell(a);case de.Hyperlink:return this.renderHyperlink(a);case de.SmartTag:return this.renderSmartTag(a);case de.Drawing:return this.renderDrawing(a);case de.Image:return this.renderImage(a);case de.Text:return this.renderText(a);case de.Text:return this.renderText(a);case de.DeletedText:return this.renderDeletedText(a);case de.Tab:return this.renderTab(a);case de.Symbol:return this.renderSymbol(a);case de.Break:return this.renderBreak(a);case de.Footer:return this.renderContainer(a,"footer");case de.Header:return this.renderContainer(a,"header");case de.Footnote:case de.Endnote:return this.renderContainer(a,"li");case de.FootnoteReference:return this.renderFootnoteReference(a);case de.EndnoteReference:return this.renderEndnoteReference(a);case de.NoBreakHyphen:return this.createElement("wbr");case de.VmlPicture:return this.renderVmlPicture(a);case de.VmlElement:return this.renderVmlElement(a);case de.MmlMath:return this.renderContainerNS(a,Me.mathML,"math",{xmlns:Me.mathML});case de.MmlMathParagraph:return this.renderContainer(a,"span");case de.MmlFraction:return this.renderContainerNS(a,Me.mathML,"mfrac");case de.MmlBase:return this.renderContainerNS(a,Me.mathML,a.parent.type==de.MmlMatrixRow?"mtd":"mrow");case de.MmlNumerator:case de.MmlDenominator:case de.MmlFunction:case de.MmlLimit:case de.MmlBox:return this.renderContainerNS(a,Me.mathML,"mrow");case de.MmlGroupChar:return this.renderMmlGroupChar(a);case de.MmlLimitLower:return this.renderContainerNS(a,Me.mathML,"munder");case de.MmlMatrix:return this.renderContainerNS(a,Me.mathML,"mtable");case de.MmlMatrixRow:return this.renderContainerNS(a,Me.mathML,"mtr");case de.MmlRadical:return this.renderMmlRadical(a);case de.MmlSuperscript:return this.renderContainerNS(a,Me.mathML,"msup");case de.MmlSubscript:return this.renderContainerNS(a,Me.mathML,"msub");case de.MmlDegree:case de.MmlSuperArgument:case de.MmlSubArgument:return this.renderContainerNS(a,Me.mathML,"mn");case de.MmlFunctionName:return this.renderContainerNS(a,Me.mathML,"ms");case de.MmlDelimiter:return this.renderMmlDelimiter(a);case de.MmlRun:return this.renderMmlRun(a);case de.MmlNary:return this.renderMmlNary(a);case de.MmlPreSubSuper:return this.renderMmlPreSubSuper(a);case de.MmlBar:return this.renderMmlBar(a);case de.MmlEquationArray:return this.renderMllList(a);case de.Inserted:return this.renderInserted(a);case de.Deleted:return this.renderDeleted(a);case de.CommentRangeStart:return this.renderCommentRangeStart(a);case de.CommentRangeEnd:return this.renderCommentRangeEnd(a);case de.CommentReference:return this.renderCommentReference(a);case de.AltChunk:return this.renderAltChunk(a)}return null}renderElements(a,n){if(a==null)return null;var o=a.flatMap(l=>this.renderElement(l)).filter(l=>l!=null);return n&&ic(n,o),o}renderContainer(a,n,o){return this.createElement(n,o,this.renderElements(a.children))}renderContainerNS(a,n,o,l){return this.createElementNS(n,o,l,this.renderElements(a.children))}renderParagraph(a){var d,u;var n=this.renderContainer(a,"p");const o=this.findStyle(a.styleName);a.tabs??(a.tabs=(d=o==null?void 0:o.paragraphProps)==null?void 0:d.tabs),this.renderClass(a,n),this.renderStyleValues(a.cssStyle,n),this.renderCommonProperties(n.style,a);const l=a.numbering??((u=o==null?void 0:o.paragraphProps)==null?void 0:u.numbering);return l&&n.classList.add(this.numberingClass(l.id,l.level)),n}renderRunProperties(a,n){this.renderCommonProperties(a,n)}renderCommonProperties(a,n){n!=null&&(n.color&&(a.color=n.color),n.fontSize&&(a["font-size"]=n.fontSize))}renderHyperlink(a){var n=this.renderContainer(a,"a");this.renderStyleValues(a.cssStyle,n);let o="";if(a.id){const l=this.document.documentPart.rels.find(d=>d.id==a.id&&d.targetMode==="External");o=(l==null?void 0:l.target)??o}return a.anchor&&(o+=`#${a.anchor}`),n.href=o,n}renderSmartTag(a){return this.renderContainer(a,"span")}renderCommentRangeStart(a){var l;if(!this.options.renderComments)return null;const n=new Range;(l=this.commentHighlight)==null||l.add(n);const o=this.createComment(`start of comment #${a.id}`);return this.later(()=>n.setStart(o,0)),this.commentMap[a.id]=n,o}renderCommentRangeEnd(a){if(!this.options.renderComments)return null;const n=this.commentMap[a.id],o=this.createComment(`end of comment #${a.id}`);return this.later(()=>n==null?void 0:n.setEnd(o,0)),o}renderCommentReference(a){var u;if(!this.options.renderComments)return null;var n=(u=this.document.commentsPart)==null?void 0:u.commentMap[a.id];if(!n)return null;const o=new DocumentFragment,l=this.createElement("span",{className:`${this.className}-comment-ref`},["💬"]),d=this.createElement("div",{className:`${this.className}-comment-popover`});return this.renderCommentContent(n,d),o.appendChild(this.createComment(`comment #${n.id} by ${n.author} on ${n.date}`)),o.appendChild(l),o.appendChild(d),o}renderAltChunk(a){if(!this.options.renderAltChunks)return null;var n=this.createElement("iframe");return this.tasks.push(this.document.loadAltChunk(a.id,this.currentPart).then(o=>{n.srcdoc=o})),n}renderCommentContent(a,n){n.appendChild(this.createElement("div",{className:`${this.className}-comment-author`},[a.author])),n.appendChild(this.createElement("div",{className:`${this.className}-comment-date`},[new Date(a.date).toLocaleString()])),this.renderElements(a.children,n)}renderDrawing(a){var n=this.renderContainer(a,"div");return n.style.display="inline-block",n.style.position="relative",n.style.textIndent="0px",this.renderStyleValues(a.cssStyle,n),n}renderImage(a){var h;let n=this.createElement("img"),o=(h=a.cssStyle)==null?void 0:h.transform;if(this.renderStyleValues(a.cssStyle,n),a.srcRect&&a.srcRect.some(b=>b!=0)){var[l,d,u,f]=a.srcRect;o=`scale(${1/(1-l-u)}, ${1/(1-d-f)})`,n.style["clip-path"]=`rect(${(100*d).toFixed(2)}% ${(100*(1-u)).toFixed(2)}% ${(100*(1-f)).toFixed(2)}% ${(100*l).toFixed(2)}%)`}return a.rotation&&(o=`rotate(${a.rotation}deg) ${o??""}`),n.style.transform=o==null?void 0:o.trim(),this.document&&this.tasks.push(this.document.loadDocumentImage(a.src,this.currentPart).then(b=>{n.src=b})),n}renderText(a){return this.htmlDocument.createTextNode(a.text)}renderDeletedText(a){return this.options.renderChanges?this.renderText(a):null}renderBreak(a){return a.break=="textWrapping"?this.createElement("br"):null}renderInserted(a){return this.options.renderChanges?this.renderContainer(a,"ins"):this.renderElements(a.children)}renderDeleted(a){return this.options.renderChanges?this.renderContainer(a,"del"):null}renderSymbol(a){var n=this.createElement("span");return n.style.fontFamily=a.font,n.innerHTML=`&#x${a.char};`,n}renderFootnoteReference(a){var n=this.createElement("sup");return this.currentFootnoteIds.push(a.id),n.textContent=`${this.currentFootnoteIds.length}`,n}renderEndnoteReference(a){var n=this.createElement("sup");return this.currentEndnoteIds.push(a.id),n.textContent=`${this.currentEndnoteIds.length}`,n}renderTab(a){var l;var n=this.createElement("span");if(n.innerHTML="&emsp;",this.options.experimental){n.className=this.tabStopClass();var o=(l=p1(a,de.Paragraph))==null?void 0:l.tabs;this.currentTabs.push({stops:o,span:n})}return n}renderBookmarkStart(a){return this.createElement("span",{id:a.name})}renderRun(a){if(a.fieldRun)return null;const n=this.createElement("span");if(a.id&&(n.id=a.id),this.renderClass(a,n),this.renderStyleValues(a.cssStyle,n),a.verticalAlign){const o=this.createElement(a.verticalAlign);this.renderElements(a.children,o),n.appendChild(o)}else this.renderElements(a.children,n);return n}renderTable(a){let n=this.createElement("table");return this.tableCellPositions.push(this.currentCellPosition),this.tableVerticalMerges.push(this.currentVerticalMerge),this.currentVerticalMerge={},this.currentCellPosition={col:0,row:0},a.columns&&n.appendChild(this.renderTableColumns(a.columns)),this.renderClass(a,n),this.renderElements(a.children,n),this.renderStyleValues(a.cssStyle,n),this.currentVerticalMerge=this.tableVerticalMerges.pop(),this.currentCellPosition=this.tableCellPositions.pop(),n}renderTableColumns(a){let n=this.createElement("colgroup");for(let o of a){let l=this.createElement("col");o.width&&(l.style.width=o.width),n.appendChild(l)}return n}renderTableRow(a){let n=this.createElement("tr");return this.currentCellPosition.col=0,a.gridBefore&&n.appendChild(this.renderTableCellPlaceholder(a.gridBefore)),this.renderClass(a,n),this.renderElements(a.children,n),this.renderStyleValues(a.cssStyle,n),a.gridAfter&&n.appendChild(this.renderTableCellPlaceholder(a.gridAfter)),this.currentCellPosition.row++,n}renderTableCellPlaceholder(a){const n=this.createElement("td",{colSpan:a});return n.style.border="none",n}renderTableCell(a){let n=this.renderContainer(a,"td");const o=this.currentCellPosition.col;return a.verticalMerge?a.verticalMerge=="restart"?(this.currentVerticalMerge[o]=n,n.rowSpan=1):this.currentVerticalMerge[o]&&(this.currentVerticalMerge[o].rowSpan+=1,n.style.display="none"):this.currentVerticalMerge[o]=null,this.renderClass(a,n),this.renderStyleValues(a.cssStyle,n),a.span&&(n.colSpan=a.span),this.currentCellPosition.col+=n.colSpan,n}renderVmlPicture(a){return this.renderContainer(a,"div")}renderVmlElement(a){var l,d;var n=this.createSvgElement("svg");n.setAttribute("style",a.cssStyleText);const o=this.renderVmlChildElement(a);return(l=a.imageHref)!=null&&l.id&&this.tasks.push((d=this.document)==null?void 0:d.loadDocumentImage(a.imageHref.id,this.currentPart).then(u=>o.setAttribute("href",u))),n.appendChild(o),requestAnimationFrame(()=>{const u=n.firstElementChild.getBBox();n.setAttribute("width",`${Math.ceil(u.x+u.width)}`),n.setAttribute("height",`${Math.ceil(u.y+u.height)}`)}),n}renderVmlChildElement(a){const n=this.createSvgElement(a.tagName);Object.entries(a.attrs).forEach(([o,l])=>n.setAttribute(o,l));for(let o of a.children)o.type==de.VmlElement?n.appendChild(this.renderVmlChildElement(o)):n.appendChild(...ns(this.renderElement(o)));return n}renderMmlRadical(a){var l;const n=a.children.find(d=>d.type==de.MmlBase);if((l=a.props)!=null&&l.hideDegree)return this.createElementNS(Me.mathML,"msqrt",null,this.renderElements([n]));const o=a.children.find(d=>d.type==de.MmlDegree);return this.createElementNS(Me.mathML,"mroot",null,this.renderElements([n,o]))}renderMmlDelimiter(a){const n=[];return n.push(this.createElementNS(Me.mathML,"mo",null,[a.props.beginChar??"("])),n.push(...this.renderElements(a.children)),n.push(this.createElementNS(Me.mathML,"mo",null,[a.props.endChar??")"])),this.createElementNS(Me.mathML,"mrow",null,n)}renderMmlNary(a){var b;const n=[],o=cn(a.children,g=>g.type),l=o[de.MmlSuperArgument],d=o[de.MmlSubArgument],u=l?this.createElementNS(Me.mathML,"mo",null,ns(this.renderElement(l))):null,f=d?this.createElementNS(Me.mathML,"mo",null,ns(this.renderElement(d))):null,h=this.createElementNS(Me.mathML,"mo",null,[((b=a.props)==null?void 0:b.char)??"∫"]);return u||f?n.push(this.createElementNS(Me.mathML,"munderover",null,[h,f,u])):u?n.push(this.createElementNS(Me.mathML,"mover",null,[h,u])):f?n.push(this.createElementNS(Me.mathML,"munder",null,[h,f])):n.push(h),n.push(...this.renderElements(o[de.MmlBase].children)),this.createElementNS(Me.mathML,"mrow",null,n)}renderMmlPreSubSuper(a){const n=[],o=cn(a.children,b=>b.type),l=o[de.MmlSuperArgument],d=o[de.MmlSubArgument],u=l?this.createElementNS(Me.mathML,"mo",null,ns(this.renderElement(l))):null,f=d?this.createElementNS(Me.mathML,"mo",null,ns(this.renderElement(d))):null,h=this.createElementNS(Me.mathML,"mo",null);return n.push(this.createElementNS(Me.mathML,"msubsup",null,[h,f,u])),n.push(...this.renderElements(o[de.MmlBase].children)),this.createElementNS(Me.mathML,"mrow",null,n)}renderMmlGroupChar(a){const n=a.props.verticalJustification==="bot"?"mover":"munder",o=this.renderContainerNS(a,Me.mathML,n);return a.props.char&&o.appendChild(this.createElementNS(Me.mathML,"mo",null,[a.props.char])),o}renderMmlBar(a){const n=this.renderContainerNS(a,Me.mathML,"mrow");switch(a.props.position){case"top":n.style.textDecoration="overline";break;case"bottom":n.style.textDecoration="underline";break}return n}renderMmlRun(a){const n=this.createElementNS(Me.mathML,"ms",null,this.renderElements(a.children));return this.renderClass(a,n),this.renderStyleValues(a.cssStyle,n),n}renderMllList(a){const n=this.createElementNS(Me.mathML,"mtable");this.renderClass(a,n),this.renderStyleValues(a.cssStyle,n);for(let o of this.renderElements(a.children))n.appendChild(this.createElementNS(Me.mathML,"mtr",null,[this.createElementNS(Me.mathML,"mtd",null,[o])]));return n}renderStyleValues(a,n){for(let o in a)o.startsWith("$")?n.setAttribute(o.slice(1),a[o]):n.style[o]=a[o]}renderClass(a,n){a.className&&(n.className=a.className),a.styleName&&n.classList.add(this.processStyleName(a.styleName))}findStyle(a){var n;return a&&((n=this.styleMap)==null?void 0:n[a])}numberingClass(a,n){return`${this.className}-num-${a}-${n}`}tabStopClass(){return`${this.className}-tab-stop`}styleToString(a,n,o=null){let l=`${a} {\r
`;for(const d in n)d.startsWith("$")||(l+=`  ${d}: ${n[d]};\r
`);return o&&(l+=o),l+`}\r
`}numberingCounter(a,n){return`${this.className}-num-${a}-${n}`}levelTextToContent(a,n,o,l){const d={tab:"\\9",space:"\\a0"};var u=a.replace(/%\d*/g,f=>{let h=parseInt(f.substring(1),10)-1;return`"counter(${this.numberingCounter(o,h)}, ${l})"`});return`"${u}${d[n]??""}"`}numFormatToCssValue(a){var n={none:"none",bullet:"disc",decimal:"decimal",lowerLetter:"lower-alpha",upperLetter:"upper-alpha",lowerRoman:"lower-roman",upperRoman:"upper-roman",decimalZero:"decimal-leading-zero",aiueo:"katakana",aiueoFullWidth:"katakana",chineseCounting:"simp-chinese-informal",chineseCountingThousand:"simp-chinese-informal",chineseLegalSimplified:"simp-chinese-formal",chosung:"hangul-consonant",ideographDigital:"cjk-ideographic",ideographTraditional:"cjk-heavenly-stem",ideographLegalTraditional:"trad-chinese-formal",ideographZodiac:"cjk-earthly-branch",iroha:"katakana-iroha",irohaFullWidth:"katakana-iroha",japaneseCounting:"japanese-informal",japaneseDigitalTenThousand:"cjk-decimal",japaneseLegal:"japanese-formal",thaiNumbers:"thai",koreanCounting:"korean-hangul-formal",koreanDigital:"korean-hangul-formal",koreanDigital2:"korean-hanja-informal",hebrew1:"hebrew",hebrew2:"hebrew",hindiNumbers:"devanagari",ganada:"hangul",taiwaneseCounting:"cjk-ideographic",taiwaneseCountingThousand:"cjk-ideographic",taiwaneseDigital:"cjk-decimal"};return n[a]??a}refreshTabStops(){this.options.experimental&&setTimeout(()=>{const a=c1();for(let n of this.currentTabs)d1(n.span,n.stops,this.defaultTabSize,a)},500)}createElementNS(a,n,o,l){var d=a?this.htmlDocument.createElementNS(a,n):this.htmlDocument.createElement(n);return Object.assign(d,o),l&&ic(d,l),d}createElement(a,n,o){return this.createElementNS(void 0,a,n,o)}createSvgElement(a,n,o){return this.createElementNS(Me.svg,a,n,o)}createStyleElement(a){return this.createElement("style",{innerHTML:a})}createComment(a){return this.htmlDocument.createComment(a)}later(a){this.postRenderTasks.push(a)}}function _f(s){s.innerHTML=""}function ic(s,a){a.forEach(n=>s.appendChild(Zb(n)?document.createTextNode(n):n))}function p1(s,a){for(var n=s.parent;n!=null&&n.type!=a;)n=n.parent;return n}const Fh={ignoreHeight:!1,ignoreWidth:!1,ignoreFonts:!1,breakPages:!0,debug:!1,experimental:!1,className:"docx",inWrapper:!0,hideWrapperOnPrint:!1,trimXmlDeclaration:!0,ignoreLastRenderedPageBreak:!0,renderHeaders:!0,renderFooters:!0,renderFootnotes:!0,renderEndnotes:!0,useBase64URL:!1,renderChanges:!1,renderComments:!1,renderAltChunks:!0};function f1(s,a){const n={...Fh,...a};return Uc.load(s,new i1(n),n)}async function h1(s,a,n,o){const l={...Fh,...o};return await new u1(window.document).render(s,a,n,l)}async function Bh(s,a,n,o){const l=await f1(s,o);return await h1(l,a,n,o),l}const m1=jt.replace("/api",""),g1=({url:s})=>{const a=U.useRef(null),[n,o]=U.useState(!0),[l,d]=U.useState(null);return U.useEffect(()=>{(async()=>{if(!(!s||!a.current))try{o(!0),d(null);const f=await st.get(s,{responseType:"blob",headers:{Authorization:`Bearer ${localStorage.getItem("gs_admin_token")}`}});a.current.innerHTML="",await Bh(f.data,a.current,null,{className:"docx",inWrapper:!0,ignoreWidth:!1,ignoreHeight:!1,ignoreFonts:!1,breakPageToSections:!0,trimXmlDeclaration:!0})}catch(f){console.error("Docx render error:",f),d("Failed to render document. Please download to view.")}finally{o(!1)}})()},[s]),t.jsxs("div",{style:{width:"100%",height:"100%",overflow:"auto",background:"#fff",padding:"20px",display:"flex",flexDirection:"column",alignItems:"center"},children:[n&&t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"15px",padding:"50px"},children:[t.jsx("div",{className:"spinner-p"}),t.jsx("p",{style:{color:"var(--text-muted)",fontWeight:600},children:"Rendering Document..."})]}),l&&t.jsx("div",{style:{color:"var(--crimson)",padding:"20px"},children:l}),t.jsx("div",{ref:a,style:{width:"100%",maxWidth:"800px"}})]})};function x1({admin:s}){var O,Y;const[a]=Gx(),[n,o]=U.useState([]),[l,d]=U.useState([]),[u,f]=U.useState([]),[h,b]=U.useState(!0),[g,j]=U.useState(null),[S,_]=U.useState(!1),[w,x]=U.useState(!1),[v,N]=U.useState(""),[P,T]=U.useState({interview_type:"Online",interview_date:"",interview_time:"",interview_location:""}),[C,L]=U.useState(!1),[F,M]=U.useState([]),[G,H]=U.useState(!1),[pe,te]=U.useState(!1),[A,K]=U.useState(null),[k,se]=U.useState(1),ye=8,[re,W]=U.useState([]),[X,ne]=U.useState(!1),[R,z]=U.useState(!1),[J,ie]=U.useState({vacancy_id:a.get("vacancy_id")||"",company_id:"",overall_experience:"",relevant_experience:"",qualification:"",status:"",search:"",interview_date:"",sortBy:"highExperience"});U.useEffect(()=>{_e()},[]),U.useEffect(()=>{Te(),J.vacancy_id?(oe(),te(!1)):(M([]),te(!1))},[J.vacancy_id,J.company_id,J.overall_experience,J.relevant_experience,J.qualification,J.status,J.interview_date]);const oe=async()=>{try{H(!0);const D=await Ov({vacancy_id:J.vacancy_id});M(D.data.data||[])}catch(D){console.error(D)}finally{H(!1)}},_e=async()=>{try{const[D,ue]=await Promise.all([Tc(),In()]);d(D.data.data||[]),f(ue.data.data||[])}catch(D){console.error(D)}},Te=async()=>{try{b(!0);const D={};Object.entries(J).forEach(([Z,he])=>{he&&(D[Z]=he)});const ue=await Rv(D);o(ue.data.data||[])}catch(D){console.error(D)}finally{b(!1)}},Ne=async()=>{try{const D={};Object.entries(J).forEach(([be,Pe])=>{Pe&&be!=="search"&&(D[be]=Pe)});const ue=await Dv(D),Z=new Blob([ue.data],{type:"text/csv"}),he=window.URL.createObjectURL(Z),je=document.createElement("a");je.href=he,je.download=`applicants_${new Date().toISOString().slice(0,10)}.csv`,document.body.appendChild(je),je.click(),document.body.removeChild(je),window.URL.revokeObjectURL(he),ve.success("Excel/CSV downloaded successfully")}catch{ve.error("Export failed")}},Re=()=>{ie({vacancy_id:"",company_id:"",overall_experience:"",relevant_experience:"",qualification:"",status:"",search:"",interview_date:"",sortBy:"highExperience"}),W([])},We=D=>{D.target.checked?W(I.map(ue=>ue.id)):W([])},Xe=D=>{W(ue=>ue.includes(D)?ue.filter(Z=>Z!==D):[...ue,D])},Pt=async()=>{try{z(!0),await Lv({ids:re}),ve.success(`${re.length} applications deleted successfully`),W([]),ne(!1),Te()}catch{ve.error("Failed to delete applications")}finally{z(!1)}},ot=async(D,ue,Z="",he={})=>{var je,be;try{L(!0),await Tv({id:D,status:ue,rejection_reason:Z,...he}),ve.success(`Application marked as ${ue}`),_(!1),x(!1),N(""),T({interview_type:"Online",interview_date:"",interview_time:"",interview_location:""}),j(null),Te()}catch(Pe){ve.error(((be=(je=Pe.response)==null?void 0:je.data)==null?void 0:be.message)||"Failed to update status")}finally{L(!1)}},y=n.filter(D=>{if(!J.search)return!0;const ue=J.search.toLowerCase();return(D.first_name+" "+D.last_name).toLowerCase().includes(ue)||D.email.toLowerCase().includes(ue)||D.contact_number.includes(ue)}).sort((D,ue)=>{if(J.sortBy==="newest")return new Date(ue.applied_at)-new Date(D.applied_at);if(J.sortBy==="oldest")return new Date(D.applied_at)-new Date(ue.applied_at);if(J.sortBy==="highExperience"||J.sortBy==="lowExperience"){const Z={"10+ years":5,"5-10 years":4,"3-5 years":3,"1-3 years":2,"0-1 years":1},he=Z[D.overall_experience]||0,je=Z[ue.overall_experience]||0;return J.sortBy==="highExperience"?je-he:he-je}return new Date(ue.applied_at)-new Date(D.applied_at)}),fe=Math.ceil(y.length/ye),ce=(k-1)*ye,I=y.slice(ce,ce+ye);return U.useEffect(()=>{se(1)},[J]),t.jsxs("div",{className:"manage-vacancies-console",children:[t.jsxs("div",{className:"vacancies-orchestration-header",children:[t.jsx("div",{className:"hero-bg-accent"}),t.jsxs("div",{className:"header-content-p",children:[t.jsxs("div",{className:"console-badge",children:[t.jsx("span",{className:"live-dot pulse"}),"CANDIDATE ORCHESTRATION PIPELINE"]}),t.jsx("h1",{className:"serif-title-p",children:"Applications"}),t.jsx("p",{className:"hero-subline",children:"Review and manage candidates for all active roles across George Steuart & Company."})]}),t.jsxs("button",{className:"btn-establish-p",onClick:Ne,children:[t.jsx(ss,{})," ",t.jsx("span",{children:"Export to CSV"})]})]}),t.jsxs("div",{className:"console-toolbar-p",children:[t.jsxs("div",{className:"toolbar-search-row",children:[t.jsxs("div",{className:"search-orchestrator",children:[t.jsx(ua,{className:"s-icon"}),t.jsx("label",{htmlFor:"applicant_search",className:"sr-only",children:"Search Applicants"}),t.jsx("input",{id:"applicant_search",name:"applicant_search",type:"text",placeholder:"Search by applicant name, email, or contact number...",value:J.search,onChange:D=>ie({...J,search:D.target.value})})]}),t.jsxs("button",{className:"btn-reset-console",onClick:Re,children:[t.jsx(bt,{size:14})," Reset Filters"]})]}),t.jsx("div",{className:"toolbar-divider"}),t.jsxs("div",{className:"toolbar-filters-row",children:[t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{htmlFor:"vacancy_filter",className:"filter-label",children:"Position"}),t.jsxs("div",{className:"select-orchestrator select-lg",children:[t.jsx(Ht,{className:"f-icon"}),t.jsxs("select",{id:"vacancy_filter",name:"vacancy_id",value:J.vacancy_id,onChange:D=>ie({...J,vacancy_id:D.target.value}),children:[t.jsx("option",{value:"",children:"All Active Roles"}),l.map(D=>t.jsx("option",{value:D.id,children:D.title},D.id))]})]})]}),s.role==="super_admin"&&t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{htmlFor:"company_filter",className:"filter-label",children:"Establishment"}),t.jsxs("div",{className:"select-orchestrator select-lg",children:[t.jsx(Ic,{className:"f-icon"}),t.jsxs("select",{id:"company_filter",name:"company_id",value:J.company_id,onChange:D=>ie({...J,company_id:D.target.value}),children:[t.jsx("option",{value:"",children:"All Entities"}),u.map(D=>t.jsx("option",{value:D.id,children:D.name},D.id))]})]})]}),t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{htmlFor:"experience_filter",className:"filter-label",children:"Experience"}),t.jsxs("div",{className:"select-orchestrator",children:[t.jsx(Zt,{className:"f-icon"}),t.jsxs("select",{id:"experience_filter",name:"overall_experience",value:J.overall_experience,onChange:D=>ie({...J,overall_experience:D.target.value}),children:[t.jsx("option",{value:"",children:"Any Exp."}),Ac.map(D=>t.jsx("option",{value:D,children:D},D))]})]})]}),t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{htmlFor:"qualification_filter",className:"filter-label",children:"Credential"}),t.jsxs("div",{className:"select-orchestrator",children:[t.jsx(yr,{className:"f-icon"}),t.jsxs("select",{id:"qualification_filter",name:"qualification",value:J.qualification,onChange:D=>ie({...J,qualification:D.target.value}),children:[t.jsx("option",{value:"",children:"Any Qual."}),ph.map(D=>t.jsx("option",{value:D,children:D},D))]})]})]}),t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{htmlFor:"status_filter",className:"filter-label",children:"Status"}),t.jsxs("div",{className:"select-orchestrator",children:[t.jsx(Oc,{className:"f-icon"}),t.jsxs("select",{id:"status_filter",name:"status",value:J.status,onChange:D=>ie({...J,status:D.target.value,interview_date:D.target.value==="shortlisted"?J.interview_date:""}),children:[t.jsx("option",{value:"",children:"All Statuses"}),t.jsx("option",{value:"pending",children:"Pending"}),t.jsx("option",{value:"under_review",children:"Under Review"}),t.jsx("option",{value:"shortlisted",children:"Shortlisted"}),t.jsx("option",{value:"rejected",children:"Rejected"})]})]})]}),J.status==="shortlisted"&&t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{htmlFor:"interview_date_filter",className:"filter-label",children:"Date"}),t.jsxs("div",{className:"select-orchestrator",children:[t.jsx(or,{className:"f-icon"}),t.jsx("input",{id:"interview_date_filter",name:"interview_date",type:"date",value:J.interview_date,onChange:D=>ie({...J,interview_date:D.target.value}),className:"date-orchestrator-input"})]})]}),t.jsxs("div",{className:"filter-group filter-field-sort",children:[t.jsx("label",{htmlFor:"sort_by",className:"filter-label sort-label",children:"Sort"}),t.jsx("div",{className:"select-orchestrator",children:t.jsxs("select",{id:"sort_by",name:"sortBy",value:J.sortBy,onChange:D=>ie({...J,sortBy:D.target.value}),className:"sort-select-crimson",children:[t.jsx("option",{value:"highExperience",children:"High Experience"}),t.jsx("option",{value:"lowExperience",children:"Low Experience"}),t.jsx("option",{value:"newest",children:"Newest First"}),t.jsx("option",{value:"oldest",children:"Oldest First"})]})})]})]})]}),J.vacancy_id&&F.length>0&&t.jsxs("div",{className:"stp-section",children:[t.jsxs("div",{className:"stp-header-banner stp-teaser",onClick:()=>te(D=>!D),children:[t.jsxs("div",{className:"stp-header-left",children:[t.jsx("div",{className:"stp-icon-wrap",children:"🔥"}),t.jsxs("div",{children:[t.jsxs("h2",{className:"stp-title",children:[F.length," candidate",F.length!==1?"s":""," already match this job!"]}),t.jsx("p",{className:"stp-subtitle",children:pe?"Click to hide — these candidates opted in for future roles":"From your Talent Pool — click to view & invite them instantly"})]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[t.jsxs("div",{className:"stp-match-badge",children:[t.jsx("span",{className:"stp-count",children:F.length}),t.jsxs("span",{className:"stp-count-label",children:["Match",F.length!==1?"es":""]})]}),t.jsx("div",{className:"stp-chevron",style:{transform:pe?"rotate(180deg)":"rotate(0deg)"},children:t.jsx(Dr,{size:22,style:{transform:"rotate(90deg)",color:"rgba(255,255,255,0.6)"}})})]})]}),pe&&t.jsx("div",{className:"stp-cards-grid",children:F.map((D,ue)=>{var Z,he;return t.jsx("div",{className:"stp-card",onClick:()=>j({...D,is_suggestion:!0}),children:t.jsxs("div",{className:"stp-card-inner",children:[t.jsxs("div",{className:"stp-avatar",children:[(Z=D.first_name)==null?void 0:Z[0],(he=D.last_name)==null?void 0:he[0]]}),t.jsxs("div",{className:"stp-info",children:[t.jsxs("div",{className:"stp-name-row",children:[t.jsxs("span",{className:"stp-name",children:[D.first_name," ",D.last_name]}),t.jsx("span",{className:"stp-consented-badge",children:"✓ Consented"})]}),t.jsxs("div",{className:"stp-prev",children:["Previously applied: ",t.jsx("strong",{children:D.last_applied_vacancy})]}),t.jsxs("div",{className:"stp-pills-row",children:[t.jsxs("span",{className:"stp-pill stp-pill-gold",children:[D.overall_experience," exp"]}),t.jsx("span",{className:"stp-pill stp-pill-light",children:D.qualification}),D.last_status==="shortlisted"&&t.jsx("span",{className:"stp-pill stp-pill-green",children:"Favored"})]})]}),t.jsxs("div",{className:"stp-action",children:[t.jsxs("a",{href:`mailto:${D.email}?subject=Exciting Opportunity at George Steuart`,className:"stp-invite-btn",onClick:je=>je.stopPropagation(),children:[t.jsx(lr,{size:14})," Invite"]}),t.jsxs("button",{className:"stp-view-btn",onClick:je=>{je.stopPropagation(),j({...D,is_suggestion:!0})},children:["View ",t.jsx(Dr,{size:13})]})]})]})},ue)})}),t.jsx("style",{children:`
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
                    `})]}),t.jsxs("div",{className:"orchestration-table-wrapper card-p",style:{marginBottom:"16px"},children:[t.jsxs("div",{style:{padding:"24px",borderBottom:"1px solid #f0f2f5",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[t.jsxs("span",{style:{fontSize:"0.85rem",color:"var(--text-muted)",fontWeight:"600",textTransform:"uppercase",letterSpacing:"1px"},children:["Showing ",t.jsx("strong",{style:{color:"var(--text-primary)"},children:y.length})," candidates"]}),re.length>0&&t.jsxs("div",{className:"bulk-selection-badge animated-fade-in",children:[t.jsx("strong",{children:re.length})," Selected"]})]}),re.length>0&&t.jsxs("button",{className:"btn btn-danger-minimal",onClick:()=>ne(!0),style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",borderRadius:"12px"},children:[t.jsx(hb,{})," Bulk Delete"]})]}),h?t.jsxs("div",{className:"loading-state-p",children:[t.jsx("div",{className:"spinner-p"}),t.jsx("p",{children:"Synchronizing pipeline data..."})]}):y.length===0?t.jsxs("div",{className:"empty-state-p",children:[t.jsx("div",{className:"empty-icon",children:t.jsx(cr,{})}),t.jsx("h3",{children:"No prospects found"}),t.jsx("p",{children:"We couldn't find any candidates matching your current filters."}),t.jsx("button",{className:"btn btn-outline",onClick:Re,children:"Reset Console"})]}):t.jsxs("div",{className:"premium-table-container",children:[t.jsxs("table",{className:"premium-table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{style:{width:"40px"},children:t.jsx("input",{type:"checkbox",className:"premium-checkbox",onChange:We,checked:I.length>0&&re.length===I.length})}),t.jsx("th",{children:"Candidate"}),t.jsx("th",{children:"Target Position"}),t.jsx("th",{children:"Credentials"}),t.jsx("th",{children:"Applied Timeline"}),t.jsx("th",{children:"Actions"})]})}),t.jsx("tbody",{children:I.map(D=>{var ue,Z;return t.jsxs("tr",{className:re.includes(D.id)?"row-selected":"",children:[t.jsx("td",{children:t.jsx("input",{type:"checkbox",className:"premium-checkbox",checked:re.includes(D.id),onChange:()=>Xe(D.id),onClick:he=>he.stopPropagation()})}),t.jsx("td",{children:t.jsxs("div",{className:"candidate-cell",children:[t.jsxs("div",{className:"candidate-avatar",children:[(ue=D.first_name)==null?void 0:ue[0],(Z=D.last_name)==null?void 0:Z[0]]}),t.jsxs("div",{className:"candidate-info",children:[t.jsxs("div",{className:"name",children:[D.first_name," ",D.last_name,t.jsx("span",{className:`status-pill status-${(D.status||"pending").replace("_","-")}`,children:(D.status||"pending").replace("_"," ")})]}),t.jsxs("div",{className:"email",children:[t.jsx(lr,{size:12})," ",D.email]})]})]})}),t.jsx("td",{children:t.jsxs("div",{className:"position-cell",style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx("img",{src:D.company_logo?`${m1}/uploads/logos/${D.company_logo}`:"/gs-logo.png",alt:D.company_name,onError:he=>he.target.src="/gs-logo.png",style:{width:"32px",height:"32px",objectFit:"contain",borderRadius:"6px",background:"#fff",border:"1px solid #e2e8f0",padding:"3px",flexShrink:0}}),t.jsxs("div",{children:[D.job_ref&&t.jsxs("span",{className:"ref-badge",children:["#",D.job_ref]}),t.jsx("h4",{className:"position-title",style:{margin:0},children:D.vacancy_title}),t.jsx("div",{className:"company-name",style:{margin:0},children:D.company_name})]})]})}),t.jsx("td",{children:t.jsxs("div",{className:"credentials-cell",children:[t.jsx("span",{className:"exp-badge",children:D.overall_experience}),t.jsx("div",{className:"degree-txt",children:D.qualification})]})}),t.jsx("td",{children:t.jsxs("div",{className:"timeline-cell",children:[t.jsxs("div",{children:["Requested: ",br(D.applied_at)]}),D.status==="shortlisted"&&D.interview_date&&t.jsxs("div",{className:"schedule-widget",children:[t.jsxs("div",{className:"schedule-header",children:[t.jsx(or,{size:12})," Scheduled"]}),t.jsx("div",{className:"schedule-time",children:br(D.interview_date)}),t.jsx("div",{className:"schedule-time",style:{fontSize:"0.75rem",color:"var(--text-muted)"},children:D.interview_time})]})]})}),t.jsx("td",{children:t.jsxs("div",{className:"actions-cell",children:[t.jsx("button",{className:"action-btn success",title:"Shortlist",onClick:he=>{he.stopPropagation(),j(D),x(!0)},children:t.jsx(Zt,{size:18})}),t.jsx("button",{className:"action-btn details",title:"View Details",onClick:()=>j(D),children:t.jsx(On,{size:18})})]})})]},D.id)})})]}),t.jsxs("div",{className:"pagination-footer",children:[t.jsxs("div",{className:"page-info",children:["Showing ",t.jsxs("strong",{children:[ce+1,"-",Math.min(ce+ye,y.length)]})," of ",t.jsx("strong",{children:y.length})," candidates"]}),t.jsxs("div",{className:"pagination-controls",children:[t.jsxs("button",{className:"page-btn",onClick:()=>se(D=>Math.max(D-1,1)),disabled:k===1,title:"Previous Page",children:[t.jsx(ao,{})," Previous"]}),t.jsxs("button",{className:"page-btn",onClick:()=>se(D=>Math.min(D+1,fe)),disabled:k===fe||fe===0,title:"Next Page",children:["Next ",t.jsx(Dr,{})]})]})]})]})]}),g&&t.jsx("div",{className:"confirm-overlay",onClick:()=>j(null),children:t.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:D=>D.stopPropagation(),style:{maxWidth:"900px",width:"90%",textAlign:"left",overflow:"hidden"},children:[t.jsxs("div",{className:"modal-header-p",style:{background:"var(--bg-primary)",borderBottom:"1px solid #f1f5f9",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsxs("div",{className:"header-info-p",style:{display:"flex",alignItems:"center",gap:"24px"},children:[t.jsxs("div",{className:"modal-avatar",style:{width:"80px",height:"80px",borderRadius:"24px",background:"var(--ivory-dark)",color:"var(--crimson)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",border:"1px solid rgba(200, 169, 81, 0.3)"},children:[(O=g.first_name)==null?void 0:O[0],(Y=g.last_name)==null?void 0:Y[0]]}),t.jsxs("div",{children:[t.jsxs("h2",{style:{fontFamily:"var(--font-heading)",fontSize:"2.4rem",letterSpacing:"-1px",margin:0,color:"var(--text-primary)",display:"flex",alignItems:"center",gap:"16px"},children:[g.first_name," ",g.last_name,t.jsx("span",{className:`status-badge-p badge-${g.status||"pending"}`,children:(g.status||"pending").replace("_"," ")})]}),t.jsx("p",{style:{color:"var(--gold-accent)",fontWeight:700,textTransform:"uppercase",fontSize:"0.75rem",letterSpacing:"1px",margin:"4px 0 0 0"},children:g.is_suggestion?"Pool Candidate":`${g.vacancy_title} Prospect`})]})]}),t.jsx("button",{className:"o-btn delete",onClick:()=>j(null),children:t.jsx(bt,{})})]}),t.jsxs("div",{className:"modal-body-p",style:{overflowY:"auto",maxHeight:"70vh"},children:[g.is_suggestion&&t.jsx("div",{className:"detail-notice",style:{background:"#ecfdf5",padding:"16px 20px",borderRadius:"16px",border:"1px solid #a7f3d0",color:"#065f46",fontSize:"0.9rem",marginBottom:"32px"},children:t.jsxs("p",{style:{margin:0},children:['This prospect matched your criteria from the Talent Pool. They previously applied for "',g.last_applied_vacancy,'" and consented to being contacted for future roles.']})}),t.jsxs("div",{className:"detail-grid-p admin-grid-2",style:{gap:"24px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))"},children:[t.jsxs("div",{className:"detail-section-p",children:[t.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Contact Protocols"}),t.jsxs("div",{className:"contact-list-p",style:{display:"flex",flexDirection:"column",gap:"20px"},children:[t.jsxs("div",{className:"contact-item-p",style:{display:"flex",gap:"16px",alignItems:"flex-start"},children:[t.jsx(lr,{style:{marginTop:"4px",color:"var(--gold-accent)",fontSize:"1.2rem",flexShrink:0}}),t.jsxs("div",{children:[t.jsx("span",{style:{display:"block",fontSize:"0.7rem",color:"var(--text-muted)",fontWeight:700,textTransform:"uppercase",marginBottom:"2px"},children:"Email Dispatch"}),t.jsx("p",{style:{margin:0,fontWeight:600,color:"var(--text-primary)",fontSize:"1rem",lineHeight:"1.4"},children:g.email})]})]}),t.jsxs("div",{className:"contact-item-p",style:{display:"flex",gap:"16px",alignItems:"flex-start"},children:[t.jsx(Bc,{style:{marginTop:"4px",color:"var(--gold-accent)",fontSize:"1.2rem",flexShrink:0}}),t.jsxs("div",{children:[t.jsx("span",{style:{display:"block",fontSize:"0.7rem",color:"var(--text-muted)",fontWeight:700,textTransform:"uppercase",marginBottom:"2px"},children:"Direct Line"}),t.jsx("p",{style:{margin:0,fontWeight:600,color:"var(--text-primary)",fontSize:"1rem",lineHeight:"1.4"},children:g.contact_number})]})]})]})]}),t.jsxs("div",{className:"detail-section-p",children:[t.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Professional Profile"}),t.jsxs("div",{className:"stats-row-m admin-grid-3",style:{gap:"16px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))"},children:[t.jsxs("div",{className:"stat-m",style:{background:"var(--bg-primary)",padding:"16px",borderRadius:"16px",border:"1px solid var(--border-light)"},children:[t.jsx("span",{style:{display:"block",fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:700,textTransform:"uppercase"},children:"Overall Exp."}),t.jsx("strong",{style:{display:"block",fontSize:"0.95rem",color:"var(--text-primary)",fontWeight:800,marginTop:"4px"},children:g.overall_experience})]}),t.jsxs("div",{className:"stat-m",style:{background:"var(--bg-primary)",padding:"16px",borderRadius:"16px",border:"1px solid var(--border-light)"},children:[t.jsx("span",{style:{display:"block",fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:700,textTransform:"uppercase"},children:"Relevant Exp."}),t.jsx("strong",{style:{display:"block",fontSize:"0.95rem",color:"var(--text-primary)",fontWeight:800,marginTop:"4px"},children:g.relevant_experience})]}),t.jsxs("div",{className:"stat-m",style:{background:"var(--bg-primary)",padding:"16px",borderRadius:"16px",border:"1px solid var(--border-light)"},children:[t.jsx("span",{style:{display:"block",fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:700,textTransform:"uppercase"},children:"Qualification"}),t.jsx("strong",{style:{display:"block",fontSize:"0.95rem",color:"var(--text-primary)",fontWeight:800,marginTop:"4px"},children:g.qualification})]})]})]}),t.jsxs("div",{className:"detail-section-p full-width",children:[t.jsx("label",{children:"Submission Details"}),t.jsxs("div",{className:"submission-box-p",children:[t.jsxs("div",{className:"sm-item",children:[t.jsx("span",{children:g.is_suggestion?"Previously Applied to":"Company"}),t.jsx("p",{children:g.is_suggestion?g.last_applied_vacancy:g.company_name})]}),t.jsxs("div",{className:"sm-item",children:[t.jsx("span",{children:"Salary Expectation"}),t.jsx("p",{children:g.salary_expectation||"Not specified"})]}),t.jsxs("div",{className:"sm-item",children:[t.jsx("span",{children:"Applied Date"}),t.jsx("p",{children:br(g.applied_at)})]})]}),g.status==="rejected"&&g.rejection_reason&&t.jsxs("div",{className:"rejection-reason-box mt-3",children:[t.jsx("span",{children:"Rejection Reason"}),t.jsx("p",{children:g.rejection_reason})]}),g.status==="shortlisted"&&g.interview_date&&t.jsxs("div",{className:"detail-section-p full-width",style:{marginTop:"32px"},children:[t.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Confirmed Interview Schedule"}),t.jsxs("div",{className:"submission-box-p",style:{background:"#f8fafc",border:"1px solid #e2e8f0",gridTemplateColumns:"repeat(3, 1fr)"},children:[t.jsxs("div",{className:"sm-item",children:[t.jsx("span",{children:"Medium / Type"}),t.jsxs("p",{style:{display:"flex",alignItems:"center",gap:"8px",color:"var(--text-primary)"},children:[t.jsx(fb,{style:{color:"var(--gold-accent)"}})," ",g.interview_type]})]}),t.jsxs("div",{className:"sm-item",children:[t.jsx("span",{children:"Date & Duration"}),t.jsxs("p",{style:{display:"flex",alignItems:"center",gap:"8px",color:"var(--text-primary)"},children:[t.jsx(or,{style:{color:"var(--gold-accent)"}})," ",br(g.interview_date)," at ",g.interview_time]})]}),t.jsxs("div",{className:"sm-item",children:[t.jsx("span",{children:"Location / Resource"}),t.jsxs("p",{style:{fontSize:"0.85rem",wordBreak:"break-all",display:"flex",alignItems:"flex-start",gap:"8px",color:"var(--text-primary)"},children:[t.jsx(wr,{style:{color:"var(--gold-accent)",marginTop:"4px"}})," ",g.interview_location]})]})]})]})]})]}),t.jsx("div",{className:"cv-preview-section-p",children:t.jsxs("div",{className:"cv-banner-p",children:[t.jsx("div",{className:"cb-icon",children:t.jsx(yr,{})}),t.jsxs("div",{className:"cb-text",children:[t.jsx("span",{children:"Curriculum Vitae"}),t.jsxs("p",{children:[g.first_name,"_CV_",g.is_suggestion?"Pool":(g.vacancy_title||"Document").replace(/\s+/g,"_"),".",(g.cv_path||"").split(".").pop()||"pdf"]})]}),t.jsxs("button",{className:"btn btn-gold",onClick:()=>K(g),children:[t.jsx(cs,{})," View Document"]})]})})]}),t.jsx("div",{className:"modal-actions-footer-p",style:{display:"flex",justifyContent:"flex-end",gap:"12px"},children:["shortlisted","rejected"].includes(g.status)?t.jsx("button",{className:"btn btn-outline",style:{borderRadius:"12px",padding:"10px 24px",fontWeight:600},onClick:()=>j(null),children:"Close Detail View"}):t.jsxs(t.Fragment,{children:[t.jsx("button",{className:"btn btn-outline",style:{borderRadius:"12px",padding:"10px 24px",fontWeight:600},onClick:()=>j(null),children:"Cancel"}),t.jsx("button",{className:"btn-status-action btn-status-pending",onClick:()=>ot(g.id,"pending"),disabled:C||g.status==="pending",children:"Mark Pending"}),t.jsx("button",{className:"btn-status-action btn-status-review",onClick:()=>ot(g.id,"under_review"),disabled:C||g.status==="under_review",children:"Under Review"}),t.jsx("button",{className:"btn-status-action btn-status-reject",onClick:()=>_(!0),disabled:C,children:"Reject Candidacy"}),t.jsx("button",{className:"btn-status-action btn-status-shortlist",onClick:()=>x(!0),disabled:C,children:"Shortlist Candidate"})]})})]})}),S&&t.jsx("div",{className:"confirm-overlay",style:{zIndex:1100},onClick:()=>_(!1),children:t.jsxs("div",{className:"confirm-modal card-p animated-zoom",style:{maxWidth:"500px",width:"90%"},onClick:D=>D.stopPropagation(),children:[t.jsxs("div",{className:"modal-header-p",style:{borderBottom:"1px solid #f1f5f9"},children:[t.jsx("h2",{children:"Reject Application"}),t.jsx("button",{className:"close-btn-p",onClick:()=>{_(!1),N("")},children:t.jsx(bt,{})})]}),t.jsxs("div",{className:"modal-body-p",children:[t.jsxs("p",{style:{marginBottom:"16px",color:"var(--text-muted)"},children:["Please provide a reason for rejecting ",t.jsxs("strong",{children:[g==null?void 0:g.first_name," ",g==null?void 0:g.last_name]}),". This will be sent to the applicant via email."]}),t.jsx("textarea",{className:"styled-input",rows:"4",style:{width:"100%",padding:"12px",borderRadius:"8px",border:"1px solid #e2e8f0",resize:"none"},placeholder:"E.g., Does not meet the minimum experience requirements...",value:v,onChange:D=>N(D.target.value)}),t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px",borderTop:"1px solid #f1f5f9",paddingTop:"24px"},children:[t.jsx("button",{className:"btn btn-outline",style:{borderRadius:"12px",padding:"12px 24px",fontWeight:600},onClick:()=>_(!1),children:"Keep Candidate"}),t.jsx("button",{className:"btn-status-action btn-status-reject",onClick:()=>ot(g.id,"rejected",v),disabled:C||!v.trim(),children:C?"Rejecting...":"Confirm Rejection"})]})]})]})}),w&&t.jsx("div",{className:"confirm-overlay",style:{zIndex:1100},onClick:()=>x(!1),children:t.jsxs("div",{className:"confirm-modal card-p animated-zoom",style:{maxWidth:"550px",width:"90%"},onClick:D=>D.stopPropagation(),children:[t.jsxs("div",{className:"modal-header-p",style:{borderBottom:"1px solid #f1f5f9"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx("div",{style:{background:"#ecfdf5",color:"#10b981",padding:"8px",borderRadius:"8px",display:"flex"},children:t.jsx(Zt,{size:20})}),t.jsx("h2",{children:"Shortlist Candidate"})]}),t.jsx("button",{className:"close-btn-p",onClick:()=>x(!1),children:t.jsx(bt,{})})]}),t.jsxs("div",{className:"modal-body-p",children:[t.jsxs("p",{style:{marginBottom:"24px",color:"var(--text-secondary)",fontSize:"0.95rem",lineHeight:"1.5"},children:["You are about to shortlist ",t.jsxs("strong",{style:{color:"var(--text-primary)"},children:[(g==null?void 0:g.first_name)||""," ",(g==null?void 0:g.last_name)||"this candidate"]}),". Please enter the interview details below to be included in the invitation email."]}),t.jsxs("div",{className:"admin-grid-1",style:{gap:"16px"},children:[t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{style:{display:"block",fontSize:"0.75rem",fontWeight:700,marginBottom:"6px",color:"var(--text-secondary)"},children:"Interview Type"}),t.jsxs("select",{className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0"},value:P.interview_type,onChange:D=>T({...P,interview_type:D.target.value}),children:[t.jsx("option",{value:"Online",children:"Online / Virtual"}),t.jsx("option",{value:"On-site",children:"On-site / Physical"})]})]}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{style:{display:"block",fontSize:"0.75rem",fontWeight:700,marginBottom:"6px",color:"var(--text-secondary)"},children:"Interview Date"}),t.jsx("input",{type:"date",className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0"},value:P.interview_date,onChange:D=>T({...P,interview_date:D.target.value})})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{style:{display:"block",fontSize:"0.75rem",fontWeight:700,marginBottom:"6px",color:"var(--text-secondary)"},children:"Interview Time"}),t.jsx("input",{type:"time",className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0"},value:P.interview_time,onChange:D=>T({...P,interview_time:D.target.value})})]})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{style:{display:"block",fontSize:"0.75rem",fontWeight:700,marginBottom:"6px",color:"var(--text-secondary)"},children:"Location / Meeting Link"}),t.jsx("input",{type:"text",className:"styled-input",style:{width:"100%",padding:"10px",borderRadius:"8px",border:"1px solid #e2e8f0"},placeholder:P.interview_type==="Online"?"Zoom, Teams link, etc.":"Office address, Boardroom name, etc.",value:P.interview_location,onChange:D=>T({...P,interview_location:D.target.value})})]})]}),t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"32px",borderTop:"1px solid #f1f5f9",paddingTop:"24px"},children:[t.jsx("button",{className:"btn btn-outline",style:{borderRadius:"12px",padding:"12px 24px",fontWeight:600},onClick:()=>x(!1),children:"Cancel"}),t.jsx("button",{className:"btn-status-action btn-status-shortlist",onClick:()=>ot(g.id,"shortlisted","",P),disabled:C||!P.interview_date||!P.interview_time||!P.interview_location,children:C?"Sending...":"Confirm & Send Invitation"})]})]})]})}),X&&t.jsx("div",{className:"confirm-overlay animated-fade-in",style:{zIndex:1210},onClick:()=>ne(!1),children:t.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:D=>D.stopPropagation(),style:{maxWidth:"450px",textAlign:"center",padding:"40px"},children:[t.jsx("div",{className:"warning-visual",children:t.jsx(fs,{})}),t.jsx("h2",{style:{fontSize:"1.5rem",marginBottom:"12px",color:"var(--text-primary)"},children:"Confirm Bulk Deletion"}),t.jsxs("p",{style:{color:"var(--text-secondary)",marginBottom:"32px",lineHeight:"1.6"},children:["You are about to permanently delete ",t.jsx("strong",{children:re.length})," selected applications. This action cannot be undone. Are you sure you want to proceed?"]}),t.jsxs("div",{style:{display:"flex",gap:"12px"},children:[t.jsx("button",{className:"btn btn-outline",onClick:()=>ne(!1),style:{flex:1,padding:"14px",borderRadius:"12px",fontWeight:600},children:"Cancel"}),t.jsx("button",{className:"btn",onClick:Pt,disabled:R,style:{flex:1,background:"var(--crimson)",color:"#fff",border:"none",padding:"14px",borderRadius:"12px",fontWeight:700},children:R?"Deleting...":"Confirm Delete"})]})]})}),t.jsx("style",{jsx:"true",children:`
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
                    padding: 16px;
                    background: #fdfdfd;
                    border: 1px solid #f1f5f9;
                    border-radius: 16px;
                    gap: 20px;
                }

                .sm-item span { display: block; font-size: 0.7rem; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; font-weight: 700; }
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
`}),A&&t.jsx("div",{className:"modal-overlay-p",style:{zIndex:9999,position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)"},children:t.jsxs("div",{className:"detail-modal-p",style:{width:"90%",height:"90vh",maxWidth:"1000px",display:"flex",flexDirection:"column"},children:[t.jsxs("div",{className:"modal-header-p",style:{padding:"16px 24px",borderBottom:"1px solid #e2e8f0",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#f8fafc"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx("div",{style:{background:"var(--crimson)",color:"white",padding:"8px",borderRadius:"8px",display:"flex"},children:t.jsx(yr,{size:20})}),t.jsxs("div",{children:[t.jsxs("h3",{style:{margin:0,fontSize:"1.1rem",color:"var(--text-primary)"},children:[A.first_name," ",A.last_name," - Curriculum Vitae"]}),t.jsx("p",{style:{margin:0,fontSize:"0.8rem",color:"var(--text-muted)"},children:A.cv_path})]})]}),t.jsxs("div",{style:{display:"flex",gap:"12px"},children:[t.jsxs("a",{href:`${jt}/applications.php?action=view_cv&file=${encodeURIComponent(A.cv_path)}`,target:"_blank",rel:"noopener noreferrer",className:"btn btn-outline",style:{padding:"8px 16px",display:"flex",alignItems:"center",gap:"8px",color:"var(--crimson)"},children:[t.jsx(cs,{})," Open in New Tab"]}),t.jsxs("a",{href:`${jt}/applications.php?action=view_cv&file=${encodeURIComponent(A.cv_path)}`,download:`${A.first_name}_CV`,className:"btn btn-outline",style:{padding:"8px 16px",display:"flex",alignItems:"center",gap:"8px"},children:[t.jsx(ss,{})," Download File"]}),t.jsx("button",{className:"close-btn-p",onClick:()=>K(null),style:{background:"white",border:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx(bt,{size:20})})]})]}),t.jsx("div",{className:"modal-body-p",style:{flex:1,padding:0,overflow:"hidden",background:"#e2e8f0",display:"flex",alignItems:"center",justifyContent:"center"},children:A.cv_path.toLowerCase().endsWith(".pdf")?t.jsx("iframe",{src:`${jt}/applications.php?action=view_cv&file=${encodeURIComponent(A.cv_path)}#toolbar=0`,style:{width:"100%",height:"100%",border:"none"},title:"CV Viewer"}):A.cv_path.toLowerCase().endsWith(".docx")||A.cv_path.toLowerCase().endsWith(".doc")?t.jsx(g1,{url:`${jt}/applications.php?action=view_cv&file=${encodeURIComponent(A.cv_path)}`}):t.jsxs("div",{style:{textAlign:"center",color:"#64748b"},children:[t.jsx(yr,{size:48,style:{marginBottom:"16px",color:"#cbd5e1"}}),t.jsx("h3",{children:"Document Viewer"}),t.jsxs("p",{style:{maxWidth:"400px",margin:"0 auto 20px auto"},children:["This document type (",A.cv_path.split(".").pop().toUpperCase(),") cannot be previewed directly in the browser. Please download it to view."]}),t.jsxs("a",{href:`${jt}/applications.php?action=view_cv&file=${encodeURIComponent(A.cv_path)}`,download:`${A.first_name}_CV`,className:"btn btn-gold",children:[t.jsx(ss,{})," Download Document"]})]})})]})})]})}const v1=({url:s})=>{const a=U.useRef(null),[n,o]=U.useState(!0),[l,d]=U.useState(null);return U.useEffect(()=>{(async()=>{if(!(!s||!a.current))try{o(!0),d(null);const f=await st.get(s,{responseType:"blob",headers:{Authorization:`Bearer ${localStorage.getItem("gs_admin_token")}`}});a.current.innerHTML="",await Bh(f.data,a.current,null,{className:"docx",inWrapper:!0,ignoreWidth:!1,ignoreHeight:!1,ignoreFonts:!1,breakPageToSections:!0,trimXmlDeclaration:!0})}catch(f){console.error("Docx render error:",f),d("Failed to render document. Please download to view.")}finally{o(!1)}})()},[s]),t.jsxs("div",{style:{width:"100%",height:"100%",overflow:"auto",background:"#fff",padding:"20px",display:"flex",flexDirection:"column",alignItems:"center"},children:[n&&t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"15px",padding:"50px"},children:[t.jsx("div",{className:"spinner-p"}),t.jsx("p",{style:{color:"var(--text-muted)",fontWeight:600},children:"Rendering Document..."})]}),l&&t.jsx("div",{style:{color:"var(--crimson)",padding:"20px"},children:l}),t.jsx("div",{ref:a,style:{width:"100%",maxWidth:"800px"}})]})};function b1({admin:s}){const[a,n]=U.useState([]),[o,l]=U.useState([]),[d,u]=U.useState(!0),[f,h]=U.useState(null),[b,g]=U.useState(""),[j,S]=U.useState(!1),[_,w]=U.useState(null),[x,v]=U.useState(1),N=8,[P,T]=U.useState(null),[C,L]=U.useState(!1),[F,M]=U.useState({company_id:"",search:"",overall_experience:"",qualification:"",tag:"",status:""});U.useEffect(()=>{G()},[]),U.useEffect(()=>{v(1),H()},[F.company_id,F.search,F.overall_experience,F.qualification,F.tag,F.status]);const G=async()=>{try{const W=await In();l(W.data.data||[])}catch(W){console.error(W)}},H=async()=>{try{u(!0);const W={};Object.entries(F).forEach(([ne,R])=>{R&&(W[ne]=R)});const X=await Bv(W);n(X.data.data||[])}catch(W){console.error(W),ve.error("Failed to load talent pool")}finally{u(!1)}},pe=async()=>{if(!(!b.trim()||!f))try{S(!0);const W=f.tags?f.tags.split(",").map(z=>z.trim()):[],X=b.trim();if(W.includes(X)){ve.warning("Tag already exists");return}const ne=[...W,X].join(",");await sf({id:f.id,tags:ne});const R={...f,tags:ne};h(R),n(a.map(z=>z.id===f.id?R:z)),g(""),ve.success("Tag added successfully")}catch{ve.error("Failed to update tags")}finally{S(!1)}},te=async W=>{try{S(!0);const ne=f.tags.split(",").map(z=>z.trim()).filter(z=>z!==W).join(",");await sf({id:f.id,tags:ne});const R={...f,tags:ne};h(R),n(a.map(z=>z.id===f.id?R:z)),ve.success("Tag removed")}catch{ve.error("Failed to remove tag")}finally{S(!1)}},A=async()=>{if(P)try{L(!0),await Av({id:P.id}),n(a.filter(W=>W.id!==P.id)),ve.success("Candidate removed from talent pool"),T(null)}catch{ve.error("Failed to delete candidate")}finally{L(!1)}},K=()=>{M({company_id:"",search:"",overall_experience:"",qualification:"",tag:"",status:""})},k=[...new Set(a.flatMap(W=>W.tags?W.tags.split(",").map(X=>X.trim()):[]))].sort(),se=Math.ceil(a.length/N),ye=(x-1)*N,re=a.slice(ye,ye+N);return t.jsxs("div",{className:"manage-vacancies-console",children:[t.jsxs("div",{className:"vacancies-orchestration-header",children:[t.jsxs("div",{className:"header-content-p",children:[t.jsxs("div",{className:"badge-p",children:[t.jsx("span",{className:"dot pulse"}),"TALENT POOL ORCHESTRATOR"]}),t.jsx("h1",{className:"hero-title-p",children:"Talent Pool"}),t.jsx("p",{className:"hero-subtitle-p",children:"Intelligent Candidate Management & Heritage Talent Acquisition"})]}),t.jsxs("div",{className:"hero-stats-glass",children:[t.jsxs("div",{className:"h-stat-item",children:[t.jsx("span",{className:"h-label",children:"TOTAL TALENT"}),t.jsx("span",{className:"h-value",children:a.length})]}),t.jsx("div",{className:"h-divider"}),t.jsxs("div",{className:"h-stat-item",children:[t.jsx("span",{className:"h-label",children:"HIGHLY QUALIFIED"}),t.jsx("span",{className:"h-value",children:a.filter(W=>W.qualification==="Masters Degree"||W.qualification==="PhD").length})]})]})]}),t.jsxs("div",{className:"console-toolbar-p",children:[t.jsxs("div",{className:"toolbar-search-row",children:[t.jsxs("div",{className:"search-orchestrator",children:[t.jsx(ua,{className:"s-icon"}),t.jsx("input",{id:"talent_search",name:"talent_search",type:"text",placeholder:"Discover by name, email, expertise or tags...",value:F.search,onChange:W=>M({...F,search:W.target.value})})]}),t.jsxs("button",{className:"btn-reset-p",onClick:K,children:[t.jsx(bt,{})," ",t.jsx("span",{children:"Reset Discovery"})]})]}),t.jsxs("div",{className:"toolbar-filters-row",children:[s.role==="super_admin"&&t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{children:"Business Unit"}),t.jsxs("div",{className:"select-orchestrator",children:[t.jsx(Ic,{className:"f-icon"}),t.jsxs("select",{id:"company_filter",name:"company_id",value:F.company_id,onChange:W=>M({...F,company_id:W.target.value}),className:"select-lg",children:[t.jsx("option",{value:"",children:"All Business Units"}),o.map(W=>t.jsx("option",{value:W.id,children:W.name},W.id))]})]})]}),t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{children:"Seniority Level"}),t.jsxs("div",{className:"select-orchestrator",children:[t.jsx(Ht,{className:"f-icon"}),t.jsxs("select",{id:"experience_filter",name:"overall_experience",value:F.overall_experience,onChange:W=>M({...F,overall_experience:W.target.value}),children:[t.jsx("option",{value:"",children:"Seniority Level"}),Ac.map(W=>t.jsx("option",{value:W,children:W},W))]})]})]}),t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{children:"Talent Tag"}),t.jsxs("div",{className:"select-orchestrator",children:[t.jsx(db,{className:"f-icon"}),t.jsxs("select",{id:"tag_filter",name:"tag",value:F.tag,onChange:W=>M({...F,tag:W.target.value}),children:[t.jsx("option",{value:"",children:"Filter by Tag"}),k.map(W=>t.jsx("option",{value:W,children:W},W))]})]})]}),t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{children:"Academic Status"}),t.jsxs("div",{className:"select-orchestrator",children:[t.jsx(yr,{className:"f-icon"}),t.jsxs("select",{id:"qualification_filter",name:"qualification",value:F.qualification,onChange:W=>M({...F,qualification:W.target.value}),children:[t.jsx("option",{value:"",children:"Academic Status"}),ph.map(W=>t.jsx("option",{value:W,children:W},W))]})]})]}),t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{children:"Search Outcome"}),t.jsxs("div",{className:"select-orchestrator",children:[t.jsx(vc,{className:"f-icon"}),t.jsxs("select",{id:"status_filter",name:"status",value:F.status,onChange:W=>M({...F,status:W.target.value}),children:[t.jsx("option",{value:"",children:"All Outcomes"}),t.jsx("option",{value:"pending",children:"Pending Review"}),t.jsx("option",{value:"shortlisted",children:"Shortlisted"}),t.jsx("option",{value:"rejected",children:"Rejected"})]})]})]})]})]}),t.jsxs("div",{className:"premium-table-container",children:[t.jsxs("table",{className:"premium-table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Candidate Identity"}),t.jsx("th",{children:"Credentials & Tags"}),t.jsx("th",{children:"Prior Submission"}),t.jsx("th",{children:"Timeline & Seniority"}),t.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),t.jsx("tbody",{children:d?t.jsx("tr",{children:t.jsx("td",{colSpan:"5",style:{padding:"40px",textAlign:"center"},children:t.jsxs("div",{className:"loading-state-p",children:[t.jsx("div",{className:"spinner-p"}),t.jsx("p",{style:{marginTop:"12px",color:"var(--text-muted)"},children:"Synchronizing talent pool..."})]})})}):a.length===0?t.jsx("tr",{children:t.jsx("td",{colSpan:"5",style:{padding:"60px",textAlign:"center"},children:t.jsxs("div",{className:"empty-state-p",children:[t.jsx("div",{className:"empty-icon",style:{fontSize:"3rem",color:"var(--border-light)",marginBottom:"16px"},children:t.jsx(vc,{})}),t.jsx("h3",{style:{color:"var(--text-primary)",marginBottom:"8px"},children:"No Talent Found"}),t.jsx("p",{style:{color:"var(--text-muted)"},children:"Adjust your discovery filters to find candidates."})]})})}):re.map((W,X)=>t.jsxs("tr",{onClick:()=>h(W),style:{cursor:"pointer"},children:[t.jsx("td",{children:t.jsxs("div",{className:"candidate-cell",children:[t.jsx("div",{className:"avatar-p",children:t.jsx(cr,{})}),t.jsxs("div",{className:"info-p",children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[t.jsxs("span",{className:"name-p",children:[W.first_name," ",W.last_name]}),W.last_status==="shortlisted"&&t.jsx("span",{className:"status-badge-p badge-shortlisted",children:"Favored"}),W.last_status==="rejected"&&t.jsx("span",{className:"status-badge-p badge-rejected",children:"Refused"})]}),t.jsxs("span",{className:"email-p",children:[t.jsx(lr,{size:11})," ",W.email]})]})]})}),t.jsx("td",{children:t.jsxs("div",{className:"classification-cell",children:[t.jsx("span",{className:"class-badge",style:{background:"rgba(200, 169, 81, 0.1)",color:"var(--gold-accent)"},children:W.qualification}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"6px"},children:W.tags?W.tags.split(",").slice(0,2).map((ne,R)=>t.jsxs("span",{style:{background:"#f1f5f9",color:"#64748b",padding:"2px 8px",borderRadius:"4px",fontSize:"0.65rem",fontWeight:700},children:["#",ne.trim()]},R)):null})]})}),t.jsx("td",{children:t.jsxs("div",{className:"pos-entity-cell",children:[t.jsx("span",{className:"pos-name",children:W.last_applied_vacancy}),t.jsx("span",{className:"entity-name",children:W.last_applied_company})]})}),t.jsx("td",{children:t.jsxs("div",{className:"timeline-cell",children:[t.jsx("span",{style:{fontWeight:800,color:"var(--text-primary)"},children:W.overall_experience}),t.jsxs("span",{style:{color:"var(--text-muted)",display:"flex",alignItems:"center",gap:"4px",fontSize:"0.75rem",marginTop:"4px"},children:[t.jsx(or,{size:12})," ",br(W.applied_at)]})]})}),t.jsx("td",{children:t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px"},children:[t.jsx("button",{className:"action-btn-p danger",style:{background:"rgba(239, 68, 68, 0.1)",color:"#ef4444",border:"none",padding:"8px",borderRadius:"8px",display:"flex",cursor:"pointer"},onClick:ne=>{ne.stopPropagation(),T(W)},title:"Remove from Pool",children:t.jsx(fs,{size:16})}),t.jsx("button",{className:"page-btn",style:{padding:"6px 12px",minWidth:"auto"},onClick:ne=>{ne.stopPropagation(),h(W)},children:t.jsx(Dr,{})})]})})]},X))})]}),t.jsxs("div",{className:"pagination-footer",children:[t.jsxs("div",{className:"page-info",children:["Showing ",t.jsxs("strong",{children:[ye+1,"-",Math.min(ye+N,a.length)]})," of ",t.jsx("strong",{children:a.length})," candidates"]}),t.jsxs("div",{className:"pagination-controls",children:[t.jsxs("button",{className:"page-btn",onClick:W=>{W.stopPropagation(),v(X=>Math.max(X-1,1))},disabled:x===1,children:[t.jsx(ao,{})," Previous"]}),t.jsxs("button",{className:"page-btn",onClick:W=>{W.stopPropagation(),v(X=>Math.min(X+1,se))},disabled:x===se||se===0,children:["Next ",t.jsx(Dr,{})]})]})]})]}),f&&t.jsx("div",{className:"confirm-overlay",onClick:()=>h(null),children:t.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:W=>W.stopPropagation(),style:{maxWidth:"900px",width:"90%",textAlign:"left",overflow:"hidden"},children:[t.jsxs("div",{className:"modal-header-p",style:{background:"var(--bg-primary)",borderBottom:"1px solid #f1f5f9",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px",padding:"24px 32px"},children:[t.jsxs("div",{className:"header-info-p",style:{display:"flex",alignItems:"center",gap:"20px"},children:[t.jsx("div",{className:"modal-avatar",style:{width:"64px",height:"64px",borderRadius:"16px",background:"var(--ivory-dark)",color:"var(--crimson)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",border:"1px solid rgba(200, 169, 81, 0.3)",flexShrink:0},children:t.jsx(cr,{})}),t.jsxs("div",{children:[t.jsxs("h2",{style:{fontFamily:"var(--font-heading)",fontSize:"1.8rem",letterSpacing:"-0.5px",margin:0,color:"var(--text-primary)"},children:[f.first_name," ",f.last_name]}),t.jsx("p",{style:{color:"var(--gold-accent)",fontWeight:700,textTransform:"uppercase",fontSize:"0.7rem",letterSpacing:"1px",margin:"2px 0 0 0"},children:"Talent Pool candidate"})]})]}),t.jsx("button",{className:"o-btn delete",onClick:()=>h(null),children:t.jsx(bt,{})})]}),t.jsxs("div",{className:"modal-body-p",style:{overflowY:"auto",maxHeight:"70vh",padding:"32px"},children:[t.jsxs("div",{className:"detail-grid-p admin-grid-2",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"32px"},children:[t.jsxs("div",{className:"detail-section-p",children:[t.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Contact Information"}),t.jsxs("div",{className:"contact-list-p",style:{display:"flex",flexDirection:"column",gap:"20px"},children:[t.jsxs("div",{className:"contact-item-p",style:{display:"flex",gap:"16px",alignItems:"flex-start"},children:[t.jsx(lr,{style:{marginTop:"4px",color:"var(--gold-accent)",fontSize:"1.2rem",flexShrink:0}}),t.jsxs("div",{children:[t.jsx("span",{style:{display:"block",fontSize:"0.7rem",color:"var(--text-muted)",fontWeight:700,textTransform:"uppercase",marginBottom:"2px"},children:"Email Dispatch"}),t.jsx("p",{style:{margin:0,fontWeight:600,color:"var(--text-primary)",fontSize:"1rem",lineHeight:"1.4"},children:f.email})]})]}),t.jsxs("div",{className:"contact-item-p",style:{display:"flex",gap:"16px",alignItems:"flex-start"},children:[t.jsx(Bc,{style:{marginTop:"4px",color:"var(--gold-accent)",fontSize:"1.2rem",flexShrink:0}}),t.jsxs("div",{children:[t.jsx("span",{style:{display:"block",fontSize:"0.7rem",color:"var(--text-muted)",fontWeight:700,textTransform:"uppercase",marginBottom:"2px"},children:"Direct Line"}),t.jsx("p",{style:{margin:0,fontWeight:600,color:"var(--text-primary)",fontSize:"1rem",lineHeight:"1.4"},children:f.contact_number})]})]})]})]}),t.jsxs("div",{className:"detail-section-p",children:[t.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Professional Profile"}),t.jsxs("div",{className:"professional-stats-grid",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:"12px"},children:[t.jsxs("div",{className:"stat-pill-item",style:{padding:"12px"},children:[t.jsx(Ht,{className:"stat-i"}),t.jsxs("div",{className:"stat-content",children:[t.jsx("span",{style:{fontSize:"0.65rem"},children:"Overall Experience"}),t.jsx("strong",{style:{fontSize:"0.9rem"},children:f.overall_experience})]})]}),t.jsxs("div",{className:"stat-pill-item",style:{padding:"12px"},children:[t.jsx(tb,{className:"stat-i"}),t.jsxs("div",{className:"stat-content",children:[t.jsx("span",{style:{fontSize:"0.65rem"},children:"Relevant Experience"}),t.jsx("strong",{style:{fontSize:"0.9rem"},children:f.relevant_experience||"Not Specified"})]})]}),t.jsxs("div",{className:"stat-pill-item full-w",style:{padding:"12px",gridColumn:"span 1"},children:[t.jsx(xh,{className:"stat-i"}),t.jsxs("div",{className:"stat-content",children:[t.jsx("span",{style:{fontSize:"0.65rem"},children:"Highest Qualification"}),t.jsx("strong",{style:{fontSize:"0.9rem"},children:f.qualification})]})]})]})]}),t.jsxs("div",{className:"detail-section-p",children:[t.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Candidate Talent Tags"}),t.jsxs("div",{style:{background:"#f8fafc",padding:"15px",borderRadius:"12px",border:"1px solid #e2e8f0",minHeight:"120px"},children:[t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"12px"},children:f.tags?f.tags.split(",").map((W,X)=>t.jsxs("span",{style:{background:"#c8a951",color:"#fff",fontSize:"0.7rem",padding:"4px 10px",borderRadius:"100px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"bold"},children:[W.trim(),t.jsx(bt,{onClick:()=>te(W.trim()),style:{cursor:"pointer"}})]},X)):t.jsx("span",{style:{fontStyle:"italic",fontSize:"0.8rem",color:"#94a3b8"},children:"No tags yet."})}),t.jsxs("div",{style:{display:"flex",gap:"8px"},children:[t.jsx("input",{type:"text",placeholder:"Add skill...",value:b,onChange:W=>g(W.target.value),onKeyPress:W=>W.key==="Enter"&&pe(),style:{flex:1,padding:"8px 12px",fontSize:"0.8rem",border:"1px solid #e2e8f0",borderRadius:"8px",outline:"none"}}),t.jsx("button",{onClick:pe,disabled:j,style:{background:"#1a1a2e",color:"#fff",border:"none",padding:"8px 12px",borderRadius:"8px",cursor:"pointer"},children:t.jsx(us,{})})]})]})]}),t.jsxs("div",{className:"detail-section-p",children:[t.jsx("label",{style:{display:"block",fontSize:"0.75rem",color:"var(--crimson)",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"24px",paddingBottom:"10px",borderBottom:"2px solid var(--ivory-dark)",position:"relative"},children:"Submission History"}),t.jsxs("div",{className:"submission-box-p",style:{gridTemplateColumns:"1fr",padding:"15px"},children:[t.jsxs("div",{className:"sm-item",style:{marginBottom:"10px"},children:[t.jsx("span",{children:"Previously Applied to"}),t.jsx("p",{style:{fontSize:"0.85rem"},children:f.last_applied_vacancy})]}),t.jsxs("div",{className:"sm-item",children:[t.jsx("span",{children:"Company"}),t.jsx("p",{style:{fontSize:"0.85rem"},children:f.last_applied_company})]}),f.last_status&&t.jsxs("div",{style:{marginTop:"10px",paddingTop:"10px",borderTop:"1px dashed #e2e8f0"},children:[t.jsx("span",{style:{fontSize:"0.7rem",color:"#94a3b8"},children:"Last Outcome"}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",color:f.last_status==="shortlisted"?"#10b981":f.last_status==="under_review"?"#3b82f6":"#ef4444",fontWeight:"bold",fontSize:"0.8rem"},children:[t.jsx(Ln,{})," ",t.jsx("span",{style:{textTransform:"uppercase"},children:f.last_status.replace("_"," ")})]})]})]})]}),t.jsx("div",{className:"detail-section-p full-width",children:t.jsxs("div",{className:"cv-banner-p",children:[t.jsx("div",{className:"cb-icon",children:t.jsx(yr,{})}),t.jsxs("div",{className:"cb-text",children:[t.jsx("span",{children:"Curriculum Vitae"}),t.jsxs("p",{children:[f.first_name,"_CV_Pool.",(f.cv_path||"").split(".").pop()||"pdf"]})]}),t.jsxs("button",{className:"btn btn-gold",onClick:()=>w(f),children:[t.jsx(cs,{})," View Document"]})]})})]}),t.jsxs("div",{className:"modal-actions-footer-p",style:{borderTop:"1px solid #e2e8f0",background:"#fcfcfd"},children:[t.jsx("button",{className:"btn btn-outline",onClick:()=>h(null),children:"Close Window"}),t.jsxs("a",{href:`mailto:${f.email}?subject=Career Opportunity: George Steuart`,className:"btn btn-gold",style:{background:"var(--gold-accent)",color:"#fff",textDecoration:"none"},children:[t.jsx(lr,{})," Send Outreach Email"]})]})]})]})}),_&&(()=>{const W=`${jt}/applications.php?action=view_cv&file=${encodeURIComponent(_.cv_path)}`,X=(_.cv_path||"").split(".").pop().toLowerCase(),ne=X==="pdf",R=X==="docx"||X==="doc";return t.jsx("div",{className:"confirm-overlay",style:{zIndex:1200},onClick:()=>w(null),children:t.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:z=>z.stopPropagation(),style:{maxWidth:"950px",width:"95%",height:"90vh",padding:0,textAlign:"left",borderRadius:"24px",overflow:"hidden",display:"flex",flexDirection:"column"},children:[t.jsxs("div",{style:{background:"linear-gradient(135deg, #2a050b 0%, var(--crimson-dark) 100%)",padding:"20px 32px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"14px"},children:[t.jsx("div",{style:{width:"42px",height:"42px",borderRadius:"12px",background:"rgba(200,169,81,0.15)",border:"1px solid rgba(200,169,81,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gold-accent)",fontSize:"1.2rem"},children:t.jsx(yr,{})}),t.jsxs("div",{children:[t.jsxs("h3",{style:{margin:0,color:"#fff",fontSize:"1.1rem",fontWeight:700},children:[_.first_name," ",_.last_name," — CV"]}),t.jsxs("p",{style:{margin:"2px 0 0",color:"rgba(255,255,255,0.5)",fontSize:"0.75rem",textTransform:"uppercase",letterSpacing:"0.5px"},children:[X.toUpperCase()," Document"]})]})]}),t.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:[t.jsxs("a",{href:W,download:!0,className:"btn",style:{background:"rgba(255,255,255,0.1)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",padding:"8px 16px",borderRadius:"10px",fontSize:"0.8rem",fontWeight:700,display:"flex",alignItems:"center",gap:"6px",textDecoration:"none"},onClick:z=>z.stopPropagation(),children:[t.jsx(ss,{size:14})," Download"]}),t.jsx("button",{onClick:()=>w(null),style:{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",width:"36px",height:"36px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1.1rem"},children:t.jsx(bt,{})})]})]}),t.jsxs("div",{style:{flex:1,overflow:"hidden",background:"#f1f5f9"},children:[ne&&t.jsx("iframe",{src:W,style:{width:"100%",height:"100%",border:"none"},title:"CV Preview"}),R&&t.jsx(v1,{url:W}),!ne&&!R&&t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:"16px",color:"var(--text-muted)"},children:[t.jsx(Ln,{size:48}),t.jsxs("p",{style:{fontWeight:600},children:["Unsupported file format (.",X,")"]}),t.jsxs("a",{href:W,download:!0,className:"btn btn-gold",style:{textDecoration:"none"},children:[t.jsx(ss,{})," Download to View"]})]})]})]})})})(),P&&t.jsx("div",{className:"confirm-overlay animated-fade-in",style:{zIndex:1210},onClick:()=>T(null),children:t.jsxs("div",{className:"confirm-modal card-p animated-zoom",onClick:W=>W.stopPropagation(),style:{maxWidth:"400px",textAlign:"center",padding:"40px"},children:[t.jsx("div",{className:"warning-visual",style:{color:"#ef4444",background:"rgba(239, 68, 68, 0.1)",width:"60px",height:"60px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px auto",fontSize:"1.5rem"},children:t.jsx(fs,{})}),t.jsx("h2",{style:{fontSize:"1.4rem",marginBottom:"10px",color:"var(--text-primary)"},children:"Remove Candidate?"}),t.jsxs("p",{style:{color:"var(--text-secondary)",marginBottom:"30px",fontSize:"0.9rem",lineHeight:"1.5"},children:["Are you sure you want to remove ",t.jsx("strong",{children:P.first_name})," from the talent pool? This action cannot be undone."]}),t.jsxs("div",{style:{display:"flex",gap:"12px"},children:[t.jsx("button",{className:"btn btn-outline",onClick:()=>T(null),style:{flex:1,padding:"12px"},children:"Cancel"}),t.jsx("button",{className:"btn",onClick:A,disabled:C,style:{flex:1,background:"#ef4444",color:"#fff",border:"none",padding:"12px"},children:C?"Removing...":"Confirm Remove"})]})]})}),t.jsx("style",{jsx:"true",children:`
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
            `})]})}function y1({admin:s}){const[a,n]=U.useState([]),[o,l]=U.useState([]),[d,u]=U.useState(!0),[f,h]=U.useState(!1),[b,g]=U.useState(null),[j,S]=U.useState(null),[_,w]=U.useState(null),[x,v]=U.useState(null),[N,P]=U.useState({username:"",email:"",full_name:"",role:"sub_admin",company_id:"",is_active:1}),[T,C]=U.useState(""),[L,F]=U.useState(""),[M,G]=U.useState(1),H=8;U.useEffect(()=>{pe()},[]);const pe=async()=>{try{u(!0);const[z,J]=await Promise.all([Mv(),In()]);n(z.data.data||[]),l(J.data.data||[])}catch(z){console.error(z)}finally{u(!1)}},te=()=>{P({username:"",email:"",full_name:"",role:"sub_admin",company_id:"",is_active:1}),g(null)},A=()=>{te(),h(!0)},K=z=>{P({username:z.username,email:z.email,full_name:z.full_name,role:z.role,company_id:z.company_id||"",is_active:parseInt(z.is_active)}),g(z.id),h(!0)},k=async z=>{var J,ie;if(z.preventDefault(),!N.full_name||!N.email||!N.username){ve.error("Please fill in all required fields");return}if(N.role==="sub_admin"&&!N.company_id){ve.error("Company is required for sub admin");return}try{if(b){const oe={...N,id:b};await Wv(oe),ve.success("Admin updated"),h(!1),te()}else{const oe=await Uv(N);ve.success("Admin created"),v(oe.data.data.temp_password),h(!1),te()}pe()}catch(oe){ve.error(((ie=(J=oe.response)==null?void 0:J.data)==null?void 0:ie.message)||"Operation failed")}},se=async z=>{var J,ie;try{await $v({id:z}),ve.success("Admin deleted"),S(null),pe()}catch(oe){ve.error(((ie=(J=oe.response)==null?void 0:J.data)==null?void 0:ie.message)||"Delete failed")}},ye=async z=>{var J,ie;try{const oe=await Hv({id:z});ve.success("Password reset successfully"),v(oe.data.data.temp_password),w(null)}catch(oe){ve.error(((ie=(J=oe.response)==null?void 0:J.data)==null?void 0:ie.message)||"Reset failed")}};U.useEffect(()=>{G(1)},[T,L]);const re=a.filter(z=>{var oe,_e,Te;const J=((oe=z.full_name)==null?void 0:oe.toLowerCase().includes(T.toLowerCase()))||((_e=z.email)==null?void 0:_e.toLowerCase().includes(T.toLowerCase()))||((Te=z.username)==null?void 0:Te.toLowerCase().includes(T.toLowerCase())),ie=!L||z.role===L;return J&&ie}),W=Math.ceil(re.length/H),X=(M-1)*H,ne=re.slice(X,X+H),R={total:a.length,super:a.filter(z=>z.role==="super_admin").length,sub:a.filter(z=>z.role==="sub_admin").length,active:a.filter(z=>z.is_active).length,companies:new Set(a.filter(z=>z.company_id).map(z=>z.company_id)).size};return t.jsxs("div",{className:"premium-admins-page",children:[t.jsxs("div",{className:"dashboard-hero-premium",children:[t.jsxs("div",{className:"hero-content-p",children:[t.jsxs("div",{className:"hero-badge-p",children:[t.jsx(mh,{})," System Executive Suite"]}),t.jsx("h1",{className:"hero-title-p",children:"Access Management"}),t.jsx("p",{className:"hero-subtitle-p",children:"George Steuart Recruitment Orchestration | Identity & Access Control"})]}),t.jsx("div",{className:"hero-actions-p",children:t.jsxs("button",{className:"btn-hero-p primary",onClick:A,children:[t.jsx(us,{})," Establish New Admin"]})}),t.jsx("div",{className:"hero-bg-accent"})]}),t.jsxs("div",{className:"stats-mosaic-grid admin-grid-4",children:[t.jsxs("div",{className:"stat-glass-card gold",children:[t.jsx("div",{className:"s-icon",children:t.jsx(cr,{})}),t.jsxs("div",{className:"s-info",children:[t.jsx("span",{className:"s-label",children:"Total Administrators"}),t.jsx("span",{className:"s-value",children:R.total})]}),t.jsxs("div",{className:"s-trend",children:[t.jsx(bh,{})," Global Registry"]})]}),t.jsxs("div",{className:"stat-glass-card green",children:[t.jsx("div",{className:"s-icon",children:t.jsx(At,{})}),t.jsxs("div",{className:"s-info",children:[t.jsx("span",{className:"s-label",children:"Strategic (Super)"}),t.jsx("span",{className:"s-value",children:R.super})]}),t.jsx("div",{className:"s-trend positive",children:"Root Authority"})]}),t.jsxs("div",{className:"stat-glass-card blue",children:[t.jsx("div",{className:"s-icon",children:t.jsx(vc,{})}),t.jsxs("div",{className:"s-info",children:[t.jsx("span",{className:"s-label",children:"Operational (Sub)"}),t.jsx("span",{className:"s-value",children:R.sub})]}),t.jsx("div",{className:"s-trend",children:"Company Scoped"})]}),t.jsxs("div",{className:"stat-glass-card purple",children:[t.jsx("div",{className:"s-icon",children:t.jsx(ps,{})}),t.jsxs("div",{className:"s-info",children:[t.jsx("span",{className:"s-label",children:"Active Organizations"}),t.jsx("span",{className:"s-value",children:R.companies})]}),t.jsx("div",{className:"s-trend",children:"Stakeholders"})]})]}),t.jsxs("div",{className:"console-toolbar-p",children:[t.jsxs("div",{className:"toolbar-search-row",children:[t.jsxs("div",{className:"search-orchestrator",children:[t.jsx(ua,{className:"s-icon"}),t.jsx("input",{id:"admin_search",name:"admin_search",type:"text",placeholder:"Search by name, email, or @handle...",value:T,onChange:z=>C(z.target.value)})]}),t.jsxs("button",{className:"btn-reset-p",onClick:()=>{C(""),F("")},children:[t.jsx(bt,{})," ",t.jsx("span",{children:"Reset Registry"})]})]}),t.jsx("div",{className:"toolbar-filters-row",children:t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{children:"Authority Role"}),t.jsxs("div",{className:"select-orchestrator",children:[t.jsx(Oc,{className:"f-icon"}),t.jsxs("select",{id:"role_filter",name:"role_filter",value:L,onChange:z=>F(z.target.value),className:"select-lg",children:[t.jsx("option",{value:"",children:"All Authority Roles"}),t.jsx("option",{value:"super_admin",children:"Super Admins Only"}),t.jsx("option",{value:"sub_admin",children:"Sub Admins Only"})]})]})]})})]}),t.jsxs("div",{className:"results-card-p orchestration-container",children:[t.jsxs("div",{className:"orchestration-header",style:{flexWrap:"wrap",gap:"20px",padding:"24px 32px"},children:[t.jsxs("div",{className:"h-left",children:[t.jsx("h3",{style:{fontSize:"1.4rem"},children:"Identity Audit Log"}),t.jsx("p",{style:{fontSize:"0.85rem"},children:"Authorized access points and administrative signatures."})]}),t.jsx("div",{className:"h-right",children:t.jsxs("span",{className:"count-badge",children:[re.length," Profiles Identified"]})})]}),t.jsx("div",{className:"table-wrapper-p",children:t.jsxs("table",{className:"premium-table orchestration-table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"IDENTIFIER"}),t.jsx("th",{children:"AUTHORITY LEVEL"}),t.jsx("th",{children:"SCOPE OF ACCESS"}),t.jsx("th",{children:"SYSTEM STATUS"}),t.jsx("th",{style:{textAlign:"center"},children:"OPERATIONS"})]})}),t.jsx("tbody",{children:d?t.jsx("tr",{children:t.jsxs("td",{colSpan:"5",style:{padding:"60px",textAlign:"center"},children:[t.jsx("div",{className:"spinner-p"}),t.jsx("p",{style:{marginTop:"16px",color:"var(--text-muted)"},children:"Synchronizing administrator registry..."})]})}):ne.length===0?t.jsx("tr",{children:t.jsx("td",{colSpan:"5",className:"empty-cell",children:t.jsxs("div",{className:"no-results",style:{padding:"60px",textAlign:"center"},children:[t.jsx(cr,{size:48,style:{color:"var(--border-light)",marginBottom:"16px"}}),t.jsx("p",{style:{color:"var(--text-muted)"},children:"No administrative profiles match your current decryption criteria."})]})})}):ne.map(z=>t.jsxs("tr",{className:"orchestration-row",children:[t.jsx("td",{"data-label":"Identifier",children:t.jsxs("div",{className:"admin-identity-cell",children:[t.jsx("div",{className:"admin-avatar-p",children:z.full_name.split(" ").map(J=>J[0]).join("").substring(0,2).toUpperCase()}),t.jsxs("div",{className:"admin-info-p",children:[t.jsx("span",{className:"admin-name-p",children:z.full_name}),t.jsxs("span",{className:"admin-email-p",children:[t.jsx(lr,{size:11})," ",z.email]})]})]})}),t.jsx("td",{"data-label":"Authority Level",children:t.jsxs("div",{className:"role-cell",children:[t.jsx("span",{className:`role-badge-p ${z.role==="super_admin"?"role-super":"role-sub"}`,children:z.role==="super_admin"?"Super Admin":"Sub Admin"}),t.jsxs("div",{className:"admin-email-p",style:{marginTop:"4px"},children:["@",z.username]})]})}),t.jsx("td",{"data-label":"Scope of Access",children:t.jsx("div",{className:"company-cell",style:{fontSize:"0.9rem",color:"var(--text-secondary)"},children:z.company_name?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t.jsx(Ic,{size:13,style:{color:"var(--gold-accent)"}})," ",z.company_name]}):t.jsx("span",{className:"all-access",style:{fontWeight:700,color:"var(--crimson)",fontSize:"0.75rem",textTransform:"uppercase",letterSpacing:"0.5px"},children:"System-wide Access"})})}),t.jsx("td",{"data-label":"System Status",children:t.jsx("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:t.jsx("span",{className:`status-pill ${z.is_active?"active":"inactive"}`,style:{padding:"4px 12px",borderRadius:"100px",fontSize:"0.7rem",fontWeight:800,background:z.is_active?"#ecfdf5":"#fef2f2",color:z.is_active?"#10b981":"#ef4444"},children:z.is_active?"Active":"Decommissioned"})})}),t.jsx("td",{"data-label":"Operations",children:t.jsx("div",{className:"orchestration-actions",style:{display:"flex",justifyContent:"center",gap:"8px"},children:z.role!=="super_admin"?t.jsxs(t.Fragment,{children:[t.jsx("button",{className:"o-btn edit",onClick:()=>K(z),title:"Update Credentials",children:t.jsx(xc,{})}),t.jsx("button",{className:"o-btn reset",onClick:()=>w(z),title:"Reset Password",style:{color:"var(--gold-accent)"},children:t.jsx(cf,{})}),t.jsx("button",{className:"o-btn delete",onClick:()=>S(z),title:"Decommission Profile",children:t.jsx(fs,{})})]}):t.jsxs("div",{className:"protected-label",style:{fontSize:"0.7rem",fontWeight:800,color:"var(--crimson)",display:"flex",alignItems:"center",gap:"6px"},children:[t.jsx(At,{})," CORE AUTHORITY"]})})})]},z.id))})]})}),t.jsxs("div",{className:"pagination-footer",children:[t.jsxs("div",{className:"page-info",children:["Showing ",t.jsxs("strong",{children:[X+1,"-",Math.min(X+H,re.length)]})," of ",t.jsx("strong",{children:re.length})," administrators"]}),t.jsxs("div",{className:"pagination-controls",style:{display:"flex",gap:"12px"},children:[t.jsxs("button",{className:"page-btn",onClick:()=>G(z=>Math.max(z-1,1)),disabled:M===1,title:"Previous Page",children:[t.jsx(ao,{})," Previous"]}),t.jsxs("button",{className:"page-btn",onClick:()=>G(z=>Math.min(z+1,W)),disabled:M===W||W===0,title:"Next Page",children:["Next ",t.jsx(Dr,{})]})]})]})]}),f&&t.jsx("div",{className:"modal-overlay-p",onClick:()=>h(!1),children:t.jsxs("div",{className:"admin-modal-p confirm-modal card-p animated-zoom",onClick:z=>z.stopPropagation(),style:{maxWidth:"800px",width:"90%",textAlign:"left",overflow:"hidden"},children:[t.jsxs("div",{className:"modal-header-p",style:{padding:"24px 32px",borderBottom:"1px solid #f1f5f9"},children:[t.jsx("h2",{style:{fontSize:"1.5rem",margin:0},children:b?"Update Credentials":"Create Administrator"}),t.jsx("button",{className:"close-btn-p",onClick:()=>h(!1),children:t.jsx(bt,{})})]}),t.jsxs("form",{onSubmit:k,children:[t.jsx("div",{className:"modal-body-p",style:{padding:"32px",overflowY:"auto",maxHeight:"70vh"},children:t.jsxs("div",{className:"form-grid-p",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"20px"},children:[t.jsxs("div",{className:"form-group-p full-width",style:{gridColumn:"1 / -1"},children:[t.jsx("label",{htmlFor:"full_name",children:"Full Name"}),t.jsxs("div",{className:"input-with-icon",children:[t.jsx(cr,{className:"i"}),t.jsx("input",{id:"full_name",name:"full_name",type:"text",value:N.full_name,onChange:z=>P({...N,full_name:z.target.value}),placeholder:"e.g. John Doe",required:!0})]})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"username",children:"Username"}),t.jsx("input",{id:"username",name:"username",type:"text",value:N.username,onChange:z=>P({...N,username:z.target.value}),placeholder:"username",disabled:!!b,required:!0})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"email",children:"Email Address"}),t.jsx("input",{id:"email",name:"email",type:"email",value:N.email,onChange:z=>P({...N,email:z.target.value}),placeholder:"name@georgesteuart.com",required:!0})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"role",children:"System Role"}),t.jsxs("select",{id:"role",name:"role",value:N.role,onChange:z=>P({...N,role:z.target.value}),children:[t.jsx("option",{value:"sub_admin",children:"Sub Admin"}),t.jsx("option",{value:"super_admin",children:"Super Admin"})]})]}),N.role==="sub_admin"&&t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"company_id",children:"Assign Company"}),t.jsxs("select",{id:"company_id",name:"company_id",value:N.company_id,onChange:z=>P({...N,company_id:z.target.value}),required:!0,children:[t.jsx("option",{value:"",children:"Select company"}),o.map(z=>t.jsx("option",{value:z.id,children:z.name},z.id))]})]}),b&&t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"is_active",children:"Account Status"}),t.jsxs("select",{id:"is_active",name:"is_active",value:N.is_active,onChange:z=>P({...N,is_active:parseInt(z.target.value)}),children:[t.jsx("option",{value:1,children:"Active"}),t.jsx("option",{value:0,children:"Inactive"})]})]})]})}),t.jsxs("div",{className:"modal-footer-p",children:[t.jsx("button",{type:"button",className:"btn-cancel-p",onClick:()=>h(!1),children:"Cancel"}),t.jsx("button",{type:"submit",className:"btn btn-gold",children:b?"Update Access":"Provision Account"})]})]})]})}),j&&t.jsx("div",{className:"modal-overlay-p",onClick:()=>S(null),children:t.jsxs("div",{className:"delete-modal-p",onClick:z=>z.stopPropagation(),children:[t.jsx("div",{className:"alert-vibe",children:t.jsx(Ln,{})}),t.jsx("h3",{children:"Revoke Access?"}),t.jsxs("p",{children:["You are about to delete ",t.jsx("strong",{children:j.full_name}),". This person will immediately lose all administrative access."]}),t.jsxs("div",{className:"delete-actions-p",children:[t.jsx("button",{className:"btn-cancel-p",onClick:()=>S(null),children:"No, Keep"}),t.jsx("button",{className:"btn btn-danger",onClick:()=>se(j.id),children:"Yes, Revoke Access"})]})]})}),_&&t.jsx("div",{className:"modal-overlay-p",onClick:()=>w(null),children:t.jsxs("div",{className:"delete-modal-p",onClick:z=>z.stopPropagation(),children:[t.jsx("div",{className:"alert-vibe",style:{background:"rgba(200, 169, 81, 0.1)",color:"var(--gold-accent)"},children:t.jsx(cf,{})}),t.jsx("h3",{children:"Reset Password?"}),t.jsxs("p",{children:["You are about to generate a new temporary password for ",t.jsx("strong",{children:_.full_name}),". Their current password will stop working immediately."]}),t.jsxs("div",{className:"delete-actions-p",children:[t.jsx("button",{className:"btn-cancel-p",onClick:()=>w(null),children:"Cancel"}),t.jsx("button",{className:"btn btn-gold",onClick:()=>ye(_.id),children:"Generate New Password"})]})]})}),x&&t.jsx("div",{className:"modal-overlay-p",children:t.jsxs("div",{className:"success-modal-p",children:[t.jsx("div",{className:"success-vibe",children:t.jsx(Zt,{})}),t.jsx("h3",{children:"Account Provisioned"}),t.jsx("p",{children:"Access has been created. Use this temporary password for the first login:"}),t.jsxs("div",{className:"password-display-p",style:{position:"relative",cursor:"pointer"},onClick:()=>{navigator.clipboard.writeText(x),ve.success("Password copied to tactical clipboard")},title:"Click to Copy",children:[x,t.jsx("div",{className:"copy-hint",style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"0.8rem",opacity:.5},children:t.jsx(rb,{})})]}),t.jsx("p",{className:"note-p",children:"This password will expire after one-time use."}),t.jsx("button",{className:"btn btn-gold full-btn",onClick:()=>v(null),children:"Done. I have copied it."})]})}),t.jsx("style",{jsx:"true",children:`
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
            `})]})}function w1(){const s=Ot(),[a,n]=U.useState({current_password:"",new_password:"",confirm_password:""}),[o,l]=U.useState(!1),d=async u=>{var f,h;if(u.preventDefault(),!a.current_password||!a.new_password||!a.confirm_password){ve.error("All fields are required");return}if(a.new_password!==a.confirm_password){ve.error("New passwords do not match");return}if(a.new_password.length<6){ve.error("Password must be at least 6 characters long");return}l(!0);try{await He.post("/auth.php?action=change-password",{current_password:a.current_password,new_password:a.new_password}),ve.success("Security Profile Updated. Re-Authorizing..."),localStorage.removeItem("gs_admin_token"),localStorage.removeItem("gs_admin_data"),setTimeout(()=>{s("/admin/login")},1500)}catch(b){ve.error(((h=(f=b.response)==null?void 0:f.data)==null?void 0:h.message)||"Failed to change password"),l(!1)}};return t.jsxs("div",{className:"login-split-page",children:[t.jsxs("div",{className:"login-branding-panel",children:[t.jsx("div",{className:"branding-overlay"}),t.jsx("img",{src:"/admin-branding.png",alt:"Branding",className:"branding-bg"}),t.jsxs("div",{className:"branding-content",children:[t.jsx("img",{src:"/gs-logo.png",alt:"GS Logo",className:"branding-logo"}),t.jsxs("div",{className:"branding-text",children:[t.jsx("span",{className:"est-badge",children:"SECURITY PROTOCOL"}),t.jsxs("h1",{className:"serif-title",children:["Protect. ",t.jsx("br",{}),"Validate. ",t.jsx("br",{}),"Secure."]}),t.jsx("p",{children:"Credentials Update | George Steuart Recruitment Orchestration"})]}),t.jsx("div",{className:"branding-footer",children:t.jsxs("div",{className:"secure-badge",children:[t.jsx(At,{})," ADVANCED ENCRYPTION ACTIVE"]})})]})]}),t.jsxs("div",{className:"login-form-panel",children:[t.jsxs("button",{className:"back-home-minimal",onClick:()=>s("/admin/login"),children:[t.jsx(Mr,{})," Return to Login"]}),t.jsxs("div",{className:"login-glass-container animated-fade-in",children:[t.jsxs("div",{className:"login-header-p",children:[t.jsx("div",{className:"access-icon",children:t.jsx(da,{})}),t.jsx("h2",{children:"Update Credentials"}),t.jsx("p",{children:"You are using a temporary password. Please establish a permanent secure passphrase."})]}),t.jsxs("form",{className:"premium-login-form",onSubmit:d,children:[t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"current_password",children:[t.jsx(da,{})," TEMPORARY PASSWORD"]}),t.jsx("input",{id:"current_password",name:"current_password",type:"password",autoComplete:"current-password",placeholder:"Enter current/temp password",value:a.current_password,onChange:u=>n({...a,current_password:u.target.value}),required:!0})]}),t.jsx("div",{style:{padding:"10px 0",borderBottom:"1px solid #f1f5f9",marginBottom:"20px"}}),t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"new_password",children:[t.jsx(At,{})," NEW SECURE PASSWORD"]}),t.jsx("input",{id:"new_password",name:"new_password",type:"password",autoComplete:"new-password",placeholder:"Min 6 characters",value:a.new_password,onChange:u=>n({...a,new_password:u.target.value}),required:!0})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"confirm_password",children:[t.jsx(At,{})," CONFIRM PASSWORD"]}),t.jsx("input",{id:"confirm_password",name:"confirm_password",type:"password",autoComplete:"new-password",placeholder:"Repeat new password",value:a.confirm_password,onChange:u=>n({...a,confirm_password:u.target.value}),required:!0})]}),t.jsx("button",{type:"submit",className:"login-btn-premium",disabled:o,children:o?t.jsx("div",{className:"spinner-small"}):t.jsxs(t.Fragment,{children:["ACTIVATE NEW CREDENTIALS ",t.jsx(Zt,{style:{marginLeft:8}})]})})]})]}),t.jsx("div",{className:"login-footer-p",children:"© 2026 George Steuart & Company Limited. Security Governance."})]}),t.jsx("style",{jsx:"true",children:`
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
            `})]})}function j1(){const s=Ot(),a=jr(),[n,o]=U.useState(""),[l,d]=U.useState(1),[u,f]=U.useState(!1),[h,b]=U.useState(null),[g,j]=U.useState(!1),[S,_]=U.useState(""),[w,x]=U.useState({password:"",confirm:""});U.useEffect(()=>{const F=new URLSearchParams(a.search).get("username");F&&l===1&&v(F)},[a]);const v=async L=>{var F,M;j(!0),f(!0);try{const G=await af({username:L});o(G.data.data.email),d(2)}catch(G){ve.error(((M=(F=G.response)==null?void 0:F.data)==null?void 0:M.message)||"Identity verification failed")}finally{f(!1),j(!1)}},N=async L=>{if(L.preventDefault(),!n){ve.error("Please enter your administrative email");return}f(!0);try{await af({username:n.split("@")[0]}),d(2)}catch{ve.error("Identity verification failed. Please check the email.")}finally{f(!1)}},P=async L=>{var F,M;b(L),f(!0);try{await _v({email:n,type:L}),d(L==="code"?4:3),ve.success(`Recovery ${L==="link"?"link":"code"} dispatched.`)}catch(G){ve.error(((M=(F=G.response)==null?void 0:F.data)==null?void 0:M.message)||"Failed to dispatch recovery info")}finally{f(!1)}},T=async L=>{var F,M;if(L.preventDefault(),S.length!==6){ve.error("Please enter the 6-digit code");return}f(!0);try{await oh(S),d(5)}catch(G){ve.error(((M=(F=G.response)==null?void 0:F.data)==null?void 0:M.message)||"Invalid or expired code")}finally{f(!1)}},C=async L=>{var F,M;if(L.preventDefault(),w.password!==w.confirm){ve.error("Passwords do not match");return}if(w.password.length<6){ve.error("Password must be at least 6 characters");return}f(!0);try{await lh({code:S,password:w.password}),d(6),ve.success("System credentials synchronized. Access restored.")}catch(G){ve.error(((M=(F=G.response)==null?void 0:F.data)==null?void 0:M.message)||"Failed to update credentials")}finally{f(!1)}};return t.jsxs("div",{className:"login-split-page",children:[t.jsxs("div",{className:"login-branding-panel",children:[t.jsx("div",{className:"branding-overlay"}),t.jsx("img",{src:"/admin-branding.png",alt:"Branding",className:"branding-bg"}),t.jsxs("div",{className:"branding-content",children:[t.jsx("img",{src:"/gs-logo.png",alt:"GS Logo",className:"branding-logo"}),t.jsxs("div",{className:"branding-text",children:[t.jsx("span",{className:"est-badge",children:"ESTD 1835"}),t.jsxs("h1",{className:"serif-title",children:["Heritage. ",t.jsx("br",{}),"Trust. ",t.jsx("br",{}),"Excellence."]}),t.jsx("p",{children:"Recruitment Platform v4.0"})]}),t.jsx("div",{className:"branding-footer",children:t.jsxs("div",{className:"secure-badge",children:[t.jsx(At,{})," SECURED END-TO-END"]})})]})]}),t.jsxs("div",{className:"login-form-panel",children:[t.jsxs("button",{className:"back-home-minimal",onClick:()=>s("/admin/login"),children:[t.jsx(Mr,{})," Back to Login"]}),t.jsxs("div",{className:"login-glass-container animated-fade-in",children:[t.jsxs("div",{className:"recovery-stepper",children:[t.jsxs("div",{className:`step ${l>=1?"active":""} ${l>1?"completed":""}`,children:[t.jsx("div",{className:"step-number",children:"1"}),t.jsx("span",{className:"step-label",children:"Identify"})]}),t.jsx("div",{className:"step-line"}),t.jsxs("div",{className:`step ${l>=2?"active":""} ${l>2?"completed":""}`,children:[t.jsx("div",{className:"step-number",children:"2"}),t.jsx("span",{className:"step-label",children:"Method"})]}),t.jsx("div",{className:"step-line"}),t.jsxs("div",{className:`step ${l>=3?"active":""}`,children:[t.jsx("div",{className:"step-number",children:"3"}),t.jsx("span",{className:"step-label",children:"Finish"})]})]}),l===1&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"login-header-p",children:[t.jsx("div",{className:"access-icon",children:g?t.jsx("div",{className:"spinner-small",style:{borderTopColor:"var(--crimson)"}}):t.jsx(vh,{})}),t.jsx("h2",{children:g?"Orchestrating Identity":"Reset Password"}),t.jsx("p",{children:g?"Verifying your administrative handle and locating recovery channels...":"Enter your email address and we'll help you get back into your account."})]}),!g&&t.jsxs("form",{className:"premium-login-form",onSubmit:N,children:[t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"recovery_email",children:[t.jsx(lr,{})," ADMINISTRATIVE EMAIL"]}),t.jsx("input",{id:"recovery_email",name:"recovery_email",type:"email",placeholder:"name@georgesteuart.com",autoComplete:"email",value:n,onChange:L=>o(L.target.value),required:!0})]}),t.jsxs("div",{className:"recovery-note-p",children:[t.jsx(At,{size:14}),t.jsx("span",{children:"For security, all password reset requests are monitored by system administrators."})]}),t.jsx("button",{type:"submit",className:"login-btn-premium",disabled:u,children:u?t.jsx("div",{className:"spinner-small"}):t.jsxs(t.Fragment,{children:["CONTINUE TO OPTIONS ",t.jsx(tc,{style:{marginLeft:8}})]})})]})]}),l===2&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"login-header-p",children:[t.jsx("div",{className:"access-icon",children:t.jsx(At,{})}),t.jsx("h2",{children:"Choose a Method"}),t.jsx("p",{children:"How would you like to receive your password reset information?"})]}),t.jsxs("div",{className:"recovery-methods-grid",children:[t.jsxs("div",{className:"method-card-p",onClick:()=>P("link"),children:[t.jsx("div",{className:"m-icon",children:t.jsx(tc,{})}),t.jsxs("div",{className:"m-info",children:[t.jsx("h3",{children:"Send Email Link"}),t.jsx("p",{children:"We'll send a secure button to your inbox that you can click to reset instantly."})]}),t.jsx("div",{className:"m-arrow",children:"→"})]}),t.jsxs("div",{className:"method-card-p",onClick:()=>P("code"),children:[t.jsx("div",{className:"m-icon",children:t.jsx(At,{})}),t.jsxs("div",{className:"m-info",children:[t.jsx("h3",{children:"Get Reset Code"}),t.jsx("p",{children:"We'll send a 6-digit security code that you can enter manually to verify."})]}),t.jsx("div",{className:"m-arrow",children:"→"})]})]}),t.jsx("button",{className:"btn-text-only",onClick:()=>d(1),children:"← Use a different email address"})]}),l===3&&t.jsxs("div",{className:"success-state-p",children:[t.jsx("div",{className:"success-icon-p",children:t.jsx(tc,{})}),t.jsx("h2",{children:"Check Your Email"}),t.jsxs("p",{children:["We've sent a ",t.jsx("strong",{children:"Reset Link"})," to your email. Please check your inbox (and spam folder) and follow the instructions to reset your password."]}),t.jsx("button",{className:"login-btn-premium",onClick:()=>s("/admin/login"),children:"RETURN TO LOGIN"})]}),l===4&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"login-header-p",children:[t.jsx("div",{className:"access-icon",children:t.jsx(At,{})}),t.jsx("h2",{children:"Verify Identity"}),t.jsxs("p",{children:["Enter the 6-digit security code sent to ",t.jsx("strong",{children:n})]})]}),t.jsxs("form",{className:"premium-login-form",onSubmit:T,children:[t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"recovery_code",children:"SECURITY CODE"}),t.jsx("input",{id:"recovery_code",name:"recovery_code",type:"text",placeholder:"0 0 0 0 0 0",maxLength:"6",className:"code-input-p",autoComplete:"one-time-code",value:S,onChange:L=>_(L.target.value.replace(/\D/g,"")),required:!0})]}),t.jsx("button",{type:"submit",className:"login-btn-premium",disabled:u,children:u?t.jsx("div",{className:"spinner-small"}):"VERIFY CODE"}),t.jsxs("div",{className:"resend-container-p",children:[t.jsx("p",{children:"Didn't receive a code?"}),t.jsx("button",{type:"button",className:"btn-text-only",onClick:()=>P("code"),disabled:u,children:"Resend Code"})]})]})]}),l===5&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"login-header-p",children:[t.jsx("div",{className:"access-icon",children:t.jsx(At,{})}),t.jsx("h2",{children:"New Credentials"}),t.jsx("p",{children:"Create a strong password for your administrative account."})]}),t.jsxs("form",{className:"premium-login-form",onSubmit:C,children:[t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"new_password",children:"NEW PASSWORD"}),t.jsx("input",{id:"new_password",name:"new_password",type:"password",autoComplete:"new-password",placeholder:"Min. 6 characters",value:w.password,onChange:L=>x({...w,password:L.target.value}),required:!0})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsx("label",{htmlFor:"confirm_password",children:"CONFIRM PASSWORD"}),t.jsx("input",{id:"confirm_password",name:"confirm_password",type:"password",autoComplete:"new-password",placeholder:"Repeat your password",value:w.confirm,onChange:L=>x({...w,confirm:L.target.value}),required:!0})]}),t.jsx("button",{type:"submit",className:"login-btn-premium",disabled:u,children:u?t.jsx("div",{className:"spinner-small"}):"SYNCHRONIZE CREDENTIALS"})]})]}),l===6&&t.jsxs("div",{className:"success-state-p",children:[t.jsx("div",{className:"success-icon-p",style:{background:"#f0fdf4",color:"#16a34a"},children:t.jsx(Zt,{})}),t.jsx("h2",{children:"Success!"}),t.jsx("p",{children:"Your password has been updated and synchronized across all George Steuart security nodes. Use your new credentials to access the console."}),t.jsx("button",{className:"login-btn-premium",onClick:()=>s("/admin/login"),children:"RETURN TO LOGIN"})]}),t.jsxs("div",{className:"signup-redirect",children:["Need immediate assistance? ",t.jsx("a",{href:"mailto:admin-support@georgesteuart.com",children:"Contact Strategic Support"})]})]}),t.jsx("div",{className:"login-footer-p",children:"© 2026 George Steuart & Company Limited. All Rights Reserved."})]}),t.jsx("style",{jsx:"true",children:`
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
            `})]})}function k1(){const s=Ot(),a=jr(),[n,o]=U.useState(""),[l,d]=U.useState(""),[u,f]=U.useState({password:"",confirmPassword:""}),[h,b]=U.useState("verifying"),[g,j]=U.useState(!1);U.useEffect(()=>{const x=new URLSearchParams(a.search).get("token");if(!x){b("error");return}o(x),S(x)},[a]);const S=async w=>{var x,v;try{const N=await oh(w);d(N.data.data.email),b("form")}catch(N){b("error"),ve.error(((v=(x=N.response)==null?void 0:x.data)==null?void 0:v.message)||"Invalid or expired reset link")}},_=async w=>{var x,v;if(w.preventDefault(),u.password!==u.confirmPassword){ve.error("Passwords do not match");return}if(u.password.length<6){ve.error("Password must be at least 6 characters");return}j(!0);try{await lh({token:n,password:u.password}),b("success"),ve.success("System credentials synchronized. Access restored.")}catch(N){ve.error(((v=(x=N.response)==null?void 0:x.data)==null?void 0:v.message)||"Failed to update credentials")}finally{j(!1)}};return t.jsxs("div",{className:"login-split-page",children:[t.jsxs("div",{className:"login-branding-panel",children:[t.jsx("div",{className:"branding-overlay"}),t.jsx("img",{src:"/admin-branding.png",alt:"Branding",className:"branding-bg"}),t.jsxs("div",{className:"branding-content",children:[t.jsx("img",{src:"/gs-logo.png",alt:"GS Logo",className:"branding-logo"}),t.jsxs("div",{className:"branding-text",children:[t.jsx("span",{className:"est-badge",children:"SECURITY PROTOCOL"}),t.jsxs("h1",{className:"serif-title",children:["Credential ",t.jsx("br",{}),"Renewal ",t.jsx("br",{}),"Gateway."]}),t.jsx("p",{children:"Recruitment Orchestration Console v4.0"})]})]})]}),t.jsx("div",{className:"login-form-panel",children:t.jsxs("div",{className:"login-glass-container animated-fade-in",children:[h==="verifying"&&t.jsxs("div",{className:"recovery-centering",children:[t.jsx("div",{className:"spinner-large"}),t.jsx("h2",{style:{marginTop:"32px",fontFamily:"var(--font-heading)"},children:"Authenticating Token"}),t.jsx("p",{style:{color:"#64748b"},children:"Verifying secure handshake with heritage servers..."})]}),h==="error"&&t.jsxs("div",{className:"recovery-centering",children:[t.jsx("div",{className:"access-icon",style:{borderColor:"var(--crimson)"},children:t.jsx(Ln,{})}),t.jsx("h2",{style:{fontFamily:"var(--font-heading)"},children:"Link Expired"}),t.jsx("p",{style:{color:"#64748b",marginBottom:"32px"},children:"This reset link is no longer valid or has already been used."}),t.jsxs(qe,{to:"/admin/forgot-password",style:{color:"var(--gold-accent)",fontWeight:700,textDecoration:"none"},children:[t.jsx(Mr,{})," Request a new link"]})]}),h==="form"&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"login-header-p",children:[t.jsx("div",{className:"access-icon",children:t.jsx(At,{})}),t.jsx("h2",{children:"New Credentials"}),t.jsxs("p",{children:["Securing account access for ",t.jsx("strong",{children:l})]})]}),t.jsxs("form",{className:"premium-login-form",onSubmit:_,children:[t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"password",children:[t.jsx(da,{})," NEW SECURITY PASSWORD"]}),t.jsx("input",{id:"password",name:"password",type:"password",autoComplete:"new-password",placeholder:"Min. 6 characters",value:u.password,onChange:w=>f({...u,password:w.target.value}),required:!0})]}),t.jsxs("div",{className:"form-group-p",children:[t.jsxs("label",{htmlFor:"confirmPassword",children:[t.jsx(Zt,{})," CONFIRM PASSWORD"]}),t.jsx("input",{id:"confirmPassword",name:"confirmPassword",type:"password",autoComplete:"new-password",placeholder:"Repeat your password",value:u.confirmPassword,onChange:w=>f({...u,confirmPassword:w.target.value}),required:!0})]}),t.jsx("button",{type:"submit",className:"login-btn-premium",disabled:g,children:g?t.jsx("div",{className:"spinner-small"}):"SYNCHRONIZE CREDENTIALS"})]})]}),h==="success"&&t.jsxs("div",{className:"success-state-p",children:[t.jsx("div",{className:"success-icon-p",style:{background:"#f0fdf4",color:"#16a34a"},children:t.jsx(Zt,{})}),t.jsx("h2",{children:"Success!"}),t.jsx("p",{children:"Your password has been updated. You can now use your new credentials to access the Recruitment Console."}),t.jsx("button",{className:"login-btn-premium",onClick:()=>s("/admin/login"),children:"RETURN TO LOGIN"})]})]})}),t.jsx("style",{jsx:"true",children:`
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
            `})]})}function Sf({children:s}){const[a,n]=U.useState(null),[o,l]=U.useState(!0);return U.useEffect(()=>{if(!localStorage.getItem("gs_admin_token")){l(!1);return}Sv().then(u=>{n(u.data.data.admin),l(!1)}).catch(()=>{localStorage.removeItem("gs_admin_token"),localStorage.removeItem("gs_admin_data"),l(!1)})},[]),o?t.jsx("div",{className:"loading-spinner",children:t.jsx("div",{className:"spinner"})}):a?a.require_password_change&&window.location.pathname!=="/admin/setup-password"?t.jsx(cc,{to:"/admin/setup-password",replace:!0}):s(a):t.jsx(cc,{to:"/admin/login"})}function N1(){return t.jsxs(Dp,{children:[t.jsx(mt,{path:"/",element:t.jsx(gb,{})}),t.jsx(mt,{path:"/vacancies",element:t.jsx(vb,{})}),t.jsx(mt,{path:"/apply/:id",element:t.jsx(Ob,{})}),t.jsx(mt,{path:"/success",element:t.jsx(Fb,{})}),t.jsx(mt,{path:"/admin/login",element:t.jsx(Bb,{})}),t.jsx(mt,{path:"/admin/signup",element:t.jsx(Db,{})}),t.jsx(mt,{path:"/admin/forgot-password",element:t.jsx(j1,{})}),t.jsx(mt,{path:"/admin/reset-password",element:t.jsx(k1,{})}),t.jsx(mt,{path:"/admin/setup-password",element:t.jsx(Sf,{children:()=>t.jsx(w1,{})})}),t.jsx(mt,{path:"/admin/*",element:t.jsx(Sf,{children:s=>t.jsx(Mb,{admin:s,children:t.jsxs(Dp,{children:[t.jsx(mt,{path:"/",element:t.jsx(Wb,{admin:s})}),t.jsx(mt,{path:"/vacancies",element:t.jsx($b,{admin:s})}),t.jsx(mt,{path:"/vacancies/create",element:t.jsx(mf,{admin:s})}),t.jsx(mt,{path:"/vacancies/edit/:id",element:t.jsx(mf,{admin:s})}),t.jsx(mt,{path:"/applicants",element:t.jsx(x1,{admin:s})}),t.jsx(mt,{path:"/talent-pool",element:t.jsx(b1,{admin:s})}),s.role==="super_admin"&&t.jsx(mt,{path:"/admins",element:t.jsx(y1,{admin:s})}),t.jsx(mt,{path:"*",element:t.jsx(cc,{to:"/admin"})})]})})})})]})}$g.createRoot(document.getElementById("root")).render(t.jsx(Ue.StrictMode,{children:t.jsxs(Ux,{children:[t.jsx(N1,{}),t.jsx(zb,{position:"top-right",autoClose:4e3,hideProgressBar:!1,theme:"dark"})]})}));
