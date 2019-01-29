import React from 'react';
import App from '../../src/sites/App/app';

describe('app site', () => {
    // eslint-disable-next-line no-empty-function
    const props = {fetchDataFromURL: () => {}};
    it('should be rendered', () => {
        const wrapper = global.shallow(<App {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
