export const styles = {
    //Grid Content
    gridContentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
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
        height: 400,
        width: 300,
        border: '1px solid #000'
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

    //Main
    ads: {
        textAlign: 'center',
        mb: 8,
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: 25
    },
    gridContainer: {
        display: 'flex',
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row'
        },
        justifyContent: 'center',
        alignItems: 'center'
    }
}