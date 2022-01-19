import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

import {setData, setStats, setDepts, getDepts, getStates} from '../data.js'

import Modal from './Modal-rp/Modal-rp.js';

/**
 * Return template of home page
 *
 * @component
 * @summary imported in Route
 * @param {  }
 * @return { HTMLElement }
*/
function PageIndex() {    
    const [firstName, setFirstName] = useState('First name');
    const [lastName, setLastName] = useState('Last name');
    const [birthDate, setBirthDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [street, setStreet] = useState('the street');
    const [city, setCity] = useState('the city');
    const [state, setState] = useState('AL');
    const [zip, setZip] = useState('42230');
    const [department, setDepartment] = useState('Se');

    /** for modal */
    const [messageInformation, setMessageInformation] = useState('');

    const [isModalVisible, setModaleVisible] = useState(false);
    const handleModalResponse = () => {
        setModaleVisible(false);
        setMessageInformation('');
    }
    /** end for modal */

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [streetError, setSteetError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [zipError, setZipError] = useState('');
    const [departmentError, setDepartmentError] = useState('');

    const [seletedDepartementName, setSeletedDepartementName] = useState('select');
    const [seletedStateName, setSeletedStateName] = useState('select');



    function validate () {
        let firstNameErrorMessage = '';
        let lastNameErrorMessage = '';
        let streetErrorMessage = '';
        let cityErrorMessage = '';
        let stateErrorMessage = '';
        let zipErrorMessage = '';
        let departmentErrorMessage = '';
        
        if (!firstName) { firstNameErrorMessage = 'First name required' };
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

            setMessageInformation('Sorry, you have to complete all areas');
            setModaleVisible(true);

            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        if (validate()) {
            e.preventDefault();
            recordDatas()
        }
    }

    async function recordDatas() {
        //setMessageInformation('First name Last name added');
        //setModaleVisible(true);

        let arr = {firstName : firstName, lastName : lastName, birthDate : birthDate, startDate: startDate, street :street
            , city :city, state :state, zip :zip, department :department, insertionDate :new Date()}
        setData(arr).then(function(msg) {
            setMessageInformation(msg);
            setModaleVisible(true);
        });

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

    // called fonction when a departement is selectedd
    function onSelectDepartement({ key }) {
        let libelleDuChoix = dpts.find(el => el.id === key);
        console.log(`choix dropdown departement associé à la clé ${key} : `, libelleDuChoix.name);
        setSeletedDepartementName(libelleDuChoix.name)
        setDepartment(key)
    }
    // called fonction when a state is selected
    function onSelectState({ key }) {
        let libelleDuChoix = states.find(el => el.id === key);
        console.log(`choix dropdown state associé à la clé ${key} : `, libelleDuChoix.name);
        setSeletedStateName(libelleDuChoix.name)
        setState(key)
    }

    function onVisibleChangeDropDown(visible) {
        //console.log(visible); return true. no need in this project
    }


    function departementsList () {
        //https://openclassrooms.com/fr/courses/7008001-debutez-avec-react/7135593-gagnez-en-temps-et-en-efficacite-grace-aux-listes-et-aux-conditions
        return (<Menu onSelect={onSelectDepartement}>
            {dpts.map((item) => (
                <MenuItem key={item.id}>{item.name}</MenuItem>
            ))}
        </Menu>)
    }

    function statesList () {
        return (<Menu onSelect={onSelectState}>
            {states.map((item) => (
                <MenuItem key={item.id}>{item.name}</MenuItem>
            ))}
        </Menu>)
    }

    const [dpts , setObjectsOfDpts] = useState([]);
    const [states , setObjectsOfStates] = useState([]);
    useEffect(() => {
        //setStats() //called one time to set states dattas on firestore
        //setDepts() //called one time to set departements dattas on firestore
        getDepts().then(function(array) {
            setObjectsOfDpts(array)
            //console.log('ppf', employeeArray)
            //setLoaded(1)
        });
        getStates().then(function(array) {
            setObjectsOfStates(array)
            //console.log('ppf', employeeArray)
            //setLoaded(1)
        });
    }, [])

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
                    <DatePicker selected={birthDate} onChange={(date) => setBirthDate(date)} dateFormat="dd/MM/yyyy" />
                    
                    <label htmlFor="start-date">Start Date</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />
                </div>
                <div className="address">
                    <label htmlFor="street">Street</label>
                    <input id="street" className='input' type="text" value={street} onChange={(event) => setStreet(event.target.value)} />
                    {streetError ? <div className="form-error">{streetError}</div> : null}

                    <label htmlFor="city">City</label>
                    <input id='city' className='input' type="text" value={city} onChange={(event) => setCity(event.target.value)} />
                    {cityError ? <div className="form-error">{cityError}</div> : null}

                    <label htmlFor="state">State</label>
                    <Dropdown
                        trigger={['click']}
                        overlay={statesList()}
                        animation="slide-up"
                        onVisibleChange={onVisibleChangeDropDown} >
                            <button style={{ width: 150, height: 20, fontSize:10, marginTop: 1 }}>{seletedStateName}</button>
                    </Dropdown>
                    {stateError ? <div className="form-error">{stateError}</div> : null}

                    <label htmlFor="zip-code">Zip Code</label>
                    <input id='zip-code' className='input' type="number" value={zip} onChange={(event) => setZip(event.target.value)} />
                    {zipError ? <div className="form-error">{zipError}</div> : null}

                    <label htmlFor="department">Department</label> 
                    <Dropdown
                        trigger={['click']}
                        overlay={departementsList()}
                        animation="slide-up"
                        onVisibleChange={onVisibleChangeDropDown} >
                            <button style={{ width: 150, height: 20, fontSize:10, marginTop: 1 }}>{seletedDepartementName}</button>
                    </Dropdown>      
                    {departmentError ? <div className="form-error">{departmentError}</div> : null}
                </div>
            </form>
            <button onClick={handleSubmit}>Save</ button>
            <Modal isModalVisible={isModalVisible} message={messageInformation} buttonLabel='Ok' handleModalResponse={handleModalResponse} />
        </div>

    </>
  );
}

export default PageIndex;