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
        button.classList.add('pokeListButton');           // Add a class to the button using the classList.add method (button.classList.add(...)). 

        listItem.appendChild(button);   // append the button to the list item as its child.
        theList.appendChild(listItem);  // append the list item to the unordered list as its child.

        addEventListenerToButton(button, pokemon);
    }

   function addEventListenerToButton(button, pokemon) {  // Separate event listener function for pokemon button
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {   // Function to display details of desired pokemon
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        }); 
    }

    function loadDetails(item) {    // Function to load details of desired pokemon
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {    // Now we add the details to the item
          item.imageUrl = details.sprites.front_default,
          item.height = details.height,
          item.types = details.types
        }).catch(function (e) {
          console.error(e);
        });
    }

    function loadList() {    // Function to load pokemon list from API
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                name: item.name,
                detailsUrl: item.url
                };
            add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    
    function showModal(pokemon) {  // Function to display modal with pokemon details
        let modalContainer = document.querySelector('#modal-container');   
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + pokemon.height;

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        });
    }

    function hideModal() {    // Function to hide modal
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {    // Function to hide modal when escape key is pressed
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    return {   // return functions to be used outside of IIFE
        add: add, // key and value are same
        getAll: getAll, 
        getSpecific: getSpecific, 
        addListItem: addListItem,  
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        hideModal: hideModal,
    };

})();

// forEach loop to iterate over pokemonList array and add each pokemon to the DOM as a button
pokemonRepository.loadList().then(function() {     
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
  });
});
