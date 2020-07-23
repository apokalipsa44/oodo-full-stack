import React, { Component } from "react";
import ProjectTask from "./projectTask/ProjectTask";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class Backlog extends Component {
  state = {
    todoItems: {},
    inProgressItems: {},
    doneItems: {},
  };
  onDragEnd = (result) => {
    const { destination, source, reason } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    console.log("====================================");
    console.log(this.state);
    console.log("====================================");
    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];
    // console.log(this.props.project_tasks_prop)
    let tasks = this.props.project_tasks_prop;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].status === "TO_DO") {
        todoItems.push(tasks[i]);
        // todoItems.splice(source.index, 1);
        // todoItems.splice(destination.index, 0, droppedTodo);
      }

      if (tasks[i].status === "IN_PROGRESS") {
        inProgressItems.push(tasks[i]);
        
      }

      if (tasks[i].status === "DONE") {
        doneItems.push(tasks[i]);
        doneItems.splice(source.index, 1);
        doneItems.splice(destination.index, 0);
      }
    }
    let droppedTodo = tasks[source.index];
    if (droppedTodo.status == "TO_DO") {
      todoItems.splice(source.index, 1);
      todoItems.splice(destination.index, 0, droppedTodo);
    }; 
    if(droppedTodo.status == "IN_PROGRESS"){
      inProgressItems.splice(source.index, 1);
        inProgressItems.splice(destination.index, 0, droppedTodo);
    };
    if(droppedTodo.status=="DONE"){}

    this.setState({
      todoItems: todoItems,
      inProgressItems: inProgressItems,
      doneItems: doneItems,
    });
  };

  render() {
    const { project_tasks_prop } = this.props;

    const tasks = project_tasks_prop.map((project_task, index) => {
      return (
        <ProjectTask
          key={project_task.id}
          project_task={project_task}
          index={index}
        />
      );
    });

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
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="col-md-4"
                >
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
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="col-md-4"
                >
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
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="col-md-4"
                >
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
