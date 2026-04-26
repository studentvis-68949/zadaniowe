let isRed = true;

function changeTheme() {
  const theme = document.getElementById("theme-style");

  if (isRed) {
    theme.href = "green.css";
  } else {
    theme.href = "red.css";
  }

  isRed = !isRed;
}

function toggleCV() {
  const cv = document.getElementById("cv");

  if (cv.style.display === "none") {
    cv.style.display = "block";
  } else {
    cv.style.display = "none";
  }
}

function showSection(sectionId) {
  const sections = ["projekty", "doswiadczenie", "edukacja"];

  sections.forEach(id => {
    const el = document.getElementById(id);

    if (id === sectionId) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });
}

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let isValid = true;

    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.getElementById("successMessage").textContent = "";

    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name === "" || /\d/.test(name)) {
      document.getElementById("nameError").textContent = "Podaj poprawne imię";
      isValid = false;
    }

    if (surname === "" || /\d/.test(surname)) {
      document.getElementById("surnameError").textContent = "Podaj poprawne nazwisko";
      isValid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      document.getElementById("emailError").textContent = "Niepoprawny email";
      isValid = false;
    }

    if (message === "") {
      document.getElementById("messageError").textContent = "Wpisz wiadomość";
      isValid = false;
    }

    if (isValid) {
      document.getElementById("successMessage").textContent = "Formularz wysłany!";
    }
  });
}

fetch("data.json")
  .then(response => response.json())
  .then(data => {

    // PROJEKTY
    const projektyList = document.getElementById("projekty-list");
    if (projektyList) {
      data.projekty.forEach(projekt => {
        const li = document.createElement("li");
        li.textContent = projekt;
        projektyList.appendChild(li);
      });
    }

    // UMIEJĘTNOŚCI
    const skillsList = document.getElementById("skills-list");
    if (skillsList) {
      data["Umiejętności"].forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        skillsList.appendChild(li);
      });
    }

  })
  .catch(error => console.log("Błąd:", error));
