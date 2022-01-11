import React from 'react'

import { useEffect, useState } from 'react';

import db from '../firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore/lite';

import { useTable, useSortBy } from 'react-table'

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
    const data = React.useMemo(() =>arrayOfObjectsOfEmplyees)
    //console.log('data :', data )

    const columns = React.useMemo(
    () => [ 
        { 
            Header: 'first Name', 
            accessor: 'firstName', // accessor is the "key" in the data 
            },
            { 
            Header: 'last Name', 
            accessor: 'lastName', 
            }, 
            { 
            Header: 'Start Date', 
            accessor: 'startDateOk', 
            },
            { 
            Header: 'Department', 
            accessor: 'department', 
            },
            { 
            Header: 'Date of Birth', 
            accessor: 'birthDateOk', 
            },
            { 
            Header: 'Street', 
            accessor: 'street', 
            },
            { 
            Header: 'City', 
            accessor: 'city', 
            },
            { 
            Header: 'State', 
            accessor: 'state', 
            },

            { 
            Header: 'Zip Code', 
            accessor: 'zip', 
            }
    ],
    []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy)

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

    async function getDatas() {
        let employeeArray = [];
        try {
            let collRef = await collection(db, 'employee')
            let data = await getDocs(collRef)
            data.docs.map(el => {
                let employee = { ...el.data(), 'id': el.id , 'startDateOk': convertTimeToday(el.data().startDate.seconds) , 'birthDateOk': convertTimeToday(el.data().birthDate.seconds)} // ad the id of the current  object
                employeeArray.push(employee);
                return  employeeArray; // map expect a return
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
            {/*arrayOfObjectsOfEmplyees.map((item) => (
                <div key={item.id}> {item.lastName} </div>
            ))*/}

<table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps(column.getSortByToggleProps())}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'white',
                       color: 'black'
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>

    </>
    )
}

export default PageEmployees;