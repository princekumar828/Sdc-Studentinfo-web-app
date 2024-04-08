import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";

const User = () => {
  const [userList, setUserList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [show, setShow] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const data = await getDocs(collection(db, "users"));
      const users = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserList(users);
    } catch (error) {
      console.error("Error fetching user list: ", error);
      setError("Failed to fetch user list. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "age":
        setAge(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "dob":
        setDob(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "rollNumber":
        setRollNumber(value);
        break;
      case "branch":
        setBranch(value);
        break;
      case "year":
        setYear(value);
        break;
      default:
        break;
    }
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const userData = {
        firstName,
        lastName,
        age,
        gender,
        dob,
        phoneNumber,
        rollNumber,
        branch,
        year,
      };
      if (!editUserId) {
        await addDoc(collection(db, "users"), userData);
        alert("User added successfully.");
      } else {
        await updateDoc(doc(db, "users", editUserId), userData);
        alert("User updated successfully.");
        setShow(false);
      }
      resetForm();
      fetchUserList();
    } catch (error) {
      console.error("Error handling user action: ", error);
      setError("Failed to perform user action. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "users", userId));
        alert("User deleted successfully.");
        fetchUserList();
      } catch (error) {
        console.error("Error deleting user: ", error);
        setError("Failed to delete user. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (userId, rollNumber, firstName, lastName, age, gender, dob, phoneNumber, branch, year) => {
    setEditUserId(userId);
    setRollNumber(rollNumber);
    setFirstName(firstName);
    setLastName(lastName);
    setAge(age);
    setGender(gender);
    setDob(dob);
    setPhoneNumber(phoneNumber);
    setBranch(branch);
    setYear(year);
    setShow(true);
  };

  const resetForm = () => {
    setEditUserId(null);
    setFirstName("");
    setLastName("");
    setAge("");
    setGender("");
    setDob("");
    setPhoneNumber("");
    setRollNumber("");
    setBranch("");
    setYear("");
  };

  return (
    <div>
      <h1 className="text-3xl mt-2 mb-3">Users</h1>

      <button
        onClick={() => {
          setShow(true);
          resetForm();
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add New User
      </button>

      {show && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded-md p-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setShow(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <AiOutlineClose />
                </button>
              </div>
              <h2 className="text-lg font-semibold mb-4">
                {editUserId ? "Update User" : "Add New User"}
              </h2>
              <input
                value={rollNumber}
                onChange={handleInputChange}
                name="rollNumber"
                placeholder="Roll Number"
                className="m-2 border-2 rounded-md p-2 w-full"
              />
              <input
                value={firstName}
                onChange={handleInputChange}
                name="firstName"
                placeholder="First Name"
                className="m-2 border-2 rounded-md p-2 w-full"
              />
              <input
                value={lastName}
                onChange={handleInputChange}
                name="lastName"
                placeholder="Last Name"
                className="m-2 border-2 rounded-md p-2 w-full"
              />
              <input
                value={age}
                onChange={handleInputChange}
                name="age"
                placeholder="Age"
                className="m-2 border-2 rounded-md p-2 w-full"
              />
              <input
                value={gender}
                onChange={handleInputChange}
                name="gender"
                placeholder="Gender"
                className="m-2 border-2 rounded-md p-2 w-full"
              />
              <input
                value={dob}
                onChange={handleInputChange}
                name="dob"
                placeholder="Date of Birth (MM/DD/YYYY)"
                className="m-2 border-2 rounded-md p-2 w-full"
              />
              <input
                value={phoneNumber}
                onChange={handleInputChange}
                name="phoneNumber"
                placeholder="Phone Number"
                className="m-2 border-2 rounded-md p-2 w-full"
              />
              <input
                value={branch}
                onChange={handleInputChange}
                name="branch"
                placeholder="Branch"
                className="m-2 border-2 rounded-md p-2 w-full"
              />
              <input
                value={year}
                onChange={handleInputChange}
                name="year"
                placeholder="Year"
                className="m-2 border-2 rounded-md p-2 w-full"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleClick}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {editUserId ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userList.map((user) => (
          <div key={user.id} className="bg-white shadow-md rounded-md p-6">
            <p className="font-semibold">Roll Number: {user.rollnumber}</p>
            <p className="font-semibold">Name: {user.firstName} {user.lastName}</p>
            <p className="font-semibold">Age: {user.age}</p>
            <p className="font-semibold">Gender: {user.gender}</p>
            <p className="font-semibold">Date of Birth: {user.dob}</p>
            <p className="font-semibold">Phone Number: {user.phoneNumber}</p>
            <p className="font-semibold">Branch: {user.branch}</p>
            <p className="font-semibold">Year: {user.year}</p>
            <div className="flex justify-end mt-4">
              <FaEdit
                className="cursor-pointer text-blue-500 mr-2"
                onClick={() =>
                  handleEdit(
                    user.id,
                    user.rollnumber,
                    user.firstName,
                    user.lastName,
                    user.age,
                    user.gender,
                    user.dob,
                    user.phoneNumber,
                    user.branch,
                    user.year
                  )
                }
              />
              <MdDelete
                className="cursor-pointer text-red-500"
                onClick={() => handleDelete(user.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
