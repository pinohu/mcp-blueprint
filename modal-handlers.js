// Agent Framework Modal Content
function openAgentFrameworkModal() {
  console.log('Opening Agent Framework Modal');
  const modal = document.getElementById('agent-framework');
  if (modal) {
    modal.style.display = 'block';
  } else {
    console.error('Modal element not found: agent-framework');
    console.log('Available modals:', Array.from(document.querySelectorAll('.modal')).map(el => el.id));
  }
}

function closeAgentFrameworkModal() {
  console.log('Closing Agent Framework Modal');
  const modal = document.getElementById('agent-framework');
  if (modal) {
    modal.style.display = 'none';
  } else {
    console.error('Modal element not found: agent-framework');
  }
}

// Context Schema Modal Content
function openContextSchemaModal() {
  console.log('Opening Context Schema Modal');
  const modal = document.getElementById('context-schema');
  if (modal) {
    modal.style.display = 'block';
  } else {
    console.error('Modal element not found: context-schema');
    console.log('Available modals:', Array.from(document.querySelectorAll('.modal')).map(el => el.id));
  }
}

function closeContextSchemaModal() {
  console.log('Closing Context Schema Modal');
  const modal = document.getElementById('context-schema');
  if (modal) {
    modal.style.display = 'none';
  } else {
    console.error('Modal element not found: context-schema');
  }
}

// Workflow Blueprints Modal Content
function openWorkflowBlueprintsModal() {
  console.log('Opening Workflow Blueprints Modal');
  const modal = document.getElementById('workflow-blueprints');
  if (modal) {
    modal.style.display = 'block';
  } else {
    console.error('Modal element not found: workflow-blueprints');
    console.log('Available modals:', Array.from(document.querySelectorAll('.modal')).map(el => el.id));
  }
}

function closeWorkflowBlueprintsModal() {
  console.log('Closing Workflow Blueprints Modal');
  const modal = document.getElementById('workflow-blueprints');
  if (modal) {
    modal.style.display = 'none';
  } else {
    console.error('Modal element not found: workflow-blueprints');
  }
}

// Data Structure Modal Content
function openDataStructureModal() {
  console.log('Opening Data Structure Modal');
  const modal = document.getElementById('data-structure');
  if (modal) {
    modal.style.display = 'block';
  } else {
    console.error('Modal element not found: data-structure');
    console.log('Available modals:', Array.from(document.querySelectorAll('.modal')).map(el => el.id));
  }
}

function closeDataStructureModal() {
  console.log('Closing Data Structure Modal');
  const modal = document.getElementById('data-structure');
  if (modal) {
    modal.style.display = 'none';
  } else {
    console.error('Modal element not found: data-structure');
  }
}

// Tool Integration Modal Content
function openToolIntegrationModal() {
  console.log('Opening Tool Integration Modal');
  const modal = document.getElementById('tool-integration');
  if (modal) {
    modal.style.display = 'block';
  } else {
    console.error('Modal element not found: tool-integration');
    console.log('Available modals:', Array.from(document.querySelectorAll('.modal')).map(el => el.id));
  }
}

function closeToolIntegrationModal() {
  console.log('Closing Tool Integration Modal');
  const modal = document.getElementById('tool-integration');
  if (modal) {
    modal.style.display = 'none';
  } else {
    console.error('Modal element not found: tool-integration');
  }
}

// Advanced Enhancements Modal Content
function openAdvancedEnhancementsModal() {
  console.log('Opening Advanced Enhancements Modal');
  const modal = document.getElementById('enhancements');
  if (modal) {
    modal.style.display = 'block';
  } else {
    console.error('Modal element not found: enhancements');
    console.log('Available modals:', Array.from(document.querySelectorAll('.modal')).map(el => el.id));
  }
}

function closeAdvancedEnhancementsModal() {
  console.log('Closing Advanced Enhancements Modal');
  const modal = document.getElementById('enhancements');
  if (modal) {
    modal.style.display = 'none';
  } else {
    console.error('Modal element not found: enhancements');
  }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target.className === 'modal') {
    console.log('Closing modal via window click');
    event.target.style.display = 'none';
  }
}
