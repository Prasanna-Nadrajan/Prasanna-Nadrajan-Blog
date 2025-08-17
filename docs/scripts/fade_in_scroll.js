document.addEventListener('DOMContentLoaded', () => {
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const options = {
        root: null, // Use the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing after it's visible
                observer.unobserve(entry.target);
            }
        });
    }, options);

    fadeInSections.forEach(section => {
        observer.observe(section);
    });
});