import _ from "lodash";

export function billableProjectsSelector(billableProjects) {
    return _.values(billableProjects).map(project => {
        return {
            value: project.id,
            text: project.name
        };
    })
}
