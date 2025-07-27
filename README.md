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

## Production Deployment Architecture

### VPC Connector Setup (Required for Cloud SQL Private IP Access)

To enable Cloud Run to access Cloud SQL via private IP, you need to set up a VPC connector:

1. **Create VPC Connector:**
   ```bash
   gcloud compute networks vpc-access connectors create asvara-connector \
     --region=asia-south1 \
     --range=10.8.0.0/28 \
     --network=default \
     --min-instances=2 \
     --max-instances=10 \
     --machine-type=e2-micro
   ```

2. **Configure Cloud Run VPC Access:**
   - Go to Cloud Run Console → Your Service → Edit & Deploy New Revision
   - Under "Networking" section, select "Use Serverless VPC Access connectors"
   - Choose your `asvara-connector` from the dropdown
   - Set "Traffic routing" to "Route all traffic to the VPC"
   - Deploy the new revision

3. **Database URL Format:**
   ```
   DATABASE_URL=postgresql://username:password@PRIVATE_IP:5432/database?schema=public
   ```
   Example: `postgresql://asvara_user:password@172.25.160.3:5432/asvara_db?schema=public`

### Production Environment Variables

Set these in your Cloud Run service:

```env
DATABASE_URL=postgresql://username:password@PRIVATE_IP:5432/database?schema=public
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_random_secret_key
GCP_BLOG_IMAGES_BUCKET=asvara-blog-images
GCP_BLOG_ATTACHMENTS_BUCKET=asvara-blog-attachments
GCP_RESUMES_BUCKET=asvara-resumes
GCP_GENERAL_BUCKET=asvara-general
```

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
- **Docker & Cloud Run**: Production-ready Dockerfile with OpenSSL support, build, push, and deploy flow to Cloud Run.
- **VPC & Networking**: VPC connector setup for secure Cloud SQL private IP access.
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
- **Production Issues Resolved**:
  - ✅ OpenSSL installation in Docker for Prisma compatibility
  - ✅ Prisma client generation and import errors fixed
  - ✅ Database connection with proper DATABASE_URL format
  - ✅ VPC connector setup for Cloud SQL private IP access
  - ✅ CSS styling working correctly in production
  - ✅ All backend APIs functioning properly

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
5. **Push your Docker image to Google Container Registry (GCR):**
   ```sh
   docker push gcr.io/utopian-pride-462008-j4/asvara-innovations-site:latest
   ```
6. **Deploy to Cloud Run (if not automated):**
   ```sh
   gcloud run deploy --image asia-south1-docker.pkg.dev/utopian-pride-462008-j4/cloud-run-source-deploy/asvara-innovations-site:latest --region asia-south1 --platform managed --allow-unauthenticated
   ```
   *(Update the image URL if your repo or region is different.)*

---

## Troubleshooting: Production Issues

### Database Connection Issues

If you encounter "empty host in database URL" or "Can't reach database server" errors:

1. **Verify DATABASE_URL format:**
   ```
   postgresql://username:password@PRIVATE_IP:5432/database?schema=public
   ```

2. **Check VPC Connector setup:**
   - Ensure VPC connector is created and running
   - Verify Cloud Run is configured to use the connector
   - Check that "Route all traffic to the VPC" is selected

3. **Get Cloud SQL Private IP:**
   ```bash
   gcloud sql instances describe YOUR_INSTANCE_NAME --format="value(ipAddresses[0].ipAddress)"
   ```

### Prisma Issues

If Prisma fails to initialize or generate client:

1. **Install OpenSSL in Docker:**
   ```dockerfile
   RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
   ```

2. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

3. **Check environment variables:**
   - Ensure `DATABASE_URL` is properly set
   - Verify `NODE_ENV=production` in production

### CSS/Styling Issues

If CSS is missing in production:

1. **Check Dockerfile:**
   - Ensure `.next/static` is copied to the final image
   - Verify `NODE_ENV=production` is set during build

2. **Verify next.config.js:**
   - Ensure `output: 'standalone'` is configured
   - Check that no custom webpack configurations are interfering

## Deploying via Google Cloud Shell (Recommended for Windows Users)

If you cannot build Docker images locally (e.g., on Windows without Docker Desktop), you can use Google Cloud Shell to build and deploy your app. Here are the steps:

| Step | Command/Action                                                                                  |
|------|-----------------------------------------------------------------------------------------------|
| 1    | Open [Google Cloud Shell](https://console.cloud.google.com/)                                   |
| 2    | `git clone <YOUR_REPO_URL> && cd <YOUR_PROJECT_DIRECTORY>`                                     |
| 3    | `gcloud auth configure-docker asia-south1-docker.pkg.dev`                                      |
| 4    | `docker build -t asia-south1-docker.pkg.dev/utopian-pride-462008-j4/cloud-run-source-deploy/asvara-innovations-site:latest .` |
| 5    | `docker push asia-south1-docker.pkg.dev/utopian-pride-462008-j4/cloud-run-source-deploy/asvara-innovations-site:latest`        |
| 6    | `gcloud run deploy --image asia-south1-docker.pkg.dev/utopian-pride-462008-j4/cloud-run-source-deploy/asvara-innovations-site:latest --region asia-south1 --platform managed --allow-unauthenticated` |

**Notes:**
- Replace `<YOUR_REPO_URL>` and `<YOUR_PROJECT_DIRECTORY>` with your actual repository URL and directory name.
- Make sure you have your `.env.production` file in the project root before building.
- The `gcloud run deploy` command will prompt you for service name and other options if not specified.
- This method avoids Windows Docker issues and ensures a consistent Linux build environment.
