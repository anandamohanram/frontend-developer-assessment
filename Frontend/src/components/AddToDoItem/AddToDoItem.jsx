import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';

/**
 * A simple input field with an action button to add todo item and a clear button.
 *
 * @component
 * @param {Object} props - The component accepts onAddItem as props
 * @param {function} props.onAddItem - The add item handler.
 * @returns {JSX.Element} The rendered input component.
 *
 * @usage
 * <AddToDoItem onAddItem={() => console.log('Add button clicked!')} />
 */
export const AddToDoItem = ({ onAddItem }) => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClear = () => {
    setDescription('');
  };

  return (
    <Container>
      <h1>Add Item</h1>
      <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col md="6">
          <Form.Control
            type="text"
            placeholder="Enter description..."
            value={description}
            onChange={handleDescriptionChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
        <Stack direction="horizontal" gap={2}>
          <Button variant="primary" onClick={() => onAddItem(description)}>
            Add Item
          </Button>
          <Button variant="secondary" onClick={() => handleClear()}>
            Clear
          </Button>
        </Stack>
      </Form.Group>
    </Container>
  );
};
