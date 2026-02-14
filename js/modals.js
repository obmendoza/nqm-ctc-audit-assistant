// Modal and notification system for CTC Audit Dashboard

function openModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = content;
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification show ' + type; // info, success, warning, error

  setTimeout(() => {
        notification.classList.remove('show');
  }, 3000);
}

// Show condition details modal
function showConditionDetails(conditionId) {
    const condition = auditData.auditChecklist.conditions.items.find(c => c.id === conditionId);
    if (!condition) return;

  const content = `
      <div class="condition-details">
            <p><strong>ID:</strong> ${condition.id}</p>
                  <p><strong>Type:</strong> ${condition.type}</p>
                        <p><strong>Category:</strong> ${condition.category}</p>
                              <p><strong>Description:</strong> ${condition.description}</p>
                                    <p><strong>Status:</strong> <span class="badge ${getStatusClass(condition.status)}">${condition.status}</span></p>
                                          <p><strong>Requested:</strong> ${formatDate(condition.requestedDate)}</p>
                                                ${condition.receivedDate ? `<p><strong>Received:</strong> ${formatDate(condition.receivedDate)}</p>` : ''}
                                                      ${condition.clearedDate ? `<p><strong>Cleared:</strong> ${formatDate(condition.clearedDate)}</p>` : ''}
                                                            <p><strong>Assigned To:</strong> ${condition.assignedTo}</p>

                                                                        <div class="condition-actions">
                                                                                <button onclick="updateConditionStatus('${condition.id}', 'Received')" ${condition.status === 'Received' || condition.status === 'Cleared' ? 'disabled' : ''}>Mark as Received</button>
                                                                                        <button onclick="updateConditionStatus('${condition.id}', 'Cleared')" ${condition.status === 'Cleared' ? 'disabled' : ''}>Mark as Cleared</button>
                                                                                                <button onclick="updateConditionStatus('${condition.id}', 'Waived')">Waive Condition</button>
                                                                                                      </div>
                                                                                                          </div>
                                                                                                            `;

  openModal('Condition Details', content);
}

// Show agent finding modal
function showFindingDetails(finding) {
    const content = `
        <div class="finding-details">
              <p><strong>Category:</strong> ${finding.category}</p>
                    <p><strong>Severity:</strong> <span class="badge ${getSeverityClass(finding.severity)}">${finding.severity}</span></p>
                          <p><strong>Finding:</strong> ${finding.finding}</p>
                                <p><strong>Recommendation:</strong> ${finding.recommendation}</p>
                                      <p><strong>Timestamp:</strong> ${getTimeAgo(finding.timestamp)}</p>
                                          </div>
                                            `;

  openModal('Agent Finding', content);
}
