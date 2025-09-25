document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO PARA FORMATEAR MONEDA (LA SOLUCIÓN) ---
    const inputs = document.querySelectorAll('.transaction-input');

    const formatCurrency = (inputElement) => {
        let value = inputElement.value;
        
        // 1. Quitar cualquier caracter que no sea un dígito o un punto decimal
        let numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));

        // 2. Si no es un número válido, dejar el campo vacío
        if (isNaN(numericValue)) {
            inputElement.value = '';
            return;
        }

        // 3. Formatear el número a estilo de moneda (USD en este caso, cambia 'en-US' a 'es-MX' si prefieres)
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        // Para evitar el símbolo de moneda dentro del input, podemos hacer un truco
        let parts = formatter.formatToParts(numericValue);
        let formattedValue = parts.map(part => {
            // Excluimos el símbolo de la moneda
            return part.type === 'currency' ? '' : part.value;
        }).join('').trim();
        
        inputElement.value = formattedValue;
    };

    inputs.forEach(input => {
        // Se formatea cuando el usuario deja de escribir en el campo (evento 'blur')
        input.addEventListener('blur', (e) => {
            if (e.target.value) { // Solo formatear si hay algo escrito
                 formatCurrency(e.target);
            }
        });

        // Opcional: Permitir solo números y punto decimal mientras se escribe
        input.addEventListener('input', (e) => {
            let originalValue = e.target.value;
            // Reemplaza cualquier caracter que no sea dígito o punto por una cadena vacía
            e.target.value = originalValue.replace(/[^0-9.]/g, '');
        });
    });

    // --- RESTO DE TU CÓDIGO (revisar, reiniciar, etc.) ---
    const revisarBtn = document.getElementById('revisarBtn');
    const reiniciarBtn = document.getElementById('reiniciarBtn');
    const toggleInstructionsBtn = document.getElementById('toggleInstructionsBtn');
    const instructionsContent = document.getElementById('instructionsContent');
    
    toggleInstructionsBtn.addEventListener('click', () => {
        const isHidden = instructionsContent.classList.contains('hidden');
        instructionsContent.classList.toggle('hidden');
        toggleInstructionsBtn.innerHTML = isHidden 
            ? '<i class="fa-solid fa-chevron-up"></i> Ocultar Instrucciones' 
            : '<i class="fa-solid fa-chevron-down"></i> Mostrar Instrucciones';
    });

    reiniciarBtn.addEventListener('click', () => {
        // Limpia todos los campos de entrada
        inputs.forEach(input => {
            input.value = '';
            input.classList.remove('correct', 'incorrect');
        });

        // Limpia los resultados
        document.getElementById('total_cargo').textContent = '';
        document.getElementById('total_abono').textContent = '';
        document.getElementById('saldo_final').textContent = '';
        document.getElementById('feedback-area').innerHTML = '';
        
        // Resetea el color de las celdas de resultado
        document.querySelectorAll('.result-cell').forEach(cell => {
             cell.style.backgroundColor = '';
        });
    });

    // La función de revisar se mantiene igual...
    revisarBtn.addEventListener('click', () => {
        // ... (Aquí va tu lógica para calcular y verificar los totales)
        // Por ejemplo:
        console.log("Revisando respuestas...");
    });
});
