const IGNORE_PATTERNS = [
    'node_modules',
    '.git',
    'dist',
    'build',
    'coverage',
    '.next',
    '.nuxt',
    'vendor',
    '__pycache__',
    '*.log',
    '.DS_Store',
    'Thumbs.db',
    'promokit',
];

const SUPPORTED_EXTENSIONS = {
    '.js': 'javascript',
    '.jsx': 'javascript',
    '.ts': 'typescript',
    '.tsx': 'typescript',
    '.json': 'json',
    '.html': 'html',
    '.css': 'css',
    '.scss': 'scss',
    '.md': 'markdown',
};

const DEFAULT_CODEBASE_PATH = '/Users/metlonec/Work/promokit/infrastructure/www/html/demo/alysum/public';

export { IGNORE_PATTERNS, SUPPORTED_EXTENSIONS, DEFAULT_CODEBASE_PATH }; 