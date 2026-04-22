import express from 'express';
import { NodeSSH } from 'node-ssh';


import { TodoModule, } from './module/todoModule.js';
import { connectDB } from './db/db.js';
import axios from 'axios';

const app = express();
app.use(express.json())
const ssh = new NodeSSH();
connectDB()


app.post("/todo", async (req, res) => {
  try {

   let data=  await TodoModule.create(req.body)

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/',(req,res)=>{
    res.send('hello')
})
const UPLOAD_DIR = "./uploads";
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

// storage config (save file in /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// upload API
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file received" });
    }

    console.log("File received:", req.file);

    res.json({
      success: true,
      message: "File uploaded successfully",
      file: {
        originalName: req.file.originalname,
        savedName: req.file.filename,
        path: req.file.path,
        size: req.file.size,
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// serve uploaded files (optional)
app.use("/files", express.static(UPLOAD_DIR));

// health check
app.get("/", (req, res) => {
  res.send("Upload server running 🚀");
});

app.listen(5000, () => {
  console.log('Working on http://localhost:4000');
});