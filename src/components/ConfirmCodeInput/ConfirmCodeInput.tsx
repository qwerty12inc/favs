import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    TextInputFocusEventData,
    StyleSheet,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import CodeSlot from './PinCodeSlot';
import { buildRange } from '../../utils';

export interface IProps {
    size: number;
    hasError?: boolean;
    error?: string;
    active?: boolean;
    value?: any;
    onChange?: (eventOrValue: any) => void;
    onFocus?: (eventOrValue: any) => void;
    onBlur?: (eventOrValue: any) => void;
}

function normalize(text: string, size: number): string {
    return text.trim().substring(0, size);
}

export const ConfirmCodeInput: React.FC<IProps> = (props) => {
    const ref = useRef<TextInput>();

    const [focus, setFocus] = useState(false);

    const didPressed = useCallback(() => {
        if (Platform.OS === 'android') {
            ref?.current?.blur();
            ref?.current?.focus();
            return;
        }

        setTimeout(() => {
            ref?.current?.focus();
        }, 800);
        console.log('click');
    }, [ref, focus]);

    const didChanged = useCallback(
        (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const text = e.nativeEvent.text || '';

            props.onChange && props.onChange(normalize(text, props.size));
        },
        [props.onChange, props.size]
    );

    const didFocused = useCallback(() => {
        setFocus(true);
        props.onFocus && props.onFocus(undefined);
    }, [props.onFocus]);

    const didBlurred = useCallback(() => {
        setFocus(false);
        props.onBlur && props.onBlur(undefined);
    }, [props.onBlur]);

    const value = typeof props.value === 'string' ? normalize(props.value, props.size) : '';

    const hasError = props.hasError || (!!props.error && props.error.length > 0);

    const slotStatus = hasError ? 'error' : undefined;

    return (
        <>
            <TouchableOpacity style={style.container} onPress={didPressed}>
                {buildRange(0, props.size - 1).map((index) => (
                    <React.Fragment key={index}>
                        {index > 0 && <View style={{ width: 8 }} />}
                        <CodeSlot
                            value={index < value.length ? value.charAt(index) : undefined}
                            active={
                                focus &&
                                (value.length === index ||
                                    (value.length === props.size && index === props.size - 1))
                            }
                            status={slotStatus}
                        />
                    </React.Fragment>
                ))}
            </TouchableOpacity>
            <TextInput
                ref={ref}
                style={style.input}
                value={value}
                returnKeyType="done"
                textContentType="oneTimeCode"
                onChange={didChanged}
                onFocus={didFocused}
                onBlur={didBlurred}
            />
        </>
    );
};

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        width: 1,
        height: 1,
        opacity: 0.001,
    },
});
