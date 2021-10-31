<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->




<!-- ABOUT THE PROJECT -->
## About The Project
![App Screenshot](https://github.com/JiaqiWang18/courses-reviews/blob/master/snippet.JPG)
This is a web application in which users can rate courses and leave comments. 
Features:
* User registration and authentication
* Browse a list of courses and view ratings of them
* Use filtering and search bar to find courses
* Fill out a form to submit a rating

![Arch Screenshot](https://github.com/JiaqiWang18/courses-reviews/blob/master/coursesreviews.drawio.png)


### Built With

* [Django](https://www.djangoproject.com/)
* [Django Rest Framework](https://www.django-rest-framework.org/)
* [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [React-Redux](https://react-redux.js.org/)
* [Bootstrap](https://getbootstrap.com/)

<!-- GETTING STARTED -->
## Getting Started
### Installation

1. Clone the repo and go to the folder
   ```sh
   git clone https://github.com/JiaqiWang18/courses-reviews.git
   ```
2. Build containers
   ```sh
   docker-compose -f docker-compose-dev.yml build
   ```
3. Start containers
   ```sh
   docker-compose -f docker-compose-dev.yml up
   ```
