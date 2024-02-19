import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom'; // For redirection after login/register
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary
import '../app.css';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [userRole, setUserRole] = useState(""); // 'students', 'teachers', 'co_op_representatives'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameFirst, setNameFirst] = useState(""); // Only used for registration
  const [nameLast, setNameLast] = useState(""); // Only used for registration
  const [error, setError] = useState(""); // To display error messages
  const api_base = 'http://localhost:3001';
  const navigate = useNavigate(); // Hook for navigating to another route
  const { login } = useAuth();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      const redirectToDashboard = {
        student: '/student',
        teacher: '/teacher',
        'co-op-manager': '/co-op-manager',
      };
      const dashboardPath = redirectToDashboard[currentUser.role] || '/';
      navigate(dashboardPath);
    }
  }, [currentUser, navigate]);
  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Handle Google authentication logic here
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    // Simplify role matching to match your server and AuthContext expectations
    const adjustedRole = {
      'student': 'student',
      'teacher': 'teacher',
      'co_op_representative': 'co-op-manager',
    }[userRole];

    try {

      if(!isLogin) {
        const url = `${api_base}/${userRole}/register`;
        const payload = { email, password, nameFirst, nameLast };
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          const data = await response.json();
          if (response.ok) {
            console.log('Success:', data);
          } else {
            throw new Error(data.message || 'An error occurred during authentication.');
          }
        } catch (error) {
          setError(error.response?.data?.error || error.message);
          console.error('Authentication Error:', error);
        }
      }
      await login(email, password, adjustedRole);
      navigate('/dashboard'); // Redirect user on successful login
    } catch (error) {
      setError(error.response?.data?.error || error.message);
      console.error('Authentication Error:', error);
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <img src="/dunamis-logo.png" alt="Dunamis Logo" className="logo"/>
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <>
              <div className="input-group">
                <input type="text" placeholder="First Name" value={nameFirst} onChange={(e) => setNameFirst(e.target.value)} />
              </div>
              <div className="input-group">
                <input type="text" placeholder="Last Name" value={nameLast} onChange={(e) => setNameLast(e.target.value)} />
              </div>
            </>
          )}
          <div className="input-group">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-group">
            <select value={userRole} onChange={handleRoleChange} required>
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="co_op_representative">Co-Op Representative</option>
            </select>
          </div>
          {/* Error message */}
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <div className="auth-alternatives">
          <GoogleLogin
            clientId="240699630959-ij4ouks2s7i4hhuav6binmbv04pus84a.apps.googleusercontent.com"
            buttonText={isLogin ? 'Login with Google' : 'Register with Google'}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need to register?' : 'Already registered?'}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
