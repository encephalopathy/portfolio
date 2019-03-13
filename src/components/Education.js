import React from "react";

const Education = () => (
  <div className="row education">
    <div className="three columns header-col">
      <h1>
        <span>Education</span>
      </h1>
    </div>

    <div className="nine columns main-col">
      <div className="row item">
        <div className="twelve columns">
          <h3>University of California Santa Cruz</h3>
          <p className="info">
            Computer Science Game Design
            <span>&bull;</span>
            <em className="date">June 2013</em>
          </p>

          <p>
            Worked with the Computational Cinematic Studio departments to help
            create the most innovative and visual stunning pieces of art known to digital entertainment.
            Some of my contributions have been used in publications at SIGGRAPH, one of the most prestiges
            visual effects and computer graphics conferences in the world.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Education;
