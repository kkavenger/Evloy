import { useState } from "react";
import axios from 'axios';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [searchVolume, setSearchVolume] = useState(null);
  const [showSearchVolume, setShowSearchVolume] = useState(false);

  const handleSearch = async () => {
    try {
      await axios.post('/api/search', { keyword });
      const response = await axios.get(`/api/searchVolume/${keyword}`);
      setSearchVolume(response.data.searchVolume);
      setShowSearchVolume(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
    setShowSearchVolume(false); 
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">Etsy</h1>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={handleInputChange}
          className="border p-2 flex-1 rounded-lg"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
      {showSearchVolume && keyword !== '' && searchVolume !== null && (
        <p className="mt-4 text-gray-800">
          Search volume for <span className="font-semibold">&ldquo;{keyword}&rdquo;</span> in {new Date().toLocaleString('en-US', { month: 'long' })}: {searchVolume}
        </p>
      )}
    </div>
  )
}
