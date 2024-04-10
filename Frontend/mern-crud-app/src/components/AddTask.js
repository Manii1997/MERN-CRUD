import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { addTaskToServer } from "../slices/taskSlice";
import { useDispatch } from "react-redux";

const AddTask = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    console.log({ title, description });
    dispatch(addTaskToServer({ title, description }));
    setTitle("");
    setDescription("");
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Task Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Task Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={(e) => addTask(e)}>
        Add Task
      </Button>
    </Form>
  );
};

export default AddTask;
