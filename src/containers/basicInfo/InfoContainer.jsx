import "./infocontainer.css";
import Pagination from "../../components/pagination/Pagination";
import { useState, useEffect } from "react";

const InfoContainer = () => {
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
};

export default InfoContainer;
