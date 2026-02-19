import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';
import { Article } from '../data/articles';

interface ArticleCardProps {
    article: Article;
    onPress: () => void;
}

export default function ArticleCard({ article, onPress }: ArticleCardProps) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <LinearGradient
                colors={[Colors.primary, '#1D8A62']}
                style={styles.banner}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.emoji}>{article.emoji}</Text>
                <View style={styles.badgeRow}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{article.category}</Text>
                    </View>
                    <Text style={styles.readTime}>{article.readTime} dk okuma</Text>
                </View>
            </LinearGradient>

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {article.title}
                </Text>
                <Text style={styles.summary} numberOfLines={2}>
                    {article.summary}
                </Text>
                <View style={styles.footer}>
                    <View style={styles.readMore}>
                        <Text style={styles.readMoreText}>Devamını Oku →</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.cardBg,
        borderRadius: Radius.md,
        marginHorizontal: Spacing.md,
        marginBottom: Spacing.md,
        overflow: 'hidden',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    banner: {
        height: 80,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    emoji: {
        fontSize: 36,
    },
    badgeRow: {
        alignItems: 'flex-end',
        gap: 4,
    },
    badge: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: Radius.full,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    badgeText: {
        color: Colors.textLight,
        fontSize: FontSize.xs,
        fontWeight: '600',
    },
    readTime: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: FontSize.xs,
    },
    content: {
        padding: Spacing.md,
    },
    title: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: '700',
        marginBottom: Spacing.xs,
        lineHeight: 22,
    },
    summary: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        lineHeight: 20,
        marginBottom: Spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    readMore: {
        backgroundColor: Colors.gradientEnd,
        borderRadius: Radius.full,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    readMoreText: {
        color: Colors.primary,
        fontSize: FontSize.sm,
        fontWeight: '600',
    },
});
