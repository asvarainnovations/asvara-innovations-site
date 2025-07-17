# Asvara Innovations Site

## Google Cloud Platform (GCP) Setup

This application now uses Google Cloud Platform for backend services. Please refer to [GCP_SETUP.md](./GCP_SETUP.md) for detailed setup instructions.

### Quick Setup

1. Follow the [GCP Setup Guide](./GCP_SETUP.md) to configure Google Cloud SQL and Cloud Storage
2. Create a `.env.local` file with the required environment variables
3. Install dependencies: `npm install`
4. Run database migrations: `npx prisma migrate deploy`
5. Start the development server: `npm run dev`

## Google Authentication Setup

1. Create a `.env.local` file in the root directory with the following content:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key
```

2. To get your Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google+ API
   - Go to Credentials
   - Create OAuth 2.0 Client ID
   - Add these authorized JavaScript origins:
     - http://localhost:3000
   - Add these authorized redirect URIs:
     - http://localhost:3000/api/auth/callback/google
   - Copy the Client ID and Client Secret to your .env.local file

3. Generate a random string for NEXTAUTH_SECRET:
   - Run this command in your terminal:
   ```bash
   openssl rand -base64 32
   ```
   - Copy the output to your NEXTAUTH_SECRET in .env.local

4. Start the development server:
```bash
npm run dev
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Backend Setup (Prisma + Google Cloud SQL)

1. Follow the [GCP Setup Guide](./GCP_SETUP.md) for detailed instructions
2. Set your Google Cloud SQL PostgreSQL connection string in `.env.local`:
   ```
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run Prisma migration:
   ```
   npx prisma migrate dev --name init
   ```
5. Generate Prisma client:
   ```
   npx prisma generate
   ```
6. Start the development server:
   ```
   npm run dev
   ```

## Testing Your GCP Database Setup

After setting up your environment and before running your app, you can use the following test scripts to verify your database connection and seeding:

### 1. Test Database Connection
This script checks if your app can connect to the GCP PostgreSQL database, prints the PostgreSQL version, and lists all tables.

```bash
npm run test:db
```

### 2. Test Database Seeding
This script runs your Prisma seed script and checks if at least one user exists (or skips if no user model).

```bash
npm run test:db:seed
```

If both scripts complete successfully, your database connection and seeding are working!

## Progress

### ✅ Completed
- **Authentication**: Google OAuth (NextAuth.js) and credentials-based registration/login.
- **User Management**: Profile updates and dashboard.
- **API & Subscriptions**: API key management and subscription creation/listing.
- **Database**: Full integration with Prisma ORM and Google Cloud SQL, including migrations and seeding.
- **Storage**: Google Cloud Storage integration for file uploads and management.
    - Blog images and attachments use public GCP buckets and direct public URLs.
    - Resumes are stored privately with signed URL access only.
    - File deletion logic for blogs and careers is implemented (removes files from GCP on delete).
- **Environment Variables**: Secure handling for local and production, with Cloud Run using built-in service account and `.env.production` for build-time config.
- **Docker & Cloud Run**: Production-ready Dockerfile, build, push, and deploy flow to Cloud Run.
- **Blog System**:
  - Complete blog submission flow with cover image and file attachments.
  - Admin moderation dashboard to review, approve, and reject submissions.
  - Backend APIs for blog management with authentication checks.
- **Careers System**:
  - Universal careers application form with inline validation and file upload.
  - All submissions are viewable in a modern admin dashboard at `/admin/careers` with search, filter, and download links for resumes.
- **Frontend & UI/UX**:
  - Complete redesign of the homepage for a modern, animated feel.
  - Dynamic "Our Products" section with complex hover animations.
  - Refactored "Innovations" section with dedicated pages for each product.
  - Polished "Problem/Solution" section.
  - Added "About Us" page.
  - Footer updated with Font Awesome icons and correct social links.
- **Troubleshooting & Security**:
  - Cloud SQL authorized networks and GCP permissions configured.
  - Prisma/OpenSSL and GCP key file logic fixed for production.

### 🚧 TODO / In Progress
- **/api/auth/login**: Issue JWT or session token after successful login (currently only returns user info).
- **/api/subscribe**: Integrate with payment/subscription backend (currently just logs request).
- **/api/log-innovation-click**: Save click events to database or analytics service (currently just logs to console).
- **API Key Management**: Make `serviceId` dynamic (currently hardcoded to 'default').
- **General**:
  - Add comprehensive input validation and improved error handling for all endpoints.
  - Add rate limiting and security hardening (helmet, CORS, etc.).
  - Add logging and monitoring for production.
  - Add unit/integration tests for all APIs.
- **Docs**:
  - Document all API endpoints and request/response formats.
  - Add setup and deployment instructions for contributors.
- **Blog Features**:
  - Add a rich text (WYSIWYG) editor for blog submissions.
  - Implement public-facing blog pages with markdown rendering.

## API Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login with email/password
- `GET /api/user/profile` — Get user profile
- `PUT /api/user/profile` — Update user profile
- `POST /api/subscriptions` — Create a new subscription
- `GET /api/subscriptions` — Get user's subscriptions
- `POST /api/api-keys` — Create a new API key
- `GET /api/api-keys` — Get user's API keys
- `DELETE /api/api-keys/:id` — Delete an API key
- `GET /api/plans` — Get available plans
- `POST /api/log-innovation-click` — Log a click on an innovation
- `POST /api/upload` — Upload a file
- `POST /api/blogs/submit` — Submit a new blog post
- `GET /api/admin/blog-submissions` — Get all blog submissions (admin)
- `POST /api/admin/blog-submissions/moderate` — Approve/reject a submission (admin)
- `DELETE /api/admin/blog-submissions/:id` — Delete a submission (admin)

## Production Build & Deploy to Cloud Run

Follow these steps to build and deploy your app to Google Cloud Run:

1. **Clean your environment:**
   ```sh
   rm -rf .next node_modules package-lock.json
   npm install
   ```
2. **Build the Next.js app:**
   ```sh
   npm run build
   ```
3. **Submit the build to Google Cloud Build:**
   ```sh
   gcloud builds submit --config cloudbuild.yaml
   ```
4. **(Optional) Test locally with Docker:**
   ```sh
   docker build --no-cache -t your-image-name .
   docker run -p 8080:8080 your-image-name
   ```
5. **Deploy to Cloud Run (if not automated):**
   ```sh
   gcloud run deploy --image asia-south1-docker.pkg.dev/utopian-pride-462008-j4/cloud-run-source-deploy/asvara-innovations-site:latest --region asia-south1 --platform managed --allow-unauthenticated
   ```
   *(Update the image URL if your repo or region is different.)*

**Note:** Ensure `.dockerignore` and `.gcloudignore` do NOT exclude `.next` and `.next/static` (add `!.next` and `!.next/static` if needed) to avoid missing CSS/static assets in production.
