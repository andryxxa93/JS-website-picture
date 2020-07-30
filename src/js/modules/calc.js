const calc = (size, material, options, promocode, result, state) => {

    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

        let sum = 0;

        const calcFunction = (e) => {
          sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));
          if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины!';
          } else if (promocodeBlock.value === 'IWANTPOPART') {
              resultBlock.textContent = Math.round(sum - (sum / 100 * 30)) + ' рублей';
          } else {
              resultBlock.textContent = sum  + ' рублей';
          }

          function changeOptionState() {
              if(e.target.getAttribute('id')) {
                state[e.target.getAttribute('id')] = e.target.selectedIndex;
              }
              state['total'] = resultBlock.textContent;
          }
          changeOptionState();

        };

        sizeBlock.addEventListener('change', calcFunction);
        materialBlock.addEventListener('change', calcFunction);
        optionsBlock.addEventListener('change', calcFunction);
        promocodeBlock.addEventListener('input', calcFunction);

};

export default calc;