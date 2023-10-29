import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currDrink, setCurrDrink] = useState({
    id: 0,
    glass: "",
    name: "",
    alcoholic: "",
    category: "",
    thumbnail: "",
    instructions: "",
    ingredients: [],
  });

  const [isDrink, setIsDrink] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      const drink = data.drinks;
      console.log(drink);
      if (drink !== null) {
        setCurrDrink({
          ...currDrink,
          id: drink[0].idDrink,
          glass: drink[0].strGlass,
          name: drink[0].strDrink,
          alcoholic: drink[0].strAlcoholic,
          category: drink[0].strCategory,
          thumbnail: drink[0].strDrinkThumb,
          instructions: drink[0].strInstructions,
          ingredients: [
            drink[0].strIngredient1,
            drink[0].strIngredient2,
            drink[0].strIngredient3,
          ],
        });
      } else {
        setIsDrink(false);
      }
    };
    getData();
  }, [id]);
  console.log(currDrink);

  return (
    <div>
      <Navbar />
      <div className="curr-cocktail">
        <button
          className="btn-primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Back Home
        </button>
        <h1 className="section-title">{currDrink.name}</h1>
        <div className="cocktail">
          <img src={currDrink.thumbnail} alt="" className="drink img" />
          <div className="drink-info">
            <p>Name: {currDrink.name}</p>
            <p>Glass: {currDrink.glass}</p>
            <p>Alcoholic: {currDrink.alcoholic}</p>
            <p>Category: {currDrink.category}</p>
            <p>Instructions: {currDrink.instructions}</p>
            <div>
              Ingredients:{" "}
              {currDrink.ingredients.map((d) => (
                <p>{d},</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
