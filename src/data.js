import db from './firebaseConfig.js';
import { collection, getDocs, addDoc, query, orderBy} from 'firebase/firestore/lite';


/**
 * get employee's list, return an array
*/
export  default async function getData() {
    var depts = await getDepts()
    var states = await getStates()
    //console.log("depts : ", depts);
    let employeeArray = [];
    try {
        let collRef = collection(db, 'employee')
        let data = await getDocs(collRef)
        data.docs.forEach((el) => {
            let dateStartTimeStamp = '';
            //console.log(el.data())
            // ??? have to check what is correct! : != undefine or !== 'undefined' or...
            if(el.data().startDate != null && typeof el.data().startDate.seconds != undefined) dateStartTimeStamp = el.data().startDate.seconds * 1000
            else {
                dateStartTimeStamp = -599587564
                console.log(el.data().firstName + ' ' + el.data().lastName + ' : no sratDate', el.data())
            }

            let dateBirthDateOkTimeStamp = '';
            if(el.data().birthDate != null && el.data().birthDate.seconds !== undefined) dateBirthDateOkTimeStamp =el.data().birthDate.seconds * 1000
            else {
                dateBirthDateOkTimeStamp = -599587564
                console.log(el.data().firstName + ' ' + el.data().lastName + ' : no sratDate', el.data())
            }

            let libDep = ''
            /*depts.forEach((el2) => { this is no good, because we canot do break in a forEach when item found....
                if(el2.id === el.data().department) libDep = el2.name 
            })*/
            for (let i = 0; i < depts.length; i++) {
                if(depts[i].id === el.data().department) {
                    libDep = depts[i].name
                    break
                }
             }
            let libState = ''
            for (let i = 0; i < states.length; i++) {
                if(states[i].id === el.data().state) {
                    libState = states[i].name
                }
            }

            let employee = { ...el.data(), 'id': el.id , 'dateStartTimeStamp':  dateStartTimeStamp, 'dateBirthDateOkTimeStamp': dateBirthDateOkTimeStamp
            , 'libDep': libDep, 'libState': libState} // ad the id of the current  object
            employeeArray.push(employee);           
        });
        //console.log("getDatas called", employeeArray);
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
        //console.log("getDepts called", anArray); //getDepts called Array(5) [ {…}, {…}, {…}, {…}, {…} ]
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

        //console.log("getStates called", anArray);
        return(anArray)
    } catch (e) {
        console.log("error getting datas", e);
        
    }
};
