const cartItemsDiv = document.getElementById('cart-items');
const cartTotalDiv = document.getElementById('cart-total');
const orderForm = document.getElementById('order-form');
const orderDetailsInput = document.getElementById('order-details');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Chưa có sản phẩm nào trong giỏ.</p>';
    cartTotalDiv.textContent = '';
    orderForm.style.display = 'none';
    return;
  }

  let html = '<ul style="list-style:none; padding-left: 0;">';
  cart.forEach((item, index) => {
    html += `
      <li style="margin-bottom: 10px;">
        <strong>${item.name}</strong> - ${item.price.toLocaleString('vi-VN')}đ x ${item.quantity} = ${(item.price * item.quantity).toLocaleString('vi-VN')}đ
        <button onclick="removeFromCart(${index})" style="margin-left: 15px; padding: 3px 8px; font-size: 0.9rem; background-color:#d32f2f; color:white; border:none; cursor:pointer;">Xóa</button>
      </li>
    `;
  });
  html += '</ul>';
  cartItemsDiv.innerHTML = html;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalDiv.textContent = 'Tổng tiền: ' + total.toLocaleString('vi-VN') + 'đ';

  orderForm.style.display = 'block';
}

function addToCart(name, price) {
  let existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Đã thêm vào giỏ hàng!");
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

orderForm.addEventListener('submit', (e) => {
  if (cart.length === 0) {
    e.preventDefault();
    alert('Giỏ hàng đang trống!');
    return;
  }

  let orderText = 'Đơn hàng từ Phở Tâm Gia Truyền:\n\n';
  cart.forEach(item => {
    orderText += `${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString('vi-VN')}đ\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  orderText += `\nTổng tiền: ${total.toLocaleString('vi-VN')}đ`;

  orderDetailsInput.value = orderText;

  // Có thể reset giỏ hàng sau khi gửi
  setTimeout(() => {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }, 500); // đợi 0.5s để form gửi đi
});

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});
