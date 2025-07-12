import { createAvatar } from "@dicebear/core";
import { dylan } from "@dicebear/collection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
  seed: string;
  className?: string;
}

export const UserAvatar = ({ seed, className }: AvatarProps) => {
  let avatar;

  avatar = createAvatar(dylan, {
    seed,
  });

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
