import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/files').then(res => setFiles(res.data)).catch(console.error);
  }, []);

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    axios.post('/api/files/upload', formData)
      .then(() => window.location.reload())
      .catch(err => alert(err.response?.data || 'Upload failed'));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dropbox Clone</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-2" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>

      <h2 className="mt-6 font-semibold">Uploaded Files:</h2>
      <ul className="mt-2">
        {files.map((f) => (
          <li
            key={f.fileName}
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate(`/view/${f.fileName}`)}
          >
            {f.fileName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;