import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Radius } from '../constants/theme';

interface CrosswordGridProps {
    grid: boolean[][]; // true = white cell, false = black cell
    userInput: string[][];
    numbers: (number | undefined)[][];
    onCellPress: (row: number, col: number) => void;
    selectedRow: number | null;
    selectedCol: number | null;
}

export default function CrosswordGrid({
    grid,
    userInput,
    numbers,
    onCellPress,
    selectedRow,
    selectedCol,
}: CrosswordGridProps) {
    const CELL_SIZE = 28;

    return (
        <View style={styles.container}>
            {grid.map((row, r) => (
                <View key={r} style={styles.row}>
                    {row.map((isWhite, c) => {
                        const isSelected = selectedRow === r && selectedCol === c;
                        if (!isWhite) {
                            return <View key={c} style={[styles.cell, styles.blackCell, { width: CELL_SIZE, height: CELL_SIZE }]} />;
                        }
                        return (
                            <View
                                key={c}
                                style={[
                                    styles.cell,
                                    styles.whiteCell,
                                    { width: CELL_SIZE, height: CELL_SIZE },
                                    isSelected && styles.selectedCell,
                                ]}
                                onTouchEnd={() => onCellPress(r, c)}
                            >
                                {numbers[r][c] !== undefined && (
                                    <Text style={styles.number}>{numbers[r][c]}</Text>
                                )}
                                <Text style={[styles.letter, isSelected && styles.selectedLetter]}>
                                    {userInput[r][c] || ''}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        borderWidth: 0.5,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    whiteCell: {
        backgroundColor: Colors.cardBg,
    },
    blackCell: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    selectedCell: {
        backgroundColor: Colors.gradientEnd,
        borderColor: Colors.primary,
        borderWidth: 2,
    },
    number: {
        position: 'absolute',
        top: 1,
        left: 2,
        fontSize: 7,
        color: Colors.textSecondary,
        fontWeight: '700',
    },
    letter: {
        fontSize: FontSize.sm,
        fontWeight: '700',
        color: Colors.textPrimary,
        textTransform: 'uppercase',
    },
    selectedLetter: {
        color: Colors.primary,
    },
});
