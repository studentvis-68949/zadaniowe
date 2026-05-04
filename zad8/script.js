let isRed = true;

// ===== ZMIANA MOTYWU =====
function changeTheme() {
  const theme = document.getElementById("theme-style");

  if (isRed) {
    theme.href = "green.css";
  } else {
    theme.href = "red.css";
  }

  isRed = !isRed;
}

// ===== POKAŻ / UKRYJ CV =====
function toggleCV() {
  const cv = document.getElementById("cv");

  if (cv.style.display === "none") {
    cv.style.display = "block";
  } else {
    cv.style.display = "none";
  }
}

// ===== SEKCJE =====
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

// ===== ZADANIE 5 + 8 (FORM + BACKEND) =====
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

    // 👉 ZAD8 - wysyłka do backendu
    if (isValid) {
      const formData = { name, surname, email, message };

      fetch("http://localhost:3000/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById("successMessage").textContent = data.message;
      })
      .catch(err => {
        console.error(err);
        document.getElementById("successMessage").textContent = "Błąd wysyłania!";
      });
    }
  });
}

// ===== ZADANIE 6 (JSON) =====
fetch("data.json")
  .then(response => response.json())
  .then(data => {

    // PROJEKTY (z JSON)
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


// ===== ZADANIE 7 (LOCAL STORAGE) =====
function addProject() {
  const input = document.getElementById("newProject");
  const value = input.value.trim();

  if (value === "") return;

  let projekty = JSON.parse(localStorage.getItem("projektyLS")) || [];

  projekty.push(value);

  localStorage.setItem("projektyLS", JSON.stringify(projekty));

  input.value = "";

  renderProjectsLS();
}

function renderProjectsLS() {
  const list = document.getElementById("projekty-list");
  if (!list) return;

  let projekty = JSON.parse(localStorage.getItem("projektyLS")) || [];

  projekty.forEach((projekt, index) => {
    const li = document.createElement("li");
    li.textContent = projekt;

    const btn = document.createElement("button");
    btn.textContent = "Usuń";
    btn.style.marginLeft = "10px";

    btn.onclick = () => removeProject(index);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function removeProject(index) {
  let projekty = JSON.parse(localStorage.getItem("projektyLS")) || [];

  projekty.splice(index, 1);

  localStorage.setItem("projektyLS", JSON.stringify(projekty));

  location.reload();
}

// запуск
document.addEventListener("DOMContentLoaded", renderProjectsLS);