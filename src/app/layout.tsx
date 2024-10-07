import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Study Fetch - Take Home",
  description: "An advanced learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4 md:py-6">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-500">
                  StudyFetch
                </Link>
              </div>
              <nav className="flex space-x-4 md:space-x-10">
                <Link href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  <span className="md:hidden">1</span>
                  <span className="hidden md:inline">Page1</span>
                </Link>
                <Link href="/page2" 
                className="text-base font-medium text-gray-500 hover:text-gray-900">
                  <span className="md:hidden">2</span>
                  <span className="hidden md:inline">Page2</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
          
        <footer className="bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Created by Ritik Singh.
            </p>
          </div>
        </footer>

        <Script id="remove-extra-attributes" strategy="beforeInteractive">
          {`
            (function() {
              var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                  if (mutation.type === "attributes") {
                    document.body.removeAttribute('data-new-gr-c-s-check-loaded');
                    document.body.removeAttribute('data-gr-ext-installed');
                    document.body.removeAttribute('data-gr-ext-disabled');
                  }
                });
              });
              observer.observe(document.body, { attributes: true });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}