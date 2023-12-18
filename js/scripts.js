//  Define new variable pokemonRepository   and   assign to Pokemon List Array
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
      
    //separately defined functions for 'add' and 'getAll'
    function add(pokemon) {
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

    function getAll() {
        return pokemonList;
    }

    function getSpecific(specificPokemon) {
        let specific = pokemonList.filter(
        (iteration) => iteration.name === specificPokemon
        );
        return specific[0];
    }

    function addListItem(pokemon) {
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

    function loadList() {
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
    
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {    // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }

    function showDetails(pokemon) {   // Function to display details of desired pokemon
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        }); 
    }

    return {
        add: add, // key and value are same
        getAll: getAll, // key and value are same
        getSpecific: getSpecific, // key and value are same
        addListItem: addListItem,  
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();


pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
  });
});
