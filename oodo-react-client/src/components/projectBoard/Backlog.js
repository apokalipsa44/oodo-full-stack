import React, { Component } from "react";
import ProjectTask from "./projectTask/ProjectTask";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class Backlog extends Component {

    if (!destination) {
      return;
    }

    // avoid dropping on the original place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
<<<<

=======
    console.log("result", result);

    //single column drop
    let newTasksOrder = [];
    newTasksOrder = this.state.columns.todoItems;
    newTasksOrder.splice(source.index, 1);
    let movedTask = this.state.tasks[draggableId - 1];
    newTasksOrder.splice(destination.index, 0, movedTask);
    this.setState({
      ...this.state,
      todoItems: newTasksOrder,
    });

    //multiple column drop
    
  };

  componentDidUpdate() {
    console.log("componentDidUpdate fired");
    console.log("STATE", this.state);
  }

  render() {
    let columns = this.state.columns;
    let rows = this.state.rows;
    // console.log('z rendera',this.state);
    let todoItems = columns.todoItems;
    // console.log(todoItems);
    let inProgressItems = columns.inProgressItems;
    let doneItems = columns.doneItems;
    // console.log(todoItems);
    const tasks = this.state.columns;
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
        <DragDropContext
          onDragEnd={(result) => {
            this.onDragEnd(result);
          }}
        >
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
