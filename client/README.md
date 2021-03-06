# UI for Planing-poker task

updated 08.09.2021

# Changes

- 08.09.2021

1. update eslint rules : no single quotes, require-default-props
2. remove export default
3. add outputs for components

- 07.09.2021

1. added feature folders structure
2. added in SCSS colorPalete in ./base/colorPalete
3. added index. in components

- 05.09.2021

1. added in SCSS ./utils/mixins, ./utils/variables
2. added in SCSS button,img tags
3. added in SCSS utils-class in ./base/typography
4. added in SCSS color generator
5. added rule in eslint "import/prefer-default-export": "off"

# File architecture

In this repo we used "Feature folders structure".<br>
Our structure : <br>
./src <br>

- -assets _Media files_
- -components _Global reuse components_
- -features _Unique features with mirrored root folders excluding folders assets and styles_
- -hooks _Global custom hooks_
- -lib _Global utils,functions,helpers_
- -redux _Global redux_
- -styles _Global SCSS folder_
- -types _Global types and interfaces_

# Components

1. [User Component](#UserComponent)<br>
2. [Input Text](#InputText)<br>
3. [Switcher](#Switcher)<br>
4. [Timer](#Timer)<br>
5. [Chat](#Chat)<br>

- ## UserComponent

The following props are required for the component to work :

- avatar: string;
- firstName: string;
- lastName: string;
- jobPosition: string;
- isYou: boolean;
- isChat: boolean;

If the `avatar` has a length of only 2, then the string passed to the variable will be displayed, otherwise the JSX.Element with the avatar.<br>
The CSS-classes of the component are changed based on the variable `isChat`.

- ## InputText

The following props are required for the component to work :

- labelText: string;
- updateMessages: text: (string) => void; - optional

onKeyDown event with key `Enter` message sent in state, other keys ignored.

- ## Switcher

at now just view

- ## Timer

at now just view

- ## Chat

Prototype Chat component.
Component have state, which render messages.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
