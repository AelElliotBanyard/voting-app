document.addEventListener('DOMContentLoaded', () => {
  async function loadConfig() {
    try {
      const response = await fetch('/api/config');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const config = await response.json();

      // Set global variables on the window object
      window.BACKEND_PROTOCOL = config.BACKEND_PROTOCOL;
      window.BACKEND_HOST = config.BACKEND_HOST;
      window.BACKEND_PORT = config.BACKEND_PORT;

      // Initialize the app after configuration is loaded
      initApp();

    } catch (error) {
      console.error('Error loading configuration:', error);
    }
  }

  async function fetchResults() {
    try {
      const protocol = window.BACKEND_PROTOCOL || 'http';
      const host = window.BACKEND_HOST || 'localhost';
      const port = window.BACKEND_PORT || '5001';

      const backendUrl = `${protocol}://${host}:${port}/results`;

      console.log(`Fetching results from: ${backendUrl}`); // Debugging

      const response = await fetch(backendUrl);
      
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      
      const data = await response.json();
      console.log('Results fetched:', data); // Debugging
      return data.results;
    } catch (error) {
      console.error('Error fetching results:', error);
      return [];
    }
  }

  function renderResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No results available</p>';
      return;
    }

    const maxVotes = Math.max(...results.map(result => result.votes), 1); // Avoid division by 0

    results.forEach(result => {
      const listItem = document.createElement('li');
      listItem.className = 'result-item';

      listItem.innerHTML = `
        <span class="party-name">${result.party}</span>
        <div class="vote-bar">
          <div class="vote-bar-inner" style="width: ${(result.votes / maxVotes) * 100}%">
            ${result.votes}
          </div>
        </div>
      `;

      resultsContainer.appendChild(listItem);
    });
  }

  async function initApp() {
    const results = await fetchResults();
    renderResults(results);

    // Periodic update
    setInterval(async () => {
      const updatedResults = await fetchResults();
      renderResults(updatedResults);
    }, 5000); // Update every 5 seconds
  }

  // Load the config and initialize the app
  loadConfig();
});
