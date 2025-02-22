import React from 'react'

interface UploadedFilesProps {
  files: File[]
}

const UploadedFiles: React.FC<UploadedFilesProps> = ({ files }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Uploaded Files</h2>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul>
          {files.map((file, index) => (
            <li key={index} className="py-2 border-b border-gray-200">
              {file.name} - {file.size} bytes
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UploadedFiles
