# नीलाचल पाठागार — Setup and GitHub Pages Deployment

This is a complete, ready-to-host web app for reading and listening to both
volumes of श्रीपुरुषोत्तमक्षेत्रमाहात्म्यम् (Skanda Purana). Once hosted, it
installs like a real app on any phone, works fully offline after the first
visit, and never asks the visitor to supply their own PDF.

## Files in this package

- index.html              -- the app itself
- manifest.json            -- makes "Add to Home Screen" install it like an app
- service-worker.js        -- caches everything for offline use
- books/b1.pdf             -- Part 1 (chapters 1 to 26)
- books/b2.pdf             -- Part 2 (chapters 27 to 60)
- icons/icon-192.png        -- app icon (small)
- icons/icon-512.png        -- app icon (large)

Keep this exact folder structure. Do not rename any of these files or
folders, since index.html, manifest.json, and service-worker.js all refer
to each other by these exact names and paths.

## Step-by-step: publish with GitHub Pages

1. Go to github.com and sign in to your account.
2. Click the plus icon in the top right corner and choose "New repository".
3. Give it a name, for example neelachal-patagar. Set it to Public. Do not
   add a README from GitHub's own template, since you already have one
   here. Click "Create repository".
4. On the new repository's page, click "uploading an existing file" (or
   "Add file" then "Upload files" if you don't see that link).
5. Drag in all the files and folders from this package exactly as they
   are: index.html, manifest.json, service-worker.js, the books folder,
   and the icons folder. GitHub will preserve the folder structure as long
   as you drag the folders in directly.
6. Scroll down and click "Commit changes". Wait for the upload to finish
   -- the two PDFs are large, so this may take a few minutes depending on
   your connection.
7. Once uploaded, click the "Settings" tab of the repository.
8. In the left sidebar, click "Pages".
9. Under "Build and deployment", set Source to "Deploy from a branch".
   Set Branch to "main" (or "master") and folder to "/ (root)". Click
   Save.
10. GitHub will show a message that your site is being built. After a
    minute or two, refresh the page and you'll see a green box with your
    live address, something like:
    https://yourusername.github.io/neelachal-patagar/
11. Open that address on your phone's browser. The homepage should load
    and both books should open directly with no file picker.

## Installing it like an app on a phone

- On Android (Chrome): open the site, tap the three-dot menu, and choose
  "Add to Home screen" or "Install app".
- On iPhone (Safari): open the site, tap the Share icon, and choose "Add
  to Home Screen".

After that, it appears as its own icon, opens full-screen with no browser
bar, and once it's been opened at least once while online, both books and
the whole reading and listening experience keep working with no internet
connection at all.

## If you ever need to update the site

Just upload changed files the same way (Add file, Upload files, pick the
new version, Commit). Visitors who already installed the app will get
the update automatically the next time they open it while online, since
the service worker checks for a new version each time.

## A couple of honest notes

- The chapter list and page numbers were built by scanning the original
  PDF's own table of contents and OCR'd text. It's been checked for
  consistency, but if you ever spot a chapter title or page number that
  looks wrong against your physical copy, let me know which one and I'll
  correct it directly in index.html.
- GitHub Pages is free with no time limit and no account upgrade needed
  for a public repository of this kind.
