import db from './firebaseConfig.js';
import { collection, getDocs, addDoc, doc, deleteDoc} from 'firebase/firestore/lite';

/**
 * launch this to populate firestore states collection
 * howto launch this js with node :  https://reactgo.com/node-es6-imports/ (install esm, and after: node -r esm ./src/initFirestoreDatabase.js)
*/
async function setStats(datas) {
    const states = [
        {name : "Alabama", id : "AL"},
        {name : "Alaska", id : "AK"},
        {name : "American Samoa", id : "AS"},
        {name : "Arizona", id : "AZ"},
        {name : "Arkansas", id : "AR"},
        {name : "California", id : "CA"},
        {name : "Colorado", id : "CO"},
        {name : "Connecticut", id : "CT"},
        {name : "Delaware", id : "DE"},
        {name : "District Of Columbia", id : "DC"},
        {name : "Federated States Of Micronesia", id : "FM"},
        {name : "Florida", id : "FL"},
        {name : "Georgia", id : "GA"},
        {name : "Guam", id : "GU"},
        {name : "Hawaii", id : "HI"},
        {name : "Idaho", id : "ID"},
        {name : "Illinois", id : "IL"},
        {name : "Indiana", id : "IN"},
        {name : "Iowa", id : "IA"},
        {name : "Kansas", id : "KS"},
        {name : "Kentucky", id : "KY"},
        {name : "Louisiana", id : "LA"},
        {name : "Maine", id : "ME"},
        {name : "Marshall Islands", id : "MH"},
        {name : "Maryland", id : "MD"},
        {name : "Massachusetts", id : "MA"},
        {name : "Michigan", id : "MI"},
        {name : "Minnesota", id : "MN"},
        {name : "Mississippi", id : "MS"},
        {name : "Missouri", id : "MO"},
        {name : "Montana", id : "MT"},
        {name : "Nebraska", id : "NE"},
        {name : "Nevada", id : "NV"},
        {name : "New Hampshire", id : "NH"},
        {name : "New Jersey", id : "NJ"},
        {name : "New Mexico", id : "NM"},
        {name : "New York", id : "NY"},
        {name : "North Carolina", id : "NC"},
        {name : "North Dakota", id : "ND"},
        {name : "Northern Mariana Islands", id : "MP"},
        {name : "Ohio", id : "OH"},
        {name : "Oklahoma", id : "OK"},
        {name : "Oregon", id : "OR"},
        {name : "Palau", id : "PW"},
        {name : "Pennsylvania", id : "PA"},
        {name : "Puerto Rico", id : "PR"},
        {name : "Rhode Island", id : "RI"},
        {name : "South Carolina", id : "SC"},
        {name : "South Dakota", id : "SD"},
        {name : "Tennessee", id : "TN"},
        {name : "Texas", id : "TX"},
        {name : "Utah", id : "UT"},
        {name : "Vermont", id : "VT"},
        {name : "Virgin Islands", id : "VI"},
        {name : "Virginia", id : "VA"},
        {name : "Washington", id : "WA"},
        {name : "West Virginia", id : "WV"},
        {name : "Wisconsin", id : "WI"},
        {name : "Wyoming", id : "WY"}
    ];

    try {
        let collRef = collection(db, 'states')
        let data = await getDocs(collRef)
        
        /*
        data.docs.forEach((el) => {
            console.log("dpt : ", el.id);
            deleteDoc(doc(db, "states", el.id))
        });*/

        let nbOfDatas = data.docs.length
        if(nbOfDatas === 0) {
            states.forEach(state => (
                addDoc(collRef, state)
            ))
            console.log("states datas well added");   
        }
        else console.log(`states datas not added this time : ${nbOfDatas} ever present`);  
    } catch (error) {
        console.log('pb add collection', error)
        //setError(true);
        return 'error';
    }
}

/**
 * launch this to populate firestore fdepartements collection
*/
async function setDepts(datas) {
    const dpts = [{id : 'Se', name : 'Sales'},
                    {id : 'Ma', name : 'Marketing'},
                    {id : 'En', name : 'Engineering'},
                    {id : 'Hr', name : 'Human Ressources'},
                    {id : 'Le', name : 'Legal'}] // tableau contenant des objet, pourra ettre mappé

    try {
        let collRef = collection(db, 'departements')
        let data = await getDocs(collRef)
        /*
       // data.docs.forEach(el => {
        data.docs.forEach((el) => {
            console.log("dpt : ", el.id);
            deleteDoc(doc(db, "departements", el.id))
        });*/

        let nbOfDatas = data.docs.length
        if(nbOfDatas === 0) {
            dpts.forEach((dpt) => {
                addDoc(collRef, dpt);
            })
            console.log("departements datas well added");   
        }
        else console.log(`departements datas not added this time : ${nbOfDatas} ever present`);  
    } catch (error) {
        console.log('pb add collection', error)
        //setError(true);
        return 'error';
    }
}

 setStats() //called one time to set states dattas on firestore
 setDepts() //called one time to set departements dattas on firestore
