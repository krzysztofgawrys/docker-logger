import React from 'react';
import App from '../../src/sites/App/app';

describe('app site', () => {
    let wrapper;

    it('should be rendered', () => {
        wrapper = global.shallow(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});
