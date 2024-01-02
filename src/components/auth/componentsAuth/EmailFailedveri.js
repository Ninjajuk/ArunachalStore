import React from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
const EmailFailedveri = () => {

    const navigate=useNavigate()
  return (
    <>
        <div className="fixed inset-0 ">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-300">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-700" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h2
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
             Token Expired and Verification Failed
            </h2>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
              Please Register Again.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            onClick={()=>navigate('/signup')}
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default EmailFailedveri