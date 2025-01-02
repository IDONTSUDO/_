import { match } from "ts-pattern";
import { themeStore } from "../../..";
import { CoreText, CoreTextType } from "../text/text";
export enum ButtonV2Type {
  default = "default",
  empty = "empty",
}
export const ButtonV2 = ({
  text,
  textColor,
  onClick,
  style,
  icon,

  type,
}: {
  text?: string;
  textColor?: string;
  onClick: () => void;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  type?: ButtonV2Type;
}) => {
  return (
    <div
      style={Object.assign(
        {
          cursor: "pointer",
          backgroundColor: match(type)
            .with(ButtonV2Type.empty, () => undefined)
            .with(ButtonV2Type.default, () => themeStore.theme.greenWhite)
            .otherwise(() => themeStore.theme.greenWhite),
          color: textColor ?? themeStore.theme.black,
          width: "max-content",
          height: "max-content",
          padding: match(type)
            .with(ButtonV2Type.default, () => 15)
            .otherwise(() => 5),
          border: match(type)
            .with(ButtonV2Type.empty, () => `1px solid ${themeStore.theme.greenWhite}`)
            .with(ButtonV2Type.default, () => undefined)
            .otherwise(() => undefined),
          borderRadius: match(type)
            .with(ButtonV2Type.default, () => 5)
            .otherwise(() => 100),
          display: "flex",
          paddingRight: 10,
          paddingLeft: 10,
        },
        style
      )}
      onClick={() => onClick()}
    >
      {icon}
      <CoreText
        color={textColor ?? themeStore.theme.black}
        text={text}
        type={match(type)
          .with(ButtonV2Type.default, () => CoreTextType.smallv3)
          .otherwise(() => CoreTextType.largeV2)}
      />
    </div>
  );
};
