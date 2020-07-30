const filter = () => {

    const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'),
        no = document.querySelector('.portfolio-no');

    const createListenersToBtn = (btnSelector, marksSelector) => {
        const btn = document.querySelector(btnSelector),
            marks = document.querySelectorAll(marksSelector);

        btn.addEventListener('click', () => {
            typeFilter(marks);
        });
    };

    createListenersToBtn('.portfolio-menu .all', '.portfolio-wrapper .all');
    createListenersToBtn('.portfolio-menu .lovers', '.portfolio-wrapper .lovers');
    createListenersToBtn('.portfolio-menu .chef', '.portfolio-wrapper .chef');
    createListenersToBtn('.portfolio-menu .girl', '.portfolio-wrapper .girl');
    createListenersToBtn('.portfolio-menu .guy', '.portfolio-wrapper .guy');
    createListenersToBtn('.portfolio-menu .grandmother', '.portfolio-no');
    createListenersToBtn('.portfolio-menu .granddad', '.portfolio-no');


    const typeFilter = (markType) => {
        markAll.forEach(elem => {
            elem.style.display = 'none';
            elem.classList.remove('animated', 'fadeIn');
        });

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        markType.forEach(elem => {
            elem.style.display = 'block';
            elem.classList.add('animated', 'fadeIn');
        });

    };

    menu.addEventListener('click', (e) => {
        let target = e.target;

        if(target && target.tagName == 'LI') {
            items.forEach(item => item.classList.remove('active'));
            target.classList.add('active');
        }
    });
};

export default filter;