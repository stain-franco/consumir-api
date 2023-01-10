import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Drinks from "./components/Drinks";
import 'animate.css';

function sortDrinks(drinks){
  return drinks?.sort((a,b) =>{
    if (a.strDrink > b.strDrink){
      return 1;
    } else if(a.strDrink<b.strDrink){
      return -1;
    } else {
      return 0;
    }
  })
}

function App() {

  const [dataDrinks, setDataDrinks] = useState([]);
  const [name , setName] = useState ("")

  useEffect ( () =>{
    getData()
  }, [name])

  const getData = () =>{
    axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then(resp =>{
      console.log(resp.data.drinks)
      setDataDrinks(resp.data.drinks)
    })
    .catch(error => console.log(error))
    setDataDrinks([]);

  }
  const searchDrink = (e) =>{
    e.preventDefault()
    setName(e.target[0].value.toLowerCase())
  }
  return (
    <div className="App">
      <form onSubmit={(e) => searchDrink(e)}>
        <input type="text" placeholder=" Search by name" />
        <button type="submit">Search</button>
      </form>
      <div className="container">
      {  dataDrinks?.length ? 
        sortDrinks(dataDrinks)?.map( (drinks, index)=> ( 
        <Drinks 
        key={`drinks-${index}`}
        data={drinks}
        /> )): <h1 className="nohay">No hay coincidencias
          <img src="/src/assets/6195678.png" alt="" />
        </h1> } 
      </div>
    </div>
  );
}

export default App;
