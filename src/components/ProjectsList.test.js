import React from "react";
import _ from "lodash";
import {shallow} from "enzyme";
import ProjectsList from "./ProjectsList";

describe('ProjectList', () => {
    // Value props
    const projects = {
        1: {id: 1, name: "project1"},
        2: {id: 2, name: "project2"}
    };

    // Mock function props
    const onCloakedChange = jest.fn();
    const onDelete = jest.fn();

    // Render the component for each test
    let component;
    beforeEach(() => {
        component = shallow(<ProjectsList projects={projects}
                                          onCloakedChange={onCloakedChange}
                                          onDelete={onDelete}/>);
    });

    it('has a table with a row for each project', () => {
        expect(component.find('table tbody tr').length).toBe(_.values(projects).length);
        expect(component.find('table tbody tr td').at(0).text()).toBe("" + projects[1].id);
        expect(component.find('table tbody tr td').at(1).text()).toBe(projects[1].name);
    });

    it('has a checkbox to toggle the cloaking', () => {
        expect(component.find('input[type="checkbox"]').length).toBe(_.values(projects).length);
        component.find('input[type="checkbox"]').first().simulate('change', {target: {checked: true}});
        expect(onCloakedChange.mock.calls.length).toBe(1);
        expect(onCloakedChange.mock.calls[0][0]).toBe(projects[1]);
        expect(onCloakedChange.mock.calls[0][1]).toBe(true);
    });

    it('has a delete button to delete projects', () => {
        expect(component.find('.trash.icon').length).toBe(_.values(projects).length);
        component.find('.trash.icon').first().parent().simulate('click');
        expect(onDelete.mock.calls.length).toBe(1);
        expect(onDelete.mock.calls[0][0]).toBe(projects[1]);
    });
});
