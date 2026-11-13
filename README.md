# React Dev Toolkit

A reusable checklist dashboard, CSS cheatsheet and React snippet library for every new React project.

## Start

```
npm install
npm run dev
```

Build for production with `npm run build`, preview with `npm run preview`.

## What is inside

- **Checklist**: 24 universal QA sections (352 tasks) plus extra sections for 9 project types. Search, All/Completed/Pending filter, expand/collapse all, check all, reset (section or whole checklist, with confirmation), copy checklist/checked/pending, export and import JSON, multiple saved projects.
- **CSS cheatsheet**: 88 entries (including 15 button designs, 15 hover effects and 14 other effects) with Copy code on each and Copy all CSS for the whole sheet. 75 entries have a **live preview** that runs in an isolated frame, with Mobile/Tablet/Desktop widths where layout matters and a Replay button for animations.
- **React snippets**: 18 files with explanation, where to use, requirements and Copy code. 16 run as **live demos** (the other 2 only control window scrolling and say so). The demos render the real files from `src/live`, and the code you copy is imported from those same files, so preview and code cannot drift apart.

## Where things live

```
src/
  components/  Accordion, ChecklistItem, ProgressBar, DashboardHeader, CodeBlock, CodeLibrary, PreviewFrame, SearchBar, Modal, SectionIcon
  pages/       Dashboard, Cheatsheet, Snippets
  data/        checklistData.js, projectTemplates.js, cssCheatsheet.js, cssPreviews.js, reactSnippets.js
  live/        the real snippet source files (copyable code AND what the demos run), plus small demo pages
  previews/    reactDemos.jsx: wrappers that run the live snippets (fake server, demo router, demo buttons)
  hooks/       useLocalStorage, useProjects, useChecklistProgress, useToast
  utils/       progressUtils, exportUtils, clipboard
  styles/      variables.css, global.css, components.css, index.css
```

## Extending

- Add checklist tasks: append to the END of a section's array in `checklistData.js` (ids are position based, so appending keeps saved progress valid).
- Add a project type: add an object to `projectTypes` in `projectTemplates.js`.
- Add a cheatsheet entry: call `add(group, title, what, when, notes, css\`...\`)` in `cssCheatsheet.js`. Order matters for Copy all CSS.
- Add a snippet: put the file in `src/live/`, import it with `?raw` in `reactSnippets.js`, call `add(...)`, then add a demo in `previews/reactDemos.jsx` (optional).
- Add a CSS preview: call `p('<entry title>', { html, needs, height, responsive, replay })` in `cssPreviews.js`.

## Storage

Everything is saved in `localStorage` under the key `react-dev-toolkit:v1`. Importing a JSON file never overwrites silently: you choose "Import as new project" or "Replace current progress".
