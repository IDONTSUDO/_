import { Result } from "../../../helper/result";
import { TransactionChain } from "./transaction_chain/presentation/transaction_chain";

export enum FormBuilderComponents {
  TransactionChain = "TransactionChain",
}
export interface IFormBuilderComponentsProps<T> {
  dependency: T;
  onChange: (obj: any) => void;
}
export const getFormBuilderComponents = (
  name: string,
  dependency: any,
  onChange: (text: string) => void
): Result<string, React.ReactNode> => {
  if (name.isEqual(FormBuilderComponents.TransactionChain)) {
    return Result.ok(
      <TransactionChain dependency={dependency} onChange={onChange} />
    );
  }
  return Result.error(name);
};
