# YZM304 — Week 2: Mobile App Projects

Bu repo, YZM304 dersi kapsamında geliştirilen React Native / Expo uygulamalarını içermektedir.

---

## 📁 Proje Yapısı

```
week2/
└── app1/   → GastrostomiApp
```

---

## 📱 App 1 — GastrostomiApp

> **Gastrostomi Bakım Rehberi** — Gastrostomi hastalarına ve bakım verenlerine yönelik bilgi, eğitim ve quiz uygulaması.

### 📖 Proje Açıklaması

GastrostomiApp, gastrostomi tüpü kullanan hastalar ve onlara bakan kişiler için geliştirilmiş bir mobil rehber uygulamasıdır. Uygulama; eğitim makaleleri, kısa bilgiler, interaktif bulmacalar ve video içerikleri sunarak kullanıcıların bilgi düzeyini artırmayı hedefler.

### ✨ Özellikler

- 📚 **Eğitim Makaleleri** — Gastrostomi bakımına dair kapsamlı makaleler
- 🧩 **Bulmaca / Quiz** — Bilgi pekiştirme amaçlı interaktif bulmaca
- 📋 **Kısa Bilgiler** — Kategorilere göre filtrelenebilir hızlı bilgi kartları
- 👤 **Profil** — Kullanıcı profil ekranı
- 🔗 **Makale Detayı** — Her makale için ayrıntılı içerik görüntüleme

### ⚙️ Kurulum & Çalıştırma

**Gereksinimler:**
- Node.js (v18+)
- npm veya yarn
- Expo Go (fiziksel cihaz için) veya Android Emulator

```bash
# Bağımlılıkları yükle
cd app1
npm install

# Geliştirme sunucusunu başlat
npx expo start

# Sadece Android için
npx expo start --android
```

Expo Go uygulamasını telefonunuza indirin ve QR kodu tarayarak uygulamayı açın.

### 📱 APK İndir

Build alınmış APK dosyasını doğrudan aşağıdaki bağlantıdan indirebilirsiniz:

👉 [GastrostomiApp APK İndir](https://expo.dev/artifacts/eas/oKLoomfzpdrPeSmJvxeFce.apk)

---

## 🛠 Kullanılan Teknolojiler

| Paket | Sürüm | Amaç |
|-------|-------|------|
| React Native | 0.81.5 | Temel çerçeve |
| Expo | ~54.0.33 | Platform araçları |
| TypeScript | ~5.9.2 | Tip güvenli geliştirme |
| Expo Router | ~6.0.23 | Dosya tabanlı navigasyon |
| expo-linear-gradient | ~15.0.8 | Gradyan arka planlar |
| @expo/vector-icons | ^15.0.3 | İkon seti |
| react-native-safe-area-context | ~5.6.0 | Güvenli alan yönetimi |
| react-native-screens | ~4.16.0 | Native navigasyon ekranları |

---

## 👤 Geliştirici

YZM304 — Mobil Uygulama Geliştirme Dersi
