import './App.css';
import { Image, Alert, Button, Container, Row, Col, Table } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { AddToDoItem } from './components/AddToDoItem/AddToDoItem';
import axios from 'axios';
import { TO_DO_URL } from './constants';

const App = () => {
  const ref = useRef(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  const renderTodoItemsContent = () => {
    return (
      <>
        <h1>
          Showing {items.length} Item(s){' '}
          <Button variant="primary" className="pull-right" onClick={() => getItems()}>
            Refresh
          </Button>
        </h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleMarkAsComplete(item)}>
                    Mark as completed
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };

  async function getItems() {
    setError(null);
    try {
      const { data } = await axios.get(TO_DO_URL);
      setItems(data);
    } catch (error) {
      setError('Server Error. Please try again later.');
      console.error(error);
    }
  }

  async function handleAdd(description) {
    setError(null);
    try {
      const { status } = await axios.post(
        TO_DO_URL,
        {
          description,
          isCompleted: false,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (status === 201) {
        getItems();
        ref.current.clear();
      }
    } catch ({ message, response }) {
      setError(response?.data ?? message ?? 'Please enter a non existing description and try again');
    } finally {
      ref.current.focus();
    }
  }

  async function handleMarkAsComplete(item) {
    setError(null);
    try {
      alert('todo');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Image src="clearPointLogo.png" fluid rounded />
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert variant="success">
              <Alert.Heading>Todo List App</Alert.Heading>
              Welcome to the ClearPoint frontend technical test. We like to keep things simple, yet clean so your
              task(s) are as follows:
              <br />
              <br />
              <ol className="list-left">
                <li>Add the ability to add (POST) a Todo Item by calling the backend API</li>
                <li>
                  Display (GET) all the current Todo Items in the below grid and display them in any order you wish
                </li>
                <li>
                  Bonus points for completing the 'Mark as completed' button code for allowing users to update and mark
                  a specific Todo Item as completed and for displaying any relevant validation errors/ messages from the
                  API in the UI
                </li>
                <li>Feel free to add unit tests and refactor the component(s) as best you see fit</li>
              </ol>
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddToDoItem onAddItem={handleAdd} ref={ref} />
            {error && (
              <Alert variant="danger" dismissible transition>
                {error}
              </Alert>
            )}
          </Col>
        </Row>
        <br />
        <Row>
          <Col>{renderTodoItemsContent()}</Col>
        </Row>
      </Container>
      <footer className="page-footer font-small teal pt-4">
        <div className="footer-copyright text-center py-3">
          © 2021 Copyright:
          <a href="https://clearpoint.digital" target="_blank" rel="noreferrer">
            clearpoint.digital
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
