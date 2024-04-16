// client/src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const BookList = ({ books, deleteBook, fetchBooks }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const navigate = useNavigate();

  const editBook = (id) => {
    navigate(`/edit-book/${id}`);
  }
  useEffect(() => {
    fetchBooks();
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredBooks = books.filter(book =>
    Object.values(book).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedBooks = sortBy ? filteredBooks.sort((a, b) => {
    const fieldA = a[sortBy].toString().toLowerCase();
    const fieldB = b[sortBy].toString().toLowerCase();
    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  }) : filteredBooks;

  return (
    <div>
      <div className='justify-between flex'>
        <h2 className="text-xl font-bold mb-2">Book List</h2>
        <Link to="/add-book" className="bg-blue-500 text-white px-2 py-1 rounded">
          Add Book
        </Link>
      </div>
      <div>Total Books: {books.length}</div> 
      <table className="table-auto mt-10 w-full">
        <thead>
          <tr>
            <th className="px-4 border  py-2">Code</th>
            <th className="px-4 border  py-2">Title</th>
            <th className="px-4 border  py-2">Author</th>
            <th className="px-4 border  py-2">Availability</th>
            <th className="px-4 border  py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.length ?
            books.map((book) => (
              <tr key={book._id}>
                <td className="border px-4 py-2 text-center">{book.code}</td>
                <td className="border px-4 py-2 text-center">{book.title}</td>
                <td className="border px-4 py-2 text-center">{book.author}</td>
                <td className="border px-4 py-2 text-center">{book.Availability}</td>
                <td className="border px-4 py-2 flex flex-nowrap justify-center">
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => editBook(book._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 ms-2 py-1 rounded"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) :
            <td className="border px-4 py-2 text-center" rowSpan={10} colSpan={10}>No Data Found</td>


          }
        </tbody>
      </table>
    
    
    </div>
  );
};

export default BookList;
