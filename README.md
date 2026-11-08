# MMC IT Club

An editorial portfolio for the IT Club at Mary Matha Arts and Science College, Mananthavady. Built with Vite, React, Tailwind CSS, GSAP/ScrollTrigger, Lenis, and a lazy-loaded Three.js scene.

## Run locally

Use Node.js 20.19+ or 22.12+.

    npm install
    npm run dev

Vite prints a local URL after the development server starts. Create a production build with **npm run build** and inspect it locally with **npm run preview**.

## Project structure

    public/
      images/
        logo.jpeg
        activities/       # event photos
        contributions/    # existing club contribution images
        projects/         # project preview artwork
    src/
      components/         # project gallery, articles, events, optional 3D scene
      data/content.js     # editable projects, events, articles and site details
      hooks/              # Lenis and GSAP setup
      App.jsx
      main.jsx
      styles.css
    index.html
    vite.config.js
    package.json
    README.md

## Update the content

Open **src/data/content.js**.

- Edit the featured project in featuredProject and the nine image cards in works. Work screenshots are stored in **public/images/contributions/**.
- Add events to events with a date, title, short note, detail, image path, and descriptive alt text. Event images belong in **public/images/activities/**.
- The three newsletter articles from the previous site are restored in the articles array with their original text and image sources. New articles can be added there with an optimized image URL and descriptive alt text.
- Confirm site.email and site.collegeUrl. The email currently carries over from the existing site; confirm it is monitored before publishing. Add official social links to site.socialLinks if desired.

The featured Seat My Exam artwork is an interface concept. The work archive uses the nine project images from the previous site.

The interest form opens the visitor's email app with their answers filled in; it does not send or store submissions on a server. For automatic collection, connect a form service or backend and update the submit handler in **src/App.jsx**.

## Deploy

Build output is static and written to **dist/**.

### Vercel

Import the repository in Vercel. Use **npm run build** as the build command and **dist** as the output directory.

### Netlify

Create a new site from the repository. Set the build command to **npm run build** and the publish directory to **dist**.

### Firebase Hosting

    npm install
    npm run build
    npm install --global firebase-tools
    firebase login
    firebase init hosting

Choose **dist** as the public directory and configure it as a single-page app only if routes are added later. Deploy with:

    firebase deploy --only hosting

## Motion and accessibility

The 3D module is loaded when its scene enters view and is skipped on small and lower-capability devices. Reduced-motion preferences disable Lenis and large motion effects. The work gallery shows all nine original contribution images, using three columns on desktop, two on tablets, and one on phones. Event and article details use keyboard-operable controls, and form fields and links have visible focus indicators.
