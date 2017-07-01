export function invoicingProjectsSelector(invoicingProjects) {
  return invoicingProjects.map(project => {
    return {
      value: project.id,
      text: project.name
    };
  })
}
