import { NavigationActions } from "react-navigation";

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params?: any) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};
