import express from 'express';
import { generate } from '../controllers/generateController.js';

const router = express.Router();

// POST /api/generate/
router.post('/', generate);

export default router;
