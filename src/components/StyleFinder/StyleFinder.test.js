import React from 'react';
import StyleFinder from './StyleFinder';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Container from '@material-ui/core/Container';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

configure ({adapter: new Adapter()})

describe('<StyleFinder/>', () => {
    it('should render Container component', () => {
        const wrapper = shallow(<StyleFinder/>);
        expect(wrapper.find(Container)).toHaveLength(1);
    })

    it('should check if alphabets are rendered', () => {
        const wrapper = mount(<StyleFinder/>);
       expect(wrapper.find('button')).toHaveLength(27);
    })

    it('should hide <ArrowUpwardIcon/> component', () => {
        const wrapper = shallow(<StyleFinder/>);
       expect(wrapper.find(<ArrowUpwardIcon/>)).toHaveLength(0)
    })
});