import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Form from 'react-bootstrap/Form';
// import {updateProfile} from "../profile/profile-reducer";
import {Link} from "react-router-dom";
import {updateProfileThunk} from "../services/users-thunk";
import validator from "validator";

const EditProfileComponent = () => {
    const {currentUser} = useSelector((state) => state.users);

    let [email, setEmail] = useState(currentUser.email);
    let [address, setAddress] = useState(currentUser.address);
    let [phone, setPhone] = useState(currentUser.phone);
    let [ngoHead, setNgoHead] = useState(currentUser.ngoHead);
    let [ngoDesc, setNgoDesc] = useState(currentUser.ngoDesc);
    let [ngoCause, setNgoCause] = useState(currentUser.ngoCause);
    let [donorProf, setdonorProf] = useState(currentUser.donorProf);
    let [donorSalary, setdonorSalary] = useState(currentUser.donorSalary);
    let [donorMaxDon, setdonorMaxDon] = useState(currentUser.donorMaxDon);

    const [emailError, setEmailError] = useState('');
    const validateEmail = (e) => {
        setEmail(e.target.value);
        var email = e.target.value;
        if (!validator.isEmail(email)) {
            setEmailError('Enter valid Email')
        } else {
            setEmailError('')
            setEmail(email);
        }
    };

    const initialize = (e) => {
        setAddress(e.target.value)
        var autocomplete = new window.google.maps.places.Autocomplete(
            (document.getElementById('editAddress')),
            {types: ['geocode']});
        autocomplete.addListener('place_changed', fillInAddress);
    }

    function fillInAddress() {
        var place = this.getPlace();
        setAddress(place.formatted_address);
    }

    const dispatch = useDispatch();
    const saveProfile = (updatedProfile) => {
        dispatch(updateProfileThunk(updatedProfile));
    }

    if (currentUser) {
        var isNgo = (currentUser.role === "NGO");
    }

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-12 col-xl-12">
                        <div className="card"
                             style={{borderRadius: "15px", backgroundColor: "#ebf2fa"}}>
                            <div className="card-body text-center">
                                <div className="mt-3 mb-4">
                                    <h3 className="fw-bold" style={{color: "#5a4099"}}>Edit Profile</h3>
                                </div>
                                <form className="card-body p-lg-4">
                                    <div className="mb-3">
                                        <Form.Control type="text" className="form-control"
                                                      id="editMail"
                                                      placeholder="Email" value={email} required
                                                      onChange={(e) => validateEmail(e)}/>
                                        <span style={{
                                            fontWeight: 'bold',
                                            color: 'red',
                                        }}>{emailError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <Form.Control type="tel" className="form-control"
                                                      id="editPhone"
                                                      placeholder="Phone Number(10 digits)"
                                                      pattern="[0-9]{10}" value={phone} required
                                                      onChange={(event) => setPhone(
                                                          event.target.value)}/>
                                    </div>
                                    <div className="mb-3">
                                        <Form.Control type="text" className="form-control"
                                                      id="editAddress"
                                                      placeholder="Address" value={address} required
                                                      onChange={(event) => initialize(event)}/>
                                    </div>

                                    <div className="mb-3">
                                        {isNgo ? <Form.Control type="text" className="form-control"
                                                               id="editHead"
                                                               placeholder="Name of the NGO Head"
                                                               value={ngoHead} required
                                                               onChange={(event) => setNgoHead(
                                                                   event.target.value)}/> : ""}
                                    </div>
                                    <div className="mb-3">
                                        {isNgo ? <Form.Control type="text" className="form-control"
                                                               id="editDesc"
                                                               placeholder="NGO Description"
                                                               value={ngoDesc} required
                                                               onChange={(event) => setNgoDesc(
                                                                   event.target.value)}/> : ""}
                                    </div>
                                    <div className="mb-3">
                                        {isNgo ? <Form.Control type="text" className="form-control"
                                                               id="editCause"
                                                               placeholder="Primary cause"
                                                               value={ngoCause} required
                                                               onChange={(event) => setNgoCause(
                                                                   event.target.value)}/> : ""}
                                    </div>
                                    <div className="mb-3">
                                        {isNgo ? "" : <Form.Control type="text"
                                                                    className="form-control"
                                                                    id="editProf"
                                                                    placeholder="Profession"
                                                                    value={donorProf} required
                                                                    onChange={(event) => setdonorProf(
                                                                        event.target.value)}/>}
                                    </div>
                                    <div>
                                        {isNgo ? "" : <Form.Control type="number"
                                                                    className="form-control mb-3"
                                                                    id="editSalary"
                                                                    placeholder="Salary"
                                                                    value={donorSalary} required
                                                                    onChange={(event) => setdonorSalary(
                                                                        event.target.value)}/>}
                                    </div>
                                    <div>
                                        {isNgo ? "" : <Form.Control type="number"
                                                                    className="form-control mb-3"
                                                                    id="editDonation"
                                                                    placeholder="Maximum possible donation"
                                                                    value={donorMaxDon} required
                                                                    onChange={(event) => setdonorMaxDon(
                                                                        event.target.value)}/>}
                                    </div>
                                    <div className="text-center">
                                        <Link to="../profile">
                                            <button
                                                className="btn btn-color px-5 mb-3 w-100 text-white"
                                                type="submit"
                                                style={{backgroundColor: "#5a4099"}}
                                                onClick={() =>
                                                    saveProfile({
                                                                    ...currentUser,
                                                                    "email": email,
                                                                    "address": address,
                                                                    "phone": phone,
                                                                    "ngoHead": ngoHead,
                                                                    "ngoDesc": ngoDesc,
                                                                    "ngoCause": ngoCause,
                                                                    "donorProf": donorProf,
                                                                    "donorSalary": donorSalary,
                                                                    "donorMaxDon": donorMaxDon
                                                                })}>Update
                                            </button>
                                        </Link>
                                    </div>
                                    <div id="reg-log"
                                         className="form-text text-center mb-3 text-dark">Do not
                                        want to make any changes?&nbsp;
                                        <Link to="/profile" className="fw-bold text-decoration-none"
                                              style={{color: "#5a4099"}}> Go back</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfileComponent;