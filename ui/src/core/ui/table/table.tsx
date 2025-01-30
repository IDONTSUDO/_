export const CoreTable: React.FC<{
  columns: string[];
  source: object[];
  onClick?: (index: number) => void;
}> = ({ columns, source, onClick }) => {
  const indexed = columns.map((el, i) => {
    return {
      name: el,
      index: i,
    };
  });
  console.log(indexed);
  return (
    <table style={{ width: "100%" }}>
      <tr>
        {columns.map((el) => (
          <th>{el}</th>
        ))}
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
