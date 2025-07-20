import {Server} from '@modelcontextprotocol/sdk/server/index.js';
import {
    CallToolRequestSchema,
    ErrorCode,
    ListToolsRequestSchema,
    McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { CodebaseAnalyzer } from '../core/codebase-analyzer.js';
import config from '../config/index.js';
import { tools } from './tools.js';
import { handleTool } from './tool-handlers.js';

const analyzer = new CodebaseAnalyzer(config.codebasePath);

const server = new Server(
    {
        name: 'codebase-expert',
        version: '1.0.0',
    },
    {
        capabilities: {
            resources: {},
            tools: {},
        },
    }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const {name, arguments: args} = request.params;

    try {
        await analyzer.ensureIndexed();
        return await handleTool(name, args, analyzer);
    } catch (error) {
        if (error instanceof McpError) {
            throw error;
        }
        throw new McpError(ErrorCode.InternalError, error.message);
    }
});

export { server, analyzer };