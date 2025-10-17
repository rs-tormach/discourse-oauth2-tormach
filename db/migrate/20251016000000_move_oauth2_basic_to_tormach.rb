# frozen_string_literal: true

class MoveOauth2BasicToTormach < ActiveRecord::Migration[5.2]
  def up
    execute <<~SQL
    UPDATE user_associated_accounts
    SET provider_name = 'oauth2_tormach'
    WHERE provider_name = 'oauth2_basic'
    SQL
  end
end
