const mask = selector => {

    let setCursorPosition = (pos, elem) => {  // Создаём функцию, которая принимает позицию и элемент на котором нужно установить крусор

        
        elem.focus(); // Устанавливаем курсор на элемент

        if(elem.setSelectionRange) { // Если браузер поддерживает функию, то используем её для установки курсора в нужную позицию
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) { // Если не поддерживает создаём полифил
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    function createMask(event) { // Функция принимающая событие
        let matrix = '+7 (___) ___ __ __', // матрица номера телефона
            i = 0,
            def = matrix.replace(/\D/g, ''), // вынимаем из матрицы все не числа
            val = this.value.replace(/\D/g, ''); // вынимаем из указаного инпута все не числа

        if (def.length >= val.length) {
            val = def;
        }


        this.value = matrix.replace(/./g, function(a) { // перебираем все символы в текущем инпуте
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type == 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });

};

export default mask;