export default function DashboardStatCard({ title, value }) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
    </div>
  );
}
