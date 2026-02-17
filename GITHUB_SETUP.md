# GitHub Pages Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `atoms-over-bits` (or your preferred name)
3. Make it **Public** (required for GitHub Pages)
4. Don't initialize with README (we have one)
5. Click **Create repository**

## Step 2: Push This Code

```bash
# From the newsletter-site directory
cd /root/.openclaw/workspace/newsletter-site

# Initialize git
git init
git add .
git commit -m "Initial commit: Newsletter site with dark theme"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/atoms-over-bits.git

# Push to main branch
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (in left sidebar)
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. The workflow will run automatically on next push

## Step 4: Verify Deployment

1. Go to **Actions** tab in your repo
2. Wait for the "Deploy to GitHub Pages" workflow to complete
3. Your site will be live at: `https://YOUR_USERNAME.github.io/atoms-over-bits/`

## Daily Automation

The site automatically:
- **Deploys on every push** to main
- **Rebuilds daily at 8:30 AM** (before the 9 AM newsletter generation)
- Can be **manually triggered** from the Actions tab

## Custom Domain (Optional)

1. Add your domain in Settings → Pages → Custom domain
2. Create a `CNAME` file in the root with your domain
3. Update DNS with your provider

---

Your newsletter site will be ready to receive the daily generated issues!
