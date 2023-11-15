import React from "react";

function Pizza({ pizzaInfo, onPizzaEdit }) {
  function handleEditClick() {
    onPizzaEdit(id);
  }

  const { id, topping, size, vegetarian: isVegeterian } = pizzaInfo;
  return (
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{isVegeterian ? "yes" : "no"}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleEditClick}
        >
          Edit Pizza
        </button>
      </td>
    </tr>
  );
}

export default Pizza;
