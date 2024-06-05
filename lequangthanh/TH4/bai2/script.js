$(document).ready(function() {
    let danhSachLop = {}; // Lưu trữ danh sách lớp và sinh viên
    let lopHienTai = null; // Lưu trữ lớp đang được chọn

    // Load data and populate dropdown
    $.getJSON("data.json", function(data) {
        danhSachLop = data;
        $.each(data, function(lop, sinhVien) {
            $("#lopSelect").append($("<option>", {
                value: lop,
                text: lop
            }));
        });
        lopHienTai = $("#lopSelect").val();
        hienThiSinhVien(); // Hiển thị sinh viên lớp đầu tiên
    });

    // Dropdown change event
    $("#lopSelect").change(function() {
        lopHienTai = $(this).val();
        hienThiSinhVien();
    });

    // Add student button click event
    $("#themSinhVienBtn").click(function() {
        $("#formContainer").removeClass("hidden");
        $("#formSinhVien")[0].reset(); // Reset form
        $("#formSinhVien").data("editingIndex", null); // Xóa dữ liệu đang sửa
    });

    // Form submit event (thêm hoặc sửa)
    $("#formSinhVien").submit(function(event) {
        event.preventDefault();
        const hoTen = $("#hoTen").val();
        const maSV = $("#maSV").val();
        const ngaySinh = $("#ngaySinh").val();

        // Validation
        if (hoTen === "" || maSV === "" || ngaySinh === "") {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        const editingIndex = $(this).data("editingIndex");
        if (editingIndex !== null) {
            // Sửa sinh viên
            danhSachLop[lopHienTai][editingIndex] = { hoTen, maSV, ngaySinh };
        } else {
            // Thêm sinh viên
            const sinhVienMoi = { hoTen, maSV, ngaySinh };
            danhSachLop[lopHienTai].push(sinhVienMoi);
        }

        luuDuLieu();
        hienThiSinhVien();
        $("#formContainer").addClass("hidden");
        $(this).removeData("editingIndex"); // Xóa dữ liệu đang sửa
    });
    
});
