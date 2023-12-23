let pokemonRepository = (function () {    // IIFE to wrap pokemon array
    let pokemonList = [];     // Create an empty array in which to store the Pokémon objects (e.g., let pokemonList = []).
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';    // Create a variable to store the URL of the Pokémon API (e.g., let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150').
    
    function add(pokemon) {    // Function to add pokemon to list
        if (typeof pokemon === "object"  &&
            "name" in pokemon  &&
            "detailsUrl" in pokemon
        ) { 
            pokemonList.push(pokemon);
            console.log("Item added:", pokemon);
        } else {
            console.error("Did not add item: ", pokemon, " ...Items must have properties: name, height, and types.");
        }
    }

    function getAll() {    // Function to get all pokemon from list
        return pokemonList;
    }

    function getSpecific(specificPokemon) {    // Function to get specific pokemon from list
        let specific = pokemonList.filter(
        (iteration) => iteration.name === specificPokemon
        );
        return specific[0]; 
    }

    function addListItem(pokemon) {    
        let theList = document.querySelector('.pokemon-list');    
        let listItem = document.createElement('div');   
        let button = document.createElement('button'); 
        button.innerText = pokemon.name;    
        button.setAttribute('type', 'button');
        button.setAttribute('data-toggle', 'modal'); 
        button.setAttribute('data-target', '#exampleModal'); 
        button.classList.add('btn', 'btn-primary', 'button', 'w-100'); 
        listItem.classList.add('col-md-3'); // Adjust column size and margin as needed

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

        listItem.appendChild(button);   // append the button to the list item as its child.
        theList.appendChild(listItem);  // append the list item to the unordered list as its child.

    }

    function showDetails(pokemon) {   // Function to display details of desired pokemon
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        }); 
    }

    function loadDetails(pokemon) {   // HTTP fetch request to URL specified by detailsUrl var, assigns attributes of pokemon to variables 
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                pokemon.imageFront = details.sprites.front_default;
                pokemon.imageBack = details.sprites.back_default;
                pokemon.height = details.height;
                pokemon.weight = details.weight; 
                pokemon.types = details.types;
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function loadList() {    // Function to load pokemon list from API
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                    };
                add(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    
    function showModal(item) {  // Function to display modal with pokemon details
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");

        modalBody.empty();
        modalTitle.empty();
              
        let nameElement = $("<h1>" + item.name + "</h1>");
        let imageFrontElement = $('<img class="modal-img" style ="width:50%">');
        imageFrontElement.attr("src", item.imageFront);
        let imageBackElement = $('<img class="modal-img" style ="width:50%">');
        imageBackElement.attr("src", item.imageBack);
        let heightElement = $("<p>" + "height: " + item.height + "</p>");
        let weightElement = $("<p>" + "weight: " + item.weight + "</p>");
        let typesElement = $("<p>Types: </p>");
        item.types.forEach(function (type) {
            typesElement.append(type.type.name + ' ');
        });

        modalTitle.append(nameElement);
        modalBody.append(imageFrontElement);
        modalBody.append(imageBackElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);

    }

    return {   // return functions to be used outside of IIFE
        add: add, // key and value are same
        getAll: getAll, 
        getSpecific: getSpecific, 
        addListItem: addListItem,  
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
    };

})();

// forEach loop to iterate over pokemonList array and add each pokemon to the DOM as a button
pokemonRepository.loadList().then(function() {     
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
  });
});
