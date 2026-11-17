import HeroArchPoster from "@/components/sections/hero/HeroArchPoster";
import AboutArchCurve from "@/components/sections/about/AboutArchCurve";
import ProcessRouteLine from "@/components/sections/features/ProcessRouteLine";
import TeamFramedPortraits from "@/components/sections/team/TeamFramedPortraits";
import FaqPlusAccordion from "@/components/sections/faq/FaqPlusAccordion";
import ContactPlumForm from "@/components/sections/contact/ContactPlumForm";

export default function HomePage() {
  return (
    <>
      <div id="hero" data-webild-section="HeroArchPoster" data-webild-section-id="HeroArchPoster-1" data-section="hero" className="contents" data-scene>
        <HeroArchPoster
          title="ピラティス スタジオ"
          script="Sapporo"
          labelLeft="初心者歓迎の"
          labelRight="完全個室スタジオ"
          marquee={[
            "マシンピラティス",
            "マンツーマン指導",
            "初心者歓迎",
            "姿勢改善"
          ]}
          imageSrc="https://img.b2bpic.net/free-photo/decorative-design-gardening-natural-plant-tree_53876-14209.jpg"
          imageAlt="modern studio entrance hallway"
          cta={{
            text: "体験レッスン予約",
            href: "#contact-plum-form"
          }}
        />
      </div>

      <div id="about" data-webild-section="AboutArchCurve" data-webild-section-id="AboutArchCurve-1" data-section="about">
        <AboutArchCurve
          title="選ばれる3つの理由"
          label="初心者も安心のプライベート空間"
          placeTitle="SAPPORO STUDIO"
          description="マンツーマン指導と専用マシンで、運動が苦手な方や身体の硬い方でも周りを気にせず自分のペースで姿勢を整えられます。"
          note="完全個室のマンツーマンレッスン"
          items={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/woman-training-pilates-reformer_1303-23342.jpg",
              imageAlt: "Woman training pilates on the reformer"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/modern-entryway-with-furniture-home-decor_23-2150831769.jpg",
              imageAlt: "Modern entryway with furniture and home decor"
            }
          ]}
        />
      </div>

      <div id="process" data-webild-section="ProcessRouteLine" data-webild-section-id="ProcessRouteLine-1" data-section="process">
        <ProcessRouteLine
          aside="当日の流れ"
          items={[
            {
              title: "Web予約",
              description: "所要 約3分",
              imageSrc: "https://img.b2bpic.net/free-photo/schedule-time-management-planner-concept_53876-120482.jpg",
              imageAlt: "Schedule Time Management Planner Concept"
            },
            {
              title: "カウンセリング",
              description: "所要 約10分",
              imageSrc: "https://img.b2bpic.net/free-photo/creative-feng-shui-arrangement_23-2149058748.jpg",
              imageAlt: "Creative feng shui arrangement"
            },
            {
              title: "マシン体験",
              description: "所要 約45分",
              imageSrc: "https://img.b2bpic.net/free-photo/woman-practising-pilates-pilates-reformer_1303-14843.jpg",
              imageAlt: "Woman practising pilates in a pilates reformer"
            }
          ]}
        />
      </div>

      <div id="team-framed-portraits" data-webild-section="TeamFramedPortraits" data-webild-section-id="TeamFramedPortraits-1" data-section="team-framed-portraits">
        <TeamFramedPortraits
          title="講師紹介"
          script="Instructors"
          items={[
            {
              name: "佐藤 恵美",
              role: "代表インストラクター",
              imageSrc: "https://img.b2bpic.net/free-photo/sport-wellbeing-active-lifestyle-concept-smiling-asian-fitness-instructor-girl-sportswear-tea_1258-112931.jpg",
              imageAlt: "Sport wellbeing and active lifestyle concept smiling asian fitness instructor girl in sportswear tea"
            },
            {
              name: "高橋 あおい",
              role: "マシンピラティス講師",
              imageSrc: "https://img.b2bpic.net/free-photo/conception-pregnancy-sports-fitness-healthy-lifestyle-gym_146671-15811.jpg",
              imageAlt: "Conception of pregnancy, sports, fitness and healthy lifestyle in the gym."
            },
            {
              name: "鈴木 健太",
              role: "姿勢改善トレーナー",
              imageSrc: "https://img.b2bpic.net/free-photo/spiritual-young-man-practicing-yoga-indoors_23-2149163283.jpg",
              imageAlt: "Spiritual young man practicing yoga indoors"
            },
            {
              name: "中村 結衣",
              role: "専任インストラクター",
              imageSrc: "https://img.b2bpic.net/free-photo/sport-wellbeing-active-lifestyle-concept-cheerful-slim-strong-asian-fitness-girl-workout-gym-standing-activewear-with-hands-waist-smiling-pleased-after-good-training-gym_1258-21446.jpg",
              imageAlt: "Sport, wellbeing and active lifestyle concept. Cheerful slim and strong asian fitness girl workout in gym, standing in activewear with hands on waist, smiling pleased after good training in gym."
            },
            {
              name: "小林 莉子",
              role: "ボディメイク講師",
              imageSrc: "https://img.b2bpic.net/free-photo/beautiful-girl-is-engaged-gym_1157-22008.jpg",
              imageAlt: "beautiful girl is engaged in gym"
            },
            {
              name: "加藤 拓海",
              role: "コンディショニング担当",
              imageSrc: "https://img.b2bpic.net/free-photo/girl-posing-against-backdrop-christmas-decor_1153-7819.jpg",
              imageAlt: "Girl posing against the backdrop of Christmas decor."
            }
          ]}
        />
      </div>

      <div id="faq-plus-accordion" data-webild-section="FaqPlusAccordion" data-webild-section-id="FaqPlusAccordion-1" data-section="faq-plus-accordion">
        <FaqPlusAccordion
          title="よくあるご質問"
          script="FAQ"
          items={[
            {
              title: "運動経験がなく身体が硬いのですが大丈夫ですか？",
              description: "大丈夫です。マンツーマンでマシンのばねが動きをサポートするため、身体が硬い方こそ変化を実感していただけます。"
            },
            {
              title: "当日はどのような服装で行けばいいですか？",
              description: "動きやすい服装（Tシャツやレギンスなど）でお越しください。更衣室も完備しております。"
            },
            {
              title: "駐車場や駐輪場はありますか？",
              description: "近隣の提携パーキングをご利用いただけます。お車でお越しの際はお気軽にお問い合わせください。"
            },
            {
              title: "男性も受講できますか？",
              description: "はい、どなたでもご受講いただけます。完全プライベート空間ですので安心してお越しください。"
            }
          ]}
          cta={{
            text: "体験予約はこちら",
            href: "#contact-plum-form"
          }}
          ariaLabel="よくあるご質問"
        />
      </div>

      <div id="contact-plum-form" data-webild-section="ContactPlumForm" data-webild-section-id="ContactPlumForm-1" data-section="contact-plum-form">
        <ContactPlumForm
          title="体験予約・お問い合わせ"
          script="ご予約"
          options={[
            "体験レッスンのご予約",
            "プラン・料金のご相談",
            "その他のお問い合わせ"
          ]}
          submitText="送信する"
          labels={{
            name: "お名前",
            email: "メールアドレス",
            enquiry: "お問い合わせ項目",
            message: "メッセージ",
            sending: "送信中...",
            sent: "送信完了",
            thanks: "お問い合わせありがとうございます。24時間以内にご返信いたします。"
          }}
        />
      </div>
    </>
  );
}
