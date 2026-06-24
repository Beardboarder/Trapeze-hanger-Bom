# Electrical Trapeze Hanger BOM Calculator

Static GitHub Pages web app for calculating 1/2" hardware quantities for electrical trapeze hangers.

## Files to place in your GitHub Pages repository

Place these files in the root of your GitHub Pages source:

- `index.html`
- `styles.css`
- `app.js`
- `.nojekyll`
- `README.md`

## GitHub Pages setup

### Option A: User/organization site

Use this if your repository is named like:

`your-username.github.io`

Put all files directly in the repository root:

```text
your-username.github.io/
├── index.html
├── styles.css
├── app.js
├── .nojekyll
└── README.md
```

After pushing to GitHub, the site will usually be available at:

`https://your-username.github.io/`

### Option B: Project site

Use this if your repository has another name, such as:

`trapeze-bom-calculator`

Put all files directly in the repository root:

```text
trapeze-bom-calculator/
├── index.html
├── styles.css
├── app.js
├── .nojekyll
└── README.md
```

Then go to:

`Repository > Settings > Pages`

Set:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/root`

After saving, the site will usually be available at:

`https://your-username.github.io/trapeze-bom-calculator/`

## Calculator notes

- Threaded rod is intentionally excluded.
- All nuts, square washers, and lock washers are 1/2".
- Supports multiple hanger lines in one BOM.
- Supports span-strut style hangers and Eaton B-Line B750-J12 beam-clamp style hangers.
- Exports a combined BOM and line breakdown as CSV.
