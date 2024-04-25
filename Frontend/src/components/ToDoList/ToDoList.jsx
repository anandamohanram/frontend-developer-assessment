import { Button, Container, Table } from 'react-bootstrap';
import { MdCheckCircle, MdUndo } from 'react-icons/md';
import { TbProgress } from 'react-icons/tb';
import { FaUndoAlt, FaCheckCircle } from 'react-icons/fa';
import './ToDoList.css';

/**
 * A ToDo Item
 * @typedef {Object} TodoItem
 * @property {string} id - unique id of an item
 * @property {string} description - unique description of an item
 * @property {boolean} isCompleted - a completed flag for the item
 */

/**
 * Fetches all the items from the server
 * @name getItems
 * @function
 */

/**
 * Marks the todo item with given id as complete
 * @name markAsComplete
 * @function
 * @param {String} id id of the item to be marked as complete
 */

/**
 * ToDoList - A table to display the to do list.
 * @component
 * @param {Object} props - The component accepts onAddItem as props
 * @param {TodoItem[]} props.items - Array of ToDo Items
 * @param {getItems} props.getItems - getItems function
 * @param {markAsComplete} props.markAsComplete - markAsComplete function
 * @returns {JSX.Element} The rendered input component
 */
export const ToDoList = ({ items, getItems, markAsComplete }) => {
  return (
    <>
      <h6>
        Showing {items.length} Item(s){' '}
        <Button data-testid="button-refresh" variant="primary" className="pull-right" onClick={() => getItems()}>
          Refresh
        </Button>
      </h6>

      <Table data-testid="table-todo-list" striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr data-testid="row-todo-list" key={item.id} className="align-middle">
              <td>{item.id}</td>
              <td>
                <Container className={`description-container ${item.isCompleted ? 'description-completed' : ''}`}>
                  {item.isCompleted ? <MdCheckCircle className="green icon" /> : <TbProgress className="yellow icon" />}
                  {item.description}
                </Container>
              </td>
              <td className="action-buttons-wrapper">
                <button
                  title="Mark as complete"
                  data-testid="button-mark-as-completed"
                  variant={item.isCompleted ? 'success' : 'warning'}
                  disabled={item.isCompleted}
                  size="sm"
                  className="green icon-button"
                  onClick={() => markAsComplete(item)}
                >
                  <FaCheckCircle />
                </button>
                <button
                  className="yellow icon-button"
                  title="Redo"
                  data-testid="button-redo"
                  disabled={!item?.isCompleted}
                  onClick={() => markAsComplete(item, true)}
                >
                  <FaUndoAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
