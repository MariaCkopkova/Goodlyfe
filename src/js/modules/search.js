function searchForm() {
        const headerSearchOpen = document.querySelector('#searh-open');
        const headerSerchForm = document.querySelector('#header-search-form');


        headerSearchOpen.addEventListener('click', () => {
                console.log('hi!!')
                headerSerchForm.classList.toggle('search-form--open');
        })
}
export default searchForm;