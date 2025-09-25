import { useEffect, useState } from "react";
import { API_URL } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Entry = {
  id: number;
  signed_in_at: string;
  ip: string | null;
  user_agent: string | null;
  user_id: number;
  name: string;
  email: string;
  role: string;
};

export default function AdminEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/admin/entries`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j?.error || "Failed to load");
        setEntries(j.entries);
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Sign-in entries</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">Time</th>
                  <th className="py-2 pr-4">User</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">IP</th>
                  <th className="py-2 pr-4">User Agent</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} className="border-b last:border-0">
                    <td className="py-2 pr-4">{new Date(e.signed_in_at).toLocaleString()}</td>
                    <td className="py-2 pr-4">{e.name}</td>
                    <td className="py-2 pr-4">{e.email}</td>
                    <td className="py-2 pr-4">{e.ip || "-"}</td>
                    <td className="py-2 pr-4 max-w-[300px] truncate" title={e.user_agent || undefined}>{e.user_agent || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


