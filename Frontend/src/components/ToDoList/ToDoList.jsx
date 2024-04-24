import { Button, Table } from 'react-bootstrap';

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
      <h1>
        Showing {items.length} Item(s){' '}
        <Button data-testid="button-refresh" variant="primary" className="pull-right" onClick={() => getItems()}>
          Refresh
        </Button>
      </h1>

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
            <tr data-testid="row-todo-list" key={item.id}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>
                <Button
                  data-testid="button-mark-as-completed"
                  variant={item.isCompleted ? 'success' : 'warning'}
                  disabled={item.isCompleted}
                  size="sm"
                  className="action-button"
                  onClick={() => markAsComplete(item)}
                >
                  {item.isCompleted ? 'Completed' : 'Mark as completed'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
