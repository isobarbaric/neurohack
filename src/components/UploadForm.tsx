import React, { useState } from 'react'
import { Upload } from 'lucide-react'

interface UploadFormProps {
  onFileUpload: (file: File) => void
}

const UploadForm: React.FC<UploadFormProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (selectedFile) {
      onFileUpload(selectedFile)
      setSelectedFile(null) // Reset the selected file after upload
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <label htmlFor="file-input" className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <div className="flex items-center">
          <Upload className="mr-2" size={20} />
          <span>Select File</span>
        </div>
      </label>
      <input id="file-input" type="file" className="hidden" onChange={handleFileChange} />
      {selectedFile && <span className="text-gray-700">Selected: {selectedFile.name}</span>}
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" disabled={!selectedFile}>
        Upload
      </button>
    </form>
  )
}

export default UploadForm
