import ReactDOM from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';




const supabase = createClient(
    "https://mllikekqhazrprmkrgay.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sbGlrZWtxaGF6cnBybWtyZ2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIxODYwNTIsImV4cCI6MTk5Nzc2MjA1Mn0.URWM-6UtCK2nZe8aje1WTs1Q7oRgBHIsv1LouTOvkFQ"
);

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <SessionContextProvider supabaseClient={supabase}>
        <App />
    </SessionContextProvider>

);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
