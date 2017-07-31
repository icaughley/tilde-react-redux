import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import Header from "./Header";

describe('Header component', () => {
    it('has not changed', () => {
        expect(renderer.create(<Header />)).toMatchSnapshot();
    });

    it('has the correct class', () => {
        const component = shallow(<Header />);
        expect(component.hasClass('page-header')).toEqual(true);
    });
});
