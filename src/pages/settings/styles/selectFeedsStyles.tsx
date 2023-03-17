const styles = {
    container: {
        marginInline: 'auto',
        marginTop: '2rem',
        paddingBottom: '4rem',
        alignItems: 'center'
    },
    topButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginBottom: '2rem'
    },
    inputSave: {
        display: 'flex',
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row'
        },
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 5,
        gap: {
            xs: 5,
            lg: 0
        }
    },
    title: {
        width: {
            xs: '100%',
            lg: '30%'
        }
    },
    saveBtn: {
        border: '1px solid black',
        width: {
            xs: '100%',
            sm: '100%',
            md: '50%',
            lg: 300
        },
        color: '#000',
        textTransform: 'uppercase',
        backgroundColor: '#FFF',
        '&:hover': {
            backgroundColor: '#7B0BB0',
            color: '#FFF'
        }
    },
    steps: {
        display: 'flex',
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row'
        },
        justifyContent: 'space-between',
        gap: {
            xs: 3,
            lg: '2.5rem'
        },
        marginBottom: '0rem'
    },
    stepsBtn: {
        border: '1px solid black',
        width: {
            xs: '100%',
            lg: 150
        },
        textTransform: 'uppercase',
        fontSize: 10,
        '&:hover': {
            backgroundColor: '#7B0BB0',
            color: '#FFF'
        },
    },
    search: {
        '& input': {
            padding: '.5em 1em',
        },
        '& fieldset': {
            borderRadius: '0 !important',
            padding: '.5em 1em',
        }
    },
    content: {
        borderRadius: '5px',
        maxWidth: '100%'
    }
}

export default styles