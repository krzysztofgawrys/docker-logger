import React from 'react';
import App from '../../src/sites/App/app';

describe('app site', () => {
    let wrapper;

    const props = {
        fetchDataFromURL: ()=>{}
    };

    it('should be rendered', () => {
        wrapper = global.shallow(<App {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
