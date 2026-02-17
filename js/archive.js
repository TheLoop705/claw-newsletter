/**
 * Atoms Over Bits - Archive Page JavaScript
 */

// Archive state
const archiveState = {
  issues: [],
  filteredIssues: [],
  view: 'list', // 'list' or 'grid'
  filters: {
    theme: '',
    rating: '',
    search: ''
  }
};

// Initialize archive page
document.addEventListener('DOMContentLoaded', async () => {
  await loadArchiveData();
  initArchiveControls();
  renderArchive();
});

async function loadArchiveData() {
  try {
    const response = await fetch('issues/index.json');
    if (!response.ok) throw new Error('Failed to load issues');
    
    const data = await response.json();
    archiveState.issues = data.issues || [];
    archiveState.filteredIssues = [...archiveState.issues];
  } catch (error) {
    console.error('Error loading archive:', error);
    showArchiveError();
  }
}

function initArchiveControls() {
  // Theme filter
  const themeFilter = document.getElementById('filter-theme');
  if (themeFilter) {
    themeFilter.addEventListener('change', (e) => {
      archiveState.filters.theme = e.target.value;
      applyFilters();
    });
  }
  
  // Rating filter
  const ratingFilter = document.getElementById('filter-rating');
  if (ratingFilter) {
    ratingFilter.addEventListener('change', (e) => {
      archiveState.filters.rating = e.target.value;
      applyFilters();
    });
  }
  
  // Search filter
  const searchFilter = document.getElementById('archive-search');
  if (searchFilter) {
    searchFilter.addEventListener('input', debounce((e) => {
      archiveState.filters.search = e.target.value.toLowerCase();
      applyFilters();
    }, 150));
  }
  
  // View toggle
  const viewButtons = document.querySelectorAll('.view-btn');
  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      archiveState.view = view;
      
      viewButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      renderArchive();
    });
  });
}

function applyFilters() {
  archiveState.filteredIssues = archiveState.issues.filter(issue => {
    // Theme filter
    if (archiveState.filters.theme) {
      const hasTheme = issue.themes?.some(t => 
        t.name.toLowerCase().includes(archiveState.filters.theme.toLowerCase())
      );
      if (!hasTheme) return false;
    }
    
    // Rating filter (check if any company has this rating)
    if (archiveState.filters.rating) {
      const hasRating = issue.themes?.some(theme => 
        theme.companies?.some(c => 
          c.rating.toLowerCase() === archiveState.filters.rating.toLowerCase()
        )
      );
      if (!hasRating) return false;
    }
    
    // Search filter
    if (archiveState.filters.search) {
      const searchable = [
        issue.title,
        issue.subtitle,
        ...(issue.themes?.map(t => t.name) || [])
      ].join(' ').toLowerCase();
      
      if (!searchable.includes(archiveState.filters.search)) return false;
    }
    
    return true;
  });
  
  renderArchive();
}

function renderArchive() {
  const container = document.getElementById('archive-container');
  const countElement = document.getElementById('archive-count');
  
  if (!container) return;
  
  // Update count
  if (countElement) {
    countElement.textContent = `${archiveState.filteredIssues.length} issue${archiveState.filteredIssues.length !== 1 ? 's' : ''}`;
  }
  
  // Empty state
  if (archiveState.filteredIssues.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 4rem 2rem; color: var(--text-muted);">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="margin-bottom: 1rem; opacity: 0.5;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>No issues found matching your filters.</p>
        <button class="btn btn-secondary mt-4" onclick="clearFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }
  
  // Set container class based on view
  container.className = archiveState.view === 'grid' ? 'archive-grid' : 'archive-list';
  
  // Render issues
  container.innerHTML = archiveState.filteredIssues.map(issue => 
    archiveState.view === 'grid' ? renderGridItem(issue) : renderListItem(issue)
  ).join('');
}

function renderListItem(issue) {
  const themes = issue.themes?.map(t => t.name).join(', ') || '';
  const date = new Date(issue.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return `
    <a href="${issue.url}" class="archive-item">
      <div class="archive-item-date">${date}</div>
      <div class="archive-item-content">
        <div class="archive-item-title">${escapeHtml(issue.title)}</div>
        <div class="archive-item-themes">${escapeHtml(themes)}</div>
      </div>
      <div class="archive-item-meta">
        <span>${issue.themeCount || 0} themes</span>
        <span>${issue.companyCount || 0} companies</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  `;
}

function renderGridItem(issue) {
  const themes = issue.themes?.slice(0, 3).map(t => 
    `<span class="theme-chip">${escapeHtml(t.name)}</span>`
  ).join('') || '';
  
  const date = new Date(issue.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return `
    <a href="${issue.url}" class="card card-link">
      <div class="card-body">
        <div class="issue-preview-date">${date}</div>
        <h3 class="issue-preview-title">${escapeHtml(issue.title)}</h3>
        ${issue.subtitle ? `<p class="issue-preview-subtitle">${escapeHtml(issue.subtitle)}</p>` : ''}
        <div class="theme-chips" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
          ${themes}
        </div>
      </div>
      <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.875rem; color: var(--text-muted);">${issue.companyCount || 0} companies</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: var(--accent-primary);">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </a>
  `;
}

function clearFilters() {
  archiveState.filters = { theme: '', rating: '', search: '' };
  
  document.getElementById('filter-theme').value = '';
  document.getElementById('filter-rating').value = '';
  document.getElementById('archive-search').value = '';
  
  applyFilters();
}

function showArchiveError() {
  const container = document.getElementById('archive-container');
  if (container) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 4rem 2rem; color: var(--text-muted);">
        <p>Error loading archive. Please try again later.</p>
      </div>
    `;
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
