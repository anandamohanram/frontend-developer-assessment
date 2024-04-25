import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Stack } from 'react-bootstrap';

/**
 * A simple input field with an action button to add todo item and a clear button.
 *
 * @component
 * @param {Object} props - The component accepts onAddItem as props
 * @param {function} props.onAddItem - The add item handler
 * @returns {JSX.Element} The rendered input component
 *
 * @usage
 * <AddToDoItem onAddItem={() => console.log('Add button clicked!')} />
 */
export const AddToDoItem = forwardRef(({ onAddItem }, ref) => {
  const inputRef = useRef(null);
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClear = () => {
    setDescription('');
  };

  // to expose inner ref and methods to parent
  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current.focus();
        },
        clear() {
          handleClear();
        },
      };
    },
    []
  );

  return (
    <Card className="p-3">
      <h6 className="mb-4">Add Item</h6>
      <Form.Group className="mb-3" controlId="formAddTodoItem">
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <Form.Label className="text-sm-left">Description</Form.Label>
          </Col>
          <Col sm={{ span: 8, offset: 2 }}>
            <Form.Control
              type="text"
              data-testid="input-todo-description"
              placeholder="Enter description..."
              value={description}
              ref={inputRef}
              onChange={handleDescriptionChange}
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
        <Col sm={{ span: 8, offset: 2 }}>
          <Stack direction="horizontal" gap={2}>
            <Button
              data-testid="button-add-item"
              variant="primary"
              onClick={() => onAddItem(description)}
              className="w-50"
            >
              Add Item
            </Button>
            <Button data-testid="button-clear-input" variant="secondary" onClick={() => handleClear()} className="w-50">
              Clear
            </Button>
          </Stack>
        </Col>
      </Form.Group>
    </Card>
  );
});
