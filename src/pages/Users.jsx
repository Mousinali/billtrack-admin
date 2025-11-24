const users = [
  { name: "Rahul Sharma", email: "rahul@example.com", role: "Admin", status: "Active" },
  { name: "Neha Patel", email: "neha@example.com", role: "Manager", status: "Pending" },
  { name: "Arjun Singh", email: "arjun@example.com", role: "User", status: "Active" },
  { name: "Priya Das", email: "priya@example.com", role: "User", status: "Suspended" },
];

export default function Users() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Users</h1>
          <p className="text-sm text-slate-500">
            Manage your platform users from here.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2">
          + Add User
        </button>
      </div>

      <div className="rounded-2xl bg-white border border-slate-100 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full sm:w-64 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Rows per page:</span>
            <select className="border border-slate-200 rounded-md px-2 py-1 text-xs">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs text-slate-500">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-b last:border-0 border-slate-50">
                  <td className="py-2 pr-4 text-slate-800">{u.name}</td>
                  <td className="py-2 pr-4 text-slate-500">{u.email}</td>
                  <td className="py-2 pr-4 text-slate-500">{u.role}</td>
                  <td className="py-2 pr-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        u.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : u.status === "Pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-right space-x-2">
                    <button className="text-xs text-indigo-600 hover:underline">
                      Edit
                    </button>
                    <button className="text-xs text-rose-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fake pagination */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
          <span>Showing 1–4 of 4 users</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded-md border border-slate-200">
              ◀
            </button>
            <button className="px-2 py-1 rounded-md bg-slate-900 text-white">
              1
            </button>
            <button className="px-2 py-1 rounded-md border border-slate-200">
              2
            </button>
            <button className="px-2 py-1 rounded-md border border-slate-200">
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
