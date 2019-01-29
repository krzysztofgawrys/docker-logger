import React from 'react';
import Layout from '../../src/layout';

describe('layout', () => {

    it('should be rendered', () => {
        const wrapper = global.shallow(<Layout />);
        expect(wrapper).toMatchSnapshot();
    });
});
