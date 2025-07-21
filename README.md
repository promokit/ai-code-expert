![mcp_architecture_diagram](https://github.com/user-attachments/assets/bf85b192-1393-4d53-8341-2a9bf1c64053)# AI Code Expert

## Requirements

- **Node.js** version 18 or higher
- **npm** (comes with Node.js)

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/promokit/ai-code-expert.git
   cd codeexpert
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the MCP server:**
   ```sh
   npm start
   ```

The server will scan and index your codebase, then listen for MCP requests

## How It Works

This tool:

1. **Scans** a codebase directory and collects metadata:
   - Functions
   - Classes
   - Imports
   - Comments
   - API calls

2. **Indexes** the codebase and stores the data in a JSON file.

3. **Exposes** the index via an **MCP server** over `stdio` (standard input/output), allowing external clients (e.g., Claude) to query the data using well-defined tools.
   
![Uploading mcp_a<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1000" height="1000" fill="#f8f9fa"/>
  
  <!-- Query box - moved to left -->
  <rect x="20" y="40" width="320" height="100" rx="5" fill="#fff3e0" stroke="#f57c00" stroke-width="1"/>
  <text x="30" y="55" font-family="Arial, sans-serif" font-size="11" font-weight="bold">USER QUERY:</text>
  <text x="30" y="70" font-family="Arial, sans-serif" font-size="10">"Find all functions that use the axios</text>
  <text x="30" y="82" font-family="Arial, sans-serif" font-size="10">library for HTTP calls in my Node.js project"</text>
  <text x="30" y="100" font-family="Arial, sans-serif" font-size="11" font-weight="bold">MCP REQUEST:</text>
  <text x="30" y="115" font-family="Arial, sans-serif" font-size="10">{"method": "search", "params": {"query": "axios"}}</text>
  <text x="30" y="130" font-family="Arial, sans-serif" font-size="10">{"filter": "functions", "language": "javascript"}}</text>
  
  <!-- Client -->
  <rect x="400" y="50" width="200" height="80" rx="10" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
  <text x="500" y="75" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold">Client</text>
  <text x="500" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="12">(Claude Desktop / VSCode)</text>
  
  <!-- Arrow from Client to MCP Server -->
  <line x1="500" y1="130" x2="500" y2="180" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="530" y="160" font-family="Arial, sans-serif" font-size="12">MCP Request (JSON)</text>
  
  <!-- Server processing box - moved to left -->
  <rect x="20" y="200" width="300" height="80" rx="5" fill="#fff3e0" stroke="#f57c00" stroke-width="1"/>
  <text x="30" y="220" font-family="Arial, sans-serif" font-size="11" font-weight="bold">PROCESSING:</text>
  <text x="30" y="235" font-family="Arial, sans-serif" font-size="10">• Parse request parameters</text>
  <text x="30" y="250" font-family="Arial, sans-serif" font-size="10">• Validate query structure</text>
  <text x="30" y="265" font-family="Arial, sans-serif" font-size="10">• Route to CodebaseAnalyzer</text>
  
  <!-- MCP Server -->
  <rect x="400" y="200" width="200" height="80" rx="10" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
  <text x="500" y="240" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold">MCP Server</text>
  
  <!-- Arrow from MCP Server to CodebaseAnalyzer -->
  <line x1="500" y1="280" x2="500" y2="330" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  
  <!-- Analyzer processing notes - moved to left -->
  <rect x="20" y="340" width="350" height="100" rx="5" fill="#fff3e0" stroke="#f57c00" stroke-width="1"/>
  <text x="30" y="360" font-family="Arial, sans-serif" font-size="11" font-weight="bold">SCANNING:</text>
  <text x="30" y="375" font-family="Arial, sans-serif" font-size="10">• Recursively scan project directory</text>
  <text x="30" y="390" font-family="Arial, sans-serif" font-size="10">• Filter for .js, .ts files only</text>
  <text x="30" y="405" font-family="Arial, sans-serif" font-size="10">• Found: app.js, routes/api.js, services/http.js, utils/request.js</text>
  <text x="30" y="420" font-family="Arial, sans-serif" font-size="10">• Process each file for indexing</text>
  
  <!-- CodebaseAnalyzer -->
  <rect x="400" y="350" width="200" height="80" rx="10" fill="#e8f5e8" stroke="#388e3c" stroke-width="2"/>
  <text x="500" y="390" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold">CodebaseAnalyzer</text>
  
  <!-- Arrow and "For each file" label -->
  <line x1="500" y1="430" x2="500" y2="480" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="420" y="460" font-family="Arial, sans-serif" font-size="12">For each file</text>
  
  <!-- CodeFile processing notes - moved to left -->
  <rect x="20" y="490" width="350" height="120" rx="5" fill="#fff3e0" stroke="#f57c00" stroke-width="1"/>
  <text x="30" y="510" font-family="Arial, sans-serif" font-size="11" font-weight="bold">ANALYZING services/http.js:</text>
  <text x="30" y="525" font-family="Arial, sans-serif" font-size="10">• Functions: fetchUserData(), postAnalytics(), uploadFile()</text>
  <text x="30" y="540" font-family="Arial, sans-serif" font-size="10">• Classes: HttpClient, ResponseHandler</text>
  <text x="30" y="555" font-family="Arial, sans-serif" font-size="10">• Imports: const axios = require('axios'), import axios from 'axios'</text>
  <text x="30" y="570" font-family="Arial, sans-serif" font-size="10">• Comments: "HTTP client for external API calls"</text>
  <text x="30" y="585" font-family="Arial, sans-serif" font-size="10">• API calls: axios.get(), axios.post(), axios.put()</text>
  <text x="30" y="600" font-family="Arial, sans-serif" font-size="9" font-style="italic">✓ MATCH FOUND: Functions using 'axios'</text>
  
  <!-- CodeFile -->
  <rect x="400" y="500" width="200" height="80" rx="10" fill="#fff8e1" stroke="#fbc02d" stroke-width="2"/>
  <text x="500" y="540" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold">CodeFile</text>
  
  <!-- Arrow and "Index" label -->
  <line x1="500" y1="580" x2="500" y2="630" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="420" y="610" font-family="Arial, sans-serif" font-size="12">Index</text>
  
  <!-- Index content - moved to left -->
  <rect x="20" y="630" width="350" height="120" rx="5" fill="#fff3e0" stroke="#f57c00" stroke-width="1"/>
  <text x="30" y="650" font-family="Arial, sans-serif" font-size="11" font-weight="bold">INDEXED RESULTS:</text>
  <text x="30" y="665" font-family="Arial, sans-serif" font-size="9">services/http.js::fetchUserData() - uses axios.get()</text>
  <text x="30" y="680" font-family="Arial, sans-serif" font-size="9">services/http.js::postAnalytics() - uses axios.post()</text>
  <text x="30" y="695" font-family="Arial, sans-serif" font-size="9">routes/api.js::handleWebhook() - uses axios.post()</text>
  <text x="30" y="710" font-family="Arial, sans-serif" font-size="9">utils/request.js::makeRequest() - uses axios()</text>
  <text x="30" y="725" font-family="Arial, sans-serif" font-size="9">+ metadata: line numbers, parameters, return types</text>
  <text x="30" y="740" font-family="Arial, sans-serif" font-size="9" font-style="italic">Total matches: 4 functions across 3 files</text>
  
  <!-- Index -->
  <rect x="400" y="650" width="250" height="80" rx="10" fill="#fce4ec" stroke="#c2185b" stroke-width="2"/>
  <text x="525" y="680" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold">Index (in memory or</text>
  <text x="525" y="700" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold">codebase_index.json)</text>
  
  <!-- Arrow to Response -->
  <line x1="525" y1="730" x2="525" y2="780" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  
  <!-- Response content - moved to left -->
  <rect x="20" y="780" width="350" height="100" rx="5" fill="#fff3e0" stroke="#f57c00" stroke-width="1"/>
  <text x="30" y="800" font-family="Arial, sans-serif" font-size="11" font-weight="bold">JSON RESPONSE:</text>
  <text x="30" y="815" font-family="Arial, sans-serif" font-size="9">{"results": [</text>
  <text x="30" y="830" font-family="Arial, sans-serif" font-size="9">  {"file": "services/http.js", "function": "fetchUserData", "line": 15},</text>
  <text x="30" y="845" font-family="Arial, sans-serif" font-size="9">  {"file": "routes/api.js", "function": "handleWebhook", "line": 28},</text>
  <text x="30" y="860" font-family="Arial, sans-serif" font-size="9">  {"file": "utils/request.js", "function": "makeRequest", "line": 42}, ...</text>
  <text x="30" y="875" font-family="Arial, sans-serif" font-size="9">], "total_matches": 4}</text>
  
  <!-- Response -->
  <rect x="400" y="800" width="200" height="60" rx="10" fill="#e1f5fe" stroke="#0288d1" stroke-width="2"/>
  <text x="500" y="825" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold">Response</text>
  <text x="500" y="845" text-anchor="middle" font-family="Arial, sans-serif" font-size="12">(JSON)</text>
  
  <!-- Return arrow to Client -->
  <path d="M 650 830 Q 750 830 750 400 Q 750 90 600 90" fill="none" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="770" y="460" font-family="Arial, sans-serif" font-size="12" transform="rotate(90 770 460)">Structured Results</text>
  
  <!-- Final result box -->
  <rect x="650" y="40" width="320" height="100" rx="5" fill="#e8f5e8" stroke="#388e3c" stroke-width="1"/>
  <text x="660" y="55" font-family="Arial, sans-serif" font-size="11" font-weight="bold">CLIENT RECEIVES:</text>
  <text x="660" y="70" font-family="Arial, sans-serif" font-size="10">• 4 functions found using axios library</text>
  <text x="660" y="85" font-family="Arial, sans-serif" font-size="10">• Located in 3 different JavaScript files</text>
  <text x="660" y="100" font-family="Arial, sans-serif" font-size="10">• Complete with line numbers and context</text>
  <text x="660" y="115" font-family="Arial, sans-serif" font-size="10">• Ready for IDE navigation or AI analysis</text>
  <text x="660" y="130" font-family="Arial, sans-serif" font-size="9" font-style="italic">Query resolved in ~200ms</text>
  
  <!-- Arrow marker definition -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  
  <!-- Title -->
  <text x="500" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold">MCP Architecture: Finding Functions Using 'axios' Library (Node.js)</text>
</svg>rchitecture_diagram.svg…]()

---

## Server Capabilities

The server listens for requests to:

- 🔍 Search code
- 🔗 List or retrieve API calls
- 📊 Show stats about the codebase
- 📄 Read specific files
- ♻️ Force reindexing

---

## Example JSON Responses

### `search_code` Request

```json
{
  "query": "useState",
  "results": [
    {
      "file": "components/Header.jsx",
      "relevance": 15,
      "matches": ["Function: useState", "Content match"],
      "language": "javascript",
      "functions": ["useState", "handleClick"],
      "classes": []
    }
  ],
  "total": 1
}
```

### `find_api_calls` Request

```json
{
  "endpoint": "/api/users",
  "results": [
    {
      "file": "services/userService.js",
      "language": "javascript", 
      "apiCalls": ["https://api.example.com/users", "/api/users/profile"],
      "functions": ["fetchUsers", "updateUser"],
      "classes": ["UserService"]
    }
  ]
}
```

---

## Pattern Recognition

The pattern recognition system extracts and organizes code metadata, enabling Claude and other tools to:

- Understand code structure
- Track dependencies
- Detect API usage patterns

### Supported Function Declaration Styles

- Traditional:
  ```ts
  function myFunction() {}
  ```
- Function Expression:
  ```ts
  const myFunc = function() {}
  ```
- Arrow Function:
  ```ts
  const myFunc = () => {}
  ```
- Async Functions:
  ```ts
  async function myFunc() {}
  const myFunc = async () => {}
  ```
- Object Methods:
  ```ts
  myObj: function() {}
  myObj: () => {}
  ```
- TypeScript Typed:
  ```ts
  const myFunc = (x: string): number => {}
  ```

## Connecting to VS Code

To connect the MCP server to VS Code:

1. **Create and configure `mcp.json`:**
   - In your project, create a `.vscode` folder if it doesn't exist.
   - Inside `.vscode`, create a file named `mcp.json`.
   - Configure it to point to your MCP server. Example:
     ```json
     {
        "mcpServers": {
            "codebase-expert": {
                "command": "node",
                "args": ["path/to/server.js"],
                "env": {
                    "CODEBASE_PATH": "path/to/codebase",
                    "ALLOWED_DIRECTORIES": "path/to/codebase"
                }
            }
        }
    }
     ```

2. **List available MCP servers:**
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux) to open the Command Palette.
   - Type `List MCP Servers` and select it.

3. **Select and start your server:**
   - Choose "codebase-expert" from the list.
   - The server will start and connect to VS Code.

You can now interact with the MCP server from within VS Code.
