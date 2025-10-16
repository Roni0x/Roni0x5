document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculatorForm');
    const quantityInput = document.getElementById('quantity');
    const quantityError = document.getElementById('quantityError');
    const resultDiv = document.getElementById('result');
    const productSelect = document.getElementById('product');
    
    
    const quantityRegex = /^[1-9][0-9]*$/;
    
    function validateQuantity() {
        const value = quantityInput.value.trim();
        
        if (value === '') {
            quantityError.textContent = 'Введите количество товара';
            return false;
        }
        
        if (!quantityRegex.test(value)) {
            quantityError.textContent = 'Введите корректное количество (только цифры, начинающиеся не с 0)';
            return false;
        }
        
        const quantity = parseInt(value);
        if (quantity > 100) {
            quantityError.textContent = 'Максимальное количество - 100 шт';
            return false;
        }
        
        quantityError.textContent = '';
        return true;
    }
    
    function calculateTotal() {
        const productPrice = parseFloat(productSelect.value);
        const quantity = parseInt(quantityInput.value.trim());
        
        if (!productPrice || !quantity) {
            resultDiv.textContent = 'Пожалуйста, заполните все поля корректно';
            resultDiv.className = 'result error';
            return;
        }
        
        const total = productPrice * quantity;
        const productName = productSelect.options[productSelect.selectedIndex].text.split(' - ')[0];
        
        resultDiv.innerHTML = `
            <div class="order-summary">
                <h3>Сводка заказа</h3>
                <div class="summary-item">Товар: ${productName}</div>
                <div class="summary-item">Количество: ${quantity} шт</div>
                <div class="summary-item">Цена за шт: ${productPrice.toLocaleString('ru-RU')} руб</div>
                <div class="summary-total">Общая стоимость: ${total.toLocaleString('ru-RU')} руб</div>
            </div>
        `;
        resultDiv.className = 'result success';
    }
    
    
    quantityInput.addEventListener('input', validateQuantity);
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateQuantity() && productSelect.value) {
            calculateTotal();
        } else if (!productSelect.value) {
            resultDiv.textContent = 'Пожалуйста, выберите товар';
            resultDiv.className = 'result error';
        }
    });
    
    // Инициализация
    quantityError.textContent = '';

});

