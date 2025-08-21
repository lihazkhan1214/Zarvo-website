import logo from "../../../../assets/logo.png";

type Props = {
  title?: string;
  subtitle?: React.ReactNode;
  aside?: React.ReactNode; // optional left column hero
  children: React.ReactNode;
};

const AuthShell: React.FC<Props> = ({ title, subtitle, aside, children }) => {
  return (
    <div className="min-h-screen bg-[#0E1114] text-white">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-2">
        {/* Left / Hero */}
        <div className="hidden lg:flex items-center justify-center">
          {aside ?? (
            <div className="max-w-md">
              <img src={logo} className="h-40 w-80" alt="" />

              <p className="text-lg leading-relaxed text-white/70">
                The world’s largest Web3 interactive platform. Learn, earn, and
                grow with a decentralized community.
              </p>
            </div>
          )}
        </div>

        {/* Right / Form card */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl bg-[#1A1C20] p-6 ring-1 ring-white/10">
            {title && <h1 className="text-xl font-semibold">{title}</h1>}
            {subtitle && (
              <p className="mt-1 text-sm text-white/60 leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="mt-6">{children}</div>
          </div>
          <p className="mt-6 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Zarvo — All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
