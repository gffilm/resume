import React from 'react'

const App: React.FC = () => {
  return (
     <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
        <p><a target="_blank" className="btn btn-primary" href="assets/gershon-fiedler-resume.pdf">
          <b>Download PDF Version</b>
        </a></p>
        <a className="navbar-brand js-scroll-trigger" href="#page-top">
          <span className="d-none d-lg-block">
            <img className="img-fluid img-profile rounded-circle mx-auto mb-2" src="img/profile.png" alt="" />
          </span>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#experience">Experience</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#education">Education</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#skills">Skills</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#portfolio">Portfolio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#interests">Interests</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#awards">Awards</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid p-0">

         <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="about">
      <div className="w-100">
        <h1 className="mb-0">Gershon
          <span className="text-primary">Fiedler</span>
        </h1>
        <div className="subheading mb-5">Skokie, IL 60076 · (224) 392-2996 ·
          <a href="mailto:gershon.fiedler@gmail.com">gershon.fiedler@gmail.com</a>
        </div>
        <p className="lead mb-5">I am a full stack application developer with 10+ years of experience coding with multiple languages & frameworks. As an experienced software developer, I have a passion for writing clean and extendable code that solves complex problems. I take pride in my ability to build high-quality applications that deliver value to users. My attention to detail and commitment to best practices ensures that my code is easy to read, maintain, and scale.</p>
        <div className="social-icons" >
          <a href="https://www.linkedin.com/in/gershon-fiedler-15528717/" target="_blank">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/gffilm" target="_blank">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </section>

    <hr className="m-0" />

    <section className="resume-section p-3 p-lg-5 d-flex justify-content-center" id="experience">
      <div className="w-100">
        <h2 className="mb-5">Experience</h2>

        <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div className="resume-content">
            <h3 className="mb-0">Lead Application Developer</h3>
            <div className="subheading mb-3">Learning Pool</div>
             <ul>
              <li>Developed an application to automate localization by combining results from multiple AI translation vendors including DeepL, Google Translate, Amazon, Systran and Microsoft, leveraging the strengths of each while reducing time and costs by two orders of magnitude.</li>
              <li>Created an application to train managers on how to deal with difficult situations in the workplace by engaging them in simulated exercises. Utilizing ChatGPT along with WhisperAI and elevenLabs for speech-to-text and text-to-speech, it provides a seamless environment for managers to have a conversation with AI enabled employees with minimal latency and provides feedback and scores for how they can better handle their conversations.</li>
              <li>Demonstrated proficiency in converting manual day-to-day processes into automated solutions: SSO configurations into web application forms and processing; Conversion of manual queries and inserts into application level processes; testable and verifiable automated processes.  </li>
            </ul>
          </div>
          <div className="resume-date text-md-right">
            <span className="text-primary">December 2021 - Present</span>
          </div>
        </div>

        <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div className="resume-content">
            <h3 className="mb-0">Lead Application Developer</h3>
            <div className="subheading mb-3">True Office</div>
              <p>Engineered a Learning Management System from the ground up, now with fortune 500 clients and with millions of users. The system includes the following togglable and customizable features:</p>
              <ul>
                <li>Localization support for multiple languages with ability to import localization data</li>
                <li>Unlimited Role and permissions</li>
                <li>Multiple methods of ingesting client data from manual forms, excel spreadsheets, to automated SFTP batches</li>
                <li>Automated scheduled event handler and processors for enrollments and emails</li>
                <li>Auditing controls and logs</li>
                <li>Localized Email processing, push notifications and macro encoded values</li>
                <li>Secure custom report generator in a role based, easy to operate, filtering system</li>
              </ul>
            <p>Provided level III support for local and international clients</p> 
          </div>
          <div className="resume-date text-md-right">
            <span className="text-primary">April 2015 - December 2021</span>
          </div>
        </div>

        <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div className="resume-content">
            <h3 className="mb-0">Web Developer</h3>
            <div className="subheading mb-3">Corpedia</div>
              <ul>
                <li>Created custom online course player for HTML5</li>
                <li>Created tools to easily convert word and excel documents into an online interactive course</li>
                <li>Developed tools that reduced costs on multiple levels of the company's applications and workflows.</li>
                <li>Created applications that reduced need for repetitive and manual inputs</li>
                <li>Converted static designs into HTML web pages</li>
              </ul>
          </div>
          <div className="resume-date text-md-right">
            <span className="text-primary">May 2011 - April 2015</span>
          </div>
        </div>

        <div className="resume-item d-flex flex-column flex-md-row justify-content-between">
          <div className="resume-content">
            <h3 className="mb-0">Web & Graphic Designer</h3>
            <div className="subheading mb-3">Comcast</div>
              <ul>
                <li>Created national branded TV spots and enhanced them with customized scripts to create cutting edge motion graphics.</li>
                <li>Designed corporate website</li>
              </ul>
          </div>
          <div className="resume-date text-md-right">
            <span className="text-primary">August 2005 - May 2010</span>
          </div>
        </div>

      </div>

    </section>

    <hr className="m-0" />

    <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="education">
      <div className="w-100">
        <h2 className="mb-5">Education</h2>

        <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div className="resume-content">
            <h3 className="mb-0">Columbia College Chicago</h3>
            <div className="subheading mb-3">Bachelor of Arts</div>
            <div>Film & Television</div>
          </div>
          <div className="resume-date text-md-right">
            <span className="text-primary">August 2002 - May 2004</span>
          </div>
        </div>

        <div className="resume-item d-flex flex-column flex-md-row justify-content-between">
          <div className="resume-content">
            <h3 className="mb-0">University of Illinois at Chicago</h3>
            <div className="subheading mb-3">Art & Design Program</div>
          </div>
          <div className="resume-date text-md-right">
            <span className="text-primary">August 2000 - May 2002</span>
          </div>
        </div>

      </div>
    </section>

    <hr className="m-0" />

    <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="skills">
      <div className="w-100">
        <h2 className="mb-5">Skills</h2>

        <div className="subheading mb-3">Programming Languages</div>
        <ul className="list-inline dev-icons">
          <li className="list-inline-item"><i className="fab fa-angular"></i> Angular</li>
          <li className="list-inline-item"><i className="fab fa-react"></i> React</li>
          <li className="list-inline-item"><i className="fab fa-node-js"></i> Node</li>
          <li className="list-inline-item"><i className="fab fa-php"></i> PHP</li>
          <li className="list-inline-item"><i className="fab fa-js"></i> Typescript</li>
          <li className="list-inline-item"><i className="fab fa-python"></i> Python</li>
          <li className="list-inline-item"><i className="fas fa-chart-line"></i> Analytics</li>
          <li className="list-inline-item"><i className="fas fa-database"></i> MYSQL, NOSQL</li>
          <li className="list-inline-item"><i className="fab fa-html5"></i> HTML5 / CSS3</li>
          <li className="list-inline-item"><i className="fas fa-database"></i> MSSQL, MYSQL, PostgreSQL</li>
        </ul>

        <div className="subheading mb-3">Methods & Services</div>
        <ul className="list-inline dev-icons">
          <li className="list-inline-item"><i className="fas fa-code"></i> DRY Extendable code</li>

          <li className="list-inline-item"><i className="fas fa-vial"></i>Test Driven Development</li>
          <li className="list-inline-item"><i className="fas fa-chart-line"></i> Analytics</li>
          <li className="list-inline-item"><i className="fas fa-plug"></i> API Integration</li>
          <li className="list-inline-item"><i className="fas fa-universal-access"></i> Accessibility, Responsive Design</li>
          <li className="list-inline-item"><i className="fas fa-eye"></i> Code Review</li>
          <li className="list-inline-item"><i className="fab fa-github"></i> GIT, Mercurial HG, Subversion</li>
          <li className="list-inline-item"><i className="fas fa-tasks"></i> Insight, Redmine, Onetime, ServiceNow</li>
          <li className="list-inline-item"><i className="fas fa-user-friends"></i> Agile, Scrum</li>
          <li className="list-inline-item"><i className="fab fa-git"></i> GIT & HG</li>
          <li className="list-inline-item"><i className="fas fa-table"></i> Relational DB, Normalization</li>
        </ul>

        <div className="subheading mb-3">Workflow</div>
        <ul className="fa-ul mb-0">
           <li>
            <i className="fa-li fa fa-check"></i>
            Agile Development &amp; Scrum</li>
          <li>
            <i className="fa-li fa fa-check"></i>
            Mobile-First, Responsive Design</li>
          <li>
            <i className="fa-li fa fa-check"></i>
            Cross Browser Testing &amp; Debugging</li>
          <li>
            <i className="fa-li fa fa-check"></i>
            Cross Functional Teams</li>
        </ul>
      </div>
    </section>

    <hr className="m-0" />

    <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="portfolio" >
      <div className="w-100">
        <h2 className="mb-5">Portfolio</h2>

        <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div className="resume-content">
            <h3 className="mb-0">Learn IO</h3>
            <div className="subheading mb-3">A streamlined LMS to fit your company's needs</div>
            <img className="img-fluid mx-auto mb-2" src="img/learnio.jpg" alt="" />
            <div>Project Description: One of the most easy-to-use yet powerful learning management systems out there. Check it out with this <a href="learn.trueoffice.com">learn.trueoffice.com</a>.</div>
          </div>
        </div>


        <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div className="resume-content">
            <h3 className="mb-0">Pactools</h3>
            <div className="subheading mb-3">A toolset for internal resources</div>
            <img className="img-fluid mx-auto mb-2" src="img/pactools.jpg" alt="" />
            <div>Project Description: he behind the scenes set of tools that provides the engine for Learn IO's functionality</div>
          </div>
        </div>

      </div>
    </section>

    <hr className="m-0" />

    <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="interests">
      <div className="w-100">
        <h2 className="mb-5">Interests</h2>
        <p>Apart from being a web developer and father of four, I enjoy most of my time being outdoors. In the winter, I am an avid skier. During the warmer months I enjoy mountain biking, kayaking and camping.</p>
        <p className="mb-0">I spend a large amount of my free time exploring the latest technology advancements in the web development world.</p>
      </div>
    </section>

    <hr className="m-0" />

    <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="awards">
      <div className="w-100">
        <h2 className="mb-5">Awards &amp; Certifications</h2>
        <ul className="fa-ul mb-0">
          <li>
            <i className="fa-li fa fa-trophy text-warning"></i>
            2021 - Brandon Hill SILVER: Excellence in Technology Award</li>
          <li>
            <i className="fa-li fa fa-trophy text-warning"></i>
            2020 - Brandon Hill GOLD: Excellence in Technology Award</li>
          <li>
            <i className="fa-li fa fa-trophy text-warning"></i>
            2005 - Emmy Award GOLD for excellence in short program
          </li>
        </ul>
      </div>
    </section>

      </div>
    </>
  )
}

export default App
