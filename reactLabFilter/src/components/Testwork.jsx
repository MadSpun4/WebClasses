import React from "react";
import { useState } from "react";

const Testwork = ({ list }) => {
    const [possibleVal, setPossibleVal] = useState(() => {
        const sortedList = [...list].sort();

        return sortedList.filter((val, index) =>
            index === 0 || val.toLowerCase() !== sortedList[index - 1].toLowerCase());
    });
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        const curValue = event.target.value;
        const isBackspaceOrDelete = event.nativeEvent.inputType === 'deleteContentBackward' ||
            event.nativeEvent.inputType === 'deleteContentForward';

        if (isBackspaceOrDelete) {
            setValue(curValue);
        } else {
            const match = possibleVal.find(posVal => 
                posVal.toLowerCase().startsWith(curValue.toLowerCase())
            );
            setValue(match);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (value === '') return;

        const exists = possibleVal.some(val =>
            val.toLowerCase() === value.toLowerCase());

        if (!exists) {
            const index = possibleVal.findIndex(val =>
                val.toLowerCase() > value.toLowerCase());
            const newList = [...possibleVal];
            if (index === -1) {
                newList.push(value);
            } else {
                newList.splice(index, 0, value);
            }
            setPossibleVal(newList);
        }

        setValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} />
            <button type="submit">Отправить</button>
        </form>
    );
};

export default Testwork;