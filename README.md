# VeggiesShop

An Ecommerce app for buying vegetables. The app has core features as product listing page, Cart as a sidebar, OTP based authentication and authorization with jwt and fast2sms sms sending service, full checkout page with Paypal integration, Order review page and wishlist page. It's fully responsive give it a try on mobile as well.

## Live Demo

http://veggiesshop.netlify.app

## Check the API

https://github.com/naeemdadi/VeggiesShop-API

## Technologies Used

- ReactJs for frontend,
- NodeJs and ExpressJs for backend and server
- Redux for state management
- Redux Thunk middleware to handle asynchronous requests through redux
- MongoDB for Database and Mongoose for Database Modeling
- Custom CSS for styling
- Axios
- React Router Dom for Routing
- Integrated payment with Paypal
- Fast2sms to send otp to users for authentication

## Installation and Setup Instructions

Clone down this repository. You will need node and npm installed globally on your machine.

You will additionally need a backend server with database schema which you can find on
[VeggiesShopAPI](https://github.com/naeemdadi/VeggiesShop-API)

Installation:

```js
npm install
```

To Start Server:

```js
npm start
```

## Reflection

- This was my first major MERN stack project to learn ReactJs thoroughly. Project goal was to apply what I have learned and learn something new with creating this project.
- I wanted to build something where I can understand most of the complexity of React. So I started to build a Grofers type app where users can buy Vegetables. I started with create-react-app boilerplate, then adding react-router and redux.
- The first problem i ran into was about the product description modal setup. I wanted to make a custom modal without library by writing logic with react-router. It took time but i successfully did it. The other problem was authentication. I wanted to make a OTP based authantication and that with JSON Web Tokens. So I integrated twilio to send otps and set up authentication with JWT successfully.
- The Twilio free account does not allow to send messages to anyone. The free account is for testing only so the verified users only will get the messages sent from API. So the OTP sent won't work for everyone. That's why I added a test account with which users can login with one tap.
