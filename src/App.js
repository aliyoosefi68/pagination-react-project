import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginated, setPaginated] = useState([]);

  let pageSize = 10;
  let pagesNumber;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        let endIndex = pageSize * currentPage;
        let startIndex = endIndex - pageSize;
        let allShownTodos = data.slice(startIndex, endIndex);
        setPaginated(allShownTodos);
      });
  }, []);

  const pagesCount = Math.ceil(todos.length / pageSize);
  pagesNumber = Array.from(Array(pagesCount).keys());

  const changePaginate = (newpage) => {
    setCurrentPage(newpage);
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    let allShownTodos = todos.slice(startIndex, endIndex);
    setPaginated(allShownTodos);
  };

  return (
    <div className="container ">
      <h1 className="mb-5 mt-3 text-center">List of My todos</h1>
      {!paginated ? (
        <h1>Loading...</h1>
      ) : (
        <table className="table table-striped border shadow-sm  ">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Id</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.userId}</td>
                <td>{todo.title}</td>
                <td>
                  {todo.completed ? (
                    <p className="text-danger">incomplete</p>
                  ) : (
                    <p className="text-success">completed</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {pagesNumber.map((item) => (
              <li
                style={{ cursor: "pointer" }}
                className={`page-item ${
                  item + 1 === currentPage ? "active" : null
                }`}
                key={item}
              >
                <span
                  className="page-link"
                  onClick={() => changePaginate(item + 1)}
                >
                  {item + 1}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
