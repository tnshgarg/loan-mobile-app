import { ScrollView } from "react-native";
import Markdown from "react-native-markdown-display";
export const CmsMarkdown = ({ content }) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ height: "100%" }}
    >
      <Markdown>{content}</Markdown>
    </ScrollView>
  );
};
