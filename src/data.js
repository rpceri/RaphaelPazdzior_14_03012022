import db from './firebaseConfig.js';
import { collection, getDocs, addDoc, doc, deleteDoc, query, orderBy} from 'firebase/firestore/lite';


/**
 * get employee's list, return an array
*/
export  default async function getData() {
    var depts = await getDepts()
    var states = await getStates()

    let employeeArray = [];
    try {
        let collRef = collection(db, 'employee')
        let data = await getDocs(collRef)
        data.docs.forEach((el) => {
            let dateStartTimeStamp = '';
            if(el.data().startDate.seconds !== undefined) dateStartTimeStamp =el.data().startDate.seconds * 1000

            let dateBirthDateOkTimeStamp = '';
            if(el.data().startDate.seconds !== undefined) dateBirthDateOkTimeStamp =el.data().birthDate.seconds * 1000

            let libDep = ''// ??? is there more simple ?
            depts.forEach((el2) => {
                if(el2.id === el.data().department) libDep = el2.name 
            })
            let libState = ''// ??? is there more simple ?
            states.forEach((el2) => {
                if(el2.id === el.data().state) libState = el2.name 
            })
            let employee = { ...el.data(), 'id': el.id , 'dateStartTimeStamp':  dateStartTimeStamp, 'dateBirthDateOkTimeStamp': dateBirthDateOkTimeStamp
            , 'libDep': libDep, 'libState': libState} // ad the id of the current  object
            employeeArray.push(employee);           
        });
        console.log("getDatas called", employeeArray);
        return(employeeArray)
    } catch (e) {
        console.log("error getting datas", e);
        
    }
};

/**
 * store an amployee, return a string message
*/
export async function setData(datas) {
    try {
        let collRef = collection(db, 'employee')
        await addDoc(collRef, {
            firstName: datas.firstName,
            lastName: datas.lastName,
            birthDate: datas.birthDate,
            startDate: datas.startDate,
            street: datas.street,
            city: datas.city,
            state: datas.state,
            zip: datas.zip,
            department: datas.department,
            insertionDate: new Date()
        });
        //console.log("addDoc called");
        let msg = `All right, ${datas.firstName}  ${datas.lastName} is now added.`
        return(msg)
    } catch (error) {
        console.log('pb add collection', error)
        //setError(true);
        return 'error';
    }
}
/**
 * launch this to populate firestore states collection
*/
export async function setStats(datas) {
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
            console.log("addDoc called");   
        }
        else console.log(`addDoc not called : ${nbOfDatas} present`);  
    } catch (error) {
        console.log('pb add collection', error)
        //setError(true);
        return 'error';
    }
}

/**
 * launch this to populate firestore fdepartements collection
*/
export async function setDepts(datas) {
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
            console.log("addDoc called");   
        }
        else console.log(`addDoc not called : ${nbOfDatas} present`);  
    } catch (error) {
        console.log('pb add collection', error)
        //setError(true);
        return 'error';
    }
}

/**
 * get departements collection on firestore, order by name
*/
export async function getDepts() {
    let anArray = [];
    try {
        let collRef = collection(db, 'departements')
        const q = query(collRef, orderBy("name"));
        let data = await getDocs(q) // query : https://cloud.google.com/firestore/docs/query-data/queries  q au lieu de collRef
        data.docs.forEach(el => {
            let dpt = { ...el.data()} // ad the id of the current  object
            //console.log("dpt : ", dpt); dpt :  Object { name: "Human Ressources", id: "Hr" }
            anArray.push(dpt);           
        });
        console.log("getDepts called", anArray); //getDepts called Array(5) [ {…}, {…}, {…}, {…}, {…} ]
        return(anArray)
    } catch (e) {
        console.log("error getting datas", e);
    }
};

/**
 * get states collection on firestore, order by name
*/
export async function getStates() {
    let anArray = [];
    try {
        let collRef = collection(db, 'states')
        const q = query(collRef, orderBy("name"));
        let data = await getDocs(q) // query : https://cloud.google.com/firestore/docs/query-data/queries  q au lieu de collRef
        data.docs.forEach(el => {
            let state = { ...el.data()} 
            anArray.push(state);           
        });

        console.log("getStates called", anArray);
        return(anArray)
    } catch (e) {
        console.log("error getting datas", e);
        
    }
};
