import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

const searchSchema = new mongoose.Schema({
    keyword: String,
    timestamp: { type: Date, default: Date.now },
  });
  
const SearchEntry = mongoose.model('SearchEntry', searchSchema);

const app = express();

app.use(express.json());

app.post('/api/search', async (req, res) => {
    const { keyword } = req.body;
  
    try {
      const newSearch = new SearchEntry({ keyword });
      await newSearch.save();
      res.status(201).json({ message: 'Search saved successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
app.get('/api/searchVolume/:keyword', async (req, res) => {
    const { keyword } = req.params;
  
    try {
      const searchVolume = await SearchEntry.countDocuments({ keyword });
      res.json({ keyword, searchVolume });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(5000, () => {
    console.log("Server listening on port 5000");
})