import "./About.css";

function About() {
  return (
    <div className="About">
      <div className="left">
        <p>This API reader is my advanced web development course project. </p>
        <p>
          It uses open api{" "}
          <a
            href="https://swapi.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            "https://swapi.dev/"
          </a>
          and with fetch we can get data in JSON format.
        </p>
      </div>
    </div>
  );
}
export default About;
