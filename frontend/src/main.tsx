import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import TemplateSelection from './routes/TemplateSelection';
import CreateEvent from './routes/CreateEvent';
import EventsList from './routes/EventsList';
import EventDetail from './routes/EventDetail';
import EditEvent from './routes/EditEvent';
import './styles/globals.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <TemplateSelection /> },
      { path: 'create', element: <CreateEvent /> },
      { path: 'events', element: <EventsList /> },
      { path: 'event/:id', element: <EventDetail /> },
      { path: 'edit/:id', element: <EditEvent /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);