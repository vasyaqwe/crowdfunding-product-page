const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.btn--menu');
const bookmarkBtnExpanded = document.querySelector('.btn--bookmark--expanded');
const bookmarkBtn = document.querySelector('.btn--bookmark');
const modal = document.querySelector('.modal');
const btnBack = document.querySelector('.btn--back');
const modalClose = document.querySelector('.modal-close');
const submitBtns = document.querySelectorAll('.btn--submit');
const selectBtns = document.querySelectorAll('.btn--select');
const radios = document.querySelectorAll('input[type=radio]');
const submitSections = document.querySelectorAll('.modal__section--submit');
const forms = document.querySelectorAll('form');
const modalSections = document.querySelectorAll('.modal__section');
const totalBacked = document.querySelector('.totalBacked');
const totalBackers = document.querySelector('.totalBackers');
const inputs = document.querySelectorAll('#input');
const modalThanks = document.querySelector('.modal--thanks');
const gotItBtn = document.querySelector('.btn--gotit');
const progressBar = document.querySelector('.progressbar');

const stands = document.querySelectorAll('.stand');
const standsBamboo = document.querySelectorAll('.stand-bamboo');
const standsBlackEd = document.querySelectorAll('.stand-blackEd');

setLsItems();
moveProgressBar();
addStylesToModalSections();
incrementTotalBacked();
addStylesOnSelectBtns();

//navbar functionality//
navToggle.addEventListener('click', () => {
    const attribute = nav.getAttribute('data-visible');
    if (attribute === 'false') {
        navToggle.setAttribute('aria-expanded', true);
        nav.setAttribute('data-visible', true);
        navToggle.firstChild.src = "/icon-close-menu.36610790.svg";
        overlay = document.createElement('span');
        document.body.appendChild(overlay);
        overlay.classList.add('dim');

    } else if (attribute === 'true') {
        navToggle.setAttribute('aria-expanded', false);
        nav.setAttribute('data-visible', false);
        navToggle.firstChild.src = "/icon-hamburger.4d46a600.svg";

        document.body.prepend(overlay);
        document.body.removeChild(document.querySelector('.dim'));
    }
})
//navbar functionality//


//bookmark functionality//
bookmarkBtnExpanded.addEventListener('click', () => {
    const attribute = bookmarkBtnExpanded.getAttribute('aria-checked');
    if (attribute === 'false') {
        bookmarkBtnExpanded.setAttribute('aria-checked', true);
        bookmarkBtnExpanded.innerText = 'Bookmarked';
        bookmarkBtn.setAttribute('aria-checked', true);
        bookmarkBtn.firstChild.src = '/icon-bookmarked.f1924f78.png'
        document.documentElement.style.setProperty('--url', 'url(' + '/icon-bookmarked.f1924f78.png' + ')');
        localStorage.setItem('bookmarked', 'true');
    } else if (attribute === 'true') {
        bookmarkBtnExpanded.setAttribute('aria-checked', false);
        bookmarkBtnExpanded.innerText = 'Bookmark';
        bookmarkBtn.setAttribute('aria-checked', false);
        bookmarkBtn.firstChild.src = '/icon-bookmark.65361ce2.svg'
        document.documentElement.style.setProperty('--url', 'url(' + '/icon-bookmark.65361ce2.svg' + ')');
        localStorage.setItem('bookmarked', 'false');
    }
})
bookmarkBtn.addEventListener('click', () => {
    const attribute = bookmarkBtn.getAttribute('aria-checked');
    if (attribute === 'false') {
        bookmarkBtn.setAttribute('aria-checked', true);
        bookmarkBtn.firstChild.src = '/icon-bookmarked.f1924f78.png'
        document.documentElement.style.setProperty('--url', 'url(' + '/icon-bookmarked.f1924f78.png' + ')');
        localStorage.setItem('bookmarked', 'true');
        bookmarkBtnExpanded.setAttribute('aria-checked', true);
        bookmarkBtnExpanded.innerText = 'Bookmarked';
    } else if (attribute === 'true') {
        bookmarkBtn.setAttribute('aria-checked', false);
        bookmarkBtnExpanded.setAttribute('aria-checked', false);
        bookmarkBtnExpanded.innerText = 'Bookmark';
        bookmarkBtn.firstChild.src = '/icon-bookmark.65361ce2.svg'
        document.documentElement.style.setProperty('--url', 'url(' + '/icon-bookmark.65361ce2.svg' + ')');
        localStorage.setItem('bookmarked', 'false');
    }

})
//bookmark functionality//


//show/hide modals//
btnBack.addEventListener('click', () => modal.showModal())
modalClose.addEventListener('click', () => modal.close());
gotItBtn.addEventListener('click', () => modalThanks.close());
//show/hide modals//


//append total backers on first form submit//
submitBtns[0].addEventListener('click', () => {
    modal.close();
    modalThanks.showModal();
    incrementTotalBackers();
});
//append total backers on first form submit//

for (let i = 0, j = 1; i < inputs.length, j < submitBtns.length; i++, j++) {
    submitBtns[j].addEventListener('click', () => {
        if (inputs[i].value > 0 && inputs[i].value <= 100000) {
            modal.close();
            modalThanks.showModal();
            incrementTotalBackers();
            decrementStandsQty(stands[i]);
            localStorage.setItem(`stands${[i]}`, stands[i].innerText);
        }
    })
}

//add styles when clicking "Select Reward" button//
function addStylesOnSelectBtns() {
    for (let i = 0, j = 1; i < selectBtns.length, j < radios.length - 1; i++, j++) {
        selectBtns[i].addEventListener('click', () => {
            modal.showModal();
            removeSectionStyles();
            radios[j].checked = true;
            submitSections[j].setAttribute('data-visible', true);
            modalSections[j].classList.add('active');
        })
    }
}
//add styles when clicking "Select Reward" button//




//add styles when clicking radio buttons//
function addStylesToModalSections() {
    for (let i = 0, j = 0; i < radios.length, j < submitSections.length; i++, j++) {
        radios[i].checked = false;
        radios[i].addEventListener('change', () => {
            removeSectionStyles();
            if (radios[i].checked === true) {
                submitSections[j].setAttribute('data-visible', true);
                modalSections[j].classList.add('active');

            }
        })
    }
}
//add styles when clicking radio buttons//
function incrementTotalBacked() {
    for (let i = 1, j = 0; i < forms.length, j < inputs.length; i++, j++) {
        forms[i].addEventListener('submit', (e) => {
            e.preventDefault();
            let totalBackedNum = +totalBacked.innerText;
            const resultNum = totalBackedNum += +inputs[j].value;
            if (totalBackedNum <= 100000) {
                totalBacked.innerText = `${resultNum}`;
                moveProgressBar();
                localStorage.setItem('backed', resultNum);
            } else {
                totalBacked.innerText = `${100000}`;
                localStorage.setItem('backed', 100000);
                moveProgressBar();
            }
        })
    }
}
function setLsItems() {
    const backers = localStorage.getItem('backers');
    const backed = localStorage.getItem('backed');
    const bookmarked = localStorage.getItem('bookmarked');
    const stands0 = localStorage.getItem('stands0');
    const stands1 = localStorage.getItem('stands1');
    if (backers) {
        totalBackers.innerText = `${backers}`;
    }
    if (backed) {
        totalBacked.innerText = `${backed}`;
    }
    if (bookmarked && bookmarked === 'true') {
        bookmarkBtn.firstChild.src = '/icon-bookmarked.f1924f78.png'
        document.documentElement.style.setProperty('--url', 'url(' + '/icon-bookmarked.f1924f78.png' + ')');
        bookmarkBtnExpanded.innerText = 'Bookmarked';
    }
    if (stands0) {
        standsBamboo.forEach(standBamboo => {
            standBamboo.innerText = `${stands0}`
        })
    }
    if (stands1) {
        standsBlackEd.forEach(standBlackEd => {
            standBlackEd.innerText = `${stands1}`
        })
    }
}
const incrementTotalBackers = () => {
    let totalBackersNum = +totalBackers.innerText;
    totalBackersNum++;
    totalBackers.innerText = `${totalBackersNum}`;
    localStorage.setItem('backers', totalBackersNum);
}
const decrementStandsQty = (stands) => {
    let standsNum = +stands.innerText;
    standsNum--;
    stands.innerText = `${standsNum}`;
}
function removeSectionStyles() {
    submitSections.forEach(section => {
        section.setAttribute('data-visible', false);
    })
    modalSections.forEach(section => {
        section.classList.remove('active');
    })

}
function moveProgressBar() {
    const totalBackedNum = +totalBacked.innerText;
    setTimeout(() => {
        progressBar.style.width = `${totalBackedNum / 1000}%`;
    }, 1200);
}

