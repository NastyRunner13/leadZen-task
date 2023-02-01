import React, { useState, useEffect } from "react";
import "./App.css";

const Pagination = ({
  dataPerPage,
  totalData,
  currentPage,
  handlePageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? "active" : ""}>
            <a onClick={() => handlePageChange(number)} href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((dataFromApi) => {
          setData(dataFromApi);
        })
        .catch((error) => console.error(error));
    }
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <ul>
        {currentData.map((item) => (
          <div key={item.id}>
            <li>{item.name}</li>
            <li>{item.username}</li>
          </div>
        ))}
      </ul>
      <Pagination
        dataPerPage={dataPerPage}
        totalData={data.length}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
