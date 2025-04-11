"use client"

import SnackBar from "@/app/components/SnackBar";
import { createRegion } from "./action";
import { useState } from "react";
import {BackButton} from "@/app/components/BackButton";

export default function Home() {
  const [snackBar, setSnackBar] = useState<{
    message: string;
    show: boolean;
    isError: boolean;
  }>({
    message: '',
    show: false,
    isError: false,
  });

  const closeSnackBar = () => {
    setTimeout(() => {
      setSnackBar({
        message: '',
        show: false,
        isError: false,
      });
    },3000)
  };

  // On Sibmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // get Form Data and Check if it is empty or not
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const state = formData.get('region');
    if (!state || state.toString().trim() === '') {
      alert('Please enter a state name');
      return;
    }
    // Server Will Response True or False
    const response = await createRegion(formData);

    if (!response) {
      setSnackBar({
        message: 'Can\'t Create This Region.',
        show: true,
        isError: true,
      });
      closeSnackBar();
      return;
    }
    setSnackBar({
      message: 'Region Created Successfully.',
      show: true,
      isError: false,
    });
    
    closeSnackBar();


  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center ">
      <SnackBar message={snackBar.message} show={snackBar.show} isError={snackBar.isError}/>
      <h1 className="text-3xl font-bold mb-8">Hello This is Admin Page For add region</h1>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
              Region Name
            </label>
            <input
              type="text"
              name="region"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter state name"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Region
            </button>
          </div>
        </form>
      </div>
      <BackButton />
    </div>
  );
}