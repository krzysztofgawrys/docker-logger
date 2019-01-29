import React from 'react';
import Home from '../../src/sites/Home/home';

describe('home site', () => {
    it('should be rendered', () => {
        const wrapper = global.shallow(<Home />);
        expect(wrapper).toMatchSnapshot();
    });
});
