import { Router } from 'express';
import upload from '../utils/upload.js';
import { uploadFile, getFile } from '../controllers/fileController.js';

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/file/:fileId', getFile);

export default router;
