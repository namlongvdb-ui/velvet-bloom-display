import { useState, useEffect } from "react";
import { Plus, Trash2, Users } from "lucide-react";

export interface Beneficiary {
  id: string;
  name: string;
  soTaiKhoan: string;
  taiNHKB: string;
  tinhTP: string;
}

const STORAGE_KEY = "unc_beneficiaries";

const loadBeneficiaries = (): Beneficiary[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveBeneficiaries = (list: Beneficiary[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

interface BeneficiarySelectProps {
  onSelect: (b: Beneficiary) => void;
  currentName: string;
  currentAccount: string;
  currentBank: string;
  currentCity: string;
}

const BeneficiarySelect = ({
  onSelect,
  currentName,
  currentAccount,
  currentBank,
  currentCity,
}: BeneficiarySelectProps) => {
  const [list, setList] = useState<Beneficiary[]>(loadBeneficiaries);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    saveBeneficiaries(list);
  }, [list]);

  const handleSave = () => {
    if (!currentName.trim()) return;
    const existing = list.find(
      (b) => b.name === currentName && b.soTaiKhoan === currentAccount
    );
    if (existing) return;
    const newB: Beneficiary = {
      id: Date.now().toString(),
      name: currentName,
      soTaiKhoan: currentAccount,
      taiNHKB: currentBank,
      tinhTP: currentCity,
    };
    setList((prev) => [...prev, newB]);
  };

  const handleDelete = (id: string) => {
    setList((prev) => prev.filter((b) => b.id !== id));
  };

  const btnClass =
    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors";

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`${btnClass} flex items-center gap-1 bg-accent text-accent-foreground hover:bg-accent/80`}
        >
          <Users className="w-3.5 h-3.5" />
          DS Thụ hưởng ({list.length})
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!currentName.trim()}
          className={`${btnClass} flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50`}
        >
          <Plus className="w-3.5 h-3.5" />
          Lưu
        </button>
      </div>

      {open && (
        <div className="rounded-lg border border-border bg-card max-h-[200px] overflow-y-auto">
          {list.length === 0 ? (
            <p className="text-xs text-muted-foreground p-3 text-center">
              Chưa có người thụ hưởng nào
            </p>
          ) : (
            list.map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50 cursor-pointer border-b border-border last:border-b-0"
                onClick={() => {
                  onSelect(b);
                  setOpen(false);
                }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{b.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    TK: {b.soTaiKhoan} — {b.taiNHKB}{b.tinhTP ? `, ${b.tinhTP}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(b.id);
                  }}
                  className="text-destructive hover:text-destructive/80 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BeneficiarySelect;
