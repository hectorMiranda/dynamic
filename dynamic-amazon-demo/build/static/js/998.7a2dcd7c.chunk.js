/*! For license information please see 998.7a2dcd7c.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunk_dynamic_labs_react_18_viem=self.webpackChunk_dynamic_labs_react_18_viem||[]).push([[998],{2972:(t,e,n)=>{function r(t,e){const n=btoa(function(t){let e="";for(let n=0;n<t.length;n+=1)e+=String.fromCharCode(t[n]);return e}(t)).replace(/=/g,"");return e?n.replace(/\+/g,"-").replace(/\//g,"_"):n}function o(){return BigInt("115792089210356248762697446949407573530086143415290314195533631308867097853951")}function i(t){let e=t.toString(16);return e=e.length%2===0?e:"0"+e,function(t){if(t.length%2!=0)throw new Error("Hex string length must be multiple of 2");const e=new Uint8Array(t.length/2);for(let n=0;n<t.length;n+=2)e[n/2]=parseInt(t.substring(n,n+2),16);return e}(e)}function c(t,e){return(t&BigInt(1)<<BigInt(e))!==BigInt(0)}function u(t,e){if(e<=BigInt(0))throw new Error("p must be positive");const n=t%e;if(c(e,0)&&c(e,1)){const t=function(t,e,n){if(e===BigInt(0))return BigInt(1);let r=t;const o=e.toString(2);for(let i=1;i<o.length;++i)r=r*r%n,"1"===o[i]&&(r=r*t%n);return r}(n,e+BigInt(1)>>BigInt(2),e);if(t*t%e!==n)throw new Error("could not find a modular square root");return t}throw new Error("unsupported modulus value")}function a(t,e){const n=o();let r=u(((t*t+(n-BigInt(3)))*t+BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"))%n,n);return e!==c(r,0)&&(r=(n-r)%n),r}function s(t){if(33!==t.length)throw new Error("compressed point has wrong length");if(2!==t[0]&&3!==t[0])throw new Error("invalid format");const e=3===t[0],n=(c=t.subarray(1,t.length),BigInt("0x"+function(t){let e="";for(let n=0;n<t.length;n++){const r=t[n].toString(16);e+=r.length>1?r:"0"+r}return e}(c)));var c;const u=o();if(n<BigInt(0)||n>=u)throw new Error("x is out of range");const s=a(n,e);return{kty:"EC",crv:"P-256",x:r(i(n),!0),y:r(i(s),!0),ext:!0}}n.d(e,{S:()=>g});var l=n(5069);function g(t){const{uncompressedPrivateKeyHex:e,compressedPublicKeyHex:n}=t,r=s(h(n));return r.d=function(t){const e=h(t);return(0,l.up)(e.reduce(((t,e)=>t+String.fromCharCode(e)),""))}(e),r}function h(t){if(0===t.length||t.length%2!==0||/[^a-fA-F0-9]/u.test(t))throw new Error(`Invalid hex string: ${JSON.stringify(t)}`);return Uint8Array.from(t.match(/.{2}/g).map((t=>parseInt(t,16))))}},5998:(t,e,n)=>{n.r(e),n.d(e,{signWithApiKey:()=>i});var r=n(2972),o=n(5069);const i=async t=>{const{content:e,publicKey:n,privateKey:i}=t,u=await async function(t){const{uncompressedPrivateKeyHex:e,compressedPublicKeyHex:n}=t,o=(0,r.S)({uncompressedPrivateKeyHex:e,compressedPublicKeyHex:n});return await crypto.subtle.importKey("jwk",o,{name:"ECDSA",namedCurve:"P-256"},!1,["sign"])}({uncompressedPrivateKeyHex:i,compressedPublicKeyHex:n});return await async function(t){const{key:e,content:n}=t,r=await crypto.subtle.sign({name:"ECDSA",hash:"SHA-256"},e,(new TextEncoder).encode(n)),i=function(t){if(t.length%2!=0||0==t.length||t.length>132)throw new Error("Invalid IEEE P1363 signature encoding. Length: "+t.length);const e=c(t.subarray(0,t.length/2)),n=c(t.subarray(t.length/2,t.length));let r=0;const o=2+e.length+1+1+n.length;let i;o>=128?(i=new Uint8Array(o+3),i[r++]=48,i[r++]=129,i[r++]=o):(i=new Uint8Array(o+2),i[r++]=48,i[r++]=o);return i[r++]=2,i[r++]=e.length,i.set(e,r),r+=e.length,i[r++]=2,i[r++]=n.length,i.set(n,r),i}(new Uint8Array(r));return(0,o.pD)(i)}({key:u,content:e})};function c(t){let e=0;for(;e<t.length&&0==t[e];)e++;e==t.length&&(e=t.length-1);let n=0;128==(128&t[e])&&(n=1);const r=new Uint8Array(t.length-e+n);return r.set(t.subarray(e),n),r}},5069:(t,e,n)=>{function r(t){const e=function(t){if(0===arguments.length)throw new TypeError("1 argument required, but only 0 present.");let e;for(t=`${t}`,e=0;e<t.length;e++)if(t.charCodeAt(e)>255)throw new Error(`InvalidCharacterError: found code point greater than 255:${t.charCodeAt(e)} at position ${e}`);let n="";for(e=0;e<t.length;e+=3){const r=[void 0,void 0,void 0,void 0];r[0]=t.charCodeAt(e)>>2,r[1]=(3&t.charCodeAt(e))<<4,t.length>e+1&&(r[1]|=t.charCodeAt(e+1)>>4,r[2]=(15&t.charCodeAt(e+1))<<2),t.length>e+2&&(r[2]|=t.charCodeAt(e+2)>>6,r[3]=63&t.charCodeAt(e+2));for(let t=0;t<r.length;t++)"undefined"===typeof r[t]?n+="=":n+=i(r[t])}return n}(t);return function(t){return t.replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}(e)}function o(t){return t.reduce(((t,e)=>t+e.toString(16).padStart(2,"0")),"")}function i(t){if(t>=0&&t<64)return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[t]}n.d(e,{pD:()=>o,up:()=>r})}}]);
//# sourceMappingURL=998.7a2dcd7c.chunk.js.map