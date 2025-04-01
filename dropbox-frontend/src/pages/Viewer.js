import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Viewer() {
  const { fileName } = useParams();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/files/${fileName}`)
      .then(res => {
        if (res.ok) return res.blob();
        throw new Error('Failed to fetch');
      })
      .then(blob => {
        const ext = fileName.split('.').pop();
        if (["jpg", "png"].includes(ext)) {
          setContent(URL.createObjectURL(blob));
        } else {
          blob.text().then(setContent);
        }
      })
      .catch(e => setError(e.message));
  }, [fileName]);

  if (error) return <div className="p-4">Error: {error}</div>;

  const ext = fileName.split('.').pop();
  if (["jpg", "png"].includes(ext)) {
    return <div className="p-4"><img src={content} alt={fileName} className="max-w-full" /></div>;
  }

  return <div className="p-4 whitespace-pre-wrap">{content || 'Loading...'}</div>;
}

export default Viewer;