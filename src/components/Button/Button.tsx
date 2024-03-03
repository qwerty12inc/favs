import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { ReactElement } from 'react';
import { globalTokens } from '../../styles';

type Props = {
    children: string;
    onClick: () => void;
};

const Button: React.FC<Props> = (props) => {
    const { onClick, children } = props;
    return (
        <Pressable style={styles.button} onPress={onClick}>
            <Text style={styles.button__text}>{children}</Text>
        </Pressable>
    );
};

export { Button };

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 48,
        paddingVertical: 16,
        borderRadius: 0,
        backgroundColor: globalTokens.colors.black,
        display: 'flex',
        alignItems: 'center',
    },
    button__text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: globalTokens.colors.white,
    },
});
