// Define and fill Pokemon List Array
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
]

// Loop to display names and heights next to each name, include "wow" tag if height over 1.0
for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
    if (pokemonList[i].height >= 1.0) {
        document.write(" -- Wow that's big!")
    };
    document.write("<br>");
  }

  
  