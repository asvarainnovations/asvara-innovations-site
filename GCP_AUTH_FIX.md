# 🔧 Google Cloud Authentication Fix Guide

## 🚨 **Current Issue**
The cover image upload is failing with "Invalid JWT Signature" error. This means the service account key is invalid or expired.

## 🎯 **Quick Solutions**

### **Option 1: Create Blogs Without Cover Images (Immediate)**

```bash
npm run blog:create-no-images
```

This will create all 6 blogs with complete content but without cover images. You can add cover images later once authentication is fixed.

### **Option 2: Fix GCP Authentication (Recommended)**

#### **Step 1: Generate New Service Account Key**

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/iam-admin/serviceaccounts?project=utopian-pride-462008-j4
   - Find: `service-account-local@utopian-pride-462008-j4.iam.gserviceaccount.com`

2. **Create New Key:**
   - Click on the service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose "JSON" format
   - Download the new key file

3. **Replace Old Key:**
   - Replace `secrets/service-account-key.json` with the new key file

4. **Test Authentication:**
   ```bash
   npm run test:gcp-auth
   ```

5. **Upload Images:**
   ```bash
   npm run blog:upload-images-batch2-fixed
   ```

6. **Create Blogs with Images:**
   ```bash
   npm run blog:create-proper
   ```

### **Option 3: Use Application Default Credentials**

If you have `gcloud` CLI installed:

```bash
# Authenticate with gcloud
gcloud auth application-default login

# Test the fixed upload script
npm run blog:upload-images-batch2-fixed
```

## 📋 **Available Commands**

| Command | Purpose |
|---------|---------|
| `npm run blog:create-no-images` | Create blogs without cover images (immediate solution) |
| `npm run test:gcp-auth` | Test Google Cloud authentication |
| `npm run blog:upload-images-batch2-fixed` | Upload cover image (after fixing auth) |
| `npm run blog:create-proper` | Create blogs with cover images |
| `npm run blog:delete-batch2` | Delete all batch 2 blogs (if needed) |

## 🎯 **Recommended Action Plan**

### **Immediate (5 minutes):**
```bash
npm run blog:create-no-images
```
This gets all your blogs published immediately without cover images.

### **Later (when you have time):**
1. Fix GCP authentication by generating a new service account key
2. Upload the cover image
3. Update the blogs to include the cover image

## 🔍 **What Each Blog Contains**

All 6 blogs will be created with:
- ✅ Complete content from markdown files
- ✅ Proper author details and LinkedIn profiles
- ✅ Relevant tags for each blog
- ✅ Published status
- ❌ Cover images (will be added later)

## 📊 **Blogs to be Created**

1. **Digital Constitutionalism** - Rudransh Mondal
2. **Dark Web Terrorism** - Rishi Ranjan
3. **Nuclear Accidents Impact** - Rishi Ranjan
4. **AI & Privacy Rights** - Ashish Nayan
5. **Income Tax Post-2025** - Sajal Anand
6. **Legal Profession & AI** - Vaibhav Mishra

## 🚀 **Ready to Proceed?**

**For immediate results:**
```bash
npm run blog:create-no-images
```

**For complete solution:**
1. Fix GCP authentication first
2. Then run: `npm run blog:upload-images-batch2-fixed && npm run blog:create-proper`
