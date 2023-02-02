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
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={number === currentPage ? "active" : ""}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
