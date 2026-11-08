import { useSearchParams } from 'react-router';

import { sortOptions as defaultSortOptions } from '../utils/ideaOptions.js';
import {
    IDEAS_PER_PAGE,
    filterIdeas,
    getPageIdeas,
    getTotalPages,
    getValidPage,
    getValidSort,
    sortIdeas,
} from '../utils/ideaQuery.js';

export default function useIdeaFilters(ideas, sortOptions = defaultSortOptions) {

    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category') ?? '';
    const search = searchParams.get('q') ?? '';
    const sort = getValidSort(searchParams.get('sort'), sortOptions);
    const hasFilters = category !== '' || search !== '';

    // Списък, който се събира на една страница, няма нужда от филтри, освен ако някой вече е активен
    const showFilters = ideas.length > IDEAS_PER_PAGE || hasFilters;

    // Тук няма state. Всичко се изчислява от подадените идеи и от URL-а при всеки рендер
    const matchingIdeas = sortIdeas(filterIdeas(ideas, category, search), sort);
    const totalPages = getTotalPages(matchingIdeas.length);
    const currentPage = getValidPage(searchParams.get('page'), totalPages);
    const pageIdeas = getPageIdeas(matchingIdeas, currentPage);

    const filterChangeHandler = (name, value) => {
        setSearchParams((params) => {
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            // Новите филтри дават нов списък, затова започваме от първата му страница
            params.delete('page');

            return params;
        });
    };

    const pageChangeHandler = (page) => {
        setSearchParams((params) => {
            params.set('page', page);

            return params;
        });
       
        window.scrollTo(0, 0);
    };

    return {
        category,
        search,
        sort,
        hasFilters,
        showFilters,
        matchingIdeas,
        pageIdeas,
        currentPage,
        totalPages,
        filterChangeHandler,
        pageChangeHandler,
    };
}
