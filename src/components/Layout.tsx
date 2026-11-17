import { Outlet } from "react-router-dom";
import NavbarSealCorner from "@/components/navbars/NavbarSealCorner";
import FooterPlumPhone from "@/components/sections/footer/FooterPlumPhone";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="outline" data-card="filled" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarSealCorner
          brand="Pilates Studio Sapporo"
          cta={{
            text: "体験予約",
            href: "#contact-plum-form"
          }}
        />
      </header>
      <main className="flex-grow" data-button="outline" data-card="filled" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterPlumPhone
          brand="Pilates Studio Sapporo"
          email="info@pilates-studio-sapporo.example.jp"
          address={[
            "北海道札幌市中央区大通西2丁目12-3",
            "営業時間：10:00 - 20:00（不定休）"
          ]}
          columns={[
            {
              title: "メニュー",
              links: [
                {
                  text: "当スタジオの特徴",
                  href: "#about"
                },
                {
                  text: "体験レッスンの流れ",
                  href: "#process"
                },
                {
                  text: "講師紹介",
                  href: "#team-framed-portraits"
                }
              ]
            },
            {
              title: "サポート",
              links: [
                {
                  text: "よくある質問",
                  href: "#faq-plus-accordion"
                },
                {
                  text: "体験予約・お問い合わせ",
                  href: "#contact-plum-form"
                }
              ]
            },
            {
              title: "ご利用案内",
              links: [
                {
                  text: "大通駅 徒歩3分",
                  href: "#contact-plum-form"
                },
                {
                  text: "マンツーマン・完全予約制",
                  href: "#hero"
                }
              ]
            }
          ]}
          legal="© 2026 Pilates Studio Sapporo. 制作見本・架空の店舗"
          toTopText="ページ上部へ"
          phone=""
        />
      </footer>
    </div>
  );
}
