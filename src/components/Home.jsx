import React, { useState, useEffect} from "react";
import "../css/Dashboard.css";
import axios from "axios"
// import Button from "./button";
function Home(books,) {

  const [bookCount, setBookCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchCount();
  }, []);
  
  const fetchCount = async () => {
    try {
      const response = await axios.get('/api/bookcount');
      setBookCount(response.data.bookCount);
      setUserCount(response.data.userCount);
    } catch (error) {
      console.error('Error fetching book count:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-header">Dashboard</h2>
      <div className="card-container">
        <div className="card">
          <h3 className="card-title">Number of Books</h3>
          <p className="card-value">{bookCount}</p>
        </div>
        <div className="card">
          <h3 className="card-title">Number of Users</h3>
          <p className="card-value">{userCount}</p>
        </div>
        <div className="card">
          <h3 className="card-title">Books Overdue</h3>
          <p className="card-value">48</p>
        </div>
      </div>
      <div className="card-container">
        <div className="card">
          <h3 className="card-title">Number of Books (Genre)</h3>
          <p className="card-value">3000</p>
          {/* <Button page="/another-page" buttonName="Learn More" /> */}
        </div>
        <div className="card">
          <h3 className="card-title">Popular genres</h3>
          <p className="card-value">700</p>
        </div>
        <div className="card">
          <h3 className="card-title">Popular books</h3>
          <p className="card-value">48</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
