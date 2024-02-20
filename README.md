

# Altona Gators Basketball Club Coach Training System

The Altona Gators Basketball Club is renowned for its excellence in delivering top-tier basketball programs, catering to both junior and senior levels. Under the leadership of the Director of Coaching, Randy Shanklin, the club is embarking on a groundbreaking initiative. This endeavour aims to revolutionize the coaching experience by offering an integrated training platform designed to empower both new and experienced coaches.

## Project Overview

Our vision is to create an all-encompassing coaching resource that equips coaches with a rich repository of training materials. These materials will include a diverse array of content such as diagrams, textual resources, and instructional videos, culminating in a comprehensive coaches' certification assessment.

# Background Information:

Altona Gators Basketball Club (code: AL)
The Altona Gators Basketball Club offers a representative-level basketball program at both junior and senior levels. The Director of Coaching, Randy Shanklin, is looking to develop a program to present training materials for coaches (both new and existing). These materials include diagrams, text, and videos, resulting in a coach certification assessment.

The Director of Coaching, Randy Shanklin, is looking to develop a program to present training materials for coaches (both new and existing). These materials include diagrams, text, and videos, resulting in a coach certification assessment. There should be logins for an administrator (the director of coaching). From this login, the administrator should be able to add and delete new materials as the coaching program changes or expands. The administrator should be able to create logins for coaches (and also delete access to coaches who have left the program). The administrator should be able to select which materials are visible to which coach (e.g., depending on which level, age group, gender) the coach is coaching. There should also be a login screen for coaches. Once they log in, they should only be able to access the materials that have been selected for them.

###### Industry Partner: Randy Shanklin

# Team Members:

| Name           | Role                                            | Email                            |
| -------------- | ----------------------------------------------- | -------------------------------- |
| Xunhai Wang    | Front End Developer, UX Researcher              | xunhaiw@student.unimelb.edu.au   |
| Youcheng Zhang | Software engineer, system architect             | youczhang@student.unimelb.edu.au |
| Murong Gu      | Scurm Master, Product Owner                     | murong@student.unimelb.edu.au    |
| Xintao Chen    | Quality Assurance, Full-stack software engineer | xintaoc1@student.unimelb.edu.au  |
| Haonan Tao     | UI&Front End Developer, Scrum Master            | hatao@student.unimelb.edu.au     |
| Randy Shanklin | The coach of Altona Basketball                  | randy.shanklin@gators.net.au     |

# External link of our project management:

Sprint1 Trello:[https://trello.com/b/BS3IrGHT/sprint-1-1-aug-18-aug](https://trello.com/b/BS3IrGHT/sprint-1-1-aug-18-aug?filter=member:youchengzhang)

Sprint2 Trello:https://trello.com/b/l0SxRlUT/sprint-2-21-aug-22-sep

Sprint3 Trello:https://trello.com/b/F7J2zhEL/sprint-3-25-sep-20-oct

Sprint4 Trello:https://trello.com/b/r5B94f00/sprint-4-product-handover28-oct-3-nov

Github:https://github.com/COMP90082-2023-SM2/AL-Bluering

Confluence Link:https://confluence.cis.unimelb.edu.au:8443/display/COMP900822023SM2ALBlueRing/Home

Deploy Webpage Link http://13.239.40.255/

## Features and Functionalities

### Administrator Dashboard

- **Admin Login**: The system grants exclusive access to an administrator. This login provides an elevated level of control and privileges.

- **Material Management**: The administrator can efficiently manage training materials. This includes adding new materials and removing outdated or redundant content, ensuring that the coaching program remains up-to-date and dynamic.

- **Coach Access Control**: The administrator possesses the authority to create and manage coach accounts. This functionality extends to revoking access for coaches who are no longer part of the program.

- **Content Customization**: The administrator can tailor the visibility of training materials for individual coaches based on age groups.

## Benefits

The Altona Gators Basketball Club Coach Training System represents a transformative leap in how coaching materials are managed and delivered within our organization. By centralizing resources, tailoring content, and streamlining the certification process, we aim to:

- Elevate coaching standards and proficiency.
- Facilitate ongoing professional development for coaches.
- Enhance the overall coaching experience for coaches.
- Ensure alignment with the evolving needs of our coaching program.

# Altona Gators Basketball Club Coach Training System

This repository contains the backend codebase for the Altona Gators Basketball Club Coach Training System. The system is designed to manage coaching resources and materials.

## Installation and Usage

To set up the project in **development mode**, follow these steps:

1. **Clone the Repository:**

   ```bash
    git clone https://github.com/COMP90082-2023-SM2/AL-Bluering.git
   ```

2. **Install denpendency:**

   ```bash
    cd src/al-bluering-backend
    npm install
    cd ../al-bluering-frontend
    npm install
   ```

3. **Set environments**
   Set environments of both frontend and backend to _develepment environment_

   ```javascript
   // in both /al-bluering-frontend/src/api/ajax.js
   // and /al-bluering-backend/server.js
   
   // Modify constant as following
   const env = "DEV";
   ```

4. **Start the server for both backend and frontend:**
   Once the project is set up, you should prepare two terminal and run the following code to start servers:
   For backend:

   ```bash
    cd al-bluering-backend
    node server.js
   ```

   For frontend:

   ```bash
    cd al-bluering-frontend
    npm start
   ```

5. **(extra) deploy product**
   in /src/al-bluring-frontend, you can deploy the frontend product by running following command:

   you should switch frontend environment into _deploy environment_

   ```javascript
   // in /al-bluering-frontend/src/api/ajax.js

   // Modify constant as following
   const env = "DEP";
   ```

   then run the command in /al-bluering-frontend

   ```bash
    npm run-script build
   ```

## Project Structure

The project is organized into the following directories and files:

```
src/
│
├── al-bluering-backend
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ ├── node_modules/
│ ├── package-lock.json
│ ├── package.json
│ ├── server.js
│ └──.gitignore
│
├── al-bluering-frontend
│ ├── public/
│ ├── src
│ │ ├── api/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── config/
│ │ ├── page/
│ │ ├── redux/
│ │ ├── utils/
│ │ ├── App.js
│ │ ├── index.js
│ │ └── setupProxy.js
│ │
│ ├── node_modules/
│ ├── craco.config.js
│ ├── package-lock.json
│ ├── package.json
│ └── .gitignore
│
├── README.md
└── .gitignore
```

## Frontend

### Root Directory (/al-bluring-frontend)

- **.gitignore**: Git ignore file to specify files and directories that should be excluded from version control.
- **package-lock.json**: Auto-generated file used for tracking npm package versions.
- **package.json**: Node.js project configuration file.
- **README.md**: This documentation file.
- **craco.config.js**: config file for applying craco as scaffolding.

### `public/` Directory

Static pages including html and css files used in whole project

### `src/` Directory

Main items dinamicly used during development of the project

- **App.js**: Root component of the system
- **index.js**: Entry file of the system
- **setupProxy.js**: config file for set up a proxy to communicate with backend.

### `api/` Directory

Contains set-up, sending, receiving, pre-modifying, error-handling of http requests communicating with backend

- **ajax.js**: Customized packaging axios functions for sending different type of requests.
- **index.js**: Contains all requests.

### `assets/` Directory

Contains static documents used for the project.

- **img/**: images used for the project

### `components/` Directory

Defines components used in the project. Each component are reusable, customizable.

For each component, several files are contained as follow:

```bash
  components
  ├── example-component/
  │ ├── example-component.jsx
  │ └── example-component.less
  └── ...
```

- **example-component.jsx**: Structure and Event handling for the component.
- **example-component.less**: Style used for the component

### `config/` Directory

Configuration files for the project.

- **menuConfig.jsx**: sider bar navigator generation configuration file.

### `page/` Directory

Defines pages used in the project. Each will be navigated by an unique route. Each page may contain multiple number, multiple types of components.

For each page, several files are contained as follow:

```bash
  pages
  ├── example-page/
  │ ├── example-sub-page/
  │ ├── example-page.jsx
  │ └── example-page.less
  ├── ...
  └── Constructure.jsx
```

- **example-page.jsx**: Structure and Event handling for the page.
- **example-page.less**: Style used for the page
- **example-sub-page/**: Another page contained inside the page
- **Constructure.less**: A routes list contained the whole structure of the pages

### `redux/` Directory

A middleware to manage the state of components/pages which need to communicate with another component/page

The structure are shown as follow:

```bash
  redux
  ├── actions/
  ├── reducers/
  ├── constants.js
  └── store.jsx
```

- **actions/**: Register actions that modifies the state need to managed
- **reducers/**: Contains actual algorithm of each actions
- **constants**: Constants used to identify different actions
- **store**: Setting of store that stores the actions and states

### `utils/` Directory

Utility functions and helper modules.

- **Firebase**: Utility for connecting to online firebase server to store files.
- **storage**: Utility for storing tokens of authentication infomation.

### Dependencies

- **@testing-library/jest-dom** (^5.17.0): Library for providing DOM matchers in Jest tests, making it easier to test DOM elements.
- **@testing-library/react** (^13.4.0): Provides utility tools and functions for testing React components.
- **@testing-library/user-event** (^13.5.0): Library for simulating user events (e.g., clicks, input) for testing user interactions in React components.
- **antd** (^5.8.3): React component library for Ant Design, offering a rich set of UI components for building modern web applications.
- **axios** (^1.4.0): Promise-based library for making HTTP requests, commonly used for data interactions with backend APIs.
- **babel-plugin-import** (^1.13.8): Babel plugin for importing styles and components on-demand, reducing the size of your application bundle.
- **craco** (0.0.3): Configuration extension tool for Create React App, allowing customization of Webpack and Babel configurations for React applications.
- **craco-less** (^3.0.1): Craco plugin for handling Less stylesheets compilation and configuration.
- **firebase** (^10.3.1): JavaScript SDK for Google Firebase platform, used for building web applications and performing tasks like user authentication, data storage, and real-time database operations.
- **http-proxy-middleware** (^2.0.6): Express middleware for proxying HTTP requests to different targets during development, typically used to address cross-origin request issues.
- **jwt-decode** (^3.1.2): Library for decoding JSON Web Tokens (JWT), useful for parsing and verifying identity tokens on the frontend.
- **less** (^4.2.0): CSS preprocessor for writing extendable styles.
- **less-loader** (^11.1.3): Webpack loader for processing Less files and compiling them into CSS.
- **react** (^18.2.0): JavaScript library for building user interfaces using a component-based approach, core for building React applications.
- **react-dom** (^18.2.0): React library's DOM renderer for rendering React components in the browser.
- **react-redux** (^8.1.2): State management library for React applications, used for managing global application state and data flow.
- **react-router-dom** (^6.15.0): React routing library for handling navigation and routing in single-page applications.
- **react-scripts** (5.0.1): Core scripts and configuration for Create React App, enabling quick setup of React projects.
- **redux** (^4.1.2): JavaScript state management library for building predictable application state containers.
- **redux-devtools-extension** (^2.13.9): Extension for Redux DevTools, facilitating debugging and monitoring of Redux states during development.
- **redux-persist** (^6.0.0): Library for state persistence in Redux, typically used to store application states in local storage.
- **redux-thunk** (^2.4.1): Middleware for Redux that handles asynchronous operations, allowing asynchronous actions in Redux.
- **store** (^2.0.12): Lightweight JavaScript library for managing global state and data storage.
- **web-vitals** (^2.1.4): Library for monitoring web performance metrics (e.g., page load times, interactivity), aiding in optimizing web application performance.

## Backend

### Root Directory (/al-bluring-backend)

- **.gitignore**: Git ignore file to specify files and directories that should be excluded from version control.
- **package-lock.json**: Auto-generated file used for tracking npm package versions.
- **package.json**: Node.js project configuration file.
- **README.md**: This documentation file.
- **server.js**: The entry point of the backend server.

### `config/` Directory

Configuration files for the project.

- **db.config.js**: Database configuration file.

### `controllers/` Directory

Contains route controllers that handle HTTP requests.

- **administratorController.js**: Controller for managing administrators.
- **ageGroupController.js**: Controller for managing age groups.
- **coacherController.js**: Controller for managing coaches.
- **materialController.js**: Controller for managing training materials.
- **moduleController.js**: Controller for managing modules.

### `models/` Directory

Defines Mongoose data models for the project.

- **Administrators.model.js**: Model for administrators.
- **AgeGroups.model.js**: Model for age groups.
- **Assessments.model.js**: Model for assessments.
- **Coaches.model.js**: Model for coaches.
- **FileMaterials.model.js**: Model for file-based materials.
- **Materials.model.js**: Model for training materials.
- **Modules.model.js**: Model for modules.
- **TextureMaterials.model.js.js**: Model for texture-based materials.

### `routes/` Directory

Route definitions and API endpoints.

- **administratorRoute.js**: Routes for administrator-related operations.
- **ageGroupRoute.js**: Routes for age group-related operations.
- **classRoute.js**: Routes for class-related operations.
- **coacherRoute.js**: Routes for coach-related operations.
- **materialRoute.js**: Routes for material-related operations.
- **moduleRoute.js**: Routes for module-related operations.

### `services/` Directory

Custom service modules.

- **administratorService.js**: Service for administrator-related operations.
- **ageGroupService.js**: Service for age group-related operations.
- **classService.js**: Service for class-related operations.
- **coacherService.js**: Service for coach-related operations.
- **materialService.js**: Service for material-related operations.
- **moduleService.js**: Service for module-related operations.

### `utils/` Directory

Utility functions and helper modules.

- **token.js**: Utility for handling tokens.

### Dependencies

- **bcrypt** (^5.1.1): Library for hashing passwords for security.
- **cors** (^2.8.5): Middleware for handling Cross-Origin Resource Sharing (CORS).
- **express** (^4.18.2): Web application framework for Node.js.
- **jsonwebtoken** (^9.0.2): Used for authentication and token generation.
- **mongoose** (^6.11.1): Object Data Modeling (ODM) library for MongoDB.

## MongoDB Database Structure

This section outlines the structure of the MongoDB database used in the Altona Gators Basketball Club Coach Training System. It is based on the defined Mongoose schemas for each model.

### Collections and Models

#### Administrators

- **Collection Name:** `administrators`
- **Description:** This collection stores information about administrators who have access to the system.
- **Fields:**
  - `firstName` (String): The first name of the administrator (default: "firstName").
  - `middleName` (String): The middle name of the administrator (default: "middleName").
  - `lastName` (String): The last name of the administrator (default: "lastName").
  - `loginID` (String): The unique login ID of the administrator (required).
  - `password` (String): The hashed password of the administrator (required).
  - `description` (String): A brief description of the administrator.
  - `age` (Number): The age of the administrator.
  - `address` (String): The address of the administrator.
  - `phone` (String): The phone number of the administrator.

#### AgeGroups

- **Collection Name:** `agegroups`
- **Description:** This collection stores information about age groups in the basketball club's coaching program.
- **Fields:**
  - `name` (String): The name of the age group (required and unique).
  - `coaches` (Array of ObjectIds): References to coaches associated with the age group.
  - `modules` (Array of ObjectIds): References to third-level modules associated with the age group.

#### Assessments

- **Collection Name:** `assessments`
- **Description:** This collection contains information about assessments.
- **Fields:**
  - `description` (String): A description of the assessment.
  - `isAnswerVisible` (Boolean): Indicates if assessment answers are visible (default: false, required).
  - `questions` (Array): An array of assessment questions, each containing:
    - `id` (Number): A unique identifier for the question.
    - `question` (String): The question text.
    - `choices` (Array of Objects): Choices for the question, each containing an `id` and `choice`.
    - `correctAnswer` (Number): The index of the correct choice.
  - `name` (String): The name of the assessment (required).
  - `lastModified` (Date): The date when the assessment was last modified.

#### Coaches

- **Collection Name:** `coaches`
- **Description:** This collection stores information about coaches involved in the coaching program.
- **Fields:**
  - `firstName` (String): The first name of the coach (default: "firstName").
  - `middleName` (String): The middle name of the coach (default: "middleName").
  - `lastName` (String): The last name of the coach (default: "lastName").
  - `loginID` (String): The unique login ID of the coach (required).
  - `password` (String): The hashed password of the coach (required).
  - `age` (Number): The age of the coach.
  - `address` (String): The address of the coach.
  - `phone` (String): The phone number of the coach.
  - `description` (String): A brief description of the coach.

#### FileMaterials

- **Collection Name:** `filematerials`
- **Description:** This collection stores information about file-based training materials.
- **Fields:**
  - `url` (String): The URL of the file.
  - `description` (String): A description of the material.
  - `name` (String): The name of the material (required).
  - `lastModified` (Date): The date when the material was last modified.

#### Materials

- **Collection Name:** `materials`
- **Description:** This collection represents various types of training materials.
- **Fields:**
  - `type` (String): The type of material (required).
  - `fileMaterials` (ObjectId): Reference to file-based materials.
  - `textureMaterials` (ObjectId): Reference to texture-based materials.
  - `assessment` (ObjectId): Reference to assessments.

#### Modules

- **Collection Name:** `modules`
- **Description:** This collection represents the modules that comprise the coaching program.
- **Fields:**
  - `name` (String): The name of the module (required and unique).
  - `father_id` (ObjectId): Reference to the parent module.
  - `level` (Number): The level of the module (1, 2, or 3).
  - `materials` (Array of Objects): Material references, each containing the material type and ID.

#### TextureMaterials

- **Collection Name:** `texturematerials`
- **Description:** This collection stores information about texture-based training materials.
- **Fields:**
  - `content` (String): The content of the material.
  - `name` (String): The name of the material (required).
  - `lastModified` (Date): The date when the material was last modified.


# Test Cases

This is a simple README for the pytest test cases for your project. The following instructions explain how to run the tests and how to add more test cases.

## Running the Tests

1. Make sure you have the necessary dependencies and environment set up for your project.

2. Open a terminal/command prompt in the project directory.

3. To run the tests, use the following command:

   ```bash
   python test.py

## Adding More Test Cases
To add more test cases, follow these steps:

1. Open the test file where your existing test cases are located. In this example, the file is named test_file_name.py.

2. Define a new test case function using the def test_case_name(self): format. Ensure that the function name starts with "test_" to be automatically discovered by pytest.

3. Within the test case function, you can perform the necessary setup, make requests, and use assertions to check the expected outcomes.

4. If required, create a teardown method using def tearDown(self): to clean up after the test case. This step is optional, but it can be useful for releasing any resources or cleaning up the environment.

5. Save your changes to the test file.

6. Open a terminal/command prompt in the project directory.

7. Run the tests again using the pytest command as described in the "Running the Tests" section.

pytest will automatically discover and run the new test cases you've added.


> > > > > > >

# Format

More information: https://gators.net.au/Links to an external site.

├── docs/ # Documentation files

All the Documentation of each sprint

├── src/ # src code

Files of each sprint

└── README.md #keep updating according to each sprint incremental

## Sprint 1 includes:

###

### Requirement Artefacts

- Coding Standard
- Basic agile process explanation
- Personas
- Motivational Model
- User Stories

### Design Artefacts

- Architecture Model
- Prototype
- API Design Document

### Meeting Minutes (only displayed in confluence)

- Client Meeting
- Supervisor
- Team Meetings (internal and external)

### Sprint1 workflows

- Burndown Chart of Sprint1
- Sprint 1 Assessment Checklist
- Sprint 1 Planning
- Sprint 1 Review
- Sprint 1 Retrospective
- The plan for Sprint 2 & 3

# Sprint 2 includes:

### Requirement Artefacts

- Personas
- Basic agile process explanation
- DO-BE-FEEL Model
- Motivational Model
- User Stories Versions
- Task priority assigned
- Story points assigned
- Scope of Project

### Design Artefacts

- Architecture Model (Domain, Design, Database models)

- Prototype Versions

- API Design Document Versions
- Database Schemas Versions
- Stakeholder Analysis

### Quality Assurance:

- Code Review of FrontEnd
- Code Review of BackEnd
- Coding Standard Versions
- Repository Guide
- Unit Test Cases

### Risk Management:

- Governance Plan
- Team Risk Management Plan
- Threat Modeling

### Consideration:

- Ethical Consideration
- Cyber Security Consideration

### Production Demonstration:

- Deploy Link

### Meeting Minutes (only displayed in confluence)

- Client Meetings
- Supervisor Meetings
- Team Meetings (internal and external)

### Sprint2 workflows

- Burndown Chart of Sprint2

- Sprint 2 Assessment Checklist

- Sprint 2 Planning

- Sprint 2 Review

- Sprint 2 Retrospective

- The plan for Sprint 2 improvement

- The plan for Sprint 3


# Sprint 3 includes:

### Requirement Artefacts

- Personas
- Basic agile process explanation
- DO-BE-FEEL Model
- Motivational Model
- User Stories Versions
- Task priority assigned
- Story points assigned
- Scope of Project
- User Manual
- Final Presentation Slides

### Design Artefacts

- Architecture Model (Domain, Design, Database models)
- Prototype Versions
- API Design Document Versions
- Database Schemas Versions
- Stakeholder Analysis

### Quality Assurance:

- Code Review of FrontEnd
- Code Review of BackEnd
- Coding Standard Versions
- Repository Guide
- Unit Test Cases(data samples and tests folder)

### Risk Management:

- Governance Plan
- Team Risk Management Plan
- Threat Modeling

### Consideration:

- Ethical Consideration
- Cyber Security Consideration

### Production Demonstration:

- Deploy Link

### Meeting Minutes (only displayed in confluence)

- Client Meetings
- Supervisor Meetings
- Team Meetings (internal and external)

### Sprint3 workflows

- Burndown Chart of Sprint3

- Sprint 3 Assessment Checklist

- Sprint 3 Planning

- Sprint 3 Review

- Sprint 3 Retrospective

- The plan for Sprint 3 improvement

- The plan for Sprint 4

# Sprint 4 includes:

### Requirement Artefacts

- Personas
- Basic agile process explanation
- DO-BE-FEEL Model
- Motivational Model
- User Stories Versions
- Task priority assigned
- Story points assigned
- Scope of Project
- User Manual
- Final Presentation Slides
- Client Handover Confirmation 
- Server Deployment
- Final Project Demo

### Design Artefacts

- Architecture Model (Domain, Design, Database models)
- Prototype Versions
- API Design Document Versions
- Database Schemas Versions
- Stakeholder Analysis

### Quality Assurance:

- Code Review of FrontEnd
- Code Review of BackEnd
- Coding Standard Versions
- Repository Guide
- Unit Test Cases(data samples and tests folder)

### Risk Management:

- Governance Plan
- Team Risk Management Plan
- Threat Modeling

### Consideration:

- Ethical Consideration
- Cyber Security Consideration

### Production Demonstration:

- Deploy Link

### Meeting Minutes (only displayed in confluence)

- Client Meetings
- Supervisor Meetings
- Team Meetings (internal and external)

### Sprint4 workflows

- Sprint 4 Assessment Checklist
- Sprint 4 Planning
- Sprint 4 Review
- Sprint 4 Retrospective
- The plan for Sprint 4 improvement

# 
