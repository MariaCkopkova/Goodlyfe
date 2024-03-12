function mobileNav() {
        const menyToggle = document.querySelector('#meny-toggle');
        const mobileMeny = document.querySelector('#header-meny')
        const bodyEI = document.body;
        if (menyToggle) {
                menyToggle.addEventListener('click', () => {
                        console.log("hi")
                        if (menyToggle.classList.contains('active')) {
                                menyToggle.classList.remove('active');
                                mobileMeny.classList.remove('active');
                                bodyEI.classList.remove('no-scroll');
                        } else {
                                menyToggle.classList.add('active');
                                mobileMeny.classList.add('active');
                                bodyEI.classList.add('no-scroll');
                        }
                });
        }
}
export default mobileNav;