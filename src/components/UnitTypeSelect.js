import React from 'react'
import Container from '@material-ui/core/Container';
import { FormControl, makeStyles, InputLabel, Select } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

function UnitTypeSelect(props) {

    const classes = useStyles();
    

    const units = props.unitTypes
    const handleChange = props.onChangeInUnit
    const unitValue = props.unitValue

    
    const unit = units.map((unit, index) =>  <option key={index} value={unit}>{unit}</option>)

    return (
            <FormControl variant="outlined" className={classes.formControl} style={{marginTop: "3%"}}>
                <InputLabel htmlFor="outlined-age-native-simple">{props.name}</InputLabel>
                <Select style={{width: props.width}}
                    native
                    value={unitValue}
                    onChange={event  => handleChange(event.target.value)}
                    label="Main Unit"
                    inputProps={{
                        name: 'mainUnit',
                        id: 'outlined-age-native-simple',
                    }}
                >
                <option aria-label="None" value="" />
                {unit}
                </Select>
          </FormControl>
    )
}

export default UnitTypeSelect
