import React from "react";
import { CoreText, CoreTextType } from "../text/text";
import { themeStore } from "../../..";

export const SelectV2: React.FC<{
  items: { name: string; value: string }[];
  initialValue: string;
  label: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}> = ({ items, initialValue, label, onChange, style }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [cursorIsCorses, setCursorIsCorses] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const [value, setValue] = React.useState(initialValue);
  React.useEffect(() => {
    ref.current?.addEventListener("mousemove", () => {
      setCursorIsCorses(true);
    });
    ref.current?.addEventListener("mouseleave", () => {
      setCursorIsCorses(false);
    });

    setWidth(Number(ref.current?.clientWidth));
  }, [ref, setCursorIsCorses]);

  return (
    <div ref={ref} style={style}>
      <div
        style={{
          backgroundColor: themeStore.theme.darkSurface,
          height: 58,
          borderRadius: "4px 4px 4px 4px",
          border: `3px solid ${themeStore.theme.greenWhite}`,
          padding: "10px 10px 10px 10px",
        }}
      >
        <CoreText
          type={CoreTextType.small}
          color={themeStore.theme.greenWhite}
          text={label}
          style={{
            position: "relative",
            bottom: 20,
            backgroundColor: themeStore.theme.darkSurface,
            width: "min-content",
            paddingLeft: 5,
            paddingRight: 5,
          }}
        />
        <div
          style={{
            fontSize: 16,
            fontFamily: "Roboto",
            color: themeStore.theme.white,
            height: 24,
            position: "relative",
            top: -13,
          }}
        >
          {value}
        </div>
      </div>
      <div
        style={{
          backgroundColor: themeStore.theme.surfaceContainer,
          boxShadow:
            "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: width,
            backgroundColor: themeStore.theme.surfaceContainer,
          }}
        >
          {cursorIsCorses
            ? items.map((el, i) => (
                <CoreText
                  text={el.name}
                  key={i}
                  type={CoreTextType.smallV2}
                  color={themeStore.theme.white}
                  onClick={() => {
                    setValue(el.name);
                    onChange(el.value);
                  }}
                  style={{
                    padding: 10,
                    alignContent: "center",
                    cursor: "pointer",
                  }}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
