import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddEditBook = ({ fetchBooks = null }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [publishYr, setPublishYr] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`/api/books/${id}`);
      setTitle(response.data.data[0].title);
      setAuthor(response.data.data[0].author);
      setCode(response.data.data[0].code);
      setQuantity(response.data.data[0].quantity);
      setPublishYr(response.data.data[0].publishYr);
      setLanguage(response.data.data[0].language);
      setCategory(response.data.data[0].category);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      quantity: Number(quantity),
      code,
      publishYr,
      language,
      category,
    };

    if (id) {
      try {
        await axios.put(`/api/books/${id}`, newBook);
        navigate("/books");
      } catch (error) {
        console.error("Error updating book:", error);
      }
    } else {
      try {
        await axios.post("/api/books", newBook);
        fetchBooks(); // Fetch books after adding a new book
        navigate("/books");
      } catch (error) {
        console.error("Error adding book:", error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{id ? "Edit" : "Add"} Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Year of publication
          </label>
          <input
            type="number"
            id="publishYr"
            name="publishYr"
            value={publishYr}
            onChange={(e) => setPublishYr(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Language
          </label>
          <input
            id="language"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
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

export default AddEditBook;
