export default function StatCard({ text, amount }) {
  return (
    <div className="bg-gray-400 max-w-xs text-white p-3 shadow-xl rounded-md">
      <h1 className="text-2xl">
        {text}: {amount}
      </h1>
    </div>
  );
}
