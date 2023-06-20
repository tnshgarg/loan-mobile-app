import Markdown from "react-native-markdown-display"

export const CmsMarkdown = ({content}) => {
    return (
        <Markdown>
            {content}
        </Markdown>
    )
}
