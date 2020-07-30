const modals = () => {

    let btnPressed = false;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {

        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        function openModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        }
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }

        trigger.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target) {
                    e.preventDefault();
                };

                btnPressed = true;

                if(destroy) {
                    elem.remove();
                };
                windows.forEach(elem => {
                    elem.classList.add('animated', 'fadeIn');
                    elem.style.display = 'none';
                });

                openModal();
            });
        });
        
        close.addEventListener('click', () => {
            windows.forEach(elem => {
                elem.style.display = 'none';
            });
            closeModal();
        });
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                windows.forEach(elem => {
                    elem.style.display = 'none';
                });
                closeModal();
            }
        });
    }

    function openModalByTime(selector, time) {
        setTimeout(function() {

            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if(getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });
            if(!display){
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            };
        }, time);
    };

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    };

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= 
                document.documentElement.scrollHeight)) {
                    document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    openModalByTime('.popup-consultation', 60000);
};

export default modals;