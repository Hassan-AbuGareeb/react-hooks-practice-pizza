import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzaList, setPizzaList] = useState([]);
  const [pizzaId, setPizzaId] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then((resp) => resp.json())
      .then((data) => setPizzaList([...data]));
  }, []);

  function handlePizzaEdit(pizzaId) {
    setPizzaId(pizzaId);
  }

  function handlePizzaSubmit(pizzaObj) {
    const updatedPizzas = pizzaList.map((pizza) => {
      if (pizza.id === pizzaObj.id) return (pizza = { ...pizzaObj });
      else return pizza;
    });
    setPizzaList([...updatedPizzas]);
  }

  return (
    <>
      <Header />
      <PizzaForm
        pizzaId={pizzaId}
        resetPizzaId={setPizzaId}
        onPizzaSubmit={handlePizzaSubmit}
      />
      <PizzaList pizzas={pizzaList} onPizzaEdit={handlePizzaEdit} />
    </>
  );
}

export default App;
