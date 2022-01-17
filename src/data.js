import db from './firebaseConfig.js';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';



export  default async function getData() {
    let employeeArray = [];
    try {
        let collRef = await collection(db, 'employee')
        let data = await getDocs(collRef)
        data.docs.map(el => {
            let dateStartTimeStamp = '';
            if(el.data().startDate.seconds !== undefined) dateStartTimeStamp =el.data().startDate.seconds * 1000
            let dateBirthDateOkTimeStamp = '';
            if(el.data().startDate.seconds !== undefined) dateBirthDateOkTimeStamp =el.data().birthDate.seconds * 1000
            let employee = { ...el.data(), 'id': el.id , 'dateStartTimeStamp':  dateStartTimeStamp, 'dateBirthDateOkTimeStamp': dateBirthDateOkTimeStamp} // ad the id of the current  object
            employeeArray.push(employee);           
            return  employeeArray; // map expect a return
        });
        //console.log("getDatas called", employeeArray);
        return(employeeArray)
    } catch (e) {
        console.log("error getting datas", e);
        
    }
};

export async function setData(datas) {
    try {
        let collRef = await collection(db, 'employee')
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
        let msg = `${datas.firstName}  ${datas.lastName} added`
        return(msg)
    } catch (error) {
        console.log('pb add collection', error)
        //setError(true);
        return 'error';
    }
}
