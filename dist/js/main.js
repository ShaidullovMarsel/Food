window.addEventListener('DOMContentLoaded', () => {

    ///Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
          

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click', () => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });

    ///Timer

    const deadline = '2024-05-20';

    function getTimerRemaining(endtime) {

        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0 ){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }
            
    return {
        'total' : t,
        'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
    };
}

    function getZeroDown(num) {
        if (num >= 0 && num <10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

            updateClock();

        function updateClock() {
            const t = getTimerRemaining(endtime);

            days.innerHTML = getZeroDown(t.days);
            hours.innerHTML = getZeroDown(t.hours);
            minutes.innerHTML = getZeroDown(t.minutes);
            seconds.innerHTML = getZeroDown(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
}
    setClock('.timer', deadline);


    ///Modal

    const btnTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          btnClose = document.querySelector('.modal__close');


    btnTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            //modal.style.display = 'block';
            modal.classList.add('show');
            modal.classList.remove('fade');
            document.body.style.overflow = 'hidden';
        });
    });
    
    function closeModal(){
        modal.classList.add('fade');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    btnClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    })
});