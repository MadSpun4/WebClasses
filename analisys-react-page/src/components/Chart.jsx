import { useState, useEffect } from 'react';
import * as d3 from "d3";
import ChartDraw from './ChartDraw';

const Chart = ({ data }) => {
  const [ox, setOx] = useState("Страна");
  const [oy, setOy] = useState([true, false]);
  const [graphType, setGraphType] = useState("dotted");
  const [error, setError] = useState(false);
  const [tempOy, setTempOy] = useState([true, false]);

  const createArrGraph =(data, key)=>{   
    const groupObj = d3.group(data, d => d[key]);
    let arrGraph =[];

    for(let entry of groupObj) {
      let minMax = d3.extent(entry[1].map(d => d['Высота']));
      arrGraph.push({labelX: entry[0], values: minMax});
    }

    if (key === "Год") {
      arrGraph.sort((a, b) => a.labelX - b.labelX);
    }

    return arrGraph;
}

  const handleSubmit = (event) => {        
    event.preventDefault();
  
    if (!tempOy[0] && !tempOy[1]) {
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
    if (tempOy[0] || tempOy[1]) {
      setError(false);
    }
  }, [tempOy]);

  return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={ handleSubmit }>
        <p> Значение по оси OX: </p>
        <div>
          <input type="radio" name="ox" value="Страна" defaultChecked={ ox === "Страна" }/>
          Страна
          <br/>		
          <input type="radio" name="ox" value="Год" />
          Год
        </div>

        <p> Значение по оси OY: </p>
        <div className={error ? "error" : ""}>
          <input 
            type="checkbox"
            name="oy"
            id="showMax"
            onChange={(e) => setTempOy([e.target.checked, tempOy[1]])}
            defaultChecked={ oy[0] === true }
          />
          Максимальная высота <br/>
          <input
            type="checkbox"
            id="showMin"
            name="oy"
            onChange={(e) => setTempOy([tempOy[0], e.target.checked])}
          />
          Минимальная высота
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

      <ChartDraw data={ createArrGraph(data, ox) } oy={oy} graphType={graphType} />
    </>
  )
}

export default Chart;