import React, { useRef } from 'react';
import { AutoComplete } from '../../components/AutoComplete';
import './FirstForm.css';

export function FirstForm() {
    const inputRef = useRef(null);
    console.log(inputRef);

    const handleSubmit = () => {
        alert(`Name: ${inputRef}`);
    };

    return (
        <div className="form-wrapper">
            <h2>First Form</h2>
            <form onSubmit={handleSubmit}>
                <ul className="list">
                    <li>
                        <label className="label">Name</label>
                        <input className="input" type="text" ref={inputRef} />
                    </li>

                    <li>
                        <label className="label">Age</label>
                        <input className="input" type="number" min="0" max="100" />
                    </li>

                    <li className="item_radio">
                        <span>
                            <input className="input" type="radio" name="gender" value="Man" />
                            <label className="label">Man</label>
                        </span>

                        <span>
                            <input className="input" type="radio" name="gender" value="Woman" />
                            <label className="label">Woman</label>
                        </span>
                    </li>

                    <li>
                        <label className="label">Email</label>
                        <input className="input" type="email" />
                    </li>

                    <AutoComplete />

                    <li>
                        <label className="label">Password</label>
                        <input className="input" type="password" />
                    </li>

                    <li>
                        <label className="label">Confirm the password</label>
                        <input className="input" type="password" />
                    </li>

                    <li>
                        <label className="label">Picture</label>
                        <input className="input" type="file" />
                    </li>

                    <li className="item_checkbox">
                        <input className="input" type="checkbox" />
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
