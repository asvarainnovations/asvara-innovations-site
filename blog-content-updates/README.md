# Blog Content Updates

This directory contains updated content files for blog posts.

## How to Update Blog Content

### Method 1: Using Content Files
1. Create a markdown file with your updated content (e.g., `updated-content-1.md`)
2. Place it in this directory
3. Update the `contentFile` field in the script to point to your file
4. Run the update script

### Method 2: Direct Content in Script
1. Edit the script directly
2. Add your content to the `content` field
3. Run the update script

## Available Scripts

- `npm run blog:update-dates` - Update publication dates only
- `npm run blog:update-content` - Update content only  
- `npm run blog:update-comprehensive` - Update both dates and content

## Example Content File Structure

```markdown
# Your Updated Title

Your updated content here...

## New Section

More content...
```


