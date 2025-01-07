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
              items={store.products.map((el) => el.name)}
              value={store.viewModel?.productName ?? ""}
              label={"Товар для расчета"}
              onChange={(_: string, index: number) =>
                store.products
                  .atR(index)
                  .map(
                    (el) => (
                      store.updateForm({ productName: el.name }),
                      store.updateForm({ productSKU: el.sku })
                    )
                  )
              }
            />
            <CoreInput
              error="Только числа"
              label="затраты на единицу продукции"
              value={store.viewModel?.productionCostsPerBatch?.toString()}
              validation={Number().isValid}
              onChange={(text) =>
                store.updateForm({ productionCostsPerBatch: Number(text) })
              }
            />
            <CoreInput
              error="Только числа"
              label="количество продукции"
              value={store.viewModel?.productTotal?.toString()}
              validation={Number().isValid}
              onChange={(text) =>
                store.updateForm({ productTotal: Number(text) })
              }
            />
          </>
        )}
        <div style={{ height: 50 }} />
        <CoreButton
          style={{ width: 200 }}
          text="форма заполнена"
          onClick={async () =>
            (await store.viewModel.validMessage<TransactionChainStore>()).map(
              (el) => props.onChange(el)
            )
          }
        />
      </div>
    );
  }
);
