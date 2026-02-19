import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import GradientBackground from '../../components/GradientBackground';
import { Colors, Spacing, Radius, FontSize } from '../../constants/theme';

export default function ProfilScreen() {
    return (
        <GradientBackground>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scroll}
                >
                    {/* Top Profile Card */}
                    <LinearGradient
                        colors={[Colors.primary, '#1D8A62']}
                        style={styles.profileBanner}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={styles.logoCircle}>
                            <Text style={styles.logoEmoji}>🏥</Text>
                        </View>
                        <Text style={styles.appName}>GastrostomiApp</Text>
                        <Text style={styles.appVersion}>Versiyon 1.0.0</Text>
                    </LinearGradient>

                    {/* About Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Hakkında</Text>
                        <Text style={styles.body}>
                            Değerli Ebeveynler,{'\n\n'}
                            Çocuklarda gastrostomi bakımı ve beslenmesi konusunun kapsamlı bir şekilde ele
                            alındığı bu mobil uygulama, Prof. Dr. Emine EFE'nin danışmanlığında Arş. Gör. Yahya
                            ERGEZEN'in doktora tezi kapsamında hazırlanmıştır.{'\n\n'}
                            Bu mobil uygulama ile gastrostomisi olan çocukların bakımına yönelik ebeveynlerin
                            ihtiyaç duydukları bilgiye erişebilmeleri amaçlanmaktadır.{'\n\n'}
                            Geliştirdiğimiz mobil uygulamada gastrostomi bakımı ve beslenmesine yönelik 16
                            eğitim videosu ve literatüre dayalı eğitim içeriği yer almaktadır. Eğitim içeriği
                            kanıta dayalı rehberler doğrultusunda uzmanlardan görüş alınarak ebeveynlerin
                            kullanabileceği şekilde hazırlanmıştır.{'\n\n'}
                            Bu uygulamayı ebeveynlerin kullanımına sunmaktan büyük mutluluk duyarız.
                        </Text>
                        <View style={styles.divider} />
                        <Text style={styles.authors}>
                            Arş. Gör. Yahya ERGEZEN{'\n'}
                            Prof. Dr. Emine EFE
                        </Text>
                    </View>

                    {/* Sponsor Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>🤝 Destekleyenler</Text>
                        <Text style={styles.body}>
                            Bu çalışmayı Doktora Tez projesi olarak destekleyen "Koç Üniversitesi Semahat
                            Arsel Hemşirelik Eğitim ve Araştırma Merkezi (SANERC)" Vehbi Koç Vakfı Hemşirelik
                            Fonu Proje Destekleme Programı'na teşekkür ederiz.
                        </Text>
                    </View>

                    {/* Info Cards Row */}
                    <View style={styles.infoRow}>
                        <View style={styles.infoCard}>
                            <Text style={styles.infoEmoji}>📚</Text>
                            <Text style={styles.infoValue}>16</Text>
                            <Text style={styles.infoLabel}>Eğitim Videosu</Text>
                        </View>
                        <View style={styles.infoCard}>
                            <Text style={styles.infoEmoji}>📝</Text>
                            <Text style={styles.infoValue}>5</Text>
                            <Text style={styles.infoLabel}>Makale</Text>
                        </View>
                        <View style={styles.infoCard}>
                            <Text style={styles.infoEmoji}>🧩</Text>
                            <Text style={styles.infoValue}>1</Text>
                            <Text style={styles.infoLabel}>Bulmaca</Text>
                        </View>
                    </View>

                    {/* Contact Button */}
                    <TouchableOpacity
                        style={styles.contactButton}
                        onPress={() => Linking.openURL('mailto:info@gastrostomiapp.com')}
                    >
                        <Text style={styles.contactText}>📩 İletişim</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    scroll: { padding: Spacing.md, paddingBottom: Spacing.xl },
    profileBanner: {
        borderRadius: Radius.md,
        padding: Spacing.xl,
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    logoCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.sm,
    },
    logoEmoji: { fontSize: 36 },
    appName: {
        fontSize: FontSize.xl,
        fontWeight: '800',
        color: Colors.textLight,
        marginBottom: 4,
    },
    appVersion: {
        fontSize: FontSize.sm,
        color: 'rgba(255,255,255,0.7)',
    },
    card: {
        backgroundColor: Colors.cardBg,
        borderRadius: Radius.md,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    cardTitle: {
        fontSize: FontSize.lg,
        fontWeight: '800',
        color: Colors.textPrimary,
        textAlign: 'center',
        marginBottom: Spacing.md,
    },
    body: {
        fontSize: FontSize.sm,
        color: Colors.textPrimary,
        lineHeight: 22,
        textAlign: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.md,
    },
    authors: {
        fontSize: FontSize.sm,
        color: Colors.primary,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 22,
    },
    infoRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.md,
    },
    infoCard: {
        flex: 1,
        backgroundColor: Colors.cardBg,
        borderRadius: Radius.md,
        padding: Spacing.sm,
        alignItems: 'center',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    infoEmoji: { fontSize: 24, marginBottom: 4 },
    infoValue: {
        fontSize: FontSize.xl,
        fontWeight: '800',
        color: Colors.primary,
    },
    infoLabel: {
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
        fontWeight: '500',
        textAlign: 'center',
    },
    contactButton: {
        backgroundColor: Colors.primary,
        borderRadius: Radius.full,
        paddingVertical: 14,
        alignItems: 'center',
    },
    contactText: {
        color: Colors.textLight,
        fontSize: FontSize.md,
        fontWeight: '700',
    },
});
