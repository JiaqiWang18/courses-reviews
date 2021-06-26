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


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Courses Reviews</h3>
  <p align="center">
    A web application in which users can rate courses and leave comments 
    <br />
    <br />
    <a href="https://courses-reviews.herokuapp.com/">Live Demo</a>
    ·
    <a href="https://github.com/JiaqiWang18/course-reviews/issues">Report Bug</a>
    ·
    <a href="https://github.com/JiaqiWang18/course-reviews/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
![App Screenshot](https://github.com/JiaqiWang18/courses-reviews/blob/master/snippet.JPG)
This is a web application in which users can rate courses and leave comments. 
Features:
* User registration and authentication
* Browse a list of courses and view ratings of them
* Use filtering and search bar to find courses
* Fill out a form to submit a rating

Data Structures Used:
* Javascript object, or dictionary, is used as the data format for communication between the frontend and server
```JSON
[
    {
        "id": 3,
        "title": "Enhanced Math III",
        "course_detail": "Enhanced Math III is the second course in the rigorous accelerated sequence of high school math courses. Instructional time will focus on five critical areas: expanding understanding of functions to include polynomial, rational, and radical functions; extending their work with complex numbers; extending trigonometry to general triangles, trigonometric functions, reciprocal functions, and inverse functions",
        "avg_rating": null,
        "instructor_first_name": "John",
        "instructor_last_name": "Doe"
    },
    {
        "id": 5,
        "title": "Anatomy",
        "course_detail": "This course is designed to give students a general understanding of the structure and function of the human body. In addition, through discussions of current events in the medical field and laboratory experiments (including dissections), students will develop their analytical thinking skills and begin considering the ethical consequences of science.",
        "avg_rating": null,
        "instructor_first_name": "John",
        "instructor_last_name": "Smith"
    }
]
```
* Heap and heap sort is used to sort the above data based on user input


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
2. Install NPM packages
   ```sh
   npm install
   ```
3. Install NPM packages
   ```sh
   pip install -r requirements.txt
   ```
4. Run the backend server
   ```sh
   pyhton manage.py runserver
   ```
5. Run the backend server
   ```sh
   npm run dev
   ```
