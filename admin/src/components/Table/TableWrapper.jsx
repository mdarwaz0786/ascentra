const TableWrapper = ({ children }) => (
  <div className="table-responsive">
    <table className="table table-bordered table-striped align-middle">{children}</table>
  </div>
);

export default TableWrapper;
