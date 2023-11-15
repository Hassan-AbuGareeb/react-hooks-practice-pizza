import React from "react";
import Pizza from "./Pizza";

function PizzaList({ pizzas, onPizzaEdit }) {
  const pizzaItems = pizzas.map((pizza) => {
    return (
      <Pizza key={pizza.index} pizzaInfo={pizza} onPizzaEdit={onPizzaEdit} />
    );
  });
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Topping</th>
          <th scope="col">Size</th>
          <th scope="col">Vegetarian?</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>{pizzaItems}</tbody>
    </table>
  );
}

export default PizzaList;
