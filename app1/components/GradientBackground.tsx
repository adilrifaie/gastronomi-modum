import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/theme';

interface GradientBackgroundProps {
    children: React.ReactNode;
    style?: object;
}

export default function GradientBackground({ children, style }: GradientBackgroundProps) {
    return (
        <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            style={[styles.container, style]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.3, y: 1 }}
        >
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
