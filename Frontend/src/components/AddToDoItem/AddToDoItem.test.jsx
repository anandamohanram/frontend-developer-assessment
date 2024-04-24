import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AddToDoItem } from './AddToDoItem';

describe('AddToDoItem', () => {
  it('renders without crashing', () => {
    render(<AddToDoItem />);
  });

  test('renders the input field and two buttons', () => {
    render(<AddToDoItem />);
    const inputField = screen.getByTestId('input-todo-description');
    expect(inputField).toBeInTheDocument();
  });

  it('calls onAddItem handler with correct value when Add Item button is clicked', () => {
    const mockOnAddItem = jest.fn();
    render(<AddToDoItem onAddItem={mockOnAddItem} />);

    const description = 'Test Description';
    const input = screen.getByPlaceholderText('Enter description...');
    fireEvent.change(input, { target: { value: description } });

    const addItemButton = screen.getByTestId('button-add-item');
    fireEvent.click(addItemButton);

    expect(mockOnAddItem).toHaveBeenCalledWith(description);
  });

  it('clears input when Clear button is clicked', () => {
    render(<AddToDoItem />);

    const description = 'Test Description';
    const input = screen.getByPlaceholderText('Enter description...');
    fireEvent.change(input, { target: { value: description } });

    const clearButton = screen.getByTestId('button-clear-input');
    fireEvent.click(clearButton);

    expect(input.value).toBe('');
  });
});
