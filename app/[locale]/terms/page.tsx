import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('terms')

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function TermsPage() {
  return (
    <main className="relative" dir="auto">
      <Header />
      <TermsContent />
      <Footer />
    </main>
  )
}

function TermsContent() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            תנאי שימוש / Terms of Service
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            תנאי שימוש
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            תנאי השימוש בשירותי Academic Assist. קרא בעיון לפני השימוש בשירותים שלנו.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">תקפות אחרון: {new Date().toLocaleDateString('he-IL')}</CardTitle>
          </CardHeader>
        </Card>

        {/* Content Sections */}
        <div className="space-y-12">
          <TermsSection
            title="קבלת התנאים"
            englishTitle="Acceptance of Terms"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  על ידי גישה לאתר שלנו ושימוש בשירותים שלנו, אתה מסכים להיות מחויב לתנאי השימוש הללו. אם אינך מסכים לתנאים אלה, אנא אל תשתמש בשירותים שלנו.
                </p>
                <p>
                  תנאי השימוש הללו חלים על כל השירותים שמספק Academic Assist, כולל עזרה אקדמית, ייעוץ ותמיכה.
                </p>
              </div>
            }
          />

          <TermsSection
            title="תיאור השירות"
            englishTitle="Service Description"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Academic Assist מספק שירותי עזרה אקדמית מקצועיים הכוללים:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>עזרה במטלות תכנות ומדעי המחשב</li>
                  <li>תמיכה במחקר במדעי הרוח והחברה</li>
                  <li>עזרה בפרויקטי עבודה סוציאלית</li>
                  <li>תמיכה בפרויקטים רב-תחומיים</li>
                </ul>
                <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border border-red-200 dark:border-red-800 mt-6">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">
                    הצהרת אחריות חשובה - מטרת השירות
                  </h3>
                  <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
                    <strong>השירותים שלנו מיועדים למטרות למידה ועזרה בלבד.</strong> אין להגיש מטלות שהושלמו על ידינו כעבודה מקורית שלך. השימוש בשירותינו מהווה הסכמה לכך שהעבודה תשמש ככלי למידה בלבד, ולא תוגש כעבודה עצמאית. אנו מספקים הדרכה ודוגמאות כדי לעזור לך להבין את החומר, אך האחריות הסופית על הלמידה והבנת החומר היא שלך בלבד.
                  </p>
                  <p className="text-red-700 dark:text-red-300 text-sm mt-3">
                    <strong>איסור הגשה:</strong> הגשת עבודה שהושלמה על ידינו כעבודה מקורית שלך מהווה הפרת תנאי השימוש ותביא להשעיית החשבון והפסקת השירות.
                  </p>
                </div>
              </div>
            }
          />

          <TermsSection
            title="תשלום ושירות"
            englishTitle="Payment and Service"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  השירותים שלנו מסופקים על בסיס תשלום עבור העזרה האקדמית. התשלום מתבצע בשני תשלומים על בסיס הערכה של היקף העבודה.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>תשלום של 50% נדרש לפני תחילת העבודה</li>
                  <li>תשלום של 50% הנותרים נדרש לאחר השלמת העבודה</li>
                  <li>לא ניתן החזר כספי לאחר שהעבודה החלה</li>
                  <li>תיקונים ותוספות קטנות כלולים במחיר</li>
                  <li>שינויים משמעותיים עשויים לגרור חיוב נוסף</li>
                </ul>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">מדיניות תשלום:</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    התשלום השני (50%) משוחרר רק לאחר שהעבודה הושלמה במלואה ומועברת ללקוח. במקרה של עיכובים או בעיות, אנו נעבוד איתך לפתרון לפני שחרור התשלום.
                  </p>
                </div>
              </div>
            }
          />

          <TermsSection
            title="אחריות ואחריות"
            englishTitle="Liability and Responsibility"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  בעוד שאנו שואפים לספק שירות איכותי, אנו לא יכולים להבטיח ציונים ספציפיים או תוצאות אקדמיות.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">הגבלת אחריות:</h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300 text-sm">
                    <li>אין אחריות על ציונים או תוצאות אקדמיות</li>
                    <li>השירות מסופק "כפי שהוא" ללא אחריות מפורשת או משתמעת</li>
                    <li>האחריות הכוללת מוגבלת לסכום ששולם עבור השירות</li>
                  </ul>
                </div>
              </div>
            }
          />

          <TermsSection
            title="קניין רוחני"
            englishTitle="Intellectual Property"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  כל התוכן, הקוד והחומרים שמסופקים על ידינו הם למטרות למידה בלבד. אין לך זכות קניין רוחני בתוכן זה.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>העבודה נשארת רכושנו עד לתשלום מלא</li>
                  <li>אין להעתיק, להפיץ או למכור את העבודה</li>
                  <li>זכויות יוצרים על הדוגמאות והקוד נשארות ברשותנו</li>
                  <li>מותר להשתמש בעבודה לצרכי למידה אישית בלבד</li>
                </ul>
              </div>
            }
          />

          <TermsSection
            title="התנהגות משתמש"
            englishTitle="User Conduct"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  עליך להתחייב להתנהגות הולמת בעת השימוש בשירותים שלנו:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>לספק מידע מדויק ואמיתי</li>
                  <li>לא להשתמש בשירותים למטרות בלתי חוקיות</li>
                  <li>לא להעתיק או להגיש עבודה כעבודה מקורית</li>
                  <li>לכבד את זכויות הקניין הרוחני של אחרים</li>
                  <li>לא לנסות לפגוע או להפריע לשירותים</li>
                </ul>
              </div>
            }
          />

          <TermsSection
            title="ביטול והחזר"
            englishTitle="Cancellation and Refund"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  מדיניות הביטול וההחזר שלנו:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>ניתן לבטל עד 24 שעות לפני מועד ההגשה</li>
                  <li>החזר מלא אם העבודה לא החלה</li>
                  <li>החזר חלקי (50%) אם העבודה החלה אך לא הושלמה</li>
                  <li>אין החזר לאחר שהעבודה הושלמה</li>
                </ul>
              </div>
            }
          />

          <TermsSection
            title="סיום השירות"
            englishTitle="Service Termination"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  אנו שומרים לעצמנו את הזכות להפסיק או להשעות את השירות בכל עת:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>במקרה של הפרת תנאי השימוש</li>
                  <li>במקרה של חשד להתנהגות לא הולמת</li>
                  <li>מטעמי אבטחה או שירות</li>
                  <li>ללא הודעה מוקדמת במקרים חמורים</li>
                </ul>
              </div>
            }
          />

          <TermsSection
            title="שינויים בתנאים"
            englishTitle="Terms Changes"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  אנו עשויים לעדכן תנאי השימוש מעת לעת. שינויים משמעותיים יפורסמו באתר ויישלחו אליך במייל אם יש ברשותנו את כתובתך.
                </p>
                <p>
                  המשך השימוש בשירותים לאחר פרסום השינויים מהווה הסכמה לתנאים המעודכנים.
                </p>
              </div>
            }
          />

          <TermsSection
            title="חוק חל ויישוב סכסוכים"
            englishTitle="Applicable Law and Dispute Resolution"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  תנאי השימוש הללו כפופים לחוקי מדינת ישראל. כל סכסוך ייושב בבתי המשפט המוסמכים בישראל.
                </p>
                <p>
                  אנו מעודדים פתרון סכסוכים בדרכי שלום לפני פנייה לבית המשפט.
                </p>
              </div>
            }
          />

          <TermsSection
            title="יצירת קשר"
            englishTitle="Contact Information"
            content={
              <div className="space-y-4 text-muted-foreground">
                <p>
                  לשאלות בנוגע לתנאי השימוש או לבעיות בשירות, צור עמנו קשר:
                </p>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p><strong>אימייל:</strong> legal@academicassist.dev</p>
                  <p><strong>טלפון:</strong> +1 (555) 123-4567</p>
                  <p><strong>שעות פעילות:</strong> 24/7 תמיכה אקדמית</p>
                </div>
              </div>
            }
          />
        </div>

        {/* Important Notice */}
        <Card className="mt-12 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="text-red-600 dark:text-red-400 mt-0.5">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  הסכמה מפורשת
                </h3>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  על ידי השימוש בשירותים שלנו, אתה מאשר כי קראת, הבנת והסכמת לתנאי השימוש הללו. אתה מבין שהשירותים מיועדים למטרות למידה בלבד ואין להגיש את העבודה כעבודה מקורית שלך.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function TermsSection({ title, englishTitle, content }: {
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