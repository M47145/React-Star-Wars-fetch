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
  //More info about character by name
  let [charName, setCharName] = React.useState();
  //Character info visibility
  let [charDataVisible, setCharDataVisible] = React.useState(false);
  let [chardata, setchardata] = React.useState([]);

  //Values you can use to fetch different info from api
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
    //Planets filter needed separate maxpage calculator since it had exactly 60
    //pieces of data and +1 after Math.floor made so it would try get data
    //page that wasnt there
    if (selectedFilter === 1) {
      maxPages = Math.floor(jsn.count / 10);
    } else {
      maxPages = Math.floor(jsn.count / 10) + 1;
    }

    let jsnArr = jsn.results;
    setData(jsnArr);
    setDataIsVisible(true);

    console.log(jsnArr);
  };
  const getMoreInfo = async () => {
    if (selectedFilter === 3) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].title === charName) {
          let id;
          console.log(id);
          if (pagenumber === 1) {
            id = i + 1;
          } else {
            id = i + 1 + 10 * (pagenumber - 1);
          }
          console.log(id);
          console.log(`${filterValues[selectedFilter].value}`);
          const newfetchURL = `${basicURL}${filterValues[selectedFilter].value}/${id}/`;
          let fetcheddata = await fetch(newfetchURL);
          let jsn = await fetcheddata.json();
          pushInfo(jsn.opening_crawl);
        }
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === charName) {
          let id;
          if (pagenumber === 1) {
            id = i + 1;
            console.log(id);
          } else {
            id = i + 1 + 10 * (pagenumber - 1);
            if (id >= 17 && selectedFilter === 0) {
              //Id number 17 was missing from people database so had skip it
              id++;
            }
            console.log(id);
          }
          const newfetchURL = `${basicURL}${filterValues[selectedFilter].value}/${id}/`;
          let fetcheddata = await fetch(newfetchURL);
          let jsn = await fetcheddata.json();
          pushInfo(jsn);
        }
      }
    }
    setCharName("");
  };

  const pushInfo = async (e) => {
    let ar = [];
    if (selectedFilter === 3) {
      ar = [e, ""];
      setchardata(ar);
    } else if (selectedFilter === 0) {
      let homeworld = await fetch(e.homeworld);
      let homeworldJSON = await homeworld.json();
      let filmsArr = [];
      for (let i = 0; i < e.films.length; i++) {
        let filmFetch = await fetch(e.films[i]);
        let filmFetchJSON = await filmFetch.json();
        filmsArr.push(filmFetchJSON.title);
      }

      ar = [
        `${e.name}`,
        `Eye color: ${e.eye_color}`,
        `Skin color: ${e.skin_color}`,
        `Hair color: ${e.hair_color}`,
        `Homeworld: ${homeworldJSON.name}`,
        `Films: ${filmsArr}`,
      ];
      setchardata(ar);
    } else if (selectedFilter === 1) {
      ar = [
        `${e.name}`,
        `Climate: ${e.climate}`,
        `Population: ${e.popilation}`,
        `Terrain: ${e.terrain}`,
      ];
      setchardata(ar);
    } else if (selectedFilter === 2) {
      ar = [
        `${e.name}`,
        `Model: ${e.model}`,
        `Manufacturer: ${e.manufacturer}`,
        `Length: ${e.length}`,
        `Crew size: ${e.crew}`,
      ];
      setchardata(ar);
    } else if (selectedFilter === 4) {
      ar = [
        `${e.name}`,
        `Classification: ${e.classification}`,
        `Designation: ${e.designation}`,
        `Average lifespan: ${e.average_lifespan}`,
        `Language: ${e.language}`,
      ];
      setchardata(ar);
    } else if (selectedFilter === 5) {
      ar = [
        `${e.name}`,
        `Model: ${e.model}`,
        `Manufacturer: ${e.manufacturer}`,
        `Length: ${e.length}`,
        `Crew size: ${e.crew}`,
      ];
      setchardata(ar);
    }
    setCharDataVisible(true);
  };
  //Way to put fetch into data variable
  //Needed a separate part when fetching movies since they had different response
  let listItems = data.map((value, index) => {
    if (selectedFilter === 3) {
      return <li key={index}>{value.title}</li>;
    } else {
      return <li key={index}>{value.name}</li>;
    }
  });

  //When filter is changed
  const handleSelect = (e) => {
    pagenumber = 1;
    setSelectedFilter(parseInt(e.target.value));
    clear();
    console.log(selectedFilter);
  };
  const handleNameChange = (e) => {
    setCharName(e.target.value);
  };

  //Clears screen
  const clear = () => {
    setData([]);
    setchardata([]);
    setDataIsVisible(false);
  };

  //Adds 1 to pagenumber and fetches again
  const nextPage = () => {
    if (pagenumber < maxPages) {
      let newPage = pagenumber + 1;
      pagenumber = newPage;
      fetchData();
      setCharDataVisible(false);
    }
  };
  //Same as above except pagenumber down
  const previousPage = () => {
    if (pagenumber > 1) {
      let oldPage = pagenumber - 1;
      pagenumber = oldPage;
      fetchData();
      setCharDataVisible(false);
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
      <div className="center">
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
          <div>
            <label>
              <input
                className="input"
                type="text"
                value={charName}
                onChange={handleNameChange}
              ></input>
              <button className="button" onClick={getMoreInfo}>
                More info
              </button>
            </label>
          </div>
        </div>
      </div>

      <div
        className="infoscreen"
        style={{ display: dataIsVisible ? "block" : "none" }}
      >
        <div style={{ float: "left" }}>
          <View className="infoview">
            <div style={{ display: "inline-block" }}>
              <ul className="dataList" style={{ listStyle: "none" }}>
                {listItems}
              </ul>
            </div>
          </View>
          <View>
            <div
              className="infoview"
              style={{ display: charDataVisible ? "block" : "none" }}
            >
              {chardata.map((chardata) => (
                <li style={{ listStyle: "none" }} key={chardata}>
                  {chardata}
                </li>
              ))}
            </div>
          </View>
        </div>
      </div>
    </div>
  );
}

export default Info;
