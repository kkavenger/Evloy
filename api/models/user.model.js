import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
    keyword: String,
    timestamp: { type: Date, default: Date.now },
});

const user = mongoose.model('Search', searchSchema);

export default user;