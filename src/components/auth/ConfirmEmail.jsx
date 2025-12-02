import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

function ConfirmEmail() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('pending'); // 'pending' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const token_hash = url.searchParams.get('token_hash');
    const type = url.searchParams.get('type') || 'signup';

    if (!token_hash) {
      setStatus('error');
      setMessage('Confirmation link is invalid or has already been used.');
      setLoading(false);
      return;
    }

    const verify = async () => {
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      if (error) {
        console.error('Email confirm error:', error);
        setStatus('error');
        setMessage(
          error.message || 'Email confirmation link is invalid or expired.'
        );
        setLoading(false);
        return;
      }

      setStatus('success');
      setMessage('Your email has been confirmed. You can now log in to KOZ.');
      setLoading(false);

      setTimeout(() => {
        window.location.href = 'http://koz.pt'; // login/landing em dev
      }, 1500);
    };

    verify();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at top, #111827 0, #020617 45%, #020014 100%)',
        color: '#e5e7eb',
        fontFamily:
          "system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        padding: 16,
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: '100%',
          padding: 28,
          borderRadius: 22,
          border: '1px solid #111827',
          background:
            'radial-gradient(circle at top, rgba(139,92,246,0.35), transparent 55%) #020617',
          boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            margin: '0 0 10px',
            fontSize: 22,
            fontWeight: 600,
            color: '#f9fafb',
          }}
        >
          Confirming your email…
        </h1>

        {loading && (
          <p style={{ margin: 0, fontSize: 13, color: '#9ca3af' }}>
            Please wait while we verify your account.
          </p>
        )}

        {!loading && status === 'success' && (
          <p
            style={{
              marginTop: 8,
              fontSize: 13,
              color: '#bbf7d0',
            }}
          >
            {message}
          </p>
        )}

        {!loading && status === 'error' && (
          <p
            style={{
              marginTop: 8,
              fontSize: 13,
              color: '#fecaca',
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ConfirmEmail;
