import path from 'path';
import fs from 'fs/promises';

import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { buildTextResponse } from './utils.js';

export async function handleTool(name, args, analyzer) {
    switch (name) {
        case 'search_code': {
            const searchResults = analyzer.searchFiles(args.query);
            return buildTextResponse({
                query: args.query,
                results: searchResults.slice(0, 20),
                total: searchResults.length,
            });
        }
        case 'find_api_calls': {
            const apiResults = analyzer.findApiCalls(args.endpoint);
            return buildTextResponse({
                endpoint: args.endpoint,
                results: apiResults,
                total: apiResults.length,
            });
        }
        case 'analyze_codebase': {
            const stats = analyzer.getCodebaseStats();
            return buildTextResponse(stats);
        }
        case 'reindex_codebase': {
            await analyzer.scanCodebase();
            return buildTextResponse('Codebase reindexed successfully', false);
        }
        case 'get_file_content': {
            const filePath = path.join(analyzer.codebasePath, args.filePath);
            try {
                const content = await fs.readFile(filePath, 'utf8');
                return buildTextResponse(content, false);
            } catch (error) {
                throw new McpError(
                    ErrorCode.InternalError, `Could not read file: ${error.message}`
                );
            }
        }
        default:
            throw new McpError(
                ErrorCode.MethodNotFound, `Unknown tool: ${name}`
            );
    }
}