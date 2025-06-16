import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

// GET /api/blogs - List/filter/paginate posts
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const published = searchParams.get("published") === "true";

    const blogPosts = await prisma.blogPost.findMany({
      where: published ? { status: "published" } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ blogs: blogPosts });
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
    const {
      authorName,
      authorEmail,
      socialProfile,
      title,
      excerpt,
      tags,
      content,
      coverImageUrl,
      attachmentUrls,
      consent,
    } = data;

    if (!consent) {
      return NextResponse.json(
        { error: "You must consent to the terms" },
        { status: 400 }
      );
    }

    const blogPost = await prisma.blogPost.create({
      data: {
        authorName,
        authorEmail,
        socialProfile,
        title,
        excerpt,
        content,
        coverImageUrl,
        attachmentUrls,
        tags: tags || [],
        status: "pending",
        userId: session.user.id,
      },
    });

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
} 