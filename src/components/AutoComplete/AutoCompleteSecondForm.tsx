import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './AutoComplete.css';
import { FirstFormState } from '../../store/types';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { ValidData } from '../../pages/SecondForm/types';

interface AutoCompleteProps {
    setValue?: UseFormSetValue<ValidData>;
    register?: UseFormRegisterReturn<'country'>;
    errorMessage: string | undefined;
}

export const AutoComplete = (props: AutoCompleteProps) => {
    const countryNamesArray = useSelector((state: FirstFormState) => state.firstForm.countryNames);

    const [value, setValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestions = countryNamesArray.filter((option) => option.toLowerCase().includes(value.toLowerCase()));

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
        props.setValue?.('country', event.currentTarget.value, { shouldValidate: true });

        event.currentTarget.value ? setShowSuggestions(true) : setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggetion: string) => {
        setValue(suggetion);
        props.setValue?.('country', suggetion, { shouldValidate: true });
        setShowSuggestions(false);
    };

    // useEffect(() => {
    //     const handleOutsideClick = (event: MouseEvent) => {
    //         if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
    //             setShowSuggestions(false);
    //         }
    //     };

    //     document.addEventListener('click', handleOutsideClick);

    //     return () => {
    //         document.removeEventListener('click', handleOutsideClick);
    //     };
    // }, []);

    return (
        <div className="container">
            <label className="label">Country</label>
            <input {...props.register} className="input" value={value} onChange={handleChange} />
            <span className="error-message">{props.errorMessage}</span>

            {showSuggestions && (
                <ul className="suggestions">
                    {suggestions.map((el) => (
                        <li key={el} onClick={() => handleSuggestionClick(el)}>
                            {el}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
