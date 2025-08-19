import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  User,
  Heart,
  Calendar,
  MapPin,
  Pill,
  FileText,
  TrendingUp,
  Clock,
  Phone,
  Search,
  Plus,
  Eye,
  Edit,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Users,
  Activity,
  BarChart3,
  Package,
  Car,
  Home,
  Camera,
  Save,
  X
} from 'lucide-react';

// Mock data for demonstration
const recentPatients = [
  {
    id: 'P001',
    animalName: 'Gaumata',
    species: 'Cow',
    ownerName: 'Ram Singh',
    village: 'Jamshedpur',
    phone: '+91 98765 43210',
    lastVisit: '2024-01-15',
    condition: 'Fever',
    status: 'Under Treatment',
    priority: 'medium'
  },
  {
    id: 'P002',
    animalName: 'Bakri',
    species: 'Goat',
    ownerName: 'Sunita Devi',
    village: 'Ranchi',
    phone: '+91 87654 32109',
    lastVisit: '2024-01-14',
    condition: 'Pregnancy Check',
    status: 'Healthy',
    priority: 'low'
  },
  {
    id: 'P003',
    animalName: 'Murgi',
    species: 'Poultry',
    ownerName: 'Arjun Kumar',
    village: 'Dhanbad',
    phone: '+91 76543 21098',
    lastVisit: '2024-01-13',
    condition: 'Vaccination',
    status: 'Completed',
    priority: 'low'
  }
];

const upcomingVisits = [
  {
    id: 'V001',
    farmerName: 'Ravi Mahato',
    village: 'Bokaro Steel City',
    time: '10:00 AM',
    date: '2024-01-16',
    service: 'Routine Checkup',
    animals: 3,
    phone: '+91 98765 12345'
  },
  {
    id: 'V002',
    farmerName: 'Geeta Devi',
    village: 'Jamshedpur',
    time: '2:00 PM',
    date: '2024-01-16',
    service: 'Emergency Visit',
    animals: 1,
    phone: '+91 87654 56789'
  },
  {
    id: 'V003',
    farmerName: 'Santosh Kumar',
    village: 'Ranchi',
    time: '4:00 PM',
    date: '2024-01-17',
    service: 'Vaccination',
    animals: 5,
    phone: '+91 76543 98765'
  }
];

const medicineStock = [
  {
    id: 'M001',
    name: 'Antibiotic Injection',
    category: 'Antibiotics',
    currentStock: 25,
    minRequired: 50,
    unit: 'vials',
    expiry: '2024-06-30',
    status: 'low'
  },
  {
    id: 'M002',
    name: 'Deworming Tablet',
    category: 'Anthelmintics',
    currentStock: 150,
    minRequired: 100,
    unit: 'tablets',
    expiry: '2024-12-31',
    status: 'good'
  },
  {
    id: 'M003',
    name: 'Vitamin B Complex',
    category: 'Vitamins',
    currentStock: 5,
    minRequired: 30,
    unit: 'bottles',
    expiry: '2024-08-15',
    status: 'critical'
  }
];

interface PatientRecord {
  id: string;
  animalName: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  ownerName: string;
  ownerPhone: string;
  village: string;
  address: string;
  visitDate: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  medicines: string[];
  followUp: string;
  notes: string;
  photos: File[];
}

interface MonthlyReportData {
  month: string;
  year: string;
  totalPatients: number;
  totalVisits: number;
  commonDiseases: string[];
  treatmentSuccess: number;
  notes: string;
}

interface MedicineUsageData {
  reportPeriod: string;
  medicinesUsed: Array<{
    medicineName: string;
    quantityUsed: number;
    purpose: string;
  }>;
  totalCost: number;
  recommendations: string;
}

interface FieldVisitData {
  visitDate: string;
  villages: string[];
  totalAnimalsChecked: number;
  vaccinations: number;
  treatments: number;
  emergencies: number;
  feedback: string;
  followUpRequired: boolean;
}

export default function DoctorPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Report modal states
  const [showMonthlyReport, setShowMonthlyReport] = useState(false);
  const [showMedicineUsage, setShowMedicineUsage] = useState(false);
  const [showFieldVisitReport, setShowFieldVisitReport] = useState(false);
  
  const [newPatient, setNewPatient] = useState<PatientRecord>({
    id: '',
    animalName: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    ownerName: '',
    ownerPhone: '',
    village: '',
    address: '',
    visitDate: '',
    symptoms: '',
    diagnosis: '',
    treatment: '',
    medicines: [],
    followUp: '',
    notes: '',
    photos: []
  });

  const [monthlyReportData, setMonthlyReportData] = useState<MonthlyReportData>({
    month: '',
    year: new Date().getFullYear().toString(),
    totalPatients: 0,
    totalVisits: 0,
    commonDiseases: [],
    treatmentSuccess: 0,
    notes: ''
  });

  const [medicineUsageData, setMedicineUsageData] = useState<MedicineUsageData>({
    reportPeriod: '',
    medicinesUsed: [],
    totalCost: 0,
    recommendations: ''
  });

  const [fieldVisitData, setFieldVisitData] = useState<FieldVisitData>({
    visitDate: '',
    villages: [],
    totalAnimalsChecked: 0,
    vaccinations: 0,
    treatments: 0,
    emergencies: 0,
    feedback: '',
    followUpRequired: false
  });

  const stats = [
    { label: 'Patients Today', value: '12', icon: Heart, color: 'text-red-500' },
    { label: 'Total Patients', value: '1,247', icon: Users, color: 'text-blue-500' },
    { label: 'Pending Visits', value: '8', icon: Calendar, color: 'text-orange-500' },
    { label: 'Low Stock Medicines', value: '3', icon: Package, color: 'text-yellow-500' }
  ];

  const handleSavePatient = () => {
    // Here you would typically save to database
    console.log('Saving patient:', newPatient);
    setShowNewPatientForm(false);
    setNewPatient({
      id: '',
      animalName: '',
      species: '',
      breed: '',
      age: '',
      gender: '',
      ownerName: '',
      ownerPhone: '',
      village: '',
      address: '',
      visitDate: '',
      symptoms: '',
      diagnosis: '',
      treatment: '',
      medicines: [],
      followUp: '',
      notes: '',
      photos: []
    });
  };

  const handleGenerateMonthlyReport = () => {
    console.log('Generating monthly report:', monthlyReportData);
    // Here you would typically send to backend/generate PDF
    alert('Monthly report generated successfully!');
    setShowMonthlyReport(false);
  };

  const handleGenerateMedicineUsage = () => {
    console.log('Generating medicine usage report:', medicineUsageData);
    // Here you would typically send to backend/generate PDF
    alert('Medicine usage report generated successfully!');
    setShowMedicineUsage(false);
  };

  const handleGenerateFieldVisit = () => {
    console.log('Generating field visit report:', fieldVisitData);
    // Here you would typically send to backend/generate PDF
    alert('Field visit report generated successfully!');
    setShowFieldVisitReport(false);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-nature-earth text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-nature-forest">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-nature-forest mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowNewPatientForm(true)}
            className="flex flex-col items-center p-4 border-2 border-dashed border-nature-forest/30 rounded-lg hover:border-nature-forest hover:bg-nature-forest/5 transition-all"
          >
            <Plus className="h-8 w-8 text-nature-forest mb-2" />
            <span className="text-sm font-medium text-nature-forest">Add Patient</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <Calendar className="h-8 w-8 text-blue-500 mb-2" />
            <span className="text-sm font-medium text-blue-700">Schedule Visit</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center p-4 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
          >
            <Pill className="h-8 w-8 text-orange-500 mb-2" />
            <span className="text-sm font-medium text-orange-700">Update Stock</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
          >
            <FileText className="h-8 w-8 text-green-500 mb-2" />
            <span className="text-sm font-medium text-green-700">Generate Report</span>
          </motion.button>
        </div>
      </div>

      {/* Recent Patients & Upcoming Visits */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-nature-forest mb-4">Recent Patients</h3>
          <div className="space-y-3">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h4 className="font-semibold text-nature-forest">{patient.animalName} ({patient.species})</h4>
                  <p className="text-sm text-nature-earth">{patient.ownerName} - {patient.village}</p>
                  <p className="text-xs text-nature-earth">{patient.condition}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    patient.priority === 'high' ? 'bg-red-100 text-red-800' :
                    patient.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {patient.status}
                  </div>
                  <p className="text-xs text-nature-earth mt-1">{patient.lastVisit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Visits */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-nature-forest mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {upcomingVisits.map((visit) => (
              <div key={visit.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h4 className="font-semibold text-nature-forest">{visit.farmerName}</h4>
                  <p className="text-sm text-nature-earth">{visit.village}</p>
                  <p className="text-xs text-nature-earth">{visit.service} - {visit.animals} animals</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-nature-forest">{visit.time}</p>
                  <p className="text-xs text-nature-earth">{visit.date}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs bg-nature-forest text-white px-2 py-1 rounded mt-1"
                  >
                    Call
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="space-y-6">
      {/* Search and Add Patient */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowNewPatientForm(true)}
            className="px-6 py-2 bg-gradient-to-r from-nature-forest to-nature-leaf text-white rounded-lg font-semibold flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Patient
          </motion.button>
        </div>
      </div>

      {/* Patients List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-nature-forest/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-nature-forest uppercase tracking-wider">Animal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-nature-forest uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-nature-forest uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-nature-forest uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-nature-forest uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-nature-forest uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-nature-forest">{patient.animalName}</div>
                      <div className="text-sm text-nature-earth">{patient.species} - {patient.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-nature-forest">{patient.ownerName}</div>
                      <div className="text-sm text-nature-earth">{patient.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nature-earth">
                    {patient.village}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nature-earth">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      patient.status === 'Under Treatment' ? 'bg-orange-100 text-orange-800' :
                      patient.status === 'Healthy' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPatient(patient)}
                        className="text-nature-forest hover:text-nature-leaf"
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMedicines = () => (
    <div className="space-y-6">
      {/* Medicine Stock Overview */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-nature-forest mb-4">Medicine Stock Status</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Package className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-700">15</p>
            <p className="text-sm text-green-600">Well Stocked</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-700">5</p>
            <p className="text-sm text-yellow-600">Low Stock</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-700">2</p>
            <p className="text-sm text-red-600">Critical Level</p>
          </div>
        </div>
      </div>

      {/* Medicine Inventory */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-nature-forest">Medicine Inventory</h3>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-gradient-to-r from-nature-forest to-nature-leaf text-white rounded-lg font-semibold"
            >
              <Plus className="h-4 w-4 mr-2 inline" />
              Add Medicine
            </motion.button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {medicineStock.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-nature-forest">{medicine.name}</div>
                    <div className="text-sm text-nature-earth">{medicine.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nature-earth">
                    {medicine.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-nature-forest">
                      {medicine.currentStock} {medicine.unit}
                    </div>
                    <div className="text-sm text-nature-earth">
                      Min: {medicine.minRequired} {medicine.unit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nature-earth">
                    {medicine.expiry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      medicine.status === 'critical' ? 'bg-red-100 text-red-800' :
                      medicine.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {medicine.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-nature-forest hover:text-nature-leaf"
                      >
                        <Edit className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Plus className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Report Generation */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-nature-forest mb-4">Generate Reports</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowMonthlyReport(true)}
            className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
          >
            <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-700">Monthly Report</h4>
            <p className="text-sm text-blue-600">Patient statistics and treatments</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowMedicineUsage(true)}
            className="p-4 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center"
          >
            <Package className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-semibold text-green-700">Medicine Usage</h4>
            <p className="text-sm text-green-600">Stock consumption and requirements</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFieldVisitReport(true)}
            className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-center"
          >
            <MapPin className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-semibold text-purple-700">Field Visit Report</h4>
            <p className="text-sm text-purple-600">Village coverage and activities</p>
          </motion.button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-nature-forest mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            { name: 'January Monthly Report', date: '2024-01-15', type: 'Monthly', status: 'Completed' },
            { name: 'Medicine Stock Report', date: '2024-01-14', type: 'Inventory', status: 'Pending' },
            { name: 'Field Visit Summary', date: '2024-01-13', type: 'Field', status: 'Completed' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <h4 className="font-semibold text-nature-forest">{report.name}</h4>
                <p className="text-sm text-nature-earth">{report.type} - {report.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  report.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.status}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-nature-forest hover:text-nature-leaf"
                >
                  <Download className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-sky/20 via-white to-nature-grass/10 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-nature-forest mb-4">
            Doctor Portal
          </h1>
          <p className="text-xl text-nature-earth max-w-2xl mx-auto">
            Manage patient records, track medicines, and submit field visit reports
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 max-w-2xl mx-auto">
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Activity },
                { id: 'patients', label: 'Patients', icon: Heart },
                { id: 'medicines', label: 'Medicines', icon: Pill },
                { id: 'reports', label: 'Reports', icon: FileText }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-nature-forest text-white'
                      : 'text-nature-forest hover:bg-nature-forest/10'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mb-1" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'patients' && renderPatients()}
          {activeTab === 'medicines' && renderMedicines()}
          {activeTab === 'reports' && renderReports()}
        </motion.div>

        {/* New Patient Form Modal */}
        {showNewPatientForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-nature-forest">Add New Patient</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNewPatientForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Animal Name *
                  </label>
                  <input
                    type="text"
                    value={newPatient.animalName}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, animalName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="Enter animal name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Species *
                  </label>
                  <select
                    value={newPatient.species}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, species: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                  >
                    <option value="">Select Species</option>
                    <option value="Cow">Cow</option>
                    <option value="Buffalo">Buffalo</option>
                    <option value="Goat">Goat</option>
                    <option value="Sheep">Sheep</option>
                    <option value="Poultry">Poultry</option>
                    <option value="Pig">Pig</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    value={newPatient.ownerName}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, ownerName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="Owner's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={newPatient.ownerPhone}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, ownerPhone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Symptoms/Condition *
                  </label>
                  <textarea
                    rows={3}
                    value={newPatient.symptoms}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, symptoms: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="Describe the symptoms or condition..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Treatment Plan
                  </label>
                  <textarea
                    rows={3}
                    value={newPatient.treatment}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, treatment: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="Describe the treatment plan..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowNewPatientForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSavePatient}
                  className="px-6 py-2 bg-gradient-to-r from-nature-forest to-nature-leaf text-white rounded-lg font-semibold"
                >
                  <Save className="h-4 w-4 mr-2 inline" />
                  Save Patient
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Monthly Report Modal */}
        {showMonthlyReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-nature-forest">Generate Monthly Report</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMonthlyReport(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Month *
                    </label>
                    <select
                      value={monthlyReportData.month}
                      onChange={(e) => setMonthlyReportData(prev => ({ ...prev, month: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    >
                      <option value="">Select Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Year *
                    </label>
                    <input
                      type="number"
                      value={monthlyReportData.year}
                      onChange={(e) => setMonthlyReportData(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Total Patients Treated *
                    </label>
                    <input
                      type="number"
                      value={monthlyReportData.totalPatients}
                      onChange={(e) => setMonthlyReportData(prev => ({ ...prev, totalPatients: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Total Village Visits *
                    </label>
                    <input
                      type="number"
                      value={monthlyReportData.totalVisits}
                      onChange={(e) => setMonthlyReportData(prev => ({ ...prev, totalVisits: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Treatment Success Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={monthlyReportData.treatmentSuccess}
                    onChange={(e) => setMonthlyReportData(prev => ({ ...prev, treatmentSuccess: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    rows={4}
                    value={monthlyReportData.notes}
                    onChange={(e) => setMonthlyReportData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="Any additional observations or recommendations..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMonthlyReport(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateMonthlyReport}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold"
                >
                  <Download className="h-4 w-4 mr-2 inline" />
                  Generate Report
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Medicine Usage Report Modal */}
        {showMedicineUsage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-nature-forest">Medicine Usage Report</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMedicineUsage(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Report Period *
                  </label>
                  <select
                    value={medicineUsageData.reportPeriod}
                    onChange={(e) => setMedicineUsageData(prev => ({ ...prev, reportPeriod: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                  >
                    <option value="">Select Period</option>
                    <option value="Last 7 days">Last 7 days</option>
                    <option value="Last 30 days">Last 30 days</option>
                    <option value="Last 3 months">Last 3 months</option>
                    <option value="Last 6 months">Last 6 months</option>
                    <option value="Custom">Custom Period</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Most Used Medicines
                  </label>
                  <div className="space-y-3">
                    {medicineStock.map((medicine) => (
                      <div key={medicine.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-nature-forest">{medicine.name}</h4>
                          <p className="text-sm text-nature-earth">{medicine.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-nature-forest">Used: {Math.floor(Math.random() * 50)} {medicine.unit}</p>
                          <p className="text-sm text-nature-earth">Remaining: {medicine.currentStock} {medicine.unit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Total Medicine Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={medicineUsageData.totalCost}
                    onChange={(e) => setMedicineUsageData(prev => ({ ...prev, totalCost: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="Enter total cost"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Stock Recommendations
                  </label>
                  <textarea
                    rows={4}
                    value={medicineUsageData.recommendations}
                    onChange={(e) => setMedicineUsageData(prev => ({ ...prev, recommendations: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="Recommendations for future medicine requirements..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMedicineUsage(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateMedicineUsage}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold"
                >
                  <Download className="h-4 w-4 mr-2 inline" />
                  Generate Report
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Field Visit Report Modal */}
        {showFieldVisitReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-nature-forest">Field Visit Report</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFieldVisitReport(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Visit Date *
                    </label>
                    <input
                      type="date"
                      value={fieldVisitData.visitDate}
                      onChange={(e) => setFieldVisitData(prev => ({ ...prev, visitDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Villages Visited *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter village names (comma separated)"
                      onChange={(e) => setFieldVisitData(prev => ({
                        ...prev,
                        villages: e.target.value.split(',').map(v => v.trim()).filter(v => v)
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Total Animals Checked
                    </label>
                    <input
                      type="number"
                      value={fieldVisitData.totalAnimalsChecked}
                      onChange={(e) => setFieldVisitData(prev => ({ ...prev, totalAnimalsChecked: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Vaccinations Given
                    </label>
                    <input
                      type="number"
                      value={fieldVisitData.vaccinations}
                      onChange={(e) => setFieldVisitData(prev => ({ ...prev, vaccinations: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Treatments Provided
                    </label>
                    <input
                      type="number"
                      value={fieldVisitData.treatments}
                      onChange={(e) => setFieldVisitData(prev => ({ ...prev, treatments: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-nature-forest mb-2">
                      Emergency Cases
                    </label>
                    <input
                      type="number"
                      value={fieldVisitData.emergencies}
                      onChange={(e) => setFieldVisitData(prev => ({ ...prev, emergencies: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-nature-forest mb-2">
                    Community Feedback & Observations
                  </label>
                  <textarea
                    rows={4}
                    value={fieldVisitData.feedback}
                    onChange={(e) => setFieldVisitData(prev => ({ ...prev, feedback: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-forest focus:border-transparent"
                    placeholder="Describe community response, concerns, and observations..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="followUpRequired"
                    checked={fieldVisitData.followUpRequired}
                    onChange={(e) => setFieldVisitData(prev => ({ ...prev, followUpRequired: e.target.checked }))}
                    className="mr-3 h-4 w-4 text-nature-forest"
                  />
                  <label htmlFor="followUpRequired" className="text-nature-forest font-medium">
                    Follow-up visit required
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFieldVisitReport(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateFieldVisit}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold"
                >
                  <Download className="h-4 w-4 mr-2 inline" />
                  Generate Report
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
