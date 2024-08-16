document.addEventListener('DOMContentLoaded', () => {
    const partySelect = document.getElementById('partySelect');
    const voteButton = document.getElementById('voteButton');
    const messageParagraph = document.getElementById('message');
  
    voteButton.addEventListener('click', async () => {
      const party = partySelect.value;
      if (!party) {
        messageParagraph.textContent = 'Please select a party.';
        return;
      }
  
      const backendUrl = `${window.BACKEND_PROTOCOL}://${window.BACKEND_HOST}:${window.BACKEND_PORT}/vote`;
  
      try {
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ party }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
  
        const data = await response.json();
        messageParagraph.textContent = data.message;
      } catch (error) {
        console.error('Error:', error);
        messageParagraph.textContent = 'An error occurred. Please try again later.';
      }
    });
  
    // Load configuration from the server and set global variables
    async function loadConfig() {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const config = await response.json();
  
        window.BACKEND_PROTOCOL = config.BACKEND_PROTOCOL;
        window.BACKEND_HOST = config.BACKEND_HOST;
        window.BACKEND_PORT = config.BACKEND_PORT;
      } catch (error) {
        console.error('Error loading configuration:', error);
      }
    }
  
    loadConfig();
  });
  