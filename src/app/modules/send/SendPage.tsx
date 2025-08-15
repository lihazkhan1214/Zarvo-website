import SendCard from "./components/SendCard";
import BackButton from "../../../components/BackButton";
import Wrapper from "../../../components/Wrapper";

export default function SendPage() {
  return (
    <Wrapper>
      <BackButton />
      <SendCard
        tokenSymbol="ZRV"
        balance="125.75"
        feeMode="flat" // or "percent"
        feeValue="0.30" // if percent => "1" for 1%
        onSubmit={async (payload) => {
          // frontend-only stub — call your API/wallet here
          console.log("send payload", payload);
          alert(
            `Sent ${payload.amount} ${"ZRV"} to ${payload.recipient}\n` +
              `Fee: ${payload.fee}\nTotal: ${payload.total}`
          );
        }}
      />
    </Wrapper>
  );
}
