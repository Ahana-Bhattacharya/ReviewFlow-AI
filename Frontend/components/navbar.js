// ===============================
// navbar.js
// ReviewFlow AI
// ===============================

function createNavbar() {

    return `

    <header>

        <nav class="navbar">

            <div class="logo">

                <img
                    src="assets/logo.svg"
                    class="logo-image"
                    alt="ReviewFlow AI Logo"
                >

                <span>
                    ReviewFlow AI
                </span>

            </div>


            <ul class="nav-links">

                <li>
                    <a href="#home" class="active">
                        Home
                    </a>
                </li>

                <li>
                    <a href="#review">
                        Review
                    </a>
                </li>

                <li>
                    <a href="#features">
                        Features
                    </a>
                </li>

                <li>
                    <a href="#about">
                        About
                    </a>
                </li>

            </ul>

        </nav>

    </header>

    `;

}


// ===============================
// Active Navigation Highlight
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".nav-links a");


    function updateActiveLink() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 120;

            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    }


    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.forEach((item) => {

                item.classList.remove("active");

            });

            link.classList.add("active");

        });

    });

});