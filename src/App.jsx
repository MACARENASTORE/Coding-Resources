import React, { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getData = async () => {
    try {
      const resp = await fetch('https://api.sampleapis.com/codingresources/codingResources');
      const json = await resp.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="text-center">Coding Resources</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row">
        {currentItems.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.description}</h5>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Go to Resource
                </a>
                <p className="card-text mt-2"><strong>Types:</strong> {item.types.join(', ')}</p>
                <p className="card-text"><strong>Topics:</strong> {item.topics.join(', ')}</p>
                <p className="card-text"><strong>Levels:</strong> {item.levels.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <a onClick={() => paginate(number)} href="#!" className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
