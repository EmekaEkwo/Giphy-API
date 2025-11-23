console.log("script.js connected!");

// ---- Step 7: Fetch gifs and store original URLs in an images array ----

// Giphy API key
const API_KEY = "UjkAjqX9VxaSLRy3KFXlSj5Q6h39h7hk";

// This will hold the list of image URLs
let images = [];

/**
 * Fetch gifs from Giphy based on a search term.
 * Stores the original image URLs in the `images` array.
 */
async function fetchGifs(searchTerm = "dogs") {
  try {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
      searchTerm
    )}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

    const response = await fetch(endpoint);
    const data = await response.json();

    // Pulls out the original image URLs and store them in the images array
    images = data.data.map(gif => gif.images.original.url);

    // Preview data in the console
    console.log("Fetched images:", images);
  } catch (error) {
    console.error("Error fetching gifs:", error);
  }
}

// ---- Step 8: Display gifs when the button is clicked ----

// a. & b. Get the container and button with querySelector
const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");

// Extra credit: search input 
const searchInput = document.querySelector("#search-input");

// c. Attach an event listener to the button
fetchButton.addEventListener("click", async function () {
  // Step 10 (extra credit): get search term from the input
  let searchTerm = searchInput ? searchInput.value.trim() : "";

  // Default term if the input is empty
  if (searchTerm === "") {
    searchTerm = "dogs";
  }

  // Fetch gifs for this search term
  await fetchGifs(searchTerm);

  // d. Inside the event listener, iterate through images and print them
  gifContainer.innerHTML = ""; // clear previous gifs

  for (let i = 0; i < images.length; i++) {
    const imageUrl = images[i];

    gifContainer.innerHTML += `
      <img src="${imageUrl}" class="col-3 mb-3">
    `;
  }
});
