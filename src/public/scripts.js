console.log('script.js loaded');

// Define the loadPage function outside the DOMContentLoaded event
function loadPage(url) {
    console.log(`Loading page: ${url}`);
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector('.content').innerHTML = html;
            window.history.pushState({ path: url }, '', url);
        })
        .catch(error => console.error('Error loading page:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            loadPage(this.getAttribute('href'));
        });
    });

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.path) {
            loadPage(event.state.path);
        }
    });
});
