import NavBar from "../components/Navbar";
import GroupGrid from "./components/GroupGrid";
import { aggregationState, countries } from "./groupdata";
import Footer from "../components/Footer";

import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { useState } from "react";

import GroupChart from "./components/GroupChart";


type tSelect = "Страна" | "Аггрегатное состояние";

const Chart = () => {
  const [group, setGroup] = useState<tSelect>("Страна");

  const [groupData, setGroupData] = useState(countries);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;
    setGroup(value);

    switch (value) {
      case "Страна":
        setGroupData(countries);
        break;
      case "Аггрегатное состояние":
        setGroupData(aggregationState);
        break;
      default:
        setGroupData(countries);
    }
  };

  
  return (
    <div>
      <NavBar active="3" />
      
      <Box sx={{ width:"200px", mx:"auto", mt: 2 }}>
        <FormControl fullWidth>
            <InputLabel> Группировать по </InputLabel>
            <Select
                id="select-group"
                value={ group }
                label="Группировать по"
                onChange={ handleChange }
            >
                <MenuItem value="Страна"> Стране </MenuItem>
                <MenuItem value="Аггрегатное состояние"> Аггрегатному состоянию </MenuItem>
            </Select>
        </FormControl>
      </Box>
      
      <GroupChart data={groupData} />
      <GroupGrid data={groupData} />

      <Footer />
    </div>
  );
};

export default Chart;
