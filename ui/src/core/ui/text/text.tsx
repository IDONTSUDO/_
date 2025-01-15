import * as React from "react";

export enum CoreTextType {
  header = "header",
  medium = "medium",
  mediumV2 = "mediumV2",
  largeV2 = "largeV2",
  large = "large",
  small = "small",
  smallV2 = "smallV2",
  smallv3 = "smallv3",
  big = "big",
}

export enum FontType {
  ubuntu = "'Ubuntu'",
  roboto = "'Roboto'",
}
export interface ITextProps {
  text?: string;
  type: CoreTextType;
  fontType?: FontType;
  color?: string;
  onClick?: Function;
  onChange?: (text: string) => void;
  contentEditable?: boolean;
  style?: React.CSSProperties;
}

const getStyle = (type: CoreTextType, color: string | undefined) => {
  if (type.isEqual(CoreTextType.smallv3))
    return {
      fontWeight: "400",
      fontSize: "16px;",
      lineHeight: "19px",
      fontStyle: "normal",
    };
  if (type.isEqual(CoreTextType.smallV2))
    return {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: 14,
      color: color ?? "#1D1B20",
    };
  if (type.isEqual(CoreTextType.mediumV2))
    return {
      color: color ?? "rgba(73, 69, 79, 1)",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0.15px",
    };
  if (type.isEqual(CoreTextType.largeV2))
    return {
      color: color ?? "rgba(73, 69, 79, 1)",
      alignContent: "center",
      fontWeight: 500,
      fontSize: 50,
      // lineHeight: "20px",
    };
  if (type.isEqual(CoreTextType.small))
    return {
      color: color ?? "rgba(73, 69, 79, 1)",
      fontSize: 12,
      fontWeight: 400,
      fontSizeAdjust: 14,
      textOverflow: "ellipsis",
    };

  if (type.isEqual(CoreTextType.large))
    return {
      color: color ?? "#1D1B20",
      fontSize: 16,
      fontWeight: 400,
      fontSizeAdjust: 14,
      textOverflow: "ellipsis",
    };
  if (type.isEqual(CoreTextType.medium))
    return {
      color: color ?? "#1D1B20",
      fontSize: 14,
      fontWeight: 400,
      textOverflow: "ellipsis",
      fontSizeAdjust: 14,
    };
  if (type.isEqual(CoreTextType.header))
    return {
      color: color ?? "#1D1B20",
      fontSize: 20,
      fontWeight: 500,
      textOverflow: "ellipsis",
      fontSizeAdjust: 16,
    };
  if (type.isEqual(CoreTextType.big))
    return {
      color: color ?? "#1D1B20",
      fontSize: 40,
      fontWeight: 500,
      textOverflow: "ellipsis",

      fontSizeAdjust: 16,
    };
  return {
    color: color ?? "rgba(73, 69, 79, 1)",
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSizeAdjust: 14,
    textOverflow: "ellipsis",
  };
};

const appendStyle = (
  type: CoreTextType,
  color: string | undefined,
  style: React.CSSProperties | undefined,
  fontType: FontType | undefined
) => {
  let font = "Roboto";
  if (fontType !== undefined) {
    font = fontType;
  }
  return Object.assign(Object.assign(getStyle(type, color), style), {
    fontFamily: font,
  });
};
export function CoreText(props: ITextProps) {
  return (
    <div
      contentEditable={props.contentEditable}
      onClick={() => {
        if (props.onClick) props.onClick();
      }}
      style={appendStyle(props.type, props.color, props.style, props.fontType)}
      onInput={(event) => {
        console.log(event);
        if (props.onChange) {
          // @ts-expect-error
          props.onChange(event.target.innerText);
        }
      }}
    >
      {props.text}
    </div>
  );
}
