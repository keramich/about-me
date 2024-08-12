document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    let currentActiveTab = document.querySelector('.tab-content.active');

    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            const activeTab = this.getAttribute('data-tab');

            // If the clicked tab is already active, do nothing
            if (currentActiveTab && currentActiveTab.id === activeTab) {
                return;
            }

            // Remove active class from all tab links
            tabLinks.forEach(link => link.classList.remove('active'));

            // Fade out the current tab content
            if (currentActiveTab) {
                currentActiveTab.classList.remove('active');
                currentActiveTab.style.opacity = 0;

                // After fade-out completes, switch to the new tab content
                currentActiveTab.addEventListener('transitionend', () => {
                    currentActiveTab.style.display = 'none';

                    // Display the new tab content and fade it in
                    const newActiveTab = document.getElementById(activeTab);
                    newActiveTab.style.display = 'block';

                    // Delay the fade-in to ensure display is set
                    setTimeout(() => {
                        newActiveTab.style.opacity = 1;
                        newActiveTab.classList.add('active');
                    }, 20); // Small delay to trigger the transition

                    currentActiveTab = newActiveTab;
                }, { once: true });
            } else {
                // If no current tab is active (initial load), just show the new tab
                const newActiveTab = document.getElementById(activeTab);
                newActiveTab.style.display = 'block';
                newActiveTab.style.opacity = 1;
                newActiveTab.classList.add('active');
                currentActiveTab = newActiveTab;
            }

            // Add active class to the clicked tab link
            this.classList.add('active');
        });
    });

    // Show the first tab content by default
    document.querySelector('.tab-link').click();
});
