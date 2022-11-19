import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [tareas, setTareas] = useState();
  const [newTask, setNewTask] = useState({
    descripcion: "",
    estado: "",
  });

  useEffect(() => {
    // fetch()
    //   .then((dato) => dato.json())
    //   .then((json) => setTareas(json));

    const getData = async () => {
      const response = await fetch("http://127.0.0.1:5000/tarea");
      const responseJson = await response.json();
      setTareas(responseJson);
    };
    getData();
  }, []);

  const handleInputChange = (event) => {
    const { value, name } = event.currentTarget;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const createTask = async (event) => {
    event.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/tarea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    const responseJson = await response.json();
    if (responseJson.status === true) {
      console.log("Tarea guardada correctamente");
      alert("Tarea guardada correctamente");
    }
  };

  return (
    <div className="App">
      <form onSubmit={createTask}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            name="descripcion"
            className="form-control"
            value={newTask.descripcion}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Estado
          </label>
          <input
            type="text"
            name="estado"
            className="form-control"
            value={newTask.estado}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Crear tarea</button>
      </form>
    </div>
  );
}

export default App;
