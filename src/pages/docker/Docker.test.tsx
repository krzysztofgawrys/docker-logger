import React from 'react';
import renderer from 'react-test-renderer';
import Docker from './Docker';
import metricInitial from '../../consts/metricInitial';

const mockGetStatsForDocker = jest.fn();
const mockClearMetric = jest.fn();
const mockDocker = {};
const mockMetric = metricInitial;

it('renders without crashing', () => {
    const component = renderer.create(
        <Docker docker={mockDocker} getStatsForDocker={mockGetStatsForDocker} clearMetric={mockClearMetric} metric={mockMetric} />,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
