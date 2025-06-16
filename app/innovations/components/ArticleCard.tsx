import Image from "next/image";
import Link from "next/link";
import { HiOutlineClock, HiOutlineCalendar } from "react-icons/hi";

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    readTime: string;
    date: string;
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/innovations/${article.id}`}>
      <div className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-accent/50 transition-colors">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-sm font-medium bg-accent/90 text-white rounded-full">
              {article.category}
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-300 mb-4 line-clamp-2">
            {article.description}
          </p>
          {/* Meta Information */}
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <HiOutlineClock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <HiOutlineCalendar className="w-4 h-4" />
              <span>{new Date(article.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
          </div>
        </div>
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 border-2 border-accent/0 rounded-2xl transition-all duration-300 group-hover:border-accent/50" />
      </div>
    </Link>
  );
} 