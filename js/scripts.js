
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
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,  // key and value are same
        getAll: getAll    // key and value are same
    };
})();


// document.write(pokemonRepository.getAll());


pokemonRepository.getAll().forEach(function(pokemonRepository) {
    document.write(pokemonRepository.name + " (height: " + pokemonRepository.height + ")");
    if (pokemonRepository.height >= 1.0) {
        document.write(" -- Wow that's big!")
    };
    document.write("<br>");
  });


/*
// ForEach loop to display names and heights next to each name, include "wow" tag if height over 1.0

  pokemonList.forEach(function(pokemonList) {
    document.write(pokemonList.name + " (height: " + pokemonList.height + ")");
    if (pokemonList.height >= 1.0) {
        document.write(" -- Wow that's big!")
    };
    document.write("<br>");
  });
  */