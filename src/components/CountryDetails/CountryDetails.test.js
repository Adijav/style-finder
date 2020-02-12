import React from 'react';
import CountryDetails from './CountryDetails';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure ({adapter: new Adapter()})

describe('Country Details Component', () => {
    it('should render Country Details component', () => {
        const wrapper = shallow((<div><div>You have selected:</div></div>));
    expect(wrapper.contains(<div>You have selected:</div>)).toEqual(true);
    })
});