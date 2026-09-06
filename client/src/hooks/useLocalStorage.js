import { useState } from "react";

export default function useLocalStorage(key, initialValue) {

    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    const setPersistedState = (value) => {
        if(typeof value === 'function') {
            value = value(state);
        }
        
        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    }
    
    return [state, setPersistedState]

}