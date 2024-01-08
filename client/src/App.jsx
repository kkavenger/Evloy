import { useState } from "react";
// import axios from 'axios';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [searchVolume, setSearchVolume] = useState(null);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Keyword Search Volume</h1>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 flex-1"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
      {searchVolume !== null && (
        <p className="mt-4">
          Search volume for `{keyword}`: {searchVolume}
        </p>
      )}
    </div>
  )
}
