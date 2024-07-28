import{i as c,S as h}from"./assets/vendor-8c59ed88.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const g="45141077-2f2085cf6ccd740accb993600",y="https://pixabay.com/api/",b=document.querySelector(".search-form"),u=document.querySelector(".input-field"),m=document.querySelector(".gallery-result-list"),q=document.querySelector(".query-word"),d=t=>({enable:()=>document.querySelector(t).classList.remove("disabled"),disable:()=>document.querySelector(t).classList.add("disabled")}),n=d(".spinner"),a=d(".loading-text"),p=d(".query-text");b.addEventListener("submit",t=>{t.preventDefault();const s=u.value;v(s)});function v(t){const s=`${y}?key=${g}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true`;n.enable(),a.enable(),fetch(s).then(o=>{if(!o.ok)throw new Error(`Error! status: ${o.status}`);return o.json()}).then(o=>{n.disable(),a.disable(),p.enable(),q.textContent=u.value,o.hits?S(o.hits):c.warning({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#ef4040",messageColor:"#fff"})}).catch(o=>{n.disable(),a.disable(),console.error(o),c.warning({title:"Error",message:"An error occurred while fetching images"})})}const L="Sorry, there are no images matching your search query. Please try again!";function S(t){if(m.innerHTML="",t.length===0){n.disable(),a.disable(),p.disable(),c.warning({message:L,backgroundColor:"#ef4040",messageColor:"#fff",position:"topRight",timeout:2e3}),setTimeout(f,2e3);return}const s=t.map(w).join("");m.insertAdjacentHTML("beforeend",s),setTimeout(f,500),$.refresh()}function f(){u.value=""}const $=new h(".gallery-result-list a",{captions:!0,captionsData:"alt",captionDelay:250,close:!0,className:"simpleLightboxGallery",doubleTapZoom:2,scrollZoom:!0,overlay:!0});function w({webformatURL:t,tags:s,downloads:o,likes:i,comments:e,views:r}){return`<li class="list-container">
    <div >
      <div class="image-container">
        <a href="${t}" data-source="${t}">
          <img src="${t}" alt="${s}" />
        </a>
      </div>
      <div class="descr-element">
        <ul class="descr-list">
          <li>
            <h3>Likes</h3>
              <p>${i}</p>
          </li>
          <li>
            <h3>Views</h3>
              <p>${r}</p>
          </li>
          <li>
            <h3>Comments</h3>
            <p>${e}</p>
          </li>
          <li>
            <h3>Downloads</h3>
              <p>${o}</p>
          </li>
        </ul>
      </div>
    </div>
  </li>`}
//# sourceMappingURL=commonHelpers.js.map
