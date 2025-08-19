import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Camera, 
  MapPin, 
  Upload, 
  Phone,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const animalTypes = [
  { id: 'cattle', name: 'Cattle (Cow/Bull/Buffalo)', icon: '🐄' },
  { id: 'goat', name: 'Goat', icon: '🐐' },
  { id: 'sheep', name: 'Sheep', icon: '🐑' },
  { id: 'poultry', name: 'Poultry (Chicken/Duck)', icon: '🐔' },
  { id: 'pig', name: 'Pig', icon: '🐷' },
  { id: 'other', name: 'Other', icon: '🐾' }
];

const severityLevels = [
  { id: 'low', name: 'Mild', color: 'bg-yellow-500', description: 'Animal eating normally, minor symptoms' },
  { id: 'medium', name: 'Moderate', color: 'bg-orange-500', description: 'Reduced appetite, noticeable symptoms' },
  { id: 'high', name: 'Severe', color: 'bg-red-500', description: 'Not eating, serious symptoms' },
  { id: 'critical', name: 'Emergency', color: 'bg-red-700', description: 'Life-threatening condition' }
];

interface FormData {
  farmerName: string;
  phone: string;
  village: string;
  animalType: string;
  animalCount: number;
  symptoms: string;
  severity: string;
  duration: string;
  location: string;
  photos: File[];
}

export default function ReportIssues() {
  const [formData, setFormData] = useState<FormData>({
    farmerName: '',
    phone: '',
    village: '',
    animalType: '',
    animalCount: 1,
    symptoms: '',
    severity: '',
    duration: '',
    location: '',
    photos: []
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setSubmitted(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData(prev => ({
          ...prev,
          location: `${position.coords.latitude}, ${position.coords.longitude}`
        }));
      });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-nature-sky/20 via-white to-nature-grass/10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-nature-forest mb-4">Report Submitted!</h2>
          <p className="text-nature-earth mb-6">
            Your animal health report has been successfully submitted. Our veterinary team will contact you within 30 minutes.
          </p>
          <div className="bg-nature-sky/20 rounded-lg p-4 mb-6">
            <p className="font-semibold text-nature-forest">Report ID: VET-{Date.now()}</p>
            <p className="text-sm text-nature-earth">Save this ID for future reference</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSubmitted(false);
              setFormData({
                farmerName: '',
                phone: '',
                village: '',
                animalType: '',
                animalCount: 1,
                symptoms: '',
                severity: '',
                duration: '',
                location: '',
                photos: []
              });
            }}
            className="w-full bg-gradient-to-r from-nature-forest to-nature-leaf text-white py-3 rounded-xl font-semibold"
          >
            Submit Another Report
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-sky/20 via-white to-nature-grass/10 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-nature-forest mb-4">
            Report Animal Health Issues
          </h1>
          <p className="text-xl text-nature-earth max-w-2xl mx-auto">
            Get immediate help for your livestock. Our expert veterinarians are here to assist you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex items-center text-red-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p className="font-semibold">Emergency: Call 1800-XXX-XXXX immediately for life-threatening conditions</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Personal Information */}
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center">
                <User className="h-6 w-6 mr-2" />
                Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Farmer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.farmerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, farmerName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Village/Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.village}
                    onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="Village, Block, District"
                  />
                </div>
              </div>
            </div>

            {/* Animal Information */}
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center">
                <Heart className="h-6 w-6 mr-2" />
                Animal Details
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-nature-forest mb-3">
                  Animal Type *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {animalTypes.map((animal) => (
                    <motion.button
                      key={animal.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData(prev => ({ ...prev, animalType: animal.id }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.animalType === animal.id
                          ? 'border-nature-forest bg-nature-forest/10'
                          : 'border-gray-200 hover:border-nature-forest/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{animal.icon}</div>
                      <div className="text-sm font-medium text-nature-forest">{animal.name}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Number of Animals Affected *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.animalCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, animalCount: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Duration of Symptoms
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                  >
                    <option value="">Select duration</option>
                    <option value="few-hours">Few hours</option>
                    <option value="1-day">1 day</option>
                    <option value="2-3-days">2-3 days</option>
                    <option value="1-week">1 week</option>
                    <option value="more-than-week">More than a week</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Problem Description */}
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-nature-forest mb-6">
                Problem Description
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-nature-forest mb-3">
                  Severity Level *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {severityLevels.map((level) => (
                    <motion.button
                      key={level.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData(prev => ({ ...prev, severity: level.id }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.severity === level.id
                          ? 'border-nature-forest bg-nature-forest/10'
                          : 'border-gray-200 hover:border-nature-forest/50'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${level.color} mx-auto mb-2`} />
                      <div className="font-semibold text-nature-forest text-sm">{level.name}</div>
                      <div className="text-xs text-nature-earth mt-1">{level.description}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-nature-forest mb-2">
                  Describe Symptoms *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.symptoms}
                  onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                  placeholder="Describe what you've observed: eating habits, behavior changes, visible symptoms, etc."
                />
              </div>
            </div>

            {/* Location and Photos */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-nature-forest mb-6">
                Additional Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    GPS Location (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Auto-filled or enter manually"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={getCurrentLocation}
                      className="px-4 py-3 bg-nature-forest text-white rounded-lg"
                    >
                      <MapPin className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Upload Photos (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-nature-forest transition-colors"
                    >
                      <Camera className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="text-gray-500">Choose photos</span>
                    </label>
                  </div>
                  {formData.photos.length > 0 && (
                    <p className="text-sm text-nature-forest mt-2">
                      {formData.photos.length} photo(s) selected
                    </p>
                  )}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-4 text-white rounded-xl font-semibold text-lg transition-all ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-nature-forest to-nature-leaf hover:shadow-lg'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                    Submitting Report...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Upload className="h-6 w-6 mr-2" />
                    Submit Health Report
                  </div>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
