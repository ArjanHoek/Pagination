const methods = {
    createBtn: (text, isActive, eventCallback, elementAction) => {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.classList.add("pagination-btn");

        if (isActive) {
            btn.classList.add("pagination-btn--active");
        }

        if (typeof elementAction === "function") {
            elementAction(btn);
        }

        btn.addEventListener("click", eventCallback);

        return btn;
    },
    createEllipsis: (content) => {
        const ellipsisEl = document.createElement("span");
        ellipsisEl.classList.add("pagination-ellipsis");
        ellipsisEl.textContent = content || "...";
        return ellipsisEl;
    },
    append: (parent, ...children) =>
        children.forEach((child) => parent.appendChild(child)),
    setPage: (page, totalPages) => {
        if (page < 1 || page > totalPages) return;
        const { origin, pathname } = window.location;
        window.location = origin + pathname + `?page=${page}`;
    },
    calcDefaultPreCurrent: (innerWidth) => Math.floor((innerWidth - 2) / 2),
};
