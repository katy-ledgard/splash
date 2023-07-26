import "./App.css";
import { useState } from "react";
import axios from "axios";


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [img, setImg] = useState("");

  function handleSearch(event) {
    //console.log("always test to check function is working");
    setSearchQuery(event.target.value);
    console.log(searchQuery) 
    //<- check it is updating state
  }

  //This function needs to take time to get the required data; this is why we set it as an async function and use await. That means the rest of the code won't run until they get the response they have requested.

  async function getImage() {
    try {
    const API = `http://localhost:8090/photos?subject=${searchQuery}`;
    const res = await axios.get(API);
    console.log(res);
    setImg(res.data[0].img_url);
    } catch (error) {
      console.log(error);
      alert("Please check you have entered something in the search bar");
    }
  }

  return (
    <div className="App">
      <h1>Find any image</h1>
      
        <input
          type="text"
          placeholder="enter image subject"
          onChange={handleSearch}
        />
        <button onClick={getImage}>Explore!</button>
        {img && <img src={img} alt={searchQuery} />}
      
    </div>
  );
}

export default App;
