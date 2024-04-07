
const mase = "http://localhost:3000/films"


document.addEventListener("DOMContentLoaded", () => {
    getMovies();
    document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});
//introduce a function that will be used to get a specific movie
function getMovies() {
    fetch(mase)
    .then(res => res.json())
    .then(movies => {
        movies.forEach(movie => {renderMovieList(movie)})
        const firstMovie = document.querySelector("#id1");
        firstMovie.dispatchEvent(new Event("click"));
    })
}
// change the giveMovieList function to add delete buttons
function renderMovieList(movie) {
    const li = document.createElement("li");
    li.textContent = `${movie.title}`;
    li.id = "id" + movie.id;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent li click event from being triggered
        deleteMovie(movie.id);
    });

    li.appendChild(deleteButton);

    const ul = document.querySelector("#films");
    ul.appendChild(li);
    li.classList.add("film");
    li.classList.add('item');
    li.addEventListener("click", () => {handleMovieClick(movie)});
}

// Function to handle the deletion of a movie
function deleteMovie(movieId) {
    fetch(`${db}/${movieId}`, {
        method: "DELETE",
    })
    .then(response => {
        if (response.ok) {
            // Remove the movie from the list 
            const movieElement = document.querySelector(`#id${movieId}`);
            movieElement.remove();
        } else {
            throw new Error('Failed to delete movie');
        }
    })
    .catch(error => {
        console.error('Error deleting movie:', error);
    });
}

//in order to handle the movie when clicked

function handleMovieClick(movie) {
    const poster = document.querySelector("img#poster")
    poster.src = movie.poster;
    poster.alt = movie.title;
    const info = document.querySelector("#showing");
    info.querySelector("#title").textContent = movie.title;
    info.querySelector("#runtime").textContent = movie.runtime+" minutes";
    info.querySelector("#film-info").textContent = movie.description;
    info.querySelector("#showtime").textContent = movie.showtime;
    info.querySelector("#ticket-num").textContent = movie.capacity - movie.tickets_sold + " remaining tickets";
}
//declaring a function in order to buy tickets
function handleBuyTicket(a) {
    const ticketDiv = document.querySelector("#ticket-num");
    const tickets = ticketDiv.textContent.split(" ")[0];
    if (tickets > 0) {
        ticketDiv.textContent = tickets - 1 + " remaining tickets";
    }
    else if (tickets == 0) {
        //when tickets are sold out

        alert("No more tickets!");
        a.target.classList.add("sold-out");
        a.target.classList.remove("orange");
    }
}
  