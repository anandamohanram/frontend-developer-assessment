import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Error, AddToDoItem, ToDoList } from '../index';
import { TO_DO_URL } from '../../constants';

export const Main = () => {
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
    <Container>
      <Row>
        <Col>
          <Error error={error} />
        </Col>
      </Row>
      <Row>
        <Col>
          <AddToDoItem onAddItem={handleAdd} ref={ref} />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <ToDoList items={items} getItems={getItems} markAsComplete={handleMarkAsComplete} />
        </Col>
      </Row>
    </Container>
  );
};
