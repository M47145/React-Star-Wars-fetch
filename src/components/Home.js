import React from "react";
import { View } from "react-native";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <View>
        <h1 className="header_home">Welcome</h1>
        <p2 className="middle">
          You have chosen the path to enlightenment. Here you can find knowledge
          about Star Wars movie franchise.
        </p2>
        <p3 className="middle">
          Start by cliking the "GET INFO" button and selecting the information
          you want to find.
        </p3>
        <p4 className="middle">
          If you want information about this project, click "ABOUT" button.
        </p4>
      </View>
    </div>
  );
}
export default Home;
