const personsData = [
  {
    name: "Ahmet Eygi",
    address: "Bornova",
    number: ["000 000 00 00", "111 111 11 11"],
    photo:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
  {
    name: "Ahmet Hakan Eygi",
    address: "İstanbul",
    number: "222 222 22 22",
    photo:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
  {
    name: "Beril Canay",
    address: "Bursa",
    number: ["444 444 44 44", "555 555 55 55"],
    photo:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
  {
    name: "Cevat Aydın",
    address: "Balıkesir",
    number: "222 222 22 22",
    photo:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
  {
    name: "Derin Deniz",
    address: "Trabzon",
    number: ["000 000 00 00", "111 111 11 11"],
    photo:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
  {
    name: "Eser Yılmaz",
    address: "Balçova",
    number: "222 222 22 22",
    photo:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
  {
    name: "Fatih terim",
    address: "Adana",
    number: ["000 000 00 00", "111 111 11 11"],
    photo:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
  {
    name: "Faruk Güngör",
    address: "İstanbul",
    number: "222 222 22 22",
    photo:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
  {
    name: "Kıymet Zümra Bay",
    address: "İstanbul",
    number: "577 667 78 90",
    photo:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
  {
    name: "Mehmet Polat",
    address: "İstanbul",
    number: ["000 000 00 00", "111 111 11 11"],
    photo:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
  {
    name: "Zümra Bay",
    address: "Çanakkale",
    number: "545 472 23 87",
    photo:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/egg-3442-4c317615ec1fd800728672f2c168aca5@1x.jpg",
  },
];

document.querySelector(".show-modal").addEventListener("click", function () {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const btnCloseModal = document.querySelector(".close-modal");
  const btnsOpenModal = document.querySelectorAll(".show-modal");

  const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener("click", openModal);

  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    // console.log(e.key);

    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
});

const submit = document
  .getElementById("submit")
  .addEventListener("click", function () {
    let text1 = document.getElementById("name").value;
    let text2 = document.getElementById("address").value;
    let text3 = document.getElementById("number").value;
    let newUser = { name: text1, address: text2, number: text3 };

    personsData.push(newUser);
    localStorage.setItem("users", JSON.stringify(personsData));
    renderPersons(personsData);
  });

function personTemplate(person) {
  return `
  <div class = "character">
    <img class = "person-photo" src ="${person.photo}">
    <h2 class = "person-name">
      ${person.name}
      <span class = "address">(${person.address})</span>
    </h2>
    <p>(${person.number})</p>
  </div>
  `;
}

const loadPage = (persons) => {
  if (localStorage.getItem("users")) {
    renderPersons(JSON.parse(localStorage.getItem("users")));
  } else {
    renderPersons(persons);
  }
};

const renderPersons = (persons) => {
  document.getElementById("persons").innerHTML = `
  ${persons.map(personTemplate)}
`;
};

(async function () {
  const usersFromJSONPlaceholder = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  const users = await usersFromJSONPlaceholder.json();

  await loadPage(personsData);
  if (document.getElementById("searchBar")) {
    document.getElementById("searchBar").addEventListener("keyup", (e) => {
      const searchString = e.target.value;
      const persons = [...personsData];
      const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(searchString)
      );
      // console.log(filteredPersons)
      renderPersons(filteredPersons);
    });
  }
})();
