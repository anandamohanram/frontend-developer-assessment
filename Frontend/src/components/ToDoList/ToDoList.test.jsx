import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ToDoList } from './ToDoList';

describe('ToDoList', () => {
  const mockItems = [
    { id: '1', description: 'Item 1', isCompleted: false },
    { id: '2', description: 'Item 2', isCompleted: true },
  ];

  const mockGetItems = jest.fn();
  const mockMarkAsComplete = jest.fn();

  it('renders without crashing', () => {
    render(<ToDoList items={[]} getItems={mockGetItems} markAsComplete={mockMarkAsComplete} />);
    expect(screen.getByTestId('table-todo-list')).toBeInTheDocument();
  });

  it('displays correct number of items', () => {
    render(<ToDoList items={mockItems} getItems={mockGetItems} markAsComplete={mockMarkAsComplete} />);
    expect(screen.getByText('Showing 2 Item(s)')).toBeInTheDocument();
    expect(screen.getAllByTestId('button-mark-as-completed')).toHaveLength(2);
  });

  it('calls getItems function when Refresh button is clicked', () => {
    render(<ToDoList items={mockItems} getItems={mockGetItems} markAsComplete={mockMarkAsComplete} />);

    const refreshButton = screen.getByTestId('button-refresh');
    fireEvent.click(refreshButton);

    expect(mockGetItems).toHaveBeenCalled();
  });

  it('calls markAsComplete function with correct item when Action button is clicked', () => {
    render(<ToDoList items={mockItems} getItems={mockGetItems} markAsComplete={mockMarkAsComplete} />);

    const actionButton = screen.getAllByTestId('button-mark-as-completed');
    fireEvent.click(actionButton[0]);

    expect(mockMarkAsComplete).toHaveBeenCalledWith(mockItems[0]);
  });

  it('disables Action button for completed items', () => {
    render(<ToDoList items={mockItems} getItems={mockGetItems} markAsComplete={mockMarkAsComplete} />);

    const actionButton = screen.getAllByTestId('button-mark-as-completed');
    expect(actionButton[1]).toBeDisabled();
  });
});
