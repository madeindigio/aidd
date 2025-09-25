document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mcp-link-form');
    const openApiSpecUrlInput = document.getElementById('openapi-spec-url');
    const apiBaseUrlInput = document.getElementById('api-base-url');
    const headersContainer = document.getElementById('headers-container');
    const addHeaderBtn = document.getElementById('add-header-btn');
    const filtersContainer = document.getElementById('filters-container');
    const addFilterBtn = document.getElementById('add-filter-btn');
    const generatedUrlTextarea = document.getElementById('generated-url');
    const copyUrlBtn = document.getElementById('copy-url-btn');
    const fullUrlInput = document.getElementById('full-url-input');
    const loadFromUrlBtn = document.getElementById('load-from-url-btn');

    const baseUrl = 'https://mcplink.madeindigio.com/sse';

    function generateUrl() {
        const params = new URLSearchParams();

        const openApiSpecUrl = openApiSpecUrlInput.value.trim();
        if (openApiSpecUrl) {
            params.set('s', openApiSpecUrl);
        }

        const apiBaseUrl = apiBaseUrlInput.value.trim();
        if (apiBaseUrl) {
            params.set('u', apiBaseUrl);
        }

        const headers = {};
        const headerItems = headersContainer.querySelectorAll('.header-item');
        headerItems.forEach(item => {
            const name = item.querySelector('.header-name').value.trim();
            const value = item.querySelector('.header-value').value.trim();
            if (name && value) {
                headers[name] = value;
            }
        });

        if (Object.keys(headers).length > 0) {
            params.set('h', JSON.stringify(headers));
        }

        const filters = [];
        const filterInputs = filtersContainer.querySelectorAll('.filter-input');
        filterInputs.forEach(input => {
            const filter = input.value.trim();
            if (filter) {
                filters.push(filter);
            }
        });

        if (filters.length > 0) {
            params.set('f', filters.join(';'));
        }

        generatedUrlTextarea.value = `${baseUrl}?${params.toString()}`;
    }

    function addHeader(name = '', value = '') {
        const headerItem = document.createElement('div');
        headerItem.className = 'header-item';
        headerItem.innerHTML = `
            <input type="text" class="header-name" placeholder="Header Name" value="${name}">
            <input type="text" class="header-value" placeholder="Header Value" value="${value}">
            <button type="button" class="remove-header-btn">Remove</button>
        `;
        headersContainer.appendChild(headerItem);
        headerItem.querySelector('.remove-header-btn').addEventListener('click', () => {
            headerItem.remove();
            generateUrl();
        });
        headerItem.querySelectorAll('input').forEach(input => input.addEventListener('input', generateUrl));
    }

    function addFilter(value = '+/**') {
        const filterItem = document.createElement('div');
        filterItem.className = 'filter-item';
        filterItem.innerHTML = `
            <input type="text" class="filter-input" value="${value}">
            <button type="button" class="remove-filter-btn">Remove</button>
        `;
        filtersContainer.appendChild(filterItem);
        filterItem.querySelector('.remove-filter-btn').addEventListener('click', () => {
            filterItem.remove();
            generateUrl();
        });
        filterItem.querySelector('input').addEventListener('input', generateUrl);
    }

    function loadFromUrl() {
        const fullUrl = fullUrlInput.value.trim();
        if (!fullUrl) return;

        try {
            const url = new URL(fullUrl);
            const params = url.searchParams;

            openApiSpecUrlInput.value = params.get('s') || '';
            apiBaseUrlInput.value = params.get('u') || '';

            headersContainer.innerHTML = '';
            const h = params.get('h');
            if (h) {
                try {
                    const headers = JSON.parse(h);
                    for (const name in headers) {
                        addHeader(name, headers[name]);
                    }
                } catch (e) {
                    console.error('Error parsing headers:', e);
                }
            }

            filtersContainer.innerHTML = '';
            const f = params.get('f');
            if (f) {
                const filters = f.split(';');
                filters.forEach(filter => addFilter(filter));
            } else {
                addFilter();
            }

            generateUrl();
        } catch (e) {
            alert('Invalid URL');
            console.error('Error parsing URL:', e);
        }
    }

    addHeaderBtn.addEventListener('click', () => addHeader());
    addFilterBtn.addEventListener('click', () => addFilter(''));

    // Remove default filter before adding a new one
    const firstFilter = filtersContainer.querySelector('.remove-filter-btn');
    if (firstFilter) {
        firstFilter.addEventListener('click', () => {
            firstFilter.parentElement.remove();
            generateUrl();
        });
    }


    copyUrlBtn.addEventListener('click', () => {
        generatedUrlTextarea.select();
        document.execCommand('copy');
    });

    loadFromUrlBtn.addEventListener('click', loadFromUrl);

    form.addEventListener('input', generateUrl);

    // Initial setup
    generateUrl();
});