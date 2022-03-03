import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
export default function Notification({ notification, setNotification }) {
  const { show, variant, title, content } = notification;
  return (
    <ToastContainer position="top-center" style={{ zIndex: 9999 }}>
      <Toast
        onClose={() => setNotification({ ...notification, show: false })}
        className="d-inline-block m-1"
        bg={variant}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <i className="bi bi-exclamation-circle"></i>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>
          {content}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
