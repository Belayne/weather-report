function createElement(name, attr = {}) {
    const element = document.createElement(name);
    if(attr) {
        for(const [key, value] of Object.entries(attr)) {
            element.setAttribute(key, value);
        }
    }

    return element;
}

export {
    createElement
}