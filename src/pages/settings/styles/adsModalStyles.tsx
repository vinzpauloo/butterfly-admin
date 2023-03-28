export const styles = {
    dialogContent: {
        padding: 10,
    },
    title: {
        padding: 0,
        margin: 0,
        textAlign: 'center',
        textTransform: 'uppercase',
        mb: 5
    },
    container: {
        display: 'flex',
        gap: 10,
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row'
        },
    },
    left: {
        display: 'flex',
        flexDirection: ' column',
        width: { xs: '100%', lg: '50%' },
        gap: 3
    },
    adsTitle: {
        border: '1px solid #000',
        borderRadius: '5px',
        width: {
            xs: '100%',
            sm: '100%',
            md: 180,
            lg: 180
        },
        height: '3dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    adsText: {
        fontSize: 11,
        textTransform: 'uppercase',
        p: 1
    },
    imgWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    uploadBtn: {
        backgroundColor: '#9747FF',
        width: 150,
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 12,
        '&:hover': {
            backgroundColor: '#7B0BB0'
        },
        position: 'absolute',
        bottom: 12
    },
    right: {
        width: {
            xs: '100%',
            sm: '100%',
            md: '50%',
            lg: '50%'
        },
        display: 'flex',
        flexDirection: 'column',
        mt: {
            xs: 0,
            lg: 10
        },
        gap: 4
    },
    fullWidth: {
        width: '100%'
    },
    bottomBtnWrapper: {
        display: 'flex',
        justifyContent: 'center',
        mt: 5,
        gap: 4
    },
    bottomBtns: {
        backgroundColor: '#FFF',
        border: '1px solid black',
        textTransform: 'uppercase',
        color: '#000',
        width: 120,
        '&:hover': {
            backgroundColor: '#9747FF',
            color: '#FFF'
        }
    },
    loaderStyle:
    {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        zIndex: 1
    }
}
