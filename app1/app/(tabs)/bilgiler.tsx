import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import GradientBackground from '../../components/GradientBackground';
import { articles } from '../../data/articles';
import { Colors, Spacing, Radius, FontSize } from '../../constants/theme';

const categories = ['Tümü', 'Temel Bilgi', 'Bakım', 'Beslenme', 'Günlük Yaşam', 'Acil Durum'];

export default function BilgilerScreen() {
    const [activeCategory, setActiveCategory] = useState('Tümü');

    const filtered =
        activeCategory === 'Tümü'
            ? articles
            : articles.filter((a) => a.category === activeCategory);

    return (
        <GradientBackground>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>💬 Kısa Bilgiler</Text>
                    <Text style={styles.subtitle}>Gastrostomi hakkında merak ettikleriniz</Text>
                </View>

                {/* Featured Article Banner */}
                <LinearGradient
                    colors={[Colors.primary, '#1D8A62']}
                    style={styles.featuredCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.featuredBadge}>
                        <Text style={styles.featuredBadgeText}>⭐ Öne Çıkan</Text>
                    </View>
                    <Text style={styles.featuredTitle}>
                        Çocuğunuzun Gastrostomi Tüpü ile{'\n'}Beslenmeye Neden Gereksinimi Vardır?
                    </Text>
                    <View style={styles.featuredMeta}>
                        <Text style={styles.featuredMetaText}>🍼 Temel Bilgi  •  4 dk okuma</Text>
                    </View>
                </LinearGradient>

                {/* Category Filter */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryRow}
                    style={styles.chipScrollView}  // ← fixes vertical expansion
                >
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryChip,
                                activeCategory === cat && styles.categoryChipActive,
                            ]}
                            onPress={() => setActiveCategory(cat)}
                        >
                            <Text
                                style={[
                                    styles.categoryChipText,
                                    activeCategory === cat && styles.categoryChipTextActive,
                                ]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Articles List */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scroll}
                >
                    {filtered.length === 0 ? (
                        <View style={styles.empty}>
                            <Text style={styles.emptyEmoji}>📭</Text>
                            <Text style={styles.emptyText}>Bu kategoride içerik yok.</Text>
                        </View>
                    ) : (
                        filtered.map((article) => (
                            <View key={article.id} style={styles.articleRow}>
                                <View style={styles.articleIcon}>
                                    <Text style={{ fontSize: 24 }}>{article.emoji}</Text>
                                </View>
                                <View style={styles.articleContent}>
                                    <View style={styles.articleBadge}>
                                        <Text style={styles.articleBadgeText}>{article.category}</Text>
                                    </View>
                                    <Text style={styles.articleTitle} numberOfLines={2}>
                                        {article.title}
                                    </Text>
                                    <Text style={styles.articleMeta}>{article.readTime} dk okuma</Text>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    header: {
        paddingHorizontal: Spacing.md,
        paddingTop: Spacing.md,
        marginBottom: Spacing.sm,
    },
    title: {
        fontSize: FontSize.xl,
        fontWeight: '800',
        color: Colors.textPrimary,
    },
    subtitle: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    featuredCard: {
        marginHorizontal: Spacing.md,
        borderRadius: Radius.md,
        padding: Spacing.md,
        marginBottom: Spacing.xs,   // ← was Spacing.md (16px), now 4px
    },
    featuredBadge: {
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: Radius.full,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginBottom: Spacing.sm,
    },
    featuredBadgeText: {
        color: Colors.textLight,
        fontSize: FontSize.xs,
        fontWeight: '600',
    },
    featuredTitle: {
        color: Colors.textLight,
        fontSize: FontSize.md,
        fontWeight: '700',
        lineHeight: 22,
        marginBottom: Spacing.sm,
    },
    featuredMeta: {},
    featuredMetaText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: FontSize.xs,
    },
    chipScrollView: {
        flexShrink: 0,           // ← KEY FIX: don't let it expand into surrounding space
        flexGrow: 0,
        maxHeight: 50,
    },
    categoryRow: {
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.sm,
        paddingTop: Spacing.sm,
        alignItems: 'center',
        gap: Spacing.xs,
    },
    categoryChip: {
        height: 36,              // fixed height — never grows when active
        backgroundColor: Colors.cardBg,
        borderRadius: Radius.full,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.xs,
        // subtle shadow so inactive chips have visible depth
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 2,
    },
    categoryChipActive: {
        backgroundColor: Colors.primary,
        shadowOpacity: 0,
        elevation: 0,
    },
    categoryChipText: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        fontWeight: '600',
        includeFontPadding: false,  // Android: removes extra vertical padding
    },
    categoryChipTextActive: {
        color: Colors.textLight,
    },
    scroll: {
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.xl,
    },
    articleRow: {
        flexDirection: 'row',
        backgroundColor: Colors.cardBg,
        borderRadius: Radius.md,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        alignItems: 'center',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
        gap: Spacing.md,
    },
    articleIcon: {
        width: 50,
        height: 50,
        borderRadius: Radius.sm,
        backgroundColor: Colors.gradientEnd,
        alignItems: 'center',
        justifyContent: 'center',
    },
    articleContent: { flex: 1 },
    articleBadge: {
        backgroundColor: Colors.gradientEnd,
        borderRadius: Radius.full,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginBottom: 4,
    },
    articleBadgeText: {
        color: Colors.primary,
        fontSize: FontSize.xs,
        fontWeight: '600',
    },
    articleTitle: {
        fontSize: FontSize.sm,
        fontWeight: '700',
        color: Colors.textPrimary,
        lineHeight: 18,
    },
    articleMeta: {
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    empty: {
        alignItems: 'center',
        paddingTop: Spacing.xl,
        gap: Spacing.sm,
    },
    emptyEmoji: { fontSize: 48 },
    emptyText: { color: Colors.textSecondary, fontSize: FontSize.md },
});
