import React, {useState, useRef, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import useStyles from './styleFinder.css';
import {connect} from 'react-redux';
import {showBackToTopIcon} from '../../js/actions/index';
import {hideBackToTopIcon} from '../../js/actions/index';
import fetchStyleData from '../../js/api/styleMapper';

const StyleFinder = (props) => {
    const classes = useStyles();
    const scrollContainer = useRef(null);
    const styleAlphabetRef = useRef(Array.from({length: 27}, () => React.createRef()));

    const [styleMapper, setStyleMapper] = useState({});

    useEffect(()=> {
        fetchStyleData().then(data => setStyleMapper(data))
    },[]);

    const handleScroll = () => {
        scrollContainer.current.scrollTop ? props.showArrowIcon() : props.hideArrowIcon();
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
            {console.log('showIcon',props.showIcon)}
            {props.showIcon && <Button onClick={handleBackToTop} className={classes.arrowButton}>
                <ArrowUpwardIcon className={classes.arrowUpIcon}/>
            </Button>}
        </Container>
    )
}



const mapStateToProps = (state) => {
    return {
        showIcon: state.showBackToTopIcon
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showArrowIcon: () => dispatch(showBackToTopIcon()),
        hideArrowIcon: () => dispatch(hideBackToTopIcon())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleFinder);