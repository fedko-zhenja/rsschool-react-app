import React, { useState, useEffect, useRef } from 'react';
import { AutoCompleteProps } from './types';
import './AutoComplete.css';

export function AutoComplete({ options }: AutoCompleteProps) {
    const [value, setValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestions = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
    const autocompleteRef = useRef<HTMLDivElement | null>(null);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    const handleSuggestionClick = (suggetion: string) => {
        setValue(suggetion);
        setShowSuggestions(false);
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

    return (
        <div className="container" ref={autocompleteRef}>
            <label className="label">Country</label>
            <input className="input" value={value} onChange={handleChange} onFocus={() => setShowSuggestions(true)} />

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
}
