const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
        } else {
            entry.target.classList.remove("scroll-visible");
        }
    });
});

const hiddenElements = document.querySelectorAll(".scroll-hidden");
console.log(hiddenElements);
hiddenElements.forEach((el) => observer.observe(el));
