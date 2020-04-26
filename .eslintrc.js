module.exports = {
    "env": {
        "node": true,
        "es6": true,
        "browser": true,
        "commonjs": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react-hooks/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [],
    "rules": {
        "indent": [
            "off",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "no-unused-vars": [
            "off"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};