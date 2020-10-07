import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { AppLoading } from "expo";
import { PersistGate } from "redux-persist/integration/react";
import AppContainer from "./routes";

const { store, persistor } = configureStore({} as any);

export default class App extends React.Component {
  state = {
    fontsAreLoaded: false,
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
