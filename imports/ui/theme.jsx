import { extendTheme, Input, Textarea } from "@chakra-ui/react";

const theme = extendTheme({
  shadows: {
    outline: "0 0 0 2px var(--chakra-colors-cyan-400)",
  },
});

Input.defaultProps = { ...Input.defaultProps, focusBorderColor: "cyan.500" };
Textarea.defaultProps = {
  ...Textarea.defaultProps,
  focusBorderColor: "cyan.500",
};

export default theme;
