import * as React from "react";
import { CoreText, CoreTextType } from "../text/text";
import { Icon } from "../icon/icon";

export const CoreInputNumber = (props: {
  label: string;
  value?: number;
  step: number;
  max: number;
  min: number;
  subLabel?: React.ReactNode;
  onChange?: (value: number) => void;
  validation?: (value: number) => boolean;
  error?: string;
  style?: React.CSSProperties;
}) => {
  const [value, setValue] = React.useState<number>(() => props.value ?? 0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [isAppendInnerText, setAppendInnerText] = React.useState(true);
  React.useEffect(() => {
    if (ref.current && isAppendInnerText) {
      ref.current.innerText = String(value);
      setAppendInnerText(false);
    }
  }, [ref, value, isAppendInnerText, setAppendInnerText, props]);
  React.useEffect(() => {
    if (props.value) setValue(props.value);
  }, [props.value]);
  return (
    <>
      <div
        style={Object.assign(
          {
            backgroundColor: "rgba(230, 224, 233, 1)",
            height: 58,
            borderRadius: "4px 4px 0px 0px",
            borderBottom: "solid 1px black",
            padding: "10px 10px 10px 10px",
          },
          props.style
        )}
      >
        <div>
          <CoreText type={CoreTextType.small} text={props.label} />
        </div>

        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <input
            style={{
              backgroundColor: "#00008000",
              border: 1,
              fontSize: 16,
              fontFamily: "Roboto",
              color: "#1D1B20",
              height: 24,
              width: "100%",
              userSelect: "none",
              outline: "none",
            }}
            value={value}
            onChange={(e) => {
              const val = e.target.value;

              setValue(Number(val));
              if (val) {
                if (
                  props.validation !== undefined &&
                  props.validation(Number(val)) &&
                  props.onChange
                ) {
                  props.onChange(Number(val));
                  return;
                }

                if (props.onChange && props.validation === undefined) {
                  props.onChange(Number(val));
                  return;
                }
              }
            }}
          />
          {value ? (
            props.validation ? (
              props.validation(value) ? null : (
                <div style={{ color: "#ff1d0c" }}>
                  {props.error ? props.error : "error"}
                </div>
              )
            ) : null
          ) : null}
          <Icon
            type="Plus"
            onClick={() => {
              setValue(value + props.step);
              if (props.onChange) props.onChange(value);
            }}
          />
          <Icon
            type="Minus"
            onClick={() => {
              setValue(value - props.step);
              if (props.onChange) props.onChange(value);
            }}
          />
        </div>
      </div>
    </>
  );
};
