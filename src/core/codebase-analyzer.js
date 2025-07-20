import fs from 'fs/promises';
import path from 'path';

import { IGNORE_PATTERNS, SUPPORTED_EXTENSIONS } from '../config/constants.js';
import { CodeFile } from './code-file.js';

class CodebaseAnalyzer {
    constructor(codebasePath) {
        this.codebasePath = codebasePath;
        this.index = null;
    }

    async shouldIgnoreFile(filePath) {
        const relativePath = path.relative(this.codebasePath, filePath);
        return IGNORE_PATTERNS.some((pattern) => {
            if (pattern.includes('*')) {
                const regex = new RegExp(pattern.replace(/\*/g, '.*'));
                return regex.test(relativePath);
            }
            return relativePath.includes(pattern);
        });
    }

    async scanCodebase() {
        console.log(`Scanning codebase at: ${this.codebasePath}`);
        const files = {};
        let totalFiles = 0;
        let totalLines = 0;
        const languages = {};

        await this.walkDirectory(this.codebasePath, async (filePath, stats) => {
            if (await this.shouldIgnoreFile(filePath)) {
                return;
            }

            const ext = path.extname(filePath).toLowerCase();
            const language = SUPPORTED_EXTENSIONS[ext];

            if (!language) {
                return;
            }

            try {
                const content = await fs.readFile(filePath, 'utf8');
                const lines = content.split('\n').length;

                const codeFile = new CodeFile(
                    path.relative(this.codebasePath, filePath),
                    content,
                    language,
                    stats.size,
                    stats.mtime.getTime()
                );

                files[codeFile.path] = codeFile;
                totalFiles++;
                totalLines += lines;
                languages[language] = (languages[language] || 0) + 1;

                console.log(`Analyzed: ${codeFile.path} (${language})`);
            } catch (error) {
                console.error(`Error reading file ${filePath}:`, error.message);
            }
        });

        this.index = {
            files,
            lastUpdated: Date.now(),
            totalFiles,
            totalLines,
            languages,
            codebasePath: this.codebasePath,
        };

        await this.saveIndex();
        console.log(`Codebase analysis complete: ${totalFiles} files, ${totalLines} lines`);
        return this.index;
    }

    async walkDirectory(dir, callback) {
        const entries = await fs.readdir(dir, {withFileTypes: true});

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                await this.walkDirectory(fullPath, callback);
            } else if (entry.isFile()) {
                const stats = await fs.stat(fullPath);
                await callback(fullPath, stats);
            }
        }
    }

    async saveIndex() {
        const INDEX_FILE = path.join(process.cwd(), 'codebase_index.json');
        await fs.writeFile(INDEX_FILE, JSON.stringify(this.index, null, 2));
    }

    async loadIndex() {
        try {
            const INDEX_FILE = path.join(process.cwd(), 'codebase_index.json');
            const data = await fs.readFile(INDEX_FILE, 'utf8');
            this.index = JSON.parse(data);
            return this.index;
        } catch (error) {
            console.log('No existing index found, will create new one');
            return null;
        }
    }

    async needsReindex() {
        if (!this.index) {
            return true;
        }

        if (this.index.codebasePath !== this.codebasePath) {
            return true;
        }

        for (const [filePath, codeFile] of Object.entries(this.index.files)) {
            try {
                const fullPath = path.join(this.codebasePath, filePath);
                const stats = await fs.stat(fullPath);
                if (stats.mtime.getTime() > codeFile.lastModified) {
                    return true;
                }
            } catch (error) {
                return true;
            }
        }

        return false;
    }

    async ensureIndexed() {
        await this.loadIndex();
        if (await this.needsReindex()) {
            await this.scanCodebase();
        }
    }

    searchFiles(query) {
        if (!this.index) {
            return [];
        }

        const results = [];
        const queryLower = query.toLowerCase();

        for (const [filePath, codeFile] of Object.entries(this.index.files)) {
            let relevance = 0;
            let matches = [];

            if (filePath.toLowerCase().includes(queryLower)) {
                relevance += 10;
                matches.push(`Path: ${filePath}`);
            }

            codeFile.functions.forEach((func) => {
                if (func.toLowerCase().includes(queryLower)) {
                    relevance += 5;
                    matches.push(`Function: ${func}`);
                }
            });

            codeFile.classes.forEach((cls) => {
                if (cls.toLowerCase().includes(queryLower)) {
                    relevance += 5;
                    matches.push(`Class: ${cls}`);
                }
            });

            if (codeFile.content.toLowerCase().includes(queryLower)) {
                relevance += 1;
                matches.push('Content match');
            }

            codeFile.comments.forEach((comment) => {
                if (comment.toLowerCase().includes(queryLower)) {
                    relevance += 2;
                    matches.push(`Comment: ${comment.substring(0, 100)}...`);
                }
            });

            if (relevance > 0) {
                results.push({
                    file: filePath,
                    relevance,
                    matches,
                    language: codeFile.language,
                    functions: codeFile.functions,
                    classes: codeFile.classes,
                });
            }
        }

        return results.sort((a, b) => b.relevance - a.relevance);
    }

    findApiCalls(endpoint) {
        if (!this.index) {
            return [];
        }

        const results = [];
        const endpointLower = endpoint.toLowerCase();

        for (const [filePath, codeFile] of Object.entries(this.index.files)) {
            const matchingCalls = codeFile.apiCalls.filter((call) =>
                call.toLowerCase().includes(endpointLower)
            );

            if (matchingCalls.length > 0) {
                results.push({
                    file: filePath,
                    language: codeFile.language,
                    apiCalls: matchingCalls,
                    functions: codeFile.functions,
                    classes: codeFile.classes,
                });
            }
        }

        return results;
    }

    getCodebaseStats() {
        if (!this.index) {
            return null;
        }

        return {
            totalFiles: this.index.totalFiles,
            totalLines: this.index.totalLines,
            languages: this.index.languages,
            lastUpdated: new Date(this.index.lastUpdated).toISOString(),
            codebasePath: this.index.codebasePath,
        };
    }
}

export { CodebaseAnalyzer };
export { IGNORE_PATTERNS, SUPPORTED_EXTENSIONS };