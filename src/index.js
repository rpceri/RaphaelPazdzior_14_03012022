import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
ajout comme dareboost indiquait : "Il manque une politique de sécurité sur la provenance de vos ressources"
https://medium.com/@nrshahri/csp-cra-324dd83fe5ff
meta http-equiv="Content-Security-Policy" content="script-src 'self'; style-src 'self'; ..." 
http-equiv => httpEquiv
*/
let meta = document.createElement("meta");
meta.httpEquiv = 'Content-Security-Policy'
meta.content = "script-src 'self'; style-src 'self' 'unsafe-inline';";
document.getElementsByTagName("head")[0].appendChild(meta);


/*
dareboost indiquait : Votre page n'expose pas de propriété Open Graph
*/
meta = document.createElement("meta");
meta.setAttribute('property', 'og:title'); // meta.property = '' ne fctionne pas
meta.content = "Hren'";
 
document.getElementsByTagName("head")[0].appendChild(meta);

meta = document.createElement("meta");
meta.setAttribute('property', 'og:type'); 
meta.content = "Appli'";
document.getElementsByTagName("head")[0].appendChild(meta);

meta = document.createElement("meta");
meta.setAttribute('property', 'og:url'); 
meta.content = "https://distracted-shockley-ed818d.netlify.app/";
document.getElementsByTagName("head")[0].appendChild(meta);

meta = document.createElement("meta");
meta.setAttribute('property', 'og:url'); 
meta.content = "https://distracted-shockley-ed818d.netlify.app/medias/wealthHealth180.gif";
document.getElementsByTagName("head")[0].appendChild(meta);