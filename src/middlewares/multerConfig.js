const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype); 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); 

    if (mimetype && extname) {
      return cb(null, true); 
    } else {
      cb(new Error('Apenas arquivos de imagem são permitidos!')); 
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, 
});


const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = { upload, handleMulterError };