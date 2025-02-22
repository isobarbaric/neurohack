import React from 'react'
import Link from 'next/link'

const MenuBar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md w-full p-4 mb-8">
      <ul className="flex justify-around">
        <li>
          <Link href="/" className="text-blue-500 hover:text-blue-700">Daily Check-in</Link>
        </li>
        <li>
          <Link href="/history" className="text-blue-500 hover:text-blue-700">History</Link>
        </li>
        <li>
          <Link href="/info" className="text-blue-500 hover:text-blue-700">Info</Link>
        </li>
      </ul>
    </nav>
  )
}

export default MenuBar
