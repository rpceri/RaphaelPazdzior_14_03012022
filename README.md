# HRnet - WealthHealth

Convert a project using React instead of jquery
Old jquery project is [here] (https://github.com/OpenClassrooms-Student-Center/P12_Front-end/) (online demo [here] (https://gallant-dijkstra-4b1762.netlify.app/))

## Dependencies

-    "react": "^17.0.2",
-    "react-dom": "^17.0.2",,
-    "react-router-dom": "^6.2.1",
-    "react-scripts": "4.0.3",
-    "firebase": "^9.6.1",

-    "react-datepicker": "^4.5.0",

-    "rc-dropdown": "^3.2.0",
-    "rc-menu"
-    "react-table": "^7.7.0" and "styled-components": "^5.3.3", and "match-sorter": "^4.0.0",
-    "esm": "^3.2.25" (to launch initFirestoreDatabase.js)

-    "hrnet-modal-rp": "^1.0.7" [own component aviable on npmjs.com] (https://www.npmjs.com/package/hrnet-modal-rp)

## Installation

-    This app use a firesore db, go to firebaseConfig.js and change parameters in firebaseConfig 
-    Populate the database :  node -r esm ./src/initFirestoreDatabase.js to store states and departements collections

- Run the project :
`npm start`, will run http://localhost:3001/

## Online démo

https://distracted-shockley-ed818d.netlify.app/