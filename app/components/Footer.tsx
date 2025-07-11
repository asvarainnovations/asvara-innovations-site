"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const footerSections = {
    company: {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    products: {
      title: "Products",
      links: [
        { name: "PleadSmart", href: "/innovations/pleadsmart" },
        { name: "Docbare", href: "/innovations/docbare" },
        { name: "AI Court Room", href: "/innovations/aicourt" },
      ],
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blogs" },
        { name: "Innovations", href: "/innovations" },
        { name: "Help Center", href: "/help" },
      ],
    },
  };

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Asvara Innovations Logo"
                width={40}
                height={40}
                className="h-10 object-contain"
              />
              <span className="text-2xl font-poppins font-bold text-white">
                Asvara
                <span className="bg-gradient-to-r from-accent to-accent/70 text-transparent bg-clip-text">
                  Innovations
                </span>
              </span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Revolutionizing legal tech with cutting-edge AI solutions for
              legal professionals, law firms, and enterprises worldwide.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://instagram.com/asvara.ai"
                className="text-gray-400 hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/AsvaraInno"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Twitter/X"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Font Awesome X (Twitter) icon */}
                <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />
                {/* <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="x-twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M461.1 2.7c-7.6-3.2-16.3-1.4-22.1 4.4L256 190.1 73.1 7.1C67.3 1.3 58.6-.5 51 2.7S39.6 14.1 42.8 21.7L225.7 304.6 42.8 486.5c-7.6 7.6-9.4 19.3-4.4 28.1c5 8.8 15.7 12.6 24.5 7.6L256 321.9l183 183c8.8 5 19.5 1.2 24.5-7.6c5-8.8 3.2-20.5-4.4-28.1L286.3 304.6 469.2 21.7c3.2-7.6 1.4-16.3-4.4-22.1z"></path></svg> */}
              </Link>
              {/* <Link href="https://twitter.com" className="text-gray-400 hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="https://github.com" className="text-gray-400 hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link> */}
            </div>
          </div>

          {/* Links Sections */}
          {Object.values(footerSections).map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-accent transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Asvara Innovations. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/policies/privacy"
                className="text-gray-400 hover:text-accent text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/policies/terms"
                className="text-gray-400 hover:text-accent text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
