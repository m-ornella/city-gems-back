import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.resolve(__dirname, '../src/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only image files are allowed!') as any, false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024 // 5 MB
};

export const upload = multer({ storage, fileFilter, limits });
