import React from 'react';
import Home from '../../src/sites/Home/home';

describe('home site', () => {
    let wrapper;

    it('should be rendered', () => {
        wrapper = global.shallow(<Home />);
        expect(wrapper).toMatchSnapshot();
    });
});
