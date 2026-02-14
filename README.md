# NQM CTC Audit Assistant

AI-powered agent assistant for NQM (Non-QM) Clear-to-Close audits. This dashboard provides a comprehensive interface for reviewing loan conditions, compliance checks, fraud detection, and audit workflows.

## Live Demo

[View Live Demo](https://obmendoza.github.io/nqm-ctc-audit-assistant/)

## Features

- **Condition Tracking**: Review and manage prior-to-close and prior-to-funding conditions
- - **Income Analysis**: Automated income verification with bank statement analysis
  - - **Asset Review**: Asset sufficiency checks and source verification
    - - **Credit Analysis**: Credit score monitoring and liability tracking
      - - **Property Review**: Appraisal and title review status
        - - **Compliance Checks**: Regulatory compliance verification (TRID, HMDA, State, Fair Lending)
          - - **Fraud Detection**: AI-powered fraud risk indicators and pattern analysis
            - - **Activity Log**: Real-time audit trail of all actions and system events
              - - **Audit Report Generation**: One-click comprehensive audit report generation
               
                - ## Project Structure
               
                - ```
                  nqm-ctc-audit-assistant/
                  ├── index.html          # Main HTML dashboard layout
                  ├── css/
                  │   └── styles.css      # Dashboard styles and theming
                  ├── js/
                  │   ├── data.js         # Audit data models and sample data
                  │   ├── utils.js        # Utility functions (formatting, calculations)
                  │   ├── modals.js       # Modal dialogs for condition/finding details
                  │   ├── app.js          # Main application logic and tab rendering
                  │   └── init.js         # Application initialization and event setup
                  └── README.md           # Project documentation
                  ```

                  ## Architecture

                  The application follows a modular JavaScript architecture with no external dependencies:

                  - **data.js**: Contains the `auditData` object with all loan and audit information including borrower details, conditions, income, assets, credit, property, compliance, and fraud data.
                  - - **utils.js**: Helper functions for formatting currency, percentages, dates, status badges, risk levels, and calculating days to close.
                    - - **modals.js**: Modal system for displaying detailed condition information and finding details with interactive overlays.
                      - - **app.js**: Core rendering engine that builds the dashboard UI dynamically. Handles tab switching, sidebar rendering, and audit report generation.
                        - - **init.js**: Bootstrap module that initializes the application on DOMContentLoaded, sets up event listeners, and renders the initial view.
                         
                          - ## Getting Started
                         
                          - 1. Clone the repository:
                            2.    ```bash
                                     git clone https://github.com/obmendoza/nqm-ctc-audit-assistant.git
                                     ```

                                  2. Open `index.html` in a browser, or serve with any static file server:
                                  3.    ```bash
                                           cd nqm-ctc-audit-assistant
                                           python -m http.server 8000
                                           ```

                                        3. Navigate to `http://localhost:8000` in your browser.
                                    
                                        4. ## Technology
                                    
                                        5. - Pure HTML, CSS, and JavaScript (no frameworks or build tools)
                                           - - CSS Custom Properties for theming
                                             - - Responsive dashboard layout with CSS Grid and Flexbox
                                               - - Static deployment ready (GitHub Pages compatible)
                                                
                                                 - ## License
                                                
                                                 - This project is proprietary to NQM.
