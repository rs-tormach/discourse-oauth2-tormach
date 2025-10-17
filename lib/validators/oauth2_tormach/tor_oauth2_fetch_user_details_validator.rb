# frozen_string_literal: true

class TorOauth2FetchUserDetailsValidator
  def initialize(opts = {})
    @opts = opts
  end

  def valid_value?(val)
    return true if val == "t"
    SiteSetting.torauth2_callback_user_id_path.length > 0
  end

  def error_message
    I18n.t("site_settings.errors.torauth2_fetch_user_details")
  end
end
