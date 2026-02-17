/**
 * Atoms Over Bits - Main JavaScript
 * Investment Research Newsletter Functionality
 */

// ============================================================================
// Configuration
// ============================================================================

const CONFIG = {
  ISSUES_DIR: 'issues/',
  INDEX_FILE: 'issues/index.json',
  SEARCH_INDEX_FILE: 'issues/search-index.json',
  STATS_FILE: 'issues/stats.json',
  THEMES_FILE: 'issues/themes.json',
  DEBOUNCE_DELAY: 150,
  SCROLL_PROGRESS_OFFSET: 100
};

// ============================================================================
// State Management
// ============================================================================

const state = {
  issues: [],
  searchIndex: [],
  themes: [],
  stats: null,
  currentTheme: localStorage.getItem('theme') || 'dark',
  searchQuery: '',
  isSearchOpen: false
};

// ============================================================================
// Theme Management
// ============================================================================

function initTheme() {
  // Apply saved theme
  document.documentElement.setAttribute('data-theme', state.currentTheme);
  updateThemeIcon();
}

function toggleTheme() {
  state.currentTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.currentTheme);
  localStorage.setItem('theme', state.currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  
  const isDark = state.currentTheme === 'dark';
  toggle.innerHTML = isDark ? getSunIcon() : getMoonIcon();
  toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function getSunIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>`;
}

function getMoonIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>`;
}

// ============================================================================
// Data Loading
// ============================================================================

async function loadIssues() {
  try {
    const response = await fetch(CONFIG.INDEX_FILE);
    if (!response.ok) throw new Error('Failed to load issues');
    const data = await response.json();
    state.issues = data.issues || [];
    return state.issues;
  } catch (error) {
    console.error('Error loading issues:', error);
    return [];
  }
}

async function loadSearchIndex() {
  try {
    const response = await fetch(CONFIG.SEARCH_INDEX_FILE);
    if (!response.ok) throw new Error('Failed to load search index');
    const data = await response.json();
    state.searchIndex = data.issues || [];
    return state.searchIndex;
  } catch (error) {
    console.error('Error loading search index:', error);
    return [];
  }
}

async function loadStats() {
  try {
    const response = await fetch(CONFIG.STATS_FILE);
    if (!response.ok) throw new Error('Failed to load stats');
    state.stats = await response.json();
    return state.stats;
  } catch (error) {
    console.error('Error loading stats:', error);
    return null;
  }
}

async function loadThemes() {
  try {
    const response = await fetch(CONFIG.THEMES_FILE);
    if (!response.ok) throw new Error('Failed to load themes');
    state.themes = await response.json();
    return state.themes;
  } catch (error) {
    console.error('Error loading themes:', error);
    return [];
  }
}

// ============================================================================
// Search Functionality
// ============================================================================

function initSearch() {
  const searchToggle = document.querySelector('.search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.querySelector('.search-input');
  const searchClose = document.querySelector('.search-close');
  
  if (!searchToggle || !searchOverlay) return;
  
  // Open search
  searchToggle.addEventListener('click', () => openSearch());
  
  // Close search
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });
  
  if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
  }
  
  // Keyboard shortcut (Cmd/Ctrl + K)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      state.isSearchOpen ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape' && state.isSearchOpen) {
      closeSearch();
    }
  });
  
  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      performSearch(e.target.value);
    }, CONFIG.DEBOUNCE_DELAY));
  }
}

function openSearch() {
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.querySelector('.search-input');
  
  if (!searchOverlay) return;
  
  state.isSearchOpen = true;
  searchOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  if (searchInput) {
    setTimeout(() => searchInput.focus(), 100);
  }
  
  // Load search index if not loaded
  if (state.searchIndex.length === 0) {
    loadSearchIndex().then(() => {
      const searchInput = document.querySelector('.search-input');
      if (searchInput && searchInput.value) {
        performSearch(searchInput.value);
      }
    });
  }
}

function closeSearch() {
  const searchOverlay = document.querySelector('.search-overlay');
  
  if (!searchOverlay) return;
  
  state.isSearchOpen = false;
  searchOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function performSearch(query) {
  const resultsContainer = document.querySelector('.search-results');
  
  if (!resultsContainer) return;
  
  if (!query.trim()) {
    resultsContainer.innerHTML = '';
    return;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // Search through issues
  const results = state.searchIndex.filter(issue => {
    const searchableText = [
      issue.title,
      issue.subtitle,
      ...(issue.themes || []),
      ...(issue.companies || [])
    ].join(' ').toLowerCase();
    
    return searchableText.includes(normalizedQuery);
  }).slice(0, 8);
  
  renderSearchResults(results, resultsContainer, query);
}

function renderSearchResults(results, container, query) {
  if (results.length === 0) {
    container.innerHTML = `
      <div class="search-empty">
        <p>No results found for "${escapeHtml(query)}"</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = results.map(issue => `
    <a href="${issue.url}" class="search-result-item" onclick="closeSearch()">
      <div class="search-result-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </div>
      <div class="search-result-content">
        <div class="search-result-title">${escapeHtml(issue.title)}</div>
        <div class="search-result-meta">
          ${formatDate(issue.date)} · ${issue.themeCount} themes · ${issue.companyCount} companies
        </div>
      </div>
    </a>
  `).join('');
}

// ============================================================================
// Reading Progress
// ============================================================================

function initReadingProgress() {
  const progressBar = document.querySelector('.reading-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
  });
}

// ============================================================================
// Copy to Clipboard
// ============================================================================

function initCopyButtons() {
  document.querySelectorAll('.company-copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const ticker = btn.dataset.ticker;
      if (!ticker) return;
      
      try {
        await navigator.clipboard.writeText(ticker);
        showToast(`Copied ${ticker} to clipboard`, 'success');
        
        // Visual feedback
        btn.classList.add('copied');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;
        
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalHTML;
        }, 2000);
      } catch (err) {
        showToast('Failed to copy', 'error');
      }
    });
  });
}

// ============================================================================
// Toast Notifications
// ============================================================================

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      ${type === 'success' 
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'
      }
    </svg>
    <span>${escapeHtml(message)}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================================================
// Mobile Menu
// ============================================================================

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (!menuToggle || !mainNav) return;
  
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

// ============================================================================
// Newsletter Form
// ============================================================================

function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    
    if (email) {
      showToast('Thanks for subscribing! (Demo)', 'success');
      form.reset();
    }
  });
}

// ============================================================================
// Utility Functions
// ============================================================================

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

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatNumber(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
}

// ============================================================================
// Keyboard Navigation
// ============================================================================

function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    // Skip if in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    // Left arrow - previous issue
    if (e.key === 'ArrowLeft') {
      const prevLink = document.querySelector('.nav-prev');
      if (prevLink) prevLink.click();
    }
    
    // Right arrow - next issue
    if (e.key === 'ArrowRight') {
      const nextLink = document.querySelector('.nav-next');
      if (nextLink) nextLink.click();
    }
  });
}

// ============================================================================
// Initialize
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSearch();
  initReadingProgress();
  initCopyButtons();
  initMobileMenu();
  initNewsletterForm();
  initKeyboardNav();
  
  // Theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadIssues,
    loadStats,
    loadThemes,
    toggleTheme,
    formatDate,
    escapeHtml
  };
}
