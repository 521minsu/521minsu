
export default class ScrollLock {
    constructor() {
        this.lockedElement = document.getElementById("scrollLock");
        this.body = document.querySelector('body');
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        // console.log(rect);
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    update() {
        if ( this.isInViewport(this.lockedElement) ) { this.body.style.overflow = 'hidden';}
        else this.body.style.overflow = 'auto';
    }
}