const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";

const movies = []; //電影總清單
let filteredMovies = []; //搜尋清單

const MOVIES_PER_PAGE = 12;

const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");

const viewSwitchContainer = document.querySelector("#view-switch-container");
const barViewIcon = document.querySelector("#bar-view-icon");
const gridViewIcon = document.querySelector("#grid-view-icon");

let currentView = "barView";
let searchMode = true;

function showMovieModal(id) {
  // get elements
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");

  // send request to show api
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results;

    // insert data into modal ui
    modalTitle.innerText = data.title;
    modalDate.innerText = "Release date: " + data.release_date;
    modalDescription.innerText = data.description;
    modalImage.innerHTML = `<img src="${
      POSTER_URL + data.image
    }" alt="movie-poster" class="img-fluid">`;
  });
}

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const movie = movies.find((movie) => movie.id === id);

  if (list.some((movie) => movie.id === id)) {
    return alert("此電影已經在收藏清單中！");
  }

  list.push(movie);
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
}

// listen to data panel
dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(+event.target.dataset.id);
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(Number(event.target.dataset.id));
  }
});

// listen to search form
searchForm.addEventListener("submit", function onSearchFormSubmitted(event) {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();

  searchMode = true;
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );

  if (filteredMovies.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`);
  }

  renderPaginator(filteredMovies.length); // 重製分頁器
  renderMovieList(getMoviesByPage(1), currentView); // 預設顯示第 1 頁的搜尋結果
});

// 總電影
viewSwitchContainer.addEventListener("click", (event) => {
  renderPaginator(movies.length);
  if (event.target.matches("#bar-view-icon")) {
    currentView = "barView";
  } else if (event.target.matches("#grid-view-icon")) {
    dataPanel.innerHTML = "";

    currentView = "gridView";
  }
  renderMovieList(getMoviesByPage(1), currentView);
});

paginator.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    const page = +event.target.dataset.page;
    renderMovieList(getMoviesByPage(page), currentView);
  }
});

axios.get(INDEX_URL).then((response) => {
  movies.push(...response.data.results); // deconstruct using three dots (...)
  // renderMovieList(getMoviesByPage(1), "barView"); // render the data shown on Page 1; by default, render in bar view
  renderPaginator(movies.length);
  renderMovieList(getMoviesByPage(1), "barView");
});

function renderPaginator(numberOfMovies) {
  const numberOfPages = Math.ceil(numberOfMovies / MOVIES_PER_PAGE);
  let rawHTML = "";

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`; //
  }
  paginator.innerHTML = rawHTML;
}

function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies; // see if there is any favorite movies already in store
  const startIndex = (page - 1) * MOVIES_PER_PAGE; // (page - 1) offset

  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE);
} // followed by "renderMoviesList"

function renderMovieList(data, view) {
  let rawHTML = "";

  if (view === "gridView") {
    data.forEach((el) => {
      // title, image, id
      rawHTML += `<div class="col-sm-3">
      <div class="mb-2">
        <div class="card">
          <img src="${
            POSTER_URL + el.image
          }" class="card-img-top" alt="Movie Poster">
          <div class="card-body">
            <h5 class="card-title">${el.title}</h5>
          </div>
          <div class="card-footer">
            <button 
              class="btn btn-primary 
              btn-show-movie" 
              data-bs-toggle="modal" 
              data-bs-target="#movie-modal" 
              data-id="${el.id}"
            >
              More
            </button>
            <button 
              class="btn btn-info btn-add-favorite" 
              data-id="${el.id}"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>`;
    });
  } else if (view === "barView") {
    data.forEach((el) => {
      rawHTML += `
      <div class="bar-view-list-item">
        <p class="item-title">${el.title}</p>

        <button 
        class="btn btn-primary 
        btn-show-movie" 
        data-bs-toggle="modal" 
        data-bs-target="#movie-modal" 
        data-id="${el.id}"
        >
        More
        </button>

        <button 
        class="btn btn-info btn-add-favorite" 
        data-id="${el.id}"
        >
        +
        </button>
      </div>
      `;
    });
  }
  dataPanel.innerHTML = rawHTML;
}
