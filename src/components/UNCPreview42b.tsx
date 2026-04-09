import vdbLogo from "@/assets/vdb-logo.jpg";
import type { UNCFormData } from "./InputPanel";

interface UNCPreview42bProps {
  data: UNCFormData;
}

const UNCPreview42b = ({ data }: UNCPreview42bProps) => {
  const val = (v: string, len = 30) =>
    v || <span className="text-gray-300">{"·".repeat(len)}</span>;

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-black mx-auto shadow-lg print:shadow-none"
      style={{ fontFamily: "'Times New Roman', serif", fontSize: "13px" }}
    >
      <div className="px-[15mm] py-[10mm] h-full flex flex-col">
        {/* Mẫu số */}
        <div className="text-right text-[11px] italic">Mẫu số: C42b-NHPT</div>

        {/* Title */}
        <div className="text-center -mt-0.5">
          <h1 className="text-[18px] font-bold tracking-[3px]">ỦY NHIỆM CHI</h1>
        </div>

        {/* Số UNC */}
        <div className="text-right -mt-5 text-[13px]">
          Số UNC: {val(data.soUNC, 12)}
        </div>

        {/* Logo + subtitle + date */}
        <div className="flex items-start mt-1">
          <div className="w-[75px] flex flex-col items-center">
            <img src={vdbLogo} alt="VDB" className="w-[56px] h-[56px] object-contain" />
            <span className="text-[8px] italic text-gray-400">Biểu tượng</span>
          </div>
          <div className="flex-1 text-center">
            <p className="text-[13px]">Chuyển khoản, chuyển tiền thư, điện</p>
            <p className="text-[13px] mt-1.5">
              Lập ngày: {val(data.ngay, 6)} tháng {val(data.thang, 6)} năm {val(data.nam, 8)}
            </p>
          </div>
          <div className="w-[75px]" />
        </div>

        {/* Main body */}
        <div className="flex mt-2">
          {/* Left: all fields */}
          <div className="flex-1 border border-black">
            <div className="border-b border-black px-2 py-[4px]">
              Đơn vị trả tiền: {val(data.donViTraTien, 55)}
            </div>
            <div className="border-b border-black px-2 py-[4px]">
              Số tài khoản: {val(data.soTaiKhoanTra, 60)}
            </div>
            <div className="border-b border-black px-2 py-[4px]">
              Tại NHPT tỉnh, TP: {val(data.taiNHPT, 50)}
            </div>
            <div className="border-b border-black px-2 py-[4px]">
              Đơn vị nhận tiền: {val(data.donViNhanTien, 53)}
            </div>
            <div className="border-b border-black px-2 py-[4px]">
              Số tài khoản: {val(data.soTaiKhoanNhan, 60)}
            </div>
            <div className="border-b border-black px-2 py-[4px]">
              Tại NH, KB: {val(data.taiNHKB, 25)}{"  "},tỉnh, TP: {val(data.tinhTP, 20)}
            </div>
            <div className="border-b border-black px-2 py-[4px]">
              Số tiền bằng chữ: {val(data.soTienBangChu, 53)}
            </div>
            <div className="px-2 py-[4px]">
              Nội dung thanh toán: {val(data.noiDungThanhToan, 49)}
            </div>
          </div>

          {/* Right: stacked boxes (no NH KBNN GHI for 42b) */}
          <div className="w-[155px] border-t border-r border-b border-black ml-[-1px]">
            {/* NHPT GHI */}
            <div className="border-b border-black px-2 py-1.5">
              <p className="font-bold text-center text-[12px]">NHPT GHI</p>
              <p className="text-center text-[11px] mt-0.5">
                {"·".repeat(5)}/{"·".repeat(5)}/{"·".repeat(7)}
              </p>
              <p className="text-[11px] mt-1">Nợ:{"·".repeat(20)}</p>
              <p className="text-[11px] mt-0.5">Có:{"·".repeat(20)}</p>
            </div>
            {/* SỐ TIỀN BẰNG SỐ */}
            <div className="px-2 py-1.5">
              <p className="font-bold text-center text-[12px]">SỐ TIỀN BẰNG SỐ</p>
              <p className="text-center text-[14px] font-bold mt-1 min-h-[22px]">
                {data.soTienBangSo || <span className="text-gray-300">*{"·".repeat(16)}*</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Signature section - with top border line */}
        <div className="flex border-t border-black mt-[-1px]">
          {/* Đơn vị trả tiền */}
          <div className="flex-1 border-r border-black px-2 py-1.5">
            <p className="font-bold text-[12px] text-center">Đơn vị trả tiền</p>
            <div className="flex justify-around mt-0.5">
              <div className="text-center">
                <p className="font-bold text-[11px]">Kế toán trưởng</p>
                <p className="text-[9px] italic text-gray-500">(Ký tên)</p>
                <div className="h-[60px]" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[11px]">Chủ tài khoản</p>
                <p className="text-[9px] italic text-gray-500">(Ký, đóng dấu)</p>
                <div className="h-[60px]" />
              </div>
            </div>
          </div>
          {/* Ngân hàng Phát triển */}
          <div className="flex-1 px-2 py-1.5">
            <p className="font-bold text-[12px] text-center">Ngân hàng Phát triển</p>
            <div className="flex justify-around mt-0.5">
              <div className="text-center">
                <p className="font-bold text-[11px]">Kế toán</p>
                <p className="text-[9px] italic text-gray-500">(Ký tên)</p>
                <div className="h-[60px]" />
              </div>
              <div className="text-center">
                <p className="font-bold text-[11px]">Kế toán trưởng</p>
                <p className="text-[9px] italic text-gray-500">(Ký, đóng dấu)</p>
                <div className="h-[60px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UNCPreview42b;
