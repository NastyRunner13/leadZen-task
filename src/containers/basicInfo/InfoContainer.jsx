import "./infocontainer.css";
import Pagination from "../../components/pagination/Pagination";
import { useState, useEffect } from "react";

const InfoContainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="info section__margin">
      {currentData.map((item) => (
        <div className="infocontainer" key={item.id}>
          <div className="infocontainer-upper">
            <span>{item.company.name}</span>
            <div className="info-details">
              <p>CONTACT</p>
              <span>{item.name}</span>
            </div>
            <div className="info-details">
              <p>STREET</p>
              <span>{item.address.street}</span>
            </div>
            <div className="info-details">
              <p>CITY</p>
              <span>{item.address.city}</span>
            </div>
            <button onClick={handleClick}>VIEW DETAILS</button>
          </div>
          {isExpanded && (
            <div className="infocontainer-lower">
              <div className="lower-description"></div>
              <div className="lower-otherDetails"></div>
            </div>
          )}
        </div>
      ))}
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
