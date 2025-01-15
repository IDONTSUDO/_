import React from "react";
import { observer } from "mobx-react-lite";
import { IFormBuilderComponentsProps } from "../../form_builder_components";
import { TransactionChainStore } from "./transaction_chain_store";
import { TransactionChainModel } from "../model/transaction_chain_model";
import { CoreSelect } from "../../../../select/select";
import { Loader } from "../../../../loader/loader";
import { CoreInput } from "../../../../input/input";
import { CoreButton } from "../../../../button/button";

export const TransactionChain = observer(
  (props: IFormBuilderComponentsProps<TransactionChainModel>) => {
    const [store] = React.useState(new TransactionChainStore());
    React.useEffect(() => {
      store.loadClassInstance(TransactionChainModel, props.dependency);
      store.init();
    }, []);

    return (
      <div>
        {store.isLoading ? (
          <Loader />
        ) : (
          <>
            <CoreSelect
              isInput={true}
              items={store.products.map((el) => el.name)}
              value={store.viewModel?.productName ?? ""}
              label={"Товар для расчета"}
              onChange={(_: string, index: number) =>
                store.products
                  .atR(index)
                  .map(
                    (el) => (
                      store.updateForm({ productName: el.name }),
                      store.updateForm({ productSKU: el.sku }),
                      props.onChange(JSON.stringify(store.viewModel))
                    )
                  )
              }
            />
          </>
        )}
      </div>
    );
  }
);
