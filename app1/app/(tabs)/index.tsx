import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../components/GradientBackground';
import ArticleCard from '../../components/ArticleCard';
import { articles, Article } from '../../data/articles';
import { Colors, Spacing, FontSize, Radius } from '../../constants/theme';

export default function HomeScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Article[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Simulate a fetch
        const timer = setTimeout(() => {
            try {
                setData(articles);
                setLoading(false);
            } catch {
                setError(true);
                setLoading(false);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleRetry = () => {
        setLoading(true);
        setError(false);
        setTimeout(() => {
            setData(articles);
            setLoading(false);
        }, 800);
    };

    const handleArticlePress = (id: string) => {
        router.push(`/article/${id}`);
    };

    return (
        <GradientBackground>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Hoş Geldiniz 👋</Text>
                        <Text style={styles.title}>Gastrostomi Bakım Rehberi</Text>
                    </View>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>💚</Text>
                    </View>
                </View>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{articles.length}</Text>
                        <Text style={styles.statLabel}>Makale</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>1</Text>
                        <Text style={styles.statLabel}>Bulmaca</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>16</Text>
                        <Text style={styles.statLabel}>Video</Text>
                    </View>
                </View>

                {/* Section Title */}
                <Text style={styles.sectionTitle}>📚 Eğitim İçerikleri</Text>

                {/* Content */}
                {loading ? (
                    <View style={styles.centered}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                        <Text style={styles.loadingText}>İçerikler yükleniyor...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.centered}>
                        <Text style={styles.errorEmoji}>⚠️</Text>
                        <Text style={styles.errorText}>İçerik yüklenemedi.</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                            <Text style={styles.retryText}>Tekrar Dene</Text>
                        </TouchableOpacity>
                    </View>
                ) : data.length === 0 ? (
                    <View style={styles.centered}>
                        <Text style={styles.emptyEmoji}>📭</Text>
                        <Text style={styles.emptyText}>Henüz içerik bulunmamaktadır.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ArticleCard article={item} onPress={() => handleArticlePress(item.id)} />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                    />
                )}
            </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.sm,
    },
    greeting: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    title: {
        fontSize: FontSize.lg,
        color: Colors.textPrimary,
        fontWeight: '800',
        maxWidth: 220,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: Colors.cardBg,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    avatarText: { fontSize: 22 },
    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.md,
        gap: Spacing.sm,
        marginBottom: Spacing.md,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.cardBg,
        borderRadius: Radius.md,
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    statNumber: {
        fontSize: FontSize.xl,
        fontWeight: '800',
        color: Colors.primary,
    },
    statLabel: {
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: FontSize.md,
        fontWeight: '700',
        color: Colors.textPrimary,
        paddingHorizontal: Spacing.md,
        marginBottom: Spacing.sm,
    },
    listContent: { paddingBottom: Spacing.xl },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.sm,
    },
    loadingText: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: Spacing.sm,
    },
    errorEmoji: { fontSize: 40 },
    errorText: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
    },
    retryButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: Radius.full,
        marginTop: Spacing.sm,
    },
    retryText: {
        color: Colors.textLight,
        fontWeight: '700',
        fontSize: FontSize.md,
    },
    emptyEmoji: { fontSize: 48 },
    emptyText: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
    },
});
