//  Define new variable pokemonRepository   and   assign to Pokemon List Array
let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
        { name: 'Ivysaur', height: 1.0, types: ['grass', 'poison'] },
        { name: 'Venusaur', height: 2.0, types: ['grass', 'poison'] },
        { name: 'Charmander', height: 0.6, types: ['fire'] },
        { name: 'Charmeleon', height: 1.1, types: ['fire'] },
        { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
        { name: 'Squirtle', height: 0.5, types: ['water'] },
        { name: 'Wartortle', height: 1.0, types: ['water'] },
        { name: 'Blastoise', height: 1.6, types: ['water'] },
        { name: 'Caterpie', height: 0.3, types: ['bug'] },
    ];
    
    //separately defined functions for 'add' and 'getAll'
    function add(pokemon) {
    // Check if the input is an object
        if (typeof pokemon === "object") {
            // Check if the object has all required properties
            const requiredProperties = ["name", "height", "types"];
            const hasRequiredProperties = requiredProperties.every((prop) => Object.keys(pokemon).includes(prop)
        );

        if (hasRequiredProperties) {
            pokemonList.push(pokemon);
            console.log("Item added:", pokemon);
        } else {
            console.error(
            "Did not add item: ",
            pokemon,
            " ...Items must have properties: name, height, and types."
            );
        }
        } else {
            console.error(
            "Did not add item: ",
            pokemon,
            " ...Items must be objects to add to the repository."
        );
        }
    }

    function getAll() {
        return pokemonList;
    }

    function getSpecific(specificPokemon) {
        // ADAM NOTE: access the pokemon via name by using dot notation
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
    }

    return {
        add: add, // key and value are same
        getAll: getAll, // key and value are same
        getSpecific: getSpecific, // key and value are same
        addListItem: addListItem  
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
