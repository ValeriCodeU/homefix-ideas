export const IDEAS_PER_PAGE = 6;

const normalizeText = (text) => String(text ?? '').trim().toLowerCase();

const compareByNewest = (a, b) => b._createdOn - a._createdOn;

const compareByLikes = (a, b) => {
    if (a.likesCount !== b.likesCount) {
        return b.likesCount - a.likesCount;
    }

    // При равен брой харесвания по-новата идея е първа
    return compareByNewest(a, b);
};

const matchesSearch = (idea, searchText) => {
    if (normalizeText(idea.title).includes(searchText)) {
        return true;
    }

    return normalizeText(idea.materials).includes(searchText);
};

export const addLikesCount = (ideas, likes) => {
    const likesByIdea = {};

    likes.forEach(({ ideaId }) => {
        likesByIdea[ideaId] = (likesByIdea[ideaId] ?? 0) + 1;
    });

    return ideas.map((idea) => ({
        ...idea,
        likesCount: likesByIdea[idea._id] ?? 0,
    }));
};

export const filterIdeas = (ideas, category, search) => {
    const searchText = normalizeText(search);

    return ideas.filter((idea) => {
        if (category && idea.category !== category) {
            return false;
        }

        return matchesSearch(idea, searchText);
    });
};

export const sortIdeas = (ideas, sort) => {
    if (sort === 'likes') {
        return [...ideas].sort(compareByLikes);
    }

    // "Любими" вече са заредени в реда на харесванията
    if (sort === 'recentlyLiked') {
        return ideas;
    }

    return [...ideas].sort(compareByNewest);
};

export const getValidSort = (sort, options) => {
    const isKnownSort = options.some((option) => option.value === sort);

    if (isKnownSort) {
        return sort;
    }

    return options[0].value;
};

export const getTotalPages = (ideasCount) => Math.max(Math.ceil(ideasCount / IDEAS_PER_PAGE), 1);

export const getValidPage = (page, totalPages) => {
    const pageNumber = Number(page);

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
        return 1;
    }

    return Math.min(pageNumber, totalPages);
};

export const getPageIdeas = (ideas, page) => {
    const start = (page - 1) * IDEAS_PER_PAGE;

    return ideas.slice(start, start + IDEAS_PER_PAGE);
};
