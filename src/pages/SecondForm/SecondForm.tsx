import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../validations/userValidationSecondForm';
import { ValidData } from './types';
import { AutoComplete } from '../../components/AutoComplete/AutoCompleteSecondForm';
import { useState } from 'react';
import { setIsDataLoaded, setDataToHistory } from '../../store/reducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function SecondForm() {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<ValidData>({ mode: 'onTouched', resolver: yupResolver(userSchema) });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [passwordStrength, setPasswordStrength] = useState(['', '']);

    const encodeFile = (file: File) => {
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
    };

    const onSubmitHandler: SubmitHandler<ValidData> = async (data) => {
        const picture = await encodeFile(data.picture[0]);
        data.picture = picture as FileList;
        dispatch(setIsDataLoaded(true));
        dispatch(setDataToHistory(data));
        navigate('/');
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === 0) {
            setPasswordStrength(['', '']);
        }

        if (event.target.value.length > 0 && event.target.value.length <= 4) {
            setPasswordStrength(['weak password', 'red']);
        }

        if (event.target.value.length > 4 && event.target.value.length <= 7) {
            setPasswordStrength(['medium password', 'orange']);
        }

        if (event.target.value.length > 7 && event.target.value.length <= 10) {
            setPasswordStrength(['strong password', 'green']);
        }
    };

    return (
        <div className="form-wrapper">
            <h2>Second Form</h2>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <ul className="form-list">
                    <li>
                        <label className="label">Name</label>
                        <input {...register('name')} className="input" type="text" />
                        <span className="error-message">{errors.name?.message}</span>
                    </li>

                    <li>
                        <label className="label">Age</label>
                        <input {...register('age')} className="input" type="number" min="0" max="100" />
                        <span className="error-message">{errors.age?.message}</span>
                    </li>

                    <li className="item_select">
                        Gender
                        <select {...register('gender')} name="gender" defaultValue={'default'} className="select">
                            <option value="default" disabled>
                                ---
                            </option>
                            <option value="man">Man</option>
                            <option value="woman">Woman</option>
                        </select>
                        <span className="error-message">{errors.gender?.message}</span>
                    </li>

                    <li>
                        <label className="label">Email</label>
                        <input {...register('email')} className="input" type="email" />
                        <span className="error-message">{errors.email?.message}</span>
                    </li>

                    <AutoComplete
                        setValue={setValue}
                        register={register('country')}
                        errorMessage={errors.country?.message}
                    />

                    <li className="item-password">
                        <label className="label">Password</label>
                        <input
                            {...register('password')}
                            className="input"
                            type="password"
                            onChange={handlePasswordChange}
                        />
                        <span className="error-message">{errors.password?.message}</span>
                        <span style={{ color: passwordStrength[1] }}>{passwordStrength[0]}</span>
                    </li>

                    <li>
                        <label className="label">Confirm the password</label>
                        <input {...register('confirmPassword')} className="input" type="password" />
                        <span className="error-message">{errors.confirmPassword?.message}</span>
                    </li>

                    <li>
                        <label className="label">Picture</label>
                        <input {...register('picture')} className="input" type="file" />
                        <span className="error-message">{errors.picture?.message}</span>
                    </li>

                    <li className="item_checkbox">
                        <input {...register('acceptTCRef')} className="input" type="checkbox" />
                        <label className="label">Accept the terms and conditions</label>
                        <span className="error-message">{errors.acceptTCRef?.message}</span>
                    </li>
                    <li>
                        <button type="submit" disabled={!isDirty || !isValid}>
                            Submit
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    );
}
