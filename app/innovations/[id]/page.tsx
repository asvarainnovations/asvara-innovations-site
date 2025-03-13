"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiOutlineClock, HiOutlineCalendar, HiOutlineArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { Button } from "../../components/Button";
import { SectionDivider } from "../../components/ui/SectionDivider";

// This would typically come from an API or database
const articles = [
  {
    id: 1,
    title: "AI-Powered Legal Research Revolution",
    description: "Discover how our advanced AI algorithms are transforming legal research, making it faster and more accurate than ever before.",
    content: `
      <h2>The Future of Legal Research</h2>
      <p>In today's fast-paced legal environment, traditional research methods are no longer sufficient. Our AI-powered legal research platform represents a quantum leap forward in how legal professionals access and analyze information.</p>

      <h3>Key Features</h3>
      <ul>
        <li>Natural Language Processing for intuitive searching</li>
        <li>Contextual understanding of legal documents</li>
        <li>Real-time case law updates and analysis</li>
        <li>Automated citation checking and validation</li>
      </ul>

      <h3>Benefits</h3>
      <p>Our platform reduces research time by up to 70% while improving accuracy and comprehensiveness. Legal professionals can now focus more on analysis and strategy rather than spending hours on manual research.</p>

      <h2>Technology Behind the Innovation</h2>
      <p>We utilize state-of-the-art machine learning models trained on millions of legal documents. Our algorithms understand legal context, precedents, and jurisdictional nuances, providing more relevant results than traditional keyword searches.</p>

      <h3>Impact on Legal Practice</h3>
      <p>Early adopters of our technology report significant improvements in:</p>
      <ul>
        <li>Research efficiency and accuracy</li>
        <li>Case preparation time</li>
        <li>Client satisfaction</li>
        <li>Cost-effectiveness</li>
      </ul>
    `,
    image: "/images/article1.jpg",
    category: "Legal Tech",
    readTime: "5 min read",
    date: "2024-03-20",
  },
  {
    id: 2,
    title: "Automated Document Analysis",
    description: "Learn how our machine learning models can analyze complex legal documents with unprecedented accuracy and speed.",
    content: `
      <h2>Revolutionizing Document Analysis</h2>
      <p>Document analysis has always been a time-consuming aspect of legal work. Our automated system changes this paradigm completely, offering unprecedented speed and accuracy.</p>

      <h3>Core Capabilities</h3>
      <ul>
        <li>Automated contract review and analysis</li>
        <li>Risk identification and assessment</li>
        <li>Compliance checking across jurisdictions</li>
        <li>Document comparison and version control</li>
      </ul>

      <h2>Technical Innovation</h2>
      <p>Our system employs advanced natural language processing and machine learning algorithms to understand document context, identify potential issues, and extract key information automatically.</p>

      <h3>Practical Applications</h3>
      <p>The system has been successfully deployed in various scenarios:</p>
      <ul>
        <li>Due diligence processes</li>
        <li>Contract review and management</li>
        <li>Regulatory compliance</li>
        <li>Legal research and analysis</li>
      </ul>

      <h2>Future Developments</h2>
      <p>We continue to enhance our system with new capabilities and improvements based on user feedback and technological advancements.</p>
    `,
    image: "/images/article2.jpg",
    category: "Innovation",
    readTime: "7 min read",
    date: "2024-03-18",
  },
  {
    id: 3,
    title: "Predictive Analytics in Legal Practice",
    description: "Explore how data-driven insights can help predict case outcomes and make better legal decisions.",
    content: `
      <h2>Data-Driven Decision Making</h2>
      <p>Predictive analytics is transforming how legal professionals approach cases and make strategic decisions. Our platform provides unprecedented insights based on historical data and patterns.</p>

      <h3>Key Capabilities</h3>
      <ul>
        <li>Case outcome prediction</li>
        <li>Settlement value estimation</li>
        <li>Judge and jurisdiction analysis</li>
        <li>Timeline and cost projections</li>
      </ul>

      <h2>The Technology Stack</h2>
      <p>Our predictive analytics engine combines machine learning, statistical analysis, and legal domain expertise to provide accurate insights and predictions.</p>

      <h3>Real-World Impact</h3>
      <p>Law firms using our predictive analytics have reported:</p>
      <ul>
        <li>Better case strategy development</li>
        <li>More accurate budget forecasting</li>
        <li>Improved client communication</li>
        <li>Higher success rates in litigation</li>
      </ul>

      <h2>Looking Ahead</h2>
      <p>As we continue to gather more data and refine our algorithms, the accuracy and scope of our predictions will only improve, making this tool increasingly valuable for legal professionals.</p>
    `,
    image: "/images/article3.jpg",
    category: "Analytics",
    readTime: "6 min read",
    date: "2024-03-15",
  },
];

export default function ArticlePage() {
  const params = useParams();
  const articleId = Number(params.id);
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0F1C] via-[#1C3D5A] to-[#0A192F]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <Link href="/innovations">
            <Button variant="secondary">Return to Articles</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#1C3D5A] to-[#0A192F]">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent" />
      </div>

      <div className="relative pt-32 pb-20">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link href="/innovations">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white flex items-center space-x-2"
            >
              <HiOutlineArrowLeft className="w-5 h-5" />
              <span>Back to Articles</span>
            </Button>
          </Link>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-8">
              <span className="px-3 py-1 text-sm font-medium bg-accent/90 text-white rounded-full">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-6 mb-4">
                {article.title}
              </h1>
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

            {/* Featured Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </motion.div>
        </article>
      </div>

      <SectionDivider from="from-[#0A0F1C]" to="to-gray-900" className="z-20" />
    </main>
  );
} 