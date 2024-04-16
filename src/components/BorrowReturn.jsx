import React, { useState } from 'react';
import axios from 'axios';

function BorrowReturnForm() {
  const [bookCode, setBookCode] = useState('');
  const [userName, setUserName] = useState('');
  const [bookDetails, setBookDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const searchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/books?code=${bookCode}`);
      if (response.data.length > 0) {
        setBookDetails(response.data[0]);
      } else {
        alert('Book not found!');
      }
    } catch (error) {
      console.error('Error searching book:', error);
      alert('Failed to search book. Please try again.');
    }
  };

  const searchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/users?name=${userName}`);
      if (response.data.length > 0) {
        setUserDetails(response.data[0]);
      } else {
        alert('User not found!');
      }
    } catch (error) {
      console.error('Error searching user:', error);
      alert('Failed to search user. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement submission logic, e.g., borrowing or returning book
  };

  return (
    <div>
      <h2>Borrow/Return Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book Code</label>
          <input type="text" value={bookCode} onChange={(e) => setBookCode(e.target.value)} />
          <button type="button" onClick={searchBook}>Search Book</button>
        </div>
        <div>
          <label>User Name</label>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <button type="button" onClick={searchUser}>Search User</button>
        </div>
        <div>
          <h3>Book Details</h3>
          {bookDetails && (
            <ul>
              <li>Code: {bookDetails.code}</li>
              <li>Title: {bookDetails.title}</li>
              <li>Author: {bookDetails.author}</li>
              {/* Add more book details as needed */}
            </ul>
          )}
        </div>
        <div>
          <h3>User Details</h3>
          {userDetails && (
            <ul>
              <li>Name: {userDetails.name}</li>
              <li>Email: {userDetails.email}</li>
              <li>Phone: {userDetails.phone}</li>
              {/* Add more user details as needed */}
            </ul>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BorrowReturnForm;



// import React, { useState } from 'react';
// import axios from 'axios';
// import '../css/borrowReturn.css';

// function BorrowReturn() {
//   const [formData, setFormData] = useState({
//     bookId: '',
//     userId: '',
//     returnDate: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleBorrow = async () => {
//     try {
//       const response = await axios.post('http://localhost:4000/borrow', formData);
//       console.log('Book borrowed:', response.data);
//       setFormData({
//         bookId: '',
//         userId: '',
//         returnDate: ''
//       });
//     } catch (error) {
//       console.error('Error borrowing book:', error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg">
//   <h2 className="text-center text-2xl font-bold mb-6">Borrow/Return</h2>
//   <form>
//     <div className="mb-4">
//       <label htmlFor="bookCode" className="block mb-1">Book Code</label>
//       <input type="text" id="bookCode" name="bookCode" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
//     </div>
//     <div className="mb-4">
//       <label htmlFor="userName" className="block mb-1">User Name</label>
//       <input type="text" id="userName" name="userName" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
//     </div>
//     <div className="mb-4">
//       <label htmlFor="userId" className="block mb-1">User ID</label>
//       <input type="text" id="userId" name="userId" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
//     </div>
//     <div className="mb-4">
//       <label htmlFor="issueDate" className="block mb-1">Issue Date</label>
//       <input type="date" id="issueDate" name="issueDate" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
//     </div>
//     <div className="mb-4">
//       <label htmlFor="returnDate" className="block mb-1">Return Date</label>
//       <input type="date" id="returnDate" name="returnDate" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
//     </div>
//     <div className="mb-4">
//       <button type="submit" className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600">Submit</button>
//     </div>
//   </form>
// </div>

//   );
// }

// export default BorrowReturn;
