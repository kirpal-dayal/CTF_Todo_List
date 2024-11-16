import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
  const notify = () => toast('¡Nueva notificación!');

  return (
    <div>
      <button onClick={notify} className="btn btn-warning">Mostrar Notificación</button>
      <ToastContainer />
    </div>
  );
};

export default Notifications;
