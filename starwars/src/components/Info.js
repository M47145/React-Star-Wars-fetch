import React from "react";
import { View } from "react-native";
import "./Info.css";

//Declaring and initializing first page needed for fetch and declaring maxPages needed to sort through data
let pagenumber = 1;
let maxPages;

function Info() {
  //data is the variable that holds fetched data
  let [data, setData] = React.useState([]);
  //Determines is data is visible or not
  let [dataIsVisible, setDataIsVisible] = React.useState(false);

  //Values you can fetch different info from api
  const filterValues = [
    { id: 1, name: "People", value: "people" },
    { id: 2, name: "Planets", value: "planets" },
    { id: 3, name: "Starships", value: "starships" },
    { id: 4, name: "Films", value: "films" },
    { id: 5, name: "Species", value: "species" },
    { id: 6, name: "Vehicles", value: "vehicles" },
  ];

  //Way to apply the filter
  let [selectedFilter, setSelectedFilter] = React.useState(0);

  //Api url
  const basicURL = "https://swapi.dev/api/";

  //Function to fetch data
  const fetchData = async () => {
    const fetchURL = `${basicURL}${filterValues[selectedFilter].value}/?page=${pagenumber}`;
    let fetcheddata = await fetch(fetchURL);
    let jsn = await fetcheddata.json();
    maxPages = Math.floor(jsn.count / 10) + 1;
    let jsnArr = jsn.results;
    setData(jsnArr);
    setDataIsVisible(true);
  };
  const getInfo = () => {
    console.log("info");
  };

  //Way to put fetch into data variable
  //Needed a separate part when fetching movies since they had different response
  let listItems = data.map((value, index) => {
    if (selectedFilter === 3) {
      return (
        <li key={index}>
          <button onClick={getInfo} style={{ margin: "10px" }}>
            MORE
          </button>
          {value.title}
        </li>
      );
    } else {
      return (
        <li key={index}>
          <button
            onClick={getInfo}
            style={{ margin: "10px", height: "30px", width: "60px" }}
          >
            MORE
          </button>
          {value.name}
        </li>
      );
    }
  });

  //When filter is changed
  const handleSelect = (e) => {
    pagenumber = 1;
    setSelectedFilter(parseInt(e.target.value));
    clear();
    console.log(selectedFilter);
  };

  //Clears screen
  const clear = () => {
    setData([]);
    setDataIsVisible(false);
  };

  //Adds 1 to pagenumber and fetches again
  const nextPage = () => {
    if (pagenumber < maxPages) {
      let newPage = pagenumber + 1;
      pagenumber = newPage;
      fetchData();
    }
  };
  //Same as above except pagenumber down
  const previousPage = () => {
    if (pagenumber > 1) {
      let oldPage = pagenumber - 1;
      pagenumber = oldPage;
      fetchData();
    }
  };

  return (
    <div className="Info">
      <div className="buttons">
        <select
          style={{
            backgroundColor: "black",
            color: "white",
            margin: "6px",
            padding: "5px 20px",
            fontSize: "20px",
          }}
          name="selectList"
          id="selectList"
          onChange={handleSelect}
        >
          <option value="0">People</option>
          <option value="1">Planets</option>
          <option value="2">Starships</option>
          <option value="3">Films</option>
          <option value="4">Species</option>
          <option value="5">Vehicles</option>
        </select>
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            margin: "6px",
            padding: "5px 40px",
            fontSize: "20px",
          }}
          onClick={fetchData}
        >
          Search
        </button>
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            margin: "6px",
            padding: "5px 40px",
            fontSize: "20px",
          }}
          onClick={clear}
        >
          Clear
        </button>
      </div>
      <div
        className="infoscreen"
        style={{ display: dataIsVisible ? "block" : "none" }}
      >
        <View className="infoview">
          <ul className="dataList" style={{ listStyle: "none" }}>
            {listItems}
          </ul>
        </View>
      </div>
      <div>
        <div
          className="pageButtons"
          style={{
            margin: "10px",
            display: dataIsVisible ? "block" : "none",
          }}
        >
          <button className="button" onClick={nextPage}>
            Next
          </button>

          <p1 className="pageText">
            {pagenumber}/{maxPages}
          </p1>

          <button className="button" onClick={previousPage}>
            Previous
          </button>
        </div>
      </div>
    </div>
  );
}

export default Info;
