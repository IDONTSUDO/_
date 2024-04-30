import { Navigate } from "react-router-dom";
import { AuthorizationLocalStorageRepository } from "../../../features/authorization/authorization_local_storage_repository";
import { AuthorizationScreenPath } from "../../../features/authorization/authorization_screen";

interface IPrivateRouter {
  children?: JSX.Element | JSX.Element[];
}

export const PrivateRouter = (props: IPrivateRouter) => {
  return new AuthorizationLocalStorageRepository().isAuth().fold(
    () => {
      return <>{props.children}</>;
    },
    (e) => {
      return <Navigate to={AuthorizationScreenPath} />;
    }
  );
};
