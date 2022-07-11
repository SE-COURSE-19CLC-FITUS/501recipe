<div align="center">

  <img src="https://user-images.githubusercontent.com/64480713/178150728-1930ae67-3794-4088-9523-c113e99c54f0.png" alt="logo" width="200" height="auto" />
  <h1>Regs-cipe Cookbook</h1>

  <p>
    A small community for home chefs sharing their best recipes, built with NodeJS
  </p>

<!-- Badges -->
<p>
  <a href="https://github.com/SE-COURSE-19CLC-FITUS/501recipe/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/SE-COURSE-19CLC-FITUS/501recipe" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/SE-COURSE-19CLC-FITUS/501recipe" alt="last update" />
  </a>
  <a href="https://github.com/SE-COURSE-19CLC-FITUS/501recipe/network/members">
    <img src="https://img.shields.io/github/forks/SE-COURSE-19CLC-FITUS/501recipe" alt="forks" />
  </a>
  <a href="https://github.com/SE-COURSE-19CLC-FITUS/501recipe/stargazers">
    <img src="https://img.shields.io/github/stars/SE-COURSE-19CLC-FITUS/501recipe" alt="stars" />
  </a>
  <a href="https://github.com/SE-COURSE-19CLC-FITUS/501recipe/issues/">
    <img src="https://img.shields.io/github/issues/SE-COURSE-19CLC-FITUS/501recipe" alt="open issues" />
  </a>
  <a href="https://github.com/SE-COURSE-19CLC-FITUS/501recipe/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/SE-COURSE-19CLC-FITUS/501recipe.svg" alt="license" />
  </a>
</p>

<h4>
    <a href="https://github.com/SE-COURSE-19CLC-FITUS/501recipe/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/SE-COURSE-19CLC-FITUS/501recipe">Documentation</a>
  <span> · </span>
    <a href="https://github.com/SE-COURSE-19CLC-FITUS/501recipe/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/SE-COURSE-19CLC-FITUS/501recipe/issues/">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Screenshots](#camera-screenshots)
  - [Tech Stack](#space_invader-tech-stack)
  - [Features](#dart-features)
  - [Color Reference](#art-color-reference)
  - [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Installation](#gear-installation)
  - [Run Locally](#running-run-locally)
  - [Deployment](#triangular_flag_on_post-deployment)
- [Roadmap](#compass-roadmap)
- [Contributing](#wave-contributing)
  - [Code of Conduct](#scroll-code-of-conduct)
- [FAQ](#grey_question-faq)
- [License](#warning-license)
- [Contact](#handshake-contact)
- [Acknowledgements](#gem-acknowledgements)

<!-- About the Project -->

## :star2: About the Project

<!-- Screenshots -->

### :camera: Screenshots

<div align="center">
  <img src="https://user-images.githubusercontent.com/64480713/178151011-bcd9b290-3586-4643-8bf7-6d32e12af6a5.png" alt="screenshot" />
</div>

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.javascript.com/">Javascript</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://expressjs.com/">Express.js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

<!-- Features -->

### :dart: Features

- Add recipe to bookmark.
- Authentication.
- Filter recipes by tags.
- Ingredient shopping list.
- Post comment on recipes.
- Rate recipes.
- Reply to comments.
- Search recipes by words.
- Submit blogs.
- Submit recipes.
- Upload images to cloudinary.
- View bookmarks.
- View recipes.
- View relevant recipes.

<!-- Color Reference -->

### :art: Color Reference

| Color         | Hex                                                             |
| ------------- | --------------------------------------------------------------- |
| Primary Color | ![#6EBE3B](http://via.placeholder.com/10/6EBE3B?text=+) #6EBE3B |

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to
your .env file.

`MONGODB_URI`: An URI to connect to your database.

`SESSION_SECRET`: A secret used to sign the session ID cookie. Read more:
[expressjs/session](https://github.com/expressjs/session#secret).

`CLOUDINARY_NAME`: The name of your Cloudinary account. Used to build the public
URL for all your media assets.

`CLOUDINARY_API_KEY`: Used together with the API secret to communicate with the
Cloudinary API and sign requests.

`CLOUDINARY_API_SECRET`: Used together with the API key to communicate with the
Cloudinary API and sign requests.

E.g:

```
MONGODB_URI = 'mongodb+srv://{username}:{password}@501cluster.evfgb.mongodb.net/test?retryWrites=true&w=majority'

SESSION_SECRET = my-secret-key
CLOUDINARY_NAME='diy3d...'
CLOUDINARY_API_KEY='5578258...'
CLOUDINARY_API_SECRET='8fxUY5Zn...'
```

You can also checkout file `.env.example` to see all required environment
variables.

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses [Yarn](https://yarnpkg.com/) as package manager:

```bash
npm install --global yarn
```

<!-- Installation -->

### :gear: Installation

Install 501recipe with yarn:

```bash
yarn install 501recipe
cd 501recipe
```

<!-- Run Locally -->

### :running: Run Locally

Clone the project:

```bash
git clone https://github.com/SE-COURSE-19CLC-FITUS/501recipe.git
```

Go to the project directory:

```bash
cd 501recipe
```

Install dependencies:

```bash
yarn install
```

Start the server:

```bash
yarn start
```

OR

Run with `nodemon`:

```bash
yarn test
```

<!-- Deployment -->

### :triangular_flag_on_post: Deployment

To deploy this project on Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

<!-- Roadmap -->

## :compass: Roadmap

- [x] Migrate from npm to yarn.
- [x] Remove secrets from .env file.

<!-- Contributing -->

## :wave: Contributing

<a href="https://github.com/SE-COURSE-19CLC-FITUS/501recipe/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SE-COURSE-19CLC-FITUS/501recipe" />
</a>

Contributions are always welcome!

<!-- Code of Conduct -->

### :scroll: Code of Conduct

Please read the [Code of Conduct](https://github.com/SE-COURSE-19CLC-FITUS/501recipe/blob/main/CODE_OF_CONDUCT.md).

<!-- FAQ -->

## :grey_question: FAQ

- Is this project still maintained?

  - Yes, but we will only update UI, docs, or dependencies. New features won't
    be added frequently.

<!-- License -->

## :warning: License

Distributed under Apache License 2.0 license. See
[LICENSE](https://github.com/SE-COURSE-19CLC-FITUS/501recipe/blob/main/LICENSE)
for more information.

<!-- Contact -->

## :handshake: Contact

Duong Vinh - [@duckymomo20012](https://twitter.com/duckymomo20012) -
tienvinh.duong4@gmail.com

Project Link: [https://github.com/SE-COURSE-19CLC-FITUS/501recipe](https://github.com/SE-COURSE-19CLC-FITUS/501recipe).

<!-- Acknowledgments -->

## :gem: Acknowledgements

Here are useful resources and libraries that we have used in our projects:

- [Awesome Readme Template](https://github.com/Louis3797/awesome-readme-template):
  A detailed template to bootstrap your README file quickly.
