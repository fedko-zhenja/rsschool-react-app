import * as yup from 'yup';

export const userSchema = yup.object().shape({
    name: yup
        .string()
        .required()
        .test('is-uppercase', 'The first letter must be capitalized', (value) => {
            return !value || /^[A-Z]/.test(value);
        }),

    age: yup.number().required(),
    gender: yup.string().required(),

    email: yup.string().email().required(),

    password: yup
        .string()
        .min(4)
        .max(10)
        .required()
        .test(
            'is-valid-password',
            'The password must contain a number, uppercase and lowercase letters, and a special character',
            (value) => {
                return /^(?=.*\d)(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/.test(value);
            }
        ),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Password confirmation is required'),
});
