import React from 'react';
import PropTypes from 'prop-types'
import ProjectsList from '../components/ProjectsList';
import {connect} from 'react-redux';

class ProjectsPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Projects List</h1>
                <ProjectsList projects={this.props.projects}/>
            </div>
        );
    }
}

ProjectsPage.propTypes = {
    projects: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        projects: state.projects
    }
}

export default connect(mapStateToProps)(ProjectsPage);