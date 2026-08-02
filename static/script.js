/* =====================================================
   Flood Prediction.AI
   Modern UI Enhancements
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const button = document.querySelector(".predict-btn");
    const inputs = document.querySelectorAll("input");
    const result = document.querySelector(".result-card");
    const progress = document.querySelector(".progress-bar");

    // ==========================
    // Auto Focus
    // ==========================
    if (inputs.length > 0) {
        inputs[0].focus();
    }

    // ==========================
    // Ripple Effect on Button
    // ==========================
    if (button) {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.className = "ripple";

            ripple.style.width = size + "px";
            ripple.style.height = size + "px";

            ripple.style.left =
                (e.clientX - rect.left - size / 2) + "px";

            ripple.style.top =
                (e.clientY - rect.top - size / 2) + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    }

    // ==========================
    // Form Validation
    // ==========================
    if (form) {

        form.addEventListener("submit", function (event) {

            let valid = true;

            inputs.forEach(input => {

                if (input.value.trim() === "") {

                    valid = false;

                    input.style.borderColor = "#ff5e6c";

                    input.animate([
                        { transform: "translateX(0px)" },
                        { transform: "translateX(-5px)" },
                        { transform: "translateX(5px)" },
                        { transform: "translateX(0px)" }
                    ], {
                        duration: 250
                    });

                } else {

                    input.style.borderColor = "";

                }

            });

            if (!valid) {

                event.preventDefault();
                return;

            }

            button.disabled = true;

            button.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Predicting...';

        });

    }

    // ==========================
    // Floating Input Animation
    // ==========================
    inputs.forEach(input => {

        input.addEventListener("focus", () => {

            input.parentElement.style.transform = "translateY(-2px)";

        });

        input.addEventListener("blur", () => {

            input.parentElement.style.transform = "";

        });

    });

    // ==========================
    // Animated Percentage Counter
    // ==========================
    if (result) {

        const percentage = result.querySelector("h2");

        if (percentage) {

            const target = parseFloat(percentage.innerText);

            let current = 0;

            const counter = setInterval(() => {

                current += Math.max(1, (target - current) / 12);

                if (current >= target) {

                    current = target;

                    clearInterval(counter);

                }

                percentage.innerText =
                    current.toFixed(1) + "%";

            }, 25);

        }

    }

    // ==========================
    // Progress Bar Animation
    // ==========================
    if (progress) {

        const finalWidth = progress.style.width;

        progress.style.width = "0%";

        setTimeout(() => {

            progress.style.transition =
                "width 1.5s cubic-bezier(.2,.8,.2,1)";

            progress.style.width = finalWidth;

        }, 300);

    }

    // ==========================
    // Scroll Reveal Animation
    // ==========================
    const cards =
        document.querySelectorAll(".glass-card,.info-card,.hero-left");

    const observer =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.animate([

                        {
                            opacity: 0,
                            transform: "translateY(40px)"
                        },

                        {
                            opacity: 1,
                            transform: "translateY(0px)"
                        }

                    ], {

                        duration: 700,
                        easing: "ease-out",
                        fill: "forwards"

                    });

                    observer.unobserve(entry.target);

                }

            });

        }, {

            threshold: 0.15

        });

    cards.forEach(card => {

        observer.observe(card);

    });

    // ==========================
    // 3D Card Tilt Effect
    // ==========================
    document.querySelectorAll(".glass-card,.info-card")
        .forEach(card => {

            card.addEventListener("mousemove", e => {

                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;

                const y = e.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) * 6;

                const rotateX =
                    ((rect.height / 2 - y) / rect.height) * 6;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    // ==========================
    // Smooth Hover Glow
    // ==========================
    document.querySelectorAll(".info-card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.boxShadow =
                "0 25px 50px rgba(50,216,255,0.25)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.boxShadow = "";

        });

    });

});

// =======================================
// Inject Ripple CSS
// =======================================

const rippleStyle = document.createElement("style");

rippleStyle.innerHTML = `

.predict-btn{

    position:relative;
    overflow:hidden;

}

.ripple{

    position:absolute;

    border-radius:50%;

    background:rgba(255,255,255,.4);

    transform:scale(0);

    animation:ripple .6s linear;

    pointer-events:none;

}

@keyframes ripple{

    to{

        transform:scale(4);

        opacity:0;

    }

}

`;

document.head.appendChild(rippleStyle);