const BASE_URL = "https://webdev.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/movies/";
const POSTER_URL = BASE_URL + "/posters/";

const dataPanel = document.querySelector("#data-panel");

const movies = [];

axios
  .get(INDEX_URL)
  .then(function (res) {
    movies.push(...res.data.results);
    // movies.push(...response.data.results) 這一段能取代上次嘗試時用迭代器的寫法，直接展開 response.data.results 裡的陣列元素，讓每個元素都變成 push 方法中的一個參數，一一推進 movies 裡。
    renderMovieList(movies);
    getDetails();
  })
  .catch("data fetch failure");

function renderMovieList(data) {
  let rawHTML = "";
  data.forEach((item) => {
    // title, image
    rawHTML += `<div class="col-sm-3">
      <div class="mb-2">
        <div class="card">
          <img src="${
            POSTER_URL + item.image
          }" class="card-img-top" alt="Movie Poster">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
          </div>
          <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${
            item.id
          }">More</button>
            <button class="btn btn-info btn-add-favorite">+</button>
          </div>
        </div>
      </div>
    </div>`;
  });
  dataPanel.innerHTML = rawHTML;
}

function getDetails() {
  dataPanel.addEventListener("click", function (event) {
    if (event.target.matches(".btn-show-movie")) {
      console.log(event.target);
      console.log(event.target.dataset.id);
      showMovieModal(event.target.dataset.id);
    }
  });
}

function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");

  axios.get(INDEX_URL + id).then((response) => {
    console.log(response);
    const data = response.data.results;
    modalTitle.innerText = data.title;
    modalDate.innerText = "Release date: " + data.release_date;
    modalDescription.innerText = data.description;
    modalImage.innerHTML = `<img src="${
      POSTER_URL + data.image
    }" alt="movie-poster" class="img-fluid">`;
  });
}
