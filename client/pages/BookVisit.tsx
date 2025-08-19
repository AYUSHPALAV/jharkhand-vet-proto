import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarCheck, 
  Clock,
  MapPin, 
  User,
  Stethoscope,
  Heart,
  Shield,
  Syringe,
  Calendar,
  Phone,
  CheckCircle,
  AlertCircle,
  Users,
  Home,
  Car
} from 'lucide-react';

const serviceTypes = [
  {
    id: 'routine-checkup',
    name: 'Routine Health Checkup',
    description: 'General health examination and wellness check',
    icon: Stethoscope,
    duration: '30-45 minutes',
    price: 'Free',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'vaccination',
    name: 'Vaccination Services',
    description: 'Preventive vaccines and immunization',
    icon: Syringe,
    duration: '20-30 minutes',
    price: 'Subsidized',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'emergency',
    name: 'Emergency Treatment',
    description: 'Urgent medical attention for sick animals',
    icon: Heart,
    duration: '1-2 hours',
    price: 'Emergency Rate',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'breeding',
    name: 'Breeding Consultation',
    description: 'Artificial insemination and breeding advice',
    icon: Users,
    duration: '45-60 minutes',
    price: 'Government Rate',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'nutrition',
    name: 'Nutrition Counseling',
    description: 'Feed planning and dietary recommendations',
    icon: Shield,
    duration: '30 minutes',
    price: 'Free',
    color: 'from-orange-500 to-orange-600'
  }
];

const visitTypes = [
  {
    id: 'home-visit',
    name: 'Farm/Home Visit',
    description: 'Doctor visits your location',
    icon: Home,
    details: 'Best for multiple animals or immobile livestock'
  },
  {
    id: 'clinic-visit',
    name: 'Clinic Visit',
    description: 'Bring animal to nearest clinic',
    icon: Car,
    details: 'Faster service, advanced equipment available'
  },
  {
    id: 'mobile-clinic',
    name: 'Mobile Clinic',
    description: 'Mobile vet unit in your area',
    icon: Car,
    details: 'Available on scheduled days in remote areas'
  }
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];

const animalTypes = [
  { id: 'cattle', name: 'Cattle (Cow/Bull/Buffalo)', icon: '🐄' },
  { id: 'goat', name: 'Goat', icon: '🐐' },
  { id: 'sheep', name: 'Sheep', icon: '🐑' },
  { id: 'poultry', name: 'Poultry', icon: '🐔' },
  { id: 'pig', name: 'Pig', icon: '🐷' },
  { id: 'other', name: 'Other', icon: '🐾' }
];

interface BookingData {
  // Personal Information
  farmerName: string;
  phone: string;
  village: string;
  address: string;
  
  // Service Details
  serviceType: string;
  visitType: string;
  animalType: string;
  animalCount: number;
  description: string;
  
  // Appointment Details
  preferredDate: string;
  preferredTime: string;
  alternateDate: string;
  alternateTime: string;
  
  // Additional Info
  urgency: string;
  previousVisit: boolean;
}

export default function BookVisit() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    farmerName: '',
    phone: '',
    village: '',
    address: '',
    serviceType: '',
    visitType: '',
    animalType: '',
    animalCount: 1,
    description: '',
    preferredDate: '',
    preferredTime: '',
    alternateDate: '',
    alternateTime: '',
    urgency: 'normal',
    previousVisit: false
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSubmitted(true);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Generate next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-nature-sky/20 via-white to-nature-grass/10 flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-nature-forest mb-4">Appointment Booked!</h2>
          <p className="text-nature-earth mb-6">
            Your veterinary appointment has been successfully scheduled. You will receive a confirmation call within 2 hours.
          </p>
          <div className="bg-nature-sky/20 rounded-lg p-4 mb-6 text-left">
            <p className="font-semibold text-nature-forest">Booking ID: VET-{Date.now()}</p>
            <p className="text-sm text-nature-earth mt-1">Service: {serviceTypes.find(s => s.id === bookingData.serviceType)?.name}</p>
            <p className="text-sm text-nature-earth">Date: {bookingData.preferredDate}</p>
            <p className="text-sm text-nature-earth">Time: {bookingData.preferredTime}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(1);
              setBookingData({
                farmerName: '',
                phone: '',
                village: '',
                address: '',
                serviceType: '',
                visitType: '',
                animalType: '',
                animalCount: 1,
                description: '',
                preferredDate: '',
                preferredTime: '',
                alternateDate: '',
                alternateTime: '',
                urgency: 'normal',
                previousVisit: false
              });
            }}
            className="w-full bg-gradient-to-r from-nature-forest to-nature-leaf text-white py-3 rounded-xl font-semibold"
          >
            Book Another Appointment
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
            Book Veterinary Visit
          </h1>
          <p className="text-xl text-nature-earth max-w-2xl mx-auto">
            Schedule professional veterinary care for your livestock. Our experienced doctors are ready to help.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    step <= currentStep 
                      ? 'bg-nature-forest text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}
                  animate={{ scale: step === currentStep ? 1.1 : 1 }}
                >
                  {step}
                </motion.div>
                {step < 4 && (
                  <div className={`flex-1 h-2 mx-4 rounded ${
                    step < currentStep ? 'bg-nature-forest' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-nature-earth">
            <span>Personal Info</span>
            <span>Service Type</span>
            <span>Schedule</span>
            <span>Confirmation</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center">
                  <User className="h-6 w-6 mr-2" />
                  Personal Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Farmer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingData.farmerName}
                      onChange={(e) => setBookingData(prev => ({ ...prev, farmerName: e.target.value }))}
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
                      value={bookingData.phone}
                      onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Village *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingData.village}
                      onChange={(e) => setBookingData(prev => ({ ...prev, village: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Village name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Complete Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingData.address}
                      onChange={(e) => setBookingData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Full address with landmarks"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-nature-forest to-nature-leaf text-white rounded-xl font-semibold"
                  >
                    Next Step
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 2: Service Selection */}
            {currentStep === 2 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center">
                  <Stethoscope className="h-6 w-6 mr-2" />
                  Service Details
                </h2>
                
                {/* Service Type Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-nature-forest mb-3">
                    Type of Service Needed *
                  </label>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {serviceTypes.map((service) => (
                      <motion.button
                        key={service.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setBookingData(prev => ({ ...prev, serviceType: service.id }))}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          bookingData.serviceType === service.id
                            ? 'border-nature-forest bg-nature-forest/10'
                            : 'border-gray-200 hover:border-nature-forest/50'
                        }`}
                      >
                        <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${service.color} text-white mb-3`}>
                          <service.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-nature-forest mb-1">{service.name}</h3>
                        <p className="text-sm text-nature-earth mb-2">{service.description}</p>
                        <div className="flex justify-between text-xs text-nature-earth">
                          <span>{service.duration}</span>
                          <span className="font-semibold">{service.price}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Visit Type */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-nature-forest mb-3">
                    Visit Type *
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {visitTypes.map((visit) => (
                      <motion.button
                        key={visit.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setBookingData(prev => ({ ...prev, visitType: visit.id }))}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          bookingData.visitType === visit.id
                            ? 'border-nature-forest bg-nature-forest/10'
                            : 'border-gray-200 hover:border-nature-forest/50'
                        }`}
                      >
                        <visit.icon className="h-8 w-8 text-nature-forest mb-2" />
                        <h3 className="font-semibold text-nature-forest mb-1">{visit.name}</h3>
                        <p className="text-sm text-nature-earth mb-2">{visit.description}</p>
                        <p className="text-xs text-nature-earth">{visit.details}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Animal Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-3">
                      Animal Type *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {animalTypes.map((animal) => (
                        <motion.button
                          key={animal.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setBookingData(prev => ({ ...prev, animalType: animal.id }))}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            bookingData.animalType === animal.id
                              ? 'border-nature-forest bg-nature-forest/10'
                              : 'border-gray-200 hover:border-nature-forest/50'
                          }`}
                        >
                          <div className="text-lg mb-1">{animal.icon}</div>
                          <div className="text-sm font-medium text-nature-forest">{animal.name}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Number of Animals *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={bookingData.animalCount}
                      onChange={(e) => setBookingData(prev => ({ ...prev, animalCount: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                    
                    <label className="block text-sm font-semibold text-nature-forest mb-2 mt-4">
                      Description (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={bookingData.description}
                      onChange={(e) => setBookingData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Any specific concerns or requirements..."
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={prevStep}
                    className="px-8 py-3 border border-nature-forest text-nature-forest rounded-xl font-semibold hover:bg-nature-forest/10"
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-nature-forest to-nature-leaf text-white rounded-xl font-semibold"
                  >
                    Next Step
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 3: Schedule */}
            {currentStep === 3 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-2" />
                  Schedule Appointment
                </h2>
                
                {/* Urgency Level */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-nature-forest mb-3">
                    Urgency Level
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'normal', name: 'Normal', desc: 'Within 2-3 days', color: 'bg-green-500' },
                      { id: 'urgent', name: 'Urgent', desc: 'Within 24 hours', color: 'bg-orange-500' },
                      { id: 'emergency', name: 'Emergency', desc: 'Immediate', color: 'bg-red-500' }
                    ].map((urgency) => (
                      <motion.button
                        key={urgency.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setBookingData(prev => ({ ...prev, urgency: urgency.id }))}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          bookingData.urgency === urgency.id
                            ? 'border-nature-forest bg-nature-forest/10'
                            : 'border-gray-200 hover:border-nature-forest/50'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${urgency.color} mx-auto mb-2`} />
                        <div className="font-semibold text-nature-forest">{urgency.name}</div>
                        <div className="text-sm text-nature-earth">{urgency.desc}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-3">
                      Preferred Date *
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                      {getAvailableDates().map((date) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                        const dayNum = date.getDate();
                        const month = date.toLocaleDateString('en-US', { month: 'short' });
                        
                        return (
                          <motion.button
                            key={dateStr}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setBookingData(prev => ({ ...prev, preferredDate: dateStr }))}
                            className={`p-3 rounded-lg border-2 transition-all text-center ${
                              bookingData.preferredDate === dateStr
                                ? 'border-nature-forest bg-nature-forest/10'
                                : 'border-gray-200 hover:border-nature-forest/50'
                            }`}
                          >
                            <div className="text-xs text-nature-earth">{dayName}</div>
                            <div className="font-bold text-nature-forest">{dayNum}</div>
                            <div className="text-xs text-nature-earth">{month}</div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-3">
                      Preferred Time *
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <motion.button
                          key={time}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setBookingData(prev => ({ ...prev, preferredTime: time }))}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            bookingData.preferredTime === time
                              ? 'border-nature-forest bg-nature-forest/10'
                              : 'border-gray-200 hover:border-nature-forest/50'
                          }`}
                        >
                          <Clock className="h-4 w-4 mx-auto mb-1 text-nature-forest" />
                          <div className="text-sm font-medium text-nature-forest">{time}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Alternate Date/Time */}
                <div className="bg-nature-sky/20 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-nature-forest mb-3">Alternate Option (Optional)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-nature-forest mb-2">
                        Alternate Date
                      </label>
                      <input
                        type="date"
                        value={bookingData.alternateDate}
                        onChange={(e) => setBookingData(prev => ({ ...prev, alternateDate: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-nature-forest mb-2">
                        Alternate Time
                      </label>
                      <select
                        value={bookingData.alternateTime}
                        onChange={(e) => setBookingData(prev => ({ ...prev, alternateTime: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={prevStep}
                    className="px-8 py-3 border border-nature-forest text-nature-forest rounded-xl font-semibold hover:bg-nature-forest/10"
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-nature-forest to-nature-leaf text-white rounded-xl font-semibold"
                  >
                    Review Booking
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  Confirm Booking
                </h2>
                
                <div className="bg-nature-sky/20 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-nature-forest mb-4">Booking Summary</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Farmer:</span>
                        <span className="ml-2 text-nature-earth">{bookingData.farmerName}</span>
                      </div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Phone:</span>
                        <span className="ml-2 text-nature-earth">{bookingData.phone}</span>
                      </div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Address:</span>
                        <span className="ml-2 text-nature-earth">{bookingData.village}, {bookingData.address}</span>
                      </div>
                    </div>
                    <div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Service:</span>
                        <span className="ml-2 text-nature-earth">{serviceTypes.find(s => s.id === bookingData.serviceType)?.name}</span>
                      </div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Visit Type:</span>
                        <span className="ml-2 text-nature-earth">{visitTypes.find(v => v.id === bookingData.visitType)?.name}</span>
                      </div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Animals:</span>
                        <span className="ml-2 text-nature-earth">{bookingData.animalCount} {animalTypes.find(a => a.id === bookingData.animalType)?.name}</span>
                      </div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Preferred:</span>
                        <span className="ml-2 text-nature-earth">{bookingData.preferredDate} at {bookingData.preferredTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div className="text-sm text-yellow-700">
                      <p className="font-semibold mb-1">Important Information:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Confirmation call will be made within 2 hours</li>
                        <li>Please have your animals ready at the scheduled time</li>
                        <li>Keep your animals in a safe, accessible location</li>
                        <li>Emergency contact: 1800-XXX-XXXX</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={prevStep}
                    className="px-8 py-3 border border-nature-forest text-nature-forest rounded-xl font-semibold hover:bg-nature-forest/10"
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`px-8 py-3 text-white rounded-xl font-semibold ${
                      loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-nature-forest to-nature-leaf'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Confirming...
                      </div>
                    ) : (
                      'Confirm Booking'
                    )}
                  </motion.button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </div>
  );
}
