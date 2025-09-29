# Blog Publishing Guide

## 🚀 Publishing "Women & Political Backwardness" Blog Post

### 📋 Prerequisites
- ✅ Blog content ready (✅ DONE)
- ✅ Images prepared (✅ DONE)
- ✅ Database connection configured
- ✅ GCP Storage bucket access

### 📸 Step 1: Prepare Images

1. **Save the 4 figure images** to the `blog-images/` directory:
   - `fig1-female-candidates-uttarakhand.png` (Pie chart - Female Candidates in Uttarakhand)
   - `fig2-female-candidates-himachal.png` (Pie chart - Female Candidates in Himachal Pradesh)
   - `fig3-uttarakhand-district-data.png` (Bar chart - Female Population vs Female Candidates - Uttarakhand)
   - `fig4-himachal-district-data.png` (Bar chart - Female Population vs Female Candidates - Himachal Pradesh)

2. **Create a cover image** (optional):
   - Save as `women-political-backwardness-cover.jpg` in `blog-images/`
   - Recommended size: 1200x630px for social media sharing

### 🔧 Step 2: Upload Images to GCP

```bash
npm run blog:upload-images
```

This will upload all images to your GCP storage bucket and make them publicly accessible.

### 📝 Step 3: Create Blog Post

```bash
npm run blog:create
```

This will create the blog post in your database with:
- ✅ Complete content with proper markdown formatting
- ✅ Images embedded exactly where they appear in the original blog
- ✅ Author profile (Sajal Anand) at the end
- ✅ Tags (Women Empowerment, Political Science, etc.)
- ✅ Clickable reference links that open in new tabs
- ✅ Published status

### 🚀 Step 4: Publish Everything (One Command)

```bash
npm run blog:publish
```

This runs both image upload and blog creation in sequence.

### 📊 Blog Post Details

**Title:** Women & Political Backwardness: A Comprehensive Analysis of Uttarakhand and Himachal Pradesh

**Author:** Sajal Anand  
**Institution:** Law College Dehradun, Uttaranchal University  
**LinkedIn:** https://www.linkedin.com/in/sajal-anand-508993215

**Tags:**
- Women Empowerment
- Political Science
- Gender Studies
- Indian Politics
- Uttarakhand
- Himachal Pradesh
- Research
- Democracy

**Key Statistics:**
- **Uttarakhand:** 10% female candidates (62 out of 626 total)
- **Himachal Pradesh:** 6% female candidates (24 out of 412 total)
- **National:** 14.44% women in 17th Lok Sabha

### 🔍 Step 5: Verify Publication

1. **Check blog listing:** Visit `/blogs` (cover image should appear here)
2. **View individual post:** Click on the blog title
3. **Verify images:** Ensure all 4 figures are embedded in the correct locations
4. **Test links:** Click reference links to ensure they open in new tabs
5. **Test responsiveness:** Check on mobile devices

### 🛠️ Troubleshooting

**If images don't upload:**
- Check GCP credentials in `secrets/gcp-key.json`
- Verify bucket permissions
- Ensure images exist in `blog-images/` directory

**If blog doesn't create:**
- Check database connection
- Verify Prisma client is generated
- Check for any validation errors

**If images don't display:**
- Verify GCP bucket is public
- Check image URLs in database
- Ensure proper CORS settings

### 📈 Next Steps

After publishing this blog, you can:
1. **Share on social media** with the blog URL
2. **Create more blog posts** using the same process
3. **Customize the blog layout** if needed
4. **Add SEO meta tags** for better search visibility

### 🎯 Success Indicators

✅ Blog appears on `/blogs` page with cover image  
✅ Individual blog page loads correctly (no cover image)  
✅ All 4 figures embedded in correct locations  
✅ Author information shows at the end  
✅ Reference links open in new tabs  
✅ Tags are applied and clickable  
✅ Content is properly formatted  
✅ No attachments section visible  

---

**Ready to publish? Run:** `npm run blog:publish`
