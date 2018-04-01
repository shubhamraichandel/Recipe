$(document).ready(function(){

    let ingredientsList = ["carrot"];


    function createList() {
        $('.js-list').empty();

        for (i = 0; i < ingredientsList.length; i++) {
            // Create a new button element and set it equal to the newIngredient variable
            let newIngredient = $("<button>");

            // Add a new attribute to the button and set it equal to the name of the new ingredient
            newIngredient.attr("data-ingredient", ingredientsList[i]);

            // Add classes to the button
            newIngredient.addClass('btn btn-info mr-sm-2');

            // Give the button text that is equal to the name of the ingredient
            newIngredient.text(ingredientsList[i]);

            // Add the button to the element with the class of js-list
            $('.js-list').append(newIngredient);
        }
    }

    // need to push all ingredients to an array
    function showRecipes(){

        // String version of our ingredient array
        let tempStrIngredientsList = ingredientsList.join(" ");
        // console.log(strIngredientsList);
      
        // spaces replaced with %20
        let strIngredientsList = encodeURIComponent(tempStrIngredientsList);
        //var queryURL = "https://api.edamam.com/search?q=peanut+butter%2C+bread&app_id=40511119&app_key=ef36201a4e68b398295a867bfcb3f89a";
        var queryURL = "https://api.edamam.com/search?q=" + strIngredientsList + "&app_id=40511119&app_key=ef36201a4e68b398295a867bfcb3f89a";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            for (let i = 0; i < response.hits.length; i++){
                // Create a new div and save it to a variable called recipe
                let recipe = $("<div style='width: 18rem;'>");
                // Add a class to the recipe div and give it the class card and a margin
                recipe.addClass('card col-md-3 m-2');
                // Create an empty image tag and save it in a variable called img
                let img = $("<img>");
                // Add classes to the img tag
                img.addClass('card-img-top');
                // Give each img tag a src attribute that contains the image url for each recipe
                img.attr('src', response.hits[i].recipe.image);
                // Create a div with a class of card body AND a p tag and store it in a variable called label
                let label = $("<div class='card-body'><p>");

                // Add text to the label that contains the name (or, as defined by the API, the label) from each recipe
                label.text(response.hits[i].recipe.label);
                // Append the img tag and the label div & p tag to the recipe div
                recipe.append(img).append(label);
                // Grab the js-recipes class and append the recipe div to it
                $(".js-recipes").append(recipe);
                console.log(img);

            }
            // let recipe = $("<div>");
            // let img = $("<img>");
            

            // let gif = $('<img>');
            // let rating = $('<p>');
            // let section = $('<div class = "still-gif" >');

            // let stillGif = result.images.fixed_height_still.url;
            // let movingGif = result.images.fixed_height.url
            // let state = "still";
            // gif.attr("src",stillGif).attr("data-still", stillGif).attr("data-animate", movingGif).attr("data-state", state).addClass("gif-img");
            // rating.text("Rated: " + result.rating.toUpperCase());
            // section.append(rating).append(gif);
            // $('.js-gifs').append(section);
        });
    
    }

    $('.js-add').on('click', function(event) {
        // Prevent the default action / page refresh
        event.preventDefault();
        // Grab the text input from the js-input field and set it to the ingredient variable
        let ingredient = $('.js-input').val().trim();
        // Add the text input of ingredient to our ingredientsList array
        ingredientsList.push(ingredient);
        // Run createList, which appends all our ingredient buttons to the sidebar
        createList();
        // Log the ingredient to the console
        console.log(ingredient);
        // Empty the all of the recipe divs/cards in the right side js-recipes section
        $(".js-recipes").empty();
        // Run showRecipes, which queries our API with all the ingredients in our ingredientsList array
        showRecipes();
        // Empty the js-input field
        $('.js-input').val('');

    });


    createList();
    //showRecipes();
});
