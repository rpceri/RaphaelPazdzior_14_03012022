import { useEffect, useState } from 'react';

import db from '../firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore/lite';

/**
 * Return template of employee's page where we see alloff them in a sheet
 *
 * @component
 * @summary imported in Route
 * @param {  }
 * @return { HTMLElement }
*/
 function  PageEmployees() {
    const [arrayOfObjectsOfEmplyees, setObjectsOfEmplyees] = useState([]);

    async function getDatas() {
        let employeeArray = [];
        try {
            let collRef = await collection(db, 'employee')
            let data = await getDocs(collRef)
            data.docs.map(el => {
                let employee = { ...el.data(), 'id': el.id}
                employeeArray.push(employee);
            });
            setObjectsOfEmplyees(employeeArray)
        } catch (e) {
            console.log("error getting datas", e);
            return 'error';
        }
        console.log("getDatas called", employeeArray);

    }

    useEffect(() => {
        getDatas()
    }, [])

    return (
    <>
            {arrayOfObjectsOfEmplyees.map((item) => (
                <div> {item.lastName} </div>
            ))}

    </>
    )
}

export default PageEmployees;