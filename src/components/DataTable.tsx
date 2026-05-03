import { useState } from "react";

interface ColumnDef<T> {
  key: keyof T;
  label: string;
}

interface DataTableProps<T extends { id: string | number }> {
  data: T[];
  columns: ColumnDef<T>[];
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
}: DataTableProps<T>) {
  const [editando, setEditando] = useState<Partial<T> | null>(null);
  const [idEditando, setIdEditando] = useState<string | number | null>(null);

  function iniciarEdicion(fila: T) {
    setIdEditando(fila.id);
    setEditando({ ...fila });
  }

  function cancelarEdicion() {
    setIdEditando(null);
    setEditando(null);
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f3f4f6" }}>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                style={{ padding: "8px 12px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}
              >
                {col.label}
              </th>
            ))}
            <th style={{ padding: "8px 12px", borderBottom: "2px solid #e5e7eb" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fila) => (
            <tr key={fila.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
              {columns.map((col) => (
                <td key={String(col.key)} style={{ padding: "8px 12px" }}>
                  {idEditando === fila.id ? (
                    <input
                      value={String(editando?.[col.key] ?? "")}
                      onChange={(e) =>
                        setEditando((prev) => ({
                          ...prev,
                          [col.key]: e.target.value,
                        }))
                      }
                      style={{ border: "1px solid #d1d5db", borderRadius: "4px", padding: "4px" }}
                    />
                  ) : (
                    String(fila[col.key])
                  )}
                </td>
              ))}
              <td style={{ padding: "8px 12px" }}>
                {idEditando === fila.id ? (
                  <button onClick={cancelarEdicion} style={{ marginLeft: "4px" }}>
                    Cancelar
                  </button>
                ) : (
                  <button onClick={() => iniciarEdicion(fila)}>Editar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}