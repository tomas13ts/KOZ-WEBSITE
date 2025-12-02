// ResetPassword.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

function ResetPassword({ navigate }) {
  const [loading, setLoading] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  // 1) validar o token que vem no link
  useEffect(() => {
    const url = new URL(window.location.href);
    const token_hash = url.searchParams.get('token_hash');
    const type = url.searchParams.get('type') || 'recovery';

    if (!token_hash) {
      setLoading(false);
      setMessage({
        text: 'Reset link is invalid or has already been used.',
        type: 'error',
      });
      return;
    }

    const verify = async () => {
      const { data, error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      if (error) {
        console.error('verifyOtp error:', error);
        setMessage({
          text: error.message || 'Reset link is invalid or has expired.',
          type: 'error',
        });
        setLoading(false);
        return;
      }

      setSessionReady(true);
      setLoading(false);
    };

    verify();
  }, []);

  // 2) atualizar a password
  const handleReset = async e => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (password.length < 6) {
      return setMessage({
        text: 'Password must be at least 6 characters.',
        type: 'error',
      });
    }
    if (password !== confirm) {
      return setMessage({
        text: 'Passwords do not match.',
        type: 'error',
      });
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setMessage({
        text: 'Password updated successfully. You can now log in.',
        type: 'success',
      });

      setTimeout(() => {
        if (navigate) navigate('auth');
        else window.location.href = 'https://koz.pt'; // ou https://koz.pt em prod
      }, 1600);
    } catch (err) {
      setMessage({
        text: err.message || 'Failed to update password.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

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
        }}
      >
        <h1
          style={{
            margin: '0 0 6px',
            fontSize: 22,
            fontWeight: 600,
            color: '#f9fafb',
          }}
        >
          Set a new password
        </h1>
        <p
          style={{
            margin: '0 0 18px',
            fontSize: 13,
            color: '#9ca3af',
            lineHeight: 1.7,
          }}
        >
          Choose a strong password for your KOZ Optimizer account.
        </p>

        {!sessionReady && !loading && (
          <p
            style={{
              fontSize: 13,
              color: '#f97373',
              marginBottom: 0,
            }}
          >
            Reset link invalid or expired. Request a new password reset from the
            app.
          </p>
        )}

        {sessionReady && (
          <form onSubmit={handleReset}>
            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 6,
                  fontSize: 13,
                  color: '#9ca3af',
                }}
              >
                New password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="New password"
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1px solid rgba(60,60,80,0.5)',
                  background: 'rgba(15,23,42,0.95)',
                  color: '#e5e7eb',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 6,
                  fontSize: 13,
                  color: '#9ca3af',
                }}
              >
                Confirm password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Confirm password"
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1px solid rgba(60,60,80,0.5)',
                  background: 'rgba(15,23,42,0.95)',
                  color: '#e5e7eb',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
            </div>

            {message.text && (
              <div
                style={{
                  padding: '9px 12px',
                  borderRadius: 10,
                  fontSize: 13,
                  marginBottom: 12,
                  textAlign: 'center',
                  background:
                    message.type === 'error'
                      ? 'rgba(239,68,68,0.08)'
                      : 'rgba(34,197,94,0.08)',
                  border:
                    message.type === 'error'
                      ? '1px solid rgba(239,68,68,0.5)'
                      : '1px solid rgba(34,197,94,0.5)',
                  color:
                    message.type === 'error' ? '#fecaca' : '#bbf7d0',
                }}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: 13,
                borderRadius: 999,
                border: 'none',
                background:
                  'linear-gradient(135deg,#8b5cf6,#a855f7,#22d3ee)',
                boxShadow: '0 18px 40px rgba(139,92,246,0.7)',
                color: '#020617',
                fontSize: 14,
                fontWeight: 650,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Updating…' : 'Update password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
