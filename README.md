# CPL Official Website — starter kit

A responsive CPL (Chagantivaripalem Premier League) website with a Supabase-powered admin panel.

## What is included
- Public home page, fixtures/results, teams and points table
- Admin sign-in, add/delete teams, publish matches, edit points table, publish live score updates
- Responsive desktop/mobile layout
- Supabase database schema

## Important: connect the free backend first
This starter is a front end. The admin panel will not save shared/live data until you connect Supabase.

1. Create a free project at https://supabase.com/ (ask a parent/guardian to help with account setup if needed).
2. In Supabase, open **SQL Editor**, paste all of `schema.sql`, and run it.
3. In **Authentication → Users**, create the administrator account (email and password).
4. In **Project Settings → API**, copy the Project URL and the `anon` / publishable key.
5. Open `config.js` and replace `YOUR_SUPABASE_PROJECT_URL` and `YOUR_SUPABASE_ANON_KEY`.
   - Never use or publish the `service_role` / secret key.
6. Test locally by opening `index.html` with an internet connection. For reliable local testing, use a simple local web server.

## Free hosting
1. Create a GitHub repository and upload all files in this folder.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. GitHub Pages will provide a public `github.io` address. You can share it.
5. To update the website, upload changed files to the repository. Keep a backup copy.

## Security note
The supplied SQL policies allow any authenticated account in this Supabase project to manage the league data. Keep admin account creation restricted to trusted officials and do not enable public sign-ups. For a larger production setup, add a dedicated admin-role table and stricter policies before inviting more users.

## Before launch
Replace the sample text/branding if required, add official CPL logo and approved team photos, verify match data, and test the admin login. Free hosting and free backend plans can change their limits and terms; no provider can promise a website will exist forever. Keep periodic backups of the repository and database.

## Live score
After running the updated `schema.sql`, sign in at `admin.html`, use the **Live match score** form to publish the batting team, runs, wickets, overs, target, run rate and short match update. The latest published score appears in the public **Live score** section. Add a new row for each update; delete old rows from the admin panel when no longer needed.
