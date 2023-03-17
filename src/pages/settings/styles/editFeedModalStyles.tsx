export const styles = {
    dialogContent: {
        padding: {
            xs: 5,
            lg: 10
        }
    },
    container: {
        margin: {
            xs: '0 0px 0 0px',
            lg: '0 50px 0 50px'
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    headerFooter: {
        borderRadius: '10px',
        border: '1px solid black',
        width: {
            xs: 200,
            lg: 400
        },
        textAlign: 'center'
    },
    key: {
        fontSize: 12
    },
    value: {
        fontSize: 18,
        fontWeight: '600'
    },
    taggings: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '.5rem'
    },
    backBtn: {
        border: '1px solid #000',
        width: 100,
        height: 30,
        backgroundColor: '#9747FF',
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 12,
        '&:hover': {
            backgroundColor: '#7B0BB0'
        }
    }
}