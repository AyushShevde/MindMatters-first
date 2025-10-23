# TODO: Adapt Backend for Vercel Deployment

## Steps to Complete

- [x] Update package.json for Vercel deployment (add vercel script, update dependencies)
- [x] Replace better-sqlite3 with @vercel/postgres in package.json
- [x] Create Vercel API routes structure (/api directory)
- [x] Convert Express routes to Vercel API functions (auth, admin, profile, etc.)
- [x] Update setup.ts to use Vercel Postgres instead of SQLite
- [x] Remove or adapt Socket.IO (not supported in Vercel serverless)
- [x] Update database schema for PostgreSQL syntax
- [x] Handle environment variables for Vercel Postgres
- [x] Test API routes locally if possible
- [x] Deploy to Vercel and verify functionality
- [x] Disable Vercel authentication protection to allow public API access
- [x] Update frontend API configuration to point to deployed Vercel backend
- [x] Fix accessibility warnings in Dialog component
