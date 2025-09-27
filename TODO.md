# TODO: Fix Console Errors

## 401 Unauthorized Errors on Admin Endpoints
- [x] Ensure admin seed data runs on server startup (edit server/src/index.ts to call seedAdminData())
- [x] Add 401 error handling in admin page fetches (AdminProfiles.tsx, AdminAssessments.tsx, AdminEntries.tsx, Analytics.tsx) - show toast or redirect to login
- [ ] Test: Restart server, login as admin, verify no 401 on /admin/* endpoints

## Radix UI Dialog Accessibility Errors
- [x] Locate Dialog usages in components (read RatingPopup.tsx, QuoteOfTheDayPopup.tsx, etc.)
- [x] Add DialogTitle and DialogDescription inside DialogContent for a11y (already present in found components)
- [ ] If titles should be hidden, use VisuallyHidden wrapper (not needed for current components)
- [ ] Test: Open modals/popups, verify console errors gone

## Followup
- [ ] Run dev server and test fixes
