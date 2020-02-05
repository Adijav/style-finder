import React, {useState, useRef} from 'react';
import Container from '@material-ui/core/Container';
import {alphabets} from '../../constants';
import {styleNames} from '../../constants';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import useStyles from './styleFinder.css';

const StyleFinder = () => {
    const classes = useStyles();
    const scrollContainer = useRef(null);
    const styleAlphabetRef = useRef(Array.from({length: 27}, () => React.createRef()));
    const [showBackToTopIcon, setBackToTopIcon] = useState(false);
    
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

    const renderAlphabets = alphabets.map((alphabet,i) => (
        <Button id={`alpha-${i}`} onClick={handleAlphabetClick} key={i} className={classes.alphabet} >{alphabet}</Button>
    ));

    const renderStyles = styleNames.map((style,i) => (
        <React.Fragment key={i}>
        <div ref={styleAlphabetRef.current[i]} id={`alphabet-${i}`}>{style.alphabet}</div>
        <Divider/>
        {style.styles.map((name,index) => (
            <div key={index}>{name}</div>
        ))}
        </React.Fragment>
    ));
    return (
        <Container className={classes.container} maxWidth="sm">
            <div className="alphabets">
                {renderAlphabets}
            </div>
            <div id="test" ref={scrollContainer} className={classes.styleNames} onScroll={handleScroll}>
                {renderStyles}
            </div>
            {showBackToTopIcon && <Button onClick={handleBackToTop} className={classes.arrowButton}>
                <ArrowUpwardIcon className={classes.arrowUpIcon}/>
            </Button>}
        </Container>
    )
}

export default StyleFinder;