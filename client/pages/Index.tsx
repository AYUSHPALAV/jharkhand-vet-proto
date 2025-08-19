import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  CalendarCheck, 
  FileText, 
  TreePine, 
  Stethoscope,
  Users,
  TrendingUp,
  Award,
  Phone,
  Mail,
  Clock,
  MapPin,
  ArrowRight,
  Star
} from 'lucide-react';
import { FarmScene } from '../components/ui/farm-scene';

const services = [
  {
    id: 'report-issues',
    title: 'Report Health Issues',
    description: 'Quickly report animal health problems to local veterinary experts',
    icon: Heart,
    path: '/report-issues',
    color: 'from-red-500 to-red-600',
    hoverColor: 'hover:from-red-600 hover:to-red-700',
    features: ['24/7 Emergency Support', 'Photo Upload', 'GPS Location']
  },
  {
    id: 'book-visit',
    title: 'Book Vet Visits',
    description: 'Schedule professional veterinary visits to your farm or village',
    icon: CalendarCheck,
    path: '/book-visit',
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    features: ['Free Consultation', 'Mobile Clinic', 'Expert Doctors']
  },
  {
    id: 'schemes',
    title: 'Government Schemes',
    description: 'Apply for livestock subsidies and financial assistance programs',
    icon: FileText,
    path: '/schemes',
    color: 'from-green-500 to-green-600',
    hoverColor: 'hover:from-green-600 hover:to-green-700',
    features: ['Easy Application', 'Document Upload', 'Status Tracking']
  },
  {
    id: 'wildlife',
    title: 'Wildlife Reporting',
    description: 'Report wild animal sightings to Forest Department for safety',
    icon: TreePine,
    path: '/wildlife-report',
    color: 'from-orange-500 to-orange-600',
    hoverColor: 'hover:from-orange-600 hover:to-orange-700',
    features: ['Elephant Alerts', 'Safety Measures', 'Quick Response']
  }
];

const stats = [
  { label: 'Villages Served', value: '2,847', icon: MapPin },
  { label: 'Animals Treated', value: '45,632', icon: Heart },
  { label: 'Active Doctors', value: '127', icon: Stethoscope },
  { label: 'Success Rate', value: '94%', icon: TrendingUp }
];

const testimonials = [
  {
    name: 'Ram Singh',
    village: 'Jamshedpur',
    text: 'The mobile vet service saved my cow when she was critically ill. Quick response and professional treatment.',
    rating: 5
  },
  {
    name: 'Sunita Devi',
    village: 'Ranchi',
    text: 'Got government subsidy for my goat farming through this portal. Very easy process.',
    rating: 5
  },
  {
    name: 'Arjun Tudu',
    village: 'Dumka',
    text: 'Reported elephant sighting and got immediate safety alerts for our village.',
    rating: 5
  }
];

export default function Index() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleAnimalClick = (animalType: string) => {
    if (animalType === 'cattle') {
      setSelectedService('report-issues');
    } else if (animalType === 'goat') {
      setSelectedService('book-visit');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-sky/20 via-white to-nature-grass/10">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-nature-forest mb-6"
            >
              Jharkhand
              <span className="block text-nature-earth">Veterinary Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-nature-earth max-w-3xl mx-auto mb-8"
            >
              Connecting rural communities with professional veterinary care through modern technology
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-nature-forest to-nature-leaf text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
              >
                Emergency Support: 1800-XXX-XXXX
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white border-2 border-nature-forest text-nature-forest rounded-xl font-semibold shadow-lg hover:bg-nature-forest hover:text-white transition-all duration-300"
              >
                <Phone className="inline-block w-5 h-5 mr-2" />
                Contact Doctor
              </motion.button>
            </motion.div>
          </div>

          {/* 3D Farm Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-16"
          >
            <FarmScene onAnimalClick={handleAnimalClick} />
            <p className="text-center mt-4 text-nature-earth">
              Click on the animals to explore our services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-nature-forest mb-4">
              Our Services
            </h2>
            <p className="text-xl text-nature-earth max-w-2xl mx-auto">
              Comprehensive veterinary support for rural Jharkhand communities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  selectedService === service.id ? 'ring-4 ring-nature-forest' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-nature-forest mb-2 group-hover:text-nature-leaf transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-nature-earth mb-4">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-nature-earth">
                        <Star className="h-4 w-4 text-nature-sun mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={service.path}
                    className={`inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r ${service.color} ${service.hoverColor} text-white rounded-xl font-semibold transition-all duration-300 group-hover:scale-105`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-nature-forest to-nature-leaf text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-4 bg-white/20 rounded-full mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-nature-forest mb-4">
              Community Stories
            </h2>
            <p className="text-xl text-nature-earth max-w-2xl mx-auto">
              Real experiences from farmers and villagers across Jharkhand
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-nature-sun fill-current" />
                  ))}
                </div>
                <p className="text-nature-earth mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-nature-forest">{testimonial.name}</div>
                  <div className="text-sm text-nature-earth">{testimonial.village}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-nature-sky/20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-nature-forest mb-8">
              Need Immediate Help?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="p-4 bg-nature-forest text-white rounded-full mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-nature-forest mb-2">Emergency Hotline</h3>
                <p className="text-nature-earth">1800-XXX-XXXX</p>
                <p className="text-sm text-nature-earth">24/7 Available</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-nature-forest text-white rounded-full mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-nature-forest mb-2">Email Support</h3>
                <p className="text-nature-earth">help@jharkhandvet.gov.in</p>
                <p className="text-sm text-nature-earth">Response within 2 hours</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-nature-forest text-white rounded-full mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-nature-forest mb-2">Office Hours</h3>
                <p className="text-nature-earth">Mon-Sat: 9 AM - 6 PM</p>
                <p className="text-sm text-nature-earth">Sunday: Emergency only</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
