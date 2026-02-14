// Application state and audit data

// Mock data structure for Clear-to-Close Audit
const auditData = {
    loanNumber: "24-1107-00321",
    borrowers: "Maria & Daniel Santos",
    program: "NQM Flex 12-Month Bank Statement",
    investor: "Deephaven Capital",

    // Audit-specific fields
    auditStatus: "In Progress", // New, In Progress, Ready to Clear, Suspended, Cleared
    auditStartDate: "2024-12-10T09:00:00",
    targetCloseDate: "2024-12-20",
    daysToClose: 6,
    auditor: "System Agent",

    // Loan metrics (keep for reference)
    metrics: {
          ltv: 78,
          dti: 41,
          dscr: 1.32,
          reserves: { current: 6, required: 9 }
    },

    // CTC Audit Checklist - This is the core of the audit dashboard
    auditChecklist: {
          // Conditions Section
      conditions: {
              status: "Pending", // Clear, Pending, Issues
              priorToDocsCount: 2,
              priorToFundingCount: 3,
              clearedCount: 12,
              waivedCount: 1,
              items: [
                {
                            id: "PTD-001",
                            type: "Prior to Docs",
                            category: "Income",
                            description: "Final VOE for W-2 employment - Daniel Santos",
                            status: "Pending", // Pending, Received, Cleared, Waived
                            requestedDate: "2024-12-08",
                            receivedDate: null,
                            clearedDate: null,
                            assignedTo: "Processor"
                },
                {
                            id: "PTD-002",
                            type: "Prior to Docs",
                            category: "Assets",
                            description: "Chase Business statements (Oct-Dec 2024)",
                            status: "Received",
                            requestedDate: "2024-12-08",
                            receivedDate: "2024-12-12",
                            clearedDate: null,
                            assignedTo: "Auditor"
                },
                {
                            id: "PTF-001",
                            type: "Prior to Funding",
                            category: "Property",
                            description: "Final homeowners insurance binder with proof of payment",
                            status: "Pending",
                            requestedDate: "2024-12-10",
                            receivedDate: null,
                            clearedDate: null,
                            assignedTo: "Processor"
                },
                {
                            id: "PTF-002",
                            type: "Prior to Funding",
                            category: "Credit",
                            description: "Credit re-pull (within 90 days of closing)",
                            status: "Cleared",
                            requestedDate: "2024-12-09",
                            receivedDate: "2024-12-11",
                            clearedDate: "2024-12-11",
                            assignedTo: "Auditor"
                },
                {
                            id: "PTF-003",
                            type: "Prior to Funding",
                            category: "Property",
                            description: "Final title policy with endorsements",
                            status: "Pending",
                            requestedDate: "2024-12-10",
                            receivedDate: null,
                            clearedDate: null,
                            assignedTo: "Title Company"
                }
                      ]
      },

          // Income Documentation
          income: {
                  status: "Clear", // Clear, Review, Issues
                  documentsVerified: true,
                  calculationAccurate: true,
                  totalMonthlyIncome: 14700,
                  sources: [
                    { type: "Self-Employment", amount: 8400, verified: true },
                    { type: "DSCR Rental", amount: 2100, verified: true },
                    { type: "W-2 Employment", amount: 4200, verified: false } // Pending VOE
                          ],
                  issues: []
          },

          // Asset Documentation
          assets: {
                  status: "Review", // Clear, Review, Issues
                  reservesVerified: false,
                  sourcing: "Pending", // Clear, Pending, Issues
                  totalReserves: 42000,
                  requiredReserves: 63000,
                  accounts: [
                    { bank: "Chase Business", balance: 18000, verified: false },
                    { bank: "Bank of America Personal", balance: 24000, verified: true }
                          ],
                  issues: [
                            "Reserves shortfall: $21,000 below requirement",
                            "Chase Business statements pending for Q4 2024"
                          ]
          },

          // Credit Review
          credit: {
                  status: "Clear", // Clear, Review, Issues
                  rePullDate: "2024-12-11",
                  rePullScore: 742,
                  originalScore: 745,
                  scoreChange: -3,
                  newTradelines: false,
                  newInquiries: 1,
                  issues: []
          },

          // Property/Title/Insurance
          property: {
                  status: "Pending", // Clear, Pending, Issues
                  appraisalReview: "Clear",
                  appraisalDate: "2024-11-20",
                  titleReview: "Pending",
                  titleOrderDate: "2024-12-05",
                  insuranceBinder: "Pending",
                  insuranceOrderDate: "2024-12-08",
                  issues: [
                            "Awaiting final title policy",
                            "Awaiting insurance binder with payment proof"
                          ]
          },

          // Compliance Check
          compliance: {
                  status: "Clear", // Clear, Review, Issues
                  trid: "Clear",
                  cdIssued: true,
                  cdIssuedDate: "2024-12-07",
                  cdVersion: 2,
                  atr: "Clear",
                  feeTolerance: "Clear",
                  feeVariance: 125, // dollars under tolerance
                  stateRequirements: "Clear",
                  issues: []
          },

          // Fraud Detection
          fraud: {
                  status: "Clear", // Clear, Review, Issues
                  riskScore: 15, // 0-100, lower is better
                  riskLevel: "Low", // Low, Medium, High
                  checks: [
                    { name: "Document Authenticity", status: "Pass", confidence: 98 },
                    { name: "Income Consistency", status: "Pass", confidence: 95 },
                    { name: "Asset Sourcing", status: "Review", confidence: 85 },
                    { name: "Identity Verification", status: "Pass", confidence: 99 }
                          ],
                  flags: []
          }
    },

    // AI Agent Findings
    agentFindings: [
      {
              category: "Conditions",
              severity: "Warning",
              finding: "2 Prior to Docs conditions still pending with 6 days to close",
              recommendation: "Escalate to processor for immediate follow-up",
              timestamp: "2024-12-14T10:30:00"
      },
      {
              category: "Assets",
              severity: "Critical",
              finding: "Reserves shortfall of $21,000 - requires compensating factors or waiver",
              recommendation: "Document strong DSCR (1.32x) and low LTV (78%) as compensating factors",
              timestamp: "2024-12-14T10:31:00"
      },
      {
              category: "Credit",
              severity: "Info",
              finding: "Credit score dropped 3 points but still well within guidelines",
              recommendation: "No action needed",
              timestamp: "2024-12-14T10:32:00"
      }
        ],

    // Activity Log
    activityLog: []
};

// Current view state
let currentTab = "overview"; // overview, conditions, income, assets, credit, property, compliance, fraud
let currentNav = "audit"; // audit (main section)
let currentRole = "auditor"; // auditor, processor, underwriter
let agentSimulationRunning = false;
