const scrolling = (upScrolling) => {

    const pageup = document.querySelector(upScrolling);

    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop > 1650) {
            pageup.classList.add('animated', 'fadeIn');
            pageup.classList.remove('fadeOut');
        } else {
            pageup.classList.add('fadeOut');
            pageup.classList.remove('fadeIn');
        }
    });

    // scrolling with raf

    
    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.2;
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });


    // Pure js scrolling
    // const elem = document.documentElement,
    //     body = document.body;

    // const calcScroll = () => {
    //     pageup.addEventListener('click', function(event) {
    //         let scrollTop = Math.round(body.scrollTop || elem.scrollTop);

    //         if(this.hash !== '') {
    //             event.preventDefault();
    //             let hashElement = document.getElementById(this.hash.substring(1)),
    //                 hashElementTop = 0;

    //             while (hashElement.offsetParent) {
    //                 hashElementTop += hashElement.offsetTop;
    //                 hashElement = hashElement.offsetParent;
    //             }

    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1,
    //         prevScrollTop,
    //         speed;
            
    //     if(to > from) {
    //         speed = 30;
    //     } else {
    //         speed = -30;
    //     }

    //     let move = setInterval(function() {
    //         let scrollTop = Math.round(body.scrollTop || elem.scrollTop);
        
    //         if(
    //             prevScrollTop === scrollTop ||
    //             (to > from && scrollTop >= to) ||
    //             (to < from && scrollTop <= to)
    //         ) {
    //             clearInterval(move);
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //         } else {
    //             body.scrollTop += speed;
    //             elem.scrollTop += speed;
    //             prevScrollTop = scrollTop;
    //         }

    //     }, timeInterval);
    // };
    // calcScroll();
};

export default scrolling;