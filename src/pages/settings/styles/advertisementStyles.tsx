export const styles = {
    //Grid Content
    gridContentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
    },
    titleWrapper: {
        border: '1px solid #000',
        width: 300,
        p: 1
    },
    title: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 17
    },
    imgWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        border: '1px solid #000',
        cursor:"pointer",
        ":hover": {
            backgroundColor: (theme: any) => theme.palette.primary.main,
            opacity: 0.5,
            scale: 0.5,
            border: '1px solid',
            borderColor: (theme: any) => theme.palette.primary.main,
        }
    },
    uploadBtn: {
        backgroundColor: '#9747FF',
        width: 150,
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 12,
        '&:hover': {
            backgroundColor: '#7B0BB0'
        }
    },
}