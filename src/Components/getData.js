import db from '../firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore/lite';


    /**
     * to convert a timestamps in fr 
     * @param {timestamp} timestamp 
     * @returns 
     */
     function convertTimeToday(timestamp) {
      let aDate = ''
      if (timestamp !== undefined) {
          var date = new Date(timestamp*1000);
          aDate= date.getDate()+"/"+(date.getMonth()+1)+ "/"+date.getFullYear()
          //console.log(`${timestamp} converted to ${aDate}`)
      }
      //else console.log(`${timestamp} connot be converted`)
      return aDate
  }


export default  async function getData() {
    let employeeArray = [];
    try {
        let collRef = await collection(db, 'employee')
        let data = await getDocs(collRef)
        data.docs.map(el => {
            let employee = { ...el.data(), 'id': el.id , 'startDateOk': convertTimeToday(el.data().startDate.seconds) , 'birthDateOk': convertTimeToday(el.data().birthDate.seconds)} // ad the id of the current  object
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
