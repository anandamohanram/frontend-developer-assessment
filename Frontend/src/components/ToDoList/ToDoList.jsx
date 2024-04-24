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
                <Button variant="warning" size="sm" onClick={() => markAsComplete(item)}>
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
