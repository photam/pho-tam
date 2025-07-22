const cartItemsDiv = document.getElementById('cart-items');
const cartTotalDiv = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = [];

// Hàm thêm món vào giỏ
function addToCart(productName, price) {
  // Kiểm tra xem món đã có trong giỏ chưa
  const existing = cart.find(item => item.name === productName);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  renderCart();
}

// Hàm hiển thị giỏ hàng
function renderCart() {
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Chưa có sản phẩm nào trong giỏ.</p>';
    cartTotalDiv.textContent = '';
    checkoutBtn.style.display = 'none';
    return;
  }

  let html = '<ul style="list-style: none; padding-left: 0;">';
  cart.forEach((item, index) => {
    html += `
      <li style="margin-bottom: 10px;">
        <strong>${item.name}</strong> - ${item.price.toLocaleString('vi-VN')}đ x ${item.quantity} = ${(item.price * item.quantity).toLocaleString('vi-VN')}đ
        <button onclick="removeFromCart(${index})" style="margin-left: 15px; padding: 3px 8px; font-size: 0.9rem;">Xóa</button>
      </li>
    `;
  });
  html += '</ul>';
  cartItemsDiv.innerHTML = html;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalDiv.textContent = 'Tổng tiền: ' + total.toLocaleString('vi-VN') + 'đ';
  checkoutBtn.style.display = 'inline-block';
}

// Hàm xóa món trong giỏ
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Xử lý nút Thanh Toán
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return alert('Giỏ hàng đang trống!');

  let orderSummary = 'Bạn có chắc muốn thanh toán các sản phẩm sau?\n\n';
  cart.forEach(item => {
    orderSummary += `${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString('vi-VN')}đ\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  orderSummary += `\nTổng tiền: ${total.toLocaleString('vi-VN')}đ`;

  if (confirm(orderSummary)) {
    alert('Cảm ơn bạn đã đặt hàng tại Phở Tâm Gia Truyền!');
    cart = [];
    renderCart();
  }
});

// Khởi tạo giỏ hàng khi load trang
document.addEventListener('DOMContentLoaded', renderCart);
