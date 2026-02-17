// Archive page JavaScript

async function loadArchive() {
    try {
        const response = await fetch('issues/index.json');
        if (!response.ok) {
            document.getElementById('archive-list').innerHTML = `
                <p class="loading">No issues published yet. Check back after the next scheduled run.</p>
            `;
            return;
        }
        
        const issues = await response.json();
        const container = document.getElementById('archive-list');
        
        container.innerHTML = issues.map(issue => `
            <a href="${issue.url}" class="archive-item">
                <div>
                    <div class="archive-date">${new Date(issue.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</div>
                    <div class="archive-themes">${issue.themes.map(t => t.name).join(', ')}</div>
                </div>
                <span style="color: var(--accent);">→</span>
            </a>
        `).join('');
    } catch (error) {
        console.error('Error loading archive:', error);
        document.getElementById('archive-list').innerHTML = `
            <p class="loading">Error loading archive. Please try again later.</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadArchive);
