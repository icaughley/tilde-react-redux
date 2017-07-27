import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import Header from "./Header";

test('Header has has not changed', () => {
    expect(renderer.create(<Header />)).toMatchSnapshot();
});

test('Header has correct class', () => {
    const component = shallow(<Header />);
    expect(component.hasClass('page-header')).toEqual(true);
});
