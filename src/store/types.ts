interface FirstForm {
    country: string;
    countryNames: Array<string>;
    name: string;
    age: string;
    gender: string;
    email: string;
    password: string;
    confirmPassword: string;
    isAgreeTerms: boolean;
    isDataLoaded: boolean;
    picture: string;
}

export interface FirstFormState {
    firstForm: FirstForm;
    history: Array<FirstForm>;
}
