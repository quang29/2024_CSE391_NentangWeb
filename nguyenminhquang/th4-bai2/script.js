// Khi nhấn nút "Thêm sinh viên", mở modal và reset form
$('#addStudentBtn').click(function() {
    $('#formSinhVienModal').removeClass('hidden');
    $('#hoTen').val('');
    $('#maSV').val('');
    $('#ngaySinh').val('');
});

// Khi nhấn nút "Sửa", điền thông tin sinh viên vào form và mở modal
$(document).on('click', '.editBtn', function() {
    let maSV = $(this).data('masv');
    $.getJSON("data.json", function(data) {
        let selectedClass = $('#lop').val();
        let classData = data.find(lop => lop.tenLop === selectedClass);
        let student = classData.sinhVien.find(sv => sv.maSV === maSV);
        $('#hoTen').val(student.hoTen);
        $('#maSV').val(student.maSV);
        $('#ngaySinh').val(student.ngaySinh);
        $('#formSinhVienModal').removeClass('hidden');
    });
});

// Khi nhấn nút "Lưu", lưu thông tin sinh viên mới hoặc cập nhật sinh viên hiện tại
$('#saveBtn').click(function() {
    let hoTen = $('#hoTen').val();
    let maSV = $('#maSV').val();
    let ngaySinh = $('#ngaySinh').val();
    if (hoTen && maSV && ngaySinh) {
        let newStudent = { hoTen, maSV, ngaySinh };
        $.getJSON("data.json", function(data) {
            let selectedClass = $('#lop').val();
            let classData = data.find(lop => lop.tenLop === selectedClass);
            let studentIndex = classData.sinhVien.findIndex(sv => sv.maSV === maSV);
            if (studentIndex === -1) {
                classData.sinhVien.push(newStudent);
            } else {
                classData.sinhVien[studentIndex] = newStudent;
            }
            saveData(data);
            displayStudents(classData.sinhVien);
            $('#formSinhVienModal').addClass('hidden');
        });
    } else {
        alert('Vui lòng nhập đầy đủ thông tin!');
    }
});

// Khi nhấn nút "Xóa", xác nhận và xóa sinh viên
$(document).on('click', '.deleteBtn', function() {
    let maSV = $(this).data('masv');
    if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
        $.getJSON("data.json", function(data) {
            let selectedClass = $('#lop').val();
            let classData = data.find(lop => lop.tenLop === selectedClass);
            classData.sinhVien = classData.sinhVien.filter(sv => sv.maSV !== maSV);
            saveData(data);
            displayStudents(classData.sinhVien);
        });
    }
});

// Hàm lưu dữ liệu vào file JSON thông qua AJAX
function saveData(data) {
    $.ajax({
        url: 'save.php',
        method: 'POST',
        data: { data: JSON.stringify(data) },
        success: function(response) {
            alert('Dữ liệu đã được lưu.');
        },
        error: function() {
            alert('Lỗi khi lưu dữ liệu.');
        }
    });
}
