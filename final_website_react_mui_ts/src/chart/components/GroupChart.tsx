import { BarChart } from '@mui/x-charts/BarChart';
import Container from '@mui/material/Container';
import { tGroup } from '../groupdata';
import { useState } from 'react';
import SettingChart from './SettingChart';
import { LineChart } from '@mui/x-charts/LineChart';

type GroupChartProps = {
  data: tGroup;
};

function GroupChart({ data } : GroupChartProps) {
    const [isBar, setIsBar] = useState(true);

    const [series, setSeries] = useState({
        'Максимальная плотность': true,
        'Средняя плотность': false,
        'Минимальная плотность': false,
    });

    let seriesY = Object.entries(series)
        .filter(item => item[1] === true)
        .map(item => {
        return {"dataKey": item[0], "label": item[0]}
    });

    const chartSetting = {
        yAxis: [{ label: 'Плотность (г/см³)', offset: 10 }],
        height: 400,
    };

    return(
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {isBar ?
                (
                    <BarChart
                        dataset={ data }
                        xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                        series={ seriesY }
                        slotProps={{
                            legend: {
                                position: { vertical: 'bottom', horizontal: 'center' },
                            },
                        }}
                        barLabel={seriesY.length === 1 ? 'value' : undefined}

                        {...chartSetting}
                    />
                ) :
                (
                    <LineChart
                        dataset={ data }
                        xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                            series={ seriesY}
                            slotProps={{
                            legend: {
                                position: { vertical: 'bottom', horizontal: 'center' },
                            },
                        }}
                        {...chartSetting}
                    />
                )}

            <SettingChart series={ series } setSeries={ setSeries } isBar = { isBar } setIsBar={ setIsBar } />
        </Container>
    )
}
export default GroupChart;