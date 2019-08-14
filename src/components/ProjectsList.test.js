import React from "react";
import {shallow} from "enzyme";
import ProjectsList from "./ProjectsList";

describe('ProjectList', () => {
    // Define the props
    const props = {
        projects: {
            1: {id: 1, name: "project1"},
            2: {id: 2, name: "project2"}
        },
        onCloakedChange: jest.fn(),
        onDelete: jest.fn(),
        toProject: jest.fn()
    };

    // Render the component for each test
    let component;
    beforeEach(() => {
        component = shallow(<ProjectsList {...props}/>);
    });

    it('has a table with a row for each project', () => {
        const {projects} = props;
        expect(component.find('table tbody tr').length).toBe(projects.size);
        expect(component.find('table tbody tr td').at(0).text()).toBe("" + projects.get(1).id);
        expect(component.find('table tbody tr td').at(1).text()).toBe(projects.get(1).name);
    });

    it('has a checkbox to toggle the cloaking', () => {
        const {projects, onCloakedChange} = props;
        expect(component.find('input[type="checkbox"]').length).toBe(projects.size);
        component.find('input[type="checkbox"]').first().simulate('change', {target: {checked: true}});
        expect(onCloakedChange.mock.calls.length).toBe(1);
        expect(onCloakedChange.mock.calls[0][0]).toBe(projects.get(1));
        expect(onCloakedChange.mock.calls[0][1]).toBe(true);
    });

    it('has a delete button to delete projects', () => {
        const {projects, onDelete} = props;
        expect(component.find('.trash.icon').length).toBe(projects.size);
        component.find('.trash.icon').first().parent().simulate('click');
        expect(onDelete.mock.calls.length).toBe(1);
        expect(onDelete.mock.calls[0][0]).toBe(projects.get(1));
    });
});
