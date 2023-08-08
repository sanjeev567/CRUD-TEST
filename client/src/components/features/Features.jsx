import "./features.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UpdateModal from "../updateModal/UpdateModal";

const features = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [sortValue, setSortValue] = useState("");
  const sortOptions = ["name", "email", "age", "isAdmin"];

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [update, setUpdate] = useState("");
  const [error, setError] = useState(false);
  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  //   const fetchData = async () => {
  //     try {
  //       //   const token = localStorage.getItem("accessToken");
  //       const token =
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzI4ZjAzZTE2MzRhZTY5N2Q2ZWM1OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MDQ3MjI5OCwiZXhwIjoxNjkwOTA0Mjk4fQ.h37y4GcGasuVwx-QkHo9EZYCrCoVCQ3X4VkLjtlZILc";
  //       const res = await axios.get(`http://localhost:8000/api/users/all/stats`, {
  //         headers: { token: `Bearer ${token}` },
  //       });
  //       if (res.status === 200) {
  //         setData(res.data);
  //       } else {
  //         console.log("internal error  with status code: " + res.status);
  //       }
  //     } catch (err) {
  //       console.log(`server error occured: ${err}`);
  //     }
  //   };

  // pagination property
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/all/stats/page?page=${page}&limit=5`
      );
      setData(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:8000/api/users/search/?q=${query}`
      );
      if (res.status === 200) {
        setData(res.data);
        setQuery("");
      } else {
        console.log("some error occured with status code: " + res.status);
      }
    } catch (err) {
      console.log("Server error: " + err);
    }
  };
  const handleReset = async () => {
    await fetchData();
  };

  const handleSelect = async (e) => {
    // setSortValue(e.target.value);
    let value = e.target.value;
    setSortValue(value);
    setCurrentPage(1);
    try {
      // const res = await axios.get(
      //   `http://localhost:8000/api/users/sort/all?field=${value}&order=asc`
      // );
      const res = await axios.get(
        `http://localhost:8000/api/users/sort/all?field=${value}&order=asc&page=${currentPage}&limit=5`
      );
      if (res.status === 200) {
        setData(res.data.users);
        setTotalPages(res.data.totalPages);
      } else {
        console.log("Some error occured with status code: " + res.status);
      }
    } catch (err) {
      console.log("server error occured: " + err);
    }
  };

  const handleDelete = async (id) => {
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzI4ZjAzZTE2MzRhZTY5N2Q2ZWM1OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MDUyMDM0MSwiZXhwIjoxNjkwOTUyMzQxfQ.XEp_M8UC_2DyzXBLWjaqIO9nYsvRe8dZepHTKNhLifE";

    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.delete(`http://localhost:8000/api/users/${id}`, {
        headers: { token: `Bearer ${token}` },
      });
      if (res.status === 200) {
        console.log("user has beend deleted ");
        fetchData();
      } else {
        console.log("some error occured with status code: " + res.status);
      }
    } catch (err) {
      console.log("Server error " + err);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleUpdate = (userId) => {
    setUpdate(userId);
    // setTimeout(() => {
    //   setUpdate("");
    // }, 3000);
  };

  const handleCloseModal = () => {
    setUpdate(""); // Reset the 'update' state to close the modal
    fetchData();
  };
  return (
    <div className="features">
      <div className="navbar">
        <div className="sortContainer">
          <h1>Sort By: </h1>
          <select onChange={handleSelect} value={sortValue}>
            <option value="">please select value</option>
            {sortOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search here..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
          <button onClick={handleReset}>Reset</button>
        </form>
      </div>
      <div className="searchTable">
        {error && <h3>Only admin or self user can delete their data !</h3>}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>isAdmin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.age}</td>
                  <td>{item.isAdmin ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => handleUpdate(item._id)}>
                      update
                    </button>
                    <button onClick={() => handleDelete(item._id)}>
                      delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No data to show</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="paginate-btn">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      {update && (
        <UpdateModal userId={update} onCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

export default features;
