import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

type tSeries= {
    'Максимальная плотность': boolean,
    'Средняя плотность': boolean,
    'Минимальная плотность': boolean,
}

type CheckboxProps = {
    series: tSeries;
    setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
    isBar: boolean;
    setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingChart({ series, setSeries, isBar, setIsBar }: CheckboxProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeries({
            ...series,
            [event.target.name]: event.target.checked,
        });
    };

    const handleChartType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsBar(event.target.value === 'bar');
    };


    return (
        <Stack
            direction="row"
            justifyContent="center"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            sx={{ m: "20px 0" }}
        >
            <FormControl>
                <FormLabel id="label-radio-group">
                    Тип диаграммы:
                </FormLabel>
                <RadioGroup
                    name="group-radio"
                    value={(isBar) ? "bar": "dot"}
                    onChange={handleChartType}
                >
                    <FormControlLabel value="bar"
                        control={
                            <Radio checked={isBar} />
                        }
                        label="Гистограмма"
                    />
                    <FormControlLabel value="dot"
                        control={
                            <Radio checked={!isBar}/>
                        }
                        label="Линейная" 
                    />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel id="label-checkbox-group">
                    На диаграмме показать:
                </FormLabel>
                <FormControlLabel
                    control={
                        <Checkbox checked={series["Максимальная плотность"]}
                            onChange={handleChange} name="Максимальная плотность"
                        />
                    }
                    label="максимальную плотность" 
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={series["Средняя плотность"]}
                            onChange={handleChange} name="Средняя плотность"
                        />
                    }
                    label="среднюю плотность"
                />
                <FormControlLabel 
                    control={
                        <Checkbox checked={series["Минимальная плотность"]}
                            onChange={handleChange} name="Минимальная плотность"
                        />
                    }
                    label="минимальную плотность"
                />
            </FormControl>
        </Stack>
    )
}
export default SettingChart;