import React from 'react';
import {Link} from "react-router-dom";

function CreateProjectButton(props) {
    return (<>
        <Link to="/addProject" className="btn btn-lg btn-info">Create project</Link>
        </>
    );
}

export default CreateProjectButton;