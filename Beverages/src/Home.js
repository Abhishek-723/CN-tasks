import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
  const [searchItem, setSearchItem] = useState("");
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    const getAllItems = async () => {
      const response = await fetch(`${url}${searchItem}`);
      const data = await response.json();
      console.log(data);
      const d = [];
      data?.drinks?.map((drink) => {
        const x = {
          id: drink.idDrink,
          glass: drink.strGlass,
          name: drink.strDrink,
          alcoholic: drink.strAlcoholic,
          category: drink.strCategory,
          thumbnail: drink.strDrinkThumb,
          instructions: drink.strInstructions,
          ingredients: [
            drink.strIngredient1,
            drink.strIngredient2,
            drink.strIngredient3,
          ],
        };
        d.push(x);
        setDrinks(d);
      });
    };
    getAllItems();
  }, [searchItem]);
  const showDetails = (id) => {
    navigate(`/details/${id}`);
  };
  return (
    <div>
      <Navbar />
      <form className="search-form">
        <p>Search your favourite cocktails</p>
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search"
        />
      </form>
      <div className="section">
        <h2 style={{ textAlign: "center" }}>Cocktails</h2>
        <div className="cocktails-center">
          {drinks.map((drink) => (
            <div className="cocktail">
              <img src={drink.thumbnail} alt="" />
              <div className="details">
                <h3>{drink.name}</h3>
                <p>{drink.glass}</p>
                <p>{drink.alcoholic}</p>
                <button
                  onClick={() => showDetails(drink.id)}
                  className="btn-details"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
