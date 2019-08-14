import React from "react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {Button} from "semantic-ui-react";

export default observer((props) => {
    const tickCross = (state) => {
        return state ? <i className="checkmark icon"/> : <i className="remove circle icon"/>;
    };

    const tdClassName = (project, extraClasses) => {
        return (extraClasses || "" ) + ( project.cloaked ? " disabled" : "" );
    };

    return (
        <tr key={props.project.id}>
            <td className={tdClassName(props.project)}>{props.project.id}</td>
            <td className={tdClassName(props.project)}>{props.project.name}</td>
            <td className="center aligned">
                <input type="checkbox"
                       checked={props.project.cloaked ? "checked" : ""}
                       onChange={props.onCloakedChange}/>
            </td>
            <td className={tdClassName(props.project, "center aligned")}>{tickCross(props.project.working)}</td>
            <td className={tdClassName(props.project, "center aligned")}>{tickCross(props.project.billable)}</td>
            <td className="center aligned">
                <div className="ui buttons">
                    <Link to={`/projects/${props.project.id}`} className="ui compact icon button">
                        <i className="edit icon"/>
                    </Link>
                    <Button onClick={props.onDelete}
                            className="ui compact icon red button">
                        <i className="trash icon"/>
                    </Button>
                </div>
            </td>
        </tr>
    );
});
