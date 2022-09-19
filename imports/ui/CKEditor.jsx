import React from "react";
import { CKEditor as Editor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box } from "@chakra-ui/react";

export default function CKEditor({ value, onChange, placeholder, ...props }) {
  return (
    <Box {...props}>
      <Editor
        editor={ClassicEditor}
        data={value}
        config={{
          placeholder,
          toolbar: [
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
            "insertTable",
            "undo",
            "redo",
          ],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </Box>
  );
}
