const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const {GridFsStorage} = require('multer-gridfs-storage');
const Return = require('./models/Return');
const { GridFSBucket } = require('mongodb');
const mongoDBconnection = require('./db');

dotenv.config();

const app = express();
//const mongoURI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
mongoDBconnection();


//GridFS Setup


// 🔥 Import your images route
const imageRoutes = require('./routes/images');
// 🔌 Use your route under /api
app.use('/api', imageRoutes);  // Now /api/returns is active

// ✅ Use your returns route (routes/returns.js)
const returnsRoute = require('./routes/returns');
app.use('/api', returnsRoute); // Handles POST /api/returns


// Routes
app.get('/api/image/:id', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    const fileId = new mongoose.Types.ObjectId(req.params.id);

    // First: Find the file metadata from the files collection
    const files = await db.collection('uploads.files').find({ _id: fileId }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const file = files[0];

    // Set correct content type
    res.set('Content-Type', file.contentType || 'application/octet-stream');
    res.set('Content-Disposition', `inline; filename="${file.filename}"`);

    // Stream the actual file
    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);
  } catch (err) {
    console.error('❌ Image fetch error:', err);
    res.status(500).json({ error: 'Image fetch failed' });
  }
});

app.get('/', (req, res) => {
  res.send('🚀 EcoSort Backend is running');
});

/*
app.get('/api/add-mock', async (req, res) => {
    try{
      await Return.insertMany([
        {
            userId: new mongoose.Types.ObjectId(),
            product: {
                name: "Mixer Grinder",
                brand: 'Conken',
                category: 'Appliances',
                purchaseDate: '2024-01-15'
            },
            reason: 'Defective/Broken',
            condition: 'broken',
            imageIds: [
            'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=300'
            ],
      },
      {
        userId: new mongoose.Types.ObjectId(),
        product: {
          name: 'Mixer Grinder',
          brand: 'KitchenAid',
          category: 'Appliances',
          purchaseDate: '2024-02-01'
        },
        reason: 'Poor Quality',
        condition: 'broken',
        imageIds: [
            'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300',
        ],
      },
      {
        userId: new mongoose.Types.ObjectId(),
        product: {
          name: 'Coffee Maker',
          brand: 'Breville',
          category: 'Appliances',
          purchaseDate: '2024-01-10'
        },
        reason: 'No Longer Needed',
        condition: 'new',
        imageIds: [
          'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=300'
        ],
      },
      {
        userId: new mongoose.Types.ObjectId(),
        product: {
          name: 'Bluetooth Speaker',
          brand: 'JBL',
          category: 'Electronics',
          purchaseDate: '2024-02-10'
        },
        reason: 'Defective/Broken',
        condition: 'damaged',
        imageIds: [
          'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300'
        ],
        },
     ]);
     res.send('✅ Mock data inserted');
    } catch (err) {
      console.error(err);
      res.status(500).send('❌ Failed to insert mock data');
    }
  });
*/
//     res.json(mock);
//   });

// Start server
mongoDBconnection().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT || 5000}`);
  });
});

