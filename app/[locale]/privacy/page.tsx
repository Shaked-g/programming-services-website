import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('privacy')

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function PrivacyPage() {
  return (
    <main className="relative" dir="auto">
      <Header />
      <PrivacyContent />
      <Footer />
    </main>
  )
}

function PrivacyContent() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            מדיניות פרטיות / Privacy Policy
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            מדיניות פרטיות
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            אנו מחויבים להגן על הפרטיות והמידע האישי שלך. קרא את מדיניות הפרטיות שלנו להבנה מלאה של איך אנו אוספים, משתמשים ומגנים על המידע שלך.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">תקפות אחרון: {new Date().toLocaleDateString('he-IL')}</CardTitle>
          </CardHeader>
        </Card>

        {/* Content Sections */}
        <div className="space-y-12">
          <PrivacySection
            title="איסוף מידע"
            englishTitle="Information Collection"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  אנו אוספים מידע שאתה מספק לנו ישירות כאשר אתה משתמש בשירותים שלנו:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>שם מלא וכתובת אימייל לצורך יצירת קשר</li>
                  <li>פרטי מטלות אקדמיות ודרישות</li>
                  <li>רמת לימודים ותחום הנושא</li>
                  <li>מועדי הגשה ודרישות מיוחדות</li>
                </ul>
                <p className="text-sm bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <strong>חשוב:</strong> אנו לא שומרים או מעבדים תוכן של מטלות שהושלמו. כל המידע משמש אך ורק לצורך התאמתך למומחה המתאים ומתן שירות.
                </p>
              </div>
            }
          />

          <PrivacySection
            title="שימוש במידע"
            englishTitle="Information Usage"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  המידע שאנו אוספים משמש למטרות הבאות בלבד:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>התאמתך למומחה אקדמי מתאים</li>
                  <li>תקשורת לגבי השירותים שלנו</li>
                  <li>שיפור השירותים והתאמתם לצרכים שלך</li>
                  <li>מענה לפניות ותמיכה טכנית</li>
                </ul>
              </div>
            }
          />

          <PrivacySection
            title="שיתוף מידע"
            englishTitle="Information Sharing"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  אנו <strong>לא</strong> מוכרים, משכירים או משתפים את המידע האישי שלך עם צדדים שלישיים למטרות מסחריות. המידע שלך משותף רק:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>עם מומחים אקדמיים שאנו מתאימים אליך לצורך מתן השירות</li>
                  <li>כאשר נדרש על פי חוק או צו בית משפט</li>
                  <li>עם הסכמתך המפורשת</li>
                </ul>
              </div>
            }
          />

          <PrivacySection
            title="אבטחת מידע"
            englishTitle="Data Security"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  אנו מיישמים אמצעי אבטחה טכניים וארגוניים מתקדמים להגנה על המידע שלך:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>הצפנת נתונים בתעבורה ובאחסון</li>
                  <li>גישה מוגבלת למידע אישי</li>
                  <li>ביקורות אבטחה שוטפות</li>
                  <li>מחיקה מאובטחת של נתונים לאחר השימוש</li>
                </ul>
              </div>
            }
          />

          <PrivacySection
            title="זכויותיך"
            englishTitle="Your Rights"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  יש לך זכויות הבאות בנוגע למידע האישי שלך:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>זכות גישה למידע שאנו מחזיקים עליך</li>
                  <li>זכות תיקון מידע לא מדויק</li>
                  <li>זכות מחיקה של המידע שלך</li>
                  <li>זכות להגביל עיבוד של המידע</li>
                  <li>זכות להתנגד לעיבוד</li>
                </ul>
                <p>
                  למימוש זכויות אלו, צור עמנו קשר בכתובת: privacy@academicassist.dev
                </p>
              </div>
            }
          />

          <PrivacySection
            title="שימוש בקובצי Cookie"
            englishTitle="Cookie Usage"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  אנו משתמשים בקובצי cookie ובטכנולוגיות דומות כדי לשפר את חווייתך באתר:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Cookies לצורך תפקוד האתר</li>
                  <li>Cookies לניתוח שימוש (Google Analytics)</li>
                  <li>Cookies לשיפור ביצועי האתר</li>
                </ul>
                <p>
                  אתה יכול לנהל את הגדרות ה-cookies שלך בדפדפן שלך.
                </p>
              </div>
            }
          />

          <PrivacySection
            title="שינויים במדיניות"
            englishTitle="Policy Changes"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. שינויים משמעותיים יפורסמו באתר ויישלחו אליך במייל אם יש ברשותנו את כתובתך.
                </p>
                <p>
                  המשך השימוש בשירותים שלנו לאחר פרסום השינויים מהווה הסכמה למדיניות המעודכנת.
                </p>
              </div>
            }
          />

          <PrivacySection
            title="יצירת קשר"
            englishTitle="Contact Us"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  אם יש לך שאלות בנוגע למדיניות הפרטיות שלנו או לטיפול במידע האישי שלך, צור עמנו קשר:
                </p>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p><strong>אימייל:</strong> privacy@academicassist.dev</p>
                  <p><strong>טלפון:</strong> +1 (555) 123-4567</p>
                  <p><strong>כתובת:</strong> תמיכה אקדמית מרחוק - זמינים ברחבי העולם</p>
                </div>
              </div>
            }
          />
        </div>

        {/* Disclaimer */}
        <Card className="mt-12 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="text-orange-600 dark:text-orange-400 mt-0.5">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                  הצהרת אחריות חשובה
                </h3>
                <p className="text-orange-700 dark:text-orange-300 text-sm">
                  השירותים שלנו מיועדים למטרות למידה ועזרה בלבד. <strong>אין להגיש מטלות שהושלמו על ידינו כעבודה מקורית שלך.</strong> השימוש בשירותינו מהווה הסכמה לכך שהעבודה תשמש ככלי למידה בלבד, ולא תוגש כעבודה עצמאית.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function PrivacySection({ title, englishTitle, content }: {
  title: string
  englishTitle: string
  content: React.ReactNode
}) {
  return (
    <div className="border-b border-border pb-8 last:border-b-0">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span>{title}</span>
        <Badge variant="outline" className="text-xs">
          {englishTitle}
        </Badge>
      </h2>
      {content}
    </div>
  )
}