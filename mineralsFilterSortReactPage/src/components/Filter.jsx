const Filter = ({ filtering, fullData }) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const filterField = {
            "Название": event.target["name"].value.toLowerCase(),
            "Агрегатное состояние": event.target["state"].value.toLowerCase(),
            "Горючесть": event.target["flammability"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Плотность": [event.target["densityMin"].value, event.target["densityMax"].value],
            "Теплопроводность": [event.target["thermalConductivityMin"].value, event.target["thermalConductivityMax"].value],
            "Электропроводность": [event.target["electricalConductivityMin"].value, event.target["electricalConductivityMax"].value]
        };

        let arr = fullData;
        for (const key in filterField) {
            if (Array.isArray(filterField[key])) {
                let [min, max] = filterField[key];
                min = min === "" ? -Infinity : parseFloat(min);
                max = max === "" ? Infinity : parseFloat(max);
                arr = arr.filter(item => 
                    parseFloat(item[key]) >= min && parseFloat(item[key]) <= max
                );
            } else {
                arr = arr.filter(item =>
                    item[key].toLowerCase().includes(filterField[key])
                );
            }
        }

        filtering(arr);
    };

    const handleReset = () => {
        filtering(fullData);
    };

    return (
        <div className="filter">
            <h2>Фильтр</h2>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <p>
                    <label>Название:</label>
                    <input name="name" type="text" />
                </p>
                <p>
                    <label>Агрегатное состояние:</label>
                    <input name="state" type="text" />
                </p>
                <p>
                    <label>Горючесть:</label>
                    <input name="flammability" type="text" />
                </p>
                <p>
                    <label>Страна:</label>
                    <input name="country" type="text" />
                </p>
                <p>
                    <label>Плотность от:</label>
                    <input name="densityMin" type="number" />
                </p>
                <p>
                    <label>Плотность до:</label>
                    <input name="densityMax" type="number" />
                </p>
                <p>
                    <label>Теплопроводность от:</label>
                    <input name="thermalConductivityMin" type="number" />
                </p>
                <p>
                    <label>Теплопроводность до:</label>
                    <input name="thermalConductivityMax" type="number" />
                </p>
                <p>
                    <label>Электропроводность от:</label>
                    <input name="electricalConductivityMin" type="number" />
                </p>
                <p>
                    <label>Электропроводность до:</label>
                    <input name="electricalConductivityMax" type="number" />
                </p>
                <p>
                    <button type="submit">Фильтровать</button>
                    <button type="reset">Очистить фильтр</button>
                </p>
            </form>
        </div>
    );
};

export default Filter;