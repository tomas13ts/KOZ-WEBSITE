import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "../../lib/supabaseClient"

const TABS = ["Overview", "Activation Keys", "Users"]

export default function AdminPanel() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [status, setStatus] = useState("loading") // loading | anon | not-admin | ready
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [activeTab, setActiveTab] = useState("Overview")

  // Load session on mount
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        setStatus("anon")
        return
      }
      setSession(session)
      await loadProfile(session)
    }
    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      if (!newSession) {
        setProfile(null)
        setStatus("anon")
      } else {
        loadProfile(newSession)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadProfile = async (sess) => {
    if (!sess?.user) {
      setStatus("anon")
      return
    }
    const { data, error } = await supabase
      .from("user_profiles")
      .select("id, email, role, created_at")
      .eq("id", sess.user.id)
      .single()

    if (error || !data) {
      setStatus("not-admin")
      return
    }

    setProfile(data)
    if (data.role === "admin") {
      setStatus("ready")
    } else {
      setStatus("not-admin")
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthError("")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setAuthError(error.message || "Login failed")
      return
    }

    if (data.session) {
      await loadProfile(data.session)
    }
  }

  // ---------- RENDER GATES ----------

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-koz-light">
        <div className="text-sm text-koz-muted">Checking admin access…</div>
      </div>
    )
  }

  if (status === "anon") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-koz-light px-4">
        <div className="w-full max-w-md card-glass">
          <h1 className="text-xl font-semibold mb-2">Admin login</h1>
          <p className="text-xs text-koz-muted mb-6">
            Only KOZ administrators can access this panel.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs mb-1 text-koz-muted">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded-md bg-black/40 border border-koz-border-light text-sm outline-none focus:border-koz-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="block text-xs mb-1 text-koz-muted">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-md bg-black/40 border border-koz-border-light text-sm outline-none focus:border-koz-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {authError && (
              <div className="text-xs text-red-400">{authError}</div>
            )}

            <button
              type="submit"
              className="w-full btn-primary text-sm text-center"
            >
              Enter admin panel
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (status === "not-admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050816] text-koz-light px-4">
        <div className="w-full max-w-md card-glass text-center">
          <h1 className="text-xl font-semibold mb-2">
            Admin access required
          </h1>
          <p className="text-xs text-koz-muted mb-4">
            This area is only available to KOZ administrators. If you believe
            this is a mistake, please contact the team.
          </p>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              setStatus("anon")
            }}
            className="btn-secondary text-xs"
          >
            Back to login
          </button>
        </div>
      </div>
    )
  }

  // ---------- MAIN ADMIN UI (status === "ready") ----------

  return (
    <div className="min-h-screen bg-[#050816] text-koz-light flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-koz-border-light py-6 px-4 space-y-6">
        <div>
          <div className="text-lg font-semibold">KOZ Admin</div>
          <div className="text-[11px] text-koz-muted mt-1">
            {profile?.email}
          </div>
          <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full bg-emerald-500/10 text-[10px] font-semibold text-emerald-400">
            Admin
          </span>
        </div>

        <nav className="space-y-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                activeTab === t
                  ? "bg-koz-primary/20 text-koz-primary"
                  : "text-koz-muted hover:bg-white/5"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <button
          onClick={async () => {
            await supabase.auth.signOut()
            setStatus("anon")
          }}
          className="text-[11px] text-koz-muted hover:text-red-400"
        >
          Sign out
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Admin panel</h1>
            <p className="text-xs text-koz-muted">
              Manage activation keys and user access for the KOZ app.
            </p>
          </div>
        </header>

        {activeTab === "Overview" && <OverviewSection />}

        {activeTab === "Activation Keys" && <KeysSection />}

        {activeTab === "Users" && <UsersSection />}
      </main>
    </div>
  )
}

// ---------- Overview ----------

function OverviewSection() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const loadStats = async () => {
      const { data: all } = await supabase
        .from("activation_keys")
        .select("id, is_used, expires_at")

      if (!all) return

      const total = all.length
      const used = all.filter((k) => k.is_used).length
      const unused = total - used
      const now = new Date()
      const expired = all.filter(
        (k) => k.expires_at && new Date(k.expires_at) < now,
      ).length

      setStats({ total, used, unused, expired })
    }
    loadStats()
  }, [])

  if (!stats) {
    return (
      <div className="text-sm text-koz-muted">Loading statistics…</div>
    )
  }

  const cards = [
    { label: "Total keys", value: stats.total },
    { label: "Used keys", value: stats.used },
    { label: "Unused keys", value: stats.unused },
    { label: "Expired keys", value: stats.expired },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="card-glass py-4 px-4">
          <div className="text-xs text-koz-muted mb-1">{c.label}</div>
          <div className="text-xl font-semibold">{c.value}</div>
        </div>
      ))}
    </div>
  )
}

// ---------- Activation Keys ----------
function KeysSection() {
  const [keys, setKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newDays, setNewDays] = useState(30)
  const [newPrefix, setNewPrefix] = useState("KOZ-PROD")
  const [error, setError] = useState("")

  const loadKeys = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("activation_keys")
      .select(
        "id, key_code, is_used, used_by, created_at, duration_days, expires_at",
      )
      .order("created_at", { ascending: false })

    if (!error && data) setKeys(data)
    setLoading(false)
  }

  useEffect(() => {
    loadKeys()
  }, [])

  const handleCreateKey = async (e) => {
    e.preventDefault()
    setError("")
    setCreating(true)

    // gera código simples tipo KOZ-PROD-2024-XXXX
    const random = Math.random().toString(36).slice(2, 6).toUpperCase()
    const year = new Date().getFullYear()
    const keyCode = `${newPrefix}-${year}-${random}`

    const { error } = await supabase.from("activation_keys").insert({
      key_code: keyCode,
      is_used: false,
      duration_days: newDays,
    })

    if (error) {
      setError(error.message || "Failed to create key")
    } else {
      setNewDays(30)
      await loadKeys()
    }
    setCreating(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-lg font-semibold">Activation keys</h2>

        <form
          onSubmit={handleCreateKey}
          className="flex flex-wrap items-center gap-2 text-xs"
        >
          <select
            value={newPrefix}
            onChange={(e) => setNewPrefix(e.target.value)}
            className="px-2 py-1 rounded-md bg-black/40 border border-koz-border-light outline-none"
          >
            <option value="KOZ-PROD">PROD</option>
            <option value="KOZ-TEST">TEST</option>
            <option value="KOZ-DEMO">DEMO</option>
          </select>

          <input
            type="number"
            min={1}
            max={365}
            value={newDays}
            onChange={(e) => setNewDays(Number(e.target.value))}
            className="w-20 px-2 py-1 rounded-md bg-black/40 border border-koz-border-light outline-none"
          />
          <span className="text-koz-muted">days</span>

          <button
            type="submit"
            disabled={creating}
            className="btn-primary text-xs px-4 py-2 disabled:opacity-60"
          >
            {creating ? "Creating…" : "Generate key"}
          </button>
        </form>
      </div>

      {error && (
        <div className="text-xs text-red-400">
          {error}
        </div>
      )}

      <div className="card-glass overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[11px] text-koz-muted border-b border-koz-border-light">
            <tr>
              <th className="px-3 py-2">Key</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Duration</th>
              <th className="px-3 py-2">Expires</th>
              <th className="px-3 py-2">Used by (uuid)</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-4 text-center text-koz-muted"
                >
                  Loading keys…
                </td>
              </tr>
            ) : keys.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-4 text-center text-koz-muted"
                >
                  No keys found.
                </td>
              </tr>
            ) : (
              keys.map((k) => {
                const status = k.is_used ? "Used" : "Unused"
                const expires = k.expires_at
                  ? new Date(k.expires_at).toLocaleDateString()
                  : "—"
                const created = k.created_at
                  ? new Date(k.created_at).toLocaleDateString()
                  : "—"

                const handleRevoke = async () => {
                  await supabase
                    .from("activation_keys")
                    .update({ is_used: true, expires_at: new Date().toISOString() })
                    .eq("id", k.id)
                  await loadKeys()
                }

                const handleDelete = async () => {
                  await supabase
                    .from("activation_keys")
                    .delete()
                    .eq("id", k.id)
                  await loadKeys()
                }

                return (
                  <tr key={k.id} className="border-t border-koz-border-light">
                    <td className="px-3 py-2 font-mono text-[11px]">
                      {k.key_code}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] ${
                          k.is_used
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-500/10 text-slate-300"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      {k.duration_days ?? "—"} days
                    </td>
                    <td className="px-3 py-2">{expires}</td>
                    <td className="px-3 py-2 font-mono text-[10px]">
                      {k.used_by ?? "—"}
                    </td>
                    <td className="px-3 py-2">{created}</td>
                    <td className="px-3 py-2 text-right space-x-2">
                      {!k.is_used && (
                        <button
                          onClick={handleRevoke}
                          className="text-[10px] text-amber-300 hover:text-amber-200"
                        >
                          Revoke
                        </button>
                      )}
                      <button
                        onClick={handleDelete}
                        className="text-[10px] text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ---------- Users ----------

function UsersSection() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const loadUsers = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("user_profiles")
      .select("id, email, role, activation_key, created_at")
      .order("created_at", { ascending: false })

    if (!error && data) setUsers(data)
    setLoading(false)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const toggleRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin"
    await supabase
      .from("user_profiles")
      .update({ role: newRole })
      .eq("id", user.id)
    await loadUsers()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Users</h2>
      </div>

      <div className="card-glass overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[11px] text-koz-muted border-b border-koz-border-light">
            <tr>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Activation key</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-4 text-center text-koz-muted"
                >
                  Loading users…
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-4 text-center text-koz-muted"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const created = u.created_at
                  ? new Date(u.created_at).toLocaleDateString()
                  : "—"
                const isAdmin = u.role === "admin"
                return (
                  <tr key={u.id} className="border-t border-koz-border-light">
                    <td className="px-3 py-2 text-xs">{u.email}</td>
                    <td className="px-3 py-2 text-xs">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] ${
                          isAdmin
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-500/10 text-slate-300"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-mono text-[10px]">
                      {u.activation_key ?? "—"}
                    </td>
                    <td className="px-3 py-2">{created}</td>
                    <td className="px-3 py-2 text-right">
                      <button
                        onClick={() => toggleRole(u)}
                        className="text-[10px] text-koz-primary hover:text-koz-primary/80"
                      >
                        {isAdmin ? "Remove admin" : "Make admin"}
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

