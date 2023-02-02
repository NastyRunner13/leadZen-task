import "./infocontainer.css";
import Pagination from "../../components/pagination/Pagination";
import { useState, useEffect } from "react";

const InfoContainer = () => {
  const [expandedIndex, setExpandedIndex] = useState(-1);
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
    <div className="info section__margin">
      {currentData.map((item, index) => (
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
            <button
              onClick={() =>
                setExpandedIndex(expandedIndex === index ? -1 : index)
              }
            >
              View Details
            </button>
          </div>
          {expandedIndex === index && (
            <div className="infocontainer-lower">
              <div className="lower-description">
                <p>CATCH PHRASE</p>
                <span>{item.company.catchPhrase}</span>
              </div>
              <div className="lower-otherDetails">
                <div className="lower-otherDetails-left">
                  <p>WEBSITE</p>
                  <span>{item.website}</span>
                  <p>USERNAME</p>
                  <span>{item.username}</span>
                  <p>EMAIL</p>
                  <span>{item.email}</span>
                  <p>PHONE</p>
                  <span>{item.phone}</span>
                </div>
                <div className="lower-otherDetails-right">
                  <p>ADDRESS</p>
                  <span>{item.address.suite}</span>
                  <p>CITY</p>
                  <span>{item.address.city}</span>
                  <p>STREET</p>
                  <span>{item.address.street}</span>
                  <p>ZIPCODE</p>
                  <span>{item.address.zipcode}</span>
                </div>
              </div>
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
