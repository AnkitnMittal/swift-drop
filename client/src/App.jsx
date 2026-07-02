import { useRef } from 'react';

function App() {
  const fileInputRef = useRef();

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className='h-screen flex justify-center items-center'>
        <div className='bg-white overflow-hidden rounded-[5px] flex'>
          <div className='flex flex-col justify-center items-center p-10'>
            <h1 className='text-[40px] font-semibold text-[#445A6F] my-10'>
              SwiftDrop File Sharing MVC
            </h1>
            <p className='text-gray-600'>Upload & share the download link</p>

            {/* Upload Button */}
            <button
              onClick={onUploadClick}
              className='w-37.5 h-10 rounded-[5px] bg-[#445A6F] border border-[#445A6F] text-white text-xl my-7.5'
            >
              Upload
            </button>

            {/* Hidden File Input */}
            <input
              type='file'
              ref={fileInputRef}
              className='hidden my-5 w-75 p-2 focus-visible:outline-none'
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
