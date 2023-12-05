import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../validations/userValidationSecondForm';
import { ValidData } from './types';

export function SecondForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        // reset,
    } = useForm({ resolver: yupResolver(userSchema) });

    const onSubmitHandler: SubmitHandler<ValidData> = (data) => {
        console.log({ data });
        // reset();
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

                    {/* <AutoComplete errorMessage={errorMessage} ref={countryRef} /> */}

                    <li className="item-password">
                        <label className="label">Password</label>
                        <input {...register('password')} className="input" type="password" />
                        <span className="error-message">{errors.password?.message}</span>
                        {/* <span style={{ color: passwordStrength[1] }}>{passwordStrength[0]}</span> */}
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
                        <button className="submit-btn" type="submit">
                            Submit
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    );
}
