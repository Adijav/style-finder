import React, {useState, useRef, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import useStyles from './styleFinder.css';
import axios from '../../axiosStyles';

const StyleFinder = () => {
    const classes = useStyles();
    const scrollContainer = useRef(null);
    const styleAlphabetRef = useRef(Array.from({length: 27}, () => React.createRef()));
    
    const [showBackToTopIcon, setBackToTopIcon] = useState(false);

    const [styleMapper, setStyleMapper] = useState({});

    useEffect(()=> {
        const tempObj = {};
        axios.get('/styles.json')
        .then(response => {
            response.data.forEach((style)=>{
                tempObj[style.charAt(0).toUpperCase()] ? tempObj[style.charAt(0).toUpperCase()].push(style) : tempObj[style.charAt(0).toUpperCase()] = [style];
            });
            setStyleMapper(tempObj);
        })
    },[]);
    const handleScroll = () => {
        scrollContainer.current.scrollTop ? setBackToTopIcon(true) : setBackToTopIcon(false);
    }

    const handleBackToTop = () => {
        scrollContainer.current.scrollTop = 0;
    }
    
    const handleAlphabetClick = (event) => {
        const targetId = event.currentTarget.id;
        const targetIndex = targetId.split('-');
        scrollContainer.current.scrollTop = styleAlphabetRef.current[targetIndex[1]].current.offsetTop;
    }
  
    return (
        <Container className={classes.container} maxWidth="sm">
            <div className="alphabets">
                {styleMapper && Object.keys(styleMapper).map((alphabet,i) => (
                    <Button id={`alpha-${i}`} onClick={handleAlphabetClick} key={i} className={classes.alphabet} >{alphabet}</Button>
                ))}
            </div>
            <div ref={scrollContainer} className={classes.styleNames} onScroll={handleScroll}>
                {styleMapper && Object.keys(styleMapper).map((style,i) => (
                    <React.Fragment key={i}>
                    <div ref={styleAlphabetRef.current[i]} id={`alphabet-${i}`}>{style}</div>
                    <Divider/>
                    {styleMapper[style].map((name,index) => (
                        <div key={index}>{name}</div>
                    ))}
                    </React.Fragment>
                ))}
            </div>
            {showBackToTopIcon && <Button onClick={handleBackToTop} className={classes.arrowButton}>
                <ArrowUpwardIcon className={classes.arrowUpIcon}/>
            </Button>}
        </Container>
    )
}

export default StyleFinder;