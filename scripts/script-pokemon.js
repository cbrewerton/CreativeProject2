function findPokemon(event) {
    event.preventDefault();
    let pokemonName = document.getElementById('name').value;
    //check if nothing is entered
    if (pokemonName === "") {
      var nothing = "Please enter a Pokemon's name";
      document.getElementById('result').innerHTML = nothing;
    }
    // setup URL for API call
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName + "/";
    let results = "";
    // call API
    fetch(url)
      .then(function(response) {
        if (response.status != 200) {
          return {
            text: "Error calling the Pokemon API: " + response.statusText
          }
        }
        return response.json();
      }).then(function(json) {
        console.log(json);
        results += '<h2>' + json.name + '</h2>'
        results += '<img src=' + "'" + json.sprites.front_default + "'/>";
        results += '<p> Type: ' + json.types[0].type.name + '</p>';
        //parse weight and height into int. For some reason the JSON returns a number 10x the wiki's info on weight/hieght
        let weight = parseFloat(json.weight);
        weight = weight / 10;
        results += '<p> Weight: ' + weight + " kg" + '</p>';
        let height = parseFloat(json.height);
        height = height / 10;
        results += '<p> Height: ' + height + " m" + '</p>';
        const typeUrl = json.types[0].type.url;
        fetch(typeUrl)
         .then(function(newResponse){
            if(newResponse.status != 200){
                return{
                    text: "Error calling the Pokemon API: " + newResponse.statusText
                }
            }
            return newResponse.json();
        }).then(function(newJson){
            //Since I called 2 endpoints of the API, I had to get another entire JSON object
            console.log(newJson);
            results += '<h4> Fighting Stats - Offensive: </h4>';
            results += '<p> Does extra damage to: ' + newJson.damage_relations.double_damage_to[0].name + '</p>';
            results += '<p> Does less damage to: ' + newJson.damage_relations.half_damage_to[0].name + '</p>';
            results += '<h4> Fighting Stats - Defensive: </h4>';
            results += '<p> Receives extra damage from: ' + newJson.damage_relations.double_damage_from[0].name + '</p>';
            results += '<p> Receives less damage from: ' + newJson.damage_relations.half_damage_to[0].name + '</p>';
            document.getElementById('result').innerHTML = results;
        });
    });
  }
  //Use button to call findPokemon function
  document.getElementById('search').addEventListener('click', findPokemon);
  