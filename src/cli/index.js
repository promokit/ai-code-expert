import 'dotenv/config';
import { server } from '../server/mcp-server.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Codebase Expert MCP Server running on stdio');
}

main().catch(console.error); 