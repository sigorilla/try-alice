module.exports = {
    extends: 'loris/es2017',
    root: true,
    env: {
        node: true
    },
    rules: {
        camelcase: ['error', {properties: 'never'}]
    }
};
