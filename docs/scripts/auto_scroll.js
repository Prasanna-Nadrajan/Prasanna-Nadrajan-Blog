document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return; // Exit if the element is not found

    let scrollSpeed = 0.5; // Adjust this value to control the automatic scroll speed
    let projects = Array.from(projectsGrid.children); // Get all project cards

    // Automatic Scroll Logic
    function autoScroll() {
        projectsGrid.scrollLeft += scrollSpeed;

        // If the first card is out of view, move it to the end
        const firstCard = projects[0];
        if (projectsGrid.scrollLeft >= firstCard.offsetWidth + 20) { // 20 is the gap value
            projectsGrid.appendChild(firstCard);
            projects = Array.from(projectsGrid.children);
            projectsGrid.scrollLeft -= (firstCard.offsetWidth + 20); // Adjust scroll position
        }

        window.requestAnimationFrame(autoScroll);
    }

    // Mouse Drag Logic
    let isDown = false;
    let startX;
    let scrollLeft;

    projectsGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        projectsGrid.classList.add('active');
        projectsGrid.style.cursor = 'grabbing';
        startX = e.pageX - projectsGrid.offsetLeft;
        scrollLeft = projectsGrid.scrollLeft;
    });

    projectsGrid.addEventListener('mouseleave', () => {
        isDown = false;
        projectsGrid.classList.remove('active');
        projectsGrid.style.cursor = 'grab';
    });

    projectsGrid.addEventListener('mouseup', () => {
        isDown = false;
        projectsGrid.classList.remove('active');
        projectsGrid.style.cursor = 'grab';
    });

    projectsGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - projectsGrid.offsetLeft;
        const walk = (x - startX) * 3; // The '3' is a speed multiplier
        projectsGrid.scrollLeft = scrollLeft - walk;
    });

    // Initial state: Start the automatic scroll loop
    window.requestAnimationFrame(autoScroll);
});