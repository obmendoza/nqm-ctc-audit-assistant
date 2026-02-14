// Utility functions for CTC Audit Dashboard

// Add activity log entry
function addActivityLog(title, description) {
    const timestamp = new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          month: 'short',
          day: 'numeric'
    });

  auditData.activityLog.unshift({
        timestamp,
        title,
        description
  });
}

// Initialize activity logs for audit dashboard
function addInitialActivityLogs() {
    addActivityLog('Audit Started', 'Clear-to-Close audit initiated by System Agent');
    addActivityLog('Conditions Agent', 'Identified 5 outstanding conditions (2 PTD, 3 PTF)');
    addActivityLog('Credit Agent', 'Credit re-pull completed - score 742 (change: -3)');
    addActivityLog('Compliance Agent', 'TRID and fee tolerance checks passed');
    addActivityLog('Fraud Agent', 'Document authenticity scan completed - Low risk');
    addActivityLog('Asset Agent', 'Reserve shortfall identified: $21,000 below requirement');
}

// Calculate days to close
function calculateDaysToClose(targetDate) {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}

// Update days to close dynamically
function updateDaysToClose() {
    auditData.daysToClose = calculateDaysToClose(auditData.targetCloseDate);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
    });
}

// Get status badge class
function getStatusClass(status) {
    const statusMap = {
          'Clear': 'status-clear',
          'Pending': 'status-pending',
          'Review': 'status-review',
          'Issues': 'status-issues',
          'Cleared': 'status-clear',
          'Received': 'status-review',
          'Waived': 'status-waived'
    };
    return statusMap[status] || 'status-pending';
}

// Get severity badge class
function getSeverityClass(severity) {
    const severityMap = {
          'Info': 'severity-info',
          'Warning': 'severity-warning',
          'Critical': 'severity-critical'
    };
    return severityMap[severity] || 'severity-info';
}

// Calculate audit completion percentage
function calculateAuditCompletion() {
    const checklist = auditData.auditChecklist;
    let totalItems = 0;
    let completedItems = 0;

  // Count conditions
  const conditions = checklist.conditions.items;
    totalItems += conditions.length;
    completedItems += conditions.filter(c => c.status === 'Cleared' || c.status === 'Waived').length;

  // Count checklist sections
  const sections = ['income', 'assets', 'credit', 'property', 'compliance', 'fraud'];
    totalItems += sections.length;
    completedItems += sections.filter(s => checklist[s].status === 'Clear').length;

  return Math.round((completedItems / totalItems) * 100);
}

// Get time ago format
function getTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return formatDate(timestamp);
}

// Auto-simulate audit agent activity (optional - runs every 20 seconds)
function startAuditAgentSimulation() {
    if (agentSimulationRunning) return;

  agentSimulationRunning = true;
    setInterval(() => {
          const activities = [
            { title: 'Conditions Agent', msg: 'Monitoring for condition status updates' },
            { title: 'Credit Agent', msg: 'Checking for new credit inquiries or tradelines' },
            { title: 'Compliance Agent', msg: 'Scanning for regulatory updates' },
            { title: 'Fraud Agent', msg: 'Continuous document verification in progress' },
            { title: 'Asset Agent', msg: 'Monitoring for updated bank statements' }
                ];

                    const activity = activities[Math.floor(Math.random() * activities.length)];
          addActivityLog(activity.title, activity.msg);
    }, 20000);
}

// Update condition status
function updateConditionStatus(conditionId, newStatus) {
    const condition = auditData.auditChecklist.conditions.items.find(c => c.id === conditionId);
    if (condition) {
          condition.status = newStatus;
          if (newStatus === 'Received') {
                  condition.receivedDate = new Date().toISOString().split('T')[0];
          } else if (newStatus === 'Cleared' || newStatus === 'Waived') {
                  condition.clearedDate = new Date().toISOString().split('T')[0];
          }

      // Update counts
      const conditions = auditData.auditChecklist.conditions;
          conditions.clearedCount = conditions.items.filter(c => c.status === 'Cleared').length;
          conditions.waivedCount = conditions.items.filter(c => c.status === 'Waived').length;
          conditions.priorToDocsCount = conditions.items.filter(c => c.type === 'Prior to Docs' && c.status !== 'Cleared' && c.status !== 'Waived').length;
          conditions.priorToFundingCount = conditions.items.filter(c => c.type === 'Prior to Funding' && c.status !== 'Cleared' && c.status !== 'Waived').length;

      addActivityLog('Condition Updated', `${conditionId}: ${condition.description} - Status changed to ${newStatus}`);
    }
}
