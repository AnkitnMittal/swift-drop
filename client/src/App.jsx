import { useState, useRef } from 'react';
import { uploadFile } from './services/api';

function App() {
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef(null);

  // Function to trigger the hidden file input click event
  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Function to handle file selection, validation, and upload
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 10MB limit. Please choose a smaller file.');
      e.target.value = null;
      return;
    }

    setFileName(selectedFile.name);
    setErrorMessage('');
    setResult('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', selectedFile.name);
      data.append('file', selectedFile);

      const response = await uploadFile(data);
      setResult(response.path);
    } catch (error) {
      setErrorMessage(error.message || 'Error uploading file. Please try again.');
    } finally {
      setLoading(false);
      e.target.value = null;
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-50'>
      <div className='bg-white overflow-hidden rounded-xl shadow-md flex w-full max-w-md mx-4'>
        <div className='flex flex-col justify-center items-center p-10 w-full'>
          <h1 className='text-3xl font-semibold text-[#445A6F] mb-2 text-center'>
            SwiftDrop File Sharing
          </h1>
          <p className='text-gray-500 mb-8 text-center'>Upload & share the download link</p>

          {/* Upload Button */}
          <button
            onClick={onUploadClick}
            disabled={loading}
            className='w-48 h-12 rounded-md bg-[#445A6F] hover:bg-[#344759] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-white text-lg font-medium shadow-sm'
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </button>

          {/* Hidden File Input */}
          <input type='file' ref={fileInputRef} className='hidden' onChange={handleFileChange} />

          {/* Display File Name */}
          {fileName && !errorMessage && !loading && (
            <p className='text-sm text-gray-500 mt-4'>Uploaded: {fileName}</p>
          )}

          {/* Display Error Message */}
          {errorMessage && (
            <p className='text-red-500 text-sm mt-4 text-center font-medium'>{errorMessage}</p>
          )}

          {/* Display Download Link */}
          {result && (
            <div className='mt-6 p-4 w-full bg-blue-50 border border-blue-100 rounded-md text-center break-all'>
              <p className='text-xs text-blue-800 uppercase font-bold tracking-wider mb-2'>
                Download Link
              </p>
              <a
                href={result}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:text-blue-800 hover:underline font-medium'
              >
                {result}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
