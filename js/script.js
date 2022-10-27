const parent = document.querySelector(".pagination");

const settings = {
    innerWidth: 7, // Number of items between previous and next buttons (including ellipsis)
};

(() => {
    const { createBtn, append, setPage, createEllipsis } = methods;
    let { innerWidth } = settings;

    const totalPages = 12;

    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = +urlParams.get("page") || 1;

    (currentPage < 1 || currentPage > totalPages) && (currentPage = 1);

    const setPagination = () => {
        parent.innerHTML = "";

        innerWidth -= 2;

        const preCurrent = Math.floor((innerWidth - 2) / 2);

        const addStartEllipsis = currentPage - preCurrent > 2;
        const addEndEllipsis =
            currentPage - preCurrent + innerWidth <= totalPages;

        if (addStartEllipsis) {
            innerWidth -= 1;
        }

        if (addEndEllipsis) {
            innerWidth -= 1;
        }

        let max = totalPages;
        let start = Math.max(currentPage - preCurrent, 2);

        if (start + innerWidth > max) {
            while (start + innerWidth > max) {
                start--;
            }
        }

        append(
            parent,
            createBtn(
                "<",
                false,
                () => setPage(currentPage - 1, totalPages),
                (btn) => {
                    if (currentPage === 1) {
                        btn.classList.add("pagination-btn--disabled");
                    }
                }
            ),
            createBtn(1, 1 === currentPage, () => {
                setPage(1, totalPages);
            })
        );

        if (addStartEllipsis) {
            append(parent, createEllipsis());
        }

        for (let page = start; page <= start + innerWidth - 1; page++) {
            append(
                parent,
                createBtn(page, page === currentPage, () => {
                    setPage(page, totalPages);
                })
            );
        }

        if (addEndEllipsis) {
            append(parent, createEllipsis());
        }

        append(
            parent,
            createBtn(totalPages, totalPages === currentPage, () => {
                setPage(totalPages, totalPages);
            }),
            createBtn(
                ">",
                false,
                () => setPage(currentPage + 1, totalPages),
                (btn) => {
                    if (currentPage === totalPages) {
                        btn.classList.add("pagination-btn--disabled");
                    }
                }
            )
        );
    };

    setPagination();
})();
