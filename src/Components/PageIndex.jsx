import { useState } from 'react';
import { Link } from 'react-router-dom';

import db from '../firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore/lite';

/**
 * Return template of home page
 *
 * @component
 * @summary imported in Route
 * @param {  }
 * @return { HTMLElement }
*/
function PageIndex() {
    const departments = ['Sales', 'Marketing', 'Engineering', 'Human Ressources', 'Legal'];
    const states = [
        {"name": "Alabama", "abbreviation": "AL"},
        {"name": "Alaska", "abbreviation": "AK"},
        {"name": "American Samoa", "abbreviation": "AS"},
        {"name": "Arizona", "abbreviation": "AZ"},
        {"name": "Arkansas", "abbreviation": "AR"},
        {"name": "California", "abbreviation": "CA"},
        {"name": "Colorado", "abbreviation": "CO"},
        {"name": "Connecticut", "abbreviation": "CT"},
        {"name": "Delaware", "abbreviation": "DE"},
        {"name": "District Of Columbia", "abbreviation": "DC"},
        {"name": "Federated States Of Micronesia", "abbreviation": "FM"},
        {"name": "Florida", "abbreviation": "FL"},
        {"name": "Georgia", "abbreviation": "GA"},
        {"name": "Guam", "abbreviation": "GU"},
        {"name": "Hawaii", "abbreviation": "HI"},
        {"name": "Idaho", "abbreviation": "ID"},
        {"name": "Illinois", "abbreviation": "IL"},
        {"name": "Indiana", "abbreviation": "IN"},
        {"name": "Iowa", "abbreviation": "IA"},
        {"name": "Kansas", "abbreviation": "KS"},
        {"name": "Kentucky", "abbreviation": "KY"},
        {"name": "Louisiana", "abbreviation": "LA"},
        {"name": "Maine", "abbreviation": "ME"},
        {"name": "Marshall Islands", "abbreviation": "MH"},
        {"name": "Maryland", "abbreviation": "MD"},
        {"name": "Massachusetts", "abbreviation": "MA"},
        {"name": "Michigan", "abbreviation": "MI"},
        {"name": "Minnesota", "abbreviation": "MN"},
        {"name": "Mississippi", "abbreviation": "MS"},
        {"name": "Missouri", "abbreviation": "MO"},
        {"name": "Montana", "abbreviation": "MT"},
        {"name": "Nebraska", "abbreviation": "NE"},
        {"name": "Nevada", "abbreviation": "NV"},
        {"name": "New Hampshire", "abbreviation": "NH"},
        {"name": "New Jersey", "abbreviation": "NJ"},
        {"name": "New Mexico", "abbreviation": "NM"},
        {"name": "New York", "abbreviation": "NY"},
        {"name": "North Carolina", "abbreviation": "NC"},
        {"name": "North Dakota", "abbreviation": "ND"},
        {"name": "Northern Mariana Islands", "abbreviation": "MP"},
        {"name": "Ohio", "abbreviation": "OH"},
        {"name": "Oklahoma", "abbreviation": "OK"},
        {"name": "Oregon", "abbreviation": "OR"},
        {"name": "Palau", "abbreviation": "PW"},
        {"name": "Pennsylvania", "abbreviation": "PA"},
        {"name": "Puerto Rico", "abbreviation": "PR"},
        {"name": "Rhode Island", "abbreviation": "RI"},
        {"name": "South Carolina", "abbreviation": "SC"},
        {"name": "South Dakota", "abbreviation": "SD"},
        {"name": "Tennessee", "abbreviation": "TN"},
        {"name": "Texas", "abbreviation": "TX"},
        {"name": "Utah", "abbreviation": "UT"},
        {"name": "Vermont", "abbreviation": "VT"},
        {"name": "Virgin Islands", "abbreviation": "VI"},
        {"name": "Virginia", "abbreviation": "VA"},
        {"name": "Washington", "abbreviation": "WA"},
        {"name": "West Virginia", "abbreviation": "WV"},
        {"name": "Wisconsin", "abbreviation": "WI"},
        {"name": "Wyoming", "abbreviation": "WY"}
    ];
    
    const [firstName, setFirstName] = useState('First name');
    const [lastName, setLastName] = useState('Last name');
    const [birthDate, setBirthDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [street, setStreet] = useState('the street');
    const [city, setCity] = useState('the city');
    const [state, setState] = useState('State');
    const [zip, setZip] = useState('42230');
    const [department, setDepartment] = useState('42');

    const [error, setError] = useState(false);
    const [addEmployeeMessage, setAddEmployeeMessage] = useState('');


    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [streetError, setSteetError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [zipError, setZipError] = useState('');
    const [departmentError, setDepartmentError] = useState('');


  const validate = () => {

    let firstNameErrorMessage = '';
    let lastNameErrorMessage = '';
    let streetErrorMessage = '';
    let cityErrorMessage = '';
    let stateErrorMessage = '';
    let zipErrorMessage = '';
    let departmentErrorMessage = '';
      
    if (!firstName) { firstNameErrorMessage = 'Ffirst name required' };
    if (!lastName) { lastNameErrorMessage = 'Last name required' };
    if (!street) { streetErrorMessage = 'Street required' };
    if (!city) { cityErrorMessage = 'City required' };
    if (!state) { stateErrorMessage = 'State required' };
    if (!zip) { zipErrorMessage = 'Zip code required' };
    if (!department) { departmentErrorMessage = 'Department required' };

    if (firstNameErrorMessage || lastNameErrorMessage || streetErrorMessage || cityErrorMessage || stateErrorMessage || zipErrorMessage || departmentErrorMessage) {

        setFirstNameError(firstNameErrorMessage);
        setLastNameError(lastNameErrorMessage);
        setSteetError(streetErrorMessage);
        setCityError(cityErrorMessage);
        setStateError(stateErrorMessage);
        setZipError(zipErrorMessage);
        setDepartmentError(departmentErrorMessage);

      return false;
    }

      return true;
  };

    const handleSubmit = (e) => {
        if (validate()) {
            e.preventDefault();
            recordDatas()
        }
    }

    async function recordDatas() {
    try {
        let collRef = await collection(db, 'employee')
        await addDoc(collRef, {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            startDate: startDate,
            street: street,
            city: city,
            state: state,
            zip: zip,
            department: department
        });
        console.log("addDoc called");
        setAddEmployeeMessage(`${firstName}  ${lastName} added`);
    } catch (error) {
        console.log('pb add collection', error)
        setError(true);
    }

    setFirstNameError('');
    setLastNameError('');
    setSteetError('');
    setCityError('');
    setStateError('');
    setZipError('');
    setDepartmentError('');

    setFirstName('');
    setLastName('');
    setStreet('');
    setCity('');
    setZip(0);
    }
    return ( 
    <>
        <div className="title">
            <h1>HR.net</h1>
        </div>
        <div className="container">
            <Link className="link" to='/employeeList'>View Current Employees</Link>
            <h2>Create Employee</h2>
            <form className="container2">
                <div className="identity">
                    <label htmlFor="first-name">First Name</label>
                    <input className='input' id='first-name' type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                    {firstNameError ? <div className="form-error">{firstNameError}</div> : null}

                    <label htmlFor="last-name">Last Name</label>
                    <input id="last-name" className='input' type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                    {lastNameError ? <div className="form-error">{lastNameError}</div> : null}

                    <label htmlFor="date-of-birth">Date of Birth</label>

                    
                    <label htmlFor="start-date">Start Date</label>
 
                </div>
                <div className="address">
                    <label htmlFor="street">Street</label>
                    <input id="street" className='input' type="text" value={street} onChange={(event) => setStreet(event.target.value)} />
                    {streetError ? <div className="form-error">{streetError}</div> : null}

                    <label htmlFor="city">City</label>
                    <input id='city' className='input' type="text" value={city} onChange={(event) => setCity(event.target.value)} />
                    {cityError ? <div className="form-error">{cityError}</div> : null}

                    <label htmlFor="state">State</label>
                    <input id='state' className='input' type="text" value={state} onChange={(event) => setState(event.target.value)} />
                    {stateError ? <div className="form-error">{stateError}</div> : null}

                    <label htmlFor="zip-code">Zip Code</label>
                    <input id='zip-code' className='input' type="number" value={zip} onChange={(event) => setZip(event.target.value)} />
                    {zipError ? <div className="form-error">{zipError}</div> : null}

                    <label htmlFor="department">Department</label>
                    <input id='department-code' className='input' type="number" value={department} onChange={(event) => setDepartment(event.target.value)} />
                    {departmentError ? <div className="form-error">{departmentError}</div> : null}

                </div>
            </form>
            <button onClick={handleSubmit}>Save</ button>
            {addEmployeeMessage}
            {error }
        </div>

    </>
  );
}

export default PageIndex;