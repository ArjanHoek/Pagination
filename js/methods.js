const methods = {
    createBtn: (text, isActive, cb) => {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.classList.add("pagination-btn");

        if (isActive) {
            btn.classList.add("pagination-btn--active");
        }

        btn.addEventListener("click", cb);

        return btn;
    },
    createEllipsis: () => {
        const ellipsisEl = document.createElement("span");
        ellipsisEl.classList.add("pagination-ellipsis");
        ellipsisEl.textContent = "...";
        return ellipsisEl;
    },
    append: (parent, ...children) =>
        children.forEach((child) => parent.appendChild(child)),
    setPage: (page, totalPages) => {
        if (page < 1 || page > totalPages) return;
        const { origin, pathname } = window.location;
        window.location = origin + pathname + `?page=${page}`;
    },
};
