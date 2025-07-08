# Google Cloud Platform (GCP) Setup Guide

This guide will help you migrate from Supabase to Google Cloud Platform for the Asvara Innovations site.

## Prerequisites

1. Google Cloud Platform account
2. Google Cloud CLI installed (`gcloud`)
3. Node.js and npm installed

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for the project
4. Note down your **Project ID**

## Step 2: Enable Required APIs

Enable the following APIs in your GCP project:

```bash
gcloud services enable sqladmin.googleapis.com
gcloud services enable storage.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com
```

## Step 3: Set Up Google Cloud SQL (PostgreSQL)

### 3.1 Create PostgreSQL Instance

```bash
gcloud sql instances create asvara-postgres \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --root-password=YOUR_ROOT_PASSWORD \
  --storage-type=SSD \
  --storage-size=10GB
```

### 3.2 Create Database and User

```bash
# Create database
gcloud sql databases create asvara_db --instance=asvara-postgres

# Create user
gcloud sql users create asvara_user \
  --instance=asvara-postgres \
  --password=YOUR_USER_PASSWORD
```

### 3.3 Get Connection Details

```bash
# Get instance connection name
gcloud sql instances describe asvara-postgres --format="value(connectionName)"

# Get public IP (if needed for external connections)
gcloud sql instances describe asvara-postgres --format="value(ipAddresses[0].ipAddress)"
```

## Step 4: Set Up Google Cloud Storage

### 4.1 Create Storage Buckets

```bash
# Create buckets for different file types
gsutil mb gs://asvara-blog-images
gsutil mb gs://asvara-blog-attachments
gsutil mb gs://asvara-resumes
gsutil mb gs://asvara-general
```

### 4.2 Configure Bucket Permissions

```bash
# Make buckets publicly readable (for public file access)
gsutil iam ch allUsers:objectViewer gs://asvara-blog-images
gsutil iam ch allUsers:objectViewer gs://asvara-blog-attachments
gsutil iam ch allUsers:objectViewer gs://asvara-general

# Keep resumes private (only authenticated access)
# No public permissions for resumes bucket
```

### 4.3 Configure CORS (if needed)

Create a CORS configuration file `cors.json`:

```json
[
  {
    "origin": ["http://localhost:3000", "https://yourdomain.com"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "responseHeader": ["Content-Type", "Access-Control-Allow-Origin"],
    "maxAgeSeconds": 3600
  }
]
```

Apply CORS configuration:

```bash
gsutil cors set cors.json gs://asvara-blog-images
gsutil cors set cors.json gs://asvara-blog-attachments
gsutil cors set cors.json gs://asvara-resumes
gsutil cors set cors.json gs://asvara-general
```

## Step 5: Create Service Account

### 5.1 Create Service Account

```bash
gcloud iam service-accounts create asvara-service-account \
  --display-name="Asvara Service Account"
```

### 5.2 Grant Permissions

```bash
# Get your project ID
PROJECT_ID=$(gcloud config get-value project)

# Grant Cloud SQL Client role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:asvara-service-account@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

# Grant Storage Object Admin role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:asvara-service-account@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"

# Grant Storage Object Viewer role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:asvara-service-account@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.objectViewer"
```

### 5.3 Download Service Account Key

```bash
gcloud iam service-accounts keys create service-account-key.json \
  --iam-account=asvara-service-account@$PROJECT_ID.iam.gserviceaccount.com
```

**⚠️ Important:** Keep this key file secure and never commit it to version control.

## Step 6: Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database Configuration (Google Cloud SQL)
DATABASE_URL="postgresql://asvara_user:YOUR_USER_PASSWORD@YOUR_INSTANCE_IP:5432/asvara_db"
DIRECT_URL="postgresql://asvara_user:YOUR_USER_PASSWORD@YOUR_INSTANCE_IP:5432/asvara_db"

# Google Cloud Platform Configuration
GOOGLE_CLOUD_PROJECT_ID="your-gcp-project-id"
GOOGLE_CLOUD_KEY_FILE="./service-account-key.json"

# Google Cloud SQL Configuration
GOOGLE_CLOUD_SQL_INSTANCE_CONNECTION_NAME="your-project:us-central1:asvara-postgres"
GOOGLE_CLOUD_SQL_DATABASE="asvara_db"
GOOGLE_CLOUD_SQL_USER="asvara_user"
GOOGLE_CLOUD_SQL_PASSWORD="YOUR_USER_PASSWORD"

# Google Cloud Storage Buckets
GCP_BLOG_IMAGES_BUCKET="asvara-blog-images"
GCP_BLOG_ATTACHMENTS_BUCKET="asvara-blog-attachments"
GCP_RESUMES_BUCKET="asvara-resumes"
GCP_GENERAL_BUCKET="asvara-general"

# Authentication (NextAuth.js)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# Email Configuration (if using EmailJS)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your-emailjs-public-key"
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your-emailjs-service-id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your-emailjs-template-id"
```

## Step 7: Install Dependencies

```bash
npm install
```

## Step 8: Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed the database (if needed)
npm run db:seed
```

## Step 9: Test the Setup

```bash
# Start the development server
npm run dev
```

## Step 10: Production Deployment

### 10.1 Update Environment Variables for Production

For production, update the following variables:

```env
NEXTAUTH_URL="https://yourdomain.com"
DATABASE_URL="postgresql://asvara_user:YOUR_USER_PASSWORD@YOUR_INSTANCE_IP:5432/asvara_db"
```

### 10.2 Deploy to Vercel/Netlify

1. Connect your repository to Vercel or Netlify
2. Add all environment variables in the deployment platform
3. Deploy the application

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify the instance connection name format
   - Check if the database user has proper permissions
   - Ensure the database instance is running

2. **Storage Upload Issues**
   - Verify service account permissions
   - Check bucket names and permissions
   - Ensure CORS is properly configured

3. **Authentication Issues**
   - Verify Google OAuth credentials
   - Check NextAuth configuration
   - Ensure environment variables are properly set

### Useful Commands

```bash
# Check Cloud SQL instance status
gcloud sql instances describe asvara-postgres

# List storage buckets
gsutil ls

# Check service account permissions
gcloud projects get-iam-policy YOUR_PROJECT_ID \
  --flatten="bindings[].members" \
  --format="table(bindings.role)" \
  --filter="bindings.members:asvara-service-account"
```

## Security Best Practices

1. **Service Account Key**: Store the service account key securely and never commit it to version control
2. **Database Passwords**: Use strong, unique passwords for database users
3. **Bucket Permissions**: Only grant necessary permissions to service accounts
4. **Environment Variables**: Use environment variables for all sensitive configuration
5. **CORS**: Configure CORS properly to prevent unauthorized access

## Cost Optimization

1. **Cloud SQL**: Use appropriate instance sizes and consider stopping instances when not in use
2. **Storage**: Use appropriate storage classes for different file types
3. **Monitoring**: Set up billing alerts to monitor costs

## Support

If you encounter issues during the migration:

1. Check the Google Cloud Console for error messages
2. Review the application logs
3. Verify all environment variables are correctly set
4. Ensure all required APIs are enabled 