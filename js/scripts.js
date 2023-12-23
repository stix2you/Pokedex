let pokemonRepository = (function () {    // IIFE to wrap pokemon array
    let pokemonList = [];     // Create an empty array in which to store the Pokémon objects (e.g., let pokemonList = []).
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';    // Create a variable to store the URL of the Pokémon API (e.g., let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150').
    
    function add(pokemon) {    // Function to add pokemon to list
        if (typeof pokemon === "object"  &&         // Check if the provided object is a valid Pokémon
            "name" in pokemon  &&
            "detailsUrl" in pokemon
        ) { 
            pokemonList.push(pokemon);              // If valid, push the Pokémon to the list
            console.log("Item added:", pokemon);
        } else {                                    // If not valid, log an error message
            console.error("Did not add item: ", pokemon, " ...Items must have properties: name, height, and types.");
        }
    }

    function getAll() {    // Function to return the entire array, no filtering 
        return pokemonList;
    }

    function getSpecific(specificPokemon) {     // <-- Function to get specific pokemon from list
        let specific = pokemonList.filter(      // <-- Use the FILTER method to find Pokémon with a matching name
        (iteration) => iteration.name === specificPokemon
        );
        return specific[0];                     // <-- Return the first match (or undefined if no match is found)
    }

    function addListItem(pokemon) {   // Adds a new BUTTON element to the HTML list
        let theList = document.querySelector('.pokemon-list');      // Select the HTML element with the class 'pokemon-list' 
        let listItem = document.createElement('div');               // Create a new div element to hold the button
        let button = document.createElement('button');              // Create a button element
        
        button.innerText = pokemon.name;                        // Set the button's text content to the Pokémon's name
        
        button.setAttribute('type', 'button');                  // Set attributes for the button to enable modal functionality
        button.setAttribute('data-toggle', 'modal');            // data-toggle and data-target attribues set up sort of an event listener to 
        button.setAttribute('data-target', '#exampleModal');    // open a modal when a button is pressed, directs the modal class to be "visible" in the html exampleModal ID
        
        button.classList.add('btn', 'btn-primary', 'button', 'w-100', 'my-3');  // ADJUST BUTTON STYLING
        listItem.classList.add('col-md-3'); // ADJUST LIST STYLING HERE

        button.addEventListener('click', function () {    // fires the showDetails function, this actually displays the information in the modal
            showDetails(pokemon);
        });

        listItem.appendChild(button);   // append the button to the list item as its child
        theList.appendChild(listItem);  // append the list item to the unordered list as its child

    }

    function showDetails(pokemon) {   // called with pokemon as argument, calls loadDetails function (in) and then showModal function (out)
        loadDetails(pokemon)
            .then(function () {
                showModal(pokemon);
            })
            .catch(function (e) {           // logs a counsel error if the FETCH or PROSESSING OF DETAILS doesn't work
                console.error("showDetails function error");
            });
    }

    function loadDetails(pokemon) {     // <-- HTTP fetch request to the details URL specified in the LoadList function by detailsUrl var 
        let url = pokemon.detailsUrl;   // it then assigns attributes of pokemon to individual detail variables
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
            .catch(function (e) {           // logs a counsel error if the FETCH or PROSESSING OF DETAILS doesn't work
                console.error("loadDetails function error");
            });
    }

    function loadList() {                   // Function to load pokemon list from API
        return fetch(apiUrl)                // <--- initiates fetch request to the API URL, 
            .then(function (response) {     //  the fetch returns a promise that resolves to the response to that request.
                return response.json();     // <--- converts the response to JSON format. This step is necessary because the fetch response is not 
            })                              // automatically parsed as JSON; you need to explicitly call response.json()
            .then(function (json) {         // <-- This block processes the JSON data. It iterates over the results array in the JSON and 
                json.results.forEach(function (item) {      // CREATES Pokemon objects with two properties: name and detailsUrl
                    let pokemon = {                         // It then adds each Pokemon to the list using the add function
                    name: item.name,
                    detailsUrl: item.url
                    };
                add(pokemon);
                });
            })
            .catch(function (e) {           // logs a counsel error if the FETCH or PROSESSING OF JSON doesn't work
                console.error(e);
            });
    }
    
    function showModal(item) {  // Function to display modal with pokemon details
        let modalBody = $(".modal-body");       // points to modal-body class
        let modalTitle = $(".modal-title");     // points to modal-title class
        let modalHeader = $(".modal-header");   // not used currently, may need in future

        modalBody.empty();
        modalTitle.empty();
              
        let nameElement = $("<h1>" + item.name + "</h1>");      // Define the elements first... 
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

        modalTitle.append(nameElement);         // ... then add the elements to the DOM
        modalBody.append(imageFrontElement);
        modalBody.append(imageBackElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);

    }

    return {        // return functions to be used outside of IIFE -- key and value are same
        add: add, 
        getAll: getAll, 
        getSpecific: getSpecific, 
        addListItem: addListItem,  
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
    };

})();

// Action: forEach loop to iterate over pokemonList array and add each pokemon to the DOM as a button
// As the functions branch, interactivity causes other functions to fire
pokemonRepository.loadList().then(function() {     
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
  });
});
