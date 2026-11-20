
import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  Pressable, TextInput, StyleSheet, StatusBar
} from 'react-native';

const GOLD = '#E6BD62';

const modules = [
  { id: 'alex', icon: '✦', ar: 'ALEX AI', en: 'ALEX AI', descAr: 'مركز المساعدة والقيادة الذكية', descEn: 'Your smart assistant and control center' },
  { id: 'social', icon: '◎', ar: 'WORLD SOCIAL', en: 'WORLD SOCIAL', descAr: 'التواصل والمجتمعات والمراسلات', descEn: 'Messages, communities and content' },
  { id: 'games', icon: '♜', ar: 'GAME MASTER', en: 'GAME MASTER', descAr: 'الألعاب والإنجازات والملف الشخصي', descEn: 'Games, achievements and profile' },
  { id: 'market', icon: '◇', ar: 'GOLD MARKET', en: 'GOLD MARKET', descAr: 'استكشاف المنتجات والمتجر', descEn: 'Discover products and marketplace' },
  { id: 'life', icon: '⌘', ar: 'SMART LIFE', en: 'SMART LIFE', descAr: 'أدوات وخدمات الحياة اليومية', descEn: 'Everyday tools and services' },
  { id: 'id', icon: '▣', ar: 'GOLD ID', en: 'GOLD ID', descAr: 'بطاقة العضوية الرقمية التجريبية', descEn: 'Demo digital membership card' },
  { id: 'rewards', icon: '★', ar: 'GOLD REWARDS', en: 'GOLD REWARDS', descAr: 'نقاط ومكافآت تجريبية', descEn: 'Demo points and rewards' },
  { id: 'topup', icon: '＋', ar: 'GOLD TOP-UP', en: 'GOLD TOP-UP', descAr: 'واجهة تجهيز شحن الألعاب', descEn: 'Game top-up interface concept' },
  { id: 'security', icon: '⬡', ar: 'SECURITY CORE', en: 'SECURITY CORE', descAr: 'مركز إعدادات الأمان', descEn: 'Security settings center' },
];

export default function App() {
  const [lang, setLang] = useState('ar');
  const [tab, setTab] = useState('home');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  const ar = lang === 'ar';
  const t = (a, e) => ar ? a : e;

  const openModule = (item) => {
    setSelected(item);
    setTab(item.id);
  };

  const sendMessage = () => {
    const clean = message.trim();
    if (!clean) return;

    setMessages(prev => [
      ...prev,
      { from: 'you', text: clean },
      {
        from: 'alex',
        text: t(
          'أنا أليكسا في النسخة التجريبية. لم يتم ربط خدمة ذكاء اصطناعي خارجية بعد.',
          'I am ALEX in demo mode. An external AI service is not connected yet.'
        )
      }
    ]);
    setMessage('');
  };

  const current = modules.find(m => m.id === tab);

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#080A0D" />

      <View style={s.header}>
        <View>
          <Text style={s.brand}>GOLD STAR</Text>
          <Text style={s.version}>
            THE ALL-IN-ONE ECOSYSTEM · 4.0
          </Text>
        </View>

        <Pressable
          style={s.langBtn}
          onPress={() => setLang(ar ? 'en' : 'ar')}
        >
          <Text style={s.langText}>
            {ar ? 'EN' : 'عربي'}
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={s.content}>

        {tab === 'home' && (
          <>
            <View style={s.hero}>
              <Text style={s.eyebrow}>
                {t('مرحباً بك في', 'WELCOME TO')}
              </Text>

              <Text style={s.heroTitle}>GOLD STAR</Text>

              <Text style={s.heroSub}>
                {t(
                  'منظومة واحدة لخدمات متعددة',
                  'ONE ECOSYSTEM · MANY POSSIBILITIES'
                )}
              </Text>

              <Pressable
                style={s.primaryBtn}
                onPress={() => {
                  setTab('alex');
                  setSelected(modules[0]);
                }}
              >
                <Text style={s.primaryText}>
                  {t('تحدث مع ALEX AI', 'TALK TO ALEX AI')} ✦
                </Text>
              </Pressable>
            </View>

            <View style={s.sectionHead}>
              <Text style={s.sectionTitle}>
                {t('مركز التطبيقات', 'APP CENTER')}
              </Text>

              <Text style={s.sectionHint}>
                {t('اختر إحدى الوحدات', 'CHOOSE A MODULE')}
              </Text>
            </View>

            <View style={s.grid}>
              {modules.map(item => (
                <Pressable
                  key={item.id}
                  style={s.module}
                  onPress={() => openModule(item)}
                >
                  <Text style={s.moduleIcon}>{item.icon}</Text>
                  <Text style={s.moduleTitle}>{item.ar}</Text>
                  <Text style={s.moduleDesc}>
                    {ar ? item.descAr : item.descEn}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={s.notice}>
              <Text style={s.noticeTitle}>
                {t('حالة الإصدار', 'BUILD STATUS')}
              </Text>
              <Text style={s.noticeText}>
                {t(
                  'هذه معاينة تفاعلية أولية. الحسابات والدفع والذكاء الاصطناعي والخدمات الخارجية غير متصلة بعد.',
                  'This is an interactive UI prototype. Accounts, payments, AI and external services are not connected yet.'
                )}
              </Text>
            </View>
          </>
        )}

        {tab === 'alex' && (
          <>
            <Text style={s.pageTitle}>✦ ALEX AI</Text>

            <Text style={s.pageDesc}>
              {t(
                'مركز القيادة والمساعدة في GOLD STAR',
                'GOLD STAR assistant and control center'
              )}
            </Text>

            <View style={s.chatBox}>
              <Text style={s.chatWelcome}>
                {t(
                  'أهلاً! كيف أستطيع مساعدتك؟',
                  'Hello! How can I help?'
                )}
              </Text>

              {messages.map((m, i) => (
                <View
                  key={i}
                  style={[
                    s.bubble,
                    m.from === 'you'
                      ? s.userBubble
                      : s.aiBubble
                  ]}
                >
                  <Text style={s.bubbleText}>{m.text}</Text>
                </View>
              ))}
            </View>

            <View style={s.composer}>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder={t('اكتب رسالتك...', 'Type your message...')}
                placeholderTextColor="#858585"
                style={s.input}
              />

              <Pressable
                onPress={sendMessage}
                style={s.sendBtn}
              >
                <Text style={s.sendText}>
                  {t('إرسال', 'SEND')}
                </Text>
              </Pressable>
            </View>

            <Text style={s.smallNote}>
              {t(
                'وضع تجريبي: الردود محلية وليست اتصالاً بنموذج ذكاء اصطناعي.',
                'Demo mode: replies are local, not connected to an AI model.'
              )}
            </Text>
          </>
        )}

        {tab !== 'home' && tab !== 'alex' && current && (
          <>
            <Pressable onPress={() => setTab('home')}>
              <Text style={s.back}>
                ‹ {t('العودة للرئيسية', 'BACK TO HOME')}
              </Text>
            </Pressable>

            <Text style={s.pageTitle}>
              {current.icon} {current.ar}
            </Text>

            <Text style={s.pageDesc}>
              {ar ? current.descAr : current.descEn}
            </Text>

            <View style={s.featureCard}>
              <Text style={s.featureTitle}>
                {t('مساحة الوحدة', 'MODULE SPACE')}
              </Text>

              <Text style={s.featureText}>
                {t(
                  'تم فتح واجهة هذه الوحدة بنجاح. هذه نقطة البداية لإضافة وظائفها وربطها بالخدمات المطلوبة.',
                  'This module screen is open. This is the starting point for adding its features and connecting required services.'
                )}
              </Text>
            </View>

            {tab === 'id' && (
              <View style={s.idCard}>
                <Text style={s.idBrand}>GOLD STAR</Text>
                <Text style={s.idLabel}>GOLD ID · DEMO</Text>
                <Text style={s.idNumber}>GS-0000-0000</Text>
                <Text style={s.idFoot}>
                  {t(
                    'بطاقة تجريبية غير صالحة للتحقق من الهوية',
                    'DEMO CARD · NOT AN ID VERIFICATION'
                  )}
                </Text>
              </View>
            )}

            {tab === 'rewards' && (
              <View style={s.featureCard}>
                <Text style={s.points}>0</Text>
                <Text style={s.featureText}>
                  {t('نقطة تجريبية', 'DEMO POINTS')}
                </Text>
              </View>
            )}

            {tab === 'security' && (
              <View style={s.featureCard}>
                <Text style={s.featureText}>
                  {t(
                    'إعدادات الحماية الفعلية تتطلب خادماً ومصادقة آمنة.',
                    'Real security controls require a backend and secure authentication.'
                  )}
                </Text>
              </View>
            )}
          </>
        )}

      </ScrollView>

      <View style={s.nav}>
        <Pressable
          onPress={() => setTab('home')}
          style={s.navItem}
        >
          <Text style={[s.navIcon, tab === 'home' && s.navActive]}>
            ⌂
          </Text>
          <Text style={[s.navLabel, tab === 'home' && s.navActive]}>
            {t('الرئيسية', 'HOME')}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setTab('alex');
            setSelected(modules[0]);
          }}
          style={s.navItem}
        >
          <Text style={[s.navIcon, tab === 'alex' && s.navActive]}>
            ✦
          </Text>
          <Text style={[s.navLabel, tab === 'alex' && s.navActive]}>
            ALEX
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTab('market')}
          style={s.navItem}
        >
          <Text style={[s.navIcon, tab === 'market' && s.navActive]}>
            ◇
          </Text>
          <Text style={[s.navLabel, tab === 'market' && s.navActive]}>
            {t('السوق', 'MARKET')}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTab('life')}
          style={s.navItem}
        >
          <Text style={[s.navIcon, tab === 'life' && s.navActive]}>
            ⌘
          </Text>
          <Text style={[s.navLabel, tab === 'life' && s.navActive]}>
            {t('الحياة', 'LIFE')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#080A0D'
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4A391D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  brand: {
    color: GOLD,
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 2
  },
  version: {
    color: '#A99A7B',
    fontSize: 9,
    letterSpacing: 1.5,
    marginTop: 3
  },
  langBtn: {
    borderWidth: 1,
    borderColor: '#92702F',
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 9
  },
  langText: {
    color: GOLD,
    fontWeight: 'bold'
  },
  content: {
    padding: 16,
    paddingBottom: 28
  },
  hero: {
    backgroundColor: '#17140E',
    borderColor: '#725522',
    borderWidth: 1,
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    marginBottom: 24
  },
  eyebrow: {
    color: '#BDA66F',
    fontSize: 12
  },
  heroTitle: {
    color: GOLD,
    fontSize: 35,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 7
  },
  heroSub: {
    color: '#C5B894',
    fontSize: 10,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 5
  },
  primaryBtn: {
    backgroundColor: GOLD,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 22,
    marginTop: 20
  },
  primaryText: {
    color: '#17130A',
    fontWeight: '900'
  },
  sectionHead: {
    marginBottom: 12
  },
  sectionTitle: {
    color: GOLD,
    fontSize: 17,
    fontWeight: 'bold'
  },
  sectionHint: {
    color: '#858585',
    fontSize: 10,
    marginTop: 4
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  module: {
    width: '48%',
    backgroundColor: '#15181C',
    borderColor: '#393126',
    borderWidth: 1,
    borderRadius: 13,
    padding: 14,
    marginBottom: 12,
    minHeight: 125
  },
  moduleIcon: {
    color: GOLD,
    fontSize: 25,
    marginBottom: 9
  },
  moduleTitle: {
    color: '#F2E8D2',
    fontSize: 12,
    fontWeight: '900'
  },
  moduleDesc: {
    color: '#9B9B9B',
    fontSize: 10,
    marginTop: 6,
    lineHeight: 15
  },
  notice: {
    borderColor: '#544321',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 7,
    backgroundColor: '#15130F'
  },
  noticeTitle: {
    color: GOLD,
    fontWeight: 'bold',
    fontSize: 12
  },
  noticeText: {
    color: '#B6B0A3',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 7
  },
  pageTitle: {
    color: GOLD,
    fontSize: 23,
    fontWeight: '900',
    marginTop: 18
  },
  pageDesc: {
    color: '#B7B0A0',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 18
  },
  back: {
    color: GOLD,
    fontSize: 12,
    marginTop: 8
  },
  featureCard: {
    backgroundColor: '#171A1E',
    borderColor: '#4B3B20',
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    marginTop: 12
  },
  featureTitle: {
    color: GOLD,
    fontWeight: 'bold',
    fontSize: 15
  },
  featureText: {
    color: '#C1BBAF',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 9
  },
  chatBox: {
    backgroundColor: '#14171B',
    borderColor: '#40351F',
    borderWidth: 1,
    borderRadius: 14,
    padding: 13,
    minHeight: 230
  },
  chatWelcome: {
    color: GOLD,
    fontSize: 15,
    marginBottom: 12
  },
  bubble: {
    padding: 11,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '92%'
  },
  userBubble: {
    backgroundColor: '#4A391D',
    alignSelf: 'flex-end'
  },
  aiBubble: {
    backgroundColor: '#24282D',
    alignSelf: 'flex-start'
  },
  bubbleText: {
    color: '#F2EBDD',
    fontSize: 13,
    lineHeight: 19
  },
  composer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    backgroundColor: '#1A1D21',
    borderColor: '#4B3B20',
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: '#FFF'
  },
  sendBtn: {
    backgroundColor: GOLD,
    padding: 13,
    borderRadius: 9,
    marginLeft: 7
  },
  sendText: {
    color: '#17130A',
    fontWeight: 'bold',
    fontSize: 11
  },
  smallNote: {
    color: '#8F8B82',
    fontSize: 10,
    marginTop: 10,
    lineHeight: 16
  },
  idCard: {
    backgroundColor: '#211B10',
    borderColor: GOLD,
    borderWidth: 1,
    borderRadius: 16,
    padding: 22,
    marginTop: 18
  },
  idBrand: {
    color: GOLD,
    fontSize: 26,
    fontWeight: '900'
  },
  idLabel: {
    color: '#C9B477',
    fontSize: 11,
    marginTop: 8,
    letterSpacing: 2
  },
  idNumber: {
    color: '#FFF1CB',
    fontSize: 19,
    marginTop: 22,
    letterSpacing: 2
  },
  idFoot: {
    color: '#A89B7D',
    fontSize: 9,
    marginTop: 18
  },
  points: {
    color: GOLD,
    fontSize: 42,
    fontWeight: '900'
  },
  nav: {
    height: 62,
    borderTopWidth: 1,
    borderTopColor: '#393126',
    backgroundColor: '#101216',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  navItem: {
    alignItems: 'center',
    minWidth: 60
  },
  navIcon: {
    color: '#8E887B',
    fontSize: 21
  },
  navLabel: {
    color: '#8E887B',
    fontSize: 9,
    marginTop: 2
  },
  navActive: {
    color: GOLD,
    fontWeight: 'bold'
  }
});
