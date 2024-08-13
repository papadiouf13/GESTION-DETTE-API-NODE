import multer from 'multer';
import path from 'path';

// Configurez l'emplacement de stockage et les options de nom de fichier
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images'); // Répertoire où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique basé sur la date
  }
});

// Initialisez multer avec la configuration
const upload = multer({ storage: storage });

export default upload;
