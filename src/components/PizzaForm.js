import React, { useEffect, useState } from "react";

function PizzaForm({ pizzaId, resetPizzaId, onPizzaSubmit }) {
  const [pizzaInfo, setPizzaInfo] = useState({});
  useEffect(() => {
    if (pizzaId !== 0) {
      fetch(`http://localhost:3001/pizzas/${pizzaId}`)
        .then((resp) => resp.json())
        .then((data) => console.log(setPizzaInfo({ ...data })));
    }
  }, [pizzaId]);

  function handleSubmit(event) {
    event.preventDefault();
    if (pizzaId !== 0) {
      //change the state containing the pizza
      console.log(pizzaInfo);
      onPizzaSubmit(pizzaInfo);
      //update the json file
      fetch(`http://localhost:3001/pizzas/${pizzaId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...pizzaInfo }),
      });
      //empty all fields ?? automatic empty by resetting to 0?
      setPizzaInfo({ ...pizzaInfo, topping: "" });
      setPizzaInfo({});

      //reset id to 0
      resetPizzaId(0);
    }
  }

  function handleInputChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    if (key === "vegetarian")
      setPizzaInfo({
        ...pizzaInfo,
        [key]: value.toLowerCase().includes("not") ? false : true,
      });
    else setPizzaInfo({ ...pizzaInfo, [key]: value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={pizzaInfo.topping}
            onChange={handleInputChange}
            disabled={pizzaId === 0}
          />
        </div>
        <div className="col">
          <select
            className="form-control"
            name="size"
            onChange={handleInputChange}
            value={pizzaInfo.size}
            disabled={pizzaId === 0}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              onChange={handleInputChange}
              checked={pizzaInfo.vegetarian}
              disabled={pizzaId === 0}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              onChange={handleInputChange}
              checked={
                pizzaInfo.vegetarian !== undefined && !pizzaInfo.vegetarian
              }
              disabled={pizzaId === 0}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button
            type="submit"
            className="btn btn-success"
            disabled={pizzaId === 0}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
