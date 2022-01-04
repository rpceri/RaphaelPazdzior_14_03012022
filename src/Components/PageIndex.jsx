import { useState } from 'react';
import { Link } from 'react-router-dom';


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
    const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [department, setDepartment] = useState('');

    const [resetBirth, setResetBirth] = useState(Math.random());
    const [resetStart, setResetstart] = useState(Math.random());
    const [reset, setReset] = useState(false);
    const [error, setError] = useState(false);
    const [addEmployeeMessage, setAddEmployeeMessage] = useState('');

    const [isVisible, setIsVisibile] = useState(false);


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


            setFirstNameError('');
            setLastNameError('');
            setSteetError('');
            setCityError('');
            setStateError('');
            setZipError('');
            setDepartmentError('');
        
            setResetBirth(Math.random());
            setResetstart(Math.random());
            setReset(!reset);
            setFirstName('');
            setLastName('');
            setStreet('');
            setCity('');
            setZip(0);
        }
    }

    return ( <>
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
                    {stateError ? <div className="form-error">{stateError}</div> : null}

                    <label htmlFor="zip-code">Zip Code</label>
                    <input id='zip-code' className='input' type="number" value={zip} onChange={(event) => setZip(event.target.value)} />
                    {zipError ? <div className="form-error">{zipError}</div> : null}

                    <label htmlFor="department">Department</label>
                    <input id='department-code' className='input' type="number" value={{department}} onChange={(event) => setDepartment(event.target.value)} />
                    {departmentError ? <div className="form-error">{departmentError}</div> : null}

                </div>
            </form>
            <button onClick={handleSubmit}>Save</button>
        </div>

    </>
  );
}

export default PageIndex;