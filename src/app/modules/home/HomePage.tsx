// import BalancePanel from "./components/BalancePanel";
// import InviteSlider from "./components/InviteSlider";
import DownloadCta from "./components/DownloadCta";
import BalancePanel from "./components/BalancePanel";
import InviteSlider from "./components/InviteSlider";
import { NewsSection } from "./components/NewsSection";
import logoSrc from "../../../assets/logo.png";

function HomePage() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <BalancePanel />

        <InviteSlider />
        <NewsSection />
        <DownloadCta
          playUrl="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
          logoSrc={logoSrc}
          qrSrc="https://cdn.pixabay.com/photo/2023/02/28/01/50/qr-code-7819652_1280.jpg"
        />

        {/* <BalancePanel />
        <InviteSlider /> */}
        {/* <DownloadSection />
        <NewsSection /> */}
      </main>
      {/* <div className="space-y-6">
        {/* <BalancePanel />
        <InviteSlider /> */}
      {/* <NewsList />
        <DownloadCta /> */}
      {/* </div> */}
    </>
  );
}

export default HomePage;
