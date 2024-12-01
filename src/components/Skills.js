import React from "react";

const Skills = () => (
  <div className="row skill">
    <div className="three columns header-col">
      <h1>
        <span>Skills</span>
      </h1>
    </div>

    <div className="nine columns main-col">

      <div className="bars">
        <ul className="skills">
          <li>
            <span className="bar-expand photoshop" />
            <em>Photoshop</em>
          </li>
          <li>
            <span className="bar-expand csharp" />
            <em>C#</em>
          </li>
          <li>
            <span className="bar-expand aws" />
            <em>Amazon Web Services</em>
          </li>
          <li>
            <span className="bar-expand azure" />
            <em>Azure</em>
          </li>
          <li>
            <span className="bar-expand kubernetes" />
            <em>Kubernetes</em>
          </li>
          <li>
            <span className="bar-expand terraform" />
            <em>Terraform</em>
          </li>
          <li>
            <span className="bar-expand sql" />
            <em>SQL</em>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Skills;
