import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import React, { ReactElement } from 'react';
import { globalTokens } from '../../styles';

type ButtonTypes = "primary" | "secondary" | "plain"

type Props = {
    children: string;
    disabled?: boolean;
    loading?: boolean;
    type?: ButtonTypes
    onClick: () => void;
};

const Button: React.FC<Props> = (props) => {
    const { onClick, children, disabled, loading, type = "primary" } = props;

    const isLocked = disabled || loading

    return (
        <Pressable
            disabled={disabled || loading}
            style={[styles.button, styles[`button_${type}`], { opacity: (isLocked ? 0.7 : 1) }]}
            onPress={onClick}
        >
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <Text style={[styles.button__text, styles[`button__text_${type}`]]}>{children}</Text>
                {
                    loading && <ActivityIndicator size="small" color="#FFF" />
                }
            </View>
        </Pressable>
    );
};

export { Button };

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 48,
        paddingVertical: 16,
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
    },
    button_primary: {
        backgroundColor: globalTokens.colors.black,
    },
    button_secondary: {
        backgroundColor: globalTokens.colors.lightGrey,
    },
    button_plain: {
        backgroundColor: 'transparent'
    },
    button__text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    button__text_primary: {
        color: globalTokens.colors.white,
    },
    button__text_secondary: {
        color: globalTokens.colors.black,
    },
    button__text_plain: {
        color: globalTokens.colors.grey,
    },
});
