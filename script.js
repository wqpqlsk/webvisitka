const cursor = document.querySelector(".cursor");
const cursorText = document.querySelector(".cursor-text");
const mouseGlow = document.querySelector(".mouse-glow");

const hero = document.querySelector(".hero");
const heroCopy = document.querySelector(".hero-copy");
const heroCard = document.querySelector(".hero-card");
const heroTitle = document.querySelector(".hero-copy h1");

const stars = document.querySelectorAll(".star");
const projects = document.querySelectorAll(".project");

const magneticElements = document.querySelectorAll(
    ".hero-link, .copy-button, .socials a, .nav a"
);

const revealElements = document.querySelectorAll(
    ".section, .project, .education-main, .about-text"
);

const navLinks = document.querySelectorAll(".nav a");
const copyButton = document.querySelector(".copy-button");
const clock = document.querySelector("#clock");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let smoothMouseX = mouseX;
let smoothMouseY = mouseY;

function initCursor() {
    if (!cursor || window.innerWidth <= 700) {
        return;
    }

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        if (mouseGlow) {
            mouseGlow.style.left = `${mouseX}px`;
            mouseGlow.style.top = `${mouseY}px`;
        }
    });

    function animateCursor() {
        smoothMouseX +=
            (mouseX - smoothMouseX) * 0.14;

        smoothMouseY +=
            (mouseY - smoothMouseY) * 0.14;

        cursor.style.left =
            `${smoothMouseX}px`;

        cursor.style.top =
            `${smoothMouseY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document
        .querySelectorAll("[data-cursor]")
        .forEach((element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.classList.add("active");

                    if (cursorText) {
                        cursorText.textContent =
                            element.dataset.cursor ||
                            "СМОТРЕТЬ";
                    }
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    cursor.classList.remove("active");
                }
            );

        });
}

initCursor();

if (window.innerWidth > 700) {
    magneticElements.forEach((element) => {

        element.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;
            }
        );

        element.addEventListener(
            "mouseleave",
            () => {
                element.style.transform = "";
            }
        );

    });
}

if (
    hero &&
    heroCopy &&
    window.innerWidth > 700
) {
    hero.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            if (heroTitle) {
                heroTitle.style.transform =
                    `translate(
                        ${x * 8}px,
                        ${y * 6}px
                    )`;
            }
        }
    );

    hero.addEventListener(
        "mouseleave",
        () => {

            if (heroTitle) {
                heroTitle.style.transform = "";
            }
        }
    );
}

if (stars.length && window.innerWidth > 700) {
    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                event.clientX /
                window.innerWidth -
                0.5;

            const y =
                event.clientY /
                window.innerHeight -
                0.5;

            stars.forEach(
                (star, index) => {

                    const strength =
                        8 + index * 3;

                    const moveX =
                        x * strength;

                    const moveY =
                        y * strength;

                    star.style.transform =
                        `translate(
                            ${moveX}px,
                            ${moveY}px
                        )`;
                }
            );
        }
    );
}

if (
    heroCard &&
    window.innerWidth > 700
) {
    heroCard.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroCard.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            const rotateX =
                y * -3;

            const rotateY =
                x * 3;

            heroCard.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        }
    );

    heroCard.addEventListener(
        "mouseleave",
        () => {
            heroCard.style.transform = "";
        }
    );
}

if (window.innerWidth > 700) {
    projects.forEach((project) => {

        project.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    project.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) *
                    -2.5;

                const rotateY =
                    ((x / rect.width) - 0.5) *
                    2.5;

                project.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;
            }
        );

        project.addEventListener(
            "mouseleave",
            () => {
                project.style.transform = "";
            }
        );

    });
}

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {
                    entry.target.classList.add(
                        "visible"
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach((link) => {

                    const href =
                        link.getAttribute("href");

                    link.classList.toggle(
                        "active",
                        href ===
                        `#${entry.target.id}`
                    );

                });

            });

        },
        {
            threshold: 0.45
        }
    );

sections.forEach((section) => {
    sectionObserver.observe(section);
});

navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});

const heroLink =
    document.querySelector(".hero-link");

if (heroLink) {
    heroLink.addEventListener(
        "click",
        (event) => {

            const target =
                document.querySelector("#about");

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }
    );
}

if (copyButton) {
    copyButton.addEventListener(
        "click",
        async () => {

            const email =
                copyButton.dataset.email;

            if (!email) {
                return;
            }

            try {
                await navigator.clipboard
                    .writeText(email);

                copyButton.textContent =
                    "ПОЧТА СКОПИРОВАНА ✓";

                copyButton.classList.add(
                    "copied"
                );

                setTimeout(
                    () => {

                        copyButton.textContent =
                            "СКОПИРОВАТЬ ПОЧТУ";

                        copyButton.classList.remove(
                            "copied"
                        );

                    },
                    1800
                );

            } catch (error) {
                console.error(
                    "Ошибка копирования:",
                    error
                );
            }

        }
    );
}

function updateClock() {

    if (!clock) {
        return;
    }

    const now =
        new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");

    clock.textContent =
        `${hours}:${minutes}:${seconds}`;
}

updateClock();

setInterval(
    updateClock,
    1000
);

let ticking = false;

window.addEventListener(
    "scroll",
    () => {

        if (ticking) {
            return;
        }

        ticking = true;

        requestAnimationFrame(
            () => {

                const scrollY =
                    window.scrollY;

                if (
                    heroTitle &&
                    scrollY <
                    window.innerHeight
                ) {

                    const amount =
                        scrollY * 0.035;

                    heroTitle.style.marginTop =
                        `${amount}px`;
                }

                ticking = false;
            }
        );
    }
);

stars.forEach(
    (star, index) => {

        star.style.transition =
            `transform ${
                0.25 + index * 0.05
            }s ease-out`;

    }
);

projects.forEach(
    (project) => {

        const image =
            project.querySelector(
                ".project-image"
            );

        const title =
            project.querySelector(
                "h3"
            );

        if (!image || !title) {
            return;
        }

        project.addEventListener(
            "mouseenter",
            () => {

                title.style.transform =
                    "translateX(8px)";

                title.style.transition =
                    "transform .3s ease";
            }
        );

        project.addEventListener(
            "mouseleave",
            () => {
                title.style.transform =
                    "";
            }
        );

    }
);

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

if (reducedMotion.matches) {
    document.documentElement.style
        .scrollBehavior = "auto";
}