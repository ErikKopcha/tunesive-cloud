import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    
    this.notify = () => toast("Something went wrong, try again later!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "error",
      theme: "dark"
    });
    
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.state.hasError = false;
  }
  
  componentDidCatch(error, errorInfo) {
    this.state.hasError = true;
    this.notify();
    console.warn(error, errorInfo);
  }
  
  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;