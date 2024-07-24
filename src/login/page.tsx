import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/login.module.css'; // CSS dosyanızı import edin

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (result.success) {
      window.location.href = '/main';
    } else {
      setError('Invalid username or password!');
    }
  };

  return (
    <div className={styles['app-auth-sign-in']}>
      <div className={styles['app-auth-background']}></div>
      <div className={styles['app-auth-container']}>
        <div className={styles.logo}>
          <a href="/">Wext.ai Interface Test</a>
        </div>
        <p className={styles['auth-description']}>
          Please sign in to your account and continue to the dashboard.
        </p>
        {error && <p className={styles['auth-fail']}>{error}</p>} {/*hata mesajı*/}
        <form onSubmit={handleSubmit}>
          <div className={styles['auth-credentials']}>
            <label htmlFor="email" className={styles['form-label']}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={styles['form-control']}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className={styles['form-label']}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="●●●●●●●●"
              className={styles['form-control']}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles['btn-primary']}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
