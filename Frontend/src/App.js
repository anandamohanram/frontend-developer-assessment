import './App.css';
import { Image, Alert, Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { AddToDoItem, ToDoList } from './components';
import axios from 'axios';
import { TO_DO_URL } from './constants';
import { FaInfoCircle } from 'react-icons/fa';

const App = () => {
  const ref = useRef(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    try {
      const { data = [] } = await axios.get(TO_DO_URL);
      setItems(data);
      setError(null);
    } catch (error) {
      setError('Server Error. Please try again later.');
      console.error(error);
    }
  }

  async function handleAdd(description) {
    try {
      const { status, data } = await axios.post(
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
        setItems([...items, data]);
        setError(null);
        ref.current.clear();
      }
    } catch (error) {
      const { message, response } = error;
      setError(response?.data ?? message ?? 'Some internal error. Please try again');
      console.error(error);
    } finally {
      ref.current.focus();
    }
  }

  async function handleMarkAsComplete(item, undo = false) {
    if (item.isCompleted & !undo) return;
    try {
      const res = await axios.put(
        `${TO_DO_URL}${item.id}`,
        {
          description: item?.description,
          isCompleted: undo ? false : true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res?.status === 200) {
        getItems();
        setError(null);
      }
    } catch (error) {
      const { message, response } = error;
      setError(response?.data ?? message ?? 'Some internal error. Please try again');
      console.error(error);
    } finally {
      ref.current.focus();
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
            <Col sm={{ span: 8, offset: 2 }} className="d-flex justify-content-center align-items-center text-danger">
              {error && <FaInfoCircle className="me-4" />}
              <span data-testid="error-message">{error}</span>
            </Col>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <ToDoList items={items} getItems={getItems} markAsComplete={handleMarkAsComplete} />
          </Col>
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
