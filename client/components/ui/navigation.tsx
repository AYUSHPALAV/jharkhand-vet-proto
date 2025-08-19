import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  CalendarCheck, 
  FileText, 
  TreePine,
  Stethoscope,
  MapPin,
  Menu,
  X,
  Globe
} from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'mun', name: 'Mundari', native: 'ᱢᱩᱱᱰᱟᱨᱤ' }
];

const navItems = [
  { 
    name: 'Report Issues', 
    path: '/report-issues', 
    icon: Heart,
    description: 'Report animal health problems'
  },
  { 
    name: 'Book Visit', 
    path: '/book-visit', 
    icon: CalendarCheck,
    description: 'Schedule veterinary visits'
  },
  { 
    name: 'Apply Schemes', 
    path: '/schemes', 
    icon: FileText,
    description: 'Government livestock schemes'
  },
  { 
    name: 'Wildlife Report', 
    path: '/wildlife-report', 
    icon: TreePine,
    description: 'Report wild animal sightings'
  },
  { 
    name: 'Doctor Portal', 
    path: '/doctor-portal', 
    icon: Stethoscope,
    description: 'Veterinary doctor dashboard'
  }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-nature-forest/20 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-nature-forest to-nature-leaf p-2 rounded-xl"
            >
              <MapPin className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-nature-forest">
                Jharkhand Veterinary
              </h1>
              <p className="text-sm text-nature-earth">Department</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <Link
                  to={item.path}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-nature-forest hover:bg-nature-forest/10 transition-all duration-300 group-hover:scale-105"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-nature-forest text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  {item.description}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center space-x-2 px-3 py-2 bg-nature-sky/20 rounded-lg text-nature-forest hover:bg-nature-sky/30 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === currentLang)?.native}
                </span>
              </motion.button>
              
              {showLangDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-nature-forest/20 overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-nature-forest/10 transition-colors ${
                        currentLang === lang.code ? 'bg-nature-forest/20 text-nature-forest font-semibold' : 'text-gray-700'
                      }`}
                    >
                      <div className="font-medium">{lang.native}</div>
                      <div className="text-sm text-gray-500">{lang.name}</div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-nature-forest text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-nature-forest/20"
          >
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-nature-forest hover:bg-nature-forest/10 transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-nature-earth">{item.description}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
