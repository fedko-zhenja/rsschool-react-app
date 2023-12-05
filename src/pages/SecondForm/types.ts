export interface ValidDataSecondForm {
    acceptTCRef: boolean;
    picture: FileList;
    confirmPassword: string;
    password: string;
    // country: string;
    email: string;
    gender: string;
    age: number;
    name: string;
}

import * as yup from 'yup';
import { userSchema } from '../../validations/userValidationSecondForm';

export interface ValidData extends yup.InferType<typeof userSchema> {}
