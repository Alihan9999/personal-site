import { personaStatusRow } from '../../data';

const columns = [
  { key: 'name', label: 'NAME' },
  { key: 'role', label: 'ROLE' },
  { key: 'status', label: 'STATUS' },
  { key: 'tenure', label: 'TENURE' },
  { key: 'focus', label: 'FOCUS' },
];

export function StatusBoard() {
  const row = personaStatusRow;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse font-mono text-sm">
        <thead>
          <tr className="text-left text-[0.7rem] uppercase tracking-[0.16em] text-slate-500 light:text-slate-500">
            {columns.map((col) => (
              <th key={col.key} className="py-2 pr-6 font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-white/10 light:border-slate-200/80">
            {columns.map((col) => {
              const value = row[col.key];
              const isStatus = col.key === 'status';
              return (
                <td
                  key={col.key}
                  className={`py-3 pr-6 ${
                    isStatus
                      ? 'text-phosphor-400'
                      : col.key === 'name'
                        ? 'text-amber-400'
                        : 'text-slate-200 light:text-ink-700'
                  }`}
                >
                  {value}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
