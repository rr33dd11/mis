import { LoginPage } from '../pages/loginPage/loginPage';
import { ProfilePage } from '../pages/profilePage/profilePage';
import { RegistationPage } from '../pages/registrationPage/registrationPage';
import { PatientsPage } from '../pages/patientsPage/PatientsPage';
import { PatientPage } from '../pages/patientPage/PatientPage';
import { ConsultationPage } from '../pages/consultationsPage/consultationPage';
import { CreateInspectionPage } from '../pages/createInspectionPage/createInspectionPage';
import { DetailsPage } from '../pages/detailsPage/detailsPage';
import { ReportsPage } from '../pages/reportsPage/reportsPage';
import { Page404 } from '../pages/notFoundPage/notFound';

export const router = new Navigo('/');

router.on('/', () => {});
router.on('/login', () => LoginPage())
router.on('/registration', () => RegistationPage())
router.on('/profile', () => ProfilePage())
router.on('/patients', () => PatientsPage())
router.on('/patient/:id', (params) => PatientPage(params))
router.on('/consultations', () => ConsultationPage())
router.on('/inspection/create', () => CreateInspectionPage())
router.on('/inspection/:id', (params) => DetailsPage(params))
router.on('/reports', () => ReportsPage())
router.notFound(() => Page404());

router.resolve();