import React from 'react'
import { Button } from 'react-native';

const ApiView = (props) => {
    const { disabled, goForFetch, loading, style } = props;
    return (
        <Button
            title={loading ? "Verifying" : "Continue"}
            uppercase={false}
            type="solid"
            color="#4E46F1"
            style={style}
            disabled={loading || disabled}
            onPress={() => {
                goForFetch();
            }}
        />
    )
};

export default ApiView;
