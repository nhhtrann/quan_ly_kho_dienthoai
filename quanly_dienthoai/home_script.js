// Chức năng Đăng xuất
function logout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
        window.location.href = 'index.html'; 
    }
}

// Xử lý khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav li');
    const contentPanels = document.querySelectorAll('.content-panel');

    // Hàm để hiển thị một panel và ẩn các panel khác
    function showPanel(targetId) {
        contentPanels.forEach(panel => {
            panel.classList.remove('active-panel');
        });
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
            targetPanel.classList.add('active-panel');
        }
    }

    // Lắng nghe sự kiện click trên các mục sidebar để chuyển trang
    sidebarLinks.forEach(linkItem => {
        linkItem.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a

            // Loại bỏ lớp 'active' khỏi tất cả các liên kết sidebar
            sidebarLinks.forEach(item => item.classList.remove('active'));

            // Thêm lớp 'active' vào liên kết được click
            this.classList.add('active');

            // Lấy ID của panel cần hiển thị từ thuộc tính data-target
            const targetPanelId = this.dataset.target;
            showPanel(targetPanelId); // Gọi hàm để hiển thị panel
        });
    });

    // --- LOGIC CHO CHỨC NĂNG THÊM, XÓA SẢN PHẨM TRONG TRANG SẢN PHẨM ---

    const addProductBtn = document.querySelector('.action-btn.add-btn');
    const addProductModal = document.getElementById('addProductModal');
    const closeModalButtons = document.querySelectorAll('.close-button'); 
    const addProductForm = document.getElementById('addProductForm');
    const productTableBody = document.querySelector('#product-page-content .product-table-container tbody');

    // Mở modal khi nhấn nút "Thêm"
    // Đảm bảo nút "Thêm" thuộc trang sản phẩm mới mở modal
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            addProductModal.style.display = 'flex';
        });
    }

    // Đóng modal và reset form khi nhấn nút đóng (X hoặc Hủy bỏ)
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            addProductModal.style.display = 'none';
            addProductForm.reset(); // Reset form khi đóng modal
        });
    });

    // Đóng modal khi click ra ngoài vùng modal-content
    window.addEventListener('click', function(event) {
        if (event.target === addProductModal) {
            addProductModal.style.display = 'none';
            addProductForm.reset();
        }
    });

    // Xử lý submit form Thêm sản phẩm
    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn tải lại trang

        // Lấy dữ liệu từ form (CHỈ CÁC TRƯỜNG ĐƠN GIẢN)
        const newMaSP = document.getElementById('newMaSP').value;
        const newTenSP = document.getElementById('newTenSP').value;
        const newSoLuong = document.getElementById('newSoLuong').value;
        const newKichThuocMan = document.getElementById('newKichThuocMan').value;
        const newThuongHieu = document.getElementById('newThuongHieu').value;
        const newHeDieuHanh = document.getElementById('newHeDieuHanh').value;
        const newXuatXu = document.getElementById('newXuatXu').value;
        const newKhuVucKho = document.getElementById('newKhuVucKho').value;
        
        // Tạo một hàng mới cho bảng
        const newRow = productTableBody.insertRow();
        newRow.innerHTML = `
            <td>${newMaSP}</td>
            <td>${newTenSP}</td>
            <td>${newSoLuong}</td>
            <td>${newKichThuocMan}</td>
            <td>${newThuongHieu}</td>
            <td>${newHeDieuHanh}</td>
            <td>${newXuatXu}</td>
            <td>${newKhuVucKho}</td>
        `;

        // Đóng modal và reset form
        addProductModal.style.display = 'none';
        addProductForm.reset();

        alert('Đã thêm sản phẩm thành công (chỉ trên giao diện)!');
        // Ở đây bạn sẽ gửi dữ liệu lên server nếu có backend
    });

    // Xử lý nút "Xóa" sản phẩm
    const deleteProductBtn = document.querySelector('.action-btn.delete-btn');
    if (deleteProductBtn) {
        deleteProductBtn.addEventListener('click', function() {
            const maSPToDelete = prompt('Nhập Mã SP của sản phẩm muốn xóa:');
            if (maSPToDelete) {
                const rows = productTableBody.querySelectorAll('tr');
                let found = false;
                rows.forEach(row => {
                    const maSPInRow = row.cells[0].textContent; 
                    if (maSPInRow === maSPToDelete) {
                        if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm có Mã SP "${maSPToDelete}" không?`)) {
                            row.remove();
                            alert(`Sản phẩm có Mã SP "${maSPToDelete}" đã được xóa (chỉ trên giao diện)!`);
                            found = true;
                        }
                    }
                });
                if (!found) {
                    alert(`Không tìm thấy sản phẩm có Mã SP "${maSPToDelete}" để xóa.`);
                }
            } else if (maSPToDelete === null) {
                alert('Hủy bỏ thao tác xóa.');
            } else {
                alert('Vui lòng nhập Mã SP để xóa.');
            }
        });
    }
    
    // Xử lý các nút chức năng khác trong trang Sản phẩm (Sửa, Chi tiết, Export, Import)
    const otherProductActions = document.querySelectorAll('.product-actions .action-btn:not(.add-btn):not(.delete-btn)');
    otherProductActions.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            alert(`Bạn đã click vào chức năng: ${buttonText}`);
        });
    });

    // Xử lý nút "Làm mới" trong trang Sản phẩm
    const refreshButton = document.querySelector('#product-page-content .product-search .refresh-btn');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            alert('Làm mới dữ liệu!');
        });
    }

    // Đảm bảo trang "Trang chủ" hiển thị mặc định khi tải lần đầu
    // showPanel('homepage-content'); // Chỉ cần gọi nếu không có active-panel trong HTML ban đầu
});