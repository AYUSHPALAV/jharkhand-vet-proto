import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  IndianRupee,
  Upload,
  CheckCircle,
  AlertCircle,
  User,
  Home,
  Heart,
  Users,
  TrendingUp,
  Shield,
  Calendar,
  Phone,
  MapPin,
  Download,
  Eye,
  Clock,
  Award,
  BookOpen,
  Camera
} from 'lucide-react';

const schemeCategories = [
  {
    id: 'livestock-development',
    name: 'Livestock Development',
    description: 'Schemes for improving livestock breeds and productivity',
    icon: Heart,
    color: 'from-blue-500 to-blue-600',
    schemes: [
      {
        id: 'breed-improvement',
        name: 'Breed Improvement Program',
        subsidy: '₹50,000',
        description: 'Financial assistance for purchasing high-quality breeding animals',
        eligibility: ['Small/Marginal farmer', 'Minimum 2 animals', 'Valid Aadhaar'],
        benefits: ['50% subsidy on purchase', 'Free veterinary care for 1 year', 'Training support'],
        documents: ['Aadhaar Card', 'Land Records', 'Bank Details', 'Farmer Certificate']
      },
      {
        id: 'dairy-development',
        name: 'Dairy Development Scheme',
        subsidy: '₹1,00,000',
        description: 'Support for establishing small dairy units',
        eligibility: ['Rural resident', 'Experience in animal husbandry', 'Land ownership'],
        benefits: ['Equipment subsidy', 'Training program', 'Market linkage'],
        documents: ['Land Certificate', 'Aadhaar Card', 'Bank Statement', 'Project Report']
      }
    ]
  },
  {
    id: 'poultry-fishery',
    name: 'Poultry & Fishery',
    description: 'Support for poultry farming and fish cultivation',
    icon: Users,
    color: 'from-green-500 to-green-600',
    schemes: [
      {
        id: 'backyard-poultry',
        name: 'Backyard Poultry Development',
        subsidy: '₹25,000',
        description: 'Assistance for small-scale poultry farming',
        eligibility: ['Rural women preferred', 'Backyard space available', 'BPL/APL status'],
        benefits: ['Free birds and feed', 'Training and support', 'Vaccination coverage'],
        documents: ['Aadhaar Card', 'Ration Card', 'Bank Details', 'Address Proof']
      },
      {
        id: 'fish-farming',
        name: 'Integrated Fish Farming',
        subsidy: '₹75,000',
        description: 'Support for fish pond development and management',
        eligibility: ['Pond/water body ownership', 'Minimum 0.5 acre', 'Training completion'],
        benefits: ['Pond construction subsidy', 'Fish seed and feed', 'Technical guidance'],
        documents: ['Land Records', 'Water Rights', 'Bank Details', 'Training Certificate']
      }
    ]
  },
  {
    id: 'insurance-credit',
    name: 'Insurance & Credit',
    description: 'Insurance coverage and credit facilities for livestock',
    icon: Shield,
    color: 'from-purple-500 to-purple-600',
    schemes: [
      {
        id: 'livestock-insurance',
        name: 'Livestock Insurance Scheme',
        subsidy: '₹10,000',
        description: 'Insurance coverage for livestock against disease and death',
        eligibility: ['Livestock owner', 'Healthy animals', 'Age limit compliance'],
        benefits: ['Full insurance coverage', 'Premium subsidy', 'Quick claim settlement'],
        documents: ['Animal Health Certificate', 'Aadhaar Card', 'Bank Details', 'Photo of Animals']
      },
      {
        id: 'kisan-credit',
        name: 'Kisan Credit Card',
        subsidy: '₹2,00,000',
        description: 'Credit facility for agricultural and allied activities',
        eligibility: ['Farmer/livestock owner', 'Good credit history', 'Valid KYC'],
        benefits: ['Low interest rate', 'Flexible repayment', 'No collateral required'],
        documents: ['Aadhaar Card', 'PAN Card', 'Land Records', 'Income Certificate']
      }
    ]
  }
];

interface ApplicationData {
  // Personal Information
  applicantName: string;
  fatherName: string;
  aadhaarNumber: string;
  phone: string;
  email: string;
  
  // Address
  village: string;
  block: string;
  district: string;
  pincode: string;
  
  // Scheme Details
  selectedScheme: string;
  projectCost: number;
  requestedAmount: number;
  
  // Livestock Details
  animalType: string;
  currentAnimals: number;
  proposedAnimals: number;
  experience: string;
  
  // Documents
  documents: File[];
  
  // Bank Details
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  
  // Additional Info
  hasLand: boolean;
  landArea: number;
  previousScheme: boolean;
  category: string;
}

export default function ApplySchemes() {
  const [currentView, setCurrentView] = useState<'browse' | 'apply' | 'track'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    applicantName: '',
    fatherName: '',
    aadhaarNumber: '',
    phone: '',
    email: '',
    village: '',
    block: '',
    district: '',
    pincode: '',
    selectedScheme: '',
    projectCost: 0,
    requestedAmount: 0,
    animalType: '',
    currentAnimals: 0,
    proposedAnimals: 0,
    experience: '',
    documents: [],
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    hasLand: false,
    landArea: 0,
    previousScheme: false,
    category: 'general'
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApply = (scheme: any) => {
    setSelectedScheme(scheme);
    setApplicationData(prev => ({ ...prev, selectedScheme: scheme.id }));
    setCurrentView('apply');
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSubmitted(true);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Browse Schemes View
  if (currentView === 'browse') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-nature-sky/20 via-white to-nature-grass/10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-nature-forest mb-4">
              Government Livestock Schemes
            </h1>
            <p className="text-xl text-nature-earth max-w-3xl mx-auto mb-8">
              Explore various government schemes and subsidies available for livestock development, 
              poultry farming, and agricultural credit facilities.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('track')}
                className="px-6 py-3 bg-gradient-to-r from-nature-forest to-nature-leaf text-white rounded-xl font-semibold shadow-lg"
              >
                <Clock className="inline-block w-5 h-5 mr-2" />
                Track Application
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white border-2 border-nature-forest text-nature-forest rounded-xl font-semibold shadow-lg hover:bg-nature-forest hover:text-white transition-all"
              >
                <Download className="inline-block w-5 h-5 mr-2" />
                Download Guidelines
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Active Schemes', value: '12+', icon: Award },
              { label: 'Applications Processed', value: '15,000+', icon: FileText },
              { label: 'Subsidies Disbursed', value: '₹50 Cr+', icon: IndianRupee },
              { label: 'Beneficiaries', value: '8,500+', icon: Users }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <div className="inline-flex p-3 bg-nature-forest/10 rounded-full mb-3">
                  <stat.icon className="h-6 w-6 text-nature-forest" />
                </div>
                <div className="text-2xl font-bold text-nature-forest">{stat.value}</div>
                <div className="text-nature-earth">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Scheme Categories */}
          <div className="space-y-8">
            {schemeCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <div className="flex items-center">
                    <category.icon className="h-8 w-8 mr-4" />
                    <div>
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                      <p className="text-white/90">{category.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.schemes.map((scheme, schemeIndex) => (
                      <motion.div
                        key={scheme.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (categoryIndex * 0.2) + (schemeIndex * 0.1) }}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-nature-forest">{scheme.name}</h3>
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {scheme.subsidy}
                          </div>
                        </div>
                        
                        <p className="text-nature-earth mb-4">{scheme.description}</p>
                        
                        <div className="space-y-3 mb-6">
                          <div>
                            <h4 className="font-semibold text-nature-forest mb-2">Eligibility:</h4>
                            <ul className="text-sm text-nature-earth space-y-1">
                              {scheme.eligibility.map((item, i) => (
                                <li key={i} className="flex items-center">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-nature-forest mb-2">Benefits:</h4>
                            <ul className="text-sm text-nature-earth space-y-1">
                              {scheme.benefits.map((item, i) => (
                                <li key={i} className="flex items-center">
                                  <Award className="h-4 w-4 text-blue-500 mr-2" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleApply(scheme)}
                            className={`flex-1 py-3 px-4 bg-gradient-to-r ${category.color} text-white rounded-lg font-semibold transition-all`}
                          >
                            Apply Now
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-3 border border-gray-300 rounded-lg text-nature-forest hover:bg-gray-50 transition-all"
                          >
                            <Eye className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Track Application View
  if (currentView === 'track') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-nature-sky/20 via-white to-nature-grass/10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-nature-forest mb-4">Track Application</h1>
              <p className="text-xl text-nature-earth">Check the status of your scheme application</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-nature-forest mb-2">
                  Application ID
                </label>
                <input
                  type="text"
                  placeholder="Enter your application ID (e.g., SCH-123456)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-nature-forest mb-2">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your Aadhaar number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-nature-forest to-nature-leaf text-white py-3 rounded-xl font-semibold mb-6"
              >
                Track Status
              </motion.button>
              
              <div className="border-t pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentView('browse')}
                  className="w-full border border-nature-forest text-nature-forest py-3 rounded-xl font-semibold hover:bg-nature-forest hover:text-white transition-all"
                >
                  Back to Schemes
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Application Form View
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
          <h2 className="text-2xl font-bold text-nature-forest mb-4">Application Submitted!</h2>
          <p className="text-nature-earth mb-6">
            Your scheme application has been successfully submitted. You will receive updates via SMS and email.
          </p>
          <div className="bg-nature-sky/20 rounded-lg p-4 mb-6">
            <p className="font-semibold text-nature-forest">Application ID: SCH-{Date.now()}</p>
            <p className="text-sm text-nature-earth mt-1">Processing time: 15-30 working days</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSubmitted(false);
              setCurrentView('browse');
              setCurrentStep(1);
            }}
            className="w-full bg-gradient-to-r from-nature-forest to-nature-leaf text-white py-3 rounded-xl font-semibold"
          >
            Apply for Another Scheme
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
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-nature-forest mb-4">
            Apply for {selectedScheme?.name}
          </h1>
          <p className="text-xl text-nature-earth max-w-2xl mx-auto">
            Complete the application form to apply for this government scheme
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
            <span>Personal Details</span>
            <span>Project Details</span>
            <span>Documents</span>
            <span>Review & Submit</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
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
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.applicantName}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, applicantName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Father's Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.fatherName}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, fatherName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Enter father's name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Aadhaar Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.aadhaarNumber}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, aadhaarNumber: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="XXXX XXXX XXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicationData.phone}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={applicationData.email}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-nature-forest mt-8 mb-4 flex items-center">
                  <Home className="h-5 w-5 mr-2" />
                  Address Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Village *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.village}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, village: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Village name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Block *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.block}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, block: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Block name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      District *
                    </label>
                    <select
                      required
                      value={applicationData.district}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, district: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    >
                      <option value="">Select District</option>
                      <option value="ranchi">Ranchi</option>
                      <option value="jamshedpur">Jamshedpur</option>
                      <option value="dhanbad">Dhanbad</option>
                      <option value="bokaro">Bokaro</option>
                      <option value="deoghar">Deoghar</option>
                      <option value="hazaribagh">Hazaribagh</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.pincode}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, pincode: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="6-digit PIN code"
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

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  Project & Financial Details
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Total Project Cost *
                    </label>
                    <input
                      type="number"
                      required
                      value={applicationData.projectCost}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, projectCost: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Enter amount in ₹"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Requested Subsidy Amount *
                    </label>
                    <input
                      type="number"
                      required
                      value={applicationData.requestedAmount}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, requestedAmount: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Maximum: ₹50,000"
                    />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-nature-forest mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Livestock Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Type of Animals *
                    </label>
                    <select
                      required
                      value={applicationData.animalType}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, animalType: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    >
                      <option value="">Select Animal Type</option>
                      <option value="cattle">Cattle (Cow/Bull/Buffalo)</option>
                      <option value="goat">Goat</option>
                      <option value="sheep">Sheep</option>
                      <option value="poultry">Poultry</option>
                      <option value="pig">Pig</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Current Number of Animals
                    </label>
                    <input
                      type="number"
                      value={applicationData.currentAnimals}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, currentAnimals: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Proposed Number of Animals *
                    </label>
                    <input
                      type="number"
                      required
                      value={applicationData.proposedAnimals}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, proposedAnimals: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Experience in Animal Husbandry *
                    </label>
                    <select
                      required
                      value={applicationData.experience}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    >
                      <option value="">Select Experience</option>
                      <option value="new">New (No experience)</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">More than 5 years</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-nature-sky/20 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-nature-forest mb-4">Additional Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasLand"
                        checked={applicationData.hasLand}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, hasLand: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-nature-forest"
                      />
                      <label htmlFor="hasLand" className="text-nature-forest">
                        I own agricultural land
                      </label>
                    </div>
                    
                    {applicationData.hasLand && (
                      <div>
                        <label className="block text-sm font-semibold text-nature-forest mb-2">
                          Land Area (in acres)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={applicationData.landArea}
                          onChange={(e) => setApplicationData(prev => ({ ...prev, landArea: parseFloat(e.target.value) }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                          placeholder="e.g., 2.5"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="previousScheme"
                        checked={applicationData.previousScheme}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, previousScheme: e.target.checked }))}
                        className="mr-3 h-4 w-4 text-nature-forest"
                      />
                      <label htmlFor="previousScheme" className="text-nature-forest">
                        I have previously availed government schemes
                      </label>
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
                    Next Step
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center">
                  <Upload className="h-6 w-6 mr-2" />
                  Required Documents
                </h2>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div className="text-sm text-yellow-700">
                      <p className="font-semibold mb-1">Document Requirements:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>All documents should be clear and legible</li>
                        <li>Upload in PDF, JPG, or PNG format (Max 5MB each)</li>
                        <li>Self-attested copies are acceptable</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {selectedScheme?.documents.map((doc: string, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-nature-forest">{doc}</h4>
                        <span className="text-red-500 text-sm">Required</span>
                      </div>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id={`doc-${index}`}
                        />
                        <label
                          htmlFor={`doc-${index}`}
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Camera className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-gray-500">Click to upload {doc}</span>
                          <span className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-nature-forest mt-8 mb-4">Bank Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.bankName}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, bankName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Bank name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.accountNumber}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, accountNumber: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="Account number"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      IFSC Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.ifscCode}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, ifscCode: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="IFSC Code"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
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
                    Review Application
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-nature-forest mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  Review & Submit Application
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-nature-sky/20 rounded-lg p-6">
                    <h3 className="font-semibold text-nature-forest mb-4">Application Summary</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-nature-forest">Scheme:</span>
                        <span className="ml-2 text-nature-earth">{selectedScheme?.name}</span>
                      </div>
                      <div>
                        <span className="font-medium text-nature-forest">Applicant:</span>
                        <span className="ml-2 text-nature-earth">{applicationData.applicantName}</span>
                      </div>
                      <div>
                        <span className="font-medium text-nature-forest">Project Cost:</span>
                        <span className="ml-2 text-nature-earth">₹{applicationData.projectCost.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="font-medium text-nature-forest">Requested Amount:</span>
                        <span className="ml-2 text-nature-earth">₹{applicationData.requestedAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <div className="text-sm text-green-700">
                        <p className="font-semibold mb-1">Next Steps:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Application will be verified within 7 working days</li>
                          <li>Site inspection may be conducted if required</li>
                          <li>Approval notification via SMS and email</li>
                          <li>Subsidy amount will be credited to your bank account</li>
                        </ul>
                      </div>
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
                        Submitting...
                      </div>
                    ) : (
                      'Submit Application'
                    )}
                  </motion.button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
