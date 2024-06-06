document.addEventListener('DOMContentLoaded', function () {
    // Lấy danh sách sinh viên từ localStorage khi trang tải
    let danhSachSinhVien = JSON.parse(localStorage.getItem('danhSachSinhVien')) || [];
    hienThiDanhSachSinhVien();

    // Xử lý sự kiện submit form
    document.getElementById('formSinhVien').addEventListener('submit', function (event) {
        event.preventDefault();
        themSinhVien();
    });

    // Hàm thêm sinh viên
    function themSinhVien() {
        const maSinhVien = document.getElementById('maSinhVien').value;
        const hoTen = document.getElementById('hoTen').value;
        const ngaySinh = document.getElementById('ngaySinh').value;
        const gioiTinh = document.querySelector('input[name="gioiTinh"]:checked').value;
        const diemToan = parseFloat(document.getElementById('diemToan').value);
        const diemLy = parseFloat(document.getElementById('diemLy').value);
        const diemHoa = parseFloat(document.getElementById('diemHoa').value);

        // Validate dữ liệu
        if (!maSinhVien || !hoTen || !ngaySinh || isNaN(diemToan) || isNaN(diemLy) || isNaN(diemHoa)) {
            alert('Vui lòng nhập đầy đủ và chính xác thông tin.');
            return;
        }

        const sinhVienMoi = {
            maSinhVien,
            hoTen,
            ngaySinh,
            gioiTinh,
            diemToan,
            diemLy,
            diemHoa
        };

        danhSachSinhVien.push(sinhVienMoi);
        localStorage.setItem('danhSachSinhVien', JSON.stringify(danhSachSinhVien));
        hienThiDanhSachSinhVien();
        document.getElementById('formSinhVien').reset();
    }

    // Hàm hiển thị danh sách sinh viên
    function hienThiDanhSachSinhVien() {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        danhSachSinhVien.forEach(function (sinhVien, index) {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.hoTen}</td>
                <td>${sinhVien.ngaySinh}</td>
                <td>${sinhVien.gioiTinh}</td>
                <td>${sinhVien.diemToan}</td>
                <td>${sinhVien.diemLy}</td>
                <td>${sinhVien.diemHoa}</td>
                <td>
                    <button onclick="suaSinhVien(${index})">Sửa</button>
                    <button onclick="xoaSinhVien(${index})">Xóa</button>
                </td>
            `;
        });
    }

    // Hàm sửa sinh viên 
    window.suaSinhVien = function (index) {
        // ... (Lấy thông tin sinh viên từ danhSachSinhVien và hiển thị lên form)
    };

    // Hàm xóa sinh viên
    window.xoaSinhVien = function (index) {
        if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
            danhSachSinhVien.splice(index, 1);
            localStorage.setItem('danhSachSinhVien', JSON.stringify(danhSachSinhVien));
            hienThiDanhSachSinhVien();
        }
    };
});
