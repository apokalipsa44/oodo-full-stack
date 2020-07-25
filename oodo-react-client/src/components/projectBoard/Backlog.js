import React, { Component } from "react";
import ProjectTask from "./projectTask/ProjectTask";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

let todoItems = [];
let inProgressItems = [];
let doneItems = [];

class Backlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      inProgressItems: [],
      doneItems: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    let tasks = props;
    todoItems = [];
    inProgressItems = [];
    doneItems = [];

  
    for (let i = 0; i < tasks.project_tasks_prop.length; i++) {
      if (tasks.project_tasks_prop[i].status === "TO_DO") {
        todoItems.push(tasks.project_tasks_prop[i]);
      }

      if (tasks.project_tasks_prop[i].status === "IN_PROGRESS") {
        inProgressItems.push(tasks.project_tasks_prop[i]);
      }

      if (tasks.project_tasks_prop[i].status === "DONE") {
        doneItems.push(tasks.project_tasks_prop[i]);
      }
    }
    return {
      todoItems: todoItems,
      inProgressItems: inProgressItems,
      doneItems: doneItems,
    };
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
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

    // newTaskIds.splice(source.index, 1);
    // newTaskIds.splice(destination.index, 0, draggableId);
  };
  render() {
    const { project_tasks_prop } = this.props;
    let columns = this.state;
    console.log(this.state);
    let todoItems = columns.todoItems;
    let inProgressItems = columns.inProgressItems;
    let doneItems = columns.doneItems;
    console.log(todoItems);

    const todoComponents = todoItems.map((project_task, index) => {
      return (
        <ProjectTask
          key={project_task.id}
          project_task={project_task}
          index={index}
        />
      );
    });

    const inProgressComponents = inProgressItems.map((project_task, index) => {
      return (
        <ProjectTask
          key={project_task.id}
          project_task={project_task}
          index={index}
        />
      );
    });

    const doneComponents = doneItems.map((project_task, index) => {
      return (
        <ProjectTask
          key={project_task.id}
          project_task={project_task}
          index={index}
        />
      );
    });

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
                  {todoComponents}
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
                  {inProgressComponents}
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
                  {doneComponents}
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
