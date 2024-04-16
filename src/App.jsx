// client/src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./css/home.css";

import UserList from "./components/UserList";
import Home from "./components/Home";
import BookList from "./components/BookList";
import AddEditBook from "./components/AddEditBook";
import AddEditUser from "./components/AddEditUser";
import BorrowReturn from "./components/BorrowReturn";

const App = () => {
  // State and useEffect hooks
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  // axios.defaults.baseURL = `http://localhost:5000`;
  axios.defaults.baseURL = `https://library58-api.onrender.com`;

  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books");
      setBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers(); // Fetch users after deleting a user
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      fetchBooks(); // Fetch products after deleting a product
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="mx-auto app h-[100vh]">
      <div className="Home">
        <aside className="sidebar">
          <nav>
            <ul>
              <li onClick={() => handleMenuItemClick("Dashboard")}>
                Dashboard
              </li>
              <li onClick={() => handleMenuItemClick("Users")}>Users</li>
              <li onClick={() => handleMenuItemClick("Books")}>Books</li>
              <li onClick={() => handleMenuItemClick("Issue/Return")}>
                Issue/Return
              </li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          <Router>
            <div className="flex flex-row bg-black py-4 px-4 justify-between align-middle items-center">
              <h1 className="text-3xl font-bold text-white">Library58</h1>

              <div className="flex">
                <div className="mr-4">
                  <Link
                    to="/"
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    Home
                  </Link>
                </div>
                <div className="mr-4">
                  <Link
                    to="/users"
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Users
                  </Link>
                </div>
                <div>
                  <Link
                    to="/books"
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Books
                  </Link>
                </div>
                <div>
                  <Link
                    to="/borrowreturn"
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Issue/Return
                  </Link>
                </div>
              </div>
            </div>
            <div className="mx-auto place-self-center place-content-center self-center place-items-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/users"
                  element={
                    <UserList
                      users={users}
                      fetchUsers={fetchUsers}
                      deleteUser={deleteUser}
                    />
                  }
                />
                <Route
                  path="/books"
                  element={
                    <BookList
                      books={books}
                      fetchBooks={fetchBooks}
                      deleteBook={deleteBook}
                    />
                  }
                />
                <Route
                  path="/add-book"
                  element={<AddEditBook fetchBooks={fetchBooks} />}
                />
                <Route
                  path="/add-user"
                  element={<AddEditUser fetchUsers={fetchBooks} />}
                />
                <Route
                  path="/edit-book/:id"
                  element={<AddEditBook fetchBooks={fetchBooks} />}
                />
                <Route
                  path="/edit-user/:id"
                  element={<AddEditUser fetchUsers={fetchBooks} />}
                />
                <Route
                  path="/borrowreturn"
                  element={<BorrowReturn  />}
                />

                {/* {selectedMenuItem === "Dashboard" && <Home />} */}
                {selectedMenuItem === "Users" && <UserList />}
                {selectedMenuItem === "Books" && (
                  <Route
                    path="/books"
                    element={
                      <BookList
                        books={books}
                        fetchBooks={fetchBooks}
                        deleteBook={deleteBook}
                      />
                    }
                  />
                )}
                {/* {selectedMenuItem === "Issue/Return" && <IssueReturn />} */}
              </Routes>
            </div>
          </Router>
        </main>
      </div>
    </div>
  );
};

export default App;
