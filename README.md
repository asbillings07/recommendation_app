# RecommendIt!

## About This Project

Welcome to RecommendIt!

This project was created with the thought of helping people new to an area find great places to go to recommended by their co-workers, friends or family.

With this App user can:

- SignUp for an account
- Browse and locate exisiting recommendations on a Map
- Create, Update and Delete recommendations they own
- Comment on any recommendation
- Locate any existing recommendation on a Map
- Manage their profile Avatar and information
- Reset Password if Forgotten

In V2 of this App User will be able to:

- Rate recommendations
- Save Recommendations of other Users
- Navigtate to a Recommendation via Maps

A special thanks goes to Aylin Debrunye, an awesome developer. She helped create the mock ups for the website and was crucial to structuring the the flow of the App.

You can view this site live at the link here: [RecommendIt! ](https://recommendit.netlify.com)

## Languages Used

- JavaScript
- CSS
- HTML

## Front-End

- React
  - axios
  - React-router-dom
  - Styled-components
  - js-cookie to maintain to persist users autenticated state
  - JWT to authenticate and authorize users
  - React Bootstrap
  - GoogleMaps API
  - Here Maps API
  - Styled Components
  - Jest & React Testing Library

## Back-End

- Node
  - Express
  - Express-validator
  - bcryptjs
  - basic-auth
  - PostGreSQL
  - Sequelize
  - NodeMailer
  - Google OAuth2
  - Jest

## Motivation and Lessons learned

- Motivation:

  - This project was created to help those who are new to the Atlanta area find cool and fun places around them. However, this app could be used anywhere.

- Lessons Learned

  - Using React Hooks
  - Using React Router to set up routes
  - Using Context API
  - Understanding JWT and how to authenticate users with it
  - PostGreSQL database structuring
  - Node.js, and Express to create API routes
  - Sequelize ORM for data modeling, validation, and persistence
  - Using NodeMailer to send users emails
  - Interacting with the Google Maps API and the Here Maps API
  - Working with Styled Components and React Bootstrap
  - Using Cloudinary to persist user avatars

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

If you want boot up a clone of this project you'll need to do it in two phases:

- In the server directory, you can run:

### `npm start` to start the server

- This will start the server on localhost:5000

The server is only running with Node. However, if you'd like to use nodemon you can run:

### `npm run start:dev` to start the server with nodemon

In the client directory, you can run:

### `npm start` to start the react app

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
