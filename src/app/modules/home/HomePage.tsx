// import BalancePanel from "./components/BalancePanel";
// import InviteSlider from "./components/InviteSlider";
import DownloadCta from "./components/DownloadCta";
import BalancePanel from "./components/BalancePanel";
import InviteSlider from "./components/InviteSlider";
import { NewsSection } from "./components/NewsSection";
import logoSrc from "../../../assets/logo.png";
import Wrapper from "../../../components/Wrapper";

function HomePage() {
  return (
    <>
      <Wrapper>
        <BalancePanel />

        <InviteSlider />
        <NewsSection />
        <DownloadCta
          playUrl="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
          logoSrc={logoSrc}
          qrSrc="https://cdn.pixabay.com/photo/2023/02/28/01/50/qr-code-7819652_1280.jpg"
        />
      </Wrapper>
    </>
  );
}

export default HomePage;
