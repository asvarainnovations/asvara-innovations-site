export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getPublicUrl } from '@/lib/gcp/storage';
import { BUCKETS } from '@/lib/gcp-config';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { z } from "zod";

const BlogSubmissionSchema = z.object({
  authorName: z.string().min(1, "Author name is required"),
  authorEmail: z.string().email("Valid email is required"),
  socialProfile: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional(),
  coverImageUrl: z.string().optional(),
  attachmentUrls: z.array(z.string()).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to the terms",
  }),
});

// GET /api/blogs - List/filter/paginate posts
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const published = searchParams.get("published") === "true";

    const blogPosts = await prisma.blogPost.findMany({
      where: published ? { status: "PUBLISHED" } : undefined,
      orderBy: { createdAt: "desc" },
    });

    // Add public URLs for coverImage and attachments if present
    const postsWithUrls = await Promise.all(blogPosts.map(async (post) => {
      let coverImage = null;
      if (post.coverImage) {
        coverImage = getPublicUrl(BUCKETS.BLOG_IMAGES, post.coverImage);
      }
      // If you have attachments, add similar logic here
      return {
        ...post,
        coverImage,
      };
    }));

    return NextResponse.json({ blogs: postsWithUrls });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create a new blog post (admin/editor only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    // Validate the submission data
    const validatedData = BlogSubmissionSchema.parse(data);

    // Helper function to extract file path from GCS URL
    const extractGcsPath = (url: string, bucketName: string): string => {
      const gcsUrl = `https://storage.googleapis.com/${bucketName}/`;
      return url.startsWith(gcsUrl) ? url.replace(gcsUrl, '') : url;
    };

    // Create the blog submission
    const submission = await prisma.blogSubmission.create({
      data: {
        authorName: validatedData.authorName,
        authorEmail: validatedData.authorEmail,
        socialProfile: validatedData.socialProfile,
        title: validatedData.title,
        excerpt: validatedData.excerpt,
        content: validatedData.content,
        // Store only the path after the bucket for coverImage
        coverImage: validatedData.coverImageUrl
          ? extractGcsPath(validatedData.coverImageUrl, BUCKETS.BLOG_IMAGES)
          : undefined,
        tags: validatedData.tags || [],
        consent: validatedData.consent,
        attachments: {
          create: validatedData.attachmentUrls?.map(url => ({
            // Store only the path after the bucket for attachments
            url: extractGcsPath(url, BUCKETS.BLOG_ATTACHMENTS),
            type: 'file'
          })) || []
        }
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error creating blog post:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
} 