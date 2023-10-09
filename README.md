# Help Desk

[![MIT license](https://img.shields.io/badge/License-MIT-blue)](https://lbesson.mit-license.org)

## Description

A link to the deployed site can be found [here]()

Screenshots of deployed application:

Homepage:
![homepage]()

Login:
![login]()

View Ticket:
![view ticket]()

Chat Modal:
![chat modal]()

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Test](#test)
- [Questions](#questions)
- [Credit](#credit)

## Installation

### Programs needed for this project:

- GitBash (windows) or Terminal (Mac)
- Node.js
- mySQL2
- Insomnia

Locate a suitable place where you would like to download this repository. Once found, copy the repositories SSH or HTTPS to clone through the terminal or download the zipfile from GitHub. After it is downloaded, please ensure that node.js is installed. Once it is installed and at least version 18 or higher, go to your terminal, navigate to the directory that contains this repository. Once there, type in "npm i" to download the required dependencies.

Before launching the application, a mySQL server must be up and running. From the integrated terminal or the command line, please type in "mysql -u root -p" if your mysql account has a password or "mysql -u root" if you do not have a password set up. Once the server has been connected, please navigate to the db folder and type in "SOURCE schema.sql;".

Once the mySQL server is up and running please create a .env file at the level of server.js. Within that .env file be sure it looks like the following framework with your information filled in for the DB_user & DB_password:

![.env screenshot]()

When that .env file is completed navigate to the server.js level and open up a terminal and type in "npm run seed". From there type in "npm run start", "npm start", or "node server.js". Once the server is up, you should see a listening message in the terminal signaling it is on. Navigate over to a browser of your choice and go to http://localhost:3001 to interact with this application.

## Usage

This repository is allowed for use in a learning environment to evaluate and analyze.

## License

    Please see the MIT license found in the repository. To learn more, please click the license badge at the top of the README.MD

## Contributing

- Sequelize for their [modules](hhttps://sequelize.org/)
- mySQL2 for their [modules](https://www.npmjs.com/package/mysql2)
- dotenv for their [modules](https://www.npmjs.com/package/dotenv)
- Express for their [modules](https://expressjs.com/)
- nodemon for their [modules](https://www.npmjs.com/package/nodemon)
- Hyperplexed for their tutorials on [CSS animations](https://www.youtube.com/c/Hyperplexed)
- UCI BootCamp for the acceptance criteria.
- AskBCS for their assistance in troubleshooting.

## Questions

If you have further questions about this project, please send an email or checkout us out on GitHub.

Email: kyleochata@gmail.com

GitHub Link: https://github.com/kyleochata

## Credit

This project was created by Kyle Etrata
