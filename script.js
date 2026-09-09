/* =========================================================
   MOBILE MENU
========================================================= */

const navToggle =
  document.getElementById("nav-toggle");


document
  .querySelectorAll(".main-nav a")
  .forEach(link => {

    link.addEventListener("click", () => {

      if (navToggle) {
        navToggle.checked = false;
      }

    });

  });



/* =========================================================
   CONTACT FORM — CODEPEN TESTING
========================================================= */

const contactForm =
  document.querySelector(".contact-form");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

    }
  );

}



/* =========================================================
   YOUTUBE THUMBNAIL FALLBACK
========================================================= */

document
  .querySelectorAll(".youtube-card img")
  .forEach(image => {

    image.addEventListener(
      "error",
      function () {

        if (
          this.dataset.fallbackApplied === "true"
        ) {
          return;
        }


        const match =
          this.src.match(/\/vi\/([^/]+)\//);


        if (!match) {
          return;
        }


        this.dataset.fallbackApplied =
          "true";


        this.src =
          `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg`;

      }
    );

  });