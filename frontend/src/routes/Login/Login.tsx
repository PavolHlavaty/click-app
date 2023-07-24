import './Login.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../api/auth/auth.api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginHandler(email, password);
  };

  const loginHandler = async (email: string, password: string) => {
    try {
      const loginResponse = await login(email, password);
      localStorage.setItem('token', loginResponse.accessToken);
      navigate('/');
    } catch (error) {
      console.error(error);
      // TODO show error message
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="email-input">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email-input"
          />
        </div>
        <div className="form-input">
          <label htmlFor="password-input">Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password-input"
          />
        </div>

        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
