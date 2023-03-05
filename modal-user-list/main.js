"use strict";

const BASE_URL = "https://user-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/users";
const SHOW_URL = BASE_URL + "/api/v1/users/";

const dataPanel = document.querySelector("#data-panel");
const modal = document.querySelector("#user-modal");
const openModalBtn = document.querySelector("#modal-btn"); //
const closeModalBtn = document.querySelector(".close-btn");

const generateUserList = (data) => {
  let userListTemplate = "";
  data.map(
    (el) =>
      (userListTemplate += `
      <div class="user">
        <div class="user-title">
          <img src="${el.avatar}" class="user-avatar">
        </div>
        <div class="user-body">
          <p class="user-name" data-id=${el.id}>${el.name}<br>${el.surname}</p>
        </div>
      </div>
  `)
  );
  dataPanel.innerHTML = userListTemplate;
};

const openModal = () => {
  modal.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
};

openModalBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

axios.get(INDEX_URL).then((res) => {
  const data = res.data.results;
  generateUserList(data);
});

dataPanel.addEventListener("click", function (event) {
  if (event.target.matches(".user-name")) {
    const id = event.target.dataset.id;

    axios.get(SHOW_URL + id).then(function (res) {
      const data = res.data;
      console.log(res.data);
      const userName = document.querySelector("#modal-user-name");
      const userGender = document.querySelector("#modal-user-gender");
      const userAge = document.querySelector("#modal-user-age");
      const userEmail = document.querySelector("#modal-user-email");

      userName.innerText = `${data.name} ${data.surname}`;
      userGender.innerText = data.gender;
      userAge.innerText = data.age;
      userEmail.innerText = data.email;

      openModal();
    });
  }
});
