import React, {Component} from 'react';
import ProjectTask from "./projectTask/ProjectTask";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

class Backlog extends Component {
    onDragEnd = result => {

    }

    render() {
        const {project_tasks_prop} = this.props;

        const tasks = project_tasks_prop.map((project_task, index) => (
            <ProjectTask key={project_task.id} project_task={project_task} index={index}/>
        ));

        let todoItems = [];
        let inProgressItems = [];
        let doneItems = [];

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].props.project_task.status === "TO_DO") {
                todoItems.push(tasks[i]);
            }

            if (tasks[i].props.project_task.status === "IN_PROGRESS") {
                inProgressItems.push(tasks[i]);
            }

            if (tasks[i].props.project_task.status === "DONE") {
                doneItems.push(tasks[i]);
            }
        }

        return (
            <div className="container">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="row">
                        <Droppable droppableId="todo">
                            {provided => (
                                <div  {...provided.droppableProps}
                                      ref={provided.innerRef}
                                      className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-secondary text-white">
                                            <h3>TO DO</h3>
                                        </div>
                                    </div>
                                    {todoItems}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="inProgress">
                            {provided => (
                                <div {...provided.droppableProps}
                                     ref={provided.innerRef}
                                     className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-primary text-white">
                                            <h3>In Progress</h3>
                                        </div>
                                    </div>
                                    {inProgressItems}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="done">
                            {provided => (
                                <div  {...provided.droppableProps}
                                      ref={provided.innerRef}
                                      className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-success text-white">
                                            <h3>Done</h3>
                                        </div>
                                    </div>
                                    {doneItems}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
            </div>
        );
    }
}

export default Backlog;