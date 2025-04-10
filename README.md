<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/clementkubica/FurnitureFlow">
    <img src="public/images/logo_only.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Furniture Flow</h3>

  <p align="center">
    Juno is an AI marketing assistant for small business owners
    <br />
    <a href="https://github.com/394-w25/Juno"><strong>Explore the code »</strong></a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Juno is an AI marketing assistant that helps small business owners create marketing campaigns. It gives owners recommendations based on upcoming events that are within the context of their business, and it generates different types of flyers that the user can download.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Vite][Vite]][Vite-url]
* [![React][React.js]][React-url]
* [![Firebase][Firebase]][Firebase-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

* Firebase project
    * To create a Firebase project go to this [link][Firebase-create-url] and follow the instructions
    * Make sure to create a web app which will generate the necessary API keys and config values for your website to connect to Firebase

* Google Maps API Key
    * Get a free API Key [here](https://developers.google.com/maps/documentation/javascript/get-api-key)
    * Again, make sure the key is associated with your Firebase project
    * Make sure the key is unrestricted

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/394-w25/Juno.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your API in `.env`
   ```ini
    VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
    VITE_FIREBASE_KEY=YOUR_FIREBASE_KEY
    VITE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
    VITE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
    VITE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
    VITE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
    VITE_APP_ID=YOUR_FIREBASE_APP_ID
    VITE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID
   ```
4. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin your_github_username/your_repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE -->
## Usage

To run the app:
```sh
npm start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTORS -->
## Top Contributors
```Vivian Chen```, ```Andy Vu```, ```Clement Kubica```, ```Yvonne Cheng```, ```Yosief Desta```, ```Archie Silverstein```, and ```Victor Olawale-apanpa``` created version 1 of this app.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: src/assets/project-ss.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Firebase]: https://img.shields.io/badge/firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=white
[Firebase-url]: https://firebase.google.com
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vite.dev
[Firebase-create-url]: https://firebase.google.com


## License

This project is licensed under the terms of the [MIT license](./LICENSE).
