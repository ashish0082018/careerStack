"use client";
import { Github, Linkedin, Mail, Heart, Code } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' }
    ]
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/ashish0082018',
      icon: Github
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ashish-verma-16b525238/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      icon: Linkedin
    },
    {
      name: 'Email',
      // Opens Gmail compose
      href: 'https://mail.google.com/mail/?view=cm&to=av0082018@gmail.com',
      icon: Mail
    }
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Brand Section */}
          <div className="md:max-w-md">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl">CareerStack</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Build your developer brand that gets you hired with AI-powered tools.
            </p>
            <div className="flex space-x-4 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© {currentYear} CareerStack. All rights reserved.</span>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
