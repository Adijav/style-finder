import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
    container: {
        background: '#f6f8fa'
    },
    styleNames: {
        height: '30em',
        position: 'relative',
        overflow: 'auto',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '1em',
        '& div' : {
            margin: {
                top: '1em'
            }
        }
    },
    arrowButton :{
        float: 'right',
        top: '-4em',
        borderRadius: '50%'
    },
    alphabets : {
        '& button': {
            margin: '1em'
        }
    }
});

export default useStyles;