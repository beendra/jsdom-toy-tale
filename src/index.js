/*** MICHELLE TOY TALE REVIEW ***/
let addToy = false;
const url = 'http://localhost:3000/toys'
const newToyForm = document.querySelector('form.add-toy-form')
const collectionDiv = document.querySelector('div#toy-collection')


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function renderOneToy(toy) {
  const div = document.createElement('div')
  div.classList.add('card')

  div.innerHTML = `<h2>${toy.name}</h2>
  <img src='${toy.image}' alt='${toy.name}' class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button data-id=${toy.id} class="like-btn">Like <3</button>`

  collectionDiv.append(div)
}


function renderAllToys(toysArray) {
  toysArray.forEach(toy => {
    renderOneToy(toy)
  })
}


function getAllToys() {
  fetch(url)
    .then(response => response.json())
    .then(toysArray => {
      renderAllToys(toysArray)

    })
}



newToyForm.addEventListener('submit', event => {
  event.preventDefault()

  const newToyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }
  console.log(newToyObj)

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToyObj)
  })
    .then(response => response.json())
    .then(toyObj => {
      renderOneToy(toyObj) // pessimistic rendering
    })

  event.target.reset() // or newToyForm.reset()

})


collectionDiv.addEventListener('click', event => {
  if (event.target.matches('button.like-btn')) {

    const id = event.target.dataset.id
    const likesPtag = event.target.previousElementSibling
    const likes = parseInt(likesPtag.textContent) + 1
    likesPtag.textContent = `${likes} Likes` // optimistic rendering

    fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ likes }) // {likes: likes}
    })
    // .then(response => response.json())
    // .then(data => {
    //   likesPtag.textContent = `${data.likes} Likes`
    // })

  }
})

getAllToys()

/*** ANNIE TOY TALE REVIEW ***/

// const toyGetRequest = "http://localhost:3000/toys"
// let addToy = false;

// // document.addEventListener("DOMContentLoaded", () => {
//   const toyCollection = document.querySelector("#toy-collection")
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   const form = document.querySelector(".add-toy-form")
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// // });

// //1. create a function to get the toys
// //2. inside of this function make a get request to local host
// //3. after the request, iterate through the response and render each element in the response collection to the DOM
// function getToy(){
//   fetch(toyGetRequest)
//   .then(response => response.json())
//   .then(toysObject => {
//     // renderToy(toysObject)
//     toysObject.forEach((toy) => {
//       renderToy(toy)
//     })
//   })
// }

// //helper function to render toys from fetch
// function renderToy(toy){
//   const div = document.createElement('div')
//   div.dataset.id = toy.id
//   div.classList.add('card')
//   let {name, image, likes} = toy
//   div.innerHTML = `
//     <h2>${name}</h2>
//     <img src=${image} class="toy-avatar" />
//     <p>${likes} Likes </p>
//     <button class="like-btn">Like <3</button>`
//   toyCollection.append(div) 
// }

// getToy();

// form.addEventListener("submit", (event)=> {
//   event.preventDefault()
//   const name = event.target.name.value
//   const image = event.target.name.value
//   fetch(toyGetRequest, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       name,
//       image,
//       likes: 0
//     })
//   .then(resp => resp.json())
//   .then(newToy => {
//       renderToy(newToy)
//       event.target.reset()
//   })
// })

// //1. listen for a click event on the toy collection b/c it has all the toys (bubbling)
// toyCollection.addEventListener("click", (event) =>{
//   // console.log(event.target)
//   if (event.target.matches("button.like-btn")){
//     const div = event.target.closest('div')
//     const pLikes = event.target.previousElementSibling
//     const newLikes = parseInt(pLikes.textContent) + 1
//     fetch(`${toyGetRequest}/${div.dataset.id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         likes: newLikes
//       })
//     })
//     .then(resp => resp.json())
//     .then(data => pLikes.textContent = `${data.likes} Likes`)
//   }
// })