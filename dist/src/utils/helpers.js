export const genUUID = () => {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
};
export const addElement = (parent, tag, options) => {
    const element = document.createElement(tag);
    if (options)
        Object.assign(element, options);
    parent.appendChild(element);
    return element;
};
export const formatPrice = (price) => {
    return (Math.round(price / 1000)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽');
};
