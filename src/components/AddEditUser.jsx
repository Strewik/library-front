// client/src/pages/AddEditUser.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

const AddEditUser = ({ fetchUsers }) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [address, setAddress] = useState("");
  const [accountStatus, setAccountStatus] = useState("");

  useEffect(() => {
    if (id) {
      console.log("here");
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      setname(response.data.data[0].name);
      setEmail(response.data.data[0].email);
      setPhone(response.data.data[0].phone);
      setIdType(response.data.data[0].idType);
      setIdNumber(response.data.data[0].idNumber);
      setAddress(response.data.data[0].address);
      setAccountStatus(response.data.data[0].accountStatus);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      phone,
      idType,
      idNumber,
      address,
      accountStatus,
    };

    if (id) {
      try {
        await axios.put(`/api/users/${id}`, newUser);
        navigate("/users");
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        await axios.post("/api/users", newUser);
        fetchUsers(); // Fetch users after adding a new user
        navigate("/users");
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2"> {id ? "Edit" : "Add"} User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Phone number:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            ID Type:
          </label>
          <input
            type="text"
            id="idType"
            name="idType"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            ID Number:
          </label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="accountStatus"
          >
            Account Status:
          </label>
          <select
            id="accountStatus"
            name="accountStatus"
            value={accountStatus}
            onChange={(e) => setAccountStatus(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditUser;
