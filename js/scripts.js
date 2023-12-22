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

    function addListItem(pokemon) {    // Function to add pokemon to DOM as a button
        let theList = document.querySelector('.pokemon-list');    // create a variable then assign it the ul element you just added to your “index.html” file
        let listItem = document.createElement('li');    // Create an li element (e.g., let listItem = document.createElement('li')).
        let button = document.createElement('button');  // Create a button element (e.g., let button = document.createElement('button'))
        button.innerText = pokemon.name;      // set its innerText to be the Pokémon's name (remember that forEach returns a Pokémon in each iteration).
        button.setAttribute('type', 'button');
        button.setAttribute('data-toggle', 'modal');  //set attribue data-toggle to modal
        button.setAttribute('data-target', '#exampleModal');   // set attribute data-target to #detailModal which will bet the id for the modal in index 
        button.classList.add('btn', 'btn-primary', 'button');  //add classes to button, stylize and responsive
        listItem.classList.add('list-group');      // Add a list-group-item class to the listItem element using the classList.add method  or jQuery using .addClass()

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

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.weight = details.weight;  // Add weight property
                item.types = details.types;
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
        let imageElement = $('<img class="modal-img" style ="width:50%">');
        imageElement.attr("src", item.imageUrl);
        let heightElement = $("<p>" + "height: " + item.height + "</p>");
        let weightElement = $("<p>" + "weight: " + item.weight + "</p>");
        let typesElement = $("<p>" + "types: " + item.name + "</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
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
