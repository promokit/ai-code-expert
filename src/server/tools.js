export const tools = [
    {
        name: 'search_code',
        description: 'Search for code, functions, classes, or content in the codebase',
        inputSchema: {
            type: 'object',
            properties: {
                query: {
                    type: 'string',
                    description: 'Search query (function name, class name, keyword, etc.)',
                },
            },
            required: ['query'],
        },
    },
    {
        name: 'find_api_calls',
        description: 'Find all API calls and endpoints in the codebase',
        inputSchema: {
            type: 'object',
            properties: {
                endpoint: {
                    type: 'string',
                    description: 'API endpoint or URL pattern to search for',
                },
            },
            required: ['endpoint'],
        },
    },
    {
        name: 'analyze_codebase',
        description: 'Get overall statistics and information about the codebase',
        inputSchema: {
            type: 'object',
            properties: {},
        },
    },
    {
        name: 'reindex_codebase',
        description: 'Force reindexing of the codebase (use when files have changed)',
        inputSchema: {
            type: 'object',
            properties: {},
        },
    },
    {
        name: 'get_file_content',
        description: 'Get the full content of a specific file',
        inputSchema: {
            type: 'object',
            properties: {
                filePath: {
                    type: 'string',
                    description: 'Relative path to the file',
                },
            },
            required: ['filePath'],
        },
    },
];