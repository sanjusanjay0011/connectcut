import { Link } from 'wouter';

type FooterLink = {
  label: string;
  href: string;
  isExternal?: boolean;
  icon?: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

export default function Footer() {
  const footerSections: FooterSection[] = [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/about" },
        { label: "Blog", href: "/about" },
        { label: "Press", href: "/about" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Find Editors", href: "/editors" },
        { label: "Browse Jobs", href: "/jobs" },
        { label: "Post a Job", href: "/post-job" },
        { label: "Join as Editor", href: "/join-as-editor" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Terms", href: "/about" },
        { label: "Privacy", href: "/about" },
        { label: "Cookies", href: "/about" },
        { label: "Licenses", href: "/about" }
      ]
    },
    {
      title: "Connect",
      links: [
        { label: "Twitter", href: "https://twitter.com", isExternal: true, icon: "twitter" },
        { label: "Instagram", href: "https://instagram.com", isExternal: true, icon: "instagram" },
        { label: "YouTube", href: "https://youtube.com", isExternal: true, icon: "youtube" },
        { label: "LinkedIn", href: "https://linkedin.com", isExternal: true, icon: "linkedin" }
      ]
    }
  ];
  
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.isExternal ? (
                      <a 
                        href={link.href} 
                        className="text-gray-400 hover:text-purple-500 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.icon && (
                          <span className="mr-2">
                            <svg className="h-4 w-4 inline" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v6h-2zm0-4h2v2h-2z"></path>
                            </svg>
                          </span>
                        )}
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-gray-400 hover:text-purple-500 transition-colors duration-200">
                        {link.icon && (
                          <span className="mr-2">
                            <svg className="h-4 w-4 inline" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v6h-2zm0-4h2v2h-2z"></path>
                            </svg>
                          </span>
                        )}
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="flex items-center mb-4 md:mb-0">
            <svg className="h-8 w-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v6h-2zm0-4h2v2h-2z"></path>
            </svg>
            <span className="ml-2 text-xl font-bold">ConnectCut</span>
          </Link>
          <p className="text-sm text-gray-400">© 2025 ConnectCut. Empowering creators and editors, together.</p>
        </div>
      </div>
    </footer>
  );
}
