import { View, Text, TextProps } from 'react-native';
import { TextProps as TextPropsUI } from 'react-native-ui-lib';
import React from 'react';

type TProps = TextProps &
    TextPropsUI & {
        children?: any;
    };

export const CustomText: React.FC<TProps> = ({ children, style, ...other }) => {
    const combinedStyles = [style, { fontFamily: 'Archivo-Medium' }];

    return (
        <Text style={combinedStyles} {...other}>
            {children}
        </Text>
    );
};

export const CustomTitle: React.FC<TProps> = ({ children, style, ...other }) => {
    const combinedStyles = [style, { fontFamily: 'ClashDisplay-Medium' }];

    return (
        <Text style={combinedStyles} {...other}>
            {children}
        </Text>
    );
};
