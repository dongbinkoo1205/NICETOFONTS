import React, { createContext, useState, useContext } from 'react';
// ✅ 올바르게 Context 생성
const InputContext = createContext();

// ✅ Provider 설정
export const InputProvider = ({ children }) => {
    const [inputs, setInputs] = useState({
        userInput: '',
        fontName: '',
        fontSize: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    return <InputContext.Provider value={{ inputs, handleInputChange }}>{children}</InputContext.Provider>;
};

export const useInputContext = () => useContext(InputContext);
