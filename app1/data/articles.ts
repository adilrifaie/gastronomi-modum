export interface Article {
    id: string;
    title: string;
    summary: string;
    body: string;
    category: string;
    readTime: number; // minutes
    emoji: string;
}

export const articles: Article[] = [
    {
        id: '1',
        title: 'Çocuğunuzun Gastrostomi Tüpü ile Beslenmeye Neden Gereksinimi Vardır?',
        summary: 'Gastrostomi tüpü, çocuğunuzun ağız yoluyla yeterli kalori alamadığı durumlarda kullanılan önemli bir beslenme yöntemidir.',
        body: `Çocukların büyüme ve gelişmeleri için ağız yoluyla aldıkları gıdalar ile kalori ihtiyaçlarının karşılanamadığı durumlarda çocuğunuzun diğer beslenme yollarıyla bu kalori açığının kapatılması gerekir.\n\nÇocuğunuzun ağız yoluyla yeterli kalori alamama durumu 6 haftadan uzun sürecekse gastrostomi tüpü ile beslenme yolu tercih edilir.\n\nBu yöntem, çocuğunuzun vücuduna gerekli besinlerin doğrudan mideye iletilmesini sağlar ve çocuğun yaşam kalitesini artırır.`,
        category: 'Temel Bilgi',
        readTime: 4,
        emoji: '🍼',
    },
    {
        id: '2',
        title: 'Gastrostomi Tüpü Bakımı Nasıl Yapılır?',
        summary: 'Günlük bakım rutinleri, enfeksiyon önleme ve tüp değişimi hakkında bilmeniz gereken her şey.',
        body: `Gastrostomi tüpü bakımı, enfeksiyon riskini azaltmak ve tüpün doğru çalışmasını sağlamak için düzenli olarak yapılmalıdır.\n\nGünlük bakım adımları:\n• Tüp çevresini hafif sabun ve suyla temizleyin.\n• Cilt irritasyonu veya kızarıklık belirtilerini kontrol edin.\n• Tüpün yerinden oynayıp oynamadığını kontrol edin.\n• Besleme öncesi ve sonrası tüpü su ile yıkayın.\n\nHerhangi bir enfeksiyon belirtisi görürseniz (ateş, kızarıklık, akıntı) hemen doktorunuza başvurun.`,
        category: 'Bakım',
        readTime: 5,
        emoji: '🏥',
    },
    {
        id: '3',
        title: 'Gastrostomi ile Yaşam: Ebeveyn Rehberi',
        summary: 'Günlük yaşamı kolaylaştırmak ve olası sorunlarla başa çıkmak için pratik ipuçları.',
        body: `Gastrostomi tüpüne sahip bir çocuğa bakmak zaman içinde daha kolay hale gelir. Sabırlı olmak ve rutin oluşturmak en önemli adımdır.\n\nPratik ipuçları:\n• Besleme saatlerini sabitleyin ve bir rutin oluşturun.\n• Tüm bakım malzemelerini organize bir şekilde saklayın.\n• Okul veya kreşte öğretmenleri bilgilendirin.\n• Destek gruplarına katılın — diğer ebeveynlerden çok şey öğrenebilirsiniz.\n\nUnutmayın: Yalnız değilsiniz. Sağlık ekibiniz her zaman yanınızda.`,
        category: 'Günlük Yaşam',
        readTime: 6,
        emoji: '💚',
    },
    {
        id: '4',
        title: 'Besleme Formülleri ve Beslenme Planı',
        summary: 'Çocuğunuz için doğru formülü ve beslenme zamanlamasını nasıl seçersiniz?',
        body: `Gastrostomi ile besleme, doktorunuz ve diyetisyeninizin rehberliğinde yapılmalıdır. Her çocuğun kalori ve besin ihtiyacı farklıdır.\n\nBesleme yöntemleri:\n• Sürekli besleme: Pompa ile yavaş ve sürekli verilen beslenme.\n• Bolüs besleme: Günde birkaç kez belirlenen miktarlarda verilen beslenme.\n• Gece beslemesi: Çocuğun gündüz normal aktivitelerini sürdürmesi için gece boyunca yapılan besleme.\n\nFormül seçimi için mutlaka diyetisyeninize danışın.`,
        category: 'Beslenme',
        readTime: 5,
        emoji: '🥗',
    },
    {
        id: '5',
        title: 'Acil Durumlarda Ne Yapmalısınız?',
        summary: 'Tüp çıkması, tıkanma veya enfeksiyon gibi durumlarda hızlı müdahale rehberi.',
        body: `Gastrostomi tüpüyle ilgili acil durumlar zaman zaman yaşanabilir. Hazırlıklı olmak sizi sakin ve etkili kılar.\n\nSık karşılaşılan durumlar:\n\n🔴 Tüp çıkması: Sakin olun. Yeni tüp veya kateterleri stoma yerine yerleştirin. Hemen doktorunuzu arayın — stoma 2–4 saat içinde kapanabilir!\n\n🟡 Besleme tıkanması: Ilık suyla 5 mL enjekte edin, nazikçe yavaşlatın. Tıkanma devam ederse sağlık ekibinizi arayın.\n\n🟠 Cilt tahrişi: Bölgeyi temiz ve kuru tutun, bariyer krem kullanın. Kötüleşirse doktorunuza danışın.`,
        category: 'Acil Durum',
        readTime: 5,
        emoji: '🚨',
    },
];
