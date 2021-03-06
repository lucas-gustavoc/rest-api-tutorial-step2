# Rest API Tutorial - Part 2

This tutorial aims to create a complete Node.js based RESTful API. Its purpose is to be self-explanatory, using especially code comments to achieve that.

It's good to mention that a previous knowledge on JavaScript basics is important for the right understanding of this tutorial.

Besides, it's not necessary to have a previous knowledge on Node.js, since we'll be covering the basics here.

If you haven't seen the first part of this tutorial, please visit [first part page](https://github.com/lucas-gustavoc/rest-api-tutorial-step1) in order to start it.

## Index

- [Second Part Goal](#second-part-goal)
- [How to Use this Tutorial](#how-to-use-this-tutorial)
- [Resources](#resources)
- [Getting Started](#getting-started)
- [How did we do it?](#how-did-we-do-it)
- [What Comes Next?](#what-comes-next)
- [API Reference](#api-reference)

## Second Part Goal

In this second part of the tutorial, we're going to add some new requests and mock a database inside the project.

To achieve that, we're going to simulate a wish list, where people can register their wishes anonymously and assign them a priority.

In addition, we will also be adding test suites to our custom code, which is a really important part of any development process.

## How to Use this Tutorial

You can make a good use of this tutorial by setting it up (see [Getting Started](#getting-started) section), reading the [How did we do it?](#how-did-we-do-it) section and reading the code comments.

While reading the [How did we do it?](#how-did-we-do-it) section, it's an interesting idea to switch between your browser and your code editor, so you can follow the steps we took directly inside the code.

## Resources

To make it happen, this project uses the following external resources:

- `Visual Studio Code`: We're using Visual Studio Code as code editor and command line tool. For details, please visit https://code.visualstudio.com/
- `Express.js`: Used as the basic structure of our API. For details, please visit https://expressjs.com/
- `Nodemon`: Used for debugging purposes. For details, please visit https://www.npmjs.com/package/nodemon
- `Jest`: Used for testing purposes. For details, please visit https://jestjs.io/
- `Postman`: Used for testing the application with API requests. In order to learn more about how to use Postman, you can visit the [Postman Introduction Page](https://learning.postman.com/docs/getting-started/introduction/).

## Getting Started

In order to get started with this tutorial, make sure **you have Node.js installed in your machine** (for details, please visit https://nodejs.org/en/download/) and a **code editor** available (we're using Visual Studio for this project, but it's up to you to choose one).

With all this in place, you can move on.

1. Download the project files and place them into a directory of your choice. You can also use the `git clone` tool if you prefer to.

2. Using a terminal (Visual Studio Code has a built-in terminal, which can be accessed pressing `ctrl + '`), navigate to the folder you've placed the files and type `npm install` and press Enter. This will install all the external modules we will be using in this tutorial.

3. Still in the terminal, you can check if all tests are passing by running the command `npm test`.

4. Now you can start the application by running `npm start` in the terminal.

5. Go to your browser and access the address http://localhost:3000/. If you see the phrase "Hello World!", you're done with the setup. You can do some API tests with Postman (visit [Postman Introduction Page](https://learning.postman.com/docs/getting-started/introduction/) for details) accordingly the [API Reference](#api-reference) and after that you can go to the [How did we do it?](#how-did-we-do-it) section to start learning.

## How did we do it?

Here, we will start from the point we stopped in the Part 1. So if you haven't accomplished that part yet, I recommend you to visit the [Part 1's page](https://github.com/lucas-gustavoc/rest-api-tutorial-step1) in order to do so.

With all that in place, we can start below:

1. We installed the module `uniqid` in order to generate IDs for the created wishes. This can be done by running `npm install uniqid` in the terminal.

2. We created the folders `controller` and `model` inside the preexisting folder `src`. It's really important that you stick to the exact folder names we've mentioned, otherwise it could lead to execution errors.

3. Inside the folder `controller`, we created a file called `wishes.js` and filled it with the code you can see in this same file in this tutorial. You can just copy and paste, remembering to read the comments to understand what's going on over there.

4. You can do the same process you did on step 3 with the file `model/Wish.js`, which simulates a database using just an array, and the file `Wish.test.js`, which tests our `Wish.js` file. Testing concepts are not the purpose of this tutorial, so we won't be describing our approaches for testing, but you can check it in this file. Remember to keep the file names in an exact match as they are in this tutorial.

5. Now you can install the Jest module, which is responsible for running tests in the application. You can do this by running the command `npm install jest --save-dev` in your terminal. The `--save-dev` statement makes Node.js understand that this is a module focused on the development environment, not the production one. This is important for clarification and efficiency matters.

6. We added a new script to the file `package.json` called `test`. It will be above or below the `start` script, and will look like this: `"test": "jest"`.

7. We made some changes in the file `index.js`, so you can copy it all and replace yours. Remember to read the new comments to understand the process.

Now you're ready to run the same tests you ran at the [Getting Started](#getting-started) section.

## What Comes Next?

Now we have an API that can send and receive data as requested, so the consumer can make all the desired changes in the mock database. But, if I create a wish, nothing is stopping you or anybody to change or even delete it without my authorization. So, how can we solve this vulnerability?

Well, **authorization** is our word and our next step here.

#### Other Parts Links:
- [Part 1](https://github.com/lucas-gustavoc/rest-api-tutorial-step1)
- [Part 3](https://github.com/lucas-gustavoc/rest-api-tutorial-step3)
- [Part 4](https://github.com/lucas-gustavoc/rest-api-tutorial-step4)

## API Reference

Here you can see the requests this API supports at this moment. You can test each one of these requests using Postman (see the [Resources](#resources) section for details).

#### Create a New Wish

To create a new wish, you can make a HTTP Post request to the URL below. There are some requirements you should consider:
- Set the property `Content-Type` to `application/json` in your request's Headers Section.
- Send a raw body in JSON format with the wish to register, containing the properties `wish` (which would be the wish decription) and `priority`.

If the server is able to validate and register the wish, it will return a set of JSON data containing the wish you sent along with its new ID (HTTP Status: `201`). Otherwise, it will return an error message with either the status `404` (Bad Request - Invalid Entry) or the status `500` (Some Server Error).

```
POST /wishes
```

#### Get All Registered Wishes

To get all the registered wishes, you can make a GET Request to the URL below. Remember that, in this part of the tutorial, the application has no actual persistence yet, so all registered wishes will be lost at the end of the server execution.

If the server can process the GET request, it will return a set of JSON data containing all the wishes registered at the runtime (HTTP Status: `200`). In case of some internal error, it will return the error message with the status `500` (Some Server Error).

```
GET /wishes
```

#### Get One Wish by ID

Once you have the ID of some wish, you can get it sending a GET Request to the URL below.

If the server finds the requested ID, it will return a set of JSON data containing the proper wish (HTTP Status: `200`). Otherwise, it will return an error message with the status `404` (Not Found) or `500`(Some Server Error).

```
GET /wishes/<id>
```

#### Update One Wish

You can update one wish's data by sending a PATCH Request to the URL below. Just like the create request, you should consider the following requirements in order to make it work:
- Set the property `Content-Type` to `application/json` in your request's Headers Section.
- Send a raw body in JSON format with the information to be updated, containing the property `wish` or/and `priority`.

If the server is able to update the referred wish, it will return that same wish already updated in JSON format (HTTP Status: `200`). Otherwise, it will return an error message with the status `404` (Not Found) or `500`(Some Server Error).

```
PATCH /wishes/<id>
```

#### Delete One Wish

You can delete one wish by sending a DELETE Request to the URL below.

In case of successful deletion, it will return a JSON data with a message telling you that with the status `200`. Otherwise, it will return an error message with the status `404` (Not Found) or `500`(Some Server Error).

```
DELETE /wishes/<id>
```
