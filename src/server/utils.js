export function buildTextResponse(data, pretty = true) {
    return {
        content: [
            {
                type: 'text',
                text: pretty && typeof data !== 'string'
                    ? JSON.stringify(data, null, 2)
                    : String(data),
            },
        ],
    };
};
