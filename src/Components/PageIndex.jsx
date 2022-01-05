import { useState } from 'react';
import { Link } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

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


    
    const [firstName, setFirstName] = useState('First name');
    const [lastName, setLastName] = useState('Last name');
    const [birthDate, setBirthDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [street, setStreet] = useState('the street');
    const [city, setCity] = useState('the city');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('42230');
    const [department, setDepartment] = useState('');

    const [error, setError] = useState(false);
    const [addEmployeeMessage, setAddEmployeeMessage] = useState('');


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
    }

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
                department: department,
                insertionDate: new Date()
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

    // called fonction when a departement is selectedd
    function onSelectDepartement({ key }) {
        let libelleDuChoix = dpts.find(el => el.id === key);
        console.log(`choix dropdown departement associé à la clé ${key} : `, libelleDuChoix.name);
        setSeletedDepartementName(libelleDuChoix.name)
        setDepartment(key)
    }
    // called fonction when a state is selectedd
    function onSelectState({ key }) {
        let libelleDuChoix = states.find(el => el.id === key);
        console.log(`choix dropdown state associé à la clé ${key} : `, libelleDuChoix.name);
        setSeletedStateName(libelleDuChoix.name)
        setState(key)
    }

    function onVisibleChangeDropDown(visible) {
        //console.log(visible); return true. no need in this project
    }

    const dpts = [{id : 'Se1', name : 'Sales'},
    {id : 'Ma1', name : 'Marketing'},
    {id : 'En1', name : 'Engineering'},
    {id : 'Hr1', name : 'Human Ressources'},
    {id : 'Le1', name : 'Legal'}] // tableau contenant des objet, pourra ettre mappé
    // fonctionne pas , a essayer quand meme..???
    const dptsObj = {Se : 'Salesi', Ma : 'Marketing', En : 'Engineering', Hr: 'Human Ressources', Le :'Legal'}; // les tableaux associatifs sont des objets dynamiques que l'utilisateur redéfinit selon ses besoins. https://www.xul.fr/ecmascript/associatif.php

    function departementsList () {
        /*plus simple mais pas d'index : const dptsSimple = ['Sales', 'Marketing', 'Engineering', 'Human Ressources', 'Legal'];   
        {dptsSimple.map((item) => (
            <MenuItem key={item}>{item}</MenuItem>
        ))}*/

        //console.log('dpts', dpts)
        //console.log('dptsObj', dptsObj)
        /*Object.keys(dptsObj).forEach((dpt) => (
            console.log('dpt', dpt)

        ))
        idem  mais peut pas etre produit dans le retun :
        let items = ''
        for(var i in dptsObj) {
            items = items + '<MenuItem key="' + i + '"> ' + departments[i] + '</MenuItem>'
        }*/
        //https://openclassrooms.com/fr/courses/7008001-debutez-avec-react/7135593-gagnez-en-temps-et-en-efficacite-grace-aux-listes-et-aux-conditions
        return (<Menu onSelect={onSelectDepartement}>
            {dpts.map((item) => (
                <MenuItem key={item.id}>{item.name}</MenuItem>
            ))}

            {Object.keys(dptsObj).forEach(dpt => (
                <MenuItem key={dpt}>{dptsObj[dpt]}</MenuItem>
            ))}
        </Menu>)
    }
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

    function statesList () {
        return (<Menu onSelect={onSelectState}>
            {states.map((item) => (
                <MenuItem key={item.id}>{item.name}</MenuItem>
            ))}
        </Menu>)
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
                    <DatePicker selected={birthDate} onChange={(date) => setBirthDate(date)} />
                    
                    <label htmlFor="start-date">Start Date</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
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
            {addEmployeeMessage}
            {error }
        </div>

    </>
  );
}

export default PageIndex;