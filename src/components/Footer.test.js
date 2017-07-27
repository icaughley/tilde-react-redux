import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import Footer from "./Footer";

test('Footer has has not changed', () => {
    expect(renderer.create(<Footer />)).toMatchSnapshot();
});

test('Footer has correct class', () => {
    const component = shallow(<Footer />);
    expect(component.hasClass('page-footer')).toEqual(true);
});
