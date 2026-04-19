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