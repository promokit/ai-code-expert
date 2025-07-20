# AI Code Expert

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

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`:
     ```sh
     cp .env.example .env
     ```
   - Edit `.env` and set the required values for your environment.

4. **Configure the codebase path:**
   - Open your `.env` file and set the `CODEBASE_PATH` variable to the directory you want to analyze.
   - Example:
     ```
     CODEBASE_PATH=/Users/yourname/projects/my
     ```

5. **Run the MCP server:**
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
