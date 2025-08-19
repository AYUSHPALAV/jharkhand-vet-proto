import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TreePine, 
  AlertTriangle,
  MapPin,
  Camera,
  Phone,
  Clock,
  Shield,
  User,
  Eye,
  CheckCircle,
  Upload,
  Navigation,
  Users,
  Home,
  Zap,
  Info,
  Bell,
  Calendar
} from 'lucide-react';

const wildAnimals = [
  {
    id: 'elephant',
    name: 'Elephant',
    emoji: '🐘',
    threatLevel: 'high',
    description: 'Large mammal, can be aggressive during musth or with young',
    safetyTips: ['Maintain 100m distance', 'Do not make loud noises', 'Move away slowly'],
    emergencyContact: 'Forest Emergency: 1800-XXX-1234'
  },
  {
    id: 'leopard',
    name: 'Leopard',
    emoji: '🐆',
    threatLevel: 'high',
    description: 'Predatory big cat, usually nocturnal',
    safetyTips: ['Do not venture alone at night', 'Keep livestock secured', 'Report immediately'],
    emergencyContact: 'Wildlife Control: 1800-XXX-5678'
  },
  {
    id: 'bear',
    name: 'Sloth Bear',
    emoji: '🐻',
    threatLevel: 'medium',
    description: 'Medium-sized bear, can be aggressive if cornered',
    safetyTips: ['Make noise while walking', 'Avoid areas with dense vegetation', 'Do not run'],
    emergencyContact: 'Forest Department: 1800-XXX-9012'
  },
  {
    id: 'wild-boar',
    name: 'Wild Boar',
    emoji: '🐗',
    threatLevel: 'medium',
    description: 'Can damage crops and be aggressive during breeding season',
    safetyTips: ['Secure crop areas', 'Avoid approaching with young', 'Use bright lights'],
    emergencyContact: 'Agricultural Officer: 1800-XXX-3456'
  },
  {
    id: 'snake',
    name: 'Venomous Snake',
    emoji: '🐍',
    threatLevel: 'high',
    description: 'Various venomous species found in the region',
    safetyTips: ['Wear protective footwear', 'Use flashlight at night', 'Call snake rescue'],
    emergencyContact: 'Snake Rescue: 1800-XXX-7890'
  },
  {
    id: 'jackal',
    name: 'Jackal/Wild Dog',
    emoji: '🐺',
    threatLevel: 'low',
    description: 'Usually harmless but may carry diseases',
    safetyTips: ['Keep pets indoors', 'Secure garbage', 'Vaccinate domestic animals'],
    emergencyContact: 'Veterinary Officer: 1800-XXX-2345'
  },
  {
    id: 'other',
    name: 'Other Wildlife',
    emoji: '🦌',
    threatLevel: 'low',
    description: 'Other wild animals not listed above',
    safetyTips: ['Observe from distance', 'Do not feed', 'Report unusual behavior'],
    emergencyContact: 'Forest Department: 1800-XXX-9012'
  }
];

const threatLevels = [
  {
    id: 'immediate',
    name: 'Immediate Threat',
    color: 'bg-red-500',
    description: 'Animal is aggressive or has attacked',
    response: 'Emergency team dispatched immediately'
  },
  {
    id: 'high',
    name: 'High Alert',
    color: 'bg-orange-500',
    description: 'Animal near village/humans, potentially dangerous',
    response: 'Response team dispatched within 2 hours'
  },
  {
    id: 'medium',
    name: 'Monitor',
    color: 'bg-yellow-500',
    description: 'Animal spotted but not threatening',
    response: 'Forest team will monitor the area'
  },
  {
    id: 'low',
    name: 'Information',
    color: 'bg-green-500',
    description: 'General wildlife sighting for records',
    response: 'Logged for wildlife tracking purposes'
  }
];

interface ReportData {
  // Personal Information
  reporterName: string;
  phone: string;
  village: string;
  
  // Sighting Details
  animalType: string;
  numberOfAnimals: number;
  behaviorDescription: string;
  threatLevel: string;
  
  // Location and Time
  exactLocation: string;
  gpsCoordinates: string;
  sightingTime: string;
  sightingDate: string;
  
  // Additional Details
  photos: File[];
  witnessCount: number;
  previousSightings: boolean;
  damageReported: boolean;
  damageDescription: string;
  
  // Safety
  peopleAtRisk: number;
  evacuationNeeded: boolean;
  immediateHelp: boolean;
}

export default function WildlifeReport() {
  const [reportData, setReportData] = useState<ReportData>({
    reporterName: '',
    phone: '',
    village: '',
    animalType: '',
    numberOfAnimals: 1,
    behaviorDescription: '',
    threatLevel: '',
    exactLocation: '',
    gpsCoordinates: '',
    sightingTime: '',
    sightingDate: '',
    photos: [],
    witnessCount: 0,
    previousSightings: false,
    damageReported: false,
    damageDescription: '',
    peopleAtRisk: 0,
    evacuationNeeded: false,
    immediateHelp: false
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSubmitted(true);
  };

  const handleAnimalSelect = (animal: any) => {
    setSelectedAnimal(animal);
    setReportData(prev => ({ 
      ...prev, 
      animalType: animal.id,
      threatLevel: animal.threatLevel
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setReportData(prev => ({
          ...prev,
          gpsCoordinates: `${position.coords.latitude}, ${position.coords.longitude}`
        }));
      });
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-nature-sky/20 via-white to-nature-grass/10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl"
        >
          <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-nature-forest mb-4">Report Submitted!</h2>
          <p className="text-nature-earth mb-6">
            Your wildlife sighting has been reported to the Forest Department. 
            {reportData.threatLevel === 'immediate' ? ' Emergency response team has been notified.' : 
             reportData.threatLevel === 'high' ? ' Response team will be dispatched within 2 hours.' :
             ' Your report will be reviewed and appropriate action taken.'}
          </p>
          
          <div className="bg-nature-sky/20 rounded-lg p-4 mb-6 text-left">
            <p className="font-semibold text-nature-forest">Report ID: WLF-{Date.now()}</p>
            <p className="text-sm text-nature-earth mt-1">Animal: {wildAnimals.find(a => a.id === reportData.animalType)?.name}</p>
            <p className="text-sm text-nature-earth">Location: {reportData.village}</p>
            <p className="text-sm text-nature-earth">Emergency Contact: {selectedAnimal?.emergencyContact}</p>
          </div>

          {reportData.threatLevel === 'immediate' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center text-red-700 mb-2">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span className="font-semibold">Emergency Response Activated</span>
              </div>
              <p className="text-sm text-red-600">
                Forest Department emergency team has been notified and is en route to your location.
              </p>
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(1);
              setSelectedAnimal(null);
              setReportData({
                reporterName: '',
                phone: '',
                village: '',
                animalType: '',
                numberOfAnimals: 1,
                behaviorDescription: '',
                threatLevel: '',
                exactLocation: '',
                gpsCoordinates: '',
                sightingTime: '',
                sightingDate: '',
                photos: [],
                witnessCount: 0,
                previousSightings: false,
                damageReported: false,
                damageDescription: '',
                peopleAtRisk: 0,
                evacuationNeeded: false,
                immediateHelp: false
              });
            }}
            className="w-full bg-gradient-to-r from-nature-forest to-nature-leaf text-white py-3 rounded-xl font-semibold"
          >
            Report Another Sighting
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
            Wildlife Reporting System
          </h1>
          <p className="text-xl text-nature-earth max-w-3xl mx-auto mb-8">
            Report wild animal sightings to protect your community and help with wildlife conservation. 
            Your reports help Forest Department take appropriate safety measures.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center text-red-700 mb-2">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <span className="font-semibold">Emergency: Call 112 for immediate danger</span>
            </div>
            <p className="text-red-600 text-sm">
              If you are in immediate danger from a wild animal, call emergency services first, then file this report.
            </p>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
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
                {step < 3 && (
                  <div className={`flex-1 h-2 mx-4 rounded ${
                    step < currentStep ? 'bg-nature-forest' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-nature-earth">
            <span>Animal & Threat</span>
            <span>Location & Time</span>
            <span>Submit Report</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            
            {/* Step 1: Animal Selection & Threat Assessment */}
            {currentStep === 1 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center">
                  <TreePine className="h-6 w-6 mr-2" />
                  Animal Identification & Threat Level
                </h2>
                
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-nature-forest mb-3">
                    Select the animal you spotted *
                  </label>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wildAnimals.map((animal) => (
                      <motion.button
                        key={animal.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnimalSelect(animal)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          reportData.animalType === animal.id
                            ? 'border-nature-forest bg-nature-forest/10'
                            : 'border-gray-200 hover:border-nature-forest/50'
                        }`}
                      >
                        <div className="flex items-center mb-3">
                          <span className="text-3xl mr-3">{animal.emoji}</span>
                          <div>
                            <h3 className="font-semibold text-nature-forest">{animal.name}</h3>
                            <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium text-white ${
                              animal.threatLevel === 'high' ? 'bg-red-500' :
                              animal.threatLevel === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                            }`}>
                              {animal.threatLevel.toUpperCase()} RISK
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-nature-earth mb-2">{animal.description}</p>
                        <p className="text-xs text-nature-earth font-medium">{animal.emergencyContact}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {selectedAnimal && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6"
                  >
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Safety Guidelines for {selectedAnimal.name}
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      {selectedAnimal.safetyTips.map((tip: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-nature-forest mb-3">
                    Current Threat Level *
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {threatLevels.map((level) => (
                      <motion.button
                        key={level.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setReportData(prev => ({ ...prev, threatLevel: level.id }))}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          reportData.threatLevel === level.id
                            ? 'border-nature-forest bg-nature-forest/10'
                            : 'border-gray-200 hover:border-nature-forest/50'
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full ${level.color} mr-3`} />
                          <h4 className="font-semibold text-nature-forest">{level.name}</h4>
                        </div>
                        <p className="text-sm text-nature-earth mb-2">{level.description}</p>
                        <p className="text-xs text-nature-earth font-medium">{level.response}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Number of Animals Spotted *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={reportData.numberOfAnimals}
                      onChange={(e) => setReportData(prev => ({ ...prev, numberOfAnimals: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Number of Witnesses
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={reportData.witnessCount}
                      onChange={(e) => setReportData(prev => ({ ...prev, witnessCount: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Describe Animal Behavior *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reportData.behaviorDescription}
                    onChange={(e) => setReportData(prev => ({ ...prev, behaviorDescription: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="What was the animal doing? Was it aggressive, feeding, moving through, etc.?"
                  />
                </div>
                
                <div className="flex justify-end">
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

            {/* Step 2: Location & Time */}
            {currentStep === 2 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Location & Time Details
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={reportData.reporterName}
                      onChange={(e) => setReportData(prev => ({ ...prev, reporterName: e.target.value }))}
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
                      value={reportData.phone}
                      onChange={(e) => setReportData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Village/Area *
                    </label>
                    <input
                      type="text"
                      required
                      value={reportData.village}
                      onChange={(e) => setReportData(prev => ({ ...prev, village: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Village, Block, District"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Exact Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={reportData.exactLocation}
                      onChange={(e) => setReportData(prev => ({ ...prev, exactLocation: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Near school, forest edge, crop field, etc."
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    GPS Coordinates (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={reportData.gpsCoordinates}
                      onChange={(e) => setReportData(prev => ({ ...prev, gpsCoordinates: e.target.value }))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Auto-filled or enter manually"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={getCurrentLocation}
                      className="px-4 py-3 bg-nature-forest text-white rounded-lg flex items-center"
                    >
                      <Navigation className="h-5 w-5 mr-2" />
                      Get Location
                    </motion.button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Date of Sighting *
                    </label>
                    <input
                      type="date"
                      required
                      value={reportData.sightingDate}
                      onChange={(e) => setReportData(prev => ({ ...prev, sightingDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Time of Sighting *
                    </label>
                    <input
                      type="time"
                      required
                      value={reportData.sightingTime}
                      onChange={(e) => setReportData(prev => ({ ...prev, sightingTime: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Upload Photos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Click to upload photos of the animal or evidence</p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG (Max 10MB each)</p>
                    </label>
                  </div>
                </div>

                <div className="bg-nature-sky/20 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-nature-forest mb-4">Additional Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="previousSightings"
                        checked={reportData.previousSightings}
                        onChange={(e) => setReportData(prev => ({ ...prev, previousSightings: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-nature-forest"
                      />
                      <label htmlFor="previousSightings" className="text-nature-forest">
                        Animals have been spotted in this area before
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="damageReported"
                        checked={reportData.damageReported}
                        onChange={(e) => setReportData(prev => ({ ...prev, damageReported: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-nature-forest"
                      />
                      <label htmlFor="damageReported" className="text-nature-forest">
                        Property or crop damage has occurred
                      </label>
                    </div>
                    
                    {reportData.damageReported && (
                      <div>
                        <label className="block text-sm font-medium text-nature-forest mb-2">
                          Describe the damage
                        </label>
                        <textarea
                          rows={3}
                          value={reportData.damageDescription}
                          onChange={(e) => setReportData(prev => ({ ...prev, damageDescription: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                          placeholder="Describe what was damaged..."
                        />
                      </div>
                    )}
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
                    Review Report
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {currentStep === 3 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  Review & Submit Report
                </h2>
                
                <div className="bg-nature-sky/20 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-nature-forest mb-4">Report Summary</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Reporter:</span>
                        <span className="ml-2 text-nature-earth">{reportData.reporterName}</span>
                      </div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Phone:</span>
                        <span className="ml-2 text-nature-earth">{reportData.phone}</span>
                      </div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Animal:</span>
                        <span className="ml-2 text-nature-earth">
                          {reportData.numberOfAnimals} {wildAnimals.find(a => a.id === reportData.animalType)?.name}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Location:</span>
                        <span className="ml-2 text-nature-earth">{reportData.village} - {reportData.exactLocation}</span>
                      </div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Date & Time:</span>
                        <span className="ml-2 text-nature-earth">{reportData.sightingDate} at {reportData.sightingTime}</span>
                      </div>
                      <div className="mb-3">
                        <span className="font-medium text-nature-forest">Threat Level:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium text-white ${
                          reportData.threatLevel === 'immediate' ? 'bg-red-500' :
                          reportData.threatLevel === 'high' ? 'bg-orange-500' :
                          reportData.threatLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}>
                          {threatLevels.find(t => t.id === reportData.threatLevel)?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {reportData.threatLevel === 'immediate' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                      <div className="text-sm text-red-700">
                        <p className="font-semibold mb-1">Immediate Threat Detected:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Emergency response team will be notified immediately</li>
                          <li>Forest Department will dispatch rapid response unit</li>
                          <li>Local authorities will be alerted for safety measures</li>
                          <li>Keep your phone accessible for follow-up calls</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div className="text-sm text-green-700">
                      <p className="font-semibold mb-1">What happens next:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Your report will be immediately forwarded to Forest Department</li>
                        <li>A tracking number will be provided for follow-up</li>
                        <li>Appropriate response team will be dispatched based on threat level</li>
                        <li>You may receive follow-up calls for additional information</li>
                        <li>Community safety advisories may be issued if necessary</li>
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
                        : reportData.threatLevel === 'immediate' 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
                          : 'bg-gradient-to-r from-nature-forest to-nature-leaf'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Submitting Report...
                      </div>
                    ) : reportData.threatLevel === 'immediate' ? (
                      <div className="flex items-center">
                        <Zap className="h-5 w-5 mr-2" />
                        Submit Emergency Report
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Upload className="h-5 w-5 mr-2" />
                        Submit Wildlife Report
                      </div>
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
