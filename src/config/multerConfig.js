import multer from 'multer';
import path from 'path';

// Define the storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be uploaded
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each file
    cb(null, Date.now() + path.extname(file.originalname)); // Add file extension
  },
});

// Initialize multer with the storage engine and file filter
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type, only JPEG, JPG, PNG, and GIF are allowed.'));
  },
});

export default upload;
