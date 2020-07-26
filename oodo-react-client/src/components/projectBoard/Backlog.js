import React, { Component } from "react";
import ProjectTask from "./projectTask/ProjectTask";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class Backlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.loadTasksToState(),
      rows: [
        { name: "todo", items: [] },
        { name: "inProcess", items: [] },
        { name: "done", items: [] },
      ],
      tasks: props.project_tasks_prop,
    };
  }

  loadTasksToState() {
    // console.log('loadtasksToState');
    // console.log(this.props)
    let tasks = this.props;
    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

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
    const { draggableId, destination, source } = result;
    // avoid dropping on an a invalid drop area
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
    console.log("result", result);

    let newTasksOrder = [];
    newTasksOrder = this.state.columns.todoItems;
    // console.log(this.state);
    console.log("aaaa");
    console.log(newTasksOrder);
    newTasksOrder.splice(source.index, 1);
    console.log(this.state.tasks);
    let movedTask = this.state.tasks[draggableId - 1];
    console.log("przesowany", movedTask);
    newTasksOrder.splice(destination.index, 0, movedTask);
    console.log(newTasksOrder);
    this.setState({
      ...this.state,
      todoItems: "newTasksOrder",
    });
    console.log("state po dragend", this.state);
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
