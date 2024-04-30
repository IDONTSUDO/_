import { Button, Input } from "antd";
import { observer } from "mobx-react-lite";
import { AuthorizationStore } from "./authorization_store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainScreenPath } from "../main/main_screen";

export const AuthorizationScreenPath = "/auth";
export const AuthorizationScreen = observer(() => {
  const [store] = React.useState(() => new AuthorizationStore());
  const navigate = useNavigate();

  useEffect(() => {
    store.init(navigate);
    if (store.authorizationLocalStorageRepository.isAuth().isSuccess())
      navigate(MainScreenPath);
  }, []);

  return (
    <div style={{ margin: 40 }}>
      <Input
        onChange={(e) => store.changeLogin(e.target.value)}
        placeholder="login"
      />
      <div style={{ height: 20 }} />
      <Input
        onChange={(e) => store.changePassword(e.target.value)}
        placeholder="password"
      />
      <div style={{ height: 20 }} />
      <Button onClick={() => store.onTapLogin()}>login</Button>
      <div style={{ height: 20 }} />
    </div>
  );
});
