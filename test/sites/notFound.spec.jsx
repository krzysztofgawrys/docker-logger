import React from 'react';
import NoFound from '../../src/sites/notFound';

describe('NoFound render', () => {

    it('should be rendered', () => {
        const wrapper = global.shallow(<NoFound />);
        expect(wrapper).toMatchSnapshot();
    });
});
