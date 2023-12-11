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

        // let isValid = Object.keys(pokemon);
        // console.log(isValid);
        // if  (isValid = ["name:", "height:", "types:"]) {
        //     pokemonList.push(pokemon);
        //   } else {
        //     console.error("Did not add item: " + pokemon + " ....Items must be objects to add to repository");
        //   };
        
        //Object.keys(pokemon).forEach(function(property) { console.log(pokemon[property]); } );

        // if-else to check passed data is an object, ELSE refuse to add and error msg to console
        if (typeof pokemon === 'object')  {
            pokemonList.push(pokemon);
          } else {
            console.error("Did not add item: " + pokemon + " ....Items must be objects to add to repository");
          };
    }


    function getAll() {
        return pokemonList;
    }

    // function getSpecific(specificPokemon) {
    //     let specific = pokemonList.filter(iteration => iteration === specificPokemon);
    //     return specific;
    // }

    return {
        add: add,  // key and value are same
        getAll: getAll,    // key and value are same
        // getSpecific: getSpecific   // key and value are same
    };
})();

// Test adding an object and a non-object variable
let newPokemonObject = { name: 'Metapod', height: 0.7, types: ['bug'] };
pokemonRepository.add(newPokemonObject);

let newPokemonString = 'STRING name: Metapod, height: 0.7, types: [bug]';
pokemonRepository.add(newPokemonString);


// loop to display pokemonList array within the pokemonRepository
pokemonRepository.getAll().forEach(function(pokemonRepository) {
    document.write(pokemonRepository.name + " (height: " + pokemonRepository.height + ")");
    if (pokemonRepository.height >= 1.0) {
        document.write(" -- Wow that's big!")
    };
    document.write("<br>");
});
