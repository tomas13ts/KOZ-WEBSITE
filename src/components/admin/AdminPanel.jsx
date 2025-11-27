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

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const init = async () => {
      setStatus("loading")
      setLoading(true)
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setStatus("anon")
          setLoading(false)
          return
        }

        const {
          data: { user },
        } = await supabase.auth.getUser()

        console.log("auth user:", user)

        const res = await fetch(
          "https://sbhivufbongyjodyzcvx.functions.supabase.co/admin-panel?resource=profile",
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              "x-user-email": user?.email ?? "",
            },
          },
        )

        const json = await res.json()
        console.log("profile from function:", json)

        if (!json.profile || json.profile.role !== "admin") {
          setAuthError("Admin access required")
          setProfile(null)
          setStatus("not-admin")
        } else {
          setProfile(json.profile)
          setStatus("ready")
        }
      } catch (err) {
        console.error("Error loading profile from function:", err)
        setAuthError("Failed to load profile")
        setStatus("not-admin")
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])


  const loadProfile = async (sess) => {
    if (!sess?.user) {
      setStatus("anon")
      return
    }

    try {
      const res = await fetch(
        "https://sbhivufbongyjodyzcvx.functions.supabase.co/admin-panel?resource=profile",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            "x-user-id": sess.user.id,
          },
        },
      )

      const json = await res.json()
      console.log("profile from function:", json)

      if (!json.profile) {
        setStatus("not-admin")
        return
      }

      setProfile(json.profile)
      if (json.profile.role === "admin") {
        setStatus("ready")
      } else {
        setStatus("not-admin")
      }
    } catch (err) {
      console.error("Error loading profile from function:", err)
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
      // o useEffect inicial já trata de carregar o perfil
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
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${activeTab === t
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

    try {
      const res = await fetch(
        "https://sbhivufbongyjodyzcvx.functions.supabase.co/admin-panel?resource=keys",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        },
      )

      const json = await res.json()
      setKeys(json.keys || [])
    } catch (err) {
      console.error("Error loading keys from function:", err)
      setKeys([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadKeys()
  }, [])

const handleCreateKey = async (e) => {
  e.preventDefault()
  setError("")
  setCreating(true)

  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  const year = new Date().getFullYear()
  const keyCode = `${newPrefix}-${year}-${random}`

  try {
    const res = await fetch(
      "https://sbhivufbongyjodyzcvx.functions.supabase.co/admin-panel?resource=create-key",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key_code: keyCode,
          duration_days: newDays,
        }),
      },
    )

    const json = await res.json()

    if (json.error) {
      setError(json.error)
    } else {
      setNewDays(30)
      await loadKeys()
    }
  } catch (err) {
    console.error("Error creating key:", err)
    setError("Failed to create key")
  } finally {
    setCreating(false)
  }
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

const handleRevoke = async (keyId) => {
  try {
    const res = await fetch(
      "https://sbhivufbongyjodyzcvx.functions.supabase.co/admin-panel?resource=revoke-key",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: keyId }),  // <-- muda de key_id para id
      },
    )

    const json = await res.json()

    if (json.error) {
      console.error("Error revoking key:", json.error)
      return
    }

    await loadKeys()
  } catch (err) {
    console.error("Error revoking key:", err)
  }
}

const handleDelete = async (keyId) => {
  try {
    const res = await fetch(
      "https://sbhivufbongyjodyzcvx.functions.supabase.co/admin-panel?resource=delete-key",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: keyId }),  // <-- muda de key_id para id
      },
    )

    const json = await res.json()

    if (json.error) {
      console.error("Error deleting key:", json.error)
      return
    }

    await loadKeys()
  } catch (err) {
    console.error("Error deleting key:", err)
  }
}



                return (
                  <tr key={k.id} className="border-t border-koz-border-light">
                    <td className="px-3 py-2 font-mono text-[11px]">
                      {k.key_code}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] ${k.is_used
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-500/10 text-slate-300"
                          }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      {k.duration_days ?? "—"} days
                      {k.days_left != null && (
                        <span className="ml-1 text-[10px] text-koz-muted">
                          ({k.days_left} left)
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2">{expires}</td>
                    <td className="px-3 py-2 font-mono text-[10px]">
                      {k.used_by ?? "—"}
                    </td>
                    <td className="px-3 py-2">{created}</td>
                    <td className="px-3 py-2 text-right space-x-2">
                    <button
                      onClick={() => handleDelete(k.id)}
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
  const [selectedUser, setSelectedUser] = useState(null)
  const [details, setDetails] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)

  const loadUsers = async () => {
    setLoading(true)

    try {
      const res = await fetch(
        "https://sbhivufbongyjodyzcvx.functions.supabase.co/admin-panel?resource=users",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        },
      )

      const json = await res.json()
      console.log("users from function:", json)
      setUsers(json.users || [])
    } catch (err) {
      console.error("Error loading users:", err)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

const deleteUser = async (user) => {
  if (!window.confirm(`Tens a certeza que queres remover ${user.email}?`)) return

  try {
    const res = await fetch(
      "https://sbhivufbongyjodyzcvx.functions.supabase.co/admin-panel?resource=delete-user",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      },
    )

    const json = await res.json()

    if (json.error) {
      console.error("Error deleting user:", json.error)
      return
    }

    await loadUsers()
    setSelectedUser(null)
    setDetails(null)
  } catch (err) {
    console.error("Error deleting user:", err)
  }
}


  // carregar detalhes quando selecionas um utilizador
  useEffect(() => {
    const loadDetails = async () => {
      if (!selectedUser) {
        setDetails(null)
        return
      }

      setDetailsLoading(true)

      try {
        const url = new URL(
          "https://sbhivufbongyjodyzcvx.functions.supabase.co/admin-panel",
        )
        url.searchParams.set("resource", "user-details")
        url.searchParams.set("user_id", selectedUser.id)

        const res = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        })

        const json = await res.json()
        console.log("user details from function:", json)

        if (json.error) {
          console.error("Error from function:", json.error)
          setDetails(null)
          return
        }

        setDetails({ profile: json.profile, key: json.key })
      } catch (err) {
        console.error("Error loading user details via function:", err)
        setDetails(null)
      } finally {
        setDetailsLoading(false)
      }
    }

    loadDetails()
  }, [selectedUser])


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
                  <tr
                    key={u.id}
                    className="border-t border-koz-border-light hover:bg-white/5 cursor-pointer"
                    onClick={() => setSelectedUser(u)}
                  >
                    <td className="px-3 py-2 text-xs">{u.email}</td>
                    <td className="px-3 py-2 text-xs">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] ${isAdmin
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
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteUser(u)
                        }}
                        className="text-[10px] text-red-400 hover:text-red-300"
                      >
                        Delete user
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* POPUP DE DETALHES */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="card-glass max-w-md w-full mx-4 p-4 text-xs space-y-3">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold">User details</h3>
              <button
                onClick={() => {
                  setSelectedUser(null)
                  setDetails(null)
                }}
                className="text-[10px] text-koz-muted hover:text-koz-primary"
              >
                Close
              </button>
            </div>

            {detailsLoading ? (
              <div className="text-koz-muted">Loading details…</div>
            ) : !details || !details.profile ? (
              <div className="text-koz-muted">
                Could not load details for this user.
              </div>
            ) : (
              <>
                {/* Perfil */}
                <div className="space-y-1">
                  <div className="font-semibold">
                    {details.profile.email}
                  </div>
                  <div className="text-koz-muted">
                    Role: {details.profile.role}
                  </div>
                  <div className="text-koz-muted">
                    Created:{" "}
                    {details.profile.created_at
                      ? new Date(
                        details.profile.created_at,
                      ).toLocaleString()
                      : "—"}
                  </div>
                </div>

                {/* Key */}
                <div className="border-t border-koz-border-light pt-2 space-y-1">
                  <div className="font-semibold">Activation key</div>
                  {details.key ? (
                    <>
                      <div className="font-mono text-[11px]">
                        {details.key.key_code}
                      </div>
                      <div className="text-koz-muted">
                        Created:{" "}
                        {details.key.created_at
                          ? new Date(details.key.created_at).toLocaleString()
                          : "—"}
                      </div>
                      <div className="text-koz-muted">
                        Duration days: {details.key.duration_days ?? "—"}
                      </div>
                      <div className="text-koz-muted">
                        Expires:{" "}
                        {details.key.expires_at ? (
                          <>
                            {new Date(details.key.expires_at).toLocaleDateString()}
                            {(() => {
                              const now = new Date()
                              const exp = new Date(details.key.expires_at)
                              const daysLeft = Math.ceil((exp - now) / (1000 * 60 * 60 * 24))
                              if (daysLeft > 0) {
                                return (
                                  <span className="ml-1 text-[10px] text-koz-muted">
                                    ({daysLeft} {daysLeft === 1 ? "dia" : "dias"} restantes)
                                  </span>
                                )
                              } else if (daysLeft === 0) {
                                return (
                                  <span className="ml-1 text-[10px] text-amber-400">
                                    (expira hoje)
                                  </span>
                                )
                              } else {
                                return (
                                  <span className="ml-1 text-[10px] text-red-400">
                                    (expirada há {Math.abs(daysLeft)}{" "}
                                    {Math.abs(daysLeft) === 1 ? "dia" : "dias"})
                                  </span>
                                )
                              }
                            })()}
                          </>
                        ) : (
                          "—"
                        )}
                      </div>
                      <div className="text-koz-muted">
                        Status: {details.key.is_used ? "Used" : "Unused"}
                      </div>
                      <div className="text-koz-muted">
                        Used by: {details.key.used_by ?? "—"}
                      </div>
                    </>
                  ) : (
                    <div className="text-koz-muted">
                      No activation key linked.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

