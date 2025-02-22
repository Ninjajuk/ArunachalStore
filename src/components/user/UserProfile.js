import React, { useEffect, useState } from "react";
import UserDashboard from "./usercomponents/UserDashboard";
import Navbar1 from "../Navbar/NavbarDark";
import { fetchUserProfile } from "../../API/userAPI";
import { selectLoggedInUser } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import UserForm from "./usercomponents/UserForm";
import AddressUserModal from "../modal/AddressUserModal";

const PersonalInfoCard = () => {
  const userLoggedin = useSelector(selectLoggedInUser);
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const openModal = (address = null) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await fetchUserProfile();
        const data = await resp.json();
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = (index) => {
    const updatedAddresses = user.user.addresses.filter((_, i) => i !== index);
    setUser({ ...user, user: { ...user.user, addresses: updatedAddresses } });
  };

  return (
    <>
      <Navbar1 />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
        {user && (
          <div className="p-8 w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 pb-4">Personal Information</h2>
            <div className="space-y-4">
              <p className="text-gray-700"><span className="font-semibold">Name:</span> {user.user.name}</p>
              <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.user.email}</p>
              <p className="text-gray-700"><span className="font-semibold">Phone:</span> {user.user.phone}</p>
              {user.user.role === "admin" && (
                <p className="text-xl font-bold text-red-900"><span className="font-semibold">Role:</span> {user.user.role}</p>
              )}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                onClick={() => openModal()}
              >
                Add Delivery Address
              </button>
            </div>
          </div>
        )}

        {isModalOpen && <AddressUserModal closeModal={closeModal} user={user} address={selectedAddress} />}

        {user && (
          <div className="flex flex-col items-center mt-8 w-full max-w-2xl">
            <div className="p-8 w-full bg-white rounded-xl shadow-lg border border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Delivery Addresses</h1>
              {user.user.addresses.map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm mb-4">
                  <div className="space-y-2">
                    <p><span className="font-semibold">Name:</span> {item.name}</p>
                    <p><span className="font-semibold">Email:</span> {item.email}</p>
                    <p><span className="font-semibold">Phone:</span> {item.phone}</p>
                    <p><span className="font-semibold">Street:</span> {item.street}</p>
                    <p><span className="font-semibold">Pin Code:</span> {item.pinCode}</p>
                    <p><span className="font-semibold">City:</span> {item.city}</p>
                    <p><span className="font-semibold">State:</span> {item.state}</p>
                  </div>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                      onClick={() => openModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalInfoCard;