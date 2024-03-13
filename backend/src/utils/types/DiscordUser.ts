type DiscordUser = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  premium_type: number;
  flags: number;
  banner: null | string;
  accent_color: null | string;
  global_name: string;
  avatar_decoration_data: null;
  banner_color: null | string;
  mfa_enabled: boolean;
  locale: string;
};
