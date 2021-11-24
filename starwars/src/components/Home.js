import React from "react";
import "./Home.css";

function Home() {
  //Could have done propably after h1 like this: <div className="middle"><p></p><p></p><p></p></div>
  return (
    <div className="Home">
      <div className="scroll">
        <h1 className="header_home">Welcome</h1>

        <p className="middle">
          You have chosen the path to enlightenment. Here you can find knowledge
          about Star Wars movie franchise.
        </p>
        <p className="middle">
          Start by cliking the "GET INFO" button and selecting the information
          you want to find.
        </p>
        <p className="middle">
          If you want information about this project, click "ABOUT" button.
        </p>
      </div>
    </div>
  );
}
export default Home;
