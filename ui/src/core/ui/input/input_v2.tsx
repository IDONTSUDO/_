import { themeStore } from "../../..";
import { Icon } from "../icon/icon";
import { CoreText, CoreTextType, FontType } from "../text/text";

interface InputV2Props {
  label: string;
  value?: string;
  trim?: boolean;
  height?: number;
  onChange?: (text: string) => void;
  
}
export const InputV2: React.FC<InputV2Props> = ({ label, height, value, onChange, trim }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "max-content",
        minHeight: 56,
        justifyContent: "space-between",
        backgroundColor: themeStore.theme.surfaceContainerHighest,
      }}
    >
      <div style={{ paddingLeft: 10 }}>
        <CoreText
          style={{ paddingTop: 5 }}
          type={CoreTextType.smallV2}
          color={themeStore.theme.greenWhite}
          fontType={FontType.ubuntu}
          text={label}
        />
        <CoreText
          onChange={(text) => {
            let result = text;
            if (trim) result = result.trim().replaceAll("\n", "");
            if (onChange) onChange(result);
          }}
          style={{
            backgroundColor: themeStore.theme.surfaceContainerHighest,
            paddingTop: 5,
            borderRadius: 5,
          }}
          contentEditable={true}
          type={CoreTextType.largeV2}
          color={themeStore.theme.white}
          fontType={FontType.ubuntu}
          text={value}
        />
      </div>

      <Icon
        style={{ alignContent: "center", paddingRight: 10, position: "relative", display: "flex", paddingTop: 17 }}
        type="Pencil"
        color={themeStore.theme.greenWhite}
      />
    </div>
  );
};
