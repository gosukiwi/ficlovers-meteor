import * as React from "react";
// import {  } from "react-simple-wysiwyg";
// import { EditorProvider } from "react-simple-wysiwyg/src/editor/EditorContext";
import {
  Editor,
  EditorProvider,
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

export default function DefaultEditor(props) {
  return (
    <EditorProvider>
      <Editor {...props}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <Separator />
          <BtnUndo />
          <BtnRedo />
          {/* <HtmlButton /> */}
          {/* <Separator /> */}
          {/* <BtnStyles /> */}
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}
