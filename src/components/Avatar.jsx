import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

const avatar = createAvatar(lorelei, {
  seed: "John Doe",
  // ... other options
});

const dp = avatar.toString();

const Avatar = () => <div>{dp}</div>;

export default Avatar;
