import { useState, useEffect } from 'react';
import * as d3 from "d3";
import ChartDraw from './ChartDraw';

const Chart = ({ data }) => {
    const [ox, setOx] = useState("Страна");
    const [oy, setOy] = useState([true, false, false]);
    const [graphType, setGraphType] = useState("dotted");
    const [error, setError] = useState(false);
    const [tempOy, setTempOy] = useState([true, false, false]);

    const createArrGraph = (data, key) => {   
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph = [];

        for (let entry of groupObj) {
            const densities = entry[1].map(d => parseFloat(d['Плотность']));
            const min = d3.min(densities);
            const avg = d3.mean(densities);
            const max = d3.max(densities);
            arrGraph.push({ labelX: entry[0], values: [min, avg, max] });
        }

        return arrGraph;
    }

    const handleSubmit = (event) => {        
        event.preventDefault();
    
        if (!tempOy[0] && !tempOy[1] && !tempOy[2]) {
            setError(true);
            return;
        } else {
            setError(false);
        }

        setOx(event.target["ox"].value); 
        setOy(tempOy);
        setGraphType(event.target["graphType"].value);
    }

    useEffect(() => {
        if (tempOy[0] || tempOy[1] || tempOy[2]) {
            setError(false);
        }
    }, [tempOy]);

  return (
    <div className='wrapper'>
        <div className='chart'>
            <h2>Визуализация</h2>
            <form onSubmit={handleSubmit}>
                <p> Значение по оси OX: </p>
                <div>
                    <input type="radio" name="ox" value="Страна" defaultChecked={ox === "Страна"} />
                    Страна
                    <br/>		
                    <input type="radio" name="ox" value="Агрегатное состояние" />
                    Агрегатное состояние
                </div>

                <p> Значение по оси OY: </p>
                <div className={error ? "error" : ""}>
                    <input 
                        type="checkbox"
                        name="oy"
                        id="showMin"
                        onChange={(e) => setTempOy([e.target.checked, tempOy[1], tempOy[2]])}
                        defaultChecked={oy[0] === true}
                    />
                    Минимальная плотность <br/>
                    <input 
                        type="checkbox"
                        name="oy"
                        id="showAvg"
                        onChange={(e) => setTempOy([tempOy[0], e.target.checked, tempOy[2]])}
                        defaultChecked={oy[1] === true}
                    />
                    Средняя плотность <br/>
                    <input
                        type="checkbox"
                        id="showMax"
                        name="oy"
                        onChange={(e) => setTempOy([tempOy[0], tempOy[1], e.target.checked])}
                        defaultChecked={oy[2] === true}
                    />
                    Максимальная плотность
                </div>

                <p>Тип диаграммы:</p>
                    <select name="graphType" defaultValue={graphType}>
                    <option value="dotted">Точечная диаграмма</option>
                    <option value="histogram">Гистограмма</option>
                </select>

                <p>  
                    <button type="submit">Построить</button>
                </p>
            </form>
        </div>

        <ChartDraw data={createArrGraph(data, ox)} oy={oy} graphType={graphType} />
    </div>
  )
}

export default Chart;