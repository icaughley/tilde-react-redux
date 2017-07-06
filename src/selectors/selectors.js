export function billableProjectsSelector(billableProjects) {
  return billableProjects.map(project => {
    return {
      value: project.id,
      text: project.name
    };
  })
}
