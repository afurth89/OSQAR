# O.S.Q.A.R 
[www.osqarlearning.com](www.osqarlearning.com)

##Introduction

I'm a former teacher, and I absolutely loved working with students but quickly grew exhausted of the process of creating and grading assessments. I was never satisfied with the quality of pre-packaged assessments, and was frequently left with the incedibly tedious task of copy/pasting questions from a variety of sources into a coherent test I thought appropriately assessed my students' knowledge. And worst of all, I knew from conversation with peers that thousands of other teachers were having a similar issue. Which leads me to...

"O.S.Q.A.R", or the *Open Source Question & Answer Resource*, is a web application that allows teachers to create and administer custom assessments in minutes by being able to incorporate any question created by other teachers on the platform.



##Technologies Used
Front End: 

- AngularJS 
- nvD3 Visualization Library
- HTML5
- CSS3/Bootstrap/Bootswatch 'Flatly' theme
- Javascript

Back End:

- Node.js
- Express
- MongoDB
- Mongoose
- Bluebird Promise library

##How It Works
For teachers, there are **two** ways to add assessment questions:

1. Creating their own custom questions, or
2. Searching O.S.Q.A.R.'s database, which contains **every** question from **every** teacher. Use Angular's two-way data binding to easily filter and search through questions, and use one-click to add them to your assessment.

For students, they can easily take any assessment and receive real-time feedback as they progress through the test. Using nvD3 visulization, student's performance is tracked in real-time after each question. At the end of the test, students receive a custom Report Card providing an overview snapshot of their performance on the assessment.

##Desired Improvements
This application was built over two weeks, so there is still much that I'd like to do to improve the project. Here are a number of things I'd like to improve on. This list is largely to keep track of my own thoughts, but if you have suggestions please let me know: [andrew.furth@gmail.com](mailto:andrew.furth@gmail.com)

1. Adding multiple question types - Using a MongoDB backend, with it's lack of constraing schemas, will allow me to easily expand my models to include T/F, choose multiple, and more types of questions
2. Creating users and user accounts to add authentication and authorization to limit who can access which pages (so students cannot access the tests ahead of time). Additionally, creating 'classes' so that teachers can directly adminster tests to their students.
3. Linking sessions to user accounts so that performance over time can be tracked
4. Implementing more nvD3 and other visualization libraries to develop more robust analytics for teachers in displaying student performance