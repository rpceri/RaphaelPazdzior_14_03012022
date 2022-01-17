import db from '../firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore/lite';



export default  async function getData() {
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
        return 'error';
    }
}
