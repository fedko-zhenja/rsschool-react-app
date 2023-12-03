import React, { useRef } from 'react';
import { AutoComplete } from '../../components/AutoComplete/AutoComplete';
import './FirstForm.css';
import { userSchema } from '../../validations/userValidation';
import { ValidData } from './types';
import { useDispatch } from 'react-redux';

import {
    setCountry,
    setName,
    setAge,
    setGender,
    setEmail,
    setPassword,
    setIsAcceptTCRef,
    setIsDataLoaded,
    setPicture,
} from '../../store/reducer';

import { useNavigate } from 'react-router-dom';

export function FirstForm() {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const ageRef = useRef<HTMLInputElement | null>(null);
    const genderRef = useRef<HTMLSelectElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
    const pictureRef = useRef<HTMLInputElement | null>(null);
    const acceptTCRef = useRef<HTMLInputElement | null>(null);
    let currentCountry = '';

    const encodeFile = () => {
        const fileInput = pictureRef.current;
        if (fileInput?.files) {
            const file = fileInput.files[0];
            if (file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        const result = reader.result as string;
                        if (result) {
                            const base64String = result.split(',')[1];
                            resolve(base64String);
                        } else {
                            reject(new Error('Failed to read file'));
                        }
                    };

                    reader.onerror = reject;

                    reader.readAsDataURL(file);
                });
            } else {
                return Promise.reject(new Error('No file selected'));
            }
        }
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addDataToStor = async (data: ValidData) => {
        console.log(data);
        dispatch(setName(data.name));
        dispatch(setCountry(data.country));
        dispatch(setAge(data.age));
        dispatch(setGender(data.gender));
        dispatch(setEmail(data.email));
        dispatch(setPassword(data.password));
        dispatch(setIsAcceptTCRef(data.acceptTCRef));
        dispatch(setIsDataLoaded(true));

        try {
            const base64String = await encodeFile();
            dispatch(setPicture(base64String));
        } catch (error) {
            console.error(error);
        }
        navigate('/');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = {
            name: nameRef.current?.value,
            age: ageRef.current?.value,
            gender: genderRef.current?.value,
            email: emailRef.current?.value,
            country: currentCountry,
            password: passwordRef.current?.value,
            confirmPassword: confirmPasswordRef.current?.value,
            picture: pictureRef.current?.value,
            acceptTCRef: acceptTCRef.current?.checked,
        };

        userSchema
            .validate(formData)
            .then((validData) => {
                addDataToStor(validData);
            })
            .catch((errors) => {
                console.error(errors.errors);
            });
    };

    const handleCountryValue = (country: string) => {
        currentCountry = country;
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

                    <AutoComplete handleCountryValue={handleCountryValue} />

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
