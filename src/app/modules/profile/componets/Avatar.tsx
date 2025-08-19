type AvatarProps = {
  size: number;
  src: string;
};

export default function Avatar({ size, src }: AvatarProps) {
  return (
    <img
      src={src}
      alt="avatar"
      className="rounded-full"
      style={{ width: size, height: size }}
    />
  );
}
