import React from "react";

const Work = () => (
  <div className="row work">
    <div className="three columns header-col">
      <h1>
        <span>Work</span>
      </h1>
    </div>

    <div className="nine columns main-col">
      <div className="row item">
        <div className="twelve columns">
          <h3>Zero Hour Games</h3>
          <p className="info">
            Network Programmer
            <span>&bull;</span>
            <em className="date">February 2013 - Present</em>
          </p>

          <p>
            Responsible for the development for all engine, gameplay, UI menu components needed for the Development
            of CLIMB! an over the top mountain climbing simulator.
          </p>
        </div>
      </div>

      <div className="row item">
        <div className="twelve columns">
          <h3>Madcap Software</h3>
          <p className="info">
            Software Engineer
            <span>&bull;</span>
            <em className="date">June 2015 - March 2018</em>
          </p>
          <p>
            Full-Stack development for our features for MadCap Central, our project management software product. Primarily responsible for
            development of features for our UI related to task management, and improving
            performance for all our existing feature sets end-to-end. Also responsible fixing any critical
            UI related issues from customer support.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Work;
