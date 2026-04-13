import { useState, useEffect } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

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
          onClick={() => setOpen(true)}
          className={`${btnClass} flex items-center gap-1 bg-accent text-accent-foreground hover:bg-accent/80`}
        >
          <Users className="w-3.5 h-3.5" />
          DS đã lưu ({list.length})
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

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0">
          <SheetHeader className="p-4 pb-2 border-b border-border">
            <SheetTitle className="text-base">Danh sách thụ hưởng</SheetTitle>
            <SheetDescription className="text-xs">
              Chọn đơn vị để tự động điền thông tin
            </SheetDescription>
          </SheetHeader>
          <div className="p-3 space-y-2 overflow-y-auto max-h-[calc(100vh-120px)]">
            {list.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Chưa có đơn vị thụ hưởng nào được lưu
              </p>
            ) : (
              list.map((b) => (
                <div
                  key={b.id}
                  className="group relative rounded-lg border border-border bg-card p-3 cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all"
                  onClick={() => {
                    onSelect(b);
                    setOpen(false);
                  }}
                >
                  <p className="text-sm font-semibold truncate pr-8">{b.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    TK: {b.soTaiKhoan}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {b.taiNHKB}{b.tinhTP ? ` — ${b.tinhTP}` : ""}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(b.id);
                    }}
                    className="absolute top-3 right-3 p-1 rounded text-destructive opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BeneficiarySelect;
