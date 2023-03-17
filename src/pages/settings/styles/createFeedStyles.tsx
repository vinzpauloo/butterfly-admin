export const styles = {
    dialogContent: {
        padding: 10
    },
    title: {
        padding: 0,
        margin: 0,
        textTransform: 'uppercase',
        mb: 5,
        textAlign: {
            xs: 'center',
            sm: 'center',
            md: 'left',
            lg: 'left'
        }
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    },
    fullWidth: {
        width: '100%'
    },
    buttonContainer: {
        display: 'flex',
        padding: 5,
        gap: 10,
        justifyContent: {
            xs: 'center',
            sm: 'flex-start',
            md: 'flex-start',
            lg: 'flex-start'
        },
        flexDirection: {
            xs: 'column',
            sm: 'row',
            lg: 'row'
        }
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
    },
    upload: {
        backgroundColor: '#FFF',
        color: '#000',
        textTransform: 'uppercase',
        borderRadius: '20px',
        fontSize: 11,
        width: 145,
        height: 25
    },
    bottomBtnContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: {
            xs: 3,
            md: 4,
            lg: 15
        },
        mt: 10
    },
    bottomBtn: {
        backgroundColor: '#FFF',
        color: '#000',
        textTransform: 'uppercase',
        borderRadius: '20px',
        fontSize: 11,
        width: 125,
        height: 35
    }
}