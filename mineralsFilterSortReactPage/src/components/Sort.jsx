import React from "react";
import { useState } from "react";
import mineralsData from "../data";

const Sort = ({ data, setFilteredData, fullData }) => {
    const [firstField, setFirstField] = useState('0');
    const [firstDesc, setFirstDesc] = useState(false);

    const [secondField, setSecondField] = useState('0');
    const [secondDesc, setSecondDesc] = useState(false);

    const [thirdField, setThirdField] = useState('0');
    const [thirdDesc, setThirdDesc] = useState(false);

    const fields = Object.keys(mineralsData[0]).map((key, index) => ({
        value: (index + 1).toString(),
        label: key
    }));

    const getFreeFields = (deletedValues) => {
        const deleted = deletedValues.filter(value => value !== '0');
        return fields.filter(field => !deleted.includes(field.value));
    };

    const handleFirstChange = (value) => {
        setFirstField(value);
        if (value === '0') {
            setSecondField('0');
            setSecondDesc(false);
            setThirdField('0');
            setThirdDesc(false);
        } else {
            const freeForSecond = getFreeFields([value])
                .map(field => field.value);
                
            if (!freeForSecond.includes(secondField)) {
                setSecondField('0');
                setThirdField('0');
            }
        }
    };

    const handleSecondChange = (value) => {
        setSecondField(value);
        if (value === '0') {
            setThirdField('0');
            setThirdDesc(false);
        } else {
            const freeForThird = getFreeFields([firstField, value])
                .map(field => field.value);

            if (!freeForThird.includes(thirdField)) {
                setThirdField('0');
            }
        }
    };

    const handleSort = () => {
        const sortArr = [];
        if (firstField !== '0') {
            sortArr.push(
                { 
                    column: firstField, 
                    order: (firstDesc ? 'desc' : 'asc')
                }
            );
        }
        if (secondField !== '0') {
            sortArr.push(
                { 
                    column: secondField, 
                    order: (secondDesc ? 'desc' : 'asc') 
                }
            );
        }
        if (thirdField !== '0') {
            sortArr.push(
                { 
                    column: thirdField, 
                    order: (thirdDesc ? 'desc' : 'asc') 
                }
            );
        }

        if (sortArr.length === 0) return;

        const sortedData = [...data].sort((a, b) => {
            for (let sortItem of sortArr) {
                const key = fields.find(field => field.value === sortItem.column).label;
                let valA = a[key];
                let valB = b[key];

                if (['Плотность', 'Теплопроводность', 'Электропроводность'].includes(key)) {
                    valA = Number(valA);
                    valB = Number(valB);
                }

                if (valA < valB) return sortItem.order === 'asc' ? -1 : 1;
                if (valA > valB) return sortItem.order === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setFilteredData(sortedData);
    };

    const handleReset = () => {
        setFirstField('0');
        setSecondField('0');
        setThirdField('0');
        setFirstDesc(false);
        setSecondDesc(false);
        setThirdDesc(false);
        setFilteredData(fullData);
    };
    
    return (
        <div className="sort">
            <h2>Сортировка</h2>
            <select value={firstField} onChange={(event) => 
                handleFirstChange(event.target.value)}>

                <option value="0">Нет</option>
                {fields.map(field => (
                    <option key={field.value} value={field.value}>{field.label}</option>
                ))}
            </select>
            по убыванию? <input type="checkbox" checked={firstDesc} onChange={(event) => 
                setFirstDesc(event.target.checked)} />
            <br />

            <select value={secondField} onChange={(event) =>
                handleSecondChange(event.target.value)} disabled={firstField === '0'}>

                <option value="0">Нет</option>
                {getFreeFields([firstField]).map(field => (
                    <option key={field.value} value={field.value}>{field.label}</option>
                ))}
            </select>
            по убыванию? <input type="checkbox" checked={secondDesc} onChange={(event) => 
                setSecondDesc(event.target.checked)} />
            <br />

            <select value={thirdField} onChange={(event) => 
                setThirdField(event.target.value)} disabled={secondField === '0'}>

                <option value="0">Нет</option>
                {getFreeFields([firstField, secondField]).map(field => (
                    <option key={field.value} value={field.value}>{field.label}</option>
                ))}
            </select>   
            по убыванию? <input type="checkbox" checked={thirdDesc} onChange={(event) => 
                setThirdDesc(event.target.checked)} />
            <br />

            <input type="button" value="Сортировать" onClick={handleSort} />
            <input type="button" value="Сбросить сортировку" onClick={handleReset} />
        </div>
    );
}

export default Sort;