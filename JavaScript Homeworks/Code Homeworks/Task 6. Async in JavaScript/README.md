# Task 6. Async in JavaScript. Error Handling and Debugging

#### Task Description:

1. Create a new JS project for the Task 6.
2. Make the following tasks in separate files (```promises.js```, ```async-await.js```, ```try-catch.js```). 

### Task 1. promises.js

#### Description

You are practicing JavaScript Promises and asynchronous requests.

Your task is to create a function that sends an HTTP request using ```fetch()``` to a resource that returns JSON data.

Then, using a ```.then()``` chain, process the response and reuse the received JSON inside another function.

The goal of this exercise is to understand how asynchronous requests work with Promises and how ```.then()``` chains handle asynchronous data.

### Task 2. async-await.js

#### Description

You are practicing asynchronous JavaScript using async and await.

Your task is to repeat the same logic from promises.js, but this time using the async/await approach instead of ```.then()``` chains.

The goal of this exercise is to understand how async/await simplifies asynchronous code.

### Task 3. try-catch.js

#### Description

You are practicing JavaScript error handling.

Your task is to create a request to a resource that does not exist. When the request fails, the program should automatically send another request to a valid resource.

If the second request also returns an invalid response, you should generate your own custom error.

The goal of this exercise is to understand how ```try...catch```, fallback logic, and custom errors work in JavaScript.