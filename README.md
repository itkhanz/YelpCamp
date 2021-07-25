<!-- Add banner here -->
![](./demo/images/YelpCamp-Preview.png)


# YelpCamp
A full-stack web application developed using Express JS, MongoDB, and EJS and Bootstrap 5. Completely resposnive with added security and PassportJS authentiacation. 

## Demo-Preview
https://yelpcamp-itkhan-2021.herokuapp.com/

![YelpCamp Animation](./demo/images/YelpCamp-Animation.gif)


# Table of contents


- [Project Title](#yelpcamp)
- [Demo-Preview](#demo-preview)
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Diagrams](#diagrams)
- [Development](#development)
- [Contribute](#contribute)
    - [Contributuions](#contributions)
    - [Adding new features or fixing bugs](#adding-new-features-or-fixing-bugs)
- [License](#license)

# Installation
[(Back to top)](#table-of-contents)
1. Setup the development environment
    - [VS Code editor.](https://code.visualstudio.com/)
    - [Git Bash](https://git-scm.com/downloads)
    - [NodeJS](https://nodejs.org/en/)
    - [MongoDB](https://nodejs.org/en/)
        - Download the Community server and select the `Insall Mongod as server`.
        - Start Windows Powershell (press the Windows Start button and type ‘powershell’ to find the shortcut) and type the following command:
        `New-Item -ItemType directory -Path C:\data\db`
        - Add the mongodb installation `C:\MongoDB\bin` location to the path variable in System variables.
        - run `mongod` command in terminal to start mongo server.
        - run `mongo` command in seprate terminal to open mongodb shell.
2. Install the depndencies
    - `git clone` the project repository
    - `npm install` will install the project's dependencies
3. External APIs
    - [Cloudinary Registration for Image Storage](https://cloudinary.com/)
        -   Sign up for free account --> does not require credit card to start
        -   Embed the Account API Key and API Secret directly into `.env`
    - [MapBox for interactive clustered Map](https://www.mapbox.com/)
        -   sign up and have access to a default public token --> can make new tokens if you want
        -   include token in `.env` --> MAPBOX_TOKEN=asdfasdfasdfasdf
    
# Technology Stack
[(Back to top)](#table-of-contents)
<h3 align="left">Languages and Tools:</h3>
<p align="left">
    <a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a>
    <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
    <a href="https://getbootstrap.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
      <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>
    <a href="https://expressjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a>
    <a href="https://ejs.co/" target="_blank"> <img src="./demo/images/ejs.svg" alt="embedded javascript templating" width="40" height="40"/> </a>
    <a href="https://www.mongodb.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a>
    <a href="https://mongoosejs.com//" target="_blank"> <img src="./demo/images/mongoose.jpg" alt="mongodb" width="40" height="40"/> </a>
    </p>


# Usage
[(Back to top)](#table-of-contents)
- YelpCamp app is an online platform for users to create and share the campgrounds. The campgrounds can be edited and deleted afterwards by the authorized user only.
- Users can also view and comment on the campgrounds created by other users.
- Users need to be logged-in in order to create and review campgrounds.
- Index page displays list of all  the campgrounds with interactive clustered map that can be used to get an overview of the campground locations. 
- Expanding the clusters will result eventuallly in single campgrounds that can be clicked to redirect to the campground details.

# Diagrams
[(Back to top)](#table-of-contents)

### ER Diagram for YelpCamp database

![](./demo/images/YelpCamp-ERDiagram.jpg)

# Development
[(Back to top)](#table-of-contents)
- Async errors as well as mongoose erros and form validations have been implemented to avoid the server failure.
- Users get notified for errors and success via flash messages.
- Passport JS authentication is used to store the encrypted password with hash and salt in database.
- A bunch of security features have been added as well to prevent XSS attacks, Mongo Injection, HTML sanitizing and content security policy.
- Cookies and Session storage is being used to keep the users logged-in and retrieve the campgrounds.


# Contribute
[(Back to top)](#table-of-contents)

## Contributions

<!-- This is where you can let people know how they can **contribute** to your project. Some of the ways are given below.
Also this shows how you can add subsections within a section. -->
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)

***Contributions of any kind are welcome!***

* When contributing to this repository, please discuss the change you wish to make via [**issues**](https://github.com/itkhanz/YelpCamp/issues)

* Note that we have a [**code of conduct**](https://github.com/itkhanz/YelpCamp/blob/master/CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

* All code changes take place through [**pull requests**](https://github.com/itkhanz/YelpCamp/pulls). Check [***GitHub Flow***](https://guides.github.com/introduction/flow/index.html).

* We use GitHub issues to track public bugs. Report a bug by [**opening a new issue**](https://github.com/itkhanz/YelpCamp/issues/new/choose).

* Try to stick to the **issue template** and **pull request template**.

### Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):


This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Credits:

<table>

  <tr>
    <td align="center">
        <a href="https://github.com/Colt">
        <img src="https://avatars.githubusercontent.com/u/5498438?v=4" width="100px;" alt=""/><br /><sub><b>Colt Steele</b></sub></a><br />
        <a href="https://github.com/Colt/YelpCamp" title="Code">💻</a>
        <a href="#design-Ian title="Design">🎨</a>
        <a href="#ideas-Ian" title="Ideas, Planning, & Feedback">🤔</a>
    </td>
    <td align="center">
        <a href="https://github.com/nax3t"><img src="https://avatars.githubusercontent.com/u/6356890?v=4" width="100px;" alt=""/><br /><sub><b>Ian Schoonover</b></sub></a><br />
        <a href="https://github.com/nax3t?tab=repositories&q=yelpcamp" title="Code">💻</a>
        <a href="https://www.youtube.com/playlist?list=PL86ehqHzxhy4MG95npAX_r2IFrz29HMk6" title="Videos">📹</a>
        <a href="#ideas-Zarko" title="Ideas, Planning, & Feedback">🤔</a>
        <a href="#bugFixes-Zarko" title="Bug Fixes">🐛</a>
    </td>
    <td align="center">
        <a href="https://github.com/zarkomaslaric"><img src="https://avatars.githubusercontent.com/u/26771327?v=4" width="100px;" alt=""/><br /><sub><b>Zarko Maslaric</b></sub></a><br />
        <a href="https://github.com/zarkomaslaric?tab=repositories&q=yelpcamp&type=&language=&sort=" title="Code">💻</a>
        <a href="https://zarkom.net/blogs" title="Blog Posts">🖋</a>
        <a href="#bugFixes-Zarko" title="Bug Fixes">🐛</a>
        <a href="#ideas-ColtSteele" title="Ideas, Planning, & Feedback">🤔</a>
    </td>
    <td align="center">
        <a href="https://github.com/dcbeergoddess">
        <img src="https://avatars.githubusercontent.com/u/59098488?v=4" width="100px;" alt=""/><br /><sub><b>RACHEL M MURRAY</b></sub></a><br />
        <a href="https://github.com/dcbeergoddess/webdev_2020_coltsteele" title="Documentation">📖</a>
    </td>
  </tr>
</table>



[(Back to top)](#table-of-contents)



# License
[(Back to top)](#table-of-contents)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
