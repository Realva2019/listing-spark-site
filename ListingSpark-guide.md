# Listing Spark: Website Guide

This guide covers three things:

1. Putting the site live on Hostinger.
2. Creating the images and videos with meigen.ai, youmind.com or prompthero.com.
3. What to finish before launch.

Only the contents of `listingspark-site.zip` go on the server. This guide stays out of `public_html`.

---

## 1. What you have

| File (inside the zip) | Purpose |
|---|---|
| `index.html` | Homepage: hero with before/after slider, gallery, service tabs, how it works, $29 pricing, video kit, promise, FAQ, final CTA |
| `assets/css/styles.css` | All styling. Brand colors are at the top under `:root`. |
| `assets/js/main.js` | Slider, tabs, gallery tap-to-reveal, mobile menu. No libraries. |
| `assets/img/placeholders/` | Illustrated stand-ins. Replace these with real photos (section 3). |
| `.htaccess` | Forces HTTPS, compresses files, sets caching. |
| `privacy.html`, `terms.html` | Placeholder pages. These need real content. |

**Why plain HTML/CSS/JS:**

- It runs on every Hostinger plan, including the cheapest shared hosting.
- It needs no Node.js server and no build step.
- It loads fast, has no plugins to update, and gives attackers almost nothing to target.

**Design system** (picked with the UI UX Pro Max skill, then adjusted):

| Token | Value | Notes |
|---|---|---|
| Ink | `#111014` | Text, dark sections, secondary buttons |
| Spark | `#FF5A1F` | Primary CTA and highlights. Text on it is ink, for contrast. |
| Dusk | `#2340D9` | Links and accents. This is the "twilight" blue. |
| Mist | `#F4F4F6` | Alternate section background |
| Headings | Outfit | From Google Fonts |
| Body text | Work Sans | From Google Fonts |

I overrode the skill's first suggestion: teal with the Cinzel font. Teal is ViewThrough's main button color, and Cinzel reads dated. The orange-and-blue pair matches the "spark" name and the day-to-dusk idea, and it looks clearly different from ViewThrough's dark indigo, teal and serif fonts.

---

## 2. Hosting on Hostinger (step by step)

Your domain and hosting are both on Hostinger, so you won't need to change any DNS settings.

1. **Attach the domain to your hosting plan.**
   - In hPanel, go to **Websites → Add website**.
   - Choose your Listing Spark domain, then pick **Empty site** (or "Skip, I'll build it myself").
   - Don't use the AI builder or WordPress.

2. **Install free SSL first.**
   - Go to **Websites → Manage → Security → SSL** and install the free SSL certificate for the domain.
   - Wait until its status shows **Active**. This can take anywhere from a few minutes to a few hours.
   - The `.htaccess` file forces HTTPS. If SSL isn't active yet, the site will show an error.

3. **Upload the site.**
   - Go to **Websites → Manage → Files → File Manager** and open `public_html`.
   - Delete the default `default.php` or `index.php` file if one is there.
   - Upload `listingspark-site.zip`, right-click it, choose **Extract**, then delete the zip.
   - **Check:** `index.html` must sit directly inside `public_html`, not in a subfolder like `public_html/listingspark-site/`. If it ended up in a subfolder, move everything up one level.
   - **Hidden file:** `.htaccess` starts with a dot, so File Manager may hide it. Turn on "Show hidden files" in File Manager settings to confirm it uploaded.

4. **Test** at `https://yourdomain.com` on desktop and on your phone. Check that:
   - The slider drags.
   - The service tabs switch.
   - Tapping a gallery tile shows the original photo.
   - The menu opens on mobile.

5. **For later updates (optional, cleaner):** put the site files in a private GitHub repo. Then connect it in **hPanel → Advanced → GIT** so every change deploys from GitHub instead of through manual uploads.

**Professional email:** create `hello@yourdomain` under **Emails** in hPanel. Whether this costs extra depends on your plan. Then replace `hello@listingspark.com` in `index.html`; it appears in 2 places in the final CTA section. I guessed the `.com` domain, so confirm your exact domain.

---

## 3. Images and video: what to create and how

### Ground rule (protects the brand)

Every before/after must be **the same photo, before and after an edit**, made with the same process you will sell. Don't show results you can't reproduce on a customer's photos.

The best source is real listing photos you're allowed to use. Ask an agent for permission, or edit your own listings. Starting from an AI-generated "before" photo is acceptable for launch, as long as the "after" is a real edit of that image. Don't put unedited stock photos or other companies' work in the gallery.

### Files to replace

Export as **WebP or JPG, 1600×1200 (4:3), under 300 KB each**. Then either keep the file names below and update the extension in `index.html`, or search the HTML for `placeholders/` and change the paths.

| Placeholder | What it shows | Where it's used |
|---|---|---|
| `ext-a-day` / `ext-a-dusk` | Two-story home, day → twilight | Hero slider, gallery |
| `ext-b-day` / `ext-b-dusk` | Single-story home, day → twilight | Gallery, video poster |
| `ext-c-day` / `ext-c-dusk` | Modern home, day → twilight | Twilight tab, gallery |
| `room-empty` / `room-staged` | Vacant living room → staged | Staging tab, Finish tab, gallery |
| `room-cluttered` / `room-clean` | Busy room → decluttered | Declutter tab, gallery |
| `room-dim` / `room-bright` | Dark, flat photo → corrected | Refresh tab, gallery |

The 10-tile gallery reuses these 6 pairs. Add more pairs as you produce them; ideally every tile shows a different home. For "Finish the room", make its own pair (an unfinished room → the finished version) rather than reusing staging.

### How to use the three tools

- **Making "before" photos:** use text-to-image.
- **Making "after" photos:** use **image editing (image-to-image)**. Upload the before photo and give the edit prompt. You must edit the same image; generating a fresh "dusk house" won't match.
- **Finding prompts:** browse the prompt libraries on meigen.ai and prompthero.com for "real estate twilight", "virtual staging" and "interior photography" to find styles that suit you.
- **Check before you rely on them:** I couldn't verify which image-edit or video models each site offers right now. Test each one for edit quality before relying on it.

### Prompt pack

**A. Exterior "before" (text-to-image)**
> Professional real estate listing photograph, front exterior of a [two-story brick / single-story stucco ranch / modern white farmhouse] suburban home in [Texas / Arizona / Florida], shot in flat midday daylight with a slightly hazy pale sky, wide-angle 16mm lens at eye level from the sidewalk, straight vertical lines, lawn, driveway and front walkway visible, no people, no cars, no text, no watermark, photorealistic, 4:3

**B. Twilight "after" (image edit, upload photo A)**
> Convert this into a twilight real estate photo. Keep the house, roofline, windows, doors, landscaping, driveway and camera angle exactly the same. Replace the sky with a clear deep-blue dusk sky fading to soft warm orange at the horizon. Turn on warm 2700K interior lights in every window, plus porch lights and subtle landscape lights. Add a gentle warm glow on walls near the lights. Lawn slightly darker, as at dusk. Photorealistic, natural, no added objects, no text.

**C. Empty room "before" (text-to-image)**
> Real estate listing photo of an empty, vacant living room, white walls, light oak floors, large window with daylight, wide-angle 16mm, eye level, straight verticals, no furniture, no people, photorealistic, 4:3

**D. Virtual staging "after" (image edit, upload photo C)**
> Virtually stage this empty room as a modern transitional living room. Keep the walls, floor, window, ceiling and camera angle exactly the same. Add a light gray sofa, two accent chairs, a wool area rug, a wood coffee table, a floor lamp, a large framed abstract print and one potted plant, all to correct scale and perspective, with realistic shadows. Photorealistic, catalog quality, no text.

**E. Cluttered "before" (text-to-image)**
> Real estate photo of an occupied family kitchen with cluttered countertops, dishes, mail, kids' toys on the floor, fridge covered in magnets and papers, daylight, wide-angle, eye level, photorealistic, 4:3

**F. Declutter "after" (image edit, upload photo E)**
> Remove all clutter and personal items: dishes, mail, toys, magnets, papers, small appliances and cords. Keep the cabinets, counters, appliances, flooring, lighting and camera angle exactly the same. Clean, show-ready, photorealistic, no added objects.

**G. Full refresh (image edit, upload any dark interior photo)**
> Professionally correct this real estate photo: brighten the exposure evenly, balance the white balance to neutral, recover the window view so it isn't blown out, straighten vertical lines and lift the shadows. Keep every object and surface exactly the same. Bright, airy, true-to-life color, photorealistic.

**H. Finish the room (image edit, upload an unfinished room)**
> Show this unfinished room as completed: drywall painted warm white, wide-plank light oak flooring, white baseboards, recessed ceiling lights on. Keep the room's shape, windows, doors and camera angle exactly the same. Photorealistic.

**I. Walkthrough video (image-to-video, if your tool offers it)**
> Slow, smooth cinematic dolly-in toward the front door of this home at twilight, steady gimbal motion, subtle light flicker in the windows, no camera shake, no added objects, 5 seconds, 16:9

Export the video as MP4 (H.264, 1080p, under 15 MB) and save it to `assets/video/sample-walkthrough.mp4`. Then tell me, and I'll wire it into the video section.

**J. Social share image** (1200×630, used when the link is shared)
> Clean promotional banner: split image of the same suburban house, left half daytime, right half twilight with glowing windows, a thin white vertical divider, plenty of empty space on the left for a headline, photorealistic

Add the headline text afterwards in Canva or Figma. AI image tools often misspell text.

---

## 4. Before launch: checklist

- [ ] Replace all placeholder images with real before/after pairs.
- [ ] Replace `hello@listingspark.com` with your real email (2 places).
- [ ] **Ordering:** swap the `mailto:` CTA links for a real order flow. The simplest version needs no backend: a Stripe Payment Link ($29) plus an intake form with a Zillow link and photo upload, built in Tally, Jotform or a GoHighLevel form.
- [ ] Write the Privacy Policy and Terms. Have them reviewed if you collect payments or photos.
- [ ] **Testimonials:** add real ones only, with each client's permission. There's commented-out markup ready in the Promise section. I didn't copy ViewThrough's stats or testimonials; using them would be false advertising.
- [ ] **MLS compliance:** many MLSs require virtually staged photos to be labeled. The FAQ already says you can add a "Virtually staged" label; make sure your delivery process actually does that.
- [ ] **Promises:** confirm you can deliver same-day turnaround and unlimited revisions at $29 before you advertise them. These are the claims customers will hold you to.
- [ ] **Unit economics:** at $29 for up to 25 photos, work out your cost per listing (editor time plus AI tool costs) before scaling ad spend.
- [ ] Do a trademark search on "Listing Spark" (USPTO TESS) before you spend on branding.
- [ ] Add analytics (Google Analytics 4 or Plausible) and a Meta Pixel when you start running ads.
