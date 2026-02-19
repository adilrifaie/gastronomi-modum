import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { articles } from '../../data/articles';
import { Colors, Spacing, Radius, FontSize } from '../../constants/theme';

export default function ArticleDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(t);
    }, []);

    const article = articles.find((a) => a.id === id);

    if (loading) {
        return (
            <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                style={styles.centered}
            >
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Yükleniyor...</Text>
            </LinearGradient>
        );
    }

    if (!article) {
        return (
            <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                style={styles.centered}
            >
                <Text style={{ fontSize: 48 }}>🔍</Text>
                <Text style={styles.errorText}>Makale bulunamadı.</Text>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Text style={styles.backBtnText}>← Geri Dön</Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Hero Banner */}
                    <LinearGradient
                        colors={[Colors.primary, '#1D8A62']}
                        style={styles.hero}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={22} color={Colors.textLight} />
                        </TouchableOpacity>
                        <Text style={styles.heroEmoji}>{article.emoji}</Text>
                        <View style={styles.heroBadge}>
                            <Text style={styles.heroBadgeText}>{article.category}</Text>
                        </View>
                        <Text style={styles.heroTitle}>{article.title}</Text>
                        <Text style={styles.heroMeta}>⏱ {article.readTime} dakika okuma</Text>
                    </LinearGradient>

                    {/* Body Card */}
                    <View style={styles.bodyCard}>
                        <Text style={styles.summaryText}>{article.summary}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.bodyText}>{article.body}</Text>
                    </View>

                    {/* Previous / Next Navigation */}
                    <View style={styles.navRow}>
                        {articles.findIndex((a) => a.id === id) > 0 && (
                            <TouchableOpacity
                                style={styles.navBtn}
                                onPress={() => {
                                    const idx = articles.findIndex((a) => a.id === id);
                                    router.replace(`/article/${articles[idx - 1].id}`);
                                }}
                            >
                                <Text style={styles.navText}>← Önceki</Text>
                            </TouchableOpacity>
                        )}
                        {articles.findIndex((a) => a.id === id) < articles.length - 1 && (
                            <TouchableOpacity
                                style={[styles.navBtn, styles.navBtnRight]}
                                onPress={() => {
                                    const idx = articles.findIndex((a) => a.id === id);
                                    router.replace(`/article/${articles[idx + 1].id}`);
                                }}
                            >
                                <Text style={[styles.navText, { color: Colors.primary }]}>Sonraki →</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.sm,
    },
    loadingText: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
        marginTop: Spacing.sm,
    },
    errorText: {
        color: Colors.textSecondary,
        fontSize: FontSize.lg,
    },
    backBtn: {
        marginTop: Spacing.sm,
        backgroundColor: Colors.primary,
        borderRadius: Radius.full,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
    },
    backBtnText: {
        color: Colors.textLight,
        fontWeight: '700',
        fontSize: FontSize.md,
    },
    hero: {
        padding: Spacing.lg,
        paddingTop: Spacing.md,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.25)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.md,
    },
    heroEmoji: { fontSize: 44, marginBottom: Spacing.sm },
    heroBadge: {
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: Radius.full,
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginBottom: Spacing.sm,
    },
    heroBadgeText: {
        color: Colors.textLight,
        fontSize: FontSize.xs,
        fontWeight: '700',
    },
    heroTitle: {
        color: Colors.textLight,
        fontSize: FontSize.lg,
        fontWeight: '800',
        lineHeight: 26,
        marginBottom: Spacing.sm,
    },
    heroMeta: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: FontSize.xs,
    },
    bodyCard: {
        backgroundColor: Colors.cardBg,
        margin: Spacing.md,
        borderRadius: Radius.md,
        padding: Spacing.md,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    summaryText: {
        fontSize: FontSize.md,
        fontWeight: '600',
        color: Colors.textSecondary,
        lineHeight: 24,
        marginBottom: Spacing.md,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginBottom: Spacing.md,
    },
    bodyText: {
        fontSize: FontSize.sm,
        color: Colors.textPrimary,
        lineHeight: 24,
    },
    navRow: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.xl,
        gap: Spacing.sm,
    },
    navBtn: {
        flex: 1,
        backgroundColor: Colors.cardBg,
        borderRadius: Radius.md,
        paddingVertical: 12,
        alignItems: 'center',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    navBtnRight: {
        borderWidth: 1.5,
        borderColor: Colors.primary,
    },
    navText: {
        fontSize: FontSize.sm,
        fontWeight: '700',
        color: Colors.textSecondary,
    },
});
