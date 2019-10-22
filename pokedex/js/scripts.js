 var pokemonRepository = (function() {
  var repository = [];

  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // adds item to the repository
 function add (pokemon) {
    repository.push(pokemon);
  }
    // allows to access the repository from outside
  function getAll() {
    return repository;
  }

 function addListItem (pokemon) {

    var pokemonList = $(".pokemon-list");
    var listItem = $("<li>");
    $(pokemonList).append(listItem);
    var button = $("<button>");
    $(listItem).append(button);
    $(button).text(pokemon.name);
    $(button).addClass("buttonStyle")
    $(listItem).addClass ("pokemon-list_item")
    button.on("click", function(event){
      showDetails(pokemon);
    });
      }
//Javascript:
    //var $pokemonList = document.querySelector("ul");
    //var listItem = document.createElement("li");
    //listItem.classList.add("pokemon-list_item");

    //var button = document.createElement("button");
    //button.innerText = pokemon.name;
    //button.classList.add('buttonStyle');

    //$pokemonList.appendChild(listItem);
    //listItem.appendChild(button);
    /*button.addEventListener("click", function(event){
      showDetails(pokemon);
    });*/


  function loadList() {
     return $.ajax(apiUrl, {dataType: 'json'}).then(function (item) {

      $.each(item.results, function(index, item){
//Javascript:
    //return fetch(apiUrl).then(function (response) {
    //  return response.json();
    // }).then(function (json) {
    // json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (error) {
      console.error(error);
    })
  }

  //Creates new elements and adds to the DOM

  //loads details for each pokemon by clicking on the button
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      //displays details in a modal
      showModal(item);
    });
  }

  //loads detailed data for each pokemon using detailsUrl property
//Javascript:
  /*function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) */

    function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url).then(function (details){
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = Object.keys(details.types);
        item.weight = details.weight;
      })
      .catch(function(error) {
        console.error(error);
        /* eslint-enable no-console */
      });
  }

  // creating modal content
  function showModal(item) {

    var modalContainer = $('#modal-container');
    //clearing all existing modal content
    (modalContainer).html('');
    (modalContainer).addClass('is-visible');
    //creating div element in DOM
    var modal = $('div');
    //adding class to div DOM element
    (modal).addClass("modal");
    (modalContainer).html(modal);
    //creating closing button in modal content
    //var closeButtonElement = $('<button>');
    //$(closeButtonElement).addClass("modal-close");
    //$(closeButtonElement).text ('Close');
    // adding event listener to close modal when clicked on button
    //$(modal).append(closeButtonElement);
    //$(closeButtonElement).click(hideModal);

    //creating element for name in modal content
    var nameElement = $('<h1>');
    let html_text = `<div class="social-modal">
                                <button class="modal-close">Close</button>
                          <h1>${item.name}</h1>
                          <img class="modal-img" src="${item.imageUrl}" />
                          <p>height : ${item.height}</p>
                          <p>weight : ${item.weight}</p>
                      </div>`
    //$(nameElement).text(item.name);
    //$(modal).append(nameElement);
    // creating img in modal content
    //ar imageElement = $("<img>");
    //$(imageElement).addClass("modal-img");
    //$(imageElement).attr('src',item.imageUrl);
    //$(modal).append(imageElement);
    //creating element for height in modal content
    //var heightElement = $("<p>");
    //$(heightElement).text ('height : ' + item.height);
    //$(modal).append(heightElement);
    //creating element for weight in modal content
    //var weightElement = $("<p>");
    //$(weightElement).text ('weight : ' + item.weight);
    //$(modal).append(weightElement);
    //appending modal content to webpage
    modal.html(html_text)

$('#modal-container').on('click', '.modal-close', hideModal);





    //adds class to show the modal

  }

  //hides modal when clicked on close button
  function hideModal() {
    var modalContainer = $('#modal-container');
    $(modalContainer).removeClass('is-visible');
  }
  function showDialog(item) {
  showModal(title, text);

  // We want to add a confirm and cancel button to the modal
  var modal = modalContainer.querySelector('.modal');

  var confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  var cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  // We want to focus the confirmButton so that the user can simply press Enter
  confirmButton.focus();
}
  //hides modal when clicked on ESC on keyboard
$(window).keydown(function(event) {
    var $modalContainer = $('#modal-container');
    if (
      event.key === 'Escape' &&
      $(modalContainer).containsClass('is-visible')
    ) {
      hideModal();
    }
  });

  //hides modal if clicked outside of it
  var modalContainer = document.querySelector('#modal-container');
  modalContainer.addEventListener('click', function(event) {
    var target = event.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

// Loading the data from API
pokemonRepository.loadList().then(function() {
  // accessing pokemon repository & running function over each object in repository
  pokemonRepository.getAll().forEach(function(Pokemon) {
    //executing addListItem function for each object in pokemon repository
    pokemonRepository.addListItem(Pokemon);
  });
});
