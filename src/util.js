function getTime(date) {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function getWeekDate(date) {
    return new Date(date).toLocaleDateString([], {weekday:"long" ,day: "numeric", month: "long"})
}

function getFullDate(date) {
    return new Date(date).toLocaleDateString([], {day: "numeric", month: "long", year: "numeric"});
}

function hide(node) {
    const children = node.children;
    for(let i = 1; i < children.length; i++) {
        //console.log(child[i]);
        children[i].style.opacity = 0
    }
}

function show(node) {
    const children = node.children;
    for(let i = 1; i < children.length; i++) {
        children[i].style.opacity = 1;
    }
}

function startThrobber(...nodes) {
    nodes.forEach(node => {
        const loader = document.createElement("div");
        loader.classList.add("loader");
        hide(node);
        node.appendChild(loader);
    })
}

function endThrobber(...nodes) {
    nodes.forEach(node => {
        node.querySelector(".loader").remove();
        show(node);
    })
}

export {
    getTime,
    getWeekDate,
    getFullDate,
    hide,
    show,
    startThrobber,
    endThrobber
}