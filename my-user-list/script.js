"use strict";

const BASE_URL = "https://user-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/users";
const SHOW_URL = BASE_URL + "/api/v1/users/";

const dataPanel = document.querySelector("#data-panel");
const modal = document.querySelector("#user-modal");
const closeModalBtn = document.querySelector(".close-btn");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");

let data = [];
let filteredUsers = [];

const USERS_PER_PAGE = 12;
let currentPage = 1;

// const addToFavorite = (id) => {
//   const list = JSON.parse(localStorage.getItem("favoriteUsers")) || [];
//   const user = data.find((user) => user.id === id);

//   if (list.some((user) => user.id === id)) {
//     return alert("已經在收藏清單中！");
//   }

//   list.push(user);
//   localStorage.setItem("favoriteUsers", JSON.stringify(list));
// };

// feature: open and close modal
const openModal = () => {
  modal.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
};

closeModalBtn.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

dataPanel.addEventListener("click", function (event) {
  if (event.target.matches(".user-name")) {
    const id = event.target.dataset.id; //

    axios.get(SHOW_URL + id).then(function (res) {
      const data = res.data;
      const userAvatar = document.querySelector("#modal-user-avatar");
      const userName = document.querySelector("#modal-user-name");
      const userAge = document.querySelector("#modal-user-age");
      const userEmail = document.querySelector("#modal-user-email");

      userAvatar.src = data.avatar;
      userName.innerHTML = `<span>${data.name} ${
        data.surname
      }</span> <span style="font-size: 0.9rem">(${
        data.gender === "female" ? "She / her / Ms." : "He / his / Mr."
      })</span>`;
      userAge.innerHTML = `<span>Birthday:</span> <span style="color: #3d5361; font-weight: 900;">${data.birthday} (${data.age})</span>`;
      userEmail.innerHTML = `based in</span> <span style="color: #3d5361; font-weight: 900;">${data.region}</span> | email: ${data.email}`;

      openModal();
    });
    // } else if (event.target.matches(".btn-favorite")) {
    //   const id = +event.target.dataset.id;
    //   addToFavorite(id);
  }
});

const generateUserList = (data) => {
  let userListTemplate = "";
  data.map(
    (el) =>
      (userListTemplate += `
      <div class="user">
        <div class="user-title" data-id=${el.id}>
          <img src="${el.avatar}" class="user-avatar">
        </div>
        <div class="user-body">
          <p class="user-name" data-id=${el.id}>${el.name}<br>${el.surname} </p>
          <button class="btn-favorite" data-id="${el.id}">❤</button>
          </div>
      </div>
  `)
  );
  dataPanel.innerHTML = userListTemplate;
};

axios.get(INDEX_URL).then((res) => {
  data = res.data.results; // DO NOT USE CONST HERE!
  generatePaginator(data.length);
  generateUserList(getUsersByPage(1));

  // feature: search
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const keyword = searchInput.value.trim().toLowerCase();

    if (!keyword.length) {
      return alert("請輸入有效字串！");
    }

    filteredUsers = data.filter((user) =>
      user.surname.toLowerCase().includes(keyword)
    );

    generatePaginator(filteredUsers.length);
    generateUserList(getUsersByPage(1));
  });
});

// feeature: pagination
const generatePaginator = (amount) => {
  const NumberOfPage = Math.ceil(amount / USERS_PER_PAGE);

  let rawHTML = "";
  for (let page = 1; page <= NumberOfPage; page++) {
    rawHTML += `
    <li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>
    `;
  }

  paginator.innerHTML = rawHTML;
};

const getUsersByPage = (page) => {
  const targetData = filteredUsers.length ? filteredUsers : data;
  const startIndex = (page - 1) * USERS_PER_PAGE; // (page - 1) offset

  return targetData.slice(startIndex, startIndex + USERS_PER_PAGE);
};

paginator.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    currentPage = +event.target.dataset.page;
    generateUserList(getUsersByPage(currentPage));
  }
});
