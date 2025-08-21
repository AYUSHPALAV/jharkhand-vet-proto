# Jharkhand Veterinary Services Platform

A comprehensive digital platform for veterinary services in Jharkhand, connecting rural communities with professional veterinary care through modern technology.

## Features

### Core Services
- **Health Report System**: Report animal health issues with photo uploads and GPS location
- **Appointment Booking**: Schedule veterinary visits with mobile clinic support
- **Government Schemes**: Apply for livestock subsidies and financial assistance programs
- **Wildlife Reporting**: Report wild animal sightings to Forest Department for safety

### Key Capabilities
- **Multilingual Support**: English, Hindi, Santali, and Mundari languages
- **Real-time Notifications**: SMS, email, and push notifications
- **Emergency Response**: Immediate alerts for critical situations
- **Doctor Portal**: Veterinarian dashboard for managing cases
- **Mobile-First Design**: Optimized for rural connectivity

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router 6** for navigation
- **React Query** for data fetching
- **Three.js** for 3D farm scene

### Backend
- **Node.js** with Express
- **PostgreSQL** database
- **RESTful API** architecture
- **Real-time notifications**
- **File upload support**

### Infrastructure
- **Vite** for development and building
- **Docker** support for deployment
- **Netlify/Vercel** deployment ready
- **Environment-based configuration**

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jharkhand-veterinary-services
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and API keys
   ```

4. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb jharkhand_vet
   
   # The schema will be automatically initialized on first run
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:8080`

## Database Schema

The platform uses a comprehensive PostgreSQL schema with the following main tables:

- **users**: User accounts and profiles
- **health_reports**: Animal health issue reports
- **appointments**: Veterinary appointment bookings
- **schemes**: Government scheme information
- **scheme_applications**: Scheme applications
- **wildlife_sightings**: Wildlife sighting reports
- **doctors**: Veterinarian profiles
- **notifications**: System notifications
- **animal_types**: Reference data for animal types

## API Endpoints

### Health Reports
- `POST /api/health-reports` - Create health report
- `GET /api/health-reports` - Get health reports
- `PUT /api/health-reports/:reportId` - Update report status

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - Get appointments
- `PUT /api/appointments/:bookingId` - Update appointment

### Schemes
- `POST /api/scheme-applications` - Apply for scheme
- `GET /api/schemes` - Get available schemes
- `GET /api/scheme-applications` - Get applications
- `POST /api/scheme-applications/track` - Track application

### Wildlife
- `POST /api/wildlife-sightings` - Report wildlife sighting
- `GET /api/wildlife-sightings` - Get sightings
- `PUT /api/wildlife-sightings/:reportId` - Update sighting

### Language & Localization
- `GET /api/translations` - Get translations
- `PUT /api/user-language` - Update user language
- `GET /api/localized/schemes` - Get localized schemes

## Multilingual Support

The platform supports four languages:
- **English (en)**: Default language
- **Hindi (hi)**: हिंदी
- **Santali (sat)**: ᱥᱟᱱᱛᱟᱲᱤ
- **Mundari (mun)**: ᱢᱩᱱᱰᱟᱨᱤ

### Adding New Languages

1. Create translation file in `server/translations/{language}.json`
2. Add language to the `languages` array in `client/hooks/useLanguage.tsx`
3. Update database schema to include new language columns
4. Test all UI components with the new language

## Deployment

### Environment Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Set up SMS/Email services for notifications
4. Configure file upload storage

### Build and Deploy
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Docker Deployment
```bash
# Build Docker image
docker build -t jharkhand-vet .

# Run container
docker run -p 3000:3000 --env-file .env jharkhand-vet
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Security Considerations

- Input validation on all forms
- SQL injection prevention
- File upload restrictions
- Rate limiting on API endpoints
- Secure session management
- HTTPS enforcement in production

## Performance Optimization

- Database indexing for frequently queried fields
- Image optimization and compression
- Lazy loading for large datasets
- Caching for static content
- Connection pooling for database

## Monitoring and Logging

- Application performance monitoring
- Error tracking and reporting
- Database query performance
- User activity analytics
- System health checks

## Support

For technical support or questions:
- Email: support@jharkhandvet.gov.in
- Phone: 1800-XXX-XXXX
- Documentation: [Link to docs]

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Government of Jharkhand
- Department of Animal Husbandry
- Forest Department
- Rural communities of Jharkhand