import React from 'react';
import { Col } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';

export const Error = ({ error }) => {
  return (
    <Col sm={{ span: 8, offset: 2 }} className="d-flex justify-content-center align-items-center text-danger">
      {error && <FaInfoCircle className="me-4" />}
      <span data-testid="error-message">{error}</span>
    </Col>
  );
};
