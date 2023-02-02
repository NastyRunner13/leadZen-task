import "./pagination.css";

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
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? "active" : ""}>
            <a onClick={() => handlePageChange(number)} href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
