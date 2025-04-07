import { observer } from "mobx-react-lite";
import { AuthorizationStore } from "./authorization_store";
import { CoreInput } from "../../core/ui/input/input";
import { CoreButton } from "../../core/ui/button/button";
import { useStore } from "../../core/helper/use_store";
import { useEffect } from "react";

export const AuthorizationScreenPath = "/auth";
export const AuthorizationScreen = observer(() => {
  const store = useStore(AuthorizationStore);
  useEffect(() => {
    if (store.authorizationLocalStorageRepository.isAuth()) {
      store.redirect();
    }
  }, []);
  return (
    <div style={{ margin: 40 }}>
      <div style={{ height: 20 }} />
      <CoreInput
        label={"login"}
        value={store.viewModel.email}
        onChange={(text) => store.updateForm({ email: text })}
      />
      <CoreInput
        label={"password"}
        value={store.viewModel.password}
        onChange={(text) => store.updateForm({ password: text })}
      />
      <div style={{ height: 20 }} />
      <CoreButton text="login" onClick={() => store.onTapLogin()} />
      <div style={{ height: 20 }} />
    </div>
  );
});
