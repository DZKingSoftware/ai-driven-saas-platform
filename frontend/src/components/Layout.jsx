
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-dark-700 bg-dark-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AI SaaS</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                Documentation
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="btn-secondary text-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                Get Started
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 glass rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-dark-700 bg-dark-900"
            >
              <div className="px-6 py-4 space-y-4">
                <Link to="/" className="block text-gray-300 hover:text-white">
                  Home
                </Link>
                <Link to="/pricing" className="block text-gray-300 hover:text-white">
                  Pricing
                </Link>
                <Link to="#" className="block text-gray-300 hover:text-white">
                  Features
                </Link>
                <div className="flex gap-4 pt-4 border-t border-dark-700">
                  <Link to="/login" className="btn-secondary text-sm flex-1 text-center">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary text-sm flex-1 text-center">
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}
