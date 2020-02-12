import React, {useState, useRef, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import useStyles from './CountryFinder.css';
import {connect} from 'react-redux';
import {showBackToTopIcon} from '../../js/actions/index';
import {hideBackToTopIcon} from '../../js/actions/index';
import {selectCountry} from '../../js/actions/index';
import fetchStyleData from '../../js/api/styleMapper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';

const StyleFinder = (props) => {
    const classes = useStyles();
    const scrollContainer = useRef(null);
    const styleAlphabetRef = useRef(Array.from({length: 27}, () => React.createRef()));

    const [styleMapper, setStyleMapper] = useState({});
    const [enableButton, setEnableButton] = useState(false)

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

    const handleChange = event => {
        setEnableButton(true);
        props.selectCountry(event.target.value)
    };
  
    const handleButtonClick = () => {
        props.history.push('/countryDetails')
    }
    return (
        <Container className={classes.container} maxWidth="sm">
            <div className="alphabets">
                {styleMapper && Object.keys(styleMapper).map((alphabet,i) => (
                    <Button id={`alpha-${i}`} onClick={handleAlphabetClick} key={i} className={classes.alphabet} >{alphabet}</Button>
                ))}
            </div>
            <div ref={scrollContainer} className={classes.styleNames} onScroll={handleScroll}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup onChange={handleChange}>
                        {styleMapper && Object.keys(styleMapper).map((style,i) => (
                            <React.Fragment key={i}>
                                <div ref={styleAlphabetRef.current[i]} id={`alphabet-${i}`}>{style}</div>
                                <Divider/>
                                {styleMapper[style].map((name,index) => (
                                    <FormControlLabel value={name} key={index} control={<Radio />} label={name} />
                                ))}
                            </React.Fragment>
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>
            {props.showIcon && <Button onClick={handleBackToTop} className={classes.arrowButton}>
                <ArrowUpwardIcon className={classes.arrowUpIcon}/>
            </Button>}
            <Button disabled={!enableButton} variant="contained" onClick={handleButtonClick} color="primary">Next</Button>
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
        hideArrowIcon: () => dispatch(hideBackToTopIcon()),
        selectCountry: (payload) => dispatch(selectCountry(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleFinder);