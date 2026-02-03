//src/components/userProfile/PreferencesPanel.tsx
"use client";

import { useState } from "react";

export default function PreferencesPanel() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <Toggle
        label="Push Notifications"
        description="Get alerts for new releases."
        value={notifications}
        onToggle={() => setNotifications(!notifications)}
      />

      <div>
        <label
          htmlFor="region-select"
          className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          Region
        </label>
        <select
          id="region-select"
          className="w-full mt-2 bg-zinc-900 border border-white/10 rounded-2xl p-4">
          <option>United States</option>
          <option>France</option>
        </select>
      </div>
    </div>
  );
}

function Toggle({ label, description, value, onToggle }: any) {
  return (
    <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl">
      <div>
        <h4 className="font-bold text-sm">{label}</h4>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>

      <button
        onClick={onToggle}
        className={`w-10 h-5 rounded-full ${
          value ? "bg-electric-cyan" : "bg-zinc-700"
        }`}>
        <span
          className={`block w-3 h-3 bg-white rounded-full transform transition ${
            value ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
