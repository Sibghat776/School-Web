Stop adding new features. Do a full end-to-end AUDIT of this project first, then fix it so every implemented feature is actually visible and clickable in the running app (localhost).

Step 1 — Map reality vs claims:
- List every route currently registered in Frontend/src/App.jsx (path + component).
- List every Page/Component file that exists in Frontend/src (Pages/Admin, Pages/Teacher, Pages/Student, Components, "Admin Dashboard/", "Private Routes/").
- Cross-check: for each file that exists, tell me clearly whether it is (a) actually reachable through a route in App.jsx, and (b) actually linked to from somewhere a user can click (Navbar, Home page, buttons, dashboard sidebar).
- Explicitly flag every file that exists but is NOT reachable/clickable from the UI — these are dead/orphaned files.
- Explicitly flag duplicate/legacy files that do the same job as newer ones (e.g. old "Admin Dashboard/" folder vs new "Pages/Admin/" folder).

Step 2 — Fix the visibility gap:
- Add the 3 buttons/links I originally asked for (Admin Panel, Student Portal, and the third one — check our earlier conversation for what it was) to the Home page and/or Navbar, pointing to the correct login/dashboard routes.
- Register any missing routes in App.jsx for Admin, Teacher, and Student dashboards, wrapped in the correct ProtectedRoute/role guard.
- Wire the sidebar/navigation inside each dashboard (Admin, Teacher, Student) so every page you built (Attendance, Results, Fees, Diary, Complaints, Notifications, etc.) has a visible nav link — not just a route that exists but is never linked to.

Step 3 — Clean up:
- Delete or clearly report every dead/orphaned/legacy file you found in Step 1 that is not used anywhere (after confirming it's truly unused, not just unreached-yet).
- Do NOT delete anything that's still imported/used somewhere — only genuinely dead code.

Step 4 — Verify locally:
- Run the frontend dev server locally.
- Confirm by checking the code (not just build success) that: Home page renders the 3 buttons, clicking Admin Panel goes to the login/dashboard, clicking Student Portal goes to the login/dashboard, and each dashboard's sidebar shows links to all built sub-pages.
- Give me the exact local URL and click path to see each of the 3 things I originally asked for.

Give me a final report: what was dead and removed, what was wired up that wasn't before, and the exact steps to click through and see Admin Panel + Student Portal + [third feature] in the browser right now.