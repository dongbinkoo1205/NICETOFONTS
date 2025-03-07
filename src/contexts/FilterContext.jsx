import React, { createContext, useContext, useState } from 'react';

// FilterContext 생성
const FilterContext = createContext();

export const useFilterContext = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
    const [userInput, setUserInput] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [NumVariantsFilter, setNumVariantsFilter] = useState(['']);
    const [TextVariantsFilter, setTextVariantsFilter] = useState(['regular']);
    const [subsetsFilter, setSubsetsFilter] = useState(['']);
    const [kindFilter, setKindFilter] = useState('');
    const [filterByLanguage, setFilterByLanguage] = useState('');
    const [sortFilter, setSortFilter] = useState({ selected: 'down' });

    const [typing, setTyping] = useState('');

    const value = {
        userInput,
        categoryFilter,
        NumVariantsFilter,
        TextVariantsFilter,
        subsetsFilter,
        kindFilter,
        filterByLanguage,
        typing,
        sortFilter,
        setUserInput,
        setCategoryFilter,
        setNumVariantsFilter,
        setTextVariantsFilter,
        setSubsetsFilter,
        setKindFilter,
        setFilterByLanguage,
        setTyping,
        setSortFilter,
    };

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
