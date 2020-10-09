# POKÉDEX

A complete Pokédex made with Expo, React Native (Typescript) and Redux Thunk, consumming the official Pokémon API!

## Getting Started

Clone the repository to your local machine then run the following commands:

If you don't already have expo client installed, please run:

```
yarn add -g expo-cli
```

This will install the Expo CLI globally on your computer. If you are using Mac OS you might need to add the sudo followed by the command above. Then you must enter the password to access your computer, on Windows this not necessary.

Then, inside the project folder on your terminal, run:

```
yarn install
```

or

this will install all of the required dependencies of the project. After that, just run

```
yarn start
```

and play with it in your local device!

## Considerations

The project is currently listing all of the Pokémons available on the API. If you click a listed pokémon,
it will open a window containing it's base stats (HP, Attack, Defense, Speed), and list it's abilities!

Next steps to be implemented:

- Filter Pokés by name/generation/type/id
- Create a list of favorite Pokés

The project is currently configured to redux persist, but it is disabled by default.
If you want to enable it, simply uncomment line 28 in src/store/index.ts wich contains the persistor.purge() command
this is erasing all data stored in redux everytime the app runs!

Hope you all enjoy it, I am sure enjoying making this project!

Cheers!
