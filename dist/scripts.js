let pokemonRepository=function(){let t=[];function e(e){"object"==typeof e&&"name"in e&&"detailsUrl"in e?(t.push(e),console.log("Item added:",e)):console.error("Did not add item: ",e," ...Items must have properties: name, height, and types.")}function n(){return t}function i(t){return fetch(t.detailsUrl).then(function(t){return t.json()}).then(function(e){t.imageFront=e.sprites.front_default,t.imageBack=e.sprites.back_default,t.height=e.height,t.weight=e.weight,t.types=e.types}).catch(function(t){console.error(t)})}function o(t){let e=$(".modal-body"),n=$(".modal-title");$(".modal-header"),e.empty(),n.empty();let i=$("<h1>"+t.name+"</h1>"),o=$('<img class="modal-img" style ="width:50%">');o.attr("src",t.imageFront);let a=$("<img class='modal-img' style ='width:50%'>");a.attr("src",t.imageBack);let r=$("<p>height: "+t.height+"</p>"),p=$("<p>weight: "+t.weight+"</p>"),d=$("<p>Types: </p>");t.types.forEach(function(t){d.append(t.type.name+" ")}),n.append(i),e.append(o),e.append(a),e.append(r),e.append(p),e.append(d)}return{add:e,getAll:n,getSpecific:function e(n){return t.filter(t=>t.name===n)[0]},addListItem:function t(e){let n=document.querySelector(".pokemon-list"),a=document.createElement("div"),r=document.createElement("button");r.innerText=e.name,r.setAttribute("type","button"),r.setAttribute("data-toggle","modal"),r.setAttribute("data-target","#exampleModal"),r.classList.add("btn","btn-primary","button","w-100","my-3"),a.classList.add("col-md-3"),r.addEventListener("click",function(){(function t(e){i(e).then(function(){o(e)}).catch(function(t){console.error(t)})})(e)}),a.appendChild(r),n.appendChild(a)},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){e({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:i,showModal:o}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});