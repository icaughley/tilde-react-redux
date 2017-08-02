import React from "react";
import {mount} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import ProjectsPage from "./ProjectsPage";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import mockAxios from "../test/mockAxios";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {auth: {user: {id: 1}}, projects: {12: {id: 12, name: "a"}}};

describe('ProjectsPage container', () => {
    let component;
    let store;
    beforeEach(() => {
        mockAxios.reset();
        store = mockStore(initialState);
        component = mount(<BrowserRouter><ProjectsPage store={store}/></BrowserRouter>);
    });

    it('should have the correct class', () => {
        expect(component.hasClass('projects-page')).toEqual(true);
    });

    it('should load projects when mounted', () => {
        expect(mockAxios.get.mock.calls.length).toBe(1);
        expect(mockAxios.get.mock.calls[0][0]).toBe("/api/users/1/projects");
    });

    it('should dispatch an action when deleted is clicked', () => {
        mockAxios.reset();
        component.find('.trash.icon').first().parent().simulate('click');
        expect(mockAxios.delete.mock.calls.length).toBe(1);
        expect(mockAxios.delete.mock.calls[0][0]).toBe("/api/projects/12");
    });

    it('should dispatch an action when the cloaked tickbox is clicked', () => {
        mockAxios.reset();
        component.find('input[type="checkbox"]').first().simulate('change', {target: {checked: true}});
        expect(mockAxios.put.mock.calls.length).toBe(1);
        expect(mockAxios.put.mock.calls[0][0]).toBe("/api/users/1/projects/12/cloak");
    });

});
