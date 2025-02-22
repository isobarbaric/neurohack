import React, { useState } from 'react'
import UploadForm from '../components/UploadForm'
import UploadedFiles from '../components/UploadedFiles'

const HomePage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileUpload = (file: File) => {
    setUploadedFiles([...uploadedFiles, file])
  }

  return (
    <>
      <UploadForm onFileUpload={handleFileUpload} />
      <UploadedFiles files={uploadedFiles} />
    </>
  )
}

export default HomePage
