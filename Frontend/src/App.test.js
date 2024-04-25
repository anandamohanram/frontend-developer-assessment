import App from './App';
import React from 'react';
import axios from 'axios';
import { TO_DO_URL } from './constants';
import { render, waitFor, fireEvent, screen, act } from '@testing-library/react';

jest.mock('axios');

const mockItems = [
  { id: '1', description: 'Item 1', isCompleted: false },
  { id: '2', description: 'Item 2', isCompleted: false },
];

describe('App', () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
    axios.put.mockReset();
  });

  it('Fetches todo items and renders them on screen', async () => {
    axios.get.mockResolvedValueOnce({ data: mockItems });

    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId('row-todo-list')).toHaveLength(2);
    });
    expect(screen.getByText('Showing 2 Item(s)')).toBeInTheDocument();
    expect(axios.get).toBeCalledWith(TO_DO_URL);
  });

  it('Calls the post end point on add item and displays the added item in list', async () => {
    axios.post.mockResolvedValue({ data: { id: '10', description: 'Item 10', isCompleted: false }, status: 201 });
    axios.get.mockResolvedValueOnce({ data: mockItems });

    render(<App />);
    const description = 'Test Description';
    const inputField = screen.getByTestId('input-todo-description');
    fireEvent.change(inputField, { target: { value: description } });
    fireEvent.click(screen.getByTestId('button-add-item'));

    await waitFor(() => {
      expect(inputField).toHaveValue('');
    });
    await waitFor(() => {
      expect(axios.post).toBeCalledWith(
        TO_DO_URL,
        { description: description, isCompleted: false },
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
    expect(screen.getByText('Showing 1 Item(s)')).toBeInTheDocument();
    expect(screen.getByText('Item 10')).toBeInTheDocument();
  });

  it('Marks the selected item as completed on clicking the button', async () => {
    axios.get.mockResolvedValue({ data: mockItems, status: 200 });
    axios.put.mockResolvedValueOnce({ data: { id: '2', description: 'Item 2', isCompleted: true }, status: 200 });

    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId('row-todo-list')).toHaveLength(2);
    });
    expect(screen.getByText('Showing 2 Item(s)')).toBeInTheDocument();
    expect(axios.get).toBeCalledWith(TO_DO_URL);
    const completedButtons = screen.getAllByTestId('button-mark-as-completed');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await fireEvent.click(completedButtons[1]);
    });
    await waitFor(() => {
      expect(axios.put).toBeCalledWith(
        `${TO_DO_URL}${2}`,
        { description: 'Item 2', isCompleted: true },
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
  });

  it('Shows error message', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error('Error-message'));

    render(<App />);
    await waitFor(async () => {
      expect(screen.getByText('Server Error. Please try again later.')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('row-todo-list')).not.toBeInTheDocument();
  });
});
