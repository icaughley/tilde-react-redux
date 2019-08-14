import {observable} from "mobx";

class ProjectStore {

    @observable selectedProjectId;
    @observable projects = new Map();
    @observable billableProjects = new Map();

    constructor() {
        this.selectedProjectId = -1;
    }
}

export default new ProjectStore();
