// utils/gridFs.js
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path'); // ✅ Add this line

const mongoURI = process.env.MONGODB_URI;

const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
let gridfsBucket;

conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log('✅ GridFS initialized');
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: `image-${Date.now()}${path.extname(file.originalname)}`,
      bucketName: 'uploads',
      metadata: {
        originalname: file.originalname,
      },
      contentType: file.mimetype, // ✅ Optional: store mimetype
    };
  }  
});


module.exports = {
  getGFS: () => gfs,
  getGridFSBucket: () => gridfsBucket,
  storage,
};
