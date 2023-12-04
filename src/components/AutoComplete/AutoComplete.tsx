import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './AutoComplete.css';
import { FirstFormState } from '../../store/types';
import { forwardRef } from 'react';

interface AutoCompleteProps {
    errorMessage: string;
}

export const AutoComplete = forwardRef((props: AutoCompleteProps, ref) => {
    // console.log(props.errorMessage);
    const countryNamesArray = useSelector((state: FirstFormState) => state.firstForm.countryNames);
    const contryRef = ref;
    const autocompleteRef = useRef<HTMLDivElement | null>(null);

    const [value, setValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestions = countryNamesArray.filter((option) => option.toLowerCase().includes(value.toLowerCase()));

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);

        event.currentTarget.value ? setShowSuggestions(true) : setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggetion: string) => {
        setValue(suggetion);
        setShowSuggestions(false);
        // handleCountryValue(suggetion);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const checkError = (value: string) => {
        if (props.errorMessage.includes(value)) {
            return props.errorMessage;
        }
    };

    return (
        <div className="container" ref={autocompleteRef}>
            <label className="label">Country</label>
            <input className="input" value={value} onChange={handleChange} ref={contryRef} />
            <span className="error-message">{checkError('country')}</span>

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
});
