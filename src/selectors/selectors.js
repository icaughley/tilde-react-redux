export function billableProjectsSelector(billableProjects) {
    return billableProjects.values().map(project => {
        return {
            value: project.id,
            text: project.name
        };
    })
}
