export const CoreTable: React.FC<{
  columns: string[];
  source: object[];
  replacedColumns?: { name: string; replace: string }[];
  onClick?: (index: number) => void;
}> = ({ columns, source, onClick, replacedColumns }) => {
  const indexed = columns.map((el, i) => {
    return {
      name: el,
      index: i,
    };
  });

  return (
    <table style={{ width: "100%" }}>
      <tr>
        {columns.map((el) =>
          replacedColumns === undefined ? (
            <th>{el}</th>
          ) : (
            <>
              {replacedColumns
                .rFind<{
                  name: string;
                  replace: string;
                }>((element) => element.name === el)
                .fold(
                  (v) => (
                    <th>{v.replace}</th>
                  ),
                  () => (
                    <th>{el}</th>
                  )
                )}
            </>
          )
        )}
      </tr>
      {source.map((el, i) => {
        return (
          <tr style={{ border: "1px solid", height: 50 }}>
            {Object.entries(el).map(([k, v], index) => {
              // @ts-ignore
              const item = el[indexed[index]?.name ?? ""];
              return <td onClick={() => onClick?.(i)}>{item}</td>;
            })}
          </tr>
        );
      })}
    </table>
  );
};
