import { router } from "../scripts/router";

export function createPaginationBlock(pagination) {
  const paginationBlock = document.getElementById("pagination");

  paginationBlock.innerHTML = "";

  const currentPage = pagination.current;
  const numberPages = pagination.count;

  if (numberPages === 0) {
    return;
  }

  const defaultRange = 9;
  let start = Math.max(1, currentPage - Math.floor(defaultRange / 2));
  let end = Math.min(start + defaultRange - 1, numberPages);

  if (end - start + 1 < defaultRange) {
    start = Math.max(1, end - defaultRange + 1);
  }

  end = Math.min(end, numberPages);
  start = Math.min(start, end);

  const toBegin = createPaginationElement("<<", 1);
  const toPrev = createPaginationElement("<", currentPage - 1);
  if (currentPage === 1) {
    toBegin.classList.add("disabled");
    toPrev.classList.add("disabled");
  }
  paginationBlock.appendChild(toBegin);
  paginationBlock.appendChild(toPrev);

  for (let i = start; i <= end; i++) {
    const toPage = createPaginationElement(i, i);
    if (i === currentPage) {
      toPage.classList.add("active");
    }
    paginationBlock.appendChild(toPage);
  }

  const toEnd = createPaginationElement(">>", numberPages);
  const toNext = createPaginationElement(">", currentPage + 1);
  if (currentPage === numberPages) {
    toEnd.classList.add("disabled");
    toNext.classList.add("disabled");
  }
  paginationBlock.appendChild(toNext);
  paginationBlock.appendChild(toEnd);
}

function createPaginationElement(display, pageNumber) {
  const page = document.createElement("li");
  page.classList.add("page-item");

  const link = document.createElement("a");
  link.textContent = display;
  link.classList.add("page-link");

  let newSearchParams = new URLSearchParams(window.location.search);
  newSearchParams.set("page", pageNumber);
  const path = window.location.pathname + "?" + newSearchParams.toString()

  link.addEventListener('click', e => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    router.resolve();
  });

  page.appendChild(link);
  return page;
}
