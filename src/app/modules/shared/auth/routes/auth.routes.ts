import express from 'express';
import { AuthController } from '../controller/auth.controller';

const router = express.Router();

router.post('/create-organization', AuthController.createOrganization);

export const AuthRoutes = router;
