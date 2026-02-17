// Main JavaScript for Atoms Over Bits newsletter

const ISSUES_DIR = 'issues/';

async function loadLatestIssue() {
    try {
        // In a real implementation, this would fetch from a JSON index
        // For now, we'll show a placeholder
        const latestContainer = document.getElementById('latest-issue');
        
        // Check if there are any issue files
        const response = await fetch('issues/index.json');
        if (!response.ok) {
            latestContainer.innerHTML = `
                <div class="issue-placeholder">
                    <h3>No issues published yet</h3>
                    <p>The first newsletter issue will appear here after the next scheduled run (9 AM daily).</p>
                </div>
            `;
            return;
        }
        
        const issues = await response.json();
        const latest = issues[0];
        
        renderIssue(latestContainer, latest);
    } catch (error) {
        console.error('Error loading latest issue:', error);
        document.getElementById('latest-issue').innerHTML = `
            <p class="loading">Error loading issue. Please try again later.</p>
        `;
    }
}

function renderIssue(container, issue) {
    let themesHtml = '';
    
    for (const theme of issue.themes) {
        let companiesHtml = '';
        
        for (const company of theme.companies) {
            const ratingClass = company.rating.toLowerCase().includes('buy') ? 'rating-buy' :
                               company.rating.toLowerCase().includes('avoid') ? 'rating-avoid' : 'rating-hold';
            
            companiesHtml += `
                <div class="company-card">
                    <div class="company-header">
                        <span class="company-ticker">${company.ticker}</span>
                        <span class="company-rating ${ratingClass}">${company.rating}</span>
                    </div>
                    <div class="company-metrics">
                        <div class="metric">
                            <span class="metric-value">${company.pe || 'N/A'}</span>
                            <span class="metric-label">P/E</span>
                        </div>
                        <div class="metric">
                            <span class="metric-value">${company.margin || 'N/A'}</span>
                            <span class="metric-label">Margin</span>
                        </div>
                        <div class="metric">
                            <span class="metric-value">${company.position || 'N/A'}</span>
                            <span class="metric-label">Position</span>
                        </div>
                    </div>
                    <div class="company-case"><strong>Bull:</strong> ${company.bull}</div>
                    <div class="company-case"><strong>Bear:</strong> ${company.bear}</div>
                </div>
            `;
        }
        
        themesHtml += `
            <div class="theme-section">
                <div class="theme-title">${theme.name}</div>
                <div class="theme-thesis">${theme.thesis}</div>
                <div class="company-grid">
                    ${companiesHtml}
                </div>
            </div>
        `;
    }
    
    container.innerHTML = `
        <h3>${issue.title}</h3>
        <div class="issue-date">${new Date(issue.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })}</div>
        ${themesHtml}
    `;
}

async function loadStats() {
    try {
        const response = await fetch('issues/stats.json');
        if (!response.ok) return;
        
        const stats = await response.json();
        document.getElementById('total-issues').textContent = stats.totalIssues;
        document.getElementById('total-themes').textContent = stats.totalThemes;
        document.getElementById('total-tickers').textContent = stats.totalTickers;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function loadRecentThemes() {
    try {
        const response = await fetch('issues/themes.json');
        if (!response.ok) {
            document.getElementById('theme-list').innerHTML = `
                <p class="loading">No themes yet. First issue coming soon.</p>
            `;
            return;
        }
        
        const themes = await response.json();
        const container = document.getElementById('theme-list');
        
        container.innerHTML = themes.slice(0, 6).map(theme => `
            <div class="theme-tag">
                <span class="theme-name">${theme.name}</span>
                <span class="theme-count">${theme.count} issues</span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading themes:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadLatestIssue();
    loadStats();
    loadRecentThemes();
});
