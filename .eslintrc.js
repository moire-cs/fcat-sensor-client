module.exports = {
    extends: 'react-app',
    rules: {
        // Include client-specific rules here
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'space-infix-ops': 'error',
        'keyword-spacing': ['error', { after: true }],
        'func-call-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'function-paren-newline': ['error', 'multiline'],

    },
};
