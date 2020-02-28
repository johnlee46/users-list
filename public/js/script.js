function addArtist() {
  var el = document.getElementById("add_artist");
  el.style.display =
    el.style.display == "none" || el.style.display == "" ? "block" : "none";
  let inputlist = document.getElementsByClassName("input_fields");
  for (input in inputlist) {
    input.value = "";
  }
  let input_field = document.getElementById("add_name");
  let input_field_desc = document.getElementById("add_description");
  let input_field_url = document.getElementById("add_url");
  input_field.value = "";
  input_field_desc.value = "";
  input_field_url.value = "";
}

function submitArtist() {
  var saveobject = {
    name: document.getElementById("add_name").value,
    description: document.getElementById("add_description").value,
    url: document.getElementById("add_url").value
  };
  fetch("/submitUser", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(saveobject)
  }).then(res => console.log(res)).then(

  clearArtists()).then(
  onLoad()
  );
  let input_field = document.getElementById("add_name");
  let input_field_desc = document.getElementById("add_description");
  let input_field_url = document.getElementById("add_url");
  input_field.value = "";
  input_field_desc.value = "";
  input_field_url.value = "";
}
function clearArtists() {
  var artist_list = document.querySelectorAll(".artist_container");
  artist_list.forEach(element => {
    element.remove();
  });
}

function generateArtist(name, description, url) {
  let list = document.getElementById("artists");
  let list_item = document.createElement("LI");
  let div_item = document.createElement("div");
  div_item.setAttribute("class", "artist_container");

  let image_item = document.createElement("IMG");
  image_item.setAttribute("class", "artist_image");
  let text = document.createElement("p");
  let about = document.createElement("span");
  let full_name = name;
  let textnode = document.createTextNode(full_name);
  let deletebutton = document.createElement("button");
  deletebutton.setAttribute("onClick", "deleteArtist(this)");
  deletebutton.setAttribute("class", "delete_button");
  let deletenode = document.createTextNode("Delete");
  deletebutton.appendChild(deletenode);
  let description_node = document.createTextNode(description);
  image_item.setAttribute("src", url);
  list_item.appendChild(div_item);
  div_item.appendChild(image_item);
  div_item.appendChild(text);
  div_item.appendChild(about);
  text.appendChild(textnode);
  text.setAttribute("class", "name");
  about.setAttribute("class", "company");
  about.appendChild(description_node);
  div_item.appendChild(deletebutton);
  list.appendChild(list_item);
}

function deleteArtist(node) {

    console.log(node.parentNode.children[1].innerText)
    fetch("/deleteName/" + node.parentNode.children[1].innerText, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: node.parentNode.children[1].value
      }).then(res => clearArtists()).then(onLoad());
}

function onLoad() {
  var array;
  fetch("/users")
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      array = data;
      console.log(array);
      for (let i = 0; i < array.length; i++) {
        //console.log(array[i]);
        generateArtist(array[i].name, array[i].description, array[i].url);
      }
    });
}

function searchArtist() {
  var artist_list = document.querySelectorAll(".artist_container");
  fetch(
    "/search/" + document.getElementById("artist_input").value.toLowerCase()
  )
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      array = data;
      console.log(array);
      clearArtists();
      for (let i = 0; i < array.length; i++) {
        generateArtist(array[i].name, array[i].description, array[i].url);
      }
    });
}
