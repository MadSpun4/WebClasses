    import { useState } from "react";
    import { ChangeEvent } from "react";
    import { FormEvent } from "react";

    interface TestworkProps {
        list: string[];
    }

    const Testwork = ( { list } : TestworkProps ) => {
        const [possibleVal, setPossibleVal] = useState<string[]>(() => {
            const sortedList = [...list].sort();

            return sortedList.filter((val, index) =>
                index === 0 || val.toLowerCase() !== sortedList[index - 1].toLowerCase());
        });
        const [value, setValue] = useState<string>('');

        const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
            const curValue = event.target.value;
            const inputType = (event.nativeEvent as InputEvent).inputType;
            const isBackspaceOrDelete = inputType === "deleteContentBackward" || inputType === "deleteContentForward";

            if (isBackspaceOrDelete) {
                setValue(curValue);
            } else {
                const match = possibleVal.find((posVal) =>
                    posVal.toLowerCase().startsWith(curValue.toLowerCase())
                );

                if (match !== undefined && match !== null) {
                    setValue(match);
                } else {
                    setValue(curValue);
                }
            }
        };

        const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
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