import { useEffect, useState } from "react";
import { API_URL } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Row = {
  user_id: number;
  name: string;
  email: string;
  role: string;
  age: number | null;
  locality: string | null;
  personalNotes: string | null;
  goals: string | null;
  updated_at: string | null;
};

export default function AdminProfiles() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/admin/profiles`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j?.error || "Failed to load");
        setRows(j.profiles);
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">User</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Role</th>
                  <th className="py-2 pr-4">Age</th>
                  <th className="py-2 pr-4">Locality</th>
                  <th className="py-2 pr-4">Goals</th>
                  <th className="py-2 pr-4">Updated</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.user_id} className="border-b last:border-0">
                    <td className="py-2 pr-4">{r.name}</td>
                    <td className="py-2 pr-4">{r.email}</td>
                    <td className="py-2 pr-4">{r.role}</td>
                    <td className="py-2 pr-4">{r.age ?? "-"}</td>
                    <td className="py-2 pr-4">{r.locality ?? "-"}</td>
                    <td className="py-2 pr-4 max-w-[300px] truncate" title={r.goals ?? undefined}>{r.goals ?? "-"}</td>
                    <td className="py-2 pr-4">{r.updated_at ? new Date(r.updated_at).toLocaleString() : "-"}</td>
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



