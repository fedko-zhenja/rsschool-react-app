import React, { useRef } from 'react';
import { AutoComplete } from '../../components/AutoComplete';
import './FirstForm.css';

export function FirstForm() {
    const nameRef = useRef(null);
    const ageRef = useRef(null);
    const genderRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const pictureRef = useRef(null);
    const acceptTCRef = useRef(null);
    console.log(nameRef);

    const handleSubmit = () => {
        alert(`Name: ${nameRef}`);
    };

    return (
        <div className="form-wrapper">
            <h2>First Form</h2>
            <form onSubmit={handleSubmit}>
                <ul className="list">
                    <li>
                        <label className="label">Name</label>
                        <input className="input" type="text" ref={nameRef} />
                    </li>

                    <li>
                        <label className="label">Age</label>
                        <input className="input" type="number" min="0" max="100" ref={ageRef} />
                    </li>

                    <li className="item_select">
                        Gender
                        {/* <span>
                            <input className="input" type="radio" name="gender" value="Man" />
                            <label className="label">Man</label>
                        </span>

                        <span>
                            <input className="input" type="radio" name="gender" value="Woman" />
                            <label className="label">Woman</label>
                        </span> */}
                        <select name="gender" defaultValue={'default'} id="gender" className="select" ref={genderRef}>
                            <option value="default" disabled>
                                ---
                            </option>
                            <option value="man">Man</option>
                            <option value="woman">Woman</option>
                        </select>
                    </li>

                    <li>
                        <label className="label">Email</label>
                        <input className="input" type="email" ref={emailRef} />
                    </li>

                    <AutoComplete />

                    <li>
                        <label className="label">Password</label>
                        <input className="input" type="password" ref={passwordRef} />
                    </li>

                    <li>
                        <label className="label">Confirm the password</label>
                        <input className="input" type="password" ref={confirmPasswordRef} />
                    </li>

                    <li>
                        <label className="label">Picture</label>
                        <input className="input" type="file" ref={pictureRef} />
                    </li>

                    <li className="item_checkbox">
                        <input className="input" type="checkbox" ref={acceptTCRef} />
                        <label className="label">Accept the terms and conditions</label>
                    </li>
                    <li>
                        <button className="submit-btn" type="submit">
                            Submit
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    );
}
