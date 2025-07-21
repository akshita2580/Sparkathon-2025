const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const {storage} = require('../utils/gridfs')
const Return = require('../models/Return');

const router = express.Router();
const upload = multer({ storage });

// router.post('/returns', upload.array('images', 3), async (req, res) => {
//   try {
//     console.log('✅ Upload route hit');
//     console.log("📥 Incoming files:", req.files);
//     console.log("📄 Body:", req.body);
//     const { name, brand, category, purchaseDate, reason, condition } = req.body;

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: 'No images uploaded' });
//     }
    
//     const imageIds = req.files.map(file => {
//       const id = file.id || file._id || file.filename;
//       if (!id) {
//         throw new Error('Uploaded file is missing an ID.');
//       }
//       return id.toString();
//     });
    
//     console.log("🆔 Saved Image IDs:", imageIds);

//     const imageUrls = imageIds.map(id => `/api/image/${id}`);

//     const newReturn = new Return({
//       userId: new mongoose.Types.ObjectId(),
//       product: { name, brand, category, purchaseDate },
//       reason,
//       condition,
//       imageIds,
// //      suggestion: "",

//       status: "pending"

//     });
//     console.log("🟢 Received return form submission");
// console.log("body:", req.body);
// console.log("files:", req.files || req.file);

//    const saved = await newReturn.save();

//     res.status(201).json({
//       message: 'Return submitted successfully',
//       return: saved,
//       imageUrls: imageUrls, // ✅ Add this to use in frontend
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Return submission failed' });
//   }
// });

module.exports = router;
