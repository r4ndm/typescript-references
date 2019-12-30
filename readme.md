
## Node.js starter template project

Basic/minimal set of files for a Node.js project.

Steps to start from scratch in an empty folder:

Pre-requisites:
1. Node, npm installed
2. vscode
3. git is installed (if needed)

Steps:
1. git: git init, git remote add origin - any git initialization if needed. Create .gitignore
2. npm init: npm init -y
3. typescript: npm install typescript --save-dev
4. typescript init: npx tsc --init to create tsconfig.json. Edit to customize settings, source and dest directories
5. eslint:
   5.1 npm install eslint --save-dev
   5.2 npm install @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
   5.3 create the .eslintrc file: npx eslint --init
   5.4 add lint script in package.json
   5.5 optional: vscode integration with vscode eslint plugin and setting autofix (not done here)
6. edit package.json to add scripts - build, start, lint, ...

Optional:
1. Prettier - while optional, it is being used in this project. The VSCode extension is required because workspace vscode settings has prettier as the default formatter for typescript/javascript
   1.1 Install Prettier vscode extension
   1.2 Set prettier to be the default formatter in vscode. This can be for all languages or language specific.
      ```json
      "[typescript]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode"
      }
      ```
   1.3 Install: npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
   1.4 In .eslintrc.json, add "extends": ["plugin:prettier/recommended]
      This disables ESLint rules that conflict with Prettier and adds a rule to format content using Prettier.
      https://prettier.io/docs/en/integrating-with-linters.html
   1.5 Create .prettierrc.json file

