import { Button, Input } from "antd";
import { observer } from "mobx-react-lite";
import { AuthorizationStore } from "./authorization_store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentsScreenPath } from "../documents/documents_screen";
import { CoreInput } from "../../core/ui/input/input";
import { CoreButton } from "../../core/ui/button/button";

export const AuthorizationScreenPath = "/auth";
export const AuthorizationScreen = observer(() => {
  const [store] = React.useState(() => new AuthorizationStore());
  const navigate = useNavigate();

  useEffect(() => {
    store.init(navigate);
    if (store.authorizationLocalStorageRepository.isAuth().isSuccess())
      navigate(DocumentsScreenPath);
  }, []);

  return (
    <div style={{ margin: 40 }}>
      <div style={{ height: 20 }} />
      <CoreInput label={"login"} onChange={(e) => store.changeLogin(e)} />
      <CoreInput label={"password"} onChange={(e) => store.changePassword(e)} />
      <div style={{ height: 20 }} />
      <CoreButton text="login" onClick={() => store.onTapLogin()} />
      <div style={{ height: 20 }} />
    </div>
  );
});
