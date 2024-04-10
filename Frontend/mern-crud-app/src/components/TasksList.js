import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import UpdateTask from "./UpdateTask";

import { useDispatch, useSelector } from "react-redux";

import {
  setSelectedTask,
  deleteTaskFromServer,
  getTasksFromServer,
  removeTaskFromList,
} from "../slices/taskSlice";

const TasksList = () => {
  const { tasksList } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const updateTask = (task) => {
    setModalShow(true);
    dispatch(setSelectedTask(task));
  };

  useEffect(() => {
    dispatch(getTasksFromServer());
  }, [dispatch]);

  const deleteTask = (task) => {
    console.log("delete task", task);
    dispatch(deleteTaskFromServer(task))
      .then(() => {
        dispatch(removeTaskFromList(task));
      })
      .catch((error) => {
        // Handle error appropriately
        console.error("Error deleting task:", error);
      });
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <section className="my-5">
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasksList &&
            tasksList.map((task, index) => {
              return (
                <tr className="text-center" key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <Button
                      variant="primary mx-2"
                      onClick={() => updateTask(task)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button variant="danger" onClick={() => deleteTask(task)}>
                      <i className="bi bi-trash3"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <UpdateTask show={modalShow} onHide={() => setModalShow(false)} />
    </section>
  );
};

export default TasksList;
