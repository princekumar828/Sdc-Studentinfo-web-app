import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const User = () => {
  const [userList, setUserList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userYear, setUserYear] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [branch, setUserBranch] = useState("");
  const [show, setShow] = useState(false);
  const [rollno, setRollNo] = useState("");
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
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(filteredData);
    } catch (error) {
      console.error("Error fetching user list: ", error);
      setError("Failed to fetch user list. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") setUserName(value);
    else if (name === "email") setUserEmail(value);
    else if (name === "year") setUserYear(value);
    else if (name === "phone") setUserPhone(value);
    else if (name === "branch") setUserBranch(value);
    else if (name === "rollno") setRollNo(value);
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      // Check if any of the fields are empty
      if (
        userName.trim() === "" ||
        userEmail.trim() === "" ||
        userYear.trim() === "" ||
        userPhone.trim() === "" ||
        branch.trim() === "" ||
        rollno.trim() === ""
      ) {
        alert("Please fill in all fields.");
        return; // Prevent further execution if any field is empty
      }
      
      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(userEmail)) {
        alert("Please enter a valid email address.");
        return; // Prevent further execution if email is invalid
      }
      
      // Phone number validation
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(userPhone)) {
        alert("Please enter a valid 10-digit phone number.");
        return; // Prevent further execution if phone number is invalid
      }
      
      if (!editUserId) {
        await addDoc(collection(db, "users"), {
          email: userEmail,
          name: userName,
          rollno: rollno,
          branch: branch,
          year: userYear,
          phone: userPhone,
        });
        alert("User added successfully.");
      } else {
        await updateDoc(doc(db, "users", editUserId), {
          email: userEmail,
          name: userName,
          rollno: rollno,
          branch: branch,
          year: userYear,
          phone: userPhone,
        });
        alert("User updated successfully.");
        setShow(false);
      }
      setUserName("");
      setUserEmail("");
      setUserYear("");
      setUserPhone("");
      setUserBranch("");
      setRollNo("");
      fetchUserList();
    } catch (error) {
      console.error("Error handling user action: ", error);
      setError("Failed to perform user action. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  



  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "users", id));
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


  

  const handleEdit = (
    id,
    rollno,
    name,
    phone,
    email,
    branch,
    year
  ) => {
    setEditUserId(id);
    setRollNo(rollno);
    setUserName(name);
    setUserEmail(email);
    setUserBranch(branch);
    setUserYear(year);
    setUserPhone(phone);
    setShow(true);
  };

 // Inside the return statement of the User component:

return (
  <div>
    <h1 className="text-3xl mt-2 mb-3">Users</h1>

    <button
      onClick={() => {
        setShow(true);
        setEditUserId(null); // Reset editUserId when adding a new user
        setRollNo("");
        setUserName("");
        setUserEmail("");
        setUserYear("");
        setUserPhone("");
        setUserBranch("");
      }}
      className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
    >
      Add New User
    </button>

    <div className="relative">
      

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
         value={rollno}
         onChange={handleInputChange}
         name="rollno"
         placeholder="Roll No"
         className="m-2 border-2 rounded-md p-2 w-full"
       ></input>
       <input
         value={userName}
         onChange={handleInputChange}
         name="name"
         placeholder="Name"
         className="m-2 border-2 rounded-md p-2 w-full"
       ></input>
       <input
         value={userPhone}
         onChange={handleInputChange}
         name="phone"
         placeholder="Phone"
         className="m-2 border-2 rounded-md p-2 w-full"
       ></input>
       <input
         value={userEmail}
         onChange={handleInputChange}
         name="email"
         placeholder="Email"
         className="m-2 border-2 rounded-md p-2 w-full"
       ></input>
       <input
         value={branch}
         onChange={handleInputChange}
         name="branch"
         placeholder="Branch"
         className="m-2 border-2 rounded-md p-2 w-full"
       ></input>
       <input
         value={userYear}
         onChange={handleInputChange}
         name="year"
         placeholder="Year"
         className="m-2 border-2 rounded-md p-2 w-full"
       ></input>
        
        
        
        
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
        {userList.map((prop) => (
          <div
            key={prop.id}
            className="bg-white shadow-md rounded-md p-6 flex flex-col justify-between"
          >
            <div>
              <p className="font-semibold">Roll No: {prop.rollno}</p>
              <p className="font-semibold">Name: {prop.name}</p>
              <p className="font-semibold">Phone: {prop.phone}</p>
              <p className="font-semibold">Email: {prop.email}</p>
              <p className="font-semibold">Branch: {prop.branch}</p>
              <p className="font-semibold">Year: {prop.year}</p>
            </div>
            <div className="flex justify-end mt-4">
              <FaEdit
                className="cursor-pointer text-blue-500 mr-2"
                onClick={() =>
                  handleEdit(
                    prop.id,
                    prop.rollno,
                    prop.name,
                    prop.phone,
                    prop.email,
                    prop.branch,
                    prop.year
                  )
                }
              />
              <MdDelete
                className="cursor-pointer text-red-500"
                onClick={() => handleDelete(prop.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

};

export default User;

