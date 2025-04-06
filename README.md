# 1. Second Hand - Облечи се
- Mobile application that promotes sustainable shopping for second hand clothes

# 2. Development flow, errors and solutions

## 2.1 Project architecture

  TODO

## 2.2 Project structure

  TODO

## 2.3 Project technologies

  TODO

## 2.4 Firebase

  In order to get firebase working in the newly created application, I had to resolve the following problems:

  #### Problem
   - Not existing database

  **Solution** - The problem was that I initialized a Firestore database, but the code used in the application previously, was initializing Realtime Database 

  #### Problem
   - The application was saving the email and password of a registered user, but not the rest of the data

  **Solution** - The problem lies in selecting an image from gallery 

## 2.5 Importing screens
Done

## 2.6 Introduce path alias
`yarn add --dev babbel-plugin-module-resolver`

- Development needed dependency
- Babel plugins are used at build/transpile time to transform code (like resolving aliases).
- Once Babel compiles the code, the plugin’s job is done — it’s not part of the app when running on a device.
- So, it doesn’t need to be bundled in the final app → it belongs in devDependencies.