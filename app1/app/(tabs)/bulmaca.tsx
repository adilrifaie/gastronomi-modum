import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../components/GradientBackground';
import { clues, buildGrid, GRID_ROWS, GRID_COLS } from '../../data/crossword';
import { Colors, Spacing, Radius, FontSize } from '../../constants/theme';

export default function BulmacaScreen() {
    const initialGrid = buildGrid();

    const whiteCells: boolean[][] = initialGrid.map((row) =>
        row.map((cell) => !cell.isBlack)
    );
    const numbers: (number | undefined)[][] = initialGrid.map((row) =>
        row.map((cell) => cell.number)
    );

    const [userInput, setUserInput] = useState<string[][]>(
        Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(''))
    );
    const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
    const [solved, setSolved] = useState(false);

    const CELL_SIZE = 28;

    const handleCellPress = (r: number, c: number) => {
        if (!whiteCells[r][c]) return;
        setSelectedCell({ r, c });
    };

    const handleInput = (text: string) => {
        if (!selectedCell) return;
        const { r, c } = selectedCell;
        if (!whiteCells[r][c]) return;

        const newInput = userInput.map((row) => [...row]);
        newInput[r][c] = text.slice(-1).toUpperCase();
        setUserInput(newInput);

        // Move to next cell (right first, then down)
        const nextCol = c + 1;
        const nextRow = r + 1;
        if (nextCol < GRID_COLS && whiteCells[r][nextCol]) {
            setSelectedCell({ r, c: nextCol });
        } else if (nextRow < GRID_ROWS && whiteCells[nextRow][c]) {
            setSelectedCell({ r: nextRow, c });
        }
    };

    const handleCheck = () => {
        const grid = buildGrid();
        let correct = true;
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                if (!grid[r][c].isBlack) {
                    if (userInput[r][c] !== grid[r][c].letter) {
                        correct = false;
                    }
                }
            }
        }
        setSolved(correct);
    };

    const handleReset = () => {
        setUserInput(Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill('')));
        setSelectedCell(null);
        setSolved(false);
    };

    return (
        <GradientBackground>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scroll}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.title}>🧩 BULMACA</Text>
                            <Text style={styles.subtitle}>Gastrostomi Bilgi Testi</Text>
                        </View>

                        {/* Grid Card */}
                        <View style={styles.gridCard}>
                            {solved && (
                                <View style={styles.solvedBanner}>
                                    <Text style={styles.solvedText}>🎉 Tebrikler! Bulmacayı çözdünüz!</Text>
                                </View>
                            )}
                            {/* Grid */}
                            <View style={styles.grid}>
                                {Array.from({ length: GRID_ROWS }).map((_, r) => (
                                    <View key={r} style={styles.row}>
                                        {Array.from({ length: GRID_COLS }).map((_, c) => {
                                            const isWhite = whiteCells[r][c];
                                            const isSelected =
                                                selectedCell?.r === r && selectedCell?.c === c;
                                            if (!isWhite) {
                                                return (
                                                    <View
                                                        key={c}
                                                        style={[
                                                            styles.cell,
                                                            styles.blackCell,
                                                            { width: CELL_SIZE, height: CELL_SIZE },
                                                        ]}
                                                    />
                                                );
                                            }
                                            return (
                                                <TouchableOpacity
                                                    key={c}
                                                    style={[
                                                        styles.cell,
                                                        styles.whiteCell,
                                                        { width: CELL_SIZE, height: CELL_SIZE },
                                                        isSelected && styles.selectedCell,
                                                    ]}
                                                    onPress={() => handleCellPress(r, c)}
                                                    activeOpacity={0.7}
                                                >
                                                    {numbers[r][c] !== undefined && (
                                                        <Text style={styles.cellNumber}>{numbers[r][c]}</Text>
                                                    )}
                                                    <Text style={styles.cellLetter}>
                                                        {userInput[r][c] || ''}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                ))}
                            </View>

                            {/* Hidden input for keyboard */}
                            {selectedCell && (
                                <TextInput
                                    style={styles.hiddenInput}
                                    onChangeText={handleInput}
                                    value=""
                                    autoFocus
                                    maxLength={1}
                                    autoCapitalize="characters"
                                />
                            )}

                            {/* Buttons */}
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.checkButton} onPress={handleCheck}>
                                    <Text style={styles.checkText}>✓ Kontrol Et</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                                    <Text style={styles.resetText}>↺ Sıfırla</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Clues */}
                        <View style={styles.cluesCard}>
                            <Text style={styles.clueSection}>⬇ Yukarıdan Aşağıya</Text>
                            {clues
                                .filter((c) => c.direction === 'down')
                                .map((clue, i) => (
                                    <Text key={i} style={styles.clue}>
                                        <Text style={styles.clueNum}>{clue.number}- </Text>
                                        {clue.clue}
                                    </Text>
                                ))}

                            <Text style={[styles.clueSection, { marginTop: Spacing.md }]}>
                                → Sağdan Sola
                            </Text>
                            {clues
                                .filter((c) => c.direction === 'across')
                                .map((clue, i) => (
                                    <Text key={i} style={styles.clue}>
                                        <Text style={styles.clueNum}>{clue.number}- </Text>
                                        {clue.clue}
                                    </Text>
                                ))}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    scroll: { padding: Spacing.md, paddingBottom: Spacing.xl },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    title: {
        fontSize: FontSize.xl,
        fontWeight: '800',
        color: Colors.textPrimary,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    gridCard: {
        backgroundColor: Colors.cardBg,
        borderRadius: Radius.md,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        alignItems: 'center',
    },
    solvedBanner: {
        backgroundColor: Colors.primary,
        borderRadius: Radius.sm,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        marginBottom: Spacing.sm,
        width: '100%',
        alignItems: 'center',
    },
    solvedText: {
        color: Colors.textLight,
        fontWeight: '700',
        fontSize: FontSize.sm,
    },
    grid: { alignSelf: 'center', marginBottom: Spacing.md },
    row: { flexDirection: 'row' },
    cell: {
        borderWidth: 0.5,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    whiteCell: { backgroundColor: Colors.cardBg },
    blackCell: { backgroundColor: 'transparent', borderColor: 'transparent' },
    selectedCell: {
        backgroundColor: '#D4F0E4',
        borderColor: Colors.primary,
        borderWidth: 2,
    },
    cellNumber: {
        position: 'absolute',
        top: 1,
        left: 2,
        fontSize: 7,
        color: Colors.textSecondary,
        fontWeight: '700',
    },
    cellLetter: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        height: 0,
        width: 0,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
        width: '100%',
    },
    checkButton: {
        flex: 1,
        backgroundColor: Colors.primary,
        borderRadius: Radius.full,
        paddingVertical: 10,
        alignItems: 'center',
    },
    checkText: {
        color: Colors.textLight,
        fontWeight: '700',
        fontSize: FontSize.md,
    },
    resetButton: {
        flex: 1,
        backgroundColor: Colors.gradientEnd,
        borderRadius: Radius.full,
        paddingVertical: 10,
        alignItems: 'center',
    },
    resetText: {
        color: Colors.primary,
        fontWeight: '700',
        fontSize: FontSize.md,
    },
    cluesCard: {
        backgroundColor: Colors.cardBg,
        borderRadius: Radius.md,
        padding: Spacing.md,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },
    clueSection: {
        fontSize: FontSize.md,
        fontWeight: '700',
        color: Colors.primary,
        marginBottom: Spacing.sm,
    },
    clue: {
        fontSize: FontSize.sm,
        color: Colors.textPrimary,
        marginBottom: 6,
        lineHeight: 20,
    },
    clueNum: {
        fontWeight: '700',
        color: Colors.primary,
    },
});
