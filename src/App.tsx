import React, { useState } from 'react'
import UploadForm from './components/UploadForm'
import UploadedFiles from './components/UploadedFiles'

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileUpload = (file: File) => {
    setUploadedFiles([...uploadedFiles, file])
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-start">
      <header className="bg-white shadow-md w-full p-4 mb-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">Mobile Upload App</h1>
      </header>
      <main className="container mx-auto px-4">
        <UploadForm onFileUpload={handleFileUpload} />
        <UploadedFiles files={uploadedFiles} />
      </main>
      <footer className="mt-8 p-4 text-center text-gray-500">
        <p>&copy; 2024 Mobile Upload App</p>
      </footer>
    </div>
  )
}

export default App
