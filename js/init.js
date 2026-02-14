// Application initialization for CTC Audit Dashboard

document.addEventListener('DOMContentLoaded', () => {
      // Update days to close dynamically
                              updateDaysToClose();

                              // Initialize activity logs
                              addInitialActivityLogs();

                              // Set up event listeners
                              initializeEventListeners();

                              // Render initial content
                              renderMainContent();
});

// Uncomment to enable auto-simulation
// startAuditAgentSimulation();
