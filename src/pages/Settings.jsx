export default function Settings() {
  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">
          Update basic configuration for your admin panel.
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-100 p-4 space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Application Name
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="My Admin Panel"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Default Language
          </label>
          <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>English</option>
            <option>Hindi</option>
            <option>Bengali</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input id="darkmode" type="checkbox" className="h-4 w-4" />
          <label htmlFor="darkmode" className="text-xs text-slate-600">
            Enable experimental dark mode (UI only)
          </label>
        </div>

        <button className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800">
          Save changes
        </button>
      </div>
    </div>
  );
}
