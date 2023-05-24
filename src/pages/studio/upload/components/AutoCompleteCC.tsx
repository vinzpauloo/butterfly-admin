// ** React Imports
import React,{ SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

// ** Props
type AutoCompleteCCProps = {
    value : any
    onChange : (e : any) => void
    onBlur : () => void
    creatorsData : any
    control : any
    name : string
}

interface ICCOptionData {
    id : number
    username : string
}

const AutoCompleteCC = ({name, value, creatorsData, onChange, onBlur, control} : AutoCompleteCCProps) => {
    console.log('CONTROL',control)
    // ** States
    const [ccValue, setCCValue] = React.useState<ICCOptionData | null>(null)
    if ( creatorsData ) {
        return (
            <Box className={``} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Autocomplete
                    value={ccValue}
                    sx={{ width: 250 }}
                    options={creatorsData}
                    onChange={ (e,v) => {
                        onChange({
                            target : {
                                name : v?.username,
                                value : v?.id
                            }
                        })
                        
                    }}
                    id='cc-controlled'
                    getOptionLabel={ option => { 
                        return option.username
                    }}
                    renderInput={params => <TextField {...params} label='Content Creator' />}
                />
            </Box>
        )
    }

    return <p>Cannot Load Content Creators</p>
    
}

export default AutoCompleteCC
