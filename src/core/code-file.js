import crypto from 'crypto';

class CodeFile {
    constructor(filePath, content, language, size, lastModified) {
        this.path = filePath;
        this.content = content;
        this.language = language;
        this.size = size;
        this.lastModified = lastModified;
        this.hash = crypto.createHash('md5').update(content).digest('hex');
        this.functions = this.extractFunctions();
        this.classes = this.extractClasses();
        this.imports = this.extractImports();
        this.apiCalls = this.extractApiCalls();
        this.comments = this.extractComments();
    }

    calculateHash(content) {
        return crypto.createHash('md5').update(content).digest('hex');
    }

    extractFunctions() {
        const functions = [];
        if (['javascript', 'typescript'].includes(this.language)) {
            const regex =
                /(?:function\s+(\w+)|(\w+)\s*[:=]\s*(?:async\s+)?function|(?:async\s+)?(\w+)\s*\([^)]*\)\s*(?::\s*[^\{]+)?\s*=>|(?:async\s+)?function\s*\*?\s*(\w+))/g;
            let match;
            while ((match = regex.exec(this.content)) !== null) {
                const funcName = match[1] || match[2] || match[3] || match[4];
                if (funcName) functions.push(funcName);
            }
        }
        return functions;
    }

    extractClasses() {
        const classes = [];
        if (['javascript', 'typescript'].includes(this.language)) {
            const regex = /class\s+(\w+)/g;
            let match;
            while ((match = regex.exec(this.content)) !== null) {
                classes.push(match[1]);
            }
        }
        return classes;
    }

    extractImports() {
        const imports = [];
        if (['javascript', 'typescript'].includes(this.language)) {
            const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
            const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
            let match;
            while ((match = importRegex.exec(this.content)) !== null) imports.push(match[1]);
            while ((match = requireRegex.exec(this.content)) !== null) imports.push(match[1]);
        }
        return imports;
    }

    extractApiCalls() {
        const calls = [];
        const patterns = [
            /fetch\s*\(\s*['"`]?([^'"`\)]+)['"`]?/g,
            /axios\.\w+\s*\(\s*['"`]?([^'"`\)]+)['"`]?/g,
            /\.(get|post|put|delete)\s*\(\s*['"`]?([^'"`\)]+)['"`]?/g,
            /request\s*\(\s*['"`]?([^'"`\)]+)['"`]?/g,
            /https?:\/\/[^\s'"`\)]+/g,
        ];
        for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(this.content)) !== null) {
                calls.push(match[1] || match[0]);
            }
        }
        return [...new Set(calls)];
    }

    extractComments() {
        const comments = [];
        if (['javascript', 'typescript'].includes(this.language)) {
            let match;
            const singleLine = /\/\/\s*(.+)/g;
            const multiLine = /\/\*\s*([\s\S]*?)\s*\*\//g;
            while ((match = singleLine.exec(this.content)) !== null) comments.push(match[1].trim());
            while ((match = multiLine.exec(this.content)) !== null) comments.push(match[1].trim());
        }
        return comments;
    }
}

export { CodeFile };