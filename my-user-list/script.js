"use strict";

const BASE_URL = "https://user-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/users";
const SHOW_URL = BASE_URL + "/api/v1/users/";

const dataPanel = document.querySelector("#data-panel");
const modal = document.querySelector("#user-modal");
const closeModalBtn = document.querySelector(".close-btn");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

let data = [];
let filteredUsers = [];

const openModal = () => {
  modal.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
};

dataPanel.addEventListener("click", function (event) {
  if (event.target.matches(".user-name")) {
    const id = event.target.dataset.id; //

    axios.get(SHOW_URL + id).then(function (res) {
      const data = res.data;
      console.log(res.data);
      const userName = document.querySelector("#modal-user-name");
      const userAge = document.querySelector("#modal-user-age");
      const userEmail = document.querySelector("#modal-user-email");

      userName.innerText = `${data.name} ${data.surname} (${
        data.gender === "female" ? "She / her / Ms." : "He / his / Mr."
      })`;
      userAge.innerText = `Birthday: ${data.birthday} (${data.age})`;
      userEmail.innerText = `based in ${data.region} | email: ${data.email}`;

      openModal();
    });
  }
});

closeModalBtn.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

const generateUserList = (data) => {
  let userListTemplate = "";
  data.map(
    (el) =>
      (userListTemplate += `
      <div class="user" >
        <div class="user-title" data-id=${el.id}>
          <img src="${el.avatar}" class="user-avatar">
        </div>
        <div class="user-body">
          <p class="user-name" data-id=${el.id}>${el.name}<br>${el.surname} </p>
        </div>
      </div>
  `)
  );
  dataPanel.innerHTML = userListTemplate;
};

axios.get(INDEX_URL).then((res) => {
  const data = res.data.results;
  generateUserList(data);

  // searchbar
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const keyword = searchInput.value.trim().toLowerCase();

    if (!keyword.length) {
      return alert("請輸入有效字串！");
    }

    filteredUsers = data.filter((user) =>
      user.surname.toLowerCase().includes(keyword)
    );

    generateUserList(filteredUsers);
  });
});
