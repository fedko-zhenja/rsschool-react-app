import * as yup from 'yup';

export const userSchema = yup.object().shape({
    acceptTCRef: yup
        .boolean()
        .required()
        .test('is-true', 'Accept the terms and conditions', function (value) {
            return value;
        }),

    picture: yup
        .mixed<FileList>()
        .required('Picture is required')
        .test(
            'is-valid-picture',
            'Invalid picture format, the format should have been .pgn or .jpeg(.jpg)',
            (value) => {
                if (!value.length) {
                    return false;
                }
                const fileName = value[0].name.toLocaleLowerCase() || '';

                if (fileName.includes('.png') || fileName.includes('.jpeg') || fileName.includes('.jpg')) {
                    return true;
                }
                return false;
            }
        ),

    confirmPassword: yup
        .string()
        .min(4)
        .max(10)
        .required('Password confirmation is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),

    password: yup
        .string()
        .min(4)
        .max(10)
        .required('Password is required')
        .test(
            'is-valid-password',
            'The password must contain a number, uppercase and lowercase letters, and a special character',
            (value) => {
                return /^(?=.*\d)(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/.test(value);
            }
        ),

    // country: yup
    //     .string()
    //     .required('choose the country')
    //     .test('is-valid-country', 'choose the country', (value) => {
    //         return countryData.includes(value);
    //     }),

    email: yup.string().email().required(),

    gender: yup
        .string()
        .required()
        .test('is-valid-gender', 'Select gender', (value) => {
            return value === 'man' || value === 'woman';
        }),

    age: yup
        .number()
        .typeError('enter your age')
        .required('enter your age')
        .test('is-valid-age', 'Age must be from 0 to 100', (value) => {
            return value >= 0 && value <= 100;
        }),

    name: yup
        .string()
        .required('enter your name')
        .test('is-uppercase', 'The first letter must be capitalized', (value) => {
            return !value || /^[A-Z]/.test(value);
        }),
});
