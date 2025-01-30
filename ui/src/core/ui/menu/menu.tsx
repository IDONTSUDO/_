import { useRef } from "react";
import "./menu.css";
import React from "react";
import { ShopsScreenPath } from "../../../features/shops/shops_screen";
import { TransactionsScreenPath } from "../../../features/transactions/transactions_screen";
import { useNavigate } from "react-router-dom";
import { ProductsScreenPath } from "../../../features/products/products_screen";

export enum MenuItems {
  STORES = "Магазины",
  TRANSACTIONS = "Транзакции",
  DOCUMENTS = "Документы",
  PRODUCTS = "PRODUCTS",
}
interface CoreMenuProps {
  page: MenuItems;
  children?: JSX.Element | JSX.Element[];
  bottom?: JSX.Element | JSX.Element[];
}

export const CoreMenu = (props: CoreMenuProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isOpen) {
      ref.current!.style.display = "none";
    } else {
      ref.current!.style.display = "";
    }
  }, [isOpen]);

  const page = [
    { page: MenuItems.DOCUMENTS, name: MenuItems.DOCUMENTS, path: null },
    { page: MenuItems.STORES, name: MenuItems.STORES, path: ShopsScreenPath },
    {
      page: MenuItems.TRANSACTIONS,
      name: MenuItems.TRANSACTIONS,
      path: TransactionsScreenPath,
    },
    {
      page: MenuItems.PRODUCTS,
      name: MenuItems.PRODUCTS,
      path: ProductsScreenPath,
    },
  ];
  return (
    <>
      <div
        style={{
          height: 101,
          paddingTop: 40,
          width: "100vw",
          textAlign: "center",
        }}
        ref={ref}
      ></div>
      <div
        style={{ position: "absolute", top: 50, left: 10 }}
        onClick={() => navigate(-1)}
      >
        <div style={{ padding: 10, border: "1px solid", width: "min-content" }}>
          Назад
        </div>
      </div>
      <input
        onClick={() => {
          setOpen(!isOpen);
        }}
        type="checkbox"
        id="overlay-input"
      />
      <label htmlFor="overlay-input" id="overlay-button">
        <span></span>
      </label>
      <div id="overlay">
        <ul style={{ color: "white" }}>
          {page.map((el) => (
            <li
              style={el.name === props.page ? { backgroundColor: "black" } : {}}
              onClick={() => {
                if (el.path) navigate(el.path);
              }}
            >
              {el.name}
            </li>
          ))}
        </ul>
      </div>
      <div>{props.children}</div>
      {/* <div style={{ width: "100vw" }}>{props.bottom}</div> */}
    </>
  );
};
