import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import Footer from "./Footer";

describe('Footer component', () => {
    it('has not changed', () => {
        expect(renderer.create(<Footer />)).toMatchSnapshot();
    });

    it('has the correct class', () => {
        const component = shallow(<Footer />);
        expect(component.hasClass('page-footer')).toEqual(true);
    });
});
