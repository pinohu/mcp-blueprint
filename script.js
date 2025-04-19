// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
        });
    });

    // Load modals
    loadModals();
});

// Modal functions
function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Load modals content
function loadModals() {
    console.log('Loading modals from modals.html');
    // Using XMLHttpRequest instead of fetch to avoid CORS issues when running from file://
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) { // 0 for local file access
                console.log('Modals loaded successfully');
                document.getElementById('modals-container').innerHTML = xhr.responseText;
                console.log('Available modals:', Array.from(document.querySelectorAll('.modal')).map(el => el.id));
                setupModalButtons();
            } else {
                console.error('Error loading modals:', xhr.statusText);
            }
        }
    };
    xhr.open('GET', 'modals.html', true);
    xhr.send();
}

// Setup modal buttons
function setupModalButtons() {
    console.log('Setting up modal buttons');
    document.querySelectorAll('.blueprint-card .btn').forEach(button => {
        console.log('Found button:', button);
        button.addEventListener('click', function() {
            const cardTitle = this.closest('.blueprint-content').querySelector('h3').textContent;
            console.log('Button clicked for:', cardTitle);
            
            // Map card titles to modal IDs and functions
            const titleToModalMap = {
                'Agent Framework Design': { id: 'agent-framework', func: openAgentFrameworkModal },
                'Context Schema Design': { id: 'context-schema', func: openContextSchemaModal },
                'Workflow Blueprints': { id: 'workflow-blueprints', func: openWorkflowBlueprintsModal },
                'Data Structure Design': { id: 'data-structure', func: openDataStructureModal },
                'Tool Integration Map': { id: 'tool-integration', func: openToolIntegrationModal },
                'Advanced Enhancements': { id: 'enhancements', func: openAdvancedEnhancementsModal }
            };
            
            const modalInfo = titleToModalMap[cardTitle];
            if (modalInfo) {
                console.log('Opening modal with ID:', modalInfo.id);
                if (typeof modalInfo.func === 'function') {
                    console.log('Using function to open modal');
                    modalInfo.func();
                } else {
                    console.log('Using direct DOM manipulation to open modal');
                    const modal = document.getElementById(modalInfo.id);
                    if (modal) {
                        modal.style.display = 'block';
                    } else {
                        console.error('Modal element not found:', modalInfo.id);
                    }
                }
            } else {
                console.error('No modal mapping found for card title:', cardTitle);
            }
        });
    });
}
