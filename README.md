## Description

**Share Place** is a SPA, that allows users to share their favorite places (with images and location) with other users. The project is intended for independent practice in order to gain skills in working with a full-stack architecture and structure of the project, as well as the basic technology stack.

## Technologies

The main frameworks and libraries used in the project are listed here. A complete list of technologies used for each part of the project is located in the package.json.

### Common

1. Docker
2. Git
3. Firebase
4. Google Maps API

### Frontend

1. React
2. React Material UI
3. Formik

### Backend

1. Node.js
2. Express
3. Mongoose
4. axios

### Database

1. MongoDB

## Installation

1. Install stable version 14 of [Node.js (LTS)](https://nodejs.org/en/).
2. Install latest version of [Docker Engine](https://www.docker.com/get-started) for your OS.
   On desktop systems like Docker Desktop for Mac and Windows, Docker Compose is included as part of those desktop installs.
   On Linux systems, first install the Docker Engine for your OS, then install [Docker Compose](https://docs.docker.com/compose/install/) on Linux systems by the command:
   `sudo apt install docker-compose`
   Verify Docker Compose Installation with command:
   `docker-compose --version`
3. Clone project [repository](https://github.com/SerhiiUnhurian/share-places-app):
   ```
   git clone git@github.com:SerhiiUnhurian/share-places-app.git
   ```
4. Run the following command in the project root:
   ```
   docker-compose up
   ```
5. Open `http://localhost:3000` in your browser.
