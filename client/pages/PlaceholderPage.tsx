import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-sky/20 via-white to-nature-grass/10 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="bg-nature-forest/10 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <Icon className="h-12 w-12 text-nature-forest" />
            </div>
            
            <h1 className="text-4xl font-bold text-nature-forest mb-4">{title}</h1>
            <p className="text-xl text-nature-earth mb-8">{description}</p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center text-yellow-700 mb-4">
                <Construction className="h-6 w-6 mr-2" />
                <span className="font-semibold">Page Under Development</span>
              </div>
              <p className="text-yellow-600">
                This feature is currently being developed. Please check back soon or contact our team for assistance.
              </p>
            </div>
            
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-nature-forest to-nature-leaf text-white py-3 px-6 rounded-xl font-semibold"
              >
                Contact Support: 1800-XXX-XXXX
              </motion.button>
              
              <Link
                to="/"
                className="inline-flex items-center text-nature-forest hover:text-nature-leaf transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Homepage
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
